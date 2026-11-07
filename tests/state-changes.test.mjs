// State changes are prose everywhere they are shown (scripts/change-format.mjs): the in-app report's node panel and the
// question bank's feedback. Renders every change of every record of every completed run, and every change the question
// bank's feedback describes, and rejects anything that looks like JSON.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFileSync,readdirSync} from 'node:fs';
import {changeFormatter} from '../scripts/report-data.mjs';
import {assembleFeedback} from '../scripts/dataset-assemble.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
const formatChange=changeFormatter();
const JSONISH=/[{}]|"[^"\s]+"\s*:/;
const strings=e=>[e.label,e.text,...(e.lines??[]),...(e.facts??[])].filter(s=>s!==undefined);
const check=(entries,where)=>{for(const e of entries){assert.ok(typeof e.label==='string'&&e.label.trim(),where+': empty label');assert.ok(e.text!==undefined||e.lines?.length||e.facts?.length,where+': no value');
 for(const s of strings(e)){assert.equal(typeof s,'string',where);assert.ok(!JSONISH.test(s),`${where}: ${e.label} reads like JSON: ${s}`)}}};

test('the broadcast speech change reads as the demand that was added',()=>{
 assert.deepEqual(formatChange({key:'stratfordSpeech',before:{opening:'calm',first:'endOfSlavery'},after:{opening:'calm',first:'endOfSlavery',second:'justice'}}),[{label:'The broadcast speech',lines:['Second demand: Justice']}]);
 assert.deepEqual(formatChange({key:'hankTrust',before:-1,after:1}),[{label:'Hank',text:'Tense → Neutral (+2)'}]);
 assert.deepEqual(formatChange({key:'knowledge',added:{Connor:['A fact.']}}),[{label:'Connor learns',facts:['A fact.']}]);
 assert.deepEqual(formatChange({key:'ch07Next',before:null,after:'K03u'}),[{label:'Ch07 Next',text:'— → K03u',unlabeled:'ch07Next'}]);
});

test('every state change of every completed run renders as prose',()=>{
 const dir=new URL('../data/experiences/',import.meta.url);let runs=0,changes=0;
 for(const f of readdirSync(dir).filter(f=>f.endsWith('.json'))){let run;try{run=JSON.parse(readFileSync(new URL(f,dir),'utf8'))}catch{continue} // a session may be mid-write
  if(run.status!=='completed')continue;runs++;
  for(const r of run.records)for(const c of r.changes){changes++;check(formatChange(JSON.parse(render(JSON.stringify(c),'real'))),`${run.id} step ${r.step} ${c.key}`)}}
 assert.ok(runs===0||changes>0);
});

test('every state change in the question bank feedback renders as prose',{timeout:600000},()=>{
 const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8')),fb=assembleFeedback(story,[]);let n=0;
 for(const [id,scene] of Object.entries(fb))for(const [opt,o] of Object.entries(scene.options))for(const r of o.results??[]){n+=r.changes.length;check(r.changes,`${id} option ${opt}`)}
 assert.ok(n>0);
});
