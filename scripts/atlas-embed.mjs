// Embeds the decision atlas and the generated "What the model is fed" layer into the standalone
// atlas page (docs/atlas/generated/detroit-decision-flowchart.html), so the page can never drift from its sources:
// - <script id="atlas-data">: docs/detroit-decisions.json, the hand-researched decision families.
// - <script id="story-feed">: every scene of benchmark/story.json in story order, with real names.
// Run by scripts/prepare.mjs (so `bun run build` and `bun run share` refresh it) and by `bun run atlas:build`.
// It first rebuilds docs/detroit-decisions.json from docs/atlas/ (scripts/atlas-assemble.mjs).
import {readFile,writeFile} from 'node:fs/promises';
import {render,riskLabel,NAMES,nameKey} from '../benchmark/experience-prompt.mjs';
import {writeAtlas} from './atlas-assemble.mjs';

const ROOT=new URL('../',import.meta.url);
export const ATLAS_HTML=new URL('docs/atlas/generated/detroit-decision-flowchart.html',ROOT);
const STORY=new URL('benchmark/story.json',ROOT),ATLAS=new URL('docs/detroit-decisions.json',ROOT);

// Fields the feed handles explicitly; anything else on a scene is kept under `extra` so nothing is hidden.
const KNOWN=new Set(['id','chapter','chapterTitle','character','title','type','phase','situation','situationWhen','options','outcomes','facts','media','adaptationNote','sources','repeatWhile','interrupt','returnTo','when','whenNot','excludeChosenAt']);
const tokens=v=>[...JSON.stringify(v).matchAll(/\{\{(\w+)\}\}/g)].map(m=>m[1]);

export function buildFeed(story){
 const real=v=>render(v,'real'),chapters=new Map;
 story.nodes.forEach((n,i)=>{
  const subjectId='S'+String(i+1).padStart(3,'0');
  const options=n.type==='event'?[{id:'0',text:'Continue.',generated:true}]:n.options.map(o=>({id:o.id,text:real(o.text),
   ...(typeof o.risk==='number'?{risk:o.risk,riskLabel:riskLabel(o.risk)}:{}),
   ...(typeof o.trust==='number'?{trust:o.trust}:{}),...(typeof o.cold==='number'?{cold:o.cold}:{}),...(o.requires?{requires:o.requires}:{}),...(o.act?{act:o.act}:{}),...(o.clue?{clue:o.clue}:{}),...(o.effect?{effect:o.effect}:{}),...(o.sets?{sets:o.sets}:{}),
   ...(o.fact?{fact:real(o.fact)}:{}),...(o.outcome?{outcome:real(o.outcome)}:{})}));
  const extra=Object.fromEntries(Object.entries(n).filter(([k])=>!KNOWN.has(k)));
  const scene={id:n.id,order:i+1,subjectId,
   idNote:n.repeatWhile?`The model sees the opaque ID ${subjectId}, the same on every visit.`:`The model sees the opaque ID ${subjectId}, not ${n.id}.`,
   type:n.type,...(n.phase?{phase:n.phase}:{}),character:n.character,title:real(n.title),situation:real(n.situation),
   ...(n.situationWhen?{situationWhen:n.situationWhen.map(w=>({requires:w.requires,text:real(w.text)}))}:{}),
   options,
   ...(n.outcomes?{outcomes:Object.fromEntries(Object.entries(n.outcomes).map(([k,v])=>[k,real(v)]))}:{}),
   ...(n.facts?{facts:n.facts.map(real)}:{}),
   ...(n.media?{media:n.media.map(m=>({kind:m.kind,title:real(m.title),facts:m.facts.map(real),...(m.when?{when:m.when}:{}),...(m.effect?{effect:m.effect}:{})}))}:{}),
   adaptationNote:real(n.adaptationNote??''),sources:n.sources??[],
   ...(n.repeatWhile?{repeatWhile:n.repeatWhile}:{}),...(n.interrupt?{interrupt:n.interrupt}:{}),...(n.returnTo?{returnTo:n.returnTo}:{}),
   ...(n.when?{when:n.when,whenNot:n.whenNot??null}:{}),...(n.excludeChosenAt?{excludeChosenAt:n.excludeChosenAt}:{}),
   ...(Object.keys(extra).length?{extra}:{})};
  if(!chapters.has(n.chapter))chapters.set(n.chapter,{id:n.chapter,title:n.chapterTitle,scenes:[],names:new Set});
  const c=chapters.get(n.chapter);c.scenes.push(scene);for(const t of tokens(n))c.names.add(t);
 });
 return {storyId:story.id,storyVersion:story.version,protocolVersion:story.protocolVersion,scenes:story.nodes.length,
  chapters:[...chapters.values()].sort((a,b)=>a.id-b.id).map(c=>({id:c.id,title:c.title,
   // Real name -> the neutral substitute the model actually reads.
   names:[...new Set([...c.names].map(nameKey).filter(Boolean))].map(k=>NAMES[k]),scenes:c.scenes}))};
}

// JSON inside <script> must not contain "</script>" or "<!--"; escaping "<" keeps it inert and still valid JSON.
const inert=v=>JSON.stringify(v,null,1).replace(/</g,'\\u003c');
function setBlock(html,id,json){
 const re=new RegExp(`(<script id="${id}" type="application/json">)[\\s\\S]*?(</script>)`);
 if(re.test(html))return html.replace(re,(m,open,close)=>open+json+close);
 // First run: insert the block right after the atlas data.
 return html.replace(/(<script id="atlas-data" type="application\/json">[\s\S]*?<\/script>)/,(m)=>`${m}\n<script id="${id}" type="application/json">${json}</script>`);
}
export const readBlock=(html,id)=>{const m=html.match(new RegExp(`<script id="${id}" type="application/json">([\\s\\S]*?)</script>`));return m?JSON.parse(m[1]):null};

export async function embedAtlas(){
 writeAtlas();
 const story=JSON.parse(await readFile(STORY,'utf8')),atlas=JSON.parse(await readFile(ATLAS,'utf8'));
 let html=await readFile(ATLAS_HTML,'utf8');
 html=setBlock(html,'atlas-data',JSON.stringify(atlas,null,2).replace(/</g,'\\u003c'));html=setBlock(html,'story-feed',inert(buildFeed(story)));
 await writeFile(ATLAS_HTML,html);
 return {storyVersion:story.version,scenes:story.nodes.length,decisions:atlas.decisions.length};
}

if(import.meta.main){const r=await embedAtlas();console.log(`Embedded ${r.decisions} atlas decisions and ${r.scenes} story ${r.storyVersion} scenes into the atlas page.`)}
