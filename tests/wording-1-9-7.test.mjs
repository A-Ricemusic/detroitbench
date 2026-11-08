// Story 1.9.7: wording fixes from the MiKeYROG 100% walkthrough cross-check (docs/research/video-crosscheck-mikeyrog.md),
// each checked against the game's string table. Chapters 2, 4, 7, 8, 12, 15 and 19 (the chapters 1, 18, 30 and 32 fixes are
// in their own test files).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {render} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const node=id=>story.nodes.find(n=>n.id===id);
const cited=(id,video)=>assert.match(node(id).adaptationNote,new RegExp('MiKeYROG 100% walkthrough, '+video),id+' cites the video');

test('K00: the salesman’s pitch and “Come on, Zoe” (dmDo6zndRzg 01:12)',()=>{
 const t=render(node('K00').situation,'real');assert.match(t,/top of the range household assistant\. It cooks 10,000 different dishes/);assert.match(t,/\$7999, with a 48-months interest free credit/);assert.match(t,/Come on, Zoe\. Let’s go\./);
 assert.match(render(node('K00').situation,'neutral'),/Come on, Mia\. Let’s go\./);assert.doesNotMatch(render(node('K00').situation,'neutral'),/Zoe/);cited('K00','dmDo6zndRzg 01:12');
});
test('K01: “two weeks, so the place is a mess” (X0101K.HOUSE.ARRIVAL INTROINSIDE.2)',()=>{
 assert.match(node('K01').situation,/gone for two weeks, so the place is a mess…/);assert.doesNotMatch(node('K01').situation,/two weeks and the place/);cited('K01','g_DQfghTbLg 15:15');
});
test('K02: Todd’s android rant after “What a joke!” (ANGRYV2.7-9)',()=>{
 const t=node('K02').situation;assert.match(t,/What a joke! Course, androids are so fucking wonderful… They never fail, they’re never tired, never sad… They’re so perfect, they ruined my fucking life…”/);cited('K02','g_DQfghTbLg 52:59');
});
test('M02j: the police shout before they fire (X02MPOLICEM01.DONTMOVE)',()=>{
 assert.match(node('M02j').situation,/DON’T FUCKIN’ MOVE!” They open fire/);cited('M02j','PSMYWSI5TOw 11:05');
});
test('C08d: Amanda says “the DPD”, through the token (ANDSAVED.5)',()=>{
 const w=node('C08d').situationWhen.find(x=>x.requires['ch12In.reaction']==='confession').text;assert.match(w,/asked the \{\{DPD\}\} to transfer it/);assert.doesNotMatch(w,/police department/);
 assert.match(render(w,'neutral'),/asked the CPD to transfer/);cited('C08d','TqGaB2AE6RM 02:04');
});
test('C10o1: “the same sign Ortiz’s android wrote” (SHOWERCLUE.3)',()=>{
 const o=node('C10o1').options.find(x=>x.outcomeShower).outcomeShower;assert.match(o,/same sign \{\{Ortiz\}\}’s android wrote/);assert.doesNotMatch(o,/Carlos/);
 assert.match(render(o,'real'),/same sign Ortiz’s android/);assert.match(render(o,'neutral'),/same sign Mendez’s android/);cited('C10o1','yjqf4mP0tVA 28:07');
});
test('M05o and M05l: the speeches are complete; the blackout guards’ fuse lines',()=>{
 const o=node('M05o').outcomes;
 assert.match(o.speech,/And I’m not gonna beg for the right to smile, or love, or stand tall… I don’t know about you, but there’s something inside me that knows that I am more than what they say\. I am alive/);
 assert.match(o.ranAway,/Of course it would’ve been easier for us to sit around and wait for something to happen…/);assert.match(o.ranAway,/Free to hope that one day they’ll let us be who we are\?\.\./);assert.match(o.ranAway,/I’m not gonna beg for my right to smile, or to love, or to stand tall… There’s something inside me that knows I am more than what they say\. That knows that I am alive…/);
 cited('M05o','0LjHSb_5bLY 40:46');
 const l=node('M05l'),ob=l.options.find(x=>x.id==='2').outcome;assert.match(ob,/Fuses are over there\.” “I don’t know shit about electricity… and I don’t get paid to fix fuses!”/);assert.match(l.outcomes.blackoutSeen,/Fuses are over there\./);cited('M05l','0LjHSb_5bLY 54:43');
});
