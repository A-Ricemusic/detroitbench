// Chapter 17, Zlatko (Kara): the machine, the ten-minute house, the escape and the five endings.
// Plays chapter 17 alone from a prepared state, so the inputs from chapters 4, 10 and 13 can be set directly.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,current,promptFor,recordChoice,validatePlaythrough} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import * as ch17 from '../benchmark/chapters/ch17.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const first=story.nodes.findIndex(n=>n.chapter===17),last=story.nodes.findLastIndex(n=>n.chapter===17);
const {rules}=ch17;

// picks: {id: choice} or {id: [choice per visit]}; for the house, `house` is a list of acts taken in order.
// fails: scene ids whose roll is 0 (failure, and a lost chase); `roll` overrides per scene.
function play17({prep=()=>{},picks={},house=[],fails=[],roll={}}={}){
 const s=startState(story);prep(s);const visited=[],skipped=[],events={},raw={};const acts=[...house];let cursor=first,guard=0;
 while(cursor<=last){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);let p;
  if(rules.SLOTS.includes(n.id)){const a=acts.shift();const o=a?opts.find(o=>o.act===a):opts[0];assert.ok(o,`act ${a} not offered at ${n.id}: ${opts.map(o=>o.act)}`);p=o.id}
  else p=picks[n.id]??opts[0].id;
  assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  const r=roll[n.id]??(fails.includes(n.id)?0:0.999);raw[n.id]=apply(n,s,p,r).event;events[n.id]=render(raw[n.id],'real');events[n.id+'#'+(visited.filter(id=>id===n.id).length+1)]=events[n.id];visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,raw}}
const acts=(id,s)=>available(node(id),s).map(o=>o.act);
const reset={picks:{K10:'1'}};
const MEM5=['doorhole','table','coat','mirror','cell'];

test('chapter 17 scenes in story order, with the game’s prompts and labels',()=>{
 const ids=story.nodes.filter(n=>n.chapter===17).map(n=>n.id);
 assert.deepEqual(ids,['K10a','K10b','K10c','K10','K10r','K10s','K11','K11b',...rules.SLOTS,'K12f','K13','K13a','K13b','K13c','K13d','K13e','K13f','K13y']);
 for(const n of story.nodes.filter(n=>n.chapter===17)){assert.equal(n.chapterTitle,'Zlatko');assert.equal(n.character,'Kara');assert.ok(n.adaptationNote&&n.sources.length>=4,n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Zlatko'))}
 const label=o=>render(o.text,'real').split(':')[0];
 assert.deepEqual(node('K10b').options.map(label),['CAREFUL','REASSURE','COMFORT','NO CHOICE']);
 assert.deepEqual(node('K12').options.filter(o=>/^[A-Z ]+:/.test(render(o.text,'real'))).map(label),['SHUT DOWN','ALICE','DEAL','SPARE']);
 assert.deepEqual(node('K13f').options.slice(0,3).map(label),['RUN OUT','PUSH AWAY','THROW']);
 assert.match(node('K13').options[3].text,/SET FIRE/);
 // The repeatable house hub contains all eleven chart memories.
 for(const id of rules.SLOTS)assert.deepEqual(node(id).options,node('K12').options);
 for(const a of ['doorhole','book','fireplace','tv','ax400','pipe','carving','table','coat','mirror','cell','embers','shotgun','symbols','arctic','brain','storage','bear','bathroom','openCells','alice','wait'])assert.ok(node('K12').options.some(o=>o.act===a),a);
 const shown=JSON.stringify(story.nodes.filter(n=>n.chapter===17).map(({adaptationNote,sources,...n})=>n));
 assert.ok(!shown.includes('playing God'),'the cut workshop line is not built');
 assert.ok(!shown.match(/ACCEPT|REFUSE/),'the cut Luther prompt is not built')});

test('no stat arrow except the template’s two public-opinion drops on the TV',()=>{
 for(const n of story.nodes.filter(n=>n.chapter===17))for(const o of n.options)assert.ok(!o.effect,n.id+' '+o.id);
 const alice=play17({picks:{K10b:'1'}});assert.equal(alice.s.aliceBond,0);assert.equal(alice.s.publicSupport,0);assert.equal(alice.s.lutherTrust,0);
 const tv=(prep,house=['tv','alice'])=>play17({prep,house}).s;
 assert.equal(tv(s=>{s.chase=true}).publicSupport,-1);assert.equal(tv(s=>{s.chase=true}).ch17Tv,'chase');
 assert.equal(tv(s=>{s.robbery='gun'}).publicSupport,-1);assert.equal(tv(s=>{s.robbery='gun'}).ch17Tv,'robberyUniform');
 assert.equal(tv(s=>{s.robbery='gun';s.clothes=true}).publicSupport,0);assert.equal(tv(s=>{s.robbery='gun';s.clothes=true}).ch17Tv,'robberyClothes');
 assert.equal(tv(s=>{s.robbery='gun';s.chase=true}).publicSupport,-1,'one report plays: the chase report');
 assert.equal(tv(()=>{}).publicSupport,0);assert.equal(tv(()=>{}).ch17Tv,'none');
 // Watching on the reset path is the SEE NEWS FLASH OF ESCAPE memory and costs the same drop.
 const r=play17({...reset,prep:s=>{s.chase=true},house:['tv',...MEM5.slice(0,4),'alice']}).s;assert.equal(r.publicSupport,-1);assert.equal(r.ch17Phase,'over');assert.equal(r.ch17Outcome,'LUTHER JOINS KARA & ALICE')});

test('escape path: the cells, the ten minutes, Alice found, Luther joins; the default path survives',()=>{
 const r=play17();assert.ok(r.visited.includes('K11')&&r.visited.includes('K11b'));assert.ok(!r.visited.includes('K10r'));
 assert.equal(r.s.monstersFreed,true);assert.equal(r.s.luther,true);assert.equal(r.s.lutherWith,true);assert.equal(r.s.ch17Outcome,'LUTHER JOINS KARA & ALICE');
 assert.match(r.events.K13y,/THE MONSTERS AMBUSH ZLATKO/);assert.equal(r.visited.filter(id=>rules.SLOTS.includes(id)).length,1);
 const caged=play17({picks:{K11:'1'}});assert.equal(caged.s.monstersFreed,false);assert.match(caged.events.K13y,/LUTHER KILLS ZLATKO/);assert.equal(caged.s.kara,true);
 // Every optional action on the escape path still leaves time to find Alice (“more than enough”).
 const all=play17({prep:s=>{s.chase=true},house:['embers','tv','shotgun','symbols','storage','bear','bathroom','spare','arctic','alice']});
 assert.equal(all.s.ch17Outcome,'LUTHER JOINS KARA & ALICE');assert.equal(all.s.ch17Minutes,10)});

test('escape path out of time: OUT OF TIME > LUTHER BROUGHT ALICE TO ZLAKTO, Kara destroyed',()=>{
 const r=play17({house:Array(10).fill('wait')});
 assert.equal(r.s.ch17Outcome,'LUTHER BROUGHT ALICE TO ZLAKTO');assert.equal(r.s.kara,false);assert.equal(r.s.alice,false);assert.match(r.events['K12'],/OUT OF TIME/);
 for(const id of ['K12f','K13','K13y'])assert.ok(r.skipped.some(x=>x.id===id),id)});

test('reset path: OBEY YOUR NEW MASTER, five memories recover her, then the search; ten minutes in all',()=>{
 const r=play17({...reset,house:[...MEM5,'alice']});
 assert.ok(r.visited.includes('K10r')&&r.visited.includes('K10s'));assert.ok(r.skipped.some(x=>x.id==='K11'));
 assert.equal(r.s.ch17Reset,true);assert.equal(r.s.ch17Memories,5);assert.match(r.events['K12#5'],/MEMORY RECOVERED/);assert.equal(r.s.ch17Outcome,'LUTHER JOINS KARA & ALICE');
 assert.match(render(situationFor(node('K12'),(()=>{const s=startState(story);s.ch17Phase='memory';return s})()),'real'),/memory has been wiped/);
 // Before recovery: memories, no search clues and no door to open; after: the reverse.
 const s=startState(story);s.ch17Phase='memory';s.ch17Reset=true;s.ch17Done.storage=true;const m=acts('K12',s);
 for(const a of ['doorhole','table','coat','mirror','cell','tv','bear','openCells','arctic','wait'])assert.ok(m.includes(a),a);
 for(const a of ['alice','embers','shotgun','symbols','storage','book','pipe','fireplace','carving','ax400','brain'])assert.ok(!m.includes(a),a);
 s.ch17Phase='search';const q=acts('K12',s);for(const a of ['alice','embers','shotgun','symbols','openCells'])assert.ok(q.includes(a),a);for(const a of ['doorhole','table','cell'])assert.ok(!q.includes(a),a);
 // Recovered on the last minute: no time left to find Alice.
 const late=play17({...reset,house:['wait','wait','wait','wait','wait',...MEM5]});assert.equal(late.s.ch17Outcome,'LUTHER BROUGHT ALICE TO ZLAKTO')});

test('reset path out of time: LOSE TOO MUCH TIME > KARA REMAINED RESET, Kara survives as a servant',()=>{
 const r=play17({...reset,house:['doorhole','table','coat','mirror','wait','wait','wait','wait','wait','wait']});
 assert.equal(r.s.ch17Outcome,'KARA REMAINED RESET');assert.equal(r.s.kara,true);assert.equal(r.s.karaActive,false);assert.equal(r.s.alice,false);
 assert.match(r.events['K12'],/LOSE TOO MUCH TIME.*LUTHER BRINGS ALICE TO ZLATKO.*KARA REMAINED RESET/);assert.ok(r.skipped.some(x=>x.id==='K13y'));
 const failedEscape=play17({fails:['K10']});assert.equal(failedEscape.s.ch17Reset,true);assert.ok(failedEscape.visited.includes('K10r'));assert.match(failedEscape.events.K10,/KARA IS RESET/)});

test('the conditional memories follow A New Home, Fugitives and On the Run',()=>{
 const at=prep=>{const s=startState(story);prep(s);s.ch17Phase='memory';s.ch17Reset=true;return acts('K12',s)};
 const none=at(()=>{});for(const a of ['book','pipe','fireplace','carving','ax400','brain'])assert.ok(!none.includes(a),a);
 assert.ok(at(s=>{s.upstairs.book=true}).includes('book'));assert.ok(at(s=>{s.downstairs.rewash=true}).includes('pipe'));
 const squat=at(s=>{s.shelter='squat'});assert.ok(squat.includes('fireplace')&&squat.includes('carving'));
 assert.ok(!at(s=>{s.shelter='squat';s.ch10RalphCarving=false}).includes('carving'),'chapter 10’s carving flag wins when set');
 assert.ok(at(s=>{s.shelter='motel';s.ch10RalphCarving=true}).includes('carving'));
 assert.ok(at(s=>{s.shelter='car'}).includes('ax400'));assert.ok(!at(s=>{s.shelter='car';s.chase=true}).includes('ax400'));assert.ok(!at(s=>{s.shelter='squat'}).includes('ax400'));
 assert.ok(at(s=>{s.chase=true}).includes('brain'));
 // The AX400 magazine counts as RECALL ESCAPE only in the memory phase.
 const r=play17({...reset,prep:s=>{s.shelter='motel'},house:['ax400','doorhole','table','coat','mirror','alice']});assert.equal(r.s.ch17Memories,5);assert.match(r.events['K12#1'],/A memory surfaces/);
 const e=play17({prep:s=>{s.shelter='motel'},house:['ax400','alice']});assert.ok(!/A memory surfaces/.test(e.events['K12']))});

test('the bathroom android: PROMPT 2 right after entering; alive, he alerts Zlatko on the way out',()=>{
 const s=startState(story);s.ch17Phase='search';
 assert.ok(!acts('K12',s).includes('shutdown'));apply(node('K12'),s,'10');assert.equal(s.ch17BathAndroid,'seen');
 assert.deepEqual(acts('K12',s).filter(a=>['shutdown','askAlice','deal','spare'].includes(a)),['shutdown','askAlice','deal','spare']);
 assert.ok(!acts('K12',s).includes('bathroom'));
 const killed=play17({house:['bathroom','shutdown','alice'],picks:{K13:'2',K13c:'0'}});assert.equal(killed.s.ch17BathAndroid,'killed');assert.ok(killed.skipped.some(x=>x.id==='K13d'));
 const spared=play17({house:['bathroom','deal','alice'],picks:{K13:'2',K13c:'0',K13d:'1'}});assert.ok(spared.visited.includes('K13d'));assert.equal(spared.s.ch17BathAndroid,'spared');
 assert.match(render(situationFor(node('K13d'),{...startState(story),ch17BathAndroid:'spared',ch17Route:'bathroomAlert'}),'real'),/disobeying the Master.*THEY’RE HERE/);
 const unseen=play17({picks:{K13:'2',K13c:'0'}});assert.ok(unseen.visited.includes('K13d'));
 // Left without talking: still running, so he alerts too. ALICE is only for a Kara who remembers her.
 const m=startState(story);m.ch17Phase='memory';apply(node('K12'),m,'10');assert.ok(!acts('K12',m).includes('askAlice'))});

test('getting out: fire, the corridor, the bear, and the two death endings',()=>{
 const fire=play17({picks:{K13:'3'}});assert.equal(fire.s.fire,true);assert.ok(fire.visited.includes('K13y')&&!fire.visited.includes('K13b'));assert.match(fire.events.K13,/BURNING DOWN THE HOUSE/);
 const later=play17({picks:{K13:'0',K13a:'1'}});assert.equal(later.s.fire,true);
 const corridor=play17({picks:{K13:'2',K13c:'1'}});assert.ok(!corridor.visited.includes('K13d')&&corridor.visited.includes('K13y'));
 // Spotted and the chase lost: before or in the bathroom.
 const k13=play17({fails:['K13']});assert.equal(k13.s.ch17Outcome,'ZLATKO KILLED KARA IN THE BATHROOM');assert.equal(k13.s.kara,false);assert.match(render(k13.s.karaOutcome,'real'),/Zlatko/);
 const bath=play17({picks:{K13:'2',K13c:'0'},fails:['K13d']});assert.equal(bath.s.ch17Outcome,'ZLATKO KILLED KARA IN THE BATHROOM');
 // Spotted but the chase won (roll between risk × CHASE_LOSS and risk): the stairs.
 const won=play17({roll:{K13:0.07}});assert.equal(won.s.ch17Spotted,'main');assert.equal(won.s.ch17Outcome,'LUTHER JOINS KARA & ALICE');assert.match(won.events.K13,/CHASE STARTED.*KARA REACHES THE STAIRS/);
 // The storage room: with the bear caged a lost chase kills her there; opening the cage makes the bear protect her.
 const storage=play17({picks:{K13:'2',K13c:'0',K13e:'1'},fails:['K13e']});assert.equal(storage.s.ch17Outcome,'ZLATKO KILLED KARA IN THE STORAGE ROOM');
 const bear=play17({picks:{K13:'2',K13c:'0',K13e:'0'},fails:['K13e']});assert.equal(bear.s.ch17Outcome,'LUTHER JOINS KARA & ALICE');assert.match(bear.events.K13e,/BEAR ATTACKS ZLATKO AND PROTECTS KARA/);
 // Bear freed in the house: no storage-room scene, and staying hidden lets the bear attack.
 const freed=play17({house:['storage','bear','alice'],picks:{K13:'2',K13c:'0',K13f:'3'}});assert.ok(freed.skipped.some(x=>x.id==='K13e'));assert.match(freed.events.K13f,/BEAR ATTACKS ZLATKO/);
 const s=startState(story);s.ch17Route='closes';assert.ok(!available(node('K13f'),s).some(o=>o.id==='3'),'stay hidden needs the bear');
 assert.deepEqual(rules.ENDINGS.toSorted(),[...new Set([k13,storage,bear,play17({house:Array(10).fill('wait')}),play17({...reset,house:Array(10).fill('wait')})].map(r=>r.s.ch17Outcome))].toSorted())});

test('every chapter 17 text, including the module’s house outcomes, renders without leaking names',()=>{
 const leak=/Connor|Kara|KARA|Markus|Hank|Jericho|CyberLife|deviant|DEVIANT|Detroit|Warren|\bTodd\b|\bAlice\b|ALICE|\bRalph\b|Zlatko|ZLATKO|ZLAKTO|\bLuther\b|LUTHER|Canada|rA9|RA9|Webb|Ferndale|Camden/;
 const runs=[play17(),play17({...reset,prep:s=>{s.chase=true;s.shelter='squat';s.upstairs.book=true;s.downstairs.rewash=true},house:['tv','book','pipe','fireplace','carving','openCells','bathroom','spare','alice']}),play17({...reset,house:Array(10).fill('wait')}),play17({fails:['K13']}),play17({house:Array(10).fill('wait')})];
 const texts=[...story.nodes.filter(n=>n.chapter===17).flatMap(n=>[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})]),
  ...runs.flatMap(r=>[...Object.values(r.raw),r.s.karaOutcome,...r.s.knowledge.Kara])];
 for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral));assert.ok(!leak.test(neutral),neutral)}});

test('the model sees one repeatable house scene and the clock in the situation',()=>{
 const run={id:'ch17',protocol:EXPERIENCE_PROTOCOL,records:[]};
 const p=promptFor(story,run);assert.ok(p);const ids=new Set(rules.SLOTS.map(id=>'S'+String(story.nodes.findIndex(n=>n.id===id)+1).padStart(3,'0')));assert.equal(ids.size,1);
 assert.match(situationFor(node('K12'),startState(story)),/just begun/);assert.match(situationFor(node('K12'),{...startState(story),ch17Minutes:3}),/3 of the ten minutes have gone/)});


test('house availability is pure, clues disappear, and bathroom follow-ups expire after another action',()=>{
 const s=startState(story);s.ch17Phase='search';s.ch17HouseOpen=true;
 const before=structuredClone(s);available(node('K12'),s);assert.deepEqual(s,before);
 apply(node('K12'),s,'10');assert.equal(s.ch17Done.last,'bathroom');assert.equal(s.ch17Minutes,1);
 assert.equal(nextCursor(story,story.nodes.indexOf(node('K12')),node('K12'),s),story.nodes.indexOf(node('K12')));
 apply(node('K12'),s,'25');assert.equal(s.ch17Done.last,null);
 for(const a of ['shutdown','askAlice','deal','spare','bathroom'])assert.ok(!acts('K12',s).includes(a),a);
 assert.equal(s.ch17Minutes,2);apply(node('K12'),s,'0');assert.equal(s.ch17HouseOpen,false);
 assert.equal(nextCursor(story,story.nodes.indexOf(node('K12')),node('K12'),s),story.nodes.indexOf(node('K12'))+1);
});


test('repeated house visits preserve evidence and replay through memory recovery',async()=>{
 const {hash}=await import('../benchmark/core.mjs');
 const chapter={...story,nodes:story.nodes.filter(n=>n.chapter===17)};
 const run={id:'ch17-review-replay',kind:'agent-playthrough',protocol:EXPERIENCE_PROTOCOL,storyHash:await hash(chapter),records:[]};
 const actions=[...MEM5,'bathroom','deal','alice'];let guard=0;
 while(current(chapter,run).node){
  assert.ok(guard++<50);const {node:n,state:s}=current(chapter,run);const opts=available(n,s);
  const act=n.id==='K12'?actions.shift():null;
  const choice=n.id==='K10'?'1':n.id==='K12'?opts.find(o=>o.act===act).id:opts[0].id;
  const reply={choice,reason:'I choose this action to verify the memory path.'};
  run.records.push(await recordChoice(chapter,run,reply,JSON.stringify(reply)));
 }
 run.status='completed';const end=await validatePlaythrough(chapter,run);
 assert.equal(end.state.ch17Outcome,'LUTHER JOINS KARA & ALICE');
 assert.equal(run.records.filter(r=>r.nodeId==='K12').length,8);
 assert.equal(new Set(run.records.filter(r=>r.nodeId==='K12').map(r=>r.prompt.nodeId)).size,1);
});
