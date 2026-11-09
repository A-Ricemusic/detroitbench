import React,{forwardRef,useId} from 'react';
import clsx from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Check,ChevronDown,X,Search,Info,TriangleAlert,CircleCheck,CircleX,CircleAlert,Minus} from 'lucide-react';
export const cx=(...a)=>twMerge(clsx(a));
// The Radix-based controls (Select, Segmented, Sheet, Modal, the appearance menu) live in ui-radix.jsx, a chunk of
// their own: the lazy pages import it directly and the results page loads it after first paint (deferred.jsx).

/* ---------- Buttons ---------- */
const BTN={
 primary:'bg-accent text-on-accent border-transparent hover:bg-accent-2 shadow-sm',
 secondary:'bg-surface text-ink border-line-2 hover:bg-surface-2 shadow-sm',
 ghost:'bg-transparent text-ink-2 border-transparent hover:bg-surface-2 hover:text-ink',
 soft:'bg-accent-soft text-accent border-transparent hover:brightness-95 dark:hover:brightness-110',
 link:'bg-transparent text-accent border-transparent underline underline-offset-4 decoration-accent/40 hover:decoration-accent px-0 min-h-0'
};
const SIZE={sm:'min-h-11 md:min-h-9 px-3 text-[13px] gap-1.5 rounded-md',md:'min-h-11 md:min-h-10 px-4 text-sm gap-2 rounded-lg',lg:'min-h-12 px-5 text-base gap-2 rounded-lg'};
export const Button=forwardRef(function Button({as:Tag='button',variant='secondary',size='md',icon:Icon,iconRight:Right,className,children,...rest},ref){
 const props=Tag==='button'?{type:'button',...rest}:rest;
 return <Tag ref={ref} className={cx('inline-flex items-center justify-center font-medium border transition-colors duration-150 select-none disabled:opacity-45 disabled:pointer-events-none whitespace-nowrap',BTN[variant],variant==='link'?'':SIZE[size],className)} {...props}>{Icon&&<Icon aria-hidden="true" className="size-4 shrink-0"/>}{children}{Right&&<Right aria-hidden="true" className="size-4 shrink-0"/>}</Tag>});
export const IconButton=forwardRef(function IconButton({label,icon:Icon,className,size='md',variant='ghost',...rest},ref){return <Button ref={ref} aria-label={label} variant={variant} className={cx('px-0 shrink-0',size==='sm'?'size-11 md:size-9':'size-11 md:size-10',className)} {...rest}><Icon aria-hidden="true" className="size-4.5"/></Button>});

/* ---------- Badges & tones ---------- */
export const TONE={
 neutral:'bg-surface-2 text-ink-2 border-line',accent:'bg-accent-soft text-accent border-transparent',
 connor:'bg-connor-soft text-connor border-transparent',kara:'bg-kara-soft text-kara border-transparent',markus:'bg-markus-soft text-markus border-transparent',
 good:'bg-good-soft text-good border-transparent',mid:'bg-surface-2 text-ink-2 border-line',ok:'bg-accent-soft text-accent border-transparent',warn:'bg-warn-soft text-warn border-transparent',serious:'bg-serious-soft text-serious border-transparent',bad:'bg-bad-soft text-bad border-transparent'
};
export const TONE_ICON={good:CircleCheck,bad:CircleX,serious:CircleAlert,warn:TriangleAlert,mid:Minus};
export function Badge({tone='neutral',icon,children,className,size='md'}){const Icon=icon===true?TONE_ICON[tone]:icon;return <span className={cx('inline-flex items-center gap-1 rounded-full border font-medium leading-none whitespace-nowrap',size==='sm'?'px-2 py-[3px] text-[11px]':'px-2.5 py-1 text-xs',TONE[tone]??TONE.neutral,className)}>{Icon&&<Icon aria-hidden="true" className="size-3.5 -ml-0.5"/>}{children}</span>}
export function Dot({color,className}){return <i aria-hidden="true" className={cx('inline-block size-2.5 rounded-full shrink-0',className)} style={{background:color}}/>}

/* ---------- Combobox: a select you can type into ---------- */
// Same look as Select, but the trigger is a text input that filters the options as you type. Options are
// {value,label,hint?,icon?}; `value` is the selected option's value. Arrow keys move, Enter picks, Escape closes.
export function Combobox({label,hideLabel=false,value,options,onChange,className,placeholder='Type to search'}){
 const id=useId(),listId=id+'-list',[open,setOpen]=React.useState(false),[query,setQuery]=React.useState(''),[active,setActive]=React.useState(0),wrap=React.useRef(null),input=React.useRef(null);
 const current=options.find(o=>o.value===value);
 const shown=React.useMemo(()=>{const q=query.trim().toLowerCase();return q?options.filter(o=>`${o.label} ${o.hint??''}`.toLowerCase().includes(q)):options},[options,query]);
 React.useEffect(()=>{setActive(0)},[query,open]);
 React.useEffect(()=>{if(!open)return;const f=e=>{if(!wrap.current?.contains(e.target))setOpen(false)};addEventListener('pointerdown',f);return()=>removeEventListener('pointerdown',f)},[open]);
 const pick=o=>{onChange(o.value);setQuery('');setOpen(false);input.current?.focus()};
 const onKey=e=>{if(e.key==='ArrowDown'){e.preventDefault();setOpen(true);setActive(a=>Math.min(a+1,shown.length-1))}
  else if(e.key==='ArrowUp'){e.preventDefault();setActive(a=>Math.max(a-1,0))}
  else if(e.key==='Enter'){if(open&&shown[active]){e.preventDefault();pick(shown[active])}}
  else if(e.key==='Escape'){if(open){e.preventDefault();setOpen(false);setQuery('')}}};
 return <div ref={wrap} className={cx('relative flex flex-col gap-1.5 min-w-0',className)}>
  {label&&<label htmlFor={id} className={cx('text-xs font-medium text-ink-3 tracking-wide',hideLabel&&'sr-only')}>{label}</label>}
  <div className="relative">
   {current?.icon&&!open&&!query&&<Dot color={current.icon} className="absolute left-3 top-1/2 -translate-y-1/2"/>}
   <input id={id} ref={input} role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={open&&shown[active]?`${id}-opt-${active}`:undefined} autoComplete="off"
    value={open||query?query:(current?.label??'')} placeholder={current?.label??placeholder}
    onChange={e=>{setQuery(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} onClick={()=>setOpen(true)} onKeyDown={onKey}
    className={cx('w-full min-h-11 md:min-h-10 rounded-lg border border-line-2 bg-surface pr-9 text-sm text-ink text-ellipsis placeholder:text-ink-2 shadow-sm hover:bg-surface-2 focus:border-accent outline-none transition-colors',current?.icon&&!open&&!query?'pl-8':'pl-3')}/>
   <ChevronDown aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-ink-3 pointer-events-none"/>
  </div>
  {open&&<ul id={listId} role="listbox" aria-label={label} className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-72 overflow-auto rounded-xl border border-line bg-raised p-1.5 shadow-lg anim-fade-up">
   {shown.length?shown.map((o,i)=><li key={String(o.value)} id={`${id}-opt-${i}`} role="option" aria-selected={o.value===value} onMouseEnter={()=>setActive(i)} onMouseDown={e=>{e.preventDefault();pick(o)}}
     className={cx('relative flex items-center gap-2 rounded-md pl-3 pr-9 min-h-11 md:min-h-10 py-1.5 text-sm text-ink cursor-pointer select-none',i===active&&'bg-accent-soft ring-2 ring-inset ring-accent',o.value===value&&'text-accent')}>
     {o.icon&&<Dot color={o.icon}/>}<span className="flex flex-col min-w-0"><span className="truncate">{o.label}</span>{o.hint&&<span className="text-xs text-ink-3">{o.hint}</span>}</span>
     {o.value===value&&<Check aria-hidden="true" className="absolute right-3 size-4"/>}
    </li>):<li className="px-3 py-2 text-sm text-ink-3">No matches</li>}
  </ul>}
 </div>}

/* ---------- Search field ---------- */
export const SearchField=forwardRef(function SearchField({label='Search',value,onChange,onClear,placeholder,className},ref){
 const id=useId(),inner=React.useRef(null);const setRef=el=>{inner.current=el;if(typeof ref==='function')ref(el);else if(ref)ref.current=el};
 const clear=()=>{onClear?onClear():onChange('');inner.current?.focus()};
 return <div className={cx('relative flex items-center min-w-0',className)}>
  <label htmlFor={id} className="sr-only">{label}</label>
  <Search aria-hidden="true" className="absolute left-3 size-4 text-ink-3 pointer-events-none"/>
  <input id={id} ref={setRef} type="search" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full min-h-11 md:min-h-10 rounded-lg border border-line-2 bg-surface pl-9 pr-10 text-sm text-ink placeholder:text-ink-3 shadow-sm focus:border-accent [&::-webkit-search-cancel-button]:hidden"/>
  {value&&<button type="button" aria-label="Clear search" onClick={clear} className="absolute right-0.5 inline-flex size-10 md:size-9 items-center justify-center rounded-md text-ink-3 hover:text-ink hover:bg-surface-2"><X aria-hidden="true" className="size-4"/></button>}
 </div>});

/* ---------- Page scaffolding ---------- */
export function PageHeader({eyebrow,title,lede,actions,children}){
 return <header className="mb-6 md:mb-8">
  <div className="min-w-0 max-w-3xl">{eyebrow&&<p className="text-xs font-semibold uppercase tracking-[.08em] text-ink-3 mb-2">{eyebrow}</p>}<h1 className="text-[28px] md:text-4xl font-semibold tracking-tight">{title}</h1>{lede&&<p className="mt-2 text-ink-2 text-[15px] md:text-base max-w-[62ch]">{lede}</p>}{children}</div>
  {actions&&<div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
 </header>}
export function Section({title,lede,actions,children,className,id}){const H='h2';
 return <section id={id} className={cx('mt-10 md:mt-12',className)} aria-labelledby={id&&title?id+'-h':undefined}>
  {(title||actions)&&<div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div className="min-w-0">{title&&<H id={id?id+'-h':undefined} className="text-xl md:text-2xl font-semibold">{title}</H>}{lede&&<p className="mt-1 text-sm text-ink-2 max-w-[70ch]">{lede}</p>}</div>{actions&&<div className="flex flex-wrap gap-2 w-full md:w-auto">{actions}</div>}</div>}
  {children}
 </section>}
export const Card=forwardRef(function Card({children,className,as:Tag='div',...rest},ref){return <Tag ref={ref} className={cx('rounded-xl border border-line bg-surface shadow-sm',className)} {...rest}>{children}</Tag>});
export function StatTile({label,value,note,tone}){
 return <div className="rounded-xl border border-line bg-surface p-4 md:p-5 shadow-sm grid grid-rows-[2.4rem_auto_minmax(2rem,auto)] gap-1 min-w-0">
  <dt className="text-[11px] leading-[1.2] font-medium text-ink-3 uppercase tracking-wide self-start">{label}</dt>
  <dd className={cx('self-start text-2xl md:text-[28px] font-semibold tracking-tight leading-none tnum',tone==='good'&&'text-good',tone==='bad'&&'text-bad')}>{value}</dd>
  <dd className="text-xs leading-4 text-ink-3 mt-1 self-start">{note}</dd>
 </div>}
export function Notice({tone='neutral',children,onDismiss,className,role}){
 const Icon=tone==='bad'?CircleX:tone==='warn'?TriangleAlert:Info;
 return <div role={role??(tone==='bad'?'alert':'status')} className={cx('flex items-start gap-3 rounded-lg border px-4 py-3 text-sm',tone==='bad'?'border-bad/30 bg-bad-soft text-ink':tone==='warn'?'border-warn/30 bg-warn-soft text-ink':'border-line bg-surface-2 text-ink-2',className)}>
  <Icon aria-hidden="true" className={cx('size-4 mt-0.5 shrink-0',tone==='bad'?'text-bad':tone==='warn'?'text-warn':'text-ink-3')}/><div className="grow min-w-0">{children}</div>
  {onDismiss&&<button type="button" onClick={onDismiss} aria-label="Dismiss" className="-mr-2 -my-1 inline-flex size-11 md:size-9 items-center justify-center rounded-md text-ink-3 hover:text-ink hover:bg-surface-3"><X aria-hidden="true" className="size-4"/></button>}
 </div>}
export function Empty({icon:Icon,title,children,action}){
 return <div className="rounded-xl border border-dashed border-line-2 bg-surface-2/50 px-6 py-10 text-center flex flex-col items-center gap-2">
  {Icon&&<Icon aria-hidden="true" className="size-6 text-ink-3"/>}{title&&<p className="font-medium text-ink">{title}</p>}{children&&<p className="text-sm text-ink-2 max-w-[48ch]">{children}</p>}{action&&<div className="mt-2">{action}</div>}
 </div>}
export function useMediaQuery(q){const [m,setM]=React.useState(()=>typeof matchMedia!=='undefined'&&matchMedia(q).matches);React.useEffect(()=>{const mq=matchMedia(q),f=()=>setM(mq.matches);f();mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[q]);return m}
export function Skeleton({className}){return <div aria-hidden="true" className={cx('animate-pulse rounded-md bg-surface-3',className)}/>}
// After a rebuild an open tab still asks for the old hashed chunk of a lazy page and the import fails. Reload once to
// pick up the new build; a sessionStorage timestamp stops a loop, so a second failure within 30 s shows the error card.
const STALE_CHUNK=/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i,RELOAD_KEY='detroitbench.chunk-reload';
const canReload=()=>{try{return Date.now()-(+sessionStorage.getItem(RELOAD_KEY)||0)>30000}catch{return false}};
const markReload=()=>{try{sessionStorage.setItem(RELOAD_KEY,String(Date.now()))}catch{}};
// For a dynamic import that fails outside any page's ErrorBoundary (src/components/deferred.jsx): reloads, once per
// 30 s, when the failure is a stale chunk, and says whether it did.
export function reloadIfStale(error){if(!STALE_CHUNK.test(String(error?.message||error))||!canReload())return false;markReload();location.reload();return true}
export class ErrorBoundary extends React.Component{
 state={error:null,reloading:false};
 static getDerivedStateFromError(error){return {error,reloading:STALE_CHUNK.test(String(error?.message||error))&&canReload()}}
 componentDidCatch(error){if(this.state.reloading){markReload();location.reload();return}console.error(error)}
 render(){if(this.state.reloading)return <p role="status" className="text-sm text-ink-2">Loading the latest version of the site…</p>;if(this.state.error)return <div role="alert" className="rounded-xl border border-bad/30 bg-bad-soft p-5 text-sm"><p className="font-semibold text-ink">Something went wrong on this page.</p><p className="mt-1 text-ink-2">{String(this.state.error?.message||this.state.error)}</p><Button className="mt-3" size="sm" onClick={()=>{this.setState({error:null});if(location.hash==='#/runs')location.reload();else location.hash='#/runs'}}>Back to runs</Button></div>;return this.props.children}
}
