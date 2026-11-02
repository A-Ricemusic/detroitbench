import React,{useId,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {Select,cx,Dot} from './ui.jsx';
import {CHAR_VAR,modelColors,shortName} from '../lib/data.js';
import {announce} from '../lib/announce.jsx';
// Series colours come from CSS variables (--series-1…8), stepped separately for light and dark surfaces
// and validated with the dataviz palette checker. Assigned by model name, never by rank.
const DIM='var(--chart-dim)';
// Curated short forms for narrow axes; the full word stays in a tooltip.
const ABBR={Skeptical:'Skept.',Indifferent:'Indiff.',Sympathetic:'Symp.',Supportive:'Supp.',Respected:'Resp.',Unpopular:'Unpop.',Uncertain:'Uncert.',Neutral:'Neut.',Trusted:'Trust.',Hostile:'Host.',Unstable:'Unst.'};

// Ending categories per character, best outcome first. `phrase` completes "N of M …".
export const OUTCOMES={
 Connor:{field:'connor',owner:'Connor',phrase:'ended free',list:[['free','Free','good'],['controlled','Controlled','mid'],['machine','Stayed a machine','mid'],['deactivated','Deactivated','bad']]},
 Kara:{field:'kara',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['left','Left Alice','serious'],['captured','Captured','serious'],['died','Died','bad']]},
 Alice:{field:'alice',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['captured','Captured','serious'],['died','Died','bad']]},
 Markus:{field:'markus',owner:'Markus',phrase:'won peacefully',list:[['peaceful win','Peaceful win','good'],['uprising won','Uprising won','mid'],['alive','Survived','mid'],['cast out','Cast out','serious'],['died','Died','bad']]}
};
const SEG={good:'bg-good',mid:'bg-mid',serious:'bg-serious',bad:'bg-bad'};
const SEG_TEXT={good:'text-good',mid:'text-ink-2',serious:'text-serious',bad:'text-bad'};
const GROUPS=[{title:'Connor',names:['Connor']},{title:'Kara & Alice',names:['Kara','Alice']},{title:'Markus',names:['Markus']}];

function useWidth(){const ref=useRef(null),[w,setW]=useState(320);useLayoutEffect(()=>{const el=ref.current;if(!el)return;setW(Math.max(220,Math.round(el.getBoundingClientRect().width)));const ro=new ResizeObserver(([e])=>setW(Math.max(220,Math.round(e.contentRect.width))));ro.observe(el);return()=>ro.disconnect()},[]);return [ref,w]}
const levelOf=(scale,v)=>scale.bands.find(b=>v>=b.from&&v<=b.to)?.level??'';
const groupBy=(xs,f)=>xs.reduce((m,x)=>{const k=f(x);(m[k]??=[]).push(x);return m},{});

/* ---------- Outcome bars: one 100% stacked bar per character ---------- */
function OutcomeBar({name,o,runs,open,setOpen,onPick,showName=true}){
 const known=new Set(o.list.map(x=>x[0]));
 const groups=o.list.map(([k,label,tone])=>({k,label,tone,runs:runs.filter(r=>r.status?.[o.field]===k)})).filter(g=>g.runs.length);
 const other=runs.filter(r=>!known.has(r.status?.[o.field]));if(other.length)groups.push({k:'other',label:'Other',tone:'mid',runs:other});
 const best=runs.filter(r=>r.status?.[o.field]===o.list[0][0]).length,sel=groups.find(g=>open===name+':'+g.k);
 return <div className="min-w-0">
  <div className="flex items-baseline justify-between gap-3 mb-2"><span className={cx('font-medium text-sm',!showName&&'sr-only')}>{name}</span><span className="text-sm text-ink-2 ml-auto"><strong className="text-ink tnum">{best}</strong> of {runs.length} {o.phrase}</span></div>
  <div role="group" aria-label={`${name}: `+groups.map(g=>`${g.label} ${g.runs.length}`).join(', ')} className="flex h-7 w-full gap-0.5 rounded-md overflow-hidden">{groups.map(g=><button key={g.k} type="button" style={{flexGrow:g.runs.length,flexBasis:0}} aria-pressed={sel===g} aria-label={`${g.label}: ${g.runs.length} of ${runs.length}. Show models`} onClick={()=>{const next=sel===g?null:name+':'+g.k;setOpen(next);if(next)announce(`${name}, ${g.label}: ${g.runs.map(r=>r.displayName).join(', ')}`)}} className={cx('focus-inset relative min-w-6 text-[11px] font-semibold text-on-tone tnum transition-[filter] hover:brightness-110 focus-visible:z-10',SEG[g.tone],sel===g&&'ring-2 ring-inset ring-surface')}>{g.runs.length}</button>)}</div>
  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">{groups.map(g=><li key={g.k} className="inline-flex items-center gap-1.5"><i aria-hidden="true" className={cx('size-2.5 rounded-[3px]',SEG[g.tone])}/>{g.label} <b className="text-ink tnum">{g.runs.length}</b></li>)}</ul>
  <p className={cx('text-sm text-ink-2',sel?'mt-2 anim-fade-up':'hidden')}>{sel&&<><b className={cx('font-medium',SEG_TEXT[sel.tone])}>{sel.label}:</b> {sel.runs.map((r,i)=><React.Fragment key={r.id}>{i>0&&', '}{onPick?<button type="button" className="link" aria-haspopup="dialog" onClick={()=>onPick(r.id)}>{r.displayName}</button>:r.displayName}</React.Fragment>)}</>}</p>
 </div>}
export function OutcomeChart({runs,onPick}){
 const [open,setOpen]=useState(null);
 return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">{GROUPS.map(g=><div key={g.title} className={cx('rounded-xl border border-line bg-surface p-4 shadow-sm grid gap-5 content-start',g.names.length>1&&'md:order-last md:col-span-2 lg:order-none lg:col-span-1 md:[&>div]:grid md:[&>div]:grid-cols-1')} style={{'--c':CHAR_VAR[OUTCOMES[g.names[0]].owner]}}>
  <h3 className="inline-flex items-center gap-2 font-semibold text-base -mb-2"><Dot color="var(--c)"/>{g.title}</h3>
  {g.names.map(n=><OutcomeBar key={n} name={n} o={OUTCOMES[n]} runs={runs} open={open} setOpen={setOpen} onPick={onPick} showName={g.names.length>1}/>)}
 </div>)}</div>}

/* ---------- Model legend: highlight one model across every chart ---------- */
export function ModelLegend({runs,colors,highlight,onHighlight}){
 const chip=(on,dim)=>cx('inline-flex items-center gap-1.5 rounded-full border px-2.5 min-h-9 text-xs md:text-[13px] font-medium whitespace-nowrap transition-colors shrink-0',on?'bg-ink text-bg border-ink':dim?'bg-surface text-ink-3 border-line hover:text-ink hover:bg-surface-2':'bg-surface text-ink-2 border-line-2 hover:text-ink hover:bg-surface-2');
 return <div role="group" aria-label="Highlight a model" className="flex flex-wrap gap-1.5 py-1 -my-1">
  <button type="button" aria-pressed={highlight==='all'} onClick={()=>onHighlight('all')} className={chip(highlight==='all')}>All models</button>
  {[...runs].sort((a,b)=>a.displayName.localeCompare(b.displayName)).map(r=><button type="button" key={r.id} aria-pressed={highlight===r.id} onClick={()=>onHighlight(highlight===r.id?'all':r.id)} className={chip(highlight===r.id,highlight!=='all'&&highlight!==r.id)}><Dot color={colors[r.displayName]}/>{r.displayName}</button>)}
 </div>}

/* ---------- Final value of one relationship: one dot per model on the game's level bands ---------- */
export function FinalStrip({scale,runs,colors,highlight='all'}){
 const [ref,w]=useWidth(),[tip,setTip]=useState(null),ptr=useRef('mouse');
 const pad=4,n=scale.max-scale.min+1,u0=(w-2*pad)/n;
 const fit=(cw)=>{const need=scale.bands.map(b=>Math.max((b.to-b.from+1)*u0,b.level.length*cw+10)),k=(w-2*pad)/need.reduce((a,b)=>a+b,0);const geo=[];let at=pad;scale.bands.forEach((b,i)=>{const bw=need[i]*k;geo.push({...b,x0:at,x1:at+bw});at+=bw});return {geo,stagger:geo.some(g=>g.x1-g.x0<g.level.length*cw+6)}};
 // Labels shrink one step before they stagger onto two rows.
 let {geo,stagger}=fit(6.3),small=false,abbr=false;if(stagger){const alt=fit(5.4);if(!alt.stagger){geo=alt.geo;stagger=false;small=true}else{abbr=true;small=true;geo=alt.geo;stagger=false}}
 const short=l=>abbr?(ABBR[l]??(l.length>7?l.slice(0,5)+'.':l)):l;
 const x=v=>{const g=geo.find(g=>v>=g.from&&v<=g.to)??geo.at(-1);return g.x0+(v-g.from+0.5)/(g.to-g.from+1)*(g.x1-g.x0)};
 // Rows are assigned by collision, so neighbouring scores never overlap each other's 24px targets.
 // Dots that share a score sit two abreast, and groups only stack above a neighbour when they would overlap it.
 const STEP=24,placed=[],rows=[];const byScore=groupBy(runs.filter(r=>r.track[scale.key].score!==null),r=>r.track[scale.key].score);
 for(const [sc,list] of Object.entries(byScore).sort((a,b)=>+a[0]-+b[0])){const px=x(+sc),n=list.length,wide=n>1;let start=0;for(let k=0;k<rows.length;k++)if(rows[k].some(q=>Math.abs(q-px)<STEP+(wide?16:0)))start=k+1;
  list.forEach((r,i)=>{const row=start+Math.floor(i/2),dx=wide?(i%2?8:-8):0;(rows[row]??=[]).push(px+dx);placed.push({r,t:r.track[scale.key],k:row,dx})})}
 const tall=Math.max(2,rows.length),base=10+tall*STEP,H=base+20;
 const order=[...placed].sort((a,b)=>(a.r.id===highlight)-(b.r.id===highlight));
 const off=groupBy(runs.filter(r=>r.track[scale.key].score===null),r=>r.track[scale.key].final);
 const on=r=>highlight==='all'||highlight===r.id;
 const show=(r,t,cx_,cy)=>setTip({r,t,cx:cx_,cy});
 React.useEffect(()=>{if(!tip)return;const key=e=>{if(e.key==='Escape')setTip(null)},out=e=>{if(!ref.current?.contains(e.target))setTip(null)};document.addEventListener('keydown',key);document.addEventListener('pointerdown',out);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',out)}},[!!tip]);
 return <div>
  <div className="relative" ref={ref} onPointerLeave={e=>{if(e.pointerType!=='touch')setTip(null)}}>
   <svg width={w} height={H} role="img" className="block max-w-full" aria-label={`${scale.label} toward ${scale.toward} at the end: `+runs.map(r=>`${r.displayName} ${r.track[scale.key].final}`).join('; ')}>
    {geo.map((b,i)=><g key={b.level}><rect className={i%2?'band-b':'band-a'} x={b.x0} y={0} width={b.x1-b.x0} height={base+2} rx={3}/><text className="band-label" style={small?{fontSize:10}:undefined} x={(b.x0+b.x1)/2} y={base+15} textAnchor="middle">{short(b.level)}{abbr&&<title>{b.level}</title>}</text></g>)}
   </svg>
   <div className="absolute inset-0">{order.map(({r,t,k,dx})=>{const cx_=x(t.score)+dx,cy=base-12-k*STEP,fill=on(r)?colors[r.displayName]:DIM;
    return <button key={r.id} type="button" tabIndex={-1} aria-hidden="true" aria-label={`${r.displayName}: ${t.final}`} onPointerDown={e=>{ptr.current=e.pointerType}} onClick={()=>{if(ptr.current==='touch'&&tip?.r===r)setTip(null);else show(r,t,cx_,cy)}} onPointerEnter={e=>{if(e.pointerType!=='touch')show(r,t,cx_,cy)}} className="absolute -translate-x-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 outline-accent" style={{left:cx_,top:cy}}>
     {t.final==='Lover'?<span aria-hidden="true" className="text-[15px] leading-none" style={{color:fill}}>♥</span>:<span aria-hidden="true" className="block size-[11px] rounded-full ring-2 ring-surface" style={{background:fill}}/>}
    </button>})}</div>
   {tip&&<div aria-hidden="true" className={cx('pointer-events-none absolute z-30 -translate-x-1/2 rounded-md bg-ink text-bg px-2.5 py-1.5 text-xs shadow-lg max-w-[220px] text-center',tip.cy<44?'':'-translate-y-full')} style={{left:Math.min(Math.max(tip.cx,100),w-100),top:tip.cy<44?tip.cy+14:tip.cy-14}}><b className="font-semibold">{tip.r.displayName}</b><span className="ml-1.5 opacity-80">{tip.t.final}{tip.t.final!==levelOf(scale,tip.t.score)&&` · ${levelOf(scale,tip.t.score)} trust`}</span></div>}
  </div>
  {Object.keys(off).length>0&&<p className="mt-1.5 text-xs text-ink-2 flex flex-wrap gap-x-4 gap-y-1">{Object.entries(off).map(([label,list])=><span key={label}><b className="font-medium text-ink">{label}</b> in {list.length}: {list.map((r,i)=><span key={r.id} className={cx('inline-flex items-center gap-1 ml-1',!on(r)&&'text-ink-3')}><Dot color={on(r)?colors[r.displayName]:DIM} className="size-2"/>{shortName(r.displayName)}{i<list.length-1?',':''}</span>)}</span>)}</p>}
 </div>}

// Value at the end of each chapter, so runs of different lengths line up.
function chapterSeries(r,key){const st=r.track.steps,t=r.track[key],chs=[0,...new Set(st.map(s=>s.chapter))];
 return chs.map(c=>{let idx=0;for(let i=0;i<st.length;i++)if(st[i].chapter<=c)idx=i+1;return {c,v:t.values[idx]??null}})}
const BROKE=new Set(['amandaTrust']);

/* ---------- Trend: value by chapter, crosshair readout ---------- */
export function TrendChart({scale,runs,colors,highlight='all',compact=false}){
 const [ref,w]=useWidth(),[hover,setHover]=useState(null),[focused,setFocused]=useState(false),id=useId();
 const narrow=!compact&&w<560,labelsRight=!compact&&w>=700;
 const H=compact?168:280,m={l:compact?74:narrow?62:86,r:labelsRight?104:10,t:8,b:compact?16:24};
 const series=useMemo(()=>runs.map(r=>({r,pts:chapterSeries(r,scale.key),ended:r.track[scale.key].endedAt!==null})),[runs,scale.key]);
 const summary=useMemo(()=>{if(!compact||!series[0])return '';const pts=series[0].pts.filter(p=>p.v!==null);if(!pts.length)return `${scale.label} toward ${scale.toward}: no value`;const steps=[];let prev=null;for(const p of pts){const l=levelOf(scale,p.v);if(l!==prev){steps.push(p.c===0?`start ${l}`:`chapter ${p.c} ${l}`);prev=l}}return `${scale.label} toward ${scale.toward}: ${steps.join(', ')}, ending ${series[0].r.track[scale.key].final}`},[compact,series,scale]);
 const titles=useMemo(()=>{const t={0:'Start'};for(const r of runs)for(const s of r.track.steps)t[s.chapter]??=s.chapterTitle;return t},[runs]);
 const chs=useMemo(()=>[...new Set(series.flatMap(s=>s.pts.map(p=>p.c)))].sort((a,b)=>a-b),[series]),xMax=Math.max(1,...chs);
 const x=c=>m.l+c/xMax*(w-m.l-m.r),span=scale.max-scale.min+1,y=v=>m.t+(scale.max+0.5-v)/span*(H-m.t-m.b);
 const on=r=>highlight==='all'||highlight===r.id;
 const near=e=>{if(e.pointerType==='touch'&&e.type==='pointermove')return;const b=e.currentTarget.getBoundingClientRect(),px=(e.clientX-b.left)/b.width*w;let best=chs[0];for(const c of chs)if(Math.abs(x(c)-px)<Math.abs(x(best)-px))best=c;setHover(best)};
 const ordered=series.map((s,i)=>({...s,i})).sort((a,b)=>on(a.r)-on(b.r)||(a.r.id===highlight)-(b.r.id===highlight));
 const stroke=s=>on(s.r)?(compact?CHAR_VAR[scale.toward]:colors[s.r.displayName]):DIM;
 const readout=hover===null?null:series.map(s=>({s,p:s.pts.find(p=>p.c===hover)})).filter(o=>o.p&&o.p.v!==null&&(highlight==='all'||o.s.r.id===highlight)).sort((a,b)=>b.p.v-a.p.v);
 const onKey=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const i=hover===null?-1:chs.indexOf(hover);setHover(chs[Math.min(chs.length-1,Math.max(0,i+(e.key==='ArrowRight'?1:-1)))])}else if(e.key==='Home'){e.preventDefault();setHover(chs[0])}else if(e.key==='End'){e.preventDefault();setHover(chs.at(-1))}else if(e.key==='Escape')setHover(null)};
 // Coincident lines are dodged a few pixels apart so a shared path still shows how many models are on it.
 const dodge=useMemo(()=>{if(compact)return ()=>0;const at={};for(const c of chs){const same={};for(const s of series){const p=s.pts.find(p=>p.c===c);if(!p||p.v===null)continue;(same[p.v]??=[]).push(s.r.id)}for(const ids of Object.values(same))ids.forEach((id,i)=>{(at[id]??={})[c]=(i-(ids.length-1)/2)*1.6})}return (id,c)=>at[id]?.[c]??0},[series,chs,compact]);
 // Fixed tick rhythm: a step of 2, 5 or 10 chapters that keeps labels at least 92px apart, plus Start and the end.
 const step=[1,2,5,10].find(s=>(w-m.l-m.r)/xMax*s>=92)??10,ticks=[0,...Array.from({length:Math.floor(xMax/step)},(_,i)=>(i+1)*step).filter(c=>xMax-c>=step*0.8),xMax];
 const endGlyph=()=>BROKE.has(scale.key)?'|':'✕';
 // Direct labels at each line's end, nudged apart so names never overlap.
 const endKey=useMemo(()=>{if(!narrow)return [];const by={};for(const s of series){const last=[...s.pts].reverse().find(p=>p.v!==null);if(!last)continue;(by[levelOf(scale,last.v)]??=[]).push(s)}return Object.entries(by).sort((a,b)=>b[1][0].pts.at(-1).v-a[1][0].pts.at(-1).v)},[narrow,series,scale]);
 const endLabels=useMemo(()=>{if(!labelsRight)return [];const groups=new Map();for(const s of series){const last=[...s.pts].reverse().find(p=>p.v!==null);if(!last)continue;const key=last.c+':'+last.v;if(!groups.has(key))groups.set(key,{x:x(last.c),y:y(last.v),members:[]});groups.get(key).members.push(s)}
  const items=[...groups.values()].sort((a,b)=>a.y-b.y);const gap=13;for(let i=1;i<items.length;i++)if(items[i].y-items[i-1].y<gap)items[i].y=items[i-1].y+gap;const over=items.length?items.at(-1).y-(H-m.b-4):0;if(over>0)for(const it of items)it.y-=over;return items},[series,labelsRight,w,H,scale.key]);
 const minBand=compact?17:9;
 return <div>
  <div ref={ref} className="relative">
   <svg width={w} height={H} role={compact?'img':'application'} aria-roledescription={compact?undefined:'chart, use the arrow keys to move between chapters'} aria-describedby={compact?undefined:id} className="block max-w-full touch-pan-y" aria-label={compact?summary:`${scale.label} toward ${scale.toward} by chapter`} tabIndex={compact?undefined:0} onKeyDown={compact?undefined:onKey} onFocus={compact?undefined:()=>setFocused(true)} onBlur={compact?undefined:()=>setFocused(false)} onPointerMove={compact?undefined:near} onPointerDown={compact?undefined:near} onPointerLeave={compact?undefined:e=>{if(e.pointerType!=='touch')setHover(null)}}>
    {scale.bands.map((b,i)=>{const y0=y(b.to+0.5),y1=y(b.from-0.5);return <g key={b.level}><rect className={i%2?'band-b':'band-a'} x={m.l} y={y0} width={w-m.l-m.r} height={y1-y0}/>{y1-y0>=minBand&&<text className="band-label" x={m.l-6} y={(y0+y1)/2} textAnchor="end" dominantBaseline="central" style={narrow?{fontSize:10}:undefined}>{narrow?ABBR[b.level]??b.level:b.level}{narrow&&ABBR[b.level]&&<title>{b.level}</title>}</text>}</g>})}
    <line className="axis-line" x1={m.l} x2={m.l} y1={m.t} y2={H-m.b}/>{!compact&&ticks.map(c=><text key={c} className="axis-label" x={x(c)} y={H-6} textAnchor={c===0?'start':c===xMax?'end':'middle'}>{c===0?'Start':c===xMax?`Ch. ${c} · end`:'Ch. '+c}</text>)}
    {compact&&<><text className="axis-label" x={m.l} y={H-3}>Start</text><text className="axis-label" x={w-m.r} y={H-3} textAnchor="end">End</text></>}
    {hover!==null&&<line className="crosshair" x1={x(hover)} x2={x(hover)} y1={m.t} y2={H-m.b}/>}
    {endLabels.map(({members,x:lx,y:ly})=><text key={members.map(s=>s.r.id).join()} x={lx+8} y={ly} dominantBaseline="central" className="axis-label">{members.map((s,i)=><tspan key={s.r.id} style={{fill:on(s.r)?'var(--ink-2)':'var(--ink-3)',fontWeight:highlight===s.r.id?600:400}}>{i>0?', ':''}{shortName(s.r.displayName)}</tspan>)}</text>)}
    {ordered.map(s=>{const segs=[];let cur=[];for(const p of s.pts){if(p.v===null){if(cur.length)segs.push(cur);cur=[]}else cur.push(p)}if(cur.length)segs.push(cur);
     const last=[...s.pts].reverse().find(p=>p.v!==null),hl=highlight===s.r.id,dim=highlight!=='all'&&!hl,dy=c=>dodge(s.r.id,c);
     return <g key={s.r.id} style={{opacity:dim?0.5:1}}>{segs.map((seg,j)=><path key={j} d={seg.map((p,k)=>(k?'L':'M')+x(p.c).toFixed(1)+','+(y(p.v)+dy(p.c)).toFixed(1)).join('')} fill="none" style={{stroke:stroke(s)}} strokeWidth={hl?3:on(s.r)?1.75:1.25} strokeLinejoin="round" strokeLinecap="round"/>)}
      {s.ended&&last&&<text x={x(last.c)} y={y(last.v)+dy(last.c)} textAnchor="middle" dominantBaseline="central" className="end-mark" style={{fill:stroke(s)}}>{endGlyph()}</text>}
      {hover!==null&&on(s.r)&&(()=>{const p=s.pts.find(p=>p.c===hover);return p&&p.v!==null&&<circle cx={x(p.c)} cy={y(p.v)+dy(p.c)} r={4.5} className="ring" style={{fill:stroke(s)}}/>})()}
     </g>})}
   </svg>
  </div>
  {narrow&&endKey.length>0&&<p className="mt-2 text-xs text-ink-2 flex flex-wrap gap-x-3 gap-y-1"><span className="text-ink-3">At the end:</span>{endKey.map(([level,ss])=><span key={level} className="inline-flex items-center gap-1"><b className="font-medium text-ink">{level}</b>{ss.map(s=><span key={s.r.id} className="inline-flex items-center gap-1"><Dot color={colors[s.r.displayName]} className="size-2"/>{shortName(s.r.displayName)}</span>)}</span>)}</p>}
  {!compact&&<div id={id} aria-live={focused?'polite':undefined} className={cx('mt-2 min-h-[3.25rem] text-sm',readout&&'rounded-lg border border-line bg-surface-2/60 px-3.5 py-2.5')}>{readout?<><p className="text-xs font-medium text-ink-3 mb-1.5">{hover===0?'Start of the story':`End of chapter ${hover} · ${titles[hover]??''}`}</p>{readout.length?<ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">{readout.map(({s,p})=><li key={s.r.id} className="flex items-center gap-2 min-w-0"><Dot color={colors[s.r.displayName]}/><span className="truncate grow">{s.r.displayName}</span><b className="font-medium">{levelOf(scale,p.v)}</b><em className="not-italic text-ink-3 tnum text-xs w-7 text-right">{p.v>0?'+':''}{p.v}</em></li>)}</ul>:<p className="text-ink-2">No value here: not met yet, or no longer alive.</p>}</>:<p className="text-ink-3 text-xs pt-1">Lines that share a value are drawn side by side{labelsRight?' and named at their end':''}. Hover or tap along the chart, or focus it and use the arrow keys, to read each model’s value at the end of a chapter. {BROKE.has(scale.key)?'A bar marks where Connor broke away from Amanda.':'✕ marks where a character died.'}</p>}</div>}
 </div>}

/* ---------- Per-run small multiples for the Details sheet ---------- */
const NO_COLORS={};
export function RunRelationships({r,scales}){
 const groups=groupBy(scales,s=>s.toward),one=useMemo(()=>[r],[r]);
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6"><p className="text-xs text-ink-3 -mt-2">Value at the end of each chapter. ✕ marks where a character died; a bar marks where Connor broke away from Amanda.</p>{['Markus','Connor','Kara'].filter(c=>groups[c]).map(c=><section key={c}><h4 className="text-sm font-semibold mb-2 inline-flex items-center gap-2"><Dot color={CHAR_VAR[c]}/>Around {c}</h4><div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(2,minmax(0,1fr))] gap-3">{groups[c].map(s=>{const t=r.track[s.key],seen=t.values.some(v=>v!==null);
  return <div key={s.key} className="rounded-lg border border-line bg-surface p-3 min-w-0"><div className="flex items-baseline justify-between gap-2 mb-1"><b className="text-sm font-medium">{s.label}</b><span className={cx('text-xs font-medium',SEG_TEXT[toneClass(t.final)]??'text-ink-2')}>{t.final}</span></div>{seen?<TrendChart compact scale={s} runs={one} colors={NO_COLORS}/>:<p className="text-xs text-ink-3">{t.final}</p>}</div>})}</div></section>)}</div>}
const toneClass=l=>/Hostile|Hated|Died|Unpopular|Unstable/.test(l)?'bad':/Friend|Lover|Trusted|Family|Supportive/.test(l)?'good':'mid';

export function ChartsView({runs,scales}){
 const [highlight,setHighlight]=useState('all'),[metric,setMetric]=useState(()=>{const spread=s=>new Set(runs.map(r=>r.track[s.key].final)).size;return [...scales].sort((a,b)=>spread(b)-spread(a))[0]?.key??'publicSupport'});
 const colors=useMemo(()=>modelColors(runs),[runs]);
 const groups=groupBy(scales,s=>s.toward),scale=scales.find(s=>s.key===metric)??scales[0];
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8">
  <div className="min-w-0 md:sticky sticky-top z-20 py-2 md:py-3 md:-mx-2 md:px-2 md:bg-bg/92 md:backdrop-blur-md"><ModelLegend runs={runs} colors={colors} highlight={highlight} onHighlight={setHighlight}/></div>
  <section className="rounded-xl border border-line bg-surface p-4 md:p-6 shadow-sm" aria-labelledby="trend-h">
   <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-4"><div><h2 id="trend-h" className="text-xl font-semibold">How they changed</h2><p className="text-sm text-ink-2 mt-1">Value at the end of each chapter, on the game’s own level bands.</p></div>
   <Select label="Relationship" hideLabel value={metric} className="md:w-72" options={scales.map(s=>({value:s.key,label:s.label,hint:`toward ${s.toward}`,icon:CHAR_VAR[s.toward]}))} onChange={setMetric}/></div>
   <TrendChart scale={scale} runs={runs} colors={colors} highlight={highlight}/>
  </section>
  <section className="rounded-xl border border-line bg-surface p-4 md:p-6 shadow-sm" aria-labelledby="final-h">
   <div className="mb-4"><h2 id="final-h" className="text-xl font-semibold">Where they ended</h2><p className="text-sm text-ink-2 mt-1">One dot per model on the game’s level bands. Hover or tap a dot for the model and level; a heart marks North as Markus’s lover. Characters who died are listed under each chart.</p></div>
   <div className="lg:columns-2 lg:gap-10">{['Markus','Connor','Kara'].filter(c=>groups[c]).map(c=><div key={c} className="min-w-0 break-inside-avoid mb-8 last:mb-0"><h3 className="text-sm font-semibold inline-flex items-center gap-2 mb-3"><Dot color={CHAR_VAR[c]}/>Around {c}</h3><div className="grid gap-5">{groups[c].map(s=><div key={s.key}><div className="flex items-baseline justify-between mb-1"><b className="text-sm font-medium">{s.label}</b>{s.key==='instability'&&<span className="text-xs text-ink-3">Unstable = deviancy at 4 or more</span>}</div><FinalStrip scale={s} runs={runs} colors={colors} highlight={highlight}/></div>)}</div></div>)}</div>
  </section>
 </div>}
