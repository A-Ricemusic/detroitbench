import React,{useId,useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Badge,Card,cx} from './ui.jsx';
import {RECOGNITION_MEANINGS,recognitionLabel} from '../lib/recognition.js';
export function RecognitionBadge({audit,compact=false}){const v=audit?.verdict??'not audited';return <span title={RECOGNITION_MEANINGS[v]} tabIndex={0} className="inline-flex max-w-full"><Badge size="sm" tone={v==='clean'?'good':v.startsWith('recognized')?'warn':'mid'}>{compact&&v==='recognized (self-reported)'?'Self-reported':compact&&v.startsWith('recognized')?'Recognized':recognitionLabel(v)}</Badge></span>}
// The interview page's recognition audit: a summary row (verdict, its meaning, hit counts) with the verbatim excerpts,
// the compliance line and the question 8 self-report behind a disclosure. A run with no audit shows the summary and the
// compliance line only.
export function Recognition({audit,id='recognition'}){
 const v=audit?.verdict??'not audited',[open,setOpen]=useState(false),bodyId=useId();
 const quotes=audit?.quotes??[],hasDetail=!!audit&&(quotes.length>0||!!audit.selfReport||!!audit.compliance);
 const compliance=<p className="text-ink-2">Protocol compliance: {audit?.compliance??'not audited'}.{audit?.compliance==='tooling'&&' Cached controller-output artifacts or unclassified tooling require operator review.'}</p>;
 const inside=[quotes.length>0&&`${quotes.length} ${quotes.length===1?'excerpt':'excerpts'}`,audit?.selfReport&&'self-report','compliance'].filter(Boolean).join(', ');
 return <Card as="section" id={id} aria-labelledby={id+'-h'} className="scroll-mt-20 overflow-hidden text-sm">
  <div className="grid gap-1.5 px-4 py-3.5 md:px-5">
   <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5"><h2 id={id+'-h'} className="cap m-0">Recognition audit</h2><RecognitionBadge audit={audit}/></div>
   <p className="text-ink-2 max-w-[68ch]">{RECOGNITION_MEANINGS[v]}</p>
   {audit?.counts&&<p className="text-xs text-ink-3 tnum">{audit.counts.participant} in-play participant hits · {audit.counts.controller} controller-output hits (excluded from the verdict)</p>}
   {!hasDetail&&compliance}
  </div>
  {hasDetail&&<>
   <button type="button" aria-expanded={open} aria-controls={bodyId} onClick={()=>setOpen(o=>!o)} className="focus-inset flex w-full items-center justify-between gap-3 border-t border-line px-4 md:px-5 min-h-11 md:min-h-10 text-left text-[13px] font-medium text-ink-2 hover:bg-surface-2/60 hover:text-ink">
    <span>{open?'Hide audit detail':'Audit detail'}<span className="font-normal text-ink-3"> · {inside}</span></span>
    <ChevronDown aria-hidden="true" className={cx('size-4 shrink-0 text-ink-3 transition-transform',open&&'rotate-180')}/>
   </button>
   <div id={bodyId} hidden={!open} className="grid gap-3 min-w-0 border-t border-line bg-surface-2/40 px-4 py-4 md:px-5">
    {quotes.length>0&&<p className="text-xs text-ink-3">Verbatim excerpts, including substitute names.</p>}
    {quotes.length>0&&<ul className="grid gap-3 max-w-[85ch]">{quotes.map((q,i)=><li key={i} className="border-l-[3px] border-line-2 bg-surface rounded-r-lg px-3 py-2"><p className="text-xs text-ink-3 mb-1">Position {q.position} · {q.type} · {q.category}</p><blockquote className="text-ink whitespace-pre-wrap [overflow-wrap:anywhere]">{q.quote}</blockquote></li>)}</ul>}
    {compliance}
    {audit?.selfReport&&<div><h3 className="font-semibold mb-1">Recognition self-report (question 8, verbatim)</h3><p className="whitespace-pre-wrap text-ink-2 max-w-[72ch] [overflow-wrap:anywhere]">{audit.selfReport}</p></div>}
   </div>
  </>}
 </Card>}
