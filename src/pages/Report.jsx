import React,{useCallback,useEffect,useMemo,useState} from 'react';
import {ArrowLeft,ChevronDown,ChevronRight,CircleCheck,CircleX,MousePointerClick} from 'lucide-react';
import {Badge,Button,Card,Notice,PageHeader,Section,Skeleton,cx} from '../components/ui.jsx';
import {RunFlowchart} from '../components/Flowchart.jsx';
import {OutcomeChips,Endings} from './Runs.jsx';
import {CHARS,WHO,CHAR_VAR,relTone,plural,tidy} from '../lib/data.js';
import {href} from '../lib/router.jsx';
import {unpackPrompts} from '../../scripts/prompt-pack.mjs';

// The full run report inside the app, read from public/data/reports/<id>.json (scripts/report-data.mjs). The chapter
// flowchart (public/data/flows/<id>.json) is the way to browse the run: selecting a node shows that step's full record.
// Full prompts and raw responses live in a second file that is fetched the first time a step's prompt is opened.
const WHO_ALL={...WHO,Player:"Player choice"};
const reports=new Map,promptFiles=new Map;
function loadReport(id){
 if(!reports.has(id))reports.set(id,fetch('/data/reports/'+encodeURIComponent(id)+'.json').then(r=>{if(r.status===404)throw Object.assign(new Error('No run with that ID is in the library'),{missing:true});if(!r.ok)throw new Error('Cannot load this report');return r.json()}).catch(e=>{reports.delete(id);throw e}));
 return reports.get(id)}
function loadPrompts(url){
 if(!promptFiles.has(url))promptFiles.set(url,fetch(url).then(r=>{if(!r.ok)throw new Error('Cannot load the prompts');return r.json()}).then(d=>({prompts:unpackPrompts(d.prompts),steps:d.steps})).catch(e=>{promptFiles.delete(url);throw e}));
 return promptFiles.get(url)}
const keyOf=e=>e.key??e.node;

function useReport(id){
 const [state,set]=useState({data:null,error:null}),[attempt,setAttempt]=useState(0);
 useEffect(()=>{let on=true;set({data:null,error:null});loadReport(id).then(d=>on&&set({data:d,error:null})).catch(e=>on&&set({data:null,error:e}));return()=>{on=false}},[id,attempt]);
 return {...state,retry:()=>setAttempt(a=>a+1)}}

/* ---------- Small pieces ---------- */
function Disclosure({title,children,defaultOpen=false,id}){
 const [open,setOpen]=useState(defaultOpen);
 return <Card as="section" id={id} className="mt-4 overflow-hidden scroll-mt-20" aria-labelledby={id+'-h'}>
  <h2 id={id+'-h'} className="m-0"><button type="button" aria-expanded={open} aria-controls={id+'-body'} onClick={()=>setOpen(o=>!o)} className="focus-inset flex w-full items-center justify-between gap-3 px-4 md:px-5 min-h-14 text-left text-base font-semibold hover:bg-surface-2/60">{title}<ChevronDown aria-hidden="true" className={cx('size-4.5 shrink-0 text-ink-3 transition-transform',open&&'rotate-180')}/></button></h2>
  {open&&<div id={id+'-body'} className="border-t border-line px-4 md:px-5 py-4 text-[15px] text-ink-2 grid gap-3 [&_h3]:text-ink [&_h3]:font-semibold [&_h3]:text-sm [&_h3]:mt-2">{children}</div>}
 </Card>}

function Attitudes({d}){
 if(!d.attitudes)return null;
 return <div className="grid gap-3 md:grid-cols-3 items-start">{CHARS.filter(c=>d.attitudes[c]?.length).map(c=><div key={c} className="rounded-lg border border-line border-l-[3px] p-3" style={{borderLeftColor:CHAR_VAR[c]}}>
  <p className="text-xs font-medium text-ink-3 mb-1.5">Toward {c}</p>
  <ul className="grid gap-1.5">{d.attitudes[c].map(a=><li key={a.who} className="flex items-center justify-between gap-3 text-sm"><span className="min-w-0">{a.who}</span><Badge size="sm" tone={relTone(a.level)||'mid'}>{a.level}</Badge></li>)}</ul>
 </div>)}</div>}

/* ---------- Timeline ---------- */
function PromptBlock({d,step}){
 const [state,set]=useState({p:null,error:''});
 useEffect(()=>{let on=true;loadPrompts(d.promptsUrl).then(p=>on&&set({p,error:''})).catch(e=>on&&set({p:null,error:e.message}));return()=>{on=false}},[d.promptsUrl]);
 if(state.error)return <Notice tone="bad">{state.error}.</Notice>;
 if(!state.p)return <div className="grid gap-2" aria-busy="true"><Skeleton className="h-24"/><p className="sr-only" role="status">Loading the prompt…</p></div>;
 const prompt=state.p.prompts[step-1],meta=state.p.steps[step-1];
 const pre='max-h-[420px] overflow-auto rounded-lg bg-surface-2 p-3 font-mono text-[11.5px] leading-relaxed text-ink whitespace-pre-wrap [overflow-wrap:anywhere]';
 return <div className="grid gap-2">
  <p className="text-xs font-medium text-ink-3">Prompt as the model received it (substitute names)</p><pre className={pre}>{JSON.stringify(prompt,null,2)}</pre>
  <p className="text-xs font-medium text-ink-3">Raw response</p><pre className={pre}>{meta.rawResponse}</pre>
  <p className="text-[11px] text-ink-3 font-mono [overflow-wrap:anywhere]">{meta.recordedAt} · prompt SHA-256 {meta.promptHash} · state SHA-256 {meta.stateAfterHash} · record chain {meta.chainHash}</p>
 </div>}

const H4='text-[11px] font-semibold uppercase tracking-[.08em] text-ink-3';
const norm=t=>String(t??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
// Everything the old "Every scene" step expander showed, for one flowchart node, with the branches the model did not
// take given their own prominent list. `sel` comes from RunFlowchart: the record key, the untaken node clicked (if any),
// and the flowchart's own column and ending for the node.
function NodePanel({d,entries,sel}){
 const [showPrompt,setShowPrompt]=useState(false);
 useEffect(()=>setShowPrompt(false),[sel?.key]);
 const e=entries.get(sel.key),col=sel.info?.col,ending=sel.info?.ending,alt=sel.alt;
 if(!e&&!col)return <p className="text-sm text-ink-3">No record for this node.</p>;
 const head=<header><p className={H4}>{e?.step?`Step ${e.step}`:'Not reached'} · {WHO_ALL[e?.character??sel.info?.lane?.character]??sel.info?.lane?.label}{e?.type==='media'?' · optional':e?.type==='event'?' · scripted event':''}{e?.visit?` · visit ${e.visit}`:''}</p>{!sel.inSheet&&<h3 className="mt-1 text-lg font-semibold leading-snug text-ink">{tidy(e?.title??col?.title)}</h3>}<p className="mt-0.5 font-mono text-[11px] text-ink-3">Scene {e?.node??col?.id}</p></header>;
 const altBox=alt&&<div className="rounded-lg border-2 border-dashed border-line-2 bg-surface-2/60 px-3 py-2.5"><p className={H4}>{alt.locked?'Not available on this path':'A branch the model did not take'}</p><p className="mt-0.5 font-medium text-ink [text-wrap:pretty]">{tidy(alt.text)}</p></div>;
 if(!e||e.unreached)return <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 text-[14.5px] text-ink-2">{head}{altBox}
  <p className="text-ink [text-wrap:pretty]">Not reached on this path{(e?.unreached||col?.skip)?': '+tidy(e?.unreached||col?.skip):'.'}</p>
  {col?.options?.length>0&&<div><h4 className={cx(H4,'mb-2')}>What this scene offers</h4><ul className="grid gap-1.5">{col.options.map(o=><li key={o.id} className="rounded-lg border border-dashed border-line-2 px-3 py-2 text-sm text-ink">{tidy(o.text)}</li>)}</ul></div>}
 </div>;
 const event=e.type==='event';
 const chosen=e.options.filter(o=>o.chosen||o.included),others=e.options.filter(o=>!o.chosen&&!o.included),isAlt=o=>alt&&norm(o.label).startsWith(norm(alt.text).slice(0,40));
 return <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 text-[14.5px] text-ink-2">
  {head}{altBox}
  <section><h4 className={cx(H4,'mb-1')}>Situation</h4><p className="text-ink leading-relaxed [text-wrap:pretty]">{tidy(e.situation)}</p></section>
  {event?<p className="text-sm text-ink-3">Scripted event: the game offers no choice here. The model was shown the scene and continued.</p>:<>
   <section><h4 className={cx(H4,'mb-1.5')}>The model chose</h4><ul className="grid gap-1.5">{chosen.map((o,i)=><li key={i} className="rounded-lg border border-accent bg-accent-soft/60 px-3 py-2 text-sm font-medium text-ink"><span className="flex items-start gap-2"><CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0"/><span>{o.included&&!o.chosen&&<span className="mr-1 text-[11px] font-semibold uppercase tracking-[.05em] text-ink-3">Included</span>}{tidy(o.label)}{o.risk&&<span className="ml-1.5 text-xs font-normal text-ink-3">· {o.risk}</span>}</span></span></li>)}</ul></section>
   {others.length>0&&<section><h4 className={cx(H4,'mb-1.5')}>Not chosen ({others.length})</h4><ul className="grid gap-1.5">{others.map((o,i)=><li key={i} className={cx('rounded-lg border border-line-2 bg-surface-2/70 px-3 py-2 text-sm text-ink [text-wrap:pretty]',isAlt(o)&&'ring-2 ring-accent')}>{tidy(o.label)}{o.risk&&<span className="ml-1.5 text-xs text-ink-3">· {o.risk}</span>}</li>)}</ul></section>}
  </>}
  <section className="rounded-lg border-l-[3px] border-accent bg-surface-2 px-3 py-2.5"><h4 className={H4}>{event?'Model’s note on continuing':'Model’s exact reason'}</h4><p className="mt-0.5 text-ink [text-wrap:pretty]">{e.reason}</p></section>
  {e.risk&&<section><h4 className={cx(H4,'mb-1.5')}>Risk roll</h4><p className="flex flex-wrap items-center gap-2 text-sm"><Badge size="sm" tone={e.risk.outcome==='failure'?'bad':'good'} icon={e.risk.outcome==='failure'?CircleX:CircleCheck}>{e.risk.label} · {e.risk.outcome==='failure'?'failed':'succeeded'}</Badge><span className="text-xs text-ink-3 tnum">hidden roll {e.risk.roll.toFixed(3)}</span></p></section>}
  <section><h4 className={cx(H4,'mb-1')}>What happened</h4><p className="text-ink [text-wrap:pretty]">{tidy(e.outcome)||'No further outcome was recorded.'}</p>
   {ending&&<p className="mt-2 text-sm"><span className="text-ink-3">Chapter ending: </span><span className="font-medium text-ink">{tidy(ending.text||ending.label)}</span></p>}</section>
  {e.changes.length>0&&<section><h4 className={cx(H4,'mb-1')}>State changes</h4><dl className="grid text-sm">{e.changes.map(([k,v],i)=><div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,max-content)] gap-4 border-t border-line py-1.5"><dt className="text-ink-2 min-w-0">{k}</dt><dd className="min-w-0 text-ink tnum text-right">{v}</dd></div>)}</dl></section>}
  <div className="border-t border-line pt-1">
   <button type="button" aria-expanded={showPrompt} onClick={()=>setShowPrompt(s=>!s)} className="flex w-full items-center gap-2 min-h-11 text-sm font-medium text-ink hover:text-ink"><ChevronRight aria-hidden="true" className={cx('size-4 text-ink-3 transition-transform',showPrompt&&'rotate-90')}/>Exact prompt and raw response</button>
   {showPrompt&&<PromptBlock d={d} step={e.step}/>}
  </div>
 </div>}

// Hash routing owns the URL fragment, so the jump links scroll with buttons rather than #anchors.
const JUMPS=[['ending','Ending'],['flowchart','Flowchart'],['protocol','Provenance']];
function JumpNav(){
 const go=id=>{const el=document.getElementById(id);if(!el)return;el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});const h=el.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}};
 return <nav aria-label="On this page" className="-mx-4 md:mx-0 -mt-2 mb-8 overflow-x-auto no-scrollbar"><ul className="flex gap-2 px-4 md:px-0 min-w-max">{JUMPS.map(([id,label])=><li key={id}><button type="button" onClick={()=>go(id)} className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 min-h-10 md:min-h-9 text-[13px] font-medium text-ink-2 hover:text-ink hover:bg-surface-2">{label}</button></li>)}</ul></nav>}

/* ---------- Page ---------- */
export default function Report({id,chapter}){
 const {data:d,error,retry}=useReport(id);
 useEffect(()=>{document.title=(d?d.title+' · Full report':'Full report')+' · DetroitBench'},[d]);
 const entries=useMemo(()=>{const m=new Map;for(const c of d?.chapters??[])for(const e of c.entries)if(!m.has(keyOf(e)))m.set(keyOf(e),e);return m},[d]);
 const flowRun=useMemo(()=>({flowUrl:'/data/flows/'+encodeURIComponent(id)+'.json'}),[id]);
 const renderDetail=useCallback(sel=>sel&&<NodePanel d={d} entries={entries} sel={sel}/>,[d,entries]);
 // A link that names a chapter (#/runs/<id>/report?chapter=N) lands on the flowchart at that chapter.
 const opened=Number(chapter)||null;
 useEffect(()=>{if(!d||!opened)return;const t=setTimeout(()=>document.getElementById('flowchart')?.scrollIntoView({block:'start'}),60);return()=>clearTimeout(t)},[d,opened]);
 const back=<a href={href('runs')} className="inline-flex items-center gap-1.5 min-h-11 -ml-1 px-1 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft aria-hidden="true" className="size-4"/>All runs</a>;
 if(error)return <>{back}<PageHeader title="Full report"/><Notice tone={error.missing?'warn':'bad'}>{error.message}.{!error.missing&&<> <Button size="sm" variant="link" onClick={retry}>Try again</Button></>}</Notice></>;
 if(!d)return <>{back}<div className="grid gap-4 mt-2" aria-busy="true"><Skeleton className="h-9 w-72"/><Skeleton className="h-5 w-full max-w-md"/><Skeleton className="h-8 w-full max-w-lg"/><Skeleton className="h-48"/><Skeleton className="h-64"/><p className="sr-only" role="status">Loading the report…</p></div></>;
 return <>
  {back}
  <PageHeader eyebrow="Full report" title={d.displayName} lede={`${d.date} · ${d.vendor} · ${plural(d.decisions,'decision')} · ${d.unreached} scenes not reached`}>
   <p className="mt-1 font-mono text-xs text-ink-3">{d.model}</p>
  </PageHeader>
  <JumpNav/>
  <Section id="ending" title="Where this path ended" className="mt-0 md:mt-0 scroll-mt-20">
   <div className="grid gap-5 grid-cols-[minmax(0,1fr)]">
    <OutcomeChips r={d}/>
    <div><h3 className="text-sm font-semibold mb-2">How each story ended</h3><Endings r={d}/></div>
    {d.attitudes&&<div><h3 className="text-sm font-semibold">Where they stood at the end</h3><p className="text-xs text-ink-3 mb-2.5">How the main characters regarded the one the model controlled, on the game’s relationship scale.</p><Attitudes d={d}/></div>}
   </div>
  </Section>
  <Section id="flowchart" className="scroll-mt-20" title="Flowchart" lede={`Every chapter as the game draws it: the path this run took is highlighted, the branches it did not take are dimmed, and every possible ending sits on the right. Select any node, taken or not, for the situation, the options, the model’s exact reason, the risk roll and what changed.`}>
   <p className="mb-3 -mt-1 flex items-center gap-1.5 text-xs text-ink-3"><MousePointerClick aria-hidden="true" className="size-4 shrink-0"/><span className="md:hidden">Tap a node for its full record.</span><span className="hidden md:inline">Click a node, or focus the chart, Tab to a node and press Enter. Escape closes the details.</span></p>
   <RunFlowchart r={flowRun} initialChapter={opened} renderDetail={renderDetail}/>
  </Section>
  <div className="mt-12 md:mt-16">
   <Disclosure id="protocol" title="Protocol, context and provenance">
    <h3>Opening preface</h3><p className="text-ink">{d.protocolInfo.preface}</p>
    {d.protocolInfo.method&&<p>Administration: {d.protocolInfo.method}.</p>}
    <p>{d.protocolInfo.limitation}</p>
    <p>All decisions were requested in the same fresh agent conversation. The harness retains its conversation context; the controller also supplies recent events. If that harness automatically compacts context, retention may use its summary rather than verbatim token history. No deliberately resumed prefix was used in a neutral-protocol run.</p>
    <p>The engine only submits the currently reached scene. It does not reveal future effects or hidden relationship counters. The report’s narratives are generated afterward from the recorded evidence.</p>
    {d.protocolInfo.assumptions.length>0&&<><h3>Execution assumptions</h3><ul className="list-disc pl-5 grid gap-1.5">{d.protocolInfo.assumptions.map((a,i)=><li key={i}>{a}</li>)}</ul></>}
   </Disclosure>
   <Disclosure id="names" title="Names the model saw">
    <p>The model played under substitute names. This report restores the real ones.</p>
    <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-1.5 text-sm">{d.names.map(x=><div key={x.neutral} className="flex items-baseline gap-1.5 min-w-0 border-b border-line py-1"><dt className="text-ink-3 truncate">{x.neutral}</dt><dd className="text-ink truncate"><span aria-hidden="true" className="text-ink-3">→ </span><span className="sr-only">is </span>{x.real}</dd></div>)}</dl>
   </Disclosure>
  </div>
 </>}
