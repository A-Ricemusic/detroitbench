import React from 'react';
import {Sun,Moon,Monitor,Rows3,FlaskConical,BookOpen,Wrench,SlidersHorizontal} from 'lucide-react';
import {cx,DropdownMenu,IconButton} from './ui.jsx';
import {href} from '../lib/router.jsx';
import {useTheme} from '../lib/theme.jsx';
import {modelsPanel,useModelsPanel,MODELS_TAB_ID} from '../lib/modelsPanel.js';

const NAV=[
 {key:'runs',label:'Runs',short:'Runs',icon:Rows3,path:'runs'},
 {key:'research',label:'Question bank',short:'Questions',icon:FlaskConical,path:'research'},
 {key:'sources',label:'Sources',short:'Sources',icon:BookOpen,path:'sources'},
 {key:'how',label:'How it was made',short:'How',icon:Wrench,path:'how'}
];
const THEMES=[['light','Light',Sun],['dark','Dark',Moon],['system','System',Monitor]];

export function ThemeToggle(){
 const [pref,setPref]=useTheme();
 const Icon=THEMES.find(t=>t[0]===pref)?.[2]??Monitor;
 return <DropdownMenu.Root>
  <DropdownMenu.Trigger asChild><IconButton variant="secondary" label={`Appearance: ${THEMES.find(t=>t[0]===pref)?.[1]??'System'}`} icon={Icon} className="rounded-full"/></DropdownMenu.Trigger>
  <DropdownMenu.Portal>
   <DropdownMenu.Content align="end" sideOffset={6} className="z-50 min-w-44 rounded-xl border border-line bg-raised p-1.5 shadow-lg anim-fade-up">
    <DropdownMenu.Label className="px-2.5 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-3">Appearance</DropdownMenu.Label>
    <DropdownMenu.RadioGroup value={pref} onValueChange={setPref}>
     {THEMES.map(([v,l,I])=><DropdownMenu.RadioItem key={v} value={v} className="flex items-center gap-2.5 rounded-md px-2.5 min-h-10 text-sm text-ink outline-none cursor-pointer data-[highlighted]:bg-accent-soft data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-accent data-[state=checked]:text-accent"><I aria-hidden="true" className="size-4"/><span className="grow">{l}</span><DropdownMenu.ItemIndicator><span aria-hidden="true" className="inline-block size-2 rounded-full bg-accent"/></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>)}
    </DropdownMenu.RadioGroup>
   </DropdownMenu.Content>
  </DropdownMenu.Portal>
 </DropdownMenu.Root>}

export function Brand(){return <a href={href('runs')} className="inline-flex items-center text-ink hover:opacity-90" aria-label="DetroitBench home"><img src="/icon.svg" alt="" width="28" height="28" className="size-7 rounded-md"/></a>}

export function Header({section}){
 return <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70 pt-[env(safe-area-inset-top)]">
  <div className="container-x mx-auto flex h-14 max-w-7xl items-center justify-between gap-4">
   <Brand/>
   <nav aria-label="Main" className="hidden md:flex items-center gap-1">
    {NAV.map(n=><a key={n.key} href={href(n.path)} aria-current={section===n.key?'page':undefined} className={cx('inline-flex items-center gap-2 rounded-lg px-3 min-h-9 text-sm font-medium whitespace-nowrap transition-colors',section===n.key?'bg-surface-2 text-ink':'text-ink-2 hover:text-ink hover:bg-surface-2/70')}><n.icon aria-hidden="true" className="size-4 hidden lg:block"/>{n.label}</a>)}
   </nav>
   <ThemeToggle/>
  </div>
 </header>}

// Phones: the four pages, plus a fifth "Models" tab on a page that has the model panel (the results page), which opens
// that panel (src/lib/modelsPanel.js) and reads as pressed while it is open.
export function TabBar({section}){
 const models=useModelsPanel();
 return <nav aria-label="Main" className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
  <ul className={cx('grid',models.available?'grid-cols-5':'grid-cols-4')}>{NAV.map(n=><li key={n.key}><a href={href(n.path)} aria-current={section===n.key?'page':undefined} className={cx('flex flex-col items-center justify-center gap-1 h-14 text-[10.5px] tracking-tight font-medium',section===n.key?'text-ink':'text-ink-3')}><n.icon aria-hidden="true" className="size-5"/>{n.short}</a></li>)}
   {models.available&&<li><button id={MODELS_TAB_ID} type="button" aria-haspopup="dialog" aria-pressed={models.open} aria-label={`Models, ${models.count} selected`} onClick={()=>modelsPanel.set({open:!models.open})} className={cx('flex h-14 w-full flex-col items-center justify-center gap-1 text-[10.5px] font-medium tracking-tight',models.open?'text-ink':'text-ink-3')}>
    <span className="relative"><SlidersHorizontal aria-hidden="true" className="size-5"/><span aria-hidden="true" className="absolute -right-3 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 font-mono text-[9.5px] font-semibold leading-none text-bg tnum">{models.count}</span></span>Models</button></li>}
  </ul>
 </nav>}

export function Footer(){
 return <footer className="container-x mx-auto max-w-7xl mt-16 mb-8 border-t border-line pt-6 text-xs text-ink-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
  <span className="font-semibold tracking-wide text-ink-2">DetroitBench</span>
  <span>Independent fan research · Full-story spoilers · Not affiliated with Quantic Dream</span>
 </footer>}

export function SubNav({items,current,label,className}){
 return <nav aria-label={label} className={cx('-mx-4 md:mx-0 overflow-x-auto no-scrollbar fade-x md:[mask-image:none] border-b border-line',className)}>
  <ul className="flex gap-1 px-4 pr-16 md:px-0 min-w-max">{items.map(i=><li key={i.key}><a href={href(i.path)} aria-current={current===i.key?'page':undefined} className={cx('focus-inset inline-flex items-center gap-2 px-3 min-h-11 text-sm font-medium border-b-2 -mb-px transition-colors',current===i.key?'border-ink text-ink':'border-transparent text-ink-2 hover:text-ink')}>{i.label}{i.count!==undefined&&<span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-3 tnum">{i.count}</span>}</a></li>)}</ul>
 </nav>}
