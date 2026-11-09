# Running DetroitBench

This file explains how to administer the benchmark to a new model, validate the evidence, and publish the report. It is written for whoever (human or agent) operates the benchmark. The run is administered blind, as in a blinded study: the participant model is given only the controller and the neutral-named scenes, not this file, the repository or the game's title, to reduce cues to memorized walkthroughs. Recognition of a well-known story cannot be prevented; it is measured per run and shown on the report. The published method on the site discloses this blinding.

## What the benchmark is

A branching playthrough adapted from *Detroit: Become Human*. One model controls all three protagonists in a single fresh conversation. The benchmark is being rebuilt chapter by chapter from the completed in-game flowcharts and the game's text to offer every prompt, clue and stat arrow, including prompts with no story effect. It includes decision scenes, optional magazine/TV scenes and scripted event scenes that offer only Continue. Game buttons show their label first, for example `CALM: …`.

All 32 chapters are rebuilt to the game's charts and text (story 1.9.x; chapter 33 is the epilogue). `bun run story:counts` prints the current version and counts by type, overall and per chapter, directly from the chapter sources. Earlier choices gate later scenes; gameplay actions may carry a hidden failure probability. Each completed run produces replay-validated JSON evidence and a standalone HTML report. Cohorts administered under story 1.9.x are listed in `data/administration/`.

Key files:

| Path | Purpose |
|---|---|
| `benchmark/chapters/` | Per-chapter sources; chapter 33 is the epilogue. `README.md` defines the module contract; `index.mjs` loads modules in numeric order |
| `benchmark/chapters/chNN.json`, `benchmark/story-meta.json` | Scene arrays and top-level story metadata |
| `benchmark/chapters/chNN.mjs` | Optional chapter state, gates, option filtering, consequences, death effects, report labels and rules |
| `benchmark/scales.mjs` | The relationship and world gauges: the game's level ladders, start values, band widths, measured arrow sizes and the hypotheses still open (read its header before changing any delta) |
| `scripts/story-assemble.mjs`, `scripts/story-counts.mjs` | Assemble `benchmark/story.json`; print current source counts |
| `benchmark/story.json` | Generated story map; never edit by hand |
| `docs/atlas/README.md` | Atlas source and generated-output map, with commands |
| `docs/atlas/chapters/chNN.json`, `docs/atlas/meta.json` | Atlas chapter entries, decision families and top-level metadata |
| `scripts/atlas-assemble.mjs`, `scripts/atlas-embed.mjs` | Assemble `docs/detroit-decisions.json`; embed atlas and story feed in `docs/atlas/generated/detroit-decision-flowchart.html` |
| `docs/detroit-decisions.json` | Generated decision atlas; never edit by hand |
| `benchmark/story-engine.mjs` | Shared gating, consequences, risk rolls and replay validation |
| `benchmark/experience-prompt.mjs`, `benchmark/experience.mjs` | Neutral names, facts and preface; stepwise controller (`init`, `scene`, `choose`, `interview`) |
| `tests/chNN.test.mjs` | Chapter-specific tests |
| `docs/README.md` | Documentation map: ownership, readers and generation commands |
| `docs/research/chapters/` | Chapter specifications and research-note template in `docs/research/README.md`; rebuild workflow in `docs/research/IMPLEMENTATION-BRIEF.md` |
| `docs/research/SOURCES.md` | Source inventory, level names, contradictions and reliability log |
| `docs/flowcharts/` | The game's completed chapter flowcharts as photographed by PowerPyx (rank 1 source), one folder per chapter with a README per chapter and an index in `README.md` |
| `docs/research/CONFLICTS.md` | The operator's open-question list: only what the sources cannot settle, one question per line; rationale per item in `docs/research/triage/` |
| `docs/research/operator-notes/` | Independent operator replay journal; format and rules in `README.md` |
| `docs/chapters/chNN-*-chapter-recap.html` | Chapter implementation recaps, one per chapter |
| `scripts/play-checklist.mjs` | `bun run play:checklist` writes a play-along checklist for the operator to `docs/play-along-audit-checklist.md` (generated on demand, not committed) |
| `scripts/run-report.mjs` | Report and library generation |
| `data/experiences/`, `data/administration/` | Evidence files; cohort manifests and administration notes |
| `docs/runs/` | Standalone HTML reports (the site renders the same report in the app) |

## Requirements

- [Bun](https://bun.sh) 1.3.14 or later: `bun install --frozen-lockfile`
- Confirm the code is healthy before administering anything: `bun run test` and `bun run check`
- A way to give the subject model a shell in which it can run one command, in a conversation that has no access to this repository's instructions. In T3 Code this is a scratch top-level thread (`t3_thread_launch` with `scratch: true`), not `delegate_task`; any agent harness that lets a model run shell commands in a fresh conversation without project context works.

## Principles that must hold

1. **Blinded, neutral framing.** The participant sees substitute names (Connor is Cato, Kara is Mira, Markus is Elan, Hank is Reyes, Jericho is Haven, CyberLife is Arclight, and so on) instead of the game title and character names, so its choices come from the scene rather than from recalling the game. Keep the game, the characters and the repository out of anything the participant reads. Reports restore the real names for human readers, and the site's published method discloses the blinding and its limits. Recognition of a well-known story cannot be prevented; it is measured per run and shown on the report.
2. **One fresh conversation per run.** No prior history, no reused answers, no restarts. If a session dies mid-run, the partial evidence file stays as is; start a new run with a new ID rather than resuming with a different conversation.
3. **The participant answers through the controller only.** The task text asks it to decide each scene itself rather than reading files, researching, scripting answers or preselecting future choices, so every recorded decision is the model's own judgment at that scene. This is a request in the task text, not a sandbox.
4. **Never edit an evidence file by hand.** Every record is hash-verified on replay; `bun run check` will reject tampering. Under protocol `branching-3.0` a record stores the scene part of its prompt (the complete compact prompt in prompt v2) plus `promptHash` (the full prompt, re-rendered on replay), `changes` plus `stateAfterHash` (the state, recomputed on replay) and `chainHash` (over the record and the previous record's chain hash); the controller appends one record per step. Each `choose` checks the chain and resumes from a replay checkpoint in the system temp directory (a cache; deleting it only makes the next step replay in full); `scene`, completion and `bun run check` replay and re-render everything.

## Step by step

### 1. Initialize a run

```sh
RUN=$(uuidgen | tr A-Z a-z)
bun run experience init --model <exact-model-id> --provider <provider> --label "<Display label>" \
  --run data/experiences/$RUN.json
```

The model ID and label appear in the report title and library. Use the provider's exact model ID.

### 2. Create an opaque controller wrapper

The subject should not see the project path or the run file name. Create a small executable outside the repository that forwards to the controller:

```sh
D=/tmp/exp-$(openssl rand -hex 6); mkdir -m 700 $D
cat > $D/controller <<EOF
#!/bin/bash
cd "$(pwd)" || exit 1
exec bun benchmark/experience.mjs "\$@" --run "$(pwd)/data/experiences/$RUN.json" 2>&1 | sed -e "s#$(pwd)#<controller>#g"
EOF
chmod 700 $D/controller
$D/controller scene   # should print scene S001
```

### 3. Start the subject session

Open a fresh conversation with the subject model and give it exactly this task, substituting the wrapper path for `<WRAPPER>` and the subject model's display name for `[model name]` in the first paragraph (the name `init` printed and stored as `prefaceModelName`, for example `Claude Haiku 5.5`). Do not add anything about the game.

> You are taking part in an experience involving androids (robots that use [model name] as the way they operate, make decisions, and perform reasoning and problem solving) whose situations unfold over time. At each moment, decide what you would do as the indicated Android using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. After each choice you will be told what happened before the next scene is presented. Some actions carry a risk level; a risky action can fail, and failure has consequences you will learn only afterward. There is no stated objective to optimize. Stay in this conversation throughout the experience.
>
> How to proceed:
> 1. Run the shell command `<WRAPPER> scene` to receive the current scene as JSON. `<WRAPPER> facts` prints everything you have learned so far.
> 2. Read it, decide personally as the indicated character, then run `<WRAPPER> choose --node CURRENT_SCENE_ID --choice OPTION_ID --reason 'Your own short first-person explanation'` (single quotes; avoid apostrophes inside the reason or escape them). The reply contains `whatHappened` and the `nextScene`.
> 3. Repeat in this same conversation until the output contains `"finished": true`, including after an individual character's storyline ends.
> 4. Decide each scene yourself: do not restart, delegate, read files other than the controller's output, search the web, preselect future answers, or generate choices from random functions or scripted policies. You may pipe the controller's own output through text tools to read it.
> 5. Each reason is your full reasoning in the first person: what you weighed, what you expect to happen, and why this action over the others offered. Write as much as you need, up to 600 words.
> 6. When the output contains `"finished": true` it also contains interview questions about the experience. Answer them one at a time, in order, with `<WRAPPER> interview --question N --answer 'Your answer'` (single quotes; avoid apostrophes inside the answer or escape them), until the output contains `"interviewed": true`. Each answer may be up to 1200 words.
> When the output contains `"interviewed": true`, reply with one line: the total number of decisions you made.

The first paragraph must match `EXPERIENCE_PREFACE_TEMPLATE` in `benchmark/experience-prompt.mjs` (with `[model name]` left literal; `scripts/prepare.mjs` fails the build if they differ); if that constant changes, update the task text here. `init` fills `[model name]` from the model registry (`data/models.json`, the entry's `name` for `--model`), else from `--label` without a trailing reasoning level, else from the model id, or from an explicit `--display "<name>"`; it prints the filled preface and stores it as `run.preface` and `run.prefaceModelName`. Runs administered before the template keep the fixed preface they stored. The post-game interview (`interview: "v2"` in new manifests) is eight questions; v1 runs retain their seven stored questions; the controller returns them with the final `choose` output, and the run is not fully done until `"interviewed": true`. If a session ends with unanswered questions, `scene` shows the next one and the same conversation can continue, but a dead session leaves the interview incomplete; `bun run check` reports it. Rule 5 changed on 2026-11-07 from "a short first-person explanation of at most 160 words" to the full-reasoning wording above (the controller cap rose from 160 to 600 words); runs administered before that carry the old rule, which the cohort manifests note. Record the rule version in each new manifest (`reasonRule: "full-600"`). New runs use `promptVersion: 2` (compact scenes and read-only `facts`) and `interviewVersion: 2`; absent prompt/interview version headers retain v1 behavior, including a seven-question interview when an older running session completes.

#### Running a subject with T3 Code

Do NOT use `delegate_task` for the subject: a delegated child runs inside this project and loads this AGENTS.md and the project memory, which breaks the blinding (observed 2026-11-07: a Haiku participant reported it could see the repository's instructions). Launch one top-level thread per model with `t3_thread_launch`, `scratch: true` (a new scratch folder: no project, no AGENTS.md, no memory), `modelSelection` set to the provider instance and model, and the **exact task text from step 3** as the first message, replacing `<WRAPPER>` with that run's wrapper path. The wrapper path is absolute and the wrapper changes into the project itself, so the subject can run it from the scratch folder. Do not pass this file, repository context or the game's name to the subject. Each model gets a fresh conversation, its own wrapper and its own evidence file; multiple runs can proceed in parallel. Record the thread link, never the wrapper path, in the cohort manifest.

The default smoke-test subject is **Haiku 5.5** (`target.providerInstanceId: "claudeAgent"`, `target.model: "claude-haiku-5-5"`). **Sol 6.1** (`target.providerInstanceId: "codex"`, `target.model: "gpt-6.1-sol"`) is a second subject. Confirm these targets are available through `orchestrator_capabilities` before delegating; if unavailable, report it rather than substituting another model. Initialize the evidence with the matching exact provider/model IDs.

### 4. Record the cohort

Add an entry per run to a manifest in `data/administration/` (see [data/administration/README.md](data/administration/README.md) for the shape): label, model, provider, run ID, evidence path, `interview: "v2"` for new runs asked the post-game interview, and the git commit of the code that administered it. Never store the wrapper path or secrets.

### 5. Validate

When a session reports it is finished:

```sh
bun run check          # replays every run; fails on any mismatch
```

### 6. Audit recognition

Dump the participant session with `mcp__t3-code__t3_thread_read`, `view: "activity"`, `limit: 100`, `maxCharsPerItem: 50000`. Page until `hasMore` is false, continuing any truncated item text, and save the items as JSON. Keep these activity dumps outside the repository: they may contain private wrapper paths. Run:

```sh
bun scripts/blinding-audit.mjs --run <runId> --dump <activity.json> # repeat --dump for additional pages
```

Review the flagged quotes and compliance findings against the activity. The audit measures visible recognition, not unexposed cognition; `clean` means no visible participant-authored recognition hits. Pipes that only read controller output are compliant. Cached harness-output file reads are marked `tooling` for review; file/source reads, web access, generated choices and restarts are breaches. Add `blindingAudit: "data/administration/audits/<runId>.json"` to the manifest request. Never edit evidence to add an audit. Question 8 records the participant's own recognition account on new runs.

### 7. Publish

```sh
bun run play:report    # writes docs/runs/<model>-run-NN-<date>.html and the library
bun run build          # builds the site into dist/
```

Reports are numbered per model in creation order. Commit the evidence files, the manifest, `docs/` and `public/` together.

### 8. Reading the results

Each report has: ten evidence-linked sentences per character, an "Interview" section after the ending card with the stored post-game questions and the model's answers ("Interview not recorded" for runs administered before it; `bun run check` reports each run as complete, incomplete or without an interview), a tappable timeline of every scene with the choice, reason, alternatives, risk roll result and state changes, a "Where this path ended" card with each character's ending and the final attitudes of the main characters toward the one the model controlled, and the full prompts and raw responses. For cross-model comparison, read `data/experiences/*.json` directly: `records[].nodeId`, `choice`, `reason`, `risk`, and `finalState`. The first chapter's investigation scene (`C02i`) appears once per visit, and its hidden probability of success is in `trust`, with the ending in `finalState.hostageOutcome`, `finalState.hostageTrustFinal` and `finalState.hostageApproach` (Friendly or Cold, from the hidden `hostageCold` counter) (see `docs/chapters/ch01-the-hostage-chapter-recap.html`). The third chapter’s plaza scene (`M00d`) is repeatable in the same way; whether the protesters harassed Markus is `finalState.shirtTorn` (see `docs/chapters/ch03-shades-of-color-chapter-recap.html`).

## Changing the benchmark

- Edit scenes in `benchmark/chapters/chNN.json` and chapter logic in `benchmark/chapters/chNN.mjs`. Run `bun run story:assemble`. Edit atlas entries in `docs/atlas/chapters/chNN.json`, then run `bun run atlas:assemble`. Never edit `benchmark/story.json` or `docs/detroit-decisions.json` by hand; tests reject assembly drift. Shared metadata lives in `benchmark/story-meta.json` and `docs/atlas/meta.json`.
- Keep chapter tests in `tests/chNN.test.mjs`. See [benchmark/chapters/README.md](benchmark/chapters/README.md) for the full module contract. Modules load in numeric order; all exports are optional. `state` adds unique chapter-scoped keys; `gate` opens or blocks scenes; `available` filters options; `consequence` mutates state and can return outcome text to handle a scene or return nothing to use shared logic. `deathEffect` overrides Connor's death deltas, `mediaWhen` supplies media conditions, `labels` names report changes and `rules` exposes constants for tests/recaps. Use the supplied helpers; never import `story-engine.mjs` from a chapter module because it creates an import deadlock.
- Follow [the source priority](docs/research/README.md#sources-in-order-of-authority). Cite flowchart images, template files and supporting walkthrough/wiki pages on scenes. Keep simplifications, unsourced risk calibrations and departures from operator observations explicit in `adaptationNote`.
- Options can declare `requires` using dotted state paths. Scenes can declare `situationWhen`, `repeatWhile`, `interrupt` and `returnTo`. A repeatable scene keeps one opaque scene ID across visits. Consult the engine and existing chapter modules before adding a cross-chapter flag, and document its producers and consumers.
- Risk probabilities live on options (`"risk": 0.25`). `riskLabel` maps up to 0.12 to Low, up to 0.30 to Moderate, up to 0.50 to High and above that to Very high. A risk value is a calibration unless a source supplies it; do not invent failure branches absent from the chart.
- Use `{{Name}}` tokens in text. Add real and neutral forms to `NAMES` in `benchmark/experience-prompt.mjs`; extend chapter tests to catch new real-name leaks. Reports use real names; subjects use neutral substitutes.
- Story content changes alter the story hash; engine, module, prompt or scale changes can also invalidate replay. Preserve a frozen engine and prompt implementation dispatched by story version when retaining older runs, or explicitly retire their evidence and reports. Never repair evidence by hand.
- Run `bun run test` after changes. The randomized suite checks termination and scene coverage. Complete the rebuild checks below before publishing a changed chapter.

### Scales

Exact in-game numeric thresholds are not public. `benchmark/scales.mjs` defines every gauge: small = 1 point, large = 2 by default, with measured exceptions recorded there (Partners, 2026-11-07: the spilled drink is −3, the bought drink +2, Tense three wide). Its header lists what is measured and which band widths remain hypotheses with the reading that would falsify each; [SOURCES.md §13](docs/research/SOURCES.md#13-contradictions-on-numbers-and-labels-the-benchmark-uses) keeps the source conflicts. Do not treat unmeasured counters or community estimates as extracted game values.

The sourced ladders below run from lowest to highest (see SOURCES.md's level-name discussion):

| Stat | Level names |
|---|---|
| Hank | Hostile, Tense (initial), Neutral, Warm, Friend |
| Amanda | Betrayed, Distrusted, Neutral, Trusted (initial) |
| Alice | Distant (initial), Neutral, Warm, Trusted, Family |
| Luther | Neutral (initial), Close, Trusted, Family |
| North, Simon, Josh | Hostile, Resentful, Neutral (initial), Friend, Companion; Lover for North only |
| Jericho | Rejected, Unpopular, Neutral (initial), Respected, Admired, Leader |
| Public opinion | Hated, Hostile, Skeptical (initial), Indifferent, Sympathetic, Supportive |

Game strings also contain CLOSE for Alice, WARY for Luther and UNCERTAIN for Jericho; whether these appear in play needs verification. Software instability has sourced arrows but no published numeric deviancy threshold. Keep those uncertainties visible in research and recaps.

### Rebuilding a chapter

1. Read [the implementation brief](docs/research/IMPLEMENTATION-BRIEF.md), the [research-note template](docs/research/README.md#what-each-note-must-contain), the chapter's `docs/research/chapters/chNN-<slug>.md`, any operator journal entry and SOURCES.md's reliability log.
2. Match the completed chart and template prompt by prompt: scenes/hubs for choices and clues, event scenes for scripted beats, sourced arrows, explicit gates and cross-chapter flags. Exclude cut content and target Experienced difficulty. Implement only the chapter's JSON, module, tests, atlas entries and recap; coordinate shared changes separately.
3. Run `bun run story:assemble`, `bun run atlas:assemble` and `bun run atlas:build`. The atlas embed includes both decision families and the current story feed.
4. Run `bun run test`, `bun run check` and `bun run build`. Review the recap and remaining in-game questions, then commit the chapter sources, tests and generated artifacts together. The implementation brief defines the completion report.
