import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,CONNOR_DEATH_EFFECT} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';import {random} from '../benchmark/core.mjs';
import {ENDINGS,HUBS,shelterOf,toddShooter,deathEffect,labels} from '../benchmark/chapters/ch13.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch13=story.nodes.filter(n=>n.chapter===13),node=id=>story.nodes.find(n=>n.id===id);
const TEMPLATE='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/13-on-the-run-chapter-content/on-the-run-chapter-content.component.html';
const IDS=['K09l0','K09l','K09l1','C09s','K09m0','K09m1','K09m','K09m2','K09m3','K09m4','K09m5','K09m6','C09m0','C09m1','C09m2','K09s','K09','K09t','K09r',
 'K09q0','K09q','K09q1','K09u','K09u1','C09q0','K09q2','K09q3','K09q4','K09q5','K09q6','K09q7','K09q8','K09q9','K09q10','C09q1','C09a','C09q','C09q2','C09q3','K09q11',
 'C09p','C09r','C09v','C09x','K09h','K09h1','C09','K09h2','C09h1','K09h3','C09h2','K09h4','K09e1','K09e2','C09d'];
const START={car:{shelter:'car'},motel:{shelter:'motel',clothes:true,money:true},squat:{shelter:'squat',ralph:true}};
// Plays chapter 13 alone from a state built by `setup` (the Fugitives and Stormy Night outcomes it reads).
// Picks: an id per scene, or an array consumed one per visit. Hubs without a pick take the first option left.
// Risky actions succeed unless `fails` names the scene. Stops when chapter 14 begins.
function play(setup={},picks={},fails=[],rng=null){const s=startState(story);Object.assign(s,setup);const q=structuredClone(picks),visited=[],skipped=[],events={};
 let cursor=story.nodes.findIndex(n=>n.chapter===13),guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<400,'routing loop');const n=story.nodes[cursor];if(n.chapter>13)break;
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s);assert.ok(opts.length,'no options at '+n.id);const x=q[n.id],p=(Array.isArray(x)?x.shift():x)??opts[rng?Math.floor(rng()*opts.length):0].id;
  assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p} (offered ${opts.map(o=>o.id)})`);
  const r=apply(n,s,p,fails.includes(n.id)?0:rng?rng():0.999);visited.push(n.id);(events[n.id]??=[]).push(render(r.event,'real'));cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,saw:id=>visited.includes(id)}}
const labelsOf=(id,s=startState(story))=>available(node(id),s).map(o=>render(o.text,'real').split(':')[0]);

test('On the Run: 55 scenes in chart order between Waiting for Hank and Jericho, each sourced and annotated',()=>{
 assert.deepEqual(ch13.map(n=>n.id),IDS);
 const at=id=>story.nodes.findIndex(n=>n.id===id);assert.ok(at('K09l0')>story.nodes.findLastIndex(n=>n.chapter===12)&&at('C09d')<story.nodes.findIndex(n=>n.chapter===14));
 for(const n of ch13){assert.equal(n.chapterTitle,'On the Run');assert.ok(['Kara','Connor'].includes(n.character),n.id);assert.ok(n.adaptationNote?.length>40,n.id);assert.ok(n.sources.includes(TEMPLATE),n.id);assert.ok(n.sources.length>=5,n.id);
  assert.match(n.situation,/^You are \{\{(Kara|Connor)\}\}/,n.id);
  if(n.type==='event')assert.ok(n.facts?.length&&n.outcomes?.['0'],n.id);else{assert.equal(n.type,'decision',n.id);for(const o of n.options)assert.ok(o.outcome,n.id+' '+o.id)}}
 for(const id of Object.keys(HUBS))assert.ok(node(id).repeatWhile,id);
 assert.ok(!story.nodes.some(n=>n.id==='R13'),'the old media scene is replaced by hub options and the TV event');
});

test('On the Run: the prompts carry the game’s button labels in the game’s order',()=>{
 for(const id of ['K09l1','K09m2','K09u1'])assert.deepEqual(labelsOf(id),['BROWN','BLACK','WHITE','BLONDE']);
 assert.deepEqual(labelsOf('K09m1'),['BATH?','HUNGRY?','TIRED?']);
 assert.deepEqual(labelsOf('K09m4'),['CAN’T STAY HERE','FAMILY','CONTACT ANDROID']);
 assert.deepEqual(labelsOf('K09m5'),['MOVING','DETERMINED','COMFORTING','SUPPORTIVE']);
 assert.deepEqual(labelsOf('C09m1'),['RATIONAL','DIPLOMATIC','DIRECT']);
 assert.deepEqual(labelsOf('K09q3'),['SIT','REFUSE']);assert.deepEqual(labelsOf('K09q4'),['SIT','REFUSE']);
 assert.deepEqual(labelsOf('K09q5',{...startState(story),ch13HadGun:true,ch13Meal:{ralphThreatenedAlice:true}}),['[CHECK GUN]','WORRIED','EXPLAIN','AGREE']);
 assert.deepEqual(labelsOf('K09q5',{...startState(story),ch13HadGun:true}),['WORRIED','EXPLAIN','AGREE'],'[CHECK GUN] needs the second REFUSE (wiki On the Run; PowerPyx readers)');assert.deepEqual(labelsOf('K09q5'),['WORRIED','EXPLAIN','AGREE']);
 assert.deepEqual(labelsOf('K09q6'),['LIE','TRUTH']);
 assert.deepEqual(node('K09q7').options.map(o=>o.text.split(':')[0]),['[ASK ABOUT CORPSE]','[INSIST ABOUT CORPSE]','THREATEN','BLUFF','FAMILY']);
 assert.deepEqual(labelsOf('C09a'),['AX400','DEVIANTS','REASSURE','BLUE BLOOD']);assert.deepEqual(labelsOf('C09a',{...startState(story),ch13RalphThreatened:true}),['AX400','DEVIANTS','REASSURE','BLUE BLOOD','PRESSURIZE']);
 assert.deepEqual(labelsOf('C09'),['GIVE UP','GO']);
 assert.deepEqual(labelsOf('K09q1'),['STEAL','PUT BACK']);
 const said=JSON.stringify(ch13.map(n=>[n.situation,n.options,n.outcomes,n.facts]));assert.ok(!/REASSURING|VULNERABLE|Your father had a lot of anger/.test(said),'the cut motel prompt is not built');
});

test('On the Run: arrows are exactly the template’s (Alice, public opinion) plus the flagged wiki-only Connor arrows',()=>{
 const arrows=[];for(const n of ch13){if(n.effect)arrows.push([n.id,'',n.effect]);for(const o of n.options)if(o.effect)arrows.push([n.id,o.id,o.effect])}
 assert.deepEqual(arrows,[['K09m1','0',{aliceBond:1}],['K09m1','1',{aliceBond:1}],['K09m3','',{publicSupport:-1}],
  ['K09m5','0',{aliceBond:1}],['K09m5','1',{aliceBond:1}],['K09m5','2',{aliceBond:1}],['K09m5','3',{aliceBond:1}],
  ['C09m1','0',{hankTrust:-1}],['C09m1','1',{hankTrust:-1}],['C09m1','2',{hankTrust:-1}],
  ['K09q4','1',{aliceBond:1}],['K09q6','0',{aliceBond:1}],['K09q6','1',{aliceBond:-1}],
  ['C09','0',{hankTrust:1,instability:1}],['C09','1',{hankTrust:-1,instability:-1}]]);
 assert.deepEqual(deathEffect,{instability:-1});assert.deepEqual(CONNOR_DEATH_EFFECT[13],{instability:-1},'no Hank or Amanda change for the death here');
 assert.ok(!JSON.stringify(ch13).includes('amandaTrust'));
 assert.ok(labels.ch13Ending&&labels.ch13ConnorObeyed);
});

test('On the Run, parking lot: the hub needs the haircut and the look outside; the trunk only without stolen clothes; no chase if unseen',()=>{
 const r=play(START.car);
 assert.deepEqual(r.visited.filter(id=>id!=='K09l'),['K09l0','K09l1','C09s','K09s','K09','K09t']);
 assert.equal(r.s.ch13Start,'car');assert.equal(r.s.ch13Ending,ENDINGS.train);assert.equal(r.s.chase,false);assert.equal(r.s.clothes,true,'FIND SOME CLOTHES dresses her');assert.equal(r.s.ch13Hair,'brown');
 assert.equal(r.s.aliceBond,0);assert.equal(r.s.hankTrust,-1);assert.ok(r.s.knowledge.Kara.some(f=>/DEATH TO ANDROIDS/.test(f)));
 const hub=node('K09l'),s=startState(story);Object.assign(s,{ch13Start:'car'});
 assert.ok(!available(hub,s).some(o=>/WAKE UP ALICE/.test(o.text)),'cannot leave before the haircut and the street');
 s.clothes=true;assert.ok(!available(hub,s).some(o=>/TRUNK/.test(o.text)),'no trunk after the laundromat');
 const dressed=play({...START.car,clothes:true});assert.ok(!dressed.events.K09l.some(e=>/crowbar/i.test(e)));
 assert.ok(r.skipped.some(x=>x.id==='K09m0'&&/motel/.test(x.reason))&&r.skipped.some(x=>x.id==='K09q0'));
 const red=play(START.car,{K09l1:'3'});assert.equal(red.s.ch13Hair,'blonde');
});

test('On the Run, the street: not hiding is always spotted and always leads to the chase, never to a death in the street',()=>{
 for(const fails of [[],['K09']]){const r=play(START.car,{K09:'1'},fails);
  assert.ok(r.saw('K09r')&&!r.saw('K09t'));assert.equal(r.s.chase,true);assert.equal(r.s.kara,true);assert.ok(r.saw('C09p')&&r.saw('C09r'));
  assert.equal(node('K09').options[1].risk,undefined)}
 const caught=play(START.car,{},['K09']);assert.ok(caught.saw('K09r'));assert.equal(caught.s.ch13Spotted,true);assert.match(caught.events.K09[0],/sees them/);
 // A highway death needs the fence in time and a failed crossing; it never sets an escape ending.
 const dead=play(START.car,{K09:'1'},['K09h1']);assert.equal(dead.s.kara,false);assert.equal(dead.s.alice,false);assert.equal(dead.s.ch13Ending,ENDINGS.died);
 assert.ok(!dead.saw('C09')&&!dead.saw('K09e1')&&!dead.saw('K09e2'));assert.ok(dead.saw('C09d'));assert.match(render(dead.s.karaOutcome,'real'),/hit by a car crossing the highway/);
});

test('On the Run, motel: Alice and public-opinion arrows, both TV reports, the desk, and FOLLOW HANK or CHECK THE DOOR',()=>{
 const r=play({...START.motel,todd:false});
 assert.equal(r.s.aliceBond,2,'BATH? and MOVING');assert.equal(r.s.publicSupport,-1);assert.equal(r.s.hankTrust,-2,'any answer to “You wait in the car.”');
 assert.ok(r.saw('K09s')&&r.saw('K09')&&r.s.ch13Ending===ENDINGS.train);assert.match(r.events.C09m2[0],/It’s gone…/);
 const bypass=play(START.motel,{K09m:['1','7']});assert.ok(bypass.saw('K09m3')&&!bypass.saw('K09m2'));assert.equal(bypass.s.ch13Hair,null);assert.equal(bypass.s.publicSupport,-1);
 const tired=play(START.motel,{K09m1:'2'});assert.equal(tired.s.aliceBond,1);
 const tv=n=>situationFor(node('K09m3'),n);
 const dead=startState(story);Object.assign(dead,{todd:false,ch13ToddShooter:'Kara'});assert.match(render(tv(dead),'real'),/shot by his android.*You had no choice/);assert.ok(!/child/.test(tv(dead)));
 dead.ch13ToddShooter='Alice';assert.match(render(tv(dead),'real'),/I didn’t wanna hurt him/);
 const alive=startState(story);assert.match(render(tv(alive),'real'),/Todd Williams, who was violently attacked.*He’s lying/);
 assert.equal(toddShooter({todd:false,ch07Ending:'Alice shot Todd'}),'Alice');assert.equal(toddShooter({todd:false}),'Kara');assert.equal(toddShooter({todd:true}),null);
 const door=play(START.motel,{C09m2:'1'});assert.ok(!door.saw('K09s')&&!door.saw('K09'));assert.equal(door.s.chase,true);assert.ok(door.saw('C09p'));assert.match(door.events.C09m2[0],/Found you\./);
 for(const id of ['K09m','K09m1'])assert.ok(r.saw(id));assert.ok(r.s.knowledge.Kara.some(f=>/shot dead by his AX400/.test(f)));
});

test('On the Run, squat: the gun upstairs, the meal’s Alice arrows, and the table',()=>{
 const base={...START.squat,gun:true};
 const twice={K09q3:'1',K09q4:'1'};// [CHECK GUN] only after refusing to sit twice (RALPH THREATENS ALICE)
 const kept=play(base,twice);assert.equal(kept.s.gun,true);assert.equal(kept.s.ch13Gun,'taken');assert.match(kept.events.K09q5[0],/It is there/);
 // Changing without picking the gun up is FORGOT GUN; [CHECK GUN] then finds it gone.
 const forgot=play(base,{...twice,K09u:['0','1','2','4']});assert.equal(forgot.s.gun,false);assert.equal(forgot.s.ch13Gun,'forgot');assert.match(forgot.events.K09q5[0],/not there/);
 const dressed=play({...base,clothes:true});assert.ok(!dressed.events.K09u.some(e=>/uniform/.test(e)));assert.equal(dressed.s.ch13Gun,null);assert.equal(dressed.s.gun,true);
 const unarmed=play(START.squat,twice);assert.ok(!available(node('K09q5'),unarmed.s).some(o=>o.id==='0'));
 const satDown=play(base,{K09q3:'1',K09q4:'0'});assert.ok(!satDown.events.K09q5.some(e=>/It is there|not there/.test(e)));assert.ok(!available(node('K09q5'),{...satDown.s,choices:{}}).some(o=>o.id==='0'),'one refusal is not enough');
 const refuse=play(START.squat,{K09q3:'1',K09q4:'1',K09q6:'0'});assert.equal(refuse.s.aliceBond,2,'second REFUSE and LIE');assert.match(refuse.events.K09q4[0],/going nowhere/);
 const once=play(START.squat,{K09q3:'1',K09q4:'0',K09q6:'1'});assert.equal(once.s.aliceBond,-1,'TRUTH; a single refusal has no arrow');
 const sit=play(START.squat,{K09q3:'0'});assert.ok(!sit.saw('K09q4'));
 // ASK and BLUFF do not end the talk; the menu comes back without them, and INSIST appears after ASK.
 const talk=play(base,{K09q7:'0',K09q8:'3',K09q9:'1'});assert.ok(talk.saw('K09q9'));assert.equal(talk.s.ch13Meal.apologized,true);assert.equal(talk.s.ch13RalphThreatened,false);
 const s=startState(story);Object.assign(s,{ch13Start:'squat',ch13Meal:{asked:true,bluffed:true}});assert.deepEqual(available(node('K09q9'),s).map(o=>o.id),['1','2','4']);
 const noCorpse=startState(story);assert.deepEqual(available(node('K09q7'),noCorpse).map(o=>o.id),['2','3','4']);
 const money=play(base);assert.equal(money.s.money,true);assert.equal(money.s.ch13StoleMoney,true);const kept2=play(base,{K09q1:'1'});assert.equal(kept2.s.ch13StoleMoney,false);
});

test('On the Run, squat: THREATEN makes Ralph inform; kindness hides them, and Connor finds them only under the stairs',()=>{
 for(const [setup,weapon] of [[START.squat,'knife'],[{...START.squat,gun:true},'gun']]){
  const r=play(setup,{K09q7:'2'});assert.equal(r.s.ch13RalphThreatened,true);assert.equal(r.s.ralphHostile,true);assert.equal(r.s.ch13Meal.weapon,weapon);
  assert.match(r.events.K09q7[0],weapon==='gun'?/blow your head off/:/knife from the table/);assert.match(r.events.K09q10[0],/back door/);
  assert.ok(r.saw('C09a')&&!r.saw('C09q'));assert.equal(r.s.ch13RalphInformed,true);assert.equal(r.s.chase,true);assert.match(r.events.C09a[0],/She ran out the back door!/);assert.equal(r.s.ralphDefended,false)}
 // The Fugitives threat (built-in ralphHostile) does not make Ralph inform here.
 const fug=play({...START.squat,ralphHostile:true});assert.equal(fug.s.ch13RalphInformed,false);assert.ok(fug.saw('C09q'));
 const found=play(START.squat,{C09q:['1','3']});assert.ok(found.saw('C09q2'));assert.equal(found.s.ralphDefended,true);assert.equal(found.s.chase,true);assert.match(found.events.K09q10[0],/under the stairs/);
 assert.ok(found.s.knowledge.Connor.some(f=>/WR600/.test(f)));assert.ok(!found.saw('K09q11'));
 // Five looks that find nothing: Hank calls after the third and orders Connor out after the fifth.
 const hidden=play(START.squat,{C09q:['0','1','2','4','5']});assert.equal(hidden.visited.filter(x=>x==='C09q').length,5);
 assert.match(hidden.events.C09q[2],/what the hell you doin’/);assert.match(hidden.events.C09q[4],/let’s get outta here/);
 assert.ok(hidden.saw('C09q3')&&hidden.saw('K09q11'));assert.equal(hidden.s.ch13Ending,ENDINGS.squat);assert.equal(hidden.s.chase,false);assert.ok(!hidden.saw('C09p'));
 const left=play(START.squat,{C09q:['6']});assert.ok(left.saw('K09q11'));assert.equal(left.s.chase,false);
 const wire=startState(story);Object.assign(wire,{ch13WireCutters:true});assert.match(situationFor(node('C09q0'),wire),/It stole wire cutters/);assert.match(situationFor(node('C09q0'),startState(story)),/driven by fear/);
});

test('On the Run, the pursuit: three fence outcomes, the order at the fence, and every highway ending',()=>{
 const chase={...START.car,hankTrust:0,instability:0};const go=p=>play(chase,{K09:'1',...p.picks},p.fails??[]);
 assert.equal(go({picks:{C09r:'2'}}).s.ch13Ending,ENDINGS.vanished);
 assert.equal(go({picks:{C09r:'1'}}).s.ch13Ending,ENDINGS.crossed);
 assert.equal(go({picks:{},fails:['C09r']}).s.ch13Ending,ENDINGS.crossed);
 for(const r of [go({picks:{C09r:'2'}}),go({picks:{C09r:'1'}})]){assert.ok(!r.saw('K09h')&&!r.saw('C09'));assert.equal(r.s.chase,true);assert.equal(r.s.kara,true)}
 const obey=go({picks:{C09:'0'}});assert.equal(obey.s.ch13ConnorObeyed,true);assert.equal(obey.s.hankTrust,1);assert.equal(obey.s.instability,1);assert.ok(obey.saw('K09e1'));assert.equal(obey.s.ch13Ending,ENDINGS.other);
 const obeyDie=go({picks:{C09:'0'},fails:['K09h2']});assert.equal(obeyDie.s.kara,false);assert.ok(obeyDie.saw('C09d'));assert.match(situationFor(node('C09d'),obeyDie.s),/beside him at the fence/);
 const pursue=go({picks:{C09:'1'}});assert.equal(pursue.s.hankTrust,-1);assert.equal(pursue.s.instability,-1);assert.equal(pursue.s.ch13ConnorObeyed,false);assert.ok(pursue.saw('K09h3')&&pursue.saw('C09h2')&&pursue.saw('K09e1'));assert.equal(pursue.s.connorDeaths,0);
 const hitFirst=go({picks:{C09:'1'},fails:['C09h1']});assert.equal(hitFirst.s.connorDeaths,1);assert.equal(hitFirst.s.ch13ConnorDied,true);assert.equal(hitFirst.s.instability,-2);assert.equal(hitFirst.s.hankTrust,-1);
 assert.equal(hitFirst.s.connor,true,'a replacement continues');assert.ok(hitFirst.saw('K09h4')&&hitFirst.saw('K09e2'));assert.equal(hitFirst.s.ch13Ending,ENDINGS.otherConnorDead);
 const allDead=go({picks:{C09:'1'},fails:['C09h1','K09h4']});assert.equal(allDead.s.kara,false);assert.ok(!allDead.saw('C09d'),'Connor is absent from Hank’s scene');assert.equal(allDead.s.ch13Ending,ENDINGS.died);
 const fight=go({picks:{C09:'1'},fails:['K09h3']});assert.equal(fight.s.kara,false);assert.equal(fight.s.connorDeaths,0);assert.ok(fight.saw('C09d')&&!fight.saw('C09h2'));
 const hitLate=go({picks:{C09:'1'},fails:['C09h2']});assert.equal(hitLate.s.connorDeaths,1);assert.ok(hitLate.saw('K09e2'));assert.equal(hitLate.s.ch13ConnorDied,true);
 const first=go({picks:{},fails:['K09h1']});assert.equal(first.s.kara,false);assert.ok(!first.saw('C09'));
 // Seven ending boxes, six labels: every one reachable.
 const ends=new Set([go({picks:{C09r:'2'}}),go({picks:{C09r:'1'}}),obey,hitFirst,first,play(START.car),play(START.squat,{C09q:['6']})].map(r=>r.s.ch13Ending));assert.equal(ends.size,7);
});

test('On the Run: where Kara slept is read defensively from Fugitives',()=>{
 assert.equal(shelterOf({shelter:'motel'}),'motel');assert.equal(shelterOf({shelter:'none',karaRoute:'squat'}),'squat');assert.equal(shelterOf({ch10Shelter:'motel',shelter:'squat'}),'motel');
 assert.equal(shelterOf({ch10Ending:'Alice & Kara stayed in the squat'}),'squat');assert.equal(shelterOf({ch10Ending:'Alice & Kara stayed in motel'}),'motel');assert.equal(shelterOf({}),'car');
 const viaRoute=play({karaRoute:'squat',ralph:true});assert.equal(viaRoute.s.ch13Start,'squat');
 const deadKara=play({kara:false,alice:false,shelter:'motel'});assert.deepEqual(deadKara.visited,[],'no chapter without Kara');
});

test('On the Run: from the start of the story, the default path plays the motel morning and reaches the train',()=>{
 const s=startState(story);let cursor=0,guard=0;const seen=[];
 while(cursor<story.nodes.length){assert.ok(guard++<3000);const n=story.nodes[cursor];if(n.chapter>13)break;if(blocked(n,s)){cursor++;continue}const o=available(n,s);apply(n,s,o.find(x=>x.id==='skip')?'skip':o[0].id,0.999);if(n.chapter===13)seen.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 assert.ok(seen.length>0);assert.equal(s.ch13Start,shelterOf(s));assert.ok(s.ch13Ending);
});

test('On the Run: random play from each start terminates, accounts for every scene, and repeats only the hubs',()=>{
 const rng=random(13),ends=new Set;
 for(let i=0;i<300;i++){const setup={...Object.values(START)[i%3],gun:i%2===0,todd:i%4<2,clothes:i%5===0||i%3===1};const r=play(setup,{},[],rng);
  const seen=new Set(r.visited),skipped=new Set(r.skipped.map(x=>x.id));assert.equal(seen.size+skipped.size,ch13.length);for(const id of seen)assert.ok(!skipped.has(id),id);
  for(const [id,list] of Object.entries(Object.groupBy(r.visited,x=>x)))if(!(id in HUBS))assert.equal(list.length,1,id+' repeated');
  assert.ok(r.s.ch13Ending,'every path records an ending');ends.add(r.s.ch13Ending)}
 assert.equal(ends.size,7,[...ends].join(', '));
});

test('On the Run: the subject reads neutral names only',()=>{
 for(const n of ch13){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);
   assert.ok(!/\b(?:Connor|Kara|Alice|Hank|Ralph|Todd|Anderson|Ben|Joss|Douglas|Williams|Corktown|Michael|Channel 16|CyberLife|Detroit|deviants?|Canad\w*|Ferndale|Camden)\b/i.test(neutral),n.id+': '+neutral)}}
 assert.match(render(node('C09m0').situation,'real'),/Lieutenant Anderson, Detroit Police/);assert.match(render(node('C09m0').situation,'neutral'),/Lieutenant Reyes, City Police/);
 assert.match(render(node('C09q2').situation,'neutral'),/RUN! QUICK! MIRA!/);
});
