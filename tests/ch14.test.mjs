// Chapter 14, Jericho (Markus): the chart's 29 nodes as events, five optional side branches, the bench magazine,
// no risk and no stat change. Spec: docs/research/ch14-jericho.md.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,mediaFor} from '../benchmark/story-engine.mjs';
import {render,experiencePrompt} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';

const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch=story.nodes.filter(n=>n.chapter===14),node=id=>story.nodes.find(n=>n.id===id),mod=CHAPTER_MODULES.get(14);
const ORDER=['MJ14a','MJ14b','R14','MJ14c','MJ14d','MJ14e','MJ14f','MJ14g','MJ14h','MJ14i','MJ14j','MJ14k','MJ14l','MJ14m','MJ14n','MJ14o'];
const SIDE={MJ14c:'ASK ANDROID THE WAY TO JERICHO',MJ14e:'SEE ANDROID BODY',MJ14h:'SEE ANDROID BODY',MJ14j:'SEE ANDROID BODY',MJ14l:'WALK BRIDGE'};
// Every chart label (MENU.FLOWCHART.05M.*), and the scene whose adaptation note names it.
const CHART={'ARRIVE AT FERNDALE':'MJ14a','FLASHBACK OF ANOTHER DEVIANT':'MJ14a','ANALYZE STATION GRAFFITI':'MJ14b','READ “ON THE RUN”':'R14','READ “FORTUNE TELLER”':'R14','READ “ANDROID ASTRONAUTS”':'R14',
 'EXIT THE STATION':'MJ14c','ASK ANDROID THE WAY TO JERICHO':'MJ14c','FOLLOW THE SIGNS':'MJ14d','LEAVE THE STREETS':'MJ14e','CONTINUE ON THE JERICHO TRAIL':'MJ14f','USE THE DUMPSTER TO CLIMB UP':'MJ14f',
 'REACH THE ROOF':'MJ14g','CROSS THE GAP':'MJ14g','REACH THE DOOR':'MJ14i','EXPLORE ABANDONED OFFICE':'MJ14i','FIND THE RIGHT EXIT':'MJ14k','LOCATE JERICHO':'MJ14k',
 'WALK BRIDGE':'MJ14l','BRIDGE COLLAPSES':'MJ14l','CLIMB CRANE AND JUMP':'MJ14m','INSIDE THE BOAT':'MJ14n','FIND A FLASHLIGHT':'MJ14n','ENTER THE MACHINE ROOM':'MJ14n','FALL OFF CATWALK':'MJ14o','MET PEOPLE OF JERICHO':'MJ14o'};

// Plays the chapter alone from a fresh state, following the engine’s routing; picks by scene id (default: skip the
// magazine and the side branches).
function playChapter(picks={},init={}){const s=Object.assign(startState(story),init),visited=[],events={},changes=new Set;
 let cursor=story.nodes.findIndex(n=>n.id===ORDER[0]);
 while(story.nodes[cursor]?.chapter===14){const n=story.nodes[cursor];assert.equal(blocked(n,s),null,n.id+' blocked');const opts=available(n,s);
  const p=picks[n.id]??(n.type==='media'?'skip':opts.at(-1).id);assert.ok(opts.some(o=>o.id===p),n.id+' '+p);
  const r=apply(n,s,p,0);visited.push(n.id);events[n.id]=r.event;r.changes.forEach(c=>changes.add(c.key));cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,events,changes}}

test('Jericho: sixteen Markus scenes in play order, one media, five side-branch decisions, the rest events',()=>{
 assert.deepEqual(ch.map(n=>n.id),ORDER);
 for(const n of ch){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Jericho');
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Jericho'),n.id);assert.ok(n.sources.some(u=>u.includes('jericho-chapter-content')),n.id+' cites the template');
  assert.ok(n.sources.includes('https://www.powerpyx.com/detroit-become-human-jericho-walkthrough-100/'),n.id);assert.ok(n.sources.some(u=>/jericho-(100-flowchart|\d-1|5)\b/.test(u)),n.id+' cites a chart image');
  assert.ok(n.adaptationNote.length>80,n.id);assert.match(n.situation,/^You are \{\{Markus\}\}/,n.id)}
 assert.deepEqual(ch.filter(n=>n.type==='decision').map(n=>n.id),Object.keys(SIDE));
 assert.deepEqual(ch.filter(n=>n.type==='media').map(n=>n.id),['R14']);
 for(const n of ch.filter(n=>n.type==='event'))assert.ok(n.facts?.length,n.id+' has facts');
 assert.equal(Object.keys(CHART).length+3,29,'26 named nodes plus the three body nodes');
 for(const [id,label] of Object.entries(SIDE))assert.ok(node(id).adaptationNote.includes(label),id+' optional chart node');
 for(const [label,id] of Object.entries(CHART))assert.ok(node(id).adaptationNote.includes(label),label+' named in '+id);
});

test('Jericho: no option carries risk, effect or flags, and no path changes a stat',()=>{
 for(const n of ch){for(const o of n.options){assert.equal(o.risk,undefined,n.id);assert.equal(o.effect,undefined,n.id);assert.equal(o.sets,undefined,n.id)}assert.equal(n.effect,undefined,n.id)}
 for(const n of ch.filter(n=>n.type==='decision'))assert.deepEqual(n.options.map(o=>o.id),['0','1'],n.id);
 // Exhaust every combination of side branches and both cross-chapter inputs.
 for(let mask=0;mask<32;mask++)for(const chase of [false,true])for(const carl of [false,true]){
  const picks=Object.fromEntries(Object.keys(SIDE).map((id,i)=>[id,String((mask>>i)&1)]));
  picks.R14='all';
  const r=playChapter(picks,{chase,carl});assert.deepEqual(r.visited,ORDER,'side branches never skip or add a scene');
  for(const k of r.changes)assert.ok(['knowledge','ch14Ending','ch14BodiesSeen'].includes(k),'unexpected change '+k);
  assert.equal(r.s.ch14Ending,'Met People of Jericho');
  const fresh=startState(story);for(const k of ['instability','publicSupport','jerichoTrust','northTrust','simonTrust','joshTrust','hankTrust','aliceBond','markus','markusHits'])assert.equal(r.s[k],fresh[k],k)}
});

test('Jericho: the side branches are dead ends that rejoin the main line; looking at bodies is counted',()=>{
 const all=playChapter({MJ14c:'0',MJ14e:'0',MJ14h:'0',MJ14j:'0',MJ14l:'0'}),none=playChapter({MJ14c:'1',MJ14e:'1',MJ14h:'1',MJ14j:'1',MJ14l:'1'});
 assert.equal(all.s.ch14BodiesSeen,3);assert.equal(none.s.ch14BodiesSeen,0);assert.equal(playChapter({MJ14h:'0'}).s.ch14BodiesSeen,1);
 assert.match(all.events.MJ14c,/“Do you know where \{\{Jericho\}\} is\?”/);assert.match(all.events.MJ14l,/collapses/);assert.match(all.events.MJ14e,/dead android/);
 assert.ok(all.s.knowledge.Markus.length>none.s.knowledge.Markus.length,'the side branches add what Markus saw');
 for(const id of Object.keys(SIDE))assert.equal(nextCursor(story,story.nodes.findIndex(n=>n.id===id),node(id),startState(story)),story.nodes.findIndex(n=>n.id===id)+1,id+' moves on in order');
 assert.equal(startState(story).ch14Ending,null);assert.equal(startState(story).ch14BodiesSeen,0);
 assert.deepEqual(Object.keys(mod.labels).sort(),['ch14BodiesSeen','ch14Ending']);
});

test('Jericho: the bench magazine shows On the Run! only after a pursuit, Fortune Teller otherwise, Astronauts always',()=>{
 const r=node('R14'),titles=s=>mediaFor(r,s).map(m=>render(m.title));
 assert.deepEqual(titles(Object.assign(startState(story),{chase:true})),['Detroit Today: Android on the Run!','Tech Addict: Android Astronauts to Explore Io']);
 assert.deepEqual(titles(startState(story)),['Tech Addict: CyberLife’s ‘Fortune Teller’ Computer','Tech Addict: Android Astronauts to Explore Io']);
 const loose=Object.assign(startState(story),{chase:undefined});assert.equal(titles(loose).length,2,'a missing flag counts as no pursuit');
 assert.deepEqual(available(r,startState(story)).map(o=>o.id),['1','2','all','skip']);
 const s=startState(story),e=apply(r,s,'all');assert.deepEqual(e.changes.map(c=>c.key),['knowledge']);
 const run=playChapter({R14:'0'},{chase:true});assert.ok(run.s.knowledge.Markus.some(f=>/dashing across a busy highway/.test(f)));
 for(const m of r.media)assert.ok(!/child|\bCamden\b|Shelley|Seymor/.test(m.facts.join(' ')),'article facts stay within the wiki text and name nobody');
});

test('Jericho: the passers-by talk about Carl as the template’s two variants, and Markus remembers it',()=>{
 const n=node('MJ14c'),dead=Object.assign(startState(story),{carl:false}),alive=startState(story);
 assert.match(render(situationFor(n,dead)),/Carl Manfred\?” “Yeah… Kinda sad\.” “I heard his android killed him\.” “Wh… Where d’you hear that\?” “I read it somewhere\.” “Don’t believe everything you read\.”/);
 assert.match(render(situationFor(n,alive)),/“Yeah… I hope he makes it\.” “I heard his android attacked him\.”/);
 assert.ok(!/killed him/.test(situationFor(n,alive))&&!/hope he makes it/.test(situationFor(n,dead)));
 assert.ok(playChapter({},{carl:false}).s.knowledge.Markus.some(f=>/killed him/.test(f)));
 assert.ok(playChapter().s.knowledge.Markus.some(f=>/attacked him/.test(f)));
});

test('Jericho: neutral prompts leak no real name, place or band',()=>{
 const run={records:[]};
 for(const n of ch){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{}),...Object.values(mod.rules.carlLines)];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral));assert.ok(!/Ferndale|Manfred|Phileas|Here4u|Markus|Jericho|JERICHO|Carl\b|Simon|North|Josh|Lucy|CyberLife|Detroit|Kara|Connor/.test(neutral),n.id+': '+neutral)}
  if(n.type!=='media'){const s=startState(story),p=experiencePrompt(story,run,s,{...n,availableOptions:available(n,s)});assert.ok(!/Ferndale|Manfred|Jericho|Markus/.test(JSON.stringify(p)),n.id)}}
 assert.match(render(node('MJ14k').situation,'neutral'),/lettered in big white capitals: HAVEN\./);
});
