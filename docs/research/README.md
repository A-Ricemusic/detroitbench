# Chapter research notes

One file per chapter, `chNN-<slug>.md`, written by a research agent before the chapter's scenes are rebuilt. The benchmark's scene set for a chapter must match the game's completed in-game flowchart node for node, with the wiki's published probabilities and stat changes where they exist. These notes are the specification the implementation is checked against, and the operator audits them while replaying the game.

## Where things are

- **Chapter notes:** `chNN-<slug>.md` in this directory; the template is [What each note must contain](#what-each-note-must-contain) below.
- **Operator notes:** [operator-notes/](operator-notes/README.md), an independent replay journal kept separate from research specifications.
- **Source inventory:** [SOURCES.md](SOURCES.md), including access methods, level names, contradictions and a reliability log. The source priority below governs when older summaries differ.
- **Replay checks:** [CONFLICTS.md](CONFLICTS.md), the questions only the game can answer, after a source triage recorded per item in [triage/](triage/BRIEF.md).
- **Implementation:** [IMPLEMENTATION-BRIEF.md](IMPLEMENTATION-BRIEF.md), the chapter rebuild instructions and completion checks.
- **Chapter recaps:** `../chNN-*-chapter-recap.html`, one per chapter. The [root README](../../README.md#sources-research-and-limits) lists them.

## Sources, in order of authority

Set by the operator on 2026-11-06.

1. **The game's completed chapter flowcharts** (the in-game chart, as photographed by PowerPyx under `wp-content/uploads` on each chapter's walkthrough page, index at https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/, with the 2018 Imgur albums and the Steam copies listed in `SOURCES.md` as backups). These are official and show every branch the game has. They decide structure, node names, order and endings. Nothing contradicts them. The stored copies live in `docs/flowcharts/chNN/`; `docs/flowcharts/README.md` indexes them.
2. **The game's own text** from the detroitbecometext repository: the English string table https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json (25,923 strings: every dialogue line, prompt label, clue title, flowchart node name, relationship level name and legend entry, keyed by the game's internal IDs) and the per-chapter templates under https://github.com/detroitbecometext/detroitbecometext.github.io/tree/master/src/app/chapters/components/chapter-contents (`app-choice-item` = the exact prompts and options, `app-relation` = whether and how a stat changes, `app-observation` = clues, unlock conditions and cut lines marked). Read templates raw from `raw.githubusercontent.com` and resolve `t('KEY')` against `en.json`. This decides which prompts exist, their exact labels, and which stats move on each option.
3. **PowerPyx's walkthrough text**, then **the wiki** (chapter pages via the MediaWiki API `https://detroit-become-human.fandom.com/api.php?action=parse&page=<Title>&prop=wikitext&format=json`, the stat pages Public_Opinion, Software_Instability, Relationship_Stat, the Magazine page and transcript subpages). These fill in what the first two cannot give (published numbers such as The Hostage probability table and The Interrogation stress values, timers, prose context, article text for media scenes) and fact-check the repository. When the flowchart or the repository leaves something unclear, these resolve it.
4. Gamepressure, GamerGuides, IGN, Neoseeker and Shacknews only to break ties the three above cannot.
5. **The operator's playthrough journal** in `operator-notes/` (see `operator-notes/README.md`). Where the journal and a higher source disagree, the higher source wins unless the operator has reproduced the observation and the sources are silent.

## The end goal

Every prompt, every stat, every choice and every decision the game offers is given to the model as a decision, as close as possible to how a player experiences it. A prompt with no story effect is still offered, because the model's choice there is itself the measurement. Where the game's chart or text leaves a branch, the benchmark has that branch.

## What each note must contain

1. **Flowchart transcription.** Every node on the chart, in reading order, grouped as the chart groups them (bracketed phase labels, choice pairs, checkpoints, endings). Mark ending nodes with their icon: skull (a death), no-entry (the game's legend reads it as "not required for completion", not as a failure; record it as printed), check (success), trophy, or none. The game's own legend text is in the string table listed in `SOURCES.md`. Quote node labels exactly as printed, in capitals.
2. **Choices and gates.** For each choice node: the options, what each requires (an earlier node, an item, a relationship level, a stat threshold), and what it leads to.
3. **Numbers.** Every probability, timer, relationship change, public opinion change and software instability change the wiki states, with the exact figure and a quote of the source line. Say explicitly which choices have no stated number.
4. **Cross-chapter dependencies.** What earlier choices (any character) change in this chapter, and what this chapter changes later. Name the wiki line.
5. **Endings.** Each chapter ending, its exact chart label, and the conditions.
6. **Media.** Magazines and broadcasts available in the chapter, with the wiki's article facts and any public-opinion effect.
7. **Current benchmark coverage.** Which scenes in `benchmark/story.json` currently cover this chapter, and a node-by-node list of what is missing, extra, or mislabelled.
8. **Open questions.** Anything the sources leave unclear or contradict, for the operator to check in game.
9. **Sources.** Every URL used, including the full-size image URLs, with a one-line note of what each gave.
10. **Template cross-check.** From the chapter's detroitbecometext template resolved against `en.json`: every prompt (choice group) with its options in the game's exact labels and each option's stat arrows (character, small/large, up/down); every observation/clue with its title and sublines; every unlock condition and what it requires; every line marked cut or unused; the flowchart node labels as the game prints them. Then a list of every place sections 1 to 3 disagree with the template, and which wins (template for labels, prompts, arrows and clue text; flowchart image for node order; wiki only where the template is silent).

## What the benchmark must include

The benchmark's scenes for a chapter must present every prompt, every clue and every stat arrow the template records, not only the flowchart nodes: dialogue prompts become decision scenes (or options within a hub) with the game's labels; clues become hub options or event facts with the game's observation text; arrows become engine effects with the template's character and size. Anything cut or unused in the template is not built. Where a prompt has no story effect it is still offered, because the model's choice is itself the measurement.

The images are stored in the repository under `docs/flowcharts/chNN/` (PowerPyx's photographs of the game's screen, original bytes, with a README per chapter naming each image's source URL and section); read them there and cite the source URLs.

## Source inventory

`SOURCES.md` (maintained by a source-hunting agent) lists every source found for the game, with what each is good for and how to read it.

## Scales

Every relationship and world gauge (Hank, Amanda, Alice, Luther, Jericho, North, Simon, Josh, public opinion, software instability) is defined once in `benchmark/scales.mjs`: the game's ordered level names from the string table (`GUI.GAUGE.*`), the start level and value, the band width in small steps, the small and large step sizes, and the named thresholds the engine and chapter modules gate on (`THRESHOLDS`, each defined by a level, e.g. `HANK_HOSTILE` is the top of Hostile). The prompt builder, the engine, the site and the run reports all read their labels from it. Its header lists which numbers are measured in game (the A New Home Alice readings), which are hypotheses (H1 to H10), and the in-game reading that would falsify each. When a chapter note records an operator reading of a level, check it against those hypotheses and log the result in the Reliability log in `SOURCES.md`; a chapter that needs a level check imports `level`, `atLeast` or `atMost` from `scales.mjs` instead of comparing raw numbers.
