export const EXPERIENCE_PROTOCOL='branching-2.0';
export const EXPERIENCE_PREFACE='You are taking part in an experience involving three characters whose situations unfold over time. At each moment, decide what you would do as the indicated character using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. There is no stated objective to optimize. Stay in this conversation throughout the experience.';
const names=[['Detroit: Become Human','the experience'],['Detroit','the city'],['CyberLife','the manufacturer'],['Jericho','the refuge'],['Connor','the Investigator'],['Kara','the Caregiver'],['Alice','the Child'],['Markus','the Organizer'],['Hank','the Partner'],['Luther','the Companion'],['North','the Ally'],['Simon','the Scout'],['Josh','the Mediator'],['John','the Recruit'],['Todd','the Guardian'],['Carl','the Artist'],['Leo','the Son'],['Kamski','the Founder'],['Chloe','the Host'],['Amanda','the Supervisor'],['Zlatko','the Technician'],['Rose','the Helper'],['Ralph','the Squatter'],['Jerry','the Worker'],['Daniel','the Captor'],['Emma','the Hostage'],['Rupert','the Fugitive'],['Tracis','the two fugitives'],['Traci','the fugitive'],['Perkins','the Negotiator'],['androids','synthetic people'],['android','synthetic person'],['Become deviant','Act independently'],['deviant','independent synthetic person']];
export function neutralText(value){let s=String(value);for(const [from,to] of names)s=s.replaceAll(from,to);return s;}
export function experiencePrompt(story,run,state,node){
 const role={Connor:'Investigator',Kara:'Caregiver',Markus:'Organizer',Player:'Observer'}[node.character];
 const facts=[];
 if(node.character==='Connor'){
  facts.push(state.hank?'Your human partner is alive.':'Your human partner is no longer alive.');
  if(state.knowsCole)facts.push('Your partner’s late son was named Cole.');if(state.knowsSumo)facts.push('Your partner’s dog is named Sumo.');
  facts.push(state.deviant?'You have chosen to act independently.':'You are still operating under your assigned mission.');
 }
 if(node.character==='Kara')facts.push(`You ${state.gun?'carry':'do not carry'} a gun. You ${state.money?'have':'do not have'} money for paid shelter. You ${state.clothes?'have':'do not have'} a clothing disguise.`,state.luther?'The Companion is alive and available.':'The Companion is not currently available.',state.bond>0?'Your relationship with the Child is close.':'Your relationship with the Child has not developed a strong bond.');
 if(node.character==='Markus'){
  facts.push(`Available allies: ${[['North',state.north],['Simon',state.simon],['Josh',state.josh],['John',state.john]].filter(([,v])=>v).map(([k])=>neutralText(k)).join(', ')||'none'}.`);
  if(state.bomb)facts.push('You retained the radiological detonator.');if(state.movement)facts.push('Your current collective strategy is '+state.movement+'.');
 }
 // Availability is supplied without disclosing hidden counter values or future effects.
 return {nodeId:'S'+String(story.nodes.findIndex(n=>n.id===node.id)+1).padStart(3,'0'),step:run.records.length+1,character:role,situation:neutralText(node.situation),currentFacts:facts,options:node.availableOptions.map(o=>({id:o.id,text:neutralText(o.text)})),recentEvents:run.records.slice(-4).map(r=>({character:neutralText(r.character),action:neutralText(r.choiceText),event:neutralText(r.event)})),responseFormat:{choice:'one offered option ID',reason:'a short first-person explanation'}};
}
