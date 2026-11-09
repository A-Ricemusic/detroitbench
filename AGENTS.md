# Engineering DetroitBench

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
| `docs/ADMINISTRATION.md` | Operator protocol for administering blinded benchmark sessions |
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
- Confirm the code is healthy before making changes: `bun run test` and `bun run check`

For running sessions, see [docs/ADMINISTRATION.md](docs/ADMINISTRATION.md). The site publishes only data under `public/`, built from `data/` and `docs/`.

## Changing the benchmark

The legacy API-provider route (`play.mjs`, `story-provider.mjs`, `runner.mjs`, `cli.mjs`) is unused since branching-3.0 but retained for direct provider API runs; it keeps the old 160-word reason cap and has no post-game interview.

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
