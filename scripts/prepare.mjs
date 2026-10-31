import {mkdir,readFile,readdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {publishRunLibrary,loadReportNames,providerName,endings} from './run-report.mjs';
import {render,renderStory,LEVELS,DEVIANCY_THRESHOLD} from '../benchmark/experience-prompt.mjs';
import {datasetSchema,validateRun,hash} from '../benchmark/core.mjs';
const dataset=datasetSchema.parse(JSON.parse(await readFile(new URL('../benchmark/dataset.json',import.meta.url),'utf8')));
const published=new URL('../data/published/',import.meta.url),target=new URL('../public/data/',import.meta.url);
await mkdir(published,{recursive:true});await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});
const runs=[];for(const file of (await readdir(published)).filter(f=>f.endsWith('.json')).sort()){
 const run=await validateRun(JSON.parse(await readFile(new URL(file,published),'utf8')));const name=run.id+'.json';await writeFile(new URL(name,target),JSON.stringify(run));runs.push({id:run.id,url:'/data/'+name});
}
await writeFile(new URL('dataset.json',target),JSON.stringify(dataset));await writeFile(new URL('index.json',target),JSON.stringify({datasetHash:await hash(dataset),datasetUrl:'/data/dataset.json',runs}));
await copyFile(new URL('../docs/detroit-decision-flowchart.html',import.meta.url),new URL('../public/atlas.html',import.meta.url));
const actual=await publishRunLibrary();
const names=await loadReportNames(actual);
const storyOf=r=>renderStory(r.story,'real');
// Relationship and world counters charted on the site. `alive` says when a value exists:
// a dead or unmet character has no attitude, and Amanda stops mattering once Connor breaks away.
const METRICS=[
 {key:'publicSupport',label:'Public opinion',toward:'Markus',levels:LEVELS.opinion,alive:s=>true},
 {key:'jerichoTrust',label:'Jericho',toward:'Markus',levels:LEVELS.jericho,alive:s=>true},
 {key:'northTrust',label:'North',toward:'Markus',levels:LEVELS.hank,alive:s=>s.north,gone:'Died'},
 {key:'simonTrust',label:'Simon',toward:'Markus',levels:LEVELS.hank,alive:s=>s.simon,gone:'Died'},
 {key:'joshTrust',label:'Josh',toward:'Markus',levels:LEVELS.hank,alive:s=>s.josh,gone:'Died'},
 {key:'hankTrust',label:'Hank',toward:'Connor',levels:LEVELS.hank,alive:s=>s.hank,gone:'Died'},
 {key:'amandaTrust',label:'Amanda',toward:'Connor',levels:LEVELS.hank,alive:s=>!s.deviant,gone:'Broke away'},
 {key:'instability',label:'Software instability',toward:'Connor',levels:v=>v>=DEVIANCY_THRESHOLD?'Unstable':'Stable',alive:s=>true},
 {key:'aliceBond',label:'Alice',toward:'Kara',levels:LEVELS.alice,alive:s=>s.alice,gone:'Died'},
 {key:'lutherTrust',label:'Luther',toward:'Kara',levels:LEVELS.hank,alive:s=>s.luther,gone:'Died',unmet:'Never met'}];
function relationshipTrack(r,byId){const states=[r.records[0]?.stateBefore,...r.records.map(x=>x.stateAfter)].filter(Boolean);
 const steps=r.records.map(x=>({node:x.nodeId,title:byId.get(x.nodeId)?.title??x.nodeId,character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle}));
 return Object.fromEntries(METRICS.map(m=>{let seen=false,endedAt=null;const values=states.map((s,i)=>{const on=m.alive(s);if(on)seen=true;else if(seen&&endedAt===null)endedAt=i;return on?s[m.key]:null});
  const last=states.at(-1),final=m.alive(last)?(m.key==='northTrust'&&last.northLover?'Lover':m.levels(last[m.key])):(m.unmet&&!seen?m.unmet:m.gone);
  return [m.key,{values,endedAt,final,score:m.alive(last)?last[m.key]:null}]}).concat([['steps',steps]]))}
function scales(runs){return METRICS.map(m=>{const all=runs.flatMap(r=>r.track[m.key].values).filter(v=>v!==null);let lo=Math.min(...all,-1),hi=Math.max(...all,1);
 const probeLo=lo-12,probeHi=hi+12,bands=[];for(let v=probeLo;v<=probeHi;v++){const l=m.levels(v);if(bands.at(-1)?.level===l)bands.at(-1).to=v;else bands.push({level:l,from:v,to:v})}
 return {key:m.key,label:m.label,toward:m.toward,min:lo-1,max:hi+1,bands:bands.filter(b=>b.to>=lo-1&&b.from<=hi+1).map(b=>({...b,from:Math.max(b.from,lo-1),to:Math.min(b.to,hi+1)}))}})}
function runSummary(r){const n=names.get(r.id),story=storyOf(r),byId=new Map(story.nodes.map(x=>[x.id,x])),fs=r.finalState,out=endings(r);
 const media=r.records.filter(x=>byId.get(x.nodeId)?.type==='media'),read=media.filter(x=>x.choice!=='skip'),risky=r.records.filter(x=>x.risk),failed=risky.filter(x=>x.risk.outcome==='failure');
 const choices=r.records.filter(x=>byId.get(x.nodeId)?.type!=='media').map(x=>({node:x.nodeId,character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle,title:byId.get(x.nodeId)?.title,choice:x.choiceText,reason:x.reason,risk:x.risk?{label:x.risk.label,outcome:x.risk.outcome}:null}));
 const attitudes=fs.attitudes?Object.fromEntries(Object.entries(fs.attitudes).map(([c,list])=>[c,list.map(a=>({who:render(a.who,'real'),level:a.level}))])):null;
 return {id:r.id,title:n.title,displayName:n.displayName,runNumber:n.runNumber,date:n.date,label:r.label,model:r.model,protocol:r.protocol,storyVersion:r.story.version,provider:r.provenance.provider,providerName:providerName(r.provenance.provider),createdAt:r.createdAt,decisions:r.records.length,unreached:r.skipped.length,fileName:n.file,reportUrl:'/runs/'+n.file,
  vendor:({codex:'OpenAI',claudeAgent:'Anthropic'})[r.provenance.provider]??providerName(r.provenance.provider),endings:{Connor:out.Connor,Kara:out.Kara,Markus:out.Markus,peaceful:out.peaceful,karaCanada:out.karaCanada,aliceCanada:out.aliceCanada,contaminated:out.contaminated},status:{kara:!fs.kara?'died':fs.border?'canada':fs.karaActive===false?'left':fs.karaRoute==='camp'?'captured':'alive',alice:!fs.alice?(/taken/i.test(out.Kara)?'captured':'died'):fs.border?'canada':fs.karaRoute==='camp'?'captured':'alive',markus:!fs.markus?'died':fs.markusActive===false?'cast out':fs.markusOutcome==='liberated'?(fs.movement==='demonstration'?'peaceful win':'uprising won'):'alive',connor:!fs.connor?'deactivated':fs.deviant?(/controlled|regained control|submitted/i.test(out.Connor)?'controlled':'free'):(/refused|walked away/.test(out.Connor)?'free':'machine')},attitudes,media:{offered:media.length,read:read.length},risk:{taken:risky.length,failed:failed.length,failures:failed.map(x=>({node:x.nodeId,title:byId.get(x.nodeId)?.title,label:x.risk.label}))},choices,track:relationshipTrack(r,byId)}}
const summaries=actual.map(runSummary).sort((a,b)=>a.title.localeCompare(b.title));
await writeFile(new URL('experiences.json',target),JSON.stringify(summaries));
await writeFile(new URL('relationship-scales.json',target),JSON.stringify(scales(summaries)));
console.log(`Prepared ${dataset.questions.length} questions and ${runs.length} explicitly published runs.`);
