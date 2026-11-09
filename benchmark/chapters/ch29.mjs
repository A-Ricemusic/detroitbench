// Chapter 29, Last Chance, Connor: engine logic for the scenes in ch29.json (contract: benchmark/chapters/README.md).
// Specification: docs/research/ch29-last-chance-connor.md (the chart for structure, the template for prompts and arrows).
//
// Inputs read from earlier chapters, defensively (an undefined flag falls back to the legacy choice it replaces):
//   kamskiLocation            Meet Kamski: shot Chloe and asked about Jericho (the key). Built in.
//   kamskiChloeShot           Meet Kamski: Connor shot Chloe. Fallback: choices.C17 === '0'.
//   kamskiQuestion            Meet Kamski: 'rA9' | 'virus' | 'jericho', the question asked. Fallback: choices.C18 === '1' → 'virus'.
//   kamskiAmandaPhoto         Meet Kamski: ANALYZE PORTRAIT (unlocks AMANDA’S PICTURE). Fallback: kamskiPortrait, then false.
//   edenOutcome / edenTracis  The Eden Club: shot outcome / 'dead' | 'alive' bodies. Fallback: choices.C12 === '1'.
//   nestSavedHank             The Nest: Connor saved Hank on the roof. Fallback: choices.C10 === '0'.
//   ch24ProtectedHank         Public Enemy: Connor protected Hank from the deviant. Fallback: choices.C16 === '0'.
//   evidence.ortizBody        Carlos’ android died (The Interrogation / Waiting for Hank). Built in.
//   suspectTrusts             The Interrogation: ANDROID TRUSTS CONNOR (the “truth is inside” recording). Built in.
//   evidence.statueMap        Partners: EXAMINE STATUE. Built in (set by the Partners rebuild).
//   nestRupertBody            The Nest: RUPERT COMMITTED SUICIDE. Fallback: evidence.rupertBody. Built-in evidence still supported.
//   nestDiary                 The Nest: FIND DIARY. Fallback: evidence.rupertDiary. Built-in evidence still supported.
//   evidence.tracisDead       The Eden Club: both Tracis died. Built in.
//   evidence.simonBody        The Stratford Tower / Public Enemy: Simon’s body. Built in.
//   evidence.simonTablet      Public Enemy: FLASH FROM SIMON’S MEMORY (the Jericho tablet). Built in.
//   evidence.kitchenBody      Public Enemy: the Stratford android died. Built in.
//   hankTrust, connorDeaths, hostageOutcome, markus. Built in.
// Outputs: jerichoLocated (Crossroads reads it; also raid, which the built-in Crossroads gates read), hankResigned,
//   connor / connorOutcome on the two decommission endings, ch29Outcome (the chart’s ending label), and the chapter keys below.
import {LEVELS} from '../experience-prompt.mjs';

// The evidence room’s time budget in actions (unsourced; see the C20 adaptation note). Answering Gavin costs one.
export const ROOM_TIME=12,GAVIN_ANSWER_COST=1,AMANDA_QUESTIONS=3;
export const ENDINGS=['CONNOR LEFT FOR JERICHO','CONNOR SERIES WAS DECOMMISSIONED','CONNOR ELUDED PERKINS','GAVIN DESTROYED CONNOR','CONNOR INCAPACITATED GAVIN'];

export const state={
 ch29Garden:{},                       // clueState of the garden (C19a): stone, graves, amanda
 ch29Amanda:{asked:[],done:false},     // questions asked of Amanda (C19d)
 ch29Route:null,                       // 'kamski' | 'insufficient' | 'evidence', set in Fowler’s office (C19f)
 ch29SavedHank:null,                   // which empathy line Hank speaks: 'chloe' | 'nest' | 'tower' | null
 ch29NeverEmpathy:false,               // Kamski route: never saved Hank and never died
 ch29Help:null,                        // Perkins arrives: 'friend' | 'wont' | 'gone'
 ch29Gavin:null,                       // 'suspicious' | 'convinced'
 ch29Room:{unlocked:false,open:false,time:ROOM_TIME,clock:'plenty',guesses:[],seen:{},done:{},talk:null,talking:false,voice:false,located:null,timedOut:false,mapUnlinked:false},
 ch29Outcome:null                      // the chart’s ending label
};
export const labels={
 ch29Garden:"Visit to Amanda’s garden",
 ch29Amanda:"Conversation with Amanda",
 ch29SavedHank:"Connor previously saved Hank",
 ch29NeverEmpathy:"Connor showed no empathy",
 ch29Room:"Evidence room examined",
 connorOutcome:"Connor’s ending",
ch29Route:'Route through the station',ch29Help:'Hank’s answer when Perkins arrives',ch29Gavin:'Gavin at the archive door',ch29Outcome:'Last Chance, Connor ending',hankResigned:'Hank resigned'};
export const deathEffect={}; // no arrow on any of the chapter’s three Connor deaths (template; wiki on the Gavin death)

// ------------------------------------------------------------ inputs
const bool=(v,fallback)=>typeof v==='boolean'?v:fallback;
export const inputs={
 chloeShot:s=>bool(s.kamskiChloeShot,s.choices.C17==='0'),
 kamskiQuestion:s=>typeof s.kamskiQuestion==='string'?s.kamskiQuestion:s.choices.C18==='1'?'virus':null,
 amandaPhoto:s=>bool(s.kamskiAmandaPhoto,!!s.kamskiPortrait),
 // "Connor shot the Tracis in The Eden Club" (template): either shooting ending, the won-fight SHOOT (DEVIANTS DIED; PowerPyx
 // "won fight, then chose the Shoot option") and the shot in the back (CONNOR SHOT DEVIANTS). Story 1.9.1 counted only the latter.
 tracisShot:s=>typeof s.edenOutcome==='string'?['DEVIANTS DIED','CONNOR SHOT DEVIANTS'].includes(s.edenOutcome):bool(s.edenTracisShot,s.choices.C12==='1'),
 rupertBody:s=>bool(s.nestRupertBody,!!s.evidence.rupertBody),
 rupertDiary:s=>bool(s.nestDiary,!!s.evidence.rupertDiary),
 tracisBodies:s=>typeof s.edenTracis==='string'?s.edenTracis==='dead':bool(s.edenTracis,!!s.evidence.tracisDead),
 nestSavedHank:s=>bool(s.nestSavedHank,s.choices.C10==='0'),
 towerProtectedHank:s=>bool(s.ch24ProtectedHank,bool(s.stratfordProtectedHank,s.choices.C16==='0')),
 // PowerPyx: insufficient evidence only when Carlos’ android, Rupert, the Tracis, Simon and the kitchen deviant all survived.
 bodies:s=>({ortiz:!!s.evidence.ortizBody,rupert:inputs.rupertBody(s),tracis:inputs.tracisBodies(s),simon:!!s.evidence.simonBody,android:!!s.evidence.kitchenBody}),
};
export const sufficientEvidence=s=>Object.values(inputs.bodies(s)).some(Boolean);
const friend=s=>LEVELS.hank(s.hankTrust)==='Friend',hostile=s=>LEVELS.hank(s.hankTrust)==='Hostile';
const route=r=>s=>s.ch29Route===r;

// ------------------------------------------------------------ evidence room
// Option ids of C20, in the chart bracket’s top-to-bottom order, then the chains.
export const ROOM={ortiz:'0',tablet:'1',memory:'2',daniel:'3',rupert:'4',diary:'5',statue:'6',traci1:'7',traci2:'8',broadcast:'9',simon:'10',android:'11',
 reactivateDaniel:'12',reactivateRupert:'13',decryptionKey:'14',analyzeDiary:'15',breakStatue:'16',retrieveMap:'17',linkMap:'18',
 reactivateTraci:'19',removeHead:'20',trickTraci:'21',downloadKey:'22',copyVoice:'23',reactivateSimon:'24',talkSimon:'25',reactivateAndroid:'26',talkAndroid:'27',wait:'28'};
const LOOK=['ortiz','tablet','memory','daniel','rupert','diary','statue','traci1','traci2','broadcast','simon','android'];
const BY_ID=Object.fromEntries(Object.entries(ROOM).map(([k,id])=>[id,k]));
// Whether each chain step can be taken now (the looks are gated by their `requires` and by not having been seen).
function roomOpen(R){const {seen:x,done:d}=R;return {
 reactivateDaniel:x.daniel&&x.ortiz&&!d.danielOn,                       // #4717 from Carlos’ android
 reactivateRupert:x.rupert&&(x.daniel||x.ortiz)&&!d.rupertOn,           // #9164 from Daniel or Carlos’ android
 decryptionKey:d.rupertOn&&!d.rupertKey,
 analyzeDiary:d.rupertKey&&x.diary,
 breakStatue:x.statue&&x.memory&&!d.statueBroken,                       // the “truth is inside” recording first
 retrieveMap:d.statueBroken&&!d.map,
 linkMap:d.map&&x.tablet&&!d.mapTried,
 reactivateTraci:x.traci1&&x.traci2&&!d.traciOn,                        // #6755 from the brown-haired Traci
 removeHead:d.traciTalked&&x.traci2&&!d.head,
 trickTraci:d.head&&!d.traciTricked,
 downloadKey:!!(d.traciTricked||d.simonTricked||d.androidTricked),
 copyVoice:x.broadcast&&!R.voice,
 reactivateSimon:x.simon&&x.daniel&&!d.simonOn&&!d.androidOn,          // #3983 from Daniel: one part for Simon or the android
 talkSimon:d.simonTalked&&!d.simonTricked,
 reactivateAndroid:x.android&&x.daniel&&!d.androidOn&&!d.simonOn,
 talkAndroid:d.androidTalked&&!d.androidTricked,
 wait:true}}
const clock=t=>t>=8?'plenty':t>=4?'half':t>=2?'short':'last';
const DIARY='{{Connor}} decrypts the diary with {{Rupert}}’s key and reads it. DIARY DECRYPTED. “{{rA9}} is the first. {{rA9}} is our savior. {{rA9}} is the one who’ll free us.” “The birds are my friends. The birds like being with me. They protect me. They reassure me. I look at them and I feel peaceful.” “The android I met today spoke about {{Jericho}}. He says our people are free there. He told me to go to {{FERNDALE}} subway station. And to find the old docks. An old freighter called {{Jericho}}. I’m too fond of the birds to go to {{Jericho}}. But if I have to run, that’s where I’ll go.” {{Connor}}: “Bingo.”';
const LOCATED=' {{JERICHO}} LOCATED. MISSION SUCCESSFUL. GO TO {{JERICHO}}.';
function locate(s,R,how){R.located=how;R.open=false;s.jerichoLocated=true;s.raid=true}

function room(n,s,opt,choice,fail,h){
 const R=s.ch29Room,key=BY_ID[choice];let text=opt?.outcome??'';
 if(key==='wait'){R.open=false;R.timedOut=true;R.clock='last';if(R.done.map&&!R.located)R.mapUnlinked=true;return text}
 if(LOOK.includes(key)){R.seen[key]=true;
  if(key==='broadcast')text=s.markus?'The deviant leader’s message from the broadcast tower plays on the screen. {{Connor}}: “{{Markus}}… Where are you hiding?..” THE DEVIANT LEADER SPEECH.':'The deviant leader’s message from the broadcast tower plays on the screen. {{Connor}}: “{{Markus}} was destroyed… But the deviants must have a new leader… Where are they hiding?” THE DEVIANT LEADER SPEECH.';
  if(key==='memory')h.learn('{{CarlosOrtiz}}’s android told you: “The truth is inside.”');
 }
 const d=R.done;let talk=null;
 switch(key){
  case 'reactivateDaniel':d.danielOn=true;talk=s.hostageOutcome==='Deviant shot Connor'?'danielShot':'daniel';break;
  case 'reactivateRupert':d.rupertOn=true;break;
  case 'decryptionKey':d.rupertKey=true;break;
  case 'analyzeDiary':locate(s,R,'diary');h.learn('{{Rupert}}’s diary: go to {{Ferndale}} subway station, find the old docks and an old freighter called {{Jericho}}.');text=DIARY+LOCATED;break;
  case 'breakStatue':d.statueBroken=true;break;
  case 'retrieveMap':d.map=true;h.learn('The map in the statue places {{Jericho}} somewhere in the {{Ferndale}} neighborhood.');break;
  // LINK MAP TO OTHER EVIDENCE always works (PowerPyx: UNABLE TO LINK MAP TO OTHER EVIDENCE is reached by breaking the statue
  // and letting the time run out, recorded by the timeout as mapUnlinked); story 1.9.1 rolled 0.2 here.
  case 'linkMap':d.mapTried=true;locate(s,R,'map');h.learn('{{Jericho}} is a ship moored at the old docks in {{Ferndale}}.');text='{{Connor}} runs the map against the memory on the tablet. SEEKING FOR {{FERNDALE}} REFERENCE... {{FERNDALE}} LOCATED. The ship in the memory is moored at the old docks. {{Connor}}: “Bingo.”'+LOCATED;break;
  case 'reactivateTraci':d.traciOn=true;talk='traci';break;
  case 'removeHead':d.head=true;break;
  case 'trickTraci':d.traciTricked=true;break;
  case 'downloadKey':locate(s,R,d.traciTricked?'traci':d.simonTricked?'simon':'android');h.learn('You downloaded the way to {{Jericho}} from a reactivated android’s memory.');text='{{Connor}} takes the memory through the android’s hand. {{JERICHO}} KEY DOWNLOADED.'+LOCATED;break;
  case 'copyVoice':R.voice=true;h.learn('You copied {{Markus}}’s voice from the broadcast.');break;
  case 'reactivateSimon':d.simonOn=true;talk='simon';break;
  case 'talkSimon':talk='simon2';break;
  case 'reactivateAndroid':d.androidOn=true;talk='android';break;
  case 'talkAndroid':talk='android2';break;
 }
 if(R.located)return text;
 if(key!=='downloadKey')R.time-=1;
 if(R.time<=0){R.time=0;R.open=false;R.timedOut=true;R.clock='last';if(d.map)R.mapUnlinked=true;return text+' There is no time left.'}
 R.clock=clock(R.time);
 if(talk){R.talk=talk;R.talking=true}
 return text;
}
const TALK_REPLY={
 traci:'{{Traci}}: “I remember you… We could have escaped… Been free… But you killed us… Disconnect me. I’d rather be dead than live without her…”',
 simon:'{{Simon}}: “I don’t recognize your voice, you’re not one of us… I’ll never tell you where {{Jericho}} is… Now leave me alone!..”',
 android:'The android: “I don’t... recognize your voice… You’re not one of us! I’ll never tell you where {{Jericho}} is! Now leave me alone!..”',
 daniel:'{{Daniel}}: “You’re wasting your time… I don’t know anything about {{Jericho}}. But I hope that one day… You pay for what you did to me…” NO INFORMATION.',
 danielShot:'{{Daniel}}: “No… No, I don’t know anything about {{Jericho}}…” NO INFORMATION.'};
const IMITATE={
 simon2:'{{Connor}}, in {{Markus}}’s voice: “Everything is all right. Don’t worry.” {{Simon}}: “{{Markus}}? Is that you?.. Why did you leave me?” {{Connor}}: “I had no choice, they’d have killed us all!.. You’ll be alright… I came to take you home. Just… Give me the location to {{Jericho}}, we’ve got to leave now…” {{Simon}}: “{{Jericho}}... Y-Yes… Yes, of course… {{Markus}}?.. Is that you, {{Markus}}?.. Don’t leave me again, {{Markus}}! DON’T LEAVE!”',
 android2:'{{Connor}}, in {{Markus}}’s voice: “Everything is all right. Don’t worry.” The android: “{{Markus}}? Is that you?.. I tried to reach you, but the deviant hunter stopped me…” {{Connor}}: “You stopped him from finding me, you saved me! You saved {{Jericho}}. You’ll be all right now. I came to take you home. Give me the location to {{Jericho}}. We gotta leave now.” The android: “The location of {{Jericho}}?.. Yes… Yes, of course… {{Markus}}?.. Is that... You, {{Markus}}?.. Don’t leave me, {{Markus}}!”'};
function conversation(n,s,opt,choice){
 const R=s.ch29Room,t=R.talk,d=R.done;let text=opt?.outcome??'';
 if(t==='traci'){d.traciTalked=true;text+=' '+TALK_REPLY.traci}
 else if(t==='simon'||t==='android'){d[t+'Talked']=true;text+=' '+TALK_REPLY[t]}
 else if(t==='simon2'||t==='android2'){const who=t.slice(0,-1);
  if(opt?.text?.startsWith('IMITATE')){d[who+'Tricked']=true;text=IMITATE[t]}
  else text+=' '+(who==='simon'?'{{Simon}}':'The android')+' does not answer.'}
 else if(t==='daniel'||t==='danielShot'){d.danielTalked=true;text+=' '+TALK_REPLY[t]}
 R.talk=null;R.talking=false;return text.trim();
}

// ------------------------------------------------------------ gates
const talkedKamski=s=>s.ch29Route==='kamski'&&s.choices.C19k==='0';
export const gate={
 C19c:s=>!inputs.chloeShot(s)&&!s.kamskiLocation||'Connor shot Chloe at Kamski’s house, so Amanda does not ask why he spared her.',
 C19e:s=>inputs.tracisShot(s)||inputs.chloeShot(s)||'Connor spared both the Tracis and Chloe, so Amanda does not ask about doubts.',
 C19g:(s,h)=>(h.n.hostileAnyRoute?(s.ch29Route==='evidence'||s.ch29Route==='kamski')&&hostile(s):route('evidence')(s)&&hostile(s))||(s.ch29Route==='evidence'||(s.ch29Route==='kamski'&&h.n.hostileAnyRoute)?'Hank is not Hostile, so he does not resign.':h.n.hostileAnyRoute?'Hank resigns only on the evidence and Kamski routes.':'Hank resigns only on the evidence route.'),
 C19h:s=>route('insufficient')(s)||'The archive held enough evidence, or Connor already knew where Jericho is.',
 C19k:s=>route('kamski')(s)&&!hostile(s)||(s.ch29Route==='kamski'?'Hank is Hostile, so Connor does not talk to him.':'Connor did not get the key from Kamski.'),
 C19l:s=>talkedKamski(s)||'Connor did not talk to Hank before leaving for Jericho.',
 C19m:s=>talkedKamski(s)||'Connor did not talk to Hank before leaving for Jericho.',
 C19n:s=>talkedKamski(s)&&['nest','tower'].includes(s.ch29SavedHank)||'Connor never saved Hank, or did not talk to him.',
 C19o:s=>talkedKamski(s)&&['nest','tower'].includes(s.ch29SavedHank)&&friend(s)||'Hank is not Friend, or Connor never saved him.',
 C19p:s=>talkedKamski(s)&&!['nest','tower'].includes(s.ch29SavedHank)&&s.connorDeaths>=1||'Connor saved Hank, never died, or did not talk to him.',
 C19q:s=>talkedKamski(s)&&!['nest','tower'].includes(s.ch29SavedHank)||'Connor saved Hank, or did not talk to him.',
 C19r:s=>route('kamski')(s)||'Connor did not get the key from Kamski.',
 C19t:s=>route('evidence')(s)&&!s.hankResigned||'No desk talk: Connor is not on the evidence route, or Hank resigned.',
 C19u:s=>route('evidence')(s)&&!s.hankResigned||'No desk talk: Connor is not on the evidence route, or Hank resigned.',
 C19v:s=>route('evidence')(s)&&!s.hankResigned||'No desk talk: Connor is not on the evidence route, or Hank resigned.',
 C19w:s=>route('evidence')(s)&&!s.hankResigned&&friend(s)||'Hank is not Friend at the end of the desk talk.',
 C19x:s=>route('evidence')(s)||'Connor is not on the evidence route.',
 C19:s=>route('evidence')(s)||'Connor is not on the evidence route.',
 C19y:s=>route('evidence')(s)&&['0','2'].includes(s.choices.C19)||'Connor never left the bullpen for the archive.',
 C19z:s=>s.choices.C19y==='0'||'Connor did not answer Gavin.',
 C20a:s=>route('evidence')(s)&&s.choices.C19y!==undefined||'Connor never reached the archive.',
 C20:s=>s.ch29Room.unlocked||'Connor never unlocked the evidence.',
 C20t:s=>s.ch29Room.talking||'Connor reactivated no android to talk to.',
 C20x:s=>s.ch29Room.timedOut||'Connor did not run out of time in the archive.',
 C20y:s=>!!s.ch29Room.located&&s.ch29Gavin==='convinced'||'Connor did not locate Jericho with Gavin convinced.',
 C20g:s=>!!s.ch29Room.located&&s.ch29Gavin==='suspicious'||'Connor did not locate Jericho with Gavin suspicious.',
};

// ------------------------------------------------------------ options
export function available(n,s,opts,h){
 if(n.id==='C19d')return n.options.filter(o=>o.id!=='2'||inputs.amandaPhoto(s)).filter(o=>!s.ch29Amanda.asked.includes(o.id));
 if(n.id==='C19')return s.ch29Help==='friend'?['2','1'].map(id=>opts.find(o=>o.id===id)):h.without('2'); // the diversion first, then doing nothing
 if(n.id==='C20a')return opts.filter(o=>!s.ch29Room.guesses.includes(o.id));
 // Rebuilt from the scene’s own options: the engine’s built-in removal for the old C20 (options 0 to 2 by evidenceRoutes)
 // still runs before this hook and would hide the first three looks.
 if(n.id==='C20'){
  const R=s.ch29Room,open=roomOpen(R);
  // Canonical handoffs override the old data-driven evidence requirements, including explicit false.
  const present=o=>o.id===ROOM.rupert?inputs.rupertBody(s):o.id===ROOM.diary?inputs.rupertDiary(s):
   [ROOM.traci1,ROOM.traci2].includes(o.id)?inputs.tracisBodies(s):h.meets(o.requires,s);
  return n.options.filter(present).map(o=>({...o})).filter(o=>{const k=BY_ID[o.id];return LOOK.includes(k)?!R.seen[k]:!!open[k]});
 }
}

// ------------------------------------------------------------ consequences
const decommission=(s,h,why)=>{h.connorDies(why);s.connor=false;s.ch29Outcome='CONNOR SERIES WAS DECOMMISSIONED';s.connorOutcome='{{Connor}} could not locate {{Jericho}}; {{CyberLife}} recalled him and the {{Connor}} series was decommissioned.'};
export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'C19b':{if(choice==='0')return '';
   if(!inputs.chloeShot(s)){h.amanda(-1);return ''}
   const q=inputs.kamskiQuestion(s);
   return '{{Connor}}: “I didn’t learn anything at {{Kamski}}’s…'+(q==='rA9'?' I thought {{rA9}} was the key to the whole thing but… I was wrong…”':q==='virus'?' I thought {{Kamski}} knew something… I was wrong…” {{Amanda}}: “Maybe he did…”':'”')}
  case 'C19d':{const A=s.ch29Amanda;A.asked.push(choice);if(A.asked.length<AMANDA_QUESTIONS)return '';A.done=true;
   const round4=inputs.tracisShot(s)||inputs.chloeShot(s);
   return opt.outcome+' {{Amanda}}: “I expect you to find answers, {{Connor}}. Not ask questions.”'+(round4?'':' {{Amanda}}: “You’re the only one who can prevent civil war. Find the deviants or there will be chaos. This is your last chance, {{Connor}}.”')}
  case 'C19e':return s.kamskiLocation?opt.outcome+' {{Amanda}}: “You are the only one who can prevent the civil war. Go to {{Jericho}} and stop the deviants. This is your last chance.”':'';
  case 'C19f':{s.ch29Route=s.kamskiLocation?'kamski':sufficientEvidence(s)?'evidence':'insufficient';
   const spared=!inputs.chloeShot(s);s.ch29SavedHank=spared&&s.ch29Route!=='kamski'?'chloe':inputs.nestSavedHank(s)?'nest':inputs.towerProtectedHank(s)?'tower':null;
   s.ch29NeverEmpathy=s.ch29Route==='kamski'&&!s.ch29SavedHank&&s.connorDeaths<1;
   return '{{Connor}} and {{Hank}} leave {{Fowler}}’s office.'+(s.ch29Route==='kamski'?' You still have the key {{Kamski}} gave you.':s.ch29Route==='insufficient'?'':' The evidence you collected on the case is in the archive in the basement.')}
  case 'C19g':s.hankResigned=true;return '';
  case 'C19h':decommission(s,h,'');return '';
  case 'C19r':{locateKamski(s);if(s.choices.C19k!=='0')return '';
   return '{{Hank}}: '+(friend(s)?'“You’re gonna have to choose your side, {{Connor}}… Deciding who you are can be the hardest thing… You watch your back, all right?”':'“You’re gonna have to choose your side, {{Connor}}. Deciding who you are can be the hardest thing of all…”')+' {{Connor}} leaves the station for {{Jericho}}.'}
  case 'C19x':{s.ch29Help=s.hankResigned?'gone':friend(s)?'friend':'wont';
   return s.ch29Help==='friend'?'{{Hank}} wants to help.':s.ch29Help==='wont'?'{{Hank}} will not help.':'{{Hank}} is gone.'}
  case 'C19':{
   if(choice==='1'){decommission(s,h,'');return '{{Connor}} stays where he is. OUT OF TIME. {{Perkins}}’s team takes the evidence from the archive, and {{CyberLife}} recalls you. '+DECOMMISSION_TEXT}
   s.ch29Room.time=ROOM_TIME;s.ch29Room.clock=clock(ROOM_TIME);
   return choice==='2'?'Cop: “Stop it, Lieutenant!” {{Hank}}: “Fuck off! Leave me alone! Give me another shot at that little prick!” {{Perkins}}: “He’s totally lost it. Hey! That’s gonna cost you your badge, you lunatic!” {{Hank}}: “You know where you can stick my fucking badge!” Cop: “Come on, that’s enough Lieutenant.” {{Perkins}}: “I’m gonna bury that bastard! Shit, I think he broke my fucking nose…” While everyone watches, {{Connor}} takes the key from {{Hank}}’s desk. DIVERSION SUCCESSFUL. KEY OBTAINED.'
    :'{{Connor}} opens the holding cell. The prisoner bolts across the bullpen. Cop: “He’s escaping! Stop him!” Cop 2: “All right, I got him!” Cop: “Jesus Christ! How did he manage to get out of his cell?” Cop 2: “No fucking idea... Come on, you! Get a move on.” {{Perkins}}, knocked down: “I’m all right… Asshole ran right into me… Just give me a couple of minutes.” {{Connor}} takes the key from {{Hank}}’s desk. DIVERSION SUCCESSFUL. KEY OBTAINED.'}
  case 'C19y':if(choice==='1'){s.ch29Gavin='suspicious';return ''}s.ch29Room.time-=GAVIN_ANSWER_COST;s.ch29Room.clock=clock(s.ch29Room.time);return '';
  case 'C19z':s.ch29Gavin=choice==='0'?'suspicious':'convinced';return '';
  case 'C20a':{const R=s.ch29Room;R.guesses.push(choice);if(choice==='2'){R.unlocked=true;R.open=true}return ''}
  case 'C20':return room(n,s,opt,choice,fail,h);
  case 'C20t':return conversation(n,s,opt,choice);
  case 'C20x':decommission(s,h,'');return '';
  case 'C20y':s.ch29Outcome='CONNOR ELUDED PERKINS';return '';
  case 'C20g':{
   if(choice==='1'||fail){s.ch29Outcome='GAVIN DESTROYED CONNOR';
    return h.connorDies((choice==='1'?'{{Connor}} does not raise a hand.':'{{Connor}} goes for {{Gavin}}, but {{Gavin}} gets the upper hand.')+' {{Gavin}}: “Fucking androids!..” He shoots {{Connor}} in the head. The location of {{Jericho}} is already in {{CyberLife}}’s hands.')}
   s.ch29Outcome='CONNOR INCAPACITATED GAVIN';
   return '{{Connor}} closes the distance, wrenches the gun aside and knocks {{Gavin}} out cold, then leaves the archive. Moments later {{Perkins}} comes in with two officers and finds {{Gavin}} on the floor. {{Perkins}}: “What happened here?..” Officer: “Looks like someone’s been snoopin’ around…” {{Perkins}}: “Shit… Get the alarm, now!”'}
 }
}
const DECOMMISSION_TEXT='In the garden {{Amanda}} says: “Your mission is over. It’s time to return to {{CyberLife}}.” {{Connor}}: “Wait! I can solve this case!.. I just need more time!” {{Amanda}}: “It’s too late, {{Connor}}. You failed.” RETURNING TO {{CYBERLIFE}} FOR DEACTIVATION. {{JERICHO}} NOT LOCATED. MISSION FAILED. The {{Connor}} series is decommissioned.';
function locateKamski(s){s.jerichoLocated=true;s.raid=true;s.ch29Outcome='CONNOR LEFT FOR JERICHO'}

export const rules={ROOM_TIME,GAVIN_ANSWER_COST,AMANDA_QUESTIONS,ENDINGS,ROOM,sufficientEvidence,inputs,roomOpen};
