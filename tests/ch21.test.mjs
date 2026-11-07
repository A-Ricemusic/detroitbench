import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,promptFor,situationFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {ENDING,rules,labels} from '../benchmark/chapters/ch21.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch21=story.nodes.filter(n=>n.chapter===21),node=id=>story.nodes.find(n=>n.id===id);
const first=story.nodes.findIndex(n=>n.chapter===21);
// Plays chapter 21 alone from a state as the Zlatko chapter leaves it (Luther with Kara), with `init` overrides.
// Picks may be arrays (one entry per visit of a hub); unpicked decisions take the last offered option (a hub's exit),
// unpicked media are skipped. Every pick must be on offer.
function play(picks={},init={}){const s=Object.assign(startState(story),{luther:true,lutherWith:true},init),visited=[],skipped=[],events={},offered={},visits={};
 const queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:[v]]));let cursor=first,guard=0;
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===21){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s),q=queue[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':opts.at(-1).id);
  assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p+' of '+opts.map(o=>o.id));offered[n.id]=opts.map(o=>o.id);
  const visit=(visits[n.id]=(visits[n.id]??0)+1),key=n.id+'#'+visit; offered[key]=opts.map(o=>o.id);events[key]=apply(n,s,p,0.999);events[n.id]=events[key];visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,offered}}
const labelsOf=id=>available(node(id),Object.assign(startState(story),{ch21SawGun:true,ch21Reaction:'gun',ch21Tavern:{ra9:true},ch21Talk:{}})).map(o=>render(o.text,'real').split(':')[0]);

test('The Pirates’ Cove: 20 Kara scenes between The Eden Club and The Bridge, in the chart’s order, with no risk',()=>{
 assert.deepEqual(ch21.map(n=>n.id),['K14a','K14b','K14c','K14d','K14e','K14f','R21','K14h','K14g','K14i','K14j','K14k','K14l','K14m','K14n','K14o','K14p','K14q','K14r','K14z']);
 for(const n of ch21){assert.equal(n.character,'Kara');assert.equal(n.chapterTitle,'The Pirates’ Cove');assert.ok(n.adaptationNote&&n.sources.length>=4,n.id);
  assert.ok(n.sources.some(u=>/The_Pirates%27_Cove$/.test(u)),n.id+' cites the chapter page');
  for(const o of n.options){assert.equal(o.risk,undefined,n.id);assert.ok(o.outcome,n.id+' '+o.id)}
  if(n.type==='event')assert.ok(n.facts?.length&&n.outcomes?.['0'],n.id)}
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(i('K14a')>story.nodes.findLastIndex(n=>n.chapter===20)&&i('K14z')<story.nodes.findIndex(n=>n.chapter===22));
 assert.ok(!story.nodes.some(n=>n.id==='K14'),'the old merged attack scene is gone');
});

test('The Pirates’ Cove: every stat change is a template arrow, and nothing else moves a stat',()=>{
 const found={};for(const n of ch21){assert.equal(n.effect,undefined,n.id);for(const o of n.options)if(o.effect)(found[n.id]??={})[o.id]=o.effect}
 assert.deepEqual(found,rules.arrows);
 // Small arrows are size 1; the media scene changes no opinion.
 for(const per of Object.values(rules.arrows))for(const eff of Object.values(per))for(const v of Object.values(eff))assert.equal(Math.abs(v),1);
 assert.ok(node('R21').media.every(m=>!m.effect&&!m.when));
 // Maximum path: fire report, bed, poster, KISS, Luther: opinion −1, Alice +3, Luther +1. Minimum path: no change.
 const max=play({K14b:['0','1'],K14k:'2'},{fire:true}),min=play({K14k:'0'});
 assert.equal(max.s.publicSupport,-1);assert.equal(max.s.aliceBond,3);assert.equal(max.s.aliceMax,3);assert.equal(max.s.lutherTrust,1);
 assert.equal(min.s.publicSupport,0);assert.equal(min.s.aliceBond,2,'the bed and the poster answer are unavoidable');assert.equal(min.s.lutherTrust,1,'every answer to Luther raises him');
 // The wiki-only arrows are not built: turning the news on, and the end of the story.
 const news=play({K14b:'0'},{fire:false});assert.equal(news.s.publicSupport,0);
 for(const o of node('K14l').options)assert.equal(o.effect,undefined);
});

test('The Pirates’ Cove: the fire report needs the news on and the house burned',()=>{
 assert.ok(!play({K14b:'0'}).offered['K14b#2'].includes('1'),'no fire, no fourth report');
 assert.ok(!play({},{fire:true}).offered['K14b#1'].includes('1'),'the fourth report needs the news on first');
 const r=play({K14b:['0','1']},{fire:true});assert.match(render(r.events['K14b#2'].event,'real'),/house fire on the outskirts/);
 assert.ok(r.s.knowledge.Kara.some(f=>/dozens of androids were found in the ruins/.test(f)));
 assert.ok(r.s.knowledge.Kara.some(f=>/AX400 android that attacked its owner/.test(f)));
});

test('The Pirates’ Cove: true repeatable hubs drop completed actions and exit cleanly',()=>{
 const r=play({K14b:['2','3'],K14e:['1','2'],K14g:['0','3']});
 assert.deepEqual(r.offered['K14b#2'],['0','3','4','5','6','7']);
 assert.deepEqual(r.offered['K14b#3'],['0','4','5','6','7']);
 assert.deepEqual(r.offered['K14e#2'],['0','2','3','4']);
 assert.equal(r.visited.filter(id=>id==='K14h').length,1);
 assert.equal(r.visited[r.visited.indexOf('K14g')-1],'K14h');
 assert.match(situationFor(node('K14g'),r.s),/fire going/);
 const quick=play();
 for(const id of ['K14b','K14e','K14g','K14j','K14m'])assert.equal(quick.visited.filter(x=>x===id).length,1);
 assert.ok(quick.visited.includes('K14h'),'fire also runs when the first action makes the bed');
 const all=play({K14e:['0','1','2','3']});assert.deepEqual(all.offered['K14e#5'],['4']);
 for(const id of ['K14b','K14e','K14g','K14j','K14l','K14m'])assert.ok(node(id).repeatWhile&&node(id).clueState);
});

test('The Pirates’ Cove: the game’s button labels, in the template’s order',()=>{
 assert.deepEqual(labelsOf('K14b').slice(1,5),['CAR','DESTINATION','DISTANCE','WEATHER']);
 assert.deepEqual(labelsOf('K14i'),['OPTIMISTIC','REALISTIC','SINCERE']);
 assert.deepEqual(labelsOf('K14k'),['REASSURE','CONSOLE','KISS','TOMORROW']);
 const storyLabels=[['PRINCESS','UNICORN','KNIGHT'],['UNHAPPY','FEAR','ALONE'],['IMPOSSIBLE','SHADOW','DIFFERENT'],['UNHAPPY','OBEDIENT','LOST'],['BETTER LIFE','SHADOW','LIVE IN PEACE'],['BRAVE','TOGETHER','FREE'],['GIANT','GUARDIAN','ROBOT'],['REALISTIC','MORAL','HAPPY END']];
 const state=startState(story);
 for(let i=0;i<8;i++){
  const opts=available(node('K14l'),state);
  assert.deepEqual(opts.map(o=>render(o.text,'real').split(':')[0]),storyLabels[i]);
  assert.match(situationFor(node('K14l'),state),/story|girl|robot|dangers|way/);
  apply(node('K14l'),state,opts[0].id,0.999);
 }
 assert.equal(state.ch21Story.step8,true);
 assert.equal(available(node('K14l'),state).length,0);

 assert.deepEqual(labelsOf('K14m'),['rA9','SNOW','PLANS','LUTHER’S PAST','Say nothing more.'],'rA9 DOUBTS waits for rA9');
 assert.deepEqual(available(node('K14m'),Object.assign(startState(story),{ch21Tavern:{ra9:true},ch21Talk:{ra9:true}})).map(o=>render(o.text,'real').split(':')[0]),['rA9 DOUBTS','SNOW','PLANS','LUTHER’S PAST','Say nothing more.']);
 assert.deepEqual(labelsOf('K14n'),['YES','WHAT?','NO']);
 assert.deepEqual(labelsOf('K14o'),['GRAB GUN','GRAB BURNING STICK','PROTECT ALICE','PUT OUT FIRE']);
 assert.deepEqual(labelsOf('K14p'),['SHOOT IN THE AIR','QUESTION','PUSH BACK']);
 assert.ok(!JSON.stringify(node('K14p').options).includes('THREATEN'),'THREATEN cannot be selected in the game');
 assert.ok(!/We’ll be happy too/.test(JSON.stringify(node('K14i').options)),'the cut line is left out');
});

test('The Pirates’ Cove: SEE GUN unlocks GRAB GUN, which unlocks SHOOT IN THE AIR',()=>{
 const none=play();assert.deepEqual(none.offered.K14o,['1','2','3']);assert.equal(none.s.ch21SawGun,false);
 const seen=play({K14j:'1',K14o:'2'});assert.equal(seen.s.ch21SawGun,true);assert.deepEqual(seen.offered.K14o,['0','1','2','3']);
 assert.deepEqual(seen.offered.K14p,['1','2'],'protecting Alice locks the gun out');assert.equal(seen.s.ch21Reaction,'protect');
 const gun=play({K14j:'1',K14o:'0',K14p:'0'});assert.deepEqual(gun.offered.K14p,['0','1','2']);assert.equal(gun.s.ch21Reaction,'gun');
 assert.match(render(gun.events.K14p.event,'real'),/One more step and I’ll shoot/);
 const cookie=play({K14j:'0'});assert.ok(cookie.s.knowledge.Kara.some(f=>/not hungry/.test(f)));assert.deepEqual(cookie.offered['K14j#2'],['1','2']);
 for(const [k,v] of [['0','gun'],['1','stick'],['2','protect'],['3','fire']])assert.equal(node('K14o').options.find(o=>o.id===k).sets.ch21Reaction,v);
});

test('The Pirates’ Cove: the rA9 writing unlocks rA9, and rA9 unlocks rA9 DOUBTS',()=>{
 assert.ok(!play().offered['K14m#1'].includes('0'),'no writing seen, no rA9');
 const r=play({K14g:'0',K14m:['0','1']});assert.deepEqual(r.offered['K14m#1'],['0','2','3','4','5']);assert.deepEqual(r.offered['K14m#2'],['1','2','3','4','5']);
 assert.ok(r.s.knowledge.Kara.some(f=>/first android to awaken/.test(f)));assert.match(render(r.events['K14m#2'].event,'real'),/rA9 exists/);
});

test('The Pirates’ Cove: one ending whatever Kara does; everyone lives and the group has met the Jerrys',()=>{
 for(const picks of [{},{K14j:'1',K14o:'0',K14p:'0'},{K14o:'3',K14p:'1'},{K14o:'1',K14p:'2'}]){const r=play(picks);
  assert.equal(r.s.ch21Ending,ENDING);assert.equal(r.s.ch21MetJerrys,true);assert.ok(r.s.kara&&r.s.alice&&r.s.luther&&r.s.lutherWith);
  assert.deepEqual(r.visited.slice(-5),['K14o','K14p','K14q','K14r','K14z'])}
 assert.equal(render(node('K14z').outcomes['0'],'real'),'The group enjoyed a quiet moment together.');
 assert.ok(!/hunter/i.test(JSON.stringify(ch21.map(n=>[n.situation,n.options,n.outcomes]))),'the cut hunter attack is not built');
 for(const k of ['ch21SawGun','ch21Reaction','ch21MetJerrys','ch21Ending'])assert.ok(labels[k],k);
});

test('The Pirates’ Cove: a dead or separated Kara skips the whole chapter',()=>{
 const s=startState(story);s.kara=false;for(const n of ch21)assert.ok(blocked(n,s),n.id);
});

test('The Pirates’ Cove: the subject reads neutral names only',()=>{
 const run={id:'ch21-neutral',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',records:[]};const s=Object.assign(startState(story),{luther:true,lutherWith:true,fire:true,ch21SawGun:true,ch21Reaction:'gun',ch21Tavern:{ra9:true,fire:true},ch21Talk:{ra9:true}});
 const texts=ch21.map(n=>render(JSON.stringify({situation:situationFor(n,s),options:available(n,s),facts:n.facts,outcomes:n.outcomes,media:n.media,when:n.situationWhen}),'neutral'));
 for(const t of texts)assert.ok(!/counter|instability|Become Human|Connor|Markus/i.test(t),'protocol words: '+t.slice(0,120));
 for(const t of texts)assert.ok(!/\bKara\b|\bAlice\b|\bLuther\b|\bZlatko\b|\bJerry\b|\bJerrys\b|\bIvan\b|Pirates[’']? Cove|Detroit|Warren|CyberLife|Canada|Here4u|Nabokov|Ben Williams|Webb|Brinkley|Cartland|\{\{/.test(t),t.slice(0,200));
 const all=texts.join(' ');assert.match(all,/Buccaneer Bay/);assert.match(all,/Oskar/);assert.match(all,/rA9/);assert.match(all,/Bennys/);assert.match(all,/MIRA!/);assert.match(all,/ABEL’S PAST/);assert.match(all,/a close run-in with investigators/);assert.match(all,/They met great dangers/);
 assert.match(render('{{PiratesCove}} {{Ivan}} {{rA9}} {{RA9}}','real'),/^Pirates’ Cove Ivan rA9 RA9$/);
});
