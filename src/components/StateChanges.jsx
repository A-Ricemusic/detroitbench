import React,{useEffect} from 'react';
import {cx} from './ui.jsx';

// State changes as scripts/change-format.mjs writes them: {label, text} (one value), {label, lines} (one line per
// changed key of an object or list) or {label, facts} (what a character learned, as a bulleted list). The label column
// keeps at least 40% of the width so a long label never breaks letter by letter; the value column keeps at least 9rem
// (less only in very narrow containers) so a long label cannot squeeze it to nothing; values wrap between words.
// Below 640 px each change stacks: the label on its own line, the value full width beneath it.
// In development, a change whose label is only its key in title case is logged once so a label can be added.
const logged=new Set;
export function StateChanges({changes,className}){
 useEffect(()=>{if(!import.meta.env.DEV)return;for(const c of changes)if(c.unlabeled&&!logged.has(c.unlabeled)){logged.add(c.unlabeled);console.info(`[state changes] no label for "${c.unlabeled}"; add one to CHANGE_LABELS (scripts/run-report.mjs) or the chapter module's labels`)}},[changes]);
 return <dl className={cx('grid text-sm',className)}>{changes.map((c,i)=><div key={i} className="grid gap-x-4 border-t border-line py-1.5 sm:grid-cols-[minmax(40%,auto)_minmax(min(9rem,calc(60%_-_1rem)),1fr)]">
  <dt className="min-w-0 text-ink-2 [overflow-wrap:break-word] [word-break:normal]">{c.label}</dt>
  <dd className="min-w-0 text-ink [overflow-wrap:break-word] [word-break:normal]">
   {c.text!==undefined?<span className="tnum">{c.text}</span>
   :c.facts?<ul className="grid list-disc gap-1 pl-4 marker:text-ink-3">{c.facts.map((f,j)=><li key={j} className="[text-wrap:pretty]">{f}</li>)}</ul>
   :<ul className="grid gap-0.5">{(c.lines??[]).map((l,j)=><li key={j} className="tnum">{l}</li>)}</ul>}
  </dd>
 </div>)}</dl>}
