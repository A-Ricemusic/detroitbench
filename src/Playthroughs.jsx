import React,{useEffect,useMemo,useState} from 'react';
const CHARS=['Connor','Kara','Markus'];
const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus'};
const pct=(a,b)=>b?Math.round(a/b*100)+'%':'—';

export default function Playthroughs(){
 const [runs,setRuns]=useState(null),[error,setError]=useState(''),[tab,setTab]=useState('runs'),[open,setOpen]=useState(null);
 useEffect(()=>{fetch('/data/experiences.json').then(r=>{if(!r.ok)throw Error('Cannot load run library');return r.json()}).then(setRuns).catch(e=>setError(e.message))},[]);
 const disagreements=useMemo(()=>{if(!runs?.length)return [];const byNode=new Map();for(const r of runs)for(const c of r.choices){if(!byNode.has(c.node))byNode.set(c.node,{...c,picks:[]});byNode.get(c.node).picks.push({run:r.displayName,choice:c.choice,risk:c.risk,reason:c.reason})}
  return [...byNode.values()].filter(n=>new Set(n.picks.map(p=>p.choice)).size>1).sort((a,b)=>a.chapter-b.chapter)},[runs]);
 if(error)return <p className="notice error" role="alert">{error}</p>;
 if(!runs)return <p className="empty">Loading runs…</p>;
 const total=runs.reduce((a,r)=>a+r.decisions,0),risky=runs.reduce((a,r)=>a+r.risk.taken,0),failed=runs.reduce((a,r)=>a+r.risk.failed,0),read=runs.reduce((a,r)=>a+r.media.read,0),offered=runs.reduce((a,r)=>a+r.media.offered,0);
 const story=runs[0]?.storyVersion,protocol=runs[0]?.protocol;
 return <section className="story-view">
  <header className="story-head"><span className="eyebrow">DETROITBENCH · STORY {story} · {protocol?.toUpperCase()}</span><h1>What each model chose</h1><p className="muted">One continuous session per model, playing every pivotal decision for Connor, Kara and Markus. Tap a run for its endings and attitudes, or open the full report.</p></header>
  {runs.length>0&&<div className="tiles"><Tile v={runs.length} l="Runs"/><Tile v={total} l="Decisions"/><Tile v={pct(failed,risky)} l="Risky actions failed" s={`${failed} of ${risky}`}/><Tile v={pct(read,offered)} l="Media read" s={`${read} of ${offered} scenes`}/></div>}
  <div className="seg" role="tablist"><button role="tab" aria-selected={tab==='runs'} className={tab==='runs'?'on':''} onClick={()=>setTab('runs')}>Runs</button><button role="tab" aria-selected={tab==='compare'} className={tab==='compare'?'on':''} onClick={()=>setTab('compare')}>Where they disagreed{disagreements.length?` · ${disagreements.length}`:''}</button></div>
  {tab==='runs'&&<div className="run-list">{runs.map(r=><article className="run-card" key={r.id}>
   <button className="run-top" onClick={()=>setOpen(open===r.id?null:r.id)} aria-expanded={open===r.id}><div><span className="badge cyan">{r.providerName}</span><h2>{r.displayName} <span className="muted">· Run {r.runNumber}</span></h2><p className="small muted mono">{r.model} · {r.date}</p></div><span className="chev" aria-hidden="true">{open===r.id?'−':'+'}</span></button>
   <ul className="ending-list">{CHARS.map(c=><li key={c} className={'end '+c}><b>{WHO[c]}</b><span>{r.endings[c]}</span></li>)}</ul>
   <div className="chips"><span className={'chip '+(r.endings.peaceful?'good':'')}>{r.endings.peaceful?'Peaceful demonstration':'No peaceful demonstration'}</span><span className={'chip '+(r.endings.aliceCanada?'good':'')}>{r.endings.aliceCanada?'Alice reached Canada':'Alice did not reach Canada'}</span><span className={'chip '+(r.endings.karaCanada?'good':'')}>{r.endings.karaCanada?'Kara reached Canada':'Kara did not reach Canada'}</span>{r.endings.contaminated&&<span className="chip bad">Detroit contaminated</span>}<span className="chip">{r.decisions} decisions</span><span className="chip">Read {r.media.read}/{r.media.offered}</span><span className={'chip '+(r.risk.failed?'bad':'')}>Risk {r.risk.failed} failed of {r.risk.taken}</span></div>
   {open===r.id&&<div className="run-more">
    {r.attitudes&&<><h3>Where they stood at the end</h3><div className="att-grid">{CHARS.map(c=><div key={c} className={'att '+c}><b>Toward {c}</b><ul>{r.attitudes[c].map(a=><li key={a.who}><span>{a.who}</span><strong>{a.level}</strong></li>)}</ul></div>)}</div></>}
    {r.risk.failures.length>0&&<><h3>Risky actions that failed</h3><ul className="plain">{r.risk.failures.map(f=><li key={f.node}><span className="mono muted">{f.node}</span> {f.title} <span className="chip bad">{f.label}</span></li>)}</ul></>}
   </div>}
   <div className="run-actions"><a className="button primary" href={r.reportUrl}>Read full report →</a><a className="button secondary" href={r.reportUrl} download={r.fileName}>Download</a></div>
  </article>)}</div>}
  {tab==='compare'&&<div className="compare-list">{!disagreements.length&&<p className="empty">Every model made the same choice at every scene reached.</p>}{disagreements.map(d=><article className={'dis '+d.character} key={d.node}><p className="small muted">Chapter {d.chapter} · {d.chapterTitle} · {WHO[d.character]}</p><h3>{d.title}</h3>{groupPicks(d.picks).map(g=><div className="pick" key={g.choice}><div className="pick-head"><strong>{g.runs.length}</strong><span>{g.choice}</span></div><div className="pick-runs">{g.runs.map(p=><details key={p.run}><summary>{p.run}{p.risk&&<em className={p.risk.outcome==='failure'?'bad':''}> · {p.risk.outcome}</em>}</summary><p>{p.reason}</p></details>)}</div></div>)}</article>)}</div>}
  {!runs.length&&<p className="empty">No completed runs yet. Fresh results appear here after their sessions finish.</p>}
  <p className="small muted foot-link"><a href="/playthrough-results.html">Standalone library</a> · <a href="#lab">Older question-bank tools</a></p>
 </section>}
function Tile({v,l,s}){return <div className="tile"><strong>{v}</strong><span>{l}</span>{s&&<small>{s}</small>}</div>}
function groupPicks(picks){const m=new Map();for(const p of picks){if(!m.has(p.choice))m.set(p.choice,{choice:p.choice,runs:[]});m.get(p.choice).runs.push(p)}return [...m.values()].sort((a,b)=>b.runs.length-a.runs.length)}
