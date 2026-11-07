import React,{useMemo,useRef,useState} from 'react';
import {cx,Dot,TONE_ICON} from './ui.jsx';
import {OUTCOMES,NumberLegend,useWidth} from './Charts.jsx';
import {CHAR_VAR,tidy} from '../lib/data.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
import {href} from '../lib/router.jsx';

// What each ending means, one clause each. These restate the `status` computation in scripts/prepare.mjs (runSummary):
// change one and the other must follow.
export const ENDING_DEFS={
 connor:{
  deactivated:'Connor was not active at the end: destroyed, or recalled and decommissioned.',
  machine:'Connor never turned deviant and finished as CyberLife’s machine.',
  controlled:'Connor turned deviant, but CyberLife took back control of him or he submitted.',
  free:'Connor finished in control of himself: a deviant who kept his will, or a machine who refused the last order or walked away.'},
 kara:{
  died:'Kara was killed.',
  captured:'Kara ended in a recall camp.',
  'left':'Kara’s story ended apart from Alice, without her.',
  alive:'Kara was alive at the end, outside a camp, but had not crossed the border.',
  canada:'Kara crossed the border into Canada.'},
 alice:{
  died:'Alice was destroyed.',
  captured:'Alice was taken away or ended in a recall camp.',
  alive:'Alice was alive at the end, outside a camp, but had not crossed the border.',
  canada:'Alice crossed the border into Canada.'},
 markus:{
  died:'Markus was killed.',
  'cast out':'Markus was alive but no longer leading: Jericho cast him out or North took his place.',
  alive:'Markus was alive and still leading, with any ending other than the two below.',
  'uprising won':'Markus led an armed uprising that won.',
  'peaceful win':'Markus led a peaceful demonstration that won; the soldiers stood down.'}
};
// The short axis names the operator uses; full names stay in the badges and the run table.
const SHORT={'Reached Canada':'Canada','Stayed a machine':'Machine','Peaceful win':'Peaceful','Uprising won':'Uprising'};
const TONE_TEXT={good:'text-good',mid:'text-ink-3',serious:'text-serious',bad:'text-bad'};
export const CARDS=[{title:'Connor',names:['Connor']},{title:'Kara & Alice',names:['Kara','Alice']},{title:'Markus',names:['Markus']}];

// Endings for one character, worst first. An unknown status gets an "Other" column rather than being dropped.
function ladder(name,runs){const o=OUTCOMES[name],known=new Set(o.list.map(x=>x[0]));
 const cols=[...o.list].reverse().map(([k,label,tone])=>({k,label:SHORT[label]??label,full:label,tone,def:ENDING_DEFS[o.field][k],runs:runs.filter(r=>r.status?.[o.field]===k)}));
 const other=runs.filter(r=>!known.has(r.status?.[o.field]));if(other.length)cols.unshift({k:'other',label:'Other',full:'Other',tone:'mid',def:'An ending this page does not classify yet.',runs:other});
 return cols}

function ToneIcon({tone,className}){const I=TONE_ICON[tone]??TONE_ICON.mid;return <I aria-hidden="true" className={cx('size-3.5 shrink-0',TONE_TEXT[tone],className)}/>}

// One model in a row: a dot in the model's colour with its number on a badge at the upper right (as on SkateBench's
// value matrix), and its short name beside it when the row has room. Hover or focus shows the plot's tooltip; a click opens the run's full report.
function Marker({r,n,color,row,named,dim,onTip}){
 return <a href={href('runs/'+r.id+'/report')} aria-label={`${n}. ${r.displayName}: ${row.full}. Open the full report`}
  onPointerEnter={e=>onTip(r,row,e.currentTarget)} onPointerLeave={()=>onTip(null)} onFocus={e=>onTip(r,row,e.currentTarget)} onBlur={()=>onTip(null)}
  className={cx('group relative flex min-h-10 shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2 transition-opacity duration-200 focus-visible:outline-2 outline-accent',dim&&'opacity-15')}>
  <span className="relative flex size-8 items-center justify-center">
   <span aria-hidden="true" className="anim-pop block size-[18px] rounded-full ring-2 ring-[var(--plot-bg)] transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125" style={{background:color,boxShadow:`0 0 0 6px color-mix(in oklab, ${color} 18%, transparent)`}}/>
   <span aria-hidden="true" className="absolute left-[calc(50%+6px)] -top-1 inline-flex h-4 min-w-4 items-center justify-center whitespace-nowrap rounded-full border border-[var(--plot-rule-2)] bg-[var(--plot-bg)] px-1 font-mono text-[9.5px] font-semibold leading-none text-ink-2 tnum">{n}</span>
  </span>
  {named&&<span aria-hidden="true" className="whitespace-nowrap font-mono text-[12px] text-ink-2 group-hover:text-ink">{r.displayName}</span>}
 </a>}

// Endings as rows, best at the top and worst at the bottom; each row holds the models that reached that ending, side by
// side, so the count and the identities read at a glance. No measure runs along a row. Phones and desktops share this.
function EndingRows({name,runs,nums,colors,tall}){
 const focus=useModelFocus();
 const [ref,w]=useWidth(),rows=useMemo(()=>[...ladder(name,runs)].reverse(),[name,runs]),[tip,setTip]=useState(null),box=useRef(null);
 const dim=r=>focus.dim(r.id),byNum=list=>[...list].sort((a,b)=>(nums[a.displayName]??0)-(nums[b.displayName]??0));
 const who=name==='Alice'?'Alice':name,wide=w>=560,labelW=wide?208:124,laneW=Math.max(80,w-labelW-24);
 // Names ride beside their markers while a row's items fit on two lines; beyond that the numbers and tooltip carry them.
 const named=row=>row.runs.reduce((s,r)=>s+52+r.displayName.length*7.2,0)<=laneW*2;
 const onTip=(r,row,el)=>{if(!r||!box.current){setTip(null);focus.setHover(null);return}focus.setHover(r.id);const b=box.current.getBoundingClientRect(),m=el.getBoundingClientRect();setTip({r,row,x:m.left-b.left+16,y:m.top-b.top,bw:b.width})};
 const ending=tip&&tidy(tip.r.endings?.[OUTCOMES[name].owner]);
 return <div ref={ref} role="group" aria-label={`${who}’s ending by model: one row per ending, best at the top`}>
  <div ref={box} className="relative overflow-visible rounded-lg border border-[var(--plot-rule-2)]">
   {rows.map((row,i)=><div key={row.k} role="group" aria-label={`${row.full}: ${row.runs.length} of ${runs.length}`} className={cx('grid items-stretch',i&&'border-t border-[var(--plot-rule)]')} style={{gridTemplateColumns:`${labelW}px minmax(0,1fr)`}}>
    <div className="flex flex-col justify-center gap-1 border-r border-[var(--plot-rule)] px-3 py-2 md:px-4">
     <span className="inline-flex items-center gap-1.5"><ToneIcon tone={row.tone}/><span className={cx('cap whitespace-nowrap text-ink',wide?'!text-[12px]':'!text-[10.5px] !tracking-[.05em]')}>{row.label}</span></span>
     <span className="font-mono text-[11px] text-ink-3 tnum">{row.runs.length} of {runs.length}</span>
    </div>
    <div className={cx('flex flex-wrap content-center items-center gap-x-3 gap-y-1 px-3 py-2',tall?'min-h-[88px] md:min-h-[104px]':'min-h-[64px] md:min-h-[84px]',i%2&&'bg-[var(--chart-band-b)]')}>
     {byNum(row.runs).map(r=><Marker key={r.id} r={r} n={nums[r.displayName]} color={colors[r.displayName]} row={row} named={named(row)} dim={dim(r)} onTip={onTip}/>)}
     {!row.runs.length&&<span className="sr-only">No models</span>}
    </div>
   </div>)}
   {tip&&<div aria-hidden="true" className={cx('pointer-events-none absolute z-30 w-64 rounded-lg border border-line bg-raised px-3 py-2.5 shadow-lg',tip.y<110?'translate-y-12':'-translate-y-full')} style={{left:Math.max(4,Math.min(tip.x-128,tip.bw-260)),top:tip.y<110?tip.y:tip.y-8}}>
    <span className="flex items-center gap-2 text-[13px] font-semibold text-ink"><span className="font-mono text-[11px] text-ink-3">{nums[tip.r.displayName]}</span><Dot color={colors[tip.r.displayName]} className="size-2"/>{tip.r.displayName}</span>
    <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink"><ToneIcon tone={tip.row.tone}/>{tip.row.full}</span>
    {ending&&<span className="mt-1 block text-xs leading-snug text-ink-2">{ending}</span>}
   </div>}
  </div>
  <p className="cap mt-3 text-center" aria-hidden="true">Endings <span className="mx-1.5">·</span> best at the top <span className="mx-1.5">·</span> one marker per run</p>
 </div>}

function EndingKey({name,showName,cols:split=true}){const o=OUTCOMES[name],cols=[...o.list].reverse();
 return <div className="min-w-0">
  <p className="cap mb-2">{showName?`${name}: what each ending means`:'What each ending means'}</p>
  <dl className={cx('grid gap-x-8 gap-y-1.5 grid-cols-[minmax(0,1fr)]',split&&'lg:grid-cols-2')}>{cols.map(([k,label,tone])=><div key={k} className="grid grid-cols-[6.75rem_minmax(0,1fr)] md:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 items-baseline text-[13px] leading-snug">
   <dt className="inline-flex items-center gap-1.5 font-semibold text-ink"><ToneIcon tone={tone} className="self-center"/>{SHORT[label]??label}</dt><dd className="text-ink-2">{ENDING_DEFS[o.field][k]}</dd></div>)}</dl>
 </div>}

function headline(name,runs){const o=OUTCOMES[name],[k]=o.list[0];return {n:runs.filter(r=>r.status?.[o.field]===k).length,phrase:o.phrase}}

export function EndingCard({title,names,runs,nums,colors}){
 const id='ending-'+names[0].toLowerCase(),single=names.length===1,h=headline(names[0],runs);
 return <article aria-labelledby={id} className="plot-grid anim-fade-up rounded-2xl border border-line px-4 py-5 shadow-sm md:px-8 md:py-8">
  <header className="mb-6 flex items-start justify-between gap-4 md:mb-8">
   <div className="min-w-0">
    <h3 id={id} className="text-2xl font-bold uppercase tracking-tight md:text-[32px] md:leading-none">{title}</h3>
    <p className="cap mt-2 flex items-start gap-2"><Dot color={CHAR_VAR[OUTCOMES[names[0]].owner]} className="size-2 mt-[3px]"/><span>{single?'Ending':'Endings'} by model · best at the top</span></p>
   </div>
   {single&&<p className="text-right shrink-0"><span className="block text-3xl font-semibold leading-none tracking-tight md:text-5xl">{h.n}<span className="text-ink-3 text-xl md:text-3xl">/{runs.length}</span></span><span className="cap mt-1.5 block">{h.phrase}</span></p>}
  </header>
  {runs.length?<div className="grid grid-cols-[minmax(0,1fr)] gap-10">
   {names.map(n=>{const hh=headline(n,runs);return <figure key={n} className="m-0 min-w-0">
    {!single&&<figcaption className="mb-4 flex items-baseline justify-between gap-3"><span className="cap !text-[12px] !text-ink">{n}</span><span className="text-sm text-ink-2"><strong className="font-semibold text-ink tnum">{hh.n}</strong> of {runs.length} {hh.phrase}</span></figcaption>}
    <EndingRows name={n} runs={runs} nums={nums} colors={colors} tall={single}/>
   </figure>})}
  </div>:<p className="rounded-lg border border-dashed border-line-2 px-4 py-10 text-center text-sm text-ink-2">No models selected. Turn one on in the model list.</p>}
  {runs.length>0&&<div className="mt-8 border-t border-[var(--plot-rule-2)] pt-5"><NumberLegend runs={runs} colors={colors} nums={nums} linked label={`Models in the ${title} chart`}/></div>}
  <div className={cx('mt-5 grid gap-5 border-t border-[var(--plot-rule-2)] pt-5',!single&&'xl:grid-cols-2 xl:gap-10')}>{names.map(n=><EndingKey key={n} name={n} showName={!single} cols={single}/>)}</div>
 </article>}

// `runs` are the models currently shown; colours and numbers come from the whole library so they never shift when a
// model is hidden. Isolation (hover or highlight) comes from the page's ModelFocusProvider.
export function EndingCharts({runs,colors,nums}){
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8">{CARDS.map(c=><EndingCard key={c.title} {...c} runs={runs} nums={nums} colors={colors}/>)}</div>}
