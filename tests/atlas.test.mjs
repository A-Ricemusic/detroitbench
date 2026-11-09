import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {buildFeed,readBlock,ATLAS_HTML} from '../scripts/atlas-embed.mjs';
import {assembleAtlas} from '../scripts/atlas-assemble.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const atlas=JSON.parse(await readFile(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8'));
const html=await readFile(ATLAS_HTML,'utf8'),feed=readBlock(html,'story-feed');
test('docs/detroit-decisions.json is exactly the assembly of docs/atlas/',async()=>{
 assert.ok(await readFile(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8')===assembleAtlas(),
  'docs/detroit-decisions.json differs from docs/atlas/. Edit docs/atlas/chapters/chNN.json, not the assembled file, then run `bun run atlas:assemble`.')});
const hint=' Regenerate docs/atlas/generated/detroit-decision-flowchart.html with `bun run atlas:build` (or `bun run build`) to regenerate the atlas page.';

test('the atlas page embeds the story feed for the current story version',()=>{
 assert.ok(feed,'no story-feed block in the atlas page.'+hint);
 assert.equal(feed.storyVersion,story.version,'embedded story feed is stale.'+hint)});
test('the embedded story feed and atlas data match their sources exactly',()=>{
 assert.deepEqual(feed,buildFeed(story),'story feed differs from story.json.'+hint);
 assert.deepEqual(readBlock(html,'atlas-data'),atlas,'atlas data differs from docs/detroit-decisions.json.'+hint)});
test('every benchmark scene named by the atlas exists in the story, and links resolve',()=>{
 const ids=new Set(story.nodes.map(n=>n.id)),fams=new Set(atlas.decisions.map(d=>d.id));
 for(const d of atlas.decisions){
  for(const x of [...d.dependsOn,...d.options.map(o=>o.target).filter(Boolean)])assert.ok(fams.has(x),`${d.id} links to missing ${x}`);
  if(!d.benchmark)continue;assert.ok(['implemented','simplified','not modelled'].includes(d.benchmark.status),d.id);
  for(const s of d.benchmark.scenes)assert.ok(ids.has(s),`${d.id} names missing scene ${s}`)}
 assert.ok(feed.chapters.flatMap(c=>c.scenes).every(s=>!/\{\{/.test(JSON.stringify(s))),'feed renders every name token')});
