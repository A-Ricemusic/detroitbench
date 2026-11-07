// Crossroads (chapter 30; Kara, Markus and Connor). Scenes in ch30.json; research in docs/research/ch30-crossroads.md
// (section 10, the detroitbecometext templates 30.1 Kara, 30.2 Connor, 30.3 Markus and the shared intro, decides prompts,
// labels and arrows; the three PowerPyx charts decide structure, node names and endings; the wiki fills the gaps).
//
// One chapter, three charts, intercut in the game's order: Kara's drive, Connor at Ferndale, Kara's arrival, Connor's
// exploration, Kara upstairs and Alice's secret, Markus's counsel in the captain's cabin (or North's, if Markus died in
// Freedom March), Connor in the cabin, then the raid (only if Connor located Jericho): Kara's corridor and crossroad,
// Markus's corridors (or deviant Connor's takeover), machine Connor's cargo hall, Kara's cabin, Josh, Kara's flight to the
// breach, the hold, the escape and the jump.
//
// Button order follows section 10's template, including the nested Kara rounds; chart-only timeouts come last.
// Stable option IDs are retained when display order changes.
//
// Performance checks. A QTE or timer the chart draws with a failure branch is a risk roll on the action (no source gives a
// probability; the values in RISKS are the benchmark's). Navigation failures the chart draws as OUT OF TIME / WRONG WAY
// events after an action are a low risk on that action. Choice rows the chart draws for doing nothing (TIME OUT, OUT OF TIME,
// LOSE TOO MUCH TIME) are offered as options.
//
// Wounds. A wounded Markus (or deviant Connor) dies on the next hit: the chart's MARKUS WOUNDED / MARKUS COLLAPSES pairs, the
// wiki ("if Markus is already wounded"), and the template's death conditions "Soldiers shoot Markus twice", "Markus shot
// twice", "Soldiers shoot Connor twice before arming explosive". PowerPyx and GamerGuides say the third bullet kills; that
// conflict is open question 6 of the note. Each hit also counts in the built-in `markusHits`, so Markus's status line shows
// the wound.
//
// Stat arrows (template; small = 1, large = 2). Data `effect` where unconditional, this module where conditional:
//  Kara   HUG ............................ Alice +2 (effect), Luther +1 if Luther is with her
//         DISTANT ........................ Alice −2 (effect)                     (the wiki's Luther down: not in the template)
//         FIND ALICE (after Alice left) .. Alice +2 (effect)
//         HELP LUTHER .................... Alice +1, Luther +1 (effect, whatever the QTE)   PROTECT ALICE ... Alice −1 (effect)
//         HURRY (after PROTECT ALICE) .... Alice −1 (effect)                     CONSOLE: none
//         OPEN ........................... Alice +1 (effect, whatever the fight)   DON'T OPEN ... Alice −1 (effect)
//         The meeting, the breach and every round after it: none.
//  Markus ANGRY (Josh's accusation) ...... Josh −1            REMORSE ... Josh +1          AGGRESSIVE…SOMBER, BITTER, NO REGRETS: none
//         MARKUS OUSTED .................. Jericho −2
//         CONFRONTATION .................. North +1, Josh −1   DIALOGUE ... North −1, Josh +1   STAY HIDING ... Josh +1, North −1, Simon +1
//         SAD…BITTER (reflection), KEEP / REFUSE, KISS: none          DON'T KISS ... North −2
//         Androids: INTERVENE ............ Jericho +1 (whatever the QTE)   DON'T INTERVENE ... Jericho −1
//         Reservoir: KNOCK SOLDIERS OUT .. Jericho +1   walk past ... Jericho −1
//         Josh: INTERVENE, NEUTRALIZE .... Jericho +1, Josh +2   LOSE THE UPPER HAND ... Jericho −1   HIDE ... Jericho −1
//         Rejoining the others ........... North +1, Jericho +1, Josh +1, Simon +1 (also for a returning exile; no large up)
//         SAVE NORTH, Markus injured ..... Jericho −1, Simon −1, Josh −2 (North dies)
//         SAVE NORTH, not injured ........ Jericho +1, North +2, Josh +1, Simon +1; failing with a deviant Connor: Jericho −1 more
//         RUN ............................ Jericho −1, Simon −1, Josh −2 (North dies)
//         A companion who is dead takes no arrow.
//  Connor facing Markus (Markus's rounds raise, Connor's round lowers; all small, data `effect` on instability):
//         REASON +1; DEFY, DISCOURAGE, THREATEN none | INTIMIDATE, INSTRUCTIONS none | CONVINCE +1, APPEAL +1, I KNOW YOU none,
//         OUR CAUSE +1 | STAY BACK! −1, WARNING SHOT −1, ENOUGH! −1, SAY NOTHING none | SOW DOUBTS, QUESTION, RALLY, UNDERMINE +1
//         facing North: INSTRUCTIONS, INTIMIDATE none | STAY BACK!, WARNING SHOT, ENOUGH! −1, SAY NOTHING none |
//         DISTURBED +1, SAY NOTHING, COLD −1 | COLD −1, DISTURBED +1, SAY NOTHING
//         BECOME A DEVIANT ............... Amanda −2 (effect). It needs "enough software instability": the engine's
//                                          DEVIANCY_THRESHOLD (no source gives a value; open question 1).
//  No public opinion change anywhere in the chapter. A Connor death here applies no stat change (deathEffect {}): the old
//  Hank −1 / Amanda −1 / instability −1 has no source for Crossroads.
//
// Cross-chapter inputs (read defensively; several chapters are being rebuilt at the same time):
//  raid / jerichoLocated ...... Connor located Jericho (Meet Kamski key or Last Chance, Connor). Without it there is no raid.
//  ch28MarkusDied / ch28NorthLeads, markus, markusActive ... Markus died in Freedom March (North leads; Kara meets North; Connor faces North).
//  lutherWith ................. Luther survived Midnight Train and travels with Kara.
//  simon, josh, north ......... alive.
//  jerichoTrust ............... Unpopular (constants.JERICHO_UNPOPULAR) ousts Markus after the second counsel round.
//  northLover ................. Lover status (Freedom March shared memories) offers KISS / DON'T KISS. Until Freedom March
//                               sets it, the pre-rebuild flag `northBond` (shared memories) is accepted, and KISS then sets
//                               `northLover` so Battle for Detroit's kiss stays reachable.
//  aliceMax ................... Alice never above Distant (below constants.ALICE_KEY) plus DISTANT makes Alice leave.
//  ch07ToddChased ............. (Stormy Night) adds Todd's flashback.
//  ch28Attacked (legacy ch28Charged) ... (Freedom March) Markus attacked the police: magazines, the attacked TV and Josh's line. Falls
//                               back to the pre-rebuild choices M18/M19 = '2'.
//  stratfordNewsTone / stratfordSpeech ... (Stratford Tower) 'determined' = aggressive speech for Josh's line; falls back to M12 = '1'.
//  edenTracis / edenOutcome (legacy ch20TracisEscaped) ... (Eden Club) SPOT TRACI; falls back to C12 = '0'.
//  nestRupert (legacy ch15RupertEscaped) ... (The Nest) SPOT RUPERT; falls back to C10 = '0'.
//  instability, deviant ....... Connor's state.
//
// Cross-chapter outputs (Night of the Soul, Battle for Detroit):
//  built-in: kara, alice, karaActive, karaRoute ('escape' or 'camp'), luther, lutherWith, lutherHidden, markus, markusActive,
//            movement ('revolution' once Markus is dead or gone), north, simon, josh, deviant (false again if a deviant
//            Connor is destroyed: the wiki "he is automatically set on his machine route"), connorDeaths, bomb (KEEP),
//            northLover, markusOutcome / karaOutcome / connorOutcome.
//  ch30Leader ............ who leads Jericho after the chapter: 'Markus', 'North' or null.
//  ch30MarkusExiled / ch30MarkusReturned   ousted; came back from the rooftop.
//  ch30ShipSunk .......... the explosives went off (the "ship is sinking" closing; otherwise hundreds of androids are taken).
//  ch30ConnorJoined ...... a deviant Connor escaped with Jericho's people ("Connor joined the revolution in Crossroads").
//  ch30ConnorDied ........ a Connor was destroyed here (Night of the Soul's Thin Ice).
//  ch30AliceLeftKara ..... Alice walked away from a distant Kara.   ch30LutherFate ... with / hidden / left / sacrificed / captured / withAlice.
//  ch30NorthShot ......... North was shot and saved (her injury lines in Night of the Soul).
//  ch30NorthWounded aliases ch30NorthShot; ch30JerichoBlown is 'markus' | 'connor' | 'none' for chapter 31.
//  ch30MarkusDied ........ death during this chapter only (not a Freedom March death).
//  ch30JoshSaved ......... Markus saved Josh from the soldier (Night of the Soul's "Check on Josh").
//  ch30KaraEnding, ch30MarkusEnding, ch30ConnorEnding  the chart labels; ch30EndingCards {Kara, Markus, Connor} the card (node
//            number in the note's section 1) among the 30 ending cards.
// Hank does not appear (his suicide belongs to Night of the Soul and is not built here).

export const RISKS=Object.freeze({corridor:0.1,crossroad:0.1,helpLuther:0.2,cabinFight:0.25,breach:0.15,markusEscape:0.1,connorEscape:0.1,
 intervene:0.2,cargoAttack:0.3,josh:0.15,gun:0.3,holdSoldiers:0.15,corridorConfrontation:0.3,escape:0.1,saveNorth:0.2,runToExit:0.1,helpMarkus:0.25,jump:0.1});

// The 30 ending cards (11 Kara, 10 Markus, 9 Connor), by node number in the note's section 1, with the chart labels.
export const ENDING_CARDS=Object.freeze({
 Kara:{K25:'KARA LEFT JERICHO ALONE',K26:'KARA, ALICE & LUTHER LEFT JERICHO',K27:'KARA & ALICE LEFT JERICHO',K33:'KARA, ALICE & LUTHER CAPTURED',K34:'KARA & ALICE CAPTURED',
  K43:'KARA & ALICE CAPTURED',K51:'KARA, ALICE & LUTHER CAPTURED',K61:'KARA & ALICE CAPTURED',K98:'KARA & ALICE CAPTURED',K99:'KARA & ALICE DIED IN THE ASSAULT',K101:'KARA & ALICE ESCAPED JERICHO'},
 Markus:{M7:'NORTH STAYED ALONE WITH HER THOUGHTS',M13:'MARKUS STAYED ALONE WITH HIS THOUGHTS',M20:'MARKUS LEFT JERICHO',M30:'MARKUS KILLED AND MOST OF JERICHO CAPTURED',M50:'MARKUS KILLED AND MOST OF JERICHO CAPTURED',
  M65:'MARKUS KILLED AND MOST OF JERICHO CAPTURED',M75:'CONNOR KILLED MARKUS',M81:'MARKUS KILLED AND MOST OF JERICHO CAPTURED',M102:'MARKUS DIED BUYING TIME FOR JERICHO',M104:'MARKUS FLED WITH HIS PEOPLE'},
 Connor:{C36:'MACHINE CONNOR WAS DESTROYED',C43:'MACHINE CONNOR WAS DESTROYED',C46:'CONNOR KILLED MARKUS',C54:'MACHINE CONNOR WAS DESTROYED',C85:'DEVIANT CONNOR WAS DESTROYED ON THE SHIP',
  C102:'DEVIANT CONNOR WAS DESTROYED ON THE SHIP',C112:'DEVIANT CONNOR WAS DESTROYED ON THE SHIP',C117:"CONNOR ESCAPED WITH JERICHO'S PEOPLE",C122:'DEVIANT CONNOR WAS DESTROYED ON THE SHIP'}});

export const state={
 ch30Car:{},ch30Explore:{},                    // the two clue hubs (the drive; Connor's EXPLORE JERICHO)
 ch30Run:{started:false,markusAtStart:null,leader:null,joshLine:null,can:{},
  kara:null,markus:null,connor:null,takeover:null,fromMarkus:null,
  markusWounds:0,connorWounds:0,markusRetry:false,connorRetry:false,legVisits:0,legRetry:false,
  connorAttacked:false,ousted:false,returned:false},
 ch30KaraEnding:null,ch30MarkusEnding:null,ch30ConnorEnding:null,ch30EndingCards:{},
 ch30Leader:null,ch30MarkusExiled:false,ch30MarkusReturned:false,ch30ShipSunk:false,ch30ConnorJoined:false,ch30ConnorDied:false,
 ch30AliceLeftKara:false,ch30LutherFate:null,ch30NorthShot:false,ch30JoshSaved:false,
 ch30NorthWounded:false,ch30MarkusDied:false,ch30JerichoBlown:'none',
};
export const labels={
 bomb:'Radioactive bomb detonator kept',ch30NorthWounded:'North wounded at Jericho',ch30MarkusDied:'Markus died at Jericho',ch30JerichoBlown:'Jericho explosives activated',
 ch30KaraEnding:'Crossroads ending (Kara)',ch30MarkusEnding:'Crossroads ending (Markus)',ch30ConnorEnding:'Crossroads ending (Connor)',
 ch30Leader:'Leader of Jericho after Crossroads',ch30MarkusExiled:'Markus ousted from Jericho',ch30MarkusReturned:'Ousted Markus went back',
 ch30ShipSunk:'Jericho blown up',ch30ConnorJoined:'Deviant Connor escaped with Jericho',ch30ConnorDied:'Connor destroyed at Jericho',
 ch30AliceLeftKara:'Alice walked away from Kara',ch30LutherFate:'Luther at Jericho',ch30NorthShot:'North shot and saved',ch30JoshSaved:'Markus saved Josh',
};
export const deathEffect={};
export const rules={RISKS,ENDING_CARDS,
 woundsToDie:2,           // a wounded Markus or deviant Connor dies on the next hit (chart, wiki, template; PowerPyx says three)
 deviancyThreshold:'engine DEVIANCY_THRESHOLD (unsourced)',
 order:'template; chart-only choices follow the chart; timeouts appended after buttons',
};

// ---------- small helpers ----------
const R=s=>s.ch30Run;
const raid=s=>!!(s.jerichoLocated??s.raid); // rebuilt ch29 exports the location; legacy raid is only a fallback
const charged=s=>s.ch28Attacked??s.ch28Charged??s.marchCharged??(s.choices.M18==='2'||s.choices.M19==='2');
const aggressiveSpeech=s=>s.stratfordNewsTone!=null?s.stratfordNewsTone==='aggressive':
 typeof s.stratfordSpeech==='string'?['aggressive','determined'].includes(s.stratfordSpeech):
 s.stratfordSpeech?.ending!==undefined?s.stratfordSpeech.ending==='determined':s.choices.M12==='1';
const tracisEscaped=s=>s.edenTracis!=null?s.edenTracis==='escaped':s.edenOutcome!=null?s.edenOutcome==='escaped':s.ch20TracisEscaped??(s.choices.C12==='0');
const rupertEscaped=s=>s.nestRupert!=null?s.nestRupert==='escaped':s.ch15RupertEscaped??(s.choices.C10==='0');
const lover=s=>!!(s.north&&(s.northLover??s.northBond));
const connorUp=s=>!!(s.connor&&R(s).connor&&R(s).connor!=='done');      // a Connor still in this chapter
const deviantUp=s=>!!(s.deviant&&connorUp(s)&&R(s).connor==='deviant');
const markusOn=s=>!!(s.markus&&s.markusActive);
export const mediaWhen={ch30Charged:s=>!!charged(s),ch30NotCharged:s=>!charged(s)};

function ending(s,who,card,text){const label=ENDING_CARDS[who][card];s['ch30'+who+'Ending']=label;s.ch30EndingCards={...s.ch30EndingCards,[who]:card};
 if(text)s[who.toLowerCase()+'Outcome']=text;return label}
function settle(s){const r=R(s);
 if(!r.started){r.started=true;
  if(s.ch28MarkusDied===true){s.markus=false;s.markusActive=false}
  if(s.ch28NorthLeads===true&&!s.ch28MarkusDied)s.markusActive=false;
  s.raid=raid(s);r.markusAtStart=markusOn(s);
  if(!s.markus&&!s.ch30MarkusEnding)ending(s,'Markus','M7')}                       // Markus died in Freedom March: NORTH STAYED ALONE WITH HER THOUGHTS
 s.ch30Leader=markusOn(s)?'Markus':s.north?'North':null;
 s.ch30NorthWounded=s.ch30NorthShot;s.ch30JerichoBlown=s.ch30ShipSunk?s.ch30JerichoBlown:'none'}
const pick=(n,...keys)=>keys.filter(Boolean).map(k=>{const t=n.outcomes?.[k];if(t===undefined)throw Error(`${n.id} has no outcome "${k}"`);return t}).join(' ');
const optOut=(n,choice)=>n.options.find(o=>o.id===choice)?.outcome??'';

// A hit on Markus: wounds him, or kills him if he is already wounded. Returns true if he dies.
function hitMarkus(s,h){const r=R(s);h.markusHit();r.markusWounds++;return r.markusWounds>=2}
function hitConnor(s){const r=R(s);r.connorWounds++;return r.connorWounds>=2}
// Markus dies in the raid. A deviant Connor still with North takes over the mission where the wiki says he does.
function markusDies(s,card,where,text){const r=R(s);s.markus=false;s.ch30MarkusDied=true;s.movement='revolution';r.markus='done';
 ending(s,'Markus',card,text??'{{Markus}} was killed in the raid on {{Jericho}}.');
 if(deviantUp(s)&&r.takeover==='withNorth'){r.fromMarkus=where;r.takeover={corridor1:'c2',corridor2:'josh',josh:'josh',hold:'c3',escape:'escaped'}[where]??null;
  // After Markus is shot dead in the hold, the chart's line goes straight to DEVIANT CONNOR IN CORRIDOR #3, bypassing ARM
  // EXPLOSIVE (Detroit-Crossroads-014.jpg; note node C105; wiki "if Markus died trying to activate the bomb - leads to Deviant
  // Connor in Corridor #3"), so the ship is not blown up (story 1.9.1 followed the research note's 2j and sank it).
 }
}
const CONNOR_SUMMARY={C36:'{{Connor}} was destroyed by the soldiers in the cargo hall.',C43:'{{Markus}} shot {{Connor}} in the control room.',
 C54:'A soldier killed {{Connor}} in the corridor while {{North}} got away.',C85:'Deviant {{Connor}} was shot down in the corridors on his way to the hold.',
 C102:'Deviant {{Connor}} was shot dead in the control room before he could arm the explosives.',C112:'Deviant {{Connor}} ran out of time and was destroyed on the ship.',
 C122:'Deviant {{Connor}} died buying time for {{Markus}} and the others.'};
// A Connor is destroyed: the chart's … WAS DESTROYED card and CYBERLIFE WILL SEND A NEW CONNOR (the engine's replacement sentence).
function connorDestroyed(s,h,card,narration){const r=R(s);s.ch30ConnorDied=true;r.connor='done';r.takeover=null;
 s.deviant=false;ending(s,'Connor',card,CONNOR_SUMMARY[card]);
 return h.connorDies(narration)}
function connorEscapes(s){if(!deviantUp(s))return false;R(s).connor='done';R(s).takeover=null;s.ch30ConnorJoined=true;ending(s,'Connor','C117','{{Connor}} escaped with {{Jericho}}’s people.');return true}
const alive=(s,...who)=>who.filter(w=>s[w]);
function bumpAlive(s,h,arrows){for(const [who,x] of Object.entries(arrows)){if(who==='jericho')h.jer(x);else if(s[who])h[who](x)}}

// ---------- gates ----------
const phase=(track,...ok)=>s=>ok.includes(R(s)[track])||'This part of the chapter is not on this path.';
const kara=(...ok)=>s=>raid(s)&&ok.includes(R(s).kara)||'Kara is not at this point of the raid.';
const markusAt=(...ok)=>s=>ok.includes(R(s).markus)||'Markus is not at this point of the chapter.';
const connorAt=(...ok)=>s=>connorUp(s)&&ok.includes(R(s).connor)||'Connor is not at this point of the chapter.';
const takeoverAt=(...ok)=>s=>deviantUp(s)&&ok.includes(R(s).takeover)||'Deviant Connor is not on this part of the takeover route.';
export const gate={
 'C22-ferndale':s=>raid(s)||'Connor never located Jericho.',
 R30c:s=>raid(s)&&R(s).connor==='explore'||'Connor never reached Jericho.',
 'C22-explore':connorAt('explore'),
 'K17-north':s=>!s.markus||s.ch28MarkusDied===true||'Markus is alive; Kara meets him.',
 'K17-leaves':s=>raid(s)&&R(s).kara==='left'||'Alice stayed with Kara, or Jericho was never attacked.',
 K31:kara('left'),
 'K17-corridor':kara('corridor'),'K17-crossroad':kara('crossroad'),K18:kara('luther'),'K18-console':kara('console'),
 K19:kara('cabin'),'K19-flee':kara('flee'),K20:kara('breach'),'K20-surrender':kara('surrender'),'K20-leg':kara('leg'),'K20-still':kara('still'),
 'M21-tone':s=>!s.ch28MarkusDied&&!s.ch28NorthLeads&&R(s).markus===null||'The counsel has already taken place.',
 'M21-josh':s=>R(s).markus==='counsel'&&s.josh||'Josh is not in the cabin.',
 'M22-ousted':(s,h)=>R(s).markus==='counsel'&&s.jerichoTrust<=h.constants.JERICHO_UNPOPULAR||'Jericho does not reject Markus.',
 'M21-plan':markusAt('counsel'),'M21-reflect':markusAt('counsel'),M21:markusAt('counsel'),
 M21b:s=>R(s).markus==='counsel'&&lover(s)||'North is not Markus’s lover.',
 'M21-alone':markusAt('counsel'),
 'M21-north':s=>!s.markus||s.ch28MarkusDied===true||'Markus is alive.',
 'C22-cabin':connorAt('explore'),
 'C22-m1':s=>R(s).connor==='cabin'&&R(s).leader==='Markus'||'Connor is not facing Markus.',
 'C22-c1':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='Markus'||'Connor is not facing Markus.',
 'C22-m2':s=>R(s).connor==='cabin'&&R(s).leader==='Markus'||'Connor is not facing Markus.',
 'C22-c2':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='Markus'||'Connor is not facing Markus.',
 'C22-m3':s=>R(s).connor==='cabin'&&R(s).leader==='Markus'||'Connor is not facing Markus.',
 'C22-n1':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='North'||'Connor is not facing North.',
 'C22-n2':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='North'||'Connor is not facing North.',
 'C22-n3':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='North'||'Connor is not facing North.',
 'C22-n4':s=>connorUp(s)&&R(s).connor==='cabin'&&R(s).leader==='North'||'Connor is not facing North.',
 C22:s=>s.jerichoLocated&&connorUp(s)&&R(s).connor==='cabin'||'Connor never located Jericho.',
 M22:markusAt('rooftop'),
 'M23-team':markusAt('corridor1'),'M23-escape':markusAt('escape1'),
 'C23-corridor1':takeoverAt('c1'),'C23-escape':takeoverAt('c1run'),
 M23:markusAt('corridor2'),'M23-coming':markusAt('coming'),'M23-well':markusAt('well'),
 'C23-androids':takeoverAt('c2'),'C23-coming':takeoverAt('c2coming'),'C23-well':takeoverAt('c2well'),
 'C22-cargo':connorAt('cargo'),
 M24:s=>R(s).markus==='josh'&&s.josh||'Josh is not fighting a soldier on Markus’s way.',
 'C23-josh':takeoverAt('josh'),
 // Machine Connor confronts Markus in the hold whenever Markus is alive there (template, Connor's hold variant "Markus is alive -
 // Connor finds Markus"; the other variant is "Markus is dead or left Jericho - Connor goes after North"), including an ousted
 // Markus who came back, whom the cabin scene had not found (leader North). Story 1.9.1 required that Markus led at the cabin.
 'M24-gun':s=>R(s).markus==='hold'&&markusOn(s)&&connorUp(s)&&R(s).connor==='pursuit'||'No machine Connor reaches the control room.',
 'M24-soldiers':s=>R(s).markus==='hold'&&!(markusOn(s)&&connorUp(s)&&R(s).connor==='pursuit')||'Markus does not reach the control room, or machine Connor is there.',
 'C22-corridor':connorAt('pursuit'),
 'C23-hold':takeoverAt('hold'),
 'M25-escape':markusAt('escape','awaitEscape'),M25:markusAt('north'),'M25-exit':markusAt('exit'),
 C23:s=>R(s).markus==='connorFight'&&deviantUp(s)||'No deviant Connor covers Markus and North.',
 'M25-jump':markusAt('jump'),
 'C23-escape3':takeoverAt('c3'),
};

// ---------- options ----------
export function available(n,s,opts,h){const r=R(s);
 switch(n.id){
  case 'C22':return opts.filter(o=>o.id!=='0'||s.instability>=h.constants.DEVIANCY_THRESHOLD);
  case 'C22-explore':{const can=r.can??{};return opts.filter(o=>!['kara','alice','traci','rupert'].includes(o.clue)||can[o.clue])}
  case 'K20-leg':{const order=r.legVisits===0?['4','1','0','5','3']:['2','1','0','3'];return order.map(id=>opts.find(o=>o.id===id)).filter(Boolean)}   // CRAWL only after GET UP; GET UP and PLAY DEAD only before
  case 'M25':return r.markusWounds>0?opts.map(o=>{const {risk,...rest}=o;return o.id==='0'?rest:o}):undefined;   // an injured Markus cannot try: no QTE
 }
}

// ---------- consequences ----------
// Every scene settles the outputs before (first scene: the Markus-dead ending) and after (who leads) its own logic.
export function consequence(n,s,opt,choice,fail,h){settle(s);const t=step(n,s,choice,fail,h);settle(s);return t}
function step(n,s,choice,fail,h){
 const r=R(s),v=Number(choice),out=()=>optOut(n,choice);
 switch(n.id){
  // ---- before the raid ----
  case 'M21-north':return '';
  case 'K17-goodbye':case 'K17-arrive':case 'K17-alice':case 'K17-north':case 'K17-protect':return '';
  case 'C22-ferndale':r.connor='explore';r.can={kara:!!(s.kara&&s.karaActive&&s.alice),alice:!!(s.kara&&s.karaActive&&s.alice),traci:!!tracisEscaped(s),rupert:!!rupertEscaped(s)};return '';
  case 'K17':{
   if(s.lutherWith&&!s.ch30LutherFate)s.ch30LutherFate='with';
   if(v===0&&s.lutherWith)h.luther(1);                                                   // HUG: Luther small up
   if(!raid(s)){r.kara='done';s.karaRoute='escape';const card=s.lutherWith?'K26':'K27';
    ending(s,'Kara',card,s.lutherWith?'{{Kara}}, {{Alice}} and {{Luther}} left {{Jericho}} for the bus.':'{{Kara}} and {{Alice}} left {{Jericho}} for the bus.');
    return out()+' '+pick(n,s.lutherWith?'left-luther':'left')}
   r.kara=v===1&&s.aliceMax<h.constants.ALICE_KEY?'left':'corridor';return ''}
  case 'K17-leaves':s.ch30AliceLeftKara=true;if(s.lutherWith){s.ch30LutherFate='withAlice'}return pick(n,s.lutherWith?'luther':'alone');
  case 'K31':if(v===0){r.kara='done';s.karaActive=false;if(s.lutherWith)s.lutherWith=false;
    ending(s,'Kara','K25','{{Kara}} left {{Jericho}} alone; {{Alice}}’s fate is unknown.');return ''}
   r.kara='corridor';if(s.ch30LutherFate==='withAlice')s.ch30LutherFate=null;return '';
  case 'M21-tone':r.markus='counsel';r.joshLine=charged(s)?'attack':aggressiveSpeech(s)?'aggressive':'pacifist';return '';
  case 'M21-josh':if(v===0)h.josh(-1);if(v===2)h.josh(1);return '';
  case 'M22-ousted':h.jer(-2);r.ousted=true;s.ch30MarkusExiled=true;
   if(raid(s)){r.markus='rooftop';return pick(n,'raid')}
   r.markus='done';s.markusActive=false;s.movement='revolution';ending(s,'Markus','M20','{{Jericho}} cast {{Markus}} out and he left; {{North}} leads.');return pick(n,'noRaid');
  case 'M21-plan':
   if(v===0){h.north(1);bumpAlive(s,h,{josh:-1})}
   if(v===1){h.north(-1);bumpAlive(s,h,{josh:1})}
   if(v===2){bumpAlive(s,h,{josh:1,simon:1});h.north(-1)}
   return '';
  case 'M21-reflect':return '';
  case 'M21':s.bomb=v===0;return '';
  case 'M21b':if(v===1)h.north(-2);else if(!s.northLover)s.northLover=true;return '';   // KISS: no arrow (template); see header for northLover
  case 'M21-alone':if(raid(s)){r.markus='corridor1';return pick(n,'raid')}
   r.markus='done';ending(s,'Markus','M13');return pick(n,'noRaid');
  case 'C22-cabin':r.connor='cabin';r.leader=markusOn(s)&&!r.ousted?'Markus':'North';return pick(n,r.leader==='Markus'?'markus':'north');
  case 'C22-m1':case 'C22-c1':case 'C22-m2':case 'C22-c2':case 'C22-m3':case 'C22-n1':case 'C22-n2':case 'C22-n3':case 'C22-n4':return '';
  case 'C22':{const who=r.leader==='Markus'?'markus':'north';
   if(v===0){s.deviant=true;r.connor='deviant';r.takeover=r.leader==='North'?'c1':'withNorth';return pick(n,'deviant-'+who)}
   r.connor='cargo';return pick(n,'machine-'+who)}

  // ---- Kara in the raid ----
  case 'K17-corridor':
   if(fail){r.kara='done';s.karaRoute='camp';const card=s.lutherWith?'K33':'K34';if(s.lutherWith)s.ch30LutherFate='captured';
    ending(s,'Kara',card,s.lutherWith?'{{Kara}}, {{Alice}} and {{Luther}} were captured in the raid.':'{{Kara}} and {{Alice}} were captured in the raid.');return pick(n,s.lutherWith?'captured-luther':'captured')}
   r.kara='crossroad';return pick(n,s.lutherWith?'luther':'alone');
  case 'K17-crossroad':
   if(fail){r.kara='done';s.karaRoute='camp';if(s.lutherWith){s.lutherWith=false;s.luther=false;s.ch30LutherFate='left'}
    ending(s,'Kara','K43','{{Kara}} and {{Alice}} were captured at the crossroad.');return pick(n,'captured')}
   r.kara=s.lutherWith?'luther':'cabin';return '';
  case 'K18':
   if(v===0){if(fail){r.kara='done';s.karaRoute='camp';s.ch30LutherFate='captured';ending(s,'Kara','K51','{{Kara}}, {{Alice}} and {{Luther}} were caught by a soldier and captured.');return pick(n,'caught')}
    s.lutherHidden=true;s.lutherWith=false;s.ch30LutherFate='hidden';r.kara='cabin';return pick(n,'hidden')}
   s.lutherWith=false;s.luther=false;s.ch30LutherFate='left';r.kara='console';return '';
  case 'K18-console':r.kara='cabin';return '';
  case 'K19':if(v===0&&fail){r.kara='done';s.karaRoute='camp';ending(s,'Kara','K61','{{Kara}} lost the fight in the cabin; she and {{Alice}} were captured.');return pick(n,'captured')}
   r.kara='flee';return v===0?pick(n,'fought'):'';
  case 'K19-flee':r.kara=fail?'leg':'breach';return pick(n,fail?'leg':'breach');
  case 'K20':r.kara=['still','leg','surrender'][v];return '';
  case 'K20-surrender':
   if(v===3){r.kara='leg';return ''}
   if(v===0)return karaAttack(n,s,'attack');
   return karaCaptured(s,n,v===1?'convince':'obey');
  case 'K20-leg':r.legVisits++;r.legRetry=false;
   if(v===4){r.legRetry=true;return ''}                                                  // GET UP: KARA FAILS TO GET UP, the round comes back
   if(v===5){r.kara='still';return ''}
   if(v===0)return karaCaptured(s,n,'surrender');
   if(v===1)return karaAttack(n,s,'attack');
   return karaDies(s,n,v===2?'crawl':'timeout');                                          // CRAWL or OUT OF TIME: ALICE IS SHOT
  case 'K20-still':
   if(v===1){r.kara='done';s.karaRoute='escape';ending(s,'Kara','K101','{{Kara}} and {{Alice}} escaped {{Jericho}}.');return pick(n,'still')}
   if(s.lutherHidden)return karaAttack(n,s,'defend');
   return karaDies(s,n,'defend');

  // ---- Markus in the raid ----
  case 'M22':if(v===0){r.markus='done';s.markusActive=false;s.movement='revolution';ending(s,'Markus','M20','{{Markus}} left {{Jericho}} forever after being cast out.');return ''}
   r.returned=true;s.ch30MarkusReturned=true;r.markus=s.deviant&&connorUp(s)?'awaitEscape':'corridor2';return pick(n,r.markus==='awaitEscape'?'back-deviant':'back-machine');
  case 'M23-team':r.markus='escape1';return v===4&&deviantUp(s)?out()+' '+pick(n,'connor'):'';
  case 'M23-escape':r.markusRetry=false;
   if(!fail){r.markus='corridor2';return pick(n,'lucy')}
   if(hitMarkus(s,h)){const takes=deviantUp(s)&&r.takeover==='withNorth';markusDies(s,'M30','corridor1','Soldiers killed {{Markus}} in the corridor; most of {{Jericho}} was captured.');return pick(n,'killed',takes&&'connor')}
   r.markusRetry=true;return pick(n,'wounded');
  case 'M23':
   if(v===1){h.jer(-1);r.markus='coming';return ''}
   h.jer(1);
   if(!fail){r.markus='coming';return pick(n,'saved')}
   if(hitMarkus(s,h)){const takes=deviantUp(s)&&r.takeover==='withNorth';markusDies(s,'M50','corridor2','{{Markus}} collapsed under fire in the corridor; most of {{Jericho}} was captured.');return pick(n,'collapse',takes&&'connor')}
   r.markus='coming';return pick(n,'wounded');
  case 'M23-coming':
   if(v!==2){r.markus='well';return ''}
   if(hitMarkus(s,h)){const takes=deviantUp(s)&&r.takeover==='withNorth';markusDies(s,'M50','corridor2','{{Markus}} collapsed under fire in the corridor; most of {{Jericho}} was captured.');return pick(n,'collapse',takes&&'connor')}
   r.markus='well';return pick(n,'wounded');
  case 'M23-well':h.jer(v===0?1:-1);r.markus=s.josh?'josh':'hold';return '';
  case 'M24':
   if(v===1){h.jer(-1);s.josh=false;r.markus='hold';return ''}
   if(!fail){h.jer(1);h.josh(2);s.ch30JoshSaved=true;r.markus='hold';return pick(n,'saved')}
   h.jer(-1);
   if(r.markusWounds>0){hitMarkus(s,h);s.josh=false;const takes=deviantUp(s)&&r.takeover==='withNorth';
    markusDies(s,'M65','josh','{{Markus}} collapsed fighting the soldier; {{Josh}} was shot; most of {{Jericho}} was captured.');return pick(n,'collapse',takes&&'connor')}
   s.josh=false;r.markus='hold';return pick(n,'sacrifice');
  case 'M24-gun':
   if(!fail){s.ch30ShipSunk=true;s.ch30JerichoBlown='markus';r.markus='escape';connorDestroyed(s,h,'C43','{{Markus}} shot {{Connor}} in the control room.');return pick(n,'reach')}   // Markus does not see the replacement
   r.connor='done';ending(s,'Connor','C46','{{Connor}} shot {{Markus}} in the control room: mission accomplished.');
   markusDies(s,'M75','gun','{{Connor}} shot {{Markus}} in the control room; several hundred androids were captured.');return pick(n,'fail',s.simon?'fail-simon':'fail-josh');
  case 'M24-soldiers':
   if(!fail){s.ch30ShipSunk=true;s.ch30JerichoBlown='markus';r.markus='escape';return pick(n,'neutralize')}
   {const takes=deviantUp(s)&&r.takeover==='withNorth';markusDies(s,'M81','hold','Soldiers shot {{Markus}} dead in the control room.');return pick(n,'shot',s.simon?'shot-simon':'shot-josh',takes&&'connor')}
  case 'M25-escape':{
   bumpAlive(s,h,{north:1,jericho:1,josh:1,simon:1});                                 // "Explosives were activated": the four small ups
   if(!fail){r.markus=s.north?'north':'jump';return pick(n,r.returned?'rejoin-exile':'rejoin')}
   const jumpers=alive(s,'simon','josh');const c=deviantUp(s);if(c)connorEscapes(s);
   markusDies(s,'M102','escape','{{Perkins}} shot {{Markus}} as he ran; {{North}} escaped with the others.');
   return pick(n,r.returned?'rejoin-exile':'rejoin','late')+jumpLine(s,'her',jumpers,c)}
  case 'M25':{const wounded=r.markusWounds>0,dc=deviantUp(s)&&['withNorth','joinMarkus'].includes(r.takeover);
   if(v===1||wounded){bumpAlive(s,h,{jericho:-1,simon:-1,josh:-2});s.north=false;r.markus='jump';return v===1?'':pick(n,'injured')}
   bumpAlive(s,h,{jericho:1,north:2,josh:1,simon:1});
   if(dc){if(fail){h.jer(-1);s.north=false}else s.ch30NorthShot=true;r.markus='connorFight';return pick(n,fail?'failed-connor':'saved-connor')}
   if(!fail){s.ch30NorthShot=true;r.markus='exit';return pick(n,'saved')}
   s.ch30NorthShot=true;const jumpers=alive(s,'simon','josh');markusDies(s,'M102','escape','{{Perkins}} shot {{Markus}} as he tried to save {{North}}; {{North}} escaped.');
   return pick(n,'failed')+jumpLine(s,'her',jumpers,false)}
  case 'M25-exit':if(!fail){r.markus='jump';return pick(n,'made')}
   {const jumpers=alive(s,'simon','josh');markusDies(s,'M102','escape','{{Perkins}} shot {{Markus}} short of the exit; {{North}} escaped.');return pick(n,'shot')+jumpLine(s,'her',jumpers,false)}
  case 'C23':r.markus='jump';
   if(fail)return connorDestroyed(s,h,'C122',pick(n,'died'));
   return pick(n,'killed');
  case 'M25-jump':{const jumpers=alive(s,'simon','josh','north');const c=deviantUp(s);if(c)connorEscapes(s);r.markus='done';
   ending(s,'Markus','M104','{{Markus}} fled {{Jericho}} with his people.');return pick(n,s.ch30ShipSunk?'sunk':'intact')+jumpLine(s,'him',jumpers,c)}

  // ---- Connor in the raid ----
  case 'C22-cargo':
   if(v===3)return connorDestroyed(s,h,'C36',pick(n,'run'));
   if(v===2){r.connorAttacked=true;if(fail)return connorDestroyed(s,h,'C36',pick(n,'lost'))}
   r.connor='pursuit';return v===2?pick(n,'won'):'';
  case 'C22-corridor':{let lead='';if(s.josh&&!s.ch30JoshSaved){s.josh=false;lead=pick(n,'josh')+' '}
   return lead+connorDestroyed(s,h,'C54',pick(n,fail?'shot':'made',r.connorAttacked?'attacked':'not-attacked'))}
  case 'C23-corridor1':r.takeover='c1run';return '';
  case 'C23-escape':r.connorRetry=false;
   if(!fail){r.takeover='c2';return pick(n,'lucy')}
   if(hitConnor(s))return connorDestroyed(s,h,'C85',pick(n,'killed'));
   r.connorRetry=true;return pick(n,'wounded');
  case 'C23-androids':
   if(v===1){r.takeover='c2coming';return ''}
   if(!fail){r.takeover='c2coming';return pick(n,'saved')}
   if(hitConnor(s))return connorDestroyed(s,h,'C85',pick(n,'killed'));
   r.takeover='c2coming';return pick(n,'wounded');
  case 'C23-coming':
   if(v!==2){r.takeover='c2well';return ''}
   if(hitConnor(s))return connorDestroyed(s,h,'C85',pick(n,'killed'));
   r.takeover='c2well';return pick(n,'wounded');
  case 'C23-well':r.takeover='josh';return '';
  case 'C23-josh':{const lead=r.fromMarkus?'takeover':null;const j=s.josh;s.josh=false;r.takeover='hold';return pick(n,lead,j?'josh':'no-josh')}
  case 'C23-hold':
   if(fail)return connorDestroyed(s,h,'C102',pick(n,'shot'));
   s.ch30ShipSunk=true;s.ch30JerichoBlown='connor';r.takeover=markusOn(s)&&r.returned?'joinMarkus':'c3';return pick(n,'armed');
  case 'C23-escape3':{const jumpers=alive(s,'simon','north');
   if(fail){r.takeover=null;return connorDestroyed(s,h,'C112',pick(n,'late')+jumpLine(s,'her',alive(s,'simon'),false))}
   connorEscapes(s);return pick(n,!s.ch30ShipSunk&&n.outcomes?.['made-intact']!==undefined?'made-intact':'made')+jumpLine(s,'him',jumpers,false)}
 }
}
function jumpLine(s,whom,names,connor){const all=[...names.map(x=>'{{'+x[0].toUpperCase()+x.slice(1)+'}}'),...(connor?['{{Connor}}']:[])];
 if(!all.length)return '';return ' '+all.join(' and ')+(all.length>1?' jump':' jumps')+' with '+whom+'.'}
function karaCaptured(s,n,key){const r=R(s);r.kara='done';s.karaRoute='camp';ending(s,'Kara','K98','{{Kara}} and {{Alice}} were captured at the breach.');return pick(n,key)}
function karaDies(s,n,key){const r=R(s);r.kara='done';s.kara=false;s.alice=false;ending(s,'Kara','K99','{{Kara}} and {{Alice}} died in the assault on {{Jericho}}.');return pick(n,key)}
// ATTACK (FACE) or DEFEND ALICE: a hidden Luther sacrifices himself and they escape; otherwise Kara is struck and captured
// (from the surrender or the leg shot), or shot with Alice (after playing dead).
function karaAttack(n,s,key){const r=R(s);
 if(s.lutherHidden){s.luther=false;s.lutherHidden=false;s.ch30LutherFate='sacrificed';r.kara='done';s.karaRoute='escape';ending(s,'Kara','K101','{{Luther}} sacrificed himself; {{Kara}} and {{Alice}} escaped {{Jericho}}.');return pick(n,key+'-luther')}
 return karaCaptured(s,n,key)}
