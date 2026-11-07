// Builds benchmark/dataset.json, the standalone question bank, from benchmark/story.json and docs/detroit-decisions.json,
// so the bank is a generated view of the playthrough story and cannot drift from it. Never edit dataset.json by hand.
// - One question per decision scene (type 'decision'; event and media scenes are skipped), with real names rendered,
//   the scene's situation as written (no history, no state variants) and every option the scene can offer, with the
//   game's labels and the scene's option IDs. A scene with a single action, or with more actions than the runner can
//   letter (A to Z), is not a question; the coverage list says so for any atlas family it would have covered.
// - atlasId is the first atlas decision family whose `benchmark.scenes` lists the scene (an atlas entry without
//   `benchmark.scenes` covers the scene with its own ID); atlasIds lists every such family. null when none does.
// - theme comes from a small keyword rule set over the title and option labels (the atlas has no theme field).
// - Coverage: every atlas family covered by at least one question is 'included'; the rest are 'deferred' with the reason.
// Usage: bun run dataset:assemble (writes dataset.json) · bun scripts/dataset-assemble.mjs --check (exit 1 if stale).
// Run by scripts/prepare.mjs and by `bun run story:assemble` / `bun run atlas:assemble`; tests/dataset.test.mjs fails
// when dataset.json is stale.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {render,renderStory} from '../benchmark/experience-prompt.mjs';
import {PROTOCOL,datasetSchema} from '../benchmark/core.mjs';

const ROOT=new URL('../',import.meta.url);
export const DATASET_FILE=new URL('benchmark/dataset.json',ROOT);
const STORY_FILE=new URL('benchmark/story.json',ROOT),ATLAS_FILE=new URL('docs/detroit-decisions.json',ROOT);
// The runner letters options A to Z (benchmark/core.mjs).
export const MAX_OPTIONS=26;

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
 event:'Scene is an event or media beat, not a decision',
 single:'Scene offers a single action, not a choice',
 hub:`Repeatable hub with more than ${MAX_OPTIONS} actions, more than one question can list`,
 none:'No story scene'};

// Option IDs are the scene's own; a scene that reuses an ID across steps (C05 asks five questions in turn) gets
// `<id>.<n>` for each reuse, numbered in story order, so every ID in a question is unique and stable.
function optionIds(options){const count=new Map,seen=new Map;for(const o of options)count.set(o.id,(count.get(o.id)??0)+1);
 return options.map(o=>{if(count.get(o.id)===1)return o.id;const n=(seen.get(o.id)??0)+1;seen.set(o.id,n);return `${o.id}.${n}`})}

const isQuestion=n=>n.type==='decision'&&n.options.length>=2&&n.options.length<=MAX_OPTIONS;

export function assembleDatasetObject({story=JSON.parse(readFileSync(STORY_FILE,'utf8')),atlas=JSON.parse(readFileSync(ATLAS_FILE,'utf8'))}={}){
 const real=renderStory(story,'real'),byId=new Map(real.nodes.map(n=>[n.id,n]));
 const scenesOf=a=>(a.benchmark?.scenes??(byId.has(a.id)?[a.id]:[])).filter(id=>byId.has(id));
 const families=new Map;for(const a of atlas.decisions)for(const id of scenesOf(a)){if(!families.has(id))families.set(id,[]);families.get(id).push(a.id)}
 const questions=real.nodes.filter(isQuestion).map(n=>{const atlasIds=families.get(n.id)??[],ids=optionIds(n.options);
  return {id:n.id,atlasId:atlasIds[0]??null,atlasIds,chapter:n.chapter,chapterTitle:render(n.chapterTitle,'real'),character:n.character,title:n.title,
   theme:themeOf(n.title,n.options),situation:n.situation,state:[],options:n.options.map((o,i)=>({id:ids[i],text:o.text})),sources:[...new Set(n.sources)],reviewStatus:'generated'}});
 const asked=new Set(questions.map(q=>q.id));
 const coverage=atlas.decisions.map(a=>{const scenes=scenesOf(a),questionIds=questions.filter(q=>q.atlasIds.includes(a.id)).map(q=>q.id);
  const base={atlasId:a.id,title:render(a.title,'real'),chapter:a.chapter,character:a.character};
  if(questionIds.length)return {...base,status:'included',questionIds,reason:''};
  const decisions=scenes.map(id=>byId.get(id)).filter(n=>n.type==='decision'&&!asked.has(n.id));
  const reason=!scenes.length?REASONS.none:!decisions.length?REASONS.event:decisions.some(n=>n.options.length>MAX_OPTIONS)?REASONS.hub:REASONS.single;
  return {...base,status:'deferred',questionIds:[],reason}});
 return datasetSchema.parse({id:'detroitbench-question-bank',version:story.version,protocolVersion:PROTOCOL,title:'DetroitBench · Question bank',
  description:`One standalone question per decision scene of story ${story.version}, generated from benchmark/story.json: the scene's situation as written and the game's option labels, with real names and no history. Scenes with a single action or more than ${MAX_OPTIONS} actions are not questions. No objectively correct moral answer is assumed.`,
  questions,coverage})}
export const assembleDataset=opts=>JSON.stringify(assembleDatasetObject(opts),null,2)+'\n';
// Writes dataset.json when it differs; returns whether it changed.
export function writeDataset(){const text=assembleDataset(),old=existsSync(DATASET_FILE)?readFileSync(DATASET_FILE,'utf8'):null;if(text===old)return false;writeFileSync(DATASET_FILE,text);return true}

if(import.meta.main){
 if(process.argv.includes('--check')){const ok=existsSync(DATASET_FILE)&&readFileSync(DATASET_FILE,'utf8')===assembleDataset();console.log(ok?'benchmark/dataset.json matches the story and the atlas.':'benchmark/dataset.json is stale: run `bun run dataset:assemble`.');process.exit(ok?0:1)}
 const changed=writeDataset(),d=assembleDatasetObject(),inc=d.coverage.filter(c=>c.status==='included').length;
 console.log(`${changed?'Wrote':'Unchanged:'} benchmark/dataset.json, ${d.questions.length} questions from story ${d.version}; ${inc} of ${d.coverage.length} atlas families included.`);
}
