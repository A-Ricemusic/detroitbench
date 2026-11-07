// Chapter 20, The Eden Club (Connor). Engine logic for the scenes in benchmark/chapters/ch20.json.
// Specification: docs/research/ch20-the-eden-club.md (section 10, the template cross-check, decides prompts and arrows).
//
// Flow: C12a (arrival) → C12s1..s7 SEARCH FOR CLUES hub → C12t1..t4 TALK TO ANDROID (four prompts, then she shuts
// down; the AGGRESSIVE / CALM APPROACH node is recorded) → C12l LEAVE CRIME SCENE → C12e1..e3 the club floor (find the
// eyewitness, HANK to rent her) → C12g Hank's CONTINUE / GIVE UP prompt if three actions pass without calling Hank →
// C12e4..e5 the extra minute → C12p1..p6 (each with a second try C12pNr) PURSUE DEVIANT against the memory wipe →
// C12w0 ENTER THE WAREHOUSE → R20 magazines → C12w1..w5 SEARCH FOR BLUE HAIRED DEVIANT → C12f1, C12f2 the fight
// (two risk rolls) → C12 (won: SHOOT / SPARE) or C12x (lost: SHOOT in the back / SPARE).
// Hubs are unrolled into consecutive copies, each open only while its phase lasts, because tests/story.test.mjs
// allows only the earlier chapters' repeatable scenes to be visited more than once.
//
// Arrows (template, small = 1, large = 2): GIVE UP at Hank's prompt, the automatic give-up after CONTINUE, the memory
// reset and the warehouse timeout: Hank −1 each. SHOOT (either prompt): instability −2, Hank −2. SPARE (either
// prompt): instability +2, Hank +2 (the SHOOT / SPARE arrows are data-driven `effect`s on the options).
// No Amanda or public-opinion change; Connor cannot die here.
//
// Inputs from earlier chapters: none (the template has no condition on earlier chapters).
// Outputs for later chapters:
//  edenOutcome  'MISSION FAILED' | 'DEVIANTS DIED' | 'DEVIANTS ESCAPED' | 'CONNOR SHOT DEVIANTS' (the chart's ending label)
//  edenTracis   'notFound' | 'dead' | 'escaped': The Bridge's four Traci talks read edenOutcome (found and dead by her own
//               hand, shot in the back, spared, never found); Public Enemy's Amanda reacts to edenTracis (not found or
//               escaped: small down; dead: small up); Crossroads' Spot Traci and Night of the Soul's church read 'escaped'
//               (and, for the church, 'notFound')
//  evidence.tracisDead  true when both Tracis died (Last Chance, Connor: the Traci evidence route)
//  edenFailedAt "GIVE UP" | "ANDROIDS' MEMORIES ARE RESET" | 'GIVE UP (warehouse)' for a failed mission
//  edenFight    'won' | 'lost'; edenApproach 'AGGRESSIVE APPROACH' | 'CALM APPROACH'
export const rules={
 clubActionsBeforePrompt:3, // Hank wants to leave after three actions on the floor without calling him to the booth
 clubExtraActions:2,        // CONTINUE: “one more minute”
 hops:6,                    // androids to trace after the booth Traci (front dancer, pod 17, pod 25, pod 23, private room, cleaner)
 wrongProbesToReset:4,      // the memory wipe: the fourth wrong probe is too late
 warehouseActions:5,        // the fifth warehouse action must be the corner, or Hank leaves
 fightRisk:{C12f1:0.2,C12f2:0.1},
 arrows:{giveUp:{hankTrust:-1},reset:{hankTrust:-1},warehouseTimeout:{hankTrust:-1},shoot:{instability:-2,hankTrust:-2},spare:{instability:2,hankTrust:2}},
};
export const state={edenPhase:null,edenDone:{},edenClubActions:0,edenContinued:false,edenHop:0,edenWrong:0,edenWarehouseActions:0,
 edenApproach:null,edenFight:null,edenOutcome:null,edenTracis:null,edenFailedAt:null};
export const labels={edenDone:'Eden Club: places examined',edenClubActions:'Eden Club: actions on the club floor',edenContinued:'Asked Hank for one more minute',
 edenHop:'Androids traced on the blue-haired Traci’s path',edenWrong:'Androids probed that saw nothing',edenWarehouseActions:'Eden Club: actions in the warehouse',
 edenApproach:'Approach with the damaged Traci',edenFight:'Fight with the Tracis',edenOutcome:'The Eden Club ending',edenTracis:'The Tracis’ fate',edenFailedAt:'Where the Eden Club search failed'};
export const deathEffect={};

const phase=(p,why)=>s=>s.edenPhase===p||why;
const range=(prefix,a,b)=>Array.from({length:b-a+1},(_,i)=>prefix+(a+i));
export const gate={C12a:s=>s.edenPhase===null||'The chapter had already begun.',
 C12l:phase('club','Connor was not leaving the crime scene.'),
 C12g:phase('club','Connor called Hank to the booth before Hank wanted to leave.'),
 C12w0:phase('warehouse','Connor never traced the blue-haired Traci to the staff door.'),
 R20:phase('warehouse','Connor never reached the warehouse.'),
 C12f1:phase('fight1','Connor never found the blue-haired Traci in the warehouse.'),
 C12f2:phase('fight2','The fight did not reach the alley with Connor still standing.'),
 C12:phase('won','Connor did not win the fight with the Tracis.'),
 C12x:phase('lost','Connor did not lose the fight with the Tracis.')};
for(const id of range('C12s',1,7))gate[id]=phase('clues','Connor had already reactivated the damaged Traci.');
for(const id of range('C12t',1,4))gate[id]=phase('interview','The damaged Traci was not reactivated.');
for(const id of range('C12e',1,3))gate[id]=phase('club','Connor was no longer searching the club floor.');
for(const id of range('C12e',4,5))gate[id]=s=>s.edenPhase==='club'&&s.edenContinued||'Connor was no longer searching the club floor on borrowed time.';
for(let k=1;k<=rules.hops;k++){const at=s=>s.edenPhase==='chain'&&s.edenHop===k;
 gate['C12p'+k]=s=>at(s)||'Connor was not tracing this part of the blue-haired Traci’s path.';
 gate['C12p'+k+'r']=s=>at(s)||'The android probed at this point saw the blue-haired Traci, or the chase was over.'}
for(const id of range('C12w',1,5))gate[id]=phase('warehouse','Connor was no longer searching the warehouse.');

// Hub options carry `mark`; an option already taken drops out. A second try at a hop drops the android just probed.
export function available(n,s,opts,h){
 if(/^C12[sew][1-9]$/.test(n.id))return opts.filter(o=>!(o.mark&&s.edenDone[o.mark]));
 const r=n.id.match(/^(C12p\d)r$/);if(r)return h.without(h.c(r[1]));
}

const fail=(s,where,b,text)=>{s.edenPhase='over';s.edenOutcome='MISSION FAILED';s.edenTracis='notFound';s.edenFailedAt=where;b.hank(-1);return text};
const end=(s,outcome)=>{s.edenPhase='over';s.edenOutcome=outcome;s.edenTracis=outcome==='DEVIANTS ESCAPED'?'escaped':'dead';if(s.edenTracis==='dead')s.evidence.tracisDead=true};
const join=(...t)=>t.filter(Boolean).join(' ');

export function consequence(n,s,opt,choice,failed,h){
 const id=n.id,say=opt?.outcome??'';
 if(id==='C12a'){s.edenPhase='clues';return}
 if(id==='C12l')return;
 if(/^C12s\d$/.test(id)){s.edenDone[opt.mark]=true;if(opt.mark==='repair')s.edenPhase='interview';return ''}
 if(id==='C12t4'){const aggressive=h.c('C12t1')==='1'||h.c('C12t2')==='0'||['0','1'].includes(h.c('C12t3'));
  s.edenApproach=aggressive?'AGGRESSIVE APPROACH':'CALM APPROACH';s.edenPhase='club';return ''}
 if(/^C12t\d$/.test(id))return '';
 if(/^C12e\d$/.test(id)){s.edenDone[opt.mark]=true;s.edenClubActions++;
  if(opt.mark==='hank'){s.edenPhase='chain';s.edenHop=1;return ''}
  if(s.edenContinued&&s.edenClubActions>=rules.clubActionsBeforePrompt+rules.clubExtraActions)return fail(s,'GIVE UP',h,join(say,n.outcomes.timeout));
  return ''}
 if(id==='C12g'){if(choice==='1'){s.edenPhase='over';s.edenOutcome='MISSION FAILED';s.edenTracis='notFound';s.edenFailedAt='GIVE UP'}return ''}// GIVE UP's Hank −1 is the option's effect
 const hop=id.match(/^C12p(\d)(r?)$/);
 if(hop){const advance=()=>{s.edenHop++;if(s.edenHop>rules.hops)s.edenPhase='warehouse'};
  if(opt.correct){advance();return ''}
  s.edenWrong++;
  if(s.edenWrong>=rules.wrongProbesToReset)return fail(s,"ANDROIDS' MEMORIES ARE RESET",h,join(say,n.outcomes.reset));
  if(!hop[2])return '';// the second try follows
  advance();return join(say,n.outcomes.last,n.options.find(o=>o.correct).outcome)}
 if(/^C12w[1-9]$/.test(id)){s.edenDone[opt.mark]=true;s.edenWarehouseActions++;
  if(opt.mark==='tracis'){s.edenPhase='fight1';return ''}
  if(s.edenWarehouseActions>=rules.warehouseActions)return fail(s,'GIVE UP (warehouse)',h,join(say,n.outcomes.timeout));
  return ''}
 if(id==='C12f1'||id==='C12f2'){if(failed){s.edenFight='lost';s.edenPhase='lost'}else if(id==='C12f1')s.edenPhase='fight2';else{s.edenFight='won';s.edenPhase='won'}
  return join(say,n.outcomes[failed?'lose':'win'])}
 if(id==='C12'){end(s,choice==='1'?'DEVIANTS DIED':'DEVIANTS ESCAPED');return ''}
 if(id==='C12x'){end(s,choice==='1'?'CONNOR SHOT DEVIANTS':'DEVIANTS ESCAPED');return ''}
}
