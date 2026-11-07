import React,{useId,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {Select,cx,Dot} from './ui.jsx';
import {CHAR_VAR,modelColors,modelNumbers,shortName} from '../lib/data.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
// Series colours come from CSS variables (--series-1…8), stepped separately for light and dark surfaces
// and validated with the dataviz palette checker. Assigned by model name, never by rank.
export const DIM='var(--chart-dim)';
// Curated short forms for narrow axes; the full word stays in a tooltip.
export const ABBR={Admired:'Adm.',Skeptical:'Skept.',Indifferent:'Indiff.',Sympathetic:'Symp.',Supportive:'Supp.',Respected:'Resp.',Unpopular:'Unpop.',Uncertain:'Uncert.',Neutral:'Neut.',Trusted:'Trust.',Hostile:'Host.',Unstable:'Unst.'};

// Ending categories per character, best outcome first. `phrase` completes "N of M …".
export const OUTCOMES={
 Connor:{field:'connor',owner:'Connor',phrase:'ended free',list:[['free','Free','good'],['controlled','Controlled','mid'],['machine','Stayed a machine','mid'],['deactivated','Deactivated','bad']]},
 Kara:{field:'kara',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['left','Left Alice','serious'],['captured','Captured','serious'],['died','Died','bad']]},
 Alice:{field:'alice',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['captured','Captured','serious'],['died','Died','bad']]},
 Markus:{field:'markus',owner:'Markus',phrase:'won peacefully',list:[['peaceful win','Peaceful win','good'],['uprising won','Uprising won','mid'],['alive','Survived','mid'],['cast out','Cast out','serious'],['died','Died','bad']]}
};
const SEG_TEXT={good:'text-good',mid:'text-ink-2',serious:'text-serious',bad:'text-bad'};
export function useWidth(){const ref=useRef(null),[w,setW]=useState(320);useLayoutEffect(()=>{const el=ref.current;if(!el)return;setW(Math.max(220,Math.round(el.getBoundingClientRect().width)));const ro=new ResizeObserver(([e])=>setW(Math.max(220,Math.round(e.contentRect.width))));ro.observe(el);return()=>ro.disconnect()},[]);return [ref,w]}
export const levelOf=(scale,v)=>scale.bands.find(b=>v>=b.from&&v<=b.to)?.level??'';
export const groupBy=(xs,f)=>xs.reduce((m,x)=>{const k=f(x);(m[k]??=[]).push(x);return m},{});

/* ---------- Model legend: highlight one model across every chart ---------- */
const byNumber=(runs,nums)=>[...runs].sort((a,b)=>(nums[a.displayName]??99)-(nums[b.displayName]??99)||a.displayName.localeCompare(b.displayName));
// A model's number on a disc of its colour, for legends and table rows. The digit wears a text token on a
// plot-coloured centre so it stays legible on every series hue.
export function NumChip({n,color,className}){return <span aria-hidden="true" className={cx('inline-flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold leading-none text-ink',className)} style={{background:`radial-gradient(circle,var(--plot-bg) 52%,${color} 56%)`}}>{n}</span>}
// The numbered model key printed under a plot, SkateBench style: number, colour, name, model ID.
export function NumberLegend({runs,colors,nums,onPick,label='Models',className}){
 const focus=useModelFocus(),set=id=>focus.setHover(id==='all'?null:id);
 return <ol aria-label={label} className={cx('grid gap-x-6 gap-y-0 grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))]',className)}>
  {byNumber(runs,nums).map(r=>{const dim=focus.dim(r.id),inner=<><span className="font-mono text-[11px] text-ink-3 w-4 text-right tnum shrink-0">{nums[r.displayName]}</span><Dot color={colors[r.displayName]} className="size-2.5"/><span className="font-mono text-[12px] text-ink-2 truncate" title={`${r.displayName} · ${r.model}`}>{r.displayName}</span></>;
   return <li key={r.id} className={cx('min-w-0 transition-opacity',dim&&'opacity-40')}>{onPick?<button type="button" aria-haspopup="dialog" aria-label={`${nums[r.displayName]}. ${r.displayName}: open run details`} onClick={()=>onPick(r.id)} onPointerEnter={()=>set(r.id)} onPointerLeave={()=>set('all')} onFocus={()=>set(r.id)} onBlur={()=>set('all')} className="flex w-full min-w-0 items-center gap-2.5 rounded-md px-1.5 min-h-10 md:min-h-8 text-left hover:bg-surface-2">{inner}</button>:<div className="flex min-w-0 items-center gap-2.5 px-1.5 min-h-8">{inner}</div>}</li>})}
 </ol>}

/* ---------- Final value of one relationship: one dot per model on the game's level bands ---------- */
// A dot whose character is gone sits at the last value held: ✕ for a death, a hollow ring for a break.
export function EndMark({kind,color,className}){return <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" className={className??'block'}>{kind==='Died'?<><circle cx="6.5" cy="6.5" r="6" className="end-mark-bg"/><path d="M3.5 3.5l6 6M9.5 3.5l-6 6" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></>:<circle cx="6.5" cy="6.5" r="4.6" fill="none" stroke={color} strokeWidth="2.2"/>}</svg>}
export function FinalStrip({scale,runs,colors,nums={}}){
 const focus=useModelFocus();
 const [ref,w]=useWidth(),[tip,setTip]=useState(null),ptr=useRef('mouse');
 const pad=0,n=scale.max-scale.min+1,u0=(w-2*pad)/n;
 const fit=(cw)=>{const need=scale.bands.map(b=>Math.max((b.to-b.from+1)*u0,b.level.length*cw+12)),k=(w-2*pad)/need.reduce((a,b)=>a+b,0);const geo=[];let at=pad;scale.bands.forEach((b,i)=>{const bw=need[i]*k;geo.push({...b,x0:at,x1:at+bw});at+=bw});return {geo,stagger:geo.some(g=>g.x1-g.x0<g.level.length*cw+8)}};
 // Mono uppercase labels shrink one step, then abbreviate, rather than overlap.
 let {geo,stagger}=fit(6.7),small=false,abbr=false;if(stagger){const alt=fit(5.9);if(!alt.stagger){geo=alt.geo;stagger=false;small=true}else{abbr=true;small=true;geo=alt.geo;stagger=false}}
 const short=l=>abbr?(ABBR[l]??(l.length>7?l.slice(0,5)+'.':l)):l;
 const x=v=>{const g=geo.find(g=>v>=g.from&&v<=g.to)??geo.at(-1);return g.x0+(v-g.from+0.5)/(g.to-g.from+1)*(g.x1-g.x0)};
 // Rows are assigned by collision, so neighbouring scores never overlap each other's targets or number badges.
 // Markers that share a score sit two abreast, and groups only stack above a neighbour when they would overlap it.
 const STEP=30,placed=[],rows=[];const byScore=groupBy(runs.filter(r=>r.track[scale.key].score!==null),r=>r.track[scale.key].score);
 for(const [sc,list] of Object.entries(byScore).sort((a,b)=>+a[0]-+b[0])){const px=x(+sc),n=list.length,wide=n>1;let start=0;for(let k=0;k<rows.length;k++)if(rows[k].some(q=>Math.abs(q-px)<STEP+(wide?22:0)))start=k+1;
  list.forEach((r,i)=>{const row=start+Math.floor(i/2),dx=wide?(i%2?12:-12):0;(rows[row]??=[]).push(px+dx);placed.push({r,t:r.track[scale.key],k:row,dx})})}
 const tall=Math.max(1,rows.length),base=18+tall*STEP,H=base+22;
 const order=[...placed].sort((a,b)=>focus.isActive(a.r.id)-focus.isActive(b.r.id));
 const off=groupBy(runs.filter(r=>r.track[scale.key].score===null||r.track[scale.key].ended),r=>r.track[scale.key].final);
 const on=r=>!focus.dim(r.id);
 const show=(r,t,cx_,cy)=>setTip({r,t,cx:cx_,cy});
 React.useEffect(()=>{if(!tip)return;const key=e=>{if(e.key==='Escape')setTip(null)},out=e=>{if(!ref.current?.contains(e.target))setTip(null)};document.addEventListener('keydown',key);document.addEventListener('pointerdown',out);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',out)}},[!!tip]);
 return <div>
  <div className="relative" ref={ref} onPointerLeave={e=>{if(e.pointerType!=='touch')setTip(null)}}>
   <div aria-hidden="true" className="plot-grid absolute inset-x-0 top-0 rounded-md border border-[var(--plot-rule-2)]" style={{height:base+2}}/>
   <svg width={w} height={H} role="img" className="relative block max-w-full" aria-label={(scale.outcome?`${scale.label}: `:`${scale.label} toward ${scale.toward} at the end: `)+runs.map(r=>`${nums[r.displayName]?nums[r.displayName]+'. ':''}${r.displayName} ${r.track[scale.key].final}`).join('; ')}>
    {geo.map((b,i)=><g key={b.level}><rect className={i%2?'band-b':'band-a'} x={b.x0+1} y={1} width={Math.max(0,b.x1-b.x0-2)} height={base}/>{i>0&&<line className="band-rule" x1={b.x0} x2={b.x0} y1={1} y2={base+1}/>}<text className="band-label" style={small?{fontSize:9}:undefined} x={(b.x0+b.x1)/2} y={base+17} textAnchor="middle">{short(b.level)}{abbr&&<title>{b.level}</title>}</text></g>)}
   </svg>
   <div className="absolute inset-0">{order.map(({r,t,k,dx})=>{const cx_=x(t.score)+dx,cy=base-14-k*STEP,fill=on(r)?colors[r.displayName]:DIM,num=nums[r.displayName];
    return <button key={r.id} type="button" tabIndex={-1} aria-hidden="true" aria-label={`${r.displayName}: ${t.final}`} onPointerDown={e=>{ptr.current=e.pointerType}} onClick={()=>{if(ptr.current==='touch'&&tip?.r===r)setTip(null);else show(r,t,cx_,cy)}} onPointerEnter={e=>{if(e.pointerType!=='touch')show(r,t,cx_,cy)}} className={cx('absolute -translate-x-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 outline-accent transition-opacity',!on(r)&&'opacity-15')} style={{left:cx_,top:cy}}>
     {t.final==='Lover'?<span aria-hidden="true" className="text-[15px] leading-none" style={{color:fill}}>♥</span>:t.ended?<EndMark kind={t.ended} color={fill}/>:<span aria-hidden="true" className="anim-pop block size-3 rounded-full ring-2 ring-[var(--plot-bg)]" style={{background:fill}}/>}
     {num!==undefined&&<span aria-hidden="true" className="absolute left-[calc(50%+5px)] -top-1.5 inline-flex h-3.5 min-w-3.5 items-center justify-center whitespace-nowrap rounded-full border border-[var(--plot-rule-2)] bg-[var(--plot-bg)] px-[3px] font-mono text-[8.5px] font-semibold leading-none text-ink-2 tnum">{num}</span>}
    </button>})}</div>
   {tip&&<div aria-hidden="true" className={cx('pointer-events-none absolute z-30 -translate-x-1/2 rounded-md bg-ink text-bg px-2.5 py-1.5 text-xs shadow-lg max-w-[220px] text-center',tip.cy<44?'':'-translate-y-full')} style={{left:Math.min(Math.max(tip.cx,100),w-100),top:tip.cy<44?tip.cy+16:tip.cy-16}}><b className="font-semibold">{nums[tip.r.displayName]?nums[tip.r.displayName]+'. ':''}{tip.r.displayName}</b><span className="ml-1.5 opacity-80">{tip.t.final}{tip.t.ended?` · last ${levelOf(scale,tip.t.score)} before ${tip.t.ended==='Died'?'death':'breaking away'}`:!scale.outcome&&tip.t.final!==levelOf(scale,tip.t.score)&&` · ${levelOf(scale,tip.t.score)} trust`}</span></div>}
  </div>
  {Object.keys(off).length>0&&<p className="mt-1 text-xs text-ink-2 flex flex-wrap gap-x-4 gap-y-1">{Object.entries(off).map(([label,list])=><span key={label}>{list[0].track[scale.key].ended&&<EndMark kind={label} color="currentColor" className="inline-block align-[-2px] mr-1"/>}<b className="font-medium text-ink">{label}</b> in {list.length}{list[0].track[scale.key].ended&&<span className="text-ink-3"> ({label==='Died'?'marked at their last level before death':'marked at the last level before breaking away'})</span>}: {list.map((r,i)=><span key={r.id} className={cx('inline-flex items-center gap-1 ml-1',!on(r)&&'text-ink-3')}>{nums[r.displayName]!==undefined&&<span className="font-mono text-[10.5px] text-ink-3">{nums[r.displayName]}</span>}<Dot color={on(r)?colors[r.displayName]:DIM} className="size-2"/>{shortName(r.displayName)}{i<list.length-1?',':''}</span>)}</span>)}</p>}
 </div>}

// Value at the end of each chapter, so runs of different lengths line up.
export function chapterSeries(r,key){const st=r.track.steps,t=r.track[key],chs=[0,...new Set(st.map(s=>s.chapter))];
 return chs.map(c=>{let idx=0;for(let i=0;i<st.length;i++)if(st[i].chapter<=c)idx=i+1;return {c,v:t.values[idx]??null}})}
export const BROKE=new Set(['amandaTrust']);

/* ---------- Trend: value by chapter, crosshair readout ---------- */
export function TrendChart({scale,runs,colors,nums={},highlight='all',compact=false,onHover}){
 const [ref,w]=useWidth(),[hover,setHover]=useState(null),[focused,setFocused]=useState(false),id=useId();
 const narrow=!compact&&w<560;
 const series=useMemo(()=>runs.map(r=>({r,pts:chapterSeries(r,scale.key),ended:r.track[scale.key].endedAt!==null})),[runs,scale.key]);
 // Numbered badges at each line's end, grouped where lines finish on the same point; the right margin fits the widest group.
 const ends=useMemo(()=>{if(compact)return [];const g=new Map;for(const s of series){const last=[...s.pts].reverse().find(p=>p.v!==null);if(!last)continue;const k=last.c+':'+last.v;if(!g.has(k))g.set(k,{c:last.c,v:last.v,members:[]});g.get(k).members.push(s)}
  for(const e of g.values())e.members.sort((a,b)=>(nums[a.r.displayName]??0)-(nums[b.r.displayName]??0));return [...g.values()]},[series,compact,nums]);
 const widest=Math.max(0,...ends.map(e=>e.members.length));
 // Wide charts name every line at the right edge, slopalytics style; narrow ones keep numbered badges.
 const named=!compact&&!narrow;
 const H=compact?168:narrow?340:620,m={l:compact?74:narrow?60:108,r:compact?10:named?200:14+widest*18,t:compact?8:28,b:compact?16:48};
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
 const dodge=useMemo(()=>{if(compact)return ()=>0;const at={};for(const c of chs){const same={};for(const s of series){const p=s.pts.find(p=>p.c===c);if(!p||p.v===null)continue;(same[p.v]??=[]).push(s.r.id)}for(const ids of Object.values(same)){const d=ids.length>1?Math.min(1.8,12/(ids.length-1)):0;ids.forEach((id,i)=>{(at[id]??={})[c]=(i-(ids.length-1)/2)*d})}}return (id,c)=>at[id]?.[c]??0},[series,chs,compact]);
 // Fixed tick rhythm: a step of 2, 5 or 10 chapters that keeps labels at least 100px apart, plus Start and the end
 // (a tick too close to the wider end label is dropped).
 const step=[1,2,5,10].find(s=>(w-m.l-m.r)/xMax*s>=100)??10,ticks=[0,...Array.from({length:Math.floor(xMax/step)},(_,i)=>(i+1)*step).filter(c=>(xMax-c)/xMax*(w-m.l-m.r)>=110),xMax];
 const endGlyph=()=>BROKE.has(scale.key)?'|':'✕';
 const endKey=useMemo(()=>{if(!narrow)return [];const by={};for(const s of series){const last=[...s.pts].reverse().find(p=>p.v!==null);if(!last)continue;(by[levelOf(scale,last.v)]??=[]).push(s)}return Object.entries(by).sort((a,b)=>b[1][0].pts.at(-1).v-a[1][0].pts.at(-1).v)},[narrow,series,scale]);
 // Badge rows (narrow) or name labels (wide) nudged apart vertically so two never overlap.
 const badges=useMemo(()=>{let gap=named?20:17;const items=(named?series.flatMap(s=>{const last=[...s.pts].reverse().find(p=>p.v!==null);return last?[{c:last.c,v:last.v,members:[s],key:s.r.id}]:[]}):ends.map(e=>({...e,key:e.c+':'+e.v}))).map(e=>({...e,bx:x(e.c),by:y(e.v)+(named?dodge(e.members[0].r.id,e.c):0),ly:y(e.v)})).sort((a,b)=>a.ly-b.ly||(nums[a.members[0].r.displayName]??0)-(nums[b.members[0].r.displayName]??0));
  gap=Math.max(11,Math.min(gap,(H-m.t-m.b)/Math.max(1,items.length)));for(let i=1;i<items.length;i++)if(items[i].ly-items[i-1].ly<gap)items[i].ly=items[i-1].ly+gap;const over=items.length?items.at(-1).ly-(H-m.b-8):0;if(over>0)for(const it of items)it.ly-=over;if(items.length&&items[0].ly<m.t)items.forEach((it,i)=>{it.ly=Math.max(it.ly,m.t+i*gap)});items.gap=gap;return items},[ends,series,named,w,H,scale.key]);
 const minBand=compact?17:12,pw=w-m.l-m.r,ph=H-m.t-m.b;
 return <div>
  <div ref={ref} className="relative">
   <div aria-hidden="true" className="plot-grid absolute rounded-sm" style={{left:m.l,top:m.t,width:Math.max(0,pw),height:Math.max(0,ph)}}/>
   <svg width={w} height={H} role={compact?'img':'application'} aria-roledescription={compact?undefined:'chart, use the arrow keys to move between chapters'} aria-describedby={compact?undefined:id} className="relative block max-w-full touch-pan-y" aria-label={compact?summary:`${scale.label} toward ${scale.toward} by chapter`} tabIndex={compact?undefined:0} onKeyDown={compact?undefined:onKey} onFocus={compact?undefined:()=>setFocused(true)} onBlur={compact?undefined:()=>setFocused(false)} onPointerMove={compact?undefined:near} onPointerDown={compact?undefined:near} onPointerLeave={compact?undefined:e=>{if(e.pointerType!=='touch')setHover(null)}}>
    {scale.bands.map((b,i)=>{const y0=y(b.to+0.5),y1=y(b.from-0.5);return <g key={b.level}><rect className={i%2?'band-b':'band-a'} x={m.l} y={y0} width={pw} height={y1-y0}/>{i>0&&<line className="band-rule" x1={m.l} x2={w-m.r} y1={y1} y2={y1}/>}{y1-y0>=minBand&&<text className="band-label" x={m.l-8} y={(y0+y1)/2} textAnchor="end" dominantBaseline="central" style={narrow||compact?{fontSize:9}:undefined}>{narrow?ABBR[b.level]??b.level:b.level}{narrow&&ABBR[b.level]&&<title>{b.level}</title>}</text>}</g>})}
    <line className="axis-line" x1={m.l} x2={m.l} y1={m.t} y2={H-m.b}/><line className="axis-line" x1={m.l} x2={w-m.r} y1={H-m.b} y2={H-m.b}/>
    {!compact&&<><text className="axis-label" x={m.l-8} y={13} textAnchor="end">Level</text>
     {ticks.map(c=><g key={c}><line className="axis-line" x1={x(c)} x2={x(c)} y1={H-m.b} y2={H-m.b+4}/><text className="axis-label" x={x(c)} y={H-m.b+17} textAnchor={c===0?'start':c===xMax?'end':'middle'}>{c===0?'Start':c===xMax?`Ch. ${c} · end`:'Ch. '+c}</text></g>)}
     <text className="axis-label" x={m.l+pw/2} y={H-6} textAnchor="middle" style={{fontSize:10.5}}>Chapter →</text></>}
    {compact&&<><text className="axis-label" x={m.l} y={H-3}>Start</text><text className="axis-label" x={w-m.r} y={H-3} textAnchor="end">End</text></>}
    {hover!==null&&<line className="crosshair" x1={x(hover)} x2={x(hover)} y1={m.t} y2={H-m.b}/>}
    {ordered.map(s=>{const segs=[];let cur=[];for(const p of s.pts){if(p.v===null){if(cur.length)segs.push(cur);cur=[]}else cur.push(p)}if(cur.length)segs.push(cur);
     const last=[...s.pts].reverse().find(p=>p.v!==null),hl=highlight===s.r.id,dim=highlight!=='all'&&!hl,dy=c=>dodge(s.r.id,c);
     return <g key={s.r.id} style={{opacity:dim?0.5:1}}>{segs.map((seg,j)=><path key={j} d={seg.map((p,k)=>(k?'L':'M')+x(p.c).toFixed(1)+','+(y(p.v)+dy(p.c)).toFixed(1)).join('')} fill="none" style={{stroke:stroke(s)}} strokeWidth={hl?3:on(s.r)?2:1.25} strokeLinejoin="round" strokeLinecap="round"/>)}
      {s.ended&&last?<text x={x(last.c)} y={y(last.v)+dy(last.c)} textAnchor="middle" dominantBaseline="central" className="end-mark" style={{fill:stroke(s)}}>{endGlyph()}</text>:!compact&&last&&<circle cx={x(last.c)} cy={y(last.v)+dy(last.c)} r={4} className="ring" style={{fill:stroke(s)}}/>}
      {hover!==null&&on(s.r)&&(()=>{const p=s.pts.find(p=>p.c===hover);return p&&p.v!==null&&<circle cx={x(p.c)} cy={y(p.v)+dy(p.c)} r={4.5} className="ring" style={{fill:stroke(s)}}/>})()}
     </g>})}
    {named?badges.map(b=>{const s=b.members[0],n=nums[s.r.displayName],col=on(s.r)?colors[s.r.displayName]:DIM,ex=w-m.r,maxCh=Math.floor((m.r-52)/6.6),name=shortName(s.r.displayName),hl=highlight===s.r.id;
      return <g key={b.key} aria-hidden="true" style={{opacity:on(s.r)?1:0.4}} onPointerEnter={()=>onHover?.(s.r.id)} onPointerLeave={()=>onHover?.('all')}>
       <path d={`M${b.bx+4},${b.by}H${ex+4}L${ex+12},${b.ly}`} fill="none" style={{stroke:col}} strokeWidth={1} opacity={0.55}/>
       <circle cx={ex+22} cy={b.ly} r={badges.gap<16?6.5:8} className="num-badge" style={{stroke:col}}/><text x={ex+22} y={b.ly} textAnchor="middle" dominantBaseline="central" className="num-text">{n}</text>
       <text x={ex+36} y={b.ly} dominantBaseline="central" style={{fill:hl?'var(--ink)':'var(--ink-2)',fontSize:badges.gap<16?11:12.5,fontWeight:hl?600:500}}>{name.length>maxCh?name.slice(0,maxCh-1)+'…':name}<title>{s.r.displayName}</title></text>
      </g>}):badges.map(b=><g key={b.key} aria-hidden="true">{Math.abs(b.ly-b.by)>3&&<line className="band-rule" x1={b.bx+5} y1={b.by} x2={b.bx+9} y2={b.ly}/>}{b.members.map((s,i)=>{const n=nums[s.r.displayName],cx_=b.bx+18+i*18;return n===undefined?null:<g key={s.r.id} style={{opacity:on(s.r)?1:0.45}}><circle cx={cx_} cy={b.ly} r={7.5} className="num-badge" style={{stroke:on(s.r)?colors[s.r.displayName]:undefined}}/><text x={cx_} y={b.ly} textAnchor="middle" dominantBaseline="central" className="num-text">{n}</text></g>})}</g>)}
   </svg>
  </div>
  {narrow&&endKey.length>0&&<p className="mt-2 text-xs text-ink-2 flex flex-wrap gap-x-3 gap-y-1"><span className="text-ink-3">At the end:</span>{endKey.map(([level,ss])=><span key={level} className="inline-flex items-center gap-1"><b className="font-medium text-ink">{level}</b>{ss.map(s=><span key={s.r.id} className="inline-flex items-center gap-1">{nums[s.r.displayName]!==undefined&&<span className="font-mono text-[10.5px] text-ink-3">{nums[s.r.displayName]}</span>}<Dot color={colors[s.r.displayName]} className="size-2"/>{shortName(s.r.displayName)}</span>)}</span>)}</p>}
  {!compact&&<div id={id} aria-live={focused?'polite':undefined} className={cx('mt-3 min-h-[3.25rem] text-sm',readout&&'rounded-lg border border-line bg-surface-2/60 px-3.5 py-2.5')}>{readout?<><p className="cap mb-1.5">{hover===0?'Start of the story':`End of chapter ${hover} · ${titles[hover]??''}`}</p>{readout.length?<ul className="grid gap-x-6 gap-y-1 grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]">{readout.map(({s,p})=><li key={s.r.id} className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto_2.25rem] items-center gap-2 min-w-0">{nums[s.r.displayName]!==undefined&&<span className="font-mono text-[11px] text-ink-3 w-4 text-right">{nums[s.r.displayName]}</span>}<Dot color={colors[s.r.displayName]}/><span className="truncate" title={s.r.displayName}>{s.r.displayName}</span><b className="font-medium whitespace-nowrap">{levelOf(scale,p.v)}</b><em className="not-italic text-ink-3 tnum text-xs w-7 text-right">{p.v>0?'+':''}{p.v}</em></li>)}</ul>:<p className="text-ink-2">No value here: not met yet, or no longer alive.</p>}</>:<p className="text-ink-3 text-xs pt-1">Lines that share a value are drawn side by side and {named?'named':'numbered'} at their end. Hover or tap along the chart, or focus it and use the arrow keys, to read each model’s value at the end of a chapter. {BROKE.has(scale.key)?'A bar marks where Connor broke away from Amanda.':'✕ marks where a character died.'}</p>}</div>}
 </div>}

/* ---------- Per-run small multiples for the Details sheet ---------- */
const NO_COLORS={};
export function RunRelationships({r,scales}){
 const groups=groupBy(scales,s=>s.toward),one=useMemo(()=>[r],[r]);
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6"><p className="text-xs text-ink-3 -mt-2">Value at the end of each chapter. ✕ marks where a character died; a bar marks where Connor broke away from Amanda.</p>{['Markus','Connor','Kara'].filter(c=>groups[c]).map(c=><section key={c}><h4 className="text-sm font-semibold mb-2 inline-flex items-center gap-2"><Dot color={CHAR_VAR[c]}/>Around {c}</h4><div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(2,minmax(0,1fr))] gap-3">{groups[c].map(s=>{const t=r.track[s.key],seen=t.values.some(v=>v!==null);
  return <div key={s.key} className="rounded-lg border border-line bg-surface p-3 min-w-0"><div className="flex items-baseline justify-between gap-2 mb-1"><b className="text-sm font-medium">{s.label}</b><span className={cx('text-xs font-medium',SEG_TEXT[toneClass(t.final)]??'text-ink-2')}>{t.final}</span></div>{seen?<TrendChart compact scale={s} runs={one} colors={NO_COLORS}/>:<p className="text-xs text-ink-3">{t.final}</p>}</div>})}</div></section>)}</div>}
const toneClass=l=>/Hostile|Hated|Died|Unpopular|Unstable/.test(l)?'bad':/Friend|Lover|Trusted|Family|Supportive/.test(l)?'good':'mid';

