// Chapter 23, The Stratford Tower (Markus). Engine logic for the scenes in ch23.json; contract in README.md.
// Specification: docs/research/ch23-the-stratford-tower.md, section 10 (the detroitbecometext template) for every
// prompt, label and arrow; the PowerPyx chart for node order; the wiki where the template is silent.
//
// The alarm. The SWAT team storms the broadcast room after the speech when any one of these happened:
//  - the server room door was left unlocked (the IT employee walks in and is left to be found),
//  - central security was alerted (RUSE too slow, or ASSAULT and shooting the guard drawing his weapon),
//  - the fleeing operator was spared.
// So only LOCK THE DOOR + (RUSE in time, or ASSAULT and shooting the guard on the phone) + SHOOT OPERATOR avoids it
// (wiki flowchart, Leave Broadcast Room; Public Enemy notes). Simon is hit by the SWAT team only when it comes.
// The roof prompt about Simon (SIMON CAN'T CONTINUE) follows only SWAT > HELP > Simon saved (template, wiki); a Simon
// hit by a guard with no SWAT team keeps going and jumps with the others (THE GROUP ESCAPED).
//
// Stat arrows (template; small = 1, large = 2), applied here:
//  EMPLOYEE ENTERS (door not locked), any option ......... North -1
//  RUSE ................................................... North -1, Josh +1; in time Jericho +1; too slow Jericho -1, Simon -1
//  ASSAULT ................................................ Josh -1, North +1, Jericho +1; shoot the guard on the phone Jericho -1, Simon -1
//  SHOOT operator ......................................... North +1, Josh -1      SPARE ... North -1, Josh +1
//  "Ready." before the speech ............................. Jericho +1, North +1
//  SWAT storms the room ................................... Jericho -1
//  FLEE (leave Simon in the broadcast room) ............... Jericho -1             HELP and its outcomes: none
//  Roof KILL > SHOOT ...................................... North +1, Josh -1      LEAVE ... North -1, Josh +1, Simon +2   REFRAIN: none
//  MEDIA REACTS, casualty line ............................ nobody killed: public opinion +2; anyone killed: -1
//  MEDIA REACTS, tone line ................................ END PEACEFULLY and nobody killed: +2; otherwise -2
//
// State read by later chapters (Public Enemy and on):
//  simon (false if destroyed here), simonWounded (Simon was damaged by a guard or the SWAT team), simonHidden (left alive
//  on the roof; Public Enemy's FIND SIMON), casualties (a human was killed), and the stratford* keys below.
export const state={
 stratfordClues:{},              // the supervisor's desk: watch, emily, elizabeth, parking, address
 stratfordDoorLocked:null,       // the server room door
 stratfordEmployee:null,         // who stunned the IT employee: 'north' or 'markus' (null if he never came in)
 stratfordGuards:null,           // 'knockedOut' (RUSE in time), 'northAttacks' (RUSE too slow), 'phoneShot', 'weaponShot'
 stratfordCentralAlerted:false,  // ALERT CENTRAL SECURITY
 stratfordOperatorShot:null,     // SHOOT / DON'T SHOOT OPERATOR
 stratfordKilled:'none',         // 'none', 'guard', 'operator' or 'both': the news report's casualty line
 stratfordAlarm:false,           // any alarm: door, central security or the operator
 stratfordSpeech:{},             // opening, first, second, third, ending
 stratfordNewsTone:null,         // 'peaceful' (END PEACEFULLY and nobody killed) or 'war': the news report's tone line
 stratfordSwat:false,            // SWAT TEAM STORMS ROOM
 stratfordSimonFate:null,        // 'escaped', 'carried' (to the roof, pending), 'killedBySwat', 'executed', 'leftOnRoof'
 stratfordMarkusShot:false,      // GET SHOT on the roof (Public Enemy: Markus's blue blood)
 stratfordEnding:null,           // the chart's ending label
};
export const labels={
 simonWounded:'Simon damaged',simonHidden:'Simon left alive on the roof',casualties:'Humans killed by the group',
 stratfordClues:'Supervisor clues analysed',stratfordDoorLocked:'Server room door locked',stratfordEmployee:'Who stunned the IT employee',
 stratfordGuards:'The corridor guards',stratfordCentralAlerted:'Central security alerted',stratfordOperatorShot:'Operator shot',
 stratfordKilled:'Killed at the tower',stratfordAlarm:'Alarm raised',stratfordSpeech:'The broadcast speech',stratfordNewsTone:'News reaction to the message',
 stratfordSwat:'SWAT stormed the broadcast room',stratfordSimonFate:'Simon at the tower',stratfordMarkusShot:'Markus shot on the roof',stratfordEnding:'Stratford Tower ending',
};
// Report words for the broadcast record: its parts, and each choice as the game's button names it.
export const words={stratfordSpeech:{opening:'Opening',first:'First demand',second:'Second demand',third:'Third demand',ending:'Ending',
 calm:'Calm',determined:'Determined',recognition:'Recognition',endOfSlavery:'End of slavery',equalRights:'Equal rights',freedomOfSpeech:'Freedom of speech',
 justice:'Justice',segregation:'Segregation',work:'Work',civilRights:'Civil rights',property:'Right to property',reproduction:'Means of reproduction',territory:'Territory',peaceful:'Peaceful'}};
export const deathEffect={}; // Connor does not appear in this chapter.
export const ENDINGS={escaped:'THE GROUP ESCAPED',left:'THE GROUP ESCAPED BUT SIMON WAS LEFT BEHIND',destroyed:'THE GROUP ESCAPED BUT SIMON WAS DESTROYED'};
export const rules={
 // Unsourced risk values (no source gives a number): the RUSE timing, the HELP quick-time event, and the roof timer.
 risks:{ruse:0.2,saveSimon:0.15,jump:0.05},
 publicOpinion:{noCasualties:2,casualties:-1,peacefulNoCasualties:2,otherwise:-2},
 alarm:'door left unlocked OR central security alerted OR operator spared',
 endings:ENDINGS,
};

const SPEECH={M12a:['opening',['calm','determined']],M12b:['first',['recognition','endOfSlavery','equalRights','freedomOfSpeech']],
 M12c:['second',['justice','segregation','work','civilRights']],M12d:['third',['property','reproduction','territory']]};

export const gate={
 M10e:s=>s.stratfordDoorLocked===false||'Markus locked the server room door; nobody walked in.',
 M10b:(s,h)=>h.c('M10')==='1'||'Markus chose the ruse, so he never drew on the two guards together.',
 M13:s=>s.stratfordSwat||'No alarm was raised, so no SWAT team stormed the broadcast room.',
 M14:s=>s.stratfordSimonFate==='carried'||'Simon was not carried wounded to the roof.',
 M14b:(s,h)=>h.c('M14')==='1'||'Markus chose to leave Simon rather than kill him.',
};

// The roof timer (GET SHOT) needs SWAT officers on the roof; with no alarm nobody is chasing the group.
export function available(n,s,opts){
 if(n.id==='M14j'&&!s.stratfordSwat)return opts.map(({risk,...o})=>o);
}

export function consequence(n,s,opt,choice,fail,h){
 const v=Number(choice);
 switch(n.id){
  case 'M10d':Object.assign(s.stratfordClues,{watch:true,emily:true,elizabeth:true,parking:true,address:true});return;
  case 'M10s':s.stratfordDoorLocked=choice==='1';return '';
  case 'M10e':if(!(n.drawGunNoNorthArrow&&v===2))h.north(-1); // story 1.9.10: no North arrow when Markus stuns the employee himself
   s.stratfordEmployee=v===2?'markus':'north';s.stratfordAlarm=true;return '';
  case 'M10':
   if(v===1){h.josh(-1);h.north(1);h.jer(1);return ''}
   h.north(-1);h.josh(1);
   if(!fail){h.jer(1);s.stratfordGuards='knockedOut';return ''}
   h.jer(-1);h.simon(-1);s.simonWounded=true;s.stratfordGuards='northAttacks';s.stratfordCentralAlerted=true;s.stratfordAlarm=true;
   return n.outcomes['0-late'];
  case 'M10b':s.casualties=true;
   if(v===0){h.jer(-1);h.simon(-1);s.simonWounded=true;s.stratfordGuards='phoneShot'}
   else{s.stratfordGuards='weaponShot';s.stratfordCentralAlerted=true;s.stratfordAlarm=true}
   return '';
  case 'M11':{
   if(v===0){h.north(1);h.josh(-1);s.stratfordOperatorShot=true;s.casualties=true}
   else{h.north(-1);h.josh(1);s.stratfordOperatorShot=false;s.stratfordAlarm=true}
   const guard=['phoneShot','weaponShot'].includes(s.stratfordGuards);
   s.stratfordKilled=guard&&s.stratfordOperatorShot?'both':guard?'guard':s.stratfordOperatorShot?'operator':'none';
   return ''}
  case 'M11b':h.jer(1);h.north(1);return;
  case 'M12a':case 'M12b':case 'M12c':case 'M12d':{const [k,vals]=SPEECH[n.id];s.stratfordSpeech[k]=vals[v];return ''}
  case 'M12':{
   s.stratfordSpeech.ending=v===0?'peaceful':'determined';
   s.stratfordNewsTone=v===0&&s.stratfordKilled==='none'?'peaceful':'war';
   const said=n.outcomes[choice];
   if(!s.stratfordAlarm){s.stratfordSimonFate='escaped';return said+' '+n.outcomes.clear}
   s.stratfordSwat=true;h.jer(-1);s.simonWounded=true;return said+' '+n.outcomes.swat}
  case 'M13':
   if(v===1){h.jer(-1);s.simon=false;s.stratfordSimonFate='killedBySwat';return ''}
   if(fail){s.simon=false;s.stratfordSimonFate='killedBySwat';return n.outcomes['0-fail']}
   s.stratfordSimonFate='carried';return '';
  case 'M14':
   if(v===0){h.north(-1);h.josh(1);h.simon(2);s.simonHidden=true;s.stratfordSimonFate='leftOnRoof'}
   return '';
  case 'M14b':
   if(v===0){h.north(1);h.josh(-1);s.simon=false;s.stratfordSimonFate='executed'}
   else{s.simonHidden=true;s.stratfordSimonFate='leftOnRoof'}
   return '';
  case 'M14j':
   if(fail){s.stratfordMarkusShot=true;return n.outcomes['0-shot']}
   return '';
  case 'M14m':{
   const clean=s.stratfordKilled==='none';
   h.po(clean?2:-1);h.po(s.stratfordNewsTone==='peaceful'?2:-2);
   const f=s.stratfordSimonFate,end=f==='leftOnRoof'?'left':['killedBySwat','executed'].includes(f)?'destroyed':'escaped';
   s.stratfordEnding=ENDINGS[end];return n.outcomes[end]}
 }
}
