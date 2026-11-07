import {useSyncExternalStore} from 'react';
// Page state that belongs in the address bar, as on Slopalytics: the model selection, the excluded reasoning levels, the
// theme and the chart in view live in the hash's query (`#/runs?chart=hank&models=…`). Values equal to their
// default are removed, nothing goes to storage, and updates replace the history entry rather than adding one.
// SHARED keys travel with every in-app link, so the selection and the theme survive moving between pages.
export const SHARED=['models','hide-reasoning','theme'];
const listeners=new Set,emit=()=>{for(const l of listeners)l()};
addEventListener('hashchange',emit);addEventListener('popstate',emit);
const split=h=>{const i=h.indexOf('?');return [i<0?h:h.slice(0,i),new URLSearchParams(i<0?'':h.slice(i+1))]};
export const readQuery=()=>split(location.hash||'')[1];
// `updates` maps a key to a string (set, '' kept as an empty value), or null/undefined (removed).
export function setQuery(updates){const [path,p]=split(location.hash||'#/runs');for(const [k,v] of Object.entries(updates)){if(v===null||v===undefined)p.delete(k);else p.set(k,v)}
 const s=p.toString().replace(/%2C/gi,',');const next=(path||'#/runs')+(s?'?'+s:'');if(next!==location.hash)history.replaceState(history.state,'',next);emit()}
const subscribe=l=>{listeners.add(l);return()=>listeners.delete(l)};
// The raw value of one key: null when absent, '' when present and empty.
export function useQueryParam(key){return useSyncExternalStore(subscribe,()=>readQuery().get(key),()=>null)}
// Add the current SHARED values to an in-app hash path that does not set them itself.
export function withShared(h){const cur=readQuery(),[path,p]=split(h);let changed=false;for(const k of SHARED)if(cur.has(k)&&!p.has(k)){p.set(k,cur.get(k));changed=true}
 return changed?path+'?'+p.toString():h}
// Every in-app link carries the shared state: rewrite its target just before the browser follows it.
document.addEventListener('click',e=>{const a=e.target?.closest?.('a[href^="#/"]');if(!a)return;const h=a.getAttribute('href'),n=withShared(h);if(n!==h)a.setAttribute('href',n)},true);
