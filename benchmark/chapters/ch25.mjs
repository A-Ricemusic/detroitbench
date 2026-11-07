// Chapter 25, Midnight Train (Kara). Rebuilt to the game's chart (PowerPyx 100% screenshots, 55 boxes) and the game's text
// (detroitbecometext template and en.json); research in docs/research/ch25-midnight-train.md.
//
// Stat arrows (template `app-relation`, wiki Relationship Changes), each small = 1:
//  KISS GOODNIGHT (K15h option 1)  Alice +1, Luther +1   data-driven `effect` in ch25.json
//  POLICEMAN FOOLED (K15y)         Alice +1, Luther +1   consequence below
// Nothing else in the chapter moves a stat. No probability and no risk roll anywhere.
//
// Three free-roam phases are repeatable clue hubs (K15l, K15q, K15u). `available` derives
// option sets from the current state; apply() commits them before the generic clue hub records the action.
// Hiding permits six actions and the door; a seventh action forces the door and adds suspicion.
// No mutation happens while rendering available options.
//
// The officer's suspicion is a hidden counter (midnightSuspicion). The game shows a meter but no source gives its values,
// and the sources disagree on what decides the noise question (see rules.suspicion and the note on K15w10).
//
// Inputs: `lutherWith` (built-in; set by Zlatko, K13). Every released path into this chapter has Luther (Zlatko's ending
// LUTHER JOINS KARA & ALICE); the template's Luther-dead variants are cut content, so without Luther the chapter is skipped
// with a reason rather than invented. Alice's state arrives through the built-in Kara gate (`alice`) and `aliceBond`.
// The magazine read in R25 (s.choices.R25) decides whether CHANGE MAGAZINE COVER is offered and what page the magazine shows.
//
// Outputs:
//  luther, lutherWith, lutherHidden  built-in; false after either Luther death (Crossroads, Battle for Detroit read them).
//  midnightOfficerDead   true in both death endings: Adam is hostile to Kara at the border in Battle for Detroit
//                        (Leaving Detroit template, condition "Luther killed the cop in Midnight Train"). Not yet read.
//  midnightOutcome       the chart's ending label: 'Luther died killing policeman' | 'Luther died saving other deviants' |
//                        'Policeman left'.
//  midnightSawMary       LET ALICE SEE MARY (true) or PREVENT ALICE SEEING MARY (false).
export const HIDE_BUDGET=7; // menus in the hide phase: six actions and the door; a seventh action is too late

export const ROSE_SLOTS=['K15l'];
export const EXPLORE_SLOTS=['K15q'];
export const HIDE_SLOTS=['K15u'];
const OFFICER=['K15w1','K15w2','K15w3','K15w4','K15w5','K15w6','K15w7','K15w8','K15w9','K15w10'];
export const SCENES=['K15a','K15b','K15c','K15d','K15e','K15f','K15g','K15h','K15i','K15j','K15k',...ROSE_SLOTS,'K15m','K15n','K15o','K15p','R25',
 ...EXPLORE_SLOTS,'K15r','K15s','K15t',...HIDE_SLOTS,'K15v',...OFFICER,'K15x','K15y'];

export const OUTCOMES={kitchen:'Luther died killing policeman',laundry:'Luther died saving other deviants',left:'Policeman left'};

export const state={
 midnightSawMary:null,
 midnightAsked:{},midnightRoseDone:false,
 midnightExplore:{},midnightExploreDone:false,
 midnightMagazine:'cover',midnightMagazineRead:false,
 midnightHide:{},midnightHidePlace:null,midnightCurtain:false,midnightHideActions:0,midnightHideLeft:HIDE_BUDGET-1,midnightDoor:null,
 midnightSuspicion:0,midnightVerdict:null,midnightOutcome:null,midnightOfficerDead:false,
};

export const labels={
 midnightSawMary:'Let Alice see Mary',midnightAsked:'Asked Rose about',midnightRoseDone:'Asked Rose about the border',
 midnightExplore:'Done while waiting for Rose',midnightExploreDone:'Stopped exploring the house',
 midnightMagazine:'Magazine open at',midnightMagazineRead:'Read the magazine',
 midnightHide:'Evidence hidden',midnightHidePlace:'Luther and Alice hiding place',midnightCurtain:'Kitchen curtain drawn',
 midnightHideActions:'Actions before the door',midnightHideLeft:'Time left before the door (actions)',midnightDoor:'Door opened',
 midnightSuspicion:'Officer’s suspicion (hidden)',midnightVerdict:'Officer suspicious or fooled',midnightOutcome:'Midnight Train outcome',
 midnightOfficerDead:'Police officer killed',
};

// Kara is the only character in the chapter; Connor never dies here.
export const deathEffect={};

const TOPIC={'0':'why','1':'many','2':'dangerous','3':'rose','4':'thanks'},BORDER='5';
const EXPLORE={'0':'luther','1':'alice','2':'alice','3':'deviants','4':'photo'},WAIT='5';
const HIDE={'0':'magazine','1':'blood','5':'curtain','6':'door','7':'clothes','8':'adam','9':'adam','10':'adam'},PLACE={'2':'upstairs','3':'laundry','4':'kitchen'},DOOR='11';

const exploreOpen=(s,id)=>{const e=s.midnightExplore;
 if(id===WAIT)return true;if(id==='1'||id==='2')return s.midnightSawMary===true&&!e.alice;return !e[EXPLORE[id]]};
const hideOpen=(s,id)=>{const h=s.midnightHide;
 if(id===DOOR)return true;if(PLACE[id])return s.midnightHidePlace===null;
 if(id==='0')return s.midnightMagazineRead&&!h.magazine;if(id==='5')return s.midnightHidePlace==='kitchen'&&!s.midnightCurtain;
 return !h[HIDE[id]]};
const exploreLeft=s=>['0','1','3','4'].some(id=>exploreOpen(s,id));

// The officer finds Luther and Alice in the pantry when they hid in the kitchen and the curtain was left open,
// or when Kara never told them where to hide (PowerPyx).
const pantryOpen=s=>s.midnightHidePlace===null||(s.midnightHidePlace==='kitchen'&&!s.midnightCurtain);

export const rules={
 hideBudget:HIDE_BUDGET,
 // Each source of suspicion counts one (sizes unsourced); the answer to the noise question adds its weight;
 // a total of `threshold` or more is POLICEMAN IS SUSPICIOUS.
 suspicion:{
  sources:{insisted:'door opened late (IGN)',article:'magazine left on the advertisement (Treat Yourself!)',blood:'blue blood found (PowerPyx)',
   clothes:'android clothes seen (PowerPyx)',upstairsLie:'NOBODY, then the noise upstairs (template)',notMine:'NOT MINE (PowerPyx recipe)',
   noCoffee:'no coffee (PowerPyx recipe)',upset:'UPSET (wiki, Adam)',laundryDoor:'laundry-room door left open (assumption)'},
  noise:{'0':2,'1':0,'2':1,'3':3}, // DOG, WASHING MACHINE, WIND, HEARD NOTHING
  threshold:3},
 outcomes:OUTCOMES,
};

const needLuther=s=>s.lutherWith||s.midnightOutcome!==null||'Luther is not with Kara. Every released path into this chapter has him (Zlatko’s ending LUTHER JOINS KARA & ALICE); the game’s versions without him are cut content.';
const officerHere=s=>s.midnightOutcome===null||'The officer is dead: the chapter ended in the kitchen.';
export const gate={
 ...Object.fromEntries(SCENES.map(id=>[id,needLuther])),
 K15w3:[needLuther,s=>!s.midnightHide.blood||'Kara closed the cupboard; the officer never sees the blue blood.'],
 K15w4:[needLuther,s=>pantryOpen(s)||'The officer never looks behind the kitchen curtain: Luther and Alice are not hiding there in plain sight.'],
 K15w5:[needLuther,officerHere],
 K15w6:[needLuther,officerHere,s=>s.midnightHidePlace==='upstairs'||'Luther and Alice are not hiding upstairs.'],
 K15w7:[needLuther,officerHere,s=>s.midnightMagazine==='ad'||'The magazine does not lie open at the advertisement.'],
 K15w8:[needLuther,officerHere,s=>!s.midnightHide.clothes||'Kara hid the android clothes.'],
 K15w9:[needLuther,officerHere],K15w10:[needLuther,officerHere],
 K15x:[needLuther,s=>s.midnightVerdict==='suspicious'||'The officer was not suspicious enough to open the laundry room.'],
 K15y:[needLuther,s=>s.midnightVerdict==='fooled'||(s.midnightVerdict==='suspicious'?'The officer did not believe Kara.':'The officer is dead: the chapter ended in the kitchen.')],
};

// clueState hubs bypass consequence(), so return data-driven sets on a copy of each option.
export function available(n,s,opts){
 if(n.id==='K15l')return opts.filter(o=>o.id===BORDER||(!s.midnightAsked[TOPIC[o.id]]&&(o.id!=='2'||s.midnightAsked.many)))
  .map(o=>({...o,...(o.id===BORDER?{sets:{midnightRoseDone:true}}:{})}));
 if(n.id==='K15q')return opts.filter(o=>exploreOpen(s,o.id)).map(o=>{
  const after={...s,midnightExplore:{...s.midnightExplore,[EXPLORE[o.id]]:true}};
  return {...o,sets:{midnightExploreDone:o.id===WAIT||!exploreLeft(after)}};
 });
 if(n.id==='K15u')return opts.filter(o=>hideOpen(s,o.id)).map(o=>{
  if(o.id===DOOR)return {...o,sets:{midnightDoor:'opened'}};
  const sets={midnightHideActions:s.midnightHideActions+1,midnightHideLeft:Math.max(0,HIDE_BUDGET-2-s.midnightHideActions)};
  let outcome=o.outcome;
  if(PLACE[o.id])sets.midnightHidePlace=PLACE[o.id];
  if(o.id==='5')sets.midnightCurtain=true;
  if(o.id==='0'){
   sets.midnightMagazine=s.midnightMagazine==='ad'?'cover':'ad';
   outcome=sets.midnightMagazine==='ad'?'{{Kara}} turns the magazine to the {{CyberLife}} advertisement.':'{{Kara}} turns the magazine back to its cover story about a war in the Arctic.';
  }
  if(sets.midnightHideActions>=HIDE_BUDGET){
   sets.midnightDoor='insisted';sets.midnightSuspicion=s.midnightSuspicion+1;
   outcome+=' Before she can do anything more, the officer pounds on the door: he will not wait any longer.';
  }
  return {...o,sets,outcome};
 });
}

const lutherDies=(s,outcome)=>{s.luther=false;s.lutherWith=false;s.lutherHidden=false;s.midnightOfficerDead=true;s.midnightOutcome=outcome};

export function consequence(n,s,opt,choice,fail,h){
 const id=n.id;
 switch(id){
  case 'K15n':s.midnightSawMary=choice==='0';return '';
  // COP AT THE DOOR: the page the magazine was left at. Reading the advertisement (or everything) leaves it open there.
  case 'K15t':{const r=s.choices.R25;s.midnightMagazineRead=['0','1','all'].includes(r);s.midnightMagazine=['1','all'].includes(r)?'ad':'cover';return ''}
  case 'K15w3':s.midnightSuspicion+=1+(choice==='2'?1:0);return '';
  case 'K15w4':lutherDies(s,OUTCOMES.kitchen);return '';
  case 'K15w5':if(choice==='1')s.midnightSuspicion++;return '';
  case 'K15w6':if(h.c('K15w1')==='1')s.midnightSuspicion++;return '';
  case 'K15w7':case 'K15w8':s.midnightSuspicion++;return '';
  case 'K15w9':if(choice==='1')s.midnightSuspicion++;return '';
  case 'K15w10':s.midnightSuspicion+=(s.midnightHide.door?0:1)+rules.suspicion.noise[choice];
   s.midnightVerdict=s.midnightSuspicion>=rules.suspicion.threshold?'suspicious':'fooled';return '';
  case 'K15x':lutherDies(s,OUTCOMES.laundry);return '';
  case 'K15y':h.alice(1);h.luther(1);s.midnightOutcome=OUTCOMES.left;return '';
 }
 return SCENES.includes(id)?'':undefined;
}
