import React from 'react';
import {Button,Empty,Notice,PageHeader,Skeleton} from '../components/ui.jsx';
import {ChartsView} from '../components/Charts.jsx';
import {useLibrary} from '../lib/useLibrary.jsx';
export default function Relationships(){
 const {runs,scales,error,retry}=useLibrary();
 return <>
  <PageHeader eyebrow="Across the cohort" title="Relationships" lede="How the people around each character regarded them as the story went on, and where every model ended. Highlight a model to follow it across every chart."/>
  {error&&<Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice>}
  {!runs&&!error&&<div className="grid gap-4" aria-busy="true"><Skeleton className="h-10"/><Skeleton className="h-72"/><p className="sr-only" role="status">Loading runs…</p></div>}
  {runs&&(scales.length?<ChartsView runs={runs} scales={scales}/>:<Empty title="Relationship data is not available for these runs."/>)}
 </>}
