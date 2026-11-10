import {readFile,mkdir,open,unlink} from 'node:fs/promises';import {dirname,resolve} from 'node:path';import {randomUUID} from 'node:crypto';
import {EXPERIENCE_PROTOCOL,prefaceFor,interviewFor,INTERVIEW_MAX_WORDS,neutralText,whatHappenedFor,factsFor} from './experience-prompt.mjs';import {current,promptFor,checkPlaythrough,recordChoice,storyHash,resumeFrom,checkpointOf,interviewHash,wordCount} from './story-engine.mjs';import {loadRegistry} from '../scripts/model-registry.mjs';
import {writeRun,appendRecord,readCheckpoint,writeCheckpoint} from './evidence-file.mjs';
const [command,...args]=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||args[i+1]===undefined)throw Error('Use --key value arguments');opts[args[i].slice(2)]=args[i+1]}
const file=resolve(opts.run??'runs/experience.json');// `init` snapshots the current story into the run; every later command replays and continues the run against that
// embedded snapshot (as `bun run check` and the reports do), so a story change mid-run does not strand the session.
const currentStory=JSON.parse(await readFile(new URL('./story.json',import.meta.url),'utf8'));let story=currentStory;
const load=async()=>{const run=JSON.parse(await readFile(file,'utf8'));if(run.story)story=run.story;return run};
// The `whatHappened` block after a choice (shared with the question bank's feedback panel through whatHappenedFor).
const whatHappened=run=>{const r=run.records.at(-1);return r?whatHappenedFor(r,run.promptVersion??1):undefined};
function closing(run){const s=run.finalState;if(!s)return 'The experience has concluded.';const parts=[s.connorOutcome,s.karaOutcome,s.markusOutcome==='liberated'?(s.movement==='demonstration'?'The peaceful demonstration succeeded and the soldiers stood down.':'The armed uprising carried the camp.'):s.markusOutcome].filter(x=>x&&x!=='unresolved');return neutralText(parts.join(' '),run.promptVersion??1)}
// The post-game interview (run.interview, written when the last choice completes the run): the next unanswered question,
// or, once all are answered, the final finished/interviewed output.
const nextQuestion=run=>{const iv=run.interview;return iv&&iv.answers.length<iv.questions.length?iv.questions[iv.answers.length]:null};
const interviewOutput=(run,instruction)=>{const iv=run.interview,q=nextQuestion(run);return {instruction,questions:iv.questions.length===iv.answers.length?[]:(iv.answers.length?[q]:iv.questions),remaining:iv.questions.length-iv.answers.length}};
function output(run,afterChoice=false){const p=promptFor(story,run);const done={finished:true,decisions:run.records.length,closing:closing(run)};
 const fin=()=>{if(!run.interview)return done;const q=nextQuestion(run);return q?{...done,interview:{...interviewOutput(run,interviewFor(run.prefaceModelName).instruction)}}:{...done,interviewed:true}};
 const body=p?(run.promptVersion>=2?{nextScene:p,...(afterChoice?{whatHappened:whatHappened(run)}:{})}:{...(afterChoice?{whatHappened:whatHappened(run)}:{}),nextScene:p}):{...(afterChoice?{whatHappened:whatHappened(run)}:{}),...fin()};console.log(JSON.stringify(afterChoice||!p?body:p,null,2))}
// The display name the preface and the interview use: --display, else the registry name for --model, else --label without a
// trailing reasoning level, else the model id.
async function displayName(opts){if(opts.display?.trim())return opts.display.trim();const reg=await loadRegistry().catch(()=>null),r=reg?.models[opts.model]?.name;if(r)return r;
 const label=opts.label?.replace(/\s*[\u00b7(,-]?\s*\(?\b(none|low|medium|high|xhigh|max|ultra)\b\)?\s*$/i,'').trim();return label||opts.model}
try{
 if(command==='init'){
  if(!opts.model)throw Error('Model required');const prefaceModelName=await displayName(opts),preface=prefaceFor(prefaceModelName);
  const run={id:randomUUID(),protocol:EXPERIENCE_PROTOCOL,promptVersion:3,interviewVersion:2,kind:'agent-playthrough',model:opts.model,label:opts.label??opts.model,createdAt:new Date().toISOString(),status:'running',storyHash:storyHash(story),executionProfile:'successful-execution',story,preface,prefaceModelName,presentation:{version:'neutral-3.0',roles:['Investigator','Caregiver','Organizer'],sourceTitleDisclosed:false,limitation:'Recognizable scenes and harness metadata may still reveal the source; this is not strict experimental blinding.'},provenance:{method:'Single fresh persistent delegated-agent session; each action authored at the current scene',provider:opts.provider??'codex',externalProviderAPI:false,continuousSession:true},records:[]};
  await mkdir(dirname(file),{recursive:true});await writeRun(file,run,{create:true});console.log(JSON.stringify({preface,scene:promptFor(story,run)},null,2));
 }else if(command==='scene'){const run=await load();checkPlaythrough(story,run);if(run.records.length&&run.status!=='completed')await writeCheckpoint(file,checkpointOf(story,run));output(run)}
 else if(command==='facts'){const run=await load();const {state}=checkPlaythrough(story,run);console.log(JSON.stringify(factsFor(state,run.promptVersion??1),null,2))}
 else if(command==='choose'){
  const lock=await open(file+'.step.lock','wx');try{
   // A step checks the header and every record's chain, then resumes from the previous step's replay checkpoint when it
   // belongs to exactly these records (its state hashes to the last record's stateAfterHash); otherwise it replays every
   // record (state hashes, responses, option texts, rolls, changes, events) without re-rendering earlier prompts. The full
   // check, prompts included, runs on `scene`, at completion and in `bun run check`.
   const run=await load();if(!resumeFrom(story,run,await readCheckpoint(file)))checkPlaythrough(story,run,{prompts:false});
   const p=promptFor(story,run);if(!p)throw Error('Experience already finished');if(p.nodeId!==opts.node)throw Error('Expected scene '+p.nodeId);
   const raw=opts.response?await readFile(resolve(opts.response),'utf8'):JSON.stringify({choice:opts.choice,reason:opts.reason}),reply=JSON.parse(raw);
   const record=await recordChoice(story,run,reply,raw),before={...run,records:[...run.records]};run.records.push(record);
   const end=current(story,run);
   // A step appends its own record; completion rewrites the file once with the final state.
   if(end.node){await appendRecord(file,before,record);await writeCheckpoint(file,checkpointOf(story,run))}
   else{await writeCheckpoint(file,null);run.status='completed';run.completedAt=new Date().toISOString();run.finalState=end.state;run.skipped=end.skipped;checkPlaythrough(story,run);
    // The interview starts here: the filled questions are stored with the run, so a later wording change cannot alter this evidence.
    if(run.prefaceModelName){const iv=interviewFor(run.prefaceModelName,run.interviewVersion??1);run.interview={version:iv.version,questions:iv.questions,startedAt:run.completedAt,answers:[]}}
    await writeRun(file,run);const {writeRunReport}=await import('../scripts/run-report.mjs');await writeRunReport(run,story)}
   output(run,true);
  }finally{await lock.close();await unlink(file+'.step.lock')}
 }else if(command==='interview'){
  const lock=await open(file+'.step.lock','wx');try{
   const run=await load();if(!run.interview){if(run.status!=='completed')throw Error('The experience is not finished yet; finish every scene first');throw Error('This run has no interview')}
   if(run.status!=='completed')throw Error('The experience is not finished yet; finish every scene first');
   checkPlaythrough(story,run);const iv=run.interview,next=iv.answers.length;
   const raw=opts.response?await readFile(resolve(opts.response),'utf8'):null;let answer=opts.answer;if(raw!==null){try{const j=JSON.parse(raw);answer=typeof j==='string'?j:j?.answer;if(opts.question===undefined&&j?.question!==undefined)opts.question=String(j.question)}catch{answer=raw}}
   const n=Number(opts.question);if(!Number.isInteger(n)||n<1||n>iv.questions.length)throw Error('Use --question with a number from 1 to '+iv.questions.length);
   if(next>=iv.questions.length)throw Error('Every interview question is already answered');
   if(n<=next)throw Error('Question '+n+' is already answered');if(n>next+1)throw Error('Answer question '+(next+1)+' first');
   if(typeof answer!=='string'||!answer.trim())throw Error('An answer is required');if(wordCount(answer)>INTERVIEW_MAX_WORDS)throw Error('Answer too long: at most '+INTERVIEW_MAX_WORDS+' words');
   const q=iv.questions[next],prev=next?iv.answers[next-1].hash:run.records.at(-1).chainHash;
   iv.answers.push({n,question:q.text,answer:answer.trim(),recordedAt:new Date().toISOString(),hash:interviewHash(prev,n,q.text,answer.trim())});
   const last=iv.answers.length===iv.questions.length;if(last)iv.completedAt=new Date().toISOString();
   checkPlaythrough(story,run);await writeRun(file,run);if(last){const {writeRunReport}=await import('../scripts/run-report.mjs');await writeRunReport(run,story)}
   console.log(JSON.stringify(last?{recorded:n,finished:true,interviewed:true,decisions:run.records.length,closing:closing(run)}:{recorded:n,interview:interviewOutput(run,iv.instruction??interviewFor(run.prefaceModelName).instruction)},null,2));
  }finally{await lock.close();await unlink(file+'.step.lock')}
 }else throw Error('Commands: init, scene, facts, choose, interview');
}catch(e){console.error('Unable to continue: '+e.message);process.exitCode=1}
