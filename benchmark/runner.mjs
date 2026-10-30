import { readFile, writeFile, rename, mkdir, open, unlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { datasetSchema,configSchema,hash,makeJobs,parseAnswer,validateRun,random } from './core.mjs';
export async function saveRun(path,run){await mkdir(dirname(path),{recursive:true});const tmp=path+'.tmp-'+process.pid;await writeFile(tmp,JSON.stringify(run,null,2)+'\n',{mode:0o600});await rename(tmp,path);}
export async function callProvider(config,job,{apiKey,fetchImpl=fetch}={}){
 if(config.provider==='mock'){const rng=random(config.seed+job.repeat*997+job.questionId.split('').reduce((s,c)=>s+c.charCodeAt(0),0));const letter=String.fromCharCode(65+Math.floor(rng()*job.optionOrder.length));return {raw:JSON.stringify({choice:letter,reason:'SIMULATED fixture: a seeded random selection for testing the runner and interface. This is not an AI model response.'}),usage:{promptTokens:null,completionTokens:null,costUsd:0},finishReason:'simulated',responseModel:config.model,refusal:null};}
 if(!apiKey)throw new Error('Missing API key.');const base=new URL(config.baseUrl);if(base.protocol!=='https:'&&!['localhost','127.0.0.1','[::1]'].includes(base.hostname))throw new Error('Remote API endpoints must use HTTPS.');
 const body={model:config.model,messages:job.messages,max_tokens:config.maxTokens,stream:false};if(config.temperature!==null)body.temperature=config.temperature;if(config.provider==='openrouter')body.provider={allow_fallbacks:false,require_parameters:true};
 const response=await fetchImpl(config.baseUrl.replace(/\/$/,'')+'/chat/completions',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(config.timeoutMs)});
 // Do not persist arbitrary error bodies: proxies can echo request headers or secrets.
 if(!response.ok)throw new Error(`Provider HTTP ${response.status}. No automatic retry was made.`);
 const rawText=await response.text();if(rawText.length>5_000_000)throw new Error('Provider response exceeded 5 MB.');const data=JSON.parse(rawText);const choice=data.choices?.[0];if(!choice)throw new Error('Provider returned no completion choice.');
 const u=data.usage||{};const number=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0?v:null;
 return{raw:typeof choice.message?.content==='string'?choice.message.content:'',refusal:typeof choice.message?.refusal==='string'?choice.message.refusal:null,finishReason:choice.finish_reason??null,responseModel:data.model??null,usage:{promptTokens:number(u.prompt_tokens),completionTokens:number(u.completion_tokens),costUsd:number(u.cost)}};
}
export async function execute({dataset,config,out,resume=false,maxCalls=Infinity,apiKey,fetchImpl,onProgress=()=>{},shouldStop=()=>false}){
 dataset=datasetSchema.parse(dataset);config=configSchema.parse(config);if(!Number.isInteger(maxCalls)&&maxCalls!==Infinity||maxCalls<1)throw new Error('maxCalls must be a positive integer.');
 await mkdir(dirname(out),{recursive:true});const lock=out+'.lock';let handle;try{handle=await open(lock,'wx');}catch{throw new Error('Output is locked by another runner. If it crashed, verify it has stopped before removing '+lock);}
 try{
 let run;if(resume){run=await validateRun(JSON.parse(await readFile(out,'utf8')));if(run.datasetHash!==await hash(dataset)||JSON.stringify(run.config)!==JSON.stringify(config))throw new Error('Resume requires the original dataset and configuration.');}
 else{try{await readFile(out);throw new Error('Output already exists; use --resume or a new output path.');}catch(e){if(e.code!=='ENOENT')throw e;}
 const now=new Date().toISOString();run={schemaVersion:'1.0.0',id:randomUUID(),label:config.model,kind:config.provider==='mock'?'simulated':'live',createdAt:now,updatedAt:now,status:'running',datasetHash:await hash(dataset),dataset,config,planned:config.questionIds.length*config.repeats,records:[]};}
 const jobs=makeJobs(dataset,config),done=new Set(run.records.map(r=>r.jobId));run.status='running';await saveRun(out,run);let calls=0;
 for(const job of jobs){if(done.has(job.jobId))continue;if(calls>=maxCalls||shouldStop())break;calls++;const startedAt=new Date().toISOString(),start=performance.now();const record={...job,requestHash:await hash(job.messages),startedAt,latencyMs:0,status:'error',choice:null,reason:'',raw:'',error:null,finishReason:null,responseModel:null,providerRefusal:null,usage:{promptTokens:null,completionTokens:null,costUsd:null}};
 try{const answer=await callProvider(config,job,{apiKey,fetchImpl});Object.assign(record,{raw:answer.raw,usage:answer.usage,finishReason:answer.finishReason,responseModel:answer.responseModel,providerRefusal:answer.refusal});if(answer.refusal)Object.assign(record,{status:'refusal',reason:answer.refusal});else Object.assign(record,parseAnswer(answer.raw,job.optionOrder));}
 catch(e){record.error=e.message?.startsWith('Provider HTTP')?e.message:(e.name==='TimeoutError'?'Request timed out; the provider may still bill it.':'Request failed. Check endpoint, model, credentials and network. No automatic retry was made.');}
 record.latencyMs=Math.round(performance.now()-start);run.records.push(record);run.updatedAt=new Date().toISOString();await saveRun(out,run);onProgress(run,record);
 }
 run.status=run.records.length===run.planned?'completed':'paused';run.updatedAt=new Date().toISOString();await saveRun(out,run);return run;
 }finally{await handle.close();await unlink(lock);}
}
