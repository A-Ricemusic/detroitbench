import React,{Suspense,lazy,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './app.css';
import {ErrorBoundary,Skeleton} from './components/ui.jsx';
import {Header,TabBar,Footer} from './components/Shell.jsx';
import {useRoute} from './lib/router.jsx';
import {Announcer} from './lib/announce.jsx';
import Runs from './pages/Runs.jsx';
import Relationships from './pages/Relationships.jsx';
const Splits=lazy(()=>import('./pages/Splits.jsx'));
const Research=lazy(()=>import('./pages/Research.jsx'));
const Sources=lazy(()=>import('./pages/Sources.jsx'));
const Report=lazy(()=>import('./pages/Report.jsx'));

const TITLES={runs:'Model playthroughs',relationships:'Relationships',splits:'Where they split',research:'Question bank',sources:'Sources'};
// Rendered after the page inside Suspense, so its effect runs once the page's DOM exists: focus moves to the new heading.
function FocusHeading({skip}){useEffect(()=>{if(skip)return;const h=document.querySelector('main h1');if(h&&!document.querySelector('[role=dialog]')){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}},[]);return null}
function Loading(){return <div className="grid gap-4" aria-busy="true"><Skeleton className="h-9 w-72"/><Skeleton className="h-5 w-full max-w-xl"/><Skeleton className="h-40"/><p className="sr-only" role="status">Loading…</p></div>}
function App(){
 const [route,navigate]=useRoute();const section=route.segs[0];
 // #/runs/<id>/report is the in-app run report; #/runs/<id> stays the runs page with that run's sheet open.
 const report=section==='runs'&&route.segs[2]==='report'&&route.segs[1];
 const pageKey=section==='research'?route.segs.slice(0,2).join('/'):report?'report/'+report:section;
 useEffect(()=>{if(route.n>0)scrollTo({top:0,behavior:'instant'})},[pageKey]);
 // The report page sets its own title once its data has loaded.
 useEffect(()=>{if(!report)document.title=TITLES[section]+' · DetroitBench'},[section,report]);
 const skip=e=>{e.preventDefault();const m=document.getElementById('main');m.focus();m.scrollIntoView()};
 return <>
  <a href="#main" onClick={skip} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent">Skip to content</a>
  <Header section={section}/>
  <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
   <main id="main" tabIndex={-1} className="container-x mx-auto max-w-7xl pt-6 md:pt-10 min-h-[70dvh] outline-none scroll-mt-[var(--header-h)]">
    <ErrorBoundary key={report?'report':section}><Suspense fallback={<Loading/>}>
     {section==='runs'&&!report&&<Runs route={route} navigate={navigate}/>}
     {report&&<Report key={report} id={report}/>}
     {section==='relationships'&&<Relationships/>}
     {section==='splits'&&<Splits/>}
     {section==='research'&&<Research route={route} navigate={navigate}/>}
     {section==='sources'&&<Sources/>}
     <FocusHeading key={pageKey} skip={route.n===0}/>
    </Suspense></ErrorBoundary>
   </main>
   <Footer/>
  </div>
  <TabBar section={section}/>
  <Announcer/>
 </>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
