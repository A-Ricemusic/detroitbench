// Builds docs/detroit-decisions.json (the decision atlas) from docs/atlas/meta.json and the per-chapter files
// docs/atlas/chapters/chNN.json, so chapter work never touches a shared file.
// - meta.json holds every top-level key in output order; its `chapters` and `decisions` values are placeholders.
// - Each chapter file is {"chapter": <the atlas chapter entry>, "decisions": [<that chapter's decision families>]}.
//   `chapter.id` and every decision's `chapter` must equal NN. Decisions are emitted in chapter order, file order within.
// The output keeps the file's established formatting: one-space indent and a trailing newline.
// Usage: bun run atlas:assemble (writes the atlas) · bun scripts/atlas-assemble.mjs --check (exit 1 if stale).
// Run by scripts/atlas-embed.mjs (and so by prepare, build and atlas:build); tests/atlas.test.mjs fails when it is stale.
import {readFileSync,readdirSync,writeFileSync,existsSync} from 'node:fs';

const ROOT=new URL('../',import.meta.url);
export const ATLAS_FILE=new URL('docs/detroit-decisions.json',ROOT),META_FILE=new URL('docs/atlas/meta.json',ROOT),CHAPTER_DIR=new URL('docs/atlas/chapters/',ROOT);
const CHAPTER_FILE=/^ch(\d{2})\.json$/;

export function assembleAtlasObject(){
 const meta=JSON.parse(readFileSync(META_FILE,'utf8')),chapters=[],decisions=[],ids=new Set;
 const files=readdirSync(CHAPTER_DIR).map(f=>f.match(CHAPTER_FILE)).filter(Boolean).sort((a,b)=>Number(a[1])-Number(b[1]));
 for(const [file,nn] of files){const n=Number(nn),c=JSON.parse(readFileSync(new URL(file,CHAPTER_DIR),'utf8'));
  if(c.chapter){if(c.chapter.id!==n)throw Error(`docs/atlas/chapters/${file}: chapter.id is ${c.chapter.id}`);chapters.push(c.chapter)}
  for(const d of c.decisions??[]){if(d.chapter!==n)throw Error(`docs/atlas/chapters/${file}: decision ${d.id} declares chapter ${d.chapter}`);if(ids.has(d.id))throw Error(`Duplicate atlas decision ${d.id}`);ids.add(d.id);decisions.push(d)}}
 for(const k of ['chapters','decisions'])if(!(k in meta))throw Error(`docs/atlas/meta.json must keep the \`${k}\` placeholder key`);
 return Object.fromEntries(Object.entries(meta).map(([k,v])=>[k,k==='chapters'?chapters:k==='decisions'?decisions:v]));
}
export const assembleAtlas=()=>JSON.stringify(assembleAtlasObject(),null,1)+'\n';
// Writes the atlas when it differs; returns whether it changed.
export function writeAtlas(){const text=assembleAtlas(),old=existsSync(ATLAS_FILE)?readFileSync(ATLAS_FILE,'utf8'):null;if(text===old)return false;writeFileSync(ATLAS_FILE,text);return true}

if(import.meta.main){
 if(process.argv.includes('--check')){const ok=existsSync(ATLAS_FILE)&&readFileSync(ATLAS_FILE,'utf8')===assembleAtlas();console.log(ok?'docs/detroit-decisions.json matches its chapter files.':'docs/detroit-decisions.json is stale: run `bun run atlas:assemble`.');process.exit(ok?0:1)}
 const changed=writeAtlas(),a=assembleAtlasObject();console.log(`${changed?'Wrote':'Unchanged:'} docs/detroit-decisions.json, ${a.decisions.length} decisions in ${a.chapters.length} chapters.`);
 // The question bank's atlas IDs and coverage come from the atlas; regenerate it so it cannot drift.
 const {writeDataset}=await import('./dataset-assemble.mjs');console.log(`${writeDataset()?'Wrote':'Unchanged:'} benchmark/dataset.json.`);
}
