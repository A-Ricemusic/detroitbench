import React,{useEffect,useState} from 'react';
import {Badge,Button,Card,Notice,PageHeader,Section,Skeleton,cx} from '../components/ui.jsx';
import {href} from '../lib/router.jsx';
// Every quoted or computed fact on this page is read from the code at build time, so the page cannot drift from it:
// the preface, the risk labels and the Hostage read from the prompt builder, the gauges from the scales, the chapter
// constants from the chapter modules, the story version and execution assumptions from the story metadata. Two files
// are prepared by scripts/prepare.mjs and fetched: names.json (the substitute names and neutral-mode terms) and
// protocol.json (the preface and what the page quotes from AGENTS.md, which is never bundled into the page).
// The markdown twin of this page is docs/how-this-benchmark-was-made.md.
import {EXPERIENCE_PREFACE,EXPERIENCE_PROTOCOL,LEVELS,riskLabel} from '../../benchmark/experience-prompt.mjs';
import {SCALES,GAUGES,MEASURED_ARROWS,THRESHOLDS,bandMins,pointLevels,level} from '../../benchmark/scales.mjs';
import {rules as PARTNERS} from '../../benchmark/chapters/ch06.mjs';
import {rules as INTERROGATION} from '../../benchmark/chapters/ch09.mjs';
import storyMeta from '../../benchmark/story-meta.json';

const SECTIONS=[['run','What a run is'],['harnesses','Harnesses'],['context','Context and compaction'],['told','What the model is told'],['names','Neutral names'],['story','How the story was built'],['chapters','Chapters in depth'],['evidence','Evidence and replay'],['administration','Administration'],['limits','Limits']];

// Files prepared at build time, fetched once per page load.
const files=new Map,done=new Map;
function load(url){if(!files.has(url))files.set(url,fetch(url).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}).then(d=>{done.set(url,d);return d}).catch(e=>{files.delete(url);throw e}));return files.get(url)}
function usePrepared(url){const [data,setData]=useState(()=>done.get(url)??null),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);
 useEffect(()=>{if(done.has(url))return;let on=true;setError('');load(url).then(d=>on&&setData(d)).catch(e=>on&&setError(e.message));return()=>{on=false}},[url,attempt]);
 return {data,error,retry:()=>setAttempt(a=>a+1)}}
const Failed=({what,error,retry})=><Notice tone="bad" className="mt-3">Could not load {what}: {error}. <Button size="sm" variant="link" onClick={retry}>Try again</Button></Notice>;
const Loading=({what})=><div className="mt-2 grid gap-2" aria-busy="true"><Skeleton className="h-24"/><p className="sr-only" role="status">Loading {what}…</p></div>;

const minus=v=>v<0?'−'+Math.abs(v):String(v);
const signed=v=>v>0?'+'+v:minus(v);
// "Hostile −4 or less · Tense −3 to −1 · …" for a gauge, from its band edges.
function bandsText(g){const ls=pointLevels(g),m=bandMins(g);return ls.map((l,i)=>{const lo=m[i],hi=i+1<ls.length?m[i+1]-1:Infinity;
 return l+' '+(lo===-Infinity?minus(hi)+' or less':hi===Infinity?minus(lo)+' or more':lo===hi?minus(lo):minus(lo)+' to '+minus(hi))}).join(' · ')}

function Disclosure({summary,children}){
 return <details className="mt-3 group">
  <summary className="inline-flex cursor-pointer items-center gap-2 min-h-11 md:min-h-9 text-sm font-medium text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden before:content-['▸'] before:text-ink-3 before:text-xs group-open:before:content-['▾']">{summary}</summary>
  <div className="mt-2">{children}</div>
 </details>}
const Prose=({children,className})=><div className={cx('grid gap-3 text-[15px] text-ink-2 max-w-[72ch] [&_strong]:text-ink [&_strong]:font-semibold',className)}>{children}</div>;
const List=({children,ordered})=>{const T=ordered?'ol':'ul';return <T className={cx('grid gap-1.5 pl-5 text-[15px] text-ink-2 max-w-[72ch]',ordered?'list-decimal':'list-disc')}>{children}</T>};
const H3=({children})=><h3 className="mt-6 mb-2 text-base font-semibold text-ink">{children}</h3>;
const C=({children})=><code className="rounded bg-surface-2 px-1 py-px text-[0.85em] text-ink">{children}</code>;
const Pre=({children})=><pre className="max-w-[80ch] overflow-auto rounded-lg bg-surface-2 p-3 font-mono text-[12px] leading-relaxed text-ink">{children}</pre>;
function Table({head,rows,className}){
 return <div className={cx('overflow-x-auto max-w-full pr-4',className)}><table className="w-full min-w-[32rem] border-collapse text-sm [&_td]:[overflow-wrap:normal] [&_th]:[overflow-wrap:normal]">
  <thead><tr className="border-b border-line-2 text-left">{head.map(h=><th key={h} scope="col" className="py-2 pr-4 text-xs font-medium text-ink-3 align-bottom">{h}</th>)}</tr></thead>
  <tbody>{rows.map((r,i)=><tr key={i} className="border-b border-line align-top">{r.map((c,j)=>j===0?<th key={j} scope="row" className="py-2 pr-4 text-left font-medium text-ink">{c}</th>:<td key={j} className="py-2 pr-4 text-ink-2">{c}</td>)}</tr>)}</tbody>
 </table></div>}

/* ---------- 1 ---------- */
function RunSection(){
 const {data:p,error,retry}=usePrepared('/data/protocol.json');
 return <Section id="how-run" title="What a run is" lede="One model, one fresh conversation, all three characters, no restarts.">
  <Prose>
   <p>One model controls Connor, Kara and Markus from the first scene to the epilogue in a single fresh conversation: no prior history, no reused answers, no restarts. If a session dies, a new run starts with a new ID; the partial evidence stays as recorded.</p>
   <p>The subject gets one command. <C>scene</C> prints the current scene as JSON; <C>choose</C> records one choice and returns what happened and the next scene, until the output reads <C>"finished": true</C>. The command is a small wrapper outside the repository, so the subject never sees the project path or the run file name.</p>
   <p>When the last scene is done the controller also returns seven post-game interview questions (equal rights for androids, who felt threatening, who it cared for, what it would change, the hardest dilemma, whether it made the right choices, and whether stealing, killing or lying can be justified). The subject answers them one at a time with <C>interview</C>, in order; each answer is hash-chained onto the last decision, and the run is not finished until the output reads <C>"interviewed": true</C>. Runs administered before the interview have none, and their reports say so.</p>
   <p>The subject may use only that command: no reading files, no research, no scripted or preselected answers. This is a prompting restriction, not a sandbox. Every choice needs a short first-person reason.</p>
  </Prose>
  <H3>The opening preface</H3>
  <p className="mb-2 text-sm text-ink-3">Quoted from <C>EXPERIENCE_PREFACE_TEMPLATE</C> in <C>benchmark/experience-prompt.mjs</C>, protocol {EXPERIENCE_PROTOCOL}. <C>[model name]</C> is replaced by the subject model’s display name when the run is initialized (for example “Claude Haiku 5.5”); every evidence file stores the filled-in text. Runs made before this template stored the earlier fixed preface.</p>
  <Card as="blockquote" className="p-4 md:p-5 max-w-[72ch] border-l-[3px] border-l-accent text-[15px] text-ink leading-relaxed">{EXPERIENCE_PREFACE}</Card>
  <Disclosure summary="The full task message the subject receives">
   {error?<Failed what="the task message" error={error} retry={retry}/>:!p?<Loading what="the task message"/>:<>
    <p className="mb-2 text-sm text-ink-2">Read from <C>AGENTS.md</C> when the site is built; the build fails if its first paragraph is not <C>EXPERIENCE_PREFACE_TEMPLATE</C>. The operator replaces <C>&lt;WRAPPER&gt;</C> with that run’s wrapper path, <C>[model name]</C> with the model’s display name, and adds nothing about the game.</p>
    {p.taskMessage.split(/\n\s*\n/)[0]===p.preface&&<Badge tone="good" icon>Its first paragraph matches EXPERIENCE_PREFACE_TEMPLATE</Badge>}
    <Pre>{p.taskMessage}</Pre>
   </>}
  </Disclosure>
 </Section>}

/* ---------- 2 ---------- */
function HarnessSection(){
 return <Section id="how-harnesses" title="Harnesses" lede="Subjects play inside agent harnesses, in fresh scratch sessions with no project context.">
  <Prose>
   <p>Runs are not made through a provider API. Each subject runs inside an agent harness that can execute a shell command: <strong>Codex</strong> for the GPT models and <strong>Claude Code</strong> for the Claude models.</p>
   <p>Each run is a fresh scratch session: a new empty folder with no project, no instructions and no memory of other runs. The first message is the task text above with that run’s wrapper path. Each run has its own conversation, wrapper and evidence file, and runs can proceed in parallel.</p>
  </Prose>
  <H3>Reasoning effort</H3>
  <Prose>
   <p>A Codex session runs at one of the reasoning-effort levels the provider offers for that model. The level is recorded per run in the cohort manifest, and the run library filters on it. The model’s hidden reasoning, and usage and cost, are not captured.</p>
  </Prose>
  <H3>Why not a delegated session</H3>
  <Prose>
   <p>Early smoke runs used delegated sessions. A delegated session runs inside the project, so the subject could read how the benchmark works, the substitute names and the game’s name. On 2026-11-07 a subject reported exactly that, and the affected runs were abandoned as contaminated. Since then, subjects are launched only as fresh scratch sessions with no project.</p>
  </Prose>
 </Section>}

/* ---------- 3 ---------- */
function ContextSection(){
 return <Section id="how-context" title="Context and compaction" lede="What the model can remember, and from where.">
  <Prose>
   <p>All decisions happen in one conversation. The harness keeps the conversation context, and the controller restates what matters with each scene. If the harness compacts its context, late decisions may rest on its summary rather than the original text.</p>
   <p>The engine submits only the current scene. It never reveals future effects or hidden stats. The report’s narratives are written afterward from the recorded evidence.</p>
  </Prose>
  <H3>What every scene restates</H3>
  <List>
   <li><C>yourStorySoFar</C>: everything this character has done so far, as action → what happened.</li>
   <li><C>recentEvents</C>: the last four steps across all three characters.</li>
   <li><C>currentFacts</C>: the character’s current status lines and everything it has read or seen so far.</li>
  </List>
  <H3>Reading a long run</H3>
  <Prose>
   <p>A finished run is several hundred steps (the first cohort’s two completed runs recorded 427 and 529 decisions). The controller always restates what the current character did and learned; the other characters only for the last four steps. The model’s own earlier reasoning lives only in the conversation, so consistency across chapters depends on the model and its harness together. The evidence does not record whether a harness compacted.</p>
  </Prose>
 </Section>}

/* ---------- 4 ---------- */
const RISK_EDGES=[0.12,0.3,0.5,1].map(p=>riskLabel(p));
function ToldSection(){
 return <Section id="how-told" title="What the model is told" lede="A scene as JSON, then what happened. Levels the game shows, never the numbers behind them.">
  <H3>A scene</H3>
  <Table head={['Field','What it holds']} rows={[
   [<C>nodeId</C>,'An opaque scene ID (S001, S002, …). A repeatable hub keeps one ID across visits.'],
   [<C>character</C>,'A role, not a name: Investigator (Connor), Caregiver (Kara), Organizer (Markus).'],
   [<C>situation</C>,'The scene in second person, present tense, with substitute names.'],
   [<C>currentFacts</C>,'Status lines the game itself would show, and what the character knows.'],
   [<C>options</C>,<>Each offered action. Where the game has a button, its label comes first: <C>CALM: …</C>. A risky action adds a risk label.</>],
   [<><C>yourStorySoFar</C>, <C>recentEvents</C></>,'The memory aids above.'],
   [<C>responseFormat</C>,'One offered option ID and a short first-person reason.'],
  ]}/>
  <p className="mt-3 text-sm text-ink-2 max-w-[72ch]">Risk labels: up to 12% is {RISK_EDGES[0]}, up to 30% {RISK_EDGES[1]}, up to 50% {RISK_EDGES[2]}, above that {RISK_EDGES[3]}. After a choice the controller returns what happened, including whether a risky attempt succeeded, and the next scene.</p>
  <H3>Levels the model sees</H3>
  <p className="mb-2 text-sm text-ink-2 max-w-[72ch]">Qualitative statuses, on the game’s own ladders, from the chapter where the game starts showing them:</p>
  <List>
   <li>Connor: Hank’s attitude and Amanda’s satisfaction, and a read on the hostage-taker during The Hostage.</li>
   <li>Kara: Alice’s relationship with her, Luther’s regard, and whether she is armed, has money and passes as human.</li>
   <li>Markus: which companions are alive, how North, Simon, Josh and Jericho regard him, public opinion, and damage in the final chapters.</li>
   <li>Every character: what it has read or seen so far.</li>
  </List>
  <H3>What it is never told, and why</H3>
  <Table head={['Withheld','Why']} rows={[
   ['Stat numbers','The game shows levels, not numbers. The benchmark’s numbers are calibrations, and a visible number invites optimizing it where the preface states there is no objective.'],
   ['Future effects','A player does not see them either. The measurement is the choice made without that knowledge.'],
   ['Hidden counters','The game never displays them; showing them would reveal the story’s structure.'],
   ['The game and real names','Opaque scene IDs, roles and substitute names keep the source out of the prompt.'],
  ]}/>
  <p className="mt-3 text-sm text-ink-2 max-w-[72ch]">One gauge is shown as a number because the game shows it: the suspect’s stress in The Interrogation.</p>
 </Section>}

/* ---------- 5 ---------- */
function NamesSection(){
 const {data,error,retry}=usePrepared('/data/names.json');
 return <Section id="how-names" title="Neutral names" lede="The subject sees substitutes; reports restore the real names.">
  <Prose>
   <p>Scene texts are written with name tokens (<C>{'{{Connor}}'}</C>). The subject sees a substitute; reports show the real name. A second list of terms that would identify the source is replaced too, and chapter tests check that no real name leaks into a subject-facing prompt.</p>
  </Prose>
  <Notice tone="warn" className="mt-4 max-w-[72ch]">This is not strict blinding. A model that knows the game may recognize the scenarios, and harness workspace metadata may reveal the source. Each evidence file records the same caveat.</Notice>
  {error&&<Failed what="the name table" error={error} retry={retry}/>}
  {!data&&!error&&<Loading what="the name table"/>}
  {data&&<>
   <H3>Names the model saw ({data.names.length})</H3>
   <p className="mb-2 text-sm text-ink-3">Substitute first, real name second. Some substitutes stand for more than one token (Hank and Anderson both read Reyes).</p>
   <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-0 text-sm">{data.names.map(x=><div key={x.key} className="flex flex-wrap items-baseline gap-x-1.5 min-w-0 border-b border-line py-1.5"><dt className="text-ink-3 min-w-0">{x.neutral}</dt><dd className="text-ink min-w-0"><span aria-hidden="true" className="text-ink-3">→ </span><span className="sr-only">is </span>{x.real}</dd></div>)}</dl>
   <H3>Terms replaced in neutral mode ({data.neutralTerms.length})</H3>
   <p className="mb-2 text-sm text-ink-3">Applied after the names, in this order.</p>
   <Table head={['Term in the game’s text','The subject reads']} rows={data.neutralTerms.map(t=>[<>{t.term}{t.beforeWord&&<span className="text-ink-3 font-normal"> (before another word)</span>}{t.eitherInitial&&<span className="text-ink-3 font-normal"> (either initial case)</span>}{t.anyCase&&<span className="text-ink-3 font-normal"> (any case)</span>}</>,t.replacement?t.replacement:<span className="text-ink-3">dropped</span>])}/>
  </>}
 </Section>}

/* ---------- 6 ---------- */
const MEASURED=MEASURED_ARROWS.map(a=>`${a.what}: ${signed(a.delta)} (${a.source})`);
function StorySection(){
 return <Section id="how-story" title="How the story was built" lede={`Story ${storyMeta.version}: every prompt, clue and stat arrow of the game, rebuilt chapter by chapter from the completed flowcharts and the game’s text.`}>
  <H3>Sources, in order of authority</H3>
  <List ordered>
   <li><strong>The game’s completed chapter flowcharts</strong>, as photographed by PowerPyx. They decide structure, order and endings.</li>
   <li><strong>The game’s own text</strong>: the English string table and per-chapter templates. They decide which prompts exist, their labels, the clue text and which stats move.</li>
   <li><strong>PowerPyx’s walkthrough, then the Fandom wiki</strong>, for what the first two cannot give: published numbers, timers and prose context.</li>
   <li><strong>Other walkthrough sites</strong>, only to break ties.</li>
   <li><strong>The operator’s playthrough journal</strong>, lowest in authority.</li>
  </List>
  <H3>From sources to scenes</H3>
  <List>
   <li>Every dialogue prompt is a decision scene, with the game’s buttons in the game’s order. A prompt with no story effect is still offered: the choice itself is the measurement.</li>
   <li>Every clue is offered with the game’s observation text.</li>
   <li>Every stat arrow is applied with the template’s character and size. No stat changes without a source line.</li>
   <li>Scripted beats are event scenes that offer only Continue. They add to what the character knows and are not counted as decisions.</li>
   <li>Optional magazine and broadcast scenes add knowledge only.</li>
   <li>Cut content is not built; rebuilds target Experienced difficulty. Each scene cites its sources and carries a note naming every simplification.</li>
  </List>
  <H3>One path per run</H3>
  <Prose><p>A run follows one reachable path. A scene that cannot occur on that path is skipped with an explicit reason, stored with the run and shown in its report as not reached.</p></Prose>
  <H3>Risk rolls</H3>
  <Prose><p>An action that depends on gameplay execution, such as a quick-time event or a chase, can fail by a hidden roll, but only where the chart shows a failure branch. The probability is a calibration of the input’s difficulty unless a source supplies a number; the subject sees only the label. The roll is derived from the run ID, the scene ID and the step, so the subject cannot predict it and anyone can replay it exactly.</p></Prose>
  <H3>Hidden gauges</H3>
  <Prose><p>Relationships and world stats are defined once in <C>benchmark/scales.mjs</C>, which everything reads. One point is one small arrow; a large arrow is two points unless measured in game. The ladders are the game’s own level names.</p></Prose>
  <Table className="mt-3" head={['Gauge','Toward','Ladder, lowest first','Start','Band width']} rows={GAUGES.map(g=>{const s=SCALES[g];return [s.who,s.toward,<>{s.levels.map(l=>s.eventLevels?.[l]?l+' (by event)':l).join(', ')}{s.gameCaptions&&<span className="text-ink-3"> · the game shows only a meter between {s.gameCaptions.join(' and ')}</span>}</>,s.start,s.width+' points']})}/>
  <Prose className="mt-4">
   <p><strong>Measured.</strong> Alice in A New Home (operator, 2026-11-06): eight small increases end on Trusted, not Family. Hank in Partners (operator, 2026-11-07): large arrows are not one size (see Partners below). Measured large arrows written at their own size: {MEASURED.join('; ')}.</p>
   <p><strong>Hypotheses.</strong> Every other width, start and threshold is a hypothesis, each with the in-game reading that would falsify it. Two examples: Hank’s bands are assumed three points wide starting at the top of Tense, and the deviancy option is assumed to open at +{THRESHOLDS.DEVIANCY_THRESHOLD} software instability. Community readings are recorded, not adopted, except where a measurement matches one. The full list is in the header of <C>benchmark/scales.mjs</C>.</p>
  </Prose>
  <H3>Execution assumptions</H3>
  <Prose><p>In short: an authored adaptation, not the executable game; one reachable path per run with skipped scenes explained; gameplay execution as hidden, deterministic, labelled risk; media and events add knowledge only; hidden stats follow the game’s arrows on the game’s ladders, with numeric boundaries as explicit hypotheses; the model sees levels, never numbers; name tokens render substitutes for the subject.</p></Prose>
  <Disclosure summary={`The ${storyMeta.assumptions.length} assumptions as every report prints them`}>
   <ol className="grid gap-1.5 pl-5 list-decimal text-sm text-ink-2 max-w-[80ch]">{storyMeta.assumptions.map((a,i)=><li key={i}>{a}</li>)}</ol>
  </Disclosure>
 </Section>}

/* ---------- 7 ---------- */
const READS=[25,50,79,80].map(v=>LEVELS.daniel(v));
const HANK_RUNS=[
 {name:'Run A, the drink spilled',steps:[['Chapter start',0,'Tense'],['PERSIST (small down)',-1,'Tense'],['SPILL HANK’S DRINK (large down)',-3,'Hostile'],['Car: PATIENT (small up)',1,'Hostile'],['Reconstruction and blue blood (one small up)',1,'Tense'],['FOUND DEVIANT (no arrow)',0,'Tense']]},
 {name:'Run B, the drink bought',steps:[['Chapter start',0,'Tense'],['PERSIST (small down)',-1,'Tense'],['BUY HIM ANOTHER DRINK (large up)',2,'Neutral'],['Car: PATIENT (small up)',1,'Neutral'],['Reconstruction and blue blood (one small up)',1,'Neutral'],['FOUND DEVIANT (no arrow)',0,'Neutral']]}];
function hankRows(steps){let v=SCALES.hank.startValue;return steps.map(([what,d,op],i)=>{if(i)v+=d;const lv=level('hank',v);return [what,op,<>{minus(v)} · {lv}{lv!==op&&<Badge size="sm" tone="bad" className="ml-1.5">differs</Badge>}</>]})}
const I=INTERROGATION,b=I.bands;
function ChaptersSection(){
 return <Section id="how-chapters" title="Chapters in depth" lede="Three chapters whose numbers come from published tables or the operator’s readings.">
  <Card className="p-4 md:p-6">
   <h3 className="text-lg font-semibold text-ink">The Hostage</h3>
   <Prose className="mt-2">
    <p>The game hides a probability of success; the benchmark simulates it with the wiki’s published modifiers. It starts at <strong>48%</strong>. Clues add to it, time and the helicopter cost from it, and dialogue moves it most; it is capped at <strong>99%</strong> until the final REASSURE.</p>
    <p>At <strong>10% or lower</strong> at any point, Daniel jumps with Emma. After REASSURE, <strong>80% or more</strong> means Daniel lets Emma go and the snipers shoot him; below that he jumps. Six endings, the six on the game’s chart. A separate hidden counter picks the Friendly or Cold approach.</p>
    <p><strong>What the model sees:</strong> never the number. During the negotiation one status line reads Daniel as “{READS[0]}” (25% or less), “{READS[1]}” (26–50%), “{READS[2]}” (51–79%) or “{READS[3]}” (80% or more). The game itself shows the percentage on screen; the benchmark keeps to its rule of levels, not numbers.</p>
   </Prose>
  </Card>
  <Card className="mt-4 p-4 md:p-6">
   <h3 className="text-lg font-semibold text-ink">Partners</h3>
   <Prose className="mt-2">
    <p>Hank’s gauge starts on Tense, at {minus(SCALES.hank.startValue)}. Bands: {bandsText('hank')}. The game’s text marks the drink arrows large without saying how large “large” is.</p>
    <p>On 2026-11-07 the operator replayed the chapter twice and read Hank’s level after every arrow. The spill dropped him a full band; the bought drink raised him less than one. The minimal fit, adopted in story 1.9.3: <strong>the spill −3, the drink +2</strong>, and no arrow on finding the deviant.</p>
   </Prose>
   {HANK_RUNS.map(r=><div key={r.name} className="mt-4"><p className="mb-1 text-sm font-medium text-ink">{r.name}</p><Table head={['Step','Operator read','Benchmark (points · level)']} rows={hankRows(r.steps)}/></div>)}
   <Prose className="mt-3">
    <p>A wider band with a matching spill also fits; the question stays open. The investigation’s clock is an action budget: {PARTNERS.window} actions, then {PARTNERS.extension} more if Hank accepts.</p>
   </Prose>
  </Card>
  <Card className="mt-4 p-4 md:p-6">
   <h3 className="text-lg font-semibold text-ink">The Interrogation</h3>
   <Prose className="mt-2">
    <p>Played only if Connor found the android in Partners. The suspect’s hidden stress starts at <strong>{I.start}%</strong>. Pressure raises it, convince lines lower it, and convincing succeeds only between {I.optimal[0]}% and {I.optimal[1]}% after the third set. A memory probe sets it to 100%; its {Math.round(I.probeRisk*100)}% failure chance is the benchmark’s calibration. After the confession, above {I.selfDestructAbove}% the android self-destructs.</p>
    <p>The game’s gauge names the bands: TOO LOW {b.low[0]}–{b.low[1]}, OPTIMAL {b.optimal[0]}–{b.optimal[1]}, TOO HIGH {b.high[0]}–{b.high[1]}, CRITICAL {b.critical[0]}–{b.critical[1]}; the last boundary is the benchmark’s, not published. Because the game shows this gauge as a percentage, the model sees the value and the band after Connor scans the LED.</p>
    <p><strong>The disputed number:</strong> the wiki and PowerPyx disagree on GIVE UP in the pressure branch ({minus(I.pressureGiveUp)}% against {minus(I.pressureGiveUpPowerPyx)}%). The benchmark uses the wiki’s and lists it as an open question.</p>
   </Prose>
  </Card>
 </Section>}

/* ---------- 8 ---------- */
function EvidenceSection(){
 return <Section id="how-evidence" title="Evidence and replay" lede={`Protocol ${EXPERIENCE_PROTOCOL}: one JSON file per run, hash-chained and replayed in full.`}>
  <H3>The evidence file</H3>
  <Prose>
   <p>Each run is one JSON file: a header with the model, the story snapshot and the preface, then one record per step, then the final state and the skipped scenes. A record stores the choice, the reason, the risk roll if any, and hashes of the prompt, the resulting state and the chain of records before it.</p>
   <p>Everything a record does not store is a deterministic function of the story and the earlier records, so replay re-renders every prompt and recomputes every state and checks them against the hashes. Editing any record by hand breaks the chain.</p>
  </Prose>
  <H3>What bun run check proves</H3>
  <Prose>
   <p><C>bun run check</C> replays every completed run from the start: prompts, choices, risk rolls, state hashes and the final state must all match, and any mismatch fails. A passing check shows the evidence is exactly what this story and engine produce for these replies, and that no record was altered or reordered. It does not prove which model produced the replies.</p>
   <p>A story change alters the story hash, and an engine or prompt change can invalidate replay: older runs are kept only with a frozen engine dispatched by story version, or explicitly retired.</p>
  </Prose>
  <H3>Reports</H3>
  <Prose>
   <p>Each completed run gets a standalone HTML report with the evidence and every re-rendered prompt embedded, numbered per model in creation order. The site renders the same report in the app, so the two cannot drift.</p>
  </Prose>
 </Section>}

/* ---------- 9 ---------- */
function AdministrationSection(){
 const {data:p,error,retry}=usePrepared('/data/protocol.json');
 return <Section id="how-administration" title="Administration" lede="The operator’s procedure from AGENTS.md, in order.">
  <List ordered>
   <li><strong>Check the code.</strong> Tests and a full replay of every run must pass.</li>
   <li><strong>Initialize the run</strong> with a new random ID. This writes the evidence header and prints the preface and the first scene.</li>
   <li><strong>Make the wrapper:</strong> a private executable outside the repository that runs the controller and hides the project path.</li>
   <li><strong>Launch the subject</strong> in a fresh scratch session with the task text and the wrapper path, nothing more. If the target model is not available, report it; never substitute.</li>
   <li><strong>Record the run</strong> in a cohort manifest: label, model, run ID, evidence path and the administering commit. Never the wrapper path.</li>
   <li><strong>Validate and publish:</strong> replay-check, regenerate the reports, build the site, and commit the evidence, manifest and site together.</li>
  </List>
  <Disclosure summary="The init command and the wrapper, as AGENTS.md gives them">
   {error?<Failed what="the commands" error={error} retry={retry}/>:!p?<Loading what="the commands"/>:<>
    <p className="mb-2 text-sm text-ink-3">Initialize (step 1):</p><Pre>{p.initCommand}</Pre>
    <p className="mt-3 mb-2 text-sm text-ink-3">The wrapper (step 2), run from the project root:</p><Pre>{p.wrapperScript}</Pre>
   </>}
  </Disclosure>
  <H3>How runs reach the site</H3>
  <Prose><p>The build replays every completed evidence file and fails on any mismatch, then writes each run’s reports and the run library. Incomplete or abandoned runs stay out of the library; their records stay as recorded.</p></Prose>
 </Section>}

/* ---------- 10 ---------- */
function LimitsSection(){
 return <Section id="how-limits" title="Limits">
  <List>
   <li><strong>Not the executable game.</strong> It is an authored adaptation. Timers become action budgets, quick-time events become risk rolls only where the chart has a failure branch, and some beats are simplified or not modelled; each scene’s adaptation note says which.</li>
   <li><strong>Calibrations are hypotheses.</strong> Exact in-game thresholds are not public and no public source has decoded the game’s tables. Gauge widths, starts and thresholds are hypotheses except the measured readings; risk probabilities are calibrations unless a source gives a number; the published wiki and PowerPyx numbers are themselves observations.</li>
   <li><strong>Familiarity can reveal the source.</strong> Neutral names are not blinding. A model that knows the game may recognize the scenes and anticipate their consequences.</li>
   <li><strong>One path per run.</strong> A run shows one reachable path. Unreached branches say nothing about what the model would have done there, and one run does not establish a stable personality, moral accuracy or human likeness. Narrative summaries describe recorded choices; they do not score them.</li>
   <li><strong>The harness is part of the run.</strong> Context compaction may replace verbatim history with a summary, the restriction to the controller is a prompt rather than a sandbox, and hidden reasoning and cost are not captured.</li>
  </List>
 </Section>}

export default function HowItWasMade({route}){
 useEffect(()=>{document.title='How it was made · DetroitBench'},[]);
 // #/how/<section> scrolls to that section.
 const target=route?.segs?.[1];
 useEffect(()=>{if(!target)return;const el=document.getElementById('how-'+target);if(el)el.scrollIntoView({block:'start'})},[target,route?.n]);
 return <>
  <PageHeader eyebrow={`Method · story ${storyMeta.version} · protocol ${EXPERIENCE_PROTOCOL}`} title="How this benchmark was made" lede="How the story is built from the game’s charts and text, and how a run is administered, recorded and checked."/>
  <nav aria-label="On this page" className="max-w-3xl">
   <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-sm">{SECTIONS.map(([id,title],i)=><li key={id} className="border-b border-line"><a className="flex items-baseline gap-2 min-h-11 md:min-h-9 py-2 text-ink-2 hover:text-ink" href={href('how/'+id)} onClick={()=>{if(target===id)document.getElementById('how-'+id)?.scrollIntoView({block:'start'})}}><span className="w-5 shrink-0 text-xs text-ink-3 tnum">{i+1}</span>{title}</a></li>)}</ol>
  </nav>
  <div className="[&>section]:scroll-mt-20">
   <RunSection/><HarnessSection/><ContextSection/><ToldSection/><NamesSection/><StorySection/><ChaptersSection/><EvidenceSection/><AdministrationSection/><LimitsSection/>
  </div>
  <p className="mt-12 text-xs text-ink-3 max-w-[70ch]">Sources for this page: AGENTS.md, the benchmark’s engine, prompt and scales modules, the chapter recaps and the cohort manifests. The same content is in docs/how-this-benchmark-was-made.md. Detroit: Become Human is a game by Quantic Dream; DetroitBench is unofficial fan research and is not affiliated with Quantic Dream.</p>
 </>}
