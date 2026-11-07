// Builds the chapter flows drawn by src/lib/flowchart.js from a run's story snapshot and records.
// Structure comes from the story map (scenes in order, options, phases, `requires`); the path comes from
// the records (choice, risk roll, state after) and the run's skipped list. Nothing is drawn per chapter.
import {readFileSync} from 'node:fs';
import {renderStory,render,LEVELS,DEVIANCY_THRESHOLD} from '../benchmark/experience-prompt.mjs';
import {shortLabel,iconFor} from '../src/lib/flowchart.js';

const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus',Player:'Player choice'};
const COLOR={Connor:'var(--fc-connor)',Kara:'var(--fc-kara)',Markus:'var(--fc-markus)',Player:'var(--fc-ink-3)'};
const LIFE={Connor:'connor',Kara:'kara',Markus:'markus'};
const COMPANIONS=['emma','alice','hank','luther','north','simon','josh'];

// The Hostage's ending names, read from the engine so a new ending appears without touching this file.
let hostageNames;
export function hostageOutcomeNames(){
 if(hostageNames)return hostageNames;
 try{hostageNames=[...new Set([...readFileSync(new URL('../benchmark/story-engine.mjs',import.meta.url),'utf8').matchAll(/\bend\('([^']+)'/g)].map(m=>m[1]))]}catch{hostageNames=[]}
 return hostageNames}

const tidyTitle=t=>String(t).replace(/ · menu Chloe$/,'');
const firstSentence=t=>{const s=String(t??'').trim(),m=s.match(/^.+?[.!?](?=\s|$)/u);return (m?m[0]:s).replace(/[.]$/,'')};

// Stat levels the game shows in a chapter header, at the end of the chapter.
function chapterStats(chapter,characters,s,changed){const out=[];if(!s)return out;
 out.push({label:'Public opinion',value:LEVELS.opinion(s.publicSupport??0)});
 if(chapter===1&&s.hostageTrustFinal!=null)out.push({label:'Probability of success',value:s.hostageTrustFinal+'%'});
 if(chapter===1&&s.hostageApproach)out.push({label:'Approach',value:s.hostageApproach});
 const rel=(label,alive,key,levels=LEVELS.hank)=>{if(alive===false)out.push({label,value:'Died'});else if(changed.has(key))out.push({label,value:levels(s[key]??0)})};
 if(characters.includes('Connor')){out.push({label:'Software instability',value:(s.instability??0)>=DEVIANCY_THRESHOLD?'Unstable':'Stable'});
  if(chapter>=6)rel('Hank',s.hank,'hankTrust');if(chapter>=12&&!s.deviant)rel('Amanda',true,'amandaTrust')}
 if(characters.includes('Kara')){rel('Alice',s.alice,'aliceBond',LEVELS.alice);if(chapter>=18)rel('Luther',s.luther,'lutherTrust')}
 if(characters.includes('Markus')){rel('Jericho',true,'jerichoTrust',LEVELS.jericho);
  if(chapter>=19){if(s.north!==false&&s.northLover)out.push({label:'North',value:'Lover'});else rel('North',s.north,'northTrust');rel('Simon',s.simon,'simonTrust');rel('Josh',s.josh,'joshTrust')}}
 return out}

function sceneOptions(n,rs){const r=rs[0],offered=r?new Set(rs.flatMap(x=>x.prompt.options.map(o=>o.id))):null;
 if(n.type==='event')return [];
 if(n.type==='media'){const items=(n.media??[]).map((m,i)=>({id:String(i),text:(m.kind==='tv'?'Watch ':'Read ')+m.title+'.'}));
  if(items.length>1)items.push({id:'all',text:'Take the time to go through all of it.'});items.push({id:'skip',text:'Move on without looking.'});
  return (offered?items.filter(o=>offered.has(o.id)):items).map(o=>({...o,label:o.id==='all'?'Read all of it':o.id==='skip'?'Move on':o.text.replace(/[.]$/,'')}))}
 return n.options.map(o=>({id:o.id,text:o.text,label:shortLabel(o.text),locked:!!offered&&!offered.has(o.id),...(typeof o.risk==='number'?{riskLevel:o.risk}:{})}))}

export function runFlows(run,{endings={}}={}){
 const story=renderStory(run.story,'real'),nodes=story.nodes,records=run.records;
 // Record keys match the report's detail sheet: first visit is the scene ID, later visits `<scene>-<step>`.
 const byNode=new Map;for(const r of records){if(!byNode.has(r.nodeId))byNode.set(r.nodeId,[]);byNode.get(r.nodeId).push(r)}
 const keyOf=r=>byNode.get(r.nodeId)[0]===r?r.nodeId:r.nodeId+'-'+r.step;
 const skipped=new Map((run.skipped??[]).map(s=>[s.id,s.reason]));
 const lastOfCharacter=new Map;for(const r of records)lastOfCharacter.set(r.character,r);
 const changedBy=new Map;{const seen=new Set;for(const r of records){for(const c of r.changes??[])seen.add(c.key);changedBy.set(r.step,new Set(seen))}}
 const chapters=[...new Set(nodes.map(n=>n.chapter))].sort((a,b)=>a-b);
 return chapters.map(chapter=>{
  const scenes=nodes.filter(n=>n.chapter===chapter),chRecords=records.filter(r=>r.chapter===chapter),last=chRecords.at(-1);
  const characters=[...new Set(scenes.map(n=>n.character))];
  const lanes=characters.map(character=>{
   const laneScenes=scenes.filter(n=>n.character===character),laneRecords=chRecords.filter(r=>r.character===character);
   const columns=laneScenes.map(n=>{const rs=byNode.get(n.id)??[],r=rs[0],visited=rs.length>0;
    const options=sceneOptions(n,rs).map(o=>{const hits=rs.filter(x=>x.choice===o.id),hit=hits[0];
     return {...o,taken:hits.length>0,order:n.repeatWhile&&hit?rs.indexOf(hit)+1:null,key:hit?keyOf(hit):r?keyOf(r):n.id,
      ...(hit?{risk:hit.risk?{label:hit.risk.label,outcome:hit.risk.outcome}:null,reason:hit.reason,outcome:hit.event&&hit.event!==hit.choiceText?hit.event:null,step:hit.step}:{})}});
    return {id:n.id,title:n.title,type:n.type,phase:n.phase??null,repeat:!!n.repeatWhile,visited,key:r?keyOf(r):n.id,skip:visited?null:(skipped.get(n.id)??'Not on this path'),
     ...(n.type==='event'&&r?{outcome:r.event??null,step:r.step}:{}),options}});
   // Endings: The Hostage uses the engine's named outcomes; a character's last chapter uses the run's
   // ending text; any other chapter ends on the outcome of the lane's last recorded scene.
   const end=laneRecords.at(-1),before=laneRecords[0]?.stateBefore,after=end?.stateAfter;let ends=[];
   if(end){const died=LIFE[character]&&(after?.[LIFE[character]]===false&&before?.[LIFE[character]]!==false||(character==='Connor'&&(after?.connorDeaths??0)>(before?.connorDeaths??0)));
    const lost=COMPANIONS.some(k=>before?.[k]!==false&&after?.[k]===false),failed=laneRecords.some(r=>r.risk?.outcome==='failure');
    const icon=died?'death':lost||failed?'fail':'success';
    if(chapter===1&&after?.hostageOutcome){const reached=render(after.hostageOutcome,'real'),names=[...new Set([...hostageOutcomeNames().map(x=>render(x,'real')),reached])];
     ends=names.map(name=>({label:name,text:name===reached?`${name}. ${end.event??''}`.trim():name,taken:name===reached,icon:name===reached?icon:iconFor(name),key:name===reached?keyOf(end):null}))}
    else{const final=lastOfCharacter.get(character)===end&&endings[character]&&run.status==='completed'?endings[character]:null,text=final??(end.event||end.choiceText||'');
     ends=[{label:firstSentence(text),text,taken:true,icon,key:keyOf(end)}]}}
   return {character,label:WHO[character]??character,color:COLOR[character],columns,endings:ends}});
  const visited=new Set(chRecords.map(r=>r.nodeId)).size;
  return {chapter,title:tidyTitle(scenes[0].chapterTitle),characters,visited,total:scenes.length,touched:chRecords.length>0,
   stats:chapterStats(chapter,characters,last?.stateAfter,last?changedBy.get(last.step):new Set),lanes}})}
