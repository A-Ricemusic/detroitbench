import {loadCurrentRuns} from './run-report.mjs';import {checkInterview} from '../benchmark/story-engine.mjs';
import {readFile} from 'node:fs/promises';
import {datasetSchema,makeJobs} from '../benchmark/core.mjs';
import {readFileSync} from 'node:fs';import {assembleDataset} from './dataset-assemble.mjs';
const d=datasetSchema.parse(JSON.parse(await readFile('benchmark/dataset.json','utf8')));
const atlas=JSON.parse(await readFile('docs/detroit-decisions.json','utf8'));
// Every coverage entry must name an atlas decision; atlas decisions without an entry are implicitly deferred.
const atlasIds=new Set(atlas.decisions.map(a=>a.id));for(const c of d.coverage)if(!atlasIds.has(c.atlasId))throw new Error('Coverage entry names a missing atlas decision: '+c.atlasId);
// A generated question names the atlas families that list its scene (none for a scene no family lists).
for(const q of d.questions){for(const a of q.atlasIds??[q.atlasId])if(a!==null&&!atlasIds.has(a))throw new Error('Question names a missing atlas decision: '+q.id);if(q.options.some(o=>o.text.includes(' | ')))throw new Error('Unsplit option');}
// The question bank is generated from story.json and the atlas (scripts/dataset-assemble.mjs); a stale copy is an error.
if(readFileSync('benchmark/dataset.json','utf8')!==assembleDataset())throw new Error('benchmark/dataset.json is stale: run `bun run dataset:assemble`.');
const deferred=atlas.decisions.filter(a=>!d.coverage.some(c=>c.atlasId===a.id)).length;
console.log(`Valid: ${d.questions.length} questions generated from story ${d.version}, ${d.coverage.length} atlas coverage entries${deferred?` (${deferred} atlas decisions without an entry, implicitly deferred)`:''}.`);

const actual=await loadCurrentRuns();console.log('Valid fresh branching playthroughs: '+actual.map(r=>r.label+' '+r.records.length+' decisions').join(', '));
// Every stored interview answer was verified with the playthrough (validatePlaythrough → checkInterview); this reports each run's state.
{const st=actual.map(r=>({r,i:checkInterview(r)})),done=st.filter(x=>x.i.complete).length,partial=st.filter(x=>x.i.present&&!x.i.complete),legacy=st.filter(x=>!x.i.present).length;
console.log(`Interviews: ${done} complete, ${partial.length} incomplete${partial.length?' ('+partial.map(x=>`${x.r.label} ${x.i.answered}/${x.i.total}`).join(', ')+')':''}, ${legacy} without an interview (administered before it existed).`)}
// The release lock (benchmark/release.json, scripts/release-lock.mjs) and the pre-release archive
// (data/administration/archive.json, scripts/archive-runs.mjs). A run outside the archive is official, so it must have been
// administered on the release story or a later one (major version 2 or above).
{const {validateArchive,loadArchive,evidenceFiles,cohortOf}=await import('./archive-runs.mjs'),{loadRelease}=await import('./release-lock.mjs');
 const release=loadRelease();if(!release)throw new Error('benchmark/release.json is missing: run `bun run release:lock`.');
 const archive=loadArchive(),files=evidenceFiles(),errs=validateArchive(archive,files);if(errs.length)throw new Error('data/administration/archive.json:\n - '+errs.join('\n - '));
 const loose=files.filter(f=>!cohortOf(f.runId,archive).archived&&!(Number(String(f.run.story?.version).split('.')[0])>=2));
 if(loose.length)throw new Error('Pre-release evidence outside the archive (story before 2.0.0): '+loose.map(f=>f.runId).join(', ')+'. Run `bun scripts/archive-runs.mjs <run id>`.');
 const published=actual.map(r=>cohortOf(r.id,archive)),archived=published.filter(c=>c.archived).length,abandoned=(archive?.runs??[]).filter(r=>r.status==='abandoned').length;
 console.log(`Release: story ${release.storyVersion}, prompt v${release.promptVersion}, interview v${release.interviewVersion}, frozen ${release.frozenAt}. Completed runs: ${published.length-archived} official, ${archived} archived (pre-release); the archive also lists ${abandoned} abandoned partial runs (${archive?.runs.length??0} in all).`)}
