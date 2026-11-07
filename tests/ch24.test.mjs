import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,CONNOR_DEATH_EFFECT} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {random} from '../benchmark/core.mjs';
import {ENDINGS,ENDING_SCENES,DEVIANT,labels,deathEffect,readInputs} from '../benchmark/chapters/ch24.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch24=story.nodes.filter(n=>n.chapter===24),node=id=>story.nodes.find(n=>n.id===id);
const IDS=['C14z','C14z1','C14z2','C14z3','C14z4','C14e','C14f','C14g','C14h','C14i','C14','C14y','C14r','C14r2','C14b',
 'R24','C15a','C15b','C15c','C15','C15d','C15e','C15f','C15g','C15h','C16','C14x1','C14x2','C14x3','C14x4','C15x1','C15x2','C16x1','C16x2'];
const STATS=['instability','hankTrust','amandaTrust','publicSupport','connorDeaths'];

// Plays from the start and stops after chapter 24. Picks may be arrays (one entry per visit); `pre` is merged into the
// state just before the chapter starts (to stand in for earlier chapters' outputs); `fails` lists risky scenes that fail.
// `from` resumes from a saved {state, cursor} at the chapter's first scene instead of replaying the earlier chapters.
const atChapter=picks=>{const s=startState(story);let cursor=0;while(story.nodes[cursor].id!=='C14z'){const n=story.nodes[cursor];if(blocked(n,s)){cursor++;continue}
 const o=available(n,s),p=picks[n.id]??(n.type==='media'?'skip':o[0].id);apply(n,s,p,0.999);cursor=nextCursor(story,cursor,n,s)}return {state:s,cursor}};
function play(picks={},{fails=[],pre={},rng=null,from=null}={}){const s=from?structuredClone(from.state):startState(story),visited=[],skipped=[],events={};let cursor=from?from.cursor:0,guard=0,start=null,afterZen=null;
 const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];if(n.chapter>24)break;
  if(n.id==='C14z'){Object.assign(s,structuredClone(pre));start=structuredClone(s)}
  if(n.id==='C14e')afterZen=structuredClone(s);
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s),x=q[n.id];let p=Array.isArray(x)?x.shift():x;
  if(p===undefined)p=rng&&n.chapter===24?options[Math.floor(rng()*options.length)].id:n.type==='media'?'skip':options[0].id;
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' (offered '+options.map(o=>o.id)+')');
  const r=apply(n,s,p,fails.includes(n.id)?0:rng&&n.chapter===24?rng():0.999);if(n.chapter===24){visited.push(n.id);(events[n.id]??=[]).push({...r,choice:p})}cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,start,afterZen}}
const delta=(r,from='afterZen')=>Object.fromEntries(STATS.map(k=>[k,r.s[k]-r[from][k]]));
const ZERO={instability:0,hankTrust:0,amandaTrust:0,publicSupport:0,connorDeaths:0};
const D=o=>({...ZERO,...o});
const KITCHEN={C14:['9','1']};   // check the camera, then go into the kitchen
const endings=r=>r.visited.filter(id=>ENDING_SCENES[id]);

test('Public Enemy: 34 Connor scenes in order, each sourced, between The Stratford Tower and Midnight Train',()=>{
 assert.deepEqual(ch24.map(n=>n.id),IDS);
 for(const n of ch24){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'Public Enemy');assert.ok(n.adaptationNote&&n.sources.length>=4,n.id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Public_Enemy'),n.id);
  if(n.type==='event')assert.ok(n.facts?.length&&n.outcomes?.['0'],n.id)}
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(i('C14z')>story.nodes.findLastIndex(n=>n.chapter===23)&&i('C16x2')<story.nodes.findIndex(n=>n.chapter===25));
 assert.deepEqual(Object.values(ENDING_SCENES),Object.values(ENDINGS),'one ending scene per chart ending');
 assert.equal(Object.keys(ENDINGS).length,8);
});

test('Public Enemy: every prompt carries the game’s buttons in the game’s order',()=>{
 const labelsOf=id=>node(id).options.map(o=>render(o.text,'real').split(':')[0]);
 assert.deepEqual(labelsOf('C14z1'),['HANK','EDEN CLUB']);
 assert.deepEqual(labelsOf('C14z2'),['SINCERE','DETERMINED','COLD','TROUBLED']);
 assert.deepEqual(labelsOf('C14z3'),['TOO FAR','NO USE','TRUTH']);
 assert.deepEqual(labelsOf('C14z4'),['CONFLICTED','CONFIDENT','INDIFFERENT']);
 assert.deepEqual(labelsOf('C14f')[0],'LISTEN TO BRIEFING');
 assert.deepEqual(labelsOf('C14y'),['YES','NO']);
 assert.deepEqual(labelsOf('C14b'),['CHARGE DEVIANT','STAY IN COVER']);
 assert.deepEqual(labelsOf('C15a'),['FUNCTION','MODEL']);
 assert.deepEqual(labelsOf('C15b'),['WITNESS','MEMORY','DIAGNOSTIC','CONTACT']);
 assert.deepEqual(labelsOf('C15'),['THREATEN','DEAL','GUILT']);
 assert.deepEqual(labelsOf('C15e'),['VIOLENCE','BLUFF','TORTURE','PROBE MEMORY']);
 assert.deepEqual(labelsOf('C15g'),['REMOVE KNIFE','CALL']);
 assert.equal(labelsOf('C15h')[0],'CHASE DEVIANT');
 assert.deepEqual(labelsOf('C16'),['ATTACK','SAVE HANK','TAKE GUN']);
 // 15 broadcast-floor clues on the chart (6 corridor, 9 broadcast room) plus the 6 roof clues, each a hub option.
 assert.equal(node('C14g').options.filter(o=>o.clue).length,6);assert.equal(node('C14').options.filter(o=>o.clue&&o.clue!=='roof').length,9);
 assert.deepEqual(new Set(node('C14r').options.filter(o=>o.clue&&o.clue!=='markusBlood').map(o=>o.clue)),new Set(['door','bag','body','blood','footprints','weapon']));
});

test('Public Enemy: stat arrows are the template’s and risk rolls sit only on the chart’s failure branches',()=>{
 const eff=id=>node(id).options.map(o=>o.effect??{});
 assert.deepEqual(eff('C14z1'),[{},{}],'EDEN CLUB is applied by the module from the Traci outcome');
 assert.deepEqual(eff('C14z2'),[{amandaTrust:-1},{},{instability:-1},{instability:1,amandaTrust:-1}],'no Amanda arrow on DETERMINED or COLD');
 assert.deepEqual(eff('C14z3'),[{},{},{amandaTrust:-2}],'no Amanda arrow on TOO FAR');
 assert.deepEqual(eff('C14z4'),[{instability:1},{amandaTrust:1},{instability:-1,amandaTrust:2}]);
 assert.deepEqual(eff('C16'),[{publicSupport:-1,instability:2},{publicSupport:-1,hankTrust:2},{hankTrust:2}],'one PO arrow on ATTACK');
 const risky=ch24.flatMap(n=>n.options.filter(o=>typeof o.risk==='number').map(o=>n.id+':'+o.id));
 assert.deepEqual(risky,['C14b:0','C15g:0','C15g:1','C15h:0']);
 for(const n of ch24)for(const o of n.options)if(o.effect)for(const k of Object.keys(o.effect))assert.ok(['instability','hankTrust','amandaTrust','publicSupport'].includes(k),n.id);
 assert.deepEqual(deathEffect,{instability:-1});assert.deepEqual(CONNOR_DEATH_EFFECT[24],{instability:-1});
 for(const k of ['ch24Ending','ch24ProtectedHank','ch24SimonSurvived','ch24JerichoMemory','ch24ConnorDied','ch24Coin'])assert.ok(labels[k],k);
});

test('Public Enemy: the Zen Garden follows the Traci outcome (EDEN CLUB arrow, SINCERE lock, the third round)',()=>{
 const spared=play({C12:'0',C14z1:'1',C14z2:'0'});
 assert.equal(spared.s.ch24In.tracis,'spared');assert.ok(spared.visited.includes('C14z3'));
 assert.equal(spared.afterZen.amandaTrust-spared.start.amandaTrust,-1-1-0+0,'EDEN CLUB −1, SINCERE −1, TOO FAR 0, CONFLICTED 0');
 assert.match(render(spared.events.C14z1[0].event),/they managed to escape/);
 const died=play({C12:'1',C14z1:'1'});
 assert.equal(died.s.ch24In.tracis,'died');assert.ok(!died.visited.includes('C14z3'));assert.ok(died.skipped.some(x=>x.id==='C14z3'));
 assert.ok(!available(node('C14z2'),died.s).some(o=>o.id==='0'),'SINCERE needs the Tracis spared');
 assert.equal(died.afterZen.amandaTrust-died.start.amandaTrust,1,'EDEN CLUB +1 when they died; DETERMINED and CONFLICTED nothing');
 const lost=play({C14z1:'1'},{pre:{ch20Tracis:'notFound'}});
 assert.equal(lost.s.ch24In.tracis,'notFound');assert.match(render(lost.events.C14z1[0].event),/didn’t learn anything new/);assert.ok(!lost.visited.includes('C14z3'));
 assert.equal(lost.afterZen.amandaTrust-lost.start.amandaTrust,-1);
 // Every round's arrows, summed: TROUBLED, TRUTH, INDIFFERENT.
 const hard=play({C12:'0',C14z1:'0',C14z2:'3',C14z3:'2',C14z4:'2'});
 assert.equal(hard.afterZen.amandaTrust-hard.start.amandaTrust,-1-2+2);assert.equal(hard.afterZen.instability-hard.start.instability,1-1);
 assert.match(render(hard.events.C14z4[0].event),/Time is running out/);
});

test('Public Enemy: the elevator, the coin and the briefing follow the earlier chapters',()=>{
 const coin=play({},{pre:{ch22HankShotConnor:false}});assert.equal(coin.s.ch24Coin,true);assert.match(situationFor(node('C14e'),coin.afterZen),/piss me off with that coin/);
 const shot=play({},{pre:{ch22HankShotConnor:true}});assert.equal(shot.s.ch24Coin,false);assert.match(situationFor(node('C14e'),shot.afterZen),/Why did you shoot me last night/);
 assert.match(render(shot.events.C14z1[0].event),/He shot me in the head last night/);
 const brief=play({C14f:'0'},{pre:{ch23Guards:'armedShot',ch23OperatorShot:true,ch23SimonFate:'roomKilled'}});
 const said=render(brief.events.C14f[0].event);for(const re of [/shot the other in cold blood/,/shot to the back/,/SWAT took it out/,/jumped with parachutes/])assert.match(said,re);
 assert.ok(brief.s.knowledge.Connor.some(f=>/Briefing on the 79th floor/.test(f)));
 const skip=play({C14f:'1'});assert.ok(!skip.s.knowledge.Connor.some(f=>/Briefing on the 79th floor/.test(f)));
});

test('Public Enemy: the corridor and broadcast-room clues appear only where the tower chapter left them',()=>{
 const optsAt=(id,pre)=>{const r=play({},{pre});return r};
 const calm=play({C14:['1']},{pre:{ch23Guards:'knockedOut',ch23OperatorShot:false,ch23Swat:false,ch23SimonFate:'escaped',simonWounded:false}});
 const corridor=calm.events.C14g.map(e=>e.choice);assert.deepEqual(corridor,['3','6'],'only CHECK CCTV, then on');
 const s=structuredClone(calm.afterZen);Object.assign(s,{ch24Phase:'room',ch24Room:{}});
 assert.deepEqual(available(node('C14'),s).map(o=>o.id),['0','1','7','8','9'],'roof, kitchen, cap, video, camera; no leaving before the roof');
 const all=play({},{pre:{ch23Guards:'armedShot',ch23PhoneKicked:true,ch23OperatorShot:true,ch23Swat:true,ch23SimonFate:'roomKilled'}});
 assert.deepEqual(all.events.C14g.map(e=>e.choice),['1','2','3','4','5','6']);
 const t=structuredClone(all.afterZen);Object.assign(t,{ch24Phase:'room',ch24Room:{}});
 assert.deepEqual(available(node('C14'),t).map(o=>o.id),['0','1','3','4','5','7','8','9','10','11'],'SWAT damage, the body and the console blood; no wall blood when Simon died in the room');
 const phone=play({},{pre:{ch23Guards:'phoneShot'}});assert.equal(phone.events.C14g[0].choice,'0','the phone guard’s body');
 assert.ok(!phone.events.C14g.some(e=>e.choice==='4'),'no phone to pick up when the phone guard was shot');
});

test('Public Enemy: the officer from the terrace is met, and dies or is rescued, only if he was saved in The Hostage',()=>{
 const saved=play({...KITCHEN,C16:'2'});assert.equal(saved.s.choices.C03,'0');assert.ok(saved.visited.includes('C14i'));assert.equal(saved.s.ch24Wilson,'rescued');
 assert.match(render(saved.events.C16[0].event),/saved on the terrace was standing in the line of fire/);
 const variant=situationFor(node('C14i'),saved.afterZen);assert.match(variant,/I was on that terrace/);
 assert.match(variant,saved.afterZen.connorDeaths===0?/I remember you/:/you must be mistaken/);
 const killed=play({...KITCHEN,C16:'0'});assert.equal(killed.s.ch24Wilson,'killed');assert.match(render(killed.events.C16[0].event),/among the dead/);
 const notSaved=play({C03:'1',...KITCHEN,C16:'0'});assert.ok(!notSaved.visited.includes('C14i'));assert.equal(notSaved.s.ch24Wilson,'notSaved');assert.ok(!/terrace/.test(render(notSaved.events.C16[0].event)));
 assert.equal(readInputs({choices:{C03:'0'},connorDeaths:0,simon:true}).copMemory,'remembers');
 assert.equal(readInputs({choices:{C03:'0'},connorDeaths:1,hostageOutcome:'Deviant shot Connor',simon:true}).copMemory,'diedInHostage');
 assert.equal(readInputs({choices:{C03:'0'},connorDeaths:2,hostageOutcome:'Deviant shot Connor',simon:true}).copMemory,'diedAfter');
});

test('Public Enemy: the roof endings (Simon left alive on the roof)',()=>{
 const ROOF={C14:['0']};
 const trauma=play(ROOF);assert.deepEqual(endings(trauma),['C14x3']);assert.equal(trauma.s.ch24Ending,ENDINGS.traumatized);
 assert.deepEqual(delta(trauma),D({instability:2}));assert.equal(trauma.s.simon,false);assert.equal(trauma.s.evidence.simonBody,true);assert.equal(trauma.s.evidence.simonTablet,true);
 assert.equal(trauma.s.ch24JerichoMemory,true);assert.ok(trauma.s.knowledge.Connor.some(f=>/rusty metal/.test(f)));assert.equal(trauma.s.ch24SimonSurvived,false);
 const died=play(ROOF,{fails:['C14b']});assert.deepEqual(endings(died),['C14x2']);assert.equal(died.s.ch24Ending,ENDINGS.diedSimon);
 assert.deepEqual(delta(died),D({instability:-1,connorDeaths:1}),'the death: instability −1 only (no Hank or Amanda change here)');
 assert.equal(died.s.ch24ConnorDied,true);assert.equal(died.s.evidence.simonTablet,false);assert.equal(died.s.evidence.simonBody,true);assert.match(render(died.events.C14b[0].event),/replacement/);
 const cover=play({...ROOF,C14b:'1'});assert.deepEqual(endings(cover),['C14x4']);assert.deepEqual(delta(cover),ZERO);assert.equal(cover.s.simon,false);
 for(const r of [trauma,died,cover]){assert.ok(!r.visited.some(id=>/^C15|^C16$|^R24$/.test(id)),'no kitchen confrontation after the roof');assert.equal(r.s.simonHidden,false)}
 // FIND SIMON needs the blood analyzed first.
 const s=structuredClone(trauma.afterZen);Object.assign(s,{ch24Phase:'roof',ch24Roof:{}});
 assert.ok(!available(node('C14r'),s).some(o=>o.id==='9'));s.ch24Roof.blood=true;assert.ok(available(node('C14r'),s).some(o=>o.id==='9'));
});

test('Public Enemy: leaving the roof without Simon keeps him alive; the roof without a hidden android is clues only',()=>{
 const left=play({C14:['0','2'],C14r:['10'],C14y:'0'});
 assert.deepEqual(left.visited.filter(id=>['C14','C14r','C14r2','C14y','C14x1'].includes(id)),['C14','C14r','C14r2','C14','C14y','C14x1']);
 assert.equal(left.s.ch24Ending,ENDINGS.left);assert.equal(left.s.simon,true);assert.equal(left.s.ch24SimonSurvived,true);assert.equal(left.s.simonHidden,false);
 assert.deepEqual(delta(left),ZERO);
 const no=play({M14:'1',C14:['0','2'],C14y:'0'});assert.equal(no.s.ch24In.simonFate,'roofKilled');
 assert.ok(no.events.C14r.some(e=>e.choice==='3'),'the destroyed android on the roof');assert.ok(!no.visited.includes('C14b'));
 assert.equal(no.events.C14r.at(-1).choice,'10','the only way off the roof is back down');assert.equal(no.s.ch24SimonSurvived,false);
 // NO goes back to the broadcast room.
 const stay=play({C14:['0','2','2'],C14r:['10'],C14y:['1','0']});assert.deepEqual(stay.visited.filter(id=>id==='C14y').length,2);assert.equal(stay.s.ch24Ending,ENDINGS.left);
});

test('Public Enemy: the kitchen needs the camera recording, and resumes at the accusation',()=>{
 const r=play({C14:['1','9','1']});
 const order=r.visited.filter(id=>/^C14$|^C15/.test(id));
 assert.deepEqual(order.slice(0,7),['C14','C15a','C15b','C15c','C14','C14','C15']);
 assert.equal(r.s.ch24KitchenPaused,true);
 const s=structuredClone(r.afterZen);Object.assign(s,{ch24Phase:'room',ch24Room:{},ch24KitchenVisited:true});
 assert.ok(!available(node('C14'),s).some(o=>o.id==='1'),'no second visit without the recording');s.ch24Room.camera=true;assert.ok(available(node('C14'),s).some(o=>o.id==='1'));
});

test('Public Enemy: the kitchen endings',()=>{
 const wrong=play({...KITCHEN,C15d:'1',C15e:'3'});assert.deepEqual(endings(wrong),['C14x1']);assert.equal(wrong.s.ch24DeviantFound,false);
 assert.match(render(wrong.events.C15e[0].event),/No memory\..*NO DEVIANT AMONG THEM.*You wanna go\?/);assert.equal(wrong.s.evidence.kitchenBody,false);assert.deepEqual(delta(wrong),ZERO);
 assert.ok(!wrong.visited.includes('C15f'));assert.equal(DEVIANT,'0');
 const shut=play(KITCHEN,{fails:['C15g']});assert.deepEqual(endings(shut),['C15x1']);assert.equal(shut.s.ch24Ending,ENDINGS.shutDown);
 assert.deepEqual(delta(shut),D({instability:-1,hankTrust:-1,connorDeaths:1}));assert.equal(shut.s.evidence.kitchenBody,false);
 const lose=play({...KITCHEN,C15h:'1'});assert.deepEqual(endings(lose),['C15x2']);assert.equal(lose.s.ch24Ending,ENDINGS.survived);assert.deepEqual(delta(lose),ZERO,'no arrow on LOSE TOO MUCH TIME');
 assert.equal(lose.s.evidence.kitchenBody,true);assert.ok(!lose.visited.includes('C16'));
 const wrongWay=play(KITCHEN,{fails:['C15h']});assert.equal(wrongWay.s.ch24Ending,ENDINGS.survived);assert.match(render(wrongWay.events.C15h[0].event),/wrong way/);
 const attack=play({...KITCHEN,C16:'0'});assert.deepEqual(endings(attack),['C15x2']);assert.deepEqual(delta(attack),D({publicSupport:-1,instability:2}));
 assert.match(situationFor(node('C15x2'),attack.s),/I was too late/);assert.doesNotMatch(situationFor(node('C15x2'),lose.s),/I was too late/);
 const save=play({...KITCHEN,C16:'1'});assert.deepEqual(endings(save),['C16x1']);assert.equal(save.s.ch24Ending,ENDINGS.sacrificed);
 assert.deepEqual(delta(save),D({publicSupport:-1,hankTrust:2,instability:-1,connorDeaths:1}));assert.equal(save.s.ch24ProtectedHank,true);assert.equal(save.s.ch24ConnorDied,true);
 const gun=play({...KITCHEN,C16:'2'});assert.deepEqual(endings(gun),['C16x2']);assert.equal(gun.s.ch24Ending,ENDINGS.massacre);assert.deepEqual(delta(gun),D({hankTrust:2}));assert.equal(gun.s.ch24ProtectedHank,false);
 for(const r of [lose,attack,save,gun]){assert.equal(r.s.evidence.kitchenBody,true);assert.equal(r.s.ch24SimonSurvived,true,'Simon stayed hidden on the roof');assert.equal(r.s.simon,true)}
 assert.match(render(situationFor(node('C16'),gun.afterZen)),/HANK SURVIVAL PROBABILITY : 40%/);
 // Every approach in the last round finds the deviant when it is aimed at the android on the left.
 for(const c of ['0','1','2','3']){const r=play({...KITCHEN,C15d:'0',C15e:c,C16:'2'});assert.equal(r.s.ch24DeviantFound,true);assert.ok(r.visited.includes('C15f'))}
});

test('Public Enemy: random play always ends the chapter once, with one confrontation at most',{timeout:60000},()=>{
 const rng=random(24),seen=new Set,starts=[atChapter({}),atChapter({M14:'1'}),atChapter({C03:'1',M13:'1'})];
 for(let i=0;i<600;i++){const r=play({},{rng,from:starts[i%3],pre:i%2?{ch23Swat:true,ch23Guards:'armedShot'}:{}});const e=endings(r);assert.equal(e.length,1,'one ending: '+r.visited.join(' '));seen.add(r.s.ch24Ending);
  assert.equal(r.s.ch24Ending,ENDING_SCENES[e[0]]);assert.equal(r.s.ch24Phase,'over');
  assert.ok(!(r.visited.includes('C14b')&&r.visited.includes('C15f')),'roof and kitchen confrontations are exclusive');
  assert.equal(r.s.ch24SimonSurvived,r.s.ch24In.simonOnRoof&&!r.s.ch24SimonFound);if(r.s.ch24SimonFound)assert.equal(r.s.simon,false);
  assert.equal(r.s.ch24ConnorDied,[ENDINGS.diedSimon,ENDINGS.shutDown,ENDINGS.sacrificed].includes(r.s.ch24Ending));
  for(const id of r.visited)if(!['C14g','C14','C14r','C14y'].includes(id)&&!/^C15[abc]$/.test(id)&&id!=='C14r2')assert.equal(r.visited.filter(x=>x===id).length,1,id+' repeated')}
 assert.ok(seen.size>=7,'random play reaches most endings: '+[...seen]);
});

test('Public Enemy: the subject reads neutral names only',{timeout:60000},()=>{
 const LEAK=/Connor|CONNOR|\bHank\b|HANK|Amanda|Anderson|Eden|Stratford|Elijah|Kamski|Manfred|rA9|\bSean\b|Chedd|CHEDD|Thompson|THOMPSON|\bEvan\b|\bRobert\b|ROBERT|\bChris\b|CHRIS|Simon|SIMON|Markus|Wilson|Perkins|Jericho|CyberLife|Detroit|deviant|DEVIANT|Carl\b|Tracis?\b/;
 const texts=[];for(const n of ch24){texts.push(n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome,o.wrong].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.media??[]).flatMap(m=>[m.title,...m.facts]))}
 const rng=random(7),from=atChapter({});for(let i=0;i<80;i++){const r=play({},{rng,from,pre:i%2?{ch22HankShotConnor:true,ch20Tracis:'notFound'}:{}});for(const list of Object.values(r.events))for(const e of list)texts.push(e.event);r.s.knowledge.Connor.forEach(f=>texts.push(f))}
 for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),t);assert.ok(!LEAK.test(neutral),neutral)}
 assert.match(render(node('C14').options.find(o=>o.clue==='video').outcome,'real'),/Gift from Elijah Kamski to Carl Manfred/);
});
