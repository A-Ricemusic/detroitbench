import {readFile,writeFile} from 'node:fs/promises';
import {tonightPlans} from './tonight-plans.mjs';

export async function generateTonight({priorityFile}={}){
 const root=new URL('../../',import.meta.url);
 const read=p=>readFile(new URL(p,root),'utf8');
 const source=await read('docs/research/CONFLICTS.md');
 const chapters=Object.fromEntries([...source.matchAll(/^### (\d+) · (.*?) · \d+$/gm)].map(m=>[+m[1],m[2]]));
 Object.assign(chapters,{12:'Waiting for Hank',16:'Time to Decide',21:'The Pirates’ Cove'});
 const items=[...source.matchAll(/^- \[ \] \*\*((?:ch\d+|gauge)-\d+)\*\* \[([^\]]+)\] (.+)$/gm)].map(m=>{
  const plan=tonightPlans[m[1]];
  if(!plan)throw Error(`Missing operational plan for ${m[1]}`);
  return {id:m[1],kind:m[2],question:m[3].split(' _(')[0],partial:m[3].includes('[Partly settled'),...plan};
 });
 // Stable metadata order is the route order inside each priority tier. Do not sort save targets alphabetically.
 const route=Object.keys(tonightPlans);
 items.sort((a,b)=>a.chapter-b.chapter || Number(a.partial)-Number(b.partial) || route.indexOf(a.id)-route.indexOf(b.id));
 let priorityOrder=null;
 if(priorityFile){
  const data=JSON.parse(await readFile(priorityFile,'utf8'));
  priorityOrder=Array.isArray(data)?data:data.items;
  if(!Array.isArray(priorityOrder)||priorityOrder.some(x=>typeof x!=='string')||new Set(priorityOrder).size!==priorityOrder.length)throw Error('Priority file must contain unique item IDs (array or {items: array})');
  const rank=new Map(priorityOrder.map((id,i)=>[id,i]));
  const unknown=priorityOrder.filter(id=>!items.some(x=>x.id===id));
  if(unknown.length)throw Error('Priority file contains non-open IDs: '+unknown.join(', '));
  items.sort((a,b)=>(rank.get(a.id)??Infinity)-(rank.get(b.id)??Infinity));
 }
 const total=items.reduce((n,x)=>n+x.minutes,0),fresh=items.filter(x=>!x.partial).length;
 const coreIds=new Set(['gauge-02','ch06-03','gauge-01','ch09-16','gauge-04','ch09-01','ch09-14','ch25-04','ch25-06','ch25-05','ch25-01','ch25-02','ch25-03']);
 if(priorityOrder){coreIds.clear();for(const id of items.slice(0,12).map(x=>x.id))coreIds.add(id)}
 const core=items.filter(x=>coreIds.has(x.id)),coreMinutes=core.reduce((n,x)=>n+x.minutes,0);
 const out=['# Play tonight · operator replay checklist','',`**${items.length} open items · ${priorityOrder?'sensitivity priority order; '+fresh+' without partial evidence':fresh+' without partial evidence first within each chapter'} · ${items.length-fresh} partials · ${total} estimated item-minutes (${Math.floor(total/60)} h ${total%60} min).**`,'',
 'Generated with `bun run play:checklist --tonight`. Questions and open/closed status come from [CONFLICTS.md](../../research/CONFLICTS.md); operational routes and estimates live in `scripts/checklist/tonight-plans.mjs`. Closed items disappear on regeneration. This document does not close questions or alter the benchmark.','',
 '## One evening, with a stopping rule','',
 `The complete backlog cannot fit one evening. **Core: ${core.length} items, ${coreMinutes} item-minutes**; reserve another 30 minutes for loading, notes and breaks. Use the **TONIGHT** marks in chapter order: Alice controlled counts; Partners; interrogation → Amanda; Midnight Train. Alice’s later net-10 trial can remain pending if its continuous save is unavailable. Gauge counts shared with a route are charged conservatively per item; this is a planning budget, not a measured speedrun. Follow-ups below preserve all 67 questions for another evening or a ready save.`, '',
 '**Save audit before starting (10 of the 30 reserve minutes).** On Experienced difficulty, inspect available chapter-select checkpoints and incoming flowchart history. Write the actual checkpoint label in the result field. Headings below describe target moments, not claimed menu labels. Load the nearest checkpoint BEFORE that moment; if absent, load chapter start. Do not assume any particular save exists. No setup is valid merely because later chapters show an unlocked node.','',
 '**Cross-chapter rules.** Enable saving for a changed history, then play continuously through every intervening chapter: jumping to a later chapter-select checkpoint restores its stored history rather than propagating new choices. Local estimates assume a qualifying incoming save; rebuilding missing multi-chapter histories can take hours and is excluded from the total. Mark those items BLOCKED tonight, with the missing prerequisite; do not improvise a substitute route. One active autosave can overwrite an incompatible branch: finish its downstream observations before loading another branch. Preserve recordings and note checkpoint history before switching.','',
 '**Order and sharing.** Chapters follow play order. Within each chapter the no-partial tier comes first, then partials; each tier groups the nearest save targets in route order. This priority can require a reload across tiers. Items explicitly naming a shared capture need only one replay. The ch09 probe branch must be carried to ch12 before reloading ch09 for pressure tests; the ch10 theft branches likewise run through ch17 before another Kara history. Those downstream captures are filed under the chapter where observed.','',
 '**Record evidence.** Record continuously from the prerequisite through the outcome; include difficulty, actual checkpoint, date, save-history identifier, video time and exact button labels. For popups record gauge, direction, small/large glyph, then read the flowchart header level after the animation clears. Do not equate a large glyph to two smalls. Count net small ups minus downs between adjacent level reveals, keeping all large events separate. A header at a terminal level or a crossing on a large arrow cannot identify a width. A no-prompt/no-warning answer must include the tested route and elapsed observation window.','',
 'Use the [operator journal format](../../research/operator-notes/README.md): `(e)` event or `(c)` choice, real names, exact observations; keep interpretation separate. One result line per item below can be dictated into that journal. Photograph the completed chart’s exact ending/node name. Keep unresolved results unresolved.','',
 '## Gauge history strips to keep beside the recording','',
 '- **Alice (ch04 onward):** initial Distant → exactly +2/key trial → first Neutral → first Warm → first Trusted → first Family; record all intervening smalls, any CLOSE tag, and the chapter of each reveal. The proposed 2/3/6/10 boundaries are a test, not instructions to rename a level.',
 '- **Hank (ch06 → 09 → 12):** initial Tense; drink glyph; car and report smalls; chapter-end reveal; then every interrogation/station arrow through first Warm and Friend. Separate the already observed four-small Warm interval from unresolved starting/Neutral widths.',
 '- **Amanda (ch12):** initial Trusted → first greeting decrease → reveal, BEFORE evaluation/positive dialogue. Continue to next adjacent nonterminal reveal if possible.',
 '- **North/Simon (ch16 → 19 → 23 onward):** initial Neutral → last Neutral / first Friend; count each small and log every large separately; do not use North’s scripted Lover as a band.',
 '- **Josh (ch16 → 19 → 23 onward):** logged +4 Neutral → RUSE small-up first Friend; reset local counter there → last Friend / first Companion.',
 '- **Luther (ch17 → 21 → 25 onward):** first Close → first Trusted (one-small observation to replicate); reset local count at first Trusted → first Family; note WARY if actually displayed.',
 '- **Jericho (ch16 → 19 → 23):** first Respected → accept John small → truck unknown large → RUSE small → READY small / first Leader. Compare no-truck branch; without measured intervening bands report constraints, not an exact truck value.',
 '- **Public opinion (ch01 onward, readout test filed ch26):** initial Skeptical, cop rescue, DPD/motel TV, Pirates radio, both tower news glyphs, protest; seek an exclusively-small Indifferent→Sympathetic interval. Large media arrows and missed broadcasts invalidate an absolute net-small threshold.',
 '- **Instability:** log glyphs encountered, but there is no additional open numeric item here; a machine/deviant caption supplies no numeric threshold.',''];
 let chapter,priority;
 for(const x of items){
  if(chapter!==x.chapter){chapter=x.chapter;priority=undefined;const group=items.filter(i=>i.chapter===chapter);out.push(`## ${String(chapter).padStart(2,'0')} · ${chapters[chapter]??'Chapter'} · ${group.reduce((n,i)=>n+i.minutes,0)} min`,'');}
  if(priority!==x.partial){priority=x.partial;out.push(`### ${priority?'Partial evidence · finish the missing control':'No partial evidence · do these first'}`,'');}
  out.push(`#### ☐ ${x.id} · ${x.checkpoint} · ${x.minutes} min${coreIds.has(x.id)?' · TONIGHT':''}`,'',`**Question:** ${x.question}`,'',`**Load/setup:** ${x.setup}`,'',`**Do / watch:** ${x.actions}`,'',`**Result:** ${x.result} — ____________________ (actual checkpoint / history / recording time: ____________________)`,'');
 }
 out.push('## Estimate limits and source notes','',`The ${total}-minute sum charges each item separately even when footage can be shared; it includes the stated local observations and local reloads, not missing-save reconstruction, full intervening chapters or prolonged unsuccessful searches. Core + 30-minute reserve is ${coreMinutes+30} minutes. Stop when the evening budget expires; a bounded negative or unavailable save is useful evidence, not permission to claim closure.`,'',
 'Operational constraints were checked against [gauge-calibration.md](../../research/video-leads/gauge-calibration.md) (each gauge’s Remaining section), the hypothesis/falsification header of `benchmark/scales.mjs`, and the operator journal README. Unknown unlocks are deliberately tested rather than assumed. The unnumbered Capitol Park timer follow-up is included with ch26-04, not counted as a 68th conflict. The after-first-STAND attack glyph replication is included with ch28-04; the settled ch28-02 is not reopened.','');
 if(priorityOrder){
  const replace=(start,text)=>{const at=out.findIndex(x=>x.startsWith(start));if(at>=0)out[at]=text};
  replace('Generated with', 'Generated with `bun run play:checklist --tonight --priority-file <path>`. Order comes from [sensitivity-analysis.md](../../research/video-leads/sensitivity-analysis.md); questions and closure status come from [CONFLICTS.md](../../research/CONFLICTS.md). Operational routes and estimates remain in `scripts/checklist/tonight-plans.mjs`.');
  replace('The complete backlog', `The complete backlog cannot fit one evening. **First priority block: ${core.length} items, ${coreMinutes} item-minutes**; reserve another 30 minutes for loading, notes and breaks. TONIGHT marks the first twelve ranked items, not a promise they fit one evening. Choose the highest-ranked item with a qualifying save; stop at your budget. No-effect findings concern these samples and tested variants only.`);
  replace('**Order and sharing.', '**Order and sharing.** Items follow sensitivity priority across chapters. Chapter headings can recur as priority moves between routes; their minutes are the total for that chapter, not additional charges. Complete each prerequisite history and its downstream captures before switching saves. The ch09 probe branch must run through ch12; changed ch10 theft histories must run through ch17. A shared capture can answer multiple questions without separate replays.');
  for(let i=0;i<out.length;i++)if(out[i].startsWith('### No partial evidence'))out[i]='### No partial evidence';
 }
 const md=out.join('\n');await writeFile(new URL('docs/Anthony/tasks/play-tonight.md',root),md);
 const proc=Bun.spawn(['bunx','marked'],{stdin:new TextEncoder().encode(md),stdout:'pipe',stderr:'inherit'});
 const body=await new Response(proc.stdout).text();if(await proc.exited!==0)throw Error('bunx marked failed');
 const chrome=await read('docs/Anthony/tasks/conflicts.html');const head=chrome.slice(0,chrome.indexOf('<h1>')).replace(/<title>.*?<\/title>/,'<title>Play tonight · operator checklist</title>');
 await writeFile(new URL('docs/Anthony/tasks/play-tonight.html',root),head+body+'\n</body></html>\n');
 if(priorityOrder){console.log(`Tonight: ${items.length} items in sensitivity priority; ${total} estimated item-minutes.`);return}
 const indexPath=new URL('docs/Anthony/tasks/index.html',root);let index=await readFile(indexPath,'utf8');
 const entry=`<li><a href="./play-tonight.html">Play tonight · replay checklist</a> · ${items.length} open checks in chapter/save order; ${total} estimated item-minutes total; evening core ${coreMinutes+30} minutes including reserve.</li>`;
 index=index.includes('href="./play-tonight.html"')?index.replace(/<li><a href="\.\/play-tonight\.html"[^\n]*<\/li>/,entry):index.replace('<ol>','<ol>\n'+entry);
 await writeFile(indexPath,index);console.log(`Tonight: ${items.length} items, ${fresh} no-partial, ${total} minutes; core ${coreMinutes+30} including reserve.`);
}
