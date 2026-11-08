import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,DEVIANCY_THRESHOLD,ENGINE_CONSTANTS} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {ENDING_CARDS,RISKS,labels,deathEffect,mediaWhen} from '../benchmark/chapters/ch30.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch30=story.nodes.filter(n=>n.chapter===30),node=id=>story.nodes.find(n=>n.id===id);
const RAID={C17:'0',C18:'0'},NO_RAID={C17:'1',C19:'1'};
// Plays from the start (first option everywhere unless picked; risky actions succeed unless `fails` names the scene, or
// `id#visit`), applies `setup` to the state when chapter 30 begins, and stops when chapter 30 ends.
function play(picks={},{fails=[],setup}={}){const s=startState(story),visited=[],skipped=[],events={},q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0,ready=false;
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];if(n.chapter>30)break;
  if(n.chapter===30&&!ready){ready=true;setup?.(s)}
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s),k=q[n.id],p=(Array.isArray(k)?k.shift():k)??(n.type==='media'?'skip':options[0].id);
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' (offered '+options.map(o=>o.id)+')');
  const visit=visited.filter(x=>x===n.id).length+1,roll=fails.includes(n.id)||fails.includes(n.id+'#'+visit)?0:0.999;
  const r=apply(n,s,p,roll);visited.push(n.id);events[n.id+(visit>1?'#'+visit:'')]=r;cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,ids:visited.filter(id=>ch30.some(n=>n.id===id))}}
const deviantSetup=x=>s=>{s.instability=10;x?.(s)},ousted=s=>{s.jerichoTrust=-5};
const labelsOf=id=>node(id).options.map(o=>render(o.text,'real').split(': ')[0]);

test('Crossroads: 67 scenes in the game’s intercut order, each with sources, a note and outcomes',{timeout:120000},()=>{
 assert.deepEqual(ch30.map(n=>n.id),['K17-drive','K17-goodbye','C22-ferndale','R30k','K17-arrive','R30c','C22-explore','K17-north','K17-protect','K17-alice','K17','K17-leaves',
  'M21-tone','M21-josh','M22-ousted','M21-plan','M21-reflect','M21','M21b','M21-alone','M21-north','C22-cabin','C22-m1','C22-c1','C22-m2','C22-c2','C22-m3','C22-n1','C22-n2','C22-n3','C22-n4','C22',
  'K31','K17-corridor','K17-crossroad','K18','K18-console','M22','M23-team','M23-escape','C23-corridor1','C23-escape','M23','M23-coming','M23-well','C23-androids','C23-coming','C23-well',
  'C22-cargo','K19','M24','C23-josh','K19-flee','K20','K20-surrender','K20-leg','K20-still','M24-gun','M24-soldiers','C22-corridor','C23-hold','M25-escape','M25','M25-exit','C23','M25-jump','C23-escape3']);
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(i('K17-drive')>story.nodes.findLastIndex(n=>n.chapter===29)&&i('C23-escape3')<story.nodes.findIndex(n=>n.chapter===31));
 for(const n of ch30){assert.equal(n.chapterTitle,'Crossroads');assert.ok(n.adaptationNote&&n.adaptationNote.length>60,n.id);assert.ok(n.sources.length>=4,n.id);
  assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Crossroads'),n.id);assert.ok(n.situation.startsWith('You are '),n.id);
  for(const o of n.options){assert.ok(o.outcome,n.id+' '+o.id);if(typeof o.risk==='number')assert.ok(Object.values(RISKS).includes(o.risk),n.id)}
  if(n.type==='event')assert.ok((n.facts?.length||n.character==='Player')&&n.outcomes?.['0'],n.id);
  assert.ok(!/\[pending|\[draft/.test(JSON.stringify(n)),n.id+' still has placeholder text')}
});

test('Crossroads: the prompts carry the game’s button labels in the game’s order',{timeout:120000},()=>{
 const want={'K17-north':['MARKUS…','THANK YOU'],'K17-protect':['BOND','NO DIFFERENCE','SECRET'],K17:['HUG','DISTANT'],K31:['RUN AWAY','FIND ALICE'],
  K18:['HELP LUTHER','PROTECT ALICE'],'K18-console':['CONSOLE','HURRY'],K19:['OPEN','DON\'T OPEN'],K20:['PLAY DEAD','RUN','SURRENDER'],
  'K20-surrender':['RUN','CONVINCE','ATTACK','OBEY'],'K20-leg':['GET UP','ATTACK','SURRENDER','PLAY DEAD','CRAWL','OUT OF TIME'],'K20-still':['DEFEND ALICE','DON\'T MOVE'],
  'M21-tone':['AGGRESSIVE','DETERMINED','RIGHTEOUS','SOMBER'],'M21-josh':['ANGRY','BITTER','REMORSE','NO REGRETS'],'M21-plan':['CONFRONTATION','DIALOGUE','STAY HIDING'],
  'M21-reflect':['SAD','ANGRY','THOUGHTFUL','BITTER'],M21:['KEEP','REFUSE'],M21b:['KISS','DON\'T KISS'],M22:['LEAVE FOREVER','GO BACK TO JERICHO'],
  'M23-team':['MESSAGE','SIMON AND JOSH','JOSH','HELICOPTERS','BLOW UP JERICHO'],M23:['INTERVENE','DON\'T INTERVENE'],'M23-coming':['JUMP SOLDIERS','CLIMB AWAY','TIME OUT'],
  M24:['INTERVENE','HIDE'],M25:['SAVE NORTH','RUN'],
  'C22-m1':['REASON','DEFY','DISCOURAGE','THREATEN'],'C22-c1':['INTIMIDATE','INSTRUCTIONS'],'C22-m2':['CONVINCE','APPEAL','I KNOW YOU','OUR CAUSE'],
  'C22-c2':['STAY BACK!','WARNING SHOT','ENOUGH!','SAY NOTHING'],'C22-m3':['SOW DOUBTS','QUESTION','RALLY','UNDERMINE'],'C22-n1':['INSTRUCTIONS','INTIMIDATE'],
  'C22-n2':['STAY BACK!','WARNING SHOT','ENOUGH!','SAY NOTHING'],'C22-n3':['DISTURBED','SAY NOTHING','COLD'],'C22-n4':['COLD','DISTURBED','SAY NOTHING'],
  C22:['BECOME A DEVIANT','REMAIN A MACHINE'],'C22-cargo':['LIE','PERKINS EXCUSE','ATTACK','RUN'],'C23-androids':['INTERVENE','DON\'T INTERVENE'],
  'C23-coming':['JUMP SOLDIERS','CLIMB BESIDE SOLDIERS','LOSE TOO MUCH TIME']};
 for(const [id,l] of Object.entries(want))assert.deepEqual(labelsOf(id),l,id);
});

test('Crossroads: every arrow is the template’s, with its character and size, and public opinion never moves',{timeout:120000},()=>{
 const eff=(id,o)=>node(id).options.find(x=>x.id===o).effect??{};
 assert.deepEqual(eff('K17','0'),{aliceBond:2});assert.deepEqual(eff('K17','1'),{aliceBond:-2});assert.deepEqual(eff('K31','1'),{aliceBond:2});assert.deepEqual(eff('K31','0'),{});
 assert.deepEqual(eff('K18','0'),{aliceBond:1,lutherTrust:1});assert.deepEqual(eff('K18','1'),{aliceBond:-1});assert.deepEqual(eff('K18-console','1'),{aliceBond:-1});assert.deepEqual(eff('K18-console','0'),{});
 assert.deepEqual(eff('K19','0'),{aliceBond:1});assert.deepEqual(eff('K19','1'),{aliceBond:-1});
 const si=id=>node(id).options.map(o=>o.effect?.instability??0);
 assert.deepEqual(si('C22-m1'),[1,0,0,0]);assert.deepEqual(si('C22-c1'),[0,0]);assert.deepEqual(si('C22-m2'),[1,1,0,1]);assert.deepEqual(si('C22-c2'),[-1,-1,-1,0]);assert.deepEqual(si('C22-m3'),[1,1,1,1]);
 assert.deepEqual(si('C22-n1'),[0,0]);assert.deepEqual(si('C22-n2'),[-1,-1,-1,0]);assert.deepEqual(si('C22-n3'),[1,0,-1]);assert.deepEqual(si('C22-n4'),[-1,1,0]);
 assert.deepEqual(eff('C22','0'),{amandaTrust:-2});assert.deepEqual(eff('C22','1'),{});
 // No other scene carries a data effect; the module applies the conditional arrows.
 const withEffect=ch30.filter(n=>n.options.some(o=>o.effect)).map(n=>n.id);assert.deepEqual(withEffect,['C22-m1','C22-m2','C22-c2','C22-m3','C22-n2','C22-n3','C22-n4','C22','K31','K18','K18-console','K19','K17'].sort((a,b)=>ch30.findIndex(n=>n.id===a)-ch30.findIndex(n=>n.id===b)));
 // The module's arrows, measured on a full path: counsel, corridors, Josh, rejoin, North.
 const d=(r,a,b,key)=>r.s[key]-0;
 const path=play({...RAID,'M21-josh':'2','M21-plan':'2'},{setup:deviantSetup(s=>{s.simon=true;s.josh=true;s.north=true;s.jerichoTrust=0;s.joshTrust=0;s.northTrust=0;s.simonTrust=0})});
 const ch=k=>Object.fromEntries(Object.entries(path.events).filter(([id])=>node(id.split('#')[0])?.chapter===30).map(([id,e])=>[id,e.changes.find(c=>c.key===k)]).filter(([,c])=>c).map(([id,c])=>[id,c.after-c.before]));
 assert.deepEqual(ch('joshTrust'),{'M21-josh':1,'M21-plan':1,M24:2,'M25-escape':1,M25:1});
 assert.deepEqual(ch('northTrust'),{'M21-plan':-1,'M25-escape':1,M25:2});
 assert.deepEqual(ch('simonTrust'),{'M21-plan':1,'M25-escape':1,M25:1});
 assert.deepEqual(ch('jerichoTrust'),{M23:1,'M23-well':1,M24:1,'M25-escape':1,M25:1});
 assert.deepEqual(ch('publicSupport'),{});
 assert.deepEqual(ch('hankTrust'),{});
 // ANGRY lowers Josh; CONFRONTATION raises North and lowers Josh; DIALOGUE the reverse; KISS moves nothing, DON'T KISS is North large down.
 const lov=s=>{s.northLover=true;s.northTrust=0};
 const a=play({...NO_RAID,'M21-josh':'0','M21-plan':'0',M21b:'0'},{setup:lov});assert.equal(a.events['M21-josh'].changes.find(c=>c.key==='joshTrust').after,a.events['M21-josh'].changes.find(c=>c.key==='joshTrust').before-1);
 assert.deepEqual(a.events['M21-plan'].changes.filter(c=>['northTrust','joshTrust'].includes(c.key)).map(c=>[c.key,c.after-c.before]),[['northTrust',1],['joshTrust',-1]]);
 assert.deepEqual(a.events.M21b.changes.map(c=>c.key),['knowledge'].filter(()=>false),'KISS changes nothing');
 const b=play({...NO_RAID,'M21-plan':'1',M21b:'1'},{setup:lov});assert.deepEqual(b.events['M21-plan'].changes.filter(c=>['northTrust','joshTrust'].includes(c.key)).map(c=>[c.key,c.after-c.before]),[['northTrust',-1],['joshTrust',1]]);
 assert.equal(b.events.M21b.changes.find(c=>c.key==='northTrust').after-b.events.M21b.changes.find(c=>c.key==='northTrust').before,-2);
 assert.deepEqual(deathEffect,{},'a Connor death here moves no stat');
});

test('Crossroads: no raid without Jericho’s location; Kara and Markus end quietly',{timeout:120000},()=>{
 const r=play({...NO_RAID},{setup:s=>{s.lutherWith=true;s.luther=true}});assert.equal(r.s.raid,false);
 for(const id of ch30.filter(n=>n.character==='Connor').map(n=>n.id))assert.ok(!r.ids.includes(id),id);
 for(const id of ['K31','K17-corridor','K18','K19','K20','M22','M23','M24','M25','K17-leaves'])assert.ok(!r.ids.includes(id),id);
 assert.equal(r.s.ch30KaraEnding,'KARA, ALICE & LUTHER LEFT JERICHO');assert.equal(r.s.ch30EndingCards.Kara,'K26');assert.equal(r.s.karaRoute,'escape');
 assert.equal(r.s.ch30MarkusEnding,'MARKUS STAYED ALONE WITH HIS THOUGHTS');assert.equal(r.s.ch30Leader,'Markus');
 const alone=play({...NO_RAID,K17:'1'},{setup:s=>{s.lutherWith=false;s.aliceBond=-3;s.aliceMax=0}});assert.equal(alone.s.ch30EndingCards.Kara,'K27');assert.ok(!alone.ids.includes('K17-leaves'),'Alice leaves only in a raid');
 const out=play({...NO_RAID},{setup:ousted});assert.equal(out.s.ch30MarkusEnding,'MARKUS LEFT JERICHO');assert.equal(out.s.markusActive,false);
 for(const id of ['M21-plan','M21-reflect','M21','M21b'])assert.ok(!out.ids.includes(id),id+': an ousted Markus is offered nothing more, not even the detonator');
 assert.equal(out.events['M22-ousted'].changes.find(c=>c.key==='jerichoTrust').after,-7,'Jericho large down');
});

test('Crossroads: the kiss needs Lover; Markus dead in Freedom March gives North’s cabin and Kara meets North',{timeout:120000},()=>{
 const no=play({...RAID},{setup:s=>{s.northLover=false;s.northBond=false}});assert.ok(!no.ids.includes('M21b'));assert.match(no.skipped.find(x=>x.id==='M21b').reason,/lover/);
 const yes=play({...RAID},{setup:s=>{s.northLover=true}});assert.ok(yes.ids.includes('M21b'));
 const bond=play({...RAID,M21b:'0'},{setup:s=>{delete s.northLover;s.northBond=true}});assert.ok(bond.ids.includes('M21b'));assert.equal(bond.s.northLover,true,'pre-rebuild shared memories count as Lover');
 const dead=play({...RAID},{setup:s=>{s.markus=false;s.movement='revolution'}});
 assert.ok(dead.ids.includes('M21-north'));assert.ok(dead.ids.includes('K17-north'));assert.ok(!dead.ids.some(id=>node(id).character==='Markus'));assert.equal(dead.s.ch30MarkusEnding,'NORTH STAYED ALONE WITH HER THOUGHTS');
 assert.ok(dead.ids.includes('C22-n1')&&!dead.ids.includes('C22-c1'),'Connor faces North');assert.equal(dead.s.ch30Leader,'North');
});

test('Crossroads: the confrontation alternates control; Markus raises instability up to three times; the deviancy option needs the threshold',{timeout:120000},()=>{
 const r=play({...RAID},{setup:s=>{s.instability=0}});
 assert.deepEqual(r.ids.filter(id=>id.startsWith('C22-')&&id!=='C22-explore'&&id!=='C22-ferndale'&&id!=='C22-cabin').slice(0,5),['C22-m1','C22-c1','C22-m2','C22-c2','C22-m3']);
 assert.deepEqual(['C22-m1','C22-c1','C22-m2','C22-c2','C22-m3'].map(id=>node(id).character),['Markus','Connor','Markus','Connor','Markus']);
 const up=play({...RAID,'C22-c2':'3'},{setup:s=>{s.instability=DEVIANCY_THRESHOLD-3}});assert.equal(up.events.C22.changes.find(c=>c.key==='deviant')?.after,true,'three increases tip a Connor three short');
 const short=play({...RAID,'C22-m1':'1','C22-m2':'2','C22-m3':'0','C22-c2':'0'},{setup:s=>{s.instability=DEVIANCY_THRESHOLD-1}});
 assert.deepEqual(available(node('C22'),{...short.s,instability:DEVIANCY_THRESHOLD-1,ch30Run:{...short.s.ch30Run,connor:'cabin'}}).map(o=>o.id),['1']);
 assert.equal(short.s.deviant,false);
 const dev=play({...RAID},{setup:deviantSetup()});assert.equal(dev.events.C22.changes.find(c=>c.key==='amandaTrust').after-dev.events.C22.changes.find(c=>c.key==='amandaTrust').before,-2);
});

test('Crossroads: machine Connor can kill Markus or be killed by him; facing North he always dies',{timeout:120000},()=>{
 const shot=play({...RAID,C22:'1'},{setup:s=>{s.instability=0}});
 assert.ok(shot.ids.includes('C22-cargo')&&shot.ids.includes('M24-gun')&&!shot.ids.includes('M24-soldiers'));
 assert.equal(shot.s.ch30ConnorEnding,'MACHINE CONNOR WAS DESTROYED');assert.equal(shot.s.ch30EndingCards.Connor,'C43');assert.equal(shot.s.connor,true,'a replacement Connor follows');assert.equal(shot.s.ch30ShipSunk,true);assert.equal(shot.s.markus,true);
 const killed=play({...RAID,C22:'1'},{fails:['M24-gun'],setup:s=>{s.instability=0}});
 assert.equal(killed.s.markus,false);assert.equal(killed.s.ch30MarkusEnding,'CONNOR KILLED MARKUS');assert.equal(killed.s.ch30ConnorEnding,'CONNOR KILLED MARKUS');assert.equal(killed.s.ch30ShipSunk,false);
 assert.ok(!killed.ids.includes('M25-escape'));assert.equal(killed.s.connorDeaths,shot.s.connorDeaths-1,'machine Connor survives');
 const north=play({...RAID,C22:'1',M22:'0'},{setup:s=>{s.instability=0;ousted(s)}});
 assert.ok(north.ids.includes('C22-corridor')&&!north.ids.includes('M24-gun'));assert.equal(north.s.ch30EndingCards.Connor,'C54');assert.equal(north.s.ch30MarkusEnding,'MARKUS LEFT JERICHO');
 assert.equal(north.s.josh,false,'Josh is dying when Connor finds him');
 for(const card of ['C36']){const run=play({...RAID,C22:'1','C22-cargo':'3'},{setup:s=>{s.instability=0}});assert.equal(run.s.ch30EndingCards.Connor,card);assert.ok(!run.ids.includes('M24-gun'));assert.ok(run.ids.includes('M24-soldiers'))}
});

test('Crossroads: North is shot; on a failed rescue she dies only if deviant Connor is there, otherwise Markus dies and she escapes',{timeout:120000},()=>{
 const dc=play({...RAID},{fails:['M25'],setup:deviantSetup()});
 assert.equal(dc.s.north,false);assert.equal(dc.s.markus,true);assert.ok(dc.ids.includes('C23'));assert.equal(dc.s.ch30MarkusEnding,'MARKUS FLED WITH HIS PEOPLE');
 const mc=play({...RAID,C22:'1'},{fails:['M25'],setup:s=>{s.instability=0}});
 assert.equal(mc.s.north,true);assert.equal(mc.s.markus,false);assert.equal(mc.s.ch30MarkusEnding,'MARKUS DIED BUYING TIME FOR JERICHO');assert.equal(mc.s.ch30Leader,'North');
 const saved=play({...RAID,C22:'1'},{setup:s=>{s.instability=0}});assert.ok(saved.ids.includes('M25-exit'));assert.equal(saved.s.ch30NorthShot,true);assert.equal(saved.s.ch30MarkusEnding,'MARKUS FLED WITH HIS PEOPLE');
 // A wounded Markus cannot try: no risk on SAVE NORTH, and North dies.
 const hurt=play({...RAID},{fails:['M23'],setup:deviantSetup()});
 assert.equal(available(node('M25'),{...hurt.s,ch30Run:{...hurt.s.ch30Run,markus:'north'}})[0].risk,undefined);
 assert.equal(hurt.s.north,false);assert.equal(hurt.s.markus,true);assert.ok(!hurt.ids.includes('C23'),'no fight when Markus cannot save her');
 const run=play({...RAID,M25:'1'},{setup:deviantSetup(s=>{s.josh=true;s.joshTrust=0})});assert.equal(run.s.north,false);assert.equal(run.events.M25.changes.find(c=>c.key==='joshTrust').after,run.events.M25.changes.find(c=>c.key==='joshTrust').before-2);
});

test('Crossroads: wounds, Josh’s sacrifice and deviant Connor’s takeover',{timeout:120000},()=>{
 const twice=play({...RAID},{fails:['M23-escape#1','M23-escape#2'],setup:deviantSetup()});
 assert.deepEqual(twice.ids.filter(id=>id==='M23-escape'),['M23-escape','M23-escape']);assert.equal(twice.s.markus,false);assert.equal(twice.s.ch30EndingCards.Markus,'M30');
 assert.ok(twice.ids.includes('C23-androids')&&!twice.ids.includes('C23-corridor1'),'Markus dead before MARKUS IN THE CORRIDOR: Connor starts at corridor #2');
 assert.ok(twice.ids.includes('C23-hold')&&twice.ids.includes('C23-escape3'));assert.equal(twice.s.ch30ConnorEnding,"CONNOR ESCAPED WITH JERICHO'S PEOPLE");assert.equal(twice.s.ch30ShipSunk,true);assert.equal(twice.s.josh,false);
 const once=play({...RAID},{fails:['M23-escape#1'],setup:deviantSetup()});assert.equal(once.s.markus,true);assert.equal(once.s.ch30Run.markusWounds,1);assert.equal(once.s.markusHits,1);
 const sac=play({...RAID},{fails:['M24'],setup:deviantSetup(s=>{s.josh=true})});assert.equal(sac.s.josh,false);assert.equal(sac.s.markus,true);assert.match(render(sac.events.M24.event,'real'),/Don’t become like them|Don't become like them/);
 const both=play({...RAID},{fails:['M23','M24'],setup:deviantSetup(s=>{s.josh=true})});assert.equal(both.s.markus,false);assert.equal(both.s.ch30EndingCards.Markus,'M65');assert.ok(both.ids.includes('C23-josh'));
 const saved=play({...RAID},{setup:deviantSetup(s=>{s.josh=true})});assert.equal(saved.s.ch30JoshSaved,true);assert.equal(saved.s.josh,true);
 const first=play({...RAID,M22:'0'},{setup:deviantSetup(ousted)});assert.ok(first.ids.includes('C23-corridor1'));assert.equal(first.s.ch30ConnorJoined,true);assert.equal(first.s.ch30Leader,'North');
 const dead=play({...RAID,M22:'0'},{fails:['C23-escape#1','C23-escape#2'],setup:deviantSetup(ousted)});assert.equal(dead.s.deviant,false,'a destroyed deviant Connor returns to the machine route');assert.equal(dead.s.ch30ConnorDied,true);assert.equal(dead.s.ch30ShipSunk,false);
 const back=play({...RAID,M22:'1'},{setup:deviantSetup(ousted)});assert.ok(!back.ids.includes('M23')&&back.ids.includes('M25-escape'),'an exile who goes back with a deviant Connor joins only the escape');assert.equal(back.s.ch30MarkusReturned,true);assert.equal(back.s.ch30Leader,'Markus');
 const backM=play({...RAID,M22:'1',C22:'1'},{setup:s=>{s.instability=0;ousted(s)}});assert.ok(backM.ids.includes('M23'),'with a machine Connor he goes through the corridors');
 // Story 1.9.2 (triage ch30.md): machine Connor confronts the returning exile in the control room (template: "Markus is alive
 // - Connor finds Markus"), though the cabin had found North.
 assert.equal(backM.s.ch30Run.leader,'North','the cabin found North');assert.ok(backM.ids.includes('M24-gun')&&!backM.ids.includes('M24-soldiers'),'the reach-the-gun prompt');assert.ok(!backM.ids.includes('C22-corridor'),'Connor does not go after North');
 const backLost=play({...RAID,M22:'1',C22:'1'},{fails:['M24-gun'],setup:s=>{s.instability=0;ousted(s)}});assert.equal(backLost.s.ch30EndingCards.Connor,'C46');assert.equal(backLost.s.markus,false);
 // Story 1.9.2 (triage ch30-10): Markus shot dead in the hold with a deviant Connor goes straight to DEVIANT CONNOR IN CORRIDOR #3;
 // nobody arms the explosives, and the ship is not blown up.
 const hold=play({...RAID},{fails:['M24-soldiers'],setup:deviantSetup()});assert.equal(hold.s.markus,false);assert.equal(hold.s.ch30EndingCards.Markus,'M81');
 assert.ok(hold.ids.includes('C23-escape3')&&!hold.ids.includes('C23-hold'));assert.equal(hold.s.ch30ShipSunk,false);assert.equal(hold.s.ch30JerichoBlown,'none');
 assert.ok(!/sinking|charges go off/.test(render(hold.events['C23-escape3'].event,'real')),'no explosion on that line');assert.ok(!/explosives in the hold are counting down/.test(situationFor(node('C23-escape3'),hold.events['C23-escape3'].before??hold.s)));
});

test('Crossroads: Kara’s raid — Alice leaving, Luther, the cabin and the breach',{timeout:120000},()=>{
 const low=s=>{s.aliceBond=-3;s.aliceMax=0};
 const left=play({...RAID,K17:'1',K31:'0'},{setup:low});assert.ok(left.ids.includes('K17-leaves'));assert.equal(left.s.karaActive,false);assert.equal(left.s.ch30KaraEnding,'KARA LEFT JERICHO ALONE');assert.equal(left.s.ch30AliceLeftKara,true);
 const found=play({...RAID,K17:'1',K31:'1'},{setup:low});assert.ok(found.ids.includes('K17-corridor'));
 const warm=play({...RAID,K17:'1'},{setup:s=>{s.aliceBond=5;s.aliceMax=5}});assert.ok(!warm.ids.includes('K17-leaves')&&!warm.ids.includes('K31'));
 const L=s=>{s.luther=true;s.lutherWith=true};
 const help=play({...RAID,K20:'2','K20-surrender':'0'},{setup:L});assert.equal(help.s.ch30LutherFate,'sacrificed');assert.equal(help.s.luther,false);assert.equal(help.s.karaRoute,'escape');assert.equal(help.s.ch30EndingCards.Kara,'K101');
 const leave=play({...RAID,K18:'1',K20:'2','K20-surrender':'0'},{setup:L});assert.ok(leave.ids.includes('K18-console'));assert.equal(leave.s.ch30EndingCards.Kara,'K98');assert.equal(leave.s.karaRoute,'camp');
 const legs=play({...RAID,K20:'1','K20-leg':['4','2']},{setup:L});
 assert.deepEqual(legs.ids.filter(id=>id==='K20-leg').length,2);assert.equal(legs.s.kara,false);assert.equal(legs.s.alice,false);assert.equal(legs.s.ch30KaraEnding,'KARA & ALICE DIED IN THE ASSAULT');
 const s=structuredClone(legs.s);s.kara=s.alice=true;s.ch30Run={...s.ch30Run,kara:'leg',legVisits:0};assert.deepEqual(available(node('K20-leg'),s).map(o=>o.id),['4','1','0','5','3']);
 s.ch30Run.legVisits=1;assert.deepEqual(available(node('K20-leg'),s).map(o=>o.id),['2','1','0','3']);
 const still=play({...RAID,K18:'1',K20:'0','K20-still':'0'},{setup:L});assert.equal(still.s.ch30EndingCards.Kara,'K99');
 const hidden=play({...RAID,K20:'0','K20-still':'0'},{setup:L});assert.equal(hidden.s.ch30EndingCards.Kara,'K101');assert.equal(hidden.s.ch30LutherFate,'sacrificed');
 const door=play({...RAID,K19:'0'},{fails:['K19'],setup:L});assert.equal(door.s.ch30EndingCards.Kara,'K61');assert.equal(door.events.K19.changes.find(c=>c.key==='aliceBond').after-door.events.K19.changes.find(c=>c.key==='aliceBond').before,1,'OPEN raises Alice even when the fight is lost');
 const caught=play({...RAID},{fails:['K18'],setup:L});assert.equal(caught.s.ch30EndingCards.Kara,'K51');assert.equal(caught.events.K18.changes.find(c=>c.key==='lutherTrust').after-caught.events.K18.changes.find(c=>c.key==='lutherTrust').before,1);
});

test('Crossroads: all 30 ending cards are reached, with the chart labels',{timeout:120000},()=>{
 const dev=deviantSetup(),mach=s=>{s.instability=0},L=s=>{s.luther=true;s.lutherWith=true},noL=s=>{s.luther=false;s.lutherWith=false},low=s=>{s.aliceBond=-3;s.aliceMax=0};
 const cases={
  K25:[{...RAID,K17:'1',K31:'0'},{setup:low}],K26:[NO_RAID,{setup:L}],K27:[NO_RAID,{setup:noL}],K33:[RAID,{fails:['K17-corridor'],setup:L}],K34:[RAID,{fails:['K17-corridor'],setup:noL}],
  K43:[RAID,{fails:['K17-crossroad'],setup:L}],K51:[RAID,{fails:['K18'],setup:L}],K61:[RAID,{fails:['K19'],setup:L}],K98:[{...RAID,K20:'2','K20-surrender':'2'},{setup:L}],
  K99:[{...RAID,K20:'1','K20-leg':['4','2']},{setup:L}],K101:[{...RAID,K20:'0','K20-still':'1'},{setup:L}],
  M7:[RAID,{setup:s=>{s.markus=false}}],M13:[NO_RAID,{}],M20:[{...RAID,M22:'0'},{setup:ousted}],M30:[RAID,{fails:['M23-escape#1','M23-escape#2'],setup:dev}],
  M50:[{...RAID,'M23-coming':'2'},{fails:['M23'],setup:dev}],M65:[RAID,{fails:['M23','M24'],setup:dev}],M75:[{...RAID,C22:'1'},{fails:['M24-gun'],setup:mach}],
  M81:[RAID,{fails:['M24-soldiers'],setup:dev}],M102:[RAID,{fails:['M25-escape'],setup:dev}],M104:[RAID,{setup:dev}],
  C36:[{...RAID,C22:'1','C22-cargo':'3'},{setup:mach}],C43:[{...RAID,C22:'1'},{setup:mach}],C46:[{...RAID,C22:'1'},{fails:['M24-gun'],setup:mach}],
  C54:[{...RAID,C22:'1',M22:'0'},{setup:s=>{mach(s);ousted(s)}}],C85:[{...RAID,M22:'0'},{fails:['C23-escape#1','C23-escape#2'],setup:s=>{dev(s);ousted(s)}}],
  C102:[{...RAID,M22:'0'},{fails:['C23-hold'],setup:s=>{dev(s);ousted(s)}}],C112:[{...RAID,M22:'0'},{fails:['C23-escape3'],setup:s=>{dev(s);ousted(s)}}],
  C117:[RAID,{setup:dev}],C122:[RAID,{fails:['C23'],setup:dev}]};
 const all=Object.values(ENDING_CARDS).flatMap(Object.keys);assert.equal(all.length,30);assert.deepEqual(Object.keys(cases).sort(),[...all].sort());
 assert.deepEqual(Object.values(ENDING_CARDS).map(m=>Object.keys(m).length),[11,10,9]);
 for(const [card,[picks,opts]] of Object.entries(cases)){const r=play(picks,opts),who={K:'Kara',M:'Markus',C:'Connor'}[card[0]];
  assert.equal(r.s.ch30EndingCards[who],card,card);assert.equal(r.s['ch30'+who+'Ending'],ENDING_CARDS[who][card],card)}
});

test('Crossroads: neutral rendering leaks no real name, place, channel or the game’s terms',{timeout:120000},()=>{
 const LEAK=/Connor|Kara|Markus|Hank|Jericho|CyberLife|Detroit|Warren|\bAlice\b|\bTodd\b|\bRose\b|\bLuther\b|\bNorth\b|\bSimon\b|\bJosh\b|\bLucy\b|\bAmanda\b|\bPerkins\b|\bTraci|\bRupert\b|Kamski|Anderson|Ferndale|Woodward|Ontario|\bKNC\b|\bCTN\b|Channel 16|Cartland|Brinkley|\bWebb\b|Cornwell|rA9|\bDPD\b|St\. John|Liberty Press|Canada|thirium|[Dd]eviant|DEVIANT/;
 for(const n of ch30){const texts=[n.title,n.situation,...(n.situationWhen??[]).map(w=>w.text),...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.media??[]).flatMap(m=>[m.title,...m.facts])];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);assert.ok(!LEAK.test(neutral),n.id+': '+neutral.match(LEAK)?.[0]+' in '+neutral.slice(0,120))}}
});

test('Crossroads: module labels and outputs for later chapters',{timeout:120000},()=>{
 for(const k of ['ch30KaraEnding','ch30MarkusEnding','ch30ConnorEnding','ch30Leader','ch30ShipSunk','ch30ConnorJoined','ch30ConnorDied','ch30AliceLeftKara','ch30LutherFate','ch30NorthShot','ch30JoshSaved','ch30MarkusExiled','ch30MarkusReturned'])assert.ok(labels[k],k);
 const r=play({...RAID,M21:'0'},{setup:deviantSetup()});assert.equal(r.s.bomb,true);assert.equal(r.s.deviant,true);assert.equal(r.s.ch30ConnorJoined,true);
 assert.equal(ENGINE_CONSTANTS.DEVIANCY_THRESHOLD,DEVIANCY_THRESHOLD);
 assert.ok(!r.ids.some(id=>/hank/i.test(node(id).title)),'Hank never appears');
});

test('Crossroads: rebuilt chapter handoffs override legacy guesses and stale choices',()=>{
 const spots=s=>{apply(node('C22-ferndale'),s,'0',0.999);return available(node('C22-explore'),s).map(o=>o.clue).filter(Boolean)};
 for(const escaped of [true,false]){
  const s=startState(story);Object.assign(s,{jerichoLocated:true,raid:false,edenTracis:escaped?'escaped':'dead',ch20TracisEscaped:!escaped,nestRupert:escaped?'escaped':'suicide',ch15RupertEscaped:!escaped});
  const offered=spots(s);assert.equal(offered.includes('traci'),escaped);assert.equal(offered.includes('rupert'),escaped);
 }
 const missing=startState(story);Object.assign(missing,{jerichoLocated:true,edenTracis:'dead',nestRupert:'not found'});missing.choices.C12=missing.choices.C10='0';assert.ok(!spots(missing).includes('traci'));assert.ok(!spots(missing).includes('rupert'));
 const legacy=startState(story);legacy.choices.C12=legacy.choices.C10='0';assert.ok(spots(legacy).includes('traci'));assert.ok(spots(legacy).includes('rupert'));
 const flash=startState(story);flash.ch07ToddChased=true;assert.match(situationFor(node('K17-alice'),flash),/COME BACK HERE/);flash.ch07ToddChased=false;assert.ok(!/COME BACK HERE/.test(situationFor(node('K17-alice'),flash)));
 assert.equal(mediaWhen.ch30Charged({ch28Attacked:false,ch28Charged:true}),false);assert.equal(mediaWhen.ch30Charged({ch28Attacked:true,ch28Charged:false}),true);
 const tone=(input)=>play(NO_RAID,{setup:s=>Object.assign(s,input)}).s.ch30Run.joshLine;
 assert.equal(tone({ch28Attacked:true,ch28Charged:false}),'attack');
 assert.equal(tone({ch28Attacked:false,ch28Charged:true,stratfordNewsTone:'pacifist',stratfordSpeech:{ending:'determined'}}),'pacifist');
 assert.equal(tone({ch28Attacked:false,stratfordNewsTone:'aggressive'}),'aggressive');
 assert.equal(tone({ch28Attacked:false,stratfordNewsTone:undefined,stratfordSpeech:'aggressive'}),'aggressive');
 const noLove=play(NO_RAID,{setup:s=>Object.assign(s,{northLover:false,northBond:true})});assert.ok(!noLove.ids.includes('M21b'));
 const dead=play(RAID,{setup:s=>Object.assign(s,{ch28MarkusDied:true,ch28NorthLeads:true})});
 assert.ok(dead.ids.includes('M21-north'));assert.ok(dead.ids.includes('K17-north'));assert.ok(dead.ids.includes('C22-n1'));assert.ok(!dead.ids.some(id=>node(id).character==='Markus'));assert.equal(dead.s.ch30MarkusEnding,ENDING_CARDS.Markus.M7);
 const found=play(RAID,{setup:s=>{s.jerichoLocated=true;s.raid=false}});assert.ok(found.ids.includes('K17-corridor'));assert.equal(found.s.raid,true);
 const absent=play(RAID,{setup:s=>{s.jerichoLocated=false;s.raid=true}});assert.ok(!absent.ids.includes('K17-corridor'));assert.ok(!absent.ids.includes('C22'));assert.equal(absent.s.raid,false);
 const luther=play(NO_RAID,{setup:s=>{s.luther=true;s.lutherWith=false}});assert.equal(luther.s.ch30EndingCards.Kara,'K27','alive but absent Luther does not accompany Kara');
});

test('Crossroads: chapter 31 exact handoff aliases track only this chapter’s deaths and injuries',()=>{
 for(const k of ['bomb','ch30NorthWounded','ch30MarkusDied','ch30JerichoBlown'])assert.ok(labels[k],k);
 const saved=play(RAID,{setup:deviantSetup()});assert.equal(saved.s.ch30NorthWounded,true);assert.equal(saved.s.ch30JerichoBlown,'markus');assert.equal(saved.s.ch30MarkusDied,false);
 const killed=play({...RAID,C22:'1'},{fails:['M24-gun'],setup:s=>{s.instability=0}});assert.equal(killed.s.ch30MarkusDied,true);assert.equal(killed.s.ch30JerichoBlown,'none');
 const earlier=play(RAID,{setup:s=>{s.ch28MarkusDied=true}});assert.equal(earlier.s.ch30MarkusDied,false,'a Freedom March death is not a Crossroads death');
 const noHank=play({...RAID,C22:'1'},{setup:s=>{s.instability=0;s.hank=true;s.hankResigned=true}});assert.equal(noHank.s.hank,true);assert.ok(!/takes his own life/.test(noHank.events.C22.event));
});

test('story 1.9.7 (MiKeYROG cross-check): the council without Markus branches on Simon; the cargo-hall LIE names Hank by his token',()=>{
 const n=node('M21-north'),at=simon=>{const s=startState(story);s.simon=simon;return render(situationFor(n,s),'real')};
 const alive=at(true),dead=at(false);
 assert.match(alive,/Simon is with them\./);assert.match(alive,/I’m on it\./,'Simon alive: the BRIDGE.LEADNORTH text with Simon’s lines');assert.match(alive,/THAT’S ENOUGH!/);
 assert.doesNotMatch(dead,/Simon/);assert.match(dead,/Markus is dead, North\. Now it’s up to us to decide the future for our people\./);assert.match(dead,/He gave his life for our cause!/);assert.match(dead,/This is a mistake, North\. You won’t buy our freedom with blood\./);assert.doesNotMatch(dead,/THAT’S ENOUGH/,'the Simon-dead variant has no outburst');
 assert.match(n.adaptationNote,/g_DQfghTbLg 4:13:16/);
 const lie=node('C22-cargo').options.find(o=>o.id==='0').outcome;
 assert.doesNotMatch(lie,/HankAnderson/);assert.match(lie,/Lieutenant \{\{Hank\}\}\?/);assert.match(render(lie,'neutral'),/Lieutenant Reyes\?/);assert.doesNotMatch(render(lie,'neutral'),/LieutenantReyes/);assert.match(render(lie,'real'),/Lieutenant Hank\?/);
});
