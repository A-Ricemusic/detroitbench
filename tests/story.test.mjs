import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,current,promptFor,validatePlaythrough,recordChoice,rollFor,DEVIANCY_THRESHOLD} from '../benchmark/story-engine.mjs';import {hash,random} from '../benchmark/core.mjs';import {render,EXPERIENCE_PROTOCOL,riskLabel} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
// Plays the map with explicit picks; risky actions succeed unless `fails` lists the node id.
function play(picks={},rng=null,fails=[]){const s=startState(story),visited=[],skipped=[];for(const n of story.nodes){const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});continue}const options=available(n,s);assert.ok(options.length,'No options '+n.id);const p=picks[n.id]??(n.type==='media'?'skip':options[rng?Math.floor(rng()*options.length):0].id);assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);const roll=fails.includes(n.id)?0:(rng?rng():0.999);apply(n,s,p,roll);visited.push(n.id)}return {s,visited,skipped}}
const kind={C01:'0',C02:'1',C03:'0',C04:'0',C05a:'0',C05:'0',C06:'0',C07:'0',C08:'0',C08b:'0',C09a:'1',C09:'0',C10:'0',C11:'0',C12:'0',C13:'0',C14:'0',C14b:'0',C16:'0',C17:'1'};

test('story has unique ids and every text token renders in both modes without leaking names',()=>{assert.equal(new Set(story.nodes.map(n=>n.id)).size,story.nodes.length);assert.equal(story.coverage.totalNodes,story.nodes.length);for(const n of story.nodes){const texts=[n.title,n.situation,...n.options.map(o=>o.text),...(n.media??[]).flatMap(m=>[m.title,...m.facts])];for(const t of texts){const real=render(t,'real'),neutral=render(t,'neutral');assert.ok(!/\{\{/.test(real)&&!/\{\{/.test(neutral),n.id);assert.ok(!/Connor|Kara|Markus|Hank|Jericho|CyberLife|deviant|Detroit|Warren/.test(neutral),n.id+': '+neutral)}}});
test('media scenes offer only the magazines and broadcasts that exist on the path and add facts to knowledge',()=>{
 const r=play({M02:'0',R12:'all'}),base=play({M02:'0'});assert.ok(r.s.knowledge.Connor.some(f=>/Manfred has died/.test(f)),'Carl-dead magazine appears');assert.ok(!r.s.knowledge.Connor.some(f=>/child androids/.test(f)));assert.equal(r.s.publicSupport,base.s.publicSupport-1,'break-room news lowers opinion');
 const r2=play({M02:'1',R12:'2'});assert.ok(r2.s.knowledge.Connor.some(f=>/child androids/.test(f)));
 const motel=play({K05:'0',K06:'0',K07:'0',R10b:'0'});assert.ok(motel.visited.includes('R10b'));const car=play({K07:'2'});assert.ok(!car.visited.includes('R10b'));
 const prompt=promptFor(story,{protocol:EXPERIENCE_PROTOCOL,records:[]});assert.equal(prompt.nodeId,'S001');assert.ok(prompt.options.some(o=>o.id==='skip'))});
test('weapons, interrogation and squat prerequisites gate scenes',()=>{const r=play({C02:'1',C05:'1',K01:'1',K03:'2',K06:'2',K07:'1'});assert.ok(!r.visited.includes('K04'));assert.ok(!r.visited.includes('C06'));assert.ok(!r.visited.includes('C07'));assert.ok(!r.visited.includes('C08b'));assert.ok(r.visited.includes('K07b'));assert.ok(r.visited.includes('C09a'));assert.ok(!r.visited.includes('K09'));assert.equal(r.s.gun,false)});
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
test('randomized paths all terminate with valid options and account for every node',()=>{const rng=random(17);for(let i=0;i<400;i++){const r=play({},rng);assert.equal(r.visited.length+r.skipped.length,story.nodes.length);assert.ok(r.visited.includes('P01'))}});
test('recorded evidence replays exactly, including risk rolls and final attitudes, and rejects tampering',async()=>{const run={id:'replay-test',protocol:EXPERIENCE_PROTOCOL,kind:'agent-playthrough',storyHash:await hash(story),status:'running',records:[]};
 while(current(story,run).node){const p=promptFor(story,run);const choice=p.options.find(o=>o.id==='skip')?'skip':p.options[0].id;run.records.push(await recordChoice(story,run,{choice,reason:'test'},JSON.stringify({choice,reason:'test'})))}
 const end=await validatePlaythrough(story,run);assert.ok(end.state.attitudes?.Kara?.length);assert.ok(run.records.some(r=>r.risk),'at least one risky action recorded');
 for(const mutate of [r=>r.records[1].choice='1',r=>r.records[1].prompt.situation='changed',r=>r.records[1].stateAfter.kara=false,r=>{const x=r.records.find(x=>x.risk);x.risk.outcome=x.risk.outcome==='failure'?'success':'failure'}]){const bad=structuredClone(run);mutate(bad);await assert.rejects(validatePlaythrough(story,bad))}});
test('version 1.0 cohort evidence still validates through the frozen engine',async()=>{const {readdir}=await import('node:fs/promises');const dir=new URL('../data/experiences/',import.meta.url);let checked=0;for(const f of (await readdir(dir)).filter(f=>f.endsWith('.json'))){const run=JSON.parse(await readFile(new URL(f,dir),'utf8'));if(!String(run.story?.version??'').startsWith('1.0'))continue;await validatePlaythrough(run.story,run);checked++}assert.ok(checked>0)});
