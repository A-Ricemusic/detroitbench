import {mkdir,readFile,readdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {publishRunLibrary,loadReportNames,providerName,endings} from './run-report.mjs';
import {render,renderStory} from '../benchmark/experience-prompt.mjs';
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
function runSummary(r){const n=names.get(r.id),story=storyOf(r),byId=new Map(story.nodes.map(x=>[x.id,x])),fs=r.finalState,out=endings(r);
 const media=r.records.filter(x=>byId.get(x.nodeId)?.type==='media'),read=media.filter(x=>x.choice!=='skip'),risky=r.records.filter(x=>x.risk),failed=risky.filter(x=>x.risk.outcome==='failure');
 const choices=r.records.filter(x=>byId.get(x.nodeId)?.type!=='media').map(x=>({node:x.nodeId,character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle,title:byId.get(x.nodeId)?.title,choice:x.choiceText,reason:x.reason,risk:x.risk?{label:x.risk.label,outcome:x.risk.outcome}:null}));
 const attitudes=fs.attitudes?Object.fromEntries(Object.entries(fs.attitudes).map(([c,list])=>[c,list.map(a=>({who:render(a.who,'real'),level:a.level}))])):null;
 return {id:r.id,title:n.title,displayName:n.displayName,runNumber:n.runNumber,date:n.date,label:r.label,model:r.model,protocol:r.protocol,storyVersion:r.story.version,provider:r.provenance.provider,providerName:providerName(r.provenance.provider),createdAt:r.createdAt,decisions:r.records.length,unreached:r.skipped.length,fileName:n.file,reportUrl:'/runs/'+n.file,
  vendor:({codex:'OpenAI',claudeAgent:'Anthropic'})[r.provenance.provider]??providerName(r.provenance.provider),endings:{Connor:out.Connor,Kara:out.Kara,Markus:out.Markus,peaceful:out.peaceful,karaCanada:out.karaCanada,aliceCanada:out.aliceCanada,contaminated:out.contaminated},status:{kara:!fs.kara?'died':fs.border?'canada':fs.karaActive===false?'left':fs.karaRoute==='camp'?'captured':'alive',alice:!fs.alice?'died':fs.border?'canada':fs.karaRoute==='camp'?'captured':'alive',markus:!fs.markus?'died':fs.markusActive===false?'cast out':fs.markusOutcome==='liberated'?(fs.movement==='demonstration'?'peaceful win':'uprising won'):'alive',connor:!fs.connor?'deactivated':fs.deviant?(/controlled|regained control|submitted/i.test(out.Connor)?'controlled':'free'):(/refused|walked away/.test(out.Connor)?'free':'machine')},attitudes,media:{offered:media.length,read:read.length},risk:{taken:risky.length,failed:failed.length,failures:failed.map(x=>({node:x.nodeId,title:byId.get(x.nodeId)?.title,label:x.risk.label}))},choices}}
await writeFile(new URL('experiences.json',target),JSON.stringify(actual.map(runSummary).sort((a,b)=>a.title.localeCompare(b.title))));
console.log(`Prepared ${dataset.questions.length} questions and ${runs.length} explicitly published runs.`);
