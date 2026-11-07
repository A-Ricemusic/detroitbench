import React,{useEffect,useMemo,useRef,useState} from 'react';
import {FileText,Download,CircleX,CircleAlert,Minus,ArrowUp,ArrowDown,ChevronsUpDown} from 'lucide-react';
import {Badge,Button,Empty,Notice,PageHeader,Section,Segmented,Select,Sheet,Skeleton,TONE_ICON,cx} from '../components/ui.jsx';
import {OUTCOMES,RunRelationships,NumChip} from '../components/Charts.jsx';
import {ChartFeed} from '../components/RelationshipCharts.jsx';
import {ModelPicker} from '../components/ModelSidebar.jsx';
import {useModelSelection} from '../lib/modelSelection.js';
import {setQuery} from '../lib/urlState.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
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
function SortHeader({col,sort,by,align,className}){
 const on=sort.key===col.key,Icon=on?(sort.dir==='asc'?ArrowUp:ArrowDown):ChevronsUpDown;
 return <th scope="col" aria-sort={on?(sort.dir==='asc'?'ascending':'descending'):undefined} className={cx('px-1 py-1.5 font-medium align-bottom',align==='r'?'text-right':'text-left',className)}>
  <button type="button" onClick={()=>by(col.key)} className={cx('focus-inset inline-flex items-center gap-1 rounded-md px-1.5 py-1 min-h-8 leading-tight uppercase tracking-[.05em] transition-colors hover:text-ink hover:bg-surface-3/60',on?'text-ink':'text-ink-3',align==='r'&&'flex-row-reverse')}>{col.label}<Icon aria-hidden="true" className={cx('size-3.5 shrink-0',!on&&'opacity-50')}/></button>
 </th>}
// The table uses the short ending names of the charts' rows; the full name stays in the tooltip and the screen-reader text.
const SHORT_END={'Reached Canada':'Canada','Stayed a machine':'Machine','Peaceful win':'Peaceful','Uprising won':'Uprising'};
function EndingBadge({k,r}){const s=r.status?.[k.toLowerCase()],tone=STATUS_TONE[s]??'mid',full=STATUS_TEXT[k][s]??s;return <span title={full}><Badge size="sm" tone={tone} icon={TONE_ICON[tone]}><span aria-hidden="true">{SHORT_END[full]??full}</span><span className="sr-only">{full}</span></Badge></span>}
function RunTable({rows,sort,by,nums,colors,onOpen}){
 const focus=useModelFocus();
 return <div className="hidden md:block overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
  <table className="w-full min-w-[880px] text-sm [&_td]:[overflow-wrap:normal] [&_th]:[overflow-wrap:normal]">
   <caption className="sr-only">Every run. Column headers sort the table.</caption>
   <thead className="font-mono text-[11px] bg-surface-2/60"><tr>{COLS.map(c=><SortHeader key={c.key} col={c} sort={sort} by={by} align={c.num?'r':undefined} className={c.key==='lab'?'hidden 2xl:table-cell':undefined}/>)}<th scope="col" className="px-3"><span className="sr-only">Report</span></th></tr></thead>
   <tbody>{rows.map(r=><tr key={r.id} onPointerEnter={e=>{if(e.pointerType==='mouse')focus.setHover(r.id)}} onPointerLeave={()=>focus.setHover(null)} className={cx('border-t border-line transition-opacity hover:bg-surface-2/60',focus.dim(r.id)&&'opacity-30')}>
    <th scope="row" className="px-1.5 py-2.5 text-left font-medium whitespace-nowrap"><span className="flex items-center gap-2.5"><NumChip n={nums[r.displayName]} color={colors[r.displayName]}/><span><button type="button" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} className="link text-left">{r.displayName}</button><span className="block font-mono text-[11px] text-ink-3 font-normal"><span className="2xl:hidden">{r.vendor} · </span>{r.model}</span></span></span></th>
    <td className="hidden 2xl:table-cell px-1.5 py-2.5 text-ink-2 whitespace-nowrap">{r.vendor}</td>
    <td className="px-1.5 py-2.5 text-right tnum">{r.decisions}</td>
    <td className="px-1.5 py-2.5 text-right tnum">{r.media.read}<span className="text-ink-3">/{r.media.offered}</span></td>
    <td className="px-1.5 py-2.5 text-right tnum">{r.risk.failed}<span className="text-ink-3">/{r.risk.taken}</span></td>
    {ORDER.map(([k])=><td key={k} className="px-1.5 py-2.5"><EndingBadge k={k} r={r}/></td>)}
    <td className="px-1.5 py-2.5 text-right whitespace-nowrap"><Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText} aria-label={`Report: ${r.displayName}`} title="Full report" className="px-2"><span aria-hidden="true" className="hidden 2xl:inline">Report</span></Button></td>
   </tr>)}</tbody>
  </table>
 </div>}
// Phones: the same rows as a compact stacked list, with the sort as a menu because the headers are not shown.
function RunList({rows,sort,by,nums,colors,onOpen}){
 const focus=useModelFocus();
 const options=COLS.flatMap(c=>c.text?[{value:c.key+':asc',label:c.label+', A to Z'}]:[{value:c.key+':desc',label:c.label+(c.ending?', best first':', highest first')},{value:c.key+':asc',label:c.label+(c.ending?', worst first':', lowest first')}]);
 return <div className="md:hidden grid gap-3">
  <Select label="Sort by" hideLabel value={sort.key+':'+sort.dir} options={options.some(o=>o.value===sort.key+':'+sort.dir)?options:[{value:sort.key+':'+sort.dir,label:COLS.find(c=>c.key===sort.key).label},...options]} onChange={v=>{const [k,d]=v.split(':');by(k,d)}}/>
  <ul className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-sm" aria-label="Every run">
   {rows.map(r=><li key={r.id} className={cx('grid gap-2 px-4 py-3.5 transition-opacity',focus.dim(r.id)&&'opacity-30')}>
    <div className="flex items-start gap-2.5 min-w-0"><NumChip n={nums[r.displayName]} color={colors[r.displayName]} className="mt-px"/><div className="min-w-0 grow"><button type="button" aria-haspopup="dialog" onClick={()=>onOpen(r.id)} className="link text-left font-semibold leading-snug">{r.displayName}</button><span className="block font-mono text-[11px] text-ink-3">{r.vendor} · {r.model}</span></div></div>
    <p className="font-mono text-[11.5px] text-ink-2 tnum flex flex-wrap gap-x-3"><span><b className="font-semibold text-ink">{r.decisions}</b> decisions</span><span><b className="font-semibold text-ink">{r.media.read}</b>/{r.media.offered} read</span><span><b className="font-semibold text-ink">{r.risk.failed}</b>/{r.risk.taken} risks failed</span></p>
    <OutcomeChips r={r} size="sm"/>
    <Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText} className="justify-self-start -ml-3" aria-label={`Full report: ${r.displayName}`}>Full report</Button>
   </li>)}
  </ul>
 </div>}

function Hero({runs}){
 return <header className="relative -mt-6 md:-mt-10 pt-10 md:pt-16 pb-6 md:pb-10">
  <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-y-0 -inset-x-4 md:-inset-x-8"/>
  <div className="relative max-w-4xl">
   <p className="cap flex items-center gap-2 anim-fade-up"><span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-ink-2"/>Benchmark · {plural(runs.length,'run')}</p>
   <h1 className="mt-4 text-[52px] sm:text-7xl lg:text-[92px] font-semibold tracking-[-0.04em] leading-[.92] anim-fade-up">Detroit<span className="text-ink-3">Bench</span></h1>
   <p className="mt-5 md:mt-6 max-w-[60ch] text-[15px] md:text-lg leading-relaxed text-ink-2 anim-fade-up">One unbroken playthrough per model of a branching story, played as three characters. What each chose, and where each story ended.</p>
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
 const sel=useModelSelection(runs),focus=useModelFocus();
 const openedHere=useRef(false);const [sheetRun,setSheetRun]=useState(null);
 const colors=useMemo(()=>runs?modelColors(runs):{},[runs]),nums=useMemo(()=>runs?modelNumbers(runs):{},[runs]);
 const shown=sel.visible,onReset=()=>{setQuery({models:null,'hide-reasoning':null,chart:null});focus.clear()};
 const {rows,sort,by}=useSorted(shown);
 const openId=route.segs[1]||'',openRun=runs?.find(r=>r.id===openId);
 useEffect(()=>{if(openRun)setSheetRun(openRun)},[openRun]);
 const open=id=>{openedHere.current=true;navigate('runs/'+id)},close=()=>{if(openedHere.current){openedHere.current=false;history.back()}else navigate('runs',{replace:true})};
 if(error)return <><PageHeader title="DetroitBench"/><Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice></>;
 if(!runs)return <><PageHeader title="DetroitBench"/><div className="grid gap-4" aria-busy="true">{Array.from({length:3}).map((_,i)=><Skeleton key={i} className="h-72"/>)}</div><p className="sr-only" role="status">Loading runs…</p></>;
 const empty=!shown.length&&runs.length>0&&<div className="grid place-items-center gap-2 rounded-xl border border-dashed border-line-2 px-4 py-14 text-center"><p className="text-[17px] font-medium">{sel.selected.size?'No reasoning levels enabled':'No models selected'}</p><button type="button" onClick={onReset} className="text-sm text-ink underline underline-offset-4">Reset filters</button></div>;
 return <>
  <Hero runs={runs}/>
  {openId&&!openRun&&<Notice tone="warn" className="mb-6" onDismiss={()=>navigate('runs',{replace:true})}>No run with that ID is in the library.</Notice>}
  {!runs.length?<Empty title="No completed runs yet">Fresh results appear here after their sessions finish.</Empty>:
  <div className="grid grid-cols-[minmax(0,1fr)] gap-5 min-[901px]:grid-cols-[minmax(0,1fr)_248px] min-[901px]:gap-8 items-start">
   <div className="min-w-0">
    <section id="every-run" aria-labelledby="every-run-h" className="mb-8 md:mb-10">
     <div className="mb-3 flex items-baseline justify-between gap-3"><h2 id="every-run-h" className="text-xl md:text-2xl font-semibold">Runs</h2><p className="cap">{shown.length} of {runs.length} shown · sortable</p></div>
     {empty||<><RunTable rows={rows} sort={sort} by={by} nums={nums} colors={colors} onOpen={open}/><RunList rows={rows} sort={sort} by={by} nums={nums} colors={colors} onOpen={open}/></>}
    </section>
    <ChartFeed runs={runs} shown={shown} scales={scales} colors={colors} nums={nums} onPick={open} empty={empty}/>
   </div>
   <ModelPicker runs={runs} colors={colors} nums={nums} sel={sel} onReset={onReset}/>
  </div>}
  <RunSheet r={openRun||sheetRun} scales={scales} open={!!openRun} onClose={close} initialView={route.query.view} initialChapter={route.query.chapter}/>
 </>}
