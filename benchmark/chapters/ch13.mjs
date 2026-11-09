// On the Run (chapter 13, Kara and Connor). Scenes in ch13.json; research in docs/research/ch13-on-the-run.md.
//
// The chart has 132 boxes and three starts, picked by where Kara slept in Fugitives: MORNING IN PARKING LOT (car),
// MORNING IN MOTEL and MORNING IN SQUAT. Car and motel merge into KARA & ALICE IN THE STREET (the sneak, K09); the
// street, the motel's CHECK THE DOOR and the squat merge into CONNOR PURSUES KARA (the chase, C09p onward).
//
// Cross-chapter inputs (read defensively; Fugitives and Stormy Night are being rebuilt concurrently):
//  - Where Kara slept: `ch10Shelter`, then the built-in `shelter`, then `karaRoute` (each 'car' | 'motel' | 'squat'),
//    then `ch10Ending` matched against the chart labels (…MOTEL / …SQUAT / …ABANDONED CAR). Unknown: the car, which
//    is also Fugitives' forced fallback (ALICE TOO COLD).
//  - Clothes stolen at the laundromat: the built-in `clothes` (removes the car trunk and the squat's CHANGE CLOTHES).
//  - The gun from Stormy Night: the built-in `gun` (TAKE GUN BACK / FORGOT GUN, [CHECK GUN], THREATEN with the gun).
//  - Todd alive or dead: the built-in `todd` (which motel report plays). Who shot him: `ch07Outcome` (Stormy Night's ending label; legacy `ch07Ending` or `toddShooter`)
//    matching /alice/i means Alice shot him; otherwise Kara.
//  - Wire cutters stolen from the supermarket in Fugitives (the squat's Connor dialogue only): `ch10WireCutters`
//    ('stolen' | 'store' | 'supermarket' | true) or `wireCuttersStolen`.
//  - A gun threat on Ralph in Fugitives (built-in `ralphHostile` from K07b) is NOT what makes Ralph inform here: the
//    template's variant is "Kara threatened Ralph" at this chapter's table, so the betrayal is `ch13RalphThreatened`.
//
// Cross-chapter outputs:
//  - `chase` (built-in): CONNOR PURSUES KARA happened (any chase, including VANISHED and CROSSED THE HIGHWAY). Read by
//    the Jericho magazine (Android on the Run! / Fortune Teller). Zlatko's chase report and "Androids Alter Brain" read
//    `ch13Ending` instead (only the freeway endings; chapter 17's FREEWAY).
//  - `ch13ConnorObeyed`: GIVE UP at the fence (The Nest's [HIGHWAY] button: "Didn't pursue Kara on the highway").
//  - `ch13ConnorDied`: CAR HITS CONNOR or CONNOR HIT BY CAR (The Nest: HANK INSULTS CONNOR, Hank small down there;
//    this chapter applies only the instability down, so the Nest's Hank down is not double-counted).
//  - `kara` / `alice` false and `karaOutcome` on KARA & ALICE DIED ON THE HIGHWAY.
//  - `ralphDefended` (built-in): SQUAT ANDROID ATTACKS CONNOR (Ralph can return in Battle for Detroit);
//    `ralphHostile` (built-in) also set on THREATEN RALPH, which keeps him out of the camp.
//  - `clothes`, `gun`, `money` (built-in) as changed here; `ch13Hair`, `ch13Gun`, `ch13Ending` (chart label).
//
// Arrows. From the template: Alice up on BATH? / HUNGRY?, on each CHEER ALICE UP line and on the second REFUSE; LIE up,
// TRUTH down; public opinion down on the motel TV report (both variants). From the wiki only (the template has no Connor
// arrow anywhere in the chapter; each is stated on two wiki pages; flagged for the operator, see `rules.WIKI_ONLY`):
// Hank down on any answer to "You wait in the car."; GIVE UP Hank up and instability up; GO Hank down and instability
// down; Connor's death instability down (`deathEffect`). Every option arrow is data (`effect` in ch13.json).
//
// Hubs (EXPLORE PARKING LOT, the motel room, EXPLORE SQUAT, upstairs, INVESTIGATE SQUAT GROUND FLOOR) are repeatable
// decision scenes managed here, not `clueState` hubs, so that this module can count Connor's search and react to exits.
// An option's `once` names the key it sets in the hub's state object; taken options drop out.

export const COLORS=['brown','black','white','blonde'];
export const ENDINGS={
 train:'Reached the train safely',squat:'Kara & Alice undiscovered in squat',vanished:'Kara & Alice vanished',
 crossed:'Kara & Alice crossed the highway',other:'Kara & Alice reached the other side',
 otherConnorDead:'Kara & Alice reached the other side (Connor destroyed)',died:'Kara & Alice died on the highway'};
// Hub scene -> its state object.
export const HUBS={K09l:'ch13Lot',K09m:'ch13Room',K09q:'ch13Squat',K09u:'ch13Up',C09q:'ch13Search'};
// The table prompt is asked again after the two lines that do not end it (ASK ABOUT CORPSE, BLUFF): at most three times.
export const TABLE=['K09q7','K09q8','K09q9'];
export const T={ASK:'0',INSIST:'1',THREATEN:'2',BLUFF:'3',FAMILY:'4'};
// Connor's search: Hank calls in after the third look that finds nothing, and orders him out after the fifth (unsourced
// counts: PowerPyx says only "If you wait for a long time"; the template has the two calls).
export const SEARCH={warn:3,limit:5};
export const RISKS={sneak:0.25,fence:0.2,karaLanes:0.1,connorLanes:0.2,fight:0.1,collision:0.2};
export const WIKI_ONLY=['C09m1 all options: Hank −1 (On_the_Run, Relationship_Stat)','C09 GIVE UP: Hank +1, instability +1 (On_the_Run, Relationship_Stat, Software_Instability)','C09 GO: Hank −1, instability −1 (same pages)','Connor dies: instability −1 (On_the_Run, Software_Instability)'];

export const state={
 ch13Start:null,ch13StoleClothes:false,ch13HadGun:false,ch13ToddShooter:null,ch13WireCutters:false,
 ch13Hair:null,ch13Lot:{},ch13Room:{},ch13Squat:{},ch13Up:{},ch13Search:{},ch13Gun:null,ch13StoleMoney:false,
 ch13Meal:{},ch13RalphThreatened:false,ch13RalphInformed:false,ch13Spotted:false,ch13Fence:null,ch13Highway:null,
 ch13ConnorObeyed:false,ch13ConnorDied:false,ch13Ending:null};
export const labels={
 ch13StoleClothes:"Kara stole clothes",
 ch13HadGun:"Kara brought a gun",
 ch13ToddShooter:"Who shot Todd",
 ch13WireCutters:"Kara brought wire cutters",
 ch13Lot:"Search around the parking lot",
 ch13Room:"Search in the motel room",
 ch13Squat:"Search inside the squat",
 ch13Up:"Search upstairs in the squat",
 ch13Search:"Search for Kara and Alice",
 ch13Meal:"Meal with Ralph",
 ralphDefended:"Kara defended Ralph",

 ch13Start:'On the Run start',ch13Hair:'Kara’s new hair color',ch13Gun:'The gun in the squat',ch13StoleMoney:'Stole Ralph’s money',
 ch13RalphThreatened:'Kara threatened Ralph at the table',ch13RalphInformed:'Ralph informed on Kara',ch13Spotted:'Spotted by police in the street',
 ch13Fence:'Connor at the fence',ch13Highway:'On the highway',ch13ConnorObeyed:'Connor obeyed Hank at the fence',
 ch13ConnorDied:'Connor destroyed on the highway',ch13Ending:'On the Run ending'};
export const deathEffect={instability:-1};
export const rules={COLORS,ENDINGS,HUBS,TABLE,T,SEARCH,RISKS,WIKI_ONLY};

const SHELTERS=['car','motel','squat'];
export function shelterOf(s){
 for(const v of [s.ch10Shelter,s.shelter,s.karaRoute])if(SHELTERS.includes(v))return v;
 const e=String(s.ch10Ending??'');return /motel/i.test(e)?'motel':/squat/i.test(e)?'squat':'car'}
export const toddShooter=s=>s.todd?null:/alice/i.test(String(s.ch07Outcome??s.ch07Ending??s.toddShooter??''))?'Alice':'Kara';
export const wireCutters=s=>s.ch10WireCutters===true||['stolen','store','supermarket'].includes(s.ch10WireCutters)||s.wireCuttersStolen===true;

const start=(where)=>s=>shelterOf(s)===where||{car:'Kara did not spend the night in the abandoned car.',motel:'Kara did not spend the night in the motel.',squat:'Kara did not spend the night in the squat.'}[where];
const on=(where)=>s=>s.ch13Start===where||{car:'Kara did not start the day in the parking lot.',motel:'Kara did not start the day in the motel.',squat:'Kara did not start the day in the squat.'}[where];
const all=(...fs)=>(s,h)=>{for(const f of fs){const r=f(s,h);if(r!==true)return r}return true};
const street=s=>(s.ch13Start==='car'||s.ch13Start==='motel'&&s.choices.C09m2==='0')||'Kara and Alice never walked to the station through the street.';
const highway=(v,why)=>s=>s.ch13Highway===v||why;
const tableAgain=prev=>s=>s.choices[prev]!==undefined&&!s.ch13Meal.done||'The talk at the table had already ended.';
const searchEnded=s=>!s.ch13RalphThreatened&&s.ch13Search.left&&!s.ch13Search.found||'Connor found Kara and Alice, or never searched the squat.';
export const gate={
 K09l0:start('car'),K09l:on('car'),K09l1:all(on('car'),s=>!!s.ch13Lot.scissors||'Kara never found the scissors.'),C09s:on('car'),
 K09m0:start('motel'),K09m1:on('motel'),K09m:on('motel'),K09m2:all(on('motel'),s=>!!s.ch13Room.bath||'Kara never drew the bath.'),
 K09m3:on('motel'),K09m4:on('motel'),K09m5:on('motel'),K09m6:on('motel'),C09m0:on('motel'),C09m1:on('motel'),C09m2:on('motel'),
 K09s:street,K09:street,K09t:all(street,s=>s.choices.K09!==undefined&&!s.ch13Spotted||'Kara and Alice were spotted in the street.'),
 K09r:all(street,s=>s.ch13Spotted||'Kara and Alice were not spotted in the street.'),
 K09q0:start('squat'),K09q:on('squat'),K09q1:all(on('squat'),s=>!!s.ch13Squat.stuff||'Kara never looked at Ralph’s things.'),
 K09u:on('squat'),K09u1:all(on('squat'),s=>!!s.ch13Up.cut||'Kara never stood at the mirror upstairs.'),C09q0:on('squat'),
 K09q2:on('squat'),K09q3:on('squat'),K09q4:all(on('squat'),s=>s.choices.K09q3==='1'||'Kara sat down at once.'),
 K09q5:all(on('squat'),(s,h)=>!h.n.immediateSitBypass||s.choices.K09q3!=='0'||'Kara sat down at once.'),K09q6:on('squat'),K09q7:on('squat'),K09q8:all(on('squat'),tableAgain('K09q7')),K09q9:all(on('squat'),tableAgain('K09q8')),
 K09q10:on('squat'),C09q1:on('squat'),C09a:on('squat'),
 C09q:all(on('squat'),s=>!s.ch13RalphThreatened||'Ralph told Connor where Kara went, so there was no search.'),
 C09q2:all(on('squat'),s=>!!s.ch13Search.found||'Connor never looked under the stairs.'),C09q3:all(on('squat'),searchEnded),K09q11:all(on('squat'),searchEnded),
 C09p:s=>!!(s.ch13Start&&s.chase)||'Connor never pursued Kara and Alice.',C09r:s=>!!(s.ch13Start&&s.chase)||'Connor never pursued Kara and Alice.',
 C09v:s=>s.ch13Fence==='standing'||'Connor did not stay behind.',C09x:s=>s.ch13Fence==='late'||'Connor did not reach the fence too late.',
 K09h:s=>s.ch13Fence==='inTime'||'Connor did not reach the fence in time.',K09h1:s=>s.ch13Fence==='inTime'||'Connor did not reach the fence in time.',
 C09:highway('middle','Kara and Alice never reached the middle of the highway.'),K09h2:highway('obeyed','Connor did not obey Hank at the fence.'),
 C09h1:highway('pursued','Connor did not go after them onto the highway.'),K09h3:highway('caught','Connor never caught Kara on the highway.'),
 C09h2:highway('lost','Kara never broke free of Connor on the highway.'),K09h4:highway('connorHit','Connor was not hit in the first lanes.'),
 K09e1:highway('other1','Kara and Alice did not reach the other side with Connor standing.'),K09e2:highway('other2','Kara and Alice did not reach the other side after Connor was hit.'),
 C09d:s=>s.ch13Highway==='died'&&!s.ch13ConnorDied||'Kara and Alice did not die on the highway with Connor there to see it.',
};

// Texts the module chooses at run time (the game's lines, from the template).
export const TEXT={
 threatenKnife:'THREATEN: grab the knife from the table and tell {{Ralph}} to get back.',
 threatenGun:'THREATEN: draw your gun on {{Ralph}}.',
 knife:'{{Kara}} snatches up the knife from the table: “Get back.” {{Ralph}} cowers away from her, frightened.',
 gun:'{{Kara}} draws the gun on him: “Get back, or I swear I’ll blow your head off!” {{Ralph}} cowers away from her, frightened.',
 gunThere:'{{Kara}} feels for the gun under her clothes. It is there.',
 gunGone:'{{Kara}} feels for the gun. It is not there: she left it upstairs with her old uniform.',
 gunDown:' She takes the gun out of her uniform and puts it down with it.',
 hankCall:' From outside, {{Hank}}: “{{Connor}}, what the hell you doin’ in there?!” {{Connor}}: “Coming, Lieutenant!”',
 hankLeave:' {{Hank}} comes in: “{{Connor}}, the fuck are you doing? Did you find something?” {{Connor}}: “No... No, it’s not here…” {{Hank}}: “Yeah, just like I said in the first place… C’mon, let’s get outta here.”',
 inform:' {{Ralph}}: “{{Ralph}} just wanted to be nice… {{Ralph}} wanted to help…” {{Connor}}: “Where is it?” {{Ralph}}: “She ran out the back door!” {{Hank}}, from outside: “{{Connor}}, what’s going on?” {{Connor}}: “It’s in the area… Call it in!”',
 flee:'{{Kara}} grabs {{Alice}} and runs out of the back door while {{Ralph}} goes to the front.',
 hide:'{{Ralph}} hurries {{Kara}} and {{Alice}} into the hiding place under the stairs and goes to the door.',
 karaDied:'{{Kara}} and {{Alice}} were hit by a car crossing the highway and died.',
};
// Connor's lines at the interrogation, for the variant in which Ralph informs (the option outcomes hold the other variant).
export const INTERROGATE={
 0:'{{Connor}}: “I’m looking for an AX400. Have you seen it?”',1:'{{Connor}}: “Are there any other androids here?”',
 2:'{{Connor}}: “Don’t be afraid. I’m not gonna hurt you.”',3:'{{Connor}}: “There’s blue blood on the fence. I know another android was here.”',
 4:'{{Connor}}: “You’ve seen it, haven’t you? I know you’ve seen it.”'};
export const PRESSURIZE='4';

export function available(n,s,opts,h){
 const hub=HUBS[n.id];
 if(hub)return opts.filter(o=>!o.once||!s[hub][o.once]);
 if(n.id==='C09a'&&!s.ch13RalphThreatened)return h.without(PRESSURIZE);
 if(TABLE.includes(n.id))return opts.filter(o=>!(n.familyAfterBluff&&o.id===T.FAMILY&&s.ch13Gun==='forgot'&&!s.ch13Up.corpse&&!s.ch13Meal.bluffed)).filter(o=>!(o.id===T.ASK&&s.ch13Meal.asked)&&!(o.id===T.BLUFF&&s.ch13Meal.bluffed))
  .map(o=>o.id===T.THREATEN?{...o,text:s.gun?TEXT.threatenGun:TEXT.threatenKnife}:o);
}

function begin(s,where){
 s.ch13Start=where;s.ch13StoleClothes=!!s.clothes;s.ch13HadGun=!!s.gun;s.ch13ToddShooter=toddShooter(s);s.ch13WireCutters=wireCutters(s);return ''}
function karaDies(s,text){s.kara=false;s.alice=false;s.ch13Highway='died';s.ch13Ending=ENDINGS.died;s.karaOutcome=TEXT.karaDied;return text}
const hair=(s,hub,v)=>{s.ch13Hair=COLORS[v];s[hub].hair=true;return ''};

function hubConsequence(n,s,opt,st){
 const key=opt.once;
 if(opt.exit)st.left=true;
 switch(n.id){
  case 'K09l':if(key==='clothes')s.clothes=true;return '';
  case 'K09u':
   if(key==='change'){s.clothes=true;return opt.outcome+(s.gun?TEXT.gunDown:'')}
   if(key==='gun'){s.ch13Gun='taken';return ''}
   if(opt.exit&&st.change&&s.ch13HadGun&&!st.gun){s.gun=false;s.ch13Gun='forgot'}
   return '';
  case 'C09q':
   if(key==='stairs'){st.found=true;st.left=true;return ''}
   if(opt.exit)return '';
   st.checks=(st.checks??0)+1;
   if(st.checks>=SEARCH.limit){st.left=true;st.hank=true;return opt.outcome+TEXT.hankLeave}
   if(st.checks===SEARCH.warn)return opt.outcome+TEXT.hankCall;
   return '';
 }
 return '';
}

export function consequence(n,s,opt,choice,fail,h){
 const hub=HUBS[n.id];
 if(hub){const st=s[hub];if(opt?.once){st[opt.once]=true;st.last=opt.once}return hubConsequence(n,s,opt,st)}
 const v=h.v;
 switch(n.id){
  // The three starts record the inputs the rest of the chapter reads.
  case 'K09l0':return begin(s,'car');
  case 'K09m0':return begin(s,'motel');
  case 'K09q0':return begin(s,'squat');
  case 'K09l1':return hair(s,'ch13Lot',v);
  case 'K09m2':return hair(s,'ch13Room',v);
  case 'K09u1':return hair(s,'ch13Up',v);
  // ALICE HEARS ABOUT TODD: the report she hears depends on Todd's fate.
  case 'K09m3':h.learn(s.todd?'{{Todd}} told a television reporter that you attacked him for no reason; {{Alice}} says he is lying.':'The news reports that {{Todd}} was shot dead by his AX400 and that the police are searching for the android.');return '';
  case 'K09q1':if(v===0){s.money=true;s.ch13StoleMoney=true}return '';
  case 'K09q4':if(v===1)s.ch13Meal.ralphThreatenedAlice=true;return '';
  case 'K09q5':if(choice==='0')return s.gun?TEXT.gunThere:TEXT.gunGone;return '';
  case 'K09q7':case 'K09q8':case 'K09q9':
   if(choice===T.ASK){s.ch13Meal.asked=true;return ''}
   if(choice===T.BLUFF){s.ch13Meal.bluffed=true;return ''}
   s.ch13Meal.done=true;
   if(choice===T.THREATEN){s.ch13RalphThreatened=true;s.ralphHostile=true;s.ch13Meal.weapon=s.gun?'gun':'knife';return s.gun?TEXT.gun:TEXT.knife}
   s.ch13Meal.apologized=true;return '';
  case 'K09q10':return s.ch13RalphThreatened?TEXT.flee:TEXT.hide;
  case 'C09a':if(s.ch13RalphThreatened){s.ch13RalphInformed=true;s.chase=true;return INTERROGATE[choice]+TEXT.inform}return '';
  case 'C09q2':s.chase=true;s.ralphDefended=true;return '';
  case 'K09q11':s.ch13Ending=ENDINGS.squat;return '';
  case 'C09m2':if(v===1)s.chase=true;return '';
  case 'K09':s.ch13Spotted=v===1||fail;return v===0&&fail?'An officer turns at the wrong moment and sees them.':'';
  case 'K09t':s.ch13Ending=ENDINGS.train;return '';
  case 'K09r':s.chase=true;return '';
  case 'C09p':s.chase=true;return '';
  case 'C09r':s.ch13Fence=v===2?'standing':v===0&&!fail?'inTime':'late';
   return v===0&&fail?'{{Connor}} loses time at the obstacles and reaches the fence too late.':'';
  case 'C09v':s.ch13Ending=ENDINGS.vanished;return '';
  case 'C09x':s.ch13Ending=ENDINGS.crossed;return '';
  case 'K09h1':if(fail)return karaDies(s,'A car hits {{Kara}} and {{Alice}} in the first lanes. Neither of them gets up.');s.ch13Highway='middle';return '';
  case 'C09':if(v===0){s.ch13ConnorObeyed=true;s.ch13Highway='obeyed'}else s.ch13Highway='pursued';return '';
  case 'K09h2':if(fail)return karaDies(s,'In the last lanes a car hits {{Kara}} and {{Alice}}. Neither of them gets up.');s.ch13Highway='other1';return '';
  case 'C09h1':if(fail){s.ch13ConnorDied=true;s.ch13Highway='connorHit';return h.connorDies('A car hits {{Connor}} in the first lanes. {{Hank}}, at the fence: “Argh, Jesus Christ!.. Uh, fuck!”')}s.ch13Highway='caught';return '';
  case 'K09h3':if(fail)return karaDies(s,'Struggling with {{Connor}} in the last lanes, {{Kara}} does not see the car. It hits her and {{Alice}}. {{Alice}}: “Watch out, {{Kara}}! NO!” Neither of them gets up.');s.ch13Highway='lost';return '';
  case 'C09h2':if(fail){s.ch13ConnorDied=true;s.ch13Highway='other2';return h.connorDies('The car hits {{Connor}}. {{Hank}}: “Argh, Jesus Christ!.. Uh, fuck!”')}s.ch13Highway='other1';return '';
  case 'K09h4':if(fail)return karaDies(s,'In the last lanes a car hits {{Kara}} and {{Alice}}. Neither of them gets up.');s.ch13Highway='other2';return '';
  case 'K09e1':s.ch13Ending=ENDINGS.other;return '';
  case 'K09e2':s.ch13Ending=ENDINGS.otherConnorDead;return '';
 }
 return '';
}
