import React,{useEffect,useMemo,useRef,useState} from 'react';
import {GitFork,BookA,CircleCheck,CircleX} from 'lucide-react';
import {Badge,Button,Card,Dot,Empty,Notice,PageHeader,SearchField,Segmented,Skeleton,cx} from '../components/ui.jsx';
import {CHARS,WHO,CHAR_VAR,modelColors,shortName,tidy} from '../lib/data.js';
import {useLibrary} from '../lib/useLibrary.jsx';
import Glossary from '../components/Glossary.jsx';
import {announce} from '../lib/announce.jsx';

function groupPicks(picks){const m=new Map();for(const p of picks){if(!m.has(p.choice))m.set(p.choice,{choice:p.choice,runs:[]});m.get(p.choice).runs.push(p)}return [...m.values()].sort((a,b)=>b.runs.length-a.runs.length)}

function Split({d,total,colors}){
 const groups=groupPicks(d.picks),n=d.picks.length;const [openRun,setOpenRun]=useState(null);
 const pick=d.picks.find(p=>p.id===openRun);
 return <Card as="article" className="p-4 md:p-5 anim-fade-up" style={{'--c':CHAR_VAR[d.character]}} aria-labelledby={'split-'+d.node}>
  <p className="text-xs text-ink-3 flex flex-wrap items-center gap-x-3 gap-y-1"><span className="inline-flex items-center gap-1.5 font-medium text-ink-2"><Dot color="var(--c)"/>{WHO[d.character]}</span><span className="whitespace-nowrap">Chapter {d.chapter}, {d.chapterTitle}</span><span className="whitespace-nowrap">reached by {n} of {total} models</span></p>
  <h2 id={'split-'+d.node} className="mt-1 text-lg font-semibold">{tidy(d.title)}</h2>
  <ul className="mt-3 grid gap-3">{groups.map(g=><li key={g.choice} className="grid grid-cols-[26px_1fr] gap-x-2.5 gap-y-1.5">
   <span aria-hidden="true" className="mt-0.5 inline-flex size-6 items-center justify-center rounded-md text-xs font-bold bg-ink text-bg tnum">{g.runs.length}</span>
   <p className="text-sm font-medium leading-snug self-center"><span className="sr-only">{g.runs.length} chose: </span>{tidy(g.choice)}</p>
   <ul className="col-start-2 flex flex-wrap gap-1.5">{g.runs.map(p=>{const on=openRun===p.id;const R=p.risk&&(p.risk.outcome==='failure'?CircleX:CircleCheck);return <li key={p.id}><button type="button" aria-expanded={on} aria-controls={'reason-'+d.node} onClick={()=>setOpenRun(on?null:p.id)} className={cx('inline-flex items-center gap-1.5 rounded-full border px-2.5 min-h-9 md:min-h-8 text-[13px] transition-colors',on?'bg-ink text-bg border-ink':'bg-surface text-ink-2 border-line-2 hover:text-ink hover:bg-surface-2 hover:underline underline-offset-2')}><Dot color={colors[p.run]} className="size-2"/><span className="sm:hidden">{shortName(p.run)}</span><span className="hidden sm:inline">{p.run}</span>{R&&<R aria-hidden="true" className={cx('size-3.5',p.risk.outcome==='failure'?(on?'text-bg':'text-bad'):(on?'text-bg':'text-good'))}/>}{p.risk&&<span className="sr-only">, risk {p.risk.outcome}</span>}</button></li>})}</ul>
  </li>)}</ul>
  <div id={'reason-'+d.node} className={cx(pick?'mt-4 anim-fade-up':'hidden')}>{pick&&<blockquote className="rounded-lg border-l-[3px] bg-surface-2/60 px-4 py-3 text-sm" style={{borderColor:colors[pick.run]}}><p className="mb-1 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-3"><Dot color={colors[pick.run]} className="size-2"/>{pick.run} chose “{tidy(pick.choice)}”{pick.risk&&<Badge size="sm" tone={pick.risk.outcome==='failure'?'bad':'good'} icon>{pick.risk.label}: {pick.risk.outcome}</Badge>}</p><p className="text-ink">{tidy(pick.reason)}</p></blockquote>}</div>
 </Card>}

export default function Splits(){
 const {runs,error,retry}=useLibrary();
 const [focus,setFocus]=useState('all'),[q,setQ]=useState(''),[names,setNames]=useState(false);
 const colors=useMemo(()=>runs?modelColors(runs):{},[runs]);
 const allSplits=useMemo(()=>{if(!runs?.length)return [];const byNode=new Map();for(const r of runs)for(const c of r.choices){if(!byNode.has(c.node))byNode.set(c.node,{...c,picks:[]});byNode.get(c.node).picks.push({id:r.id,run:r.displayName,choice:c.choice,risk:c.risk,reason:c.reason})}return [...byNode.values()].filter(n=>new Set(n.picks.map(p=>p.choice)).size>1).sort((a,b)=>a.chapter-b.chapter)},[runs]);
 const splits=useMemo(()=>allSplits.filter(n=>focus==='all'||n.character===focus).filter(n=>!q||`${n.title} ${n.chapterTitle}`.toLowerCase().includes(q.toLowerCase())),[allSplits,focus,q]);
 const counts=Object.fromEntries(CHARS.map(c=>[c,allSplits.filter(n=>n.character===c).length]));
 const lastFilter=useRef(focus+'|'+q);useEffect(()=>{const key=focus+'|'+q;if(!runs||key===lastFilter.current)return;lastFilter.current=key;const t=setTimeout(()=>announce(`${splits.length} of ${allSplits.length} scenes`),q?350:0);return()=>clearTimeout(t)},[focus,q,runs,splits.length,allSplits.length]);
 return <>
  <PageHeader eyebrow="Splits · scene by scene" title="Where the models split" lede={runs?`${allSplits.length} scenes where at least two models chose differently. Tap a model to read its reason, quoted verbatim with the substitute names it saw.`:undefined}
   actions={runs&&<Button variant="soft" size="sm" icon={BookA} aria-haspopup="dialog" onClick={()=>setNames(true)}>Substitute names key</Button>}/>
  <Glossary open={names} target="names" onClose={()=>setNames(false)}/>
  {error&&<Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice>}
  {!runs&&!error&&<div className="grid gap-4" aria-busy="true"><Skeleton className="h-10"/><Skeleton className="h-40"/><Skeleton className="h-40"/><p className="sr-only" role="status">Loading runs…</p></div>}
  {runs&&<>
   <div className="sm:sticky sticky-top z-20 -mx-4 px-4 md:mx-0 md:px-0 py-3 bg-bg/92 backdrop-blur-md border-b border-line md:border-0 flex flex-col gap-3 sm:flex-row sm:items-center">
    <Segmented label="Character" value={focus} onChange={setFocus} className="grid grid-cols-2 sm:inline-flex [&>*]:justify-center sm:[&>*]:justify-start" options={[{value:'all',label:'All',count:allSplits.length},...CHARS.map(c=>({value:c,label:WHO[c],icon:CHAR_VAR[c],count:counts[c]}))]}/>
    <SearchField label="Search scenes" value={q} onChange={setQ} placeholder="Search scenes or chapters" className="sm:ml-auto sm:w-72"/>
   </div>
   <p className="mt-4 mb-3 text-sm text-ink-2 flex flex-wrap gap-x-3 gap-y-1"><span>{splits.length===allSplits.length?`${allSplits.length} scenes`:`${splits.length} of ${allSplits.length} scenes`}</span><span className="text-ink-3 inline-flex items-center gap-1 flex-wrap">risky actions are marked <CircleCheck aria-hidden="true" className="size-3.5 text-good"/> succeeded or <CircleX aria-hidden="true" className="size-3.5 text-bad"/> failed</span></p>
   {!splits.length&&<Empty icon={GitFork} title="No split scenes match" action={<Button onClick={()=>{setQ('');setFocus('all')}}>Clear filters</Button>}/>}
   <div className="grid gap-4 xl:grid-cols-2 items-start">{splits.map(d=><Split key={d.node} d={d} total={runs.length} colors={colors}/>)}</div>
  </>}
 </>}
