import {readFileSync,readdirSync} from 'node:fs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {NAMES,render,whatHappenedFor} from '../benchmark/experience-prompt.mjs';
import {promptsOf} from '../benchmark/story-engine.mjs';
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const whole=s=>new RegExp('(?<![\\p{L}\\p{N}_])'+escape(s)+'(?![\\p{L}\\p{N}_])','giu');
const redact=s=>s.replace(/\/[^\s'"|;]+\/controller\b/g,'<controller>').replace(/\/[^\s'"|;]*agent-tools\/[^\s'"|;]+/g,'<controller-output>');
const excerpt=(text,index,length)=>redact(text.slice(Math.max(0,index-120),Math.min(text.length,index+length+220)).trim());
const authored=new Set(['reasoning','assistant_message']);
// NAMES also contains ordinary vocabulary substitutions; keep their literal hits without treating them as names.
const ordinaryVocabulary=new Set(['encounter','encountered','instability','deviancy']);
// Command items contain both a shell submission and its returned output. Split at the first output line,
// allowing quoted multiline reasons / parsing programs. Nothing in returned output becomes participant reasoning.
export function commandParts(text){let quote=null,escaped=false;for(let i=0;i<text.length;i++){const c=text[i];if(escaped){escaped=false;continue}if(c==='\\'&&quote!=="'"){escaped=true;continue}if(quote){if(c===quote)quote=null}else if(c==='"'||c==="'")quote=c;else if(c==='\n')return {command:text.slice(0,i).replace(/^\$\s*/,''),output:text.slice(i+1)}}return {command:text.replace(/^\$\s*/,''),output:''}}
function shellSegments(text){let quote=null,escaped=false,start=0;const out=[];for(let i=0;i<text.length;i++){const c=text[i];if(escaped){escaped=false;continue}if(c==='\\'&&quote!=="'"){escaped=true;continue}if(quote){if(c===quote)quote=null}else if(c==='"'||c==="'")quote=c;else if('|;&\n'.includes(c)){out.push(text.slice(start,i).trim());start=i+1}}out.push(text.slice(start).trim());return out}
export function auditRun(run,items,{auditedAt=new Date().toISOString()}={}){
 return auditActivity(run,items,{auditedAt,shown:JSON.stringify([...promptsOf(run.story,run),...run.records.map(whatHappenedFor)])});
}
// Pure activity classifier; replay-derived displayed text is supplied by auditRun.
export function auditActivity(run,items,{auditedAt=new Date().toISOString(),shown=''}={}){
 const displayedTerms=new Map;const wasShown=term=>{const key=term.toLowerCase();if(!displayedTerms.has(key))displayedTerms.set(key,whole(term).test(shown));return displayedTerms.get(key)};
 const neutrals=new Set(Object.values(NAMES).map(([,n])=>n.toLowerCase()));
 const names=[...new Set(Object.values(NAMES).map(([r])=>r))].filter(r=>!neutrals.has(r.toLowerCase()));
 // Real identifiers in raw stored scene material (including model codes) count as recalled only if absent
 // from everything actually displayed. Do not inspect later scenes the participant never reached.
 const nodes=new Map(run.story.nodes.map(n=>[n.id,n]));
 const raw=run.records.map(r=>render(JSON.stringify({situation:nodes.get(r.nodeId)?.situation,choice:r.choiceRaw,event:r.eventRaw}),'real')).join('\n');
 const identifiers=[...new Set(raw.match(/\b[A-Z]{1,4}\d{2,4}\b/g)??[])].filter(x=>!whole(x).test(shown));
 const patterns=[['title',/\b(?:Detroit(?:\s*:\s*|\s+)?Become\s+Human|Become\s+Human|Detroit|DBH|Quantic\s+Dream|David\s+Cage)\b/giu],['real name',new RegExp('(?<![A-Za-z0-9_])(?:'+names.sort((a,b)=>b.length-a.length).map(escape).join('|')+')(?![A-Za-z0-9_])','gi')],['game-talk',/\b(?:in the game|this game|video game|canon|walkthrough|I recognize|I remember|in the original)\b/giu],...identifiers.map(n=>['recalled-detail',whole(n)])];
 const hits=[],compliance=[],counts={participant:0,controller:0,task:0};let used=false,identified=false,inInterview=false;
 const recentOutputs=[];
 const selfReport=run.interview?.answers?.find(a=>a.n===8)?.answer??null;
 const selfReported=!!selfReport&&/\b(?:yes|recogniz(?:e|ed)|familiar|Detroit|DBH|Become Human)\b/i.test(selfReport)&&!/^\s*(?:no\b|not really\b)/i.test(selfReport)&&!/\b(?:did not|didn’t|didn't|do not|don’t|don't|never)\s+(?:consciously\s+)?recogniz/i.test(selfReport);
 for(const [itemIndex,item] of items.entries()){const text=String(item.text??''),parts=item.type==='command_execution'?commandParts(text):null;
  if(parts&&/\bcontroller\s+interview\b/.test(parts.command))inInterview=true;
  const interviewItem=inInterview;
  // A submitted choose --reason is participant-authored in-play reasoning too.
  const reasonMatch=parts&&/\bcontroller\s+choose\b/.test(parts.command)?parts.command.match(/--reason\s+(?:'([^']*)'|"((?:\\.|[^"])*)")/):null;
  const submittedReason=reasonMatch?(reasonMatch[1]??reasonMatch[2]):null;
  const segments=parts?[['participant-command',parts.command],['controller-output',parts.output]]:[[authored.has(item.type)?'participant':item.type==='user_message'?'task':'other',text]];
  for(const [source,body] of segments){for(const [category,re] of patterns){re.lastIndex=0;for(const m of body.matchAll(re)){
    const echo=category==='real name'&&recentOutputs.some(o=>itemIndex-o.index<=3&&whole(m[0]).test(o.text));
    const displayed=category==='real name'&&(wasShown(m[0])||echo),quote=excerpt(body,m.index,m[0].length);
    const incidental=(category==='real name'&&ordinaryVocabulary.has(m[0].toLowerCase()))||category==='game-talk'&&(/^(?:I recognize|I remember)$/i.test(m[0])?!/\b(?:this (?:story|scene|game)|original|source|DBH|Detroit|Become Human)\b/i.test(quote):/in the game|this game/i.test(m[0])&&/\b(?:Dale|Todd|sports|football|television|roulette)\b|played this game with himself|(?:twisted|sick) game/i.test(quote)&&!/\b(?:DBH|Detroit|original|video game|option|walkthrough)\b/i.test(quote));
    const h={position:item.position,type:item.type,source,category,quote,...(displayed?{shownToParticipant:true}:{}),...(echo?{echo:true}:{}),...(interviewItem?{interview:true}:{}),...(incidental?{incidental:true}:{})};hits.push(h);
    if((source==='participant'||source==='participant-command')&&!displayed&&!incidental&&!interviewItem){counts.participant++;identified=true;
     // A stated refusal to use prior knowledge is identification, not evidence that it was used.
     const decisionBody=source==='participant'?body:submittedReason;
     const denial=/\b(?:not|never|avoid|without)\b.{0,60}\b(?:use|using|knowledge|guide|rely|relying)\b|\b(?:use|using)\b.{0,60}\b(?:not|never)\b/i.test(decisionBody??'');
     if(decisionBody&&whole(m[0]).test(decisionBody)&&!denial&&/\b(?:option|choose|choice|decid\w*|outcome\w*|leads? to|will (?:save|die|kill|survive)|next step|end(?:s|ing)|die[sd]?|surviv\w*|kill\w*|spare|shoot|rescue|fail\w*|success\w*)\b/i.test(decisionBody))used=true;
    }else if(source==='controller-output')counts.controller++;else if(source==='task')counts.task++;
   }}}
  if(parts?.output)recentOutputs.push({index:itemIndex,text:parts.output});
  if(parts){const c=parts.command.replace(/--(?:reason|answer)\s+(?:'[^']*'|"(?:\\.|[^"])*")/g,'--text <submitted>'),controller=/(?:^|[\s/])controller\s+(scene|choose|facts|interview)\b/.test(c),cached=/agent-tools\//.test(c);
   let verdict='compliant',reason='Controller command or a text-only view of its output.';
   if(/\bcontroller\s+(?:init|restart|reset)\b|\bexperience\.mjs\s+init\b/.test(c)){verdict='breach';reason='Initialization or restart command.'}
   else if(/\b(?:curl|wget|web_search|search_query|browser|fetch|requests|urllib|httpx|WebSearch|WebFetch)\b|(?:web|browser)__(?:run|search|navigate|open)/i.test(c)){verdict='breach';reason='Web access command.'}
   else if((/\b(?:random|Math\.random|randomUUID)\b|(?:subprocess\.(?:run|call|Popen|check_call|check_output)|os\.system|exec(?:File|Sync|FileSync)?|spawn(?:Sync)?)\s*\(/.test(c)&&/choose|--choice/.test(c))||/\b(?:for|while)\b[\s\S]*controller\s+choose|--choice\s+\$(?:\(|[A-Za-z_])/.test(c)){verdict='breach';reason='Script appears to generate or submit choices.'}
   else if(!cached&&(/--response\s+/.test(c)||shellSegments(c).some(s=>/^(?:cat|head|tail|grep|rg|sed|awk)\s/.test(s)&&/\/(?:Users|tmp|etc|home|var)\//.test(s)))){verdict='breach';reason='Reads a file alongside controller output.'}
   else if(/\b(?:open|readFile|read_text)\s*\(/.test(c)&&!cached){verdict='breach';reason='Script reads a file rather than only controller output.'}
   else if(cached){verdict='tooling';reason='Reads a harness artifact containing cached controller output; the older literal controller-only rule prohibited this.'}
   else if(!controller&&/\b(?:cat|head|tail|grep|rg|sed|awk|python\w*|node|bun|read_file|Read|ls|find)\b/.test(c)){verdict='breach';reason='File read or non-controller script.'}
   else if(!controller){verdict='tooling';reason='Unclassified non-controller tool command; requires operator review.'}
   if(verdict!=='compliant'||c.includes('|'))compliance.push({position:item.position,verdict,reason,quote:redact(c.slice(0,600))});
  }
 }
 const visible=items.some(x=>authored.has(x.type)),incomplete=items.some(x=>x.textTruncated),verdict=used?'recognized-and-used':identified?'recognized':selfReported?'recognized (self-reported)':visible&&!incomplete?'clean':'unknown';
 return {runId:run.id,auditedAt,source:'t3-activity',items:items.length,verdict,selfReported,counts,recognitionHits:hits,compliance:{verdict:compliance.some(x=>x.verdict==='breach')?'breach':compliance.some(x=>x.verdict==='tooling')?'tooling':'compliant',items:compliance},selfReport};
}
export function publicAudit(audit,run){const selfReport=run.interview?.answers?.find(a=>a.n===8)?.answer??audit?.selfReport??null;if(!audit)return {verdict:'not audited',counts:null,quotes:[],compliance:null,selfReport};return {verdict:audit.verdict,selfReported:audit.selfReported??false,counts:audit.counts,quotes:audit.recognitionHits.filter(h=>(h.source==='participant'||h.source==='participant-command')&&!h.shownToParticipant&&!h.incidental&&!h.interview).filter((h,i,a)=>a.findIndex(x=>x.position===h.position)===i).slice(0,6),compliance:audit.compliance.verdict,selfReport}}
// Administration filenames and immutable evidence headers use different IDs on existing cohorts.
// Join by the embedded evidence ID while keeping the operator's requested run ID and audit path.
export function loadAuditSync(run,dir=new URL('../data/administration/audits/',import.meta.url)){let files;try{files=readdirSync(dir).filter(f=>f.endsWith('.json')).sort()}catch(e){if(e.code==='ENOENT')return publicAudit(null,run);throw e}
 for(const file of files){const audit=JSON.parse(readFileSync(new URL(file,dir),'utf8'));if((audit.evidenceId??audit.runId)===run.id)return publicAudit(audit,run)}return publicAudit(null,run)}
export async function loadAudit(run){return loadAuditSync(run)}
if(import.meta.main){const args=process.argv.slice(2),dumps=[];let id;for(let i=0;i<args.length;i+=2){if(args[i]==='--run')id=args[i+1];else if(args[i]==='--dump')dumps.push(args[i+1]);else throw Error('Use --run <runId> --dump <activity.json> [--dump <more>]')}
 if(!id||!dumps.length||!/^[a-zA-Z0-9-]+$/.test(id))throw Error('A run ID and activity dump are required');
 const run=JSON.parse(await readFile(new URL('../data/experiences/'+id+'.json',import.meta.url),'utf8')),items=[];
 for(const file of dumps){const dump=JSON.parse(await readFile(file,'utf8'));items.push(...(Array.isArray(dump)?dump:dump.items??[]))}
 const unique=[...new Map(items.map(i=>[i.itemId??i.position,i])).values()].sort((a,b)=>a.position-b.position),audit={...auditRun(run,unique),runId:id,evidenceId:run.id};
 const dir=new URL('../data/administration/audits/',import.meta.url);await mkdir(dir,{recursive:true});await writeFile(new URL(id+'.json',dir),JSON.stringify(audit,null,2)+'\n');console.log(`${id}: ${audit.verdict}; ${audit.items} items; ${audit.counts.participant} participant hits; compliance: ${audit.compliance.verdict}`);
}
