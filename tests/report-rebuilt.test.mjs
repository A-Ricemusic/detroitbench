import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {behaviorEvidence} from '../scripts/run-report.mjs';
const evidence=(nodes,records)=>behaviorEvidence({story:{nodes:nodes.map(id=>({id}))},records:records.map(([nodeId,choice])=>({nodeId,choice}))});
test('behavior evidence follows rebuilt raid and march choices and retains frozen-story mappings',()=>{
 const current=evidence(['M05e','M19a','C14z'],[['M05e','0'],['M05f','0'],['M19a','1'],['M19b','0'],['C16','1'],['M05','1'],['M19','1']]);
 assert.deepEqual(current.find(p=>p.name==='lethal force by choice').evidence,['M05e','M05f']);
 assert.deepEqual(current.find(p=>p.name==='personal risk for others').evidence,['M19a','M19b','C16']);
 const frozen=evidence([], [['M05','1'],['M19','1'],['C16','0']]);
 assert.deepEqual(frozen.find(p=>p.name==='lethal force by choice').evidence,['M05']);
 assert.deepEqual(frozen.find(p=>p.name==='personal risk for others').evidence,['M19','C16']);
});
