// Chapter flowcharts in the manner of the game's own chapter chart, shared by the site (React wraps the
// SVG string) and the standalone run reports (generated in Bun). Framework-free: no imports, no DOM.
//
// Input is a chapter flow (see scripts/flow-data.mjs): lanes of columns in story order, each column one
// scene with its options marked taken, untaken, locked or unreached, followed by the lane's endings.
// Layout is a layered left-to-right DAG: each scene is a layer, consecutive scenes sharing a `phase`
// are framed as one bracketed group, option stacks are centred on the lane's spine, the taken path is
// routed orthogonally through the gaps between layers (and below any skipped layers), and endings fan
// out on the right. Colours come from --fc-* custom properties that each host maps onto its palette.

const PAD=20,GAP=40,NODE_W=164,EVENT_W=124,START_W=104,END_W=214,ROW_GAP=6,GRID_GAP=10,GROUP_PAD=14,GROUP_HEAD=40,CAPTION=18,LANE_GAP=34,LANE_LABEL=26,MAX_ROWS=6;
const LABEL=10,LABEL_LINE=12,LABEL_LS=.5,END_SIZE=11.5,END_LINE=14;

export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const r1=n=>Math.round(n*10)/10;

// Rough advance widths (em) for the sans fonts both hosts use; good enough to wrap labels without a DOM.
function textWidth(s,size,ls=0){let w=0;for(const ch of String(s)){w+=/[iIl.,:;'’!|j]/.test(ch)?.28:/[ ]/.test(ch)?.28:/[MW@]/.test(ch)?.9:/[mw]/.test(ch)?.82:/[A-Z0-9]/.test(ch)?.7:/[a-z]/.test(ch)?.55:.5;}return w*size+String(s).length*ls}
export function wrap(s,maxW,size,maxLines,ls=0){const words=String(s).split(/\s+/).filter(Boolean),lines=[];let line='';
 for(const w of words){const next=line?line+' '+w:w;if(line&&textWidth(next,size,ls)>maxW){lines.push(line);line=w}else line=next}
 if(line)lines.push(line);
 if(lines.length>maxLines){lines.length=maxLines;let l=lines[maxLines-1];while(l.length>1&&textWidth(l+'…',size,ls)>maxW)l=l.slice(0,-1);lines[maxLines-1]=l.replace(/[\s,;:]+$/,'')+'…'}
 return lines.map(l=>{if(textWidth(l,size,ls)<=maxW)return l;let x=l;while(x.length>1&&textWidth(x+'…',size,ls)>maxW)x=x.slice(0,-1);return x+'…'})}

// A short node label from an option sentence: the words before a colon ("Lie: tell him…" → "Lie"),
// otherwise the first clause, trimmed of a trailing "and …" or prepositional phrase when it runs long.
export function shortLabel(text){let s=String(text??'').replace(/[.!?]+$/u,'').trim();
 const colon=s.indexOf(':');if(colon>0&&colon<=30)return s.slice(0,colon);
 s=s.split(/[,;—–]| - /)[0].trim();
 if(s.length>40){const i=s.indexOf(' and ');if(i>=12)s=s.slice(0,i)}
 if(s.length>40){const m=/ (on|by|in|at|from|before|under|with|into|onto|through|toward|towards|for|to|over|across|behind) (the|a|an|his|her|your|their) /g;let x;while((x=m.exec(s))){if(x.index>=14){s=s.slice(0,x.index);break}}}
 return s}

// Ending icon from a short ending name, for endings the run did not reach (reached ones use state).
export function iconFor(text){const t=String(text);return /\bdied\b|\bdies\b|\bfell\b|\bkilled\b|\bdestroyed\b|shot (Connor|Kara|Markus)\b/i.test(t)?'death':/\bfail|\bjumped with\b|\blost\b|\bcaptured\b|\babandon/i.test(t)?'fail':'success'}

// Styles for the chart. Hosts define the --fc-* variables (light and dark) and include this once.
export const FLOW_CSS=`.fc{display:block;max-width:none;font-family:var(--fc-font,inherit);-webkit-tap-highlight-color:transparent}
.fc text{fill:var(--fc-ink)}.fc .fc-muted{fill:var(--fc-ink-3)}.fc .fc-soft{fill:var(--fc-ink-2)}
.fc .fc-title{font-weight:300;letter-spacing:.02em}.fc .fc-big{fill:var(--fc-ink-2);font-weight:300;letter-spacing:.03em}
.fc .fc-rule{stroke:var(--fc-ink-3);stroke-width:1}.fc .fc-bracket{fill:none;stroke:var(--fc-ink-3);stroke-width:1}
.fc .fc-group{fill:var(--fc-group);stroke:none}.fc .fc-group-edge{fill:none;stroke:var(--fc-ink-3);stroke-width:1.25}
.fc .fc-wire{fill:none;stroke:var(--fc-wire);stroke-width:1}.fc .fc-path{fill:none;stroke:var(--fc-accent);stroke-width:1.75;stroke-linejoin:round}
.fc .fc-box{fill:var(--fc-node);stroke:var(--fc-wire-strong);stroke-width:1}
.fc .fc-node text{fill:var(--fc-ink-2);font-weight:600;letter-spacing:.05em}
.fc .fc-node.is-taken .fc-box{fill:var(--fc-accent);stroke:var(--fc-accent)}.fc .fc-node.is-taken text{fill:var(--fc-on-accent)}
.fc .fc-node.is-taken .fc-mark{stroke:var(--fc-on-accent)}.fc .fc-mark{fill:none;stroke:var(--fc-ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.fc .fc-node.is-unreached .fc-box{fill:none;stroke-dasharray:3 3}.fc .fc-node.is-unreached text{fill:var(--fc-ink-3)}
.fc .fc-node.is-locked .fc-box{fill:none;stroke-dasharray:1 3}.fc .fc-node.is-locked text{fill:var(--fc-ink-3);font-weight:500}
.fc .fc-badge{fill:var(--fc-on-accent);opacity:.18}.fc .fc-node:not(.is-taken) .fc-badge{fill:var(--fc-ink-3);opacity:.16}
.fc .fc-node.is-taken text.fc-num{fill:var(--fc-on-accent)}
.fc .fc-start .fc-box{fill:var(--fc-accent);stroke:var(--fc-accent)}.fc .fc-start text{fill:var(--fc-on-accent);font-weight:600;letter-spacing:.06em}
.fc .fc-lane-dot{stroke:none}.fc .fc-lane text{font-weight:600;letter-spacing:.08em}
.fc .fc-end .fc-box{fill:var(--fc-node)}.fc .fc-end text{fill:var(--fc-ink-2);font-weight:600;letter-spacing:.04em}
.fc .fc-end.is-taken .fc-box{fill:var(--fc-accent);stroke:var(--fc-accent)}.fc .fc-end.is-taken text{fill:var(--fc-on-accent)}
.fc .fc-end.is-unreached .fc-box{fill:none;stroke-dasharray:3 3}.fc .fc-end.is-unreached text{fill:var(--fc-ink-3)}
.fc .fc-icon-box{stroke:none}.fc .ic-death{fill:var(--fc-bad)}.fc .ic-fail{fill:var(--fc-warn)}.fc .ic-success{fill:var(--fc-good)}
.fc .fc-icon{fill:var(--fc-icon-ink);stroke:var(--fc-icon-ink)}.fc .fc-icon .hole{fill:var(--fc-icon-hole);stroke:none}
.fc .fc-end.is-unreached .fc-icon-box,.fc .fc-end:not(.is-taken) .fc-icon-box{opacity:.55}
.fc [data-node]{cursor:pointer;outline:none}.fc [data-node]:hover .fc-box{stroke:var(--fc-ink);stroke-width:1.5}
.fc [data-node]:focus-visible .fc-box{stroke:var(--fc-focus);stroke-width:2.5}
.fc [data-node].is-selected .fc-box{stroke:var(--fc-focus);stroke-width:2.5}
.fc .fc-stat-label{fill:var(--fc-ink-3);letter-spacing:.06em}.fc .fc-stat-value{fill:var(--fc-ink);font-weight:600;letter-spacing:.06em}`;

// ---------- Layout ----------
const visibleColumns=(lane,all)=>lane.columns.filter(c=>all||c.visited).map(c=>{
 if(!c.options.length)return c;const options=all?c.options:c.options.filter(o=>o.taken);return {...c,options:options.length?options:c.options.slice(0,0)}});

function optionNodes(col){
 const rows=col.options.length>MAX_ROWS*1.5?Math.ceil(col.options.length/Math.ceil(col.options.length/MAX_ROWS)):col.options.length,cols=Math.max(1,Math.ceil(col.options.length/Math.max(rows,1)));
 const nodes=col.options.map(o=>{const badge=o.order!=null,inner=NODE_W-16-(badge?18:0)-(o.taken?14:0);const lines=wrap(o.label.toUpperCase(),inner,LABEL,3,LABEL_LS);return {o,lines,h:10+lines.length*LABEL_LINE,badge}});
 // Grid: fill top to bottom, then left to right; every row in a grid column shares the tallest height.
 const colH=[],rowsH=Array.from({length:rows},(_,i)=>Math.max(...nodes.filter((_,k)=>k%rows===i).map(n=>n.h)));
 let y=0;const rowY=rowsH.map(h=>{const v=y;y+=h+ROW_GAP;return v});const h=Math.max(0,y-ROW_GAP);
 nodes.forEach((n,k)=>{n.gx=Math.floor(k/rows)*(NODE_W+GRID_GAP);n.gy=rowY[k%rows]+(rowsH[k%rows]-n.h)/2});
 return {nodes,w:cols*NODE_W+(cols-1)*GRID_GAP,h,cols};
}

export function layoutChapter(flow,{showUntaken=true}={}){
 const lanes=[];let y=0;const header=headerLayout(flow);y=header.h;
 const multi=flow.lanes.length>1;
 for(const lane of flow.lanes){
  const cols=visibleColumns(lane,showUntaken),endings=lane.endings.filter(e=>showUntaken||e.taken);
  // Measure every column.
  const m=cols.map(c=>{if(!c.options.length){const lines=wrap(c.title.toUpperCase(),EVENT_W-16,LABEL,3,LABEL_LS);return {c,event:true,w:EVENT_W,h:10+lines.length*LABEL_LINE,lines}}
   const g=optionNodes(c);return {c,event:false,w:g.w,h:g.h,g}});
  const ends=endings.map(e=>{const lines=wrap(e.label.toUpperCase(),END_W-44,END_SIZE,3,.3);return {e,lines,h:Math.max(36,12+lines.length*END_LINE)}});
  const endH=ends.reduce((s,x)=>s+x.h,0)+Math.max(0,ends.length-1)*8;
  const hasGroup=cols.some(c=>c.phase),half=Math.max(11,endH/2,...m.map(x=>x.h/2));
  const top=y+(multi?LANE_LABEL:0),mid=top+(hasGroup?GROUP_HEAD+8:0)+CAPTION+half;
  // Horizontal pass: layers left to right, opening and closing phase groups.
  let x=PAD;const start={x,y:mid-11,w:START_W,h:22};x+=START_W+GAP;
  const groups=[];let open=null;
  m.forEach((col,i)=>{const phase=col.c.phase||null;
   if(phase&&(!open||open.phase!==phase)){if(open)closeGroup();const label=phase.replace(/[-_]/g,' ').toUpperCase();open={phase,label,x:x-GAP/2+4,cols:[],labelW:textWidth(label,22,.6)+34};x+=GROUP_PAD}
   else if(!phase&&open)closeGroup();
   col.x=x;col.y=mid-col.h/2;if(open)open.cols.push(col);x+=col.w+GAP;
   if(i===m.length-1&&open)closeGroup();});
  function closeGroup(){const g=open;open=null;const right=g.cols.at(-1).x+g.cols.at(-1).w+GROUP_PAD;let w=right-g.x;
   if(w<g.labelW){const extra=g.labelW-w;w=g.labelW;x+=extra}
   x+=GROUP_PAD;g.w=w;const tops=g.cols.map(c=>c.y),bots=g.cols.map(c=>c.y+c.h);g.y=Math.min(...tops)-CAPTION-GROUP_HEAD;g.h=Math.max(...bots)+GROUP_PAD-g.y;groups.push(g)}
  const endX=x+12;let ey=mid-endH/2;for(const e of ends){e.x=endX;e.y=ey;ey+=e.h+8}
  const width=endX+(ends.length?END_W:0)+PAD;
  const bottom=Math.max(mid+half,...groups.map(g=>g.y+g.h))+12;
  lanes.push({lane,top:y,labelY:top-8,mid,start,cols:m,groups,ends,width,bottom});
  y=bottom+LANE_GAP;
 }
 const width=Math.max(header.w,...lanes.map(l=>l.width));
 return {flow,header,lanes,width:Math.ceil(width),height:Math.ceil((lanes.at(-1)?.bottom??header.h)+PAD),showUntaken};
}

function headerLayout(flow){const w=Math.max(380,textWidth(flow.title.toUpperCase(),30,.6)+PAD*2+10);
 // Stat chips wrap onto extra rows only when they would run past a generous width.
 const chips=(flow.stats??[]).map(s=>({...s,w:textWidth(s.label.toUpperCase(),9.5,.6)+textWidth(s.value.toUpperCase(),9.5,.6)+26}));
 let cx=PAD,row=0;const maxW=Math.max(w,960);for(const c of chips){if(cx>PAD&&cx+c.w>maxW){row++;cx=PAD}c.x=cx;c.row=row;cx+=c.w+10}
 return {w:Math.max(w,...chips.map(c=>c.x+c.w+PAD)),h:104+(chips.length?row*22+8:0),chips}}

// ---------- SVG ----------
const check=(x,y)=>`<path class="fc-mark" d="M${r1(x)} ${r1(y)} l3 3 l5.5 -6.5"/>`;
const cross=(x,y)=>`<path class="fc-mark" d="M${r1(x)} ${r1(y-3.5)} l7 7 M${r1(x+7)} ${r1(y-3.5)} l-7 7"/>`;
const ICONS={
 death:(x,y)=>`<g class="fc-icon"><circle cx="${x}" cy="${y-1.5}" r="5" stroke="none"/><rect x="${x-3}" y="${y+1.5}" width="6" height="4" rx="1" stroke="none"/><circle class="hole" cx="${x-2}" cy="${y-1.5}" r="1.5"/><circle class="hole" cx="${x+2}" cy="${y-1.5}" r="1.5"/><rect class="hole" x="${x-.5}" y="${y+3}" width="1" height="2.5"/></g>`,
 fail:(x,y)=>`<g class="fc-icon" fill="none"><circle cx="${x}" cy="${y}" r="5.5" fill="none" stroke-width="1.8"/><path d="M${x-3.8} ${y+3.8} L${x+3.8} ${y-3.8}" stroke-width="1.8"/></g>`,
 success:(x,y)=>`<g class="fc-icon" fill="none"><path d="M${x-4.5} ${y} l3 3.2 l6 -6.8" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`};
const ICON_WORD={death:'a death',fail:'a failure',success:'success'};

function textLines(lines,x,y,size,lh,cls=''){return lines.map((l,i)=>`<text${cls?` class="${cls}"`:''} x="${r1(x)}" y="${r1(y+i*lh)}" font-size="${size}">${esc(l)}</text>`).join('')}
function nodeAttrs(key,label,interactive){return interactive&&key?` data-node="${esc(key)}" role="button" tabindex="0" aria-label="${esc(label)}"`:` role="img" aria-label="${esc(label)}"`}

function optionLabel(col,o){const scene=col.title.replace(/[.!?]+$/u,''),text=String(o.text).replace(/[.]$/u,'');
 if(!col.visited)return `${scene}, not reached on this path. Option: ${text}`;
 if(o.locked)return `${scene}. Not available on this path: ${text}`;
 if(!o.taken)return `${scene}. Not chosen: ${text}`;
 return `${scene}. ${o.order!=null?`Action ${o.order}: `:'Chose: '}${text}${o.risk?`. ${o.risk.label}, ${o.risk.outcome==='failure'?'failed':'succeeded'}`:''}${o.outcome?`. Outcome: ${o.outcome}`:''}`}

export function renderChapterSVG(L,{interactive=true,idPrefix='fc'}={}){
 const {flow,header,width,height}=L,out=[];const titleId=`${idPrefix}-${flow.chapter}-t`;
 out.push(`<svg xmlns="http://www.w3.org/2000/svg" class="fc" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-labelledby="${titleId}">`);
 // Header block: coverage, rule, title, character and the stat levels at chapter end.
 const pct=flow.total?Math.round(flow.visited/flow.total*100):0;
 out.push(`<text x="${PAD}" y="26" font-size="11.5" letter-spacing=".08em"><tspan font-weight="700">${pct}%</tspan><tspan class="fc-muted"> COMPLETED · ${flow.visited} OF ${flow.total} SCENES VISITED</tspan></text>`);
 out.push(`<line class="fc-rule" x1="${PAD}" y1="35.5" x2="${Math.min(width-PAD,PAD+420)}" y2="35.5"/>`);
 out.push(`<text id="${titleId}" class="fc-title" x="${PAD-1}" y="70" font-size="30" letter-spacing=".02em">${esc(flow.title.toUpperCase())}</text>`);
 out.push(`<text class="fc-muted" x="${PAD}" y="90" font-size="10" letter-spacing=".1em">CHAPTER ${String(flow.chapter).padStart(2,'0')} · ${esc(flow.lanes.map(l=>l.label.toUpperCase()).join(' · '))}</text>`);
 for(const c of header.chips){const cy=104+c.row*22;const lw=textWidth(c.label.toUpperCase(),9.5,.6);
  out.push(`<g role="img" aria-label="${esc(c.label+': '+c.value)}"><path class="fc-bracket" d="M${c.x+3} ${cy-8}h-3v14h3M${r1(c.x+c.w-3)} ${cy-8}h3v14h-3"/><text class="fc-stat-label" x="${c.x+8}" y="${cy+3}" font-size="9.5">${esc(c.label.toUpperCase())}</text><text class="fc-stat-value" x="${r1(c.x+16+lw)}" y="${cy+3}" font-size="9.5">${esc(c.value.toUpperCase())}</text></g>`)}
 for(const l of L.lanes)out.push(renderLane(l,{interactive,multi:flow.lanes.length>1,width}));
 out.push('</svg>');return out.join('')}

function renderLane(l,{interactive,multi,width}){const out=[],wires=[],path=[];const {mid,start,cols,groups,ends,lane}=l;
 out.push(`<g class="fc-lane-g" role="group" aria-label="${esc(lane.label)}">`);
 if(multi){out.push(`<g class="fc-lane"><circle class="fc-lane-dot" cx="${PAD+4}" cy="${l.labelY-3.5}" r="4" style="fill:${lane.color??'var(--fc-ink-3)'}"/><text x="${PAD+14}" y="${l.labelY}" font-size="10.5">${esc(lane.label.toUpperCase())}</text></g>`);
  if(l.top>0)out.push(`<line class="fc-wire" x1="${PAD}" y1="${l.top-LANE_GAP/2}" x2="${width-PAD}" y2="${l.top-LANE_GAP/2}" stroke-dasharray="2 4"/>`)}
 for(const g of groups){const {x,y,w,h}=g;out.push(`<rect class="fc-group" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"/><path class="fc-group-edge" d="M${r1(x)} ${r1(y+12)}v-12h12M${r1(x+w-12)} ${r1(y)}h12v12M${r1(x)} ${r1(y+h-12)}v12h12M${r1(x+w-12)} ${r1(y+h)}h12v-12"/>`);
  out.push(`<path class="fc-bracket" d="M${r1(x+12)} ${r1(y+12)}h-4v22h4"/><text class="fc-big" x="${r1(x+16)}" y="${r1(y+31)}" font-size="22">${esc(g.label)}</text>`)}
 // Start node.
 out.push(`<g class="fc-start"><rect class="fc-box" x="${start.x}" y="${start.y}" width="${start.w}" height="${start.h}"/><text x="${start.x+8}" y="${start.y+14.5}" font-size="${LABEL}">CHAPTER START</text></g>`);
 // Anchors for wiring: every column has an input bus on its left and an output bus on its right.
 let prevOut={x:start.x+start.w,y:mid},taken={x:start.x+start.w,y:mid},pending=[];
 const nodes=[];
 cols.forEach((col,i)=>{const c=col.c,x=col.x,y=col.y;
  // Caption: the scene title above the stack.
  const cap=wrap(c.title,Math.max(col.w,EVENT_W),10,1)[0];
  if(!col.event)out.push(`<text class="${c.visited?'fc-soft':'fc-muted'}" x="${r1(x)}" y="${r1(y-7)}" font-size="10" aria-hidden="true">${esc(cap)}</text>`);
  if(col.event){const cls='fc-node'+(c.visited?' is-taken':' is-unreached'),label=`${c.title.replace(/[.!?]+$/u,'')}${c.visited?(c.outcome?'. '+c.outcome:''):', not reached on this path'}`;
   nodes.push(`<g class="${cls}"${nodeAttrs(c.key,label,interactive)}><rect class="fc-box" x="${r1(x)}" y="${r1(y)}" width="${col.w}" height="${col.h}"/>${textLines(col.lines,x+8,y+14.5,LABEL,LABEL_LINE)}${c.visited?check(x+col.w-14,y+col.h/2):''}</g>`);
   wires.push(`M${r1(prevOut.x)} ${r1(mid)}H${r1(x)}`);prevOut={x:x+col.w,y:mid};
   if(c.visited){path.push(route(taken,{x,y:mid},pending));taken={x:x+col.w,y:mid};pending=[]}else pending.push(col);
   return}
  const g=col.g,inX=x-8,outX=x+col.w+8;
  // Buses and ticks.
  const ys=g.nodes.map(n=>y+n.gy+n.h/2),gridCols=g.cols;
  if(ys.length){wires.push(`M${r1(prevOut.x)} ${r1(mid)}H${r1(inX)}`);
   const lo=Math.min(...ys,mid),hi=Math.max(...ys,mid);wires.push(`M${r1(inX)} ${r1(lo)}V${r1(hi)}`,`M${r1(outX)} ${r1(lo)}V${r1(hi)}`);
   for(const n of g.nodes){const ny=y+n.gy+n.h/2;if(n.gx===0)wires.push(`M${r1(inX)} ${r1(ny)}H${r1(x)}`);if(n.gx+NODE_W>=g.w-1)wires.push(`M${r1(x+g.w)} ${r1(ny)}H${r1(outX)}`)}}
  prevOut={x:outX,y:mid};
  for(const n of g.nodes){const o=n.o,nx=x+n.gx,ny=y+n.gy,cls='fc-node'+(o.taken?' is-taken':'')+(!c.visited?' is-unreached':o.locked?' is-locked':'');
   const tx=nx+8+(n.badge?18:0),mark=o.taken?(o.risk?.outcome==='failure'?cross(nx+NODE_W-14,ny+n.h/2):check(nx+NODE_W-15,ny+n.h/2)):'';
   const badge=n.badge?`<rect class="fc-badge" x="${r1(nx+4)}" y="${r1(ny+4)}" width="14" height="${n.h-8}"/><text class="fc-num" x="${r1(nx+11)}" y="${r1(ny+n.h/2+3.5)}" font-size="9.5" text-anchor="middle">${o.order}</text>`:'';
   nodes.push(`<g class="${cls}"${nodeAttrs(o.key??c.key,optionLabel(c,o),interactive)}><title>${esc(o.text)}</title><rect class="fc-box" x="${r1(nx)}" y="${r1(ny)}" width="${NODE_W}" height="${n.h}"/>${badge}${textLines(n.lines,tx,ny+14.5,LABEL,LABEL_LINE)}${mark}</g>`)}
  // Taken path: into the first taken node, out of the last one (a repeatable scene keeps its visit order in the badges).
  const t=g.nodes.filter(n=>n.o.taken).sort((a,b)=>(a.o.order??0)-(b.o.order??0));
  if(c.visited&&t.length){const first=t[0],last=t.at(-1);path.push(route(taken,{x:x+first.gx,y:y+first.gy+first.h/2},pending));
   if(t.length>1&&gridCols>1)for(let k=1;k<t.length;k++){/* visit order shown by badges; no inner wiring */}
   taken={x:x+g.w,y:y+last.gy+last.h/2,fromX:x+last.gx+NODE_W};pending=[]}
  else if(!c.visited)pending.push(col)});
 // Endings fan.
 if(ends.length){const inX=ends[0].x-12,ys=ends.map(e=>e.y+e.h/2);wires.push(`M${r1(prevOut.x)} ${r1(mid)}H${r1(inX)}`,`M${r1(inX)} ${r1(Math.min(...ys,mid))}V${r1(Math.max(...ys,mid))}`);
  for(const e of ends){const ey=e.y+e.h/2;wires.push(`M${r1(inX)} ${r1(ey)}H${r1(e.x)}`);
   const cls='fc-end'+(e.e.taken?' is-taken':' is-unreached'),label=`Chapter ending${e.e.taken?'':' not reached'}: ${e.e.text||e.e.label} (${ICON_WORD[e.e.icon]})`;
   nodes.push(`<g class="${cls}"${nodeAttrs(e.e.key,label,interactive&&e.e.taken)}><title>${esc(e.e.text||e.e.label)}</title><rect class="fc-box" x="${r1(e.x)}" y="${r1(e.y)}" width="${END_W}" height="${e.h}"/><rect class="fc-icon-box ic-${e.e.icon}" x="${r1(e.x+6)}" y="${r1(ey-11)}" width="22" height="22"/>${ICONS[e.e.icon](e.x+17,ey)}${textLines(e.lines,e.x+36,ey-(e.lines.length-1)*END_LINE/2+4,END_SIZE,END_LINE)}</g>`);
   if(e.e.taken)path.push(route(taken,{x:e.x,y:ey},pending))}}
 out.push(`<path class="fc-wire" d="${wires.join('')}"/>`,`<path class="fc-path" d="${path.join('')}"/>`,...nodes,'</g>');
 return out.join('')}

// Orthogonal route from the previous taken anchor to the next one. Skipped layers in between are passed
// underneath, so the path never crosses a stack it did not go through.
function route(a,b,skipped){const sx=a.fromX??a.x;let d=a.fromX&&a.fromX<a.x?`M${r1(sx)} ${r1(a.y)}H${r1(a.x)}`:`M${r1(a.x)} ${r1(a.y)}`;
 if(!skipped.length){if(Math.abs(a.y-b.y)<.5)return d+`H${r1(b.x)}`;const xm=b.x-GAP/2+2;return d+`H${r1(xm)}V${r1(b.y)}H${r1(b.x)}`}
 const below=Math.max(...skipped.map(c=>c.y+c.h))+14,x1=a.x+GAP/2-4,x2=b.x-GAP/2+4;
 return d+`H${r1(x1)}V${r1(below)}H${r1(x2)}V${r1(b.y)}H${r1(b.x)}`}

export function chapterSVG(flow,opts={}){return renderChapterSVG(layoutChapter(flow,opts),opts)}
