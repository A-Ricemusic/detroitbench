// Waiting for Hank... (chapter 12, Connor). Scenes in ch12.json; research in docs/research/ch12-waiting-for-hank.md;
// recap in docs/ch12-waiting-for-hank-chapter-recap.html.
//
// Scenes, in story order: C08a (IN THE ZEN GARDEN, event; records the cross-chapter inputs in `ch12In`), C08c (the garden,
// repeatable: FIND MAGIC STONE, CHECK THE GRAVES, FIND AMANDA), C08d (Amanda's opening reaction, event), C08e/C08f/C08g
// (Amanda's three questions), C08h (ARRIVE AT POLICE STATION, event), R12a (reception TV), C08i (WAIT FOR HANK, repeatable:
// the station, the call, the desk clues), C08b/C08j (TALK WITH CARLOS' ANDROID, the waiting scene's interrupt, ending in
// CARLOS' ANDROID SELF-DESTRUCTS), C08k/C08l/C08m (TALK WITH GAVIN), R12 (the magazines and the break-room TV), C08n
// (HANK ARRIVES, event), C08o (follow him to Fowler's office?), C08p (HANK STORMS OUT, event), C08q (Fowler), C08r/C08s
// (TALK TO HANK), C08t (the desk topics, repeatable), C08u (EXAMINE FILES, repeatable), C08v (TALK ABOUT THE CASE), C08w
// (HANK IS MAD), C08x / C08y (the endings HANK GOT A LEAD / HANK LEFT TO GET LUNCH, events).
//
// Stat arrows (template unless noted; small = 1, large = 2):
//   C08d  Amanda: deviant not found in Partners -2; confession without dying +2; Connor died in The Interrogation -1;
//         found but no confession -1 (this module).
//   C08g  FRIENDLY Amanda -1, ADAPT -1, INDIFFERENT +1 (option effects).
//   C08b  COMPASSIONATE instability +1 (option effect).
//   R12   break-room TV public opinion -1, either variant (media effect).
//   C08n  Hank -1 if Connor died in The Interrogation (this module).
//   C08t  DOG Hank +1 (and knowsSumo), BASKETBALL -1, MUSIC +1, ANTI-ANDROIDS -1 (option effects).
//   C08w  every answer Hank -1 (wiki and PowerPyx; the template shows no icon here).
//
// Cross-chapter inputs, read once at C08a by `inputs()`. Chapters 6 (Partners) and 9 (The Interrogation) are being rebuilt
// at the same time, so inputs prefer their exported fields and retain legacy aliases and engine choices as fallbacks:
//   found        ch06DeviantFound   else s.suspect (C05 option 0)
//   spilled      ch06Drink === 'spill' else ch06SpilledDrink, then C05a option 1
//   statue       ch06SawStatue      else s.evidence.statueMap
//   confession   ch09Confession     else C06 option 0 or 1
//   died         ch09ConnorDied     else a Connor death not accounted for by The Hostage's ending (the only other chapter
//                                  that can destroy Connor before this one)
//   inCell       s.suspectAlive     else ch09AndroidInCell ("Deviant didn't die in The Interrogation")
//   intervened   s.suspectTrusts    else ch09Intervened ("Intervened and saved the deviant in The Interrogation")
//   gavinDrew    s.suspectTrusts    else ch09GavinDrew, then intervened ("Connor intervened during The Interrogation", Gavin's REFUSE line)
//   karaDead     !s.kara (Kara died in Stormy Night; nothing between Stormy Night and this chapter can kill her)
//   toddDead     !s.todd (Kara killed Todd in Stormy Night)
//   carlDead     !s.carl (Carl died in Broken)
// Chapter 9 must not apply Hank or Amanda changes for Connor's death there (its deathEffect), and chapters 6 and 9 must not
// apply Amanda changes for finding the deviant or the confession: the game applies them here, at C08d and C08n.
//
// Cross-chapter outputs:
//   knowsSumo        (built-in) true only after the DOG topic; Russian Roulette's Calm / Rile Hank's Dog reads it.
//   ch12Files        the case files read at C08u ({case1..case6: true}, plus the hub's `done` and `last`).
//   ch12CarlosFate   Carlos Ortiz's android: null (not in a cell after The Interrogation), 'not visited' (in his cell, never
//                    visited: his fate is left open, and Last Chance, Connor has no body but can use his memory), or
//                    'self-destructed' (his body goes to the evidence room; also sets suspectAlive false and evidence.ortizBody).
//   ch12Ending       the chart's ending label: 'HANK GOT A LEAD' or 'HANK LEFT TO GET LUNCH'.
//   ch12BreakRoom    whether Connor went to the break room (Gavin and the TV).

export const ENDINGS={lead:'HANK GOT A LEAD',lunch:'HANK LEFT TO GET LUNCH'};
export const AMANDA_REACTION={notFound:-2,confession:2,died:-1,noConfession:-1};
const HOSTAGE_DEATHS=['Connor died protecting Emma','Deviant shot Connor','Connor leapt for Emma and fell'];
const REACTION_FACT={
 notFound:'{{Amanda}} is disappointed that you did not find the deviant who killed that man.',
 confession:'{{Amanda}} congratulated you on the interrogation; {{CyberLife}} has asked the police to transfer the deviant to them for study.',
 died:'{{Amanda}} told you that when a {{Connor}} model is destroyed its memory passes to the next one, but some data can be lost: avoid being destroyed.',
 noConfession:'{{Amanda}} praised your investigation but said you should have been more cautious with the deviant.'};
const TRUTH=' “It said something to me: ‘The truth is inside’. I don’t know what that means… unless it was just another error in its program.”';
const CLOSE='{{Amanda}}: “More and more androids show signs of deviancy. There are millions in circulation. If they become unstable, the consequences will be disastrous. You are the most advanced prototype {{CyberLife}} has ever created. If anyone can figure out what’s happening, it’s you.” “You can count on me, {{Amanda}}.”';
const CLOSE_DIED=' “Pick up the investigation where the previous {{Connor}} left off, and put a stop to this.”',CLOSE_NOTFOUND=' “Continue your investigation and put a stop to this.”',CLOSE_END=' “Hurry, {{Connor}}. There’s little time.”';
const GAVIN_DREW=' {{Gavin}}: “If {{Hank}} hadn’t got in the way yesterday, I would’ve fucked you up for disobeying a human. Stay outta my way… ’Cause next time... you won’t get off so easy.”';
const GAVIN_OBEY=' {{Gavin}}: “When a human gives you an order, you obey. Got it? Stay outta my way… Next time, you won’t get off so easy.”';
const DESK_CLUES=['coffee','maple','donuts','cap','slogans','matches','hairs','taskForce'];

// What the chapter reads from earlier chapters (see the header). `c` is the helpers' choice lookup.
export function inputs(s,c){
 const pick=(k,f)=>typeof s[k]==='boolean'?s[k]:!!f();
 const found=pick('ch06DeviantFound',()=>s.suspect);
 const hostageDeath=HOSTAGE_DEATHS.includes(s.hostageOutcome)?1:0;
 const died=found&&pick('ch09ConnorDied',()=>s.connorDeaths-hostageDeath>0);
 const confession=found&&pick('ch09Confession',()=>['0','1'].includes(c('C06')));
 const inCell=found&&pick('suspectAlive',()=>s.ch09AndroidInCell);
 const intervened=found&&pick('suspectTrusts',()=>s.ch09Intervened);
 const gavinDrew=found&&pick('suspectTrusts',()=>pick('ch09GavinDrew',()=>intervened));
 const reaction=!found?'notFound':died?'died':confession?'confession':'noConfession';
 return {found,died,confession,inCell,intervened,gavinDrew,reaction,
  spilled:typeof s.ch06Drink==='string'?s.ch06Drink==='spill':pick('ch06SpilledDrink',()=>c('C05a')==='1'),statue:pick('ch06SawStatue',()=>s.evidence?.statueMap),
  anyDeath:s.connorDeaths>0,graves:s.connorDeaths,karaDead:!s.kara,toddDead:!s.todd,carlDead:!s.carl};
}

export const state={ch12In:null,ch12Garden:{},ch12Wait:{},ch12BreakRoom:false,ch12Topics:{},ch12Files:{},ch12CarlosFate:null,ch12Ending:null};
export const labels={ch12Garden:'Done in the zen garden',ch12Wait:'Done while waiting for Hank',ch12BreakRoom:'Went to the break room',ch12Topics:'Asked Hank about',ch12Files:'Case files read',ch12CarlosFate:'Carlos’ android after Waiting for Hank',ch12Ending:'Waiting for Hank ending'};
export const deathEffect={};   // Connor cannot die in this chapter
export const rules={ENDINGS,AMANDA_REACTION,HANK_ARRIVAL_IF_DIED:-1,HANK_IS_MAD:-1,TOPICS:{dog:1,basketball:-1,music:1,antiAndroids:-1,fowler:0,hours:0,work:0},AMANDA_APPROACH:{FRIENDLY:-1,ADAPT:-1,INDIFFERENT:1,'DON’T KNOW':0},COMPASSIONATE:1,BREAK_ROOM_TV:-1,DESK_CLUES};

// The media items' `when` names for R12: the break-room report exists only after the break room, in its Partners variant.
export const mediaWhen={
 ch12TvFound:s=>!!s.ch12BreakRoom&&!!s.ch12In?.found,
 ch12TvNotFound:s=>!!s.ch12BreakRoom&&!!s.ch12In&&!s.ch12In.found,
};
// C08b also has an entry in the engine's built-in gate table (s.suspectAlive, from before the rebuild); the scene's own
// `when` already decides, so this open result replaces that entry.
export const gate={C08b:()=>true};
// LEARN ABOUT HANK follows EXAMINE HANK'S DESK: the terminal research appears once any desk item has been scanned.
export function available(n,s,opts,h){
 if(n.id==='C08i'&&!DESK_CLUES.some(k=>s.ch12Wait?.[k]))return opts.filter(o=>o.clue!=='research');
}
export function consequence(n,s,opt,choice,fail,h){
 const I=()=>s.ch12In??(s.ch12In=inputs(s,h.c));
 switch(n.id){
  case 'C08a':s.ch12In=inputs(s,h.c);return '';
  case 'C08d':{const r=I().reaction;h.amanda(AMANDA_REACTION[r]);h.learn(REACTION_FACT[r]);return ''}
  case 'C08e':return choice==='2'&&I().confession?opt.outcome+TRUTH:'';
  case 'C08g':return opt.outcome+' '+CLOSE+(I().died?CLOSE_DIED:!I().found?CLOSE_NOTFOUND:'')+CLOSE_END;
  case 'C08j':s.ch12CarlosFate='self-destructed';s.suspectAlive=false;s.evidence.ortizBody=true;
   h.learn('The android you interrogated destroyed himself in his cell, smashing his head against the window, rather than be taken away and analyzed.');return '';
  case 'C08m':return choice==='0'?'':opt.outcome+(I().gavinDrew?GAVIN_DREW:GAVIN_OBEY);
  case 'C08n':if(I().died)h.hank(-1);if(I().inCell&&!s.ch12CarlosFate)s.ch12CarlosFate='not visited';return '';
  case 'C08p':if(h.c('C08o')==='0')h.learn('Captain {{Fowler}} has assigned {{Hank}} every case involving androids, with you as his partner: “Either you do your job or you hand in your badge.”');return '';
  case 'C08x':s.ch12Ending=ENDINGS.lead;h.learn(`An AX400, the android that ${I().toddDead?'killed':'attacked'} a man last night, has been seen in the Ravendale district; {{Hank}} is on it.`);return '';
  case 'C08y':s.ch12Ending=ENDINGS.lunch;return '';
 }
 return '';   // every other chapter 12 scene: the option's or event's own outcome text; never the engine's built-in switch
}
