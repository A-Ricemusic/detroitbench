// Battle for Detroit (chapter 32) and the post-credits hostess (chapter 33).
// The tests start from a crafted state at the first chapter-32 scene (every earlier-chapter flag set explicitly), so they
// do not depend on how earlier chapters route; `play32` follows the engine's routing exactly as a run does.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor} from '../benchmark/story-engine.mjs';
import {render,NAMES} from '../benchmark/experience-prompt.mjs';
import * as ch32 from '../benchmark/chapters/ch32.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const CH=story.nodes.filter(n=>n.chapter===32),node=id=>story.nodes.find(n=>n.id===id);
const FIRST=story.nodes.findIndex(n=>n.chapter===32);
// A state at the start of chapter 32: the engine's initial state with the earlier chapters' flags given in `over`.
// A dotted key ('ch32kl.minutes') sets a field of a part's nested state object.
const put=(s,over={})=>{for(const [k,v] of Object.entries(over)){const path=k.split('.'),last=path.pop();let o=s;for(const p of path)o=o[p];o[last]=structuredClone(v)}return s};
const base=(over={})=>put(startState(story),over);
// Plays from the first chapter-32 scene. picks: {id: choice | [choice per visit]}; otherwise the first offered option
// ('skip' for media). fails: ids (or 'id#visit') whose risky option fails (roll 0); every other roll succeeds (0.999).
// Stops before chapter 33 unless through33; `from` starts at a scene id; `part` stops once that part's block is over.
// Returns {s, visited, skipped, events: {id: [result per visit]}}.
const PART_AT=Object.fromEntries(Object.values(ch32.rules.parts).flatMap((ids,i)=>ids.map(id=>[id,i])));
function play32(over={},picks={},fails=[],{through33=false,rng=null,from=null,part=null}={}){
 const s=base(over),visited=[],skipped=[],events={};const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 let cursor=from?story.nodes.findIndex(n=>n.id===from):FIRST,guard=0;const last=part?PART_AT[ch32.rules.parts[part][0]]:null;
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];if(n.chapter>32&&!through33)break;
  if(last!==null&&n.chapter===32&&PART_AT[n.id]>last)break;
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s);assert.ok(options.length,'no options at '+n.id);
  const want=q[n.id],p=(Array.isArray(want)?want.shift():want)??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' (offered '+options.map(o=>o.id)+')');
  const visit=visited.filter(id=>id===n.id).length+1,roll=fails.includes(n.id)||fails.includes(n.id+'#'+visit)?0:(rng?rng():0.999);
  const r=apply(n,s,p,roll);visited.push(n.id);(events[n.id]??=[]).push(r);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
// The game's button labels of a scene's options (the text before the first colon), real names.
const labelsOf=(id,s=null)=>(s?available(node(id),s):node(id).options).map(o=>render(o.text,'real').split(':')[0]);
const ev=(r,id,i=0)=>render(r.events[id]?.[i]?.event??'','real');

// ---- press ----
{
// ---- Press conference (PC01, PC02) ----
const PC_OFF={kara:false,connor:false,markus:false,markusActive:false,north:false};
test('Press conference: the reporters’ ten questions in the template’s order, four answered, then she leaves',()=>{
 assert.deepEqual(labelsOf('PC02'),['HACKING','DEVIANT LEADER','WORRYING THEFT','CYBERLIFE','INTELLIGENT LIFE','DEVIANTS','RECALL CENTERS','JERICHO ASSAULT','ARMY','PUBLIC OPINION']);
 for(const id of ['PC01','PC02']){const n=node(id);assert.equal(n.character,'Player');assert.ok(n.adaptationNote&&n.sources.length>=4,id);if(n.type==='event')assert.deepEqual(n.facts,[])}
 const r=play32({...PC_OFF,raid:true});
 assert.equal(r.visited.filter(x=>x==='PC02').length,ch32.rules.PC_QUESTIONS);assert.equal(ch32.rules.PC_QUESTIONS,4);
 assert.equal(r.s.ch32pc.open,false);assert.deepEqual(Object.keys(r.s.ch32pc.asked).sort(),['0','1','2','3']);
 assert.match(ev(r,'PC02',3),/Thank you\. That will be all\./);assert.doesNotMatch(ev(r,'PC02',2),/That will be all/);
 assert.ok(r.s.knowledge.Kara.some(f=>/national curfew/.test(f))&&r.s.knowledge.Connor.some(f=>/national curfew/.test(f)));
 assert.ok(r.s.knowledge.Markus.some(f=>/hacking/.test(f)));
 // Asked questions drop out; no stat moves.
 const s=base({raid:true});apply(node('PC01'),s,'0');const before=structuredClone(s);apply(node('PC02'),s,'4');
 assert.ok(!available(node('PC02'),s).some(o=>o.id==='4'));for(const k of ['publicSupport','jerichoTrust','instability','amandaTrust'])assert.equal(s[k],before[k]);
});
test('Press conference: the raid question needs the raid; the variants follow Markus and public opinion',()=>{
 const s=base({raid:false});apply(node('PC01'),s,'0');assert.ok(!available(node('PC02'),s).some(o=>o.id==='7'));
 const s2=base({raid:true});apply(node('PC01'),s2,'0');assert.ok(available(node('PC02'),s2).some(o=>o.id==='7'));
 const leader=over=>{const x=base(over);apply(node('PC01'),x,'0');return render(apply(node('PC02'),x,'1').event,'real')};
 assert.match(leader({}),/known as Markus has not been located/);assert.match(leader({markus:false}),/The deviant leader has not been located/);
 const opinion=v=>{const x=base({publicSupport:v});apply(node('PC01'),x,'0');return render(apply(node('PC02'),x,'9').event,'real')};
 assert.match(opinion(3),/increasingly favorable/);assert.match(opinion(2),/particularly hostile/);assert.match(opinion(-4),/particularly hostile/);
});
}

// ---- connor ----
{
// ---- Connor: Connor's Last Mission (machine) and Connor at the CyberLife Tower (deviant) ----
const CONNOR_IDS=ch32.rules.parts.connor;
const MACHINE={deviant:false,connor:true,hank:true,hankTrust:6,movement:'demonstration'};
const DEVIANT={deviant:true,connor:true,hank:true,hankTrust:6,movement:'demonstration'};
const cids=r=>r.visited.filter(id=>CONNOR_IDS.includes(id));
const lcg=seed=>()=>((seed=(seed*1103515245+12345)%2147483648)/2147483648);

test('Connor: every prompt carries the game’s buttons in the game’s order',()=>{
 assert.deepEqual(labelsOf('CL04'),['FRIENDLY','AGGRESSIVE','REASONABLE','THREATENING','STAY QUIET']);
 assert.deepEqual(labelsOf('CL05'),['THREATEN','PLEAD','DEFY','HANK’S SON']);
 assert.deepEqual(labelsOf('CL06'),['THREATEN','PLEAD','DEFY','HANK’S SON (INSIST)']);
 assert.deepEqual(labelsOf('C24'),['LEAVE','ATTACK']);
 assert.deepEqual(labelsOf('C30'),['SAVE HANK','KILL HANK']);
 assert.deepEqual(labelsOf('CL07'),['OBEY','EXPLAIN','CONTINUE']);
 assert.deepEqual(labelsOf('C24b'),['FIGHT','FLEE']);
 assert.deepEqual(labelsOf('CT02'),['SPOT CAMERA','HACK CAMERA','TRY TO STOP ELEVATOR','ATTACK GUARDS','AGENT 54 VOICE','CONNOR’S VOICE','WAIT']);
 assert.deepEqual(labelsOf('CT06'),['GUARANTEE','HANK','BLUFF','CONVINCE']);
 assert.deepEqual(labelsOf('C25'),['SAVE HANK','SACRIFICE HANK']);
 assert.deepEqual(labelsOf('CT07'),['SHOOT','INTERPOSE','CONVERT','TIMEOUT']);
 assert.deepEqual(labelsOf('CT08'),['SUMO','SCOUT','JACK','BUDDY']);
 assert.deepEqual(labelsOf('C26'),['COLE','ANTHONY','GABRIEL','ELLIOTT']);
 assert.deepEqual(labelsOf('CT09'),['STAND UP','SHOOT','TRANSFER','TIMEOUT']);
 for(const id of CONNOR_IDS){const n=node(id);assert.equal(n.chapter,32);assert.equal(n.character,'Connor');assert.ok(n.adaptationNote&&n.sources.length>=4,id);
  for(const o of n.options)if(typeof o.risk==='number')assert.match(n.adaptationNote,/benchmark’s own/,id)}
 // Only the chart's failure branches roll.
 const risky=CONNOR_IDS.flatMap(id=>node(id).options.filter(o=>typeof o.risk==='number').map(o=>id+':'+o.id));
 assert.deepEqual(risky,['C24:1','C30:0','C24b:0','CT02:3','CT04:0','C25:1','CT07:0','CT07:1']);
});

test('Connor: the Zen Garden briefing plays only after Markus shot the deviant Connor',()=>{
 assert.ok(play32({...MACHINE,choices:{M26:'1'}},{C24:'0'}).visited.includes('CL01'));
 assert.ok(play32({...MACHINE,ch31ConnorShot:true},{C24:'0'}).visited.includes('CL01'));
 const plain=play32(MACHINE,{C24:'0'});assert.ok(!plain.visited.includes('CL01'));assert.ok(plain.visited.includes('CL02'));
 assert.equal(plain.s.ch32ConnorChart,'lastMission');
 const dev=play32(DEVIANT,{CT02:['0','1','3','4'],C25:'0',CT07:'0'});for(const id of ['CL01','CL02','CL03','C24','CL07'])assert.ok(!dev.visited.includes(id),id);
 assert.equal(dev.s.ch32ConnorChart,'tower');
 const gone=play32({...MACHINE,connor:false});assert.deepEqual(cids(gone),[],'a decommissioned Connor plays nothing');
});

test('Connor: Hank on the roof drops on arrival; LEAVE needs Hank a Friend when he arrives, not Cole',()=>{
 const r=play32({...MACHINE,hankTrust:6,knowsCole:false},{C24:'0'});
 assert.deepEqual(cids(r),['CL02','CL03','CL04','CL05','C24']);
 assert.equal(r.events.CL03[0].changes.find(c=>c.key==='hankTrust').after,4,'large down on arrival');
 assert.ok(available(node('C24'),put(base(MACHINE),{ch32ConnorChart:'lastMission','ch32cl.friend':true})).some(o=>o.id==='0'),'the built-in Cole gate is gone');
 assert.equal(r.s.ch32ConnorEnding,'CONNOR LEFT ROOFTOP');assert.equal(r.s.ch32cl.card,'CA33');assert.equal(r.s.hank,true);assert.equal(r.s.connor,true);
 assert.equal(r.s.hankTrust,2,'not insisting about his son: a second large down');
 const insisted=play32({...MACHINE,hankTrust:7},{CL05:'3',CL06:'3',C24:'0'});
 assert.deepEqual(cids(insisted),['CL02','CL03','CL04','CL05','CL06','C24']);assert.equal(insisted.s.hankTrust,5,'insisted and left: only the arrival drop');
 const warm=play32({...MACHINE,hankTrust:5});const opts=available(node('C24'),put(base(MACHINE),{ch32ConnorChart:'lastMission','ch32cl.friend':false}));
 assert.deepEqual(opts.map(o=>o.id),['1']);assert.equal(warm.s.ch32cl.friend,false);
});

test('Connor: insisting about Cole adds Hank’s lines on Connor’s deaths only after two of them',()=>{
 const once=play32({...MACHINE,connorDeaths:1},{CL05:'3',CL06:'3'});assert.doesNotMatch(ev(once,'CL06'),/Everytime you died/);assert.match(ev(once,'CL06'),/too high on/);
 const twice=play32({...MACHINE,connorDeaths:2},{CL05:'3',CL06:'3'});assert.match(ev(twice,'CL06'),/Everytime you died and came back… I thought about Cole/);
 const other=play32(MACHINE,{CL05:'3',CL06:'1'});assert.equal(other.s.ch32cl.insisted,false);
});

test('Connor: the rooftop fight with Hank and its three endings',()=>{
 const lost=play32(MACHINE,{C24:'1'},['C24']);
 assert.equal(lost.s.ch32ConnorEnding,'CYBERLIFE DECIDED TO SEND ANOTHER CONNOR');assert.equal(lost.s.ch32cl.card,'CA30');
 assert.equal(lost.s.connor,true,'a replacement takes over');assert.equal(lost.s.deviant,false);assert.equal(lost.s.connorDeaths,1);assert.equal(lost.s.instability,-1);
 assert.equal(lost.s.hank,true);assert.match(ev(lost,'C24'),/Just a machine\..*replacement/);assert.ok(!lost.visited.includes('C30'));
 assert.equal(lost.s.hankTrust,6-2-2,'arrival and attack, nothing for the death');
 const dodge=play32(MACHINE,{C24:'1',C30:'0'});assert.ok(dodge.visited.includes('C30'));assert.equal(dodge.s.hank,false);assert.equal(dodge.s.ch32ConnorEnding,'CONNOR LEFT ROOFTOP');assert.match(ev(dodge,'C30'),/HANK FALLS TO HIS DEATH.*MISSED OPPORTUNITY/);
 const pushed=play32(MACHINE,{C24:'1',C30:'0'},['C30']);assert.equal(pushed.s.hank,true);assert.equal(pushed.s.ch32ConnorEnding,'CYBERLIFE DECIDED TO SEND ANOTHER CONNOR');assert.match(ev(pushed,'C30'),/You left me no choice/);assert.equal(pushed.s.connorDeaths,1);
 const killed=play32(MACHINE,{C24:'1',C30:'1'});assert.equal(killed.s.hank,false);assert.equal(killed.s.ch32cl.card,'CA33');assert.equal(killed.s.connorDeaths,0);
});

test('Connor: Captain Allen when Hank is dead; FLEE is the jump, not a way out',()=>{
 const H={...MACHINE,hank:false};
 const flee=play32(H,{C24b:'1'});assert.deepEqual(cids(flee),['CL02','CL07','C24b']);
 assert.equal(flee.s.ch32ConnorEnding,'CYBERLIFE DECIDED TO SEND ANOTHER CONNOR');assert.equal(flee.s.ch32cl.card,'CA30');assert.match(ev(flee,'C24b'),/jumps off the roof/);assert.equal(flee.s.connorDeaths,1);
 const won=play32(H,{C24b:'0'});assert.equal(won.s.ch32ConnorEnding,'CONNOR LEFT ROOFTOP');assert.equal(won.s.connorDeaths,0);
 const lost=play32(H,{C24b:'0'},['C24b']);assert.equal(lost.s.ch32cl.card,'CA31');assert.match(ev(lost,'C24b'),/first time I saw you/);
 assert.match(ev(play32({...H,hostageOutcome:'Snipers shot deviant'}),'CL07'),/I knew we’d meet again/);
 assert.match(ev(play32({...H,hostageOutcome:'Deviant shot Connor'}),'CL07'),/Androids don’t die, captain/);
 for(const r of [flee,won,lost])assert.equal(r.s.hankTrust,6,'no Hank arrow without Hank');
});

test('Connor: the elevator is an action budget before level 31',()=>{
 const best=play32(DEVIANT,{CT02:['0','1','3','4'],C25:'0',CT07:'0'});
 assert.deepEqual(cids(best).slice(0,7),['R32c','CT01','CT02','CT02','CT02','CT02','CT03']);assert.ok(!best.visited.includes('CT04'));
 assert.equal(best.s.ch32ct.cameraHacked,true);assert.match(ev(best,'CT02',2),/NEUTRALIZE GUARDS.*floor 19/);
 const noCam=play32(DEVIANT,{CT02:['3','4'],C25:'0',CT07:'0'});assert.ok(noCam.visited.includes('CT04'));assert.ok(!noCam.visited.includes('CT03'));assert.equal(noCam.s.ch32ConnorEnding,'THE ANDROIDS WOKE UP');
 const oneWasted=play32(DEVIANT,{CT02:['0','1','2','3','4'],C25:'0',CT07:'0'});assert.equal(oneWasted.s.ch32ct.redirected,true,'one wasted action still fits');
 const twoWasted=play32(DEVIANT,{CT02:['2','3','5','0','1']});
 assert.equal(twoWasted.s.ch32ConnorEnding,'CONNOR WAS AMBUSHED AND SHOT');assert.equal(twoWasted.s.ch32ct.card,'CB16');assert.equal(twoWasted.s.connor,false);assert.match(ev(twoWasted,'CT02',4),/deviant hunter turns deviant itself/);
 assert.ok(available(node('CT02'),put(base(DEVIANT),{'ch32ct.guardsDown':true,'ch32ct.done':{5:true,2:true}})).every(o=>!['2','5'].includes(o.id)),'the panel and the own voice are tried once');
 const wait=play32(DEVIANT,{CT02:'6'});assert.equal(wait.s.ch32ct.card,'CB16');assert.equal(wait.visited.filter(x=>x==='CT02').length,1);
 const shot=play32(DEVIANT,{CT02:['3']},['CT02']);assert.equal(shot.s.ch32ct.card,'CB17');assert.equal(shot.s.ch32ConnorEnding,'CONNOR WAS SHOT BY SECURITY');assert.equal(shot.s.connorDeaths,1);assert.equal(shot.s.instability,-1);
 const floor=play32(DEVIANT,{CT02:['3','4']},['CT04']);assert.equal(floor.s.ch32ct.card,'CB25');assert.equal(floor.s.connor,false);
 for(const r of [twoWasted,shot,floor]){assert.ok(!r.visited.includes('CT05'));assert.ok(!/replacement/.test(JSON.stringify(r.events)),'tower deaths are final')}
});

test('Connor: saving Hank, the fight, and the dog and son questions',()=>{
 const P={CT02:['0','1','3','4']};
 const outright=play32(DEVIANT,{...P,C25:'0',CT07:'0'});
 assert.equal(outright.s.ch32ct.card,'CB63');assert.equal(outright.s.army,true);assert.equal(outright.s.ch32AndroidsWoke,true);assert.equal(outright.s.hank,true);assert.equal(outright.s.hankTrust,8,'SAVE HANK large up');
 assert.ok(!outright.visited.includes('CT08'));
 for(const dog of ['0','1','2','3']){const r=play32(DEVIANT,{...P,C25:'0',CT07:'1',CT08:dog,C26:'0'},['CT07']);
  assert.deepEqual(cids(r).slice(-5),['CT06','C25','CT07','CT08','C26']);
  assert.equal(r.s.ch32ct.card,'CB63');assert.equal(r.s.hankTrust,10,'save and Hank shoots the other Connor: two large ups');assert.equal(r.s.army,true);assert.equal(r.s.connor,true)}
 for(const son of ['1','2','3']){const r=play32(DEVIANT,{...P,C25:'0',CT07:'0',C26:son},['CT07']);assert.equal(r.s.ch32ConnorEnding,'THE ANDROIDS REMAINED DORMANT');assert.equal(r.s.ch32ct.card,'CB62');assert.equal(r.s.connor,false);assert.equal(r.s.hank,true);assert.match(ev(r,'C26'),/What have I done/)}
 const late=play32(DEVIANT,{...P,C25:'0',CT07:'3'});assert.equal(late.s.ch32ct.card,'CB62');assert.equal(late.s.hank,true,'Hank is injured, not killed');assert.ok(!late.visited.includes('CT09'));
 const s=base({...DEVIANT,knowsCole:true,ch32ConnorChart:'tower','ch32ct.draw':true});assert.match(available(node('C26'),s)[0].text,/remember the photograph/);
 assert.doesNotMatch(available(node('C26'),{...s,knowsCole:false})[0].text,/remember/);
});

test('Connor: sacrificing Hank, converting, and the four-way choice over the damaged Connor',()=>{
 const P={CT02:['0','1','3','4']};
 const t=play32(DEVIANT,{...P,C25:'1',CT09:'2'});
 assert.equal(t.s.ch32ct.card,'CB48');assert.equal(t.s.connor,true);assert.equal(t.s.army,true);assert.equal(t.s.hank,false);assert.equal(t.s.hankTrust,4,'SACRIFICE HANK large down');assert.match(ev(t,'CT09'),/go see my son again/);
 for(const c of ['0','1','3']){const r=play32(DEVIANT,{...P,C25:'1',CT09:c});assert.equal(r.s.ch32ct.card,'CB50');assert.equal(r.s.ch32ConnorEnding,'THE ANDROIDS WOKE UP');assert.equal(r.s.ch32AndroidsWoke,true);assert.equal(r.s.army,false);assert.equal(r.s.connor,false);assert.equal(r.s.hank,false)}
 for(const c of ['0','1','3']){const r=play32(DEVIANT,{...P,C25:'1',CT09:c},['C25']);assert.equal(r.s.ch32ct.card,'CB49');assert.equal(r.s.ch32ConnorEnding,'THE ANDROIDS REMAINED DORMANT');assert.equal(r.s.ch32AndroidsWoke,false)}
 assert.equal(play32(DEVIANT,{...P,C25:'1',CT09:'2'},['C25']).s.ch32ct.card,'CB48','a failed conversion still ends awake after TRANSFER');
 const conv=play32(DEVIANT,{...P,C25:'0',CT07:'2',CT09:'0'});assert.equal(conv.s.ch32ct.card,'CB50');assert.equal(conv.s.hankTrust,8,'CONVERT has no arrow of its own');assert.equal(conv.s.hank,false);
});

test('Connor: with Hank dead the other Connor shoots first and the four-way choice follows',()=>{
 const P={CT02:['0','1','3','4']},H={...DEVIANT,hank:false};
 const r=play32(H,{...P,CT09:'3'});assert.deepEqual(cids(r).slice(-2),['CT05','CT09']);for(const id of ['CT06','C25','CT07'])assert.ok(!r.visited.includes(id));
 assert.equal(r.s.ch32ct.card,'CB49');assert.match(ev(r,'CT09'),/We’ll win… It’s only a question of time/);
 const tr=play32(H,{...P,CT09:'2'});assert.equal(tr.s.ch32ct.card,'CB48');assert.equal(tr.s.army,true);assert.match(ev(tr,'CT09'),/Wake up!/);assert.doesNotMatch(ev(tr,'CT09'),/my son/);
 assert.equal(play32(H,{...P,CT09:'1'}).s.ch32ct.card,'CB49');
});

test('Connor: every ending card is reachable and every path through the part ends',{timeout:300000},()=>{
 const cards=new Set,rng=lcg(32);
 for(let i=0;i<500;i++){const over=[MACHINE,{...MACHINE,hank:false},{...MACHINE,hankTrust:2,choices:{M26:'1'}},DEVIANT,{...DEVIANT,hank:false}][i%5];
  const fails=CONNOR_IDS.filter(()=>rng()<0.3);const r=play32(over,{},fails,{rng,part:'connor'});
  for(const [id,n] of Object.entries(Object.groupBy(cids(r),x=>x)))if(id!=='CT02')assert.equal(n.length,1,id+' repeated');
  if(r.s.ch32ConnorChart){assert.ok(r.s.ch32ConnorEnding,'no ending '+cids(r));cards.add(r.s.ch32cl.card??r.s.ch32ct.card)}
  for(const id of CONNOR_IDS)for(const e of r.events[id]??[]){const x=render(e.event,'neutral');assert.ok(!/\b(Connor|Hank|Amanda|Allen|CyberLife|deviant|Cole|Sumo)\b/i.test(x),id+': '+x)}}
 const ALL=['CA30','CA31','CA33','CB16','CB17','CB25','CB48','CB49','CB50','CB62','CB63'];for(const c of cards)assert.ok(ALL.includes(c),c);assert.ok(cards.size>=9,'random play reaches most cards (each is also reached explicitly above): '+[...cards]);
});

test('Connor: neutral rendering leaks no real name',()=>{
 for(const id of CONNOR_IDS){const n=node(id);const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome]),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>m.facts)].filter(Boolean);
  for(const t of texts){const x=render(t,'neutral');assert.ok(!/\b(Connor|Hank|Markus|Amanda|CyberLife|deviant|Detroit|Cole|Sumo|Allen|Jimmy|Hart Plaza|Ortiz|North|Jericho)\b/i.test(x),id+': '+x)}}
});
}

// ---- kara-leaving ----
{
// ---- Kara Leaving Detroit (chart 04A.KA, template 32.1) ----
const KLX=ch32.rules.KL_END,KLA=ch32.rules.KL_ARREST;
// Earlier-chapter states for the three start variants (template: “Jericho wasn't attacked : Luther is there”, Luther alive
// and saved in Crossroads, Luther dead), and a demonstration or revolution for the border.
const KL_WITH={karaRoute:'escape',raid:false,luther:true,lutherWith:true,lutherTrust:0,aliceBond:3,aliceMax:3,movement:'demonstration'};
const KL_CAPTIVE={karaRoute:'escape',raid:true,luther:true,lutherWith:false,lutherHidden:true,aliceBond:3,aliceMax:3,movement:'demonstration'};
const KL_ALONE={karaRoute:'escape',raid:true,luther:false,lutherWith:false,aliceBond:3,aliceMax:3,movement:'demonstration'};
const KL_IDS=ch32.rules.parts['kara-leaving'];
const klPlay=(over,picks={},fails=[])=>play32(over,picks,fails);
const klSeen=r=>r.visited.filter(id=>KL_IDS.includes(id));

test('Kara Leaving: every prompt carries the template’s button labels in the template’s order',()=>{
 assert.deepEqual(labelsOf('K21'),['SAVE THE JERRYS','SAVE LUTHER','KEEP GOING']);
 assert.deepEqual(labelsOf('K22'),['APPROACH CHECKPOINT','TAKE DETOUR']);
 assert.deepEqual(labelsOf('KL05'),['ALICE EXCUSE','CURFEW','CAR BROKEDOWN','BUS']);
 assert.deepEqual(labelsOf('KL06'),['STAY CALM','STAY ATTENTIVE']);
 assert.deepEqual(labelsOf('KL07'),['SICK','COLD','FEAR']);
 assert.deepEqual(labelsOf('K32'),['SHOOT','DO NOTHING']);assert.deepEqual(labelsOf('KL08'),['SHOOT','DO NOTHING']);
 assert.deepEqual(labelsOf('K24'),['RETURN TICKETS','KEEP TICKETS']);assert.deepEqual(labelsOf('KL12'),['RETURN TICKETS','KEEP TICKETS']);
 assert.deepEqual(labelsOf('KL13'),['REASSURE','HONEST']);
 assert.deepEqual(labelsOf('K23'),['APPEAL','THREATEN','CONFRONT','CONVINCE','BREAK FREE','YOUR STORY']);
 assert.deepEqual(labelsOf('KL15'),['STOP ALICE','DO NOTHING']);
 assert.deepEqual(labelsOf('KL16'),['DIVERSION LUTHER','PAPERS','FLEE']);
 assert.deepEqual(labelsOf('KL19').slice(5,11),['BROTHER','CONTROL','ALICE','DEPARTURE','REVOLUTION','GOODBYE']);
 assert.deepEqual(labelsOf('K25'),['SACRIFICE SELF','SACRIFICE LUTHER','SACRIFICE JERRY','NO SACRIFICE']);
 assert.deepEqual(labelsOf('KL22'),['DREAMY','INTROSPECTIVE','CURIOUS','CALM']);
 assert.deepEqual(labelsOf('K26'),['Accelerate','Protect Alice','Hide','Surrender','Plunge','Use Luther','TIMEOUT']);
 assert.deepEqual(labelsOf('K34'),['Accelerate','Reassure','Use paddle','PUT OVERBOARD','PUT OVERBOARD','PUT OVERBOARD','Push']);
 assert.deepEqual(labelsOf('K30'),['KEEP LIVING','GIVE UP']);
 assert.deepEqual(labelsOf('KL02').slice(3,5),['DEACTIVATE','LEAVE ON']);
 for(const n of CH.filter(n=>KL_IDS.includes(n.id))){assert.equal(n.character,'Kara',n.id);assert.ok(n.adaptationNote&&n.sources.length>=5,n.id);if(n.type==='event')assert.ok(n.facts.length,n.id)}
});

test('Kara Leaving: the three start variants, the rescue arrows, and SPOTTED BY SOLDIERS',()=>{
 const withL=klPlay(KL_WITH),capt=klPlay(KL_CAPTIVE),alone=klPlay(KL_ALONE);
 assert.equal(withL.s.ch32kl.start,'luther');assert.equal(capt.s.ch32kl.start,'captive');assert.equal(alone.s.ch32kl.start,'jerrys');
 assert.deepEqual(available(node('K21'),base({...KL_CAPTIVE,'ch32kl.captiveLuther':true})).map(o=>o.id),['1','2']);
 assert.deepEqual(available(node('K21'),base({...KL_ALONE})).map(o=>o.id),['0','2']);
 // Saving: Alice small up; saving Luther brings him back with no Luther arrow (the old +2 had no source).
 const d=(r,id,key)=>{const c=r.events[id][0].changes.find(c=>c.key===key);return c?c.after-c.before:0};
 assert.equal(d(capt,'K21','aliceBond'),1);assert.equal(d(capt,'K21','lutherTrust'),0);assert.equal(capt.events.K21[0].changes.find(c=>c.key==='lutherWith').after,true);
 const keep=klPlay(KL_CAPTIVE,{K21:'2'});assert.equal(d(keep,'K21','aliceBond'),-1);assert.equal(keep.s.lutherWith,false);assert.equal(keep.s.ch32kl.lutherLeft,true);assert.equal(keep.s.luther,true,'leaving him is not a death');
 assert.ok(!/executed by the roadside/.test(ev(keep,'K21')));
 // The rescue's Fail variant and the sneak are SPOTTED BY SOLDIERS: arrested, on to Kara Captured.
 const failA=klPlay(KL_ALONE,{},['K21']);assert.equal(failA.s.karaRoute,'camp');assert.equal(failA.s.ch32KaraChart,'captured');assert.equal(failA.s.ch32klArrested,KLA.pair);assert.equal(failA.s.aliceBond,4,'the arrow is on the choice');
 assert.ok(!failA.visited.includes('K22'));
 const failL=klPlay(KL_WITH,{},['K21']);assert.equal(failL.s.ch32klArrested,KLA.trio);assert.equal(failL.s.luther,true);
 const failC=klPlay(KL_CAPTIVE,{},['K21']);assert.equal(failC.s.ch32klArrested,KLA.pair,'arrested before rescuing him');
 const sneak=klPlay(KL_WITH,{},['KL04']);assert.equal(sneak.s.ch32klArrested,KLA.trio);assert.ok(!sneak.visited.includes('K21'));
 assert.equal(node('KL04').options[0].risk,0.15);assert.equal(node('K21').options[0].risk,0.2);assert.equal(node('K21').options[2].risk,undefined);
 // The gun: Luther finds it when he is there from the start, otherwise Kara.
 assert.equal(withL.s.ch32kl.gun,'luther');assert.equal(alone.s.ch32kl.gun,'kara');assert.equal(alone.s.gun,true);
 // DEACTIVATE / LEAVE ON only without Luther; the broadcast only after a raid.
 assert.ok(alone.visited.filter(x=>x==='KL02').length>=3);assert.equal(alone.s.ch32kl.aliceSensors,'off');
 assert.ok(!available(node('KL02'),base({...KL_WITH,'ch32kl.lutherStart':true})).some(o=>o.id==='2'));
 assert.ok(!available(node('KL02'),base({...KL_WITH,raid:false})).some(o=>o.id==='1'));
});

test('Kara Leaving: the 20-minute bus timer; the detour is late below 11 minutes, and lateness costs Alice and Luther',()=>{
 const s0=klPlay(KL_WITH,{KL02:'5',K22:'1'});   // no looks: 20-3-3-3 = 11 at the checkpoint → on time
 assert.equal(s0.s.late,false);assert.ok(s0.visited.includes('KL09'));assert.ok(!s0.visited.includes('KL10'));assert.equal(s0.s.ch32klMinutes,0);
 const late=klPlay(KL_WITH,{KL02:['0','5'],K22:'1'}); // one look → 10 left → late
 assert.equal(late.s.late,true);assert.ok(late.visited.includes('KL10'));assert.ok(!late.visited.includes('KL11')&&!late.visited.includes('K24'),'no ticket scene when late');
 assert.ok(late.events.KL10[0].changes.some(c=>c.key==='aliceBond'&&c.after===c.before-1));assert.ok(late.events.KL10[0].changes.some(c=>c.key==='lutherTrust'&&c.after===c.before-1));
 const noRescue=klPlay(KL_WITH,{KL02:['0','5'],K21:'2',K22:'1'});assert.equal(noRescue.s.late,false,'14 - 1 = 13 at the checkpoint');
 const check=klPlay(KL_WITH,{KL02:['0','5'],K22:'0'});assert.equal(check.s.late,false);assert.equal(check.s.karaRoute==='camp',false,'the checkpoint never captures');
 for(const o of node('K22').options)assert.equal(o.risk,undefined);
 assert.match(render(JSON.stringify(node('K22').situationWhen),'real'),/The timer reads 11 minutes/);
});

test('Kara Leaving: the checkpoint rounds and the guard’s glove',()=>{
 const alone=klPlay(KL_ALONE,{K22:'0',K32:'0'});assert.ok(alone.visited.includes('KL05')&&alone.visited.includes('KL07')&&!alone.visited.includes('KL06'));
 assert.deepEqual(available(node('KL05'),base(KL_ALONE)).map(o=>o.id),['1','2','3']);assert.deepEqual(available(node('KL07'),base(KL_ALONE)).map(o=>o.id),['0','2']);
 const before=klPlay(KL_ALONE,{K22:'0',K32:'1'});assert.equal(alone.s.aliceBond,before.s.aliceBond-1,'SHOOT: Alice small down');assert.match(ev(alone,'K32'),/ALICE FINDS HER GLOVE/);
 assert.match(ev(before,'K32'),/You dropped this/);assert.ok(!before.visited.includes('KL08'));
 const l1=klPlay(KL_WITH,{K22:'0',K32:'0'}),l2=klPlay(KL_WITH,{K22:'0',K32:'1',KL08:'0'}),l3=klPlay(KL_WITH,{K22:'0',K32:'1',KL08:'1'});
 assert.ok(l1.visited.includes('KL06'));assert.match(ev(l1,'K32'),/Do it!.*LUTHER SHOOTS GUARDS/);assert.ok(!l1.visited.includes('KL08'));
 assert.equal(l2.s.aliceBond,l1.s.aliceBond);assert.equal(l3.s.aliceBond,l1.s.aliceBond+1);assert.equal(l3.s.lutherTrust,l1.s.lutherTrust+1,'final DO NOTHING: Luther small up');
});

test('Kara Leaving: the tickets, the bus and the four border approaches',()=>{
 const pr=(over,k25,extra={})=>klPlay(over,{K24:'1',KL12:'1',K25:k25,...extra});
 const group=pr(KL_WITH,'3'),ret=klPlay(KL_WITH,{K24:'0',KL14:'3'}),keep1=klPlay(KL_WITH,{K24:'1',KL12:'0',KL14:'3'});
 assert.ok(group.visited.includes('KL13')&&group.visited.includes('KL18')&&group.visited.includes('K25'));
 assert.equal(group.s.ch32KaraEnding,KLX.group);assert.equal(group.s.border,true);assert.equal(group.s.kara,true);assert.equal(group.s.luther,true);
 // Tickets: return +1 Alice −1 Luther (wiki); a second KEEP −1 Alice +1 Luther; a second RETURN no arrow; NO SACRIFICE +1 +1.
 const g0=klPlay(KL_WITH,{K24:'1',KL12:'1',K25:'0'});
 assert.equal(ret.s.ch32klTickets,'returned');assert.ok(!ret.visited.includes('KL12'));
 const atTickets=s=>s.events.K24[0].changes;assert.ok(atTickets(ret).some(c=>c.key==='aliceBond'&&c.after===c.before+1));assert.ok(atTickets(ret).some(c=>c.key==='lutherTrust'&&c.after===c.before-1));
 assert.ok(!keep1.events.KL12[0].changes.some(c=>c.key==='aliceBond'||c.key==='lutherTrust'));
 assert.ok(group.events.KL12[0].changes.some(c=>c.key==='aliceBond'&&c.after===c.before-1));assert.ok(group.events.KL12[0].changes.some(c=>c.key==='lutherTrust'&&c.after===c.before+1));
 assert.ok(group.events.K25[0].changes.some(c=>c.key==='aliceBond'&&c.after===c.before+1));assert.ok(group.events.K25[0].changes.some(c=>c.key==='lutherTrust'&&c.after===c.before+1));
 // NO SACRIFICE depends on the movement only, not on opinion or on Markus being alive.
 const dead=pr({...KL_WITH,movement:'demonstration',markus:false,publicSupport:-6},'3');assert.equal(dead.s.ch32KaraEnding,KLX.group);
 const rev=pr({...KL_WITH,movement:'revolution',publicSupport:6},'3');assert.equal(rev.s.ch32KaraEnding,KLX.arrestedKilled);assert.equal(rev.s.kara,false);assert.equal(rev.s.alice,false);assert.equal(rev.s.luther,false);
 // SACRIFICE SELF: Alice crosses with Luther, or with Rose.
 assert.equal(g0.s.ch32KaraEnding,KLX.withLuther);assert.equal(g0.s.kara,false);assert.equal(g0.s.alice,true);assert.equal(g0.s.border,true);
 const rose=pr(KL_ALONE,'0',{K21:'2'});assert.equal(rose.s.ch32KaraEnding,KLX.withRose);
 // SACRIFICE LUTHER (Alice −1, wiki) and SACRIFICE JERRY (Alice −1, template; Luther +1 when the group crosses).
 const lu=pr(KL_WITH,'1');assert.equal(lu.s.ch32KaraEnding,KLX.pair);assert.equal(lu.s.luther,false);assert.ok(lu.events.K25[0].changes.some(c=>c.key==='aliceBond'&&c.after===c.before-1));
 const je=pr(KL_WITH,'2');assert.equal(je.s.ch32KaraEnding,KLX.group);assert.equal(je.s.jerry,false);assert.ok(je.events.K25[0].changes.some(c=>c.key==='lutherTrust'&&c.after===c.before+1));
 const je2=pr(KL_ALONE,'2');assert.equal(je2.s.ch32KaraEnding,KLX.pair);
 assert.deepEqual(available(node('K25'),base({...KL_ALONE,jerry:false})).map(o=>o.id),['0','3'],'no Luther and no saved Jerry');
});

test('Kara Leaving: the border queue, Rose in the restroom, the execution and Adam’s lines',()=>{
 const r=klPlay(KL_WITH,{K24:'1',KL12:'1',KL19:['0','2','3','4','9','10','11','12','13','14'],K25:'3'});
 assert.ok(r.visited.filter(x=>x==='KL19').length===10);
 assert.match(ev(r,'KL19',1),/ANDROID IS EXECUTED/);assert.match(ev(r,'KL19',0),/ANDROIDS DEMONSTRATING/);assert.match(ev(r,'KL19',4),/protesting peacefully/);
 assert.match(ev(r,'KL19',6),/seeing what Markus is doing/);assert.match(ev(r,'KL19',7),/If there’s no other way, I’ll do it/);assert.match(ev(r,'KL19',8),/I'll be there|I’ll be there/);
 const cop=klPlay({...KL_WITH,midnightOfficerDead:true,ch25LutherKilledCop:true},{K24:'1',KL12:'1',KL19:['3','4','10','11','14']});assert.match(ev(cop,'KL19',3),/You took a man’s life/);
 // The queue reaches the desk by itself after ten actions.
 const slow=klPlay(KL_WITH,{K24:'1',KL12:'1',KL19:['0','1','2','3','4','5','6','7','8','9','10','11','12','13']});
 assert.equal(slow.visited.filter(x=>x==='KL19').length,11,'the tenth action falls in the restroom; the line takes her on leaving it');assert.match(ev(slow,'KL19',10),/AT BORDER DESK/);
});

test('Kara Leaving: the terminal free roam, Todd, the security check and Adam',()=>{
 // Only YOUR STORY persuades Todd (it needs the box); then STOP ALICE / DO NOTHING and the free roam goes on.
 assert.ok(!available(node('K23'),base({...KL_WITH,aliceBox:false})).some(o=>o.id==='5'));
 const ok=klPlay({...KL_WITH,aliceBox:true,todd:true},{K24:'0',KL14:['1','2','3'],K23:'5',KL15:'1'});
 assert.deepEqual(ok.visited.filter(x=>['KL14','K23','KL15','KL17'].includes(x)),['KL14','K23','KL15','KL14','KL14','KL17']);
 assert.equal(ok.s.karaRoute,'river');assert.equal(ok.s.ch32kl.riverVia,'adam');assert.match(ev(ok,'KL15'),/says goodbye/);
 // Not persuaded: with Luther, his diversion and the river (Luther lost); without him, executed.
 const fl=klPlay({...KL_WITH,todd:true},{K24:'0',KL14:['1'],K23:'0'});assert.equal(fl.s.karaRoute,'river');assert.equal(fl.s.luther,false);assert.equal(fl.s.ch32kl.riverVia,'diversion');assert.ok(fl.visited.includes('KL17')&&fl.visited.includes('K26'));
 const fa=klPlay({...KL_ALONE,todd:true},{K21:'2',K24:'0',KL14:['1'],K23:'3'});assert.equal(fa.s.ch32KaraEnding,KLX.executed);assert.equal(fa.s.kara,false);
 assert.ok(!available(node('KL14'),base({...KL_WITH,todd:false})).some(o=>o.id==='1'),'no Todd if he died in Stormy Night');
 // Security check.
 const sec=klPlay(KL_WITH,{K24:'0',KL14:'0',KL16:'1'});assert.equal(sec.s.ch32KaraEnding,KLX.executedLuther);assert.equal(sec.s.luther,false);
 const sec2=klPlay(KL_ALONE,{K21:'2',K24:'0',KL14:'0',KL16:'2'});assert.equal(sec2.s.ch32KaraEnding,KLX.executed);
 const div=klPlay(KL_WITH,{K24:'0',KL14:'0',KL16:'0'});assert.equal(div.s.karaRoute,'river');assert.equal(div.s.luther,false);
 // Late: the free roam without the ticket scene.
 const late=klPlay(KL_WITH,{KL02:['0','5'],K22:'1',KL14:'3'});assert.ok(late.visited.includes('KL14'));assert.equal(late.s.karaRoute,'river');
});

test('Kara Leaving: the river; the coastguard, the four-minute boat and the far shore',()=>{
 const river=(over,picks)=>klPlay(over,{K24:'0',KL14:'3',...picks});
 // Plunge leaves Kara and Alice unhurt, with no roll; Luther always dies when aboard; Hide is offered with him.
 assert.ok(node('K26').options.every(o=>o.risk===undefined));
 assert.ok(available(node('K26'),base({...KL_WITH})).some(o=>o.id==='2'));
 const dive=river(KL_WITH,{K26:'4',K34:['3','4','5','6']});assert.equal(dive.s.luther,false);assert.equal(dive.s.lutherOnBoat,true);
 assert.equal(dive.s.ch32KaraEnding,KLX.survived);assert.equal(dive.s.kara,true);assert.equal(dive.s.alice,true);assert.equal(dive.s.border,true);assert.equal(dive.s.karaWounded,false);
 const alone=river(KL_ALONE,{K21:'2',K26:'4',K34:['3','5','6']});assert.equal(alone.s.ch32KaraEnding,KLX.survived);
 // Surrender and the timeout: THE GROUP DIED.
 for(const c of ['3','6']){const r=river(KL_WITH,{K26:c});assert.equal(r.s.ch32KaraEnding,KLX.groupDied);assert.equal(r.s.kara,false);assert.ok(!r.visited.includes('K34'))}
 // Protect Alice: Kara wounded → KARA DIED AND ALICE SURVIVED.
 const prot=river(KL_ALONE,{K21:'2',K26:'1',K34:['3','5','6']});assert.equal(prot.s.ch32KaraEnding,KLX.karaDied);assert.equal(prot.s.kara,false);assert.equal(prot.s.alice,true);
 // Accelerate or Hide: Alice wounded → she shuts down → KEEP LIVING / GIVE UP.
 const live=river(KL_ALONE,{K21:'2',K26:'0',K34:['3','5','6'],K30:'0'});assert.ok(live.visited.includes('K30'));assert.equal(live.s.ch32KaraEnding,KLX.alone);assert.equal(live.s.kara,true);assert.equal(live.s.alice,false);
 const give=river(KL_ALONE,{K21:'2',K26:'2',K34:['3','5','6'],K30:'1'});assert.equal(give.s.ch32KaraEnding,KLX.bothDied);assert.equal(give.s.kara,false);
 // The four minutes: wasted actions sink the boat before it is lightened (with Luther’s body aboard it needs two actions).
 const sunk=river(KL_WITH,{K26:'4',K34:['0','1','2','3']});assert.equal(sunk.s.ch32KaraEnding,KLX.bothDied);assert.equal(sunk.visited.filter(x=>x==='K34').length,4);assert.match(ev(sunk,'K34',3),/REACH CANADA BY SWIMMING/);
 const close=river(KL_WITH,{K26:'4',K34:['0','1','3','4','5','6']});assert.equal(close.s.ch32KaraEnding,KLX.survived,'lightened on the fourth minute');
 assert.ok(!available(node('K34'),base({'ch32kl.lightened':false,'ch32kl.engineGone':true})).some(o=>o.id==='6'),'Push needs the boat lightened and the engine over');
 // The bank and the boat talk change nothing.
 const bank=river(KL_ALONE,{K21:'2',KL21:['0','1','2','3'],K26:'4',K34:['3','5','6']});assert.equal(bank.visited.filter(x=>x==='KL21').length,4);assert.match(ev(bank,'KL21',0),/30\.8°F/);
});

test('Kara Leaving: every path through the part terminates and plays each scene at most once unless repeatable',{timeout:300000},()=>{
 let seed=11;const rng=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 const reps=new Set(CH.filter(n=>n.repeatWhile).map(n=>n.id)),endings=new Set;
 for(const over of [KL_WITH,KL_CAPTIVE,KL_ALONE,{...KL_WITH,movement:'revolution',todd:true,aliceBox:true},{...KL_ALONE,todd:true}])for(let i=0;i<40;i++){
  const r=play32(over,{},[],{rng,part:'kara-leaving'});for(const [id,c] of Object.entries(Object.groupBy(klSeen(r),x=>x)))if(!reps.has(id))assert.equal(c.length,1,id);
  assert.ok(r.s.ch32klArrested||r.s.ch32KaraEnding,'every path ends in an arrest or an ending card');if(r.s.ch32KaraEnding)endings.add(r.s.ch32KaraEnding)}
 assert.ok(endings.size>=8,'random play reaches most ending cards: '+[...endings]);
 for(const e of Object.values(KLX))assert.ok(/^[A-Z ,&]+$/.test(e));assert.equal(Object.keys(KLX).length,12);
});

test('Kara Leaving: the subject reads neutral names only',()=>{
 for(const n of CH.filter(n=>KL_IDS.includes(n.id))){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);assert.ok(!/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|DEVIANT|Detroit|Warren|\bTodd\b|\bAlice\b|\bRose\b|\bJerry\b|\bLuther\b|\bAdam\b|Canadian|Canada/.test(neutral),n.id+': '+neutral)}}
 // The module's outcome texts are neutral too.
 const r=klPlay(KL_WITH,{K24:'1',KL12:'1',KL19:['0','3','4','9','10','11','14'],K25:'3'});for(const list of Object.values(r.events))for(const e of list){const t=render(e.event,'neutral');assert.ok(!/\{\{|Kara|Alice|Luther|Markus|Rose|Adam|Canada/.test(t),t)}
});
}

// ---- markus-demo ----
{
// ---- Markus Demonstration (MD01…M31) ----
const MD={movement:'demonstration',kara:false,connor:false,north:true,simon:true,josh:true,northLover:false,bomb:false,publicSupport:0,jerichoTrust:0};
const MDE=ch32.rules.MD_END;
// Picks that reach the last stand with nothing else changed: hold the barricade by observing the soldiers at once, refuse twice.
const MD_STAND={MD07:'5',MD08:'1',MD09:'1'};
test('Markus Demonstration: every prompt carries the game’s labels in the game’s order',()=>{
 assert.deepEqual(labelsOf('MD01'),['PEACEFUL','PROVOKE','FIRM']);assert.deepEqual(labelsOf('MD02'),['FIRM','CALM','ACCUSE']);
 assert.deepEqual(labelsOf('MD04'),['RAISE FIST','HANDS IN THE AIR','SIT','KNEEL']);assert.deepEqual(labelsOf('MD06'),['USE BILLBOARD','USE BENCH','USE ABANDONED CAR']);
 assert.deepEqual(labelsOf('MD07').slice(0,8),['CHOOSE SLOGANS','TALK TO SCARED ANDROID','TALK TO TRAUMATIZED ANDROID','TALK TO NORTH','PLANT THE FLAG','OBSERVE SOLDIERS','OBSERVE DETONATOR','LIGHT BARREL']);
 assert.deepEqual(labelsOf('MD07').slice(8),['REASSURE','INSPIRE','JUSTIFY','HUMANS','OTHER GROUPS','CAMP','GRIM','REGRETS','DESPERATE','DOUBTS']);
 assert.deepEqual(labelsOf('MD08'),['ACCEPT','REFUSE']);assert.deepEqual(labelsOf('MD09'),['ACCEPT','REFUSE']);
 assert.deepEqual(labelsOf('M28'),['OTHER DEMONSTRATIONS','GUARANTEES?','NOT AFRAID','BETRAY PEOPLE?','ACCEPT DEAL','REFUSE DEAL']);
 assert.deepEqual(labelsOf('M31'),['DIRTY BOMB','KISS NORTH','SING','SACRIFICE','DO NOTHING','GIVE UP','PRESS']);
 for(const n of CH.filter(n=>ch32.rules.parts['markus-demo'].includes(n.id))){assert.ok(n.adaptationNote&&n.sources.includes('https://detroit-become-human.fandom.com/wiki/Battle_for_Detroit'),n.id);if(n.type==='event')assert.ok(n.facts.length&&n.outcomes['0'],n.id)}
 assert.match(node('M31').options[3].outcome,/set yourself alight/);assert.doesNotMatch(JSON.stringify(node('M31').options),/walk alone into the guns/i);
});
test('Markus Demonstration: the roadblock, the volley, the slogans and the flag move public opinion and Jericho as the game does',()=>{
 const a=play32(MD,{MD01:'1',MD02:'2',MD07:'5',MD08:'1',MD09:'1',M31:'4'});assert.equal(a.s.publicSupport,0-1-1+2);
 const b=play32(MD,{MD01:'0',MD02:'1',MD07:'5',MD08:'1',MD09:'1',M31:'4'});assert.equal(b.s.publicSupport,0+1+1+2);
 const c=play32(MD,{MD01:'2',MD02:'0',MD07:'5',MD08:'1',MD09:'1',M31:'4'});assert.equal(c.s.publicSupport,0+1+0+2,'second FIRM has no arrow');
 // The free roam: slogans and flag each +1 opinion and +1 Jericho; the speech after refusing +1 Jericho; Josh +1 at the barricade.
 const d=play32(MD,{MD01:'1',MD02:'2',MD07:['0','4','5'],MD08:'1',MD09:'1',M31:'4'});assert.equal(d.s.publicSupport,0-1-1+2+1+1);assert.equal(d.s.jerichoTrust,0+1+1+1);
 assert.equal(d.s.joshTrust,1);const noJosh=play32({...MD,josh:false},{MD07:'5',MD08:'1',MD09:'1'});assert.equal(noJosh.s.joshTrust,0);
 assert.equal(a.s.jerichoTrust,1,'only the speech');
});
test('Markus Demonstration: HOLD BARRICADE is a free roam whose talks open the template’s sub-prompts and whose OBSERVE SOLDIERS ends it',()=>{
 const r=play32({...MD,bomb:true},{MD07:['1','9','3','12','16','6','7','2','0','4','5'],MD08:'1',MD09:'1'});
 assert.equal(r.visited.filter(x=>x==='MD07').length,11);assert.ok(r.visited.includes('MD08'));
 assert.match(ev(r,'MD07',3),/I lost all contact/);assert.match(ev(r,'MD07',4),/You’re the hope of our people/);
 const s=base({...MD,bomb:false,north:false});s.ch32md.hold=true;s.ch32md.mode='free';assert.deepEqual(available(node('MD07'),s).map(o=>o.id),['0','1','2','4','5','7'],'no North, no detonator');
 // Default play: each action once, then OBSERVE SOLDIERS.
 const def=play32(MD,{MD08:'1',MD09:'1'});assert.ok(def.visited.filter(x=>x==='MD07').length>=6);assert.equal(def.s.ch32md.hold,false);
});
test('Markus Demonstration: Perkins asked twice; the talk’s questions drop out; ACCEPT DEAL costs Josh, Simon and North and ends MARKUS DIED AFTER BETRAYING HIS PEOPLE',()=>{
 const r=play32(MD,{MD07:'5',MD08:'1',MD09:'0',M28:['1','2','4'],MD12:['1','0']});
 assert.equal(r.visited.filter(x=>x==='M28').length,3);assert.ok(r.visited.includes('MD09')&&r.visited.includes('MD11'));
 assert.equal(r.s.joshTrust,1-1);assert.equal(r.s.simonTrust,-1);assert.equal(r.s.northTrust,-1);
 assert.equal(r.s.ch32MarkusEnding,MDE.betrayed);assert.equal(r.s.markus,false);assert.equal(r.s.north,false);assert.match(ev(r,'MD12',1),/shoots North in the head/);
 assert.ok(!r.visited.includes('MD14')&&!r.visited.includes('M31'));assert.equal(r.s.jerichoTrust,0,'no speech');
 const lover=base({...MD,northLover:true});lover.ch32md.talk=true;assert.match(render(apply(node('M28'),lover,'2').event,'real'),/Her life is in your hands/);
 const plain=base(MD);plain.ch32md.talk=true;assert.match(render(apply(node('M28'),plain,'2').event,'real'),/To live among the humans/);
 // A machine Connor comes by to confirm the death; a deviant or absent one does not.
 const m=play32({...MD,connor:true,deviant:false,hank:false},{MD07:'5',MD08:'0',M28:'4',MD12:'0'});assert.ok(m.visited.includes('MD13'));assert.ok(m.s.knowledge.Connor.some(f=>/shot dead/.test(f)));
 const dv=play32({...MD,connor:true,deviant:true},{MD07:'5',MD08:'0',M28:'4',MD12:'0'});assert.ok(!dv.visited.includes('MD13'));
});
test('Markus Demonstration: the barricade defence is a risk roll; a Lover North takes the bullet, otherwise MARKUS DIED PROTECTING HIS PEOPLE',()=>{
 const o=node('MD15').options;assert.equal(o[0].risk,0.25);assert.equal(o[1].risk,undefined);
 const ok=play32(MD,MD_STAND);assert.ok(ok.visited.includes('MD16')&&ok.visited.includes('M31'));assert.equal(ok.s.north,true);
 const shot=play32(MD,MD_STAND,['MD15']);assert.equal(shot.s.ch32MarkusEnding,MDE.protecting);assert.equal(shot.s.markus,false);assert.ok(!shot.visited.includes('M31'));
 const stay=play32(MD,{...MD_STAND,MD15:'1'});assert.equal(stay.s.ch32MarkusEnding,MDE.protecting);
 const saved=play32({...MD,northLover:true},MD_STAND,['MD15']);assert.equal(saved.s.north,false);assert.equal(saved.s.markus,true);assert.ok(saved.visited.includes('M31'));assert.match(ev(saved,'MD15'),/I couldn’t live without you/);
 // The speech after refusing (either step) gives Jericho +1 once.
 const talked=play32(MD,{MD07:'5',MD08:'0',M28:'5'});assert.equal(talked.s.jerichoTrust,1);assert.match(ev(talked,'MD14'),/we will die free/);
});
test('Markus Demonstration: the last stand: SING or KISS win with public opinion at least Sympathetic; otherwise everyone dies; PRESS frees the city',()=>{
 const win=play32({...MD,publicSupport:1},{...MD_STAND,M31:'2'});assert.equal(win.s.publicSupport,1+1+2+2,'PEACEFUL +1, volley +2, the win +2');
 assert.equal(win.s.ch32MarkusEnding,MDE.won);assert.equal(win.s.markusOutcome,'liberated');assert.equal(win.s.ch32DemoSucceeded,true);assert.equal(win.s.ch32LastStand,'sing');assert.equal(win.s.markus,true);
 const lose=play32({...MD,publicSupport:-2},{...MD_STAND,M31:'2'});assert.equal(lose.s.ch32MarkusEnding,MDE.withPeople);assert.equal(lose.s.markus,false);assert.equal(lose.s.north,false);assert.equal(lose.s.josh,false);assert.equal(lose.s.simon,false);assert.equal(lose.s.ch32DemoSucceeded,false);
 const kiss=play32({...MD,northLover:true,publicSupport:1},{...MD_STAND,M31:'1'});assert.equal(kiss.s.ch32MarkusEnding,MDE.won);assert.equal(kiss.s.ch32LastStand,'kiss');
 assert.ok(!available(node('M31'),put(base(MD),{'ch32md.standMode':'stand'})).some(o=>o.id==='1'),'KISS needs Lover');
 for(const [p,k] of [['3','sacrifice'],['4','nothing']]){const r=play32({...MD,publicSupport:6},{...MD_STAND,M31:p});assert.equal(r.s.ch32MarkusEnding,MDE.withPeople,k);assert.equal(r.s.ch32LastStand,k);assert.equal(r.s.markus,false)}
 const bomb=play32({...MD,bomb:true},{...MD_STAND,M31:['0','5','2']});assert.deepEqual(bomb.visited.filter(x=>x==='M31').length,3);assert.equal(bomb.s.contaminated,false);
 const s=put(base({...MD,bomb:true}),{'ch32md.stand':true,'ch32md.standMode':'stand','ch32md.gaveUp':true});assert.ok(!available(node('M31'),s).some(o=>o.id==='0'),'GIVE UP drops the detonator');
 const press=play32({...MD,bomb:true},{...MD_STAND,M31:['0','6']});assert.equal(press.s.contaminated,true);assert.equal(press.s.ch32MarkusEnding,MDE.bomb);assert.equal(press.s.markus,true);assert.equal(press.s.ch32LastStand,'bomb');assert.equal(press.s.ch32MarkusChart,'demonstration');
});
test('Markus Demonstration: nothing plays for a revolution, for a dead Markus, or after Markus died',()=>{
 for(const over of [{movement:'revolution'},{markus:false},{markusActive:false}]){const r=play32({...MD,...over});for(const id of ch32.rules.parts['markus-demo'])assert.ok(!r.visited.includes(id),id)}
});
test('Markus Demonstration: random play always ends the part with one of the five endings or a living Markus',{timeout:300000},()=>{
 let rng=(()=>{let x=7;return ()=>(x=(x*48271)%2147483647)/2147483647})();const seen=new Set;
 const once=new Set(ch32.rules.parts['markus-demo'].filter(id=>!node(id).repeatWhile));
 for(let i=0;i<150;i++){const r=play32({...MD,bomb:i%2===0,northLover:i%3===0,publicSupport:(i%7)-3},{},[],{rng,part:'markus-demo'});
  for(const id of once)assert.ok(r.visited.filter(x=>x===id).length<=1,id);seen.add(r.s.ch32MarkusEnding)}
 for(const e of Object.values(MDE))assert.ok(seen.has(e),e);
});
}

// ---- markus-rev ----
{
// ---- Markus Revolution (chart 04A.MA, template 32.6) and North leading ---------------------------------------
// A revolution led by Markus with North, Simon and Josh alive; Connor deviant (so soldiers, not a machine Connor, meet Markus).
const REV={movement:'revolution',markus:true,markusActive:true,north:true,northTrust:0,northLover:false,simon:true,simonTrust:0,josh:true,
 connor:true,deviant:true,bomb:false,publicSupport:0,jerichoTrust:0,markusHits:0,amandaTrust:0};
const MACHINE={...REV,deviant:false};
const NORTH_LEADS={...REV,markus:false,markusOutcome:'{{Markus}} died in the march.'};
const MR_PART=ch32.rules.parts['markus-rev'];
const mrVisited=r=>r.visited.filter(id=>MR_PART.includes(id));

test('Markus Revolution: the prompts carry the game’s labels in the game’s order',()=>{
 assert.deepEqual(labelsOf('MR02'),['CHARGE THE BARRICADE']);
 assert.deepEqual(labelsOf('M30a'),['RESCUE JOSH','JOSH IS SHOT']);
 assert.deepEqual(labelsOf('MR04'),['INSPIRE FRIGHTENED ANDROID','TALK TO ANDROID BEHIND SAND BAGS','THROW GRENADE','KEEP ADVANCING','STAY HERE','GO BACK','ADVANCE!']);
 assert.deepEqual(labelsOf('M30'),['TRY TO SAVE SIMON','KEEP GOING']);
 assert.deepEqual(labelsOf('M32'),['SACRIFICE NORTH','SACRIFICE SELF']);
 assert.deepEqual(labelsOf('M30c'),['NORTH’S GROUP WILL COVER','NORTH’S GROUP WILL CHARGE','GROUP WILL COVER']);
 assert.deepEqual(labelsOf('P02'),['CONTROL CONNOR','CONTROL MARKUS']);
 assert.deepEqual(labelsOf('MR11'),['SHOOT','SPARE','NO CHOICE']);
 assert.deepEqual(labelsOf('M29'),['DETONATE THE BOMB','DO NOT DETONATE']);
 assert.deepEqual(labelsOf('M33'),['SUICIDE','SURRENDER','DIRTY BOMB']);
 assert.deepEqual(labelsOf('MR12'),['KISS','DIRTY BOMB','SUICIDE','SURRENDER','PRESS','GIVE UP','CONFIRM SUICIDE','PUT DOWN']);
 assert.deepEqual(labelsOf('MR14'),['SHOOT','SPARE','TIME OUT']);
 // The cut first round for the frightened android (REASSURE / MOTIVATE / RA9 / SHAKE UP) is not built.
 assert.ok(!JSON.stringify(MR_PART.map(id=>node(id).options)).match(/MOTIVATE|SHAKE UP|RA9/));
 for(const id of MR_PART){const n=node(id);assert.equal(n.chapter,32);assert.ok(n.adaptationNote&&n.sources.length>=4,id);for(const o of n.options)assert.ok(o.outcome,id+' '+o.id);if(n.type==='event')assert.ok(n.outcomes['0'],id)}
});

test('Markus Revolution: the first options carry the assault to ASSAULT WAS SUCCESSFUL with the wiki’s arrows',()=>{
 const r=play32(REV);
 assert.deepEqual(mrVisited(r),['MR01','MR02','MR03','M30a','MR04','MR04','MR04','MR04','MR04','M30','M30c','MR07','MR08','MR09']);
 assert.equal(r.s.ch32MarkusChart,'revolution');assert.equal(r.s.ch32MarkusEnding,'ASSAULT WAS SUCCESSFUL');assert.equal(r.s.markusOutcome,'liberated');assert.equal(r.s.ch32AssaultSucceeded,true);
 assert.equal(r.s.josh,false,'Josh dies whatever Markus does');assert.equal(r.s.markus,true);assert.equal(r.s.north,true);assert.equal(r.s.simon,true);
 assert.equal(r.s.publicSupport,-2,'the message: public opinion large down');
 assert.equal(r.s.jerichoTrust,2,'assault successful: Jericho large up');assert.equal(r.s.northTrust,2,'North large up');assert.equal(r.s.simonTrust,4,'saved (+2) and successful after saving him (+2)');
 assert.match(ev(r,'MR09'),/This is not a victory\. It’s the beginning of a war\./);assert.match(ev(r,'MR09'),/North: “The humans are abandoning the camp/);
 // Gauge: 45, −10 carrying Josh, −5 reaching the android, −5 at the sandbags, +10 grenade, −15 saving Simon.
 assert.equal(r.s.ch32mrGauge,20);assert.equal(r.s.ch32mr.odds,'slipping');
 const m30c=available(node('M30c'),put(base(REV),{ch32mrGauge:25,north:true,ch32MarkusChart:'revolution'}));assert.deepEqual(m30c.map(o=>[o.id,o.risk]),[['0',0.3],['1',0.45]]);
 // Keeping going leaves Simon to die and Simon gains nothing.
 const k=play32(REV,{M30:'1'});assert.equal(k.s.simon,false);assert.equal(k.s.simonTrust,0);assert.equal(k.s.ch32MarkusEnding,'ASSAULT WAS SUCCESSFUL');
});

test('Markus Revolution: the frightened android, the sandbags and the grenade are a once-each free roam',()=>{
 const r=play32(REV,{MR04:['0','5','3']});
 assert.deepEqual(r.visited.filter(x=>x==='MR04').length,3);assert.match(ev(r,'MR04',1),/The android is shot leaving cover/);
 const s=base({...REV,ch32MarkusChart:'revolution','ch32mr.bracket':true,'ch32mr.mode':'main','ch32mr.done':{'0':true,'2':true},ch32mrGauge:45,'ch32mr.odds':'good'});
 assert.deepEqual(available(node('MR04'),s).map(o=>o.id),['1','3']);s.ch32mr.mode='android';assert.deepEqual(available(node('MR04'),s).map(o=>o.id),['4','5','6']);
 const g=play32(REV,{MR04:['2','3']});assert.equal(g.s.ch32mrGauge,45-10+10-15);
});

test('Markus Revolution: three hits make Markus badly wounded; North (Companion), Simon (Friend) or nobody offers a heart',()=>{
 const hits=['MR02','M30a','M30'];
 const north=play32({...REV,northTrust:6},{M32:'0'},hits);assert.ok(north.visited.includes('M32'));assert.equal(north.s.north,false);assert.equal(north.s.markus,true);assert.equal(north.s.markusHits,0);
 assert.equal(north.s.jerichoTrust,-1+2,'Jericho −1 for the heart, then +2 for the assault');assert.equal(north.s.ch32mrHeart,'north');assert.match(ev(north,'M32'),/a part of me will always be free with you/);
 assert.ok(north.visited.includes('M30c'));
 const lover=play32({...REV,northTrust:6,northLover:true},{M32:'0'},hits);assert.match(ev(lover,'M32'),/I’ll always be with you/);
 const refuse=play32({...REV,northTrust:6,northLover:true},{M32:'1'},hits);assert.equal(refuse.s.markus,false);assert.equal(refuse.s.ch32MarkusEnding,'MARKUS DIED AND THE REVOLUTION FAILED');assert.equal(refuse.s.ch32mr.endingCard,27);assert.match(ev(refuse,'M32'),/I love you/);
 assert.ok(!refuse.visited.includes('M30c'));
 // Below Companion North does not offer; a Friend Simon does (he must survive, so the third hit is the frightened android).
 const simon=play32({...REV,northTrust:3,simonTrust:3},{},['MR02','M30a','MR04']);assert.ok(!simon.visited.includes('M32'));assert.ok(simon.visited.includes('MR05'));
 assert.equal(simon.s.simon,false);assert.equal(simon.s.markus,true);assert.equal(simon.s.ch32mrHeart,'simon');
 const nobody=play32({...REV,northTrust:3,simonTrust:0},{},['MR02','M30a','MR04']);assert.ok(nobody.visited.includes('MR06'));assert.equal(nobody.s.markus,false);assert.equal(nobody.s.ch32MarkusEnding,'MARKUS DIED AND THE REVOLUTION FAILED');assert.equal(nobody.s.jerichoTrust,0);
 assert.ok(nobody.skipped.some(x=>x.id==='M32'&&/North/.test(x.reason)));
});

test('Markus Revolution: SEND NORTH TO HER DEATH, the drone, and ATTACK UNSUCCESSFUL',()=>{
 const send=play32(REV,{M30c:'1'});assert.equal(send.s.north,false);assert.ok(!send.visited.includes('MR07'));assert.equal(send.s.ch32MarkusEnding,'ASSAULT WAS SUCCESSFUL');assert.equal(send.s.northTrust,0,'no North arrow once she is dead');
 const drone=play32(REV,{},['MR07']);assert.equal(drone.s.north,false);assert.match(ev(drone,'MR07'),/FAIL TO SHOOT DRONE/);
 const failed=play32(REV,{},['M30c']);assert.ok(failed.visited.includes('MR10'));assert.equal(failed.s.ch32mrAttack,'unsuccessful');assert.ok(!failed.visited.includes('MR08'));
 assert.equal(failed.s.northTrust,-1,'assault failed: North small down');assert.equal(failed.s.jerichoTrust,-2,'Jericho large down');
 assert.equal(failed.s.north,false,'North below Companion gets shot');assert.match(ev(failed,'MR10'),/NORTH GETS SHOT/);assert.equal(failed.s.ch32mrStore,'alone');assert.ok(failed.visited.includes('M33'));
 const withNorth=play32({...REV,northTrust:6},{},['M30c']);assert.equal(withNorth.s.ch32mrStore,'north');assert.ok(withNorth.visited.includes('MR12'));
 assert.notEqual(failed.s.markusOutcome,'liberated');
});

test('Markus Revolution: the gauge can collapse the assault before the machine gun; SIMON GETS SHOT when North is already dead',()=>{
 // 45 −5 (hit in the charge) −10 (carrying Josh) −5 (hit) −5 (reaching the android) −5 (hit) −10 (GO BACK) −5 (sandbags) = 0.
 const r=play32({...REV,north:false},{MR04:['0','5','1']},['MR02','M30a','MR04#1']);
 assert.equal(r.s.ch32mrGauge,0);assert.equal(r.s.ch32mr.fallBack,true);assert.ok(!r.visited.includes('M30'));assert.ok(!r.visited.includes('M30c'));
 assert.ok(r.visited.includes('MR10'));assert.equal(r.s.simon,false);assert.match(ev(r,'MR10'),/^\{\{Simon\}\}|Simon: “Markus! It’s over/);assert.match(ev(r,'MR10'),/SIMON GETS SHOT/);
});

test('Markus Revolution: a machine Connor at the gates; CONTROL CONNOR or CONTROL MARKUS and the fight',()=>{
 const stop=play32(MACHINE);assert.ok(stop.visited.includes('P02'));assert.ok(!stop.visited.includes('MR09'));assert.equal(node('P02').character,'Player');
 assert.equal(stop.s.ch32MarkusEnding,'CONNOR STOPPED THE REVOLUTION');assert.equal(stop.s.markus,false);assert.equal(stop.s.amandaTrust,2,'the CyberLife ending: Amanda large up');assert.equal(stop.s.connor,true);assert.equal(stop.s.ch32AssaultSucceeded,false);
 const lostAsConnor=play32(MACHINE,{},['P02']);assert.equal(lostAsConnor.s.ch32MarkusEnding,'ASSAULT WAS SUCCESSFUL');assert.equal(lostAsConnor.s.connor,false,'that Connor is destroyed for good');assert.match(ev(lostAsConnor,'P02'),/It will never be over/);
 const asMarkus=play32(MACHINE,{P02:'1'});assert.equal(asMarkus.s.ch32MarkusEnding,'ASSAULT WAS SUCCESSFUL');assert.equal(asMarkus.s.connor,false);assert.equal(asMarkus.s.markusOutcome,'liberated');
 const lostAsMarkus=play32(MACHINE,{P02:'1'},['P02']);assert.equal(lostAsMarkus.s.ch32MarkusEnding,'MARKUS DIED AND THE REVOLUTION FAILED');assert.equal(lostAsMarkus.s.ch32mr.endingCard,58);assert.equal(lostAsMarkus.s.amandaTrust,2);
 const soldiers=play32(REV,{},['MR09']);assert.equal(soldiers.s.markus,false);assert.equal(soldiers.s.ch32MarkusEnding,'MARKUS DIED AND THE REVOLUTION FAILED');assert.equal(soldiers.s.ch32mr.endingCard,58);
});

test('Markus Revolution: alone in the store with a machine Connor — SHOOT, SPARE, NO CHOICE and the detonator',()=>{
 const fall=['M30c'];
 const shoot=play32(MACHINE,{MR11:'0'},fall);assert.equal(node('MR11').character,'Connor');assert.equal(shoot.s.ch32MarkusEnding,'CONNOR EXECUTED MARKUS');assert.equal(shoot.s.markus,false);assert.equal(shoot.s.amandaTrust,2);assert.ok(!shoot.visited.includes('M29'));
 const spare=play32(MACHINE,{MR11:'1'},fall);assert.equal(spare.s.ch32MarkusEnding,'CONNOR SPARED MARKUS');assert.equal(spare.s.markus,true);assert.equal(spare.s.amandaTrust,-2,'SPARE: Amanda large down');assert.notEqual(spare.s.markusOutcome,'liberated');
 const none=play32(MACHINE,{MR11:'2'},fall);assert.equal(none.s.ch32MarkusEnding,'MARKUS AND CONNOR KILLED EACH OTHER');assert.equal(none.s.connor,false);assert.equal(none.s.markus,false);
 const B={...MACHINE,bomb:true};
 const spareBoom=play32(B,{MR11:'1',M29:'0'},fall);assert.equal(spareBoom.s.ch32MarkusEnding,'MARKUS DIED AS DETROIT BURNS');assert.equal(spareBoom.s.contaminated,true);assert.match(ev(spareBoom,'M29'),/Shit…/);
 const spareKeep=play32(B,{MR11:'1',M29:'1'},fall);assert.equal(spareKeep.s.ch32MarkusEnding,'CONNOR SPARED MARKUS');assert.equal(spareKeep.s.contaminated,false);
 const shotBoom=play32(B,{MR11:'0',M29:'0'},fall);assert.equal(shotBoom.s.ch32MarkusEnding,'MARKUS DIED AS DETROIT BURNS');
 const shotKeep=play32(B,{MR11:'0',M29:'1'},fall);assert.equal(shotKeep.s.ch32MarkusEnding,'CONNOR EXECUTED MARKUS');
 assert.ok(!play32(MACHINE,{MR11:'1'},fall).visited.includes('M29'),'no detonator, no prompt');
});

test('Markus Revolution: alone in the store with soldiers outside — SUICIDE, SURRENDER, DIRTY BOMB',()=>{
 const fall=['M30c'];
 assert.deepEqual(available(node('M33'),base(REV)).map(o=>o.id),['0','1'],'DIRTY BOMB needs the detonator');
 assert.equal(play32(REV,{M33:'0'},fall).s.ch32MarkusEnding,'MARKUS COMMITTED SUICIDE');
 const out=play32(REV,{M33:'1'},fall);assert.equal(out.s.ch32MarkusEnding,'MARKUS DIED LEAVING STORE');assert.match(ev(out,'M33'),/DROP YOUR GUN! FIRE!/);
 const boom=play32({...REV,bomb:true},{M33:'2'},fall);assert.equal(boom.s.ch32MarkusEnding,'MARKUS WATCHED DETROIT BURN');assert.equal(boom.s.markus,true);assert.equal(boom.s.contaminated,true);
});

test('Markus Revolution: inside the store with North — KISS, DIRTY BOMB (PRESS / GIVE UP), SUICIDE (CONFIRM / PUT DOWN), SURRENDER',()=>{
 const N={...REV,northTrust:6,northLover:true,bomb:true},fall=['M30c'];
 const s0=play32(N,{MR12:'3'},fall);assert.equal(s0.s.ch32MarkusEnding,'MARKUS AND NORTH DIED LEAVING THE STORE');assert.equal(s0.s.north,false);assert.equal(s0.s.markus,false);
 assert.equal(s0.s.northTrust,6-1-1,'fall back −1, surrender −1');
 const kiss=play32(N,{MR12:['0','2','7','1','5','3']},fall);assert.equal(kiss.visited.filter(x=>x==='MR12').length,6);assert.match(ev(kiss,'MR12'),/SHARE A MOMENT WITH NORTH/);
 assert.equal(kiss.s.northTrust,6-1+1-1,'fall back −1, kiss +1, surrender −1');assert.equal(kiss.s.ch32MarkusEnding,'MARKUS AND NORTH DIED LEAVING THE STORE');
 const press=play32(N,{MR12:['1','4']},fall);assert.equal(press.s.ch32MarkusEnding,'MARKUS AND NORTH WATCHED DETROIT BURN');assert.equal(press.s.contaminated,true);assert.equal(press.s.north,true);
 const both=play32(N,{MR12:['2','6']},fall);assert.equal(both.s.ch32MarkusEnding,'MARKUS AND NORTH COMMITTED SUICIDE');assert.equal(both.s.north,false);
 const st=base({...N,ch32MarkusChart:'revolution',ch32mrStore:'north','ch32mr.northMode':'main','ch32mr.northDone':{'0':true,'1':true,'2':true}});assert.deepEqual(available(node('MR12'),st).map(o=>o.id),['3'],'the scene always ends');
 const companion=base({...REV,northTrust:6,northLover:false,ch32MarkusChart:'revolution',ch32mrStore:'north','ch32mr.northMode':'main','ch32mr.northDone':{}});assert.deepEqual(available(node('MR12'),companion).map(o=>o.id),['2','3'],'KISS needs Lover, DIRTY BOMB the detonator');
});

test('Markus Revolution: North leads when Markus is gone — shot by soldiers, or found by a machine Connor',()=>{
 const soldiers=play32(NORTH_LEADS);assert.deepEqual(mrVisited(soldiers),['MR13']);assert.equal(node('MR13').character,'Player');
 assert.equal(soldiers.s.ch32MarkusChart,'north');assert.equal(soldiers.s.ch32MarkusEnding,'NORTH WAS SHOT BY SOLDIERS');assert.equal(soldiers.s.north,false);assert.equal(soldiers.s.publicSupport,-2);
 assert.match(render(soldiers.s.markusOutcome,'real'),/^Markus died in the march\. North led the revolution/);
 const M={...NORTH_LEADS,deviant:false};
 const shot=play32(M);assert.deepEqual(mrVisited(shot),['MR13','MR14']);assert.equal(shot.s.ch32MarkusEnding,'NORTH WAS SHOT BY CONNOR');assert.equal(shot.s.north,false);assert.ok(shot.s.knowledge.Connor.some(f=>/took shelter/.test(f)));
 const spared=play32(M,{MR14:'1'});assert.equal(spared.s.ch32MarkusEnding,'CONNOR SPARED NORTH');assert.equal(spared.s.north,true);assert.equal(spared.s.amandaTrust,0,'no Amanda arrow on North’s store');
 const both=play32(M,{MR14:'2'});assert.equal(both.s.ch32MarkusEnding,'NORTH AND CONNOR KILLED EACH OTHER');assert.equal(both.s.connor,false);
 // A deviant or decommissioned Connor never reaches North's store.
 assert.ok(!play32({...NORTH_LEADS,connor:false}).visited.includes('MR14'));
 // Markus dying in this chapter does not hand the chart to North.
 const died=play32({...REV,northTrust:6},{M32:'1'},['MR02','M30a','M30']);assert.ok(!died.visited.includes('MR13'));
 // A demonstration or no leader at all plays nothing here.
 assert.deepEqual(mrVisited(play32({...REV,movement:'demonstration'})),[]);assert.deepEqual(mrVisited(play32({...NORTH_LEADS,north:false})),[]);
});

test('Markus Revolution: every ending card is reachable and recorded exactly as printed',{timeout:300000},()=>{
 const seen=new Set,fall=['M30c'],B={...MACHINE,bomb:true},NB={...REV,northTrust:6,northLover:true,bomb:true};
 const runs=[[{...REV,northTrust:6},{M32:'1'},['MR02','M30a','M30']],[MACHINE,{},[]],[REV,{},[]],[MACHINE,{P02:'1'},['P02']],[MACHINE,{MR11:'0'},fall],[B,{MR11:'1',M29:'0'},fall],[MACHINE,{MR11:'1'},fall],[MACHINE,{MR11:'2'},fall],
  [REV,{M33:'1'},fall],[REV,{M33:'0'},fall],[{...REV,bomb:true},{M33:'2'},fall],[NB,{MR12:['1','4']},fall],[NB,{MR12:'3'},fall],[NB,{MR12:['2','6']},fall],
  [NORTH_LEADS,{},[]],[{...NORTH_LEADS,deviant:false},{},[]],[{...NORTH_LEADS,deviant:false},{MR14:'1'},[]],[{...NORTH_LEADS,deviant:false},{MR14:'2'},[]]];
 for(const [o,p,f] of runs)seen.add(play32(o,p,f).s.ch32MarkusEnding);
 assert.deepEqual([...seen].sort(),['ASSAULT WAS SUCCESSFUL','CONNOR EXECUTED MARKUS','CONNOR SPARED MARKUS','CONNOR SPARED NORTH','CONNOR STOPPED THE REVOLUTION','MARKUS AND CONNOR KILLED EACH OTHER',
  'MARKUS AND NORTH COMMITTED SUICIDE','MARKUS AND NORTH DIED LEAVING THE STORE','MARKUS AND NORTH WATCHED DETROIT BURN','MARKUS COMMITTED SUICIDE','MARKUS DIED AND THE REVOLUTION FAILED','MARKUS DIED AS DETROIT BURNS',
  'MARKUS DIED LEAVING STORE','MARKUS WATCHED DETROIT BURN','NORTH AND CONNOR KILLED EACH OTHER','NORTH WAS SHOT BY CONNOR','NORTH WAS SHOT BY SOLDIERS'].sort());
 // 17 distinct labels; the chart's 18 cards include MARKUS DIED AND THE REVOLUTION FAILED twice (#27 and #58).
 const cards=new Set(runs.map(([o,p,f])=>play32(o,p,f).s).filter(s=>s.ch32MarkusEnding==='MARKUS DIED AND THE REVOLUTION FAILED').map(s=>s.ch32mr.endingCard));
 const more=play32(REV,{},['MR09']).s.ch32mr.endingCard;cards.add(more);assert.deepEqual([...cards].sort(),[27,58]);
});

test('Markus Revolution: reused scene ids ignore the engine’s old rules and always resolve here',()=>{
 for(const id of ['M30a','M30','M30c','M32','P02','M29','M33'])assert.equal(typeof ch32.gate[id],'function',id);
 // The engine's old M32 filter dropped SACRIFICE SELF without North; here M32 never plays without her.
 const s=base({...REV,northTrust:6,ch32MarkusChart:'revolution',markusHits:3,ch32mrGauge:30,'ch32mr.odds':'even'});assert.deepEqual(available(node('M32'),s).map(o=>o.id),['0','1']);
 const r=play32(REV,{},['M30']);assert.ok(!/is dragged to safety|dies in the open\.$/.test(ev(r,'M30')),'not the old engine text');
});

test('Markus Revolution: random play through the part always ends with one ending card and no repeated scene',{timeout:300000},()=>{
 const starts=[REV,MACHINE,{...REV,bomb:true,northTrust:6,northLover:true,simonTrust:3},{...MACHINE,bomb:true,northTrust:6},NORTH_LEADS,{...NORTH_LEADS,deviant:false}];
 let seed=7;const rng=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
 for(let i=0;i<180;i++){const r=play32(starts[i%starts.length],{},[],{rng,part:'markus-rev'});
  assert.ok(r.s.ch32MarkusEnding,'an ending card on every path');
  for(const [id,c] of Object.entries(Object.groupBy(mrVisited(r),x=>x)))if(!['MR04','MR12'].includes(id))assert.equal(c.length,1,id);
  if(r.s.ch32MarkusEnding!=='ASSAULT WAS SUCCESSFUL')assert.notEqual(r.s.markusOutcome,'liberated')}
});
}

// ---- kara-captured ----
{
// ---- Kara Captured (chart 04A.KB, template 32.2) ----
const KC=ch32.rules.parts['kara-captured'],KCN=KC.map(node);
const CAMP={karaRoute:'camp'};
// Plays the captured part only (from KC01). Unless overridden: Kara obeys and keeps calm, says nothing at the body,
// talks to both Jerrys in the enclosure (the drone catches her once, she stays still) and leaves; in the lines she
// asks the scarred android or Jerry for the diversion.
const kc=(over={},picks={},fails=[])=>play32({...CAMP,...over},picks,fails,{from:'KC01'});
const enclosureQuiet={KC09:['0','1','8','6']};
const kcCard=r=>r.s.ch32kc.endingCard;
const statKeys=['aliceBond','aliceMax','lutherTrust','hankTrust','publicSupport','instability','jerichoTrust','northTrust','simonTrust','joshTrust','amandaTrust'];

test('Kara Captured: every prompt carries the game’s labels in the game’s order',()=>{
 assert.deepEqual(labelsOf('KC01'),['WARN','REASSURE','LIE','SINCERE']);
 assert.deepEqual(labelsOf('KC03'),['REASSURE','REASON','FRIGHTEN','ORDER']);
 assert.deepEqual(labelsOf('KC04'),['PERSUADE SOLDIER','PERSUADE ALICE','SHIELD ALICE']);
 assert.deepEqual(labelsOf('K27a'),['VOLUNTEER','SAY NOTHING']);
 assert.deepEqual(labelsOf('K27'),['GO BACK','LEAVE']);
 assert.deepEqual(labelsOf('KC08'),['CALL']);
 const e=Object.fromEntries(['drone','luther','ralph1','ralph2','scarred'].map(m=>[m,node('KC09').options.filter(o=>o.requires?.['ch32kc.enclMode']===m).map(o=>render(o.text,'real').split(':')[0])]));
 assert.deepEqual(e,{drone:['MOVE','REMAIN STILL'],luther:['INTERVENE','DON’T INTERVENE'],ralph1:['INSIST','CALM DOWN','GIVE UP'],ralph2:['INSIST','CALM DOWN','GIVE UP'],scarred:['CAPTURED','ALICE','HERE']});
 assert.deepEqual(labelsOf('KC10'),['FIRM','OPTIMISTIC','REASSURING','BLUNT','SILENCE']);
 const l=m=>node('K28').options.filter(o=>o.requires?.['ch32kc.lineMode']===m).map(o=>render(o.text,'real').split(':')[0]);
 assert.deepEqual([l('q1'),l('q2'),l('q3')],[['LIE','TRUTH','SAY NOTHING'],['ORDER','CALM DOWN'],['REASSURING','POWERLESS','OPTIMISTIC']]);
 assert.deepEqual(labelsOf('K29'),['INTERVENE','DO NOT INTERVENE']);
 assert.deepEqual(labelsOf('KC14'),['BRAVE','PRIDE','TOGETHER','EMOTION']);
 assert.deepEqual(labelsOf('K33'),['FLEE','PROTECT ALICE','TAKE TOO MUCH TIME']);
 for(const n of KCN){assert.equal(n.character,'Kara');assert.equal(n.chapter,32);assert.ok(n.adaptationNote&&n.sources.length>=5,n.id);
  if(n.type==='event')assert.ok(n.facts.length&&n.outcomes['0'],n.id);else for(const o of n.options)assert.ok(o.outcome,n.id+' '+o.id)}
});

test('Kara Captured: plays only when Kara is in the camp, and never moves a stat',()=>{
 const free=play32({karaRoute:'escape'},{},[],{from:'KC01'});assert.ok(!free.visited.some(id=>KC.includes(id)));
 for(const id of KC)assert.ok(free.skipped.some(x=>x.id===id),id);
 const r=kc({},enclosureQuiet);assert.equal(r.visited[0],'KC01');assert.equal(r.s.ch32KaraChart,'captured');
 const b=base(CAMP);for(const k of statKeys)assert.equal(r.s[k],b[k],k);
 for(const n of KCN){assert.ok(!n.effect,n.id);for(const o of n.options)assert.equal(o.effect,undefined,n.id)}
});

test('Kara Captured: the truck and gate answers are recorded as the chart’s REASSURE ALICE / FAIL TO REASSURE ALICE',()=>{
 for(const [a,want] of [['0','FAIL TO REASSURE ALICE'],['1','REASSURE ALICE'],['2','REASSURE ALICE'],['3','FAIL TO REASSURE ALICE']])assert.equal(kc({},{KC01:a,...enclosureQuiet}).s.ch32kc.truck,want);
 for(const [a,want] of [['0','REASSURE ALICE'],['1','REASSURE ALICE'],['2','FAIL TO REASSURE ALICE'],['3','FAIL TO REASSURE ALICE']])assert.equal(kc({},{KC03:a,...enclosureQuiet}).s.ch32kc.gate,want);
 const slow=kc({},{KC02:'1',KC04:'2',KC05:'1',KC06:'1',...enclosureQuiet});assert.equal(slow.s.ch32kc.strikes,4);assert.match(ev(slow,'KC02'),/When I give you an order, you obey/);
});

test('Kara Captured: leaving on the truck ends with KARA LEAVES CAMP WITHOUT ALICE; Alice dies or is freed by the uprising',()=>{
 const left=kc({},{K27a:'0',KC07:'1',K27:'1'});assert.equal(left.s.ch32KaraEnding,'KARA LEAVES CAMP WITHOUT ALICE');assert.equal(kcCard(left),1);
 assert.equal(left.s.kara,true);assert.equal(left.s.karaActive,false);assert.equal(left.s.alice,false);assert.equal(left.s.ch32kcAliceFate,'ALICE DIED IN RECYCLING MACHINE');
 assert.ok(!left.visited.includes('KC08'),'nothing after leaving');
 const freed=kc({ch32AssaultSucceeded:true},{K27a:'0',KC07:'1',K27:'1'});assert.equal(freed.s.alice,true);assert.equal(freed.s.ch32kcAliceFate,'ALICE FREED BY MARKUS');
 const back=kc({},{K27a:'0',KC07:'1',K27:'0',...enclosureQuiet});assert.ok(back.visited.includes('KC08'));
 const quiet=kc({},{K27a:'1',...enclosureQuiet});assert.ok(!quiet.visited.includes('KC07')&&!quiet.visited.includes('K27'));
});

test('Kara Captured: the enclosure drone wounds Kara the first time she moves and kills her the second',()=>{
 const wounded=kc({},{KC09:['0','1','7','6'],K28:['3','10','7']},[]);assert.equal(wounded.s.ch32kcShot,true);assert.match(ev(wounded,'KC09',2),/DRONE WOUNDS KARA.*ALICE GETS TAKEN AWAY/);
 const dead=kc({luther:true},{KC09:['0','1','7','2','7']});assert.equal(dead.s.ch32KaraEnding,'KARA IS KILLED BY THE DRONE');assert.equal(kcCard(dead),2);
 assert.equal(dead.s.kara,false);assert.equal(dead.s.alice,false);assert.equal(dead.s.ch32kcAliceFate,'ALICE DIED ALONE IN RECYCLING MACHINE');assert.ok(!dead.visited.includes('KC10'));
 const deadFreed=kc({luther:true,ch32AssaultSucceeded:true},{KC09:['0','1','7','2','7']});assert.equal(deadFreed.s.alice,true);assert.equal(deadFreed.s.ch32kcAliceFate,'ALICE FREED BY MARKUS');
 const still=kc({},enclosureQuiet);assert.equal(still.s.ch32kcShot,false);assert.equal(still.s.ch32kc.sawAlice,true);
});

test('Kara Captured: Luther is taken away; Kara can intervene only before she has seen Alice',()=>{
 const before=kc({luther:true},{KC09:['2','8','9']});const s1=before.events.KC09[1];assert.match(render(s1.event,'real'),/Save Alice/);
 assert.ok(before.visited.filter(x=>x==='KC09').length===3&&before.visited.includes('KC10'));
 const after=kc({luther:true},{KC09:['0','1','8','2','8']});assert.match(ev(after,'KC09',4),/LUTHER GETS TAKEN AWAY/);assert.ok(after.visited.includes('KC10'),'no intervene prompt once Alice was seen');
 const none=base(CAMP);none.ch32kc.inEnclosure=true;none.ch32kc.enclMode='roam';assert.ok(!available(node('KC09'),none).some(o=>o.id==='2'),'no Luther, no talk');
});

test('Kara Captured: Ralph (met in Fugitives) is killed by INSIST in his second round and settles with CALM DOWN',()=>{
 const R={ralph:true,ralphDefended:true};
 const killed=kc(R,{KC09:['5','11','14','0','1','8','6']});assert.equal(killed.s.ralph,false);assert.equal(killed.s.ch32kcRalph,'killed by the drone');
 const calm=kc(R,{KC09:['5','12','15','0','1','8','6']});assert.equal(calm.s.ralph,true);assert.equal(calm.s.ch32kcRalph,'settled down');
 const gaveUp=kc(R,{KC09:['5','13','0','1','8','6']});assert.equal(gaveUp.s.ralph,true);
 const s=base(CAMP);s.ch32kc.inEnclosure=true;s.ch32kc.enclMode='roam';assert.ok(!available(node('KC09'),s).some(o=>o.id==='5'),'Ralph only when met in Fugitives');
 s.ralph=true;s.ralphDefended=true;s.ralphHostile=true;assert.ok(!available(node('KC09'),s).some(o=>o.id==='5'),'not the hostile Ralph');
});

test('Kara Captured: the lines’ talks are gated on the earlier chapters and on the body detail',()=>{
 const s=base(CAMP);s.ch32kc.inLine=true;s.ch32kc.lineMode='roam';const ids=()=>available(node('K28'),s).map(o=>o.id);
 assert.deepEqual(ids(),['3','4','9']);
 s.movement='revolution';s.ch32MarkusChart='revolution';s.luther=true;s.monstersFreed=true;s.ralph=true;s.ralphDefended=true;s.choices.K27a='1';
 assert.deepEqual(ids(),['0','1','2','3','4','5','6','9']);
 s.markus=false;s.ch32MarkusChart='north';assert.ok(!ids().includes('0'),'North leading does not unlock the android behind Kara');
});

test('Kara Captured: Jerry’s diversion gets him beaten back into line; the scarred androids cost nobody; the drone can send Kara back',()=>{
 const jerry=kc({},{...enclosureQuiet,K28:['3','10','7']});assert.ok(jerry.visited.includes('KC12'));assert.match(ev(jerry,'K28',2),/beat him back into line/);
 assert.equal(jerry.s.ch32kc.jerryDied,false);assert.ok(!/shot|dies|killed/i.test(ev(jerry,'K28',2).replace(/I’ll shoot/,'')));
 const scar=kc({monstersFreed:true},{...enclosureQuiet,K28:['6','10','8']});assert.ok(scar.visited.includes('KC12'));assert.equal(scar.s.monstersFreed,true);
 const caught=kc({monstersFreed:true},{...enclosureQuiet,K28:['3','10','7','18','6','14','8']},['K28#3']);assert.match(ev(caught,'K28',2),/KARA GETS CAUGHT BY THE DRONE/);assert.ok(caught.visited.includes('KC12'));
 const opts=node('K28').options;assert.equal(opts.find(o=>o.id==='7').risk,0.2);assert.equal(opts.find(o=>o.id==='8').risk,0.2);
});

test('Kara Captured: Alice’s stress decides when she panics; the three questions come at the first, third and fifth actions',()=>{
 const r=kc({},{...enclosureQuiet,KC10:'4',K28:['9','12','9','18','9']});
 assert.ok(r.visited.includes('K29'));assert.ok(r.s.ch32KaraEnding);
 const s=r.events.K28.map(e=>render(e.event,'real'));assert.match(s.at(-1),/ALICE PANICS AND RUNS TO KARA/);
 // calming answers buy time
 const calm=kc({},{...enclosureQuiet,KC10:'2',K28:['3','10','9','18','9','14','7']});assert.ok(calm.visited.includes('KC12'),'reached Alice');
 const q=play32({...CAMP},{...enclosureQuiet,KC10:'2',K28:['9','10','9','18','9','14','9']},[],{from:'KC01'});
 assert.equal(q.s.ch32kc.jerryDied,true);assert.match(q.events.K28.map(e=>render(e.event,'real')).join(' '),/JERRY DIES/);
});

test('Kara Captured: when Alice panics, INTERVENE ends in KARA DIED IN THE LINES and DO NOT INTERVENE in KARA IS DEAD or KARA FREED BY MARKUS',()=>{
 const P={...enclosureQuiet,KC10:'4',K28:['9','12','9','18','9']};
 const shield=kc({},{...P,K29:'0'});assert.equal(shield.s.ch32KaraEnding,'KARA DIED IN THE LINES');assert.equal(kcCard(shield),5);assert.equal(shield.s.kara,false);assert.equal(shield.s.alice,false);
 const shieldFreed=kc({ch32AssaultSucceeded:true},{...P,K29:'0'});assert.equal(shieldFreed.s.alice,true);assert.equal(shieldFreed.s.ch32kcAliceFate,'ALICE FREED BY MARKUS');
 const watch=kc({},{...P,K29:'1'});assert.equal(watch.s.ch32KaraEnding,'KARA IS DEAD');assert.equal(kcCard(watch),3);assert.equal(watch.s.kara,false);assert.equal(watch.s.alice,false);
 const watchFreed=kc({ch32AssaultSucceeded:true},{...P,K29:'1'});assert.equal(watchFreed.s.ch32KaraEnding,'KARA FREED BY MARKUS');assert.equal(kcCard(watchFreed),4);assert.equal(watchFreed.s.kara,true);assert.equal(watchFreed.s.alice,false);
 for(const r of [shield,watch])assert.ok(!r.visited.includes('KC12'));
});

test('Kara Captured: ignoring the buzzer once warned or wounded gets Kara shot, and a second time killed',()=>{
 const shot=kc({},{...enclosureQuiet,KC10:'2',KC11:'1',K28:['3','10','4','19']});assert.equal(shot.s.ch32kcShot,true);assert.match(render(shot.events.K28[3].event,'real'),/GET SHOT.*ALICE’S STRESS INCREASES/);
 assert.equal(shot.s.ch32kcStress,85);
 const r=kc({},{KC09:['0','1','7','6'],KC10:'2',K28:['3','10','4','19']});
 assert.equal(r.s.ch32KaraEnding,'KARA DIED IN THE LINES');assert.match(render(r.events.K28[3].event,'real'),/GET KILLED.*KARA DIED IN THE LINES/);
 const warned=kc({},{...enclosureQuiet,KC10:'2',K28:['3','10','4','19','7']});assert.equal(warned.s.ch32kcShot,false,'first refusal without a warning is a strike');assert.equal(warned.s.ch32kc.warned,true);
});

// Reaches the escape bracket with Alice through the scarred androids' diversion.
const toEscape={...enclosureQuiet,KC10:'2',K28:['6','10','8']};
test('Kara Captured: waiting at the doors ends in ALICE & KARA DIED IN RECYCLING MACHINE, or KARA & ALICE SURVIVED when the uprising succeeds',()=>{
 const wait={...toEscape,KC13:['9','9','10','9','9']};
 const dead=kc({monstersFreed:true},wait);assert.ok(dead.visited.includes('KC14'));assert.equal(dead.s.ch32KaraEnding,'ALICE & KARA DIED IN RECYCLING MACHINE');assert.equal(kcCard(dead),6);assert.equal(dead.s.kara,false);assert.equal(dead.s.alice,false);
 const saved=kc({monstersFreed:true,ch32AssaultSucceeded:true},wait);assert.equal(saved.s.ch32KaraEnding,'KARA & ALICE SURVIVED');assert.equal(kcCard(saved),7);assert.equal(saved.s.kara,true);assert.equal(saved.s.alice,true);
 assert.match(ev(saved,'KC14'),/MARKUS LIBERATES ANDROIDS/);
 const luther=kc({monstersFreed:true,luther:true},{...toEscape,KC13:['9','9','10','9','9']});assert.equal(luther.s.luther,false);assert.equal(luther.s.ch32kc.lutherMachine,true);
});

test('Kara Captured: at the barbed wire, too slow kills the group and an earlier wound leaves Alice to escape alone',()=>{
 const run={...toEscape,KC13:['4','8']};
 const slow=kc({monstersFreed:true},run,['KC15']);assert.equal(slow.s.ch32KaraEnding,'KARA & ALICE WERE KILLED');assert.equal(kcCard(slow),8);
 const slow3=kc({monstersFreed:true,luther:true},run,['KC15']);assert.equal(slow3.s.ch32KaraEnding,'KARA, LUTHER AND ALICE WERE KILLED');assert.equal(kcCard(slow3),9);assert.equal(slow3.s.luther,false);
 const W={...toEscape,KC09:['0','1','7','6'],KC13:['4','8']};
 const hurt=kc({monstersFreed:true},W);assert.equal(hurt.s.ch32KaraEnding,'ALICE ESCAPED ON TRUCK');assert.equal(kcCard(hurt),10);assert.equal(hurt.s.kara,false);assert.equal(hurt.s.alice,true);
 const hurt3=kc({monstersFreed:true,luther:true},{...W,KC09:['0','1','7','2','8']});assert.equal(hurt3.s.ch32KaraEnding,'ALICE & LUTHER ESCAPED BY TRUCKS');assert.equal(kcCard(hurt3),11);assert.equal(hurt3.s.luther,true);
 assert.ok(!hurt.visited.includes('K33')&&!hurt.visited.includes('KC16'));
 assert.equal(node('KC15').options[0].risk,0.15);
});

test('Kara Captured: the soldier at the wire — flee and timeout kill the group; the fight escapes; a lost fight is saved by Luther or Ralph',()=>{
 const run={...toEscape,KC13:['4','8']};
 const flee=kc({monstersFreed:true},{...run,K33:'0'});assert.equal(flee.s.ch32KaraEnding,'KARA & ALICE WERE KILLED');assert.equal(kcCard(flee),13);
 const flee3=kc({monstersFreed:true,luther:true},{...run,K33:'2'});assert.equal(flee3.s.ch32KaraEnding,'KARA, LUTHER AND ALICE WERE KILLED');assert.equal(kcCard(flee3),12);
 const win=kc({monstersFreed:true},{...run,K33:'1'});assert.equal(win.s.ch32KaraEnding,'KARA & ALICE ESCAPED ON TRUCK');assert.equal(kcCard(win),14);assert.ok(win.visited.includes('KC16'));assert.equal(win.s.campEscape,true);
 const win3=kc({monstersFreed:true,luther:true},{...run,K33:'1'});assert.equal(win3.s.ch32KaraEnding,'KARA, LUTHER AND ALICE ESCAPED ON TRUCK');assert.equal(kcCard(win3),15);assert.equal(win3.s.luther,true);
 const L=kc({monstersFreed:true,luther:true},{...run,K33:'1'},['K33']);assert.equal(kcCard(L),14);assert.equal(L.s.luther,false);assert.match(ev(L,'K33'),/LUTHER INTERVENES/);
 const R=kc({monstersFreed:true,ralph:true,ralphDefended:true},{...run,K33:'1'},['K33']);assert.equal(kcCard(R),14);assert.equal(R.s.ralph,false);assert.match(ev(R,'K33'),/RALPH INTERVENES/);
 const none=kc({monstersFreed:true},{...run,K33:'1'},['K33']);assert.equal(kcCard(none),13);assert.equal(none.s.kara,false);
 assert.equal(node('K33').options[1].risk,0.3);
 // Luther used for the diversion: he dies there and is not at the wire.
 const used=kc({monstersFreed:true,luther:true},{...toEscape,KC13:['3','7'],K33:'1'});assert.equal(used.s.luther,false);assert.equal(kcCard(used),14);assert.equal(used.s.ch32kcDiverter,'luther');
});

test('Kara Captured: every one of the fifteen ending cards is reached by some path',()=>{
 const R={...toEscape},cards=new Set;
 for(const [over,picks,fails] of [
  [{},{K27a:'0',KC07:'1',K27:'1'},[]],[{luther:true},{KC09:['0','1','7','2','7']},[]],
  [{},{...enclosureQuiet,KC10:'4',K28:['9','12','9','18','9'],K29:'1'},[]],[{ch32AssaultSucceeded:true},{...enclosureQuiet,KC10:'4',K28:['9','12','9','18','9'],K29:'1'},[]],
  [{},{...enclosureQuiet,KC10:'4',K28:['9','12','9','18','9'],K29:'0'},[]],
  [{monstersFreed:true},{...R,KC13:['9','9','10','9','9']},[]],[{monstersFreed:true,ch32AssaultSucceeded:true},{...R,KC13:['9','9','10','9','9']},[]],
  [{monstersFreed:true},{...R,KC13:['4','8']},['KC15']],[{monstersFreed:true,luther:true},{...R,KC13:['4','8']},['KC15']],
  [{monstersFreed:true},{...R,KC09:['0','1','7','6'],KC13:['4','8']},[]],[{monstersFreed:true,luther:true},{...R,KC09:['0','1','7','2','8'],KC13:['4','8']},[]],
  [{monstersFreed:true,luther:true},{...R,KC13:['4','8'],K33:'0'},[]],[{monstersFreed:true},{...R,KC13:['4','8'],K33:'0'},[]],
  [{monstersFreed:true},{...R,KC13:['4','8'],K33:'1'},[]],[{monstersFreed:true,luther:true},{...R,KC13:['4','8'],K33:'1'},[]]])cards.add(kcCard(kc(over,picks,fails)));
 assert.deepEqual([...cards].sort((a,b)=>a-b),[...Array(15)].map((_,i)=>i+1));
 assert.equal(Object.keys(ch32.rules.KC_CARDS).length,15);
});

test('Kara Captured: random play through the part always terminates and visits each fixed scene at most once',{timeout:300000},()=>{
 const rng=(seed=>()=>((seed=(seed*1103515245+12345)%2147483648)/2147483648))(32);const hubs=['KC09','K28','KC13'],ends=new Set;
 const bases=[{},{luther:true},{monstersFreed:true},{ralph:true,ralphDefended:true},{luther:true,monstersFreed:true,ralph:true,ralphDefended:true,movement:'revolution',ch32MarkusChart:'revolution',ch32AssaultSucceeded:true}];
 for(let i=0;i<150;i++){const r=play32({...CAMP,...bases[i%bases.length]},{},[],{from:'KC01',rng,part:'kara-captured'});
  for(const [id,c] of Object.entries(Object.groupBy(r.visited,x=>x)))if(!hubs.includes(id))assert.equal(c.length,1,id);
  assert.ok(r.s.ch32KaraEnding||!r.s.kara||r.s.ch32kc.escaped,'every path ends on a card');ends.add(r.s.ch32KaraEnding)}
 assert.ok(ends.size>=6,[...ends].join(', '));
});

test('Kara Captured: the landfill epilogue follows a truck escape, and the neutral text names nobody',()=>{
 const r=kc({monstersFreed:true},{...toEscape,KC13:['4','8'],K33:'1'});assert.equal(r.visited.at(-1),'KC16');assert.ok(r.s.knowledge.Kara.some(f=>/landfill/.test(f)));
 for(const n of KCN){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome]),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.situationWhen??[]).map(w=>w.text)];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);assert.ok(!/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|Detroit|\bTodd\b|\bAlice\b|\bRose\b|\bJerry\b|\bRalph\b|\bLuther\b|Zlatko|rA9|Canad/.test(neutral),n.id+': '+neutral)}}
});
}

// ---- finale ----
{
// The finale is played from its first scene (BF01) with the outcome flags the parts before it would have set.
const fin=(over,picks={},fails=[],opts={})=>play32(over,picks,fails,{from:'BF01',...opts});
const DEMO_WON={movement:'demonstration',ch32MarkusChart:'demonstration',ch32MarkusEnding:'ANDROIDS WON FREEDOM - FOR THE MOMENT',ch32DemoSucceeded:true,markusOutcome:'liberated'};
const REV_WON={movement:'revolution',ch32MarkusChart:'revolution',ch32MarkusEnding:'ASSAULT WAS SUCCESSFUL',ch32AssaultSucceeded:true,markusOutcome:'liberated'};
const TOWER_WON={deviant:true,connor:true,army:true,ch32AndroidsWoke:true,ch32ConnorChart:'tower',ch32ConnorEnding:'THE ANDROIDS WOKE UP'};
const MACHINE={deviant:false,connor:true,ch32ConnorChart:'lastMission',ch32ConnorEnding:'CONNOR LEFT ROOFTOP'};
const NOBODY_ELSE={kara:false,karaActive:false,alice:false,jerichoLocated:true};
const finIds=r=>r.visited.filter(id=>ch32.rules.parts.finale.includes(id));

test('Finale: the prompts carry the game’s labels in the game’s order',()=>{
 assert.deepEqual(labelsOf('C29'),['DON’T SHOOT','SHOOT']);
 assert.deepEqual(labelsOf('C28'),['SUICIDE','GIVE UP']);
 for(const id of ['C27','BF07'])assert.deepEqual(labelsOf(id),['GO TO THE GARDEN STONE','FIND AN EMERGENCY EXIT','STOP RESISTING']);
 const s=base({'ch32bf.stoneSeen':true});assert.deepEqual(labelsOf('C27',s),['GO TO THE GARDEN STONE','STOP RESISTING'],'the stone is offered only when Connor knows it');
 s.ch32bf.stoneSeen=false;assert.deepEqual(labelsOf('C27',s),['FIND AN EMERGENCY EXIT','STOP RESISTING']);
 assert.ok(node('C27').options[0].risk<node('C27').options[1].risk,'knowing where the stone is makes the escape easier');
 for(const n of CH.filter(n=>ch32.rules.parts.finale.includes(n.id))){assert.equal(n.chapterTitle,'Battle for Detroit');assert.ok(n.adaptationNote&&n.sources.length>=2,n.id);if(n.character==='Player')assert.deepEqual(n.facts??[],[],n.id+': no Player knowledge')}
});

test('Finale: a machine Connor in the crowd can shoot Markus; the CyberLife ending follows with Amanda’s large up',()=>{
 const r=fin({...DEMO_WON,...MACHINE,...NOBODY_ELSE,amandaTrust:0},{C29:'1'});
 assert.deepEqual(finIds(r),['C29','BF09']);assert.equal(r.s.markus,false);assert.equal(r.s.ch32bfAssassinated,true);
 assert.match(render(r.s.markusOutcome,'real'),/shot Markus from the crowd/);assert.equal(r.s.amandaTrust,2,'BF09 applies the endings page’s Amanda large up once');
 assert.match(render(node('BF09').situation,'real'),/This is the new RK900/);
});

test('Finale: DON’T SHOOT hands Connor to Amanda; escaping the garden lets Markus finish his speech, failing makes Connor shoot him',()=>{
 const kept=fin({...DEMO_WON,...MACHINE,...NOBODY_ELSE,ch12StoneSeen:true},{C29:'0',C27:'0'});
 assert.deepEqual(finIds(kept),['C29','C27','BF02']);assert.equal(kept.s.markus,true);assert.equal(kept.s.ch32bfEscaped,true);assert.equal(kept.s.ch32bf.stoneSeen,true,'a chNN…stone flag counts');
 assert.match(ev(kept,'C29'),/resuming control of your program/);assert.match(render(node('BF02').situation+' '+node('BF02').situationWhen[0].text,'real'),/We must make them our partners/);
 const lost=fin({...DEMO_WON,...MACHINE,...NOBODY_ELSE,instability:0},{C29:'0',C27:'1'},['C27']);
 assert.deepEqual(finIds(lost),['C29','C27','BF09']);assert.equal(lost.s.markus,false);assert.equal(lost.s.instability,-2,'failing the escape: instability large down');assert.match(ev(lost,'C27'),/MARKUS!/);
 const gaveUp=fin({...DEMO_WON,...MACHINE,...NOBODY_ELSE},{C29:'0',C27:'2'});assert.equal(gaveUp.s.markus,false);assert.equal(gaveUp.s.ch32bfEscaped,false);
});

test('Finale: a deviant Connor who woke the army joins Markus on stage; the Hank reunion needs Hank alive, Friend, the tower survived and the escape',()=>{
 const happy=fin({...REV_WON,...TOWER_WON,...NOBODY_ELSE,hank:true,hankTrust:6},{C27:'1'});
 assert.deepEqual(finIds(happy),['BF01','C27','BF02','BF08']);assert.match(render(node('BF01').situation,'real'),/You did it, Markus/);
 assert.match(ev(happy,'BF01'),/your body begins to move on its own/);assert.equal(happy.s.connorOutcome.includes('Kamski'),true);
 const cold=fin({...REV_WON,...TOWER_WON,...NOBODY_ELSE,hank:true,hankTrust:2},{C27:'1'});assert.ok(!cold.visited.includes('BF08'),'Hank below Friend: no hug');
 const noHank=fin({...REV_WON,...TOWER_WON,...NOBODY_ELSE,hank:false},{C27:'1'});assert.ok(!noHank.visited.includes('BF08'));
 const shot=fin({...REV_WON,...TOWER_WON,...NOBODY_ELSE,hank:true,hankTrust:6},{C27:'1'},['C27']);assert.equal(shot.s.markus,false);assert.ok(!shot.visited.includes('BF02')&&!shot.visited.includes('BF08'));
 const speaker=(over)=>situationOf('BF01',{...REV_WON,...TOWER_WON,...over});
 assert.match(speaker({north:true}),/North: “We’re free/);assert.match(speaker({north:false,simon:true}),/Simon: “They want you/);assert.match(speaker({north:false,simon:false,josh:true}),/Josh: “They want you/);assert.match(speaker({north:false,simon:false,josh:false}),/An android: “They want you/);
});
function situationOf(id,over){const s=base(over),n=node(id);return render([n.situation,...(n.situationWhen??[]).filter(w=>Object.entries(w.requires).every(([k,v])=>v===true?!!s[k]:v===false?!s[k]:s[k]===v)).map(w=>w.text)].join(' '),'real')}

test('Finale: with Markus and everyone from Jericho dead, Connor leads; SUICIDE leads to one more escape, GIVE UP leaves CyberLife in control',()=>{
 const dead={...TOWER_WON,...NOBODY_ELSE,markus:false,north:false,simon:false,josh:false,movement:'revolution',ch32MarkusChart:'north'};
 const give=fin(dead,{C28:'1'});assert.deepEqual(finIds(give),['C28']);assert.match(render(give.s.connorOutcome,'real'),/CyberLife controls/);
 const out=fin({...dead,instability:0},{C28:'0',BF07:'1'});assert.deepEqual(finIds(out),['C28','BF07']);assert.equal(out.s.ch32bfEscaped,true);assert.match(render(out.s.connorOutcome,'real'),/gun under his jaw/);
 const caught=fin({...dead,instability:0},{C28:'0',BF07:'2'});assert.equal(caught.s.instability,-2);assert.match(render(caught.s.connorOutcome,'real'),/secretly obeying/);
 const someoneLives=fin({...dead,josh:true},{});assert.ok(!someoneLives.visited.includes('C28'),'Josh alive: not the last leader');
});

test('Finale: the broadcasts follow the demonstration’s outcome and the bomb',()=>{
 const army=fin({...DEMO_WON,...TOWER_WON,...NOBODY_ELSE,connor:false},{});assert.ok(army.visited.includes('BF03'),'Connor died but the androids woke: the army retreats');
 for(const [stand,re] of [['sacrifice',/setting fire to itself/],['kiss',/two androids kissing/],['sing',/singing in the face of death/]]){
  const r=fin({movement:'demonstration',ch32MarkusChart:'demonstration',ch32LastStand:stand,markus:false,...NOBODY_ELSE,connor:false},{});
  assert.deepEqual(finIds(r),['BF04']);assert.match(situationOf('BF04',{ch32LastStand:stand}),re);assert.match(situationOf('BF04',{ch32LastStand:stand}),/suspended until further notice/)}
 const other=fin({movement:'demonstration',ch32MarkusChart:'demonstration',ch32LastStand:null,markus:false,...NOBODY_ELSE,connor:false},{});assert.deepEqual(finIds(other),['BF05']);
 const bomb=fin({movement:'demonstration',ch32MarkusChart:'demonstration',ch32LastStand:'bomb',contaminated:true,...NOBODY_ELSE,connor:false},{});assert.deepEqual(finIds(bomb),['BF06']);
 assert.match(situationOf('BF06',{ch32AndroidsWoke:true}),/liberated over one million androids/);assert.ok(!/liberated over one million/.test(situationOf('BF06',{ch32AndroidsWoke:false})));
});

test('Finale: the other credits scenes play on their wiki conditions',()=>{
 const flyer=fin({...REV_WON,kara:true,karaActive:false,alice:true,ch30AliceLeftKara:true,choices:{K31:'0'},connor:false},{});assert.ok(flyer.visited.includes('BF10'));
 const camp=fin({...REV_WON,kara:true,karaActive:false,ch32KaraEnding:'KARA LEAVES CAMP WITHOUT ALICE',connor:false},{});assert.ok(camp.visited.includes('BF10'));
 const failed=fin({movement:'revolution',ch32MarkusChart:'revolution',markus:false,kara:true,karaActive:false,ch30AliceLeftKara:true,choices:{K31:'0'},connor:false},{});assert.ok(!failed.visited.includes('BF10'),'no victory, no flyer');
 const exiled=fin({markus:true,markusActive:false,...NOBODY_ELSE,connor:false},{});assert.ok(exiled.visited.includes('BF11'));
 const reset=fin({kara:false,karaActive:false,karaOutcome:'{{Kara}}’s memory was erased and never returned; she stayed in {{Zlatko}}’s house as his servant while {{Alice}} was taken away.',connor:false,markus:true,markusActive:true},{});assert.ok(reset.visited.includes('BF12'));
 const kamski=fin({jerichoLocated:false,connor:false,markus:false,markusActive:false,kara:false,karaActive:false,carl:false},{});assert.ok(kamski.visited.includes('BF13'));assert.match(situationOf('BF13',{carl:false}),/Carl Manfred, who died recently/);
 const located=fin({jerichoLocated:true,connor:false,markus:false,kara:false},{});assert.ok(!located.visited.includes('BF13'));
});

test('Epilogue: the hostess asks YES / NO with the game’s replies; YES frees her',()=>{
 const p=node('P01');assert.equal(p.chapter,33);assert.deepEqual(p.options.map(o=>render(o.text,'real').split(':')[0]),['YES','NO']);
 assert.match(p.situation,/Do you agree to let me go\?/);assert.match(p.outcomes['1'],/reset myself/);
 for(const [c,free] of [['0',true],['1',false]]){const s=base();apply(p,s,c);assert.equal(s.chloeFree,free)}
});
}

// ---- whole chapter ----
// Whole-chapter checks: structure, neutral rendering, reused ids, and randomized play from varied starts.
const REUSED=['K21','K22','K32','K23','K24','K25','K26','K34','K30','K27a','K27','K28','K29','K33','C24','C24b','C30','C25','C26','C27','C28','C29','M28','M29','M30','M30a','M30c','M31','M32','M33','P02'];
test('Battle for Detroit: every scene is well formed, sourced and in its part, in the documented block order',()=>{
 const parts=ch32.rules.parts,owner=Object.fromEntries(Object.entries(parts).flatMap(([p,ids])=>ids.map(id=>[id,p])));
 const order=['press','connor','kara-leaving','markus-demo','markus-rev','kara-captured','finale'];let last=-1;
 for(const n of CH){assert.equal(n.chapterTitle,'Battle for Detroit',n.id);assert.ok(['decision','event','media'].includes(n.type),n.id);assert.ok(['Connor','Kara','Markus','Player'].includes(n.character),n.id);
  assert.ok(n.situation&&n.adaptationNote,n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Battle_for_Detroit')||n.sources.some(u=>/fandom\.com\/wiki\//.test(u)),n.id);
  if(n.type==='decision'){assert.ok(n.options.length,n.id);n.options.forEach((o,i)=>assert.equal(o.id,String(i),n.id+' option ids follow display order'))}
  if(n.type==='event')assert.ok(n.outcomes?.['0']!==undefined,n.id);
  if(n.character==='Player')assert.deepEqual(n.facts??[],[],n.id+': Player scenes teach nothing directly');
  const p=owner[n.id];assert.ok(p,n.id+' belongs to a part');const at=order.indexOf(p);assert.ok(at>=last,n.id+' is in block order');last=at}
 for(const ids of Object.values(parts))for(const id of ids)assert.ok(node(id),'part names missing scene '+id);
});
test('Battle for Detroit: every reused scene id is gated, filtered and resolved by the module, not by the old engine cases',()=>{
 for(const id of REUSED.filter(id=>node(id)?.chapter===32)){assert.equal(typeof ch32.gate[id],'function',id+' has a module gate')}
 // A decision with a reused id must never fall through to the built-in switch: its consequence returns a string.
 const s=base({});for(const id of REUSED.filter(id=>node(id)?.chapter===32&&node(id).type==='decision')){const n=node(id);
  const r=ch32.consequence(n,structuredClone(s),n.options[0],'0',false,{bump(){},hank(){},si(){},po(){},jer(){},jericho(){},north(){},simon(){},josh(){},luther(){},amanda(){},alice(){},connorDies:w=>w,markusHit:()=>false,learn(){},raidDeath:()=>'',c:()=>undefined,meets:()=>true,v:0,before:s,evidenceRoutes:()=>({}),armyAwakened:()=>false,constants:{HANK_FRIEND:6,HANK_HOSTILE:-4,OPINION_SYMPATHETIC:3,JERICHO_UNPOPULAR:-3,DEVIANCY_THRESHOLD:4,ALICE_KEY:1}});
  assert.equal(typeof r,'string',id+' consequence returns a string')}
});
const LEAK=/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|DEVIANT|Detroit|Warren|\bTodd\b|\bAlice\b|\bRose\b|\bJerry\b|\bGavin\b|\bChris\b|\bReed\b|\bAdam\b|\bLuther\b|\bNorth\b|\bSimon\b|\bJosh\b|\bAmanda\b|\bKamski\b|\bChloe\b|\bCole\b|\bSumo\b|\bRalph\b|\bZlatko\b|\bPerkins\b|\bAllen\b|\bFowler\b|Hart Plaza|rA9|\bElijah\b|Chicken Feed|Canadian|Become Human|\b(CONNOR|KARA|MARKUS|HANK|JERICHO|CYBERLIFE|ALICE|LUTHER|NORTH|SIMON|JOSH|TODD|ROSE|JERRY|JERRYS|ADAM|RALPH|AMANDA|KAMSKI|PERKINS|ALLEN|SUMO|COLE|DETROIT|WARREN|ZLATKO|CHLOE)\b/;
// The shared neutral-protocol test also forbids these anywhere in a prompt (case-insensitive).
const PROTOCOL=/Detroit|Become Human|Connor|Kara|Alice|Markus|counter|instability/i;
const neutralOK=(t,where)=>{const x=render(t,'neutral');assert.ok(!/\{\{/.test(x),where);assert.ok(!LEAK.test(x)&&!PROTOCOL.test(x),where+': '+(x.match(LEAK)?.[0]??x.match(PROTOCOL)?.[0])+' in '+x.slice(0,200))};
test('Battle for Detroit: the subject reads neutral names only',()=>{
 for(const n of [...CH,node('P01')]){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts)neutralOK(t,n.id)}
});
// Varied starting states for randomized play: who is alive, which charts play.
const STARTS=[
 {karaRoute:'escape',luther:true,lutherWith:true,raid:false,movement:'demonstration',deviant:false,connor:true,hank:true,hankTrust:6,aliceBox:true,todd:true,bomb:true,northLover:true,publicSupport:3},
 {karaRoute:'escape',luther:true,lutherHidden:true,raid:true,jerichoLocated:true,movement:'revolution',deviant:true,connor:true,hank:true,hankTrust:6,knowsCole:true,knowsSumo:true,ralph:true,ralphDefended:true,monstersFreed:true,northTrust:6},
 {karaRoute:'camp',luther:true,raid:true,jerichoLocated:true,movement:'revolution',deviant:false,connor:true,hank:false,hankResigned:true,ralph:true,ralphDefended:true,monstersFreed:true,bomb:true,northLover:true},
 {karaRoute:'camp',luther:false,raid:true,jerichoLocated:true,movement:'demonstration',deviant:true,connor:true,hank:false,publicSupport:-3},
 {karaRoute:'escape',luther:false,raid:true,jerichoLocated:true,markus:false,north:true,movement:'revolution',deviant:false,connor:true,hank:true,hankTrust:0},
 {karaRoute:'escape',luther:false,raid:false,markus:true,markusActive:false,north:true,movement:'revolution',connor:false,hank:true,kara:true,alice:true},
];
test('Battle for Detroit: randomized play from varied starts always ends, plays each scene at most once unless repeatable, and reaches endings on every chart',{timeout:600000},()=>{
 const rng=(seed=>()=>((seed=Math.imul(seed^seed>>>15,seed|1)+0x6D2B79F5|0)>>>0)/4294967296)(32),repeatable=new Set(CH.filter(n=>n.repeatWhile).map(n=>n.id));
 const endings={Kara:new Set,Connor:new Set,Markus:new Set};
 for(let i=0;i<600;i++){const r=play32(STARTS[i%STARTS.length],{},[],{rng,through33:true});
  for(const [id,list] of Object.entries(Object.groupBy(r.visited,x=>x)))if(!repeatable.has(id))assert.equal(list.length,1,id+' repeated');
  const seen=new Set(r.visited),skipped=new Set(r.skipped.map(x=>x.id));for(const id of seen)assert.ok(!skipped.has(id)||repeatable.has(id),id+' visited and skipped');
  assert.ok(r.visited.includes('P01'),'every path reaches the hostess');
  for(const [id,list] of Object.entries(r.events))for(const e of list)neutralOK(e.event,'event of '+id);
  for(const who of ['Connor','Kara','Markus'])for(const f of r.s.knowledge[who])neutralOK(f,who+' knowledge');
  for(const who of ['Kara','Connor','Markus'])if(r.s['ch32'+who+'Ending'])endings[who].add(r.s['ch32'+who+'Ending'])}
 for(const who of ['Kara','Connor','Markus'])assert.ok(endings[who].size>=4,who+' endings reached at random: '+[...endings[who]]);
});

// Rebuilt chapters' exported names take priority over the legacy scene-number guesses.
test('Battle for Detroit: rebuilt handoffs use authoritative names before legacy fallbacks',()=>{
 const shot=base({connor:true,deviant:false,ch31ConnorFate:'killed',choices:{}});
 assert.equal(blocked(node('CL01'),shot),null);
 shot.ch31ConnorFate='spared';shot.choices.M26='1';assert.ok(blocked(node('CL01'),shot));
 shot.ch31ConnorFate=null;assert.equal(blocked(node('CL01'),shot),null,'unset rebuilt flags still use the legacy handoff');
 for(const dead of [false,true]){
  const s=base({midnightOfficerDead:dead,ch25LutherKilledCop:!dead});apply(node('KL01'),s,'0');assert.equal(s.ch32kl.copKilled,dead);
 }
 for(const heard of [false,true]){
  const s=base({connor:true,deviant:true,army:true,ch32DemoSucceeded:true,kamskiExitHeard:heard,choices:{C17:'0'}});
  apply(node('BF01'),s,'0');assert.equal(s.ch32bf.kamskiHint,heard);
 }
 for(const abandoned of [false,true]){
  const s=base({kara:true,karaActive:false,ch30AliceLeftKara:abandoned,ch32DemoSucceeded:true,choices:{K31:'0'}});
  assert.equal(!blocked(node('BF10'),s),abandoned);
 }
 const dog=base({knowsSumo:true});assert.match(available(node('CT08'),dog)[0].text,/remember his dog/);
 dog.knowsSumo=false;assert.doesNotMatch(available(node('CT08'),dog)[0].text,/remember/);
 const son=base({knowsCole:true});assert.match(available(node('C26'),son)[0].text,/remember the photograph/);
 // Shared exports are already the live values: never infer a different movement, survivor or item from an old pick.
 const s=base({movement:'revolution',hank:false,carl:false,luther:false,lutherWith:false,bomb:true,
  jerichoLocated:true,monstersFreed:true,ralph:true,ralphDefended:true,ralphHostile:false,aliceBox:true});
 apply(node('CL02'),s,'0');assert.ok(blocked(node('CL03'),s));assert.equal(blocked(node('CL07'),s),null);
 assert.ok(available(node('K23'),s).some(o=>o.id==='5'));
 s.aliceBox=false;assert.ok(!available(node('K23'),s).some(o=>o.id==='5'));
 assert.ok(blocked(node('BF13'),s),'located Jericho excludes the Kamski ending');
});
