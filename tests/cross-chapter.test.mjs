// Cross-chapter plumbing: a consumer reads the flag under the name its producer sets (final review, story 1.9.0).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';
import {startState,blocked,attitudes} from '../benchmark/story-engine.mjs';
import {toddShooter} from '../benchmark/chapters/ch13.mjs';
import {ENDINGS as STORMY} from '../benchmark/chapters/ch07.mjs';

test('On the Run reads who shot Todd from Stormy Night’s ch07Outcome',()=>{
 const s=startState({});s.todd=false;s.ch07Outcome=STORMY.aliceShot;assert.equal(toddShooter(s),'Alice');
 s.ch07Outcome=STORMY.karaShot;assert.equal(toddShooter(s),'Kara');
 s.todd=true;assert.equal(toddShooter(s),null);
});

test('the after-credits servant scene plays when Zlatko’s ending was KARA REMAINED RESET',()=>{
 const n={id:'BF12',chapter:32,character:'Player',type:'event'};
 const s=startState({});assert.ok(blocked(n,s));
 s.ch17Outcome='KARA REMAINED RESET';s.karaActive=false;s.alice=false;assert.equal(blocked(n,s),null);
 const t=startState({});t.karaActive=false;t.kara=false;t.ch17Outcome='ZLATKO KILLED KARA IN THE BATHROOM';assert.ok(blocked(n,t));
});

test('final attitudes call Luther dead only after he joined at Zlatko’s',()=>{
 const s=startState({});assert.equal(attitudes(s).Kara[1].level,'Never met');
 s.ch17Outcome='LUTHER JOINS KARA & ALICE';s.luther=true;s.lutherWith=true;assert.equal(attitudes(s).Kara[1].level,'Neutral');
 s.luther=false;s.lutherWith=false;assert.equal(attitudes(s).Kara[1].level,'Dead');
});

test('Freedom March: the mall exit is refused once and then hidden until an android is freed, so the hub cannot loop',async()=>{
 const {readFile}=await import('node:fs/promises');const {available,apply,blocked,nextCursor}=await import('../benchmark/story-engine.mjs');
 const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
 const i=story.nodes.findIndex(x=>x.id==='M17k'),n=story.nodes[i],s=startState({});
 assert.equal(blocked(n,s),null);assert.ok(available(n,s).some(o=>o.id==='4'));
 const r=apply(n,s,'4');assert.match(r.event,/Nobody has joined/);assert.equal(nextCursor(story,i,n,s),i,'the hub repeats');
 assert.ok(!available(n,s).some(o=>o.id==='4'),'no second refusal');
 apply(n,s,'2');assert.ok(available(n,s).some(o=>o.id==='4'),'exit back once someone is freed');
 apply(n,s,'4');assert.notEqual(nextCursor(story,i,n,s),i,'Markus leaves the mall');
});
