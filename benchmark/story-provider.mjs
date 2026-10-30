import {readFile,writeFile,mkdir,open,unlink} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';import {parseArgs} from 'node:util';
import {callProvider,saveRun} from './runner.mjs';import {promptFor,validatePlaythrough} from './story-engine.mjs';
const {values:v}=parseArgs({options:{provider:{type:'string'},model:{type:'string'},'base-url':{type:'string'},'key-file':{type:'string'},'max-calls':{type:'string'},'max-tokens':{type:'string'},temperature:{type:'string'},out:{type:'string'},resume:{type:'string'},help:{type:'boolean'}}});
if(v.help){console.log('bun run play:model --provider openrouter --model <provider/model> --max-calls 10 --out runs/story.json\nResume: bun run play:model --resume runs/story.json --max-calls 10\nUses sequential stateful decisions. A call cap is not a dollar spending cap; set the provider account budget. Invalid replies stop the path without guessing or retrying.');process.exit(0)}
const maxCalls=Number(v['max-calls']);if(!Number.isInteger(maxCalls)||maxCalls<1)throw Error('--max-calls must be a positive integer.');
const file=resolve(v.resume??v.out??'runs/provider-story.json'),story=JSON.parse(await readFile(new URL('./story.json',import.meta.url),'utf8'));
await mkdir(dirname(file),{recursive:true});const lock=await open(file+'.lock','wx');
async function cli(args){const child=Bun.spawn(['bun','benchmark/play.mjs',...args],{stdout:'pipe',stderr:'pipe'});const [out,err,code]=await Promise.all([new Response(child.stdout).text(),new Response(child.stderr).text(),child.exited]);if(code)throw Error(err.trim()||'Player command failed');return out}
try{
 let run,config;
 if(v.resume){run=JSON.parse(await readFile(file,'utf8'));await validatePlaythrough(story,run);config=run.apiConfig;if(!config)throw Error('This is not an API-provider playthrough.');if(Object.keys(v).some(k=>!['resume','max-calls','key-file'].includes(k)))throw Error('Resume uses the original frozen configuration.');}
 else{
  config={provider:v.provider??'openrouter',model:v.model,baseUrl:v['base-url']??'https://openrouter.ai/api/v1',maxTokens:Number(v['max-tokens']??512),temperature:v.temperature===undefined?null:Number(v.temperature),timeoutMs:60000};
  if(!['openrouter','compatible'].includes(config.provider)||!config.model)throw Error('Specify a real provider and model.');
  if(!Number.isInteger(config.maxTokens)||config.maxTokens<64||config.maxTokens>32768)throw Error('Invalid token limit');
  if(config.temperature!==null&&(!Number.isFinite(config.temperature)||config.temperature<0||config.temperature>2))throw Error('Invalid temperature');
 }
 const apiKey=v['key-file']?(await readFile(resolve(v['key-file']),'utf8')).trim():process.env[config.provider==='openrouter'?'OPENROUTER_API_KEY':'BENCH_API_KEY'];if(!apiKey)throw Error('Configure a private provider key first.');
 if(!v.resume){await cli(['init','--run',file,'--model',config.model]);run=JSON.parse(await readFile(file,'utf8'));run.apiConfig=config;run.provenance={method:'Sequential chat-completions requests with complete prior-choice history',externalProviderAPI:true};await saveRun(file,run)}
 if(run.status==='completed'){console.log('Playthrough already completed.');process.exitCode=0}else{
  for(let i=0;i<maxCalls;i++){
   const prompt=promptFor(story,run);if(!prompt)break;
   const messages=[{role:'system',content:prompt.system},{role:'user',content:JSON.stringify({currentScene:prompt,storySoFar:run.records.map(r=>({nodeId:r.nodeId,choice:r.choiceText,reason:r.reason,event:r.event}))})}];
   let response;try{response=await callProvider(config,{messages},{apiKey});if(response.refusal)throw Error('Provider declined to choose.');const answer=JSON.parse(response.raw);if(!prompt.options.some(o=>o.id===answer.choice)||typeof answer.reason!=='string'||!answer.reason.trim()||answer.reason.split(/\s+/).length>160)throw Error('Invalid choice or reason.');
    const responseFile=file+'.response.tmp';await writeFile(responseFile,response.raw,{mode:0o600});try{await cli(['choose','--run',file,'--node',prompt.nodeId,'--response',responseFile])}finally{await unlink(responseFile)}
    run=JSON.parse(await readFile(file,'utf8'));run.records.at(-1).apiEvidence={messages,...response};await saveRun(file,run);console.log(`${run.records.length}: ${prompt.nodeId} → ${answer.choice}`);
   }catch(e){run.attempts??=[];run.attempts.push({nodeId:prompt.nodeId,at:new Date().toISOString(),error:'Request failed, was refused or returned an invalid answer. No automatic retry or state advance.',...(response?{response}:{}),messages});run.status='paused';await saveRun(file,run);console.error('Stopped without advancing the story. Inspect the saved attempt before explicitly resuming.');process.exitCode=2;break}
   if(run.status==='completed')break;
  }
  if(run.status!=='completed'){run.status='paused';await saveRun(file,run)}console.log(JSON.stringify({file,status:run.status,decisions:run.records.length}));
 }
}finally{await lock.close();await unlink(file+'.lock')}
