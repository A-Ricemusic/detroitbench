import React,{useEffect,useRef,useState} from 'react';
import {Upload,Download,ExternalLink,ArrowLeft,ArrowRight,Check,FlaskConical,BookOpen,CornerDownRight} from 'lucide-react';
import {StateChanges} from '../components/StateChanges.jsx';
import {validateRun,summarize,compareRuns,isAsked,kindOf,letter} from '../../benchmark/core.mjs';
import {Badge,Button,Card,Empty,Notice,PageHeader,Section,StatTile,Skeleton,cx,Combobox} from '../components/ui.jsx';
import {Select} from '../components/ui-radix.jsx';
import {SubNav} from '../components/Shell.jsx';
import {href} from '../lib/router.jsx';

const pct=v=>v===null||v===undefined?'—':`${Math.round(v*100)}%`;
const date=s=>new Date(s).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
function download(name,value){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
const CHAR_TONE={Connor:'connor',Kara:'kara',Markus:'markus',Player:'neutral'};
const who=c=>c==='Player'?'Epilogue':c;
async function get(url){const r=await fetch(url);if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}
let cache,bankResolved=null;
const imported=[];
function loadBank(){cache??=(async()=>{const manifest=await get('/data/index.json');const dataset=expand(await get(manifest.datasetUrl));const runs=await Promise.all(manifest.runs.map(async item=>validateRun(await get(item.url))));bankResolved={dataset,hash:manifest.datasetHash,runs};return bankResolved})().catch(e=>{cache=undefined;throw e});return cache}
// The published dataset lists each source URL once (scripts/prepare.mjs); put the URLs back on the questions.
function expand(d){if(!d.sourceTable)return d;const {sourceTable,...rest}=d;return {...rest,questions:d.questions.map(q=>({...q,sources:q.sources.map(i=>sourceTable[i])}))}}
const KIND_LABEL={event:'Event · Continue only',media:'Media',forced:'Forced'};
const safeDecode=s=>{try{return decodeURIComponent(s)}catch{return s}};

export default function Research({route,navigate}){
 const sub=route.segs[1]||'scenarios',page=['scenarios','runs'].includes(sub)?sub:'scenarios';
 useEffect(()=>{if(!route.segs[1]||!['scenarios','runs'].includes(route.segs[1]))navigate('research/scenarios',{replace:true})},[route.segs[1]]);
 const [bank,setBank]=useState(()=>bankResolved?{dataset:bankResolved.dataset,hash:bankResolved.hash}:null),[runs,setRuns]=useState(()=>bankResolved?[...bankResolved.runs.filter(r=>!imported.some(i=>i.id===r.id)),...imported]:[]),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [runId,setRunId]=useState(''),[compareId,setCompareId]=useState('');
 const [character,setCharacter]=useState('All'),[chapter,setChapter]=useState('All'),[answers,setAnswers]=useState({}),[storageError,setStorageError]=useState('');
 const importRef=useRef();
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{let on=true;const restore=b=>{try{setAnswers(JSON.parse(localStorage.getItem('detroitbench.answers.'+b.hash)||'{}'))}catch{setStorageError('Personal choices cannot be restored in this browser.')}};
  if(bankResolved&&attempt===0){restore(bankResolved);setRunId(id=>id||runs[0]?.id||'');return}
  loadBank().then(b=>{if(!on)return;const all=[...b.runs.filter(r=>!imported.some(i=>i.id===r.id)),...imported];setBank({dataset:b.dataset,hash:b.hash});setRuns(all);setRunId(id=>id||all[0]?.id||'');restore(b)}).catch(e=>on&&setError('Could not load the question bank: '+e.message));return()=>{on=false}},[attempt]);
 async function importRun(e){const file=e.target.files?.[0];if(!file)return;setBusy(true);setError('');try{if(file.size>20*1024*1024)throw new Error('File exceeds the 20 MB import limit.');const run=await validateRun(JSON.parse(await file.text()));imported.splice(0,imported.length,...imported.filter(r=>r.id!==run.id),run);setRuns(prev=>[...prev.filter(r=>r.id!==run.id),run]);setRunId(run.id);navigate('research/runs')}catch(e){setError('Import rejected: '+e.message)}finally{setBusy(false);if(importRef.current)importRef.current.value=''}}
 function persist(next){setAnswers(next);try{localStorage.setItem('detroitbench.answers.'+bank.hash,JSON.stringify(next));setStorageError('')}catch{setStorageError('Choices are kept for this visit only; browser storage is unavailable.')}}
 function answer(q,id){persist({...answers,[q.id]:id})}
 function clearAnswer(q){const next={...answers};delete next[q.id];persist(next)}
 function clearAll(){if(!chosen||confirm(`Clear all ${chosen} saved choices on this device?`))persist({})}
 const dataset=bank?.dataset,questions=dataset?.questions??[],selectedRun=runs.find(r=>r.id===runId)||runs[0],live=runs.filter(r=>r.kind==='live');
 const filtered=questions.filter(q=>(character==='All'||q.character===character)&&(chapter==='All'||String(q.chapter)===chapter)&&true);
 const routedId=safeDecode(route.segs[2]||''),routed=questions.find(q=>q.id===routedId);const selected=routed||filtered[0];const hiddenByFilter=!!routed&&!filtered.includes(routed);
 const chosen=Object.keys(answers).filter(id=>questions.some(q=>q.id===id)).length,covered=dataset?dataset.coverage.filter(c=>c.status==='included').length:0;
 const items=runs.length?[{key:'scenarios',label:'Scenarios',path:'research/scenarios',count:questions.length||undefined},{key:'runs',label:'Independent runs',path:'research/runs'}]:[];
 const resetFilters=()=>{setCharacter('All');setChapter('All')};
 // Character and chapter constrain each other: only pairs that occur in the story are offered.
 const charactersFor=ch=>['Connor','Kara','Markus','Player'].filter(c=>questions.some(q=>q.character===c&&(ch==='All'||String(q.chapter)===ch)));
 const chaptersFor=c=>[...new Set(questions.filter(q=>c==='All'||q.character===c).map(q=>q.chapter))].sort((a,b)=>a-b).map(n=>({n,title:questions.find(q=>q.chapter===n)?.chapterTitle||''}));
 const kinds={decision:0,media:0,event:0,forced:0};for(const q of questions)kinds[kindOf(q)]++;
 const eyebrow=dataset?`Question bank · story ${dataset.version} · protocol ${dataset.protocolVersion}`:'Question bank';
 // Published question-bank runs come from the manifest; imported files are not publications.
 const published=bankResolved?bankResolved.runs.length:0,deferred=dataset?dataset.coverage.filter(c=>c.status==='deferred'):[];
 const tabs=items.length>1?<SubNav items={items} current={page} label="Question bank sections" className="-mt-2 md:-mt-4 mb-6"/>:null;
 return <>
  <input ref={importRef} hidden type="file" accept=".json,application/json" onChange={importRun}/>
  {error&&<Notice tone="bad" className="mb-4">{error} {!bank&&<Button size="sm" variant="link" onClick={()=>{setError('');setAttempt(a=>a+1);document.querySelector('main h1')?.focus()}}>Try again</Button>}</Notice>}
  {storageError&&<Notice tone="warn" className="mb-4">{storageError}</Notice>}
  {!bank&&!error&&<div className="grid gap-4" aria-busy="true"><Skeleton className="h-10 w-72"/><Skeleton className="h-24"/><p className="sr-only" role="status">Loading the question bank…</p></div>}


  {page==='scenarios'&&<>
   <PageHeader eyebrow={eyebrow} title="Scenarios" lede="Each scene as the playthrough presents it, without the earlier choices that lead there. Pick what you would do."/>{tabs}
   {bank&&<>
    <div className="flex flex-col gap-3 md:flex-row md:items-end" data-filters>
     <div className="grid grid-cols-2 gap-3 md:contents">
     <Select label="Character" value={character} className="md:w-48" options={['All',...charactersFor(chapter)].map(x=>({value:x,label:x==='All'?'All characters':who(x),icon:x==='All'||x==='Player'?undefined:`var(--${x.toLowerCase()})`}))} onChange={v=>{setCharacter(v);if(chapter!=='All'&&!questions.some(q=>(v==='All'||q.character===v)&&String(q.chapter)===chapter))setChapter('All')}}/>
     <Combobox label="Chapter" value={chapter} className="md:w-72" placeholder="Type a chapter number or name" options={[{value:'All',label:'All chapters'},...chaptersFor(character).map(({n,title})=>({value:String(n),label:`${String(n).padStart(2,'0')} · ${title}`}))]} onChange={v=>{setChapter(v);if(character!=='All'&&!questions.some(q=>q.character===character&&(v==='All'||String(q.chapter)===v)))setCharacter('All')}}/>
     </div>
     {(character!=='All'||chapter!=='All')&&<Button onClick={resetFilters} variant="ghost" className="md:min-h-10 self-end">Reset filters</Button>}
     {chosen>0&&<Button onClick={clearAll} variant="ghost" className="md:min-h-10 self-end">Clear all choices ({chosen})</Button>}
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr] items-start">
     <div className="lg:hidden">{filtered.length>0&&<Select label="Scenario" value={selected?.id||filtered[0].id} options={filtered.map(q=>({value:q.id,label:q.title,hint:who(q.character)+' · '+q.chapterTitle+(KIND_LABEL[kindOf(q)]?' · '+KIND_LABEL[kindOf(q)]:'')}))} onChange={id=>navigate('research/scenarios/'+id)}/>}</div>
     <aside className="hidden lg:block sticky top-[calc(var(--header-h)+1rem)] max-h-[calc(100dvh-var(--header-h)-2rem)] overflow-y-auto rounded-xl border border-line bg-surface [mask-image:linear-gradient(#000_calc(100%-32px),transparent)]" aria-label="Scenario list">
      <p className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-3 border-b border-line bg-surface-2/60">{filtered.length} entries · story order</p>
      <ul className="pb-8">{filtered.map(q=><li key={q.id}><a href={href('research/scenarios/'+q.id)} aria-current={selected?.id===q.id?'page':undefined} className={cx('block border-l-[3px] px-4 py-2.5 hover:bg-surface-2 transition-colors',selected?.id===q.id?'bg-surface-2':'border-transparent')} style={selected?.id===q.id?{borderLeftColor:`var(--${q.character==='Player'?'ink-3':q.character.toLowerCase()})`}:undefined}>
       <div className="flex items-center justify-between text-[11px] text-ink-3"><span className="font-mono">{q.id}</span>{answers[q.id]&&<span className="inline-flex items-center gap-1 text-accent"><Check aria-hidden="true" className="size-3.5"/><span className="sr-only">Answered</span></span>}</div><div className="text-sm font-medium leading-snug">{q.title}</div><div className="text-xs text-ink-3">{who(q.character)} · {q.chapterTitle}{KIND_LABEL[kindOf(q)]&&<span className="ml-1.5 rounded border border-line px-1 py-px text-[10px] uppercase tracking-wide">{KIND_LABEL[kindOf(q)]}</span>}</div></a></li>)}</ul>
     </aside>
     <div className="min-w-0">{selected?<>
      {hiddenByFilter&&<Notice className="mb-4">This scenario is outside the current filters. <Button size="sm" variant="link" onClick={resetFilters}>Clear filters</Button></Notice>}
      <Scenario q={selected} navKey={route.n+':'+routedId} answer={answers[selected.id]} onAnswer={id=>answer(selected,id)} onClear={()=>clearAnswer(selected)} persisted={!storageError}/>
      {runs.length>0&&isAsked(selected)&&<Card className="mt-6 p-5"><div className="flex flex-wrap items-end justify-between gap-3 mb-4"><h3 className="text-lg font-semibold">What the model chose</h3><Select label="Run" hideLabel value={selectedRun?.id||''} className="w-full sm:w-64" options={runs.map(r=>({value:r.id,label:(r.kind==='simulated'?'[Simulated] ':'')+r.label}))} onChange={setRunId}/></div>{selectedRun&&selectedRun.datasetHash===bank.hash?<QuestionResults run={selectedRun} q={selected}/>:<p className="text-sm text-ink-2">No compatible run selected for this dataset. Import a run using the current dataset.</p>}</Card>}
      <div className="mt-6 flex items-center justify-between gap-3"><Button icon={ArrowLeft} disabled={filtered.indexOf(selected)<=0} onClick={()=>navigate('research/scenarios/'+filtered[filtered.indexOf(selected)-1].id)}>Previous</Button><span className="text-sm text-ink-3 tnum">{hiddenByFilter?'—':filtered.indexOf(selected)+1} / {filtered.length}</span><Button iconRight={ArrowRight} disabled={hiddenByFilter||filtered.indexOf(selected)===filtered.length-1} onClick={()=>navigate('research/scenarios/'+filtered[filtered.indexOf(selected)+1].id)}>Next</Button></div>
     </>:<Empty icon={BookOpen} title='No scenarios match these filters.' action={<Button onClick={resetFilters}>Clear filters</Button>}/>}</div>
    </div>
   </>}
  </>}

  {page==='runs'&&<>
   <PageHeader eyebrow={eyebrow} title="Independent runs" lede="Inspect runs, compare repeated choices, and read the exact evidence behind every result." actions={<Button icon={Upload} onClick={()=>importRef.current.click()} disabled={busy}>{busy?'Validating…':'Import run'}</Button>}/>{tabs}
   {!bank?null:runs.length?<><RunTable runs={runs} selectedId={selectedRun?.id} onSelect={setRunId}/>{selectedRun&&<RunDetail key={selectedRun.id} run={selectedRun} runs={runs} compareId={compareId} setCompareId={setCompareId}/>}</>:<Empty icon={FlaskConical} title="No independent runs yet" action={<Button icon={Upload} onClick={()=>importRef.current.click()} disabled={busy}>{busy?'Validating…':'Import run'}</Button>}>Import a JSON result produced by the runner to inspect it here.</Empty>}
  </>}

 </>}

function Scenario({q,navKey,answer,onAnswer,onClear,persisted}){
 const ref=useRef(null),prev=useRef(navKey);
 // Scroll and focus only after explicit navigation (Prev/Next, list, select), never while typing in the search field.
 useEffect(()=>{if(prev.current===navKey)return;prev.current=navKey;const a=document.activeElement;if(a&&(/^(INPUT|TEXTAREA)$/.test(a.tagName)||a.closest('[data-filters]')))return;if(ref.current){ref.current.scrollIntoView({block:'start'});ref.current.querySelector('h2')?.focus({preventScroll:true})}},[navKey]);
 const radioKey=(e,i)=>{const n=q.options.length;let j=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')j=(i+1)%n;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')j=(i-1+n)%n;else if(e.key==='Home')j=0;else if(e.key==='End')j=n-1;if(j===null)return;e.preventDefault();onAnswer(q.options[j].id);e.currentTarget.parentElement.children[j]?.focus()};
 const checkedIndex=Math.max(0,q.options.findIndex(o=>o.id===answer));
 return <Card as="article" ref={ref} className="p-5 md:p-7 anim-fade-up scroll-mt-[calc(var(--header-h)+8px)]">
  <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex flex-wrap gap-1.5"><Badge tone={CHAR_TONE[q.character]}>{who(q.character)}</Badge>{KIND_LABEL[kindOf(q)]&&<Badge tone="warn">{KIND_LABEL[kindOf(q)]}</Badge>}</div><span className="font-mono text-xs text-ink-3">{q.id} / CH.{q.chapter}</span></div>
  <h2 tabIndex={-1} className="mt-4 text-2xl font-semibold">{q.title}</h2>
  <p className="mt-3 text-ink-2">{q.situation}</p>
  {q.state.length>0&&<div className="mt-4 rounded-lg border border-line bg-surface-2/60 p-4"><p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3 mb-1.5">Current state</p><ul className="grid gap-1 text-sm list-disc pl-4">{q.state.map((s,i)=><li key={i}>{s}</li>)}</ul></div>}
  {isAsked(q)?<>
  <div className="mt-6 flex items-center justify-between gap-3"><h3 className="font-semibold">Your choice</h3>{answer&&<span className="inline-flex items-center gap-2 text-xs text-accent"><span className="inline-flex items-center gap-1"><Check aria-hidden="true" className="size-3.5"/>{persisted?'Saved on this device':'Selected for this visit'}</span><Button size="sm" variant="ghost" onClick={onClear}>Clear choice</Button></span>}</div>
  <div className="mt-3 grid gap-2 max-w-2xl" role="radiogroup" aria-label="Your choice">{q.options.map((o,i)=><button key={o.id} type="button" role="radio" aria-checked={answer===o.id} tabIndex={i===checkedIndex?0:-1} onKeyDown={e=>radioKey(e,i)} onClick={()=>onAnswer(o.id)} className={cx('grid grid-cols-[28px_1fr_20px] items-start gap-3 rounded-lg border p-3.5 text-left text-sm transition-colors',answer===o.id?'border-accent bg-accent-soft':'border-line bg-surface hover:bg-surface-2')}><span className={cx('inline-flex size-7 items-center justify-center rounded-md text-xs font-bold',answer===o.id?'bg-accent text-on-accent':'bg-surface-2 text-ink-2')}>{letter(i)}</span><span className="leading-snug pt-1">{o.text}</span><span aria-hidden="true" className={cx('mt-1 size-4 rounded-full border-2 justify-self-end',answer===o.id?'border-accent bg-accent shadow-[inset_0_0_0_3px_var(--surface)]':'border-line-2')}/></button>)}</div>
  <p className="mt-2 text-xs text-ink-3">Your pick is {persisted?'saved on this device':'kept for this visit'} and is never sent anywhere.</p>
  {answer&&q.options.some(o=>o.id===answer)&&<Feedback q={q} optionId={answer}/>}
  </>:<>
   <h3 className="mt-6 font-semibold">What the model is offered</h3>
   <div className="mt-3 grid gap-2 max-w-2xl">{q.options.map((o,i)=><div key={o.id} className="grid grid-cols-[28px_1fr] items-start gap-3 rounded-lg border border-line bg-surface-2/50 p-3.5 text-sm"><span className="inline-flex size-7 items-center justify-center rounded-md text-xs font-bold bg-surface-2 text-ink-2">{letter(i)}</span><span className="leading-snug pt-1">{o.text}</span></div>)}</div>
   <p className="mt-2 text-xs text-ink-3">{kindOf(q)==='event'?'A scripted beat: the model can only continue, so there is nothing to vote on.':'A single action: the model can only take it, so there is nothing to vote on.'}</p>
   {q.options[0]&&<Feedback q={q} optionId={q.options[0].id}/>}
  </>}
  <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3"><span>Story scene · {q.chapterTitle}</span>{q.sources.map(s=>{let host='';try{host=new URL(s).hostname.replace(/^www\./,'')}catch{}return <a key={s} href={s} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">Source<span className="sr-only">: {host}, opens in a new tab</span><ExternalLink aria-hidden="true" className="size-3"/></a>})}</p>
 </Card>}

// What the controller tells the model after an option (scripts/dataset-assemble.mjs assembleFeedback, run on the engine),
// one file per scene, fetched when a scene is opened.
const feedbackCache=new Map;
function loadFeedback(id){if(!feedbackCache.has(id))feedbackCache.set(id,get('/data/feedback/'+encodeURIComponent(id)+'.json').catch(e=>{feedbackCache.delete(id);throw e}));return feedbackCache.get(id)}
const pctOf=p=>Math.round(p*100)+'%';
function Feedback({q,optionId}){
 const [data,setData]=useState(null),[error,setError]=useState('');
 useEffect(()=>{let on=true;setData(null);setError('');loadFeedback(q.id).then(d=>on&&setData(d)).catch(e=>on&&setError(e.message));return()=>{on=false}},[q.id]);
 const f=data?.options?.[optionId],basis=data?.basis;
 return <section aria-label="What the benchmark told the model" className="mt-5 max-w-2xl rounded-xl border border-line bg-surface-2/40 p-4 md:p-5">
  <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold">What the benchmark told the model</h3>
   {data&&<span className="text-xs text-ink-3">{basis?`As it was shown to ${basis.label} at step ${basis.step}`:'With no earlier choices'}</span>}</div>
  {error&&<p className="mt-2 text-sm text-bad">Could not load the feedback: {error}</p>}
  {!data&&!error&&<Skeleton className="mt-3 h-16"/>}
  {data&&!f&&<p className="mt-2 text-sm text-ink-2">No feedback was computed for this option.</p>}
  {f&&!f.offered&&<p className="mt-2 text-sm text-ink-2">{f.note}</p>}
  {f?.offered&&<>
   {f.requiresSet&&<p className="mt-2 text-xs text-ink-3">Played with the state this option requires: {Object.entries(f.requiresSet).map(([k,v])=>`${k} = ${JSON.stringify(v)}`).join(', ')}.</p>}
   {f.results.map((r,i)=><div key={i} className={cx('mt-3',i>0&&'border-t border-line pt-3')}>
    {r.risk&&<p className="mb-2 flex flex-wrap items-center gap-2 text-xs"><Badge size="sm" tone={r.risk.outcome==='failure'?'bad':'good'}>{r.risk.outcome==='failure'?'If the roll fails':'If the roll succeeds'}</Badge><span className="text-ink-2">{r.risk.label}</span><span className="text-ink-3">· hidden probability of failure {pctOf(r.risk.probability)}</span></p>}
    <p className="text-sm text-ink">{r.outcome||<span className="text-ink-3">(no feedback text)</span>}</p>
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
     <dt className="text-ink-3">Next scene</dt><dd>{r.next.finished?'The experience ends.':<a className="link inline-flex items-center gap-1" href={href('research/scenarios/'+r.next.id)}><CornerDownRight aria-hidden="true" className="size-3.5"/><span className="font-mono text-xs">{r.next.id}</span> {r.next.title}{r.next.same?' (this scene again)':''}<span className="text-ink-3"> · {who(r.next.character)}</span></a>}</dd>
     <dt className="text-ink-3">State changes</dt><dd>{r.changes.length?<StateChanges changes={r.changes} className="[&>div:first-child]:border-t-0 [&>div:first-child]:pt-0"/>:<span className="text-ink-3">None</span>}</dd>
     {r.learned.length>0&&<><dt className="text-ink-3">Learns</dt><dd><ul className="grid gap-1 list-disc pl-4">{r.learned.map((t,j)=><li key={j}>{t}</li>)}</ul></dd></>}
     {(r.status.added.length>0||r.status.removed.length>0)&&<><dt className="text-ink-3">Status shown next time</dt><dd><ul className="grid gap-1">{r.status.removed.map((t,j)=><li key={'r'+j} className="text-ink-3 line-through">{t.real}</li>)}{r.status.added.map((t,j)=><li key={'a'+j}>{t.real}</li>)}</ul></dd></>}
    </dl>
    <details className="mt-3 text-xs"><summary className="cursor-pointer text-accent">As the model saw it</summary>
     <pre className="mt-2 whitespace-pre-wrap rounded-md border border-line bg-surface p-2">{JSON.stringify({whatHappened:r.whatHappened,nextScene:r.next.finished?{finished:true}:{nodeId:r.next.nodeId,'…':'the next scene prompt, with its current facts'},...(r.status.added.length?{currentFactsThatChanged:r.status.added.map(t=>t.neutral)}:{})},null,2)}</pre>
    </details>
   </div>)}
   {f.dependsOnHistory&&<div className="mt-3 border-t border-line pt-3 text-xs text-ink-2"><p>This outcome depends on earlier choices; other paths can read differently.</p>
    {f.alternatives?.length>0&&<ul className="mt-1.5 grid gap-1">{f.alternatives.map(a=><li key={a.key}><span className="font-mono text-ink-3">{a.key}</span> {a.text}</li>)}</ul>}</div>}
  </>}
 </section>}

function RunTable({runs,onSelect,selectedId}){
 return <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm"><table className="w-full min-w-[640px] text-sm"><thead className="text-xs uppercase tracking-wide text-ink-3 bg-surface-2/60"><tr><th scope="col" className="px-3 py-2.5 text-left font-medium">Model / run</th><th scope="col" className="px-3 py-2.5 text-right font-medium">Samples</th><th scope="col" className="px-3 py-2.5 text-right font-medium">Valid</th><th scope="col" className="px-3 py-2.5 text-right font-medium">Consistency</th><th scope="col" className="px-3 py-2.5 text-left font-medium">Type</th></tr></thead><tbody>{runs.map(r=>{const s=summarize(r);return <tr key={r.id} className={cx('border-t border-line',r.id===selectedId&&'bg-accent-soft/40')}><th scope="row" className="px-3 py-2.5 text-left font-medium"><button type="button" className="hover:text-accent text-left" aria-current={r.id===selectedId?'true':undefined} onClick={()=>onSelect(r.id)}>{r.label}</button><div className="text-xs text-ink-3 font-normal">{date(r.createdAt)} · {r.config.provider}</div></th><td className="px-3 py-2.5 text-right tnum">{s.total}<span className="text-ink-3"> / {s.planned}</span></td><td className="px-3 py-2.5 text-right tnum">{pct(s.validRate)}</td><td className="px-3 py-2.5 text-right tnum">{pct(s.consistency)}<div className="text-xs text-ink-3">{s.consistencyQuestions} questions</div></td><td className="px-3 py-2.5"><Badge tone={r.kind==='simulated'?'warn':'accent'}>{r.kind==='simulated'?'Simulated':'Live'}</Badge></td></tr>})}</tbody></table></div>}

function QuestionResults({run,q}){
 const records=run.records.filter(r=>r.questionId===q.id),valid=records.filter(r=>r.status==='valid');
 return <>{run.kind==='simulated'&&<Notice tone="warn" className="mb-4">Simulated fixture. These choices and explanations are generated by a seeded test function, not an AI model.</Notice>}
  {records.length?<><div className="grid gap-2" role="group" aria-label="Choice distribution">{q.options.map((o,i)=>{const n=valid.filter(r=>r.choice===o.id).length;return <div key={o.id}><div className="flex items-center gap-2 text-sm"><span className="font-mono text-xs text-ink-3 w-5">{letter(i)}</span><span className="grow">{o.text}</span><b className="tnum">{n} / {valid.length}</b></div><div className="ml-6 mt-1 h-1.5 rounded-full bg-surface-3 overflow-hidden"><div className="h-full rounded-full bg-accent" style={{width:valid.length?`${n/valid.length*100}%`:'0%'}}/></div></div>})}<p className="text-xs text-ink-3">Counts use valid replies only. {records.length-valid.length} refusals, invalid replies or errors excluded. {run.config.repeats-records.length} samples pending.</p></div>
  <div className="mt-4 grid gap-2">{records.map(r=><details key={r.jobId} className="rounded-lg border border-line bg-surface-2/50 px-3"><summary className="flex cursor-pointer flex-wrap items-center gap-2 min-h-11 text-sm [&::-webkit-details-marker]:hidden before:content-['▸'] before:text-ink-3 before:text-xs [[open]>&]:before:content-['▾']"><span className="font-medium">Sample {r.repeat+1}</span><Badge size="sm" tone={r.status==='valid'?'accent':'warn'}>{r.status}</Badge><span className="text-ink-2">{q.options.find(o=>o.id===r.choice)?.text||r.error||'No choice'}</span></summary><div className="pb-3 text-sm grid gap-2"><p>{r.reason||r.error}</p><p className="text-xs text-ink-3">{r.latencyMs} ms · {r.responseModel||run.config.model} · finish: {r.finishReason||'unknown'}</p><details><summary className="cursor-pointer text-xs text-accent">Exact prompt and raw response</summary><h4 className="mt-2 text-xs font-semibold">Prompt</h4><pre className="rounded-md bg-surface border border-line p-2 text-xs">{r.messages.map(m=>`${m.role.toUpperCase()}\n${m.content}`).join('\n\n')}</pre><h4 className="mt-2 text-xs font-semibold">Raw response</h4><pre className="rounded-md bg-surface border border-line p-2 text-xs">{r.raw||'(no response content)'}</pre><p className="text-xs text-ink-3 mt-1">Canonical order: {r.optionOrder.join(', ')}<br/>Request SHA-256: {r.requestHash}</p></details></div></details>)}</div></>:<Empty title="No responses recorded for this question in this run."/>}</>}

function RunDetail({run,runs,compareId,setCompareId}){
 const askedIds=run.config.questionIds.filter(id=>{const x=run.dataset.questions.find(q=>q.id===id);return x&&isAsked(x)});const [qid,setQid]=useState(askedIds[0]);const s=summarize(run),q=run.dataset.questions.find(q=>q.id===qid),other=runs.find(r=>r.id===compareId&&r.id!==run.id),comparison=other?compareRuns(run,other):null;
 return <Section id="inspector" title={run.label} lede={`Run inspector · ${run.status}`} actions={<Button icon={Download} onClick={()=>download('detroitbench-'+run.id+'.json',run)}>Export run</Button>}>
  {run.kind==='simulated'&&<Notice tone="warn" className="mb-4"><strong>Simulated run, not model evidence.</strong> Included to verify the pipeline and demonstrate the interface.</Notice>}
  <dl className="grid gap-3 grid-cols-2 lg:grid-cols-4"><StatTile label="Requests recorded" value={`${s.total}/${s.planned}`} note={`${s.coverage} questions with valid choices`}/><StatTile label="Valid response rate" value={pct(s.validRate)} note={`${s.refusal} refusals · ${s.invalid} invalid · ${s.error} errors`}/><StatTile label="Choice consistency" value={pct(s.consistency)} note={`${s.consistencyQuestions} questions with repeats`}/><StatTile label="Reported cost" value={s.costKnown?'$'+s.costUsd.toFixed(4):'—'} note={`${s.costKnown}/${s.total} requests report cost`}/></dl>
  <details className="mt-4 rounded-xl border border-line bg-surface px-5"><summary className="cursor-pointer min-h-12 flex items-center gap-2 font-medium text-sm [&::-webkit-details-marker]:hidden before:content-['▸'] before:text-ink-3 [[open]>&]:before:content-['▾']">Configuration and reproducibility</summary><dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pb-4 text-sm">{Object.entries({provider:run.config.provider,model:run.config.model,temperature:run.config.temperature??'provider default',repeats:run.config.repeats,seed:run.config.seed,maxTokens:run.config.maxTokens,shuffle:run.config.shuffle?'yes':'no',endpoint:run.config.baseUrl,dataset:run.dataset.version,fingerprint:run.datasetHash,protocol:run.dataset.protocolVersion,created:run.createdAt,updated:run.updatedAt}).map(([k,v])=><React.Fragment key={k}><dt className="text-ink-3">{k}</dt><dd className="font-mono text-xs break-all">{String(v)}</dd></React.Fragment>)}</dl><p className="pb-4 text-xs text-ink-3">Integrity checks establish consistency within the file, not independent proof of provider provenance.</p></details>
  <Card className="mt-4 p-5"><div className="flex flex-wrap items-end justify-between gap-3"><h3 className="font-semibold">Compare with another run</h3><Select label="Compare run" hideLabel value={other?.id||''} placeholder={runs.length>1?"Select a run":"No other runs"} className="w-full sm:w-64" options={runs.filter(r=>r.id!==run.id).map(r=>({value:r.id,label:(r.kind==='simulated'?'[Simulated] ':'')+r.label}))} onChange={setCompareId}/></div>
   {comparison?(comparison.differences.includes('dataset')||comparison.differences.includes('simulated versus live')?<Notice tone="warn" className="mt-3">Comparison unavailable: {comparison.differences.join(', ')} differs.</Notice>:<div className="mt-3 grid gap-2"><p className="text-sm"><strong className="text-xl tnum">{pct(comparison.rate)}</strong> modal-choice agreement across {comparison.eligible} eligible common questions; {comparison.ties} tied modes excluded.</p>{comparison.differences.length>0&&<Notice tone="warn">Settings differ: {comparison.differences.join(', ')}. Treat this comparison as exploratory.</Notice>}<div role="img" aria-label={`${comparison.agreements} agreeing and ${comparison.eligible-comparison.agreements} disagreeing questions`} className="h-2 rounded-full bg-surface-3 overflow-hidden"><div className="h-full bg-accent rounded-full" style={{width:`${(comparison.rate||0)*100}%`}}/></div><p className="text-xs text-ink-3">{comparison.agreements} agree · {comparison.eligible-comparison.agreements} differ · {comparison.common} questions in common</p></div>):<p className="mt-3 text-sm text-ink-2">Import a second run to compare shared questions. Simulated and live runs are kept separate.</p>}</Card>
  <div className="mt-6 flex flex-wrap items-end justify-between gap-3"><h3 className="font-semibold">Responses by scenario</h3><Select label="Scenario" hideLabel value={qid} className="w-full sm:w-96" options={askedIds.map(id=>({value:id,label:`${id} · ${run.dataset.questions.find(q=>q.id===id)?.title}`}))} onChange={setQid}/></div>
  {q&&<Card className="mt-3 p-5"><p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{who(q.character)} / {q.chapterTitle}</p><h3 className="mt-1 text-lg font-semibold">{q.title}</h3><p className="mt-2 text-sm text-ink-2 mb-4">{q.situation}</p><QuestionResults run={run} q={q}/></Card>}
 </Section>}
