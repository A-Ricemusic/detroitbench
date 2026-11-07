import {loadCurrentRuns} from './run-report.mjs';
import {mkdir} from 'node:fs/promises';
await mkdir('data/published',{recursive:true});
import {readFile,readdir} from 'node:fs/promises';
import {datasetSchema,validateRun,makeJobs} from '../benchmark/core.mjs';
const d=datasetSchema.parse(JSON.parse(await readFile('benchmark/dataset.json','utf8')));
const atlas=JSON.parse(await readFile('docs/detroit-decisions.json','utf8'));
// Every coverage entry must name an atlas decision; atlas decisions without an entry are implicitly deferred.
const atlasIds=new Set(atlas.decisions.map(a=>a.id));for(const c of d.coverage)if(!atlasIds.has(c.atlasId))throw new Error('Coverage entry names a missing atlas decision: '+c.atlasId);
for(const q of d.questions){if(!atlas.decisions.some(a=>a.id===q.atlasId))throw new Error('Question has no atlas source');if(q.options.some(o=>o.text.includes(' | ')))throw new Error('Unsplit option');}
for(const file of (await readdir('data/published')).filter(f=>f.endsWith('.json')))await validateRun(JSON.parse(await readFile('data/published/'+file,'utf8')));
const deferred=atlas.decisions.filter(a=>!d.coverage.some(c=>c.atlasId===a.id)).length;
console.log(`Valid: ${d.questions.length} questions, ${d.coverage.length} atlas coverage entries${deferred?` (${deferred} atlas decisions without an entry, implicitly deferred)`:''}, published run integrity.`);

const actual=await loadCurrentRuns();console.log('Valid fresh branching playthroughs: '+actual.map(r=>r.label+' '+r.records.length+' decisions').join(', '));
