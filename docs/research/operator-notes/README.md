# Operator playthrough journal

The operator (the benchmark's author) is replaying *Detroit: Become Human* and dictating what they see, chapter by chapter, to a journal agent in its own T3 Code thread ("Playthrough journal"). The agent writes the notes here, one file per chapter, `chNN-<slug>.md`, in the order the operator reports them. This journal is an independent record of the game, kept separate from the wiki-based research notes in the parent directory, so the two can be compared.

## What the journal is for

1. **Verification.** Each chapter's research note (`../chNN-<slug>.md`) is the specification the benchmark is built to. The journal is the operator's own observation of the same chapter. Where they disagree, the discrepancy is recorded in the journal file under "Discrepancies with the research note" and taken to the orchestrating thread, which decides what changes (the wiki wins by default; the completed in-game flowchart wins over the wiki; the operator's observation wins when they have reproduced it and the sources are silent).
2. **Additions.** Events the operator wants the model to experience that no source describes (atmosphere, incidental beats) are recorded under "Requested additions" with the operator's wording, then implemented as event scenes with an `adaptationNote` saying they are operator-sourced.
3. **Open questions.** Each research note ends with questions only an in-game replay can answer. The journal agent keeps a running list per chapter and marks each one answered, with the observation, when the operator reports it.

## File format

```
# Journal · Chapter NN · <Title> (<character>)

Sessions: <dates>

## Events as observed
1. (e|c) … exactly as the operator described, typos fixed, names kept as the game's real names
   - Fact-check: <what the wiki / transcript / flowchart say; URL>
…

## Discrepancies with the research note
- …

## Requested additions
- …

## Research-note open questions
- [x] Q1 … → observed: …
- [ ] Q2 …
```

(e) is an event with no choice; (c) is a choice. Real names are used in the journal; the benchmark substitutes neutral names at build time.

## Where to fact-check

In order of authority, from `../README.md`:

1. The completed in-game flowchart, as photographed by PowerPyx (full-size images under `wp-content/uploads` on each chapter page, index at https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/).
2. The Detroit: Become Human Wiki chapter page, read as wikitext through the MediaWiki API: `https://detroit-become-human.fandom.com/api.php?action=parse&page=<Title>&prop=wikitext&format=json` (page fetches are blocked for scripts; the API works). Chapter transcripts exist for some chapters as `<Title>_(Transcript)`.
3. The fan transcript site https://detroitbecometext.github.io (a JavaScript app; read its GitHub source and English string file, as the research agents did; copies are under `/tmp/flowcharts/chNN/transcript*.txt` while the machine is up).
4. The wiki's stat pages: Public_Opinion, Software_Instability, Relationship_Stat; the Magazine page for media.
5. Gamepressure, GamerGuides, IGN, Neoseeker and Shacknews only to resolve conflicts.

Every research note's section 9 lists the exact URLs used for that chapter. The journal agent cites a URL for every fact-check line.

## What the journal agent must not do

- Edit `benchmark/`, `src/`, `tests/`, the atlas or the recap pages. Benchmark changes go through the orchestrating thread's pipeline (research → implementation → review).
- Rewrite the research notes. Discrepancies are recorded in the journal and reported.
- Invent detail the operator did not say. Fix typos and tokenize names; do not embellish.
