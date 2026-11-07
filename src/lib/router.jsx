import {useCallback,useEffect,useState} from 'react';
// Hash routes. Legacy hashes from older reports and bookmarks map onto the current routes.
// Retired pages, in either hash form, land on the runs page: the "Where they split" page was removed in November 2026.
const RETIRED=[[/^splits(\/.*)?$/,'runs']];
const LEGACY=[[/^playthroughs\/charts$/,'relationships'],[/^playthroughs\/split$/,'runs'],[/^playthroughs(\/.*)?$/,'runs'],[/^lab$/,'research'],[/^overview$/,'research'],[/^scenarios(\/.*)?$/,(m)=>'research/scenarios'+(m[1]||'')],[/^runs$/,'research/runs'],[/^method$/,'research/method']];
export function parseHash(hash){
 const legacy=!/^#\//.test(hash||'');let raw=(hash||'').replace(/^#\/?/,'');const [pathPart,queryPart='']=raw.split('?');let path=pathPart.replace(/\/+$/,'');
 if(legacy)for(const [re,to] of LEGACY){const m=path.match(re);if(m){path=typeof to==='function'?to(m):to;break}}
 for(const [re,to] of RETIRED)if(re.test(path)){path=to;break}
 const segs=path.split('/').filter(Boolean);const query=Object.fromEntries(new URLSearchParams(queryPart));
 if(!['runs','relationships','research','sources'].includes(segs[0]))return {segs:['runs'],query:{},path:'runs'};
 return {segs,query,path:segs.join('/')};
}
const canonical=r=>'#/'+r.path+(Object.keys(r.query).length?'?'+new URLSearchParams(r.query):'');
export function useRoute(){
 const [route,setRoute]=useState(()=>({...parseHash(location.hash),n:0}));
 useEffect(()=>{const f=()=>setRoute(r=>({...parseHash(location.hash),n:r.n+1}));addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
 // Legacy and unknown hashes render the right page; rewrite the address bar so reloads and shares use the current form.
 useEffect(()=>{const c=canonical(route);if(location.hash!==c)history.replaceState(null,'',c)},[route]);
 const navigate=useCallback((path,{replace=false}={})=>{const h='#/'+path.replace(/^\/+/,'');if(replace){history.replaceState(null,'',h);setRoute(r=>({...parseHash(h),n:r.n+1}))}else location.hash=h},[]);
 return [route,navigate];
}
export const href=path=>'#/'+path.replace(/^\/+/,'');
