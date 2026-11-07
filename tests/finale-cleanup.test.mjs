import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {current,startState,blocked} from '../benchmark/story-engine.mjs';
import {reconcileInputs} from '../benchmark/chapters/ch32.mjs';
test('final cleanup preserves North when Connor spared her, while a failed uprising still kills her',()=>{
 for(const [ending,alive] of [['CONNOR SPARED NORTH',true],['CONNOR SHOT NORTH',false]]){
  const n={id:'cleanup',chapter:0,character:'Player',type:'decision',options:[{id:'0',text:'Continue.',sets:{movement:'revolution',markus:false,markusActive:false,north:true,ch32MarkusEnding:ending}}]};
  const end=current({nodes:[n]},{records:[{nodeId:n.id,choice:'0'}]});
  assert.equal(end.node,null);assert.equal(end.state.north,alive);
  assert.equal(end.state.attitudes.Markus[0].level==='Dead',!alive);
 }
});
test('Battle for Detroit reconciles explicit Freedom March and Crossroads handoffs',()=>{
 const s=startState({});Object.assign(s,{ch28MarkusDied:true,ch28NorthLeads:true,ch30Leader:'North',ch30LutherFate:'sacrificed',luther:true,lutherWith:true});
 reconcileInputs(s);assert.equal(s.markus,false);assert.equal(s.markusActive,false);assert.equal(s.movement,'revolution');assert.equal(s.luther,false);assert.equal(s.lutherWith,false);
 const hidden=startState({});Object.assign(hidden,{luther:true,ch30LutherFate:'hidden'});reconcileInputs(hidden);assert.equal(hidden.lutherHidden,true);assert.equal(hidden.lutherWith,false);
});

test('Connor enters the tower only after joining in Crossroads, and remains dead if lost later',()=>{
 const n={id:'CT01',chapter:32,character:'Connor',type:'event'};
 const s=startState({});Object.assign(s,{connor:true,deviant:true,ch30ConnorEnding:'escaped',ch30ConnorJoined:false});
 assert.ok(blocked(n,s));s.ch30ConnorJoined=true;assert.equal(blocked(n,s),null);
 s.connor=false;assert.ok(blocked(n,s));
});
