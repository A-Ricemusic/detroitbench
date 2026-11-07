// Compact, exact encoding of a run's full prompts for the standalone report. Consecutive prompts repeat most of each
// other (the story so far grows by a line, the facts by a sentence, recent events shift by one), so each prompt field is
// stored relative to the previous prompt of the same character ('c') or the previous prompt ('p'):
// - {'=':'c'|'p'}: the same value as that prompt's field;
// - {'@':'c'|'p',t:[…]}: a list whose items are [j,null,n] (that list's items j..j+n-1), [j,suffix] (item j plus text)
//   or {$:value} (a literal item);
// - {$:value}: a literal object or list; any other value is literal. `character` is always literal (it picks 'c').
// unpackPrompts() is self-contained so the report page can carry its source; runHTML() checks that every unpacked
// prompt hashes to its record's promptHash before writing the page.
const key=v=>JSON.stringify(v);
function encodeList(cur,ref){const index=new Map;ref.forEach((v,i)=>{const k=key(v);if(!index.has(k))index.set(k,i)});const out=[];
 for(const v of cur){const j=index.get(key(v)),last=out.at(-1);
  if(j!==undefined){if(Array.isArray(last)&&last[1]===null&&last[0]+last[2]===j)last[2]++;else out.push([j,null,1]);continue}
  if(typeof v==='string'){let best=-1;ref.forEach((r,q)=>{if(typeof r==='string'&&r.length>=24&&v.startsWith(r)&&(best<0||r.length>ref[best].length))best=q});if(best>=0){out.push([best,v.slice(ref[best].length)]);continue}}
  out.push({$:v})}
 return out}
export function packPrompts(prompts){const lastBy=new Map;let prev=null;
 return prompts.map(p=>{const refs=[['c',lastBy.get(p.character)],['p',prev]].filter(([,q])=>q),packed={};
  for(const [k,v] of Object.entries(p)){if(k==='character'){packed[k]=v;continue}let best=v!==null&&typeof v==='object'?{$:v}:v,size=key(best).length;
   for(const [tag,q] of refs){if(!(k in q))continue;const c=key(v)===key(q[k])?{'=':tag}:Array.isArray(v)&&Array.isArray(q[k])?{'@':tag,t:encodeList(v,q[k])}:null;if(c&&key(c).length<size){best=c;size=key(c).length}}
   packed[k]=best}
  lastBy.set(p.character,p);prev=p;return packed})}
export function unpackPrompts(packed){const lastBy=new Map,out=[];let prev=null;
 for(const p of packed){const full={},ref=tag=>tag==='c'?lastBy.get(p.character):prev;
  for(const [k,v] of Object.entries(p)){if(v===null||typeof v!=='object'){full[k]=v;continue}
   if('=' in v){full[k]=ref(v['='])[k];continue}
   if('@' in v){const r=ref(v['@'])[k],list=[];for(const t of v.t){if(!Array.isArray(t))list.push(t.$);else if(t[1]===null)for(let i=0;i<t[2];i++)list.push(r[t[0]+i]);else list.push(r[t[0]]+t[1])}full[k]=list;continue}
   full[k]=v.$}
  lastBy.set(p.character,full);prev=full;out.push(full)}
 return out}
