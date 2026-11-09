// One state change as readers see it, in prose: shared by the in-app run report (scripts/report-data.mjs) and the
// question bank's feedback (scripts/dataset-assemble.mjs). Never prints JSON. Returns one entry per change:
//   {label, text}   a single value: "Tense → Neutral (+2)", "— → Yes", "Done on the first floor"
//   {label, lines}  an object or list that changed: one line per changed key, "Second demand: Justice",
//                   "Gun case: added", "Checks: 2 (was 1)"
//   {label, facts}  knowledge the character gained, one fact per item (`knowledge` changes)
// `unlabeled: key` marks an entry whose label is only the key in title case, so the site can log it in development.
// Labels come from CHANGE_LABELS and the chapter modules' `labels`; sub-keys and code values from the per-key word
// tables below and the chapter modules' `words` ({stateKey: {subKeyOrValue: 'Words'}}), else camelCase split into words.
import {SCALES,level,gaugeForKey} from '../benchmark/scales.mjs';
import {chapterWords} from '../benchmark/chapters/index.mjs';
import {HIDDEN_CHANGE_KEYS,CLUE_WORDS,PLAZA_WORDS,HOME_WORDS,PHASE_WORDS,LIFE_KEYS} from './run-report.mjs';

const lowerWords=w=>Object.fromEntries(Object.entries(w).map(([k,v])=>[k,v[0].toUpperCase()+v.slice(1)]));
const BUILT_IN_WORDS={hostageClues:lowerWords(CLUE_WORDS),plaza:lowerWords(PLAZA_WORDS),downstairs:lowerWords(HOME_WORDS),upstairs:lowerWords(HOME_WORDS),hostagePhase:PHASE_WORDS};
// Bookkeeping sub-keys several chapter hubs share.
const COMMON={last:'Last action',done:'Done',left:'Left',seen:'Seen',asked:'Asked',open:'Open'};
const SEP=' › ';
const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const signed=d=>d>0?'+'+d:d<0?'−'+Math.abs(d):'±0';
// "endOfSlavery" → "End of slavery"; "ch06Clock" → "Ch06 clock". Text that is not a code (sentences, button labels in
// capitals, scene IDs) is kept as written.
const isCode=s=>/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/.test(s);
const splitWords=s=>s.replace(/([a-z0-9])([A-Z])/g,'$1 $2').replace(/([0-9])([A-Za-z])/g,'$1 $2');
export const sentenceCase=s=>{const w=splitWords(String(s)).toLowerCase();return w.charAt(0).toUpperCase()+w.slice(1)};
export const titleCase=s=>splitWords(String(s)).split(/[\s_]+/).filter(Boolean).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');

export function makeFormatter(LABELS,scalesVersion){
 const WORDS={...BUILT_IN_WORDS,...chapterWords()};
 const keyWord=(key,k)=>WORDS[key]?.[k]??COMMON[k]??(isCode(k)?sentenceCase(k):String(k));
 const val=(key,v)=>{if(v===null||v===undefined)return '—';if(typeof v==='boolean')return v?'yes':'no';if(typeof v==='number')return String(v);
  if(Array.isArray(v))return v.length?v.map(x=>val(key,x)).join(', '):'none';if(plain(v))return Object.keys(v).length?Object.entries(v).map(([k,x])=>keyWord(key,k)+(x===true?'':' '+val(key,x))).join(', '):'none';
  const s=String(v);return WORDS[key]?.[s]??(isCode(s)?sentenceCase(s):s)};
 // A word for a scalar top-level value, keeping the report's established forms.
 const word=(k,v)=>{if(v===null||v===undefined)return '—';if(k==='trust'||k==='hostageTrustFinal')return v+'%';if(k==='hostageWaited')return '−'+v+'%';if(k==='hostageApproach')return v+' approach';
  if(typeof v==='boolean')return LIFE_KEYS[k]?(v?'Alive':'Died'):(v?'Yes':'No');const s=val(k,v);return s.charAt(0).toUpperCase()+s.slice(1)};
 // Changed keys of two plain objects (nested objects recurse with "A › B"), one line each.
 function diff(key,a,b,prefix=''){const out=[],A=plain(a)?a:{},B=plain(b)?b:{};
  for(const k of [...new Set([...Object.keys(A),...Object.keys(B)])]){const x=A[k],y=B[k];if(JSON.stringify(x)===JSON.stringify(y))continue;const name=prefix+keyWord(key,k);
   if(plain(x)||plain(y)){out.push(...diff(key,x,y,name+SEP));continue}
   if(Array.isArray(x)||Array.isArray(y)){const xs=(x??[]).map(String),ys=(y??[]).map(String),add=(y??[]).filter(v=>!xs.includes(String(v))),rem=(x??[]).filter(v=>!ys.includes(String(v)));
    const parts=[];if(add.length)parts.push('added '+add.map(v=>val(key,v)).join(', '));if(rem.length)parts.push('removed '+rem.map(v=>val(key,v)).join(', '));out.push(name+': '+(parts.join('; ')||'reordered'));continue}
   if(y===undefined){out.push(name+': removed');continue}
   if(x===undefined||x===null&&y!==null){out.push(name+': '+(y===true?'added':y===null?'—':val(key,y)));continue}
   if(y===null){out.push(name+': cleared (was '+val(key,x)+')');continue}
   out.push(name+': '+val(key,y)+' (was '+val(key,x)+')')}
  return out}
 const labelFor=c=>{const l=LABELS[c.key];if(l)return {label:LIFE_KEYS[c.key]&&typeof c.after==='boolean'?l.replace(/ alive$/,''):l};return {label:titleCase(c.key),unlabeled:c.key}};
 return function formatChange(c){
  if(HIDDEN_CHANGE_KEYS.includes(c.key))return [];
  if(c.key==='knowledge'&&c.added)return Object.entries(c.added).filter(([,f])=>f?.length).map(([who,facts])=>({label:who+' learns',facts:facts.map(String)}));
  const {label,unlabeled}=labelFor(c),tag=unlabeled?{unlabeled}:{};
  const g=gaugeForKey[c.key];
  if(g&&typeof c.after==='number'){const b=typeof c.before==='number'?c.before:SCALES[g].startValue,lb=level(g,b,undefined,scalesVersion),la=level(g,c.after,undefined,scalesVersion),d=c.after-b;
   return [{label:SCALES[g].who,text:(lb===la?la:lb+' → '+la)+' ('+signed(d)+')',...tag}]}
  if(c.added){const lines=Object.entries(c.added).flatMap(([k,list])=>(list??[]).map(v=>keyWord(c.key,k)+': added '+val(c.key,v)));return [{label,lines,...tag}]}
  if(plain(c.before)||plain(c.after)){const lines=diff(c.key,c.before,c.after);return lines.length?[{label,lines,...tag}]:[]}
  if(Array.isArray(c.before)||Array.isArray(c.after)){const xs=(c.before??[]).map(String),ys=(c.after??[]).map(String),lines=[...(c.after??[]).filter(v=>!xs.includes(String(v))).map(v=>'Added '+val(c.key,v)),...(c.before??[]).filter(v=>!ys.includes(String(v))).map(v=>'Removed '+val(c.key,v))];
   return [{label,lines:lines.length?lines:['Reordered'],...tag}]}
  return [{label,text:word(c.key,c.before)+' → '+word(c.key,c.after),...tag}]}}
