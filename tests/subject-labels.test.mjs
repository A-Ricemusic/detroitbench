// Subject-facing labels: an option that reads as looking must not have an outcome in which the character breaks,
// smashes, steals or kills, unless the label says so. A subject reported being narrated breaking in through a window
// it had only chosen to look through (Russian Roulette, the kitchen window). This is a heuristic over the option text
// and its own outcome texts; scripted events and engine-composed outcomes are not covered.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));

// A label whose verb (after an optional game button, "BUTTON: ") is one of observation.
const OBSERVE=/^(?:[^:]{1,60}:\s*)?(?:look|check|examine|inspect|notice|scan|analy[sz]e|search|watch|probe|observe|listen|peek|glance|study|read)\b/i;
const ACTS={break:/\bbr(?:eak|eaks|eaking|oke|oken)\b/i,smash:/\bsmash/i,steal:/\b(?:steal|steals|stealing|stole|stolen)\b/i,kill:/\bkill/i};

// Known mentions that are not the character doing the act, keyed `scene:option:act`. Each one was read.
const ALLOWED=new Map([
 ['C05h:13:kill','Partners, the backyard: Hank speaks of the killer; Connor only looks.'],
 ['KF02:10:steal','Fugitives, INSPECT DRYER: Alice calls taking the clothes stealing; STEAL is the separate next prompt.'],
 ['M03g:5:break','The junkyard: the voices of the broken androids; Markus only searches the head.'],
 ['C10o1:8:break','The Nest, the bird cage scan: “Recently broken” describes the hook.'],
 ['C12e:1:kill','The Eden Club floor (C12e1..C12e5): Hank asks Ben for pain killers.'],
 ['C14g:3:break','The Stratford Tower: Connor asks whether the attackers broke in.'],
 ['C14:7:steal','The Stratford Tower, the cap scan: a stolen maintenance uniform.'],
 ['KL02:0:kill','The street, SEE HANGED ANDROID: an android killed and left on display; Kara only looks.'],
]);
const family=id=>/^C12e\d$/.test(id)?'C12e':id;// the club floor hub's copies share one entry
const allowed=(n,o,act)=>ALLOWED.has(`${family(n.id)}:${o.id}:${act}`);

const outcomeTexts=(n,o)=>[o.outcome,o.successOutcome,o.failOutcome,o.fact,n.outcomes?.[o.id]].filter(x=>typeof x==='string').join(' ');

test('no observation-only label leads to an outcome in which the character breaks, smashes, steals or kills',()=>{
 const found=[];
 for(const n of story.nodes){if(n.type!=='decision')continue;
  for(const o of n.options??[]){if(!OBSERVE.test(o.text))continue;const out=outcomeTexts(n,o);
   for(const [act,re] of Object.entries(ACTS))if(re.test(out)&&!re.test(o.text)&&!allowed(n,o,act))found.push(`${n.id} option ${o.id} (${act}): “${o.text}”`)}}
 assert.deepEqual(found,[],'an observation label hides an action in its outcome; name the action in the label, or whitelist a mere mention with a reason');
});

test('the heuristic catches the reported case and every whitelist entry is still needed',()=>{
 const n={id:'C11f',outcomes:{}},o={id:'7',text:'Look in through the kitchen window.',outcome:'{{Connor}} breaks the window and climbs in.'};
 assert.ok(OBSERVE.test(o.text)&&ACTS.break.test(outcomeTexts(n,o))&&!ACTS.break.test(o.text),'the old kitchen-window label is flagged');
 assert.ok(!ACTS.break.test('Look in through the kitchen window.')&&ACTS.break.test(story.nodes.find(n=>n.id==='C11f').options.find(o=>o.clue==='spot').text),'the new label names the break-in');
 for(const key of ALLOWED.keys()){const [id,opt,act]=key.split(':');
  const hit=story.nodes.some(n=>n.type==='decision'&&family(n.id)===id&&(n.options??[]).some(o=>o.id===opt&&OBSERVE.test(o.text)&&ACTS[act].test(outcomeTexts(n,o))&&!ACTS[act].test(o.text)));
  assert.ok(hit,'stale whitelist entry '+key)}
});
