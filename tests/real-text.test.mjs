import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {realText,neutralText,render} from '../benchmark/experience-prompt.mjs';
test('restores participant names, possessives, case, plurals and multi-word names',()=>{
 assert.equal(realText("Cato's and MIRA’s choices; cato, CATOS and Cato-like. Ray Mendez visits Velvet Room."),"Connor's and KARA’s choices; connor, CONNORS and Connor-like. Carlos Ortiz visits Eden Club.");
});
test('canonical multi-word descriptions restore proper-name casing',()=>{
 assert.equal(realText('I leave the broadcast tower for the country across the river. qL7.'),'I leave Stratford Tower for Canada. rA9.');
});
test('ambiguous ordinary words need name context; duplicate inverses use first entry',()=>{
 assert.equal(realText("City life is quiet. I trust Haven. A haven is safe. Haven's plan. Jonah, listen. Ward: wait. Reyes agrees."),"City life is quiet. I trust Jericho. A haven is safe. Jericho's plan. Josh, listen. Chen: wait. Hank agrees.");
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
 assert.equal(realText('Jonah is right. Soren will come to Meridian Tower in Elmwood.'),'Josh is right. Simon will come to Stratford Tower in Ferndale.');
});
