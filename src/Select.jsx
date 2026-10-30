import React,{useEffect,useId,useRef,useState} from 'react';
// Accessible custom dropdown: button + listbox, keyboard navigable, closes on outside tap or Escape.
export default function Select({label,value,options,onChange,compact=false}){
 const [open,setOpen]=useState(false),[active,setActive]=useState(0),id=useId(),root=useRef(null),list=useRef(null);
 const current=options.find(o=>o.value===value)??options[0];
 useEffect(()=>{if(!open)return;const close=e=>{if(!root.current?.contains(e.target))setOpen(false)};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close)},[open]);
 useEffect(()=>{if(open){setActive(Math.max(0,options.findIndex(o=>o.value===value)));setTimeout(()=>list.current?.focus(),0)}},[open]);
 const pick=o=>{onChange(o.value);setOpen(false)};
 const onKey=e=>{if(e.key==='ArrowDown'){e.preventDefault();setActive(a=>Math.min(options.length-1,a+1))}else if(e.key==='ArrowUp'){e.preventDefault();setActive(a=>Math.max(0,a-1))}else if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(options[active])}else if(e.key==='Escape'){setOpen(false)}else if(e.key==='Home'){setActive(0)}else if(e.key==='End'){setActive(options.length-1)}};
 return <div className={'select'+(compact?' compact':'')+(open?' open':'')} ref={root}>
  {label&&<span className="select-label" id={id+'-l'}>{label}</span>}
  <button type="button" className="select-btn" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={label?id+'-l '+id+'-b':undefined} id={id+'-b'} onClick={()=>setOpen(o=>!o)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setOpen(true)}}}>
   <span className="select-value">{current?.icon&&<i className="select-dot" style={{background:current.icon}}/>}{current?.label}</span><span className="select-caret" aria-hidden="true">⌄</span>
  </button>
  {open&&<ul className="select-list" role="listbox" tabIndex={-1} ref={list} aria-activedescendant={id+'-o'+active} onKeyDown={onKey}>
   {options.map((o,i)=><li key={String(o.value)} id={id+'-o'+i} role="option" aria-selected={o.value===value} className={(i===active?'active':'')+(o.value===value?' selected':'')} onMouseEnter={()=>setActive(i)} onClick={()=>pick(o)}>{o.icon&&<i className="select-dot" style={{background:o.icon}}/>}<span>{o.label}</span>{o.hint&&<small>{o.hint}</small>}{o.value===value&&<b aria-hidden="true">✓</b>}</li>)}
  </ul>}
 </div>;
}
