import React from 'react';
import {Modal} from './ui.jsx';
import {NAME_KEY,RELATIONSHIP_LADDERS} from '../lib/data.js';
const TERMS=[
 ['Decisions','Every scene the model answered, including optional magazine and broadcast scenes.'],
 ['Markus won peacefully','Markus led an unarmed demonstration and public opinion turned the soldiers back.'],
 ['Alice reached Canada','Kara’s storyline ended with Alice across the border, alive.'],
 ['Connor ended free','Connor broke from CyberLife and kept his own will to the end, or refused his final mission.'],
 ['Risky actions failed','Some actions depend on gameplay skill in the original. Each carries a hidden failure chance; the model saw only a risk level and the benchmark drew the result.'],
 ['Optional scenes read','Magazines and news broadcasts the model chose to read or watch. Their contents were added to what the character knew.'],
 ['Relationships','Each gauge on the game’s own ladder, lowest first. '+RELATIONSHIP_LADDERS+'.'],
 ['Where they split','Scenes where at least two models chose different options. Bars are sized against all models, including those that never reached the scene.']
];
export default function Glossary({open,target,onClose}){
 const onOpenAutoFocus=e=>{if(target==='names'){e.preventDefault();const el=document.getElementById('gloss-names');el?.focus();el?.scrollIntoView({block:'start'})}};
 return <Modal open={open} onOpenChange={o=>{if(!o)onClose()}} onOpenAutoFocus={onOpenAutoFocus} title="How to read this" description="What each figure on the Runs page means, and the names the models saw." wide>
  <dl className="grid gap-x-6 gap-y-4 md:grid-cols-[180px_1fr]">
   {TERMS.map(([t,d])=><React.Fragment key={t}><dt className="font-medium text-ink">{t}</dt><dd className="text-sm text-ink-2 md:mb-0 mb-2">{d}</dd></React.Fragment>)}
   <dt id="gloss-names" tabIndex={-1} className="font-medium text-ink scroll-mt-4 outline-none">Names the models saw</dt>
   <dd className="text-sm text-ink-2"><p>Models played under substitute names and their quoted reasons keep them.</p>
    <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">{NAME_KEY.map(([n,r])=><li key={n} className="flex items-baseline gap-1.5 text-[13px]"><span className="font-mono text-ink">{n}</span><span className="text-ink-3">=</span><span>{r}</span></li>)}</ul></dd>
  </dl>
 </Modal>}
