# Chapter research notes

One file per chapter, `chNN-<slug>.md`, written by a research agent before the chapter's scenes are rebuilt. The benchmark's scene set for a chapter must match the game's completed in-game flowchart node for node, with the wiki's published probabilities and stat changes where they exist. These notes are the specification the implementation is checked against, and the operator audits them while replaying the game.

## Sources, in order of authority

1. The game's own completed chapter flowchart, as photographed by PowerPyx (image files under `wp-content/uploads` on each chapter's walkthrough page, linked from https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/). Node names on the chart are the ground truth for structure and endings.
2. The Detroit: Become Human Wiki chapter page (https://detroit-become-human.fandom.com/wiki/<Chapter_Title>), read as wikitext through the MediaWiki API: `https://detroit-become-human.fandom.com/api.php?action=parse&page=<Title>&prop=wikitext&format=json` (direct page fetches are blocked for scripts; the API is not). Its Flowchart section, Probability/Relationship/Public Opinion/Software Instability tables and Trivia carry the numbers and the gating.
3. The wiki's stat pages (Public_Opinion, Software_Instability, Relationship_Stat) and the Magazine page for media scenes.
4. Gamepressure, GamerGuides, IGN only to resolve conflicts.
5. The operator's own playthrough journal in `operator-notes/` (see `operator-notes/README.md`), dictated to a dedicated journal thread as they replay the game. Where the journal and the wiki disagree, the wiki wins unless the flowchart image shows otherwise or the operator has reproduced the observation and the sources are silent.

## What each note must contain

1. **Flowchart transcription.** Every node on the chart, in reading order, grouped as the chart groups them (bracketed phase labels, choice pairs, checkpoints, endings). Mark ending nodes with their icon: skull (a death), no-entry (a failure that is not a death), check (success), trophy, or none. Quote node labels exactly as printed, in capitals.
2. **Choices and gates.** For each choice node: the options, what each requires (an earlier node, an item, a relationship level, a stat threshold), and what it leads to.
3. **Numbers.** Every probability, timer, relationship change, public opinion change and software instability change the wiki states, with the exact figure and a quote of the source line. Say explicitly which choices have no stated number.
4. **Cross-chapter dependencies.** What earlier choices (any character) change in this chapter, and what this chapter changes later. Name the wiki line.
5. **Endings.** Each chapter ending, its exact chart label, and the conditions.
6. **Media.** Magazines and broadcasts available in the chapter, with the wiki's article facts and any public-opinion effect.
7. **Current benchmark coverage.** Which scenes in `benchmark/story.json` currently cover this chapter, and a node-by-node list of what is missing, extra, or mislabelled.
8. **Open questions.** Anything the sources leave unclear or contradict, for the operator to check in game.
9. **Sources.** Every URL used, including the full-size image URLs, with a one-line note of what each gave.

Images are not committed to the repository (they are PowerPyx's screenshots of the game); keep them under `/tmp/flowcharts/chNN/` while working and link the URLs.

## Source inventory

`SOURCES.md` (maintained by a source-hunting agent) lists every source found for the game, with what each is good for and how to read it.
