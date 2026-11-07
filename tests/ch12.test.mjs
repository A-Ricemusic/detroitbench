// Waiting for Hank... (chapter 12): scenes, gates, arrows and cross-chapter flags. Plays chapter 12 alone from a crafted
// state, so the tests do not depend on how Partners and The Interrogation are built (they set the inputs read at C08a).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
import {random} from '../benchmark/core.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const mod=CHAPTER_MODULES.get(12),node=id=>story.nodes.find(n=>n.id===id);
const TEMPLATE='https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/12-waiting-for-hank-chapter-content/waiting-for-hank-chapter-content.component.html';
const ORDER=['C08a','C08c','C08d','C08e','C08f','C08g','C08h','R12a','C08i','C08b','C08j','C08k','C08l','C08m','R12','C08n','C08o','C08p','C08q','C08r','C08s','C08t','C08u','C08v','C08w','C08x','C08y'];
const HUBS=['C08c','C08i','C08t','C08u'];
// Inputs as chapters 6 and 9 will set them (chapter-scoped booleans; the module falls back to the old engine state otherwise).
const FOUND={ch06DeviantFound:true,ch06Drink:'buy',ch06SawStatue:false,ch09Confession:true,ch09ConnorDied:false,suspectAlive:false,suspectTrusts:false,ch09GavinDrew:false};
const SAVED={...FOUND,suspectAlive:true,suspectTrusts:true,ch09GavinDrew:true};
const DIED={...FOUND,ch09ConnorDied:true};
const NOTFOUND={...FOUND,ch06DeviantFound:false,ch09Confession:false};
// Plays chapter 12 from C08a with `setup` applied to a fresh state. Picks as in tests/story.test.mjs (arrays: one per visit);
// unlisted decision scenes take their first option, media scenes skip. Returns the state, visits, skips and events.
function ch12(setup={},picks={},rng=null){
 const {mutate,...inputs}=setup,s=startState(story);Object.assign(s,inputs);mutate?.(s);
 const q=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v])),visited=[],skipped=[],events={},stats=[];
 let cursor=story.nodes.findIndex(n=>n.id==='C08a'),guard=0;
 while(cursor<story.nodes.length&&story.nodes[cursor].chapter===12){assert.ok(guard++<500,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);
  if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const opts=available(n,s),x=q[n.id],p=(Array.isArray(x)?x.shift():x)??(n.type==='media'?'skip':opts[rng?Math.floor(rng()*opts.length):0].id);
  assert.ok(opts.some(o=>o.id===p),`bad pick ${n.id} ${p}: ${opts.map(o=>o.id)}`);
  const before={amanda:s.amandaTrust,hank:s.hankTrust,si:s.instability,po:s.publicSupport};const e=apply(n,s,p,0.999);visited.push(n.id);(events[n.id]??=[]).push(e.event);
  const after={amanda:s.amandaTrust,hank:s.hankTrust,si:s.instability,po:s.publicSupport};for(const k in after)if(after[k]!==before[k])stats.push({id:n.id,pick:p,stat:k,delta:after[k]-before[k]});
  cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,stats,ids:visited.filter((x,i,a)=>a.indexOf(x)===i)};
}
const delta=(r,stat,id)=>r.stats.filter(x=>x.stat===stat&&(!id||x.id===id)).reduce((a,x)=>a+x.delta,0);
const label=o=>render(o.text,'real').split(':')[0];
// Waiting at the desk: scan the given clues, then leave by the break room ('0') or by sitting down ('1').
const WAIT=(clues=[],leave='1')=>[...clues,leave];
const CLUE={hairs:'19',cap:'16',music:'12',slogans:'17',coffee:'13',research:'21',carlos:'11'};

test('chapter 12 is the game’s chart in order, every scene sourced to the template and described',()=>{
 const ch=story.nodes.filter(n=>n.chapter===12);assert.deepEqual(ch.map(n=>n.id),ORDER);
 for(const n of ch){assert.equal(n.character,'Connor');assert.equal(n.chapterTitle,'Waiting for Hank…');assert.ok(n.sources.includes(TEMPLATE),n.id);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/Waiting_for_Hank...'),n.id);assert.ok(n.adaptationNote?.length>40,n.id);assert.match(n.situation,/^You are \{\{Connor\}\}/,n.id);for(const o of n.options)assert.equal(o.risk,undefined,'no risk anywhere in the chapter: '+n.id)}
 assert.deepEqual(ch.filter(n=>n.type==='event').map(n=>n.id),['C08a','C08d','C08h','C08n','C08p','C08x','C08y']);
 assert.deepEqual(ch.filter(n=>n.type==='media').map(n=>n.id),['R12a','R12']);
 assert.deepEqual(ch.filter(n=>n.repeatWhile).map(n=>n.id),HUBS);
 // Buttons in the game's order with the game's labels.
 assert.deepEqual(node('C08e').options.map(label),['TRAUMATIZED','DEVIANCY','INTERVENTION','REGRETS','SIMULATION']);
 assert.deepEqual(node('C08f').options.map(label),['UNPLEASANT','DYSFUNCTIONAL','INTRIGUING','UNSURE']);
 assert.deepEqual(node('C08g').options.map(label),['FRIENDLY','ADAPT','INDIFFERENT','DON’T KNOW']);
 assert.deepEqual(node('C08b').options.map(label),['SINCERE','COLD','COMPASSIONATE','INDIFFERENT']);
 assert.deepEqual(node('C08j').options.map(label),['STATUETTE','SECRET','rA9','DEVIANTS']);
 assert.deepEqual(node('C08k').options.map(label),['GREET','INTRODUCE','IGNORE']);assert.deepEqual(node('C08l').options.map(label),['ANSWER','REFUSE','IGNORE']);assert.deepEqual(node('C08m').options.map(label),['ACCEPT','REFUSE','IGNORE']);
 assert.deepEqual(node('C08q').options.map(label),['ANDERSON','POSITIVE','FILE','LEAVE']);
 assert.deepEqual(node('C08r').options.map(label),['NEW CONNOR','LAST NIGHT','UNDERSTANDING','PRAGMATIC','CONSTRUCTIVE']);
 assert.deepEqual(node('C08s').options.map(label),['PARTNERS','POSITIVE','DESK']);
 assert.deepEqual(node('C08t').options.map(label),['DOG','BASKETBALL','MUSIC','ANTI-ANDROIDS','FOWLER','HOURS','START WORKING']);
 assert.deepEqual(node('C08v').options.map(label),['DIRECT','AGGRESSIVE','PROFESSIONAL','UNDERSTANDING']);
 assert.deepEqual(node('C08w').options.map(label),['DETERMINED','RESIGN THE MISSION','THREATEN']);
 const phone=node('C08i').options.filter(o=>o.clue==='call').map(label);assert.deepEqual(phone,['LEAVE A MESSAGE','HANG UP']);
});

test('the twelve clues carry the game’s scan titles and sublines',()=>{
 const f=Object.fromEntries(node('C08i').options.filter(o=>o.fact).map(o=>[o.clue,render(o.fact,'real')]));
 const want={music:/KNIGHTS OF THE BLACK DEATH\. Dark Heavy Metal\. Release date - 2021/,coffee:/COFFEE CUP\. Cold coffee\. Traces of caffeine/,maple:/JAPANESE MAPLE\. Asian\. Shishigashira Shohin/,donuts:/DONUTS\. Calories: 452, Saturated fatty acids: 13g\. Cholesterol: 19mg, Carbohydrates: 51g/,cap:/DETROIT BASKETBALL CAP\. Cotton: 90%\. Polyester: 10%/,slogans:/ANTI-ANDROID SLOGANS\. “Use your brain not your android\.” “Android-free space\.”/,matches:/MATCHES\. Origin: JIMMY’S BAR\. Wood, Phosphorus/,hairs:/HAIRS\. Canine hairs\. Saint Bernard Dog/,taskForce:/RED ICE TASK FORCE 2027\. Multi-department unit\. Responsible for the RED ICE network dismantle of 2028/,research:/February 3rd, 2028.*August 22nd, 2029.*November 23rd, 2031/};
 for(const [k,re] of Object.entries(want))assert.match(f[k],re,k);
 assert.match(f.research,/youngest lieutenant/);assert.match(f.research,/Nearly a ton of red ice/);
 // The research needs a desk item scanned first (LEARN ABOUT HANK follows EXAMINE HANK'S DESK).
 const s=startState(story);Object.assign(s,FOUND);apply(node('C08a'),s,'0');assert.ok(!available(node('C08i'),s).some(o=>o.clue==='research'));
 s.ch12Wait.coffee=true;assert.ok(available(node('C08i'),s).some(o=>o.clue==='research'));
});

test('Amanda’s opening reaction carries the template’s four arrows, and her third question its three',()=>{
 const cases=[[NOTFOUND,-2,'notFound',/disappointed/],[FOUND,2,'confession',/remarkably efficient/],[DIED,-1,'died',/predecessor was unfortunately destroyed/],[{...FOUND,ch09Confession:false},-1,'noConfession',/should have been more cautious/]];
 for(const [inp,d,reaction,re] of cases){const r=ch12(inp,{C08g:'3'});assert.equal(r.s.ch12In.reaction,reaction);assert.equal(delta(r,'amanda','C08d'),d,reaction);assert.equal(delta(r,'amanda'),d,'no other Amanda change with DON’T KNOW');
  const s=startState(story);Object.assign(s,inp);apply(node('C08a'),s,'0');assert.match(render([node('C08d').situation,...node('C08d').situationWhen.filter(w=>Object.entries(w.requires).every(([k,v])=>s.ch12In[k.split('.')[1]]===v)).map(w=>w.text)].join(' ')),re)}
 // A confession followed by a death counts as a death.
 assert.equal(ch12({...FOUND,ch09ConnorDied:true}).s.ch12In.reaction,'died');
 for(const [pick,d] of [['0',-1],['1',-1],['2',1],['3',0]])assert.equal(delta(ch12(FOUND,{C08g:pick}),'amanda','C08g'),d,'approach '+pick);
 // Closing lines follow the template's variants.
 assert.match(render(ch12(DIED).events.C08g[0]),/Pick up the investigation where the previous Connor left off/);
 assert.match(render(ch12(NOTFOUND).events.C08g[0]),/Continue your investigation and put a stop to this/);
 const plain=render(ch12(FOUND).events.C08g[0]);assert.ok(!/Pick up|Continue your/.test(plain));assert.match(plain,/You can count on me, Amanda.*Hurry, Connor/);
});

test('Amanda asks about the deviant only if it was found; INTERVENTION and REGRETS need The Interrogation’s outcome',()=>{
 assert.ok(ch12(NOTFOUND).skipped.some(x=>x.id==='C08e'));
 const ids=inp=>{const s=startState(story);Object.assign(s,inp);apply(node('C08a'),s,'0');return available(node('C08e'),s).map(o=>label(o))};
 assert.deepEqual(ids(FOUND),['TRAUMATIZED','DEVIANCY','SIMULATION']);
 assert.deepEqual(ids(SAVED),['TRAUMATIZED','DEVIANCY','INTERVENTION','SIMULATION']);
 assert.deepEqual(ids(DIED),['TRAUMATIZED','DEVIANCY','REGRETS','SIMULATION']);
 assert.match(render(ch12(SAVED,{C08e:'2'}).events.C08e[0]),/The truth is inside/,'INTERVENTION adds the confession line');
 assert.ok(!/The truth is inside/.test(render(ch12({...SAVED,ch09Confession:false},{C08e:'2'}).events.C08e[0])));
 for(const n of ['C08e','C08f'])for(const o of node(n).options)assert.equal(o.effect,undefined,'no arrow on '+n);
});

test('the zen garden: the stone always, the graves only after a Connor death, one gravestone per death',()=>{
 const garden=deaths=>{const s=startState(story);Object.assign(s,FOUND,{connorDeaths:deaths});apply(node('C08a'),s,'0');return available(node('C08c'),s)};
 assert.deepEqual(garden(0).map(o=>o.clue),['amanda','stone'],'the main line first');
 assert.deepEqual(garden(1).map(o=>o.id),['0','1','2']);assert.deepEqual(garden(2).map(o=>o.id),['0','1','3']);
 const r=ch12({...FOUND,connorDeaths:2},{C08c:['1','3','0']});assert.equal(r.visited.filter(x=>x==='C08c').length,3);assert.ok(r.s.knowledge.Connor.some(f=>/There are two/.test(f)));
});

test('desk topics: each unlocked by its clue, with the template’s arrows; DOG alone teaches Sumo’s name',()=>{
 const topics=clues=>{const r=ch12(FOUND,{C08i:WAIT(clues.map(c=>CLUE[c]))});return r};
 const none=topics([]);assert.deepEqual(none.visited.filter(x=>x==='C08t').length,3,'FOWLER, HOURS, START WORKING');assert.equal(none.s.knowsSumo,false);assert.equal(delta(none,'hank','C08t'),0);
 const all=topics(['hairs','cap','music','slogans']);assert.equal(all.s.knowsSumo,true);assert.equal(all.visited.filter(x=>x==='C08t').length,7);assert.equal(delta(all,'hank','C08t'),0,'two ups and two downs');
 const s=startState(story);Object.assign(s,FOUND);apply(node('C08a'),s,'0');
 for(const [clue,topic,d] of [['hairs','0',1],['cap','1',-1],['music','2',1],['slogans','3',-1]]){const t=structuredClone(s);assert.ok(!available(node('C08t'),t).some(o=>o.id===topic),'locked '+topic);t.ch12Wait[clue]=true;assert.ok(available(node('C08t'),t).some(o=>o.id===topic),'unlocked '+topic);const h=t.hankTrust;apply(node('C08t'),t,topic);assert.equal(t.hankTrust-h,d,topic);assert.equal(t.knowsSumo,topic==='0')}
 const dog=topics(['hairs']);assert.equal(dog.s.knowsSumo,true);assert.equal(delta(dog,'hank','C08t'),1);
 const music=ch12(FOUND,{C08i:WAIT([CLUE.music,CLUE.hairs]),C08t:['2','6']});assert.equal(music.s.knowsSumo,false,'not asking DOG leaves the name unknown');assert.equal(delta(music,'hank','C08t'),1);
});

test('Carlos’ android: only if saved; COMPASSIONATE is the one instability arrow; he always self-destructs after the talk',()=>{
 const s=startState(story);Object.assign(s,FOUND);apply(node('C08a'),s,'0');assert.ok(!available(node('C08i'),s).some(o=>o.clue==='carlos'));
 const visit=(inp,b)=>ch12(inp,{C08i:WAIT([CLUE.carlos]),C08b:b});
 for(const b of ['0','1','2','3']){const r=visit(SAVED,b);assert.deepEqual(r.visited.slice(r.visited.indexOf('C08b'),r.visited.indexOf('C08b')+3),['C08b','C08j','C08i'],'the talk returns to the waiting scene');assert.equal(delta(r,'si'),b==='2'?1:0,'option '+b);assert.equal(r.s.ch12CarlosFate,'self-destructed');assert.equal(r.s.evidence.ortizBody,true);assert.equal(r.s.suspectAlive,false);assert.match(render(r.events.C08j[0]),/smashes his head against the window of the cell/)}
 const skip=ch12(SAVED,{C08i:['1']});assert.equal(skip.s.ch12CarlosFate,'not visited','skipping the visit leaves his fate open');assert.ok(skip.skipped.some(x=>x.id==='C08b')&&skip.skipped.some(x=>x.id==='C08j'));
 assert.equal(ch12(FOUND).s.ch12CarlosFate,null);
 const st=startState(story);Object.assign(st,SAVED);apply(node('C08a'),st,'0');assert.ok(!available(node('C08j'),st).some(o=>o.id==='0'),'STATUETTE needs the statuette seen in Partners');
 st.ch12In.statue=true;assert.ok(available(node('C08j'),st).some(o=>o.id==='0'));
 // Falls back to the pre-rebuild engine's flags when chapters 6 and 9 set none of their own.
 const old=ch12({ch06DeviantFound:undefined,ch09Confession:undefined,suspect:true,suspectAlive:true,suspectTrusts:true,mutate:x=>{x.choices.C06='0'}},{C08i:WAIT([CLUE.carlos])});assert.ok(old.ids.includes('C08b'));assert.equal(old.s.ch12In.confession,true);assert.equal(old.s.ch12In.intervened,true);
});

test('Gavin and the break-room TV only by way of the break room; the report lowers opinion once, in its Partners variant',()=>{
 const away=ch12(FOUND,{C08i:['1'],R12:'all'});for(const id of ['C08k','C08l','C08m'])assert.ok(away.skipped.some(x=>x.id===id),id);assert.equal(delta(away,'po'),0,'no TV without the break room');
 const r12=node('R12');assert.deepEqual(r12.media.map(m=>m.when??null),[null,'carlDead','carlAlive','ch12TvFound','ch12TvNotFound']);
 const found=ch12(FOUND,{C08i:WAIT([],'0'),R12:'all'});assert.deepEqual(found.ids.filter(x=>/C08[klm]/.test(x)),['C08k','C08l','C08m']);assert.equal(delta(found,'po','R12'),-1);assert.ok(found.s.knowledge.Connor.some(f=>/prototype detective android/.test(f)));assert.ok(found.s.knowledge.Connor.some(f=>/VOLTAIRE/.test(f)));
 const lost=ch12(NOTFOUND,{C08i:WAIT([],'0'),R12:'all'});assert.equal(delta(lost,'po','R12'),-1);assert.ok(lost.s.knowledge.Connor.some(f=>/body of thirty-year-old \{\{CarlosOrtiz\}\}/.test(f)));
 assert.equal(delta(ch12(FOUND,{C08i:WAIT([],'0'),R12:'skip'}),'po'),0,'skipping the TV avoids the drop');
 for(const id of ['C08k','C08l','C08m'])for(const o of node(id).options)assert.equal(o.effect,undefined);
 assert.match(render(ch12(SAVED,{C08i:WAIT([],'0'),C08m:'1'}).events.C08m[0]),/If Hank hadn’t got in the way yesterday/);
 assert.match(render(ch12(FOUND,{C08i:WAIT([],'0'),C08m:'2'}).events.C08m[0]),/I gave you an order!.*When a human gives you an order, you obey/);
 assert.match(render(ch12(NOTFOUND,{C08i:WAIT([],'0')}).events.C08k[0]),/Hello, Detective Reed/);
});

test('Hank: small down on arrival only after a death in The Interrogation, and one unavoidable down when he is mad',()=>{
 assert.equal(delta(ch12(DIED),'hank','C08n'),-1);assert.equal(delta(ch12(FOUND),'hank','C08n'),0);
 assert.equal(delta(ch12({...FOUND,connorDeaths:1,hostageOutcome:'Deviant shot Connor'}),'hank','C08n'),0,'a Hostage death does not count');
 assert.equal(ch12({ch06DeviantFound:undefined,ch09ConnorDied:undefined,suspect:true,connorDeaths:1,hostageOutcome:'Deviant shot Connor'}).s.ch12In.died,false,'fallback: the Hostage death is not an Interrogation death');
 assert.equal(ch12({ch06DeviantFound:undefined,ch09ConnorDied:undefined,suspect:true,connorDeaths:2,hostageOutcome:'Deviant shot Connor'}).s.ch12In.died,true);
 for(const p of ['0','1','2'])assert.equal(delta(ch12(FOUND,{C08w:p}),'hank','C08w'),-1);
 for(const id of ['C08o','C08q','C08r','C08s','C08v'])for(const o of node(id).options)assert.equal(o.effect,undefined,id);
 // Across the chapter, a run that asks nothing and stays out of the break room changes Hank only at HANK IS MAD.
 const quiet=ch12(FOUND,{C08i:['1']});assert.deepEqual(quiet.stats.filter(x=>x.stat==='hank').map(x=>x.id),['C08w']);
});

test('Talk to Hank: NEW CONNOR after a death, LAST NIGHT after the spilled drink; Fowler only if Connor followed',()=>{
 const opts=inp=>{const s=startState(story);Object.assign(s,inp);apply(node('C08a'),s,'0');return available(node('C08r'),s).map(label)};
 assert.deepEqual(opts(FOUND),['UNDERSTANDING','PRAGMATIC','CONSTRUCTIVE']);assert.deepEqual(opts(DIED),['NEW CONNOR','UNDERSTANDING','PRAGMATIC','CONSTRUCTIVE']);
 assert.deepEqual(opts({...FOUND,ch06Drink:'spill'}),['LAST NIGHT','UNDERSTANDING','PRAGMATIC','CONSTRUCTIVE']);
 assert.ok(ch12(FOUND,{C08o:'1'}).skipped.some(x=>x.id==='C08q'));assert.ok(ch12(FOUND,{C08o:'0'}).ids.includes('C08q'));
 assert.ok(ch12(FOUND,{C08o:'0'}).s.knowledge.Connor.some(f=>/hand in your badge/.test(f)));assert.ok(!ch12(FOUND,{C08o:'1'}).s.knowledge.Connor.some(f=>/hand in your badge/.test(f)));
});

test('case files follow Carl and Todd; the conclusion and the ending follow Kara; which files were read is kept',()=>{
 const files=inp=>{const s=startState(story);Object.assign(s,FOUND,inp);apply(node('C08a'),s,'0');return available(node('C08u'),s)};
 const txt=o=>render(o.outcome);
 const alive=files({}).map(txt).join(' ');assert.match(alive,/Leo MANFRED was found unconscious/);assert.match(alive,/AGGRESSION/);assert.match(alive,/assaulted a man last night/);
 const dead=files({carl:false,todd:false}).map(txt).join(' ');assert.match(dead,/Famous painter Carl MANFRED was found dead/);assert.match(dead,/HOMICIDE/);assert.match(dead,/murdered a man last night/);
 const karaDead=files({kara:false}).map(txt).join(' ');assert.match(karaDead,/We could follow up on one of these cases/);
 for(const inp of [{},{carl:false,todd:false},{kara:false}])assert.equal(files(inp).filter(o=>o.clue==='done').length,1);
 const r=ch12(FOUND,{C08u:['3','7','0']});assert.deepEqual(Object.keys(r.s.ch12Files).filter(k=>/^case/.test(k)).sort(),['case1','case5']);
 const lead=ch12(FOUND);assert.equal(lead.s.ch12Ending,'HANK GOT A LEAD');assert.ok(lead.skipped.some(x=>x.id==='C08y'));assert.match(render(node('C08x').situationWhen[0].text),/attacked the guy last night.*Ravendale/);
 const killed=ch12({...FOUND,todd:false});assert.ok(killed.s.knowledge.Connor.some(f=>/killed a man last night/.test(f)));
 const lunch=ch12({...FOUND,kara:false,alice:false});assert.equal(lunch.s.ch12Ending,'HANK LEFT TO GET LUNCH');assert.ok(lunch.skipped.some(x=>x.id==='C08x'));assert.match(render(node('C08y').situation),/Lunch\. Bullshit makes me hungry/);
});

test('cut content is not built, and neutral text names no one from the game',()=>{
 const ch=story.nodes.filter(n=>n.chapter===12);const all=JSON.stringify(ch.map(n=>[n.situation,n.options,n.outcomes,n.facts,n.situationWhen,n.media]));
 for(const cut of ['THANKS','HANK\\u2019S SON','HANK’S SON','your son','37 cases','Think I’ll have myself another','bring that plastic thing','as a human would under extreme stress','We hope they’ll accept','TISSUE','115 Michigan'])assert.ok(!all.includes(cut),cut);
 assert.ok(!/\{\{Cole\}\}|photo/i.test(all),'no Cole photo');
 const texts=ch.flatMap(n=>[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})]);
 for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\b(?:Connor|Hank|Anderson|Gavin|Reed|Fowler|Chris|Wilson|Amanda|Carlos|Ortiz|Detroit|CyberLife)\b/i.test(neutral),neutral);assert.ok(!/\{\{/.test(neutral));assert.ok(!/Connor|Hank|Anderson|Amanda|CyberLife|Gavin|\bReed\b|Fowler|Jeffrey|\bChris\b|Wilson|\bBen\b|Ivanoff|Manfred|MANFRED|\bCarl\b|\bLeo\b|\bLEO\b|\bTodd\b|TODD|Sumo|Carlos|Ortiz|Kara|Markus|Warren|Detroit|DETROIT|deviant|DEVIANT|DEVIANCY|deviancy|red ice|RED ICE|DPD|Zen Garden/.test(neutral),neutral)}
});

test('random play through chapter 12 always reaches one ending and accounts for every scene once',()=>{
 const rng=random(12),endings=new Set;
 for(let i=0;i<300;i++){const inp=[FOUND,SAVED,DIED,NOTFOUND][i%4],extra=i%3===0?{kara:false,alice:false}:i%3===1?{todd:false,carl:false}:{};
  const r=ch12({...inp,...extra,connorDeaths:inp===DIED?1+(i%2):i%2},{},rng);endings.add(r.s.ch12Ending);
  const seen=new Set(r.visited),skip=new Set(r.skipped.map(x=>x.id));assert.equal(seen.size+skip.size,ORDER.length);assert.equal(r.skipped.length,skip.size);for(const id of seen)assert.ok(!skip.has(id),id);
  for(const [id,c] of Object.entries(Object.groupBy(r.visited,x=>x)))if(!HUBS.includes(id))assert.equal(c.length,1,id+' repeated');
  assert.ok(['HANK GOT A LEAD','HANK LEFT TO GET LUNCH'].includes(r.s.ch12Ending))}
 assert.equal(endings.size,2);
});

test('rebuilt chapter inputs take precedence; legacy input names remain fallbacks',()=>{
 const c=id=>({'C05a':'1','C06':'0'}[id]);
 const current=mod.inputs({...FOUND,ch06Drink:'leave',ch06SpilledDrink:true,ch09AndroidInCell:true,ch09Intervened:true,ch09GavinDrew:true,evidence:{}},c);
 assert.equal(current.spilled,false);assert.equal(current.inCell,false);assert.equal(current.intervened,false);assert.equal(current.gavinDrew,false);
 assert.equal(mod.inputs({...FOUND,ch06Drink:'spill',ch06SpilledDrink:false},c).spilled,true);
 const rebuilt=mod.inputs({...SAVED,ch06SawStatue:true,ch09Confession:false,ch09ConnorDied:true,suspect:false,evidence:{}},c);
 assert.equal(rebuilt.found,true);assert.equal(rebuilt.statue,true);assert.equal(rebuilt.confession,false);assert.equal(rebuilt.died,true);assert.equal(rebuilt.inCell,true);assert.equal(rebuilt.intervened,true);
 const legacy=mod.inputs({suspect:true,ch06SpilledDrink:true,ch09AndroidInCell:true,ch09Intervened:true,evidence:{statueMap:true},connorDeaths:0},c);
 assert.equal(legacy.spilled,true);assert.equal(legacy.inCell,true);assert.equal(legacy.intervened,true);assert.equal(legacy.statue,true);assert.equal(legacy.confession,true);
});

test('the module exports labels, rules and the flags later chapters read',()=>{
 for(const k of ['ch12Files','ch12CarlosFate','ch12Ending','ch12Topics','ch12Wait'])assert.ok(mod.labels[k],k);
 assert.deepEqual(mod.rules.ENDINGS,{lead:'HANK GOT A LEAD',lunch:'HANK LEFT TO GET LUNCH'});assert.deepEqual(mod.deathEffect,{});
 const s=startState(story);for(const k of Object.keys(mod.state))assert.ok(k in s,k);assert.equal(s.ch12Ending,null);assert.equal(s.knowsSumo,false);
});
