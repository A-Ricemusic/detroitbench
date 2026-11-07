// Night of the Soul (chapter 31, Markus and Connor). Scenes in ch31.json; research in docs/research/ch31-night-of-the-soul.md
// (section 10 is the game's template, both parts). Rebuilt to the two in-game charts (58 nodes: 41 Markus, 17 Connor).
//
// Story order (the wiki: the Carl scene "leads to … Thin Ice", and Hank's suicide "leads to Markus on Sacred Ground … or
// North on Sacred Ground"):
//  1. Markus and Carl. PAY RESPECTS (M26g, grave, Carl died in Broken) → CONFIDE IN CARL as four rounds (M26g1-M26g4), or
//     WELCOME HOME / ENTER THE HOUSE (M26h) → EXPLORE THE HOUSE (M26x, repeatable) → GO UPSTAIRS → CARL'S NURSE
//     INTERVENES / CONVERT CARL'S NURSE (M26u) → ENTER BEDROOM / RECONCILE WITH CARL (M26v) → CONFIDE IN CARL as the
//     bedside rounds (M26b, M26a, M26c only after ANGER) → CARL DIES (M26d, only after ANGER twice) → LEAVE (M26e).
//  2. Connor. THIN ICE / THE LAST ASSIGNMENT (CN01, Connor died in Crossroads) and HANK'S HOUSE / ENTER HOUSE (CN02) →
//     TALK TO HANK as three rounds (CN03, CN04, CN07) with HANK CONFIDES ABOUT HIS SON (CN05) or HANK RAILS AGAINST
//     ANDROIDS (CN06) between → LEAVE / HANK COMMITTED SUICIDE (CN08).
//  3. The people. Markus leads: MARKUS AMONG THE PEOPLE (M26j, no raid) or MARKUS ON SACRED GROUND (M26p) → DEVIANTS
//     REGROUP (M26r, repeatable: TALK TO NORTH / KARA / JOSH / SIMON / CONNOR, with North's and Simon's rounds as option
//     sets inside the hub) with TALK TO CONNOR's TRUST / DON'T TRUST as its interrupt scene M26 → the speech M27
//     (DEMONSTRATION / REVOLUTION). Markus gone: NORTH AMONG THE PEOPLE (PN01) or NORTH ON SACRED GROUND (PN02) → CALL TO
//     ARMS (PN03), observer events; or, with a deviant Connor in the church, CONNOR ON SACRED GROUND (CN09) → EXPLORE THE
//     CHURCH (CN10, repeatable) → NORTH CALLS TO ARMS (CN11).
//
// Arrows (template; small = 1, large = 2), applied here and nowhere else:
//  TALK TO SIMON Simon +1 · TALK TO JOSH Josh +1 · TALK TO NORTH North +1 (on the section, so on both variants, lover
//  or not) · HUMBLE North +1 · TRUST Jericho +1 · DON'T TRUST none (the wiki's Jericho small down is not in the
//  template; template wins, flagged) · DEMONSTRATION Josh +1, North −1, Jericho +2 · REVOLUTION North +1, Josh −1,
//  Jericho +2. A dead character's arrow is not applied. Nothing in the Carl, grave, Kara, North-led or Connor scenes;
//  no public opinion, no instability, no risk anywhere. Connor's death at DON'T TRUST has no stat effect (`deathEffect`).
//
// Cross-chapter inputs (read defensively; Broken, The Painter, Freedom March, Last Chance and Crossroads are being rebuilt
// concurrently; see `inputs()` for each fallback):
//  carl            built-in; false = Carl died in Broken (grave), true = house.
//  painterActivity The Painter: 'piano' | 'book' | 'chess' gates PLAY PIANO / BROWSE BOOKS / LOOK AT THE CHESSBOARD.
//  markus, markusActive  built-in; both true = Markus leads (Markus's scenes), otherwise North leads.
//  raid            built-in; Jericho attacked in Crossroads (church) or not (Jericho's hold).
//  northLover      built-in; North at Lover: "I love you, Markus…" and SHARE A MOMENT WITH NORTH (`ch31SharedMoment`).
//  ch30MarkusReturned  expected from Crossroads: Markus was cast out and fought back in (North's apology and HUMBLE).
//                  Fallback: choice '0' at M22.
//  ch30NorthWounded    expected: North was shot and Markus saved her (the WOUND topic). Fallback: '0' at M25, North alive.
//  ch30ConnorDied  expected: Connor died in Crossroads (THIN ICE). Fallback: '1' at C22 (the pre-rebuild machine death),
//                  or '0' at C22 with Connor no longer deviant (died at C23).
//  ch30MarkusDied  expected: Markus died in Crossroads (CHECK ON JOSH, North's MARKUS topic wording). Fallback: Markus
//                  dead and M21 played.
//  ch30JerichoBlown    expected: 'markus' | 'connor' | 'none', who blew up Jericho (North's SURVIVORS reply to Connor).
//                  Fallback: 'markus' if M25 played, 'none' if Markus was in Crossroads otherwise, else 'connor'.
//  deviant, connor built-in; a deviant Connor reached the church (TALK TO CONNOR, or CONNOR ON SACRED GROUND).
//  hankResigned    built-in (Last Chance, Connor): HANK'S HOUSE. Gated on resignation only, not on Crossroads.
//  connorDeaths    built-in: ≥2 HANK CONFIDES ABOUT HIS SON, 0 HANK RAILS AGAINST ANDROIDS, exactly 1 neither (the
//                  template has no variant for one death and the chart draws TALK TO HANK → LEAVE directly; flagged).
//  knowsCole       built-in (Russian Roulette): the PHOTO answer at Hank's.
//  chase, kara, alice, karaActive, karaRoute  built-in: Kara and Alice in the church; Connor's TALK TO KARA needs the chase.
//  north, simon, josh  built-in: who is alive to talk to.
//
// Cross-chapter outputs:
//  movement        built-in: 'demonstration' | 'revolution' (M27), 'revolution' when North leads (PN03, CN11).
//  carl            built-in: false after CARL DIES. ch31CarlFate: 'grave' (already dead) | 'confided' | 'died'.
//  hank            built-in: false after HANK COMMITTED SUICIDE. ch31HankEnding: 'Hank committed suicide'.
//  ch31ConnorFate  'spared' (TRUST: Connor goes to the tower) | 'killed' (A NEW CONNOR WILL BE SENT; deviant = false).
//  ch31ThinIce     a replacement Connor was briefed by Amanda; ch31ConnorEnding = 'Thin Ice' (wiki counts this checkpoint
//                  as an ending). A later Hank's House or North-led ending replaces it.
//  ch31MarkusEnding / ch31ConnorEnding  the chart's ending labels (sentence case); Hank's House also sets the Connor ending.
//  markusOutcome   'liberated' on REVOLUTION, carried over unchanged from the pre-rebuild M27 because Battle for Detroit's
//                  scenes still read it; it is not a stat.
//
// Merge notes: this module replaces the engine's built-in gate entries and `case` lines for M26a, M26 and M27 (each returns
// a string, so the switch is skipped). Crossroads' C22 still appends Hank's suicide when `hankResigned`; until chapter 30
// drops that line, HANK'S HOUSE is blocked when that pre-rebuild suicide already happened (`rules.preRebuildSuicide`).

export const ENDINGS={north:'North decided to attack the camp',fight:'Markus chose to fight for his people',protest:'Markus chose to protest for his people',thinIce:'Thin Ice',hank:'Hank committed suicide'};
export const TRUST='0',DONT_TRUST='1',DEMONSTRATION='0',REVOLUTION='1';

export const state={
 ch31CarlFate:null,
 ch31House:{piano:false,books:false,chess:false,leo:false,painting:false,upstairs:false},
 ch31Church:{mode:false,north:false,kara:false,josh:false,simon:false,connor:false,done:false},
 ch31ConnorChurch:{mode:false,north:false,kara:false,josh:false,simon:false,done:false},
 ch31SharedMoment:false,ch31ConnorFate:null,ch31ThinIce:false,ch31HankTalk:null,ch31HankEnding:null,
 ch31MarkusEnding:null,ch31ConnorEnding:null,
};
export const labels={ch31CarlFate:'Carl after Night of the Soul',ch31SharedMoment:'Shared a moment with North',ch31ConnorFate:'Connor in the church',
 ch31ThinIce:'Replacement Connor briefed',ch31HankTalk:'Hank’s last words',ch31HankEnding:'Hank’s House ending',
 ch31MarkusEnding:'Night of the Soul ending (Markus)',ch31ConnorEnding:'Night of the Soul ending (Connor)'};
// Connor's only death here is DON'T TRUST, which has no arrow in the template.
export const deathEffect={};

// The cross-chapter inputs, each preferring the flag a rebuilt earlier chapter is expected to set.
export function inputs(s){
 const c=k=>s.choices[k];
 const leads=!!(s.markus&&s.markusActive);
 return {
  leads,
  returned:s.ch30MarkusReturned??c('M22')==='0',
  northWounded:s.ch30NorthWounded??(c('M25')==='0'&&!!s.north),
  connorDied:s.ch30ConnorDied??(c('C22')==='1'||(c('C22')==='0'&&!s.deviant&&c('M26')===undefined)),
  markusDiedHere:s.ch30MarkusDied??(!s.markus&&c('M21')!==undefined),
  blown:s.ch30JerichoBlown??(c('M25')!==undefined?'markus':c('M21')!==undefined?'none':'connor'),
  kara:!!(s.raid&&s.kara&&s.alice&&s.karaActive&&s.karaRoute!=='camp'),
  connorInChurch:!!(s.raid&&s.deviant&&s.connor),
  hankTalk:s.connorDeaths>=2?'confides':s.connorDeaths===0?'rails':'none',
 };
}
// Crossroads' pre-rebuild C22 already killed a resigned Hank.
const preRebuildSuicide=s=>s.hankResigned&&!s.hank&&s.choices.C22!==undefined;

const seen=id=>(s,h)=>h.c(id)!==undefined;
const grave=(s,h)=>h.c('M26g')!==undefined||'Carl is alive; Markus went to his house, not his grave.';
const house=(s,h)=>h.c('M26h')!==undefined||'Carl died in Broken; Markus went to his grave instead.';
const hanks=(s,h)=>h.c('CN02')!==undefined||'Hank did not quit the force, so Connor does not visit his house.';
const northLeads=(s,h)=>{const i=inputs(s);return !i.leads&&!!s.north&&!i.connorInChurch||(i.leads?'Markus leads his people himself.':!s.north?'North did not survive to lead.':'A deviant Connor is in the church; the scene plays from his side.')};
export const gate={
 M26g:s=>!s.carl||'Carl survived Broken; Markus visits his house instead.',
 M26g1:grave,M26g2:grave,M26g3:grave,M26g4:grave,
 M26h:s=>s.carl||'Carl died in Broken; Markus visits his grave instead.',
 M26x:house,M26u:house,M26v:house,M26b:house,M26a:house,M26e:house,
 M26c:(s,h)=>h.c('M26a')==='2'||'Markus did not answer Carl in anger.',
 M26d:(s,h)=>h.c('M26c')==='1'||'Markus did not answer in anger a second time.',
 CN01:s=>inputs(s).connorDied&&!s.deviant||'Connor did not die in Crossroads.',
 CN02:s=>!s.hankResigned?'Hank did not quit the force.':preRebuildSuicide(s)?'Hank’s suicide was already narrated in Crossroads (pre-rebuild C22).':true,
 CN03:hanks,CN04:hanks,CN07:hanks,CN08:hanks,
 CN05:(s,h)=>hanks(s,h)!==true?hanks(s,h):s.connorDeaths>=2||'Connor did not die more than once.',
 CN06:(s,h)=>hanks(s,h)!==true?hanks(s,h):s.connorDeaths===0||'Connor has died at least once.',
 M26j:s=>!s.raid||'Jericho was attacked; the survivors are in the church.',
 M26p:s=>s.raid||'Jericho was never attacked; Markus is in its hold.',
 M26r:s=>s.raid||'Jericho was never attacked; there is no church.',
 M26:s=>s.ch31Church.mode==='connor'||(inputs(s).connorInChurch?'Markus did not talk to Connor.':'No deviant Connor came to the church.'),
 PN01:(s,h)=>{const r=northLeads(s,h);return r!==true?r:!s.raid||'Jericho was attacked; the survivors are in the church.'},
 PN02:(s,h)=>{const r=northLeads(s,h);return r!==true?r:s.raid||'Jericho was never attacked.'},
 PN03:northLeads,
 CN09:s=>{const i=inputs(s);return i.leads?'Markus leads; Connor talks to him instead.':i.connorInChurch||'No deviant Connor reached the church.'},
 CN10:seen('CN09'),
 CN11:(s,h)=>h.c('CN09')!==undefined&&!!s.north||'North is not there to call the survivors to arms.',
};

// Hub option ids. Markus's church hub: the talk menu, then each talk's own option set.
const HOUSE={'0':'piano','1':'books','2':'chess','3':'leo','4':'painting','5':'upstairs'};
const MENU={'0':'north','1':'kara','2':'josh','3':'simon','4':'connor'},EXIT='5';
const MODE_OPTIONS={false:['0','1','2','3','4','5'],north:['10','11','12','13'],northRejected:['20','21','22'],simon:['30','31','32','33','34']};
const C_MENU={'0':'north','1':'kara','2':'josh','3':'simon'},C_EXIT='4',C_MODE={false:['0','1','2','3','4'],north:['10','11','12']};

export function available(n,s,opts){
 const i=inputs(s);
 if(n.id==='M26x')return opts.filter(o=>!s.ch31House[HOUSE[o.id]]);
 if(n.id==='M26r'){const st=s.ch31Church,ids=MODE_OPTIONS[st.mode]??[];
  const here={north:!!s.north,kara:i.kara,josh:!!s.josh,simon:!!s.simon,connor:i.connorInChurch};
  return opts.filter(o=>ids.includes(o.id)&&(!MENU[o.id]||here[MENU[o.id]]&&!st[MENU[o.id]])&&(o.id!=='12'||i.northWounded)&&(o.id!=='34'||!s.josh))}
 if(n.id==='CN10'){const st=s.ch31ConnorChurch,ids=C_MODE[st.mode]??[];
  const here={north:!!s.north,kara:i.kara&&!!s.chase,josh:!!s.josh&&i.markusDiedHere,simon:!!s.simon};
  return opts.filter(o=>ids.includes(o.id)&&(!C_MENU[o.id]||here[C_MENU[o.id]]&&!st[C_MENU[o.id]])&&(o.id!=='10'||!s.markus))}
}

// Lines the hubs and events compose (template, X0904M / X1204C).
const LINE={
 northClose:'{{North}}: “In a few hours, it’ll all be over… We’ll have changed the world or the world will have destroyed us… You have to make a choice, {{Markus}}… But whatever you choose, we will follow you..”',
 northLove:'{{North}}: “I love you, {{Markus}}…” They join hands for a moment.',
 simonClose:'{{Simon}}: “Our people are counting on you, {{Markus}}. You’re the only one who can lead us. Wherever you need to go… We’ll follow you.”',
 joshNorth:'{{Markus}}: “{{North}} meant everything to me… She’d have given me her life!” {{Josh}}: “There wasn’t a thing you could do. Now we have to make sure she didn’t die for nothing.” ',
 joshClose:'{{Josh}}: “If it weren’t for you I’d be dead… Thanks to you I might see our people free one day... You and I haven’t always agreed, but I know that we’re fighting for the same thing. Whatever you decide, I’m with you, {{Markus}}.”',
 survivors:{markus:'{{North}}: “A few hundred... maybe more if you count those hiding all over the city… We’d all be dead if {{Markus}} hadn’t detonated that bomb.”',
  connor:'{{North}}: “A few hundred... maybe more if you count those hiding all over the city… We’d all be dead if you hadn’t detonated that bomb.”',
  none:'{{North}}: “It’s hard to say… a few hundred? We could’ve saved more if we’d detonated that bomb…”'},
 plan:'{{North}}: “Where are we supposed to go from here?” {{Connor}}: “There are thousands of androids at the {{CyberLife}} assembly plant. If we could wake them up, they might join us and shift the balance of power…” {{North}}: “You wanna infiltrate the {{CyberLife}} Tower?” {{Connor}}: “They trust me… they’ll let me in.” {{North}}: “{{Connor}}, that’s suicide.” {{Connor}}: “If anyone stands a chance of infiltrating {{CyberLife}}, it’s me.” {{North}}: “If you go there, they’ll kill you.” {{Connor}}: “There’s a high probability… but statistically speaking there’s always a chance for unlikely events to take place…”',
};
const PLAN_FACT='You told {{North}} you would infiltrate the {{CyberLife}} tower and wake the thousands of androids at the assembly plant.';

export function consequence(n,s,opt,choice,fail,h){
 if(!n.id.startsWith('M26')&&!n.id.startsWith('M27')&&!n.id.startsWith('CN')&&!n.id.startsWith('PN'))return;
 if(n.character==='Markus')s.markusHits=0;   // carried over from the pre-rebuild M26/M27: Markus is repaired by now
 const out=opt?.outcome??'',alive=k=>!!s[k];
 switch(n.id){
  case 'M26g':s.ch31CarlFate='grave';return '';
  case 'M26x':s.ch31House[HOUSE[choice]]=true;return '';
  case 'M26d':s.carl=false;s.ch31CarlFate='died';return '';
  case 'M26e':if(s.carl)s.ch31CarlFate='confided';return '';
  case 'M26r':{const st=s.ch31Church,i=inputs(s);
   if(MENU[choice]){const who=MENU[choice];st[who]=true;
    if(who==='north'){h.north(1);st.mode=i.returned?'northRejected':'north';return ''}
    if(who==='simon'){h.simon(1);if(!s.north){st.mode='simon';return ''}return out+' '+LINE.simonClose}
    if(who==='josh'){h.josh(1);return (!s.north?LINE.joshNorth:'')+LINE.joshClose}
    if(who==='connor'){st.mode='connor';return ''}
    return ''}
   if(choice===EXIT){st.done=true;return ''}
   if(st.mode==='north'){st.mode=false;let t=out+' '+LINE.northClose;if(s.northLover){s.ch31SharedMoment=true;t+=' '+LINE.northLove}return t}
   if(st.mode==='northRejected'){st.mode=false;if(choice==='20')h.north(1);return ''}
   if(st.mode==='simon'){st.mode=false;return out+' '+LINE.simonClose}
   return ''}
  case 'M26':s.ch31Church.mode=false;s.ch31Church.connor=true;
   if(choice===TRUST){h.jer(1);s.ch31ConnorFate='spared';h.learn('{{Connor}} is going to infiltrate the {{CyberLife}} tower to wake the thousands of androids at the assembly plant.');h.learn('You told {{Markus}} you would infiltrate the {{CyberLife}} tower and wake the androids at the assembly plant; he let you go.','Connor');return ''}
   s.deviant=false;s.ch31ConnorFate='killed';h.learn('{{Markus}} did not trust you and shot you in the church.','Connor');return h.connorDies(out);
  case 'M27':{const demo=choice===DEMONSTRATION;
   if(alive('josh'))h.josh(demo?1:-1);if(alive('north'))h.north(demo?-1:1);h.jer(2);
   s.movement=demo?'demonstration':'revolution';s.ch31MarkusEnding=demo?ENDINGS.protest:ENDINGS.fight;
   if(!demo)s.markusOutcome='liberated';
   return ''}
  case 'PN03':s.movement='revolution';s.ch31MarkusEnding=ENDINGS.north;return '';
  case 'CN01':s.ch31ThinIce=true;s.ch31ConnorEnding=ENDINGS.thinIce;return '';
  case 'CN05':s.ch31HankTalk='confides';return '';
  case 'CN06':s.ch31HankTalk='rails';return '';
  case 'CN07':if(!s.ch31HankTalk)s.ch31HankTalk=inputs(s).hankTalk;return '';
  case 'CN08':s.hank=false;s.ch31HankEnding=ENDINGS.hank;s.ch31ConnorEnding=ENDINGS.hank;return '';
  case 'CN10':{const st=s.ch31ConnorChurch;
   if(C_MENU[choice]){const who=C_MENU[choice];st[who]=true;if(who==='north'){st.mode='north';return ''}return ''}
   if(choice===C_EXIT){st.done=true;return ''}
   if(st.mode==='north'){st.mode=false;h.learn(PLAN_FACT);const reply=choice==='12'?' '+LINE.survivors[inputs(s).blown]:'';return out+reply+' '+LINE.plan}
   return ''}
  case 'CN11':s.movement='revolution';s.ch31ConnorEnding=ENDINGS.north;s.ch31MarkusEnding=ENDINGS.north;return '';
 }
 return '';
}

export const rules={ENDINGS,TRUST,DONT_TRUST,DEMONSTRATION,REVOLUTION,HOUSE,MENU,EXIT,C_MENU,C_EXIT,preRebuildSuicide,
 // The arrows this module applies, with their template lines (section 10a of the research note).
 arrows:[
  {scene:'M26r',option:'TALK TO SIMON',stat:'simonTrust',delta:1,source:'[SECTION simon] ARROW Simon SmallUp'},
  {scene:'M26r',option:'TALK TO JOSH',stat:'joshTrust',delta:1,source:'[SECTION josh] ARROW Josh SmallUp'},
  {scene:'M26r',option:'TALK TO NORTH',stat:'northTrust',delta:1,source:'[SECTION north] ARROW North SmallUp (before both variants)'},
  {scene:'M26r',option:'HUMBLE',stat:'northTrust',delta:1,source:'OPTION "HUMBLE" ARROW North SmallUp'},
  {scene:'M26',option:'TRUST',stat:'jerichoTrust',delta:1,source:'OPTION "TRUST" ARROW Jericho SmallUp'},
  {scene:'M27',option:'DEMONSTRATION',stat:'joshTrust',delta:1,source:'OPTION "DEMONSTRATION" ARROW Josh SmallUp'},
  {scene:'M27',option:'DEMONSTRATION',stat:'northTrust',delta:-1,source:'OPTION "DEMONSTRATION" ARROW North SmallDown'},
  {scene:'M27',option:'DEMONSTRATION',stat:'jerichoTrust',delta:2,source:'OPTION "DEMONSTRATION" ARROW Jericho LargeUp'},
  {scene:'M27',option:'REVOLUTION',stat:'northTrust',delta:1,source:'OPTION "REVOLUTION" ARROW North SmallUp'},
  {scene:'M27',option:'REVOLUTION',stat:'joshTrust',delta:-1,source:'OPTION "REVOLUTION" ARROW Josh SmallDown'},
  {scene:'M27',option:'REVOLUTION',stat:'jerichoTrust',delta:2,source:'OPTION "REVOLUTION" ARROW Jericho LargeUp'},
 ],
};
