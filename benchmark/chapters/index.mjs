// Discovers the per-chapter engine modules benchmark/chapters/chNN.mjs (NN zero-padded; 33 is the epilogue) at load
// and exports them as CHAPTER_MODULES: chapter number -> module namespace, in numeric order.
// The story engine (benchmark/story-engine.mjs) and the run report (scripts/run-report.mjs) consult them through
// small hooks; see benchmark/chapters/README.md for the contract. A chapter module must not import story-engine.mjs
// (that import would wait on this file's top-level await); everything it needs arrives as hook arguments.
import {readdirSync} from 'node:fs';

const DIR=new URL('./',import.meta.url),FILE=/^ch(\d{2})\.mjs$/;
const files=readdirSync(DIR).map(f=>f.match(FILE)).filter(Boolean).sort((a,b)=>Number(a[1])-Number(b[1]));
export const CHAPTER_MODULES=new Map;
for(const [file,nn] of files)CHAPTER_MODULES.set(Number(nn),await import(new URL(file,DIR).href));

// The module for a chapter number, or undefined.
export const chapterModule=chapter=>CHAPTER_MODULES.get(chapter);
// Every module's `state`, merged in chapter order. A key may be declared by one chapter only.
export function chapterState(){const out={},owner={};
 for(const [ch,m] of CHAPTER_MODULES)for(const [k,v] of Object.entries(m.state??{})){if(k in owner)throw Error(`State key ${k} is declared by chapters ${owner[k]} and ${ch}`);owner[k]=ch;out[k]=structuredClone(v)}
 return out}
// Every module's `labels` (state key -> report label), merged in chapter order.
export const chapterLabels=()=>Object.assign({},...[...CHAPTER_MODULES.values()].map(m=>m.labels??{}));
