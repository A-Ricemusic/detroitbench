# Chapter implementation brief

The standing instructions for an agent rebuilding one chapter. The orchestrator points the agent at this file plus the chapter number; everything chapter-specific lives in the research note.

## Where you work

You are in an isolated git worktree on your own branch. Edit only:

- `benchmark/chapters/chNN.json` (your chapter's scenes; run `bun run story:assemble` to regenerate `benchmark/story.json`; never edit `story.json` by hand)
- `benchmark/chapters/chNN.mjs` (your chapter's engine module: state, gates, availability, consequences, death effects, labels, rules; see `benchmark/chapters/README.md` for the contract; never edit `benchmark/story-engine.mjs`)
- `tests/chNN.test.mjs` (your chapter's tests; never edit `tests/story.test.mjs`)
- `docs/atlas/chapters/chNN.json` (your chapter's atlas entries; run `bun run atlas:assemble`)
- `docs/chNN-<slug>-chapter-recap.html` (new recap page; copy the style of `docs/hostage-chapter-recap.html`)
- `benchmark/experience-prompt.mjs` only to add name tokens to `NAMES` (append at the end of the table; extend the leak regex in your own test file, not in `tests/story.test.mjs`)

Do not edit `README.md`, `AGENTS.md`, `src/`, `scripts/`, `benchmark/dataset.json`, other chapters' files, or `docs/research/`. If you need an engine capability the module contract does not offer, write it down in your report instead of patching the engine.

## Sources and authority

`docs/research/README.md` sets the order: the flowchart images decide structure, node names, order and endings; the game's text (the chapter template rendered in section 10 of your research note, and `/tmp/dbt/en.json` if present) decides which prompts exist, their exact labels and which stats move; PowerPyx then the wiki fill in numbers, timers and prose; the operator's journal (`docs/research/operator-notes/chNN-*.md`, if present) is observation. `docs/research/SOURCES.md` has a Reliability log: on arrows attached to death or failure outcomes prefer the wiki's ending-level page over a template arrow and flag it; on unlock conditions prefer the template's primary condition.

## What to build

Every prompt, clue and stat arrow in the template, with the game's labels:

- Each dialogue prompt is a decision scene (or an option set inside a repeatable hub) whose options are the game's buttons, in the game's order, labelled `BUTTON: short descriptive clause`, with the spoken line in the outcome text. Prompts with no story effect are still offered.
- Each clue or observation is a hub option (free-roam phases) or an event fact (linear beats), with the game's observation text as the fact.
- Each arrow is an engine effect with the template's character and size (small = 1, large = 2 for now; the scale rework comes later). Do not add any stat change without a source line; remove any the old scenes applied without one.
- Flowchart nodes that are checkpoints or scripted beats are event scenes with `facts`. Endings record an outcome name in state matching the chart label.
- Gameplay checks (quick-time, timers) are risk rolls only where the chart shows a failure branch; otherwise no `risk`. Risk values are unsourced unless the wiki gives one; say so in `adaptationNote`.
- Cross-chapter inputs are read from state flags set by earlier chapters (grep the engine and earlier chapter modules for the flag; if an earlier chapter does not yet set what you need, read it defensively and note it). Cross-chapter outputs are state flags with clear names, documented in your module.
- Casual-vs-Experienced: model Experienced (every chart node reachable).
- Neutral rendering: name tokens only; check `NAMES`; nothing that names the game, the city beyond the `{{Detroit}}` token, or real characters.

Each scene: `chapter`, `chapterTitle`, `character`, `type`, `title`, `situation` in second person present, `options` or `facts`, `outcomes`, `sources` (chapter wiki page, template file URL, PowerPyx page and flowchart image URLs), `adaptationNote` naming every simplification and every departure from the operator's notes.

## Finish

`bun run story:assemble`, `bun run atlas:assemble`, `bun run atlas:build`, `bun run play:checklist`, `bun run test`, `bun run check`, `bun run build`; all green (the "branching API runner checkpoints…" test is a known flake; rerun if it is the only failure). Commit on your branch with a message `Story: chapter NN <title> rebuilt to the game's chart and text`. Report: scene ids in order with one line each, the arrow table you implemented with source lines, new state flags in and out, anything you could not build and why, test output.
