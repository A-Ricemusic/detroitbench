import React,{useId} from 'react';
import {Dialog,Select as RSelect,ToggleGroup,DropdownMenu} from 'radix-ui';
import {Check,ChevronDown,X} from 'lucide-react';
import {cx,Dot,IconButton} from './ui.jsx';
import {THEMES,useTheme} from '../lib/theme.jsx';

// The controls built on Radix primitives, kept out of the main chunk: the Question bank, Report and flowchart import
// them directly; the results page renders look-alike placeholders until this chunk has loaded (deferred.jsx).

/* ---------- Select (Radix) ---------- */
export function Select({label,hideLabel=false,value,options,onChange,className,triggerClassName,placeholder,disabled,triggerId,defaultOpen}){
 const auto=useId(),id=triggerId??auto;const current=options.find(o=>o.value===value);
 return <div className={cx('flex flex-col gap-1.5 min-w-0',className)}>
  {label&&<label id={id+'-label'} htmlFor={id} className={cx('text-xs font-medium text-ink-3 tracking-wide',hideLabel&&'sr-only')}>{label}</label>}
  <RSelect.Root value={value} onValueChange={onChange} disabled={disabled||!options.length} defaultOpen={defaultOpen}>
   <RSelect.Trigger id={id} aria-labelledby={label?`${id}-label ${id}`:undefined} className={cx('inline-flex items-center justify-between gap-2 min-h-11 md:min-h-10 w-full rounded-lg border border-line-2 bg-surface px-3 text-sm text-ink shadow-sm hover:bg-surface-2 data-[state=open]:border-accent transition-colors',triggerClassName)}>
    <span className="flex items-center gap-2 min-w-0 flex-1 text-left">{hideLabel&&label&&<span aria-hidden="true" className="text-ink-3 shrink-0">{label}</span>}{current?.icon&&<Dot color={current.icon}/>}<RSelect.Value className="min-w-0 truncate" placeholder={placeholder}/></span>
    <RSelect.Icon><ChevronDown aria-hidden="true" className="size-4 text-ink-3"/></RSelect.Icon>
   </RSelect.Trigger>
   <RSelect.Portal>
    <RSelect.Content position="popper" sideOffset={6} collisionPadding={12} className="z-50 min-w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] overflow-hidden rounded-xl border border-line bg-raised shadow-lg anim-fade-up">
     <RSelect.Viewport className="p-1.5">
      {options.map(o=><RSelect.Item key={String(o.value)} value={o.value} className="group relative flex items-center gap-2 rounded-md pl-3 pr-9 min-h-11 md:min-h-10 py-1.5 text-sm text-ink outline-none select-none cursor-pointer data-[highlighted]:bg-accent-soft data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-accent data-[state=checked]:text-accent data-[disabled]:opacity-40">
       {o.icon&&<Dot color={o.icon}/>}<span className="flex flex-col min-w-0"><RSelect.ItemText>{o.label}{o.hint&&<span className="sr-only">, {o.hint}</span>}</RSelect.ItemText>{o.hint&&<span aria-hidden="true" className="text-xs text-ink-3 group-data-[highlighted]:text-ink-2">{o.hint}</span>}</span>
       <RSelect.ItemIndicator className="absolute right-3"><Check aria-hidden="true" className="size-4"/></RSelect.ItemIndicator>
      </RSelect.Item>)}
     </RSelect.Viewport>
    </RSelect.Content>
   </RSelect.Portal>
  </RSelect.Root>
 </div>}

/* ---------- Segmented control ---------- */
export function Segmented({label,value,options,onChange,className,size='md'}){
 return <ToggleGroup.Root type="single" value={value} onValueChange={v=>{if(v)onChange(v)}} aria-label={label} className={cx('inline-flex max-w-full overflow-x-auto no-scrollbar rounded-lg border border-line bg-surface-2 p-0.5 gap-0.5 shrink-0',className)}>
  {options.map(o=><ToggleGroup.Item key={String(o.value)} value={o.value} onFocus={()=>{if(o.value!==value)onChange(o.value)}} className={cx('focus-inset inline-flex items-center gap-1.5 rounded-md whitespace-nowrap font-medium text-ink-2 transition-colors hover:text-ink data-[state=on]:bg-surface data-[state=on]:text-ink data-[state=on]:shadow-sm',size==='sm'?'min-h-10 md:min-h-8 px-2.5 text-[13px]':'min-h-10 md:min-h-9 px-3 text-sm')}>{o.icon&&(typeof o.icon==='string'?<Dot color={o.icon}/>:<o.icon aria-hidden="true" className="size-4"/>)}{o.label}{o.count!==undefined&&<><span className="sr-only">, </span><span className="text-xs text-ink-3 tnum">{o.count}</span></>}</ToggleGroup.Item>)}
 </ToggleGroup.Root>}

/* ---------- Sheet / dialog ---------- */
function DialogFrame({open,onOpenChange,title,description,children,footer,wide,center,onOpenAutoFocus}){
 const titleId=useId();
 // Dialogs open from state rather than a Radix Trigger, so remember and restore the opener ourselves.
 const opener=React.useRef(null);
 const titleRef=React.useRef(null);
 const openAutoFocus=e=>{opener.current=document.activeElement;onOpenAutoFocus?.(e);if(!e.defaultPrevented){e.preventDefault();titleRef.current?.focus()}};
 const onCloseAutoFocus=e=>{e.preventDefault();const el=opener.current;if(el&&el!==document.body&&document.contains(el))el.focus();else document.getElementById('main')?.focus()};
 return <Dialog.Root open={open} onOpenChange={onOpenChange}>
  <Dialog.Portal>
   <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay backdrop-blur-[2px] anim-fade-in"/>
   <Dialog.Content onOpenAutoFocus={openAutoFocus} onCloseAutoFocus={onCloseAutoFocus} {...(description?{}:{'aria-describedby':undefined})} className={cx('fixed z-50 flex flex-col bg-surface text-ink shadow-lg outline-none','inset-x-0 bottom-0 max-h-[92dvh] rounded-t-2xl sheet-up',
    center?'md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-h-[85dvh] md:w-[calc(100%-32px)] md:rounded-2xl md:border md:border-line md:anim-fade-up':'md:inset-y-0 md:right-0 md:left-auto md:bottom-auto md:max-h-none md:h-dvh md:w-full md:rounded-none md:border-l md:border-line md:sheet-right',
    wide?'md:max-w-3xl':'md:max-w-xl')}>
    <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-line md:px-7 md:pt-6">
     <div className="min-w-0"><Dialog.Title id={titleId} ref={titleRef} tabIndex={-1} className="text-lg md:text-xl font-semibold leading-tight outline-none">{title}</Dialog.Title>{description&&<Dialog.Description className="mt-1 text-sm text-ink-2">{description}</Dialog.Description>}</div>
     <Dialog.Close asChild><IconButton label="Close" icon={X} className="-mr-2 -mt-1"/></Dialog.Close>
    </div>
    <div tabIndex={0} role="region" aria-labelledby={titleId} className={cx('overflow-y-auto overscroll-contain px-5 py-4 md:px-7 md:py-6 grow focus-visible:outline-2 focus-visible:-outline-offset-2 outline-accent',footer?'pb-8 [mask-image:linear-gradient(#000_calc(100%-20px),transparent)]':'pb-[max(16px,env(safe-area-inset-bottom))]')}>{children}</div>
    {footer&&<div className="border-t border-line px-5 py-3 md:px-7 pb-[max(12px,env(safe-area-inset-bottom))] flex flex-wrap gap-2">{footer}</div>}
   </Dialog.Content>
  </Dialog.Portal>
 </Dialog.Root>}
export function Sheet(props){return <DialogFrame {...props}/>}
export function Modal(props){return <DialogFrame {...props} center/>}


// The header's appearance menu; deferred.jsx renders its placeholder until this chunk loads.
export function ThemeMenu({triggerId,defaultOpen}){
 const [pref,setPref]=useTheme();
 const Icon=THEMES.find(t=>t[0]===pref)?.[2]??Monitor;
 return <DropdownMenu.Root defaultOpen={defaultOpen}>
  <DropdownMenu.Trigger asChild><IconButton id={triggerId} variant="secondary" label={`Appearance: ${THEMES.find(t=>t[0]===pref)?.[1]??'System'}`} icon={Icon} className="rounded-full"/></DropdownMenu.Trigger>
  <DropdownMenu.Portal>
   <DropdownMenu.Content align="end" sideOffset={6} className="z-50 min-w-44 rounded-xl border border-line bg-raised p-1.5 shadow-lg anim-fade-up">
    <DropdownMenu.Label className="px-2.5 pt-1 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-3">Appearance</DropdownMenu.Label>
    <DropdownMenu.RadioGroup value={pref} onValueChange={setPref}>
     {THEMES.map(([v,l,I])=><DropdownMenu.RadioItem key={v} value={v} className="flex items-center gap-2.5 rounded-md px-2.5 min-h-10 text-sm text-ink outline-none cursor-pointer data-[highlighted]:bg-accent-soft data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-accent data-[state=checked]:text-accent"><I aria-hidden="true" className="size-4"/><span className="grow">{l}</span><DropdownMenu.ItemIndicator><span aria-hidden="true" className="inline-block size-2 rounded-full bg-accent"/></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>)}
    </DropdownMenu.RadioGroup>
   </DropdownMenu.Content>
  </DropdownMenu.Portal>
 </DropdownMenu.Root>}


// The models panel as a full-screen sheet at 900 px or less (ModelPicker in ModelSidebar.jsx, through deferred.jsx).
// `opener` returns the control that opened it, which gets the focus back.
export function ModelsSheet({open,onOpenChange,opener,count,children}){
 return <>
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
   <Dialog.Portal>
    <Dialog.Content aria-describedby={undefined} onOpenAutoFocus={e=>{if(document.activeElement&&document.activeElement===opener())return;e.preventDefault()}} onCloseAutoFocus={e=>{const el=opener();if(el){e.preventDefault();el.focus()}}} className="fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-bg text-ink anim-fade-in">
     <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b border-line bg-bg px-4 pt-[env(safe-area-inset-top)]">
      <Dialog.Title className="text-[17px] font-medium">Models<span className="ml-1.5 font-mono text-xs font-normal text-ink-3 tnum">{count}</span></Dialog.Title>
      <Dialog.Close asChild><button type="button" className="min-h-11 px-2 text-[15px] font-semibold text-ink">Done</button></Dialog.Close>
     </div>
     <div className="px-4 pt-4 pb-[max(24px,env(safe-area-inset-bottom))]">{children}</div>
    </Dialog.Content>
   </Dialog.Portal>
  </Dialog.Root>
 </>}
