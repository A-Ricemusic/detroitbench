import React from 'react';
import {Badge} from './ui.jsx';
import {RECOGNITION_MEANINGS,recognitionLabel} from '../lib/recognition.js';
export function RecognitionBadge({audit,compact=false}){const v=audit?.verdict??'not audited';return <span title={RECOGNITION_MEANINGS[v]} tabIndex={0} className="inline-flex max-w-full"><Badge size="sm" tone={v==='clean'?'good':v.startsWith('recognized')?'warn':'mid'}>{compact&&v.startsWith('recognized')?'Recognized':recognitionLabel(v)}</Badge></span>}
export function Recognition({audit}){const v=audit?.verdict??'not audited';return <div className="grid gap-3 text-sm min-w-0">
 <RecognitionBadge audit={audit}/><p className="text-ink-2 max-w-[72ch]">{RECOGNITION_MEANINGS[v]}</p>
 {audit?.counts&&<p className="text-xs text-ink-3">{audit.counts.participant} participant hits · {audit.counts.controller} controller-output hits (excluded from the verdict)</p>}
 {audit?.quotes?.length>0&&<p className="text-xs text-ink-3">Verbatim excerpts, including substitute names.</p>}
 {audit?.quotes?.length>0&&<ul className="grid gap-3 max-w-[85ch]">{audit.quotes.map((q,i)=><li key={i} className="border-l-[3px] border-line-2 bg-surface-2 rounded-r-lg px-3 py-2"><p className="text-xs text-ink-3 mb-1">Position {q.position} · {q.type} · {q.category}</p><blockquote className="text-ink whitespace-pre-wrap [overflow-wrap:anywhere]">{q.quote}</blockquote></li>)}</ul>}
 <p className="text-ink-2">Protocol compliance: {audit?.compliance??'not audited'}.{audit?.compliance==='tooling'&&' Cached controller-output artifacts or unclassified tooling require operator review.'}</p>
 {audit?.selfReport&&<div><h3 className="font-semibold mb-1">Recognition self-report (question 8, verbatim)</h3><p className="whitespace-pre-wrap text-ink-2 [overflow-wrap:anywhere]">{audit.selfReport}</p></div>}
 </div>}
