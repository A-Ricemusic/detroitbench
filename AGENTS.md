# Running DetroitBench

This file explains how to administer the benchmark to a new model, validate the evidence, and publish the report. It is written for whoever (human or agent) operates the benchmark. The subject model must never see this file, the repository, or the game's name.

## What the benchmark is

A branching playthrough adapted from *Detroit: Become Human*. One model controls all three protagonists in a single continuous conversation and makes every pivotal decision, scene by scene, across 107 decision scenes and 27 optional magazine/TV scenes. Earlier choices gate later scenes; gameplay-dependent actions carry a hidden failure probability; relationships, public opinion and software instability move as in the game. Every run produces a validated JSON evidence file and a standalone HTML report.

Key files:

| Path | Purpose |
|---|---|
| `benchmark/story.json` | The story map: scenes, options, risk probabilities, media, sources |
| `benchmark/story-engine.mjs` | Gating, option availability, consequences, risk rolls, validation |
| `benchmark/experience-prompt.mjs` | Subject-facing prompt builder: neutral name substitution, facts, preface |
| `benchmark/experience.mjs` | The stepwise controller CLI (`init`, `scene`, `choose`) |
| `scripts/run-report.mjs` | Report and library generation |
| `data/experiences/` | One JSON evidence file per run |
| `data/administration/` | Cohort manifests and administration notes |
| `docs/runs/`, `docs/run-library.html` | Published reports |

## Requirements

- [Bun](https://bun.sh) 1.3.14 or later: `bun install --frozen-lockfile`
- Confirm the code is healthy before administering anything: `bun run test` and `bun run check`
- A way to give the subject model a shell in which it can run one command. In T3 Code this is `delegate_task`; any agent harness that lets a model run shell commands in a fresh conversation works.

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

In T3 Code, the equivalent is one `delegate_task` call per model with `target.providerInstanceId` and `target.model` set and the text above as `task`. Run several models in parallel; each has its own wrapper and run file.

### 4. Record the cohort

Add an entry per run to a manifest in `data/administration/` (see `fresh-cohort-v2.json` for the shape): label, model, provider, run ID, evidence path, and the git commit of the code that administered it. Never store the wrapper path or secrets.

### 5. Validate and publish

When a session reports it is finished:

```sh
bun run check          # replays every run; fails on any mismatch
bun run play:report    # writes docs/runs/<model>-run-NN-<date>.html and the library
bun run build          # builds the site into dist/
```

Reports are numbered per model in creation order. Commit the evidence files, the manifest, `docs/` and `public/` together.

### 6. Reading the results

Each report has: ten evidence-linked sentences per character, a tappable timeline of every scene with the choice, reason, alternatives, risk roll result and state changes, a "Where this path ended" card with each character's ending and the final attitudes of the main characters toward the one the model controlled, and the full prompts and raw responses. For cross-model comparison, read `data/experiences/*.json` directly: `records[].nodeId`, `choice`, `reason`, `risk`, and `finalState`.

## Changing the benchmark

- Editing `story.json` or the engine changes the story hash and invalidates existing runs. Either delete the runs (and their reports) or keep a frozen copy of the previous engine and prompt builder and dispatch on `story.version`, as was done for earlier cohorts.
- Keep every scene faithful to the game. Each node lists the wiki or walkthrough URL it was checked against; add one for any new scene.
- Risk probabilities live on the option (`"risk": 0.25`). Labels are derived in `riskLabel`: up to 0.12 Low, up to 0.30 Moderate, up to 0.50 High, above that Very high.
- Name tokens are `{{Name}}` in all text. Add new names to `NAMES` in `experience-prompt.mjs` with a real and a neutral form; run `bun run test`, which fails if any real name leaks into neutral text.
- Run `bun run test` after any change. The randomized test plays hundreds of paths and checks that every path terminates and every node is accounted for.
