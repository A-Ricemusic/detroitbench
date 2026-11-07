// Layout checks for a chapter flowchart, on what the rendered SVG draws (see tests/flowchart.test.mjs).
import {layoutBoxes,layoutChapter as layout,renderChapterSVG} from '../../src/lib/flowchart.js';
import {svgGeometry,overlaps,segBox} from './svg-geometry.mjs';
const shrink=(b,d)=>({x:b.x+d,y:b.y+d,w:b.w-2*d,h:b.h-2*d});
const inside=(a,o)=>a.x>=o.x-0.5&&a.y>=o.y-0.5&&a.x+a.w<=o.x+o.w+0.5&&a.y+a.h<=o.y+o.h+0.5;
export function flowProblems(flow,where){const problems=[];
 for(const showUntaken of [true,false]){const L=layout(flow,{showUntaken}),w=`${where}${showUntaken?'':' (taken only)'}`,{nodes,texts,lines,groups}=svgGeometry(renderChapterSVG(L));
  const label=t=>`"${t.text.slice(0,32)}"`,node=n=>`node at ${Math.round(n.x)},${Math.round(n.y)}`;
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(overlaps(nodes[i],nodes[j],.5))problems.push(`${w}: ${node(nodes[i])} overlaps ${node(nodes[j])}`);
  for(const t of texts){for(const n of nodes)if(overlaps(t,n,.5))problems.push(`${w}: text ${label(t)} sits on ${node(n)}`)}
  for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++)if(overlaps(texts[i],texts[j],.5))problems.push(`${w}: text ${label(texts[i])} overlaps ${label(texts[j])}`);
  for(const s of lines){const b=segBox(s);for(const n of nodes)if(overlaps(b,shrink(n,1.5)))problems.push(`${w}: ${s.cls} line ${Math.round(s.x1)},${Math.round(s.y1)}→${Math.round(s.x2)},${Math.round(s.y2)} crosses ${node(n)}`);
   for(const t of texts)if(overlaps(b,t,.5))problems.push(`${w}: ${s.cls} line crosses text ${label(t)}`)}
  for(const g of groups)for(const n of nodes)if(overlaps(n,g,.5)&&!inside(n,g))problems.push(`${w}: a group frame cuts through ${node(n)}`);
  const boxes=layoutBoxes(L);
  for(const c of boxes.filter(b=>b.kind==='cutin')){if(c.y<c.hubBottom+20)problems.push(`${w}: cut-in ${c.id} (with caption) starts within one option row of hub ${c.hub}`);
   const next=boxes.find(b=>b.kind==='cutin'&&b.hub===c.hub&&b.index===c.index+1);if(next&&next.x-(c.x+c.w)<150-0.5)problems.push(`${w}: cut-ins ${c.id} and ${next.id} are less than a column apart`)}
  for(const c of boxes.filter(b=>b.kind==='cutin-label')){const hub=boxes.find(b=>b.kind==='cutin'&&b.hub===c.id);if(hub&&c.y<hub.hubBottom+20)problems.push(`${w}: the CUT-IN caption under ${c.id} is within one option row of its last option`)}}
 return problems}
