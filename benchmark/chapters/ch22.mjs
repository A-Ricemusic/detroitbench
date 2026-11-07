// Chapter 22, The Bridge (Connor). Engine module; contract in benchmark/chapters/README.md.
// Spec: docs/research/ch22-the-bridge.md (section 10 settles the 29 per-option arrows, which live as data-driven
// `effect`s on the options in ch22.json). This module adds the state-dependent parts:
// - which variant of the two Traci rounds plays, from the Eden Club outcome (chapter 20);
// - the rA9 answer's lock ("Looked at rA9 clues in previous chapters");
// - PERSONAL QUESTION without the photo going straight to the SUICIDE line;
// - the ending, decided by Hank's cumulative level after the last answer (Hostile: he shoots).
//
// Inputs read (defensively, since the earlier chapters are being rebuilt in parallel):
// - Eden Club outcome: any top-level state key starting with ch20, eden or traci whose string value holds a chart
//   ending label (DEVIANTS ESCAPED, DEVIANTS DIED, CONNOR SHOT DEVIANTS, MISSION FAILED); otherwise the legacy C12
//   choice (0 = spared, 1 = won the fight and shot); with neither, the Tracis were not found.
// - knowsCole (built in, set by Russian Roulette) for PHOTO; connorDeaths (built in) for Hank's "come back" line.
// - rA9 clues: a fact naming rA9 in Connor's knowledge, or any truthy state flag whose key names rA9.
// Outputs: bridgePhoto, bridgeSuicide, bridgeRa9 (the chart's three DISCUSS nodes), bridgeFear (the chart label of the
// answer to "are you afraid to die?"), bridgeHankLevel (Hank's level when the ending was decided), bridgeOutcome
// (HANK LEFT CONNOR ALONE or HANK SHOT CONNOR) and bridgeHankShot (true: Public Enemy opens with "Why did you shoot
// me last night?" and has no coin scene; false: HANK CONFISCATES COIN; null: the chapter did not play).
import {LEVELS} from '../experience-prompt.mjs';

export const state={bridgePhoto:false,bridgeSuicide:false,bridgeRa9:false,bridgeFear:null,bridgeHankLevel:null,bridgeOutcome:null,bridgeHankShot:null};
export const labels={bridgePhoto:'The Bridge: discussed Cole’s photo',bridgeSuicide:'The Bridge: discussed Russian roulette',bridgeRa9:'The Bridge: discussed rA9',
 bridgeFear:'The Bridge: answer to “are you afraid to die?”',bridgeHankLevel:'The Bridge: Hank’s attitude when the gun came down',
 bridgeOutcome:'The Bridge: ending',bridgeHankShot:'Hank shot Connor on the bridge'};
// Hank shot Connor: Hank small down (wiki chapter page; Relationship Stat "unavoidable"). No instability (the Software
// Instability page lists no Bridge death; unconfirmed) and no Amanda change (no source).
export const deathEffect={hankTrust:-1};

const EDEN_LABELS=[['DEVIANTS ESCAPED','spared'],['CONNOR SHOT DEVIANTS','shotBack'],['DEVIANTS DIED','shotOne'],['MISSION FAILED','notFound']];
// The Eden Club outcome as one of spared, shotBack (lost the fight, shot them in the back), shotOne (won the fight and
// shot; the other killed herself) or notFound.
export function edenOutcome(s,c=id=>s.choices?.[id]){
 for(const [k,v] of Object.entries(s))if(/^(ch20|eden|traci)/i.test(k)&&typeof v==='string'){const u=v.toUpperCase();for(const [label,kind] of EDEN_LABELS)if(u.includes(label))return kind}
 const x=c('C12');return x==='0'?'spared':x==='1'?'shotOne':'notFound';
}
const RA9=/ra9/i;
export function seenRa9(s){
 if((s.knowledge?.Connor??[]).some(f=>RA9.test(f)))return true;
 for(const [k,v] of Object.entries(s)){if(k==='choices'||k==='rolls'||k==='knowledge'||k==='bridgeRa9')continue;
  if(RA9.test(k)&&v)return true;
  if(v&&typeof v==='object'&&!Array.isArray(v))for(const [k2,v2] of Object.entries(v))if(RA9.test(k2)&&v2)return true}
 return false;
}
export const hankHostile=s=>LEVELS.hank(s.hankTrust)==='Hostile';

const EDEN_WHY={spared:'Connor spared the Tracis at the club.',shotBack:'Connor shot the fleeing Tracis in the back.',shotOne:'Connor won the fight at the club and shot.',notFound:'Connor did not find the Tracis at the club.'};
const variant=(...kinds)=>(s,h)=>{const e=edenOutcome(s,h.c);return kinds.includes(e)||EDEN_WHY[e]};
export const gate={
 C13c:(s,h)=>h.c('C13b')==='0'&&s.knowsCole||'Connor did not ask a personal question, or never saw Cole’s photo (the SUICIDE line played instead).',
 C13e:variant('spared','shotBack','shotOne'),
 C13f:variant('notFound'),
 C13h:variant('spared'),
 C13i:variant('shotBack'),
 C13j:variant('shotOne'),
 C13k:variant('notFound'),
 C13n:s=>!hankHostile(s)||'Hank was Hostile after the last answer.',
 C13o:s=>hankHostile(s)||'Hank was not Hostile after the last answer.',
};
export function available(n,s,opts,h){
 if(n.id==='C13d'&&!seenRa9(s))return h.without(0);
}
const SUICIDE='“Why are you so determined to kill yourself?” {{Hank}}: “Some things, I just can’t forget… Whatever I do, they’re always there… Eating away at me… I don’t have the guts to pull the trigger… So, I kill myself a little every day… That’s probably difficult for you to understand, huh, {{Connor}}? Nothing very rational about it…”';
// Every scene of the chapter is handled here (returning '' keeps the option's or event's own outcome text), so the
// engine's legacy built-in case for C13 never runs.
export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  // Without the photo, PERSONAL QUESTION goes straight to the SUICIDE line (DISCUSS RUSSIAN ROULETTE).
  case 'C13b':if(choice==='0'&&!s.knowsCole){s.bridgeSuicide=true;return opt.outcome+' '+SUICIDE}break;
  case 'C13m':s.bridgeHankLevel=LEVELS.hank(s.hankTrust);break;
  case 'C13n':s.bridgeOutcome='HANK LEFT CONNOR ALONE';s.bridgeHankShot=false;break;
  case 'C13o':s.bridgeOutcome='HANK SHOT CONNOR';s.bridgeHankShot=true;return h.connorDies('{{Hank}} pulls the trigger and shoots {{Connor}} in the head.');
 }
 return '';
}
export const rules={
 hostileLevel:'Hostile',
 edenVariants:{spared:['C13e','C13h'],shotBack:['C13e','C13i'],shotOne:['C13e','C13j'],notFound:['C13f','C13k']},
 // The template's 29 arrows: scene -> option id -> {stat: delta}. Small = 1.
 arrows:{
  C13c:{0:{hankTrust:-1}},
  C13e:{3:{hankTrust:-1,instability:-1}},
  C13f:{0:{hankTrust:-1,instability:-1}},
  C13g:{0:{hankTrust:-1,instability:-1},1:{hankTrust:-1,instability:-1},3:{hankTrust:1}},
  C13h:{0:{hankTrust:-1},1:{hankTrust:1,instability:1}},
  C13i:{0:{hankTrust:-1,instability:-1},2:{hankTrust:-1},3:{hankTrust:-1,instability:-1}},
  C13j:{0:{instability:1},1:{hankTrust:-1,instability:-1}},
  C13:{0:{instability:1},1:{hankTrust:-1,instability:-1},2:{hankTrust:-1,instability:-1},3:{hankTrust:-1,instability:-1}},
  C13m:{0:{hankTrust:-1}},
 },
};
