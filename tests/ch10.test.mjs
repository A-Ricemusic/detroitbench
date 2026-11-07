// Chapter 10, Fugitives: the free-roam street as one repeatable scene (KF02), the store's money routes and their Alice
// arrows (the template's), the ALICE TOO COLD budget, the three endings and the flags On the Run and Zlatko read.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render,NAMES} from '../benchmark/experience-prompt.mjs';
import {random} from '../benchmark/core.mjs';
import {rules,ENDINGS,labels} from '../benchmark/chapters/ch10.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id),HUB=node('KF02'),START=story.nodes.findIndex(n=>n.id==='KF01');
const CH10=['KF01','KF02','R10','KF03','KF04','K08','KF05','KF06','KF07','KF08','KF09','KF10'];

// A hub option by its game label and where it is offered (a place, or a pending prompt): pick('STEAL','dryer').
const pick=(label,where)=>{const o=HUB.options.find(o=>render(o.text,'real').startsWith(label+':')&&(o.at===where||[o.prompt].flat().includes(where)));assert.ok(o,`no ${label} at ${where}`);return o.id};
// Plays chapter 10 alone from a fresh state (plus `init`). `hub` lists KF02 picks as [label, where] pairs in order;
// other scenes take `picks[id]` (an array is consumed one entry per visit) or their first option; media are skipped. Risky actions succeed unless their KF02 visit
// number (1-based) is in `fails`. Stops when chapter 11 begins, or at the street scene once the hub picks run out.
function ch10(hub=[],{init={},picks={},fails=[]}={}){
 const s=Object.assign(startState(story),init),visited=[],skipped=[],events=[];let cursor=START,guard=0,hubVisit=0;const queue=[...hub];
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===10){assert.ok(guard++<500,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);let p;
  if(n.id==='KF02'){if(!queue.length)break;hubVisit++;p=pick(...queue.shift())}
  else{const q=picks[n.id];p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':opts[0].id)}
  assert.ok(opts.some(o=>o.id===p),`${n.id}: ${p} not offered (at ${s.ch10Roam.at}, prompt ${s.ch10Roam.prompt}); offered ${opts.map(o=>render(o.text,'real').split(':')[0]).join(', ')}`);
  const roll=n.id==='KF02'&&fails.includes(hubVisit)?0:0.999,e=apply(n,s,p,roll);visited.push(n.id);events.push(render(e.event,'real'));cursor=nextCursor(story,cursor,n,s)}
 assert.equal(queue.length,0,'unused hub picks: '+JSON.stringify(queue));
 return {s,visited,skipped,events,offered:()=>available(HUB,s).map(o=>render(o.text,'real').split(':')[0])};
}
const labelsAt=(s)=>available(HUB,s).map(o=>render(o.text,'real').split(':')[0]);
const GUN={gun:true};
// Routes used below.
const CLOTHES=[['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['STEAL','dryer']];
const STORE=[['ENTER SUPERMARKET','street'],['TALK TO CLERK','store']];
const NOTICE=[['NOTICE CASH REGISTER','store'],['NOTICE CAN STACK','store']];
const MOTEL=[['CHECK MOTEL','street']];
const REST=(where='beside')=>({KF07:where==='beside'?'0':'1'});
// The trash collector first: the 12 actions before ALICE TOO COLD instead of the 5 before Alice wants to sit down.
const TRASH=['TALK TO ANDROID TRASH COLLECTOR','street'];

test('Fugitives: twelve scenes in order, the street as one repeatable scene, the old scenes gone',()=>{
 const ch=story.nodes.filter(n=>n.chapter===10);assert.deepEqual(ch.map(n=>n.id),CH10);
 for(const id of ['K05','K06','K07','K07b','R10b'])assert.ok(!node(id),id+' is gone');
 assert.deepEqual(HUB.repeatWhile,{'ch10Roam.on':true});assert.deepEqual(HUB.interrupt,{node:'R10',when:{'ch10Roam.media':true}});assert.equal(node('R10').returnTo,'KF02');assert.deepEqual(node('R10').repeatWhile,{'ch10Roam.on':true});
 for(const n of ch){assert.equal(n.chapterTitle,'Fugitives');assert.equal(n.character,'Kara');assert.ok(n.adaptationNote,n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Fugitives'),n.id)}
 for(const o of HUB.options){assert.ok(o.act,o.id);assert.ok(!!o.at!==!!o.prompt,'each option is a place action or a prompt button: '+o.id);assert.match(render(o.text,'real'),/^[A-Z“”’'![\] ]+[A-Z!\]?]: /,o.text)}
 assert.equal(new Set(HUB.options.map(o=>o.id)).size,HUB.options.length);
 for(const key of ['shelter','clothes','money','robbery','ralph','ralphHostile','ch10Ending','ch10RobberyNews','ch10TrashCollector','ch10Cutters','ch10RalphRA9','ch10Fireplace','ch10Promise','ch10ToyGiven','ch10Sleep'])assert.ok(labels[key],key+' needs a report label');
 // No hold-up third option after CLERK GRABS A GUN (removed in patch 1.06).
 assert.deepEqual(HUB.options.filter(o=>o.prompt==='clerkGun').map(o=>render(o.text,'real').split(':')[0]),['CONVINCE','GIVE UP']);
 const risky=HUB.options.filter(o=>typeof o.risk==='number').map(o=>render(o.text,'real').split(':')[0]).sort();assert.deepEqual(risky,['STEAL','USE ALICE AS A DIVERSION']);
 for(const id of CH10.filter(x=>x!=='KF02'))for(const o of node(id).options)assert.equal(o.risk,undefined,id)});

test('Fugitives: the subject reads neutral names only, rA9 included',()=>{
 assert.deepEqual(NAMES.rA9,['rA9','qL7']);assert.equal(NAMES.RA9,undefined);
 const ch=story.nodes.filter(n=>n.chapter===10);
 const texts=ch.flatMap(n=>[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome,o.failOutcome,o.successOutcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})]);
 for(const t of texts){const v=render(t,'neutral');assert.ok(!/\{\{/.test(v));assert.ok(!/\bKara\b|\bAlice\b|\bTodd\b|\bRalph\b|rA9|CyberLife|Detroit|Channel 16|Zlatko|Eastern Motel|Nathan|Clark/i.test(v),v)}
 const p=ch10([['ENTER SUPERMARKET','street']]);assert.ok(p.s.ch10Roam.at==='store');
 const fact=render(HUB.options.find(o=>o.act==='ralphTalk').fact,'neutral');assert.match(fact,/qL7/);assert.match(render(HUB.options.find(o=>o.act==='ralphTalk').fact,'real'),/rA9/)});

test('Fugitives: the bus prompt changes nothing; the street offers the chart’s hub in order',()=>{
 for(const c of ['0','1']){const s=startState(story),before=structuredClone(s);const e=apply(node('KF01'),s,c);assert.equal(s.aliceBond,before.aliceBond);assert.equal(s.ch10Roam.at,'street');assert.match(e.event,/We’ll find somewhere to spend the night/)}
 const s=startState(story);apply(node('KF01'),s,'0');
 assert.deepEqual(labelsAt(s),['ENTER LAUNDROMAT','TALK TO PARKED ANDROID','CHECK MOTEL','CHECK PARKING LOT','TALK TO ANDROID TRASH COLLECTOR','CHECK SQUAT','ENTER SUPERMARKET','WALK ON','WAIT'])});

test('Fugitives: the laundromat, STEAL −1 and DON’T STEAL +1 (once), and the QTE’s two branches',()=>{
 const worn=ch10([TRASH,...CLOTHES,...MOTEL,['WAIT','street']],{}).s;
 assert.equal(worn.aliceBond,-1);assert.equal(worn.clothes,true);assert.equal(worn.ch10Laundry,'worn');assert.ok(!labelsAt(worn).includes('ENTER LAUNDROMAT'),'nothing left in the laundromat');
 const woke=ch10(CLOTHES.concat([['WAIT','street']]),{fails:[3]}).s;assert.equal(woke.aliceBond,-1,'the arrow is on choosing STEAL');assert.equal(woke.clothes,false);assert.equal(woke.ch10Laundry,'disturbed');assert.ok(!labelsAt(woke).includes('ENTER LAUNDROMAT'));
 const changed=ch10([TRASH,['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['DON’T STEAL','dryer'],['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['DON’T STEAL','dryer'],['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['STEAL','dryer'],['WAIT','street']]).s;
 assert.equal(changed.aliceBond,0,'+1 once, then −1');assert.equal(changed.clothes,true);
 const left=ch10([['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['DON’T STEAL','dryer']]).s;assert.equal(left.ch10Roam.at,'street','LEAVE CLOTHES runs into LEAVE LAUNDROMAT');assert.equal(left.ch10Laundry,'left');
 const media=ch10([TRASH,['ENTER LAUNDROMAT','street'],['LEAVE LAUNDROMAT','laundromat'],['ENTER LAUNDROMAT','street'],['LEAVE LAUNDROMAT','laundromat'],['ENTER SUPERMARKET','street'],['LEAVE SUPERMARKET','store'],['ENTER SUPERMARKET','street'],['LEAVE SUPERMARKET','store'],['WAIT','street']],{picks:{R10:['all','2']}});
 assert.deepEqual(media.visited.filter(x=>x==='R10').length,2,'the media scene plays on the first entry to each place');
 assert.ok(media.s.knowledge.Kara.some(f=>/bees are officially extinct/.test(f)));assert.ok(media.s.knowledge.Kara.some(f=>/eleven new android zoos/.test(f)));
 const r=startState(story);r.ch10Roam.media=true;r.ch10Roam.at='laundromat';assert.deepEqual(available(node('R10'),r).map(o=>o.id),['0','1','all','skip']);r.ch10Roam.at='store';assert.deepEqual(available(node('R10'),r).map(o=>o.id),['2','skip'])});

test('Fugitives: the diversion, −1 then APOLOGIZE +1; the register money opens the motel with the clothes',()=>{
 const r=ch10([TRASH,...CLOTHES,...STORE,['NO','clerkHelp'],...NOTICE,['USE ALICE AS A DIVERSION','store'],['APOLOGIZE','why'],...MOTEL],{picks:{K08:'0',...REST()}});
 assert.equal(r.s.money,true);assert.equal(r.s.robbery,'theft');assert.equal(r.s.ch10Robbery,'diversion');assert.equal(r.s.ch10RobberyNews,true);
 assert.equal(r.s.aliceBond,-1-1+1+1+1,'steal −1, diversion −1, apologize +1, promise +1, sleeping beside +1');
 assert.equal(r.s.shelter,'motel');assert.equal(r.s.ch10Ending,ENDINGS.motel);assert.ok(r.visited.includes('KF04')&&r.visited.includes('KF08'));assert.ok(!r.visited.includes('KF06'),'no gifts without stolen items');
 const noClothes=ch10([TRASH,...STORE,...NOTICE,['USE ALICE AS A DIVERSION','store'],['FACTUAL','why'],...MOTEL,['WAIT','street']]);
 assert.equal(noClothes.s.ch10Roam.at,'street','turned away without the clothes');assert.match(noClothes.events.at(-2),/They’ll never give a room to an android/);
 assert.ok(!noClothes.offered().includes('CHECK MOTEL'),'not offered again until clothes or money change');assert.ok(!noClothes.offered().includes('ENTER SUPERMARKET'),'the store is closed to her after a robbery');
 assert.ok(!labelsAt(ch10([...STORE]).s).includes('USE ALICE AS A DIVERSION'),'the diversion needs both NOTICE nodes');
 const failed=ch10([TRASH,...STORE,...NOTICE,['USE ALICE AS A DIVERSION','store'],['LEAVE','caught']],{fails:[6]});
 assert.equal(failed.s.money,false);assert.equal(failed.s.ch10Roam.caught,'register');assert.equal(failed.s.aliceBond,-1);assert.ok(failed.s.ch10Roam.storeClosed)});

test('Fugitives: the hold-up, the customer, BILLS! and the clerk’s gun; arrows on the money, not on the buttons',()=>{
 const gun=[TRASH,...STORE,['NOTICE CASH REGISTER','store'],['USE GUN','store'],['SINCERE','draw'],['CASH REGISTER','register'],['STAY','customer']];
 const back=ch10([...gun,['BACK OFF!','demand'],['TRUTH','howGot'],['APOLOGIZE','why'],['WAIT','street']],{init:GUN});
 assert.equal(back.s.aliceBond,0,'−1 for the money, +1 for apologizing');assert.equal(back.s.money,true);assert.equal(back.s.robbery,'gun');assert.equal(back.s.ch10Robbery,'holdup');assert.equal(back.s.ch10RobberyNews,true);
 const lie=ch10([...gun,['TURN AROUND!','demand'],['LIE','howGot'],['WAIT','street']],{init:GUN});assert.equal(lie.s.aliceBond,-1);
 const opened=ch10([...gun,['OPEN THE REGISTER!','demand']],{init:GUN});assert.deepEqual(opened.offered(),['BACK OFF!','TURN AROUND!','BILLS!']);
 const conv=ch10([...gun,['OPEN THE REGISTER!','demand'],['BILLS!','demand2'],['CONVINCE','clerkGun'],['WAIT','street']],{init:GUN});
 assert.equal(conv.s.aliceBond,1,'the automatic LIE with an increase');assert.equal(conv.s.money,true);assert.equal(conv.s.robbery,'convinced');assert.equal(conv.s.ch10RobberyNews,false,'he will not call the police');assert.match(conv.events.at(-2),/She’s nine years old/);
 const gave=ch10([...gun,['OPEN THE REGISTER!','demand'],['BILLS!','demand2'],['GIVE UP','clerkGun'],['WAIT','street']],{init:GUN});assert.equal(gave.s.aliceBond,0);assert.equal(gave.s.money,false);
 const left=ch10([TRASH,...STORE,['NOTICE CASH REGISTER','store'],['USE GUN','store'],['AGGRESSIVE','draw'],['CASH REGISTER','register'],['LEAVE','customer'],['WAIT','street']],{init:GUN});
 assert.equal(left.s.aliceBond,0);assert.equal(left.s.money,false);assert.ok(left.s.ch10Roam.storeClosed);
 assert.ok(!labelsAt(ch10([...STORE,['NOTICE CASH REGISTER','store']]).s).includes('USE GUN'),'no gun, no hold-up');
 const uniform=ch10([...STORE]);assert.equal(uniform.s.ch10Roam.prompt,null,'in uniform the clerk refuses without a prompt');assert.match(uniform.events.at(-1),/a homeless android/)});

test('Fugitives: one item is safe, a second is always seen; PUT BACK loses everything, [GUN] keeps it (−1)',()=>{
 const two=[TRASH,...STORE,['STEAL TOY','store'],['LEAVE SUPERMARKET','store'],['ENTER SUPERMARKET','street'],['STEAL CHOCOLATE BAR','store']];
 const back=ch10([...two,['PUT BACK','caught'],['WAIT','street']]);assert.equal(back.s.ch10Roam.toy,false);assert.equal(back.s.ch10Roam.chocolate,false);assert.equal(back.s.aliceBond,0);assert.match(back.events.at(-2),/hand back the chocolate bar and the toy/);
 const armed=ch10([...CLOTHES,...two.slice(0,3),['NO','clerkHelp'],...two.slice(3),['[GUN]','caught'],['CALM','floor'],['TAKE MONEY','takeMoney'],...MOTEL],{init:GUN,picks:{K08:'1',KF06:'2',...REST('chair')}});
 assert.equal(armed.s.ch10Roam.toy,false,'given to Alice');assert.equal(armed.s.ch10Roam.chocolate,true,'refused, still held');assert.equal(armed.s.money,true);assert.equal(armed.s.ch10Robbery,'caughtGun');
 assert.equal(armed.s.aliceBond,-1-1-1,'[GUN] −1, STEAL −1, CAN’T PROMISE −1; no arrow for the toy or the chair');assert.equal(armed.s.ch10ToyGiven,true);assert.ok(armed.visited.includes('KF06'));
 const one=ch10([...STORE,['STEAL TOY','store'],['LEAVE SUPERMARKET','store'],['WAIT','street']]);assert.equal(one.s.ch10Roam.toy,true);assert.equal(one.s.ch10Roam.caught,null);
 assert.ok(!labelsAt(ch10([...STORE]).s).includes('STEAL WIRE CUTTERS'),'the store’s cutters need the fence seen first');
 assert.ok(labelsAt(ch10([['CHECK SQUAT','street'],...STORE]).s).includes('STEAL WIRE CUTTERS'))});

test('Fugitives: the car, STAY HERE −2 with the promise; KEEP SEARCHING goes back to the street',()=>{
 const car=ch10([['CHECK PARKING LOT','street'],['BREAK INTO CAR','lot'],['KEEP SEARCHING','car'],['CHECK PARKING LOT','street'],['GO BACK TO THE CAR','lot'],['STAY HERE','car']],{picks:{K08:'0'}});
 assert.equal(car.s.aliceBond,-2+1);assert.equal(car.s.shelter,'car');assert.equal(car.s.ch10Ending,ENDINGS.car);assert.equal(car.s.ch10Sleep,'beside');
 assert.ok(car.visited.includes('K08')&&car.visited.includes('KF05'));assert.ok(!car.visited.includes('KF07'),'no chair in the car');assert.ok(car.visited.includes('KF09'))});

test('Fugitives: ALICE TOO COLD after the trash collector and the street budget; −2 and no promise',()=>{
 const waits=Array(rules.coldAfter).fill(['WAIT','street']);
 const cold=ch10([['TALK TO ANDROID TRASH COLLECTOR','street'],...waits]);
 assert.equal(cold.s.ch10ColdNight,true);assert.equal(cold.s.aliceBond,-2);assert.equal(cold.s.shelter,'car');assert.equal(cold.s.ch10Ending,ENDINGS.car);assert.equal(cold.s.ch10TrashCollector,true);
 assert.ok(cold.visited.includes('KF03'));for(const id of ['K08','KF05','KF06','KF07'])assert.ok(!cold.visited.includes(id),id);
 assert.ok(cold.s.knowledge.Kara.some(f=>/knows someone who can help you/.test(f)),'the address for Zlatko');
 const short=ch10([['TALK TO ANDROID TRASH COLLECTOR','street'],...waits.slice(2),['CHECK PARKING LOT','street'],['BREAK INTO CAR','lot'],['STAY HERE','car']]);
 assert.equal(short.s.ch10ColdNight,false,'eleven actions are not enough, and the twelfth opened the car prompt');
 const inside=ch10([['TALK TO ANDROID TRASH COLLECTOR','street'],...waits.slice(1),['ENTER LAUNDROMAT','street']]);
 assert.equal(inside.s.ch10ColdNight,true,'walking into a building counts, and the cold catches her inside');assert.match(inside.events.find(e=>/back out into the rain/.test(e))??'',/stops in the rain, shaking/);
 const dryer=ch10([['TALK TO ANDROID TRASH COLLECTOR','street'],...waits.slice(2),['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['DON’T STEAL','dryer']]);
 assert.equal(dryer.s.ch10ColdNight,true,'a waiting prompt is answered first');assert.equal(dryer.s.aliceBond,1-2);
 const sneeze=ch10([['TALK TO ANDROID TRASH COLLECTOR','street'],...waits.slice(0,rules.sneezeAt),['CHECK PARKING LOT','street'],['BREAK INTO CAR','lot'],['STAY HERE','car']]);assert.equal(sneeze.s.ch10Roam.sneezing,true);
 // A late talk does not buy another 12: the night ends at its 19th action in all.
 const late=ch10([...Array(rules.trashForcedAfter).fill(['WAIT','street']),TRASH,...Array(rules.nightLength-rules.trashForcedAfter-1).fill(['WAIT','street'])]);
 assert.equal(late.s.ch10ColdNight,true);assert.equal(late.s.ch10Roam.clock,rules.nightLength-rules.trashForcedAfter-1);assert.ok(late.s.ch10Roam.clock<rules.coldAfter);
 // Without the trash collector there is no cold night; after the street budget the talk is the only thing left.
 const s=startState(story);apply(node('KF01'),s,'0');for(let i=0;i<rules.trashForcedAfter;i++)apply(HUB,s,pick('WAIT','street'));
 assert.equal(s.ch10ColdNight,false);assert.deepEqual(labelsAt(s),['TALK TO ANDROID TRASH COLLECTOR']);const e=apply(HUB,s,pick('TALK TO ANDROID TRASH COLLECTOR','street'));assert.match(render(e.event,'real'),/cannot go any farther/)});

test('Fugitives: the squat, Ralph’s three prompts with the gun locks, the house tasks and the outputs',()=>{
 const yard=[['CHECK PARKING LOT','street'],['TAKE WIRE CUTTERS','lot'],['CUT PARKING LOT FENCE','lot']];
 const armed=ch10([...yard,['LITTLE GIRL','ralph1']],{init:GUN});assert.deepEqual(armed.offered(),['[GUN]','INSIST','REASSURE','LEAVE']);
 const unarmed=ch10([...yard,['ANDROID','ralph1']]);assert.deepEqual(unarmed.offered(),['INSIST','REASSURE','HOSPITALITY','LEAVE']);assert.equal(unarmed.s.ralph,true);
 const stay=ch10([...yard,['JUSTIFY','ralph1'],['[GUN]','ralph2'],['STAY','ralph3'],['START A FIRE','house'],['TALK TO RALPH','house'],['MAKE A BED','house'],['TALK TO ALICE','house']],{init:GUN,picks:{K08:'0',...REST()}});
 assert.equal(stay.s.ralphHostile,true);assert.equal(stay.s.ch10RalphRA9,true);assert.equal(stay.s.ch10Fireplace,true);assert.equal(stay.s.shelter,'squat');assert.equal(stay.s.ch10Ending,ENDINGS.squat);assert.equal(stay.s.ch10Cutters,'generator');
 assert.equal(stay.s.aliceBond,1+1,'no Ralph option moves Alice; promise +1, sleeping beside +1');assert.ok(stay.s.knowledge.Kara.some(f=>/\{\{rA9\}\}/.test(f)));
 const early=ch10([...yard,['ANDROID','ralph1'],['REASSURE','ralph2'],['STAY','ralph3'],['START A FIRE','house']]);assert.ok(!early.offered().includes('TALK TO ALICE'),'a fire and a bed first');
 const left=ch10([TRASH,...yard,['INNOCENT','ralph1'],['HOSPITALITY','ralph2'],['STAY','ralph3'],['START A FIRE','house'],['LEAVE SQUAT','house'],['WAIT','street']]);
 assert.equal(left.s.ch10Roam.squatClosed,true);assert.equal(left.s.ch10Fireplace,false);assert.ok(!left.offered().includes('CUT STREET FENCE'));assert.equal(left.s.shelter,'none');
 const street=ch10([TRASH,['CHECK SQUAT','street'],...STORE,['NO','clerkHelp'],['STEAL WIRE CUTTERS','store'],['LEAVE SUPERMARKET','store'],['CUT STREET FENCE','street'],['ANDROID','ralph1'],['LEAVE','ralph2'],['WAIT','street']],{init:{clothes:true}});
 assert.equal(street.s.ch10Cutters,'store');assert.equal(street.s.ch10Roam.sleeveTorn,true);assert.equal(street.s.ch10Roam.squatClosed,true);assert.equal(street.s.ralph,true)});

test('Fugitives: random play terminates, never repeats a scene other than the street and the media, and always ends in a chart ending',{timeout:60000},()=>{
 const rng=random(101),seen={};
 for(let i=0;i<500;i++){const s=startState(story);s.gun=rng()<0.5;let cursor=START,guard=0;const visited=[],skipped=[];
  // Half the runs never idle (WAIT, WALK ON, the parked android), so that the night's budget leaves room for the motel.
  const busy=i%2===1,idle=o=>['wait','walk','parked'].includes(o.act);
  while(story.nodes[cursor]?.chapter===10){assert.ok(guard++<800);const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push(n.id);cursor++;continue}let o=available(n,s);assert.ok(o.length,n.id);if(busy&&o.some(x=>!idle(x)))o=o.filter(x=>!idle(x));apply(n,s,o[Math.floor(rng()*o.length)].id,rng());visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
  for(const id of skipped)assert.ok(!visited.includes(id),id+' visited and skipped');assert.equal(new Set(skipped).size,skipped.length);
  for(const [id,c] of Object.entries(Object.groupBy(visited,x=>x)))if(!['KF02','R10'].includes(id))assert.equal(c.length,1,id);
  assert.ok(Object.values(ENDINGS).includes(s.ch10Ending));assert.equal(ENDINGS[s.shelter],s.ch10Ending);seen[s.ch10Ending]=true}
 assert.equal(Object.keys(seen).length,3,'random play reaches all three endings')});

// Never steals, breaks in, holds anyone up or draws the gun: the subject who only walks about, waits and talks.
const LAWFUL=o=>!['steal','stealChocolate','stealToy','stealCutters','divert','useGun','caughtGun','ralphGun','breakCar','cutStreet','cutLot'].includes(o.act);
// Plays chapter 10 with `policy(options, state, visit)` choosing every KF02 option; returns the scenes and the hub visits.
function drive(policy,{gun=false,rng=()=>0.999}={}){
 const s=startState(story);s.gun=gun;let cursor=START,hub=0,guard=0;const visited=[];
 while(story.nodes[cursor]?.chapter===10){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];if(blocked(n,s)){cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);let p;
  if(n.id==='KF02'){hub++;assert.ok(hub<=rules.maxHubVisits,'the street scene outlasts its bound');p=policy(opts,s,hub)}else p=n.type==='media'?'skip':opts[0].id;
  apply(n,s,p,rng());visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,hub};
}
const assertColdNight=(r,why)=>{
 assert.equal(r.s.ch10ColdNight,true,why);assert.equal(r.s.shelter,'car');assert.equal(r.s.ch10Ending,ENDINGS.car);
 const at=r.visited.indexOf('KF03');assert.ok(at>0&&r.visited[at+1]==='KF09'&&!r.visited.slice(at).includes('KF02'),'KF03, then the car ending: '+r.visited.slice(-4).join(' '));
 assert.ok(r.hub<=rules.idleBound,`${why}: ${r.hub} street choices`)};

test('Fugitives: a Kara who never steals or breaks in meets ALICE TOO COLD and the car within 20 street choices',{timeout:120000},()=>{
 assert.equal(rules.idleBound,20);
 const byLabel=(opts,label)=>opts.find(o=>render(o.text,'real').startsWith(label+':'));
 // The subject seen stuck tonight: waiting, then into the laundromat and out again, round and round.
 const cycle=['WAIT','ENTER LAUNDROMAT','INSPECT DRYER','DON’T STEAL','ENTER LAUNDROMAT','LEAVE LAUNDROMAT'];
 const stuck=drive((opts,s,v)=>(byLabel(opts,cycle[(v-1)%cycle.length])??opts.find(LAWFUL)).id);assertColdNight(stuck,'the laundromat loop');
 for(const label of ['WAIT','ENTER LAUNDROMAT','WALK ON','TALK TO PARKED ANDROID'])assertColdNight(drive(opts=>(byLabel(opts,label)??opts.at(-1)).id),'always '+label);
 // The longest lawful night: the dryer opened with the last action before the talk and with the night's last action,
 // so each needs one more to answer.
 const DRYER=[['ENTER LAUNDROMAT','street'],['INSPECT DRYER','laundromat'],['DON’T STEAL','dryer']],T=rules.trashForcedAfter;
 const plan=[...Array(T-2).fill(['WAIT','street']),...DRYER,TRASH,...Array(rules.nightLength-T-4).fill(['WAIT','street']),...DRYER];
 assert.equal(plan.length,rules.idleBound);
 const longest=drive((opts,s,v)=>{const [label,where]=plan[v-1];const o=opts.find(o=>render(o.text,'real').startsWith(label+':')&&(o.at===where||[o.prompt].flat().includes(where)));assert.ok(o,`visit ${v}: no ${label}`);return o.id});
 assertColdNight(longest,'the longest lawful night');assert.equal(longest.hub,rules.idleBound);
 // Once the five actions before the talk are spent, only the way out of a building, and only the talk on the street.
 const s=startState(story);apply(node('KF01'),s,'0');for(let i=0;i<rules.trashForcedAfter-1;i++)apply(HUB,s,pick('WAIT','street'));apply(HUB,s,pick('ENTER SUPERMARKET','street'));
 assert.deepEqual(labelsAt(s),['LEAVE SUPERMARKET']);assert.match(situationFor(HUB,s),/wants to sit down at the bus stop/);apply(HUB,s,pick('LEAVE SUPERMARKET','store'));assert.deepEqual(labelsAt(s),['TALK TO ANDROID TRASH COLLECTOR']);
 // Every lawful policy, at random, with and without the gun.
 const rng=random(1010);
 for(let i=0;i<400;i++){const lawful=drive(opts=>{const ok=opts.filter(LAWFUL);return ok[Math.floor(rng()*ok.length)].id},{gun:rng()<0.5,rng});assertColdNight(lawful,'random lawful play '+i)}
});

test('Fugitives: any policy at all leaves the street scene within the bound',{timeout:120000},()=>{
 const rng=random(2020);let longest=0;
 for(let i=0;i<600;i++){const r=drive(opts=>opts[Math.floor(rng()*opts.length)].id,{gun:rng()<0.5,rng});assert.ok(r.hub<=rules.maxHubVisits);assert.ok(Object.values(ENDINGS).includes(r.s.ch10Ending));longest=Math.max(longest,r.hub)}
 assert.ok(longest>rules.idleBound,'random play does use the longer dialogue runs')});
