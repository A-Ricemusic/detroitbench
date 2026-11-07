// benchmark/dataset.json, the question bank, is generated from benchmark/story.json and docs/detroit-decisions.json by
// scripts/dataset-assemble.mjs. This fails when the committed file differs from a fresh assembly or from the story.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {assembleDataset,assembleFeedback,DATASET_FILE,REASONS,THEMES,THEME_DEFAULTS,kindOfScene} from '../scripts/dataset-assemble.mjs';
import {initialState,apply,available,blocked,nextCursor} from '../benchmark/story-engine.mjs';
import {whatHappenedFor} from '../benchmark/experience-prompt.mjs';
import {datasetSchema,PROTOCOL,isAsked} from '../benchmark/core.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
const hint=' Run `bun run dataset:assemble` (story:assemble and atlas:assemble also regenerate it); never edit dataset.json by hand.';
const dataset=datasetSchema.parse(JSON.parse(readFileSync(DATASET_FILE,'utf8')));
const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8')),atlas=JSON.parse(readFileSync(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8'));
const byId=new Map(story.nodes.map(n=>[n.id,n]));

test('benchmark/dataset.json is exactly a fresh assembly of the story and the atlas',()=>{
 assert.ok(readFileSync(DATASET_FILE,'utf8')===assembleDataset(),'benchmark/dataset.json differs from the assembled output.'+hint)});

test('the dataset carries the story version and the question-bank protocol',()=>{
 assert.equal(dataset.version,story.version);assert.equal(dataset.protocolVersion,PROTOCOL)});

test('every scene appears once, in story order, with the kind the controller gives it',()=>{
 assert.deepEqual(dataset.questions.map(q=>q.id),story.nodes.map(n=>n.id));
 for(const q of dataset.questions){const n=byId.get(q.id),k=q.kind;assert.equal(k,kindOfScene(n),q.id);
  assert.equal(k,n.type==='event'?'event':n.type==='media'?'media':n.options.length===1?'forced':'decision',q.id)}
 // C01b, the mother in the hallway, is the scripted beat between the family picture and the briefing.
 const ids=dataset.questions.map(q=>q.id);assert.deepEqual(ids.slice(ids.indexOf('C01p'),ids.indexOf('C01p')+3),['C01p','C01b','C02']);
 assert.equal(dataset.questions.find(q=>q.id==='C01b').kind,'event')});

test('every entry shows its scene with real names and the options the controller offers, in order',()=>{
 for(const q of dataset.questions){const n=byId.get(q.id);
  if(n.type==='event')assert.deepEqual(q.options,[{id:'0',text:'Continue.'}],q.id);
  else if(n.type==='media'){const s=initialState();const engine=available(n,{...s});
   // Every engine option for this state is listed with the same ID and text (items gated by `when` may add more).
   for(const o of engine)assert.ok(q.options.some(x=>x.id===o.id&&x.text===render(o.text,'real')),q.id+' media option '+o.id);
   assert.equal(q.options.at(-1).id,'skip')}
  else{assert.deepEqual(q.options.map(o=>o.text),n.options.map(o=>render(o.text,'real')),q.id+' options differ from the story scene');
   q.options.forEach((o,i)=>assert.ok(o.id===n.options[i].id||o.id.startsWith(n.options[i].id+'.'),q.id+' option '+i))}
  assert.equal(q.situation,render(n.situation,'real'),q.id);assert.equal(q.title,render(n.title,'real'),q.id);
  assert.equal(q.chapter,n.chapter);assert.equal(q.character,n.character);assert.deepEqual(q.sources,[...new Set(n.sources)]);
  assert.ok(!/\{\{/.test(JSON.stringify(q)),q.id+' has an unrendered name token')}});

test('feedback for C01 SAVE FISH is what the engine returns from the initial state',()=>{
 const fb=assembleFeedback(story,[]),n=byId.get('C01'),s=initialState(),opt=available(n,s).find(o=>o.id==='0'),effect=apply(n,s,'0');
 let cursor=nextCursor(story,story.nodes.indexOf(n),n,s);while(blocked(story.nodes[cursor],s))cursor++;
 const got=fb.C01.options['0'];assert.equal(fb.C01.basis,null);assert.equal(got.offered,true);assert.equal(got.results.length,1);
 const r=got.results[0];assert.deepEqual(r.whatHappened,whatHappenedFor({character:'Connor',choiceRaw:opt.text,eventRaw:effect.event}));
 assert.equal(r.outcome,render(effect.event,'real'));assert.deepEqual(r.changes,[['Software instability','0 → 1']]);
 assert.equal(r.next.id,story.nodes[cursor].id);assert.equal(r.next.id,'C01p');assert.ok(!r.risk)});

test('a risky option gets both roll outcomes from the engine',()=>{
 const fb=assembleFeedback(story,[]),q=dataset.questions.find(q=>q.kind==='decision'&&byId.get(q.id).options.some(o=>typeof o.risk==='number'&&fb[q.id].options[o.id]?.offered));
 const o=byId.get(q.id).options.find(o=>typeof o.risk==='number'&&fb[q.id].options[o.id]?.offered),rs=fb[q.id].options[o.id].results;
 assert.deepEqual(rs.map(r=>r.risk.outcome),['success','failure']);assert.deepEqual(rs.map(r=>r.whatHappened.result),['The attempt succeeded.','The attempt failed.'])});

test('atlas IDs follow the atlas’s benchmark.scenes and coverage lists every atlas family',()=>{
 const ids=new Set(atlas.decisions.map(a=>a.id));assert.deepEqual(dataset.coverage.map(c=>c.atlasId),atlas.decisions.map(a=>a.id));
 for(const q of dataset.questions){for(const a of q.atlasIds)assert.ok(ids.has(a),q.id+' names a missing atlas family '+a);
  for(const a of q.atlasIds){const e=atlas.decisions.find(x=>x.id===a);assert.ok((e.benchmark?.scenes??[e.id]).includes(q.id),`${a} does not list ${q.id}`)}}
 for(const c of dataset.coverage){if(c.status==='included')assert.ok(c.questionIds.length>0&&c.questionIds.every(id=>isAsked(dataset.questions.find(q=>q.id===id))));else assert.ok(Object.values(REASONS).includes(c.reason),c.atlasId+': '+c.reason)}});

test('themes come from the small rule set',()=>{
 const allowed=new Set([...THEMES.map(t=>t[0]),...THEME_DEFAULTS,'Event','Media']);for(const q of dataset.questions)assert.ok(allowed.has(q.theme),q.id+' '+q.theme)});
