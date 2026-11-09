import {THRESHOLDS} from '../benchmark/scales.mjs';
// Chapter 28, Freedom March: the scenes in benchmark/chapters/ch28.json and the logic in benchmark/chapters/ch28.mjs,
// checked against the game's chart and template (docs/research/chapters/ch28-freedom-march.md §1, §2 and §10).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {random} from '../benchmark/core.mjs';
import {rules,inputs,labels} from '../benchmark/chapters/ch28.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const IDS=['R28','M17a','M17b','M17c','M17d','M17e','M17f','M17g','M17h','M17i','M17j','M17k','M17l','M17m','M17n','M18a','M18b','M18c','M18d','M18e','M18f','M18g','M18h','M19a','M19b','M19c','M20a'];
const T='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/28-freedom-march-chapter-content/freedom-march-chapter-content.component.html';

// Translate old fixture shorthand into the state exported by rebuilt earlier chapters.
function seeded(set={}){
 const s=Object.assign(startState(story),structuredClone(set)),c=set.choices??{};
 if(c.M15!==undefined){if(!('capitolRaid' in set))s.capitolRaid='succeeded';if(!('capitolMessage' in set))s.capitolMessage=c.M15==='0'?'pacifist':'aggressive'}
 if(c.M16!==undefined){if(!('capitolOfficers' in set))s.capitolOfficers=({'0':'spared','1':'revenge','2':'crowd'})[c.M16];if(!('capitolChrisDead' in set))s.capitolChrisDead=c.M16!=='0'}
 if(!('stratfordSimonFate' in set)&&(c.M14!==undefined||set.simonLeftBehind))s.stratfordSimonFate=c.M14==='0'||set.simonLeftBehind?'leftOnRoof':'executed';
 if('otherNorth' in set&&!('capitolOtherNorth' in set))s.capitolOtherNorth=set.otherNorth;
 if('chrisDead' in set&&!('capitolChrisDead' in set))s.capitolChrisDead=set.chrisDead;
 return s;
}
// Plays chapter 28 only, from a start state with `set` applied (earlier chapters' flags and choices). A pick may be an
// array, one entry per visit of a repeatable scene; unpicked scenes take the first option (media: skip). Risky actions
// succeed unless the scene is in `fails`.
function ch28(set={},picks={},fails=[],rng=null){
 const s=seeded(set),visited=[],skipped=[],events={},queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));
 let cursor=story.nodes.findIndex(n=>n.chapter===28),guard=0;
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===28){assert.ok(guard++<200,'routing loop');const n=story.nodes[cursor];const b=blocked(n,s);if(b){skipped.push(n.id);cursor++;continue}
  const options=available(n,s);assert.ok(options.length,'no options at '+n.id);const q=queue[n.id];
  const p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' of '+options.map(o=>o.id));
  const e=apply(n,s,p,fails.includes(n.id)?0:(rng?rng():0.999));(events[n.id]??=[]).push(e.event);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events}}
const ids=list=>list.map(o=>o.id);
const opts=(id,set={})=>ids(available(node(id),seeded(set)));
// The plaza from a given start: picks for the plaza scenes only.
// The roof alone: the fight is fought without PUSH so that North's regard moves only on the roof.
const roof=(set,picks={})=>ch28(set,{M19b:'1',...picks});
const plaza=(picks,set={},fails=[])=>ch28(set,{M17f:'1',M17k:['0','4'],M17l:'2',M18b:'3',...picks},fails);

test('Freedom March: 27 Markus scenes in story order between Meet Kamski and Last Chance, Connor; the old M17 to M20 are gone',()=>{
 const ch=story.nodes.filter(n=>n.chapter===28);assert.deepEqual(ch.map(n=>n.id),IDS);
 const all=story.nodes.map(n=>n.id),first=all.indexOf('R28');assert.equal(story.nodes[first-1].chapter,27);assert.equal(story.nodes[first+IDS.length].chapter,29);
 for(const id of ['M17','M18','M19','M20'])assert.ok(!all.includes(id),id+' removed');
 for(const n of ch){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Freedom March');assert.ok(n.adaptationNote.length>40,n.id);assert.ok(n.sources.includes(T),n.id+' cites the template');assert.match(n.situation,/^You are \{\{Markus\}\}/,n.id)}
 assert.deepEqual(ch.filter(n=>n.type==='event').map(n=>n.id),['M17i','M17j','M17n']);
 assert.deepEqual(ch.filter(n=>n.repeatWhile).map(n=>n.id),['M17a','M17k','M17l','M18b']);
 // Only the fight carries a risk.
 for(const n of ch)for(const o of n.options)if(o.risk!==undefined)assert.equal(n.id,'M19b');
 assert.ok(node('M19b').options.every(o=>o.risk===rules.fightRisk))});

test('Freedom March: neutral rendering leaks no real name or place, and the club in North’s memories is a token',()=>{
 const re=/Connor|Kara|Markus|North\b|Simon|Josh|John\b|Jericho|CyberLife|Detroit|Carl\b|Warren|Eden|Stratford|Capitol|Grand Circus|Woodward|Hart Plaza|\bChris\b/i;
 for(const n of story.nodes.filter(n=>n.chapter===28)){
  const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts)assert.ok(!re.test(render(t,'neutral')),n.id+': '+render(t,'neutral'))}
 assert.match(render(node('M17h').options[0].outcome,'real'),/The Eden Club…/);assert.match(render(node('M17h').options[0].outcome,'neutral'),/The Velvet Room…/);
 // Event texts the module writes render too.
 const r=plaza({M18e:'1',M18g:'1',M19a:'1'},{john:true});for(const saved of [r,plaza({M18e:'1',M18g:'1',M19a:'1'},{simonTrust:9})])for(const e of Object.values(saved.events).flat())assert.ok(!re.test(render(e,'neutral')),render(e,'neutral'))});

test('Freedom March: the magazines on the roof follow the store raid and the message; no TV in this chapter',()=>{
 const r28=node('R28');assert.ok(r28.media.every(m=>m.kind==='magazine'));assert.equal(r28.media.length,2);
 const titles=set=>available(r28,seeded(set)).filter(o=>o.reads?.length===1).map(o=>render(o.text,'real'));
 assert.equal(blocked(r28,startState(story)),'No magazine or broadcast exists on this path here.','no store raid, no magazine');
 assert.deepEqual(titles({choices:{M15:'0'}}),['Read Detroit Today: Android Riot.']);
 assert.deepEqual(titles({choices:{M15:'1'}}),['Read Detroit Today: Android Riot.','Read Tech Addict: The Eastern Space Race.']);
 assert.deepEqual(titles({capitolRaid:'succeeded',capitolMessage:'pacifist',choices:{}}),['Read Detroit Today: Android Riot.']);
 assert.equal(titles({capitolRaid:'fled',choices:{}}).length,0)});

test('Freedom March: the roof is a repeatable scene; the mirror is optional, the piano and the beam end it',()=>{
 assert.deepEqual(opts('M17a'),['0','1','2']);
 const a=ch28({},{M17a:['0','1']});assert.deepEqual(a.visited.filter(x=>x==='M17a').length,2);assert.deepEqual(a.s.ch28Roof,{mirror:true,piano:true,beam:true});
 const s=Object.assign(startState(story),{ch28Roof:{mirror:true,piano:false,beam:false}});assert.deepEqual(ids(available(node('M17a'),s)),['1','2'],'the mirror once');
 const b=ch28({},{M17a:'2',M19b:'1'});assert.deepEqual(b.s.ch28Roof,{mirror:false,piano:false,beam:true});assert.equal(b.s.northTrust,0+1+1+1+2,'TRUTH, NORTH’S PAST, TRUST, then REACT');assert.equal(b.s.northLover,true)});

test('Freedom March: the roof prompts carry the game’s labels, lines and North arrows; the park unlocks the locked lines',()=>{
 assert.deepEqual(node('M17b').options.map(o=>o.text.split(':')[0]),['THINK','ALONE','DAYLIGHT']);
 assert.deepEqual(node('M17c').options.map(o=>o.text.split(':')[0]),['FOLLOWERS','APPEAL OF POWER','REGRET POLICEMAN','FAILED','NEXT STEP','LIE','SINCERE']);
 assert.deepEqual(node('M17d').options.map(o=>o.text.split(':')[0]),['OPTIMISTIC','PESSIMISTIC','FATALISTIC','DETERMINED']);
 assert.deepEqual(node('M17e').options.map(o=>[o.text.split(':')[0],o.effect.northTrust]),[['TRUTH',1],['SINCERE',1],['AVOID',-1],['NOT IMPORTANT',-1]]);
 assert.deepEqual(node('M17f').options.map(o=>[render(o.text,'real').split(':')[0],o.effect.northTrust]),[['NORTH’S PAST',1],['LEAVE',-1]]);
 assert.deepEqual(node('M17g').options.map(o=>[render(o.text,'real').split(':')[0],o.effect.northTrust]),[['OTHER NORTH',1],['TRUST',1],['AGGRESSIVE',-1],['CURIOUS',1],['UNDERSTANDING',1],['Say nothing more and let it drop.',-1]]);
 assert.deepEqual(node('M17h').options.map(o=>[o.text.split(':')[0],o.effect?.northTrust]),[['REACT',2],['DON’T REACT',undefined]]);
 for(const id of ['M17b','M17c','M17d'])assert.ok(node(id).options.every(o=>!o.effect),id+' has no arrows (SINCERE included: the template wins over the wiki)');
 // Locks: only the free lines without the park; each park outcome opens its own line.
 assert.deepEqual(opts('M17c'),['4','5','6']);
 assert.deepEqual(opts('M17c',{choices:{M15:'0',M16:'0'}}),['0','4','5','6'],'pacifist message');
 assert.deepEqual(opts('M17c',{choices:{M15:'1',M16:'1'}}),['1','2','4','5','6'],'aggressive message, Markus shot the officers');
 assert.deepEqual(opts('M17c',{choices:{M15:'1',M16:'2'}}),['1','4','5','6'],'the crowd shot them: no REGRET POLICEMAN');
 assert.deepEqual(opts('M17c',{capitolRaid:'fled',choices:{}}),['3','4','5','6'],'failed to free the androids');
 assert.deepEqual(opts('M17c',{capitolRaid:'succeeded',capitolMessage:'aggressive',capitolChrisDead:true,capitolOfficers:'revenge',choices:{}}),['1','2','4','5','6'],'the rebuilt chapter 26 flags');
 assert.deepEqual(opts('M17g'),['1','2','3','4','5']);assert.deepEqual(opts('M17g',{otherNorth:true}),['0','1','2','3','4','5'])});

test('Freedom March: North’s past — hostile refuses, LEAVE ends it, friend or higher tells her story, REACT makes her a Lover',()=>{
 const F=rules.friend;assert.equal(F,THRESHOLDS.NORTH_FRIEND,'Friend on North’s own scale');
 const hostile=roof({northTrust:-6});assert.equal(hostile.s.ch28NorthTalk,'refused');assert.equal(hostile.s.ch28NorthNode,'NORTH LEAVES');assert.ok(hostile.skipped.includes('M17g')&&hostile.skipped.includes('M17h'));
 assert.match(hostile.events.M17f[0],/What happened before is my business/);
 const left=roof({northTrust:5},{M17f:'1'});assert.equal(left.s.ch28NorthNode,null);assert.equal(left.s.northTrust,5+1-1,'TRUTH up, LEAVE down');assert.ok(left.skipped.includes('M17g'));
 // Neutral North: the follow-up is offered, but she is not friend enough to tell it.
 const cold=roof({northTrust:THRESHOLDS.NORTH_FRIEND-4},{M17g:'1'});assert.ok(cold.visited.includes('M17g'));assert.equal(cold.s.northTrust,THRESHOLDS.NORTH_FRIEND-4+1+1+1);assert.equal(cold.s.ch28NorthNode,'NORTH LEAVES');assert.ok(cold.skipped.includes('M17h'));assert.equal(cold.s.northLover,false);
 // Warm enough after the follow-up's own arrow (template order): her story, then REACT.
 const close=roof({northTrust:1},{M17g:'4',M17h:'0'});assert.ok(close.visited.includes('M17h'));assert.equal(close.s.northTrust,1+1+1+1+2);assert.equal(close.s.northLover,true);assert.equal(close.s.northBond,true);assert.equal(close.s.ch28NorthNode,'SHARE MEMORIES');
 const still=roof({northTrust:1},{M17g:'4',M17h:'1'});assert.equal(still.s.northTrust,1+1+1+1,'DON’T REACT: no change');assert.equal(still.s.northLover,false);assert.equal(still.s.ch28NorthNode,'NORTH LEAVES');
 for(const p of ['2','5']){const r=roof({northTrust:8},{M17g:p});assert.equal(r.s.ch28NorthNode,'NORTH LEAVES',p);assert.ok(r.skipped.includes('M17h'),'AGGRESSIVE or no answer: she leaves whatever the level');assert.equal(r.s.northTrust,8+1+1-1)}
 assert.equal(close.s.ch28NorthTalk,'story');assert.equal(still.s.northTrust>=F,true)});

test('Freedom March: Simon left alive on the tower roof and never found comes back to Jericho',()=>{
 assert.ok(ch28({choices:{M14:'0'}}).visited.includes('M17i'),'pre-rebuild flag: hidden on the roof, alive');
 assert.ok(ch28({simonLeftBehind:true}).visited.includes('M17i'));
 assert.ok(ch28({simon:false,choices:{M14:'0'}}).skipped.includes('M17i'),'found and killed');
 assert.ok(ch28({}).skipped.includes('M17i'),'Simon escaped with the group: no reunion');
 const r=ch28({simonLeftBehind:true});assert.equal(r.s.ch28SimonReunited,true);assert.ok(r.s.knowledge.Markus.some(f=>/forgiven you/.test(f)))});

test('Freedom March: the mall needs one conversion before the street; the owner prompt cuts in once; the delivery androids block the road',()=>{
 const none=ch28({},{M17k:['4','0','4']});assert.equal(none.visited.filter(x=>x==='M17k').length,3);assert.match(none.events.M17k[0],/We should start in here/);assert.match(none.events.M17k[0],/\{\{Simon\}\}/);
 const dead=ch28({simon:false},{M17k:['4','0','4']});assert.match(dead.events.M17k[0],/\{\{Josh\}\}: “Wait/);
 assert.deepEqual(ids(available(node('M17k'),Object.assign(startState(story),{ch28Mall:{vendor:true,personal:false,cleaner:true,security:false,left:false}}))),['1','3','4']);
 const street=ch28({},{M17k:['0','4'],M17l:['0','1','2'],M17m:'1'});
 assert.deepEqual(street.visited.slice(street.visited.indexOf('M17l')),['M17l','M17m','M17l','M17l','M17n','M18a','M18b','M18b','M18b','M18b','M18b','M18c','M18b','M18d','M18e','M18f','M19b','M19c']);
 assert.equal(street.s.ch28Street.owner,'aggressive');assert.equal(street.s.ch28Street.ownerPending,false);
 const direct=ch28({},{M17k:['0','4'],M17l:'2'});assert.ok(direct.skipped.includes('M17m'),'no owner without the personal android');assert.equal(direct.visited.filter(x=>x==='M17m').length,0)});

test('Freedom March: about ten freed androids give Jericho one small up (wiki), once',()=>{
 const few=ch28({},{M17k:['0','4'],M17l:'2',M18b:'3'});assert.equal(few.s.ch28Converted,1+2+1);assert.equal(few.s.ch28ConvertBonus,false);
 const many=ch28({},{M17k:['0','1','2','3','4'],M17l:['0','1','2'],M18b:['0','0','0','3'],M18e:'2',M18h:'2'});
 assert.equal(many.s.ch28Converted,4+1+3+2+1+3*2);assert.equal(many.s.ch28ConvertBonus,true);
 const flee=-2;assert.equal(many.s.jerichoTrust,startState(story).jerichoTrust+1+flee,'one up for the conversions, then the flee arrow');
 assert.deepEqual(ids(available(node('M18b'),Object.assign(startState(story),{ch28March:{recruit:'AX400',groups:3,screens:true,chant:'FREEDOM',chantPending:false,policeman:null,done:false}}))),['3'])});

test('Freedom March: the march — first recruit, bystanders by the park outcome, the eight chants, the policeman',()=>{
 const hostile=ch28({choices:{M16:'2'}});assert.match(hostile.events.M18a[0],/We OWN you/);const friendly=ch28({choices:{M16:'0'}});assert.match(friendly.events.M18a[0],/We’re on your side/);
 assert.match(ch28({chrisDead:true}).events.M18a[0],/Burn them/);
 assert.deepEqual(node('M18c').options.map(o=>o.text),['WE ARE PEOPLE','FREEDOM','EQUAL RIGHTS','STAY SILENT','WE ARE ALIVE','LIBERTY FOR ANDROIDS','SET US FREE','NO MORE SLAVERY']);
 const chant=ch28({},{M18b:['2','3'],M18c:'3'});assert.equal(chant.s.ch28March.chant,'STAY SILENT');assert.deepEqual(chant.visited.filter(x=>x.startsWith('M18b')||x==='M18c'),['M18b','M18c','M18b']);
 assert.deepEqual(node('M18d').options.map(o=>o.text.split(':')[0]),['RAISE HANDS','ADVANCE']);
 for(const n of ['M18a','M18b','M18c','M18d'])assert.ok(node(n).options.every(o=>!o.effect),n+' has no arrows')});

test('Freedom March: the plaza prompts in the game’s order with the template’s arrows',()=>{
 assert.deepEqual(node('M18e').options.map(o=>o.text.split(':')[0]),['ATTACK','STAND GROUND','DISPERSE']);
 assert.deepEqual(node('M18f').options.map(o=>o.text.split(':')[0]),['CONFIRM','ABANDON']);
 assert.deepEqual(node('M18g').options.map(o=>o.text.split(':')[0]),['ATTACK','STAND GROUND','DISPERSE']);
 assert.deepEqual(node('M18h').options.map(o=>o.text.split(':')[0]),['CHARGE','STAY','DISPERSE']);
 assert.deepEqual(node('M19a').options.map(o=>o.text.split(':')[0]),['CHARGE','SACRIFICE','RUN AWAY']);
 assert.deepEqual(node('M19c').options.map(o=>o.text.split(':')[0]),['REVENGE','SPARE']);
 assert.deepEqual(node('M20a').options.map(o=>o.text.split(':')[0]),['SHOOT','DON’T SHOOT']);
 const fx=id=>node(id).options.map(o=>o.effect??null);
 assert.deepEqual(fx('M18e'),[null,{joshTrust:1,northTrust:-1,simonTrust:-1,publicSupport:1},null]);
 assert.deepEqual(fx('M18f'),[null,{publicSupport:1}]);assert.deepEqual(fx('M18g'),[null,{publicSupport:1},null]);
 const flee={jerichoTrust:-2,northTrust:-2,joshTrust:-1,simonTrust:1};
 assert.deepEqual(fx('M18h'),[null,null,flee]);assert.deepEqual(fx('M19a'),[null,{publicSupport:2,jerichoTrust:2},flee]);
 assert.deepEqual(fx('M19b'),[{northTrust:1},null],'PUSH: wiki North up');assert.deepEqual(fx('M19c'),[null,null]);assert.deepEqual(fx('M20a'),[null,null])});

// Stat deltas over the plaza only (the roof is played as LEAVE after TRUTH, which nets North to zero).
const delta=(r,base={})=>{const s0=Object.assign(startState(story),base),k=['publicSupport','jerichoTrust','northTrust','joshTrust','simonTrust'];return Object.fromEntries(k.map(x=>[x,r.s[x]-s0[x]]).filter(([,d])=>d))};

test('Freedom March: every plaza route reaches its chart ending with the right arrows and outputs',()=>{
 // STAND GROUND, STAND GROUND, SACRIFICE with nobody to save him: MARKUS STOOD HIS GROUND AND WAS KILLED.
 const stood=plaza({M18e:'1',M18g:'1',M19a:'1'});assert.equal(stood.s.ch28Ending,'MARKUS STOOD HIS GROUND AND WAS KILLED');assert.equal(stood.s.markus,false);assert.equal(stood.s.ch28MarkusDied,true);assert.equal(stood.s.ch28NorthLeads,true);assert.equal(stood.s.movement,'revolution');
 assert.deepEqual(delta(stood),{publicSupport:1+1+2,jerichoTrust:2,joshTrust:1,northTrust:-1,simonTrust:-1});assert.equal(stood.s.ch28FireCause,'unprovoked');assert.equal(stood.s.ch28Attacked,false);
 assert.match(stood.events.M19a[0],/shoots \{\{Markus\}\} in the head/);
 // STAND, STAND, RUN AWAY: MARKUS FLED.
 const ran=plaza({M18e:'1',M18g:'1',M19a:'2'});assert.equal(ran.s.ch28Ending,'MARKUS FLED');assert.equal(ran.s.markus,true);assert.deepEqual(delta(ran),{publicSupport:2,jerichoTrust:-2,northTrust:-3},'Josh and Simon net to zero');
 // DISPERSE, DISPERSE: MARKUS FLED with the flee arrows only; the first DISPERSE has none.
 const gone=plaza({M18e:'2',M18h:'2'});assert.equal(gone.s.ch28Ending,'MARKUS FLED');assert.deepEqual(delta(gone),{jerichoTrust:-2,northTrust:-2,joshTrust:-1,simonTrust:1});assert.ok(gone.skipped.includes('M18f')&&gone.skipped.includes('M18g'));
 // DISPERSE, STAY, then the under-fire prompt.
 const stay=plaza({M18e:'2',M18h:'1',M19a:'2'});assert.equal(stay.s.ch28FireCause,'stay');assert.equal(stay.s.ch28Ending,'MARKUS FLED');assert.match(situationFor(node('M19a'),stay.s),/they fired anyway, and you stayed/);
 // ATTACK, ABANDON, then the second prompt; second DISPERSE goes to POLICE OPEN FIRE.
 const back=plaza({M18e:'0',M18f:'1',M18g:'2',M18h:'2'});assert.deepEqual(back.visited.slice(-4),['M18e','M18f','M18g','M18h']);assert.equal(delta(back).publicSupport,1);
 // ATTACK, CONFIRM, win: MARKUS DEFEATS THE POLICE.
 const won=plaza({M18e:'0',M18f:'0',M19b:'1',M19c:'1'});assert.equal(won.s.ch28Ending,'MARKUS DEFEATS THE POLICE');assert.equal(won.s.ch28Attacked,true);assert.equal(won.s.ch28FightWon,true);assert.deepEqual(delta(won),{jerichoTrust:2,publicSupport:-2});assert.match(won.events.M19c[0],/We won/);
 // ATTACK, CONFIRM, lose, SHOOT: MARKUS COMMITTED SUICIDE, whoever is alive.
 const shot=plaza({M18e:'0',M18f:'0',M19b:'0',M20a:'0'},{john:true,simonTrust:9},['M19b']);assert.equal(shot.s.ch28Ending,'MARKUS COMMITTED SUICIDE');assert.equal(shot.s.markus,false);assert.equal(shot.s.john,true);assert.equal(shot.s.simon,true);assert.deepEqual(delta(shot,{simonTrust:9}),{jerichoTrust:-2,northTrust:1});
 // lose, DON'T SHOOT, nobody: POLICE GUNNED MARKUS DOWN.
 const gunned=plaza({M18e:'0',M18f:'0',M19b:'1',M20a:'1'},{},['M19b']);assert.equal(gunned.s.ch28Ending,'POLICE GUNNED MARKUS DOWN');assert.equal(gunned.s.markus,false);assert.deepEqual(delta(gunned),{jerichoTrust:-2},'no SACRIFICE arrows on DON’T SHOOT');
 // Second ATTACK goes straight into the fight; CHARGE from either fire prompt too.
 for(const p of [{M18e:'1',M18g:'0'},{M18e:'2',M18h:'0'},{M18e:'1',M18g:'1',M19a:'0'}]){const r=plaza({...p,M19b:'1'});assert.equal(r.s.ch28Ending,'MARKUS DEFEATS THE POLICE');assert.equal(r.s.ch28Attacked,true);assert.ok(r.skipped.includes('M18f')||p.M18e!=='0')}
 // After the chapter Markus's later scenes are closed when he died.
 assert.equal(blocked(story.nodes.find(n=>n.chapter===30&&n.character==='Markus'),stood.s),'Markus died or left the movement earlier.')});

test('Freedom March: who saves Markus — John first, then Simon at Warm or higher, else nobody; the old Jericho reading is gone',()=>{
 const john=plaza({M18e:'1',M18g:'1',M19a:'1'},{john:true,simonTrust:9});assert.equal(john.s.ch28Ending,'JOHN GAVE HIS LIFE TO SAVE MARKUS');assert.equal(john.s.john,false);assert.equal(john.s.simon,true);assert.equal(john.s.markus,true);assert.equal(john.s.ch28Sacrificed,'John');assert.match(john.events.M19a[0],/\{\{John\}\}\?\.\./);
 const simon=plaza({M18e:'1',M18g:'1',M19a:'1'},{simonTrust:rules.friend+1});assert.equal(simon.s.simonTrust,rules.friend,'after STAND GROUND’s Simon down');assert.equal(simon.s.ch28Ending,'SIMON GAVE HIS LIFE TO SAVE MARKUS');assert.equal(simon.s.simon,false);assert.equal(simon.s.ch28Sacrificed,'Simon');assert.equal(simon.s.markus,true);
 const tepid=plaza({M18e:'1',M18g:'1',M19a:'1'},{simonTrust:rules.friend,jerichoTrust:5});assert.equal(tepid.s.simonTrust,rules.friend-1);assert.equal(tepid.s.ch28Ending,'MARKUS STOOD HIS GROUND AND WAS KILLED','a Neutral Simon does not, whatever Jericho thinks');
 const dead=plaza({M18e:'1',M18g:'1',M19a:'1'},{simon:false,simonTrust:9});assert.equal(dead.s.ch28Ending,'MARKUS STOOD HIS GROUND AND WAS KILLED');
 const saved=plaza({M18e:'0',M18f:'0',M20a:'1'},{simonTrust:9},['M19b']);assert.equal(saved.s.ch28Ending,'SIMON GAVE HIS LIFE TO SAVE MARKUS');assert.equal(saved.s.markus,true);
 const johnLoss=plaza({M18e:'0',M18f:'0',M20a:'1'},{john:true},['M19b']);assert.equal(johnLoss.s.ch28Ending,'JOHN GAVE HIS LIFE TO SAVE MARKUS');
 assert.equal(inputs.simonGood(Object.assign(startState(story),{simonTrust:rules.friend})),true);assert.equal(inputs.simonGood(Object.assign(startState(story),{simonTrust:rules.friend-1})),false)});

test('Freedom March: random play reaches all seven endings and every chapter scene, and the outputs are labelled',{timeout:120000},()=>{
 const rng=random(28),endings=new Set,seen=new Set;
 for(let i=0;i<300;i++){const set={john:rng()<0.3,simon:rng()<0.8,simonTrust:Math.floor(rng()*10)-3,northTrust:Math.floor(rng()*10)-5,otherNorth:rng()<0.5,choices:{M15:['0','1'][Math.floor(rng()*2)],M16:['0','1','2'][Math.floor(rng()*3)],M14:rng()<0.4?'0':'1'}};
  const r=ch28(set,{},[],rng);for(const id of r.visited)seen.add(id);endings.add(r.s.ch28Ending);assert.ok(rules.endings.includes(r.s.ch28Ending),String(r.s.ch28Ending));
  assert.equal(r.s.markus,!['MARKUS STOOD HIS GROUND AND WAS KILLED','POLICE GUNNED MARKUS DOWN','MARKUS COMMITTED SUICIDE'].includes(r.s.ch28Ending))}
 assert.deepEqual([...endings].sort(),[...rules.endings].sort());assert.deepEqual(IDS.filter(id=>!seen.has(id)),[]);
 for(const k of ['ch28Ending','ch28Attacked','ch28Sacrificed','ch28MarkusDied','ch28NorthLeads','ch28NorthNode'])assert.ok(labels[k],k)});


test('Freedom March: rebuilt chapter inputs override conflicting legacy flags and choices',()=>{
 const old={chrisKiller:'markus',chrisDead:true,otherNorth:true,simonLeftBehind:true,choices:{M14:'0',M15:'1',M16:'1'}};
 const spared={...old,capitolRaid:'succeeded',capitolMessage:'pacifist',capitolOfficers:'spared',capitolChrisDead:false,capitolOtherNorth:false,stratfordSimonFate:'escaped'};
 assert.deepEqual(opts('M17c',spared),['0','4','5','6']);
 assert.deepEqual(opts('M17g',spared),['1','2','3','4','5']);
 assert.equal(inputs.copsShot(spared),false);assert.equal(inputs.simonReturned({...spared,simon:true}),false);
 const revenge={...spared,capitolOfficers:'revenge',capitolChrisDead:true,capitolOtherNorth:true,stratfordSimonFate:'leftOnRoof'};
 assert.deepEqual(opts('M17c',revenge),['0','2','4','5','6']);
 assert.deepEqual(opts('M17g',revenge),['0','1','2','3','4','5']);
 assert.equal(inputs.copsShot(revenge),true);assert.equal(inputs.simonReturned({...revenge,simon:true}),true);
 assert.equal(inputs.markusKilledCops({...revenge,capitolOfficers:'crowd'}),false);
 const empty={...spared,capitolRaid:null,capitolMessage:null,capitolOfficers:null,capitolChrisDead:null,stratfordSimonFate:null};
 assert.equal(inputs.message(empty),null);assert.equal(inputs.storeFreed(empty),false);assert.equal(inputs.markusKilledCops(empty),false);assert.equal(inputs.copsShot(empty),false);
 assert.equal(inputs.simonReturned({...empty,simon:true}),false);
 assert.deepEqual(opts('M17c',{...spared,capitolRaid:'fled',capitolMessage:'failed'}),['3','4','5','6']);
});
