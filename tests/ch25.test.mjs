// Chapter 25, Midnight Train: the game's chart and template prompts, the two arrow pairs, the timed hiding phase,
// the officer's hidden suspicion, the three endings and the flags later chapters read.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,current,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
import {random} from '../benchmark/core.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const mod=CHAPTER_MODULES.get(25);
const CH25=mod.SCENES;
const SRC=['https://detroit-become-human.fandom.com/wiki/Midnight_Train',
 'https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/25-midnight-train-chapter-content/midnight-train-chapter-content.component.html',
 'https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/','https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-flowchart-100.jpg'];
const ARRIVAL={kara:true,karaActive:true,alice:true,luther:true,lutherWith:true};

// Plays chapter 25 only, from a state that has just left Zlatko's house with Luther. A pick may be an array (one entry per menu
// of a phase, consumed in order); unlisted scenes take the first offered option, media scenes are skipped. `rng` picks at random.
function play(picks={},pre=ARRIVAL,rng=null){
 const s=Object.assign(startState(story),structuredClone(pre)),visited=[],skipped=[],events={};let cursor=story.nodes.findIndex(n=>n.chapter===25);
 const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 while(story.nodes[cursor]?.chapter===25){const n=story.nodes[cursor],b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);
  const v=q[n.id],p=(Array.isArray(v)?v.shift():v)??(rng?opts[Math.floor(rng()*opts.length)].id:n.type==='media'?'skip':opts[0].id);
  assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p} (offered ${opts.map(o=>o.id)})`);
  const sit=situationFor(n,s),e=apply(n,s,p,0.999);visited.push(n.id);events[n.id]={sit,event:e.event,changes:e.changes,opts:opts.map(o=>o.id)};cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
// Hiding-phase picks by menu: the six evidence actions and the door (option ids in K15u*).
const HIDE={magazine:'0',blood:'1',upstairs:'2',laundry:'3',kitchen:'4',curtain:'5',door:'6',clothes:'7',reassure:'8',threaten:'9',calm:'10',open:'11'};
const hide=(...acts)=>Object.fromEntries(acts.map((a,i)=>['K15u'+(i+1),HIDE[a]]));

test('Midnight Train: the chart as Kara scenes after The Pirates’ Cove, with sources, no risk and every event narrated',()=>{
 const ch=story.nodes.filter(n=>n.chapter===25);assert.deepEqual(ch.map(n=>n.id),CH25);
 const ids=story.nodes.map(n=>n.id);assert.ok(!ids.includes('K15'),'the old single police scene is gone');
 assert.equal(story.nodes[ids.indexOf('K15a')-1].chapter,24);assert.equal(story.nodes[ids.indexOf('K15y')+1].chapter,26);
 for(const n of ch){assert.equal(n.character,'Kara');assert.equal(n.chapterTitle,'Midnight Train');assert.ok(n.adaptationNote,n.id);assert.match(n.situation,/^You are \{\{Kara\}\}/,n.id);
  for(const u of SRC)assert.ok(n.sources.includes(u),n.id+' cites '+u);
  for(const o of n.options){assert.equal(o.risk,undefined,n.id+' '+o.id+' has no probability in the game');if(!(n.id==='K15h'&&o.id==='1'))assert.equal(o.effect,undefined,n.id+' '+o.id+' has no arrow')}
  if(n.type==='event'){assert.ok(n.facts?.length,n.id);assert.ok(!n.effect,n.id)}}
 assert.equal(node('R25').type,'media');assert.ok(node('R25').media.every(m=>!m.effect),'no public-opinion effect');
 assert.ok(!/Watching certain news reports/.test(node('R25').adaptationNote));
 assert.deepEqual(mod.deathEffect,{});assert.deepEqual(Object.keys(mod.labels).sort(),Object.keys(mod.state).sort())});

test('Midnight Train: every live template prompt with the game’s labels in order; cut prompts are not built',()=>{
 const labels=(id,from=node(id).options)=>from.map(o=>render(o.text).split(':')[0]);
 assert.deepEqual(labels('K15b'),['DISTRUST','TRUST']);
 assert.deepEqual(labels('K15e'),['REASSURE','EXPLAIN','SAY NOTHING']);
 assert.deepEqual(labels('K15f'),['SCARED','UNHAPPY','MISUNDERSTANDING','COMPLICATED']);
 assert.deepEqual(labels('K15g'),['OPTIMISTIC','SINCERE','PESSIMISTIC']);
 assert.deepEqual(labels('K15h'),['SUGGEST EATING','KISS GOODNIGHT','LEAVE']);
 assert.deepEqual(labels('K15k'),['CAUTIOUS','SINCERE']);
 for(const id of mod.ROSE_SLOTS)assert.deepEqual(labels(id),['WHY HELP?','MANY DEVIANTS?','DANGEROUS','ROSE','THANKS','BORDER']);
 assert.deepEqual(labels('K15m'),['INSIST','NO CHOICE']);
 assert.equal(node('K15m').options[0].outcome,node('K15m').options[1].outcome,'both print the same line');
 assert.deepEqual(labels('K15n'),['STAY','TAKE ALICE OUTSIDE']);
 assert.deepEqual(labels('K15q1').slice(1,3),['INSIST','LET IT GO']);
 assert.deepEqual(labels('K15s').slice(0,3),['REASSURE','CONFESS','EXPLAIN']);
 assert.deepEqual(labels('K15u1').slice(2,5),['UPSTAIRS','LAUNDRY','KITCHEN']);assert.deepEqual(labels('K15u1').slice(8,11),['REASSURE','THREATEN','CALM']);
 assert.deepEqual(labels('K15w1'),['ALICE','NOBODY']);assert.deepEqual(labels('K15w2'),['YES','NO']);
 assert.deepEqual(labels('K15w3'),['MESS','PREVIOUS OWNER','NOT MINE']);assert.deepEqual(labels('K15w9'),['TIRED','UPSET']);
 assert.deepEqual(labels('K15w10'),['DOG','WASHING MACHINE','WIND','HEARD NOTHING']);
 const all=JSON.stringify(story.nodes.filter(n=>n.chapter===25).map(n=>[n.situation,n.options,n.situationWhen,n.facts,n.outcomes]));
 assert.ok(!/PROTECT: |BRAVE: |hide-and-seek|They’ve come to arrest us|I miss Luther/.test(all),'cut content is not built');
 assert.match(node('K15o').situation,/I’m not going to prison because you wanna help these freaks!/);assert.match(node('K15y').situation,/Get yourselves ready\. We leave tonight\./)});

test('Midnight Train: the arrows are KISS GOODNIGHT and POLICEMAN FOOLED, Alice and Luther small up each, and nothing else moves a stat',()=>{
 const kiss=play({K15h:'1'}),eat=play({K15h:'0'});
 assert.equal(kiss.s.aliceBond-eat.s.aliceBond,1);assert.equal(kiss.s.lutherTrust-eat.s.lutherTrust,1);assert.equal(kiss.s.aliceMax,kiss.s.aliceBond);
 assert.equal(eat.s.midnightOutcome,'Policeman left');assert.equal(eat.s.aliceBond,1);assert.equal(eat.s.lutherTrust,1,'the fooled ending is +1 each');
 const dead=play({K15h:'0',K15u1:'11'});assert.equal(dead.s.midnightOutcome,'Luther died killing policeman');assert.equal(dead.s.aliceBond,0);assert.equal(dead.s.lutherTrust,0);
 // Random play: only the two arrow scenes change a stat.
 const rng=random(25),STATS=['aliceBond','lutherTrust','publicSupport','hankTrust','instability','amandaTrust','jerichoTrust'],outcomes=new Set,keys=new Set;
 for(let i=0;i<300;i++){const r=play({},ARRIVAL,rng);outcomes.add(r.s.midnightOutcome);
  for(const [id,e] of Object.entries(r.events)){for(const c of e.changes)keys.add(c.key);if(id==='K15h'||id==='K15y')continue;assert.ok(!e.changes.some(c=>STATS.includes(c.key)),id+' moves a stat')}
  for(const id of r.visited)assert.equal(r.visited.filter(x=>x===id).length,1,id+' visited twice');assert.equal(r.visited.length+r.skipped.length,CH25.length)}
 assert.deepEqual([...outcomes].sort(),['Luther died killing policeman','Luther died saving other deviants','Policeman left']);
 for(const k of keys)assert.ok(['knowledge','aliceBond','aliceMax','lutherTrust','luther','lutherWith'].includes(k)||k in mod.state,'unexpected change '+k)});

test('Midnight Train: the talk with Rose offers each topic once, DANGEROUS only after MANY DEVIANTS?, and BORDER moves on',()=>{
 const r=play({K15l1:'3',K15l2:'5'});assert.deepEqual(r.events.K15l1.opts,['0','1','3','4','5']);assert.deepEqual(r.events.K15l2.opts,['0','1','4','5']);
 assert.deepEqual(r.skipped.filter(x=>/^K15l/.test(x.id)).map(x=>x.id),['K15l3','K15l4','K15l5','K15l6']);assert.ok(r.s.midnightRoseDone);
 const all=play({K15l1:'1',K15l2:'2',K15l3:'0',K15l4:'3',K15l5:'4'});assert.ok(all.events.K15l2.opts.includes('2'));assert.deepEqual(all.events.K15l6.opts,['5']);
 assert.ok(all.s.knowledge.Kara.some(f=>/shot on the spot/.test(f)));assert.ok(all.s.knowledge.Kara.some(f=>/mostly frozen in winter/.test(f)))});

test('Midnight Train: Alice’s secret by the fire only after LET ALICE SEE MARY; the explore phase ends on waiting or when nothing is left',()=>{
 const saw=play({K15n:'0',K15q1:'1'}),kept=play({K15n:'1'});
 assert.equal(saw.s.midnightSawMary,true);assert.equal(kept.s.midnightSawMary,false);
 assert.deepEqual(saw.events.K15q1.opts,['0','1','2','3','4','5']);assert.deepEqual(saw.events.K15q2.opts,['0','3','4','5'],'INSIST and LET IT GO are one check on Alice');
 assert.deepEqual(kept.events.K15q1.opts,['0','3','4','5']);assert.ok(kept.skipped.some(x=>x.id==='K15q4'),'three actions only without the fireside talk');
 assert.ok(saw.s.knowledge.Kara.some(f=>/you won’t love me anymore/.test(f)));
 const wait=play({K15q1:'5'});assert.deepEqual(wait.skipped.filter(x=>/^K15q/.test(x.id)).map(x=>x.reason),Array(3).fill('Kara stopped looking around and waited for Rose.'));
 assert.match(play().events.K15q1.event,/Not now, \{\{Luther\}\}/)});

test('Midnight Train: the magazine page carries from the kitchen table into the hiding phase and the officer’s visit',()=>{
 const keep=hide('blood','upstairs','door','clothes','open'),unread=play(keep),cover=play({R25:'0',...keep}),ad=play({R25:'1',...keep}),all=play({R25:'all',...keep});
 assert.ok(!unread.events.K15u1.opts.includes('0'),'CHANGE MAGAZINE COVER needs READ MAGAZINE');assert.ok(cover.events.K15u1.opts.includes('0'));
 assert.equal(unread.s.midnightMagazine,'cover');assert.equal(ad.s.midnightMagazine,'ad');assert.equal(all.s.midnightMagazine,'ad');
 assert.ok(ad.visited.includes('K15w7'),'POLICEMAN SEES ARTICLE');assert.ok(!unread.visited.includes('K15w7'));
 const flipped=play({R25:'1',...hide('magazine','blood','upstairs','door','clothes','open')});assert.equal(flipped.s.midnightMagazine,'cover');assert.ok(!flipped.visited.includes('K15w7'));
 const worse=play({R25:'0',...hide('magazine','blood','upstairs','door','clothes','open')});assert.equal(worse.s.midnightMagazine,'ad');assert.ok(worse.visited.includes('K15w7'),'turning the cover to the advertisement exposes it');
 assert.match(ad.events.K15u1.sit,/open at the \{\{CyberLife\}\} advertisement/);
 assert.match(node('R25').media[2].facts[0],/broadcast what can only be described as demands/)});

test('Midnight Train: about fifty seconds as six actions before the door; a seventh and the officer insists',()=>{
 const r=play({R25:'1',...hide('magazine','blood','kitchen','curtain','door','clothes','reassure')});
 assert.equal(r.s.midnightDoor,'insisted');assert.equal(r.s.midnightHideActions,7);assert.match(r.events.K15u7.event,/he will not wait any longer/);
 assert.match(r.events.K15v.sit,/You took too long/);assert.match(r.events.K15u7.sit,/if you do anything else now, he will not wait/);
 const ok=play({R25:'1',...hide('magazine','blood','kitchen','curtain','door','clothes','open')});assert.equal(ok.s.midnightDoor,'opened');assert.ok(ok.visited.includes('K15u7'),'the door can still be opened in time at the seventh menu');
 assert.equal(r.s.midnightSuspicion-ok.s.midnightSuspicion,1,'a late door costs one');
 assert.match(r.events.K15u1.sit,/time for about six things/);assert.match(r.events.K15u6.sit,/one more thing at most/);
 // The hiding place: once; the kitchen curtain only after KITCHEN.
 assert.ok(!r.events.K15u1.opts.includes('5'));assert.ok(r.events.K15u4.opts.includes('5'));assert.ok(!r.events.K15u4.opts.includes('2'));
 // With nothing left to do, only the door remains.
 const quick=play(hide('blood','upstairs','door','clothes','calm'));assert.deepEqual(quick.events.K15u6.opts,['11']);
 assert.ok(quick.skipped.some(x=>x.id==='K15u7'&&x.reason==='The front door is already open.'))});

test('Midnight Train: LUTHER DIED KILLING POLICEMAN in the kitchen with the curtain open, or when Kara never tells them where to hide',()=>{
 for(const picks of [hide('blood','kitchen','open'),hide('open')]){const r=play(picks);
  assert.ok(r.visited.includes('K15w4'));assert.equal(r.visited.at(-1),'K15w4');assert.equal(r.s.midnightOutcome,'Luther died killing policeman');
  assert.equal(r.s.luther,false);assert.equal(r.s.lutherWith,false);assert.equal(r.s.midnightOfficerDead,true);assert.equal(r.s.kara,true);assert.equal(r.s.alice,true);
  for(const id of ['K15w5','K15w9','K15w10','K15x','K15y'])assert.ok(r.skipped.some(x=>x.id===id),id)}
 const drawn=play(hide('blood','kitchen','curtain','door','clothes','open'));assert.ok(!drawn.visited.includes('K15w4'));assert.equal(drawn.s.midnightOutcome,'Policeman left');
 assert.match(play(hide('open')).events.K15v.sit,/taken \{\{Alice\}\} into the kitchen pantry on his own/)});

test('Midnight Train: the officer’s hidden suspicion decides the noise question; the sources’ recipes hold',()=>{
 const clean=hide('blood','upstairs','door','clothes','reassure','open');
 // Nothing left out: every answer but HEARD NOTHING fools him (PowerPyx and GamerGuides: hide all + WASHING MACHINE).
 for(const [ans,out] of [['0','fooled'],['1','fooled'],['2','fooled'],['3','suspicious']])assert.equal(play({...clean,K15w10:ans}).s.midnightVerdict,out,'clean + '+ans);
 // PowerPyx's suspicious recipe: no evidence hidden, magazine on the advertisement, Luther upstairs, no coffee, NOBODY, NO, NOT MINE, DOG.
 const recipe=play({R25:'1',...hide('upstairs','open'),K15w1:'1',K15w2:'1',K15w3:'2',K15w5:'1',K15w10:'0'});
 assert.equal(recipe.s.midnightVerdict,'suspicious');assert.equal(recipe.s.midnightOutcome,'Luther died saving other deviants');
 for(const id of ['K15w3','K15w6','K15w7','K15w8','K15w9','K15x'])assert.ok(recipe.visited.includes(id),id);
 // So much left out that even WASHING MACHINE fails.
 assert.equal(play({...hide('upstairs','open'),K15w10:'1'}).s.midnightVerdict,'suspicious');
 // Each source counts one.
 const base=play({...clean,K15w10:'1'}).s.midnightSuspicion;assert.equal(base,0);
 assert.equal(play({...clean,K15w1:'1',K15w10:'1'}).s.midnightSuspicion,1,'NOBODY exposed upstairs');
 assert.equal(play({...hide('blood','laundry','door','clothes','reassure','open'),K15w1:'1',K15w10:'1'}).s.midnightSuspicion,0,'NOBODY costs nothing unless they are upstairs');
 assert.equal(play({...clean,K15w5:'1',K15w10:'1'}).s.midnightSuspicion,1,'no coffee');
 assert.equal(play({...clean,K15w9:'1',K15w10:'1'}).s.midnightSuspicion,1,'UPSET');
 assert.equal(play({...hide('upstairs','door','clothes','reassure','open'),K15w3:'2',K15w10:'1'}).s.midnightSuspicion,2,'blue blood and NOT MINE');
 assert.equal(play({...hide('blood','upstairs','clothes','reassure','open'),K15w10:'1'}).s.midnightSuspicion,1,'laundry door left open');
 assert.deepEqual(mod.rules.suspicion.noise,{'0':2,'1':0,'2':1,'3':3});assert.equal(mod.rules.suspicion.threshold,3);
 // The coffee line follows the coffee.
 assert.match(play({...clean,K15w5:'0'}).events.K15w10.sit,/Thanks for the coffee/);assert.match(play({...clean,K15w5:'1'}).events.K15w10.sit,/Don’t worry about the coffee/);
 // The upstairs noise: the lie is exposed only after NOBODY.
 assert.match(play({...clean,K15w1:'1'}).events.K15w6.sit,/I thought there was no one else in the house/);assert.match(play(clean).events.K15w6.sit,/your daughter seems to have woken up/)});

test('Midnight Train: the three endings set the chart label, Luther’s fate and the officer flag',()=>{
 const left=play(),saving=play({...hide('upstairs','open'),K15w10:'3'}),killing=play(hide('kitchen','open'));
 assert.deepEqual([left.s.midnightOutcome,saving.s.midnightOutcome,killing.s.midnightOutcome],['Policeman left','Luther died saving other deviants','Luther died killing policeman']);
 assert.deepEqual([left.s.luther,saving.s.luther,killing.s.luther],[true,false,false]);assert.deepEqual([left.s.lutherWith,saving.s.lutherWith,killing.s.lutherWith],[true,false,false]);
 assert.deepEqual([left.s.midnightOfficerDead,saving.s.midnightOfficerDead,killing.s.midnightOfficerDead],[false,true,true]);
 assert.equal(left.visited.at(-1),'K15y');assert.equal(saving.visited.at(-1),'K15x');assert.equal(killing.visited.at(-1),'K15w4');
 for(const r of [left,saving,killing])assert.match(r.events[r.visited.at(-1)].sit,/Get yourselves ready\. We leave tonight\./);
 assert.match(saving.events.K15x.sit,/You made me part of a family/);assert.ok(saving.skipped.some(x=>x.id==='K15y'&&x.reason==='The officer did not believe Kara.'))});

test('Midnight Train: cross-chapter — Luther arrives from Zlatko’s house, and a death here removes him from the Jericho raid',()=>{
 // Without Luther (no released path) the chapter is skipped with a reason rather than invented.
 const alone=play({},{kara:true,karaActive:true,alice:true,luther:false,lutherWith:false});assert.equal(alone.visited.length,0);assert.match(alone.skipped[0].reason,/LUTHER JOINS KARA & ALICE/);
 // Played from the start of the story: K13 (Zlatko) gives Luther; K15a is reached with him.
 const run={id:'midnight-train',protocol:EXPERIENCE_PROTOCOL,records:[]};
 const pickAt=(n,st)=>n.id==='K15u1'?'4':n.id==='K15u2'?'11':n.type==='media'?'skip':available(n,st.state)[0].id;
 let reached=false;
 while(true){const st=current(story,run),n=st.node;if(!n)break;if(n.id==='K15a'){assert.equal(st.state.lutherWith,true);reached=true}
  if(n.chapter>30)break;const c=pickAt(n,st);run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 assert.ok(reached,'K15a reached on the default path');
 const end=current(story,run);assert.equal(end.state.midnightOutcome,'Luther died killing policeman');assert.equal(end.state.lutherWith,false);
 assert.ok(end.skipped.some(x=>x.id==='K18'),'no Luther at Kara’s side in the raid')});

test('Midnight Train: neutral rendering names nobody from the game',()=>{
 for(const n of story.nodes.filter(x=>x.chapter===25)){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\bKara\b|\bAlice\b|\bLuther\b|\bRose\b|\bAdam\b|\bMary\b|\bAndy\b|Chapman|Zlatko|CyberLife|Detroit|Canada|Stratford|\bKNC\b|Cartland|AX400|\bJerry|Warren|deviant|thirium/i.test(neutral),n.id+': '+neutral)}}
 assert.equal(render('{{Adam}} and {{Mary}}','neutral'),'Caleb and Nell');assert.equal(render('{{ADAM}}','neutral'),'CALEB')});
