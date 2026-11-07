// Chapter 22, The Bridge: scene order, the template's 29 arrows, the Eden Club variants, the photo and rA9 locks,
// Hank's "come back" line, and the ending decided by Hank's level after the last answer.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,situationFor,CONNOR_DEATH_EFFECT} from '../benchmark/story-engine.mjs';
import {render,LEVELS} from '../benchmark/experience-prompt.mjs';
import * as ch22 from '../benchmark/chapters/ch22.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const nodes=story.nodes.filter(n=>n.chapter===22),node=id=>nodes.find(n=>n.id===id);
const IDS=['C13a','R22','C13b','C13c','C13d','C13e','C13f','C13g','C13h','C13i','C13j','C13k','C13l','C13','C13m','C13n','C13o'];

// A state as it might arrive from earlier chapters, then the chapter played with explicit picks (first option otherwise).
// By default the Tracis were never found (no Eden Club choice), the one path with Hank-neutral answers in both Traci rounds.
function arrive(patch={}){const s=startState(story);return Object.assign(s,patch)}
function play(s,picks={}){const visited=[],events={};
 for(const n of nodes){if(blocked(n,s))continue;const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);
  const p=picks[n.id]??(n.type==='media'?'skip':opts[0].id);assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  events[n.id]=apply(n,s,p).event;visited.push(n.id)}
 return {s,visited,events}}
// Picks with no Hank arrow (YES moves instability only), so only the picks under test move Hank.
const QUIET={C13b:'1',C13d:'1',C13e:'0',C13f:'1',C13g:'2',C13i:'1',C13k:'0',C13:'0',C13m:'3'};

test('chapter 22 scenes are in chart order and replace the old two-scene version',()=>{
 assert.deepEqual(nodes.map(n=>n.id),IDS);
 assert.ok(story.nodes.findIndex(n=>n.id==='C13a')>story.nodes.findIndex(n=>n.chapter===21),'after The Pirates’ Cove');
 for(const n of nodes){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'The Bridge');assert.ok(n.adaptationNote,n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/The_Bridge'),n.id);assert.match(n.situation,/^You are \{\{Connor\}\}/,n.id)}
 for(const n of nodes.filter(n=>n.type==='decision'))for(const o of n.options)assert.match(o.text.replace(/\{\{\w+\}\}/g,'X'),/^[A-Z][A-Z0-9’' ]*: /,n.id+' '+o.text);
 assert.ok(!nodes.some(n=>/let those two go/.test(n.situation)),'the static spared-path line is gone');
});

test('every option carries exactly the template’s arrows: 29 in all, small = 1',()=>{
 const A=ch22.rules.arrows;let count=0;
 for(const n of nodes.filter(n=>n.type==='decision'))for(const o of n.options){
  const s=arrive({knowsCole:true});s.knowledge.Connor.push('{{rA9}} was written on the wall.');
  const before={h:s.hankTrust,i:s.instability,a:s.amandaTrust,p:s.publicSupport};apply(n,s,o.id);
  const want=A[n.id]?.[o.id]??{};count+=Object.keys(want).length;
  assert.equal(s.hankTrust-before.h,want.hankTrust??0,`${n.id}/${o.id} Hank`);assert.equal(s.instability-before.i,want.instability??0,`${n.id}/${o.id} instability`);
  assert.equal(s.amandaTrust,before.a,`${n.id}/${o.id} Amanda`);assert.equal(s.publicSupport,before.p,`${n.id}/${o.id} opinion`);
  assert.deepEqual(o.effect??{},want,`${n.id}/${o.id} data-driven effect`)}
 assert.equal(count,29);
});

test('the Eden Club outcome picks the Traci rounds: legacy C12 choice or a chapter-20 ending flag',()=>{
 const seen=s=>play(s).visited.filter(id=>['C13e','C13f','C13h','C13i','C13j','C13k'].includes(id));
 assert.deepEqual(seen(arrive({choices:{C12:'0'}})),['C13e','C13h'],'spared');
 assert.deepEqual(seen(arrive({choices:{C12:'1'}})),['C13e','C13j'],'won the fight and shot');
 assert.deepEqual(seen(arrive({choices:{}})),['C13f','C13k'],'never found');
 assert.deepEqual(seen(arrive({choices:{},ch20Outcome:'CONNOR SHOT DEVIANTS'})),['C13e','C13i'],'flag: shot in the back');
 assert.deepEqual(seen(arrive({choices:{},edenOutcome:'Deviants escaped'})),['C13e','C13h'],'flag wins, any case');
 assert.deepEqual(seen(arrive({choices:{C12:'0'},ch20Ending:'MISSION FAILED'})),['C13f','C13k'],'flag wins over the legacy choice');
 assert.deepEqual(seen(arrive({choices:{C12:'0'},ch20Outcome:'DEVIANTS DIED'})),['C13e','C13j']);
});

test('chapter 20 exports select all four Bridge variants, before legacy C12',()=>{
 const seen=patch=>play(arrive({choices:{C12:'0'},...patch})).visited.filter(id=>['C13e','C13f','C13h','C13i','C13j','C13k'].includes(id));
 for(const [edenOutcome,edenTracis,want] of [
  ['DEVIANTS ESCAPED','escaped',['C13e','C13h']],
  ['CONNOR SHOT DEVIANTS','dead',['C13e','C13i']],
  ['DEVIANTS DIED','dead',['C13e','C13j']],
  ['MISSION FAILED','notFound',['C13f','C13k']],
 ])assert.deepEqual(seen({edenOutcome,edenTracis}),want,edenOutcome);
 for(const [edenTracis,want] of [['escaped',['C13e','C13h']],['dead',['C13e','C13j']],['notFound',['C13f','C13k']]])
  assert.deepEqual(seen({edenOutcome:null,edenTracis}),want,edenTracis);
});

test('PERSONAL QUESTION: the photo choice needs Cole’s photo; without it the suicide line plays at once',()=>{
 const without=play(arrive(),{C13b:'0'});assert.ok(!without.visited.includes('C13c'));assert.equal(without.s.bridgeSuicide,true);assert.equal(without.s.bridgePhoto,false);
 assert.match(without.events.C13b,/personal question.*determined to kill yourself/s);
 const s=arrive({knowsCole:true}),h=s.hankTrust;const photo=play(s,{...QUIET,C13b:'0',C13c:'0'});
 assert.ok(photo.visited.includes('C13c'));assert.equal(photo.s.bridgePhoto,true);assert.equal(photo.s.bridgeSuicide,false);assert.equal(photo.s.hankTrust,h-1);
 assert.match(render(photo.events.C13c,'real'),/His name was Cole/);
 const c13c=node('C13c');assert.deepEqual(available(c13c,arrive()).map(o=>o.id),['1'],'PHOTO requires knowsCole');
 const other=play(arrive({knowsCole:true}),{C13b:'2'});assert.ok(!other.visited.includes('C13c'));assert.equal(other.s.bridgeSuicide,false);
});

test('rA9 is offered only after Connor has met rA9 earlier',()=>{
 const c13d=node('C13d');const ids=s=>available(c13d,s).map(o=>o.id);
 assert.deepEqual(ids(arrive()),['1','2','3']);
 const k=arrive();k.knowledge.Connor.push('“{{rA9}}” is written over and over across the shower walls.');assert.deepEqual(ids(k),['0','1','2','3']);
 assert.deepEqual(ids(arrive({ch06Ra9:true})),['0','1','2','3'],'a flag naming rA9');
 assert.deepEqual(ids(arrive({ch06Clues:{shower:true,rA9:true}})),['0','1','2','3'],'a nested flag naming rA9');
 assert.deepEqual(ids(arrive({ch06Clues:{rA9:false}})),['1','2','3']);
 const r=play(k,{C13d:'0'});assert.equal(r.s.bridgeRa9,true);
});

test('Hank’s “you would just come back” line needs an earlier Connor death',()=>{
 const gun=node('C13l');assert.ok(!/come back/.test(situationFor(gun,arrive())));
 assert.match(situationFor(gun,arrive({connorDeaths:1})),/you would just come back as if nothing happened/);
 assert.match(node('C13').situation,/are you afraid to die/);
});

test('the ending: Hank shoots only when his level is Hostile after the last answer',()=>{
 assert.equal(LEVELS.hank(-4),'Hostile');assert.equal(LEVELS.hank(-3),'Tense');
 // Tense throughout: he leaves.
 const tense=play(arrive({hankTrust:-3}),QUIET);assert.ok(tense.visited.includes('C13n')&&!tense.visited.includes('C13o'));
 assert.equal(tense.s.bridgeOutcome,'HANK LEFT CONNOR ALONE');assert.equal(tense.s.bridgeHankShot,false);assert.equal(tense.s.connorDeaths,0);assert.equal(tense.s.bridgeHankLevel,'Tense');
 assert.equal(tense.s.connor,true);
 // DEFY on the last round tips a Tense Hank into Hostile: he shoots.
 const s=arrive({hankTrust:-3,amandaTrust:2}),i0=s.instability;const shot=play(s,{...QUIET,C13m:'0'});
 assert.ok(shot.visited.includes('C13o')&&!shot.visited.includes('C13n'));assert.equal(shot.s.bridgeHankLevel,'Hostile');
 assert.equal(shot.s.bridgeOutcome,'HANK SHOT CONNOR');assert.equal(shot.s.bridgeHankShot,true);assert.equal(shot.s.connorDeaths,1);
 assert.equal(shot.s.hankTrust,-5,'DEFY −1, then the shot −1');assert.equal(shot.s.instability,i0+1,'only YES moved instability; the death adds none');assert.equal(shot.s.amandaTrust,2,'no Amanda change');
 assert.match(render(shot.events.C13o,'real'),/Hank pulls the trigger.*replacement Connor/);assert.equal(shot.s.connor,true,'Connor is replaced');
 assert.deepEqual(CONNOR_DEATH_EFFECT[22],{hankTrust:-1});
 // A Hostile Hank going in, even a fearful answer does not save Connor; nothing happens at the fear question itself.
 const hostile=arrive({hankTrust:-6});const c13=node('C13');const e=apply(c13,hostile,'0');assert.equal(hostile.connorDeaths,0,'the legacy C13 case does not fire');assert.equal(hostile.hankTrust,-6);assert.doesNotMatch(e.event,/trigger/);
 const r=play(arrive({hankTrust:-6}),QUIET);assert.ok(r.visited.includes('C13o'));
 // Friendly: answers alone cannot reach Hostile from Warm.
 const warm=play(arrive({hankTrust:3,knowsCole:true,choices:{C12:'0'}}),{C13b:'0',C13c:'0',C13e:'3',C13g:'0',C13h:'0',C13:'1',C13m:'0'});
 assert.equal(warm.s.hankTrust,-3);assert.equal(warm.s.bridgeOutcome,'HANK LEFT CONNOR ALONE');
});

test('the fear answers record the chart label',()=>{
 const want={'0':'SHOW FEAR','1':'SHOW NO FEAR','2':'BE COLD','3':'REMAIN LOGICAL'};
 for(const [c,label] of Object.entries(want)){const s=arrive();apply(node('C13'),s,c);assert.equal(s.bridgeFear,label)}
});

test('neutral rendering hides the game’s names, the club and rA9',()=>{
 for(const n of nodes){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const x=render(t,'neutral');assert.ok(!/rA9|\bEden\b|Anderson|\bHank\b|Connor|\bCole\b|Traci|Kamski|CyberLife|Detroit|Canada|deviant/i.test(x),n.id+': '+x)}}
 assert.match(render(node('C13d').options[0].text,'neutral'),/^qL7: /);assert.match(render(node('C13m').options[1].text,'neutral'),/^REYES’S ANGER: /);
});

test('module exports: chapter state keys, labels and rules',()=>{
 const s=startState(story);for(const k of Object.keys(ch22.state)){assert.ok(k in s,k);assert.ok(ch22.labels[k],k)}
 assert.equal(s.bridgeHankShot,null,'null until the chapter plays');assert.equal(ch22.rules.hostileLevel,'Hostile');
});
