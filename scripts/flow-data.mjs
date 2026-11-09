import {SCALES,level} from '../benchmark/scales.mjs';
// Builds the chapter flows drawn by src/lib/flowchart.js from a run's story snapshot and records.
// Structure comes from the story map and the chapter modules, the path from the records. Nothing is drawn per chapter:
// - a repeatable scene (`repeatWhile`) is a hub: one bracketed group listing every option, each taken one numbered
//   in visit order; the scenes its `interrupt` cuts in (up to the one that `returnTo` it) hang off the hub as a branch;
// - an event scene is a single node, a decision or media scene a stack of options;
// - consecutive scenes sharing a `phase` (or `chart.group`) are framed together;
// - the endings column lists every ending label the chapter can produce, read from the chapter module (exports and
//   `rules` entries named like endings, then string literals assigned to its ending state keys), the scenes' `chart`
//   metadata and option `sets`, and for The Hostage the engine's end() names; the reached one comes from the lane's
//   change to the lane's chapter ending state key (`chNNEnding`, `*Outcome`, ...).
import {readFileSync} from 'node:fs';
import {renderStory,render,realText} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
import {statesOf} from '../benchmark/story-engine.mjs';
import {shortLabel,iconFor} from '../src/lib/flowchart.js';

const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus',Player:'Player choice'};
const COLOR={Connor:'var(--fc-connor)',Kara:'var(--fc-kara)',Markus:'var(--fc-markus)',Player:'var(--fc-ink-3)'};
const LIFE={Connor:'connor',Kara:'kara',Markus:'markus'};
// Who an ending label is about, for chapters with more than one lane.
const LANE_OF={Connor:'Connor',Hank:'Connor',Amanda:'Connor',Gavin:'Connor',Kamski:'Connor',Kara:'Kara',Alice:'Kara',Luther:'Kara',Zlatko:'Kara',Todd:'Kara',Markus:'Markus',North:'Markus',Simon:'Markus',Josh:'Markus',Carl:'Markus',Leo:'Markus'};
const PROTAGONISTS=['Connor','Kara','Markus'];

const readSource=url=>{try{return readFileSync(url,'utf8')}catch{return ''}};
// The Hostage's ending names, read from the engine so a new ending appears without touching this file.
let hostageNames;
export function hostageOutcomeNames(){
 hostageNames??=[...new Set([...readSource(new URL('../benchmark/story-engine.mjs',import.meta.url)).matchAll(/\bend\('([^']+)'/g)].map(m=>m[1]))];
 return hostageNames}

const tidyTitle=t=>String(t).replace(/ · menu Chloe$/,'');
const firstSentence=t=>{const s=String(t??'').trim(),m=s.match(/^.+?[.!?](?=\s|$)/u);return (m?m[0]:s).replace(/[.]$/,'')};
const norm=s=>String(s).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();
// An ending label is a short phrase: letters and at least one space. Codes ("notCaught", "0") are not labels.
const labelLike=v=>typeof v==='string'&&/[A-Za-z]/.test(v)&&/\S\s+\S/.test(v.trim())&&v.length<=90&&!/[.!?]\s+\S/.test(v);

// ---------- Endings catalogue ----------
const HOOKS=new Set(['state','labels','gate','available','consequence','deathEffect','mediaWhen','rules']);
// Export and rules names that hold ending labels: a word end/ending/outcome/card (ENDINGS, KL_END, messageEnding, ENDING_CARDS).
const ENDING_WORDS=new Set(['end','ends','ending','endings','outcome','outcomes','card','cards']);
const endingName=name=>String(name).split(/_|(?<=[a-z0-9])(?=[A-Z])/).some(w=>ENDING_WORDS.has(w.toLowerCase()));
function collect(v,path,out,depth=0){if(depth>4||v==null)return;
 if(typeof v==='string'){if(labelLike(v))out.push({label:v,path});return}
 if(Array.isArray(v)){for(const x of v)collect(x,path,out,depth+1);return}
 if(typeof v==='object')for(const [k,x] of Object.entries(v))collect(x,[...path,k],out,depth+1)}
// State keys that hold a chapter's chart ending: the module's own keys named like endings, plus The Hostage's.
export function endingKeys(chapter){const m=CHAPTER_MODULES.get(chapter),keys=Object.keys(m?.state??{}).filter(k=>/(Ending|Outcome|Chart)$/.test(k));
 if(chapter===1)keys.push('hostageOutcome');return keys}
const catalogue=new Map;
export function chapterEndings(chapter,scenes,version=''){const id=chapter+'@'+version;if(catalogue.has(id))return catalogue.get(id);
 const m=CHAPTER_MODULES.get(chapter),found=[],keys=endingKeys(chapter);
 if(m){for(const [name,v] of Object.entries(m))if(!HOOKS.has(name)&&typeof v!=='function'&&endingName(name))collect(v,[name],found);
  if(m.rules&&typeof m.rules==='object')for(const [k,v] of Object.entries(m.rules))if(endingName(k))collect(v,[k],found);
  // String literals the module assigns to (or compares with) its ending keys: `s.ch06Outcome='CRIME UNSOLVED'`.
  const src=readSource(new URL(`../benchmark/chapters/ch${String(chapter).padStart(2,'0')}.mjs`,import.meta.url));
  for(const k of keys)for(const x of src.matchAll(new RegExp(`\\b${k}\\s*(?:={1,3})\\s*(['"\`])([^'"\`$]+)\\1`,'g')))if(labelLike(x[2]))found.push({label:x[2],path:[k]})}
 // Chapter parts may record an ending through a shared helper rather than assigning a state key directly.
 if(m){const src=readSource(new URL(`../benchmark/chapters/ch${String(chapter).padStart(2,'0')}.mjs`,import.meta.url));
  for(const x of src.matchAll(/\bX\.ending\(s,'(Connor|Kara|Markus)','([^']+)'/g))if(labelLike(x[2]))found.push({label:x[2],path:[x[1]]});
  for(const x of src.matchAll(/\bmrEnd\(s,'([^']+)'/g))if(labelLike(x[1]))found.push({label:x[1],path:['Markus']});
 }

 for(const n of scenes){const c=n.chart;if(c&&typeof c==='object')for(const k of ['ending','endings'])if(c[k])collect(c[k],[n.character],found);
  for(const o of n.options??[])for(const [k,v] of Object.entries(o.sets??{}))if(keys.includes(k)&&labelLike(v))found.push({label:v,path:[k,n.character]})}
 if(chapter===1)for(const x of hostageOutcomeNames())found.push({label:x,path:['hostageOutcome']});
 const seen=new Map;for(const f of found){const label=render(f.label,'real'),k=norm(label);if(!seen.has(k))seen.set(k,{...f,label})}
 const list=[...seen.values()];catalogue.set(id,list);return list}
// Which lane an ending belongs to: a character named in its path, else the protagonist (or companion) its label names,
// else the lane most of its sibling entries belong to.
function assignLanes(list,lanes){if(lanes.length<=1)return list.map(e=>({...e,lane:lanes[0]}));
 const named=e=>{for(const p of e.path)for(const c of lanes)if(new RegExp(`(^|[a-z0-9_])${c}([A-Z0-9_]|$)`).test(p))return c;
  const words=e.label.match(/[A-Za-z]+/g)??[],pick=set=>{const hit=[...new Set(words.map(w=>w[0].toUpperCase()+w.slice(1).toLowerCase()).filter(w=>set(w)))];return hit.length===1?hit[0]:null};
  const p=pick(w=>PROTAGONISTS.includes(w)&&lanes.includes(w));if(p)return p;const c=pick(w=>lanes.includes(LANE_OF[w]));return c?LANE_OF[c]:null};
 const out=list.map(e=>({...e,lane:named(e)}));
 for(const e of out)if(!e.lane){const sib=out.filter(x=>x.lane&&x.path.slice(0,-1).join('.')===e.path.slice(0,-1).join('.')),count={};for(const s of sib)count[s.lane]=(count[s.lane]??0)+1;
  e.lane=Object.entries(count).sort((a,b)=>b[1]-a[1])[0]?.[0]??lanes[0]}
 return out}
// The ending a lane reached: its last ending-key change, including changes made by another character, mapped through the catalogue
// (a code such as "toddKillsAlice" maps to the label stored under that key).
function reachedEnding(chapter,records,list,lane){const keys=endingKeys(chapter).filter(k=>{const owners=PROTAGONISTS.filter(c=>k.includes(c));return !owners.length||owners.includes(lane)});let hit=null;
 for(const r of records)for(const k of keys){const c=(r.changes??[]).find(c=>c.key===k);if(c&&!c.added&&typeof c.after==='string'&&c.after)hit={value:c.after,record:r}}
 if(!hit)return null;const byCode=list.find(e=>e.path.at(-1)===hit.value),label=byCode?byCode.label:render(hit.value,'real');
 return {label,record:hit.record}}

// ---------- Header stats ----------
// Stat levels the game shows in a chapter header, at the end of the chapter (labels from the prompt's LEVELS scales).
function chapterStats(chapter,characters,s,changed){const out=[];if(!s)return out;
 out.push({label:'Public opinion',value:level('publicSupport',s.publicSupport,s)});
 if(chapter===1&&s.hostageTrustFinal!=null)out.push({label:'Probability of success',value:s.hostageTrustFinal+'%'});
 if(chapter===1&&s.hostageApproach)out.push({label:'Approach',value:s.hostageApproach});
 // Each gauge on its own ladder (benchmark/scales.mjs); the state supplies North's Lover.
 const rel=(gauge,alive)=>{const {who,key}=SCALES[gauge];if(alive===false)out.push({label:who,value:'Died'});else if(changed.has(key)||(gauge==='north'&&s.northLover))out.push({label:who,value:level(gauge,s[key],s)})};
 if(characters.includes('Connor')){out.push({label:'Software instability',value:level('instability',s.instability,s)});
  if(chapter>=6)rel('hank',s.hank);if(chapter>=12&&!s.deviant)rel('amanda',true)}
 if(characters.includes('Kara')){rel('alice',s.alice);if(chapter>=18)rel('luther',s.luther)}
 if(characters.includes('Markus')){rel('jericho',true);
  if(chapter>=19){rel('north',s.north);rel('simon',s.simon);rel('josh',s.josh)}}
 return out}


// ---------- Scenes ----------
function sceneOptions(n,rs){const offered=rs.length?new Set(rs.flatMap(x=>x.prompt.options.map(o=>o.id))):null;
 if(n.type==='event')return [];
 if(n.type==='media'){const items=(n.media??[]).map((m,i)=>({id:String(i),text:(m.kind==='tv'?'Watch ':'Read ')+m.title+'.'}));
  if(items.length>1)items.push({id:'all',text:'Take the time to go through all of it.'});items.push({id:'skip',text:'Move on without looking.'});
  return (offered?items.filter(o=>offered.has(o.id)):items).map(o=>({...o,label:o.id==='all'?'Read all of it':o.id==='skip'?'Move on':o.text.replace(/[.]$/,'')}))}
 return n.options.map(o=>({id:o.id,text:o.text,label:shortLabel(o.text),locked:!!offered&&!offered.has(o.id),...(typeof o.risk==='number'?{riskLevel:o.risk}:{})}))}
const kindOf=n=>n.repeatWhile?'hub':n.type==='event'?'event':n.type==='media'?'media':'prompt';
// The scenes a hub's interrupt cuts in: from the interrupt scene, in story order, to the last one that returns to the hub.
function cutIns(scenes){const of=new Map;
 for(const n of scenes){if(!n.repeatWhile)continue;const i=scenes.findIndex(x=>x.id===n.interrupt?.node);
  const back=scenes.map((x,k)=>x.returnTo===n.id?k:-1).filter(k=>k>=0);
  if(i>=0){const last=Math.max(i,...back.filter(k=>k>=i));for(let k=i;k<=last;k++)if(scenes[k].character===n.character&&!scenes[k].repeatWhile)of.set(scenes[k].id,n.id)}
  for(const k of back)of.set(scenes[k].id,n.id)}
 return of}

export function runFlows(run,{endings={}}={}){
 const story=renderStory(run.story,'real'),nodes=story.nodes,records=run.records;
 // The states before and after a record, rebuilt from the records' changes when first needed.
 const at=new Map(records.map((r,i)=>[r,i]));let states;const stateOf=(r,after)=>r?(states??=statesOf(run))[at.get(r)+(after?1:0)]:undefined;
 // Record keys match the report's detail sheet: first visit is the scene ID, later visits `<scene>-<step>`.
 const byNode=new Map;for(const r of records){if(!byNode.has(r.nodeId))byNode.set(r.nodeId,[]);byNode.get(r.nodeId).push(r)}
 const keyOf=r=>byNode.get(r.nodeId)[0]===r?r.nodeId:r.nodeId+'-'+r.step;
 const skipped=new Map((run.skipped??[]).map(s=>[s.id,s.reason]));
 const lastOfCharacter=new Map;for(const r of records)lastOfCharacter.set(r.character,r);
 const changedBy=new Map;{const seen=new Set;for(const r of records){for(const c of r.changes??[])seen.add(c.key);changedBy.set(r.step,new Set(seen))}}
 const chapters=[...new Set(nodes.map(n=>n.chapter))].sort((a,b)=>a-b);
 return chapters.map(chapter=>{
  const scenes=nodes.filter(n=>n.chapter===chapter),chRecords=records.filter(r=>r.chapter===chapter),last=chRecords.at(-1);
  const characters=[...new Set(scenes.map(n=>n.character))],cut=cutIns(scenes);
  const catalogueLanes=assignLanes(chapterEndings(chapter,run.story.nodes.filter(n=>n.chapter===chapter),run.story.version),characters);
  const lanes=characters.map(character=>{
   const laneScenes=scenes.filter(n=>n.character===character),laneRecords=chRecords.filter(r=>r.character===character);
   const columns=laneScenes.map(n=>{const rs=byNode.get(n.id)??[],r=rs[0],visited=rs.length>0,kind=kindOf(n);
    const options=sceneOptions(n,rs).map(o=>{const hits=rs.filter(x=>x.choice===o.id),hit=hits[0];
     const orders=kind==='hub'?hits.map(h=>rs.indexOf(h)+1):[];
     return {...o,taken:hits.length>0,order:orders[0]??null,orders,key:hit?keyOf(hit):r?keyOf(r):n.id,
      ...(hit?{risk:hit.risk?{label:hit.risk.label,outcome:hit.risk.outcome}:null,reason:realText(hit.reason),outcome:hit.event&&hit.event!==hit.choiceText?hit.event:null,step:hit.step}:{})}});
    const hub=cut.get(n.id)??null;
    // A cut-in is placed after the hub action that triggered it.
    const after=hub&&r?records.filter(x=>x.nodeId===hub&&x.step<r.step).length:null;
    return {id:n.id,title:n.title,type:n.type,kind,phase:n.chart?.group??n.phase??null,cutinOf:hub,cutinAfter:after,visits:rs.length,
     ...(n.chart?.label?{chartLabel:render(n.chart.label,'real')}:{}),
     visited,key:r?keyOf(r):n.id,skip:visited?null:(skipped.get(n.id)??'Not on this path'),
     ...(n.type==='event'&&r?{outcome:r.event??null,reason:realText(r.reason),step:r.step}:{}),options}});
   // Endings: every label the chapter can produce for this lane, the reached one from the lane's ending-key change.
   const end=laneRecords.at(-1),before=stateOf(laneRecords[0],false),after=stateOf(chRecords.at(-1),true);
   const died=!!end&&!!LIFE[character]&&(after?.[LIFE[character]]===false&&before?.[LIFE[character]]!==false||(character==='Connor'&&(after?.connorDeaths??0)>(before?.connorDeaths??0)));
   const list=catalogueLanes.filter(e=>e.lane===character),reached=reachedEnding(chapter,chRecords,list,character);let ends=[];
   if(list.length||reached){const names=list.map(e=>e.label);if(reached&&!names.some(x=>norm(x)===norm(reached.label)))names.push(reached.label);
    ends=names.map(name=>{const hit=!!reached&&norm(name)===norm(reached.label),icon=iconFor(name);
     return {label:name,text:hit?`${name}. ${reached.record.event??''}`.trim():name,taken:hit,icon:hit&&died?'death':icon,key:hit?keyOf(reached.record):null}})}
   else if(end){// No chart ending known: the character's final ending in their last chapter, otherwise the last outcome.
    const final=lastOfCharacter.get(character)===end&&endings[character]&&run.status==='completed'?endings[character]:null,text=final??(end.event||end.choiceText||''),label=firstSentence(text);
    ends=[{label,text,taken:true,icon:died?'death':iconFor(label),key:keyOf(end)}]}
   return {character,label:WHO[character]??character,color:COLOR[character],played:laneRecords.length>0,columns,endings:ends}});
  // Completion: scenes visited over the scenes this run could have played (the lanes it entered; all of them if none).
  const visited=new Set(chRecords.map(r=>r.nodeId)).size,played=lanes.filter(l=>l.played);
  const total=(played.length?played:lanes).reduce((s,l)=>s+l.columns.length,0);
  return {chapter,title:tidyTitle(scenes[0].chapterTitle),characters,visited,total,touched:chRecords.length>0,
   stats:chapterStats(chapter,characters,stateOf(last,true),last?changedBy.get(last.step):new Set),lanes}})}
