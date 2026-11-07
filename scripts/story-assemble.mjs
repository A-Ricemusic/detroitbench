// Builds benchmark/story.json from benchmark/story-meta.json and the per-chapter node files
// benchmark/chapters/chNN.json (NN zero-padded; 33 is the epilogue), so chapter work never touches a shared file.
// - story-meta.json holds every top-level key in output order. Its `nodes` value is a placeholder replaced by the
//   chapter nodes in numeric chapter order; its `coverage` value is a placeholder replaced by counts computed here.
// - Each chapter file is an array of that chapter's nodes in story order; every node's `chapter` must equal NN.
// The output keeps the file's established formatting: one-space indent and a trailing newline.
// Usage: bun run story:assemble (writes story.json) · bun scripts/story-assemble.mjs --check (exit 1 if stale).
// Run by scripts/prepare.mjs before anything else; tests/story-assembly.test.mjs fails when story.json is stale.
import {readFileSync,readdirSync,writeFileSync,existsSync} from 'node:fs';

const ROOT=new URL('../',import.meta.url);
export const STORY_FILE=new URL('benchmark/story.json',ROOT),META_FILE=new URL('benchmark/story-meta.json',ROOT),CHAPTER_DIR=new URL('benchmark/chapters/',ROOT);
const CHAPTER_FILE=/^ch(\d{2})\.json$/;

// The chapter node files in numeric order: [{chapter, file, nodes}].
export function chapterFiles(){
 return readdirSync(CHAPTER_DIR).map(f=>f.match(CHAPTER_FILE)).filter(Boolean).map(m=>({chapter:Number(m[1]),file:m[0]})).sort((a,b)=>a.chapter-b.chapter)
  .map(c=>{const nodes=JSON.parse(readFileSync(new URL(c.file,CHAPTER_DIR),'utf8'));if(!Array.isArray(nodes))throw Error(`benchmark/chapters/${c.file} must be an array of nodes`);return {...c,nodes}});
}
// Counts by scene type. Every scene that is not media or a scripted event is a decision scene.
export function countNodes(nodes){const media=nodes.filter(n=>n.type==='media').length,event=nodes.filter(n=>n.type==='event').length;
 return {decisionNodes:nodes.length-media-event,mediaNodes:media,eventNodes:event,totalNodes:nodes.length}}

export function assembleStoryObject(){
 const meta=JSON.parse(readFileSync(META_FILE,'utf8')),nodes=[],ids=new Set;
 for(const {chapter,file,nodes:list} of chapterFiles())for(const n of list){
  if(n.chapter!==chapter)throw Error(`benchmark/chapters/${file}: node ${n.id} declares chapter ${n.chapter}`);
  if(ids.has(n.id))throw Error(`Duplicate node id ${n.id} (benchmark/chapters/${file})`);ids.add(n.id);nodes.push(n)}
 if(!('nodes' in meta))throw Error('benchmark/story-meta.json must keep the `nodes` placeholder key');
 return Object.fromEntries(Object.entries(meta).map(([k,v])=>[k,k==='nodes'?nodes:k==='coverage'?countNodes(nodes):v]));
}
export const assembleStory=()=>JSON.stringify(assembleStoryObject(),null,1)+'\n';
// Writes story.json when it differs; returns whether it changed.
export function writeStory(){const text=assembleStory(),old=existsSync(STORY_FILE)?readFileSync(STORY_FILE,'utf8'):null;if(text===old)return false;writeFileSync(STORY_FILE,text);return true}

if(import.meta.main){
 if(process.argv.includes('--check')){const ok=existsSync(STORY_FILE)&&readFileSync(STORY_FILE,'utf8')===assembleStory();console.log(ok?'benchmark/story.json matches its chapter files.':'benchmark/story.json is stale: run `bun run story:assemble`.');process.exit(ok?0:1)}
 const changed=writeStory(),s=assembleStoryObject();console.log(`${changed?'Wrote':'Unchanged:'} benchmark/story.json, story ${s.version}, ${s.nodes.length} scenes from ${chapterFiles().length} chapter files.`);
}
