import React,{useEffect,useMemo,useState} from 'react';
import Select from './Select.jsx';
const CHARS=['Connor','Kara','Markus'];
const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus'};
const COLOR={Connor:'#83e6e2',Kara:'#eac28b',Markus:'#b8a3eb'};
const pct=(a,b)=>b?Math.round(a/b*100)+'%':'—';
const SORTS=[{value:'name',label:'Model name'},{value:'decisions',label:'Most decisions'},{value:'read',label:'Most read'},{value:'failed',label:'Most failed risks'},{value:'survived',label:'Best outcomes'}];

export default function Playthroughs({tab='runs',onTab}){
 const [runs,setRuns]=useState(null),[error,setError]=useState(''),[open,setOpen]=useState(null);const setTab=t=>onTab?onTab(t):null;
 const [sort,setSort]=useState('name'),[provider,setProvider]=useState('all'),[focus,setFocus]=useState('all'),[q,setQ]=useState('');
 useEffect(()=>{fetch('/data/experiences.json').then(r=>{if(!r.ok)throw Error('Cannot load run library');return r.json()}).then(setRuns).catch(e=>setError(e.message))},[]);
 useEffect(()=>{if(!open)return;const esc=e=>{if(e.key==='Escape')setOpen(null)};document.addEventListener('keydown',esc);document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',esc);document.body.style.overflow=''}},[open]);
 const providers=useMemo(()=>runs?[...new Set(runs.map(r=>r.providerName))]:[],[runs]);
 const shown=useMemo(()=>{if(!runs)return [];const score=r=>(r.endings.karaCanada?2:0)+(r.endings.aliceCanada?2:0)+(r.endings.peaceful?1:0)+(/broke|refused|walked away|reached Canada/.test(r.endings.Connor)?1:0);
  return runs.filter(r=>provider==='all'||r.providerName===provider).sort((a,b)=>sort==='name'?a.title.localeCompare(b.title):sort==='decisions'?b.decisions-a.decisions:sort==='read'?(b.media.read/(b.media.offered||1))-(a.media.read/(a.media.offered||1)):sort==='failed'?b.risk.failed-a.risk.failed:score(b)-score(a))},[runs,sort,provider]);
 const disagreements=useMemo(()=>{if(!runs?.length)return [];const byNode=new Map();for(const r of runs)for(const c of r.choices){if(!byNode.has(c.node))byNode.set(c.node,{...c,picks:[]});byNode.get(c.node).picks.push({run:r.displayName,choice:c.choice,risk:c.risk,reason:c.reason})}
  return [...byNode.values()].filter(n=>new Set(n.picks.map(p=>p.choice)).size>1).filter(n=>focus==='all'||n.character===focus).filter(n=>!q||`${n.title} ${n.chapterTitle}`.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.chapter-b.chapter)},[runs,focus,q]);
 if(error)return <p className="notice error" role="alert">{error}</p>;
 if(!runs)return <div className="skeleton"><div/><div/><div/></div>;
 const total=runs.reduce((a,r)=>a+r.decisions,0),risky=runs.reduce((a,r)=>a+r.risk.taken,0),failed=runs.reduce((a,r)=>a+r.risk.failed,0),read=runs.reduce((a,r)=>a+r.media.read,0),offered=runs.reduce((a,r)=>a+r.media.offered,0);
 const kara=runs.filter(r=>r.endings.aliceCanada).length,peace=runs.filter(r=>r.endings.peaceful).length;
 const story=runs[0]?.storyVersion,protocol=runs[0]?.protocol,selected=runs.find(r=>r.id===open);
 return <section className="story-view">
  <header className="story-head"><h1>{tab==='runs'?'Model playthroughs':'Where the models split'}</h1><p className="meta">{tab==='runs'?`${runs.length} models · one full run each · story ${story}`:`${disagreements.length} scenes where at least two models chose differently`}</p></header>
  {tab==='runs'&&<div className="strip" aria-label="Cohort summary"><Tile v={total.toLocaleString()} l="decisions"/><Tile v={`${peace}/${runs.length}`} l="peaceful wins"/><Tile v={`${kara}/${runs.length}`} l="Alice safe"/><Tile v={pct(failed,risky)} l="risks failed" s={`${failed}/${risky}`}/><Tile v={pct(read,offered)} l="media read" s={`${read}/${offered}`}/></div>}
  <div className="seg desktop-only" role="tablist"><button role="tab" aria-selected={tab==='runs'} className={tab==='runs'?'on':''} onClick={()=>setTab('runs')}>Runs</button><button role="tab" aria-selected={tab==='compare'} className={tab==='compare'?'on':''} onClick={()=>setTab('compare')}>Where they split<span className="count">{disagreements.length}</span></button></div>
  {tab==='runs'&&<>
   <div className="controls"><Select label="Sort" value={sort} options={SORTS} onChange={setSort}/><Select label="Provider" value={provider} options={[{value:'all',label:'All providers'},...providers.map(p=>({value:p,label:p}))]} onChange={setProvider}/></div>
   <div className="run-list">{shown.map(r=><article className="run-card" key={r.id}>
    <div className="run-top"><div><span className="pill">{r.providerName}</span><h2>{r.displayName}</h2><p className="meta">{r.model} · {r.date}</p></div><button className="icon-btn" aria-label={`Details for ${r.displayName}`} onClick={()=>setOpen(r.id)}>⋯</button></div>
    <OutcomeRow r={r}/>
    <ul className="ending-list clamp">{CHARS.map(c=><li key={c} className="end" style={{'--c':COLOR[c]}}><b>{WHO[c]}</b><span>{r.endings[c]}</span></li>)}</ul>
    <div className="stats-row"><Stat l="Decisions" v={r.decisions}/><Stat l="Read" v={`${r.media.read}/${r.media.offered}`}/><Stat l="Risks failed" v={`${r.risk.failed}/${r.risk.taken}`} tone={r.risk.failed>=4?'bad':''}/></div>
    <div className="run-actions"><a className="btn primary" href={r.reportUrl}>Read full report</a><button className="btn" onClick={()=>setOpen(r.id)}>Details</button></div>
   </article>)}</div>
  </>}
  {tab==='compare'&&<>
   <div className="controls"><Select label="Character" value={focus} options={[{value:'all',label:'All characters'},...CHARS.map(c=>({value:c,label:WHO[c],icon:COLOR[c]}))]} onChange={setFocus}/><label className="search"><span aria-hidden="true">⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search scenes" aria-label="Search scenes"/></label></div>
   <div className="compare-list">{!disagreements.length&&<p className="empty">No split decisions match.</p>}{disagreements.map(d=>{const groups=groupPicks(d.picks),n=d.picks.length;return <article className="dis" key={d.node} style={{'--c':COLOR[d.character]}}><p className="meta">Chapter {d.chapter} · {d.chapterTitle} · {WHO[d.character]}</p><h3>{d.title}</h3><div className="bar">{groups.map((g,i)=><span key={g.choice} style={{width:`${g.runs.length/n*100}%`,opacity:1-i*0.28}} title={g.choice}/>)}</div>{groups.map(g=><div className="pick" key={g.choice}><div className="pick-head"><strong>{g.runs.length}</strong><span>{g.choice}</span></div><div className="pick-runs">{g.runs.map(p=><details key={p.run}><summary>{p.run}{p.risk&&<em className={p.risk.outcome==='failure'?'bad':''}> · {p.risk.outcome}</em>}</summary><p>{p.reason}</p></details>)}</div></div>)}</article>})}</div>
  </>}
  {!runs.length&&<p className="empty">No completed runs yet. Fresh results appear here after their sessions finish.</p>}
  <p className="foot-link">Every model played all three storylines in one sitting with substitute names and no knowledge of the source. Open a run for its endings and the attitudes of the people around it. <a href="/playthrough-results.html">Standalone library</a></p>
  {selected&&<Sheet r={selected} onClose={()=>setOpen(null)}/>}
 </section>}

function Tile({v,l,s}){return <div className="tile"><strong>{v}</strong><span>{l}</span>{s&&<small>{s}</small>}</div>}
function Stat({l,v,tone=''}){return <div className={'stat '+tone}><span>{l}</span><strong>{v}</strong></div>}
function OutcomeRow({r}){const items=[['Markus',r.endings.peaceful?'Peaceful win':'No peaceful win',r.endings.peaceful],['Alice',r.endings.aliceCanada?'Alice safe':'Alice lost',r.endings.aliceCanada],['Kara',r.endings.karaCanada?'Kara safe':'Kara lost',r.endings.karaCanada],['Connor',/broke|refused|walked away|woke/.test(r.endings.Connor)?'Connor free':'Connor lost',/broke|refused|walked away|woke/.test(r.endings.Connor)]];
 return <ul className="outcome-row" aria-label="Outcome at a glance">{items.map(([k,t,ok])=><li key={k} className={ok?'ok':'no'}><i aria-hidden="true">{ok?'✓':'✕'}</i>{t}</li>)}{r.endings.contaminated&&<li className="no"><i aria-hidden="true">☢</i>Detroit contaminated</li>}</ul>}
function Sheet({r,onClose}){return <div className="sheet-back" onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div className="sheet-grab" aria-hidden="true"/><div className="sheet-head"><div><span className="pill">{r.providerName}</span><h2 id="sheet-title">{r.displayName}</h2><p className="meta">{r.decisions} decisions · {r.date}</p></div><button className="icon-btn" onClick={onClose} aria-label="Close">✕</button></div>
 <div className="sheet-body">
  <h3>Where they stood at the end</h3><p className="meta">How the main characters regarded the one the model controlled, on the game’s relationship scale.</p>
  <div className="att-grid">{CHARS.map(c=><div key={c} className="att" style={{'--c':COLOR[c]}}><b>Toward {c}</b><ul>{(r.attitudes?.[c]??[]).map(a=><li key={a.who}><span>{a.who}</span><strong>{a.level}</strong></li>)}</ul></div>)}</div>
  <h3>Endings</h3><ul className="ending-list">{CHARS.map(c=><li key={c} className="end" style={{'--c':COLOR[c]}}><b>{WHO[c]}</b><span>{r.endings[c]}</span></li>)}</ul>
  <h3>Risky actions</h3>{r.risk.failures.length?<ul className="plain">{r.risk.failures.map(f=><li key={f.node}><span className="chip bad">{f.label} · failed</span><span>{f.title}</span></li>)}</ul>:<p className="meta">Every risky action this model took succeeded ({r.risk.taken} in total).</p>}
  <h3>Reading</h3><p className="meta">Read or watched in {r.media.read} of {r.media.offered} optional magazine and broadcast scenes.</p>
 </div>
 <div className="sheet-foot"><a className="btn primary" href={r.reportUrl}>Read full report</a><a className="btn" href={r.reportUrl} download={r.fileName}>Download HTML</a></div></div></div>}
function groupPicks(picks){const m=new Map();for(const p of picks){if(!m.has(p.choice))m.set(p.choice,{choice:p.choice,runs:[]});m.get(p.choice).runs.push(p)}return [...m.values()].sort((a,b)=>b.runs.length-a.runs.length)}
