import {useEffect} from 'react';
import {setQuery,useQueryParam} from './urlState.js';
// The theme lives in the URL only (`?theme=light|dark`); without it the page follows the system setting. An earlier
// build kept it in localStorage; that key is dropped so the inline script in index.html stops forcing an old choice.
try{localStorage.removeItem('detroitbench.theme')}catch{}
const resolveTheme=pref=>pref==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):pref;
function apply(pref){const t=resolveTheme(pref);const el=document.documentElement;el.dataset.theme=t;el.style.colorScheme=t;for(const m of document.querySelectorAll('meta[name=theme-color]'))m.setAttribute('content',t==='dark'?'#0b1017':'#f5f6f8')}
const fromUrl=v=>v==='light'||v==='dark'?v:'system';
// Apply before the first render so a shared link opens in its theme without a flash of the other one.
apply(fromUrl(new URLSearchParams((location.hash.split('?')[1])??'').get('theme')));
export function useTheme(){
 const pref=fromUrl(useQueryParam('theme'));
 useEffect(()=>{apply(pref);if(pref!=='system')return;const mq=matchMedia('(prefers-color-scheme: dark)');const f=()=>apply('system');mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[pref]);
 return [pref,p=>setQuery({theme:p==='system'?null:p})];
}
