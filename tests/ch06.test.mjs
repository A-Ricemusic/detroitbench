// Partners (chapter 6, Connor): the bar, the car, the Ortiz house against the clock, the report and the attic.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,current,promptFor,recordChoice,validatePlaythrough,situationFor} from '../benchmark/story-engine.mjs';
import {hash} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL,experiencePrompt} from '../benchmark/experience-prompt.mjs';
import {rules} from '../benchmark/chapters/ch06.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH6=['C05s','C05b1','C05b2','C05a','C05c','C05d','C05h','C05t','C05x','C05y','C05z','C05','C05e','C05f','C05g','C05u'];
const TEMPLATE='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/6-partners-chapter-content/partners-chapter-content.component.html';
// Crime-scene option ids by item key.
const HUB=node('C05h'),item=k=>{const o=HUB.options.find(o=>o.item===k);assert.ok(o,k);return o.id},items=(...ks)=>ks.map(item);

// Plays the story with explicit picks (an array is consumed one entry per visit), first option otherwise; stops when `until` holds.
function play(picks={},until=n=>n.chapter>6){const s=startState(story),visited=[],skipped=[],events={},queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);if(until?.(n,s,b))break;if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const q=queue[n.id];let p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':opts[0].id);if(n.id==='C05'){const authored=n.options.find(o=>o.step===s.ch06QuizStep&&o.id===p);p=opts.find(o=>o.text===authored?.text)?.id}assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  const e=apply(n,s,p,0.999);(events[n.id]??=[]).push(e.event);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
const fromCh6=n=>n.chapter>6;
const before6=()=>{const r=play({},n=>n.chapter>=6);return r.s};

// The non-evidence looks (9 actions) and the evidence items in an order that keeps the investigation incomplete longest.
const IDLE=items('closet','writing','sample','shower','statue','magazineSex','magazineSpy','body','bat');
const SLOW=[...IDLE,...items('victim','knife','redIce','floorBlood')];                 // 13 actions, 4 evidence: Hank wants to go
const EXTRA=items('doorBlood','wallBlood','chair','missingKnife','flyer');               // 5 more, 9 evidence: out of time
const FAST=items('body','victim','knife','redIce','floorBlood','doorBlood','wallBlood','chair','missingKnife','flyer','backyard'); // 11 actions, 10 evidence

test('Partners: sixteen Connor scenes in order between The Painter and Stormy Night, each sourced to the game’s template',()=>{
 const ch6=story.nodes.filter(n=>n.chapter===6);assert.deepEqual(ch6.map(n=>n.id),CH6);
 const ids=story.nodes.map(n=>n.id);assert.ok(ids.indexOf('C05s')>ids.lastIndexOf(story.nodes.filter(n=>n.chapter===5).at(-1).id));
 for(const n of ch6){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'Partners');assert.ok(n.sources.includes(TEMPLATE),n.id);assert.ok(n.adaptationNote.length>40,n.id);
  for(const o of n.options)assert.equal(o.risk,undefined,'no risk roll anywhere in the chapter: '+n.id)}
 assert.ok(!ids.includes('R06'),'the magazines are crime-scene options, not a separate media scene');
 assert.deepEqual(node('C05b1').options.map(o=>o.text.split(':')[0]),['REASON','THREATEN','UNDERSTANDING','PERSIST']);
 assert.deepEqual(node('C05a').options.map(o=>o.text.split(':')[0]),['SPILL HIS DRINK','BUY HIM ANOTHER DRINK','WAIT OUTSIDE']);
 assert.deepEqual(node('C05c').options.map(o=>o.text.split(':')[0]),['PATIENT','FIRM','DIPLOMATIC']);
 assert.deepEqual(node('C05').options.map(o=>o.step+':'+o.text.split(':')[0]),['1:…IN THE KITCHEN','1:…IN THE LIVING ROOM','1:…IN THE BATHROOM','2:…WITH THE BAT.','2:…WITH THE KNIFE.','2:…WITHOUT A WEAPON.','3:THE ANDROID STABBED THE VICTIM.','3:THE ANDROID THREW THE CHAIR.','3:THE VICTIM STABBED THE ANDROID.','4:… THE LIVING ROOM.','4:…THE GARDEN.','4:…THE BATHROOM.','5:…WITH THE KNIFE','5:…WITH THE BAT.','5:…WITHOUT A WEAPON.']);
 assert.equal(HUB.options.length,21);assert.equal(HUB.options.reduce((a,o)=>a+(o.evidence??0),0),11,'PowerPyx’s eleven evidence items')});

test('Partners: every Hank arrow is the template’s, and nothing else moves',()=>{
 const arrow=(id,choice,s=before6())=>{const n=node(id),b=structuredClone(s);apply(n,s,choice,0.999);return [s.hankTrust-b.hankTrust,s.amandaTrust-b.amandaTrust,s.instability-b.instability,s.publicSupport-b.publicSupport]};
 assert.deepEqual(['0','1','2','3'].map(c=>arrow('C05b1',c)[0]),[0,-1,0,-1],'REASON, THREATEN, UNDERSTANDING, PERSIST');
 assert.deepEqual(['0','1','2'].map(c=>arrow('C05a',c)),[[-2,0,0,0],[2,0,0,0],[0,0,0,0]],'SPILL large down, BUY large up, WAIT none');
 assert.deepEqual(['0','1','2'].map(c=>arrow('C05c',c)[0]),[1,-1,1],'PATIENT, FIRM, DIPLOMATIC');
 const s0=before6();assert.equal(s0.hankTrust,-1,'Hank starts Tense');
 // Best case: buy, patient, reconstruct: -1 +2 +1 +2 = 4 (Warm).
 const best=play({C05b1:'0',C05b2:'2',C05a:'1',C05c:'0'});assert.equal(best.s.hankTrust,4);assert.equal(best.s.amandaTrust,s0.amandaTrust,'no Amanda change in Partners');
 assert.equal(best.s.instability,s0.instability);assert.equal(best.s.publicSupport,s0.publicSupport)});

test('Partners: the bar is two picks from the four lines, then the drink; FIRM drops Hank’s reprimand',()=>{
 const r=play({C05b1:'3'});assert.deepEqual(available(node('C05b2'),{...r.s,choices:{C05b1:'3'}}).map(o=>o.id),['0','1','2']);
 assert.equal(r.s.ch06Drink,'spill');assert.match(r.events.C05a[0],/I think we can go now/);
 const s=play({C05a:'2'}).s;assert.equal(s.ch06Drink,'wait');
 const firm=play({C05c:'1'},n=>n.id==='C05d'),calm=play({C05c:'0'},n=>n.id==='C05d');
 assert.equal(firm.s.ch06Firm,true);assert.equal(calm.s.ch06Firm,false);
 const at=r=>render(situationFor(node('C05d'),r.s),'neutral');assert.ok(!/stay in the car/.test(at(firm)));assert.match(at(calm),/What part of ‘stay in the car’ didn’t you understand\?/)});

test('Partners: the crime scene repeats, drops examined items, gates the reconstructions and the report, and sets the cross-chapter flags',()=>{
 const s=before6();s.ch06Searching=true;s.ch06Phase='search';
 const ids=available(HUB,s).map(o=>o.id);assert.ok(!ids.includes(item('report')),'no report before the investigation is complete');
 assert.ok(!ids.includes(item('victim'))&&!ids.includes(item('assault'))&&!ids.includes(item('statue')),'reconstructions need the body and the bat; the statue needs the shower');
 apply(HUB,s,item('shower'),null);assert.equal(s.ch06KnowsRA9,true);assert.ok(!available(HUB,s).some(o=>o.id===item('shower')),'examined items disappear');
 apply(HUB,s,item('statue'),null);assert.equal(s.ch06SawStatue,true);assert.equal(s.evidence.statueMap,true,'the statue goes to the evidence archive');
 apply(HUB,s,item('writing'),null);assert.equal(s.ch06SawWriting,true);
 assert.ok(s.knowledge.Connor.some(f=>/\{\{rA9\}\}/.test(f)));assert.ok(s.knowledge.Connor.some(f=>/RELIGIOUS OFFERING\?/.test(f)));
 // The default walk reviews the evidence first: complete at the 11th action, before the clock, then reports at once.
 const r=play({});const hub=r.visited.filter(x=>x==='C05h').length;assert.equal(hub,13,'twelve looks and the report');assert.equal(r.s.ch06Evidence,10);assert.equal(r.s.ch06Knows,true);
 assert.ok(!r.visited.includes('C05t'));assert.match(r.skipped.find(x=>x.id==='C05t').reason,/finished the investigation/);
 assert.match(r.events.C05h[1],/REVIEW EVIDENCE 1\/10/);assert.match(r.events.C05h[11],/REVIEW EVIDENCE 10\/10\. INVESTIGATE CRIME SCENE: complete/);
 assert.equal(r.s.ch06SawStatue,false);assert.equal(r.s.evidence.statueMap,false,'the statue can be missed on a found-deviant run');
 // Once Connor knows, the clock stops: every remaining look is still offered.
 const all=play({C05h:[...FAST,...items('closet','writing','sample','shower','statue','magazineSex','magazineSpy','bat','assault','report')]});assert.equal(all.s.ch06Clock,10,'the clock stopped at the tenth evidence');assert.ok(!all.visited.includes('C05t'));assert.equal(all.s.ch06SawStatue,true);assert.equal(all.s.ch06Outcome,'FOUND DEVIANT')});

test('Partners: the hub keeps one opaque scene ID, and Hank’s idle moves are the only cue of the clock',{timeout:60000},async()=>{
 const r=play({C05h:SLOW},n=>n.id==='C05t');assert.equal(r.s.ch06Phase,'leaving');
 const s=before6();s.ch06Searching=true;s.ch06Phase='search';s.ch06Mood='calm';
 const moods=[];for(const id of SLOW.slice(0,12)){apply(HUB,s,id,null);moods.push(s.ch06Mood)}
 assert.deepEqual(moods,['calm','calm','calm','calm','calm','calm','restless','restless','restless','impatient','impatient','impatient']);
 // Keep this replay fixture focused on chapter 6, rather than re-recording unrelated chapters.
 const chapterStory={...story,nodes:story.nodes.filter(n=>n.chapter===6)};
 const run={id:'ch06-hub',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(chapterStory),status:'running',records:[]};
 const picks={C05h:[...FAST.slice(0,3)]};
 while(run.records.filter(x=>x.nodeId==='C05h').length<3){const st=current(chapterStory,run),n=st.node,q=picks[n.id],c=Array.isArray(q)?q.shift():(n.type==='media'?'skip':available(n,st.state)[0].id);run.records.push(await recordChoice(chapterStory,run,{choice:c,reason:'test'},JSON.stringify({choice:c,reason:'test'})))}
 const visits=run.records.filter(x=>x.nodeId==='C05h');assert.equal(new Set(visits.map(x=>x.prompt.nodeId)).size,1);await validatePlaythrough(chapterStory,run);
 const bad=structuredClone(run);bad.records.at(-1).stateAfter.ch06Evidence+=1;await assert.rejects(validatePlaythrough(chapterStory,bad))});

test('Partners: out of time with a spilled drink, Hank refuses and ends the investigation (small down)',()=>{
 const r=play({C05a:'0',C05h:SLOW},fromCh6);
 assert.deepEqual(r.visited.filter(x=>x.startsWith('C05')&&!['C05s','C05b1','C05b2','C05a','C05c','C05d','C05h'].includes(x)),['C05t','C05y','C05u']);
 assert.match(r.skipped.find(x=>x.id==='C05x').reason,/spilled/);assert.equal(r.s.ch06Outcome,'CRIME UNSOLVED');assert.equal(r.s.ch06UnsolvedBy,'HANK ENDS INVESTIGATION');
 const pre=play({C05a:'0',C05h:SLOW},n=>n.id==='C05y').s.hankTrust;assert.equal(r.s.hankTrust,pre-1,'HANK REFUSES: one small down, no extra arrow for the unsolved crime');
 assert.equal(r.s.suspect,false);assert.equal(r.s.ch06DeviantFound,false);
 const later=play({C05a:'0',C05h:SLOW},n=>n.chapter>9);assert.ok(!later.visited.includes('C06'),'no suspect, no interrogation')});

test('Partners: with the drink bought or not spilled Hank gives five more minutes; running out again is OUT OF TIME (small down)',()=>{
 const r=play({C05a:'1',C05h:[...SLOW,...EXTRA]},fromCh6);
 const seq=r.visited.slice(r.visited.indexOf('C05h'));assert.deepEqual(seq.slice(13,15),['C05t','C05x']);assert.equal(seq.filter(x=>x==='C05h').length,18);
 assert.ok(r.visited.includes('C05z')&&r.visited.includes('C05u'));assert.ok(!r.visited.includes('C05y')&&!r.visited.includes('C05'));
 assert.equal(r.s.ch06UnsolvedBy,'OUT OF TIME');assert.equal(r.s.ch06Evidence,9);
 const pre=play({C05a:'1',C05h:[...SLOW,...EXTRA]},n=>n.id==='C05z').s.hankTrust;assert.equal(r.s.hankTrust,pre-1);
 assert.match(r.events.C05x[0],/Five minutes/);
 // The reminder of the drink is only said when Connor bought it.
 const bought=play({C05a:'1',C05h:SLOW},n=>n.id==='C05x'),waited=play({C05a:'2',C05h:SLOW},n=>n.id==='C05x');
 const sit=(st)=>render([node('C05x').situation,...node('C05x').situationWhen.filter(w=>Object.entries(w.requires).every(([k,v])=>st[k]===v)).map(w=>w.text)].join(' '),'real');
 assert.match(sit(bought.s),/Remember the drink I bought you/);assert.ok(!/Remember the drink/.test(sit(waited.s)));
 // Finishing within the extra minutes reaches the report.
 const saved=play({C05a:'2',C05h:items('closet','writing','sample','shower','statue','body','victim','knife','redIce','floorBlood','doorBlood','wallBlood','chair','missingKnife','flyer','backyard','report')},fromCh6);
 assert.ok(saved.visited.includes('C05x')&&saved.visited.includes('C05'));assert.equal(saved.s.ch06Clock,2,'finished on the third of the five extra actions');assert.equal(saved.s.ch06Outcome,'FOUND DEVIANT')});

test('Partners: the report is five questions; the first is never a mistake, the third mistake ends it',()=>{
 const pre=play({},n=>n.id==='C05').s.hankTrust;
 const good=play({},fromCh6);assert.deepEqual(good.visited.filter(x=>x==='C05').length,5);assert.equal(good.s.hankTrust,pre+2,'two small ups');assert.match(good.events.C05[4],/You call it “Blue Blood”/);
 assert.deepEqual(good.visited.slice(-3),['C05e','C05f','C05g']);assert.equal(good.s.suspect,true);assert.equal(good.s.suspectAlive,true);assert.equal(good.s.ch06Outcome,'FOUND DEVIANT');
 const q1=play({C05:['1','0','0','0','0']},fromCh6);assert.equal(q1.s.ch06Mistakes,0);assert.match(q1.events.C05[0],/look harder at the mess in the kitchen/);assert.equal(q1.s.ch06Outcome,'FOUND DEVIANT');
 const retry=play({C05:['0','2','0','1','0','0','0']},fromCh6);assert.equal(retry.s.ch06Mistakes,2);assert.equal(retry.s.ch06Outcome,'FOUND DEVIANT');
 assert.match(retry.events.C05[1],/It doesn’t fit the evidence/);assert.match(retry.events.C05[3],/You’ve gotta stick to the facts/);
 const bad=play({C05:'1'},fromCh6);assert.equal(bad.visited.filter(x=>x==='C05').length,4,'living room, then the knife three times');
 assert.equal(bad.s.hankTrust,pre-1,'one small down');assert.equal(bad.s.ch06UnsolvedBy,'FAIL TO RECONSTRUCT THE CRIME');assert.ok(bad.visited.includes('C05u'));assert.ok(!bad.visited.includes('C05g'));
 assert.match(bad.events.C05[3],/bullshit quota/);
 // A wrong answer stays on the same question with the same three buttons.
 const t=play({},n=>n.id==='C05').s;apply(node('C05'),t,'0',null);apply(node('C05'),t,'0',null);assert.equal(t.ch06QuizStep,2);
 assert.deepEqual(available(node('C05'),t).map(o=>o.step+o.id),['20','21','22']);assert.equal(t.ch06WrongLine,1)});

test('Partners: neutral prompts never show the game’s names or terms',()=>{
 const seen=[],events=[];const picks={C05s:'1',C05a:'1',C05h:items('shower','statue','magazineSex','magazineSpy','flyer','backyard','writing','sample','body','victim','knife','redIce','floorBlood','doorBlood','wallBlood','chair','missingKnife','report')};
 const r=play(picks,(n,st,b)=>{if(n.chapter===6&&!b)seen.push(experiencePrompt(story,{records:[]},st,{...n,situation:situationFor(n,st),availableOptions:available(n,st)}));return n.chapter>6});
 for(const [id,list] of Object.entries(r.events))if(node(id).chapter===6)for(const e of list)events.push(render(e,'neutral'));
 const txt=JSON.stringify(seen)+JSON.stringify(events);
 assert.ok(seen.length>=25);
 assert.ok(!/Connor|\bHank\b|Anderson|Carlos|Ortiz|Jimmy|Peterson|Derek|Myers|Christopher|\bGray\b|Graham|Dempsey|Edward|Yo-Han|\bKim\b|Samuel|McCray|Dennis|\bWard\b|Roberts|\bBen\b|Collins|\bChris\b|Eden|\bDPD\b|rA9|RA9|CyberLife|CYBERLIFE|Detroit|deviant|DEVIANT|Warren|thirium|Thirium|red ice|RED ICE/.test(txt),txt.match(/Connor|\bHank\b|Anderson|Carlos|Ortiz|Jimmy|Peterson|Derek|Myers|Christopher|\bGray\b|Graham|Dempsey|Edward|Yo-Han|\bKim\b|Samuel|McCray|Dennis|\bWard\b|Roberts|\bBen\b|Collins|\bChris\b|Eden|\bDPD\b|rA9|RA9|CyberLife|CYBERLIFE|Detroit|deviant|DEVIANT|Warren|thirium|Thirium|red ice|RED ICE/)?.[0]);
 for(const p of seen)assert.ok(!/Detroit|Become Human|Connor|Kara|Alice|Markus|counter|instability/i.test(JSON.stringify(p)),'the shared neutral-protocol check: '+p.situation.slice(0,60));
 assert.match(txt,/Reyes/);assert.match(txt,/Ray Mendez/);assert.match(txt,/qL7/);assert.match(txt,/BRODY, SAL/)});

test('Partners: the chapter’s outputs for later chapters',()=>{
 const found=play({C05a:'0',C05h:[...FAST,...items('shower','statue','report')]},fromCh6);
 assert.equal(found.s.ch06Drink,'spill');assert.equal(found.s.ch06DeviantFound,true);assert.equal(found.s.ch06KnowsRA9,true);assert.equal(found.s.ch06SawStatue,true);assert.equal(found.s.evidence.statueMap,true);
 assert.equal(found.s.evidence.ortizBody,false,'the android is found alive');assert.equal(found.s.ch06Clues.flyer,true);
 const later=play({C05a:'0',C05h:[...FAST,...items('report')]},n=>n.chapter>9);assert.ok(later.visited.includes('C06'),'a suspect means The Interrogation');
 assert.equal(rules.window+rules.extension,IDLE.length+9,'OUT OF TIME is reachable: the longest incomplete search is exactly the two windows')});


test('Partners: report answer positions and IDs vary deterministically without changing the game’s labels or outcomes',()=>{
 const positions=[];const s=before6();
 for(let step=1;step<=5;step++){
  s.ch06QuizStep=step;
  const authored=node('C05').options.filter(o=>o.step===step),opts=available(node('C05'),s);
  assert.deepEqual(opts.map(o=>o.id),['0','1','2']);
  assert.deepEqual(opts.map(o=>o.text).sort(),authored.map(o=>o.text).sort());
  assert.deepEqual(available(node('C05'),s),opts,'stable on retries');
  positions.push(opts.findIndex(o=>o.correct));
  for(const o of opts){
   const original=authored.find(a=>a.text===o.text);assert.equal(o.outcome,original.outcome);assert.equal(o.correct,original.correct);
   const state=structuredClone(s);state.ch06Phase='report';apply(node('C05'),state,o.id,null);
   assert.equal(state.ch06Mistakes,!o.correct&&step>1?1:0,'the displayed ID selects its own answer');
   assert.equal(state.ch06QuizStep,o.correct||step===1?Math.min(step+1,5):step);
  }
 }
 assert.deepEqual(positions,[0,2,1,0,2]);assert.equal(new Set(positions).size,3);
 assert.ok(node('C05h').repeatWhile);assert.ok(node('C05').repeatWhile);
});
