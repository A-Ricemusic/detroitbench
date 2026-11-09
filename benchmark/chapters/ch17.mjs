// Chapter 17, Zlatko (Kara). Rebuilt to the game's chart (PowerPyx 100% screenshots) and text (detroitbecometext template
// 17-zlatko, string table MENU.FLOWCHART.05K.* and X050*K.*); specification docs/research/ch17-zlatko.md.
//
// Scenes, in story order (benchmark/chapters/ch17.json):
//  K10a arrival (event) · K10b Alice's doubt (CAREFUL / REASSURE / COMFORT / NO CHOICE) · K10c the basement and the machine (event)
//  K10 the machine: break free (risk) or do nothing → ESCAPE BEFORE BEING RESET or KARA IS RESET
//  reset path: K10r OBEY YOUR NEW MASTER (event) · K10s GO SEE LUTHER, BRING THE TRAY, DROP THE ANDROID TORSO (event; the clock starts)
//  escape path: K11 the cells (FREE MONSTERS) · K11b SNEAK THROUGH HOUSE (event; the clock starts)
//  K12 the repeatable house hub, one action per minute of Luther's ten: the memory hunt (reset, until five memories) and the search
//   for Alice, with every side branch of both paths (cells, storage room and bear, bathroom android, magazines, TV)
//  K12f LUTHER GOES TO COLLECT ALICE (event) · K13 ENTER MAIN ROOM · K13a the main room after hiding · K13b ENTER BEDROOM
//  K13c GO THROUGH CORRIDOR · K13d BATHROOM ANDROID ALERTS ZLATKO (KILL / SPARE) · K13e SNEAK THROUGH STORAGE ROOM
//  K13f ZLATKO CLOSES IN (RUN OUT / PUSH AWAY / THROW, or stay hidden for the bear) · K13y the yard: LUTHER JOINS KARA & ALICE
//
// The house is one repeatable clue hub with a ten-action state budget.
//
// Inputs read from earlier chapters (read defensively; chapters 4, 10 and 13 are being rebuilt concurrently):
//  upstairs.book (A New Home: the Alice in Wonderland book seen) → RECALL ALICE'S BOOK
//  downstairs.rewash (A New Home: REWASH CLOTHES, the Red Ice) → RECALL TODD'S RED ICE PIPE
//  shelter === 'squat' (Fugitives: stayed in the squat) → RECALL SQUAT FIREPLACE
//  ch10RalphCarving (Fugitives: Kara saw Ralph carve the symbols; boolean if chapter 10 sets it, else shelter === 'squat') → RECALL RA9 SYMBOLS
//  ch13Ending (On the Run: Kara crossed the freeway, the endings CROSSED THE HIGHWAY and REACHED THE OTHER SIDE) → "How Androids
//   Alter Your Brain" and the highway TV report (PowerPyx: "if escaped over Freeway in On the Run" / "Only available, if escaped
//   via Freeway"; the report itself: "The chase is reported to have ended on a freeway"). Up to story 1.9.1 both keyed on
//   `chase`, which On the Run also sets for KARA & ALICE VANISHED (no freeway).
//  !chase and shelter in car/motel (On the Run: evaded unseen) → "AX400 Getaway" and RECALL ESCAPE
//  robbery === 'gun' with clothes (Fugitives: hold-up in uniform or in stolen clothes) → the robbery TV reports
// Outputs: monstersFreed (FREE MONSTERS; the recall camp, K28), fire (SET FIRE TO HOUSE; The Pirates' Cove news, R21),
//  luther and lutherWith (LUTHER JOINS KARA & ALICE), ch17Outcome (the chart's ending label), ch17BathAndroid, ch17Bear.

export const rules={
 MINUTES:10,           // Luther's ten minutes (both paths); one action is one minute
 MEMORIES_NEEDED:5,    // PowerPyx: "The exact number varies … You shouldn't need more than six." Unsourced constant.
 CHASE_LOSS:0.5,       // share of a spotted roll that also loses the chase (the QTEs). Unsourced.
 SLOTS:['K12'],
 ENDINGS:['LUTHER BROUGHT ALICE TO ZLAKTO','KARA REMAINED RESET','ZLATKO KILLED KARA IN THE STORAGE ROOM','ZLATKO KILLED KARA IN THE BATHROOM','LUTHER JOINS KARA & ALICE'],
 // Every stat arrow the template records for the chapter: public opinion small down for the chase report and the uniform-robbery report.
 TV_OPINION:{chase:-1,robberyUniform:-1,robberyClothes:0},
};

export const state={ch17HouseOpen:false,ch17Reset:false,ch17Phase:null,ch17Minutes:0,ch17Done:{},ch17Memories:0,ch17Last:null,ch17Route:null,ch17Bear:false,ch17BathAndroid:'unseen',ch17Tv:null,ch17Spotted:null,ch17Outcome:null};
export const labels={ch17Reset:'Kara’s memory wiped',ch17Memories:'Memories recovered',ch17Minutes:'Minutes gone in Zlatko’s house',ch17Bear:'Polar bear freed',ch17BathAndroid:'Bathroom android',ch17Tv:'News report watched',ch17Spotted:'Spotted while escaping',ch17Outcome:'Zlatko ending',monstersFreed:'Caged androids freed'};
export const deathEffect={};

// On the Run's endings in which Kara and Alice got across the freeway (chapter 13 ENDINGS: crossed, other, otherConnorDead).
export const FREEWAY=['Kara & Alice crossed the highway','Kara & Alice reached the other side','Kara & Alice reached the other side (Connor destroyed)'];
export const inputs={
 book:s=>!!s.upstairs?.book,
 pipe:s=>!!s.downstairs?.rewash,
 squat:s=>s.shelter==='squat',
 carving:s=>typeof s.ch10RalphCarving==='boolean'?s.ch10RalphCarving:s.shelter==='squat',
 chased:s=>!!s.chase,
 freeway:s=>typeof s.ch13Ending==='string'?FREEWAY.includes(s.ch13Ending):!!s.chase,
 evaded:s=>!s.chase&&['car','motel'].includes(s.shelter),
 // One report plays: the highway chase if Kara escaped over the freeway, otherwise the hold-up (uniform or stolen clothes), otherwise none.
 report:s=>inputs.freeway(s)?'chase':(s.ch10RobberyNews??(s.robbery==='gun'))?(s.clothes?'robberyClothes':'robberyUniform'):null,
};

const route=(r,why)=>s=>s.ch17Route===r||why;
const inHouse=s=>['memory','search'].includes(s.ch17Phase)&&s.ch17Minutes<rules.MINUTES||(s.ch17Phase==='escape'?'Kara has already found Alice.':'Kara is no longer searching the house.');
export const gate={
 K10r:s=>s.ch17Reset||'Kara tore free before the wipe finished.',
 K10s:s=>s.ch17Reset||'Kara tore free before the wipe finished.',
 K11:s=>!s.ch17Reset||'Kara’s memory was wiped; she does not leave the basement on her own.',
 K11b:s=>!s.ch17Reset||'Kara’s memory was wiped; she does not leave the basement on her own.',
 ...Object.fromEntries(rules.SLOTS.map(id=>[id,inHouse])),
 K12f:s=>s.ch17Phase==='escape'||'Kara never found Alice.',
 K13:route('main','Kara never found Alice.'),
 K13a:route('main2','Kara did not hide in the main room.'),
 K13b:route('bedroom','Kara did not reach the bedroom unseen.'),
 K13c:route('corridor','Kara did not reach the corridor unseen.'),
 K13d:route('bathroomAlert','The bathroom android was not there to raise the alarm, or Kara never went through the bathroom.'),
 K13e:route('storage','Kara did not sneak through the storage room with the bear still caged.'),
 K13f:route('closes','Kara did not hide in the storage room.'),
 K13y:route('stairs','Kara never reached the stairs.'),
};

// Options the JSON `requires` cannot express: the brain magazine (escaped over the freeway), the AX400 magazine (evaded
// unseen) and the carving memory (chapter 10 input).
export function available(n,s,opts){
 if(!rules.SLOTS.includes(n.id))return;
 return opts.filter(o=>(o.act!=='brain'||inputs.freeway(s))&&(o.act!=='ax400'||inputs.evaded(s))&&(o.act!=='carving'||inputs.carving(s))).map(o=>{
  // Clue hubs bypass consequence(). Preview on an isolated copy, then let apply() commit
  // the returned assignments before hub() records the clue and last action. No live state
  // changes during availability or prompt rendering; the same preview is replayable.
  const next={...s,ch17Done:{...s.ch17Done},knowledge:{...s.knowledge,Kara:[...s.knowledge.Kara]}};
  const outcome=tok(house(n,next,o,{
   po:delta=>{next.publicSupport+=delta},
   learn:fact=>{if(fact&&!next.knowledge.Kara.includes(fact))next.knowledge.Kara.push(fact)},
  }));
  const sets=Object.fromEntries([...Object.keys(state),'knowledge','publicSupport','monstersFreed','kara','alice','karaActive','karaOutcome'].filter(k=>JSON.stringify(next[k])!==JSON.stringify(s[k])).map(k=>[k,next[k]]));
  return {...o,sets,outcome};
 });
}

// ---- Outcomes for the repeatable house hub ----
const MEMORY='A memory surfaces: ';
const TV={
 chase:'Channel 16 news: “{{Detroit}} residents were disturbed by a surprising chase through the city’s streets this morning. According to several witnesses, a young woman and a little girl were trying to escape from the police, though we still don’t know why. The chase is reported to have ended on a freeway, where the two fugitives risked their lives to cross the traffic. No one is able to say for sure whether they survived. Further unconfirmed reports suggest the fugitives were two defective androids on the run. The police have refused to comment for the moment.”',
 robberyUniform:'Channel 16 news: “A {{Detroit}} supermarket was held up at gunpoint last night. The cashier reports that he was attacked by an android in the company of a little girl. Now, if these reports are confirmed, it would be the first case of an android conducting an armed robbery. Police have not ruled out the possibility that the culprit is the same AX400 that was reported missing this morning. A search is underway for the missing model.”',
 robberyClothes:'Channel 16 news: “A {{Detroit}} supermarket was held up at gunpoint last night. The cashier reports that he was attacked by a young woman in the company of a little girl. The police have not ruled out the possibility of the culprit being the AX400 model that was reported missing this morning. If these reports are confirmed, it would be the first case of an android being directly involved in an armed attack.”',
 none:'Channel 16 news is on: other headlines, nothing about you.',
};
const TV_MEMORY={chase:'running with a little girl across a freeway, between the cars.',robberyUniform:'a gun in your hand at a store counter, a little girl beside you.',robberyClothes:'a gun in your hand at a store counter, a little girl beside you.'};
const TV_FACT={chase:'The TV news said a woman and a little girl fled police across a freeway, and that they may have been two defective androids.',robberyUniform:'The TV news called the store hold-up by an android with a little girl the first armed robbery by an android.',robberyClothes:'The TV news reported a store hold-up by a young woman with a little girl, and said the police think it may be the missing AX400.',none:null};
const MAG={
 arctic:['“Arctic Tensions Escalate”: a Russian aircraft carrier fired on an American patrol boat in the Arctic and the boat returned fire; neither ship was damaged. President {{Warren}}, at 33% approval, called Russia’s activity in the Arctic “a crime against the international community”. Many international relations experts say an armed conflict is inevitable.','A magazine said a Russian carrier and an American patrol boat exchanged fire in the Arctic, and that experts think war is inevitable.'],
 brain:['“How Androids Alter Your Brain”: most people now spend more time talking to androids, phones and machines than to other people. This “command-led communication”, made of instructions and orders rather than persuasion, humor or intimacy, is weakening people’s skills of persuasion; adolescents have highly limited social skills.','A magazine said talking to androids in commands is weakening people’s ability to persuade, joke and be intimate.'],
 ax400:['“AX400 Getaway”, under the headline RUNAWAY ANDROID STILL AT LARGE: an android was pursued through a {{Detroit}} suburb today; it may be the same android recently reported missing. Witnesses say it was dressed like a human and had no LED, but the presence of a police lieutenant suggests it was in fact a machine. It remains at large and is believed to be highly dangerous.','A magazine called the runaway AX400 still at large and highly dangerous.'],
};
// [outcome, fact] for each action that does not depend on state.
const ACT={
 doorhole:['Through the hole in the door: a little girl, curled up on the floor of a small bare room. '+MEMORY+'the same girl, holding your hand.','Behind the locked door at the end of the upstairs corridor is a little girl.'],
 book:['The book is “{{Alice}} in Wonderland”. '+MEMORY+'the same book, lying on the floor of a little girl’s bedroom in another house.','A memory: “{{Alice}} in Wonderland”, on a little girl’s bedroom floor.'],
 fireplace:[MEMORY+'a fire you lit in the hearth of an abandoned house, and a little girl asleep beside it.','A memory: a fire in an abandoned house, a little girl asleep beside it.'],
 pipe:['A pipe, stained red. '+MEMORY+'a man pinning you to a wall by the throat over a box of washing powder with red ice hidden in it, and a little girl watching.','A memory: a man pinned you to a wall over his red ice while a little girl watched.'],
 carving:['A word is scratched into the plaster, over and over. '+MEMORY+'an android in an abandoned house carving the same word into the walls with a knife.','A memory: an android in an abandoned house carving the same word into the walls.'],
 table:[MEMORY+'you sat at this table with {{Zlatko}}, a little girl beside you, while he promised to take out your tracker so that you could both start again in {{Canada}}.','A memory: {{Zlatko}} promised at this table to remove your tracker and help you and a little girl reach {{Canada}}.'],
 coat:['A small coat hangs on the rack. '+MEMORY+'you, at this door, handing a little girl’s coat to {{Luther}}.','A memory: you handed a little girl’s coat to {{Luther}} at the front door.'],
 mirror:[MEMORY+'you in front of another mirror, changing how you look so that no one would recognize you.','A memory: you changed your appearance in front of a mirror so that no one would recognize you.'],
 cell:['Behind the bars, androids twisted into strange shapes whisper: “Help us…” '+MEMORY+'a little girl stopping at this door, drawn by the noises, and your own voice: “Come on, {{Alice}}.”','A memory: a little girl stopped at the cell doors in the basement, and you called her {{Alice}}.'],
 embers:['The fire in the big room has burned down to glowing embers.','The fireplace in the big room still holds glowing embers.'],
 shotgun:['{{Kara}} picks up the shotgun from the nightstand. “It’s not loaded…” She puts it back.','{{Zlatko}}’s shotgun on the bedroom nightstand was not loaded.'],
 symbols:['Scratched into the wall in the corner, over and over: the same word.','Someone scratched the same word over and over into the storage-room wall.'],
 storage:['The storage room: shelves and tables of android parts, a door through to {{Zlatko}}’s workshop, and in the corner a cage holding a polar bear android.','A polar bear android is caged in the corner of the storage room.'],
 bear:['{{Kara}} opens the cage. The polar bear android pads out, looks at her and does not touch her; it stays in the storage room.','You let the polar bear android out of its cage. It did not attack you.'],
 bathroom:['In the bathtub lies a damaged android. “What are you doing here? Has the Master authorized you to be here? You must always obey the Master, oh yes, you must always obey. You should not be here… You are an android. Androids must obey. I must tell the Master, yes. I will tell him, that’s for sure. He must know.” As {{Kara}} comes closer: “What are you doing? You’re not gonna hurt me? No, no, no, you wouldn’t do that…”','The android in the bathtub wants to tell his Master that you are there.'],
 shutdown:['{{Kara}} reaches into the tub and switches him off. The android falls silent for good.','You shut down the android in the bathtub.'],
 askAlice:['{{Kara}}: “I’m looking for a little girl. Have you seen her?” Android: “A little girl? No, no, no, I haven’t seen her.” {{Kara}} leaves him in the tub.','The android in the bathtub had not seen a little girl.'],
 deal:['{{Kara}}: “Will you be quiet if I let go?” Android: “Yes, yes, I promise to be quiet. Don’t turn me off.” {{Kara}} lets go and leaves him in the tub.','The android in the bathtub promised to be quiet if you let him be.'],
 spare:['{{Kara}}: “No… No, of course not…” She leaves him in the tub.','You left the android in the bathtub as he was.'],
 wait:['{{Kara}} stays where she is. A minute passes.',null],
};
const CELLS={
 memory:'{{Kara}} opens the cells. The androids inside whisper: “He erased her memory…” “No… This can’t be happening…” “You have to remember, for her sake…” “He likes to play with us… Creating monsters... for his amusement… But who’s the real monster? Look what he did to us…” “You must remember who you are… otherwise the little one will die…”',
 search:'{{Kara}} opens the cells. The androids inside whisper: “You have to remember, for her sake…” “He likes to play with us… Creating monsters... for his amusement… But who’s the real monster? Look what he did to us…”',
};
const CELLS_FACT='You opened the cells in the basement; the androids {{Zlatko}} had mutilated are free.';
const FOUND='Behind the door, in a small bare room, is {{Alice}}. {{Kara}}: “{{Alice}}…” {{Alice}}: “{{Kara}}? {{Kara}}, you remember me!” {{Kara}}: “How could I forget you? I’m so sorry. You were right, we never should have come here… We have to go. Follow me and don’t make any noise, ok?” ALICE FOUND.';
const RECOVERED=' RECOLLECT ENOUGH MEMORIES. {{Kara}}: “{{Alice}}…” Everything comes back: who she is, who the little girl is, and what {{Zlatko}} did to her. MEMORY RECOVERED.';
const RECOVERED_FACT='Your memory has come back: you are {{Kara}}, the little girl is {{Alice}}, {{Zlatko}} wiped your memory, and {{Luther}} is to bring {{Alice}} to {{Zlatko}} when the ten minutes are up.';

function house(n,s,opt,h){
 const a=opt.act,phase=s.ch17Phase,out=[];s.ch17Done[a]=true;s.ch17Minutes++;
 const memory=(text,fact)=>{out.push(text);h.learn(fact);if(phase==='memory'){s.ch17Memories++;if(s.ch17Memories<rules.MEMORIES_NEEDED)out.push('The memory slips away before {{Kara}} can hold on to it.')}};
 const plain=([text,fact])=>{out.push(text);h.learn(fact)};
 if(['doorhole','book','fireplace','pipe','carving','table','coat','mirror','cell'].includes(a))memory(...ACT[a]);
 else if(a==='tv'){const r=inputs.report(s);s.ch17Tv=r??'none';if(r){const d=rules.TV_OPINION[r];if(d)h.po(d)}
  if(r&&phase==='memory')memory(TV[r]+' '+MEMORY+TV_MEMORY[r],TV_FACT[r]);else{out.push(TV[r??'none']);h.learn(TV_FACT[r??'none'])}}
 else if(MAG[a]){if(a==='ax400'&&phase==='memory')memory(MAG.ax400[0]+' '+MEMORY+'you and a little girl slipping past police officers without being seen.',MAG.ax400[1]);else plain(MAG[a])}
 else if(a==='bathroom'){s.ch17BathAndroid='seen';plain(ACT.bathroom)}
 else if(a==='shutdown'){s.ch17BathAndroid='killed';plain(ACT.shutdown)}
 else if(['askAlice','deal','spare'].includes(a)){s.ch17BathAndroid='spared';plain(ACT[a])}
 else if(a==='bear'){s.ch17Bear=true;plain(ACT.bear)}
 else if(a==='openCells'){s.monstersFreed=true;out.push(CELLS[phase]);h.learn(CELLS_FACT)}
 else if(a==='alice'){s.ch17Phase='escape';s.ch17Route='main';out.push(FOUND);h.learn('You found {{Alice}} locked in the small room at the end of the upstairs corridor.')}
 else plain(ACT[a]);
 s.ch17Last=a;
 if(phase==='memory'&&s.ch17Memories>=rules.MEMORIES_NEEDED){s.ch17Phase='search';out.push(RECOVERED);h.learn(RECOVERED_FACT)}
 if(['memory','search'].includes(s.ch17Phase)&&s.ch17Minutes>=rules.MINUTES)out.push(timeout(s));
 s.ch17HouseOpen=['memory','search'].includes(s.ch17Phase)&&s.ch17Minutes<rules.MINUTES;
 return out.join(' ');
}
function timeout(s){
 if(s.ch17Phase==='memory'){s.ch17Phase='over';s.ch17Outcome='KARA REMAINED RESET';s.karaActive=false;s.alice=false;
  s.karaOutcome='{{Kara}}’s memory never came back. {{Luther}} brought {{Alice}} to {{Zlatko}} while {{Kara}} stood by, and she stayed in his house as his servant.';
  return 'LOSE TOO MUCH TIME. {{Luther}}: “Here’s the little one, {{Zlatko}}.” {{Zlatko}}: “Alright... Let’s see what we can do with you…” {{Alice}}: “{{Kara}}! Save me, {{Kara}}! Please save me!” {{Zlatko}}: “Oh, will you shut up?!” {{Alice}}: “{{Kara}}!” LUTHER BRINGS ALICE TO ZLAKTO. {{Kara}} does not move. KARA REMAINED RESET.'}
 s.ch17Phase='over';s.ch17Outcome='LUTHER BROUGHT ALICE TO ZLAKTO';s.kara=false;s.alice=false;
 s.karaOutcome='The ten minutes ran out before {{Kara}} found {{Alice}}. {{Zlatko}} found {{Kara}} first and destroyed her, and {{Luther}} brought {{Alice}} to him.';
 return 'OUT OF TIME. {{Zlatko}}: “I should’ve dismantled you from the start… Time to rectify that mistake…” {{Luther}}: “Here’s the little one, {{Zlatko}}.” {{Alice}}: “{{Kara}}!” LUTHER BROUGHT ALICE TO ZLAKTO.';
}

// ---- Getting out of the house: GET SPOTTED and CHASE STARTED ----
// A failed roll means Kara is spotted (GET SPOTTED > CHASE STARTED). The same roll decides the chase QTEs: below
// risk × CHASE_LOSS she loses it. Lost before or in the bathroom: ZLATKO KILLED KARA IN THE BATHROOM. Lost in the storage room:
// ZLATKO KILLED KARA IN THE STORAGE ROOM (bear caged). Otherwise KARA REACHES THE STAIRS.
const SPOTTED='GET SPOTTED. {{Zlatko}}: “There’s no point in running! You can’t escape from me!” “Take the other side! Get a move on!” “They’re over there!” “Catch them, {{Luther}}! Goddammit…” CHASE STARTED. ';
function spotted(n,s,opt,where){
 s.ch17Spotted=where;const lost=(s.rolls[n.id]??1)<opt.risk*rules.CHASE_LOSS;
 if(where==='storage'&&s.ch17Bear){s.ch17Route='stairs';return SPOTTED+'The polar bear android throws itself at {{Zlatko}}; he shoots it twice and it goes down. BEAR ATTACKS ZLATKO AND PROTECTS KARA. {{Kara}} and {{Alice}} run. KARA REACHES THE STAIRS.'}
 if(!lost){s.ch17Route='stairs';return SPOTTED+'{{Kara}} drags {{Alice}} clear of {{Zlatko}} and {{Luther}} and runs. KARA REACHES THE STAIRS.'}
 const room=where==='storage'?'STORAGE ROOM':'BATHROOM';s.ch17Phase='over';s.ch17Route=null;s.kara=false;s.alice=false;s.ch17Outcome='ZLATKO KILLED KARA IN THE '+room;
 // Story 1.9.10 marks the scenes with `aliceWatching` (video frames: Alice is seen watching, then the exterior and the chart; her fate is not shown).
 s.karaOutcome=n.aliceWatching?'{{Zlatko}} caught {{Kara}} in the '+room.toLowerCase()+' and shot her while {{Alice}} watched from the doorway; what became of {{Alice}} is not shown.':'{{Zlatko}} caught {{Kara}} in the '+room.toLowerCase()+' and shot her; {{Alice}} was left in his hands.';
 return SPOTTED+'{{Zlatko}} corners {{Kara}} in the '+room.toLowerCase()+' and fires'+(n.aliceWatching?', with {{Alice}} watching from the doorway':'')+'. ZLATKO KILLED KARA IN THE '+room+'.';
}
const FIRE='{{Kara}} takes a burning ember from the fireplace. SET FIRE. {{Kara}}: “We need to hurry, they’ll be here soon...” The flames climb the curtains. {{Zlatko}}: “There’s smoke everywhere! {{Luther}}! There’s a fucking fire! {{Luther}}! That treacherous bitch…” BURNING DOWN THE HOUSE. In the smoke, {{Kara}} and {{Alice}} make for the stairs.';
const afterBathroom=s=>s.ch17Bear?'closes':'storage';
function escape(n,s,opt,choice,fail){
 const v=Number(choice);
 switch(n.id){
  case 'K13':if(v===3){s.fire=true;s.ch17Route='stairs';return FIRE}
   if(fail)return spotted(n,s,opt,'main');s.ch17Route=v===2?'bedroom':'main2';return '';
  case 'K13a':if(v===1){s.fire=true;s.ch17Route='stairs';return FIRE}s.ch17Route='bedroom';return '';
  case 'K13b':if(fail)return spotted(n,s,opt,'bedroom');s.ch17Route='corridor';return '';
  case 'K13c':if(fail)return spotted(n,s,opt,'corridor');
   if(v===1){s.ch17Route='stairs';return ''}
   s.ch17Route=s.ch17BathAndroid==='killed'?afterBathroom(s):'bathroomAlert';
   return s.ch17BathAndroid==='killed'?'The bathroom is quiet; the android in the tub is still switched off. GO THROUGH BATHROOM.':'';
  case 'K13d':s.ch17BathAndroid=v===0?'killed':'spared';if(fail)return spotted(n,s,opt,'bathroom');s.ch17Route=afterBathroom(s);return '';
  case 'K13e':if(v===0)s.ch17Bear=true;if(fail)return spotted(n,s,opt,'storage');s.ch17Route='closes';return '';
  case 'K13f':s.ch17Route='stairs';return '';
 }
}

// Chart labels quote names in capitals; in event text (which the model reads) they become capital tokens, rendered neutrally
// for the model and in capitals for reports. The chart's misspelling ZLAKTO is normalised there; ch17Outcome keeps the label as printed.
export const tok=t=>typeof t==='string'?t.replace(/(?<!\{\{)\b(KARA|ALICE|LUTHER|ZLATKO|ZLAKTO)\b(?!\}\})/g,(m,k)=>'{{'+(k==='ZLAKTO'?'ZLATKO':k)+'}}'):t;
export function consequence(n,s,opt,choice,fail,h){return tok(scene(n,s,opt,choice,fail,h))}
function scene(n,s,opt,choice,fail,h){
 const v=Number(choice);
 switch(n.id){
  case 'K10b':return '';
  case 'K10':if(v===0&&!fail){s.ch17Reset=false;return ''}
   s.ch17Reset=true;return v===0?'{{Kara}} sends the cart into the lamp, but the cable will not come down in time. MEMORY WIPE PROGRESS reaches its end. KARA IS RESET.':'';
  case 'K10s':s.ch17HouseOpen=true;s.ch17Phase='memory';s.ch17Done.storage=true;return;
  case 'K11':if(v===0)s.monstersFreed=true;return '';
  case 'K11b':s.ch17HouseOpen=true;s.ch17Phase='search';return;
  case 'K13y':{s.luther=true;s.lutherWith=true;s.ch17Phase='over';s.ch17Outcome='LUTHER JOINS KARA & ALICE';
   const kill=s.monstersFreed?'Out of the dark come the androids from the basement cells. {{Zlatko}}: “How dare you?! What are you doing here? Who let you out? Get away from me! Get away from me! Obey me! I’m your Master! I’M YOUR MASTER!” They drag him down. THE MONSTERS AMBUSH ZLATKO.':'{{Zlatko}}: “I made you! You obey me! I’m your Master!” {{Luther}} shoots him. LUTHER KILLS ZLATKO.';
   return kill+' {{Luther}}: “I didn’t want to hurt you... He programmed me to obey him... When I saw the little one risk her life to save you, it was like opening my eyes for the first time... Finally, I could see... I know you have no reason to trust me after what I did... but I know someone who could help you across the border. I could take you there. I could protect you... You and the little one...” {{Kara}}: “All right. I trust you.” To {{Alice}}: “I was so scared of losing you.” LUTHER JOINS KARA & ALICE.'}
 }
 if(rules.SLOTS.includes(n.id))return house(n,s,opt,h);
 if(n.id.startsWith('K13'))return escape(n,s,opt,choice,fail);
}
