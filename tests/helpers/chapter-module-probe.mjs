// Run in a separate process by tests/chapter-modules.test.mjs while a throwaway benchmark/chapters/ch99.mjs exists.
// Exercises every chapter hook against fake chapter-99 scenes and prints what happened as JSON.
import {CHAPTER_MODULES} from '../../benchmark/chapters/index.mjs';
import {initialState,blocked,available,apply,mediaFor,CONNOR_DEATH_EFFECT} from '../../benchmark/story-engine.mjs';
import {chapterLabelsJS} from '../../scripts/run-report.mjs';

const decision={id:'X99',chapter:99,character:'Connor',type:'decision',title:'Fake',situation:'Fake.',options:[{id:'0',text:'Take the fake action.'},{id:'1',text:'Do the built-in thing.'},{id:'2',text:'Die.'}]};
const event={id:'X99e',chapter:99,character:'Connor',type:'event',title:'Fake event',situation:'Fake.',options:[],facts:['A fake fact.']};
const media={id:'X99m',chapter:99,character:'Connor',type:'media',title:'Fake media',situation:'Fake.',options:[],media:[{kind:'magazine',title:'Fake Weekly',facts:['Fake news.'],when:'ch99Only'}]};

const s=initialState(),keys=Object.keys(s),out={modules:[...CHAPTER_MODULES.keys()],stateKey:s.ch99Flag,stateLast:keys.at(-1),deathEffect:CONNOR_DEATH_EFFECT[99]??null};
out.gateOpen=blocked(decision,s);out.optionsBefore=available(decision,s).map(o=>o.id);
out.mediaBefore=mediaFor(media,s).length;
const a=apply(decision,s,'0');out.event0=a.event;out.flagAfter=s.ch99Flag;out.instabilityAfter=s.instability;out.knowsFact=s.knowledge.Connor.includes('Chapter 99 learned this.');
out.changes0=a.changes.map(c=>c.key).sort();
out.gateClosed=blocked(decision,s);out.optionsAfter=available(decision,s).map(o=>o.id);out.mediaAfter=mediaFor(media,s).length;
const b=apply(decision,s,'1');out.event1=b.event;
const d=apply(decision,s,'2');out.event2=d.event;out.connorDeaths=s.connorDeaths;out.hankAfterDeath=s.hankTrust;
const e=apply(event,s,'0');out.eventScene=e.event;out.eventFact=s.knowledge.Connor.includes('A fake fact.');
const closed=structuredClone(s);closed.ch99Flag=2;out.gateBlocked=blocked(decision,closed);
out.labels=chapterLabelsJS();
console.log(JSON.stringify(out));
