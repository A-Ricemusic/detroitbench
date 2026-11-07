import React,{useEffect,useState} from 'react';
import {ExternalLink} from 'lucide-react';
import {Badge,Button,Card,Notice,PageHeader,Section,Skeleton} from '../components/ui.jsx';
import {plural} from '../lib/data.js';

// Built at prepare time from benchmark/story.json and docs/detroit-decisions.json (scripts/prepare.mjs buildSources):
// one entry per source, grouped by the authority ranks of docs/research/README.md.
let cache,resolved=null;
function loadSources(){cache??=fetch('/data/sources.json').then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}).then(d=>resolved=d).catch(e=>{cache=undefined;throw e});return cache}

function Link({url,children,className}){
 return <a className={'link inline-flex items-start gap-1.5 break-all '+(className??'')} href={url} target="_blank" rel="noreferrer"><span>{children??url}</span><ExternalLink aria-hidden="true" className="size-3.5 shrink-0 mt-[3px] text-ink-3"/><span className="sr-only">(opens in a new tab)</span></a>}

const citedBy=(scenes,atlas)=>[scenes&&plural(scenes,'scene'),atlas&&plural(atlas,'atlas entry','atlas entries')].filter(Boolean).join(' · ');

function SourceCard({s}){
 return <Card as="li" className="p-4 md:p-5">
  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
   <h3 className="font-semibold text-ink">{s.name}</h3>
   {s.method?<Badge size="sm">Method reference</Badge>:s.general?<Badge size="sm">General reference</Badge>:<span className="text-xs text-ink-2 tnum">Cited by {citedBy(s.scenes,s.atlas)}</span>}
  </div>
  <p className="mt-1 text-sm text-ink-2 max-w-[70ch]">{s.description}</p>
  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
   <dt className="text-ink-3">Access</dt><dd className="text-ink-2">{s.access}</dd>
   <dt className="text-ink-3">Root</dt><dd>{s.root?<Link url={s.root} className="text-ink-2"/>:<span className="text-ink-3">No public link</span>}</dd>
  </dl>
  {s.pages.length>0&&<details className="mt-2 group">
   <summary className="inline-flex cursor-pointer items-center gap-2 min-h-9 text-sm font-medium text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden before:content-['▸'] before:text-ink-3 before:text-xs group-open:before:content-['▾']">Pages cited ({s.pages.length})</summary>
   <ol className="mt-1 border-t border-line text-sm">{s.pages.map(p=><li key={p.url} className="border-b border-line py-2 last:border-b-0">
    <p className="flex flex-wrap items-baseline gap-x-2"><span className="text-ink">{p.title}</span><span className="text-xs text-ink-3 tnum">{p.method?'method reference':citedBy(p.scenes,p.atlas)||'general reference'}</span></p>
    <Link url={p.url} className="text-[13px] text-ink-2"/>
    {p.note&&<p className="mt-0.5 text-xs text-ink-3 max-w-[70ch]">{p.note}</p>}
   </li>)}</ol>
  </details>}
 </Card>}

export default function Sources(){
 const [data,setData]=useState(resolved),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);
 useEffect(()=>{if(resolved)return;let on=true;setError('');loadSources().then(d=>on&&setData(d)).catch(e=>on&&setError('Could not load the source list: '+e.message));return()=>{on=false}},[attempt]);
 return <>
  <PageHeader eyebrow={data?`Sources · story ${data.storyVersion}`:'Sources'} title="Sources" lede={data?`One entry per source, by rank. Counts are the scenes (of ${data.scenes}) and decision-atlas entries that cite it; the list is generated from both at build time.`:'One entry per source, by rank.'}/>
  {error&&<Notice tone="bad">{error} <Button size="sm" variant="link" onClick={()=>{setError('');setAttempt(a=>a+1);document.querySelector('main h1')?.focus()}}>Try again</Button></Notice>}
  {!data&&!error&&<div className="grid gap-4" aria-busy="true"><Skeleton className="h-6 w-64"/><Skeleton className="h-40"/><p className="sr-only" role="status">Loading sources…</p></div>}
  {data&&<>
   <p className="mt-6 max-w-[70ch] text-sm text-ink-2">When sources disagree, the higher rank wins: the flowcharts settle structure and the game’s text settles prompts, labels and stat arrows. Lower ranks fill only what the higher ones leave open, and the operator’s journal overrides them only for an observation the operator reproduced where the sources are silent.</p>
   {data.ranks.map(r=><Section key={r.rank} id={'rank-'+r.rank} title={`${r.rank}. ${r.title}`} lede={r.description} className="mt-8 md:mt-10">
    <ul className="grid gap-3">{r.sources.map(s=><SourceCard key={s.id} s={s}/>)}</ul>
   </Section>)}
   <p className="mt-12 text-xs text-ink-3 max-w-[70ch]">Detroit: Become Human is a game by Quantic Dream. DetroitBench is unofficial fan research and is not affiliated with or endorsed by Quantic Dream; the pages listed here belong to their respective publishers.</p>
  </>}
 </>}
