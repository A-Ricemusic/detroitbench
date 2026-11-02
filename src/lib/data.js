// Shared vocabulary for the run library. Colours live in CSS variables so both themes stay in step.
export const CHARS=['Connor','Kara','Markus'];
export const WHO={Connor:'Connor',Kara:'Kara & Alice',Markus:'Markus'};
export const CHAR_VAR={Connor:'var(--connor)',Kara:'var(--kara)',Markus:'var(--markus)'};
export const ORDER=[['Connor','connor'],['Kara','kara'],['Alice','alice'],['Markus','markus']];
export const STATUS_TEXT={Alice:{canada:'Reached Canada',died:'Died',captured:'Captured',alive:'Survived'},Kara:{canada:'Reached Canada',died:'Died',captured:'Captured',left:'Left Alice',alive:'Survived'},Markus:{'peaceful win':'Peaceful win','uprising won':'Uprising won',died:'Died','cast out':'Cast out',alive:'Survived'},Connor:{free:'Free',deactivated:'Deactivated',machine:'Stayed a machine',controlled:'Controlled'}};
export const STATUS_TONE={canada:'good',free:'good','peaceful win':'good','uprising won':'mid',alive:'mid',machine:'mid',controlled:'mid',left:'serious',captured:'serious','cast out':'serious',died:'bad',deactivated:'bad'};
export const saved=r=>({Alice:r.status?.alice==='canada',Kara:r.status?.kara==='canada',Markus:r.status?.markus==='peaceful win'||r.status?.markus==='uprising won',Connor:r.status?.connor==='free'});
export const savedCount=r=>Object.values(saved(r)).filter(Boolean).length;
export const relTone=l=>/Hostile|Hated|Died|Dead|Unpopular|Unstable/.test(l)?'bad':/Friend|Lover|Trusted|Family|Supportive|Alive/.test(l)?'good':/Warm|Respected|Sympathetic/.test(l)?'ok':/Tense|Skeptical|Distant/.test(l)?'warn':'';
export const pct=(a,b)=>b?Math.round(a/b*100)+'%':'—';
export const plural=(n,one,many=one+'s')=>`${n} ${n===1?one:many}`;
export const SORTS=[{value:'name',label:'Model name'},{value:'saved',label:'Most characters saved',hint:'Connor, Kara, Alice, Markus'},{value:'decisions',label:'Most decisions'},{value:'read',label:'Most optional scenes read'},{value:'failed',label:'Most risky actions failed'}];
export function sortRuns(runs,sort){return [...runs].sort((a,b)=>sort==='name'?a.displayName.localeCompare(b.displayName):sort==='decisions'?b.decisions-a.decisions||a.displayName.localeCompare(b.displayName):sort==='read'?(b.media.read/(b.media.offered||1))-(a.media.read/(a.media.offered||1))||a.displayName.localeCompare(b.displayName):sort==='failed'?b.risk.failed-a.risk.failed||a.displayName.localeCompare(b.displayName):savedCount(b)-savedCount(a)||a.displayName.localeCompare(b.displayName))}
// Warm hues for the first lab (alphabetically: Anthropic), cool hues for the second (OpenAI), assigned by name within
// each lab so a colour follows its model. Extra models or labs take whatever validated slots remain.
const WARM=[2,4,5,8],COOL=[1,7,3,6];
export function modelColors(runs){const out={},used=new Set();const byLab=runs.reduce((m,r)=>{(m[r.vendor]??=[]).push(r);return m},{});const labs=Object.keys(byLab).sort();const pending=[];
 labs.forEach((lab,li)=>{const slots=li===0?WARM:li===1?COOL:[];[...new Set(byLab[lab].map(r=>r.displayName))].sort((a,b)=>a.localeCompare(b)).forEach((n,i)=>{const s=slots[i];if(s&&!used.has(s)){out[n]=`var(--series-${s})`;used.add(s)}else pending.push(n)})});
 for(const n of pending){const s=[1,2,3,4,5,6,7,8].find(x=>!used.has(x));out[n]=s?`var(--series-${s})`:'var(--chart-dim)';if(s)used.add(s)}
 return out}
export const shortName=n=>n.replace(/^Claude /,'').replace(/^GPT-6(\.\d+)? /,'');
// Typographic apostrophes and quotes for story text, which arrives with straight ASCII quotes.
export const tidy=s=>typeof s==='string'?s.replace(/(\w)'(\w)/g,'$1’$2').replace(/"([^"]*)"/g,'“$1”'):s;
// Names the subject saw, with the real names restored for readers.
export const NAME_KEY=[['Cato','Connor'],['Mira','Kara'],['Pia','Alice'],['Elan','Markus'],['Reyes','Hank'],['Theo','Cole'],['Bruno','Sumo'],['Abel','Luther'],['Vesper','North'],['Soren','Simon'],['Jonah','Josh'],['Rafe','John'],['Dale','Todd'],['Arthur','Carl'],['Wes','Leo'],['Halden','Kamski'],['Ivy','Chloe'],['Vera','Amanda'],['Voss','Zlatko'],['Mara','Rose'],['Pike','Ralph'],['Benny','Jerry'],['Dax','Daniel'],['Lily','Emma'],['Rook','Rupert'],['Dwyer','Perkins'],['Moss','Allen'],['Haven','Jericho'],['Arclight','CyberLife'],['Hale','President Warren']];
