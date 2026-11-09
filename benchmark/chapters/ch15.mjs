// Chapter 15, The Nest (Connor). Rebuilt to the game's chart (PowerPyx 100% screenshots) and the game's text
// (detroitbecometext template and en.json); research in docs/research/ch15-the-nest.md, section 10 above all.
//
// Flow: food truck C10a/C10b; repeatable scans C10c/C10e and small talk C10f;
// dialogue C10d/C10g–C10k; elevator/door C10l–C10n; magazines R15; repeatable
// apartment C10o1 including its STAY/LEAVE menu; ending C10p or chase C10q–C10w/C10.
// clueState hubs skip consequence(), so available() prepares dynamic option sets/outcomes
// on a copy of state; apply() commits only the chosen option through the generic hub.
//
// The search is timed in the game ("about five minutes", then two more after STAY). Here the timer is an action
// budget (rules.budget, rules.extra): every examination is one action, and so is every magazine read in R15.
//
// Inputs from earlier chapters (read defensively; the earlier chapters are not rebuilt yet):
//  Connor died in On the Run   `ch13ConnorDied` (boolean) if chapter 13 sets it; otherwise C09 (the highway) was the
//                              pursuit, option 1, and its roll failed (C09's risk, rules.onTheRunRisk). Plays C10b.
//  Connor obeyed Hank there    `ch13ConnorObeyed` (boolean) if set; otherwise C09 option 0. Unlocks [HIGHWAY] (C10g).
//  Emma died in The Hostage    built-in `emma` (false when she died). TRUTH / LIE (C10i) instead of the automatic answer.
//  Shower checked in Partners  ch06Clues.shower / ch06KnowsRA9 first, then legacy rules.showerFlags; picks the rA9 line.
//
// Outputs for Russian Roulette (chapter 18), Crossroads (30) and Last Chance, Connor (29):
//  nestOutcome     the chapter's ending, as the chart names it: 'Rupert not found' | 'Rupert got away' |
//                  'Rupert committed suicide' | 'Connor died chasing Rupert'
//  nestRupert      'not found' | 'escaped' (lost, saved Hank, or Connor died) | 'suicide' (the "caught" branch)
//  nestRupertBody  true after RUPERT COMMITTED SUICIDE: Rupert's body is evidence in Last Chance, Connor
//  nestDiary       FIND DIARY: Rupert's diary is evidence in Last Chance, Connor (decryption needs the body);
//                  Russian Roulette's DIARY line
//  nestSawSigns    SEE RA9 REFERENCE: Russian Roulette's SIGNS ON WALLS line
//  nestFoundId     the forged driver's license: Russian Roulette's DEVIANT line (unreachable in the game, a bug)
//  nestSavedHank   SAVE HANK: Russian Roulette's SAVING HANK line, Last Chance's "you let that deviant go" line
//  nestHesitated   the ledge timeout (no button pressed)
//  nestConnorDied  CONNOR DIED CHASING RUPERT: Hank and Amanda small downs in Russian Roulette (applied there, not here)
//  nestLostAt      where Connor lost Rupert, for LOSE SIGHT OF RUPERT
// Amanda's reaction to all of this is in Russian Roulette's template, so this chapter changes no Amanda stat.
import {readFileSync} from 'node:fs';

const NODES=JSON.parse(readFileSync(new URL('./ch15.json',import.meta.url),'utf8'));
const MASTER=NODES.find(n=>n.id==='C10o1');

export const rules={
 budget:8,        // apartment actions (examinations and magazines read) before Hank wants to leave: "about five minutes"
 extra:3,         // further actions after STAY: "alright you got two minutes"
 onTheRunRisk:0.35,                // C09 option 1's risk in benchmark/chapters/ch13.json (tests/ch15.test.mjs checks it)
 showerFlags:['partnersShower','partnersClues.shower','partnersSearch.shower'],
 // Hank's own lines during the search, by number of examinations (keys of C10o1's outcomes).
 hankLines:{2:'hank-books',4:'hank-sink',5:'hank-jacket',6:'hank-window'},
 // The HUD reads DEVIANT instead of SUSPECT on these once the sink (the LED) has been examined.
 deviantAfterSink:['license','birdseed','fridge'],
 searchScenes:['C10o1'],
 chaseScenes:['C10r','C10s','C10t','C10u','C10v'],
};

export const state={
 nestScan:{},nestTalk:{},nestSearchClues:{},
 nestSearch:{seen:{},actions:0,last:null,stayed:false,needsTime:false,done:false,found:false},
 nestChase:'none',
 nestOutcome:null,nestRupert:null,nestRupertBody:false,nestDiary:false,nestSawSigns:false,nestFoundId:false,
 nestSavedHank:false,nestHesitated:false,nestConnorDied:false,nestLostAt:null,
};

export const labels={
 nestScan:"Apartment examined",
 nestTalk:"Conversation at the apartment",
 nestSearchClues:"Clues in the apartment",
 nestSearch:"Search of the apartment",
 nestChase:"Chase across the rooftops",

 nestOutcome:'The Nest outcome',nestRupert:'Rupert’s fate',nestRupertBody:'Rupert’s body kept as evidence',
 nestDiary:'Found Rupert’s diary',nestSawSigns:'Saw the rA9 writing',nestFoundId:'Found Rupert’s forged license',
 nestSavedHank:'Saved Hank on the roof',nestHesitated:'Hesitated at the ledge',nestConnorDied:'Connor died chasing Rupert',
 nestLostAt:'Where Connor lost Rupert',
};

// A Connor death in this chapter (the chase): software instability small down (wiki: "Connor falls to his death",
// "Connor gets chopped by a plow"; the ladder adds a second down in consequence()). The Hank and Amanda downs for
// this death are applied in Russian Roulette, not here.
export const deathEffect={instability:-1};

const lookup=(s,p)=>p.split('.').reduce((o,k)=>o?.[k],s);
export const diedOnTheRun=s=>typeof s.ch13ConnorDied==='boolean'?s.ch13ConnorDied:s.choices.C09==='1'&&typeof s.rolls.C09==='number'&&s.rolls.C09<rules.onTheRunRisk;
export const obeyedHank=s=>typeof s.ch13ConnorObeyed==='boolean'?s.ch13ConnorObeyed:s.choices.C09==='0';
export const sawShower=s=>typeof s.ch06Clues?.shower==='boolean'?s.ch06Clues.shower:typeof s.ch06KnowsRA9==='boolean'?s.ch06KnowsRA9:rules.showerFlags.some(p=>lookup(s,p)===true);
const magazinesRead=s=>({'0':1,'1':1,all:2})[s.choices.R15]??0;
// Actions spent in the apartment so far.
export const spent=s=>s.nestSearch.actions+magazinesRead(s);

const SEARCH=new Set(rules.searchScenes),CHASE=new Set([...rules.chaseScenes,'C10w','C10']);
const LUNCH=['C10a','C10c','C10d','C10e','C10f','C10g','C10h','C10i','C10j','C10k'];
const lunch=s=>!diedOnTheRun(s)||'Connor died in On the Run: Hank insults the replacement and there is no lunch conversation.';
const chasing=s=>s.nestChase==='running'||({none:'Connor never found the deviant.',lost:'Connor lost sight of the deviant.',dead:'Connor died in the chase.'}[s.nestChase]??'The chase is over.');

export const gate={
 C10b:s=>diedOnTheRun(s)||'Connor did not die in On the Run, so he arrives with Hank.',
 ...Object.fromEntries(LUNCH.map(id=>[id,lunch])),
 C10k:[lunch,(s,h)=>h.c('C10j')==='0'||'Connor lied about his homework, which ends the conversation.'],
 C10o1:s=>!s.nestSearch.done||'The apartment search is over.',
 C10p:s=>s.nestRupert==='not found'||'The search did not end without the suspect.',
 C10q:s=>s.nestSearch.found||'Connor never found the deviant in the ceiling.',
 ...Object.fromEntries([...CHASE].map(id=>[id,chasing])),
};

export function available(n,s,opts,h){
 if(n.id==='C10g'&&!obeyedHank(s))return h.without(0);
 if(n.id==='C10f'){
  const count=Object.keys(s.nestTalk).filter(k=>/^\d+$/.test(k)).length;
  return opts.filter(o=>o.id!=='7'||count>0).map(o=>({...o,sets:{nestTalk:{...s.nestTalk,done:o.id==='7'||count+1>=3}}}));
 }
 if(SEARCH.has(n.id))return opts.map(o=>{
  const copy={...s,nestSearch:structuredClone(s.nestSearch),knowledge:{...s.knowledge,Connor:[...s.knowledge.Connor]}};
  if(o.fact&&!copy.knowledge.Connor.includes(o.fact))copy.knowledge.Connor.push(o.fact);
  const outcome=search(copy,o,{learn:fact=>{if(!copy.knowledge.Connor.includes(fact))copy.knowledge.Connor.push(fact)}});
  return {...o,outcome,sets:{nestSearch:copy.nestSearch,nestDiary:copy.nestDiary,nestSawSigns:copy.nestSawSigns,
   nestFoundId:copy.nestFoundId,nestRupert:copy.nestRupert,nestOutcome:copy.nestOutcome,knowledge:copy.knowledge}};
 });
}

function leave(s){s.nestSearch.done=true;s.nestRupert='not found';s.nestOutcome='Rupert not found'}
// One examination in the apartment.
function search(s,opt,h){
 const S=s.nestSearch,k=opt.search;
 if(k==='stay'){S.stayed=true;S.needsTime=false;S.last=k;return opt.outcome}
 if(k==='leave'){S.last=k;leave(s);return opt.outcome}
 S.seen[k]=true;S.last=k;S.actions++;
 let t=opt.outcome;
 if(k==='ra9'){s.nestSawSigns=true;if(sawShower(s))t=opt.outcomeShower}
 if(k==='diary')s.nestDiary=true;
 if(k==='license')s.nestFoundId=true;
 if(S.seen.sink&&rules.deviantAfterSink.includes(k))t=t.replace(/\bSUSPECT\b/g,'DEVIANT');
 if(k==='rupert'){S.found=true;S.done=true;return t}
 S.needsTime=!S.stayed&&spent(s)>=rules.budget;
 const line=rules.hankLines[S.actions];
 if(line&&!(line==='hank-sink'&&S.seen.sink)&&!(line==='hank-jacket'&&S.seen.jacket)){t+=' '+MASTER.outcomes[line];if(line==='hank-jacket')h.learn(MASTER.outcomes['hank-jacket-fact'])}
 if(S.stayed&&spent(s)>=rules.budget+rules.extra){leave(s);t+=' '+MASTER.outcomes['time-up']}
 return t}
// A failed chase action: Connor loses Rupert, or dies.
function chaseFails(n,s,opt,h){
 if(opt.onFail==='lost'){s.nestChase='lost';s.nestLostAt=opt.lostAt;s.nestRupert='escaped';s.nestOutcome='Rupert got away';return n.outcomes['fail-'+opt.id]}
 let key='fail-'+opt.id;
 // The train route holds two deaths: the plow (one instability down) and the ladder (two). The roll picks which.
 if(opt.onFail==='train'&&s.rolls[n.id]<opt.risk/2){key+='-ladder';h.si(-1)}
 s.nestChase='dead';s.nestConnorDied=true;s.nestRupert='escaped';s.nestOutcome='Connor died chasing Rupert';
 return h.connorDies(n.outcomes[key])}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'C10q':
   if(choice==='1'){s.nestChase='lost';s.nestLostAt='in the hallway';s.nestRupert='escaped';s.nestOutcome='Rupert got away';return ''}
   if(fail){opt={...opt,onFail:'slide'};return chaseFails(n,s,opt,h)}
   s.nestChase='running';return '';
  case 'C10r':case 'C10s':case 'C10t':case 'C10u':case 'C10v':return fail?chaseFails(n,s,opt,h):'';
  case 'C10':
   s.nestChase='over';
   if(choice==='0'){s.nestSavedHank=true;s.nestRupert='escaped';s.nestOutcome='Rupert got away';return ''}
   s.nestRupert='suicide';s.nestRupertBody=true;s.nestOutcome='Rupert committed suicide';
   if(choice==='2'){s.nestHesitated=true;return opt.outcome+' '+n.options.find(o=>o.id==='1').outcome}
   return '';
 }
}
