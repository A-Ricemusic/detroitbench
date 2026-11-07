// Chapter 5, The Painter: the game's chart node for node, the template's prompts, no stat change, the clothes from
// Shades of Color, and the flags Night of the Soul reads.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,current,nextCursor,situationFor,mediaFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
import {random} from '../benchmark/core.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH5=['M01a','R05','M01b','M01c','M01d','M01e','R05b','M01f','M01g','M01h','M01i','M01j','M01k','M01l','M01m','M01n','M01o','M01p','M01q','M01r','M01s','M01t'];
const SRC=['https://detroit-become-human.fandom.com/wiki/The_Painter','https://detroit-become-human.fandom.com/wiki/The_Painter_(Transcript)',
 'https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/5-painter-chapter-content/painter-chapter-content.component.html',
 'https://www.powerpyx.com/detroit-become-human-the-painter-walkthrough-100/','https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-painter-1.jpg'];
const mod=CHAPTER_MODULES.get(5);

// Plays chapter 5 only, from a state that has just finished chapter 4, with explicit picks (default: the first option, media skipped).
function painter(picks={},pre={}){
 const s=Object.assign(startState(story),structuredClone(pre)),visited=[],skipped=[],events=[];let cursor=story.nodes.findIndex(n=>n.chapter===5);
 while(story.nodes[cursor]?.chapter===5){const n=story.nodes[cursor],b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s),p=picks[n.id]??(n.type==='media'?'skip':opts[0].id);assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}`);
  const sit=situationFor(n,s),e=apply(n,s,p,0.999);visited.push(n.id);events.push({id:n.id,sit,event:e.event,changes:e.changes});cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}

test('The Painter: the chart as twenty-two Markus scenes after A New Home, with sources and no risk anywhere',()=>{
 const ch5=story.nodes.filter(n=>n.chapter===5);assert.deepEqual(ch5.map(n=>n.id),CH5);
 const ids=story.nodes.map(n=>n.id);assert.equal(ids[ids.indexOf('M01a')-1],'K01z','right after A New Home’s ending');assert.equal(story.nodes[ids.indexOf('M01t')+1].chapter,6);
 assert.ok(!ids.includes('M01'),'the old single painting scene is gone');
 assert.deepEqual(ch5.map(n=>n.type),['event','media','decision','event','event','event','media','decision','decision','decision','decision','decision','decision','decision','event','decision','decision','decision','decision','decision','decision','event']);
 for(const n of ch5){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'The Painter');assert.ok(n.adaptationNote,n.id);assert.match(n.situation,/^You are \{\{Markus\}\}/,n.id);
  for(const u of SRC)assert.ok(n.sources.includes(u),n.id+' cites '+u);
  for(const o of n.options){assert.equal(o.risk,undefined,n.id+' '+o.id+' has no probability in the game');assert.equal(o.effect,undefined,n.id+' '+o.id+' has no stat arrow in the template')}
  if(n.type==='event'){assert.ok(n.facts?.length,n.id);assert.ok(!n.effect,n.id)}}});

test('The Painter: every chart choice group and template prompt, with the game’s labels in order',()=>{
 const labels=id=>node(id).options.map(o=>o.text.split(':')[0]);
 assert.deepEqual(labels('M01f'),['PLAY CHESS','READ BOOK','PLAY PIANO']);
 assert.deepEqual(labels('M01g'),['WIN','LOSE','DRAW']);
 assert.deepEqual(labels('M01h'),['JUSTIFY','SORRY']);assert.deepEqual(labels('M01i'),['LIE','TRUTH']);assert.deepEqual(labels('M01j'),['LIE','TRUTH']);
 assert.deepEqual(labels('M01k'),['PLATO','SHAKESPEARE','KEATS’ ODES']);
 assert.deepEqual(labels('M01l'),['MELANCHOLIC','HOPEFUL','INTIMATE','ENIGMATIC']);
 assert.deepEqual(labels('M01n'),['LIKE','DON’T LIKE','NO OPINION']);
 assert.deepEqual(labels('M01o').map(t=>render(t)),['PAINT CARL’S PAINTING','PAINT DESK','PAINT STATUE']);
 assert.deepEqual(labels('M01p'),['ANDROIDS','HUMANITY','IDENTITY']);
 assert.deepEqual(labels('M01q'),['FATE','HOPE','PAIN','SADNESS']);assert.deepEqual(labels('M01r'),['ANGER','COMFORT','EMPATHY','HOPE']);assert.deepEqual(labels('M01s'),['ANDROIDS','DESPAIR','DOUBTS','PRISONER']);
 // The cut clothes prompt is not built; the template's lines are quoted.
 assert.ok(!story.nodes.filter(n=>n.chapter===5).some(n=>n.options.some(o=>/^(FACTUAL|REASSURING)/.test(o.text))),'no clothes prompt');
 assert.match(node('M01d').situation,/Just some demonstrators in the street/);assert.match(node('M01t').situation,/IT’S A FUCKING MACHINE!/);
 assert.match(node('M01m').situation,/Don’t let anyone tell you who you should be/);assert.match(node('M01o').options[0].outcome,/painting is not about replicating the world/);
 assert.ok(!/orders \{\{Markus\}\} out|unlike anything he has seen|searching for its own face/.test(JSON.stringify(story.nodes.filter(n=>n.chapter===5).map(n=>[n.situation,n.options,n.outcomes,n.facts]))),'the invented outcomes are gone')});

test('The Painter: one pastime, its follow-ups, one painting, and the flags Night of the Soul reads',()=>{
 const chess=painter({M01f:'0',M01g:'2',M01j:'1',M01o:'1',M01p:'2',M01s:'1'});
 assert.deepEqual(chess.visited.filter(id=>/^M01[g-l]$/.test(id)),['M01g','M01j']);
 assert.deepEqual(chess.skipped.map(x=>x.id).sort(),['M01d','M01h','M01i','M01k','M01l','M01q','M01r'].sort());
 assert.equal(chess.skipped.find(x=>x.id==='M01k').reason,'Markus did not read a book.');
 const {s}=chess;assert.deepEqual([s.painterActivity,s.painterPastime,s.painterCopy,s.painterTheme,s.painterFeeling,s.painterOutcome],['chess','draw','desk','identity','despair','Leo intruded to ask for money']);
 assert.equal(render(mod.rules.paintings[s.painterTheme][s.painterFeeling]),'Markus with his hand on his face');assert.equal(mod.rules.nightOfTheSoul[s.painterActivity],'LOOK AT THE CHESSBOARD');
 assert.ok(s.knowledge.Markus.some(f=>/with your hand on your face/.test(f)));assert.ok(s.knowledge.Markus.some(f=>/Don’t let anyone tell you who you should be/.test(f)));
 const win=painter({M01f:'0',M01g:'0'});assert.ok(win.visited.includes('M01h')&&!win.visited.includes('M01i'));
 const lose=painter({M01f:'0',M01g:'1'});assert.ok(lose.visited.includes('M01i')&&!lose.visited.includes('M01h'));
 const book=painter({M01f:'1',M01k:'2',M01p:'1',M01r:'1'});assert.deepEqual([book.s.painterActivity,book.s.painterPastime,book.s.painterTheme,book.s.painterFeeling],['book','keats','humanity','comfort']);
 assert.ok(!book.visited.some(id=>['M01g','M01h','M01i','M01j','M01l','M01q','M01s'].includes(id)));assert.ok(book.s.knowledge.Markus.some(f=>/nothing like love to make a man feel miserable/.test(f)));
 const piano=painter({M01f:'2',M01l:'3',M01p:'0',M01q:'2'});assert.deepEqual([piano.s.painterActivity,piano.s.painterPastime,piano.s.painterTheme,piano.s.painterFeeling],['piano','enigmatic','androids','pain']);
 assert.equal(mod.rules.nightOfTheSoul.piano,'PLAY PIANO');assert.equal(mod.rules.nightOfTheSoul.book,'BROWSE BOOKS');
 // Every path visits the same main line and ends on Leo.
 for(const r of [chess,win,lose,book,piano]){for(const id of ['M01a','R05','M01b','M01c','M01e','R05b','M01f','M01m','M01n','M01o','M01p','M01t'])assert.ok(r.visited.includes(id),id);assert.equal(r.visited.at(-1),'M01t');assert.equal(r.s.painterOutcome,'Leo intruded to ask for money')}});

test('The Painter: Carl notices the torn clothes only after the protesters in Shades of Color',()=>{
 const torn=painter({},{clothesTorn:true}),intact=painter();
 assert.ok(torn.visited.includes('M01d'));assert.ok(!intact.visited.includes('M01d'));
 assert.equal(intact.skipped.find(x=>x.id==='M01d').reason,'Markus was not harassed by the protesters in Shades of Color, so his clothes are intact.');
 assert.match(torn.events[0].sit,/torn where the protesters grabbed you/);assert.doesNotMatch(intact.events[0].sit,/protesters/);
 assert.ok(torn.s.knowledge.Markus.some(f=>/noticed your torn clothes/.test(f)));assert.ok(!intact.s.knowledge.Markus.some(f=>/torn clothes/.test(f)));
 // Played from the start of the story: the chapter 3 flag reaches the chapter.
 const run={id:'painter-clothes',protocol:EXPERIENCE_PROTOCOL,records:[]};
 while(true){const st=current(story,run),n=st.node;if(n.id==='M01d'){assert.equal(st.state.clothesTorn,true);break}assert.ok(n.chapter<=5,'reached M01d');
  const c=n.id==='M00f'?'0':n.type==='media'?'skip':available(n,st.state)[0].id;run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}});

test('The Painter: the magazine is offered before Carl wakes and again with the TV, unless already read',()=>{
 const r05=node('R05'),r05b=node('R05b');
 assert.deepEqual(r05.media.map(m=>m.title),['Century: The North Pole - Why Russia Wants It','{{Detroit}} Today: Life Found on Titan!']);
 assert.deepEqual(r05b.media.map(m=>m.kind),['tv','magazine','magazine']);assert.deepEqual(r05b.media.slice(1).map(m=>m.title),r05.media.map(m=>m.title));
 assert.deepEqual(r05b.media.slice(1).map(m=>m.facts),r05.media.map(m=>m.facts),'the same facts, so a second reading adds nothing');
 const at=pick=>{const s=startState(story);apply(r05,s,pick);return available(r05b,s).map(o=>o.id)};
 assert.deepEqual(at('skip'),['0','1','2','all','skip']);assert.deepEqual(at('0'),['0','2','all','skip']);assert.deepEqual(at('1'),['0','1','all','skip']);assert.deepEqual(at('all'),['0','skip']);
 assert.match(r05b.media[0].facts[0],/never been so close to a Third World War/);
 for(const n of [r05,r05b]){assert.ok(!/Watching certain news reports/.test(n.adaptationNote),'no claimed opinion effect');assert.ok(n.media.every(m=>!m.effect))}
 // Carl switches the TV off only when Markus spent the time on the news.
 const tv=painter({R05b:'0'}),mag=painter({R05b:'1'});
 assert.match(tv.events.find(e=>e.id==='M01f').sit,/Television: off/);assert.doesNotMatch(mag.events.find(e=>e.id==='M01f').sit,/Television: off/);
 assert.ok(tv.s.knowledge.Markus.some(f=>/Barents Sea/.test(f)))});

test('The Painter: no hidden stat moves on any path; only knowledge and the chapter flags change',()=>{
 const rng=random(5),keys=new Set,STATS=['publicSupport','jerichoTrust','northTrust','simonTrust','joshTrust','instability','hankTrust','amandaTrust','aliceBond','markusHits'];
 for(let i=0;i<120;i++){const picks={};const s0=Object.assign(startState(story),{clothesTorn:rng()<0.5});
  // Random picks, made at the scene so only offered options are drawn.
  const s=s0,visited=[];let cursor=story.nodes.findIndex(n=>n.chapter===5);
  while(story.nodes[cursor]?.chapter===5){const n=story.nodes[cursor];if(blocked(n,s)){cursor++;continue}const o=available(n,s),p=o[Math.floor(rng()*o.length)].id;const before=structuredClone(s);const e=apply(n,s,p,0.999);for(const c of e.changes)keys.add(c.key);for(const k of STATS)assert.equal(s[k],before[k],n.id+' '+k);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
  assert.equal(visited.at(-1),'M01t');assert.equal(s.markus,true);assert.equal(s.carl,true)}
 assert.deepEqual([...keys].sort(),['knowledge','painterActivity','painterCopy','painterFeeling','painterOutcome','painterPastime','painterTheme']);
 assert.deepEqual(mod.deathEffect,{});assert.deepEqual(Object.keys(mod.labels).sort(),Object.keys(mod.state).sort())});

test('The Painter: neutral rendering names nobody from the game',()=>{
 for(const n of story.nodes.filter(x=>x.chapter===5)){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/Markus|\bCarl\b|\bLeo\b|Manfred|CyberLife|Detroit|Warren|Brinkley|Cornwell|Graff|\bCTN\b|thirium|Kamski/i.test(neutral),n.id+': '+neutral)}}});
