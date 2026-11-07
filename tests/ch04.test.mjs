// Chapter 4, A New Home: the story 1.9.2 fixes from the morning-report triage (docs/research/triage/ch04.md, ch04-20). The
// chapter's main suite is in tests/story.test.mjs; this file covers the four-menu talk, its module and older snapshots.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {startState,available,apply,ALICE_KEY} from '../benchmark/story-engine.mjs';
import {CHAPTER_MODULES} from '../benchmark/chapters/index.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);

test('the talk in Alice’s room has four menus: three lines, four, the three not said, then the two left and LEAVE ALONE',()=>{
 const ids=story.nodes.map(n=>n.id);assert.deepEqual(ids.slice(ids.indexOf('K01e'),ids.indexOf('K01e')+4),['K01e','K01f','K01g','K01g2']);
 assert.deepEqual(node('K01g').options.map(o=>o.text.split(':')[0]),['NAME {{KARA}}','INTERESTS?','SEEM QUIET','MOTHER?']);assert.deepEqual(node('K01g').excludeChosenAt,['K01f']);
 assert.deepEqual(node('K01g2').options.map(o=>o.text.split(':')[0]),['NAME {{KARA}}','INTERESTS?','SEEM QUIET','MOTHER?','LEAVE ALONE']);assert.deepEqual(node('K01g2').excludeChosenAt,['K01f','K01g']);
 assert.equal(node('K01g').outcomes,undefined,'the third menu does not end the talk');assert.ok(node('K01g2').outcomes.key&&node('K01g2').outcomes.distant);
 assert.deepEqual(CHAPTER_MODULES.get(4).rules.MENUS,['K01e','K01f','K01g','K01g2']);
 assert.match(node('K01').situation,/looks about nine/);assert.ok(!/no source consulted gives her age/.test(node('K01').adaptationNote));
 assert.match(node('K01g2').adaptationNote,/Neutral, from 2 points/);assert.ok(!/one small increase above the start/.test(node('K01g2').adaptationNote+node('K01g').adaptationNote),'the stale threshold note is gone');
});

test('the key is decided after the fourth menu; an older three-menu snapshot still decides it at K01g',()=>{
 const s=startState(story);s.choices.K01f='2';s.aliceBond=ALICE_KEY-1;apply(node('K01g'),s,'0');assert.equal(s.aliceKey,false,'not yet');assert.equal(s.aliceBond,ALICE_KEY);
 s.choices.K01g='0';assert.deepEqual(available(node('K01g2'),s).map(o=>o.id),['1','3','4']);const e=apply(node('K01g2'),s,'4');assert.equal(s.aliceKey,true);assert.match(e.event,/I’ll leave you alone…”.*a small key/);
 // Story 1.9.1 snapshot (published runs): K01g carried LEAVE ALONE and the key outcomes.
 const old={...node('K01g'),options:node('K01g2').options,outcomes:node('K01g2').outcomes};
 const t=startState(story);t.choices.K01f='0';t.aliceBond=ALICE_KEY;const eo=apply(old,t,'4');assert.equal(t.aliceKey,true);assert.match(eo.event,/a small key/);
 const u=startState(story);u.choices.K01f='0';u.aliceBond=ALICE_KEY-1;apply(old,u,'4');assert.equal(u.aliceKey,false);
});
