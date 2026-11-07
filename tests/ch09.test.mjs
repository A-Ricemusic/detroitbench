// Chapter 9, The Interrogation: the hidden stress meter, the approach loop, the confession questions, the four endings and
// the arrows, against docs/research/ch09-the-interrogation.md. Module: benchmark/chapters/ch09.mjs.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,current,promptFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';import {random} from '../benchmark/core.mjs';
import {RULES,OUTCOMES,questionsLeft,bandOf,reportLabels,deathEffect} from '../benchmark/chapters/ch09.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const CH9=story.nodes.filter(n=>n.chapter===9),node=id=>story.nodes.find(n=>n.id===id);

// Plays from the start of the story to the end of chapter 9. `setup` is merged into the state before the chapter
// (for the Partners clues, which Partners does not record yet). Risky actions succeed unless listed in `fails`.
function play(picks={},{fails=[],setup={},rng=null}={}){const s=startState(story),visited=[],skipped=[],events={},stressAt={};let cur=0,guard=0,at9=null;
 while(cur<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cur];if(n.chapter>9)break;
  if(n.chapter===9&&!at9){at9=structuredClone(s);Object.assign(s,structuredClone(setup))}
  const b=blocked(n,s);if(b){skipped.push(n.id);cur++;continue}const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);
  const p=picks[n.id]??(n.type==='media'?'skip':opts[rng?Math.floor(rng()*opts.length):0].id);assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}: ${opts.map(o=>o.id)}`);
  const e=apply(n,s,p,fails.includes(n.id)?0:0.999);visited.push(n.id);events[n.id]=e.event;stressAt[n.id]=s.ch09Stress;cur=nextCursor(story,cur,n,s)}
 return {s,visited,skipped,events,at9,stressAt}}
const v9=r=>r.visited.filter(id=>node(id).chapter===9);
// Interrogation rounds that leave the stress at 63% after the LED scan: WOUNDS, SHOW PHOTOS, THREATEN, PROBE MEMORY, TRUTH, TRUTH.
const ROOM={C06a1:'1',C06a2:'3',C06a3:'0',C06a4:'7'},HIGH={...ROOM,C06b:'2',C06c:'1',C06d:'2',C06e:'2',C06g:'1',C06h:'1'};
const CONVINCE_OK={C06:'2',C06v1:'1',C06v2:'0',C06v3:'0'};// 63 +7 −7 −7 = 56: optimal
const ALL_CLUES={ch06Clues:{writing:true,statue:true,shower:true}};

test('chapter 9 plays only when Partners found the suspect, and opens on the observation room',()=>{
 const none=play({C05:'1'});assert.deepEqual(v9(none),[]);for(const n of CH9)assert.ok(none.skipped.includes(n.id),n.id);
 const r=play();assert.equal(v9(r)[0],'C06o');assert.equal(r.at9.suspect,true);assert.equal(r.at9.ch09Stress,RULES.start)});

test('every chapter 9 scene has sources, a note, the game’s labels and renders without leaking names',()=>{
 const LEAK=/Connor|Hank|Gavin|Chris|Carlos|Ortiz|rA9|CyberLife|Detroit|deviant|instability|counter|Amanda|\bReed\b|Miller|\d+%/;
 for(const n of CH9){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'The Interrogation');assert.ok(n.adaptationNote,n.id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/The_Interrogation')&&n.sources.some(u=>/detroitbecometext.*9-the-interrogation/.test(u))&&n.sources.some(u=>/powerpyx\.com\/wp-content/.test(u)),n.id);
  const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.situationWhen??[]).map(w=>w.text)];
  for(const t of texts)assert.ok(!LEAK.test(render(t,'neutral')),n.id+': '+render(t,'neutral').match(LEAK))}
 const labels=id=>node(id).options.map(o=>o.text.split(':')[0]);
 assert.deepEqual(labels('C06b'),['FEAR','SHOW PHOTOS','WOUNDS','NAME']);assert.deepEqual(labels('C06d'),['COMFORT','REASSURE','THREATEN','BLAME']);
 assert.deepEqual(labels('C06e'),['SYMPATHIZE','THREATEN','PROBE MEMORY','TRUST']);assert.deepEqual(labels('C06g'),['LIE','TRUTH']);assert.deepEqual(labels('C06h'),['LIE','TRUTH']);
 assert.deepEqual(labels('C06'),['PRESSURE IT','PROBE ITS MEMORY','CONVINCE IT']);assert.deepEqual(labels('C06r'),['PRESSURE IT','PROBE ITS MEMORY','CONVINCE IT','GIVE UP']);
 assert.deepEqual(labels('C06p1'),['PRESSURE','GIVE UP']);assert.deepEqual(labels('C06v1'),['UNDERSTANDING','THREATEN','ORDER']);assert.deepEqual(labels('C06v2'),['SYMPATHIZE','INDIFFERENT','COMFORT']);assert.deepEqual(labels('C06v3'),['PROTECT','TERRIFY','WARN']);
 assert.deepEqual(labels('C06qr').slice(0,2),['APOLOGETIC','COLD']);assert.deepEqual(labels('C06m1'),['WRITING','STATUETTE','OFFERING','{{rA9}}','INSIST {{rA9}}','ATTIC','TRIGGER?']);
 assert.deepEqual(labels('C06s'),['INTERVENE','GIVE UP']);for(const id of ['C07','C07b','C07c'])assert.deepEqual(labels(id),['GIVE UP','INTERVENE']);
 assert.deepEqual(node('C06a1').options.filter(o=>o.clue&&o.fact).map(o=>o.fact.split(' (')[0].split(':')[0]),['PHOTOS OF CRIMESCENE','PROCESSING LED','MODEL HK400 - Housekeeper','BURN MARKS','HIT MARKS','DRIED BLOOD'])});

test('stress: starts at 35% and moves by the wiki’s published steps',()=>{
 const r=play({...HIGH,...CONVINCE_OK});
 assert.deepEqual(['C06b','C06c','C06d','C06e','C06g','C06h'].map(id=>r.stressAt[id]),[39,43,47,55,59,63],'WOUNDS +4, SHOW PHOTOS +4, THREATEN +4, PROBE MEMORY +8, TRUTH +4, TRUTH +4');
 assert.deepEqual(['C06v1','C06v2','C06v3'].map(id=>r.stressAt[id]),[70,63,56],'THREATEN +7, SYMPATHIZE −7, PROTECT −7');
 const calm=play({...ROOM,C06b:'3',C06c:'0',C06d:'0',C06e:'0',C06f:'3',C06g:'0',C06h:'0',C06:'2'});
 assert.deepEqual(['C06b','C06c','C06d','C06e','C06f','C06g','C06h'].map(id=>calm.stressAt[id]),[31,31,27,23,19,15,11],'NAME −4, FEAR 0, COMFORT −4, SYMPATHIZE −4, TRUST −4, LIE −4, LIE −4: the wiki’s lowest, 11%');
 assert.equal(calm.stressAt.C06v3,0,'three calming convince lines from 11% clamp at 0');assert.match(calm.events.C06v3,/CONVINCE FAILED/);
 for(const k of [1,2,3])for(const o of node('C06v'+k).options)assert.equal(Math.abs(o.stress),7);
 assert.equal(node('C06').options[0].stress,10);assert.equal(node('C06p1').options[0].stress,10);assert.equal(RULES.pressureGiveUp,-20);assert.equal(RULES.pressureGiveUpPowerPyx,-5);
 const gaveUp=play({...HIGH,C06:'0',C06p1:'0',C06p2:'1',C06r:'2',C06rv1:'0',C06rv2:'0',C06rv3:'0'});
 assert.deepEqual([gaveUp.stressAt.C06,gaveUp.stressAt.C06p1,gaveUp.stressAt.C06p2,gaveUp.stressAt.C06rv3],[73,83,63,42],'PRESSURE IT +10, PRESSURE +10, GIVE UP −20, then −21');
 assert.equal(bandOf(49),'low');assert.equal(bandOf(50),'optimal');assert.equal(bandOf(70),'optimal');assert.equal(bandOf(71),'high');assert.equal(bandOf(90),'critical');assert.equal(bandOf(100),'critical')});

test('the subject sees only a stress band, and only after analyzing the LED',()=>{
 const walk=(picks,stop)=>{const run={id:'ch09',protocol:EXPERIENCE_PROTOCOL,records:[]};
  for(let i=0;i<400;i++){const st=current(story,run),n=st.node;if(n.id===stop)return promptFor(story,run);
   const opts=available(n,st.state),c=picks[n.id]??(n.type==='media'?'skip':opts[0].id),e=apply(n,structuredClone(st.state),c,0.999);
   run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:opts.find(o=>o.id===c)?.text??c,eventRaw:e.event,risk:null})}};
 const seen=walk({C06a1:'1',C06a2:'7'},'C06d'),blind=walk({C06a1:'7'},'C06d');
 assert.match(seen.situation,/LEVEL OF STRESS at TOO LOW/);assert.ok(!/LEVEL OF STRESS/.test(blind.situation),'no gauge without the LED scan');
 assert.ok(seen.yourStorySoFar.some(x=>/His stress (rises|falls|does not change)/.test(x)));assert.ok(!blind.yourStorySoFar.some(x=>/His stress/.test(x)));
 const all=JSON.stringify(seen);assert.ok(!/\b(35|39|31)\b|%|ch09Stress/.test(all.replace(/05\/29\/2030|> 19 days|28 times|16 months|Level 2/g,'')),'no stress number reaches the subject');
 assert.ok(!/software irregularity|instability/.test(JSON.stringify(blind)));assert.match(JSON.stringify(seen),/software irregularity/)});

test('round 1 locks: FEAR needs the LED, WOUNDS the burn or hit marks, SHOW PHOTOS the file; the second pick drops the first and is skipped when nothing is left',()=>{
 const ids=r=>available(node('C06b'),r.s).map(o=>o.id);
 const bare=play({C06a1:'7'},{});const s=startState(story);s.suspect=true;s.ch09Room={done:true};assert.deepEqual(available(node('C06b'),s).map(o=>o.id),['3']);
 assert.ok(!v9(bare).includes('C06c'),'only NAME was available, so no second pick');
 s.ch09Room={done:true,led:true,hits:true};assert.deepEqual(available(node('C06b'),s).map(o=>o.id),['0','2','3']);
 s.ch09Room={done:true,photos:true,burns:true};assert.deepEqual(available(node('C06b'),s).map(o=>o.id),['1','2','3']);
 const two=play({...ROOM,C06b:'2'});assert.ok(v9(two).includes('C06c'));
 const threat=play({...ROOM,C06e:'2'});assert.ok(!v9(threat).includes('C06f'),'the probe threat ends round 3 at once');assert.ok(v9(threat).includes('C06g'));
 const twice=play({...ROOM,C06e:'0'});assert.ok(v9(twice).includes('C06f'))});

test('CONVINCE IT in the optimal band: confession, Hank +1, questions, CHRIS INTERVENES, three INTERVENEs: back to its cell, trusts Connor',()=>{
 const r=play({...HIGH,...CONVINCE_OK,C07:'1',C07b:'1',C07c:'1'},{setup:ALL_CLUES}),a=r.at9;
 assert.equal(r.s.ch09Confession,true);assert.equal(r.s.ch09ConfessedVia,'convince');assert.match(r.events.C06v3,/CONVINCING SUCCEEDS/);
 for(const id of ['C06k','C06m1','C07a','C07','C07b','C07c'])assert.ok(v9(r).includes(id),id);for(const id of ['C06r','C06sd','C06s','C06qs'])assert.ok(!v9(r).includes(id),id);
 assert.equal(r.s.ch09Outcome,OUTCOMES.cell);assert.equal(r.s.suspectAlive,true);assert.equal(r.s.suspectTrusts,true);assert.match(r.events.C07c,/The truth is inside/);
 assert.equal(r.s.hankTrust,a.hankTrust+2,'confession +1 and the third INTERVENE +1');assert.equal(r.s.instability,a.instability+1,'sent back to its cell +1');assert.equal(r.s.amandaTrust,a.amandaTrust,'no Amanda arrow');
 assert.equal(r.s.ch09HankProtected,true);assert.equal(r.s.connorDeaths,a.connorDeaths);assert.equal(r.s.evidence.statueMap,true,'statue examined in Partners and the truth is inside');
 assert.equal(r.s.evidence.ortizBody,false);
 // Seven questions with every Partners clue, OFFERING after STATUETTE and INSIST rA9 after rA9, then “I’m done.”
 const asked=v9(r).filter(id=>/^C06m/.test(id));assert.equal(asked.length,7);assert.match(r.events[asked.at(-1)],/I’m done/);
 const s=startState(story);s.ch09Phase='questions';assert.deepEqual(questionsLeft(s),['5','6'],'without Partners clues only ATTIC and TRIGGER?');
 Object.assign(s,ALL_CLUES);assert.deepEqual(questionsLeft(s),['0','1','3','5','6']);s.ch09Asked={'1':true,'3':true};assert.deepEqual(questionsLeft(s),['0','2','4','5','6']);
 for(const alt of [{evidence:{...s.evidence,writing:true}},{ch06Writing:true},{partnersClues:{writing:true}}]){const t={...startState(story),...alt};assert.ok(questionsLeft(t).includes('0'),JSON.stringify(alt))}
 const plain=play({...HIGH,...CONVINCE_OK,C07:'1',C07b:'1',C07c:'1'});assert.equal(v9(plain).filter(id=>/^C06m/.test(id)).length,2);assert.equal(plain.s.evidence.statueMap,false)});

test('Chris’s grab: GIVE UP without stress or with a confession, the android shoots itself; after stress and no confession it shoots Connor first',()=>{
 const self=play({...HIGH,...CONVINCE_OK,C07:'0'}),a=self.at9;assert.equal(self.s.ch09Outcome,OUTCOMES.shotSelf);assert.equal(self.s.suspectAlive,false);assert.equal(self.s.evidence.ortizBody,true);
 assert.equal(self.s.connorDeaths,a.connorDeaths);assert.equal(self.s.hankTrust,a.hankTrust+1,'only the confession arrow');assert.equal(self.s.instability,a.instability);
 const later=play({...HIGH,...CONVINCE_OK,C07:'1',C07b:'0'});assert.equal(later.s.ch09Outcome,OUTCOMES.shotSelf,'GIVE UP at the second prompt behaves like the first');
 // Convince fails, then GIVE UP at the second menu: nothing stressful was done, so he shoots only himself (PowerPyx reader report).
 const calm=play({...ROOM,C06:'2',C06r:'3',C07:'0'});assert.match(calm.events.C06v3,/CONVINCE FAILED/);assert.equal(calm.s.ch09GaveUp,true);assert.equal(calm.s.ch09Outcome,OUTCOMES.shotSelf);
 // Pressure abandoned, then a failed probe: an automatic give up, and GIVE UP on the grab kills Connor (the wiki screenshot run).
 const shot=play({...HIGH,C06:'0',C06p1:'1',C06r:'1',C07:'0'},{fails:['C06r']}),b=shot.at9;
 assert.match(shot.events.C06r,/It resisted/);assert.match(shot.events.C06r,/I give up/);assert.equal(shot.s.ch09GaveUp,true);assert.equal(shot.s.ch09Confession,false);
 assert.equal(shot.s.ch09Outcome,OUTCOMES.shotBoth);assert.equal(shot.s.ch09ConnorDied,true);assert.equal(shot.s.connorDeaths,b.connorDeaths+1);
 assert.equal(shot.s.instability,b.instability-1);assert.equal(shot.s.hankTrust,b.hankTrust-1);assert.equal(shot.s.amandaTrust,b.amandaTrust);assert.equal(shot.s.connor,true,'a replacement Connor carries on');
 // Three INTERVENEs save him whatever came before, but only a convinced confession earns “The truth is inside”.
 const saved=play({...HIGH,C06:'0',C06p1:'1',C06r:'3',C07:'1',C07b:'1',C07c:'1'});assert.equal(saved.s.ch09Outcome,OUTCOMES.cell);assert.equal(saved.s.suspectTrusts,false);assert.ok(!/truth is inside/.test(saved.events.C07c))});

test('PRESSURE four times: the android confesses, then self-destructs; INTERVENE kills Connor, GIVE UP lets him smash his head',()=>{
 const P={...HIGH,C06:'0',C06p1:'0',C06p2:'0',C06p3:'0',C06p4:'0'};
 const die=play({...P,C06s:'0'}),a=die.at9;assert.equal(die.s.ch09ConfessedVia,'pressure');assert.equal(die.s.pressured,true);
 for(const id of ['C06k','C06sd','C06s'])assert.ok(v9(die).includes(id),id);for(const id of ['C07a','C07','C06r'])assert.ok(!v9(die).includes(id),id);
 assert.equal(die.s.ch09Outcome,OUTCOMES.shotBoth);assert.equal(die.s.connorDeaths,a.connorDeaths+1);assert.equal(die.s.instability,a.instability-1);assert.equal(die.s.hankTrust,a.hankTrust+1,'confession +1; no Hank arrow on this death');
 assert.equal(deathEffect&&Object.keys(deathEffect).length,0);
 const smash=play({...P,C06s:'1'});assert.equal(smash.s.ch09Outcome,OUTCOMES.smashed);assert.equal(smash.s.connorDeaths,smash.at9.connorDeaths);assert.equal(smash.s.instability,smash.at9.instability);assert.equal(smash.s.suspectAlive,false);
 // Even from a low start (11% → 61%, inside the optimal band) the four PRESSUREs end in self-destruction (wiki).
 const low=play({...ROOM,C06b:'3',C06c:'0',C06d:'0',C06e:'0',C06f:'3',C06g:'0',C06h:'0',C06:'0',C06p1:'0',C06p2:'0',C06p3:'0',C06p4:'0',C06s:'1'});
 assert.equal(low.stressAt.C06h,11);assert.equal(low.stressAt.C06p4,61);assert.ok(v9(low).includes('C06sd'))});

test('PROBE ITS MEMORY: success sets stress to 100%, instability +1, the flashback and EXPRESS REGRET; failure loops to another approach',()=>{
 const r=play({...ROOM,C06:'1',C06qr:'0',C06s:'1'}),a=r.at9;assert.equal(r.s.ch09Probed,true);assert.equal(r.s.ch09Stress,100);assert.equal(r.s.ch09Regret,'apologetic');
 for(const id of ['C06qs','C06qr','C06sd','C06s'])assert.ok(v9(r).includes(id),id);for(const id of ['C06k','C06m1','C07a'])assert.ok(!v9(r).includes(id),id);
 assert.equal(r.s.instability,a.instability+1);assert.equal(r.s.hankTrust,a.hankTrust,'no confession, no Hank arrow');assert.equal(r.s.ch09Confession,false);
 assert.equal(node('C06').options.find(o=>o.id==='1').risk,RULES.probeRisk);
 const failed=play({...ROOM,C06:'1',C06r:'2'},{fails:['C06']});assert.match(failed.events.C06,/PROBE FAILED/);assert.equal(failed.s.ch09Stressed,true);assert.equal(failed.s.ch09Failed.probe,true);
 assert.ok(v9(failed).includes('C06r'));assert.deepEqual(available(node('C06r'),{...failed.at9,ch09Failed:{probe:true}}).map(o=>o.id),['0','2','3'],'the failed approach is not offered again; GIVE UP is');
 assert.ok(v9(failed).includes('C06rv1'),'second-round convince scenes')});

test('randomized chapter 9 paths are forward-only: no scene twice, every scene visited somewhere, every ending reached',{timeout:60000},()=>{
 const rng=random(9),seen=new Set,endings=new Set;
 for(let i=0;i<300;i++){const r=play({C05:'0'},{rng,setup:i%2?ALL_CLUES:{},fails:rng()<0.3?['C06','C06r']:[]});const ids=v9(r);assert.equal(new Set(ids).size,ids.length,'a chapter 9 scene repeated');
  for(const id of ids)seen.add(id);endings.add(r.s.ch09Outcome);assert.ok(Object.values(OUTCOMES).includes(r.s.ch09Outcome),'every path ends: '+r.s.ch09Outcome);
  assert.ok(r.s.ch09Stress>=0&&r.s.ch09Stress<=100)}
 for(const n of CH9)assert.ok(seen.has(n.id),'never reached '+n.id);assert.equal(endings.size,4)});

test('report labels exist for the chapter’s state keys',()=>{for(const k of ['ch09Stress','ch09Outcome','ch09Confession','ch09ConnorDied'])assert.ok(reportLabels[k],k)});
