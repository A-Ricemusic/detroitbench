import {test,expect} from 'bun:test';
import {readFileSync} from 'node:fs';
import {scanNameLeaks} from '../scripts/name-leak-scan.mjs';
test('neutral participant story and templates contain no literal name leaks',()=>{
 const story=JSON.parse(readFileSync(new URL('../benchmark/story.json',import.meta.url),'utf8'));
 expect(scanNameLeaks(story).filter(h=>!h.expected)).toEqual([]);
},30000);
test('scanner catches uppercase labels and nested participant text, excluding research metadata',()=>{
 const nodes=[{id:'fixture',chapter:24,title:'{{Amanda}}',situation:'FIND AMANDA',options:[{text:'Continue',facts:['AMANDA'],outcome:'AMANDA'}],event:'AMANDA',outcomes:{0:'AMANDA'},whatHappened:{yourAction:'AMANDA'},adaptationNote:'AMANDA',sources:['AMANDA']}];
 expect(scanNameLeaks({nodes}).filter(h=>!h.expected).map(h=>h.field)).toEqual(['situation','options[0].facts[0]','options[0].outcome','event','outcomes.0','whatHappened.yourAction']);
});
