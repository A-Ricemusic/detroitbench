// Russian Roulette (chapter 18, Connor): Amanda's debrief on The Nest in the garden, then Hank's house.
// Specification: docs/research/ch18-russian-roulette.md (section 10 is the game's template). Scenes: benchmark/chapters/ch18.json.
//
// Flow: C11z (EMERGE IN THE ZEN GARDEN, JOIN AMANDA: her reaction to The Nest) → C11a (PRAGMATIC / EXPLAIN / NO EXCUSE,
// only if Rupert was not caught and Connor survived) → C11b1, C11b2 (DIARY / SIGNS ON WALLS / BIRDS, two answers) →
// C11c (EXCUSE / HESITATED / LAST WORDS / EXPLAIN, only if Rupert was caught) → C11d (SAVING HANK / CONNOR'S DEATH /
// NEGATIVE / AMBIGUOUS / POSITIVE, then Amanda's closing lines) → C11e (ARRIVE AT HANK'S PLACE) → C11f, the FIND
// LT. ANDERSON checks (repeatable, ends at SPOT HANK AND BREAK IN) → C11g (ENTER HOUSE, HANK'S DOG ATTACKS, CALM or
// RILE HANK'S DOG by state) → C11h, ANALYZE HANK (repeatable scans, ends on waking him) → C11i (TAKE HANK TO THE
// BATHROOM) → C11j (RATIONAL = UNDERSTANDING ATTITUDE; AGGRESSIVE / SOLUTION / PRAGMATIC = DISTANT ATTITUDE) → C11k
// (TEASE / LEAVE) → C11l (the three shirts) → R18 (the magazines and the TV) → C11m, WAIT FOR HANK (repeatable; the
// photo is FIND PICTURE OF HANK'S SON; looking at the gun or waiting ends it) → C11n (QUESTION / SAY NOTHING, only
// after the gun) → C11o (HANK IS READY, LEFT FOR EDEN CLUB).
//
// Arrows (template; small = 1, large = 2). Amanda, at C11z: Rupert caught +2; Rupert not caught and the Partners deviant
// not found −2; Rupert not caught but the Partners deviant found: none (the wiki's small down is not in the template);
// Connor died in The Nest −1. C11a PRAGMATIC +1 (option `effect`). C11c: Amanda's "pity you let it self-destruct" −1 on
// every answer, HESITATED a further −1 (option `effect`). Hank, at C11i: −1 only if Connor died in The Nest. Nothing else:
// no instability, public-opinion or risk anywhere in the chapter, and Connor cannot die in it.
//
// Cross-chapter inputs, read defensively at C11z by nestInputs() and copied into ch18Nest, ch18SavedHank, ch18Diary,
// ch18Signs and ch18PartnersFound for the later gates:
//   The Nest (chapter 15):
//     nestOutcome      the chart's ending label: 'RUPERT NOT FOUND' | 'RUPERT GOT AWAY' | 'RUPERT COMMITTED SUICIDE' |
//                      'CONNOR DIED CHASING RUPERT' (any case). Caught = RUPERT COMMITTED SUICIDE.
//     nestSavedHank    SAVE HANK on the roof (SAVING HANK answer).
//     nestDiary   FIND DIARY (DIARY answer). Also read: evidence.rupertDiary.
//     nestSawSigns     SEE RA9 REFERENCE (SIGNS ON WALLS answer).
//     nestConnorDied   Connor died chasing Rupert (also implied by the ending label).
//   Partners (chapter 6): suspect (FOUND DEVIANT).
//   Waiting for Hank... (chapter 12): knowsSumo (asked about the dog) decides CALM or RILE HANK'S DOG.
//   Any chapter: connorDeaths > 0 unlocks CONNOR'S DEATH.
// Cross-chapter outputs:
//   knowsCole       FIND PICTURE OF HANK'S SON (The Bridge PHOTO, Night of the Soul, the tower's Cole question)
//   knowsSumo       always true after C11i (Hank shouts the dog's name)
//   ch18Roulette    LEARN HANK WAS PLAYING RUSSIAN ROULETTE (QUESTION at the gun)
//   ch18Attitude    'UNDERSTANDING ATTITUDE' | 'DISTANT ATTITUDE';  ch18Dog 'CALM HANK'S DOG' | 'RILE HANK'S DOG'
//   ch18Shirt       'TAKE HIPPY SHIRT' | 'TAKE STREAKY SHIRT' | 'TAKE STRIPY SHIRT';  ch18Outcome 'LEFT FOR EDEN CLUB'
//   ch18Nest        'caught' | 'notCaught' | 'died' (Amanda's reading of The Nest)

const NEST_ENDINGS={'RUPERT NOT FOUND':'notCaught','RUPERT GOT AWAY':'notCaught','RUPERT COMMITTED SUICIDE':'caught','CONNOR DIED CHASING RUPERT':'died'};

export const rules={
 amanda:{caught:2,doubleFailure:-2,notCaughtPartnersFound:0,died:-1,pragmatic:1,selfDestruct:-1,hesitated:-1},
 hank:{wokenAfterNestDeath:-1},
 nestEndings:NEST_ENDINGS,
};

export const state={
 ch18Nest:null,ch18PartnersFound:false,ch18SavedHank:false,ch18Diary:false,ch18Signs:false,
 ch18Door:{},ch18Scan:{},ch18House:{},
 ch18Dog:null,ch18Attitude:null,ch18Shirt:null,ch18Roulette:false,ch18Outcome:null,
};

export const labels={
 ch18Nest:'The Nest, as Amanda reads it',ch18Dog:'Hank’s dog at the window',ch18Attitude:'Attitude to Hank in the shower',
 ch18Shirt:'Shirt brought to Hank',ch18Roulette:'Learned Hank was playing Russian roulette',ch18Outcome:'Russian Roulette outcome',
 ch18Door:'Checks outside Hank’s house',ch18Scan:'Scans of Hank',ch18House:'Things looked at in Hank’s house',
};

// Connor cannot die in this chapter.
export const deathEffect={};

// What the rebuilt Nest and Partners chapters left behind.
export function nestInputs(s,c){
 const label=typeof s.nestOutcome==='string'?s.nestOutcome.toUpperCase():null;
 let nest,savedHank=!!s.nestSavedHank,diary=!!(s.nestDiary||s.evidence?.rupertDiary),signs=!!s.nestSawSigns;
 if(s.nestConnorDied)nest='died';
 else if(label&&NEST_ENDINGS[label])nest=NEST_ENDINGS[label];
 else nest='notCaught';
 return {nest,savedHank,diary,signs,partnersFound:!!s.suspect};
}

const REACTION={
 caught:'{{Amanda}}: “Congratulations, {{Connor}}, you managed to find that deviant. Tell me, what did you learn?”',
 doubleFailure:'{{Amanda}}: “Two investigations, two failures… That’s very disappointing. I expected more from our best model.”',
 notCaught:'{{Amanda}}: “That deviant seemed to be an intriguing case. A pity you didn’t manage to capture it…”',
 died:'{{Amanda}}: “The last {{Connor}} was unfortunately destroyed. Its memory has been transferred to you, but some data may have be lost in the process… I hope that you will be more careful.” {{Connor}}: “I will do my best, {{Amanda}}.” {{Amanda}}: “So, what did we learn?”',
};
const CLOSE=' {{Amanda}}: “We don’t have much time. Deviancy continues to spread. It’s only a matter of time before the media finds out about it. We need to stop this, whatever it takes.” {{Connor}}: “I will solve this investigation, {{Amanda}}. I won’t disappoint you.” {{Amanda}}: “A new case just came in. Find {{Hank}} and investigate it.”';
const DOG={
 calm:'{{Connor}}: “Argh!.. Easy!.. {{Sumo}}… I’m your friend, see?.. I know your name... I’m here to save your owner…” The dog backs off and lies down near {{Hank}}.',
 rile:'{{Connor}}: “Argh!.. Easy!.. Dog… I’m… I’m not gonna hurt you… I’m here to save your owner…” The dog backs off and lies down near {{Hank}}.',
};

export const gate={
 // The second answer needs something left to say once the first is given.
 C11b2:s=>s.ch18Diary||s.ch18Signs||'Connor had nothing more to tell Amanda.',
};

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'C11z':{const r=nestInputs(s,h.c);
   s.ch18Nest=r.nest;s.ch18SavedHank=r.savedHank;s.ch18Diary=r.diary;s.ch18Signs=r.signs;s.ch18PartnersFound=r.partnersFound;
   if(r.nest==='caught'){h.amanda(rules.amanda.caught);return REACTION.caught}
   if(r.nest==='died'){h.amanda(rules.amanda.died);return REACTION.died}
   if(!r.partnersFound){h.amanda(rules.amanda.doubleFailure);return REACTION.doubleFailure}
   // Story 1.9.10 marks C11z with `notCaughtPartnersFound` (video frame: a small down); older snapshots lack it and get none.
   h.amanda(n.notCaughtPartnersFound??rules.amanda.notCaughtPartnersFound);
   return REACTION.notCaught}
  case 'C11c':h.amanda(rules.amanda.selfDestruct);return '';
  case 'C11d':return (opt?.outcome??'')+CLOSE;
  case 'C11g':{const calm=!!s.knowsSumo;s.ch18Dog=calm?"CALM HANK'S DOG":"RILE HANK'S DOG";return calm?DOG.calm:DOG.rile}
  case 'C11i':if(s.ch18Nest==='died')h.hank(rules.hank.wokenAfterNestDeath);s.knowsSumo=true;return '';
  case 'C11o':s.ch18Outcome='LEFT FOR EDEN CLUB';return '';
 }
 // Every other decision is data-driven (option `effect`, `sets`, `fact`, `outcome`): handled, default outcome text.
 return '';
}
