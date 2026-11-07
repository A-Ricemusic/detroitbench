// Chapter 7, Stormy Night (Kara). Engine module; contract in benchmark/chapters/README.md.
// Specification: docs/research/ch07-stormy-night.md (chart transcription, template cross-check in section 10).
//
// The chapter is a chain of gated scenes in benchmark/chapters/ch07.json. Each scene declares `when: {ch07Next: '<its id>'}`
// and each consequence below names the scene that comes next in ch07Next (null when the chapter has ended), so a path
// visits every scene at most once and always moves forward in story order.
//
// Cross-chapter inputs (set by A New Home, chapter 4): gunDiscovered (TAKE GUN; through it the two shot-Todd endings),
// window (OPEN WINDOW). aliceBox is not read here; Battle for Detroit reads it when it meets Todd.
// Cross-chapter outputs:
//  - kara, alice: false in the five endings where Todd destroys Kara and kills Alice (karaOutcome says how).
//  - todd: false after KARA SHOT TODD or ALICE SHOT TODD (Waiting for Hank, the On the Run news, Battle for Detroit).
//  - gun: true from TAKE GUN on; a Kara who took it leaves the house only with Todd shot, so after the chapter gun is
//    true on surviving paths exactly after the two shot endings (Fugitives' gun options, On the Run's Forgot Gun).
//  - ch07Outcome: the chart's ending label (ENDINGS below).
//  - ch07Fought: Kara fought Todd off and he lived hurt (stunned upstairs or beaten off downstairs); the Todd Williams
//    page: "If Kara fought and stunned him, he will be seen with a bandage" at the police station in Waiting for Hank.
//  - ch07ToddChased: TODD CHASES KARA was played; the wiki: "If Todd chased Kara, later on at Jericho, an additional
//    flashback of Todd yelling 'YOU'RE MINE!' will play out".
// No stat moves in this chapter: the template has no arrow (no Alice, opinion or instability change).

// The chart's nine ending boxes, eight distinct labels (TODD BROKE KARA OUTSIDE is printed twice).
export const ENDINGS=Object.freeze({
 toddKillsAlice:'Todd kills Alice',karaShot:'Kara shot Todd',aliceShot:'Alice shot Todd',corridor:'Todd broke Kara in the corridor',
 foughtOut:'Kara & Alice fought their way out',downstairs:'Todd broke Kara downstairs',outside:'Todd broke Kara outside',evaded:'Kara & Alice evaded Todd',
});
// Hidden failure probabilities. None is published; all are the benchmark's values (see each scene's adaptationNote).
export const RISKS=Object.freeze({hide:0.1,window:0.25,frontDoor:0.25,fightDownstairs:0.2,yard:0.1});

export const state={ch07Next:null,ch07Exit:null,ch07Fought:false,ch07ToddChased:false,ch07Outcome:null};
// Human labels consumed by the run report through the chapter-module contract.
export const labels={ch07Outcome:'Stormy Night ending',ch07Fought:'Kara fought Todd off (he lived, hurt)',ch07ToddChased:'Todd chased Kara and Alice'};
export const rules={ENDINGS,RISKS,
 // A Kara who hid gets a second try at the fight downstairs (wiki: "Kara will be presented with the same chance to charge and
 // stun Todd downstairs. Otherwise, if Kara already stunned Todd upstairs, Kara will shut down"): two tries at the same risk.
 fightDownstairsAfterHiding:RISKS.fightDownstairs**2,
 survivals:[ENDINGS.karaShot,ENDINGS.aliceShot,ENDINGS.foughtOut,ENDINGS.evaded]};

// K04 has an entry in the engine's built-in gate table from before the rebuild; an open result here replaces it.
// The scene's own `when` (ch07Next) decides whether it plays.
export const gate={K04:()=>true};

export function available(n,s,opts,h){
 // Going in with the gun is THREATEN WITH GUN; DEFEND ALICE is the unarmed way in.
 if(n.id==='K04a'&&s.gun)return h.without(1);
 // The fight downstairs: one try after the fight upstairs, two for a Kara who hid.
 if(n.id==='K04d'&&!s.ch07Fought)return opts.map(o=>({...o,risk:rules.fightDownstairsAfterHiding}));
}

// Where the story goes once Todd has reached Alice first: TAKE GUN if the gun was seen and is not already in hand.
const afterTodd=s=>s.gunDiscovered&&!s.gun?'K04':'K04a';
const LULLABY='“Daddy isn’t angry anymore… Daddy loves you. You know Daddy loves you…”';
function dies(s,ending,why){s.kara=false;s.alice=false;s.ch07Outcome=ending;s.ch07Next=null;s.karaOutcome=why}

export function consequence(n,s,opt,choice,fail,h){
 const v=Number(choice),go=id=>{s.ch07Next=id};
 switch(n.id){
  case 'K02':if(v===1)dies(s,ENDINGS.toddKillsAlice,'{{Kara}} never broke her programming; {{Todd}} killed {{Alice}} and then destroyed {{Kara}}.');return '';
  case 'K03':
   if(v===0)go('K03u');else if(v===1)go('K03r');else if(v===2)go(afterTodd(s));
   else dies(s,ENDINGS.toddKillsAlice,'{{Kara}} broke her programming but kept out of it; {{Todd}} killed {{Alice}} and then destroyed {{Kara}}.');
   return '';
  case 'K03r':go(afterTodd(s));return '';
  case 'K03u':go(v===0?'K03b':v===1?'K04a':afterTodd(s));return '';
  case 'K03b':go(['K03c','K03e',afterTodd(s),'K03h'][v]);return '';
  case 'K03c':
   if(v===0&&!fail){go('K04r');return ''}
   go(afterTodd(s));
   return fail?'{{Kara}} pulls {{Alice}} behind a door, but {{Todd}} sees them before it closes: “What the fuck are you doing here? I gave you an order!” {{Kara}}: “No! I won’t let you hurt her!” “You won’t let me? She’s mine. I do what I want with her.” He knocks {{Kara}} down and drags {{Alice}} into her room. “No, Dad! NO!”':'';
  case 'K03e':go(v===2?'K03f':'K03h');return '';
  case 'K03f':go(v===0?'K03g':'K04c');return '';
  case 'K03g':
   if(v===1){go('K04c');return ''}
   if(fail){dies(s,ENDINGS.outside,'{{Todd}} caught {{Kara}} climbing out of {{Alice}}’s window and broke her outside; then he killed {{Alice}}.');
    return '{{Kara}} climbs out. {{Todd}} bursts in, grabs her and comes out of the window after her. She cannot shake him off. Out on the roof, in the rain, he breaks her apart. Then he turns to {{Alice}}: '+LULLABY}
   s.ch07Exit='window';go('K04z');return '';
  case 'K03h':go('K04c');return '';
  case 'K04':go('K04a');return '';
  case 'K04a':
   if(v===0)go('K04b');else if(v===1)go('K04c');
   else dies(s,ENDINGS.toddKillsAlice,'{{Kara}} reached {{Alice}}’s door but did not go in; {{Todd}} killed {{Alice}} and then destroyed {{Kara}}.');
   return '';
  case 'K04b':go('K04s');return '';
  case 'K04s':s.todd=false;s.gun=true;s.ch07Outcome=h.c('K04b')==='1'?ENDINGS.aliceShot:ENDINGS.karaShot;go(null);return '';
  case 'K04c':s.ch07Fought=true;go('K04l');return '';
  case 'K04l':go('K04h');return '';
  case 'K04h':
   s.ch07ToddChased=true;
   if(v===2){dies(s,ENDINGS.corridor,'{{Todd}} caught {{Kara}} and {{Alice}} in the upstairs corridor, broke {{Kara}} apart and killed {{Alice}}.');return ''}
   if(v===0&&!fail){s.ch07Exit='door';go('K04z');return ''}
   go('K04d');
   return fail?'{{Kara}} takes {{Alice}} and runs. Behind them {{Todd}} is getting up: “You… You bitches! Come here... You ain’t goin’ nowhere! You’re mine!” {{Alice}}: “Quick! He’s coming!” {{Kara}} fumbles with the front door, and {{Todd}} is on them in the hall. {{Alice}}: “NO! Please stop! Stop! No, Dad! NO!”':'';
  case 'K04r':
   if(v===1&&!fail){s.ch07Exit='door';go('K04z');return ''}
   go('K04d');
   return fail?'{{Alice}}: “Quick! He’s coming!” {{Kara}} fumbles with the front door, and {{Todd}} is down the stairs and on them in the hall. {{Alice}}: “NO! Please stop! Stop! No, Dad! NO!”':'';
  case 'K04d':
   if(fail){dies(s,ENDINGS.downstairs,'{{Todd}} beat {{Kara}} in the fight downstairs and broke her; then he killed {{Alice}}.');
    return '{{Todd}} is too strong. He gets {{Kara}} down on the floor and beats her until she stops moving. Then he turns to {{Alice}}: '+LULLABY}
   s.ch07Fought=true;h.learn('You fought {{Todd}} off downstairs and got away from him. He is alive.');go('K04y');return '';
  case 'K04y':
   if(fail){dies(s,ENDINGS.outside,'{{Todd}} caught {{Kara}} at the fence in the yard and broke her; then he killed {{Alice}}.');
    return '{{Kara}} cannot get {{Alice}} over the fence in time. {{Todd}} catches her in the yard and breaks her apart in the mud. Then he turns to {{Alice}}: '+LULLABY}
   s.ch07Exit='yard';go('K04z');return '';
  case 'K04z':
   if(v===1){dies(s,ENDINGS.outside,'{{Kara}} held back from the bus; {{Todd}} caught her in the street and broke her, then killed {{Alice}}.');return ''}
   s.ch07Outcome=s.ch07Fought?ENDINGS.foughtOut:ENDINGS.evaded;go(null);return '';
 }
}
