import React,{Suspense,lazy,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './app.css';
import {ErrorBoundary,Skeleton} from './components/ui.jsx';
import {Header,TabBar,Footer} from './components/Shell.jsx';
import {useRoute} from './lib/router.jsx';
import {Announcer} from './lib/announce.jsx';
import {ModelFocusProvider} from './lib/modelFocus.jsx';
import Runs from './pages/Runs.jsx';
const Research=lazy(()=>import('./pages/Research.jsx'));
const Sources=lazy(()=>import('./pages/Sources.jsx'));
const HowItWasMade=lazy(()=>import('./pages/HowItWasMade.jsx'));
const Report=lazy(()=>import('./pages/Report.jsx'));

const TITLES={runs:'Model playthroughs',research:'Question bank',sources:'Sources',how:'How it was made'};
// Rendered after the page inside Suspense, so its effect runs once the page's DOM exists: focus moves to the new heading.
function FocusHeading({skip}){useEffect(()=>{if(skip)return;const h=document.querySelector('main h1');if(h&&!document.querySelector('[role=dialog]')){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}},[]);return null}
function Loading(){return <div className="grid gap-4" aria-busy="true"><Skeleton className="h-9 w-72"/><Skeleton className="h-5 w-full max-w-xl"/><Skeleton className="h-40"/><p className="sr-only" role="status">Loading…</p></div>}
function App(){
 const [route,navigate]=useRoute();const section=route.segs[0];
 // #/runs/<id>/report is the in-app run report (the router redirects #/runs/<id> there).
 const report=section==='runs'&&route.segs[2]==='report'&&route.segs[1];
 const pageKey=section==='research'?route.segs.slice(0,2).join('/'):report?'report/'+report:section;
 useEffect(()=>{if(route.n>0)scrollTo({top:0,behavior:'instant'})},[pageKey]);
 // The report page and the How it was made page set their own titles.
 useEffect(()=>{if(!report&&section!=='how')document.title=TITLES[section]+' · DetroitBench'},[section,report]);
 const skip=e=>{e.preventDefault();const m=document.getElementById('main');m.focus();m.scrollIntoView()};
 return <>
  <a href="#main" onClick={skip} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent">Skip to content</a>
  <Header section={section}/>
  <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
   <main id="main" tabIndex={-1} className="container-x mx-auto max-w-7xl pt-6 md:pt-10 min-h-[70dvh] outline-none scroll-mt-[var(--header-h)]">
    <ModelFocusProvider key={pageKey}><ErrorBoundary key={report?'report':section}><Suspense fallback={<Loading/>}>
     {section==='runs'&&!report&&<Runs/>}
     {report&&<Report key={report} id={report} chapter={route.query.chapter}/>}
     {section==='research'&&<Research route={route} navigate={navigate}/>}
     {section==='sources'&&<Sources/>}
     {section==='how'&&<HowItWasMade route={route}/>}
     <FocusHeading key={pageKey} skip={route.n===0}/>
    </Suspense></ErrorBoundary></ModelFocusProvider>
   </main>
   <Footer/>
  </div>
  <TabBar section={section}/>
  <Announcer/>
 </>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
