// Chapter 1, The Hostage: the story 1.9.2 fixes from the morning-report triage (docs/research/triage/ch01.json). The
// chapter's main suite is in tests/story.test.mjs; this file covers the fixes and the replay of older story snapshots.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,available,apply,blocked,nextCursor} from '../benchmark/story-engine.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const terrace=(trust=50,extra={})=>({...startState(story),hostagePhase:'terrace',trust,...extra});
// Plays chapter 1 from the start with explicit picks (arrays: one per visit), first option otherwise.
function ch1(picks={},fails=[]){const s=startState(story),q=Object.fromEntries(Object.entries({C01:'1',...picks}).map(([k,v])=>[k,Array.isArray(v)?[...v]:v])),visited=[];let cur=0;
 while(cur<story.nodes.length&&story.nodes[cur].chapter===1){const n=story.nodes[cur];if(blocked(n,s)){cur++;continue}const o=available(n,s),x=q[n.id],p=(Array.isArray(x)?x.shift():x)??o[0].id;
  assert.ok(o.some(y=>y.id===p),'bad pick '+n.id+' '+p);apply(n,s,p,fails.includes(n.id)?0:0.999);visited.push(n.id);cur=nextCursor(story,cur,n,s)}
 return {s,visited}}

test('ch01-02: the father’s body (+3) and his tablet (+7) are two actions; POSSIBLE CAUSE needs the tablet',()=>{
 const hub=node('C02i'),body=hub.options.find(o=>o.id==='1'),tablet=hub.options.find(o=>o.id==='12');
 assert.equal(body.clue,'father');assert.equal(body.trust,3);assert.equal(tablet.clue,'fatherTablet');assert.equal(tablet.trust,7);assert.deepEqual(tablet.requires,{'hostageClues.father':true});
 assert.ok(!/AP700/.test(body.fact)&&/AP700/.test(tablet.fact),'the order confirmation is on the tablet');
 const s=startState(story);apply(node('C02b'),s,'0');apply(hub,s,'1',0.999);apply(hub,s,'12',0.999);assert.equal(s.trust,48+3+7-1);assert.equal(s.hostageActions,2,'two of the six actions');
 for(const id of ['C03d','C03d2'])assert.deepEqual(node(id).options.find(o=>o.id==='0').requires,{'hostageClues.fatherTablet':true},id);
 assert.ok(!available(node('C03d'),terrace(50,{hostageClues:{father:true}})).some(o=>o.id==='0'));
});

test('ch01-17: the helicopter fly-by (−15%) comes on stepping out, before the opening line; older snapshots keep it on C03d2',()=>{
 const a=terrace(),e=apply(node('C03a'),a,'0');assert.equal(a.trust,35);assert.match(e.event,/helicopter flies low past the terrace/);
 const d=terrace(56,{choices:{C03d:'4'}}),e2=apply(node('C03d2'),d,'2');assert.equal(d.trust,54);assert.doesNotMatch(e2.event,/helicopter/);
 // Story 1.9.1 snapshots (published runs) carried the drop on C03d2; the engine applies it where the scene declares it.
 const oldA={...node('C03a')};delete oldA.helicopter;const oldD2={...node('C03d2'),helicopter:-15};
 const x=terrace();apply(oldA,x,'0');assert.equal(x.trust,50,'no drop on the old C03a');
 const y=terrace(56,{choices:{C03d:'4'}}),ey=apply(oldD2,y,'2');assert.equal(y.trust,56-2-15);assert.match(ey.event,/helicopter swoops in/);
 // With the cap: 99% before stepping out is now 84% before the first line, so the cap no longer swallows the drop.
 const capped=terrace(99);apply(node('C03a'),capped,'0');assert.equal(capped.trust,84);
});

test('ch01-06 and ch01-07: the leap has no roll; staying back ends on CONNOR FAILED TO REACH DEVIANT IN TIME',()=>{
 const c=node('C04c');assert.equal(c.options.find(o=>o.id==='0').risk,undefined);
 const up={C02i:'11',C03:'1',C03d:'4',C03g:'1',C04:'2'};
 const leap=ch1({...up,C04c:'0'},['C04c']);assert.equal(leap.s.hostageOutcome,'Connor leapt for Emma and fell','even a “failed” roll cannot make the press late');assert.equal(leap.s.emma,true);
 const stay=ch1({...up,C04c:'1'});assert.equal(stay.s.hostageOutcome,'Connor failed to reach deviant in time');assert.equal(stay.s.emma,false);assert.equal(stay.s.instability,1);assert.equal(stay.s.connorDeaths,0);
 // Six engine outcomes, as the chart has: random play never produces the retired seventh.
 const outcomes=new Set;let seed=7;const rng=()=>((seed=(seed*16807)%2147483647)/2147483647);
 for(let i=0;i<200;i++){const s=startState(story);let cur=0;while(cur<story.nodes.length&&story.nodes[cur].chapter===1){const n=story.nodes[cur];if(blocked(n,s)){cur++;continue}const o=available(n,s);apply(n,s,o[Math.floor(rng()*o.length)].id,rng());cur=nextCursor(story,cur,n,s)}outcomes.add(s.hostageOutcome)}
 assert.ok(!outcomes.has('Deviant jumped with Emma'));for(const o of outcomes)assert.ok(['Snipers shot deviant','Connor shot deviant','Deviant shot Connor','Connor died protecting Emma','Connor leapt for Emma and fell','Connor failed to reach deviant in time'].includes(o),o);
 // A story 1.9.1 snapshot still rolls its 0.3 on the leap, as recorded.
 const old={...c,options:c.options.map(o=>o.id==='0'?{...o,risk:0.3}:o)},z=terrace(40,{hostagePhase:'jumped'});apply(old,z,'0',0.1);assert.equal(z.hostageOutcome,'Connor failed to reach deviant in time');
});

test('Allen’s second round: he says nothing to NAME, BEHAVIOR and SHOCK (transcript), so they teach nothing',()=>{
 const b=node('C02b');for(const id of ['0','1','2']){assert.match(b.outcomes[id],/\{\{Allen\}\} says nothing\./);assert.equal(b.options.find(o=>o.id===id).fact,undefined)}
 assert.match(b.outcomes['3'],/It’s the first thing we tried/);
 const s=startState(story);apply(node('C02'),s,'0');const n=s.knowledge.Connor.length;apply(b,s,'1');assert.equal(s.knowledge.Connor.length,n);
});
