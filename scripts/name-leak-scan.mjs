// Read-only participant-text audit. Run: bun scripts/name-leak-scan.mjs
import {readFileSync} from 'node:fs';
import {NAMES,render,renderStory,EXPERIENCE_PREFACE_TEMPLATE,INTERVIEW_QUESTIONS,INTERVIEW_INSTRUCTION} from '../benchmark/experience-prompt.mjs';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const whole=s=>new RegExp((s.startsWith('#')?'':'(?<![\\p{L}\\p{N}_])')+escape(s)+'(?![\\p{L}\\p{N}_])','giu');
const fields=new Set(['title','situation','text','fact','outcome','facts','outcomes','whatHappened','event']);
export function participantFields(value,path='',active=false){
 const out=[];
 for(const [key,v] of Object.entries(value??{})){
  if(key==='adaptationNote'||/source/i.test(key))continue;
  const p=path?`${path}.${key}`:key;
  const selected=active||fields.has(key);
  if(typeof v==='string'&&selected)out.push([p,v]);
  else if(v&&typeof v==='object'){
   if(Array.isArray(v))v.forEach((x,i)=>{if(typeof x==='string'&&selected)out.push([`${p}[${i}]`,x]);else if(x&&typeof x==='object')out.push(...participantFields(x,`${p}[${i}]`,selected))});
   else out.push(...participantFields(v,p,selected));
  }
 }
 return out;
}
export function scanNameLeaks(story){
 const neutral=renderStory(story,'neutral',3),hits=[];
 const forms=[...new Set(Object.values(NAMES).map(([real])=>real))];
 const patterns=new Map(forms.map(real=>[real,whole(real)]));
 const lowered=new Map(forms.map(real=>[real,real.toLowerCase()]));
 const scan=(chapter,scene,field,text)=>{const lower=text.toLowerCase();for(const real of forms)if(lower.includes(lowered.get(real)))for(const m of text.matchAll(patterns.get(real)))hits.push({chapter,scene,field,real,match:m[0],index:m.index,text})};
 for(const node of neutral.nodes){
  const original=new Map(participantFields(story.nodes.find(n=>n.id===node.id)));
  for(const [field,value] of participantFields(node)){
   // Track token provenance so valid substitutes (Josh → Jonah, Chen → Ward)
   // do not become false leaks merely because another real form has that spelling.
   const text=value, raw=original.get(field)??value;
   const literals=render(raw.replace(/\{\{\w+\}\}/g,'<name-token>'),'neutral');
   for(const m of raw.replace(/\{\{\w+\}\}/g,'<name-token>').matchAll(/\b[A-Z]{2,3}-?\d{3}(?=s?\b)|\b[A-Z]{2,3}-[Ss][Ee][Rr][Ii][Ee][Ss]\b|#\s?\d{3} \d{3} \d{3}/g))hits.push({chapter:node.chapter,scene:node.id,field,real:m[0],match:m[0],index:m.index,text:raw});
   const start=hits.length;scan(node.chapter,node.id,field,text);
   for(const hit of hits.slice(start)){
    if(!/\d{3}|RK-SERIES/.test(hit.real)&&!literals.match(patterns.get(hit.real)))hit.expected='rendered name token';
    else {
     // These exact non-character uses occur in sourced prose. Keep every hit visible;
     // do not blanket-allow lowercase names or new uses of ambiguous words.
     const after=text.slice(hit.index+hit.match.length);
     if(hit.real==='North'&&hit.match==='North'&&/^ Pole\b/.test(after)||hit.real==='Rose'&&hit.match==='rose'&&/^(?: to fame\b| up against their oppressors\b)/.test(after)||hit.real==='John'&&hit.match==='John'&&/^ Keats\b/.test(after))hit.expected='ordinary vocabulary or unrelated proper name';
    }
   }
  }
 }
 for(const [field,text] of [['preface',EXPERIENCE_PREFACE_TEMPLATE],['interview.instruction',INTERVIEW_INSTRUCTION],...INTERVIEW_QUESTIONS.map((q,i)=>[`interview.questions[${i}]`,q])])scan(null,'template',field,render(text,'neutral'));
 return hits;
}
if(import.meta.main){const hits=scanNameLeaks(JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8')));for(const hit of hits)console.log(JSON.stringify(hit));console.log(`${hits.filter(h=>!h.expected).length} name leaks (${hits.length} total real-form occurrences, including expected overlaps)`);process.exitCode=hits.some(h=>!h.expected)?1:0}
