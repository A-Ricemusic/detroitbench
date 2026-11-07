// Chapter 27, Meet Kamski (Connor). Rebuilt to the game's flowchart (PowerPyx 100% chart, 33 nodes) and the
// detroitbecometext template (docs/research/ch27-meet-kamski.md, section 10).
//
// Scenes (benchmark/chapters/ch27.json), in order:
//   C17a / C17b  the two starts: WAIT FOR HANK (Connor died in Public Enemy) or ARRIVE WITH HANK with Chris's news
//   C17c         the walk to the door (INSTINCT / LEAD / KAMSKI / CHRIS)
//   C17d         the android at the door; C17e, C17f the two lobby rounds with Hank (TALK TO HANK)
//   C17g         [ WAIT FOR KAMSKI ], a repeatable lobby scene: the photo of Amanda, the painting, a sculpture,
//                the magazines (R27, reached once the photo is analyzed), then waiting
//   C17h         the pool; C17i, C17j, C17k the three rounds with Kamski
//   C17          the Kamski test (SHOOT / DON'T SHOOT); C18 the one question (shoot path)
//   C18a / C18b  leaving the house, the two endings
//
// Arrows (template; small = 1, large = 2): Hank −1 at C17a; instability +1 on C17j DEFENSIVE, C17k DEFENSIVE and
// C17k TROUBLED (option `effect`s); SHOOT instability −2 and Hank −2; DON'T SHOOT instability +2, then Hank +2 when
// leaving (C18b `effect`). No Amanda, public opinion or other change.
//
// Cross-chapter inputs, read defensively:
//   - Connor died in Public Enemy: `ch24ConnorDied` first, then legacy `publicEnemyConnorDied`, otherwise
//     derived from the current Public Enemy scenes (C16 shield Hank; a failed C16 shot or charge; a failed C14b rush).
//   - Chris's fate: `capitolChrisDead`, then `capitolOfficers`, then legacy `capitolCopsSpared`, otherwise M16
//     (0 spared; 1 executed, 2 left to the crowd, both killed). Unknown: no news, and no CHRIS answer on the walk.
// Outputs (state flags):
//   kamskiArrival 'alone' | 'together'; kamskiAmandaPhoto (Last Chance: AMANDA'S PICTURE); kamskiChloeShot;
//   kamskiQuestion 'rA9' | 'Jericho' | 'virus' (shoot path); kamskiLocation, jerichoLocated and raid on the Jericho
//   answer (built-in keys; Last Chance skips the archive); kamskiExitHeard (both paths; Battle for Detroit's
//   Zen Garden exit); kamskiOutcome, the chart's ending label.
import {readFileSync} from 'node:fs';

export const state={kamskiArrival:null,kamskiLobby:{},kamskiAmandaPhoto:false,kamskiChloeShot:null,kamskiQuestion:null,kamskiExitHeard:false,kamskiOutcome:null};
export const labels={kamskiArrival:'Arrival at Kamski’s house',kamskiLobby:'Looked at in Kamski’s lobby',kamskiAmandaPhoto:'Saw the photo of Amanda at Kamski’s',kamskiChloeShot:'Shot Chloe in the Kamski test',kamskiQuestion:'Question asked of Kamski',kamskiLocation:'Kamski gave the key to Jericho',jerichoLocated:'Jericho located',kamskiExitHeard:'Heard Kamski’s emergency-exit remark',kamskiOutcome:'Meet Kamski ending'};
export const deathEffect={}; // Connor cannot die in this chapter.

export const ENDINGS={shot:'Hank was disappointed with Connor’s decision',spared:'Hank thought Connor made the right decision'};
export const rules={
 endings:ENDINGS,
 arrows:[
  {scene:'C17a',option:'start A',stat:'hankTrust',delta:-1,source:'template “Hank arrives alone”: ARROW Hank SmallDown; Relationship Stat'},
  {scene:'C17j',option:'1 DEFENSIVE',stat:'instability',delta:1,source:'template ARROW SoftwareInstability SmallUp'},
  {scene:'C17k',option:'1 DEFENSIVE',stat:'instability',delta:1,source:'template; Software Instability page'},
  {scene:'C17k',option:'2 TROUBLED',stat:'instability',delta:1,source:'template; Software Instability page'},
  {scene:'C17',option:'0 SHOOT',stat:'instability',delta:-2,source:'template ARROW SoftwareInstability LargeDown'},
  {scene:'C17',option:'0 SHOOT',stat:'hankTrust',delta:-2,source:'template ARROW Hank LargeDown'},
  {scene:'C17',option:'1 DON’T SHOOT',stat:'instability',delta:2,source:'template ARROW SoftwareInstability LargeUp'},
  {scene:'C18b',option:'leaving, spared',stat:'hankTrust',delta:2,source:'template “Connor didn’t shoot Chloe”: ARROW Hank LargeUp'},
 ],
};

// Public Enemy (chapter 24) as currently built: a risky option fails when its roll is below its risk.
const PUBLIC_ENEMY=(()=>{try{return JSON.parse(readFileSync(new URL('./ch24.json',import.meta.url),'utf8'))}catch{return []}})();
const failedAt=(s,id)=>{const risk=PUBLIC_ENEMY.find(n=>n.id===id)?.options?.find(o=>o.id===s.choices[id])?.risk;return typeof risk==='number'&&typeof s.rolls?.[id]==='number'&&s.rolls[id]<risk};
export function diedInPublicEnemy(s){
 if(typeof s.ch24ConnorDied==='boolean')return s.ch24ConnorDied;
 if(typeof s.publicEnemyConnorDied==='boolean')return s.publicEnemyConnorDied;
 const c16=s.choices.C16;
 return c16==='0'||(c16!==undefined&&failedAt(s,'C16'))||(s.choices.C14b==='0'&&failedAt(s,'C14b'));
}
// 'spared', 'killed' or null when Capitol Park left nothing on the path.
export function chrisFate(s){
 if(typeof s.capitolChrisDead==='boolean')return s.capitolChrisDead?'killed':'spared';
 if(s.capitolOfficers==='spared')return 'spared';
 if(['revenge','crowd'].includes(s.capitolOfficers))return 'killed';
 if(typeof s.capitolCopsSpared==='boolean')return s.capitolCopsSpared?'spared':'killed';
 const m=s.choices.M16;return m==='0'?'spared':m==='1'||m==='2'?'killed':null;
}

const GREETING={
 again:'{{Hank}}: “Still immortal, huh {{Connor}}?” {{Connor}}: “In a way.” {{Hank}}: “You know, I was hoping you wouldn’t come back.” {{Connor}}: “I’m just a machine replacing another machine, lieutenant. You shouldn’t get emotional about it.” {{Hank}}: “Fuck you.”',
 first:'{{Hank}}: “Jesus Christ…” {{Connor}}: “My predecessor was unfortunately destroyed, but {{CyberLife}} transferred its memory and sent me to replace it.” {{Hank}}: “You died in my arms... and now you’re... back here as if nothing happened... Fuck you.”',
};
const NEWS={
 killed:'{{Hank}}: “{{Chris}} was on patrol last night and he got attacked by deviants… They found his body early this morning… He was executed in cold blood with his own service weapon… He became a father three months ago… Fuck, why did it have to be him?” {{Connor}}: “I didn’t know officer {{Miller}} well, but… He seemed to be a good person…” {{Hank}}: “Yeah…” {{Connor}}: “I’m sorry, Lieutenant…”',
 spared:'{{Hank}}: “{{Chris}} was on patrol last night. He was attacked by a bunch of deviants… He said he was saved by {{Markus}} himself...” {{Connor}}: “Is {{Chris}} ok?” {{Hank}}: “Yeah, he’s in shock but,… he’s alive… What the hell…”',
};
const CHRIS_TALK={
 killed:'{{Connor}}: “I heard Officer {{Miller}} was killed by deviants last night. My condolences, lieutenant. I didn’t know him very well but... he seemed like a good person.” {{Hank}}: “He was executed in cold blood with his own service weapon… Just became a father three months ago… Fuck, why did it have to be him?”',
 spared:'{{Connor}}: “I heard Officer {{Chris}} was attacked by deviants last night.” {{Hank}}: “Yeah, he was in the wrong place at the wrong time… but he got lucky… He said that this {{Markus}} intervened to save him… He’s still in shock but... at least he’s alive…”',
};
const CHRIS_FACT={
 killed:'Officer {{Chris}}, {{Hank}}’s colleague, was attacked by deviants on patrol last night and executed with his own service weapon. He had become a father three months ago.',
 spared:'Officer {{Chris}}, {{Hank}}’s colleague, was attacked by deviants on patrol last night; he survived, and says {{Markus}} himself saved him.',
};

export const gate={
 C17a:s=>diedInPublicEnemy(s)||'Connor did not die in Public Enemy, so he arrives with Hank.',
 C17b:s=>!diedInPublicEnemy(s)||'Connor died in Public Enemy, so he waits for Hank on his own.',
 C18:(s,h)=>h.c('C17')==='0'||'Connor spared Chloe, so Kamski answers no question.',
};
export function available(n,s,opts,h){
 if(n.id==='C17c'&&!chrisFate(s))return h.without(3); // nothing to say about Chris without the Capitol Park choice
}
export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'C17a':s.kamskiArrival='alone';h.hank(-1);return s.connorDeaths>=2?GREETING.again:GREETING.first;
  case 'C17b':{s.kamskiArrival='together';const f=chrisFate(s);if(!f)return '';h.learn(CHRIS_FACT[f]);return NEWS[f]}
  case 'C17c':if(choice!=='3')return '';{const f=chrisFate(s);h.learn(CHRIS_FACT[f]);return CHRIS_TALK[f]}
  // The test and the question are handled here (their arrows and flags are data-driven), so the engine's old switch
  // cases for C17 and C18, with their Amanda changes, never run.
  case 'C17':s.kamskiChloeShot=choice==='0';return '';
  case 'C18':return '';
  case 'C18a':s.kamskiExitHeard=true;s.kamskiOutcome=ENDINGS.shot;return '';
  case 'C18b':s.kamskiExitHeard=true;s.kamskiOutcome=ENDINGS.spared;return '';
 }
 return n.type==='event'?undefined:'';
}
