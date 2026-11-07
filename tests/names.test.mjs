import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {NAMES, nameKey, render} from '../benchmark/experience-prompt.mjs';

test('NAMES declares each key exactly once and uses the canonical prophet alias',async()=>{
 // Inspect declarations: Object.keys alone cannot detect overwritten object keys.
 const source=await readFile(new URL('../benchmark/experience-prompt.mjs',import.meta.url),'utf8');
 const table=source.split('export const NAMES={')[1].split('\n};')[0].replace(/\/\/[^\n]*/g,'');
 const keys=[...table.matchAll(/\b(\w+)\s*:\s*\[/g)].map(m=>m[1]);
 assert.equal(keys.length,Object.keys(NAMES).length,'duplicate NAMES declaration');
 assert.equal(new Set(keys).size,keys.length,'NAMES keys must be unique');
 assert.deepEqual(NAMES.rA9,['rA9','qL7']);
 assert.equal(render('{{rA9}} {{RA9}}','neutral'),'qL7 QL7');
});

test('every chapter name token is registered, including uppercase button labels',async()=>{
 const dir=new URL('../benchmark/chapters/',import.meta.url);
 for(const file of (await readdir(dir)).filter(f=>/^ch\d+\.json$/.test(f))){
  const source=await readFile(new URL(file,dir),'utf8');
  for(const [,token] of source.matchAll(/\{\{(\w+)\}\}/g)){
   assert.ok(nameKey(token),file+': unknown name token '+token);
   assert.doesNotThrow(()=>render('{{'+token+'}}','neutral'),file+': '+token);
  }
 }
});
