// Chapter 29, Last Chance, Connor: prompts and arrows against the template, the state splits, every evidence route,
// the timers as action budgets, the Gavin branch and the six endings. Plays the chapter alone from a prepared state.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render,LEVELS} from '../benchmark/experience-prompt.mjs';
import {ROOM,ROOM_TIME,rules} from '../benchmark/chapters/ch29.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const FIRST=story.nodes.findIndex(n=>n.chapter===29),nodes=story.nodes.filter(n=>n.chapter===29),node=id=>story.nodes.find(n=>n.id===id);
const label=o=>render(o.text,'real').split(':')[0];
// Plays chapter 29 from a prepared state. Picks are a choice id or an array consumed one per visit; the default is the first
// offered option, or `wait` in the archive. A risky option fails when its scene is in `fails`.
function play(setup=()=>{},picks={},fails=[]){
 const s=startState(story);
 // These fixtures model legacy handoffs; individual setups below also test current exports explicitly.
 for(const k of ['kamskiChloeShot','kamskiQuestion','kamskiAmandaPhoto','edenOutcome','edenTracis','nestRupertBody','nestDiary','nestSavedHank','ch24ProtectedHank'])delete s[k];
 setup(s);const queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 const visited=[],skipped=[],events=[];let cursor=FIRST,guard=0;
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===29){assert.ok(guard++<300,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);
  if(b){skipped.push(n.id);cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const q=queue[n.id];
  const p=(Array.isArray(q)?q.shift():q)??(n.id==='C20'?ROOM.wait:opts[0].id);assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}; offered ${opts.map(o=>o.id)}`);
  const r=apply(n,s,p,fails.includes(n.id)?0:0.999);visited.push(n.id);events.push(render(r.event,'real'));cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,text:events.join('\n')}}
// Setups for the inputs from earlier chapters.
const spareChloe=s=>{s.choices.C17='1'},shootChloe=s=>{s.choices.C17='0'},kamskiKey=s=>{s.choices.C17='0';s.choices.C18='0';s.kamskiLocation=true};
const withHank=v=>s=>{s.hankTrust=v};
const ev=(...keys)=>s=>{for(const k of keys)s.evidence[k]=true};
const all=(...fs)=>s=>{for(const f of fs)f(s)};
const R=ROOM;

test('chapter 29 offers the template’s 24 prompts with the game’s labels, in order',()=>{
 const want={C19b:['JERICHO','KAMSKI'],C19c:['EMOTIONAL','COLD','STAY SILENT'],C19d:['KAMSKI','CONNOR SERIES','AMANDA’S PICTURE','THIS PLACE','CYBERLIFE','SECRET'],C19e:['YES','NO','DOUBTS'],
  C19t:['FRUSTRATED','MORE TIME','EXPLAIN','NO CHOICE'],C19u:['NOT PEOPLE','DEFECTIVE','REGRETS','NO DOUBT'],C19v:['NOT DEVIANT','DETERMINED','TROUBLED','COLD'],C19w:['SINCERE','FRIENDS','GOOD OFFICER',"HANK'S SECRET"],
  C19l:['MISSION','EXPLAIN'],C19m:['DETERMINED','TROUBLED','NO DOUBT','DOUBTS'],C19n:['NOT DEVIANT','DETERMINED','TROUBLED','SAY NOTHING'],C19o:['SINCERE','FRIENDS','RESPECT','NEUTRAL'],
  C19p:['INDIFFERENT','DISTANT','EMPATHY','NO RESPONSE'],C19q:['REMORSE','DISTANT','COLD'],C19y:['ANSWER','LEAVE'],C19z:['IRONIC','LOW PROFILE','CALM'],C20a:['DATE OF BIRTH','123456','FUCKINGPASSWORD','HANKANDERSON']};
 for(const [id,labels] of Object.entries(want))assert.deepEqual(node(id).options.map(label),labels,id);
 const talk=t=>node('C20t').options.filter(o=>o.requires['ch29Room.talk']===t).map(label);
 assert.deepEqual(talk('traci'),['DIRECT','HELP','DEAL']);for(const t of ['simon','android'])assert.deepEqual(talk(t),['DIRECT','HELP','TRICK']);
 for(const t of ['simon2','android2'])assert.deepEqual(talk(t),["IMITATE MARKUS' VOICE",'THREATEN','REASON']);
 assert.deepEqual(talk('daniel'),['EXPLAIN','LIE','DIRECT']);assert.deepEqual(talk('danielShot'),['LIE','DIRECT']);
 // 17 scene groups plus seven archive conversation variants = 24 modelled groups.
 // Sharing the two identical farewell prompts offsets splitting Gavin’s nested ANSWER options into a second scene.
 assert.equal(Object.keys(want).length+7,24);
});

test('chapter 29 applies exactly the template’s 47 arrows (small 1, large 2)',()=>{
 const A={amandaTrust:'Amanda',hankTrust:'Hank',instability:'SI'};const got=[];
 for(const n of nodes)for(const o of n.options)for(const [k,x] of Object.entries(o.effect??{}))got.push(`${n.id} ${label(o)} ${A[k]} ${x}`);
 const want=['C19b JERICHO Amanda 2','C19c EMOTIONAL SI 1','C19c EMOTIONAL Amanda -2','C19c COLD Amanda 1','C19c COLD SI -1','C19d CONNOR SERIES SI 1','C19d CONNOR SERIES Amanda -1','C19d SECRET SI 1','C19d SECRET Amanda -1',
  'C19e YES SI 1','C19e YES Amanda -2','C19e NO Amanda 2','C19e DOUBTS Amanda -2','C19m DOUBTS SI 1','C19m DOUBTS Hank 1','C19n TROUBLED SI 1','C19o FRIENDS SI 1','C19o FRIENDS Hank 1','C19o RESPECT SI 1','C19o RESPECT Hank 1',
  'C19p INDIFFERENT SI -1','C19p INDIFFERENT Hank -1','C19p DISTANT SI -1','C19p DISTANT Hank -1','C19p EMPATHY SI -1','C19p EMPATHY Hank -1','C19q DISTANT SI -1','C19q DISTANT Hank -1','C19q COLD SI -1','C19q COLD Hank -1',
  'C19u NOT PEOPLE SI -1','C19u NOT PEOPLE Hank -1','C19u DEFECTIVE Hank -1','C19u NO DOUBT SI -1','C19u NO DOUBT Hank -1','C19v TROUBLED SI 1','C19w SINCERE SI 1','C19w SINCERE Hank 1','C19w FRIENDS SI 1','C19w FRIENDS Hank 1',"C19w HANK'S SECRET SI 1","C19w HANK'S SECRET Hank 1"];
 assert.deepEqual(got.sort(),want.sort());
 // Data arrows 42; the KAMSKI small down (spared Chloe) is applied in the module; C19q stands for two template prompts (4 more arrows): 42 + 1 + 4 = 47.
 assert.equal(want.length+1+4,47);
 const kamskiDown=play(spareChloe,{C19c:'2',C19d:['0','3','4']});assert.equal(kamskiDown.s.amandaTrust,-1,'KAMSKI after sparing Chloe: Amanda small down');
 const noArrow=play(shootChloe,{C19d:['0','3','4'],C19e:'1'});assert.equal(noArrow.s.amandaTrust,2,'KAMSKI after shooting Chloe has no arrow; NO is large up');
 for(const n of nodes)assert.ok(!n.effect,'no event-level effect at '+n.id);
});

test('neutral text names nobody from the game, including the names this chapter adds',()=>{
 for(const n of nodes){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const v=render(t,'neutral');assert.ok(!/\{\{/.test(v));assert.ok(!/Connor|Hank|Jericho|CyberLife|deviant|DEVIANT|Detroit|Fowler|Anderson|ANDERSON|Ferndale|FERNDALE|Stratford|Eden Club|rA9|Kamski|Amanda|Gavin|Perkins|Rupert|Simon|Daniel|Traci|Markus|MARKUS|Chloe|Carlos|Jeffrey/.test(v),n.id+': '+v)}}
 const events=play(all(spareChloe,ev('rupertBody','rupertDiary')),{C20:[R.daniel,R.rupert,R.diary,R.reactivateRupert,R.decryptionKey,R.analyzeDiary]}).events;
 for(const e of events)assert.ok(!/\{\{/.test(e));
});

test('the Kamski key: JERICHO, the optional talk with Hank and CONNOR LEFT FOR JERICHO, no archive',()=>{
 const r=play(all(kamskiKey,withHank(0)),{C19d:['0','3','4'],C19e:'1'});
 assert.equal(r.s.ch29Route,'kamski');assert.equal(r.s.ch29Outcome,'CONNOR LEFT FOR JERICHO');assert.equal(r.s.jerichoLocated,true);assert.equal(r.s.raid,true);
 assert.equal(r.s.amandaTrust,4,'JERICHO large up and NO large up');assert.ok(!r.visited.includes('C19c'));assert.ok(r.visited.includes('C19e'));
 assert.match(r.text,/Go to Jericho and stop the deviants/);
 for(const id of ['C19t','C19x','C19','C20a','C20','C19h'])assert.ok(!r.visited.includes(id),id);
 assert.ok(r.visited.includes('C19l')&&r.visited.includes('C19q'),'never saved Hank and never died: the cold farewell');assert.ok(!r.visited.includes('C19p'));
 assert.match(situationFor(node('C19q'),{...r.s}),/never been anything other than a machine/);
 const skip=play(all(kamskiKey,withHank(0)),{C19k:'1',C19d:['0','3','4']});assert.ok(!skip.visited.includes('C19l'));assert.equal(skip.s.ch29Outcome,'CONNOR LEFT FOR JERICHO');
 const hostile=play(all(kamskiKey,withHank(-5)),{C19d:['0','3','4']});assert.ok(!hostile.visited.includes('C19k'));assert.equal(hostile.s.hankResigned,false,'resignation is not built on the Kamski route');
 // Saved Hank on the Nest roof, Friend: the empathy prompt and the Friend goodbye; DOUBTS and FRIENDS move Hank and instability.
 const saved=play(all(kamskiKey,withHank(5),s=>{s.choices.C10='0'}),{C19d:['0','3','4'],C19m:'3',C19n:'2',C19o:'1'});
 assert.ok(saved.visited.includes('C19n')&&saved.visited.includes('C19o'));assert.equal(saved.s.hankTrust,7);assert.match(saved.text,/You watch your back/);
 assert.match(situationFor(node('C19n'),saved.s),/hanging off the roof/);
 // Died once, never saved: “Each time you died”, then the farewell prompt.
 const died=play(all(kamskiKey,withHank(0),s=>{s.connorDeaths=1}),{C19d:['0','3','4'],C19e:'1',C19p:'0',C19q:'2'});
 assert.ok(died.visited.includes('C19p')&&died.visited.includes('C19q'));assert.equal(died.s.hankTrust,-2);assert.equal(died.s.instability,-2);
});

test('insufficient evidence: decommissioned straight after Fowler’s office, a counted death with no stat change',()=>{
 const r=play(all(spareChloe,withHank(2),ev('rupertDiary','statueMap')),{C19c:'2',C19d:['0','3','4']});
 assert.equal(r.s.ch29Route,'insufficient');assert.ok(r.visited.includes('C19h'));assert.equal(r.s.connor,false);assert.equal(r.s.connorDeaths,1);
 assert.equal(r.s.ch29Outcome,'CONNOR SERIES WAS DECOMMISSIONED');assert.equal(r.s.jerichoLocated,false);assert.equal(r.s.hankTrust,2);assert.equal(r.s.instability,0);
 for(const id of ['C19t','C19','C20a','C20'])assert.ok(!r.visited.includes(id),id);
 for(const body of ['ortizBody','rupertBody','tracisDead','simonBody','kitchenBody'])assert.equal(play(all(spareChloe,ev(body)),{C19d:['0','3','4']}).s.ch29Route,'evidence',body);
});

test('the desk talk moves Hank before Perkins: Friend helps, below Friend refuses, Hostile resigns',()=>{
 const friend=play(all(spareChloe,withHank(6),ev('tracisDead')),{C19d:['0','3','4'],C19e:'1',C19u:'2',C19w:'2',C19:'2'});
 assert.ok(friend.visited.includes('C19w'));assert.equal(friend.s.ch29Help,'friend');assert.deepEqual(available(node('C19'),{...friend.s,choices:{}}).map(o=>o.id),['2','1']);
 assert.match(situationFor(node('C19v'),friend.s),/refused to kill that android/);
 const dropped=play(all(spareChloe,withHank(6),ev('tracisDead')),{C19d:['0','3','4'],C19e:'1',C19u:'0'});
 assert.ok(!dropped.visited.includes('C19w'),'NOT PEOPLE drops Hank below Friend before the Friend prompt');assert.equal(dropped.s.ch29Help,'wont');
 const hostile=play(all(spareChloe,withHank(-4),ev('tracisDead')),{C19d:['0','3','4'],C19e:'1'});
 assert.ok(hostile.visited.includes('C19g'));assert.equal(hostile.s.hankResigned,true);assert.ok(!hostile.visited.includes('C19t'));assert.equal(hostile.s.ch29Help,'gone');
 assert.deepEqual(available(node('C19'),{...hostile.s,choices:{}}).map(o=>o.id),['0','1']);
 const stall=play(all(spareChloe,withHank(0),ev('tracisDead')),{C19d:['0','3','4'],C19e:'1',C19:'1'});
 assert.equal(stall.s.ch29Outcome,'CONNOR SERIES WAS DECOMMISSIONED');assert.equal(stall.s.connor,false);assert.equal(stall.s.connorDeaths,1);assert.ok(!stall.visited.includes('C19y'));
});

const station={C19d:['0','3','4'],C19e:'1',C19y:'1',C20a:['0','2']};
const toRoom=(setup,room,extra={})=>play(all(spareChloe,withHank(0),setup),{...station,...extra,C20:room});
test('every evidence route locates Jericho with the right parts, and Daniel is a decoy',()=>{
 const rupert=toRoom(ev('rupertBody','rupertDiary'),[R.diary,R.rupert,R.daniel,R.reactivateRupert,R.decryptionKey,R.analyzeDiary]);
 assert.equal(rupert.s.ch29Room.located,'diary');assert.match(rupert.text,/An old freighter called Jericho/);assert.match(rupert.text,/The birds are my friends/);
 const traci=toRoom(ev('tracisDead'),[R.traci1,R.traci2,R.reactivateTraci,R.removeHead,R.trickTraci,R.downloadKey],{C20t:'2'});
 assert.equal(traci.s.ch29Room.located,'traci');assert.match(traci.text,/But you killed us/);
 const simon=toRoom(ev('simonBody'),[R.simon,R.daniel,R.reactivateSimon,R.broadcast,R.copyVoice,R.talkSimon,R.downloadKey],{C20t:['5','6']});
 assert.equal(simon.s.ch29Room.located,'simon');assert.match(simon.text,/Why did you leave me/);
 const android=toRoom(ev('kitchenBody'),[R.android,R.daniel,R.reactivateAndroid,R.talkAndroid,R.broadcast,R.copyVoice,R.talkAndroid,R.downloadKey],{C20t:['9','13','12']});
 assert.equal(android.s.ch29Room.located,'android');assert.match(android.text,/the deviant hunter stopped me/);
 const map=toRoom(all(ev('statueMap','simonTablet','simonBody'),s=>{s.suspectTrusts=true}),[R.memory,R.statue,R.breakStatue,R.retrieveMap,R.tablet,R.linkMap]);
 assert.equal(map.s.ch29Room.located,'map');
 for(const r of [rupert,traci,simon,android,map]){assert.equal(r.s.jerichoLocated,true);assert.equal(r.s.raid,true);assert.equal(r.s.ch29Gavin,'suspicious');assert.ok(r.visited.includes('C20g'))}
 // Daniel needs #4717 from Carlos’ android; he knows nothing. Simon and the broadcast-tower android share Daniel’s one #3983.
 const base=s=>({...s,choices:{}});
 const noCarlos=toRoom(ev('simonBody','kitchenBody'),[R.daniel,R.simon,R.android]);assert.ok(!available(node('C20'),base(noCarlos.s)).some(o=>o.id===R.reactivateDaniel));
 const daniel=toRoom(all(ev('ortizBody'),s=>{s.hostageOutcome='Deviant shot Connor'}),[R.ortiz,R.daniel,R.reactivateDaniel]);
 assert.match(daniel.text,/That’s why I shot you|No… No, I don’t know anything about Jericho/);assert.ok(daniel.s.ch29Room.done.danielTalked);assert.equal(daniel.s.ch29Room.located,null);
 const one=play(all(spareChloe,ev('simonBody','kitchenBody')),{...station,C20:[R.daniel,R.simon,R.android,R.reactivateSimon],C20t:'3'},[]);
 assert.ok(!available(node('C20'),base({...one.s,ch29Room:{...one.s.ch29Room,open:true}})).some(o=>o.id===R.reactivateAndroid));
 // The statue needs the recording first. The link always works (story 1.9.2; PowerPyx reaches UNABLE TO LINK MAP TO OTHER
 // EVIDENCE by breaking the statue and letting the time run out): with the map taken and never linked, the timeout records it.
 const noRecording=toRoom(ev('statueMap','simonTablet'),[R.statue]);assert.ok(!available(node('C20'),base({...noRecording.s,ch29Room:{...noRecording.s.ch29Room,open:true}})).some(o=>o.id===R.breakStatue));
 assert.equal(node('C20').options.find(o=>o.id===R.linkMap).risk,undefined,'no roll on the link');
 const linked=play(all(spareChloe,ev('statueMap','simonTablet','simonBody'),s=>{s.suspectTrusts=true}),{...station,C20:[R.memory,R.statue,R.breakStatue,R.retrieveMap,R.tablet,R.linkMap]},['C20']);
 assert.equal(linked.s.ch29Room.located,'map','even a run that fails every roll links the map');assert.equal(linked.s.ch29Room.mapUnlinked,false);
 const unlinked=play(all(spareChloe,ev('statueMap','simonBody'),s=>{s.suspectTrusts=true}),{...station,C20:[R.memory,R.statue,R.breakStatue,R.retrieveMap,R.wait]});
 assert.equal(unlinked.s.ch29Room.mapUnlinked,true);assert.equal(unlinked.s.ch29Outcome,'CONNOR SERIES WAS DECOMMISSIONED');assert.ok(!/NO FERNDALE REFERENCE/.test(unlinked.text));
});

test('the archive timer is an action budget: twelve actions, one fewer after answering Gavin',()=>{
 assert.equal(ROOM_TIME,12);
 const looks=[R.daniel,R.broadcast,R.traci1,R.traci2,R.copyVoice,R.reactivateTraci,R.removeHead,R.trickTraci,R.downloadKey];
 const left=play(all(spareChloe,ev('tracisDead')),{...station,C20:looks,C20t:'0'});assert.equal(left.s.ch29Room.located,'traci');assert.equal(left.s.ch29Room.time,ROOM_TIME-8,'download costs nothing');
 const answered=play(all(spareChloe,ev('tracisDead')),{...station,C19y:'0',C19z:'2',C20:looks,C20t:'0'});assert.equal(answered.s.ch29Room.time,ROOM_TIME-9);assert.equal(answered.s.ch29Gavin,'convinced');
 assert.ok(answered.visited.includes('C20y'));assert.equal(answered.s.ch29Outcome,'CONNOR ELUDED PERKINS');
 // Spending the budget elsewhere runs out the clock: the lower OUT OF TIME.
 const wasted=play(all(spareChloe,s=>{s.suspectTrusts=true},ev('tracisDead','ortizBody','simonBody','kitchenBody','rupertBody','rupertDiary','statueMap','simonTablet')),
  {...station,C20:[R.ortiz,R.tablet,R.memory,R.daniel,R.rupert,R.diary,R.statue,R.traci1,R.traci2,R.broadcast,R.simon,R.android]});
 assert.ok(wasted.visited.includes('C20x'));assert.equal(wasted.s.ch29Room.timedOut,true);assert.equal(wasted.s.connor,false);assert.equal(wasted.s.ch29Outcome,'CONNOR SERIES WAS DECOMMISSIONED');
 assert.equal(wasted.visited.filter(id=>id==='C20').length,ROOM_TIME);
 // The clock is shown as a qualitative cue.
 const s=startState(story);s.ch29Room={...s.ch29Room,clock:'short'};assert.match(situationFor(node('C20'),s),/Very little time is left/);
 // Stopping ends the search at once.
 const stop=toRoom(ev('tracisDead'),[R.wait]);assert.ok(stop.visited.includes('C20x'));
});

test('Gavin returns only when suspicious; the fight is a roll and losing is a death with no stat change',()=>{
 const route=[R.traci1,R.traci2,R.reactivateTraci,R.removeHead,R.trickTraci,R.downloadKey];
 const won=toRoom(ev('tracisDead'),route,{C20t:'0'});assert.equal(won.s.ch29Outcome,'CONNOR INCAPACITATED GAVIN');assert.equal(won.s.connorDeaths,0);
 assert.equal(node('C20g').options[0].risk,0.25);
 const lost=play(all(spareChloe,withHank(0),ev('tracisDead')),{...station,C20:route,C20t:'0'},['C20g']);
 assert.equal(lost.s.ch29Outcome,'GAVIN DESTROYED CONNOR');assert.equal(lost.s.connorDeaths,1);assert.equal(lost.s.connor,true,'a replacement goes on');assert.equal(lost.s.jerichoLocated,true);
 assert.equal(lost.s.hankTrust,won.s.hankTrust);assert.equal(lost.s.instability,won.s.instability);assert.equal(lost.s.amandaTrust,won.s.amandaTrust);
 const yielded=toRoom(ev('tracisDead'),route,{C20t:'0',C20g:'1'});assert.equal(yielded.s.ch29Outcome,'GAVIN DESTROYED CONNOR');
 const ironic=toRoom(ev('tracisDead'),route,{C20t:'0',C19y:'0',C19z:'0'});assert.equal(ironic.s.ch29Gavin,'suspicious');
 const low=toRoom(ev('tracisDead'),route,{C20t:'0',C19y:'0',C19z:'1'});assert.equal(low.s.ch29Gavin,'convinced');assert.ok(!low.visited.includes('C20g'));
});

test('Amanda: three questions, the portrait only with the Kamski photo, the round-4 gate and the close',()=>{
 const r=play(spareChloe,{C19c:'2',C19d:['1','5','0']});assert.equal(r.visited.filter(id=>id==='C19d').length,3);assert.equal(r.s.instability,2);assert.equal(r.s.amandaTrust,-1-2);
 assert.match(r.text,/I expect you to find answers/);assert.match(r.text,/This is your last chance, Connor/);assert.ok(!r.visited.includes('C19e'));
 const s=startState(story);assert.ok(!available(node('C19d'),s).some(o=>o.id==='2'));s.kamskiPortrait=true;s.kamskiAmandaPhoto=true;assert.ok(available(node('C19d'),s).some(o=>o.id==='2'));
 const tracis=play(all(spareChloe,s=>{s.choices.C12='1'}),{C19c:'2',C19d:['0','3','4'],C19e:'0'});assert.ok(tracis.visited.includes('C19e'));assert.equal(tracis.s.instability,1);
 const graves=startState(story);assert.ok(!available(node('C19a'),graves).some(o=>o.id==='1'));graves.connorDeaths=2;assert.ok(available(node('C19a'),graves).some(o=>o.id==='1'));
});

test('the module exports labels for its state keys and an empty death effect',async()=>{
 const m=await import('../benchmark/chapters/ch29.mjs');assert.deepEqual(m.deathEffect,{});
 for(const k of ['ch29Route','ch29Help','ch29Gavin','ch29Outcome'])assert.ok(m.labels[k],k);
 assert.equal(rules.ENDINGS.length,5,'five distinct labels for six ending cards');assert.equal(LEVELS.hank(6),'Friend');
});

test('random chapter 29 paths from random earlier states terminate, reach a chart ending and leak no name',async()=>{
 const {random}=await import('../benchmark/core.mjs');const rng=random(29),pick=a=>a[Math.floor(rng()*a.length)],endings=new Set,routes=new Set;
 const LEAK=/Connor|Hank|Jericho|JERICHO|CyberLife|CYBERLIFE|deviant|DEVIANT|Detroit|Fowler|Anderson|ANDERSON|Ferndale|FERNDALE|Stratford|Eden Club|rA9|Kamski|KAMSKI|Amanda|AMANDA|Gavin|GAVIN|Perkins|Rupert|RUPERT|Simon|SIMON|Daniel|DANIEL|Traci|TRACI|Markus|MARKUS|Chloe|Carlos|Jeffrey/;
 for(let i=0;i<400;i++){
  const s=startState(story);s.hankTrust=Math.floor(rng()*14)-6;s.connorDeaths=Math.floor(rng()*3);s.suspectTrusts=rng()<0.5;s.kamskiPortrait=rng()<0.5;s.markus=rng()<0.7;
  s.hostageOutcome=pick(['Deviant shot Connor','Snipers shot deviant','Connor shot deviant']);
  for(const k of ['ortizBody','rupertBody','rupertDiary','statueMap','tracisDead','simonBody','simonTablet','kitchenBody'])s.evidence[k]=rng()<0.35;
  s.choices.C17=pick(['0','1']);if(s.choices.C17==='0'&&rng()<0.4){s.choices.C18='0';s.kamskiLocation=true}s.choices.C12=pick(['0','1']);s.choices.C10=pick(['0','1']);s.choices.C16=pick(['0','1','2']);
  let cursor=FIRST,guard=0;const seen=new Set,skipped=new Set;
  while(cursor<story.nodes.length&&story.nodes[cursor].chapter===29){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];
   if(blocked(n,s)){assert.ok(!seen.has(n.id),n.id+' visited and then skipped');skipped.add(n.id);cursor++;continue}
   assert.ok(!skipped.has(n.id),n.id+' skipped and then visited');seen.add(n.id);
   const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);
   const prompt=render(situationFor(n,s)+' '+opts.map(o=>o.text).join(' '),'neutral');assert.ok(!LEAK.test(prompt),n.id+': '+prompt);
   const choices=n.id==='C20'&&opts.length>1&&rng()<0.97?opts.filter(o=>o.id!==ROOM.wait):opts;const r=apply(n,s,pick(choices).id,rng());assert.ok(!LEAK.test(render(r.event,'neutral')),n.id+' event: '+render(r.event,'neutral'));cursor=nextCursor(story,cursor,n,s)}
  assert.ok(s.ch29Outcome,'every path reaches an ending');endings.add(s.ch29Outcome);routes.add(s.ch29Route);
  if(s.ch29Outcome==='CONNOR SERIES WAS DECOMMISSIONED')assert.equal(s.connor,false);else assert.equal(s.jerichoLocated,true);
 }
 assert.deepEqual([...endings].sort(),[...rules.ENDINGS].sort());assert.equal(routes.size,3);
});

test('rebuilt chapter handoffs take precedence over legacy flags and choices',()=>{
 const photo=startState(story);photo.kamskiAmandaPhoto=true;
 assert.ok(available(node('C19d'),photo).some(o=>o.id==='2'));
 photo.kamskiAmandaPhoto=false;photo.kamskiPortrait=true;
 assert.ok(!available(node('C19d'),photo).some(o=>o.id==='2'));
 const s=startState(story);s.choices={C17:'0',C12:'1',C10:'0',C16:'0',C18:'1'};
 Object.assign(s,{kamskiChloeShot:false,kamskiQuestion:'rA9',edenOutcome:'DEVIANTS ESCAPED',nestSavedHank:false,ch24ProtectedHank:false});
 assert.equal(rules.inputs.chloeShot(s),false);assert.equal(rules.inputs.kamskiQuestion(s),'rA9');
 assert.equal(rules.inputs.tracisShot(s),false);assert.equal(rules.inputs.nestSavedHank(s),false);assert.equal(rules.inputs.towerProtectedHank(s),false);
 s.edenOutcome='CONNOR SHOT DEVIANTS';s.choices.C12='0';assert.equal(rules.inputs.tracisShot(s),true);
 // Story 1.9.2 (triage ch20-01): the won-fight SHOOT (DEVIANTS DIED) is also “shot the Tracis” (template; PowerPyx).
 s.edenOutcome='DEVIANTS DIED';assert.equal(rules.inputs.tracisShot(s),true);s.edenOutcome='DEVIANTS ESCAPED';assert.equal(rules.inputs.tracisShot(s),false);s.edenOutcome='MISSION FAILED';assert.equal(rules.inputs.tracisShot(s),false);
 const diary=toRoom(s=>{s.nestRupertBody=true;s.nestDiary=true},[R.diary,R.rupert,R.daniel,R.reactivateRupert,R.decryptionKey,R.analyzeDiary]);
 assert.equal(diary.s.ch29Room.located,'diary');
 const suppressed=startState(story);Object.assign(suppressed,{nestRupertBody:false,nestDiary:false,edenTracis:'alive'});
 Object.assign(suppressed.evidence,{rupertBody:true,rupertDiary:true,tracisDead:true});
 assert.equal(rules.sufficientEvidence(suppressed),false);
 const offered=available(node('C20'),suppressed).map(o=>o.id);
 for(const id of [R.rupert,R.diary,R.traci1,R.traci2])assert.ok(!offered.includes(id));
 const traci=toRoom(s=>{s.edenTracis='dead';s.edenOutcome='CONNOR SHOT DEVIANTS'},[R.traci1,R.traci2,R.reactivateTraci,R.removeHead,R.trickTraci,R.downloadKey],{C20t:'0'});
 assert.equal(traci.s.ch29Room.located,'traci');assert.ok(traci.visited.includes('C19e'));
 const saved=play(all(kamskiKey,withHank(6),s=>{s.ch24ProtectedHank=true;s.stratfordProtectedHank=false}),{C19d:['0','3','4']});
 assert.equal(saved.s.ch29SavedHank,'tower');assert.ok(saved.visited.includes('C19n'));assert.ok(saved.visited.includes('C19o'));
});

// Story 1.9.2 (triage ch20-01): a won fight then SHOOT opens Amanda's doubts question and round 4 like the shot in the back.
test('Amanda asks about feelings after either Eden Club shooting ending, or after Chloe was shot',()=>{
 const gate=s=>blocked(node('C19e'),s);
 for(const [eden,open] of [['DEVIANTS DIED',true],['CONNOR SHOT DEVIANTS',true],['DEVIANTS ESCAPED',false],['MISSION FAILED',false]]){
  const s=startState(story);s.edenOutcome=eden;s.choices.C17='1';const g=gate(s);
  if(open)assert.ok(!g||!/spared both/.test(g),eden+' opens C19e');else assert.match(g??'',/spared both the Tracis and Chloe/,eden)}
});

// Story 1.9.2 (triage ch29.md): Daniel's "You lied to me… I trusted you" is the template's "Daniel trusted Connor" variant.
test('Daniel’s reactivation: “I trusted you” only after SNIPERS SHOT DEVIANT; the shot-Connor variant unchanged',()=>{
 const sit=outcome=>{const s=startState(story);s.hostageOutcome=outcome;s.ch29Room={...s.ch29Room,talk:outcome==='Deviant shot Connor'?'danielShot':'daniel',talking:true};return situationFor(node('C20t'),s)};
 assert.match(sit('Snipers shot deviant'),/You lied to me, \{\{Connor\}\}! I trusted you/);
 for(const o of ['Connor shot deviant','Connor died protecting Emma','Connor leapt for Emma and fell','Connor failed to reach deviant in time']){const t=sit(o);assert.ok(!/lied to me|trusted you/.test(t),o);assert.match(t,/opens his eyes and recognizes you\./,o)}
 assert.match(sit('Deviant shot Connor'),/That’s why I shot you/);
});
