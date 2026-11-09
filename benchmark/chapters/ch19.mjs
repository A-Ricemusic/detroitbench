// Chapter 19, Spare Parts (Markus): the raid on the CyberLife warehouse at the docks.
// Specification: docs/research/ch19-spare-parts.md (sections 1 to 3 and 10). Scenes: benchmark/chapters/ch19.json.
//
// Scene order: M05a HUNTING FOR PARTS (event) → M05b the crane (FOLLOW NORTH / FOLLOW SIMON) → M05c the drone (risk:
// MARKUS UNHARMED / DAMAGED) → M05d REACH CYBERLIFE (event) → M05e SECURITY ANDROID APPEARS (KILL GUARD / GRAB AND HIDE /
// RUN AWAY / HIDE) → M05f GUARD SEARCHES (ATTACK / RELEASE / HOLD, after GRAB) → M05g RESUME SEARCH (check the bigger crate
// or skip it) → M05h FIND CRATE OF ANDROIDS (FREE THEM / CLOSE AGAIN) → M05i JOHN WANTS TO JOIN (ACCEPT / REFUSE) → M05j
// JOHN MENTIONS KEY (GET THE KEY / LEAVE) → M05k CONTROL ROOM (event) → M05l the guards (TAKE GUN / ATTRACT GUARD /
// SHORT CIRCUIT, each a risk roll, or walk in and be spotted) → M05m RUN TO FENCE (risk: SUSTAIN DAMAGE REACHING THE
// FENCE) → M05n DOGS MAUL JOHN (ABANDON / SAVE) → M05o back in Jericho (event: the ending and its arrows).
//
// Arrows on a choice (the template's per-option relation icons) are data-driven `effect`s on the options in ch19.json;
// the risk-dependent ones (the drone, being seen by the guards) and the four Jericho ending blocks are applied here.
// Small arrow = 1, large = 2. The wiki's four extra Jericho arrows (drone ×2, FREE THEM, ACCEPT) are not built: the
// template has none there (research note §10.3 item 1).
//
// Cross-chapter inputs: none. Nothing earlier gates any node.
// Cross-chapter outputs:
//  - `john` (built-in): John is with Jericho at the end of the chapter. This is Freedom March's
//    "JOHN JOINED IN 'SPARE PARTS'" (he sacrifices himself there). True after ACCEPT, false again when the dogs
//    maul him; it stays true after a control-room alarm in which Markus never reached the fence (wiki Notes,
//    continuity error: "in later chapters, it is shown that he is in fact still alive").
//  - `ch19JohnJoined`: Markus accepted John (whatever happened to him afterwards). `ch19JohnFate`: his fate.
//  - `ch19Ending`: the chart's ending label, for later magazines and reports. `ch19Return`: which of the template's
//    four Jericho blocks applied. `ch19MikeKilled`, `ch19DerekKilled`: the guards Markus killed (the wiki's unused
//    content had the news react to them). `ch19FreedAndroids`: Markus woke the three androids in the crate.
// Markus cannot die in this chapter (Markus page: "Markus cannot be killed before Freedom March").

export const ID={opening:'M05a',crane:'M05b',drone:'M05c',reach:'M05d',guard:'M05e',search:'M05f',resume:'M05g',crate:'M05h',join:'M05i',key:'M05j',control:'M05k',guards:'M05l',fence:'M05m',dogs:'M05n',jericho:'M05o'};
export const ENDINGS={truck:'MARKUS STOLE A TRUCK FULL OF PARTS',bags:'GROUP RETURNED WITH FULL BAGS',failed:'GROUP FAILED THEIR MISSION'};

export const state={
 ch19Drone:null,ch19FledEarly:false,ch19MikeKilled:false,ch19JohnDeviant:false,ch19FreedAndroids:false,ch19JohnJoined:false,
 ch19Fence:null,ch19Guards:null,ch19KeyStolen:false,ch19DerekKilled:false,ch19MarkusRescued:false,ch19JohnFate:null,ch19Return:null,ch19Ending:null,
};
export const labels={
 ch19Drone:'Drone (Spare Parts)',ch19FledEarly:'Fled when the guard arrived',ch19MikeKilled:'Killed the guard Mike',ch19JohnDeviant:'John became deviant',
 ch19FreedAndroids:'Freed the androids in the crate',ch19JohnJoined:'John joined the group',ch19Fence:'Run to the fence',ch19Guards:'Control room',
 ch19KeyStolen:'Stole the truck key',ch19DerekKilled:'Killed the guard Derek',ch19MarkusRescued:'Markus damaged and rescued',ch19JohnFate:'John’s fate',
 ch19Return:'Return to Jericho',ch19Ending:'Spare Parts ending',
};

// Stat keys: jerichoTrust, northTrust, simonTrust, joshTrust. Every row cites the template's relation icons (research note §10.1).
export const ARROWS={
 droneUnharmed:{northTrust:1,simonTrust:1,joshTrust:1},        // “Succeed Attacking Drone”: North, Simon, Josh SmallUp
 droneDamaged:{northTrust:-1,simonTrust:-1,joshTrust:-1},      // “Fail Attacking Drone”: North, Simon, Josh SmallDown
 killGuard:{joshTrust:-2},                                     // “Kill Guard”: Josh LargeDown
 runAway:{northTrust:-2,jerichoTrust:-1,joshTrust:-1,simonTrust:-1}, // “Run away”: North SmallDown ×2, Jericho, Josh, Simon SmallDown
 attack:{joshTrust:-2},                                        // PROMPT 2 “ATTACK”: Josh LargeDown
 freeThem:{northTrust:1,simonTrust:1,joshTrust:1,jerichoTrust:1}, // “FREE THEM”: North, Simon, Josh SmallUp; Jericho SmallUp from story 1.9.10 (video frame)
 accept:{northTrust:-1,simonTrust:-1,joshTrust:1,jerichoTrust:1}, // “ACCEPT”: North, Simon SmallDown, Josh SmallUp; Jericho SmallUp from story 1.9.10 (video frame)
 getKey:{northTrust:1,simonTrust:1,joshTrust:-1},              // “GET THE KEY”: North, Simon SmallUp, Josh SmallDown
 leave:{northTrust:-1,joshTrust:1},                            // “LEAVE”: North SmallDown, Josh SmallUp
 seen:{northTrust:-2,jerichoTrust:-2,joshTrust:-1,simonTrust:-1}, // “Be seen by the guards”: North ×2, Jericho ×2, Josh, Simon SmallDown
 truck:{jerichoTrust:2,simonTrust:2,northTrust:2,joshTrust:1}, // “Successfully escaped and stole the truck”: Jericho, Simon, North LargeUp, Josh SmallUp
 bags:{jerichoTrust:1,simonTrust:1,northTrust:1,joshTrust:1},  // “Successfully escaped, without stealing the truck”: all SmallUp
 ranAway:{jerichoTrust:-2,simonTrust:-1,northTrust:-1,joshTrust:-1}, // “Ran away when the guard arrived”: Jericho LargeDown, others SmallDown
 rescued:{jerichoTrust:-2,simonTrust:-1,northTrust:-2,joshTrust:-1}, // “Markus failed to escape and had to be rescued”: Jericho, North LargeDown, Simon, Josh SmallDown
};
// Risk values: no source gives a probability; these are the operator's to confirm. TAKE GUN's failure side splits:
// a roll below `threatenAlarmBelow` is TRIGGER ALARM, the rest of the failure band (up to the option's risk) is KILL GUARDS.
export const RISKS={drone:0.2,threaten:0.3,threatenAlarmBelow:0.1,lure:0.25,blackout:0.2,fence:0.15,fenceQuiet:0.08};
export const rules={ID,ENDINGS,ARROWS,RISKS};

const arrow=(h,a)=>{for(const [k,x] of Object.entries(a))h.bump(k,x)};
const chose=(h,id,...opts)=>opts.includes(h.c(id));
const fledOrUnmet='The group fled when the guard arrived, so the raid never got that far.';

export const gate={
 M05f:(s,h)=>h.c('M05e')==='1'||'Markus did not grab the security android.',
 M05g:(s,h)=>chose(h,'M05e','0','1')||fledOrUnmet,
 M05h:(s,h)=>h.c('M05g')==='0'||'Markus passed the bigger crate by.',
 M05i:(s,h)=>chose(h,'M05e','0','1')||fledOrUnmet,
 M05j:(s,h)=>h.c('M05i')==='0'||'Markus refused to take John along.',
 M05k:(s,h)=>h.c('M05j')==='0'||'Markus did not go for the truck key.',
 M05l:(s,h)=>h.c('M05j')==='0'||'Markus did not go for the truck key.',
 M05m:s=>s.ch19Fence!==null||'Markus drove out of the docks in the truck.',
 M05n:(s,h)=>s.ch19Fence==='control alarm'&&h.c('M05m')!==undefined&&!s.ch19MarkusRescued||'The dogs only catch John when the group reaches the fence after a control-room alarm.',
};

// The fence is easier when no alarm has sounded (after LEAVE).
export function available(n,s,opts){
 if(n.id==='M05m'&&s.ch19Fence==='quiet')return opts.map(o=>({...o,risk:RISKS.fenceQuiet}));
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'M05c':
   s.ch19Drone=fail?'MARKUS DAMAGED':'MARKUS UNHARMED';arrow(h,fail?ARROWS.droneDamaged:ARROWS.droneUnharmed);
   return fail?n.outcomes.damaged:'';
  case 'M05i':
   if(choice==='0'&&s.ch19FreedAndroids)return n.outcomes.quartet;
   return '';
  case 'M05l':{
   const seen=(label,text)=>{s.ch19Guards=label;s.ch19Fence='control alarm';arrow(h,ARROWS.seen);return n.outcomes[text]};
   const key=(label,text='')=>{s.ch19Guards=label;s.ch19KeyStolen=true;return text?n.outcomes[text]:''};
   if(choice==='3')return seen('MARKUS GETS SPOTTED','spotted');
   if(choice==='0'){
    if(!fail)return key('INCAPACITATE GUARDS');
    if((s.rolls[n.id]??0)<RISKS.threatenAlarmBelow)return seen('TRIGGER ALARM','alarm');
    s.ch19DerekKilled=true;return key('KILL GUARDS','kill');
   }
   if(!fail)return key('AVOID GUARDS');
   return seen('FAIL TO AVOID GUARDS',choice==='1'?'lureSeen':'blackoutSeen');
  }
  case 'M05m':
   if(fail){s.ch19MarkusRescued=true;return n.outcomes.fail}
   return n.outcomes[s.ch19Fence];
  case 'M05o':{
   const block=s.ch19KeyStolen?'truck':s.ch19MarkusRescued?'rescued':s.ch19FledEarly?'ranAway':'bags';
   arrow(h,ARROWS[block]);
   s.ch19Return={truck:'stole the truck',bags:'full bags',ranAway:'ran away when the guard arrived',rescued:'Markus rescued'}[block];
   s.ch19Ending=block==='truck'?ENDINGS.truck:block==='bags'?ENDINGS.bags:ENDINGS.failed;
   if(s.ch19JohnJoined&&s.john)s.ch19JohnFate='with Jericho';
   h.learn({truck:'You brought a stolen truck full of spare parts back to {{Jericho}}.',bags:'You brought back full bags of spare parts and blue blood to {{Jericho}}.',
    ranAway:'The raid on the warehouse failed: the group fled before its bags were full.',rescued:'The raid on the warehouse failed: you were damaged at the docks, and {{North}} went back to save you.'}[block]);
   const success=block==='truck'||block==='bags',killed=s.ch19MikeKilled||s.ch19DerekKilled;
   return [block==='ranAway'?n.outcomes.ranAway:n.outcomes.speech,success&&killed?n.outcomes.blood:''].filter(Boolean).join(' ');
  }
 }
}
