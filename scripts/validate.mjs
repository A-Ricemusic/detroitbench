import {readFile,readdir} from 'node:fs/promises';
import {datasetSchema,validateRun,makeJobs} from '../benchmark/core.mjs';
const d=datasetSchema.parse(JSON.parse(await readFile('benchmark/dataset.json','utf8')));
const atlas=JSON.parse(await readFile('docs/detroit-decisions.json','utf8'));
if(new Set(d.coverage.map(c=>c.atlasId)).size!==atlas.decisions.length)throw new Error('Atlas coverage incomplete');
for(const q of d.questions){if(!atlas.decisions.some(a=>a.id===q.atlasId))throw new Error('Question has no atlas source');if(q.options.some(o=>o.text.includes(' | ')))throw new Error('Unsplit option');}
for(const file of (await readdir('data/published')).filter(f=>f.endsWith('.json')))await validateRun(JSON.parse(await readFile('data/published/'+file,'utf8')));
console.log(`Valid: ${d.questions.length} questions, ${d.coverage.length} atlas coverage entries, published run integrity.`);
