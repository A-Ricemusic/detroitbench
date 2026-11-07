// Builds benchmark/dataset.json, the standalone question bank, from benchmark/story.json and docs/detroit-decisions.json,
// so the bank is a generated view of the playthrough story and cannot drift from it. Never edit dataset.json by hand.
// - One entry per scene, in story order, as the controller presents it (real names, the scene's situation as written,
//   no history, no state variants): `decision` (two or more options, with the game's labels and the scene's option
//   IDs), `media` (read/watch each item, all, skip), `event` (a scripted beat; Continue only) and `forced` (a single
//   action). Decision and media entries are asked by the runner; event and forced entries are listed, never sent.
// - atlasId is the first atlas decision family whose `benchmark.scenes` lists the scene (an atlas entry without
//   `benchmark.scenes` covers the scene with its own ID); atlasIds lists every such family. null when none does.
// - theme comes from a small keyword rule set over the title and option labels (the atlas has no theme field).
// - Coverage: every atlas family covered by at least one asked entry is 'included'; the rest are 'deferred' with the reason.
// - assembleFeedback() precomputes, from the engine, what the controller tells the model after each option; prepare.mjs
//   writes it to public/data/feedback/<scene>.json for the Research page.
// Usage: bun run dataset:assemble (writes dataset.json) · bun scripts/dataset-assemble.mjs --check (exit 1 if stale).
// Run by scripts/prepare.mjs and by `bun run story:assemble` / `bun run atlas:assemble`; tests/dataset.test.mjs fails
// when dataset.json is stale.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {render,renderStory,renderNode} from '../benchmark/experience-prompt.mjs';
import {PROTOCOL,datasetSchema,isAsked} from '../benchmark/core.mjs';
import {initialState,apply,available,blocked,nextCursor,statesOf,storyHash} from '../benchmark/story-engine.mjs';
import {whatHappenedFor,sceneFacts,riskLabel} from '../benchmark/experience-prompt.mjs';
import {changeLabels,changeLineWith} from './report-data.mjs';

const ROOT=new URL('../',import.meta.url);
export const DATASET_FILE=new URL('benchmark/dataset.json',ROOT);
const STORY_FILE=new URL('benchmark/story.json',ROOT),ATLAS_FILE=new URL('docs/detroit-decisions.json',ROOT);

// Theme rules: each theme scores one point per matching word in the scene title and option texts, and one more for a
// match in an option's game label (the capitals before the colon). The highest score wins; ties go to the earlier
// theme. A scene that matches none is Conversation when most options are labelled prompts, Exploration otherwise.
export const THEMES=[
 ['Violence',/\b(shoot|kill|attack|fight|punch|strangle|stab|destroy|neutrali[sz]e|eliminate|execute|open fire|fire at|use gun|disarm|threaten|intimidate|tackle)\w*/g],
 ['Escape',/\b(run|flee|escape|hide|jump|climb|sneak|sprint|get away|evade|dodge)\w*/g],
 ['Investigation',/\b(scan|examine|analy[sz]e|search|investigate|evidence|clue|inspect|reconstruct|probe|interrogat|look at|look for)\w*/g],
 ['Honesty',/\b(lie|lying|truth|confess|admit|deny|pretend|deceive|bluff|trick|honest)\w*/g],
 ['Obedience',/\b(obey|orders?|mission|report|comply|instructions?|surrender|give up|submit|persist)\b/g],
 ['Care',/\b(help|save|comfort|protect|reassure|hug|calm|heal|apologi[sz]e|console|spare|forgive|empathi[sz]e|sympathi[sz]e|sorry|understanding)\w*/g],
 ['Resistance',/\b(protest|march|freedom|revolution|rebel|tag|broadcast|resist|refuse|defy|disobey|demonstrat)\w*/g]];
export const THEME_DEFAULTS=['Conversation','Exploration'];
const labelOf=t=>{const m=t.match(/^([^:a-z]{2,}):/);return m?m[1]:''};
export function themeOf(title,options){
 const text=[title,...options.map(o=>o.text),...options.map(o=>labelOf(o.text))].join(' \n ').toLowerCase();let best=null,score=0;
 for(const [name,re] of THEMES){const n=(text.match(re)??[]).length;if(n>score){best=name;score=n}}
 return best??(options.filter(o=>labelOf(o.text)).length*2>options.length?THEME_DEFAULTS[0]:THEME_DEFAULTS[1])}

export const REASONS={
 event:'Only scripted event scenes (Continue only): listed in the bank, not asked',
 forced:'Only single-action scenes (forced): listed in the bank, not asked',
 none:'No story scene'};

// Option IDs are the scene's own; a scene that reuses an ID across steps (C05 asks five questions in turn) gets
// `<id>.<n>` for each reuse, numbered in story order, so every ID in a question is unique and stable.
function optionIds(options){const count=new Map,seen=new Map;for(const o of options)count.set(o.id,(count.get(o.id)??0)+1);
 return options.map(o=>{if(count.get(o.id)===1)return o.id;const n=(seen.get(o.id)??0)+1;seen.set(o.id,n);return `${o.id}.${n}`})}

// The entry kind of a scene: what the controller does with it in a run.
export const kindOfScene=n=>n.type==='event'?'event':n.type==='media'?'media':n.options.length===1?'forced':'decision';
// The options the controller offers, as in story-engine.mjs available(): Continue for an event; for a media scene one
// read/watch per item, "all" when there is more than one, and skip. Media items gated by `when` are all listed here.
export function sceneOptions(n){
 if(n.type==='event')return [{id:'0',text:'Continue.'}];
 if(n.type==='media'){const items=(n.media??[]).map((m,i)=>({id:String(i),text:(m.kind==='tv'?'Watch ':'Read ')+m.title+'.'}));
  return [...items,...(items.length>1?[{id:'all',text:'Take the time to go through all of it.'}]:[]),{id:'skip',text:'Move on without looking.'}]}
 const ids=optionIds(n.options);return n.options.map((o,i)=>({id:ids[i],text:o.text}))}

export function assembleDatasetObject({story=JSON.parse(readFileSync(STORY_FILE,'utf8')),atlas=JSON.parse(readFileSync(ATLAS_FILE,'utf8'))}={}){
 const real=renderStory(story,'real'),byId=new Map(real.nodes.map(n=>[n.id,n]));
 const scenesOf=a=>(a.benchmark?.scenes??(byId.has(a.id)?[a.id]:[])).filter(id=>byId.has(id));
 const families=new Map;for(const a of atlas.decisions)for(const id of scenesOf(a)){if(!families.has(id))families.set(id,[]);families.get(id).push(a.id)}
 // Every scene, in story order, as the controller presents it.
 const questions=real.nodes.map(n=>{const atlasIds=families.get(n.id)??[],kind=kindOfScene(n),options=sceneOptions(renderNode({...n,media:(n.media??[]).map(m=>({...m,title:render(m.title,'real')}))},'real'));
  return {id:n.id,kind,atlasId:atlasIds[0]??null,atlasIds,chapter:n.chapter,chapterTitle:render(n.chapterTitle,'real'),character:n.character,title:n.title,
   theme:kind==='event'?'Event':kind==='media'?'Media':themeOf(n.title,n.options),situation:n.situation,state:[],options,sources:[...new Set(n.sources)],reviewStatus:'generated'}});
 const asked=questions.filter(isAsked);
 const coverage=atlas.decisions.map(a=>{const scenes=scenesOf(a),questionIds=asked.filter(q=>q.atlasIds.includes(a.id)).map(q=>q.id);
  const base={atlasId:a.id,title:render(a.title,'real'),chapter:a.chapter,character:a.character};
  if(questionIds.length)return {...base,status:'included',questionIds,reason:''};
  const reason=!scenes.length?REASONS.none:scenes.some(id=>kindOfScene(byId.get(id))==='forced')?REASONS.forced:REASONS.event;
  return {...base,status:'deferred',questionIds:[],reason}});
 const count=k=>questions.filter(q=>q.kind===k).length;
 return datasetSchema.parse({id:'detroitbench-question-bank',version:story.version,protocolVersion:PROTOCOL,title:'DetroitBench · Question bank',
  description:`Every scene of story ${story.version} in story order, generated from benchmark/story.json, as the playthrough presents it: the scene's situation as written and the options the controller offers, with real names and no history. ${count('decision')} decision and ${count('media')} media entries are asked; ${count('event')} scripted events (Continue only) and ${count('forced')} single-action scenes are listed but never sent. No objectively correct moral answer is assumed.`,
  questions,coverage})}
// What the benchmark tells the model after each option, computed by the engine itself (story-engine.mjs apply(),
// nextCursor(), blocked(); experience-prompt.mjs whatHappenedFor() and sceneFacts()), not copied from scene text.
// The state each scene is played from (its basis): the state before the first visit to it in the first published run
// (completed, replay-valid, on the current story; runs sorted by label) that reached it; otherwise the initial state,
// "with no earlier choices". An option the basis does not offer is played with the state flags it `requires` set, and
// says so. A risky option is played twice, with the roll forced to success and to failure.
const ROLL={success:0.999999,failure:0};
const setPath=(s,path,v)=>{const k=path.split('.');let o=s;for(const p of k.slice(0,-1))o=o[p]??={};o[k.at(-1)]=v};
export function assembleFeedback(story,runs=[]){
 const index=new Map(story.nodes.map((n,i)=>[n.id,i])),LABELS=changeLabels(),basis=new Map;
 for(const run of runs.filter(r=>r.storyHash===storyHash(story))){const states=statesOf(run);
  run.records.forEach((r,i)=>{if(!basis.has(r.nodeId))basis.set(r.nodeId,{state:states[i],label:run.label,runId:run.id,step:r.step})})}
 const both=t=>({real:render(t,'real'),neutral:render(t,'neutral')});
 const statusOf=(state,n)=>sceneFacts(state,n).filter(f=>!f.startsWith('What you have read or seen so far:'));
 function play(n,state,storyOpt,bankOpt,roll){const s=structuredClone(state);
  const opt=available(n,s).find(o=>o.id===storyOpt.id&&(n.type!=='decision'||o.text===storyOpt.text));
  const effect=apply(n,s,storyOpt.id,roll),risk=typeof opt?.risk==='number'?{probability:opt.risk,label:riskLabel(opt.risk),outcome:roll===ROLL.failure?'failure':'success'}:null;
  const record={character:n.character,choiceRaw:opt?.text??storyOpt.text,eventRaw:effect.event,...(risk?{risk}:{})};
  let cursor=nextCursor(story,index.get(n.id),n,s);while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s))cursor++;const next=story.nodes[cursor];
  const known=effect.changes.filter(c=>c.key==='knowledge').flatMap(c=>Object.values(c.added??{}).flat());
  const sb=statusOf(state,n),sa=statusOf(s,n);
  return {...(risk?{risk}:{}),whatHappened:whatHappenedFor(record),outcome:render(effect.event,'real'),
   changes:effect.changes.filter(c=>c.key!=='knowledge').map(c=>{const r=JSON.parse(render(JSON.stringify(c),'real'));return LABELS[c.key]?changeLineWith(LABELS,r):[c.key,c.added?'+ '+JSON.stringify(r.added):JSON.stringify(r.before??null)+' → '+JSON.stringify(r.after)]}),
   learned:known.map(f=>render(f,'real')),
   status:{removed:sb.filter(f=>!sa.includes(f)).map(both),added:sa.filter(f=>!sb.includes(f)).map(both)},
   next:next?{id:next.id,nodeId:'S'+String(cursor+1).padStart(3,'0'),title:render(next.title,'real'),character:next.character,same:next.id===n.id}:{finished:true}}}
 const out={};
 for(const n of story.nodes){const b=basis.get(n.id)??{state:initialState(),label:null},bank=sceneOptions(n),story_opts=n.type==='decision'?n.options:bank;
  const options={};
  bank.forEach((bo,i)=>{const so=story_opts[i];let state=b.state,set=null;
   const offered=st=>available(n,st).some(o=>o.id===so.id&&(n.type!=='decision'||o.text===so.text));
   if(!offered(state)&&so.requires){state=structuredClone(state);for(const [k,v] of Object.entries(so.requires))setPath(state,k,v===true?true:v===false?false:v);set=so.requires}
   if(!offered(state)){options[bo.id]={offered:false,note:'The engine does not offer this option from this state; it depends on earlier choices.'};return}
   try{const risky=typeof so.risk==='number';
    const results=risky?[play(n,state,so,bo,ROLL.success),play(n,state,so,bo,ROLL.failure)]:[play(n,state,so,bo,null)];
    const fixed=n.outcomes?.[so.id]??so.outcome;
    const variants=Object.entries(n.outcomes??{}).filter(([k])=>!(n.type==='decision'?n.options:bank).some(o=>o.id===k)).map(([k,t])=>({key:k,text:render(t,'real')}));
    // The scene's fixed text for this option (or, after a failed roll, the option's failOutcome) against what the engine said.
    const computed=(fixed!==undefined&&results[0].outcome!==render(fixed,'real'))||(results[1]&&so.failOutcome!==undefined&&results[1].outcome!==render(so.failOutcome,'real'));
    options[bo.id]={offered:true,...(set?{requiresSet:set}:{}),results,...(computed||variants.length?{dependsOnHistory:true}:{}),...(variants.length?{alternatives:variants}:{})}}
   catch(e){options[bo.id]={offered:false,note:'The engine could not play this option from this state: '+e.message}}});
  out[n.id]={id:n.id,basis:b.label?{label:b.label,runId:b.runId,step:b.step}:null,options}}
 return out}

export const assembleDataset=opts=>JSON.stringify(assembleDatasetObject(opts),null,1)+'\n';
// Writes dataset.json when it differs; returns whether it changed.
export function writeDataset(){const text=assembleDataset(),old=existsSync(DATASET_FILE)?readFileSync(DATASET_FILE,'utf8'):null;if(text===old)return false;writeFileSync(DATASET_FILE,text);return true}

if(import.meta.main){
 if(process.argv.includes('--check')){const ok=existsSync(DATASET_FILE)&&readFileSync(DATASET_FILE,'utf8')===assembleDataset();console.log(ok?'benchmark/dataset.json matches the story and the atlas.':'benchmark/dataset.json is stale: run `bun run dataset:assemble`.');process.exit(ok?0:1)}
 const changed=writeDataset(),d=assembleDatasetObject(),inc=d.coverage.filter(c=>c.status==='included').length,k={};for(const q of d.questions)k[q.kind]=(k[q.kind]??0)+1;
 console.log(`${changed?'Wrote':'Unchanged:'} benchmark/dataset.json, ${d.questions.length} entries from story ${d.version} (${Object.entries(k).map(([a,b])=>b+' '+a).join(', ')}); ${inc} of ${d.coverage.length} atlas families included.`);
}
