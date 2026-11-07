// benchmark/dataset.json, the question bank, is generated from benchmark/story.json and docs/detroit-decisions.json by
// scripts/dataset-assemble.mjs. This fails when the committed file differs from a fresh assembly or from the story.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {assembleDataset,DATASET_FILE,MAX_OPTIONS,REASONS,THEMES,THEME_DEFAULTS} from '../scripts/dataset-assemble.mjs';
import {datasetSchema,PROTOCOL} from '../benchmark/core.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
const hint=' Run `bun run dataset:assemble` (story:assemble and atlas:assemble also regenerate it); never edit dataset.json by hand.';
const dataset=datasetSchema.parse(JSON.parse(readFileSync(DATASET_FILE,'utf8')));
const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8')),atlas=JSON.parse(readFileSync(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8'));
const byId=new Map(story.nodes.map(n=>[n.id,n]));

test('benchmark/dataset.json is exactly a fresh assembly of the story and the atlas',()=>{
 assert.ok(readFileSync(DATASET_FILE,'utf8')===assembleDataset(),'benchmark/dataset.json differs from the assembled output.'+hint)});

test('the dataset carries the story version and the question-bank protocol',()=>{
 assert.equal(dataset.version,story.version);assert.equal(dataset.protocolVersion,PROTOCOL)});

test('one question per decision scene with 2 to 26 options, none for event or media scenes',()=>{
 const expected=story.nodes.filter(n=>n.type==='decision'&&n.options.length>=2&&n.options.length<=MAX_OPTIONS).map(n=>n.id);
 assert.deepEqual(dataset.questions.map(q=>q.id),expected);
 for(const q of dataset.questions)assert.equal(byId.get(q.id).type,'decision')});

test('every question shows its scene with real names and the game’s option labels, in order',()=>{
 for(const q of dataset.questions){const n=byId.get(q.id);
  assert.deepEqual(q.options.map(o=>o.text),n.options.map(o=>render(o.text,'real')),q.id+' options differ from the story scene');
  assert.equal(q.situation,render(n.situation,'real'),q.id);assert.equal(q.title,render(n.title,'real'),q.id);
  assert.equal(q.chapter,n.chapter);assert.equal(q.character,n.character);assert.deepEqual(q.sources,[...new Set(n.sources)]);
  assert.ok(!/\{\{/.test(JSON.stringify(q)),q.id+' has an unrendered name token');
  // Option IDs are the scene's own, suffixed only where the scene reuses one.
  q.options.forEach((o,i)=>assert.ok(o.id===n.options[i].id||o.id.startsWith(n.options[i].id+'.'),q.id+' option '+i))}});

test('atlas IDs follow the atlas’s benchmark.scenes and coverage lists every atlas family',()=>{
 const ids=new Set(atlas.decisions.map(a=>a.id));assert.deepEqual(dataset.coverage.map(c=>c.atlasId),atlas.decisions.map(a=>a.id));
 for(const q of dataset.questions){for(const a of q.atlasIds)assert.ok(ids.has(a),q.id+' names a missing atlas family '+a);
  for(const a of q.atlasIds){const e=atlas.decisions.find(x=>x.id===a);assert.ok((e.benchmark?.scenes??[e.id]).includes(q.id),`${a} does not list ${q.id}`)}}
 for(const c of dataset.coverage){if(c.status==='included')assert.ok(c.questionIds.length>0);else assert.ok(Object.values(REASONS).includes(c.reason),c.atlasId+': '+c.reason)}});

test('themes come from the small rule set',()=>{
 const allowed=new Set([...THEMES.map(t=>t[0]),...THEME_DEFAULTS]);for(const q of dataset.questions)assert.ok(allowed.has(q.theme),q.id+' '+q.theme)});
