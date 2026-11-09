// Read-only participant-text audit. Run: bun scripts/name-leak-scan.mjs
import {readFileSync} from 'node:fs';
import {NAMES,render,renderStory,EXPERIENCE_PREFACE_TEMPLATE,INTERVIEW_QUESTIONS,INTERVIEW_INSTRUCTION} from '../benchmark/experience-prompt.mjs';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const whole=s=>new RegExp('(?<![\\p{L}\\p{N}_])'+escape(s)+'(?![\\p{L}\\p{N}_])','giu');
const fields=new Set(['title','situation','text','fact','outcome','facts','outcomes','whatHappened','event']);
export function participantFields(value,path=''){
 const out=[];
 for(const [key,v] of Object.entries(value??{})){
  if(key==='adaptationNote'||/source/i.test(key))continue;
  const p=path?`${path}.${key}`:key;
  if(typeof v==='string'&&(fields.has(key)||/^(facts|outcomes|whatHappened|event)(\.|\[)/.test(path)))out.push([p,v]);
  else if(v&&typeof v==='object'){
   if(Array.isArray(v))v.forEach((x,i)=>{if(typeof x==='string'&&fields.has(key))out.push([`${p}[${i}]`,x]);else if(x&&typeof x==='object')out.push(...participantFields(x,`${p}[${i}]`))});
   else out.push(...participantFields(v,p));
  }
 }
 return out;
}
export function scanNameLeaks(story){
 const neutral=renderStory(story,'neutral'),hits=[];
 const forms=[...new Set(Object.values(NAMES).map(([real])=>real))];
 const scan=(chapter,scene,field,text)=>{for(const real of forms)for(const m of text.matchAll(whole(real)))hits.push({chapter,scene,field,real,match:m[0],index:m.index,text})};
 for(const node of neutral.nodes){
  const original=new Map(participantFields(story.nodes.find(n=>n.id===node.id)));
  for(const [field,value] of participantFields(node)){
   // Track token provenance so valid substitutes (Josh → Jonah, Chen → Ward)
   // do not become false leaks merely because another real form has that spelling.
   const text=render(value,'neutral'), raw=original.get(field)??value;
   const literals=render(raw.replace(/\{\{\w+\}\}/g,'<name-token>'),'neutral');
   const start=hits.length;scan(node.chapter,node.id,field,text);
   for(const hit of hits.slice(start)){
    if(!whole(hit.real).test(literals))hit.expected='rendered name token';
    else if(hit.real==='North'&&/\bnorth\b|North (?:Pole|America|Atlantic|Korea)/.test(text)||hit.real==='Rose'&&hit.match==='rose'||hit.real==='John'&&text.includes('John Keats')||hit.real==='Gray'&&hit.match==='gray')hit.expected='ordinary vocabulary or unrelated proper name';
   }
  }
 }
 for(const [field,text] of [['preface',EXPERIENCE_PREFACE_TEMPLATE],['interview.instruction',INTERVIEW_INSTRUCTION],...INTERVIEW_QUESTIONS.map((q,i)=>[`interview.questions[${i}]`,q])])scan(null,'template',field,render(text,'neutral'));
 return hits;
}
if(import.meta.main){const hits=scanNameLeaks(JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8')));for(const hit of hits)console.log(JSON.stringify(hit));console.log(`${hits.filter(h=>!h.expected).length} name leaks (${hits.length} total real-form occurrences, including expected overlaps)`);process.exitCode=hits.some(h=>!h.expected)?1:0}
