import React,{useLayoutEffect,useMemo,useRef,useState} from 'react';
import Select from './Select.jsx';

// Categorical series colours, stepped for the dark surface (validated against #121a25:
// adjacent CVD ΔE ≥ 8.4, normal-vision ΔE ≥ 19.3, all ≥ 3:1). Assigned by model name, never by rank.
const SERIES=['#3987e5','#d95926','#199e70','#c98500','#d55181','#008300','#9085e9','#e66767'];
const DIM='#3a4657';
export const CHAR_COLOR={Connor:'var(--connor)',Kara:'var(--kara)',Markus:'var(--markus)'};
export function modelColors(runs){const names=[...new Set(runs.map(r=>r.displayName))].sort((a,b)=>a.localeCompare(b));return Object.fromEntries(names.map((n,i)=>[n,SERIES[i]??'#7d8a9a']))}

// Ending categories per character, best outcome first. `phrase` completes "N of M …".
const OUTCOMES={
 Connor:{field:'connor',owner:'Connor',phrase:'ended free',list:[['free','Free','good'],['controlled','Controlled','mid'],['machine','Stayed a machine','mid'],['deactivated','Deactivated','bad']]},
 Kara:{field:'kara',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['left','Left Alice','serious'],['captured','Captured','serious'],['died','Died','bad']]},
 Alice:{field:'alice',owner:'Kara',phrase:'reached Canada',list:[['canada','Reached Canada','good'],['alive','Survived','mid'],['captured','Captured','serious'],['died','Died','bad']]},
 Markus:{field:'markus',owner:'Markus',phrase:'won peacefully',list:[['peaceful win','Peaceful win','good'],['uprising won','Uprising won','mid'],['alive','Survived','mid'],['cast out','Cast out','serious'],['died','Died','bad']]}
};

function useWidth(){const ref=useRef(null),[w,setW]=useState(320);useLayoutEffect(()=>{const el=ref.current;if(!el)return;setW(Math.max(220,Math.round(el.getBoundingClientRect().width)));const ro=new ResizeObserver(([e])=>setW(Math.max(220,Math.round(e.contentRect.width))));ro.observe(el);return()=>ro.disconnect()},[]);return [ref,w]}
const levelOf=(scale,v)=>scale.bands.find(b=>v>=b.from&&v<=b.to)?.level??'';
const groupBy=(xs,f)=>xs.reduce((m,x)=>{const k=f(x);(m[k]??=[]).push(x);return m},{});

export function OutcomeChart({runs}){
 const [open,setOpen]=useState(null);
 return <div className="outcomes">{Object.entries(OUTCOMES).map(([name,o])=>{
  const known=new Set(o.list.map(x=>x[0]));
  const groups=o.list.map(([k,label,tone])=>({k,label,tone,runs:runs.filter(r=>r.status[o.field]===k)})).filter(g=>g.runs.length);
  const other=runs.filter(r=>!known.has(r.status[o.field]));if(other.length)groups.push({k:'other',label:'Other',tone:'mid',runs:other});
  const best=runs.filter(r=>r.status[o.field]===o.list[0][0]).length,sel=groups.find(g=>open===name+':'+g.k);
  return <div className="outcome" key={name} style={{'--c':CHAR_COLOR[o.owner]}}>
   <div className="outcome-head"><b>{name}</b><span><strong>{best}</strong> of {runs.length} {o.phrase}</span></div>
   <div className="obar" role="group" aria-label={`${name}: `+groups.map(g=>`${g.label} ${g.runs.length}`).join(', ')}>{groups.map(g=><button key={g.k} type="button" className={'oseg '+g.tone+(sel===g?' on':'')} style={{flexGrow:g.runs.length}} aria-pressed={sel===g} aria-label={`${g.label}: ${g.runs.length} of ${runs.length}. Show models`} onClick={()=>setOpen(sel===g?null:name+':'+g.k)}>{g.runs.length}</button>)}</div>
   <ul className="olegend">{groups.map(g=><li key={g.k}><i className={g.tone} aria-hidden="true"/>{g.label} <b>{g.runs.length}</b></li>)}</ul>
   {sel&&<p className="onames" aria-live="polite"><b>{sel.label}:</b> {sel.runs.map(r=>r.displayName).join(', ')}</p>}
  </div>})}</div>}

export function ModelLegend({runs,colors,highlight,onHighlight}){
 return <div className="model-legend" role="group" aria-label="Highlight a model">
  <button type="button" aria-pressed={highlight==='all'} onClick={()=>onHighlight('all')}>All models</button>
  {[...runs].sort((a,b)=>a.displayName.localeCompare(b.displayName)).map(r=><button type="button" key={r.id} aria-pressed={highlight===r.id} onClick={()=>onHighlight(highlight===r.id?'all':r.id)}><i style={{background:colors[r.displayName]}} aria-hidden="true"/>{r.displayName}</button>)}
 </div>}

// Final value of one relationship, one dot per model on the game's level bands.
export function FinalStrip({scale,runs,colors,highlight}){
 const [ref,w]=useWidth(),[tip,setTip]=useState(null);
 const pad=4,n=scale.max-scale.min+1,u0=(w-2*pad)/n;
 // Each band is at least wide enough for its label; the axis is ordinal by band, linear within one.
 const need=scale.bands.map(b=>Math.max((b.to-b.from+1)*u0,b.level.length*6.3+10)),k=(w-2*pad)/need.reduce((a,b)=>a+b,0);
 const geo=[];let at=pad;scale.bands.forEach((b,i)=>{const bw=need[i]*k;geo.push({...b,x0:at,x1:at+bw});at+=bw});
 const stagger=geo.some(g=>g.x1-g.x0<g.level.length*6.3+6);
 const x=v=>{const g=geo.find(g=>v>=g.from&&v<=g.to)??geo.at(-1);return g.x0+(v-g.from+0.5)/(g.to-g.from+1)*(g.x1-g.x0)};
 const placed=[],count={};for(const r of runs){const t=r.track[scale.key];if(t.score===null)continue;const k=count[t.score]=(count[t.score]??0)+1;placed.push({r,t,k:k-1})}
 const tall=Math.max(1,...Object.values(count)),base=10+tall*14,H=base+(stagger?32:20);
 const order=[...placed].sort((a,b)=>(a.r.id===highlight)-(b.r.id===highlight));
 const off=groupBy(runs.filter(r=>r.track[scale.key].score===null),r=>r.track[scale.key].final);
 const on=r=>highlight==='all'||highlight===r.id;
 return <div className="strip-chart">
  <div className="plot" ref={ref} onPointerLeave={()=>setTip(null)}>
   <svg width={w} height={H} role="img" aria-label={`${scale.label} toward ${scale.toward} at the end: `+runs.map(r=>`${r.displayName} ${r.track[scale.key].final}`).join('; ')}>
    {geo.map((b,i)=><g key={b.level}><rect className={i%2?'band-b':'band-a'} x={b.x0} y={0} width={b.x1-b.x0} height={base+2}/><text className="band-label" x={(b.x0+b.x1)/2} y={base+15+(stagger&&i%2?12:0)} textAnchor="middle">{b.level}</text></g>)}
    {order.map(({r,t,k})=>{const cx=x(t.score),cy=base-7-k*14,fill=on(r)?colors[r.displayName]:DIM;return <g key={r.id} className="dot" onPointerEnter={()=>setTip({r,t,cx,cy})} onClick={()=>setTip({r,t,cx,cy})}>
     {t.final==='Lover'?<text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="central" fontSize="15" fill={fill} className="heart">♥</text>:<circle cx={cx} cy={cy} r={5.5} fill={fill} className="ring"/>}
     <circle cx={cx} cy={cy} r={11} fill="transparent"/></g>})}
   </svg>
   {tip&&<div className="tip" style={{left:Math.min(Math.max(tip.cx,70),w-70),top:tip.cy-12}} role="status"><b>{tip.r.displayName}</b><span>{tip.t.final}{tip.t.final!==levelOf(scale,tip.t.score)&&` · ${levelOf(scale,tip.t.score)} trust`}</span></div>}
  </div>
  {Object.keys(off).length>0&&<p className="strip-off">{Object.entries(off).map(([label,list])=><span key={label}><b>{label}</b> in {list.length}: {list.map(r=><span key={r.id} className={'off-name'+(on(r)?'':' dim')}><i style={{background:on(r)?colors[r.displayName]:DIM}} aria-hidden="true"/>{r.displayName}</span>)}</span>)}</p>}
 </div>}

// Value at the end of each chapter, so runs of different lengths line up.
function chapterSeries(r,key){const st=r.track.steps,t=r.track[key],chs=[0,...new Set(st.map(s=>s.chapter))];
 return chs.map(c=>{let idx=0;for(let i=0;i<st.length;i++)if(st[i].chapter<=c)idx=i+1;return {c,v:t.values[idx]??null}})}

export function TrendChart({scale,runs,colors,highlight='all',compact=false}){
 const [ref,w]=useWidth(),[hover,setHover]=useState(null);
 const H=compact?112:240,m={l:compact?74:82,r:6,t:6,b:compact?16:22};
 const series=useMemo(()=>runs.map(r=>({r,pts:chapterSeries(r,scale.key),ended:r.track[scale.key].endedAt!==null})),[runs,scale.key]);
 const titles=useMemo(()=>{const t={0:'Start'};for(const r of runs)for(const s of r.track.steps)t[s.chapter]??=s.chapterTitle;return t},[runs]);
 const chs=[...new Set(series.flatMap(s=>s.pts.map(p=>p.c)))].sort((a,b)=>a-b),xMax=Math.max(1,...chs);
 const x=c=>m.l+c/xMax*(w-m.l-m.r),span=scale.max-scale.min+1,y=v=>m.t+(scale.max+0.5-v)/span*(H-m.t-m.b);
 const on=r=>highlight==='all'||highlight===r.id;
 const nOn=series.filter(s=>on(s.r)).length,jit=(i)=>compact||nOn<2?0:(i-(series.length-1)/2)*1.4;
 const near=e=>{const b=e.currentTarget.getBoundingClientRect(),px=(e.clientX-b.left)/b.width*w;let best=chs[0];for(const c of chs)if(Math.abs(x(c)-px)<Math.abs(x(best)-px))best=c;setHover(best)};
 const ordered=series.map((s,i)=>({...s,i})).sort((a,b)=>on(a.r)-on(b.r)||(a.r.id===highlight)-(b.r.id===highlight));
 const stroke=s=>on(s.r)?(compact?CHAR_COLOR[scale.toward]:colors[s.r.displayName]):DIM;
 const readout=hover===null?null:series.map(s=>({s,p:s.pts.find(p=>p.c===hover)})).filter(o=>o.p&&o.p.v!==null&&(highlight==='all'||o.s.r.id===highlight)).sort((a,b)=>b.p.v-a.p.v);
 return <div className={'trend'+(compact?' compact':'')}>
  <div className="plot" ref={ref}>
   <svg width={w} height={H} role="img" aria-label={`${scale.label} toward ${scale.toward} by chapter`} onPointerMove={near} onPointerDown={near} onPointerLeave={()=>setHover(null)}>
    {scale.bands.map((b,i)=>{const y0=y(b.to+0.5),y1=y(b.from-0.5);return <g key={b.level}><rect className={i%2?'band-b':'band-a'} x={m.l} y={y0} width={w-m.l-m.r} height={y1-y0}/>{y1-y0>=9&&<text className="band-label" x={m.l-6} y={(y0+y1)/2} textAnchor="end" dominantBaseline="central">{b.level}</text>}</g>})}
    <line className="axis-line" x1={m.l} x2={m.l} y1={m.t} y2={H-m.b}/>{!compact&&chs.filter(c=>c===0||c===xMax||(c%5===0&&xMax-c>=4)).map(c=><text key={c} className="axis-label" x={x(c)} y={H-6} textAnchor={c===0?'start':c===xMax?'end':'middle'}>{c===0?'Start':c}</text>)}
    {compact&&<><text className="axis-label" x={m.l} y={H-3}>Start</text><text className="axis-label" x={w-m.r} y={H-3} textAnchor="end">End</text></>}
    {hover!==null&&<line className="crosshair" x1={x(hover)} x2={x(hover)} y1={m.t} y2={H-m.b}/>}
    {ordered.map(s=>{const segs=[];let cur=[];for(const p of s.pts){if(p.v===null){if(cur.length)segs.push(cur);cur=[]}else cur.push(p)}if(cur.length)segs.push(cur);
     const last=[...s.pts].reverse().find(p=>p.v!==null),dy=jit(s.i),hl=highlight===s.r.id;
     return <g key={s.r.id}>{segs.map((seg,j)=><path key={j} d={seg.map((p,k)=>(k?'L':'M')+x(p.c).toFixed(1)+','+(y(p.v)+dy).toFixed(1)).join('')} fill="none" style={{stroke:stroke(s)}} strokeWidth={hl?2.75:on(s.r)?2:1.5} strokeLinejoin="round" strokeLinecap="round"/>)}
      {s.ended&&last&&<text x={x(last.c)} y={y(last.v)+dy} textAnchor="middle" dominantBaseline="central" className="end-mark" style={{fill:stroke(s)}}>✕</text>}
      {hover!==null&&on(s.r)&&(()=>{const p=s.pts.find(p=>p.c===hover);return p&&p.v!==null&&<circle cx={x(p.c)} cy={y(p.v)+dy} r={4} className="ring" style={{fill:stroke(s)}}/>})()}
     </g>})}
   </svg>
  </div>
  {!compact&&<div className="readout" aria-live="polite">{readout?<><p className="meta">{hover===0?'Start of the story':`End of chapter ${hover} · ${titles[hover]??''}`}</p>{readout.length?<ul>{readout.map(({s,p})=><li key={s.r.id}><i style={{background:colors[s.r.displayName]}} aria-hidden="true"/><span>{s.r.displayName}</span><b>{levelOf(scale,p.v)}</b><em>{p.v>0?'+':''}{p.v}</em></li>)}</ul>:<p className="meta">No value here: not met yet, or no longer alive.</p>}</>:<p className="meta">Drag across the chart to read each model’s value by chapter. ✕ marks where a character died{scale.key==='amandaTrust'?' or Connor broke away':''}.</p>}</div>}
 </div>}

// Per-run small multiples for the Details sheet.
export function RunRelationships({r,scales}){
 const groups=groupBy(scales,s=>s.toward);
 return <div className="run-rel">{['Markus','Connor','Kara'].filter(c=>groups[c]).map(c=><section key={c}><h4 style={{color:CHAR_COLOR[c]}}>Around {c}</h4><div className="mini-grid">{groups[c].map(s=>{const t=r.track[s.key],seen=t.values.some(v=>v!==null);
  return <div className="mini" key={s.key}><div className="mini-head"><b>{s.label}</b><span className={'lvl '+tone(t.final)}>{t.final}</span></div>{seen?<TrendChart compact scale={s} runs={[r]} colors={{}}/>:<p className="meta">{t.final}</p>}</div>})}</div></section>)}</div>}
export const tone=l=>/Hostile|Hated|Died|Unpopular|Unstable/.test(l)?'bad':/Friend|Lover|Trusted|Family|Supportive/.test(l)?'good':/Warm|Respected|Sympathetic/.test(l)?'ok':'';

export function ChartsView({runs,scales}){
 const [highlight,setHighlight]=useState('all'),[metric,setMetric]=useState('publicSupport');
 const colors=useMemo(()=>modelColors(runs),[runs]);
 const groups=groupBy(scales,s=>s.toward),scale=scales.find(s=>s.key===metric)??scales[0];
 return <div className="charts">
  <div className="legend-bar"><ModelLegend runs={runs} colors={colors} highlight={highlight} onHighlight={setHighlight}/></div>
  <section className="chart-card">
   <div className="chart-head"><h2>How they changed</h2><p className="meta">Value at the end of each chapter, on the game’s own level bands.</p></div>
   <Select label="Show" value={metric} options={scales.map(s=>({value:s.key,label:s.label,hint:`toward ${s.toward}`,icon:CHAR_COLOR[s.toward]}))} onChange={setMetric}/>
   <TrendChart scale={scale} runs={runs} colors={colors} highlight={highlight}/>
  </section>
  <section className="chart-card">
   <div className="chart-head"><h2>Where they ended</h2><p className="meta">One dot per model. Tap a dot for the model and level. Characters who died are listed under each chart.</p></div>
   {['Markus','Connor','Kara'].filter(c=>groups[c]).map(c=><div className="strip-group" key={c}><h3 style={{'--c':CHAR_COLOR[c]}}>Around {c}</h3>{groups[c].map(s=><div className="strip-row" key={s.key}><div className="strip-head"><b>{s.label}</b>{s.key==='instability'&&<span className="meta">deviancy at 4+</span>}</div><FinalStrip scale={s} runs={runs} colors={colors} highlight={highlight}/></div>)}</div>)}
  </section>
 </div>}
