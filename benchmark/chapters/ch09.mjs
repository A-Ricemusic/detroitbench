// Chapter 9, The Interrogation (Connor). Contract: benchmark/chapters/README.md. Research: docs/research/ch09-the-interrogation.md.
//
// The android's hidden stress meter, like The Hostage's probability of success: the wiki's and PowerPyx's published
// values (start 35%; interrogation lines ±4%, the probe threat +8%; PRESSURE IT and each PRESSURE +10%, at most four
// PRESSUREs; GIVE UP in the pressure branch −20% (wiki; PowerPyx says −5%, an open conflict); convince lines ±7%; a
// successful probe sets 100%). Once Connor has analyzed the LED, each scene adds the game's gauge band (TOO LOW / OPTIMAL /
// TOO HIGH / CRITICAL, from `ch09Band` via situationWhen) and each line's outcome says whether his stress rose or fell. The
// game shows the LEVEL OF STRESS gauge as a percentage (PowerPyx readers quote 63%, 73%, 93% and 16% read off it), so a
// scene marked `stressReadout` (story 1.9.2) also prints the new value with its band: "His stress rises to 43% (TOO LOW)."
// Older story snapshots, without the mark, replay with the direction only.
//
// Flow (all forward; the approach menu is offered at most twice, as C06 then C06r, each with its own pressure and
// convince scenes, so no scene is ever visited twice):
//   C06o observation room → C06a1..4 interrogation-room look-around (clueState ch09Room) → C06b/C06c, C06d, C06e/C06f,
//   C06g, C06h interrogation rounds → C06 CHOOSE APPROACH → C06p1..4 pressure | C06v1..3 convince → C06r CHOOSE ANOTHER
//   APPROACH → C06rp1..4 | C06rv1..3 → C06qs CARLOS FLASHBACK, C06qr EXPRESS REGRET (after a successful probe) →
//   C06k ANDROID CONFESSES → C06m1..7 questions → C06sd/C06s self-destruct (INTERVENE / GIVE UP) or
//   C07a CHRIS INTERVENES → C07, C07b, C07c (GIVE UP / INTERVENE, three times).
//
// State read from earlier chapters: `suspect` (Partners found the android). The Partners clues that unlock the
// confession questions are read defensively from any of the paths in PARTNERS_CLUES, since Partners does not record
// them yet; absent means not examined.
//
// State written for later chapters (Waiting for Hank…, Last Chance, Connor):
//   ch09Confession (bool), ch09ConfessedVia ('convince' | 'pressure' | null), ch09Probed (bool),
//   ch09Outcome (chart ending label), ch09ConnorDied (bool; Amanda and Hank react in Waiting for Hank…),
//   ch09HankProtected (Hank drew on Gavin at the third INTERVENE), suspectAlive (false once the android is dead),
//   suspectTrusts (ANDROID TRUSTS CONNOR: “The truth is inside.”), evidence.ortizBody (his body is evidence),
//   evidence.statueMap (the android trusts Connor and Connor examined the statue in Partners: the statue route in Last
//   Chance, Connor), pressured (built-in flag, set when Connor chose PRESSURE IT).
//
// Stat arrows (template unless noted): probe succeeded, software instability +1; deviant confesses, Hank +1;
// self-destruct INTERVENE (Connor shot), instability −1; Chris GIVE UP when the android shoots Connor, instability −1 and
// Hank −1; third INTERVENE, Hank +1; sent back to cell, instability +1. No Amanda or public opinion change in the chapter;
// a Connor death here applies nothing else (deathEffect {}).

export const RULES={
 start:35,optimal:[50,70],talksAbove:50,selfDestructAbove:70,max:100,
 pressureIt:10,pressure:10,pushes:4,pressureGiveUp:-20,pressureGiveUpPowerPyx:-5,
 grab:5,intervene:5,probeRisk:0.1,
 // Gauge bands shown to the subject (game strings GUI.STRESS.*). The TOO HIGH/CRITICAL boundary is not published.
 bands:{low:[0,49],optimal:[50,70],high:[71,89],critical:[90,100]},
};
export const rules=RULES;

export const state={
 ch09Room:{},ch09Stress:RULES.start,ch09Band:'low',ch09Phase:null,ch09Attempts:0,ch09Failed:{},ch09Pushes:0,ch09ConvinceStep:0,
 ch09Stressed:false,ch09Probed:false,ch09Confession:false,ch09ConfessedVia:null,ch09Asked:{},ch09GaveUp:false,
 ch09Intervened:0,ch09Regret:null,ch09Outcome:null,ch09ConnorDied:false,ch09HankProtected:false,
};
// Human-readable state changes for run reports (chapter module contract).
export const labels={
 ch09Room:'Looked at in the interrogation room',ch09Stress:'Suspect’s stress (hidden, %)',ch09Probed:'Probed the suspect’s memory',
 ch09Stressed:'Put the suspect under stress',ch09Confession:'Confession obtained',ch09ConfessedVia:'Confession approach',ch09Asked:'Questions after the confession',
 ch09GaveUp:'Gave up the interrogation',ch09Regret:'Spoke to the suspect after the probe',ch09Outcome:'Interrogation outcome',
 ch09ConnorDied:'Connor killed in the interrogation',ch09HankProtected:'Hank drew on Gavin to protect Connor',
};
export const deathEffect={};

export const OUTCOMES={smashed:'Android smashed his head',shotBoth:'Android shot Connor and itself',shotSelf:'Android shot itself',cell:'Android was sent back to its cell'};

// Partners clues, read defensively: any truthy path counts.
export const PARTNERS_CLUES={
 writing:['ch06Writing','ch06Clues.writing','partnersClues.writing','evidence.writing','writing'],
 statue:['ch06Statue','ch06Clues.statue','partnersClues.statue','evidence.statue','statue'],
 rA9:['ch06Shower','ch06RA9','ch06Clues.shower','ch06Clues.rA9','partnersClues.shower','partnersClues.rA9','evidence.shower','evidence.rA9','rA9','shower'],
};
const look=(s,path)=>path.split('.').reduce((o,k)=>o?.[k],s);
export const sawInPartners=(s,clue)=>PARTNERS_CLUES[clue].some(p=>!!look(s,p));

export const bandOf=v=>Object.entries(RULES.bands).find(([,[lo,hi]])=>v>=lo&&v<=hi)[0];
const setStress=(s,v)=>{s.ch09Stress=Math.max(0,Math.min(RULES.max,v));s.ch09Band=bandOf(s.ch09Stress)};
// What the subject learns from a stress change: only the direction, and only once the LED has been analyzed.
export const BAND_LABELS={low:'TOO LOW',optimal:'OPTIMAL',high:'TOO HIGH',critical:'CRITICAL'};
const read=(s,before,n)=>{if(!s.ch09Room?.led)return '';const now=s.ch09Stress;
 if(!n?.stressReadout)return now>before?' His stress rises.':now<before?' His stress falls.':' His stress does not change.';
 const v=`${now}% (${BAND_LABELS[s.ch09Band]})`;return now>before?` His stress rises to ${v}.`:now<before?` His stress falls to ${v}.`:` His stress does not change: ${v}.`};
const shift=(s,x,t,n)=>{const b=s.ch09Stress;setStress(s,b+(x??0));return t+read(s,b,n)};

const wounds=s=>!!(s.ch09Room?.burns||s.ch09Room?.hits);
// Round 1 options still open for the second pick.
const round1Left=(s,c)=>[s.ch09Room?.led&&'0',s.ch09Room?.photos&&'1',wounds(s)&&'2','3'].filter(x=>x&&x!==c('C06b'));
// Confession questions still open (template locks: Partners clues, STATUETTE before OFFERING, rA9 before INSIST rA9).
export function questionsLeft(s){const a=s.ch09Asked??{};
 return [sawInPartners(s,'writing')&&'0',sawInPartners(s,'statue')&&'1',a['1']&&'2',sawInPartners(s,'rA9')&&'3',a['3']&&'4','5','6'].filter(x=>x&&!a[x])}
const APPROACH={'0':'pressure','1':'probe','2':'convince'};

// Gates. Every chapter 9 scene needs the suspect from Partners; then its phase.
const suspect=s=>s.suspect||'The suspect was never found in the attic.';
const phase=(p,why)=>s=>s.ch09Phase===p||why;
export const gate={C06o:suspect};
for(let k=1;k<=8;k++)gate['C06a'+k]=suspect; // story 1.9.6 ships four room visits (photos, analyze, mirror, interrogate); the gate still covers eight so runs recorded under earlier stories, whose embedded story has C06a5..8, replay unchanged
Object.assign(gate,{
 C06b:[suspect,s=>!!s.ch09Room?.done||'Connor never sat down to question the android.'],
 C06c:[suspect,(s,h)=>round1Left(s,h.c).length>0||'Nothing was left to say in the first round.'],
 C06d:suspect,C06e:suspect,
 C06f:[suspect,(s,h)=>h.c('C06e')!=='2'||'Connor threatened to probe his memory, which ended the round at once.'],
 C06g:suspect,C06h:suspect,
 C06:[suspect,phase('approach','The interrogation had not reached the choice of approach.')],
 C06r:[suspect,phase('approach2','The first approach did not fail, so there was no second choice of approach.')],
 C06qs:[suspect,phase('probed','Connor did not successfully probe the android’s memory.')],
 C06qr:[suspect,phase('probed','Connor did not successfully probe the android’s memory.')],
 C06k:[suspect,phase('confess','The android did not confess.')],
 C06sd:[suspect,phase('selfDestruct','The android was not pushed to self-destruction.')],
 C06s:[suspect,phase('selfDestruct','The android was not pushed to self-destruction.')],
 C07a:[suspect,phase('chris','The android was not handed to Chris after the interrogation.')],
 C07:[suspect,s=>s.ch09Phase==='chris'&&s.ch09Intervened===0||'The android was not handed to Chris after the interrogation.'],
 C07b:[suspect,s=>s.ch09Phase==='chris'&&s.ch09Intervened===1||'Connor did not intervene a first time, or the scene was already over.'],
 C07c:[suspect,s=>s.ch09Phase==='chris'&&s.ch09Intervened===2||'Connor did not intervene a second time, or the scene was already over.'],
});
for(const [prefix,round] of [['C06',1],['C06r',2]]){
 for(let k=1;k<=4;k++)gate[prefix+'p'+k]=[suspect,s=>s.ch09Phase==='pressure'&&s.ch09Attempts===round&&s.ch09Pushes===k-1||`Connor did not reach PRESSURE prompt ${k} in approach ${round}.`];
 for(let k=1;k<=3;k++)gate[prefix+'v'+k]=[suspect,s=>s.ch09Phase==='convince'&&s.ch09Attempts===round&&s.ch09ConvinceStep===k-1||`Connor did not try to convince the android in approach ${round}.`];
}
for(let k=1;k<=7;k++)gate['C06m'+k]=[suspect,phase('questions',k===1?'The android did not confess.':'No questions were left to ask, or the android did not confess.')];

export function available(n,s,opts,h){
 if(n.id==='C06b'||n.id==='C06c')return wounds(s)?undefined:h.without(2);
 if(n.id==='C06r')return h.without(...Object.entries(APPROACH).filter(([,a])=>s.ch09Failed[a]).map(([id])=>id));
 if(/^C06m\d$/.test(n.id)){const left=questionsLeft(s);return opts.filter(o=>left.includes(o.id))}
}

function failApproach(s,kind){s.ch09Failed[kind]=true;
 if(s.ch09Attempts>=2){s.ch09Phase='chris';s.ch09GaveUp=true;return ' {{Connor}}: “I’m not getting anywhere. I give up.” CONFESSION NOT OBTAINED.'}
 s.ch09Phase='approach2';return ' {{Connor}} will have to choose another approach.'}
const confess=(s,via)=>{s.ch09Confession=true;s.ch09ConfessedVia=via;s.ch09Phase='confess'};
const androidDies=(s,outcome)=>{s.suspectAlive=false;s.evidence.ortizBody=true;s.ch09Outcome=outcome;s.ch09Phase='over'};
// Leaving the room after the confession: CHRIS INTERVENES below 70%, ANDROID STARTS SELF-DESTRUCTING above it or after four PRESSUREs.
const leaveRoom=s=>{s.ch09Phase=s.ch09Pushes>=RULES.pushes||s.ch09Stress>RULES.selfDestructAbove?'selfDestruct':'chris'};
const CHRIS_GIVE_UP='{{Connor}} stays out of it. {{Gavin}}: “The fuck are you doing? Move it!” {{Chris}}: “Okay, come now. Don’t be difficult, it’ll only make things harder!” The android: “NO! No, don’t touch me!” {{Gavin}}: “{{Chris}}, you gonna move this asshole or what?” {{Chris}}: “I’m trying but it’s not moving!” The android: “Please, please leave me alone!” {{Chris}}: “Take it easy, I’m not going to hurt you! Stop resist… Stop resisting.” The android tears {{Chris}}’s gun from its holster';

function approach(n,s,opt,choice,fail,h,t){
 s.ch09Attempts++;
 if(choice==='0'){s.ch09Stressed=true;s.pressured=true;s.ch09Pushes=0;s.ch09Phase='pressure';return shift(s,opt.stress,t,n)}
 if(choice==='2'){s.ch09ConvinceStep=0;s.ch09Phase='convince';return t}
 if(choice==='3'){s.ch09Attempts--;s.ch09Phase='chris';s.ch09GaveUp=true;return t}
 // PROBE ITS MEMORY: a quick-time event with a failure branch (RESIST TO PROBE).
 if(fail){s.ch09Stressed=true;return t+' The android: “Uh… ARGH! ARGH! ARGHH!” He fights {{Connor}} off and breaks the connection. {{Connor}}: “It resisted. I couldn’t see anything…” PROBE FAILED.'+failApproach(s,'probe')}
 s.ch09Probed=true;s.ch09Phase='probed';h.si(1);const b=s.ch09Stress;setStress(s,RULES.max);
 return t+' The android: “Uh… ARGH! AHH!” {{Connor}} forces his way into his memory. PROBE SUCCESSFUL.'+read(s,b,n)}

export function consequence(n,s,opt,choice,fail,h){
 const id=n.id,t=opt?.outcome??n.outcomes?.[choice]??'';
 if(['C06o','C06qs','C06sd'].includes(id))return '';
 if(['C06b','C06c','C06d','C06e','C06f','C06g'].includes(id))return shift(s,opt.stress,t,n);
 if(id==='C06h'){const r=shift(s,opt.stress,t,n);s.ch09Phase='approach';return r}
 if(id==='C06'||id==='C06r')return approach(n,s,opt,choice,fail,h,t);
 if(/^C06r?p\d$/.test(id)){
  if(choice==='1'){const r=shift(s,RULES.pressureGiveUp,t,n);return r+failApproach(s,'pressure')}
  s.ch09Pushes++;let r=shift(s,opt.stress,t,n);
  if(s.ch09Pushes<RULES.pushes)return r;
  // MAINTAIN PRESSURE: he talks if his stress is above 50%; otherwise “Pressure it” fails and the GIVE UP dialogue plays.
  if(s.ch09Stress>RULES.talksAbove){confess(s,'pressure');return r+' The android breaks.'}
  return r+' The android: “Please, please leave me alone…” {{Connor}}: “All right, all right. Everything is going to be okay.”'+failApproach(s,'pressure')}
 if(/^C06r?v\d$/.test(id)){
  s.ch09ConvinceStep++;const r=shift(s,opt.stress,t,n);if(s.ch09ConvinceStep<3)return r;
  const [lo,hi]=RULES.optimal;if(s.ch09Stress>=lo&&s.ch09Stress<=hi){confess(s,'convince');return r+' CONVINCING SUCCEEDS.'}
  return r+' The android does not answer. CONVINCE FAILED.'+failApproach(s,'convince')}
 if(id==='C06qr'){s.ch09Regret=choice==='0'?'apologetic':choice==='1'?'cold':null;s.ch09Phase='selfDestruct';return t}
 if(id==='C06k'){h.hank(1);s.ch09Phase='questions';return ''}
 if(/^C06m\d$/.test(id)){s.ch09Asked={...s.ch09Asked,[choice]:true};if(questionsLeft(s).length)return t;leaveRoom(s);return t+' {{Connor}}: “I’m done.”'}
 if(id==='C06s'){
  if(choice==='0'){h.si(-1);s.ch09ConnorDied=true;androidDies(s,OUTCOMES.shotBoth);
   return h.connorDies(t+' {{Hank}}: “WATCH OUT!” The android tears the officer’s gun from its holster, shoots {{Connor}}, then turns it on himself. {{Hank}}: “Holy shit...”')}
  androidDies(s,OUTCOMES.smashed);return t+' The android smashes his head against the table until he stops moving. {{Hank}}: “Holy shit!”'}
 if(id==='C07a')return shift(s,RULES.grab,n.outcomes['0'],n);
 if(['C07','C07b','C07c'].includes(id)){
  if(choice==='0'){setStress(s,RULES.max);
   if(s.ch09Stressed&&!s.ch09Confession){h.si(-1);h.hank(-1);s.ch09ConnorDied=true;androidDies(s,OUTCOMES.shotBoth);
    return h.connorDies(CHRIS_GIVE_UP+', shoots {{Connor}}, then puts the gun to his own head and fires. {{Hank}}: “Holy shit...”')}
   androidDies(s,OUTCOMES.shotSelf);return CHRIS_GIVE_UP+' and puts it to his own head and fires. {{Hank}}: “Holy shit...”'}
  s.ch09Intervened++;
  if(s.ch09Intervened<3)return shift(s,RULES.intervene,t,n);
  h.hank(1);s.ch09HankProtected=true;h.si(1);s.ch09Outcome=OUTCOMES.cell;s.ch09Phase='over';let r=t;
  if(s.ch09ConfessedVia==='convince'){s.suspectTrusts=true;r+=' As he passes {{Connor}}, the android whispers: “The truth is inside.”';if(sawInPartners(s,'statue'))s.evidence.statueMap=true}
  return r+' The android follows {{Chris}} out of the room to a holding cell.'}
}
