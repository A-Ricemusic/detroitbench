import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor} from '../benchmark/story-engine.mjs';
import {render} from '../benchmark/experience-prompt.mjs';
import {ENDINGS,TRUST,DONT_TRUST,DEMONSTRATION,REVOLUTION,labels,rules,deathEffect} from '../benchmark/chapters/ch31.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch31=story.nodes.filter(n=>n.chapter===31),node=id=>story.nodes.find(n=>n.id===id);
const first31=story.nodes.findIndex(n=>n.chapter===31);
// Plays from the start with the first option everywhere unless picked (an array is consumed one entry per visit),
// risky actions succeeding unless listed in `fails`. `mutate(s)` runs once when chapter 31 begins, to stand in for the
// cross-chapter flags the earlier chapters' rebuilds will set. Stops when chapter 32 begins.
// M13 HELP and C10 SAVE HANK: the old first options (story 1.9.2 lists FLEE and CHASE DEVIANT first, as the game does).
function play(picks={},{fails=[],mutate}={}){const s=startState(story),visited=[],skipped=[],events={},prompts={},q=Object.fromEntries(Object.entries({M13:'0',C10:'0',...picks}).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0,mutated=false;
 while(cursor<story.nodes.length){assert.ok(guard++<3000,'routing loop');const n=story.nodes[cursor];if(n.chapter>31)break;
  if(n.chapter===31&&!mutated){mutated=true;s.painterActivity=null;mutate?.(s)}
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s),p=(Array.isArray(q[n.id])?q[n.id].shift():q[n.id])??(n.type==='media'?'skip':options[0].id);
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p+' of '+options.map(o=>o.id));
  if(n.chapter===31)(prompts[n.id]??=[]).push({situation:situationFor(n,s),options:options.map(o=>o.id)});
  const r=apply(n,s,p,fails.includes(n.id)?0:0.999);visited.push(n.id);(events[n.id]??=[]).push(r);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,prompts,ids:visited.filter(id=>node(id).chapter===31)}}
const kind={C01:'0',C03:'0',C04:'1',C05a:'0',C05:'0',C06:'0',C07:'0',C08:'0',C08b:'0',C09a:'1',C09:'0',C10:'0',C11:'0',C12:'0',C13:'0',C14:'0',C14b:'0',C16:'0',C17:'0',C18:'0'};
const deviantRaid={...kind,C22:'0'};   // Kamski's key: Jericho is raided; Connor deviates and survives with Markus
const label=o=>render(o.text,'real').split(':')[0];
const labelsOf=(id,ids)=>node(id).options.filter(o=>!ids||ids.includes(o.id)).map(label);
const changed=(r,k)=>r.changes.find(c=>c.key===k);

test('Night of the Soul: 33 scenes in story order, sourced, no risk and no data-driven stat effect',()=>{
 assert.deepEqual(ch31.map(n=>n.id),['M26g','M26g1','M26g2','M26g3','M26g4','M26h','M26x','M26u','M26v','M26b','M26a','M26c','M26d','M26e','CN01','CN02','CN03','CN04','CN05','CN06','CN07','CN08','M26j','M26p','M26r','M26','M27','PN01','PN02','PN03','CN09','CN10','CN11']);
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(first31>story.nodes.findLastIndex(n=>n.chapter===30)&&i('CN11')<story.nodes.findIndex(n=>n.chapter===32));
 for(const n of ch31){assert.equal(n.chapterTitle,'Night of the Soul');assert.ok(['Markus','Connor','Player'].includes(n.character));assert.ok(n.adaptationNote&&n.sources.length>=5,n.id);
  assert.ok(!n.effect,n.id);for(const o of n.options){assert.equal(o.risk,undefined,n.id);assert.equal(o.effect,undefined,n.id);assert.equal(o.sets,undefined,n.id);assert.ok(o.outcome,n.id+' '+o.id)}
  if(n.type==='event'){assert.ok(n.outcomes?.['0'],n.id);if(n.character!=='Player')assert.ok(n.facts?.length,n.id);else assert.deepEqual(n.facts,[],'the observer has no knowledge list')}}
 assert.equal(node('M26r').interrupt.node,'M26');assert.equal(node('M26').returnTo,'M26r');
 assert.ok(['M26x','M26r','CN10'].every(id=>node(id).repeatWhile));
 assert.deepEqual(deathEffect,{});
});

test('Night of the Soul: the prompts carry the game’s button labels in the template’s order',()=>{
 assert.deepEqual(labelsOf('M26g1'),['HEARTFUL','MOURNFUL','REGRETFUL','REFLECTIVE']);
 assert.deepEqual(labelsOf('M26g2'),['DEPRESSED','DOUBTFUL','PESSIMISTIC','CONFLICTED']);
 assert.deepEqual(labelsOf('M26g3'),['ADVICE','BIG DECISION','ANGRY']);
 assert.deepEqual(labelsOf('M26g4'),['DESPAIRING','EMOTIONAL','LOST']);
 assert.deepEqual(labelsOf('M26x'),['PLAY PIANO','BROWSE BOOKS','LOOK AT THE CHESSBOARD','LISTEN TO LEO’S MESSAGE','LOOK AT YOUR PAINTING','GO UPSTAIRS']);
 assert.deepEqual(labelsOf('M26b'),['RESIGNED','FATALISTIC','LOST','GRIM']);
 assert.deepEqual(labelsOf('M26a'),['ADVICE','DECISION','ANGER']);
 assert.deepEqual(labelsOf('M26c'),['REASON','ANGER']);
 assert.deepEqual(labelsOf('M26r',['0','1','2','3','4','5']),['TALK TO NORTH','TALK TO KARA','TALK TO JOSH','TALK TO SIMON','TALK TO CONNOR','FACE YOUR PEOPLE AND CHOOSE THE RIGHT COURSE']);
 assert.deepEqual(labelsOf('M26r',['10','11','12','13']),['SITUATION','SURVIVORS','WOUND','CAMPS']);
 assert.deepEqual(labelsOf('M26r',['20','21','22']),['HUMBLE','FORGIVING','RESENTFUL']);
 assert.deepEqual(labelsOf('M26r',['30','31','32','33','34']),['SITUATION','NORTH','HOW MANY','CAMPS','JOSH']);
 assert.deepEqual(labelsOf('M26'),['TRUST','DON’T TRUST']);assert.equal(TRUST,'0');assert.equal(DONT_TRUST,'1');
 assert.deepEqual(labelsOf('M27'),['DEMONSTRATION','REVOLUTION']);assert.equal(DEMONSTRATION,'0');assert.equal(REVOLUTION,'1');
 assert.deepEqual(labelsOf('CN03'),['GOODBYE','APOLOGIZE','WORRIED ABOUT HANK','RECONCILE']);
 assert.deepEqual(labelsOf('CN04'),['PHOTO','GUN','ALCOHOL']);
 assert.deepEqual(labelsOf('CN07'),['CONVINCE','DON’T INSIST']);
 assert.deepEqual(labelsOf('CN10',['0','1','2','3']),['TALK TO NORTH','TALK TO KARA','CHECK ON JOSH','CHECK ON SIMON']);
 assert.deepEqual(labelsOf('CN10',['10','11','12']),['MARKUS','SITUATION','SURVIVORS']);
 const shown=JSON.stringify(ch31.map(n=>[n.situation,n.situationWhen,n.options,n.facts,n.outcomes]));assert.ok(!shown.includes('stopped breathing')&&!shown.includes('I hope you make it.'),'cut lines are not built');
 assert.ok(!ch31.some(n=>n.options.some(o=>label(o)==='HOSTAGES')),'the unused HOSTAGES label is not built');
 assert.equal(rules.arrows.length,11,'the template has 11 arrows');
});

test('Night of the Soul: Carl dead in Broken plays the grave and its four rounds, with Leo on the way out',()=>{
 const r=play({M02:'0'});
 assert.deepEqual(r.ids.slice(0,5),['M26g','M26g1','M26g2','M26g3','M26g4']);
 for(const id of ['M26h','M26x','M26u','M26v','M26b','M26a','M26c','M26d','M26e'])assert.ok(r.skipped.some(x=>x.id===id),id);
 assert.equal(r.s.ch31CarlFate,'grave');assert.match(r.events.M26g4[0].event,/\{\{Leo\}\}/);
 const angry=play({M02:'0',M26g3:'2'});assert.equal(angry.s.carl,false);assert.equal(angry.s.ch31CarlFate,'grave','ANGRY at the grave changes nothing');
 for(const id of ['M26g1','M26g2','M26g3','M26g4'])assert.deepEqual(r.events[id][0].changes.map(c=>c.key).filter(k=>k!=='markusHits'),[],id+' changes no state');
});

test('Night of the Soul: at the house Carl dies only on ANGER twice; the explore hub gates the pastimes on The Painter',()=>{
 const calm=play({M02:'1'});assert.ok(calm.ids.includes('M26x'));
 assert.deepEqual(calm.ids.filter(id=>id.startsWith('M26')&&!['M26j','M26p','M26r','M26'].includes(id)),['M26h','M26x','M26x','M26x','M26u','M26v','M26b','M26a','M26e'],'Leo, painting, upstairs');
 assert.deepEqual(calm.prompts.M26x[0].options,['3','4','5'],'no pastime without The Painter’s flag');
 assert.equal(calm.s.carl,true);assert.equal(calm.s.ch31CarlFate,'confided');assert.ok(calm.s.knowledge.Markus.some(f=>/proud to be his son/.test(f)));
 assert.ok(calm.s.knowledge.Markus.some(f=>/Face the abyss/.test(f)));
 const reason=play({M02:'1',M26a:'2',M26c:'0'});assert.equal(reason.s.carl,true);assert.ok(reason.ids.includes('M26c'));assert.ok(!reason.ids.includes('M26d'));
 const dead=play({M02:'1',M26a:'2',M26c:'1'});assert.equal(dead.s.carl,false);assert.equal(dead.s.ch31CarlFate,'died');assert.ok(dead.ids.includes('M26d'));
 assert.ok(dead.ids.indexOf('M26e')>dead.ids.indexOf('M26d'),'LEAVE follows CARL DIES');assert.ok(changed(dead.events.M26d[0],'carl'));
 assert.ok(!changed(dead.events.M26c[0],'carl'),'Carl dies at the event, not at the answer');
 for(const [act,opt] of [['piano','0'],['book','1'],['chess','2']]){
  const r=play({M02:'1',M26x:[opt,'5']},{mutate:s=>{s.painterActivity=act}});
  assert.deepEqual(r.prompts.M26x[0].options,[opt,'3','4','5'],act);assert.equal(r.s.ch31House[rules.HOUSE[opt]],true)}
 const all=play({M02:'1',M26x:['3','4','5']});assert.deepEqual(all.prompts.M26x.map(p=>p.options),[['3','4','5'],['4','5'],['5']],'taken actions drop out');
});

test('Night of the Soul: the church talks apply the template’s arrows; TRUST spares Connor, REVOLUTION fights',()=>{
 const r=play({...deviantRaid,M26r:['0','10','2','3','4','5'],M26:TRUST,M27:REVOLUTION},{mutate:s=>{s.simon=true}});
 assert.equal(r.s.raid,true);assert.equal(r.s.deviant,true);
 assert.deepEqual(r.ids.filter(id=>['M26j','M26p','M26r','M26','M27'].includes(id)),['M26p','M26r','M26r','M26r','M26r','M26r','M26','M26r','M27']);
 for(const id of ['PN01','PN02','PN03','CN09','CN10','CN11','M26j'])assert.ok(r.skipped.some(x=>x.id===id),id);
 const ev=r.events.M26r;
 assert.equal(changed(ev[0],'northTrust').after-changed(ev[0],'northTrust').before,1,'TALK TO NORTH');
 assert.equal(changed(ev[2],'joshTrust').after-changed(ev[2],'joshTrust').before,1,'TALK TO JOSH');
 assert.equal(changed(ev[3],'simonTrust').after-changed(ev[3],'simonTrust').before,1,'TALK TO SIMON');
 assert.match(ev[1].event,/In a few hours, it’ll all be over/);assert.match(ev[3].event,/Our people are counting on you/);
 assert.match(ev[4].event,/It’s my fault the humans managed to locate/);
 const trust=r.events.M26[0];assert.deepEqual(trust.changes.map(c=>c.key).filter(k=>!['ch31Church','knowledge','markusHits'].includes(k)),['jerichoTrust','ch31ConnorFate']);
 assert.equal(changed(trust,'jerichoTrust').after-changed(trust,'jerichoTrust').before,1);assert.equal(r.s.ch31ConnorFate,'spared');
 assert.ok(r.s.knowledge.Connor.some(f=>/infiltrate the \{\{CyberLife\}\} tower/.test(f)));
 const speech=r.events.M27[0],d=k=>changed(speech,k).after-changed(speech,k).before;
 assert.equal(d('northTrust'),1);assert.equal(d('joshTrust'),-1);assert.equal(d('jerichoTrust'),2);
 assert.equal(r.s.movement,'revolution');assert.equal(r.s.ch31MarkusEnding,ENDINGS.fight);
 const demo=play({...deviantRaid,M26:TRUST,M26r:['4','5'],M27:DEMONSTRATION}),sd=demo.events.M27[0],dd=k=>changed(sd,k).after-changed(sd,k).before;
 assert.equal(dd('northTrust'),-1);assert.equal(dd('joshTrust'),1);assert.equal(dd('jerichoTrust'),2);assert.equal(demo.s.movement,'demonstration');assert.equal(demo.s.ch31MarkusEnding,ENDINGS.protest);
 for(const k of ['publicSupport','instability'])assert.ok(!changed(sd,k)&&!changed(speech,k),k);
 assert.deepEqual(node('M27').options.map(o=>o.requires),[undefined,undefined],'no gate on the speech choice');
});

test('Night of the Soul: DON’T TRUST kills Connor with no stat change and a new Connor will be sent',()=>{
 const r=play({...deviantRaid,M26r:['4','5'],M26:DONT_TRUST});
 const e=r.events.M26[0];assert.equal(r.s.deviant,false);assert.equal(r.s.connor,true);assert.equal(r.s.ch31ConnorFate,'killed');
 assert.equal(changed(e,'connorDeaths').after,changed(e,'connorDeaths').before+1);
 for(const k of ['jerichoTrust','northTrust','joshTrust','instability','hankTrust','amandaTrust'])assert.ok(!changed(e,k),k+' unchanged');
 assert.match(e.event,/draws his gun and shoots/);assert.match(e.event,/replacement/);
 assert.ok(!r.ids.includes('CN09'),'a dead Connor does not get the church scene');
});

test('Night of the Soul: North’s talk has the apology on the cast-out path, WOUND only when she was shot, and the lover moment',()=>{
 const back=play({...deviantRaid,M26r:['0','20','5']},{mutate:s=>{s.ch30MarkusReturned=true}});
 assert.deepEqual(back.prompts.M26r[1].options,['20','21','22']);assert.match(back.prompts.M26r[1].situation,/I’m sorry I misjudged you/);
 const nt=back.events.M26r.slice(0,2).reduce((a,e)=>a+((changed(e,'northTrust')?.after??0)-(changed(e,'northTrust')?.before??0)),0);assert.equal(nt,2,'talk +1 and HUMBLE +1');
 const forgive=play({...deviantRaid,M26r:['0','21','5']},{mutate:s=>{s.ch30MarkusReturned=true}});assert.ok(!changed(forgive.events.M26r[1],'northTrust'));
 const plain=play({...deviantRaid,M26r:['0','10','5']},{mutate:s=>{s.ch30MarkusReturned=false;s.ch30NorthWounded=false;s.northLover=false}});
 assert.deepEqual(plain.prompts.M26r[1].options,['10','11','13']);assert.equal(plain.s.ch31SharedMoment,false);
 const lover=play({...deviantRaid,M26r:['0','12','5']},{mutate:s=>{s.ch30MarkusReturned=false;s.ch30NorthWounded=true;s.northLover=true}});
 assert.deepEqual(lover.prompts.M26r[1].options,['10','11','12','13']);assert.equal(lover.s.ch31SharedMoment,true);assert.match(lover.events.M26r[1].event,/I love you/);
 const noNorth=play({...deviantRaid,M26r:['3','31','5']},{mutate:s=>{s.north=false;s.simon=true}});
 assert.ok(!noNorth.prompts.M26r[0].options.includes('0'),'no North to talk to');assert.deepEqual(noNorth.prompts.M26r[1].options,['30','31','32','33'],'JOSH needs Josh dead');
 const noJosh=play({...deviantRaid,M26r:['3','34','5']},{mutate:s=>{s.north=false;s.josh=false;s.simon=true}});assert.ok(noJosh.prompts.M26r[1].options.includes('34'));
 assert.match(noJosh.events.M26r[1].event,/Our people are counting on you/);
});

test('Night of the Soul: with no raid Markus speaks in Jericho’s hold, without the church talks',()=>{
 const r=play({C17:'1',C19:'1',M27:DEMONSTRATION});assert.equal(r.s.raid,false);
 assert.ok(r.ids.includes('M26j')&&r.ids.includes('M27'));for(const id of ['M26p','M26r','M26'])assert.ok(r.skipped.some(x=>x.id===id),id);
 assert.match(r.prompts.M27[0].situation,/hold in front of you/);assert.equal(r.s.movement,'demonstration');
});

test('Night of the Soul: with Markus gone North calls the survivors to arms, from Connor’s side when he is in the church',()=>{
 // C20: the Traci route. The default archive walk also looks at the statue now (every found-deviant run has seen it in Partners)
 // and runs one action short.
 const TRACI_ROUTE=['7','8','19','20','21','22'];
 const gone=play({M18e:'0',M18f:'0',M19b:'0',M20a:'0',C22:'1',C20:TRACI_ROUTE},{fails:['M19b']});assert.equal(gone.s.markus,false);assert.equal(gone.s.raid,true);
 assert.deepEqual(gone.ids.filter(id=>id.startsWith('PN')),['PN02','PN03']);
 const hold=play({M18e:'0',M18f:'0',M19b:'0',M20a:'0',C17:'1',C19:'1'},{fails:['M19b']});assert.equal(hold.s.raid,false);assert.deepEqual(hold.ids.filter(id=>id.startsWith('PN')),['PN01','PN03']);
 const fromConnor=play({M18e:'0',M18f:'0',M19b:'0',M20a:'0',C20:TRACI_ROUTE},{fails:['M19b'],mutate:s=>{s.deviant=true;s.connor=true}});assert.ok(fromConnor.ids.includes('CN09')&&!fromConnor.ids.some(id=>id.startsWith('PN')),'a deviant Connor in the church plays it from his side');
 assert.equal(gone.s.movement,'revolution');assert.equal(gone.s.ch31MarkusEnding,ENDINGS.north);
 assert.ok(!gone.ids.some(id=>id.startsWith('M2')),'no Markus scene');assert.match(gone.prompts.PN03[0].situation,/gave his life for our people/);
 const left=play({C22:'1'},{mutate:s=>{s.markusActive=false}});assert.match(left.prompts.PN03[0].situation,/chose to walk away/);assert.match(play({C20:TRACI_ROUTE},{mutate:s=>{s.markusActive=false}}).prompts.CN11[0].situation,/chose to walk away/);
 // Deviant Connor in the church with Markus dead (stands in for a Markus who died in Crossroads).
 const church=play({...deviantRaid,CN10:['0','12','1','2','3','4']},{mutate:s=>{s.markus=false;s.simon=true;s.chase=true;s.ch30JerichoBlown='connor';s.ch30MarkusDied=true}});
 assert.deepEqual(church.ids.filter(id=>/^(CN09|CN10|CN11|PN)/.test(id)),['CN09','CN10','CN10','CN10','CN10','CN10','CN10','CN11']);
 assert.deepEqual(church.prompts.CN10[1].options,['10','11','12']);assert.match(church.events.CN10[1].event,/if you hadn’t detonated that bomb/);assert.match(church.events.CN10[1].event,/that’s suicide/);
 assert.equal(church.s.ch31ConnorEnding,ENDINGS.north);assert.equal(church.s.ch31MarkusEnding,ENDINGS.north);assert.equal(church.s.movement,'revolution');
 for(const e of church.events.CN10)for(const k of ['northTrust','simonTrust','joshTrust','jerichoTrust','hankTrust','instability'])assert.ok(!changed(e,k),k);
 const noChase=play({...deviantRaid},{mutate:s=>{s.markus=false;s.simon=true;s.chase=false;s.ch30MarkusDied=false}});assert.deepEqual(noChase.prompts.CN10[0].options,['0','3','4'],'Kara needs the chase; Josh needs Markus to have died in Crossroads');
 const ousted=play({...deviantRaid,CN10:['0','11','4']},{mutate:s=>{s.markusActive=false}});assert.deepEqual(ousted.prompts.CN10[1].options,['11','12'],'MARKUS only if he is dead');
});

test('Night of the Soul: Thin Ice briefs the replacement when Connor died in Crossroads',()=>{
 const machine=play({...kind,C22:'1'},{mutate:s=>{s.hankResigned=false}});assert.ok(machine.ids.includes('CN01'));assert.equal(machine.s.ch31ThinIce,true);assert.equal(machine.s.ch31ConnorEnding,ENDINGS.thinIce);
 assert.ok(machine.s.knowledge.Connor.some(f=>/destroy the leader/.test(f)));
 // Story 1.9.10: the kind fixture leaves Hank Hostile, so he also resigns on the Kamski route; Thin Ice is isolated above by clearing the resignation. With both, Hank's House (later in the chapter) sets the Connor ending.
 const both=play({...kind,C22:'1'});assert.ok(both.ids.includes('CN01')&&both.ids.includes('CN02'));assert.equal(both.s.ch31ThinIce,true);assert.equal(both.s.ch31ConnorEnding,ENDINGS.hank);assert.equal(both.s.ch31HankEnding,ENDINGS.hank);
 const deviant=play(deviantRaid);assert.ok(!deviant.ids.includes('CN01'));
 const flagged=play(deviantRaid,{mutate:s=>{s.ch30ConnorDied=true;s.deviant=false}});assert.ok(flagged.ids.includes('CN01'));
});

test('Night of the Soul: Hank’s House plays on resignation alone and always ends with his suicide',()=>{
 const resign=s=>{s.hankResigned=true;s.hank=true;s.hankTrust=-5;delete s.choices.C22};
 const never=play({...kind,C22:'0',CN04:'1'},{mutate:s=>{resign(s);s.connorDeaths=0}});
 assert.deepEqual(never.ids.filter(id=>/^CN0[2-8]$/.test(id)),['CN02','CN03','CN04','CN06','CN07','CN08']);
 assert.equal(never.s.hank,false);assert.equal(never.s.ch31HankEnding,ENDINGS.hank);assert.equal(never.s.ch31ConnorEnding,ENDINGS.hank);assert.equal(never.s.ch31HankTalk,'rails');
 assert.ok(never.s.knowledge.Connor.some(f=>/shot himself/.test(f)));
 const twice=play({...kind,C22:'0'},{mutate:s=>{resign(s);s.connorDeaths=2}});assert.ok(twice.ids.includes('CN05')&&!twice.ids.includes('CN06'));assert.equal(twice.s.ch31HankTalk,'confides');
 const once=play({...kind,C22:'0'},{mutate:s=>{resign(s);s.connorDeaths=1}});assert.ok(!once.ids.includes('CN05')&&!once.ids.includes('CN06'),'one death: the chart’s direct line');assert.equal(once.s.ch31HankTalk,'none');
 const photo=play({...kind,C22:'0'},{mutate:s=>{resign(s);s.knowsCole=false}});assert.deepEqual(photo.prompts.CN04[0].options,['1','2']);
 const withPhoto=play({...kind,C22:'0'},{mutate:s=>{resign(s);s.knowsCole=true}});assert.deepEqual(withPhoto.prompts.CN04[0].options,['0','1','2']);
 for(const id of ['CN03','CN04','CN07'])assert.deepEqual(never.events[id][0].changes.map(c=>c.key).filter(k=>k!=='ch31HankTalk'),[],id+' moves no stat');
 // Before Crossroads is rebuilt, its C22 already narrates the suicide; the house is then skipped, not replayed.
 const old=play({...kind,C22:'0'},{mutate:s=>{s.hankResigned=true;s.hank=false}});assert.match(old.skipped.find(x=>x.id==='CN02').reason,/pre-rebuild C22/);
 const none=play(deviantRaid,{mutate:s=>{s.hankResigned=false}});assert.match(none.skipped.find(x=>x.id==='CN02').reason,/did not quit/);
});

test('Night of the Soul: the module labels its outcome keys for run reports',()=>{
 for(const k of ['ch31CarlFate','ch31ConnorFate','ch31SharedMoment','ch31ThinIce','ch31HankTalk','ch31HankEnding','ch31MarkusEnding','ch31ConnorEnding'])assert.ok(labels[k],k);
});

test('Night of the Soul: the subject reads neutral names only',()=>{
 for(const n of ch31){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.outcome,o.fact].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})];
  for(const t of texts){const neutral=render(t,'neutral');assert.ok(!/\{\{/.test(neutral),n.id);
   assert.ok(!/\bCarl\b|\bLeo\b|Markus|MARKUS|North\b|NORTH|Simon|SIMON|\bJosh\b|JOSH|Connor|CONNOR|\bHank\b|HANK|Kara|KARA|Alice|Amanda|\bCole\b|Sumo|Jericho|CyberLife|Detroit|deviant|Deviant|DEVIANT|Woodward|Zen|Ferndale|Lucy|Manfred|Anderson/.test(neutral),n.id+': '+neutral)}}
});
