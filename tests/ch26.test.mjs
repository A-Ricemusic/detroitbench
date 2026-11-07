// Chapter 26, Capitol Park (Markus): the chart's securing phase, the three flee endings, the store, the protest meter,
// the Molotov, the officers and the news. Specification: docs/research/ch26-capitol-park.md.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';import {random} from '../benchmark/core.mjs';
import {render} from '../benchmark/experience-prompt.mjs';import {rules,message} from '../benchmark/chapters/ch26.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch=story.nodes.filter(n=>n.chapter===26),sub={...story,nodes:ch},node=id=>ch.find(n=>n.id===id);
const IDS=['CP01','CP02','R26','CP03','CP04','CP05','CP06','CP07','CP08','CP09','CP10','M16','CP11'];

// Plays chapter 26 alone from a fresh state (plus `init`). Picks may be arrays, one entry per visit of a repeatable scene;
// risky actions succeed unless `fails` names the scene (or `id#visit`). With `rng`, unlisted picks and their rolls are random;
// `stop` ends the run before that scene.
function play(picks={},fails=[],init={},rng=null,stop=null){const s=Object.assign(startState(story),structuredClone(init)),visited=[],skipped=[],events=[],situations={};
 const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;
 while(cursor<ch.length){assert.ok(guard++<500,'routing loop');const n=ch[cursor];if(n.id===stop)break;const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const want=Array.isArray(q[n.id])?q[n.id].shift():q[n.id];
  const pick=want??(n.type==='media'?'skip':opts[rng?Math.floor(rng()*opts.length):0].id);assert.ok(opts.some(o=>o.id===pick),`${n.id}: ${pick} not offered (${opts.map(o=>o.id)})`);
  const visit=visited.filter(x=>x===n.id).length+1,roll=fails.includes(n.id)||fails.includes(n.id+'#'+visit)?0:(rng&&want===undefined?rng():0.999);
  (situations[n.id]??=[]).push(situationFor(n,s));const e=apply(n,s,pick,roll);events.push(e.event);visited.push(n.id);cursor=nextCursor(sub,cursor,n,s)}
 return {s,visited,skipped,events,situations,text:events.join(' ')}}
const base=startState(story);
// Securing the plaza in full, then the ram: scan, jump, analyse, alarm (drone already down), road, truck, ram.
const SECURE=['5','6','3','4','7','8','9','11'];
const PEACEFUL=['1','2','4','8','9','11','13','16','18','20','21','29'];

test('Capitol Park: thirteen scenes in the chart’s order, each sourced and noted',()=>{
 assert.deepEqual(ch.map(n=>n.id),IDS);
 for(const n of ch){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Capitol Park');assert.ok(n.adaptationNote,n.id);assert.match(n.situation,/^You are \{\{Markus\}\}/,n.id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Capitol_Park'),n.id);assert.ok(n.sources.some(u=>/detroitbecometext/.test(u)),n.id);assert.ok(n.sources.some(u=>/powerpyx/.test(u)),n.id);
  if(n.type==='event')assert.ok(n.facts?.length,n.id)}
 for(const id of ['CP05','CP09'])assert.ok(node(id).repeatWhile,id+' is repeatable');
 assert.deepEqual(node('M16').options.map(o=>o.text.split(':')[0]),['REVENGE','SPARE','DON\'T DECIDE']);
 assert.deepEqual(node('M16').options.map(o=>o.id),['1','0','2'],'ids keep the earlier meaning: 0 spare, 1 kill, 2 crowd');
 assert.deepEqual(node('CP05').options.filter(o=>o.requires?.capitolPrompt==='car').map(o=>o.text.split(':')[0]),['Abandon Mission','Act Natural','HIDE']);
 assert.deepEqual(node('CP09').options.filter(o=>o.requires?.capitolPrompt==='molotov').map(o=>o.text.split(':')[0]),['REFUSE','TAKE'])});

test('Capitol Park: every text renders in both modes and leaks no real name',()=>{
 const real=/Connor|Kara|Markus|North\b|Simon|Josh|Jericho|CyberLife|Detroit|Capitol|Tina|\bChen\b|CHEN|TINA|DPD|Chris|Miller|Brinkley|Cartland|Webb|\bKNC\b|\bCTN\b|Stratford|BL100|deviant/;
 for(const n of ch){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral)&&!/\{\{/.test(render(t,'real')),n.id);assert.ok(!real.test(neutral),n.id+': '+neutral)}}
 // The engine's own narration in the module renders too.
 const r=play({CP05:['5','6','15']},['CP05#2']);for(const e of r.events)assert.ok(!real.test(render(e,'neutral')),e)});

test('Capitol Park: a secured raid, a peaceful protest and spared officers',()=>{
 const r=play({CP03:'0',CP05:SECURE,CP07:'0',CP09:PEACEFUL,M16:'0'});
 assert.equal(r.s.capitolRaid,'succeeded');assert.equal(r.s.capitolMessage,'pacifist');assert.equal(r.s.capitolEnding,'MARKUS LED A PEACEFUL PROTEST');
 assert.equal(r.s.capitolOfficers,'spared');assert.equal(r.s.capitolChrisDead,false);assert.equal(r.s.capitolOtherNorth,true);assert.equal(r.s.capitolMolotov,null,'never offered once the protest reads peaceful');
 assert.deepEqual(r.skipped.map(x=>x.id),['CP06']);
 // North: drone +1, alarm after the drone +1 (wiki), the speech +2. Jericho: the speech +2. Public opinion: pacifist +2.
 assert.equal(r.s.northTrust-base.northTrust,4);assert.equal(r.s.jerichoTrust-base.jerichoTrust,2);assert.equal(r.s.publicSupport-base.publicSupport,2);
 assert.equal(r.s.joshTrust,base.joshTrust);assert.equal(r.s.simonTrust,base.simonTrust);
 for(const l of ['MISSION START','AVOID POLICE CAR','REACH STORE','JUMP ON DRONE','DESTROY DRONE','DEACTIVATE ALARM','BLOCK ROAD','FIND TRUCK','RAM STORE','POLICE NOT ALERTED','INSIDE THE STORE','CONVERT ANDROIDS AND MAKE A STATEMENT','MAKE A STATEMENT','PLANT FLAG','SEND A STRONG MESSAGE','PACIFIST MESSAGE','MARKUS LED A PEACEFUL PROTEST','POLICE PATROL ARRIVES','SPARE','TEAM RETURN TO JERICHO'])assert.ok(r.s.capitolNodes.includes(l),l);
 assert.match(r.situations.CP11[0],/graffiti demanding rights for androids/);assert.match(r.situations.CP11[0],/state of shock/);
 assert.ok(r.s.knowledge.Markus.some(f=>/state of shock/.test(f)))});

test('Capitol Park: the Molotov at the pavilion makes a pyre and a riot; killing the officers costs opinion again',()=>{
 const r=play({CP05:SECURE,CP07:'1',CP09:['21','31','27','28','25','0','5','10','14','17','12','3','29'],M16:'1'});
 assert.equal(r.s.capitolMolotov,'taken');assert.ok(r.s.capitolNodes.includes('ACCEPT MOLOTOV')&&r.s.capitolNodes.includes('MAKE A PYRE'));
 assert.equal(r.s.capitolMessage,'aggressive');assert.equal(r.s.capitolEnding,'MARKUS LED A VIOLENT RIOT');assert.equal(r.s.capitolOtherNorth,false);
 for(const l of ['BURN CARS','BURN CYBERLIFE','BURN DUMPSTERS','BURN HOTEL','KILL'])assert.ok(r.s.capitolNodes.includes(l),l);
 assert.ok(!r.s.capitolNodes.includes('BURN COFFEE SHOP'),'the followers take the coffee shop');
 // North: drone +1, alarm +1, speech +2, take +1, statue +1, benches +1, parking +1, shop windows +1, car +1, aggressive +1, revenge +1.
 assert.equal(r.s.northTrust-base.northTrust,12);assert.equal(r.s.jerichoTrust-base.jerichoTrust,3,'speech +2, shop windows +1 (wiki)');
 assert.equal(r.s.publicSupport-base.publicSupport,-4);assert.equal(r.s.capitolChrisDead,true);
 assert.match(r.situations.CP11[0],/set alight/);assert.match(r.situations.CP11[0],/executed with their own service weapons/)});

test('Capitol Park: the Molotov forces the riot even when most actions were peaceful; refusing costs North',()=>{
 const taken=play({CP05:SECURE,CP09:['17','31','1','2','4','8','9','11','13','20','29']});
 assert.ok(taken.s.capitolPeace/(taken.s.capitolPeace+taken.s.capitolViolence)>=0.6);assert.equal(taken.s.capitolMessage,'aggressive');
 const refused=play({CP05:SECURE,CP09:['19','30','1','2','4','8','9','11','13','16','29']});
 assert.equal(refused.s.capitolMolotov,'refused');assert.equal(refused.s.capitolMessage,'pacifist');assert.ok(refused.s.capitolNodes.includes('REFUSE MOLOTOV'));
 assert.equal(refused.s.northTrust-taken.s.northTrust,-1-1-1-1,'refuse −1 against take +1, car +1 (wiki) and the aggressive message +1');
 // At the pavilion with a peaceful record the flag goes up without an offer; first thing, North always offers.
 const flag=play({CP05:SECURE,CP09:['1','21','29','29','29']});assert.equal(flag.s.capitolMolotov,null);assert.ok(flag.s.capitolNodes.includes('PLANT FLAG'));
 const first=play({CP05:SECURE,CP09:['21','30','29','29','29']});assert.equal(first.s.capitolMolotov,'refused');assert.ok(first.s.capitolNodes.includes('PLANT FLAG'))});

test('Capitol Park: between 40% and 60% the protest counts as a riot; nothing at all fails to send a message',()=>{
 assert.equal(message({capitolPeace:0,capitolViolence:0,capitolMolotov:null}),'failed');
 assert.equal(message({capitolPeace:3,capitolViolence:2,capitolMolotov:null}),'pacifist');
 assert.equal(message({capitolPeace:1,capitolViolence:1,capitolMolotov:null}),'aggressive');
 assert.equal(message({capitolPeace:5,capitolViolence:0,capitolMolotov:'taken'}),'aggressive');
 const r=play({CP05:SECURE,CP09:['29','29'],M16:'2'});
 assert.equal(r.s.capitolMessage,'failed');assert.equal(r.s.capitolEnding,'MARKUS FAILED TO DELIVER HIS MESSAGE');assert.ok(r.s.capitolNodes.includes('FAIL TO SEND A MESSAGE'));
 assert.equal(r.visited.filter(x=>x==='CP09').length,2);assert.ok(r.visited.includes('CP10')&&r.visited.includes('M16'),'the police scene still follows');
 assert.equal(r.s.capitolOfficers,'crowd');assert.equal(r.s.capitolChrisDead,true);
 // North: drone +1, alarm +1, speech +2, take too much time again −1. Opinion: failed +2 (wiki), officers killed −2.
 assert.equal(r.s.northTrust-base.northTrust,3);assert.equal(r.s.publicSupport,base.publicSupport);assert.match(r.text,/you just fucking stood there/)});

test('Capitol Park: RETREAT when the ten minutes run out',()=>{
 const r=play({CP05:['12','12','12','12','12']});
 assert.equal(r.s.capitolRaid,'fled');assert.equal(r.s.capitolEnding,'RETREAT');assert.ok(r.s.capitolNodes.includes('OUT OF TIME'));
 assert.ok(r.visited.includes('CP06'));for(const id of ['CP07','CP08','CP09','CP10','M16','CP11'])assert.ok(r.skipped.some(x=>x.id===id),id);
 assert.equal(r.s.jerichoTrust-base.jerichoTrust,-2);assert.equal(r.s.northTrust-base.northTrust,-1);assert.equal(r.s.publicSupport,base.publicSupport);
 assert.match(r.situations.CP05[3],/down to five minutes/,'North warns at five minutes');assert.ok(!/down to five minutes/.test(r.situations.CP05[2]));
 assert.match(r.situations.CP06[0],/fate of our people is in your hands/);assert.ok(!/on the radio/.test(r.situations.CP06[0]),'the radio already played at the timeout')});

test('Capitol Park: a failed jump, North downs the drone, the patrol car and its three buttons',()=>{
 const fled=play({CP05:['5','6','15']},['CP05#2']);
 assert.equal(fled.s.capitolEnding,'DECIDED TO FLEE');assert.equal(fled.s.capitolDrone,'north');
 for(const l of ['FALL FROM DRONE','NORTH DESTROYS DRONE','POLICE CAR ARRIVES','RUN AWAY','DECIDED TO FLEE'])assert.ok(fled.s.capitolNodes.includes(l),l);
 assert.equal(fled.s.jerichoTrust-base.jerichoTrust,-1-2);assert.equal(fled.s.northTrust-base.northTrust,-1-1,'fall, then Abandon Mission; the arrows are not doubled');
 assert.match(fled.situations.CP05[2],/a police patrol car/);assert.deepEqual(available(node('CP05'),{...startState(story),capitolPrompt:'car'}).map(o=>o.id),['15','16','17']);
 assert.match(fled.situations.CP06[0],/\{\{Simon\}\}, on the radio: “\{\{Markus\}\}, we did it!/);
 const kiss=play({CP05:['5','6','16',...SECURE.slice(2)]},['CP05#2'],{},null,'CP09');
 assert.equal(kiss.s.capitolRaid,'succeeded','the drone counts as destroyed by North');assert.equal(kiss.s.northTrust-base.northTrust,-1-2+1+2,'fall, Act Natural, alarm after the drone, speech');
 const hide=play({CP05:['5','6','17','12','12','12','12']},['CP05#2']);
 assert.equal(hide.s.capitolEnding,'RETREAT');assert.equal(hide.s.northTrust-base.northTrust,-1+1-1,'fall, HIDE, then the retreat');assert.ok(hide.s.knowledge.Markus.some(f=>/P\.O \{\{CHEN\}\}, \{\{TINA\}\} \/ ID #5195 UNIT #975/.test(f)));assert.ok(hide.s.capitolNodes.includes('HIDE AND HACK RADIO'))});

test('Capitol Park: the drone at the alarm junction, HIDE or be spotted; RAM STORE needs the alarm, the drone and the road',()=>{
 const hid=play({CP05:['3','4','13','5','6','7','8','10','11']},[],{},null,'CP09');
 assert.ok(hid.s.capitolNodes.includes('HIDE'));assert.equal(hid.s.capitolRaid,'succeeded');assert.equal(hid.s.northTrust-base.northTrust,1+1+2,'hide, drone, speech');
 const spotted=play({CP05:['3','4','14','17','7','8','9','11']},[],{},null,'CP09');
 assert.ok(spotted.s.capitolNodes.includes('GET SPOTTED BY DRONE'));assert.equal(spotted.s.capitolDrone,'north');assert.equal(spotted.s.jerichoTrust-base.jerichoTrust,2,'the template has no Jericho arrow on being spotted');
 const failedHide=play({CP05:['3','4','13','16']},['CP05#3']);assert.ok(failedHide.s.capitolNodes.includes('GET SPOTTED BY DRONE'));
 for(const [picks,why] of [[['5','6','7','8','9','11'],/didn't deactivate the alarm/],[['3','4','13','7','8','9','11'],/forgot about the drone/],[['5','6','3','4','8','9','11'],/blocked the road/]]){
  const r=play({CP05:picks});assert.equal(r.s.capitolEnding,'HAD TO FLEE');assert.ok(r.s.capitolNodes.includes('POLICE ALERTED'));assert.match(r.text,why);
  assert.ok(r.visited.includes('CP06')&&!r.visited.includes('CP07'))}
 const r=play({CP05:['5','6','3','4','8','9','11']});assert.equal(r.s.jerichoTrust-base.jerichoTrust,-2,'HAD TO FLEE: the wiki’s Jericho large down')});

test('Capitol Park: the first police car, the other North, Simon’s lines and the tower’s tone',()=>{
 const saved=play({CP03:'1',CP05:['12','12','12','12','12']});assert.ok(saved.s.capitolNodes.includes('NORTH SAVES YOU'));assert.equal(saved.s.northTrust-base.northTrust,-1-1);assert.equal(saved.s.jerichoTrust-base.jerichoTrust,-1-2);
 const slow=play({CP03:'0',CP05:['12','12','12','12','12']},['CP03']);assert.ok(slow.s.capitolNodes.includes('NORTH SAVES YOU'));
 const here=play({},[],{simon:true,choices:{M12:'0'}}),gone=play({},[],{simon:true,choices:{M12:'1',M13:'0'}}),dead=play({},[],{simon:false});
 assert.match(here.situations.CP01[0],/\{\{Simon\}\}: “Our broadcast is all over the news… We got what we wanted/);assert.match(here.situations.CP01[0],/mistake to reach out to them/);assert.match(here.situations.CP01[0],/not to mention police/);
 assert.match(gone.situations.CP01[0],/\{\{Josh\}\}: “\{\{Simon\}\} paid with his life/);assert.match(gone.situations.CP01[0],/took \{\{Markus\}\}’ message as a threat/);assert.ok(!/not to mention police/.test(gone.situations.CP01[0]));
 assert.match(dead.situations.CP01[0],/\{\{Josh\}\}: “Our broadcast is all over the news\. Now humans know/);
 for(const r of [here,gone,dead])assert.equal((r.situations.CP01[0].match(/Our broadcast is all over the news/g)||[]).length,1,'exactly one variant');
 assert.match(node('M16').situation,/Please… Please…/);assert.ok(!/\{\{Josh\}\}|\{\{Simon\}\}/.test(node('M16').situation),'Josh is not at the officers’ scene')});

test('Capitol Park: random paths terminate in one of the six endings; Markus and North survive; no Josh or Simon change',{timeout:60000},()=>{
 const check=r=>{assert.ok(rules.endings.includes(r.s.capitolEnding),String(r.s.capitolEnding));
  assert.equal(r.s.markus,true);assert.equal(r.s.north,true);assert.equal(r.s.joshTrust,base.joshTrust);assert.equal(r.s.simonTrust,base.simonTrust);
  const seen=new Set(r.visited),skipped=new Set(r.skipped.map(x=>x.id));assert.equal(seen.size+skipped.size,IDS.length);assert.equal(skipped.size,r.skipped.length);
  for(const id of seen)assert.ok(!skipped.has(id),id+' both visited and skipped');for(const id of seen)if(!['CP05','CP09'].includes(id))assert.equal(r.visited.filter(x=>x===id).length,1,id+' repeated');
  assert.equal(r.s.capitolRaid==='succeeded',r.visited.includes('M16'));if(r.s.capitolRaid==='fled')assert.equal(r.s.capitolMessage,null);return r.s.capitolEnding};
 const rng=random(26),all=new Set,after=new Set;
 for(let i=0;i<400;i++)all.add(check(play({},[],{},rng)));
 for(let i=0;i<200;i++)after.add(check(play({CP05:SECURE},[],{},rng)));
 assert.ok(['RETREAT','HAD TO FLEE','DECIDED TO FLEE'].every(e=>all.has(e)),'random play reaches the flee endings: '+[...all]);
 assert.ok(after.has('MARKUS LED A VIOLENT RIOT')&&after.has('MARKUS LED A PEACEFUL PROTEST'),'random protests reach both message endings: '+[...after])});

test('Capitol Park: rebuilt tower flags override legacy choices for presence, tone and radio survival',()=>{
 const escaped=play({CP05:SECURE,CP09:['29','29']},[],{stratfordSimonFate:'escaped',stratfordNewsTone:'peaceful',stratfordSwat:false,simon:true,simonWounded:true,choices:{M12:'1',M13:'0'}});
 assert.match(escaped.situations.CP01[0],/\{\{Simon\}\}: “Our broadcast/);
 assert.match(escaped.situations.CP01[0],/mistake to reach out/);
 assert.ok(!escaped.situations.CP01[0].includes('as a threat'));
 assert.match(escaped.situations.CP10[0],/\{\{Simon\}\}, on the radio/);
 for(const fate of ['leftOnRoof','killedBySwat','executed']){
  const r=play({CP05:['12','12','12','12','12']},[],{stratfordSimonFate:fate,stratfordNewsTone:'war',stratfordSwat:true,simon:true,choices:{M12:'0'}});
  assert.match(r.situations.CP01[0],/\{\{Josh\}\}: “Our broadcast/);
  assert.match(r.situations.CP01[0],/as a threat/);
  assert.equal((r.situations.CP01[0].match(/Our broadcast is all over the news/g)||[]).length,1);
  assert.match(r.text,fate==='leftOnRoof'?/\{\{Simon\}\}, on the radio/:/\{\{Josh\}\}, on the radio/);
 }
 const swat=play({},[],{stratfordSwat:true,simon:true});
 assert.match(swat.situations.CP01[0],/\{\{Josh\}\}: “Our broadcast/);
 const coffee=play({CP05:SECURE,CP09:['21','31','26','29','29','29']});
 assert.ok(coffee.s.capitolNodes.includes('BURN DUMPSTERS'));
 assert.ok(coffee.s.capitolNodes.includes('BURN COFFEE SHOP'));
 const flee=play({CP05:['5','6','15']},['CP05#2']);
 assert.ok(flee.s.capitolNodes.indexOf('RUN AWAY')<flee.s.capitolNodes.indexOf('DECIDED TO FLEE'));
});
