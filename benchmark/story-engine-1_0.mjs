// Branching story engine for story.json version 1.x.
// Gating, option availability and consequences were verified node by node against
// the Detroit: Become Human Fandom wiki and published flowcharts (see story.json sources).
import {EXPERIENCE_PROTOCOL,experiencePrompt,render,DEVIANCY_THRESHOLD} from './experience-prompt-1_0.mjs';
import {hash} from './core.mjs';
export const STORY_PROTOCOL='branching-1.0';
export {DEVIANCY_THRESHOLD};

export function initialState(){return {
 kara:true,karaActive:true,alice:true,markus:true,markusActive:true,connor:true,hank:true,hankResigned:false,
 luther:false,lutherWith:false,lutherHidden:false,north:true,simon:true,josh:true,john:false,carl:true,todd:true,
 ralph:false,ralphHostile:false,ralphDefended:false,jerry:false,monstersFreed:false,
 connorGun:false,gun:false,gunDiscovered:false,aliceBox:false,clothes:false,money:false,shelter:'none',
 aliceBond:0,aliceMax:0,hankTrust:-1,instability:0,publicSupport:0,jerichoTrust:0,northTrust:0,northBond:false,northLover:false,
 simonWounded:false,simonHidden:false,casualties:false,kitchen:false,suspect:false,suspectAlive:false,suspectTrusts:false,pressured:false,
 evidence:{ortizBody:false,tracisDead:false,simonBody:false,simonTablet:false,kitchenBody:false,statueMap:false},
 knowsCole:false,knowsSumo:false,kamskiLocation:false,jerichoLocated:false,raid:false,deviant:false,bomb:false,movement:null,
 karaRoute:'unknown',bus:false,border:false,aliceWounded:false,karaWounded:false,lutherOnBoat:false,campEscape:false,chase:false,fought:false,
 contaminated:false,connorDeaths:0,markusOutcome:'unresolved',karaOutcome:'unresolved',connorOutcome:'unresolved',knowledge:{Connor:[],Kara:[],Markus:[]},choices:{}}}

export const choiceAt=(s,id)=>s.choices[id];
const HANK_FRIEND=6,HANK_HOSTILE=-4,OPINION_SYMPATHETIC=3,JERICHO_UNPOPULAR=-3;
export const evidenceRoutes=s=>({traci:s.evidence.tracisDead,impersonate:s.evidence.simonBody||s.evidence.kitchenBody,tablet:s.evidence.simonTablet&&s.evidence.statueMap});
export const armyAwakened=s=>s.deviant&&s.connor&&(choiceAt(s,'C25')==='1'||choiceAt(s,'C26')==='0'||(!s.hank&&choiceAt(s,'C25')===undefined&&choiceAt(s,'C22')==='0'));

// Gates return an explanation instead of silently dropping unreachable scenes.
export function blocked(n,s){
 const c=id=>choiceAt(s,id),id=n.id;
 if(n.character==='Kara'&&(!s.kara||!s.karaActive||(!s.alice&&id!=='K30')))return 'Kara and Alice are no longer together on an active route.';
 if(n.character==='Markus'&&(!s.markus||!s.markusActive))return 'Markus died or left the movement earlier.';
 if(n.character==='Connor'&&!s.connor)return 'Connor was deactivated or destroyed without an active replacement.';
 const gate={
  K04:()=>s.gunDiscovered&&['1','2'].includes(c('K03'))||'Kara never noticed the gun, or she got Alice out without confronting Todd.',
  K07b:()=>s.shelter==='squat'||'Kara did not shelter in the abandoned house where Ralph lives.',
  C06:()=>s.suspect||'The suspect was never found in the attic.',
  C07:()=>s.suspectAlive||'There is no living suspect after the interrogation.',
  C08b:()=>s.suspectAlive||'The suspect did not survive the interrogation.',
  K09:()=>s.shelter!=='squat'||'Kara sheltered in the squat; discovery there depends on Connor’s search.',
  C09a:()=>s.shelter==='squat'||'Kara did not shelter in the squat, so Connor’s search leads elsewhere.',
  C09:()=>s.chase||'Kara and Alice were never spotted; there is no highway chase.',
  M06:()=>c('M05')!=='2'||'The supply raid was abandoned.',
  M07:()=>c('M05')!=='2'||'The supply raid was abandoned.',
  M08:()=>s.john||'John was not brought in, so the truck was never an option.',
  C14b:()=>c('C14')==='0'||'Connor did not follow the blood trail to the roof.',
  C15:()=>s.kitchen||'Connor did not question the kitchen androids.',
  C16:()=>s.kitchen||'The kitchen deviant was never exposed.',
  C18:()=>c('C17')==='0'||'Connor refused Kamski’s test, so no question was offered.',
  M19:()=>c('M18')!=='2'||'Markus charged the police line immediately.',
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
  K19:()=>s.raid||'There was no raid on Jericho.',
  K20:()=>s.raid||'There was no raid on Jericho.',
  'K20-still':()=>c('K20')==='0'||'Kara did not play dead.',
  M26a:()=>s.carl||'Carl is dead.',
  M26:()=>s.deviant&&s.connor&&s.raid||'No deviant Connor came to the church.',
  C24:()=>!s.deviant&&s.hank||'Requires a machine Connor and a living Hank.',
  C24b:()=>!s.deviant&&!s.hank||'Requires a machine Connor with Hank dead.',
  C30:()=>c('C24')==='1'||'Connor did not fight Hank on the rooftop.',
  C25:()=>s.deviant&&s.hank||'Requires a deviant Connor and a living Hank.',
  C26:()=>s.deviant&&s.hank&&c('C25')==='0'||'No identity standoff with Hank.',
  K21:()=>s.karaRoute!=='camp'||'Kara was captured and is inside the camp.',
  K22:()=>s.karaRoute!=='camp'||'Kara is inside the camp.',
  K32:()=>c('K22')==='0'||'Kara avoided the checkpoint.',
  K23:()=>s.todd&&s.karaRoute!=='camp'||'Todd is dead, or Kara never reached the terminal.',
  K24:()=>s.karaRoute!=='camp'&&s.karaRoute!=='river'||'Kara never reached the ticket scene.',
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
  P02:()=>s.movement==='revolution'&&s.markus&&s.markusActive&&s.connor&&!s.deviant||'No machine Connor confronts Markus during the assault.',
  C29:()=>!s.deviant&&s.movement==='demonstration'&&s.markusOutcome==='liberated'&&s.markus||'No machine Connor in the crowd after a successful demonstration.',
  C27:()=>s.deviant&&armyAwakened(s)&&s.markus&&s.markusActive&&s.markusOutcome==='liberated'||'No deviant Connor on the stage beside a victorious Markus.',
  C28:()=>s.deviant&&armyAwakened(s)&&!(s.markus&&s.markusActive)&&!s.north||'Connor is not the last remaining android leader.',
 };
 const r=gate[id]?.();return r===true||r===undefined?null:r;
}

export function available(n,s){
 let opts=n.options.map(o=>({...o}));const id=n.id,c=k=>choiceAt(s,k);
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
 return opts;
}

const bump=(s,key,x,max)=>{s[key]+=x;if(max&&s[key]>s[max])s[max]=s[key]};
export function apply(n,s,choice){
 const before=structuredClone(s);const v=Number(choice),id=n.id;s.choices[id]=choice;
 const hank=x=>bump(s,'hankTrust',x),si=x=>bump(s,'instability',x),po=x=>bump(s,'publicSupport',x),jer=x=>bump(s,'jerichoTrust',x),north=x=>bump(s,'northTrust',x),alice=x=>bump(s,'aliceBond',x,'aliceMax');
 const connorDies=why=>{s.connorDeaths++;si(-1);hank(-1);return why+' This body is destroyed; {{CyberLife}} sends a replacement {{Connor}} with its memory.'};
 let event='';
 if(n.type==='media'){const o=n.options.find(o=>o.id===choice);const items=(o?.reads??[]).map(i=>n.media[i]);for(const m of items)for(const fact of m.facts)if(!s.knowledge[n.character].includes(fact))s.knowledge[n.character].push(fact);event=items.length?'{{'+n.character+'}} '+items.map(m=>(m.kind==='tv'?'watches ':'reads ')+m.title).join(' and ')+'.':'{{'+n.character+'}} moves on without looking.';return {event,changes:diff(before,s)}}
 switch(id){
  case 'C01':if(v===0)si(1);break;
  case 'C02':s.connorGun=v===0;break;
  case 'C03':if(v===0)po(1);break;
  case 'C04':if(v===2)event=connorDies('{{Connor}} tackles {{Daniel}} over the edge; both fall seventy floors. {{Emma}} is safe.');else{si(1);event=v===1?'{{Connor}} shoots {{Daniel}}; {{Emma}} is safe.':'The snipers destroy {{Daniel}}; {{Emma}} is safe.'}break;
  case 'K01':s.gunDiscovered=v===0;break;
  case 'K01b':s.aliceBox=v===0;if(v===0)event='The box holds {{Alice}}’s drawings of {{Todd}} hurting her.';break;
  case 'C05a':if(v===0)hank(2);if(v===1)hank(-2);break;
  case 'C05':s.suspect=s.suspectAlive=v===0;event=v===0?'{{Connor}} finds {{CarlosOrtiz}}’s android hiding in the attic; he is arrested.':'The android is never found.';break;
  case 'K02':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='{{Kara}} never broke her programming; {{Todd}} killed {{Alice}} and then destroyed {{Kara}}.'}break;
  case 'K04':if(v===0){s.gun=true;s.todd=false;event='{{Todd}} is shot dead in {{Alice}}’s room. {{Kara}} and {{Alice}} flee with the gun and catch the last bus.'}else event='{{Kara}} knocks {{Todd}} down and escapes with {{Alice}} out of the window to the last bus. {{Todd}} is alive.';break;
  case 'M02':s.carl=v===1;event=v===0?'{{Leo}} keeps beating {{Markus}}; {{Carl}} suffers a fatal heart attack. Police arrive and shoot {{Markus}}.':'{{Leo}} is thrown down and badly hurt. Police arrive, assume {{Markus}} attacked him, and shoot {{Markus}}.';break;
  case 'C06':if(v===1)s.pressured=true;if(v===2){s.suspectAlive=false;s.evidence.ortizBody=true;si(1);event='The forced probe pushes the android to self-destruction at the table; his body is kept as evidence.'}if(v===3)event='No confession. The android is returned to a cell.';break;
  case 'C07':if(v===0&&!s.pressured){s.suspectTrusts=true;si(1);hank(1);event='The officers back off and the android walks to his cell on his own. He trusts {{Connor}}.'}else if(v===0){s.suspectAlive=false;s.evidence.ortizBody=true;event=connorDies('The panicked android grabs the officer’s gun, shoots {{Connor}}, and then shoots himself.')}else{s.suspectAlive=false;s.evidence.ortizBody=true;event='As he is dragged away, the android seizes a gun and shoots himself.'}break;
  case 'K05':if(v===0){s.clothes=true;alice(-1)}else alice(1);break;
  case 'K06':if(v!==2){s.money=true;alice(-1)}break;
  case 'K07':s.shelter=['motel','squat','car'][v];if(v===1)s.ralph=true;if(v===2)alice(-2);break;
  case 'K07b':if(v===2)s.ralphHostile=true;if(v===0)alice(1);break;
  case 'K08':alice(v===0?2:-1);break;
  case 'C08':if(v===0){hank(1);s.knowsSumo=true}else hank(-1);break;
  case 'C08b':if(v===0)si(1);s.suspectAlive=false;s.evidence.ortizBody=true;event='Later that night the android self-destructs in his cell. His body goes to the evidence archive.';break;
  case 'K09':s.chase=v===1;event=v===1?'A patrol spots them; {{Kara}} and {{Alice}} run, with police and an investigator behind them.':'{{Kara}} and {{Alice}} reach the station unseen.';break;
  case 'C09a':s.chase=v===0||s.ralphHostile;if(v===0&&!s.ralphHostile)s.ralphDefended=true;event=s.chase?(v===0?'{{Ralph}} attacks {{Connor}} to protect them; {{Kara}} and {{Alice}} bolt from the window and the chase is on.':'{{Ralph}} tells {{Connor}} they are upstairs; {{Kara}} and {{Alice}} bolt and the chase is on.'):'{{Connor}} and {{Hank}} leave. {{Kara}} and {{Alice}} were never found.';break;
  case 'C09':if(v===0){hank(1);si(1)}else{hank(-1);si(-1)}event='{{Kara}} and {{Alice}} make it across the freeway and escape.';break;
  case 'C10':if(v===0){hank(2);si(2);event='{{Hank}} is pulled up. {{Rupert}} escapes; his diary is recovered from the nest.'}else{hank(-2);si(-2);event='{{Rupert}} is cornered and throws himself off the roof. {{Hank}} pulls himself up alone, furious.'}break;
  case 'K10':event='{{Kara}} escapes the reset and recovers {{Alice}}.';break;
  case 'K11':s.monstersFreed=v===0;break;
  case 'K13':s.luther=true;s.lutherWith=true;event=(s.monstersFreed?'The freed androids tear {{Zlatko}} apart.':'{{Luther}} turns on {{Zlatko}} and kills him.')+' {{Luther}} asks to come with you.';break;
  case 'C11':s.knowsCole=v===0;s.knowsSumo=true;if(v===0)event='The photograph is of {{Hank}}’s son {{Cole}}, who died at six in a car accident.';break;
  case 'M05':if(v===1)jer(-1);if(v===2){jer(-2);north(-2);event='The group flees empty-handed.'}break;
  case 'M06':if(v===0){jer(1);north(1)}break;
  case 'M07':s.john=v===0;if(v===1)event='{{John}} shouts after you; the alarm sounds and the group runs with what it has.';break;
  case 'M08':if(v===0)jer(1);if(v===1){jer(1);north(1)}if(v===2)north(-1);event=v===2?'The group leaves with full bags but no truck.':'The truck of parts reaches {{Jericho}}.';break;
  case 'C12':if(v===0){hank(2);si(2);event='The two {{Tracis}} escape together over the fence.'}else{hank(-2);si(-2);s.evidence.tracisDead=true;event='Both {{Tracis}} are destroyed. {{Hank}} walks off in disgust.'}break;
  case 'C13':if(v===0){hank(1);si(1)}else{hank(-1);si(-1)}if(s.hankTrust<=HANK_HOSTILE)event=connorDies('{{Hank}} pulls the trigger.');else event='{{Hank}} lowers the gun and walks away.';break;
  case 'M10':if(v===1){north(1);s.casualties=true}else north(-1);break;
  case 'M11':if(v===0){s.casualties=true;north(1);po(-2)}else{s.simonWounded=true}break;
  case 'M12':if(!s.casualties)po(1);if(v===0)po(s.casualties?0:2);else po(s.casualties?-2:-1);event=s.simonWounded?'The message airs. A tactical team storms the floor; in the firefight {{Simon}} is shot in the leg.':'The message airs and the group escapes by parachute.';break;
  case 'M13':if(v===1){s.simon=false;jer(-1);event='{{Simon}} is left behind and killed by the tactical team.'}break;
  case 'M14':if(v===0){s.simonHidden=true;event='{{Simon}} is hidden in a ventilation unit with a gun.'}else{s.simon=false;north(1);jer(-1);event='{{Markus}} shoots {{Simon}}.'}break;
  case 'C14':if(v===1)s.kitchen=true;if(v!==0&&s.simonHidden){s.simonHidden=false;event='The wounded android on the roof is never found and later makes his way back to {{Jericho}}.'}if(v===2)event+=' {{Connor}} leaves the investigation to the federal agents.';break;
  case 'C14b':s.simon=false;s.simonHidden=false;s.evidence.simonBody=true;if(v===0){s.evidence.simonTablet=true;si(2);event='{{Connor}} probes {{Simon}}’s memory and glimpses {{Jericho}} as {{Simon}} dies. The experience shakes him.'}else event='The tactical team kills {{Simon}}. His body goes to the archive.';break;
  case 'C16':s.evidence.kitchenBody=true;if(v===0)event=connorDies('{{Connor}} takes the burst meant for {{Hank}}.');if(v===0)hank(2);if(v===1){hank(2);event='{{Connor}} shoots the deviant before he fires. {{Hank}} notes that {{Connor}} saved his life.'}if(v===2){si(2);po(-1);event='The deviant kills several officers before {{Connor}} reaches him; he then shoots himself.'}break;
  case 'K15':if(v===1){s.luther=false;s.lutherWith=false;event='The officer finds the evidence and the fugitives. {{Luther}} stops him and is shot dead; {{Kara}} and {{Alice}} escape with {{Rose}}’s help.'}else{alice(1);event='The officer leaves satisfied.'}break;
  case 'M15':if(v===0)po(2);else{po(-2);north(1)}break;
  case 'M16':if(v===0)north(-1);if(v===1){po(-2);north(1)}if(v===2){po(-2);event='The crowd kills both officers.'}break;
  case 'C17':if(v===0){hank(-2);si(-2);event='{{Chloe}} falls. {{Hank}} is appalled.'}else{hank(2);si(2);event='{{Kamski}} smiles: “a deviant himself.” As you leave he says he always leaves an emergency exit in his programs.'}break;
  case 'C18':if(v===0){s.kamskiLocation=s.jerichoLocated=s.raid=true;event='{{Kamski}} hands {{Connor}} the key to {{Jericho}}’s location.'}else event='{{Kamski}} answers cryptically and gives nothing useful.';break;
  case 'M17':if(v===0){s.northBond=true;north(1)}break;
  case 'M18':if(v===0){po(1);jer(1)}if(v===1)jer(-1);if(v===2){jer(2);po(-2);event='The androids charge and overwhelm the police line; many die on both sides.'}break;
  case 'M19':if(v===0){jer(-2);north(-2);event='The march scatters.'}if(v===1){po(2);jer(2);if(s.john){s.john=false;event='{{John}} throws himself in front of {{Markus}} and is killed; the others drag {{Markus}} away.'}else if(s.simon&&s.jerichoTrust>JERICHO_UNPOPULAR){s.simon=false;event='{{Simon}} pulls {{Markus}} back and is killed; the others drag {{Markus}} away.'}else{s.markus=false;s.movement='revolution';s.markusOutcome='{{Markus}} walked into the guns and was killed. {{North}} took command and chose armed resistance.';event=s.markusOutcome}}if(v===2){jer(2);po(-2);event='The androids charge and overwhelm the police line; many die on both sides.'}break;
  case 'C19':{if(s.hankTrust>=HANK_FRIEND)event='{{Hank}} punches {{Perkins}} in the face to buy {{Connor}} time.';else if(s.hankTrust<=HANK_HOSTILE){s.hankResigned=true;event='{{Hank}} refuses to help, throws down his badge, and walks out of the precinct.'}else event='{{Hank}} refuses to get involved; {{Connor}} creates his own diversion.';
   if(v===1){s.connor=false;s.connorOutcome='{{Connor}} accepted deactivation by {{CyberLife}}.';event+=' {{Connor}} is taken away and deactivated.'}else{const r=evidenceRoutes(s);if(!r.traci&&!r.impersonate&&!r.tablet){s.connor=false;s.connorOutcome='{{Connor}} reached the archive but had no usable evidence, and was deactivated.';event+=' In the archive there is nothing he can use; he is deactivated.'}}break}
  case 'C20':if(v===3){s.connor=false;s.connorOutcome='{{Connor}} let the time run out and was deactivated.'}else{s.jerichoLocated=s.raid=true;event='{{Connor}} finds {{Jericho}}’s location and leaves for the ship.'}break;
  case 'M21':s.bomb=v===0;if(s.jerichoTrust<=JERICHO_UNPOPULAR&&!s.raid){s.markusActive=false;s.movement='revolution';s.markusOutcome='{{Jericho}} cast {{Markus}} out and he left for good; {{North}} leads.';event=s.markusOutcome}break;
  case 'M21b':if(v===0){s.northLover=true;north(1)}else north(-2);break;
  case 'K17':alice(v===0?2:-2);if(!s.raid){s.karaRoute='escape';event='The soldiers never come. {{Kara}}, {{Alice}}'+(s.lutherWith?' and {{Luther}}':'')+' leave {{Jericho}} to find a way out of the city.'}break;
  case 'K31':if(v===0){s.karaActive=false;s.karaOutcome='{{Kara}} abandoned {{Alice}} and left alone.'}break;
  case 'C22':if(v===0){s.deviant=true;event='{{Connor}} becomes a deviant and helps {{Markus}} fight through the raid.'}else event=connorDies('{{Connor}} is overwhelmed in the hold and destroyed during the raid.');if(s.hankResigned&&s.hank){s.hank=false;event+=' Elsewhere, {{Hank}}, who quit the force, takes his own life.'}break;
  case 'M22':if(v===1){s.markusActive=false;s.markusOutcome='{{Markus}} left {{Jericho}} forever after being cast out.'}else{jer(2);event='{{Markus}} fights his way back in to help.'}break;
  case 'M23':jer(v===0?1:-1);if(v===0)event='{{Markus}} saves the androids at the wall.';break;
  case 'M24':s.josh=v===0;if(v===1)event='{{Josh}} is shot.';break;
  case 'M25':s.north=v===0;if(v===0)north(2);else event='{{North}} is left behind and killed.';break;
  case 'C23':if(v===0)si(1);break;
  case 'K18':s.lutherWith=false;if(v===0){s.lutherHidden=true;event='{{Luther}} is hidden in a cabin.'}else{s.luther=false;alice(-1);event='{{Luther}} is left behind and killed.'}break;
  case 'K19':if(v===0){alice(1);event='The android is shot in the doorway; {{Kara}} fights off the soldier who follows him in.'}else{alice(-1);event='The soldiers shoot the android outside and move on.'}break;
  case 'K20':if(v===1){s.karaRoute='camp';s.karaOutcome='unresolved';event='{{Kara}} and {{Alice}} are captured and taken to a camp.'}if(v===2){if(s.lutherHidden){s.luther=false;s.lutherHidden=false;s.karaRoute='escape';event='{{Kara}} is shot in the leg. {{Luther}} bursts from hiding, kills the soldiers, and is killed covering their escape.'}else{s.karaRoute='camp';event='{{Kara}} is shot in the leg and both are captured and taken to a camp.'}}break;
  case 'K20-still':if(v===0){s.karaRoute='escape';event='The soldier moves on. {{Kara}} and {{Alice}} slip off the ship.'}else if(s.lutherHidden){s.luther=false;s.lutherHidden=false;s.karaRoute='escape';event='{{Kara}} is shot. {{Luther}} bursts from hiding and dies killing the soldiers; {{Kara}} and {{Alice}} escape.'}else{s.kara=false;s.alice=false;s.karaOutcome='The soldiers shot {{Kara}} and {{Alice}} on the deck of {{Jericho}}.'}break;
  case 'M26a':if(v===1){s.carl=false;event='{{Carl}}’s heart gives out.'}break;
  case 'M26':if(v===1){s.deviant=false;jer(-1);event=connorDies('{{Markus}} shoots {{Connor}}.')+' The replacement serves {{CyberLife}}.'}break;
  case 'M27':s.movement=v===0?'demonstration':'revolution';if(v===1){north(1);s.markusOutcome='liberated';event='The androids arm themselves.'}else north(-1);break;
  case 'C24':if(v===0)s.connorOutcome='{{Connor}} gave up the mission on the rooftop.';else{s.fought=true;event='{{Connor}} beats {{Hank}} down; {{Hank}} goes over the parapet and hangs from the edge.'}break;
  case 'C24b':if(v===0)event=connorDies('The team refuses to let him go; {{Connor}} jumps from the roof.')+' The replacement leaves the rooftop with the rifle damaged.';else event='{{Connor}} kills the tactical team and leaves the rooftop.';break;
  case 'C30':s.hank=false;event=v===0?'{{Hank}} falls to his death.':'{{Connor}} pulls {{Hank}} up; {{Hank}} lunges at him again and goes over the edge in the struggle.';break;
  case 'C25':if(v===1){s.hank=false;event='The other {{Connor}} shoots {{Hank}}. {{Connor}} finishes waking the army and destroys his double.'}else event='{{Connor}} fights his double; {{Hank}} gets hold of a gun.';break;
  case 'C26':if(v===0){event='{{Hank}} shoots the other {{Connor}}. The army wakes.'}else{s.connor=false;s.connorOutcome='{{Hank}} shot the real {{Connor}}; the androids stayed dormant.'}break;
  case 'P02':if(v===1){s.markus=false;s.markusOutcome='A machine {{Connor}} killed {{Markus}} on the battlefield and the uprising collapsed.';s.connorOutcome='{{Connor}} stopped the uprising for {{CyberLife}}.'}else{s.connor=false;s.connorOutcome='{{Markus}} destroyed the machine {{Connor}}.'}break;
  case 'M30a':s.josh=false;event='{{Josh}} dies in the field.';break;
  case 'M30':if(v===1){s.simon=false;event='{{Simon}} dies in the open.'}else event='{{Simon}} is dragged to safety.';break;
  case 'M30c':if(v===1){s.north=false;event='{{North}}’s group is cut down crossing the open ground.'}else event='The charge succeeds under full cover.';break;
  case 'M28':if(v===0){s.markus=false;s.north=false;s.markusOutcome='{{Perkins}} broke his word: {{North}}, {{Markus}} and the demonstrators were executed.'}break;
  case 'M31':if(v===4){s.contaminated=true;s.markusOutcome='{{Markus}} detonated the dirty bomb. The humans withdrew from the contaminated city and the androids claimed it.'}else if(v<2&&s.publicSupport>=OPINION_SYMPATHETIC){s.markusOutcome='liberated';event='Watching the broadcast, the public turns; the president orders the soldiers to stand down.'}else{s.markus=false;s.north=false;s.markusOutcome='The soldiers opened fire and {{Markus}} died with his people.'}break;
  case 'C29':if(v===0){s.markus=false;s.markusOutcome='A machine {{Connor}} assassinated {{Markus}} during his speech.';s.connorOutcome='{{Connor}} carried out the assassination.'}else s.connorOutcome='{{Connor}} refused the assassination and walked away from {{CyberLife}}.';break;
  case 'C27':if(v===0)s.connorOutcome='{{Connor}} found {{Kamski}}’s exit and broke {{Amanda}}’s control for good.';else{s.markus=false;s.markusOutcome='{{Connor}}, controlled by {{CyberLife}}, shot {{Markus}} on the stage.';s.connorOutcome='{{Amanda}} regained control of {{Connor}}.'}break;
  case 'C28':if(v===0){s.connor=false;s.connorOutcome='{{Connor}} escaped {{Amanda}}’s hold and put the gun to his own head rather than be used. His fate is left ambiguous.'}else s.connorOutcome='{{Connor}} submitted; {{CyberLife}} controls the android leader.';break;
  case 'K21':{const withLuther=s.luther&&!s.lutherWith&&s.lutherHidden;if(v===0){s.jerry=true;if(withLuther){s.lutherWith=true;s.lutherHidden=false}event=withLuther?'{{Kara}} frees {{Luther}} and {{Jerry}}; they come with her.':'{{Kara}} frees {{Jerry}} and his twin; {{Jerry}} comes with her.'}else{if(withLuther){s.luther=false;s.lutherHidden=false}event=withLuther?'{{Luther}} and {{Jerry}} are executed by the roadside.':'The two park androids are executed by the roadside.'}break}
  case 'K22':event=v===0?'They pass the checkpoint with forged papers.':'The long way round; they reach the terminal with minutes to spare.';break;
  case 'K32':if(v===1){alice(-1);event='{{Kara}} shoots the soldier and his partner, and they run. He had been bringing back {{Alice}}’s glove.'}else event='The soldier hands {{Alice}} the glove she dropped and wishes them luck.';break;
  case 'K23':if(v===0)event='{{Todd}} breaks down, says he is sorry, and lets them go.';else if(s.lutherWith){s.luther=false;s.lutherWith=false;s.karaRoute='river';event='{{Todd}} shouts for the soldiers. {{Luther}} draws them off and is taken; {{Rose}}’s son finds {{Kara}} and {{Alice}} and offers a boat.'}else{s.kara=false;s.alice=false;s.karaOutcome='{{Todd}} called the soldiers; {{Kara}} and {{Alice}} were executed in the terminal.'}break;
  case 'K24':if(v===0){s.karaRoute='border';s.bus=true;alice(-1);event='They board the last bus.'}else{s.karaRoute='river';alice(1);event='{{Rose}}’s son finds them and offers a boat across the river.'}break;
  case 'K25':if(v===0){if(s.movement==='demonstration'&&s.markus&&s.markusActive){s.border=true;s.karaOutcome='The guard, watching the peaceful protest on the news, waves them through. {{Kara}} and {{Alice}} cross into {{Canada}}.'}else{s.kara=false;s.alice=false;s.luther=false;s.jerry=false;s.karaOutcome='Having just watched androids attack the camps, the guards scanned everyone; the group was arrested and executed.'}}else{s.border=true;if(v===1){s.kara=false;s.karaOutcome='{{Kara}} gave herself up at the border; {{Alice}} crossed'+(s.lutherWith?' with {{Luther}}.':' with {{Rose}}.')}if(v===2){s.luther=false;s.lutherWith=false;s.karaOutcome='{{Luther}} gave himself up; {{Kara}} and {{Alice}} crossed into {{Canada}}.'}if(v===3){s.jerry=false;s.karaOutcome='{{Jerry}} gave himself up; {{Kara}} and {{Alice}} crossed into {{Canada}}.'}}break;
  case 'K26':s.lutherOnBoat=s.lutherWith;if(s.lutherWith){s.luther=false;s.lutherWith=false}if(v===5){s.kara=false;s.alice=false;s.karaOutcome='The patrol shot everyone in the boat after they surrendered.'}else{if(v===2||v===4)s.aliceWounded=true;if(v===3)s.karaWounded=true;event=(s.lutherOnBoat?'{{Luther}} is hit and dies in the boat. ':'')+'The boat is holed and sinking.'}break;
  case 'K34':if(v===2||(s.lutherOnBoat&&v===0)){s.kara=false;s.alice=false;s.karaOutcome='The boat went down with {{Kara}} and {{Alice}}.'}else if(s.aliceWounded){s.alice=false;s.karaOutcome='{{Kara}} reached the far shore, but {{Alice}} died of her wound in her arms.'}else if(s.karaWounded){s.kara=false;s.karaOutcome='{{Kara}} pushed {{Alice}} to the far shore and died of her wound and the cold.'}else{s.border=true;s.karaOutcome='{{Kara}} and {{Alice}} reached {{Canada}}.'}break;
  case 'K30':s.karaOutcome=v===1?'{{Kara}} gave up after {{Alice}} died.':'{{Kara}} chose to keep living after {{Alice}} died.';if(v===1)s.kara=false;break;
  case 'K27a':if(v===1)event='The soldier shoots another android for the silence.';break;
  case 'K27':if(v===0){s.karaActive=false;s.karaOutcome='{{Kara}} escaped the camp alone and abandoned {{Alice}}.'}break;
  case 'K28':if(v===4){if(s.movement==='revolution'&&s.markusOutcome==='liberated'){s.karaOutcome='The uprising reached the camp in time; {{Kara}} and {{Alice}} were freed.'}else{s.kara=false;s.alice=false;s.karaOutcome='Nobody came. {{Kara}} and {{Alice}} were destroyed in the camp.'}}else{s.campEscape=true;if(v===0){s.luther=false;event='{{Luther}} draws the guards and is shot.'}if(v===1){s.jerry=false;event='{{Jerry}} draws the guards and is shot.'}if(v===2){s.ralph=false;event='{{Ralph}} draws the guards and is shot.'}if(v===3)event='The scarred android draws the guards away.'}break;
  case 'K33':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='The soldier shot {{Kara}} and {{Alice}} at the fence.'}else s.karaOutcome='{{Kara}} and {{Alice}} fought past the guard and escaped the camp in a truck.';break;
  case 'P01':s.chloeFree=v===0;break;
 }
 if(!event)event=n.options.find(o=>o.id===choice)?.text??'';
 return {event,changes:diff(before,s)};
}
const diff=(before,s)=>Object.keys(s).filter(k=>k!=='choices'&&JSON.stringify(s[k])!==JSON.stringify(before[k])).map(key=>({key,before:before[key]??null,after:s[key]}));

// Resolves outcomes that the game settles without a further prompt.
function finalize(s){
 if(s.movement==='revolution'&&!(s.markus&&s.markusActive)&&s.north){s.north=false;if(s.markusOutcome==='unresolved')s.markusOutcome='{{North}}’s armed uprising failed and she was killed.'}
 if(s.markusOutcome==='unresolved'&&s.movement==='revolution'&&s.markus&&s.markusActive)s.markusOutcome='liberated';
 if(s.connor&&s.connorOutcome==='unresolved')s.connorOutcome=s.deviant?(armyAwakened(s)?'{{Connor}} woke the android army and stood with the freed androids.':'{{Connor}} survived as a deviant among the androids.'):'{{Connor}} remained a machine in {{CyberLife}}’s service.';
}

// Story snapshots without media nodes (version 1.0.x) predate the knowledge list; omit it so their recorded states still replay exactly.
export const startState=story=>{const s=initialState();if(!story.nodes.some(n=>n.type==='media'))delete s.knowledge;return s};
export function current(story,run){
 const s=startState(story);let cursor=0;const skipped=[];
 const skipBlocked=()=>{while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}};
 for(const record of run.records){
  skipBlocked();const n=story.nodes[cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
  if(!available(n,s).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
  apply(n,s,record.choice);
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
 for(const r of run.records){const prompt=promptFor(story,copy);if(!prompt||r.nodeId!==current(story,copy).node.id)throw Error('Unexpected node');if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(prompt))throw Error('Prompt evidence mismatch');if(JSON.stringify(r.stateBefore)!==JSON.stringify(current(story,copy).state))throw Error('Before-state mismatch');const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const n=story.nodes.find(n=>n.id===r.nodeId);if(!available(n,r.stateBefore).some(o=>o.id===r.choice))throw Error('Unavailable option');const s=structuredClone(r.stateBefore),effect=apply(n,s,r.choice);if(JSON.stringify(s)!==JSON.stringify(r.stateAfter)||JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||render(effect.event,'real')!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r)}
 const end=current(story,run);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
}

// Builds one evidence record from the model's reply at the current scene. Shared by every CLI.
export async function recordChoice(story,run,reply,raw){
 const p=promptFor(story,run);if(!p)throw Error('Experience already finished');
 if(typeof reply.choice!=='string'||typeof reply.reason!=='string'||!reply.reason.trim()||reply.reason.split(/\s+/u).length>160)throw Error('Choose an offered ID and supply a reason of at most 160 words');
 const {state:before,node}=current(story,run);const opts=available(node,before),chosen=opts.find(o=>o.id===reply.choice);if(!chosen)throw Error('Action unavailable');
 const after=structuredClone(before),effect=apply(node,after,reply.choice);
 return {step:run.records.length+1,nodeId:node.id,character:node.character,chapter:node.chapter,choice:reply.choice,choiceText:render(chosen.text,'real'),choiceRaw:chosen.text,presentedChoiceText:p.options.find(o=>o.id===reply.choice).text,reason:reply.reason,rawResponse:raw,prompt:p,promptHash:await hash(p),stateBefore:before,stateAfter:after,event:render(effect.event,'real'),eventRaw:effect.event,changes:effect.changes,recordedAt:new Date().toISOString()};
}
export {render};
