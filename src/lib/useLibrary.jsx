import {useEffect,useState} from 'react';
let cache,resolved=null;
export function loadLibrary(){
 cache??=Promise.all([fetch('/data/experiences.json'),fetch('/data/relationship-scales.json')]).then(async([a,b])=>{if(!a.ok)throw new Error('Cannot load the run library');resolved={runs:await a.json(),scales:b.ok?await b.json():[]};return resolved}).catch(e=>{cache=undefined;throw e});
 return cache;
}
// Pages mounting after the first load start with the resolved data, so switching tabs never flashes a skeleton.
export function useLibrary(){
 const [state,set]=useState(()=>resolved?{...resolved,error:''}:{runs:null,scales:[],error:''}),[attempt,setAttempt]=useState(0);
 useEffect(()=>{if(resolved&&attempt===0)return;let on=true;set(s=>({...s,error:''}));loadLibrary().then(d=>on&&set({...d,error:''})).catch(e=>on&&set(s=>({...s,error:e.message})));return()=>{on=false}},[attempt]);
 return {...state,retry:()=>setAttempt(a=>a+1)};
}
