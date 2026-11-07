// Chapter 27, Meet Kamski (Connor): the scenes, the game's buttons, the template's arrows, the two starts,
// the lobby clues and magazines, the test, the one question and the two endings.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id),ch27=story.nodes.filter(n=>n.chapter===27),mod=CHAPTER_MODULES.get(27);
// Plays the map with explicit picks (an array is consumed one entry per visit); risky actions succeed unless listed in `fails`.
function play(picks={},fails=[]){const s=startState(story),visited=[],skipped=[],q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;const events={};
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push(n.id);cursor++;continue}
  const opts=available(n,s),x=q[n.id],p=(Array.isArray(x)?x.shift():x)??(n.type==='media'?'skip':opts[0].id);assert.ok(opts.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  const before=structuredClone(s),e=apply(n,s,p,fails.includes(n.id)?0:0.999);(events[n.id]??=[]).push({event:e.event,before,after:structuredClone(s),options:opts.map(o=>o.id),situation:situationFor(n,before)});visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
const KIND={CP05:['5','6','3','4','7','8','9','11'],CP09:['1','2','4','8','9','11','13','16','18','20','21','29'],C01:'0',C03:'0',C04:'1',C05a:'0',C05:'0',C06:'0',C07:'0',C08:'0',C08b:'0',C09a:'1',C09:'0',C10:'0',C11:'0',C12:'0',C13:'0',C14:'0',C14b:'0'};
const label=o=>render(o.text,'real').split(':')[0];
const delta=(e,k)=>e.after[k]-e.before[k];

test('Meet Kamski: the chapter’s scenes in story order, each sourced and annotated',{timeout:120000},()=>{
 assert.deepEqual(ch27.map(n=>n.id),['C17a','C17b','C17c','C17d','C17e','C17f','C17g','R27','C17h','C17i','C17j','C17k','C17','C18','C18a','C18b']);
 assert.deepEqual(ch27.map(n=>n.type),['event','event','decision','event','decision','decision','decision','media','event','decision','decision','decision','decision','decision','event','event']);
 for(const n of ch27){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'Meet Kamski');assert.ok(n.adaptationNote,n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Meet_Kamski'),n.id);assert.match(n.situation,/^You are \{\{Connor\}\}/,n.id)}
 assert.ok(ch27.filter(n=>n.type==='decision'&&n.id!=='C17g').every(n=>n.sources.some(u=>u.includes('detroitbecometext'))),'every prompt cites the template');
 assert.ok(ch27.every(n=>!n.options.some(o=>typeof o.risk==='number')),'no timer or failure branch, so no risk');
 assert.deepEqual(mod.deathEffect,{},'Connor cannot die in this chapter');
 for(const k of ['kamskiArrival','kamskiAmandaPhoto','kamskiChloeShot','kamskiQuestion','kamskiLocation','jerichoLocated','kamskiExitHeard','kamskiOutcome'])assert.ok(mod.labels[k],k+' is labelled')});

test('Meet Kamski: every prompt offers the game’s buttons in the game’s order',{timeout:120000},()=>{
 const want={C17c:['INSTINCT','LEAD','KAMSKI','CHRIS'],C17e:['SINCERE','ANALYTICAL','INDIFFERENT'],C17f:['IMPATIENT','DISTANT','INDIFFERENT'],C17i:['HELP','DEVIANTS','VIRUS','WAR'],
  C17j:['NEUTRAL','DEFENSIVE','DIRECT'],C17k:['AGGRESSIVE','DEFENSIVE','TROUBLED','NEUTRAL'],C17:['SHOOT','DON’T SHOOT'],C18:['rA9','JERICHO LOCATION','VIRUS']};
 for(const [id,labels] of Object.entries(want))assert.deepEqual(node(id).options.map(label),labels,id);
 assert.match(render(node('C17d').situation,'real'),/Lieutenant Hank Anderson, Detroit Police Department/);
 assert.deepEqual(node('C18').options.map(o=>o.id),['1','0','2'],'0 stays the Jericho answer');
 assert.match(render(node('C17j').options[1].outcome,'real'),/It’s not about me, Mr\. Kamski/);assert.match(render(node('C18').options[1].outcome,'real'),/Ferndale Station is the door/)});

test('Meet Kamski: only the template’s arrows, with no Amanda or public-opinion change',{timeout:120000},()=>{
 const eff=(id,o)=>node(id).options.find(x=>x.id===o).effect??{};
 for(const n of ch27.filter(n=>n.type==='decision'))for(const o of n.options){const e=o.effect??{};const want=n.id==='C17j'&&o.id==='1'||n.id==='C17k'&&['1','2'].includes(o.id)?{instability:1}:n.id==='C17'?(o.id==='0'?{instability:-2,hankTrust:-2}:{instability:2}):{};assert.deepEqual(e,want,n.id+' '+o.id)}
 assert.deepEqual(eff('C17','1'),{instability:2},'no Hank change at DON’T SHOOT itself');assert.deepEqual(node('C18b').effect,{hankTrust:2},'Hank large up when leaving after sparing');assert.ok(!node('C18a').effect);
 for(const picks of [{C17:'0',C18:'0'},{C17:'0',C18:'1'},{C17:'1'}]){const r=play({...KIND,...picks});
  for(const [id,list] of Object.entries(r.events))if(node(id).chapter===27)for(const e of list){assert.equal(delta(e,'amandaTrust'),0,id);assert.equal(delta(e,'publicSupport'),0,id)}}
 const shoot=play({...KIND,C17:'0',C18:'0'}),spare=play({...KIND,C17:'1'});
 assert.equal(delta(shoot.events.C17[0],'hankTrust'),-2);assert.equal(delta(shoot.events.C17[0],'instability'),-2);
 assert.equal(delta(spare.events.C17[0],'hankTrust'),0);assert.equal(delta(spare.events.C17[0],'instability'),2);assert.equal(delta(spare.events.C18b[0],'hankTrust'),2);
 const shaken=play({...KIND,C17j:'1',C17k:'2',C17:'1'}),calm=play({...KIND,C17:'1'});assert.equal(shaken.s.instability-calm.s.instability,2,'DEFENSIVE then TROUBLED: two small ups')});

test('Meet Kamski: the two starts follow Public Enemy, and Chris’s news follows Capitol Park',{timeout:120000},()=>{
 const alive=play({...KIND,M16:'0'});assert.ok(alive.visited.includes('C17b')&&alive.skipped.includes('C17a'));assert.equal(alive.s.kamskiArrival,'together');
 assert.match(render(alive.events.C17b[0].event,'real'),/saved by Markus himself/);assert.deepEqual(alive.events.C17c[0].options,['0','1','2'],'no CHRIS answer when they arrive together');
 assert.equal(delta(alive.events.C17b[0],'hankTrust'),0);
 const killed=play({...KIND,M16:'1'});assert.match(render(killed.events.C17b[0].event,'real'),/executed in cold blood with his own service weapon/);
 assert.ok(killed.s.knowledge.Connor.some(f=>/executed with his own service weapon/.test(render(f,'real'))));
 const crowd=play({...KIND,M16:'2'});assert.match(render(crowd.events.C17b[0].event,'real'),/They found his body/,'the crowd always kills');
 // Connor dies on the roof in Public Enemy: he waits for Hank alone, Hank drops one small step, and CHRIS is offered.
 const dead=play({...KIND,M16:'1',C14:['9','1'],C16:'1',C17c:'3'});assert.ok(dead.visited.includes('C17a')&&dead.skipped.includes('C17b'));assert.equal(dead.s.kamskiArrival,'alone');
 assert.equal(delta(dead.events.C17a[0],'hankTrust'),-1);assert.deepEqual(dead.events.C17c[0].options,['0','1','2','3']);
 assert.match(render(dead.events.C17c[0].event,'real'),/Officer Miller was killed by deviants/);
 // The greeting: “You died in my arms” after a first death, “Still immortal” after more than one.
 const s=startState(story);delete s.ch24ConnorDied;s.choices.C16='0';s.connorDeaths=1;assert.equal(blocked(node('C17a'),s),null);assert.ok(blocked(node('C17b'),s));
 assert.match(render(apply(node('C17a'),structuredClone(s),'0').event,'real'),/You died in my arms/);
 s.connorDeaths=2;assert.match(render(apply(node('C17a'),structuredClone(s),'0').event,'real'),/Still immortal, huh Connor\?/);
 // Shielding Hank, or a failed shot or charge in the corridor, also count; a flag from a rebuilt chapter 24 wins.
 for(const [c,roll] of [['1',0],['2',0]]){const t=startState(story);t.ch24ConnorDied=true;t.choices.C16=c;t.rolls.C16=roll;assert.equal(blocked(node('C17a'),t),null,c)}
 const ok=startState(story);ok.choices.C16='1';ok.rolls.C16=0.999;assert.ok(blocked(node('C17a'),ok));ok.ch24ConnorDied=true;assert.equal(blocked(node('C17a'),ok),null);
 // No Capitol Park choice on the path: no news and no CHRIS answer.
 const none=startState(story);none.kamskiArrival='alone';assert.deepEqual(available(node('C17c'),none).map(o=>o.id),['0','1','2']);
 assert.equal(apply(node('C17b'),structuredClone(none),'0').event,node('C17b').outcomes['0'])});

test('Meet Kamski: the lobby clues, the Amanda photo flag and the magazines under it',{timeout:120000},()=>{
 const r=play({...KIND,C17g:['1','0','3','2','4'],R27:'all',C17:'1'});
 assert.equal(r.visited.filter(x=>x==='C17g').length,5);assert.ok(r.visited.includes('R27'));assert.equal(r.visited.indexOf('R27'),r.visited.indexOf('C17g')+3,'the magazines interrupt the lobby right after they are picked up');
 assert.equal(r.s.kamskiAmandaPhoto,true);assert.deepEqual({...r.s.kamskiLobby,last:undefined},{photo:true,painting:true,sculpture:true,magazine:true,left:true,last:undefined});
 const k=r.s.knowledge.Connor.map(f=>render(f,'real')).join(' ');
 for(const re of [/STERN, AMANDA \/ AI Professor at University of Colbridge \/ Born: 05\/14\/78 - Died: 02\/23\/27/,/KAMSKI, ELIJAH \/ AI Graduate at University of Colbridge \/ Born: 07\/17\/02/,/Cyberlife Founder - Resigned 2028|CyberLife Founder - Resigned 2028/,/Inventor of Thirium and bio-components technology/,/Clear Skies/,/one billion billion operations per second/])assert.match(k,re);
 assert.match(render(r.events.C17g[1].event,'real'),/Connor: “Amanda…”/);
 // The magazines need the photo; without them R27 is skipped once and the lobby can be left at once.
 const first=play({...KIND,C17g:'4',C17:'1'});assert.deepEqual(first.events.C17g[0].options,['0','1','2','4']);assert.ok(first.skipped.includes('R27'));assert.equal(first.s.kamskiAmandaPhoto,false);
 assert.deepEqual(node('C17g').options.find(o=>o.clue==='magazine').requires,{'kamskiLobby.photo':true});
 assert.deepEqual(node('R27').media.map(m=>render(m.title,'real')),['Tech Addict: Space Tourism on the Rise','Tech Addict: CyberLife’s ‘Fortune Teller’ Computer']);
 assert.ok(node('R27').media.every(m=>!m.effect),'no public-opinion change')});

test('Meet Kamski: the test, the one question and the two endings; the exit line plays on both paths',{timeout:120000},()=>{
 const jericho=play({...KIND,C17:'0',C18:'0'});assert.ok(jericho.visited.includes('C18')&&jericho.visited.includes('C18a')&&jericho.skipped.includes('C18b'));
 assert.equal(jericho.s.kamskiLocation,true);assert.equal(jericho.s.jerichoLocated,true);assert.equal(jericho.s.kamskiChloeShot,true);assert.equal(jericho.s.kamskiQuestion,'Jericho');
 assert.equal(jericho.s.kamskiOutcome,'Hank was disappointed with Connor’s decision');assert.ok(jericho.skipped.includes('C19'),'Last Chance skips the archive');
 for(const [c,q] of [['1','rA9'],['2','virus']]){const r=play({...KIND,C17:'0',C18:c});assert.equal(r.s.kamskiLocation,false);assert.equal(r.s.kamskiQuestion,q);assert.match(render(r.events.C18[0].event,'real'),/A war is coming/)}
 const spare=play({...KIND,C17:'1'});assert.ok(spare.skipped.includes('C18')&&spare.skipped.includes('C18a')&&spare.visited.includes('C18b'));assert.equal(spare.s.kamskiChloeShot,false);assert.equal(spare.s.kamskiQuestion,null);
 assert.equal(spare.s.kamskiOutcome,'Hank thought Connor made the right decision');assert.equal(spare.s.kamskiLocation,false);
 assert.match(render(spare.events.C17[0].event,'real'),/is itself a deviant/);assert.match(render(node('C18b').situation,'real'),/Maybe you did the right thing\./);
 for(const r of [jericho,spare]){assert.equal(r.s.kamskiExitHeard,true);assert.ok(r.s.knowledge.Connor.some(f=>/I always leave an emergency exit in my programs/.test(f)))}
 assert.match(render(node('C18a').situation,'real'),/A machine! That’s what you are!/)});

test('Meet Kamski: neutral text names no one from the game',{timeout:120000},()=>{
 const texts=ch27.flatMap(n=>[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})]);
 const moduleTexts=[];const s=startState(story);s.choices.M16='1';s.choices.C16='0';s.connorDeaths=2;moduleTexts.push(apply(node('C17a'),structuredClone(s),'0').event,apply(node('C17b'),structuredClone(s),'0').event);
 s.kamskiArrival='alone';moduleTexts.push(apply(node('C17c'),structuredClone(s),'3').event);s.choices.M16='0';moduleTexts.push(apply(node('C17b'),structuredClone(s),'0').event,apply(node('C17c'),structuredClone(s),'3').event);
 for(const t of [...texts,...moduleTexts]){const n=render(t,'neutral');assert.ok(!/\{\{/.test(n));
  assert.ok(!/Connor|Hank|Kamski|Elijah|Chloe|Amanda|Stern|Colbridge|Ferndale|rA9|RA9|Anderson|Miller|\bChris\b|Markus|Jericho|CyberLife|Cyberlife|Detroit|deviant|Thirium/i.test(n),'leak: '+n.slice(0,120))}});


test('Meet Kamski: rebuilt chapter inputs take precedence over legacy choices',()=>{
 const s=startState(story);delete s.ch24ConnorDied;s.choices.C16='0';s.publicEnemyConnorDied=true;s.ch24ConnorDied=false;
 assert.equal(mod.diedInPublicEnemy(s),false);s.ch24ConnorDied=true;assert.equal(mod.diedInPublicEnemy(s),true);
 s.choices.M16='1';s.capitolCopsSpared=false;s.capitolOfficers='revenge';s.capitolChrisDead=false;
 assert.equal(mod.chrisFate(s),'spared');s.capitolChrisDead=true;s.capitolOfficers='spared';assert.equal(mod.chrisFate(s),'killed');
 s.capitolChrisDead=null;assert.equal(mod.chrisFate(s),'spared');
 for(const f of ['revenge','crowd']){s.capitolOfficers=f;s.capitolCopsSpared=true;assert.equal(mod.chrisFate(s),'killed')}
 s.capitolOfficers=null;assert.equal(mod.chrisFate(s),'spared');delete s.capitolCopsSpared;assert.equal(mod.chrisFate(s),'killed');
 assert.deepEqual(node('C17g').repeatWhile,{'kamskiLobby.left':false});
});
