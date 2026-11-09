import React,{useMemo,useState} from 'react';
import {FileText,CircleAlert,ArrowUp,ArrowDown,ChevronsUpDown,Table2} from 'lucide-react';
// GitHub's mark, drawn inline because the icon set used here does not ship it.
const Github=({className})=><svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>;
import {Badge,Button,Empty,Notice,PageHeader,Skeleton,TONE_ICON,cx} from '../components/ui.jsx';
import {OUTCOMES,NumChip} from '../components/Charts.jsx';
import {ChartFeed} from '../components/RelationshipCharts.jsx';
import {ModelPicker} from '../components/ModelSidebar.jsx';
import {useModelSelection} from '../lib/modelSelection.js';
import {setQuery} from '../lib/urlState.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
import {CHARS,WHO,CHAR_VAR,ORDER,STATUS_TEXT,STATUS_TONE,modelColors,modelNumbers,compareRuns,plural,tidy} from '../lib/data.js';
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
 {key:'model',label:'Model',get:r=>[r.displayName.toLowerCase()],text:true,order:true},
 {key:'lab',label:'Lab',get:r=>[r.vendor.toLowerCase()],text:true},
 {key:'decisions',label:'Decisions',short:'Dec',get:r=>[r.decisions],num:true},
 {key:'read',label:'Read',get:r=>[r.media.read,r.media.offered?r.media.read/r.media.offered:0],num:true},
 {key:'risks',label:'Risks failed',short:'Risks',get:r=>[r.risk.failed,r.risk.taken?r.risk.failed/r.risk.taken:0],num:true},
 ...ORDER.map(([k,f])=>({key:f,label:k,get:r=>[RANK[f]?.[r.status?.[f]]??-1],ending:true}))
];
const cmp=(a,b)=>{for(let i=0;i<Math.max(a.length,b.length);i++){const x=a[i]??0,y=b[i]??0;if(x<y)return -1;if(x>y)return 1}return 0};
function useSorted(runs){
 const [sort,setSort]=useState({key:'model',dir:'asc'});
 // By model means the sidebar's order: tier, vendor, model, then reasoning level and run number.
 const rows=useMemo(()=>{const col=COLS.find(c=>c.key===sort.key)??COLS[0],k=sort.dir==='asc'?1:-1;return [...runs].sort((a,b)=>col.order?k*compareRuns(a,b):k*cmp(col.get(a),col.get(b))||compareRuns(a,b))},[runs,sort]);
 const by=(key,dir)=>{const col=COLS.find(c=>c.key===key);const next=dir??(sort.key===key?(sort.dir==='asc'?'desc':'asc'):col.text?'asc':'desc');setSort({key,dir:next});
  announce(`Sorted by ${col.label}, ${col.ending?(next==='desc'?'best ending first':'worst ending first'):next==='asc'?(col.text?'A to Z':'lowest first'):(col.text?'Z to A':'highest first')}`)};
 return {rows,sort,by}}
function SortHeader({col,sort,by,align,className}){
 const on=sort.key===col.key,Icon=on?(sort.dir==='asc'?ArrowUp:ArrowDown):ChevronsUpDown;
 return <th scope="col" aria-sort={on?(sort.dir==='asc'?'ascending':'descending'):undefined} className={cx('px-1 py-1.5 font-medium align-bottom',align==='r'?'text-right':'text-left',className)}>
  <button type="button" onClick={()=>by(col.key)} className={cx('focus-inset inline-flex items-center gap-1 rounded-md px-1.5 py-1 min-h-8 leading-tight uppercase tracking-[.05em] transition-colors hover:text-ink hover:bg-surface-3/60',on?'text-ink':'text-ink-3',align==='r'&&'flex-row-reverse')} aria-label={col.short||col.ending?col.label:undefined} title={col.short||col.ending?col.label:undefined}>{col.ending?<><span className="xl:hidden">{col.label.slice(0,3)}</span><span className="hidden xl:inline">{col.label}</span></>:col.short??col.label}<Icon aria-hidden="true" className={cx('size-3.5 shrink-0',!on&&'opacity-50')}/></button>
 </th>}
// The table uses the short ending names of the charts' rows (an icon alone below 1280 px); the full name stays in the
// tooltip and the screen-reader text.
const SHORT_END={'Reached Canada':'Canada','Stayed a machine':'Machine','Peaceful win':'Peaceful','Uprising won':'Uprising'};
const TONE_INK={good:'text-good',bad:'text-bad',serious:'text-serious',mid:'text-ink-3',warn:'text-warn'};
function EndingBadge({k,r}){const s=r.status?.[k.toLowerCase()],tone=STATUS_TONE[s]??'mid',full=STATUS_TEXT[k][s]??s,I=TONE_ICON[tone];
 return <span title={`${k}: ${full}`}><span className="sr-only">{full}</span>
  <span aria-hidden="true" className="xl:hidden inline-flex"><I className={cx('size-4',TONE_INK[tone])}/></span>
  <span aria-hidden="true" className="hidden xl:inline-flex"><Badge size="sm" tone={tone} icon={I}>{SHORT_END[full]??full}</Badge></span></span>}
// Fits its column from 1024 px up with no horizontal scroll: fixed layout, short numeric headers, the model cell
// wrapping and linking to the run's full report, the lab column only on the widest screens.
const WIDTH={model:undefined,lab:'hidden 2xl:table-cell w-[5.5rem]',decisions:'w-[4.25rem]',read:'w-[4.5rem]',risks:'w-[4.75rem]'};
function RunTable({rows,sort,by,nums,colors}){
 const focus=useModelFocus();
 return <div className="hidden lg:block overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
  <table className="w-full table-fixed text-sm">
   <caption className="sr-only">Every run. Column headers sort the table.</caption>
   <thead className="font-mono text-[11px] bg-surface-2/60"><tr>{COLS.map(c=><SortHeader key={c.key} col={c} sort={sort} by={by} align={c.num?'r':undefined} className={c.key in WIDTH?WIDTH[c.key]:'w-[3.75rem] xl:w-[6.75rem]'}/>)}</tr></thead>
   <tbody>{rows.map(r=><tr key={r.id} onPointerEnter={e=>{if(e.pointerType==='mouse')focus.setHover(r.id)}} onPointerLeave={()=>focus.setHover(null)} className={cx('border-t border-line transition-opacity hover:bg-surface-2/60',focus.dim(r.id)&&'opacity-30')}>
    <th scope="row" className="px-2 py-2.5 text-left font-medium"><span className="flex min-w-0 items-start gap-2.5"><NumChip n={nums[r.displayName]} color={colors[r.displayName]} className="mt-0.5"/><span className="min-w-0 grow">
     <a href={href('runs/'+r.id+'/report')} title="Open the full report" className="group/name link block min-w-0 text-left [overflow-wrap:anywhere]">{r.displayName.replace(/\s*(\S+)$/,'')} <span className="whitespace-nowrap [overflow-wrap:normal]">{r.displayName.match(/\S+$/)?.[0]}<span className="sr-only">: full report</span><FileText aria-hidden="true" className="ml-1.5 inline-block size-3.5 -translate-y-px align-middle text-ink-3 group-hover/name:text-ink"/></span></a>
     <span className="block truncate font-mono text-[11px] text-ink-3 font-normal" title={`${r.vendor} · ${r.model}`}><span className="2xl:hidden">{r.vendor} · </span>{r.model}</span></span></span></th>
    <td className="hidden 2xl:table-cell px-1.5 py-2.5 text-ink-2 truncate">{r.vendor}</td>
    <td className="px-1.5 py-2.5 text-right tnum">{r.decisions}</td>
    <td className="px-1.5 py-2.5 text-right tnum whitespace-nowrap">{r.media.read}<span className="text-ink-3">/{r.media.offered}</span></td>
    <td className="px-1.5 py-2.5 text-right tnum whitespace-nowrap">{r.risk.failed}<span className="text-ink-3">/{r.risk.taken}</span></td>
    {ORDER.map(([k])=><td key={k} className="px-1.5 py-2.5"><EndingBadge k={k} r={r}/></td>)}
   </tr>)}</tbody>
  </table>
 </div>}
// Phones and narrow screens: the same rows as a compact stacked list, always in the default order (by model, then
// reasoning level and run number, as the desktop table opens); the column sorting belongs to the desktop table.
function RunList({rows,nums,colors}){
 const focus=useModelFocus();
 return <div className="lg:hidden grid gap-3">
  <ul className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-sm" aria-label="Every run">
   {rows.map(r=><li key={r.id} className={cx('grid gap-2 px-4 py-3.5 transition-opacity',focus.dim(r.id)&&'opacity-30')}>
    <div className="flex items-start gap-2.5 min-w-0"><NumChip n={nums[r.displayName]} color={colors[r.displayName]} className="mt-px"/><div className="min-w-0 grow"><a href={href('runs/'+r.id+'/report')} className="link text-left font-semibold leading-snug">{r.displayName}</a><span className="block font-mono text-[11px] text-ink-3">{r.vendor} · {r.model}</span></div></div>
    <p className="font-mono text-[11.5px] text-ink-2 tnum flex flex-wrap gap-x-3"><span><b className="font-semibold text-ink">{r.decisions}</b> decisions</span><span><b className="font-semibold text-ink">{r.media.read}</b>/{r.media.offered} read</span><span><b className="font-semibold text-ink">{r.risk.failed}</b>/{r.risk.taken} risks failed</span></p>
    <OutcomeChips r={r} size="sm"/>
    <Button as="a" href={href('runs/'+r.id+'/report')} variant="ghost" size="sm" icon={FileText} className="justify-self-start -ml-3" aria-label={`Full report: ${r.displayName}`}>Full report</Button>
   </li>)}
  </ul>
 </div>}

function Hero(){
 const toRuns=e=>{e.preventDefault();const el=document.getElementById('every-run');if(el){el.scrollIntoView({behavior:'smooth',block:'start'});el.querySelector('h2')?.focus({preventScroll:true})}};
 return <header className="relative -mt-6 md:-mt-10 pt-10 md:pt-16 pb-6 md:pb-10">
  <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-y-0 -inset-x-4 md:-inset-x-8"/>
  <div className="relative max-w-4xl">
   <h1 className="hero-title text-[40px] sm:text-6xl lg:text-[76px] font-semibold tracking-[-0.03em] leading-[1.02] [text-wrap:balance]" aria-label="Detroit Become Human AI benchmark">
    {['Detroit','Become','Human'].map(w=><React.Fragment key={w}><span className="word" aria-hidden="true">{w}</span>{' '}</React.Fragment>)}
    <span className="word accent" data-text="AI benchmark" aria-hidden="true">AI benchmark</span><span className="caret" aria-hidden="true"/>
   </h1>
   <p className="mt-5 md:mt-6 max-w-[60ch] text-[15px] md:text-lg leading-relaxed text-ink-2 [text-wrap:pretty]">This benchmark was created to measure what choices AI models would make if they were the androids in the popular video game Detroit: Become Human.</p>
   <div className="mt-6 flex flex-wrap gap-2.5">
    <Button as="a" href="#every-run" onClick={toRuns} variant="primary" icon={Table2}>Runs</Button>
    <Button as="a" href="https://github.com/A-Ricemusic/detroitbench" target="_blank" rel="noreferrer" icon={Github}>GitHub</Button>
   </div>
  </div>
 </header>}

export default function Runs(){
 const {runs,scales,chapters,error,retry}=useLibrary();
 const sel=useModelSelection(runs),focus=useModelFocus();
 const colors=useMemo(()=>runs?modelColors(runs):{},[runs]),nums=useMemo(()=>runs?modelNumbers(runs):{},[runs]);
 const shown=sel.visible,onReset=()=>{setQuery({models:null,'hide-reasoning':null,chart:null});focus.clear()};
 const {rows,sort,by}=useSorted(shown);
 const byModel=useMemo(()=>[...shown].sort(compareRuns),[shown]);
 if(error)return <><PageHeader title="DetroitBench"/><Notice tone="bad">{error}. <Button size="sm" variant="link" onClick={()=>{retry();document.querySelector('main h1')?.focus()}}>Try again</Button></Notice></>;
 if(!runs)return <><PageHeader title="DetroitBench"/><div className="grid gap-4" aria-busy="true">{Array.from({length:3}).map((_,i)=><Skeleton key={i} className="h-72"/>)}</div><p className="sr-only" role="status">Loading runs…</p></>;
 const empty=!shown.length&&runs.length>0&&<div className="grid place-items-center gap-2 rounded-xl border border-dashed border-line-2 px-4 py-14 text-center"><p className="text-[17px] font-medium">{sel.selected.size?'No reasoning levels enabled':'No models selected'}</p><button type="button" onClick={onReset} className="text-sm text-ink underline underline-offset-4">Reset filters</button></div>;
 return <>
  <Hero/>
  {!runs.length?<Empty title="No completed runs yet">Fresh results appear here after their sessions finish.</Empty>:
  <div className="grid grid-cols-[minmax(0,1fr)] gap-5 min-[901px]:grid-cols-[minmax(0,1fr)_248px] min-[901px]:gap-8 items-start">
   <div className="min-w-0">
    <ChartFeed runs={runs} shown={shown} scales={scales} chapters={chapters} colors={colors} nums={nums} empty={empty}/>
    <section id="every-run" aria-labelledby="every-run-h" className="mt-10 md:mt-14 scroll-mt-[calc(var(--header-h)+1rem)]">
     <div className="mb-3 flex items-baseline justify-between gap-3"><h2 id="every-run-h" tabIndex={-1} className="text-xl md:text-2xl font-semibold outline-none">Runs</h2><p className="cap">{shown.length} of {runs.length} shown · sortable</p></div>
     {empty||<><RunTable rows={rows} sort={sort} by={by} nums={nums} colors={colors}/><RunList rows={byModel} nums={nums} colors={colors}/></>}
    </section>
   </div>
   <ModelPicker runs={runs} colors={colors} nums={nums} sel={sel} onReset={onReset}/>
  </div>}
 </>}
