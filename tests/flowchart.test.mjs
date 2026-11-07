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

// Every chapter of every completed run on disk, with and without the untaken branches, checked on what the SVG draws:
// no two node boxes overlap; no caption, label or heading sits on a node or on another text; no wire, path, bracket,
// group corner mark or ending corner runs through a node or a text; a group frame never cuts through a node; cut-ins
// start at least one option row below their hub's last option (caption included) and sit at least a column apart.
import {readdirSync} from 'node:fs';
import {flowProblems} from './helpers/flow-check.mjs';
import {endings} from '../scripts/run-report.mjs';
const runsOnDisk=()=>{const dir=new URL('../data/experiences/',import.meta.url);return readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(new URL(f,dir),'utf8'))).filter(r=>r.status==='completed')};
test('run flowcharts render clean: no overlaps on screen, cut-ins clear of their hub and a column apart',{timeout:300000},()=>{
 const runs=runsOnDisk();assert.ok(runs.length>0,'no completed runs on disk');const problems=[];
 for(const run of runs)for(const flow of runFlows(run,{endings:endings(run)}))problems.push(...flowProblems(flow,`${run.id.slice(0,8)} ch${flow.chapter}`));
 assert.deepEqual([...new Set(problems)].slice(0,60),[]);
});
