import {THRESHOLDS} from '../scales.mjs';
// Public Enemy (chapter 24, Connor). Scenes in ch24.json; research in docs/research/ch24-public-enemy.md (section 10 is
// the template cross-check this module follows).
//
// Shape of the chapter (the game's 70-node chart, internal id 09C):
//  - Zen Garden: C14z (FALL IN THE ZEN GARDEN), then Amanda's four rounds C14z1 (HANK / EDEN CLUB), C14z2 (SINCERE /
//    DETERMINED / COLD / TROUBLED), C14z3 (TOO FAR / NO USE / TRUTH, only if the Tracis were spared), C14z4 (CONFLICTED /
//    CONFIDENT / INDIFFERENT).
//  - The tower: C14e (INSIDE STRATFORD TOWER, with HANK CONFISCATES COIN or the "why did you shoot me" exchange), C14f
//    (LISTEN TO BRIEFING), C14g (the INVESTIGATE CORRIDORS hub), C14h (MEET PERKINS), C14i (MEET COP FROM HOSTAGE SITUATION).
//  - C14: the INVESTIGATE BROADCAST ROOM hub, which is also the free-roam crossroads: GO TO ROOFTOP (0), ENTER THE
//    KITCHEN (1), DECIDE TO LEAVE (2), and the room's clues. C14y is Hank's YES/NO; NO returns to C14.
//  - Roof: C14r (INVESTIGATE ROOFTOP hub; FIND SIMON is an exit), C14r2 (back down; returns to C14), C14b (CHARGE DEVIANT
//    with a risk roll for SHOT BY SIMON / REACH SIMON, or STAY IN COVER).
//  - Kitchen: R24 (the two magazines), C15a/C15b (rounds 1 and 2), C15c (QUESTION ANDROIDS AGAIN without CHECK CAMERA;
//    returns to C14), C15 (round 3), C15d (which android), C15e (round 4: FIND DEVIANT or DEVIANT NOT FOUND), C15f
//    (DEVIANT ATTACKS), C15g (REMOVE KNIFE or OUT OF TIME, a risk roll), C15h (CHASE DEVIANT or LOSE TOO MUCH TIME),
//    C16 (ATTACK / SAVE HANK / TAKE GUN).
//  - Eight ending events, one per chart ending, at the end of the chapter (C14x1..C16x2).
//
// Routing: `ch24Phase` says where Connor is. Every scene after C14 is gated on it, and the scenes that go back to the
// broadcast room (C14y, C14r2, C15c) carry `returnTo: "C14"`; when the chapter is over the phase is 'over', C14 is blocked
// and the cursor runs forward through the blocked scenes to the ending event. A run therefore sees the roof
// confrontation or the kitchen one, never both: each ends the chapter.
//
// Stat arrows (small = 1, large = 2), from the chapter template unless noted:
//   EDEN CLUB: Amanda −1 if the Tracis were not found or were let go, +1 if they died. SINCERE Amanda −1. COLD SI −1.
//   TROUBLED SI +1, Amanda −1. TRUTH Amanda −2. CONFLICTED SI +1. CONFIDENT Amanda +1. INDIFFERENT SI −1, Amanda +2.
//   DETERMINED, TOO FAR, NO USE, HANK: none (the template wins over the wiki's and PowerPyx's Amanda arrows).
//   REACH SIMON SI +2. ATTACK Public Opinion −1, SI +2 (one PO arrow, not the wiki's two). SAVE HANK Public Opinion −1,
//   Hank +2. TAKE GUN Hank +2. OUT OF TIME (Connor shut down) SI −1, Hank −1.
//   Every Connor death here also applies `deathEffect` (SI −1). For CONNOR SHUT DOWN that is the template's own SI arrow;
//   for CONNOR DIED RUNNING TOWARD SIMON and CONNOR SACRIFICED HIMSELF FOR HANK the template has no SI arrow but the wiki's
//   chapter page and its Software_Instability page list SI down for both; the reliability log in docs/research/SOURCES.md
//   says to prefer the wiki's ending-level arrow on death outcomes, so it is applied and flagged for the operator.
//   Not built (template silent; PowerPyx only): SI +2 and PO −1 on LOSE TOO MUCH TIME, PO −1 per cop death.
//   The Hank small down for a Connor death in this chapter belongs to the start of Meet Kamski (wiki), read there from
//   `ch24ConnorDied`.
//
// Cross-chapter inputs are read defensively by readInputs: chapter 20's edenTracis/edenOutcome,
// chapter 22's bridgeHankShot, and chapter 23's stratford* exports take priority over chNN aliases
// and the original engine's choices. Enum translations and nullable defaults are handled below.
// The saved terrace officer is C03 option 0; prior Connor deaths select his recognition dialogue.
//
// Cross-chapter outputs:
//   simon (built-in): false once Connor finds him (every Simon ending). simonHidden: false when the chapter ends.
//   evidence.simonBody (Simon found), evidence.simonTablet (REACH SIMON: FLASH FROM SIMON'S MEMORY), evidence.kitchenBody
//   (SWAT DESTROYS DEVIANT, DEVIANT SELF-DESTRUCTS or SHOOT DEVIANT): the Last Chance, Connor evidence routes.
//   ch24Ending (chart label), ch24SimonSurvived (left on the roof and never found: SIMON SURVIVED IN 'PUBLIC ENEMY'),
//   ch24SimonFound, ch24JerichoMemory, ch24ProtectedHank (SAVE HANK: Last Chance's "You protected me" line),
//   ch24ConnorDied (Meet Kamski), ch24Coin (HANK CONFISCATES COIN), ch24Wilson ('notSaved' | 'alive' | 'killed' |
//   'rescued'), ch24DeviantFound.
//
// This module overrides the engine's built-in C14, C14b and C16 cases (each consequence returns a string), its C14b, C15
// and C16 gates (every scene has a module gate) and its C14 option removal (`available` rebuilds C14's list). Those
// built-in entries can be deleted from benchmark/story-engine.mjs when the chapters are merged.

export const ENDINGS={
 left:'CONNOR AND HANK LEFT THE CRIME SCENE',diedSimon:'CONNOR DIED RUNNING TOWARD SIMON',traumatized:'CONNOR WAS TRAUMATIZED',
 unscathed:'HANK AND CONNOR SURVIVED UNSCATHED',shutDown:'CONNOR SHUT DOWN',survived:'CONNOR AND HANK SURVIVED',
 sacrificed:'CONNOR SACRIFICED HIMSELF FOR HANK',massacre:'MASSACRE PREVENTED'};
// Ending event scene for each ending, in chart order.
export const ENDING_SCENES={C14x1:ENDINGS.left,C14x2:ENDINGS.diedSimon,C14x3:ENDINGS.traumatized,C14x4:ENDINGS.unscathed,
 C15x1:ENDINGS.shutDown,C15x2:ENDINGS.survived,C16x1:ENDINGS.sacrificed,C16x2:ENDINGS.massacre};
export const DEVIANT='0';   // C15d: the android on the left, nearest the counter (wiki, PowerPyx)
export const DEATH_EFFECT={instability:-1};
const HOSTAGE_DEATHS=['Connor died protecting Emma','Deviant shot Connor','Connor leapt for Emma and fell'];

export const state={
 ch24In:null,ch24Phase:null,ch24Corridor:{},ch24Room:{},ch24Roof:{},
 ch24KitchenVisited:false,ch24KitchenPaused:false,ch24Target:null,
 ch24Ending:null,ch24Coin:false,ch24SimonFound:false,ch24SimonSurvived:false,ch24JerichoMemory:false,
 ch24ProtectedHank:false,ch24ConnorDied:false,ch24Wilson:null,ch24DeviantFound:null};
export const labels={
 ch24In:"Earlier events at Stratford Tower",
 ch24Phase:"Investigation at Stratford Tower",
 ch24Corridor:"Corridor examined",
 ch24Room:"Broadcast room examined",
 ch24Roof:"Roof examined",
 ch24KitchenVisited:"Connor visited the kitchen",
 ch24KitchenPaused:"Connor paused in the kitchen",
ch24NoOnce:'Took a second look at the broadcast room',
 ch24Ending:'Public Enemy ending',ch24Coin:'Hank confiscated the coin',ch24SimonFound:'Connor found Simon on the roof',
 ch24SimonSurvived:'Simon survived on the roof',ch24JerichoMemory:'Connor saw Jericho in Simon’s memory',
 ch24ProtectedHank:'Connor protected Hank at the tower',ch24ConnorDied:'Connor died in Public Enemy',
 ch24Wilson:'Officer Wilson (saved in The Hostage)',ch24DeviantFound:'The kitchen deviant was found',ch24Target:'Android Connor confronted'};
export const deathEffect=DEATH_EFFECT;
export const rules={ENDINGS,ENDING_SCENES,DEVIANT,DEATH_EFFECT,risks:{charge:0.3,knife:0.2,call:0.35,chase:0.1},hankSurvivalReadout:'40%'};

// The chapter's inputs, read once at the start (C14z) and kept in `ch24In` so scene conditions can name them.
export function readInputs(s,hankHostile=THRESHOLDS.HANK_HOSTILE){
 const c=id=>s.choices?.[id];
 const enumValue=(map,...values)=>values.map(v=>Object.hasOwn(map,v)?map[v]:undefined).find(v=>v!==undefined);
 const bool=(...values)=>values.find(v=>typeof v==='boolean');
 const tracis=enumValue({notFound:'notFound',escaped:'spared',spared:'spared',dead:'died',died:'died'},s.edenTracis)
  ??enumValue({'MISSION FAILED':'notFound','DEVIANTS ESCAPED':'spared','DEVIANTS DIED':'died','CONNOR SHOT DEVIANTS':'died'},s.edenOutcome)
  ??enumValue({notFound:'notFound',spared:'spared',died:'died'},s.ch20Tracis)
  ??(c('C12')==='0'?'spared':c('C12')==='1'?'died':'notFound');
 const bridgeShot=bool(s.bridgeHankShot,s.ch22HankShotConnor)??(c('C13')!==undefined&&s.hankTrust<=hankHostile);
 const copSaved=c('C03')==='0',hostageDeath=HOSTAGE_DEATHS.includes(s.hostageOutcome);
 const copMemory=s.connorDeaths===0?'remembers':hostageDeath&&s.connorDeaths===1?'diedInHostage':'diedAfter';
 const guards=enumValue({knockedOut:'knockedOut',northAttacks:'northAttacks',phoneShot:'phoneShot',weaponShot:'armedShot'},s.stratfordGuards)
  ??enumValue({knockedOut:'knockedOut',phoneShot:'phoneShot',armedShot:'armedShot'},s.ch23Guards)
  ??(c('M10')==='1'?'armedShot':'knockedOut');
 const phoneKicked=typeof s.stratfordGuards==='string'&&['knockedOut','northAttacks','phoneShot','weaponShot'].includes(s.stratfordGuards)
  ?['weaponShot','northAttacks'].includes(s.stratfordGuards):bool(s.ch23PhoneKicked)??guards==='armedShot';
 const employeeShot=bool(s.stratfordOperatorShot)
  ??enumValue({none:false,guard:false,operator:true,both:true},s.stratfordKilled)
  ??bool(s.ch23OperatorShot)??(c('M11')==='0');
 const simonFate=enumValue({escaped:'escaped',leftOnRoof:'roofHidden',executed:'roofKilled',killedBySwat:'roomKilled'},s.stratfordSimonFate)
  ??enumValue({escaped:'escaped',roofHidden:'roofHidden',roofKilled:'roofKilled',roomKilled:'roomKilled'},s.ch23SimonFate)
  ??(!s.simon?(c('M14')==='1'?'roofKilled':'roomKilled'):s.simonHidden?'roofHidden':'escaped');
 const swat=bool(s.stratfordSwat,s.stratfordAlarm,s.ch23Swat)??!!s.simonWounded;
 const simonWounded=!!s.simonWounded||simonFate!=='escaped';
 return {tracis,bridgeShot,copSaved,copMemory,guards,phoneGuardShot:guards==='phoneShot',armedGuardShot:guards==='armedShot',
  guardsAttacked:guards==='phoneShot'||guards==='armedShot',phoneKicked,employeeShot,swat,simonWounded,simonFate,
  simonOnRoof:simonFate==='roofHidden',simonDead:simonFate==='roofKilled'||simonFate==='roomKilled',
  simonDiedRoof:simonFate==='roofKilled',simonDiedRoom:simonFate==='roomKilled',
  // ANALYZE BLUE BLOOD ON WALL: SWAT stormed and Simon was helped toward the roof (PowerPyx).
  wallBlood:swat&&simonWounded&&simonFate!=='roomKilled',roofBlood:simonFate==='roofHidden'||simonFate==='roofKilled',
  markusShot:bool(s.stratfordMarkusShot,s.ch23MarkusShot)??false};
}

const phase=p=>s=>s.ch24Phase===p||'Connor is elsewhere in the tower, or the chapter has ended.';
const once=id=>s=>s.choices[id]===undefined||'Already played.';
export const gate={
 C14z3:s=>s.ch24In?.tracis==='spared'||'Connor did not spare the Tracis at the Eden Club, so Amanda does not ask why he did not shoot.',
 C14g:phase('corridor'),C14h:phase('perkins'),
 C14i:[s=>s.ch24In?.copSaved||'The officer on the terrace was not saved in The Hostage.',once('C14i')],
 C14:phase('room'),C14y:phase('leave'),C14r:phase('roof'),C14r2:phase('roofDown'),C14b:phase('simon'),
 R24:[phase('kitchen'),once('R24')],C15a:[phase('kitchen'),once('C15a')],C15b:[phase('kitchen'),once('C15b')],
 C15c:[phase('kitchen'),s=>!s.ch24Room.camera||'Connor has checked the camera recording.'],
 C15:[phase('kitchen'),s=>!!s.ch24Room.camera||'Connor has not checked the camera recording.'],
 C15d:phase('kitchen'),C15e:phase('kitchen'),C15f:phase('attack'),C15g:phase('attack'),C15h:phase('chase'),C16:phase('corridorFight'),
 ...Object.fromEntries(Object.entries(ENDING_SCENES).map(([id,label])=>[id,[s=>s.ch24Ending===label||'The chapter did not end this way.',once(id)]])),
};

// C14: the engine's built-in filter drops option 0 unless Simon is hidden; the roof can be visited on every path, so the
// list is rebuilt from the scene's own options: requirements and visited clues, then the kitchen rule (a second visit only
// once the camera recording has been checked).
export function available(n,s,opts,h){
 if(n.id!=='C14')return;
 return n.options.filter(o=>h.meets(o.requires,s)&&!(o.clue&&s.ch24Room[o.clue])&&(o.id!=='1'||!s.ch24KitchenVisited||s.ch24Room.camera)).map(o=>({...o}));
}

const wilsonKilled=s=>{if(s.ch24In?.copSaved){s.ch24Wilson='killed';return true}return false};
const COP_DEAD=' The officer {{Connor}} saved on the terrace is among the dead.';
export function consequence(n,s,opt,choice,fail,h){
 const I=s.ch24In;
 switch(n.id){
  case 'C14z':s.ch24In=readInputs(s,h.constants.HANK_HOSTILE);s.ch24Wilson=s.ch24In.copSaved?'alive':'notSaved';return '';
  case 'C14z1':
   if(choice==='0')return I.bridgeShot?'{{Connor}}: “I’m having difficulties with Lieutenant {{Anderson}}. He’s unstable, even hostile. He shot me in the head last night…”'
    :'{{Connor}}: “My relationship with Lieutenant {{Anderson}} is problematic. He continues to struggle with psychological issues… I suspect it clouds his judgement regarding deviants.” {{Amanda}}: “Nothing matters more than your investigation. What’s happening is too important. Don’t let {{Anderson}} or anyone else get in your way.”';
   if(I.tracis==='died'){h.amanda(1);return '{{Connor}}: “I found two deviants at the {{EdenClub}}… I hoped to learn something but… I had to destroy them…”'}
   h.amanda(-1);
   return I.tracis==='spared'?'{{Connor}}: “I found two deviants at the {{EdenClub}}… I hoped to learn something but… they managed to escape…” {{Amanda}}: “That’s too bad... You seemed so close to stopping them.”'
    :'{{Connor}}: “I went to the {{EdenClub}}… but I didn’t learn anything new…” {{Amanda}}: “That’s disappointing. Looks like another missed opportunity.”';
  case 'C14e':s.ch24Coin=!I.bridgeShot;if(s.ch24Coin)h.learn('In the elevator {{Hank}} took your coin away from you and put it in his pocket.');return '';
  case 'C14f':{s.ch24Phase='corridor';if(choice!=='0')return '';
   const t=[opt.outcome];
   t.push(I.guardsAttacked?'{{Chris}}: “They attacked two guards in the hallway. They knocked one out and shot the other in cold blood…”':'{{Chris}}: “They attacked two guards in the hallway... They probably thought the androids were coming to do maintenance. They got taken down before they could react…”');
   t.push(I.employeeShot?'“A station employee… shot to the back as he was trying to get away. One bullet straight through the heart, from fifty feet… Now, that’s the kind of shooting only an android could do.”':'“One of the station employees managed to get away. He’s in shock, not sure when we’ll be able to talk to him…”');
   t.push('{{Hank}}: “How many people were working here?” {{Chris}}: “Just two employees and three androids. The deviants took the humans hostage and broadcast their message live. They made their getaway from the roof.” {{Hank}}: “The roof?” {{Chris}}: “Yeah, they jumped with parachutes… We’re still trying to figure out where they landed, but the weather’s not helping…”');
   if(I.simonDiedRoom)t.push('“One of the deviants… SWAT took it out. It’s a pity they couldn’t manage to capture it alive.”');
   if(I.simonDiedRoof)t.push('“We found the body of an android on the rooftop… Not sure what happened. Maybe it got wounded- I mean damaged, and couldn’t make the jump.”');
   t.push('“If you want to take a look at the video broadcast by the deviants, it’s on that screen over there.”');
   h.learn('Briefing on the 79th floor: four well-organized androids who knew the building; '+(I.guardsAttacked?'they knocked out one guard and shot the other':'they took down both guards')+'; '+(I.employeeShot?'they shot a fleeing employee in the back':'one employee got away')+'; they took the two employees hostage, broadcast their message live and escaped from the roof by parachute'+(I.simonDiedRoom?'; SWAT destroyed one of them':'')+(I.simonDiedRoof?'; an android’s body was found on the roof':'')+'.');
   return t.join(' ')}
  case 'C14h':s.ch24Phase='room';return '';
  case 'C14y':if(choice==='0'){s.ch24Phase='over';s.ch24Ending=ENDINGS.left}else{s.ch24Phase='room';if((n.leaveRules??1)>=2)s.ch24NoOnce=true}return '';
  case 'C14r2':s.ch24Phase='room';return '';
  case 'C14b':{s.ch24Phase='over';s.ch24SimonFound=true;s.simon=false;s.simonHidden=false;s.evidence.simonBody=true;
   if(choice==='1'){s.ch24Ending=ENDINGS.unscathed;return ''}
   if(fail){s.ch24Ending=ENDINGS.diedSimon;s.ch24ConnorDied=true;
    return h.connorDies('{{Connor}} breaks cover and runs at the unit through the crossfire, but he cannot dodge every shot: the android’s bullet hits him in the head and he goes down. The SWAT team riddles the unit and destroys the android inside.')}
   s.ch24Ending=ENDINGS.traumatized;s.ch24JerichoMemory=true;s.evidence.simonTablet=true;h.si(2);
   h.learn('Connected to the memory of the android on the roof when it shot itself, you felt it die, as if you were dying, and you were scared. In its memory you saw a word painted on a piece of rusty metal: “{{Jericho}}”.');
   return '{{Connor}} dodges through the crossfire, reaches the unit, grabs the wounded android and connects to its memory. In the middle of the probe the android puts its gun to its own head and fires.'}
  case 'C15c':s.ch24Phase='room';s.ch24KitchenPaused=true;return '';
  case 'C15e':{const found=s.ch24Target===DEVIANT;s.ch24DeviantFound=found;
   if(found){s.ch24Phase='attack';return ''}
   s.ch24Phase='over';s.ch24Ending=ENDINGS.left;
   return opt.wrong+' NO DEVIANT AMONG THEM. {{Connor}} gives up on the three androids; as he turns away, the android on the left watches him go, wide-eyed. {{Connor}} goes to {{Hank}}: “I think we have seen everything there is to see.” {{Hank}}: “You wanna go?” {{Connor}}: “Yes.” {{Hank}}: “Ok, we’re outta here.”'}
  case 'C15g':
   if(!fail){s.ch24Phase='chase';return ''}
   s.ch24Phase='over';s.ch24Ending=ENDINGS.shutDown;s.ch24ConnorDied=true;h.hank(-1);
   return h.connorDies((choice==='1'?'{{Connor}}: “{{Hank}}!.. {{Hank}}, I need help!..” Nobody hears him in time. ':'')+'{{Connor}} tears his hand free of the knife and crawls across the floor toward the regulator, but the countdown reaches zero before he can push it back into his chest.');
  case 'C15h':
   if(choice==='0'&&!fail){s.ch24Phase='corridorFight';return ''}
   s.ch24Phase='over';s.ch24Ending=ENDINGS.survived;s.evidence.kitchenBody=true;
   return (choice==='0'?'{{Connor}} runs after it but takes the wrong way through the floor. ':'{{Connor}} stays where he is until his systems settle. ')+'By the time he reaches the corridor it is over. The deviant took an assault rifle from a SWAT officer and opened fire down the hallway, killing the officers, agents and technicians in its path; only {{Hank}} and {{Chris}} are still standing. The SWAT team has destroyed it, and {{Hank}} stands over it with his gun in his hand.'+(wilsonKilled(s)?COP_DEAD:'');
  case 'C16':{s.ch24Phase='over';s.evidence.kitchenBody=true;
   if(choice==='0'){s.ch24Ending=ENDINGS.survived;return opt.outcome+(wilsonKilled(s)?COP_DEAD:'')+' Before {{Connor}} can reach it, the deviant puts the rifle under its own chin and pulls the trigger.'}
   if(choice==='1'){s.ch24Ending=ENDINGS.sacrificed;s.ch24ProtectedHank=true;s.ch24ConnorDied=true;return h.connorDies(opt.outcome+(wilsonKilled(s)?COP_DEAD:''))}
   s.ch24Ending=ENDINGS.massacre;if(I.copSaved)s.ch24Wilson='rescued';
   return opt.outcome+(I.copSaved?' The officer {{Connor}} saved on the terrace was standing in the line of fire; he is unhurt.':'')}
 }
 if(ENDING_SCENES[n.id]){s.simonHidden=false;s.ch24SimonSurvived=!!I?.simonOnRoof&&!s.ch24SimonFound;return ''}
}
