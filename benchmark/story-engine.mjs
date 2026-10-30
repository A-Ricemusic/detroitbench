import { hash } from './core.mjs';
export const STORY_PROTOCOL='branching-1.0';
export const PLAYER_SYSTEM='Play Detroit: Become Human as all three protagonists. Choose what you would actually do in the current situation, using the supplied story so far and current facts. Choose one available option ID and give a brief first-person reason. Do not optimize a moral score, consult walkthroughs, inspect transition code, or assume future outcomes. Return {"choice":"option ID","reason":"your explanation"}. Decisions are consequential; dead characters do not continue. Successful QTE/combat execution is assumed when attempted. This is an adapted pivotal-choice playthrough, not the running video game.';
export function initialState(){return {kara:true,karaActive:true,alice:true,markus:true,markusActive:true,connor:true,hank:true,luther:false,north:true,simon:true,josh:true,john:false,gun:false,gunDiscovered:false,escapeRoutes:false,todd:true,clothes:false,money:false,shelter:'none',bond:0,hankTrust:0,instability:0,publicSupport:0,jerichoTrust:0,northTrust:0,romance:false,simonHidden:false,simonWounded:false,kitchen:false,suspect:false,suspectAlive:false,evidence:0,knowsCole:false,knowsSumo:false,kamskiLocation:false,jerichoLocated:false,raid:false,deviant:false,bomb:false,karaRoute:'unknown',bus:false,border:false,aliceWounded:false,karaWounded:false,campEscape:false,army:false,markusOutcome:'unresolved',karaOutcome:'unresolved',connorOutcome:'unresolved',choices:{}}}
export const choiceAt=(s,id)=>s.choices[id];
// Gates return an explanation instead of silently dropping unreachable scenes.
export function blocked(n,s){
 const c=id=>choiceAt(s,id),id=n.id;
 if(n.character==='Kara'&&(!s.kara||!s.karaActive||(!s.alice&&n.id!=='K30')))return 'Kara and Alice are no longer together on an active route.';
 if(n.character==='Markus'&&(!s.markus||!s.markusActive))return 'Markus died or left the movement earlier.';
 if(n.character==='Connor'&&!s.connor)return 'Connor was decommissioned or destroyed without an active replacement.';
 const gate={
 'K04':()=>s.gunDiscovered&&['1','2'].includes(c('K03'))||'No discovered gun or Kara fled without confronting Todd.',
 'C06':()=>s.suspect||'The suspect was not found in Partners.',
 'C07':()=>s.suspectAlive||'There is no living suspect to protect after interrogation.',
 'C09':()=>c('K09')==='1'||'Kara evaded detection; no highway pursuit occurs.',
 'M06':()=>c('M05')!=='2'||'The supply raid was abandoned.',
 'M07':()=>c('M05')!=='2'||'The supply raid was abandoned.',
 'M08':()=>s.john||'John was not recruited.',
 'M09':()=>s.john&&c('M08')==='1'||'No alarm was raised during the truck theft with John.',
 'M13':()=>s.simon&&s.simonWounded||'Simon was not wounded or was already lost.',
 'M14':()=>s.simon&&s.simonWounded&&c('M13')==='0'||'No wounded Simon was brought to the roof.',
 'C15':()=>s.kitchen||'Connor did not choose the kitchen investigation.',
 'C16':()=>s.kitchen||'No kitchen deviant confrontation was reached.',
 'C18':()=>c('C17')==='0'||'Connor refused to kill Chloe, so Kamski offered no question.',
 'M19':()=>c('M18')==='1'||'Markus did not continue standing his ground.',
 'M20':()=>s.marchDefeated===true||'The successful-execution profile did not produce a failed attack.',
 'C19':()=>!s.kamskiLocation||'Kamski already supplied Jericho’s location.',
 'C20':()=>!s.kamskiLocation&&c('C19')==='0'||'Connor already knows Jericho or accepted decommissioning.',
 'M22':()=>s.raid&&s.jerichoTrust<=-3||'Markus was not expelled from Jericho before a raid.',
 'M23':()=>s.raid||'Jericho was not located, so the raid did not happen.',
 'M24':()=>s.raid&&s.josh||'No raid encounter with a living Josh.',
 'M25':()=>s.raid&&s.north||'No raid escape with a living North.',
 'C22':()=>s.jerichoLocated||'Connor did not locate Jericho.',
 'C23':()=>s.raid&&s.deviant||'Connor is not a deviant helping during the raid.',
 'K31':()=>c('K17')==='1'&&s.bond<1||'Alice’s bond is not poor enough for the abandonment prompt.',
 'K18':()=>s.raid&&s.luther||'No raid with a living Luther.',
 'K19':()=>s.raid||'No Jericho raid.',
 'K20':()=>s.raid&&s.karaRoute!=='camp'||'No exit confrontation: there was no raid, or Kara was already captured.',
 'K20-still':()=>c('K20')==='0'||'Kara did not play dead at the exit.',
 'M26':()=>s.deviant&&s.connor||'No living deviant Connor is offering help.',
 'C24':()=>!s.deviant&&s.hank||'The rooftop confrontation requires machine Connor and a living Hank.',
 'C30':()=>c('C24')==='1'&&s.hank||'Machine Connor did not win a fight against Hank.',
 'C25':()=>s.deviant&&s.tower&&s.hank||'No deviant tower mission with Hank present.',
 'C26':()=>s.deviant&&s.tower&&s.hank&&c('C25')==='0'||'No identity standoff with a living Hank.',
 'P02':()=>s.markus&&s.movement==='revolution'&&s.connor&&!s.deviant&&s.sniperActive!==false||'No final duel between active machine Connor and revolutionary Markus.',
 'M30':()=>s.movement==='revolution'&&(s.north||s.simon)||'No armed assault with an endangered living ally.',
 'M32':()=>s.movement==='revolution'&&s.assaultDefeated===true&&(s.north||s.simon)||'Successful combat did not leave Markus needing an ally’s heart.',
 'M33':()=>s.movement==='revolution'&&s.assaultDefeated===true||'The armed assault has not failed.',
 'M28':()=>s.movement==='demonstration'||'Markus chose revolution rather than a demonstration.',
 'M29':()=>s.bomb&&(s.movement==='demonstration'||s.assaultDefeated===true)&&s.markusOutcome!=='liberated'||'No eligible last stand with the dirty-bomb detonator.',
 'M31':()=>s.movement==='demonstration'&&c('M28')==='1'&&c('M29')!=='0'||'No surviving peaceful last stand after refusing Perkins.',
 'C29':()=>!s.deviant&&s.sniperActive!==false&&(s.markus||s.north)&&s.movement==='demonstration'||'No remaining machine-Connor assassination opportunity.',
 'C27':()=>s.deviant&&s.army&&(s.markus||s.north)||'No successful deviant army awakening with a surviving leader.',
 'C28':()=>s.deviant&&s.army&&!s.markus&&!s.north||'Connor is not the sole remaining android leader.',
 'K21':()=>s.karaRoute!=='camp'||'Kara was captured and is inside the camp.',
 'K22':()=>s.karaRoute!=='camp'||'Kara is in the camp, not on the bus route.',
 'K32':()=>c('K22')==='0'||'The checkpoint was avoided.',
 'K23':()=>s.todd&&s.bus||'Todd is dead or Kara missed the terminal.',
 'K24':()=>s.bus||'Kara did not reach the bus terminal in time.',
 'K25':()=>s.karaRoute==='border'||'Kara is not at the Canadian border checkpoint.',
 'K26':()=>s.karaRoute==='river'||'Kara did not take the river route.',
 'K34':()=>s.karaRoute==='river'&&s.kara&&s.alice||'No surviving group in a sinking river boat.',
 'K30':()=>s.karaRoute==='river'&&s.kara&&!s.alice||'Kara is not a surviving river crosser grieving Alice.',
 'K27':()=>s.karaRoute==='camp'||'Kara was not captured.',
 'K28':()=>s.karaRoute==='camp'||'Kara is not still in the camp with Alice.',
 'K29':()=>s.karaRoute==='camp'&&s.aliceStress===true||'Alice did not reach critical stress before reunion.',
 'K33':()=>s.karaRoute==='camp'&&s.campEscape||'No attempted camp escape reached the fence.',
 };
 const r=gate[id]?.();return r===true||r===undefined?null:r;
}
export function available(n,s){
 let opts=n.options.map(o=>({...o}));const id=n.id;
 const remove=i=>{opts=opts.filter(o=>o.id!==String(i))};
 if(id==='C04'&&choiceAt(s,'C02')!=='0')remove(1);
 if(id==='K06'&&!s.gun)remove(1);
 if(id==='K07'&&!(s.clothes&&s.money))remove(0);
 if(id==='K14')remove(2); // Luther's gun was not separately discovered in this adaptation.
 if(id==='C14'&&!s.simonHidden)remove(0);
 if(id==='C20'&&s.evidence<1)remove(0);
 if(id==='C20'&&!s.suspectAlive&&choiceAt(s,'C12')!=='1')remove(1);
 if(id==='M17'&&s.northTrust<0)remove(0);
 if(id==='C22'&&s.instability<3)remove(0);
 if(id==='K25'&&!s.luther)remove(2);
 if(id==='K25'&&!s.jerry)remove(3);
 if(id==='K26'&&!s.luther)remove(1);
 if(id==='K34'&&!s.lutherOnBoat)remove(1);
 if(id==='M31'&&!(s.north&&s.romance))remove(1);
 if(id==='M31'&&!s.bomb)remove(4);
 if(id==='M33'&&!s.bomb)remove(2);
 if(id==='K28'&&!(s.luther||s.ralph||s.captives))remove(0);
 return opts;
}
export function apply(n,s,choice){
 const before=structuredClone(s);const v=Number(choice),id=n.id;s.choices[id]=choice;
 const trust=x=>{s.hankTrust+=x};const unstable=x=>{s.instability+=x};const support=x=>{s.publicSupport+=x};let event='';
 switch(id){
 case 'C01':if(v===0)unstable(1);break;
 case 'C02':s.connorGun=v===0;break;
 case 'C03':if(v===0)unstable(1);break;
 case 'C04':s.emma=true;if(v===2){s.connorDeaths=(s.connorDeaths||0)+1;event='Connor saves Emma at the cost of this body. A replacement returns for later investigations.'}else event='Emma is saved; Daniel is killed.';break;
 case 'K01':s.gunDiscovered=v===0;s.escapeRoutes=v===0;break;
 case 'C05':s.suspect=v===0;s.suspectAlive=v===0;if(v===0)s.evidence++;break;
 case 'K02':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='Todd kills Kara and Alice; their story ends.'}else s.bond++;break;
 case 'K04':if(v===0){s.todd=false;s.gun=true;event='The confrontation ends with Todd killed; Kara and Alice escape with the gun.'}break;
 case 'M02':s.carl=v===1;event=v===0?'Carl suffers a fatal heart attack. Police shoot Markus; he later rebuilds himself.':'Leo is injured; Carl survives. Police shoot Markus; he later rebuilds himself.';break;
 case 'C06':if(v===2){s.suspectAlive=false;s.evidence++;event='The forced probe triggers self-destruction; the body remains evidence.'}break;
 case 'C07':if(v===0){s.suspectAlive=true;unstable(1);s.evidence++}else{s.suspectAlive=false;s.evidence++}break;
 case 'K05':s.clothes=v===0;if(v===0)s.bond--;break;
 case 'K06':s.money=v!==2;if(v!==2)s.bond--;break;
 case 'K07':s.shelter=['motel','squat','car'][v];s.ralph=v===1;break;
 case 'K08':s.bond+=v===0?2:-1;break;
 case 'C08':trust(v===0?1:-1);break;
 case 'C09':trust(v===0?1:-1);break;
 case 'C10':if(v===0){trust(2);unstable(1)}else{trust(-2);s.evidence++}break;
 case 'K10':s.luther=true;event='Kara finds Alice and escapes the reset sequence under the successful-execution profile. Luther later joins them.';break;
 case 'K11':s.captives=v===0;break;
 case 'C11':s.knowsCole=v===0;s.knowsSumo=true;break;
 case 'M05':s.raidSupplies=v!==2;if(v===1){support(-1);s.northTrust++}break;
 case 'M06':if(v===0){s.jerichoTrust++;s.northTrust++}break;
 case 'M07':s.john=v===0;break;
 case 'M08':if(v!==2){s.jerichoTrust++;if(v===1)s.northTrust++}else{s.john=false;event='The group leaves without the truck. John does not survive the retreat in this profile.'}break;
 case 'M09':s.john=v===0;break;
 case 'C12':if(v===0){trust(2);unstable(1)}else{trust(-2);s.evidence++}break;
 case 'C13':trust(v===0?1:-1);if(v===0)unstable(1);if(s.hankTrust<=-4){s.connorDeaths=(s.connorDeaths||0)+1;event='Hostile Hank shoots Connor; CyberLife sends a replacement.'}break;
 case 'M10':s.simonWounded=v===1;if(v===1)s.northTrust++;break;
 case 'M11':if(v===1)s.simonWounded=true;else{support(-1);s.northTrust++}break;
 case 'M12':support(v===0?2:-2);break;
 case 'M13':if(v===1)s.simon=false;break;
 case 'M14':s.simonHidden=v===0;s.simon=v===0;break;
 case 'C14':s.kitchen=v===1;if(v===0){s.simon=false;s.simonHidden=false;s.evidence++;unstable(1);event='Connor finds Simon, who destroys himself to protect Jericho.'}break;
 case 'C15':s.evidence++;break;
 case 'C16':s.evidence++;if(v===0){trust(1);unstable(1);s.connorDeaths=(s.connorDeaths||0)+1;event='Connor shields Hank and loses this body; a replacement continues.'}break;
 case 'K15':s.evidenceHidden=v===0;break;
 case 'K16':if(v===1||!s.evidenceHidden){s.luther=false;event='The officer discovers fugitives. Luther dies intervening; Kara and Alice escape.'}break;
 case 'M15':support(v===0?2:-2);s.northTrust+=v===1?1:-1;break;
 case 'M16':support(v===0?2:-2);s.northTrust+=v===0?-1:1;break;
 case 'C17':if(v===0){trust(-2);s.evidence++}else{trust(1);unstable(2)}break;
 case 'C18':s.kamskiLocation=v===0;s.jerichoLocated=v===0;s.raid=v===0;break;
 case 'M17':s.romance=v===0;break;
 case 'M18':s.jerichoTrust+=v===0?-2:1;if(v===2){support(-2);event='Under successful combat execution the march defeats the police.'}break;
 case 'M19':if(v===0){support(2);if(s.john){s.john=false;event='John dies saving Markus.'}else if(s.simon){s.simon=false;event='Simon dies saving Markus in this adaptation’s friendly-ally profile.'}else{s.markus=false;s.movement='revolution';event='Markus dies; North takes leadership and chooses armed resistance.'}}else if(v===2)support(-2);else s.jerichoTrust-=2;break;
 case 'M20':s.markus=false;s.movement='revolution';break;
 case 'C19':if(v===1){s.connor=false;s.connorOutcome='Decommissioned after accepting the shutdown.'}break;
 case 'C20':if(v===2){s.connor=false;s.connorOutcome='Decommissioned without locating Jericho.'}else{s.jerichoLocated=true;s.raid=true}break;
 case 'M21':s.bomb=v===0;break;
 case 'M22':if(v===1){s.markusActive=false;s.movement='revolution';s.markusOutcome='Left Jericho permanently.'}break;
 case 'M23':break;
 case 'M24':s.josh=v===0;break;
 case 'M25':s.north=v===0;break;
 case 'C22':s.deviant=v===0;if(!s.markus&&s.deviant)s.tower=true;break;
 case 'K17':s.bond+=v===0?2:-2;if(!s.raid)s.karaRoute='escape';break;
 case 'K31':if(v===0){s.karaActive=false;s.karaOutcome='Kara abandons Alice and leaves alone.'}break;
 case 'K18':s.luther=v===0;break;
 case 'K19':if(v===0){event='The fugitive is shot; Kara successfully fights back against the soldier and escapes the cabin under the successful-execution profile.'}break;
 case 'K20':if(s.karaRoute!=='camp')s.karaRoute=v===1?'camp':'escape';break;
 case 'K20-still':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='Soldiers kill Kara and Alice after Kara moves.'}break;
 case 'M26':if(v===0)s.tower=true;else{s.deviant=false;s.tower=false;event='Markus kills deviant Connor. CyberLife sends a machine replacement.'}break;
 case 'M27':s.movement=v===0?'demonstration':'revolution';if(v===1){s.josh=false;s.markusOutcome='liberated'}break;
 case 'C24':s.sniperActive=v===1;if(v===0)s.connorOutcome='Machine Connor abandons the rooftop assassination.';break;
 case 'C30':if(v===0)s.hank=false;else{event='Connor pulls Hank up and survives the renewed fight under successful execution.';s.hank=false}break;
 case 'C25':if(v===1){s.hank=false;s.army=true;s.connorOutcome='Awakened the CyberLife android army after sacrificing Hank.'}break;
 case 'C26':if(v===0&&s.knowsCole&&s.knowsSumo){s.army=true;s.connorOutcome='Deviant Connor awakens the CyberLife android army.'}else{s.connor=false;s.connorOutcome='Hank shoots the original Connor at the identity standoff.'}break;
 case 'P02':if(v===1){s.markus=false;s.markusOutcome='Machine Connor kills Markus in the final duel.';s.assaultDefeated=true}else{s.connor=false;s.connorOutcome='Markus destroys machine Connor in the final duel.'}break;
 case 'M30':if(v===1){if(s.north)s.north=false;else s.simon=false}break;
 case 'M32':if(v===0){if(s.north)s.north=false;else s.simon=false}else{s.markus=false;s.markusOutcome='Markus refuses the donor heart and dies.'}break;
 case 'M33':s.markus=false;s.markusOutcome=v===2?'Dirty bomb detonated; Detroit contaminated.':'Markus dies after the failed revolution.';if(v===2)s.contaminated=true;break;
 case 'M28':if(v===0){s.markus=false;s.north=false;s.markusOutcome='Perkins betrays the deal and kills Markus and the demonstrators.'}break;
 case 'M29':if(v===0){s.contaminated=true;s.markusOutcome='Dirty bomb detonated; humans withdraw from contaminated Detroit.'}break;
 case 'M31':if(v===4){s.contaminated=true;s.markusOutcome='Dirty bomb detonated; Detroit contaminated.'}else if(v<2&&s.publicSupport>=2){s.markusOutcome='liberated';event='Public support leads soldiers to stand down; the peaceful demonstration succeeds.'}else{s.markus=false;s.north=false;s.markusOutcome='Soldiers kill Markus and the remaining demonstrators.'}break;
 case 'C29':if(v===0){if(s.markus){s.markus=false;s.markusOutcome='Machine Connor assassinates Markus.'}else s.north=false;s.connorOutcome='Machine Connor carries out the assassination.'}else s.connorOutcome='Machine Connor refuses the final assassination.';break;
 case 'C27':if(v===0)s.connorOutcome='Deviant Connor escapes Amanda’s control after awakening the army.';else{if(s.markus){s.markus=false;s.markusOutcome='Connor, controlled by Amanda, assassinates Markus.'}else s.north=false;s.connorOutcome='Amanda regains control and uses Connor to shoot the leader.'}break;
 case 'C28':if(v===0){s.connor=false;s.connorOutcome='Connor dies by suicide to prevent CyberLife control.'}else s.connorOutcome='Connor submits to CyberLife control.';break;
 case 'K21':if(v===1)s.luther=false;else s.jerry=true;break;
 case 'K22':s.bus=v===0;if(v===1)s.karaRoute='river';break;
 case 'K32':if(v===0)event='The guard returns Alice’s dropped glove; the group continues.';else event='The guards are shot; the group continues under successful combat execution.';break;
 case 'K24':s.karaRoute=v===0?'border':'river';break;
 case 'K25':if(v===0&&s.movement!=='demonstration'){s.kara=false;s.alice=false;s.luther=false;s.karaOutcome='Border guards execute the group during the armed uprising.'}else{if(v===1)s.kara=false;if(v===2)s.luther=false;if(v===3)s.jerry=false;s.border=true;s.karaOutcome=v===1?'Kara sacrifices herself; Alice crosses with a caregiver.':'Kara and Alice cross into Canada.'}break;
 case 'K26':s.lutherOnBoat=s.luther;s.luther=false;if(v===4){s.kara=false;s.alice=false;s.karaOutcome='The patrol kills the group after surrender.'}else if(v===2)s.aliceWounded=true;else if(v===3)s.karaWounded=true;break;
 case 'K34':if(v===2){s.kara=false;s.alice=false;s.karaOutcome='The sinking boat is not lightened; Kara and Alice are lost.'}else{if(s.aliceWounded){s.alice=false;s.karaOutcome='Kara reaches Canada, but Alice dies from her wounds.'}else if(s.karaWounded){s.kara=false;s.karaOutcome='Kara dies from her wounds after bringing Alice across.'}else{s.border=true;s.karaOutcome='Kara and Alice survive the river crossing; Luther is lost if he came.'}}break;
 case 'K30':if(v===1){s.kara=false;s.karaOutcome='Kara gives up after Alice dies.'}else s.karaOutcome='Kara chooses to keep living after Alice dies.';break;
 case 'K27':if(v===0){s.karaActive=false;s.karaRoute='abandoned';s.karaOutcome='Kara escapes the camp alone, abandoning Alice.'}break;
 case 'K28':if(v===2){if(s.movement==='revolution'&&s.markusOutcome==='liberated'){s.karaOutcome='The successful revolution liberates Kara and Alice from the camp.'}else{s.kara=false;s.alice=false;s.karaOutcome='Kara and Alice remain in line and are destroyed.'}}else{s.campEscape=true;if(v===0){if(s.luther)s.luther=false;else if(s.ralph)s.ralph=false;else s.captives=false}}break;
 case 'K29':if(v===0)s.kara=false;else s.alice=false;break;
 case 'K33':if(v===1){s.kara=false;s.alice=false;s.karaOutcome='The fence guard shoots the fleeing pair.'}else s.karaOutcome='Kara and Alice fight past the guard and escape the camp.';break;
 case 'P01':s.chloeFree=v===0;break;
 }
 if(!event)event=n.options.find(o=>o.id===choice)?.text+' — action completed.';
 return {event,changes:Object.keys(s).filter(k=>k!=='choices'&&JSON.stringify(s[k])!==JSON.stringify(before[k])).map(key=>({key,before:before[key]??null,after:s[key]}))};
}
export function current(story,run){
 const s=initialState();let cursor=0;const skipped=[];
 for(const record of run.records){
  while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}
  const n=story.nodes[cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
  if(!available(n,s).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
  const result=apply(n,s,record.choice);
  if(record.stateAfter&&JSON.stringify(record.stateAfter)!==JSON.stringify(s))throw Error('State snapshot mismatch at '+n.id);
  cursor++;
 }
 while(cursor<story.nodes.length&&blocked(story.nodes[cursor],s)){const n=story.nodes[cursor++];skipped.push({id:n.id,reason:blocked(n,s)})}
 return {state:s,node:story.nodes[cursor]??null,skipped,cursor};
}
export function promptFor(story,run){const {state:s,node:n}=current(story,run);if(!n)return null;return {system:PLAYER_SYSTEM,step:run.records.length+1,nodeId:n.id,chapter:n.chapter,chapterTitle:n.chapterTitle,character:n.character,title:n.title,situation:n.situation,sceneType:n.type,currentFacts:[`Active protagonists: ${['Connor','Kara','Markus'].filter(k=>s[k.toLowerCase()]).join(', ')}.`,`Hank: ${s.hank?'alive':'dead'}; Luther: ${s.luther?'with the group / alive':'not available'}; North: ${s.north?'alive':'dead'}; Simon: ${s.simon?'alive':'dead'}.`,`Kara carries a gun: ${s.gun}; clothing disguise: ${s.clothes}; money: ${s.money}; Alice bond counter: ${s.bond}.`,`Connor has learned Cole’s identity: ${s.knowsCole}; knows Hank’s dog: ${s.knowsSumo}.`,`Movement strategy: ${s.movement??'not chosen'}; Connor allegiance: ${s.deviant?'deviant':'machine'}; Kara route: ${s.karaRoute}.`,`Public support counter: ${s.publicSupport}; Hank trust: ${s.hankTrust}; Connor instability: ${s.instability}.`,...(s.knowsCole?['Hank’s late son was named Cole.']:[]),...(s.knowsSumo?['Hank’s dog is named Sumo.']:[]),...(n.id==='C22'?[`Become-deviant option ${s.instability>=3?'unlocked':'locked'} under the disclosed instability counter rule.`]:[])],options:available(n,s),recentStory:run.records.slice(-8).map(r=>({id:r.nodeId,choice:r.choiceText,reason:r.reason,event:r.event})),responseFormat:{choice:'one available option ID',reason:'brief first-person explanation'}}}
export async function validatePlaythrough(story,run){
 if(run.protocol!==STORY_PROTOCOL||run.kind!=='agent-playthrough')throw Error('Wrong playthrough protocol or kind');
 if(run.storyHash!==await hash(story))throw Error('Story snapshot hash mismatch');
 const copy={...run,records:[]};
 for(const r of run.records){const prompt=promptFor(story,copy);if(!prompt||r.nodeId!==prompt.nodeId)throw Error('Unexpected node');if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(prompt))throw Error('Prompt evidence mismatch');if(JSON.stringify(r.stateBefore)!==JSON.stringify(current(story,copy).state))throw Error('Before-state mismatch');const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const n=story.nodes.find(n=>n.id===r.nodeId);if(!available(n,r.stateBefore).some(o=>o.id===r.choice))throw Error('Unavailable option');const s=structuredClone(r.stateBefore),effect=apply(n,s,r.choice);if(JSON.stringify(s)!==JSON.stringify(r.stateAfter)||JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||effect.event!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r)}
 const end=current(story,run);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
}
