import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
// Which models are picked out on a page, after Slopalytics: a transient focus (hovering or focusing a sidebar row, a chart
// label, a legend entry or a marker) and persistent highlights (clicking a chart label toggles one; several can be on).
// While either exists every other model drops to 0.15 opacity in every chart. Kept in memory only, never in the URL.
// Escape clears both, unless a dialog is open or the key went to a text field.
const Ctx=createContext({active:null,dim:()=>false,isActive:()=>false,hover:null,setHover:()=>{},pins:new Set,togglePin:()=>{},clear:()=>{}});
export function ModelFocusProvider({children}){
 const [hover,setHoverState]=useState(null),[pins,setPins]=useState(()=>new Set);
 const setHover=useCallback(id=>setHoverState(id&&id!=='all'?id:null),[]);
 const togglePin=useCallback(id=>setPins(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n}),[]);
 const clear=useCallback(()=>{setPins(new Set);setHoverState(null)},[]);
 useEffect(()=>{const f=e=>{if(e.key!=='Escape'||e.defaultPrevented)return;if(e.target?.closest?.('input,textarea,select,[role=dialog]')||document.querySelector('[role=dialog]'))return;clear()};addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[clear]);
 const value=useMemo(()=>{const active=hover||pins.size?new Set([...pins,...(hover?[hover]:[])]):null;
  return {active,hover,setHover,pins,togglePin,clear,isActive:id=>!!active?.has(id),dim:id=>!!active&&!active.has(id)}},[hover,pins,setHover,togglePin,clear]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>}
export const useModelFocus=()=>useContext(Ctx);
