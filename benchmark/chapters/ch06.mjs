// Partners (chapter 6, Connor): Jimmy's Bar, the Ortiz house, the report to Hank and the attic.
// Specification: docs/research/ch06-partners.md (section 10 is the game's template). Scenes: benchmark/chapters/ch06.json.
//
// Flow: C05s (the bar) → C05b1, C05b2 (two picks of REASON / THREATEN / UNDERSTANDING / PERSIST) → C05a (SPILL HIS DRINK /
// BUY HIM ANOTHER DRINK / WAIT OUTSIDE) → C05c (car: PATIENT / FIRM / DIPLOMATIC) → C05d (briefing) → C05h, the crime scene,
// a repeatable scene (one thing per visit) → [C05t HANK WANTS TO GO, interrupt → C05x HANK ACCEPTS (back to C05h) or
// C05y HANK REFUSES] → C05z OUT OF TIME → C05, the five-question reconstruction (repeatable) → C05e, C05f, C05g
// (FOLLOW BLUE BLOOD TO ATTIC, SEARCH ATTIC, FOUND DEVIANT) or C05u (CRIME UNSOLVED).
//
// Hank arrows (template; small = 1, large = 2): THREATEN −1, PERSIST −1 (C05b1/C05b2, option `effect`); SPILL −2, BUY +2
// (C05a, `effect`); PATIENT +1, FIRM −1, DIPLOMATIC +1 (C05c, `effect`); HANK REFUSES −1 (C05y); OUT OF TIME −1 (C05z);
// three wrong answers −1, the full reconstruction +1 and the thirium explanation +1 (C05). Nothing else: no arrow for
// FOUND DEVIANT or for CRIME UNSOLVED itself, no Amanda, public-opinion or instability change, no risk roll.
//
// Cross-chapter outputs (read by later chapters):
//   suspect, suspectAlive    true at FOUND DEVIANT (The Interrogation's C06 gate reads `suspect`)
//   ch06DeviantFound         true at FOUND DEVIANT; false means Waiting for Hank's Amanda large down and the not-found variants
//   ch06Outcome              'FOUND DEVIANT' | 'CRIME UNSOLVED'; ch06UnsolvedBy names the route
//   ch06Drink                'spill' | 'buy' | 'wait' (Waiting for Hank's LAST NIGHT needs 'spill')
//   ch06SawWriting           INVESTIGATE WRITING (Interrogation: WRITING)
//   ch06KnowsRA9             CHECK SHOWER, the chart's CONNOR KNOWS ABOUT RA9 (Interrogation: rA9)
//   ch06SawStatue            EXAMINE STATUE, the chart's CONNOR HAVE SEEN THE STATUE (Interrogation: STATUETTE; Waiting for Hank)
//   evidence.statueMap       also set by EXAMINE STATUE: the statue is in the evidence archive for Last Chance, Connor
//   ch06Clues                every crime-scene item examined, by key (magazineSex, magazineSpy for the two magazines)
// evidence.ortizBody is not set here: the android is found alive in Partners; its body is an Interrogation outcome.

// The search clock, in actions: the game's "approximately five minutes" and Hank's "Five minutes" (counts unsourced).
// The search is complete at all 10 evidence items (the transcript's REVIEW EVIDENCE n/10 counter: the bathroom counts, at the statue;
// the flyer and the backyard do not). Three wrong answers end the report (template note).
export const rules={window:13,extension:5,evidenceNeeded:10,mistakes:3,restless:7,impatient:10,reportOffsets:[0,1,2,0,1]};

export const state={
 ch06Drink:null,ch06Firm:false,
 ch06Searching:false,ch06Phase:null,ch06Clock:0,ch06Mood:null,ch06Clues:{},ch06Evidence:0,ch06Knows:false,
 ch06QuizStep:0,ch06Mistakes:0,ch06WrongLine:0,
 ch06Outcome:null,ch06UnsolvedBy:null,ch06DeviantFound:false,
 ch06SawWriting:false,ch06KnowsRA9:false,ch06SawStatue:false,
};

export const labels={
 ch06Drink:'Hank’s drink at the bar',ch06Evidence:'Evidence reviewed (of 10)',ch06Knows:'Connor knows what happened',
 ch06Mistakes:'Wrong answers in the reconstruction',ch06Outcome:'Partners outcome',ch06DeviantFound:'Deviant found in Partners',
 ch06SawWriting:'Connor examined the writing on the wall',ch06KnowsRA9:'Connor knows about rA9',ch06SawStatue:'Connor has seen the statue',
};

// No Connor death in this chapter.
export const deathEffect={};

const reconstructed=s=>s.ch06Phase==='reconstructed'||'Connor did not reconstruct the crime for Hank.';
export const gate={
 C05t:s=>s.ch06Phase==='leaving'||'Connor finished the investigation before Hank wanted to go.',
 C05x:s=>(s.ch06Phase==='asked'&&s.ch06Drink!=='spill')||(s.ch06Phase==='asked'?'Connor spilled Hank’s drink, so Hank refused.':'Hank never wanted to go before Connor finished.'),
 C05y:s=>(s.ch06Phase==='asked'&&s.ch06Drink==='spill')||'Hank did not refuse Connor more time.',
 C05z:s=>s.ch06Phase==='outOfTime'||'Connor did not run out of time.',
 C05:s=>s.ch06Phase==='report'||'Connor never reported to Hank: the investigation ended first.',
 C05e:reconstructed,C05f:reconstructed,C05g:reconstructed,
 C05u:s=>s.ch06Outcome==='CRIME UNSOLVED'||'Connor found the deviant.',
};

// The crime scene offers only what has not been examined yet.
export function available(n,s,opts){
 if(n.id==='C05h')return opts.filter(o=>!o.item||!s.ch06Clues[o.item]);
 // Keep authored labels, correctness and spoken lines together. Rotate deterministically
 // by question, then assign the displayed position as ID: neither position nor ID
 // gives away every correct answer. Retries retain exactly the same mapping.
 if(n.id==='C05'){
  const offset=rules.reportOffsets[s.ch06QuizStep-1]??0;
  return [...opts.slice(offset),...opts.slice(0,offset)].map((o,i)=>({...o,id:String(i)}));
 }
}

const unsolved=(s,route)=>{s.ch06Searching=false;s.ch06Outcome='CRIME UNSOLVED';s.ch06UnsolvedBy=route};

function search(s,opt){
 const R=rules,it=opt.item;s.ch06Clues[it]=true;let t=opt.outcome??'';
 if(it==='report'){s.ch06Searching=false;s.ch06Phase='report';s.ch06QuizStep=1;return t}
 if(it==='writing')s.ch06SawWriting=true;
 if(it==='shower')s.ch06KnowsRA9=true;
 if(it==='statue'){s.ch06SawStatue=true;s.evidence.statueMap=true}
 if(s.ch06Knows)return t; // the clock stops once Connor knows what happened
 if(opt.evidence){s.ch06Evidence+=opt.evidence;t+=` REVIEW EVIDENCE ${Math.min(s.ch06Evidence,R.evidenceNeeded)}/${R.evidenceNeeded}.`}
 if(s.ch06Evidence>=R.evidenceNeeded){s.ch06Knows=true;s.ch06Mood='knows';return t+' INVESTIGATE CRIME SCENE: complete. {{Connor}} knows what happened here.'}
 s.ch06Clock++;
 if(s.ch06Phase==='search'){
  if(s.ch06Clock>=R.window){s.ch06Phase='leaving';s.ch06Mood=null}
  else s.ch06Mood=s.ch06Clock>=R.impatient?'impatient':s.ch06Clock>=R.restless?'restless':'calm';
 }else if(s.ch06Phase==='extension'&&s.ch06Clock>=R.extension){s.ch06Phase='outOfTime';s.ch06Searching=false}
 return t;
}

const WRONG=['“No, that can’t be right… It doesn’t fit the evidence.”','“Your story makes no sense… You’ve gotta stick to the facts.”'];
const RIGHT={
 2:'{{Hank}}: “That lines up with the evidence… Go on.”',
 3:'{{Hank}}: “So the android was trying to defend itself, right?.. Okay, then what happened?”',
 4:'{{Hank}}: “And he tried to get away from the android… All right, that makes sense…”',
};
function report(s,opt,h){
 const step=s.ch06QuizStep,line=opt.outcome;
 if(opt.correct||step===1){
  s.ch06WrongLine=0;
  if(step===1){s.ch06QuizStep=2;return opt.correct?line:line+' {{Hank}}: “I think you should look harder at the mess in the kitchen... I think that’s where it all started.”'}
  if(step<5){s.ch06QuizStep=step+1;return line+' '+RIGHT[step]}
  h.hank(1);
  const t=line+' {{Hank}}: “Ok, your theory’s not totally ridiculous… but it doesn’t tell us where the android went.” {{Connor}}: “It was damaged by the bat… and lost some thirium…” {{Hank}}: “Lost some what?” {{Connor}}: “Thirium. You call it “Blue Blood”. It’s the fluid that powers androids’ biocomponents. It evaporates after a few hours and becomes invisible to the naked eye.” {{Hank}}: “Oh… But I bet you can still see it, can’t you?” {{Connor}}: “Correct.” {{Hank}}: “Yeah…”';
  h.hank(1);s.ch06Phase='reconstructed';return t;
 }
 s.ch06Mistakes++;
 if(s.ch06Mistakes>=rules.mistakes){h.hank(-1);s.ch06Phase='failed';s.ch06WrongLine=0;unsolved(s,'FAIL TO RECONSTRUCT THE CRIME');
  return line+' {{Hank}}: “Okay, I’ve just hit my bullshit quota for the evening. There’s a killer on the loose and I’m wasting my time listening to an android… I’m outta here.” He storms out of the house.'}
 s.ch06WrongLine=s.ch06Mistakes;return line+' {{Hank}}: '+WRONG[s.ch06Mistakes-1];
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  // Bar, car: the arrows and flags are the options' `effect` and `sets`; '' keeps the pre-rebuild switch cases from running.
  case 'C05s':case 'C05b1':case 'C05b2':case 'C05a':case 'C05c':return '';
  case 'C05d':s.ch06Searching=true;s.ch06Phase='search';s.ch06Clock=0;s.ch06Mood='calm';return '';
  case 'C05h':return search(s,opt);
  case 'C05t':s.ch06Phase='asked';return '';
  case 'C05x':s.ch06Phase='extension';s.ch06Clock=0;s.ch06Mood='extension';return '';
  case 'C05y':h.hank(-1);s.ch06Phase='refused';unsolved(s,'HANK ENDS INVESTIGATION');return '';
  case 'C05z':h.hank(-1);unsolved(s,'OUT OF TIME');return '';
  case 'C05':return report(s,opt,h);
  case 'C05e':case 'C05f':return '';
  case 'C05g':s.suspect=s.suspectAlive=true;s.ch06DeviantFound=true;s.ch06Outcome='FOUND DEVIANT';s.ch06Phase='over';return '';
  case 'C05u':return '';
 }
}
