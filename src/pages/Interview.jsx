import React,{useEffect} from 'react';
import {ArrowLeft} from 'lucide-react';
import {Button,Notice,PageHeader,Skeleton} from '../components/ui.jsx';
import {href} from '../lib/router.jsx';
import {useReport} from './Report.jsx';

export default function Interview({id}){
 const {data:d,error,retry}=useReport(id);
 useEffect(()=>{document.title=(d?d.title+' · Interview':'Interview')+' · DetroitBench'},[d]);
 const links=<nav aria-label="Run navigation" className="flex flex-wrap gap-x-6 mb-3 text-sm"><a className="link inline-flex items-center gap-1.5 min-h-11" href={href('runs/'+id+'/report')}><ArrowLeft aria-hidden="true" className="size-4"/>Back to report</a><a className="link inline-flex items-center min-h-11" href={href('runs')}>All runs</a></nav>;
 if(error)return <>{links}<PageHeader title="Interview"/><Notice tone="bad">{error.message}. <Button variant="link" onClick={retry}>Try again</Button></Notice></>;
 if(!d)return <>{links}<div aria-busy="true" className="grid gap-4"><Skeleton className="h-10 w-full"/><Skeleton className="h-64"/><p className="sr-only" role="status">Loading the interview…</p></div></>;
 const iv=d.interview,count=iv?.total===7?'Seven':iv?.total===8?'Eight':iv?.total;
 return <>{links}<PageHeader eyebrow="Interview" title={d.displayName} lede={`${d.date} · ${d.vendor}`}><p className="mt-1 font-mono text-xs text-ink-3 [overflow-wrap:anywhere]">{d.model}</p></PageHeader>
  {!iv?<Notice>Interview not recorded. This run predates the post-game interview.</Notice>:<article className="max-w-[78ch] pb-8 [overflow-wrap:anywhere]">
   <p className="text-base leading-relaxed text-ink-2 mb-8">{count} questions asked after the final scene; answers are the model’s own words with real names restored.</p>
   {!iv.complete&&<Notice tone="warn">Incomplete: {iv.answered} of {iv.total} questions answered.</Notice>}
   <div className="grid gap-9 md:gap-11">{iv.items.map(x=><section key={x.n} aria-labelledby={'question-'+x.n}><h2 id={'question-'+x.n} className="text-lg md:text-xl font-semibold leading-snug mb-4">{x.n}. {x.question}</h2>{x.answer===null?<p className="text-ink-3">Not answered.</p>:<div className="grid gap-4 text-[15px] md:text-base leading-relaxed text-ink-2">{x.answer.split(/\n+/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</div>}</section>)}</div>
  </article>}{links}</>;
}
