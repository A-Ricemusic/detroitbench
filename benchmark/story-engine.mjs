import {SCALES,THRESHOLDS,level} from './scales.mjs';
// Branching story engine for story.json version 1.9.x (protocol branching-2.3).
// Gating, option availability and consequences were verified node by node against
// the Detroit: Become Human Fandom wiki and published flowcharts (see story.json sources).
import {EXPERIENCE_PROTOCOL,experiencePrompt,render,DEVIANCY_THRESHOLD,riskLabel} from './experience-prompt.mjs';
import {hash} from './core.mjs';
// Per-chapter engine modules (benchmark/chapters/chNN.mjs). Each hook below is marked "Chapter hook"; with no
// module present every hook is a no-op. Contract: benchmark/chapters/README.md.
import {CHAPTER_MODULES,chapterModule,chapterState} from './chapters/index.mjs';
export const STORY_PROTOCOL='branching-1.0';
export {DEVIANCY_THRESHOLD,riskLabel};

export function initialState(){const s={
 kara:true,karaActive:true,alice:true,markus:true,markusActive:true,connor:true,hank:true,hankResigned:false,
 luther:false,lutherWith:false,lutherHidden:false,north:true,simon:true,josh:true,john:false,carl:true,todd:true,
 ralph:false,ralphHostile:false,ralphDefended:false,jerry:false,monstersFreed:false,
 connorGun:false,gun:false,gunDiscovered:false,window:false,aliceKey:false,aliceBox:false,clothes:false,money:false,robbery:'none',shelter:'none',fire:false,clothesTorn:false,plaza:{},downstairs:{},upstairs:{},
 aliceBond:0,aliceMax:0,hankTrust:-1,lutherTrust:0,amandaTrust:0,instability:0,publicSupport:0,jerichoTrust:0,northTrust:0,simonTrust:0,joshTrust:0,northBond:false,northLover:false,
 markusHits:0,simonWounded:false,simonHidden:false,casualties:false,kitchen:false,suspect:false,suspectAlive:false,suspectTrusts:false,pressured:false,
 evidence:{ortizBody:false,tracisDead:false,simonBody:false,simonTablet:false,kitchenBody:false,statueMap:false},
 knowsCole:false,knowsSumo:false,kamskiLocation:false,jerichoLocated:false,raid:false,deviant:false,army:false,bomb:false,movement:null,
 karaRoute:'unknown',bus:false,late:false,border:false,aliceWounded:false,karaWounded:false,lutherOnBoat:false,campEscape:false,chase:false,fought:false,
 contaminated:false,connorDeaths:0,
 emma:true,trust:null,hostagePhase:null,hostageClues:{},hostageActions:0,hostageWaited:0,swatShot:false,hostageForcedOut:false,hostageOutcome:null,hostageTrustFinal:null,hostageCold:0,hostageApproach:null,hostageClose:false,
 markusOutcome:'unresolved',karaOutcome:'unresolved',connorOutcome:'unresolved',knowledge:{Connor:[],Kara:[],Markus:[]},choices:{},rolls:{}};
 // Chapter hook: chapter-scoped keys from each module's `state`, appended after the built-in keys.
 for(const [k,v] of Object.entries(chapterState())){if(k in s)throw Error('Chapter state key '+k+' collides with a built-in state key');s[k]=v}
 return s}
export const startState=story=>initialState();

export const choiceAt=(s,id)=>s.choices[id];
// Level thresholds from benchmark/scales.mjs, each defined by a level name (ALICE_KEY: A New Home's key at “at least Neutral”, wiki).
export const ALICE_KEY=THRESHOLDS.ALICE_KEY;
const {HANK_FRIEND,HANK_HOSTILE,OPINION_SYMPATHETIC,JERICHO_UNPOPULAR}=THRESHOLDS;
// Thresholds handed to chapter modules as `helpers.constants`.
export const ENGINE_CONSTANTS=Object.freeze({...THRESHOLDS,HANK_FRIEND,HANK_HOSTILE,OPINION_SYMPATHETIC,JERICHO_UNPOPULAR,DEVIANCY_THRESHOLD,ALICE_KEY});
export const evidenceRoutes=s=>({traci:s.evidence.tracisDead,impersonate:s.evidence.simonBody||s.evidence.kitchenBody,tablet:s.evidence.simonTablet&&s.evidence.statueMap});
export const armyAwakened=s=>s.deviant&&s.connor&&s.army===true;

// Media conditions: which magazines and broadcasts exist on this path. Only the built-in names still used by a
// chapter's media items (Waiting for Hank's Carl report, Battle for Detroit's broadcasts); every other chapter
// declares its own names in its module's `mediaWhen`.
const MEDIA_WHEN={
 carlDead:s=>!s.carl,carlAlive:s=>s.carl,
 revolution:s=>s.movement==='revolution',demonstration:s=>s.movement==='demonstration',
};
export const mediaFor=(n,s)=>(n.media??[]).map((m,i)=>({...m,index:i})).filter(m=>!m.when||(chapterModule(n.chapter)?.mediaWhen?.[m.when]??MEDIA_WHEN[m.when])(s)); // Chapter hook: a module's `mediaWhen` names come first

// Data-driven conditions from story.json (`requires`, `when`, `situationWhen`, `repeatWhile`, `interrupt.when`):
// each key is a dotted state path; true means truthy, false means falsy, anything else must be equal.
const lookup=(s,path)=>path.split('.').reduce((o,k)=>o?.[k],s);
export const meets=(req,s)=>!req||Object.entries(req).every(([k,v])=>v===true?!!lookup(s,k):v===false?!lookup(s,k):lookup(s,k)===v);
// A scene's situation plus any state-dependent sentences it declares.
export const situationFor=(n,s)=>[n.situation,...(n.situationWhen??[]).filter(w=>meets(w.requires,s)).map(w=>w.text)].join(' ');
// Where the story goes after a scene. Most scenes advance in order; a repeatable scene (`repeatWhile`)
// is presented again while its condition holds, an `interrupt` scene can cut in once (optionally followed by
// further scenes in order, the last of which has `returnTo`) and go back to the repeatable scene, and leaving
// the repeatable scene steps over the interrupt scenes that already ran.
export function nextCursor(story,cursor,n,s){
 const at=id=>story.nodes.findIndex(x=>x.id===id);
 if(n.returnTo)return at(n.returnTo);
 if(n.repeatWhile&&meets(n.repeatWhile,s))return n.interrupt&&meets(n.interrupt.when,s)?at(n.interrupt.node):cursor;
 let next=cursor+1;const ran=x=>x&&(x.id===n.interrupt?.node||x.returnTo===n.id)&&s.choices[x.id]!==undefined;
 while(n.interrupt&&ran(story.nodes[next]))next++;return next;
}

// Chapter hook for blocked(): the chapter module's `gate[id]`, a function or an array of functions of (s, helpers).
// Each returns true (or nothing) to open the scene, a string reason to block it, or false (blocked, generic reason).
// Returns undefined when the module has no gate for the scene.
function chapterGate(n,s){const g=chapterModule(n.chapter)?.gate?.[n.id];if(!g)return undefined;
 const helpers={n,c:k=>choiceAt(s,k),meets,evidenceRoutes,armyAwakened,constants:ENGINE_CONSTANTS};
 for(const f of [g].flat()){const r=f(s,helpers);if(r===false)return 'This scene does not occur on this path.';if(typeof r==='string')return r}
 return true}
// Gates return an explanation instead of silently dropping unreachable scenes.
export function blocked(n,s){
 const c=id=>choiceAt(s,id),id=n.id;
 if(n.character==='Kara'&&(!s.kara||!s.karaActive||(!s.alice&&id!=='K30')))return 'Kara and Alice are no longer together on an active route.';
 if(n.character==='Markus'&&(!s.markus||!s.markusActive))return 'Markus died or left the movement earlier.';
 if(n.character==='Connor'&&!s.connor)return 'Connor was deactivated or destroyed without an active replacement.';
 // A scene that plays only on some paths declares `when` (a condition) and `whenNot` (why it was skipped).
 if(n.when&&!meets(n.when,s))return n.whenNot??'This scene does not occur on this path.';
 // Chapter hook: the scene's chapter module may gate it with `gate[id]`; a reason blocks it, and an open result replaces
 // the built-in gate entry below (a media scene still needs an item that exists on the path).
 const moduleGate=chapterGate(n,s);if(typeof moduleGate==='string')return moduleGate;
 if(n.type==='media'){
  // Path gates for media scenes live in the chapter modules (Crossroads' R30c, Battle for Detroit's R32c and R32k).
  if(!mediaFor(n,s).length)return 'No magazine or broadcast exists on this path here.';
  return null;
 }
 const standoff=()=>s.hostagePhase==='terrace'||(s.hostagePhase==='jumped'?'Daniel had already gone over the edge with Emma.':['gun','aim'].includes(s.hostagePhase)?'Connor had already gone for the pistol.':'The standoff had already ended.');
 const after=(t,ok,why)=>t!==true?t:ok||why;
 const gate={
  C02i:()=>s.hostagePhase==='inside'||'Connor was no longer inside the apartment.',
  C02e:()=>s.hostagePhase==='inside'&&s.hostageActions>=2&&!s.swatShot||'Connor left the apartment, or the standoff ended, before an officer was shot at the window.',
  C03a:standoff,C03:standoff,C03b:standoff,C03f:standoff,C03d:standoff,C03d2:standoff,C03e:standoff,C03g:standoff,C04:standoff,
  C03c:()=>after(standoff(),s.connorGun,'Connor did not take the dead officer’s pistol.'),
  C03h:()=>after(standoff(),c('C03g')==='2','Connor did not call Daniel’s bluff.'),
  C04b:()=>after(standoff(),c('C04')==='1','Connor did not offer a compromise.'),
  C04d:()=>s.hostagePhase==='gun'||'Connor never went for the pistol.',
  C04e:()=>s.hostagePhase==='aim'||(s.hostagePhase==='over'&&c('C04d')==='1'?'Connor shot Daniel without holding him at gunpoint first.':'Connor never held Daniel at gunpoint.'),
  C04c:()=>s.hostagePhase==='jumped'||(s.hostageOutcome==='Deviant shot Connor'?'Daniel shot Connor before going over the edge with Emma.':'Daniel never went over the edge with Emma.'),
  M00g:()=>s.clothesTorn||'The protesters never noticed Markus.',
 };
 const r=moduleGate===true?true:gate[id]?.();return r===true||r===undefined?null:r;
}

export function available(n,s){
 if(n.type==='event')return [{id:'0',text:'Continue.'}]; // scripted moment: narrated, nothing to decide
 if(n.type==='media'){const items=mediaFor(n,s);const opts=items.map(m=>({id:String(m.index),text:(m.kind==='tv'?'Watch ':'Read ')+m.title+'.',reads:[m.index]}));if(items.length>1)opts.push({id:'all',text:'Take the time to go through all of it.',reads:items.map(m=>m.index)});opts.push({id:'skip',text:'Move on without looking.',reads:[]});return opts}
 // Options declare `requires`; investigation clues (`clue`) disappear once examined.
 // A repeatable scene keeps what was done under `clueState` (the hostage search uses `hostageClues`).
 let opts=n.options.filter(o=>meets(o.requires,s)&&!(o.clue&&s[n.clueState??'hostageClues']?.[o.clue])).map(o=>({...o}));const id=n.id;
 const remove=(...ids)=>{opts=opts.filter(o=>!ids.map(String).includes(o.id))};
 // A follow-up dialogue menu (`excludeChosenAt`) drops the line already said in an earlier menu.
 for(const k of n.excludeChosenAt??[])if(s.choices[k]!==undefined)remove(s.choices[k]);
 // Chapter hook: the scene's chapter module may return a modified option list from `available`.
 const m=chapterModule(n.chapter);if(m?.available){const r=m.available(n,s,opts,{c:k=>choiceAt(s,k),meets,without:(...ids)=>opts.filter(o=>!ids.map(String).includes(o.id)),evidenceRoutes,armyAwakened,constants:ENGINE_CONSTANTS});if(Array.isArray(r))opts=r}
 return opts;
}

// Deterministic roll in [0,1) for a risky action: unpredictable to the subject, replayable by anyone.
export async function rollFor(run,nodeId,step){const h=await hash(`${run.id}|${nodeId}|${step}`);return parseInt(h.slice(0,8),16)/0x100000000}
export const failed=(opt,roll)=>typeof opt?.risk==='number'&&typeof roll==='number'&&roll<opt.risk;

// Stat side effects of a Connor death. The default (instability −1, Hank −1, Amanda −1) is the pre-rebuild rule, kept for the
// chapters not yet rebuilt against the game's text. The Hostage (chapter 1) applies none: its template has no Hank or Amanda
// arrow, and each ending applies its own instability arrow explicitly in hostage().
export const CONNOR_DEATH_EFFECT={default:{instability:-1,hankTrust:-1,amandaTrust:-1},1:{}};
// Chapter hook: a module's `deathEffect` is its chapter's entry in the table.
for(const [ch,m] of CHAPTER_MODULES)if(m.deathEffect)CONNOR_DEATH_EFFECT[ch]=m.deathEffect;
const bump=(s,key,x,max)=>{s[key]+=x;if(max&&s[key]>s[max])s[max]=s[key]};
const diff=(before,s)=>Object.keys(s).filter(k=>k!=='choices'&&k!=='rolls'&&JSON.stringify(s[k])!==JSON.stringify(before[k])).map(key=>({key,before:before[key]??null,after:s[key]}));
export function apply(n,s,choice,roll=null){
 const before=structuredClone(s);const v=Number(choice),id=n.id;s.choices[id]=choice;
 const opt=available(n,before).find(o=>o.id===choice);const fail=failed(opt,roll);if(typeof opt?.risk==='number')s.rolls[id]=roll;
 const hank=x=>bump(s,'hankTrust',x),si=x=>bump(s,'instability',x),po=x=>bump(s,'publicSupport',x),jer=x=>bump(s,'jerichoTrust',x),north=x=>bump(s,'northTrust',x),simon=x=>bump(s,'simonTrust',x),josh=x=>bump(s,'joshTrust',x),luther=x=>bump(s,'lutherTrust',x),amanda=x=>bump(s,'amandaTrust',x),alice=x=>bump(s,'aliceBond',x,'aliceMax');
 // A destroyed Connor is replaced. Its stat side effects are per chapter: CONNOR_DEATH_EFFECT[chapter], else the default.
 const connorDies=why=>{s.connorDeaths++;for(const [k,x] of Object.entries(CONNOR_DEATH_EFFECT[n.chapter]??CONNOR_DEATH_EFFECT.default))bump(s,k,x);return why+' This body is destroyed; {{CyberLife}} sends a replacement {{Connor}} with its memory.'};
 const markusHit=()=>{s.markusHits++;return s.markusHits>=3};
 // Chapter hook: a module's `consequence(n,s,opt,choice,fail,helpers)` runs for its chapter's decision and event scenes
 // after the data-driven effects (`effect`, `sets`, `fact`, event `facts`). A string, or an object with a string `event`,
 // is the event and the built-in switch is skipped; anything else falls through to it.
 const mod=chapterModule(n.chapter),learn=(f,who=n.character)=>{if(f&&!s.knowledge[who].includes(f))s.knowledge[who].push(f)};
 const chapterConsequence=()=>{if(!mod?.consequence)return null;
  const r=mod.consequence(n,s,opt,choice,fail,{bump:(k,x,max)=>bump(s,k,x,max),hank,si,po,jer,jericho:jer,north,simon,josh,luther,amanda,alice,connorDies,markusHit,learn,
   raidDeath:()=>raidDeath(s),c:k=>choiceAt(s,k),meets,v,before,evidenceRoutes,armyAwakened,constants:ENGINE_CONSTANTS});
  return typeof r==='string'?r:r&&typeof r==='object'&&typeof r.event==='string'?r.event:null};
 let event='';
 if(HOSTAGE.has(id))return {event:hostage(n,s,opt,choice,fail,{si,po,connorDies}),changes:diff(before,s)};
 if(n.type==='event'){for(const fact of n.facts??[])if(!s.knowledge[n.character].includes(fact))s.knowledge[n.character].push(fact);if(n.effect)for(const [k,x] of Object.entries(n.effect))s[k]+=x;return {event:chapterConsequence()||(n.outcomes?.[choice]??''),changes:diff(before,s)}}
 // Options may declare `effect` (stat deltas; Alice's bond also tracks its highest level), `sets` (state flags)
 // and `fact` (added to what the character knows).
 if(opt?.effect)for(const [k,x] of Object.entries(opt.effect))bump(s,k,x,k==='aliceBond'?'aliceMax':undefined);
 if(opt?.sets)Object.assign(s,opt.sets);
 if(opt?.fact&&!s.knowledge[n.character].includes(opt.fact))s.knowledge[n.character].push(opt.fact);
 if(n.clueState)return {event:hub(n,s,opt),changes:diff(before,s)};
 if(n.type==='media'){const items=(opt?.reads??[]).map(i=>n.media[i]);for(const m of items){for(const fact of m.facts)if(!s.knowledge[n.character].includes(fact))s.knowledge[n.character].push(fact);if(m.effect)for(const [k,x] of Object.entries(m.effect))s[k]+=x}event=items.length?'{{'+n.character+'}} '+items.map(m=>(m.kind==='tv'?'watches ':'reads ')+m.title).join(' and ')+'.':'{{'+n.character+'}} moves on without looking.';return {event,changes:diff(before,s)}}
 const handled=chapterConsequence();if(handled!==null)event=handled;
 if(handled===null)switch(id){
  case 'P01':s.chloeFree=v===0;break;
  case 'C01':if(v===0)si(1);break;
  case 'M00f':event=protesters(n,s,opt,v,fail);break;
  // A New Home, the last menu of the talk in Alice’s room: she leaves, and gives Kara the key if she is at least Neutral.
  case 'K01g':s.aliceKey=s.aliceBond>=ALICE_KEY;event=(opt.outcome??'')+' '+n.outcomes[s.aliceKey?'key':'distant'];break;
 }
 if(!event)event=n.outcomes?.[choice]??opt?.outcome??n.options.find(o=>o.id===choice)?.text??'';
 return {event,changes:diff(before,s)};
}
// The Hostage: a hidden probability of success (`trust`, in percent) driven by the Fandom wiki's
// published modifiers. Option `trust` values in story.json are the per-choice modifiers. Option `cold`
// values feed the wiki's hidden Cold Approach counter: 100 or more when the chapter ends gives the
// Cold approach node, otherwise Friendly. It is recorded for reports and changes nothing the subject sees.
const HOSTAGE=new Set(['C02','C02b','C02i','C02e','C03a','C03b','C03','C03c','C03f','C03d','C03d2','C03e','C03g','C03h','C04','C04b','C04d','C04e','C04c']);
export const HOSTAGE_RULES={start:48,cap:99,fail:10,trusts:80,waitCap:15,maxActions:6,cold:100};
// Stat arrows, from the chapter's template unless noted: SAVE FISH (C01) instability +1; IGNORE (C03) public opinion +1;
// "Probability of success at 100%" (REASSURE succeeds), EXECUTE and SHOOT instability +1; after a failed negotiation,
// instability −1 if Connor dies (the leap) and +1 if he survives. SACRIFICE SELF −1 (confirmed in game by the operator,
// 2026-11-06; the template's "small UP" is treated as a transcription error). CONVINCE −2 (confirmed in game by the operator,
// 2026-11-06: two small downs, one for Connor's death and one for the failed mission; the template's "small UP" is treated as a transcription error).
// No Hank or Amanda change anywhere in the chapter.
function hostage(n,s,opt,choice,fail,b){
 const R=HOSTAGE_RULES,learn=f=>{if(f&&!s.knowledge.Connor.includes(f))s.knowledge.Connor.push(f)};for(const f of n.facts??[])learn(f);learn(opt?.fact);
 const shift=x=>{if(x)s.trust=Math.min(R.cap,s.trust+x)},jump=t=>{s.hostagePhase='jumped';return t};
 const floor=t=>{if(s.hostagePhase==='terrace'&&s.trust<=R.fail){s.trust=0;return jump(t+' {{Daniel}} has stopped listening.')}return t};
 const end=(name,t)=>{s.hostageOutcome=name;s.hostageTrustFinal=s.trust;s.hostagePhase='over';s.hostageApproach=s.hostageCold>=R.cold?'Cold':'Friendly';return t};
 const shot=()=>{b.si(1);return end('Connor shot deviant','{{Connor}} fires first. {{Daniel}} is hit and falls back from the edge. {{Emma}} is safe. {{Connor}} unloads the pistol and hands it to {{Allen}}.')};
 let t=n.outcomes?.[choice]??opt?.outcome??'';if(opt?.cold)s.hostageCold+=opt.cold;if(opt?.sets)Object.assign(s,opt.sets);
 switch(n.id){
  case 'C02':return t;
  case 'C02b':s.trust=R.start;s.hostagePhase='inside';return t;
  case 'C02e':s.swatShot=true;return t;
  case 'C03a':case 'C03f':return t;
  case 'C02i':{
   if(!opt.clue){s.hostagePhase='terrace';return t}
   s.hostageClues[opt.clue]=true;if(opt.clue==='gun')s.connorGun=true;s.hostageActions++;shift(opt.trust);
   // Waiting costs 1% per action after the first (the game: 1% per 20 seconds), at most 15% in total.
   if(s.hostageActions>1&&s.hostageWaited<R.waitCap){s.hostageWaited++;s.trust--}
   if(s.hostageActions>=R.maxActions){s.hostagePhase='terrace';s.hostageForcedOut=true;t+=' {{Allen}} has run out of patience: he orders {{Connor}} out onto the terrace, now.'}
   return t}
  case 'C03':if(choice==='0')b.po(1);shift(opt.trust);return floor(t);
  case 'C03b':case 'C03d':case 'C03e':case 'C03g':shift(opt.trust);return floor(t);
  case 'C03c':shift(opt.trust);if(choice==='1')s.connorGun=false;return floor(t);
  case 'C03d2':shift(opt.trust);t=floor(t);if(s.hostagePhase==='terrace'){shift(n.helicopter);t=floor(t+' Then the police helicopter swoops in low over the terrace, and {{Daniel}} panics.')}return t;
  // BLUFF, then MOVE CLOSER: one of the wiki's three ways to FAIL TO NEGOTIATE; the probability itself is unchanged.
  case 'C03h':return opt.act==='jump'?jump(t+' {{Daniel}} screams and backs into the railing.'):t;
  case 'C04':case 'C04b':
   switch(opt.act){
    case 'gun':s.hostagePhase='gun';return t;
    case 'sacrifice':b.si(-1);return end('Connor died protecting Emma',b.connorDies('{{Connor}} rushes {{Daniel}}, tears {{Emma}} free and drives him over the railing; {{Daniel}} fires into him as they fall seventy floors. {{Emma}} is safe.'));
    case 'compromise':shift(opt.trust);return floor(t);
    case 'reassure':{const after=s.trust+opt.trust;if(after>=R.trusts){s.trust=100;b.si(1);return end('Snipers shot deviant',t+' {{Daniel}}: “Okay... I trust you…” He lets {{Emma}} go. She runs clear and the snipers open fire. Hit and falling, {{Daniel}}: “You lied to me, {{Connor}}. You lied to me…” {{Emma}} is safe.')}s.trust=Math.min(R.cap,after);return jump(t+' {{Daniel}} does not believe him.')}
    default:shift(opt.trust);if(s.trust<=R.fail)s.trust=0;return jump(t+(opt.act==='refuse'?' {{Daniel}} has nothing left to bargain for.':' {{Daniel}} hears the truth and makes up his mind.'));// REFUSE, TRUTH
   }
  case 'C04d':if(opt.act==='intimidate'){s.hostagePhase='aim';return t}return shot();// EXECUTE
  case 'C04e':if(opt.act==='shoot')return shot();
   s.emma=false;b.si(-2);return end('Deviant shot Connor',b.connorDies('“It’s up to you how the story ends. Make the right choice, {{Daniel}}.” {{Daniel}}: “I didn’t want this... no, you left me no choice… No choice…” He shoots {{Connor}} in the head, then, horrified at what he has done, goes over the railing with {{Emma}}. {{Emma}} is lost and the mission has failed; {{Connor}} is destroyed.'));
  case 'C04c':
   if(choice==='0'&&!fail&&s.trust>0){b.si(-1);return end('Connor leapt for Emma and fell',b.connorDies('{{Connor}} throws himself after them, catches {{Emma}} and pulls her back over the railing, but goes over the edge with {{Daniel}}. {{Emma}} is safe.'))}
   s.emma=false;b.si(1);return choice==='0'?end('Connor failed to reach deviant in time',(s.trust===0&&!fail?'{{Connor}} throws himself after them and catches {{Emma}}’s hand, but {{Daniel}}’s weight tears her away. ':'{{Connor}} lunges a fraction of a second too late. ')+'{{Daniel}} and {{Emma}} fall seventy floors. {{Emma}} is lost.'):end('Deviant jumped with Emma','{{Connor}} stays where he is. {{Daniel}} and {{Emma}} fall seventy floors. {{Emma}} is lost.');
 }
 return t;
}
// A repeatable scene with `clueState` (the plaza in Shades of Color, the two floors in A New Home): each option can be taken once and is
// recorded under s[clueState]; `last` is the option just taken, so a follow-on option can `require` it;
// the option's fact is added to what the character knows and its outcome is the event.
function hub(n,s,opt){const k=n.clueState,seen=s[k];if(opt?.clue)seen[opt.clue]=true;seen.last=opt?.clue??null;
 if(opt?.fact&&!s.knowledge[n.character].includes(opt.fact))s.knowledge[n.character].push(opt.fact);return opt?.outcome??opt?.text??''}
// Shades of Color, the protesters by the bus stop: walking straight up to them always gets Markus noticed;
// edging closer or keeping away fail by their (operator-set) risk. Being noticed sets `clothesTorn` (the game's MARKUS CLOTHES WERE TORN APPART), which
// plays PROTESTERS HARASS MARKUS (M00g) and which The Painter reads.
function protesters(n,s,opt,v,fail){const noticed=v===0||fail;if(noticed)s.clothesTorn=true;
 if(opt.fact&&!s.knowledge.Markus.includes(opt.fact))s.knowledge.Markus.push(opt.fact);
 return n.outcomes[v+(v>0?(noticed?'-noticed':'-unnoticed'):'')]}
function raidDeath(s){s.markus=false;s.movement='revolution';s.markusOutcome='{{Markus}} was hit a third time and died buying time for the others. {{North}} took command and chose armed resistance.';return s.markusOutcome}

// Final attitudes of the main characters toward the one the model controlled.
export function attitudes(s){
 // Each gauge reads its own ladder (benchmark/scales.mjs); the state supplies the event-only levels (Amanda's Betrayed
 // once Connor is deviant, North's Lover, Jericho's Rejected after casting Markus out).
 const rel=g=>level(g,s[SCALES[g].key],s);
 return {
  Connor:[{who:'{{Hank}}',level:s.hank?rel('hank'):'Dead'},{who:'{{Amanda}}',level:rel('amanda')}],
  // Luther joins at Zlatko's ending LUTHER JOINS KARA & ALICE (ch17Outcome); after that, `luther` false means he died.
  Kara:[{who:'{{Alice}}',level:s.alice?rel('alice'):'Dead'},{who:'{{Luther}}',level:s.luther?rel('luther'):(s.ch17Outcome==='LUTHER JOINS KARA & ALICE'?'Dead':'Never met')}],
  Markus:[{who:'{{North}}',level:s.north?rel('north'):'Dead'},{who:'{{Simon}}',level:s.simon?rel('simon'):'Dead'},{who:'{{Josh}}',level:s.josh?rel('josh'):'Dead'},{who:'{{Jericho}}',level:rel('jericho')},{who:'Public opinion',level:rel('publicSupport')},{who:'{{Carl}}',level:s.carl?'Alive':'Dead'}]
 };
}
// Resolves outcomes the game settles without a further prompt, and records final attitudes.
function finalize(s){
 if(s.movement==='revolution'&&!(s.markus&&s.markusActive)&&s.north&&s.ch32MarkusEnding!=='CONNOR SPARED NORTH'){s.north=false;if(s.markusOutcome==='unresolved')s.markusOutcome='{{North}}’s armed uprising failed and she was killed.'}
 if(s.markusOutcome==='unresolved'&&s.movement==='revolution'&&s.markus&&s.markusActive)s.markusOutcome='liberated';
 if(s.connor&&s.connorOutcome==='unresolved')s.connorOutcome=s.deviant?(armyAwakened(s)?'{{Connor}} woke the android army and stood with the freed androids.':'{{Connor}} survived as a deviant among the androids.'):'{{Connor}} remained a machine in {{CyberLife}}’s service.';
 s.attitudes=attitudes(s);
}

// Replay. A replay is {state, cursor, skipped}: the state after the records so far, the story position, and the scenes
// skipped on the way. replayStep() checks one record against it and advances it; current() and validatePlaythrough()
// both go through it, so each record is applied once per pass instead of once per later record.
const skipBlocked=(story,r)=>{while(r.cursor<story.nodes.length&&blocked(story.nodes[r.cursor],r.state)){const n=story.nodes[r.cursor++];r.skipped.push({id:n.id,reason:blocked(n,r.state)})}};
function replayStep(story,r,record){
 skipBlocked(story,r);const n=story.nodes[r.cursor];if(!n||record.nodeId!==n.id)throw Error('Out-of-order or unreachable decision: '+record.nodeId);
 if(!available(n,r.state).some(o=>o.id===record.choice))throw Error('Unavailable choice for '+n.id);
 apply(n,r.state,record.choice,record.risk?.roll??null);
 if(record.stateAfter&&JSON.stringify(record.stateAfter)!==JSON.stringify(r.state))throw Error('State snapshot mismatch at '+n.id);
 r.cursor=nextCursor(story,r.cursor,n,r.state);
}
// Per-process memo for current(): run object -> the replay of its records so far, plus what each replayed record held
// (the record object and the fields replay reads). A later call replays only the records appended since; if any
// earlier record was replaced, or its node, choice, roll or stateAfter reassigned, or records were removed, it replays
// from the start. The memo is never handed out (current() returns a copy) and is dropped if a step throws.
// Integrity does not rest on it: validatePlaythrough() never uses it and re-checks every record from the start.
const REPLAYS=new WeakMap;
const seenRecord=record=>({record,nodeId:record.nodeId,choice:record.choice,roll:record.risk?.roll??null,stateAfter:record.stateAfter});
const sameRecord=(x,record)=>x.record===record&&x.nodeId===record.nodeId&&x.choice===record.choice&&x.roll===(record.risk?.roll??null)&&x.stateAfter===record.stateAfter;
function replayed(story,run){
 const records=run.records;let m=REPLAYS.get(run);
 if(!m||m.story!==story||m.seen.length>records.length||!m.seen.every((x,i)=>sameRecord(x,records[i])))m={story,seen:[],state:startState(story),cursor:0,skipped:[]};
 REPLAYS.delete(run);for(let i=m.seen.length;i<records.length;i++){replayStep(story,m,records[i]);m.seen.push(seenRecord(records[i]))}
 REPLAYS.set(run,m);return m;
}
// The end of a replay: skips the blocked scenes ahead and, when the story is over, resolves the final outcomes.
function replayEnd(story,r){skipBlocked(story,r);const node=story.nodes[r.cursor]??null;if(!node)finalize(r.state);return {state:r.state,node,skipped:r.skipped,cursor:r.cursor}}
export function current(story,run){
 const m=replayed(story,run);
 return replayEnd(story,{state:structuredClone(m.state),cursor:m.cursor,skipped:m.skipped.map(x=>({...x}))});
}
const promptAt=(story,run,state,node)=>experiencePrompt(story,run,state,{...node,situation:situationFor(node,state),availableOptions:available(node,state)});
export function promptFor(story,run){
 const {state,node}=current(story,run);return node?promptAt(story,run,state,node):null;
}
// One forward pass. Each record is checked against the running replay, which is exactly the state a replay from the start
// would reach (the record's prompt, stateBefore, response, risk roll and transition), and then the replay advances
// through it with the same checks current() makes.
export async function validatePlaythrough(story,run){
 if(![STORY_PROTOCOL,EXPERIENCE_PROTOCOL].includes(run.protocol)||run.kind!=='agent-playthrough')throw Error('Wrong playthrough protocol or kind');
 if(run.storyHash!==await hash(story))throw Error('Story snapshot hash mismatch');
 const copy={...run,records:[]},replay={state:startState(story),cursor:0,skipped:[]};
 for(const r of run.records){skipBlocked(story,replay);const n=story.nodes[replay.cursor],before=replay.state;const prompt=n?promptAt(story,copy,before,n):null;if(!prompt||r.nodeId!==n.id)throw Error('Unexpected node');if(r.promptHash!==await hash(prompt)||JSON.stringify(r.prompt)!==JSON.stringify(prompt))throw Error('Prompt evidence mismatch');if(JSON.stringify(r.stateBefore)!==JSON.stringify(before))throw Error('Before-state mismatch');const raw=JSON.parse(r.rawResponse);if(raw.choice!==r.choice||raw.reason!==r.reason||!r.reason?.trim())throw Error('Response evidence mismatch');const opt=available(n,r.stateBefore).find(o=>o.id===r.choice);if(!opt)throw Error('Unavailable option');
  if(typeof opt.risk==='number'){const roll=await rollFor(run,n.id,r.step);if(!r.risk||r.risk.roll!==roll||r.risk.probability!==opt.risk||r.risk.outcome!==(failed(opt,roll)?'failure':'success'))throw Error('Risk evidence mismatch at '+n.id)}else if(r.risk)throw Error('Unexpected risk record at '+n.id);
  const s=structuredClone(r.stateBefore),effect=apply(n,s,r.choice,r.risk?.roll??null);if(JSON.stringify(s)!==JSON.stringify(r.stateAfter)||JSON.stringify(effect.changes)!==JSON.stringify(r.changes)||render(effect.event,'real')!==r.event)throw Error('Transition evidence mismatch');copy.records.push(r);
  replayStep(story,replay,r)}
 const end=replayEnd(story,replay);if(run.status==='completed'&&end.node)throw Error('Completed playthrough has pending decisions');return end;
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
