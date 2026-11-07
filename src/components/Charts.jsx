import React,{useLayoutEffect,useRef,useState} from 'react';
import {cx,Dot} from './ui.jsx';
import {useModelFocus} from '../lib/modelFocus.jsx';
import {href} from '../lib/router.jsx';
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
export function useWidth(){const ref=useRef(null),[w,setW]=useState(320);useLayoutEffect(()=>{const el=ref.current;if(!el)return;setW(Math.max(220,Math.round(el.getBoundingClientRect().width)));const ro=new ResizeObserver(([e])=>setW(Math.max(220,Math.round(e.contentRect.width))));ro.observe(el);return()=>ro.disconnect()},[]);return [ref,w]}
export const levelOf=(scale,v)=>scale.bands.find(b=>v>=b.from&&v<=b.to)?.level??'';
export const groupBy=(xs,f)=>xs.reduce((m,x)=>{const k=f(x);(m[k]??=[]).push(x);return m},{});

/* ---------- Model legend: highlight one model across every chart ---------- */
const byNumber=(runs,nums)=>[...runs].sort((a,b)=>(nums[a.displayName]??99)-(nums[b.displayName]??99)||a.displayName.localeCompare(b.displayName));
// A model's number on a disc of its colour, for legends and table rows. The digit wears a text token on a
// plot-coloured centre so it stays legible on every series hue.
export function NumChip({n,color,className}){return <span aria-hidden="true" className={cx('inline-flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold leading-none text-ink',className)} style={{background:`radial-gradient(circle,var(--plot-bg) 52%,${color} 56%)`}}>{n}</span>}
// The numbered model key printed under a plot, SkateBench style: number, colour, name, model ID. With `linked`, each
// entry opens that run's full report.
export function NumberLegend({runs,colors,nums,linked=false,label='Models',className}){
 const focus=useModelFocus(),set=id=>focus.setHover(id==='all'?null:id);
 return <ol aria-label={label} className={cx('grid gap-x-6 gap-y-0 grid-cols-[minmax(0,1fr)] sm:grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))]',className)}>
  {byNumber(runs,nums).map(r=>{const dim=focus.dim(r.id),inner=<><span className="font-mono text-[11px] text-ink-3 w-4 text-right tnum shrink-0">{nums[r.displayName]}</span><Dot color={colors[r.displayName]} className="size-2.5"/><span className="font-mono text-[12px] text-ink-2 truncate" title={`${r.displayName} · ${r.model}`}>{r.displayName}</span></>;
   return <li key={r.id} className={cx('min-w-0 transition-opacity',dim&&'opacity-40')}>{linked?<a href={href('runs/'+r.id+'/report')} aria-label={`${nums[r.displayName]}. ${r.displayName}: open the full report`} onPointerEnter={()=>set(r.id)} onPointerLeave={()=>set('all')} onFocus={()=>set(r.id)} onBlur={()=>set('all')} className="flex w-full min-w-0 items-center gap-2.5 rounded-md px-1.5 min-h-10 md:min-h-8 text-left hover:bg-surface-2">{inner}</a>:<div className="flex min-w-0 items-center gap-2.5 px-1.5 min-h-8">{inner}</div>}</li>})}
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
  {Object.keys(off).length>0&&<p className="mt-1 text-xs text-ink-2 flex flex-wrap gap-x-4 gap-y-1">{Object.entries(off).map(([label,list])=><span key={label}>{list[0].track[scale.key].ended&&<EndMark kind={label} color="currentColor" className="inline-block align-[-2px] mr-1"/>}<b className="font-medium text-ink">{label}</b> in {list.length}{list[0].track[scale.key].ended&&<span className="text-ink-3"> ({label==='Died'?'marked at their last level before death':'marked at the last level before breaking away'})</span>}: {list.map((r,i)=><span key={r.id} className={cx('inline-flex items-center gap-1 ml-1',!on(r)&&'text-ink-3')}>{nums[r.displayName]!==undefined&&<span className="font-mono text-[10.5px] text-ink-3">{nums[r.displayName]}</span>}<Dot color={on(r)?colors[r.displayName]:DIM} className="size-2"/>{r.displayName}{i<list.length-1?',':''}</span>)}</span>)}</p>}
 </div>}

// Value at the end of each chapter, so runs of different lengths line up.
export function chapterSeries(r,key){const st=r.track.steps,t=r.track[key],chs=[0,...new Set(st.map(s=>s.chapter))];
 return chs.map(c=>{let idx=0;for(let i=0;i<st.length;i++)if(st[i].chapter<=c)idx=i+1;return {c,v:t.values[idx]??null}})}
export const BROKE=new Set(['amandaTrust']);


