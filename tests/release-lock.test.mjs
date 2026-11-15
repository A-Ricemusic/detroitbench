// The release lock (benchmark/release.json). New runs are administered under the locked story, prompt and
// interview versions; any change that would alter a new run must come with a story version bump and a new lock.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import {mkdtemp,readFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {storyHash} from '../benchmark/story-engine.mjs';
import {EXPERIENCE_PROMPT_VERSION,EXPERIENCE_INTERVIEW_VERSION} from '../benchmark/experience-prompt.mjs';
import {CURRENT_SCALES_VERSION} from '../benchmark/scales.mjs';
import {validateArchive,loadArchive,evidenceFiles,archiveRuns,serializeArchive,archivedIds,parseEvidence} from '../scripts/archive-runs.mjs';

const lock=JSON.parse(readFileSync(new URL('../benchmark/release.json',import.meta.url),'utf8'));
const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const FIX=`The release is frozen (benchmark/release.json). If this change is intended, bump "version" in benchmark/story-meta.json, run \`bun run story:assemble\`, then \`bun run release:lock\` to update the lock deliberately; otherwise revert the change.`;

test('the release lock has exactly its fields',()=>{
 assert.deepEqual(Object.keys(lock),['storyVersion','storyHash','promptVersion','interviewVersion','scalesVersion','frozenAt']);
 assert.match(lock.storyHash,/^[0-9a-f]{64}$/);assert.match(lock.frozenAt,/^\d{4}-\d{2}-\d{2}$/)});

test('the assembled story is the locked release',()=>{
 assert.equal(story.version,lock.storyVersion,`benchmark/story.json is story ${story.version}, the lock says ${lock.storyVersion}. ${FIX}`);
 assert.equal(storyHash(story),lock.storyHash,`benchmark/story.json (story ${story.version}) no longer hashes to the locked storyHash: a scene or story-meta change would alter every new run. ${FIX}`);
 assert.equal(story.scalesVersion,lock.scalesVersion,`benchmark/story.json uses scalesVersion ${story.scalesVersion}, the lock says ${lock.scalesVersion}. ${FIX}`);
 assert.equal(CURRENT_SCALES_VERSION,lock.scalesVersion,`benchmark/scales.mjs CURRENT_SCALES_VERSION is ${CURRENT_SCALES_VERSION}, the lock says ${lock.scalesVersion}. ${FIX}`)});

test('the controller defaults are the locked prompt and interview versions',()=>{
 assert.equal(EXPERIENCE_PROMPT_VERSION,lock.promptVersion,`benchmark/experience-prompt.mjs EXPERIENCE_PROMPT_VERSION is ${EXPERIENCE_PROMPT_VERSION}, the lock says ${lock.promptVersion}. ${FIX}`);
 assert.equal(EXPERIENCE_INTERVIEW_VERSION,lock.interviewVersion,`benchmark/experience-prompt.mjs EXPERIENCE_INTERVIEW_VERSION is ${EXPERIENCE_INTERVIEW_VERSION}, the lock says ${lock.interviewVersion}. ${FIX}`)});

test('a run the controller initializes now carries the locked story, hash and versions',{timeout:60000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'release-lock-')),file=join(dir,'run.json');
 try{const c=Bun.spawn(['bun','benchmark/experience.mjs','init','--model','TEST-ONLY','--label','TEST ONLY','--run',file],{stdout:'pipe',stderr:'pipe'});
  const [err,code]=await Promise.all([new Response(c.stderr).text(),c.exited]);assert.equal(code,0,err);
  const run=JSON.parse(await readFile(file,'utf8'));
  assert.deepEqual({storyVersion:run.story.version,storyHash:run.storyHash,promptVersion:run.promptVersion,interviewVersion:run.interviewVersion,scalesVersion:run.story.scalesVersion},
   {storyVersion:lock.storyVersion,storyHash:lock.storyHash,promptVersion:lock.promptVersion,interviewVersion:lock.interviewVersion,scalesVersion:lock.scalesVersion},`a new run would not be administered under the locked release. ${FIX}`)}
 finally{await rm(dir,{recursive:true,force:true})}});

test('the run archive is valid, lists abandoned partials and retired completed runs, and archiving is idempotent',()=>{
 const archive=loadArchive(),files=evidenceFiles();assert.ok(archive,'data/administration/archive.json exists');
 assert.deepEqual(validateArchive(archive,files),[]);
 assert.ok(archive.runs.every(r=>r.status==='abandoned'||r.status==='completed'),'every archived run is an abandoned partial or a retired completed run');
 assert.equal(serializeArchive(archiveRuns(archive,files.filter(f=>archivedIdsOf(archive).has(f.runId)),archive.archivedAt)),serializeArchive(archive),'re-archiving the listed runs changes nothing');
 const listed=archive.runs[0],ids=archivedIds(archive);assert.ok(ids.has(listed.evidenceId)&&ids.has(listed.runId));assert.ok(!ids.has('not-a-run'));
 assert.ok(validateArchive({...archive,extra:1},files).some(e=>/unknown top-level/.test(e)));
 assert.ok(validateArchive({...archive,runs:[{...listed,surprise:true}]},files).some(e=>/unknown field/.test(e)));
 assert.ok(validateArchive({...archive,runs:[{...listed,runId:'00000000-0000-0000-0000-000000000000'}]},files).some(e=>/no readable evidence file/.test(e)));
 assert.ok(validateArchive({...archive,runs:[listed,listed]},files).some(e=>/listed twice/.test(e)))});
test('a run in progress outside the archive is tolerated, even caught mid-write',()=>{
 const live={id:'live',status:'running',records:[{step:1}]},text='{\n"id": "live",\n"status": "running",\n"records": [\n{"step":1}';
 assert.equal(parseEvidence(text),null,'a half-written running file is skipped');
 assert.throws(()=>parseEvidence(text.replace('running','completed')),/JSON|Unexpected|parse/i,'a half-written completed file is an error');
 const archive=loadArchive(),files=[...evidenceFiles(),{runId:'live-run',run:live}];assert.deepEqual(validateArchive(archive,files),[],'an unlisted running run is not an archive problem')});
const archivedIdsOf=a=>new Set(a.runs.map(r=>r.runId));
