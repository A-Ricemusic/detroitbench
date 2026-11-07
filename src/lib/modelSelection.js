import {useMemo} from 'react';
import {setQuery,useQueryParam} from './urlState.js';
// Which runs are shown, held in the URL as on Slopalytics: `models` lists the selected runs by a short slug (all runs when
// absent, which is the default), and `hide-reasoning` lists excluded reasoning levels (nothing when absent, so every run
// starts shown). Unknown slugs are dropped.
// The levels the providers offer, in the Reasoning row's order; "none" marks a run administered without one.
export const EFFORTS=['none','low','medium','high','xhigh','max','ultra'];
// Nothing is excluded by default: the runs without a recorded reasoning level are real results, not weaker ones.
export const DEFAULT_EXCLUDED=[];
export const slugOf=r=>r.id.slice(0,8);
export function useModelSelection(runs){
 const raw=useQueryParam('models'),rawEx=useQueryParam('hide-reasoning');
 return useMemo(()=>{
  const all=runs??[],bySlug=new Map(all.map(r=>[slugOf(r),r]));
  const selected=new Set(raw===null?all.map(r=>r.id):raw.split(',').map(s=>bySlug.get(s.trim())?.id).filter(Boolean));
  const excluded=new Set(rawEx===null?DEFAULT_EXCLUDED:rawEx.split(',').map(s=>s.trim()).filter(s=>EFFORTS.includes(s)));
  const setSelected=next=>{const ids=all.filter(r=>next.has(r.id));setQuery({models:ids.length===all.length?null:ids.map(slugOf).join(',')})};
  const setExcluded=next=>{const list=EFFORTS.filter(e=>next.has(e));setQuery({'hide-reasoning':list.join(',')===DEFAULT_EXCLUDED.join(',')?null:list.join(',')})};
  const visible=all.filter(r=>selected.has(r.id)&&!excluded.has(r.reasoning??'none'));
  return {selected,excluded,setSelected,setExcluded,visible}
 },[runs,raw,rawEx])}
