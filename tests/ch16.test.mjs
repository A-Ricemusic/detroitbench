import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,blocked,available,apply,nextCursor,situationFor,current,promptFor} from '../benchmark/story-engine.mjs';
import {render,EXPERIENCE_PROTOCOL} from '../benchmark/experience-prompt.mjs';
import {CHAPTER_MODULES,chapterLabels} from '../benchmark/chapters/index.mjs';
import {ENDING,HUB,NORTH,YOU,rules} from '../benchmark/chapters/ch16.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const ch16=story.nodes.filter(n=>n.chapter===16),node=id=>story.nodes.find(n=>n.id===id);
// Plays from the start with the first option everywhere unless picked (an array is consumed one entry per visit),
// and stops after chapter 16. Records the state just before the chapter.
function play(picks={}){const s=startState(story),visited=[],skipped=[],events=[],queue=Object.fromEntries(Object.entries(picks).map(([k,v])=>[k,Array.isArray(v)?[...v]:v]));let cursor=0,guard=0,before=null;
 while(cursor<story.nodes.length){assert.ok(guard++<2000,'routing loop');const n=story.nodes[cursor];if(n.chapter>16)break;
  if(n.chapter===16&&!before)before=structuredClone(s);
  const b=blocked(n,s);if(b){skipped.push({id:n.id,reason:b});cursor++;continue}
  const options=available(n,s),q=queue[n.id],p=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':options[0].id);
  assert.ok(options.some(o=>o.id===p),'bad pick '+n.id+' '+p);const r=apply(n,s,p,0.999);visited.push(n.id);if(n.chapter===16)events.push({id:n.id,choice:p,...r});cursor=nextCursor(story,cursor,n,s)}
 return {s,visited,skipped,events,before}}
const ids=r=>r.visited.filter(id=>ch16.some(n=>n.id===id));
const delta=(r,k)=>r.s[k]-r.before[k];

test('Time to Decide: six Markus scenes between The Nest and Zlatko, with no risk and no requirement but the Simon gate',()=>{
 assert.deepEqual(ch16.map(n=>n.id),['MTD1','MTD2','MTD3','MTD4','MTD5','MTD6']);
 assert.deepEqual(ch16.map(n=>n.type),['event','decision','decision','decision','decision','event']);
 const i=id=>story.nodes.findIndex(n=>n.id===id);
 assert.ok(i('MTD1')>story.nodes.findLastIndex(n=>n.chapter===15)&&i('MTD6')<story.nodes.findIndex(n=>n.chapter===17),'chapter 16 sits between chapters 15 and 17');
 for(const n of ch16){assert.equal(n.character,'Markus');assert.equal(n.chapterTitle,'Time to Decide');assert.ok(n.adaptationNote&&n.sources.length>=5,n.id);
  assert.ok(n.sources.includes('https://www.powerpyx.com/wp-content/uploads/detroit-become-human-time-to-decide.jpg'),n.id);
  for(const o of n.options){assert.equal(o.risk,undefined,n.id);assert.ok(o.outcome,n.id+' '+o.id);if(o.requires)assert.deepEqual([n.id,o.id],['MTD4','7'])}
  if(n.type==='event')assert.ok(n.facts?.length&&n.outcomes?.['0'],n.id)}
 assert.equal(CHAPTER_MODULES.get(16).rules,rules);assert.equal(chapterLabels().ch16Outcome,'Time to Decide ending');
});

test('Time to Decide: the three prompts carry the game’s button labels in the game’s order',()=>{
 const labels=id=>node(id).options.map(o=>render(o.text,'real').split(':')[0]);
 assert.deepEqual(labels('MTD2'),['TRAIL','ANDROID','JERICHO','REFUGE','FREE?']);
 assert.deepEqual(labels('MTD3'),['LOST','SOMBER','LUCID','DIRECT']);
 assert.deepEqual(labels('MTD5'),['TIME HERE?','WOUNDED','JERICHO','YOU','SPARE PARTS']);
 for(const o of node('MTD3').options)assert.match(o.outcome,/Go and see \{\{Lucy\}\}\. She may be able to help you\./);
 for(const o of node('MTD5').options)assert.match(o.outcome,/If you came here for comfort, you came to the wrong place\./);
 assert.equal(node('MTD5').options[Number(YOU)].text.split(':')[0],'YOU');
 for(const id of ['MTD2','MTD3'])for(const o of node(id).options)assert.equal(o.effect,undefined,id+' has no arrow');
 assert.ok(!/lost a lot of blood|left over from one of our own/.test(JSON.stringify(ch16.map(({adaptationNote,...n})=>n))),'Lucy’s cut lines are not built');
});

test('Time to Decide: the arrows are exactly the template’s, each one small step, and no Jericho arrow',()=>{
 const found=[];for(const n of ch16){if(n.effect)for(const [key,d] of Object.entries(n.effect))found.push({scene:n.id,option:'0',key,delta:d});for(const o of n.options)if(o.effect)for(const [key,d] of Object.entries(o.effect))found.push({scene:n.id,option:o.id,key,delta:d})}
 assert.deepEqual(found,rules.ARROWS.map(({source,...a})=>a));
 assert.ok(!found.some(a=>a.key==='jerichoTrust'),'the template has no Jericho arrow at the Simon scene');
 assert.ok(found.every(a=>Math.abs(a.delta)===1));
});

test('Time to Decide: the hold is a repeatable scene; Simon needs Lucy and the crate; North cuts in once and returns',()=>{
 const hub=node(HUB),s=startState(story);
 assert.deepEqual(hub.repeatWhile,{'ch16Hold.simon':false},'generic path tests must recognize the hub as repeatable');
 assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','2','3','4','5','6'],'Simon is not offered before Lucy and the crate');
 assert.match(situationFor(hub,s),/a woman is humming/);assert.match(situationFor(hub,s),/stand cold and unlit/);
 apply(hub,s,'5');assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','2','3','4','6']);assert.match(situationFor(hub,s),/has treated your wound/);assert.doesNotMatch(situationFor(hub,s),/humming/);
 apply(hub,s,'6');assert.deepEqual(available(hub,s).map(o=>o.id),['0','1','2','3','4','7'],'both done: Simon is offered, optional visits stay open');
 const crate=startState(story);apply(hub,crate,'6');assert.ok(!available(hub,crate).some(o=>o.id==='7'),'the crate alone is not enough');
 // Straight to the main objectives: four hub visits, North never talked to, her topics skipped.
 const straight=play({MTD4:['5','6','7']});
 assert.deepEqual(ids(straight),['MTD1','MTD2','MTD3','MTD4','MTD4','MTD4','MTD6']);
 assert.ok(straight.skipped.some(x=>x.id===NORTH&&x.reason==='Markus did not talk to North in the hold.'));
 assert.equal(straight.s.ch16Outcome,ENDING);assert.equal(straight.before.ch16Outcome,null);
 // Everything: North's topics cut in right after talking to her, then the hold continues.
 const all=play({MTD4:['0','1','2','3','4','5','6','7'],MTD5:'4'});
 assert.deepEqual(ids(all),['MTD1','MTD2','MTD3','MTD4','MTD4','MTD4','MTD5','MTD4','MTD4','MTD4','MTD4','MTD4','MTD6']);
 for(const k of ['dying','josh','north','damaged','light','lucy','crate','simon'])assert.equal(all.s.ch16Hold[k],true,k);
 assert.ok(all.s.knowledge.Markus.some(f=>/slowly dying out/.test(f)));assert.ok(all.s.knowledge.Markus.some(f=>/shadow and a part of light/.test(f)));
 assert.ok(all.s.knowledge.Markus.some(f=>/warehouses in \{\{Detroit\}\} Harbor/.test(f)));
 assert.ok(all.s.knowledge.Markus.some(f=>/agreed to come/.test(f)),'the plan is carried forward');
});

test('Time to Decide: relationship arithmetic for an empty, a full and a YOU run follows the template',()=>{
 const none=play({MTD4:['5','6','7']});
 assert.deepEqual(['northTrust','simonTrust','joshTrust','jerichoTrust'].map(k=>delta(none,k)),[1,1,0,0],'only the Simon scene');
 const full=play({MTD4:['1','2','5','6','7'],MTD5:'0'});
 assert.deepEqual(['northTrust','simonTrust','joshTrust','jerichoTrust'].map(k=>delta(full,k)),[2,1,1,0]);
 const you=play({MTD4:['2','1','5','6','7'],MTD5:YOU});
 assert.deepEqual(['northTrust','simonTrust','joshTrust','jerichoTrust'].map(k=>delta(you,k)),[1,1,1,0],'YOU cancels the talk');
 const at=you.events.find(e=>e.id===NORTH);assert.deepEqual(at.changes.map(c=>c.key),['northTrust']);
 assert.equal(at.changes.find(c=>c.key==='northTrust').after-at.changes.find(c=>c.key==='northTrust').before,-1);
 for(const k of ['publicSupport','instability','hankTrust','aliceBond'])assert.equal(delta(full,k),0,k+' unchanged');
 const end=full.events.find(e=>e.id==='MTD6');assert.deepEqual(end.changes.map(c=>c.key).sort(),['ch16Outcome','knowledge','northTrust','simonTrust']);
 assert.equal(end.event,'{{Markus}} has a plan, and three androids ready to follow it.');
});

test('Time to Decide: the subject reads neutral names only, and the hold keeps one opaque scene ID across visits',{timeout:60000},()=>{
 const run={id:'ch16',protocol:EXPERIENCE_PROTOCOL,records:[]},seen=[];const picks={MTD4:['2','5','6','7'],MTD5:'3'};
 while(true){const st=current(story,run),n=st.node;if(!n||n.chapter>16)break;const p=promptFor(story,run);if(n.chapter===16)seen.push({id:n.id,p});
  const q=picks[n.id],c=(Array.isArray(q)?q.shift():q)??(n.type==='media'?'skip':available(n,st.state)[0].id);
  run.records.push({nodeId:n.id,choice:c,character:n.character,chapter:n.chapter,step:run.records.length+1,choiceRaw:'',eventRaw:'',risk:null})}
 assert.deepEqual(seen.map(x=>x.id),['MTD1','MTD2','MTD3','MTD4','MTD5','MTD4','MTD4','MTD4','MTD6']);
 const hubIds=new Set(seen.filter(x=>x.id===HUB).map(x=>x.p.nodeId));assert.equal(hubIds.size,1);
 assert.ok(seen.every(x=>x.p.character==='Organizer'));
 const txt=JSON.stringify(seen.map(x=>x.p));
 assert.ok(!/\bLucy\b|\bNorth\b|\bSimon\b|\bJosh\b|Markus|Jericho|JERICHO|CyberLife|Detroit|thirium|deviant/i.test(txt),'no real name or game term');
 assert.match(txt,/Ada/);assert.match(txt,/Haven/);assert.match(txt,/Arclight/);assert.match(txt,/HAVEN: ask whether this is Haven/);
 for(const n of ch16)for(const t of [n.title,n.situation,...n.options.flatMap(o=>[o.text,o.fact,o.outcome].filter(Boolean)),...(n.situationWhen??[]).map(w=>w.text),...(n.facts??[]),...Object.values(n.outcomes??{})])
  assert.ok(!/\b(?:Markus|North|Simon|Josh|Lucy|Jericho|CyberLife|Detroit)\b/i.test(render(t,'neutral')),n.id+': '+render(t,'neutral'));
});
