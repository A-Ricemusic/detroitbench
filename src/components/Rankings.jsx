import React,{useMemo} from 'react';
import {cx} from './ui.jsx';
import {NumChip} from './Charts.jsx';
import {modelColors,modelNumbers} from '../lib/data.js';

// SkateBench-style ranked bar lists. Scores come straight from experiences.json (status and decisions per run).
// Best ending per story, the first entry of each ladder in OUTCOMES: Connor free, Kara and Alice in Canada, Markus's
// peaceful win. Kara and Alice share one story, so each counts half of it.
export const goodShare=r=>((r.status?.connor==='free'?1:0)+(r.status?.kara==='canada'?0.5:0)+(r.status?.alice==='canada'?0.5:0)+(r.status?.markus==='peaceful win'?1:0))/3;
const BOARDS=[
 {key:'good',title:'Stories that ended well',caption:'Share of the three stories that reached their best ending: Connor free, Markus’s peaceful win, and Kara and Alice in Canada (half each)',
  score:goodShare,max:()=>1,fmt:v=>Math.round(v*100)+'%',detail:r=>[r.status?.connor==='free'&&'Connor free',r.status?.kara==='canada'&&'Kara in Canada',r.status?.alice==='canada'&&'Alice in Canada',r.status?.markus==='peaceful win'&&'Markus peaceful'].filter(Boolean).join(' · ')||'No best ending'},
 {key:'decisions',title:'Decisions made',caption:'Prompts the model answered in its one playthrough, optional reading included; a run that keeps its characters alive longer reaches more of the story',
  score:r=>r.decisions,max:runs=>Math.max(1,...runs.map(r=>r.decisions)),fmt:v=>v.toLocaleString('en-US'),detail:r=>`${r.risk.failed} of ${r.risk.taken} risky actions failed`}
];
// Competition ranking: equal scores share a rank (1, 1, 3), and ties are listed by model number.
function ranked(runs,b,nums){const rows=[...runs].map(r=>({r,v:b.score(r)})).sort((a,c)=>c.v-a.v||(nums[a.r.displayName]??0)-(nums[c.r.displayName]??0));let rank=0;return rows.map((x,i)=>{if(i===0||x.v!==rows[i-1].v)rank=i+1;return {...x,rank}})}

function Board({b,runs,nums,colors,onPick}){
 const rows=useMemo(()=>ranked(runs,b,nums),[runs,b,nums]),max=b.max(runs),id='board-'+b.key;
 const row=({r,v,rank},i)=>{const top=rank<=3,pct=Math.max(0,Math.min(1,v/max)),firstRest=!top&&i>0&&rows[i-1].rank<=3;
  return <li key={r.id} className={cx(top&&'bg-surface-2/50 dark:bg-white/[.025] first:rounded-t-lg',top&&(rows[i+1]?.rank>3||i===rows.length-1)&&'rounded-b-lg',firstRest&&'mt-2 border-t border-[var(--plot-rule-2)] pt-4','grid grid-cols-[2.25rem_minmax(0,1fr)_auto] md:grid-cols-[2.75rem_minmax(0,17rem)_minmax(0,1fr)_5rem] items-center gap-x-3 gap-y-1.5 px-2 md:px-3 py-2.5')}>
   <span className={cx('font-mono text-[12px] tnum',top?'text-ink font-semibold':'text-ink-3')}>{String(rank).padStart(2,'0')}</span>
   <button type="button" aria-haspopup="dialog" onClick={()=>onPick?.(r.id)} className="flex min-w-0 items-center gap-2.5 text-left rounded-md hover:underline underline-offset-4 decoration-ink-3">
    <NumChip n={nums[r.displayName]} color={colors[r.displayName]}/>
    <span className={cx('font-mono text-[13px] truncate',top?'text-ink font-semibold':'text-ink-2')}>{r.displayName}</span>
   </button>
   <span className={cx('md:order-last text-right font-mono text-[13px] tnum',top?'text-ink font-semibold':'text-ink-2')}>{b.fmt(v)}</span>
   <span className="col-span-2 col-start-2 md:col-span-1 md:col-start-auto md:order-none min-w-0">
    <span className="block h-1.5 rounded-full bg-[var(--plot-rule)] overflow-hidden"><span className="block h-full rounded-full transition-[width] duration-500" style={{width:`${pct*100}%`,background:top?colors[r.displayName]:'var(--ink-3)'}}/></span>
    <span className="sr-only">{b.detail(r)}</span>
   </span>
  </li>};
 return <article aria-labelledby={id} className="plot-grid rounded-2xl border border-line px-4 py-5 shadow-sm md:px-8 md:py-8">
  <h3 id={id} className="text-2xl font-bold uppercase tracking-tight md:text-[32px] md:leading-none">{b.title}</h3>
  <p className="cap mt-2 max-w-[100ch]">{b.caption}</p>
  <ol className="mt-6 grid" aria-label={b.title}>{rows.map(row)}</ol>
 </article>}

export function Rankings({runs,onPick}){
 const colors=useMemo(()=>modelColors(runs),[runs]),nums=useMemo(()=>modelNumbers(runs),[runs]);
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-8">{BOARDS.map(b=><Board key={b.key} b={b} runs={runs} nums={nums} colors={colors} onPick={onPick}/>)}</div>}
