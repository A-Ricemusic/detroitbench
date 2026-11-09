import React,{useEffect,useMemo,useRef,useState} from 'react';
import {X} from 'lucide-react';
import {cx,Dot,useMediaQuery} from './ui.jsx';
import {Select} from './deferred.jsx';
import {ABBR,BROKE,DIM,FinalStrip,chapterSeries,endNote,groupBy,levelOf,useWidth} from './Charts.jsx';
import {EndingCard,CARDS} from './EndingCharts.jsx';
import {CHAR_VAR,compareRuns,runLabel,tidy} from '../lib/data.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
import {useRunDetail} from '../lib/runDetail.js';
import {setQuery,useQueryParam} from '../lib/urlState.js';
import {href} from '../lib/router.jsx';

// The relationship charts after Slopalytics' chart feed (docs/design/slopalytics-reference.md §1.3, §2): every relationship
// gauge is its own section on one scrolling page, reached by tabs grouped by character, with the section in view kept in
// `?chart=`. Each chart plots the run's value at the end of every chapter on the game's level bands, names each line at
// its right end and isolates a run on hover with a details card for the point; clicking a point or a name opens that
// run's full report (phones pin the tapped point's card instead, with a link to the report).
// Skipped from the reference: the log axis (levels are ordinal), the Pareto line ("higher" is not better on every gauge)
// and Code only.
const ORDER=['Connor','Kara','Markus'],FINAL='where-they-ended';
const slug=s=>s.label.toLowerCase().replace(/[^a-z0-9]+/g,'-');
const signed=v=>v>0?'+'+v:v<0?'−'+Math.abs(v):'0';

// Where the value changed during a chapter, which scene moved it last, so the card can name the decision. `d` is the
// run's detail file (src/lib/runDetail.js): its steps, per-step gauge values and choices.
function changeIn(d,key,c){const st=d.steps,vals=d.values[key],seen=new Map;let hit=null;
 st.forEach((s,k)=>{const n=(seen.get(s.node)??0)+1;seen.set(s.node,n);if(s.chapter!==c)return;const a=vals[k],b=vals[k+1];if(a!==null&&b!==null&&a!==b)hit={s,n}});
 if(!hit)return null;const ch=d.choices.find(x=>x.node===hit.s.node+'-v'+hit.n)??d.choices.find(x=>x.node===hit.s.node);return ch?tidy(ch.choice):tidy(hit.s.title)}

function LevelChart({scale,runs,colors,nums,titles,compact}){
 const focus=useModelFocus(),[ref,W]=useWidth(),[hot,setHot]=useState(null),[pin,setPin]=useState(null),svg=useRef(null);
 const H=compact?Math.max(360,Math.round(W*1.2)):Math.max(440,Math.min(680,(typeof innerHeight==='number'?innerHeight:900)-250));
 // Before the first measurement (and before the phone media query settles) the width can be too small for the desktop
 // margins; the plot never gets a negative width.
 const x0=compact?78:112,x1=Math.max(x0,compact?W-14:W-278),top=30,y0=compact?H-46:H-60;
 const series=useMemo(()=>[...runs].sort(compareRuns).map(r=>({r,pts:chapterSeries(r,scale.key),ended:r.track[scale.key].endedAt!==null})),[runs,scale.key]);
 const chs=useMemo(()=>[...new Set(series.flatMap(s=>s.pts.map(p=>p.c)))].sort((a,b)=>a-b),[series]),xMax=Math.max(1,...chs);
 const x=c=>x0+c/xMax*(x1-x0),span=scale.max-scale.min+1,y=v=>top+(scale.max+0.5-v)/span*(y0-top);
 // Coincident lines sit a few pixels apart so a shared path still shows how many runs are on it.
 const dodge=useMemo(()=>{const at={};for(const c of chs){const same={};for(const s of series){const p=s.pts.find(p=>p.c===c);if(!p||p.v===null)continue;(same[p.v]??=[]).push(s.r.id)}for(const ids of Object.values(same)){const d=ids.length>1?Math.min(2,12/(ids.length-1)):0;ids.forEach((id,i)=>{(at[id]??={})[c]=(i-(ids.length-1)/2)*d})}}return (id,c)=>at[id]?.[c]??0},[series,chs]);
 // Points only where the value changed during the chapter, plus the last one, so 33 chapters do not bury the line.
 const points=useMemo(()=>series.flatMap(s=>{const out=[];let prev=null;const live=s.pts.filter(p=>p.v!==null);live.forEach((p,i)=>{if(i===live.length-1||(prev!==null&&p.v!==prev))out.push({s,c:p.c,v:p.v,d:prev===null?null:p.v-prev,key:s.r.id+':'+p.c});prev=p.v});if(out.length)s.lastKey=out.at(-1).key;return out}),[series]);
 const px=p=>x(p.c),py=p=>y(p.v)+dodge(p.s.r.id,p.c);
 const step=[1,2,5,10].find(s=>(x1-x0)/xMax*s>=100)??10,ticks=[0,...Array.from({length:Math.floor(xMax/step)},(_,i)=>(i+1)*step).filter(c=>(xMax-c)/xMax*(x1-x0)>=60),xMax];
 // Right-end labels: one per run at its last value, shifted up if they would run off the plot. They sit 24px apart,
 // closer (down to 15px, in a smaller type) when that is what it takes to name every run in the plot's height.
 const labels=useMemo(()=>{if(compact)return [];const items=series.map(s=>{const last=[...s.pts].reverse().find(p=>p.v!==null);return last&&{s,ax:x(last.c),ay:y(last.v)+dodge(s.r.id,last.c)}}).filter(Boolean).sort((a,b)=>a.ay-b.ay);
  const G=Math.max(15,Math.min(24,(y0-top)/Math.max(1,items.length-1)));
  let prev=top-G;for(const it of items){it.ly=Math.max(it.ay,prev+G);prev=it.ly}const over=items.length?items.at(-1).ly-y0:0;if(over>0)for(const it of items)it.ly-=over;
  // More labels than the plot height holds: pack them from the top; the cap below keeps the first ones.
  if(items.length&&items[0].ly<top)items.forEach((it,i)=>{it.ly=top+i*G});
  const out=items.slice(0,Math.floor((y0-top)/G)+1);out.gap=G;return out},[series,compact,W,H,scale.key,dodge]);
 const lg=labels.gap??24,small=lg<20;
 const active=focus.active,groupOp=s=>active&&!active.has(s.r.id)?0.15:1,isHl=s=>!!active?.has(s.r.id);
 useEffect(()=>{const f=e=>{if(e.key==='Escape'&&!document.querySelector('[role=dialog]')){setPin(null);setHot(null)}};addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[]);
 useEffect(()=>{setPin(null);setHot(null)},[scale.key,runs]);
 const find=k=>points.find(p=>p.key===k);const hp=hot?find(hot):null,pp=pin?find(pin):null;
 // Phones: a tap anywhere pins the nearest point within 40px, or unpins.
 const tap=e=>{if(!compact)return;const b=svg.current.getBoundingClientRect(),mx=(e.clientX-b.left)/b.width*W,my=(e.clientY-b.top)/b.height*H;let best=null,bd=40;for(const p of points){const d=Math.hypot(px(p)-mx,py(p)-my);if(d<bd){bd=d;best=p}}
  if(best){setPin(best.key);focus.setHover(best.s.r.id)}else{setPin(null);focus.setHover(null)}};
 const guide=(p,solid)=>{const col=colors[p.s.r.displayName],gx=px(p),gy=py(p);return <g key={(solid?'p':'h')+p.key} aria-hidden="true" pointerEvents="none">
  <line x1={x0} x2={gx} y1={gy} y2={gy} stroke={col} strokeWidth="1" opacity=".8" strokeDasharray={solid?undefined:'4 4'}/>
  <line x1={gx} x2={gx} y1={top} y2={y0} stroke={col} strokeWidth="1" opacity=".5" strokeDasharray={solid?undefined:'4 4'}/>
  <text x={x0+6} y={gy-7} className="halo-text" style={{fontSize:11}}>{levelOf(scale,p.v)} · {p.v>0?'+':''}{p.v}</text>
  <text x={Math.min(gx+6,x1-90)} y={y0-8} className="halo-text" style={{fontSize:11}}>{p.c===0?'Start':`Ch. ${p.c}`}</text>
 </g>};
 const name=runLabel;
 const card=hp||pp?<Card p={hp??pp} pinned={!!pp&&!hp} scale={scale} colors={colors} nums={nums} name={name} titles={titles} onClose={()=>{setPin(null);setHot(null);if(compact)focus.setHover(null)}} compact={compact}/>:null;
 return <div>
  <div ref={ref} className="relative">
   <svg ref={svg} width={W} height={H} role="group" aria-label={`${scale.label} toward ${scale.toward} at the end of each chapter, on the game’s level bands`} className="block max-w-full select-none" onPointerDown={compact?tap:undefined}>
    {scale.bands.map((b,i)=>{const ya=y(b.to+0.5),yb=y(b.from-0.5);return <g key={b.level}>{i%2===1&&<rect x={x0} y={ya} width={Math.max(0,x1-x0)} height={yb-ya} className="band-b"/>}
     <line x1={x0} x2={x1} y1={yb} y2={yb} className="dot-grid"/>{i===scale.bands.length-1&&<line x1={x0} x2={x1} y1={ya} y2={ya} className="dot-grid"/>}
     {yb-ya>=12&&<text x={x0-12} y={(ya+yb)/2} textAnchor="end" dominantBaseline="central" className="band-label">{compact?ABBR[b.level]??b.level:b.level}</text>}</g>})}
    <text x={x0} y={18} className="axis-label" style={{fontSize:11}}>{scale.label} toward {scale.toward}</text>
    <line className="axis-line" x1={x0} x2={x1} y1={y0} y2={y0}/>
    {ticks.map(c=><g key={c}><line className="axis-line" x1={x(c)} x2={x(c)} y1={y0} y2={y0+5}/><text className="axis-label" x={x(c)} y={y0+22} textAnchor={c===0?'start':c===xMax?'end':'middle'}>{c===0?'Start':c===xMax?`${c} · end`:c}</text></g>)}
    <text className="axis-label" x={(x0+x1)/2} y={y0+(compact?40:50)} textAnchor="middle" style={{fontSize:12}}>Chapter</text>
    {pp&&guide(pp,true)}{hp&&hp!==pp&&guide(hp,false)}
    {series.map(s=>{const segs=[];let cur=[];for(const p of s.pts){if(p.v===null){if(cur.length)segs.push(cur);cur=[]}else cur.push(p)}if(cur.length)segs.push(cur);const last=[...s.pts].reverse().find(p=>p.v!==null),col=colors[s.r.displayName]??DIM,hl=isHl(s);
     return <g key={s.r.id} style={{opacity:groupOp(s)}}>
      {segs.map((seg,j)=><path key={j} d={seg.map((p,k)=>(k?'L':'M')+x(p.c).toFixed(1)+','+(y(p.v)+dodge(s.r.id,p.c)).toFixed(1)).join('')} fill="none" stroke={col} strokeWidth={hl?3.5:2.25} opacity={hl?1:0.8} strokeLinejoin="round" strokeLinecap="round"/>)}
      {s.ended&&last&&<text x={x(last.c)} y={y(last.v)+dodge(s.r.id,last.c)} dx="9" textAnchor="middle" dominantBaseline="central" className="end-mark" style={{fill:col}}>{BROKE.has(scale.key)?'|':'✕'}</text>}
     </g>})}
    {points.map(p=>{const col=colors[p.s.r.displayName]??DIM,on=hp?.key===p.key||pp?.key===p.key,faded=!active&&hp&&!on;
     const dot=<><circle cx={px(p)} cy={py(p)} r="13" fill="transparent"/><circle cx={px(p)} cy={py(p)} r={on?7:4.5} fill={col} stroke="var(--plot-bg)" strokeWidth="1.8"/></>,style={opacity:groupOp(p.s)*(faded?0.45:1)};
     if(compact)return <g key={p.key} style={{...style,pointerEvents:'none'}}>{dot}</g>;
     return <a key={p.key} href={href('runs/'+p.s.r.id+'/report')} aria-label={`${p.s.r.displayName}, ${p.c===0?'start':'chapter '+p.c}, ${levelOf(scale,p.v)} (${p.v>0?'+':''}${p.v}). Open the full report`}
      style={style} className="cursor-pointer outline-none [&:focus-visible>circle:last-child]:stroke-[var(--ink)]"
      onPointerEnter={()=>setHot(p.key)} onPointerLeave={()=>setHot(null)} onFocus={()=>setHot(p.key)} onBlur={()=>setHot(null)}>{dot}</a>})}
    {labels.map(l=>{const s=l.s,col=colors[s.r.displayName]??DIM,n=nums[s.r.displayName],pinned=focus.pins.has(s.r.id);
     return <a key={s.r.id} href={href('runs/'+s.r.id+'/report')} aria-label={`${s.r.displayName}: open the full report`} className="cursor-pointer outline-none [&:hover_.lbl-name]:underline [&:focus-visible_.lbl-name]:underline" style={{opacity:active&&!active.has(s.r.id)?0.4:1}}
      onPointerEnter={()=>{focus.setHover(s.r.id);setHot(s.lastKey??null)}} onPointerLeave={()=>{focus.setHover(null);setHot(null)}} onFocus={()=>{focus.setHover(s.r.id);setHot(s.lastKey??null)}} onBlur={()=>{focus.setHover(null);setHot(null)}}>
      <path d={`M${l.ax+6},${l.ay}L${x1+18},${l.ly}L${x1+20},${l.ly}`} fill="none" stroke={col} strokeWidth=".75" opacity=".22" pointerEvents="none"/>
      <rect x={x1+20} y={l.ly-lg/2} width={Math.max(0,W-x1-20)} height={lg} fill="transparent"/>
      <circle cx={x1+31} cy={l.ly} r={small?7.5:9} className="num-badge" style={{stroke:col}}/><text x={x1+31} y={l.ly} textAnchor="middle" dominantBaseline="central" className="num-text">{n}</text>
      <text x={x1+48} y={l.ly} dominantBaseline="central" className="lbl-name" style={{fill:'var(--ink)',fontSize:small?11.5:13,fontWeight:pinned?700:550}}><title>{name(s.r)}</title>{name(s.r)}</text>
     </a>})}
   </svg>
   {!compact&&card&&<div className="pointer-events-none absolute right-2 bottom-[72px] z-20">{card}</div>}
  </div>
  {compact&&card&&<div className="sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] z-20 mt-3">{card}</div>}
 </div>}

// Details for the hovered point (desktop, where a click opens the run's report) or the tapped one (phones, pinned until
// closed, with a link to the report).
function Card({p,pinned,scale,colors,nums,name,titles,onClose,compact}){
 const head=(p,small)=><span className="flex min-w-0 items-center gap-2"><span className={cx('inline-flex shrink-0 items-center justify-center rounded-full border font-mono font-semibold text-ink-2',small?'size-4 text-[9px]':'size-5 text-[10px]')} style={{borderColor:colors[p.s.r.displayName]}}>{nums[p.s.r.displayName]}</span><span className={cx('truncate font-semibold text-ink',small?'text-xs':'text-[13px]')}>{name(p.s.r)}</span></span>;
 const ch=p=>p.c===0?'Start':`Chapter ${p.c} · ${titles[p.c]??''}`;
 const close=pinned&&<button type="button" aria-label="Close details" onClick={onClose} className="pointer-events-auto -mr-1.5 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded text-ink-3 hover:text-ink"><X aria-hidden="true" className="size-4"/></button>;
 const box=cx('rounded-lg border border-line-2 bg-surface px-4 py-3.5 text-left shadow-lg',compact?'w-full':'w-[272px]');
 const t=p.s.r.track[scale.key],unmet=!!t.unmet,last=p.key===p.s.lastKey,note=(unmet||last&&t.ended)?endNote(scale,t):null,detail=useRunDetail(unmet?null:p.s.r.id);
 // The deciding choice comes from the run's detail file, fetched on the first card for that run.
 const decision=unmet||!detail?null:changeIn(detail,scale.key,p.c),loading=!unmet&&detail===undefined;
 return <div role="status" className={cx(box,pinned&&'pointer-events-auto')}>
  <div className="flex items-start justify-between gap-3">{head(p)}{close}</div>
  <p className="mt-0.5 text-[11.5px] text-ink-2">{ch(p)}{pinned?' · Pinned':''}</p>
  <dl className={cx('mt-2.5 grid gap-x-4 gap-y-1 text-xs',compact?'grid-cols-2':'grid-cols-[auto_minmax(0,1fr)]')}>
   <dt className="whitespace-nowrap text-ink-2">Level</dt><dd className="whitespace-nowrap text-right font-medium text-ink">{levelOf(scale,p.v)}</dd>
   {!unmet&&<><dt className="whitespace-nowrap text-ink-2">Points</dt><dd className="whitespace-nowrap text-right font-medium text-ink tnum">{p.v>0?'+':''}{p.v}</dd>
   <dt className="whitespace-nowrap text-ink-2">Change this chapter</dt><dd className="whitespace-nowrap text-right font-medium text-ink tnum">{p.d===null?'—':signed(p.d)}</dd></>}
   {note&&<dd className="col-span-2 mt-1 text-ink [text-wrap:pretty]">{unmet?[t.unmet.text,t.unmet.reason].filter(Boolean).join('. ')+'.':note+'.'}</dd>}
   {(decision||loading)&&<><dt className="col-span-2 mt-1 text-ink-2">Decision</dt><dd className={cx('col-span-2 [text-wrap:pretty]',loading?'text-ink-3':'text-ink')}>{loading?'Loading…':decision}</dd></>}
  </dl>
  {pinned?<a href={href('runs/'+p.s.r.id+'/report')} className="mt-2.5 inline-block text-[11.5px] text-ink underline underline-offset-2">Open report</a>:<p className="mt-2.5 text-[11.5px] text-ink-3">Click to open the full report</p>}
 </div>}

// The chart feed on the results page: the three ending-row cards, then one section per relationship gauge, then
// "Where they ended", each a section reached by the sticky tabs, with the section in view kept in `?chart=`.
// `runs` is the whole library (colours and numbers), `shown` the runs the model sidebar leaves visible, `chapters` the
// library's chapter titles by number.
const ENDINGS=[{id:'connor-ending',label:'Connor',card:0},{id:'kara-alice-ending',label:'Kara & Alice',card:1},{id:'markus-ending',label:'Markus',card:2}];
export function ChartFeed({runs,shown,scales,chapters,colors,nums,empty}){
 const compact=useMediaQuery('(max-width: 900px)');
 const titles=useMemo(()=>({0:'Start',...chapters}),[chapters]);
 const groups=useMemo(()=>{const g=groupBy(scales,s=>s.toward);return ORDER.filter(c=>g[c]).map(c=>({c,scales:g[c]}))},[scales]);
 const sections=useMemo(()=>[...ENDINGS,...groups.flatMap(g=>g.scales.map(s=>({id:slug(s),label:s.label}))),{id:FINAL,label:'Where they ended'}],[groups]);
 const chartParam=useQueryParam('chart'),[current,setCurrent]=useState(()=>sections.some(s=>s.id===chartParam)?chartParam:sections[0].id),lock=useRef(0),tabs=useRef(null);
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 const go=id=>{const el=document.getElementById('chart-'+id);if(!el)return;lock.current=Date.now();setCurrent(id);setQuery({chart:id===sections[0].id?null:id});el.scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'})};
 // Arrive at the chart named in the URL (old #/relationships links are redirected here with one).
 useEffect(()=>{if(chartParam&&sections.some(s=>s.id===chartParam)){lock.current=Date.now();const t=setTimeout(()=>document.getElementById('chart-'+chartParam)?.scrollIntoView({block:'start'}),80);return()=>clearTimeout(t)}},[]);
 // Scroll spy: the active section is the last one whose top is above a third of the space under the sticky bars.
 // Above the feed nothing is active and `chart` is cleared.
 useEffect(()=>{let raf=0;const f=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{if(Date.now()-lock.current<1500)return;const bar=tabs.current?.getBoundingClientRect().bottom??0,line=bar+(innerHeight-bar)/3;let id=null;for(const s of sections){const el=document.getElementById('chart-'+s.id);if(el&&el.getBoundingClientRect().top<=line)id=s.id}
  setCurrent(c=>{const next=id??sections[0].id;if(c!==next||id===null){const q=id&&id!==sections[0].id?id:null;if(new URLSearchParams(location.hash.split('?')[1]??'').get('chart')!==q)setQuery({chart:q})}return next})})};addEventListener('scroll',f,{passive:true});return()=>{removeEventListener('scroll',f);cancelAnimationFrame(raf)}},[sections]);
 useEffect(()=>{const t=tabs.current?.querySelector('[aria-current=true]'),nav=tabs.current?.querySelector('nav');if(t&&nav&&(t.offsetLeft<nav.scrollLeft||t.offsetLeft+t.offsetWidth>nav.scrollLeft+nav.clientWidth))nav.scrollLeft=t.offsetLeft-16},[current]);
 const tab=(id,label,extra)=>{const on=current===id;return <button key={id} type="button" aria-current={on?'true':undefined} onClick={()=>go(id)} className={cx('relative shrink-0 whitespace-nowrap py-3 text-[12.5px] transition-colors',on?'text-ink':'text-ink-2 hover:text-ink',extra)}>{label}{on&&<span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-ink"/>}</button>};
 const sep=k=><span key={k} aria-hidden="true" className="my-auto h-3.5 w-px shrink-0 bg-line-2"/>,cap=t=><span key={'c'+t} aria-hidden="true" className="my-auto shrink-0 font-mono text-[11px] uppercase tracking-[.08em] text-ink-3">{t}</span>;
 const head=(id,title,sub,note)=><div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><h2 id={'chart-'+id+'-h'} className="flex items-center gap-2 text-lg font-semibold md:text-xl">{title}{sub&&<span className="text-sm font-normal text-ink-3">{sub}</span>}</h2>{note&&<p className="cap">{note}</p>}</div>;
 const sec='scroll-mt-[calc(var(--header-h)+64px)] md:scroll-mt-[calc(var(--header-h)+96px)] border-b border-line py-6 md:py-8';
 return <div className="min-w-0">
  <div ref={tabs} className="sticky top-[var(--header-h)] z-20 -mx-4 border-b border-line bg-bg/92 px-4 backdrop-blur-md md:mx-0 md:px-0">
   {/* Phones: one menu of charts; wider screens: the tabs wrap onto a second line rather than scroll sideways. */}
   <div className="py-2 md:hidden"><Select label="Chart" hideLabel value={current} onChange={go} options={[...ENDINGS.map(e=>({value:e.id,label:e.label,hint:'Ending'})),...groups.flatMap(g=>g.scales.map(s=>({value:slug(s),label:s.label,hint:`toward ${g.c}`,icon:CHAR_VAR[g.c]}))),{value:FINAL,label:'Where they ended'}]}/></div>
   <nav aria-label="Charts" className="hidden md:flex flex-wrap items-stretch gap-x-4">
    {cap('Endings')}{ENDINGS.map(e=>tab(e.id,e.label))}
    {groups.flatMap(g=>[sep('s'+g.c),cap(g.c),...g.scales.map(s=>tab(slug(s),s.label))])}
    {sep('sf')}{tab(FINAL,'Where they ended','pr-4')}
   </nav>
  </div>
  {ENDINGS.map(e=><section key={e.id} id={'chart-'+e.id} aria-label={`${e.label} ending`} className={sec}>{empty||<EndingCard {...CARDS[e.card]} runs={shown} nums={nums} colors={colors}/>}</section>)}
  {groups.flatMap(g=>g.scales.map(s=>{const id=slug(s);return <section key={id} id={'chart-'+id} aria-labelledby={'chart-'+id+'-h'} className={sec}>
   {head(id,<><Dot color={CHAR_VAR[s.toward]} className="size-2"/>{s.label}</>,`toward ${s.toward}`,s.key==='instability'?'Unstable = deviancy 4+':null)}
   {empty||<div className="plot-grid rounded-2xl border border-line p-2 md:p-3"><LevelChart scale={s} runs={shown} colors={colors} nums={nums} titles={titles} compact={compact}/></div>}
  </section>}))}
  <section id={'chart-'+FINAL} aria-labelledby={'chart-'+FINAL+'-h'} className="scroll-mt-[calc(var(--header-h)+64px)] md:scroll-mt-[calc(var(--header-h)+96px)] py-6 md:py-8">
   {head(FINAL,'Where they ended',null,'Final level per run · ♥ North as lover')}
   {empty||<div className="plot-grid grid grid-cols-[minmax(0,1fr)] gap-10 rounded-2xl border border-line px-4 py-5 md:px-8 md:py-8">{groups.map(g=><div key={g.c} className="min-w-0"><h3 className="cap !text-[11px] text-ink-2 flex items-center gap-2 mb-4"><Dot color={CHAR_VAR[g.c]} className="size-2"/>Around {g.c}</h3><div className="grid gap-6">{g.scales.map(s=><div key={s.key}><div className="flex items-baseline justify-between gap-3 mb-2"><b className="text-sm font-semibold">{s.label}</b>{s.key==='instability'&&<span className="text-xs text-ink-3">Unstable = deviancy 4+</span>}</div><FinalStrip scale={s} runs={shown} colors={colors} nums={nums}/></div>)}</div></div>)}</div>}
  </section>
 </div>}
