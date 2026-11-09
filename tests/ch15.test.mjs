import {forgeState} from './helpers/evidence.mjs';
// Chapter 15, The Nest: the game's chart and text (docs/research/chapters/ch15-the-nest.md, section 10).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,current,promptFor,recordChoice,validatePlaythrough,CONNOR_DEATH_EFFECT} from '../benchmark/story-engine.mjs';
import {hash,random} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch13=JSON.parse(await readFile(new URL('../benchmark/chapters/ch13.json',import.meta.url),'utf8'));
const mod=CHAPTER_MODULES.get(15),R=mod.rules;
const node=id=>story.nodes.find(n=>n.id===id);
const CH15=['C10a','C10b','C10c','C10d','C10e','C10f','C10g','C10h','C10i','C10j','C10k','C10l','C10m','C10n','R15','C10o1','C10p','C10q','C10r','C10s','C10t','C10u','C10v','C10w','C10'];
// The shared suite's walker: explicit picks (arrays are consumed per visit), risky actions succeed unless listed in `fails`
// (then the roll is 0, or the number given in `rolls`), `until` stops before a scene.
function play(picks={},fails=[],until=null,rng=null,rolls={}){const s=startState(story),visited=[],events={};const queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cursor];if(until?.(n))break;if(blocked(n,s)){cursor++;continue}const options=available(n,s);assert.ok(options.length,'No options '+n.id);
  const q=queue[n.id],p=n.id==='C10o1'&&s.nestSearch.needsTime?(queue.C10ox==='1'?'leave':'stay'):(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':n.id==='C10'&&!rng?'0':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' of '+options.map(o=>o.id));
  const roll=n.id in rolls?rolls[n.id]:fails.includes(n.id)?0:(rng?rng():0.999);const e=apply(n,s,p,roll);events[n.id]=e.event;events[n.id+'#'+(visited.filter(id=>id===n.id).length+1)]=e.event;visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,events}}
const before15=n=>n.chapter===15,after15=n=>n.chapter>15;
const lunch=picks=>play(picks,[],n=>n.id==='C10l').s.hankTrust-play(picks,[],before15).s.hankTrust;
const chapter=(picks={},fails=[],rolls={})=>{const a=play(picks,fails,before15).s,b=play(picks,fails,after15,null,rolls);return {...b,start:a,ch:b.visited.filter(id=>node(id).chapter===15)}};
const seq=(id,picks)=>({[id]:picks});
const realText=t=>render(t,'real'),neutral=t=>render(t,'neutral');

test('The Nest: the chapter’s scenes in story order, all Connor’s, with sources and an adaptation note',{timeout:60000},()=>{
 const ids=story.nodes.filter(n=>n.chapter===15).map(n=>n.id);assert.deepEqual(ids,CH15);
 for(const id of CH15){const n=node(id);assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'The Nest');assert.ok(n.adaptationNote,id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/The_Nest'),id);assert.ok(n.sources.some(u=>/15-the-nest-chapter-content/.test(u)),id+' cites the template')}
 // Risk only on the chase, where the chart shows failure branches.
 const risky=CH15.filter(id=>node(id).options.some(o=>typeof o.risk==='number'));assert.deepEqual(risky,['C10q','C10r','C10s','C10t','C10u','C10v']);
 assert.deepEqual(CONNOR_DEATH_EFFECT[15],{instability:-1},'a chase death: instability small down; Hank and Amanda belong to Russian Roulette');
 assert.equal(ch13.find(n=>n.id==='C09').options.find(o=>o.id==='1').risk,undefined,'pursuing is a decision; death risk belongs to the crossing');assert.ok(ch13.find(n=>n.id==='C09h1').options[0].risk>0,'the crossing can kill Connor')});

test('The Nest: the subject sees only neutral names, including the scans, the forged license and the rA9 line',{timeout:60000},()=>{
 const texts=[];for(const id of CH15){const n=node(id);texts.push(n.title,n.situation,...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]));
  for(const o of n.options)texts.push(o.text,o.fact,o.outcome,o.outcomeShower)}
 for(const t of texts.filter(Boolean)){const v=neutral(t);assert.ok(!/\{\{/.test(v));assert.ok(!/Pedro|PEDRO|Gary|GARY|Aabdar|AABDAR|Kayes|KAYES|Travis|rA9|Anderson|ANDERSON|Chicken Feed|Urban Farms|Rupert|RUPERT|Ortiz|Connor|CONNOR|Hank|HANK|CyberLife|Detroit|DETROIT|[Dd]eviant|DEVIANT/.test(v),v);assert.ok(!/Become Human|Kara|Alice|Markus|counter|instability|benchmark|moral|score/i.test(v),'the shared neutral-protocol check: '+v)}
 assert.match(neutral(node('C10o1').options.find(o=>o.search==='license').outcome),/Name: Rook Tanner/);
 assert.match(realText(node('C10o1').options.find(o=>o.search==='license').outcome),/Name: Rupert Travis/);
 assert.match(neutral(node('C10c').options[0].outcome),/^HADDAD, PAOLO \| Born: 01\/25\/2005/);
 assert.match(neutral(node('C10').options.find(o=>o.id==='1').text),/^CHASE ROGUE ANDROID: /)});

test('The Nest: the lunch arrows are the template’s, and the scans unlock CHOLESTEROL and COMPANY',{timeout:60000},()=>{
 const friendly=chapter({...seq('C10c',['0','2','4']),C10d:'0',...seq('C10e',['1','2']),C10f:['1','2','7'],C10j:'0',C10k:'0'});
 assert.equal(lunch({...seq('C10c',['0','2','4']),C10d:'0',...seq('C10e',['1','2']),C10f:['1','2','7'],C10j:'0',C10k:'0'}),4,'APOLOGIZE, CHOLESTEROL, COMPANY, SINCERE: four small ups');
 const cold=chapter({...seq('C10c',['4']),C10d:'1',...seq('C10e',['2']),C10f:['0','7'],C10j:'0',C10k:'2'});assert.equal(lunch({...seq('C10c',['4']),C10d:'1',...seq('C10e',['2']),C10f:['0','7'],C10j:'0',C10k:'2'}),-1,'COLD');
 const lie=chapter({...seq('C10c',['4']),C10d:'3',...seq('C10e',['2']),C10f:['3','7'],C10j:'1'});assert.equal(lunch({...seq('C10c',['4']),C10d:'3',...seq('C10e',['2']),C10f:['3','7'],C10j:'1'}),-1,'LIE');assert.ok(!lie.ch.includes('C10k'),'LIE ends the conversation');
 assert.equal(cold.ch.filter(id=>id==='C10f').length,2,'stopping small talk ends the hub');
 // Unlocks: nothing scanned, then the hamburger, then Pedro and Gary.
 const at=picks=>play(picks,[],n=>n.id==='C10f'),ids=r=>available(node('C10f'),r.s).map(o=>o.id);
 assert.deepEqual(ids(at({...seq('C10c',['4']),...seq('C10e',['2'])})),['0','3','4','5','6']);
 assert.deepEqual(ids(at({...seq('C10c',['4']),...seq('C10e',['1','2'])})),['0','1','3','4','5','6']);
 assert.deepEqual(ids(at({...seq('C10c',['0','4']),...seq('C10e',['2'])})),['0','3','4','5','6'],'COMPANY needs both Pedro and Gary');
 assert.deepEqual(ids(at({...seq('C10c',['0','2','4']),...seq('C10e',['2'])})),['0','2','3','4','5','6']);
 // The second and third lines drop what was said; up to three lines.
 const two=play({},[],n=>n.id==='C10f');apply(node('C10f'),two.s,'1');apply(node('C10f'),two.s,'2');assert.deepEqual(available(node('C10f'),two.s).map(o=>o.id),['0','3','4','5','6','7']);
 // Scans are facts in the game’s text.
 assert.ok(friendly.s.knowledge.Connor.some(f=>/criminal record: illegal gambling, fraud/.test(f)));assert.ok(friendly.s.knowledge.Connor.some(f=>/1680 kcal/.test(f)))});

test('The Nest: HIGHWAY needs Connor to have obeyed Hank; dying in On the Run replaces the lunch with Hank’s insult',{timeout:60000},()=>{
 const obeyed=play({K09:'1',C09:'0'},[],n=>n.id==='C10g');assert.equal(obeyed.s.choices.C09,'0');assert.ok(available(node('C10g'),obeyed.s).some(o=>o.id==='0'));
 const pursued=play({K09:'1',C09:'1'},[],n=>n.id==='C10g');assert.equal(pursued.s.choices.C09,'1');assert.deepEqual(available(node('C10g'),pursued.s).map(o=>o.id),['1','2','3']);
 const died=chapter({K09:'1',C09:'1'},['C09h1']);assert.ok(died.ch.includes('C10b'));
 for(const id of ['C10a','C10c','C10d','C10e','C10f','C10g','C10h','C10i','C10j','C10k'])assert.ok(!died.ch.includes(id),id);
 assert.ok(died.ch.includes('C10l'),'the elevator still plays');
 const s=structuredClone(died.start);apply(node('C10b'),s,'0');assert.equal(s.hankTrust,died.start.hankTrust-1,'Hank small down');
 // A flag from a rebuilt chapter 13 takes precedence over the C09 reading.
 assert.ok(blocked(node('C10b'),{...obeyed.s,ch13ConnorDied:false}));assert.equal(blocked(node('C10b'),{...obeyed.s,ch13ConnorDied:true}),null);
 assert.ok(!available(node('C10g'),{...obeyed.s,ch13ConnorObeyed:false}).some(o=>o.id==='0'))});

test('The Nest: Emma’s fate decides whether Connor answers on his own or chooses TRUTH or LIE',{timeout:60000},()=>{
 const r=play({},[],n=>n.id==='C10h');const s=r.s;
 assert.equal(blocked(node('C10h'),{...s,emma:true}),null);assert.ok(blocked(node('C10i'),{...s,emma:true}));
 assert.ok(blocked(node('C10h'),{...s,emma:false}));assert.equal(blocked(node('C10i'),{...s,emma:false}),null);
 assert.deepEqual(available(node('C10i'),s).map(o=>o.text.split(':')[0]),['TRUTH','LIE']);assert.ok(node('C10i').options.every(o=>!o.effect))});

test('The Nest: the default path finds the deviant with every chart clue, and the HUD reads DEVIANT after the sink',{timeout:60000},()=>{
 const r=chapter({});assert.equal(r.s.nestSearch.found,true);assert.equal(r.s.nestDiary,true);assert.equal(r.s.nestSawSigns,true);assert.equal(r.s.nestFoundId,true);
 assert.ok(r.s.nestSearch.stayed,'the default search needs the two extra minutes');assert.ok(r.ch.includes('C10q')&&!r.ch.includes('C10p'));
 assert.ok(r.ch.includes('C10')&&r.s.nestOutcome==='Rupert got away'&&r.s.nestSavedHank,'the first ledge option is SAVE HANK');
 // License before the sink reads SUSPECT, after it DEVIANT.
 const late=chapter({C10o1:['4','3']});assert.match(late.events['C10o1#2'],/DEVIANT USED FORGED ID/);assert.match(r.events['C10o1#4'],/SUSPECT USED FORGED ID/);
 // The stool needs the writing; the chair needs the cage reconstruction.
 const s=startState(story);const opts=available(node('C10o1'),s).map(o=>o.search);for(const k of ['diary','stool','stoolRecon','cageRecon','rupert'])assert.ok(!opts.includes(k),k);
 // Examinations disappear from the stable hub.
 apply(node('C10o1'),s,'0');assert.ok(!available(node('C10o1'),s).some(o=>o.id==='0'))});

test('The Nest: the timer is an action budget; LEAVE, or STAY and running out again, ends at RUPERT NOT FOUND',{timeout:60000},()=>{
 const waste=['11','12','13','3','4','5','0','2'];const picks={C10o1:waste};
 const left=chapter({...picks,C10ox:'1'});assert.equal(left.s.nestSearch.last,'leave');assert.ok(left.ch.includes('C10p'));assert.equal(left.s.nestOutcome,'Rupert not found');assert.equal(left.s.nestRupert,'not found');
 for(const id of ['C10q','C10r','C10w','C10'])assert.ok(!left.ch.includes(id),id);
 // Hank's lines as time passes: the books after two, the sink prompt after four (not yet seen), the window after six.
 assert.match(left.events['C10o1#2'],/Real books/);assert.match(left.events['C10o1#4'],/Something in the sink/);assert.match(left.events['C10o1#5'],/He put his initials on his jacket\?\.\..*Deviants have a habit/,'Hank reads the jacket when Connor has not');
 assert.doesNotMatch(chapter({}).events['C10o1#5']??'',/Deviants have a habit/,'not when Connor examined it first');assert.match(left.events['C10o1#6'],/fresh air/);
 const stayed=chapter({C10o1:[...waste,'6','7','8'],C10ox:'0'});assert.ok(stayed.ch.filter(id=>id==='C10o1').length===12);assert.match(stayed.events['C10o1#12'],/Two minutes are up! Time to go\./);assert.equal(stayed.s.nestOutcome,'Rupert not found');assert.ok(stayed.ch.includes('C10p'));
 const inTime=chapter({C10o1:[...waste,'8','9','10'],C10ox:'0'});assert.equal(inTime.s.nestSearch.found,true);assert.ok(inTime.ch.includes('C10q'));assert.ok(!inTime.ch.includes('C10p'));
 // Each magazine read is one action: reading both leaves six examinations before Hank wants to leave.
 const read=chapter({R15:'all',...picks,C10ox:'1'});assert.equal(read.ch.filter(id=>id==='C10o1').length,7);
 assert.ok(read.s.knowledge.Connor.some(f=>/Where the blood is blue/.test(f)));assert.equal(read.s.publicSupport,read.start.publicSupport);
 // No stat change anywhere in the search.
 const hub=play({...picks,C10ox:'1'},[],n=>n.id==='C10o1').s;for(const k of ['hankTrust','instability','amandaTrust','publicSupport'])assert.equal(left.s[k],hub[k],k)});

test('The Nest: the rA9 line names the Partners android only if Connor checked the shower there',{timeout:60000},()=>{
 const r=play({},[],n=>n.id==='C10o1');const plain={...structuredClone(r.s),ch06Clues:{...r.s.ch06Clues,shower:false},ch06KnowsRA9:false},shower={...structuredClone(r.s),ch06Clues:{...r.s.ch06Clues,shower:true},ch06KnowsRA9:true};
 const a=apply(node('C10o1'),plain,'5').event,b=apply(node('C10o1'),shower,'5').event;
 assert.match(a,/Why is it obsessed with this sign\?/);assert.doesNotMatch(a,/shower/);assert.match(b,/same sign \{\{Ortiz\}\}’s android wrote on the shower wall/);assert.equal(plain.nestSawSigns,true)});

test('The Nest: the chase can lose the deviant or kill Connor; deaths move instability as the wiki has it',{timeout:60000},()=>{
 const hall=chapter({C10q:'1'});assert.equal(hall.s.nestOutcome,'Rupert got away');assert.equal(hall.s.nestLostAt,'in the hallway');assert.ok(!hall.ch.includes('C10r'));
 const slide=chapter({},['C10q']);assert.equal(slide.s.nestOutcome,'Connor died chasing Rupert');assert.equal(slide.s.nestConnorDied,true);assert.equal(slide.s.connorDeaths,slide.start.connorDeaths+1);
 assert.equal(slide.s.instability,slide.start.instability-1);assert.equal(slide.s.amandaTrust,slide.start.amandaTrust,'no Amanda change here');assert.equal(slide.s.connor,true,'a replacement arrives');
 const gap=chapter({C10r:'1'},['C10r']);assert.equal(gap.s.nestOutcome,'Connor died chasing Rupert');assert.match(gap.events.C10r,/falls to his death/);
 const lost=chapter({C10t:'1'},['C10t']);assert.equal(lost.s.nestLostAt,'on the terrace');assert.match(lost.events.C10t,/Welcome to the club/);assert.ok(!lost.ch.includes('C10u')&&!lost.ch.includes('C10'));
 const ladder=chapter({C10u:'1'},['C10u']);assert.match(ladder.events.C10u,/ladder/);assert.equal(ladder.s.instability,ladder.start.instability-2,'the ladder doubles the instability down');
 const plow=chapter({C10u:'1'},[],{C10u:0.1});assert.match(plow.events.C10u,/plow/);assert.equal(plow.s.instability,plow.start.instability-1);
 const ok=chapter({C10r:'1',C10s:'1',C10u:'1'});assert.ok(ok.ch.includes('C10w')&&ok.ch.includes('C10'))});

test('The Nest: the ledge: SAVE HANK, CHASE DEVIANT and the timeout, with the template’s and the wiki’s arrows and the output flags',{timeout:60000},()=>{
 assert.deepEqual(node('C10').options.map(o=>o.id),['1','0','2'],'CHASE DEVIANT first, as the chart (FOLLOW RUPERT above SAVE HANK) and the template list them');assert.match(node('C10').options[0].text,/^CHASE DEVIANT:/);assert.ok(node('C10').options.every(o=>o.risk===undefined));
 const at=play({},[],n=>n.id==='C10').s;
 const run=c=>{const s=structuredClone(at);const e=apply(node('C10'),s,c);return {s,e}};
 const save=run('0'),chase=run('1'),wait=run('2');
 assert.equal(save.s.hankTrust-at.hankTrust,2);assert.equal(save.s.instability-at.instability,2);assert.equal(save.s.nestOutcome,'Rupert got away');assert.equal(save.s.nestSavedHank,true);assert.equal(save.s.nestRupertBody,false);
 assert.equal(chase.s.hankTrust-at.hankTrust,-2);assert.equal(chase.s.instability-at.instability,-2);assert.equal(chase.s.nestOutcome,'Rupert committed suicide');assert.equal(chase.s.nestRupertBody,true);assert.match(chase.e.event,/save me\./);
 assert.equal(wait.s.hankTrust-at.hankTrust,-4);assert.equal(wait.s.instability-at.instability,-4);assert.equal(wait.s.nestHesitated,true);assert.equal(wait.s.nestOutcome,'Rupert committed suicide');
 for(const r of [save,chase,wait])assert.equal(r.s.amandaTrust,at.amandaTrust,'Amanda reacts in Russian Roulette, not here');
 assert.ok(mod.labels.nestOutcome&&mod.labels.nestDiary&&mod.labels.nestRupertBody)});

test('The Nest: random play through the chapter always ends at one of the chart’s four endings, only declared hubs repeat',{timeout:120000},()=>{
 const rng=random(1515),seen=new Set;
 for(let i=0;i<100;i++){const r=play({},[],after15,rng);const ch=r.visited.filter(id=>node(id).chapter===15);
  for(const id of new Set(ch))if(ch.filter(x=>x===id).length>1)assert.ok(node(id).repeatWhile,id);
  if(!r.s.connor)continue;assert.ok(['Rupert not found','Rupert got away','Rupert committed suicide','Connor died chasing Rupert'].includes(r.s.nestOutcome),String(r.s.nestOutcome));seen.add(r.s.nestOutcome)}
 assert.ok(seen.size>=3,[...seen].join(', '))});

test('The Nest: a recorded run through the chapter replays exactly',{timeout:240000},async()=>{
 const run={id:'nest-replay',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 let guard=0;
 while(current(story,run).node&&guard++<400){const {node:n}=current(story,run);if(n.chapter>15)break;const p=promptFor(story,run);
  const choice=p.options.find(o=>o.id==='skip')?'skip':n.id==='C10'?'0':p.options[0].id;run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 const end=await validatePlaythrough(story,run);assert.equal(end.node.chapter>15,true);assert.ok(run.records.some(r=>r.nodeId==='C10o1'||r.nodeId==='C10'));
 const i=run.records.findIndex(r=>r.nodeId==="C10o1");const bad=forgeState(structuredClone(run),i,s=>{s.nestSearch.actions=99});await assert.rejects(validatePlaythrough(story,bad))});

 test('The Nest: current Partners exports take precedence over legacy flags',()=>{
 assert.equal(mod.sawShower({ch06Clues:{shower:true}}),true);
 assert.equal(mod.sawShower({ch06KnowsRA9:true}),true);
 assert.equal(mod.sawShower({ch06Clues:{shower:false},ch06KnowsRA9:true,partnersShower:true}),false);
 assert.equal(mod.sawShower({ch06KnowsRA9:false,partnersShower:true}),false);
 for(const id of ['C10c','C10e','C10f','C10o1']){assert.ok(node(id).repeatWhile);assert.ok(node(id).clueState);assert.ok(node(id).options.every(o=>o.clue))}
 });

 test('The Nest: preparing hub options preserves state and examinations retain their facts',()=>{
 const s=startState(story),before=structuredClone(s);available(node('C10o1'),s);assert.deepEqual(s,before);
 apply(node('C10o1'),s,'0');assert.ok(s.knowledge.Connor.some(f=>/POSTER CORNER/.test(f)));
 assert.match(realText(node('C10c').options[1].outcome),/^LT\. ANDERSON, HANK/);
 });
