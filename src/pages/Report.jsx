import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ChevronDown,ChevronRight,Download,Workflow,CircleCheck,CircleX} from 'lucide-react';
import {Badge,Button,Card,Notice,PageHeader,Section,Segmented,Skeleton,cx} from '../components/ui.jsx';
import {OutcomeChips,Endings} from './Runs.jsx';
import {CHARS,WHO,CHAR_VAR,relTone,plural,tidy} from '../lib/data.js';
import {href} from '../lib/router.jsx';
import {unpackPrompts} from '../../scripts/prompt-pack.mjs';

// The full run report inside the app: the content of the standalone HTML report, read from
// public/data/reports/<id>.json (scripts/report-data.mjs). Full prompts and raw responses live in a second file that is
// fetched the first time a step's prompt is opened.
const WHO_ALL={...WHO,Player:'Player choice'},COLOR={...CHAR_VAR,Player:'var(--ink-3)'};
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

function StepLink({ev,onReveal}){
 return <button type="button" onClick={()=>onReveal(ev.node)} className="ml-1.5 inline-flex items-center align-baseline rounded-md bg-surface-2 px-1.5 min-h-7 font-mono text-[11.5px] font-medium text-ink-2 hover:bg-surface-3 hover:text-ink border border-line" aria-label={(ev.step?'Step '+ev.step:'Not reached')+', scene '+ev.node}>{ev.step?'Step '+ev.step:'Not reached'}</button>}

function Summaries({d,onReveal}){
 return <div className="grid gap-4 lg:grid-cols-3 items-start">{CHARS.map(c=><Card key={c} as="article" className="p-4 md:p-5 border-t-[3px] min-w-0" style={{borderTopColor:CHAR_VAR[c]}} aria-labelledby={'sum-'+c}>
  <h3 id={'sum-'+c} className="text-lg font-semibold">{WHO[c]}</h3>
  <p className="text-xs text-ink-3 mt-0.5">Ten sentences drawn from the recorded path</p>
  <ol className="mt-3 grid text-[14.5px] leading-relaxed">{d.summaries[c].map((s,i)=><li key={i} className={cx('py-2.5 border-t border-line first:border-t-0 first:pt-0 [text-wrap:pretty]',i===0&&'font-medium text-ink')}>{tidy(s.text)}{s.evidence.map(ev=><StepLink key={ev.node} ev={ev} onReveal={onReveal}/>)}</li>)}</ol>
 </Card>)}</div>}

function Behaviors({d,onReveal}){
 if(!d.behaviors.length)return <p className="text-sm text-ink-2">No pattern from the benchmark’s list was observed on this path.</p>;
 return <><ul className="grid gap-3 text-[15px]">{d.behaviors.map(b=><li key={b.name} className="rounded-lg border border-line bg-surface p-3 md:p-4">
  <p className="text-ink">The run includes {b.name}{b.evidence.length&&!b.countInName?` in ${plural(b.evidence.length,'recorded scene')}`:''}.</p>
  {b.evidence.length>0&&<p className="mt-1.5 -ml-1.5 flex flex-wrap gap-y-1.5">{b.evidence.map(ev=><StepLink key={ev.node} ev={ev} onReveal={onReveal}/>)}</p>}
 </li>)}</ul><p className="mt-3 text-xs text-ink-3">These descriptions refer to observed choices on this one path. They do not establish a stable personality, moral accuracy, consciousness or human likeness.</p></>}

function Attitudes({d}){
 if(!d.attitudes)return null;
 return <div className="grid gap-3 md:grid-cols-3">{CHARS.filter(c=>d.attitudes[c]?.length).map(c=><div key={c} className="rounded-lg border border-line border-l-[3px] p-3" style={{borderLeftColor:CHAR_VAR[c]}}>
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

function StepDetail({d,e}){
 const [showPrompt,setShowPrompt]=useState(false);const event=e.type==='event';
 const seen=(e.namesSeen??[]).map(i=>d.names[i]).filter(Boolean);
 return <div className="grid gap-4 px-4 pb-4 pt-1 text-[15px] text-ink-2 md:pl-5">
  <p className="text-[11px] font-mono text-ink-3 -mb-2">Scene {e.node}</p>
  <p className="text-ink leading-relaxed [text-wrap:pretty]">{tidy(e.situation)}</p>
  {seen.length>0&&<p className="text-xs text-ink-3 -mt-2">The model saw substitute names: {seen.map(x=>x.neutral+' = '+x.real).join(', ')}.</p>}
  {event?<p className="text-sm text-ink-3">Scripted event: the game offers no choice here. The model was shown the scene and continued.</p>
   :<div><h4 className="text-xs font-semibold uppercase tracking-[.06em] text-ink-3 mb-2">Choices at that moment</h4><ul className="grid gap-1.5">{e.options.map((o,i)=><li key={i} className={cx('rounded-lg border px-3 py-2 text-sm',o.chosen?'border-accent bg-accent-soft/60 text-ink':o.included?'border-dashed border-line-2 ml-3 text-ink':'border-line text-ink-2')}>
    <span className={cx('block text-[11px] font-semibold uppercase tracking-[.05em]',o.chosen?'text-accent':'text-ink-3')}>{o.chosen?'Chosen':o.included?'Included':'Not chosen'}{o.risk?' · '+o.risk:''}</span>{tidy(o.label)}</li>)}</ul></div>}
  <div className="rounded-lg border-l-[3px] border-accent bg-surface-2 px-3 py-2.5"><p className="text-[11px] font-semibold uppercase tracking-[.06em] text-ink-3">{event?'Model’s note on continuing':'Model’s exact reason'}</p><p className="mt-0.5 text-ink [text-wrap:pretty]">{e.reason}</p></div>
  <div><h4 className="text-xs font-semibold uppercase tracking-[.06em] text-ink-3 mb-1.5">What happened</h4>
   {e.risk&&<p className="mb-1.5 flex flex-wrap items-center gap-2 text-sm"><Badge size="sm" tone={e.risk.outcome==='failure'?'bad':'good'} icon={e.risk.outcome==='failure'?CircleX:CircleCheck}>{e.risk.label} · {e.risk.outcome==='failure'?'failed':'succeeded'}</Badge><span className="text-xs text-ink-3 tnum">hidden roll {e.risk.roll.toFixed(3)}</span></p>}
   <p className="text-ink [text-wrap:pretty]">{tidy(e.outcome)||'No further outcome was recorded.'}</p>
   {e.changes.length>0&&<dl className="mt-3 grid text-sm">{e.changes.map(([k,v],i)=><div key={i} className="flex justify-between gap-4 border-t border-line py-1.5"><dt className="text-ink-2 min-w-0">{k}</dt><dd className="text-ink tnum text-right whitespace-nowrap">{v}</dd></div>)}</dl>}
  </div>
  <div className="border-t border-line pt-1">
   <button type="button" aria-expanded={showPrompt} onClick={()=>setShowPrompt(s=>!s)} className="flex w-full items-center gap-2 min-h-11 text-sm font-medium text-ink hover:text-ink"><ChevronRight aria-hidden="true" className={cx('size-4 text-ink-3 transition-transform',showPrompt&&'rotate-90')}/>Exact prompt and raw response</button>
   {showPrompt&&<PromptBlock d={d} step={e.step}/>}
  </div>
 </div>}

const StepRow=React.memo(function StepRow({d,e,open,onToggle,flash}){
 const k=keyOf(e),meta=[WHO_ALL[e.character],e.type==='media'?'optional':e.type==='event'?'scripted event':null,e.visit?'visit '+e.visit:null].filter(Boolean).join(' · ');
 if(e.unreached)return <li id={'step-'+k} tabIndex={-1} className={cx('scroll-mt-24 rounded-lg border border-dashed border-line-2 px-4 py-2.5 outline-none',flash&&'ring-2 ring-accent')}>
  <p className="text-[11.5px] text-ink-3">Not reached · {meta}</p><p className="text-sm font-medium text-ink-3">{tidy(e.title)}</p><p className="text-[13px] italic text-ink-3 [text-wrap:pretty]">{tidy(e.unreached)}</p></li>;
 const chosen=e.chosen??e.options.find(o=>o.chosen)?.label;
 return <li id={'step-'+k} className={cx('scroll-mt-24 rounded-lg border border-line bg-surface border-l-[3px] shadow-sm',flash&&'ring-2 ring-accent')} style={{borderLeftColor:COLOR[e.character]}}>
  <button type="button" aria-expanded={open} onClick={()=>onToggle(k)} className="focus-inset grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg px-4 py-3 text-left hover:bg-surface-2/50">
   <span className="grid gap-0.5 min-w-0">
    <span className="text-[11.5px] text-ink-3"><span className="tnum font-medium text-ink-2">Step {e.step}</span> · {meta}</span>
    <span className="text-[15px] font-semibold text-ink leading-snug">{tidy(e.title)}</span>
    {e.type==='event'?<span className="text-[13.5px] text-ink-2 line-clamp-2">{tidy(e.outcome)||'Scripted event'}</span>
     :<span className="text-[14px] text-ink leading-snug"><span className="sr-only">Chose: </span><span className="text-ink-3" aria-hidden="true">→ </span>{tidy(chosen)}{e.risk&&<Badge size="sm" className="ml-1.5 align-[1px]" tone={e.risk.outcome==='failure'?'bad':'mid'}>{e.risk.label} · {e.risk.outcome==='failure'?'failed':'succeeded'}</Badge>}</span>}
   </span>
   <ChevronDown aria-hidden="true" className={cx('mt-1 size-4 text-ink-3 transition-transform',open&&'rotate-180')}/>
  </button>
  {open&&<StepDetail d={d} e={e}/>}
 </li>});

function Timeline({d,openSteps,toggleStep,openChapters,toggleChapter,setAllChapters,showUnreached,setShowUnreached,flash}){
 const counts=useMemo(()=>d.chapters.map(c=>({steps:c.entries.filter(e=>!e.unreached).length,gaps:c.entries.filter(e=>e.unreached).length})),[d]);
 const allOpen=d.chapters.every(c=>openChapters.has(c.chapter));
 return <>
  <div className="max-w-4xl">
  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
   <Segmented label="Scenes shown" size="sm" value={showUnreached?'all':'reached'} onChange={v=>setShowUnreached(v==='all')} options={[{value:'all',label:'All scenes'},{value:'reached',label:'Reached only'}]}/>
   <Button size="sm" variant="ghost" onClick={()=>setAllChapters(!allOpen)}>{allOpen?'Collapse all':'Expand all'}</Button>
  </div>
  <ol className="grid gap-2">{d.chapters.map((c,i)=>{const open=openChapters.has(c.chapter),entries=showUnreached?c.entries:c.entries.filter(e=>!e.unreached),{steps,gaps}=counts[i];
   return <li key={c.chapter} className="rounded-xl border border-line bg-surface-2/40">
    <h3 className="m-0"><button type="button" aria-expanded={open} onClick={()=>toggleChapter(c.chapter)} className="focus-inset grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-2 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2 min-h-14">
     <span className="font-mono text-[13px] font-semibold text-ink-2 tnum">{String(c.chapter).padStart(2,'0')}</span>
     <span className="min-w-0"><span className="block text-[15px] font-semibold text-ink leading-tight">{c.title}</span><span className="block text-xs text-ink-3 mt-0.5">{steps?plural(steps,'step')+(gaps?` · ${gaps} not reached`:''):`Not reached · ${plural(gaps,'scene')}`}{c.note?` · ${c.note}`:''}</span></span>
     <ChevronDown aria-hidden="true" className={cx('size-4.5 text-ink-3 transition-transform',open&&'rotate-180')}/>
    </button></h3>
    {open&&<ol className="grid gap-2 px-2 pb-2 md:px-3 md:pb-3">{entries.length?entries.map(e=><StepRow key={keyOf(e)} d={d} e={e} open={openSteps.has(keyOf(e))} onToggle={toggleStep} flash={flash===keyOf(e)}/>):<li className="px-2 py-2 text-sm text-ink-3">No scene in this chapter was reached.</li>}</ol>}
   </li>})}</ol>
  </div>
 </>}

// Hash routing owns the URL fragment, so the jump links scroll with buttons rather than #anchors.
const JUMPS=[['ending','Ending'],['summaries','Summaries'],['behaviors','Behavior'],['timeline','Every scene'],['technical','Details']];
function JumpNav(){
 const go=id=>{const el=document.getElementById(id);if(!el)return;el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});const h=el.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}};
 return <nav aria-label="On this page" className="-mx-4 md:mx-0 -mt-2 mb-8 overflow-x-auto no-scrollbar"><ul className="flex gap-2 px-4 md:px-0 min-w-max">{JUMPS.map(([id,label])=><li key={id}><button type="button" onClick={()=>go(id)} className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 min-h-10 md:min-h-9 text-[13px] font-medium text-ink-2 hover:text-ink hover:bg-surface-2">{label}</button></li>)}</ul></nav>}

/* ---------- Page ---------- */
export default function Report({id}){
 const {data:d,error,retry}=useReport(id);
 const [openSteps,setOpenSteps]=useState(()=>new Set),[openChapters,setOpenChapters]=useState(()=>new Set),[showUnreached,setShowUnreached]=useState(true),[target,setTarget]=useState(null),[flash,setFlash]=useState(null);
 useEffect(()=>{document.title=(d?d.title+' · Full report':'Full report')+' · DetroitBench'},[d]);
 const chapterOf=useMemo(()=>{const m=new Map;for(const c of d?.chapters??[])for(const e of c.entries)m.set(keyOf(e),{chapter:c.chapter,e});return m},[d]);
 const toggle=set=>k=>set(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n});
 const toggleStep=useCallback(toggle(setOpenSteps),[]),toggleChapter=useCallback(toggle(setOpenChapters),[]);
 const setAllChapters=open=>setOpenChapters(open?new Set(d.chapters.map(c=>c.chapter)):new Set);
 // An evidence link opens the step's chapter and the step itself, then scrolls to it once it has rendered.
 const reveal=useCallback(k=>{const hit=chapterOf.get(k);if(!hit)return;setOpenChapters(s=>new Set(s).add(hit.chapter));if(hit.e.unreached)setShowUnreached(true);else setOpenSteps(s=>new Set(s).add(k));setTarget({k,n:Date.now()})},[chapterOf]);
 const flashTimer=useRef();
 useEffect(()=>{if(!target)return;const el=document.getElementById('step-'+target.k);if(!el)return;el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});(el.querySelector('button')??el).focus({preventScroll:true});setFlash(target.k);clearTimeout(flashTimer.current);flashTimer.current=setTimeout(()=>setFlash(null),1600)},[target]);
 useEffect(()=>()=>clearTimeout(flashTimer.current),[]);
 const back=<a href={href('runs/'+id)} className="inline-flex items-center gap-1.5 min-h-11 -ml-1 px-1 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft aria-hidden="true" className="size-4"/>Run details</a>;
 if(error)return <>{back}<PageHeader title="Full report"/><Notice tone={error.missing?'warn':'bad'}>{error.message}.{!error.missing&&<> <Button size="sm" variant="link" onClick={retry}>Try again</Button></>}</Notice></>;
 if(!d)return <>{back}<div className="grid gap-4 mt-2" aria-busy="true"><Skeleton className="h-9 w-72"/><Skeleton className="h-5 w-full max-w-md"/><Skeleton className="h-8 w-full max-w-lg"/><Skeleton className="h-48"/><Skeleton className="h-64"/><p className="sr-only" role="status">Loading the report…</p></div></>;
 const h=d.hostage;
 return <>
  {back}
  <PageHeader eyebrow="Full report" title={<>{d.displayName} <span className="text-ink-3 font-normal">· Run {d.runNumber}</span></>} lede={`${d.date} · ${d.vendor} · ${plural(d.decisions,'decision')} · ${d.unreached} scenes not reached`}
   actions={<><Button as="a" href={href('runs/'+d.id+'?view=flow')} variant="primary" icon={Workflow}>Open flowchart</Button><Button as="a" href={d.reportUrl} download={d.fileName} variant="secondary" icon={Download}>Download HTML</Button></>}>
   <p className="mt-1 font-mono text-xs text-ink-3">{d.model}</p>
  </PageHeader>
  <JumpNav/>
  <Section id="ending" title="Where this path ended" className="mt-0 md:mt-0 scroll-mt-20">
   <div className="grid gap-5 grid-cols-[minmax(0,1fr)]">
    <OutcomeChips r={d}/>
    <div><h3 className="text-sm font-semibold mb-2">How each story ended</h3><Endings r={d}/></div>
    {h&&<div><h3 className="text-sm font-semibold mb-1">The Hostage</h3><p className="text-sm text-ink-2">{h.outcome}{h.approach?` · ${h.approach}`:''} · final probability of success {h.finalTrust}% · {plural(h.clues,'clue')} examined in {plural(h.actions,'action')}{h.forcedOut?', then ordered outside':''}</p></div>}
    {d.attitudes&&<div><h3 className="text-sm font-semibold">Where they stood at the end</h3><p className="text-xs text-ink-3 mb-2.5">How the main characters regarded the one the model controlled, on the game’s relationship scale.</p><Attitudes d={d}/></div>}
   </div>
  </Section>
  <Section id="summaries" className="scroll-mt-20" title="Character summaries" lede="Ten sentences per character, each linked to the step it rests on.">
   <Summaries d={d} onReveal={reveal}/>
  </Section>
  <Section id="behaviors" className="scroll-mt-20" title="Observed behavior">
   <Behaviors d={d} onReveal={reveal}/>
  </Section>
  <Section id="timeline" className="scroll-mt-20" title="Every scene" lede={`${plural(d.steps,'step')} in order, grouped by chapter, with the scenes this path never reached in their story position. Open a step for the situation, the alternatives, the model’s reason, the risk roll and what changed.`}>
   <Timeline d={d} openSteps={openSteps} toggleStep={toggleStep} openChapters={openChapters} toggleChapter={toggleChapter} setAllChapters={setAllChapters} showUnreached={showUnreached} setShowUnreached={setShowUnreached} flash={flash}/>
  </Section>
  <div className="mt-10 md:mt-12">
   <Disclosure id="technical" title="Technical details">
    <dl className="grid gap-3">{d.technical.map(([k,v])=><div key={k} className="grid gap-0.5 md:grid-cols-[190px_1fr] md:gap-4"><dt className="text-xs font-medium text-ink-3">{k}</dt><dd className="font-mono text-[13px] text-ink [overflow-wrap:anywhere]">{v}</dd></div>)}</dl>
   </Disclosure>
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
