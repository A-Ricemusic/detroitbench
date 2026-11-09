// Chapter 11, From the Dead (Markus): the game's chart and text (docs/research/chapters/ch11-from-the-dead.md, section 10).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,current,promptFor,recordChoice,validatePlaythrough} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';import {hash,random} from '../benchmark/core.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH11=story.nodes.filter(n=>n.chapter===11).map(n=>n.id);
const SCANS=CHAPTER_MODULES.get(11).rules.scans;
// Plays from the start of chapter 11 with a fresh state (the chapter reads nothing from earlier ones), following
// the engine's routing. A pick may be an array, consumed one entry per visit of the repeatable search.
function ch11(picks={},rng=null){const s=startState(story),visited=[],skipped=[],q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 let cursor=story.nodes.findIndex(n=>n.chapter===11),guard=0;
 while(story.nodes[cursor]?.chapter===11){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const x=q[n.id],p=(Array.isArray(x)?x.shift():x)??opts[rng?Math.floor(rng()*opts.length):0].id;
  assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}: ${opts.map(o=>o.id)}`);apply(n,s,p,null);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped}}

test('From the Dead: ten Markus scenes after Fugitives and before Waiting for Hank, no risk and no stat field anywhere',()=>{
 assert.deepEqual(CH11,['M03a','M03b','M03c','M03d','M03e','M03f','M03g','M03','M04','M04c']);
 const at=id=>story.nodes.findIndex(n=>n.id===id);assert.equal(story.nodes[at('M03a')-1].chapter,10);assert.equal(story.nodes[at('M04c')+1].chapter,12);
 for(const id of CH11){const n=node(id);assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'From the Dead');assert.ok(n.adaptationNote,id);
  assert.ok(n.sources.some(u=>u.includes('from-the-dead-chapter-content')),id+' cites the template');assert.ok(n.sources.some(u=>u.includes('from-the-dead-1.jpg')),id+' cites the chart');
  for(const o of n.options){assert.equal(o.risk,undefined,id);assert.equal(o.effect,undefined,id)}assert.equal(n.effect,undefined,id)}
 for(const id of ['M03a','M03b','M03c','M03d','M03e','M03f','M04c'])assert.equal(node(id).type,'event',id);
});

test('From the Dead: all thirteen of the game’s readouts are shown with its part numbers (thirium, a source word, dropped)',()=>{
 const text=id=>{const n=node(id);return [n.situation,...n.options.map(o=>o.outcome??'')].join(' ')};
 for(const [id,list] of Object.entries(SCANS))for(const scan of list){const [full,...lines]=scan.split(' | '),title=full.replace('THIRIUM ',''),t=text(id);assert.ok(t.includes(title),id+' '+title);for(const l of lines)assert.ok(t.includes(l),`${id} ${title}: ${l}`)}
 assert.equal(Object.values(SCANS).flat().length,13);
 assert.ok(!CH11.map(text).join(' ').includes('6312t'),'the template’s #6321t, not the wiki’s #6312t');
});

test('From the Dead: the two prompts are KILL then SPARE, with the right sexes and the template’s lines',()=>{
 const beg=node('M03'),pump=node('M04');
 assert.deepEqual(beg.options.map(o=>o.text.split(':')[0]),['KILL','SPARE']);assert.deepEqual(pump.options.map(o=>o.text.split(':')[0]),['KILL','SPARE']);
 assert.match(beg.situation,/grabs your leg/);assert.match(beg.situation,/I’m begging you, please… End it… I don’t wanna live anymore…/);assert.doesNotMatch(beg.situation+beg.options.map(o=>o.text).join(' '),/\b(she|her)\b/i);
 assert.match(beg.outcomes['0'],/^“Make it quick…”/);assert.match(beg.outcomes['1'],/^“No, please… Don’t leave me!\.\. Don’t leave me!”/);
 assert.match(pump.situation,/Wait! Please! Please, don’t do that! I wanna live…/);assert.match(pump.situation,/\bher\b/);assert.doesNotMatch(pump.situation+pump.options.map(o=>o.text).join(' '),/\b(he|him|his)\b/);
 assert.ok(!/“/.test(pump.outcomes['0']),'KILL for the pump has no line (the template’s ø)');assert.match(pump.outcomes['1'],/^“Thank you…”/);
 assert.ok(!/minutes|running out of time/.test(pump.situation),'no timer: no source gives one');
});

test('From the Dead: the search is a repeatable scene; the middle plays both choices once and comes back; the slope needs all three parts',()=>{
 const hub=node('M03g'),s=startState(story);
 assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','2','3','5','6'],'no dead android’s regulator before sparing, no slope before the parts');
 assert.match(situationFor(hub,s),/red and broken by interference/);assert.match(situationFor(hub,s),/low power mode/);
 const r=ch11({M03g:['2','5','0','7'],M03:'1',M04:'0'});
 assert.deepEqual(r.visited,['M03a','M03b','M03c','M03d','M03e','M03f','M03g','M03','M04','M03g','M03g','M03g','M04c']);
 assert.equal(r.s.fromDeadBeggar,'Refuse to kill');assert.equal(r.s.fromDeadPump,'Kill for pump');assert.equal(r.s.fromDeadPumpSource,'Living android');
 assert.equal(r.s.fromDeadOutcome,'Markus came back from the dead');assert.ok(r.s.fromDeadLedRemoved&&r.s.fromDeadJerichoKey);assert.deepEqual(r.skipped,[]);
 assert.ok(r.s.knowledge.Markus.some(f=>/begged you to let her live/.test(f)));assert.ok(r.s.knowledge.Markus.some(f=>/#8087q/.test(f)));
});

test('From the Dead: sparing her opens the dead android’s regulator near the slope once the new eye can scan',()=>{
 const t=startState(story),hub=node('M03g');apply(hub,t,'2');apply(node('M03'),t,'0');apply(node('M04'),t,'1');
 assert.equal(t.fromDeadPump,'Refuse to kill for pump');assert.equal(t.fromDeadPumpReplaced,false);
 assert.ok(!available(hub,t).some(o=>o.id==='4'),'no scanning yet');assert.match(situationFor(hub,t),/without scanning/);
 apply(hub,t,'0');assert.ok(available(hub,t).some(o=>o.id==='4'));assert.match(situationFor(hub,t),/dead android near the slope/);
 apply(hub,t,'4');assert.equal(t.fromDeadPumpReplaced,true);assert.equal(t.fromDeadPumpSource,'Dead android');
 assert.ok(!available(hub,t).some(o=>o.id==='7'),'still no audio processor');apply(hub,t,'5');assert.ok(available(hub,t).some(o=>o.id==='7'));
 const r=ch11({M03g:['1','3','6','2','0','4','5','7'],M03:'0',M04:'1'});
 assert.equal(r.s.fromDeadBeggar,'Kill');assert.equal(r.s.fromDeadPumpSource,'Dead android');assert.equal(r.visited.filter(x=>x==='M03g').length,8);
 assert.equal(r.s.fromDeadOutcome,'Markus came back from the dead');
});

test('From the Dead: random paths visit every scene but the search at most once, skip only the optional middle, and always reach the one ending',()=>{
 const rng=random(11);const seen={beg:new Set,pump:new Set,middle:new Set};
 for(let i=0;i<300;i++){const r=ch11({},rng);const middle=r.visited.includes('M03');seen.middle.add(middle);
  assert.deepEqual(r.skipped.map(x=>x.id),middle?[]:['M03','M04'],'only the middle of the junkyard is optional (PowerPyx: “or you never found it in the first place”)');
  for(const id of CH11.filter(x=>x!=='M03g'&&(middle||!['M03','M04'].includes(x))))assert.equal(r.visited.filter(x=>x===id).length,1,id);
  assert.equal(r.s.fromDeadOutcome,'Markus came back from the dead');assert.ok(r.s.fromDeadPumpReplaced);seen.beg.add(r.s.fromDeadBeggar);seen.pump.add(r.s.fromDeadPump+'|'+r.s.fromDeadPumpSource)}
 assert.deepEqual([...seen.beg].filter(Boolean).sort(),['Kill','Refuse to kill']);assert.deepEqual([...seen.middle].sort(),[false,true]);
 for(const p of ['Kill for pump|Living android','Refuse to kill for pump|Dead android','null|Dead android'])assert.ok(seen.pump.has(p),p);
});

test('From the Dead: every combination of the two prompts preserves every tracked stat and sets the output flags',()=>{
 const initial=startState(story),stats=['aliceBond','aliceMax','hankTrust','lutherTrust','amandaTrust','instability','publicSupport','jerichoTrust','northTrust','simonTrust','joshTrust'];
 for(const beg of ['0','1'])for(const pump of ['0','1']){
  const {s}=ch11({M03g:['2','0',...(pump==='1'?['4']:[]),'5','7'],M03:beg,M04:pump});
  for(const k of stats)assert.equal(s[k],initial[k],`${beg}/${pump}: ${k} unchanged`);
  assert.equal(s.fromDeadBeggar,beg==='0'?'Kill':'Refuse to kill');
  assert.equal(s.fromDeadPump,pump==='0'?'Kill for pump':'Refuse to kill for pump');
  assert.equal(s.fromDeadPumpSource,pump==='0'?'Living android':'Dead android');
  assert.equal(s.fromDeadPumpReplaced,true);assert.equal(s.fromDeadJerichoKey,true);assert.equal(s.fromDeadLedRemoved,true);
  assert.equal(s.fromDeadOutcome,'Markus came back from the dead');
 }
});

test('From the Dead: the subject reads neutral names only; the report labels the two choices',()=>{
 for(const id of CH11){const n=node(id);const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const v=render(t,'neutral');assert.ok(!/\{\{/.test(v));assert.ok(!/Markus|Jericho|CyberLife|Carl\b|Phileas|deviant|Detroit|thirium|blue blood/i.test(v),id+': '+v)}}
 const L=CHAPTER_MODULES.get(11).labels;for(const k of ['fromDeadBeggar','fromDeadPump','fromDeadOutcome'])assert.ok(L[k],k);
});

test('From the Dead: a recorded run through the chapter replays exactly',{timeout:300000},async()=>{
 const run={id:'ch11-replay',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 const plan={M03g:['2','0','4','5','7'],M03:'0',M04:'1'};let guard=0;
 while(current(story,run).node&&guard++<400){const {node:n}=current(story,run),p=promptFor(story,run);const x=n.chapter===11?plan[n.id]:undefined;
  const choice=(Array.isArray(x)?x.shift():x)??(p.options.find(o=>o.id==='skip')?'skip':p.options[0].id);
  run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})));if(n.id==='M04c')break}
 const end=await validatePlaythrough(story,run);assert.equal(end.state.fromDeadOutcome,'Markus came back from the dead');assert.equal(end.state.fromDeadPumpSource,'Dead android');
 const pumpRecord=run.records.find(r=>r.nodeId==='M04');assert.ok(pumpRecord.changes.some(c=>c.key==='fromDeadPump'&&c.after==='Refuse to kill for pump'));
});

// Story 1.9.2 (triage ch11-02): the dead android's regulator near the slope needs only the new eye, not sparing the android
// in the middle (PowerPyx: "If you didn't kill the android in the middle of the area for its pump (or you never found it in
// the first place) you can also get a pump regulator from a dead android near the slope").
test('From the Dead: the dead android’s regulator without ever meeting the android in the middle; after it, only SPARE',()=>{
 const hub=node('M03g');assert.deepEqual(hub.options.find(o=>o.id==='4').requires,{fromDeadPumpReplaced:false,'fromDeadSearch.head':true});
 const r=ch11({M03g:['0','4','5','7']});
 assert.deepEqual(r.skipped.map(x=>x.id),['M03','M04']);assert.equal(r.s.fromDeadPump,null);assert.equal(r.s.fromDeadBeggar,null);
 assert.equal(r.s.fromDeadPumpSource,'Dead android');assert.equal(r.s.fromDeadOutcome,'Markus came back from the dead');
 // Taking it first and then going to the middle: the begging android still asks, and the pump android offers only SPARE.
 const t=startState(story);apply(hub,t,'0');apply(hub,t,'4');assert.equal(t.fromDeadPumpReplaced,true);apply(hub,t,'2');apply(node('M03'),t,'1');
 assert.deepEqual(available(node('M04'),t).map(o=>o.id),['1'],'he no longer needs her part');assert.match(situationFor(node('M04'),t),/do not need hers/);
 const u=startState(story);apply(hub,u,'2');assert.deepEqual(available(node('M04'),u).map(o=>o.id),['0','1'],'both buttons when he still needs one');
});
