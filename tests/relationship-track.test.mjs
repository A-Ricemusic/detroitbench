// The site's relationship tracks (scripts/relationship-track.mjs): a character the run never met still draws, flat at
// the gauge's start level, until the storyline it belongs to ended, so every run is visible on every gauge.
import test from './helpers/test.mjs';import assert from 'node:assert/strict';
import {relationshipTrack,explainUnmet,libraryTrack,trackDetail,chapterTitles,chapterValues,METRICS} from '../scripts/relationship-track.mjs';
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

// The results page's library keeps one value per chapter (libraryTrack); the per-step values and steps go to the run's
// detail file (trackDetail) and the chapter titles to one map for the library (chapterTitles).
test('the library track keeps the value at the end of each chapter and the end fields, the detail file the steps',()=>{
 const met={records:[rec(5),rec(5),rec(21),rec(22)]},m0=initialState(),states=[m0,{...m0},{...m0},{...m0,luther:true,lutherTrust:1},{...m0,luther:true,lutherTrust:2}];
 const full=relationshipTrack(met,byId,states),lib=libraryTrack(full),detail=trackDetail(full);
 assert.deepEqual(lib.chapters,[0,5,21,22]);
 assert.deepEqual(lib.lutherTrust.series,[null,null,1,2],'start, then the value after the last step of chapters 5, 21 and 22');
 assert.deepEqual(chapterValues([{chapter:3},{chapter:1}],[0,4,7]),[0,7,7],'a chapter takes the value after the run’s last step in it or an earlier chapter');
 for(const m of METRICS){const {values,...end}=full[m.key],{series,...kept}=lib[m.key];assert.deepEqual(kept,end,m.key+' keeps its end fields');assert.equal(lib[m.key].values,undefined);
  assert.deepEqual(detail.values[m.key],values,m.key+' per-step values go to the detail file')}
 assert.deepEqual(detail.steps.map(s=>s.node),['X5','X5','X21','X22']);assert.ok(detail.steps.every(s=>!('chapterTitle' in s)));
 assert.equal(lib.steps,undefined,'no steps in the library');
 assert.deepEqual(chapterTitles([full]),{5:'Chapter 5',21:'Zlatko',22:'Chapter 22'});
});
