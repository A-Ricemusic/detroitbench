# Morning-report triage brief

Goal: cut `docs/research/CONFLICTS.md` (1,595 checklist items) down to the few questions only the operator can answer by playing, by resolving or justifying everything else from sources. The operator cannot replay the whole game; each surviving question must be worth their time and answerable from memory or one short replay.

## Inputs (read, never edit)

- Your chapters' sections of `docs/research/CONFLICTS.md` ("Top three per chapter", and "Conflicts to resolve, by chapter" → `### NN · Title · N items`, grouped under `#### Numbers / Gates and unlocks / Structure / Arrows / Wording`). Links inside point at stale `.claude/worktrees/agent-*` paths; use the same file under the main checkout instead.
- `docs/research/chNN-<slug>.md` (the research note; section 10 is the template cross-check), `docs/research/SOURCES.md` §13 and the Reliability log, `docs/research/operator-notes/` if your chapter has one.
- `benchmark/chapters/chNN.json` and `.mjs` (what the benchmark actually does now), `docs/chNN-*-chapter-recap.html`.
- Cached primary sources: `/tmp/flowcharts/chNN/` (PowerPyx photos of the in-game chart plus wiki text), `/tmp/dbt/` (detroitbecometext templates and `en.json`, rendered outlines). If a cache is missing, fetch: templates raw from `https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/...`, wiki via `https://detroit-become-human.fandom.com/api.php?action=parse&page=<Title>&prop=wikitext&format=json`.

Source authority (operator's rule): flowchart image > template + en.json > PowerPyx text, then wiki > other guides > operator journal. Reliability log so far: template arrows on death/failure outcomes were wrong twice (wiki right); template unlock conditions right where wiki prose was wrong.

## Verdicts

Go through every item in your chapters, one by one. Give each exactly one verdict:

- `resolved`: a source you actually read answers it. Give the answer, the source (which one, and the exact line or node label), and whether the benchmark already matches. If it does not match, write the concrete `fix` (scene id, field, from → to). Do not edit chapter files.
- `adaptation`: a deliberate simplification already documented in `adaptationNote` or the recap that changes nothing the sources contradict (e.g. a cut line left out, a free-roam order collapsed, an idle comment omitted). Say in one clause why it needs no check.
- `needs-play`: no source can settle it. Write ONE question, phrased so the operator can answer yes/no or with a number from memory or a two-minute replay, and give `impact`.
- `cosmetic`: unresolvable but changes only wording the model sees without changing options, arrows, gates or endings. One line.

`impact` for needs-play: `options` (which buttons the model is offered), `arrow` (a stat change), `gate` (what unlocks), `ending` (which ending node), `number` (a probability, timer or count), `text`.

Merge duplicates: the dump repeats the same question in several phrasings (research note, recap, adaptation note); keep one entry and list the merged originals' first few words.

## Output

Write `docs/research/triage/chNN.json` per chapter:

```json
{"chapter":5,"title":"The Painter","itemsInDump":33,"entries":[
 {"id":"ch05-01","verdict":"resolved","topic":"Book title","originals":["Book title?"],"answer":"The chart node reads TRAGEDIES OF WILLIAM SHAKESPEARE; en.json MENU.FLOWCHART... prints the same","source":"flowchart image detroit-the-painter-100.jpg, node 4; en.json key ...","benchmarkMatches":true,"fix":null},
 {"id":"ch05-02","verdict":"needs-play","topic":"Chess win arrow","originals":["PowerPyx vs transcript on chess?"],"question":"When you beat Carl at chess, did the Carl arrow go up (small) or was there no arrow?","impact":"arrow","why":"template has no arrow; PowerPyx says up; wiki silent"},
 {"id":"ch05-03","verdict":"adaptation","topic":"Carl's idle comments","originals":["Carl's idle comments?","Left out: Carl's idle comments if Markus wanders"],"why":"timer-driven flavour lines with no prompt, arrow or node"}
]}
```

Then `docs/research/triage/chNN.md`: a short human summary (five to ten lines): counts per verdict, the needs-play questions in order of impact, the fixes you found, and anything in the chapter you now believe is wrong in the benchmark even though the dump never asked.

Be skeptical of yourself: `resolved` requires a line you read in this session, not memory of the game. If you cannot find the source, it is `needs-play` or `cosmetic`, never `resolved`. Do not launch subagents. Do not commit. Do not edit anything outside `docs/research/triage/`.
