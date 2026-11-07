// What a rendered chapter flowchart puts on screen, read back from the SVG string as boxes, so tests can check what
// the eye sees: node boxes, text (sized with the chart's own width estimate and letter-spacing), every stroked line
// (wires, the taken path, brackets, group corner marks, ending corners) as thin segments, and group frames.
import {textWidth} from '../../src/lib/flowchart.js';
const attrs=s=>Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
const unesc=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
// Letter-spacing per text class, from FLOW_CSS (em).
const LS={'fc-cap':.02,'fc-cut':.08,'fc-big':.03,'fc-lane':.08};
function segments(d){const out=[];let x=0,y=0,sx=0,sy=0;const toks=d.match(/[MHVLZmhvlz]|-?\d*\.?\d+(?:e-?\d+)?/g)??[];let i=0,cmd='';
 const num=()=>parseFloat(toks[i++]);
 while(i<toks.length){if(/[A-Za-z]/.test(toks[i]))cmd=toks[i++];let nx=x,ny=y;
  switch(cmd){case 'M':x=sx=num();y=sy=num();cmd='L';continue;case 'm':x=sx=x+num();y=sy=y+num();cmd='l';continue;
   case 'H':nx=num();break;case 'h':nx=x+num();break;case 'V':ny=num();break;case 'v':ny=y+num();break;
   case 'L':nx=num();ny=num();break;case 'l':nx=x+num();ny=y+num();break;case 'Z':case 'z':nx=sx;ny=sy;break;default:i++;continue}
  out.push({x1:x,y1:y,x2:nx,y2:ny});x=nx;y=ny}
 return out}
export function svgGeometry(svg){const nodes=[],texts=[],lines=[],groups=[],stack=[];let inNode=null;const nodeOf=()=>stack.findLast(c=>/\bfc-(node|end|start)\b/.test(c))??null;
 for(const m of svg.matchAll(/<(g|\/g|rect|text|path)\b([^>]*)>(?:([^<]*)<\/text>)?/g)){const [,tag,raw,content]=m,a=attrs(raw);
  if(tag==='g'){stack.push(a.class??'');inNode=nodeOf();continue}
  if(tag==='/g'){stack.pop();inNode=nodeOf();continue}
  if(tag==='rect'){const r={x:+a.x,y:+a.y,w:+a.width,h:+a.height};if(a.class==='fc-box')nodes.push({...r,cls:inNode});else if(a.class==='fc-group')groups.push(r);continue}
  if(tag==='text'){if(content==null||inNode)continue;const size=+a['font-size']||10,t=unesc(content),cls=a.class??'';const ls=(LS[cls]??0)*size;
   texts.push({x:+a.x,y:+a.y-size*.8,w:textWidth(t,size,ls),h:size,text:t,cls});continue}
  if(tag==='path'){const c=a.class??'';if(!/fc-(wire|path|brk|group-edge|bracket|end-corner)\b/.test(c)||!a.d)continue;for(const s of segments(a.d))lines.push({...s,cls:c})}}
 return {nodes,texts,lines,groups}}
// Axis-aligned overlap with a tolerance (boxes touching or within `pad` of each other do not count).
export const overlaps=(a,b,pad=0)=>a.x<b.x+b.w-pad&&b.x<a.x+a.w-pad&&a.y<b.y+b.h-pad&&b.y<a.y+a.h-pad;
// A segment as a box one stroke wide.
export const segBox=s=>({x:Math.min(s.x1,s.x2)-.5,y:Math.min(s.y1,s.y2)-.5,w:Math.abs(s.x2-s.x1)+1,h:Math.abs(s.y2-s.y1)+1});
