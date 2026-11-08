// Chapter 7, Stormy Night: every chart ending, the cross-chapter inputs (gun, window) and outputs (todd, gun, Kara's death,
// ch07Outcome, ch07Fought, ch07ToddChased), and the absence of stat arrows. Spec: docs/research/ch07-stormy-night.md.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {ENDINGS,RISKS,rules,labels} from '../benchmark/chapters/ch07.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH7=story.nodes.filter(n=>n.chapter===7).map(n=>n.id);

// Plays from the start through chapter 7 with explicit picks (first option otherwise; media skipped). Risky actions succeed
// unless `fails` lists the scene. Returns the state after chapter 7, the chapter-7 scenes visited and the events.
// A pick may be an array, consumed one entry per visit of a repeatable scene (A New Home's floors).
function play(picks={},fails=[]){const s=startState(story),visited=[],events={},entry={},queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0;
 while(cursor<story.nodes.length){const n=story.nodes[cursor];if(n.chapter>7)break;if(blocked(n,s)){cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const q=queue[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':opts[0].id);
  if(n.type!=='media')assert.ok(opts.some(o=>o.id===p),'unavailable pick '+n.id+' '+p);
  if(n.chapter===7&&!visited.length)Object.assign(entry,structuredClone(s));const r=apply(n,s,p,fails.includes(n.id)?0:0.999);if(n.chapter===7){visited.push(n.id);events[n.id]=r.event}cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,events,entry}}
const NO_GUN=['0','5','10'],GUN=['0','1','5','10'],WINDOW=['0','5','10']; // since story 1.9.5 tidying Alice's room opens the window
const UP={K03:'0',K03u:'0'};                       // GO UPSTAIRS → GET TO ALICE BEFORE TODD
const LOCKED={...UP,K03b:'1'};                     // LOCK ROOM
const WIN={K01d:WINDOW,...LOCKED,K03e:'2'};        // OPEN WINDOW
const STUN={K01d:NO_GUN,K03:'1',K03r:'0',K04a:'1'}; // REASON WITH TODD → shoved → DEFEND ALICE unarmed → STUN TODD

test('chapter 7 scenes are in story order, all Kara, and every scene plays at most once on a path',()=>{
 assert.deepEqual(CH7,['K02','K03','K03r','K03u','K03b','K03c','K03e','K03f','K03g','K03h','K04','K04a','K04b','K04s','K04c','K04l','K04h','K04r','K04d','K04y','K04z']);
 for(const id of CH7){const n=node(id);assert.equal(n.character,'Kara');assert.equal(n.chapterTitle,'Stormy Night');assert.ok(n.adaptationNote,id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Stormy_Night'),id);
  if(id!=='K02'&&id!=='K03')assert.deepEqual(n.when,{ch07Next:id},id+' is gated on the chapter step')}
 for(const p of [{},{K02:'1'},STUN,{...STUN,K04h:'1'},WIN,{K01d:GUN,K03:'2'}]){const r=play(p);assert.equal(new Set(r.visited).size,r.visited.length)}});

test('the deviancy wall: obeying, or keeping out of it, ends in TODD KILLS ALICE with Kara destroyed',()=>{
 for(const [p,why] of [[{K02:'1'},/never broke her programming/],[{K03:'3'},/kept out of it/],[{K01d:NO_GUN,K03:'2',K04a:'2'},/did not go in/],[{K01d:GUN,K03:'2',K04:'0',K04a:'2'},/did not go in/]]){
  const r=play(p);assert.equal(r.s.ch07Outcome,ENDINGS.toddKillsAlice);assert.equal(r.s.kara,false);assert.equal(r.s.alice,false);assert.equal(r.s.todd,true);assert.match(r.s.karaOutcome,why)}
 const obey=play({K02:'1'});assert.deepEqual(obey.visited,['K02']);
 const free=play({});assert.ok(free.s.knowledge.Kara.some(f=>/broke through/.test(f)))});

test('reasoning downstairs is the template’s three-button prompt, then Todd reaches Alice first',()=>{
 assert.deepEqual(node('K03r').options.map(o=>o.text.split(':')[0]),['CALM','DETERMINED','UNDERSTANDING']);
 for(const v of ['0','1','2']){const r=play({...STUN,K03r:v});assert.ok(r.visited.includes('K04a'));assert.ok(!r.visited.includes('K04'),'no gun seen, no gun scene');assert.match(r.events.K03r,/smacks/)}});

test('TAKE GUN needs the gun seen in A New Home, is offered once, and Todd reaches Alice first',()=>{
 const k03u=node('K03u'),s=startState(story);s.ch07Next='K03u';assert.deepEqual(available(k03u,s).map(o=>o.id),['0','2']);
 s.gunDiscovered=true;assert.deepEqual(available(k03u,s).map(o=>o.id),['0','1','2']);assert.match(situationFor(k03u,s),/handgun in the drawer/);
 const early=play({K01d:GUN,...UP,K03u:'1'});assert.equal(early.s.gun,true);assert.ok(!early.visited.includes('K04'),'already armed');assert.ok(early.visited.includes('K04a'));
 assert.deepEqual(available(node('K04a'),{...early.s,ch07Next:'K04a'}).map(o=>o.id),['0','2'],'armed: THREATEN WITH GUN or stay out');
 for(const p of [{K03:'2'},{K03:'1'},{...UP,K03u:'2'},{...UP,K03b:'2'},{...UP,K03b:'0',K03c:'1'}]){
  assert.ok(play({K01d:GUN,...p}).visited.includes('K04'),JSON.stringify(p));assert.ok(!play({K01d:NO_GUN,...p}).visited.includes('K04'),JSON.stringify(p))}
 const failedHide=play({K01d:GUN,...UP,K03b:'0',K03c:'0'},['K03c']);assert.ok(failedHide.visited.includes('K04'));assert.match(failedHide.events.K03c,/drags \{\{Alice\}\} into her room/);
 const unarmed=play({K01d:NO_GUN,K03:'2'});assert.deepEqual(available(node('K04a'),{...unarmed.s,ch07Next:'K04a'}).map(o=>o.id),['1','2'],'unarmed: DEFEND ALICE or stay out')});

test('the gun ends with Todd shot: Kara or Alice, by the player’s choice, and the gun goes on',()=>{
 for(const [v,ending] of [['0',ENDINGS.karaShot],['1',ENDINGS.aliceShot]]){
  const r=play({K01d:GUN,K03:'2',K04:'0',K04a:'0',K04b:v});assert.equal(r.s.ch07Outcome,ending);assert.equal(r.s.todd,false);assert.equal(r.s.gun,true);assert.equal(r.s.kara,true);assert.equal(r.s.alice,true);
  assert.ok(r.visited.includes('K04s'));assert.ok(!r.visited.includes('K04c'));assert.equal(r.s.ch07Fought,false);assert.equal(r.s.ch07Next,null)}
 assert.ok(!node('K04b').options.some(o=>'risk' in o),'who shoots is a choice, not a roll')});

test('the hide route: hiding evades Todd through the front door, or fights its way out through the yard',()=>{
 const evaded=play({...UP,K03b:'0',K03c:'0',K04r:'1',K04z:'0'});assert.equal(evaded.s.ch07Outcome,ENDINGS.evaded);assert.equal(evaded.s.todd,true);assert.equal(evaded.s.gun,false);assert.equal(evaded.s.ch07Fought,false);assert.equal(evaded.s.ch07ToddChased,false);
 assert.match(situationFor(node('K04z'),{...evaded.s,ch07Next:'K04z'}),/YOU HAVE TO OBEY ME/);
 const yard=play({...UP,K03b:'0',K03c:'0',K04r:'0'});assert.equal(yard.s.ch07Outcome,ENDINGS.foughtOut);assert.ok(['K04d','K04y','K04z'].every(id=>yard.visited.includes(id)));
 const door=play({...UP,K03b:'0',K03c:'0',K04r:'1'},['K04r']);assert.ok(door.visited.includes('K04d'),'FAIL TO OPEN DOOR → FIGHT DOWNSTAIRS');assert.equal(door.s.ch07Outcome,ENDINGS.foughtOut);
 // A Kara who hid gets two tries at the fight downstairs; after the fight upstairs, one.
 const hid={...play({...UP,K03b:'0',K03c:'0',K04r:'0'}).s,ch07Next:'K04d',ch07Fought:false};assert.equal(available(node('K04d'),hid)[0].risk,rules.fightDownstairsAfterHiding);
 assert.equal(available(node('K04d'),{...hid,ch07Fought:true})[0].risk,RISKS.fightDownstairs)});

test('locking the door: lamp, talk and waiting lead to REFUSE / ACCEPT and the fight; the window needs the way down',()=>{
 const k03e=node('K03e'),s=startState(story);s.ch07Next='K03e';assert.deepEqual(available(k03e,s).map(o=>o.id),['0','1','3']);s.window=true;assert.deepEqual(available(k03e,s).map(o=>o.id),['0','1','2','3']);
 for(const v of ['0','1','3'])for(const a of ['0','1']){const r=play({...LOCKED,K03e:v,K03h:a,K04h:'0',K04z:'0'});assert.ok(r.visited.includes('K03h')&&r.visited.includes('K04c'));assert.equal(r.s.ch07Outcome,ENDINGS.foughtOut)}
 assert.deepEqual(node('K03h').options.map(o=>o.text.split(':')[0]),['REFUSE','ACCEPT']);
 const out=play({...UP,K03b:'3'});assert.ok(out.visited.includes('K03h'),'[ OUT OF TIME ] → TODD BREAKS INTO BEDROOM');
 const speak=play({K01d:NO_GUN,...UP,K03b:'2'});assert.ok(speak.visited.includes('K04a'),'SPEAK TO TODD → GET TO ALICE AFTER TODD')});

test('the window: GO OUT / SHUT WINDOW, then JOIN ALICE / FACE TODD; escaping evades Todd, failing is death outside',()=>{
 assert.deepEqual(node('K03b').options.map(o=>render(o.text,'real').split(':')[0]),['RUN WITH ALICE','LOCK ROOM','SPEAK TO TODD','[ OUT OF TIME ]']);
 const esc=play({...WIN,K03f:'0',K03g:'0',K04z:'0'});assert.equal(esc.s.ch07Outcome,ENDINGS.evaded);assert.equal(esc.s.ch07Exit,'window');assert.ok(!esc.visited.includes('K03h'));
 const fell=play({...WIN,K03f:'0',K03g:'0'},['K03g']);assert.equal(fell.s.ch07Outcome,ENDINGS.outside);assert.equal(fell.s.kara,false);assert.equal(fell.s.alice,false);
 for(const p of [{K03f:'1'},{K03f:'0',K03g:'1'}]){const r=play({...WIN,...p,K04h:'0',K04z:'0'});assert.ok(r.visited.includes('K04c'));assert.ok(!r.visited.includes('K03h'),'the template goes straight to the fight');assert.equal(r.s.ch07Outcome,ENDINGS.foughtOut)}});

test('stunning Todd: he chases them; the door, the yard and the bus decide between fighting out and four deaths',()=>{
 const out=play({...STUN,K04h:'0',K04z:'0'});assert.equal(out.s.ch07Outcome,ENDINGS.foughtOut);assert.equal(out.s.ch07Fought,true);assert.equal(out.s.ch07ToddChased,true);assert.equal(out.s.todd,true);assert.equal(out.s.gun,false);
 assert.ok(out.s.knowledge.Kara.some(f=>/He is hurt, not dead/.test(f)));
 const deaths=[[{K04h:'2'},[],ENDINGS.corridor],[{K04h:'1'},['K04d'],ENDINGS.downstairs],[{K04h:'1'},['K04y'],ENDINGS.outside],[{K04h:'0',K04z:'1'},[],ENDINGS.outside],[{K04h:'0'},['K04h','K04d'],ENDINGS.downstairs]];
 for(const [p,f,ending] of deaths){const r=play({...STUN,...p},f);assert.equal(r.s.ch07Outcome,ending,JSON.stringify(p)+f);assert.equal(r.s.kara,false);assert.equal(r.s.alice,false);assert.equal(r.s.todd,true);assert.match(r.s.karaOutcome,/\{\{Todd\}\}/)}
 const yard=play({...STUN,K04h:'1',K04z:'0'});assert.equal(yard.s.ch07Exit,'yard');assert.equal(yard.s.ch07Outcome,ENDINGS.foughtOut)});

test('all nine chart endings are reachable, and only the four survivals let Kara go on',()=>{
 const seen=new Set([play({K02:'1'}),play({K01d:GUN,K03:'2',K04:'0',K04a:'0',K04b:'0'}),play({K01d:GUN,K03:'2',K04:'0',K04a:'0',K04b:'1'}),play({...STUN,K04h:'2'}),play({...STUN,K04h:'0',K04z:'0'}),
  play({...STUN,K04h:'1'},['K04d']),play({...WIN,K03f:'0',K03g:'0'},['K03g']),play({...STUN,K04h:'0',K04z:'1'}),play({...UP,K03b:'0',K03c:'0',K04r:'1',K04z:'0'})].map(r=>r.s.ch07Outcome));
 assert.deepEqual([...seen].sort(),Object.values(ENDINGS).sort());
 for(const e of rules.survivals)assert.ok(Object.values(ENDINGS).includes(e))});

test('no stat arrow anywhere in the chapter; risks only on the chart’s pass/fail checks',()=>{
 for(const p of [{},{K02:'1'},STUN,{K01d:GUN,K03:'2',K04:'0',K04a:'0',K04b:'1'},WIN]){const r=play(p);
  for(const k of ['aliceBond','aliceMax','publicSupport','instability','hankTrust','amandaTrust'])assert.equal(r.s[k],r.entry[k],k)}
 const risky=CH7.flatMap(id=>node(id).options.filter(o=>'risk' in o).map(o=>id+':'+o.id));
 assert.deepEqual(risky,['K03c:0','K03g:0','K04h:0','K04r:1','K04d:0','K04y:0']);
 for(const id of CH7)for(const o of node(id).options){assert.ok(!o.effect,id+' has no effect');
  for(const t of [o.text,o.outcome,o.fact].filter(Boolean))assert.ok(!/Todd|Alice|Kara|Detroit|deviant/i.test(render(t,'neutral')),id+' leaks a name')}});

test('the template’s lone RUN AWAY and report labels use the module contract',()=>{
  assert.deepEqual(node('K04l').options.map(o=>o.text.split(':')[0]),['RUN AWAY']);
  const r=play(STUN);assert.equal(r.visited[r.visited.indexOf('K04c')+1],'K04l');
  assert.equal(r.visited[r.visited.indexOf('K04l')+1],'K04h');
  assert.equal(labels.ch07Outcome,'Stormy Night ending');
  for(const id of CH7)if(node(id).options.some(o=>'risk' in o))assert.match(node(id).adaptationNote,/no source gives|unsourced/);
 });

test('all template and chart-only bedroom prompt labels retain the game order',()=>{
 for(const [id,want] of Object.entries({K03r:['CALM','DETERMINED','UNDERSTANDING'],K03b:['RUN WITH ALICE','LOCK ROOM','SPEAK TO TODD','[ OUT OF TIME ]'],K03e:['GRAB LAMP','TALK TO ALICE','OPEN WINDOW'],K03f:['GO OUT','SHUT WINDOW'],K03g:['JOIN ALICE','FACE TODD'],K03h:['REFUSE','ACCEPT'],K04l:['RUN AWAY']}))
  assert.deepEqual(node(id).options.slice(0,want.length).map(o=>render(o.text,'real').split(':')[0]),want,id);
});
test('each of the five death boxes records both deaths and a Kara outcome',()=>{
 for(const [p,f] of [[{K02:'1'},[]],[{...STUN,K04h:'2'},[]],[{...STUN,K04h:'1'},['K04d']],[{...WIN,K03f:'0',K03g:'0'},['K03g']],[{...STUN,K04h:'0',K04z:'1'},[]]]){
  const {s}=play(p,f);assert.equal(s.kara,false);assert.equal(s.alice,false);assert.equal(s.todd,true);assert.ok(s.karaOutcome&&s.karaOutcome!=='unresolved');assert.ok(Object.values(ENDINGS).includes(s.ch07Outcome));
 }
});
