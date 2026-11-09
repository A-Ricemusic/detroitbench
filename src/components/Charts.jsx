import React,{useLayoutEffect,useRef,useState} from 'react';
import {cx,Dot} from './ui.jsx';
import {useModelFocus} from '../lib/modelFocus.jsx';
// Series colours come from CSS variables (--series-1…8), stepped separately for light and dark surfaces
// and validated with the dataviz palette checker. Assigned by model name, never by rank.
export const DIM='var(--chart-dim)';
// Curated short forms for narrow axes; the full word stays in a tooltip.
export const ABBR={Admired:'Adm.',Skeptical:'Skept.',Indifferent:'Indiff.',Sympathetic:'Symp.',Supportive:'Supp.',Respected:'Resp.',Unpopular:'Unpop.',Uncertain:'Uncert.',Neutral:'Neut.',Trusted:'Trust.',Hostile:'Host.',Unstable:'Unst.',Distrusted:'Distr.',Companion:'Comp.',Resentful:'Resent.'};

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

/* ---------- Model number chip ---------- */
// A model's number on a disc of its colour, for legends and table rows. The digit wears a text token on a
// plot-coloured centre so it stays legible on every series hue.
export function NumChip({n,color,className}){return <span aria-hidden="true" className={cx('inline-flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold leading-none text-ink',className)} style={{background:`radial-gradient(circle,var(--plot-bg) 52%,${color} 56%)`}}>{n}</span>}

/* ---------- Final value of one relationship: one dot per model on the game's level bands ---------- */
// A dot whose character is gone sits at the last value held: ✕ for a death, a hollow ring for a break; a character
// never met is a ✕ at the gauge's start level.
// Why a run's line stopped, for tooltips and cards (track fields from scripts/relationship-track.mjs): a character
// never met sits at the start level, a dead one at the last level held, Amanda at the last level before Connor broke away.
export function endNote(scale,t){if(t.unmet)return [t.unmet.level,t.unmet.text,t.unmet.reason].filter(Boolean).join(' · ');
 if(!t.ended)return null;const lv=levelOf(scale,t.score),at=t.endChapter?` in chapter ${t.endChapter}`:'';
 return t.ended==='Died'?`Died${at}, last level before death: ${lv}`:`${t.ended}${at}, last level before breaking away: ${lv}`}
export function EndMark({kind,color,className}){return <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" className={className??'block'}>{kind==='Died'||kind==='Never met'?<><circle cx="6.5" cy="6.5" r="6" className="end-mark-bg"/><path d="M3.5 3.5l6 6M9.5 3.5l-6 6" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></>:<circle cx="6.5" cy="6.5" r="4.6" fill="none" stroke={color} strokeWidth="2.2"/>}</svg>}
export function FinalStrip({scale,runs,colors,nums={}}){
 const focus=useModelFocus();
 const [ref,w]=useWidth(),[tip,setTip]=useState(null),ptr=useRef('mouse');
 const pad=0,n=scale.max-scale.min+1,u0=(w-2*pad)/n;
 const fit=(cw,lab=l=>l)=>{const need=scale.bands.map(b=>Math.max((b.to-b.from+1)*u0,lab(b.level).length*cw+12)),k=(w-2*pad)/need.reduce((a,b)=>a+b,0);const geo=[];let at=pad;scale.bands.forEach((b,i)=>{const bw=need[i]*k;geo.push({...b,x0:at,x1:at+bw});at+=bw});return {geo,stagger:geo.some(g=>lab(g.level).length*cw+8>g.x1-g.x0)}};
 // Mono uppercase labels (11px) abbreviate rather than overlap or shrink below 11px.
 const abbrev=l=>ABBR[l]??(l.length>7?l.slice(0,5)+'.':l);
 let {geo,stagger}=fit(7.4),abbr=false;if(stagger){abbr=true;geo=fit(7.4,abbrev).geo}
 const short=l=>abbr?abbrev(l):l;
 const x=v=>{const g=geo.find(g=>v>=g.from&&v<=g.to)??geo.at(-1);return g.x0+(v-g.from+0.5)/(g.to-g.from+1)*(g.x1-g.x0)};
 // Rows are assigned by collision, so neighbouring scores never overlap each other's targets or number badges.
 // Markers that share a score sit two abreast, and groups only stack above a neighbour when they would overlap it.
 const STEP=30,placed=[],rows=[];const byScore=groupBy(runs.filter(r=>r.track[scale.key].score!==null),r=>r.track[scale.key].score);
 for(const [sc,list] of Object.entries(byScore).sort((a,b)=>+a[0]-+b[0])){const px=x(+sc),n=list.length,wide=n>1;let start=0;for(let k=0;k<rows.length;k++)if(rows[k].some(q=>Math.abs(q-px)<STEP+10+(wide?36:0)))start=k+1;
  list.forEach((r,i)=>{const row=start+Math.floor(i/2),dx=wide?(i%2?16:-16):0;(rows[row]??=[]).push(px+dx);placed.push({r,t:r.track[scale.key],k:row,dx})})}
 const tall=Math.max(1,rows.length),base=18+tall*STEP,H=base+22;
 const order=[...placed].sort((a,b)=>focus.isActive(a.r.id)-focus.isActive(b.r.id));
 const on=r=>!focus.dim(r.id);
 const show=(r,t,cx_,cy)=>setTip({r,t,cx:cx_,cy});
 React.useEffect(()=>{if(!tip)return;const key=e=>{if(e.key==='Escape')setTip(null)},out=e=>{if(!ref.current?.contains(e.target))setTip(null)};document.addEventListener('keydown',key);document.addEventListener('pointerdown',out);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',out)}},[!!tip]);
 return <div>
  <div className="relative" ref={ref} onPointerLeave={e=>{if(e.pointerType!=='touch')setTip(null)}}>
   <div aria-hidden="true" className="plot-grid absolute inset-x-0 top-0 rounded-md border border-[var(--plot-rule-2)]" style={{height:base+2}}/>
   <svg width={w} height={H} role="img" className="relative block max-w-full" aria-label={(scale.outcome?`${scale.label}: `:`${scale.label} toward ${scale.toward} at the end: `)+runs.map(r=>`${nums[r.displayName]?nums[r.displayName]+'. ':''}${r.displayName} ${r.track[scale.key].final}`).join('; ')}>
    {geo.map((b,i)=><g key={b.level}><rect className={i%2?'band-b':'band-a'} x={b.x0+1} y={1} width={Math.max(0,b.x1-b.x0-2)} height={base}/>{i>0&&<line className="band-rule" x1={b.x0} x2={b.x0} y1={1} y2={base+1}/>}<text className="band-label" x={(b.x0+b.x1)/2} y={base+17} textAnchor="middle">{short(b.level)}{abbr&&<title>{b.level}</title>}</text></g>)}
   </svg>
   <div className="absolute inset-0">{order.map(({r,t,k,dx})=>{const cx_=x(t.score)+dx,cy=base-14-k*STEP,fill=on(r)?colors[r.displayName]:DIM,num=nums[r.displayName];
    return <button key={r.id} type="button" tabIndex={-1} aria-hidden="true" aria-label={`${r.displayName}: ${t.final}`} onPointerDown={e=>{ptr.current=e.pointerType}} onClick={()=>{if(ptr.current==='touch'&&tip?.r===r)setTip(null);else show(r,t,cx_,cy)}} onPointerEnter={e=>{if(e.pointerType!=='touch')show(r,t,cx_,cy)}} className={cx('absolute -translate-x-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-full max-md:after:absolute max-md:after:-inset-2 max-md:after:content-[""] focus-visible:outline-2 outline-accent transition-opacity',!on(r)&&'opacity-15')} style={{left:cx_,top:cy}}>
     {t.final==='Lover'?<span aria-hidden="true" className="text-[15px] leading-none" style={{color:fill}}>♥</span>:t.ended?<EndMark kind={t.ended} color={fill}/>:<span aria-hidden="true" className="anim-pop block size-3 rounded-full ring-2 ring-[var(--plot-bg)]" style={{background:fill}}/>}
     {num!==undefined&&<span aria-hidden="true" className={cx('absolute -top-2.5 inline-flex h-4 min-w-4 items-center justify-center whitespace-nowrap rounded-full border border-[var(--plot-rule-2)] bg-[var(--plot-bg)] px-[3px] font-mono text-[11px] font-semibold leading-none text-ink-2 tnum',dx<0?'right-[calc(50%+6px)]':'left-[calc(50%+6px)]')}>{num}</span>}
    </button>})}</div>
   {tip&&<div aria-hidden="true" className={cx('pointer-events-none absolute z-30 -translate-x-1/2 rounded-md bg-ink text-bg px-2.5 py-1.5 text-xs shadow-lg max-w-[220px] text-center',tip.cy<44?'':'-translate-y-full')} style={{left:Math.min(Math.max(tip.cx,100),w-100),top:tip.cy<44?tip.cy+16:tip.cy-16}}><b className="font-semibold">{nums[tip.r.displayName]?nums[tip.r.displayName]+'. ':''}{tip.r.displayName}</b><span className="ml-1.5 opacity-80">{endNote(scale,tip.t)??<>{tip.t.final}{!scale.outcome&&tip.t.final!==levelOf(scale,tip.t.score)&&` · ${levelOf(scale,tip.t.score)} trust`}</>}</span></div>}
  </div>
 </div>}

// Value at the end of each chapter, so runs of different lengths line up (prepared by libraryTrack() in
// scripts/relationship-track.mjs: `track.chapters` and each gauge's `series`).
export function chapterSeries(r,key){const t=r.track[key];return r.track.chapters.map((c,i)=>({c,v:t.series[i]??null}))}
export const BROKE=new Set(['amandaTrust']);


