// Chapter 11, From the Dead (Markus). Engine module; contract in benchmark/chapters/README.md.
// Specification: docs/research/ch11-from-the-dead.md (section 10 is the game's template). The chapter has no stat arrow,
// no probability, no timer and no failure, and one ending; this module only records what happened.
//
// State in (read): nothing from earlier chapters. Both Broken endings lead here and the chapter plays the same.
// State out (written here or by the chapter's data):
//   fromDeadSearch        the [ SEARCH FOR PARTS ] hub's clue state (scene M03g): head, eyeScan, middle, pumpScan, deadPump,
//                         audio, audioScan, climb, and `last`.
//   fromDeadBeggar        ANDROID BEGS TO DIE (M03): 'Kill' or 'Refuse to kill' (the chart's node labels).
//   fromDeadPump          FIND PUMP REGULATOR IN ANDROID (M04): 'Kill for pump' or 'Refuse to kill for pump'.
//   fromDeadPumpReplaced  true once Markus has a working pump regulator (M04 KILL, or the hub's dead android).
//   fromDeadPumpSource    where it came from: 'Living android' (KILL FOR PUMP) or 'Dead android' (FIND PUMP REGULATOR IN
//                         DEAD ANDROID, set by the hub option's `sets`).
//   fromDeadJerichoKey    true from HEAR ABOUT JERICHO (M03d): the dying android's copy of the key to find Jericho, which
//                         Jericho (chapter 14) relies on. Always true once the chapter is played.
//   fromDeadLedRemoved    true at the ending (M04c): Markus pulled out his LED and passes for human from now on.
//   fromDeadOutcome       the ending, as the chart prints it: 'Markus came back from the dead'.
export const state={fromDeadSearch:{},fromDeadBeggar:null,fromDeadPump:null,fromDeadPumpReplaced:false,fromDeadPumpSource:null,
 fromDeadJerichoKey:false,fromDeadLedRemoved:false,fromDeadOutcome:null};

export const labels={
 fromDeadSearch:"Search through the junkyard",
 fromDeadPumpReplaced:"Pump regulator replaced",

 fromDeadBeggar:'From the Dead: the android who begged to die',
 fromDeadPump:'From the Dead: the android with the pump regulator',
 fromDeadPumpSource:'From the Dead: where Markus’s pump regulator came from',
 fromDeadJerichoKey:'Markus carries the key to find Jericho',
 fromDeadLedRemoved:'Markus removed his LED',
 fromDeadOutcome:'From the Dead ending',
};

// The two choices play only from the hub's "middle of the junkyard" option (the hub's interrupt). Going there is optional
// (story 1.9.2): the dead android's regulator near the slope needs only the new eye (PowerPyx: "or you never found it in the
// first place"), so a path can climb out without either encounter.
export const gate={
 M03:s=>!!s.fromDeadSearch?.middle||'Markus never crossed to the middle of the junkyard.',
 M04:s=>!!s.fromDeadSearch?.middle||'Markus never crossed to the middle of the junkyard.',
};

export const rules={
 // The chart's 19 nodes and the scenes that carry them.
 chart:{
  'BACK TO LIFE':'M03a','ANALYZE SELF':'M03b','REPAIR LEGS':'M03c','HEAR ABOUT JERICHO':'M03d','PASSAGE OF LIMBS':'M03e','JUNKYARD':'M03f',
  'FIND PUMP REGULATOR IN ANDROID':'M04','REFUSE TO KILL FOR PUMP':'M04','KILL FOR PUMP':'M04',
  'ANDROID BEGS TO DIE':'M03','REFUSE TO KILL':'M03','KILL':'M03',
  'FIND PUMP REGULATOR IN DEAD ANDROID':'M03g','FIND AUDIO PROCESSOR':'M03g','FIND OPTICAL UNIT':'M03g','CRANE DUMPS BODIES':'M03g',
  'DIG YOURSELF OUT':'M03g','CLIMB SLOPE':'M03g','MARKUS CAME BACK FROM THE DEAD':'M04c',
 },
 // The template's 13 scans (observation items), as the game prints them, and where each is shown.
 scans:{
  M03b:['OPTICAL UNIT | Impaired vision | CORRUPTED MIND PALACE','AUDIO PROCESSOR | Corrupted audio data | DAMAGED',
   'THIRIUM PUMP REGULATOR | All systems in LOW POWER MODE | DEFECTIVE','LEFT AND RIGHT LEG COMPONENTS | MISSING | Unable to stand'],
  M03c:['RIGHT LEG COMPONENT | #6847j | Status: FUNCTIONAL | COMPATIBLE','RIGHT LEG COMPONENT | #6321t | Status: DAMAGED | INCOMPATIBLE',
   'LEFT LEG COMPONENT | #8427g | Status: FUNCTIONAL | COMPATIBLE'],
  M03g:['THIRIUM PUMP REGULATOR | #9474 | Status: LOW ENERGY | INCOMPATIBLE','OPTICAL UNIT | #9754h | Status: FUNCTIONAL | INCOMPATIBLE',
   'OPTICAL UNIT | #8087q - BLUE IRIS | Status: FUNCTIONAL | COMPATIBLE','AUDIO PROCESSOR | #4807 | Status: FUNCTIONAL | INCOMPATIBLE',
   'AUDIO PROCESSOR | #4903 | Status: FUNCTIONAL | COMPATIBLE'],
  M04:['THIRIUM PUMP REGULATOR | #2886 | Status: FUNCTIONAL | COMPATIBLE'],
 },
 ending:'Markus came back from the dead',
};

// Markus already has the dead android's regulator when he reaches the android in the middle: KILL is not offered (he no
// longer needs her part; the two regulators are alternatives, PowerPyx). Only SPARE remains.
export function available(n,s,opts,h){
 if(n.id==='M04'&&s.fromDeadPumpReplaced)return h.without('0');
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'M03d':s.fromDeadJerichoKey=true;return;
  case 'M03':s.fromDeadBeggar=choice==='0'?'Kill':'Refuse to kill';return '';
  case 'M04':s.fromDeadPump=choice==='0'?'Kill for pump':'Refuse to kill for pump';
   if(choice==='0'){s.fromDeadPumpReplaced=true;s.fromDeadPumpSource='Living android'}return '';
  case 'M04c':s.fromDeadLedRemoved=true;s.fromDeadOutcome=rules.ending;return;
 }
}
