// Load-performance check for the results page. Needs a running build (`bun run build && bun --bun vite preview --port
// 4181`, or any server for dist/) and Google Chrome. Usage: bun scripts/perf-check.mjs [base-url] [path] [dist-dir]
// For a cold load (cache disabled) at 1440 px and at 375 px (emulated phone) it prints: requests, bytes transferred
// (as the server sent them; vite preview gzips), the decoded bytes, a brotli estimate of what a CDN would send (each
// response's file in dist/ compressed at quality 11), first contentful paint, the time the first run row is in the DOM
// (from navigation start), what was requested before that row (resource timing), the largest JSON fetched and the JS
// fetched. Each width loads three times; the median is
// printed. PERF_THROTTLE=mobile adds Lighthouse's mobile network (150 ms round trip, 1.6 Mbps down, 750 kbps up) and a
// 4x CPU slowdown. Exits 0; it measures, it does not assert.
import {spawn} from 'node:child_process';
import {brotliCompressSync,constants} from 'node:zlib';
import {existsSync,readFileSync} from 'node:fs';
const base=(process.argv[2]??'http://127.0.0.1:4181').replace(/\/$/,''),path=process.argv[3]??'#/runs',dist=process.argv[4]??new URL('../dist/',import.meta.url).pathname;
const CHROME=process.env.CHROME??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',sleep=ms=>new Promise(r=>setTimeout(r,ms)),REPEATS=3;
const dir='/tmp/detroitbench-perf-'+process.pid+'-'+Date.now();
const chrome=spawn(CHROME,['--headless=new','--remote-debugging-port=0','--user-data-dir='+dir,'--no-first-run','--hide-scrollbars','about:blank'],{stdio:'ignore'});
let list,port;for(let i=0;i<75;i++){try{port??=(await Bun.file(dir+'/DevToolsActivePort').text()).split('\n')[0];list=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(list.find(t=>t.type==='page'))break}catch{}await sleep(200)}
const ws=new WebSocket(list.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map,reqs=new Map;
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}
 if(m.method==='Network.requestWillBeSent')reqs.set(m.params.requestId,{url:m.params.request.url,type:m.params.type,bytes:0,decoded:0});
 if(m.method==='Network.responseReceived'){const r=reqs.get(m.params.requestId);if(r){r.mime=m.params.response.mimeType;r.status=m.params.response.status;r.encoding=m.params.response.headers['content-encoding']??m.params.response.headers['Content-Encoding']??''}}
 if(m.method==='Network.dataReceived'){const r=reqs.get(m.params.requestId);if(r)r.decoded+=m.params.dataLength}
 if(m.method==='Network.loadingFinished'){const r=reqs.get(m.params.requestId);if(r){r.bytes=m.params.encodedDataLength;r.done=true}}};
const send=(method,params={})=>new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
const evaluate=async expr=>(await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true})).result?.result?.value;
// Records, from navigation start, when the first run row (desktop table row or phone list item) enters the DOM.
const watcher=`(()=>{const sel='#every-run tbody tr, #every-run ul li';const mark=()=>{if(window.__firstRow==null&&document.querySelector(sel)){window.__firstRow=performance.now();return true}};
 new MutationObserver((_, o)=>{if(mark())o.disconnect()}).observe(document,{childList:true,subtree:true})})()`;
const brCache=new Map;function brotli(url){const p=new URL(url).pathname,file=dist.replace(/\/$/,'')+(p==='/'?'/index.html':decodeURIComponent(p));
 if(!brCache.has(file))brCache.set(file,existsSync(file)?brotliCompressSync(readFileSync(file),{params:{[constants.BROTLI_PARAM_QUALITY]:11}}).length:null);return brCache.get(file)}
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Page.addScriptToEvaluateOnNewDocument',{source:watcher});
const throttle=process.env.PERF_THROTTLE==='mobile';
if(throttle){await send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6e6/8,uploadThroughput:750e3/8});await send('Emulation.setCPUThrottlingRate',{rate:4})}
const kb=n=>(n/1024).toFixed(1)+' KB',median=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length/2)];
const out={};
for(const [label,metrics] of [['1440px',{width:1440,height:900,deviceScaleFactor:1,mobile:false}],['375px',{width:375,height:667,deviceScaleFactor:2,mobile:true}]]){
 await send('Emulation.setDeviceMetricsOverride',metrics);const runs=[];
 for(let k=0;k<REPEATS;k++){await send('Page.navigate',{url:'about:blank'});await sleep(300);reqs.clear();
  await send('Page.navigate',{url:base+'/'+path});
  // Wait for the first row, then for the network to go quiet (no request in flight for 1 s).
  for(let i=0;i<600;i++){if(await evaluate('window.__firstRow!=null'))break;await sleep(100)}
  let quiet=0;for(let i=0;i<100&&quiet<10;i++){await sleep(100);quiet=[...reqs.values()].some(r=>!r.done)?0:quiet+1}
  const t=await evaluate(`({row:window.__firstRow,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime??null,dcl:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd??null,
   early:(()=>{const n=performance.getEntriesByType('navigation')[0],l=performance.getEntriesByType('resource').filter(e=>e.startTime<window.__firstRow);return {requests:l.length+1,bytes:l.reduce((a,e)=>a+e.transferSize,n?.transferSize??0),decoded:l.reduce((a,e)=>a+e.decodedBodySize,n?.decodedBodySize??0)}})()})`);
  const all=[...reqs.values()].filter(r=>r.url.startsWith(base)),json=all.filter(r=>/json/.test(r.mime??'')||/\.json(\?|$)/.test(r.url)).sort((a,b)=>b.decoded-a.decoded),js=all.filter(r=>r.type==='Script'||/javascript/.test(r.mime??'')),fonts=all.filter(r=>r.type==='Font');
  runs.push({early:t.early,requests:all.length,bytes:all.reduce((n,r)=>n+r.bytes,0),decoded:all.reduce((n,r)=>n+r.decoded,0),brotli:all.reduce((n,r)=>n+(brotli(r.url)??r.bytes),0),row:t.row,fcp:t.fcp,dcl:t.dcl,
   largestJson:json[0]?{path:new URL(json[0].url).pathname,decoded:json[0].decoded,bytes:json[0].bytes,brotli:brotli(json[0].url)}:null,
   js:js.map(r=>({path:new URL(r.url).pathname,decoded:r.decoded})),fonts:fonts.map(r=>new URL(r.url).pathname.split('/').pop()),list:all.map(r=>new URL(r.url).pathname)})}
 const m=runs.find(r=>r.row===median(runs.map(r=>r.row)))??runs[0];
 out[label]={...m,rowTimes:runs.map(r=>Math.round(r.row)),fcpTimes:runs.map(r=>Math.round(r.fcp))};
 console.log(`\n${base}/${path} at ${label} (cold, cache disabled${throttle?', mobile throttling':''}; median of ${REPEATS})`);
 console.log(`  requests            ${m.requests}`);
 console.log(`  transferred         ${kb(m.bytes)} (server encoding)  ·  decoded ${kb(m.decoded)}  ·  brotli estimate ${kb(m.brotli)}`);
 console.log(`  before first row    ${m.early.requests} requests, ${kb(m.early.bytes)} transferred, ${kb(m.early.decoded)} decoded (requests started before the row appeared)`);
 console.log(`  first paint (FCP)   ${Math.round(m.fcp)} ms  [${out[label].fcpTimes.join(', ')}]`);
 console.log(`  first run row       ${Math.round(m.row)} ms  [${out[label].rowTimes.join(', ')}]`);
 console.log(`  largest JSON        ${m.largestJson?`${m.largestJson.path}: ${kb(m.largestJson.decoded)} decoded, ${kb(m.largestJson.bytes)} transferred, ${kb(m.largestJson.brotli??0)} brotli`:'none'}`);
 console.log(`  scripts             ${m.js.map(j=>`${j.path.split('/').pop()} ${kb(j.decoded)}`).join(', ')}`);
 console.log(`  fonts               ${m.fonts.join(', ')||'none'}`)}
if(process.env.PERF_JSON)await Bun.write(process.env.PERF_JSON,JSON.stringify(out,null,1));
ws.close();chrome.kill();process.exit(0);
