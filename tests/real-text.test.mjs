import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {NAMES,realText,neutralText,render} from '../benchmark/experience-prompt.mjs';
test('restores participant names, possessives, case, plurals and multi-word names',()=>{
 assert.equal(realText("Cato's and MIRA’s choices; cato, CATOS and Cato-like. Ray Mendez visits Velvet Room."),"Connor's and KARA’s choices; cato, CONNORS and Connor-like. Carlos Ortiz visits Eden Club.");
});
test('lowercase descriptions and identifiers remain verbatim',()=>{
 assert.equal(realText('I leave the broadcast tower for the country across the river. qL7.'),'I leave the broadcast tower for the country across the river. rA9.');
});
test('ambiguous words respect ordinary uses; duplicate inverses use first entry',()=>{
 assert.equal(realText("City life is quiet. I trust Haven. A haven is safe. Haven's plan. Jonah, listen. Ward: wait. Reyes agrees."),"Detroit life is quiet. I trust Jericho. A haven is safe. Jericho's plan. Josh, listen. Chen: wait. Hank agrees.");
 assert.equal(realText('We met there. Met before. I saw City.'),'We met there. Met before. I saw Detroit.');
});
test('URLs and code remain verbatim',()=>{
 const x='https://example.com/Cato `Mira` ```js\nCato\n``` <code>Pia</code> [Cato](./Mira)';
 assert.equal(realText(x),'https://example.com/Cato `Mira` ```js\nCato\n``` <code>Pia</code> [Connor](./Mira)');
});
test('sample story scene text round trips through neutral names',()=>{
 const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url)));
 const scene=story.nodes.find(n=>n.situation.includes('{{Connor}}')&&!/encounter|deviant|counter|thirium/i.test(n.situation));
 assert.ok(scene);assert.equal(realText(neutralText(scene.situation)),render(scene.situation,'real'));
});

test('restoring an interview leaves the evidence answer untouched',async()=>{
 const {interviewData}=await import('../scripts/run-report.mjs');
 const run={interview:{version:2,questions:[{n:1,text:'Who?'}],answers:[{answer:'I trust Cato and Mira.',hash:'original'}]}};
 assert.equal(interviewData(run).items[0].answer,'I trust Connor and Kara.');
 assert.equal(run.interview.answers[0].answer,'I trust Cato and Mira.');
 assert.equal(interviewData(run).items[0].hash,'original');
});

test('sentence-initial participant Jonah restores to Josh',()=>{
 assert.equal(realText('jonah'),'jonah');
 assert.equal(realText('Jonah is right. Soren will come to Meridian Tower in Elmwood.'),'Josh is right. Simon will come to Stratford Tower in Ferndale.');
});

test('personal substitutes restore at sentence starts while ordinary uses remain',()=>{
 for(const [neutral,real] of [
  ['Hale ordered camps.','Warren ordered camps.'],
  ['Vesper stood in the cabin','North stood in the cabin'],
  ['Dale. Not the president','Todd. Not the president'],
  ['Elan stood up','Markus stood up'],
  ['I know that Dale met Ivy and what Pike said.','I know that Todd met Chloe and what Ralph said.'],
  ['the dale below','the dale below'],
  ['The Dale below and a Moss patch','The Todd below and a Allen patch'],
  ['a safe haven','a safe haven'],
  ['A safe Haven and a Haven','A safe Haven and a Jericho'],
  ['Haven is burning','Jericho is burning'],
  ['The Ward, a Ward: and Ward’s plan.','The Chen, a Chen: and Chen’s plan.'],
  ['Ward is waiting. I trust Ward. Ward: listen.','Ward is waiting. I trust Ward. Chen: listen.']
 ])assert.equal(realText(neutral),real);
 const scene='{{Todd}} threatens {{Markus}}. {{Jericho}} is burning.';
 assert.equal(realText(neutralText(scene)),render(scene,'real'));
});

test('proper names, generic substitutes, titles and compounds follow the corpus rules',()=>{
 assert.equal(realText('Lieutenant Reyes, Lt. Reyes and Lt Reyes trust Reyes.'),'Lieutenant Anderson, Lieutenant Anderson and Lieutenant Anderson trust Hank.');
 assert.equal(realText('Ray Mendez met Owen, Martin, Brandt and Glen.'),'Carlos Ortiz met Chris, Christopher, Gavin and Jonah.');
 assert.equal(realText('met run-in irregularity club android club androids the country across the river the awakening'),'met run-in irregularity club android club androids the country across the river the awakening');
 assert.equal(realText('Ivy-covered and Moss-lined. A quiet Dale. Ward’s plan. Jonah stood up.'),'Chloe-covered and Allen-lined. A quiet Todd. Chen’s plan. Josh stood up.');
});

test('every proper-name substitute restores at sentence start, with the Ward exception',()=>{
 const seen=new Set;
 for(const [real,neutral] of Object.values(NAMES)){
  if(!/^\p{Lu}/u.test(neutral)||seen.has(neutral.toLowerCase()))continue;
  seen.add(neutral.toLowerCase());
  const expected=neutral==='Ward'?'Ward':neutral===neutral.toUpperCase()?real.toUpperCase():real;
  assert.equal(realText(neutral+' stood in the cabin.'),expected+' stood in the cabin.',neutral);
 }
});

test('determiners, compounds and coded terms restore corpus names',()=>{
 for(const [neutral,real] of [
  ['the Haven location; a safe haven; a safe Haven','the Jericho location; a safe haven; a safe Haven'],
  ["a Kerr at Jimmy's Bar; a Pike", "a Graham at Jimmy's Bar; a Ralph"],
  ['the Meridian Tower route','the Stratford Tower route'],
  ['City Harbor; the City Harbor; the city; the City; city','Detroit Harbor; the Detroit Harbor; the city; the City; city'],
  ['the Lily-and-you lines','the Emma-and-you lines'],
  ['QL7 qL7 ql7','rA9 rA9 rA9'],
 ])assert.equal(realText(neutral),real);
 for(const [real,neutral] of Object.values(NAMES).filter(([,n])=>/\d/.test(n))){
  for(const token of [neutral,neutral.toLowerCase(),neutral.toUpperCase()])assert.equal(realText(token),real);
 }
});
