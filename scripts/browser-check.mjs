// Browser check for the results page: no horizontal scrolling at 1024, 1280, 1440 and 1920 px. Needs a running build
// (`bun run preview`, or any server for dist/) and Google Chrome. Usage: bun scripts/browser-check.mjs [base-url]
// Asserts, at each width, that the document does not scroll sideways (scrollWidth equals clientWidth) and that no
// element inside <main> scrolls sideways or sticks out past main's right edge. Elements that deliberately cut text
// short with an ellipsis are allowed to be narrower than their text, and screen-reader-only text is ignored.
// Then, at phone width (375 px, emulated as a phone), it loads each page and fails on any console error, uncaught
// exception or browser-logged error (an invalid SVG attribute, for example), and on a page wider than the phone.
import {spawn} from 'node:child_process';
const base=(process.argv[2]??'http://127.0.0.1:4173').replace(/\/$/,''),paths=(process.argv[3]??'#/runs').split(','),widths=[1024,1280,1440,1920];
const CHROME=process.env.CHROME??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',sleep=ms=>new Promise(r=>setTimeout(r,ms));
const dir='/tmp/detroitbench-check-'+process.pid+'-'+Date.now();
const chrome=spawn(CHROME,['--headless=new','--remote-debugging-port=0','--user-data-dir='+dir,'--no-first-run','--hide-scrollbars','about:blank'],{stdio:'ignore'});
let list,port;for(let i=0;i<75;i++){try{port??=(await Bun.file(dir+'/DevToolsActivePort').text()).split('\n')[0];list=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(list.find(t=>t.type==='page'))break}catch{}await sleep(200)}
const ws=new WebSocket(list.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map,errors=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}
 if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push('console.error: '+m.params.args.map(a=>a.value??a.description).join(' '));
 if(m.method==='Runtime.exceptionThrown')errors.push('exception: '+(m.params.exceptionDetails.exception?.description??m.params.exceptionDetails.text));
 if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errors.push(m.params.entry.source+': '+m.params.entry.text)};
const send=(method,params={})=>new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
const probe=`(()=>{const d=document.documentElement,main=document.querySelector('main'),R=main.getBoundingClientRect().right,bad=[];
 if(d.scrollWidth>d.clientWidth)bad.push('document scrolls sideways: scrollWidth '+d.scrollWidth+' > clientWidth '+d.clientWidth);
 for(const el of main.querySelectorAll('*')){const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;
  const box=el.getBoundingClientRect();if(box.width<=1&&box.height<=1)continue; // screen-reader-only text
  const name=el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\\s+/).slice(0,3).join('.'):'');
  const ellipsis=cs.textOverflow==='ellipsis'&&(cs.overflowX==='hidden'||cs.overflowX==='clip');
  if(el.scrollWidth>el.clientWidth+1&&!ellipsis&&!(el instanceof SVGElement)&&cs.overflowX!=='visible')bad.push(name+' scrolls sideways ('+el.scrollWidth+' > '+el.clientWidth+')');
  const r=el.getBoundingClientRect();if(r.width&&r.right>R+1&&cs.position!=='fixed')bad.push(name+' sticks out past main by '+Math.round(r.right-R)+'px')}
 return bad.slice(0,20)})()`;
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');let failed=0;
for(const path of paths)for(const w of widths){await send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:base+'/'+path});await sleep(2500);
 const r=await send('Runtime.evaluate',{expression:probe,returnByValue:true}),bad=r.result?.result?.value??['probe failed: '+JSON.stringify(r.result?.exceptionDetails?.text)];
 if(bad.length){failed++;console.log(`✗ ${path} at ${w}px\n  `+bad.join('\n  '))}else console.log(`✓ ${path} at ${w}px: no horizontal scrolling`)}
// Twice per page: loaded at 375 px, and loaded at desktop width then narrowed to 375 px without a reload (as when a
// visitor turns on a browser's device toolbar), which is when the charts briefly measure a phone width with the
// desktop layout.
const phone=()=>send('Emulation.setDeviceMetricsOverride',{width:375,height:667,deviceScaleFactor:2,mobile:true});
for(const path of paths)for(const resized of [false,true]){await send('Emulation.setDeviceMetricsOverride',resized?{width:1280,height:900,deviceScaleFactor:1,mobile:false}:{width:375,height:667,deviceScaleFactor:2,mobile:true});
 await send('Page.navigate',{url:'about:blank'});await sleep(200);errors.length=0;await send('Page.navigate',{url:base+'/'+path});await sleep(3500);if(resized){await phone();await sleep(1500)}
 // Scroll through the page so every chart renders and measures.
 await send('Runtime.evaluate',{expression:'(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)})()',awaitPromise:true});await sleep(500);
 const wide=(await send('Runtime.evaluate',{expression:'innerWidth>375||document.documentElement.scrollWidth>document.documentElement.clientWidth?"page is "+Math.max(innerWidth,document.documentElement.scrollWidth)+" px wide at a 375 px viewport":""',returnByValue:true})).result?.result?.value;if(wide)errors.push('layout: '+wide);
 const seen=[...new Set(errors)];if(seen.length){failed++;console.log(`✗ ${path} at 375px${resized?' (narrowed from 1280px)':''}: ${errors.length} console ${errors.length===1?'error':'errors'}\n  `+seen.slice(0,10).join('\n  '))}else console.log(`✓ ${path} at 375px${resized?' (narrowed from 1280px)':''}: no console errors`)}
ws.close();chrome.kill();process.exit(failed?1:0);
