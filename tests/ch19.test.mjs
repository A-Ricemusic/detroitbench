// Chapter 19, Spare Parts (Markus): scenes, labels, arrows, risk rolls, endings and the John flag for Freedom March.
// Specification: docs/research/ch19-spare-parts.md. Path totals are the note's §3 checks (template arrows, small = 1, large = 2).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,promptFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {random} from '../benchmark/core.mjs';
import {ARROWS,RISKS,ENDINGS} from '../benchmark/chapters/ch19.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH19=['M05a','M05b','M05c','M05d','M05e','M05f','M05g','M05h','M05i','M05j','M05k','M05l','M05m','M05n','M05o'];
const TYPES=['event','decision','decision','event','decision','decision','decision','decision','decision','decision','event','decision','decision','decision','event'];
const W='https://detroit-become-human.fandom.com/wiki/Spare_Parts',
 T='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html',
 PP='https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/',IMG='https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-1.jpg';
const stats=s=>({jer:s.jerichoTrust,north:s.northTrust,simon:s.simonTrust,josh:s.joshTrust});

// Plays chapter 19 alone from a fresh state. Risky actions succeed (roll 0.999) unless `rolls` gives a roll for the scene.
function ch19(picks={},rolls={},rng=null){const s=startState(story),visited=[],skipped=[],events={};let cursor=story.nodes.findIndex(n=>n.id==='M05a');
 while(story.nodes[cursor]?.chapter===19){const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push(n.id);cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const p=picks[n.id]??(rng?opts[Math.floor(rng()*opts.length)].id:opts[0].id);
  assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p);const r=apply(n,s,p,rolls[n.id]??(rng?rng():0.999));events[n.id]=render(r.event,'real');visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
// Plays the whole story with explicit picks (option 0 elsewhere; media skipped; risky actions succeed).
function full(picks={}){const s=startState(story);let cursor=0,guard=0;const events={};
 while(cursor<story.nodes.length){assert.ok(guard++<2000);const n=story.nodes[cursor];if(blocked(n,s)){cursor++;continue}const opts=available(n,s);
  const q=picks[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':opts[0].id);const r=apply(n,s,p,0.999);events[n.id]=render(r.event,'real');cursor=nextCursor(story,cursor,n,s)}
 return {s,events}}

test('chapter 19: fifteen scenes in chart order replace the old M05 to M08, all Markus, each citing its sources',()=>{
 const ch=story.nodes.filter(n=>n.chapter===19);assert.deepEqual(ch.map(n=>n.id),CH19);assert.deepEqual(ch.map(n=>n.type),TYPES);
 const ids=story.nodes.map(n=>n.id);for(const old of ['M05','M06','M07','M08'])assert.ok(!ids.includes(old),old+' is gone');
 assert.ok(ids.indexOf('M05a')>ids.indexOf('C11')&&ids.indexOf('M05o')<ids.indexOf('C12'),'between Russian Roulette and The Eden Club');
 for(const n of ch){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Spare Parts');assert.ok(n.adaptationNote,n.id);
  for(const u of [W,T,PP,IMG])assert.ok(n.sources.includes(u),n.id+' cites '+u);if(n.type==='event')assert.ok(n.situation.startsWith('You are {{Markus}}'),n.id)}
});

test('chapter 19: button prompts show the game’s labels in the chart’s order',()=>{
 const LABELS={M05e:['KILL GUARD','GRAB AND HIDE','RUN AWAY','HIDE'],M05f:['ATTACK','RELEASE','HOLD'],M05h:['FREE THEM','CLOSE AGAIN'],M05i:['ACCEPT','REFUSE'],M05j:['GET THE KEY','LEAVE'],M05n:['ABANDON','SAVE']};
 for(const [id,labels] of Object.entries(LABELS))assert.deepEqual(node(id).options.map(o=>o.text.split(':')[0]),labels,id);
 assert.deepEqual(node('M05l').options.slice(0,3).map(o=>o.text.split(':')[0]),['TAKE GUN','ATTRACT GUARD','SHORT CIRCUIT']);
 assert.equal(node('M05l').options.length,4,'plus walking in (MARKUS GETS SPOTTED)');
 assert.deepEqual(node('M05b').options.length,2);assert.deepEqual(node('M05g').options.length,2,'the crate can be skipped');
});

test('chapter 19: every choice arrow is the template’s, and only gameplay checks with a chart failure branch roll',()=>{
 const eff=(id,o)=>node(id).options.find(x=>x.id===o).effect;
 assert.deepEqual(eff('M05e','0'),ARROWS.killGuard);assert.deepEqual(eff('M05e','2'),ARROWS.runAway);assert.equal(eff('M05e','1'),undefined);assert.equal(eff('M05e','3'),undefined);
 assert.deepEqual(eff('M05f','0'),ARROWS.attack);assert.equal(eff('M05f','1'),undefined);assert.equal(eff('M05f','2'),undefined);
 assert.deepEqual(eff('M05h','0'),ARROWS.freeThem);assert.equal(eff('M05h','1'),undefined);
 assert.deepEqual(eff('M05i','0'),ARROWS.accept);assert.equal(eff('M05i','1'),undefined);
 assert.deepEqual(eff('M05j','0'),ARROWS.getKey);assert.deepEqual(eff('M05j','1'),ARROWS.leave);
 for(const o of node('M05n').options)assert.equal(o.effect,undefined,'SAVE and ABANDON carry no arrow');
 for(const a of [ARROWS.droneUnharmed,ARROWS.droneDamaged,ARROWS.freeThem,ARROWS.accept])assert.ok(!('jerichoTrust' in a),'the wiki’s extra Jericho arrows are not built');
 const risky=story.nodes.filter(n=>n.chapter===19).flatMap(n=>n.options.filter(o=>typeof o.risk==='number').map(o=>n.id+':'+o.id+'='+o.risk));
 assert.deepEqual(risky,['M05c:0=0.2','M05l:0=0.3','M05l:1=0.25','M05l:2=0.2','M05m:0=0.15']);
});

test('chapter 19: the research note’s path totals',()=>{
 // Drone ✓, grab and release, free, accept, get key, lure, avoid.
 const truck=ch19({M05e:'1',M05f:'1',M05g:'0',M05h:'0',M05i:'0',M05j:'0',M05l:'1'});
 assert.deepEqual(stats(truck.s),{jer:2,north:4,simon:4,josh:3});assert.equal(truck.s.ch19Ending,ENDINGS.truck);assert.equal(truck.s.john,true);assert.equal(truck.s.ch19JohnFate,'with Jericho');
 assert.deepEqual(truck.skipped,['M05m','M05n']);
 // Same, but John refused after freeing: the alarm, the fence, full bags.
 const refused=ch19({M05e:'1',M05f:'1',M05g:'0',M05h:'0',M05i:'1'});
 assert.deepEqual(stats(refused.s),{jer:1,north:3,simon:3,josh:3});assert.equal(refused.s.ch19Ending,ENDINGS.bags);assert.equal(refused.s.john,false);
 assert.equal(refused.s.ch19JohnFate,'left behind at the warehouse');assert.match(refused.events.M05i,/NO BETTER THAN HUMANS/);
 // Ran at the first encounter, drone ✓.
 const ran=ch19({M05e:'2'});assert.deepEqual(stats(ran.s),{jer:-3,north:-2,simon:-1,josh:-1});assert.equal(ran.s.ch19Ending,ENDINGS.failed);
 assert.deepEqual(ran.visited,['M05a','M05b','M05c','M05d','M05e','M05m','M05o']);assert.match(ran.events.M05o,/we failed/);
 // Truck attempt caught in the control room, then ABANDON (full bags), drone ✓, crate left.
 const caught=ch19({M05e:'1',M05f:'1',M05g:'0',M05h:'1',M05i:'0',M05j:'0',M05l:'3',M05n:'0'});
 assert.deepEqual(stats(caught.s),{jer:-1,north:0,simon:1,josh:1});assert.equal(caught.s.ch19Ending,ENDINGS.bags);assert.equal(caught.s.john,false);assert.equal(caught.s.ch19JohnFate,'killed by the dogs');
 assert.equal(caught.s.ch19Guards,'MARKUS GETS SPOTTED');
});

test('chapter 19: the drone roll and HIDE',()=>{
 const hurt=ch19({M05e:'3'},{M05c:0});assert.equal(hurt.s.ch19Drone,'MARKUS DAMAGED');assert.match(hurt.events.M05c,/Nothing I can’t handle/);
 // Drone ✗ (−1 North, Simon, Josh), HIDE (no arrow), ran-away block (Jericho −2, others −1).
 assert.deepEqual(stats(hurt.s),{jer:-2,north:-2,simon:-2,josh:-2});assert.equal(hurt.s.ch19Ending,ENDINGS.failed);assert.equal(hurt.s.ch19Return,'ran away when the guard arrived');
 assert.match(hurt.events.M05e,/four androids hiding/);assert.equal(hurt.s.ch19JohnDeviant,false);
 const fine=ch19({M05e:'3'});assert.equal(fine.s.ch19Drone,'MARKUS UNHARMED');
 const s=startState(story);assert.deepEqual(available(node('M05c'),s).map(o=>o.risk),[RISKS.drone]);
});

test('chapter 19: threatening the guards splits its failure into TRIGGER ALARM and KILL GUARDS',()=>{
 const path={M05e:'1',M05f:'2',M05g:'1',M05i:'0',M05j:'0',M05l:'0',M05n:'0'};
 const won=ch19(path,{M05l:0.5});assert.equal(won.s.ch19Guards,'INCAPACITATE GUARDS');assert.equal(won.s.ch19KeyStolen,true);assert.equal(won.s.ch19DerekKilled,false);assert.equal(won.s.ch19Ending,ENDINGS.truck);
 const killed=ch19(path,{M05l:0.2});assert.equal(killed.s.ch19Guards,'KILL GUARDS');assert.equal(killed.s.ch19DerekKilled,true);assert.equal(killed.s.ch19KeyStolen,true);
 assert.equal(killed.s.ch19Ending,ENDINGS.truck);assert.match(killed.events.M05o,/covered in blood/,'a kill on a successful mission ends on the bloody hand');
 assert.deepEqual(stats(killed.s),stats(won.s),'killing a guard Josh never sees changes no arrow');
 const alarm=ch19(path,{M05l:0.05});assert.equal(alarm.s.ch19Guards,'TRIGGER ALARM');assert.equal(alarm.s.ch19KeyStolen,false);assert.equal(alarm.s.ch19Fence,'control alarm');
 assert.ok(alarm.visited.includes('M05n'),'the dogs maul John');assert.equal(alarm.s.ch19Ending,ENDINGS.bags);
 // Drone ✓ +1, accept, get key, seen (Jericho −2, North −2, Simon −1, Josh −1), full bags +1.
 assert.deepEqual(stats(alarm.s),{jer:-1,north:0,simon:1,josh:1});
 for(const [o,label] of [['1','FAIL TO AVOID GUARDS'],['2','FAIL TO AVOID GUARDS']]){const r=ch19({...path,M05l:o},{M05l:0});assert.equal(r.s.ch19Guards,label);assert.equal(r.s.ch19Fence,'control alarm')}
 for(const o of ['1','2']){const r=ch19({...path,M05l:o});assert.equal(r.s.ch19Guards,'AVOID GUARDS');assert.equal(r.s.ch19Ending,ENDINGS.truck)}
});

test('chapter 19: the fence, SAVE and ABANDON, and the rescued ending; Markus never dies',()=>{
 const base={M05e:'1',M05f:'1',M05g:'1',M05i:'0',M05j:'0',M05l:'3'};
 const save=ch19({...base,M05n:'1'});assert.equal(save.s.john,false);assert.equal(save.s.ch19MarkusRescued,true);assert.equal(save.s.ch19Ending,ENDINGS.failed);assert.equal(save.s.ch19Return,'Markus rescued');
 // Drone ✓, accept, get key, seen, rescued (Jericho −2, North −2, Simon −1, Josh −1).
 assert.deepEqual(stats(save.s),{jer:-4,north:-3,simon:-1,josh:-1});
 const where=situationFor(node('M05o'),(()=>{const r=ch19({...base,M05n:'1'});return r.s})());assert.match(where,/where’s \{\{John\}\}/);
 // Fails the upper fence: no dogs scene, and John is still alive later (wiki Notes, continuity error).
 const slow=ch19(base,{M05m:0});assert.ok(!slow.visited.includes('M05n'));assert.equal(slow.s.john,true);assert.equal(slow.s.ch19JohnFate,'with Jericho');assert.equal(slow.s.ch19Ending,ENDINGS.failed);
 // LEAVE: no alarm, the easier fence roll, John comes home.
 const quiet=ch19({M05e:'1',M05f:'1',M05g:'1',M05i:'0',M05j:'1'});assert.equal(quiet.s.ch19Fence,'quiet');assert.equal(quiet.s.john,true);assert.equal(quiet.s.ch19Ending,ENDINGS.bags);
 const s=startState(story);s.ch19Fence='quiet';assert.deepEqual(available(node('M05m'),s).map(o=>o.risk),[RISKS.fenceQuiet]);
 s.ch19Fence='warehouse alarm';assert.deepEqual(available(node('M05m'),s).map(o=>o.risk),[RISKS.fence]);
 const rng=random(19),endings=new Set,guards=new Set;
 for(let i=0;i<400;i++){const r=ch19({},{},rng);assert.equal(r.s.markus,true);assert.ok(r.s.ch19Ending,'an ending is recorded');endings.add(r.s.ch19Ending);if(r.s.ch19Guards)guards.add(r.s.ch19Guards);
  assert.equal(r.visited.length+r.skipped.length,CH19.length);assert.equal(r.s.john,r.s.ch19JohnFate==='with Jericho');}
 assert.deepEqual([...endings].sort(),Object.values(ENDINGS).sort(),'all three endings are reachable');
 assert.deepEqual([...guards].sort(),['AVOID GUARDS','FAIL TO AVOID GUARDS','INCAPACITATE GUARDS','KILL GUARDS','MARKUS GETS SPOTTED','TRIGGER ALARM']);
});

test('chapter 19: the ending event applies exactly one Jericho block and records the chart label',()=>{
 const r=ch19({M05e:'1',M05f:'1',M05g:'1',M05i:'0',M05j:'0',M05l:'2'}),s=startState(story);
 Object.assign(s,{ch19KeyStolen:true,ch19JohnJoined:true,john:true});const e=apply(node('M05o'),s,'0');
 assert.deepEqual(stats(s),{jer:2,north:2,simon:2,josh:1});assert.equal(s.ch19Ending,ENDINGS.truck);
 assert.deepEqual(e.changes.map(c=>c.key).sort(),['ch19Ending','ch19JohnFate','ch19Return','jerichoTrust','joshTrust','knowledge','northTrust','simonTrust'].sort());
 assert.ok(r.s.knowledge.Markus.some(f=>/stolen truck full of spare parts/.test(f)),'Markus remembers the outcome');
});

test('chapter 19: neutral prompts leak no real names, and John is a companion only once he has joined',()=>{
 const LEAK=/\bMike\b|\bJohn\b|\bNorth\b|\bSimon\b|\bJosh\b|\bDerek\b|\bAl\b|deviant|DEVIANT|CyberLife|Jericho|Markus|Detroit/;
 for(const n of story.nodes.filter(n=>n.chapter===19)){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts)assert.ok(!LEAK.test(render(t,'neutral')),n.id+': '+render(t,'neutral'))}
 assert.match(render('Is {{Mike}} still in Zone 4?','neutral'),/Gus/);
 const st=startState(story);apply(node('M05e'),st,'1');assert.equal(st.john,false,'grabbing John does not make him a companion');apply(node('M05i'),st,'0');assert.equal(st.john,true,'ACCEPT does');
 const run={protocol:EXPERIENCE_PROTOCOL,records:[]};assert.ok(promptFor(story,run),'the controller still builds prompts');
});

test('chapter 19 feeds Freedom March: a John who joined and came home sacrifices himself there',()=>{
 const withJohn=full({M05e:'1',M05f:'1',M05i:'0',M05j:'0',M05l:'1',M18e:'1',M18g:'1',M18h:'1',M19a:'1'});
 assert.match(withJohn.events.M19a??'',/\{\{John\}\}|John/,'John throws himself in front of Markus');assert.equal(withJohn.s.john,false);assert.equal(withJohn.s.ch19JohnJoined,true);
 const refused=full({M05e:'1',M05f:'1',M05i:'1',M18e:'1',M18g:'1',M18h:'1',M19a:'1'});assert.ok(!/John/.test(refused.events.M19a??''),'a refused John is not at the march');
});
