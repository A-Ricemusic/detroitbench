import React,{useEffect,useId,useMemo,useRef,useState} from 'react';
import {RotateCcw,Search,SlidersHorizontal,X} from 'lucide-react';
import {cx,useMediaQuery} from './ui.jsx';
import {ModelsSheet} from './deferred.jsx';
import {announce} from '../lib/announce.jsx';
import {compareRuns,runLabel} from '../lib/data.js';
import {EFFORTS} from '../lib/modelSelection.js';
import {useModelFocus} from '../lib/modelFocus.jsx';
import {modelsPanel,useModelsPanel,MODELS_TAB_ID} from '../lib/modelsPanel.js';

// The models sidebar, after Slopalytics (docs/design/slopalytics-reference.md §3); on the results page it drives the
// runs table and every chart. A row is one run; its model's registry entry (modelInfo, from data/models.json via scripts/prepare.mjs) gives
// the group, size, vendor order and release date.
//  · "Models n" counts the selected runs; the reset icon restores the default selection and clears the page's options.
//  · Search ("/" focuses it, Escape clears it) matches name, model id, vendor and label, and lists every match as Results.
//  · Reasoning lists the levels present among the selected runs; an excluded level is struck through (none excluded by default).
//  · Frontier (Small / Medium / Large), Notable (All) and Other, in that order; the size and All buttons select or clear
//    a whole set and read as pressed when all of it is on. Other lists selected unregistered runs, or all of them after
//    "Show all models" (open-weight ones only with "Open weights" on).
//  · A row toggles its run (filled dot shown, hollow ring hidden); hovering or focusing it isolates the run in every chart.
// At 900 px or narrower the sidebar becomes a full-screen panel behind a "Models n" button.
const SIZES=[['small','Small'],['medium','Medium'],['large','Large']];
const tierOf=r=>r.modelInfo?.tier??'other';

function Panel({runs,colors,nums,sel,onReset,sheet=false,searchRef,onDone}){
 const {setHover}=useModelFocus(),[q,setQ]=useState(''),[browse,setBrowse]=useState(false),[openW,setOpenW]=useState(false),id=useId();
 const {selected,excluded,setSelected,setExcluded}=sel;
 const sorted=useMemo(()=>[...runs].sort(compareRuns),[runs]);
 const t=q.trim().toLowerCase(),results=t?sorted.filter(r=>[r.displayName,r.model,r.modelInfo?.name,r.modelInfo?.vendorName??r.vendor,r.label].some(s=>String(s??'').toLowerCase().includes(t))):null;
 const levels=EFFORTS.filter(e=>sorted.some(r=>selected.has(r.id)&&(r.reasoning??'none')===e));
 const frontier=sorted.filter(r=>tierOf(r)==='frontier'),notable=sorted.filter(r=>tierOf(r)==='notable'),others=sorted.filter(r=>tierOf(r)==='other');
 const otherShown=others.filter(r=>selected.has(r.id)||(browse&&(!r.modelInfo?.open||openW)));
 const all=set=>set.length>0&&set.every(r=>selected.has(r.id));
 const bulk=(set,label)=>{const on=all(set),n=new Set(selected);for(const r of set)on?n.delete(r.id):n.add(r.id);setSelected(n);announce(`${label}: ${set.length} ${set.length===1?'run':'runs'} ${on?'hidden':'shown'}`)};
 const toggle=r=>{const n=new Set(selected),off=n.has(r.id);off?n.delete(r.id):n.add(r.id);setSelected(n);if(off)setHover(null);announce(`${r.displayName} ${off?'hidden':'shown'}`)};
 const toggleLevel=e=>{const n=new Set(excluded);n.has(e)?n.delete(e):n.add(e);setExcluded(n);announce(`Reasoning ${e} ${n.has(e)?'hidden':'shown'}`)};
 const reset=()=>{setQ('');setBrowse(false);setOpenW(false);onReset();announce('Model selection reset')};
 const rowH=sheet?'min-h-11 text-[15px]':'min-h-[26px] min-[1600px]:min-h-[29px] text-[12.5px]';
 const row=r=>{const on=selected.has(r.id),color=colors[r.displayName];
  return <li key={r.id}><button type="button" aria-pressed={on} title={`${r.displayName} · ${r.modelInfo?.vendorName??r.vendor}`} onClick={()=>toggle(r)}
   onPointerEnter={e=>{if(e.pointerType==='mouse'&&on)setHover(r.id)}} onPointerLeave={e=>{if(e.pointerType==='mouse')setHover(null)}}
   onFocus={e=>{if(on&&e.currentTarget.matches(':focus-visible'))setHover(r.id)}} onBlur={()=>setHover(null)}
   className={cx('group flex w-full min-w-0 items-center gap-[9px] rounded-[5px] px-1.5 text-left hover:bg-surface-2',rowH)}>
   <span aria-hidden="true" className={cx('w-4 shrink-0 text-right font-mono text-[10.5px] text-ink-3 tnum',on?'opacity-100':'opacity-40 group-hover:opacity-100')}>{nums[r.displayName]}</span>
   <span className={cx('min-w-0 grow truncate',on?'text-ink':'text-ink-3')}>{runLabel(r)}</span>
   <span aria-hidden="true" className={cx('size-[7px] shrink-0 rounded-full',!on&&'opacity-50')} style={{color,background:on?'currentColor':'transparent',boxShadow:'inset 0 0 0 1px currentColor'}}/>
  </button></li>};
 const group=(title,list,actions)=>list.length?<section aria-label={title}>
  <div className="mb-1 flex items-baseline gap-2.5"><h3 className="grow text-[12px] font-semibold tracking-normal text-ink">{title}</h3>{actions}</div>
  <ul className="grid grid-cols-[minmax(0,1fr)] -mx-1.5">{list.map(row)}</ul></section>:null;
 const tbtn=(pressed,onClick,label,extra)=><button key={label} type="button" aria-pressed={pressed} onClick={onClick} className={cx('text-[11.5px] hover:text-ink',pressed?'text-ink font-medium underline decoration-ink-3 underline-offset-[3px]':'text-ink-3',extra)}>{label}</button>;
 return <div className={cx('flex flex-col',sheet?'gap-5':'gap-[18px]')}>
  {!sheet&&<div className="flex items-center justify-between gap-2">
   <h2 id={id+'-h'} className="text-[15px] font-medium tracking-normal">Models<span className="ml-1.5 font-mono text-[11px] font-normal text-ink-3 tnum">{selected.size}</span></h2>
   <button type="button" onClick={reset} title="Reset selection" aria-label="Reset selection" className="inline-flex size-6 items-center justify-center rounded text-ink-3 hover:text-ink"><RotateCcw aria-hidden="true" className="size-3.5"/></button>
  </div>}
  <div className={cx('flex items-center gap-2 border-b border-line-2 focus-within:border-accent',sheet?'h-[42px]':'h-8')}>
   <Search aria-hidden="true" className="size-3.5 shrink-0 text-ink-3"/>
   <input ref={searchRef} type="search" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Escape'&&q){e.preventDefault();e.stopPropagation();setQ('')}}} placeholder="Find models" aria-label="Find a model" autoComplete="off" spellCheck={false}
    className={cx('min-w-0 grow bg-transparent text-ink placeholder:text-ink-3 outline-none [&::-webkit-search-cancel-button]:hidden',sheet?'text-base':'text-[12.5px]')}/>
   {q?<button type="button" aria-label="Clear search" onClick={()=>{setQ('');searchRef?.current?.focus()}} className="inline-flex size-6 items-center justify-center text-ink-3 hover:text-ink"><X aria-hidden="true" className="size-3.5"/></button>
    :!sheet&&<kbd aria-hidden="true" className="font-mono text-[11px] text-ink-3">/</kbd>}
  </div>
  {results?(results.length?group('Results',results):<p role="status" className="text-[12.5px] text-ink-3">No models match “{q.trim()}”.</p>)
  :<>
   {levels.length>0&&<div role="group" aria-label="Reasoning"><h3 className="mb-1 text-[12px] font-semibold tracking-normal text-ink">Reasoning</h3>
    <div className="flex flex-wrap gap-x-2 gap-y-1">{levels.map(e=><button key={e} type="button" aria-pressed={!excluded.has(e)} onClick={()=>toggleLevel(e)} className={cx('text-[11.5px] hover:text-ink',sheet&&'min-h-8 text-sm',excluded.has(e)?'text-ink-3 line-through':'text-ink')}>{e}</button>)}</div></div>}
   {group('Frontier',frontier,<span className="flex gap-2.5">{SIZES.filter(([s])=>frontier.some(r=>r.modelInfo?.size===s)).map(([s,l])=>{const set=frontier.filter(r=>r.modelInfo?.size===s);return tbtn(all(set),()=>bulk(set,l),l,sheet&&'min-h-8 text-sm')})}</span>)}
   {group('Notable',notable,tbtn(all(notable),()=>bulk(notable,'Notable'),'All',sheet&&'min-h-8 text-sm'))}
   {group('Other',otherShown)}
   {others.length>0&&<div className="border-t border-line pt-3.5 grid gap-2">
    <button type="button" aria-expanded={browse} onClick={()=>setBrowse(b=>!b)} className="text-left text-[12px] text-ink-2 hover:text-ink">{browse?'Hide other models':'Show all models'}</button>
    {browse&&others.some(r=>r.modelInfo?.open)&&<div className="flex gap-3">{tbtn(openW,()=>setOpenW(o=>!o),'Open weights')}</div>}
   </div>}
  </>}
  {sheet&&<div className="border-t border-line pt-4"><button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink"><RotateCcw aria-hidden="true" className="size-4"/>Reset selection</button></div>}
 </div>}

// The sidebar for a page: a sticky aside on wide screens and a full-screen panel at 900 px or less. On phones (below
// 768 px) the panel opens from the "Models" tab of the bottom tab bar (src/components/Shell.jsx, through
// src/lib/modelsPanel.js); between 768 and 900 px, where there is no tab bar, a "Models n" button above the page opens it.
// Place it as a grid sibling of the charts; on narrow screens the button orders itself first.
export function ModelPicker({runs,colors,nums,sel,onReset,className}){
 const narrow=useMediaQuery('(max-width: 900px)'),phone=useMediaQuery('(max-width: 767px)'),{open}=useModelsPanel(),search=useRef(null),trigger=useRef(null);
 const setOpen=o=>modelsPanel.set({open:o});
 // The tab bar shows the Models tab, with the selected count, while this page is mounted at phone width.
 useEffect(()=>{modelsPanel.set({available:narrow&&phone,count:sel.selected.size});if(!narrow)modelsPanel.set({open:false})},[narrow,phone,sel.selected.size]);
 useEffect(()=>()=>modelsPanel.set({available:false,open:false}),[]);
 // "/" opens the panel on phones and focuses the search, unless the visitor is already typing.
 useEffect(()=>{const f=e=>{if(e.key!=='/'||e.metaKey||e.ctrlKey||e.altKey)return;if(e.target?.closest?.('input,textarea,select,[contenteditable=true]'))return;e.preventDefault();if(narrow){setOpen(true);setTimeout(()=>search.current?.focus(),60)}else search.current?.focus()};addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[narrow]);
 const panel=p=><Panel runs={runs} colors={colors} nums={nums} sel={sel} onReset={onReset} searchRef={search} {...p}/>;
 if(!narrow)return <aside aria-label="Models" className={cx('sticky top-[calc(var(--header-h)+16px)] max-h-[calc(100dvh-var(--header-h)-32px)] overflow-y-auto [scrollbar-width:thin] rounded-2xl border border-line bg-surface px-[18px] py-4 shadow-sm',className)}>{panel({})}</aside>;
 const opener=()=>phone?document.getElementById(MODELS_TAB_ID):trigger.current;
 return <>
  {!phone&&<div className={cx('order-first',className)}><button ref={trigger} type="button" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3.5 text-sm font-medium text-ink shadow-sm hover:bg-surface-2"><SlidersHorizontal aria-hidden="true" className="size-4"/>Models<span className="font-mono text-xs font-normal text-ink-3 tnum">{sel.selected.size}</span></button></div>}
  <ModelsSheet open={open} onOpenChange={setOpen} opener={opener} count={sel.selected.size}>{panel({sheet:true})}</ModelsSheet>
 </>}
