// benchmark/story.json is generated: edit benchmark/chapters/chNN.json (or benchmark/story-meta.json) and run
// `bun run story:assemble`. This fails when story.json differs from the assembled output, e.g. after a hand edit.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {assembleStory,assembleStoryObject,chapterFiles,countNodes,STORY_FILE,META_FILE} from '../scripts/story-assemble.mjs';
const hint=' Edit benchmark/chapters/chNN.json, not story.json, then run `bun run story:assemble`.';

test('benchmark/story.json is exactly the assembly of story-meta.json and the chapter files',()=>{
 assert.ok(readFileSync(STORY_FILE,'utf8')===assembleStory(),'benchmark/story.json differs from the assembled output.'+hint)});
test('chapter files hold their own chapter in story order and the meta keeps its placeholders',()=>{
 const files=chapterFiles(),story=assembleStoryObject(),meta=JSON.parse(readFileSync(META_FILE,'utf8'));
 assert.deepEqual(files.map(f=>f.chapter),[...files.map(f=>f.chapter)].sort((a,b)=>a-b));
 for(const f of files)for(const n of f.nodes)assert.equal(n.chapter,f.chapter,`${n.id} is in ch${f.chapter} but declares chapter ${n.chapter}`);
 assert.equal(typeof meta.nodes,'string','story-meta.json keeps the nodes placeholder');assert.equal(typeof meta.coverage,'string','story-meta.json keeps the coverage placeholder');
 assert.deepEqual(story.coverage,countNodes(story.nodes));assert.equal(Object.keys(story).at(-1),'nodes')});
