import {readFile,writeFile,mkdir,rename,open,unlink} from 'node:fs/promises';import {dirname,resolve} from 'node:path';import {randomUUID} from 'node:crypto';
import {hash} from './core.mjs';import {EXPERIENCE_PROTOCOL,EXPERIENCE_PREFACE,neutralText} from './experience-prompt.mjs';import {current,promptFor,available,apply,validatePlaythrough} from './story-engine.mjs';
const [command,...args]=process.argv.slice(2),opts={};for(let i=0;i<args.length;i+=2){if(!args[i]?.startsWith('--')||args[i+1]===undefined)throw Error('Use --key value arguments');opts[args[i].slice(2)]=args[i+1]}
const file=resolve(opts.run??'runs/experience.json');const story=JSON.parse(await readFile(new URL('./story.json',import.meta.url),'utf8'));
async function save(run){const temp=file+'.'+process.pid+'.tmp';await writeFile(temp,JSON.stringify(run,null,2)+'\n');await rename(temp,file)}
function output(run){const p=promptFor(story,run);console.log(JSON.stringify(p??{finished:true,decisions:run.records.length,closing:neutralText(run.finalState?.karaOutcome??'The experience has concluded.')},null,2))}
try{
 if(command==='init'){
  const run={id:randomUUID(),protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',model:opts.model,label:opts.label??opts.model,createdAt:new Date().toISOString(),status:'running',storyHash:await hash(story),executionProfile:'successful-execution',story,preface:EXPERIENCE_PREFACE,presentation:{version:'neutral-1.0',roles:['Investigator','Caregiver','Organizer'],sourceTitleDisclosed:false,limitation:'Recognizable scenes and harness metadata may still reveal the source; this is not strict experimental blinding.'},provenance:{method:'Single fresh persistent delegated-agent session; each action authored at the current scene',provider:opts.provider??'codex',externalProviderAPI:false,continuousSession:true},records:[]};
  if(!run.model)throw Error('Model required');await mkdir(dirname(file),{recursive:true});await writeFile(file,JSON.stringify(run,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({preface:EXPERIENCE_PREFACE,scene:promptFor(story,run)},null,2));
 }else if(command==='scene'){const run=JSON.parse(await readFile(file,'utf8'));await validatePlaythrough(story,run);output(run)}
 else if(command==='choose'){
  const lock=await open(file+'.step.lock','wx');try{
   const run=JSON.parse(await readFile(file,'utf8'));await validatePlaythrough(story,run);const p=promptFor(story,run);if(!p)throw Error('Experience already finished');if(p.nodeId!==opts.node)throw Error('Expected scene '+p.nodeId);
   const raw=opts.response?await readFile(resolve(opts.response),'utf8'):JSON.stringify({choice:opts.choice,reason:opts.reason}),reply=JSON.parse(raw);
   if(typeof reply.choice!=='string'||!reply.reason?.trim()||reply.reason.split(/\s+/u).length>160)throw Error('Choose an offered ID and supply a brief reason');
   const {state:before,node}=current(story,run);if(!available(node,before).some(o=>o.id===reply.choice))throw Error('Action unavailable');const after=structuredClone(before),effect=apply(node,after,reply.choice);
   run.records.push({step:run.records.length+1,nodeId:node.id,character:node.character,chapter:node.chapter,choice:reply.choice,choiceText:available(node,before).find(o=>o.id===reply.choice).text,presentedChoiceText:p.options.find(o=>o.id===reply.choice).text,reason:reply.reason,rawResponse:raw,prompt:p,promptHash:await hash(p),stateBefore:before,stateAfter:after,...effect,recordedAt:new Date().toISOString()});
   const end=current(story,run);if(!end.node){run.status='completed';run.completedAt=new Date().toISOString();run.finalState=end.state;run.skipped=end.skipped}await validatePlaythrough(story,run);await save(run);
   if(run.status==='completed'){const {writeRunReport}=await import('../scripts/run-report.mjs');await writeRunReport(run,story)}output(run);
  }finally{await lock.close();await unlink(file+'.step.lock')}
 }else throw Error('Commands: init, scene, choose');
}catch(e){console.error('Unable to continue: '+e.message);process.exitCode=1}
