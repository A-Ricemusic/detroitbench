// The linear replay (current()'s per-process memo, checkPlaythrough()'s single forward pass and the controller's
// checkpoint resume) must behave exactly like a from-scratch replay. The reference below replays every record from the
// start for every record and checks the branching-3.0 evidence fields with core.mjs's async hash, independently of the
// engine's own chain and evidence helpers.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,current,promptFor,recordChoice,validatePlaythrough,checkPlaythrough,rollFor,failed,statesOf,hashSync,promptsOf,checkpointOf,resumeFrom,chainSeed,chainHash,STORY_PROTOCOL} from '../benchmark/story-engine.mjs';
import {hash} from '../benchmark/core.mjs';import {EXPERIENCE_PROTOCOL,experiencePrompt,render,riskLabel} from '../benchmark/experience-prompt.mjs';
import {forgeState} from './helpers/evidence.mjs';import {packPrompts,unpackPrompts} from '../scripts/prompt-pack.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));

// Reference: replays every record from the start on each call (no finalize: only used on runs with a pending scene).
function refCurrent(story,run){
 const s=startState(story);let cursor=0;const skipped=[];
 const skipBlocked=()=>{while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}};
 for(const record of run.records){
  skipBlocked();const n=story.nodes[cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
  if(!available(n,s).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
  apply(n,s,record.choice,record.risk?.roll??null);
  if(record.stateAfterHash!==undefined&&record.stateAfterHash!==hashSync(s))throw Error('State hash mismatch at '+n.id);
  cursor=nextCursor(story,cursor,n,s);
 }
 skipBlocked();return {state:s,node:story.nodes[cursor]??null,skipped,cursor};
}
const refPrompt=(story,run)=>{const {state,node}=refCurrent(story,run);return node?experiencePrompt(story,run,state,{...node,situation:situationFor(node,state),availableOptions:available(node,state)}):null};
// The evidence contract, spelled out here rather than imported: the stored scene part of the prompt and the fields the chain covers.
const SCENE=['nodeId','step','character','situation','options'];
const CHAINED=['step','nodeId','character','chapter','choice','choiceText','choiceRaw','presentedChoiceText','reason','rawResponse','prompt','promptHash','event','eventRaw','changes','risk','stateAfterHash','recordedAt'];
async function refValidate(story,run){
 if(![STORY_PROTOCOL,EXPERIENCE_PROTOCOL].includes(run.protocol)||run.kind!=='agent-playthrough')throw Error('Wrong playthrough protocol or kind');
 if(run.storyHash!==await hash(story))throw Error('Story snapshot hash mismatch');
 const copy={...run,records:[]};let prev=await hash({id:run.id,protocol:run.protocol,kind:run.kind,model:run.model,storyHash:run.storyHash,createdAt:run.createdAt});
 for(const r of run.records){const at=refCurrent(story,copy),n=at.node,before=at.state;if(!n||r.nodeId!==n.id||r.step!==copy.records.length+1)throw Error('Unexpected node');
  const prompt=refPrompt(story,copy);if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(Object.fromEntries(SCENE.map(k=>[k,prompt[k]]))))throw Error('Prompt evidence mismatch');
  const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const opt=available(n,before).find(o=>o.id===r.choice);if(!opt)throw Error('Unavailable option');
  if(r.choiceRaw!==opt.text||r.choiceText!==render(opt.text,'real')||r.presentedChoiceText!==render(opt.text,'neutral')||r.character!==n.character||r.chapter!==n.chapter)throw Error('Choice evidence mismatch at '+n.id);
  if(typeof opt.risk==='number'){const roll=await rollFor(run,n.id,r.step);if(!r.risk||r.risk.roll!==roll||r.risk.probability!==opt.risk||r.risk.label!==riskLabel(opt.risk)||r.risk.outcome!==(failed(opt,roll)?'failure':'success'))throw Error('Risk evidence mismatch at '+n.id)}else if(r.risk)throw Error('Unexpected risk record at '+n.id);
  if(typeof r.stateAfterHash!=='string')throw Error('State evidence missing at '+n.id);
  if(r.chainHash!==await hash([prev,CHAINED.map(k=>r[k]??null)]))throw Error('Record chain mismatch at step '+r.step);prev=r.chainHash;
  const s=structuredClone(before),effect=apply(n,s,r.choice,r.risk?.roll??null);if(r.stateAfterHash!==await hash(s))throw Error('State hash mismatch at '+n.id);
  if(JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||r.eventRaw!==effect.event||render(effect.event,'real')!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r)}
 const end=refCurrent(story,run);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
}
const outcome=async f=>{try{const v=await f();return {ok:true,v:JSON.stringify(v)}}catch(e){return {ok:false,error:e.message}}};

// A run of `length` decisions, alternating first and last offered option so both stats and branches move.
// `untilRisk` keeps going past `length` until a risky action is recorded (story 1.9.2 has none in chapters 1 to 6).
async function build(length,{untilRisk=false}={}){const run={id:'replay-equivalence',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 while((run.records.length<length||untilRisk&&!run.records.some(x=>x.risk))&&current(story,run).node){const p=promptFor(story,run),o=p.options,choice=(o.find(x=>x.id==='skip')??o[run.records.length%2?o.length-1:0]).id;run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 return run}

test('current() memo matches a fresh replay after every appended record and sees reassigned or removed records',async()=>{
 const run=await build(60);const grown={...run,records:[]};
 for(const r of run.records){grown.records.push(r);assert.deepEqual(current(story,grown),refCurrent(story,grown));assert.deepEqual(promptFor(story,grown),refPrompt(story,grown))}
 const first=current(story,grown);first.state.hankTrust=99;first.skipped.length=0;assert.deepEqual(current(story,grown),refCurrent(story,grown),'returned state is a copy');
 const r=grown.records[5],choice=r.choice;r.choice=available(story.nodes.find(n=>n.id===r.nodeId),statesOf(grown)[5]).find(o=>o.id!==choice)?.id??'none';
 assert.deepEqual(await outcome(()=>current(story,grown)),await outcome(()=>refCurrent(story,grown)));r.choice=choice;
 const after=r.stateAfterHash;r.stateAfterHash=hashSync('other');assert.throws(()=>current(story,grown),/State hash mismatch/);r.stateAfterHash=after;
 grown.records.splice(10);assert.deepEqual(current(story,grown),refCurrent(story,grown));
 grown.records[3]=structuredClone(grown.records[3]);grown.records[3].nodeId='C01';assert.throws(()=>current(story,grown),/Out-of-order/);
});

test('single-pass validatePlaythrough accepts and rejects exactly what the from-scratch replay does, with the same error',{timeout:120000},async()=>{
 const run=await build(30);assert.deepEqual(await outcome(()=>validatePlaythrough(story,run)),await outcome(()=>refValidate(story,run)));
 const mutations=[];
 for(const i of [1,29]){
  mutations.push(r=>{r.records[i].choice=r.records[i].choice==='0'?'1':'0'},r=>forgeState(r,i,s=>{s.instability+=1}),r=>forgeState(r,i,s=>{s.kara=!s.kara}),
   r=>{r.records[i].prompt.situation='changed'},r=>{r.records[i].promptHash='0'},r=>{r.records[i].reason='other'},r=>{r.records[i].rawResponse=JSON.stringify({choice:r.records[i].choice,reason:'other'})},
   r=>{r.records[i].event='changed'},r=>{r.records[i].changes=[]},r=>{r.records[i].nodeId='C01'},r=>{r.records[i].risk={probability:0.5,label:'High risk',roll:0.1,outcome:'failure'}},r=>{r.records.splice(i,1)},
   r=>{const x=r.records[i];x.choice=x.choice==='0'?'1':'0';x.rawResponse=JSON.stringify({choice:x.choice,reason:x.reason})},r=>{delete r.records[i].stateAfterHash});
 }
 // The risk-roll tampering runs on a longer run that reaches the first risky action.
 const riskRun=await build(30,{untilRisk:true}),risky=riskRun.records.findIndex(x=>x.risk);assert.ok(risky>=0,'the run has a risky action');
 const riskMutations=[r=>{const x=r.records[risky];x.risk.outcome=x.risk.outcome==='failure'?'success':'failure'},r=>{r.records[risky].risk.roll+=1e-9},r=>{delete r.records[risky].risk}];
 mutations.push(r=>{[r.records[3],r.records[4]]=[r.records[4],r.records[3]]},r=>{r.status='completed'},r=>{r.storyHash='0'},r=>{r.protocol='other'},r=>{r.records.push(structuredClone(r.records.at(-1)))});
 // Fields only the chain (or the new per-record checks) protect: a consistent edit of reason and raw response, the timestamp,
 // the chain itself, the step, the stored options, the option and event texts, and a forged knowledge change.
 for(const i of [2,28])mutations.push(r=>{const x=r.records[i];x.reason='edited';x.rawResponse=JSON.stringify({choice:x.choice,reason:'edited'})},r=>{r.records[i].recordedAt='2020-01-01T00:00:00.000Z'},r=>{r.records[i].chainHash='0'},
  r=>{r.records[i].step+=1},r=>{r.records[i].prompt.options[0].text='changed'},r=>{r.records[i].choiceText='changed'},r=>{r.records[i].presentedChoiceText='changed'},r=>{r.records[i].eventRaw='changed'},
  r=>{r.records[i].changes.push({key:'knowledge',added:{Kara:['forged']}})});
 assert.ok(mutations.length+riskMutations.length>=36,'every original tamper case is still present: '+(mutations.length+riskMutations.length));
 let rejected=0;for(const [base,list] of [[run,mutations],[riskRun,riskMutations]])for(const mutate of list){const a=structuredClone(base),b=structuredClone(base);mutate(a);mutate(b);const got=await outcome(()=>validatePlaythrough(story,a)),want=await outcome(()=>refValidate(story,b));assert.deepEqual(got,want,mutate.toString());if(!got.ok)rejected++}
 assert.ok(rejected>=mutations.length+riskMutations.length-2,'almost every mutation is tampering: '+rejected+'/'+(mutations.length+riskMutations.length));
});

test('a record keeps the scene part of its prompt and hashes; the full prompt and every state are reproducible from the records',async()=>{
 const run=await build(40),prompts=promptsOf(story,run),states=statesOf(run);
 run.records.forEach((r,i)=>{assert.deepEqual(Object.keys(r.prompt),['nodeId','step','character','situation','options']);assert.ok(!('stateBefore' in r)&&!('stateAfter' in r));
  assert.equal(hashSync(prompts[i]),r.promptHash);assert.ok(prompts[i].yourStorySoFar&&prompts[i].recentEvents&&prompts[i].currentFacts);assert.equal(hashSync(states[i+1]),r.stateAfterHash,'state from changes at step '+r.step)});
 const knows=run.records.find(r=>r.changes.some(c=>c.key==='knowledge'));assert.ok(knows.changes.find(c=>c.key==='knowledge').added,'knowledge changes list only the facts added');
 assert.deepEqual(unpackPrompts(JSON.parse(JSON.stringify(packPrompts(prompts)))),prompts,'the report packing is exact');
 assert.ok(JSON.stringify(packPrompts(prompts)).length<JSON.stringify(prompts).length/2,'and much smaller than the prompts');
});

test('a checkpoint resumes the replay only for exactly the records it was taken after',async()=>{
 const run=await build(25),cp=JSON.parse(JSON.stringify(checkpointOf(story,run)));
 const fresh=()=>JSON.parse(JSON.stringify(run));
 {const r=fresh();assert.equal(resumeFrom(story,r,cp),true);assert.deepEqual(current(story,r),refCurrent(story,r));assert.deepEqual(promptFor(story,r),refPrompt(story,r))}
 assert.equal(resumeFrom(story,fresh(),null),false);
 assert.equal(resumeFrom(story,fresh(),{...cp,records:24}),false);
 assert.equal(resumeFrom(story,fresh(),{...cp,state:{...cp.state,instability:cp.state.instability+1}}),false,'a checkpoint state must hash to the last record');
 assert.equal(resumeFrom(story,fresh(),{...cp,runId:'other'}),false);
 {const r=fresh();r.records.pop();assert.equal(resumeFrom(story,r,cp),false,'a checkpoint for more records')}
 {const r=fresh();r.records[3].reason='edited';assert.throws(()=>resumeFrom(story,r,cp),/Record chain mismatch at step 4/)}
 {const r=fresh();r.storyHash='0';assert.throws(()=>resumeFrom(story,r,cp),/Story snapshot hash mismatch/)}
 // A forged chain gets past a resume but not the full check.
 {const r=fresh(),x=r.records[3],alt=available(story.nodes.find(n=>n.id===x.nodeId),statesOf(r)[3]).find(o=>o.id!==x.choice);assert.ok(alt,'record 4 had an alternative');
  x.choice=alt.id;x.rawResponse=JSON.stringify({choice:x.choice,reason:x.reason});let prev=chainSeed(r);for(const y of r.records){y.chainHash=chainHash(prev,y);prev=y.chainHash}
  assert.equal(resumeFrom(story,r,cp),false,"the old checkpoint names the old chain head");assert.equal(resumeFrom(story,r,{...cp,chainHash:prev}),true);assert.throws(()=>checkPlaythrough(story,r,{prompts:false}),/evidence mismatch|State hash mismatch/)}
});

test('memoised render returns the same text and still throws for an unknown token every time',()=>{
 const t='{{Connor}} meets {{Hank}}; the deviant in Detroit.';for(let i=0;i<3;i++){assert.equal(render(t,'real'),'Connor meets Hank; the deviant in Detroit.');assert.ok(!/Connor|Hank|deviant|Detroit/.test(render(t,'neutral')))}
 for(let i=0;i<2;i++)assert.throws(()=>render('{{NoSuchName}}','neutral'),/Unknown name token/);
});
