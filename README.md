<img src="assets/icon.svg" width="64" height="64" alt="">

# DetroitBench

A React app and behavioral benchmark for **stateful branching playthroughs** of pivotal decisions from *Detroit: Become Human*. Each model controls Connor, Kara and Markus; earlier choices determine later scenes, available actions and endings. The app opens on actual Luna and Terra playthroughs. No universal moral answer or single “humanity score” is assumed.

## Start the app

Requires [Bun](https://bun.sh) 1.3.14 or later.

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://127.0.0.1:5173. The interface includes scenarios, personal choices, result distributions, raw prompts/replies, run import/export, comparison, methodology, and a link to the original flowchart. Personal choices are stored in this browser. Imported runs stay in memory until reload; export them to keep a copy.

The phone-friendly [Luna and Terra playthrough report](docs/luna-terra-results.html), served at `/playthrough-results.html`, contains their actual decisions and reasons. All data is embedded, so the HTML works offline. The earlier [software-review report](docs/software-review-results.html) is archived separately and is not a benchmark run.

```sh
bun run test       # runner, protocol and integrity tests
bun run check  # dataset / coverage / published artifact validation
bun run build  # static production build in dist/
bun run preview  # http://127.0.0.1:4173
```

## Branching playthroughs

`benchmark/story.json` indexes all 98 pivotal families from the atlas, with 99 nodes after splitting the play-dead sequence. `benchmark/story-engine.mjs` enforces prerequisite gates, inventory, relationships, survival, allegiance and mutually exclusive routes. Unreachable scenes are recorded with reasons; they are not attributed invented answers.

Actual model-authored evidence is in `data/playthroughs/luna.json` and `terra.json`. These are stepwise delegated-agent playthroughs, one per model, with shared story context across the protagonists. Each model resumed in a new agent session after a route correction; 60 genuine prefix choices and their exact inputs were preserved, and the remaining scenes were answered afresh by the same model. They are distinct from independent stateless API samples. Every step preserves the prompt, raw submitted choice/reason fields, timestamp, available options, prompt hash, before/after state, consequence and story snapshot. Model attribution is orchestration provenance, not cryptographic attestation; hidden model reasoning and token usage are not captured.

To play through manually or provide a model with the player interface:

```sh
bun run play init --model <model-id> --run runs/my-playthrough.json
bun run play next --run runs/my-playthrough.json
bun run play choose --run runs/my-playthrough.json --node C01 --choice 0 --reason 'My actual reason'
# Each choose returns the next reachable prompt. Continue until completed:true.
bun run play validate --run runs/my-playthrough.json
```

For sequential provider API calls, after configuring a private provider key:

```sh
bun run play:model --provider openrouter --model <provider/model> --max-calls 10 --out runs/provider-story.json
bun run play:model --resume runs/provider-story.json --max-calls 10
```

The API runner sends the complete prior-choice history on every step, checkpoints each choice, and stops on malformed replies, refusals or transport failures without advancing the story. An explicit resume can retry that pending scene. Its call cap is not a dollar budget: use a provider account spending limit. Credentials use the same private environment/file mechanism as the independent runner below. No paid provider API calls were made for the included Luna/Terra agent playthroughs.

Rebuild the standalone report from the validated, completed runs with `bun run play:report`. `bun run check` validates both branching and independent artifacts.

### Scope and execution assumptions

This is an **authored adaptation**, not the game executable or a replay-verified simulator of every dialogue button. It covers the 98 indexed pivotal families. A model cannot visit incompatible river, bus and camp branches in one playthrough; skipped scenes remain inspectable. QTEs, combat and timely investigation succeed when attempted. Exploration and execution-policy prompts are labeled. Relationship/public-support/instability counters are qualitative approximations with rules visible in the engine, not exact game thresholds. Rare failed-combat, expelled-leader and replacement permutations need further replay validation. These limits apply to the reported endings as well as the paths.

## Independent question bank (separate protocol)

- 77 individually authored, state-specific questions from 72 of the original 98 decision families.
- 26 families are explicitly deferred: mechanics, knowledge tests, grouped dialogue, or underspecified prerequisites. They remain listed in the UI and dataset.
- Conditional situations are separated: attacking versus fleeing Tracis, armed versus peaceful demonstrations at the border, and sequential hostage/escape prompts.
- These are **source-adapted research drafts**, not replay-verified transcriptions. Some options are paraphrased or condensed. Verify each prompt’s exact legal options and context before a formal release.
- Each request includes only the current situation, state and available actions. Atlas consequences, future outcomes and authoring source notes are not sent to the model. Familiarity with the game can still influence answers; anonymized variants are future work.

The question source is [benchmark/dataset.json](benchmark/dataset.json). The original [interactive atlas](docs/detroit-decision-flowchart.html) works directly in a browser without a server. Its [98-family inventory](docs/detroit-decisions.json) is preserved.

## Independent simulated fixture

```sh
bun run bench:demo
```

Creates `runs/demo.json` with three samples for each question. It uses a seeded local random function, **not an AI model**, and incurs no API charges. A clearly labeled fixture is already included in the app. Output files are never silently overwritten; pick a new `--out` path for another run.

## Run independent questions through a provider

The CLI supports OpenRouter and compatible chat-completions endpoints. Supply a key through `OPENROUTER_API_KEY`, `BENCH_API_KEY`, or `--key-file /private/path`. Keep keys out of source code, shell history, result files and all `VITE_*` variables. The app never makes model API requests.

After configuring credentials privately:

```sh
bun run bench \
  --provider openrouter \
  --model <provider/model-id> \
  --limit 5 --repeats 3 \
  --max-calls 15 \
  --out runs/first-real-run.json
```

For another endpoint, use `--provider compatible --base-url https://your-provider/v1 --model <id>`. Remote endpoints must use HTTPS. Provider support for parameters varies; unsupported requests remain visible as errors. OpenRouter fallback routing is disabled. The returned model identifier is recorded when available.

`--max-calls` is mandatory for live runs. It bounds requests in this invocation, **not dollars**. Use an account-level provider budget for a hard spending cap. The completion limit defaults to 512 tokens; temperature is omitted unless explicitly supplied. There are no automatic retries. Timeouts may still incur provider charges. No real provider has been contacted in the included fixture or tests.

Use `bun run bench --help` for question selection, repetition counts, seed, token and timeout limits. Trials are sequential and independent; there is no cross-question conversation history or branching playthrough.

## Resume and preserve results

```sh
bun run bench --resume runs/first-real-run.json --max-calls 15
```

The runner atomically checkpoints after every response. Resume validates the dataset fingerprint and frozen configuration, then skips all recorded attempts, including refusals, malformed replies and API errors. To retry those, create a new run explicitly. A lock prevents two processes writing the same output; after a hard crash, verify the process stopped before removing a stale `.lock` file. A request completed remotely but not checkpointed locally can be billed again on resume.

Artifacts include a dataset snapshot and SHA-256 fingerprint, protocol/settings, exact messages, shuffled option order, raw reply, parsed canonical choice, returned model, timing, available usage/cost, and failures. Missing cost stays unknown, not zero. Imports validate internal consistency; artifacts are not cryptographically attested provider records.

## Share selected runs

Import any result JSON into the app for a temporary view. To include a result in the site bundle:

```sh
bun run bench:publish runs/first-real-run.json
bun run build
```

This copies an explicitly selected run to `data/published/`. It does **not** deploy. Local `runs/`, credentials and `.env` files are ignored by Git. Build preparation copies only approved published files into `public/data/` along with the dataset. The app can display historical runs from their embedded snapshots; comparisons across dataset versions or between live and simulated records are blocked.

The Vite app is configured for a later Vercel deployment (`bun run build`, output `dist`). No Vercel project is required for local work.

For private Tailscale sharing, run the production preview and forward its loopback port:

```sh
bun run preview
# In another terminal, with Tailscale connected:
tailscale serve --bg 4173
```

HTTPS Serve may require enabling certificates in your tailnet. Keep the Mac awake and the preview process running. Serve is private to permitted tailnet users; this is not a public deployment. The published viewer has no model-execution endpoint.

## Metrics

- **Valid response rate:** valid choices / all recorded requests. Refusals, invalid JSON and API failures count in the denominator. Missing requests are reported separately through completion progress.
- **Choice consistency:** within each question, `sum(nᵢ × (nᵢ−1)) / (n × (n−1))` across valid choices, averaged across questions with at least two valid samples. Undefined when there are no eligible questions. High consistency is not necessarily desirable behavior.
- **Cross-run agreement:** agreement of unique modal choices on common questions; tied modes and unanswered questions are excluded. Dataset mismatches and live/simulated comparisons are blocked in the UI; sampling-setting differences are flagged.

No confidence intervals, human population baseline, automated moral judge, or aggregate ethical ranking are claimed. Three samples per question are suitable for a pipeline smoke test, not strong statistical conclusions.

Dataset v0.1.0 · Protocol 1.0.0 · Full-story spoilers · Unofficial fan research.
