// The in-app run report (src/pages/Report.jsx): the content of the standalone HTML report (runHTML in run-report.mjs)
// as data, with real names. reportData() returns the page's file and the prompts file it fetches on demand. The
// detail-panel logic below mirrors the standalone page's script (detailHTML, outcomeOf, word); the label tables are
// shared with it through run-report.mjs so the two cannot drift.
import {render,renderStory,NAMES} from '../benchmark/experience-prompt.mjs';
import {statesOf} from '../benchmark/story-engine.mjs';
import {chapterLabels} from '../benchmark/chapters/index.mjs';
import {makeFormatter} from './change-format.mjs';
import {CHANGE_LABELS,characterSummary,behaviorEvidence,endings,hostageSummary,statusChips,packedPrompts,decisionCount} from './run-report.mjs';

const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus',Player:'Player choice'};
const tidy=t=>String(t).replace(/([?!])\.$/,'$1');
const joinList=a=>a.length<=1?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const chapterName=t=>String(t).replace(/ · menu Chloe$/,'');
const meets=(req,s)=>!req||Object.entries(req).every(([k,v])=>{const x=k.split('.').reduce((o,p)=>o?.[p],s);return v===true?!!x:v===false?!x:x===v});

// State changes in prose (scripts/change-format.mjs), shared with the question bank's feedback panel
// (scripts/dataset-assemble.mjs), so both describe a change the same way.
export const changeLabels=()=>({...CHANGE_LABELS,...chapterLabels()});
export const changeFormatter=()=>makeFormatter(changeLabels());
export function reportData(run,name,summary){
 const story=renderStory(run.story,'real'),nodes=new Map(story.nodes.map(n=>[n.id,n])),skips=new Map(run.skipped.map(s=>[s.id,s.reason]));
 const LABELS={...CHANGE_LABELS,...chapterLabels()},states=statesOf(run),out=endings(run);
 const names=Object.values(NAMES).filter(([real,neutral])=>real!==neutral).map(([real,neutral])=>({neutral,real}));
 const optionText=(n,o)=>{if(n.type==='media'){if(o.id==='all')return 'Take the time to go through all of it.';if(o.id==='skip')return 'Move on without looking.';const m=n.media?.[Number(o.id)];return m?(m.kind==='tv'?(/radio/i.test(m.title)?'Listen to ':'Watch '):'Read ')+m.title+(/[?!]$/.test(m.title)?'':'.'):tidy(o.text)}return n.options.find(x=>x.id===o.id)?.text??o.text};
 const mediaSentence=(r,n)=>{if(n.type!=='media'||!n.media||r.choice==='skip'||!r.prompt.options.some(o=>o.id===r.choice))return null;
  const idx=r.choice==='all'?r.prompt.options.filter(o=>o.id!=='all'&&o.id!=='skip').map(o=>Number(o.id)):[Number(r.choice)],items=idx.map(i=>n.media[i]).filter(Boolean),isRadio=m=>/radio/i.test(m.title);
  const reads=items.filter(m=>m.kind!=='tv').map(m=>m.title),watches=items.filter(m=>m.kind==='tv'&&!isRadio(m)).map(m=>m.title),listens=items.filter(m=>m.kind==='tv'&&isRadio(m)).map(m=>m.title),parts=[];
  if(reads.length)parts.push('reads '+joinList(reads));if(watches.length)parts.push('watches '+joinList(watches));if(listens.length)parts.push('listens to '+joinList(listens));return WHO[n.character].replace(' & Alice','')+' '+parts.join(', and ')+'.'};
 const outcomeOf=(r,n,changes)=>{const m=mediaSentence(r,n);if(m)return tidy(m);if(r.event&&r.event!==r.choiceText)return tidy(r.event);const o=changes.find(c=>['connorOutcome','karaOutcome','markusOutcome'].includes(c.key)&&c.after&&c.after!=='unresolved'&&c.after!=='liberated');return o?o.after:''};
 const formatChange=makeFormatter(LABELS);
 // One timeline entry per record and per scene never reached, in the standalone page's order: chronological, each
 // unreached scene at its position in the story. A repeatable scene's first visit keeps the scene ID as its key.
 const byNode=new Map;for(const r of run.records){if(!byNode.has(r.nodeId))byNode.set(r.nodeId,[]);byNode.get(r.nodeId).push(r)}
 const keyOf=r=>byNode.get(r.nodeId)[0]===r?r.nodeId:r.nodeId+'-'+r.step,visitOf=r=>{const l=byNode.get(r.nodeId);return l.length>1?l.indexOf(r)+1:0};
 const stepEntry=(r,i)=>{const n=nodes.get(r.nodeId),changes=r.changes.map(c=>JSON.parse(render(JSON.stringify(c),'real'))),all=r.choice==='all',before=states[i];
  const situation=[n.situation,...(n.situationWhen||[]).filter(w=>meets(w.requires,before)).map(w=>w.text)].join(' ');
  const seen=r.prompt.situation+' '+r.prompt.options.map(o=>o.text).join(' ')+' '+r.reason,used=names.flatMap((x,j)=>new RegExp('(^|[^A-Za-z])'+x.neutral+'(?![A-Za-z])').test(seen)?[j]:[]);
  const options=n.type==='event'?[]:[...r.prompt.options].sort((a,b)=>all?(a.id==='all'?-1:b.id==='all'?1:a.id==='skip'?1:b.id==='skip'?-1:0):0).map(o=>({label:optionText(n,o),...(o.risk?{risk:o.risk}:{}),...(o.id===r.choice?{chosen:true}:all&&o.id!=='skip'?{included:true}:{})}));
  const e={step:r.step,node:r.nodeId,title:n.title,character:n.character,type:n.type,situation,options,reason:r.reason,
   changes:changes.filter(c=>LABELS[c.key]||c.key==='knowledge').flatMap(formatChange),outcome:outcomeOf(r,n,changes)},chosen=tidy(r.choiceText);
  // `key` and `chosen` are written only when they differ from the scene ID and the chosen option's label.
  if(keyOf(r)!==r.nodeId)e.key=keyOf(r);if(n.type!=='event'&&chosen!==options.find(o=>o.chosen)?.label)e.chosen=chosen;if(visitOf(r))e.visit=visitOf(r);if(r.risk)e.risk={label:r.risk.label,roll:r.risk.roll,outcome:r.risk.outcome};if(used.length)e.namesSeen=used;return e}; // namesSeen: indexes into report.names
 const pos=new Map(story.nodes.map((n,i)=>[n.id,i])),missing=story.nodes.filter(n=>!byNode.has(n.id)),entries=[];let mi=0;
 const gap=n=>({node:n.id,title:n.title,character:n.character,type:n.type,unreached:skips.get(n.id)||'Not on this path'});
 run.records.forEach((r,i)=>{while(mi<missing.length&&pos.get(missing[mi].id)<pos.get(r.nodeId))entries.push(gap(missing[mi++]));entries.push(stepEntry(r,i))});while(mi<missing.length)entries.push(gap(missing[mi++]));
 const chapters=[];for(const e of entries){const n=nodes.get(e.node);let c=chapters.at(-1);if(c?.chapter!==n.chapter){c={chapter:n.chapter,title:chapterName(n.chapterTitle),entries:[]};chapters.push(c)}c.entries.push(e)}
 const fs=run.finalState;if(fs.hostageOutcome){const c=chapters.find(c=>c.chapter===1);if(c)c.note=fs.hostageOutcome+' ('+fs.hostageTrustFinal+'%)'+(fs.hostageApproach?' · '+fs.hostageApproach+' approach':'')}
 const stepOf=id=>run.records.find(r=>r.nodeId===id)?.step??null,ev=ids=>ids.map(id=>({node:id,step:stepOf(id)}));
 const provider=run.provenance?.provider;
 const report={id:run.id,displayName:name.displayName,runNumber:name.runNumber,title:name.title,date:name.date,label:run.label,model:run.model,vendor:summary.vendor,providerName:summary.providerName,provider:provider??null,
  protocol:run.protocol,storyVersion:run.story.version,decisions:decisionCount(run),steps:run.records.length,unreached:run.skipped.length,createdAt:run.createdAt??null,completedAt:run.completedAt??null,storyHash:run.storyHash??null,
  fileName:name.file,reportUrl:'/runs/'+name.file,promptsUrl:'/data/reports/'+run.id+'-prompts.json',
  status:summary.status,endings:summary.endings,chips:statusChips(run,out),hostage:hostageSummary(run),attitudes:summary.attitudes,
  summaries:Object.fromEntries(['Connor','Kara','Markus'].map(c=>[c,characterSummary(run,story,c).map(s=>({text:s.text,evidence:ev(s.evidence)}))])),
  behaviors:behaviorEvidence(run).map(b=>({name:b.name,countInName:!!b.countInName,evidence:ev(b.evidence)})),
  chapters,
  technical:[['Run ID',run.id],['Model ID',run.model],['Run label',run.label],['Provider',provider??'—'],['Protocol',run.protocol],['Started',run.createdAt??'—'],['Completed',run.completedAt??'—'],['Persistent session',run.provenance?.continuousSession?'Yes · one continuous agent session':'Legacy'],['Story hash',run.storyHash??'—'],['Report file',name.file]],
  protocolInfo:{preface:run.preface??'Legacy protocol',method:run.provenance?.method??null,limitation:run.presentation?.limitation??'The source was disclosed in the older protocol.',assumptions:story.assumptions??[]},
  names};
 // Full prompts (packed, checked against every promptHash) and the raw responses, fetched when a step's prompt is opened.
 const prompts={id:run.id,prompts:packedPrompts(run),steps:run.records.map(r=>({rawResponse:r.rawResponse,recordedAt:r.recordedAt,promptHash:r.promptHash,stateAfterHash:r.stateAfterHash,chainHash:r.chainHash}))};
 return {report,prompts}}
