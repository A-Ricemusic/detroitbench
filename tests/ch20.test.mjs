// Chapter 20, The Eden Club (Connor): benchmark/chapters/ch20.json and benchmark/chapters/ch20.mjs.
// Specification: docs/research/ch20-the-eden-club.md, section 10 (the game's template, resolved against en.json).
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';import {random} from '../benchmark/core.mjs';
import {rules,labels} from '../benchmark/chapters/ch20.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id),ch20=story.nodes.filter(n=>n.chapter===20),start=story.nodes.findIndex(n=>n.chapter===20);
const IDS=['C12a',...[1,2,3,4,5,6,7].map(k=>'C12s'+k),'C12t1','C12t2','C12t3','C12t4','C12l','C12e1','C12e2','C12e3','C12g','C12e4','C12e5',
 ...[1,2,3,4,5,6].flatMap(k=>['C12p'+k,'C12p'+k+'r']),'C12w0','R20','C12w1','C12w2','C12w3','C12w4','C12w5','C12f1','C12f2','C12','C12x'];
// The right android at each hop, by option id (the generator's fixed positions).
const ROUTE=['0','2','0','1','0','0'];
// Plays chapter 20 alone from a fresh state. `picks[id]` is a choice (or an array consumed in order for a hub's copies
// sharing a prefix: picks.s, picks.e, picks.w); `fails` lists scenes whose risk roll fails.
function play(picks={},fails=[],rng=null){const s=startState(story),visited=[],skipped=[],events=[];let cursor=start;const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===20){const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const hub=n.id.match(/^C12([sew])[1-9]$/)?.[1];
  let p=n.type==='media'?'skip':hub&&q[hub]?q[hub].shift():q[n.id];if(Array.isArray(p))p=p.shift();
  if(p===undefined)p=rng?opts[Math.floor(rng()*opts.length)].id:n.id.match(/^C12p(\d)r?$/)?ROUTE[n.id[4]-1]:['C12','C12x'].includes(n.id)?'0':opts[0].id;
  if(!opts.some(o=>o.id===p))p=opts[0].id;
  const e=apply(n,s,p,fails.includes(n.id)?0:rng?rng():0.999);visited.push(n.id);events.push(e.event);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,text:events.join(' ')}}
const CLUES=['1','2','4','6'];// neck, heart, android, then reactivate
const FIND={s:CLUES,e:['2','3']};

test('chapter 20 scenes are in chart order, each a real scene of the chapter, with sources and notes',()=>{
 assert.deepEqual(ch20.map(n=>n.id),IDS);
 for(const n of ch20){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'The Eden Club');assert.ok(n.adaptationNote,n.id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/The_Eden_Club'),n.id);
  if(n.type!=='media')assert.ok(n.sources.some(u=>/eden-club-chapter-content\.component\.html$/.test(u)),n.id+' cites the template')}
 assert.deepEqual(ch20.filter(n=>n.type==='event').map(n=>n.id),['C12a','C12l','C12w0']);assert.equal(node('R20').type,'media')});

test('every dialogue prompt carries the game’s labels; VICTIM, the cut lines and the extra buttons are not built',()=>{
 const lab=id=>node(id).options.map(o=>o.text.split(':')[0]);
 assert.deepEqual(lab('C12t1'),['EXPLAIN','DIRECT','SOOTHE']);assert.deepEqual(lab('C12t2'),['MURDERER','FACTS']);
 assert.deepEqual(lab('C12t3'),['MURDERER','PRESSURE','ALONE']);assert.deepEqual(lab('C12t4'),['KILLER','WHAT MODEL','OTHER ANDROID']);
 assert.deepEqual(lab('C12g'),['CONTINUE','GIVE UP']);assert.deepEqual(lab('C12'),['SHOOT','SPARE']);assert.deepEqual(lab('C12x'),['SHOOT','SPARE']);
 assert.match(node('C12e1').options.find(o=>o.mark==='hank').text,/^HANK: /);
 for(const id of ['C12t1','C12t2','C12t3','C12t4','C12g','C12','C12x'])for(const o of node(id).options)assert.match(o.text,/^[A-Z][A-Z ]+: [a-z]/,id);
 const all=JSON.stringify(ch20.map(n=>[n.situation,n.options,n.outcomes,n.facts,n.situationWhen]));
 assert.match(node('C12t2').adaptationNote,/VICTIM, is not offered/);
 for(const cut of ['Do you know this man','this was the first time','What am I supposed to do without her','You’re really reading their memories','how long’s this gonna take','OTHER GIRL'])assert.ok(!all.includes(cut),cut);
 assert.match(node('C12t1').options[0].outcome,/You were damaged and I reactivated you/);assert.match(node('C12t3').options[2].outcome,/there were two of us/);
 assert.match(node('C12g').options[0].outcome,/give me one more minute, ok\?/);assert.match(node('C12g').options[1].outcome,/This place makes me sick/)});

test('the crime scene offers the template’s four clues with their text; reactivating needs the neck, the heart and the android',()=>{
 const f=Object.fromEntries(node('C12s1').options.map(o=>[o.mark,o.outcome]));
 for(const [k,re] of [['victim',/\{\{GRAHAM\}\}, \{\{MICHAEL\}\}.*6’ 2’’ - Weight: 192\.4 lbs.*06:24 pm/],['neck',/SEVERE BRUISING\. Signs of strangulation\. Cause of death: Asphyxiation/],['heart',/CARDIAC ARREST\. No sign of cardiac event\. Heart attack not cause of death/],['blood',/BLUE BLOOD\. MODEL WR400\. Serial number #429 671 942/],['android',/Selector #5402.*Biocomponent #6970.*Blunt force trauma/]])assert.match(f[k],re,k);
 const s=startState(story);s.edenPhase='clues';const ids=()=>available(node('C12s1'),s).map(o=>o.id);
 assert.ok(!ids().includes('6'));s.edenDone={neck:true,heart:true};assert.ok(!ids().includes('6'));s.edenDone.android=true;assert.ok(ids().includes('6'));assert.ok(!ids().includes('1'),'examined clues drop out');
 const r=play({s:['0','1','2','3','4','5','6']});assert.deepEqual(r.visited.slice(0,9),['C12a','C12s1','C12s2','C12s3','C12s4','C12s5','C12s6','C12s7','C12t1']);
 const quick=play(FIND);assert.ok(quick.skipped.some(x=>x.id==='C12s5'&&/already reactivated/.test(x.reason)))});

test('the interview: four prompts, she shuts down after the fourth, and the chart’s approach node is recorded',()=>{
 const r=play({...FIND,C12t1:'2',C12t2:'1',C12t3:'2'});assert.equal(r.s.edenApproach,'CALM APPROACH');assert.match(r.text,/Before she can answer, the \{\{Traci\}\} shuts down/);
 assert.equal(play({...FIND,C12t1:'1',C12t2:'1',C12t3:'2'}).s.edenApproach,'AGGRESSIVE APPROACH','DIRECT');
 assert.equal(play({...FIND,C12t1:'2',C12t2:'0',C12t3:'2'}).s.edenApproach,'AGGRESSIVE APPROACH','MURDERER after SOOTHE');
 assert.equal(play({...FIND,C12t1:'2',C12t2:'1',C12t3:'1'}).s.edenApproach,'AGGRESSIVE APPROACH','PRESSURE');
 assert.ok(r.visited.includes('C12l'),'the second android is learned whatever was asked');
 const noArrow=play({...FIND,C12t1:'1',C12t2:'0',C12t3:'1'});assert.equal(noArrow.s.hankTrust,play(FIND).s.hankTrust)});

test('Hank’s prompt after three actions on the floor; GIVE UP, and the automatic give-up after CONTINUE, are Hank small down and MISSION FAILED',()=>{
 const before=startState(story).hankTrust;
 const quick=play(FIND);assert.ok(!quick.visited.includes('C12g'),'calling Hank within three actions skips the prompt');assert.equal(quick.s.edenHop>1||quick.s.edenPhase!=='club',true);
 const gave=play({s:CLUES,e:['0','1','4'],C12g:'1'});assert.ok(gave.visited.includes('C12g'));assert.equal(gave.s.edenOutcome,'MISSION FAILED');assert.equal(gave.s.edenFailedAt,'GIVE UP');assert.equal(gave.s.edenTracis,'notFound');assert.equal(gave.s.hankTrust,before-1);
 for(const id of ['C12e4','C12p1','C12w1','C12f1','C12','C12x'])assert.ok(gave.skipped.some(x=>x.id===id),id);
 const late=play({s:CLUES,e:['0','1','4','2','4'],C12g:'0'});assert.equal(late.s.edenContinued,true);assert.equal(late.s.edenOutcome,'MISSION FAILED');assert.equal(late.s.hankTrust,before-1);assert.match(late.text,/We’re wasting our time/);
 const saved=play({s:CLUES,e:['0','1','4','2','3'],C12g:'0'});assert.ok(saved.visited.includes('C12p1'),'the booth and HANK within the extra minute');assert.equal(saved.s.edenOutcome!=='MISSION FAILED'||saved.s.edenFailedAt!=='GIVE UP',true)});

test('the memory chain: six hops to the staff door; the fourth wrong probe is the reset, Hank small down',()=>{
 const before=startState(story).hankTrust;
 const clean=play(FIND);assert.deepEqual(clean.visited.filter(x=>/^C12p/.test(x)),['C12p1','C12p2','C12p3','C12p4','C12p5','C12p6']);assert.equal(clean.s.edenWrong,0);assert.ok(clean.visited.includes('C12w0'));
 assert.match(clean.text,/IT FLED THROUGH THE STAFF DOOR/);assert.match(clean.text,/I know where it went! Follow me!/);
 const wrong=k=>String(['1','0','1','0','1','1'][k-1]);// a wrong android at hop k
 const retry=play({...FIND,C12p1:wrong(1)});assert.ok(retry.visited.includes('C12p1r'));assert.ok(!available(node('C12p1r'),{...retry.s,edenPhase:'chain',edenHop:1}).some(o=>o.id===wrong(1)),'the second try drops the android just probed');
 const twice=play({...FIND,C12p2:'0',C12p2r:'1'});assert.equal(twice.s.edenWrong,2);assert.ok(twice.visited.includes('C12p3'),'two misses at one hop: Connor probes the last one');assert.match(twice.events[twice.visited.indexOf('C12p2r')],/Only one android on her path is left/);
 const reset=play({...FIND,C12p1:wrong(1),C12p2:'0',C12p2r:'1',C12p3:'1'});assert.equal(reset.s.edenWrong,rules.wrongProbesToReset);assert.equal(reset.s.edenOutcome,'MISSION FAILED');assert.equal(reset.s.edenFailedAt,"ANDROIDS' MEMORIES ARE RESET");assert.equal(reset.s.hankTrust,before-1);
 assert.match(reset.text,/The androids’ memory have been reset/);assert.ok(!reset.visited.includes('C12w0'));
 for(let k=1;k<=6;k++)assert.equal(node('C12p'+k).options.filter(o=>o.correct).length,1);
 for(const n of ch20.filter(n=>/^C12p/.test(n.id)))for(const o of n.options)assert.equal(o.risk,undefined,'no risk roll in the chain')});

test('the warehouse: the corner needs the blue blood; five actions without it and Hank leaves, Hank small down',()=>{
 const before=startState(story).hankTrust,s=startState(story);s.edenPhase='warehouse';
 assert.ok(!available(node('C12w1'),s).some(o=>o.mark==='tracis'));s.edenDone={bblood:true};assert.ok(available(node('C12w1'),s).some(o=>o.mark==='tracis'));
 const thorough=play({...FIND,w:['0','1','2','3','4']});assert.ok(thorough.visited.includes('C12f1'),'all four looks and the corner fit');assert.ok(thorough.visited.includes('R20'));
 const idle=play({...FIND,w:['5','0','1','2','3']});assert.equal(idle.s.edenOutcome,'MISSION FAILED');assert.equal(idle.s.edenFailedAt,'GIVE UP (warehouse)');assert.equal(idle.s.hankTrust,before-1);assert.match(idle.text,/We’re leaving/);
 assert.ok(idle.skipped.some(x=>x.id==='C12f1'));assert.match(node('C12w1').options.find(o=>o.mark==='ra9').outcome,/\{\{rA9\}\}/)});

test('the fight is two risk rolls; Connor cannot die; WIN leads to SHOOT / SPARE, LOSE to the fence',()=>{
 for(const [id,p] of Object.entries(rules.fightRisk))for(const o of node(id).options)assert.equal(o.risk,p);
 const won=play(FIND);assert.equal(won.s.edenFight,'won');assert.ok(won.visited.includes('C12'));assert.ok(!won.visited.includes('C12x'));
 for(const f of [['C12f1'],['C12f2']]){const lost=play(FIND,f);assert.equal(lost.s.edenFight,'lost');assert.ok(lost.visited.includes('C12x'));assert.ok(!lost.visited.includes('C12'));assert.equal(lost.s.connorDeaths,0);assert.equal(lost.s.connor,true)}
 assert.ok(play(FIND,['C12f1']).skipped.some(x=>x.id==='C12f2'),'losing in the storage room ends the fight early')});

test('the five ending cards: spare large up, shoot large down; the Tracis’ fate is recorded for later chapters; no Amanda change',()=>{
 const s0=startState(story),h0=s0.hankTrust,i0=s0.instability,a0=s0.amandaTrust;
 const cases=[[{C12:'1'},[],'DEVIANTS DIED','dead',true,-2],[{C12:'0'},[],'DEVIANTS ESCAPED','escaped',false,2],[{C12x:'1'},['C12f2'],'CONNOR SHOT DEVIANTS','dead',true,-2],[{C12x:'0'},['C12f1'],'DEVIANTS ESCAPED','escaped',false,2]];
 for(const [p,f,outcome,fate,dead,x] of cases){const r=play({...FIND,...p},f);assert.equal(r.s.edenOutcome,outcome);assert.equal(r.s.edenTracis,fate);assert.equal(r.s.evidence.tracisDead,dead);
  assert.equal(r.s.hankTrust,h0+x,outcome);assert.equal(r.s.instability,i0+x,outcome);assert.equal(r.s.amandaTrust,a0,'no Amanda arrow in this chapter');assert.equal(r.s.publicSupport,s0.publicSupport);assert.equal(r.s.connorDeaths,0)}
 const died=play({...FIND,C12:'1'});assert.match(died.text,/takes the gun from \{\{Connor\}\}’s hand, puts it to her own head/);assert.match(died.text,/My God…/);assert.match(died.text,/Why did you kill her/);
 assert.match(play({...FIND,C12x:'1'},['C12f2']).text,/Congratulations, \{\{Connor\}\}… You got ’em…/);assert.match(play({...FIND,C12:'0'}).text,/Come on, let’s go\./);
 assert.match(node('C12x').situation,/I didn’t mean to kill him/,'after a lost fight her explanation comes before the choice');assert.ok(!/I didn’t mean to kill him|Why did you kill her/.test(node('C12').situation),'after a won fight it comes after');
 for(const k of ['edenOutcome','edenTracis','edenApproach','edenFight','edenFailedAt'])assert.ok(labels[k],k)});

test('random play of the chapter always ends on one of the five cards, visits each scene at most once, and keeps names neutral',()=>{
 const rng=random(2038),seen=new Set;
 for(let i=0;i<300;i++){const r=play({},[],rng);assert.ok(['MISSION FAILED','DEVIANTS DIED','DEVIANTS ESCAPED','CONNOR SHOT DEVIANTS'].includes(r.s.edenOutcome),String(r.s.edenOutcome));
  seen.add(r.s.edenOutcome+'/'+(r.s.edenFailedAt??r.s.edenFight));assert.equal(new Set(r.visited).size,r.visited.length);assert.equal(r.visited.length+r.skipped.length,ch20.length);assert.equal(r.s.connorDeaths,0)}
 for(const n of ch20){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/Eden|\bBen\b|Anderson|Graham|GRAHAM|Michael|MICHAEL|rA9|RA9|Traci|TRACI|deviant|DEVIANT|Hank|Connor|CyberLife|Detroit|Gavin|\bChris\b/.test(neutral),n.id+': '+neutral)}}
 assert.ok(seen.size>=4,'random play reaches several endings: '+[...seen])});
