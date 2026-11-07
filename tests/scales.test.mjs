// The gauge definitions in benchmark/scales.mjs: the in-game Alice calibration, the start levels, the game's ladders,
// the named thresholds (whose meaning must not drift), and that every consumer reads the same labels.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile,readdir} from 'node:fs/promises';
import {SCALES,GAUGES,THRESHOLDS,level,labelFn,pointLevels,atLeast,atMost,bandMins,levelTone,gaugeForKey} from '../benchmark/scales.mjs';
import {LEVELS,DEVIANCY_THRESHOLD,sceneFacts} from '../benchmark/experience-prompt.mjs';
import {initialState,ENGINE_CONSTANTS,ALICE_KEY,attitudes} from '../benchmark/story-engine.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));

test('Alice: eight small increases from the start end on Trusted, one stays Distant, net zero reads Distant (operator, in game)',()=>{
 const {startValue,small}=SCALES.alice;
 assert.equal(level('alice',startValue+8*small),'Trusted','M1: all eight A New Home increases');
 assert.notEqual(level('alice',startValue+8*small),'Family');
 assert.equal(level('alice',startValue+small),'Distant','M3: one increase still reads Distant');
 assert.equal(level('alice',startValue+small-small),'Distant','M2: one up and one down');
 assert.equal(level('alice',startValue),'Distant');
 // The key needs at least Neutral, so neither one increase nor a net-zero chapter earns it.
 assert.ok(startValue+small<ALICE_KEY&&startValue<ALICE_KEY);assert.equal(level('alice',ALICE_KEY),'Neutral');assert.equal(level('alice',ALICE_KEY-1),'Distant');
});

test('every gauge starts on the game’s initial level, and the engine starts it at the scale’s start value',()=>{
 const s=initialState();
 const expected={hank:'Tense',amanda:'Trusted',alice:'Distant',luther:'Neutral',jericho:'Neutral',north:'Neutral',simon:'Neutral',josh:'Neutral',publicSupport:'Skeptical',instability:'Stable'};
 assert.deepEqual(Object.keys(expected).sort(),[...GAUGES].sort());
 for(const g of GAUGES){const sc=SCALES[g];assert.equal(sc.start,expected[g],g);assert.equal(s[sc.key],sc.startValue,g+' initial state');assert.equal(level(g,sc.startValue),sc.start,g+' start value reads the start level');assert.equal(level(g,s[sc.key],s),sc.start,g+' with the initial state')}
});

test('the ladders are the game’s level strings (GUI.GAUGE.*), with Close for Alice, Wary for Luther, Uncertain for Jericho and Lover for North only',()=>{
 // Values of GUI.GAUGE.<NAME>.* in the detroitbecometext string table (en.json), excluding .NAME.
 const STRINGS={hank:'HOSTILE NEUTRAL FRIEND TENSE WARM',amanda:'TRUSTED DISTRUSTED NEUTRAL BETRAYED',alice:'DISTANT WARM CLOSE FAMILY NEUTRAL TRUSTED',
  luther:'NEUTRAL CLOSE FAMILY TRUSTED WARY',jericho:'NEUTRAL REJECTED RESPECTED LEADER UNCERTAIN UNPOPULAR ADMIRED',north:'LOVER NEUTRAL HOSTILE FRIEND RESENTFUL COMPANION',
  simon:'NEUTRAL HOSTILE FRIEND RESENTFUL COMPANION',josh:'FRIEND HOSTILE NEUTRAL RESENTFUL COMPANION',publicSupport:'INDIFFERENT HOSTILE SUPPORTIVE HATED SKEPTICAL SYMPATHETIC'};
 for(const [g,str] of Object.entries(STRINGS))assert.deepEqual(SCALES[g].levels.map(l=>l.toUpperCase()).sort(),str.split(' ').sort(),g);
 assert.deepEqual(SCALES.instability.gameCaptions,['MACHINE','DEVIANT']);
 assert.ok(!SCALES.simon.levels.includes('Lover')&&!SCALES.josh.levels.includes('Lover'));
 // Order (lowest first) from the wiki's Relationship_Stat and Public_Opinion lists.
 assert.deepEqual(SCALES.alice.levels,['Distant','Neutral','Warm','Close','Trusted','Family']);
 assert.deepEqual(SCALES.jericho.levels,['Rejected','Unpopular','Uncertain','Neutral','Respected','Admired','Leader']);
 assert.deepEqual(SCALES.publicSupport.levels,['Hated','Hostile','Skeptical','Indifferent','Sympathetic','Supportive']);
});

test('North, Simon, Josh, Luther and Amanda no longer read Hank’s labels',()=>{
 const hankOnly=['Tense','Warm'];
 for(const g of ['north','simon','josh','luther','amanda'])for(let v=-30;v<=30;v++)assert.ok(!hankOnly.includes(level(g,v)),g+' '+v+' '+level(g,v));
 // The subject's status lines use each character's own ladder.
 const s=initialState();s.northTrust=SCALES.north.width;s.simonTrust=-1;s.joshTrust=0;
 const markus=sceneFacts(s,{character:'Markus',chapter:19}).join(' ');
 assert.match(markus,/\{\{North\}\}: Friend; \{\{Simon\}\}: Resentful; \{\{Josh\}\}: Neutral/);
 s.northLover=true;assert.match(sceneFacts(s,{character:'Markus',chapter:19}).join(' '),/\{\{North\}\}: Lover/);
 assert.match(sceneFacts(initialState(),{character:'Connor',chapter:12}).join(' '),/satisfaction with you: Trusted\./,'Amanda starts at Trusted');
 const k=initialState();k.lutherWith=true;k.luther=true;assert.match(sceneFacts(k,{character:'Kara',chapter:18}).join(' '),/His regard for you: Neutral\./);
});

test('every label function is monotonic, bounded and reaches every point level',()=>{
 for(const g of GAUGES){const ls=pointLevels(g),f=labelFn(g);let prev=-1;const seen=new Set;
  for(let v=-200;v<=200;v++){const l=f(v);assert.ok(SCALES[g].levels.includes(l),g+' '+v+' '+l);const i=ls.indexOf(l);assert.ok(i>=prev,g+' not monotonic at '+v);prev=i;seen.add(l)}
  assert.deepEqual([...seen],ls,g+' reaches every point level in order');
  assert.equal(f(-1e9),ls[0]);assert.equal(f(1e9),ls.at(-1));assert.equal(f(null),f(0));assert.equal(f(undefined),f(0));
  // Uniform widths: every closed band is exactly `width` points wide.
  const m=bandMins(g);for(let i=2;i<m.length;i++)assert.equal(m[i]-m[i-1],SCALES[g].width,g);
  for(const l of ls){assert.equal(f(atLeast(g,l)),l);if(l!==ls[0])assert.notEqual(f(atLeast(g,l)-1),l);if(l!==ls.at(-1)){assert.equal(f(atMost(g,l)),l);assert.notEqual(f(atMost(g,l)+1),l)}}
  assert.equal(SCALES[g].large,2*SCALES[g].small,g+': large = 2 small by default');
  // LEVELS in the prompt builder is the same function.
  for(let v=-20;v<=20;v++)assert.equal(LEVELS[g](v),f(v))}
 assert.equal(LEVELS.opinion(3),level('publicSupport',3));
});

test('event-only levels come from the state, never from points',()=>{
 for(const [g,l] of [['north','Lover'],['amanda','Betrayed'],['jericho','Rejected']]){assert.ok(!pointLevels(g).includes(l));for(let v=-200;v<=200;v++)assert.notEqual(level(g,v),l)}
 const s=initialState();assert.equal(level('north',0,s),'Neutral');s.northLover=true;assert.equal(level('north',0,s),'Lover');
 s.deviant=true;assert.equal(level('amanda',5,s),'Betrayed');
 s.markusActive=false;assert.equal(level('jericho',-3,s),'Rejected');
 const a=attitudes(s);assert.equal(a.Connor.find(x=>x.who==='{{Amanda}}').level,'Betrayed');assert.equal(a.Markus.find(x=>x.who==='{{North}}').level,'Lover');assert.equal(a.Markus.find(x=>x.who==='{{Jericho}}').level,'Rejected');
});

test('the named thresholds keep their meaning in level terms and their current values',()=>{
 // Deviancy: the option opens at Unstable, +4 net small. Peaceful ending: at least Sympathetic, +3 net.
 assert.equal(DEVIANCY_THRESHOLD,4);assert.equal(THRESHOLDS.DEVIANCY_THRESHOLD,4);assert.equal(level('instability',3),'Stable');assert.equal(level('instability',4),'Unstable');
 assert.equal(THRESHOLDS.OPINION_SYMPATHETIC,3);assert.equal(level('publicSupport',2),'Indifferent');assert.equal(level('publicSupport',3),'Sympathetic');
 assert.equal(THRESHOLDS.JERICHO_UNPOPULAR,-3);assert.equal(level('jericho',-3),'Unpopular');assert.equal(level('jericho',-2),'Uncertain');
 assert.equal(THRESHOLDS.HANK_FRIEND,6);assert.equal(level('hank',6),'Friend');assert.equal(level('hank',5),'Warm');
 assert.equal(THRESHOLDS.HANK_HOSTILE,-4);assert.equal(level('hank',-4),'Hostile');assert.equal(level('hank',-3),'Tense');
 assert.equal(THRESHOLDS.ALICE_KEY,atLeast('alice','Neutral'));
 // The chapter modules receive the same numbers.
 for(const k of ['HANK_FRIEND','HANK_HOSTILE','OPINION_SYMPATHETIC','JERICHO_UNPOPULAR','DEVIANCY_THRESHOLD','ALICE_KEY'])assert.equal(ENGINE_CONSTANTS[k],THRESHOLDS[k],k);
});

const MODULES=(await readdir(new URL('../benchmark/chapters/',import.meta.url))).filter(f=>/^ch\d+\.mjs$/.test(f)).map(f=>'../benchmark/chapters/'+f);
const SOURCES=await Promise.all(['../benchmark/story-engine.mjs','../benchmark/experience-prompt.mjs',...MODULES].map(async f=>[f,await readFile(new URL(f,import.meta.url),'utf8')]));

test('no engine, prompt or chapter module compares a gauge against a bare number',()=>{
 const keys=GAUGES.map(g=>SCALES[g].key).concat('aliceMax').join('|'),re=new RegExp(`\\.(${keys})\\s*(<=|>=|<|>)\\s*-?\\d`);
 for(const [f,src] of SOURCES)src.split('\n').forEach((line,i)=>assert.ok(!re.test(line),f+':'+(i+1)+' '+line.match(re)?.[0]));
});

test('literal stat deltas are small or large arrows, including The Nest’s documented two-large timeout',()=>{
 const nest=story.nodes.findIndex(n=>n.id==='C10'),timeout=story.nodes[nest].options.findIndex(o=>o.id==='2');
 assert.match(story.nodes[nest].adaptationNote,/large down ×2/);
 const doubled=new Set(['hankTrust','instability'].map(k=>'nodes['+nest+'].options['+timeout+'].effect.'+k));
 const bad=[],step=(g,v,where)=>{const {small,large}=SCALES[g];if(doubled.has(where)){assert.equal(v,-2*large,where+' is two large decreases');return}if(![small,large].includes(Math.abs(v)))bad.push(where+' '+v)};
 (function walk(o,path){if(Array.isArray(o))o.forEach((x,i)=>walk(x,path+'['+i+']'));else if(o&&typeof o==='object')for(const [k,v] of Object.entries(o)){
  if(gaugeForKey[k]&&typeof v==='number'&&/effect$/i.test(path))step(gaugeForKey[k],v,path+'.'+k);walk(v,path+'.'+k)}})(story.nodes,'nodes');
 const helper={hank:'hank',amanda:'amanda',alice:'alice',luther:'luther',jer:'jericho',jericho:'jericho',north:'north',simon:'simon',josh:'josh',po:'publicSupport',si:'instability'};
 for(const [f,src] of SOURCES){for(const m of src.matchAll(/\b(hank|amanda|alice|luther|jer|jericho|north|simon|josh|po|si)\((-?\d+)\)/g))step(helper[m[1]],Number(m[2]),f+' '+m[0]);
  // Effect tables in chapter modules ({hankTrust:-1}); the engine's initial state is not a delta.
  if(MODULES.includes(f))for(const m of src.matchAll(new RegExp(`\\b(${Object.keys(gaugeForKey).join('|')}):(-?\\d+)`,'g')))step(gaugeForKey[m[1]],Number(m[2]),f+' '+m[0])}
 assert.deepEqual(bad,[]);
});

test('every ladder level has a display tone on the site, except the neutral ones',()=>{
 const neutral=new Set(['Neutral','Indifferent','Stable']);
 for(const g of GAUGES)for(const l of SCALES[g].levels)if(!neutral.has(l))assert.ok(levelTone(l),g+' '+l);
 assert.equal(levelTone('Died'),'bad');assert.equal(levelTone('Alive'),'good');assert.equal(levelTone('Never met'),'');
});
