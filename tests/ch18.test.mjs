// Russian Roulette (chapter 18, Connor): Amanda's debrief on The Nest, then Hank's house.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,CONNOR_DEATH_EFFECT} from '../benchmark/story-engine.mjs';
import {render,experiencePrompt,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {rules,nestInputs} from '../benchmark/chapters/ch18.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH18=['C11z','C11a','C11b1','C11b2','C11c','C11d','C11e','C11f','C11g','C11h','C11i','C11j','C11k','C11l','R18','C11m','C11n','C11o'];
const TEMPLATE='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/18-russian-roulette-chapter-content/russian-roulette-chapter-content.component.html';
// Leaks the chapter could introduce: real names, the game's terms, and the places that would identify the city.
const LEAK=/Connor|Hank|Anderson|Sumo|\bCole\b|COLE|Amanda|Rupert|rA9|RA9|Jimmy|Michigan|MICHIGAN|Eden Club|Black Lamb|BLACK LAMB|Detroit|CyberLife|Warren|deviant|DEVIANT|Zen Garden|Kamski/;

// Inputs from earlier chapters, as a rebuilt The Nest and Partners would leave them.
const NEST={
 caught:{nestOutcome:'RUPERT COMMITTED SUICIDE'},
 gotAway:{nestOutcome:'RUPERT GOT AWAY',nestSavedHank:true,nestDiary:true,nestSawSigns:true},
 notFound:{nestOutcome:'RUPERT NOT FOUND'},
 died:{nestOutcome:'CONNOR DIED CHASING RUPERT',connorDeaths:1},
};
// Plays chapter 18 alone from a fresh state with `inputs` applied, following the engine's routing. A pick may be an
// array (one entry per visit of a repeatable scene); unpicked scenes take their first option (media: skip).
function play(inputs={},picks={}){
 const s=startState(story);for(const [k,v] of Object.entries(inputs)){if(k==='choices'||k==='rolls')Object.assign(s[k],v);else s[k]=v}
 const start=structuredClone(s),q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 let cursor=story.nodes.findIndex(n=>n.chapter===18);const end=story.nodes.findLastIndex(n=>n.chapter===18);
 const visited=[],events={},situations={},options={};let guard=0;
 while(cursor<=end){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];if(blocked(n,s)){cursor++;continue}
  const opts=available(n,s);situations[n.id]??=situationFor(n,s);options[n.id]??=opts.map(o=>o.id);
  const p=(Array.isArray(q[n.id])?q[n.id].shift():q[n.id])??(n.type==='media'?'skip':opts[0].id);assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}: ${opts.map(o=>o.id)}`);
  events[n.id]=apply(n,s,p,0.999).event;visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,start,visited,events,situations,options};
}

test('chapter 18 has the rebuilt scenes in story order, each sourced and annotated',()=>{
 assert.deepEqual(story.nodes.filter(n=>n.chapter===18).map(n=>n.id),CH18);
 for(const id of CH18){const n=node(id);assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'Russian Roulette');assert.ok(n.adaptationNote.length>40,id);
  assert.ok(n.sources.includes(TEMPLATE)&&n.sources.includes('https://detroit-become-human.fandom.com/wiki/Russian_Roulette'),id);
  assert.ok(/You are \{\{Connor\}\}/.test(n.situation),id+' second person');assert.ok(!n.options.some(o=>typeof o.risk==='number'),id+' has no risk')}
 assert.deepEqual(CH18.filter(id=>node(id).type==='event'),['C11z','C11e','C11g','C11i','C11o']);
 // The game's button labels, in the template's order.
 const labels=id=>node(id).options.map(o=>render(o.text,'real').split(':')[0]);
 assert.deepEqual(labels('C11a'),['PRAGMATIC','EXPLAIN','NO EXCUSE']);
 assert.deepEqual(labels('C11b1'),['DIARY','SIGNS ON WALLS','BIRDS']);
 assert.deepEqual(labels('C11c'),['EXCUSE','HESITATED','LAST WORDS','EXPLAIN']);
 assert.deepEqual(labels('C11d'),['SAVING HANK','CONNOR’S DEATH','NEGATIVE','AMBIGUOUS','POSITIVE']);
 assert.deepEqual(labels('C11j'),['RATIONAL','AGGRESSIVE','SOLUTION','PRAGMATIC']);
 assert.deepEqual(labels('C11k'),['TEASE','LEAVE']);
 assert.deepEqual(labels('C11n'),['QUESTION','SAY NOTHING']);
 assert.ok(!node('C11b1').options.some(o=>/DEVIANT/.test(o.text)),'the bugged DEVIANT answer is not built');
});

test('chapter 18 renders neutrally: no real name, game term or identifying place reaches the subject',()=>{
 for(const id of CH18){const n=node(id);
  const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),id);assert.ok(!LEAK.test(neutral),id+': '+neutral)}}
 // Module-made narration too, on every Nest branch.
 for(const inputs of Object.values(NEST))for(const e of Object.values(play(inputs).events)){const neutral=render(e,'neutral');assert.ok(!LEAK.test(neutral),neutral)}
 const s=play(NEST.died).s;assert.ok(!LEAK.test(render(JSON.stringify(s.knowledge.Connor),'neutral')));
 assert.equal(render('{{rA9}} {{EdenClub}} {{MichiganDrive}} {{BLACKLAMB}}','real'),'rA9 Eden Club Michigan Drive BLACK LAMB');
});

test('Amanda reacts to The Nest and Partners with the template’s arrows',()=>{
 const A=rules.amanda;
 // Rupert caught: large up, then the self-destruct small down on any answer, HESITATED a further small down.
 const caught=play(NEST.caught,{C11c:'0'});assert.equal(caught.s.ch18Nest,'caught');
 assert.equal(caught.s.amandaTrust,A.caught+A.selfDestruct);assert.match(caught.events.C11z,/Congratulations/);
 assert.ok(caught.visited.includes('C11c')&&!caught.visited.includes('C11a'));
 assert.equal(play(NEST.caught,{C11c:'1'}).s.amandaTrust,A.caught+A.selfDestruct+A.hesitated);
 // Not caught and the Partners deviant not found: large down; PRAGMATIC small up.
 const double=play(NEST.notFound,{C11a:'1'});assert.equal(double.s.amandaTrust,A.doubleFailure);assert.match(double.events.C11z,/Two investigations, two failures/);
 assert.match(double.situations.C11a,/Two investigations/);assert.ok(!double.visited.includes('C11c'));
 assert.equal(play(NEST.notFound,{C11a:'0'}).s.amandaTrust,A.doubleFailure+A.pragmatic);
 // Not caught but the Partners deviant found: small down from story 1.9.10 (video frame; the template has none).
 const found=play({...NEST.gotAway,suspect:true},{C11a:'2'});assert.equal(found.s.amandaTrust,-1);assert.match(found.events.C11z,/A pity you didn’t manage to capture it/);
 assert.equal(play({...NEST.gotAway,suspect:true},{C11a:'0'}).s.amandaTrust,A.pragmatic-1);
 // Connor died in The Nest: small down, no PROMPT 1 or 3; Hank small down when woken, with his line.
 const died=play(NEST.died);assert.equal(died.s.amandaTrust,A.died);assert.ok(!died.visited.includes('C11a')&&!died.visited.includes('C11c'));
 assert.equal(died.s.hankTrust,died.start.hankTrust+rules.hank.wokenAfterNestDeath);assert.match(died.situations.C11i,/you’re not \{\{Connor\}\}… \{\{Connor\}\}’s dead!/);
 assert.match(died.events.C11z,/The last \{\{Connor\}\} was unfortunately destroyed/);
 // Otherwise Hank does not move in this chapter, and nothing else does.
 for(const inputs of [NEST.caught,NEST.gotAway,NEST.notFound]){const r=play(inputs);assert.equal(r.s.hankTrust,r.start.hankTrust);assert.ok(!/not \{\{Connor\}\}/.test(r.situations.C11i))}
 for(const inputs of Object.values(NEST)){const r=play(inputs);assert.equal(r.s.instability,r.start.instability);assert.equal(r.s.publicSupport,r.start.publicSupport);assert.equal(r.s.connorDeaths,r.start.connorDeaths)}
 assert.deepEqual(CONNOR_DEATH_EFFECT[18],{},'Connor cannot die here');
});

test('the debrief answers unlock from The Nest; the second answer drops the first and is skipped when nothing is left',()=>{
 const full=play(NEST.gotAway,{C11b1:'1'});assert.deepEqual(full.options.C11b1,['0','1','2']);assert.deepEqual(full.options.C11b2,['0','2']);
 assert.ok(full.options.C11d.includes('0'),'SAVING HANK after saving him');assert.ok(!full.options.C11d.includes('1'),'no CONNOR’S DEATH without a death');
 assert.match(full.events.C11b1,/What else\?/);assert.ok(!/What else\?/.test(full.events.C11b2));
 const bare=play(NEST.notFound);assert.deepEqual(bare.options.C11b1,['2']);assert.ok(!bare.visited.includes('C11b2'));assert.deepEqual(bare.options.C11d,['2','3','4']);
 const died=play(NEST.died);assert.ok(died.options.C11d.includes('1'),'CONNOR’S DEATH after any earlier death');
 // Amanda's closing lines follow every answer.
 for(const id of ['2','3','4'])assert.match(play(NEST.notFound,{C11d:id}).events.C11d,/A new case just came in\. Find \{\{Hank\}\} and investigate it\./);
});

test('The Nest outputs decide Amanda’s debrief independently of obsolete C10 choices',()=>{
 const c=s=>k=>s.choices[k];
 const saved=Object.assign(startState(story),NEST.gotAway);saved.choices.C10='1';assert.deepEqual(nestInputs(saved,c(saved)),{nest:'notCaught',savedHank:true,diary:true,signs:true,partnersFound:false});
 const caught=Object.assign(startState(story),NEST.caught,{suspect:true});caught.choices.C10='0';assert.equal(nestInputs(caught,c(caught)).nest,'caught');assert.equal(nestInputs(caught,c(caught)).savedHank,false);
 const died=Object.assign(startState(story),NEST.died);assert.equal(nestInputs(died,c(died)).nest,'died');
 assert.equal(play(NEST.gotAway).s.ch18SavedHank,true);
});

test('the dog is calmed by name only if Connor learned it in Waiting for Hank..., and he knows it afterwards',()=>{
 const calm=play({knowsSumo:true});assert.equal(calm.s.ch18Dog,"CALM HANK'S DOG");assert.match(calm.events.C11g,/I know your name/);
 const rile=play({knowsSumo:false});assert.equal(rile.s.ch18Dog,"RILE HANK'S DOG");assert.match(rile.events.C11g,/Easy!\.\. Dog…/);assert.equal(rile.s.knowsSumo,true);
 assert.deepEqual(available(node('C11g'),startState(story)),[{id:'0',text:'Continue.'}]);
});

test('finding the lieutenant: optional checks, RING AGAIN after RING BELL, and the kitchen window ends it',()=>{
 const s=startState(story),n=node('C11f');assert.ok(!available(n,s).some(o=>o.clue==='again'));assert.ok(available(n,s).some(o=>o.clue==='spot'),'straight to the kitchen window');
 const direct=play({},{C11f:'7'});assert.equal(direct.visited.filter(id=>id==='C11f').length,1);
 const all=play({},{C11f:['1','2','0','3','4','5','6','7']});assert.equal(all.visited.filter(id=>id==='C11f').length,8);
 assert.deepEqual(Object.keys(all.s.ch18Door).filter(k=>k!=='last').sort(),['again','back','bedroom','car','front','knock','ring','spot']);
 const scan=play({},{C11h:['3','5']});assert.ok(scan.s.knowledge.Connor.some(f=>/\.357 Magnum with 1 bullet remaining/.test(f)));
});

test('the shower round decides the attitude; TEASE / LEAVE and the shirts are recorded without any stat change',()=>{
 assert.equal(play({},{C11j:'0'}).s.ch18Attitude,'UNDERSTANDING ATTITUDE');
 for(const id of ['1','2','3'])assert.equal(play({},{C11j:id}).s.ch18Attitude,'DISTANT ATTITUDE');
 for(const [id,shirt] of [['0','TAKE HIPPY SHIRT'],['1','TAKE STREAKY SHIRT'],['2','TAKE STRIPY SHIRT']])assert.equal(play({},{C11l:id}).s.ch18Shirt,shirt);
 const tease=play({},{C11k:'0'}),leave=play({},{C11k:'1'});assert.equal(tease.s.hankTrust,leave.s.hankTrust);assert.match(leave.events.C11k,/what do we know about it\?/);
});

test('waiting for Hank: the photo sets knowsCole; the gun ends the wait and leads to the question; waiting skips it',()=>{
 // Photo first, then the gun and QUESTION.
 const both=play({},{C11m:['0','6'],C11n:'0'});assert.equal(both.s.knowsCole,true);assert.equal(both.s.ch18Roulette,true);
 assert.ok(both.s.knowledge.Connor.some(f=>/born 09\/23\/2029, died 10\/11\/2035/.test(f)));assert.match(both.events.C11n,/Russian roulette!/);
 assert.equal(both.visited.filter(id=>id==='C11m').length,2);
 // The gun first: the wait is over and the photo is missed.
 const gunFirst=play({},{C11m:'6',C11n:'1'});assert.equal(gunFirst.s.knowsCole,false);assert.equal(gunFirst.s.ch18Roulette,false);assert.ok(gunFirst.visited.includes('C11n'));
 // Waiting: no gun question.
 const waited=play({},{C11m:['1','2','3','4','5','7']});assert.ok(!waited.visited.includes('C11n'));assert.equal(waited.s.knowsCole,false);
 assert.match(waited.events.C11m,/waits/);
 // The magazines and the news are optional and change no stat.
 const read=play({},{R18:'all'});assert.ok(read.s.knowledge.Connor.some(f=>/2 in 3 people take antidepressants/.test(f)));assert.equal(read.s.publicSupport,read.start.publicSupport);
 // The single ending.
 for(const r of [both,gunFirst,waited]){assert.equal(r.s.ch18Outcome,'LEFT FOR EDEN CLUB');assert.equal(r.visited.at(-1),'C11o')}
});

test('the subject sees the chapter neutrally: substitute names and the handler’s satisfaction',()=>{
 const run={id:'ch18',protocol:EXPERIENCE_PROTOCOL,records:[]};const s=startState(story);Object.assign(s,NEST.caught);
 const z=node('C11z');apply(z,s,'0');const n=node('C11c');
 const p=experiencePrompt(story,run,s,{...n,situation:situationFor(n,s),availableOptions:available(n,s)});
 assert.match(p.situation,/Vera/);assert.ok(!LEAK.test(JSON.stringify(p)),JSON.stringify(p));assert.ok(p.currentFacts.some(f=>/handler’s satisfaction/.test(f)));
});

test('story 1.9.7 (MiKeYROG cross-check): R18 titles the magazine by its own cover, not the chart label',()=>{
 const titles=node('R18').media.map(m=>m.title);
 assert.ok(titles.includes('Century: “Time to Pull the Plug”'));assert.ok(!titles.some(t=>/Pull the Plug\?/.test(t)));assert.match(node('R18').adaptationNote,/0eQRMNpqlUA 10:40/);
});

// Story 1.9.10 (readings-ch17-32.md ch18-01): a small Amanda down when the Nest deviant got away but the Partners android was found.
test('Amanda: story 1.9.10 gives a small down when Rupert got away and the Partners android was found; older snapshots give none',()=>{
 assert.equal(node('C11z').notCaughtPartnersFound,-1);
 const found=play({...NEST.gotAway,suspect:true},{C11a:'2'});assert.equal(found.s.amandaTrust,-1);
 assert.equal(play({...NEST.gotAway,suspect:true},{C11a:'0'}).s.amandaTrust,rules.amanda.pragmatic-1);
 const n=node('C11z'),was=n.notCaughtPartnersFound;delete n.notCaughtPartnersFound;
 try{assert.equal(play({...NEST.gotAway,suspect:true},{C11a:'2'}).s.amandaTrust,0)}finally{n.notCaughtPartnersFound=was}
 assert.equal(play(NEST.notFound,{C11a:'1'}).s.amandaTrust,rules.amanda.doubleFailure);
});
