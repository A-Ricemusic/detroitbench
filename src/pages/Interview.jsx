import React,{useCallback,useEffect,useId,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {ArrowDown,ArrowLeft,ArrowUp,ChevronDown,ChevronsDownUp,ChevronsUpDown,ListOrdered} from 'lucide-react';
import {Button,IconButton,Notice,PageHeader,Skeleton,cx} from '../components/ui.jsx';
import {href} from '../lib/router.jsx';
import {Recognition} from '../components/Recognition.jsx';

function useInterview(id){
 const [state,set]=useState({data:null,error:null}),[attempt,setAttempt]=useState(0);
 useEffect(()=>{let on=true;set({data:null,error:null});fetch('/data/interviews/'+encodeURIComponent(id)+'.json').then(r=>{if(!r.ok)throw new Error('Cannot load the interview');return r.json()}).then(data=>on&&set({data,error:null})).catch(error=>on&&set({data:null,error}));return()=>{on=false}},[id,attempt]);
 return {...state,retry:()=>setAttempt(a=>a+1)}
}

/* ---------- Questions: short labels, paragraphs, previews ---------- */
// Short index labels for the interview questions (benchmark/experience-prompt.mjs). Matched on the wording rather than
// the number so a reordered or shortened interview still gets the right label; anything unmatched uses its first words.
const LABELS=[[/equal rights/i,'Equal rights'],[/most threatened/i,'Most threatened by'],[/care for most/i,'Cared for most'],[/do it all over again|decisions would you change/i,'Would change'],[/ethical dilemmas|most challenging/i,'Hardest dilemma'],[/right choices/i,'Right choices?'],[/stealing, killing or lying/i,'Stealing, killing, lying'],[/recogni[sz]e this story/i,'Recognized the story?']];
const shortLabel=q=>LABELS.find(([re])=>re.test(q))?.[1]??q.split(/\s+/).slice(0,4).join(' ').replace(/[,.?]$/,'')+'…';
const words=t=>t.trim().split(/\s+/).filter(Boolean).length;
const minutes=w=>Math.max(1,Math.round(w/230));
// A long answer (past ~900 characters) collapses to a preview of about 420 characters. The preview always ends on a
// paragraph or sentence boundary, so nothing is reworded or cut mid-sentence: an answer that opens with a long
// paragraph (many models answer in one) is split after a sentence, otherwise after whole paragraphs. At least ~250
// characters stay behind "Read full answer"; anything shorter is shown whole.
const COLLAPSE_AT=900,PREVIEW_CHARS=420,MIN_REST=250;
const BOUNDARY=/[.!?][”"’)\]]?\s+(?=[“"‘(A-Z0-9])/g;
function cutSentence(p){for(const m of p.matchAll(BOUNDARY)){const at=m.index+m[0].length;if(at>=PREVIEW_CHARS&&at<=PREVIEW_CHARS*1.8)return at;if(at>PREVIEW_CHARS*1.8)break}return -1}
function shape(x){
 const paras=x.answer===null?[]:x.answer.split(/\n+/).map(p=>p.trim()).filter(Boolean);
 const total=paras.reduce((s,p)=>s+p.length,0),base={...x,label:shortLabel(x.question),paras,words:x.answer===null?0:words(x.answer),collapsible:false};
 if(total<=COLLAPSE_AT)return base;
 let head,tail,cut=false;
 if(paras[0].length>=PREVIEW_CHARS*1.6){const at=cutSentence(paras[0]);if(at<0)return base;head=[paras[0].slice(0,at).trimEnd()];tail=[paras[0].slice(at),...paras.slice(1)];cut=true}
 else{let k=1;for(let sum=paras[0].length;k<paras.length-1&&sum<PREVIEW_CHARS;k++)sum+=paras[k].length;head=paras.slice(0,k);tail=paras.slice(k)}
 const restChars=tail.reduce((s,p)=>s+p.length,0);if(restChars<MIN_REST)return base;
 return {...base,collapsible:true,head,tail,cut,restWords:words(tail.join(' '))}}
// The first sentence of an answer, set as its lead. A sentence longer than 240 characters is not pulled out.
function splitLead(p){const m=/^(.+?[.!?])(\s+)(?=\S)/s.exec(p);return m&&m[1].length<=240?[m[1],p.slice(m[1].length)]:[null,p]}

const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
// Hash routing owns the URL fragment, so the index scrolls with buttons rather than #anchors (as in Report.jsx).
function goTo(id){const el=document.getElementById(id);if(!el)return;el.scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});const h=el.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}
function toTop(){scrollTo({top:0,behavior:reduced()?'instant':'smooth'});const h=document.querySelector('#main h1');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}

// The question the reader is on: the last section whose top has passed the sticky chrome. 0 means above the first.
function useActive(ids){
 const [active,setActive]=useState(0);
 useEffect(()=>{if(!ids.length)return;let raf=0;
  const measure=()=>{raf=0;const line=(document.querySelector('header')?.getBoundingClientRect().bottom??56)+(innerWidth<1024?104:40);let a=0;
   ids.forEach((id,i)=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=line)a=i+1});
   if(a&&innerHeight+scrollY>=document.documentElement.scrollHeight-4){const last=document.getElementById(ids.at(-1));if(last&&last.getBoundingClientRect().top<innerHeight)a=ids.length}
   setActive(a)};
  const on=()=>{if(!raf)raf=requestAnimationFrame(measure)};measure();
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',on);removeEventListener('resize',on)}},[ids]);
 return active}
function useScrolledPast(px){const [past,set]=useState(false);useEffect(()=>{const f=()=>set(scrollY>px);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[px]);return past}

/* ---------- Index: a sticky side list from 1024 px, a sticky "question N of M" bar below ---------- */
const Num=({n,on,className})=><span aria-hidden="true" className={cx('inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tnum transition-colors',on?'border-accent bg-accent text-on-accent':'border-line-2/60 text-ink-3',className)}>{n}</span>;
function IndexList({items,active,onPick,dense}){
 return <ol className="grid gap-0.5">{items.map((x,i)=>{const on=active===i+1;return <li key={x.n}><button type="button" onClick={()=>onPick(x)} aria-current={on?'location':undefined}
   className={cx('focus-inset group flex w-full items-center gap-2.5 rounded-lg px-2 text-left text-sm transition-colors',dense?'min-h-10':'min-h-11',on?'bg-accent-soft font-medium text-ink':'text-ink-2 hover:bg-surface-2 hover:text-ink')}>
   <Num n={x.n} on={on}/><span className="min-w-0 grow leading-snug">{x.label}</span>{x.answer===null&&<span className="text-[11px] text-ink-3">no answer</span>}
  </button></li>})}</ol>}

function SideIndex({items,active,onPick,allOpen,toggleAll,anyCollapsible}){
 return <nav aria-label="Questions" className="sticky top-[calc(var(--header-h)+24px)] max-h-[calc(100dvh-var(--header-h)-48px)] overflow-y-auto overscroll-contain pb-2">
  <p className="cap px-2 mb-2">Questions · {active?`${active} of ${items.length}`:items.length}</p>
  <div aria-hidden="true" className="mx-2 mb-3 h-0.5 rounded-full bg-line"><div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{width:`${active/items.length*100}%`}}/></div>
  <IndexList items={items} active={active} onPick={onPick} dense/>
  <div className="mt-3 grid gap-0.5 border-t border-line pt-3">
   {anyCollapsible&&<Button variant="ghost" size="sm" icon={allOpen?ChevronsDownUp:ChevronsUpDown} onClick={toggleAll} className="justify-start px-2">{allOpen?'Collapse long answers':'Expand all answers'}</Button>}
   <Button variant="ghost" size="sm" icon={ArrowUp} onClick={toTop} className="justify-start px-2">Back to top</Button>
  </div>
 </nav>}

function QuestionBar({items,active,onPick,allOpen,toggleAll,anyCollapsible}){
 const [open,setOpen]=useState(false),wrap=useRef(null),panelId=useId(),cur=items[active-1];
 useEffect(()=>{if(!open)return;const out=e=>{if(!wrap.current?.contains(e.target))setOpen(false)},esc=e=>{if(e.key==='Escape'){setOpen(false);wrap.current?.querySelector('button')?.focus()}};
  addEventListener('pointerdown',out);addEventListener('keydown',esc);return()=>{removeEventListener('pointerdown',out);removeEventListener('keydown',esc)}},[open]);
 useEffect(()=>{if(open)(wrap.current?.querySelector('ol [aria-current]')??wrap.current?.querySelector('ol button'))?.focus()},[open]);
 return <div ref={wrap} className="lg:hidden sticky top-[var(--header-h)] z-20 -mx-4 md:-mx-8 border-b border-line bg-bg/92 backdrop-blur-md supports-[backdrop-filter]:bg-bg/80">
  <div className="flex items-center gap-2 px-4 md:px-8">
   <button type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(o=>!o)} className="focus-inset flex min-h-12 min-w-0 grow items-center gap-2.5 text-left">
    {cur?<Num n={cur.n} on/>:<ListOrdered aria-hidden="true" className="size-5 shrink-0 text-ink-3"/>}
    <span className="min-w-0 grow"><span className="block text-[11px] leading-tight text-ink-3 tnum">{cur?`Question ${active} of ${items.length}`:`${items.length} questions`}</span><span className="block truncate text-[15px] font-medium leading-tight text-ink">{cur?cur.label:'Jump to a question'}</span></span>
    <ChevronDown aria-hidden="true" className={cx('size-4.5 shrink-0 text-ink-3 transition-transform',open&&'rotate-180')}/>
   </button>
  </div>
  <div aria-hidden="true" className="h-0.5 bg-transparent"><div className="h-full bg-accent transition-[width] duration-300" style={{width:`${active/items.length*100}%`}}/></div>
  <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-raised shadow-lg anim-fade-up">
   <nav aria-label="Questions" className="max-h-[min(70dvh,30rem)] overflow-y-auto overscroll-contain px-2 md:px-6 py-2">
    <IndexList items={items} active={active} onPick={x=>{setOpen(false);onPick(x)}}/>
    <div className="mt-1 flex flex-wrap gap-1 border-t border-line pt-2">
     {anyCollapsible&&<Button variant="ghost" size="sm" icon={allOpen?ChevronsDownUp:ChevronsUpDown} onClick={()=>{toggleAll();setOpen(false)}}>{allOpen?'Collapse long answers':'Expand all answers'}</Button>}
     <Button variant="ghost" size="sm" icon={ArrowUp} onClick={()=>{setOpen(false);toTop()}}>Back to top</Button>
    </div>
   </nav>
  </div>
 </div>}

/* ---------- One question and its answer ---------- */
function Answer({x,open,setOpen}){
 const rest=useRef(null),sec=useRef(null),restId=useId(),collapsed=x.collapsible&&!open;
 // While collapsed, the rest of the answer sits in a hidden="until-found" block, so find-in-page still reaches it and
 // opens the answer. Expanded, the answer renders as its original paragraphs.
 useLayoutEffect(()=>{const el=rest.current;if(!el)return;el.setAttribute('hidden','until-found');const f=()=>setOpen(true);el.addEventListener('beforematch',f);return()=>el.removeEventListener('beforematch',f)},[collapsed,setOpen]);
 const collapse=()=>{setOpen(false);requestAnimationFrame(()=>{const r=sec.current?.getBoundingClientRect();if(r&&r.top<0)sec.current.scrollIntoView({block:'start',behavior:'instant'})})};
 const para=(p,i,last)=>{const tail=collapsed&&x.cut&&last&&<span aria-hidden="true" className="text-ink-3"> …</span>;if(i>0)return <p key={i}>{p}{tail}</p>;const [lead,rest]=splitLead(p);return <p key={i}>{lead&&<span className="font-medium text-ink">{lead}</span>}{rest}{tail}</p>};
 const shown=collapsed?x.head:x.paras;
 return <section ref={sec} id={'q-'+x.n} aria-labelledby={'q-'+x.n+'-h'} className="scroll-mt-[48px] lg:scroll-mt-6 border-t border-line pt-8 md:pt-10 first:border-t-0 first:pt-0">
  <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1"><Num n={x.n} className="size-7 text-xs border-transparent bg-accent-soft text-ink"/><span className="cap text-ink-2 font-semibold">{x.label}</span>{x.answer!==null&&<span className="text-xs text-ink-3 tnum">{x.words} words · {minutes(x.words)} min read</span>}</p>
  <h2 id={'q-'+x.n+'-h'} className="mt-3 text-[19px] md:text-[22px] leading-snug font-semibold text-ink outline-none">{x.question}</h2>
  {x.answer===null?<p className="mt-4 text-ink-3">Not answered.</p>:<div className="mt-4 md:mt-5 max-w-[60ch] text-[16px] md:text-[17px] leading-[1.7] text-ink-2 [overflow-wrap:anywhere]">
   <div className="grid gap-[1.05em]">{shown.map((p,i)=>para(p,i,i===shown.length-1))}</div>
   {collapsed&&<div ref={rest} id={restId} className="mt-[1.05em] grid gap-[1.05em]">{x.tail.map((p,i)=><p key={i}>{p}</p>)}</div>}
   {x.collapsible&&(open?<Button variant="ghost" size="sm" icon={ChevronsDownUp} onClick={collapse} className="mt-4 -ml-3 min-h-11 md:min-h-10 text-ink-3">Show less</Button>
    :<div className="relative mt-3"><div aria-hidden="true" className="pointer-events-none absolute -top-12 inset-x-0 h-12 bg-gradient-to-b from-transparent to-bg"/><Button variant="secondary" icon={ArrowDown} onClick={()=>setOpen(true)} aria-controls={restId} aria-expanded="false" className="w-full sm:w-auto min-h-11 md:min-h-10 rounded-full">Read full answer<span className="hidden min-[400px]:inline font-normal text-ink-3 tnum">· {x.restWords} more words</span></Button></div>)}
  </div>}
 </section>}

/* ---------- Page ---------- */
export default function Interview({id}){
 const {data:d,error,retry}=useInterview(id);
 useEffect(()=>{document.title=(d?d.title+' · Interview':'Interview')+' · DetroitBench'},[d]);
 const iv=d?.interview;
 const items=useMemo(()=>iv?iv.items.map(shape):[],[iv]);
 const ids=useMemo(()=>items.map(x=>'q-'+x.n),[items]);
 const active=useActive(ids),past=useScrolledPast(900);
 const [opened,setOpened]=useState(()=>new Set);
 useEffect(()=>setOpened(new Set),[id]);
 const collapsible=items.filter(x=>x.collapsible),allOpen=collapsible.length>0&&collapsible.every(x=>opened.has(x.n));
 const toggleAll=useCallback(()=>setOpened(allOpen?new Set:new Set(collapsible.map(x=>x.n))),[allOpen,collapsible]);
 const setters=useMemo(()=>new Map(items.map(x=>[x.n,v=>setOpened(s=>{const t=new Set(s);if(typeof v==='function'?v(t.has(x.n)):v)t.add(x.n);else t.delete(x.n);return t})])),[items]);
 const pick=useCallback(x=>goTo('q-'+x.n),[]);
 const links=<nav aria-label="Run navigation" className="flex flex-wrap gap-x-6 mb-3 text-sm"><a className="link inline-flex items-center gap-1.5 min-h-11" href={href('runs/'+id+'/report')}><ArrowLeft aria-hidden="true" className="size-4"/>Back to report</a><a className="link inline-flex items-center min-h-11" href={href('runs')}>All runs</a></nav>;
 if(error)return <>{links}<PageHeader title="Interview"/><Notice tone="bad">{error.message}. <Button variant="link" onClick={retry}>Try again</Button></Notice></>;
 if(!d)return <>{links}<div aria-busy="true" className="grid gap-4"><Skeleton className="h-10 w-full max-w-xl"/><Skeleton className="h-5 w-64"/><Skeleton className="h-24 max-w-3xl"/><Skeleton className="h-64 max-w-3xl"/><p className="sr-only" role="status">Loading the interview…</p></div></>;
 const count=iv?.total===7?'Seven':iv?.total===8?'Eight':iv?.total,shared={items,active,onPick:pick,allOpen,toggleAll,anyCollapsible:collapsible.length>0};
 return <>{links}
  <div className={cx('lg:grid lg:gap-x-12 xl:gap-x-16',iv&&'lg:grid-cols-[14rem_minmax(0,1fr)]')}>
   {iv&&<aside className="hidden lg:block lg:row-span-2"><SideIndex {...shared}/></aside>}
   <div className="min-w-0">
    <PageHeader eyebrow="Interview" title={d.displayName}>
     <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[15px] md:text-base text-ink-2"><span>{d.date}</span><span aria-hidden="true" className="text-ink-3">·</span><span>{d.vendor}</span></p>
     <p className="mt-0.5 font-mono text-xs text-ink-3 [overflow-wrap:anywhere]">{d.displayModel}</p>
     {iv&&<p className="mt-4 max-w-[62ch] text-[15px] md:text-base leading-relaxed text-ink-2">{count} questions asked after the final scene; answers are the model’s own words with real names restored.</p>}
    </PageHeader>
    <div className="max-w-[72ch]"><Recognition audit={d.recognition}/></div>
   </div>
   <div className="min-w-0 lg:col-start-2">
    {!iv?<Notice className="mt-8 max-w-[72ch]">Interview not recorded. This run predates the post-game interview.</Notice>:<div className="mt-8 md:mt-10">
     <QuestionBar {...shared}/>
     <article aria-label="Interview answers" className="pt-8 lg:pt-0 pb-8 max-w-[48rem]">
      {!iv.complete&&<Notice tone="warn" className="mb-8 max-w-[60ch]">Incomplete: {iv.answered} of {iv.total} questions answered.</Notice>}
      <div className="grid gap-10 md:gap-12">{items.map(x=><Answer key={x.n} x={x} open={opened.has(x.n)} setOpen={setters.get(x.n)}/>)}</div>
     </article>
    </div>}
    {links}
   </div>
  </div>
  {iv&&<IconButton label="Back to top" icon={ArrowUp} variant="secondary" onClick={toTop} tabIndex={past?0:-1} aria-hidden={!past}
   className={cx('lg:hidden fixed right-4 md:right-8 z-20 rounded-full shadow-md transition-opacity bottom-[calc(3.5rem+env(safe-area-inset-bottom)+12px)] md:bottom-6',past?'opacity-100':'opacity-0 pointer-events-none')}/>}
 </>;
}
