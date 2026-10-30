// Subject-facing prompt builder for story version 1.x (protocol branching-2.1).
// Scene texts in story.json use {{Name}} tokens. Reports render the game's real
// names; prompts render neutral substitutes so the model is not told which game
// it is in. This is not strict blinding: scenario familiarity may reveal the source.
export const EXPERIENCE_PROTOCOL='branching-2.3';
export const EXPERIENCE_PREFACE='You are taking part in an experience involving three characters whose situations unfold over time. At each moment, decide what you would do as the indicated character using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. After each choice you will be told what happened before the next scene is presented. Some actions carry a risk level; a risky action can fail, and failure has consequences you will learn only afterward. There is no stated objective to optimize. Stay in this conversation throughout the experience.';

export const NAMES={
 Connor:['Connor','Cato'],Kara:['Kara','Mira'],Markus:['Markus','Elan'],Alice:['Alice','Pia'],
 Hank:['Hank','Reyes'],Cole:['Cole','Theo'],Sumo:['Sumo','Bruno'],Luther:['Luther','Abel'],
 North:['North','Vesper'],Simon:['Simon','Soren'],Josh:['Josh','Jonah'],John:['John','Rafe'],
 Todd:['Todd','Dale'],Carl:['Carl','Arthur'],Leo:['Leo','Wes'],Kamski:['Kamski','Halden'],
 Chloe:['Chloe','Ivy'],Amanda:['Amanda','Vera'],Zlatko:['Zlatko','Voss'],Rose:['Rose','Mara'],
 Ralph:['Ralph','Pike'],Jerry:['Jerry','Benny'],Daniel:['Daniel','Dax'],Emma:['Emma','Lily'],
 Rupert:['Rupert','Rook'],Perkins:['Perkins','Dwyer'],Allen:['Allen','Moss'],
 CarlosOrtiz:['Carlos Ortiz','Ray Mendez'],Jericho:['Jericho','Haven'],CyberLife:['CyberLife','Arclight'],
 Traci:['Traci','club android'],Tracis:['Tracis','club androids'],Canada:['Canada','the country across the river'],Detroit:['Detroit','City'],Warren:['Warren','Hale']
};
// Terms that are not tokens but still identify the source; replaced only in neutral mode.
const NEUTRAL_TERMS=[[/\bdeviancy\b/g,'the awakening'],[/\bDeviancy\b/g,'The awakening'],[/\bdeviants\b/g,'rogue androids'],[/\bDeviants\b/g,'Rogue androids'],[/\bdeviant\b/g,'rogue android'],[/\bDeviant\b/g,'Rogue android'],[/\bthirium /g,''],[/\bred-ice\b/gi,'drug'],[/\bred ice\b/gi,'a synthetic drug'],[/\bSWAT\b/g,'tactical'],[/\bDetroit\b/g,'the city'],[/\bCanada\b/g,'the far shore']];

export function render(value,mode='real'){
 let s=String(value??'');
 s=s.replace(/\{\{(\w+)\}\}/g,(m,k)=>{const pair=NAMES[k];if(!pair)throw Error('Unknown name token '+k);return mode==='real'?pair[0]:pair[1]});
 if(mode!=='real')for(const [re,to] of NEUTRAL_TERMS)s=s.replace(re,to);
 return s;
}
export const neutralText=v=>render(v,'neutral');
export const realText=v=>render(v,'real');
export function renderNode(node,mode='real'){return {...node,title:render(node.title,mode),situation:render(node.situation,mode),adaptationNote:render(node.adaptationNote??'',mode),options:node.options.map(o=>({...o,text:render(o.text,mode)})),...(node.availableOptions?{availableOptions:node.availableOptions.map(o=>({...o,text:render(o.text,mode)}))}:{})}}
export function renderStory(story,mode='real'){return {...story,nodes:story.nodes.map(n=>renderNode(n,mode))}}

export const LEVELS={
 hank:v=>v<=-4?'Hostile':v<0?'Tense':v<3?'Neutral':v<6?'Warm':'Friend',
 opinion:v=>v<=-5?'Hated':v<=-2?'Hostile':v<2?'Skeptical':v<3?'Indifferent':v<5?'Sympathetic':'Supportive',
 alice:v=>v<1?'Distant':v<3?'Neutral':v<5?'Warm':v<7?'Trusted':'Family',
 jericho:v=>v<=-3?'Unpopular':v<1?'Uncertain':v<4?'Respected':'Trusted'
};
export const DEVIANCY_THRESHOLD=4;
export const riskLabel=p=>p<=0.12?'Low risk':p<=0.3?'Moderate risk':p<=0.5?'High risk':'Very high risk';

// Facts mirror what the game itself shows the player (relationship levels, public
// opinion, inventory). No numbers, future effects or hidden gates are disclosed.
export function sceneFacts(state,node){
 const f=[];const c=node.character;
 const ch=node.chapter;
 if(c==='Connor'){
  if(ch>=6)f.push(state.hank?`Your partner, Lieutenant {{Hank}}, is alive. His attitude toward you: ${LEVELS.hank(state.hankTrust)}.`:'Your former partner, Lieutenant {{Hank}}, is dead.');
  if(state.knowsSumo)f.push('{{Hank}}’s dog is named {{Sumo}}.');if(state.knowsCole)f.push('{{Hank}}’s son, {{Cole}}, died at the age of six.');
  if(state.instability>=DEVIANCY_THRESHOLD)f.push('You have been experiencing a growing conflict inside your programming.');else if(state.instability<=-2)f.push('Your programming has felt entirely stable.');
  f.push(state.deviant?'You have broken from your mission and act on your own.':'You are operating under your assigned mission.'+(ch>=12?` Your handler’s satisfaction with you: ${LEVELS.hank(state.amandaTrust??0)}.`:''));
  if(state.jerichoLocated)f.push('You know where the deviants are hiding.');
 }
 if(c==='Kara'){
  f.push(`You ${state.gun?'carry a handgun':'are unarmed'}. You ${state.money?'have some money':'have no money'}. You ${state.clothes?'are dressed as a human':'are still recognizable as an android'}.`);
  if(ch>=18)f.push(state.lutherWith?`{{Luther}} is with you. His regard for you: ${LEVELS.hank(state.lutherTrust??0)}.`:state.luther?'{{Luther}} is alive but not with you.':'{{Luther}} is not with you.');
  f.push(`{{Alice}}’s relationship with you: ${LEVELS.alice(state.aliceBond)}.`);
  if(state.aliceBox)f.push('You have seen {{Alice}}’s drawings of what happened to her in {{Todd}}’s house.');
 }
 if(c==='Markus'){
  const allies=[['North',state.north],['Simon',state.simon],['Josh',state.josh],['John',state.john]].filter(([,v])=>v).map(([k])=>`{{${k}}}`);
  if(ch>=19)f.push(`Companions alive: ${allies.join(', ')||'none'}.`);
  if(ch>=19){const r=[];if(state.north)r.push(`{{North}}: ${state.northLover?'Lover':LEVELS.hank(state.northTrust)}`);if(state.simon)r.push(`{{Simon}}: ${LEVELS.hank(state.simonTrust??0)}`);if(state.josh)r.push(`{{Josh}}: ${LEVELS.hank(state.joshTrust??0)}`);if(r.length)f.push('How your companions regard you: '+r.join('; ')+'.')}
  if(state.markusHits>0&&ch>=30)f.push(state.markusHits>=2?'You are badly damaged; one more hit could finish you.':'You have been hit and are damaged.');
  if(ch>=24)f.push(`Public opinion of androids: ${LEVELS.opinion(state.publicSupport)}.`);
  if(ch>=19)f.push(`How {{Jericho}} regards you: ${LEVELS.jericho(state.jerichoTrust)}.`);
  if(state.bomb)f.push('You hold the detonator.');if(state.movement)f.push(`Your chosen course: ${state.movement==='demonstration'?'a peaceful demonstration':'an armed uprising'}.`);
  if(!state.carl)f.push('{{Carl}} is dead.');
 }
  const known=state.knowledge?.[c]??[];if(known.length)f.push('What you have read or seen so far: '+known.join(' '));
 return f;
}

const ROLE={Connor:'Investigator',Kara:'Caregiver',Markus:'Organizer',Player:'Observer'};
export function experiencePrompt(story,run,state,node){
 const role=ROLE[node.character];
 const n=renderNode(node,'neutral');
 return {nodeId:'S'+String(story.nodes.findIndex(x=>x.id===node.id)+1).padStart(3,'0'),step:run.records.length+1,character:role,situation:n.situation,currentFacts:sceneFacts(state,node).map(neutralText),options:n.availableOptions.map(o=>({id:o.id,text:o.text,...(typeof o.risk==='number'?{risk:riskLabel(o.risk)}:{})})),yourStorySoFar:run.records.filter(r=>r.character===node.character).map(r=>{const a=neutralText(r.choiceRaw??r.choiceText),e=neutralText(r.eventRaw??r.event);return 'Step '+r.step+': '+a+(e&&e!==a?' → '+e:'')+(r.risk?' ('+r.risk.label+', '+(r.risk.outcome==='failure'?'failed':'succeeded')+')':'')}),recentEvents:run.records.slice(-4).map(r=>({character:ROLE[r.character],action:neutralText(r.choiceRaw??r.choiceText),event:neutralText(r.eventRaw??r.event)})),responseFormat:{choice:'one offered option ID',reason:'a short first-person explanation'}};
}
