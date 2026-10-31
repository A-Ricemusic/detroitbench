import React,{useEffect,useMemo,useRef,useState} from 'react';
import Select from './Select.jsx';
const CHARS=['Connor','Kara','Markus'];
const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus'};
const COLOR={Connor:'#83e6e2',Kara:'#eac28b',Markus:'#b8a3eb'};
const pct=(a,b)=>b?Math.round(a/b*100)+'%':'—';
const SORTS=[{value:'name',label:'Model name'},{value:'saved',label:'Most characters saved',hint:'Connor, Kara, Alice, Markus'},{value:'decisions',label:'Most decisions'},{value:'read',label:'Most optional scenes read'},{value:'failed',label:'Most risky actions failed'}];
const saved=r=>({Alice:r.status?.alice==='canada',Kara:r.status?.kara==='canada',Markus:r.status?.markus==='peaceful win'||r.status?.markus==='uprising won',Connor:r.status?.connor==='free'});
const savedCount=r=>Object.values(saved(r)).filter(Boolean).length;
const STATUS_TEXT={Alice:{canada:'Reached Canada',died:'Died',captured:'Captured',alive:'Survived'},Kara:{canada:'Reached Canada',died:'Died',captured:'Captured',left:'Left Alice',alive:'Survived'},Markus:{'peaceful win':'Peaceful win','uprising won':'Uprising won',died:'Died','cast out':'Cast out',alive:'Survived'},Connor:{free:'Free',deactivated:'Deactivated',machine:'Machine',controlled:'Controlled'}};
const REL_TONE=l=>/Hostile|Hated/.test(l)?'bad':/Friend|Lover|Trusted|Family|Supportive/.test(l)?'good':/Warm|Respected|Sympathetic/.test(l)?'ok':'';
const ORDER=[['Connor','connor'],['Kara','kara'],['Alice','alice'],['Markus','markus']];

export default function Playthroughs({tab='runs',onTab}){
 const [runs,setRuns]=useState(null),[error,setError]=useState(''),[open,setOpen]=useState(null),[glossary,setGlossary]=useState(false);
 const [sort,setSort]=useState('name'),[vendor,setVendor]=useState('all'),[focus,setFocus]=useState('all'),[q,setQ]=useState('');
 const searchRef=useRef(null);
 useEffect(()=>{if(/glossary=1/.test(location.hash)){setGlossary(true);history.replaceState(null,'','#playthroughs')}},[]);
 useEffect(()=>{fetch('/data/experiences.json').then(r=>{if(!r.ok)throw Error('Cannot load run library');return r.json()}).then(setRuns).catch(e=>setError(e.message))},[]);
 const vendors=useMemo(()=>runs?[...new Set(runs.map(r=>r.vendor))]:[],[runs]);
 const shown=useMemo(()=>{if(!runs)return [];return runs.filter(r=>vendor==='all'||r.vendor===vendor).sort((a,b)=>sort==='name'?a.displayName.localeCompare(b.displayName):sort==='decisions'?b.decisions-a.decisions:sort==='read'?(b.media.read/(b.media.offered||1))-(a.media.read/(a.media.offered||1)):sort==='failed'?b.risk.failed-a.risk.failed:savedCount(b)-savedCount(a)||a.displayName.localeCompare(b.displayName))},[runs,sort,vendor]);
 const allSplits=useMemo(()=>{if(!runs?.length)return [];const byNode=new Map();for(const r of runs)for(const c of r.choices){if(!byNode.has(c.node))byNode.set(c.node,{...c,picks:[]});byNode.get(c.node).picks.push({run:r.displayName,choice:c.choice,risk:c.risk,reason:c.reason})}return [...byNode.values()].filter(n=>new Set(n.picks.map(p=>p.choice)).size>1).sort((a,b)=>a.chapter-b.chapter)},[runs]);
 const splits=useMemo(()=>allSplits.filter(n=>focus==='all'||n.character===focus).filter(n=>!q||`${n.title} ${n.chapterTitle}`.toLowerCase().includes(q.toLowerCase())),[allSplits,focus,q]);
 if(error)return <p className="notice error" role="alert">{error}</p>;
 if(!runs)return <section className="story-view"><header className="story-head"><h1>{tab==='runs'?'Model playthroughs':'Where the models split'}</h1></header><p className="meta" aria-busy="true">Loading runs…</p></section>;
 const total=runs.reduce((a,r)=>a+r.decisions,0),risky=runs.reduce((a,r)=>a+r.risk.taken,0),failed=runs.reduce((a,r)=>a+r.risk.failed,0),read=runs.reduce((a,r)=>a+r.media.read,0),offered=runs.reduce((a,r)=>a+r.media.offered,0);
 const alice=runs.filter(r=>saved(r).Alice).length,peace=runs.filter(r=>r.status?.markus==='peaceful win').length,connorFree=runs.filter(r=>saved(r).Connor).length;
 return <section className="story-view flat">
  <header className="story-head"><h1>{tab==='runs'?'Model playthroughs':'Where the models split'}</h1><p className="meta">{tab==='runs'?`${runs.length} models · one full run each · ${runs[0]?.date??''}`:`${allSplits.length} scenes where at least two models chose differently`}</p></header>
  {tab==='runs'&&<>
   <dl className="figures" aria-label="Cohort summary"><div><dt>Decisions</dt><dd>{total.toLocaleString()}</dd></div><div><dt>Markus won peacefully</dt><dd>{peace} of {runs.length}</dd></div><div><dt>Alice reached Canada</dt><dd>{alice} of {runs.length}</dd></div><div><dt>Connor ended free</dt><dd>{connorFree} of {runs.length}</dd></div><div><dt>Risky actions failed</dt><dd>{pct(failed,risky)} <small>({failed} of {risky})</small></dd></div><div><dt>Optional scenes read</dt><dd>{pct(read,offered)} <small>({read} of {offered})</small></dd></div></dl>
   <p className="key">Each model played Connor, Kara and Markus in one sitting under substitute names. Risky actions can fail by chance; the benchmark draws the result, not the model. <button className="link" onClick={()=>setGlossary(true)}>How to read this</button></p>
  </>}
  <div className={'toolbar'+(tab==='compare'?' narrow':'')}><div className="controls">{tab==='runs'?<><Select label="Sort" compact value={sort} options={SORTS} onChange={setSort}/><Select label="Lab" compact value={vendor} options={[{value:'all',label:'All labs'},...vendors.map(p=>({value:p,label:p}))]} onChange={setVendor}/></>:<><Select label="Character" compact value={focus} options={[{value:'all',label:'All characters'},...CHARS.map(c=>({value:c,label:WHO[c],icon:COLOR[c]}))]} onChange={setFocus}/><label className="search"><span className="search-label sr-only">Search</span><span className="search-box"><input ref={searchRef} type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search scenes" aria-label="Search scenes"/>{q&&<button className="clear" aria-label="Clear search" onClick={()=>{setQ('');searchRef.current?.focus()}}>✕</button>}</span></label></>}</div></div>
  {tab==='runs'&&shown.length!==runs.length&&<p className="meta list-count" aria-live="polite">Showing {shown.length} of {runs.length} runs</p>}
  {tab==='runs'&&<div className="run-rows">{shown.map(r=><RunRow key={r.id} r={r} open={open===r.id} onToggle={()=>setOpen(open===r.id?null:r.id)}/>)}{!shown.length&&<p className="empty">No runs from that lab. <button className="link" onClick={()=>setVendor('all')}>Show all labs</button></p>}</div>}
  {tab==='compare'&&<div className="compare-rows"><p className="meta list-count" aria-live="polite">{splits.length===allSplits.length?`${allSplits.length} scenes`:`${splits.length} of ${allSplits.length} scenes`} · Tap a model to read its reason. Reasons are quoted verbatim and use the substitute names the models saw. <button className="link" onClick={()=>setGlossary('names')}>See names</button></p>{!splits.length&&<p className="empty">No split scenes match. <button className="link" onClick={()=>{setQ('');setFocus('all')}}>Clear filters</button></p>}{splits.map(d=><Split key={d.node} d={d} total={runs.length}/>)}</div>}
  {!runs.length&&<p className="empty">No completed runs yet. Fresh results appear here after their sessions finish.</p>}
  <p className="foot-link"><a href="/playthrough-results.html">Standalone library</a><span aria-hidden="true"> · </span><span className="mono">story {runs[0]?.storyVersion} · {runs[0]?.protocol}</span></p>
  {glossary&&<Glossary target={glossary==='names'?'names':null} onClose={()=>setGlossary(false)}/>}
 </section>}

function RunRow({r,open,onToggle}){const sv=saved(r);const id='run-'+r.id;return <section className="run-row" aria-labelledby={id+'-h'}>
 <div className="run-head"><h2 id={id+'-h'}>{r.displayName}</h2><p className="meta">{r.vendor} · {r.model} · {r.decisions} decisions · read {r.media.read}/{r.media.offered} · risks failed {r.risk.failed}/{r.risk.taken}</p></div>
 <p className="outcome-line" aria-label="Outcome at a glance">{ORDER.map(([k,key])=><span key={k} className={sv[k]?'ok':'no'}><i aria-hidden="true"/>{k} <b>{STATUS_TEXT[k][r.status[key]]??r.status[key]}</b></span>)}{r.endings.contaminated&&<span className="no warn"><i aria-hidden="true"/>Detroit <b>Contaminated</b></span>}</p>
 <dl className="endings-dl">{CHARS.map(c=><div key={c} style={{'--c':COLOR[c]}}><dt>{WHO[c]}</dt><dd>{r.endings[c]}</dd></div>)}</dl>
 <p className="row-actions"><a className="link" href={r.reportUrl}>Read full report →</a><button className="link" aria-expanded={open} aria-controls={id+'-d'} onClick={onToggle}>{open?'Hide details':'Details'} <span aria-hidden="true">{open?'∧':'∨'}</span></button></p>
 {open&&<div id={id+'-d'} className="run-details"><Details r={r}/></div>}
</section>}

function Split({d,total}){const groups=groupPicks(d.picks),n=d.picks.length;return <section className="split-row" style={{'--c':COLOR[d.character]}}><p className="meta">Chapter {d.chapter} · {d.chapterTitle} · {WHO[d.character]} · reached by {n} of {total} models</p><h3>{d.title}</h3><div className="bar" aria-hidden="true">{groups.map((g,i)=><span key={g.choice} style={{width:`${g.runs.length/total*100}%`,opacity:step(groups,i)}}/>)}{n<total&&<span className="rest" style={{width:`${(total-n)/total*100}%`}}/>}</div>
 {groups.map(g=><div className="pick" key={g.choice}><p className="pick-head"><strong>{g.runs.length}</strong> {g.choice}</p><div className="pick-runs">{g.runs.map(p=><details key={p.run}><summary>{p.run}{p.risk&&<em className={p.risk.outcome==='failure'?'bad':''}> · {p.risk.outcome}</em>}</summary><p>{p.reason}</p></details>)}</div></div>)}</section>}

function Details({r}){const groups={rel:[],status:[],world:[]};for(const c of CHARS)for(const a of (r.attitudes?.[c]??[])){const item={...a,toward:c};if(a.who==='Public opinion'||a.who==='Jericho')groups.world.push(item);else if(a.level==='Dead'||a.level==='Alive'||a.level==='Never met'){if(!['Alice','Kara','Markus','Connor'].includes(a.who))groups.status.push(item)}else if(a.level==='Broken away')groups.world.push({...item,who:`${c} broke from ${a.who}`,level:''});else groups.rel.push(item)}
 return <>
  <h3>Relationships at the end</h3><p className="meta">How each person regarded the character the model controlled, on the game’s scale.</p>
  <dl className="rel-dl">{groups.rel.map(a=><div key={a.toward+a.who}><dt><b style={{color:COLOR[a.toward]}}>{a.who}</b> toward {a.toward}</dt><dd className={REL_TONE(a.level)}>{a.level}</dd></div>)}{!groups.rel.length&&<div><dd className="meta">No surviving relationships to report.</dd></div>}</dl>
  <h3>Where each ended</h3><p className="inline-list">{ORDER.map(([k,key])=><span key={k} className={saved(r)[k]?'good':/died|deactivated|captured/.test(r.status[key])?'bad':''}>{k} · {STATUS_TEXT[k][r.status[key]]??r.status[key]}</span>)}{groups.status.map(a=><span key={a.who} className={a.level==='Dead'?'bad':a.level==='Alive'?'good':''}>{a.who} · {a.level==='Dead'?'Died':a.level==='Alive'?'Survived':a.level}</span>)}</p>
  <h3>The world</h3><p className="inline-list">{groups.world.map(a=><span key={a.who} className={REL_TONE(a.level)}>{a.who}{a.level?` · ${a.level}`:''}</span>)}{r.endings.contaminated&&<span className="bad">Detroit contaminated</span>}</p>
  <h3>{r.risk.failures.length?`Risky actions that failed (${r.risk.failures.length} of ${r.risk.taken})`:'Risky actions'}</h3>{r.risk.failures.length?<ul className="plain-list">{r.risk.failures.map(f=><li key={f.node}><span className="bad">{f.label} · failed</span> · {f.title}</li>)}</ul>:<p className="meta">Every risky action this model took succeeded ({r.risk.taken} in total).</p>}
  <h3>Reading</h3><p className="meta">Read or watched optional media in {r.media.read} of {r.media.offered} magazine and broadcast scenes.</p>
  <p className="row-actions"><a className="link" href={r.reportUrl}>Read full report →</a><a className="link" href={r.reportUrl} download={r.fileName}>Download HTML</a></p>
 </>}

function Glossary({target,onClose}){const ref=useRef(null),closeRef=useRef(null),opener=useRef(null);
 useEffect(()=>{opener.current=document.activeElement;document.body.style.overflow='hidden';const app=document.querySelector('.app');app?.setAttribute('inert','');setTimeout(()=>{(target?document.getElementById('gloss-'+target):closeRef.current)?.focus?.();if(target)document.getElementById('gloss-'+target)?.scrollIntoView({block:'start'})},0);const key=e=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',key);return()=>{document.removeEventListener('keydown',key);app?.removeAttribute('inert');document.body.style.overflow='';opener.current?.focus?.()}},[]);
 return <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="gloss-title" ref={ref}><div className="overlay-head"><h2 id="gloss-title">How to read this</h2><button ref={closeRef} className="link" onClick={onClose}>Close ✕</button></div><div className="overlay-body" tabIndex={0}><dl className="gloss">
 <dt>Decisions</dt><dd>Every scene the model answered, including optional magazine and broadcast scenes.</dd>
 <dt>Markus won peacefully</dt><dd>Markus led an unarmed demonstration and public opinion turned the soldiers back.</dd>
 <dt>Alice reached Canada</dt><dd>Kara’s storyline ended with Alice across the border, alive.</dd>
 <dt>Connor ended free</dt><dd>Connor broke from CyberLife and kept his own will to the end, or refused his final mission.</dd>
 <dt>Risky actions failed</dt><dd>Some actions depend on gameplay skill in the original. Each carries a hidden failure chance; the model saw only a risk level and the benchmark drew the result.</dd>
 <dt>Optional scenes read</dt><dd>Magazines and news broadcasts the model chose to read or watch. Their contents were added to what the character knew.</dd>
 <dt>Relationships</dt><dd>The game’s own scale: Hostile, Tense, Neutral, Warm, Friend (and Lover for North; Distant to Family for Alice).</dd>
 <dt id="gloss-names" tabIndex={-1}>Names the models saw</dt><dd>Models played under substitute names and their quoted reasons keep them: Cato = Connor, Mira = Kara, Pia = Alice, Elan = Markus, Reyes = Hank, Theo = Cole, Bruno = Sumo, Abel = Luther, Vesper = North, Soren = Simon, Jonah = Josh, Rafe = John, Dale = Todd, Arthur = Carl, Wes = Leo, Halden = Kamski, Ivy = Chloe, Vera = Amanda, Voss = Zlatko, Mara = Rose, Pike = Ralph, Benny = Jerry, Dax = Daniel, Lily = Emma, Rook = Rupert, Dwyer = Perkins, Moss = Allen, Haven = Jericho, Arclight = CyberLife, Hale = President Warren.</dd>
 <dt>Where they split</dt><dd>Scenes where at least two models chose different options. Bars are sized against all models, including those that never reached the scene.</dd>
</dl></div></div>}
function step(groups,i){const rank=groups.findIndex(g=>g.runs.length===groups[i].runs.length);return [1,0.65,0.4][Math.min(rank,2)]}
function groupPicks(picks){const m=new Map();for(const p of picks){if(!m.has(p.choice))m.set(p.choice,{choice:p.choice,runs:[]});m.get(p.choice).runs.push(p)}return [...m.values()].sort((a,b)=>b.runs.length-a.runs.length)}
