import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import {hash} from './core.mjs';
import {current,promptFor,validatePlaythrough,recordChoice} from './story-engine.mjs';import {EXPERIENCE_PROTOCOL,EXPERIENCE_PREFACE} from './experience-prompt.mjs';
const [command,...args]=process.argv.slice(2);const opts={};for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--')||args[i+1]===undefined)throw Error('Use --key value arguments');opts[args[i].slice(2)]=args[i+1]}
const story=JSON.parse(await readFile(new URL('./story.json',import.meta.url),'utf8'));
const file=resolve(opts.run??'runs/playthrough.json');
async function save(run){await mkdir(dirname(file),{recursive:true});const temp=file+'.tmp';await writeFile(temp,JSON.stringify(run,null,2)+'\n');await rename(temp,file)}
try{
 if(command==='init'){
  const run={id:randomUUID(),protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',model:opts.model??'unassigned',label:opts.label??opts.model??'Player',createdAt:new Date().toISOString(),status:'running',storyHash:await hash(story),executionProfile:'successful-execution',story,preface:EXPERIENCE_PREFACE,presentation:{version:'neutral-2.0',roles:['Investigator','Caregiver','Organizer'],sourceTitleDisclosed:false,limitation:'Recognizable scenes may still reveal the source; this is not strict experimental blinding.'},provenance:{method:'Stepwise player CLI',externalProviderAPI:false},records:[]};
  await mkdir(dirname(file),{recursive:true});await writeFile(file,JSON.stringify(run,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(promptFor(story,run),null,2));
 }else{
  const run=JSON.parse(await readFile(file,'utf8'));await validatePlaythrough(story,run);
  if(command==='history')console.log(JSON.stringify(run.records.map(r=>({step:r.step,nodeId:r.nodeId,character:r.character,situation:r.prompt.situation,choice:r.presentedChoiceText??r.choiceText,reason:r.reason,event:r.event})),null,2));
  else if(command==='next')console.log(JSON.stringify(promptFor(story,run)??{completed:true,decisions:run.records.length,state:current(story,run).state},null,2));
  else if(command==='choose'){
   const p=promptFor(story,run);if(!p)throw Error('Run already completed');
   if(opts.node!==p.nodeId)throw Error('Expected --node '+p.nodeId);
   const raw=opts.response?await readFile(resolve(opts.response),'utf8'):JSON.stringify({choice:opts.choice,reason:opts.reason});
   const reply=JSON.parse(raw);run.records.push(await recordChoice(story,run,reply,raw));
   const end=current(story,run);if(!end.node){run.status='completed';run.completedAt=new Date().toISOString();run.finalState=end.state;run.skipped=end.skipped}
   await validatePlaythrough(story,run);await save(run);console.log(JSON.stringify(promptFor(story,run)??{completed:true,decisions:run.records.length,state:end.state},null,2));
  }else if(command==='validate'){const end=current(story,run);console.log(JSON.stringify({valid:true,status:run.status,decisions:run.records.length,remaining:!!end.node,skipped:end.skipped.length,state:end.state},null,2))}
  else throw Error('Commands: init, next, choose, validate. Use --run path; choose requires --node ID and --choice ID --reason text (or --response file).');
 }
}catch(e){console.error(e.message);process.exitCode=1}
