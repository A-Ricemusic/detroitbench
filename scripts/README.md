# Scripts

Run commands from the repository root with Bun. Each entry lists its invocation, inputs, outputs and side effects. Helper functions may read sources without writing files.

| Script | Purpose, invocation, reads and writes |
|---|---|
| `story-assemble.mjs` | Generator: `bun run story:assemble`; reads `benchmark/story-meta.json` and chapter JSON, writes `benchmark/story.json` and refreshes `benchmark/dataset.json`. Direct `bun scripts/story-assemble.mjs --check` only checks freshness. |
| `atlas-assemble.mjs` | Generator: `bun run atlas:assemble`; reads atlas metadata and chapter JSON, writes `docs/detroit-decisions.json`. |
| `atlas-embed.mjs` | Generator: `bun run atlas:build`; reads atlas sources, assembled story and atlas HTML, assembles the atlas and updates embedded data in `docs/atlas/generated/detroit-decision-flowchart.html`. |
| `dataset-assemble.mjs` | Generator: `bun run dataset:assemble`; reads story and decision atlas, writes `benchmark/dataset.json`; exported assembly/feedback helpers return data without writing. |
| `prepare.mjs` | Generator: `bun scripts/prepare.mjs` (also `dev`, `build`, `share`); reads chapter/atlas sources, evidence, manifests, model registry and research notes; assembles story/atlas/dataset, embeds atlas, regenerates standalone reports, and replaces `public/data/` with site payloads and copies the public atlas. |
| `run-report.mjs` | Generator: `bun run play:report`; reads completed experience evidence, chapter/report metadata, model registry, manifests and audits; validates runs and writes standalone reports in `docs/runs/`. Also exports shared report helpers. |
| `play-checklist.mjs` | Generator: `bun run play:checklist`; reads story JSON, writes the ignored `docs/play-along-audit-checklist.md`. |
| `blinding-audit.mjs` | Generator: `bun scripts/blinding-audit.mjs --run ID --dump ACTIVITY.json` (repeat `--dump` for pages); reads evidence and external activity dumps, writes `data/administration/audits/ID.json`; also exports audit readers and analysis helpers. |
| `name-leak-scan.mjs` | Read-only CLI: `bun scripts/name-leak-scan.mjs`; renders the assembled story and interview/preface in neutral mode, prints every real-form occurrence with chapter, scene and field, and fails on literal leaks. Marks token-derived substitute collisions and ordinary vocabulary/unrelated names as expected overlaps; excludes adaptation notes and sources. Exports `scanNameLeaks` for regression tests; no file output. |
| `story-counts.mjs` | Read-only CLI: `bun run story:counts [--json]`; reads chapter sources and metadata, prints scene counts; no file output. |
| `validate.mjs` | Read-only validator: `bun run check`; reads dataset, atlas, completed evidence and interview records through report helpers; checks generated dataset freshness and replay integrity, prints results; its run loader ensures the experiences directory exists. |
| `browser-check.mjs` | Diagnostic with side effects: `bun run check:browser [base-url]`; reads a running site via Chrome, asserts layout/console invariants, prints results and uses a temporary Chrome profile; no repository output. |
| `perf-check.mjs` | Diagnostic with side effects: `bun run check:perf [base-url] [path] [dist-dir]`; reads a running site and built assets through Chrome, prints load measurements and uses a temporary Chrome profile; optionally writes JSON to `PERF_JSON`. |
| `ui-audit.mjs` | Diagnostic generator: `bun scripts/ui-audit.mjs [base-url] [--out=DIR]`; reads a running site, source files and (in report mode) prior findings; writes findings JSON/Markdown and screenshots to ignored `.ui-audit/` by default, using temporary Chrome profiles. |
| `change-format.mjs` | Pure formatting helper imported by report/dataset code; reads supplied state changes and gauge/chapter label definitions, returns prose entries; no file writes or standalone CLI. |
| `flow-data.mjs` | Read-only helper imported by reports/prepare; reads supplied run/story data and chapter module source/metadata to return chapter flows; no file writes or standalone CLI. |
| `model-registry.mjs` | Read-only helper imported by reports/prepare; reads `data/models.json`, cohort manifests and referenced evidence for naming/reasoning metadata; returns validated registry/context data; no file writes or standalone CLI. |
| `prompt-pack.mjs` | Pure helper imported by reports; reads supplied prompts, returns packed/unpacked prompt data; no file I/O or standalone CLI. |
| `relationship-track.mjs` | Pure helper imported by prepare; reads supplied runs and gauge/chapter definitions, returns relationship tracks and chart metadata; no file writes or standalone CLI. |
| `report-data.mjs` | Pure helper imported by prepare; reads supplied validated run data and report/chapter definitions, returns report and prompt payloads; prepare writes them to `public/data/`; no standalone CLI. |

The generation pipeline is `story:assemble` → `atlas:assemble` → `atlas:build` → `dataset:assemble` → `prepare` → `vite build`. `prepare` also calls the assemblers and atlas embed itself; `bun run build` invokes prepare followed by Vite.

Validate with `bun run test` and `bun run check`, then `bun run build`. For a running built site with Chrome available, use `bun run check:browser`, `bun run check:perf`, or the direct UI audit command above.
