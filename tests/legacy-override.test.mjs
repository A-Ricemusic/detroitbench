import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,unlink} from 'node:fs/promises';
import {random} from '../benchmark/core.mjs';
const retired=['M02','C05a','C05','K02','K03','K04','C06','C07','K09','C09a','C09','C10','K10','K11','K13','C11','M05','M06','M07','M08','C12','C13','M10','M11','M12','M13','M14','C14','C14b','C16','K15','M15','M16','C17','C18','M17','M18','M19','M20'];
test('rebuilt chapter modules handle retired engine cases before the legacy switch',{timeout:600000},async()=>{
 const path=new URL('../benchmark/.legacy-override-test.mjs',import.meta.url);
 const source=await readFile(new URL('../benchmark/story-engine.mjs',import.meta.url),'utf8');
 const marker='if(handled===null)switch(id){';assert.ok(source.includes(marker));
 await writeFile(path,source.replace(marker,`if(handled===null&&${JSON.stringify(retired)}.includes(id))throw Error('Legacy fallback reached: '+id);\n ${marker}`));
 try{
  const e=await import(path.href+'?test='+Date.now()),story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8')),rng=random(1800),seen=new Set;
  for(let route=0;route<40;route++){
   const s=e.startState(story);let cursor=0,guard=0;
   while(cursor<story.nodes.length){assert.ok(guard++<4000,'routing must terminate');const n=story.nodes[cursor];if(e.blocked(n,s)){cursor++;continue}
    const opts=e.available(n,s);assert.ok(opts.length,n.id);let opt=n.id==='C05'?opts.find(o=>o.correct):opts[route===0?0:Math.floor(rng()*opts.length)];if(route===0){if(n.id==='K09')opt=opts.find(o=>o.id==='1')??opt;if(n.chapter===20)opt=opts.find(o=>o.correct||o.mark==='tracis')??opt;if(n.id==='C14')opt=opts.find(o=>o.id==='9')??opts.find(o=>o.id==='1')??opt;}
    e.apply(n,s,opt.id,route===0?0.999:rng());seen.add(n.id);cursor=e.nextCursor(story,cursor,n,s);
   }
  }
  // Cover retained IDs with meaningful old switch bodies, alongside removed scene IDs.
  for(const id of ['M02','C05a','C05','K02','C06','C07','C09','C10','C12','C13','M11','M12','C14','C16','C17'])assert.ok(seen.has(id),'override exercised: '+id);
 }finally{await unlink(path)}
});
