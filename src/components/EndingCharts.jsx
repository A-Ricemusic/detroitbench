import React,{useMemo,useState} from 'react';
import {cx,Dot,TONE_ICON} from './ui.jsx';
import {OUTCOMES,NumberLegend,useWidth} from './Charts.jsx';
import {CHAR_VAR,modelColors,modelNumbers,shortName,tidy} from '../lib/data.js';

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
const CARDS=[{title:'Connor',names:['Connor']},{title:'Kara & Alice',names:['Kara','Alice']},{title:'Markus',names:['Markus']}];

// Endings for one character, worst first. An unknown status gets an "Other" column rather than being dropped.
function ladder(name,runs){const o=OUTCOMES[name],known=new Set(o.list.map(x=>x[0]));
 const cols=[...o.list].reverse().map(([k,label,tone])=>({k,label:SHORT[label]??label,full:label,tone,def:ENDING_DEFS[o.field][k],runs:runs.filter(r=>r.status?.[o.field]===k)}));
 const other=runs.filter(r=>!known.has(r.status?.[o.field]));if(other.length)cols.unshift({k:'other',label:'Other',full:'Other',tone:'mid',def:'An ending this page does not classify yet.',runs:other});
 return cols}

function ToneIcon({tone,className}){const I=TONE_ICON[tone]??TONE_ICON.mid;return <I aria-hidden="true" className={cx('size-3.5 shrink-0',TONE_TEXT[tone],className)}/>}
// Choices the model made in one storyline (Alice shares Kara's), not counting optional media or scripted scenes.
export const storyChoices=(r,owner)=>r.choices?.filter(c=>c.character===owner).length??0;
// A clean axis around the values (a scatter needs no zero baseline): padded, then snapped to a step of 1, 2, 5, 10 …
function niceAxis(min,max){const pad=Math.max((max-min)*0.15,max*0.08,2),lo0=Math.max(0,min-pad),hi0=max+pad;const steps=[1,2,5,10,20,25,50,100,200,250,500];const step=steps.find(s=>(hi0-lo0)/s<=5)??Math.ceil((hi0-lo0)/5);const lo=Math.floor(lo0/step)*step;return {step,lo,top:Math.max(lo+step,Math.ceil(hi0/step)*step)}}

// One model on the plot: a dot in the model's colour with its number on a badge at the upper right (as on SkateBench's
// value matrix), and a tooltip with the ending in full.
function Marker({r,n,color,col,name,align,below,dim,onPick,setHl,inline=false,style,count}){
 const ending=tidy(r.endings?.[OUTCOMES[name].owner]);
 return <button type="button" aria-haspopup="dialog" aria-label={`${n}. ${r.displayName}: ${col.full}${count!==undefined?`, ${count} choices in the storyline`:''}. Open run details`} onClick={()=>onPick?.(r.id)}
  onPointerEnter={()=>setHl(r.id)} onPointerLeave={()=>setHl('all')} onFocus={()=>setHl(r.id)} onBlur={()=>setHl('all')} style={style}
  className={cx('group flex size-9 items-center justify-center rounded-full transition-opacity duration-200 focus-visible:outline-2 outline-accent hover:z-10 focus-visible:z-10',inline?'relative':'absolute -translate-x-1/2 -translate-y-1/2',dim&&'opacity-25')}>
  <span aria-hidden="true" className="anim-pop relative block size-[18px] rounded-full ring-2 ring-[var(--plot-bg)] transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125" style={{background:color,boxShadow:`0 0 0 6px color-mix(in oklab, ${color} 18%, transparent)`}}/>
  <span aria-hidden="true" className="absolute left-[calc(50%+8px)] top-[-3px] inline-flex h-4 min-w-4 items-center justify-center whitespace-nowrap rounded-full border border-[var(--plot-rule-2)] bg-[var(--plot-bg)] px-1 font-mono text-[9.5px] font-semibold leading-none text-ink-2 tnum">{n}</span>
  <span aria-hidden="true" className={cx('pointer-events-none absolute z-20 w-64 rounded-lg border border-line bg-raised px-3 py-2.5 text-left shadow-lg opacity-0 invisible transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100',below?'top-[calc(100%+8px)]':'bottom-[calc(100%+8px)]',align==='start'?'left-0':align==='end'?'right-0':'left-1/2 -translate-x-1/2')}>
   <span className="flex items-center gap-2 text-[13px] font-semibold text-ink"><span className="font-mono text-[11px] text-ink-3">{n}</span><Dot color={color} className="size-2"/>{r.displayName}</span>
   <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink"><ToneIcon tone={col.tone}/>{col.full}{count!==undefined&&<span className="font-normal text-ink-3"> · {count} choices</span>}</span>
   {ending&&<span className="mt-1 block text-xs leading-snug text-ink-2">{ending}</span>}
  </span>
 </button>}

// Desktop: a value-matrix scatter. Endings are columns (worst left, best right); each model sits in its ending's column
// at the height of the choices it made in that storyline, and markers that would touch are swarmed sideways, so dozens
// of runs in one column stay readable. Phone: endings become rows and the markers wrap in a lane.
function EndingPlot({name,runs,nums,colors,hl,setHl,onPick,tall}){
 const [ref,w]=useWidth(),cols=useMemo(()=>ladder(name,runs),[name,runs]),wide=w>=560,owner=OUTCOMES[name].owner;
 const dim=r=>hl!=='all'&&hl!==r.id,byNum=list=>[...list].sort((a,b)=>(nums[a.displayName]??0)-(nums[b.displayName]??0));
 const who=name==='Alice'?'Alice':name;
 const G=64,B=22,T=24,H=tall?560:440,plotW=w-G,colW=plotW/cols.length,ph=H-T-B;
 const vals=runs.map(r=>storyChoices(r,owner)),{step,lo,top}=niceAxis(Math.min(...vals),Math.max(...vals)),ticks=Array.from({length:Math.round((top-lo)/step)+1},(_,i)=>lo+i*step);
 const yOf=v=>T+ph-((v-lo)/(top-lo))*ph;
 // Beeswarm: within a column, place markers bottom-up and nudge each sideways (0, +d, −d, +2d …) until it clears the
 // ones already placed. The few names that fit beside their marker without touching anything are drawn as labels.
 const placed=useMemo(()=>{const out=[],D=34;cols.forEach((c,i)=>{const cx0=G+colW*(i+0.5),lim=colW/2-18,mine=[];
  for(const r of [...c.runs].sort((a,b)=>storyChoices(a,owner)-storyChoices(b,owner)||(nums[a.displayName]??0)-(nums[b.displayName]??0))){const v=storyChoices(r,owner),y=yOf(v);let dx=0,bestD=-1;
   for(let k=0;k<400;k++){const cand=k===0?0:(k%2?1:-1)*Math.ceil(k/2)*D;if(Math.abs(cand)>lim)break;const md=Math.min(Infinity,...mine.map(p=>Math.hypot(p.x-(cx0+cand),p.y-y)));if(md>=D){dx=cand;break}if(md>bestD){bestD=md;dx=cand}}
   const p={r,c,i,x:cx0+dx,y,v};mine.push(p);out.push(p)}});return out},[cols,colW,owner,nums,top,lo,H]);
 const labels=useMemo(()=>{if(runs.length>16)return [];const boxes=placed.map(p=>({x0:p.x-14,x1:p.x+22,y0:p.y-14,y1:p.y+12})),res=[];
  for(const p of placed){const t=shortName(p.r.displayName),lw=t.length*6.9+6,colR=w-4,colL=G+4;
   for(const side of ['r','l']){const x0=side==='r'?p.x+24:p.x-24-lw,x1=x0+lw,y0=p.y-8,y1=p.y+8;if(x0<colL||x1>colR)continue;if(boxes.some(b=>b!==boxes[placed.indexOf(p)]&&x0<b.x1&&x1>b.x0&&y0<b.y1&&y1>b.y0))continue;res.push({p,t,x0,side});boxes.push({x0,x1,y0,y1});break}}return res},[placed,runs.length,colW,w]);
 if(!wide)return <div ref={ref} role="group" aria-label={`${who}’s ending, one marker per model, worst ending first`}>
  <div className="overflow-visible rounded-lg border border-[var(--plot-rule-2)]">
   {cols.map((c,i)=><div key={c.k} className={cx('grid grid-cols-[7.75rem_minmax(0,1fr)] items-stretch',i&&'border-t border-[var(--plot-rule)]')}>
    <div className="flex items-center gap-1.5 border-r border-[var(--plot-rule)] px-2.5 py-2"><ToneIcon tone={c.tone}/><span className="cap !text-[10px] !tracking-[.05em] text-ink-2 whitespace-nowrap">{c.label}</span><span className="ml-auto font-mono text-[10px] text-ink-3 tnum">{c.runs.length}</span></div>
    <div className="flex min-h-12 flex-wrap items-center gap-x-2 gap-y-1 px-2 py-1.5">{byNum(c.runs).map(r=><Marker key={r.id} inline r={r} n={nums[r.displayName]} color={colors[r.displayName]} col={c} name={name} align={i<2?'start':'center'} dim={dim(r)} onPick={onPick} setHl={setHl} count={storyChoices(r,owner)}/>)}{!c.runs.length&&<span className="sr-only">No models</span>}</div>
   </div>)}
  </div>
  <p className="cap mt-2 text-center">Endings · worst at top · one marker per run</p>
 </div>;
 return <div ref={ref} role="group" aria-label={`${who}’s ending by model: endings from worst to best across, choices made in the storyline up the side`}>
  <div className="relative" style={{height:H}}>
   <svg width={w} height={H} aria-hidden="true" className="absolute inset-0 block">
    {ticks.map(t=><g key={t}><line className={t!==lo?'band-rule':'axis-line'} x1={G} x2={w} y1={yOf(t)} y2={yOf(t)}/><text className="axis-label" x={G-10} y={yOf(t)} textAnchor="end" dominantBaseline="central">{t}</text></g>)}
    {cols.map((c,i)=>i>0&&<line key={c.k} className="band-rule" x1={G+colW*i} x2={G+colW*i} y1={T-6} y2={H-B}/>)}
    <line className="axis-line" x1={G} x2={G} y1={T-6} y2={H-B}/>
    <text className="axis-label" transform={`translate(12 ${T+ph/2}) rotate(-90)`} textAnchor="middle" style={{fontSize:10}}>Choices in {owner==='Kara'?'Kara’s':owner+'’s'} storyline</text>
   </svg>
   {labels.map(({p,t,x0})=><span key={p.r.id} aria-hidden="true" className={cx('pointer-events-none absolute -translate-y-1/2 whitespace-nowrap font-mono text-[11.5px] text-ink-2 transition-opacity',dim(p.r)&&'opacity-25')} style={{left:x0,top:p.y}}>{t}</span>)}
   {placed.map(p=><Marker key={p.r.id} r={p.r} n={nums[p.r.displayName]} color={colors[p.r.displayName]} col={p.c} name={name} count={p.v} below={p.y<150} align={p.i===0?'start':p.i===cols.length-1?'end':'center'} dim={dim(p.r)} onPick={onPick} setHl={setHl} style={{left:p.x,top:p.y}}/>)}
   {cols.filter(c=>!c.runs.length).map(c=><span key={c.k} className="sr-only">{c.full}: no models</span>)}
  </div>
  <div className="grid pt-1" style={{marginLeft:G,gridTemplateColumns:`repeat(${cols.length},minmax(0,1fr))`}} aria-hidden="true">
   {cols.map(c=><div key={c.k} className="flex flex-col items-center gap-1 px-1 text-center"><span className="inline-flex items-center gap-1.5"><ToneIcon tone={c.tone}/><span className="cap !text-[11.5px] text-ink">{c.label}</span></span><span className="font-mono text-[11px] text-ink-3 tnum">{c.runs.length} of {runs.length}</span></div>)}
  </div>
  <p className="cap mt-4 text-center" aria-hidden="true">Ending <span className="mx-1.5">·</span> worst <span aria-hidden="true">→</span> best</p>
 </div>}

function EndingKey({name,showName,cols:split=true}){const o=OUTCOMES[name],cols=[...o.list].reverse();
 return <div className="min-w-0">
  <p className="cap mb-2">{showName?`${name}: what each ending means`:'What each ending means'}</p>
  <dl className={cx('grid gap-x-8 gap-y-1.5 grid-cols-[minmax(0,1fr)]',split&&'lg:grid-cols-2')}>{cols.map(([k,label,tone])=><div key={k} className="grid grid-cols-[6.75rem_minmax(0,1fr)] md:grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 items-baseline text-[13px] leading-snug">
   <dt className="inline-flex items-center gap-1.5 font-semibold text-ink"><ToneIcon tone={tone} className="self-center"/>{SHORT[label]??label}</dt><dd className="text-ink-2">{ENDING_DEFS[o.field][k]}</dd></div>)}</dl>
 </div>}

function headline(name,runs){const o=OUTCOMES[name],[k]=o.list[0];return {n:runs.filter(r=>r.status?.[o.field]===k).length,phrase:o.phrase}}

function EndingCard({title,names,runs,nums,colors,hl,setHl,onPick}){
 const id='ending-'+names[0].toLowerCase(),single=names.length===1,h=headline(names[0],runs);
 return <article aria-labelledby={id} className="plot-grid anim-fade-up rounded-2xl border border-line px-4 py-5 shadow-sm md:px-8 md:py-8">
  <header className="mb-6 flex items-start justify-between gap-4 md:mb-8">
   <div className="min-w-0">
    <h3 id={id} className="text-2xl font-bold uppercase tracking-tight md:text-[32px] md:leading-none">{title}</h3>
    <p className="cap mt-2 flex items-start gap-2"><Dot color={CHAR_VAR[OUTCOMES[names[0]].owner]} className="size-2 mt-[3px]"/>{single?'Ending':'Endings'} by model · worst to best · height is choices made in the storyline</p>
   </div>
   {single&&<p className="text-right shrink-0"><span className="block text-3xl font-semibold leading-none tracking-tight md:text-5xl">{h.n}<span className="text-ink-3 text-xl md:text-3xl">/{runs.length}</span></span><span className="cap mt-1.5 block">{h.phrase}</span></p>}
  </header>
  <div className="grid grid-cols-[minmax(0,1fr)] gap-10">
   {names.map(n=>{const hh=headline(n,runs);return <figure key={n} className="m-0 min-w-0">
    {!single&&<figcaption className="mb-4 flex items-baseline justify-between gap-3"><span className="cap !text-[12px] !text-ink">{n}</span><span className="text-sm text-ink-2"><strong className="font-semibold text-ink tnum">{hh.n}</strong> of {runs.length} {hh.phrase}</span></figcaption>}
    <EndingPlot name={n} runs={runs} nums={nums} colors={colors} hl={hl} setHl={setHl} onPick={onPick} tall={single}/>
   </figure>})}
  </div>
  <div className="mt-8 border-t border-[var(--plot-rule-2)] pt-5"><NumberLegend runs={runs} colors={colors} nums={nums} highlight={hl} onHighlight={setHl} onPick={onPick} label={`Models in the ${title} chart`}/></div>
  <div className={cx('mt-5 grid gap-5 border-t border-[var(--plot-rule-2)] pt-5',!single&&'xl:grid-cols-2 xl:gap-10')}>{names.map(n=><EndingKey key={n} name={n} showName={!single} cols={single}/>)}</div>
 </article>}

export function EndingCharts({runs,onPick}){
 const [hl,setHl]=useState('all'),colors=useMemo(()=>modelColors(runs),[runs]),nums=useMemo(()=>modelNumbers(runs),[runs]);
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8">{CARDS.map(c=><EndingCard key={c.title} {...c} runs={runs} nums={nums} colors={colors} hl={hl} setHl={setHl} onPick={onPick}/>)}</div>}
