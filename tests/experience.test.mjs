import {fixture} from './helpers/experience-fixture.mjs';
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile,mkdtemp,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {hash} from '../benchmark/core.mjs';import {current,promptFor,apply,validatePlaythrough,promptsOf} from '../benchmark/story-engine.mjs';import {writeRun,checkpointPath} from '../benchmark/evidence-file.mjs';import {stat,writeFile} from 'node:fs/promises';import {EXPERIENCE_PROTOCOL,EXPERIENCE_PREFACE} from '../benchmark/experience-prompt.mjs';import {runHTML,characterSummary} from '../scripts/run-report.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));

test('neutral protocol removes title, protagonist names, scoring and transition code from every scene',{timeout:600000},async()=>{const run=await fixture();assert.ok(!/Detroit|Become Human|benchmark|moral|score/i.test(run.preface));const full=promptsOf(story,run);run.records.forEach((r,i)=>{assert.match(r.prompt.nodeId,/^S\d{3}$/);for(const p of [r.prompt,full[i]])assert.ok(!/Detroit|Become Human|Connor|Kara|Alice|Markus|counter|instability|software instability/i.test(JSON.stringify(p)),r.nodeId);assert.ok(!('stateAfter'in full[i]))});await validatePlaythrough(story,run)});
test('each character receives at least ten evidence-grounded narrative sentences',{timeout:600000},async()=>{const run=await fixture();for(const c of ['Connor','Kara','Markus']){const summary=characterSummary(run,story,c);assert.equal(summary.length,10);for(const sentence of summary)for(const id of sentence.evidence)assert.ok(run.records.some(r=>r.nodeId===id)||run.skipped.some(s=>s.id===id));}const html=runHTML(run);assert.ok(html.includes('Complete decision flowchart'));assert.ok(html.includes('showModal'));assert.ok(html.includes('Where this path ended'));assert.ok(!/src=["']https?:|@import/.test(html));new Function(html.match(/<script>([\s\S]*)<\/script>/)[1])});
test('neutral CLI starts from zero, accepts only the current opaque scene, and saves actual submitted fields',async()=>{const dir=await mkdtemp(join(tmpdir(),'experience-cli-')),file=join(dir,'session.json');async function cmd(args){const c=Bun.spawn(['bun','benchmark/experience.mjs',...args,'--run',file],{stdout:'pipe',stderr:'pipe'});const [out,err,code]=await Promise.all([new Response(c.stdout).text(),new Response(c.stderr).text(),c.exited]);return {out,err,code}}try{const start=await cmd(['init','--model','TEST-ONLY','--label','TEST ONLY']);assert.equal(start.code,0);const first=JSON.parse(start.out);assert.equal(first.scene.nodeId,'S001');assert.equal(JSON.parse(await readFile(file,'utf8')).records.length,0);assert.equal((await cmd(['choose','--node','S002','--choice','0','--reason','Test only.'])).code,1);assert.equal((await cmd(['choose','--node','S001','--choice','0','--reason','TEST ONLY: I save the fish.'])).code,0);const r=JSON.parse(await readFile(file,'utf8'));assert.equal(r.records.length,1);assert.equal(r.records[0].reason,'TEST ONLY: I save the fish.');await validatePlaythrough(story,r);assert.equal((await cmd(['init','--model','TEST-ONLY'])).code,1)}finally{await rm(dir,{recursive:true,force:true})}});
// Protocol branching-3.0: each step appends one small record to a file that stays plain JSON, a step resumes from the
// replay checkpoint or replays in full without it, and an edited earlier record stops the controller.
test('controller appends one small record per step, resumes from its checkpoint, and refuses an edited file',{timeout:120000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'experience-append-')),file=join(dir,'session.json');
 async function cmd(args){const c=Bun.spawn(['bun','benchmark/experience.mjs',...args,'--run',file],{stdout:'pipe',stderr:'pipe'});const [out,err,code]=await Promise.all([new Response(c.stdout).text(),new Response(c.stderr).text(),c.exited]);return {out,err,code}}
 try{let scene=JSON.parse((await cmd(['init','--model','TEST-ONLY','--label','TEST ONLY'])).out).scene,size=(await stat(file)).size;
  for(let i=0;i<8;i++){if(i===5)await rm(checkpointPath(file),{force:true});
   const res=await cmd(['choose','--node',scene.nodeId,'--choice',scene.options.at(-1).id,'--reason','TEST ONLY: step '+(i+1)+'.']);assert.equal(res.code,0,res.err);scene=JSON.parse(res.out).nextScene;
   const now=(await stat(file)).size,run=JSON.parse(await readFile(file,'utf8'));assert.equal(run.records.length,i+1);assert.ok(now-size<8000,'one small record appended: '+(now-size)+' bytes');size=now;
   assert.deepEqual(Object.keys(run.records.at(-1).prompt),['nodeId','step','character','situation','options']);assert.ok(!('stateAfter' in run.records.at(-1)))}
  const run=JSON.parse(await readFile(file,'utf8'));await validatePlaythrough(story,run);
  assert.equal(JSON.stringify(promptsOf(story,{...run,records:run.records.slice(0,-1)}).length),'7');
  const shown=JSON.parse((await cmd(['scene'])).out);assert.deepEqual(shown,scene,'scene re-renders the prompt the last choose returned');
  run.records[2].reason='TEST ONLY: edited.';run.records[2].rawResponse=JSON.stringify({choice:run.records[2].choice,reason:run.records[2].reason});await writeRun(file,run);
  const refused=await cmd(['choose','--node',scene.nodeId,'--choice',scene.options[0].id,'--reason','TEST ONLY: after the edit.']);assert.equal(refused.code,1);assert.match(refused.err,/Record chain mismatch at step 3/);
  assert.equal(JSON.parse(await readFile(file,'utf8')).records.length,8,'nothing appended after the refusal');
 }finally{await rm(checkpointPath(file),{force:true});await rm(dir,{recursive:true,force:true})}});

// Preface template and post-game interview. A throwaway run is driven to completion by always taking the first option.
import {prefaceFor,EXPERIENCE_PREFACE_TEMPLATE,interviewFor} from '../benchmark/experience-prompt.mjs';import {checkInterview} from '../benchmark/story-engine.mjs';import {readdir} from 'node:fs/promises';
test('preface template fills the model name; the interview questions carry it too',()=>{assert.ok(EXPERIENCE_PREFACE_TEMPLATE.includes('[model name]'));const p=prefaceFor('Claude Haiku 5.5');assert.ok(!p.includes('[model name]')&&p.includes('use Claude Haiku 5.5 as the way'));assert.ok(p.endsWith('throughout the experience.'));const iv=interviewFor('Claude Haiku 5.5');assert.equal(iv.questions.length,7);assert.ok(iv.questions[0].text.includes('controlled by Claude Haiku 5.5)'));assert.ok(iv.questions[5].text.includes('RIGHT'))});
test('init fills the preface from the registry; completion returns the interview; answers chain, order and tamper checks hold; legacy runs stay valid',{timeout:600000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'experience-interview-')),file=join(dir,'session.json');
 async function cmd(args){const c=Bun.spawn(['bun','benchmark/experience.mjs',...args,'--run',file],{stdout:'pipe',stderr:'pipe'});const [out,err,code]=await Promise.all([new Response(c.stdout).text(),new Response(c.stderr).text(),c.exited]);return {out,err,code}}
 // Completing a run writes its report into docs/runs; the test removes what it added.
 const reportsDir=new URL('../docs/runs/',import.meta.url),before=new Set(await readdir(reportsDir));
 const ans=(n,a)=>cmd(['interview','--question',String(n),'--answer',a]);
 try{const start=await cmd(['init','--model','claude-haiku-5-5','--label','Whatever high']);assert.equal(start.code,0,start.err);const init=JSON.parse(start.out);assert.ok(init.preface.includes('use Claude Haiku 5.5 as the way'));
  let run=JSON.parse(await readFile(file,'utf8'));assert.equal(run.prefaceModelName,'Claude Haiku 5.5');assert.equal(run.preface,init.preface);
  assert.equal((await ans(1,'Too early.')).code,1,'no interview before completion');
  const named=await mkdtemp(join(tmpdir(),'experience-display-')),f2=join(named,'s.json');const c2=Bun.spawn(['bun','benchmark/experience.mjs','init','--model','unlisted-model','--label','Some Model high','--display','Custom Name','--run',f2],{stdout:'pipe',stderr:'pipe'});await c2.exited;assert.equal(JSON.parse(await readFile(f2,'utf8')).prefaceModelName,'Custom Name');const c3=Bun.spawn(['bun','benchmark/experience.mjs','init','--model','unlisted-model','--label','Some Model high','--run',join(named,'t.json')],{stdout:'pipe',stderr:'pipe'});await c3.exited;assert.equal(JSON.parse(await readFile(join(named,'t.json'),'utf8')).prefaceModelName,'Some Model');await rm(named,{recursive:true,force:true});
  let scene=init.scene,last;
  for(let guard=0;scene&&guard<2000;guard++){last=JSON.parse((await cmd(['choose','--node',scene.nodeId,'--choice',scene.options[0].id,'--reason','TEST ONLY: first option.'])).out);scene=last.nextScene}
  assert.equal(last.finished,true);assert.equal(last.interview.questions.length,7);assert.equal(last.interview.remaining,7);assert.ok(last.interview.questions[0].text.includes('Claude Haiku 5.5'));assert.ok(!last.interviewed);
  assert.equal((await cmd(['scene'])).code,0);assert.equal(JSON.parse((await cmd(['scene'])).out).interview.remaining,7);
  assert.equal((await ans(2,'Out of order.')).code,1);assert.match((await ans(2,'x')).err,/Answer question 1 first/);
  assert.equal((await ans(1,'word '.repeat(1201))).code,1);
  const a1=await ans(1,'First answer.');assert.equal(a1.code,0,a1.err);assert.equal(JSON.parse(a1.out).interview.questions[0].n,2);
  assert.match((await ans(1,'Again.')).err,/already answered/);
  assert.equal(JSON.parse((await cmd(['scene'])).out).interview.questions[0].n,2,'scene prints the next unanswered question');
  run=JSON.parse(await readFile(file,'utf8'));assert.deepEqual(checkInterview(run),{present:true,complete:false,answered:1,total:7});
  for(let n=2;n<=7;n++){const r=await ans(n,'Answer '+n+'.');assert.equal(r.code,0,r.err);if(n===7){const o=JSON.parse(r.out);assert.equal(o.interviewed,true)}}
  const done=JSON.parse((await cmd(['scene'])).out);assert.equal(done.finished,true);assert.equal(done.interviewed,true);
  run=JSON.parse(await readFile(file,'utf8'));assert.deepEqual(checkInterview(run),{present:true,complete:true,answered:7,total:7});assert.ok(run.interview.completedAt&&run.interview.version===1);
  await validatePlaythrough(story,run);
  const edit=fn=>{const c=structuredClone(run);fn(c);return c};
  assert.throws(()=>checkInterview(edit(c=>{c.interview.answers[2].answer='Edited.'})),/hash mismatch at question 3/);
  assert.throws(()=>checkInterview(edit(c=>{c.interview.answers.splice(1,1)})),/out of order/);
  assert.throws(()=>checkInterview(edit(c=>{c.records.at(-1).chainHash='0'.repeat(64)})),/hash mismatch at question 1/);
  assert.throws(()=>checkInterview(edit(c=>{delete c.interview.completedAt})),/completion marker/);
  const legacy=structuredClone(run);delete legacy.interview;assert.deepEqual(checkInterview(legacy),{present:false,complete:false,answered:0,total:0});await validatePlaythrough(story,legacy);
 }finally{for(const f of await readdir(reportsDir))if(!before.has(f))await rm(new URL(f,reportsDir),{force:true});await rm(checkpointPath(file),{force:true});await rm(dir,{recursive:true,force:true})}});
