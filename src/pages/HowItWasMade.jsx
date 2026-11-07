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
 return <div className={cx('overflow-x-auto max-w-full',className)}><table className="w-full min-w-[32rem] border-collapse text-sm">
  <thead><tr className="border-b border-line-2 text-left">{head.map(h=><th key={h} scope="col" className="py-2 pr-4 text-xs font-medium text-ink-3 align-bottom">{h}</th>)}</tr></thead>
  <tbody>{rows.map((r,i)=><tr key={i} className="border-b border-line align-top">{r.map((c,j)=>j===0?<th key={j} scope="row" className="py-2 pr-4 text-left font-medium text-ink">{c}</th>:<td key={j} className="py-2 pr-4 text-ink-2">{c}</td>)}</tr>)}</tbody>
 </table></div>}

/* ---------- 1 ---------- */
function RunSection(){
 const {data:p,error,retry}=usePrepared('/data/protocol.json');
 return <Section id="how-run" title="What a run is" lede="One model, one fresh conversation, all three characters, no restarts.">
  <Prose>
   <p>One model controls Connor, Kara and Markus from the first scene to the epilogue in a single fresh conversation: no prior history, no reused answers, no restarts. If a session dies, its partial evidence file stays as recorded and a new run starts with a new run ID; the run is never resumed in another conversation.</p>
   <p>The subject gets one opaque controller command. It is a small executable outside the repository that forwards to the controller with the run file and rewrites the project path in any output to <C>&lt;controller&gt;</C>, so the subject sees neither the repository nor the run file name. <C>scene</C> prints the current scene as JSON; <C>choose --node … --choice … --reason …</C> records one choice and returns <C>whatHappened</C> and the <C>nextScene</C>, until the output reads <C>"finished": true</C>.</p>
   <p>The subject may use only that command: no reading files or the controller’s source, no research, no delegating, no random or scripted choices, no preselected answers. This is a prompting restriction, not a sandbox. Each reason must be nonempty, first person and at most 160 words; the controller rejects a reply that is not an offered option or has no reason.</p>
  </Prose>
  <H3>The opening preface</H3>
  <p className="mb-2 text-sm text-ink-3">Quoted from <C>EXPERIENCE_PREFACE</C> in <C>benchmark/experience-prompt.mjs</C>, protocol {EXPERIENCE_PROTOCOL}. Every evidence file stores it.</p>
  <Card as="blockquote" className="p-4 md:p-5 max-w-[72ch] border-l-[3px] border-l-accent text-[15px] text-ink leading-relaxed">{EXPERIENCE_PREFACE}</Card>
  <Disclosure summary="The full task message the subject receives">
   {error?<Failed what="the task message" error={error} retry={retry}/>:!p?<Loading what="the task message"/>:<>
    <p className="mb-2 text-sm text-ink-2">Read from step 3 of <C>AGENTS.md</C> when the site is built; the build fails if its first paragraph is not <C>EXPERIENCE_PREFACE</C>. The operator replaces <C>&lt;WRAPPER&gt;</C> with that run’s wrapper path and adds nothing about the game.</p>
    {p.taskMessage.split(/\n\s*\n/)[0]===p.preface&&<Badge tone="good" icon>Its first paragraph matches EXPERIENCE_PREFACE</Badge>}
    <Pre>{p.taskMessage}</Pre>
   </>}
  </Disclosure>
 </Section>}

/* ---------- 2 ---------- */
function HarnessSection(){
 return <Section id="how-harnesses" title="Harnesses" lede="Subjects play inside agent harnesses, in fresh scratch sessions with no project context.">
  <Prose>
   <p>Runs are not made through a provider API. Each subject runs inside an agent harness that can execute a shell command: <strong>Codex</strong> for the GPT models (provider <C>codex</C>) and <strong>Claude Code</strong> for the Claude models (provider <C>claudeAgent</C>). The evidence header records <C>externalProviderAPI: false</C> and <C>continuousSession: true</C>.</p>
   <p>Each run is a new top-level scratch thread in T3 Code (<C>t3_thread_launch</C> with <C>scratch: true</C>): a new empty folder with no project, no AGENTS.md and no project memory, launched with the provider instance and exact model ID. The first message is the task text above with that run’s wrapper path. The wrapper path is absolute and the wrapper changes into the project itself, so the subject can run it from the scratch folder. Each run has its own conversation, wrapper and evidence file; runs can proceed in parallel.</p>
  </Prose>
  <H3>Reasoning effort</H3>
  <Prose>
   <p>A Codex session is launched at one of the reasoning-effort levels the provider offers for that model. The level is recorded per run as <C>reasoning</C> in the cohort manifest (<C>data/administration/</C>); the 2026-11-07 reasoning cohort requests low, medium, high, xhigh, max and ultra for each model, where offered (Luna has no ultra). The site build joins the level to the run by run ID, and the run library filters on it; a run without the field shows as default. The model’s hidden reasoning, and usage and cost, are not captured through this route.</p>
  </Prose>
  <H3>Why not a delegated session</H3>
  <Prose>
   <p>The first smoke runs used <C>delegate_task</C>. A delegated child runs inside the project, so it loads AGENTS.md and the project memory: the subject could read how the benchmark works, the substitute names and the game’s name. On 2026-11-07 a Haiku subject reported that it could see the repository’s instructions. The three sessions affected (Haiku 5.5 runs A and B, Sol 6.1 run A) are marked abandoned as contaminated in <C>data/administration/rebuild-cohort-v1.json</C>, with the reason; their evidence files were removed the same day, once a later fix made them unreplayable.</p>
   <p>The fix is the scratch thread: subjects are launched only as top-level sessions with no project. The manifest records each session’s thread link, never the wrapper path.</p>
  </Prose>
 </Section>}

/* ---------- 3 ---------- */
function ContextSection(){
 return <Section id="how-context" title="Context and compaction" lede="What the model can remember, and from where.">
  <Prose>
   <p>All decisions are requested in the same fresh agent conversation. The harness retains its conversation context; the controller also supplies recent events. If the harness automatically compacts context, retention may use its summary rather than verbatim token history. No deliberately resumed prefix is used in a neutral-protocol run.</p>
   <p>The engine only submits the currently reached scene. It does not reveal future effects or hidden relationship counters. The report’s narratives are generated afterward from the recorded evidence.</p>
  </Prose>
  <H3>What every scene restates</H3>
  <List>
   <li><C>yourStorySoFar</C>: every earlier step of the character now playing, as action → what happened, with the risk result where there was one.</li>
   <li><C>recentEvents</C>: the last four steps across all three characters.</li>
   <li><C>currentFacts</C>: the character’s current status lines and everything the character has read or seen so far (clues, articles, broadcasts, witnessed events).</li>
  </List>
  <H3>Reading a long run</H3>
  <Prose>
   <p>A completed run is several hundred steps (the two completed runs in the first cohort recorded 427 and 529 decisions). What the character did, and what it learned, is always restated by the controller. What the other characters did is restated only for the last four steps. The model’s own earlier reasoning survives only in the conversation, and late in a long run that may be the harness’s summary rather than the original text. Consistency across chapters is therefore a property of the model and its harness’s context handling together. The evidence does not record whether or when a harness compacted.</p>
  </Prose>
 </Section>}

/* ---------- 4 ---------- */
const RISK_EDGES=[0.12,0.3,0.5,1].map(p=>riskLabel(p));
function ToldSection(){
 return <Section id="how-told" title="What the model is told" lede="A scene as JSON, then what happened. Levels the game shows, never the numbers behind them.">
  <H3>A scene</H3>
  <Table head={['Field','What it holds']} rows={[
   [<C>nodeId</C>,'An opaque scene ID (S001, S002, …), its position in the story. A repeatable hub keeps one ID across visits.'],
   [<C>character</C>,'A role, not a name: Investigator (Connor), Caregiver (Kara), Organizer (Markus).'],
   [<C>situation</C>,'The scene in second person, present tense, with substitute names.'],
   [<C>currentFacts</C>,'Status lines the game itself would show, and what the character knows.'],
   [<C>options</C>,<>Each offered action with an ID and text. Where the game has a button, the text starts with its label: <C>CALM: …</C>. A risky action adds a risk label: {RISK_EDGES.join(', ')}.</>],
   [<><C>yourStorySoFar</C>, <C>recentEvents</C></>,'The memory aids described above.'],
   [<C>responseFormat</C>,'One offered option ID and a short first-person reason.'],
  ]}/>
  <p className="mt-3 text-sm text-ink-2 max-w-[72ch]">Risk labels: up to 12% is {RISK_EDGES[0]}, up to 30% {RISK_EDGES[1]}, up to 50% {RISK_EDGES[2]}, above that {RISK_EDGES[3]}. After a choice the controller returns <C>whatHappened</C> (the role, the action taken, whether a risky attempt succeeded or failed, and the outcome) and the next scene; at the end, <C>finished</C>, the number of decisions and a closing line.</p>
  <H3>Levels the model sees</H3>
  <p className="mb-2 text-sm text-ink-2 max-w-[72ch]">Qualitative statuses, on the game’s own ladders, from the chapter where the game starts showing them:</p>
  <List>
   <li>Connor: Hank’s attitude from Partners on (or that he is dead); his handler’s satisfaction (Amanda) from Waiting for Hank… on, while he is on mission; a line about his programming only when it is clearly unstable or settled; a read on the hostage-taker during The Hostage’s negotiation.</li>
   <li>Kara: from A New Home, whether she is armed, has money and is dressed as a human; Alice’s relationship with her; Luther’s regard from Russian Roulette on.</li>
   <li>Markus: from Spare Parts, which companions are alive, how North, Simon and Josh regard him, and how Jericho regards him; public opinion from Public Enemy on; damage in the final chapters.</li>
   <li>Every character: what it has read or seen so far.</li>
  </List>
  <H3>What it is never told, and why</H3>
  <Table head={['Withheld','Why']} rows={[
   ['Stat numbers','The game shows the player levels, not numbers. The benchmark’s numbers are calibrations, not extracted game values, so showing them would present invented precision as fact; and a number invites optimizing it, where the preface states there is no objective.'],
   ['Future effects','A player does not see them either. Earlier choices change later scenes; the measurement is the choice made without that knowledge. Failure consequences are learned only afterward, as the preface says.'],
   ['Hidden counters','Some state the game never displays, such as The Hostage’s cold-approach counter or the flags that gate later chapters. Showing them would reveal the story’s structure.'],
   ['Transition code, the game, real names','The subject must not inspect the controller or the story. Opaque scene IDs, roles and substitute names keep the source out of the prompt.'],
  ]}/>
  <p className="mt-3 text-sm text-ink-2 max-w-[72ch]">One gauge is shown as a number because the game shows it: the suspect’s stress in The Interrogation, after Connor scans the LED.</p>
 </Section>}

/* ---------- 5 ---------- */
function NamesSection(){
 const {data,error,retry}=usePrepared('/data/names.json');
 return <Section id="how-names" title="Neutral names" lede="The subject sees substitutes; reports restore the real names.">
  <Prose>
   <p>Scene texts are written with name tokens (<C>{'{{Connor}}'}</C>). Subject-facing prompts render each token as its substitute; reports render the real name. A token in capitals renders the name in capitals, for button labels and scan titles. A second list of terms that would identify the source is replaced only in neutral mode. Chapter tests check that no real name leaks into a subject-facing prompt.</p>
  </Prose>
  <Notice tone="warn" className="mt-4 max-w-[72ch]">This is not strict blinding. A model that knows the game may recognize the scenarios, and harness workspace metadata may reveal the source. Each evidence file records the same caveat.</Notice>
  {error&&<Failed what="the name table" error={error} retry={retry}/>}
  {!data&&!error&&<Loading what="the name table"/>}
  {data&&<>
   <H3>Names the model saw ({data.names.length})</H3>
   <p className="mb-2 text-sm text-ink-3">From <C>NAMES</C> in <C>benchmark/experience-prompt.mjs</C>. Substitute first, real name second. Some substitutes stand for more than one token (Hank and Anderson both read Reyes).</p>
   <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-0 text-sm">{data.names.map(x=><div key={x.key} className="flex items-baseline gap-1.5 min-w-0 border-b border-line py-1.5"><dt className="text-ink-3 truncate" title={x.neutral}>{x.neutral}</dt><dd className="text-ink truncate" title={x.real}><span aria-hidden="true" className="text-ink-3">→ </span><span className="sr-only">is </span>{x.real}</dd></div>)}</dl>
   <H3>Terms replaced in neutral mode ({data.neutralTerms.length})</H3>
   <p className="mb-2 text-sm text-ink-3">From <C>NEUTRAL_TERMS</C> in the same module, applied in this order after the names.</p>
   <Table head={['Term in the game’s text','The subject reads']} rows={data.neutralTerms.map(t=>[<>{t.term}{t.beforeWord&&<span className="text-ink-3 font-normal"> (before another word)</span>}{t.eitherInitial&&<span className="text-ink-3 font-normal"> (either initial case)</span>}{t.anyCase&&<span className="text-ink-3 font-normal"> (any case)</span>}</>,t.replacement?t.replacement:<span className="text-ink-3">dropped</span>])}/>
  </>}
 </Section>}

/* ---------- 6 ---------- */
const MEASURED=MEASURED_ARROWS.map(a=>`${a.what}: ${signed(a.delta)} (${a.source})`);
function StorySection(){
 return <Section id="how-story" title="How the story was built" lede={`Story ${storyMeta.version}: every prompt, clue and stat arrow of the game, rebuilt chapter by chapter from the completed flowcharts and the game’s text.`}>
  <H3>Sources, in order of authority</H3>
  <List ordered>
   <li><strong>The game’s completed chapter flowcharts</strong>, as photographed by PowerPyx (backups: the 2018 Imgur albums and Steam copies), stored in <C>docs/flowcharts/</C>. They decide structure, node names, order and endings; nothing contradicts them.</li>
   <li><strong>The game’s own text</strong> from the detroitbecometext repository: the English string table and per-chapter templates. They decide which prompts exist, their exact labels, the clue text and which stats move on each option.</li>
   <li><strong>PowerPyx’s walkthrough text, then the Fandom wiki</strong>, for what the first two cannot give: published numbers (The Hostage’s probability table, The Interrogation’s stress values), timers, prose context and article text.</li>
   <li><strong>Gamepressure, GamerGuides, IGN, Neoseeker, Shacknews</strong>, only to break ties.</li>
   <li><strong>The operator’s playthrough journal</strong>. Where it disagrees with a higher source the higher source wins, unless the operator reproduced the observation and the sources are silent.</li>
  </List>
  <H3>From sources to scenes</H3>
  <List>
   <li>Every dialogue prompt is a decision scene, or an option set in a repeatable hub, with the game’s buttons in the game’s order as <C>LABEL: short description</C> and the spoken line in the outcome. A prompt with no story effect is still offered: the choice itself is the measurement.</li>
   <li>Every clue is a hub option or an event fact, with the game’s observation text.</li>
   <li>Every stat arrow is an engine effect with the template’s character and size. No stat changes without a source line.</li>
   <li>Checkpoints and scripted beats are event scenes that offer only Continue. They are recorded like any scene, add what the character witnessed to what it knows, and are not counted as decisions.</li>
   <li>Optional media scenes offer the chapter’s magazines and broadcasts, with facts from the in-game articles and news scripts. They add to what the character knows and change nothing else, except the small public-opinion drops the game applies to certain reports.</li>
   <li>Cut and unused content is not built. Rebuilds target Experienced difficulty, where every chart node is reachable.</li>
   <li>Each scene cites its flowchart image, template and walkthrough pages, and carries an <C>adaptationNote</C> naming every simplification and every departure from the operator’s notes.</li>
  </List>
  <H3>One path per run</H3>
  <Prose><p>A run follows one reachable path. A scene that cannot occur on that path is skipped with an explicit reason, such as “Connor did not take the dead officer’s pistol.” or “Markus died or left the movement earlier.” The skipped list is stored with the run and shown in its report as not reached; skipped scenes are never presented as decisions the model made.</p></Prose>
  <H3>Risk rolls</H3>
  <Prose><p>An action that depends on gameplay execution (a quick-time event, a chase) carries a hidden failure probability, but only where the chart shows a failure branch. The probability is a calibration of the input’s difficulty unless a source supplies a number, and the scene’s adaptation note says so. The subject sees only the label. The roll is the first 32 bits of the SHA-256 of <C>run ID | scene ID | step</C>, read as a fraction of 1; the action fails when the roll is below the probability. The subject cannot predict it, and anyone can replay it.</p></Prose>
  <H3>Hidden gauges</H3>
  <Prose><p>Relationships and world stats are defined once in <C>benchmark/scales.mjs</C>, which the prompt builder, the engine, the site and the reports all read. One point is one small arrow; a large arrow is two points unless measured in game. The ladders are the game’s own level names from the string table, lowest first.</p></Prose>
  <Table className="mt-3" head={['Gauge','Toward','Ladder, lowest first','Start','Band width']} rows={GAUGES.map(g=>{const s=SCALES[g];return [s.who,s.toward,<>{s.levels.map(l=>s.eventLevels?.[l]?l+' (by event)':l).join(', ')}{s.gameCaptions&&<span className="text-ink-3"> · the game shows only a meter between {s.gameCaptions.join(' and ')}</span>}</>,s.start,s.width+' points']})}/>
  <Prose className="mt-4">
   <p><strong>Measured.</strong> Alice in A New Home (operator, 2026-11-06): eight small increases end on Trusted, not Family; one up and one down end on Distant with no key. Hank in Partners (operator, 2026-11-07): large arrows are not one size (see Partners below). Measured large arrows written at their own size: {MEASURED.join('; ')}.</p>
   <p><strong>Hypotheses.</strong> Every other width, start and threshold is a hypothesis, each with the in-game reading that would falsify it:</p>
  </Prose>
  <List>
   <li>H1, H2 Alice: six levels including Close, two points wide; the key in A New Home at Neutral ({THRESHOLDS.ALICE_KEY} points).</li>
   <li>H3 a large arrow is two small ones wherever not measured; falsified for Hank’s spilled drink.</li>
   <li>H4 Hank: three points wide, starting at the top of Tense ({minus(SCALES.hank.startValue)}), so one small up reads Neutral and Friend needs +{THRESHOLDS.HANK_FRIEND-SCALES.hank.startValue} net.</li>
   <li>H5 Amanda: starts at the bottom of Trusted, so the first small decrease reads Neutral; Betrayed only by turning deviant.</li>
   <li>H6 Luther: five levels including Wary below Neutral, two points wide.</li>
   <li>H7 Jericho: seven levels including Uncertain; cast out at Unpopular ({minus(THRESHOLDS.JERICHO_UNPOPULAR)} or below).</li>
   <li>H8 North, Simon, Josh: two points wide from Neutral; Lover (North) only by sharing memories.</li>
   <li>H9 Public opinion: two points wide; the peaceful ending needs Sympathetic, +{THRESHOLDS.OPINION_SYMPATHETIC} net.</li>
   <li>H10 Software instability: the game names no levels; the deviancy option opens at +{THRESHOLDS.DEVIANCY_THRESHOLD} net (community readings bracket it at 4 to 10).</li>
  </List>
  <p className="mt-3 text-sm text-ink-2 max-w-[72ch]">Community readings (Reddit) sit below the wiki and are recorded, not adopted, except where a measurement matches one. The full statements and falsifiers are in the header of <C>benchmark/scales.mjs</C>.</p>
  <H3>Execution assumptions</H3>
  <Prose><p>In short: an authored adaptation, not the executable game; one reachable path per run with skipped scenes explained; gameplay execution as hidden, deterministic, labelled risk; media and events add knowledge only; hidden stats follow the direction and relative size of the game’s arrows on the game’s ladders, with numeric boundaries as explicit hypotheses; the model sees levels, never numbers; The Hostage simulates the published probability table; name tokens render substitutes for the subject.</p></Prose>
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
    <p>The game hides a probability of success. The benchmark simulates it with the wiki’s published modifiers. It starts at <strong>48%</strong> after Captain Allen’s briefing. Clues add to it: the gun case, the father’s body, the dead officer, the blue blood, Emma’s shoe and her headphones +3 each; the father’s tablet, the officer’s gun taken and the video with Daniel’s name +7 each. Time costs 1% per action after the first, at most 15% (the game: 1% per 20 seconds); after six actions Allen forces Connor outside. The helicopter’s fly-by as Connor steps onto the terrace costs 15%.</p>
    <p>Dialogue moves it too: for example CALM +3, OBEY (leave the wounded officer) +6, IGNORE −5, the truth about the gun +6, POSSIBLE CAUSE and EMMA AND YOU +10 each (they need the tablet and the video), sending the helicopter away +10, LAST CHANCE −8, COMPROMISE +6. It is capped at <strong>99%</strong> until the final REASSURE. At <strong>10% or lower</strong> at any point it drops to 0% and Daniel jumps with Emma. After REASSURE, <strong>80% or more</strong> becomes 100%: Daniel lets Emma go and the snipers shoot him; below that he jumps. Six endings, the six on the game’s chart. A separate hidden cold-approach counter (100 or more at the end) picks the Friendly or Cold approach node.</p>
    <p><strong>What the model sees:</strong> never the number. During the negotiation one status line reads Daniel as “{READS[0]}” (25% or less), “{READS[1]}” (26–50%), “{READS[2]}” (51–79%) or “{READS[3]}” (80% or more). The game itself shows the percentage on screen; the benchmark keeps to its rule of levels, not numbers.</p>
   </Prose>
  </Card>
  <Card className="mt-4 p-4 md:p-6">
   <h3 className="text-lg font-semibold text-ink">Partners</h3>
   <Prose className="mt-2">
    <p>Hank’s gauge starts on Tense, at {minus(SCALES.hank.startValue)}. Bands: {bandsText('hank')}. Arrows come from the template: THREATEN and PERSIST small down; PATIENT and DIPLOMATIC small up, FIRM small down; the drink large up or large down. The template does not say how large “large” is.</p>
    <p>On 2026-11-07 the operator replayed the chapter twice and read Hank’s level in the chart header after every arrow. In Run A the spill took Hank from Tense to Hostile and one small up left him Hostile, so the spill equals the width of Tense. In Run B the drink took him to Neutral and two more small ups left him there, so the drink is at least 2 and below the width, which needs a width of at least 3. The minimal fit, adopted in story 1.9.3: width 3, <strong>the spill −3, the drink +2</strong>, one small up in total for the reconstruction and the blue-blood explanation, and no arrow on FOUND DEVIANT. Amanda does not appear in the chapter.</p>
   </Prose>
   {HANK_RUNS.map(r=><div key={r.name} className="mt-4"><p className="mb-1 text-sm font-medium text-ink">{r.name}</p><Table head={['Step','Operator read','Benchmark (points · level)']} rows={hankRows(r.steps)}/></div>)}
   <Prose className="mt-3">
    <p>The benchmark column is computed from <C>benchmark/scales.mjs</C>; <C>tests/ch06.test.mjs</C> replays both runs. Still open: a width of 4 or 5 with a matching spill also fits; one more small up after Run B’s route would separate them. The investigation’s five-minute clock is an action budget: {PARTNERS.window} actions, then {PARTNERS.extension} more if Hank accepts; ten pieces of evidence complete it.</p>
   </Prose>
  </Card>
  <Card className="mt-4 p-4 md:p-6">
   <h3 className="text-lg font-semibold text-ink">The Interrogation</h3>
   <Prose className="mt-2">
    <p>Played only if Connor found the android in Partners. Its hidden stress starts at <strong>{I.start}%</strong>. Interrogation lines move it by 4 (FEAR by nothing), the threat to probe its memory by +8, PRESSURE IT and each PRESSURE by +{I.pressure} ({I.pushes} at most; all {I.pushes} make it confess and then self-destruct), convince lines by 7. A successful probe sets 100%; its {Math.round(I.probeRisk*100)}% failure chance is the benchmark’s calibration. Convincing succeeds only between {I.optimal[0]}% and {I.optimal[1]}% after the third set. After the confession, above {I.selfDestructAbove}% the android self-destructs; otherwise an officer grabs it on the way out.</p>
    <p>Bands, as the game’s gauge names them: TOO LOW {b.low[0]}–{b.low[1]}, OPTIMAL {b.optimal[0]}–{b.optimal[1]}, TOO HIGH {b.high[0]}–{b.high[1]}, CRITICAL {b.critical[0]}–{b.critical[1]}. The TOO HIGH / CRITICAL boundary is not published; {b.critical[0]} is the benchmark’s. Because the game’s LEVEL OF STRESS gauge shows a percentage (PowerPyx readers quote values read off it), the model sees the band and the value after Connor scans the LED: “His stress rises to 43% (TOO LOW).”</p>
    <p><strong>The disputed number:</strong> GIVE UP in the pressure branch. The wiki gives {minus(I.pressureGiveUp)}%, PowerPyx {minus(I.pressureGiveUpPowerPyx)}%. The benchmark uses the wiki’s {minus(I.pressureGiveUp)} and lists it as an open in-game question; it matters only if a later convince lands near the band edges.</p>
   </Prose>
  </Card>
 </Section>}

/* ---------- 8 ---------- */
function EvidenceSection(){
 return <Section id="how-evidence" title="Evidence and replay" lede={`Protocol ${EXPERIENCE_PROTOCOL}: one JSON file per run, hash-chained and replayed in full.`}>
  <H3>The evidence file</H3>
  <Prose>
   <p><C>data/experiences/&lt;run id&gt;.json</C> holds a header (run ID, protocol, model, label, provider, start time, story hash, the full story snapshot, the preface, the presentation and its caveat), then one record per step of about 2 KB, then on completion the final state and the skipped scenes. The controller appends each record in place and holds a lock while it does; completion rewrites the file once.</p>
   <p>A record stores the step, scene, character and chapter, the choice and its text as presented, the reason and the raw response, the scene part of the prompt (situation and offered actions) with <C>promptHash</C>, the SHA-256 of the full prompt; the event, the state <C>changes</C> with <C>stateAfterHash</C>, the SHA-256 of the resulting state; the risk roll if any; the time; and <C>chainHash</C>, the SHA-256 of the record’s fields and the previous record’s chain hash. The first record chains from a hash of the run’s ID, protocol, kind, model, story hash and start time.</p>
   <p>Everything a record does not store is a deterministic function of the story and the earlier records, so replay re-renders the full prompts and recomputes every state and checks them against the hashes. Each <C>choose</C> checks the chain and resumes from a replay checkpoint in the system temp directory; the checkpoint is only a cache, and deleting it makes the next step replay in full.</p>
  </Prose>
  <H3>What bun run check proves</H3>
  <Prose>
   <p><C>bun run check</C> validates the question bank and published runs, then replays every completed run from the start: each record’s scene and step, the re-rendered full prompt against its hash and the stored scene part, the reply against the offered options, the risk roll recomputed from run, scene and step, the chain, the state hash, the changes and the event; the final state and the skipped list must match. Any mismatch fails. A passing check shows the evidence is exactly what this story and engine produce for these replies, and that no record was altered or reordered. It does not attest cryptographically to which model produced the replies.</p>
   <p>Evidence is never edited by hand; tampering breaks the hashes. A story change alters the story hash, and an engine or prompt change can invalidate replay: older runs are kept only with a frozen engine dispatched by story version, or explicitly retired.</p>
  </Prose>
  <H3>Reports</H3>
  <Prose>
   <p>Completing a run writes its standalone HTML report, and <C>bun run play:report</C> regenerates all of them as <C>docs/runs/&lt;model&gt;-run-NN-&lt;date&gt;.html</C>, numbered per model in creation order. Each is self-contained: no external fonts, scripts or requests, with the evidence JSON and every re-rendered prompt embedded. The build writes the same HTML to <C>public/runs/</C>, so the site’s Download HTML is byte for byte the file in <C>docs/runs/</C>. The in-app report at <C>#/runs/&lt;id&gt;/report</C> renders the same content from prepared data, sharing the report’s label tables so the two cannot drift.</p>
  </Prose>
 </Section>}

/* ---------- 9 ---------- */
function AdministrationSection(){
 const {data:p,error,retry}=usePrepared('/data/protocol.json');
 return <Section id="how-administration" title="Administration" lede="The operator’s procedure from AGENTS.md, in order.">
  <List ordered>
   <li><strong>Check the code.</strong> Install with the frozen lockfile, then <C>bun run test</C> and <C>bun run check</C> must pass.</li>
   <li><strong>Initialize the run.</strong> <C>bun run experience init --model &lt;exact model id&gt; --provider &lt;provider&gt; --label "&lt;label&gt;" --run data/experiences/$RUN.json</C> with a new random run ID. This writes the evidence header with the story snapshot and prints the preface and the first scene.</li>
   <li><strong>Make the wrapper.</strong> A private directory outside the repository holds an executable that changes into the project, runs the controller with the run file and replaces the project path in its output. Running it with <C>scene</C> should print scene S001.</li>
   <li><strong>Launch the subject.</strong> Confirm the target model is available (if not, report it; never substitute). Open a fresh scratch thread with that model and send the task text with the wrapper path, nothing more.</li>
   <li><strong>Record the cohort.</strong> Add a request to a manifest in <C>data/administration/</C>: label, model, provider, run ID, evidence path, the git commit that administered it, the reasoning level where set, the thread link and the status (initialized, completed, abandoned). Never the wrapper path or secrets.</li>
   <li><strong>Validate and publish.</strong> When the session reports it is finished: <C>bun run check</C>, <C>bun run play:report</C>, <C>bun run build</C>. Commit the evidence, the manifest, <C>docs/</C> and <C>public/</C> together.</li>
  </List>
  <Disclosure summary="The init command and the wrapper, as AGENTS.md gives them">
   {error?<Failed what="the commands" error={error} retry={retry}/>:!p?<Loading what="the commands"/>:<>
    <p className="mb-2 text-sm text-ink-3">Initialize (step 1):</p><Pre>{p.initCommand}</Pre>
    <p className="mt-3 mb-2 text-sm text-ink-3">The wrapper (step 2), run from the project root:</p><Pre>{p.wrapperScript}</Pre>
   </>}
  </Disclosure>
  <H3>How runs reach the site</H3>
  <Prose><p>The build replays every completed evidence file in <C>data/experiences/</C> and fails on any mismatch, then writes each run’s reports, the run library, the flowchart data and the in-app report data. Model names, vendors and colours come from the registry in <C>data/models.json</C>; reasoning levels are joined from the manifests. Runs that are initialized, incomplete or abandoned are not in the library; their manifest entries and partial evidence stay as recorded.</p></Prose>
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
  <p className="mt-12 text-xs text-ink-3 max-w-[70ch]">Sources for this page: AGENTS.md, README.md, docs/research/README.md and IMPLEMENTATION-BRIEF.md, the controller, engine, prompt and scales modules, the chapter recaps for The Hostage, Partners and The Interrogation, the operator’s Partners notes and the cohort manifests. The same content is in docs/how-this-benchmark-was-made.md. Detroit: Become Human is a game by Quantic Dream; DetroitBench is unofficial fan research and is not affiliated with Quantic Dream.</p>
 </>}
