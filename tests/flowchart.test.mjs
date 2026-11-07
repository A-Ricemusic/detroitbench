import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runFlows} from '../scripts/flow-data.mjs';
import {layoutChapter,iconFor} from '../src/lib/flowchart.js';
const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url)));
const empty=()=>runFlows({story,records:[]}).find(f=>f.chapter===32);
test('chapter 32 catalogues endings for all three protagonists, including the tower and North',()=>{
 const f=empty(),ends=c=>f.lanes.find(l=>l.character===c).endings.map(e=>e.label);
 assert.ok(ends('Connor').includes('THE ANDROIDS WOKE UP'));
 assert.ok(ends('Connor').includes('CONNOR LEFT ROOFTOP'));
 assert.ok(ends('Markus').includes('CONNOR SPARED NORTH'));
 assert.ok(ends('Kara').includes('KARA LEAVES CAMP WITHOUT ALICE'));
});
test('an ending changed by another character stays with its own lane',()=>{
 const r={nodeId:'P02',step:1,character:'Player',chapter:32,choice:'0',prompt:{options:[]},stateBefore:{ch32MarkusEnding:null},stateAfter:{ch32MarkusEnding:'CONNOR SPARED NORTH'},changes:[],event:'Connor spared North.'};
 const f=runFlows({story,records:[r]}).find(f=>f.chapter===32);
 assert.equal(f.lanes.find(l=>l.character==='Markus').endings.find(e=>e.label==='CONNOR SPARED NORTH').taken,true);
 assert.ok(!f.lanes.find(l=>l.character==='Connor').endings.some(e=>e.taken));
});
test('chapter 32 blocks, lanes and ending columns have separate bounds',()=>{
 const layout=layoutChapter(empty());
 for(let i=0;i<layout.lanes.length;i++){
  const l=layout.lanes[i];if(i)assert.ok(l.top>layout.lanes[i-1].bottom);
  for(let j=1;j<l.blocks.length;j++)assert.ok(l.blocks[j].x>=l.blocks[j-1].x+l.blocks[j-1].w,'blocks overlap');
  for(let j=1;j<l.ends.length;j++)assert.ok(l.ends[j].y>=l.ends[j-1].y+l.ends[j-1].h,'endings overlap');
  if(l.ends.length&&l.blocks.length)assert.ok(l.ends[0].x>l.blocks.at(-1).x+l.blocks.at(-1).w);
 }
});

test('fatal shot endings use a death icon and sparing North remains a success',()=>{
 assert.equal(iconFor('NORTH WAS SHOT BY SOLDIERS'),'death');
 assert.equal(iconFor('CONNOR WAS AMBUSHED AND SHOT'),'death');
 assert.equal(iconFor('CONNOR SPARED NORTH'),'success');
});
