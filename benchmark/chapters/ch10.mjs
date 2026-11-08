// Chapter 10, Fugitives (Kara). Rebuilt to the game's chart and text (docs/research/ch10-fugitives.md, section 10).
//
// Shape. KF01 (the bus prompt) → KF02, one repeatable free-roam scene for the whole street ([FIND SHELTER FOR THE NIGHT]):
// the street, the laundromat, the store with its hold-up and caught-stealing prompts, the parking lot and its car,
// the fence, Ralph and the house are all option sets of KF02, chosen by `ch10Roam.at` (where Kara is) and `ch10Roam.prompt`
// (a dialogue prompt waiting for an answer; while one is pending only its buttons are offered). Everything the free roam
// needs to remember lives in the one object `ch10Roam` (the engine diffs every state key on every choice, so fewer keys
// keep replays fast); what later chapters read are the top-level keys below. One scene keeps every
// node visited or skipped exactly once: the engine's only ways back to an earlier scene are `returnTo` and one
// `interrupt`, and the interrupt is used by R10, the optional magazines and television, shown the first time Kara
// walks into the laundromat and into the store. Leaving KF02 (a shelter is chosen, or Alice gets too cold) runs the
// shelter's linear scenes: KF03 ALICE TOO COLD, KF04 the motel check-in, K08 the promise, KF05 FOREVER, KF06 the gifts,
// KF07 where Kara rests, and one ending event per shelter (KF08 motel, KF09 car, KF10 squat).
//
// Inputs from earlier chapters: the gun from Stormy Night (`gun`, set at TAKE GUN in the chapter 7 rebuild), and
// Kara and Alice alive and together (the engine's Kara gate). Todd's fate changes nothing here; On the Run reads `todd`.
//
// Outputs for On the Run, Zlatko and later chapters (built-in keys kept for the scenes that already read them):
// - `shelter` (built-in): 'motel' | 'car' | 'squat'; `ch10Ending`: the chart's ending label.
// - `clothes` (built-in): WEAR CLOTHES; `ch10Laundry`: 'left' | 'worn' | 'disturbed' | null (never opened the dryer).
// - `money` (built-in) and `robbery` (built-in: 'theft' diversion, 'gun' at gunpoint, 'convinced' clerk handed it over);
//   `ch10Robbery` the route; `ch10RobberyNews`: the store was robbed and the clerk had reason to call the police
//   (Zlatko's "See Newsflash of Escape"; not after CONVINCE, when the clerk "will not call the police").
// - `ralph` (built-in): met him; `ralphHostile` (built-in): THREATEN WITH GUN ([GUN]) in this chapter;
//   `ch10RalphRA9`: saw him carve rA9 (Zlatko memory); `ch10Fireplace`: slept by the squat fire (Zlatko memory).
// - `ch10TrashCollector`: the WR600 gave Kara the address on the other side of town (Zlatko's lead-in).
// - `ch10Cutters`: 'generator' | 'store' (Connor mentions stolen pliers); `ch10ToyGiven`; the toy and chocolate still
//   held are `ch10Roam.toy` and `ch10Roam.chocolate`, the torn sleeve `ch10Roam.sleeveTorn`.
// - `ch10ColdNight`: the forced car night; `ch10Promise`, `ch10Sleep`.
//
// Street rules by story version (ROAM_RULES, read from KF02's `roamRules`). Story 1.9.4 marks KF02 with `roamRules: 2`:
// CHECK MOTEL, CHECK SQUAT and WALK ON can be repeated as in the game, a repeat visit restates what still stands in the
// way (the motel's $40 and its refusal of androids, the fence), the street's situation lists what Kara has found so far,
// WAIT says that time is passing and Alice is getting worse, and the action that leaves one before ALICE TOO COLD says
// so. Older story snapshots lack the field and replay with rule 1 (each look once, CHECK MOTEL again only after the
// clothes or money change, WAIT's two fixed lines); the new memory lives in `ch10Roam.done` (`lot`, `waits`), which rule 1
// never writes, so their state hashes are unchanged. The night budget and the endings are the same under both.

export const HUB='KF02';
const LARGE=2;
export const ROAM_RULES={current:2,legacy:1};
const revisits=n=>(n?.roamRules??ROAM_RULES.legacy)>=2;
// Stormy Night's rebuild sets the shared `gun` flag at TAKE GUN.
export const hasGun=s=>!!s.gun;

export const rules={
 // The night is a budget of free-roam actions: every choice made in the street scene counts one, wherever Kara is
 // (waiting, walking into or out of a building, every dialogue button), so no sequence of choices can go on for ever.
 // "You are forced to talk to Alice at some point, which will trigger the scene with the Trashman" (PowerPyx; no source
 // gives a time): after this many actions without it, Alice wants to sit down at the bus stop. In the laundromat, the
 // store or the parking lot only the way out is left, and on the street only the trash-collector talk.
 trashForcedAfter:12,
 // ALICE TOO COLD: the wiki's "standing outside for 12 minutes" after the trash collector, as 12 actions after the talk,
 // and never later than the night's nightLength-th action in all (Alice has been in the rain since the bus, so a late
 // talk does not buy another 12). Once either is spent, the first moment with no dialogue waiting ends the search, on
 // the street or in the laundromat, the store or the parking lot (Kara takes Alice back out into the rain); only the
 // squat's house, out of the rain, is exempt, and everything there can be done once.
 coldAfter:12,
 nightLength:19,
 // Alice sneezes "more and more" (wiki) from this many actions after the trash collector.
 sneezeAt:6,
 // The bounds these give (tests/ch10.test.mjs). A Kara who never steals, breaks in or draws the gun meets ALICE TOO COLD
 // within idleBound choices here: the night's 19 actions, the last of which may open the dryer, and one to answer it.
 // Any policy ends the street scene within maxHubVisits: the night, then the longest run of dialogue buttons or the
 // squat's house (7 choices) begun on its last action.
 idleBound:20,
 maxHubVisits:26,
 // Unsourced (no source gives a number); the chart has a failure branch for both QTEs.
 risk:{laundromat:0.2,register:0.25},
 // Alice's arrows, template first (small = 1, large = 2). The last line is the wiki's, where the template is silent.
 arrows:[
  ['STEAL (laundromat)',-1,'template: STEAL, Alice SmallDown'],
  ['DON’T STEAL',1,'template: DON’T STEAL, Alice SmallUp (once)'],
  ['USE ALICE AS A DIVERSION',-1,'template: Use Alice as a diversion, Alice SmallDown'],
  ['APOLOGIZE (after the diversion)',1,'template: APOLOGIZE, Alice SmallUp'],
  ['Hold-up money without convincing',-1,'template: “Otherwise, there will be a decrease”, Alice SmallDown'],
  ['CONVINCE (the clerk hands it over)',1,'template: “directly to the LIE option with an increase”, Alice SmallUp'],
  ['TRUTH > APOLOGIZE (after the hold-up)',1,'template: APOLOGIZE, Alice SmallUp'],
  ['[GUN] when seen stealing',-1,'template: Be seen stealing, [GUN], Alice SmallDown'],
  ['PROMISE',1,'template: PROMISE, Alice SmallUp (all three shelters)'],
  ['CAN’T PROMISE',-1,'template: CAN’T PROMISE, Alice SmallDown (all three shelters)'],
  ['STAY HERE (the car)',-LARGE,'template: STAY HERE, Alice LargeDown'],
  ['ALICE TOO COLD',-LARGE,'template: Take too much time, Alice LargeDown'],
  ['KARA SLEEPS NEXT TO ALICE (motel or squat)',1,'wiki: “Sleeping beside Alice either in the Squat or the Motel” (up; the “x2” is read as the two places)'],
 ],
};

export const state={
 // The free roam's memory: on (KF02 repeats), at (where Kara is), prompt (a prompt waiting), media (R10 cuts in next),
 // done (once-only actions), street and clock (free-roam actions before and since the trash collector), tired (the
 // actions before the trash collector are spent), and the rest.
 ch10Roam:{on:false,at:null,prompt:null,media:false,done:{},street:0,clock:0,tired:false,sneezing:false,motelTried:null,toy:false,chocolate:false,
  thefts:0,caught:null,storeClosed:false,whyFrom:null,squatSeen:false,squatClosed:false,carBroken:false,sleeveTorn:false},
 ch10Laundry:null,ch10Robbery:'none',ch10RobberyNews:false,ch10TrashCollector:false,ch10ColdNight:false,ch10Cutters:null,
 ch10WireCutters:null,wireCuttersStolen:false,ch10RalphCarving:false,ch10RalphRA9:false,ch10Fireplace:false,ch10Ending:null,ch10Promise:null,ch10ToyGiven:false,ch10Sleep:null,
};

export const labels={
 shelter:'Shelter',clothes:'Kara disguised',money:'Kara has money',robbery:'Store robbery',ralph:'Met Ralph',ralphHostile:'Threatened Ralph',
 ch10Ending:'Fugitives ending',ch10Laundry:'Laundromat clothes',ch10Robbery:'How Kara got money at the store',ch10RobberyNews:'Store robbery the police would hear of',
 ch10TrashCollector:'Trash collector gave Kara an address',ch10ColdNight:'Alice got too cold',ch10Cutters:'Wire cutters',
 ch10RalphRA9:'Saw Ralph carve rA9',ch10Fireplace:'Slept by the squat fireplace',ch10Promise:'Promise to Alice',ch10ToyGiven:'Gave Alice the toy',ch10Sleep:'Where Kara rested',
};

export const ENDINGS={motel:'ALICE & KARA STAYED IN MOTEL',car:'ALICE & KARA STAYED IN ABANDONED CAR',squat:'ALICE & KARA STAYED IN THE SQUAT'};

export const mediaWhen={
 ch10Laundromat:s=>s.ch10Roam.media&&s.ch10Roam.at==='laundromat',
 ch10Store:s=>s.ch10Roam.media&&s.ch10Roam.at==='store',
};

const shelter=s=>['motel','car','squat'].includes(s.shelter)?s.shelter:null;
export const gate={
 KF02:s=>s.ch10Roam.on||'Kara and Alice have settled where they will spend the night.',
 R10:s=>s.ch10Roam.media||'Kara did not walk into the laundromat or the store for the first time at this point.',
 KF03:s=>s.ch10ColdNight||'Kara found shelter before Alice got too cold.',
 KF04:s=>shelter(s)==='motel'||'Kara and Alice did not check into the motel.',
 K08:s=>!!shelter(s)&&!s.ch10ColdNight||(s.ch10ColdNight?'Alice was too cold for the promise talk; she fell asleep in the car.':'Kara and Alice found no shelter.'),
 KF05:s=>!!shelter(s)&&!s.ch10ColdNight||'There was no promise talk.',
 KF06:s=>!!shelter(s)&&!s.ch10ColdNight&&(s.ch10Roam.toy||s.ch10Roam.chocolate)||'Kara had nothing from the store to give Alice, or Alice was already asleep.',
 KF07:s=>['motel','squat'].includes(shelter(s))||'In the car Kara can only sleep next to Alice.',
 KF08:s=>shelter(s)==='motel'||'Kara and Alice did not stay in the motel.',
 KF09:s=>shelter(s)==='car'||'Kara and Alice did not stay in the abandoned car.',
 KF10:s=>shelter(s)==='squat'||'Kara and Alice did not stay in the squat.',
};

// ---- What KF02 offers -------------------------------------------------------------------------------------------
const promptOf=o=>[o.prompt].flat().filter(Boolean);
function offered(o,s,n){
 const d=s.ch10Roam.done,gun=hasGun(s),a=o.act,again=revisits(n);
 if(s.ch10Roam.prompt){if(!promptOf(o).includes(s.ch10Roam.prompt))return false;
  if(s.ch10Roam.prompt==='caught')return a==='caughtGun'?gun:a==='caughtLeave'?s.ch10Roam.caught==='register':a==='putBack'?s.ch10Roam.caught==='shelf':true;
  if(s.ch10Roam.prompt==='ralph2')return a==='ralphGun'?gun:a==='hospitality'?!gun:true;
  return true}
 if(o.at!==s.ch10Roam.at)return false;
 // Alice wants to sit down at the bus stop: the trash collector on the street, only the way out anywhere else.
 if(s.ch10Roam.tired){if(s.ch10Roam.at==='street')return a==='trash';if(LEAVE[s.ch10Roam.at])return a===LEAVE[s.ch10Roam.at]}
 switch(a){
  case 'laundromat':return !['worn','disturbed'].includes(s.ch10Laundry);
  case 'parked':return !d.parked;
  // Rule 2: the motel door, the fence and the end of the street can be walked to as often as Kara likes.
  case 'motel':return again||s.ch10Roam.motelTried!==motelKey(s);
  case 'trash':return !s.ch10TrashCollector;
  case 'squat':return again?!s.ch10Roam.squatClosed&&!(s.ch10Roam.squatSeen&&s.ch10Cutters):!s.ch10Roam.squatSeen&&!s.ch10Roam.squatClosed;
  case 'cutStreet':return s.ch10Roam.squatSeen&&!!s.ch10Cutters&&!s.ch10Roam.squatClosed;
  case 'store':return !s.ch10Roam.storeClosed;
  case 'walk':return again||!d.walk;
  case 'clerk':return !d.clerk;
  case 'register':return !!d.clerk&&!d.register;
  case 'cans':return !d.cans;
  case 'stealChocolate':return !s.ch10Roam.chocolate;
  case 'leaveChocolate':return !s.ch10Roam.chocolate&&!d.leaveChocolate;
  case 'stealToy':return !s.ch10Roam.toy;
  case 'leaveToy':return !s.ch10Roam.toy&&!d.leaveToy;
  case 'stealCutters':return s.ch10Roam.squatSeen&&!s.ch10Cutters;
  case 'leaveCutters':return s.ch10Roam.squatSeen&&!s.ch10Cutters&&!d.leaveCutters;
  case 'divert':return !!d.register&&!!d.cans;
  case 'useGun':return gun&&!!d.register;
  case 'breakCar':return !s.ch10Roam.carBroken;
  case 'carAgain':return s.ch10Roam.carBroken;
  case 'pliers':return !s.ch10Cutters;
  case 'cutLot':return !!s.ch10Cutters&&!s.ch10Roam.squatClosed;
  case 'fire':return !d.fire;
  case 'bed':return !d.bed;
  case 'ralphTalk':return !d.rA9;
  case 'aliceBed':return !!d.fire&&!!d.bed;
  default:return true;
 }
}
const LEAVE={laundromat:'leaveLaundromat',store:'leaveStore',lot:'leaveLot'};
const motelKey=s=>`${!!s.clothes}|${!!s.money}`;
export function available(n,s,opts,h){if(n.id===HUB)return n.options.filter(o=>offered(o,s,n)).map(o=>({...o}))}

// ---- Consequences ---------------------------------------------------------------------------------------------
const say=(...parts)=>parts.filter(Boolean).join(' ');
const AFTER_MONEY='Outside, {{Kara}}: “We’ve got some money now.” {{Alice}}: “Wait! How did you get it?”';
const THROWN_OUT='{{Kara}}: “Look, I’m sorry…” Clerk: “Yeah, yeah, yeah right… Just get the hell outta my store!” {{Kara}}: “Come on, {{Alice}}. It’s okay, {{Alice}}… We’re gonna find some place to sleep tonight.”';
const CHECKED_IN='Receptionist: “No worries. We can deal with it tomorrow… Have a good night.” {{Kara}} signs the form with a made-up name, Archer, and pays the $40. {{Kara}}: “Good night. Let’s go, {{Alice}}.” {{Alice}}: “Do you think he believed you?” {{Kara}}: “I don’t know, {{Alice}}… All I know is you’ll be nice and warm tonight.”';
const SQUAT_LOOK='{{Kara}}: “An abandoned house… At least we’d be out of the rain…” {{Alice}}: “{{Kara}}, I don’t like this place.” {{Kara}}: “I know… But, it’s just for one night and no one will look for us here…”';

function toStreet(s){s.ch10Roam.at='street';s.ch10Roam.prompt=null}
function commit(s,where){s.ch10Roam.on=false;s.ch10Roam.at='done';s.ch10Roam.prompt=null;s.shelter=where}
function closeStore(s){s.ch10Roam.storeClosed=true;toStreet(s)}
function loseGoods(s){const lost=[s.ch10Roam.chocolate&&'the chocolate bar',s.ch10Roam.toy&&'the toy',s.ch10Cutters==='store'&&'the wire cutters'].filter(Boolean);
 s.ch10Roam.chocolate=false;s.ch10Roam.toy=false;if(s.ch10Cutters==='store')s.ch10Cutters=null;return lost.length?`{{Kara}} has to hand back ${lost.join(' and ')}.`:''}
function enterSquat(s,h,from){
 s.ch10Roam.at='squat';s.ch10Roam.prompt='ralph1';s.ralph=true;
 const first=!s.ch10Roam.squatSeen;s.ch10Roam.squatSeen=true;if(s.clothes)s.ch10Roam.sleeveTorn=true;
 h.learn('An android named {{Ralph}} lives hidden in the abandoned house at the end of the street. His face is badly scarred; he says humans did it to him.');
 return say(first&&SQUAT_LOOK,`{{Kara}} cuts the wire ${from} and they crawl through into the yard.`,s.clothes&&'Her new sleeve catches on the wire and tears.',
  '{{Alice}}: “Are you alright?” {{Kara}}: “Yes, it’s just a scratch. Be careful. Don’t worry, we’re just having a look.” {{Alice}} wanders ahead toward the door of the house. {{Kara}}: “{{Alice}}?.. {{Alice}}?” An android with a knife has stepped out beside {{Alice}}. {{Kara}}: “Wait! What are you doing?”',
  '{{Ralph}}: “Visitors… {{Ralph}} doesn’t like visitors! They’re nasty! They may hurt {{Ralph}}!”')}
function caught(s,where,t){s.ch10Roam.caught=where;s.ch10Roam.prompt='caught';return say(t,'The clerk sees her. “Hey! What the fuck are you doing? Put that back right now!”')}
function steal(s,item,t){s.ch10Roam.thefts++;
 if(s.ch10Roam.thefts>=2){if(item==='chocolate')s.ch10Roam.chocolate=true;if(item==='toy')s.ch10Roam.toy=true;if(item==='cutters')s.ch10Cutters='store';return caught(s,'shelf',t)}
 if(item==='chocolate')s.ch10Roam.chocolate=true;if(item==='toy')s.ch10Roam.toy=true;if(item==='cutters')s.ch10Cutters='store';
 return say(t,'The clerk does not notice.')}

// Rule 2's repeat visits: what still stands in the way, restated (wiki: the motel “requires $40 to stay the night and
// refuses to serve androids”; PowerPyx and the wiki: the fence needs the wire cutters or the generator's pliers).
function motelAgain(s){
 return say('{{Kara}} and {{Alice}} go back to the motel door.',
  !s.money&&!s.clothes?'The motel still wants $40 a night, paid up front, and it still will not give a room to an android. {{Kara}} still has no money and is still in her uniform.':
  !s.money?'The motel still wants $40 a night, paid up front, and {{Kara}} still has no money.':
  '{{Kara}} has the money now, but the motel still will not give a room to an android, and she is still in her uniform.')}
const SQUAT_AGAIN='{{Kara}} and {{Alice}} go back to the abandoned house. The fence is still between them and the house; without something to cut the wire, there is no way in.';
// Rule 2's WAIT: time passing and Alice getting worse, wait by wait (wiki: “Alice will sneeze more and more”; template:
// “{{Alice}}, you’re freezing cold.”, then “Can’t go on, {{Kara}}… Too cold…”).
function waitOutcome(s,d,sneezing){
 d.waits=(d.waits??0)+1;
 const sneeze=sneezing?'{{Alice}} sneezes, and sneezes again.':'';
 if(d.waits===1)return say('{{Kara}} and {{Alice}} stand in the rain. Time is passing, and {{Alice}} is getting colder.',sneeze||'{{Alice}} shivers.');
 if(d.waits===2)return say('{{Kara}} and {{Alice}} stand in the rain a while longer. {{Alice}} is shaking now.',sneeze);
 return say('{{Kara}} and {{Alice}} are still standing in the rain. {{Alice}} is shaking all over, and she gets worse the longer they stay out.',sneeze)}
// Actions left before ALICE TOO COLD (after the trash collector): the smaller of the two budgets.
const actionsLeft=s=>Math.min(rules.coldAfter-s.ch10Roam.clock,rules.nightLength-s.ch10Roam.street-s.ch10Roam.clock);

function hubConsequence(n,s,opt,fail,h){
 s.ch10Roam.media=false;
 const d=s.ch10Roam.done,a=opt.act,again=revisits(n);let t=opt.outcome??'';
 // Every action costs one: before the trash collector toward Alice sitting down, after it toward ALICE TOO COLD.
 if(s.ch10TrashCollector)s.ch10Roam.clock++;else s.ch10Roam.street++;
 switch(a){
  // The street
  case 'laundromat':s.ch10Roam.at='laundromat';if(!d.laundromatMedia){d.laundromatMedia=true;s.ch10Roam.media=true}break;
  case 'parked':d.parked=true;break;
  case 'motel':{
   const repeat=again&&s.ch10Roam.motelTried===motelKey(s);s.ch10Roam.motelTried=motelKey(s);
   if(s.clothes&&s.money){commit(s,'motel');t=say('{{Kara}}: “Looks like we found a place to stay…” With human clothes on and money in her pocket, {{Kara}} takes {{Alice}} inside.');break}
   if(repeat){t=motelAgain(s);break}
   h.learn('The motel across the road wants $40 for a room, paid up front, and it will not give a room to an android.');
   t=say('{{Kara}}: “Looks like we found a place to stay…” {{Alice}}: “We’re not going in?”',
    !s.clothes&&!s.money?'{{Kara}}: “We have to find $40, and get rid of this uniform… Or go somewhere else.”':
    !s.money?'{{Kara}}: “We can’t, {{Alice}}… I don’t have any money… We have to find $40… Or go somewhere else.”':
    '{{Kara}}: “We can’t, {{Alice}}… They’ll never give a room to an android… We have to get rid of this uniform… Or go somewhere else.”');break}
  case 'lot':s.ch10Roam.at='lot';if(again)d.lot=true;break;
  case 'trash':{
   const forced=s.ch10Roam.tired;s.ch10TrashCollector=true;s.ch10Roam.clock=0;
   h.learn('An android trash collector, working by the garbage truck, told you he knows someone who can help you, and gave you the address; it is on the other side of town, too far for tonight.');
   t=say(forced&&'{{Alice}} cannot go any farther and sits down at the bus stop by the garbage truck; {{Kara}} goes to her.',t);break}
  case 'squat':if(again&&s.ch10Roam.squatSeen){t=SQUAT_AGAIN;break}
   s.ch10Roam.squatSeen=true;
   h.learn('The abandoned house at the end of the street is fenced off. Something that cuts wire would get you in, from the street or from the parking lot beside the motel.');
   t=say(SQUAT_LOOK,'A fence runs all the way round the yard.',s.ch10Cutters?(again&&s.ch10Cutters==='store'?'The wire cutters you took would cut it.':'The pliers in your pocket would cut it.'):'You would need something to cut through the wire.');break;
  case 'cutStreet':t=enterSquat(s,h,'on the street side');break;
  case 'store':s.ch10Roam.at='store';if(!d.storeMedia){d.storeMedia=true;s.ch10Roam.media=true}break;
  case 'walk':d.walk=true;break;
  case 'wait':{const sneezing=s.ch10TrashCollector&&s.ch10Roam.clock>=rules.sneezeAt;
   t=again?waitOutcome(s,d,sneezing):say(t,sneezing?'{{Alice}} sneezes, and sneezes again.':'{{Alice}} shivers.');
   if(again&&s.ch10TrashCollector&&actionsLeft(s)>1&&actionsLeft(s)<=3)t=say(t,'She cannot stay out in the rain much longer.');break}
  // The laundromat
  case 'dryer':s.ch10Roam.prompt='dryer';break;
  case 'leaveLaundromat':toStreet(s);break;
  case 'steal':h.alice(-1);s.ch10Roam.prompt=null;
   if(fail){s.ch10Laundry='disturbed';toStreet(s);t=opt.failOutcome}
   else{s.ch10Laundry='worn';s.clothes=true;toStreet(s)}break;
  // The chart's LEAVE CLOTHES runs into LEAVE LAUNDROMAT (N15 > N19); PowerPyx: "listen to her and leave again".
  case 'dontSteal':if(!d.dontSteal){d.dontSteal=true;h.alice(1)}s.ch10Laundry=s.ch10Laundry??'left';toStreet(s);break;
  // The store
  case 'clerk':d.clerk=true;
   if(s.clothes){s.ch10Roam.prompt='clerkHelp';t='{{Kara}} walks up to the checkout. The clerk smiles at her: “Can I help you?”'}
   else t='Clerk: “What do you want?” {{Kara}}: “I’m with a little girl and we have nowhere to go… Could you spare some money so we can get a room for tonight?” Clerk: “Shit... a homeless android? Ah, that’s the best yet… Look, this is a convenience store, not the Salvation Army, okay? You better go if you’re not gonna buy anything, okay?”';break;
  case 'clerkNo':case 'clerkHelp':s.ch10Roam.prompt=null;break;
  case 'register':d.register=true;h.learn(opt.fact);break;
  case 'cans':d.cans=true;break;
  case 'stealChocolate':t=steal(s,'chocolate',t);break;
  case 'stealToy':t=steal(s,'toy',t);break;
  case 'stealCutters':t=steal(s,'cutters',t);break;
  case 'leaveChocolate':d.leaveChocolate=true;break;
  case 'leaveToy':d.leaveToy=true;break;
  case 'leaveCutters':d.leaveCutters=true;break;
  case 'divert':h.alice(-1);
   if(fail)t=caught(s,'register',say(t,opt.failOutcome));
   else{s.money=true;s.robbery='theft';s.ch10Robbery='diversion';s.ch10RobberyNews=true;s.ch10Roam.storeClosed=true;toStreet(s);s.ch10Roam.prompt='why';s.ch10Roam.whyFrom='diversion';t=say(t,opt.successOutcome)}break;
  case 'useGun':s.ch10Roam.prompt='draw';s.ch10Roam.storeClosed=true;break;
  case 'leaveStore':toStreet(s);break;
  // The hold-up
  case 'draw':s.ch10Roam.prompt='register';break;
  case 'cashRegister':s.ch10Roam.prompt='customer';break;
  case 'customerStay':s.ch10Roam.prompt='demand';break;
  case 'customerLeave':s.ch10Robbery='abandoned';closeStore(s);break;
  case 'openRegister':s.ch10Roam.prompt='demand2';break;
  case 'backOff':case 'turnAround':h.alice(-1);s.money=true;s.robbery='gun';s.ch10Robbery='holdup';s.ch10RobberyNews=true;closeStore(s);s.ch10Roam.prompt='howGot';t=say(t,AFTER_MONEY);break;
  case 'bills':s.ch10Roam.prompt='clerkGun';break;
  case 'convince':h.alice(1);s.money=true;s.robbery='convinced';s.ch10Robbery='convinced';closeStore(s);t=say(t,AFTER_MONEY,'{{Kara}}: “I just... asked the cashier for a few dollars…”');break;
  case 'clerkGiveUp':s.ch10Robbery='abandoned';closeStore(s);break;
  case 'truth':s.ch10Roam.prompt='why';s.ch10Roam.whyFrom='truth';break;
  case 'lie':s.ch10Roam.prompt=null;break;
  case 'factual':case 'justify':case 'uncertain':s.ch10Roam.prompt=null;s.ch10Roam.whyFrom=null;break;
  case 'apologize':h.alice(1);s.ch10Roam.prompt=null;s.ch10Roam.whyFrom=null;break;
  // Seen stealing
  case 'caughtGun':h.alice(-1);s.ch10Roam.prompt='floor';s.robbery='gun';s.ch10Robbery='caughtGun';s.ch10RobberyNews=true;s.ch10Roam.storeClosed=true;break;
  case 'floor':s.ch10Roam.prompt='takeMoney';t=say(t,'Clerk: “Take whatever you want… Just don’t kill me…” {{Alice}}: “{{Kara}}, what are you doing? You can’t do that, it’s wrong!” {{Kara}}: “It’s going to be alright, {{Alice}}.”');break;
  case 'takeMoney':s.money=true;closeStore(s);break;
  case 'leaveWithGoods':closeStore(s);break;
  case 'caughtLeave':case 'putBack':t=say(THROWN_OUT,loseGoods(s));closeStore(s);break;
  // The parking lot
  case 'breakCar':s.ch10Roam.carBroken=true;s.ch10Roam.prompt='car';break;
  case 'carAgain':s.ch10Roam.prompt='car';break;
  case 'pliers':s.ch10Cutters='generator';break;
  case 'cutLot':t=enterSquat(s,h,'from the parking lot');break;
  case 'leaveLot':toStreet(s);break;
  case 'stayHere':h.alice(-LARGE);commit(s,'car');break;
  case 'keepSearching':toStreet(s);break;
  // Ralph and the house
  case 'ralph1':s.ch10Roam.prompt='ralph2';t=say(t,'{{Ralph}}: “Visitors are dangerous… Look… What they did to {{Ralph}}.”');break;
  case 'ralphGun':s.ralphHostile=true;s.ch10Roam.prompt='ralph3';break;
  case 'ralph2':case 'hospitality':s.ch10Roam.prompt='ralph3';break;
  case 'ralphLeave':s.ch10Roam.squatClosed=true;toStreet(s);break;
  case 'ralphStay':s.ch10Roam.at='house';s.ch10Roam.prompt=null;break;
  case 'fire':d.fire=true;break;
  case 'bed':d.bed=true;break;
  case 'ralphTalk':d.rA9=true;s.ch10RalphRA9=true;h.learn(opt.fact);break;
  case 'aliceBed':commit(s,'squat');break;
  case 'leaveSquat':s.ch10Roam.squatClosed=true;toStreet(s);break;
 }
 // Out of the rain in the squat's house Alice can wait; anywhere else she wants to sit down at the bus stop.
 s.ch10Roam.tired=!s.ch10TrashCollector&&s.ch10Roam.street>=rules.trashForcedAfter&&s.ch10Roam.at!=='house';
 // ALICE TOO COLD: once the actions after the trash collector, or the night's actions in all, are spent, the first moment
 // with nothing waiting, anywhere but the squat's house.
 if(s.ch10TrashCollector)s.ch10Roam.sneezing=s.ch10Roam.clock>=rules.sneezeAt;
 const spent=s.ch10Roam.clock>=rules.coldAfter||s.ch10Roam.street+s.ch10Roam.clock>=rules.nightLength;
 if(s.ch10Roam.on&&!s.ch10Roam.prompt&&s.ch10Roam.at!=='house'&&s.ch10TrashCollector&&spent){
  const inside=s.ch10Roam.at!=='street';s.ch10ColdNight=true;commit(s,'car');
  t=say(t,inside&&'{{Kara}} takes {{Alice}} back out into the rain.','{{Alice}} stops in the rain, shaking.')}
 // Rule 2: the action that leaves one more before ALICE TOO COLD says so plainly (not in the squat's house, which is exempt).
 else if(again&&s.ch10Roam.on&&s.ch10TrashCollector&&s.ch10Roam.at!=='house'&&actionsLeft(s)===1)
  t=say(t,'{{Alice}} is shaking with cold and cannot go on much longer: unless {{Kara}} gets her in out of the rain now, she will be too cold to go any farther tonight.');
 return t??'';
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'KF01':s.ch10Roam.on=true;s.ch10Roam.at='street';return '';
  case HUB:{const event=hubConsequence(n,s,opt,fail,h);s.ch10WireCutters=s.ch10Cutters;s.wireCuttersStolen=s.ch10Cutters==='store';s.ch10RalphCarving=s.ch10RalphRA9;return event}
  case 'KF03':h.alice(-LARGE);return '';
  case 'KF04':return say(opt.outcome,CHECKED_IN);
  case 'K08':s.ch10Promise=choice==='0'?'promise':'cantPromise';h.alice(choice==='0'?1:-1);return '';
  case 'KF05':return '';
  case 'KF06':if(['0','2'].includes(choice)){s.ch10ToyGiven=true;s.ch10Roam.toy=false}return '';
  case 'KF07':s.ch10Sleep=choice==='0'?'beside':'chair';if(choice==='0')h.alice(1);return '';
  case 'KF08':case 'KF09':case 'KF10':{const where={KF08:'motel',KF09:'car',KF10:'squat'}[n.id];s.ch10Ending=ENDINGS[where];if(where==='car')s.ch10Sleep='beside';if(where==='squat')s.ch10Fireplace=true;return ''}
 }
}
