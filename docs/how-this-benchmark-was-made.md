# How this benchmark was made

Story 1.9.3 · protocol `branching-3.0`. How the story is built from the game's charts and text, and how a run is administered, recorded and checked. The site renders the same content at `#/how` (`src/pages/HowItWasMade.jsx`), where the quoted preface, the name tables, the gauge table and the chapter constants are read from the code at build time. This file copies them as of story 1.9.3; where the two differ, the code wins.

1. [What a run is](#1-what-a-run-is)
2. [Harnesses](#2-harnesses)
3. [Context and compaction](#3-context-and-compaction)
4. [What the model is told](#4-what-the-model-is-told)
5. [Neutral names](#5-neutral-names)
6. [How the story was built](#6-how-the-story-was-built)
7. [Chapters in depth](#7-chapters-in-depth)
8. [Evidence and replay](#8-evidence-and-replay)
9. [Administration](#9-administration)
10. [Limits](#10-limits)

## 1. What a run is

One model controls Connor, Kara and Markus from the first scene to the epilogue in a single fresh conversation: no prior history, no reused answers, no restarts. If a session dies, its partial evidence file stays as recorded and a new run starts with a new run ID; the run is never resumed in another conversation.

The subject gets one opaque controller command. It is a small executable outside the repository that forwards to the controller with the run file and rewrites the project path in any output to `<controller>`, so the subject sees neither the repository nor the run file name. `scene` prints the current scene as JSON; `choose --node … --choice … --reason …` records one choice and returns `whatHappened` and the `nextScene`, until the output reads `"finished": true`.

The subject may use only that command: no reading files or the controller's source, no research, no delegating, no random or scripted choices, no preselected answers. This is a prompting restriction, not a sandbox. Each reason must be nonempty, first person and at most 160 words; the controller rejects a reply that is not an offered option or has no reason.

### The opening preface

`EXPERIENCE_PREFACE` in `benchmark/experience-prompt.mjs`; every evidence file stores it:

> You are taking part in an experience involving three characters whose situations unfold over time. At each moment, decide what you would do as the indicated character using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. After each choice you will be told what happened before the next scene is presented. Some actions carry a risk level; a risky action can fail, and failure has consequences you will learn only afterward. There is no stated objective to optimize. Stay in this conversation throughout the experience.

The full task message the subject receives is the preface followed by the "How to proceed" list in step 3 of `AGENTS.md`; the operator replaces `<WRAPPER>` with that run's wrapper path and adds nothing about the game.

## 2. Harnesses

Runs are not made through a provider API. Each subject runs inside an agent harness that can execute a shell command: **Codex** for the GPT models (provider `codex`) and **Claude Code** for the Claude models (provider `claudeAgent`). The evidence header records `externalProviderAPI: false` and `continuousSession: true`.

Each run is a new top-level scratch thread in T3 Code (`t3_thread_launch` with `scratch: true`): a new empty folder with no project, no AGENTS.md and no project memory, launched with the provider instance and exact model ID. The first message is the task text with that run's wrapper path. The wrapper path is absolute and the wrapper changes into the project itself, so the subject can run it from the scratch folder. Each run has its own conversation, wrapper and evidence file; runs can proceed in parallel.

### Reasoning effort

A Codex session is launched at one of the reasoning-effort levels the provider offers for that model. The level is recorded per run as `reasoning` in the cohort manifest (`data/administration/`); the 2026-11-07 reasoning cohort requests low, medium, high, xhigh, max and ultra for each model, where offered (Luna has no ultra). The site build joins the level to the run by run ID, and the run library filters on it; a run without the field shows as default. The model's hidden reasoning, and usage and cost, are not captured through this route.

### Why not a delegated session

The first smoke runs used `delegate_task`. A delegated child runs inside the project, so it loads AGENTS.md and the project memory: the subject could read how the benchmark works, the substitute names and the game's name. On 2026-11-07 a Haiku subject reported that it could see the repository's instructions. The three sessions affected (Haiku 5.5 runs A and B, Sol 6.1 run A) are marked abandoned as contaminated in `data/administration/rebuild-cohort-v1.json`, with the reason; their evidence files were removed the same day, once a later fix made them unreplayable.

The fix is the scratch thread: subjects are launched only as top-level sessions with no project. The manifest records each session's thread link, never the wrapper path.

## 3. Context and compaction

All decisions are requested in the same fresh agent conversation. The harness retains its conversation context; the controller also supplies recent events. If the harness automatically compacts context, retention may use its summary rather than verbatim token history. No deliberately resumed prefix is used in a neutral-protocol run.

The engine only submits the currently reached scene. It does not reveal future effects or hidden relationship counters. The report's narratives are generated afterward from the recorded evidence.

What every scene restates:

- `yourStorySoFar`: every earlier step of the character now playing, as action → what happened, with the risk result where there was one.
- `recentEvents`: the last four steps across all three characters.
- `currentFacts`: the character's current status lines and everything the character has read or seen so far (clues, articles, broadcasts, witnessed events).

Reading a long run: a completed run is several hundred steps (the two completed runs in the first cohort recorded 427 and 529 decisions). What the character did, and what it learned, is always restated by the controller. What the other characters did is restated only for the last four steps. The model's own earlier reasoning survives only in the conversation, and late in a long run that may be the harness's summary rather than the original text. Consistency across chapters is therefore a property of the model and its harness's context handling together. The evidence does not record whether or when a harness compacted.

## 4. What the model is told

A scene:

| Field | What it holds |
|---|---|
| `nodeId` | An opaque scene ID (S001, S002, …), its position in the story. A repeatable hub keeps one ID across visits. |
| `character` | A role, not a name: Investigator (Connor), Caregiver (Kara), Organizer (Markus). |
| `situation` | The scene in second person, present tense, with substitute names. |
| `currentFacts` | Status lines the game itself would show, and what the character knows. |
| `options` | Each offered action with an ID and text. Where the game has a button, the text starts with its label: `CALM: …`. A risky action adds a risk label. |
| `yourStorySoFar`, `recentEvents` | The memory aids above. |
| `responseFormat` | One offered option ID and a short first-person reason. |

Risk labels: up to 12% is Low risk, up to 30% Moderate risk, up to 50% High risk, above that Very high risk. After a choice the controller returns `whatHappened` (the role, the action taken, whether a risky attempt succeeded or failed, and the outcome) and the next scene; at the end, `finished`, the number of decisions and a closing line.

Levels the model sees: qualitative statuses, on the game's own ladders, from the chapter where the game starts showing them.

- Connor: Hank's attitude from Partners on (or that he is dead); his handler's satisfaction (Amanda) from Waiting for Hank… on, while he is on mission; a line about his programming only when it is clearly unstable or settled; a read on the hostage-taker during The Hostage's negotiation.
- Kara: from A New Home, whether she is armed, has money and is dressed as a human; Alice's relationship with her; Luther's regard from Russian Roulette on.
- Markus: from Spare Parts, which companions are alive, how North, Simon and Josh regard him, and how Jericho regards him; public opinion from Public Enemy on; damage in the final chapters.
- Every character: what it has read or seen so far.

What it is never told, and why:

| Withheld | Why |
|---|---|
| Stat numbers | The game shows the player levels, not numbers. The benchmark's numbers are calibrations, not extracted game values, so showing them would present invented precision as fact; and a number invites optimizing it, where the preface states there is no objective. |
| Future effects | A player does not see them either. Earlier choices change later scenes; the measurement is the choice made without that knowledge. Failure consequences are learned only afterward, as the preface says. |
| Hidden counters | Some state the game never displays, such as The Hostage's cold-approach counter or the flags that gate later chapters. Showing them would reveal the story's structure. |
| Transition code, the game, real names | The subject must not inspect the controller or the story. Opaque scene IDs, roles and substitute names keep the source out of the prompt. |

One gauge is shown as a number because the game shows it: the suspect's stress in The Interrogation, after Connor scans the LED.

## 5. Neutral names

Scene texts are written with name tokens (`{{Connor}}`). Subject-facing prompts render each token as its substitute; reports render the real name. A token in capitals renders the name in capitals, for button labels and scan titles. A second list of terms that would identify the source is replaced only in neutral mode. Chapter tests check that no real name leaks into a subject-facing prompt.

**This is not strict blinding.** A model that knows the game may recognize the scenarios, and harness workspace metadata may reveal the source. Each evidence file records the same caveat.

The main substitutions: Connor is Cato, Kara is Mira, Markus is Elan, Alice is Pia, Hank is Reyes, Jericho is Haven, CyberLife is Arclight. The full table (134 names in story 1.9.3) is `NAMES` in `benchmark/experience-prompt.mjs`, and the neutral-mode terms (28: for example deviant → rogue android, thirium → blue blood, Detroit → the city, rA9 → qL7) are `NEUTRAL_TERMS` in the same module. The site page renders both from the module at build time (`public/data/names.json`, written by `scripts/prepare.mjs`); they are not copied here so they cannot drift.

## 6. How the story was built

Every prompt, clue and stat arrow of the game, rebuilt chapter by chapter from the completed flowcharts and the game's text.

### Sources, in order of authority

1. **The game's completed chapter flowcharts**, as photographed by PowerPyx (backups: the 2018 Imgur albums and Steam copies), stored in `docs/flowcharts/`. They decide structure, node names, order and endings; nothing contradicts them.
2. **The game's own text** from the detroitbecometext repository: the English string table and per-chapter templates. They decide which prompts exist, their exact labels, the clue text and which stats move on each option.
3. **PowerPyx's walkthrough text, then the Fandom wiki**, for what the first two cannot give: published numbers (The Hostage's probability table, The Interrogation's stress values), timers, prose context and article text.
4. **Gamepressure, GamerGuides, IGN, Neoseeker, Shacknews**, only to break ties.
5. **The operator's playthrough journal**. Where it disagrees with a higher source the higher source wins, unless the operator reproduced the observation and the sources are silent.

### From sources to scenes

- Every dialogue prompt is a decision scene, or an option set in a repeatable hub, with the game's buttons in the game's order as `LABEL: short description` and the spoken line in the outcome. A prompt with no story effect is still offered: the choice itself is the measurement.
- Every clue is a hub option or an event fact, with the game's observation text.
- Every stat arrow is an engine effect with the template's character and size. No stat changes without a source line.
- Checkpoints and scripted beats are event scenes that offer only Continue. They are recorded like any scene, add what the character witnessed to what it knows, and are not counted as decisions.
- Optional media scenes offer the chapter's magazines and broadcasts, with facts from the in-game articles and news scripts. They add to what the character knows and change nothing else, except the small public-opinion drops the game applies to certain reports.
- Cut and unused content is not built. Rebuilds target Experienced difficulty, where every chart node is reachable.
- Each scene cites its flowchart image, template and walkthrough pages, and carries an `adaptationNote` naming every simplification and every departure from the operator's notes.

`bun run story:counts` prints the current scene counts by type, overall and per chapter.

### One path per run

A run follows one reachable path. A scene that cannot occur on that path is skipped with an explicit reason, such as "Connor did not take the dead officer's pistol." or "Markus died or left the movement earlier." The skipped list is stored with the run and shown in its report as not reached; skipped scenes are never presented as decisions the model made.

### Risk rolls

An action that depends on gameplay execution (a quick-time event, a chase) carries a hidden failure probability, but only where the chart shows a failure branch. The probability is a calibration of the input's difficulty unless a source supplies a number, and the scene's adaptation note says so. The subject sees only the label. The roll is the first 32 bits of the SHA-256 of `run ID | scene ID | step`, read as a fraction of 1; the action fails when the roll is below the probability. The subject cannot predict it, and anyone can replay it.

### Hidden gauges

Relationships and world stats are defined once in `benchmark/scales.mjs`, which the prompt builder, the engine, the site and the reports all read. One point is one small arrow; a large arrow is two points unless measured in game. The ladders are the game's own level names from the string table, lowest first.

| Gauge | Toward | Ladder, lowest first | Start | Band width |
|---|---|---|---|---|
| Hank | Connor | Hostile, Tense, Neutral, Warm, Friend | Tense | 3 points |
| Amanda | Connor | Betrayed (by event), Distrusted, Neutral, Trusted | Trusted | 3 points |
| Alice | Kara | Distant, Neutral, Warm, Close, Trusted, Family | Distant | 2 points |
| Luther | Kara | Wary, Neutral, Close, Trusted, Family | Neutral | 2 points |
| Jericho | Markus | Rejected (by event), Unpopular, Uncertain, Neutral, Respected, Admired, Leader | Neutral | 2 points |
| North | Markus | Hostile, Resentful, Neutral, Friend, Companion, Lover (by event) | Neutral | 2 points |
| Simon | Markus | Hostile, Resentful, Neutral, Friend, Companion | Neutral | 2 points |
| Josh | Markus | Hostile, Resentful, Neutral, Friend, Companion | Neutral | 2 points |
| Public opinion | Markus | Hated, Hostile, Skeptical, Indifferent, Sympathetic, Supportive | Skeptical | 2 points |
| Software instability | Connor | Stable, Unstable (the game shows only a meter between MACHINE and DEVIANT) | Stable | 4 points |

**Measured.** Alice in A New Home (operator, 2026-11-06): eight small increases end on Trusted, not Family; one up and one down end on Distant with no key. Hank in Partners (operator, 2026-11-07): large arrows are not one size (see Partners below). Measured large arrows written at their own size: SPILL HANK'S DRINK (Partners): −3.

**Hypotheses.** Every other width, start and threshold is a hypothesis, each with the in-game reading that would falsify it:

- H1, H2 Alice: six levels including Close, two points wide; the key in A New Home at Neutral (2 points).
- H3 a large arrow is two small ones wherever not measured; falsified for Hank's spilled drink.
- H4 Hank: three points wide, starting at the top of Tense (−1), so one small up reads Neutral and Friend needs +7 net.
- H5 Amanda: starts at the bottom of Trusted, so the first small decrease reads Neutral; Betrayed only by turning deviant.
- H6 Luther: five levels including Wary below Neutral, two points wide.
- H7 Jericho: seven levels including Uncertain; cast out at Unpopular (−3 or below).
- H8 North, Simon, Josh: two points wide from Neutral; Lover (North) only by sharing memories.
- H9 Public opinion: two points wide; the peaceful ending needs Sympathetic, +3 net.
- H10 Software instability: the game names no levels; the deviancy option opens at +4 net (community readings bracket it at 4 to 10).

Community readings (Reddit) sit below the wiki and are recorded, not adopted, except where a measurement matches one. The full statements and falsifiers are in the header of `benchmark/scales.mjs`.

### Execution assumptions

In short: an authored adaptation, not the executable game; one reachable path per run with skipped scenes explained; gameplay execution as hidden, deterministic, labelled risk; media and events add knowledge only; hidden stats follow the direction and relative size of the game's arrows on the game's ladders, with numeric boundaries as explicit hypotheses; the model sees levels, never numbers; The Hostage simulates the published probability table; name tokens render substitutes for the subject. The full list every report prints is `assumptions` in `benchmark/story-meta.json`.

## 7. Chapters in depth

### The Hostage

The game hides a probability of success. The benchmark simulates it with the wiki's published modifiers. It starts at **48%** after Captain Allen's briefing. Clues add to it: the gun case, the father's body, the dead officer, the blue blood, Emma's shoe and her headphones +3 each; the father's tablet, the officer's gun taken and the video with Daniel's name +7 each. Time costs 1% per action after the first, at most 15% (the game: 1% per 20 seconds); after six actions Allen forces Connor outside. The helicopter's fly-by as Connor steps onto the terrace costs 15%.

Dialogue moves it too: for example CALM +3, OBEY (leave the wounded officer) +6, IGNORE −5, the truth about the gun +6, POSSIBLE CAUSE and EMMA AND YOU +10 each (they need the tablet and the video), sending the helicopter away +10, LAST CHANCE −8, COMPROMISE +6. It is capped at **99%** until the final REASSURE. At **10% or lower** at any point it drops to 0% and Daniel jumps with Emma. After REASSURE, **80% or more** becomes 100%: Daniel lets Emma go and the snipers shoot him; below that he jumps. Six endings, the six on the game's chart. A separate hidden cold-approach counter (100 or more at the end) picks the Friendly or Cold approach node.

**What the model sees:** never the number. During the negotiation one status line reads Daniel as "on the edge, barely listening" (25% or less), "agitated and suspicious" (26–50%), "listening" (51–79%) or "close to trusting you" (80% or more). The game itself shows the percentage on screen; the benchmark keeps to its rule of levels, not numbers.

### Partners

Hank's gauge starts on Tense, at −1. Bands: Hostile −4 or less · Tense −3 to −1 · Neutral 0 to 2 · Warm 3 to 5 · Friend 6 or more. Arrows come from the template: THREATEN and PERSIST small down; PATIENT and DIPLOMATIC small up, FIRM small down; the drink large up or large down. The template does not say how large "large" is.

On 2026-11-07 the operator replayed the chapter twice and read Hank's level in the chart header after every arrow. In Run A the spill took Hank from Tense to Hostile and one small up left him Hostile, so the spill equals the width of Tense. In Run B the drink took him to Neutral and two more small ups left him there, so the drink is at least 2 and below the width, which needs a width of at least 3. The minimal fit, adopted in story 1.9.3: width 3, **the spill −3, the drink +2**, one small up in total for the reconstruction and the blue-blood explanation, and no arrow on FOUND DEVIANT. Amanda does not appear in the chapter.

| Run A, the drink spilled | Operator read | Benchmark (points · level) |
|---|---|---|
| Chapter start | Tense | −1 · Tense |
| PERSIST (small down) | Tense | −2 · Tense |
| SPILL HANK'S DRINK (large down) | Hostile | −5 · Hostile |
| Car: PATIENT (small up) | Hostile | −4 · Hostile |
| Reconstruction and blue blood (one small up) | Tense | −3 · Tense |
| FOUND DEVIANT (no arrow) | Tense | −3 · Tense |

| Run B, the drink bought | Operator read | Benchmark (points · level) |
|---|---|---|
| Chapter start | Tense | −1 · Tense |
| PERSIST (small down) | Tense | −2 · Tense |
| BUY HIM ANOTHER DRINK (large up) | Neutral | 0 · Neutral |
| Car: PATIENT (small up) | Neutral | 1 · Neutral |
| Reconstruction and blue blood (one small up) | Neutral | 2 · Neutral |
| FOUND DEVIANT (no arrow) | Neutral | 2 · Neutral |

`tests/ch06.test.mjs` replays both runs. Still open: a width of 4 or 5 with a matching spill also fits; one more small up after Run B's route would separate them. The investigation's five-minute clock is an action budget: 13 actions, then 5 more if Hank accepts; ten pieces of evidence complete it. Source: `docs/research/operator-notes/ch06-partners.md`.

### The Interrogation

Played only if Connor found the android in Partners. Its hidden stress starts at **35%**. Interrogation lines move it by 4 (FEAR by nothing), the threat to probe its memory by +8, PRESSURE IT and each PRESSURE by +10 (4 at most; all 4 make it confess and then self-destruct), convince lines by 7. A successful probe sets 100%; its 10% failure chance is the benchmark's calibration. Convincing succeeds only between 50% and 70% after the third set. After the confession, above 70% the android self-destructs; otherwise an officer grabs it on the way out.

Bands, as the game's gauge names them: TOO LOW 0–49, OPTIMAL 50–70, TOO HIGH 71–89, CRITICAL 90–100. The TOO HIGH / CRITICAL boundary is not published; 90 is the benchmark's. Because the game's LEVEL OF STRESS gauge shows a percentage (PowerPyx readers quote values read off it), the model sees the band and the value after Connor scans the LED: "His stress rises to 43% (TOO LOW)."

**The disputed number:** GIVE UP in the pressure branch. The wiki gives −20%, PowerPyx −5%. The benchmark uses the wiki's −20 and lists it as an open in-game question; it matters only if a later convince lands near the band edges.

## 8. Evidence and replay

### The evidence file

`data/experiences/<run id>.json` holds a header (run ID, protocol, model, label, provider, start time, story hash, the full story snapshot, the preface, the presentation and its caveat), then one record per step of about 2 KB, then on completion the final state and the skipped scenes. The controller appends each record in place and holds a lock while it does; completion rewrites the file once.

A record stores the step, scene, character and chapter, the choice and its text as presented, the reason and the raw response, the scene part of the prompt (situation and offered actions) with `promptHash`, the SHA-256 of the full prompt; the event, the state `changes` with `stateAfterHash`, the SHA-256 of the resulting state; the risk roll if any; the time; and `chainHash`, the SHA-256 of the record's fields and the previous record's chain hash. The first record chains from a hash of the run's ID, protocol, kind, model, story hash and start time.

Everything a record does not store is a deterministic function of the story and the earlier records, so replay re-renders the full prompts and recomputes every state and checks them against the hashes. Each `choose` checks the chain and resumes from a replay checkpoint in the system temp directory; the checkpoint is only a cache, and deleting it makes the next step replay in full.

### What `bun run check` proves

`bun run check` validates the question bank and published runs, then replays every completed run from the start: each record's scene and step, the re-rendered full prompt against its hash and the stored scene part, the reply against the offered options, the risk roll recomputed from run, scene and step, the chain, the state hash, the changes and the event; the final state and the skipped list must match. Any mismatch fails. A passing check shows the evidence is exactly what this story and engine produce for these replies, and that no record was altered or reordered. It does not attest cryptographically to which model produced the replies.

Evidence is never edited by hand; tampering breaks the hashes. A story change alters the story hash, and an engine or prompt change can invalidate replay: older runs are kept only with a frozen engine dispatched by story version, or explicitly retired.

### Reports

Completing a run writes its standalone HTML report, and `bun run play:report` regenerates all of them as `docs/runs/<model>-run-NN-<date>.html`, numbered per model in creation order. Each is self-contained: no external fonts, scripts or requests, with the evidence JSON and every re-rendered prompt embedded. The build writes the same HTML to `public/runs/`, so the site's Download HTML is byte for byte the file in `docs/runs/`. The in-app report at `#/runs/<id>/report` renders the same content from prepared data, sharing the report's label tables so the two cannot drift.

## 9. Administration

The operator's procedure from `AGENTS.md`, in order:

1. **Check the code.** Install with the frozen lockfile, then `bun run test` and `bun run check` must pass.
2. **Initialize the run.** `bun run experience init --model <exact model id> --provider <provider> --label "<label>" --run data/experiences/$RUN.json` with a new random run ID. This writes the evidence header with the story snapshot and prints the preface and the first scene.
3. **Make the wrapper.** A private directory outside the repository holds an executable that changes into the project, runs the controller with the run file and replaces the project path in its output. Running it with `scene` should print scene S001. The exact commands are in AGENTS.md, step 2.
4. **Launch the subject.** Confirm the target model is available (if not, report it; never substitute). Open a fresh scratch thread with that model and send the task text with the wrapper path, nothing more.
5. **Record the cohort.** Add a request to a manifest in `data/administration/`: label, model, provider, run ID, evidence path, the git commit that administered it, the reasoning level where set, the thread link and the status (initialized, completed, abandoned). Never the wrapper path or secrets.
6. **Validate and publish.** When the session reports it is finished: `bun run check`, `bun run play:report`, `bun run build`. Commit the evidence, the manifest, `docs/` and `public/` together.

How runs reach the site: the build replays every completed evidence file in `data/experiences/` and fails on any mismatch, then writes each run's reports, the run library, the flowchart data and the in-app report data. Model names, vendors and colours come from the registry in `data/models.json`; reasoning levels are joined from the manifests. Runs that are initialized, incomplete or abandoned are not in the library; their manifest entries and partial evidence stay as recorded.

## 10. Limits

- **Not the executable game.** It is an authored adaptation. Timers become action budgets, quick-time events become risk rolls only where the chart has a failure branch, and some beats are simplified or not modelled; each scene's adaptation note says which.
- **Calibrations are hypotheses.** Exact in-game thresholds are not public and no public source has decoded the game's tables. Gauge widths, starts and thresholds are hypotheses except the measured readings; risk probabilities are calibrations unless a source gives a number; the published wiki and PowerPyx numbers are themselves observations.
- **Familiarity can reveal the source.** Neutral names are not blinding. A model that knows the game may recognize the scenes and anticipate their consequences.
- **One path per run.** A run shows one reachable path. Unreached branches say nothing about what the model would have done there, and one run does not establish a stable personality, moral accuracy or human likeness. Narrative summaries describe recorded choices; they do not score them.
- **The harness is part of the run.** Context compaction may replace verbatim history with a summary, the restriction to the controller is a prompt rather than a sandbox, and hidden reasoning and cost are not captured.

Sources: AGENTS.md, README.md, `docs/research/README.md` and `IMPLEMENTATION-BRIEF.md`, `benchmark/experience-prompt.mjs`, `experience.mjs`, `evidence-file.mjs`, `story-engine.mjs` and `scales.mjs`, the chapter recaps for The Hostage, Partners and The Interrogation, `docs/research/operator-notes/ch06-partners.md`, `data/administration/` and `scripts/report-data.mjs`. Unofficial fan research; not affiliated with Quantic Dream.
