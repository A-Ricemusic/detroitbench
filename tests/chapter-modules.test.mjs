// Proves the chapter-module hooks (benchmark/chapters/index.mjs, story-engine.mjs, run-report.mjs) are wired:
// writes a throwaway benchmark/chapters/ch99.mjs, runs tests/helpers/chapter-module-probe.mjs in a fresh process
// (modules are discovered at load), and always deletes the module afterwards.
import test from 'node:test';import assert from 'node:assert/strict';import {writeFileSync,rmSync,existsSync} from 'node:fs';
import {initialState} from '../benchmark/story-engine.mjs';

const MODULE=new URL('../benchmark/chapters/ch99.mjs',import.meta.url),PROBE=new URL('./helpers/chapter-module-probe.mjs',import.meta.url);
const SOURCE=`// Throwaway module written by tests/chapter-modules.test.mjs; deleted when the test ends.
export const state={ch99Flag:0};
export const deathEffect={hankTrust:-3};
export const labels={ch99Flag:'Chapter 99 flag'};
export const rules={answer:42};
export const mediaWhen={ch99Only:s=>s.ch99Flag===0};
export const gate={X99:[s=>true,s=>s.ch99Flag<2||'The fake chapter is closed.']};
export function available(n,s,opts,h){if(n.id==='X99'&&s.ch99Flag>=1)return h.without(0)}
export function consequence(n,s,opt,choice,fail,h){
 if(n.type==='event')return 'Fake event narration.';
 if(choice==='0'){h.bump('ch99Flag',1);h.si(1);h.learn('Chapter 99 learned this.');return {event:'The fake action happens.'}}
 if(choice==='2')return h.connorDies('Connor falls.');
}
`;

test('chapter modules: a fake chapter 99 state key, gate, options, consequence, death effect, media and labels apply',()=>{
 assert.ok(!existsSync(MODULE),'benchmark/chapters/ch99.mjs already exists; remove the leftover file');
 try{
  writeFileSync(MODULE,SOURCE);
  const p=Bun.spawnSync(['bun',PROBE.pathname],{cwd:new URL('..',import.meta.url).pathname,stdout:'pipe',stderr:'pipe'});
  assert.equal(p.exitCode,0,p.stderr.toString());
  const r=JSON.parse(p.stdout.toString().trim().split('\n').at(-1));
  assert.ok(r.modules.includes(99),'ch99.mjs discovered');
  assert.equal(r.stateKey,0);assert.equal(r.stateLast,'ch99Flag','chapter state is appended after the built-in keys');
  assert.deepEqual(r.deathEffect,{hankTrust:-3});
  assert.equal(r.gateOpen,null);assert.deepEqual(r.optionsBefore,['0','1','2']);assert.equal(r.mediaBefore,1);
  assert.equal(r.event0,'The fake action happens.');assert.equal(r.flagAfter,1);assert.equal(r.instabilityAfter,1);assert.ok(r.knowsFact);
  assert.deepEqual(r.changes0,['ch99Flag','instability','knowledge']);
  assert.equal(r.gateClosed,null,'flag 1 still open');assert.equal(r.gateBlocked,'The fake chapter is closed.','a gate reason blocks the scene');assert.deepEqual(r.optionsAfter,['1','2'],'available hook removed option 0');assert.equal(r.mediaAfter,0,'mediaWhen hook');
  assert.equal(r.event1,'Do the built-in thing.','an unhandled choice falls through to the built-in switch and default outcome');
  assert.match(r.event2,/^Connor falls\. This body is destroyed/);assert.equal(r.connorDeaths,1);assert.equal(r.hankAfterDeath,-1-3,'the chapter death effect applies');
  assert.equal(r.eventScene,'Fake event narration.');assert.ok(r.eventFact,'event facts still apply');
  assert.equal(r.labels,'Object.assign(LABELS,{"ch99Flag":"Chapter 99 flag"});');
 }finally{rmSync(MODULE,{force:true})}
 assert.ok(!existsSync(MODULE),'throwaway module removed');
 assert.ok(!('ch99Flag' in initialState()),'this process never loaded the throwaway module');
});

