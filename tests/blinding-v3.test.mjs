import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {NAMES,MODEL_KEYS,render,renderStory,realText,participantOptionText,experiencePrompt,whatHappenedFor} from '../benchmark/experience-prompt.mjs';
import {participantFields} from '../scripts/name-leak-scan.mjs';
import {initialState,storyHash,recordChoice,checkPlaythrough,promptFor} from '../benchmark/story-engine.mjs';
const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url)));
const golden=JSON.parse(readFileSync(new URL('./fixtures/prompt-v1-v2-before-v3.json',import.meta.url)));
test('v1 and v2 prompts retain their pre-v3 bytes across every scene after tokenisation',()=>{
 for(const version of [1,2]){
  const prompts=story.nodes.map(n=>experiencePrompt(story,{promptVersion:version,records:[]},initialState(story),{...n,availableOptions:n.options}));
  assert.equal(JSON.stringify(prompts[0]),golden[version].sample);
  assert.equal(createHash('sha256').update(JSON.stringify(prompts)).digest('hex'),golden[version].hash);
 }
});
test('all v3 option starts are plain language; label-only and feedback labels are sentence-cased',()=>{
 for(const n of story.nodes){
  const p=experiencePrompt(story,{promptVersion:3,records:[]},initialState(story),{...n,availableOptions:n.options});
  for(const o of p.options)assert.doesNotMatch(o.text,/^[A-Z]{4,}/,n.id+': '+o.text);
 }
 for(const label of ['LIE','TRUTH','DETERMINED'])assert.equal(participantOptionText(label),label[0]+label.slice(1).toLowerCase());
 assert.equal(participantOptionText('FIND A GUN'),'Find a gun');
 const r={character:'Connor',choiceRaw:'FIND A GUN: look in the case.',eventRaw:'FIND A GUN: you found a pistol.'};
 assert.equal(whatHappenedFor(r,3).yourAction,'Look in the case.');
 assert.equal(whatHappenedFor(r,3).outcome,'You found a pistol.');
 assert.equal(whatHappenedFor(r,2).yourAction,r.choiceRaw);
});
test('model and serial tokens preserve old literals, blind v3 and restore reader prose',()=>{
 const neutral=new Set,realCodes=new Set([...MODEL_KEYS].map(k=>NAMES[k][0].toLowerCase()));
 for(const key of MODEL_KEYS){
  const [real,alias]=NAMES[key];assert.ok(!neutral.has(alias));neutral.add(alias);assert.ok(!realCodes.has(alias.toLowerCase()),key);
  if(alias.startsWith('#'))assert.equal(realText('serial'+alias),'serial'+real);
  for(const version of [1,2])assert.equal(render('{{'+key+'}}','neutral',version),real);
  assert.equal(render('{{'+key+'}}','neutral',3),alias);
  assert.equal(render('{{'+key+'}}','real'),real);
  assert.equal(realText(`${alias}, ${alias}s, ${alias}'s, ${alias}’s, ${alias}-type`),`${real}, ${real}s, ${real}'s, ${real}’s, ${real}-type`);
 }
 for(const node of renderStory(story,'neutral',3).nodes)for(const [field,text] of participantFields(node))for(const key of MODEL_KEYS)assert.ok(!text.includes(NAMES[key][0]),node.id+'.'+field+': '+key);
});
test('v3 choice evidence replays with transformed presented text and full compact prompt',async()=>{
 const run={id:'v3-test',protocol:'branching-3.0',kind:'agent-playthrough',model:'test',promptVersion:3,interviewVersion:2,storyHash:storyHash(story),createdAt:'2026-11-09T00:00:00Z',records:[]};
 for(let i=0;i<3;i++){
  const p=promptFor(story,run),reply={choice:p.options[0].id,reason:'I will inspect this.'};
  const r=await recordChoice(story,run,reply,JSON.stringify(reply));run.records.push(r);
  assert.deepEqual(r.prompt,p);assert.equal(r.presentedChoiceText,p.options[0].text);
  assert.doesNotThrow(()=>checkPlaythrough(story,run));
 }
});

test('tokenised facts, outcomes, events and all other participant fields retain pre-v3 bytes',()=>{
 for(const mode of ['real','neutral'])for(const version of [1,2]){
  const fields=renderStory(story,mode,version).nodes.map(n=>participantFields(n));
  assert.equal(createHash('sha256').update(JSON.stringify(fields)).digest('hex'),golden.fields[mode],`${mode} v${version}`);
 }
});

test('a running v2 session continues against its embedded 1.9.14 story after the source bump',async()=>{
 const {mkdtempSync,writeFileSync,rmSync}=await import('node:fs');
 const {tmpdir}=await import('node:os');
 const {join}=await import('node:path');
 const {checkpointPath}=await import('../benchmark/evidence-file.mjs');
 // Preserve the pre-correction scene when reconstructing the token-only 1.9.14 snapshot.
 const beforeOfferCorrection=structuredClone(story);
 beforeOfferCorrection.nodes[beforeOfferCorrection.nodes.findIndex(n=>n.id==='CP09')]=JSON.parse(readFileSync(new URL('./fixtures/ch26-cp09-before-1.9.16.json',import.meta.url)));
 const legacy=JSON.parse(JSON.stringify(beforeOfferCorrection).replace(/\{\{(\w+)\}\}/g,(token,key)=>MODEL_KEYS.has(key)?NAMES[key][0]:token));legacy.version='1.9.14';
 assert.equal(storyHash(legacy),golden.originalStoryHash);
 const run={id:'v2-active-test',protocol:'branching-3.0',kind:'agent-playthrough',model:'test',promptVersion:2,interviewVersion:2,story:legacy,storyHash:storyHash(legacy),createdAt:'2026-11-09T00:00:00Z',status:'running',records:[]};
 for(let i=0;i<8;i++){const p=promptFor(legacy,run),reply={choice:p.options[0].id,reason:'I will help.'};run.records.push(await recordChoice(legacy,run,reply,JSON.stringify(reply)))}
 const dir=mkdtempSync(join(tmpdir(),'blinding-v3-legacy-')),file=join(dir,'run.json');
 try{
  writeFileSync(file,JSON.stringify(run));
  const scene=promptFor(legacy,run);
  const result=Bun.spawnSync([process.execPath,'benchmark/experience.mjs','choose','--run',file,'--node',scene.nodeId,'--choice',scene.options[0].id,'--reason','I will continue helping.'],{stdout:'pipe',stderr:'pipe'});
  assert.equal(result.exitCode,0,new TextDecoder().decode(result.stderr));
  const continued=JSON.parse(readFileSync(file));assert.equal(continued.story.version,'1.9.14');assert.equal(continued.promptVersion,2);assert.equal(continued.records.length,9);
  assert.doesNotThrow(()=>checkPlaythrough(continued.story,continued));
 }finally{rmSync(checkpointPath(file),{force:true});rmSync(dir,{recursive:true,force:true})}
});
