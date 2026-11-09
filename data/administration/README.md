# Administration records

One manifest per cohort lives here. A manifest records what was requested and what the harness returned, never wrapper paths or secrets.

Shape of a manifest (`<cohort-name>.json`):

```json
{
  "protocol": "branching-3.0",
  "storyVersion": "<story.json version>",
  "freshStart": true,
  "createdAt": "YYYY-MM-DD",
  "implementationCommit": "<git commit that administered the runs>",
  "note": "<why this cohort exists>",
  "requests": [
    {
      "label": "<display label>",
      "model": "<exact provider model id>",
      "provider": "codex | claudeAgent",
      "runId": "<run id>",
      "artifact": "data/experiences/<run id>.json",
      "status": "initialized | completed | abandoned",
      "interview": "v2",
      "reasonRule": "full-600",
      "blindingAudit": "data/administration/audits/<run id>.json",
      "initialDecisions": 0
    }
  ]
}
```

`interview` is `"v2"` for new eight-question interviews, including the recognition self-report; `"v1"` denotes the older seven-question interview (omit it for runs administered before it). The run's `interview` object holds the questions and the hash-chained answers; a run whose interview is incomplete is still listed, and `bun run check` reports it.

Rules: one fresh conversation per run, no reused answers, no restarts. A run that dies mid-session keeps its partial evidence file and is marked `abandoned`; start a new run with a new ID rather than resuming.

No cohort has been administered under the current story version. All runs made under story versions 0.2.1 through 1.1.3 were discarded on 2026-11-06 ahead of a full rewrite of the scene set. Git history was not rewritten.

## Model registry (`data/models.json`)

The site's model sidebar (search, Frontier / Notable / Other groups, Small / Medium / Large toggles) and its chart colours read a registry of models, not runs, in `data/models.json`. It never touches evidence. `scripts/prepare.mjs` validates it and attaches the matching entry to each run in `public/data/experiences.json` as `modelInfo`. Add a model here before (or after) publishing its first run; a run whose model is missing still appears, in the Other group, with its vendor taken from the provider and the next free colour.

```json
{
  "vendors": [
    {"id": "openai", "name": "OpenAI"},
    {"id": "anthropic", "name": "Anthropic"}
  ],
  "models": {
    "<exact model id in evidence>": {
      "name": "Claude Haiku 5.5",
      "short": "Haiku 5.5",
      "vendor": "anthropic",
      "tier": "frontier | notable | other",
      "size": "small | medium | large",
      "open": false,
      "hue": "blue | orange | aqua | yellow | magenta | green | violet | red",
      "color": {"light": "#rrggbb", "dark": "#rrggbb"},
      "released": "YYYY-MM-DD or null"
    }
  }
}
```

- `vendors` order is the sidebar's vendor order within a group; a vendor not listed sorts after them by name.
- `tier` places the model in the sidebar's Frontier, Notable or Other group. `size` applies to frontier models only and drives the Small / Medium / Large toggles; it is an editorial class, not a parameter count.
- `open` marks open-weight models (the Other group's "Open weights" filter).
- Colour: either `hue`, one of the site's eight validated series colours (`--series-1` to `--series-8` in `src/app.css`), or `color`, an explicit light and dark pair (one vendor's models as shades of one family, as Slopalytics does). Re-run the dataviz palette validator in both themes when adding one, over the models in sidebar order. Runs of the same model share the colour, later ones stepped lighter (dark theme) or darker (light), and are told apart by their numbers and names.
- `released` orders models newest first within a vendor; `null` (unknown) sorts last.

### Reasoning level per run

A manifest request may carry `"reasoning": "low | medium | high | xhigh | max | ultra"`, the reasoning effort the run was administered with (Codex offers all six; Luna has no `ultra`). `scripts/prepare.mjs` joins it to the run by `runId` from every manifest in this folder, rejects any other value with the run named, and the sidebar's Reasoning row filters on it in that order. A run without the field is `none`, which the sidebar excludes by default (struck through) as Slopalytics does with non-reasoning variants; click it to show those runs.

Recognition cannot be prevented for a well-known story. After replay validation and before publishing, dump the session activity as described in docs/ADMINISTRATION.md and run `bun scripts/blinding-audit.mjs --run <runId> --dump <activity.json>` (repeat `--dump` for pages). Store the resulting audit path in `blindingAudit`; audits are separate from immutable evidence. Reports disclose the verdict, participant quotes, compliance findings and Q8 self-report. A clean audit means no visible recognition was found, not proof of no internal recognition. Keep raw activity dumps outside this repository because they can contain wrapper paths.

An administration run ID names the evidence file; some cohorts have a different immutable `id` inside that file. Audit JSON keeps the requested filename ID as `runId` and the embedded ID as `evidenceId`; public reports join by `evidenceId`. Neither evidence ID is rewritten.
