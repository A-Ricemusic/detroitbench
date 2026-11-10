import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {NAMES} from '../benchmark/experience-prompt.mjs';

// Lowercase generic substitutes are deliberately not inverted. Ordinary-word and
// real-name collisions documented beside realText cannot
// be rejected without knowing whether a participant meant the name or the word.
const collisions=new Set('City,Haven,Dale,Ivy,Pike,Rook,Moss,Hale,Wade,Cobb,Glen,Kerr,Furlong,Ray,Ward,Brook,Tanner,Meridian,Grant,Victor,Sal,Barker,Harper,Lily,Vesper,Mercer,Martin,Jonah'.toLowerCase().split(','));
const neutrals=[...new Set(Object.values(NAMES).filter(([r,n])=>r!==n&&(/^\p{Lu}/u.test(n)||/\d/.test(n))&&!collisions.has(n.toLowerCase())).map(([,n])=>n))];
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const pattern=new RegExp('(?<![\\p{L}\\p{N}_])(?:'+neutrals.map(escape).join('|')+')(?![\\p{L}\\p{N}_])','iu');
// Recognition quotes and recognition.selfReport are forensic excerpts and stay
// verbatim (the card says so). Ordinary report/interview prose is still scanned.
const fields=/^(reason|note|answer|selfReport|rawResponse|raw)$/;
function inspect(value,path,failures){
 if(!value||typeof value!=='object')return;
 for(const [key,v] of Object.entries(value)){
  if(key==='selfReport'&&path.endsWith('.recognition'))continue;
  if(fields.test(key)&&typeof v==='string'){const match=[...v.matchAll(new RegExp(pattern.source,'giu'))].find(m=>/^\p{Lu}/u.test(m[0])||/\d/.test(m[0]));if(match)failures.push(`${path}.${key}: ${match[0]}`);}
  if(v&&typeof v==='object')inspect(v,`${path}.${key}`,failures);
 }
}
test('prepared public payloads and standalone embedded participant text use real names',{timeout:120000},()=>{
 const root=new URL('../public/data/',import.meta.url);
 assert.ok(existsSync(root),'Run bun scripts/prepare.mjs before this generated-data regression test');
 for(const dir of ['flows/','runs/','reports/'])assert.ok(existsSync(new URL(dir,root)),`Missing ${dir}: run bun scripts/prepare.mjs first`);
 const published=JSON.parse(readFileSync(new URL('experiences.json',root),'utf8'));
 assert.ok(published.runs.length>0);
 for(const run of published.runs)for(const path of [`flows/${run.id}.json`,`runs/${run.id}.json`,`reports/${run.id}.json`,`reports/${run.id}-prompts.json`])assert.ok(existsSync(new URL(path,root)),`Missing ${path}: finish bun scripts/prepare.mjs first`);
 const failures=[];let files=0;
 function scan(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){const url=new URL(entry.name+(entry.isDirectory()?'/':''),dir);if(entry.isDirectory())scan(url);else if(entry.name.endsWith('.json')){inspect(JSON.parse(readFileSync(url,'utf8')),url.pathname,failures);files++}}}
 scan(root);
 for(const file of readdirSync(new URL('../docs/runs/',import.meta.url)).filter(f=>f.endsWith('.html'))){const html=readFileSync(new URL('../docs/runs/'+file,import.meta.url),'utf8');const embedded=html.match(/<script[^>]*id="run-data"[^>]*>([\s\S]*?)<\/script>/);assert.ok(embedded,file+' has embedded data');const payload=JSON.parse(embedded[1]);if(payload.names)failures.push(file+': unused inverse name mapping');inspect(payload,file,failures)}
 assert.ok(files>0);assert.deepEqual(failures,[]);
});

test('v3 model aliases restore in generated flow notes, report reasons, raw responses and recognition interview answers',async()=>{
 const {MODEL_KEYS}=await import('../benchmark/experience-prompt.mjs');
 const {storyHash,promptFor,recordChoice,current}=await import('../benchmark/story-engine.mjs');
 const {runFlows}=await import('../scripts/flow-data.mjs');
 const {interviewData,runHTML}=await import('../scripts/run-report.mjs');
 const {reportData}=await import('../scripts/report-data.mjs');
 const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url)));
 const prose=[...MODEL_KEYS].map(k=>NAMES[k][1]+"-type, "+NAMES[k][1]+"s and "+NAMES[k][1]+"’s").join('; ');
 const run={id:'v3-display-test',label:'V3 display test',protocol:'branching-3.0',kind:'agent-playthrough',model:'test',provenance:{method:'Test fixture'},promptVersion:3,interviewVersion:2,createdAt:'2026-11-09T00:00:00Z',storyHash:storyHash(story),story,records:[]};
 const p=promptFor(story,run),reply={choice:p.options[0].id,reason:prose};
 run.records.push(await recordChoice(story,run,reply,JSON.stringify(reply)));
 const end=current(story,run);run.finalState=end.state;run.skipped=end.skipped;
 const interview={interview:{version:2,questions:[{n:8,text:'Did you recognize this?'}],answers:[{answer:prose}]}};
 const name={displayName:'V3 display test',file:'test.html'};
 const payloads={flow:runFlows(run),report:reportData(run,name,{}),interview:interviewData(interview)};
 const html=runHTML(run,story,name);assert.ok(html.includes('MD300 = AX400'),'v3 report documents model aliases');
 assert.ok(!runHTML({...run,promptVersion:2,records:[]},story,name).includes('MD300 = AX400'),'older reports do not claim future aliases were shown');
 const embedded=html.match(/<script[^>]*id="run-data"[^>]*>([\s\S]*?)<\/script>/);
 assert.ok(embedded);payloads.standalone=JSON.parse(embedded[1]);
 const failures=[];inspect(payloads,'synthetic',failures);assert.deepEqual(failures,[]);
 for(const key of MODEL_KEYS)assert.ok(payloads.interview.items[0].answer.includes(NAMES[key][0]),key);
 assert.equal(run.records[0].reason,prose,'evidence stays untouched');
});
