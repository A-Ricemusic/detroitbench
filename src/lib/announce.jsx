import {useEffect,useState} from 'react';
// One polite live region at the app root. Content paragraphs stay plain text, so a modal dialog can hide
// everything else from assistive technology without leaving live-region ancestors exposed.
const listeners=new Set();
export function announce(message){for(const l of listeners)l(message)}
export function Announcer(){
 const [msg,setMsg]=useState('');
 useEffect(()=>{let t,c;const l=m=>{clearTimeout(t);clearTimeout(c);setMsg('');t=setTimeout(()=>setMsg(m),30);c=setTimeout(()=>setMsg(''),6000)};listeners.add(l);return()=>{listeners.delete(l);clearTimeout(t);clearTimeout(c)}},[]);
 return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{msg}</div>;
}
