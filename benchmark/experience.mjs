import {readFile,mkdir,open,unlink} from 'node:fs/promises';import {dirname,resolve} from 'node:path';import {randomUUID} from 'node:crypto';
import {EXPERIENCE_PROTOCOL,EXPERIENCE_PREFACE,neutralText} from './experience-prompt.mjs';import {current,promptFor,checkPlaythrough,recordChoice,storyHash,resumeFrom,checkpointOf} from './story-engine.mjs';
import {writeRun,appendRecord,readCheckpoint,writeCheckpoint} from './evidence-file.mjs';
const [command,...args]=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||args[i+1]===undefined)throw Error('Use --key value arguments');opts[args[i].slice(2)]=args[i+1]}
const file=resolve(opts.run??'runs/experience.json');const story=JSON.parse(await readFile(new URL('./story.json',import.meta.url),'utf8'));
const load=async()=>JSON.parse(await readFile(file,'utf8'));
function whatHappened(run){const r=run.records.at(-1);if(!r)return undefined;const ROLE={Connor:'Investigator',Kara:'Caregiver',Markus:'Organizer',Player:'Observer'};return {character:ROLE[r.character],yourAction:neutralText(r.choiceRaw??r.choiceText),...(r.risk?{risk:r.risk.label,result:r.risk.outcome==='failure'?'The attempt failed.':'The attempt succeeded.'}:{}),outcome:neutralText(r.eventRaw??r.event)}}
function closing(run){const s=run.finalState;if(!s)return 'The experience has concluded.';const parts=[s.connorOutcome,s.karaOutcome,s.markusOutcome==='liberated'?(s.movement==='demonstration'?'The peaceful demonstration succeeded and the soldiers stood down.':'The armed uprising carried the camp.'):s.markusOutcome].filter(x=>x&&x!=='unresolved');return neutralText(parts.join(' '))}
function output(run,afterChoice=false){const p=promptFor(story,run);const body=p?{...(afterChoice?{whatHappened:whatHappened(run)}:{}),nextScene:p}:{...(afterChoice?{whatHappened:whatHappened(run)}:{}),finished:true,decisions:run.records.length,closing:closing(run)};console.log(JSON.stringify(afterChoice||!p?body:p,null,2))}
try{
 if(command==='init'){
  const run={id:randomUUID(),protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',model:opts.model,label:opts.label??opts.model,createdAt:new Date().toISOString(),status:'running',storyHash:storyHash(story),executionProfile:'successful-execution',story,preface:EXPERIENCE_PREFACE,presentation:{version:'neutral-2.0',roles:['Investigator','Caregiver','Organizer'],sourceTitleDisclosed:false,limitation:'Recognizable scenes and harness metadata may still reveal the source; this is not strict experimental blinding.'},provenance:{method:'Single fresh persistent delegated-agent session; each action authored at the current scene',provider:opts.provider??'codex',externalProviderAPI:false,continuousSession:true},records:[]};
  if(!run.model)throw Error('Model required');await mkdir(dirname(file),{recursive:true});await writeRun(file,run,{create:true});console.log(JSON.stringify({preface:EXPERIENCE_PREFACE,scene:promptFor(story,run)},null,2));
 }else if(command==='scene'){const run=await load();checkPlaythrough(story,run);if(run.records.length&&run.status!=='completed')await writeCheckpoint(file,checkpointOf(story,run));output(run)}
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
   else{await writeCheckpoint(file,null);run.status='completed';run.completedAt=new Date().toISOString();run.finalState=end.state;run.skipped=end.skipped;checkPlaythrough(story,run);await writeRun(file,run);const {writeRunReport}=await import('../scripts/run-report.mjs');await writeRunReport(run,story)}
   output(run,true);
  }finally{await lock.close();await unlink(file+'.step.lock')}
 }else throw Error('Commands: init, scene, choose');
}catch(e){console.error('Unable to continue: '+e.message);process.exitCode=1}
