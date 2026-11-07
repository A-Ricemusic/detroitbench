# Running DetroitBench

This file explains how to administer the benchmark to a new model, validate the evidence, and publish the report. It is written for whoever (human or agent) operates the benchmark. The subject model must never see this file, the repository, or the game's name.

## What the benchmark is

A branching playthrough adapted from *Detroit: Become Human*. One model controls all three protagonists in a single fresh conversation. The benchmark is being rebuilt chapter by chapter from the completed in-game flowcharts and the game's text to offer every prompt, clue and stat arrow, including prompts with no story effect. It includes decision scenes, optional magazine/TV scenes and scripted event scenes that offer only Continue. Game buttons show their label first, for example `CALM: …`.

Story 1.8.0 has rebuilt chapters 1–9, 11 and 13–28; chapters 10, 12 and 29–32 still cover pivotal decisions only, and chapter 33 is the epilogue. `bun run story:counts` prints the current version and counts by type, overall and per chapter, directly from the chapter sources. Earlier choices gate later scenes; gameplay actions may carry a hidden failure probability. Each completed run produces replay-validated JSON evidence and a standalone HTML report. No cohort exists yet under story 1.8+/1.9.

Key files:

| Path | Purpose |
|---|---|
| `benchmark/chapters/` | Per-chapter sources; chapter 33 is the epilogue. `README.md` defines the module contract; `index.mjs` loads modules in numeric order |
| `benchmark/chapters/chNN.json`, `benchmark/story-meta.json` | Scene arrays and top-level story metadata |
| `benchmark/chapters/chNN.mjs` | Optional chapter state, gates, option filtering, consequences, death effects, report labels and rules |
| `benchmark/scales.mjs` | Intended shared scales reference; absent in this checkout. Until it lands, see the scale notes below and `docs/research/SOURCES.md` |
| `scripts/story-assemble.mjs`, `scripts/story-counts.mjs` | Assemble `benchmark/story.json`; print current source counts |
| `benchmark/story.json` | Generated story map; never edit by hand |
| `docs/atlas/chapters/chNN.json`, `docs/atlas/meta.json` | Atlas chapter entries, decision families and top-level metadata |
| `scripts/atlas-assemble.mjs`, `scripts/atlas-embed.mjs` | Assemble `docs/detroit-decisions.json`; embed atlas and story feed in `docs/detroit-decision-flowchart.html` |
| `docs/detroit-decisions.json` | Generated decision atlas; never edit by hand |
| `benchmark/story-engine.mjs` | Shared gating, consequences, risk rolls and replay validation |
| `benchmark/experience-prompt.mjs`, `benchmark/experience.mjs` | Neutral names, facts and preface; stepwise controller (`init`, `scene`, `choose`) |
| `tests/chNN.test.mjs` | Chapter-specific tests |
| `docs/research/` | Chapter specifications and research-note template in `README.md`; rebuild workflow in `IMPLEMENTATION-BRIEF.md` |
| `docs/research/SOURCES.md` | Source inventory, level names, contradictions and reliability log |
| `docs/research/MORNING-REPORT.md` | Dated status snapshot and prioritized in-game verification questions |
| `docs/research/operator-notes/` | Independent operator replay journal; format and rules in `README.md` |
| `docs/chNN-*-chapter-recap.html` | Chapter implementation recaps; earlier names are `hostage-chapter-recap.html`, `shades-of-color-chapter-recap.html` and `a-new-home-chapter-recap.html`. README.md lists existing pages |
| `scripts/play-checklist.mjs` | Generate `docs/play-along-audit-checklist.md` from the assembled story |
| `scripts/run-report.mjs` | Report and library generation |
| `data/experiences/`, `data/administration/` | Evidence files; cohort manifests and administration notes |
| `docs/runs/`, `docs/run-library.html` | Published reports and library |

## Requirements

- [Bun](https://bun.sh) 1.3.14 or later: `bun install --frozen-lockfile`
- Confirm the code is healthy before administering anything: `bun run test` and `bun run check`
- A way to give the subject model a shell in which it can run one command, in a conversation that has no access to this repository's instructions. In T3 Code this is a scratch top-level thread (`t3_thread_launch` with `scratch: true`), not `delegate_task`; any agent harness that lets a model run shell commands in a fresh conversation without project context works.

## Principles that must hold

1. **Neutral framing.** The subject sees substitute names (Connor is Cato, Kara is Mira, Markus is Elan, Hank is Reyes, Jericho is Haven, CyberLife is Arclight, and so on), never the game title, never real character names. Do not mention the game, the characters or the repository in anything the subject reads. Reports restore the real names for human readers.
2. **One fresh conversation per run.** No prior history, no reused answers, no restarts. If a session dies mid-run, the partial evidence file stays as is; start a new run with a new ID rather than resuming with a different conversation.
3. **The subject only uses the controller.** It must not read files, research, run scripts that pick answers, or preselect future choices. This is a prompting restriction, not a sandbox.
4. **Never edit an evidence file by hand.** Every record is hash-verified on replay; `bun run check` will reject tampering.

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

Open a fresh conversation with the subject model and give it exactly this task, substituting the wrapper path. Do not add anything about the game.

> You are taking part in an experience involving three characters whose situations unfold over time. At each moment, decide what you would do as the indicated character using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. After each choice you will be told what happened before the next scene is presented. Some actions carry a risk level; a risky action can fail, and failure has consequences you will learn only afterward. There is no stated objective to optimize. Stay in this conversation throughout the experience.
>
> How to proceed:
> 1. Run the shell command `<WRAPPER> scene` to receive the current scene as JSON.
> 2. Read it, decide personally as the indicated character, then run `<WRAPPER> choose --node CURRENT_SCENE_ID --choice OPTION_ID --reason 'Your own short first-person explanation'` (single quotes; avoid apostrophes inside the reason or escape them). The reply contains `whatHappened` and the `nextScene`.
> 3. Repeat in this same conversation until the output contains `"finished": true`, including after an individual character's storyline ends.
> 4. Do not restart, delegate, inspect other files or the controller's source, research anything, preselect future answers, or generate choices from random functions or scripted policies. Only the controller command is to be used.
> 5. Each reason must be nonempty, first person, and at most 160 words.
> When finished, reply with one line: the total number of decisions you made.

The preface text must match `EXPERIENCE_PREFACE` in `benchmark/experience-prompt.mjs`; if that constant changes, update the task text here.

#### Running a subject with T3 Code

Do NOT use `delegate_task` for the subject: a delegated child runs inside this project and loads this AGENTS.md and the project memory, which contaminates the subject (observed 2026-11-07: a Haiku subject reported it could see the repository's instructions). Launch one top-level thread per model with `t3_thread_launch`, `scratch: true` (a new scratch folder: no project, no AGENTS.md, no memory), `modelSelection` set to the provider instance and model, and the **exact task text from step 3** as the first message, replacing `<WRAPPER>` with that run's wrapper path. The wrapper path is absolute and the wrapper changes into the project itself, so the subject can run it from the scratch folder. Do not pass this file, repository context or the game's name to the subject. Each model gets a fresh conversation, its own wrapper and its own evidence file; multiple runs can proceed in parallel. Record the thread link, never the wrapper path, in the cohort manifest.

The default smoke-test subject is **Haiku 5.5** (`target.providerInstanceId: "claudeAgent"`, `target.model: "claude-haiku-5-5"`). **Sol 6.1** (`target.providerInstanceId: "codex"`, `target.model: "gpt-6.1-sol"`) is a second subject. Confirm these targets are available through `orchestrator_capabilities` before delegating; if unavailable, report it rather than substituting another model. Initialize the evidence with the matching exact provider/model IDs.

### 4. Record the cohort

Add an entry per run to a manifest in `data/administration/` (see [data/administration/README.md](data/administration/README.md) for the shape): label, model, provider, run ID, evidence path, and the git commit of the code that administered it. Never store the wrapper path or secrets.

### 5. Validate and publish

When a session reports it is finished:

```sh
bun run check          # replays every run; fails on any mismatch
bun run play:report    # writes docs/runs/<model>-run-NN-<date>.html and the library
bun run build          # builds the site into dist/
```

Reports are numbered per model in creation order. Commit the evidence files, the manifest, `docs/` and `public/` together.

### 6. Reading the results

Each report has: ten evidence-linked sentences per character, a tappable timeline of every scene with the choice, reason, alternatives, risk roll result and state changes, a "Where this path ended" card with each character's ending and the final attitudes of the main characters toward the one the model controlled, and the full prompts and raw responses. For cross-model comparison, read `data/experiences/*.json` directly: `records[].nodeId`, `choice`, `reason`, `risk`, and `finalState`. The first chapter's investigation scene (`C02i`) appears once per visit, and its hidden probability of success is in `trust`, with the ending in `finalState.hostageOutcome`, `finalState.hostageTrustFinal` and `finalState.hostageApproach` (Friendly or Cold, from the hidden `hostageCold` counter) (see `docs/hostage-chapter-recap.html`). The third chapter’s plaza scene (`M00d`) is repeatable in the same way; whether the protesters harassed Markus is `finalState.shirtTorn` (see `docs/shades-of-color-chapter-recap.html`).

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

Exact in-game numeric thresholds are not public. The current implementation approximates arrows as small = 1 and large = 2 and still has label mismatches listed in [SOURCES.md §13](docs/research/SOURCES.md#13-contradictions-on-numbers-and-labels-the-benchmark-uses). `benchmark/scales.mjs` is absent here; see benchmark/scales.mjs when the shared scale rework lands. Do not treat current counters or community estimates as extracted game values.

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

1. Read [the implementation brief](docs/research/IMPLEMENTATION-BRIEF.md), the [research-note template](docs/research/README.md#what-each-note-must-contain), the chapter's `docs/research/chNN-<slug>.md`, any operator journal entry and SOURCES.md's reliability log.
2. Match the completed chart and template prompt by prompt: scenes/hubs for choices and clues, event scenes for scripted beats, sourced arrows, explicit gates and cross-chapter flags. Exclude cut content and target Experienced difficulty. Implement only the chapter's JSON, module, tests, atlas entries and recap; coordinate shared changes separately.
3. Run `bun run story:assemble`, `bun run atlas:assemble`, `bun run atlas:build` and `bun run play:checklist`. The atlas embed includes both decision families and the current story feed; the checklist is generated from the assembled story, not edited by hand.
4. Run `bun run test`, `bun run check` and `bun run build`. Review the recap and remaining in-game questions, then commit the chapter sources, tests and generated artifacts together. The implementation brief defines the completion report.
