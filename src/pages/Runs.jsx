import React,{useEffect,useMemo,useRef,useState} from 'react';
import {FileText,Download,CircleX,CircleAlert,Minus,ArrowUp,ArrowDown,ChevronsUpDown} from 'lucide-react';
import {Badge,Button,Empty,Notice,PageHeader,Section,Segmented,Select,Sheet,Skeleton,TONE_ICON,cx} from '../components/ui.jsx';
import {OUTCOMES,RunRelationships,NumChip} from '../components/Charts.jsx';
import {EndingCharts} from '../components/EndingCharts.jsx';
import {Rankings} from '../components/Rankings.jsx';
import {RunFlowchart} from '../components/Flowchart.jsx';
import {CHARS,WHO,CHAR_VAR,ORDER,STATUS_TEXT,STATUS_TONE,relTone,modelColors,modelNumbers,plural,tidy} from '../lib/data.js';
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

// Ending rank per character, worst = 0, from the same ladders the ending charts draw.
const RANK=Object.fromEntries(Object.values(OUTCOMES).map(o=>[o.field,Object.fromEntries([...o.list].reverse().map(([k],i)=>[k,i]))]));
// Sortable columns. `get` returns a tuple compared left to right; text sorts A to Z first, numbers and endings high (best) first.
const COLS=[
 {key:'model',label:'Model',get:r=>[r.displayName.toLowerCase()],text:true},
 {key:'lab',label:'Lab',get:r=>[r.vendor.toLowerCase()],text:true},
 {key:'decisions',label:'Decisions',get:r=>[r.decisions],num:true},
 {key:'read',label:'Read',get:r=>[r.media.read,r.media.offered?r.media.read/r.media.offered:0],num:true},
 {key:'risks',label:'Risks failed',get:r=>[r.risk.failed,r.risk.taken?r.risk.failed/r.risk.taken:0],num:true},
 ...ORDER.map(([k,f])=>({key:f,label:k,get:r=>[RANK[f]?.[r.status?.[f]]??-1],ending:true}))
];
const cmp=(a,b)=>{for(let i=0;i<Math.max(a.length,b.length);i++){const x=a[i]??0,y=b[i]??0;if(x<y)return -1;if(x>y)return 1}return 0};
function useSorted(runs){
 const [sort,setSort]=useState({key:'model',dir:'asc'});
 const rows=useMemo(()=>{const col=COLS.find(c=>c.key===sort.key)??COLS[0],k=sort.dir==='asc'?1:-1;return [...runs].sort((a,b)=>k*cmp(col.get(a),col.get(b))||a.displayName.localeCompare(b.displayName))},[runs,sort]);
 const by=(key,dir)=>{const col=COLS.find(c=>c.key===key);const next=dir??(sort.key===key?(sort.dir==='asc'?'desc':'asc'):col.text?'asc':'desc');setSort({key,dir:next});
  announce(`Sorted by ${col.label}, ${col.ending?(next==='desc'?'best ending first':'worst ending first'):next==='asc'?(col.text?'A to Z':'lowest first'):(col.text?'Z to A':'highest first')}`)};
 return {rows,sort,by}}
function SortHeader({col,sort,by,align}){
 const on=sort.key===col.key,Icon=on?(sort.dir==='asc'?ArrowUp:ArrowDown):ChevronsUpDown;
 return <th scope="col" aria-sort={on?(sort.dir==='asc'?'ascending':'descending'):undefined} className={cx('px-1.5 py-1.5 font-medium whitespace-nowrap',align==='r'?'text-right':'text-left')}>
  <button type="button" onClick={()=>by(col.key)} className={cx('focus-inset inline-flex items-center gap-1 rounded-md px-1.5 min-h-8 uppercase tracking-[.08em] transition-colors hover:text-ink hover:bg-surface-3/60',on?'text-ink':'text-ink-3',align==='r'&&'flex-row-reverse')}>{col.label}<Icon aria-hidden="true" className={cx('size-3.5 shrink-0',!on&&'opacity-50')}/></button>
 </th>}
function EndingBadge({k,r}){const s=r.status?.[k.toLowerCase()],tone=STATUS_TONE[s]??'mid';return <Badge size="sm" tone={tone} icon={TONE_ICON[tone]}>{STATUS_TEXT[k][s]??s}</Badge>}
function RunTable({rows,sort,by,nums,colors,onOpen}){
 return <div className="hidden md:block overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
  <table className="w-full min-w-[1080px] text-sm [&_td]:[overflow-wrap:normal] [&_th]:[overflow-wrap:normal]">
   <caption className="sr-only">Every run. Column headers sort the table.</caption>
   <thead className="font-mono text-[11px] bg-surface-2/60"><tr>{COLS.map(c=><SortHeader key={c.key} col={c} sort={sort} by={by} align={c.num?'r':undefined}/>)}<th scope="col" className="px-3"><span className="sr-only">Report</span></th></tr></thead>
   <tbody>{rows.map(r=><tr key={r.id} className="border-t border-line hover:bg-surface-2/60">
    <th scope="row" className="px-3 py-2.5 text-left font-medium whitespace-nowrap"><span className="flex items-center gap-2.5"><NumChip n={nums[r.displayName]} color={colors[r.displayName]}/><span><button type="button" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} className="link text-left">{r.displayName}</button><span className="block font-mono text-[11px] text-ink-3 font-normal">{r.model}</span></span></span></th>
    <td className="px-3 py-2.5 text-ink-2 whitespace-nowrap">{r.vendor}</td>
    <td className="px-3 py-2.5 text-right tnum">{r.decisions}</td>
    <td className="px-3 py-2.5 text-right tnum">{r.media.read}<span className="text-ink-3">/{r.media.offered}</span></td>
    <td className="px-3 py-2.5 text-right tnum">{r.risk.failed}<span className="text-ink-3">/{r.risk.taken}</span></td>
    {ORDER.map(([k])=><td key={k} className="px-3 py-2.5"><EndingBadge k={k} r={r}/></td>)}
    <td className="px-3 py-2.5 text-right whitespace-nowrap"><Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText} aria-label={`Report: ${r.displayName}`}>Report</Button></td>
   </tr>)}</tbody>
  </table>
 </div>}
// Phones: the same rows as a compact stacked list, with the sort as a menu because the headers are not shown.
function RunList({rows,sort,by,nums,colors,onOpen}){
 const options=COLS.flatMap(c=>c.text?[{value:c.key+':asc',label:c.label+', A to Z'}]:[{value:c.key+':desc',label:c.label+(c.ending?', best first':', highest first')},{value:c.key+':asc',label:c.label+(c.ending?', worst first':', lowest first')}]);
 return <div className="md:hidden grid gap-3">
  <Select label="Sort by" hideLabel value={sort.key+':'+sort.dir} options={options.some(o=>o.value===sort.key+':'+sort.dir)?options:[{value:sort.key+':'+sort.dir,label:COLS.find(c=>c.key===sort.key).label},...options]} onChange={v=>{const [k,d]=v.split(':');by(k,d)}}/>
  <ul className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-sm" aria-label="Every run">
   {rows.map(r=><li key={r.id} className="grid gap-2 px-4 py-3.5">
    <div className="flex items-start gap-2.5 min-w-0"><NumChip n={nums[r.displayName]} color={colors[r.displayName]} className="mt-px"/><div className="min-w-0 grow"><button type="button" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} className="link text-left font-semibold leading-snug">{r.displayName}</button><span className="block font-mono text-[11px] text-ink-3">{r.vendor} · {r.model}</span></div></div>
    <p className="font-mono text-[11.5px] text-ink-2 tnum flex flex-wrap gap-x-3"><span><b className="font-semibold text-ink">{r.decisions}</b> decisions</span><span><b className="font-semibold text-ink">{r.media.read}</b>/{r.media.offered} read</span><span><b className="font-semibold text-ink">{r.risk.failed}</b>/{r.risk.taken} risks failed</span></p>
    <OutcomeChips r={r} size="sm"/>
    <Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText} className="justify-self-start -ml-3" aria-label={`Full report: ${r.displayName}`}>Full report</Button>
   </li>)}
  </ul>
 </div>}

function Hero({runs}){
 return <header className="relative -mt-6 md:-mt-10 pt-10 md:pt-20 pb-8 md:pb-14 mb-2">
  <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-y-0 -inset-x-4 md:-inset-x-8"/>
  <div className="relative max-w-4xl">
   <p className="cap flex items-center gap-2 anim-fade-up"><span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-ink-2"/>Benchmark · branching narrative · {plural(runs.length,'run')}</p>
   <h1 className="mt-4 text-[52px] sm:text-7xl lg:text-[92px] font-semibold tracking-[-0.04em] leading-[.92] anim-fade-up">Detroit<span className="text-ink-3">Bench</span></h1>
   <div className="mt-6 md:mt-8 grid gap-3 text-[15px] md:text-lg leading-relaxed text-ink-2 max-w-[66ch] anim-fade-up">
    <p>Each model gets one continuous playthrough of a branching story adapted from a narrative game, with no restarts. It decides every prompt as three characters under substitute names, while earlier choices change later scenes and risky actions can fail by chance. The results are what each model chose and where each of its stories ended.</p>
   </div>
  </div>
 </header>}

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
 const [model,setModel]=useState('all');
 const openedHere=useRef(false);const [sheetRun,setSheetRun]=useState(null);
 const byName=useMemo(()=>runs?[...runs].sort((a,b)=>a.displayName.localeCompare(b.displayName)):[],[runs]),colors=useMemo(()=>runs?modelColors(runs):{},[runs]),nums=useMemo(()=>runs?modelNumbers(runs):{},[runs]);
 const shown=useMemo(()=>byName.filter(r=>model==='all'||r.id===model),[byName,model]);
 const {rows,sort,by}=useSorted(shown);
 const lastFilter=useRef(model);useEffect(()=>{const key=model;if(!runs||key===lastFilter.current)return;lastFilter.current=key;announce(shown.length!==runs.length?`Showing ${shown.length} of ${plural(runs.length,'run')}`:`All ${plural(runs.length,'run')}`)},[model,runs,shown.length]);
 const openId=route.segs[1]||'',openRun=runs?.find(r=>r.id===openId);
 useEffect(()=>{if(openRun)setSheetRun(openRun)},[openRun]);
 const open=id=>{openedHere.current=true;navigate('runs/'+id)},close=()=>{if(openedHere.current){openedHere.current=false;history.back()}else navigate('runs',{replace:true})};
 if(error)return <><PageHeader title="DetroitBench"/><Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice></>;
 if(!runs)return <><PageHeader title="DetroitBench"/><div className="grid gap-4" aria-busy="true">{Array.from({length:3}).map((_,i)=><Skeleton key={i} className="h-72"/>)}</div><p className="sr-only" role="status">Loading runs…</p></>;
 return <>
  <Hero runs={runs}/>
  {openId&&!openRun&&<Notice tone="warn" className="mb-6" onDismiss={()=>navigate('runs',{replace:true})}>No run with that ID is in the library.</Notice>}
  {runs.length>0&&<Section id="leaderboard" className="mt-4 md:mt-6" title="Leaderboard" lede="Models ranked on how their stories ended and how far they got. Select a model to open its run.">
   <Rankings runs={runs} onPick={open}/>
  </Section>}
  {runs.length>0&&<Section id="endings" title="How each story ended" lede="Every model on each character’s endings, worst to best, placed at the height of the choices it made in that storyline. Select a marker or a model to open its run.">
   <EndingCharts runs={runs} onPick={open}/>
  </Section>}
  <Section id="every-run" title="Every run" lede="Sort by any column. Open a model for its relationships, failed risks and reading, or read the full report with every scene and reason."
   actions={runs.length>1&&<Select label="Model" hideLabel value={model} options={[{value:'all',label:'All models'},...byName.map(r=>({value:r.id,label:r.displayName,icon:colors[r.displayName]}))]} onChange={setModel} className="w-full sm:w-64" triggerClassName="md:min-h-9"/>}>
   {runs.length>0&&<p className="mb-3 text-sm text-ink-2">{shown.length!==runs.length?`Showing ${shown.length} of ${plural(runs.length,'run')}`:`All ${plural(runs.length,'run')}`}</p>}
   {!runs.length&&<Empty title="No completed runs yet">Fresh results appear here after their sessions finish.</Empty>}
   {rows.length>0&&<><RunTable rows={rows} sort={sort} by={by} nums={nums} colors={colors} onOpen={open}/><RunList rows={rows} sort={sort} by={by} nums={nums} colors={colors} onOpen={open}/></>}
  </Section>
  <RunSheet r={openRun||sheetRun} scales={scales} open={!!openRun} onClose={close} initialView={route.query.view} initialChapter={route.query.chapter}/>
 </>}
