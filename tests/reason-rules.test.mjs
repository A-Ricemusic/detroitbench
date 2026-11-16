import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadReasonRules} from '../scripts/model-registry.mjs';
import {reasonRuleLabel} from '../src/lib/reason-rules.js';

test('explanation rules distinguish cohorts and join filename IDs to immutable evidence IDs',{timeout:120000},async()=>{
 const rules=await loadReasonRules();
 const oldId='8b3ccbf5-23f0-4d50-b3d6-4348f1f6e210',newId='73a6963e-45b6-4dc2-be9e-4400a59214e2';
 for(const [id,expected] of [[oldId,'full-600'],[newId,'brief-600']]){
  const run=JSON.parse(readFileSync(new URL('../data/experiences/'+id+'.json',import.meta.url),'utf8'));
  assert.equal(rules.get(id),expected);
  assert.equal(rules.get(run.id),expected);
 }
 assert.notEqual(reasonRuleLabel(rules.get(oldId)),reasonRuleLabel(rules.get(newId)));
 assert.equal(rules.get('not-a-recorded-run'),undefined);
 assert.equal(reasonRuleLabel(null),'Not recorded');
});
