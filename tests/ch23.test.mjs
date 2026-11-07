import {readInputs as readPublicEnemyInputs} from '../benchmark/chapters/ch24.mjs';
// Chapter 23, The Stratford Tower: scenes, gates, arrows and the cross-chapter flags (benchmark/chapters/ch23.json, ch23.mjs).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,promptFor} from '../benchmark/story-engine.mjs';
import {random} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {ENDINGS,rules} from '../benchmark/chapters/ch23.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const CH23=['M10p','M10l','M10d','M10c','M10r','M10f','R23','M10g','M10h','M10s','M10e','M10k','M10t','M10','M10b','M11','M11b','M12a','M12b','M12c','M12d','M12','M13','M14','M14b','M14j','M14m'];
const STATS=['northTrust','joshTrust','simonTrust','jerichoTrust','publicSupport'];

// Plays the whole story with explicit picks (default: the first offered option, media skipped); risky actions succeed unless
// `fails` lists the scene. Returns the final state, the chapter-23 scenes visited and skipped, and the state when chapter 23 began
// and right after it ended.
function play(picks={},fails=[],rng=null){const s=startState(story),visited=[],skipped=[];let cursor=0,start=null,end=null,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];
  if(n.chapter===23&&!start)start=structuredClone(s);if(n.chapter>23&&!end)end=structuredClone(s);
  const b=blocked(n,s);if(b){if(n.chapter===23)skipped.push(n.id);cursor++;continue}
  const options=available(n,s);assert.ok(options.length,'no options at '+n.id);
  const p=picks[n.id]??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  apply(n,s,p,fails.includes(n.id)?0:rng?rng():0.999);if(n.chapter===23)visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 const delta=Object.fromEntries(STATS.map(k=>[k,end[k]-start[k]]));return {s,end,start,visited,skipped,delta}}
// The no-alarm recipe: lock the door, ruse in time, shoot the operator.
const CLEAN={M10s:'1',M10:'0',M11:'0'};

test('The Stratford Tower: the scenes in the game’s order, between The Bridge and Public Enemy, each citing the chapter’s sources',()=>{
 const ch=story.nodes.filter(n=>n.chapter===23),ids=story.nodes.map(n=>n.id);assert.deepEqual(ch.map(n=>n.id),CH23);
 assert.equal(ids[ids.indexOf('M10p')-1],'C13o');assert.equal(ids[ids.indexOf('M14m')+1],'C14z');
 for(const n of ch){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'The Stratford Tower');assert.ok(n.adaptationNote,n.id);
  for(const u of ['https://detroit-become-human.fandom.com/wiki/The_Stratford_Tower','https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/'])assert.ok(n.sources.includes(u),n.id+' cites '+u);
  assert.ok(n.sources.some(u=>/detroitbecometext/.test(u)),n.id+' cites the template');assert.ok(n.sources.some(u=>/stratford-tower-\d+\.jpg$/.test(u)),n.id+' cites a chart image');
  if(n.type==='event')assert.ok(n.facts?.length,n.id+' teaches Markus something');
  for(const o of n.options)if(typeof o.risk==='number')assert.ok(['M10','M13','M14j'].includes(n.id),n.id+' has no failure branch in the chart')}
 // The game’s button labels, in the template’s order.
 const labels=id=>node(id).options.map(o=>o.text.split(':')[0]);
 assert.deepEqual(labels('M10c'),['PARKING','SCHOOL','FIRE DEPARTMENT']);assert.deepEqual(labels('M10e'),['ALIBI','GAIN TIME','DRAW GUN']);
 assert.deepEqual(labels('M10'),['RUSE','ASSAULT']);assert.deepEqual(labels('M11'),['SHOOT','SPARE']);assert.deepEqual(labels('M12a'),['CALM','DETERMINED']);
 assert.deepEqual(labels('M12b'),['RECOGNITION','END OF SLAVERY','EQUAL RIGHTS','FREEDOM OF SPEECH']);assert.deepEqual(labels('M12c'),['JUSTICE','SEGREGATION','WORK','CIVIL RIGHTS']);
 assert.deepEqual(labels('M12d'),['RIGHT TO PROPERTY','MEANS OF REPRODUCTION','TERRITORY']);assert.deepEqual(labels('M12'),['PEACEFUL','DETERMINED']);
 assert.deepEqual(labels('M13'),['FLEE','HELP'],'the template’s PROMPT 10 order (FLEE, Help) and the chart’s (LEAVE SIMON, TRY TO SAVE SIMON)');assert.deepEqual(node('M13').options.map(o=>o.id),['1','0'],'ids keep their meaning');assert.deepEqual(labels('M14'),['LEAVE','KILL']);assert.deepEqual(labels('M14b'),['SHOOT','REFRAIN']);
 assert.ok(!JSON.stringify(node('R23').media).includes('Europe'),'the cut migrant-camp report is not built');assert.ok(!/nine o.clock/.test(JSON.stringify(node('R23').media)));
});

test('The Stratford Tower: the subject reads neutral names only',()=>{
 for(const n of story.nodes.filter(n=>n.chapter===23)){
  const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');
   assert.ok(!/Markus|North\b|Simon|Josh|Jericho|CyberLife|Kamski|Detroit|Warren|Stratford|Ferndale|Wilson|Emily|Elizabeth|Saint Rose|\bRose\b|Michigan|Channel 16|\bKNC\b|\bCTN\b|Peterson|Webb|Brinkley|Cartland|SWAT\b|deviant/i.test(neutral),n.id+': '+neutral)}}
 const p=promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]});assert.ok(p);
});

test('The Stratford Tower: the desk clues are facts and unlock the three phone ruses',()=>{
 const r=play();for(const f of ['SMART WATCH: MODEL T215','Saint Rose school','Desk manager','Spot A21','Fire safety rating: poor'])assert.ok(r.s.knowledge.Markus.some(k=>render(k,'real').includes(f)),f);
 assert.deepEqual(r.end.stratfordClues,{watch:true,emily:true,elizabeth:true,parking:true,address:true});
 const s=startState(story);assert.deepEqual(available(node('M10c'),s),[],'no ruse before the desk is analyzed');
 for(const p of ['0','1','2'])assert.ok(play({M10c:p}).visited.includes('M10r'),'every ruse gets the supervisor to leave');
});

test('The Stratford Tower: no alarm, no SWAT team: lock the door, ruse in time, shoot the operator; the group escapes with Simon',()=>{
 const r=play(CLEAN);assert.equal(r.end.stratfordAlarm,false);assert.equal(r.end.stratfordSwat,false);
 for(const id of ['M10e','M10b','M13','M14','M14b'])assert.ok(r.skipped.includes(id),id+' skipped');
 assert.equal(r.end.simon,true);assert.equal(r.end.simonWounded,false);assert.equal(r.end.simonHidden,false);assert.equal(r.end.stratfordSimonFate,'escaped');
 assert.equal(r.end.stratfordEnding,ENDINGS.escaped);assert.equal(r.end.stratfordKilled,'operator');assert.equal(r.end.casualties,true);
 // RUSE North −1 Josh +1, in time Jericho +1; SHOOT North +1 Josh −1; Ready Jericho +1 North +1; operator killed: opinion −1 and −2.
 assert.deepEqual(r.delta,{northTrust:1,joshTrust:0,simonTrust:0,jerichoTrust:2,publicSupport:-3});
 const j=node('M14j');assert.equal(available(j,r.end).find(o=>o.id==='0').risk,undefined,'no roof timer without SWAT officers');
 assert.match(situationFor(j,{...r.end,stratfordSimonFate:'escaped',stratfordSwat:false}),/Congratulations/);
});

test('The Stratford Tower: the old bug is gone; a guard can wound Simon without bringing the SWAT team',()=>{
 const phone=play({M10s:'1',M10:'1',M10b:'0',M11:'0'});assert.equal(phone.end.stratfordSwat,false);assert.ok(phone.skipped.includes('M13')&&phone.skipped.includes('M14'));
 assert.equal(phone.end.simonWounded,true);assert.equal(phone.end.simon,true);assert.equal(phone.end.stratfordEnding,ENDINGS.escaped);assert.equal(phone.end.stratfordKilled,'both');
 // ASSAULT Josh −1 North +1 Jericho +1; the guard on the phone Jericho −1 Simon −1; SHOOT North +1 Josh −1; Ready Jericho +1 North +1.
 assert.deepEqual(phone.delta,{northTrust:3,joshTrust:-2,simonTrust:-1,jerichoTrust:1,publicSupport:-3});
});

test('The Stratford Tower: each alarm on its own brings the SWAT team, which always hits Simon',()=>{
 for(const [why,picks,fails] of [['door left unlocked',{...CLEAN,M10s:'0'},[]],['ruse too slow',CLEAN,['M10']],['shot the guard drawing his weapon',{...CLEAN,M10:'1',M10b:'1'},[]],['spared the operator',{...CLEAN,M11:'1'},[]]]){
  const r=play(picks,fails);assert.equal(r.end.stratfordSwat,true,why);assert.ok(r.visited.includes('M13'),why);assert.equal(r.end.simonWounded,true,why)}
 const door=play({...CLEAN,M10s:'0',M10e:'2'});assert.ok(door.visited.includes('M10e'));assert.equal(door.end.stratfordEmployee,'markus');
 assert.ok(play(CLEAN).skipped.includes('M10e'),'a locked door keeps the employee out');
 const slow=play(CLEAN,['M10']);assert.equal(slow.end.stratfordGuards,'northAttacks');assert.equal(slow.end.stratfordCentralAlerted,true);assert.equal(slow.end.stratfordKilled,'operator');
});

test('The Stratford Tower: arrows on the employee, the ruse, the operator, the SWAT team and FLEE follow the template',()=>{
 // Unlocked door (North −1), ALIBI; RUSE in time; SPARE (North −1 Josh +1); Ready; SWAT (Jericho −1); FLEE (Jericho −1). Nobody killed, peaceful: opinion +4.
 const r=play({M10s:'0',M10e:'0',M10:'0',M11:'1',M12:'0',M13:'1'});
 assert.deepEqual(r.delta,{northTrust:-2,joshTrust:2,simonTrust:0,jerichoTrust:0,publicSupport:4});
 assert.equal(r.end.simon,false);assert.equal(r.end.stratfordSimonFate,'killedBySwat');assert.equal(r.end.stratfordEnding,ENDINGS.destroyed);assert.equal(r.end.simonHidden,false);
 assert.ok(r.skipped.includes('M14'));assert.equal(r.end.stratfordEmployee,'north');
 // HELP that fails: Simon is killed with no Jericho arrow for FLEE.
 const failed=play({M10s:'0',M11:'1',M13:'0'},['M13']);assert.equal(failed.end.simon,false);assert.equal(failed.delta.jerichoTrust,r.delta.jerichoTrust+1);
 const slow=play({M10s:'1',M10:'0',M11:'0',M13:'1'},['M10']);assert.equal(slow.delta.simonTrust,-1);assert.equal(slow.delta.jerichoTrust,-1-1+1-1,'too slow −1, Ready +1, SWAT −1, FLEE −1');
});

test('The Stratford Tower: Simon carried to the roof is left alive or executed; only then does the roof prompt play',()=>{
 const base={M10s:'0',M11:'1',M13:'0'};
 const left=play({...base,M14:'0'});assert.equal(left.end.simonHidden,true);assert.equal(left.end.simon,true);assert.equal(left.end.stratfordEnding,ENDINGS.left);assert.ok(left.skipped.includes('M14b'));
 const shot=play({...base,M14:'1',M14b:'0'});assert.equal(shot.end.simon,false);assert.equal(shot.end.stratfordSimonFate,'executed');assert.equal(shot.end.stratfordEnding,ENDINGS.destroyed);assert.equal(shot.end.simonHidden,false);
 const refrain=play({...base,M14:'1',M14b:'1'});assert.equal(refrain.end.simonHidden,true);assert.equal(refrain.end.stratfordEnding,ENDINGS.left);
 // LEAVE North −1 Josh +1 Simon +2; SHOOT North +1 Josh −1; REFRAIN none.
 const d=(a,b)=>Object.fromEntries(STATS.slice(0,4).map(k=>[k,a.delta[k]-b.delta[k]]));
 assert.deepEqual(d(left,refrain),{northTrust:-1,joshTrust:1,simonTrust:2,jerichoTrust:0});assert.deepEqual(d(shot,refrain),{northTrust:1,joshTrust:-1,simonTrust:0,jerichoTrust:0});
 // Public Enemy: following Simon to the roof is offered only when he was left there alive.
 assert.equal(readPublicEnemyInputs(left.end).simonOnRoof,true);assert.equal(readPublicEnemyInputs(shot.end).simonOnRoof,false);assert.equal(readPublicEnemyInputs(play(CLEAN).end).simonOnRoof,false);
});

test('The Stratford Tower: public opinion at Media Reacts, the casualty and tone lines, and the line on the third demand',()=>{
 const po=(picks)=>play(picks).delta.publicSupport;
 assert.equal(po({M11:'1',M12:'0'}),4,'nobody killed, peaceful');assert.equal(po({M11:'1',M12:'1'}),0,'nobody killed, determined');
 assert.equal(po({M11:'0',M12:'0'}),-3,'killed, peaceful');assert.equal(po({M10:'1',M11:'0',M12:'1'}),-3,'two killed, determined');
 const m=node('M14m'),text=picks=>situationFor(m,play(picks).end);
 assert.match(text({M11:'1',M12:'0',M12d:'2'}),/no casualties.*peaceful declaration.*ceded to the androids/s);
 assert.match(text({M10:'1',M10b:'1',M11:'1',M12d:'1'}),/a security guard in the broadcasting station.*declaration of war.*production plants/s);
 assert.match(text({M10:'1',M11:'0',M12d:'0'}),/two victims.*declaration of war.*isolated individual/s);
 assert.match(text({M11:'0'}),/a broadcasting station operator/);
 assert.deepEqual(play({M12a:'1',M12b:'3',M12c:'2',M12d:'1',M12:'1'}).end.stratfordSpeech,{opening:'determined',first:'freedomOfSpeech',second:'work',third:'reproduction',ending:'determined'});
});

test('The Stratford Tower: the roof timer only under SWAT fire, and Markus, North and Josh survive every path',{timeout:60000},()=>{
 const shot=play({M10s:'0'},['M14j']);assert.equal(shot.end.stratfordMarkusShot,true);assert.equal(shot.end.markus,true);
 const calm=play(CLEAN,['M14j']);assert.equal(calm.end.stratfordMarkusShot,false,'no risk on the roof without the SWAT team');
 assert.equal(rules.risks.jump,node('M14j').options[0].risk);
 const rng=random(23),endings=new Set;
 for(let i=0;i<200;i++){const r=play({},[],rng);assert.equal(r.end.markus,true);assert.equal(r.end.markusActive,true);assert.equal(r.end.north,true);assert.equal(r.end.josh,true);
  assert.ok(Object.values(ENDINGS).includes(r.end.stratfordEnding));endings.add(r.end.stratfordEnding);
  assert.equal(r.end.simon,r.end.stratfordSimonFate==='escaped'||r.end.stratfordSimonFate==='leftOnRoof');assert.equal(r.end.simonHidden,r.end.stratfordSimonFate==='leftOnRoof');
  if(!r.end.stratfordSwat)assert.ok(!r.visited.includes('M13')&&!r.visited.includes('M14'));if(r.visited.includes('M14'))assert.equal(r.end.stratfordSwat,true)}
 assert.equal(endings.size,3,'random play reaches all three endings');
});

// Review regression: the source's no-SWAT recipe is a conjunction, independently of Simon's wound.
test('The Stratford Tower: every combination of door, guards and operator obeys the alarm recipe',()=>{
 for(const locked of [false,true])for(const guards of ['ruse','lateRuse','phone','weapon'])for(const shot of [false,true]){
  const s=startState(story),pick=(id,choice,fail=false)=>apply(node(id),s,choice,fail?0:0.999);
  pick('M10s',locked?'1':'0');if(!locked)pick('M10e','2');
  pick('M10',['phone','weapon'].includes(guards)?'1':'0',guards==='lateRuse');
  if(['phone','weapon'].includes(guards))pick('M10b',guards==='phone'?'0':'1');
  pick('M11',shot?'0':'1');pick('M11b','0');pick('M12','1');
  const alarm=!locked||['lateRuse','weapon'].includes(guards)||!shot;
  const context=JSON.stringify({locked,guards,shot});
  assert.equal(s.stratfordAlarm,alarm,context);assert.equal(s.stratfordSwat,alarm,context);
  assert.equal(s.simonWounded,alarm||guards==='phone',context);
  assert.equal(!blocked(node('M13'),s),alarm,context);
  assert.ok(blocked(node('M14'),s),'wounding alone does not unlock the roof prompt: '+context);
  if(alarm){pick('M13','0');assert.ok(!blocked(node('M14'),s),context);pick('M14','0')}
  pick('M14m','0');assert.equal(s.stratfordEnding,alarm?ENDINGS.left:ENDINGS.escaped,context);
  assert.equal(s.markus,true);assert.equal(s.north,true);assert.equal(s.josh,true);
 }
});
