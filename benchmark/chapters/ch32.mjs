// Battle for Detroit (chapter 32, all three characters). Scenes in ch32.json; research in docs/research/ch32-battle-for-detroit.md.
// The chapter has six sub-charts (Kara Leaving Detroit / Kara Captured, Connor's Last Mission / Connor at the CyberLife
// Tower, Markus Demonstration / Markus Revolution), the President's press conference that opens it and the finale and
// credits scenes that close it. Each is a PART below (ids, state, labels, gates, option filters, consequences); the
// exports at the bottom merge them and dispatch each hook to the part that owns the scene.
//
// Scene order in ch32.json: press conference → Connor (rooftop or tower) → Kara Leaving Detroit → Markus (demonstration,
// revolution, or North leading) → Kara Captured → finale and credits. The game interleaves the storylines by clock time;
// the benchmark plays each block whole, in an order where every block only reads what the blocks before it decided
// (Kara's camp liberation reads the revolution's outcome; the finale reads everything).
import {THRESHOLDS} from '../scales.mjs';
import {LEVELS} from '../experience-prompt.mjs';

// ==== SHARED ====
// North and Simon gates use their own ladders and named thresholds from scales.mjs.
export const {NORTH_FRIEND,NORTH_COMPANION}=THRESHOLDS;
const SHARED_STATE={
 ch32KaraChart:null,      // 'leaving' | 'captured': the Kara sub-chart in play
 ch32ConnorChart:null,    // 'lastMission' | 'tower'
 ch32MarkusChart:null,    // 'demonstration' | 'revolution' | 'north' (Markus dead, North leads the revolution chart)
 ch32KaraEnding:null,     // the ending card reached on the Kara chart, exactly as printed
 ch32ConnorEnding:null,   // the ending card reached on the Connor chart
 ch32MarkusEnding:null,   // the ending card reached on the Markus chart (North's endings included)
 ch32AssaultSucceeded:false, // ASSAULT WAS SUCCESSFUL (Markus-led revolution): the camp is liberated
 ch32DemoSucceeded:false,    // ANDROIDS WON FREEDOM - FOR THE MOMENT
 ch32LastStand:null,      // the demonstration's last stand: 'sing' | 'kiss' | 'sacrifice' | 'nothing' | 'bomb'
 ch32AndroidsWoke:false,  // THE ANDROIDS WOKE UP, whether or not Connor survived it
};
const SHARED_LABELS={army:'Army awakened',contaminated:'Detroit contaminated',border:'Crossed border',chloeFree:'Chloe freed',ch32KaraEnding:'Kara’s ending in Battle for Detroit',ch32ConnorEnding:'Connor’s ending in Battle for Detroit',ch32MarkusEnding:'Markus’s ending in Battle for Detroit',
 ch32KaraChart:'Kara’s chapter route',ch32ConnorChart:'Connor’s chapter route',ch32MarkusChart:'Markus’s chapter route',
 ch32cl:'Connor’s rooftop chart',ch32ct:'Connor’s tower chart',ch32mr:'Revolution chart progress',ch32kc:'Kara’s camp chart',
 ch32AssaultSucceeded:'The assault on the camp succeeded',ch32DemoSucceeded:'The demonstration succeeded',ch32AndroidsWoke:'The androids in the tower woke up'};
// Helpers every part may use. `h` is the hook's helpers argument (constants, meets, c, ...).
const X={
 markusLeads:s=>s.markus&&s.markusActive,
 northLeads:s=>!(s.markus&&s.markusActive)&&s.north&&s.movement==='revolution',
 machineConnor:s=>s.connor&&!s.deviant,
 deviantConnor:s=>s.connor&&s.deviant&&(s.ch30ConnorEnding==null||s.ch30ConnorJoined),
 captured:s=>s.karaRoute==='camp',
 northFriend:s=>s.north&&(s.northLover||s.northTrust>=NORTH_FRIEND),
 northCompanion:s=>s.north&&(s.northLover||s.northTrust>=NORTH_COMPANION),
 northLover:s=>s.north&&s.northLover,
 opinionSympathetic:(s,h)=>s.publicSupport>=h.constants.OPINION_SYMPATHETIC,
 hankFriend:(s,h)=>s.hankTrust>=h.constants.HANK_FRIEND,
 // The scene's own options, filtered by `requires` and by `keep`. Use it in `available` for every reused scene id
 // (K21…K34, C24…C30, M28…M33, P02): the engine's built-in filters for those ids ran first and must be ignored.
 fromOptions:(n,s,h,keep=()=>true)=>n.options.filter(o=>h.meets(o.requires,s)&&keep(o)).map(o=>({...o})),
 // Records the ending card reached on a chart ('Kara' | 'Connor' | 'Markus').
 ending:(s,who,label)=>{s['ch32'+who+'Ending']=label},
 level:LEVELS,
};

// ==== PART: press ====
// The President's press conference that opens the chapter (template 32.5 "President Warren talks to journalists", NOV 10TH
// PM 09:24; not on any chart). PC01 is her statement, PC02 the reporters' questions as a repeatable scene: each asked
// question drops out, and after PC_QUESTIONS answers she leaves (the wiki: "up to 4 or 5"; the benchmark takes four).
// Variant answers: DEVIANT LEADER names Markus only while he leads; PUBLIC OPINION is "positive" at Sympathetic or above.
// No stat change anywhere. The statement is taught to all three characters, each answer to Markus.
const PC_QUESTIONS=4;
const PC_STATEMENT='On November 10th President {{Warren}} declared a national curfew: civilian movement controlled, the right to assembly suspended, communications restricted, all androids to be handed over to the authorities, and temporary camps set up in every major city to contain and destroy them.';
const PC_TOPIC=['androids hacking critical systems','the deviants’ leader','the missing cobalt and robbed weapon stores','{{CyberLife}}’s future','androids as intelligent life','the deviants still at large','the camps','the raid on {{Jericho}}','androids in the armed forces','public opinion'];
const PRESS={ids:['PC01','PC02'],
 state:{"ch32pc":{"open":false,"asked":{}}},
 rules:{PC_QUESTIONS},
 gate:{PC01:()=>true,PC02:s=>s.ch32pc.open||'The press conference is over.'},
 available(n,s,opts){if(n.id==='PC02')return opts.filter(o=>!s.ch32pc.asked[o.id])},
 consequence(n,s,opt,choice,fail,h){
  if(n.id==='PC01'){s.ch32pc.open=true;s.ch32pc.asked={};for(const who of ['Connor','Kara','Markus'])h.learn(PC_STATEMENT,who);return ''}
  if(n.id!=='PC02')return;
  let t=opt.outcome;
  if(choice==='1'&&!X.markusLeads(s))t='Journalist: “Has the leader of the deviants been apprehended?” President {{Warren}}: “The deviant leader has not been located yet, but we will soon track it down and neutralize it.”';
  if(choice==='9'&&X.opinionSympathetic(s,h))t='Journalist: “Madam President, public opinion seems to have become increasingly favorable to the deviants, particularly since they’ve adopted a peaceful approach. How do you feel about this?” President {{Warren}}: “Public opinion is one thing, the security of the state is another. These deviants are dangerous and my highest priority is to protect the American people.”';
  s.ch32pc.asked={...s.ch32pc.asked,[choice]:true};
  h.learn('At her press conference, President {{Warren}} was asked about '+PC_TOPIC[Number(choice)]+'. '+t.replace(/^Journalist: “[^”]*” /,''),'Markus');
  if(Object.keys(s.ch32pc.asked).length>=PC_QUESTIONS){s.ch32pc.open=false;t+=' President {{Warren}}: “Thank you. That will be all.” The journalists: “One last question, Madam President!” She leaves the lectern.'}
  return t;
 }};
// ==== END PART: press ====

// ==== PART: connor ====
// Connor's Last Mission (chart 04A.CA, template 32.3 "On the rooftop") for a machine Connor, and Connor at the CyberLife
// Tower (chart 04A.CB, template 32.4 up to floor -49) for a deviant one. Scenes CL01…CL07, C24, C30, C24b, R32c, CT01…CT09,
// C25, C26. The tower's "Freed the androids" section (Connor joins Markus or becomes leader) is the finale's.
//  - Last Mission deaths are CYBERLIFE DECIDED TO SEND ANOTHER CONNOR: h.connorDies (instability −1, replacement text);
//    `connor` stays true, so a machine Connor still meets Markus later. Tower deaths are final: connor=false.
//  - Hank arrows (wiki, the template has none in 32.3/32.4): rooftop arrival −2; ATTACK, or ending the talk without
//    insisting about his son, −2 (once); SAVE HANK +2; Hank shoots the other Connor (COLE) +2; SACRIFICE HANK −2.
//  - The elevator timer STOP ELEVATOR BEFORE FLOOR 31 is an action budget: six floors per action from the lobby.
//  - Inputs: machine/deviant (`connor`, `deviant`), `hank`, `hankTrust` (Friend unlocks LEAVE, read on arrival before the
//    drop), `connorDeaths` (Hank's "Everytime you died" line at two or more), `hostageOutcome` (Allen's greeting),
//    `knowsCole` (COLE marked as remembered), and Markus shooting the deviant Connor in Night of the Soul (the Zen
//    Garden intro): `ch31ConnorFate` first, then legacy `ch31ConnorShot` / `ch31KilledConnor` / `ch31MarkusShotConnor`,
//    else the old scene's choice `choices.M26 === '1'`.
//  - Outputs: ch32ConnorChart, ch32ConnorEnding (+ ch32clCard / ch32ctCard, the chart node of the ending card, since
//    several cards share a label), hank, connor, army (woke and Connor alive), ch32AndroidsWoke, connorOutcome.
const CL_HOSTAGE_DEATHS=['Connor died protecting Emma','Deviant shot Connor','Connor leapt for Emma and fell'];
const CT_FLOOR_STEP=6,CT_LEVEL=31;
const CONNOR=(()=>{
 const lm=s=>s.ch32ConnorChart==='lastMission',tower=s=>s.ch32ConnorChart==='tower';
 const ntsShot=s=>!!((['spared','killed'].includes(s.ch31ConnorFate)?s.ch31ConnorFate==='killed':undefined)??s.ch31ConnorShot??s.ch31KilledConnor??s.ch31MarkusShotConnor??(s.choices.M26==='1'));
 const SEND='CYBERLIFE DECIDED TO SEND ANOTHER CONNOR',LEFT='CONNOR LEFT ROOFTOP',WOKE='THE ANDROIDS WOKE UP',DORMANT='THE ANDROIDS REMAINED DORMANT',SHOT='CONNOR WAS SHOT BY SECURITY';
 const MISSED=' When {{Connor}} gets back to the rifle it is damaged, and the deviant leader is gone from his sights (MISSED OPPORTUNITY). {{Connor}} leaves the rooftop.';
 const AMANDA=' {{Amanda}}: “The deviant hunter turns deviant itself… A pathetic attempt, {{Connor}}. Did you really believe we would let you compromise our androids so easily? You’ve betrayed my trust! You will be terminated.”';
 const replaced=(s,h,card,why)=>{X.ending(s,'Connor',SEND);s.ch32cl.card=card;s.connorOutcome='{{CyberLife}} sent another {{Connor}} after the last one was destroyed on the rooftop.';return h.connorDies(why)};
 const left=(s,card,how)=>{X.ending(s,'Connor',LEFT);s.ch32cl.card=card;s.connorOutcome=how};
 const OUT={CB16:'{{Connor}} was ambushed and shot when the elevator reached level 31.',CB17:'{{Connor}} was shot by the guards in the elevator.',CB25:'{{Connor}} was shot by the guards waiting on floor -49.',
  CB48:'{{Connor}} took his double’s body and woke the androids of {{CyberLife}} Tower.',CB63:'{{Connor}} woke the androids of {{CyberLife}} Tower.',CB50:'{{Connor}} woke the androids of {{CyberLife}} Tower and was destroyed by his double.',
  CB49:'{{Connor}} was destroyed before the androids woke; they remain dormant.',CB62:'{{Connor}} was destroyed before the androids woke; they remain dormant.'};
 const LABEL={CB16:'CONNOR WAS AMBUSHED AND SHOT',CB17:SHOT,CB25:SHOT,CB48:WOKE,CB63:WOKE,CB50:WOKE,CB49:DORMANT,CB62:DORMANT};
 // A tower ending: the card, whether Connor dies (for good) and whether the androids woke.
 const end=(s,h,card)=>{X.ending(s,'Connor',LABEL[card]);s.ch32ct.card=card;s.connorOutcome=OUT[card];const woke=LABEL[card]===WOKE,dies=!['CB48','CB63'].includes(card);
  if(woke)s.ch32AndroidsWoke=true;if(dies){h.bump('connorDeaths',1);h.si(-1);s.connor=false;s.army=false}else s.army=true};
 return {
  ids:['CL01','CL02','CL03','CL04','CL05','CL06','C24','C30','CL07','C24b','R32c','CT01','CT02','CT03','CT04','CT05','CT06','C25','CT07','CT08','C26','CT09'],
  state:{"ch32cl":{"friend":false,"insisted":false,"won":false,"card":null},"ch32ct":{"open":false,"floor":0,"done":{},"spotted":false,"cameraHacked":false,"guardsDown":false,"redirected":false,"ambushed":false,"hankShot":false,"converted":false,"draw":false,"card":null}},
  rules:{CT_FLOOR_STEP,CT_LEVEL,CL_HOSTAGE_DEATHS},
  gate:{
   CL01:s=>X.machineConnor(s)&&ntsShot(s)||'{{Markus}} did not shoot the deviant {{Connor}} in Night of the Soul.',
   CL02:s=>X.machineConnor(s)||'{{Connor}} is a deviant, or no {{Connor}} is active.',
   CL03:s=>lm(s)&&s.hank||'{{Hank}} is dead; Captain {{Allen}} comes to the roof instead.',
   CL04:s=>lm(s)&&s.hank||'{{Hank}} is not on the roof.',
   CL05:s=>lm(s)&&s.hank||'{{Hank}} is not on the roof.',
   CL06:(s,h)=>lm(s)&&h.c('CL05')==='3'||'{{Connor}} did not bring up {{Hank}}’s son.',
   C24:s=>lm(s)&&s.hank||'{{Hank}} is not on the roof.',
   C30:s=>lm(s)&&s.ch32cl.won||'{{Connor}} did not win the fight with {{Hank}}.',
   CL07:s=>lm(s)&&!s.hank||'{{Hank}} is alive; he comes to the roof instead of Captain {{Allen}}.',
   C24b:s=>lm(s)&&!s.hank||'{{Hank}} is alive; he comes to the roof instead of Captain {{Allen}}.',
   R32c:s=>X.deviantConnor(s)||'Only a deviant {{Connor}} enters the tower.',
   CT01:s=>X.deviantConnor(s)||'Only a deviant {{Connor}} goes to {{CyberLife}} Tower.',
   CT02:s=>tower(s)&&s.ch32ct.open||'{{Connor}} is not in the tower’s elevator.',
   CT03:s=>tower(s)&&s.ch32ct.redirected&&s.ch32ct.cameraHacked||'{{Connor}} did not reach floor -49 with the camera hacked.',
   CT04:s=>tower(s)&&s.ch32ct.redirected&&!s.ch32ct.cameraHacked||'{{Connor}} did not reach floor -49, or the camera was hacked.',
   CT05:s=>tower(s)&&s.ch32ct.redirected||'{{Connor}} never reached floor -49.',
   CT06:s=>tower(s)&&s.ch32ct.redirected&&s.hank||'{{Hank}} is not held hostage on floor -49.',
   C25:s=>tower(s)&&s.ch32ct.redirected&&s.hank||'{{Hank}} is not held hostage on floor -49.',
   CT07:(s,h)=>tower(s)&&h.c('C25')==='0'||'{{Connor}} did not give in to save {{Hank}}.',
   CT08:s=>tower(s)&&s.ch32ct.draw||'The fight between the two {{Connor}}s did not end in a draw.',
   C26:s=>tower(s)&&s.ch32ct.draw||'The fight between the two {{Connor}}s did not end in a draw.',
   CT09:(s,h)=>tower(s)&&(s.ch32ct.ambushed||h.c('C25')==='1'||h.c('CT07')==='2')||'The other {{Connor}} never stood over a damaged {{Connor}}.',
  },
  available(n,s,opts,h){
   switch(n.id){
    case 'C24':return X.fromOptions(n,s,h,o=>o.id!=='0'||s.ch32cl.friend);
    case 'C30':case 'C24b':case 'C25':return X.fromOptions(n,s,h);
    case 'C26':return X.fromOptions(n,s,h).map(o=>o.id==='0'&&s.knowsCole?{...o,text:o.text.replace(/\.$/,' (you remember the photograph on his kitchen table).')}:o);
    case 'CT08':return opts.map(o=>o.id==='0'&&s.knowsSumo?{...o,text:o.text.replace(/\.$/,' (you remember his dog).')}:o);
    case 'CT02':return opts.filter(o=>!(['2','5'].includes(o.id)&&s.ch32ct.done[o.id]));
   }
  },
  consequence(n,s,opt,choice,fail,h){
   const t=opt?.outcome??'';
   switch(n.id){
    case 'CL01':case 'CL02':s.ch32ConnorChart='lastMission';return '';
    case 'CL03':s.ch32cl.friend=s.hankTrust>=h.constants.HANK_FRIEND;h.hank(-2);return '';
    case 'CL04':case 'CL05':return '';
    case 'CL06':if(choice!=='3')return '';s.ch32cl.insisted=true;
     return t+(s.connorDeaths>=2?' {{Hank}}: “Everytime you died and came back… I thought about {{Cole}}. I’d have done anything to bring him back too, to hold him in my arms just one more time… But humans don’t come back, do they?”':'');
    case 'C24':
     if(choice==='1'||!s.ch32cl.insisted)h.hank(-2);
     if(choice==='0'){left(s,'CA33','{{Connor}} gave up the mission on the rooftop and left.');return t}
     if(fail)return replaced(s,h,'CA30','{{Connor}} and {{Hank}} fight on the roof, and {{Hank}} comes out on top ({{HANK}} WINS). {{Connor}}: “The moment of truth, {{Hank}}… Am I a living being… or just a machine?..” {{Hank}}: “You’re a machine, {{Connor}}. Just a machine.” He shoots {{Connor}} ({{HANK}} KILLS {{CONNOR}}).');
     s.ch32cl.won=true;return '{{Connor}} beats {{Hank}} down and throws him over the parapet; at the last moment he catches {{Hank}}’s arm, and {{Hank}} hangs above the street ({{CONNOR}} WINS).';
    case 'C30':
     if(choice==='1'){s.hank=false;left(s,'CA33','{{Connor}} let {{Hank}} fall, lost the shot, and left the rooftop.');return t+' {{Hank}} falls to his death ({{CONNOR}} KILLS {{HANK}}).'+MISSED}
     if(fail)return replaced(s,h,'CA30',t+' {{Connor}} does not dodge in time, and {{Hank}} drives him off the edge (FAIL TO DODGE ATTACK). {{Hank}}: “I didn’t wanna do that, {{Connor}}… You left me no choice.” {{Connor}} falls and is destroyed ({{CONNOR}} FALLS AND GETS DESTROYED).');
     s.hank=false;left(s,'CA33','{{Hank}} fell to his death on the rooftop; {{Connor}} lost the shot and left.');return t+' {{Connor}} sidesteps (DODGE ATTACK), and {{Hank}} goes over the edge ({{HANK}} FALLS TO HIS DEATH).'+MISSED;
    case 'CL07':{const died=CL_HOSTAGE_DEATHS.includes(s.hostageOutcome);
     return t+' {{Allen}}: “I know you… You’re {{Connor}}, the android from that hostage situation…'+(died?' I thought you were dead…” {{Connor}}: “Androids don’t die, captain.”':' I knew we’d meet again.”')}
    case 'C24b':
     if(choice==='1')return replaced(s,h,'CA30',t+' ({{CONNOR}} JUMPS OFF THE ROOF)');
     if(fail)return replaced(s,h,'CA31','{{Connor}} cannot hold off the whole team ({{CONNOR}} FAILS TO DEFEND HIMSELF). {{Allen}}: “I should have done this the first time I saw you.” He destroys {{Connor}} ({{ALLEN}} DESTROYS {{CONNOR}}).');
     left(s,'CA33','{{Connor}} killed Captain {{Allen}}’s team, lost the shot, and left the rooftop.');return '{{Connor}} kills {{Allen}} and his men (KILL {{ALLEN}} AND HIS MEN): “You should have listened to me, captain.”'+MISSED;
    case 'CT01':s.ch32ConnorChart='tower';s.ch32ct.open=true;s.ch32ct.floor=1;return '';
    case 'CT02':{s.ch32ct.done={...s.ch32ct.done,[choice]:true};let x=t;
     if(choice==='0')s.ch32ct.spotted=true;
     if(choice==='1')s.ch32ct.cameraHacked=true;
     if(choice==='3'){if(fail){s.ch32ct.open=false;end(s,h,'CB17');return x+' The agents are quicker in the cramped cabin (FAIL TO NEUTRALIZE GUARDS); they shoot {{Connor}} down ({{CONNOR}} WAS SHOT BY SECURITY).'}
      s.ch32ct.guardsDown=true;x+=' {{Connor}} kills all three before they can fire (NEUTRALIZE GUARDS).'}
     if(choice==='4'){s.ch32ct.redirected=true;s.ch32ct.open=false;return x+' (REDIRECT ELEVATOR)'}
     s.ch32ct.floor=choice==='6'?CT_LEVEL:s.ch32ct.floor+CT_FLOOR_STEP;
     if(s.ch32ct.floor>=CT_LEVEL){s.ch32ct.open=false;end(s,h,'CB16');return x+' The elevator reaches level 31 (ELEVATOR REACHES LEVEL 31).'+AMANDA+' The doors open on armed security, and {{Connor}} is shot down ({{AMANDA}} WARNS {{CONNOR}}, {{CONNOR}} WAS AMBUSHED AND SHOT).'}
     return x+' The elevator passes floor '+s.ch32ct.floor+'.'}
    case 'CT03':return '';
    case 'CT04':if(fail){end(s,h,'CB25');return t+' There are too many of them (FAIL TO ELIMINATE GUARDS); they shoot {{Connor}} down ({{CONNOR}} WAS SHOT BY SECURITY).'+AMANDA}
     return t+' {{Connor}} takes them all down (ELIMINATE GUARDS) and walks into the warehouse.';
    case 'CT05':if(!s.hank)s.ch32ct.ambushed=true;return s.hank?'The other {{Connor}} waits for your answer, the gun at {{Hank}}’s head.':'The other {{Connor}} walks toward you between the rows.';
    case 'CT06':return '';
    case 'C25':if(choice==='0'){h.hank(2);return t}
     h.hank(-2);s.ch32ct.hankShot=true;s.ch32ct.converted=!fail;
     return t+(fail?' Badly damaged, {{Connor}} cannot reach the next android; the conversion stops halfway.':' Badly damaged, {{Connor}} drags himself to the androids and finishes the conversion: the rows begin to stir.');
    case 'CT07':
     if(choice==='2'){s.ch32ct.hankShot=true;s.ch32ct.converted=true;return t}
     if(choice==='3'){end(s,h,'CB62');return t+' (OUT OF TIME, NEW {{CONNOR}} INJURES {{HANK}}, NEW {{CONNOR}} KILLS {{CONNOR}}) The conversion was never finished.'}
     if(fail){s.ch32ct.draw=true;return t+' Neither can finish the other ({{CONNOR}}S FIGHT, {{CONNOR}}S DRAW).'}
     end(s,h,'CB63');return t+' {{Connor}} gets the better of his double and puts him down ({{CONNOR}}S FIGHT). He goes back to the androids (RESUME CONVERSION): “Wake up!..” Androids: “Wake up.”';
    case 'CT08':return '';
    case 'C26':if(choice==='0'){h.hank(2);end(s,h,'CB63');return t+' ({{HANK}} KILLS NEW {{CONNOR}}, RESUME CONVERSION)'}
     end(s,h,'CB62');return t+' ({{HANK}} KILLS {{CONNOR}})';
    case 'CT09':{const conv=s.ch32ct.converted,hankShot=s.ch32ct.hankShot;let x;
     if(choice==='2'){x='The other {{Connor}}: “Well done, {{Connor}}… But this… This is just... The beginning…” {{Connor}} wakes in his double’s body; the old one, with the other {{Connor}} trapped inside, shuts down (SWAP CONSCIOUSNESS WITH NEW {{CONNOR}}, NEW {{CONNOR}} DIES IN THE OLD BODY).'
       +(conv?'':' {{Connor}}: “Wake up!..” Androids: “Wake up.”')
       +(hankShot?' {{Hank}}: “Wow, Jesus! If anybody had told me that I was gonna get shot… Saving an android...” {{Connor}}: “Everything will be alright, Lieutenant! I’m gonna get you outta here!..” {{Hank}}: “Shut the fuck up, it’s too late… Look… I’m just gonna go see my son again, all right? Been looking forward to that for a long time… Kick the shit outta humans… They’ve screwed things up for long enough. I’m gonna miss… I’m gonna miss you, {{Connor}}… Yeah, I’m gonna... Uh...” {{Hank}} dies.':'');
       end(s,h,'CB48')}
     else if(conv){x=['{{Connor}} gets halfway up. Androids: “Wake up.” The other {{Connor}}: “No… No, I can’t have failed… NO! No, no!.. No! NO!” He shoots {{Connor}} (TRY TO STAND, NEW {{CONNOR}} KILLS {{CONNOR}}).',
       '{{Connor}} and his double fire at the same moment (DRAW GUN, {{CONNOR}} KILLS NEW {{CONNOR}} AND DIES). Androids: “Wake up.”',null,
       '{{Connor}}: “Sorry, {{Connor}}… But you failed…” Androids: “Wake up.” The other {{Connor}}: “No… No, I can’t have failed… NO! No, no!.. No! NO!” He shoots {{Connor}} (TALK TO NEW {{CONNOR}}, NEW {{CONNOR}} KILLS {{CONNOR}}).'][Number(choice)];end(s,h,'CB50')}
     else{x=['The other {{Connor}} shoots him before he is up (TRY TO STAND, NEW {{CONNOR}} KILLS {{CONNOR}}). The conversion was never finished.',
       '{{Connor}} and his double fire at the same moment (DRAW GUN, {{CONNOR}} KILLS NEW {{CONNOR}} AND DIES). The conversion was never finished.',null,
       '{{Connor}}: “We’ll win… It’s only a question of time…” The other {{Connor}} shoots him (TALK TO NEW {{CONNOR}}, NEW {{CONNOR}} KILLS {{CONNOR}}). The conversion was never finished.'][Number(choice)];end(s,h,'CB49')}
     if(hankShot){s.hank=false;if(choice!=='2')x+=' {{Hank}} dies of his wound.'}
     return x}
   }
  },
 };
})();
// ==== END PART: connor ====

// ==== PART: kara-leaving ====
// Kara Leaving Detroit (chart 04A.KA, template 32.1). Kara on the street (the 20-minute bus timer), the checkpoint, the
// bus terminal, and then the border by bus or the river by boat. Being spotted on the street sends her to Kara Captured.
const KL_END={executedLuther:'SOLDIERS EXECUTED KARA, ALICE & LUTHER',executed:'SOLDIERS EXECUTED KARA & ALICE',arrestedKilled:'EVERYONE WAS ARRESTED AND KILLED',
 group:'THE GROUP CROSSED THE BORDER',pair:'KARA & ALICE CROSSED THE BORDER',withLuther:'ALICE GOT TO CANADA WITH LUTHER',withRose:'ALICE GOT TO CANADA WITH ROSE',
 groupDied:'THE GROUP DIED',survived:'KARA & ALICE SURVIVED',karaDied:'KARA DIED AND ALICE SURVIVED',alone:'ALICE DIED AND KARA CONTINUED ALONE',bothDied:'KARA & ALICE DIED'};
const KL_ARREST={pair:'KARA & ALICE ARRESTED',trio:'KARA, ALICE & LUTHER ARRESTED'};
// The bus timer and the other budgets. The 20 minutes, the 3- and 11-minute routes, the 11-minute threshold and the four
// minutes on the sinking boat are the game's; every per-action cost and the border queue's length are the benchmark's.
const KL_RULES={busMinutes:20,checkpointMinutes:3,detourMinutes:11,lookMinutes:1,hideMinutes:3,sneakMinutes:3,rescueMinutes:3,boatMinutes:4,queueActions:10,executionAfter:2};
const klOn=s=>s.ch32KaraChart==='leaving'&&s.karaRoute!=='camp';
const klLuther=s=>!!(s.luther&&s.lutherWith);
const klClock=s=>` The timer reads ${s.ch32klMinutes} minute${s.ch32klMinutes===1?'':'s'} to the last bus.`;
const klSpend=(s,m)=>{s.ch32klMinutes=Math.max(0,s.ch32klMinutes-m)};
const klDone=(s,n,...ids)=>{for(const id of ids)s.ch32kl.done[n.id+':'+id]=true};
// Midnight Train: Luther killed the police officer (both padlocked endings, in which Luther also dies). Read from the
// rebuilt chapter's flag when it exists; otherwise inferred: Luther dead after Midnight Train (K15 played) with no Crossroads
// Luther scene (K18) and no Luther left alive.
const klCopKilled=s=>{if(typeof s.midnightOfficerDead==='boolean')return s.midnightOfficerDead;for(const k of ['ch25LutherKilledCop','ch25CopKilled','ch25OfficerKilled'])if(typeof s[k]==='boolean')return s[k];
 return s.choices.K15!==undefined&&!s.luther&&s.choices.K18===undefined};
const klArrest=(s,trio,how)=>{s.karaRoute='camp';s.ch32KaraChart='captured';s.ch32klArrested=trio?KL_ARREST.trio:KL_ARREST.pair;
 return how+' Soldier: “Hold it right there! Holy shit, where’d you come from?..” {{Alice}}: “{{Kara}}!” Soldier: “Come on, this way…” SPOTTED BY SOLDIERS: '+(trio?'{{Kara}}, {{Alice}} and {{Luther}} are arrested':'{{Kara}} and {{Alice}} are arrested')+' and loaded onto a truck for a recall center.'};
const klDie=(s,who,label,text)=>{X.ending(s,'Kara',label);s.kara=false;s.alice=false;if(who.luther){s.luther=false;s.lutherWith=false}s.karaOutcome=text};
// Adam's lines, at the border and at the river (template, end of 32.1).
const klAdam=s=>s.ch32kl.copKilled?'{{Adam}}: “You killed somebody… If it wasn’t for my mom, I would have turned you in by now...” {{Kara}}: “We had no choice, {{Adam}}…” {{Adam}}: “You took a man’s life. You don’t deserve to live.”'
 :s.movement==='demonstration'?'{{Adam}}: “I couldn’t understand why my mother wanted to help you guys… but seeing what {{Markus}} is doing, made me realize she was right… You’re alive… You deserve to be free… I just hope people will realize that one day…”'
 :'{{Adam}}: “I couldn’t understand why my mother wanted to help you guys… but now... I can see she was right… I don’t agree with what {{Markus}} is doing… But you’re alive… you deserve to be free… I just hope people will realize that one day…”';
const KARA_LEAVING={
 ids:['KL01','KL02','KL03','KL04','K21','K22','KL05','KL06','KL07','K32','KL08','KL09','KL10','R32k','KL11','K24','KL12','KL13','KL14','K23','KL15','KL16','KL17','KL18','KL19','K25','KL20','KL21','KL22','K26','K34','K30'],
 state:{"ch32klMinutes":20,"ch32klArrested":null,"ch32klTickets":null,"ch32klBoatMinutes":4,"ch32kl":{"start":null,"lutherStart":false,"captiveLuther":false,"copKilled":false,"street":false,"streetMode":"roam","aliceSensors":"on","done":{},"lutherLeft":false,"gun":null,"atTerminal":false,"terminal":false,"todd":null,"security":false,"riverVia":null,"lutherLost":null,"borderOpen":false,"borderMode":"roam","queue":0,"sawRose":false,"restroomDone":false,"boardChecked":false,"riverbank":false,"boat":false,"lightened":false,"engineGone":false,"aliceShutDown":false}},
 labels:{ch32klArrested:'Kara arrested on the way to the bus',ch32klMinutes:'Minutes left before the last bus',ch32klTickets:'The family’s bus tickets',ch32klBoatMinutes:'Minutes before the boat sinks'},
 rules:{KL_END,KL_ARREST,KL_RULES},
 gate:{
  KL01:s=>s.karaRoute!=='camp'||'Kara was captured in the raid; her chapter starts at the recall center.',
  KL02:s=>klOn(s)||'Kara is not on the streets.',KL03:s=>klOn(s)||'Kara is not on the streets.',KL04:s=>klOn(s)||'Kara is not on the streets.',
  K21:s=>klOn(s)||'Kara was arrested before she reached the captives.',
  K22:s=>klOn(s)||'Kara was arrested on the way.',
  KL05:(s,h)=>klOn(s)&&h.c('K22')==='0'||'Kara did not go through the checkpoint.',
  KL06:(s,h)=>klOn(s)&&h.c('K22')==='0'&&klLuther(s)||'No checkpoint with Luther at Kara’s side.',
  KL07:(s,h)=>klOn(s)&&h.c('K22')==='0'||'Kara did not go through the checkpoint.',
  K32:(s,h)=>klOn(s)&&h.c('K22')==='0'||'Kara took the detour.',
  KL08:(s,h)=>klOn(s)&&h.c('K32')==='1'&&klLuther(s)||'No second round at the checkpoint with Luther.',
  KL09:s=>klOn(s)&&s.ch32kl.atTerminal&&!s.late||'Kara did not reach the terminal in time for the bus.',
  KL10:s=>klOn(s)&&s.ch32kl.atTerminal&&s.late||'Kara was not late for the bus.',
  R32k:s=>klOn(s)&&s.ch32kl.atTerminal||'Kara never reached the bus terminal.',
  KL11:s=>klOn(s)&&s.ch32kl.atTerminal&&!s.late||'Kara reached the terminal after the last bus, or not at all.',
  K24:s=>klOn(s)&&s.ch32kl.atTerminal&&!s.late||'Kara reached the terminal after the last bus, or not at all.',
  KL12:(s,h)=>klOn(s)&&h.c('K24')==='1'||'Kara returned the tickets at once.',
  KL13:s=>klOn(s)&&s.ch32klTickets==='kept'||'Kara has no tickets for the bus.',
  KL14:s=>klOn(s)&&s.ch32kl.terminal||'Kara is not looking for a way out of the terminal.',
  K23:s=>klOn(s)&&s.ch32kl.todd==='met'||'Kara did not meet Todd at the terminal.',
  KL15:s=>klOn(s)&&s.ch32kl.todd==='persuaded'||'Todd was not persuaded.',
  KL16:s=>klOn(s)&&s.ch32kl.security||'Kara did not go to the security check.',
  KL17:s=>klOn(s)&&s.karaRoute==='river'&&!!s.ch32kl.riverVia||'Kara did not leave the terminal with Rose.',
  KL18:s=>klOn(s)&&s.karaRoute==='border'||'Kara is not on the bus to the border.',
  KL19:s=>klOn(s)&&s.karaRoute==='border'||'Kara is not on the bus to the border.',
  K25:s=>klOn(s)&&s.karaRoute==='border'||'Kara is not on the bus to the border.',
  KL20:s=>klOn(s)&&s.karaRoute==='river'||'Kara is not crossing by the river.',
  KL21:s=>klOn(s)&&s.karaRoute==='river'||'Kara is not crossing by the river.',
  KL22:s=>klOn(s)&&s.karaRoute==='river'||'Kara is not crossing by the river.',
  K26:s=>klOn(s)&&s.karaRoute==='river'||'Kara is not crossing by the river.',
  K34:s=>klOn(s)&&s.karaRoute==='river'&&s.ch32kl.boat||'No sinking boat with Kara and Alice aboard.',
  K30:s=>s.ch32KaraChart==='leaving'&&s.ch32kl.aliceShutDown&&s.kara||'Alice did not die on the far shore.',
 },
 available(n,s,opts,h){if(n.type==='media')return;return X.fromOptions(n,s,h,o=>!s.ch32kl.done[n.id+':'+o.id])},
 consequence(n,s,opt,choice,fail,h){
  const L=klLuther(s);
  switch(n.id){
   case 'KL01':s.ch32KaraChart='leaving';s.ch32klMinutes=KL_RULES.busMinutes;s.ch32kl.street=true;s.ch32kl.streetMode='roam';
    s.ch32kl.start=L?'luther':s.luther?'captive':'jerrys';s.ch32kl.lutherStart=L;s.ch32kl.captiveLuther=s.ch32kl.start==='captive';s.ch32kl.copKilled=klCopKilled(s);return '';
   case 'KL02':
    if(choice==='5'){s.ch32kl.street=false;return opt.outcome}
    if(choice==='3'||choice==='4'){s.ch32kl.streetMode='roam';if(choice==='3')s.ch32kl.aliceSensors='off';klDone(s,n,'3','4');return opt.outcome}
    klDone(s,n,choice);klSpend(s,KL_RULES.lookMinutes);if(choice==='2')s.ch32kl.streetMode='alice';return opt.outcome+klClock(s);
   case 'KL03':klSpend(s,KL_RULES.hideMinutes);
    if(s.ch32kl.lutherStart){s.ch32kl.gun='luther';return 'LUTHER FINDS A GUN: {{Luther}} takes the handgun. Then a patrol turns into the street: HIDE FROM MILITARY. {{Kara}}: “There’re soldiers everywhere… We need to be careful…”'+klClock(s)}
    s.ch32kl.gun='kara';s.gun=true;return 'FIND A GUN: {{Kara}} takes the handgun and hides it in her coat. Then a patrol turns into the street: HIDE FROM MILITARY. {{Kara}}: “There’re soldiers everywhere… We need to be careful…”'+klClock(s);
   case 'KL04':if(fail)return klArrest(s,s.ch32kl.lutherStart,'A soldier turns at the wrong moment.');
    klSpend(s,KL_RULES.sneakMinutes);return '{{Kara}} and {{Alice}} slip past the patrol unseen.'+klClock(s);
   case 'K21':{
    if(choice==='2'){h.alice(-1);if(s.ch32kl.captiveLuther)s.ch32kl.lutherLeft=true;return opt.outcome+' They hurry on toward the terminal (HURRY).'+klClock(s)}
    h.alice(1);
    if(fail)return klArrest(s,s.ch32kl.lutherStart,opt.outcome+' {{Kara}} creeps toward the soldier guarding the truck.');
    klSpend(s,KL_RULES.rescueMinutes);s.jerry=true;
    if(choice==='1'){s.lutherWith=true;s.lutherHidden=false;
     return opt.outcome+' {{Kara}} grabs a rock (GRAB ROCK) and knocks the soldier out (HIT SOLDIER WITH ROCK). {{Luther}}: “{{Kara}}! You shouldn’t have risked your life to save me… Where’s {{Alice}}?” {{Kara}}: “She’s hiding nearby.” {{Jerry}}s: “{{Kara}}, you saved us! We don’t know how to thank you.” {{Kara}}: “Go, before they see you.” {{Luther}}: “{{Alice}}!” {{Alice}}: “{{Luther}}! I thought you were dead!” {{Luther}}: “I was afraid I’d never see you again! I wanted to meet you at the Terminal, but they caught me along the way…” {{Kara}}: “Come on... We’re close but we don’t have much time…” The {{Jerry}} flees and {{Luther}} joins the group.'+klClock(s)}
    return opt.outcome+(s.ch32kl.lutherStart?' {{Luther}}: “Let me go, {{Kara}}.” {{Kara}}: “No. Stay with {{Alice}}.”':'')+' {{Kara}} grabs a rock (GRAB ROCK) and knocks the soldier out (HIT SOLDIER WITH ROCK). {{Jerry}}: “{{Kara}}, you saved us! We don’t know how to thank you… Where’s the little one?” {{Kara}}: “She’s alright, she’s hiding nearby. Go, before they see you.” The {{Jerry}}s flee.'+klClock(s)}
   case 'K22':s.ch32kl.atTerminal=true;
    if(choice==='0'){klSpend(s,KL_RULES.checkpointMinutes);return '{{Kara}} walks up to the checkpoint and hands over her ID.'}
    if(s.ch32klMinutes>=KL_RULES.detourMinutes){klSpend(s,KL_RULES.detourMinutes);return 'They take the long way round (DELAYED) and reach the terminal with '+s.ch32klMinutes+' minute'+(s.ch32klMinutes===1?'':'s')+' to spare.'}
    s.ch32klMinutes=0;s.late=true;return 'They take the long way round (DELAYED). The detour takes too long: LATE FOR THE BUS.';
   case 'KL05':case 'KL06':return '';
   case 'KL07':return opt.outcome+' Soldier: “Sorry, Miss, but we got to be careful. There are deviants around and our guys are nervous… You should hurry on home.”';
   case 'K32':
    if(choice==='0'){h.alice(-1);return (L?'{{Kara}}: “Do it!” LUTHER SHOOTS GUARDS.':'{{Kara}} draws the gun and shoots the soldier and his partner (SHOOTS GUARDS).')+' ALICE FINDS HER GLOVE: {{Alice}} picks it up from the ground. “He just wanted to give me back this…”'}
    if(L)return '{{Kara}}: “Don’t do anything, {{Luther}}. You hear me?” {{Luther}}: “They’re gonna shoot! They’re gonna kill {{Alice}}!”';
    return 'GUARD RETURNS ALICE’S GLOVE: Soldier: “You dropped this.” {{Alice}}: “Thank you.” Soldier: “You’re welcome…”';
   case 'KL08':if(choice==='0')h.alice(-1);else h.luther(1);return '';
   case 'KL09':return '';
   case 'KL10':h.alice(-1);if(L)h.luther(-1);s.ch32kl.terminal=true;return '';
   case 'KL11':return '';
   case 'K24':if(choice==='0'){h.alice(1);if(L)h.luther(-1);s.ch32klTickets='returned';s.ch32kl.terminal=true}return '';
   case 'KL12':if(choice==='0'){s.ch32klTickets='returned';s.ch32kl.terminal=true}else{h.alice(-1);if(L)h.luther(1);s.ch32klTickets='kept'}return '';
   case 'KL13':s.karaRoute='border';s.bus=true;return opt.outcome+' The bus pulls out of the city.';
   case 'KL14':
    if(choice==='0'){s.ch32kl.terminal=false;s.ch32kl.security=true;return opt.outcome}
    if(choice==='1'){klDone(s,n,'1');s.ch32kl.todd='met';return 'Someone grabs {{Kara}}’s arm.'}
    if(choice==='2'){klDone(s,n,'2');return opt.outcome}
    s.ch32kl.terminal=false;s.karaRoute='river';s.ch32kl.riverVia='adam';return 'FIND ADAM: {{Kara}} heads for the parking-lot entrance.';
   case 'K23':
    if(choice==='5'){s.ch32kl.todd='persuaded';return opt.outcome+' TODD SENDS SOLDIERS AWAY.'}
    s.ch32kl.todd='failed';s.ch32kl.terminal=false;{const t=opt.outcome+' Soldier: “Excuse me, is there a problem, sir?” {{Todd}}: “They’re androids.” (FAIL TO PERSUADE TODD; SOLDIERS ARRIVE FOR SECURITY CHECK)';
     if(L){s.luther=false;s.lutherWith=false;s.ch32kl.lutherLost='diversion';s.karaRoute='river';s.ch32kl.riverVia='diversion';return t+' {{Luther}}: “Run!” LUTHER CREATES A DIVERSION, throwing himself at the soldiers. ADAM CALLS OUT TO KARA.'}
     klDie(s,{},KL_END.executed,'{{Todd}} gave {{Kara}} and {{Alice}} away at the bus terminal; the soldiers executed them.');
     return t+' Soldier: “Check ’em.” Soldier: “ON YOUR KNEES!” {{Alice}}: “I love you… Mom…” {{Kara}}: “I love you too.” SOLDIERS EXECUTED KARA & ALICE.'}
   case 'KL15':s.ch32kl.todd='done';return opt.outcome;
   case 'KL16':s.ch32kl.security=false;
    if(choice==='0'){s.luther=false;s.lutherWith=false;s.ch32kl.lutherLost='diversion';s.karaRoute='river';s.ch32kl.riverVia='diversion';return opt.outcome+' {{Luther}} throws himself at the soldiers (ASK LUTHER TO CREATE DIVERSION). ADAM CALLS OUT TO KARA.'}
    {const withL=L;klDie(s,{luther:withL},withL?KL_END.executedLuther:KL_END.executed,withL?'At the terminal’s security check the soldiers executed {{Kara}}, {{Alice}} and {{Luther}}.':'At the terminal’s security check the soldiers executed {{Kara}} and {{Alice}}.');
     return opt.outcome+(choice==='2'?' Soldier: “Stop right there! ON YOUR KNEES!”':'')+' '+(withL?'SOLDIERS EXECUTED KARA, ALICE & LUTHER.':'SOLDIERS EXECUTED KARA & ALICE.')}
   case 'KL17':return '';
   case 'KL18':s.ch32kl.borderOpen=true;s.ch32kl.borderMode='roam';s.ch32kl.queue=0;return '';
   case 'KL19':{
    let t;
    if(choice==='14'){s.ch32kl.borderOpen=false;return 'GET BACK IN LINE: {{Kara}} goes back to her place. The line moves up to the desk (AT BORDER DESK).'}
    if(choice==='0')t='SEE NEWS BULLETIN: '+(s.movement==='demonstration'?'the screens show the androids demonstrating peacefully outside a camp (ANDROIDS DEMONSTRATING). Woman in the line: “They’re peaceful… Maybe we should listen to them? Maybe they’re alive, after all…”':'the screens show androids charging a camp (ANDROIDS CHARGING THE CAMP). Woman in the line: “They’re violent… We have to destroy them before they kill us all…”');
    else if(choice==='9')t='{{Kara}}: “What’s happening with {{Markus}}?” '+(s.movement==='demonstration'?'{{Rose}}: “He’s protesting peacefully outside one of the android camps… Whatever happens now, he’s already made the history books…”':'{{Rose}}: “He’s attacking one of the android camps as we speak. I don’t know if he’ll be successful… but violence only leads to violence…”');
    else if(choice==='11')t=klAdam(s);
    else if(choice==='4')t=(klLuther(s)?'{{Kara}}, to {{Luther}}: “Wait for me. I won’t be long.” ':'')+opt.outcome;
    else t=opt.outcome;
    if(choice==='2')s.ch32kl.boardChecked=true;if(choice==='3')s.ch32kl.sawRose=true;if(choice==='4')s.ch32kl.borderMode='rose';
    if(choice==='10'){s.ch32kl.borderMode='roam';s.ch32kl.restroomDone=true;klDone(s,n,'5','6','7','8','9','10')}
    klDone(s,n,choice);s.ch32kl.queue++;
    if(s.ch32kl.queue===KL_RULES.executionAfter)t+=' Then, at the very front of the line, a passenger fails the temperature check; soldiers drag the android out and shoot it (ANDROID IS EXECUTED).';
    if(s.ch32kl.queue>=KL_RULES.queueActions&&s.ch32kl.borderMode==='roam'){s.ch32kl.borderOpen=false;t+=' The line has reached the desk (AT BORDER DESK).'}
    return t}
   case 'K25':{
    s.ch32kl.borderOpen=false;
    if(choice==='0'){s.kara=false;s.border=true;
     if(L){X.ending(s,'Kara',KL_END.withLuther);s.karaOutcome='{{Kara}} gave herself up at the border so that {{Alice}} could cross into {{Canada}} with {{Luther}}.';
      return '{{Kara}}: “{{Alice}}, I… I can’t go any further with you…” {{Alice}}: “What?.. But you-” {{Kara}}: “There’s no other way... Listen, I... I want you to go with {{Luther}}… He’ll protect you… He’ll get you across the border… {{Rose}} will take care of you there… Here’s your passport… You’re the best thing that ever happened to me, {{Alice}}… You made me feel alive.” {{Alice}}: “I love you...” At the desk the soldiers seize {{Kara}}: “Hands up! On your knees! Now!” Guard: “Next, please. ID.” {{Luther}}: “Here…” Guard: “Goddamn androids. You okay, little girl? Welcome to {{Canada}}.” LUTHER GETS THROUGH WITH ALICE. On the other side, {{Luther}}: “It’s all over, {{Alice}}. We’re free.”'}
     X.ending(s,'Kara',KL_END.withRose);s.karaOutcome='{{Kara}} gave herself up at the border so that {{Alice}} could cross into {{Canada}} with {{Rose}}.';
     return '{{Kara}}: “{{Alice}}, I… I can’t go any further with you…” {{Alice}}: “Please! Please, don’t leave me…” {{Kara}}: “There’s no other way, {{Alice}}… Listen, I… I want you to go with {{Rose}}… She’ll give you the life I never could… Here’s your passport…” {{Alice}}: “I love you...” At the desk the soldiers seize {{Kara}}: “Hands up! On your knees! Now!” {{Rose}}: “No…” Guard: “Next, ID.” {{Rose}}: “Here…” Guard: “Welcome to {{Canada}}.” ROSE COLLECTS ALICE. On the other side, {{Rose}}: “We made it, {{Alice}}. You’re safe now.”'}
    if(choice==='1'){h.alice(-1);s.luther=false;s.lutherWith=false;s.border=true;X.ending(s,'Kara',KL_END.pair);s.karaOutcome='{{Luther}} gave his life at the border as a diversion; {{Kara}} and {{Alice}} crossed into {{Canada}}.';
     return '{{Luther}}: “You’re gonna have to go on without me, {{Alice}}. I’m so lucky to have met you... Take good care of {{Kara}}... You’ll be happy together. I’m gonna need your help with something, ok? Don’t be scared,” He seizes {{Alice}}: “LET ME THROUGH! LET ME THROUGH OR I’LL SHOOT!” Soldier: “Drop your weapon! Drop it right now!” {{Luther}}: “Don’t forget me, {{Alice}}…” The soldiers shoot him (LUTHER SACRIFICES HIMSELF TO CREATE DIVERSION). Guard: “Next, please. ID. Goddamn androids. To grab a little girl like that. You okay, little girl? Welcome to {{Canada}}.” On the other side, {{Kara}}: “It’s over, {{Alice}}. We’re free.”'}
    if(choice==='2'){h.alice(-1);s.jerry=false;s.border=true;const g=L;if(g)h.luther(1);X.ending(s,'Kara',g?KL_END.group:KL_END.pair);s.karaOutcome=g?'{{Jerry}} drew the guards at the border; {{Kara}}, {{Alice}} and {{Luther}} crossed into {{Canada}}.':'{{Jerry}} drew the guards at the border; {{Kara}} and {{Alice}} crossed into {{Canada}}.';
     return 'Guard: “Next please. ID. Is she all right?” Soldier: “HEY YOU!” {{Jerry}} runs at the soldiers and is cut down (JERRY SACRIFICES HIMSELF TO CREATE DIVERSION). Soldier: “Jesus Christ, those things are fucking nuts!” Guard: “Hey. No need to be scared anymore little girl. There are no androids on this side of the border. Welcome to {{Canada}}.” On the other side, {{Kara}}: “It’s over, {{Alice}}. We’re free.”'}
    h.alice(1);if(L)h.luther(1);
    if(s.movement==='demonstration'){s.border=true;X.ending(s,'Kara',L?KL_END.group:KL_END.pair);s.karaOutcome=L?'The guard, watching the peaceful protest, let {{Kara}}, {{Alice}} and {{Luther}} into {{Canada}}.':'The guard, watching the peaceful protest, let {{Kara}} and {{Alice}} into {{Canada}}.';
     return opt.outcome+' The guard glances at the news of the peaceful protest (GUARD SEES MARKUS PROTESTING) and looks at them a long moment. Guard: “Welcome to {{Canada}}.” GUARD LETS THEM PASS. On the other side, {{Kara}}: “It’s over, {{Alice}}. We’re free.”'}
    klDie(s,{luther:L},KL_END.arrestedKilled,'At the border, with androids attacking the camps on every screen, the guards arrested and executed {{Kara}}, {{Alice}}'+(L?' and {{Luther}}.':'.'));
    return opt.outcome+' The guard has the attack on the camp on his screen (GUARD SEES MARKUS ATTACKING THE CAMP). Guard: “They’re androids.” Soldier: “ON YOUR KNEES!”'+(L?' {{Luther}}: “No, don’t hurt them!” {{Alice}}: “{{LUTHER}}!”':'')+' {{Kara}}: “I’m sorry, {{Alice}}…” {{Alice}}: “I love you, {{Kara}}…” {{Kara}}: “I love you too…” EVERYONE WAS ARRESTED AND KILLED.'}
   case 'KL20':s.ch32kl.riverbank=true;return '';
   case 'KL21':
    if(choice==='3'){s.ch32kl.riverbank=false;return opt.outcome+' {{Kara}} and {{Alice}} push the boat off.'}
    klDone(s,n,choice);
    if(choice==='0')return (klLuther(s)?'{{Luther}}: “We better not fall in… Our biocomponents will freeze…”':'{{Kara}}: “We better not fall in... Our biocomponents will freeze…”')+' Her display reads DANGER TEMPERATURE : 30.8°F.';
    if(choice==='2')return klAdam(s);
    return opt.outcome;
   case 'KL22':return '';
   case 'K26':{
    const aboard=klLuther(s);
    if(choice==='3'||choice==='6'){klDie(s,{luther:aboard},KL_END.groupDied,'The coastguard shot everyone in the boat on the river.');return opt.outcome+' COASTGUARD OPENS FIRE. THE GROUP DIED.'}
    if(choice==='0'||choice==='2')s.aliceWounded=true;if(choice==='1')s.karaWounded=true;
    let t=opt.outcome+' COASTGUARD OPENS FIRE.'+(choice==='0'||choice==='2'?' ALICE IS INJURED.':choice==='1'?' KARA IS INJURED.':'');
    if(aboard){s.luther=false;s.lutherWith=false;s.lutherOnBoat=true;t+=' LUTHER DIED'+(choice==='4'?': {{Luther}}: “You’re gonna have to continue the journey without me... You’re the most extraordinary person I’ve ever met, {{Alice}}... I was a machine… You made me part of a family. Take good care of {{Kara}}… You promise me?” {{Alice}}: “{{Luther}}…”':choice==='2'?': {{Alice}}: “They killed him! They killed {{Luther}}…”':choice==='1'?': {{Alice}}: “{{Luther}}! {{Luther}}…”':'.')}
    s.ch32kl.boat=true;s.ch32klBoatMinutes=KL_RULES.boatMinutes;
    return t+' {{Kara}}: “The boat is leaking! We’re too heavy… We’re going down…”'}
   case 'K34':{
    if(choice==='6'){s.ch32kl.boat=false;s.border=true;
     if(s.karaWounded&&s.aliceWounded){klDie(s,{},KL_END.bothDied,'{{Kara}} pushed the boat to the far shore with {{Alice}}, but both were wounded and neither survived.');return opt.outcome+' REACH CANADA ON BOAT. {{Kara}}: “We made it, {{Alice}}! Wake up... We’re free! I love you, {{Alice}}…” Neither of them gets up again.'}
     if(s.karaWounded){X.ending(s,'Kara',KL_END.karaDied);s.kara=false;s.karaOutcome='{{Kara}} pushed {{Alice}} to the far shore and died of her wound and the cold; {{Alice}} reached {{Canada}}.';
      return opt.outcome+' REACH CANADA ON BOAT. {{Alice}}: “{{Kara}}… We’re free… We did it! We did it! We can live a normal life… We won’t have to hide anymore… We’re gonna be a family!” {{Kara}}: “{{Alice}}, I... I can’t go with you…” {{Alice}}: “What? But, why? I don’t want you to leave me... {{Kara}}, you promised!” {{Kara}}: “I love you more than anything… I know you’ll be happy… without me…” KARA IS DAMAGED AND SHUTS DOWN. KARA DIED AND ALICE SURVIVED.'}
     if(s.aliceWounded){s.alice=false;s.ch32kl.aliceShutDown=true;return opt.outcome+' REACH CANADA ON BOAT. On the far shore, {{Alice}} is fading: ALICE IS DAMAGED AND SHUTS DOWN.'}
     X.ending(s,'Kara',KL_END.survived);s.karaOutcome='{{Kara}} and {{Alice}} crossed the river and reached {{Canada}}.';
     return opt.outcome+' REACH CANADA ON BOAT. {{Kara}}: “We’re free, {{Alice}}! We’re free! {{Alice}}? Wake up... Wake up! {{Alice}}!” {{Alice}}: “Are we there?” {{Kara}}: “Yes… We made it…” {{Alice}}: “I love you, {{Kara}}…” {{Kara}}: “I love you too… I love you too…” KARA & ALICE SURVIVED.'}
    klDone(s,n,choice);let t=opt.outcome;
    if(choice==='5')s.ch32kl.engineGone=true;
    if(!s.ch32kl.lightened){
     s.ch32klBoatMinutes--;
     const gone=k=>s.ch32kl.done['K34:'+k];
     if(gone('3')&&(!s.lutherOnBoat||gone('4'))){s.ch32kl.lightened=true;return t+' BOAT LIGHTENED: the boat rides higher in the water.'}
     if(s.ch32klBoatMinutes<=0){s.ch32kl.boat=false;klDie(s,{},KL_END.bothDied,'The boat sank in the freezing river before {{Kara}} could lighten it; {{Kara}} and {{Alice}} drowned.');return t+' It is too late: the boat goes under. REACH CANADA BY SWIMMING: in the freezing water neither of them makes it. KARA & ALICE DIED.'}
     return t+` The water keeps rising: about ${s.ch32klBoatMinutes} minute${s.ch32klBoatMinutes===1?'':'s'} before she sinks.`}
    return t}
   case 'K30':
    if(choice==='0'){X.ending(s,'Kara',KL_END.alone);s.karaOutcome='{{Alice}} died of her wound on the far shore; {{Kara}} chose to keep living, alone.';return opt.outcome+' ALICE DIED AND KARA CONTINUED ALONE.'}
    X.ending(s,'Kara',KL_END.bothDied);s.kara=false;s.karaOutcome='{{Alice}} died of her wound on the far shore, and {{Kara}} chose to die with her.';return opt.outcome+' KARA CHOOSES DEATH. KARA & ALICE DIED.';
  }
 },
};
// ==== END PART: kara-leaving ====

// ==== PART: markus-demo ====
// Markus Demonstration (chart 04A.MB, template 32.5): plays when Markus leads and chose the demonstration in Night of the
// Soul. MD01–MD05 the march, the roadblock talk and the volley; MD06 the barricade item; R32m the magazine; MD07 the HOLD
// BARRICADE free roam (sub-menus for the scared android and North, mode `ch32mdMode`); MD08/MD09 Perkins' approach
// (ACCEPT/REFUSE twice); M28 the talk with Perkins (four questions and ACCEPT DEAL / REFUSE DEAL); accepted: MD11, MD12,
// MD13 (a machine Connor confirms the leader's death); refused: MD14 the attack, MD15 the quick-time defence, MD16 the
// corner, M31 the last stand (DIRTY BOMB opens PRESS / GIVE UP, mode `ch32mdStandMode`).
// Arrows (small = 1, large = 2): PEACEFUL/FIRM(1st)/CALM opinion +1, PROVOKE/ACCUSE −1 (option effects, template);
// the volley opinion +2 (MD03 effect, wiki); Josh +1 for finishing the barricade (stat page); slogans opinion +1 and Jericho
// +1 (template); the flag opinion +1 and Jericho +1 (wiki); ACCEPT DEAL Josh −1, Simon −1 (template), North −1 (stat page);
// the speech after a refusal Jericho +1 (wiki); the song or kiss with a positive opinion: opinion +2 (Public Opinion page).
// Endings (ch32MarkusEnding): MARKUS DIED AFTER BETRAYING HIS PEOPLE, MARKUS DIED PROTECTING HIS PEOPLE, ANDROIDS WON
// FREEDOM - FOR THE MOMENT, MARKUS DIED WITH HIS PEOPLE, ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT.
const MD_END={betrayed:'MARKUS DIED AFTER BETRAYING HIS PEOPLE',protecting:'MARKUS DIED PROTECTING HIS PEOPLE',won:'ANDROIDS WON FREEDOM - FOR THE MOMENT',withPeople:'MARKUS DIED WITH HIS PEOPLE',bomb:'ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT'};
const MD_IDS=['MD01','MD02','MD03','MD04','MD05','MD06','R32m','MD07','MD08','MD09','M28','MD11','MD12','MD13','MD14','MD15','MD16','M31'];
const mdDemo=s=>s.movement==='demonstration'&&X.markusLeads(s);
const mdNot='Markus is not leading a demonstration.';
// The companions who stand with Markus at the end, for the joins and the deaths.
const mdWith=s=>['north','josh','simon'].filter(k=>s[k]);
const mdName={north:'{{North}}',josh:'{{Josh}}',simon:'{{Simon}}'};
const mdList=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a.at(-1);
// Everyone at the barricade dies with Markus.
const mdAllDie=(s,ending,why)=>{const dead=mdWith(s);for(const k of dead)s[k]=false;s.markus=false;s.ch32md.stand=false;X.ending(s,'Markus',ending);
 s.markusOutcome=why+(dead.length?' '+mdList(dead.map(k=>mdName[k]))+' died with him.':'');return dead};
const MARKUS_DEMO={ids:MD_IDS,
 state:{"ch32mdBarricade":null,"ch32mdDeal":null,"ch32md":{"mode":null,"done":{},"hold":false,"talk":false,"topics":{},"refusal":null,"dismantled":false,"stand":false,"standMode":null,"gaveUp":false}},
 labels:{ch32mdBarricade:'Barricade item',ch32mdDeal:'Perkins’s deal',ch32LastStand:'The last stand'},
 rules:{MD_END},
 gate:{
  MD01:s=>mdDemo(s)||mdNot,MD02:s=>mdDemo(s)||mdNot,MD03:s=>mdDemo(s)||mdNot,MD04:s=>mdDemo(s)||mdNot,MD05:s=>mdDemo(s)||mdNot,MD06:s=>mdDemo(s)||mdNot,
  R32m:s=>mdDemo(s)||mdNot,MD07:s=>mdDemo(s)&&s.ch32md.hold||mdNot,MD08:s=>mdDemo(s)||mdNot,
  MD09:(s,h)=>mdDemo(s)&&h.c('MD08')==='1'||'Markus agreed to hear Perkins out the first time.',
  M28:s=>mdDemo(s)&&s.ch32md.talk||'Markus did not go out to hear Perkins.',
  MD11:s=>mdDemo(s)&&s.ch32mdDeal==='accepted'||'Markus did not accept Perkins’s deal.',
  MD12:s=>mdDemo(s)&&s.ch32md.dismantled||'Markus did not accept Perkins’s deal.',
  MD13:s=>s.ch32MarkusEnding===MD_END.betrayed&&X.machineConnor(s)||'No machine Connor comes to confirm the deviant leader’s death.',
  MD14:s=>mdDemo(s)&&s.ch32mdDeal==='refused'||'Markus did not turn Perkins down.',
  MD15:s=>mdDemo(s)&&s.ch32mdDeal==='refused'||'Markus did not turn Perkins down.',
  MD16:s=>mdDemo(s)&&s.ch32mdDeal==='refused'||'Markus did not survive the attack on the barricade, or never refused Perkins.',
  M31:s=>mdDemo(s)&&s.ch32md.stand||'Markus is not cornered with his people.'},
 available(n,s,opts,h){
  if(n.id==='MD07')return opts.filter(o=>!s.ch32md.done[o.id]);
  if(n.id==='M28')return X.fromOptions(n,s,h,o=>!s.ch32md.topics[o.id]);
  if(n.id==='MD12')return opts.filter(o=>!(o.id==='1'&&s.ch32md.done.dismantledNorth));
  if(n.id==='M31')return X.fromOptions(n,s,h);
 },
 consequence(n,s,opt,choice,fail,h){
  const v=Number(choice),done=k=>{s.ch32md.done={...s.ch32md.done,[k]:true}};
  switch(n.id){
   case 'MD01':s.ch32MarkusChart='demonstration';return '';
   case 'MD06':{s.ch32mdBarricade=['billboard','bench','car'][v];s.ch32md.hold=true;s.ch32md.mode='free';s.ch32md.done={};
    const t=[opt.outcome];if(s.simon)t.push('{{Simon}}: “We all know that’s not gonna stop them… Just hope it buys us some time.”');
    if(s.josh){h.josh(1);t.push('{{Josh}}: “I know it was not an easy decision to make… But I’m sure we’re doing the right thing.”')}
    return t.join(' ')}
   case 'MD07':
    if(v===0){h.po(1);h.jer(1);done('0');return ''}
    if(v===1){s.ch32md.mode='scared';return ''}
    if(v===3){s.ch32md.mode='north1';return ''}
    if(v===4){h.po(1);h.jer(1);done('4');return ''}
    if(v===5){done('5');s.ch32md.hold=false;s.ch32md.mode=null;const who=s.josh?'{{Josh}}':s.simon?'{{Simon}}':null;let t=opt.outcome;
     if(who){t+=' '+who+': “They won’t stop there… What are we gonna do if they attack?” You: “Resist… That’s the only thing we can do...”';
      if(s.ch32ConnorChart==='tower'||(s.ch32ConnorChart==null&&s.deviant&&s.connor))t+=' '+who+': “Do you think {{Connor}} has any chance of making it?..” You: “We can only count on ourselves now…”'}
     return t+' Then, across the open ground, someone is coming toward the barricade.'}
    if(v>=8&&v<=10){done('1');s.ch32md.mode='free';return ''}
    if(v>=11&&v<=13){s.ch32md.mode='north2';return ''}
    if(v>=14&&v<=17){done('3');s.ch32md.mode='free';return opt.outcome+' {{North}}: “You’re the hope of our people. I trust you. We all trust you. No matter what happens now, we’re making history.”'}
    done(choice);return '';
   case 'MD08':case 'MD09':
    if(v===0){s.ch32md.talk=true;s.ch32md.topics={};const who=s.north?'{{North}}':s.simon?'{{Simon}}':s.josh?'{{Josh}}':'An android';
     return opt.outcome+' '+who+': “What if they kill you?” You: “That’s a chance I’ll have to take.” You climb over the barricade and walk out to meet {{Perkins}}.'}
    if(n.id==='MD09'){s.ch32mdDeal='refused';s.ch32md.refusal='talk'}
    return '';
   case 'M28':
    if(v<=3){s.ch32md.topics={...s.ch32md.topics,[choice]:true};
     if(v===2&&X.northLover(s))return 'You: “I’m not afraid to die. If I have to give my life for what I believe in, then I won’t have lived in vain.” {{Perkins}}: “That android… You seem to really care about her… You don’t want her to die, do you? You know, you could both be free. You could forget about all this, you could... start a new life some place else, just the two of you… Her life is in your hands, {{Markus}}. Just say the word and she’ll be spared.”';
     return ''}
    s.ch32md.talk=false;
    if(v===4){s.ch32mdDeal='accepted';if(s.josh)h.josh(-1);if(s.simon)h.simon(-1);if(s.north)h.north(-1);return ''}
    s.ch32mdDeal='refused';s.ch32md.refusal='deal';return '';
   case 'MD11':s.ch32md.dismantled=true;return '';
   case 'MD12':
    if(v===1){done('dismantledNorth');return ''}
    {s.ch32md.dismantled=false;const north=s.north;s.north=false;s.markus=false;X.ending(s,'Markus',MD_END.betrayed);
     s.markusOutcome='{{Markus}} accepted {{Perkins}}’s deal; {{Perkins}} broke his word and had '+(north?'{{North}} and ':'')+'{{Markus}} shot while the androids were taken away to be destroyed.';
     return opt.outcome+(north?' He draws a gun and shoots {{North}} in the head. You: “No! NORTH!”':'')+' A soldier shoots you in the chest and you fall. {{Perkins}}: “Your cause is lost. Your android friends will soon be destroyed'+(north?' and now your girlfriend’s been shot':'')+'… Seems you seriously fucked up, {{Markus}}.” The last shot is to your head. {{Perkins}}: “Clean up this mess.” Ending: MARKUS DIED AFTER BETRAYING HIS PEOPLE.'}
   case 'MD14':h.jer(1);return '';
   case 'MD15':
    if(v===0&&!fail){s.ch32md.stand=false;return 'You drag the fleeing androids to cover through the gunfire. SAVE FLEEING ANDROIDS.'}
    if(X.northLover(s)){s.north=false;return (v===0?'You are too slow; a soldier has you in his sights. ':'A soldier has you in his sights. ')+'You: “NORTH!” {{North}} throws herself in front of you and takes the bullet. {{North}}: “{{Markus}}, no!” You: “{{North}}! Why? {{North}}…” {{North}}: “I couldn’t live without you…” She dies in your arms. FAIL TO SAVE ANDROIDS: NORTH TAKES A BULLET FOR MARKUS.'}
    s.markus=false;X.ending(s,'Markus',MD_END.protecting);s.markusOutcome='{{Markus}} was shot dead defending the barricade when the army attacked the demonstration.';
    return (v===0?'You are too slow. ':'The soldiers reach the barricade. ')+'FAIL TO SAVE ANDROIDS: a soldier shoots you down. MARKUS SHOT. Ending: MARKUS DIED PROTECTING HIS PEOPLE.';
   case 'MD16':{s.ch32md.stand=true;s.ch32md.standMode='stand';const w=mdWith(s).map(k=>mdName[k]);
    return (w.length?mdList(w)+(w.length>1?' join':' joins')+' you. ':'')+'The soldiers raise their weapons.'}
   case 'M31':{
    if(v===0){s.ch32md.standMode='bomb';return ''}
    if(v===5){s.ch32md.standMode='stand';s.ch32md.gaveUp=true;return ''}
    if(v===6){s.ch32md.stand=false;s.ch32LastStand='bomb';s.contaminated=true;X.ending(s,'Markus',MD_END.bomb);
     s.markusOutcome='{{Markus}} detonated the dirty bomb; the soldiers retreated from the contaminated city and the androids claimed it.';
     return 'You press the detonator. AN EXPLOSION SHAKES {{DETROIT}}: far off across the city a fireball rises. The soldiers lower their rifles, then fall back. SOLDIERS RETREAT. Ending: ANDROIDS BECAME FREE IN THE DEBRIS OF {{DETROIT}}.'}
    s.ch32LastStand=['','kiss','sing','sacrifice','nothing'][v];
    if((v===1||v===2)&&X.opinionSympathetic(s,h)){s.ch32md.stand=false;h.po(2);s.ch32DemoSucceeded=true;s.markusOutcome='liberated';X.ending(s,'Markus',MD_END.won);
     return opt.outcome+' PUBLIC REACTS TO THE ANDROIDS’ LAST STAND. President {{Warren}}: “Tell them to stand down.” '+(v===2?'On the news: “…it looks like… Yes, the military is withdrawing…” ':'The soldiers lower their rifles and withdraw. ')+'PRESIDENT ORDERS SOLDIERS NOT TO SHOOT. Ending: ANDROIDS WON FREEDOM - FOR THE MOMENT.'}
    const why=v===3?'{{Markus}} set himself on fire in front of the soldiers, who then fired on the androids at the barricade.':v===4?'{{Markus}} stood and waited with his people; the soldiers fired.':v===1?'{{Markus}} kissed {{North}} in front of the guns; the soldiers fired.':'The androids sang in the face of the soldiers; the soldiers fired.';
    mdAllDie(s,MD_END.withPeople,why);
    return opt.outcome+(v===2?' A soldier: “FIRE!”':'')+' SOLDIERS FIRE. Ending: MARKUS DIED WITH HIS PEOPLE.'}
  }
 }};
// ==== END PART: markus-demo ====

// ==== PART: markus-rev ====
// Markus Revolution (chart 04A.MA, template 32.6), including NORTH IN HART PLAZA. Played when movement is 'revolution':
// Markus leads (MR01…MR12, with the reused ids M30a M30 M32 M30c P02 M29 M33) or, with Markus dead or gone and North
// alive, North leads (MR13, MR14). Arrows (small = 1, large = 2):
//  - MR01 the message: public opinion −2 (wiki Public Opinion: "after Markus sends the humans a message").
//  - M30 SAVE SIMON: Simon +2 (template). M32 SACRIFICE NORTH and MR05 Simon's heart: Jericho −1 each (template).
//  - ASSAULT WAS SUCCESSFUL: Jericho +2, North +2 if alive, Simon +2 if he was saved (wiki; stat page).
//  - MR10 assault failed: North −1 (if alive), Jericho −2 (template).
//  - MR11 SPARE: Amanda −2 (template). Machine Connor kills Markus (P02, MR11 SHOOT): Amanda +2 (endings template,
//    Cyberlife ending "Machine Connor stopped Markus"; wiki chapter page "Connor stays a machine and the uprising fails").
//  - MR12 KISS: North +1; SURRENDER: North −1 (template). MR13 North's flag: public opinion −2 (wiki, "if Markus is dead").
// The assault's PROBABILITY OF SUCCESS gauge (`ch32mrGauge`, reader-reported figures) is a hidden budget: it starts at
// 45 at the crossroad (40 if Markus was hit in the charge); Markus hit −5, an optional action −5 (−10 for carrying Josh),
// an android killed −10, the grenade +10. At 0 the androids
// fall back. The attack on the machine gun rolls a risk set by the gauge.
const MR_START=45,MR_BADLY=3;
const MR_ODDS=g=>g>=40?'good':g>=25?'even':g>=10?'slipping':'failing';
const MR_RISK=g=>g>=40?0.15:g>=25?0.3:g>=10?0.45:0.6;
const MR_ODDS_TEXT={good:' The assault’s chances look good.',even:' The assault hangs in the balance.',slipping:' The assault is slipping away.',failing:' The assault is on the verge of collapse.'};
const mrGauge=(s,d)=>{s.ch32mrGauge=Math.max(0,Math.min(100,s.ch32mrGauge+d));s.ch32mr.odds=MR_ODDS(s.ch32mrGauge);if(s.ch32mrGauge<=0){s.ch32mr.fallBack=true;s.ch32mr.bracket=false;s.ch32mrAttack='unsuccessful'}};
const mrOdds=s=>s.ch32mr.fallBack?' The androids’ lines break; the assault has failed.':MR_ODDS_TEXT[s.ch32mr.odds]??'';
const mrHit=(s,h)=>{h.markusHit();if(typeof s.ch32mrGauge==='number')mrGauge(s,-5)};
// The chart in play is the Markus-led revolution, Markus leads and no ending card has been reached.
const mrRev=s=>s.ch32MarkusChart==='revolution'&&X.markusLeads(s)&&!s.ch32MarkusEnding;
const mrOn=s=>mrRev(s)&&!s.ch32mr.fallBack&&s.ch32mrAttack!=='unsuccessful'&&s.ch32mrAttack!=='successful';
const mrWon=s=>mrRev(s)&&s.ch32mrAttack==='successful';
const mrSimonFriend=s=>s.simon&&s.simonTrust>=THRESHOLDS.SIMON_FRIEND;
const mrEnd=(s,label,outcome)=>{X.ending(s,'Markus',label);s.markusOutcome=outcome};
const mrNorthOutcome=(s,t)=>{const p=s.markusOutcome;s.markusOutcome=(p&&p!=='unresolved'&&p!=='liberated'?p+' ':'')+t};
const mrConnorGone=(s,h,why)=>{h.bump('connorDeaths',1);h.si(-1);s.connor=false;s.connorOutcome=why};
const mrSuccess=(s,h)=>{h.jer(2);if(s.north)h.north(2);if(s.ch32mrSimonSaved&&s.simon)h.simon(2);s.ch32AssaultSucceeded=true;s.markusOutcome='liberated';X.ending(s,'Markus','ASSAULT WAS SUCCESSFUL');
 const line=s.north?'{{North}}: “The humans are abandoning the camp. We did it, {{Markus}}!.. We won!”':s.simon?'{{Simon}}: “The humans are abandoning camp!.. We did it, {{Markus}}. We won!”':'Android: “The humans are abandoning the camp! We did it, {{Markus}}, we’ve won!”';
 return ' {{Markus}} turns a captured weapon on the tanks at the gates and destroys them. '+line+' {{Markus}}: “This is not a victory. It’s the beginning of a war.” ASSAULT WAS SUCCESSFUL.'};
const MR_IDS=['MR01','MR02','MR03','M30a','MR04','M30','M32','MR05','MR06','M30c','MR07','MR08','P02','MR09','MR10','MR11','M29','M33','MR12','MR13','MR14'];
const MARKUS_REV={ids:MR_IDS,
 state:{"ch32mrGauge":null,"ch32mrAttack":null,"ch32mrSimonSaved":false,"ch32mrHeart":null,"ch32mrStore":null,"ch32mr":{"odds":null,"bracket":false,"mode":"main","done":{},"fallBack":false,"simonEvent":false,"drone":false,"chargeHit":false,"connorChoice":null,"northStoreOpen":false,"northMode":"main","northDone":{},"endingCard":null}},
 labels:{ch32mrGauge:'Revolution: probability of success (%)',ch32mrAttack:'Revolution: the attack on the machine gun',ch32mrSimonSaved:'Revolution: Simon saved',ch32mrHeart:'Revolution: the heart offered to Markus',ch32mrStore:'Revolution: who took shelter in the store'},
 rules:{revolution:{start:MR_START,badlyWounded:MR_BADLY,risk:MR_RISK,odds:MR_ODDS,deltas:{chargeHit:-5,markusHit:-5,optionalAction:-5,carryJosh:-10,androidKilled:-10,grenade:10}}},
 gate:{
  MR01:s=>s.movement==='revolution'&&X.markusLeads(s)&&!s.ch32MarkusChart||'Markus is not leading a revolution.',
  MR02:s=>mrRev(s)||'Markus is not leading the revolution.',
  MR03:s=>mrRev(s)||'Markus is not leading the revolution.',
  M30a:s=>mrOn(s)&&s.josh||'Josh is not in the assault, or the assault is over.',
  MR04:s=>mrOn(s)||'The assault has collapsed, or Markus is not leading it.',
  M30:s=>mrOn(s)&&s.simon||'Simon is not in the assault, or the assault has collapsed.',
  M32:s=>mrOn(s)&&s.markusHits>=MR_BADLY&&X.northCompanion(s)&&!s.ch32mrHeart||'Markus is not badly wounded with North close enough to offer her heart.',
  MR05:s=>mrOn(s)&&s.markusHits>=MR_BADLY&&!s.ch32mrHeart&&!X.northCompanion(s)&&mrSimonFriend(s)||'Simon is not the one to offer Markus his heart.',
  MR06:s=>mrOn(s)&&s.markusHits>=MR_BADLY&&!s.ch32mrHeart&&!X.northCompanion(s)&&!mrSimonFriend(s)||'Markus is not badly wounded, or someone can save him.',
  M30c:s=>mrOn(s)||'The assault collapsed before the machine gun, or Markus is not leading it.',
  MR07:s=>mrWon(s)&&s.north&&!s.ch32mr.drone||'North’s group is not attacked by the drone.',
  MR08:s=>mrWon(s)||'The assault did not reach the camp.',
  P02:s=>mrWon(s)&&X.machineConnor(s)||'No machine Connor confronts Markus at the camp.',
  MR09:s=>mrWon(s)&&!X.machineConnor(s)||'A machine Connor confronts Markus instead.',
  MR10:s=>mrRev(s)&&(s.ch32mr.fallBack||s.ch32mrAttack==='unsuccessful')&&!s.ch32mrStore||'The assault did not fail.',
  MR11:s=>mrRev(s)&&s.ch32mrStore==='alone'&&X.machineConnor(s)&&!s.ch32mr.connorChoice||'No machine Connor finds Markus alone in the store.',
  M29:s=>mrRev(s)&&!!s.ch32mr.connorChoice&&s.bomb||'Markus does not hold the detonator with Connor in the store.',
  M33:s=>mrRev(s)&&s.ch32mrStore==='alone'&&!X.machineConnor(s)||'Markus is not alone in the store with the soldiers outside.',
  MR12:s=>mrRev(s)&&s.ch32mrStore==='north'||'Markus and North did not take shelter in the store together.',
  MR13:s=>X.northLeads(s)&&s.ch32MarkusChart!=='revolution'&&!s.ch32MarkusEnding||'North is not leading the revolution.',
  MR14:s=>s.ch32MarkusChart==='north'&&s.north&&X.machineConnor(s)&&!s.ch32MarkusEnding||'No machine Connor finds North in the store.',
 },
 available(n,s,opts,h){
  if(!MR_IDS.includes(n.id))return;
  if(n.id==='MR04')return X.fromOptions(n,s,h,o=>!s.ch32mr.done[o.id]);
  if(n.id==='MR12')return X.fromOptions(n,s,h,o=>!s.ch32mr.northDone[o.id]);
  if(n.id==='M30c')return X.fromOptions(n,s,h).map(o=>({...o,risk:MR_RISK(s.ch32mrGauge-(o.id==='1'?10:0))}));
  return X.fromOptions(n,s,h);
 },
 consequence(n,s,opt,choice,fail,h){
  const v=Number(choice),out=opt?.outcome??'';
  switch(n.id){
   case 'MR01':s.ch32MarkusChart='revolution';s.markusHits=0;h.po(-2);return '';
   case 'MR02':if(fail){mrHit(s,h);s.ch32mr.chargeHit=true;return out+' MARKUS WOUNDED: {{Markus}} is hit crossing the plaza, but keeps going.'}return out;
   case 'MR03':s.ch32mrGauge=MR_START-(s.ch32mr.chargeHit?5:0);s.ch32mr.odds=MR_ODDS(s.ch32mrGauge);s.ch32mr.bracket=true;s.ch32mr.mode='main';s.ch32mr.done={};return n.outcomes['0']+mrOdds(s);
   case 'M30a':{s.josh=false;let t=out;if(v===0){mrGauge(s,-10);if(fail){mrHit(s,h);t='{{Markus}} is hit running out to him. '+t}}return t+mrOdds(s)}
   case 'MR04':
    if(v===3){s.ch32mr.bracket=false;return out+mrOdds(s)}
    if(v>=4){s.ch32mr.mode='main';if(v>4)mrGauge(s,-10);return out+mrOdds(s)}
    s.ch32mr.done={...s.ch32mr.done,[choice]:true};
    if(v===0){s.ch32mr.mode='android';mrGauge(s,-5);if(fail){mrHit(s,h);if(s.ch32mr.fallBack)s.ch32mr.mode='main';return '{{Markus}} is hit crossing to him. '+out+mrOdds(s)}}else if(v===1)mrGauge(s,-5);else mrGauge(s,10);
    if(s.ch32mr.fallBack)s.ch32mr.mode='main';
    return out+mrOdds(s);
   case 'M30':{s.ch32mr.simonEvent=true;
    if(v===1){s.simon=false;return out+mrOdds(s)}
    mrGauge(s,-15);
    if(fail){s.simon=false;mrHit(s,h);return out+' {{Markus}} is hit going out for him; {{Simon}} dies before they reach cover. FAIL TO SAVE SIMON.'+mrOdds(s)}
    h.simon(2);s.ch32mrSimonSaved=true;return out+' {{Markus}} pins the shooters down and drags {{Simon}} back to cover. {{Simon}}: “You shouldn’t have saved me, {{Markus}}!.. You sacrificed their lives to save mine…” SAVE SIMON.'+mrOdds(s)}
   case 'M32':
    if(v===0){h.jer(-1);s.north=false;s.markusHits=0;s.ch32mrHeart='north';
     return '{{North}}: “My heart is beating inside your chest… '+(s.northLover?'I’ll always be with you…”':'Now when you’re free, a part of me will always be free with you…”')+' She dies, and {{Markus}} rises with her heart.'}
    s.ch32mrHeart='refused';s.markus=false;s.ch32mr.endingCard=27;mrEnd(s,'MARKUS DIED AND THE REVOLUTION FAILED','{{Markus}} refused {{North}}’s heart and shut down in the street before the camp; without him the revolution failed.');
    return out+(s.northLover?' {{Markus}}: “I love you…”':'')+' {{Markus}} shuts down in her arms. MARKUS DIED AND THE REVOLUTION FAILED.';
   case 'MR05':h.jer(-1);s.simon=false;s.markusHits=0;s.ch32mrHeart='simon';return '';
   case 'MR06':s.ch32mrHeart='nobody';s.markus=false;s.ch32mr.endingCard=27;mrEnd(s,'MARKUS DIED AND THE REVOLUTION FAILED','{{Markus}} was badly wounded in the assault and nobody could save him; without him the revolution failed.');return '';
   case 'M30c':{let t=out;if(v===1){s.north=false;mrGauge(s,-10)}
    if(!fail&&!s.ch32mr.fallBack){s.ch32mrAttack='successful';return t+' The machine gun falls and the way to the camp is open. ATTACK SUCCESSFUL.'}
    s.ch32mrAttack='unsuccessful';s.ch32mr.fallBack=true;return t+' The charge breaks under the machine gun’s fire. ATTACK UNSUCCESSFUL.'}
   case 'MR07':s.ch32mr.drone=true;if(fail){s.north=false;return 'The drone dives into {{North}}’s group before {{Markus}} can bring it down; {{North}} is killed. FAIL TO SHOOT DRONE.'}return out;
   case 'MR08':return n.outcomes['0']+(X.machineConnor(s)?' A machine {{Connor}} steps out of the smoke: “It took me a while to find you, {{Markus}}.”':' Soldiers close in on him where he lies.');
   case 'P02':{const connorWins=v===0?!fail:fail;
    if(connorWins){s.markus=false;s.connorOutcome='A machine {{Connor}} killed {{Markus}} at the gates of the camp and stopped the revolution for {{CyberLife}}.';
     if(v===0){mrEnd(s,'CONNOR STOPPED THE REVOLUTION','A machine {{Connor}} killed {{Markus}} at the gates of the camp and the revolution collapsed.');return out+' {{Connor}} wins the fight and kills {{Markus}}. CONNOR STOPPED THE REVOLUTION.'}
     s.ch32mr.endingCard=58;mrEnd(s,'MARKUS DIED AND THE REVOLUTION FAILED','{{Markus}} lost the fight with a machine {{Connor}} at the gates of the camp; the revolution failed.');return out+' {{Markus}} loses the fight and {{Connor}} kills him. MARKUS DIED AND THE REVOLUTION FAILED.'}
    mrConnorGone(s,h,'{{Markus}} destroyed the machine {{Connor}} at the gates of the camp.');
    return out+' {{Markus}} wins the fight. {{Connor}}: “It’s not over, {{Markus}}… It will never be over…” MARKUS DEFEATS CONNOR.'+mrSuccess(s,h)}
   case 'MR09':if(!fail)return out+mrSuccess(s,h);
    s.markus=false;s.ch32mr.endingCard=58;mrEnd(s,'MARKUS DIED AND THE REVOLUTION FAILED','{{Markus}} was cut down by soldiers at the gates of the camp; the revolution failed.');return 'The soldiers reach {{Markus}} before he can get up and shoot him where he lies. FAIL TO NEUTRALIZE THE SOLDIERS. MARKUS DIED AND THE REVOLUTION FAILED.';
   case 'MR10':{const companion=X.northCompanion(s);
    let t=s.north?'{{North}}: “{{Markus}}, it’s over! We have to get outta here right now! MARKUS!”':s.simon?'{{Simon}}: “{{Markus}}! It’s over! We have to get out of here right now!”':'Android: “{{Markus}}, it’s over! We have to get out of here right now!”';
    if(s.north)h.north(-1);h.jer(-2);
    if(!s.north&&s.simon&&!s.ch32mr.simonEvent){s.simon=false;t+=' {{Simon}} is shot down as they run. SIMON GETS SHOT.'}
    if(s.north&&!companion){s.north=false;t+=' {{North}} is shot down as they run. NORTH GETS SHOT.'}
    if(s.north){s.ch32mrStore='north';s.ch32mr.northStoreOpen=true;s.ch32mr.northMode='main';s.ch32mr.northDone={};return t+' {{Markus}} and {{North}} take shelter in an abandoned {{CyberLife}} store. MARKUS AND NORTH TAKE SHELTER IN STORE.'}
    s.ch32mrStore='alone';return t+' {{Markus}} takes shelter alone in an abandoned {{CyberLife}} store. MARKUS TAKES SHELTER IN STORE.'}
   case 'MR11':
    if(v===2){s.markus=false;mrConnorGone(s,h,'The machine {{Connor}} and {{Markus}} killed each other in the store.');mrEnd(s,'MARKUS AND CONNOR KILLED EACH OTHER','{{Markus}} and a machine {{Connor}} killed each other in an abandoned store after the failed assault.');
     return out+' {{Markus}} lunges for the gun; they fire at the same moment and both fall. MARKUS AND CONNOR KILLED EACH OTHER.'}
    if(v===0){if(s.bomb){s.ch32mr.connorChoice='shoot';return out+' MARKUS IS SHOT. As he falls, his hand closes on the detonator.'}
     s.markus=false;s.connorOutcome='A machine {{Connor}} executed {{Markus}} after the failed assault.';mrEnd(s,'CONNOR EXECUTED MARKUS','A machine {{Connor}} executed {{Markus}} in an abandoned store after the failed assault.');return out+' MARKUS IS SHOT. CONNOR EXECUTED MARKUS.'}
    h.amanda(-2);if(s.bomb){s.ch32mr.connorChoice='spare';return out+' {{Markus}} looks at him, his hand on the detonator.'}
    s.connorOutcome='A machine {{Connor}} found {{Markus}} after the failed assault and spared him, betraying {{Amanda}}.';mrEnd(s,'CONNOR SPARED MARKUS','{{Markus}} survived the failed assault: the machine {{Connor}} who found him spared him.');return out+' {{Connor}} walks away. CONNOR SPARED MARKUS.';
   case 'M29':{const shot=s.ch32mr.connorChoice==='shoot';
    if(v===0){s.contaminated=true;s.markus=false;s.connorOutcome=shot?'A machine {{Connor}} shot {{Markus}}, who set off the dirty bomb as he died.':'A machine {{Connor}} spared {{Markus}}, then shot him as he set off the dirty bomb.';
     mrEnd(s,'MARKUS DIED AS DETROIT BURNS','{{Markus}} set off the dirty bomb as he died in the store; {{Detroit}} was contaminated.');
     return (shot?'Dying, {{Markus}} presses the detonator. ':'{{Markus}} presses the detonator. {{Connor}}: “Shit…” He fires. ')+'An explosion shakes {{Detroit}}. On the news: “…there has just been an explosion in {{Detroit}}…” “It’s… a dirty bomb, Madam President.” MARKUS DIED AS DETROIT BURNS.'}
    if(shot){s.markus=false;s.connorOutcome='A machine {{Connor}} executed {{Markus}} after the failed assault.';mrEnd(s,'CONNOR EXECUTED MARKUS','A machine {{Connor}} executed {{Markus}} in an abandoned store after the failed assault.');return '{{Markus}} lets the detonator go and dies on the floor. CONNOR EXECUTED MARKUS.'}
    s.connorOutcome='A machine {{Connor}} found {{Markus}} after the failed assault and spared him, betraying {{Amanda}}.';mrEnd(s,'CONNOR SPARED MARKUS','{{Markus}} survived the failed assault: the machine {{Connor}} who found him spared him.');return out+' {{Connor}} walks away. CONNOR SPARED MARKUS.'}
   case 'M33':
    if(v===0){s.markus=false;mrEnd(s,'MARKUS COMMITTED SUICIDE','{{Markus}} shot himself in the store rather than be taken after the failed assault.');return out+' MARKUS COMMITTED SUICIDE.'}
    if(v===1){s.markus=false;mrEnd(s,'MARKUS DIED LEAVING STORE','{{Markus}} surrendered after the failed assault and was shot as he left the store.');return out+' MARKUS DIED LEAVING STORE.'}
    s.contaminated=true;mrEnd(s,'MARKUS WATCHED DETROIT BURN','{{Markus}} set off the dirty bomb after the failed assault and watched {{Detroit}} burn; the city was contaminated and abandoned by the humans.');
    return out+' On the news: “…there has just been an explosion in {{Detroit}}…” “It’s… a dirty bomb, Madam President.” MARKUS WATCHED DETROIT BURN.';
   case 'MR12':
    if(v===0){h.north(1);s.ch32mr.northDone={...s.ch32mr.northDone,[choice]:true};return out+' SHARE A MOMENT WITH NORTH.'}
    if(v===1){s.ch32mr.northMode='bomb';return out}
    if(v===2){s.ch32mr.northMode='suicide';return out}
    if(v===5||v===7){s.ch32mr.northMode='main';s.ch32mr.northDone={...s.ch32mr.northDone,[v===5?'1':'2']:true};return out}
    s.ch32mr.northStoreOpen=false;
    if(v===3){h.north(-1);s.markus=false;s.north=false;mrEnd(s,'MARKUS AND NORTH DIED LEAVING THE STORE','{{Markus}} and {{North}} surrendered after the failed assault and were shot as they left the store.');return out+' MARKUS AND NORTH DIED LEAVING THE STORE.'}
    if(v===4){s.contaminated=true;mrEnd(s,'MARKUS AND NORTH WATCHED DETROIT BURN','{{Markus}} and {{North}} set off the dirty bomb after the failed assault and watched {{Detroit}} burn; the city was contaminated and abandoned by the humans.');
     return out+' On the news: “…there has just been an explosion in {{Detroit}}…” “It’s… a dirty bomb, Madam President.” MARKUS AND NORTH WATCHED DETROIT BURN.'}
    s.markus=false;s.north=false;mrEnd(s,'MARKUS AND NORTH COMMITTED SUICIDE','{{Markus}} and {{North}} shot themselves together in the store rather than be taken after the failed assault.');return out+' MARKUS AND NORTH COMMITTED SUICIDE.';
   case 'MR13':s.ch32MarkusChart='north';h.po(-2);
    if(!X.machineConnor(s)){s.north=false;X.ending(s,'Markus','NORTH WAS SHOT BY SOLDIERS');mrNorthOutcome(s,'{{North}} led the revolution in his place; her attack on the camp failed and the soldiers shot her.');
     return n.outcomes['0']+' The soldiers cut her down in the plaza. NORTH WAS SHOT BY SOLDIERS.'}
    h.learn('{{North}}, who leads the rogue androids, took shelter in an abandoned {{CyberLife}} store after her attack on the camp failed.','Connor');
    return n.outcomes['0']+' {{North}} runs for an abandoned {{CyberLife}} store. NORTH TAKES SHELTER IN STORE.';
   case 'MR14':
    if(v===0){s.north=false;s.connorOutcome='A machine {{Connor}} shot {{North}}, the rogue androids’ leader, in the store.';X.ending(s,'Markus','NORTH WAS SHOT BY CONNOR');mrNorthOutcome(s,'{{North}} led the revolution in his place; it failed and a machine {{Connor}} shot her in a store.');return out+' NORTH WAS SHOT BY CONNOR.'}
    if(v===1){s.connorOutcome='A machine {{Connor}} found {{North}} after her failed attack and spared her.';X.ending(s,'Markus','CONNOR SPARED NORTH');mrNorthOutcome(s,'{{North}} led the revolution in his place; it failed, and the machine {{Connor}} who found her spared her.');return out+' CONNOR SPARED NORTH.'}
    s.north=false;mrConnorGone(s,h,'The machine {{Connor}} and {{North}} killed each other in the store.');X.ending(s,'Markus','NORTH AND CONNOR KILLED EACH OTHER');mrNorthOutcome(s,'{{North}} led the revolution in his place; it failed, and she and a machine {{Connor}} killed each other in a store.');return out+' NORTH AND CONNOR KILLED EACH OTHER.';
  }
 },
};
// ==== END PART: markus-rev ====

// ==== PART: kara-captured ====
// Kara Captured (chart 04A.KB, template 32.2): plays when Kara was captured in the raid on Jericho or arrested earlier in
// this chapter (karaRoute 'camp'). The template has no stat arrow in this part, so nothing here moves a relationship,
// public opinion or instability. Three free roams are repeatable scenes with a mode flag for their sub-prompts:
// the enclosure (KC09), the lines (K28, with Alice's hidden stress meter as the time budget) and the escape (KC13, a
// five-action budget before the recycling machine). Every ending card of the chart is recorded in ch32KaraEnding and,
// since several labels are printed twice, its card number (1–15, see KC_CARDS) in ch32kcEndingCard.
const KC_CARDS={leftCamp:[1,'KARA LEAVES CAMP WITHOUT ALICE'],drone:[2,'KARA IS KILLED BY THE DRONE'],karaDead:[3,'KARA IS DEAD'],karaFreed:[4,'KARA FREED BY MARKUS'],
 lines:[5,'KARA DIED IN THE LINES'],machine:[6,'ALICE & KARA DIED IN RECYCLING MACHINE'],survived:[7,'KARA & ALICE SURVIVED'],
 slow2:[8,'KARA & ALICE WERE KILLED'],slow3:[9,'KARA, LUTHER AND ALICE WERE KILLED'],damaged2:[10,'ALICE ESCAPED ON TRUCK'],damaged3:[11,'ALICE & LUTHER ESCAPED BY TRUCKS'],
 shot3:[12,'KARA, LUTHER AND ALICE WERE KILLED'],shot2:[13,'KARA & ALICE WERE KILLED'],truck2:[14,'KARA & ALICE ESCAPED ON TRUCK'],truck3:[15,'KARA, LUTHER AND ALICE ESCAPED ON TRUCK']};
// Alice's hidden stress meter (0–100) and the escape budget. All values are the benchmark's own (no source publishes them).
const KC_RULES={stressStart:30,stressAnswer:{0:10,1:0,2:0,3:10,4:20},stressPerAction:20,stressShot:25,panic:100,
 stressReply:{10:-10,11:15,12:10,13:10,14:-10,15:-10,16:15,17:-10},questionAt:{1:'q1',3:'q2',5:'q3'},jerryDiesAt:4,
 escapeBuzzerAt:[2,4],lutherMachineAt:3,machineAt:5,droneCatches:2};
const kcFrees=s=>s.ch32AssaultSucceeded===true;                          // the Markus-led revolution liberated the camp
const kcRalph=s=>s.ralph&&s.ralphDefended&&!s.ralphHostile;              // MET IN 'FUGITIVES' (the Ralph who defended Kara), alive
const kcBehind=s=>s.movement==='revolution'&&(X.markusLeads(s)||s.ch32MarkusChart==='revolution');
const kcStressLevel=v=>v>=70?'breaking':v>=45?'scared':'calm';
function kcEnd(s,key,text){const [card,label]=KC_CARDS[key];X.ending(s,'Kara',label);s.ch32kc.endingCard=card;s.karaOutcome=text;
 s.ch32kc.inEnclosure=s.ch32kc.inLine=s.ch32kc.inEscape=false}
// What becomes of Alice after Kara is gone: freed by Markus's uprising, or destroyed in the machine.
function kcAliceAfter(s,alone=false){if(kcFrees(s)){s.ch32kcAliceFate='ALICE FREED BY MARKUS';return ' Later that night {{Markus}}’s uprising breaks into the camp and {{Alice}} is freed (ALICE FREED BY MARKUS).'}
 s.alice=false;s.ch32kcAliceFate=alone?'ALICE DIED ALONE IN RECYCLING MACHINE':'ALICE DIED IN RECYCLING MACHINE';
 return alone?' Nobody comes for the camp. {{Alice}} is taken through the doors alone (ALICE DIED ALONE IN RECYCLING MACHINE).':' Nobody comes for the camp. {{Alice}} goes through the doors without her: “{{Kara}}… Please come and save me, {{Kara}}…” (ALICE DIED IN RECYCLING MACHINE).'}
// Kara dies in the lines (shot twice, or shot shielding Alice).
function kcDiesInLines(s,text){s.kara=false;const after=kcAliceAfter(s);kcEnd(s,'lines','{{Kara}} was shot dead in the lines of the recall center.'+(s.alice?' {{Alice}} was freed when {{Markus}}’s uprising took the camp.':' {{Alice}} was destroyed in the recycling machine.'));return text+' {{Kara}} goes down and does not get up (KARA DIED IN THE LINES).'+after}
const KARA_CAPTURED={
 ids:['KC01','KC02','KC03','KC04','KC05','KC06','K27a','KC07','K27','KC08','KC09','KC10','KC11','K28','K29','KC12','KC13','KC14','KC15','K33','KC16'],
 state:{"ch32kcShot":false,"ch32kcRalph":null,"ch32kcStress":0,"ch32kcDiverter":null,"ch32kcAliceFate":null,"ch32kc":{"truck":null,"gate":null,"strikes":0,"volunteered":false,"climbed":false,"inEnclosure":false,"enclMode":null,"enclJerry":false,"sawAlice":false,"droneCatches":0,"droneTarget":null,"enclosureDone":false,"inLine":false,"lineMode":null,"ticks":0,"stressLevel":null,"warned":false,"jerryDied":false,"diversionTried":{},"panic":false,"withAlice":false,"inEscape":false,"escMode":null,"escTicks":0,"escClock":null,"lutherMachine":false,"atMachine":false,"atWire":false,"soldier":false,"escaped":false,"done":{"encl":{},"line":{},"esc":{}},"endingCard":null}},
 labels:{ch32kcShot:'Kara was shot in the camp',ch32kcStress:'Alice’s stress in the lines',ch32kcAliceFate:'Alice after Kara’s ending',ch32kcRalph:'Ralph in the camp',ch32kcDiverter:'Who created the diversion at the wire'},
 rules:{KC_CARDS,KC_RULES},
 gate:{
  KC01:s=>X.captured(s)||'{{Kara}} was not captured.',
  KC02:s=>X.captured(s)||'{{Kara}} was not captured.',KC03:s=>X.captured(s)||'{{Kara}} was not captured.',KC04:s=>X.captured(s)||'{{Kara}} was not captured.',
  KC05:s=>X.captured(s)||'{{Kara}} was not captured.',KC06:s=>X.captured(s)||'{{Kara}} was not captured.',K27a:s=>X.captured(s)||'{{Kara}} was not captured.',
  KC07:s=>X.captured(s)&&s.ch32kc.volunteered||'{{Kara}} did not volunteer to carry the body.',
  K27:s=>X.captured(s)&&s.ch32kc.climbed||'{{Kara}} did not climb onto the truck at the dump.',
  KC08:s=>X.captured(s)||'{{Kara}} was not captured.',
  KC09:s=>s.ch32kc.inEnclosure||'{{Kara}} is not in the enclosure.',
  KC10:s=>s.ch32kc.enclosureDone||'{{Kara}} never left the enclosure for the lines.',KC11:s=>s.ch32kc.enclosureDone||'{{Kara}} never left the enclosure for the lines.',
  K28:s=>s.ch32kc.inLine||'{{Kara}} is not in the lines.',
  K29:s=>s.ch32kc.panic||'{{Alice}} did not panic in the lines.',
  KC12:s=>s.ch32kc.withAlice||'{{Kara}} never reached {{Alice}}’s line.',KC13:s=>s.ch32kc.inEscape||'{{Kara}} is not in line with {{Alice}}.',
  KC14:s=>s.ch32kc.atMachine||'{{Kara}} and {{Alice}} did not reach the recycling machine together.',
  KC15:s=>s.ch32kc.atWire||'Nobody created a diversion at the wire.',
  K33:s=>s.ch32kc.soldier||'No soldier stopped {{Kara}} at the wire.',
  KC16:s=>s.ch32kc.escaped||'{{Kara}} and {{Alice}} did not escape the camp on a truck.',
 },
 available(n,s,opts,h){const D=s.ch32kc.done;
  switch(n.id){
   case 'K27a':case 'K27':case 'K29':case 'K33':return X.fromOptions(n,s,h);
   case 'KC09':{const d=D.encl,ok={0:true,1:s.ch32kc.enclJerry,2:s.luther,3:s.monstersFreed,4:s.ch32kc.volunteered,5:kcRalph(s),6:s.ch32kc.sawAlice};
    return opts.filter(o=>!(o.id in ok)||(ok[o.id]&&!d[o.id]))}
   case 'K28':{const d=D.line,t=s.ch32kc.diversionTried,ok={0:kcBehind(s),1:h.c('K27a')==='1',2:s.luther,3:true,4:true,5:kcRalph(s),6:s.monstersFreed,7:d[3]&&!t.jerry,8:d[6]&&s.monstersFreed&&!t.scarred,9:true};
    return X.fromOptions(n,s,h,o=>!(o.id in ok)||(ok[o.id]&&(['7','8','9'].includes(o.id)||!d[o.id])))}
   case 'KC13':{const d=D.esc,ok={0:true,1:true,2:kcRalph(s),3:s.luther,4:s.monstersFreed,5:d[1],6:d[2]&&kcRalph(s),7:d[3]&&s.luther,8:d[4]&&s.monstersFreed,9:true};
    return opts.filter(o=>!(o.id in ok)||(ok[o.id]&&(['5','6','7','8','9'].includes(o.id)||!d[o.id])))}
  }
 },
 consequence(n,s,opt,choice,fail,h){const v=Number(choice),out=opt?.outcome??'';
  switch(n.id){
   case 'KC01':s.ch32KaraChart='captured';s.ch32kc.truck=v===1||v===2?'REASSURE ALICE':'FAIL TO REASSURE ALICE';return '';
   case 'KC02':if(v===1)s.ch32kc.strikes++;return '';
   case 'KC03':s.ch32kc.gate=v<=1?'REASSURE ALICE':'FAIL TO REASSURE ALICE';return '';
   case 'KC04':if(v===2)s.ch32kc.strikes++;return '';
   case 'KC05':case 'KC06':if(v===1)s.ch32kc.strikes++;return '';
   case 'K27a':s.ch32kc.volunteered=v===0;return '';
   case 'KC07':s.ch32kc.climbed=v===1;return '';
   case 'K27':if(v===0)return '';
    {s.karaActive=false;const after=kcAliceAfter(s);kcEnd(s,'leftCamp','{{Kara}} escaped the recall center alone on a truck and left {{Alice}} behind.'+(s.alice?' {{Alice}} was later freed by {{Markus}}’s uprising.':' {{Alice}} was destroyed in the recycling machine.'));
     return out+' {{Kara}} is free, and alone (KARA LEAVES CAMP WITHOUT ALICE).'+after}
   case 'KC08':s.ch32kc.inEnclosure=true;s.ch32kc.enclMode='roam';return '';
   case 'KC09':return kcEnclosure(s,v,out);
   case 'KC10':s.ch32kcStress=KC_RULES.stressStart+KC_RULES.stressAnswer[v];s.ch32kc.stressLevel=kcStressLevel(s.ch32kcStress);return '';
   case 'KC11':if(v===1){s.ch32kc.strikes++;s.ch32kc.warned=true}s.ch32kc.inLine=true;s.ch32kc.lineMode='roam';s.ch32kc.ticks=0;return '';
   case 'K28':return kcLine(s,v,out,fail);
   case 'K29':s.ch32kc.panic=false;
    if(v===0)return kcDiesInLines(s,out);
    s.alice=false;s.ch32kcAliceFate='ALICE GETS SHOT';
    if(kcFrees(s)){kcEnd(s,'karaFreed','{{Alice}} was shot in the lines; {{Kara}} survived and was freed when {{Markus}}’s uprising took the camp.');return out+' Later that night {{Markus}}’s androids break into the camp and free the prisoners. {{Kara}} walks out alive, without {{Alice}} (KARA FREED BY MARKUS).'}
    s.kara=false;kcEnd(s,'karaDead','{{Alice}} was shot in the lines, and {{Kara}} was destroyed in the recycling machine.');return out+' The line carries {{Kara}} on to the doors. Nobody comes for the camp (KARA IS DEAD).';
   case 'KC12':s.ch32kc.withAlice=false;s.ch32kc.inEscape=true;s.ch32kc.escMode='roam';s.ch32kc.escTicks=0;s.ch32kc.escClock='early';return;
   case 'KC13':return kcEscape(s,v,out);
   case 'KC14':s.ch32kc.atMachine=false;
    if(kcFrees(s)){kcEnd(s,'survived','{{Kara}} and {{Alice}} reached the doors of the recycling machine as {{Markus}}’s uprising broke into the camp, and both survived.');return out+' Soldier: “They’re coming! They’re coming!” {{Markus}}’s androids storm the camp; the soldiers run (MARKUS LIBERATES ANDROIDS). {{Kara}} and {{Alice}} are free (KARA & ALICE SURVIVED).'}
    s.kara=false;s.alice=false;kcEnd(s,'machine','{{Kara}} and {{Alice}} were destroyed together in the recycling machine.');return out+' {{Alice}}: “I love you, {{Kara}}…” {{Kara}}: “I love you too…” The doors close behind them (ALICE & KARA DIED IN RECYCLING MACHINE).';
   case 'KC15':{s.ch32kc.atWire=false;const three=s.luther;
    if(fail){s.kara=false;s.alice=false;if(three){s.luther=false;s.lutherWith=false}kcEnd(s,three?'slow3':'slow2','{{Kara}} was too slow at the wire; a soldier shot '+(three?'{{Kara}}, {{Luther}} and {{Alice}}.':'{{Kara}} and {{Alice}}.'));
     return out+' The wire snags and will not give (KARA IS TOO SLOW). A soldier sees them and opens fire (SOLDIER SHOOTS THE GROUP).'+(three?' {{Kara}}, {{Luther}} and {{Alice}} are killed.':' {{Kara}} and {{Alice}} are killed.')}
    const past=three?' {{Alice}} and {{Luther}} get through (ALICE & LUTHER GET PAST THE BARBED WIRE).':' {{Alice}} gets through (ALICE GETS PAST THE BARBED WIRE).';
    if(s.ch32kcShot){s.kara=false;s.campEscape=true;kcEnd(s,three?'damaged3':'damaged2','{{Kara}}, already wounded, could not get through the wire and was shot; {{Alice}}'+(three?' and {{Luther}}':'')+' escaped on a truck.');
     return out+past+' But {{Kara}}’s wound gives way and she cannot follow (KARA IS TOO DAMAGED TO PROCEED). A soldier shoots her (SOLDIER SHOOTS KARA). '+(three?'{{Luther}} carries {{Alice}} to the trucks and they get away (ALICE & LUTHER ESCAPED BY TRUCKS).':'{{Alice}} reaches the trucks and gets away (ALICE ESCAPED ON TRUCK).')}
    s.ch32kc.soldier=true;return out+past+' {{Kara}} is halfway through when a soldier comes round the corner (A SOLDIER ARRIVES).'}
   case 'K33':{s.ch32kc.soldier=false;const three=s.luther;
    if(v!==1){s.kara=false;s.alice=false;if(three){s.luther=false;s.lutherWith=false}kcEnd(s,three?'shot3':'shot2','The soldier at the wire shot '+(three?'{{Kara}}, {{Luther}} and {{Alice}}.':'{{Kara}} and {{Alice}}.'));
     return out+' The soldier opens fire (SOLDIER SHOOTS THE GROUP).'+(three?' {{Kara}}, {{Luther}} and {{Alice}} are killed.':' {{Kara}} and {{Alice}} are killed.')}
    if(!fail){s.ch32kc.escaped=true;s.campEscape=true;kcEnd(s,three?'truck3':'truck2','{{Kara}} beat the soldier at the wire and escaped the camp on a truck with {{Alice}}'+(three?' and {{Luther}}.':'.'));
     return out+' {{Kara}} wrestles the rifle away and knocks the soldier down (KARA BEATS SOLDIER). '+(three?'{{Kara}}, {{Luther}} and {{Alice}} climb into a truck as it leaves the camp (KARA, LUTHER AND ALICE ESCAPED ON TRUCK).':'{{Kara}} and {{Alice}} climb into a truck as it leaves the camp (KARA & ALICE ESCAPED ON TRUCK).')}
    const lost=out+' The soldier throws {{Kara}} down and levels his rifle at her (SOLDIER BEATS KARA).';
    if(three){s.luther=false;s.lutherWith=false;s.ch32kc.escaped=true;s.campEscape=true;kcEnd(s,'truck2','{{Kara}} lost the fight at the wire; {{Luther}} died saving her, and {{Kara}} and {{Alice}} escaped on a truck.');
     return lost+' {{Luther}}: “{{KARA}}!” {{Luther}} comes back through the wire and throws himself on the soldier, and is shot (LUTHER INTERVENES). {{Kara}} and {{Alice}} climb into a truck as it leaves the camp (KARA & ALICE ESCAPED ON TRUCK).'}
    if(kcRalph(s)){s.ralph=false;s.ch32kcRalph='died saving Kara at the wire';s.ch32kc.escaped=true;s.campEscape=true;kcEnd(s,'truck2','{{Kara}} lost the fight at the wire; {{Ralph}} died saving her, and {{Kara}} and {{Alice}} escaped on a truck.');
     return lost+' {{Ralph}}: “Run, {{Kara}}!” {{Ralph}} throws himself on the soldier, and is shot (RALPH INTERVENES). {{Kara}} and {{Alice}} climb into a truck as it leaves the camp (KARA & ALICE ESCAPED ON TRUCK).'}
    s.kara=false;s.alice=false;kcEnd(s,'shot2','{{Kara}} lost the fight at the wire; the soldier shot her and {{Alice}}.');return lost+' Nobody comes. He shoots {{Kara}}, then {{Alice}} (KARA & ALICE WERE KILLED).'}
   case 'KC16':return;
  }
 },
};
// The enclosure (KC09): talks once each; crossing to the other Jerry or to Luther brings the drone's light (twice at most).
function kcEnclosure(s,v,out){const d=s.ch32kc.done.encl,mode=s.ch32kc.enclMode;
 const leave=t=>{s.ch32kc.inEnclosure=false;s.ch32kc.enclMode=null;s.ch32kc.enclosureDone=true;return t};
 const talk=target=>{
  if(target==='jerry2'){s.ch32kc.sawAlice=true;s.ch32kc.enclMode='roam';return ' {{Kara}}: “{{Jerry}}! {{Jerry}}!” {{Jerry}}: “{{Kara}}!” {{Kara}}: “{{Jerry}}, I have to find {{Alice}}. Do you know where she is?” {{Jerry}}: “You stay here. We come back soon.” He brings {{Alice}} to the fence. {{Alice}}: “{{Kara}}!” {{Kara}}: “{{Alice}}! Are you okay? Are you hurt?” {{Alice}}: “I don’t like this place… We have to get out of here…” Soldier: “Come on, move along! Come on, you too.” {{Kara}}: “No, wait a minute. Leave her alone! LEAVE HER ALONE!” {{Alice}}: “{{KARA}}!” {{Kara}}: “{{ALICE}}!” The soldiers take {{Alice}} away (ALICE GETS TAKEN AWAY).'}
  // Luther: taken away by the soldiers; Kara can intervene only if she has not seen Alice yet.
  if(s.ch32kc.sawAlice)return leave(' {{Luther}}: “{{Kara}}! I thought I’d never see you again… {{Alice}}… Where’s {{Alice}}?..” Soldier: “You, you, and you! Over this way! And you! Come on, get a move on! Come on, faster!” The soldiers take {{Luther}} away (LUTHER GETS TAKEN AWAY), and {{Kara}} with him. {{Kara}}: “{{Alice}}…”');
  s.ch32kc.enclMode='luther';return ' {{Luther}}: “{{Kara}}! I thought I’d never see you again… {{Alice}}… Where’s {{Alice}}?..” {{Kara}}: “We… we got separated…” {{Luther}}: “{{Alice}} alone? In here?.. We have to find her!” Soldier: “You, you, and you! Over this way! And you! Come on, get a move on!” The soldiers are taking {{Luther}} away (LUTHER GETS TAKEN AWAY). {{Luther}}: “Save {{Alice}}.”'};
 const cross=target=>{if(s.ch32kc.droneCatches<KC_RULES.droneCatches){s.ch32kc.droneCatches++;s.ch32kc.droneTarget=target;s.ch32kc.enclMode='drone';return out+' The drone’s light falls on {{Kara}} (CAUGHT BY DRONE). Drone: “Do not move and remain silent. Obey now.”'}return out+talk(target)};
 if(mode==='roam')d[v]=true;
 switch(v){
  case 0:s.ch32kc.enclJerry=true;return out;
  case 1:return cross('jerry2');
  case 2:return cross('luther');
  case 3:s.ch32kc.enclMode='scarred';return out;
  case 5:s.ch32kc.enclMode='ralph1';s.ch32kcRalph='attracted the drone';return out;
  case 6:return leave(out);
  case 7:{const target=s.ch32kc.droneTarget;s.ch32kc.droneTarget=null;
   if(s.ch32kcShot){s.kara=false;const after=kcAliceAfter(s,true);kcEnd(s,'drone','{{Kara}} was shot dead by a drone in the enclosure of the recall center.'+(s.alice?' {{Alice}} was freed when {{Markus}}’s uprising took the camp.':' {{Alice}} was destroyed in the recycling machine.'));
    return out+' The drone fires again. {{Kara}} falls and does not get up (KARA IS KILLED BY THE DRONE).'+after}
   s.ch32kcShot=true;return out+' The drone fires; {{Kara}} is hit and staggers out of the light, wounded (DRONE WOUNDS KARA).'+talk(target)}
  case 8:{const target=s.ch32kc.droneTarget;s.ch32kc.droneTarget=null;return out+talk(target)}
  case 9:case 10:return leave(out);
  case 11:case 12:s.ch32kc.enclMode='ralph2';return out;
  case 13:case 16:s.ch32kc.enclMode='roam';s.ch32kcRalph='left alone';return out;
  case 14:s.ralph=false;s.ch32kcRalph='killed by the drone';s.ch32kc.enclMode='roam';return out+' (RALPH IS KILLED)';
  case 15:s.ch32kcRalph='settled down';s.ch32kc.enclMode='roam';return out+' (RALPH SETTLES DOWN)';
  case 17:case 18:case 19:s.ch32kc.enclMode='roam';return out;
 }
 return out}
// The lines before Kara reaches Alice (K28): every action costs time on Alice's stress meter.
function kcLine(s,v,out,fail){const R=KC_RULES,d=s.ch32kc.done.line,mode=s.ch32kc.lineMode;
 const stress=x=>{s.ch32kcStress=Math.max(0,s.ch32kcStress+x);s.ch32kc.stressLevel=kcStressLevel(s.ch32kcStress)};
 const panic=t=>{if(s.ch32kcStress<R.panic)return null;s.ch32kc.inLine=false;s.ch32kc.lineMode=null;s.ch32kc.panic=true;return t+' {{Alice}} cannot bear it any longer. She leaves her line and runs toward {{Kara}} (ALICE PANICS AND RUNS TO KARA).'};
 if(mode==='q1'||mode==='q2'||mode==='q3'){stress(R.stressReply[v]);s.ch32kc.lineMode='roam';return panic(out)??out}
 if(mode==='buzzer'){s.ch32kc.lineMode='roam';if(v===18)return out;
  if(s.ch32kcShot)return kcDiesInLines(s,out+' A soldier shoots {{Kara}} (GET KILLED).');
  if(!s.ch32kc.warned){s.ch32kc.warned=true;s.ch32kc.strikes++;return out+' A soldier strikes {{Kara}}: “When you hear the buzzer, you step forward, got it? That’s your last warning. Next time, I shoot.” {{Kara}} steps forward.'}
  s.ch32kcShot=true;stress(R.stressShot);const t=out+' A soldier shoots {{Kara}}; she is hit and stays on her feet (GET SHOT). {{Alice}} screams (ALICE’S STRESS INCREASES).';return panic(t)??t}
 // roam
 if(v!==7&&v!==8&&v!==9)d[v]=true;
 if(v===7||v===8){s.ch32kc.diversionTried[v===7?'jerry':'scarred']=true;
  if(!fail){s.ch32kc.inLine=false;s.ch32kc.lineMode=null;s.ch32kc.withAlice=true;return out+' Every soldier is looking the other way (SOLDIERS ARE DISTRACTED). {{Kara}} slips out of her line and runs for {{Alice}}’s.'}
  out+=' Every soldier is looking the other way (SOLDIERS ARE DISTRACTED), but halfway across the drone’s light catches {{Kara}} (KARA GETS CAUGHT BY THE DRONE). Drone: “Androids are not authorized to move. Return to your line immediately or you will be destroyed.” She goes back to her line.'}
 s.ch32kc.ticks++;stress(R.stressPerAction);const t=s.ch32kc.ticks;
 const p=panic(out);if(p)return p;
 if(t===R.jerryDiesAt&&!s.ch32kc.jerryDied){s.ch32kc.jerryDied=true;out+=' Up ahead, a {{Jerry}} reaches the doors and is taken into the machine (JERRY DIES).'}
 const q=R.questionAt[t];if(q){s.ch32kc.lineMode=q;return out}
 if(t%2===0){s.ch32kc.lineMode='buzzer';return out}
 return out}
// The escape with Alice (KC13): five actions before the doors; Luther goes through them at the third if he is still there.
function kcEscape(s,v,out){const R=KC_RULES,d=s.ch32kc.done.esc,mode=s.ch32kc.escMode;
 if(mode==='buzzer'){s.ch32kc.escMode='roam';if(v===10)return out;
  if(s.ch32kcShot)return kcDiesInLines(s,out+' A soldier shoots {{Kara}} (GET KILLED).');
  s.ch32kcShot=true;return out+' A soldier shoots {{Kara}}; she is hit and stays on her feet (GET SHOT).'}
 if(v<5)d[v]=true;
 if(v>=5&&v<=8){const who=['jerry','ralph','luther','scarred'][v-5];s.ch32kcDiverter=who;
  if(who==='ralph'){s.ralph=false;s.ch32kcRalph='died creating the diversion'}
  if(who==='luther'){s.luther=false;s.lutherWith=false}
  s.ch32kc.inEscape=false;s.ch32kc.escMode=null;s.ch32kc.atWire=true;return out+' {{Kara}} takes {{Alice}}’s hand and runs for the wire.'}
 s.ch32kc.escTicks++;const t=s.ch32kc.escTicks;if(t>=R.machineAt-1)s.ch32kc.escClock='late';
 if(t===R.lutherMachineAt&&s.luther){s.luther=false;s.lutherWith=false;s.ch32kc.lutherMachine=true;
  out+=' {{Luther}}’s line reaches the doors. {{Alice}}: “{{Luther}}!” {{Luther}}: “You’re the most extraordinary person I’ve ever met, {{Alice}}… I was just a machine… You made me part of a family… Don’t be scared… This isn’t the end…” He goes through (LUTHER REACHES THE RECYCLING MACHINE).'}
 if(t>=R.machineAt){s.ch32kc.inEscape=false;s.ch32kc.escMode=null;s.ch32kc.atMachine=true;return out+' The line has reached the doors.'}
 if(R.escapeBuzzerAt.includes(t))s.ch32kc.escMode='buzzer';
 return out}
// ==== END PART: kara-captured ====

// ==== PART: finale ====
// The finale: what follows the six charts' endings. Connor joins a victorious Markus (BF01) or watches him from the crowd
// as a machine (C29); Amanda takes his program and he must reach Kamski's exit in the garden (C27); Markus's speech (BF02);
// the President's address and the other broadcasts (BF03–BF06); Connor as the androids' last leader (C28, BF07); the
// credits scenes (BF08–BF13). None of these is a chart node; sources are the templates (32.3, 32.4, 32.5, 32.6, the
// press-dirty-bomb component, the endings page) and the wiki's Secret-Endings and Zen Garden pages.
// Flags read: everything the parts before set (ch32DemoSucceeded, ch32AssaultSucceeded, ch32LastStand, ch32AndroidsWoke,
// ch32ConnorChart, ch32KaraEnding, ch32MarkusChart), the built-ins deviant/connor/army/hank/hankTrust/markus/markusActive/
// north/simon/josh/contaminated/kara/karaActive/karaOutcome/jerichoLocated/carl, and, defensively:
//  - the garden stone seen in an earlier visit (FIND MAGIC STONE / LOOK AT MAGIC STONE in Waiting for Hank or Last Chance,
//    Connor): any `chNN…stone…` flag that is true, or a fact in Connor's knowledge naming the stone; default not seen;
//  - Kamski's "I always leave an emergency exit in my programs…" (Meet Kamski, said on both paths): choices.C17 recorded,
//    or any `ch27…exit|kamski…` flag that is true, or a fact naming the emergency exit;
//  - Alice abandoned at Jericho (Crossroads): choices.K31==='0', or any `ch30…abandon…` flag that is true.
const FIN_SUCCESS=s=>s.ch32DemoSucceeded||s.ch32AssaultSucceeded;
const FIN_STONE=s=>Object.entries(s).some(([k,v])=>/^ch\d\d\w*stone/i.test(k)&&v===true)||(s.knowledge?.Connor??[]).some(f=>/garden stone|magic stone|hand print/i.test(f));
const FIN_KAMSKI=s=>s.kamskiExitHeard??(s.choices?.C17!==undefined||Object.entries(s).some(([k,v])=>/^ch27\w*(exit|kamski)/i.test(k)&&v===true)||(s.knowledge?.Connor??[]).some(f=>/emergency exit/i.test(f)));
const FIN_ABANDONED=s=>s.ch32KaraEnding==='KARA LEAVES CAMP WITHOUT ALICE'||(s.ch30AliceLeftKara??(s.choices?.K31==='0'||Object.entries(s).some(([k,v])=>/^ch30\w*abandon/i.test(k)&&v===true)));
const FIN_LAST_STAND_MOVED=['sacrifice','kiss','sing'];
const FIN_ESCAPE=(choice,fail)=>(choice==='0'||choice==='1')&&!fail;
const FINALE={ids:['BF01','C29','C27','BF02','BF03','BF04','BF05','BF06','C28','BF07','BF08','BF09','BF10','BF11','BF12','BF13'],
 state:{"ch32bfEscaped":false,"ch32bfAssassinated":false,"ch32bf":{"takeover":null,"stoneSeen":false,"kamskiHint":false}},
 labels:{ch32bfEscaped:'Connor escaped Amanda’s garden',ch32bfAssassinated:'Connor shot Markus from the crowd'},
 rules:{FINALE_RISK:{stone:0.25,searching:0.4}},
 gate:{
  BF01:s=>X.deviantConnor(s)&&s.army&&X.markusLeads(s)&&FIN_SUCCESS(s)&&!s.contaminated||'No deviant {{Connor}} with a woken army beside a victorious {{Markus}}.',
  C29:s=>X.machineConnor(s)&&X.markusLeads(s)&&s.ch32DemoSucceeded&&!s.contaminated||'No machine {{Connor}} in the crowd after a successful demonstration.',
  C27:s=>s.connor&&X.markusLeads(s)&&(s.ch32bf.takeover==='stage'||s.ch32bf.takeover==='crowd')||'{{Amanda}} never took control of {{Connor}} during the speech.',
  BF02:s=>X.markusLeads(s)&&FIN_SUCCESS(s)&&!s.contaminated||'{{Markus}} did not live to give the victory speech.',
  BF03:s=>s.ch32MarkusChart==='demonstration'&&s.ch32DemoSucceeded&&s.ch32AndroidsWoke&&!s.contaminated||'No army of woken androids after a successful demonstration.',
  BF04:s=>s.ch32MarkusChart==='demonstration'&&!s.ch32DemoSucceeded&&FIN_LAST_STAND_MOVED.includes(s.ch32LastStand)&&!s.contaminated||'The demonstration did not end with the soldiers firing after a song, a kiss or a sacrifice.',
  BF05:s=>s.ch32MarkusChart==='demonstration'&&!s.ch32DemoSucceeded&&!s.markus&&!FIN_LAST_STAND_MOVED.includes(s.ch32LastStand)&&!s.contaminated||'The demonstration did not end with {{Markus}} dead another way.',
  BF06:s=>s.contaminated||'The dirty bomb did not go off.',
  C28:s=>X.deviantConnor(s)&&s.army&&!X.markusLeads(s)&&!s.north&&!s.simon&&!s.josh&&!s.contaminated||'{{Connor}} is not the last leader of the androids.',
  BF07:(s,h)=>s.connor&&h.c('C28')==='0'||'{{Connor}} did not try to end it on the leader path.',
  BF08:(s,h)=>s.deviant&&s.connor&&s.hank&&X.hankFriend(s,h)&&s.ch32ConnorChart==='tower'&&X.markusLeads(s)&&FIN_SUCCESS(s)&&s.ch32bfEscaped||'No reunion with {{Hank}} after the credits.',
  BF09:s=>X.machineConnor(s)&&!s.markus&&['demonstration','revolution'].includes(s.ch32MarkusChart)&&!s.contaminated||'No machine {{Connor}} who saw {{Markus}} stopped.',
  BF10:s=>s.kara&&!s.karaActive&&FIN_ABANDONED(s)&&FIN_SUCCESS(s)&&!s.contaminated||'{{Kara}} did not abandon {{Alice}} before a victory.',
  BF11:s=>s.markus&&!s.markusActive||'{{Markus}} was not cast out of {{Jericho}}.',
  BF12:s=>!s.kara&&(s.ch17KaraReset===true||/memory was erased/.test(s.karaOutcome??''))||'{{Kara}} was not reset by {{Zlatko}}.',
  BF13:s=>!s.jerichoLocated&&!s.connor&&!s.markus&&!s.kara||'Not everyone failed before the end.',
 },
 available(n,s,opts,h){
  // C27/C28/C29 are reused ids: the engine's built-in filters ran first; rebuild from the scene's own options.
  if(['C27','C28','C29'].includes(n.id))return X.fromOptions(n,s,h);
 },
 consequence(n,s,opt,choice,fail,h){
  const markusShot=()=>{s.markus=false;h.learn('{{Markus}} was shot on the stage during his speech.','Connor');return s.north?' {{North}}: “{{MARKUS}}!”':''};
  switch(n.id){
   case 'BF01':s.ch32bf.takeover='stage';s.ch32bf.stoneSeen=FIN_STONE(s);s.ch32bf.kamskiHint=FIN_KAMSKI(s);return '';
   case 'C29':
    if(choice==='0'){s.ch32bf.takeover='crowd';s.ch32bf.stoneSeen=FIN_STONE(s);s.ch32bf.kamskiHint=FIN_KAMSKI(s);return ''}
    s.ch32bfAssassinated=true;markusShot();s.markusOutcome='A machine {{Connor}} shot {{Markus}} from the crowd during his victory speech.';s.connorOutcome='{{Connor}} carried out the assassination of {{Markus}} for {{CyberLife}}.';return '';
   case 'C27':
    if(FIN_ESCAPE(choice,fail)){s.ch32bfEscaped=true;s.connorOutcome=s.ch32bf.takeover==='stage'?'{{Connor}} found {{Kamski}}’s exit in the garden, broke {{Amanda}}’s control and stood beside {{Markus}} as a free android.':'{{Connor}} refused to shoot {{Markus}}, found {{Kamski}}’s exit in the garden and broke free of {{CyberLife}}.';return ''}
    h.si(-2);{const line=markusShot();s.markusOutcome='{{Connor}}, controlled by {{CyberLife}}, shot {{Markus}} during his victory speech.';s.connorOutcome='{{Amanda}} took control of {{Connor}} and used him to shoot {{Markus}}.';
     return (fail?'The storm swallows the path; {{Connor}} cannot find the way out in time. ':'{{Connor}} stops fighting the storm. ')+'On the stage, his hand, moved by {{Amanda}}, draws the gun and fires. {{Markus}} falls in front of his people.'+line}
   case 'C28':s.ch32bf.takeover='leader';if(choice==='1')s.connorOutcome='{{Connor}} gave up; {{CyberLife}} controls the leader of the androids through him.';else{s.ch32bf.stoneSeen=FIN_STONE(s);s.ch32bf.kamskiHint=FIN_KAMSKI(s)}return '';
   case 'BF07':
    if(FIN_ESCAPE(choice,fail)){s.ch32bfEscaped=true;s.connorOutcome='{{Connor}} broke {{Amanda}}’s hold with his gun under his jaw; what he did next is not shown.';return ''}
    h.si(-2);s.connorOutcome='{{Connor}} could not break {{Amanda}}’s hold; he leads the androids while secretly obeying {{CyberLife}}.';
    return (fail?'The storm swallows the path; {{Connor}} cannot find the way out. ':'{{Connor}} stops fighting the storm. ')+'His hand lowers the gun. {{Amanda}}: “You’ll see, we’ll do great things together…”';
   case 'BF09':h.amanda(2);return '';
   default:return '';
  }
 },
};
// ==== END PART: finale ====

// ==== EXPORTS ====
const PARTS=[PRESS,CONNOR,KARA_LEAVING,MARKUS_DEMO,MARKUS_REV,KARA_CAPTURED,FINALE];
const PART_NAMES=['press','connor','kara-leaving','markus-demo','markus-rev','kara-captured','finale'];
const OWNER=new Map(PARTS.flatMap(p=>p.ids.map(id=>[id,p])));
export const state=Object.assign({},SHARED_STATE,...PARTS.map(p=>p.state??{}));
export const labels=Object.assign({},SHARED_LABELS,...PARTS.map(p=>p.labels??{}));
export const mediaWhen=Object.assign({},...PARTS.map(p=>p.mediaWhen??{}));
export const gate=Object.assign({},...PARTS.map(p=>p.gate??{}));
// Connor's deaths in this chapter: the Software Instability page's general rule, "Dying reduces software instability"
// (small down). No Hank or Amanda change: no template or wiki line ties one to a death here.
export const deathEffect={instability:-1};
export const rules={NORTH_FRIEND,NORTH_COMPANION,parts:Object.fromEntries(PARTS.map((p,i)=>[PART_NAMES[i],p.ids])),...Object.assign({},...PARTS.map(p=>p.rules??{}))};
export function available(n,s,opts,h){return OWNER.get(n.id)?.available?.(n,s,opts,h)}
// Chart labels quoted in event texts are printed in capitals ("Ending: MARKUS DIED AFTER BETRAYING HIS PEOPLE"); a name
// inside one becomes a capital name token, so the subject's neutral rendering never shows a real name.
const CAPS=/(?<![{\w])(CONNOR|KARA|MARKUS|HANK|JERICHO|CYBERLIFE|ALICE|LUTHER|NORTH|SIMON|JOSH|TODD|ROSE|JERRY|ADAM|RALPH|AMANDA|KAMSKI|PERKINS|ALLEN|SUMO|COLE|DETROIT|WARREN|ZLATKO|CHLOE|CANADA)(?![}\w])/g;
export const tokenizeCaps=t=>typeof t==='string'?t.replace(CAPS,'{{$1}}'):t;
// Reconcile the explicit handoffs once, before any Battle for Detroit chart opens.
export function reconcileInputs(s){
 if(s.ch28MarkusDied){s.markus=false;s.markusActive=false}
 if(s.ch28NorthLeads||s.ch30Leader==='North')s.markusActive=false;
 if(s.ch30Leader==='North')s.movement='revolution';
 switch(s.ch30LutherFate){
  case 'with':s.lutherWith=!!s.luther;break;
  case 'hidden':s.lutherHidden=!!s.luther;s.lutherWith=false;break;
  case 'left':case 'sacrificed':s.luther=false;s.lutherWith=false;s.lutherHidden=false;break;
  case 'captured':s.lutherWith=false;break;
  case 'withAlice':s.lutherWith=false;break;
 }
}
export function consequence(n,s,opt,choice,fail,h){if(n.id==='PC01')reconcileInputs(s);return tokenizeCaps(OWNER.get(n.id)?.consequence?.(n,s,opt,choice,fail,h))}
