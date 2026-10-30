<img src="assets/icon.svg" width="64" height="64" alt="">

# DetroitBench

A local React app and reproducible behavioral benchmark built around decisions from *Detroit: Become Human*. Explore what models choose, inspect their explanations, and compare repeated runs. No universal moral answer or single “humanity score” is assumed.

## Start the app

Requires [Bun](https://bun.sh) 1.3.14 or later.

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://127.0.0.1:5173. The interface includes scenarios, personal choices, result distributions, raw prompts/replies, run import/export, comparison, methodology, and a link to the original flowchart. Personal choices are stored in this browser. Imported runs stay in memory until reload; export them to keep a copy.

```sh
bun run test       # runner, protocol and integrity tests
bun run check  # dataset / coverage / published artifact validation
bun run build  # static production build in dist/
bun run preview  # http://127.0.0.1:4173
```

## Current dataset

- 77 individually authored, state-specific questions from 72 of the original 98 decision families.
- 26 families are explicitly deferred: mechanics, knowledge tests, grouped dialogue, or underspecified prerequisites. They remain listed in the UI and dataset.
- Conditional situations are separated: attacking versus fleeing Tracis, armed versus peaceful demonstrations at the border, and sequential hostage/escape prompts.
- These are **source-adapted research drafts**, not replay-verified transcriptions. Some options are paraphrased or condensed. Verify each prompt’s exact legal options and context before a formal release.
- Each request includes only the current situation, state and available actions. Atlas consequences, future outcomes and authoring source notes are not sent to the model. Familiarity with the game can still influence answers; anonymized variants are future work.

The question source is [benchmark/dataset.json](benchmark/dataset.json). The original [interactive atlas](docs/detroit-decision-flowchart.html) works directly in a browser without a server. Its [98-family inventory](docs/detroit-decisions.json) is preserved.

## Run a simulation

```sh
bun run bench:demo
```

Creates `runs/demo.json` with three samples for each question. It uses a seeded local random function, **not an AI model**, and incurs no API charges. A clearly labeled fixture is already included in the app. Output files are never silently overwritten; pick a new `--out` path for another run.

## Run a real model later

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
