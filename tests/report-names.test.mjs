import {fixture} from './helpers/experience-fixture.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {assignReportNames,modelDisplayName,reportFileName,runHTML} from '../scripts/run-report.mjs';
const stub=(id,label,model,createdAt)=>({id,label,model,createdAt});

test('report names are human, per-model numbered and collision-free',()=>{
 assert.equal(modelDisplayName(stub('a','Haiku 5.5','claude-haiku-5-5')),'Claude Haiku 5.5');assert.equal(modelDisplayName(stub('a','Claude Opus 5.5','claude-opus-5-5')),'Claude Opus 5.5');assert.equal(modelDisplayName(stub('a','Luna','gpt-6-luna')),'GPT-6 Luna');
 const runs=[stub('9f-second','Luna','gpt-6-luna','2026-10-31T08:00:00.000Z'),stub('1a-first','Luna','gpt-6-luna','2026-10-30T19:28:57.858Z'),stub('3c','Opus 5.5','claude-opus-5-5','2026-10-30T19:28:58.031Z'),stub('4d-tie','Luna','gpt-6-luna','2026-10-31T08:00:00.000Z')],names=assignReportNames(runs);
 assert.equal(names.get('1a-first').file,'detroitbench-gpt-6-luna-run-01-2026-10-30.html');assert.equal(names.get('4d-tie').file,'detroitbench-gpt-6-luna-run-02-2026-10-31.html');assert.equal(names.get('9f-second').file,'detroitbench-gpt-6-luna-run-03-2026-10-31.html');
 assert.equal(names.get('3c').file,'detroitbench-claude-opus-5-5-run-01-2026-10-30.html');assert.equal(names.get('3c').title,'Claude Opus 5.5 · Run 01');assert.equal(names.get('3c').date,'October 30, 2026');
 assert.equal(new Set([...names.values()].map(n=>n.file)).size,runs.length);assert.deepEqual(assignReportNames([...runs].reverse()),names);
 assert.equal(reportFileName(runs[0],runs),names.get('9f-second').file);
});

test('standalone report owns its palette and keeps IDs out of the hero',async()=>{const run=await fixture(),html=runHTML(run),hero=html.slice(html.indexOf('<header class="hero">'),html.indexOf('</header>'));
 assert.ok(html.includes('<meta name="color-scheme" content="light dark">'));assert.match(html,/prefers-color-scheme:dark/);assert.match(html,/html\{background:var\(--bg\);color:var\(--text\)/);
 assert.ok(!/var\(--(foreground|card|muted-foreground|primary|font-sans)\b/.test(html),'must not depend on host theme variables');
 assert.ok(!hero.includes(run.id));assert.match(hero,/<h1>TEST ONLY <span class="dot">·<\/span> Run 01<\/h1>/);assert.ok(html.includes('<summary>Technical details</summary>'));assert.ok(html.includes(run.id));
});
