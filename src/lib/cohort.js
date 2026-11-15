import {useMemo} from 'react';
import {setQuery,useQueryParam} from './urlState.js';
import {useLibrary} from './useLibrary.jsx';
// The two cohorts of the run library (public/data/experiences.json, scripts/prepare.mjs): official runs made on the
// frozen release, and the archived pre-release tests made on earlier story versions. Nothing on the site aggregates
// across them. The view lives in the URL as `cohort=official|pre-release`; without it the page opens on Official when
// at least one official run exists, otherwise on the pre-release tests. Picking a view writes it explicitly, so a shared
// link keeps its view after official runs are added.
export const OFFICIAL='official',PRE_RELEASE='pre-release';
export const COHORT_LABEL={[OFFICIAL]:'Official',[PRE_RELEASE]:'Pre-release tests'};
export const isOfficial=r=>!r.archived&&r.cohort===OFFICIAL;
const semver=v=>String(v??'').split('.').map(Number);
const cmpVersion=(a,b)=>{const x=semver(a),y=semver(b);for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]??0)-(y[i]??0);if(d)return d}return 0};
// "1.9.0 to 1.9.14" for a set of runs; one version alone when they share it.
export function versionSpan(runs){const vs=[...new Set(runs.map(r=>r.storyVersion).filter(Boolean))].sort(cmpVersion);return !vs.length?'':vs.length===1?vs[0]:`${vs[0]} to ${vs.at(-1)}`}
export function useCohort(runs){
 const raw=useQueryParam('cohort');
 return useMemo(()=>{
  const all=runs??[],official=all.filter(isOfficial),pre=all.filter(r=>!isOfficial(r));
  const fallback=official.length?OFFICIAL:PRE_RELEASE,cohort=raw===OFFICIAL||raw===PRE_RELEASE?raw:fallback;
  // The model selection names runs of one cohort, so it is cleared on a switch.
  const setCohort=next=>{if(next!==cohort)setQuery({cohort:next,models:null})};
  return {cohort,setCohort,runs:cohort===OFFICIAL?official:pre,counts:{[OFFICIAL]:official.length,[PRE_RELEASE]:pre.length}}
 },[runs,raw])}
// Whether one run is an archived pre-release test, from the run library (the report and interview files do not carry
// it): undefined while the library loads or when the run is not in it.
export function useArchived(id){const {runs}=useLibrary();return runs?.find(r=>r.id===id)?.archived}
