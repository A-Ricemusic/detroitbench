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
 const r={nodeId:'P02',step:1,character:'Player',chapter:32,choice:'0',prompt:{options:[]},changes:[{key:'ch32MarkusEnding',before:null,after:'CONNOR SPARED NORTH'}],event:'Connor spared North.'};
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

// Every chapter of every completed run on disk, both with and without the untaken branches: no two drawn boxes
// overlap, cut-ins hang below the hub with a clear gap and at least a column apart, and each group frame encloses
// everything it holds (including the cut-ins).
import {readdirSync} from 'node:fs';
import {layoutBoxes,layoutChapter as layout} from '../src/lib/flowchart.js';
import {endings} from '../scripts/run-report.mjs';
const runsOnDisk=()=>{const dir=new URL('../data/experiences/',import.meta.url);return readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(new URL(f,dir),'utf8'))).filter(r=>r.status==='completed')};
const meets=(a,b)=>a.x<b.x+b.w-0.5&&b.x<a.x+a.w-0.5&&a.y<b.y+b.h-0.5&&b.y<a.y+a.h-0.5;
const inside=(a,o)=>a.x>=o.x-0.5&&a.y>=o.y-0.5&&a.x+a.w<=o.x+o.w+0.5&&a.y+a.h<=o.y+o.h+0.5;
test('run flowcharts: no overlapping boxes, cut-ins clear of their hub and a column apart, frames enclose their content',{timeout:120000},()=>{
 const runs=runsOnDisk();assert.ok(runs.length>0,'no completed runs on disk');const problems=[];
 for(const run of runs)for(const flow of runFlows(run,{endings:endings(run)}))for(const showUntaken of [true,false]){
  const boxes=layoutBoxes(layout(flow,{showUntaken})),where=`${run.id.slice(0,8)} ch${flow.chapter}${showUntaken?'':' (taken only)'}`;
  const solid=boxes.filter(b=>b.kind!=='group');
  for(let i=0;i<solid.length;i++)for(let j=i+1;j<solid.length;j++){const a=solid[i],b=solid[j];if(a.lane===b.lane&&meets(a,b))problems.push(`${where}: ${a.kind} ${a.id} overlaps ${b.kind} ${b.id}`)}
  for(const c of boxes.filter(b=>b.kind==='cutin')){if(c.y<c.hubBottom+24)problems.push(`${where}: cut-in ${c.id} sits within 24px of hub ${c.hub}`);
   const next=boxes.find(b=>b.kind==='cutin'&&b.hub===c.hub&&b.index===c.index+1);if(next&&next.x-(c.x+c.w)<150-0.5)problems.push(`${where}: cut-ins ${c.id} and ${next.id} are less than a column apart`)}
  for(const g of boxes.filter(b=>b.kind==='group'))for(const m of boxes.filter(b=>(b.kind==='block'||b.kind==='cutin'||b.kind==='cutin-label')&&b.lane===g.lane&&g.members.includes(b.kind==='cutin-label'?b.id:b.id)))if(!inside(m,g))problems.push(`${where}: ${m.kind} ${m.id} is outside its frame ${g.id}`)}
 assert.deepEqual(problems,[]);
});
