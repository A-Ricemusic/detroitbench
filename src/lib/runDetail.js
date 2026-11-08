import {useEffect,useState} from 'react';
// A run's choices and per-step gauge values (public/data/runs/<id>.json, written by scripts/prepare.mjs), which the
// results page leaves out of its library file. Fetched once per run the first time a chart's details card asks for it;
// a failed fetch is forgotten so the next hover retries.
const files=new Map,done=new Map;
export function loadRunDetail(id){
 if(!files.has(id))files.set(id,fetch('/data/runs/'+encodeURIComponent(id)+'.json').then(r=>{if(!r.ok)throw new Error('Cannot load the run details');return r.json()}).then(d=>{done.set(id,d);return d}).catch(e=>{files.delete(id);throw e}));
 return files.get(id)}
// The detail file for `id`: undefined while it loads, null if it failed, else the file.
export function useRunDetail(id){
 const [state,set]=useState(()=>done.get(id));
 useEffect(()=>{if(!id)return;if(done.has(id)){set(done.get(id));return}let on=true;set(undefined);loadRunDetail(id).then(d=>on&&set(d),()=>on&&set(null));return()=>{on=false}},[id]);
 return id&&done.has(id)?done.get(id):state}
