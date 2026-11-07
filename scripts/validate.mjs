import {loadCurrentRuns} from './run-report.mjs';
import {mkdir} from 'node:fs/promises';
await mkdir('data/published',{recursive:true});
import {readFile,readdir} from 'node:fs/promises';
import {datasetSchema,validateRun,makeJobs} from '../benchmark/core.mjs';
import {readFileSync} from 'node:fs';import {assembleDataset} from './dataset-assemble.mjs';
const d=datasetSchema.parse(JSON.parse(await readFile('benchmark/dataset.json','utf8')));
const atlas=JSON.parse(await readFile('docs/detroit-decisions.json','utf8'));
// Every coverage entry must name an atlas decision; atlas decisions without an entry are implicitly deferred.
const atlasIds=new Set(atlas.decisions.map(a=>a.id));for(const c of d.coverage)if(!atlasIds.has(c.atlasId))throw new Error('Coverage entry names a missing atlas decision: '+c.atlasId);
// A generated question names the atlas families that list its scene (none for a scene no family lists).
for(const q of d.questions){for(const a of q.atlasIds??[q.atlasId])if(a!==null&&!atlasIds.has(a))throw new Error('Question names a missing atlas decision: '+q.id);if(q.options.some(o=>o.text.includes(' | ')))throw new Error('Unsplit option');}
// The question bank is generated from story.json and the atlas (scripts/dataset-assemble.mjs); a stale copy is an error.
if(readFileSync('benchmark/dataset.json','utf8')!==assembleDataset())throw new Error('benchmark/dataset.json is stale: run `bun run dataset:assemble`.');
for(const file of (await readdir('data/published')).filter(f=>f.endsWith('.json')))await validateRun(JSON.parse(await readFile('data/published/'+file,'utf8')));
const deferred=atlas.decisions.filter(a=>!d.coverage.some(c=>c.atlasId===a.id)).length;
console.log(`Valid: ${d.questions.length} questions generated from story ${d.version}, ${d.coverage.length} atlas coverage entries${deferred?` (${deferred} atlas decisions without an entry, implicitly deferred)`:''}, published run integrity.`);

const actual=await loadCurrentRuns();console.log('Valid fresh branching playthroughs: '+actual.map(r=>r.label+' '+r.records.length+' decisions').join(', '));
