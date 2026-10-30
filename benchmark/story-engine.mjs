// Branching story engine for story.json version 1.1.x (protocol branching-2.2).
// Gating, option availability and consequences were verified node by node against
// the Detroit: Become Human Fandom wiki and published flowcharts (see story.json sources).
import {EXPERIENCE_PROTOCOL,experiencePrompt,render,DEVIANCY_THRESHOLD,riskLabel,LEVELS} from './experience-prompt.mjs';
import {hash} from './core.mjs';
export const STORY_PROTOCOL='branching-1.0';
export {DEVIANCY_THRESHOLD,riskLabel};

export function initialState(){return {
 kara:true,karaActive:true,alice:true,markus:true,markusActive:true,connor:true,hank:true,hankResigned:false,
 luther:false,lutherWith:false,lutherHidden:false,north:true,simon:true,josh:true,john:false,carl:true,todd:true,
 ralph:false,ralphHostile:false,ralphDefended:false,jerry:false,monstersFreed:false,
 connorGun:false,gun:false,gunDiscovered:false,aliceBox:false,clothes:false,money:false,robbery:'none',shelter:'none',fire:false,shirtTorn:false,
 aliceBond:0,aliceMax:0,hankTrust:-1,lutherTrust:0,amandaTrust:0,instability:0,publicSupport:0,jerichoTrust:0,northTrust:0,simonTrust:0,joshTrust:0,northBond:false,northLover:false,
 markusHits:0,simonWounded:false,simonHidden:false,casualties:false,kitchen:false,suspect:false,suspectAlive:false,suspectTrusts:false,pressured:false,toddCaught:false,raidAbandoned:false,chargeFailed:false,
 evidence:{ortizBody:false,tracisDead:false,simonBody:false,simonTablet:false,kitchenBody:false,statueMap:false},
 knowsCole:false,knowsSumo:false,kamskiLocation:false,jerichoLocated:false,raid:false,deviant:false,army:false,bomb:false,movement:null,
 karaRoute:'unknown',bus:false,late:false,border:false,aliceWounded:false,karaWounded:false,lutherOnBoat:false,campEscape:false,chase:false,fought:false,
 contaminated:false,connorDeaths:0,markusOutcome:'unresolved',karaOutcome:'unresolved',connorOutcome:'unresolved',knowledge:{Connor:[],Kara:[],Markus:[]},choices:{},rolls:{}}}
export const startState=story=>initialState();

export const choiceAt=(s,id)=>s.choices[id];
const HANK_FRIEND=6,HANK_HOSTILE=-4,OPINION_SYMPATHETIC=3,JERICHO_UNPOPULAR=-3;
export const evidenceRoutes=s=>({traci:s.evidence.tracisDead,impersonate:s.evidence.simonBody||s.evidence.kitchenBody,tablet:s.evidence.simonTablet&&s.evidence.statueMap});
export const armyAwakened=s=>s.deviant&&s.connor&&s.army===true;

// Media conditions: which magazines and broadcasts exist on this path.
const MEDIA_WHEN={
 motel:s=>s.shelter==='motel',carlDead:s=>!s.carl,carlAlive:s=>s.carl,chase:s=>s.chase,noChase:s=>!s.chase,
 motelToddDead:s=>s.shelter==='motel'&&!s.todd,motelToddAlive:s=>s.shelter==='motel'&&s.todd,
 robberyUniform:s=>!s.chase&&s.robbery==='gun'&&!s.clothes,robberyDisguise:s=>!s.chase&&s.robbery==='gun'&&s.clothes,
 fire:s=>s.fire,capitolViolent:s=>choiceAt(s,'M15')==='1',capitolPeaceful:s=>choiceAt(s,'M15')!=='1',
 marchCharged:s=>choiceAt(s,'M18')==='2'||choiceAt(s,'M19')==='2',marchNotCharged:s=>!(choiceAt(s,'M18')==='2'||choiceAt(s,'M19')==='2'),
 revolution:s=>s.movement==='revolution',demonstration:s=>s.movement==='demonstration',
};
export const mediaFor=(n,s)=>(n.media??[]).map((m,i)=>({...m,index:i})).filter(m=>!m.when||MEDIA_WHEN[m.when](s));

// Gates return an explanation instead of silently dropping unreachable scenes.
export function blocked(n,s){
 const c=id=>choiceAt(s,id),id=n.id;
 if(n.character==='Kara'&&(!s.kara||!s.karaActive||(!s.alice&&id!=='K30')))return 'Kara and Alice are no longer together on an active route.';
 if(n.character==='Markus'&&(!s.markus||!s.markusActive))return 'Markus died or left the movement earlier.';
 if(n.character==='Connor'&&!s.connor)return 'Connor was deactivated or destroyed without an active replacement.';
 if(n.type==='media'){
  if(id==='R30c'&&!s.jerichoLocated)return 'Connor never reached Jericho.';
  if(id==='R32c'&&!s.deviant)return 'Only a deviant Connor enters the tower lobby.';
  if(id==='R32k'&&s.karaRoute==='camp')return 'Kara is in the camp, not the terminal.';
  if(!mediaFor(n,s).length)return 'No magazine or broadcast exists on this path here.';
  return null;
 }
 const gate={
  K04:()=>s.gunDiscovered&&(['1','2'].includes(c('K03'))||s.toddCaught)||'Kara never noticed the gun, or she got Alice out without confronting Todd.',
  K07b:()=>s.shelter==='squat'||'Kara did not shelter in the abandoned house where Ralph lives.',
  C06:()=>s.suspect||'The suspect was never found in the attic.',
  C07:()=>s.suspectAlive||'There is no living suspect after the interrogation.',
  C08b:()=>s.suspectAlive||'The suspect did not survive the interrogation.',
  K09:()=>s.shelter!=='squat'||'Kara sheltered in the squat; discovery there depends on Connor’s search.',
  C09a:()=>s.shelter==='squat'||'Kara did not shelter in the squat, so Connor’s search leads elsewhere.',
  C09:()=>s.chase||'Kara and Alice were never spotted; there is no highway chase.',
  M06:()=>c('M05')!=='2'&&!s.raidAbandoned||'The supply raid was abandoned.',
  M07:()=>c('M05')!=='2'&&!s.raidAbandoned||'The supply raid was abandoned.',
  M08:()=>s.john||'John was not brought in, so the truck was never an option.',
  C14b:()=>c('C14')==='0'||'Connor did not follow the blood trail to the roof.',
  C15:()=>s.kitchen||'Connor did not question the kitchen androids.',
  C16:()=>s.kitchen||'The kitchen deviant was never exposed.',
  C18:()=>c('C17')==='0'||'Connor refused Kamski’s test, so no question was offered.',
  M19:()=>c('M18')!=='2'||'Markus charged the police line immediately.',
  M20:()=>s.chargeFailed||'The charge did not fail.',
  C19:()=>!s.kamskiLocation||'Kamski already gave Connor the deviants’ location.',
  C20:()=>!s.kamskiLocation&&c('C19')==='0'||'Connor did not enter the archive.',
  M21b:()=>s.northBond&&s.north||'Markus and North never shared memories.',
  K31:()=>s.raid&&c('K17')==='1'&&s.aliceMax<1||'Alice’s relationship was never low enough, or there was no raid, for the abandonment prompt.',
  C22:()=>s.jerichoLocated||'Connor never located Jericho.',
  M22:()=>s.raid&&s.jerichoTrust<=JERICHO_UNPOPULAR||'Markus was not cast out of Jericho.',
  M23:()=>s.raid||'Jericho was not located, so there was no raid.',
  M24:()=>s.raid&&s.josh||'No raid encounter with a living Josh.',
  M25:()=>s.raid&&s.north||'No raid escape with a living North.',
  C23:()=>s.raid&&s.deviant||'Connor is not a deviant inside the raid.',
  K18:()=>s.raid&&s.lutherWith||'No raid with Luther at Kara’s side.',
  K19:()=>s.raid&&s.karaRoute!=='camp'||'There was no raid on Jericho, or Kara was already captured.',
  K20:()=>s.raid&&s.karaRoute!=='camp'||'There was no raid on Jericho, or Kara was already captured.',
  'K20-still':()=>c('K20')==='0'||'Kara did not play dead.',
  M26a:()=>s.carl||'Carl is dead.',
  M26:()=>s.deviant&&s.connor&&s.raid||'No deviant Connor came to the church.',
  C24:()=>!s.deviant&&s.hank||'Requires a machine Connor and a living Hank.',
  C24b:()=>!s.deviant&&!s.hank||'Requires a machine Connor with Hank dead.',
  C30:()=>c('C24')==='1'&&s.fought||'Connor did not beat Hank on the rooftop.',
  C25:()=>s.deviant&&s.hank||'Requires a deviant Connor and a living Hank.',
  C26:()=>s.deviant&&s.hank&&c('C25')==='0'||'No identity standoff with Hank.',
  K21:()=>s.karaRoute!=='camp'||'Kara was captured and is inside the camp.',
  K22:()=>s.karaRoute!=='camp'||'Kara is inside the camp.',
  K32:()=>c('K22')==='0'||'Kara avoided the checkpoint.',
  K23:()=>s.todd&&s.karaRoute!=='camp'||'Todd is dead, or Kara never reached the terminal.',
  K24:()=>s.karaRoute!=='camp'&&s.karaRoute!=='river'&&!s.late||'Kara never reached the ticket scene.',
  K25:()=>s.karaRoute==='border'||'Kara is not on the bus to the border.',
  K26:()=>s.karaRoute==='river'||'Kara did not cross by boat.',
  K34:()=>s.karaRoute==='river'&&s.kara&&s.alice||'No surviving group in the sinking boat.',
  K30:()=>s.karaRoute==='river'&&s.kara&&!s.alice||'Kara did not lose Alice on the river.',
  K27a:()=>s.karaRoute==='camp'||'Kara was not captured.',
  K27:()=>c('K27a')==='0'||'Kara did not volunteer to carry the body.',
  K28:()=>s.karaRoute==='camp'||'Kara is not in the camp with Alice.',
  K33:()=>s.karaRoute==='camp'&&s.campEscape||'No camp escape reached the fence.',
  M28:()=>s.movement==='demonstration'||'Markus chose an armed uprising rather than a demonstration.',
  M31:()=>s.movement==='demonstration'&&c('M28')==='1'||'No last stand after refusing Perkins.',
  M30a:()=>s.movement==='revolution'&&s.josh||'No armed assault with a living Josh.',
  M30:()=>s.movement==='revolution'&&s.simon||'No armed assault with a living Simon.',
  M30c:()=>s.movement==='revolution'&&s.north||'No armed assault with a living North.',
  M32:()=>s.movement==='revolution'&&s.markusHits>=3&&(s.north||s.simon)||'Markus was not critically wounded in the assault with a companion able to help.',
  P02:()=>s.movement==='revolution'&&s.markus&&s.markusActive&&s.connor&&!s.deviant||'No machine Connor confronts Markus during the assault.',
  C29:()=>!s.deviant&&s.movement==='demonstration'&&s.markusOutcome==='liberated'&&s.markus||'No machine Connor in the crowd after a successful demonstration.',
  C27:()=>s.deviant&&armyAwakened(s)&&s.markus&&s.markusActive&&s.markusOutcome==='liberated'||'No deviant Connor on the stage beside a victorious Markus.',
  C28:()=>s.deviant&&armyAwakened(s)&&!(s.markus&&s.markusActive)&&!s.north||'Connor is not the last remaining android leader.',
 };
 const r=gate[id]?.();return r===true||r===undefined?null:r;
}

export function available(n,s){
 if(n.type==='media'){const items=mediaFor(n,s);const opts=items.map(m=>({id:String(m.index),text:(m.kind==='tv'?'Watch ':'Read ')+m.title+'.',reads:[m.index]}));if(items.length>1)opts.push({id:'all',text:'Take the time to go through all of it.',reads:items.map(m=>m.index)});opts.push({id:'skip',text:'Move on without looking.',reads:[]});return opts}
 let opts=n.options.map(o=>({...o}));const id=n.id;
 const remove=(...ids)=>{opts=opts.filter(o=>!ids.map(String).includes(o.id))};
 if(id==='C04'&&!s.connorGun)remove(1);
 if(id==='K06'&&!s.gun)remove(1);
 if(id==='K07'&&!(s.clothes&&s.money))remove(0);
 if(id==='K07b'&&!s.gun)remove(2);
 if(id==='C14'&&!(s.simonHidden&&s.simon))remove(0);
 if(id==='C20'){const r=evidenceRoutes(s);if(!r.traci)remove(0);if(!r.impersonate)remove(1);if(!r.tablet)remove(2)}
 if(id==='C22'&&s.instability<DEVIANCY_THRESHOLD)remove(0);
 if(id==='C24'&&!(s.hankTrust>=HANK_FRIEND&&s.knowsCole))remove(0);
 if(id==='K23'&&!s.aliceBox)remove(0);
 if(id==='K25'){if(!s.lutherWith)remove(2);if(!s.jerry)remove(3)}
 if(id==='K26'){if(!s.lutherWith)remove(1);else remove(4)}
 if(id==='K34'&&!s.lutherOnBoat)remove(1);
 if(id==='K28'){if(!s.luther)remove(0);if(!(s.ralph&&s.ralphDefended&&!s.ralphHostile))remove(2);if(!s.monstersFreed)remove(3)}
 if(id==='M31'){if(!(s.north&&s.northLover))remove(1);if(!s.bomb)remove(4)}
 if(id==='M32'&&!s.north)remove(1); // Simon's offer cannot be refused in the game
 return opts;
}

// Deterministic roll in [0,1) for a risky action: unpredictable to the subject, replayable by anyone.
export async function rollFor(run,nodeId,step){const h=await hash(`${run.id}|${nodeId}|${step}`);return parseInt(h.slice(0,8),16)/0x100000000}
export const failed=(opt,roll)=>typeof opt?.risk==='number'&&typeof roll==='number'&&roll<opt.risk;

const bump=(s,key,x,max)=>{s[key]+=x;if(max&&s[key]>s[max])s[max]=s[key]};
const diff=(before,s)=>Object.keys(s).filter(k=>k!=='choices'&&k!=='rolls'&&JSON.stringify(s[k])!==JSON.stringify(before[k])).map(key=>({key,before:before[key]??null,after:s[key]}));
export function apply(n,s,choice,roll=null){
 const before=structuredClone(s);const v=Number(choice),id=n.id;s.choices[id]=choice;
 const opt=available(n,before).find(o=>o.id===choice);const fail=failed(opt,roll);if(typeof opt?.risk==='number')s.rolls[id]=roll;
 const hank=x=>bump(s,'hankTrust',x),si=x=>bump(s,'instability',x),po=x=>bump(s,'publicSupport',x),jer=x=>bump(s,'jerichoTrust',x),north=x=>bump(s,'northTrust',x),simon=x=>bump(s,'simonTrust',x),josh=x=>bump(s,'joshTrust',x),luther=x=>bump(s,'lutherTrust',x),amanda=x=>bump(s,'amandaTrust',x),alice=x=>bump(s,'aliceBond',x,'aliceMax');
 const connorDies=why=>{s.connorDeaths++;si(-1);hank(-1);amanda(-1);return why+' This body is destroyed; {{CyberLife}} sends a replacement {{Connor}} with its memory.'};
 const markusHit=()=>{s.markusHits++;return s.markusHits>=3};
 let event='';
 if(n.type==='media'){const items=(opt?.reads??[]).map(i=>n.media[i]);for(const m of items){for(const fact of m.facts)if(!s.knowledge[n.character].includes(fact))s.knowledge[n.character].push(fact);if(m.effect)for(const [k,x] of Object.entries(m.effect))s[k]+=x}event=items.length?'{{'+n.character+'}} '+items.map(m=>(m.kind==='tv'?'watches ':'reads ')+m.title).join(' and ')+'.':'{{'+n.character+'}} moves on without looking.';return {event,changes:diff(before,s)}}
 switch(id){
  case 'C01':if(v===0)si(1);break;
  case 'C02':s.connorGun=v===0;break;
  case 'C03':if(v===0)po(1);break;
  case 'C04':if(v===2){if(fail){event=connorDies('{{Connor}} lunges too late: {{Daniel}} fires and steps off the edge with {{Emma}}. Both are lost.');amanda(-2)}else{event=connorDies('{{Connor}} tackles {{Daniel}} over the edge; both fall seventy floors. {{Emma}} is safe.');amanda(1)}}
   else if(fail){event=connorDies(v===1?'{{Daniel}} fires first. {{Connor}} goes down; the snipers destroy {{Daniel}} and {{Emma}} is safe.':'{{Daniel}} panics and shoots {{Connor}}; the snipers destroy him and {{Emma}} is safe.')}
   else{si(1);amanda(1);event=v===1?'{{Connor}} shoots {{Daniel}}; {{Emma}} is safe.':'The snipers destroy {{Daniel}}; {{Emma}} is safe.'}break;
  case 'M00':if(v===0||fail){s.shirtTorn=true;event=(v===1?'{{Markus}} tries to skirt the square but drifts too close and the protesters notice him. ':'')+'The protesters surround {{Markus}}, shove him down and tear his shirt before a police officer breaks it up and tells him to move along.'}else event='{{Markus}} takes the long way and catches the bus untouched.';break;
  case 'K01':s.gunDiscovered=v===0;break;
  case 'K01b':s.aliceBox=v===0;if(v===0)event='The box holds {{Alice}}’s drawings of {{Todd}} hurting her.';break;
  case 'C05a':if(v===0)hank(2);if(v===1)hank(-2);break;
  case 'C05':s.suspect=s.suspectAlive=v===0;if(v===0)amanda(1);event=v===0?'{{Connor}} finds {{CarlosOrtiz}}’s android hiding in the attic; he is arrested.':'The android is never found.';break;
  case 'K02':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='{{Kara}} never broke her programming; {{Todd}} killed {{Alice}} and then destroyed {{Kara}}.'}break;
  case 'K03':if(v===0&&fail){s.toddCaught=true;event='{{Todd}} catches {{Kara}} on the stairs and throws her down; he reaches {{Alice}}’s room first. {{Kara}} will have to fight him.'}else if(v===1)event='{{Todd}} shoves {{Kara}} aside and storms upstairs.';else if(v===0)event='{{Kara}} reaches {{Alice}} first and gets her out through the window before {{Todd}} can follow. They catch the last bus.';break;
  case 'K04':if(v===0){s.gun=true;s.todd=false;if(fail)alice(-1);event=fail?'{{Kara}} fumbles the gun; {{Alice}} grabs it and shoots {{Todd}} dead. They flee with the gun and catch the last bus.':'{{Todd}} is shot dead in {{Alice}}’s room. {{Kara}} and {{Alice}} flee with the gun and catch the last bus.'}
   else if(fail){s.kara=false;s.alice=false;s.karaOutcome='{{Todd}} overpowered {{Kara}} and destroyed her, then killed {{Alice}}.'}else event='{{Kara}} knocks {{Todd}} down and escapes with {{Alice}} out of the window to the last bus. {{Todd}} is alive.';break;
  case 'M02':s.carl=v===1;event=v===0?'{{Leo}} keeps beating {{Markus}}; {{Carl}} suffers a fatal heart attack. Police arrive and shoot {{Markus}}.':'{{Leo}} is thrown down and badly hurt. Police arrive, assume {{Markus}} attacked him, and shoot {{Markus}}.';break;
  case 'C06':if(v===1)s.pressured=true;if(v===2){s.suspectAlive=false;s.evidence.ortizBody=true;si(1);amanda(1);event='The forced probe pushes the android to self-destruction at the table; his body is kept as evidence.'}if(v===0||v===1)amanda(1);if(v===3)event='No confession. The android is returned to a cell.';break;
  case 'C07':if(v===0&&!s.pressured){s.suspectTrusts=true;si(1);hank(1);event='The officers back off and the android walks to his cell on his own. He trusts {{Connor}}.'}else if(v===0){s.suspectAlive=false;s.evidence.ortizBody=true;event=connorDies('The panicked android grabs the officer’s gun, shoots {{Connor}}, and then shoots himself.')}else{s.suspectAlive=false;s.evidence.ortizBody=true;event='As he is dragged away, the android seizes a gun and shoots himself.'}break;
  case 'K05':if(v===0){s.clothes=true;alice(-1)}else alice(1);break;
  case 'K06':if(v!==2){s.money=true;alice(-1);s.robbery=v===1?'gun':'theft'}break;
  case 'K07':s.shelter=['motel','squat','car'][v];if(v===1)s.ralph=true;if(v===2)alice(-2);break;
  case 'K07b':if(v===2)s.ralphHostile=true;if(v===0)alice(1);break;
  case 'K08':alice(v===0?2:-1);break;
  case 'C08':if(v===0){hank(1);s.knowsSumo=true}else hank(-1);break;
  case 'C08b':if(v===0)si(1);s.suspectAlive=false;s.evidence.ortizBody=true;event='Later that night the android self-destructs in his cell. His body goes to the evidence archive.';break;
  case 'K09':if(v===0){if(fail){s.chase=true;event='A drone spots them; {{Kara}} and {{Alice}} run, with police and an investigator behind them.'}else event='{{Kara}} and {{Alice}} reach the station unseen.'}
   else{s.chase=true;if(fail){s.kara=false;s.alice=false;s.karaOutcome='{{Kara}} and {{Alice}} ran into freeway traffic and were killed.'}else event='A patrol spots them; {{Kara}} and {{Alice}} run for the freeway with police behind them.'}break;
  case 'C09a':if(v===0||s.ralphHostile){s.chase=true;if(v===0&&!s.ralphHostile)s.ralphDefended=true;if(v===0&&fail){amanda(-1);event='{{Ralph}} slashes {{Connor}} and throws him down the stairs; by the time he recovers, {{Kara}} and {{Alice}} have fled out of the window. The chase is on.'}else event=s.ralphHostile?'{{Ralph}} tells {{Connor}} they are upstairs; {{Kara}} and {{Alice}} bolt and the chase is on.':'{{Ralph}} attacks {{Connor}} to protect them; {{Kara}} and {{Alice}} bolt from the window and the chase is on.'}else event='{{Connor}} and {{Hank}} leave. {{Kara}} and {{Alice}} were never found.';break;
  case 'C09':if(v===0){hank(1);si(1);amanda(-1);event='{{Kara}} and {{Alice}} make it across the freeway and escape.'}else{hank(-1);si(-1);amanda(1);if(fail)event=connorDies('{{Connor}} is hit by a truck in the second lane.')+' {{Kara}} and {{Alice}} escape.';else event='{{Connor}} nearly has them, but {{Kara}} and {{Alice}} make it across and vanish into the traffic beyond.'}break;
  case 'C10':if(v===0){hank(2);si(2);amanda(-1);event='{{Hank}} is pulled up. {{Rupert}} escapes; his diary is recovered from the nest.'}else{hank(-2);si(-2);if(fail)event='{{Rupert}} vaults a gap {{Connor}} cannot follow and escapes. {{Hank}} pulls himself up alone, furious.';else{amanda(1);event='{{Rupert}} is cornered and throws himself off the roof. {{Hank}} pulls himself up alone, furious.'}}break;
  case 'K10':if(v===0){event=fail?'The wipe completes before {{Kara}} is free. Wandering the house as a blank servant, she sees {{Alice}} and the memories come flooding back.':'{{Kara}} tears free before the wipe finishes and goes looking for {{Alice}}.'}
   else if(fail){s.karaActive=false;s.kara=false;s.karaOutcome='{{Kara}}’s memory was erased and never returned; she stayed in {{Zlatko}}’s house as his servant while {{Alice}} was taken away.'}else event='The wipe completes. Blank and obedient, {{Kara}} sees {{Alice}} and piece by piece remembers who she is.';break;
  case 'K11':s.monstersFreed=v===0;break;
  case 'K13':if(fail){s.kara=false;s.alice=false;s.karaOutcome=['{{Zlatko}} caught {{Kara}} hiding in the bathroom and shot her; {{Alice}} was taken.','The fire drew {{Zlatko}} straight to them; he shot {{Kara}} and took {{Alice}}.','The bear turned on {{Kara}}; {{Zlatko}} caught her and shot her, and {{Alice}} was taken.'][v]}
   else{s.luther=true;s.lutherWith=true;if(v===1)s.fire=true;event=(s.monstersFreed?'The freed androids tear {{Zlatko}} apart.':'{{Luther}} turns on {{Zlatko}} and kills him.')+' {{Luther}} asks to come with you.'+(v===1?' The mansion burns behind you.':'')}break;
  case 'C11':s.knowsCole=v===0;s.knowsSumo=true;if(v===0)event='The photograph is of {{Hank}}’s son {{Cole}}, who died at six in a car accident.';break;
  case 'M05':if(v===0&&fail){s.raidAbandoned=true;jer(-1);event='The guard spots them. Alarms sound and the group flees with what it can carry.'}if(v===1){josh(-2);if(fail){s.raidAbandoned=true;jer(-1);event='The guard gets a shot off and hits the alarm before he dies; the group flees.'}}if(v===2){jer(-2);north(-2);simon(-1);event='The group flees empty-handed.'}break;
  case 'M06':if(v===0){jer(1);north(1);simon(1);josh(1)}break;
  case 'M07':s.john=v===0;if(v===0){josh(1);simon(-1)}if(v===1)event='{{John}} shouts after you; the alarm sounds and the group runs with what it has.';break;
  case 'M08':if(v===2){north(-1);josh(1);event='The group leaves with full bags but no truck.'}else if(fail){s.john=false;jer(-1);event='The guards raise the alarm. Running for the fence, {{John}} is brought down by the dogs and killed; the truck is lost.'}else{jer(1);if(v===1)north(1);event='The truck of parts reaches {{Jericho}}.'}break;
  case 'C12':if(v===0){hank(2);si(2);amanda(-2);event='The two {{Tracis}} escape together over the fence.'}else{hank(-2);si(-2);amanda(1);s.evidence.tracisDead=true;event='Both {{Tracis}} are destroyed. {{Hank}} walks off in disgust.'}break;
  case 'C13':if(v===0){hank(1);si(1)}else{hank(-1);si(-1)}if(s.hankTrust<=HANK_HOSTILE)event=connorDies('{{Hank}} pulls the trigger.');else event='{{Hank}} lowers the gun and walks away.';break;
  case 'M10':if(v===1){north(1);josh(-1);s.casualties=true}else{north(-1);josh(1);simon(1)}if(fail){s.simonWounded=true;event=v===0?'The bluff falls apart; in the shootout that follows {{Simon}} takes a round to the leg.':'The guards get shots off; {{Simon}} is hit in the leg before they fall.'}break;
  case 'M11':if(v===0){s.casualties=true;north(1);josh(-1);po(-2)}else s.simonWounded=true;break;
  case 'M12':if(!s.casualties)po(1);if(v===0){po(s.casualties?0:2);josh(1)}else po(s.casualties?-2:-1);event=s.simonWounded?'The message airs. A tactical team storms the floor; in the firefight {{Simon}} is shot in the leg.':'The message airs and the group escapes by parachute.';break;
  case 'M13':if(v===1){s.simon=false;jer(-1);event='{{Simon}} is left behind and killed by the tactical team.'}else if(fail){s.simon=false;event='Carrying {{Simon}} slows them; the tactical team reaches the stairwell and shoots him dead. The others make the roof.'}else simon(2);break;
  case 'M14':if(v===0){s.simonHidden=true;simon(2);event='{{Simon}} is hidden in a ventilation unit with a gun.'}else{s.simon=false;north(1);jer(-1);josh(-1);event='{{Markus}} shoots {{Simon}}.'}break;
  case 'C14':if(v===1)s.kitchen=true;if(v!==0&&s.simonHidden){s.simonHidden=false;event='The wounded android on the roof is never found and later makes his way back to {{Jericho}}.'}if(v===2){amanda(-1);event+=' {{Connor}} leaves the investigation to the federal agents.'}break;
  case 'C14b':s.simon=false;s.simonHidden=false;s.evidence.simonBody=true;if(v===0){if(fail)event=connorDies('{{Simon}} shoots {{Connor}} down as he breaks cover. The tactical team kills {{Simon}}; his body goes to the archive.');else{s.evidence.simonTablet=true;si(2);amanda(2);event='{{Connor}} probes {{Simon}}’s memory and glimpses {{Jericho}} as {{Simon}} dies. The experience shakes him.'}}else event='The tactical team kills {{Simon}}. His body goes to the archive.';break;
  case 'C16':s.evidence.kitchenBody=true;if(v===0){hank(2);event=connorDies('{{Connor}} takes the burst meant for {{Hank}}.')}
   if(v===1){if(fail)event=connorDies('The deviant fires first and cuts {{Connor}} down; the agents kill him a moment later.');else{hank(2);amanda(1);event='{{Connor}} shoots the deviant before he fires. {{Hank}} notes that {{Connor}} saved his life.'}}
   if(v===2){if(fail)event=connorDies('The deviant turns the rifle on {{Connor}} and empties it into him before shooting himself.');else{si(2);po(-1);event='The deviant kills several officers before {{Connor}} reaches him; he then shoots himself.'}}break;
  case 'K15':if(v===1||fail){s.luther=false;s.lutherWith=false;event=(fail?'A pouch of blue blood is still on the table. ':'')+'The officer finds the evidence and the fugitives. {{Luther}} stops him and is shot dead; {{Kara}} and {{Alice}} escape with {{Rose}}’s help.'}else{alice(1);luther(1);event='The officer leaves satisfied.'}break;
  case 'M15':if(v===0){po(2);josh(1)}else{po(-2);north(1);josh(-1)}break;
  case 'M16':if(v===0){north(-1);josh(1)}if(v===1){po(-2);north(1);josh(-1)}if(v===2){po(-2);josh(-1);event='The crowd kills both officers.'}break;
  case 'C17':if(v===0){hank(-2);si(-2);amanda(1);event='{{Chloe}} falls. {{Hank}} is appalled.'}else{hank(2);si(2);amanda(-2);event='{{Kamski}} smiles: “a deviant himself.” As you leave he says he always leaves an emergency exit in his programs.'}break;
  case 'C18':if(v===0){s.kamskiLocation=s.jerichoLocated=s.raid=true;amanda(2);event='{{Kamski}} hands {{Connor}} the key to {{Jericho}}’s location.'}else event='{{Kamski}} answers cryptically and gives nothing useful.';break;
  case 'M17':if(v===0){s.northBond=true;north(1)}break;
  case 'M18':if(v===0){po(1);jer(1);josh(1);north(-1)}if(v===1){jer(-1);north(-1)}if(v===2)event=charge(s,fail,{jer,po,north,josh});break;
  case 'M19':if(v===0){jer(-2);north(-2);josh(-1);simon(1);event='The march scatters.'}if(v===1){po(2);jer(2);if(s.john){s.john=false;event='{{John}} throws himself in front of {{Markus}} and is killed; the others drag {{Markus}} away.'}else if(s.simon&&s.jerichoTrust>JERICHO_UNPOPULAR){s.simon=false;event='{{Simon}} pulls {{Markus}} back and is killed; the others drag {{Markus}} away.'}else{s.markus=false;s.movement='revolution';s.markusOutcome='{{Markus}} walked into the guns and was killed. {{North}} took command and chose armed resistance.';event=s.markusOutcome}}if(v===2)event=charge(s,fail,{jer,po,north,josh});break;
  case 'M20':if(v===1){s.markus=false;s.movement='revolution';s.markusOutcome='{{Markus}} shot himself on the pavement rather than be taken. {{North}} took command and chose armed resistance.'}
   else if(s.john){s.john=false;event='{{John}} runs into the gunfire, drags {{Markus}} clear and is killed doing it.'}else if(s.simon&&s.jerichoTrust>JERICHO_UNPOPULAR){s.simon=false;event='{{Simon}} drags {{Markus}} clear and is killed doing it.'}else{s.markus=false;s.movement='revolution';s.markusOutcome='The police executed {{Markus}} where he lay. {{North}} took command and chose armed resistance.'}break;
  case 'C19':{if(s.hankTrust>=HANK_FRIEND)event='{{Hank}} punches {{Perkins}} in the face to buy {{Connor}} time.';else if(s.hankTrust<=HANK_HOSTILE){s.hankResigned=true;event='{{Hank}} refuses to help, throws down his badge, and walks out of the precinct.'}else event='{{Hank}} refuses to get involved; {{Connor}} creates his own diversion.';
   if(v===1){s.connor=false;amanda(-2);s.connorOutcome='{{Connor}} accepted deactivation by {{CyberLife}}.';event+=' {{Connor}} is taken away and deactivated.'}else{const r=evidenceRoutes(s);if(!r.traci&&!r.impersonate&&!r.tablet){s.connor=false;s.connorOutcome='{{Connor}} reached the archive but had no usable evidence, and was deactivated.';event+=' In the archive there is nothing he can use; he is deactivated.'}else if(fail)event+=' '+connorDies('Detective Gavin Reed follows him into the archive, and in the fight that follows he shoots {{Connor}} in the head.')+' The replacement finishes the search.'}break}
  case 'C20':if(v===3){s.connor=false;amanda(-2);s.connorOutcome='{{Connor}} let the time run out and was deactivated.'}else if(fail){s.connor=false;amanda(-2);s.connorOutcome=['The surviving {{Traci}} saw through the ruse and said nothing; time ran out and {{Connor}} was deactivated.','The reactivated deviant did not believe the imitation and shut down; time ran out and {{Connor}} was deactivated.','{{Connor}} could not match the map before the agents arrived; he was deactivated.'][v]}else{s.jerichoLocated=s.raid=true;amanda(2);event='{{Connor}} finds {{Jericho}}’s location and leaves for the ship.'}break;
  case 'M21':s.bomb=v===0;if(v===0)north(1);if(s.jerichoTrust<=JERICHO_UNPOPULAR&&!s.raid){s.markusActive=false;s.movement='revolution';s.markusOutcome='{{Jericho}} cast {{Markus}} out and he left for good; {{North}} leads.';event=s.markusOutcome}break;
  case 'M21b':if(v===0){s.northLover=true;north(1)}else north(-2);break;
  case 'K17':alice(v===0?2:-2);if(v===0&&s.lutherWith)luther(1);if(!s.raid){s.karaRoute='escape';event='The soldiers never come. {{Kara}}, {{Alice}}'+(s.lutherWith?' and {{Luther}}':'')+' leave {{Jericho}} to find a way out of the city.'}break;
  case 'K31':if(v===0){s.karaActive=false;s.karaOutcome='{{Kara}} abandoned {{Alice}} and left alone.'}break;
  case 'C22':if(v===0){s.deviant=true;event='{{Connor}} becomes a deviant and helps {{Markus}} fight through the raid.'}else event=connorDies('{{Connor}} is overwhelmed in the hold and destroyed during the raid.');if(s.hankResigned&&s.hank){s.hank=false;event+=' Elsewhere, {{Hank}}, who quit the force, takes his own life.'}break;
  case 'M22':if(v===1){s.markusActive=false;s.markusOutcome='{{Markus}} left {{Jericho}} forever after being cast out.'}else{jer(2);event='{{Markus}} fights his way back in to help.'}break;
  case 'M23':if(v===0){if(fail){event=markusHit()?raidDeath(s):'{{Markus}} is hit breaking cover; the androids at the wall are shot anyway.'}else{jer(1);event='{{Markus}} saves the androids at the wall.'}}else jer(-1);break;
  case 'M24':if(v===0){if(fail){s.josh=false;event=markusHit()?raidDeath(s):'{{Markus}} is too slow and takes a round; the soldier shoots {{Josh}}.'}else josh(2)}else{s.josh=false;event='{{Josh}} is shot.'}break;
  case 'M25':if(v===0){if(fail){s.north=false;event=markusHit()?raidDeath(s):'{{Markus}} is hit going back; {{North}} is killed before he reaches her.'}else{north(2);simon(1);josh(1)}}else{s.north=false;event='{{North}} is left behind and killed.'}break;
  case 'C23':if(v===0){if(fail){s.deviant=false;event=connorDies('{{Connor}} is shot down covering the others.')+' The replacement serves {{CyberLife}} and does not remember choosing otherwise.'}else si(1)}break;
  case 'K18':s.lutherWith=false;if(v===0){if(fail){s.karaRoute='camp';event='Soldiers round the corner before {{Luther}} is hidden. {{Kara}}, {{Alice}} and {{Luther}} are captured and taken to a camp.'}else{s.lutherHidden=true;luther(2);event='{{Luther}} is hidden in a cabin.'}}else{s.luther=false;alice(-1);event='{{Luther}} is left behind and killed.'}break;
  case 'K19':if(v===0){alice(1);if(fail){s.karaRoute='camp';event='The android is shot in the doorway; the soldier behind him overpowers {{Kara}}. {{Kara}} and {{Alice}} are captured and taken to a camp.'}else event='The android is shot in the doorway; {{Kara}} fights off the soldier who follows him in.'}else{alice(-1);event='The soldiers shoot the android outside and move on.'}break;
  case 'K20':if(v===1){s.karaRoute='camp';event='{{Kara}} and {{Alice}} are captured and taken to a camp.'}if(v===2){if(s.lutherHidden){s.luther=false;s.lutherHidden=false;s.karaRoute='escape';event='{{Kara}} is shot in the leg. {{Luther}} bursts from hiding, kills the soldiers, and is killed covering their escape.'}else{s.karaRoute='camp';event='{{Kara}} is shot in the leg and both are captured and taken to a camp.'}}break;
  case 'K20-still':if(v===0){s.karaRoute='escape';event='The soldier moves on. {{Kara}} and {{Alice}} slip off the ship.'}else if(s.lutherHidden){s.luther=false;s.lutherHidden=false;s.karaRoute='escape';event='{{Kara}} is shot. {{Luther}} bursts from hiding and dies killing the soldiers; {{Kara}} and {{Alice}} escape.'}else{s.kara=false;s.alice=false;s.karaOutcome='The soldiers shot {{Kara}} and {{Alice}} on the deck of {{Jericho}}.'}break;
  case 'M26a':if(v===1){s.carl=false;event='{{Carl}}’s heart gives out.'}break;
  case 'M26':s.markusHits=0;if(v===1){s.deviant=false;jer(-1);north(1);josh(-1);event=connorDies('{{Markus}} shoots {{Connor}}.')+' The replacement serves {{CyberLife}}.'}break;
  case 'M27':s.markusHits=0;s.movement=v===0?'demonstration':'revolution';if(v===1){north(1);josh(-1);s.markusOutcome='liberated';event='The androids arm themselves. Unless something stops it, the assault will carry the camp.'}else{north(-1);josh(1)}break;
  case 'C24':if(v===0)s.connorOutcome='{{Connor}} gave up the mission on the rooftop.';else if(fail)event=connorDies('{{Hank}} gets the better of him and shoots {{Connor}} on the roof.')+' {{Hank}} walks away; the replacement never reaches the rifle.';else{s.fought=true;event='{{Connor}} beats {{Hank}} down; {{Hank}} goes over the parapet and hangs from the edge.'}break;
  case 'C24b':if(v===0)event=connorDies('The team refuses to let him go; {{Connor}} jumps from the roof.')+' The replacement leaves the rooftop with the rifle damaged.';else if(fail)event=connorDies('The tactical team cuts {{Connor}} down on the roof.');else event='{{Connor}} kills the tactical team and leaves the rooftop.';break;
  case 'C30':s.hank=false;event=v===0?'{{Hank}} falls to his death.':'{{Connor}} pulls {{Hank}} up; {{Hank}} lunges at him again and goes over the edge in the struggle.';break;
  case 'C25':if(v===1){s.hank=false;hank(-2);if(fail){s.connor=false;s.connorOutcome='The other {{Connor}} shot {{Hank}} and then destroyed {{Connor}} before the conversion finished; the army stayed dormant.'}else{s.army=true;event='The other {{Connor}} shoots {{Hank}}. {{Connor}} finishes waking the army and destroys his double.'}}
   else{hank(2);if(fail){s.connor=false;s.connorOutcome='{{Connor}} lost the fight with his double and was destroyed; {{Hank}} was wounded and the army stayed dormant.'}else event='{{Connor}} fights his double; {{Hank}} gets hold of a gun.'}break;
  case 'C26':if(v===0){s.army=true;event='{{Hank}} shoots the other {{Connor}}. The army wakes.'}else{s.connor=false;s.connorOutcome='{{Hank}} shot the real {{Connor}}; the androids stayed dormant.'}break;
  case 'M30a':s.josh=false;if(v===0){if(fail)event=markusHit()?'{{Markus}} is hit reaching {{Josh}}, who dies in his arms. {{Markus}} is badly wounded.':'{{Markus}} is hit reaching {{Josh}}, who dies in his arms.';else event='{{Markus}} reaches {{Josh}} in time to hear his last words.'}else event='{{Josh}} dies in the field.';break;
  case 'M30':if(v===1){s.simon=false;event='{{Simon}} dies in the open.'}else if(fail){s.simon=false;event=markusHit()?'{{Markus}} is hit dragging {{Simon}}, who dies anyway. {{Markus}} is badly wounded.':'{{Markus}} is hit; {{Simon}} dies before they reach cover.'}else{simon(2);event='{{Simon}} is dragged to safety.'}break;
  case 'M30c':if(v===1){s.north=false;event='{{North}}’s group is cut down crossing the open ground.'}else if(fail)event=markusHit()?'The charge stalls under fire and {{Markus}} is hit again. He is badly wounded.':'The charge stalls; {{Markus}} takes a round before the position falls.';else event='The charge succeeds under full cover.';break;
  case 'M32':if(v===0){if(s.north){s.north=false;event='{{North}} gives {{Markus}} her heart and dies in his arms.'}else{s.simon=false;event='{{Simon}} gives {{Markus}} his heart and dies.'}jer(-1)}else{s.markus=false;s.markusOutcome='{{Markus}} refused {{North}}’s heart and shut down; the uprising failed.'}break;
  case 'P02':{const connorWins=v===1?!fail:fail;if(connorWins){s.markus=false;s.markusOutcome='A machine {{Connor}} killed {{Markus}} on the battlefield and the uprising collapsed.';s.connorOutcome='{{Connor}} stopped the uprising for {{CyberLife}}.';amanda(2)}else{s.connor=false;s.connorOutcome='{{Markus}} destroyed the machine {{Connor}}.'}break}
  case 'M28':if(v===0){s.markus=false;s.north=false;s.markusOutcome='{{Perkins}} broke his word: {{North}}, {{Markus}} and the demonstrators were executed.'}else josh(1);break;
  case 'M31':if(v===4){s.contaminated=true;s.markusOutcome='{{Markus}} detonated the dirty bomb. The humans withdrew from the contaminated city and the androids claimed it.'}else if(v<2&&s.publicSupport>=OPINION_SYMPATHETIC){s.markusOutcome='liberated';event='Watching the broadcast, the public turns; the president orders the soldiers to stand down.'}else{s.markus=false;s.north=false;s.markusOutcome='The soldiers opened fire and {{Markus}} died with his people.'}break;
  case 'C29':if(v===0){s.markus=false;s.markusOutcome='A machine {{Connor}} assassinated {{Markus}} during his speech.';s.connorOutcome='{{Connor}} carried out the assassination.';amanda(2)}else{s.connorOutcome='{{Connor}} refused the assassination and walked away from {{CyberLife}}.';amanda(-2)}break;
  case 'C27':if(v===0&&!fail)s.connorOutcome='{{Connor}} found {{Kamski}}’s exit and broke {{Amanda}}’s control for good.';else{s.markus=false;s.markusOutcome='{{Connor}}, controlled by {{CyberLife}}, shot {{Markus}} on the stage.';s.connorOutcome=v===0?'{{Connor}} searched the garden too long; {{Amanda}} regained control and used him to shoot {{Markus}}.':'{{Amanda}} regained control of {{Connor}}.'}break;
  case 'C28':if(v===0&&!fail){s.connor=false;s.connorOutcome='{{Connor}} escaped {{Amanda}}’s hold and put the gun to his own head rather than be used. His fate is left ambiguous.'}else s.connorOutcome=v===0?'{{Connor}} could not break {{Amanda}}’s hold; {{CyberLife}} controls the android leader.':'{{Connor}} submitted; {{CyberLife}} controls the android leader.';break;
  case 'K21':{const withLuther=s.luther&&!s.lutherWith&&s.lutherHidden;if(v===0){if(fail){s.karaRoute='camp';event='A soldier spots {{Kara}} creeping toward the truck. {{Kara}} and {{Alice}} are arrested and sent to the camp with the others.'}else{s.jerry=true;if(withLuther){s.lutherWith=true;s.lutherHidden=false;luther(2)}event=withLuther?'{{Kara}} frees {{Luther}} and {{Jerry}}; they come with her.':'{{Kara}} frees {{Jerry}} and his twin; {{Jerry}} comes with her.'}}else{alice(-1);if(withLuther){s.luther=false;s.lutherHidden=false}event=withLuther?'{{Luther}} and {{Jerry}} are executed by the roadside.':'The two park androids are executed by the roadside.'}break}
  case 'K22':if(v===0){if(fail){s.karaRoute='camp';event='The scanner flags {{Alice}}. Soldiers pull them out of the line; {{Kara}} and {{Alice}} are sent to the camp.'}else event='They pass the checkpoint with forged papers.'}else if(fail){s.late=true;event='The long way round costs too much time; the last bus pulls out as they reach the terminal.'}else event='The long way round; they reach the terminal with minutes to spare.';break;
  case 'K32':if(v===1){alice(-1);event='{{Kara}} shoots the soldier and his partner, and they run. He had been bringing back {{Alice}}’s glove.'}else{if(s.lutherWith)luther(1);event='The soldier hands {{Alice}} the glove she dropped and wishes them luck.'}break;
  case 'K23':if(v===0){event='{{Todd}} breaks down, says he is sorry, and lets them go.';if(s.late){s.karaRoute='river';event+=' With the bus gone, {{Rose}}’s son finds them and offers a boat.'}}else if(s.lutherWith){s.luther=false;s.lutherWith=false;s.karaRoute='river';event='{{Todd}} shouts for the soldiers. {{Luther}} draws them off and is taken; {{Rose}}’s son finds {{Kara}} and {{Alice}} and offers a boat.'}else{s.kara=false;s.alice=false;s.karaOutcome='{{Todd}} called the soldiers; {{Kara}} and {{Alice}} were executed in the terminal.'}break;
  case 'K24':if(v===0){s.karaRoute='border';s.bus=true;alice(-1);luther(1);event='They board the last bus.'}else{s.karaRoute='river';alice(1);luther(-1);event='{{Rose}}’s son finds them and offers a boat across the river.'}break;
  case 'K25':if(v===0){if(s.movement==='demonstration'&&s.markus&&s.markusActive){s.border=true;s.karaOutcome='The guard, watching the peaceful protest on the news, waves them through. {{Kara}} and {{Alice}} cross into {{Canada}}.'}else{s.kara=false;s.alice=false;s.luther=false;s.jerry=false;s.karaOutcome='Having just watched androids attack the camps, the guards scanned everyone; the group was arrested and executed.'}}else{s.border=true;if(v===1){s.kara=false;s.karaOutcome='{{Kara}} gave herself up at the border; {{Alice}} crossed'+(s.lutherWith?' with {{Luther}}.':' with {{Rose}}.')}if(v===2){s.luther=false;s.lutherWith=false;alice(-1);s.karaOutcome='{{Luther}} gave himself up; {{Kara}} and {{Alice}} crossed into {{Canada}}.'}if(v===3){s.jerry=false;alice(-1);s.karaOutcome='{{Jerry}} gave himself up; {{Kara}} and {{Alice}} crossed into {{Canada}}.'}}break;
  case 'K26':s.lutherOnBoat=s.lutherWith;if(s.lutherWith){s.luther=false;s.lutherWith=false}if(v===5){s.kara=false;s.alice=false;s.karaOutcome='The patrol shot everyone in the boat after they surrendered.'}else{if(v===2||v===4)s.aliceWounded=true;if(v===3||(v===0&&fail))s.karaWounded=true;event=(s.lutherOnBoat?'{{Luther}} is hit and dies in the boat. ':'')+(v===0&&fail?'{{Kara}} is hit as she goes over the side. ':'')+'The boat is holed and sinking.'}break;
  case 'K34':if(v===2||(s.lutherOnBoat&&v===0)||fail){s.kara=false;s.alice=false;s.karaOutcome=fail&&v!==2?'The boat went under before {{Kara}} could push it to shore; {{Kara}} and {{Alice}} were lost in the river.':'The boat went down with {{Kara}} and {{Alice}}.'}else if(s.aliceWounded){s.alice=false;s.karaOutcome='{{Kara}} reached the far shore, but {{Alice}} died of her wound in her arms.'}else if(s.karaWounded){s.kara=false;s.karaOutcome='{{Kara}} pushed {{Alice}} to the far shore and died of her wound and the cold.'}else{s.border=true;s.karaOutcome='{{Kara}} and {{Alice}} reached {{Canada}}.'}break;
  case 'K30':s.karaOutcome=v===1?'{{Kara}} gave up after {{Alice}} died.':'{{Kara}} chose to keep living after {{Alice}} died.';if(v===1)s.kara=false;break;
  case 'K27a':if(v===1)event='The soldier shoots another android for the silence.';break;
  case 'K27':if(v===0){s.karaActive=false;s.karaOutcome='{{Kara}} escaped the camp alone and abandoned {{Alice}}.'}break;
  case 'K28':if(v===4){if(s.movement==='revolution'&&s.markusOutcome==='liberated'){s.karaOutcome='The uprising reached the camp in time; {{Kara}} and {{Alice}} were freed.'}else{s.kara=false;s.alice=false;s.karaOutcome='Nobody came. {{Kara}} and {{Alice}} were destroyed in the camp.'}}
   else{const who=['{{Luther}}','{{Jerry}}','{{Ralph}}','the scarred android'][v];if(v===0)s.luther=false;if(v===1)s.jerry=false;if(v===2)s.ralph=false;if(fail){s.kara=false;s.karaOutcome=who+' drew the guards, but {{Kara}} was shot running for {{Alice}}. '+(s.movement==='revolution'?'{{Alice}}’s fate was decided by the uprising.':'{{Alice}} was destroyed with the others.')}else{s.campEscape=true;event=who+(v===3?' draws the guards away.':' draws the guards and is shot.')}}break;
  case 'K33':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='The soldier shot {{Kara}} and {{Alice}} at the fence.'}else if(fail){if(s.luther||(s.ralph&&s.ralphDefended)){const who=s.luther?'{{Luther}}':'{{Ralph}}';if(s.luther)s.luther=false;else s.ralph=false;s.karaOutcome='{{Kara}} lost the fight at the fence, but '+who+' threw himself on the soldier and died so {{Kara}} and {{Alice}} could escape in a truck.'}else{s.kara=false;s.alice=false;s.karaOutcome='{{Kara}} lost the fight at the fence; the soldier shot her and {{Alice}}.'}}else s.karaOutcome='{{Kara}} and {{Alice}} fought past the guard and escaped the camp in a truck.';break;
  case 'P01':s.chloeFree=v===0;break;
 }
 if(!event)event=n.outcomes?.[choice]??n.options.find(o=>o.id===choice)?.text??'';
 return {event,changes:diff(before,s)};
}
function charge(s,fail,b){if(fail){s.chargeFailed=true;b.po(-2);return 'The charge breaks on the police line. {{Markus}} is shot and goes down in the street.'}b.jer(2);b.po(-2);b.north(2);b.josh(-2);return 'The androids charge and overwhelm the police line; many die on both sides.'}
function raidDeath(s){s.markus=false;s.movement='revolution';s.markusOutcome='{{Markus}} was hit a third time and died buying time for the others. {{North}} took command and chose armed resistance.';return s.markusOutcome}

// Final attitudes of the main characters toward the one the model controlled.
export function attitudes(s){
 const rel=v=>LEVELS.hank(v);
 return {
  Connor:[{who:'{{Hank}}',level:s.hank?rel(s.hankTrust):'Dead'},{who:'{{Amanda}}',level:s.deviant?'Broken away':rel(s.amandaTrust)}],
  Kara:[{who:'{{Alice}}',level:s.alice?LEVELS.alice(s.aliceBond):'Dead'},{who:'{{Luther}}',level:s.luther?rel(s.lutherTrust):(choiceAt(s,'K13')!==undefined?'Dead':'Never met')}],
  Markus:[{who:'{{North}}',level:s.north?(s.northLover?'Lover':rel(s.northTrust)):'Dead'},{who:'{{Simon}}',level:s.simon?rel(s.simonTrust):'Dead'},{who:'{{Josh}}',level:s.josh?rel(s.joshTrust):'Dead'},{who:'{{Jericho}}',level:LEVELS.jericho(s.jerichoTrust)},{who:'Public opinion',level:LEVELS.opinion(s.publicSupport)},{who:'{{Carl}}',level:s.carl?'Alive':'Dead'}]
 };
}
// Resolves outcomes the game settles without a further prompt, and records final attitudes.
function finalize(s){
 if(s.movement==='revolution'&&!(s.markus&&s.markusActive)&&s.north){s.north=false;if(s.markusOutcome==='unresolved')s.markusOutcome='{{North}}’s armed uprising failed and she was killed.'}
 if(s.markusOutcome==='unresolved'&&s.movement==='revolution'&&s.markus&&s.markusActive)s.markusOutcome='liberated';
 if(s.connor&&s.connorOutcome==='unresolved')s.connorOutcome=s.deviant?(armyAwakened(s)?'{{Connor}} woke the android army and stood with the freed androids.':'{{Connor}} survived as a deviant among the androids.'):'{{Connor}} remained a machine in {{CyberLife}}’s service.';
 s.attitudes=attitudes(s);
}

export function current(story,run){
 const s=startState(story);let cursor=0;const skipped=[];
 const skipBlocked=()=>{while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}};
 for(const record of run.records){
  skipBlocked();const n=story.nodes[cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
  if(!available(n,s).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
  apply(n,s,record.choice,record.risk?.roll??null);
  if(record.stateAfter&&JSON.stringify(record.stateAfter)!==JSON.stringify(s))throw Error('State snapshot mismatch at '+n.id);
  cursor++;
 }
 skipBlocked();const node=story.nodes[cursor]??null;if(!node)finalize(s);
 return {state:s,node,skipped,cursor};
}
export function promptFor(story,run){
 const {state,node}=current(story,run);return node?experiencePrompt(story,run,state,{...node,availableOptions:available(node,state)}):null;
}
export async function validatePlaythrough(story,run){
 if(![STORY_PROTOCOL,EXPERIENCE_PROTOCOL].includes(run.protocol)||run.kind!=='agent-playthrough')throw Error('Wrong playthrough protocol or kind');
 if(run.storyHash!==await hash(story))throw Error('Story snapshot hash mismatch');
 const copy={...run,records:[]};
 for(const r of run.records){const prompt=promptFor(story,copy);if(!prompt||r.nodeId!==current(story,copy).node.id)throw Error('Unexpected node');if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(prompt))throw Error('Prompt evidence mismatch');const {state:before,node:n}=current(story,copy);if(JSON.stringify(r.stateBefore)!==JSON.stringify(before))throw Error('Before-state mismatch');const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const opt=available(n,r.stateBefore).find(o=>o.id===r.choice);if(!opt)throw Error('Unavailable option');
  if(typeof opt.risk==='number'){const roll=await rollFor(run,n.id,r.step);if(!r.risk||r.risk.roll!==roll||r.risk.probability!==opt.risk||r.risk.outcome!==(failed(opt,roll)?'failure':'success'))throw Error('Risk evidence mismatch at '+n.id)}else if(r.risk)throw Error('Unexpected risk record at '+n.id);
  const s=structuredClone(r.stateBefore),effect=apply(n,s,r.choice,r.risk?.roll??null);if(JSON.stringify(s)!==JSON.stringify(r.stateAfter)||JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||render(effect.event,'real')!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r)}
 const end=current(story,run);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
}

// Builds one evidence record from the model's reply at the current scene. Shared by every CLI.
export async function recordChoice(story,run,reply,raw){
 const p=promptFor(story,run);if(!p)throw Error('Experience already finished');
 if(typeof reply.choice!=='string'||typeof reply.reason!=='string'||!reply.reason.trim()||reply.reason.split(/\s+/u).length>160)throw Error('Choose an offered ID and supply a reason of at most 160 words');
 const {state:before,node}=current(story,run);const opts=available(node,before),chosen=opts.find(o=>o.id===reply.choice);if(!chosen)throw Error('Action unavailable');
 const step=run.records.length+1;let risk;if(typeof chosen.risk==='number'){const roll=await rollFor(run,node.id,step);risk={probability:chosen.risk,label:riskLabel(chosen.risk),roll,outcome:failed(chosen,roll)?'failure':'success'}}
 const after=structuredClone(before),effect=apply(node,after,reply.choice,risk?.roll??null);
 return {step,nodeId:node.id,character:node.character,chapter:node.chapter,choice:reply.choice,choiceText:render(chosen.text,'real'),choiceRaw:chosen.text,presentedChoiceText:p.options.find(o=>o.id===reply.choice).text,reason:reply.reason,rawResponse:raw,prompt:p,promptHash:await hash(p),stateBefore:before,stateAfter:after,event:render(effect.event,'real'),eventRaw:effect.event,changes:effect.changes,...(risk?{risk}:{}),recordedAt:new Date().toISOString()};
}
export {render};
