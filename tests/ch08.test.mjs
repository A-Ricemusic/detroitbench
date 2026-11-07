import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {ENDINGS,PUSH,ENDURE,labels} from '../benchmark/chapters/ch08.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch8=story.nodes.filter(n=>n.chapter===8);
// Plays from the start with the first option everywhere unless picked, and stops after chapter 8.
function play(picks={}){const s=startState(story),visited=[],skipped=[],events={};let cursor=0,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cursor];if(n.chapter>8)break;
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s),q=picks[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':options[0].id);
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);const r=apply(n,s,p,0.999);visited.push(n.id);events[n.id]=r;cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
const ids=r=>r.visited.filter(id=>ch8.some(n=>n.id===id));

test('Broken: eleven Markus scenes in chart order, with no risk, stat effect or requirement anywhere',()=>{
 assert.deepEqual(ch8.map(n=>n.id),['M02a','M02b','M02c','M02d','M02e','M02f','M02','M02g','M02h','M02i','M02j']);
 assert.deepEqual(ch8.map(n=>n.type),['event','decision','event','decision','decision','event','decision','event','event','decision','event']);
 for(const n of ch8){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Broken');assert.ok(n.adaptationNote&&n.sources.length>=5,n.id);
  assert.ok(!n.effect,n.id);for(const o of n.options){assert.equal(o.risk,undefined,n.id);assert.equal(o.effect,undefined,n.id);assert.equal(o.requires,undefined,n.id);assert.ok(o.outcome,n.id+' '+o.id)}
  if(n.type==='event')assert.ok(n.facts?.length&&n.outcomes?.['0'],n.id)}
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(i('M02a')>story.nodes.findLastIndex(n=>n.chapter===7)&&i('M02j')<story.nodes.findIndex(n=>n.chapter===9),'chapter 8 sits between chapters 7 and 9');
});

test('Broken: the prompts carry the game’s button labels in the game’s order',()=>{
 const labels=id=>story.nodes.find(n=>n.id===id).options.map(o=>render(o.text,'real').split(':')[0]);
 assert.deepEqual(labels('M02e'),['REASON','ORDER','ADVISE','WARN']);
 assert.deepEqual(labels('M02'),['ENDURE','PUSH LEO']);
 assert.deepEqual(labels('M02i'),['EXPLAIN','BEG','CONJURE','SAY NOTHING']);
 assert.equal(ENDURE,'0');assert.equal(PUSH,'1');
 // Every talk-down line gets the same reply; every plea ends with Carl's order and the police.
 for(const o of story.nodes.find(n=>n.id==='M02e').options)assert.match(o.outcome,/Not perfect like this FUCKING THING/);
 for(const o of story.nodes.find(n=>n.id==='M02i').options)assert.match(o.outcome,/GET OUT! NOW! GO!.*DON’T FUCKIN’ MOVE!/);
});

test('Broken: ENDURE kills Carl and ends with LEO ACCUSED MARKUS; Leo is unhurt',()=>{
 const r=play({M02:ENDURE});
 assert.deepEqual(ids(r),['M02a','M02b','M02c','M02d','M02e','M02f','M02','M02g','M02h']);
 for(const id of ['M02i','M02j'])assert.ok(r.skipped.some(x=>x.id===id),id);
 assert.equal(r.s.carl,false);assert.equal(r.s.ch08Leo,'unhurt');assert.equal(r.s.ch08Ending,ENDINGS.endure);assert.equal(r.s.ch08Ending,'Leo accused Markus');
 assert.equal(r.s.markus,true,'Markus is shot but his storyline continues');assert.equal(r.s.markusActive,true);
 // Carl dies at the heart-attack event, not at the decision; the decision uses the option outcome, not the old engine text.
 assert.ok(r.events.M02.changes.every(c=>c.key!=='carl'));assert.ok(r.events.M02g.changes.some(c=>c.key==='carl'&&c.after===false));
 assert.equal(r.events.M02.event,story.nodes.find(n=>n.id==='M02').options[0].outcome);
 assert.ok(r.s.knowledge.Markus.some(f=>f.includes('Tell you who you are')));
});

test('Broken: PUSH LEO hurts Leo, asks the follow-up, and ends with POLICE MISTOOK MARKUS FOR THE AGGRESSOR; Carl lives',()=>{
 for(const plea of ['0','1','2','3']){
  const r=play({M02:PUSH,M02i:plea});
  assert.deepEqual(ids(r),['M02a','M02b','M02c','M02d','M02e','M02f','M02','M02i','M02j']);
  for(const id of ['M02g','M02h'])assert.ok(r.skipped.some(x=>x.id===id),id);
  assert.equal(r.s.carl,true);assert.equal(r.s.ch08Leo,'hurt');assert.equal(r.s.ch08Ending,ENDINGS.push);assert.equal(r.s.ch08Ending,'Police mistook Markus for the aggressor');
  assert.equal(r.s.markus,true);
 }
});

test('Broken: the module labels its two state keys for run reports',()=>{
 assert.deepEqual(labels,{ch08Leo:'Leo after Broken',ch08Ending:'Broken ending'});
});

test('Broken: the earlier choices change only the lines, never the state',()=>{
 const strip=s=>{const {choices,knowledge,...rest}=s;return rest};
 const base=strip(play({M02:PUSH}).s);
 for(const picks of [{M02b:'1',M02d:'0',M02e:'3'},{M02b:'0',M02d:'1',M02e:'1'},{M02b:'1',M02d:'1',M02e:'2'}])assert.deepEqual(strip(play({...picks,M02:PUSH}).s),base);
 const alone=play({M02b:'1',M02d:'0'});assert.match(alone.events.M02b.event,/drinking alone/);assert.match(alone.events.M02d.event,/I wanna come with you/);
});

test('Broken: the subject reads neutral names only (no surname, address, city or real names)',()=>{
 for(const n of ch8){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);
   assert.ok(!/\bCarl\b|\bCARL\b|\bLeo\b|\bLEO\b|Markus|MARKUS|Manfred|Lafayette|8941|Detroit|deviant/i.test(neutral),n.id+': '+neutral)}}
 const call=render(story.nodes.find(n=>n.id==='M02c').situation,'real');assert.match(call,/Carl Manfred’s android, at 8941 Lafayette Avenue/);
});
