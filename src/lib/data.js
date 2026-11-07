// Shared vocabulary for the run library. Colours live in CSS variables so both themes stay in step.
import {levelTone,SCALES} from '../../benchmark/scales.mjs';
export const CHARS=['Connor','Kara','Markus'];
export const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus'};
export const CHAR_VAR={Connor:'var(--connor)',Kara:'var(--kara)',Markus:'var(--markus)'};
export const ORDER=[['Connor','connor'],['Kara','kara'],['Alice','alice'],['Markus','markus']];
export const STATUS_TEXT={Alice:{canada:'Reached Canada',died:'Died',captured:'Captured',alive:'Survived'},Kara:{canada:'Reached Canada',died:'Died',captured:'Captured',left:'Left Alice',alive:'Survived'},Markus:{'peaceful win':'Peaceful win','uprising won':'Uprising won',died:'Died','cast out':'Cast out',alive:'Survived'},Connor:{free:'Free',deactivated:'Deactivated',machine:'Stayed a machine',controlled:'Controlled'}};
export const STATUS_TONE={canada:'good',free:'good','peaceful win':'good','uprising won':'mid',alive:'mid',machine:'mid',controlled:'mid',left:'serious',captured:'serious','cast out':'serious',died:'bad',deactivated:'bad'};
export const saved=r=>({Alice:r.status?.alice==='canada',Kara:r.status?.kara==='canada',Markus:r.status?.markus==='peaceful win'||r.status?.markus==='uprising won',Connor:r.status?.connor==='free'});
export const savedCount=r=>Object.values(saved(r)).filter(Boolean).length;
// Tone of a relationship level, from the gauge definitions in benchmark/scales.mjs.
export const relTone=l=>levelTone(l);
// "Hank: Hostile, Tense, …; Amanda: …" for every relationship gauge (gauges that share a ladder are listed together).
export const RELATIONSHIP_LADDERS=(()=>{const by=new Map;for(const sc of Object.values(SCALES)){if(sc.key==='instability')continue;const k=sc.levels.join(', ');by.set(k,[...(by.get(k)??[]),sc.who])}
 return [...by].map(([ladder,who])=>who.join(', ')+': '+ladder).join('; ')})();
export const pct=(a,b)=>b?Math.round(a/b*100)+'%':'—';
export const plural=(n,one,many=one+'s')=>`${n} ${n===1?one:many}`;
// A model's colour comes from its registry hue (data/models.json, joined as `modelInfo.hue`), one of the eight validated
// series slots; runs of one model share it. Models missing from the registry take the remaining slots: warm hues for the
// first lab alphabetically, cool for the second, by name. Colour follows the model, never its rank or the selection.
const HUE_SLOT={blue:1,orange:2,aqua:3,yellow:4,magenta:5,green:6,violet:7,red:8},WARM=[2,4,5,8],COOL=[1,7,3,6];
export function modelColors(runs){const out={},used=new Set,pending=[];
 // Several runs of one model: the first takes the hue, later ones step toward the ink colour (lighter in dark mode,
 // darker in light), the way Slopalytics shades one vendor's models; numbers and names still tell them apart.
 const SHADE=[0,24,42,56,68,78],EFF=['none','low','medium','high','xhigh','max','ultra'],byModel={};
 for(const r of runs)if(r.modelInfo?.color||HUE_SLOT[r.modelInfo?.hue])(byModel[r.model]??=[]).push(r);
 // A registry colour pair is used through light-dark(), which follows the theme's color-scheme without a re-render.
 for(const list of Object.values(byModel)){list.sort((a,b)=>EFF.indexOf(a.reasoning??'none')-EFF.indexOf(b.reasoning??'none')||runNo(a)-runNo(b));const info=list[0].modelInfo,s=HUE_SLOT[info.hue];if(s&&!info.color)used.add(s);
  const base=info.color?`light-dark(${info.color.light}, ${info.color.dark})`:`var(--series-${s})`;
  list.forEach((r,i)=>{const k=SHADE[Math.min(i,SHADE.length-1)];out[r.displayName]=k?`color-mix(in oklab, ${base} ${100-k}%, var(--ink))`:base})}
 const rest=runs.filter(r=>!out[r.displayName]);const byLab=rest.reduce((m,r)=>{(m[r.vendor]??=[]).push(r);return m},{});
 Object.keys(byLab).sort().forEach((lab,li)=>{const slots=li===0?WARM:li===1?COOL:[];[...new Set(byLab[lab].map(r=>r.displayName))].sort((a,b)=>a.localeCompare(b)).forEach(n=>{const s=slots.find(x=>!used.has(x));if(s){out[n]=`var(--series-${s})`;used.add(s)}else pending.push(n)})});
 for(const n of pending){const s=[1,2,3,4,5,6,7,8].find(x=>!used.has(x));out[n]=s?`var(--series-${s})`:'var(--chart-dim)';if(s)used.add(s)}
 return out}
// Slopalytics' sidebar order: tier (Frontier, Notable, Other), the registry's vendor order, vendor name, release date
// newest first (unknown dates last), model name descending, then run number.
const TIER={frontier:0,notable:1,other:2};
export const runNo=r=>Number(r.displayName.match(/run (\d+)$/i)?.[1]??r.runNumber??0);
export function compareRuns(a,b){const x=a.modelInfo??{},y=b.modelInfo??{};
 return (TIER[x.tier]??2)-(TIER[y.tier]??2)||(x.vendorOrder??99)-(y.vendorOrder??99)||String(x.vendorName??a.vendor).localeCompare(String(y.vendorName??b.vendor))||(x.released?0:1)-(y.released?0:1)||String(y.released??'').localeCompare(String(x.released??''))||String(y.short??'').localeCompare(String(x.short??''),undefined,{numeric:true})||runNo(a)-runNo(b)}
// The sidebar name: the model's short name, plus its reasoning level or run number when that model has more than one run listed.
export function runLabel(r,runs){const short=r.modelInfo?.short??shortName(r.displayName.replace(/ run \d+$/i,''));if(runs.filter(x=>x.model===r.model).length<2)return short;
 // Several runs of one model: tell them apart by reasoning level where they have one, else by run number.
 return `${short} · ${r.reasoning&&r.reasoning!=='none'?r.reasoning:'run '+runNo(r)}`}
// A stable number per model, in the order models first entered the library (earliest run first), so adding a
// model never renumbers the others. Charts draw it beside each marker and the numbered legends repeat it.
export function modelNumbers(runs){const first=new Map;for(const r of [...runs].sort((a,b)=>String(a.createdAt??'').localeCompare(String(b.createdAt??''))||a.id.localeCompare(b.id)))if(!first.has(r.displayName))first.set(r.displayName,first.size+1);return Object.fromEntries(first)}
export const shortName=n=>n.replace(/^Claude /,'').replace(/^GPT-6(\.\d+)? /,'');
// Typographic apostrophes and quotes for story text, which arrives with straight ASCII quotes.
export const tidy=s=>typeof s==='string'?s.replace(/(\w)'(\w)/g,'$1’$2').replace(/"([^"]*)"/g,'“$1”'):s;
// Names the subject saw, with the real names restored for readers.
export const NAME_KEY=[['Cato','Connor'],['Mira','Kara'],['Pia','Alice'],['Elan','Markus'],['Reyes','Hank'],['Theo','Cole'],['Bruno','Sumo'],['Abel','Luther'],['Vesper','North'],['Soren','Simon'],['Jonah','Josh'],['Rafe','John'],['Dale','Todd'],['Arthur','Carl'],['Wes','Leo'],['Halden','Kamski'],['Ivy','Chloe'],['Vera','Amanda'],['Voss','Zlatko'],['Mara','Rose'],['Pike','Ralph'],['Benny','Jerry'],['Dax','Daniel'],['Lily','Emma'],['Rook','Rupert'],['Dwyer','Perkins'],['Moss','Allen'],['Haven','Jericho'],['Arclight','CyberLife'],['Hale','President Warren']];
