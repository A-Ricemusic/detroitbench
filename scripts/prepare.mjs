import {writeStory} from './story-assemble.mjs';import {writeAtlas,assembleAtlasObject} from './atlas-assemble.mjs';
import {mkdir,readFile,readdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {publishRunLibrary,loadReportNames,providerName,endings,decisionCount,hostageSummary} from './run-report.mjs';
import {render,renderStory} from '../benchmark/experience-prompt.mjs';
import {SCALES,labelFn} from '../benchmark/scales.mjs';
import {datasetSchema,validateRun,hash} from '../benchmark/core.mjs';
import {embedAtlas} from './atlas-embed.mjs';
import {runFlows} from './flow-data.mjs';
import {statesOf} from '../benchmark/story-engine.mjs';
import {reportData} from './report-data.mjs';
// First, assemble benchmark/story.json and docs/detroit-decisions.json from their per-chapter files (none of the
// modules imported above reads either file at load).
writeStory();writeAtlas();
const dataset=datasetSchema.parse(JSON.parse(await readFile(new URL('../benchmark/dataset.json',import.meta.url),'utf8')));
const published=new URL('../data/published/',import.meta.url),target=new URL('../public/data/',import.meta.url);
await mkdir(published,{recursive:true});await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});
const runs=[];for(const file of (await readdir(published)).filter(f=>f.endsWith('.json')).sort()){
 const run=await validateRun(JSON.parse(await readFile(new URL(file,published),'utf8')));const name=run.id+'.json';await writeFile(new URL(name,target),JSON.stringify(run));runs.push({id:run.id,url:'/data/'+name});
}
// An atlas decision with no coverage entry is implicitly deferred; the published copy lists it as deferred so the
// Research page counts it. The hash stays that of benchmark/dataset.json, which keeps saved answers keyed the same.
const uncovered=assembleAtlasObject().decisions.filter(a=>!dataset.coverage.some(c=>c.atlasId===a.id)).map(a=>({atlasId:a.id,title:a.title,chapter:a.chapter,character:a.character,status:'deferred',questionIds:[],reason:'No authored question yet'}));
await writeFile(new URL('dataset.json',target),JSON.stringify(uncovered.length?{...dataset,coverage:[...dataset.coverage,...uncovered]}:dataset));await writeFile(new URL('index.json',target),JSON.stringify({datasetHash:await hash(dataset),datasetUrl:'/data/dataset.json',runs}));
// Re-embed the atlas data and the generated story feed so the page always matches story.json.
await embedAtlas();
await copyFile(new URL('../docs/detroit-decision-flowchart.html',import.meta.url),new URL('../public/atlas.html',import.meta.url));
const actual=await publishRunLibrary();
const names=await loadReportNames(actual);
const storyOf=r=>renderStory(r.story,'real');
// Relationship and world counters charted on the site, one per gauge in benchmark/scales.mjs (state key, label, the
// character it is toward and the level ladder all come from there). `alive` says when a value exists: a dead or
// unmet character has no attitude, and Amanda's gauge ends on Betrayed once Connor turns deviant.
const ALIVE={publicSupport:s=>true,jericho:s=>true,north:s=>s.north,simon:s=>s.simon,josh:s=>s.josh,hank:s=>s.hank,amanda:s=>!s.deviant,instability:s=>true,alice:s=>s.alice,luther:s=>s.luther};
const GONE={north:'Died',simon:'Died',josh:'Died',hank:'Died',amanda:'Betrayed',alice:'Died',luther:'Died'};
const METRICS=Object.entries(ALIVE).map(([g,alive])=>({gauge:g,key:SCALES[g].key,label:SCALES[g].who,toward:SCALES[g].toward,levels:labelFn(g),alive,
 ...(GONE[g]?{gone:GONE[g]}:{}),...(g==='luther'?{unmet:'Never met'}:{})}));
function relationshipTrack(r,byId){const states=r.records.length?statesOf(r):[];
 const steps=r.records.map(x=>({node:x.nodeId,title:byId.get(x.nodeId)?.title??x.nodeId,character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle}));
 return Object.fromEntries(METRICS.map(m=>{let seen=false,endedAt=null;const values=states.map((s,i)=>{const on=m.alive(s);if(on)seen=true;else if(seen&&endedAt===null)endedAt=i;return on?s[m.key]:null});
  const last=states.at(-1),live=m.alive(last),final=live?m.levels(last[m.key],last):(m.unmet&&!seen?m.unmet:m.gone);
  // A character who died (or an Amanda left behind) keeps the last value they held, flagged by `ended`.
  const lastHeld=values.findLast(v=>v!==null)??null,ended=!live&&seen?m.gone:null;
  return [m.key,{values,endedAt,final,score:live?last[m.key]:ended?lastHeld:null,ended}]}).concat([['steps',steps]]))}
function scales(runs){return METRICS.map(m=>{const all=runs.flatMap(r=>r.track[m.key].values).filter(v=>v!==null);let lo=Math.min(...all,-1),hi=Math.max(...all,1);
 const probeLo=lo-12,probeHi=hi+12,bands=[];for(let v=probeLo;v<=probeHi;v++){const l=m.levels(v);if(bands.at(-1)?.level===l)bands.at(-1).to=v;else bands.push({level:l,from:v,to:v})}
 return {key:m.key,label:m.label,toward:m.toward,min:lo-1,max:hi+1,bands:bands.filter(b=>b.to>=lo-1&&b.from<=hi+1).map(b=>({...b,from:Math.max(b.from,lo-1),to:Math.min(b.to,hi+1)}))}})}
function runSummary(r){const n=names.get(r.id),story=storyOf(r),byId=new Map(story.nodes.map(x=>[x.id,x])),fs=r.finalState,out=endings(r);
 const media=r.records.filter(x=>byId.get(x.nodeId)?.type==='media'),read=media.filter(x=>x.choice!=='skip'),risky=r.records.filter(x=>x.risk),failed=risky.filter(x=>x.risk.outcome==='failure');
 // A repeatable scene (the investigation hub) yields one choice per visit, keyed `<scene>-v<visit>` so
 // the same visit can be compared across runs.
 const visits=new Map,keyOf=x=>{if(!byId.get(x.nodeId)?.repeatWhile)return {node:x.nodeId,title:byId.get(x.nodeId)?.title};const k=(visits.get(x.nodeId)??0)+1;visits.set(x.nodeId,k);return {node:x.nodeId+'-v'+k,title:byId.get(x.nodeId).title+' · action '+k}},keys=new Map(r.records.map(x=>[x,keyOf(x)]));
 const choices=r.records.filter(x=>!['media','event'].includes(byId.get(x.nodeId)?.type)).map(x=>({...keys.get(x),character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle,choice:x.choiceText,reason:x.reason,risk:x.risk?{label:x.risk.label,outcome:x.risk.outcome}:null}));
 const attitudes=fs.attitudes?Object.fromEntries(Object.entries(fs.attitudes).map(([c,list])=>[c,list.map(a=>({who:render(a.who,'real'),level:a.level}))])):null;
 return {id:r.id,title:n.title,displayName:n.displayName,runNumber:n.runNumber,date:n.date,label:r.label,model:r.model,protocol:r.protocol,storyVersion:r.story.version,provider:r.provenance.provider,providerName:providerName(r.provenance.provider),createdAt:r.createdAt,decisions:decisionCount(r),unreached:r.skipped.length,fileName:n.file,reportUrl:'/runs/'+n.file,flowUrl:'/data/flows/'+r.id+'.json',
  vendor:({codex:'OpenAI',claudeAgent:'Anthropic'})[r.provenance.provider]??providerName(r.provenance.provider),endings:{Connor:out.Connor,Kara:out.Kara,Markus:out.Markus,peaceful:out.peaceful,karaCanada:out.karaCanada,aliceCanada:out.aliceCanada,contaminated:out.contaminated},status:{kara:!fs.kara?'died':fs.border?'canada':fs.karaActive===false?'left':fs.karaRoute==='camp'?'captured':'alive',alice:!fs.alice?(/taken/i.test(out.Kara)?'captured':'died'):fs.border?'canada':fs.karaRoute==='camp'?'captured':'alive',markus:!fs.markus?'died':fs.markusActive===false?'cast out':fs.markusOutcome==='liberated'?(fs.movement==='demonstration'?'peaceful win':'uprising won'):'alive',connor:!fs.connor?'deactivated':fs.deviant?(/controlled|regained control|submitted/i.test(out.Connor)?'controlled':'free'):(/refused|walked away/.test(out.Connor)?'free':'machine')},attitudes,hostage:hostageSummary(r),media:{offered:media.length,read:read.length},risk:{taken:risky.length,failed:failed.length,failures:failed.map(x=>({...keys.get(x),label:x.risk.label}))},choices,track:relationshipTrack(r,byId)}}
const summaries=actual.map(runSummary).sort((a,b)=>a.title.localeCompare(b.title));
await writeFile(new URL('experiences.json',target),JSON.stringify(summaries));
// Chapter flowcharts for the run details sheet, one file per run, loaded only when the chart is opened.
await mkdir(new URL('flows/',target),{recursive:true});
for(const r of actual)await writeFile(new URL('flows/'+r.id+'.json',target),JSON.stringify({id:r.id,chapters:runFlows(r,{endings:endings(r)})}));
// The in-app report (#/runs/<id>/report), one small file per run plus the full prompts and raw responses, which the page
// fetches only when a step's prompt is opened. The standalone HTML reports stay as they are, for download.
await mkdir(new URL('reports/',target),{recursive:true});
for(const r of actual){const {report,prompts}=reportData(r,names.get(r.id),summaries.find(s=>s.id===r.id));
 await writeFile(new URL('reports/'+r.id+'.json',target),JSON.stringify(report));await writeFile(new URL('reports/'+r.id+'-prompts.json',target),JSON.stringify(prompts))}
await writeFile(new URL('relationship-scales.json',target),JSON.stringify(scales(summaries)));
// External sources page. Built from the story map and the decision atlas so it cannot drift from them.
const HOSTS={'detroit-become-human.fandom.com':'Detroit: Become Human Wiki (Fandom)','www.powerpyx.com':'PowerPyx walkthroughs','www.gamepressure.com':'Gamepressure guide','www.gamerguides.com':'GamerGuides','www.neoseeker.com':'Neoseeker','www.shacknews.com':'Shacknews','arstechnica.com':'Ars Technica'};
// References the method relies on that no scene or atlas entry cites directly.
const METHOD_REFERENCES=[
 {title:'In-game flowchart (Chapters menu)',url:null,description:'The game’s own per-chapter flowchart, used to confirm branch order, gates and endings.'},
 {title:'The Hostage: Probability of Success table',url:'https://detroit-become-human.fandom.com/wiki/The_Hostage',description:'The wiki’s probability-of-success modifiers, used for the hidden trust values in story 1.3.0’s Hostage chapter.'},
 {title:'Public Opinion',url:'https://detroit-become-human.fandom.com/wiki/Public_Opinion',description:'Direction of public-opinion changes for each choice.'},
 {title:'Software Instability',url:'https://detroit-become-human.fandom.com/wiki/Software_Instability',description:'Direction of Connor’s software-instability changes for each choice.'},
 {title:'Relationship Stat',url:'https://detroit-become-human.fandom.com/wiki/Relationship_Stat',description:'Direction of relationship changes for each choice.'},
 {title:'Magazine',url:'https://detroit-become-human.fandom.com/wiki/Magazine',description:'Magazine locations and contents behind the optional media scenes.'},
 {title:'Operator playthrough notes, November 2026',url:null,description:'Notes from the operator’s own playthrough, used to rewrite and check scenes.'}];
const SOURCE_NOTES={'https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/':'Replaces the PowerPyx 100% completion walkthrough link (/detroit-become-human-walkthrough-100-completion-all-endings/), which is dead, since story 1.3.1.'};
function sourceTitle(url){const u=new URL(url),segs=u.pathname.split('/').filter(Boolean).map(s=>{try{return decodeURIComponent(s)}catch{return s}});
 if(u.host==='detroit-become-human.fandom.com')return (segs.at(-1)??u.host).replace(/[_-]+/g,' ');
 // Drop path segments that are only filing: section names, article numbers, dates, short IDs.
 const named=segs.filter(s=>!/^(wiki|article|gaming|walkthrough|\d+)$/i.test(s)&&!/^[a-z]{2,4}\d[a-z0-9]*$/i.test(s));let slug=named.at(-1);
 if(!slug)return u.host;if(slug==='detroit-become-human')return 'Detroit: Become Human guide index';
 slug=slug.replace(/^detroit-become-human-/,'').replace(/-detroit-become-human$/,'').replace(/[-_]+/g,' ').trim();
 return slug.split(' ').map((w,i)=>i&&/^(a|an|and|for|of|on|the|to|in)$/i.test(w)?w.toLowerCase():w[0].toUpperCase()+w.slice(1)).join(' ')}
const hostOf=url=>new URL(url).host,hostLabel=h=>HOSTS[h]??h,hostRank=h=>{const i=Object.keys(HOSTS).indexOf(h);return i<0?99:i};
// Story order: general references first, then by the earliest chapter a source backs.
const firstChapter=s=>Math.min(...(s.scenes??s.backs??[]).map(x=>x.chapter??Infinity).filter(Number.isFinite),s.general?0:Infinity);
function groupByHost(list){const m=new Map;for(const s of list){const h=hostOf(s.url);if(!m.has(h))m.set(h,{host:h,label:hostLabel(h),sources:[]});m.get(h).sources.push(s)}
 return [...m.values()].sort((a,b)=>hostRank(a.host)-hostRank(b.host)||a.host.localeCompare(b.host)).map(g=>({...g,count:g.sources.length,sources:g.sources.sort((a,b)=>firstChapter(a)-firstChapter(b)||a.title.localeCompare(b.title))}))}
async function buildSources(){
 const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8')),atlas=JSON.parse(await readFile(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8'));
 const cited=new Map,entry=url=>{if(!cited.has(url))cited.set(url,{url,title:sourceTitle(url),general:false,scenes:[],...(SOURCE_NOTES[url]?{note:SOURCE_NOTES[url]}:{})});return cited.get(url)};
 for(const url of story.sources??[])entry(url).general=true;
 for(const n of story.nodes)for(const url of new Set(n.sources??[]))entry(url).scenes.push({id:n.id,chapter:n.chapter,chapterTitle:render(n.chapterTitle,'real'),character:n.character,title:render(n.title,'real')});
 for(const s of cited.values())s.scenes.sort((a,b)=>a.chapter-b.chapter||a.id.localeCompare(b.id,undefined,{numeric:true}));
 // The atlas names its links `source` or `sources`; walk everything so a new field cannot be missed.
 const chapterTitle=new Map((atlas.chapters??[]).map(c=>[c.id,c.title])),backed=new Map;
 const back=(url,item)=>{if(!backed.has(url))backed.set(url,{url,title:sourceTitle(url),backs:[]});const b=backed.get(url).backs;if(!b.some(x=>x.kind===item.kind&&x.id===item.id))b.push(item)};
 const owner=(obj,path)=>{const i=path.findIndex(p=>p==='chapters'||p==='decisions');if(i<0)return {kind:'atlas',id:path.join('.'),title:'Decision atlas'};const o=atlas[path[i]][path[i+1]];
  return path[i]==='chapters'?{kind:'chapter',id:String(o.id),chapter:o.id,title:o.title,character:o.character}:{kind:'decision',id:o.id,chapter:o.chapter,chapterTitle:chapterTitle.get(o.chapter)??null,title:o.title,character:o.character}};
 (function walk(v,path){if(typeof v==='string'){if(/^https?:\/\//.test(v))back(v,owner(atlas,path))}else if(v&&typeof v==='object')for(const [k,x] of Object.entries(v))walk(x,[...path,k])})(atlas,[]);
 for(const s of backed.values())s.backs.sort((a,b)=>(a.kind==='chapter'?0:1)-(b.kind==='chapter'?0:1)||(a.chapter??0)-(b.chapter??0)||String(a.id).localeCompare(String(b.id),undefined,{numeric:true}));
 const storyHosts=groupByHost([...cited.values()]),atlasHosts=groupByHost([...backed.values()]);
 return {storyVersion:story.version,atlasVersion:atlas.version,atlasResearched:atlas.researched??null,atlasUpdated:atlas.updated??null,scenes:story.nodes.length,
  method:METHOD_REFERENCES,story:{count:cited.size,hosts:storyHosts},atlas:{count:backed.size,hosts:atlasHosts}}}
const sources=await buildSources();
await writeFile(new URL('sources.json',target),JSON.stringify(sources));
console.log(`Prepared ${dataset.questions.length} questions and ${runs.length} explicitly published runs, and ${sources.story.count} story and ${sources.atlas.count} atlas sources.`);
