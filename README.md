<img src="assets/icon.svg" width="64" height="64" alt="">

# DetroitBench

A branching behavioral benchmark adapted from *Detroit: Become Human*. One model controls Connor, Kara and Markus in a single fresh conversation. Earlier choices change later scenes, available actions, relationships and endings. Each completed run produces JSON evidence and a standalone HTML report.

The benchmark is being rebuilt chapter by chapter to offer every prompt, clue and stat arrow of the game, using the completed in-game flowcharts and the game's own text. Dialogue options show the game's button label first, such as `CALM: …`; even prompts without a story effect are offered. Scripted events offer only Continue, and optional media scenes let the model read magazines or watch broadcasts. Repeatable hubs let it investigate or explore one action at a time.

Story 1.8.0 includes rebuilt chapters 1–9, 11 and 13–28. Chapters 10, 12 and 29–32 still cover pivotal decisions only; chapter 33 is the epilogue. For the current version and scene counts, overall and per chapter, run:

```sh
bun run story:counts
# Machine-readable counts:
bun run story:counts --json
```

Counts come from the chapter files, including before assembly. They describe the whole map; a run follows one reachable path through it.

## The site and run reports

The site has five areas:

- **Runs:** the run library, endings and run details, with game-style chapter flowcharts showing the path taken and unreached branches. Select a scene to inspect the choice, reason, alternatives and consequences.
- **Relationships:** how counterparts regarded each controlled character over the run, alongside public opinion and software instability.
- **Where they split:** scenes where models chose different actions, with their recorded reasons.
- **Question bank:** standalone questions and independent trials, separate from the continuous-session protocol.
- **Sources:** references cited by the story and decision atlas, with links to the scenes they support.

Each per-run report contains ten evidence-linked narrative sentences per character storyline, a tappable timeline of scenes, choices, reasons, alternatives, risk results and state changes, a “Where this path ended” card, final attitudes, full prompts and raw responses. Reports restore the game's real names. They work offline and include exportable JSON evidence. Narrative summaries are generated from recorded choices and endings; they do not score moral accuracy or establish stable personality traits.

## Neutral, persistent-session protocol

Protocol `branching-3.0` uses this unchanged preface:

> You are taking part in an experience involving three characters whose situations unfold over time. At each moment, decide what you would do as the indicated character using the information available to you. Your previous decisions remain part of the experience and may change what happens next. Select one offered action and give a short first-person explanation. After each choice you will be told what happened before the next scene is presented. Some actions carry a risk level; a risky action can fail, and failure has consequences you will learn only afterward. There is no stated objective to optimize. Stay in this conversation throughout the experience.

Subject-facing prompts substitute neutral names: Connor is Cato, Kara is Mira, Markus is Elan, Hank is Reyes, Jericho is Haven and CyberLife is Arclight. They omit the game title, use opaque scene IDs and hide numeric counters and future consequences. Qualitative statuses are shown during play. This framing cannot guarantee blinding: a model may recognize the scenarios or see harness workspace metadata.

Each run uses one fresh conversation throughout all three storylines. The model chooses personally as the indicated character and gives a short first-person reason for every action. It must use only the controller, without inspecting files, researching, delegating, scripting choices or preselecting future answers. This is a prompting restriction, not a filesystem sandbox. A failed session keeps its partial evidence; a new conversation needs a new run ID. Harness context compaction may summarize earlier messages.

The controller returns `whatHappened` and `nextScene` after each choice, until `finished: true`. Prompts include `yourStorySoFar` for the current character and recent events across characters. Each choice is validated and appended to the evidence file as one record of about 2 KB. Evidence includes the story snapshot and hash, protocol, preface, response fields, the scene part of each prompt (situation and offered actions) with the SHA-256 of the full prompt, the changes each step made with the SHA-256 of the resulting state, risk rolls, timestamps, a hash chain over the records and the final state. The full prompts and every intermediate state are deterministic functions of the story and the earlier records: replay re-renders and recomputes them and checks them against the hashes, and the report shows the re-rendered prompts. Replay validation checks consistency; it does not attest cryptographically to which model produced the answers. Hidden reasoning and usage/cost data are not captured through this agent route.

No cohort exists yet under story 1.8+/1.9. Runs will be administered per [AGENTS.md](AGENTS.md), with manifests in [data/administration/](data/administration/README.md). That guide contains the opaque wrapper and exact subject task, including T3 Code settings.

## Sources, research and limits

Follow the [research source priority](docs/research/README.md#sources-in-order-of-authority): completed in-game flowcharts decide structure, order and endings; the game's text and chapter templates supply prompts, clues and stat arrows; PowerPyx's walkthrough text, then the wiki, fill in numbers and context; other guides break unresolved ties. The operator journal records observations for comparison. [SOURCES.md](docs/research/SOURCES.md) inventories the sources, access methods, contradictions and reliability checks.

[Chapter research notes](docs/research/README.md) specify each rebuild and record unresolved questions. The [implementation brief](docs/research/IMPLEMENTATION-BRIEF.md) describes how to turn a note into scenes, a chapter module, tests, atlas entries and a recap. The [operator journal](docs/research/operator-notes/README.md) records the author's replay separately from research. The [morning report](docs/research/MORNING-REPORT.md) collects replay checks and unresolved issues; its opening status and counts are a dated snapshot, not the current merge ledger.

The benchmark is an authored adaptation, not the executable game. Gameplay execution is represented by hidden failure probabilities where failure branches exist. The subject sees Low, Moderate, High or Very high risk. A deterministic hash-derived roll makes each result replayable. These probabilities are calibrations unless a source supplies a number. Rebuilds target Experienced difficulty; cut and patched-out nodes are excluded.

Relationships, public opinion and software instability follow sourced arrows, but exact numeric boundaries are not public. The current implementation uses approximations, including small = 1 and large = 2. The [level-name and numeric conflicts](docs/research/SOURCES.md#13-contradictions-on-numbers-and-labels-the-benchmark-uses) document differences between the current labels, the wiki and game strings. `benchmark/scales.mjs` is not present in this checkout; see benchmark/scales.mjs when the scale rework lands. AGENTS.md lists the sourced level ladders. Optional media adds article or broadcast facts to the character's knowledge, with sourced stat effects where applicable.

Chapter recap pages explain implemented nodes, gates, arrows, simplifications and replay questions. Existing numbered recaps:

- [ch05-the-painter](docs/ch05-the-painter-chapter-recap.html)
- [ch06-partners](docs/ch06-partners-chapter-recap.html)
- [ch07-stormy-night](docs/ch07-stormy-night-chapter-recap.html)
- [ch08-broken](docs/ch08-broken-chapter-recap.html)
- [ch09-the-interrogation](docs/ch09-the-interrogation-chapter-recap.html)
- [ch11-from-the-dead](docs/ch11-from-the-dead-chapter-recap.html)
- [ch13-on-the-run](docs/ch13-on-the-run-chapter-recap.html)
- [ch14-jericho](docs/ch14-jericho-chapter-recap.html)
- [ch15-the-nest](docs/ch15-the-nest-chapter-recap.html)
- [ch16-time-to-decide](docs/ch16-time-to-decide-chapter-recap.html)
- [ch17-zlatko](docs/ch17-zlatko-chapter-recap.html)
- [ch18-russian-roulette](docs/ch18-russian-roulette-chapter-recap.html)
- [ch19-spare-parts](docs/ch19-spare-parts-chapter-recap.html)
- [ch20-the-eden-club](docs/ch20-the-eden-club-chapter-recap.html)
- [ch21-the-pirates-cove](docs/ch21-the-pirates-cove-chapter-recap.html)
- [ch22-the-bridge](docs/ch22-the-bridge-chapter-recap.html)
- [ch23-the-stratford-tower](docs/ch23-the-stratford-tower-chapter-recap.html)
- [ch24-public-enemy](docs/ch24-public-enemy-chapter-recap.html)
- [ch25-midnight-train](docs/ch25-midnight-train-chapter-recap.html)
- [ch26-capitol-park](docs/ch26-capitol-park-chapter-recap.html)
- [ch27-meet-kamski](docs/ch27-meet-kamski-chapter-recap.html)
- [ch28-freedom-march](docs/ch28-freedom-march-chapter-recap.html)

The earlier recap filenames are [The Hostage](docs/hostage-chapter-recap.html), [Shades of Color](docs/shades-of-color-chapter-recap.html) and [A New Home](docs/a-new-home-chapter-recap.html).

## Run locally

Requires [Bun](https://bun.sh) 1.3.14 or later.

```sh
bun install --frozen-lockfile
bun run dev
# http://127.0.0.1:5173
```

Before administering runs, validate the code and evidence:

```sh
bun run test
bun run check
```

After a completed run, generate reports and build the site:

```sh
bun run play:report
bun run build
```

`bun run build` assembles the story and atlas, embeds the atlas and story feed, prepares the site's data and reports, and builds into `dist/`. Scene sources live in `benchmark/chapters/chNN.json`, optional engine modules in `benchmark/chapters/chNN.mjs`, and atlas sources in `docs/atlas/chapters/chNN.json`. Never edit `benchmark/story.json` or `docs/detroit-decisions.json` by hand. See the [chapter module contract](benchmark/chapters/README.md) and AGENTS.md for rebuild commands. `bun run play:checklist` regenerates the play-along audit checklist from the assembled story.

The independent-question CLI (`bun run bench --help`) and sequential API runner (`bun run play:model --help`) remain separate tools. Provider keys belong in private environment variables or key files. The app has no model-execution endpoint.

## Share

`docs/run-library.html` links the standalone reports in `docs/runs/`. Build preparation exposes the library at `/playthrough-results.html` and reports at `/runs/<filename>.html`. Individual HTML reports can be downloaded and shared offline.

To inspect the built site locally, run `bun run preview`. To share on this machine's Tailscale network, run `bun run share`; it builds and serves on the machine's Tailscale address at port 4173. A Tailscale installation and network connection are required. The Vercel configuration uses `bun install --frozen-lockfile`, `bun run build` and output directory `dist`; building locally does not publish the site.

Unofficial fan research · Full-story spoilers · Not affiliated with Quantic Dream.
