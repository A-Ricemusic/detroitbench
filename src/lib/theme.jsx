import {useEffect,useState} from 'react';
const KEY='detroitbench.theme';
const read=()=>{try{const v=localStorage.getItem(KEY);return v==='light'||v==='dark'?v:'system'}catch{return 'system'}};
const resolveTheme=pref=>pref==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):pref;
function apply(pref){const t=resolveTheme(pref);const el=document.documentElement;el.dataset.theme=t;el.style.colorScheme=t;for(const m of document.querySelectorAll('meta[name=theme-color]'))m.setAttribute('content',t==='dark'?'#0b1017':'#f5f6f8')}
export function useTheme(){
 const [pref,setPref]=useState(read);
 useEffect(()=>{apply(pref);try{const cur=localStorage.getItem(KEY);if(cur!==pref&&(cur!==null||pref!=='system'))localStorage.setItem(KEY,pref)}catch{}
  if(pref!=='system')return;const mq=matchMedia('(prefers-color-scheme: dark)');const f=()=>apply('system');mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[pref]);
 return [pref,setPref];
}
