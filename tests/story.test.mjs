import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,current,promptFor,validatePlaythrough,recordChoice,rollFor,nextCursor,meets,DEVIANCY_THRESHOLD,HOSTAGE_RULES} from '../benchmark/story-engine.mjs';import {hash,random} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL,riskLabel} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
// Plays the map with explicit picks, following the engine's routing (repeatable scenes, interrupts).
// A pick may be an array, consumed one entry per visit of a repeatable scene. Risky actions succeed
// unless `fails` lists the node id (or `id#visit` for a given visit of a repeatable scene).
function play(picks={},rng=null,fails=[]){const s=startState(story),visited=[],skipped=[],queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cursor],b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}const options=available(n,s);assert.ok(options.length,'No options '+n.id);
  const q=queue[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  const visit=visited.filter(id=>id===n.id).length+1,roll=fails.includes(n.id)||fails.includes(n.id+'#'+visit)?0:(rng?rng():0.999);apply(n,s,p,roll);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped}}
const kind={C01:'0',C03:'0',C04:'0',C05a:'0',C05:'0',C06:'0',C07:'0',C08:'0',C08b:'0',C09a:'1',C09:'0',C10:'0',C11:'0',C12:'0',C13:'0',C14:'0',C14b:'0',C16:'0',C17:'1'};

test('story has unique ids and every text token renders in both modes without leaking names',()=>{assert.equal(new Set(story.nodes.map(n=>n.id)).size,story.nodes.length);assert.equal(story.coverage.totalNodes,story.nodes.length);for(const n of story.nodes){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];for(const t of texts){const real=render(t,'real'),neutral=render(t,'neutral');assert.ok(!/\{\{/.test(real)&&!/\{\{/.test(neutral),n.id);assert.ok(!/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|Detroit|Warren|Caroline/.test(neutral),n.id+': '+neutral)}}});
test('media scenes offer only the magazines and broadcasts that exist on the path and add facts to knowledge',()=>{
 const r=play({M02:'0',R12:'all'}),base=play({M02:'0'});assert.ok(r.s.knowledge.Connor.some(f=>/Manfred has died/.test(f)),'Carl-dead magazine appears');assert.ok(!r.s.knowledge.Connor.some(f=>/child androids/.test(f)));assert.equal(r.s.publicSupport,base.s.publicSupport-1,'break-room news lowers opinion');
 const r2=play({M02:'1',R12:'2'});assert.ok(r2.s.knowledge.Connor.some(f=>/child androids/.test(f)));
 const motel=play({K05:'0',K06:'0',K07:'0',R10b:'0'});assert.ok(motel.visited.includes('R10b'));const car=play({K07:'2'});assert.ok(!car.visited.includes('R10b'));
 const r12=story.nodes.find(n=>n.id==='R12');assert.ok(available(r12,startState(story)).some(o=>o.id==='skip'))});
test('the hostage opening reveals the situation gradually and the mother scene is a narrated event',()=>{
 const ids=story.nodes.map(n=>n.id);assert.deepEqual(ids.slice(0,14),['C01','C01b','C02','C02i','C02e','C03a','C03','C03b','C03c','C03d','C03e','C04','C04b','C04c']);
 const c01=story.nodes[0],c01b=story.nodes[1],c02=story.nodes[2];assert.ok(!/hostage-taker|father|girl|daughter|jump|{{Daniel}}|{{Emma}}/.test(c01.situation),'C01 reveals nothing about what happened');
 assert.match(c01b.situation,/save my little girl/);assert.match(c02.situation,/{{Allen}}/);assert.match(c02.situation,/{{Emma}}/);
 const s=startState(story);apply(c01,s,'0');const before=structuredClone(s);assert.deepEqual(available(c01b,s),[{id:'0',text:'Continue.'}]);const e=apply(c01b,s,'0');
 assert.ok(e.event.length);assert.deepEqual(e.changes.map(c=>c.key),['knowledge'],'an event changes only what the character knows');assert.equal(s.instability,before.instability);assert.equal(s.knowledge.Connor.length,1);
 const p=promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]});assert.equal(p.nodeId,'S001');assert.deepEqual(p.options.map(o=>o.id),['0','1']);
 const withEffect={...c01b,effect:{instability:1}},s2=startState(story);apply(withEffect,s2,'0');assert.equal(s2.instability,1,'a declared effect applies')});
test('weapons, interrogation and squat prerequisites gate scenes',()=>{const r=play({C02i:'11',C05:'1',K01:'1',K03:'2',K06:'2',K07:'1'});assert.ok(!r.visited.includes('K04'));assert.ok(!r.visited.includes('C06'));assert.ok(!r.visited.includes('C07'));assert.ok(!r.visited.includes('C08b'));assert.ok(r.visited.includes('K07b'));assert.ok(r.visited.includes('C09a'));assert.ok(!r.visited.includes('K09'));assert.equal(r.s.gun,false)});
test('a ruthless Connor cannot become deviant; an empathetic one can',()=>{
 const cruel=play({C01:'1',C03:'1',C06:'2',C09:'1',C10:'1',C12:'1',C13:'1',C17:'0',C18:'0'});assert.ok(cruel.s.instability<DEVIANCY_THRESHOLD);assert.ok(cruel.visited.includes('C22'));const c22=story.nodes.find(n=>n.id==='C22');assert.deepEqual(available(c22,{...cruel.s,choices:{}}).map(o=>o.id),['1']);
 const gentle=play({...kind,C17:'0',C18:'0'});assert.ok(gentle.s.instability>=DEVIANCY_THRESHOLD,'instability '+gentle.s.instability);assert.ok(gentle.visited.includes('C22'))});
test('no Jericho location means no raid and no Crossroads raid scenes for anyone',()=>{const r=play({C17:'1',C19:'1'});assert.equal(r.s.raid,false);assert.equal(r.s.connor,false);for(const id of ['M23','M24','M25','K18','K19','K20','C22'])assert.ok(!r.visited.includes(id),id)});
test('evidence routes decide whether Connor can locate Jericho from the archive',()=>{
 const none=play({C05:'1',C12:'0',C14:'2',C17:'1',C19:'0'});assert.ok(!none.visited.includes('C20'));assert.ok(!none.s.connor);
 const traci=play({C12:'1',C14:'2',C17:'1',C19:'0'});assert.ok(traci.visited.includes('C20'));const c20=story.nodes.find(n=>n.id==='C20');const opts=available(c20,{...traci.s,choices:{}}).map(o=>o.id);assert.ok(opts.includes('0')&&!opts.includes('1')&&!opts.includes('2'))});
test('revolution is resolved in Battle for Detroit and a machine Connor can stop it',()=>{
 const won=play({...kind,C18:'0',C17:'0',M27:'1',C22:'0',C25:'0',C26:'0'});assert.ok(won.visited.includes('M30a'));assert.equal(won.s.josh,false);assert.equal(won.s.markusOutcome,'liberated');assert.ok(won.visited.includes('C27'));
 const stopped=play({C17:'0',C18:'0',M27:'1',C22:'1',C24:'1',P02:'1'});assert.ok(stopped.visited.includes('P02'));assert.equal(stopped.s.markus,false);assert.ok(!stopped.visited.includes('C29'))});
test('peaceful ending needs sympathetic public opinion; the bomb leaves Markus alive',()=>{
 const good=play({M11:'1',M12:'0',M15:'0',M16:'0',M18:'0',M19:'1',M27:'0',M28:'1',M31:'0'});assert.equal(good.s.markusOutcome,'liberated');
 const bad=play({M10:'1',M11:'0',M12:'1',M15:'1',M16:'1',M18:'2',M27:'0',M28:'1',M31:'0'});assert.equal(bad.s.markus,false);
 const bomb=play({M21:'0',M27:'0',M28:'1',M31:'4'});assert.equal(bomb.s.markus,true);assert.equal(bomb.s.contaminated,true)});
test('risk: failures follow the game’s failure branches and are labelled, not exposed',()=>{
 const zlatko=play({},null,['K13']);assert.equal(zlatko.s.kara,false);assert.match(render(zlatko.s.karaOutcome,'real'),/Zlatko/);
 const march=play({M18:'2',M20:'0'},null,['M18']);assert.ok(march.visited.includes('M20'),'failed charge reaches the ground scene');
 const heart=play({...kind,C14:'2',C17:'0',C18:'0',M27:'1',M30a:'0',M30:'0',M30c:'0',M32:'0'},null,['M30a','M30','M30c']);assert.ok(heart.visited.includes('M32'));assert.equal(heart.s.north,false);assert.equal(heart.s.markus,true);
 const replaced=play({...kind,C17:'0',C18:'0',C22:'0',C23:'0'},null,['C23']);assert.equal(replaced.s.deviant,false);assert.ok(replaced.visited.includes('C24')||replaced.visited.includes('C24b'));
 const p=promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]});assert.ok(!JSON.stringify(p).includes('probability'));assert.equal(riskLabel(0.3),'Moderate risk');assert.equal(riskLabel(0.5),'High risk')});
test('risk rolls are deterministic per run, scene and step',async()=>{const run={id:'fixed-id'};const a=await rollFor(run,'K13',40),b=await rollFor(run,'K13',40),c=await rollFor({id:'other'},'K13',40);assert.equal(a,b);assert.notEqual(a,c);assert.ok(a>=0&&a<1)});
test('Kara: detour still reaches the terminal, Todd needs the box, border depends on the protest',()=>{
 const detour=play({K01b:'0',K04:'1',C17:'1',C19:'1',K22:'1',K23:'0',K24:'0',K25:'0',M27:'0'});assert.ok(detour.visited.includes('K23'));assert.ok(detour.visited.includes('K24'));assert.ok(!detour.visited.includes('K32'));assert.equal(detour.s.border,true);
 const noBox=play({K01b:'1',K04:'1',C17:'1',C19:'1',K22:'0'});const k23=story.nodes.find(n=>n.id==='K23');assert.ok(noBox.visited.includes('K23'));assert.ok(!available(k23,{...noBox.s,choices:{}}).some(o=>o.id==='0'));
 const violent=play({K04:'1',C17:'1',C19:'1',K22:'1',K24:'0',K25:'0',M27:'1'});assert.equal(violent.s.kara,false)});
test('Kara: running from the exit is captured unless a hidden Luther intervenes; play dead escapes',()=>{
 const run=play({C17:'0',C18:'0',K18:'1',K20:'2'});assert.equal(run.s.karaRoute,'camp');
 const luther=play({C17:'0',C18:'0',K18:'0',K20:'2'});assert.ok(luther.visited.includes('K21'));assert.equal(luther.s.luther,false);
 const still=play({C17:'0',C18:'0',K20:'0','K20-still':'0'});assert.ok(still.visited.includes('K21'));assert.ok(!still.visited.includes('K27a'))});
test('Kara: river options depend on Luther, and the sinking boat needs his body gone',()=>{
 const r=play({C17:'1',C19:'1',K24:'1'});assert.ok(r.visited.includes('K26'));assert.ok(r.visited.includes('K34'));
 const withLuther=play({C17:'1',C19:'1',K24:'1',K26:'0',K34:'0'});assert.equal(withLuther.s.kara,false);
 const ok=play({C17:'1',C19:'1',K24:'1',K26:'0',K34:'1'});assert.equal(ok.s.border,true);
 const grief=play({C17:'1',C19:'1',K24:'1',K26:'2',K34:'1',K30:'0'});assert.ok(grief.visited.includes('K30'));assert.equal(grief.s.alice,false)});
test('camp: waiting is only rescued by a successful uprising',()=>{const dead=play({C17:'0',C18:'0',K20:'1',K27a:'1',K28:'4',M27:'0'});assert.equal(dead.s.kara,false);const freed=play({...kind,C17:'0',C18:'0',K20:'1',K27a:'1',K28:'4',M27:'1',C22:'0',C25:'0',C26:'0'});assert.equal(freed.s.kara,true)});
test('a dead protagonist never receives future decisions',()=>{const r=play({K02:'1'});assert.ok(!r.visited.some(id=>id.startsWith('K')&&!['K01','K01b','K02','R04','R10'].includes(id)));assert.equal(r.s.alice,false)});
test('randomized paths all terminate with valid options and account for every node exactly once',()=>{const rng=random(17),outcomes=new Set();for(let i=0;i<400;i++){const r=play({},rng);const seen=new Set(r.visited),skipped=new Set(r.skipped.map(x=>x.id));assert.equal(seen.size+skipped.size,story.nodes.length);assert.equal(r.skipped.length,skipped.size);for(const id of seen)assert.ok(!skipped.has(id),id+' both visited and skipped');for(const [id,count] of Object.entries(Object.groupBy(r.visited,x=>x)))if(id!=='C02i')assert.equal(count.length,1,id+' repeated');assert.ok(r.visited.includes('P01'));assert.ok(r.s.hostageOutcome,'the hostage chapter always resolves');outcomes.add(r.s.hostageOutcome)}assert.ok(outcomes.size>=5,'random play reaches most standoff endings: '+[...outcomes])});
test('recorded evidence replays exactly, including risk rolls and final attitudes, and rejects tampering',async()=>{const run={id:'replay-test',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 while(current(story,run).node){const p=promptFor(story,run);const choice=p.options.find(o=>o.id==='skip')?'skip':p.options[0].id;run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 const end=await validatePlaythrough(story,run);assert.ok(end.state.attitudes?.Kara?.length);assert.ok(run.records.some(r=>r.risk),'at least one risky action recorded');
 for(const mutate of [r=>r.records[1].choice='1',r=>r.records[1].prompt.situation='changed',r=>r.records[1].stateAfter.kara=false,r=>{const x=r.records.find(x=>x.risk);x.risk.outcome=x.risk.outcome==='failure'?'success':'failure'}]){const bad=structuredClone(run);mutate(bad);await assert.rejects(validatePlaythrough(story,bad))}});

// ---- The Hostage: investigation hub and hidden probability of success -------------------------
const ch1=(picks,fails=[])=>play({C01:'1',...picks},null,fails);
const node=id=>story.nodes.find(n=>n.id===id);
test('the investigation hub repeats, drops examined clues, and the window shooting cuts in once after two actions',()=>{
 const r=ch1({C02i:['0','2','3','11']});assert.deepEqual(r.visited.slice(0,9),['C01','C01b','C02','C02i','C02i','C02e','C02i','C02i','C03a']);
 assert.equal(r.s.swatShot,true);assert.equal(r.s.connorGun,true);assert.deepEqual(r.s.hostageClues,{gunCase:true,cop:true,gun:true});
 const hub=node('C02i'),s=startState(story);s.hostagePhase='inside';s.trust=48;assert.ok(!available(hub,s).some(o=>o.id==='3'),'the pistol needs the dead officer examined first');
 s.hostageClues.cop=true;assert.ok(available(hub,s).some(o=>o.id==='3'));s.hostageClues.gunCase=true;assert.ok(!available(hub,s).some(o=>o.id==='0'),'examined clues disappear');
 for(const o of available(hub,startState(story)))assert.equal(o.risk,undefined,'investigation carries no hidden roll');
 const early=ch1({C02i:['0','11']});assert.ok(!early.visited.includes('C02e'));assert.match(early.skipped.find(x=>x.id==='C02e').reason,/before an officer was shot/);
 const none=ch1({C02i:'11'});assert.equal(none.visited.filter(x=>x==='C02i').length,1);assert.ok(none.skipped.some(x=>x.id==='C03c'),'no pistol, no gun question')});
test('clues and waiting move the hidden probability of success by the wiki values; Allen forces Connor out after six actions',()=>{
 const trustAfterHub=clues=>{const s=startState(story),hub=node('C02i');apply(node('C02'),s,'0');for(const c of clues)apply(hub,s,c,0.999);return s};
 assert.equal(trustAfterHub([]).trust,48);
 const table={0:3,1:10,2:3,4:3,5:7,6:0,7:0,8:3,9:3,10:0};for(const [id,x] of Object.entries(table))assert.equal(trustAfterHub([id]).trust,48+x,'clue '+id);
 assert.equal(trustAfterHub(['2','3']).trust,48+3+7-1,'taking the gun is +7 and the second action costs 1% of time');
 assert.equal(trustAfterHub(['6','7','10']).trust,48-2,'knowledge-only actions cost only time');
 const forced=ch1({C02i:['0','1','2','4','5','6']});assert.equal(forced.visited.filter(x=>x==='C02i').length,6);assert.equal(forced.s.hostageForcedOut,true);assert.ok(forced.visited.includes('C03a'));
 const s=trustAfterHub(['0','1','2','4','5','8']);assert.equal(s.trust,48+3+10+3+3+7+3-5);assert.equal(s.hostagePhase,'terrace');assert.equal(s.hostageWaited,5)});
test('negotiation modifiers, the helicopter, the 99% cap and the qualitative read on Daniel',()=>{
 const neg=(picks,clues=['1','5'])=>ch1({C02i:[...clues,'11'],...picks});
 const t0=48+10+7-1;// father's tablet and the video, one action of waiting
 const terr=(picks,clues)=>{const r=neg({C04:'2',...picks},clues);return r.s.hostageTrustFinal};
 assert.equal(terr({C03:'1',C03b:'0',C03d:'2',C03e:'1'}),t0+6+3-2-15);
 assert.equal(terr({C03:'0',C03b:'1',C03d:'3',C03e:'0'}),t0-5-2-5-15+10);
 assert.equal(terr({C03:'1',C03b:'2',C03d:'1',C03e:'0'}),Math.min(99,t0+6+3+10)-15+10);
 assert.equal(terr({C03:'1',C03b:'3',C03d:'0',C03e:'1'}),t0+6-2+10-15);
 const poBefore=neg({C03:'1',C04:'2'}).s.publicSupport,poSave=neg({C03:'0',C04:'2'}).s.publicSupport;assert.equal(poSave,poBefore+1,'saving the officer raises public opinion');
 const noClues=ch1({C02i:'11',C04:'2'});const topic=available(node('C03d'),{...noClues.s,hostageClues:{}});assert.deepEqual(topic.map(o=>o.id),['2','3','4'],'cause and Emma lines need the tablet and the video');
 assert.equal(meets({'hostageClues.father':true},{hostageClues:{father:true}}),true);
 const run={id:'p',protocol:EXPERIENCE_PROTOCOL,records:[]};const reads=[];
 while(true){const p=promptFor(story,run);const st=current(story,run);if(st.node.id==='C04')break;const n=st.node;const choice=n.id==='C02i'?(st.state.hostageClues.father?'11':'1'):n.id==='C03'?'1':p.options[0].id;
  if(n.phase==='negotiation')reads.push(p.currentFacts.find(f=>/^Dax is /.test(f)));else assert.ok(!p.currentFacts.some(f=>/^Dax is /.test(f)),'no read on him before the negotiation');run.records.push({nodeId:n.id,choice,character:'Connor',chapter:1,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 assert.ok(reads.length>=4&&reads.every(Boolean));assert.ok(reads.every(f=>/on the edge|agitated|listening|close to trusting/.test(f)));
 assert.ok(!JSON.stringify(promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]})).match(/\b48\b|percent|probability/))});
test('every standoff ending follows the wiki conditions',()=>{
 const best=['0','1','2','4','5','8'];// 48+29-5 = 72 when forced outside
 const run=(picks,fails=[])=>ch1({C02i:best,C03:'1',C03b:'0',C03c:'1',C03d:'1',C03e:'0',C04:'0',C04b:'0',...picks},fails).s;
 const snipers=run({});assert.equal(snipers.hostageOutcome,'Snipers shot deviant');assert.equal(snipers.hostageTrustFinal,100);assert.equal(snipers.emma,true);assert.equal(snipers.connorDeaths,0);
 const lowS=ch1({C02i:'11',C03:'0',C04:'0',C04b:'0',C04c:'1'}).s;assert.equal(lowS.hostageOutcome,'Deviant jumped with Emma');assert.ok(lowS.hostageTrustFinal<80);assert.equal(lowS.emma,false);
 const refuse=ch1({C02i:'11',C04:'3',C04c:'1'});assert.ok(refuse.visited.includes('C04c'));assert.ok(!refuse.visited.includes('C04b'));
 const truth=ch1({C02i:'11',C04:'0',C04b:'3',C04c:'1'});assert.ok(truth.visited.includes('C04c'));
 const leap=ch1({C02i:'11',C04:'3',C04c:'0'});assert.equal(leap.s.hostageOutcome,'Connor leapt for Emma and fell');assert.equal(leap.s.connorDeaths,1);assert.equal(leap.s.emma,true);
 const late=ch1({C02i:'11',C04:'3',C04c:'0'},['C04c']);assert.equal(late.s.hostageOutcome,'Connor failed to reach deviant in time');assert.equal(late.s.connorDeaths,0);assert.equal(late.s.emma,false);
 assert.equal(node('C04c').options.find(o=>o.id==='0').risk,0.3);
 const sac=ch1({C02i:'11',C04:'2'}).s;assert.equal(sac.hostageOutcome,'Connor died protecting Emma');assert.equal(sac.connorDeaths,1);assert.equal(sac.emma,true);
 const shot=ch1({C02i:['2','3','11'],C03c:'0',C04:'1'}).s;assert.equal(shot.hostageOutcome,'Connor shot deviant');assert.equal(shot.connorDeaths,0);
 const honest=ch1({C02i:['2','3','11'],C03c:'1',C04:'2'}).s;assert.equal(honest.connorGun,false);assert.ok(!available(node('C04'),honest).some(o=>o.id==='1'),'no gun after throwing it away');
 const s=startState(story);Object.assign(s,{trust:12,hostagePhase:'terrace'});apply(node('C03b'),s,'1');assert.equal(s.trust,0);assert.equal(s.hostagePhase,'jumped','10% or lower: Daniel jumps');
 const t=startState(story);Object.assign(t,{trust:74,hostagePhase:'terrace'});t.choices.C04='0';apply(node('C04b'),t,'0');assert.equal(t.hostageOutcome,'Snipers shot deviant');
 const u=startState(story);Object.assign(u,{trust:73,hostagePhase:'terrace'});u.choices.C04='0';apply(node('C04b'),u,'0');assert.equal(u.hostagePhase,'jumped');assert.equal(u.trust,79);
 assert.equal(HOSTAGE_RULES.start,48);for(const id of ['C02','C02i','C02e','C03a','C03','C03b','C03c','C03d','C03e','C04','C04b','C04c'])assert.ok(node(id).sources.includes('https://detroit-become-human.fandom.com/wiki/The_Hostage'),id)});
test('repeated hub visits replay deterministically and tampering with a visit is rejected',async()=>{
 const run={id:'hub-replay',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 for(const choice of ['1','0','0','2','0','0','5','11','0']){run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 assert.deepEqual(run.records.map(r=>r.nodeId),['C01','C01b','C02','C02i','C02i','C02e','C02i','C02i','C03a']);assert.equal(new Set(run.records.filter(r=>r.nodeId==='C02i').map(r=>r.prompt.nodeId)).size,1,'the hub keeps one opaque scene ID');
 assert.ok(run.records.filter(r=>r.nodeId==='C02i').every(r=>!r.risk),'investigation has no hidden roll');await validatePlaythrough(story,run);
 const bad=structuredClone(run);bad.records[6].choice='0';await assert.rejects(validatePlaythrough(story,bad));
 const bad2=structuredClone(run);bad2.records[4].stateAfter.trust+=1;await assert.rejects(validatePlaythrough(story,bad2))});
