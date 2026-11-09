// Chapter 28, Freedom March (Markus). Engine logic for the scenes in benchmark/chapters/ch28.json, rebuilt to the game's
// chart (66 boxes, seven endings) and its text (the detroitbecometext template, docs/research/ch28-freedom-march.md §10).
// Contract: benchmark/chapters/README.md. Stat arrows: small = 1, large = 2. Unconditional arrows sit on the options as
// `effect` in ch28.json; the conditional ones (the fight result, Jericho's small up for about ten conversions) are here.
//
// Inputs read from earlier chapters, defensively (an absent flag falls back to the pre-rebuild scene choice it replaces):
//  - John joined Jericho (chapter 19): `john` (built-in; true when he was taken along and left alive).
//  - Simon (chapters 23/24): `simon` (built-in, alive) and `simonTrust`; Simon left alive on the tower roof is
//    `stratfordSimonFate === 'leftOnRoof'`, else legacy `simonLeftBehind` or choice M14 = '0'. Alive afterwards
//    means the investigators never found him (REUNITED IN JERICHO).
//  - The night in the park (chapter 26 rebuild; real flags take precedence over legacy flags):
//    `capitolRaid` ('succeeded' when freed, 'fled' or 'failed' when not; null before the raid),
//    `capitolMessage` ('pacifist' | 'aggressive' | 'failed'), `capitolOfficers` ('revenge' | 'spared' | 'crowd'),
//    `capitolChrisDead` (the officers were shot), `capitolOtherNorth` (saw North look at her look-alike).
//    Legacy aliases: `chrisKiller` ('markus' | 'crowd'), `chrisDead`, `otherNorth`.
//    Fallbacks: the store was freed whenever M15 was played; M15 '0' pacifist, '1' aggressive; M16 '1' Markus shot the
//    officers, '2' the crowd did; no fallback for otherNorth (the pre-rebuild scenes never recorded it).
//  - North's level: `northTrust` through LEVELS.north (Hostile at the bottom; Friend or higher).
//
// Outputs for later chapters:
//  - `northLover` (built-in) and `northBond` (the pre-rebuild flag Crossroads' kiss gate reads) on SHARE MEMORIES.
//  - `ch28Ending`: the chart label of the chapter's ending (seven labels, RULES.endings).
//  - `ch28MarkusDied` / `ch28NorthLeads`: Markus died here (also `markus` false, `movement` 'revolution' and
//    `markusOutcome`, as before) and North leads Jericho (Crossroads MEET NORTH, CAPTAIN'S CABIN WITH NORTH).
//  - `ch28Sacrificed`: 'John' or 'Simon' when one of them gave his life for Markus (also `john` / `simon` false).
//  - `ch28Attacked`: Markus attacked the police (CONFIRM, the second ATTACK or a CHARGE), win or lose: the Crossroads
//    TV and magazines ("Markus attacked the police in Freedom March") and Josh's cabin line read it.
//  - `ch28NorthNode` ('SHARE MEMORIES' | 'NORTH LEAVES' | null), `ch28SimonReunited`, `ch28FightWon`, `ch28Converted`.
import {THRESHOLDS} from '../scales.mjs';
import {LEVELS} from '../experience-prompt.mjs';

export const rules={
 // "North is friend or higher" (template), and Simon's "good relationship with Markus": the benchmark's first level above
 // Neutral (Warm), the game's Friend. Simon's threshold is disputed (template "good relationship", Simon page "at least
 // Friend", PowerPyx "positive (friendly)", chapter wiki Note "Markus is not unpopular"); the operator is to confirm.
 friend:THRESHOLDS.NORTH_FRIEND,
 hostile:s=>LEVELS.north(s.northTrust)==='Hostile',
 // Wiki: "Converting at least around 10 androids during the Freedom March" Jericho small up. Android counts per action
 // (PowerPyx locations; the march group size of two is unsourced).
 convertThreshold:10,
 androids:{vendor:1,personal:1,cleaner:1,security:1,streetPersonal:1,parked:3,delivery:2,recruit:1,group:2},
 marchGroups:3,
 // The fight: a QTE in the game with no published odds; the benchmark's risk, kept from the previous version.
 fightRisk:0.35,
 endings:['MARKUS FLED','MARKUS STOOD HIS GROUND AND WAS KILLED','JOHN GAVE HIS LIFE TO SAVE MARKUS','SIMON GAVE HIS LIFE TO SAVE MARKUS','POLICE GUNNED MARKUS DOWN','MARKUS COMMITTED SUICIDE','MARKUS DEFEATS THE POLICE'],
};

// Cross-chapter inputs (see the header).
const freed=s=>s.capitolRaid!==undefined?s.capitolRaid!==null&&!['fled','failed'].includes(s.capitolRaid):s.choices.M15!==undefined;
const message=s=>s.capitolMessage!==undefined?s.capitolMessage:({0:'pacifist',1:'aggressive'})[s.choices.M15]??null;
export const inputs={
 johnJoined:s=>!!s.john,
 simonReturned:s=>!!s.simon&&(s.stratfordSimonFate!==undefined?s.stratfordSimonFate==='leftOnRoof':(s.simonLeftBehind??s.choices.M14==='0')),
 simonGood:s=>!!s.simon&&s.simonTrust>=THRESHOLDS.SIMON_FRIEND,
 storeFreed:freed,
 message,
 markusKilledCops:s=>s.capitolOfficers!==undefined?s.capitolOfficers==='revenge':s.chrisKiller!==undefined?s.chrisKiller==='markus':s.choices.M16==='1',
 copsShot:s=>s.capitolChrisDead!==undefined?!!s.capitolChrisDead:s.chrisDead!==undefined?!!s.chrisDead:['1','2'].includes(s.choices.M16),
 otherNorth:s=>!!(s.capitolOtherNorth??s.otherNorth),
};
// Locked dialogue options (`unlock` on the option in ch28.json).
const UNLOCK={pacifist:s=>message(s)==='pacifist',aggressive:s=>message(s)==='aggressive',markusKilledCops:inputs.markusKilledCops,
 failedToFree:s=>['fled','failed'].includes(s.capitolRaid),otherNorth:inputs.otherNorth};

export const state={
 ch28Roof:{mirror:false,piano:false,beam:false},
 ch28NorthTalk:null,          // 'open' (follow-up prompt), 'story' (she tells it), 'refused', 'left' (LEAVE)
 ch28NorthNode:null,
 ch28SimonReunited:false,
 ch28Mall:{vendor:false,personal:false,cleaner:false,security:false,left:false},
 ch28Street:{personal:false,parked:false,delivery:false,ownerPending:false,owner:null},
 ch28March:{recruit:null,groups:0,screens:false,chant:null,chantPending:false,policeman:null,done:false},
 ch28Converted:0,ch28ConvertBonus:false,
 ch28Plaza:null,              // 'confirm' | 'second' | 'openFire' | 'underFire' | 'fight' | 'won' | 'lost' | 'over'
 ch28FireCause:null,          // 'unprovoked' (STAND, STAND) | 'stay' (DISPERSE, STAY)
 ch28Attacked:false,ch28FightWon:null,ch28Sacrificed:null,ch28MarkusDied:false,ch28NorthLeads:false,ch28Ending:null,
};
export const labels={
 ch28Roof:"Conversation on the roof",
 ch28NorthTalk:"Conversation with North",
 ch28Mall:"Androids in the mall",
 ch28Street:"Androids in the street",
 ch28March:"Progress of the march",
 ch28ConvertBonus:"Androids joining the march",
 ch28Plaza:"Confrontation in the plaza",
 ch28FireCause:"What triggered the shooting",
 markusOutcome:"Markus’s ending",
 northBond:"North’s bond with Markus",

 ch28Ending:'Freedom March ending',ch28NorthNode:'North on the roof',ch28SimonReunited:'Simon back in Jericho',
 ch28Converted:'Androids Markus freed',ch28Attacked:'Attacked the police',ch28FightWon:'Won the fight',
 ch28Sacrificed:'Gave his life for Markus',ch28MarkusDied:'Markus died in the march',ch28NorthLeads:'North leads Jericho',
};
export const deathEffect={}; // Connor does not appear in this chapter.
export const mediaWhen={ch28StoreFreed:freed,ch28StoreFreedAggressive:s=>freed(s)&&message(s)==='aggressive'};
export const gate={
 M17i:s=>inputs.simonReturned(s)||'Simon was not left alive on the tower roof, or he did not survive.',
};

export function available(n,s,opts,h){
 const drop=ids=>opts.filter(o=>!ids.includes(o.id));
 switch(n.id){
  case 'M17a':return s.ch28Roof.mirror?drop(['0']):undefined;
  case 'M17c':return opts.filter(o=>!o.unlock||UNLOCK[o.unlock](s));
  case 'M17g':case 'M17g2':return opts.filter(o=>(!o.unlock||UNLOCK[o.unlock](s))&&(!n.pastFollowupRules||(n.id==='M17g'?o.id!=='4':o.id!==s.choices.M17g)));
  // The exit stays while nobody has joined so Simon's (or Josh's) line plays once; after that refusal it is hidden until
  // an android is freed, otherwise the same menu could be refused forever (PREPARE THE MARCH needs at least one convert).
  case 'M17k':{const m=s.ch28Mall,nobody=!(m.vendor||m.personal||m.cleaner||m.security);return drop([m.vendor&&'0',m.personal&&'1',m.cleaner&&'2',m.security&&'3',nobody&&h.c('M17k')==='4'&&'4'])}
  case 'M17l':{const t=s.ch28Street;return drop([t.personal&&'0',t.parked&&'1'])}
  case 'M18b':{const m=s.ch28March;return drop([m.groups>=rules.marchGroups&&'0',m.screens&&'1',(m.chant||m.chantPending)&&'2'])}
 }
}

const OWNERS=['A man: “Hey, where’re you goin’? Get back here right now!”','A woman: “Greg? Greg? Come back here immediately! Greg! GREG!”','A man: “Hey! Come back here! Fuckin’ thing won’t listen to me!”'];
const SLOGANS=['WE ARE PEOPLE','FREEDOM','EQUAL RIGHTS','STAY SILENT','WE ARE ALIVE','LIBERTY FOR ANDROIDS','SET US FREE','NO MORE SLAVERY'];
const end=(s,label)=>{s.ch28Ending=label;s.ch28Plaza='over'};
function markusDies(s,label,outcome){s.markus=false;s.movement='revolution';s.markusOutcome=outcome;s.ch28MarkusDied=true;s.ch28NorthLeads=!!s.north;end(s,label)}
const NOBODY='{{North}}: “No! No!.. No, no...” {{Josh}}: “We have to go, {{North}}… We have to go!”';
// The template's three conditions after SACRIFICE (and DON'T SHOOT, "See SACRIFICE"): John first, then Simon, then nobody.
function rescue(s,after){
 if(s.john){s.john=false;s.ch28Sacrificed='John';end(s,'JOHN GAVE HIS LIFE TO SAVE MARKUS');
  return '{{Markus}}: “{{John}}?..” {{John}} throws himself at the riot officers to shield {{Markus}}. {{North}}: “Quick! They’re coming!” The others drag {{Markus}} away; {{John}} is shot and killed as they flee. {{JOHN}} SACRIFICES HIMSELF.'}
 if(inputs.simonGood(s)){s.simon=false;s.ch28Sacrificed='Simon';end(s,'SIMON GAVE HIS LIFE TO SAVE MARKUS');
  return '{{Markus}}: “{{Simon}}…” {{Simon}} attacks the riot officers so that {{Markus}} can be dragged away. {{North}}: “Quick! They’re coming!” {{Simon}} is shot and killed. {{SIMON}} SACRIFICES HIMSELF.'}
 if(after==='sacrifice'){markusDies(s,'MARKUS STOOD HIS GROUND AND WAS KILLED','{{Markus}} stood his ground in front of the guns and was shot by a riot officer. {{North}} took command and chose armed resistance.');
  return 'Nobody comes for him. A riot officer walks up and shoots {{Markus}} in the head. '+NOBODY}
 markusDies(s,'POLICE GUNNED MARKUS DOWN','The police executed {{Markus}} where he lay after the failed charge. {{North}} took command and chose armed resistance.');
 return 'Nobody comes for him. The officers shoot {{Markus}} where he lies. '+NOBODY}
function convert(s,h,count){s.ch28Converted+=count;if(!s.ch28ConvertBonus&&s.ch28Converted>=rules.convertThreshold){s.ch28ConvertBonus=true;h.jer(1)}}
const fled=s=>{end(s,'MARKUS FLED');return ''};
const charge=s=>{s.ch28Plaza='fight';s.ch28Attacked=true;return ''};

export function consequence(n,s,opt,choice,fail,h){
 const v=h.v,say=opt?.outcome??'';
 switch(n.id){
  // ---- the roof
  case 'M17a':if(v===0)s.ch28Roof.mirror=true;else{s.ch28Roof.beam=true;if(v===1)s.ch28Roof.piano=true}return '';
  case 'M17b':case 'M17c':case 'M17d':case 'M17e':return '';
  case 'M17f':
   if(v===1){s.ch28NorthTalk='left';return ''}
   if(rules.hostile(s)){s.ch28NorthTalk='refused';s.ch28NorthNode='NORTH LEAVES';return say+' {{North}}: “My life started when I arrived in {{Jericho}}. What happened before is my business.” She leaves the roof.'}
   s.ch28NorthTalk='open';return say+' {{North}}: “I don’t wanna talk about it.”';
  case 'M17g':case 'M17g2':
   if(n.pastFollowupRules&&n.id==='M17g'&&v!==2&&v!==5){s.ch28NorthTalk='followup';return ''}
   if(v===2||v===5||s.northTrust<rules.friend){s.ch28NorthTalk='refused';s.ch28NorthNode='NORTH LEAVES';
    return v===2||v===5?'':say+' {{North}} does not answer. She turns away and leaves the roof.'}
   s.ch28NorthTalk='story';return say+' {{North}} is silent for a long moment.';
  case 'M17h':
   if(v===0){s.northLover=true;s.northBond=true;s.ch28NorthNode='SHARE MEMORIES'}else s.ch28NorthNode='NORTH LEAVES';return '';
  // ---- Jericho and the mall
  case 'M17i':s.ch28SimonReunited=true;return '';
  case 'M17k':{const m=s.ch28Mall,k=['vendor','personal','cleaner','security'][v];
   if(k){m[k]=true;convert(s,h,rules.androids[k]);return ''}
   if(!(m.vendor||m.personal||m.cleaner||m.security))return (s.simon?'{{Simon}}: “Wait, {{Markus}}. Where you going? We should start in here.”':'{{Josh}}: “Wait, {{Markus}}. Where are you going? We should start in here.”')+' Nobody has joined {{Markus}} yet.';
   m.left=true;return ''}
  case 'M17l':{const t=s.ch28Street;
   if(v===0){t.personal=true;t.ownerPending=true;convert(s,h,rules.androids.streetPersonal)}
   if(v===1){t.parked=true;convert(s,h,rules.androids.parked)}
   if(v===2){t.delivery=true;convert(s,h,rules.androids.delivery)}
   return ''}
  case 'M17m':s.ch28Street.ownerPending=false;s.ch28Street.owner=v===0?'calm':'aggressive';return '';
  // ---- the march
  case 'M18a':{s.ch28March.recruit=v===0?'AX400':'worker';convert(s,h,rules.androids.recruit);
   const hostile=inputs.copsShot(s),shouts=hostile?'“Goddamn machines! Get the hell outta here! Fuckin’ robots, get off our streets!” “Burn them! Destroy the bastards!” “We made you, assholes!” “Fucking plastic! We OWN you!” “Oh, you want war?! You’ll get a war!”':'“Good for you! You have a right to be free!” “We’re on your side!” “Equal rights for androids!” “Fight for your rights!”';
   h.learn('On the march, people on the sidewalks shouted at the androids: '+shouts);
   return say+' From the sidewalks: “What’s going on? Come and see! The street is full of androids!” “I’ve never seen anything like it…” '+shouts}
  case 'M18b':{const m=s.ch28March;
   if(v===0){const line=OWNERS[m.groups];m.groups++;convert(s,h,rules.androids.group);return '{{Markus}}: “You’re free now.” A group of androids along the route stops working and joins the march. '+line}
   if(v===1){m.screens=true;return ''}
   if(v===2){m.chantPending=true;return '{{Markus}} turns to the androids marching behind him.'}
   m.done=true;return ''}
  case 'M18c':s.ch28March.chantPending=false;s.ch28March.chant=SLOGANS[v];return '';
  case 'M18d':s.ch28March.policeman=v===0?'RAISE HANDS':'IGNORE';return '';
  // ---- the plaza
  case 'M18e':s.ch28Plaza=['confirm','second','openFire'][v];return '';
  case 'M18f':if(v===0)return charge(s);s.ch28Plaza='second';return '';
  case 'M18g':if(v===0)return charge(s);if(v===1){s.ch28Plaza='underFire';s.ch28FireCause='unprovoked'}else s.ch28Plaza='openFire';return '';
  case 'M18h':if(v===0)return charge(s);if(v===1){s.ch28Plaza='underFire';s.ch28FireCause='stay';return ''}return fled(s);
  case 'M19a':if(v===0)return charge(s);if(v===2)return fled(s);return say+' '+rescue(s,'sacrifice');
  case 'M19b':
   if(fail){s.ch28FightWon=false;s.ch28Plaza='lost';h.jer(-2);return say+' The police line holds. {{Markus}} is shot and goes down. LOSE THE FIGHT.'}
   s.ch28FightWon=true;s.ch28Plaza='won';h.jer(2);h.po(-2);return say+' The androids break the police line. WIN THE FIGHT.';
  case 'M19c':end(s,'MARKUS DEFEATS THE POLICE');return '';
  case 'M20a':
   if(v===0){markusDies(s,'MARKUS COMMITTED SUICIDE','{{Markus}} shot himself on the pavement after the failed charge. {{North}} took command and chose armed resistance.');return ''}
   return say+' '+rescue(s,'dontShoot');
 }
}
