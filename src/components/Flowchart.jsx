import React,{useEffect,useMemo,useRef,useState} from 'react';
import {MoveHorizontal} from 'lucide-react';
import {Notice,Segmented,Skeleton,cx} from './ui.jsx';
import {chapterSVG,FLOW_CSS} from '../lib/flowchart.js';
import {tidy} from '../lib/data.js';

const cache=new Map;
function useFlows(url){
 const [state,set]=useState(()=>cache.has(url)?{flows:cache.get(url),error:''}:{flows:null,error:''});
 useEffect(()=>{if(!url||cache.has(url)){set({flows:cache.get(url)??null,error:url?'':'This run has no chapter flowcharts.'});return}let on=true;set({flows:null,error:''});
  fetch(url).then(r=>{if(!r.ok)throw new Error('Cannot load the chapter flowcharts');return r.json()}).then(d=>{cache.set(url,d.chapters);on&&set({flows:d.chapters,error:''})}).catch(e=>on&&set({flows:null,error:e.message}));
  return()=>{on=false}},[url]);
 return state}

// Index taken choices by the record key every node carries, so a tapped node can show what happened there.
function detailIndex(flow){const m=new Map;
 for(const lane of flow.lanes)for(const col of lane.columns){const taken=col.options.filter(o=>o.taken);
  for(const o of taken)m.set(o.key,{lane,col,o});
  if(col.visited&&!m.has(col.key))m.set(col.key,{lane,col,o:taken[0]??null});
  if(!col.visited)m.set(col.key,{lane,col,o:null})}
 for(const lane of flow.lanes)for(const e of lane.endings)if(e.taken&&e.key&&m.has(e.key))m.set(e.key,{...m.get(e.key),ending:e});
 return m}

function Detail({d,alt}){
 if(!d)return <p className="text-sm text-ink-3">Tap or focus a node and press Enter to see the choice, the model’s reason and the outcome.</p>;
 const {lane,col,o,ending}=d;
 return <div className="grid gap-2 text-sm">
  <p className="text-xs uppercase tracking-[.08em] text-ink-3">{lane.label} · {col.title}{o?.orders?.length?` · ${o.orders.length>1?'actions':'action'} ${o.orders.join(', ')}`:''}</p>
  {alt&&col.visited&&<p className="text-ink-2"><span className="text-ink-3">{alt.locked?'Not available on this path: ':'Not chosen: '}</span>{tidy(alt.text)}</p>}
  {!col.visited?<p className="text-ink-2">Not reached on this path{col.skip?`: ${tidy(col.skip)}`:'.'}</p>:<>
   {o?<p><span className="text-ink-3">Chose </span><span className="font-medium">{tidy(o.text)}</span>{o.risk&&<span className={cx('ml-2 whitespace-nowrap text-xs font-semibold',o.risk.outcome==='failure'?'text-bad':'text-ink-2')}>{o.risk.label} · {o.risk.outcome==='failure'?'failed':'succeeded'}</span>}</p>:<p className="text-ink-2">A scripted event: no choice was offered.</p>}
   {o?.reason&&<blockquote className="border-l-2 border-line-2 pl-3 text-ink-2 [text-wrap:pretty]">“{tidy(o.reason)}”</blockquote>}
   {(o?.outcome||col.outcome)&&<p className="text-ink-2">{tidy(o?.outcome||col.outcome)}</p>}
   {ending&&<p className="border-t border-line pt-2"><span className="text-ink-3">Chapter ending: </span>{tidy(ending.text||ending.label)}</p>}
  </>}
 </div>}

export function RunFlowchart({r,initialChapter}){
 const {flows,error}=useFlows(r.flowUrl);
 const [chapter,setChapter]=useState(()=>Number(initialChapter)||null),[mode,setMode]=useState('dim'),[selected,setSelected]=useState(null);
 const box=useRef(null);
 const flow=useMemo(()=>flows?.find(f=>f.chapter===chapter)??flows?.find(f=>f.touched)??null,[flows,chapter]);
 const svg=useMemo(()=>flow?chapterSVG(flow,{showUntaken:mode==='dim',idPrefix:'site'}):'',[flow,mode]);
 const index=useMemo(()=>flow?detailIndex(flow):new Map,[flow]);
 useEffect(()=>{setSelected(null);if(box.current)box.current.scrollLeft=0},[flow]);
 useEffect(()=>setSelected(null),[mode]);
 // Mark the selected node so the chart shows which one the detail below describes.
 useEffect(()=>{const el=box.current;if(!el)return;[...el.querySelectorAll('[data-node]')].forEach((n,i)=>n.classList.toggle('is-selected',i===selected?.i))},[selected,svg]);
 if(error)return <Notice tone="bad">{error}.</Notice>;
 if(!flows)return <div aria-busy="true" className="grid gap-3"><Skeleton className="h-10"/><Skeleton className="h-64"/><p className="sr-only" role="status">Loading flowcharts…</p></div>;
 const choose=n=>{const all=[...box.current.querySelectorAll('[data-node]')],alt=n.classList.contains('fc-node')&&!n.classList.contains('is-taken')?{text:n.querySelector('title')?.textContent??'',locked:n.classList.contains('is-locked')}:null;setSelected({key:n.dataset.node,i:all.indexOf(n),alt})};
 const pick=e=>{const n=e.target.closest?.('[data-node]');if(n)choose(n)};
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
  <style>{FLOW_CSS}</style>
  <nav aria-label="Chapter" className="-mx-5 px-5 md:mx-0 md:px-0 flex gap-1.5 overflow-x-auto no-scrollbar md:flex-wrap">
   {flows.map(f=><button key={f.chapter} type="button" aria-pressed={f===flow} aria-label={`Chapter ${f.chapter}: ${f.title}${f.touched?'':' (not reached)'}`} title={f.title} onClick={()=>setChapter(f.chapter)}
    className={cx('shrink-0 min-w-10 min-h-10 md:min-h-8 md:min-w-9 px-1.5 rounded-md border font-mono text-[13px] tnum transition-colors',f===flow?'bg-accent text-on-accent border-accent':'border-line-2 hover:bg-surface-2',!f.touched&&f!==flow&&'text-ink-3 border-dashed')}>{String(f.chapter).padStart(2,'0')}</button>)}
  </nav>
  <div className="flex flex-wrap items-center justify-between gap-3">
   <Segmented label="Untaken branches" size="sm" value={mode} onChange={setMode} options={[{value:'dim',label:'Show untaken, dimmed'},{value:'hide',label:'Hide untaken'}]}/>
   <p className="flex items-center gap-1.5 text-xs text-ink-3 lg:hidden"><MoveHorizontal aria-hidden="true" className="size-4"/>Scroll the chart sideways</p>
  </div>
  <div ref={box} role="region" tabIndex={0} aria-label={flow?`Chapter ${flow.chapter}, ${flow.title}: flowchart, scrolls sideways`:'Flowchart'} onClick={pick} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){const n=e.target.closest?.('[data-node]');if(n){e.preventDefault();choose(n)}}}}
   className="flowchart -mx-5 md:-mx-7 overflow-x-auto overscroll-x-contain border-y border-line focus-visible:outline-2 focus-visible:-outline-offset-2 outline-accent" dangerouslySetInnerHTML={{__html:svg}}/>
  {flow&&!flow.touched&&<p className="text-sm text-ink-2">This run never reached chapter {flow.chapter}; every scene is drawn as not reached.</p>}
  <section aria-live="polite" aria-label="Selected node">{<Detail d={selected?index.get(selected.key):null} alt={selected?.alt}/>}</section>
  <p className="text-xs text-ink-3">Read left to right along the highlighted path. Filled nodes with a check mark are the choices made (a cross marks a risky action that failed); outlined nodes were offered but not chosen; dashed nodes were never reached; dotted ones were not available on this path. In a bracketed place explored in any order, numbers give the order of the actions, and a scene that cut in hangs below and rejoins it. Every ending the chapter can produce is listed on the right, the reached one filled.</p>
 </div>}
