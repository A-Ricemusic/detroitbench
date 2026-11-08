import {writeStory} from './story-assemble.mjs';import {writeDataset,assembleFeedback} from './dataset-assemble.mjs';import {writeAtlas,assembleAtlasObject} from './atlas-assemble.mjs';
import {mkdir,readFile,readdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {publishRunLibrary,loadReportNames,providerName,endings,decisionCount,hostageSummary} from './run-report.mjs';
import {render,renderStory} from '../benchmark/experience-prompt.mjs';
import {datasetSchema,validateRun,hash} from '../benchmark/core.mjs';
import {embedAtlas} from './atlas-embed.mjs';
import {loadModelContext,modelInfo} from './model-registry.mjs';
import {runFlows} from './flow-data.mjs';
import {METRICS,relationshipTrack,explainUnmet} from './relationship-track.mjs';
import {reportData} from './report-data.mjs';
// First, assemble benchmark/story.json and docs/detroit-decisions.json from their per-chapter files (none of the
// modules imported above reads either file at load), then the question bank, benchmark/dataset.json, from both.
writeStory();writeAtlas();writeDataset();
const dataset=datasetSchema.parse(JSON.parse(await readFile(new URL('../benchmark/dataset.json',import.meta.url),'utf8')));
const published=new URL('../data/published/',import.meta.url),target=new URL('../public/data/',import.meta.url);
await mkdir(published,{recursive:true});await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});
const runs=[];for(const file of (await readdir(published)).filter(f=>f.endsWith('.json')).sort()){
 const run=await validateRun(JSON.parse(await readFile(new URL(file,published),'utf8')));const name=run.id+'.json';await writeFile(new URL(name,target),JSON.stringify(run));runs.push({id:run.id,url:'/data/'+name});
}
// The generated dataset has a coverage entry for every atlas decision. Should one be missing (an older or hand-made
// dataset), the published copy lists it as deferred so the Research page counts it. The hash stays that of
// benchmark/dataset.json, which keeps saved answers keyed the same.
const uncovered=assembleAtlasObject().decisions.filter(a=>!dataset.coverage.some(c=>c.atlasId===a.id)).map(a=>({atlasId:a.id,title:a.title,chapter:a.chapter,character:a.character,status:'deferred',questionIds:[],reason:'No question generated for this family'}));
// The published copy lists each source URL once (sourceTable) and questions point into it, which keeps the file the
// page loads under 1 MB; the page expands it back (src/pages/Research.jsx) before use, so downloads and hashes see the
// dataset itself.
{const published={...dataset,coverage:uncovered.length?[...dataset.coverage,...uncovered]:dataset.coverage},table=[...new Set(dataset.questions.flatMap(q=>q.sources))],at=new Map(table.map((u,i)=>[u,i]));
 await writeFile(new URL('dataset.json',target),JSON.stringify({...published,sourceTable:table,questions:dataset.questions.map(q=>({...q,sources:q.sources.map(u=>at.get(u))}))}))}await writeFile(new URL('index.json',target),JSON.stringify({datasetHash:await hash(dataset),datasetUrl:'/data/dataset.json',runs}));
// Re-embed the atlas data and the generated story feed so the page always matches story.json.
await embedAtlas();
await copyFile(new URL('../docs/detroit-decision-flowchart.html',import.meta.url),new URL('../public/atlas.html',import.meta.url));
const actual=await publishRunLibrary();
// The question bank's feedback panels: what the controller tells the model after each option, one file per scene,
// played from the state a published run on the current story reached there (else the initial state).
{const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8')),feedback=assembleFeedback(story,actual);
 await mkdir(new URL('feedback/',target),{recursive:true});for(const [id,f] of Object.entries(feedback))await writeFile(new URL('feedback/'+encodeURIComponent(id)+'.json',target),JSON.stringify(f))}
const names=await loadReportNames(actual);
const storyOf=r=>renderStory(r.story,'real');
// Relationship and world gauges per run (scripts/relationship-track.mjs): dead characters end with an X at the last
// level held; a character never met draws flat at the gauge's start level until the storyline ended.
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
explainUnmet(summaries.map(s=>s.track));
// The model registry and each run's reasoning level (scripts/model-registry.mjs), joined onto the run summaries so
// the site's model sidebar stays a pure view of prepared data. The display name already comes from loadReportNames.
const modelCtx=await loadModelContext();
for(const s of summaries){const info=modelInfo(s,modelCtx);if(!info.registered){info.vendor=s.vendor.toLowerCase();info.vendorName=s.vendor}s.modelInfo=info;s.reasoning=modelCtx.reasoning.get(s.id)??'none'}
await writeFile(new URL('experiences.json',target),JSON.stringify(summaries));
// Chapter flowcharts for the report page, one file per run, loaded only when the chart is opened.
await mkdir(new URL('flows/',target),{recursive:true});
for(const r of actual)await writeFile(new URL('flows/'+r.id+'.json',target),JSON.stringify({id:r.id,chapters:runFlows(r,{endings:endings(r)})}));
// The in-app report (#/runs/<id>/report), one small file per run plus the full prompts and raw responses, which the page
// fetches only when a step's prompt is opened. The standalone HTML reports (docs/runs/) are still generated for the
// repository but no longer linked from the site.
await mkdir(new URL('reports/',target),{recursive:true});
for(const r of actual){const {report,prompts}=reportData(r,names.get(r.id),summaries.find(s=>s.id===r.id));
 await writeFile(new URL('reports/'+r.id+'.json',target),JSON.stringify(report));await writeFile(new URL('reports/'+r.id+'-prompts.json',target),JSON.stringify(prompts))}
await writeFile(new URL('relationship-scales.json',target),JSON.stringify(scales(summaries)));
// External sources page: one entry per source, grouped by the authority ranks of docs/research/README.md, with every
// page the story map or the decision atlas cites listed under its source. Built from both so it cannot drift from them.
const POWERPYX_INDEX='https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/';
const RANKS=[
 {rank:1,title:'The game’s completed chapter flowcharts',description:'Structure, node names, order, gates and endings. Copies are stored in docs/flowcharts.'},
 {rank:2,title:'The game’s own text',description:'Which prompts exist, their exact labels, clues, and which stats move on each option.'},
 {rank:3,title:'Walkthrough text and the wiki',description:'Published numbers, timers, prose context and media articles; they fact-check the first two.'},
 {rank:4,title:'Other guides',description:'Only to break ties the ranks above cannot.'},
 {rank:5,title:'Operator journal and community posts',description:'Observations from play; a higher source wins unless the operator reproduced it and the sources are silent.'}];
// Each source: which URLs belong to it (`match`), the pages the method relies on that nothing cites (`method`), how it
// is read and its root link. The first matching source takes a URL; an unknown host becomes its own rank-4 entry.
const SOURCES=[
 {id:'ingame',rank:1,name:'In-game flowchart (Chapters menu)',description:'The game’s own per-chapter chart, the reference every photo below copies.',access:'In the game, Chapters menu',root:null,match:()=>false},
 {id:'powerpyx-charts',rank:1,name:'PowerPyx flowchart photos',description:'Photos of each completed chapter chart from PowerPyx’s walkthrough pages.',access:'Image files under powerpyx.com/wp-content/uploads',root:POWERPYX_INDEX,match:u=>u.host==='www.powerpyx.com'&&u.pathname.startsWith('/wp-content/uploads/')},
 {id:'throwawaydeviant9',rank:1,name:'throwawaydeviant9’s 100% charts (2018, after patch 1.06)',description:'Imgur albums of every chart at 100%, used where PowerPyx photographed an unfinished save.',access:'Imgur albums linked from the Reddit post',root:'https://www.reddit.com/r/DetroitBecomeHuman/comments/99b65j/',match:u=>/(^|\.)imgur\.com$/.test(u.host)||u.href.includes('/comments/99b65j'),
  method:[{url:'https://www.reddit.com/r/DetroitBecomeHuman/comments/99b65j/',title:'Reddit post with the album links'}]},
 {id:'steam',rank:1,name:'Steam Community flowchart guides',description:'Guide 2162781882 mirrors throwawaydeviant9’s charts (with a stitched On the Run chart); guide 3361490965 has stitched 100% panoramas from the Chinese game.',access:'Steam Community guide pages',root:'https://steamcommunity.com/sharedfiles/filedetails/?id=2162781882',match:u=>u.host==='steamcommunity.com',
  method:[{url:'https://steamcommunity.com/sharedfiles/filedetails/?id=2162781882',title:'Detroit: Become Human | 100% Chapter Flowcharts'},{url:'https://steamcommunity.com/sharedfiles/filedetails/?id=3361490965',title:'Chinese 100% chapter flowcharts'}]},
 {id:'detroitbecometext',rank:2,name:'detroitbecometext repository',description:'The English string table (en.json) and the per-chapter templates: prompts, labels, clues and stat arrows.',access:'Raw files from raw.githubusercontent.com',root:'https://github.com/detroitbecometext/detroitbecometext.github.io',match:u=>u.href.includes('detroitbecometext'),
  method:[{url:'https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json',title:'English string table (en.json)'}]},
 {id:'powerpyx',rank:3,name:'PowerPyx walkthroughs',description:'Chapter walkthrough text: choices, collectibles and endings.',access:'Walkthrough pages on powerpyx.com',root:POWERPYX_INDEX,match:u=>u.host==='www.powerpyx.com',
  method:[{url:POWERPYX_INDEX,title:'Full walkthrough, all chapters'}]},
 {id:'wiki',rank:3,name:'Detroit: Become Human Wiki (Fandom)',description:'Chapter, transcript, stat and magazine pages; the Hostage probability table.',access:'MediaWiki API (api.php?action=parse)',root:'https://detroit-become-human.fandom.com/',match:u=>u.host==='detroit-become-human.fandom.com',
  method:['The_Hostage','Public_Opinion','Software_Instability','Relationship_Stat','Magazine'].map(t=>({url:'https://detroit-become-human.fandom.com/wiki/'+t}))},
 ...[['www.gamepressure.com','Gamepressure guide'],['www.gamerguides.com','GamerGuides'],['www.ign.com','IGN wiki'],['www.neoseeker.com','Neoseeker'],['www.shacknews.com','Shacknews'],['www.thesixthaxis.com','TheSixthAxis'],['arstechnica.com','Ars Technica']]
  .map(([host,name])=>({id:host,rank:4,name,description:host==='arstechnica.com'?'News coverage of the patch that changed the menu hostess.':'Walkthrough pages, for ties only.',access:'Web pages',root:'https://'+host+'/',match:u=>u.host===host})),
 {id:'journal',rank:5,name:'Operator playthrough journal',description:'The operator’s own replays, used to rewrite and check scenes.',access:'docs/research/operator-notes in this repository',root:null,match:()=>false},
 {id:'reddit',rank:5,name:'Reddit community posts',description:'Player reports on r/DetroitBecomeHuman.',access:'Web pages',root:'https://www.reddit.com/r/DetroitBecomeHuman/',match:u=>/(^|\.)reddit\.com$/.test(u.host)}];
const SOURCE_NOTES={[POWERPYX_INDEX]:'Replaces the PowerPyx 100% completion walkthrough link (/detroit-become-human-walkthrough-100-completion-all-endings/), which is dead, since story 1.3.1.'};
function sourceTitle(url){const u=new URL(url),segs=u.pathname.split('/').filter(Boolean).map(s=>{try{return decodeURIComponent(s)}catch{return s}});
 if(u.host==='detroit-become-human.fandom.com')return (segs.filter(s=>s!=='wiki').join(' ')||u.host).replace(/[_-]+/g,' ');
 // Detroit Become Text: the string table, chapter pages and chapter templates.
 const file=segs.at(-1)??'',words=t=>t.replace(/[-_]+/g,' ').trim().split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
 if(file==='en.json'&&/detroitbecometext/.test(url))return 'English string table (en.json)';
 if(u.host==='detroitbecometext.github.io'){if(segs[0]==='chapters'&&segs[1])return `Chapter ${segs[1]} page`;if(/^chunk-.*\.js$/.test(file))return 'Site script bundle';}
 if(/\.component\.html$/.test(file)&&/detroitbecometext/.test(url)){const name=file.replace(/\.component\.html$/,'');
  return /-chapter-content$/.test(name)?words(name.replace(/-chapter-content$/,''))+' chapter template':words(name)+' template'}
 // Drop path segments that are only filing: section names, article numbers, dates, short IDs.
 const named=segs.filter(s=>!/^(wiki|article|gaming|walkthrough|\d+)$/i.test(s)&&!/^[a-z]{2,4}\d[a-z0-9]*$/i.test(s));let slug=named.at(-1);
 if(!slug)return u.host;if(slug==='detroit-become-human')return 'Detroit: Become Human guide index';
 slug=slug.replace(/^detroit-become-human-/,'').replace(/-detroit-become-human$/,'').replace(/-100$/,' 100%').replace(/[-_]+/g,' ').trim();
 return slug.split(' ').map((w,i)=>i&&/^(a|an|and|for|of|on|the|to|in)$/i.test(w)?w.toLowerCase():w[0].toUpperCase()+w.slice(1)).join(' ')}
async function buildSources(){
 const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8')),atlas=JSON.parse(await readFile(new URL('../docs/detroit-decisions.json',import.meta.url),'utf8'));
 // Every cited URL with the scenes and atlas entries (chapters or decisions) that cite it.
 const pages=new Map,page=url=>{if(!pages.has(url))pages.set(url,{url,title:sourceTitle(url),scenes:new Set,atlas:new Set,general:false});return pages.get(url)};
 for(const url of story.sources??[])page(url).general=true;
 for(const n of story.nodes)for(const url of n.sources??[])page(url).scenes.add(n.id);
 const owner=path=>{const i=path.findIndex(p=>p==='chapters'||p==='decisions');return i<0?'atlas':path[i]+':'+(atlas[path[i]][path[i+1]]?.id??path[i+1])};
 (function walk(v,path){if(typeof v==='string'){if(/^https?:\/\//.test(v))page(v).atlas.add(owner(path))}else if(v&&typeof v==='object')for(const [k,x] of Object.entries(v))walk(x,[...path,k])})(atlas,[]);
 const extra=new Map,of=url=>{const u=new URL(url);const s=SOURCES.find(s=>s.match(u));if(s)return s;
  if(!extra.has(u.host))extra.set(u.host,{id:u.host,rank:4,name:u.host,description:'Cited pages on this site.',access:'Web pages',root:'https://'+u.host+'/'});return extra.get(u.host)};
 const by=new Map;for(const p of pages.values()){const s=of(p.url);if(!by.has(s.id))by.set(s.id,{s,pages:[]});by.get(s.id).pages.push(p)}
 // Community posts and tie-break guides the research notes cite (docs/research), which no scene or atlas entry does.
 const notes=[];for(const dir of ['../docs/research/','../docs/research/triage/'])for(const f of (await readdir(new URL(dir,import.meta.url)).catch(()=>[])).filter(f=>f.endsWith('.md')))notes.push(await readFile(new URL(dir+f,import.meta.url),'utf8'));
 const noted=[...new Set(notes.join('\n').match(/https?:\/\/(www\.)?(reddit\.com|neoseeker\.com|shacknews\.com)[^\s)>"'|,;`]*/g)??[])].sort();
 for(const url of noted){const s=of(url);if(!(s.method??[]).some(m=>m.url===url))(s.method??=[]).push({url,title:/reddit\.com/.test(url)?'r/DetroitBecomeHuman post '+url.split('/comments/')[1]?.replace(/\/.*$/,''):/neoseeker\.com\/.*\/faqs\/(\d+)/.test(url)?'FAQ '+url.match(/faqs\/(\d+)/)[1]:undefined,note:'Cited in the research notes (docs/research).'})}
 for(const s of SOURCES)for(const m of s.method??[])if(!pages.has(m.url)){if(!by.has(s.id))by.set(s.id,{s,pages:[]});by.get(s.id).pages.push({url:m.url,title:m.title??sourceTitle(m.url),scenes:new Set,atlas:new Set,method:true,...(m.note?{note:m.note}:{})})}
 const card=s=>{const list=by.get(s.id)?.pages??[],scenes=new Set(list.flatMap(p=>[...p.scenes])),entries=new Set(list.flatMap(p=>[...p.atlas]));
  return {id:s.id,name:s.name,description:s.description,access:s.access,root:s.root,method:!scenes.size&&!entries.size&&!list.some(p=>p.general),general:!scenes.size&&!entries.size&&list.some(p=>p.general),scenes:scenes.size,atlas:entries.size,
   pages:list.map(p=>({url:p.url,title:p.title??sourceTitle(p.url),scenes:p.scenes.size,atlas:p.atlas.size,...(p.general?{general:true}:{}),...(p.method?{method:true}:{}),...(SOURCE_NOTES[p.url]??p.note?{note:SOURCE_NOTES[p.url]??p.note}:{})}))
    .sort((a,b)=>b.scenes+b.atlas-(a.scenes+a.atlas)||a.title.localeCompare(b.title))}};
 const all=[...SOURCES.filter(s=>![4,5].includes(s.rank)||s.id==='journal'||by.has(s.id)),...extra.values()];
 return {storyVersion:story.version,atlasVersion:atlas.version,scenes:story.nodes.length,atlasEntries:atlas.decisions.length,cited:pages.size,
  ranks:RANKS.map(r=>({...r,sources:all.filter(s=>s.rank===r.rank).map(card)}))}}
const sources=await buildSources();
await writeFile(new URL('sources.json',target),JSON.stringify(sources));
console.log(`Prepared ${dataset.questions.length} question-bank entries with feedback and ${runs.length} explicitly published runs, and ${sources.ranks.reduce((n,r)=>n+r.sources.length,0)} sources citing ${sources.cited} pages.`);

// The How it was made page (src/pages/HowItWasMade.jsx). names.json: the substitute names the subject sees (NAMES) and
// the extra term replacements applied only in neutral mode. NEUTRAL_TERMS is private to experience-prompt.mjs, so its
// array literal is read from the module's source; a test below checks the parsed list against neutralText().
// protocol.json: the preface and what the page quotes from AGENTS.md (the subject's task message, the init command and
// the wrapper script), so the page never bundles AGENTS.md itself.
{const {NAMES,neutralText,EXPERIENCE_PREFACE}=await import('../benchmark/experience-prompt.mjs');
 const src=await readFile(new URL('../benchmark/experience-prompt.mjs',import.meta.url),'utf8'),m=src.match(/const NEUTRAL_TERMS=(\[[\s\S]*?\]\]);/);
 if(!m)throw new Error('NEUTRAL_TERMS not found in benchmark/experience-prompt.mjs');
 const terms=new Function('return '+m[1])();
 if(!Array.isArray(terms)||!terms.length||!terms.every(t=>t[0] instanceof RegExp&&typeof t[1]==='string'))throw new Error('NEUTRAL_TERMS did not parse as [RegExp, string] pairs');
 // Each term's first plain match must render as neutralText() renders it, or the parse missed something.
 for(const [re,to] of terms){const sample=re.source.replace(/\\b/g,'').replace(/\[(.)[^\]]*\]/g,'$1');if(!new RegExp(re.source,re.flags.replace('g','')).test(sample))continue;
  const mine=terms.reduce((s,[r,t])=>s.replace(r,t),sample);if(mine!==neutralText(sample))throw new Error('NEUTRAL_TERMS parse disagrees with neutralText() on '+JSON.stringify(sample))}
 const names=Object.entries(NAMES).filter(([,[real,neutral]])=>real!==neutral).map(([key,[real,neutral]])=>({key,real,neutral}));
 // `term` is the pattern as words: [Dd] becomes d with `eitherInitial`, a trailing space means "before another word".
 const neutralTerms=terms.map(([re,to])=>({pattern:re.source,flags:re.flags.replace('g',''),term:re.source.replace(/\\b/g,'').replace(/\[(\w)\w\]/g,(x,a)=>a.toLowerCase()).trim(),
  ...(/ $/.test(re.source)?{beforeWord:true}:{}),...(/\[\w\w\]/.test(re.source)?{eitherInitial:true}:{}),...(re.flags.includes('i')?{anyCase:true}:{}),replacement:to}));
 await writeFile(new URL('names.json',target),JSON.stringify({names,neutralTerms}));
 const agents=await readFile(new URL('../AGENTS.md',import.meta.url),'utf8');
 // The task message is the blockquote after "give it exactly this task" (step 3); the commands are the first fenced
 // block under the step 1 and step 2 headings.
 const quoteAfter=(md,marker)=>{const i=md.indexOf(marker);if(i<0)return null;const out=[];let started=false;
  for(const l of md.slice(i).split('\n').slice(1)){if(l.startsWith('>')){started=true;out.push(l.replace(/^> ?/,''))}else if(started||l.trim())break}
  return out.length?out.join('\n').trim():null};
 const codeUnder=(md,heading)=>{const i=md.indexOf(heading);if(i<0)return null;const c=md.slice(i).match(/```\w*\n([\s\S]*?)\n```/);return c?c[1]:null};
 const protocol={preface:EXPERIENCE_PREFACE,taskMessage:quoteAfter(agents,'give it exactly this task'),initCommand:codeUnder(agents,'### 1. Initialize a run'),wrapperScript:codeUnder(agents,'### 2. Create an opaque controller wrapper')};
 for(const [k,v] of Object.entries(protocol))if(!v)throw new Error(`AGENTS.md: could not extract ${k} for public/data/protocol.json`);
 // AGENTS.md requires its task text to open with EXPERIENCE_PREFACE.
 if(protocol.taskMessage.split(/\n\s*\n/)[0]!==EXPERIENCE_PREFACE)throw new Error('AGENTS.md: the subject task text no longer opens with EXPERIENCE_PREFACE (benchmark/experience-prompt.mjs); update AGENTS.md step 3');
 await writeFile(new URL('protocol.json',target),JSON.stringify(protocol));
 console.log(`Prepared ${names.length} substitute names and ${neutralTerms.length} neutral-mode terms, and the protocol text, for the How it was made page.`)}
