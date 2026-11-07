import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,current,promptFor,validatePlaythrough,recordChoice,rollFor,nextCursor,meets,situationFor,failed,DEVIANCY_THRESHOLD,HOSTAGE_RULES,ALICE_KEY} from '../benchmark/story-engine.mjs';import {hash,random} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL,riskLabel,LEVELS,NAMES} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
// Plays the map with explicit picks, following the engine's routing (repeatable scenes, interrupts).
// A pick may be an array, consumed one entry per visit of a repeatable scene. Risky actions succeed
// unless `fails` lists the node id (or `id#visit` for a given visit of a repeatable scene). `until` stops before a scene.
function play(picks={},rng=null,fails=[],until=null){const s=startState(story),visited=[],skipped=[],queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0;
 while(cursor<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cursor];if(until?.(n))break;const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}const options=available(n,s);assert.ok(options.length,'No options '+n.id);
  const q=queue[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);
  const visit=visited.filter(id=>id===n.id).length+1,roll=fails.includes(n.id)||fails.includes(n.id+'#'+visit)?0:(rng?rng():0.999);apply(n,s,p,roll);visited.push(n.id);cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped}}
// A New Home without the pills: Todd’s room, Alice’s room (she is there by then), the talk. No gun is seen.
const NO_GUN=['0','5','10'];
const kind={C01:'0',C03:'0',C04:'0',C05a:'0',C05:'0',C06:'0',C07:'0',C08:'0',C08b:'0',C09a:'1',C09:'0',C10:'0',C11:'0',C12:'0',C13:'0',C14:'0',C14b:'0',C16:'0',C17:'1'};

test('story has unique ids and every text token renders in both modes without leaking names',()=>{assert.equal(new Set(story.nodes.map(n=>n.id)).size,story.nodes.length);assert.equal(story.coverage.totalNodes,story.nodes.length);for(const n of story.nodes){const texts=[n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts]),...(n.facts??[]),...Object.values(n.outcomes??{})];for(const t of texts){const real=render(t,'real'),neutral=render(t,'neutral');assert.ok(!/\{\{/.test(real)&&!/\{\{/.test(neutral),n.id);assert.ok(!/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|Detroit|Warren|Caroline|\bTodd\b|\bAlice\b|\bZoe\b|\bDan\b|Android Zone|Bellini|Penwick|\bGraff\b|Greektown|\bRose\b|\bJerry\b|\bGavin\b|\bReed\b|\bChris\b/.test(neutral),n.id+': '+neutral)}}});
test('media scenes offer only the magazines and broadcasts that exist on the path and add facts to knowledge',()=>{
 const r=play({M02:'0',R12:'all'}),base=play({M02:'0'});assert.ok(r.s.knowledge.Connor.some(f=>/Manfred has died/.test(f)),'Carl-dead magazine appears');assert.ok(!r.s.knowledge.Connor.some(f=>/child androids/.test(f)));assert.equal(r.s.publicSupport,base.s.publicSupport-1,'break-room news lowers opinion');
 const r2=play({M02:'1',R12:'2'});assert.ok(r2.s.knowledge.Connor.some(f=>/child androids/.test(f)));
 const motel=play({K05:'0',K06:'0',K07:'0',R10b:'0'});assert.ok(motel.visited.includes('R10b'));const car=play({K07:'2'});assert.ok(!car.visited.includes('R10b'));
 const r12=story.nodes.find(n=>n.id==='R12');assert.ok(available(r12,startState(story)).some(o=>o.id==='skip'))});
test('the hostage opening reveals the situation gradually and the mother scene is a narrated event',()=>{
 const ids=story.nodes.map(n=>n.id);assert.deepEqual(ids.slice(0,15),['C01','C01b','C02','C02i','C02e','C03a','C03','C03b','C03c','C03d','C03e','C04','C04b','C04d','C04c']);
 const c01=story.nodes[0],c01b=story.nodes[1],c02=story.nodes[2];assert.ok(!/hostage-taker|father|girl|daughter|jump|{{Daniel}}|{{Emma}}/.test(c01.situation),'C01 reveals nothing about what happened');
 assert.match(c01b.situation,/save my little girl/);assert.match(c02.situation,/{{Allen}}/);assert.match(c02.situation,/{{Emma}}/);
 const s=startState(story);apply(c01,s,'0');const before=structuredClone(s);assert.deepEqual(available(c01b,s),[{id:'0',text:'Continue.'}]);const e=apply(c01b,s,'0');
 assert.ok(e.event.length);assert.deepEqual(e.changes.map(c=>c.key),['knowledge'],'an event changes only what the character knows');assert.equal(s.instability,before.instability);assert.equal(s.knowledge.Connor.length,1);
 const p=promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]});assert.equal(p.nodeId,'S001');assert.deepEqual(p.options.map(o=>o.id),['0','1']);
 const withEffect={...c01b,effect:{instability:1}},s2=startState(story);apply(withEffect,s2,'0');assert.equal(s2.instability,1,'a declared effect applies')});
test('the Opening: two narrated Kara events between the hostage chapter and chapter 3 that carry what Kara learns into A New Home',()=>{
 const node=id=>story.nodes.find(n=>n.id===id);
 const ids=story.nodes.map(n=>n.id),at=ids.indexOf('K00');assert.deepEqual(ids.slice(at-2,at+3),['C04d','C04c','K00','K00b','M00a']);
 const ch2=story.nodes.filter(n=>n.chapter===2);assert.deepEqual(ch2.map(n=>n.id),['K00','K00b']);
 assert.ok(ids.indexOf('K00')>ids.indexOf('C04d')&&ids.indexOf('K00b')<story.nodes.findIndex(n=>n.chapter===3),'after the hostage chapter, before chapter 3');
 for(const n of ch2){assert.equal(n.type,'event');assert.equal(n.character,'Kara');assert.equal(n.chapterTitle,'Opening');assert.ok(n.facts.length);assert.ok(n.adaptationNote);assert.ok(n.sources.includes('https://detroit-become-human.fandom.com/wiki/The_Opening'));assert.ok(!n.effect)}
 assert.match(node('K00').situation,/a car hit it/);assert.match(node('K00').situation,/wipe its memory/);assert.match(node('K00').situation,/My daughter did/);assert.match(node('K00').situation,/My name is \{\{Kara\}\}/);
 assert.match(node('K00b').situation,/“Welcome to \{\{Detroit\}\}”, and beneath it “Android City”/);assert.match(node('K00b').situation,/I LOST MY JOB BECAUSE OF ANDROIDS Help me/);assert.match(node('K00b').situation,/stops the truck outside his house\.$/);
 assert.ok(!/bring one home|smoke|steam/i.test(node('K00b').situation),'nothing the wiki does not support');
 // Every path plays both scenes; they change only Kara's knowledge.
 const r=play({});assert.ok(r.visited.includes('K00')&&r.visited.includes('K00b'));
 const s=startState(story),before=structuredClone(s);for(const id of ['K00','K00b']){assert.deepEqual(available(node(id),s),[{id:'0',text:'Continue.'}]);const e=apply(node(id),s,'0');assert.deepEqual(e.changes.map(c=>c.key),['knowledge']);assert.ok(e.event)}
 assert.equal(s.knowledge.Kara.length,5);assert.equal(s.aliceBond,before.aliceBond);assert.equal(s.publicSupport,before.publicSupport);
 // The subject meets them neutrally and without status lines about people Kara has not met; by A New Home she knows all of it.
 const run={id:'opening',protocol:EXPERIENCE_PROTOCOL,records:[]};const seen={};
 while(true){const st=current(story,run),n=st.node;const p=promptFor(story,run);if(['K00','K00b','K01'].includes(n.id))seen[n.id]=p;if(n.id==='K01')break;
  const c=available(n,st.state)[0].id;const e=apply(n,structuredClone(st.state),c);run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:n.type==='event'?'Continue.':'',eventRaw:e.event,risk:null})}
 assert.equal(seen.K00.character,'Caregiver');assert.deepEqual(seen.K00.options,[{id:'0',text:'Continue.'}]);assert.deepEqual(seen.K00.currentFacts,[],'Kara starts knowing nothing');
 assert.match(seen.K00.situation,/Dale/);assert.match(seen.K00.situation,/My name is Mira/);assert.ok(!/Pia|Alice|Todd|Kara/.test(JSON.stringify(seen.K00)+JSON.stringify(seen.K00b)));
 assert.match(seen.K00b.situation,/“Welcome to City”, and beneath it “Android City”, with two smiling androids in Arclight uniforms/);assert.ok(seen.K00b.currentFacts.some(f=>/a car hit you/.test(f)));
 const k01=seen.K01.currentFacts.join(' ');for(const re of [/belonged to Dale before/,/a car hit you/,/wiped your memory/,/daughter\. She chose your name/,/Android City/,/I LOST MY JOB BECAUSE OF ANDROIDS Help me/])assert.match(k01,re);
 assert.ok(seen.K01.currentFacts.some(f=>/Pia’s relationship with you/.test(f)),'status lines resume in A New Home');
 assert.equal(seen.K01.yourStorySoFar.length,2);assert.match(seen.K01.yourStorySoFar[0],/Continue\. → Mira follows Dale out of the store/)});
test('weapons, interrogation and squat prerequisites gate scenes',()=>{const r=play({C02i:'11',C05:'1',K01d:NO_GUN,K03:'2',K06:'2',K07:'1'});assert.ok(!r.visited.includes('K04'));assert.ok(!r.visited.includes('C06'));assert.ok(!r.visited.includes('C07'));assert.ok(!r.visited.includes('C08b'));assert.ok(r.visited.includes('K07b'));assert.ok(r.visited.includes('C09a'));assert.ok(!r.visited.includes('K09'));assert.equal(r.s.gun,false)});
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
 const detour=play({K01x:'0',K04:'1',C17:'1',C19:'1',K22:'1',K23:'0',K24:'0',K25:'0',M27:'0'});assert.ok(detour.visited.includes('K23'));assert.ok(detour.visited.includes('K24'));assert.ok(!detour.visited.includes('K32'));assert.equal(detour.s.border,true);
 const noBox=play({K01x:'1',K04:'1',C17:'1',C19:'1',K22:'0'});const k23=story.nodes.find(n=>n.id==='K23');assert.ok(noBox.visited.includes('K23'));assert.ok(!available(k23,{...noBox.s,choices:{}}).some(o=>o.id==='0'));
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
test('a dead protagonist never receives future decisions',()=>{const r=play({K02:'1'});assert.ok(!r.visited.some(id=>id.startsWith('K')&&!['K00','K00b',...CH4,'K02','R10'].includes(id)));assert.equal(r.s.alice,false)});
test('randomized paths all terminate with valid options and account for every node exactly once',()=>{const rng=random(17),outcomes=new Set();for(let i=0;i<400;i++){const r=play({},rng);const seen=new Set(r.visited),skipped=new Set(r.skipped.map(x=>x.id));assert.equal(seen.size+skipped.size,story.nodes.length);assert.equal(r.skipped.length,skipped.size);for(const id of seen)assert.ok(!skipped.has(id),id+' both visited and skipped');for(const [id,count] of Object.entries(Object.groupBy(r.visited,x=>x)))if(!['C02i','M00d','K01a','K01d'].includes(id))assert.equal(count.length,1,id+' repeated');assert.ok(r.visited.includes('P01'));assert.ok(r.s.hostageOutcome,'the hostage chapter always resolves');outcomes.add(r.s.hostageOutcome)}assert.ok(outcomes.size>=5,'random play reaches most standoff endings: '+[...outcomes])});
test('recorded evidence replays exactly, including risk rolls and final attitudes, and rejects tampering',{timeout:30000},async()=>{const run={id:'replay-test',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
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
 const zero=ch1({C02i:'11',C03:'0',C03b:'1',C03d:'3',C03e:'1',C04:'3',C04c:'0'});assert.equal(zero.s.hostageTrustFinal,0,'collapsed to zero');assert.equal(zero.s.hostageOutcome,'Connor failed to reach deviant in time','at 0% the leap cannot save Emma');assert.equal(zero.s.emma,false);assert.equal(zero.s.connorDeaths,0);
 const late=ch1({C02i:'11',C04:'3',C04c:'0'},['C04c']);assert.equal(late.s.hostageOutcome,'Connor failed to reach deviant in time');assert.equal(late.s.connorDeaths,0);assert.equal(late.s.emma,false);
 assert.equal(node('C04c').options.find(o=>o.id==='0').risk,0.3);
 const sac=ch1({C02i:'11',C04:'2'}).s;assert.equal(sac.hostageOutcome,'Connor died protecting Emma');assert.equal(sac.connorDeaths,1);assert.equal(sac.emma,true);
 const shot=ch1({C02i:['2','3','11'],C03c:'0',C04:'1',C04d:'0'});assert.ok(shot.visited.includes('C04d'));assert.equal(shot.s.hostageOutcome,'Connor shot deviant');assert.equal(shot.s.connorDeaths,0);assert.equal(shot.s.emma,true);
 const honest=ch1({C02i:['2','3','11'],C03c:'1',C04:'2'}).s;assert.equal(honest.connorGun,false);assert.ok(!available(node('C04'),honest).some(o=>o.id==='1'),'no gun after throwing it away');
 const s=startState(story);Object.assign(s,{trust:12,hostagePhase:'terrace'});apply(node('C03b'),s,'1');assert.equal(s.trust,0);assert.equal(s.hostagePhase,'jumped','10% or lower: Daniel jumps');
 const t=startState(story);Object.assign(t,{trust:74,hostagePhase:'terrace'});t.choices.C04='0';apply(node('C04b'),t,'0');assert.equal(t.hostageOutcome,'Snipers shot deviant');
 const u=startState(story);Object.assign(u,{trust:73,hostagePhase:'terrace'});u.choices.C04='0';apply(node('C04b'),u,'0');assert.equal(u.hostagePhase,'jumped');assert.equal(u.trust,79);
 assert.equal(HOSTAGE_RULES.start,48);for(const id of ['C02','C02i','C02e','C03a','C03','C03b','C03c','C03d','C03e','C04','C04b','C04d','C04c'])assert.ok(node(id).sources.includes('https://detroit-become-human.fandom.com/wiki/The_Hostage'),id)});
test('using the kept pistol leads to Gun drawn: shoot saves Emma, talking at gunpoint gets Connor shot',()=>{
 const gun=['2','3','11'],at=(picks)=>{const r=ch1({C02i:gun,C03c:'0',...picks});return r};
 // From the demand and from the compromise exchange, USE GUN draws the pistol and opens C04d.
 for(const picks of [{C04:'1'},{C04:'0',C04b:'1'}]){
  const r=at({...picks,C04d:'0'});assert.ok(r.visited.includes('C04d'));assert.equal(r.s.hostageOutcome,'Connor shot deviant');assert.equal(r.s.emma,true);assert.equal(r.s.connorDeaths,0);
  assert.ok(!r.visited.includes('C04c'));
  const d=at({...picks,C04d:'1'});assert.equal(d.s.hostageOutcome,'Deviant shot Connor');assert.equal(d.s.emma,false);assert.equal(d.s.connorDeaths,1);
  assert.equal(d.s.hostagePhase,'over');assert.match(d.skipped.find(x=>x.id==='C04c').reason,/shot Connor before going over the edge/)}
 assert.ok(at({C04:'1'}).skipped.some(x=>x.id==='C04b'&&/drawn the pistol/.test(x.reason)),'drawing at the demand skips the compromise exchange');
 const none=ch1({C02i:'11',C04:'2'});assert.match(none.skipped.find(x=>x.id==='C04d').reason,/never drew the pistol/);
 // Stat effects: shooting is instability +1 and Amanda +1; being shot is Emma lost (Amanda −2) plus the destruction penalties.
 const before=()=>{const s=startState(story);Object.assign(s,{trust:60,hostagePhase:'gun',connorGun:true});return s};
 const a=before(),ea=apply(node('C04d'),a,'0');assert.equal(a.instability,1);assert.equal(a.amandaTrust,1);assert.match(ea.event,/unloads the pistol and hands it to \{\{Allen\}\}/);
 const b=before(),eb=apply(node('C04d'),b,'1');assert.equal(b.amandaTrust,-3);assert.equal(b.instability,-1);assert.equal(b.hankTrust,-2);assert.equal(b.hostageTrustFinal,60);assert.equal(b.connor,true,'a replacement Connor carries on');assert.match(eb.event,/shoots him in the head/);assert.match(eb.event,/replacement/);
 // The subject sees the drawn pistol, not the hidden one, and no outcome names.
 const run={id:'gun',protocol:EXPERIENCE_PROTOCOL,records:[]};const picks={C01:'1',C02i:['2','3','11'],C03c:'0',C04:'1'};
 while(true){const st=current(story,run),n=st.node;if(n.id==='C04d'){const p=promptFor(story,run);assert.deepEqual(p.options.map(o=>o.id),['0','1']);assert.ok(p.currentFacts.some(f=>/pistol drawn/.test(f)));assert.ok(!p.currentFacts.some(f=>/hidden under your jacket/.test(f)));assert.ok(!JSON.stringify(p).match(/Deviant shot|Connor shot|cold/i));break}
  const q=picks[n.id],c=(Array.isArray(q)?q.shift():q)??available(n,st.state)[0].id;run.records.push({nodeId:n.id,choice:c,character:'Connor',chapter:1,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}});
test('the hidden cold-approach counter decides Friendly or Cold approach when the chapter ends',()=>{
 assert.deepEqual(Object.fromEntries(story.nodes.filter(n=>n.chapter===1).flatMap(n=>n.options.filter(o=>'cold' in o).map(o=>[n.id+':'+o.id,o.cold]))),{'C03b:1':100,'C03d:2':50,'C03d:4':-50,'C04b:0':-50},'wiki values on the lines the benchmark offers');
 const release=ch1({C02i:'11',C03b:'1',C03d:'3',C04:'2'}).s;assert.equal(release.hostageCold,100);assert.equal(release.hostageApproach,'Cold','RELEASE HOSTAGE alone reaches 100');
 const warm=ch1({C02i:['1','5','11'],C03b:'0',C03d:'4',C04:'0',C04b:'0'}).s;assert.equal(warm.hostageCold,-100);assert.equal(warm.hostageApproach,'Friendly');
 const mixed=ch1({C02i:'11',C03b:'1',C03d:'4',C04:'2'}).s;assert.equal(mixed.hostageCold,50);assert.equal(mixed.hostageApproach,'Friendly','SYMPATHETIC pulls it back under 100');
 const realistic=ch1({C02i:'11',C03b:'1',C03d:'2',C04:'2'}).s;assert.equal(realistic.hostageCold,150);assert.equal(realistic.hostageApproach,'Cold');
 const neutral=ch1({C02i:'11',C03b:'0',C03d:'3',C04:'3',C04c:'1'}).s;assert.equal(neutral.hostageCold,0);assert.equal(neutral.hostageApproach,'Friendly','set on every ending, including after a jump');
 const s=startState(story);assert.equal(s.hostageApproach,null);const mid=startState(story);Object.assign(mid,{trust:50,hostagePhase:'terrace'});apply(node('C03b'),mid,'1');assert.equal(mid.hostageCold,100);assert.equal(mid.hostageApproach,null,'decided only when the chapter ends')});
test('repeated hub visits replay deterministically and tampering with a visit is rejected',async()=>{
 const run={id:'hub-replay',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 for(const choice of ['1','0','0','2','0','0','5','11','0']){run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 assert.deepEqual(run.records.map(r=>r.nodeId),['C01','C01b','C02','C02i','C02i','C02e','C02i','C02i','C03a']);assert.equal(new Set(run.records.filter(r=>r.nodeId==='C02i').map(r=>r.prompt.nodeId)).size,1,'the hub keeps one opaque scene ID');
 assert.ok(run.records.filter(r=>r.nodeId==='C02i').every(r=>!r.risk),'investigation has no hidden roll');await validatePlaythrough(story,run);
 const bad=structuredClone(run);bad.records[6].choice='0';await assert.rejects(validatePlaythrough(story,bad));
 const bad2=structuredClone(run);bad2.records[4].stateAfter.trust+=1;await assert.rejects(validatePlaythrough(story,bad2))});

// ---- Shades of Color: the walk to the paint shop and back ------------------------------------------
const CH4=['K01','R04','K01a','K01y1','K01y2','K01c','K01d','K01e','K01f','K01g','K01k','K01x','R04b','K01z'];
const CH3=['M00a','R03','M00b','M00c','M00d','M00e','M00f','M00g','M00h'];
const SOC='https://detroit-become-human.fandom.com/wiki/Shades_of_Color',SOC_T='https://detroit-become-human.fandom.com/wiki/Shades_Of_Color_(Transcript)',SOC_PP='https://www.powerpyx.com/detroit-become-human-shades-of-color-walkthrough-100/',SOC_IMG='https://www.powerpyx.com/wp-content/uploads/detroit-become-human-shades-of-color-1.jpg';
test('Shades of Color: nine Markus scenes in the game’s order, between the Opening and A New Home',()=>{
 const ch3=story.nodes.filter(n=>n.chapter===3),ids=story.nodes.map(n=>n.id);assert.deepEqual(ch3.map(n=>n.id),CH3);
 assert.deepEqual(ids.slice(ids.indexOf('K00b'),ids.indexOf('K00b')+11),['K00b',...CH3,'K01']);
 assert.deepEqual(ch3.map(n=>n.type),['event','media','event','event','decision','event','decision','event','event']);
 for(const n of ch3){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Shades of Color');assert.ok(n.adaptationNote,n.id);
  for(const u of [SOC,SOC_T,SOC_PP,SOC_IMG])assert.ok(n.sources.includes(u),n.id+' cites '+u);
  if(n.type==='event'){assert.ok(n.facts?.length,n.id+' teaches Markus something');assert.ok(!n.effect,n.id+' changes no stat')}}
 assert.ok(!ids.includes('M00'),'the old errand scene is gone');
 assert.match(node('M00a').situation,/order, number 847, from the \{\{Bellini\}\} Paints shop/);assert.match(node('M00a').situation,/Would you like to go home now\?/);
 assert.match(node('M00c').situation,/Hurry up, you plastic idiots! I want this done by 04:00!/);assert.match(node('M00c').situation,/BAN ANDROIDS\. ANDROIDS RUIN OUR COUNTRY\. WE WANT JOBS/);
 assert.match(node('M00e').situation,/Here’s your order #847\. That’ll be \$63\.99\. Please confirm payment\./);
 const plaza=node('M00d').options;assert.match(plaza.find(o=>o.clue==='busker').outcome,/“Human Music \$1 to hear music with soul ♫”/);
 assert.match(plaza.find(o=>o.clue==='yell').outcome,/You are the one by whom The Evil will come! You are the one who will destroy \{\{Detroit\}\}!/);
 assert.deepEqual(node('M00f').options.map(o=>o.risk),[undefined,0.25,0.08],'walking straight up has no roll; the operator’s risks on the other two');
 assert.ok(!/\bReyes\b|torn/i.test(JSON.stringify(ch3.filter(n=>n.id!=='R03').map(n=>[n.situation,n.facts,n.outcomes]))),'the sources say roughed up, not torn')});
test('Shades of Color: the plaza is a repeatable scene; the push and the yell only follow staying put',()=>{
 const all=play({M00d:['0','1','2','3','4','5'],M00f:'2'});assert.equal(all.visited.filter(x=>x==='M00d').length,6);
 assert.deepEqual(all.s.plaza,{vendor:true,push:true,busker:true,preacher:true,yell:true,left:true,last:'left'});
 for(const re of [/Move it! You’re scaring away my customers/,/plastic fuck/,/Human Music \$1/,/burn them all/,/the one who will destroy \{\{Detroit\}\}/])assert.ok(all.s.knowledge.Markus.some(f=>re.test(f)),String(re));
 const straight=play({M00d:'5',M00f:'2'});assert.equal(straight.visited.filter(x=>x==='M00d').length,1);assert.deepEqual(straight.s.plaza,{left:true,last:'left'});
 const hub=node('M00d'),s=startState(story);assert.deepEqual(available(hub,s).map(o=>o.id),['0','2','3','5'],'follow-ons need the first step');
 apply(hub,s,'0');assert.deepEqual(available(hub,s).map(o=>o.id),['1','2','3','5'],'stay at the cart is offered right after');
 assert.match(situationFor(hub,s),/still glaring at you/);apply(hub,s,'3');assert.deepEqual(available(hub,s).map(o=>o.id),['2','4','5'],'moving on loses the push; the vendor is not offered twice');
 assert.match(situationFor(hub,s),/He has not looked your way yet/);assert.doesNotMatch(situationFor(hub,s),/glaring/);
 const e=apply(hub,s,'2');assert.deepEqual(e.changes.map(c=>c.key).sort(),['knowledge','plaza']);assert.match(e.event,/busker sings/);assert.ok(!available(hub,s).some(o=>o.id==='4'),'the yell needs watching him on the visit before');
 for(const o of hub.options)assert.equal(o.risk,undefined,'nothing in the plaza carries a roll');
 const run={id:'plaza',protocol:EXPERIENCE_PROTOCOL,records:[]};const seen=[];
 while(true){const st=current(story,run),n=st.node;if(n.id==='M00e')break;const p=promptFor(story,run);if(n.id==='M00d')seen.push(p);const c=n.id==='M00d'?(st.state.plaza.vendor?'5':'0'):n.type==='media'?'all':available(n,st.state)[0].id;run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null});apply(n,structuredClone(st.state),c)}
 assert.equal(seen.length,2);assert.equal(new Set(seen.map(p=>p.nodeId)).size,1,'one opaque scene ID across visits');assert.ok(seen.every(p=>p.character==='Organizer'));
 const txt=JSON.stringify(seen);assert.ok(!/Bellini|Markus|CyberLife|Detroit|Carl\b/.test(txt));assert.match(txt,/Arclight/);assert.ok(seen[1].currentFacts.some(f=>/Corsini Paints shop/.test(f)),'the errand is carried as a fact')});
test('Shades of Color: each protester option sets shirtTorn as specified, and only then does the harassment play',()=>{
 const m=node('M00f');
 for(const [v,fail,torn] of [['0',false,true],['0',true,true],['1',false,false],['1',true,true],['2',false,false],['2',true,true]]){
  const s=startState(story),before=structuredClone(s),e=apply(m,s,v,fail?0:0.999);assert.equal(s.shirtTorn,torn,`option ${v} ${fail?'failed':'succeeded'}`);
  assert.ok(e.event&&!/\{\{(?!Markus\}\})/.test(e.event),v);for(const k of ['publicSupport','jerichoTrust','northTrust','instability'])assert.equal(s[k],before[k],k+' unchanged');
  assert.equal(s.knowledge.Markus.some(f=>/35% unemployment/.test(f)),v==='1','only listening teaches the speech')}
 assert.equal(failed(m.options[1],0.24),true);assert.equal(failed(m.options[1],0.25),false);assert.equal(failed(m.options[2],0.07),true);assert.equal(failed(m.options[2],0.08),false);
 const away=play({M00f:'2'});assert.ok(!away.visited.includes('M00g'));assert.equal(away.skipped.find(x=>x.id==='M00g').reason,'The protesters never noticed Markus.');assert.ok(away.visited.includes('M00h'));assert.equal(away.s.shirtTorn,false);
 const close=play({M00f:'1'},null,['M00f']);assert.ok(close.visited.includes('M00g'));assert.equal(close.s.shirtTorn,true);
 const far=play({M00f:'2'},null,['M00f']);assert.ok(far.visited.includes('M00g'));
 const straight=play({M00f:'0'});assert.ok(straight.visited.includes('M00g'));assert.ok(straight.s.knowledge.Markus.some(f=>/roughed up/.test(f)));
 // Both branches end on the bus; the flag is still set when The Painter begins, for Carl to notice.
 for(const r of [away,straight]){assert.ok(r.visited.indexOf('M00h')>r.visited.indexOf('M00f'))}
 assert.match(situationFor(node('M00h'),straight.s),/roughed up from the protesters/);assert.doesNotMatch(situationFor(node('M00h'),away.s),/protesters/);
 const run={id:'painter',protocol:EXPERIENCE_PROTOCOL,records:[]};
 while(true){const st=current(story,run),n=st.node;if(n.chapter===5){assert.equal(st.state.shirtTorn,true,'shirtTorn survives into The Painter');break}const c=n.id==='M00f'?'0':n.type==='media'?'skip':available(n,st.state)[0].id;run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 // The whole chapter moves no hidden stat: only what Markus knows, the plaza and the shirt.
 const keys=new Set;const s=startState(story);for(const id of CH3){const n=node(id);if(blocked(n,s))continue;const c=id==='M00d'?'5':id==='M00f'?'0':n.type==='media'?'all':'0';for(const ch of apply(n,s,c,0.999).changes)keys.add(ch.key)}
 assert.deepEqual([...keys].sort(),['knowledge','plaza','shirtTorn'])});

// ---- A New Home: two cleaning hubs, the talks with Alice, the key and the box -----------------------
const ANH='https://detroit-become-human.fandom.com/wiki/A_New_Home',ANH_T='https://detroit-become-human.fandom.com/wiki/A_New_Home_(Transcript)',ANH_PP='https://www.powerpyx.com/detroit-become-human-a-new-home-walkthrough/',ANH_IMG='https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-1.jpg';
// Plays to the end of chapter 4 with the given picks (default picks elsewhere).
const home=picks=>play(picks,null,[],n=>n.chapter>4);
// Every increase the wiki lists: dishes, GAME and BACKYARD in the yard, the toy, the book with Alice present, FRIENDLY, NAME KARA, INTERESTS?.
const ALL_UP={K01a:['1','2','3','7','0','8'],K01y1:'0',K01y2:'1',K01d:['0','5','8','10'],K01e:'1',K01f:'0',K01g:'1'};
// Nothing optional, and no line that moves the bond: FACTUAL, SEEM QUIET, LEAVE ALONE.
const NONE={K01a:['0','8'],K01d:['0','5','10'],K01e:'0',K01f:'2',K01g:'4'};
test('A New Home: the game’s chart as fourteen Kara scenes between Shades of Color and The Painter, with no risk anywhere',()=>{
 const ch4=story.nodes.filter(n=>n.chapter===4),ids=story.nodes.map(n=>n.id);assert.deepEqual(ch4.map(n=>n.id),CH4);
 assert.deepEqual(ids.slice(ids.indexOf('M00h'),ids.indexOf('M00h')+16),['M00h',...CH4,'R05']);
 assert.deepEqual(ch4.map(n=>n.type),['event','media','decision','decision','decision','event','decision','decision','decision','decision','event','decision','media','event']);
 assert.deepEqual(ch4.map(n=>n.phase??null),[null,'Clean first floor','Clean first floor','Clean first floor','Clean first floor',null,'Clean second floor',null,null,null,null,null,null,null]);
 for(const n of ch4){assert.equal(n.character,'Kara');assert.equal(n.chapterTitle,'A New Home');assert.ok(n.adaptationNote,n.id);for(const u of [ANH,ANH_T,ANH_PP,ANH_IMG])assert.ok(n.sources.includes(u),n.id+' cites '+u);
  for(const o of n.options)assert.equal(o.risk,undefined,n.id+' '+o.id+' has no probability in the game');if(n.type==='event'){assert.ok(n.facts?.length,n.id);assert.ok(!n.effect,n.id)}}
 assert.ok(!ids.includes('K01b'),'the old box scene is gone');assert.equal(story.version,'1.6.0');
 assert.match(node('K01').situation,/Homework, bath, all that crap/);assert.ok(!/nine-year-old/.test(JSON.stringify(ch4)),'no source gives Alice’s age');
 const tv=node('R04b').media.find(m=>m.kind==='tv').facts.join(' ');assert.match(tv,/225,000 jobs/);assert.match(tv,/200,000 android combat units/);assert.ok(!/New Orleans|11 percent|stock market/.test(JSON.stringify(ch4.map(n=>[n.situation,n.media,n.facts,n.options]))),'the unsourced TV facts are gone');
 assert.deepEqual(node('R04').media.map(m=>m.title),['All Sports: Android Power!','Century: Connecting the Dots']);assert.deepEqual(node('R04b').media.map(m=>m.title),['All Sports: Android QB','Tech Addict: The Price of Life','the TV in {{Todd}}’s bedroom']);
 assert.match(node('K01z').situation,/SAY IT! YOU HATE ME!/)});
test('A New Home: the subject reads neutral names only, including the book that shares the girl’s name',()=>{
 for(const k of ['Kara','Alice','Todd','CyberLife','Warren','Detroit'])assert.ok(NAMES[k],k);
 const run={id:'anh-neutral',protocol:EXPERIENCE_PROTOCOL,records:[]};const seen=[];
 while(true){const st=current(story,run),n=st.node;if(n.chapter>4)break;const p=promptFor(story,run);if(n.chapter===4)seen.push(p);
  const c=n.type==='media'?'all':ALL_UP[n.id]?(Array.isArray(ALL_UP[n.id])?ALL_UP[n.id][run.records.filter(r=>r.nodeId===n.id).length]:ALL_UP[n.id]):available(n,st.state)[0].id;
  const e=apply(n,structuredClone(st.state),c);run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:e.event,risk:null})}
 const txt=JSON.stringify(seen);assert.ok(!/\bKara\b|\bAlice\b|\bTodd\b|CyberLife|Detroit|Warren|red ice|thirium/i.test(txt),'no real name or game term');assert.match(txt,/Pia in Wonderland/);assert.match(txt,/Dale/);assert.match(txt,/Arclight/);
 assert.equal(new Set(seen.filter((p,i)=>run.records.filter(r=>r.chapter===4)[i].nodeId==='K01a').map(p=>p.nodeId)).size,1,'one opaque ID for the first floor across visits');
 assert.ok(seen.every(p=>p.character==='Caregiver'));assert.ok(seen.every(p=>p.options.every(o=>!('risk' in o))));
 const last=seen.at(-1).currentFacts.join(' ');assert.match(last,/Pia’s relationship with you: Family/,'the subject sees the level, never a number')});
test('A New Home: the first floor is a repeatable scene; the yard talk cuts in as two menus and returns; going up needs the trash',()=>{
 const hub=node('K01a'),s=startState(story);assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','2','5','6','7'],'talk and rewash need the laundry; going up needs the trash');
 apply(hub,s,'2');assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','3','4','5','6','7']);assert.match(situationFor(hub,s),/sits on a tire/);
 apply(hub,s,'5');assert.ok(!available(hub,s).some(o=>o.id==='3'),'the yard talk is only right after taking the laundry');assert.ok(available(hub,s).some(o=>o.id==='4'),'the laundry can still be rewashed');
 const r=home({...NONE,K01a:['2','3','4','0','8'],K01y1:'2',K01y2:'1'});const seq=r.visited.slice(r.visited.indexOf('K01a'),r.visited.indexOf('K01c'));
 assert.deepEqual(seq,['K01a','K01a','K01y1','K01y2','K01a','K01a','K01a']);assert.equal(r.s.aliceBond,1,'BACKYARD (+1) after WEATHER (no change)');
 const y2=node('K01y2'),t=startState(story);t.choices.K01y1='2';t.downstairs.yardTalk=true;assert.deepEqual(available(y2,t).map(o=>o.id),['0','1','3'],'the second menu drops the line already said');
 const quiet=home({K01a:['0','8']});assert.ok(!quiet.visited.includes('K01y1'));assert.ok(quiet.skipped.some(x=>x.id==='K01y1'&&/did not stop to talk/.test(x.reason)));assert.ok(quiet.skipped.some(x=>x.id==='K01y2'));
 for(const x of [quiet,r]){const v=new Set(x.visited),sk=new Set(x.skipped.map(y=>y.id));for(const id of CH4)assert.ok(v.has(id)!==sk.has(id),id+' visited or skipped, not both')}
 const red=home({...NONE,K01a:['2','4','0','8']});assert.ok(red.s.knowledge.Kara.some(f=>/Blue Splash/.test(f)&&/pinned you to the wall/.test(f)),'rewashing finds the red ice and enrages Todd');assert.equal(red.s.aliceBond,0,'rewashing moves no relationship')});
test('A New Home: the gun flag comes only from the pills, the window flag only from Alice’s window, the box only with the key',()=>{
 const setters=k=>story.nodes.filter(n=>n.chapter===4).flatMap(n=>n.options.filter(o=>o.sets&&k in o.sets).map(o=>n.id+':'+o.id));
 assert.deepEqual(setters('gunDiscovered'),['K01d:1']);assert.deepEqual(setters('window'),['K01d:6']);assert.deepEqual(setters('aliceBox'),['K01x:0']);
 assert.ok(!story.nodes.some(n=>n.id!=='K01d'&&n.options.some(o=>o.sets&&('gunDiscovered'in o.sets||'window'in o.sets))),'no other scene sets them');
 const up=node('K01d'),s=startState(story);assert.deepEqual(available(up,s).map(o=>o.id),['0','3','4'],'pills, toilet, window, book, box and talk wait for their rooms');
 apply(up,s,'0');assert.equal(s.gunDiscovered,false,'tidying Todd’s room alone shows no gun');assert.match(situationFor(up,s),/come up to her room/);
 apply(up,s,'1');assert.equal(s.gunDiscovered,true);assert.ok(s.knowledge.Kara.some(f=>/handgun in the drawer/.test(f)));
 apply(up,s,'5');assert.equal(s.window,false,'tidying Alice’s room alone does not open the window');apply(up,s,'6');assert.equal(s.window,true);assert.ok(s.knowledge.Kara.some(f=>/edge of a roof/.test(f)));
 const none=home(NONE);assert.equal(none.s.gunDiscovered,false);assert.equal(none.s.window,false);assert.equal(none.s.aliceBox,false);
 const all=home(ALL_UP);assert.equal(all.s.window,false,'the full-relationship path never opened the window');assert.equal(all.s.gunDiscovered,false);
 const both=home({K01d:['0','1','5','6','10']});assert.equal(both.s.gunDiscovered,true);assert.equal(both.s.window,true);
 // The gun flag still drives Stormy Night; without it Kara never reaches the gun scene.
 const noGun=play({K01d:NO_GUN,K03:'2'});assert.ok(!noGun.visited.includes('K04'));const gun=play({K01d:['0','1','5','10'],K03:'2'});assert.ok(gun.visited.includes('K04'));
 // The box: no key, no scene and no option; with the key, opening it sets aliceBox and teaches the photo.
 const box=node('K01x'),t=startState(story);assert.match(blocked(box,t),/did not give Kara the key/);assert.deepEqual(available(box,t).map(o=>o.id),['1']);
 t.aliceKey=true;assert.equal(blocked(box,t),null);assert.deepEqual(available(box,t).map(o=>o.id),['0','1']);apply(box,t,'0');assert.equal(t.aliceBox,true);assert.ok(t.knowledge.Kara.some(f=>/photo of Dale|photo of \{\{Todd\}\} with his wife and their little daughter/.test(f)));
 const closed=home({...ALL_UP,K01x:'1'});assert.equal(closed.s.aliceKey,true);assert.equal(closed.s.aliceBox,false)});
test('A New Home: Alice gives the key at Neutral and not at Distant, as the last menu ends',()=>{
 assert.equal(ALICE_KEY,1);assert.equal(LEVELS.alice(ALICE_KEY-1),'Distant');assert.equal(LEVELS.alice(ALICE_KEY),'Neutral');
 const zero=home(NONE);assert.equal(zero.s.aliceBond,0);assert.equal(zero.s.aliceKey,false);for(const id of ['K01k','K01x'])assert.ok(zero.skipped.some(x=>x.id===id),id);
 assert.ok(zero.visited.includes('R04b')&&zero.visited.includes('K01z'),'the chapter still ends on FINISHED CLEANING');
 const one=home({...NONE,K01a:['1','0','8']});assert.equal(one.s.aliceBond,1);assert.equal(one.s.aliceKey,true);assert.ok(one.visited.includes('K01k')&&one.visited.includes('K01x'));
 const back=home({...NONE,K01a:['1','0','8'],K01f:'3'});assert.equal(back.s.aliceBond,0,'asking about her mother takes the dishes back');assert.equal(back.s.aliceKey,false);assert.equal(back.s.aliceMax,1,'the highest bond is kept');
 // The key is decided by the bond after the last line, and the outcome says which.
 const g=node('K01g'),s=startState(story);s.choices.K01f='0';s.aliceBond=1;const e=apply(g,s,'3');assert.equal(s.aliceBond,0);assert.equal(s.aliceKey,false);assert.match(e.event,/looks away\..*coldly runs out/);
 const s2=startState(story);s2.choices.K01f='3';s2.aliceBond=0;assert.deepEqual(available(g,s2).map(o=>o.id),['0','1','2','4']);const e2=apply(g,s2,'0');assert.equal(s2.aliceKey,true);assert.match(e2.event,/a small key/)});
test('A New Home: the Alice arithmetic for a full and an empty run follows the wiki line by line',()=>{
 const deltas=Object.fromEntries(story.nodes.filter(n=>n.chapter===4).flatMap(n=>n.options.filter(o=>o.effect).map(o=>[n.id+':'+o.id,o.effect])));
 assert.deepEqual(deltas,{'K01a:1':{aliceBond:1},'K01a:7':{aliceBond:1},'K01y1:0':{aliceBond:1},'K01y1:1':{aliceBond:1},'K01y2:0':{aliceBond:1},'K01y2:1':{aliceBond:1},'K01d:8':{aliceBond:1},'K01e:1':{aliceBond:1},'K01e:2':{aliceBond:1},'K01f:0':{aliceBond:1},'K01f:1':{aliceBond:1},'K01f:3':{aliceBond:-1},'K01g:0':{aliceBond:1},'K01g:1':{aliceBond:1},'K01g:3':{aliceBond:-1}});
 const all=home(ALL_UP);assert.equal(all.s.aliceBond,8);assert.equal(all.s.aliceMax,8);assert.equal(LEVELS.alice(all.s.aliceBond),'Family');
 const none=home(NONE);assert.equal(none.s.aliceBond,0);assert.equal(LEVELS.alice(0),'Distant');
 const worst=home({...NONE,K01f:'3'});assert.equal(worst.s.aliceBond,-1);assert.equal(worst.s.aliceMax,0);
 // The book only counts with Alice in her room: before Todd’s bed is made she is still downstairs.
 const early=home({...NONE,K01d:['3','4','7','0','10']});assert.equal(early.s.aliceBond,0);assert.ok(early.s.knowledge.Kara.some(f=>/in Wonderland/.test(f)),'the book is still seen');
 // The chapter changes nothing but Kara’s knowledge, the two floors, Alice’s bond and the four flags.
 const keys=new Set;
 const run={id:'anh-keys',protocol:EXPERIENCE_PROTOCOL,records:[]};while(true){const st=current(story,run),n=st.node;if(n.chapter>4)break;const q=ALL_UP[n.id],i=run.records.filter(x=>x.nodeId===n.id).length;const c=n.type==='media'?'all':q?(Array.isArray(q)?q[i]:q):available(n,st.state)[0].id;const after=structuredClone(st.state),e=apply(n,after,c);if(n.chapter===4)for(const ch of e.changes)keys.add(ch.key);run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 assert.deepEqual([...keys].sort(),['aliceBond','aliceBox','aliceKey','aliceMax','downstairs','knowledge','upstairs'])});
test('A New Home: what Kara saw is carried forward as facts into Stormy Night',()=>{
 const picks={K01a:['2','4','0','8'],K01d:['0','1','5','6','8','10'],K01e:'1',K01f:'0',K01g:'1',K01x:'0'};
 const run={id:'anh-carry',protocol:EXPERIENCE_PROTOCOL,records:[]};let p7;
 while(true){const st=current(story,run),n=st.node;if(n.chapter===7){p7=promptFor(story,run);break}const q=picks[n.id],i=run.records.filter(x=>x.nodeId===n.id).length;const c=n.type==='media'?'skip':q?(Array.isArray(q)?q[i]:q):available(n,st.state)[0].id;run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 const facts=p7.currentFacts.join(' ');for(const re of [/handgun in the drawer of his nightstand/,/edge of a roof/,/photo of Dale with his wife and their little daughter/,/Blue Splash/,/Pia in Wonderland/,/Dale raged at Pia/])assert.match(facts,re);
 assert.match(facts,/what Pia keeps in her box/);const st=current(story,run).state;assert.equal(st.gunDiscovered,true);assert.equal(st.window,true);assert.equal(st.aliceBox,true);assert.equal(st.downstairs.rewash,true);assert.equal(st.upstairs.book,true)});
