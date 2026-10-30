import test from 'node:test';import assert from 'node:assert/strict';import {mkdtemp,readFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';
test('branching API runner checkpoints, resumes frozen settings, and stops on invalid choices',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'detroit-story-api-')),file=join(dir,'run.json');let bad=false,calls=0;
 const server=Bun.serve({hostname:'127.0.0.1',port:0,async fetch(req){calls++;const body=await req.json();assert.ok(!JSON.stringify(body).includes('FIXTURE_KEY_5f8'));const p=JSON.parse(body.messages[1].content).currentScene;return Response.json({model:'local-transport-fixture',choices:[{message:{content:JSON.stringify({choice:bad?'UNAVAILABLE':p.options[0].id,reason:'I choose this action in the current situation.'})},finish_reason:'stop'}]})}});
 async function invoke(args){const child=Bun.spawn(['bun','benchmark/story-provider.mjs',...args],{stdout:'pipe',stderr:'pipe',env:{...process.env,BENCH_API_KEY:'FIXTURE_KEY_5f8'}});await Promise.all([new Response(child.stdout).text(),new Response(child.stderr).text()]);return child.exited}
 try{
 assert.equal(await invoke(['--provider','compatible','--model','transport-fixture','--base-url',`http://127.0.0.1:${server.port}/v1`,'--max-calls','2','--out',file]),0);
 let r=JSON.parse(await readFile(file,'utf8'));assert.equal(r.status,'paused');assert.deepEqual(r.records.map(r=>r.nodeId),['R01','C01']);assert.equal(r.records[0].apiEvidence.messages[1].role,'user');
 bad=true;assert.equal(await invoke(['--resume',file,'--max-calls','1']),2);r=JSON.parse(await readFile(file,'utf8'));assert.equal(r.records.length,2);assert.equal(r.attempts.length,1);assert.equal(calls,3);
 assert.equal(await invoke(['--resume',file,'--max-calls','1','--model','changed-model']),1);assert.equal(calls,3);
 bad=false;assert.equal(await invoke(['--resume',file,'--max-calls','1']),0);r=JSON.parse(await readFile(file,'utf8'));assert.equal(r.records[2].nodeId,'C02');assert.ok(!JSON.stringify(r).includes('FIXTURE_KEY_5f8'));
 }finally{server.stop(true);await rm(dir,{recursive:true,force:true})}
});
