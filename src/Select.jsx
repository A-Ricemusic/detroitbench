import React,{useEffect,useId,useRef,useState} from 'react';
// Accessible custom dropdown: button + listbox. Keyboard: arrows, Home/End, Enter/Space, Escape,
// first-letter typeahead. Closes on outside tap or when focus leaves; focus returns to the button.
export default function Select({label,value,options,onChange,compact=false}){
 const [open,setOpen]=useState(false),[active,setActive]=useState(0),[above,setAbove]=useState(false),[end,setEnd]=useState(false),id=useId(),root=useRef(null),list=useRef(null),btn=useRef(null),typed=useRef({s:'',t:0});
 const current=options.find(o=>o.value===value)??options[0];
 const close=(refocus=true)=>{setOpen(false);if(refocus)btn.current?.focus()};
 useEffect(()=>{if(!open)return;const out=e=>{if(!root.current?.contains(e.target))setOpen(false)};document.addEventListener('pointerdown',out);return()=>document.removeEventListener('pointerdown',out)},[open]);
 useEffect(()=>{if(!open)return;setActive(Math.max(0,options.findIndex(o=>o.value===value)));const b=btn.current?.getBoundingClientRect();const bar=document.querySelector('.tabbar'),barH=bar&&getComputedStyle(bar).display!=='none'?bar.offsetHeight:0,below=innerHeight-b.bottom-barH;setAbove(!!b&&below<Math.min(300,options.length*46+12)&&b.top>below);setEnd(!!b&&b.left+240>innerWidth-16);setTimeout(()=>list.current?.focus(),0)},[open]);
 useEffect(()=>{if(open)list.current?.children[active]?.scrollIntoView({block:'nearest'})},[active,open]);
 const pick=o=>{onChange(o.value);close()};
 const onKey=e=>{const k=e.key;if(k==='ArrowDown'){e.preventDefault();setActive(a=>Math.min(options.length-1,a+1))}else if(k==='ArrowUp'){e.preventDefault();setActive(a=>Math.max(0,a-1))}else if(k==='Enter'||k===' '){e.preventDefault();pick(options[active])}else if(k==='Escape'){e.preventDefault();close()}else if(k==='Home'){e.preventDefault();setActive(0)}else if(k==='End'){e.preventDefault();setActive(options.length-1)}else if(k==='Tab'){setOpen(false)}else if(k.length===1&&/\S/.test(k)){const now=Date.now();typed.current={s:(now-typed.current.t<700?typed.current.s:'')+k.toLowerCase(),t:now};const i=options.findIndex(o=>o.label.toLowerCase().startsWith(typed.current.s));if(i>=0)setActive(i)}};
 const onBlur=e=>{if(!root.current?.contains(e.relatedTarget))setOpen(false)};
 return <div className={'select'+(compact?' compact':'')+(open?' open':'')+(above?' above':'')+(end?' end':'')} ref={root} onBlur={onBlur}>
  {label&&<span className="select-label" id={id+'-l'}>{label}</span>}
  <button type="button" ref={btn} className="select-btn" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={label?id+'-l '+id+'-b':undefined} id={id+'-b'} onClick={()=>setOpen(o=>!o)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setOpen(true)}}}>
   <span className="select-value">{current?.icon&&<i className="select-dot" style={{background:current.icon}}/>}{current?.label}</span><span className="select-caret" aria-hidden="true">⌄</span>
  </button>
  {open&&<ul className="select-list" role="listbox" tabIndex={-1} ref={list} aria-labelledby={label?id+'-l':id+'-b'} aria-activedescendant={id+'-o'+active} onKeyDown={onKey}>
   {options.map((o,i)=><li key={String(o.value)} id={id+'-o'+i} role="option" aria-selected={o.value===value} className={(i===active?'active':'')+(o.value===value?' selected':'')} onMouseEnter={()=>setActive(i)} onClick={()=>pick(o)}>{o.icon&&<i className="select-dot" style={{background:o.icon}}/>}<span className="select-text"><span>{o.label}</span>{o.hint&&<small>{o.hint}</small>}</span>{o.value===value&&<b aria-hidden="true">✓</b>}</li>)}
  </ul>}
 </div>;
}
