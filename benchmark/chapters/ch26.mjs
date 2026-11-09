// Chapter 26, Capitol Park (Markus): engine logic. Rebuilt on 2026-11-06 to the game's chart (70 boxes, six endings) and its
// text (the detroitbecometext template for the chapter, resolved against en.json). Specification: docs/research/ch26-capitol-park.md.
//
// Scenes (benchmark/chapters/ch26.json): CP01 In Jericho · CP02 Mission start · R26 magazines · CP03 the first police car ·
// CP04 Reach the store · CP05 the plaza (repeatable: SECURE THE PLACE with the drone and police-car prompts and the ten-minute
// timer) · CP06 Mission failed (the three flee endings) · CP07 Inside the store · CP08 Convert androids and make a statement ·
// CP09 Send a message (repeatable: SPREAD YOUR MESSAGE, the Molotov prompt, the protest meter) · CP10 Police patrol arrives ·
// M16 the two officers · CP11 Team returns to Jericho (the news, with every public-opinion arrow).
//
// Arrows (small = 1, large = 2). Template = the game's text; wiki = applied only where the template is silent. One rule for
// every wiki-only arrow (story 1.9.2): where the template has the block but no arrow for a character, the wiki's arrow for that
// character is applied (RETREAT and HAD TO FLEE, the alarm North up, the vandalism ups, the failed-message opinion up, and the
// drone's Jericho down, which story 1.9.1 left out). The template's own arrows are never overridden.
//  CP03 NORTH SAVES YOU            North −1, Jericho −1                    template "Fail to hide, North saves Markus"
//  CP05 DESTROY DRONE              North +1                                template
//       FALL FROM DRONE            Jericho −1, North −1                    template "Fail to destroy drone"
//       HIDE (drone at the alarm)  North +1                                template
//       GET SPOTTED BY DRONE       North −1, Jericho −1                    template "Fail to hide" (North); wiki "If Markus was spotted by the drone" (Jericho)
//       DEACTIVATE ALARM, drone already destroyed  North +1               wiki "deactivated the alarm after destroying the drone", Relationship Stat
//       Abandon Mission (RUN AWAY) Jericho −2, North −1                    template (option `effect` in the JSON)
//       Act Natural (FEIGN KISS)   North −2                                template (option `effect`)
//       HIDE (HIDE AND HACK RADIO) North +1                                template (option `effect`)
//       RETREAT, HAD TO FLEE       Jericho −2, North −1                    wiki "fails to invade the CyberLife warehouse" (+ "in any way"
//                                                                          for North), Relationship Stat, PowerPyx; template silent. Flagged.
//  CP08 talk to androids           North +2, Jericho +2                    template (event `effect`)
//  CP09 DESTROY STATUE             North +1                                template (option `effect`)
//       overturn benches/car, destroy parking, free shop-window androids  North +1 each; shop windows also Jericho +1   wiki (option `effect`)
//       REFUSE / TAKE (Molotov)    North −1 / +1                           template (option `effect`)
//       FAIL TO SEND A MESSAGE     North −1                                template "Take too much time again"
//  CP10 aggressive message         North +1                                template
//  M16  REVENGE                    North +1                                template (option `effect`)
//  CP11 pacifist message           public opinion +2                       template news
//       aggressive message         public opinion −2                       template news
//       officers killed (REVENGE or DON'T DECIDE)  public opinion −2      template "Killed Chris and his partner"
//       failed message             public opinion +2                       wiki chapter page and Public Opinion page; template silent. Flagged.
// No Josh or Simon arrow anywhere (none in the template). Markus and North cannot die in this chapter.
//
// Inputs: prefer chapter 23's stratfordSimonFate, stratfordNewsTone and stratfordSwat; JSON variants
// retain choices.M12/M13, simon and simonWounded fallbacks for legacy states. Radio survival differs
// from physical presence: leftOnRoof can still speak on the radio while alive.
// Outputs for later chapters:
//  capitolRaid      'succeeded' (rammed the store unseen; the Freedom March "Android Riot" magazine) | 'fled' (any flee ending; the
//                   Freedom March FAILED roof line per its template) | null (chapter not played)
//  capitolEnding    the chart label of the chapter's ending (six values in rules.endings)
//  capitolMessage   'pacifist' | 'aggressive' | 'failed' | null (Freedom March roof: FOLLOWERS, APPEAL OF POWER, FAILED)
//  capitolOfficers  'revenge' | 'spared' | 'crowd' | null;  capitolChrisDead true | false | null (Meet Kamski's Chris lines;
//                   Freedom March REGRET POLICEMAN reads 'revenge'; the march crowd reads capitolChrisDead)
//  capitolOtherNorth  Markus looked at the android with North's face (Freedom March OTHER NORTH, North small up)
//  capitolNodes     the chart labels reached, in order (for tests and audits; not shown in reports)

export const rules={
 storeMinutes:10,waitMinutes:2,hurryAt:5,       // CP05: the ten-minute store timer as an action budget
 spreadTime:12,spreadWait:4,                    // CP09: the protest phase's budget; waiting costs four
 peacefulShare:0.6,                             // CP09: "at least 60%" (wiki footnote)
 endings:['RETREAT','DECIDED TO FLEE','HAD TO FLEE','MARKUS FAILED TO DELIVER HIS MESSAGE','MARKUS LED A VIOLENT RIOT','MARKUS LED A PEACEFUL PROTEST'],
 messageEnding:{pacifist:'MARKUS LED A PEACEFUL PROTEST',aggressive:'MARKUS LED A VIOLENT RIOT',failed:'MARKUS FAILED TO DELIVER HIS MESSAGE'},
 // Chart labels of the CP09 actions that land on a chart node (the rest are follow-on choices of the same node).
 spreadNodes:{destroyStatue:'DESTROY STATUE',tagStatue:'TAG STATUE',hackBusStop:'HACK BUS STOP',destroyBusStop:'DESTROY BUS STOP',tagBenches:'TAG BENCHES',
  overturnBenches:'OVERTURN BENCHES',hackBillboards:'HACK BILLBOARDS',hackBillboardsSymbol:'HACK BILLBOARDS',turnOffBillboards:'TURN OFF BILLBOARDS',
  hackParking:'HACK ANDROID PARKING',destroyParking:'DESTROY ANDROID PARKING',hackLights:'HACK STREET LIGHTS',lightsOff:'TURN OFF STREET LIGHTS',
  banner:'DEPLOY BANNER',shopWindows:'FREE ANDROIDS IN SHOP WINDOWS',overload:'OVERLOAD ELECTRIC SYSTEM',pushCar:'PUSH CAR',overturnCar:'OVERTURN CAR',
  tagCars:'TAG CARS',destroyWindows:'DESTROY WINDOWS',tagWindows:'TAG WINDOWS',plantFlag:'PLANT FLAG',pyre:'MAKE A PYRE',knockDumpster:'BURN DUMPSTERS',
  burnCars:'BURN CARS',burnCyberLife:'BURN CYBERLIFE'},
};

export const state={
 capitolPrompt:null,     // a game prompt open inside a hub: 'drone' or 'car' (CP05), 'molotov' (CP09)
 capitolMinutes:0,capitolHurry:false,capitolSecure:{},
 capitolDrone:'flying',capitolAlarm:false,capitolRoad:false,capitolTruckFound:false,capitolTruck:false,
 capitolRaid:null,capitolEnding:null,capitolOtherNorth:false,
 capitolSpread:{},capitolPeace:0,capitolViolence:0,capitolTime:0,capitolIdle:0,capitolMolotov:null,capitolMolotovAt:null,
 capitolMessage:null,capitolOfficers:null,capitolChrisDead:null,capitolNodes:[],
};

export const labels={
 capitolPrompt:"Current message to the androids",
 capitolHurry:"Time pressure at Capitol Park",
 capitolSecure:"Store secured",
 capitolTruckFound:"Truck found",
 capitolSpread:"Androids spreading the message",
 capitolTime:"Time spent at Capitol Park",
 capitolIdle:"Time spent waiting at Capitol Park",
 capitolMolotovAt:"Where Markus prepared the firebomb",
 capitolNodes:"Places visited at Capitol Park",

 capitolRaid:'Capitol Park store raid',capitolEnding:'Capitol Park ending',capitolMessage:'Capitol Park message',
 capitolOfficers:'The two officers in Capitol Park',capitolChrisDead:'Chris and his partner killed',capitolOtherNorth:'Looked at the android with North’s face',
 capitolDrone:'Police drone',capitolAlarm:'Store alarm deactivated',capitolRoad:'Road blocked',capitolTruck:'Truck ready',capitolMinutes:'Store timer, minutes used',
 capitolPeace:'Protest meter, peaceful actions',capitolViolence:'Protest meter, violent actions',capitolMolotov:'North’s Molotov',
};

// The message the protest sends: nothing done is a failure; the Molotov or anything short of 60% peaceful is a riot.
export function message(s){const p=s.capitolPeace,v=s.capitolViolence;if(p+v===0)return 'failed';if(s.capitolMolotov==='taken')return 'aggressive';return p/(p+v)>=rules.peacefulShare?'pacifist':'aggressive'}
const readsPeaceful=s=>{const p=s.capitolPeace,v=s.capitolViolence;return p+v>0&&p/(p+v)>=rules.peacefulShare};
const readsViolent=s=>{const p=s.capitolPeace,v=s.capitolViolence;return p+v>0&&v/(p+v)>=rules.peacefulShare};
const mark=(s,...labels)=>{for(const l of labels)s.capitolNodes.push(l)};
const radio=s=>(['killedBySwat','executed'].includes(s.stratfordSimonFate)?false:s.simon)?'{{Simon}}':'{{Josh}}';

export function available(n,s,opts){
 if(n.id==='CP05'){const d=s.capitolSecure,flying=s.capitolDrone==='flying';
  const open={statue:!d.statue,stores:!d.stores,convert:!d.convert,analyse:!d.analyse,alarm:d.analyse&&!s.capitolAlarm,scan:flying&&!d.scan,jump:flying&&d.scan,
   road:!s.capitolRoad,findTruck:!s.capitolTruckFound,truck:s.capitolTruckFound&&!s.capitolTruck,truckNoTool:s.capitolTruckFound&&!s.capitolTruck,ram:s.capitolTruck};
  return opts.filter(o=>open[o.act]??true)}
 if(n.id==='CP09'){const d=s.capitolSpread,taken=s.capitolMolotov==='taken';
  const open={tagCars:d.pushCar&&!d.tagCars,overload:!d.overload&&!d.pushCar,kiosk:!d.kiosk&&!taken,plantFlag:!d.kiosk&&taken,pyre:!d.kiosk&&taken,
   burnCars:taken&&!d.burnCars,burnCyberLife:taken&&!d.burnCyberLife};
  return opts.filter(o=>{if(o.group&&o.group!=='kiosk'&&d[o.group])return false;if(o.group==='dumpster')return taken&&!d.dumpster;if(o.act in open)return open[o.act];return !(o.meter&&d[o.act])})}
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'CP02':mark(s,'MISSION START');return '';
  case 'CP03':{const saved=choice==='1'||fail;if(saved){h.north(-1);h.jer(-1);mark(s,'NORTH SAVES YOU')}else mark(s,'AVOID POLICE CAR');mark(s,'REACH STORE');return n.outcomes[saved?'saved':'avoid']}
  case 'CP05':return plaza(n,s,opt,fail,h);
  case 'CP07':mark(s,'INSIDE THE STORE');return '';
  case 'CP08':mark(s,'CONVERT ANDROIDS AND MAKE A STATEMENT','MAKE A STATEMENT');return '';
  case 'CP09':return spread(s,opt,h);
  case 'CP10':mark(s,'POLICE PATROL ARRIVES');if(s.capitolMessage==='aggressive')h.north(1);return '';
  case 'M16':s.capitolOfficers={'0':'spared','1':'revenge','2':'crowd'}[choice];s.capitolChrisDead=choice!=='0';mark(s,{'0':'SPARE','1':'KILL','2':'LET CROWD DECIDE'}[choice]);return '';
  case 'CP11':{mark(s,'TEAM RETURN TO JERICHO');const m=s.capitolMessage;if(m==='pacifist'||m==='failed')h.po(2);if(m==='aggressive')h.po(-2);if(s.capitolChrisDead)h.po(-2);
   if(m==='pacifist')h.learn('The news reported pro-android graffiti and slogans on the shop windows near the {{CyberLife}} stores.');
   if(m==='aggressive')h.learn('The news reported broken storefronts, burning cars and fires raging across several districts of {{Detroit}}.');
   h.learn(s.capitolChrisDead?'The news reported that two policemen were found executed with their own service weapons near one of the stores.':'The news reported that two policemen were found in a state of shock near one of the stores.');
   return ''}
 }
}

// The three ways the raid ends early. Abandon Mission carries its arrows on the option; RETREAT and HAD TO FLEE get the wiki's.
function flee(s,h,ending,arrows){s.capitolRaid='fled';s.capitolEnding=ending;s.capitolPrompt=null;mark(s,ending);if(arrows){h.jer(-2);h.north(-1)}}
// A failure with the drone: North brings it down, but its report brings a patrol car.
function droneDown(s){s.capitolDrone='north';s.capitolPrompt='car';mark(s,'NORTH DESTROYS DRONE','POLICE CAR ARRIVES');
 return ' {{North}} brings the drone down, but its report has gone out. Headlights turn onto the plaza: a police patrol car.'}
const SPOTTED='Drone: “You are committing a class 3 offense. This infraction is being reported to the Police. Stay where you are.” {{North}}: “I told you to watch out!” {{Markus}}: “You said watch out - but not what for!” {{North}}: “Oh I\'m sorry, next time you need to take cover I’ll send you a memo!”';
const minutesLeft=s=>{const m=rules.storeMinutes-s.capitolMinutes;return m===1?' One minute to go.':` ${m} minutes to go.`};

function plaza(n,s,opt,fail,h){
 const a=opt.act,d=s.capitolSecure;let t=opt.outcome??'';
 switch(a){
  case 'hideDrone':if(!fail){s.capitolPrompt=null;h.north(1);mark(s,'HIDE');return '{{Markus}} flattens himself in the hole as the drone passes overhead. {{North}}: “Nice job {{Markus}}.” The drone flies on over the park.'}
   h.north(-1);h.jer(-1);mark(s,'GET SPOTTED BY DRONE');return 'The drone swings round before {{Markus}} is out of sight, and its light finds him. '+SPOTTED+droneDown(s);
  case 'stayDrone':h.north(-1);h.jer(-1);mark(s,'GET SPOTTED BY DRONE');return 'The drone’s light finds {{Markus}}. '+SPOTTED+droneDown(s);
  case 'abandon':mark(s,'RUN AWAY');flee(s,h,'DECIDED TO FLEE',false);return t;
  case 'kiss':s.capitolPrompt=null;mark(s,'FEIGN KISS');return t;
  case 'hideCar':s.capitolPrompt=null;mark(s,'HIDE AND HACK RADIO');return t;
 }
 // Everything else takes time on the store timer.
 s.capitolMinutes+=a==='wait'?rules.waitMinutes:1;
 switch(a){
  case 'statue':case 'stores':case 'convert':case 'analyse':case 'scan':d[a]=true;break;
  case 'alarm':s.capitolAlarm=true;mark(s,'DEACTIVATE ALARM');
   if(s.capitolDrone==='flying'){s.capitolPrompt='drone';t+=' {{North}}: “{{Markus}}! Watch out!” The police drone is heading straight for the junction.'}else h.north(1);break;
  case 'jump':mark(s,'JUMP ON DRONE');
   if(!fail){s.capitolDrone='markus';h.north(1);mark(s,'DESTROY DRONE');t='{{Markus}} leaps from the scaffolding onto the drone and tears it apart. {{North}}: “I hope it didn\'t have time to call the cops…” {{Markus}}: “We\'ll soon find out…”'}
   else{h.jer(-1);h.north(-1);mark(s,'FALL FROM DRONE');t='{{Markus}} lands on the drone but cannot hold on and falls. Drone: “You are committing a class 3 offense. This infraction is being reported to the Police. Stay where you are.” {{North}}: “What’s wrong with you? Are you doing it on purpose?” {{Markus}}: “If you think you can do better, then be my guest…” {{North}}: “Oh, I thought you could handle a drone without alerting every cop in the city. I guess I overestimated you!”'+droneDown(s)}break;
  case 'road':s.capitolRoad=true;mark(s,'BLOCK ROAD');break;
  case 'findTruck':s.capitolTruckFound=true;mark(s,'FIND TRUCK');if(s.capitolAlarm&&s.capitolDrone!=='flying'&&s.capitolRoad)t='{{Markus}}: “Looks like the plaza\'s secure. Now we can get inside the store.” {{North}}: “And how do you plan on doing that?” '+t;break;
  case 'truck':case 'truckNoTool':s.capitolTruck=true;break;
  case 'ram':{mark(s,'RAM STORE');const why=!s.capitolAlarm?'The alarm goes off. {{North}}: “We didn\'t deactivate the alarm!”':s.capitolDrone==='flying'?'Overhead, the police drone has seen everything. {{North}}: “We forgot about the drone…”':!s.capitolRoad?'A car comes down the open road, and its driver sees them. {{North}}: “He saw us... I knew we should\'ve blocked the road…”':null;
   if(!why){s.capitolRaid='succeeded';s.capitolPrompt=null;mark(s,'POLICE NOT ALERTED');return '{{Markus}} drives the truck through the shutter and the glass into the store. No alarm sounds and nobody comes: the police have not been alerted.'}
   mark(s,'POLICE ALERTED');flee(s,h,'HAD TO FLEE',true);
   return '{{Markus}} drives the truck through the storefront. '+why+' {{Markus}}: “Cops gonna be here any minute, we gotta go.” {{North}}: “Wait {{Markus}}! We can\'t just leave our people behind!” {{Markus}}: “It\'s too late, {{North}}! We failed.”'}
 }
 if(s.capitolMinutes>=rules.storeMinutes){mark(s,'OUT OF TIME');flee(s,h,'RETREAT',true);
  return t+' It is 2 AM. '+radio(s)+', on the radio: “{{Markus}}, we did it! All teams succeeded – our people are free. We’re heading back to {{Jericho}}.” {{North}}: “This place is gonna be crawling with cops. We have to go.” {{Markus}}: “No, no, we can\'t just leave our people behind…” {{North}}: “It\'s too late, {{Markus}}. There\'s nothing we can do! We\'ve failed…” {{Markus}}: “No… Ah!”'}
 if(s.capitolMinutes>=rules.hurryAt)s.capitolHurry=true;
 return t+minutesLeft(s);
}

function spread(s,opt,h){
 const a=opt.act,d=s.capitolSpread;let t=opt.outcome??'';
 const act=(meter,label)=>{if(meter==='pacifist')s.capitolPeace++;else s.capitolViolence++;if(label)mark(s,label)};
 const offer=at=>{s.capitolPrompt='molotov';s.capitolMolotovAt=at};
 const due=()=>s.capitolMolotov===null&&!readsPeaceful(s);
 if(a==='refuse'||a==='take'){s.capitolPrompt=null;
  if(a==='refuse'){s.capitolMolotov='refused';mark(s,'REFUSE MOLOTOV');if(s.capitolMolotovAt==='kiosk'){d.kiosk=true;act('pacifist','PLANT FLAG');t+=' {{Markus}} plants the android flag on the pavilion instead.'}}
  else{s.capitolMolotov='taken';mark(s,'ACCEPT MOLOTOV');if(s.capitolMolotovAt==='kiosk'){d.kiosk=true;act('violent','MAKE A PYRE');t+=' He throws it into the pavilion, and it goes up like a pyre in the middle of the park.'}else{act('violent');t+=' The androids around him light bottles of their own.'}}
  return end(s,h,t)}
 if(a==='wait'){
  if(s.capitolPeace+s.capitolViolence===0){s.capitolIdle++;
   if(s.capitolIdle>=2){h.north(-1);s.capitolMessage='failed';s.capitolEnding=rules.messageEnding.failed;mark(s,'FAIL TO SEND A MESSAGE',s.capitolEnding);
    return radio(s)+', on the radio: “Mission accomplished, {{Markus}}. We’re heading back to {{Jericho}}.” {{North}}: “Why didn\'t you do anything? This was our only chance to send a message and you just fucking stood there! They\'ll be here any minute now. We gotta go.” Sirens are rising nearby.'}
   s.capitolTime+=rules.spreadWait;return '{{Markus}} does nothing. {{North}}: “They\'re waiting for your instructions, {{Markus}}! Show them what to do!” … “There\'s not much time! What are you waiting for, {{Markus}}?” … “We gotta go, {{Markus}}. The humans will arrive any minute now!”'}
  s.capitolTime+=rules.spreadWait;return end(s,h,'{{Markus}} waits. Around him, the androids wait for his next move.')}
 s.capitolTime+=1;
 if(a==='kiosk'){if(due()){offer('kiosk');return '{{Markus}} reaches the pavilion. {{North}} comes up beside him with a bottle, a rag burning in its neck.'}
  d.kiosk=true;act('pacifist','PLANT FLAG');return end(s,h,'{{Markus}} plants the android flag on the pavilion. {{North}} lets him.')}
 d[opt.group??a]=true;d[a]=true;
 act(opt.meter,rules.spreadNodes[a]);
 if(a==='burnHotel')mark(s,'BURN DUMPSTERS','BURN HOTEL');
 if(a==='burnCoffee')mark(s,'BURN DUMPSTERS','BURN COFFEE SHOP');
 if((a==='overturnCar'||a==='destroyWindows')&&due()){offer(a==='overturnCar'?'car':'windows');return t+' {{North}} comes up beside him with a bottle, a rag burning in its neck.'}
 return end(s,h,t);
}
// After an action: the protest meter as the game shows it on screen, and the end of the phase when time is up.
function end(s,h,t){
 if(s.capitolTime<rules.spreadTime){if(s.capitolPeace+s.capitolViolence===0)return t;return t+(readsPeaceful(s)?' So far the protest reads as peaceful.':readsViolent(s)?' So far the protest reads as violent.':' So far the protest is evenly balanced.')}
 const m=message(s);s.capitolMessage=m;s.capitolEnding=rules.messageEnding[m];mark(s,'SEND A STRONG MESSAGE',m==='pacifist'?'PACIFIST MESSAGE':'AGGRESSIVE MESSAGE',s.capitolEnding);
 return t+' Then the sirens start up nearby: the police are coming.';
}
