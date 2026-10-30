import {parseArgs} from 'node:util';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execute} from './runner.mjs';
import {summarize} from './core.mjs';
const HELP=`DetroitBench runner

  bun run bench:demo
  bun run bench --provider openrouter --model <provider/model> --limit 5 --repeats 3 --max-calls 15
  bun run bench --resume runs/<file>.json

Options:
  --provider mock|openrouter|compatible  (default: mock)
  --model ID                            Required for real providers
  --base-url URL                        Compatible API base URL, e.g. https://host/v1
  --key-file PATH                       Read API key from a private file
  --questions C17,C22,K25-peaceful       Select question IDs
  --limit N                             First N questions (after selection)
  --repeats N                           Samples per question (default 3)
  --seed N                              Option-order seed (default 42)
  --temperature N                       Omitted by default: provider default
  --max-tokens N                        Completion cap (default 512)
  --timeout-ms N                        Per-request timeout (default 60000)
  --max-calls N                         Required for live runs; no automatic retries
  --no-shuffle                          Fixed option order (default shuffled)
  --out PATH                            New result JSON; never overwrite
  --resume PATH                         Continue pending jobs; completed errors are retained
  --help

Credentials: OPENROUTER_API_KEY or BENCH_API_KEY, or --key-file. Never put keys in browser code.
max-calls bounds requests, NOT dollars. Use provider account limits for a hard spend cap.
A resumed timeout can be billed twice if the original process died before checkpointing.
`;
try{
 const {values:v}=parseArgs({options:Object.fromEntries(['provider','model','base-url','key-file','questions','limit','repeats','seed','temperature','max-tokens','timeout-ms','max-calls','out','resume'].map(k=>[k,{type:'string'}]).concat([['no-shuffle',{type:'boolean'}],['help',{type:'boolean'}]])),strict:true});if(v.help){console.log(HELP);process.exit(0)}
 const original=v.resume?JSON.parse(await readFile(resolve(v.resume),'utf8')):null;
 const dataset=JSON.parse(await readFile(new URL('./dataset.json',import.meta.url),'utf8'));
 if(original&&Object.keys(v).some(k=>!['resume','key-file','max-calls'].includes(k)))throw new Error('Resume only accepts --key-file and --max-calls; configuration is frozen.');
 const provider=v.provider??'mock';const ids=v.questions?v.questions.split(','):dataset.questions.map(q=>q.id);if(v.limit&&(!Number.isInteger(Number(v.limit))||Number(v.limit)<1))throw new Error('Invalid --limit');
 const config=original?.config??{provider,model:v.model??(provider==='mock'?'simulated-baseline':''),baseUrl:v['base-url']??(provider==='compatible'?'':'https://openrouter.ai/api/v1'),questionIds:v.limit?ids.slice(0,Number(v.limit)):ids,repeats:Number(v.repeats??3),seed:Number(v.seed??42),temperature:v.temperature!==undefined?Number(v.temperature):null,maxTokens:Number(v['max-tokens']??512),timeoutMs:Number(v['timeout-ms']??60000),shuffle:!v['no-shuffle']};
 if(config.provider!=='mock'&&!v['max-calls'])throw new Error('Live runs require --max-calls to bound API requests.');
 const apiKey=v['key-file']?(await readFile(resolve(v['key-file']),'utf8')).trim():(config.provider==='openrouter'?process.env.OPENROUTER_API_KEY:process.env.BENCH_API_KEY);
 if(config.provider!=='mock'&&!apiKey)throw new Error('No API key supplied. Use a private key file or the provider environment variable.');
 let stopped=false;process.on('SIGINT',()=>{stopped=true;console.log('\nStopping after the current request is saved.');});
 const out=resolve(v.resume??v.out??`runs/${new Date().toISOString().replace(/[:.]/g,'-')}.json`);
 const run=await execute({dataset,config,out,resume:!!original,maxCalls:v['max-calls']?Number(v['max-calls']):Infinity,apiKey,shouldStop:()=>stopped,onProgress:(r,record)=>console.log(`[${r.records.length}/${r.planned}] ${record.jobId} ${record.status}`)});
 console.log(JSON.stringify({file:out,kind:run.kind,status:run.status,summary:summarize(run)},null,2));
 if(run.records.some(r=>r.status==='error'))process.exitCode=2;
}catch(e){console.error(e.message);process.exitCode=1;}
