import React,{useEffect,useId,useLayoutEffect,useRef,useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {cx,Dot,IconButton,reloadIfStale} from './ui.jsx';
import {THEMES,useTheme} from '../lib/theme.jsx';

// The results page's Radix controls without Radix in the main chunk: the chart menu (phones), the appearance menu and
// the models sheet (900 px or less) render look-alike placeholders until ui-radix.jsx has loaded, then hand over to the
// real control. The chunk loads when the browser is idle after the page's load event, or at once when a placeholder is
// pointed at, focused or pressed; a press opens the real control as soon as it mounts, and a focused placeholder passes
// its focus on. A load that fails on a press reloads the page when the build is stale (reloadIfStale, the check the
// pages' ErrorBoundary makes); the header has no boundary above it, so nothing is thrown. Otherwise the placeholder stays.
let mod=null,promise=null,scheduled=false;const subs=new Set;
export function loadRadix(){promise??=import('./ui-radix.jsx').then(m=>{mod=m;for(const f of subs)f(m);return m},e=>{promise=null;throw e});return promise}
function schedule(){if(scheduled||mod)return;scheduled=true;const idle=window.requestIdleCallback??(f=>setTimeout(f,200)),go=()=>idle(()=>loadRadix().catch(()=>{}),{timeout:3000});
 if(document.readyState==='complete')go();else addEventListener('load',go,{once:true})}
function useHandover(){
 const [m,set]=useState(mod),[open,setOpen]=useState(false),focused=useRef(false),id=useId();
 useEffect(()=>{if(mod){set(mod);return}subs.add(set);schedule();return()=>{subs.delete(set)}},[]);
 // The real control's trigger reuses the placeholder's id, so a focused placeholder hands its focus straight on.
 useLayoutEffect(()=>{if(m&&focused.current&&!open)document.getElementById(id)?.focus({preventScroll:true});focused.current=false},[m]);
 const want=o=>{if(o)setOpen(true);loadRadix().catch(e=>{if(o)reloadIfStale(e)})};
 // Radix opens a menu on a mouse press, on Enter, Space and the arrow keys, and on a touch or pen tap.
 const handlers={onPointerEnter:()=>want(false),onFocus:()=>{focused.current=true;want(false)},onBlur:()=>{focused.current=false},
  onPointerDown:e=>{if(e.pointerType==='mouse'&&e.button===0){e.preventDefault();want(true)}},onClick:()=>want(true),
  onKeyDown:e=>{if(['Enter',' ','ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();want(true)}}};
 return {m,open,id,handlers}}

// Select (ui-radix.jsx) with the same trigger markup in the placeholder.
export function Select(props){
 const {m,open,id,handlers}=useHandover();
 if(m)return <m.Select {...props} triggerId={id} defaultOpen={open}/>;
 const {label,hideLabel=false,value,options,className,triggerClassName,placeholder,disabled}=props,current=options.find(o=>o.value===value);
 return <div className={cx('flex flex-col gap-1.5 min-w-0',className)}>
  {label&&<label id={id+'-label'} htmlFor={id} className={cx('text-xs font-medium text-ink-3 tracking-wide',hideLabel&&'sr-only')}>{label}</label>}
  <button type="button" id={id} role="combobox" aria-expanded="false" aria-autocomplete="none" data-state="closed" aria-labelledby={label?`${id}-label ${id}`:undefined} disabled={disabled||!options.length} {...handlers}
   className={cx('inline-flex items-center justify-between gap-2 min-h-11 md:min-h-10 w-full rounded-lg border border-line-2 bg-surface px-3 text-sm text-ink shadow-sm hover:bg-surface-2 data-[state=open]:border-accent transition-colors',triggerClassName)}>
   <span className="flex items-center gap-2 min-w-0 flex-1 text-left">{hideLabel&&label&&<span aria-hidden="true" className="text-ink-3 shrink-0">{label}</span>}{current?.icon&&<Dot color={current.icon}/>}<span className="min-w-0 truncate" style={{pointerEvents:'none'}}>{current?<>{current.label}{current.hint&&<span className="sr-only">, {current.hint}</span>}</>:placeholder}</span></span>
   <span aria-hidden="true"><ChevronDown aria-hidden="true" className="size-4 text-ink-3"/></span>
  </button>
 </div>}

// The header's appearance menu (ThemeMenu in ui-radix.jsx).
export function ThemeToggle(){
 const {m,open,id,handlers}=useHandover(),[pref]=useTheme();
 if(m)return <m.ThemeMenu triggerId={id} defaultOpen={open}/>;
 const [,name,Icon]=THEMES.find(t=>t[0]===pref)??THEMES[2];
 return <IconButton id={id} variant="secondary" label={`Appearance: ${name}`} icon={Icon} className="rounded-full" aria-haspopup="menu" aria-expanded="false" data-state="closed" {...handlers}/>}

// The models sheet (ModelsSheet in ui-radix.jsx). It opens from state, not from a trigger here, so nothing renders
// until the chunk has loaded; asked to open before then, it loads the chunk and opens when it arrives.
export function ModelsSheet(props){
 const [m,set]=useState(mod);
 useEffect(()=>{if(mod){set(mod);return}subs.add(set);schedule();return()=>{subs.delete(set)}},[]);
 useEffect(()=>{if(props.open&&!m)loadRadix().catch(reloadIfStale)},[props.open,m]);
 return m?<m.ModelsSheet {...props}/>:null}
