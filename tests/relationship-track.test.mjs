// The site's relationship tracks (scripts/relationship-track.mjs): a character the run never met still draws, flat at
// the gauge's start level, until the storyline it belongs to ended, so every run is visible on every gauge.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';
import {relationshipTrack,explainUnmet} from '../scripts/relationship-track.mjs';
import {initialState} from '../benchmark/story-engine.mjs';
import {SCALES} from '../benchmark/scales.mjs';
const rec=(chapter,character='Kara')=>({nodeId:'X'+chapter,character,chapter});
const byId=new Map([5,7,8,21,22].map(c=>['X'+c,{title:'Scene '+c,chapterTitle:c===21?'Zlatko':'Chapter '+c}]));

test('a run that never met Luther draws a flat line at his start level until Kara’s story ended, with an X',()=>{
 const records=[rec(5),rec(7),rec(8,'Markus')],s0=initialState(),states=[s0,{...s0},{...s0,kara:false},{...s0,kara:false}];
 assert.equal(s0.luther,false,'Luther starts outside the party');
 const met={records:[rec(5),rec(21),rec(22)]},m0=initialState(),metStates=[m0,{...m0},{...m0,luther:true,lutherTrust:1},{...m0,luther:true,lutherTrust:2}];
 const [unmet,other]=explainUnmet([relationshipTrack({records},byId,states),relationshipTrack(met,byId,metStates)]),t=unmet.lutherTrust;
 const start=SCALES.luther.startValue;
 assert.deepEqual(t.values,[start,start,start,null],'flat at the start value through chapter 7, Kara’s last chapter');
 assert.equal(t.endedAt,2);assert.equal(t.ended,'Never met');assert.equal(t.final,'Never met');assert.equal(t.score,start);
 assert.deepEqual(t.unmet,{level:'Neutral',text:'Luther never joined the party',early:true,endChapter:7,endTitle:'Chapter 7',reason:'Kara’s story ended in chapter 7, before Zlatko'});
 assert.equal(other.lutherTrust.unmet,undefined,'a run that met Luther keeps its real values');assert.deepEqual(other.lutherTrust.values,[null,null,1,2]);
});

test('when Kara’s story runs to the end, the unmet line reaches END',()=>{
 const records=[rec(5),rec(7)],s0=initialState(),t=relationshipTrack({records},byId,[s0,{...s0},{...s0}]).lutherTrust;
 assert.deepEqual(t.values,[0,0,0].map(()=>SCALES.luther.startValue));assert.equal(t.endedAt,2);assert.equal(t.unmet.early,false);assert.equal(t.unmet.reason,null);
});
