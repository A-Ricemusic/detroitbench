import React,{useEffect,useMemo,useRef,useState} from 'react';
import {MoveHorizontal,X} from 'lucide-react';
import {IconButton,Notice,Skeleton,cx,useMediaQuery} from './ui.jsx';
import {Segmented,Sheet} from './ui-radix.jsx';
import {chapterSVG,FLOW_CSS} from '../lib/flowchart.js';

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

// The report page's centrepiece: a tall gridded canvas using the full content width, with the selected node's full
// record (from `renderDetail`) in a panel over the chart's right side, or in a bottom sheet on phones. `initialChapter`
// opens that chapter (links of the form #/runs/<id>?view=flow&chapter=N arrive here).
export function RunFlowchart({r,initialChapter,renderDetail}){
 const wide=useMediaQuery('(min-width: 768px)');
 const {flows,error}=useFlows(r.flowUrl);
 const [chapter,setChapter]=useState(()=>Number(initialChapter)||null),[mode,setMode]=useState('dim'),[selected,setSelected]=useState(null);
 const box=useRef(null);
 // A later link to another chapter of the same run (the page stays mounted) moves the chart there too.
 useEffect(()=>{if(Number(initialChapter))setChapter(Number(initialChapter))},[initialChapter]);
 const flow=useMemo(()=>flows?.find(f=>f.chapter===chapter)??flows?.find(f=>f.touched)??null,[flows,chapter]);
 // Close the details and return focus to the exact node that opened them (several nodes can share a record key).
 const close=()=>{const i=selected?.i;setSelected(null);if(i!==undefined&&i>=0)requestAnimationFrame(()=>box.current?.querySelectorAll('[data-node]')[i]?.focus({preventScroll:true}))};
 const svg=useMemo(()=>flow?chapterSVG(flow,{showUntaken:mode==='dim',idPrefix:'site'}):'',[flow,mode]);
 const index=useMemo(()=>flow?detailIndex(flow):new Map,[flow]);
 useEffect(()=>{setSelected(null);if(box.current)box.current.scrollLeft=0},[flow]);
 useEffect(()=>setSelected(null),[mode]);
 // Mark the selected node so the chart shows which one the detail below describes.
 useEffect(()=>{const el=box.current;if(!el)return;[...el.querySelectorAll('[data-node]')].forEach((n,i)=>n.classList.toggle('is-selected',i===selected?.i))},[selected,svg]);
 // On the page, keep the selected node clear of the detail panel that now covers the chart's right side.
 useEffect(()=>{const el=box.current;if(!wide||!el||!selected)return;const n=el.querySelectorAll('[data-node]')[selected.i];if(!n)return;const b=el.getBoundingClientRect(),r=n.getBoundingClientRect(),free=b.right-Math.min(440,b.width*0.45)-24;
  if(r.right>free)el.scrollBy({left:r.right-free,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})},[selected,wide]);
 if(error)return <Notice tone="bad">{error}.</Notice>;
 if(!flows)return <div aria-busy="true" className="grid gap-3"><Skeleton className="h-10"/><Skeleton className="h-64"/><p className="sr-only" role="status">Loading flowcharts…</p></div>;
 const choose=n=>{const all=[...box.current.querySelectorAll('[data-node]')],alt=n.classList.contains('fc-node')&&!n.classList.contains('is-taken')?{text:n.querySelector('title')?.textContent??'',locked:n.classList.contains('is-locked')}:null;setSelected({key:n.dataset.node,i:all.indexOf(n),alt})};
 const pick=e=>{const n=e.target.closest?.('[data-node]');if(n)choose(n)};
 const chapterNav=<nav aria-label="Chapter" className={'-mx-4 flex gap-1.5 overflow-x-auto no-scrollbar px-4 md:mx-0 md:flex-wrap md:px-0'}>
   {flows.map(f=><button key={f.chapter} type="button" aria-pressed={f===flow} aria-label={`Chapter ${f.chapter}: ${f.title}${f.touched?'':' (not reached)'}`} title={f.title} onClick={()=>setChapter(f.chapter)}
    className={cx('shrink-0 min-w-10 min-h-10 md:min-h-8 md:min-w-9 px-1.5 rounded-md border font-mono text-[13px] tnum transition-colors',f===flow?'bg-accent text-on-accent border-accent':'border-line-2 hover:bg-surface-2',!f.touched&&f!==flow&&'text-ink-3 border-dashed')}>{String(f.chapter).padStart(2,'0')}</button>)}
  </nav>;
 const toolbar=<div className="flex flex-wrap items-center justify-between gap-3">
   <Segmented label="Untaken branches" size="sm" value={mode} onChange={setMode} options={[{value:'dim',label:'Show untaken, dimmed'},{value:'hide',label:'Hide untaken'}]}/>
   <p className="flex items-center gap-1.5 text-xs text-ink-3 lg:hidden"><MoveHorizontal aria-hidden="true" className="size-4"/>Scroll the chart sideways</p>
  </div>;
 const onKeyDown=e=>{if(e.key==='Enter'||e.key===' '){const n=e.target.closest?.('[data-node]');if(n){e.preventDefault();choose(n)}}else if(e.key==='Escape'&&selected){e.preventDefault();close()}};
 const info=selected?{key:selected.key,alt:selected.alt,info:index.get(selected.key),flow}:null;
 return <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
  <style>{FLOW_CSS}</style>
  {chapterNav}
  {toolbar}
  {flow&&!flow.touched&&<p className="text-sm text-ink-2">This run never reached chapter {flow.chapter}; every scene is drawn as not reached.</p>}
  <div className="relative">
   <div ref={box} role="region" tabIndex={0} aria-label={flow?`Chapter ${flow.chapter}, ${flow.title}: flowchart. Select a node for its full record.`:'Flowchart'} onClick={pick} onKeyDown={onKeyDown}
    className="flowchart plot-grid overflow-auto overscroll-contain rounded-2xl border border-line md:h-[calc(100dvh-var(--header-h)-170px)] md:min-h-[520px] max-h-[75dvh] md:max-h-none focus-visible:outline-2 focus-visible:-outline-offset-2 outline-accent [&>svg]:block"
    style={selected&&wide?{paddingRight:'min(440px,45%)'}:undefined} dangerouslySetInnerHTML={{__html:svg}}/>
   {selected&&wide&&<aside aria-label="Selected node" onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}}} className="anim-fade-in absolute inset-y-0 right-0 z-10 flex w-[min(440px,45%)] flex-col overflow-hidden rounded-r-2xl border-l border-line bg-raised shadow-lg">
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-line py-1 pl-5 pr-2"><span className="cap">Node details</span><IconButton label="Close node details" icon={X} size="sm" onClick={close}/></div>
    <div className="min-w-0 grow overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-5 pt-4 [overflow-wrap:anywhere]">{renderDetail(info)}</div>
   </aside>}
  </div>
  {!wide&&<Sheet open={!!selected} onOpenChange={o=>{if(!o)close()}} title={info?.info?.col?.title??'Node'} description={flow?`Chapter ${flow.chapter} · ${flow.title}`:undefined}>{selected&&renderDetail({...info,inSheet:true})}</Sheet>}
 </div>}
