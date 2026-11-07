import React,{useEffect,useMemo,useRef,useState} from 'react';
import {FileText,Download,LayoutGrid,Rows3,CircleX,CircleAlert,Minus,ChevronRight} from 'lucide-react';
import {Badge,Button,Card,Empty,Notice,PageHeader,Section,Segmented,Select,Sheet,Skeleton,TONE_ICON,cx,useMediaQuery} from '../components/ui.jsx';
import {OutcomeChart,RunRelationships} from '../components/Charts.jsx';
import {RunFlowchart} from '../components/Flowchart.jsx';
import {CHARS,WHO,CHAR_VAR,ORDER,STATUS_TEXT,STATUS_TONE,relTone,modelColors,plural,tidy} from '../lib/data.js';
import {useLibrary} from '../lib/useLibrary.jsx';
import {announce} from '../lib/announce.jsx';
import {href} from '../lib/router.jsx';

export function OutcomeChips({r,size='md'}){
 return <ul className="flex flex-wrap gap-1.5" aria-label="Outcome at a glance">
  {ORDER.map(([k,key])=>{const s=r.status?.[key],tone=STATUS_TONE[s]??'mid';return <li key={k}><Badge size={size} tone={tone} icon={TONE_ICON[tone]}><span className="font-semibold">{k}</span><span className="opacity-70" aria-hidden="true">·</span><span className="sr-only">: </span>{STATUS_TEXT[k][s]??s}</Badge></li>})}
  {r.endings.contaminated&&<li><Badge size={size} tone="bad" icon={CircleAlert}>Detroit contaminated</Badge></li>}
 </ul>}

export function Endings({r}){
 return <dl className="grid gap-2">{CHARS.map(c=><div key={c} className="border-l-[3px] pl-3 min-w-0" style={{borderColor:CHAR_VAR[c]}}><dt className="sr-only">{WHO[c]}</dt><dd className="text-[13.5px] md:text-sm text-ink leading-snug [text-wrap:pretty]">{tidy(r.endings[c])}</dd></div>)}</dl>}

function Stat({value,children}){return <li className="flex flex-col"><b className="text-ink font-medium tnum text-sm leading-tight">{value}</b><span className="text-ink-3 text-[11px] leading-tight">{children}</span></li>}

function RunCard({r,onOpen}){
 return <Card as="article" className="flex flex-col p-4 md:p-5 gap-4 anim-fade-up min-w-0" aria-labelledby={'run-'+r.id}>
  <div className="flex items-start justify-between gap-3">
   <h3 id={'run-'+r.id} className="text-lg font-semibold leading-tight">{r.displayName}</h3>
   <Badge tone="neutral">{r.vendor}</Badge>
  </div>
  <OutcomeChips r={r} size="sm"/>
  <Endings r={r}/>
  <ul className="grid grid-cols-3 gap-2 border-t border-line pt-3 mt-auto" aria-label="Run statistics">
   <Stat value={r.decisions}>decisions</Stat>
   <Stat value={`${r.media.read}/${r.media.offered}`}>optional reads</Stat>
   <Stat value={`${r.risk.failed}/${r.risk.taken}`}>risk rolls lost</Stat>
  </ul>
  <div className="flex flex-wrap gap-2 -mt-1">
   <Button size="sm" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} iconRight={ChevronRight}>Details</Button>
   <Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText}>Full report</Button>
  </div>
 </Card>}

function RunTable({runs,onOpen}){
 return <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
  <table className="w-full min-w-[1080px] text-sm [&_td]:[overflow-wrap:normal] [&_th]:[overflow-wrap:normal]">
   <thead className="text-xs uppercase tracking-wide text-ink-3 bg-surface-2/60"><tr>{[['Model'],['Lab'],['Decisions','r'],['Read','r'],['Risks failed','r'],['Connor'],['Kara'],['Alice'],['Markus'],['Report','sr']].map(([h,a],i)=><th key={i} scope="col" className={cx('px-3 py-2.5 font-medium text-left whitespace-nowrap',a==='r'&&'text-right')}>{a==='sr'?<span className="sr-only">{h}</span>:h}</th>)}</tr></thead>
   <tbody>{runs.map(r=><tr key={r.id} className="border-t border-line hover:bg-surface-2/60">
    <th scope="row" className="px-3 py-2.5 text-left font-medium whitespace-nowrap"><button type="button" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} className="link text-left">{r.displayName}</button><div className="font-mono text-[11px] text-ink-3 font-normal">{r.model}</div></th>
    <td className="px-3 py-2.5 text-ink-2 whitespace-nowrap">{r.vendor}</td>
    <td className="px-3 py-2.5 text-right tnum">{r.decisions}</td>
    <td className="px-3 py-2.5 text-right tnum">{r.media.read}<span className="text-ink-3">/{r.media.offered}</span></td>
    <td className="px-3 py-2.5 text-right tnum">{r.risk.failed}<span className="text-ink-3">/{r.risk.taken}</span></td>
    {ORDER.map(([k,key])=>{const s=r.status?.[key],tone=STATUS_TONE[s]??'mid';return <td key={k} className="px-3 py-2.5"><Badge size="sm" tone={tone} icon={TONE_ICON[tone]}>{STATUS_TEXT[k][s]??s}</Badge></td>})}
    <td className="px-3 py-2.5 text-right whitespace-nowrap"><Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText}>Report</Button></td>
   </tr>)}</tbody>
  </table>
 </div>}

function RelList({items}){const order={Connor:0,Kara:1,Markus:2};const sorted=[...items].sort((a,b)=>order[a.toward]-order[b.toward]||a.who.localeCompare(b.who));return <dl className="grid gap-y-2">{sorted.map(a=><div key={a.toward+a.who} className="flex items-center gap-3 border-b border-line pb-2"><dt className="text-sm min-w-0"><b className="font-medium" style={{color:CHAR_VAR[a.toward]}}>{a.who}</b> <span className="text-ink-3">toward {a.toward}</span></dt><dd><Badge tone={relTone(a.level)||'mid'}>{a.level}</Badge></dd></div>)}</dl>}

export function RunSheet({r,scales,open,onClose,initialView,initialChapter}){
 const [view,setView]=useState(initialView==='flow'?'flow':'summary');
 if(!r)return null;
 const groups={rel:[],status:[],world:[]};
 for(const c of CHARS)for(const a of (r.attitudes?.[c]??[])){const item={...a,toward:c};if(a.who==='Public opinion'||a.who==='Jericho')groups.world.push(item);else if(a.level==='Dead'||a.level==='Alive'||a.level==='Never met'){if(!['Alice','Kara','Markus','Connor'].includes(a.who))groups.status.push(item)}else if(a.level==='Broken away')groups.world.push({...item,level:'Broke away'});else groups.rel.push(item)}
 const chapterOf=node=>r.choices.find(c=>c.node===node);
 return <Sheet wide={view==='flow'?'xl':true} open={open} onOpenChange={o=>{if(!o)onClose()}} title={r.displayName} description={<><span className="whitespace-nowrap">{r.vendor}<span className="sr-only">,</span><span aria-hidden="true"> · </span><span className="font-mono text-[13px]">{r.model}</span><span className="sr-only">,</span></span><span className="block sm:inline"><span aria-hidden="true" className="hidden sm:inline"> · </span>{r.date}</span></>}
  footer={<><Button as="a" href={href('runs/'+r.id+'/report')} variant="primary" icon={FileText}>Read full report</Button><Button as="a" href={r.reportUrl} download={r.fileName} variant="ghost" icon={Download}>Download HTML</Button></>}>
  <Segmented label="Run details view" size="sm" value={view} onChange={setView} className="mb-5" options={[{value:'summary',label:'Summary'},{value:'flow',label:'Flowchart'}]}/>
  {view==='flow'?<RunFlowchart key={r.id} r={r} initialChapter={initialChapter}/>:<div className="grid grid-cols-[minmax(0,1fr)] gap-7">
   <OutcomeChips r={r}/>
   <section><h3 className="text-sm font-semibold mb-2">How each story ended</h3><Endings r={r}/></section>
   {r.hostage&&<section><h3 className="text-sm font-semibold mb-1">The Hostage</h3><p className="text-sm text-ink-2">{r.hostage.outcome}{r.hostage.approach?` · ${r.hostage.approach}`:''} · final probability of success {r.hostage.finalTrust}% · {r.hostage.clues} {r.hostage.clues===1?'clue':'clues'} examined in {r.hostage.actions} {r.hostage.actions===1?'action':'actions'}{r.hostage.forcedOut?', then ordered outside':''}</p></section>}
   <section><h3 className="text-sm font-semibold">Relationships at the end</h3><p className="text-xs text-ink-3 mb-3">How each surviving person regarded the character the model controlled, on the game’s scale.</p>{groups.rel.length?<RelList items={groups.rel}/>:<p className="text-sm text-ink-2">No surviving relationships to report.</p>}</section>
   {(groups.status.length>0||groups.world.length>0||r.endings.contaminated)&&<section><h3 className="text-sm font-semibold mb-2">Supporting characters and the world</h3><ul className="flex flex-wrap gap-1.5">{groups.status.map(a=>{const tone=a.level==='Dead'?'bad':a.level==='Alive'?'good':'mid';return <li key={a.who}><Badge tone={tone} icon={TONE_ICON[tone]}>{a.who} · {a.level==='Dead'?'Died':a.level==='Alive'?'Survived':a.level}</Badge></li>})}{groups.world.map(a=>{const tone=relTone(a.level)||'mid';return <li key={a.who}><Badge tone={tone} icon={TONE_ICON[tone]??Minus}>{a.who}{a.level?` · ${a.level}`:''}</Badge></li>})}{r.endings.contaminated&&<li><Badge tone="bad" icon={CircleAlert}>Detroit contaminated</Badge></li>}</ul></section>}
   <section><h3 className="text-sm font-semibold mb-2">{r.risk.failures.length?`Risky actions that failed (${r.risk.failures.length} of ${r.risk.taken})`:'Risky actions'}</h3>{r.risk.failures.length?<ul className="grid gap-2">{r.risk.failures.map(f=>{const c=chapterOf(f.node);return <li key={f.node} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm items-start"><Badge tone="bad" size="sm" icon={CircleX} className="mt-0.5">{f.label}</Badge><span className="min-w-0"><span className="block">{tidy(f.title)}{c&&!/\s/.test(f.title)&&<span className="text-ink-3"> · {c.chapterTitle}</span>}</span>{c&&<span className="block text-xs text-ink-3">Chapter {c.chapter} · {c.chapterTitle} · chose “{tidy(c.choice)}”</span>}</span></li>})}</ul>:<p className="text-sm text-ink-2">Every risky action this model took succeeded ({r.risk.taken} in total).</p>}<p className="mt-1.5 text-xs text-ink-3">Failures are drawn by the benchmark, not chosen by the model.</p></section>
   <section><h3 className="text-sm font-semibold mb-1">Reading</h3><p className="text-sm text-ink-2">Read or watched optional media in {r.media.read} of {r.media.offered} magazine and broadcast scenes.</p></section>
   {scales.length>0&&<section><h3 className="text-sm font-semibold mb-3">Relationships over time</h3><RunRelationships r={r} scales={scales}/></section>}
  </div>}
 </Sheet>}

export default function Runs({route,navigate}){
 const {runs,scales,error,retry}=useLibrary();
 const [model,setModel]=useState('all'),[view,setView]=useState(()=>{try{return localStorage.getItem('detroitbench.view')==='table'?'table':'cards'}catch{return 'cards'}});
 const openedHere=useRef(false);const [sheetRun,setSheetRun]=useState(null);
 useEffect(()=>{try{localStorage.setItem('detroitbench.view',view)}catch{}},[view]);
 const byName=useMemo(()=>runs?[...runs].sort((a,b)=>a.displayName.localeCompare(b.displayName)):[],[runs]),colors=useMemo(()=>runs?modelColors(runs):{},[runs]);
 const shown=useMemo(()=>byName.filter(r=>model==='all'||r.id===model),[byName,model]);
 const lastFilter=useRef(model);useEffect(()=>{const key=model;if(!runs||key===lastFilter.current)return;lastFilter.current=key;announce(shown.length!==runs.length?`Showing ${shown.length} of ${plural(runs.length,'run')}`:`All ${plural(runs.length,'run')}`)},[model,runs,shown.length]);
 const wide=useMediaQuery('(min-width: 768px)');
 const openId=route.segs[1]||'',openRun=runs?.find(r=>r.id===openId);
 useEffect(()=>{if(openRun)setSheetRun(openRun)},[openRun]);
 const open=id=>{openedHere.current=true;navigate('runs/'+id)},close=()=>{if(openedHere.current){openedHere.current=false;history.back()}else navigate('runs',{replace:true})};
 if(error)return <><PageHeader title="Model playthroughs"/><Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice></>;
 if(!runs)return <><PageHeader title="Model playthroughs"/><div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4" aria-busy="true">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-64"/>)}</div><p className="sr-only" role="status">Loading runs…</p></>;
 return <>
  <PageHeader title={`${runs.length} models, one playthrough each`} lede="Each model played Connor, Kara and Markus under substitute names. Risky actions can fail by chance."/>
  {openId&&!openRun&&<Notice tone="warn" className="mb-6" onDismiss={()=>navigate('runs',{replace:true})}>No run with that ID is in the library.</Notice>}
  {runs.length>0&&<Section id="endings" title="Endings at a glance"><OutcomeChart runs={runs} onPick={open}/></Section>}
  <Section id="every-run" title="Every run" lede="Open a run for its relationships, failed risks and reading, or read the full report with every scene and reason."
   actions={<>
    <Select label="Model" hideLabel value={model} options={[{value:'all',label:'All models'},...byName.map(r=>({value:r.id,label:r.displayName,icon:colors[r.displayName]}))]} onChange={setModel} className="w-full sm:w-64" triggerClassName="md:min-h-9"/>
    <Segmented label="View" size="sm" value={view} onChange={setView} className="hidden md:inline-flex" options={[{value:'cards',label:'Cards',icon:LayoutGrid},{value:'table',label:'Table',icon:Rows3}]}/>
   </>}>
   {runs.length>0&&<p className="mb-3 text-sm text-ink-2">{shown.length!==runs.length?`Showing ${shown.length} of ${plural(runs.length,'run')}`:`All ${plural(runs.length,'run')}`}</p>}
   {!runs.length&&<Empty title="No completed runs yet">Fresh results appear here after their sessions finish.</Empty>}
   {shown.length>0&&view==='table'&&wide&&<RunTable runs={shown} onOpen={open}/>}
   {shown.length>0&&(view==='cards'||!wide)&&<div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">{shown.map(r=><RunCard key={r.id} r={r} onOpen={open}/>)}</div>}
  </Section>
  <RunSheet r={openRun||sheetRun} scales={scales} open={!!openRun} onClose={close} initialView={route.query.view} initialChapter={route.query.chapter}/>
 </>}
