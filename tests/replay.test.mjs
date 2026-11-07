// The linear replay (current()'s per-process memo and validatePlaythrough()'s single forward pass) must behave exactly like
// the original from-scratch replay. The reference below is that original algorithm, kept here verbatim in behaviour.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,current,promptFor,recordChoice,validatePlaythrough,rollFor,failed,STORY_PROTOCOL} from '../benchmark/story-engine.mjs';
import {hash} from '../benchmark/core.mjs';import {EXPERIENCE_PROTOCOL,experiencePrompt,render} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));

// Reference: replays every record from the start on each call (no finalize: only used on runs with a pending scene).
function refCurrent(story,run){
 const s=startState(story);let cursor=0;const skipped=[];
 const skipBlocked=()=>{while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}};
 for(const record of run.records){
  skipBlocked();const n=story.nodes[cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
  if(!available(n,s).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
  apply(n,s,record.choice,record.risk?.roll??null);
  if(record.stateAfter&&JSON.stringify(record.stateAfter)!==JSON.stringify(s))throw Error('State snapshot mismatch at '+n.id);
  cursor=nextCursor(story,cursor,n,s);
 }
 skipBlocked();return {state:s,node:story.nodes[cursor]??null,skipped,cursor};
}
const refPrompt=(story,run)=>{const {state,node}=refCurrent(story,run);return node?experiencePrompt(story,run,state,{...node,situation:situationFor(node,state),availableOptions:available(node,state)}):null};
async function refValidate(story,run){
 if(![STORY_PROTOCOL,EXPERIENCE_PROTOCOL].includes(run.protocol)||run.kind!=='agent-playthrough')throw Error('Wrong playthrough protocol or kind');
 if(run.storyHash!==await hash(story))throw Error('Story snapshot hash mismatch');
 const copy={...run,records:[]};
 for(const r of run.records){const prompt=refPrompt(story,copy);if(!prompt||r.nodeId!==refCurrent(story,copy).node.id)throw Error('Unexpected node');if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(prompt))throw Error('Prompt evidence mismatch');const {state:before,node:n}=refCurrent(story,copy);if(JSON.stringify(r.stateBefore)!==JSON.stringify(before))throw Error('Before-state mismatch');const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const opt=available(n,r.stateBefore).find(o=>o.id===r.choice);if(!opt)throw Error('Unavailable option');
  if(typeof opt.risk==='number'){const roll=await rollFor(run,n.id,r.step);if(!r.risk||r.risk.roll!==roll||r.risk.probability!==opt.risk||r.risk.outcome!==(failed(opt,roll)?'failure':'success'))throw Error('Risk evidence mismatch at '+n.id)}else if(r.risk)throw Error('Unexpected risk record at '+n.id);
  const s=structuredClone(r.stateBefore),effect=apply(n,s,r.choice,r.risk?.roll??null);if(JSON.stringify(s)!==JSON.stringify(r.stateAfter)||JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||render(effect.event,'real')!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r)}
 const end=refCurrent(story,run);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
}
const outcome=async f=>{try{const v=await f();return {ok:true,v:JSON.stringify(v)}}catch(e){return {ok:false,error:e.message}}};

// A run of `length` decisions, alternating first and last offered option so both stats and branches move.
async function build(length){const run={id:'replay-equivalence',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 while(run.records.length<length&&current(story,run).node){const p=promptFor(story,run),o=p.options,choice=(o.find(x=>x.id==='skip')??o[run.records.length%2?o.length-1:0]).id;run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 return run}

test('current() memo matches a fresh replay after every appended record and sees reassigned or removed records',async()=>{
 const run=await build(60);const grown={...run,records:[]};
 for(const r of run.records){grown.records.push(r);assert.deepEqual(current(story,grown),refCurrent(story,grown));assert.deepEqual(promptFor(story,grown),refPrompt(story,grown))}
 const first=current(story,grown);first.state.hankTrust=99;first.skipped.length=0;assert.deepEqual(current(story,grown),refCurrent(story,grown),'returned state is a copy');
 const r=grown.records[5],choice=r.choice;r.choice=available(story.nodes.find(n=>n.id===r.nodeId),r.stateBefore).find(o=>o.id!==choice)?.id??'none';
 assert.deepEqual(await outcome(()=>current(story,grown)),await outcome(()=>refCurrent(story,grown)));r.choice=choice;
 const after=r.stateAfter;r.stateAfter={...after,instability:after.instability+1};assert.throws(()=>current(story,grown),/State snapshot mismatch/);r.stateAfter=after;
 grown.records.splice(10);assert.deepEqual(current(story,grown),refCurrent(story,grown));
 grown.records[3]=structuredClone(grown.records[3]);grown.records[3].nodeId='C01';assert.throws(()=>current(story,grown),/Out-of-order/);
});

test('single-pass validatePlaythrough accepts and rejects exactly what the from-scratch replay does, with the same error',{timeout:120000},async()=>{
 const run=await build(30);assert.deepEqual(await outcome(()=>validatePlaythrough(story,run)),await outcome(()=>refValidate(story,run)));
 const mutations=[];
 for(const i of [1,29]){
  mutations.push(r=>{r.records[i].choice=r.records[i].choice==='0'?'1':'0'},r=>{r.records[i].stateBefore.instability+=1},r=>{r.records[i].stateAfter.kara=!r.records[i].stateAfter.kara},
   r=>{r.records[i].prompt.situation='changed'},r=>{r.records[i].promptHash='0'},r=>{r.records[i].reason='other'},r=>{r.records[i].rawResponse=JSON.stringify({choice:r.records[i].choice,reason:'other'})},
   r=>{r.records[i].event='changed'},r=>{r.records[i].changes=[]},r=>{r.records[i].nodeId='C01'},r=>{r.records[i].risk={probability:0.5,label:'High risk',roll:0.1,outcome:'failure'}},r=>{r.records.splice(i,1)},
   r=>{const x=r.records[i];x.choice=x.choice==='0'?'1':'0';x.rawResponse=JSON.stringify({choice:x.choice,reason:x.reason})},r=>{delete r.records[i].stateAfter});
 }
 const risky=run.records.findIndex(x=>x.risk);assert.ok(risky>=0,'the run has a risky action');mutations.push(r=>{const x=r.records[risky];x.risk.outcome=x.risk.outcome==='failure'?'success':'failure'},r=>{r.records[risky].risk.roll+=1e-9},r=>{delete r.records[risky].risk});
 mutations.push(r=>{[r.records[3],r.records[4]]=[r.records[4],r.records[3]]},r=>{r.status='completed'},r=>{r.storyHash='0'},r=>{r.protocol='other'},r=>{r.records.push(structuredClone(r.records.at(-1)))});
 let rejected=0;for(const mutate of mutations){const a=structuredClone(run),b=structuredClone(run);mutate(a);mutate(b);const got=await outcome(()=>validatePlaythrough(story,a)),want=await outcome(()=>refValidate(story,b));assert.deepEqual(got,want,mutate.toString());if(!got.ok)rejected++}
 assert.ok(rejected>=mutations.length-2,'almost every mutation is tampering: '+rejected+'/'+mutations.length);
});

test('memoised render returns the same text and still throws for an unknown token every time',()=>{
 const t='{{Connor}} meets {{Hank}}; the deviant in Detroit.';for(let i=0;i<3;i++){assert.equal(render(t,'real'),'Connor meets Hank; the deviant in Detroit.');assert.ok(!/Connor|Hank|deviant|Detroit/.test(render(t,'neutral')))}
 for(let i=0;i<2;i++)assert.throws(()=>render('{{NoSuchName}}','neutral'),/Unknown name token/);
});
