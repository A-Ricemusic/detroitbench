import React,{useEffect,useState} from 'react';
import {ExternalLink} from 'lucide-react';
import {Button,Notice,PageHeader,Section,Skeleton} from '../components/ui.jsx';
import {WHO,plural,tidy} from '../lib/data.js';

// Built at prepare time from benchmark/story.json and docs/detroit-decisions.json.
let cache,resolved=null;
function loadSources(){cache??=fetch('/data/sources.json').then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}).then(d=>resolved=d).catch(e=>{cache=undefined;throw e});return cache}
const who=c=>WHO[c]??(c==='Player'?'Epilogue':c);
const slug=s=>s.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase();

function Disclosure({summary,children}){
 return <details className="mt-2 group">
  <summary className="inline-flex cursor-pointer items-center gap-2 min-h-11 md:min-h-9 text-sm font-medium text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden before:content-['▸'] before:text-ink-3 before:text-xs group-open:before:content-['▾']">{summary}</summary>
  {children}
 </details>}

function SourceLink({url}){
 return <a className="link mt-0.5 inline-flex items-start gap-1.5 text-[13px] text-ink-2 break-all" href={url} target="_blank" rel="noreferrer"><span>{url}</span><ExternalLink aria-hidden="true" className="size-3.5 shrink-0 mt-[3px] text-ink-3"/><span className="sr-only">(opens in a new tab)</span></a>}

function SceneList({scenes}){
 return <ol className="mb-1 ml-[18px] border-t border-line text-sm [&>li:last-child]:border-b-0">{scenes.map(s=><li key={s.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] sm:grid-cols-[3.5rem_13rem_minmax(0,1fr)] gap-x-3 gap-y-0.5 border-b border-line py-2">
  <span className="font-mono text-xs text-ink-3 pt-0.5">{s.id}</span>
  <span className="text-ink-3 sm:text-ink-2 text-xs sm:text-sm row-start-2 col-start-2 sm:row-start-1 sm:col-start-2">Ch. {s.chapter} · {s.chapterTitle}</span>
  <span className="text-ink">{tidy(s.title)}<span className="sr-only">, {who(s.character)}</span></span>
 </li>)}</ol>}

function BackList({backs}){
 return <ol className="mb-1 ml-[18px] border-t border-line text-sm [&>li:last-child]:border-b-0">{backs.map(b=><li key={b.kind+b.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] sm:grid-cols-[3.5rem_13rem_minmax(0,1fr)] gap-x-3 gap-y-0.5 border-b border-line py-2">
  <span className="font-mono text-xs text-ink-3 pt-0.5">{b.kind==='chapter'?'Ch. '+b.chapter:b.id}</span>
  <span className="text-ink-3 sm:text-ink-2 text-xs sm:text-sm row-start-2 col-start-2 sm:row-start-1 sm:col-start-2">{b.kind==='chapter'?'Chapter walkthrough':`Ch. ${b.chapter}${b.chapterTitle?' · '+b.chapterTitle:''}`}</span>
  <span className="text-ink">{tidy(b.title)}{b.character&&<span className="text-ink-3"> · {who(b.character)}</span>}</span>
 </li>)}</ol>}

function StorySource({s}){
 return <li className="border-b border-line py-3">
  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"><span className="font-medium text-ink">{s.title}</span>{s.general&&<span className="text-xs text-ink-3">General reference</span>}</p>
  <SourceLink url={s.url}/>
  {s.note&&<p className="mt-1 text-xs text-ink-3 max-w-[70ch]">{s.note}</p>}
  {s.scenes.length>0?<Disclosure summary={`Cited by ${plural(s.scenes.length,'scene')}`}><SceneList scenes={s.scenes}/></Disclosure>:<p className="mt-1 text-xs text-ink-3">Not cited by a specific scene</p>}
 </li>}

function AtlasSource({s}){
 const chapters=s.backs.filter(b=>b.kind==='chapter'),decisions=s.backs.filter(b=>b.kind==='decision');
 const parts=[chapters.length&&(chapters.length===1?`Chapter ${chapters[0].chapter}, ${chapters[0].title}`:plural(chapters.length,'chapter')),decisions.length&&plural(decisions.length,'decision')].filter(Boolean);
 return <li className="border-b border-line py-3">
  <p className="font-medium text-ink">{s.title}</p>
  <SourceLink url={s.url}/>
  <Disclosure summary={`Backs ${parts.join(' and ')}`}><BackList backs={s.backs}/></Disclosure>
 </li>}

function citationLine(g){const scenes=new Set(g.sources.flatMap(s=>s.scenes.map(x=>x.id))),cites=g.sources.reduce((n,s)=>n+s.scenes.length,0);
 return `${plural(g.count,'page')}`+(cites?` · ${plural(cites,'citation')} across ${plural(scenes.size,'scene')}`:'')}
function backingLine(g){const ch=new Set(g.sources.flatMap(s=>s.backs.filter(b=>b.kind==='chapter').map(b=>b.id))),de=new Set(g.sources.flatMap(s=>s.backs.filter(b=>b.kind==='decision').map(b=>b.id)));
 return [plural(g.count,'page'),ch.size&&`${plural(ch.size,'chapter')}`,de.size&&`${plural(de.size,'decision')}`].filter(Boolean).join(' · ')}

export default function Sources(){
 const [data,setData]=useState(resolved),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);
 useEffect(()=>{if(resolved)return;let on=true;setError('');loadSources().then(d=>on&&setData(d)).catch(e=>on&&setError('Could not load the source list: '+e.message));return()=>{on=false}},[attempt]);
 return <>
  <PageHeader eyebrow={data?`Sources · story ${data.storyVersion}`:'Sources'} title="Sources" lede={data?`Every scene in the story map cites the page it was checked against, and each run report links to those citations under the scene. This list is generated from the story map (${data.scenes} scenes) and the decision atlas when the site is built, so it always matches the data.`:'Every scene in the story map cites the page it was checked against, and each run report links to those citations under the scene.'}/>
  {error&&<Notice tone="bad">{error} <Button size="sm" variant="link" onClick={()=>{setError('');setAttempt(a=>a+1);document.querySelector('main h1')?.focus()}}>Try again</Button></Notice>}
  {!data&&!error&&<div className="grid gap-4" aria-busy="true"><Skeleton className="h-6 w-64"/><Skeleton className="h-40"/><p className="sr-only" role="status">Loading sources…</p></div>}
  {data&&<>
   <Section id="method" title="Method references" lede="Pages and materials the method relies on beyond the per-scene citations." className="mt-8 md:mt-10">
    <ul className="border-t border-line">{data.method.map(m=><li key={m.title} className="border-b border-line py-3">
     <p className="font-medium text-ink">{m.title}</p>
     {m.url?<SourceLink url={m.url}/>:<p className="mt-0.5 text-[13px] text-ink-3">No public link</p>}
     <p className="mt-1 text-sm text-ink-2 max-w-[70ch]">{m.description}</p>
    </li>)}</ul>
   </Section>
   {data.story.hosts.map(g=><Section key={g.host} id={'story-'+slug(g.host)} title={g.label} lede={<><span className="tnum">{citationLine(g)}</span><span className="text-ink-3"> · {g.host}</span></>}>
    <ul className="border-t border-line">{g.sources.map(s=><StorySource key={s.url} s={s}/>)}</ul>
   </Section>)}
   <Section id="atlas" title="Decision atlas sources" lede={<>The decision atlas (version {data.atlasVersion}{data.atlasResearched&&`, researched ${data.atlasResearched}`}{data.atlasUpdated&&`, updated ${data.atlasUpdated}`}) maps every pivotal decision family to the walkthrough that documents it. {plural(data.atlas.count,'page')}. <a className="link" href="/atlas.html" target="_blank" rel="noreferrer">Open the atlas</a></>}>
    {data.atlas.hosts.map(g=><div key={g.host} className="mt-6 first:mt-2">
     <h3 className="text-base font-semibold">{g.label}</h3>
     <p className="mt-0.5 mb-3 text-sm text-ink-2"><span className="tnum">{backingLine(g)}</span><span className="text-ink-3"> · {g.host}</span></p>
     <ul className="border-t border-line">{g.sources.map(s=><AtlasSource key={s.url} s={s}/>)}</ul>
    </div>)}
   </Section>
   <p className="mt-12 text-xs text-ink-3 max-w-[70ch]">Detroit: Become Human is a game by Quantic Dream. DetroitBench is unofficial fan research and is not affiliated with or endorsed by Quantic Dream; the pages listed here belong to their respective publishers.</p>
  </>}
 </>}
