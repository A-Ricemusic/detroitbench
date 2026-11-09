// Chapter flowcharts in the manner of the game's own chapter chart, shared by the site (React wraps the
// SVG string) and the standalone run reports (generated in Bun). Framework-free: no imports, no DOM.
//
// Input is a chapter flow (see scripts/flow-data.mjs): lanes of scene columns in story order, each with its options
// marked taken, untaken, locked or unreached, and the lane's endings. Layout, left to right along one spine per lane:
//  - a decision or media scene is a stack of option nodes between two thin brackets; the chosen one is filled and
//    checked (crossed when a risky action failed);
//  - an event scene is one small node;
//  - a repeatable scene (`kind: 'hub'`) is a grid of every option in a bracketed group, the taken ones filled and
//    numbered in visit order, and the scenes its interrupt cut in hang below it as a branch that rejoins the hub;
//  - consecutive scenes sharing a phase are framed as one group with a large thin label;
//  - the endings sit in a column on the right, every ending the chapter can produce, the reached one filled.
// Grey wires run along the spine; the taken path is routed orthogonally through the gaps (and under any scene it
// skipped). Colours come from --fc-* custom properties that each host maps onto its palette.

const PAD=20,GAP=30,BRK=9,NODE_W=150,EVENT_W=132,START_W=120,END_W=236,ROW_GAP=3,GRID_GAP=10,GROUP_PAD=14,CAPTION=15,LANE_GAP=40,LANE_LABEL=28,MAX_ROWS=7,CUT_GAP=60,CUT_LABEL=31,CHAIN_GAP=NODE_W,END_GAP=12;
const LABEL=11,LABEL_LINE=13,LABEL_LS=.3,END_SIZE=11.5,END_LINE=14,BIG=22,BIG_LINE=24,HEAD_TOP=110;

export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const r1=n=>Math.round(n*10)/10;

// Rough advance widths (em) for the sans fonts both hosts use; good enough to wrap labels without a DOM.
export function textWidth(s,size,ls=0){let w=0;for(const ch of String(s)){w+=/[iIl.,:;'’!|j]/.test(ch)?.28:/[ ]/.test(ch)?.28:/[MW@]/.test(ch)?.9:/[mw]/.test(ch)?.82:/[A-Z0-9&]/.test(ch)?.7:/[a-z]/.test(ch)?.55:.5;}return w*size+String(s).length*ls}
export function wrap(s,maxW,size,maxLines,ls=0){const W=t=>textWidth(t,size,ls),fit=t=>W(t)<=maxW;
 // Tokens: words, split after hyphens; a piece still too wide for a line is cut into chunks that fit, so a long word
 // continues on the next line instead of being clipped. `sp` marks a token that follows a space.
 const toks=[];for(const w of String(s).split(/\s+/).filter(Boolean)){const parts=w.match(/[^-]+-*|-+/g)??[w];
  parts.forEach((p,i)=>{let sp=i===0;while(p.length>1&&!fit(p)){let k=p.length-1;while(k>1&&!fit(p.slice(0,k)))k--;toks.push({t:p.slice(0,k),sp});sp=false;p=p.slice(k)}toks.push({t:p,sp})})}
 const lines=[];let line='';for(const k of toks){const next=line?line+(k.sp?' ':'')+k.t:k.t;if(line&&!fit(next)){lines.push(line);line=k.t}else line=next}
 if(line)lines.push(line);
 if(lines.length>maxLines){lines.length=maxLines;let l=lines[maxLines-1];
  // Ellipsize after the last line, dropping whole words while the line has more than one.
  while(!fit(l+'…')&&/\s/.test(l))l=l.replace(/\s+\S*$/,'');while(l.length>1&&!fit(l+'…'))l=l.slice(0,-1);lines[maxLines-1]=l.replace(/[\s,;:]+$/,'')+'…'}
 return lines}

// A short node label from an option sentence: the words before a colon ("Lie: tell him…" → "Lie"),
// otherwise the first clause, trimmed of a trailing "and …" or prepositional phrase when it runs long.
export function shortLabel(text){let s=String(text??'').replace(/[.!?]+$/u,'').trim();
 const colon=s.indexOf(':');if(colon>0&&colon<=30)return s.slice(0,colon);
 s=s.split(/[,;—–]| - /)[0].trim();
 if(s.length>40){const i=s.indexOf(' and ');if(i>=12)s=s.slice(0,i)}
 if(s.length>40){const m=/ (on|by|in|at|from|before|under|with|into|onto|through|toward|towards|for|to|over|across|behind) (the|a|an|his|her|your|their) /g;let x;while((x=m.exec(s))){if(x.index>=14){s=s.slice(0,x.index);break}}}
 return s}

// Ending icon from an ending name, as the game marks its ending tiles: a skull when a main character dies, a
// no-entry sign when the mission fails or someone is lost, a check otherwise. The reached ending also uses state.
const PEOPLE='Connor|Kara|Alice|Markus|Hank|Luther|North|Simon|Josh|Emma|Carl';
const DEATH=new RegExp(`\\b(died|dies|killed|kills|destroyed|executed|suicide|was (?:ambushed and )?shot|shut down|gunned|fell|deactivated)\\b|\\bshot (${PEOPLE})\\b|\\bbroke (Kara|Markus|Connor)\\b|\\bsacrificed\\b`,'i');
const FAIL=/\bfail|\bunsolved\b|\bnot found\b|\bgot away\b|\blost\b|\bcaptured\b|\babandon|\bleft behind\b|\bjumped with\b|\bdecommission|\bmistook\b|\baccused\b|\barrested\b|\breset\b|\bfled\b|\bretreat\b/i;
export function iconFor(text){const t=String(text);return DEATH.test(t)?'death':FAIL.test(t)?'fail':'success'}

// Styles for the chart. Hosts define the --fc-* variables (light and dark) and include this once.
// --fc-take / --fc-on-take / --fc-path colour the taken nodes and the path; they fall back to --fc-accent.
export const FLOW_CSS=`.fc{display:block;max-width:none;font-family:var(--fc-font,inherit);-webkit-tap-highlight-color:transparent}
.fc text{fill:var(--fc-ink)}.fc .fc-muted{fill:var(--fc-ink-3)}.fc .fc-soft{fill:var(--fc-ink-2)}
.fc .fc-title{font-weight:300;letter-spacing:.02em}.fc .fc-big{fill:var(--fc-ink-2);font-weight:300;letter-spacing:.03em}
.fc .fc-rule{stroke:var(--fc-ink-3);stroke-width:1}.fc .fc-bracket{fill:none;stroke:var(--fc-ink-3);stroke-width:1}
.fc .fc-group{fill:var(--fc-group);stroke:none}.fc .fc-group-edge{fill:none;stroke:var(--fc-ink-3);stroke-width:1.25}
.fc .fc-wire{fill:none;stroke:var(--fc-wire);stroke-width:1}.fc .fc-port{fill:var(--fc-wire-strong)}
.fc .fc-path{fill:none;stroke:var(--fc-path,var(--fc-accent));stroke-width:1.75;stroke-linejoin:round}.fc .fc-port.on{fill:var(--fc-path,var(--fc-accent))}
.fc .fc-brk{fill:none;stroke:var(--fc-wire-strong);stroke-width:1}.fc .fc-brk.on{stroke:var(--fc-path,var(--fc-accent));stroke-width:1.5}
.fc .fc-arrow{fill:var(--fc-wire-strong)}.fc .fc-arrow.on{fill:var(--fc-path,var(--fc-accent))}
.fc .fc-box{fill:var(--fc-node);stroke:var(--fc-wire-strong);stroke-width:1}
.fc .fc-node text{fill:var(--fc-ink-2);font-weight:600;letter-spacing:.05em}
.fc .fc-node.is-taken .fc-box{fill:var(--fc-take,var(--fc-accent));stroke:var(--fc-take,var(--fc-accent))}.fc .fc-node.is-taken text{fill:var(--fc-on-take,var(--fc-on-accent))}
.fc .fc-node.is-taken .fc-mark{stroke:var(--fc-on-take,var(--fc-on-accent))}.fc .fc-mark{fill:none;stroke:var(--fc-ink-2);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.fc .fc-glyph{fill:none;stroke:var(--fc-ink-3);stroke-width:1.2;stroke-linejoin:round}.fc .fc-node.is-taken .fc-glyph{stroke:var(--fc-on-take,var(--fc-on-accent))}
.fc .fc-node.is-unreached .fc-box{fill:none;stroke-dasharray:3 3}.fc .fc-node.is-unreached text{fill:var(--fc-ink-3);font-weight:500}
.fc .fc-node.is-locked .fc-box{fill:none;stroke-dasharray:1 3}.fc .fc-node.is-locked text{fill:var(--fc-ink-3);font-weight:500}
.fc .fc-badge{fill:var(--fc-on-take,var(--fc-on-accent));opacity:.2}.fc .fc-node.is-taken text.fc-num{fill:var(--fc-on-take,var(--fc-on-accent));font-weight:700;letter-spacing:0}
.fc .fc-start .fc-box{fill:var(--fc-take,var(--fc-accent));stroke:var(--fc-take,var(--fc-accent))}.fc .fc-start text{fill:var(--fc-on-take,var(--fc-on-accent));font-weight:600;letter-spacing:.06em}
.fc .fc-lane-dot{stroke:none}.fc .fc-lane text{font-weight:600;letter-spacing:.08em}
.fc .fc-cap{fill:var(--fc-ink-3);letter-spacing:.02em}.fc .fc-cap.on{fill:var(--fc-ink-2)}.fc .fc-cut{fill:var(--fc-ink-3);font-weight:600;letter-spacing:.08em}
.fc .fc-end .fc-box{fill:var(--fc-node)}.fc .fc-end text{fill:var(--fc-ink-2);font-weight:500;letter-spacing:.04em}
.fc .fc-end.is-taken .fc-box{fill:var(--fc-take,var(--fc-accent));stroke:var(--fc-take,var(--fc-accent))}.fc .fc-end.is-taken text{fill:var(--fc-on-take,var(--fc-on-accent));font-weight:600}
.fc .fc-end.is-unreached .fc-box{fill:none;stroke-dasharray:3 3}.fc .fc-end.is-other .fc-box{fill:none}.fc .fc-end:not(.is-taken) text{fill:var(--fc-ink-3)}.fc .fc-end-corner{fill:none;stroke:var(--fc-ink-3);stroke-width:1.25}.fc .fc-end.is-taken .fc-end-corner{stroke:var(--fc-path,var(--fc-accent))}
.fc .fc-icon-box{stroke:none}.fc .ic-death{fill:var(--fc-bad)}.fc .ic-fail{fill:var(--fc-warn)}.fc .ic-success{fill:var(--fc-good)}
.fc .fc-icon{fill:var(--fc-icon-ink);stroke:var(--fc-icon-ink)}.fc .fc-icon .hole{fill:var(--fc-icon-hole);stroke:none}
.fc .fc-end:not(.is-taken) .fc-icon-box{opacity:.6}
.fc [data-node]{cursor:pointer;outline:none}.fc [data-node]:hover .fc-box{stroke:var(--fc-ink);stroke-width:1.5}
.fc [data-node]:focus-visible .fc-box{stroke:var(--fc-focus);stroke-width:2.5}
.fc [data-node].is-selected .fc-box{stroke:var(--fc-focus);stroke-width:2.5}
.fc .fc-stat-label{fill:var(--fc-ink-3);letter-spacing:.06em}.fc .fc-stat-value{fill:var(--fc-ink);font-weight:600;letter-spacing:.06em}`;

// ---------- Measuring ----------
const nodeH=lines=>lines.length>1?8+lines.length*LABEL_LINE:20;
// Options as a grid: one column up to MAX_ROWS rows, then as many columns as needed, filled top to bottom.
function grid(options,{badges=false}={}){
 const n=options.length,cols=Math.max(1,Math.ceil(n/MAX_ROWS)),rows=Math.max(1,Math.ceil(n/cols));
 const nodes=options.map(o=>{const badge=badges&&o.taken&&o.orders?.length>0,num=badge?o.orders.join(','):'',bw=badge?Math.max(14,textWidth(num,11)+6):0;
  const lines=wrap(o.label.toUpperCase(),NODE_W-14-(bw?bw+4:0)-(o.taken?14:0),LABEL,3,LABEL_LS);return {o,lines,h:nodeH(lines),badge,num,bw}});
 const rowsH=Array.from({length:rows},(_,i)=>Math.max(0,...nodes.filter((_,k)=>k%rows===i).map(x=>x.h)));
 let y=0;const rowY=rowsH.map(h=>{const v=y;y+=h+ROW_GAP;return v});const h=Math.max(20,y-ROW_GAP);
 nodes.forEach((x,k)=>{x.gx=Math.floor(k/rows)*(NODE_W+GRID_GAP);x.gy=rowY[k%rows]+(rowsH[k%rows]-x.h)/2;x.col=Math.floor(k/rows)});
 return {nodes,w:cols*NODE_W+(cols-1)*GRID_GAP,h,cols}}

const visibleOptions=(c,all)=>all||!c.visited?c.options:c.options.filter(o=>o.taken);
// One scene as a block centred on the spine: `up`/`down` are its extents above and below the spine.
function measure(c,all,chain=[]){
 if(c.kind==='event'||!c.options.length){const label=(c.chartLabel??c.title).toUpperCase(),lines=wrap(label,EVENT_W-26,LABEL,3,LABEL_LS),h=nodeH(lines);
  return {c,type:'event',w:EVENT_W,h,up:h/2,down:h/2,lines}}
 const g=grid(visibleOptions(c,all),{badges:c.kind==='hub'});
 const b={c,type:c.kind==='hub'?'hub':'stack',g,w:g.w,h:g.h,up:g.h/2,down:g.h/2,caption:true};
 if(b.type==='hub'&&chain.length){b.chain=chain.map(x=>measure(x,all));const cw=b.chain.reduce((s,x)=>s+x.w+2*BRK,0)+(b.chain.length-1)*CHAIN_GAP+40;
  b.chainUp=Math.max(...b.chain.map(x=>x.up+(x.type==='stack'?CAPTION:0)));b.chainDown=Math.max(...b.chain.map(x=>x.down));
  b.w=Math.max(b.w,cw);b.down=g.h/2+CUT_GAP+b.chainUp+b.chainDown}
 return b}

const groupLabel=p=>String(p).replace(/[-_]+/g,' ').toUpperCase();
export function layoutChapter(flow,{showUntaken=true}={}){
 const header=headerLayout(flow);let y=header.h;const lanes=[],multi=flow.lanes.length>1;
 for(const lane of flow.lanes){
  const cols=lane.columns.filter(c=>showUntaken||c.visited);
  const chains=new Map;for(const c of cols)if(c.cutinOf){if(!chains.has(c.cutinOf))chains.set(c.cutinOf,[]);chains.get(c.cutinOf).push(c)}
  const blocks=cols.filter(c=>!c.cutinOf||!cols.some(h=>h.id===c.cutinOf)).map(c=>measure(c,showUntaken,chains.get(c.id)??[]));
  // Group runs: consecutive blocks sharing a phase; a hub outside any phase is a group of its own, named after it.
  const runs=[];for(const b of blocks){const key=b.c.phase?'phase:'+b.c.phase:b.type==='hub'?'hub:'+b.c.id:null,last=runs.at(-1);
   if(key&&last?.key===key)last.blocks.push(b);else runs.push({key,label:key?(b.c.phase?groupLabel(b.c.phase):b.c.title.toUpperCase()):null,blocks:[b]})}
  for(const r of runs)if(r.key){const hubOnly=r.blocks.length===1&&r.blocks[0].type==='hub'&&r.label===r.blocks[0].c.title.toUpperCase();if(hubOnly)r.blocks[0].caption=false}
  const ends=lane.endings.filter(e=>showUntaken||e.taken).map(e=>{const lines=wrap(e.label.toUpperCase(),END_W-46,END_SIZE,3,.3);return {e,lines,h:Math.max(34,14+lines.length*END_LINE)}});
  const endH=ends.reduce((s,x)=>s+x.h,0)+Math.max(0,ends.length-1)*END_GAP;
  // Horizontal pass.
  let x=PAD+START_W+GAP;
  for(const r of runs){
   if(r.key){r.x=x;x+=GROUP_PAD;}
   r.blocks.forEach((b,i)=>{if(i)x+=GAP;b.x=x+BRK;x+=b.w+2*BRK});
   if(r.key){const content=x-r.x-GROUP_PAD,labelW=Math.max(content,200);r.lines=wrap(r.label,labelW,BIG,3,.6);
    const need=Math.max(...r.lines.map(l=>textWidth(l,BIG,.6)))+24;let w=x+GROUP_PAD-r.x;
    if(w<need){const shift=(need-w)/2;for(const b of r.blocks)b.x+=shift;w=need}r.w=w;x=r.x+w}
   x+=GAP}
  // Vertical pass: everything hangs off one spine.
  const headOf=r=>r.key?10+r.lines.length*BIG_LINE+8:0;
  const upOf=b=>b.up+(b.caption&&b.type!=='event'?CAPTION:0);
  let up=Math.max(11,endH/2),down=Math.max(11,endH/2);
  for(const r of runs){const u=Math.max(...r.blocks.map(upOf)),d=Math.max(...r.blocks.map(b=>b.down));r.up=u;r.down=d;
   up=Math.max(up,u+(r.key?headOf(r)+GROUP_PAD:0));down=Math.max(down,d+(r.key?GROUP_PAD:0))}
  const top=y+(multi?LANE_LABEL:0),mid=top+up+4;
  for(const r of runs)if(r.key){r.y=mid-r.up-GROUP_PAD-headOf(r);r.h=mid+r.down+GROUP_PAD-r.y}
  for(const b of blocks){b.y=mid-b.h/2;
   if(b.chain){const rowMid=mid+b.h/2+CUT_GAP+b.chainUp;let cx=b.x+20+BRK;b.rowMid=rowMid;for(const k of b.chain){k.x=cx;k.y=rowMid-k.h/2;cx+=k.w+2*BRK+CHAIN_GAP}}}
  const endX=x+16;let ey=mid-endH/2;for(const e of ends){e.x=endX;e.y=ey;ey+=e.h+END_GAP}
  const width=endX+(ends.length?END_W:0)+PAD,bottom=mid+down+12;
  lanes.push({lane,top:y,labelY:top-10,mid,start:{x:PAD,y:mid-11,w:START_W,h:22},blocks,runs,ends,width,bottom});
  y=bottom+LANE_GAP}
 const width=Math.max(header.w,...lanes.map(l=>l.width));
 return {flow,header,lanes,width:Math.ceil(width),height:Math.ceil((lanes.at(-1)?.bottom??header.h)+PAD),showUntaken}}

// The boxes a laid-out chapter draws, for overlap checks (tests/flowchart.test.mjs): every scene block with its brackets
// and caption, every cut-in block, the "CUT-IN" label, the endings, and each group frame with the blocks it holds.
export function layoutBoxes(L){const out=[];
 for(const [li,l] of L.lanes.entries()){
  const box=(b,kind,extra={})=>{if(b.type==='event')return {kind,id:b.c.id,lane:li,x:b.x-BRK,y:b.y,w:b.w+2*BRK,h:b.h,...extra};
   const gx=b.x+(b.w-b.g.w)/2,capH=b.caption?CAPTION:0;return {kind,id:b.c.id,lane:li,x:gx-BRK,y:b.y-2-capH,w:b.g.w+2*BRK,h:b.g.h+4+capH,...extra}};
  for(const b of l.blocks){const hb=box(b,'block');out.push(hb);
   if(b.chain){const gx=b.x+(b.w-b.g.w)/2;out.push({kind:'cutin-label',id:b.c.id,lane:li,x:gx-6+10,y:b.y+b.g.h+CUT_LABEL-11*.8,w:textWidth('CUT-IN · AFTER 10',11,.7),h:11});
    b.chain.forEach((k,i)=>out.push(box(k,'cutin',{hub:b.c.id,index:i,hubBottom:b.y+b.g.h})))}}
  for(const e of l.ends)out.push({kind:'end',id:e.e.label,lane:li,x:e.x-4,y:e.y-3,w:END_W+8,h:e.h+6});
  for(const r of l.runs)if(r.key)out.push({kind:'group',id:r.key,lane:li,x:r.x,y:r.y,w:r.w,h:r.h,members:r.blocks.flatMap(b=>[b.c.id,...(b.chain??[]).map(k=>k.c.id)])})}
 return out}

function headerLayout(flow){const w=Math.max(380,textWidth(flow.title.toUpperCase(),30,.6)+PAD*2+10);
 // Stat chips wrap onto extra rows only when they would run past a generous width.
 const chips=(flow.stats??[]).map(s=>({...s,w:textWidth(s.label.toUpperCase(),11,.6)+textWidth(s.value.toUpperCase(),11,.6)+26}));
 let cx=PAD,row=0;const maxW=Math.max(w,960);for(const c of chips){if(cx>PAD&&cx+c.w>maxW){row++;cx=PAD}c.x=cx;c.row=row;cx+=c.w+10}
 return {w:Math.max(w,...chips.map(c=>c.x+c.w+PAD)),h:HEAD_TOP+(chips.length?row*22+18:0),chips}}

// ---------- SVG ----------
const check=(x,y)=>`<path class="fc-mark" d="M${r1(x)} ${r1(y)} l3 3 l5.5 -6.5"/>`;
const cross=(x,y)=>`<path class="fc-mark" d="M${r1(x)} ${r1(y-3.5)} l7 7 M${r1(x+7)} ${r1(y-3.5)} l-7 7"/>`;
const triangle=(x,y)=>`<path class="fc-glyph" d="M${r1(x)} ${r1(y+3.5)} l4 -7 l4 7 z"/>`;
const ICONS={
 death:(x,y)=>`<g class="fc-icon"><circle cx="${x}" cy="${y-1.5}" r="5" stroke="none"/><rect x="${x-3}" y="${y+1.5}" width="6" height="4" rx="1" stroke="none"/><circle class="hole" cx="${x-2}" cy="${y-1.5}" r="1.5"/><circle class="hole" cx="${x+2}" cy="${y-1.5}" r="1.5"/><rect class="hole" x="${x-.5}" y="${y+3}" width="1" height="2.5"/></g>`,
 fail:(x,y)=>`<g class="fc-icon" fill="none"><circle cx="${x}" cy="${y}" r="5.5" fill="none" stroke-width="1.8"/><path d="M${x-3.8} ${y+3.8} L${x+3.8} ${y-3.8}" stroke-width="1.8"/></g>`,
 success:(x,y)=>`<g class="fc-icon" fill="none"><path d="M${x-4.5} ${y} l3 3.2 l6 -6.8" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`};
const ICON_WORD={death:'a death',fail:'a failure',success:'success'};

function textLines(lines,x,y,size,lh,cls=''){return lines.map((l,i)=>`<text${cls?` class="${cls}"`:''} x="${r1(x)}" y="${r1(y+i*lh)}" font-size="${size}">${esc(l)}</text>`).join('')}
function nodeAttrs(key,label,interactive){return interactive&&key?` data-node="${esc(key)}" role="button" tabindex="0" aria-label="${esc(label)}"`:` role="img" aria-label="${esc(label)}"`}
const port=(x,y,on)=>`<rect class="fc-port${on?' on':''}" x="${r1(x-1.5)}" y="${r1(y-1.5)}" width="3" height="3"/>`;
// A thin bracket beside a stack: `side` -1 opens to the right (left bracket), 1 to the left.
const bracket=(x,y0,y1,side,on)=>`<path class="fc-brk${on?' on':''}" d="M${r1(x-side*3)} ${r1(y0)}H${r1(x)}V${r1(y1)}H${r1(x-side*3)}"/>`;

function optionLabel(c,o){const scene=c.title.replace(/[.!?]+$/u,''),text=String(o.text).replace(/[.]$/u,'');
 if(!c.visited)return `${scene}, not reached on this path. Option: ${text}`;
 if(o.locked)return `${scene}. Not available on this path: ${text}`;
 if(!o.taken)return `${scene}. Not chosen: ${text}`;
 const act=o.orders?.length?`${o.orders.length>1?'Actions':'Action'} ${o.orders.join(', ')}: `:'Chose: ';
 return `${scene}. ${act}${text}${o.risk?`. ${o.risk.label}, ${o.risk.outcome==='failure'?'failed':'succeeded'}`:''}${o.outcome?`. Outcome: ${o.outcome}`:''}`}

export function renderChapterSVG(L,{interactive=true,idPrefix='fc'}={}){
 const {flow,header,width,height}=L,out=[];const titleId=`${idPrefix}-${flow.chapter}-t`;
 out.push(`<svg xmlns="http://www.w3.org/2000/svg" class="fc" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-labelledby="${titleId}">`);
 // Header block: coverage, rule, title, characters and the stat levels at chapter end.
 const pct=flow.total?Math.round(flow.visited/flow.total*100):0;
 out.push(`<text x="${PAD}" y="28" font-size="11.5" letter-spacing=".08em" aria-label="${pct}% completed: ${flow.visited} of ${flow.total} scenes visited"><tspan font-weight="700">${pct}%</tspan><tspan class="fc-muted"> COMPLETED</tspan><tspan class="fc-muted" font-size="11"> · ${flow.visited} OF ${flow.total} SCENES</tspan></text>`);
 out.push(`<line class="fc-rule" x1="${PAD}" y1="37.5" x2="${Math.min(width-PAD,PAD+440)}" y2="37.5"/>`);
 out.push(`<text id="${titleId}" class="fc-title" x="${PAD-1}" y="72" font-size="30">${esc(flow.title.toUpperCase())}</text>`);
 out.push(`<text class="fc-muted" x="${PAD}" y="92" font-size="11" letter-spacing=".1em">CHAPTER ${String(flow.chapter).padStart(2,'0')} · ${esc(flow.lanes.map(l=>l.label.toUpperCase()).join(' · '))}</text>`);
 for(const c of header.chips){const cy=HEAD_TOP+4+c.row*22;const lw=textWidth(c.label.toUpperCase(),11,.6);
  out.push(`<g role="img" aria-label="${esc(c.label+': '+c.value)}"><path class="fc-bracket" d="M${c.x+3} ${cy-8}h-3v14h3M${r1(c.x+c.w-3)} ${cy-8}h3v14h-3"/><text class="fc-stat-label" x="${c.x+8}" y="${cy+3.5}" font-size="11">${esc(c.label.toUpperCase())}</text><text class="fc-stat-value" x="${r1(c.x+16+lw)}" y="${cy+3.5}" font-size="11">${esc(c.value.toUpperCase())}</text></g>`)}
 for(const l of L.lanes)out.push(renderLane(l,{interactive,multi:flow.lanes.length>1,width}));
 out.push('</svg>');return out.join('')}

// Orthogonal route from the previous taken anchor to the next one. When layers were skipped in between, the path
// drops below them so it never runs through a stack it did not go through.
function route(a,b,below){let d=`M${r1(a.x)} ${r1(a.y)}`;
 if(below!=null){const x1=a.x+GAP/2-4,x2=b.x-BRK-6;return d+`H${r1(x1)}V${r1(below)}H${r1(x2)}V${r1(b.y)}H${r1(b.x)}`}
 if(Math.abs(a.y-b.y)<.5)return d+`H${r1(b.x)}`;const xm=Math.max(a.x+4,b.x-BRK-6);return d+`H${r1(xm)}V${r1(b.y)}H${r1(b.x)}`}

function renderLane(l,{interactive,multi,width}){const out=[],wires=[],path=[],nodes=[],deco=[];const {mid,start,blocks,runs,ends,lane}=l;
 out.push(`<g class="fc-lane-g" role="group" aria-label="${esc(lane.label)}">`);
 if(multi){out.push(`<g class="fc-lane"><circle class="fc-lane-dot" cx="${PAD+4}" cy="${l.labelY-3.5}" r="4" style="fill:${lane.color??'var(--fc-ink-3)'}"/><text x="${PAD+14}" y="${l.labelY}" font-size="11">${esc(lane.label.toUpperCase())}${lane.played===false?'<tspan class="fc-muted" font-weight="400"> · NOT PLAYED IN THIS CHAPTER</tspan>':''}</text></g>`);
  if(l.top>0)out.push(`<line class="fc-wire" x1="${PAD}" y1="${l.top-LANE_GAP/2}" x2="${width-PAD}" y2="${l.top-LANE_GAP/2}" stroke-dasharray="2 4"/>`)}
 for(const r of runs)if(r.key){const {x,y,w,h}=r;
  out.push(`<g aria-hidden="true"><rect class="fc-group" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"/><path class="fc-group-edge" d="M${r1(x)} ${r1(y+12)}v-12h12M${r1(x+w-12)} ${r1(y)}h12v12M${r1(x)} ${r1(y+h-12)}v12h12M${r1(x+w-12)} ${r1(y+h)}h12v-12"/>`);
  out.push(`<path class="fc-bracket" d="M${r1(x+14)} ${r1(y+12)}h-4v${r1(r.lines.length*BIG_LINE+2)}h4"/>${textLines(r.lines,x+18,y+31,BIG,BIG_LINE,'fc-big')}</g>`)}
 out.push(`<g class="fc-start" aria-hidden="true"><rect class="fc-box" x="${start.x}" y="${start.y}" width="${start.w}" height="${start.h}"/><text x="${start.x+8}" y="${start.y+14.5}" font-size="${LABEL}">CHAPTER START</text></g>`);
 // The taken path: `taken` is where it last left the spine of blocks, `skipped` the blocks passed since.
 let taken={x:start.x+start.w,y:mid},skipped=[];let prevOut=start.x+start.w;
 let cur=null;const runOf=new Map;for(const r of runs)if(r.key)for(const b of r.blocks)runOf.set(b,r);
 const goTo=(b,y)=>{const below=skipped.length?Math.max(...skipped.map(s=>{const r=runOf.get(s);return r&&runOf.get(cur)!==r?r.y+r.h:s.y+s.h+(s.chain?s.down-s.h/2:0)}))+12:null;path.push(route(taken,{x:b,y},below));skipped=[]};
 for(const b of blocks){wires.push(`M${r1(prevOut)} ${r1(mid)}H${r1(b.x-BRK)}`);prevOut=b.x+b.w+BRK;drawBlock(b)}
 function drawBlock(b,{inChain=false,rowMid=mid}={}){const c=b.c,x=b.x,y=b.y;if(!inChain)cur=b;
  if(b.type==='event'){const cls='fc-node'+(c.visited?' is-taken':' is-unreached'),label=`${c.title.replace(/[.!?]+$/u,'')}${c.visited?(c.outcome?'. '+c.outcome:''):', not reached on this path'}`;
   nodes.push(`<g class="${cls}"${nodeAttrs(c.key,label,interactive)}><title>${esc(c.title)}</title><rect class="fc-box" x="${r1(x)}" y="${r1(y)}" width="${b.w}" height="${b.h}"/>${triangle(x+7,y+b.h/2)}${textLines(b.lines,x+20,y+(b.h-(b.lines.length-1)*LABEL_LINE)/2+3.4,LABEL,LABEL_LINE)}</g>`);
   wires.push(`M${r1(x-BRK)} ${r1(rowMid)}H${r1(x)}M${r1(x+b.w)} ${r1(rowMid)}H${r1(x+b.w+BRK)}`);
   if(c.visited){goTo(x,rowMid);taken={x:x+b.w,y:rowMid}}else skipped.push(b);
   return}
  const g=b.g,gy=b.type==='hub'?y:y,top=gy,bot=gy+g.h,hub=b.type==='hub';
  // Caption: the scene title above the stack.
  if(b.caption){const cap=wrap(c.title,Math.max(g.w,EVENT_W)+10,11,1)[0];deco.push(`<text class="fc-cap${c.visited?' on':''}" x="${r1(x)}" y="${r1(top-5)}" font-size="11" aria-hidden="true">${esc(cap)}</text>`)}
  const t=g.nodes.filter(n=>n.o.taken).sort((a,b2)=>(a.o.order??0)-(b2.o.order??0)),on=c.visited&&t.length>0;
  // Brackets with their ports on the spine (a stack wider than its options, for a hub's branch, centres them).
  const gx=x+(b.w-g.w)/2;
  deco.push(bracket(gx-6,top-2,bot+2,1,hub&&on),bracket(gx+g.w+6,top-2,bot+2,-1,hub&&on),port(gx-BRK,rowMid,hub&&on),port(gx+g.w+BRK,rowMid,hub&&on));
  if(gx>x)wires.push(`M${r1(x-BRK)} ${r1(rowMid)}H${r1(gx-BRK)}M${r1(gx+g.w+BRK)} ${r1(rowMid)}H${r1(x+b.w+BRK)}`);
  for(const n of g.nodes){const o=n.o,nx=gx+n.gx,ny=gy+n.gy,cls='fc-node'+(o.taken?' is-taken':'')+(!c.visited?' is-unreached':o.locked?' is-locked':'');
   const tx=nx+7+(n.badge?n.bw+4:0),mark=o.taken?(o.risk?.outcome==='failure'?cross(nx+NODE_W-14,ny+n.h/2):check(nx+NODE_W-15,ny+n.h/2)):'';
   const badge=n.badge?`<rect class="fc-badge" x="${r1(nx+3)}" y="${r1(ny+3)}" width="${n.bw}" height="${n.h-6}"/><text class="fc-num" x="${r1(nx+3+n.bw/2)}" y="${r1(ny+n.h/2+3)}" font-size="11" text-anchor="middle">${esc(n.num)}</text>`:'';
   nodes.push(`<g class="${cls}"${nodeAttrs(o.key??c.key,optionLabel(c,o),interactive)}><title>${esc(o.text)}</title><rect class="fc-box" x="${r1(nx)}" y="${r1(ny)}" width="${NODE_W}" height="${n.h}"/>${badge}${textLines(n.lines,tx,ny+(n.h-(n.lines.length-1)*LABEL_LINE)/2+3.4,LABEL,LABEL_LINE)}${mark}</g>`)}
  if(hub){
   // A hub: the path passes through its brackets; the taken options are numbered in visit order.
   if(on){goTo(gx-BRK,rowMid);taken={x:gx+g.w+BRK,y:rowMid}}else if(!c.visited)skipped.push(b);
   if(b.chain){// The cut-in branch: down from under the hub, through the scenes it cut in, and back up into the hub.
    const first=b.chain[0].c,chainOn=b.chain.some(k=>k.c.visited),lx=gx-6,rx=gx+g.w+6,ry=b.rowMid,bx=b.chain.at(-1).x+b.chain.at(-1).w+BRK;
    const after=first.cutinAfter!=null&&first.visited?` · AFTER ${first.cutinAfter}`:'';
    deco.push(`<text class="fc-cut" x="${r1(lx+10)}" y="${r1(bot+CUT_LABEL)}" font-size="11" aria-hidden="true">CUT-IN${esc(after)}</text>`);
    // In: down from under the hub's left bracket into the middle of the gap, across to the left of the first cut-in, and
    // down beside it, so the wire never crosses a box. Out: right past the last cut-in and the hub, then up into it.
    const ex=Math.min(lx,b.chain[0].x-BRK-10),gy2=bot+CUT_GAP/2,inRoute=`M${r1(lx)} ${r1(bot+2)}V${r1(gy2)}H${r1(ex)}V${r1(ry)}H${r1(b.chain[0].x-BRK)}`,RX=Math.max(rx,bx)+12;
    wires.push(inRoute+`M${r1(bx)} ${r1(ry)}H${r1(RX)}V${r1(bot+6)}`);
    deco.push(`<path class="fc-arrow${chainOn?' on':''}" d="M${r1(RX-3.5)} ${r1(bot+8)}l3.5 -5.5l3.5 5.5z"/>`);
    const saved={taken,skipped};taken={x:lx,y:bot+2};skipped=[];
    if(chainOn){path.push(inRoute.replace(/H[-\d.]+$/,''));taken={x:ex,y:ry}}
    b.chain.forEach((k,i)=>{if(i)wires.push(`M${r1(b.chain[i-1].x+b.chain[i-1].w+BRK)} ${r1(ry)}H${r1(k.x-BRK)}`);drawBlock(k,{inChain:true,rowMid:ry})});
    // Back to the hub, under any cut-in this path skipped rather than through it.
    if(chainOn){const below=skipped.length?Math.max(...skipped.map(k=>k.y+k.h))+12:null;path.push(route(taken,{x:RX,y:ry},below)+`V${r1(bot+8)}`)}
    taken=saved.taken;skipped=saved.skipped}
   return}
  // A stack: in to the chosen option, out of the last one chosen.
  if(on){const first=t[0],lastN=t.at(-1),fy=gy+first.gy+first.h/2,ly=gy+lastN.gy+lastN.h/2,chan=bot+6;
   // An option in a later column is reached through the channel under the grid and the gap between columns, so the
   // path never runs through the options beside it; leaving from an earlier column mirrors that on the right.
   let inY=fy;if(first.col>0){inY=chan;const gapX=gx+first.gx-GRID_GAP/2;goTo(gx-BRK,chan);path.push(`M${r1(gx-BRK)} ${r1(chan)}H${r1(gapX)}V${r1(fy)}H${r1(gx+first.gx)}`)}
   else{goTo(gx-BRK,fy);path.push(`M${r1(gx-BRK)} ${r1(fy)}H${r1(gx+first.gx)}`)}
   const lastCol=lastN.col===g.cols-1;let outY=ly;
   if(lastCol)path.push(`M${r1(gx+lastN.gx+NODE_W)} ${r1(ly)}H${r1(gx+g.w+BRK)}`);
   else{outY=chan;const gapX=gx+lastN.gx+NODE_W+GRID_GAP/2;path.push(`M${r1(gx+lastN.gx+NODE_W)} ${r1(ly)}H${r1(gapX)}V${r1(chan)}H${r1(gx+g.w+BRK)}`)}
   taken={x:gx+g.w+BRK,y:outY};
   deco.push(port(gx-BRK,inY,true),port(gx+g.w+BRK,outY,true))}
  else if(!c.visited)skipped.push(b)}
 // Endings column.
 cur=null;if(ends.length){const inX=ends[0].x-14,ys=ends.map(e=>e.y+e.h/2);wires.push(`M${r1(prevOut)} ${r1(mid)}H${r1(inX)}`,`M${r1(inX)} ${r1(Math.min(...ys,mid))}V${r1(Math.max(...ys,mid))}`);
  for(const e of ends){const ey=e.y+e.h/2;wires.push(`M${r1(inX)} ${r1(ey)}H${r1(e.x)}`);
   const cls='fc-end'+(e.e.taken?' is-taken':lane.played===false?' is-unreached':' is-other'),label=`Chapter ending${e.e.taken?'':' not reached'}: ${e.e.text||e.e.label} (${ICON_WORD[e.e.icon]})`,X=e.x,Y=e.y,W=END_W,H=e.h;
   const corners=`<path class="fc-end-corner" d="M${X+2} ${Y-3}H${X-4}V${Y+H+3}H${X+2}M${X+W-2} ${Y-3}H${X+W+4}V${Y+H+3}H${X+W-2}"/>`;
   nodes.push(`<g class="${cls}"${nodeAttrs(e.e.key,label,interactive&&e.e.taken)}><title>${esc(e.e.text||e.e.label)}</title>${corners}<rect class="fc-box" x="${r1(X)}" y="${r1(Y)}" width="${W}" height="${H}"/><rect class="fc-icon-box ic-${e.e.icon}" x="${r1(X+7)}" y="${r1(ey-10)}" width="20" height="20"/>${ICONS[e.e.icon](X+17,ey)}${textLines(e.lines,X+36,ey-(e.lines.length-1)*END_LINE/2+4,END_SIZE,END_LINE)}</g>`);
   if(e.e.taken){goTo(X,ey)}}}
 out.push(`<path class="fc-wire" d="${wires.join('')}"/>`,...deco,`<path class="fc-path" d="${path.join('')}"/>`,...nodes,'</g>');
 return out.join('')}

export function chapterSVG(flow,opts={}){return renderChapterSVG(layoutChapter(flow,opts),opts)}
