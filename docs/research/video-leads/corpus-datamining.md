# Corpus datamining of the 67 open DetroitBench conflicts

_Research-only pass, 2026-11-09 local environment date; conflict snapshot identifies itself as updated 2026-11-10. No benchmark, tests, CONFLICTS.md or SOURCES.md edits; no commit._

## Result and scope

**0 settled, 46 partially settled, 21 not settled. No immediate benchmark behavior change is justified by this pass.** Partial means the named inputs, branch distinctions or qualitative conditions are evidenced; it does not mean the requested discriminating observation is complete. This pass does not downgrade earlier video observations. Each item below gives its own verdict and exact no-change recommendation.

The strongest additions are structural: Jericho’s gauge is internally `GUI.GAUGE.LEADER`, not `JERICHO`; Midnight Train has a four-item evidence HUD separate from suspicion; Zlatko’s recovery text has ten progressively restored name strings, not a ten-memory threshold; Capitol Park distinguishes ordinary, consistent and outstanding feedback; the Alice below-WARM annotation is nested inside a narrower condition; North’s Companion heart donation and later store retreat are separate gates. None reveals the hidden formulas under dispute.

## Corpus, provenance and how to reproduce

The source inventory in [SOURCES.md](../SOURCES.md#11-detroitbecometext-transcript-github-source-strongly-recommended) identifies [detroitbecometext](https://github.com/detroitbecometext/detroitbecometext.github.io). Downloaded source tree commit: `932160cdbed5e5fa13fdc8168b0c6fd09161fe7d`. All 209 retained source files match the Git blob SHA in that tree; SHA-256 and blob hashes are in the external `manifest.json`. This is a source snapshot, not a claim about an operator’s game patch.

Corpus root **C** = `/Users/pelicannurse/.t3/detroitbench-tools/corpus/`. The download includes all Angular HTML/TypeScript under `src/app`, all chapter parts, Crossroads intro, dirty-bomb section, endings, enums, relation rendering and magazine service, plus `public/i18n/en.json` (25,923 leaves). No chapter filter is applied to any item query. `tree.json`, `manifest.json`, `en.flat.txt`, `items.json`, `semantic-units.json`, `search-results.json`, `mine.py` and `build_report.py` are retained outside the repository. PowerPyx source snapshots/extracts and their URL mapping are under `secondary/powerpyx/` and `powerpyx-manifest.json`; missing pages were fetched, existing first-pass extracts reused.

**Two evidence tiers:** dotted string paths and their leaf values are extracted localization; HTML conditions, IF/ELSE-equivalent content groups and arrow annotations are a human reconstruction. The Angular source is a transcript website, not the game’s execution engine. No recovered game state-variable table is present. The “condition needed” names below are conceptual descriptions, never claimed recovered variable identifiers. A key such as `SAWENOUGHMEMORIES` names a displayed node, not the implementation of its predicate.

**Search and quotation contract:** Each item prints its case-insensitive identifier/value regex and semantic regex. The former is run over every flattened English key/value and every HTML/TS source line; the latter is run over all condition blocks, unlock annotations, headings and arrow blocks. All hit lines for those declared searches are quoted below, without result limits. String hits quote the complete dotted identifier verbatim in the derived flattening and give both flatten and original JSON line numbers. Non-narrative label/HUD hits also quote the original JSON leaf line. Narrative dialogue is not transcribed; its complete original value remains at the cited JSON line. Thus an identifier hit is a verbatim identifier quotation, not a fabricated statement of its gameplay condition. HTML/TS hits quote the exact non-indentation source text; `[CUT]` marks a location inside `app-unused-content` and must never be used as shipped reachability evidence; semantic-block context includes every source line of the matched block. Selected bounded source excerpts additionally retain the nesting, nearby arrow or menu pointer discussed in the verdict. Overlapping hits on one source line are deduplicated. This does not claim that all conceivable aliases have been discovered.

For example, `E:4238 / J:...` means line 4238 of `C/en.flat.txt`, with the original location in `C/public/i18n/en.json`. `Tnn:L` resolves through the file table below. All references are 1-based. The selected PowerPyx excerpts are short and appear once, with reusable IDs; their adjoining cross-checks paraphrase the longer recipe. Flowchart checks use the chapter README’s recorded image inventory and node-check conclusions, not newly measured gameplay or a claim that every chart image was re-inspected in this pass.

Run `python3 C/mine.py` followed by `python3 C/build_report.py` after replacing `C` with the absolute root above to reproduce the search index and this report from the preserved snapshot. The scripts do not change implementation files.

### File aliases

| Alias | Path relative to C |
|---|---|
| E | `en.flat.txt` (derived dotted keys) |
| J | `public/i18n/en.json` (original strings) |
| T01 | `src/app/chapters/components/chapter-contents/1-the-hostage-chapter-content/the-hostage-chapter-content.component.html` |
| T02 | `src/app/chapters/components/chapter-contents/10-fugitives-chapter-content/fugitives-chapter-content.component.html` |
| T03 | `src/app/chapters/components/chapter-contents/11-from-the-dead-chapter-content/from-the-dead-chapter-content.component.html` |
| T04 | `src/app/chapters/components/chapter-contents/12-waiting-for-hank-chapter-content/waiting-for-hank-chapter-content.component.html` |
| T05 | `src/app/chapters/components/chapter-contents/13-on-the-run-chapter-content/on-the-run-chapter-content.component.html` |
| T06 | `src/app/chapters/components/chapter-contents/15-the-nest-chapter-content/the-nest-chapter-content.component.html` |
| T07 | `src/app/chapters/components/chapter-contents/16-time-to-decide-chapter-content/time-to-decide-chapter-content.component.html` |
| T08 | `src/app/chapters/components/chapter-contents/17-zlatko-chapter-content/zlatko-chapter-content.component.html` |
| T09 | `src/app/chapters/components/chapter-contents/18-russian-roulette-chapter-content/russian-roulette-chapter-content.component.html` |
| T10 | `src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html` |
| T11 | `src/app/chapters/components/chapter-contents/20-eden-club-chapter-content/eden-club-chapter-content.component.html` |
| T12 | `src/app/chapters/components/chapter-contents/21-pirates-cove-chapter-content/pirates-cove-chapter-content.component.html` |
| T13 | `src/app/chapters/components/chapter-contents/22-the-bridge-chapter-content/the-bridge-chapter-content.component.html` |
| T14 | `src/app/chapters/components/chapter-contents/23-stratford-tower-chapter-content/stratford-tower-chapter-content.component.html` |
| T15 | `src/app/chapters/components/chapter-contents/24-public-enemy-chapter-content/public-enemy-chapter-content.component.html` |
| T16 | `src/app/chapters/components/chapter-contents/25-midnight-train-chapter-content/midnight-train-chapter-content.component.html` |
| T17 | `src/app/chapters/components/chapter-contents/26-capitol-park-chapter-content/capitol-park-chapter-content.component.html` |
| T18 | `src/app/chapters/components/chapter-contents/27-meet-kamski-chapter-content/meet-kamski-chapter-content.component.html` |
| T19 | `src/app/chapters/components/chapter-contents/28-freedom-march-chapter-content/freedom-march-chapter-content.component.html` |
| T20 | `src/app/chapters/components/chapter-contents/29-last-chance-connor-chapter-content/last-chance-connor-chapter-content.component.html` |
| T21 | `src/app/chapters/components/chapter-contents/30-crossroads-intro/screens/screens.component.html` |
| T22 | `src/app/chapters/components/chapter-contents/30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html` |
| T23 | `src/app/chapters/components/chapter-contents/30.2-crossroads-connor-chapter-content/crossroads-connor-chapter-content.component.html` |
| T24 | `src/app/chapters/components/chapter-contents/30.3-crossroads-markus-chapter-content/crossroads-markus-chapter-content.component.html` |
| T25 | `src/app/chapters/components/chapter-contents/31.1-night-soul-markus-chapter-content/night-soul-markus-chapter-content.component.html` |
| T26 | `src/app/chapters/components/chapter-contents/31.2-night-soul-connor-chapter-content/night-soul-connor-chapter-content.component.html` |
| T27 | `src/app/chapters/components/chapter-contents/32.1-kara-leaving-detroit-chapter-content/kara-leaving-detroit-chapter-content.component.html` |
| T28 | `src/app/chapters/components/chapter-contents/32.2-kara-captured-chapter-content/kara-captured-chapter-content.component.html` |
| T29 | `src/app/chapters/components/chapter-contents/32.3-connors-last-mission-chapter-content/connors-last-mission-chapter-content.component.html` |
| T30 | `src/app/chapters/components/chapter-contents/32.4-connor-cyberlife-tower-chapter-content/connor-cyberlife-tower-chapter-content.component.html` |
| T31 | `src/app/chapters/components/chapter-contents/32.5-markus-demonstration-chapter-content/markus-demonstration-chapter-content.component.html` |
| T32 | `src/app/chapters/components/chapter-contents/32.6-markus-revolution-chapter-content/markus-revolution-chapter-content.component.html` |
| T33 | `src/app/chapters/components/chapter-contents/4-new-home-chapter-content/new-home-chapter-content.component.html` |
| T34 | `src/app/chapters/components/chapter-contents/5-painter-chapter-content/painter-chapter-content.component.html` |
| T35 | `src/app/chapters/components/chapter-contents/6-partners-chapter-content/partners-chapter-content.component.html` |
| T36 | `src/app/chapters/components/chapter-contents/7-stormy-night-chapter-content/stormy-night-chapter-content.component.html` |
| T37 | `src/app/chapters/components/chapter-contents/8-broken-chapter-content/broken-chapter-content.component.html` |
| T38 | `src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html` |
| T39 | `src/app/chapters/components/chapter-toc/chapter-toc.component.html` |
| T40 | `src/app/chapters/pages/endings/endings.component.html` |
| T41 | `src/app/layout/info-dialog/info-dialog.component.html` |
| T42 | `src/app/shared/enums/relation-name.enum.ts` |
| T43 | `src/app/shared/services/magazine.service.ts` |

### PowerPyx cross-check excerpts

- **PP06-1** — [partners-walkthrough-100](https://www.powerpyx.com/detroit-become-human-partners-walkthrough-100/), `C/secondary/powerpyx/pp-partners.txt:95`: “approximately five minutes”. The timeout recipe does not test continuing after 10/10.
- **PP09-1** — [the-interrogation-walkthrough-100](https://www.powerpyx.com/detroit-become-human-the-interrogation-walkthrough-100/), `C/secondary/powerpyx/pp-the-interrogation.txt:111`: “above 50%”. This stress recipe does not specify an early per-press stopping test.
- **PP09-2** — [the-interrogation-walkthrough-100](https://www.powerpyx.com/detroit-become-human-the-interrogation-walkthrough-100/), `C/secondary/powerpyx/pp-the-interrogation.txt:136`: “GIVE UP at any time”. The broad death description does not isolate failed-pressure plus one intervention.
- **PP10-1** — [fugitives-walkthrough-100](https://www.powerpyx.com/detroit-become-human-fugitives-walkthrough-100/), `C/secondary/powerpyx/pp-fugitives.txt:21`: “You are forced to talk”. The encounter is described as forced, without a shelter-commit prerequisite.
- **PP10-2** — [fugitives-walkthrough-100](https://www.powerpyx.com/detroit-become-human-fugitives-walkthrough-100/), `C/secondary/powerpyx/pp-fugitives.txt:122`: “either side of the fence”. This is the shop cutter condition, not a decoded generator lock.
- **PP11-1** — [from-the-dead-walkthrough-100](https://www.powerpyx.com/detroit-become-human-from-the-dead-walkthrough-100/), `C/secondary/powerpyx/pp-from-the-dead.txt:33`: “Find Audio Processor”. The walkthrough orders repairs and the encounter; it publishes no availability expression.
- **PP12-1** — [waiting-for-hank-walkthrough-100](https://www.powerpyx.com/detroit-become-human-waiting-for-hank-walkthrough-100/), `C/secondary/powerpyx/pp-waiting-for-hank.txt:17`: “Amanda”. No successful-probe-survivor-specific Amanda delta is given in this selected chapter source.
- **PP13-1** — [on-the-run-walkthrough-100](https://www.powerpyx.com/detroit-become-human-on-the-run-walkthrough-100/), `C/secondary/powerpyx/pp-on-the-run.txt:169`: “a few seconds back”. The Ralph threat wording points to breakfast, not explicitly to a persistent Fugitives flag.
- **PP13-2** — [on-the-run-walkthrough-100](https://www.powerpyx.com/detroit-become-human-on-the-run-walkthrough-100/), `C/secondary/powerpyx/pp-on-the-run.txt:64`: “Draw a Bath for Alice”. The walkthrough lists the bath route without establishing an active pre-bath TV guard.
- **PP14-1** — [jericho-walkthrough-100](https://www.powerpyx.com/detroit-become-human-jericho-walkthrough-100/), `C/secondary/powerpyx/pp-jericho.txt:22`: “ran across the highway”. Check the highway-dependent magazine wording against the disputed VANISHED history; no controlled cover result follows.
- **PP15-1** — [the-nest-walkthrough-100](https://www.powerpyx.com/detroit-become-human-the-nest-walkthrough-100/), `C/secondary/powerpyx/pp-the-nest.txt:79`: “climbed up into the ceiling”. The cage reconstruction supplies this inference; it does not list a minimal prerequisite formula.
- **PP17-1** — [zlatko-walkthrough-100](https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/), `C/secondary/powerpyx/pp-zlatko.txt:124`: “Only available, if slept in Squat”. The rA9/fireplace recipe is broader than an explicit Ralph-carving conversation gate.
- **PP17-2** — [zlatko-walkthrough-100](https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/), `C/secondary/powerpyx/pp-zlatko.txt:132`: “Only available, if escaped”. The TV recipe restricts escape history; the book and pipe entries lack comparable explicit locks.
- **PP19-1** — [spare-parts-walkthrough-100](https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/), `C/secondary/powerpyx/pp-spare-parts.txt:119`: “Run to Fence”. The narrative route does not resolve the crossing alarm/LEAVE edges or publish a fence-failure cutoff.
- **PP23-1** — [the-stratford-tower-walkthrough-100](https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/), `C/secondary/powerpyx/pp-the-stratford-tower.txt:179`: “Triggers if Simon was wounded”. This broader injury condition conflicts with the template nesting; the guard-only control remains needed.
- **PP23-2** — [the-stratford-tower-walkthrough-100](https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/), `C/secondary/powerpyx/pp-the-stratford-tower.txt:195`: “calm start”. The recommended peaceful recipe combines opening and ending rather than testing a mixed speech.
- **PP25-1** — [midnight-train-walkthrough-100](https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/), `C/secondary/powerpyx/pp-midnight-train.txt:66`: “roughly 50 seconds”. A timer recipe is not an action-count conversion.
- **PP25-2** — [midnight-train-walkthrough-100](https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/), `C/secondary/powerpyx/pp-midnight-train.txt:125`: “WASHING MACHINE”. The safe recipe combines multiple controls, so it does not reveal suspicion weights.
- **PP25-3** — [midnight-train-walkthrough-100](https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/), `C/secondary/powerpyx/pp-midnight-train.txt:107`: “DOG”. The suspicious recipe also leaves evidence and other aggravating inputs.
- **PP25-4** — [midnight-train-walkthrough-100](https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/), `C/secondary/powerpyx/pp-midnight-train.txt:12`: “Check on Alice”. Listing the interaction is not proof of its availability after TAKE ALICE OUTSIDE.
- **PP26-1** — [capitol-park-walkthrough-100](https://www.powerpyx.com/detroit-become-human-capitol-park-walkthrough-100/), `C/secondary/powerpyx/pp-capitol-park.txt:124`: “keep the bar at 50/50”. This fail-message recipe uses no actions; it does not settle an active 55/45 outcome.
- **PP26-2** — [capitol-park-walkthrough-100](https://www.powerpyx.com/detroit-become-human-capitol-park-walkthrough-100/), `C/secondary/powerpyx/pp-capitol-park.txt:105`: “molotov”. A listed action/recipe does not publish the offer predicate or force-violent override.
- **PP27-1** — [meet-kamski-walkthrough-100](https://www.powerpyx.com/detroit-become-human-meet-kamski-walkthrough-100/), `C/secondary/powerpyx/pp-meet-kamski.txt:28`: “Chris Survived”. Killed/spared outcomes do not describe the no-officers fled path.
- **PP28-1** — [freedom-march-walkthrough-100](https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/), `C/secondary/powerpyx/pp-freedom-march.txt:155`: “positive (friendly)”. The Simon-rescue recipe does not demonstrate the Neutral boundary.
- **PP28-2** — [freedom-march-walkthrough-100](https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/), `C/secondary/powerpyx/pp-freedom-march.txt:49`: “Convert”. No group-size or reward-at-ten counter is published by this recipe.
- **PP29-1** — [last-chance-connor-walkthrough-100](https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/), `C/secondary/powerpyx/pp-last-chance-connor.txt:51`: “at least one deviant’s body”. The body-based sufficiency claim does not establish that Carlos alone works.
- **PP29-2** — [last-chance-connor-walkthrough-100](https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/), `C/secondary/powerpyx/pp-last-chance-connor.txt:220`: “(most of)”. A qualitative QTE tolerance statement, not a missed-input cutoff.
- **PP30-1** — [crossroads-markus-walkthrough-100](https://www.powerpyx.com/detroit-become-human-crossroads-markus-walkthrough-100/), `C/secondary/powerpyx/pp-crossroads-markus.txt:72`: “third bullet”. This is the disputed fatal-hit claim, not a decoded counter initialization.
- **PP31-1** — [night-of-the-soul-walkthrough-100](https://www.powerpyx.com/detroit-become-human-night-of-the-soul-walkthrough-100/), `C/secondary/powerpyx/pp-night-of-the-soul.txt:152`: “Only if Markus died in Crossroads chapter.”. The Josh interaction condition does not cover living ousted Markus.
- **PP32-1** — [battle-for-detroit-markus-walkthrough-100](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-markus-walkthrough-100/), `C/secondary/powerpyx/pp-battle-for-detroit-markus.txt:228`: “either Lovers or Companion”. The revolution store condition is broader than the disputed Lover-only/player reports.
- **PP32-2** — [battle-for-detroit-markus-walkthrough-100](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-markus-walkthrough-100/), `C/secondary/powerpyx/pp-battle-for-detroit-markus.txt:93`: “lovers”. A relationship qualifier is not a numeric threshold or proof of the non-Lover bullet control.
- **PP32C-1** — [battle-for-detroit-connor-walkthrough-100](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-connor-walkthrough-100/), `C/secondary/powerpyx/pp-battle-for-detroit-connor-comments.txt:64`: “asked twice about Hank’s son”. A reader-provided requirement, distinct from the article’s simple Talk About Hank’s Son / Give Up sequence. It does not identify whether the Friend band is evaluated before or after the arrival decrease.

### Completed-flowchart README checks

- **FC06** — [ch06 README](../../flowcharts/ch06/README.md), line 16. The chart has an investigation/timeout split, not a timer-stop condition tied to 10/10.
- **FC09** — [ch09 README](../../flowcharts/ch09/README.md), line 15. Approach and intervention outcomes are distinct; chart labels do not serialize per-input stress predicates.
- **FC10** — [ch10 README](../../flowcharts/ch10/README.md), line 5. Shelter and cutter routes establish reachable events, not every free-roam availability lock.
- **FC11** — [ch11 README](../../flowcharts/ch11/README.md), line 14. The chart names repair and encounter events without an audio-and-eye conjunctive interaction condition.
- **FC12** — [ch12 README](../../flowcharts/ch12/README.md), line 14. Amanda assessment is shown as an event; its probe-route relationship result is not a chart arrow formula.
- **FC13** — [ch13 README](../../flowcharts/ch13/README.md), line 5. Use the completed post-patch chart; legacy localized nodes alone do not add shipped interactions.
- **FC14** — [ch14 README](../../flowcharts/ch14/README.md), line 14. The magazine node does not distinguish every On-the-Run pursuit outcome in its prerequisite text.
- **FC15** — [ch15 README](../../flowcharts/ch15/README.md), line 15. Finding, chase, escape and suicide are separate nodes; the missing conditions concern edges and minimal prerequisites.
- **FC17** — [ch17 README](../../flowcharts/ch17/README.md), line 15. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted.
- **FC19** — [ch19 README](../../flowcharts/ch19/README.md), line 15. The fence/dog junction remains an edge-reading issue; localized outcome names do not fix crossing connections.
- **FC23** — [ch23 README](../../flowcharts/ch23/README.md), line 18. Guard injury and SWAT rescue routes exist; the chart must not be supplemented by an inferred hidden severity variable.
- **FC25** — [ch25 README](../../flowcharts/ch25/README.md), line 15. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed.
- **FC26** — [ch26 README](../../flowcharts/ch26/README.md), line 17. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule.
- **FC27** — [ch27 README](../../flowcharts/ch27/README.md), line 14. The killed/spared prerequisites do not establish which conversation, if any, runs after fleeing before the officers.
- **FC28** — [ch28 README](../../flowcharts/ch28/README.md), line 3. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates.
- **FC29** — [ch29 README](../../flowcharts/ch29/README.md), line 14. The completed alternative charts include the sufficiency split; they do not publish the evidence-admission formula. Use those rather than treating PowerPyx’s 98% zoom as complete.
- **FC30** — [ch30 README](../../flowcharts/ch30/README.md), line 6. Character subcharts show injuries, departures and rescues, not the initialization or update code of shared counters.
- **FC31** — [ch31 README](../../flowcharts/ch31/README.md), line 18. Character outcomes and optional talks are charted; absent-character scene scheduling is not encoded by the localized node labels.
- **FC32** — [ch32 README](../../flowcharts/ch32/README.md), line 54. Store survival, bullet interception and rooftop exit concern separate branches; do not transfer a nearby relationship gate between them.

## Per-item findings

### gauge-01

**Observation to settle:** [attitude threshold] With the operator's retained start −1, purchase +2 and spill −3, does a fresh Partners route without PERSIST finish at Neutral after the car and report ups? _[Partly settled 2026-11-09: fresh +3 header says Neutral, retained Neutral [0,2] says Warm; the separate high-count Warm interval is four. Universal four would instead need spill −4 at start −1, contradicting the operator fit; neither that global width nor spill change was applied. `docs/research/video-evidence/gauges/hank/fGkxdQi8ZcA-01-29-47-partners-header.png`; operator A/B in operator-notes/ch06-partners.md (no operator frames supplied).]_

**Condition needed:** Hank initial offset, Neutral/Warm cut points, buy/spill deltas.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Level-name keys contain no cut points or initial value. RelationType ordinal values are display enum indices, not signed relationship points. Nothing resolves the fresh +3 Neutral versus retained spill fit. No change to start, spill, Neutral or Warm.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.HANK\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Hank\b
```

**All search hits (353 source locations):**

```text
E:762 / J:896  GUI.GAUGE.HANK.NAME
  J:896  "NAME": "HANK",
E:763 / J:897  GUI.GAUGE.HANK.HOSTILE
  J:897  "HOSTILE": "HOSTILE",
E:764 / J:898  GUI.GAUGE.HANK.NEUTRAL
  J:898  "NEUTRAL": "NEUTRAL",
E:765 / J:899  GUI.GAUGE.HANK.FRIEND
  J:899  "FRIEND": "FRIEND",
E:766 / J:900  GUI.GAUGE.HANK.TENSE
  J:900  "TENSE": "TENSE",
E:767 / J:901  GUI.GAUGE.HANK.WARM
  J:901  "WARM": "WARM"
T04:1733  <app-relation
T04:1734  [name]="RelationName.Hank"
T04:1735  [type]="RelationType.SmallDown"
T04:1736  ></app-relation>
T04:2134  <app-relation
T04:2135  [name]="RelationName.Hank"
T04:2136  [type]="RelationType.SmallUp"
T04:2137  ></app-relation>
T04:2170  <app-relation
T04:2171  [name]="RelationName.Hank"
T04:2172  [type]="RelationType.SmallDown"
T04:2173  ></app-relation>
T04:2199  <app-relation
T04:2200  [name]="RelationName.Hank"
T04:2201  [type]="RelationType.SmallUp"
T04:2202  ></app-relation>
T04:2233  <app-relation
T04:2234  [name]="RelationName.Hank"
T04:2235  [type]="RelationType.SmallDown"
T04:2236  ></app-relation>
T06:146  <app-relation
T06:147  [name]="RelationName.Hank"
T06:148  [type]="RelationType.SmallUp"
T06:149  ></app-relation>
T06:355  <app-relation
T06:356  [name]="RelationName.Hank"
T06:357  [type]="RelationType.SmallUp"
T06:358  ></app-relation>
T06:390  <app-relation
T06:391  [name]="RelationName.Hank"
T06:392  [type]="RelationType.SmallUp"
T06:393  ></app-relation>
T06:805  <app-relation
T06:806  [name]="RelationName.Hank"
T06:807  [type]="RelationType.SmallUp"
T06:808  ></app-relation>
T06:825  <app-relation
T06:826  [name]="RelationName.Hank"
T06:827  [type]="RelationType.SmallUp"
T06:828  ></app-relation>
T06:845  <app-relation
T06:846  [name]="RelationName.Hank"
T06:847  [type]="RelationType.SmallDown"
T06:848  ></app-relation>
T06:865  <app-relation
T06:866  [name]="RelationName.Hank"
T06:867  [type]="RelationType.SmallDown"
T06:868  ></app-relation>
T06:889  <app-relation
T06:890  [name]="RelationName.Hank"
T06:891  [type]="RelationType.SmallDown"
T06:892  ></app-relation>
T06:1543  <app-relation
T06:1544  [name]="RelationName.Hank"
T06:1545  [type]="RelationType.LargeDown"
T06:1546  ></app-relation>
T06:1667  <app-relation
T06:1668  [name]="RelationName.Hank"
T06:1669  [type]="RelationType.LargeUp"
T06:1670  ></app-relation>
T09:869  <app-relation
T09:870  [name]="RelationName.Hank"
T09:871  [type]="RelationType.SmallDown"
T09:872  ></app-relation>
T11:720  <app-relation
T11:721  [name]="RelationName.Hank"
T11:722  [type]="RelationType.SmallDown"
T11:723  ></app-relation>
T11:749  <app-relation
T11:750  [name]="RelationName.Hank"
T11:751  [type]="RelationType.SmallDown"
T11:752  ></app-relation>
T11:1008  <app-relation
T11:1009  [name]="RelationName.Hank"
T11:1010  [type]="RelationType.SmallDown"
T11:1011  ></app-relation>
T11:1094  <app-relation
T11:1095  [name]="RelationName.Hank"
T11:1096  [type]="RelationType.SmallDown"
T11:1097  ></app-relation>
T11:1157  <app-relation
T11:1158  [name]="RelationName.Hank"
T11:1159  [type]="RelationType.LargeDown"
T11:1160  ></app-relation>
T11:1221  <app-relation
T11:1222  [name]="RelationName.Hank"
T11:1223  [type]="RelationType.LargeUp"
T11:1224  ></app-relation>
T11:1283  <app-relation
T11:1284  [name]="RelationName.Hank"
T11:1285  [type]="RelationType.LargeDown"
T11:1286  ></app-relation>
T11:1310  <app-relation
T11:1311  [name]="RelationName.Hank"
T11:1312  [type]="RelationType.LargeUp"
T11:1313  ></app-relation>
T13:57  <app-relation
T13:58  [name]="RelationName.Hank"
T13:59  [type]="RelationType.SmallDown"
T13:60  ></app-relation>
T13:382  <app-relation
T13:383  [name]="RelationName.Hank"
T13:384  [type]="RelationType.SmallDown"
T13:385  ></app-relation>
T13:437  <app-relation
T13:438  [name]="RelationName.Hank"
T13:439  [type]="RelationType.SmallDown"
T13:440  ></app-relation>
T13:510  <app-relation
T13:511  [name]="RelationName.Hank"
T13:512  [type]="RelationType.SmallDown"
T13:513  ></app-relation>
T13:529  <app-relation
T13:530  [name]="RelationName.Hank"
T13:531  [type]="RelationType.SmallDown"
T13:532  ></app-relation>
T13:563  <app-relation
T13:564  [name]="RelationName.Hank"
T13:565  [type]="RelationType.SmallUp"
T13:566  ></app-relation>
T13:603  <app-relation
T13:604  [name]="RelationName.Hank"
T13:605  [type]="RelationType.SmallDown"
T13:606  ></app-relation>
T13:626  <app-relation
T13:627  [name]="RelationName.Hank"
T13:628  [type]="RelationType.SmallUp"
T13:629  ></app-relation>
T13:668  <app-relation
T13:669  [name]="RelationName.Hank"
T13:670  [type]="RelationType.SmallDown"
T13:671  ></app-relation>
T13:706  <app-relation
T13:707  [name]="RelationName.Hank"
T13:708  [type]="RelationType.SmallDown"
T13:709  ></app-relation>
T13:729  <app-relation
T13:730  [name]="RelationName.Hank"
T13:731  [type]="RelationType.SmallDown"
T13:732  ></app-relation>
T13:792  <app-relation
T13:793  [name]="RelationName.Hank"
T13:794  [type]="RelationType.SmallDown"
T13:795  ></app-relation>
T13:957  <app-relation
T13:958  [name]="RelationName.Hank"
T13:959  [type]="RelationType.SmallDown"
T13:960  ></app-relation>
T13:980  <app-relation
T13:981  [name]="RelationName.Hank"
T13:982  [type]="RelationType.SmallDown"
T13:983  ></app-relation>
T13:1001  <app-relation
T13:1002  [name]="RelationName.Hank"
T13:1003  [type]="RelationType.SmallDown"
T13:1004  ></app-relation>
T13:1035  <app-relation
T13:1036  [name]="RelationName.Hank"
T13:1037  [type]="RelationType.SmallDown"
T13:1038  ></app-relation>
T15:1629  <app-relation
T15:1630  [name]="RelationName.Hank"
T15:1631  [type]="
T15:1632  RelationType.LargeUp
T15:1633  "
T15:1634  ></app-relation>
T15:1650  <app-relation
T15:1651  [name]="RelationName.Hank"
T15:1652  [type]="
T15:1653  RelationType.LargeUp
T15:1654  "
T15:1655  ></app-relation>
T15:1696  <app-relation
T15:1697  [name]="RelationName.Hank"
T15:1698  [type]="RelationType.SmallDown"
T15:1699  ></app-relation>
T18:20  <app-relation
T18:21  [name]="RelationName.Hank"
T18:22  [type]="RelationType.SmallDown"
T18:23  ></app-relation>
T18:918  <app-relation
T18:919  [name]="RelationName.Hank"
T18:920  [type]="RelationType.LargeDown"
T18:921  ></app-relation>
T18:1140  <app-relation
T18:1141  [name]="RelationName.Hank"
T18:1142  [type]="RelationType.LargeUp"
T18:1143  ></app-relation>
T20:732  <app-relation
T20:733  [name]="RelationName.Hank"
T20:734  [type]="RelationType.SmallDown"
T20:735  ></app-relation>
T20:760  <app-relation
T20:761  [name]="RelationName.Hank"
T20:762  [type]="RelationType.SmallDown"
T20:763  ></app-relation>
T20:812  <app-relation
T20:813  [name]="RelationName.Hank"
T20:814  [type]="RelationType.SmallDown"
T20:815  ></app-relation>
T20:1041  <app-relation
T20:1042  [name]="RelationName.Hank"
T20:1043  [type]="
T20:1044  RelationType.SmallUp
T20:1045  "
T20:1046  ></app-relation>
T20:1074  <app-relation
T20:1075  [name]="RelationName.Hank"
T20:1076  [type]="
T20:1077  RelationType.SmallUp
T20:1078  "
T20:1079  ></app-relation>
T20:1126  <app-relation
T20:1127  [name]="RelationName.Hank"
T20:1128  [type]="
T20:1129  RelationType.SmallUp
T20:1130  "
T20:1131  ></app-relation>
T20:1501  <app-relation
T20:1502  [name]="RelationName.Hank"
T20:1503  [type]="RelationType.SmallUp"
T20:1504  ></app-relation>
T20:1706  <app-relation
T20:1707  [name]="
T20:1708  RelationName.Hank
T20:1709  "
T20:1710  [type]="
T20:1711  RelationType.SmallUp
T20:1712  "
T20:1713  ></app-relation>
T20:1741  <app-relation
T20:1742  [name]="
T20:1743  RelationName.Hank
T20:1744  "
T20:1745  [type]="
T20:1746  RelationType.SmallUp
T20:1747  "
T20:1748  ></app-relation>
T20:1820  <app-relation
T20:1821  [name]="RelationName.Hank"
T20:1822  [type]="
T20:1823  RelationType.SmallDown
T20:1824  "
T20:1825  ></app-relation>
T20:1853  <app-relation
T20:1854  [name]="RelationName.Hank"
T20:1855  [type]="
T20:1856  RelationType.SmallDown
T20:1857  "
T20:1858  ></app-relation>
T20:1886  <app-relation
T20:1887  [name]="RelationName.Hank"
T20:1888  [type]="
T20:1889  RelationType.SmallDown
T20:1890  "
T20:1891  ></app-relation>
T20:1952  <app-relation
T20:1953  [name]="RelationName.Hank"
T20:1954  [type]="
T20:1955  RelationType.SmallDown
T20:1956  "
T20:1957  ></app-relation>
T20:1985  <app-relation
T20:1986  [name]="RelationName.Hank"
T20:1987  [type]="
T20:1988  RelationType.SmallDown
T20:1989  "
T20:1990  ></app-relation>
T20:2056  <app-relation
T20:2057  [name]="RelationName.Hank"
T20:2058  [type]="
T20:2059  RelationType.SmallDown
T20:2060  "
T20:2061  ></app-relation>
T20:2089  <app-relation
T20:2090  [name]="RelationName.Hank"
T20:2091  [type]="
T20:2092  RelationType.SmallDown
T20:2093  "
T20:2094  ></app-relation>
T35:192  <app-relation
T35:193  [name]="RelationName.Hank"
T35:194  [type]="RelationType.SmallDown"
T35:195  ></app-relation>
T35:225  <app-relation
T35:226  [name]="RelationName.Hank"
T35:227  [type]="RelationType.SmallDown"
T35:228  ></app-relation>
T35:263  <app-relation
T35:264  [name]="RelationName.Hank"
T35:265  [type]="RelationType.LargeDown"
T35:266  ></app-relation>
T35:297  <app-relation
T35:298  [name]="RelationName.Hank"
T35:299  [type]="RelationType.LargeUp"
T35:300  ></app-relation>
T35:361  <app-relation
T35:362  [name]="RelationName.Hank"
T35:363  [type]="RelationType.SmallUp"
T35:364  ></app-relation>
T35:377  <app-relation
T35:378  [name]="RelationName.Hank"
T35:379  [type]="RelationType.SmallDown"
T35:380  ></app-relation>
T35:403  <app-relation
T35:404  [name]="RelationName.Hank"
T35:405  [type]="RelationType.SmallUp"
T35:406  ></app-relation>
T35:916  <app-relation
T35:917  [name]="RelationName.Hank"
T35:918  [type]="RelationType.SmallDown"
T35:919  ></app-relation>
T35:987  <app-relation
T35:988  [name]="RelationName.Hank"
T35:989  [type]="RelationType.SmallDown"
T35:990  ></app-relation>
T35:1267  <app-relation
T35:1268  [name]="RelationName.Hank"
T35:1269  [type]="RelationType.SmallUp"
T35:1270  ></app-relation>
T35:1324  <app-relation
T35:1325  [name]="RelationName.Hank"
T35:1326  [type]="RelationType.SmallUp"
T35:1327  ></app-relation>
T35:1374  <app-relation
T35:1375  [name]="RelationName.Hank"
T35:1376  [type]="RelationType.SmallDown"
T35:1377  ></app-relation>
T38:931  <app-relation
T38:932  [name]="RelationName.Hank"
T38:933  [type]="RelationType.SmallUp"
T38:934  ></app-relation>
T38:1385  <app-relation
T38:1386  [type]="
T38:1387  RelationType.SmallDown
T38:1388  "
T38:1389  [name]="RelationName.Hank"
T38:1390  ></app-relation>
T38:1460  <app-relation
T38:1461  [type]="RelationType.SmallUp"
T38:1462  [name]="RelationName.Hank"
T38:1463  ></app-relation>
T41:45  <app-relation
T41:46  [name]="RelationName.Hank"
T41:47  [type]="RelationType.LargeUp"
T41:48  ></app-relation>
T42:2  Hank = 'GUI.GAUGE.HANK.NAME',
```

### gauge-02

**Observation to settle:** [attitude threshold] Does a controlled Alice replay reproduce Neutral/Warm/Trusted/Family at net 2/3/6/10? _[Partly settled 2026-11-09: joint nonuniform video model fits key=2 and eight-up Trusted, but Neutral/Trusted counts are moderate. Warm=3 alone on the retained six-level ladder would put eight ups below Trusted, contradicting the operator reading; the filmed one-small Trusted→Warm also leaves Close unresolved. No numeric adoption. Frames and both readings: SOURCES.md §13.]_

**Condition needed:** Alice initial offset, key threshold, Neutral/Warm/Trusted/Family boundaries and possible Close band.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** CLOSE exists beside NEUTRAL/WARM/TRUSTED/FAMILY, but existence does not establish use or order. No net-2/3/6/10 boundary is serialized here. No change to Alice bands or key threshold.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.ALICE\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Alice\b
```

**All search hits (252 source locations):**

```text
E:771 / J:909  GUI.GAUGE.ALICE.NAME
  J:909  "NAME": "ALICE",
E:772 / J:910  GUI.GAUGE.ALICE.DISTANT
  J:910  "DISTANT": "DISTANT",
E:773 / J:911  GUI.GAUGE.ALICE.WARM
  J:911  "WARM": "WARM",
E:774 / J:912  GUI.GAUGE.ALICE.CLOSE
  J:912  "CLOSE": "CLOSE",
E:775 / J:913  GUI.GAUGE.ALICE.FAMILY
  J:913  "FAMILY": "FAMILY",
E:776 / J:914  GUI.GAUGE.ALICE.NEUTRAL
  J:914  "NEUTRAL": "NEUTRAL",
E:777 / J:915  GUI.GAUGE.ALICE.TRUSTED
  J:915  "TRUSTED": "TRUSTED"
T02:181  <app-relation
T02:182  [type]="RelationType.LargeDown"
T02:183  [name]="RelationName.Alice"
T02:184  ></app-relation>
T02:675  <app-relation
T02:676  [name]="RelationName.Alice"
T02:677  [type]="RelationType.SmallUp"
T02:678  ></app-relation>
T02:686  <app-relation
T02:687  [name]="RelationName.Alice"
T02:688  [type]="RelationType.SmallDown"
T02:689  ></app-relation>
T02:789  <app-relation
T02:790  [name]="RelationName.Alice"
T02:791  [type]="RelationType.SmallUp"
T02:792  ></app-relation>
T02:868  <app-relation
T02:869  [name]="RelationName.Alice"
T02:870  [type]="RelationType.SmallDown"
T02:871  ></app-relation>
T02:973  <app-relation
T02:974  [name]="RelationName.Alice"
T02:975  [type]="RelationType.SmallUp"
T02:976  ></app-relation>
T02:1010  <app-relation
T02:1011  [name]="RelationName.Alice"
T02:1012  [type]="RelationType.SmallDown"
T02:1013  ></app-relation>
T02:1201  <app-relation
T02:1202  [name]="RelationName.Alice"
T02:1203  [type]="RelationType.SmallDown"
T02:1204  ></app-relation>
T02:1238  <app-relation
T02:1239  [name]="RelationName.Alice"
T02:1240  [type]="RelationType.SmallUp"
T02:1241  ></app-relation>
T02:1500  <app-relation
T02:1501  [name]="RelationName.Alice"
T02:1502  [type]="RelationType.SmallUp"
T02:1503  ></app-relation>
T02:1519  <app-relation
T02:1520  [name]="RelationName.Alice"
T02:1521  [type]="RelationType.SmallDown"
T02:1522  ></app-relation>
T02:1979  <app-relation
T02:1980  [name]="RelationName.Alice"
T02:1981  [type]="RelationType.SmallUp"
T02:1982  ></app-relation>
T02:1998  <app-relation
T02:1999  [name]="RelationName.Alice"
T02:2000  [type]="RelationType.SmallDown"
T02:2001  ></app-relation>
T02:2073  <app-relation
T02:2074  [name]="RelationName.Alice"
T02:2075  [type]="RelationType.LargeDown"
T02:2076  ></app-relation>
T02:2112  <app-relation
T02:2113  [name]="RelationName.Alice"
T02:2114  [type]="RelationType.SmallUp"
T02:2115  ></app-relation>
T02:2131  <app-relation
T02:2132  [name]="RelationName.Alice"
T02:2133  [type]="RelationType.SmallDown"
T02:2134  ></app-relation>
T05:357  <app-relation
T05:358  [name]="RelationName.Alice"
T05:359  [type]="RelationType.SmallUp"
T05:360  ></app-relation>
T05:476  <app-relation
T05:477  [name]="RelationName.Alice"
T05:478  [type]="RelationType.SmallUp"
T05:479  ></app-relation>
T05:503  <app-relation
T05:504  [name]="RelationName.Alice"
T05:505  [type]="RelationType.SmallDown"
T05:506  ></app-relation>
T05:1126  <app-relation
T05:1127  [name]="RelationName.Alice"
T05:1128  [type]="RelationType.SmallUp"
T05:1129  ></app-relation>
T05:1145  <app-relation
T05:1146  [name]="RelationName.Alice"
T05:1147  [type]="RelationType.SmallUp"
T05:1148  ></app-relation>
T05:1441  <app-relation
T05:1442  [name]="RelationName.Alice"
T05:1443  [type]="RelationType.SmallUp"
T05:1444  ></app-relation>
T05:1460  <app-relation
T05:1461  [name]="RelationName.Alice"
T05:1462  [type]="RelationType.SmallUp"
T05:1463  ></app-relation>
T05:1479  <app-relation
T05:1480  [name]="RelationName.Alice"
T05:1481  [type]="RelationType.SmallUp"
T05:1482  ></app-relation>
T05:1498  <app-relation
T05:1499  [name]="RelationName.Alice"
T05:1500  [type]="RelationType.SmallUp"
T05:1501  ></app-relation>
T12:379  <app-relation
T12:380  [name]="RelationName.Alice"
T12:381  [type]="RelationType.SmallUp"
T12:382  ></app-relation>
T12:462  <app-relation
T12:463  [name]="RelationName.Alice"
T12:464  [type]="RelationType.SmallUp"
T12:465  ></app-relation>
T12:506  <app-relation
T12:507  [name]="RelationName.Alice"
T12:508  [type]="RelationType.SmallUp"
T12:509  ></app-relation>
T16:538  <app-relation
T16:539  [name]="RelationName.Alice"
T16:540  [type]="RelationType.SmallUp"
T16:541  ></app-relation>
T16:1801  <app-relation
T16:1802  [name]="RelationName.Alice"
T16:1803  [type]="RelationType.SmallUp"
T16:1804  ></app-relation>
T22:661  <app-relation
T22:662  [name]="RelationName.Alice"
T22:663  [type]="RelationType.LargeUp"
T22:664  ></app-relation>
T22:693  <app-relation
T22:694  [name]="RelationName.Alice"
T22:695  [type]="RelationType.LargeDown"
T22:696  ></app-relation>
T22:791  <app-relation
T22:792  [name]="RelationName.Alice"
T22:793  [type]="RelationType.LargeUp"
T22:794  ></app-relation>
T22:1000  <app-relation
T22:1001  [name]="RelationName.Alice"
T22:1002  [type]="RelationType.SmallUp"
T22:1003  ></app-relation>
T22:1112  <app-relation
T22:1113  [name]="RelationName.Alice"
T22:1114  [type]="RelationType.SmallDown"
T22:1115  ></app-relation>
T22:1181  <app-relation
T22:1182  [name]="RelationName.Alice"
T22:1183  [type]="RelationType.SmallDown"
T22:1184  ></app-relation>
T22:1243  <app-relation
T22:1244  [name]="RelationName.Alice"
T22:1245  [type]="RelationType.SmallUp"
T22:1246  ></app-relation>
T22:1294  <app-relation
T22:1295  [name]="RelationName.Alice"
T22:1296  [type]="RelationType.SmallDown"
T22:1297  ></app-relation>
T27:95  <app-relation
T27:96  [name]="RelationName.Alice"
T27:97  [type]="RelationType.SmallUp"
T27:98  ></app-relation>
T27:188  <app-relation
T27:189  [name]="RelationName.Alice"
T27:190  [type]="RelationType.SmallDown"
T27:191  ></app-relation>
T27:417  <app-relation
T27:418  [name]="RelationName.Alice"
T27:419  [type]="RelationType.SmallUp"
T27:420  ></app-relation>
T27:547  <app-relation
T27:548  [name]="RelationName.Alice"
T27:549  [type]="RelationType.SmallDown"
T27:550  ></app-relation>
T27:611  <app-relation
T27:612  [name]="RelationName.Alice"
T27:613  [type]="RelationType.SmallUp"
T27:614  ></app-relation>
T27:794  <app-relation
T27:795  [name]="RelationName.Alice"
T27:796  [type]="RelationType.SmallDown"
T27:797  ></app-relation>
T27:1169  <app-relation
T27:1170  [name]="RelationName.Alice"
T27:1171  [type]="RelationType.SmallDown"
T27:1172  ></app-relation>
T27:1233  <app-relation
T27:1234  [name]="RelationName.Alice"
T27:1235  [type]="RelationType.SmallDown"
T27:1236  ></app-relation>
T27:1319  <app-relation
T27:1320  [name]="RelationName.Alice"
T27:1321  [type]="RelationType.SmallDown"
T27:1322  ></app-relation>
T27:1507  <app-relation
T27:1508  [name]="RelationName.Alice"
T27:1509  [type]="RelationType.SmallUp"
T27:1510  ></app-relation>
T27:1600  <app-relation
T27:1601  [name]="RelationName.Alice"
T27:1602  [type]="RelationType.SmallDown"
T27:1603  ></app-relation>
T27:3636  <app-relation
T27:3637  [name]="RelationName.Alice"
T27:3638  [type]="RelationType.SmallDown"
T27:3639  ></app-relation>
T27:3684  <app-relation
T27:3685  [name]="RelationName.Alice"
T27:3686  [type]="RelationType.SmallUp"
T27:3687  ></app-relation>
T33:83  <app-relation
T33:84  [name]="RelationName.Alice"
T33:85  [type]="RelationType.SmallUp"
T33:86  ></app-relation>
T33:155  <app-relation
T33:156  [name]="RelationName.Alice"
T33:157  [type]="RelationType.SmallUp"
T33:158  ></app-relation>
T33:174  <app-relation
T33:175  [name]="RelationName.Alice"
T33:176  [type]="RelationType.SmallUp"
T33:177  ></app-relation>
T33:264  <app-relation
T33:265  [name]="RelationName.Alice"
T33:266  [type]="RelationType.SmallUp"
T33:267  ></app-relation>
T33:396  <app-relation
T33:397  [name]="RelationName.Alice"
T33:398  [type]="RelationType.SmallUp"
T33:399  ></app-relation>
T33:439  <app-relation
T33:440  [name]="RelationName.Alice"
T33:441  [type]="RelationType.SmallUp"
T33:442  ></app-relation>
T33:458  <app-relation
T33:459  [name]="RelationName.Alice"
T33:460  [type]="RelationType.SmallUp"
T33:461  ></app-relation>
T33:480  <app-relation
T33:481  [name]="RelationName.Alice"
T33:482  [type]="RelationType.SmallUp"
T33:483  ></app-relation>
T33:499  <app-relation
T33:500  [name]="RelationName.Alice"
T33:501  [type]="RelationType.SmallUp"
T33:502  ></app-relation>
T33:531  <app-relation
T33:532  [name]="RelationName.Alice"
T33:533  [type]="RelationType.SmallDown"
T33:534  ></app-relation>
T42:4  Alice = 'GUI.GAUGE.ALICE.NAME',
```

### gauge-03

**Observation to settle:** [attitude threshold] How many net small ups after Luther first reaches Trusted reach Family? _[Partly settled 2026-11-09: high local Close→Trusted count is one, applied only to Close; first Close remains +2. Later bands remain unmeasured; gauge-calibration.md, Luther frames 06:01:31 / 06:15:07.5.]_

**Condition needed:** Luther Trusted-to-Family width and initial offset.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** WARY is also localized; neither that key nor the Close/Trusted/Family keys supplies an active ladder or width. Retain measured Close only. No change to Trusted-to-Family width.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.LUTHER\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Luther\b
```

**All search hits (47 source locations):**

```text
E:778 / J:918  GUI.GAUGE.LUTHER.NAME
  J:918  "NAME": "LUTHER",
E:779 / J:919  GUI.GAUGE.LUTHER.NEUTRAL
  J:919  "NEUTRAL": "NEUTRAL",
E:780 / J:920  GUI.GAUGE.LUTHER.CLOSE
  J:920  "CLOSE": "CLOSE",
E:781 / J:921  GUI.GAUGE.LUTHER.FAMILY
  J:921  "FAMILY": "FAMILY",
E:782 / J:922  GUI.GAUGE.LUTHER.TRUSTED
  J:922  "TRUSTED": "TRUSTED",
E:783 / J:923  GUI.GAUGE.LUTHER.WARY
  J:923  "WARY": "WARY"
T12:1110  <app-relation
T12:1111  [name]="RelationName.Luther"
T12:1112  [type]="RelationType.SmallUp"
T12:1113  ></app-relation>
T12:1127  <app-relation
T12:1128  [name]="RelationName.Luther"
T12:1129  [type]="RelationType.SmallUp"
T12:1130  ></app-relation>
T12:1144  <app-relation
T12:1145  [name]="RelationName.Luther"
T12:1146  [type]="RelationType.SmallUp"
T12:1147  ></app-relation>
T16:542  <app-relation
T16:543  [name]="RelationName.Luther"
T16:544  [type]="RelationType.SmallUp"
T16:545  ></app-relation>
T16:1805  <app-relation
T16:1806  [name]="RelationName.Luther"
T16:1807  [type]="RelationType.SmallUp"
T16:1808  ></app-relation>
T22:665  <app-relation
T22:666  [name]="RelationName.Luther"
T22:667  [type]="RelationType.SmallUp"
T22:668  ></app-relation>
T22:1004  <app-relation
T22:1005  [name]="RelationName.Luther"
T22:1006  [type]="RelationType.SmallUp"
T22:1007  ></app-relation>
T27:1276  <app-relation
T27:1277  [name]="RelationName.Luther"
T27:1278  [type]="RelationType.SmallUp"
T27:1279  ></app-relation>
T27:1604  <app-relation
T27:1605  [name]="RelationName.Luther"
T27:1606  [type]="RelationType.SmallUp"
T27:1607  ></app-relation>
T27:3688  <app-relation
T27:3689  [name]="RelationName.Luther"
T27:3690  [type]="RelationType.SmallUp"
T27:3691  ></app-relation>
T42:5  Luther = 'GUI.GAUGE.LUTHER.NAME',
```

### gauge-04

**Observation to settle:** [attitude threshold] Does Amanda remain Trusted after one small decrease directly from the initial state? _[Partly settled 2026-11-09: footage remains Trusted after earlier positive arrows; it does not test this initial decrease, identify a width, or justify an update.]_

**Condition needed:** Amanda initial numeric value and Trusted lower bound.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Trusted/Distrusted/Neutral/Betrayed are localized states, without initial offset or small-down mapping. Prior-positive histories cannot identify the initial-decrease control. No change.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.AMANDA\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Amanda\b
```

**All search hits (158 source locations):**

```text
E:825 / J:983  GUI.GAUGE.AMANDA.TRUSTED
  J:983  "TRUSTED": "TRUSTED",
E:826 / J:984  GUI.GAUGE.AMANDA.DISTRUSTED
  J:984  "DISTRUSTED": "DISTRUSTED",
E:827 / J:985  GUI.GAUGE.AMANDA.NEUTRAL
  J:985  "NEUTRAL": "NEUTRAL",
E:828 / J:986  GUI.GAUGE.AMANDA.BETRAYED
  J:986  "BETRAYED": "BETRAYED",
E:829 / J:987  GUI.GAUGE.AMANDA.NAME
  J:987  "NAME": "AMANDA"
T04:34  <app-relation
T04:35  [name]="RelationName.Amanda"
T04:36  [type]="RelationType.LargeDown"
T04:37  ></app-relation>
T04:80  <app-relation
T04:81  [name]="RelationName.Amanda"
T04:82  [type]="RelationType.LargeUp"
T04:83  ></app-relation>
T04:140  <app-relation
T04:141  [name]="RelationName.Amanda"
T04:142  [type]="RelationType.SmallDown"
T04:143  ></app-relation>
T04:190  <app-relation
T04:191  [name]="RelationName.Amanda"
T04:192  [type]="RelationType.SmallDown"
T04:193  ></app-relation>
T04:454  <app-relation
T04:455  [name]="RelationName.Amanda"
T04:456  [type]="RelationType.SmallDown"
T04:457  ></app-relation>
T04:471  <app-relation
T04:472  [name]="RelationName.Amanda"
T04:473  [type]="RelationType.SmallDown"
T04:474  ></app-relation>
T04:488  <app-relation
T04:489  [name]="RelationName.Amanda"
T04:490  [type]="RelationType.SmallUp"
T04:491  ></app-relation>
T09:45  <app-relation
T09:46  [name]="RelationName.Amanda"
T09:47  [type]="RelationType.LargeDown"
T09:48  ></app-relation>
T09:91  <app-relation
T09:92  [name]="RelationName.Amanda"
T09:93  [type]="RelationType.SmallUp"
T09:94  ></app-relation>
T09:153  <app-relation
T09:154  [name]="RelationName.Amanda"
T09:155  [type]="RelationType.LargeUp"
T09:156  ></app-relation>
T09:184  <app-relation
T09:185  [name]="RelationName.Amanda"
T09:186  [type]="RelationType.SmallDown"
T09:187  ></app-relation>
T09:319  <app-relation
T09:320  [name]="RelationName.Amanda"
T09:321  [type]="RelationType.SmallDown"
T09:322  ></app-relation>
T09:354  <app-relation
T09:355  [name]="RelationName.Amanda"
T09:356  [type]="RelationType.SmallDown"
T09:357  ></app-relation>
T09:593 [CUT]  <app-relation
T09:594 [CUT]  [name]="RelationName.Amanda"
T09:595 [CUT]  [type]="RelationType.SmallDown"
T09:596 [CUT]  />
T09:629 [CUT]  <app-relation
T09:630 [CUT]  [name]="RelationName.Amanda"
T09:631 [CUT]  [type]="RelationType.SmallUp"
T09:632 [CUT]  />
T09:648 [CUT]  <app-relation
T09:649 [CUT]  [name]="RelationName.Amanda"
T09:650 [CUT]  [type]="RelationType.SmallDown"
T09:651 [CUT]  />
T09:683 [CUT]  <app-relation
T09:684 [CUT]  [name]="RelationName.Amanda"
T09:685 [CUT]  [type]="RelationType.SmallDown"
T09:686 [CUT]  />
T15:104  <app-relation
T15:105  [name]="RelationName.Amanda"
T15:106  [type]="RelationType.SmallDown"
T15:107  ></app-relation>
T15:137  <app-relation
T15:138  [name]="RelationName.Amanda"
T15:139  [type]="RelationType.SmallDown"
T15:140  ></app-relation>
T15:170  <app-relation
T15:171  [name]="RelationName.Amanda"
T15:172  [type]="RelationType.SmallUp"
T15:173  ></app-relation>
T15:210  <app-relation
T15:211  [name]="RelationName.Amanda"
T15:212  [type]="RelationType.SmallDown"
T15:213  ></app-relation>
T15:261  <app-relation
T15:262  [name]="RelationName.Amanda"
T15:263  [type]="RelationType.SmallDown"
T15:264  ></app-relation>
T15:340  <app-relation
T15:341  [name]="RelationName.Amanda"
T15:342  [type]="RelationType.LargeDown"
T15:343  ></app-relation>
T15:388  <app-relation
T15:389  [name]="RelationName.Amanda"
T15:390  [type]="RelationType.SmallUp"
T15:391  ></app-relation>
T15:409  <app-relation
T15:410  [name]="RelationName.Amanda"
T15:411  [type]="RelationType.LargeUp"
T15:412  ></app-relation>
T20:32  <app-relation
T20:33  [name]="RelationName.Amanda"
T20:34  [type]="RelationType.LargeUp"
T20:35  ></app-relation>
T20:73  <app-relation
T20:74  [name]="RelationName.Amanda"
T20:75  [type]="RelationType.SmallDown"
T20:76  ></app-relation>
T20:108  <app-relation
T20:109  [name]="RelationName.Amanda"
T20:110  [type]="RelationType.LargeDown"
T20:111  ></app-relation>
T20:129  <app-relation
T20:130  [name]="RelationName.Amanda"
T20:131  [type]="RelationType.SmallUp"
T20:132  ></app-relation>
T20:258  <app-relation
T20:259  [name]="RelationName.Amanda"
T20:260  [type]="RelationType.SmallDown"
T20:261  ></app-relation>
T20:344  <app-relation
T20:345  [name]="RelationName.Amanda"
T20:346  [type]="RelationType.SmallDown"
T20:347  ></app-relation>
T20:413  <app-relation
T20:414  [name]="RelationName.Amanda"
T20:415  [type]="RelationType.LargeDown"
T20:416  ></app-relation>
T20:440  <app-relation
T20:441  [name]="RelationName.Amanda"
T20:442  [type]="RelationType.LargeUp"
T20:443  ></app-relation>
T20:467  <app-relation
T20:468  [name]="RelationName.Amanda"
T20:469  [type]="RelationType.LargeDown"
T20:470  ></app-relation>
T23:430  <app-relation
T23:431  [name]="RelationName.Amanda"
T23:432  [type]="RelationType.LargeDown"
T23:433  ></app-relation>
T23:770  <app-relation
T23:771  [name]="RelationName.Amanda"
T23:772  [type]="RelationType.LargeDown"
T23:773  ></app-relation>
T32:1132  <app-relation
T32:1133  [name]="RelationName.Amanda"
T32:1134  [type]="RelationType.LargeDown"
T32:1135  ></app-relation>
T40:241  <app-relation
T40:242  [name]="RelationName.Amanda"
T40:243  [type]="RelationType.LargeUp"
T40:244  ></app-relation>
T42:11  Amanda = 'GUI.GAUGE.AMANDA.NAME',
```

### gauge-05

**Observation to settle:** [attitude threshold] At what net small count does North first reach Friend on a route with no large arrows? _[Partly settled 2026-11-09: two ups still Neutral falsify width two/bottom start; uniform width ≥3 only. No exact width adopted; North 03:39:23 header in gauge-calibration.md.]_

**Condition needed:** North first-Friend boundary, initial value, small-arrow size.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** FRIEND and COMPANION are distinct from LOVER; no numeric boundary or initial point is present. No change to first Friend.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.NORTH\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.North\b
```

**All search hits (296 source locations):**

```text
E:792 / J:936  GUI.GAUGE.NORTH.NAME
  J:936  "NAME": "NORTH",
E:793 / J:937  GUI.GAUGE.NORTH.LOVER
  J:937  "LOVER": "LOVER",
E:794 / J:938  GUI.GAUGE.NORTH.NEUTRAL
  J:938  "NEUTRAL": "NEUTRAL",
E:795 / J:939  GUI.GAUGE.NORTH.HOSTILE
  J:939  "HOSTILE": "HOSTILE",
E:796 / J:940  GUI.GAUGE.NORTH.FRIEND
  J:940  "FRIEND": "FRIEND",
E:797 / J:941  GUI.GAUGE.NORTH.RESENTFUL
  J:941  "RESENTFUL": "RESENTFUL",
E:798 / J:942  GUI.GAUGE.NORTH.COMPANION
  J:942  "COMPANION": "COMPANION"
T07:273  <app-relation
T07:274  [name]="RelationName.North"
T07:275  [type]="RelationType.SmallUp"
T07:276  ></app-relation>
T07:332  <app-relation
T07:333  [name]="RelationName.North"
T07:334  [type]="RelationType.SmallDown"
T07:335  ></app-relation>
T07:575  <app-relation
T07:576  [name]="RelationName.North"
T07:577  [type]="RelationType.SmallUp"
T07:578  ></app-relation>
T10:133  <app-relation
T10:134  [name]="RelationName.North"
T10:135  [type]="RelationType.SmallDown"
T10:136  ></app-relation>
T10:173  <app-relation
T10:174  [name]="RelationName.North"
T10:175  [type]="RelationType.SmallUp"
T10:176  ></app-relation>
T10:255  <app-relation
T10:256  [name]="RelationName.North"
T10:257  [type]="RelationType.SmallDown"
T10:258  ></app-relation>
T10:259  <app-relation
T10:260  [name]="RelationName.North"
T10:261  [type]="RelationType.SmallDown"
T10:262  ></app-relation>
T10:432  <app-relation
T10:433  [name]="RelationName.North"
T10:434  [type]="RelationType.SmallUp"
T10:435  ></app-relation>
T10:512  <app-relation
T10:513  [name]="RelationName.North"
T10:514  [type]="RelationType.SmallDown"
T10:515  ></app-relation>
T10:654  <app-relation
T10:655  [name]="RelationName.North"
T10:656  [type]="RelationType.SmallUp"
T10:657  ></app-relation>
T10:861  <app-relation
T10:862  [name]="RelationName.North"
T10:863  [type]="RelationType.SmallDown"
T10:864  ></app-relation>
T10:865  <app-relation
T10:866  [name]="RelationName.North"
T10:867  [type]="RelationType.SmallDown"
T10:868  ></app-relation>
T10:986  <app-relation
T10:987  [name]="RelationName.North"
T10:988  [type]="RelationType.SmallDown"
T10:989  ></app-relation>
T10:1093  <app-relation
T10:1094  [name]="RelationName.North"
T10:1095  [type]="RelationType.LargeUp"
T10:1096  ></app-relation>
T10:1137  <app-relation
T10:1138  [name]="RelationName.North"
T10:1139  [type]="RelationType.SmallUp"
T10:1140  ></app-relation>
T10:1183  <app-relation
T10:1184  [name]="RelationName.North"
T10:1185  [type]="RelationType.SmallDown"
T10:1186  ></app-relation>
T10:1229  <app-relation
T10:1230  [name]="RelationName.North"
T10:1231  [type]="RelationType.LargeDown"
T10:1232  ></app-relation>
T14:497  <app-relation
T14:498  [name]="RelationName.North"
T14:499  [type]="RelationType.SmallDown"
T14:500  ></app-relation>
T14:683  <app-relation
T14:684  [name]="RelationName.North"
T14:685  [type]="RelationType.SmallDown"
T14:686  ></app-relation>
T14:851  <app-relation
T14:852  [name]="RelationName.North"
T14:853  [type]="RelationType.SmallUp"
T14:854  ></app-relation>
T14:977  <app-relation
T14:978  [name]="RelationName.North"
T14:979  [type]="RelationType.SmallUp"
T14:980  ></app-relation>
T14:999  <app-relation
T14:1000  [name]="RelationName.North"
T14:1001  [type]="RelationType.SmallDown"
T14:1002  ></app-relation>
T14:1041  <app-relation
T14:1042  [name]="RelationName.North"
T14:1043  [type]="RelationType.SmallUp"
T14:1044  ></app-relation>
T14:1556  <app-relation
T14:1557  [name]="
T14:1558  RelationName.North
T14:1559  "
T14:1560  [type]="
T14:1561  RelationType.SmallUp
T14:1562  "
T14:1563  ></app-relation>
T14:1610  <app-relation
T14:1611  [name]="
T14:1612  RelationName.North
T14:1613  "
T14:1614  [type]="
T14:1615  RelationType.SmallDown
T14:1616  "
T14:1617  ></app-relation>
T17:350  <app-relation
T17:351  [name]="RelationName.North"
T17:352  [type]="RelationType.SmallDown"
T17:353  ></app-relation>
T17:701  <app-relation
T17:702  [name]="RelationName.North"
T17:703  [type]="RelationType.SmallUp"
T17:704  ></app-relation>
T17:719  <app-relation
T17:720  [name]="RelationName.North"
T17:721  [type]="RelationType.SmallDown"
T17:722  ></app-relation>
T17:792  <app-relation
T17:793  [name]="RelationName.North"
T17:794  [type]="RelationType.SmallUp"
T17:795  ></app-relation>
T17:821  <app-relation
T17:822  [name]="RelationName.North"
T17:823  [type]="RelationType.SmallDown"
T17:824  ></app-relation>
T17:882  <app-relation
T17:883  [name]="RelationName.North"
T17:884  [type]="RelationType.SmallDown"
T17:885  ></app-relation>
T17:924  <app-relation
T17:925  [name]="RelationName.North"
T17:926  [type]="RelationType.LargeDown"
T17:927  ></app-relation>
T17:967  <app-relation
T17:968  [name]="RelationName.North"
T17:969  [type]="RelationType.SmallUp"
T17:970  ></app-relation>
T17:1345  <app-relation
T17:1346  [name]="RelationName.North"
T17:1347  [type]="RelationType.LargeUp"
T17:1348  ></app-relation>
T17:1415  <app-relation
T17:1416  [name]="RelationName.North"
T17:1417  [type]="RelationType.SmallUp"
T17:1418  ></app-relation>
T17:1459  <app-relation
T17:1460  [name]="RelationName.North"
T17:1461  [type]="RelationType.SmallDown"
T17:1462  ></app-relation>
T17:1492  <app-relation
T17:1493  [name]="RelationName.North"
T17:1494  [type]="RelationType.SmallUp"
T17:1495  ></app-relation>
T17:1581  <app-relation
T17:1582  [name]="RelationName.North"
T17:1583  [type]="RelationType.SmallDown"
T17:1584  ></app-relation>
T17:1695  <app-relation
T17:1696  [name]="RelationName.North"
T17:1697  [type]="RelationType.SmallUp"
T17:1698  ></app-relation>
T17:1810  <app-relation
T17:1811  [name]="RelationName.North"
T17:1812  [type]="RelationType.SmallUp"
T17:1813  ></app-relation>
T19:251  <app-relation
T19:252  [name]="RelationName.North"
T19:253  [type]="RelationType.SmallUp"
T19:254  ></app-relation>
T19:268  <app-relation
T19:269  [name]="RelationName.North"
T19:270  [type]="RelationType.SmallUp"
T19:271  ></app-relation>
T19:285  <app-relation
T19:286  [name]="RelationName.North"
T19:287  [type]="RelationType.SmallDown"
T19:288  ></app-relation>
T19:302  <app-relation
T19:303  [name]="RelationName.North"
T19:304  [type]="RelationType.SmallDown"
T19:305  ></app-relation>
T19:324  <app-relation
T19:325  [name]="RelationName.North"
T19:326  [type]="RelationType.SmallUp"
T19:327  ></app-relation>
T19:384  <app-relation
T19:385  [name]="RelationName.North"
T19:386  [type]="RelationType.SmallUp"
T19:387  ></app-relation>
T19:405  <app-relation
T19:406  [name]="RelationName.North"
T19:407  [type]="RelationType.SmallUp"
T19:408  ></app-relation>
T19:426  <app-relation
T19:427  [name]="RelationName.North"
T19:428  [type]="RelationType.SmallDown"
T19:429  ></app-relation>
T19:454  <app-relation
T19:455  [name]="RelationName.North"
T19:456  [type]="RelationType.SmallUp"
T19:457  ></app-relation>
T19:482  <app-relation
T19:483  [name]="RelationName.North"
T19:484  [type]="RelationType.SmallUp"
T19:485  ></app-relation>
T19:504  <app-relation
T19:505  [name]="RelationName.North"
T19:506  [type]="RelationType.SmallDown"
T19:507  ></app-relation>
T19:551  <app-relation
T19:552  [name]="RelationName.North"
T19:553  [type]="
T19:554  RelationType.LargeUp
T19:555  "
T19:556  ></app-relation>
T19:587  <app-relation
T19:588  [name]="RelationName.North"
T19:589  [type]="RelationType.SmallDown"
T19:590  ></app-relation>
T19:1527  <app-relation
T19:1528  [name]="RelationName.North"
T19:1529  [type]="RelationType.SmallDown"
T19:1530  ></app-relation>
T19:1770  <app-relation
T19:1771  [name]="RelationName.North"
T19:1772  [type]="RelationType.LargeDown"
T19:1773  ></app-relation>
T19:1911  <app-relation
T19:1912  [name]="RelationName.North"
T19:1913  [type]="RelationType.LargeDown"
T19:1914  ></app-relation>
T24:328  <app-relation
T24:329  [name]="RelationName.North"
T24:330  [type]="RelationType.SmallUp"
T24:331  ></app-relation>
T24:399  <app-relation
T24:400  [name]="RelationName.North"
T24:401  [type]="RelationType.SmallDown"
T24:402  ></app-relation>
T24:471  <app-relation
T24:472  [name]="RelationName.North"
T24:473  [type]="RelationType.SmallDown"
T24:474  ></app-relation>
T24:734  <app-relation
T24:735  [name]="RelationName.North"
T24:736  [type]="
T24:737  RelationType.LargeDown
T24:738  "
T24:739  ></app-relation>
T24:1778  <app-relation
T24:1779  [name]="RelationName.North"
T24:1780  [type]="RelationType.SmallUp"
T24:1781  ></app-relation>
T24:2005  <app-relation
T24:2006  [name]="RelationName.North"
T24:2007  [type]="RelationType.LargeUp"
T24:2008  ></app-relation>
T25:913  <app-relation
T25:914  [name]="RelationName.North"
T25:915  [type]="RelationType.SmallUp"
T25:916  ></app-relation>
T25:1070  <app-relation
T25:1071  [name]="RelationName.North"
T25:1072  [type]="RelationType.SmallUp"
T25:1073  ></app-relation>
T25:1205  <app-relation
T25:1206  [name]="RelationName.North"
T25:1207  [type]="RelationType.SmallDown"
T25:1208  ></app-relation>
T25:1232  <app-relation
T25:1233  [name]="RelationName.North"
T25:1234  [type]="RelationType.SmallUp"
T25:1235  ></app-relation>
T32:853  <app-relation
T32:854  [name]="RelationName.North"
T32:855  [type]="RelationType.SmallDown"
T32:856  ></app-relation>
T32:958  <app-relation
T32:959  [name]="RelationName.North"
T32:960  [type]="RelationType.SmallUp"
T32:961  ></app-relation>
T32:1051  <app-relation
T32:1052  [name]="RelationName.North"
T32:1053  [type]="RelationType.SmallDown"
T32:1054  ></app-relation>
T42:7  North = 'GUI.GAUGE.NORTH.NAME',
```

### gauge-06

**Observation to settle:** [attitude threshold] At what net small count does Simon first reach Friend on a route with no large arrows? _[Partly settled 2026-11-09: one up still Neutral gives uniform width ≥2, not exact two; later large crossings cannot identify it. Simon 03:39:23 header in gauge-calibration.md.]_

**Condition needed:** Simon first-Friend boundary and small-arrow size.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Localized bands do not identify the first crossing. No change to Simon bands.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.SIMON\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Simon\b
```

**All search hits (115 source locations):**

```text
E:805 / J:953  GUI.GAUGE.SIMON.NAME
  J:953  "NAME": "SIMON",
E:806 / J:954  GUI.GAUGE.SIMON.NEUTRAL
  J:954  "NEUTRAL": "NEUTRAL",
E:807 / J:955  GUI.GAUGE.SIMON.HOSTILE
  J:955  "HOSTILE": "HOSTILE",
E:808 / J:956  GUI.GAUGE.SIMON.FRIEND
  J:956  "FRIEND": "FRIEND",
E:809 / J:957  GUI.GAUGE.SIMON.RESENTFUL
  J:957  "RESENTFUL": "RESENTFUL",
E:810 / J:958  GUI.GAUGE.SIMON.COMPANION
  J:958  "COMPANION": "COMPANION"
T07:579  <app-relation
T07:580  [name]="RelationName.Simon"
T07:581  [type]="RelationType.SmallUp"
T07:582  ></app-relation>
T10:137  <app-relation
T10:138  [name]="RelationName.Simon"
T10:139  [type]="RelationType.SmallDown"
T10:140  ></app-relation>
T10:177  <app-relation
T10:178  [name]="RelationName.Simon"
T10:179  [type]="RelationType.SmallUp"
T10:180  ></app-relation>
T10:271  <app-relation
T10:272  [name]="RelationName.Simon"
T10:273  [type]="RelationType.SmallDown"
T10:274  ></app-relation>
T10:436  <app-relation
T10:437  [name]="RelationName.Simon"
T10:438  [type]="RelationType.SmallUp"
T10:439  ></app-relation>
T10:516  <app-relation
T10:517  [name]="RelationName.Simon"
T10:518  [type]="RelationType.SmallDown"
T10:519  ></app-relation>
T10:658  <app-relation
T10:659  [name]="RelationName.Simon"
T10:660  [type]="RelationType.SmallUp"
T10:661  ></app-relation>
T10:881  <app-relation
T10:882  [name]="RelationName.Simon"
T10:883  [type]="RelationType.SmallDown"
T10:884  ></app-relation>
T10:1089  <app-relation
T10:1090  [name]="RelationName.Simon"
T10:1091  [type]="RelationType.LargeUp"
T10:1092  ></app-relation>
T10:1133  <app-relation
T10:1134  [name]="RelationName.Simon"
T10:1135  [type]="RelationType.SmallUp"
T10:1136  ></app-relation>
T10:1179  <app-relation
T10:1180  [name]="RelationName.Simon"
T10:1181  [type]="RelationType.SmallDown"
T10:1182  ></app-relation>
T10:1225  <app-relation
T10:1226  [name]="RelationName.Simon"
T10:1227  [type]="RelationType.SmallDown"
T10:1228  ></app-relation>
T14:790  <app-relation
T14:791  [name]="RelationName.Simon"
T14:792  [type]="RelationType.SmallDown"
T14:793  ></app-relation>
T14:916  <app-relation
T14:917  [name]="RelationName.Simon"
T14:918  [type]="RelationType.SmallDown"
T14:919  ></app-relation>
T14:1626  <app-relation
T14:1627  [name]="
T14:1628  RelationName.Simon
T14:1629  "
T14:1630  [type]="
T14:1631  RelationType.LargeUp
T14:1632  "
T14:1633  ></app-relation>
T19:1531  <app-relation
T19:1532  [name]="RelationName.Simon"
T19:1533  [type]="RelationType.SmallDown"
T19:1534  ></app-relation>
T19:1778  <app-relation
T19:1779  [name]="RelationName.Simon"
T19:1780  [type]="RelationType.SmallUp"
T19:1781  ></app-relation>
T19:1919  <app-relation
T19:1920  [name]="RelationName.Simon"
T19:1921  [type]="RelationType.SmallUp"
T19:1922  ></app-relation>
T24:475  <app-relation
T24:476  [name]="RelationName.Simon"
T24:477  [type]="RelationType.SmallUp"
T24:478  ></app-relation>
T24:1790  <app-relation
T24:1791  [name]="RelationName.Simon"
T24:1792  [type]="RelationType.SmallUp"
T24:1793  ></app-relation>
T24:1963  <app-relation
T24:1964  [name]="RelationName.Simon"
T24:1965  [type]="RelationType.SmallDown"
T24:1966  ></app-relation>
T24:2013  <app-relation
T24:2014  [name]="RelationName.Simon"
T24:2015  [type]="RelationType.SmallUp"
T24:2016  ></app-relation>
T24:2286  <app-relation
T24:2287  [name]="RelationName.Simon"
T24:2288  [type]="RelationType.SmallDown"
T24:2289  ></app-relation>
T25:591  <app-relation
T25:592  [name]="RelationName.Simon"
T25:593  [type]="RelationType.SmallUp"
T25:594  ></app-relation>
T31:1852  <app-relation
T31:1853  [name]="RelationName.Simon"
T31:1854  [type]="RelationType.SmallDown"
T31:1855  ></app-relation>
T32:671  <app-relation
T32:672  [name]="RelationName.Simon"
T32:673  [type]="RelationType.LargeUp"
T32:674  ></app-relation>
T42:9  Simon = 'GUI.GAUGE.SIMON.NAME',
```

### gauge-07

**Observation to settle:** [attitude threshold] How many net small ups after Josh first reaches Friend reach Companion? _[Partly settled 2026-11-09: high first Friend boundary +5 applied; no uniform five-point width inferred. Josh 05:17:31 Neutral / 05:30:49 Friend in gauge-calibration.md.]_

**Condition needed:** Josh Friend-to-Companion width.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Friend and Companion labels carry no separation. First Friend +5 is a video-based local boundary, not a text-extracted width. No change.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.JOSH\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Josh\b
```

**All search hits (167 source locations):**

```text
E:799 / J:945  GUI.GAUGE.JOSH.NAME
  J:945  "NAME": "JOSH",
E:800 / J:946  GUI.GAUGE.JOSH.FRIEND
  J:946  "FRIEND": "FRIEND",
E:801 / J:947  GUI.GAUGE.JOSH.HOSTILE
  J:947  "HOSTILE": "HOSTILE",
E:802 / J:948  GUI.GAUGE.JOSH.NEUTRAL
  J:948  "NEUTRAL": "NEUTRAL",
E:803 / J:949  GUI.GAUGE.JOSH.RESENTFUL
  J:949  "RESENTFUL": "RESENTFUL",
E:804 / J:950  GUI.GAUGE.JOSH.COMPANION
  J:950  "COMPANION": "COMPANION"
T07:236  <app-relation
T07:237  [name]="RelationName.Josh"
T07:238  [type]="RelationType.SmallUp"
T07:239  ></app-relation>
T10:141  <app-relation
T10:142  [name]="RelationName.Josh"
T10:143  [type]="RelationType.SmallDown"
T10:144  ></app-relation>
T10:181  <app-relation
T10:182  [name]="RelationName.Josh"
T10:183  [type]="RelationType.SmallUp"
T10:184  ></app-relation>
T10:240  <app-relation
T10:241  [name]="RelationName.Josh"
T10:242  [type]="RelationType.LargeDown"
T10:243  ></app-relation>
T10:267  <app-relation
T10:268  [name]="RelationName.Josh"
T10:269  [type]="RelationType.SmallDown"
T10:270  ></app-relation>
T10:395  <app-relation
T10:396  [name]="RelationName.Josh"
T10:397  [type]="RelationType.LargeDown"
T10:398  ></app-relation>
T10:440  <app-relation
T10:441  [name]="RelationName.Josh"
T10:442  [type]="RelationType.SmallUp"
T10:443  ></app-relation>
T10:520  <app-relation
T10:521  [name]="RelationName.Josh"
T10:522  [type]="RelationType.SmallUp"
T10:523  ></app-relation>
T10:662  <app-relation
T10:663  [name]="RelationName.Josh"
T10:664  [type]="RelationType.SmallDown"
T10:665  ></app-relation>
T10:877  <app-relation
T10:878  [name]="RelationName.Josh"
T10:879  [type]="RelationType.SmallDown"
T10:880  ></app-relation>
T10:990  <app-relation
T10:991  [name]="RelationName.Josh"
T10:992  [type]="RelationType.SmallUp"
T10:993  ></app-relation>
T10:1097  <app-relation
T10:1098  [name]="RelationName.Josh"
T10:1099  [type]="RelationType.SmallUp"
T10:1100  ></app-relation>
T10:1141  <app-relation
T10:1142  [name]="RelationName.Josh"
T10:1143  [type]="RelationType.SmallUp"
T10:1144  ></app-relation>
T10:1187  <app-relation
T10:1188  [name]="RelationName.Josh"
T10:1189  [type]="RelationType.SmallDown"
T10:1190  ></app-relation>
T10:1233  <app-relation
T10:1234  [name]="RelationName.Josh"
T10:1235  [type]="RelationType.SmallDown"
T10:1236  ></app-relation>
T14:687  <app-relation
T14:688  [name]="RelationName.Josh"
T14:689  [type]="RelationType.SmallUp"
T14:690  ></app-relation>
T14:847  <app-relation
T14:848  [name]="RelationName.Josh"
T14:849  [type]="RelationType.SmallDown"
T14:850  ></app-relation>
T14:981  <app-relation
T14:982  [name]="RelationName.Josh"
T14:983  [type]="RelationType.SmallDown"
T14:984  ></app-relation>
T14:1003  <app-relation
T14:1004  [name]="RelationName.Josh"
T14:1005  [type]="RelationType.SmallUp"
T14:1006  ></app-relation>
T14:1564  <app-relation
T14:1565  [name]="
T14:1566  RelationName.Josh
T14:1567  "
T14:1568  [type]="
T14:1569  RelationType.SmallDown
T14:1570  "
T14:1571  ></app-relation>
T14:1618  <app-relation
T14:1619  [name]="
T14:1620  RelationName.Josh
T14:1621  "
T14:1622  [type]="
T14:1623  RelationType.SmallUp
T14:1624  "
T14:1625  ></app-relation>
T19:1523  <app-relation
T19:1524  [name]="RelationName.Josh"
T19:1525  [type]="RelationType.SmallUp"
T19:1526  ></app-relation>
T19:1774  <app-relation
T19:1775  [name]="RelationName.Josh"
T19:1776  [type]="RelationType.SmallDown"
T19:1777  ></app-relation>
T19:1915  <app-relation
T19:1916  [name]="RelationName.Josh"
T19:1917  [type]="RelationType.SmallDown"
T19:1918  ></app-relation>
T24:186  <app-relation
T24:187  [name]="RelationName.Josh"
T24:188  [type]="RelationType.SmallDown"
T24:189  ></app-relation>
T24:220  <app-relation
T24:221  [name]="RelationName.Josh"
T24:222  [type]="RelationType.SmallUp"
T24:223  ></app-relation>
T24:332  <app-relation
T24:333  [name]="RelationName.Josh"
T24:334  [type]="RelationType.SmallDown"
T24:335  ></app-relation>
T24:403  <app-relation
T24:404  [name]="RelationName.Josh"
T24:405  [type]="RelationType.SmallUp"
T24:406  ></app-relation>
T24:467  <app-relation
T24:468  [name]="RelationName.Josh"
T24:469  [type]="RelationType.SmallUp"
T24:470  ></app-relation>
T24:1531  <app-relation
T24:1532  [name]="RelationName.Josh"
T24:1533  [type]="RelationType.LargeUp"
T24:1534  ></app-relation>
T24:1786  <app-relation
T24:1787  [name]="RelationName.Josh"
T24:1788  [type]="RelationType.SmallUp"
T24:1789  ></app-relation>
T24:1967  <app-relation
T24:1968  [name]="RelationName.Josh"
T24:1969  [type]="RelationType.LargeDown"
T24:1970  ></app-relation>
T24:2009  <app-relation
T24:2010  [name]="RelationName.Josh"
T24:2011  [type]="RelationType.SmallUp"
T24:2012  ></app-relation>
T24:2290  <app-relation
T24:2291  [name]="RelationName.Josh"
T24:2292  [type]="RelationType.LargeDown"
T24:2293  ></app-relation>
T25:751  <app-relation
T25:752  [name]="RelationName.Josh"
T25:753  [type]="RelationType.SmallUp"
T25:754  ></app-relation>
T25:1201  <app-relation
T25:1202  [name]="RelationName.Josh"
T25:1203  [type]="RelationType.SmallUp"
T25:1204  ></app-relation>
T25:1236  <app-relation
T25:1237  [name]="RelationName.Josh"
T25:1238  [type]="RelationType.SmallDown"
T25:1239  ></app-relation>
T31:1848  <app-relation
T31:1849  [name]="RelationName.Josh"
T31:1850  [type]="RelationType.SmallDown"
T31:1851  ></app-relation>
T42:8  Josh = 'GUI.GAUGE.JOSH.NAME',
```

### gauge-08

**Observation to settle:** [arrow magnitude] How many small-arrow units does Jericho's truck-supplies increase equal? _[Partly settled 2026-11-09: first Respected +3 applied; truck T=2w−3 is moderate and conditional on uniform bands (then w≥3 and T≥3); nonuniform bands constrain only their sum. No truck magnitude update; Jericho sequence in gauge-calibration.md.]_

**Condition needed:** Jericho truck reward magnitude and band endpoints.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The truck sequence has an arrow annotation but no signed numeric increment. LargeUp is not proof of +2, +3, or the conditional uniform-band equation. No change to truck magnitude.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
(?:GUI\.GAUGE\.(?:JERICHO|REPUTATION)\.)|(?:GUI\.GAUGE\.LEADER\.|X0602M\.[A-Z0-9.]*?(?:FULL|TRUCK|RETURN))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.Jericho\b
```

**All search hits (208 source locations):**

```text
E:784 / J:926  GUI.GAUGE.LEADER.NAME
  J:926  "NAME": "JERICHO",
E:785 / J:927  GUI.GAUGE.LEADER.NEUTRAL
  J:927  "NEUTRAL": "NEUTRAL",
E:786 / J:928  GUI.GAUGE.LEADER.REJECTED
  J:928  "REJECTED": "REJECTED",
E:787 / J:929  GUI.GAUGE.LEADER.RESPECTED
  J:929  "RESPECTED": "RESPECTED",
E:788 / J:930  GUI.GAUGE.LEADER.LEADER
  J:930  "LEADER": "LEADER",
E:789 / J:931  GUI.GAUGE.LEADER.NEGATIVE
  J:931  "NEGATIVE": "UNCERTAIN",
E:790 / J:932  GUI.GAUGE.LEADER.UNPOPULAR
  J:932  "UNPOPULAR": "UNPOPULAR",
E:791 / J:933  GUI.GAUGE.LEADER.ADMIRED
  J:933  "ADMIRED": "ADMIRED"
E:6289 / J:9943  X0602M.EXITGOTKEYNOALERT.ENTERTRUCK.FA.X06MMARKUS.HURRYMARKUS
E:6290 / J:9950  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MMARKUS.OPENTRUCK
E:6291 / J:9953  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MSIMON.OPENTRUCK
E:6292 / J:9956  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MJOSH.OPENTRUCK
E:6293 / J:9960  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MMARLA.OPENTRUCK.1
E:6294 / J:9961  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MMARLA.OPENTRUCK.2
E:6295 / J:9965  X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MJOHN.OPENTRUCK
T10:263  <app-relation
T10:264  [name]="RelationName.Jericho"
T10:265  [type]="RelationType.SmallDown"
T10:266  ></app-relation>
T10:869  <app-relation
T10:870  [name]="RelationName.Jericho"
T10:871  [type]="RelationType.SmallDown"
T10:872  ></app-relation>
T10:873  <app-relation
T10:874  [name]="RelationName.Jericho"
T10:875  [type]="RelationType.SmallDown"
T10:876  ></app-relation>
T10:971  "X0602M.EXITGOTKEYNOALERT.SOWHAT.PC.X06MMARLA.OPENTRUCK"
T10:1079  <app-conditioned-content>
T10:1080  <div class="condition">
T10:1081  <p>Successfully escaped and stole the truck</p>
T10:1082  </div>
T10:1083  <div class="content">
T10:1084  <p>
T10:1085  <app-relation
T10:1086  [name]="RelationName.Jericho"
T10:1087  [type]="RelationType.LargeUp"
T10:1088  ></app-relation>
T10:1089  <app-relation
T10:1090  [name]="RelationName.Simon"
T10:1091  [type]="RelationType.LargeUp"
T10:1092  ></app-relation>
T10:1093  <app-relation
T10:1094  [name]="RelationName.North"
T10:1095  [type]="RelationType.LargeUp"
T10:1096  ></app-relation>
T10:1097  <app-relation
T10:1129  <app-relation
T10:1130  [name]="RelationName.Jericho"
T10:1131  [type]="RelationType.SmallUp"
T10:1132  ></app-relation>
T10:1175  <app-relation
T10:1176  [name]="RelationName.Jericho"
T10:1177  [type]="RelationType.LargeDown"
T10:1178  ></app-relation>
T10:1221  <app-relation
T10:1222  [name]="RelationName.Jericho"
T10:1223  [type]="RelationType.LargeDown"
T10:1224  ></app-relation>
T14:756  <app-relation
T14:757  [name]="RelationName.Jericho"
T14:758  [type]="RelationType.SmallUp"
T14:759  ></app-relation>
T14:786  <app-relation
T14:787  [name]="RelationName.Jericho"
T14:788  [type]="RelationType.SmallDown"
T14:789  ></app-relation>
T14:855  <app-relation
T14:856  [name]="RelationName.Jericho"
T14:857  [type]="RelationType.SmallUp"
T14:858  ></app-relation>
T14:912  <app-relation
T14:913  [name]="RelationName.Jericho"
T14:914  [type]="RelationType.SmallDown"
T14:915  ></app-relation>
T14:1037  <app-relation
T14:1038  [name]="RelationName.Jericho"
T14:1039  [type]="RelationType.SmallUp"
T14:1040  ></app-relation>
T14:1335  <app-relation
T14:1336  [name]="RelationName.Jericho"
T14:1337  [type]="RelationType.SmallDown"
T14:1338  ></app-relation>
T14:1378  <app-relation
T14:1379  [name]="RelationName.Jericho"
T14:1380  [type]="RelationType.SmallDown"
T14:1381  ></app-relation>
T17:368  <app-relation
T17:369  [name]="RelationName.Jericho"
T17:370  [type]="RelationType.SmallDown"
T17:371  ></app-relation>
T17:817  <app-relation
T17:818  [name]="RelationName.Jericho"
T17:819  [type]="RelationType.SmallDown"
T17:820  ></app-relation>
T17:878  <app-relation
T17:879  [name]="RelationName.Jericho"
T17:880  [type]="RelationType.LargeDown"
T17:881  ></app-relation>
T17:1349  <app-relation
T17:1350  [name]="RelationName.Jericho"
T17:1351  [type]="RelationType.LargeUp"
T17:1352  ></app-relation>
T19:1305  <app-relation
T19:1306  [name]="RelationName.Jericho"
T19:1307  [type]="RelationType.LargeUp"
T19:1308  ></app-relation>
T19:1364  <app-relation
T19:1365  [name]="RelationName.Jericho"
T19:1366  [type]="RelationType.LargeDown"
T19:1367  ></app-relation>
T19:1639  <app-relation
T19:1640  [name]="RelationName.Jericho"
T19:1641  [type]="RelationType.LargeUp"
T19:1642  ></app-relation>
T19:1766  <app-relation
T19:1767  [name]="RelationName.Jericho"
T19:1768  [type]="RelationType.LargeDown"
T19:1769  ></app-relation>
T19:1907  <app-relation
T19:1908  [name]="RelationName.Jericho"
T19:1909  [type]="RelationType.LargeDown"
T19:1910  ></app-relation>
T24:791  <app-relation
T24:792  [name]="RelationName.Jericho"
T24:793  [type]="RelationType.LargeDown"
T24:794  ></app-relation>
T24:1363  <app-relation
T24:1364  [name]="RelationName.Jericho"
T24:1365  [type]="RelationType.SmallUp"
T24:1366  ></app-relation>
T24:1423  <app-relation
T24:1424  [name]="RelationName.Jericho"
T24:1425  [type]="RelationType.SmallDown"
T24:1426  ></app-relation>
T24:1470  <app-relation
T24:1471  [name]="RelationName.Jericho"
T24:1472  [type]="RelationType.SmallUp"
T24:1473  ></app-relation>
T24:1495  <app-relation
T24:1496  [name]="RelationName.Jericho"
T24:1497  [type]="RelationType.SmallDown"
T24:1498  ></app-relation>
T24:1527  <app-relation
T24:1528  [name]="RelationName.Jericho"
T24:1529  [type]="RelationType.SmallUp"
T24:1530  ></app-relation>
T24:1558  <app-relation
T24:1559  [name]="RelationName.Jericho"
T24:1560  [type]="RelationType.SmallDown"
T24:1561  ></app-relation>
T24:1626  <app-relation
T24:1627  [name]="RelationName.Jericho"
T24:1628  [type]="RelationType.SmallDown"
T24:1629  ></app-relation>
T24:1782  <app-relation
T24:1783  [name]="RelationName.Jericho"
T24:1784  [type]="RelationType.SmallUp"
T24:1785  ></app-relation>
T24:1959  <app-relation
T24:1960  [name]="RelationName.Jericho"
T24:1961  [type]="RelationType.SmallDown"
T24:1962  ></app-relation>
T24:2001  <app-relation
T24:2002  [name]="RelationName.Jericho"
T24:2003  [type]="RelationType.SmallUp"
T24:2004  ></app-relation>
T24:2213  <app-relation
T24:2214  [name]="
T24:2215  RelationName.Jericho
T24:2216  "
T24:2217  [type]="
T24:2218  RelationType.SmallDown
T24:2219  "
T24:2220  ></app-relation>
T24:2282  <app-relation
T24:2283  [name]="RelationName.Jericho"
T24:2284  [type]="RelationType.SmallDown"
T24:2285  ></app-relation>
T25:828  <app-relation
T25:829  [name]="RelationName.Jericho"
T25:830  [type]="RelationType.SmallUp"
T25:831  ></app-relation>
T25:1209  <app-relation
T25:1210  [name]="RelationName.Jericho"
T25:1211  [type]="RelationType.LargeUp"
T25:1212  ></app-relation>
T25:1240  <app-relation
T25:1241  [name]="RelationName.Jericho"
T25:1242  [type]="RelationType.LargeUp"
T25:1243  ></app-relation>
T31:952  <app-relation
T31:953  [name]="RelationName.Jericho"
T31:954  [type]="RelationType.SmallUp"
T31:955  ></app-relation>
T32:471  <app-relation
T32:472  [name]="RelationName.Jericho"
T32:473  [type]="RelationType.SmallDown"
T32:474  ></app-relation>
T32:563  <app-relation
T32:564  [name]="RelationName.Jericho"
T32:565  [type]="RelationType.SmallDown"
T32:566  ></app-relation>
T32:857  <app-relation
T32:858  [name]="RelationName.Jericho"
T32:859  [type]="RelationType.LargeDown"
T32:860  ></app-relation>
T42:6  Jericho = 'GUI.GAUGE.LEADER.NAME',
```

### gauge-09

**Observation to settle:** [attitude threshold] At what net small count from the initial state does public opinion first reach Sympathetic? _[Partly settled 2026-11-09: Skeptical [-1,0] and first +1 Indifferent confirmed; first tower-news large ∈[1,2] does not identify either that event or Sympathetic's boundary. Retain +2 news / +3 Sympathetic as calibrations; public-opinion frames in gauge-calibration.md.]_

**Condition needed:** Public opinion initial point and first Sympathetic boundary.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The internal NEUTRAL key displays Indifferent, and SCEPTICAL displays Skeptical. These are localization aliases, not numeric cut points. No change to +3 Sympathetic or the calibrated news magnitude.

**Cross-check:** Completed flowchart header bands are snapshots after an unknown/full history, not cut-point tables. PowerPyx walkthrough arrows and relationship recipes publish no gauge boundary array. The operator/video calibration in SOURCES §13 remains the controlling evidence; the relation enum and renderer audit below rules out treating website ordinals as game increments.

**Identifiers/value search (case-insensitive):**

```regex
GUI\.GAUGE\.PUBLIC\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
RelationName\.PublicOpinion\b
```

**All search hits (136 source locations):**

```text
E:811 / J:961  GUI.GAUGE.PUBLIC.NAME
  J:961  "NAME": "PUBLIC OPINION",
E:812 / J:962  GUI.GAUGE.PUBLIC.NEUTRAL
  J:962  "NEUTRAL": "INDIFFERENT",
E:813 / J:963  GUI.GAUGE.PUBLIC.HOSTILE
  J:963  "HOSTILE": "HOSTILE",
E:814 / J:964  GUI.GAUGE.PUBLIC.SUPPORTIVE
  J:964  "SUPPORTIVE": "SUPPORTIVE",
E:815 / J:965  GUI.GAUGE.PUBLIC.HATED
  J:965  "HATED": "HATED",
E:816 / J:966  GUI.GAUGE.PUBLIC.SCEPTICAL
  J:966  "SCEPTICAL": "SKEPTICAL",
E:817 / J:967  GUI.GAUGE.PUBLIC.SYMPATHETIC
  J:967  "SYMPATHETIC": "SYMPATHETIC"
T01:888  <app-relation
T01:889  [name]="RelationName.PublicOpinion"
T01:890  [type]="RelationType.SmallUp"
T01:891  ></app-relation>
T04:1323  <app-relation
T04:1324  [name]="RelationName.PublicOpinion"
T04:1325  [type]="RelationType.SmallDown"
T04:1326  ></app-relation>
T04:1346  <app-relation
T04:1347  [name]="RelationName.PublicOpinion"
T04:1348  [type]="RelationType.SmallDown"
T04:1349  ></app-relation>
T05:1219  <app-relation
T05:1220  [name]="RelationName.PublicOpinion"
T05:1221  [type]="RelationType.SmallDown"
T05:1222  ></app-relation>
T05:1272  <app-relation
T05:1273  [name]="RelationName.PublicOpinion"
T05:1274  [type]="RelationType.SmallDown"
T05:1275  ></app-relation>
T08:766  <app-relation
T08:767  [name]="RelationName.PublicOpinion"
T08:768  [type]="RelationType.SmallDown"
T08:769  ></app-relation>
T08:796  <app-relation
T08:797  [name]="RelationName.PublicOpinion"
T08:798  [type]="RelationType.SmallDown"
T08:799  ></app-relation>
T12:165  <app-relation
T12:166  [name]="RelationName.PublicOpinion"
T12:167  [type]="RelationType.SmallDown"
T12:168  ></app-relation>
T14:1676  <app-relation
T14:1677  [name]="RelationName.PublicOpinion"
T14:1678  [type]="RelationType.SmallDown"
T14:1679  ></app-relation>
T14:1696  <app-relation
T14:1697  [name]="RelationName.PublicOpinion"
T14:1698  [type]="RelationType.SmallDown"
T14:1699  ></app-relation>
T14:1718  <app-relation
T14:1719  [name]="RelationName.PublicOpinion"
T14:1720  [type]="RelationType.SmallDown"
T14:1721  ></app-relation>
T14:1738  <app-relation
T14:1739  [name]="RelationName.PublicOpinion"
T14:1740  [type]="RelationType.LargeUp"
T14:1741  ></app-relation>
T14:1770  <app-relation
T14:1771  [name]="RelationName.PublicOpinion"
T14:1772  [type]="RelationType.LargeDown"
T14:1773  ></app-relation>
T14:1790  <app-relation
T14:1791  [name]="RelationName.PublicOpinion"
T14:1792  [type]="RelationType.LargeUp"
T14:1793  ></app-relation>
T15:1581  <app-relation
T15:1582  [name]="
T15:1583  RelationName.PublicOpinion
T15:1584  "
T15:1585  [type]="
T15:1586  RelationType.SmallDown
T15:1587  "
T15:1588  ></app-relation>
T15:1621  <app-relation
T15:1622  [name]="
T15:1623  RelationName.PublicOpinion
T15:1624  "
T15:1625  [type]="
T15:1626  RelationType.SmallDown
T15:1627  "
T15:1628  ></app-relation>
T17:1877  <app-relation
T17:1878  [name]="RelationName.PublicOpinion"
T17:1879  [type]="RelationType.LargeUp"
T17:1880  ></app-relation>
T17:1898  <app-relation
T17:1899  [name]="RelationName.PublicOpinion"
T17:1900  [type]="RelationType.LargeDown"
T17:1901  ></app-relation>
T17:1928  <app-relation
T17:1929  [name]="RelationName.PublicOpinion"
T17:1930  [type]="RelationType.LargeDown"
T17:1931  ></app-relation>
T19:1309  <app-relation
T19:1310  [name]="RelationName.PublicOpinion"
T19:1311  [type]="RelationType.LargeDown"
T19:1312  ></app-relation>
T19:1444  <app-relation
T19:1445  [name]="RelationName.PublicOpinion"
T19:1446  [type]="RelationType.SmallUp"
T19:1447  ></app-relation>
T19:1535  <app-relation
T19:1536  [name]="RelationName.PublicOpinion"
T19:1537  [type]="RelationType.SmallUp"
T19:1538  ></app-relation>
T19:1592  <app-relation
T19:1593  [name]="RelationName.PublicOpinion"
T19:1594  [type]="RelationType.SmallUp"
T19:1595  ></app-relation>
T19:1635  <app-relation
T19:1636  [name]="RelationName.PublicOpinion"
T19:1637  [type]="RelationType.LargeUp"
T19:1638  ></app-relation>
T31:395  <app-relation
T31:396  [name]="RelationName.PublicOpinion"
T31:397  [type]="RelationType.SmallUp"
T31:398  ></app-relation>
T31:414  <app-relation
T31:415  [name]="RelationName.PublicOpinion"
T31:416  [type]="RelationType.SmallDown"
T31:417  ></app-relation>
T31:433  <app-relation
T31:434  [name]="RelationName.PublicOpinion"
T31:435  [type]="RelationType.SmallUp"
T31:436  ></app-relation>
T31:529  <app-relation
T31:530  [name]="RelationName.PublicOpinion"
T31:531  [type]="RelationType.SmallUp"
T31:532  ></app-relation>
T31:546  <app-relation
T31:547  [name]="RelationName.PublicOpinion"
T31:548  [type]="RelationType.SmallDown"
T31:549  ></app-relation>
T31:948  <app-relation
T31:949  [name]="RelationName.PublicOpinion"
T31:950  [type]="RelationType.SmallUp"
T31:951  ></app-relation>
T42:10  PublicOpinion = 'GUI.GAUGE.PUBLIC.NAME',
```

### ch06-03

**Observation to settle:** [which ending] After REVIEW EVIDENCE 10/10, if you keep examining things instead of going to Hank, does Hank ever announce he is leaving (yes/no)?

**Condition needed:** evidenceCount==10 freezes or leaves investigation timer running.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** TIME unlocks and known-crime versus timeout labels do not express whether reaching 10/10 disables the running timer. No timer-stop assignment is present. No change to the investigation action budget or post-10 behavior.

**Cross-check:** FC06; PP06-1. The chart has an investigation/timeout split, not a timer-stop condition tied to 10/10. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0202C\.[A-Z0-9.]*?(?:TIMEOUT|LEAV|FIVEMIN)|MENU\.FLOWCHART\.02C\.[A-Z0-9.]*?(?:TIME|EVIDENCE|KNOW)))|(?:X0202C\.[A-Z0-9.]*?(?:TIME|HURRY|LEAV)|MENU\.FLOWCHART\.02C\.(?:TIME|TIMESUP|REVIEW|RECONSTRUCT))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
know what happened|too much time|ten|10/10
```

**All search hits (238 source locations):**

```text
E:8841 / J:14721  MENU.FLOWCHART.02C.RECONSTRUCT01
  J:14721  "RECONSTRUCT01": "RECONSTRUCT CARLOS' LAST MOMENTS",
E:8842 / J:14722  MENU.FLOWCHART.02C.RECONSTRUCT02
  J:14722  "RECONSTRUCT02": "RECONSTRUCT ASSAULT WITH BAT",
E:8853 / J:14733  MENU.FLOWCHART.02C.TIME
  J:14733  "TIME": "ASK FOR MORE TIME",
E:8857 / J:14737  MENU.FLOWCHART.02C.RECONSTRUCTS
  J:14737  "RECONSTRUCTS": "CONNOR KNOWS WHAT HAPPENED",
E:8858 / J:14738  MENU.FLOWCHART.02C.TIMESUP
  J:14738  "TIMESUP": "OUT OF TIME",
T01:637  <h2 id="time">
T01:638  <app-unlock-condition [unlockType]="UnlockType.Time">
T01:639  Take too much time
T01:640  </app-unlock-condition>
T01:641  </h2>
T02:147  <h2 id="timeout">
T02:148  <app-unlock-condition [unlockType]="UnlockType.Time">
T02:149  Take too much time
T02:150  </app-unlock-condition>
T02:151  </h2>
T02:326  <div class="condition">
T02:327  <p>Threaten the clerk with the gun</p>
T02:328  </div>
T04:1817  <h2 id="fowler-office">Entering and listening</h2>
T04:2196  <app-unlock-condition [unlockType]="UnlockType.Lock">
T04:2197  Listened to Hank's music
T04:2198  </app-unlock-condition>
T05:613  <div class="condition">
T05:614  <p>
T05:615  Kara has a gun : Kara threatens Ralph with
T05:616  the gun
T05:617  </p>
T05:618  </div>
T05:871  <div class="condition"><p>Kara threatened Ralph</p></div>
T05:1042  <h3 id="squat-timeout">
T05:1043  <app-unlock-condition [unlockType]="UnlockType.Time">
T05:1044  Take too much time
T05:1045  </app-unlock-condition>
T05:1046  </h3>
T05:1057  <h3 id="squat-timeout-again">Taking too much time again</h3>
T05:1688  <h2 id="chase-timeout">
T05:1689  <app-unlock-condition [unlockType]="UnlockType.Time">
T05:1690  Take too much time
T05:1691  </app-unlock-condition>
T05:1692  </h2>
T06:1382  <h2 id="investigation-timeout">
T06:1383  <app-unlock-condition [unlockType]="UnlockType.Time">
T06:1384  Take too much time
T06:1385  </app-unlock-condition>
T06:1386  </h2>
T06:1416  <h3 id="investigation-timeout-again">
T06:1417  Take too much time again
T06:1418  </h3>
T08:524  <h2 id="reset-timeout">
T08:525  <app-unlock-condition
T08:526  [unlockType]="UnlockType.Time"
T08:527  >
T08:528  Take too much time
T08:529  </app-unlock-condition>
T08:530  </h2>
T09:1201  <h2 id="door-bathroom">Listening to the door of the bathroom</h2>
T10:55  <h2 id="timeout">
T10:56  <app-unlock-condition [unlockType]="UnlockType.Time">
T10:57  Take too much time
T10:58  </app-unlock-condition>
T10:59  </h2>
T10:848  <div class="condition">
T10:849  <p>Threaten guards with the gun</p>
T10:850  </div>
T10:1038  <h3 id="running-away-timeout">
T10:1039  <app-unlock-condition [unlockType]="UnlockType.Time">
T10:1040  Take too much time
T10:1041  </app-unlock-condition>
T10:1042  </h3>
T11:52  <h2 id="listen-ben">Listen to Ben</h2>
T11:672  <h3 id="search-timeout">
T11:673  <app-unlock-condition
T11:674  [unlockType]="UnlockType.Time"
T11:675  [bracketsOnlyAroundIcon]="true"
T11:676  >
T11:677  Take too much time
T11:678  </app-unlock-condition>
T11:679  </h3>
T11:716  <h3 id="search-timeout-again">
T11:717  Taking too much time again
T11:718  </h3>
T11:1002  <h3 id="search-connect-timeout">
T11:1003  <app-unlock-condition [unlockType]="UnlockType.Time">
T11:1004  Take too much time
T11:1005  </app-unlock-condition>
T11:1006  </h3>
T11:1085  <h2 id="warehouse-timeout">
T11:1086  <app-unlock-condition
T11:1087  [unlockType]="UnlockType.Time"
T11:1088  [bracketsOnlyAroundIcon]="true"
T11:1089  >
T11:1090  Take too much time
T11:1091  </app-unlock-condition>
T11:1092  </h2>
T12:303  <h2 id="pirate-cove-timeout">
T12:304  <app-unlock-condition [unlockType]="UnlockType.Time">
T12:305  Take too much time
T12:306  </app-unlock-condition>
T12:307  </h2>
T13:403  <div class="condition">
T13:404  <p>
T13:405  <app-unlock-condition [unlockType]="UnlockType.Time">
T13:406  <span class="font-bold">
T13:407  Took too much time looking for the Traci in
T13:408  <a [routerLink]="['/chapters', 20]"
T13:409  >The Eden Club</a
T13:410  >
T13:411  </span>
T13:412  </app-unlock-condition>
T13:413  </p>
T13:414  </div>
T14:771  <div class="condition">
T14:772  <p>
T14:773  <app-unlock-condition
T14:774  [unlockType]="UnlockType.Time"
T14:775  [bracketsOnlyAroundIcon]="true"
T14:776  >
T14:777  <span class="font-bold"
T14:778  >Take too much time drawing the
T14:779  gun</span
T14:780  >
T14:781  </app-unlock-condition>
T14:782  </p>
T14:783  </div>
T15:1183  <h3 id="timeout">
T15:1184  <app-unlock-condition
T15:1185  [unlockType]="UnlockType.Time"
T15:1186  [bracketsOnlyAroundIcon]="true"
T15:1187  >
T15:1188  Taking too much time / Ask Hank to leave
T15:1189  </app-unlock-condition>
T15:1190  </h3>
T17:438  <h2 id="timeout">
T17:439  <app-unlock-condition [unlockType]="UnlockType.Time">
T17:440  Take too much time
T17:441  </app-unlock-condition>
T17:442  </h2>
T17:1553  <h2 id="send-message-timeout">
T17:1554  <app-unlock-condition
T17:1555  [unlockType]="UnlockType.Time"
T17:1556  [bracketsOnlyAroundIcon]="true"
T17:1557  >
T17:1558  Take too much time
T17:1559  </app-unlock-condition>
T17:1560  </h2>
T17:1576  <h3 id="send-message-timeout-again">
T17:1577  Take too much time again
T17:1578  </h3>
T20:3115  <h2 id="timeout">
T20:3116  <app-unlock-condition [unlockType]="UnlockType.Time">
T20:3117  Not enough evidence to find Jericho or took too much time
T20:3118  </app-unlock-condition>
T20:3119  </h2>
T22:25  <h2 id="car-radio">Listening to the radio</h2>
T23:983  <h2 id="soldiers-threaten">Soldiers threaten androids</h2>
T24:1326  <h2 id="soldiers-androids">Soldiers threaten androids</h2>
T24:1880  <div class="condition">
T24:1881  <p>
T24:1882  <app-unlock-condition
T24:1883  [unlockType]="UnlockType.Death"
T24:1884  >
T24:1885  <span class="font-bold"
T24:1886  >Lose too much time</span
T24:1887  >
T24:1888  </app-unlock-condition>
T24:1889  </p>
T24:1890  </div>
T25:258  <h2 id="leo-message">Listen to Leo's message</h2>
T27:1313  <h2 id="timeout-bus">
T27:1314  <app-unlock-condition [unlockType]="UnlockType.Time">
T27:1315  Took too much time - Miss the bus
T27:1316  </app-unlock-condition>
T27:1317  </h2>
T28:75  <h2 id="timeout-truck">Take too much time</h2>
T30:1121  <p class="note">
T30:1122  <span dir="ltr">
T30:1123  Leads to the
T30:1124  same outcomes as
T30:1125  if Hank is dead
T30:1126  for STAND UP,
T30:1127  SHOOT and [ TAKE
T30:1128  TOO MUCH TIME TO
T30:1129  CHOOSE ], and to
T30:1130  the same result
T30:1131  as successfully
T30:1132  converting the
T30:1133  android when
T30:1134  choosing
T30:1135  TRANSFER.
T30:1136  </span>
T30:1137  </p>
T33:12  <h2 id="idle-outside">
T33:13  <app-unlock-condition [unlockType]="UnlockType.Time">
T33:14  Take too much time
T33:15  </app-unlock-condition>
T33:16  </h2>
T33:420  <h2 id="alice-tent">Talking with Alice</h2>
T34:302  <h3 id="downstairs-timeout">
T34:303  <app-unlock-condition [unlockType]="UnlockType.Time">
T34:304  Take too much time
T34:305  </app-unlock-condition>
T34:306  </h3>
T34:333  <h3 id="breakfast-timeout">
T34:334  <app-unlock-condition [unlockType]="UnlockType.Time">
T34:335  Take too much time
T34:336  </app-unlock-condition>
T34:337  </h3>
T35:119  <h2 id="money">Bartender exchanges money</h2>
T35:128  <h2 id="refill">Bartender refills drink</h2>
T35:883  <h2 id="timeout">
T35:884  <app-unlock-condition [unlockType]="UnlockType.Time">
T35:885  Take too much time
T35:886  </app-unlock-condition>
T35:887  </h2>
T35:985  <h3 id="timeout-again">Take too much time again</h3>
T36:568  <p class="note">
T36:569  <span dir="ltr"
T36:570  >Leads to the same outcome as
T36:571  "Taking too much time".</span
T36:572  >
T36:573  </p>
T36:839  <h2 id="living-room-timeout">
T36:840  <app-unlock-condition
T36:841  [unlockType]="UnlockType.Time"
T36:842  >
T36:843  Take too much time
T36:844  </app-unlock-condition>
T36:845  </h2>
T37:179  <h2 id="timeout">
T37:180  <app-unlock-condition [unlockType]="UnlockType.Time">
T37:181  Take too much time
T37:182  </app-unlock-condition>
T37:183  </h2>
T39:2  <h1>Contents</h1>
T41:61  <app-unlock-condition [unlockType]="UnlockType.Time">
T41:62  An hourglass icon means the event occurs if you take too
T41:63  much time.
T41:64  </app-unlock-condition>
```

### ch09-01

**Observation to settle:** [which buttons the model is offered] Under PRESSURE IT, did the android ever confess before you had pressed PRESSURE four times (yes/no)?

**Condition needed:** pressureStep count, current stress, early-confession predicate.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Pressure dialogue is stored as sequences, not an executable repeat loop with a stress cutoff. The approach-failed-twice annotation concerns a later fallback, not four pressure inputs. Four observed inputs remain evidence only for those histories. No change to four prompts.

**Cross-check:** FC09; PP09-1, PP09-2. Approach and intervention outcomes are distinct; chart labels do not serialize per-input stress predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0401C\.[A-Z0-9.]*?(?:PRESSURE|MPRESSPROBE|MPRESSGIVEUP)|MENU\.FLOWCHART\.04C\.[A-Z0-9.]*?(?:PRESS|CONFESS)))|(?:X0401C\.INTERROGATION\.CONNOR\.[A-Z0-9.]*?(?:PUSH|PRESS|MPRESS)|MENU\.FLOWCHART\.04C\.(?:PRESSURE|CONFESS))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
pressure|approach failed twice|probe succeeded
```

**All search hits (74 source locations):**

```text
E:8907 / J:14793  MENU.FLOWCHART.04C.PRESSURE
  J:14793  "PRESSURE": "PRESSURE",
E:8914 / J:14800  MENU.FLOWCHART.04C.CONFESS
  J:14800  "CONFESS": "ANDROID CONFESSES",
E:17136 / J:30445  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH00.1
E:17137 / J:30446  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH00.2
E:17138 / J:30447  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH00.3
E:17139 / J:30448  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH00.4
E:17145 / J:30458  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH01.1
E:17146 / J:30459  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH01.2
E:17147 / J:30460  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH01.3
E:17148 / J:30463  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH02.1
E:17149 / J:30464  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH02.2
E:17150 / J:30466  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH03
E:17151 / J:30468  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH04.1
E:17152 / J:30469  X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH04.2
E:17240 / J:30612  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH00
E:17243 / J:30616  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH01.1
E:17244 / J:30617  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH01.2
E:17245 / J:30620  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH02.1
E:17246 / J:30621  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH02.2
E:17247 / J:30623  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH03
E:17248 / J:30624  X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH04
E:17324 / J:30728  X0401C.INTERROGATION.CONNOR.PC.STRESSCHOICE.PUSH
E:17328 / J:30734  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH01.PUSH
E:17329 / J:30735  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH01.RENOUNCE
E:17330 / J:30738  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH02.PUSH
E:17331 / J:30739  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH02.RENOUNCE
E:17332 / J:30742  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH03.PUSH
E:17333 / J:30743  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH03.RENOUNCE
E:17334 / J:30746  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH04.PUSH
E:17335 / J:30747  X0401C.INTERROGATION.CONNOR.PC.CHOICEPUSH04.RENOUNCE
E:17337 / J:30753  X0401C.INTERROGATION.CONNOR.PC.MPRESSPROBE.FAIL
E:17338 / J:30754  X0401C.INTERROGATION.CONNOR.PC.MPRESSPROBE.PROBE
E:17360 / J:30792  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH00SEC
E:17361 / J:30794  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH01SEC.1
E:17362 / J:30795  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH01SEC.2
E:17363 / J:30798  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH02SEC.1
E:17364 / J:30799  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH02SEC.2
E:17365 / J:30801  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH03SEC
E:17366 / J:30802  X0401C.INTERROGATION.CONNOR.FA.X04CANDCARLOS.PUSH04SEC
E:17367 / J:30806  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH00SEC.1
E:17368 / J:30807  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH00SEC.2
E:17369 / J:30808  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH00SEC.3
E:17370 / J:30811  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH01SEC.1
E:17371 / J:30812  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH01SEC.2
E:17372 / J:30815  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH02SEC.1
E:17373 / J:30816  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH02SEC.2
E:17374 / J:30818  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH03SEC
E:17375 / J:30820  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH04SEC.1
E:17376 / J:30821  X0401C.INTERROGATION.CONNOR.FA.X04CCONNOR.PUSH04SEC.2
T38:480  'X0401C.INTERROGATION.CONNOR.PC.STRESSCHOICE.PUSH'
T38:488  "X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH00"
T38:493  "X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH01"
T38:500  "X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH01"
T38:507  "X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH02"
T38:514  "X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH02"
T38:521  "X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH03"
T38:528  "X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH03"
T38:535  "X0401C.INTERROGATION.CONNOR.PC.X04CCONNOR.PUSH04"
T38:548  <p class="note">
T38:549  <span dir="ltr"
T38:550  >This dialogue will also trigger if
T38:551  "Pressure it" fails</span
T38:552  >
T38:553  </p>
T38:559  "X0401C.INTERROGATION.CONNOR.PC.X04CANDCARLOS.PUSH01"
T38:599  <div class="condition">
T38:600  <p>Probe succeeded</p>
T38:601  </div>
T38:909  <app-unlock-condition
T38:910  [unlockType]="UnlockType.None"
T38:911  >
T38:912  Will also automatically happen if the chosen
T38:913  approach failed twice
T38:914  </app-unlock-condition>
```

### ch09-14

**Observation to settle:** [which ending] After pressuring him without getting a confession, if you INTERVENE once and then GIVE UP, does the android shoot Connor (yes/no)?

**Condition needed:** failedPressure, interventionCount and GIVE_UP death target.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** INSISTCHOICE.CEDE is an input label; absent CEDE siblings do not establish absent buttons. The template explicitly groups failed confession/stress with Connor-and-android death, but does not encode a one-intervention transition table. Prior filmed early GIVE UP buttons outrank a negative string inference. No change to the exact ending gate.

**Cross-check:** FC09; PP09-1, PP09-2. Approach and intervention outcomes are distinct; chart labels do not serialize per-input stress predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0401C\.[A-Z0-9.]*?(?:INSISTCHOICE|ANDROIDSTRUGGLE|CHOICEGROUP01|SHOOTCONNOR)|MENU\.FLOWCHART\.04C\.[A-Z0-9.]*?(?:INTERVENE|SHOOT|SUICIDE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
failed to get a confession|shoots Connor|deviant shoots itself|intervene
```

**All search hits (83 source locations):**

```text
E:8920 / J:14806  MENU.FLOWCHART.04C.INTERVENE01
  J:14806  "INTERVENE01": "INTERVENE",
E:8921 / J:14807  MENU.FLOWCHART.04C.INTERVENE02
  J:14807  "INTERVENE02": "INTERVENE",
E:17055 / J:30273  X0401C.CONCLUSION2.INTERVENE.PC.CHOICEGROUP01.INTERVENE
E:17056 / J:30276  X0401C.CONCLUSION2.INTERVENE.PC.ANDROIDSTRUGGLE.INTERVENE
E:17057 / J:30279  X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.CEDE
E:17058 / J:30280  X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.RESIST
E:17312 / J:30708  X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.COMFORT
E:17313 / J:30709  X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.REASSURE
E:17314 / J:30710  X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.THREATEN
E:17315 / J:30711  X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.BLAME
T04:274  <app-unlock-condition
T04:275  [unlockType]="UnlockType.Lock"
T04:276  >
T04:277  Intervened and saved the deviant in
T04:278  <a [routerLink]="['/chapters', 9]"
T04:279  >The Interrogation</a
T04:280  >
T04:281  </app-unlock-condition>
T04:1246  <div class="condition">
T04:1247  <p>
T04:1248  Connor intervened during
T04:1249  <a [routerLink]="['/chapters', 9]"
T04:1250  >The Interrogation</a
T04:1251  >
T04:1252  </p>
T04:1253  </div>
T04:1267  <div class="condition">
T04:1268  <p>
T04:1269  Connor didn't intervene in
T04:1270  <a [routerLink]="['/chapters', 9]"
T04:1271  >The Interrogation</a
T04:1272  >
T04:1273  </p>
T04:1274  </div>
T04:1655  <div class="condition">
T04:1656  <p>
T04:1657  Connor intervened in
T04:1658  <a [routerLink]="['/chapters', 9]"
T04:1659  >The Interrogation</a
T04:1660  >
T04:1661  </p>
T04:1662  </div>
T04:2097 [CUT]  <app-unlock-condition [unlockType]="UnlockType.Lock">
T04:2098 [CUT]  <span>
T04:2099 [CUT]  Hank intervened during
T04:2100 [CUT]  <a [routerLink]="['/chapters', 9]"
T04:2101 [CUT]  >The Interrogation</a
T04:2102 [CUT]  ></span
T04:2103 [CUT]  >
T04:2104 [CUT]  </app-unlock-condition>
T38:214  'X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.COMFORT'
T38:231  'X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.REASSURE'
T38:248  'X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.THREATEN'
T38:264  t('X0401C.INTERROGATION.CONNOR.PC.CHOICEGROUP01.BLAME')
T38:1183  'X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.RESIST'
T38:1211  <h3 id="shoot-both">
T38:1212  Deviant shoots Connor and itself
T38:1213  </h3>
T38:1228  'X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.CEDE'
T38:1257  'X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.CEDE'
T38:1346  <div class="condition">
T38:1347  <p>Deviant shoots itself</p>
T38:1348  </div>
T38:1362  <div class="condition">
T38:1363  <p>
T38:1364  Deviant shoots Connor and itself
T38:1365  </p>
T38:1366  </div>
T38:1369  <app-unlock-condition
T38:1370  [unlockType]="
T38:1371  UnlockType.Lock
T38:1372  "
T38:1373  >
T38:1374  Put deviant under stress and
T38:1375  failed to get a confession
T38:1376  </app-unlock-condition>
T38:1406  'X0401C.CONCLUSION2.INTERVENE.PC.INSISTCHOICE.RESIST'
T38:1427  <p class="note">
T38:1428  <span dir="ltr">Intervene again</span>
T38:1429  </p>
T38:1455  <p class="note">
T38:1456  <span dir="ltr">Intervene again</span>
T38:1457  </p>
```

### ch09-16

**Observation to settle:** [a stat arrow] After a successful memory probe where Connor survived (DO NOTHING at the self-destruct), did Amanda in the Zen Garden next chapter congratulate Connor (arrow up) or criticise him (arrow down)?

**Condition needed:** successful probe counts as confession for Amanda's next-meeting result.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The downstream template branches on confession and Connor survival, while the interrogation has a separate successful-probe path. No shared boolean assignment equates or distinguishes those results. No change to Amanda's probe-route delta.

**Cross-check:** FC09; PP09-1, PP09-2. Approach and intervention outcomes are distinct; chart labels do not serialize per-input stress predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0301C\.[A-Z0-9.]*?(?:CONFESS|INTERROG|DEVIANT)|THOUGHTS\.0401C\.[A-Z0-9.]*?(?:CONFESS|PROBE)))|(?:X0301C\.AMANDA\.INTRO\.[A-Z0-9.]*?(?:ANDSAVED|ANDNOTCONFESS|ANDNOTFOUND|CONFESS|INTERROG)|THOUGHTS\.0401C\.(?:CONFESSION|PROBE|NOCONFESSIONS))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
got a confession|didn.t get a confession|probe succeeded
```

**All search hits (76 source locations):**

```text
E:4097 / J:5758  THOUGHTS.0401C.CONFESSION
  J:5758  "CONFESSION": "EXTRACT CONFESSION",
E:4103 / J:5764  THOUGHTS.0401C.PROBEFAILED
  J:5764  "PROBEFAILED": "PROBE FAILED",
E:4105 / J:5766  THOUGHTS.0401C.PROBESUCCESS
  J:5766  "PROBESUCCESS": "PROBE SUCCESSFUL",
E:4106 / J:5767  THOUGHTS.0401C.NOCONFESSIONS
  J:5767  "NOCONFESSIONS": "CONFESSION UNNECESSARY",
E:4107 / J:5768  THOUGHTS.0401C.CONFESSIONS
  J:5768  "CONFESSIONS": "CONFESSION OBTAINED",
E:16221 / J:28538  X0301C.AMANDA.INTRO.PC.X03CCONNOR.ANDNOTFOUND.1
E:16222 / J:28539  X0301C.AMANDA.INTRO.PC.X03CCONNOR.ANDNOTFOUND.2
E:16226 / J:28546  X0301C.AMANDA.INTRO.PC.X03CCONNOR.ANDSAVED
E:16283 / J:28636  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND.1
E:16284 / J:28637  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND.2
E:16285 / J:28638  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND.3
E:16286 / J:28639  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND.4
E:16295 / J:28654  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.1
E:16296 / J:28655  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.2
E:16297 / J:28656  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.3
E:16298 / J:28657  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.4
E:16299 / J:28658  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.5
E:16300 / J:28659  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.6
E:16301 / J:28660  X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.7
T04:41  "X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND",
T04:50  "X0301C.AMANDA.INTRO.PC.X03CCONNOR.ANDNOTFOUND"
T04:57  "X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDNOTFOUND",
T04:73  <app-condition-group>
T04:74  <app-conditioned-content>
T04:75  <div class="condition">
T04:76  <p>Got a confession, without dying</p>
T04:77  </div>
T04:78  <div class="content">
T04:79  <p>
T04:80  <app-relation
T04:81  [name]="RelationName.Amanda"
T04:82  [type]="RelationType.LargeUp"
T04:83  ></app-relation>
T04:84  <app-dialogue-line name="Amanda">
T04:85  {{
T04:87  "X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED",
T04:96  "X0301C.AMANDA.INTRO.PC.X03CCONNOR.ANDSAVED"
T04:103  "X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED",
T04:115 [CUT]  "X0301C.AMANDA.INTRO.PC.X03CAMANDA.ANDSAVED.7"
T04:177  </app-conditioned-content>
T04:178  <app-conditioned-content>
T04:179  <div class="condition">
T04:180  <p>
T04:181  Connor found the deviant but didn't get a
T04:182  confession in
T04:183  <a [routerLink]="['/chapters', 9]"
T04:184  >The Interrogation</a
T04:185  >
T04:186  </p>
T04:187  </div>
T04:188  <div class="content">
T04:189  <p>
T04:190  <app-relation
T04:191  [name]="RelationName.Amanda"
T04:192  [type]="RelationType.SmallDown"
T04:193  ></app-relation>
T04:194  <app-dialogue-line name="Amanda">
T04:195  {{
T04:294  <div class="condition">
T04:295  <p>Got a confession</p>
T04:296  </div>
T04:1057  <div class="condition">
T04:1058  <p>
T04:1059  Didn't get a confession in
T04:1060  <a
T04:1061  [routerLink]="[
T04:1062  '/chapters',
T04:1063  9,
T04:1064  ]"
T04:1065  >The Interrogation</a
T04:1066  >
T04:1067  </p>
T04:1068  </div>
T38:599  <div class="condition">
T38:600  <p>Probe succeeded</p>
T38:601  </div>
```

### ch10-18

**Observation to settle:** [a stat arrow] In Zlatko, did the TV report on Kara robbing the store play when she had got the money only through Alice's can diversion, with no gun (yes/no)?

**Condition needed:** robberyNews flag producer: diversion, gun hold-up, failed hold-up or persuasion.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The downstream report has clothing variants but no producer identifying a discreet diversion as armed robbery. Its supermarket condition even names On The Run where the theft occurred in Fugitives, a transcriber error. No change to ch10RobberyNews. Same unresolved producer as ch17-05.

**Cross-check:** FC10; PP10-1, PP10-2. Shelter and cutter routes establish reachable events, not every free-roam availability lock. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0502K\.[A-Z0-9.]*?(?:NEWS|ROBBERY)|MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:STEALMONEY|DIVERSION|HOLDUP))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
robbed the supermarket|discreet|diversion
```

**All search hits (39 source locations):**

```text
E:9709 / J:15690  MENU.FLOWCHART.03K.SHOP.ALICEDIVERSION
  J:15690  "ALICEDIVERSION": "USE ALICE AS A DIVERSION",
E:18523 / J:33306  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.1
E:18524 / J:33307  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.2
E:18525 / J:33308  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.3
E:18526 / J:33309  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.4
E:18527 / J:33310  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.5
E:18528 / J:33313  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.1
E:18529 / J:33314  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.2
E:18530 / J:33315  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.3
E:18531 / J:33316  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.4
E:18532 / J:33317  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.5
E:18533 / J:33320  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.1
E:18534 / J:33321  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.2
E:18535 / J:33322  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.3
E:18536 / J:33323  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.4
E:18537 / J:33324  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.5
E:18538 / J:33325  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.6
T02:824  <div class="condition">
T02:825  <p>Use Alice as a diversion</p>
T02:826  </div>
T08:775  "X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS"
T08:786  <div class="condition">
T08:787  <p>
T08:788  Kara robbed the supermarket in
T08:789  <a [routerLink]="['/chapters', 13]"
T08:790  >On The Run</a
T08:791  >, in her android uniform
T08:792  </p>
T08:793  </div>
T08:805  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01"
T08:813  <div class="condition">
T08:814  <p>
T08:815  Kara robbed the supermarket in
T08:816  <a [routerLink]="['/chapters', 13]"
T08:817  >On The Run</a
T08:818  >, in stolen clothes
T08:819  </p>
T08:820  </div>
T08:828  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02"
```

### ch10-24

**Observation to settle:** [what unlocks] Could Kara pick up the pliers on the parking-lot generator before she had looked at the squat's fence (yes/no)?

**Condition needed:** generatorCuttersAvailable independent of inspectedSquatFence.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** A single flowchart cutter node merges acquisition routes; the generic Pliers label has no prerequisite. PowerPyx distinguishes generator acquisition from the shop's fence lock, but no executable availability check confirms order. No change to generator availability.

**Cross-check:** FC10; PP10-1, PP10-2. Shelter and cutter routes establish reachable events, not every free-roam availability lock. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:CUTTER|SQUAT)|GUI\.ACTION\.[A-Z0-9.]*?(?:PLIERS|CUTTER))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
wire cutter|squat.*fence
```

**All search hits (37 source locations):**

```text
E:92 / J:98  GUI.ACTION.TMP.PLIERS
E:9668 / J:15645  MENU.FLOWCHART.03K.SQUAT.CHECK
  J:15645  "CHECK": "CHECK SQUAT",
E:9669 / J:15646  MENU.FLOWCHART.03K.SQUAT.CUTTER
  J:15646  "CUTTER": "FIND WIRE CUTTERS",
E:9670 / J:15647  MENU.FLOWCHART.03K.SQUAT.CUTSTREET
  J:15647  "CUTSTREET": "CUT STREET FENCE",
E:9671 / J:15648  MENU.FLOWCHART.03K.SQUAT.CUTPARKING
  J:15648  "CUTPARKING": "CUT PARKING LOT FENCE",
E:9672 / J:15649  MENU.FLOWCHART.03K.SQUAT.ENTER
  J:15649  "ENTER": "INSIDE SQUAT",
E:9673 / J:15650  MENU.FLOWCHART.03K.SQUAT.GETIN
  J:15650  "GETIN": "FIND A WAY INSIDE",
E:9674 / J:15651  MENU.FLOWCHART.03K.SQUAT.RALPH
  J:15651  "RALPH": "MEET RALPH",
E:9675 / J:15652  MENU.FLOWCHART.03K.SQUAT.CONVINCE
  J:15652  "CONVINCE": "CONVINCE",
E:9676 / J:15653  MENU.FLOWCHART.03K.SQUAT.THREATEN
  J:15653  "THREATEN": "THREATEN WITH GUN",
E:9677 / J:15654  MENU.FLOWCHART.03K.SQUAT.GIVEUP
  J:15654  "GIVEUP": "GIVE UP",
E:9678 / J:15655  MENU.FLOWCHART.03K.SQUAT.LEAVE
  J:15655  "LEAVE": "LEAVE SQUAT",
E:9679 / J:15656  MENU.FLOWCHART.03K.SQUAT.FIRE
  J:15656  "FIRE": "START A FIRE",
E:9680 / J:15657  MENU.FLOWCHART.03K.SQUAT.BED
  J:15657  "BED": "MAKE A BED",
E:9681 / J:15658  MENU.FLOWCHART.03K.SQUAT.TALKALICE
  J:15658  "TALKALICE": "TALK TO ALICE",
E:9682 / J:15659  MENU.FLOWCHART.03K.SQUAT.PROMISE
  J:15659  "PROMISE": "MAKE PROMISE",
E:9683 / J:15660  MENU.FLOWCHART.03K.SQUAT.NOPROMISE
  J:15660  "NOPROMISE": "DON'T MAKE PROMISE",
E:9684 / J:15661  MENU.FLOWCHART.03K.SQUAT.TOY
  J:15661  "TOY": "GIVE TOY",
E:9685 / J:15662  MENU.FLOWCHART.03K.SQUAT.CHOCO
  J:15662  "CHOCO": "GIVE CHOCOLATE",
E:9686 / J:15663  MENU.FLOWCHART.03K.SQUAT.SLEEP
  J:15663  "SLEEP": "WATCH ALICE FROM CHAIR",
E:9687 / J:15664  MENU.FLOWCHART.03K.SQUAT.SLEEPALICE
  J:15664  "SLEEPALICE": "KARA SLEEPS NEXT TO ALICE",
E:9688 / J:15665  MENU.FLOWCHART.03K.SQUAT.END
  J:15665  "END": "ALICE & KARA STAYED IN THE SQUAT"
E:9691 / J:15670  MENU.FLOWCHART.03K.CAR.CUTTER
  J:15670  "CUTTER": "TAKE WIRE CUTTERS",
E:9726 / J:15707  MENU.FLOWCHART.03K.SHOP.CUTTERSTEAL
  J:15707  "CUTTERSTEAL": "STEAL WIRE CUTTERS",
E:9727 / J:15708  MENU.FLOWCHART.03K.SHOP.CUTTERLEAVE
  J:15708  "CUTTERLEAVE": "LEAVE WIRE CUTTERS",
T02:1633  <h2 id="wire-fence">
T02:1634  Found a wire cutter: going through the fence
T02:1635  </h2>
T05:180  <div class="condition">
T05:181  <p>
T05:182  Kara stole wire cutters from the supermarket in
T05:183  <a [routerLink]="['/chapters', 10]">Fugitives</a>
T05:184  </p>
T05:185  </div>
T05:246  <div class="condition">
T05:247  <p>Kara didn't steal the wire cutters</p>
T05:248  </div>
```

### ch10-34

**Observation to settle:** [which buttons the model is offered] Could Kara settle into a shelter (for example the abandoned car) without ever meeting the trash-collector android (yes/no)?

**Condition needed:** trashCollectorMet required before shelter commit.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Later address dialogue presupposes the encounter but does not encode a shelter-commit guard. No change to shelter availability/order.

**Cross-check:** FC10; PP10-1, PP10-2. Shelter and cutter routes establish reachable events, not every free-roam availability lock. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0301K\.[A-Z0-9.]*?(?:GARBAGE|TRASH|ADDRESS)|X0401K\.[A-Z0-9.]*?ADDRESS))|(?:X0301K\.STREET\.BUSSTOP\.|X040[14]K\.[A-Z0-9.]*?(?:02ANDROID|WAKEUPV2)|MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:ANDROID|BUSSTOP))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
alice sits at the bus stop|trash.collect|dustman
```

**All search hits (41 source locations):**

```text
E:9734 / J:15716  MENU.FLOWCHART.03K.BINANDROID
  J:15716  "BINANDROID": "TALK TO ANDROID TRASH COLLECTOR",
E:16375 / J:28822  X0301K.STREET.BUSSTOP.PC.X03KKARA.ALICE.1
E:16376 / J:28823  X0301K.STREET.BUSSTOP.PC.X03KKARA.ALICE.2
E:16377 / J:28826  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.1
E:16378 / J:28827  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.2
E:16379 / J:28828  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.3
E:16380 / J:28829  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.4
E:16381 / J:28830  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.5
E:16382 / J:28831  X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.6
E:16383 / J:28835  X0301K.STREET.BUSSTOP.PC.X03KALICE.WHERE
E:16384 / J:28839  X0301K.STREET.BUSSTOP.PC.X03KANDDUSTMAN.WHERE.1
E:16385 / J:28840  X0301K.STREET.BUSSTOP.PC.X03KANDDUSTMAN.WHERE.2
E:17520 / J:31139  X0401K.MOTEL.TOUGHTALK.PC.X04KKARA.02ANDROID.1
E:17521 / J:31140  X0401K.MOTEL.TOUGHTALK.PC.X04KKARA.02ANDROID.2
E:17522 / J:31141  X0401K.MOTEL.TOUGHTALK.PC.X04KKARA.02ANDROID.3
E:17568 / J:31214  X0401K.MOTEL.TOUGHTALK.PC.X04KALICE.02ANDROID
E:17632 / J:31333  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.1
E:17633 / J:31334  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.2
E:17634 / J:31335  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.3
E:17635 / J:31336  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.4
E:17636 / J:31337  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.5
E:17637 / J:31338  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.6
E:17638 / J:31339  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.7
E:17639 / J:31340  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.8
E:17640 / J:31341  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.9
E:17641 / J:31342  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.10
E:17642 / J:31343  X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2.11
E:17643 / J:31348  X0404K.CAR.WAKEUP.PC.X04KALICE.WAKEUPV2.1
E:17644 / J:31349  X0404K.CAR.WAKEUP.PC.X04KALICE.WAKEUPV2.2
E:17645 / J:31350  X0404K.CAR.WAKEUP.PC.X04KALICE.WAKEUPV2.3
T02:118  <h2 id="alice-bus-stop">Alice sits at the bus stop</h2>
T02:127  {{ t("X0301K.STREET.BUSSTOP.PC.X03KANDDUSTMAN.WHERE.1") }}
T02:130  {{ t("X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE.3") }}
T02:133  {{ t("X0301K.STREET.BUSSTOP.PC.X03KANDDUSTMAN.WHERE.2") }}
T02:138  "X0301K.STREET.BUSSTOP.PC.X03KKARA.WHERE",
T05:15  "X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2",
T05:22  {{ t("X0404K.CAR.WAKEUP.PC.X04KALICE.WAKEUPV2.1") }}
T05:27  "X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2",
T05:36  "X0404K.CAR.WAKEUP.PC.X04KALICE.WAKEUPV2",
T05:44  "X0404K.CAR.WAKEUP.PC.X04KKARA.WAKEUPV2",
T05:1426  "X0401K.MOTEL.TOUGHTALK.PC.X04KKARA.02ANDROID"
```

### ch11-05

**Observation to settle:** [which buttons the model is offered] After Markus had already fitted both the new eye and the new audio processor, could the crawling android still grab him and beg to die (yes/no)?

**Condition needed:** beggingAndroid active until optical/audio replacement flags.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The mercy encounter and repair objectives coexist in text. No condition tests both replacement flags or despawns the begging android. No change to encounter order.

**Cross-check:** FC11; PP11-1. The chart names repair and encounter events without an audio-and-eye conjunctive interaction condition. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.03M\.[A-Z0-9.]*?(?:BEG|KILL|AUDIO|OPTIC)|X0301M\.[A-Z0-9.]*?(?:BEG|KILLME)))|(?:MENU\.FLOWCHART\.03M\.[A-Z0-9.]*?(?:KILL|SPARE|PART|REPLACE)|THOUGHTS\.0301M\.[A-Z0-9.]*?(?:EAR|EYE|OPTICAL|AUDIO)|X0301M\.[A-Z0-9.]*?(?:BEG|LETME|KILLME))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
android begs to die|optical unit|audio processor
```

**All search hits (10 source locations):**

```text
E:3964 / J:5619  THOUGHTS.0301M.RIGHTEYE
  J:5619  "RIGHTEYE": "OPTICAL UNIT MISSING",
E:3969 / J:5624  THOUGHTS.0301M.EAR
  J:5624  "EAR": "AUDIO PROCESSOR MISSING",
E:3981 / J:5636  THOUGHTS.0301M.OPTICALUNITFIND
  J:5636  "OPTICALUNITFIND": "FIND OPTICAL UNIT",
E:3983 / J:5638  THOUGHTS.0301M.AUDIOPROCESSORFIND
  J:5638  "AUDIOPROCESSORFIND": "FIND AUDIO PROCESSOR",
E:3984 / J:5639  THOUGHTS.0301M.OPTICALUNITFUNC
  J:5639  "OPTICALUNITFUNC": "OPTICAL UNIT FUNCTIONING",
E:3985 / J:5640  THOUGHTS.0301M.AUDIOPROCEFUNC
  J:5640  "AUDIOPROCEFUNC": "AUDIO PROCESSOR FUNCTIONING",
E:8820 / J:14698  MENU.FLOWCHART.03M.SPARE
  J:14698  "SPARE": "REFUSE TO KILL FOR PUMP",
E:8821 / J:14699  MENU.FLOWCHART.03M.KILL
  J:14699  "KILL": "KILL",
T03:135  <h2 id="beg-die">Android begs to die</h2>
T03:229  <h3 id="take-eye">Remove optical unit</h3>
```

### ch13-01

**Observation to settle:** [which buttons the model is offered] As Connor searching the squat (Ralph kept quiet), could you walk out on your own before Hank ordered you out, and did that unlock a LEAVE THE SQUAT node? (yes/no)

**Condition needed:** voluntarySquatExit enabled before Hank-order event on current build.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The surviving SQUAT.C.LEAVE key is a legacy label, not proof of a shipped transition. The completed post-patch chart lacks that node. This supports treating the current offered exit as unverified, not establishing its removal from gameplay. No change pending interaction control.

**Cross-check:** FC13; PP13-1, PP13-2. Use the completed post-patch chart; legacy localized nodes alone do not add shipped interactions. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
MENU\.FLOWCHART\.04K\.SQUAT\.C\.
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
leave the squat|Connor investigates the squat
```

**All search hits (24 source locations):**

```text
E:10048 / J:16048  MENU.FLOWCHART.04K.SQUAT.C.INVESTIGATE01
  J:16048  "INVESTIGATE01": "CONNOR INVESTIGATES THE SQUAT",
E:10049 / J:16049  MENU.FLOWCHART.04K.SQUAT.C.ENTER
  J:16049  "ENTER": "ENTER SQUAT",
E:10050 / J:16050  MENU.FLOWCHART.04K.SQUAT.C.INTERROGATE
  J:16050  "INTERROGATE": "INTERROGATE SQUAT ANDROID",
E:10051 / J:16051  MENU.FLOWCHART.04K.SQUAT.C.RALPHUPSET
  J:16051  "RALPHUPSET": "SQUAT DEVIANT INFORMS ON AX400",
E:10052 / J:16052  MENU.FLOWCHART.04K.SQUAT.C.RALPHNOTUPSET
  J:16052  "RALPHNOTUPSET": "SQUAT ANDROID KEEPS QUIET",
E:10053 / J:16053  MENU.FLOWCHART.04K.SQUAT.C.ANALYZE
  J:16053  "ANALYZE": "ANALYZE SQUAT ANDROID",
E:10054 / J:16054  MENU.FLOWCHART.04K.SQUAT.C.INVESTIGATE02
  J:16054  "INVESTIGATE02": "INVESTIGATE SQUAT GROUND FLOOR",
E:10055 / J:16055  MENU.FLOWCHART.04K.SQUAT.C.UPSTAIRS
  J:16055  "UPSTAIRS": "CHECK UPSTAIRS",
E:10056 / J:16056  MENU.FLOWCHART.04K.SQUAT.C.TABLE
  J:16056  "TABLE": "CHECK TABLE",
E:10057 / J:16057  MENU.FLOWCHART.04K.SQUAT.C.STAIRS
  J:16057  "STAIRS": "CHECK UNDER THE STAIRS",
E:10058 / J:16058  MENU.FLOWCHART.04K.SQUAT.C.KITCHEN
  J:16058  "KITCHEN": "CHECK KITCHEN",
E:10059 / J:16059  MENU.FLOWCHART.04K.SQUAT.C.FIREPLACE
  J:16059  "FIREPLACE": "CHECK FIREPLACE",
E:10060 / J:16060  MENU.FLOWCHART.04K.SQUAT.C.HANK
  J:16060  "HANK": "HANK COMMANDS CONNOR TO LEAVE",
E:10061 / J:16061  MENU.FLOWCHART.04K.SQUAT.C.ATTACK
  J:16061  "ATTACK": "SQUAT ANDROID ATTACKS CONNOR",
E:10062 / J:16062  MENU.FLOWCHART.04K.SQUAT.C.LEAVE
  J:16062  "LEAVE": "LEAVE THE SQUAT",
E:10063 / J:16063  MENU.FLOWCHART.04K.SQUAT.C.FAILURE
  J:16063  "FAILURE": "AX400 AND CHILD ESCAPED",
E:10064 / J:16064  MENU.FLOWCHART.04K.SQUAT.C.RALPHVANISH
  J:16064  "RALPHVANISH": "SQUAT ANDROID DISAPPEARS"
T02:1821  <p class="note">
T02:1822  <span dir="ltr">They leave the squat.</span>
T02:1823  </p>
T02:1852  <p class="note">
T02:1853  <span dir="ltr">They leave the squat.</span>
T02:1854  </p>
T05:689  <h2 id="connor-squat">Connor investigates the squat</h2>
```

### ch13-29

**Observation to settle:** [which buttons the model is offered] In the motel, could Kara go to the TV without drawing the bath, so that she never cut her hair or removed her LED? (yes/no)

**Condition needed:** motelTVAvailable before bath, haircut and LED removal.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Explore/TV labels and chart ordering support exploration without proving the TV interaction's active flag before the bath. The scripted appearance line is not a runtime prerequisite. No change to CHANGE CHANNEL availability.

**Cross-check:** FC13; PP13-1, PP13-2. Use the completed post-patch chart; legacy localized nodes alone do not add shipped interactions. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.04K\.MOTEL\.|X0401K\.[A-Z0-9.]*?(?:BATH|HAIR|TV))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
draw.*bath|cut.*hair|watch tv
```

**All search hits (120 source locations):**

```text
E:10067 / J:16070  MENU.FLOWCHART.04K.MOTEL.START
  J:16070  "START": "MORNING IN MOTEL",
E:10068 / J:16071  MENU.FLOWCHART.04K.MOTEL.ALICETALK
  J:16071  "ALICETALK": "TALK TO ALICE",
E:10069 / J:16072  MENU.FLOWCHART.04K.MOTEL.BATHSTART
  J:16072  "BATHSTART": "DRAW A BATH FOR ALICE",
E:10070 / J:16073  MENU.FLOWCHART.04K.MOTEL.CHANGE
  J:16073  "CHANGE": "CUT AND COLOR HAIR",
E:10071 / J:16074  MENU.FLOWCHART.04K.MOTEL.BROWN
  J:16074  "BROWN": "BROWN",
E:10072 / J:16075  MENU.FLOWCHART.04K.MOTEL.BLACK
  J:16075  "BLACK": "BLACK",
E:10073 / J:16076  MENU.FLOWCHART.04K.MOTEL.BLONDE
  J:16076  "BLONDE": "BLONDE",
E:10074 / J:16077  MENU.FLOWCHART.04K.MOTEL.WHITE
  J:16077  "WHITE": "WHITE",
E:10075 / J:16078  MENU.FLOWCHART.04K.MOTEL.LED
  J:16078  "LED": "REMOVE LED",
E:10076 / J:16079  MENU.FLOWCHART.04K.MOTEL.COLOR
  J:16079  "COLOR": "KARA CHANGED HAIR COLOR",
E:10077 / J:16080  MENU.FLOWCHART.04K.MOTEL.BATHSTOP
  J:16080  "BATHSTOP": "FINISH DRAWING BATH",
E:10078 / J:16081  MENU.FLOWCHART.04K.MOTEL.EXPLORE
  J:16081  "EXPLORE": "EXPLORE MOTEL ROOM",
E:10079 / J:16082  MENU.FLOWCHART.04K.MOTEL.CLOCK
  J:16082  "CLOCK": "LOOK AT THE CLOCK",
E:10080 / J:16083  MENU.FLOWCHART.04K.MOTEL.OUTSIDE
  J:16083  "OUTSIDE": "LOOK OUTSIDE",
E:10081 / J:16084  MENU.FLOWCHART.04K.MOTEL.PAINTING
  J:16084  "PAINTING": "LOOK AT THE PAINTING",
E:10082 / J:16085  MENU.FLOWCHART.04K.MOTEL.TVON
  J:16085  "TVON": "CHANGE CHANNEL",
E:10083 / J:16086  MENU.FLOWCHART.04K.MOTEL.TVNEWS
  J:16086  "TVNEWS": "ALICE HEARS ABOUT TODD",
E:10084 / J:16087  MENU.FLOWCHART.04K.MOTEL.CHEERS
  J:16087  "CHEERS": "CHEER ALICE UP",
E:10085 / J:16088  MENU.FLOWCHART.04K.MOTEL.BREAKFAST
  J:16088  "BREAKFAST": "LOOK FOR BREAKFAST",
E:10086 / J:16089  MENU.FLOWCHART.04K.MOTEL.POLICE
  J:16089  "POLICE": "KARA SPOTS POLICE FORCES",
E:10087 / J:16091  MENU.FLOWCHART.04K.MOTEL.C.INVESTIGATE
  J:16091  "INVESTIGATE": "CONNOR INVESTIGATES THE MOTEL",
E:10088 / J:16092  MENU.FLOWCHART.04K.MOTEL.C.INTERVIEW
  J:16092  "INTERVIEW": "INTERROGATE RECEPTIONIST",
E:10089 / J:16093  MENU.FLOWCHART.04K.MOTEL.C.FOLLOW
  J:16093  "FOLLOW": "FOLLOW HANK",
E:10090 / J:16094  MENU.FLOWCHART.04K.MOTEL.C.ROOM
  J:16094  "ROOM": "HANK CHECKS MOTEL ROOM",
E:10091 / J:16095  MENU.FLOWCHART.04K.MOTEL.C.DOOR
  J:16095  "DOOR": "CHECK THE DOOR"
E:10092 / J:16097  MENU.FLOWCHART.04K.MOTEL.MAGAZINE1ST
  J:16097  "MAGAZINE1ST": "READ \"CYBER-WILDLIFE\"",
E:10093 / J:16098  MENU.FLOWCHART.04K.MOTEL.MAGAZINE2ND
  J:16098  "MAGAZINE2ND": "READ \"ANDROID AND CANADA\""
E:17451 / J:31008  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.1
E:17452 / J:31009  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.2
E:17453 / J:31010  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.3
E:17454 / J:31011  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.4
E:17455 / J:31012  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.5
E:17456 / J:31013  X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH.6
E:17463 / J:31023  X0401K.MOTEL.WAKEUP.PC.X04KKARA.KARACHAIR
E:17467 / J:31029  X0401K.MOTEL.WAKEUP.PC.X04KALICE.BATH
E:17470 / J:31032  X0401K.MOTEL.WAKEUP.PC.X04KALICE.KARACHAIR
E:17474 / J:31038  X0401K.MOTEL.WAKEUP.PC.CHOICEGROUP01.BATH
E:17495 / J:31099  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP01.WHITE
E:17496 / J:31100  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP01.BLONDE
E:17497 / J:31101  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP01.BROWN
E:17498 / J:31102  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP01.BLACK
E:17499 / J:31105  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP02.CHANGE
E:17500 / J:31106  X0401K.MOTEL.HAIRCOLOR.PC.CHOICEGROUP02.FINISH
E:17618 / J:31299  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDDEAD01.1
E:17619 / J:31300  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDDEAD01.2
E:17620 / J:31301  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDDEAD01.3
E:17621 / J:31302  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDDEAD01.4
E:17622 / J:31305  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01A.1
E:17623 / J:31306  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01A.2
E:17624 / J:31309  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01B.1
E:17625 / J:31310  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01B.2
E:17626 / J:31311  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01B.3
E:17627 / J:31312  X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01B.4
E:17628 / J:31317  X0401K.TV.TODDONTV.PC.X04KDAD.TODDALIVE01T.1
E:17629 / J:31318  X0401K.TV.TODDONTV.PC.X04KDAD.TODDALIVE01T.2
E:17630 / J:31319  X0401K.TV.TODDONTV.PC.X04KDAD.TODDALIVE01T.3
E:17631 / J:31320  X0401K.TV.TODDONTV.PC.X04KDAD.TODDALIVE01T.4
T01:620  <h2 id="watch-tv">
T01:621  <app-unlock-condition [unlockType]="UnlockType.Tv">
T01:622  Watch TV
T01:623  </app-unlock-condition>
T01:624  </h2>
T02:215  <h2 id="watch-tv">Watch TV</h2>
T04:654  <h2 id="reception-tv">
T04:655  <app-unlock-condition [unlockType]="UnlockType.Tv">
T04:656  Watch TV
T04:657  </app-unlock-condition>
T04:658  </h2>
T04:1307  <h3 id="break-room-tv">
T04:1308  <app-unlock-condition [unlockType]="UnlockType.Tv">
T04:1309  Watch TV
T04:1310  </app-unlock-condition>
T04:1311  </h3>
T05:1123  [choiceLabel]="t('X0401K.MOTEL.WAKEUP.PC.CHOICEGROUP01.BATH')"
T05:1133  "X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH",
T05:1182  "X0401K.MOTEL.WAKEUP.PC.X04KKARA.BATH",
T05:1203  <h2 id="tv">
T05:1204  <app-unlock-condition [unlockType]="UnlockType.Tv">
T05:1205  Watch TV
T05:1206  </app-unlock-condition>
T05:1207  </h2>
T05:1226  "X0401K.TV.TODDONTV.PC.X04KJOSS.TODDDEAD01"
T05:1279  "X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01A"
T05:1286  "X0401K.TV.TODDONTV.PC.X04KDAD.TODDALIVE01T"
T05:1293  "X0401K.TV.TODDONTV.PC.X04KJOSS.TODDALIVE01B"
T08:748  <h2 id="tv">
T08:749  <app-unlock-condition [unlockType]="UnlockType.Tv">
T08:750  Watch TV
T08:751  </app-unlock-condition>
T08:752  </h2>
T09:1184  <h2 id="tv">
T09:1185  <app-unlock-condition [unlockType]="UnlockType.Tv">
T09:1186  Watch TV
T09:1187  </app-unlock-condition>
T09:1188  </h2>
T14:324  <h2 id="tv">
T14:325  <app-unlock-condition [unlockType]="UnlockType.Tv">
T14:326  Watch TV
T14:327  </app-unlock-condition>
T14:328  </h2>
T16:1098  <h2 id="tv">
T16:1099  <app-unlock-condition [unlockType]="UnlockType.Tv">
T16:1100  Watch TV
T16:1101  </app-unlock-condition>
T16:1102  </h2>
T21:3  <h2 id="tv">
T21:4  <app-unlock-condition [unlockType]="UnlockType.Tv">
T21:5  Watch TV
T21:6  </app-unlock-condition>
T21:7  </h2>
T33:335  <h2 id="todd-room-tv">
T33:336  <app-unlock-condition [unlockType]="UnlockType.Tv">
T33:337  Watch TV
T33:338  </app-unlock-condition>
T33:339  </h2>
T34:369  <h3 id="watch-tv">
T34:370  <app-unlock-condition [unlockType]="UnlockType.Tv">
T34:371  Watch TV
T34:372  </app-unlock-condition>
T34:373  </h3>
```

### ch13-36

**Observation to settle:** [what unlocks] If Kara threatened Ralph with the gun in Fugitives but was kind at the table in On the Run, did Ralph give her away to Connor ('She ran out the back door!')? (yes/no)

**Condition needed:** RalphThreatEver versus breakfastThreatOnly controls betrayal.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The downstream prose says only Kara threatened Ralph, with no chapter-scoped identifier. The dinner gun/knife variants do not identify whether the earlier Fugitives threat persists. A RalphThreatEver rule is plausible but unproven. No change to the breakfast-only producer.

**Cross-check:** FC13; PP13-1, PP13-2. Use the completed post-patch chart; legacy localized nodes alone do not add shipped interactions. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0401K\.[A-Z0-9.]*?(?:RALPH.*(?:THREAT|ESCAP|BACK|RUN)|(?:THREAT|ESCAP|BACK).*RALPH)|MENU\.FLOWCHART\.04K\.[A-Z0-9.]*?(?:RALPH|GUN)))|(?:X0305K\.SQUAT\.RALPH\.[A-Z0-9.]*?(?:THREAT|REVOLVER)|X0402K\.SQUAT\.SPEAKRALPH\.|X0402K\.SQUAT\.COYPU\.[A-Z0-9.]*?(?:THREAT|DRAWGUN|REVOLVER))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Kara threatened Ralph|Kara was nice with Ralph|Kara threatens Ralph
```

**All search hits (104 source locations):**

```text
E:10019 / J:16018  MENU.FLOWCHART.04K.SQUAT.RALPHSTUFF
  J:16018  "RALPHSTUFF": "LOOK AT RALPH'S STUFF",
E:10020 / J:16019  MENU.FLOWCHART.04K.SQUAT.RALPHMONEY
  J:16019  "RALPHMONEY": "STEAL MONEY",
E:10021 / J:16020  MENU.FLOWCHART.04K.SQUAT.RALPHLEAFLET
  J:16020  "RALPHLEAFLET": "READ LEAFLET",
E:10032 / J:16031  MENU.FLOWCHART.04K.SQUAT.GUNFORGOT
  J:16031  "GUNFORGOT": "FORGOT GUN",
E:10033 / J:16032  MENU.FLOWCHART.04K.SQUAT.GUNTAKE
  J:16032  "GUNTAKE": "TAKE GUN BACK",
E:10038 / J:16037  MENU.FLOWCHART.04K.SQUAT.RALPHMEAL
  J:16037  "RALPHMEAL": "RALPH WANTS A FAMILY MEAL",
E:10041 / J:16040  MENU.FLOWCHART.04K.SQUAT.RALPHTHREATEN
  J:16040  "RALPHTHREATEN": "RALPH THREATENS ALICE",
E:10046 / J:16045  MENU.FLOWCHART.04K.SQUAT.RALPHSORRY
  J:16045  "RALPHSORRY": "RALPH APOLOGIZES",
E:10051 / J:16051  MENU.FLOWCHART.04K.SQUAT.C.RALPHUPSET
  J:16051  "RALPHUPSET": "SQUAT DEVIANT INFORMS ON AX400",
E:10052 / J:16052  MENU.FLOWCHART.04K.SQUAT.C.RALPHNOTUPSET
  J:16052  "RALPHNOTUPSET": "SQUAT ANDROID KEEPS QUIET",
E:10064 / J:16064  MENU.FLOWCHART.04K.SQUAT.C.RALPHVANISH
  J:16064  "RALPHVANISH": "SQUAT ANDROID DISAPPEARS"
E:16579 / J:29317  X0305K.SQUAT.RALPH.PC.X03KKARA.REVOLVER
E:16580 / J:29319  X0305K.SQUAT.RALPH.PC.X03KKARA.THREATEN.1
E:16581 / J:29320  X0305K.SQUAT.RALPH.PC.X03KKARA.THREATEN.2
E:16582 / J:29321  X0305K.SQUAT.RALPH.PC.X03KKARA.THREATEN.3
E:16600 / J:29348  X0305K.SQUAT.RALPH.PC.X03KALICE.REVOLVER
E:16601 / J:29349  X0305K.SQUAT.RALPH.PC.X03KALICE.THREATEN
E:16623 / J:29381  X0305K.SQUAT.RALPH.PC.X03KRALPH.REVOLVER
E:16624 / J:29382  X0305K.SQUAT.RALPH.PC.X03KRALPH.THREATEN
E:16648 / J:29418  X0305K.SQUAT.RALPH.PC.NOHUMANCHOICE02.REVOLVER
E:17689 / J:31463  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.AX400
E:17690 / J:31464  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.DEVIANTS
E:17691 / J:31465  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REASSURE
E:17692 / J:31466  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.PRESSURIZE
E:17693 / J:31467  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.AX400R
E:17694 / J:31469  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.BLUEBLOOD.1
E:17695 / J:31470  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.BLUEBLOOD.2
E:17696 / J:31473  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.DEVIANTSR.1
E:17697 / J:31474  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.DEVIANTSR.2
E:17698 / J:31475  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.DEVIANTSR.3
E:17699 / J:31478  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REPORTR.1
E:17700 / J:31479  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REPORTR.2
E:17701 / J:31480  X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REPORTR.3
E:17702 / J:31485  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.AX400.1
E:17703 / J:31486  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.AX400.2
E:17704 / J:31488  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.DEVIANTS
E:17705 / J:31490  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REASSURE.1
E:17706 / J:31491  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REASSURE.2
E:17707 / J:31494  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.PRESSURIZE.1
E:17708 / J:31495  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.PRESSURIZE.2
E:17709 / J:31496  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.PRESSURIZE.3
E:17710 / J:31498  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.AX400R
E:17711 / J:31500  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.BLUEBLOOD.1
E:17712 / J:31501  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.BLUEBLOOD.2
E:17713 / J:31503  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.DEVIANTSR
E:17714 / J:31504  X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REPORTR
E:17715 / J:31507  X0402K.SQUAT.SPEAKRALPH.PC.X04CCONNOR.REPORT
E:17716 / J:31510  X0402K.SQUAT.SPEAKRALPH.PC.X04KHANK.REPORT
E:17717 / J:31513  X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.AX400
E:17718 / J:31514  X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.DEVIANTS
E:17719 / J:31515  X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.REASSURE
E:17720 / J:31516  X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.PRESSURIZE
E:17721 / J:31517  X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.BLUEBLOOD
E:17766 / J:31606  X0402K.SQUAT.COYPU.PC.X04KKARA.THREATEN
E:17767 / J:31607  X0402K.SQUAT.COYPU.PC.X04KKARA.DRAWGUN
E:17789 / J:31633  X0402K.SQUAT.COYPU.PC.X04KALICE.THREATEN
E:17790 / J:31634  X0402K.SQUAT.COYPU.PC.X04KALICE.DRAWGUN
E:17857 / J:31729  X0402K.SQUAT.COYPU.PC.X04KRALPH.THREATEN
E:17858 / J:31730  X0402K.SQUAT.COYPU.PC.X04KRALPH.DRAWGUN
E:17882 / J:31768  X0402K.SQUAT.COYPU.PC.CHOICEGROUP05.REVOLVER
E:17885 / J:31773  X0402K.SQUAT.COYPU.PC.CHOICEGROUP06.REVOLVER
E:17889 / J:31777  X0402K.SQUAT.COYPU.PC.CHOICEGROUP06.THREATEN
T02:1746  t('X0305K.SQUAT.RALPH.PC.NOHUMANCHOICE02.REVOLVER')
T02:1752  {{ t("X0305K.SQUAT.RALPH.PC.X03KKARA.REVOLVER") }}
T02:1755  {{ t("X0305K.SQUAT.RALPH.PC.X03KRALPH.REVOLVER") }}
T02:1801  "X0305K.SQUAT.RALPH.PC.X03KKARA.THREATEN"
T05:592  t('X0402K.SQUAT.COYPU.PC.CHOICEGROUP06.THREATEN')
T05:605  "X0402K.SQUAT.COYPU.PC.X04KKARA.THREATEN"
T05:613  <div class="condition">
T05:614  <p>
T05:615  Kara has a gun : Kara threatens Ralph with
T05:616  the gun
T05:617  </p>
T05:618  </div>
T05:623  "X0402K.SQUAT.COYPU.PC.X04KKARA.DRAWGUN"
T05:694  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.BLUEBLOOD"
T05:702  <div class="condition"><p>Kara was nice with Ralph</p></div>
T05:746  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.AX400'
T05:754  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.AX400"
T05:761  "X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.AX400R"
T05:770  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.DEVIANTS'
T05:778  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.DEVIANTS"
T05:785  "X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.DEVIANTSR"
T05:794  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.REASSURE'
T05:802  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REASSURE"
T05:811  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.BLUEBLOOD'
T05:819  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.BLUEBLOOD"
T05:826  "X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.BLUEBLOOD"
T05:871  <div class="condition"><p>Kara threatened Ralph</p></div>
T05:877  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.AX400'
T05:885  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.AX400"
T05:894  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.DEVIANTS'
T05:902  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.DEVIANTS"
T05:911  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.REASSURE'
T05:919  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REASSURE"
T05:928  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.BLUEBLOOD'
T05:936  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.BLUEBLOOD"
T05:945  'X0402K.SQUAT.SPEAKRALPH.PC.CHOICEGROUP01.PRESSURIZE'
T05:953  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.PRESSURIZE"
T05:965  "X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REPORTR",
T05:974  "X0402K.SQUAT.SPEAKRALPH.PC.X04KCONNOR.REPORTR"
T05:981  "X0402K.SQUAT.SPEAKRALPH.PC.X04KRALPH.REPORTR.3"
T05:988  "X0402K.SQUAT.SPEAKRALPH.PC.X04KHANK.REPORT"
T05:995  "X0402K.SQUAT.SPEAKRALPH.PC.X04CCONNOR.REPORT"
```

### ch14-05

**Observation to settle:** [wording only] In a run where Connor stood still and Kara & Alice VANISHED in On the Run, which cover was on the Ferndale bench in Jericho: 'Android on the Run!' or 'Fortune Teller'?

**Condition needed:** magazineChaseNews flag: any pursuit versus highway outcome.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Magazine service describes publications, not a save-state selection predicate. Magazine labels and later escape reports are separate consumers; neither proves VANISHED selects this cover. No change to magazine or Zlatko report gates.

**Cross-check:** FC14; PP14-1. The magazine node does not distinguish every On-the-Run pursuit outcome in its prerequisite text. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:GUI\.MAGAZINE\.[A-Z0-9.]*?(?:ANDROID|FORTUNE)|MENU\.FLOWCHART\.05M\.[A-Z0-9.]*?(?:MAGAZINE|ANDROID)))|(?:\b(?:ONTHERUN|FORTUNETELLER|HIGHWAY)\b|GUI\.MAGAZINE\.[A-Z0-9.]*?(?:ANDROIDRUN|FORTUNE)|MENU\.FLOWCHART\.05M\.[A-Z0-9.]*?(?:MAGAZINE|ANDROID))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Android on the Run|Fortune Teller
```

**All search hits (159 source locations):**

```text
E:869 / J:1051  GUI.MENU.EXTRA.SOUNDTRACK.10.DESCRIPTION
E:913 / J:1117  GUI.MENU.EXTRA.SOUNDTRACK.08.DESCRIPTION
E:1510 / J:1949  GUI.MAGAZINE.CENTURY.ANDROIDPRESIDENT.TITLE
E:1511 / J:1950  GUI.MAGAZINE.CENTURY.ANDROIDPRESIDENT.SUBTITLE
E:1512 / J:1951  GUI.MAGAZINE.CENTURY.ANDROIDPRESIDENT.ARTICLE1
E:1513 / J:1952  GUI.MAGAZINE.CENTURY.ANDROIDPRESIDENT.ARTICLE2
E:1514 / J:1955  GUI.MAGAZINE.CENTURY.ANDROIDSANDBRAIN.TITLE
E:1515 / J:1956  GUI.MAGAZINE.CENTURY.ANDROIDSANDBRAIN.SUBTITLE
E:1516 / J:1957  GUI.MAGAZINE.CENTURY.ANDROIDSANDBRAIN.ARTICLE1
E:1517 / J:1958  GUI.MAGAZINE.CENTURY.ANDROIDSANDBRAIN.ARTICLE2
E:1553 / J:2014  GUI.MAGAZINE.DNEWS.GIANDROID.TITLE
E:1554 / J:2015  GUI.MAGAZINE.DNEWS.GIANDROID.SUBTITLE
E:1555 / J:2016  GUI.MAGAZINE.DNEWS.GIANDROID.ARTICLE1
E:1556 / J:2017  GUI.MAGAZINE.DNEWS.GIANDROID.ARTICLE2
E:1557 / J:2020  GUI.MAGAZINE.DNEWS.ONTHERUN.TITLE
E:1558 / J:2021  GUI.MAGAZINE.DNEWS.ONTHERUN.SUBTITLE
E:1559 / J:2022  GUI.MAGAZINE.DNEWS.ONTHERUN.ARTICLE1
E:1560 / J:2023  GUI.MAGAZINE.DNEWS.ONTHERUN.ARTICLE2
E:1561 / J:2026  GUI.MAGAZINE.DNEWS.ANDROIDARSON.TITLE
E:1562 / J:2027  GUI.MAGAZINE.DNEWS.ANDROIDARSON.SUBTITLE
E:1563 / J:2028  GUI.MAGAZINE.DNEWS.ANDROIDARSON.ARTICLE1
E:1564 / J:2029  GUI.MAGAZINE.DNEWS.ANDROIDARSON.ARTICLE2
E:1565 / J:2032  GUI.MAGAZINE.DNEWS.ANDROIDTERROR.TITLE
E:1566 / J:2033  GUI.MAGAZINE.DNEWS.ANDROIDTERROR.SUBTITLE
E:1567 / J:2034  GUI.MAGAZINE.DNEWS.ANDROIDTERROR.ARTICLE1
E:1568 / J:2035  GUI.MAGAZINE.DNEWS.ANDROIDTERROR.ARTICLE2
E:1581 / J:2056  GUI.MAGAZINE.DNEWS.ANDROIDZOO.TITLE
E:1582 / J:2057  GUI.MAGAZINE.DNEWS.ANDROIDZOO.SUBTITLE
E:1583 / J:2058  GUI.MAGAZINE.DNEWS.ANDROIDZOO.ARTICLE1
E:1584 / J:2059  GUI.MAGAZINE.DNEWS.ANDROIDZOO.ARTICLE2
E:1632 / J:2129  GUI.MAGAZINE.DNEWS.HIGHWAY.TITLE
E:1633 / J:2130  GUI.MAGAZINE.DNEWS.HIGHWAY.SUBTITLE
E:1634 / J:2131  GUI.MAGAZINE.DNEWS.HIGHWAY.ARTICLE1
E:1635 / J:2132  GUI.MAGAZINE.DNEWS.HIGHWAY.ARTICLE2
E:1640 / J:2143  GUI.MAGAZINE.TECHADDICT.ANDROIDSPY.TITLE
E:1641 / J:2144  GUI.MAGAZINE.TECHADDICT.ANDROIDSPY.SUBTITLE
E:1642 / J:2145  GUI.MAGAZINE.TECHADDICT.ANDROIDSPY.ARTICLE1
E:1643 / J:2146  GUI.MAGAZINE.TECHADDICT.ANDROIDSPY.ARTICLE2
E:1644 / J:2149  GUI.MAGAZINE.TECHADDICT.SECRETSANDROIDS.TITLE
E:1645 / J:2150  GUI.MAGAZINE.TECHADDICT.SECRETSANDROIDS.SUBTITLE
E:1646 / J:2151  GUI.MAGAZINE.TECHADDICT.SECRETSANDROIDS.ARTICLE1
E:1647 / J:2152  GUI.MAGAZINE.TECHADDICT.SECRETSANDROIDS.ARTICLE2
E:1648 / J:2155  GUI.MAGAZINE.TECHADDICT.ANDROIDASTRONAUTS.TITLE
E:1649 / J:2156  GUI.MAGAZINE.TECHADDICT.ANDROIDASTRONAUTS.SUBTITLE
E:1650 / J:2157  GUI.MAGAZINE.TECHADDICT.ANDROIDASTRONAUTS.ARTICLE1
E:1651 / J:2158  GUI.MAGAZINE.TECHADDICT.ANDROIDASTRONAUTS.ARTICLE2
E:1664 / J:2179  GUI.MAGAZINE.TECHADDICT.FORTUNETELLER.TITLE
E:1665 / J:2180  GUI.MAGAZINE.TECHADDICT.FORTUNETELLER.SUBTITLE
E:1666 / J:2181  GUI.MAGAZINE.TECHADDICT.FORTUNETELLER.ARTICLE1
E:1667 / J:2182  GUI.MAGAZINE.TECHADDICT.FORTUNETELLER.ARTICLE2
E:1694 / J:2227  GUI.MAGAZINE.GOSSIP.ANDROIDBAND.TITLE
E:1695 / J:2228  GUI.MAGAZINE.GOSSIP.ANDROIDBAND.SUBTITLE
E:1696 / J:2229  GUI.MAGAZINE.GOSSIP.ANDROIDBAND.ARTICLE1
E:1697 / J:2230  GUI.MAGAZINE.GOSSIP.ANDROIDBAND.ARTICLE2
E:1698 / J:2233  GUI.MAGAZINE.GOSSIP.ANDROIDSEX.TITLE
E:1699 / J:2234  GUI.MAGAZINE.GOSSIP.ANDROIDSEX.SUBTITLE
E:1700 / J:2235  GUI.MAGAZINE.GOSSIP.ANDROIDSEX.ARTICLE1
E:1701 / J:2236  GUI.MAGAZINE.GOSSIP.ANDROIDSEX.ARTICLE2
E:1709 / J:2250  GUI.MAGAZINE.ALLSPORTS.ANDROIDQB.TITLE
E:1710 / J:2251  GUI.MAGAZINE.ALLSPORTS.ANDROIDQB.SUBTITLE
E:1711 / J:2252  GUI.MAGAZINE.ALLSPORTS.ANDROIDQB.ARTICLE1
E:1712 / J:2253  GUI.MAGAZINE.ALLSPORTS.ANDROIDQB.ARTICLE2
E:1713 / J:2256  GUI.MAGAZINE.ALLSPORTS.ANDROIDMLB.TITLE
E:1714 / J:2257  GUI.MAGAZINE.ALLSPORTS.ANDROIDMLB.SUBTITLE
E:1715 / J:2258  GUI.MAGAZINE.ALLSPORTS.ANDROIDMLB.ARTICLE1
E:1716 / J:2259  GUI.MAGAZINE.ALLSPORTS.ANDROIDMLB.ARTICLE2
E:4045 / J:5702  THOUGHTS.0401K.CROSS2
  J:5702  "CROSS2": "CROSS THE HIGHWAY",
E:9115 / J:15017  MENU.FLOWCHART.07K.START
  J:15017  "START": "HIGHWAY TO HELP",
E:9199 / J:15109  MENU.FLOWCHART.05M.DEADANDROID01
  J:15109  "DEADANDROID01": "SEE ANDROID BODY",
E:9203 / J:15113  MENU.FLOWCHART.05M.DEADANDROID02
  J:15113  "DEADANDROID02": "SEE ANDROID BODY",
E:9206 / J:15116  MENU.FLOWCHART.05M.DEADANDROID03
  J:15116  "DEADANDROID03": "SEE ANDROID BODY",
E:9217 / J:15127  MENU.FLOWCHART.05M.MAGAZINE1ST
  J:15127  "MAGAZINE1ST": "READ \"ON THE RUN\"",
E:9218 / J:15128  MENU.FLOWCHART.05M.MAGAZINE2ND
  J:15128  "MAGAZINE2ND": "READ \"FORTUNE TELLER\"",
E:9219 / J:15129  MENU.FLOWCHART.05M.MAGAZINE3RD
  J:15129  "MAGAZINE3RD": "READ \"ANDROID ASTRONAUTS\""
E:10119 / J:16134  MENU.FLOWCHART.04K.HIGHWAY.10
  J:16134  "10": "KARA & ALICE CROSS LAST SECTION",
E:10120 / J:16135  MENU.FLOWCHART.04K.HIGHWAY.11
  J:16135  "11": "KARA & ALICE CROSS FIRST SECTION OF HIGHWAY",
E:10121 / J:16136  MENU.FLOWCHART.04K.HIGHWAY.12
  J:16136  "12": "KARA & ALICE GET TO THE OTHER SIDE",
E:10122 / J:16137  MENU.FLOWCHART.04K.HIGHWAY.13
  J:16137  "13": "CAR HITS KARA & ALICE",
E:10123 / J:16138  MENU.FLOWCHART.04K.HIGHWAY.14
  J:16138  "14": "CONNOR REACHES MIDDLE SECTION",
E:10124 / J:16139  MENU.FLOWCHART.04K.HIGHWAY.15
  J:16139  "15": "CAR HITS CONNOR",
E:10125 / J:16140  MENU.FLOWCHART.04K.HIGHWAY.16
  J:16140  "16": "KARA & ALICE CROSS LAST SECTION",
E:10126 / J:16141  MENU.FLOWCHART.04K.HIGHWAY.17
  J:16141  "17": "KARA & ALICE CROSS LAST SECTION",
E:10127 / J:16142  MENU.FLOWCHART.04K.HIGHWAY.18
  J:16142  "18": "CONNOR CATCHES KARA",
E:10128 / J:16143  MENU.FLOWCHART.04K.HIGHWAY.19
  J:16143  "19": "KARA & ALICE GET TO THE OTHER SIDE",
E:10129 / J:16144  MENU.FLOWCHART.04K.HIGHWAY.20
  J:16144  "20": "CAR HITS KARA & ALICE",
E:10130 / J:16145  MENU.FLOWCHART.04K.HIGHWAY.21
  J:16145  "21": "KARA LOSES CONNOR",
E:10131 / J:16146  MENU.FLOWCHART.04K.HIGHWAY.22
  J:16146  "22": "CAR HITS KARA",
E:10132 / J:16147  MENU.FLOWCHART.04K.HIGHWAY.23
  J:16147  "23": "CAR APPROACHES CONNOR",
E:10133 / J:16148  MENU.FLOWCHART.04K.HIGHWAY.24
  J:16148  "24": "CONNOR AVOIDS COLLISION",
E:10134 / J:16149  MENU.FLOWCHART.04K.HIGHWAY.25
  J:16149  "25": "CONNOR HIT BY CAR",
E:10135 / J:16150  MENU.FLOWCHART.04K.HIGHWAY.01
  J:16150  "01": "KARA & ALICE CROSSED THE HIGHWAY",
E:10136 / J:16151  MENU.FLOWCHART.04K.HIGHWAY.02
  J:16151  "02": "KARA & ALICE ARE AT THE HIGHWAY",
E:10137 / J:16152  MENU.FLOWCHART.04K.HIGHWAY.03
  J:16152  "03": "KARA & ALICE CROSS FIRST SECTION OF HIGHWAY",
E:10138 / J:16153  MENU.FLOWCHART.04K.HIGHWAY.04
  J:16153  "04": "KARA & ALICE REACH MIDDLE SECTION",
E:10139 / J:16154  MENU.FLOWCHART.04K.HIGHWAY.05
  J:16154  "05": "CAR HITS KARA & ALICE",
E:10140 / J:16155  MENU.FLOWCHART.04K.HIGHWAY.06
  J:16155  "06": "CONNOR STARTS TO CLIMB THE FENCE",
E:10141 / J:16156  MENU.FLOWCHART.04K.HIGHWAY.07
  J:16156  "07": "HANK ORDERS CONNOR NOT TO GO",
E:10142 / J:16157  MENU.FLOWCHART.04K.HIGHWAY.08
  J:16157  "08": "CONNOR OBEYS HANK’S ORDER",
E:10143 / J:16158  MENU.FLOWCHART.04K.HIGHWAY.09
  J:16158  "09": "CONNOR PURSUES AX400",
E:10144 / J:16159  MENU.FLOWCHART.04K.HIGHWAY.ENDING01
  J:16159  "ENDING01": "KARA & ALICE REACHED THE OTHER SIDE",
E:10145 / J:16160  MENU.FLOWCHART.04K.HIGHWAY.ENDING02
  J:16160  "ENDING02": "KARA & ALICE REACHED THE OTHER SIDE",
E:10146 / J:16161  MENU.FLOWCHART.04K.HIGHWAY.ENDING03
  J:16161  "ENDING03": "KARA & ALICE DIED ON THE HIGHWAY",
E:10147 / J:16162  MENU.FLOWCHART.04K.HIGHWAY.CONNORDEAD
  J:16162  "CONNORDEAD": "CONNOR IS DEAD",
E:10148 / J:16163  MENU.FLOWCHART.04K.HIGHWAY.KARADEAD
  J:16163  "KARADEAD": "KARA IS DEAD"
E:15039 / J:25964  X0904M.CHURCH.KARACONNOR.PC.X09MCONNOR.SORRY.1
E:15499 / J:27021  X0405K.CHASEV2.NOTICED.PC.X04KCOP01.DEADENDCOP
E:15501 / J:27038  X0405K.HIGHWAY.SUCCESS.PC.X04KKARA.OKAY.1
E:15502 / J:27039  X0405K.HIGHWAY.SUCCESS.PC.X04KKARA.OKAY.2
E:15503 / J:27045  X0405K.HIGHWAY.SUCCESS.VO.X04KCONNOR.NOTCROSS
E:15504 / J:27048  X0405K.HIGHWAY.SUCCESS.VO.X04KHANK.NOTCROSS
E:15505 / J:27055  X0405K.HIGHWAY.START.PC.X04KKARA.START
E:15506 / J:27056  X0405K.HIGHWAY.START.PC.X04KKARA.GOACROSS
E:15507 / J:27057  X0405K.HIGHWAY.START.PC.X04KKARA.SURRENDER
E:15508 / J:27060  X0405K.HIGHWAY.START.PC.X04KALICE.START
E:15509 / J:27061  X0405K.HIGHWAY.START.PC.X04KALICE.GOACROSS
E:15510 / J:27062  X0405K.HIGHWAY.START.PC.X04KALICE.SURRENDER
E:15511 / J:27065  X0405K.HIGHWAY.START.PC.CHOUCEGROUP01.GOACROSS
E:15512 / J:27066  X0405K.HIGHWAY.START.PC.CHOUCEGROUP01.SURRENDER
E:15513 / J:27074  X0405K.HIGHWAY.GAMEOVER.PC.X04CHANK.HANK.1
E:15514 / J:27075  X0405K.HIGHWAY.GAMEOVER.PC.X04CHANK.HANK.2
E:15515 / J:27084  X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.1
E:15516 / J:27085  X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.2
E:15517 / J:27086  X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.3
E:15518 / J:27087  X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.4
E:15519 / J:27088  X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.5
E:15520 / J:27093  X0405K.HIGHWAY.CONNOR.PC.X04KCONNOR.GETIN.1
E:15521 / J:27094  X0405K.HIGHWAY.CONNOR.PC.X04KCONNOR.GETIN.2
E:15522 / J:27098  X0405K.HIGHWAY.CONNOR.PC.CHOICEGROUP.GIVEUP
E:15523 / J:27099  X0405K.HIGHWAY.CONNOR.PC.CHOICEGROUP.GO
E:15524 / J:27104  X0405K.HIGHWAY.CONNOR.FA.X04KCONNOR.GIVEUP
E:15525 / J:27105  X0405K.HIGHWAY.CONNOR.FA.X04KCONNOR.GO
E:15526 / J:27108  X0405K.HIGHWAY.CONNOR.FA.X04KHANK.GIVEUP
E:15527 / J:27109  X0405K.HIGHWAY.CONNOR.FA.X04KHANK.GO
E:18160 / J:32399  X0303C.LUNCH.TALKV2.PC.X03CCONNOR.02HIGHWAY.2
E:18247 / J:32533  X0303C.LUNCH.TALKV2.PC.02ANDROIDSCHOICE.HIGHWAY
E:20139 / J:36665  X0601C.AMANDA.INTRO.PC.X06CAMANDA.NOCHASE
E:20140 / J:36666  X0601C.AMANDA.INTRO.PC.X06CAMANDA.06RATIONAL
E:20155 / J:36692  X0601C.AMANDA.INTRO.PC.X06CCONNOR.CONNORALIVE.1
E:20164 / J:36705  X0601C.AMANDA.INTRO.PC.X06CCONNOR.CONNORDIED.1
T05:1710  {{ t("X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.1") }}
T05:1715  {{ t("X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.2") }}
T05:1718  {{ t("X0405K.HIGHWAY.CONNOR.PC.X04KCONNOR.GETIN.1") }}
T05:1721  {{ t("X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN.3") }}
T05:1724  {{ t("X0405K.HIGHWAY.CONNOR.PC.X04KCONNOR.GETIN.2") }}
T05:1729  "X0405K.HIGHWAY.CONNOR.PC.X04CHANK.GETIN",
T05:1737  [choiceLabel]="t('X0405K.HIGHWAY.CONNOR.PC.CHOICEGROUP.GO')"
T05:1741  {{ t("X0405K.HIGHWAY.CONNOR.FA.X04KHANK.GO") }}
T05:1748  <p>Connor dies on the highway</p>
T05:1755  "X0405K.HIGHWAY.GAMEOVER.PC.X04CHANK.HANK"
T05:1783  "X0405K.HIGHWAY.GAMEOVER.PC.X04CHANK.HANK.1"
T05:1811  t('X0405K.HIGHWAY.CONNOR.PC.CHOICEGROUP.GIVEUP')
T05:1819  {{ t("X0405K.HIGHWAY.SUCCESS.PC.X04KKARA.OKAY.1") }}
T06:511  'X0303C.LUNCH.TALKV2.PC.02ANDROIDSCHOICE.HIGHWAY'
T06:520  Didn't pursue Kara on the highway in
T06:1726  "X0405K.HIGHWAY.GAMEOVER.PC.X04CHANK.HANK.1"
T26:297  Connor went after Kara and Alice on the highway in
T43:117  'FORTUNETELLER',
T43:236  'ONTHERUN',
T43:299  'HIGHWAY',
```

### ch15-12

**Observation to settle:** [which ending] At the ledge, if you pressed neither SAVE HANK nor CHASE DEVIANT, which ending did you get: RUPERT COMMITTED SUICIDE or RUPERT GOT AWAY?

**Condition needed:** ledgeNoInput transition sets Rupert dead versus escaped.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The two endings and displayed Hank survival probability exist, but no no-input edge selects one. Later corpse/diary strings cannot reconstruct that missing transition. No change to timeout ending or its calibrated deltas.

**Cross-check:** FC15; PP15-1. Finding, chase, escape and suicide are separate nodes; the missing conditions concern edges and minimal prerequisites. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0501C\.[A-Z0-9.]*?(?:RISKHANK|SAVEHANK|CHASERUPERT|DILEMMA)|MENU\.FLOWCHART\.05C\.(?:GOTAWAY|SUICIDE|FOLLOWRUPERT)|THOUGHTS\.0501C\.RISKHANK)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
chase end|Rupert committed suicide|Rupert got away
```

**All search hits (5 source locations):**

```text
E:4126 / J:5789  THOUGHTS.0501C.RISKHANK
  J:5789  "RISKHANK": "CHANCE OF SURVIVAL: 89%",
E:9246 / J:15158  MENU.FLOWCHART.05C.FOLLOWRUPERT
  J:15158  "FOLLOWRUPERT": "FOLLOW RUPERT",
E:9247 / J:15159  MENU.FLOWCHART.05C.GOTAWAY
  J:15159  "GOTAWAY": "RUPERT GOT AWAY",
E:9248 / J:15160  MENU.FLOWCHART.05C.SUICIDE
  J:15160  "SUICIDE": "RUPERT COMMITTED SUICIDE",
T06:1517  <h2 id="chase-end">Chase end</h2>
```

### ch15-14

**Observation to settle:** [what unlocks] Could you look up from the chair and find Rupert after reconstructing only the bird cage, without having done the stool reconstruction or examined the LED in the sink? (yes/no)

**Condition needed:** findRupert requires cage reconstruction alone or stool plus LED.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Cage reconstruction and finding the deviant are distinct chart events; the stool branch hangs from the rA9 discovery. That does not supply a conjunctive ceiling-trigger expression or validate cage-only access. No change to cage-only gate.

**Cross-check:** FC15; PP15-1. Finding, chase, escape and suicide are separate nodes; the missing conditions concern edges and minimal prerequisites. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.05C\.[A-Z0-9.]*?(?:CAGE|STOOL|LED|FOUND)|THOUGHTS\.0501C\.[A-Z0-9.]*?(?:CEILING|SUSPECT|DEVIANT|STOOL|CAGE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
inspect the stool|inspect the bird cage|LED on the sink
```

**All search hits (19 source locations):**

```text
E:4115 / J:5778  THOUGHTS.0501C.LASTSUSPECT
  J:5778  "LASTSUSPECT": "QUESTION THE SUSPECT",
E:4119 / J:5782  THOUGHTS.0501C.CONFIRMDEVIANT
  J:5782  "CONFIRMDEVIANT": "CONFIRM SUSPECT IS DEVIANT",
E:4127 / J:5790  THOUGHTS.0501C.SUSPECTTHEREVALIDATED
  J:5790  "SUSPECTTHEREVALIDATED": "SUSPECT IS STILL HERE",
E:4137 / J:5800  THOUGHTS.0501C.CONFIRMDEVIANTVALIDATED
  J:5800  "CONFIRMDEVIANTVALIDATED": "SUSPECT IS A DEVIANT",
E:4138 / J:5801  THOUGHTS.0501C.SUSPECTTHERE
  J:5801  "SUSPECTTHERE": "FIND CAUSE OF LOUD NOISE",
E:4139 / J:5802  THOUGHTS.0501C.FINDDEVIANT
  J:5802  "FINDDEVIANT": "EXPOSE SUSPECT",
E:4140 / J:5803  THOUGHTS.0501C.FINDDEVIANTVALIDATED
  J:5803  "FINDDEVIANTVALIDATED": "DEVIANT FOUND",
E:4145 / J:5808  THOUGHTS.0501C.NOFOODDEVIANT
  J:5808  "NOFOODDEVIANT": "DEVIANT DOESN'T EAT",
E:4158 / J:5821  THOUGHTS.0501C.SEEDSCHECKDEVIANT
  J:5821  "SEEDSCHECKDEVIANT": "DEVIANT CARES FOR WILD ANIMALS",
E:4159 / J:5822  THOUGHTS.0501C.FAKEIDDEVIANT
  J:5822  "FAKEIDDEVIANT": "DEVIANT USED FORGED ID"
E:9232 / J:15144  MENU.FLOWCHART.05C.STOOL
  J:15144  "STOOL": "INVESTIGATE STOOL",
E:9233 / J:15145  MENU.FLOWCHART.05C.CAGE
  J:15145  "CAGE": "INVESTIGATE CAGE",
E:9234 / J:15146  MENU.FLOWCHART.05C.LED
  J:15146  "LED": "FIND LED",
E:9239 / J:15151  MENU.FLOWCHART.05C.NOTFOUND
  J:15151  "NOTFOUND": "RUPERT NOT FOUND",
E:9243 / J:15155  MENU.FLOWCHART.05C.KILLED
  J:15155  "KILLED": "CONNOR DIED",
E:9251 / J:15163  MENU.FLOWCHART.05C.FOUND
  J:15163  "FOUND": "FIND RUPERT",
T06:1177  <h2 id="led">Looking at LED on the sink</h2>
T06:1221  <h2 id="stool">Inspect the stool</h2>
T06:1237  <h2 id="cage">Inspect the bird cage</h2>
```

### ch15-18

**Observation to settle:** [which buttons the model is offered] If The Nest ended RUPERT NOT FOUND (Hank and Connor left the apartment), could Connor spot Rupert in Jericho in Crossroads? (yes/no)

**Condition needed:** RupertInJericho if escaped explicitly or merely not found.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** NOTFOUND and GOTAWAY have separate keys; downstream spotting text does not collapse these outcomes. No change to nestRupert not-found exclusion.

**Cross-check:** FC15; PP15-1. Finding, chase, escape and suicide are separate nodes; the missing conditions concern edges and minimal prerequisites. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.02A\.C\.SPOTRUPERT|X0201A\.[A-Z0-9.]*?RUPERT|MENU\.FLOWCHART\.05C\.(?:NOTFOUND|GOTAWAY))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
spot Rupert|Rupert escaped|Rupert.*not found
```

**All search hits (3 source locations):**

```text
E:9239 / J:15151  MENU.FLOWCHART.05C.NOTFOUND
  J:15151  "NOTFOUND": "RUPERT NOT FOUND",
E:9247 / J:15159  MENU.FLOWCHART.05C.GOTAWAY
  J:15159  "GOTAWAY": "RUPERT GOT AWAY",
E:10158 / J:16177  MENU.FLOWCHART.02A.C.SPOTRUPERT
  J:16177  "SPOTRUPERT": "SPOT RUPERT",
```

### ch17-01

**Observation to settle:** [a stat arrow] On a run where Kara robbed the store in her uniform (Fugitives) AND was chased by Connor (On the Run), did Zlatko's TV show both news reports (two public-opinion down arrows) or only one?

**Condition needed:** TV report list appends chase and robbery independently versus selects priority.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Chase occupies a separate condition group from mutually exclusive clothing variants, so a literal reading allows both report groups. Independent markup is not the game's TV scheduling or public-opinion event logic. No change to report priority or arrow count.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0502K\.[A-Z0-9.]*?(?:NEWS|REPORT)|X0502K\.[A-Z0-9.]*?TV)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
robbed the supermarket|Connor ran after Kara
```

**All search hits (63 source locations):**

```text
E:18523 / J:33306  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.1
E:18524 / J:33307  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.2
E:18525 / J:33308  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.3
E:18526 / J:33309  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.4
E:18527 / J:33310  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.5
E:18528 / J:33313  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.1
E:18529 / J:33314  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.2
E:18530 / J:33315  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.3
E:18531 / J:33316  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.4
E:18532 / J:33317  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.5
E:18533 / J:33320  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.1
E:18534 / J:33321  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.2
E:18535 / J:33322  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.3
E:18536 / J:33323  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.4
E:18537 / J:33324  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.5
E:18538 / J:33325  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.6
T08:754  <app-condition-group>
T08:755  <app-conditioned-content>
T08:756  <div class="condition">
T08:757  <p>
T08:758  Connor ran after Kara in
T08:759  <a [routerLink]="['/chapters', 13]"
T08:760  >On The Run</a
T08:761  >
T08:762  </p>
T08:763  </div>
T08:764  <div class="content">
T08:765  <p>
T08:766  <app-relation
T08:767  [name]="RelationName.PublicOpinion"
T08:768  [type]="RelationType.SmallDown"
T08:775  "X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS"
T08:784  <app-condition-group>
T08:785  <app-conditioned-content>
T08:786  <div class="condition">
T08:787  <p>
T08:788  Kara robbed the supermarket in
T08:789  <a [routerLink]="['/chapters', 13]"
T08:790  >On The Run</a
T08:791  >, in her android uniform
T08:792  </p>
T08:793  </div>
T08:794  <div class="content">
T08:795  <p>
T08:796  <app-relation
T08:797  [name]="RelationName.PublicOpinion"
T08:805  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01"
T08:811  </app-conditioned-content>
T08:812  <app-conditioned-content>
T08:813  <div class="condition">
T08:814  <p>
T08:815  Kara robbed the supermarket in
T08:816  <a [routerLink]="['/chapters', 13]"
T08:817  >On The Run</a
T08:818  >, in stolen clothes
T08:819  </p>
T08:820  </div>
T08:821  <div class="content">
T08:822  <p>
T08:823  <app-dialogue-line
T08:824  name="Channel 16 - Michael Webb"
T08:825  >
T08:828  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02"
```

### ch17-02

**Observation to settle:** [which ending] After SET FIRE in the main room, could Kara still get spotted/chased (or killed), or did the game always cut straight to the stairs and the yard?

**Condition needed:** houseFire flag suppresses chase/death versus changes pursuit dialogue.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** FIRE under GAMEOVER identifies fire-related pursuit dialogue, not a callable death condition. Existing filmed pursuit refutes guaranteed immediate outdoor escape; neither namespace nor dialogue proves a reachable post-fire death or its probability. No new death/risk branch from text alone.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
X0502K\.BIGROOM\.GAMEOVER\.[A-Z0-9.]*?FIRE
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
set fire to the house|set fire to house|get spotted
```

**All search hits (6 source locations):**

```text
E:18375 / J:32878  X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.1
E:18376 / J:32879  X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.2
E:18377 / J:32880  X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.3
E:18378 / J:32881  X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.4
T08:955  <div class="condition"><p>Set fire to the house</p></div>
T08:1110  <h3 id="spotted">Get spotted</h3>
```

### ch17-03

**Observation to settle:** [which buttons the model is offered] From the upstairs corridor (after the bedroom), can Kara skip the bathroom and run straight down the stairs, and if so, was there a separate prompt or did it just happen by walking past the bathroom door?

**Condition needed:** corridorToStairs movement exit versus named interaction, detection timing.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The chart-backed corridor bypass exists, but localization of a node does not mean a discrete button. No trigger volume or detection timer is available. No change to labelled action or 0.3 risk calibration.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.05K\.[A-Z0-9.]*?(?:CORRIDOR|STAIR|BATHROOM)|GUI\.ACTION\.05K\.[A-Z0-9.]*?(?:STAIR|CORRIDOR))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
go in the bathroom|go through corridor|reaches the stairs
```

**All search hits (11 source locations):**

```text
E:9767 / J:15753  MENU.FLOWCHART.05K.ENTERBATHROOM
  J:15753  "ENTERBATHROOM": "ENTER BATHROOM",
E:9768 / J:15754  MENU.FLOWCHART.05K.ANDROIDBATHROOMLOUD
  J:15754  "ANDROIDBATHROOMLOUD": "BATHROOM ANDROID IS LOUD",
E:9769 / J:15755  MENU.FLOWCHART.05K.KILLBATHROOMANDROID
  J:15755  "KILLBATHROOMANDROID": "KILL",
E:9770 / J:15756  MENU.FLOWCHART.05K.SPAREBATHROOMANDROID
  J:15756  "SPAREBATHROOMANDROID": "SPARE",
E:9789 / J:15775  MENU.FLOWCHART.05K.GOTHROUGHCORRIDOR
  J:15775  "GOTHROUGHCORRIDOR": "GO THROUGH CORRIDOR",
E:9791 / J:15777  MENU.FLOWCHART.05K.GETSPOTTEDINCORRIDOR
  J:15777  "GETSPOTTEDINCORRIDOR": "GET SPOTTED IN THE CORRIDOR",
E:9792 / J:15778  MENU.FLOWCHART.05K.GOTHROUGHBATHROOM
  J:15778  "GOTHROUGHBATHROOM": "GO THROUGH BATHROOM",
E:9793 / J:15779  MENU.FLOWCHART.05K.GETSPOTTEDINBATHROOM
  J:15779  "GETSPOTTEDINBATHROOM": "GET SPOTTED IN THE BATHROOM",
E:9800 / J:15786  MENU.FLOWCHART.05K.KARAREACHESTHESTAIRS
  J:15786  "KARAREACHESTHESTAIRS": "KARA REACHES THE STAIRS",
E:9804 / J:15790  MENU.FLOWCHART.05K.KARAKILLEDINBATHROOM
  J:15790  "KARAKILLEDINBATHROOM": "ZLATKO KILLED KARA IN THE BATHROOM",
T08:1026  <h3 id="hide-bathroom">Go in the bathroom</h3>
```

### ch17-04

**Observation to settle:** [what unlocks] On a reset run where Kara robbed the store but was never chased by Connor, did switching on the big-room TV count as a memory (SEE NEWS FLASH OF ESCAPE)?

**Condition needed:** TVMemoryEligible needs robberyNews or freewayEscape.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** News and memory-recovery nodes coexist, but the transcript does not attach a boolean formula to the TV memory increment. PowerPyx restricts this memory to freeway escape. No change to inputs.report-based memory eligibility.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.05K\.[A-Z0-9.]*?(?:NEWS|MEMOR)|X0502K\.[A-Z0-9.]*?(?:NEWS|TV)))|(?:MENU\.FLOWCHART\.05K\.(?:TV|SAWENOUGHMEMORIES|MEMORYRECOVERED)|THOUGHTS\.0501K\.(?:MYNAMEISKARA|TIMER|CORRUPTION)|X0502K\.TV\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
recollect enough memories|Kara was reset|Connor ran after Kara|robbed the supermarket
```

**All search hits (68 source locations):**

```text
E:3841 / J:5486  THOUGHTS.0501K.MYNAMEISKARA01
  J:5486  "MYNAMEISKARA01": "## ####*# ##.#+",
E:3842 / J:5487  THOUGHTS.0501K.MYNAMEISKARA02
  J:5487  "MYNAMEISKARA02": "## ###3*# ##.r+",
E:3843 / J:5488  THOUGHTS.0501K.MYNAMEISKARA03
  J:5488  "MYNAMEISKARA03": "M# ###3*# #@.r+",
E:3893 / J:5538  THOUGHTS.0501K.MYNAMEISKARA04
  J:5538  "MYNAMEISKARA04": "M# #@#3*5 #@.r+",
E:3894 / J:5539  THOUGHTS.0501K.MYNAMEISKARA05
  J:5539  "MYNAMEISKARA05": "M# #@m3*5 &a@.r+",
E:3895 / J:5540  THOUGHTS.0501K.MYNAMEISKARA06
  J:5540  "MYNAMEISKARA06": "M# n@m3*5 &a.r+",
E:3896 / J:5541  THOUGHTS.0501K.MYNAMEISKARA07
  J:5541  "MYNAMEISKARA07": "M# na@m3*s &a.r+",
E:3897 / J:5542  THOUGHTS.0501K.MYNAMEISKARA08
  J:5542  "MYNAMEISKARA08": "M# na@me*s Kar+",
E:3898 / J:5543  THOUGHTS.0501K.MYNAMEISKARA09
  J:5543  "MYNAMEISKARA09": "My name*s Kar+",
E:3899 / J:5544  THOUGHTS.0501K.MYNAMEISKARA10
  J:5544  "MYNAMEISKARA10": "MY NAME IS KARA",
E:3901 / J:5546  THOUGHTS.0501K.TIMERALICE
  J:5546  "TIMERALICE": "BEFORE 'LITTLE ONE' IS BROUGHT TO ZLATKO",
E:3902 / J:5547  THOUGHTS.0501K.TIMERALICENORESET
  J:5547  "TIMERALICENORESET": "BEFORE ALICE IS BROUGHT TO ZLATKO",
E:3907 / J:5552  THOUGHTS.0501K.TIMERPROGRESSRESET
  J:5552  "TIMERPROGRESSRESET": "PROGRESS",
E:3911 / J:5556  THOUGHTS.0501K.CORRUPTIONDETECTED
  J:5556  "CORRUPTIONDETECTED": "MEMORY CORRUPTION DETECTED",
E:3912 / J:5557  THOUGHTS.0501K.CORRUPTIONREPAIRED
  J:5557  "CORRUPTIONREPAIRED": "MEMORY CORRUPTION REPAIRED",
E:9755 / J:15741  MENU.FLOWCHART.05K.SANDBOXEXPLOREHOUSEFORMEMORY
  J:15741  "SANDBOXEXPLOREHOUSEFORMEMORY": "EXPLORE THE HOUSE TO RECOVER MEMORY",
E:9766 / J:15752  MENU.FLOWCHART.05K.TV
  J:15752  "TV": "SEE NEWS FLASH OF ESCAPE",
E:9774 / J:15760  MENU.FLOWCHART.05K.SAWENOUGHMEMORIES
  J:15760  "SAWENOUGHMEMORIES": "RECOLLECT ENOUGH MEMORIES",
E:9776 / J:15762  MENU.FLOWCHART.05K.MEMORYRECOVERED
  J:15762  "MEMORYRECOVERED": "MEMORY RECOVERED",
E:9814 / J:15800  MENU.FLOWCHART.05K.TVNORESET
  J:15800  "TVNORESET": "CHECK TV",
E:18523 / J:33306  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.1
E:18524 / J:33307  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.2
E:18525 / J:33308  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.3
E:18526 / J:33309  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.4
E:18527 / J:33310  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.5
E:18528 / J:33313  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.1
E:18529 / J:33314  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.2
E:18530 / J:33315  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.3
E:18531 / J:33316  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.4
E:18532 / J:33317  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.5
E:18533 / J:33320  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.1
E:18534 / J:33321  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.2
E:18535 / J:33322  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.3
E:18536 / J:33323  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.4
E:18537 / J:33324  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.5
E:18538 / J:33325  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.6
T08:356  <div class="condition"><p>Kara was reset</p></div>
T08:430  <div class="condition">
T08:431  <p>Kara was reset</p>
T08:432  </div>
T08:512  <h2 id="recollect">Recollect enough memories</h2>
T08:756  <div class="condition">
T08:757  <p>
T08:758  Connor ran after Kara in
T08:759  <a [routerLink]="['/chapters', 13]"
T08:760  >On The Run</a
T08:761  >
T08:762  </p>
T08:763  </div>
T08:775  "X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS"
T08:786  <div class="condition">
T08:787  <p>
T08:788  Kara robbed the supermarket in
T08:789  <a [routerLink]="['/chapters', 13]"
T08:790  >On The Run</a
T08:791  >, in her android uniform
T08:792  </p>
T08:793  </div>
T08:805  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01"
T08:813  <div class="condition">
T08:814  <p>
T08:815  Kara robbed the supermarket in
T08:816  <a [routerLink]="['/chapters', 13]"
T08:817  >On The Run</a
T08:818  >, in stolen clothes
T08:819  </p>
T08:820  </div>
T08:828  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02"
```

### ch17-05

**Observation to settle:** [a stat arrow] If Kara got the money by USE ALICE AS A DIVERSION > STEAL DISCREETLY (no gun), did Zlatko's TV still show a supermarket-robbery report?

**Condition needed:** discreetTheft sets TV news and memory flags.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** No downstream key names discreet theft as a report condition, and generic robbery wording cannot resolve which successful theft routes set that fact. No change. Duplicate producer with ch10-18; keep the memory consumer separately documented.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0502K\.[A-Z0-9.]*?(?:NEWS|ROBBERY)|MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:DIVERSION|STEALMONEY))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
robbed the supermarket|diversion|discreet
```

**All search hits (39 source locations):**

```text
E:9709 / J:15690  MENU.FLOWCHART.03K.SHOP.ALICEDIVERSION
  J:15690  "ALICEDIVERSION": "USE ALICE AS A DIVERSION",
E:18523 / J:33306  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.1
E:18524 / J:33307  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.2
E:18525 / J:33308  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.3
E:18526 / J:33309  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.4
E:18527 / J:33310  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01.5
E:18528 / J:33313  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.1
E:18529 / J:33314  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.2
E:18530 / J:33315  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.3
E:18531 / J:33316  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.4
E:18532 / J:33317  X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02.5
E:18533 / J:33320  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.1
E:18534 / J:33321  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.2
E:18535 / J:33322  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.3
E:18536 / J:33323  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.4
E:18537 / J:33324  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.5
E:18538 / J:33325  X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS.6
T02:824  <div class="condition">
T02:825  <p>Use Alice as a diversion</p>
T02:826  </div>
T08:775  "X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS"
T08:786  <div class="condition">
T08:787  <p>
T08:788  Kara robbed the supermarket in
T08:789  <a [routerLink]="['/chapters', 13]"
T08:790  >On The Run</a
T08:791  >, in her android uniform
T08:792  </p>
T08:793  </div>
T08:805  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER01"
T08:813  <div class="condition">
T08:814  <p>
T08:815  Kara robbed the supermarket in
T08:816  <a [routerLink]="['/chapters', 13]"
T08:817  >On The Run</a
T08:818  >, in stolen clothes
T08:819  </p>
T08:820  </div>
T08:828  "X0502K.TV.NEWS.PC.X05KWEBB.SUPERMARKETROBBER02"
```

### ch17-06

**Observation to settle:** [what unlocks] On a reset run where Kara stayed in the squat but never asked Ralph about the symbols he was carving, did the storage-room corner still give the rA9 memory?

**Condition needed:** rA9MemoryEligible requires squat stay versus explicitly witnessing carving.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** A memory-node key names rA9 but has no serialized prerequisite referencing the earlier conversation/carving flag. PowerPyx's squat-only condition remains broader than the benchmark's. No change to ch10RalphCarving gate.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.05K\.[A-Z0-9.]*?(?:RA9|RALPH)|MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:RA9|CARV)|X0502K\.[A-Z0-9.]*?(?:RA9|RALPH)))|(?:MENU\.FLOWCHART\.05K\.RA9|MENU\.FLOWCHART\.03K\.[A-Z0-9.]*?(?:RA9|SYMBOL)|X030[15]K\.[A-Z0-9.]*?(?:CARV|RA9))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
rA9|Ralph.*carv
```

**All search hits (33 source locations):**

```text
E:9765 / J:15751  MENU.FLOWCHART.05K.RA9
  J:15751  "RA9": "RECALL RA9 SYMBOLS",
E:9816 / J:15802  MENU.FLOWCHART.05K.RA9NORESET
  J:15802  "RA9NORESET": "RA9",
E:16526 / J:29209  X0305K.SQUAT.RA9.PC.X03KKARA.RA9.1
E:16527 / J:29210  X0305K.SQUAT.RA9.PC.X03KKARA.RA9.2
E:16528 / J:29211  X0305K.SQUAT.RA9.PC.X03KKARA.RA9.3
E:16529 / J:29212  X0305K.SQUAT.RA9.PC.X03KKARA.RA9.4
E:16530 / J:29217  X0305K.SQUAT.RA9.PC.X03KRALPH.RA9.1
E:16531 / J:29218  X0305K.SQUAT.RA9.PC.X03KRALPH.RA9.2
E:16532 / J:29219  X0305K.SQUAT.RA9.PC.X03KRALPH.RA9.3
T02:1910  "X0305K.SQUAT.RA9.PC.X03KKARA.RA9",
T02:1917  {{ t("X0305K.SQUAT.RA9.PC.X03KRALPH.RA9.1") }}
T02:1922  "X0305K.SQUAT.RA9.PC.X03KKARA.RA9",
T02:1930  "X0305K.SQUAT.RA9.PC.X03KRALPH.RA9",
T06:1201  <h2 id="ra9">Looking at rA9 writings in the bathroom</h2>
T12:1001  <app-unlock-condition [unlockType]="UnlockType.Lock">
T12:1002  Looked at rA9 writing on the wall
T12:1003  </app-unlock-condition>
T12:1023  <app-unlock-condition [unlockType]="UnlockType.Lock">
T12:1024  Asked about [ rA9 ]
T12:1025  </app-unlock-condition>
T13:218  <app-unlock-condition [unlockType]="UnlockType.Lock">
T13:219  Looked at rA9 clues in previous chapters
T13:220  </app-unlock-condition>
T20:183  <div class="condition">
T20:184  <p>Asked Kamski about rA9</p>
T20:185  </div>
T38:1038  <app-unlock-condition [unlockType]="UnlockType.Lock">
T38:1039  Looked at the rA9 writings in
T38:1040  <a [routerLink]="['/chapters', 6]">Partners</a>
T38:1041  </app-unlock-condition>
T38:1067  <app-unlock-condition [unlockType]="UnlockType.Lock">
T38:1068  Asked about rA9
T38:1069  </app-unlock-condition>
```

### ch17-07

**Observation to settle:** [what unlocks] On a reset run, did the book on the big-room chair (or the pipe in the storage room) give a memory even though Kara never looked at Alice's book (or never re-washed Todd's clothes) in A New Home?

**Condition needed:** bookMemory and pipeMemory require earlier inspection/rewash flags.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Named recollections establish content, not whether their recovery points are unconditional or history-gated. PowerPyx omits an explicit lock for both, which is not proof of no lock. No change to upstairs.book/downstairs.rewash.

**Cross-check:** FC17; PP17-1, PP17-2. Memory items and escape nodes are present; neither a memory-weight function nor a post-fire failure probability is charted. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.05K\.[A-Z0-9.]*?(?:BOOK|PIPE)|X0502K\.[A-Z0-9.]*?(?:BOOK|PIPE)|MENU\.FLOWCHART\.01KB\.[A-Z0-9.]*?(?:BOOK|WASH))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Alice.s Book|red ice pipe|rewash
```

**All search hits (6 source locations):**

```text
E:8774 / J:14650  MENU.FLOWCHART.01KB.WASH
  J:14650  "WASH": "WASH DISHES",
E:8778 / J:14654  MENU.FLOWCHART.01KB.REWASH
  J:14654  "REWASH": "REWASH CLOTHES",
E:8798 / J:14674  MENU.FLOWCHART.01KB.BOOKS
  J:14674  "BOOKS": "TIDY BOOKS",
E:9757 / J:15743  MENU.FLOWCHART.05K.ALICEBOOK
  J:15743  "ALICEBOOK": "RECALL ALICE’S BOOK",
E:9760 / J:15746  MENU.FLOWCHART.05K.CRACKPIPE
  J:15746  "CRACKPIPE": "RECALL TODD’S RED ICE PIPE",
T33:221  <h2 id="red-ice">Rewash clothes - Find Red ice</h2>
```

### ch19-02

**Observation to settle:** [which ending] After the guards raised the alarm in the control room, did the group ever get over the fence without the dogs catching John?

**Condition needed:** alarm, fence route, delay and John rescue determine dog interception.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Alarm, fence and dog outcomes are named, but crossing chart edges do not yield an alarm-implies-dogs boolean. No text-level alternative guarantees a clean John fence escape. No change to M05n branch.

**Cross-check:** FC19; PP19-1. The fence/dog junction remains an edge-reading issue; localized outcome names do not fix crossing connections. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0602M\.[A-Z0-9.]*?(?:DOG|FENCE|ALARM)|MENU\.FLOWCHART\.06MB\.[A-Z0-9.]*?(?:DOG|FENCE|DAMAGE|ALARM))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
detected by the guards|fail to escape|John.*(?:dog|save)
```

**All search hits (40 source locations):**

```text
E:6035 / J:9367  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY01
E:6036 / J:9368  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY03
E:6037 / J:9370  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY02.1
E:6038 / J:9371  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY02.2
E:6039 / J:9374  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY04.1
E:6040 / J:9375  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY04.2
E:6041 / J:9378  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY05.1
E:6042 / J:9379  X0602M.PBY.LINES.FA.X06MDOGGUARD.COPY05.2
E:6276 / J:9904  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.MPARCLIMB
E:6277 / J:9905  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.SAVE
E:6278 / J:9906  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.SUCCESS01N
E:6279 / J:9907  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.FAIL
E:6280 / J:9910  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MSIMON.SUCCESS01S
E:6281 / J:9911  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MSIMON.SUCCESSB
E:6282 / J:9914  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.CHOICEGROUP01.SAVE
E:6283 / J:9915  X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.CHOICEGROUP01.FORSAKE
E:6284 / J:9922  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARKUS.FENCE
E:6285 / J:9925  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MSIMON.FENCE
E:6286 / J:9928  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOSH.FENCE
E:6287 / J:9931  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARLA.FENCE
E:6288 / J:9934  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOHN.FENCE
E:6296 / J:9974  X0602M.EXITNOKEYNOALERT.FOLLOWME.FA.X06MJOHN.FENCE01
E:6297 / J:9977  X0602M.EXITNOKEYNOALERT.FOLLOWME.FA.X06MMARKUS.FENCE02
E:6298 / J:9986  X0602M.EXITNOKEYBUTALERT.GOTTOGO.FA.X06MMARLA.FENCE
E:9094 / J:14994  MENU.FLOWCHART.06MB.ALARM
  J:14994  "ALARM": "TRIGGER ALARM",
E:9106 / J:15006  MENU.FLOWCHART.06MB.DOGS
  J:15006  "DOGS": "SUSTAIN DAMAGE TRYING TO SAVE JOHN",
E:9114 / J:15014  MENU.FLOWCHART.06MB.DOGSMARKUS
  J:15014  "DOGSMARKUS": "SUSTAIN DAMAGE REACHING THE FENCE"
T10:902  "X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARKUS.FENCE"
T10:909  "X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOHN.FENCE"
T10:916  "X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.MPARCLIMB"
T10:926  'X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.CHOICEGROUP01.SAVE'
T10:934  "X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.X06MMARLA.SAVE"
T10:950  'X0602M.EXITGOTKEYBUTALERT.DOGSEATJOHN.FA.CHOICEGROUP01.FORSAKE'
T10:1021  <h2 id="running-away">Was detected by the guards - Running away</h2>
T10:1025  t("X0602M.EXITNOKEYBUTALERT.GOTTOGO.FA.X06MMARLA.FENCE")
T10:1055  <h3 id="running-away-fail">Fail to escape</h3>
T12:1346 [CUT]  <div class="condition">
T12:1347 [CUT]  <p>Fail to escape</p>
T12:1348 [CUT]  </div>
T28:1710  <h1 id="escape-fail">Fail to escape - Reach Recycling Machine</h1>
```

### ch19-03

**Observation to settle:** [which ending] After LEAVE at the truck-key question (no alarm), could Markus still be too slow at the fence and get damaged?

**Condition needed:** fenceTimer active after voluntary LEAVE without alarm.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** The template places the slow/failure fence events under detected-by-guards running away. That is ordering evidence, not proof the shared fence timer is disabled after LEAVE. No change to the explicitly calibrated 0.08 failure chance.

**Cross-check:** FC19; PP19-1. The fence/dog junction remains an edge-reading issue; localized outcome names do not fix crossing connections. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0602M\.[A-Z0-9.]*?(?:FENCE|TIMEOUT)|MENU\.FLOWCHART\.06MB\.[A-Z0-9.]*?(?:FENCE|DAMAGE|LEAVE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
detected by the guards|running away|take too much time
```

**All search hits (169 source locations):**

```text
E:6284 / J:9922  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARKUS.FENCE
E:6285 / J:9925  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MSIMON.FENCE
E:6286 / J:9928  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOSH.FENCE
E:6287 / J:9931  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARLA.FENCE
E:6288 / J:9934  X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOHN.FENCE
E:6296 / J:9974  X0602M.EXITNOKEYNOALERT.FOLLOWME.FA.X06MJOHN.FENCE01
E:6297 / J:9977  X0602M.EXITNOKEYNOALERT.FOLLOWME.FA.X06MMARKUS.FENCE02
E:6298 / J:9986  X0602M.EXITNOKEYBUTALERT.GOTTOGO.FA.X06MMARLA.FENCE
E:9072 / J:14972  MENU.FLOWCHART.06MB.LEAVES
  J:14972  "LEAVES": "HUMAN GUARD LEAVES",
E:9078 / J:14978  MENU.FLOWCHART.06MB.LEAVE
  J:14978  "LEAVE": "LEAVE ANDROIDS",
T01:637  <h2 id="time">
T01:638  <app-unlock-condition [unlockType]="UnlockType.Time">
T01:639  Take too much time
T01:640  </app-unlock-condition>
T01:641  </h2>
T02:147  <h2 id="timeout">
T02:148  <app-unlock-condition [unlockType]="UnlockType.Time">
T02:149  Take too much time
T02:150  </app-unlock-condition>
T02:151  </h2>
T05:1042  <h3 id="squat-timeout">
T05:1043  <app-unlock-condition [unlockType]="UnlockType.Time">
T05:1044  Take too much time
T05:1045  </app-unlock-condition>
T05:1046  </h3>
T05:1688  <h2 id="chase-timeout">
T05:1689  <app-unlock-condition [unlockType]="UnlockType.Time">
T05:1690  Take too much time
T05:1691  </app-unlock-condition>
T05:1692  </h2>
T06:1382  <h2 id="investigation-timeout">
T06:1383  <app-unlock-condition [unlockType]="UnlockType.Time">
T06:1384  Take too much time
T06:1385  </app-unlock-condition>
T06:1386  </h2>
T06:1416  <h3 id="investigation-timeout-again">
T06:1417  Take too much time again
T06:1418  </h3>
T08:524  <h2 id="reset-timeout">
T08:525  <app-unlock-condition
T08:526  [unlockType]="UnlockType.Time"
T08:527  >
T08:528  Take too much time
T08:529  </app-unlock-condition>
T08:530  </h2>
T10:55  <h2 id="timeout">
T10:56  <app-unlock-condition [unlockType]="UnlockType.Time">
T10:57  Take too much time
T10:58  </app-unlock-condition>
T10:59  </h2>
T10:902  "X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MMARKUS.FENCE"
T10:909  "X0602M.EXITGOTKEYBUTALERT.HURRYESCAPE.PC.X06MJOHN.FENCE"
T10:1021  <h2 id="running-away">Was detected by the guards - Running away</h2>
T10:1025  t("X0602M.EXITNOKEYBUTALERT.GOTTOGO.FA.X06MMARLA.FENCE")
T10:1038  <h3 id="running-away-timeout">
T10:1039  <app-unlock-condition [unlockType]="UnlockType.Time">
T10:1040  Take too much time
T10:1041  </app-unlock-condition>
T10:1042  </h3>
T11:672  <h3 id="search-timeout">
T11:673  <app-unlock-condition
T11:674  [unlockType]="UnlockType.Time"
T11:675  [bracketsOnlyAroundIcon]="true"
T11:676  >
T11:677  Take too much time
T11:678  </app-unlock-condition>
T11:679  </h3>
T11:1002  <h3 id="search-connect-timeout">
T11:1003  <app-unlock-condition [unlockType]="UnlockType.Time">
T11:1004  Take too much time
T11:1005  </app-unlock-condition>
T11:1006  </h3>
T11:1085  <h2 id="warehouse-timeout">
T11:1086  <app-unlock-condition
T11:1087  [unlockType]="UnlockType.Time"
T11:1088  [bracketsOnlyAroundIcon]="true"
T11:1089  >
T11:1090  Take too much time
T11:1091  </app-unlock-condition>
T11:1092  </h2>
T12:303  <h2 id="pirate-cove-timeout">
T12:304  <app-unlock-condition [unlockType]="UnlockType.Time">
T12:305  Take too much time
T12:306  </app-unlock-condition>
T12:307  </h2>
T14:771  <div class="condition">
T14:772  <p>
T14:773  <app-unlock-condition
T14:774  [unlockType]="UnlockType.Time"
T14:775  [bracketsOnlyAroundIcon]="true"
T14:776  >
T14:777  <span class="font-bold"
T14:778  >Take too much time drawing the
T14:779  gun</span
T14:780  >
T14:781  </app-unlock-condition>
T14:782  </p>
T14:783  </div>
T17:438  <h2 id="timeout">
T17:439  <app-unlock-condition [unlockType]="UnlockType.Time">
T17:440  Take too much time
T17:441  </app-unlock-condition>
T17:442  </h2>
T17:1553  <h2 id="send-message-timeout">
T17:1554  <app-unlock-condition
T17:1555  [unlockType]="UnlockType.Time"
T17:1556  [bracketsOnlyAroundIcon]="true"
T17:1557  >
T17:1558  Take too much time
T17:1559  </app-unlock-condition>
T17:1560  </h2>
T17:1576  <h3 id="send-message-timeout-again">
T17:1577  Take too much time again
T17:1578  </h3>
T28:75  <h2 id="timeout-truck">Take too much time</h2>
T30:1121  <p class="note">
T30:1122  <span dir="ltr">
T30:1123  Leads to the
T30:1124  same outcomes as
T30:1125  if Hank is dead
T30:1126  for STAND UP,
T30:1127  SHOOT and [ TAKE
T30:1128  TOO MUCH TIME TO
T30:1129  CHOOSE ], and to
T30:1130  the same result
T30:1131  as successfully
T30:1132  converting the
T30:1133  android when
T30:1134  choosing
T30:1135  TRANSFER.
T30:1136  </span>
T30:1137  </p>
T33:12  <h2 id="idle-outside">
T33:13  <app-unlock-condition [unlockType]="UnlockType.Time">
T33:14  Take too much time
T33:15  </app-unlock-condition>
T33:16  </h2>
T34:302  <h3 id="downstairs-timeout">
T34:303  <app-unlock-condition [unlockType]="UnlockType.Time">
T34:304  Take too much time
T34:305  </app-unlock-condition>
T34:306  </h3>
T34:333  <h3 id="breakfast-timeout">
T34:334  <app-unlock-condition [unlockType]="UnlockType.Time">
T34:335  Take too much time
T34:336  </app-unlock-condition>
T34:337  </h3>
T35:883  <h2 id="timeout">
T35:884  <app-unlock-condition [unlockType]="UnlockType.Time">
T35:885  Take too much time
T35:886  </app-unlock-condition>
T35:887  </h2>
T35:985  <h3 id="timeout-again">Take too much time again</h3>
T36:839  <h2 id="living-room-timeout">
T36:840  <app-unlock-condition
T36:841  [unlockType]="UnlockType.Time"
T36:842  >
T36:843  Take too much time
T36:844  </app-unlock-condition>
T36:845  </h2>
T37:179  <h2 id="timeout">
T37:180  <app-unlock-condition [unlockType]="UnlockType.Time">
T37:181  Take too much time
T37:182  </app-unlock-condition>
T37:183  </h2>
T41:61  <app-unlock-condition [unlockType]="UnlockType.Time">
T41:62  An hourglass icon means the event occurs if you take too
T41:63  much time.
T41:64  </app-unlock-condition>
```

### ch23-01

**Observation to settle:** [which ending] On a run with ASSAULT > shoot the guard on the phone (Simon is shot), the server door locked and the operator shot (so no SWAT team), did the roof scene 'Simon can't continue' with LEAVE / KILL appear (yes/no)?

**Condition needed:** SimonGuardWound versus SimonSWATWound disables rooftop jump.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The cross-chapter GC.SIMONHURTCORRIDOR condition preserves the security injury separately from GC.ASSAULT, but no shared severity variable or jump-eligibility test is present. Template nesting conflicts with PowerPyx's broader wounded rule. No change to guard-only Simon escape.

**Cross-check:** FC23; PP23-1, PP23-2. Guard injury and SWAT rescue routes exist; the chart must not be supplemented by an inferred hidden severity variable. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.07M\.[A-Z0-9.]*?(?:SIMON|SWAT|WOUND)|X0703M\.[A-Z0-9.]*?(?:SIMON.*(?:WOUND|OK)|(?:WOUND|OK).*SIMON)))|(?:MENU\.FLOWCHART\.09C\.GC\.(?:SIMONHURTCORRIDOR|ASSAULT|SIMONDIEDROOM|SIMONDIEDROOF))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
shoot the left guard|shoot the right guard|SWAT storms|save Simon|alarm wasn.t triggered
```

**All search hits (53 source locations):**

```text
E:9372 / J:15291  MENU.FLOWCHART.09C.GC.SIMONHURTCORRIDOR
  J:15291  "SIMONHURTCORRIDOR": "WOUNDED DURING 'STATFORD TOWER'",
E:9374 / J:15293  MENU.FLOWCHART.09C.GC.ASSAULT
  J:15293  "ASSAULT": "ATTACKED BY SWAT DURING 'STATFORD TOWER'",
E:9375 / J:15294  MENU.FLOWCHART.09C.GC.SIMONDIEDROOM
  J:15294  "SIMONDIEDROOM": "DIED IN BROADCAST DURING 'STATFORD TOWER'",
E:9376 / J:15295  MENU.FLOWCHART.09C.GC.SIMONDIEDROOF
  J:15295  "SIMONDIEDROOF": "DIED ON ROOFTOP DURING 'STATFORD TOWER'"
E:9502 / J:15437  MENU.FLOWCHART.07M.CORRIDOR.SIMONHURT
  J:15437  "SIMONHURT": "SIMON DAMAGED",
E:9535 / J:15472  MENU.FLOWCHART.07M.BROADCAST.SWAT
  J:15472  "SWAT": "SWAT TEAM STORMS ROOM",
E:9536 / J:15473  MENU.FLOWCHART.07M.BROADCAST.SIMON
  J:15473  "SIMON": "SIMON DAMAGED",
E:9537 / J:15474  MENU.FLOWCHART.07M.BROADCAST.SIMONSAVE
  J:15474  "SIMONSAVE": "TRY TO SAVE SIMON",
E:9538 / J:15475  MENU.FLOWCHART.07M.BROADCAST.SIMONLEAVE
  J:15475  "SIMONLEAVE": "LEAVE SIMON",
E:9539 / J:15476  MENU.FLOWCHART.07M.BROADCAST.SIMONSAVESUCCESS
  J:15476  "SIMONSAVESUCCESS": "SIMON SAVED",
E:9540 / J:15477  MENU.FLOWCHART.07M.BROADCAST.SIMONSAVEFAIL
  J:15477  "SIMONSAVEFAIL": "FAIL TO SAVE SIMON",
E:9541 / J:15478  MENU.FLOWCHART.07M.BROADCAST.SIMONKILLED
  J:15478  "SIMONKILLED": "SIMON IS KILLED",
E:9544 / J:15481  MENU.FLOWCHART.07M.BROADCAST.SIMONDEAD
  J:15481  "SIMONDEAD": "SIMON DIED",
E:9551 / J:15490  MENU.FLOWCHART.07M.ROOF.SIMON
  J:15490  "SIMON": "SIMON CAN'T CONTINUE",
E:9553 / J:15492  MENU.FLOWCHART.07M.ROOF.SIMONLEAVE
  J:15492  "SIMONLEAVE": "LEAVE SIMON",
E:9554 / J:15493  MENU.FLOWCHART.07M.ROOF.SIMONSHOOT
  J:15493  "SIMONSHOOT": "EXECUTE SIMON",
E:9561 / J:15500  MENU.FLOWCHART.07M.ROOF.SIMONDEAD
  J:15500  "SIMONDEAD": "SIMON DIES ON ROOF",
E:9562 / J:15501  MENU.FLOWCHART.07M.ROOF.SIMONLEFT
  J:15501  "SIMONLEFT": "SIMON LEFT ON ROOF",
E:9564 / J:15503  MENU.FLOWCHART.07M.ROOF.ESCAPESIMONLEFT
  J:15503  "ESCAPESIMONLEFT": "THE GROUP ESCAPED BUT SIMON WAS LEFT BEHIND",
E:9565 / J:15504  MENU.FLOWCHART.07M.ROOF.ESCAPESIMONDESTROYED
  J:15504  "ESCAPESIMONDESTROYED": "THE GROUP ESCAPED BUT SIMON WAS DESTROYED"
E:21386 / J:39199  X0703M.BROADCORRIDOR.ASSAULT.FA.X07MSIMON.SIMONWOUNDED02.1
E:21387 / J:39200  X0703M.BROADCORRIDOR.ASSAULT.FA.X07MSIMON.SIMONWOUNDED02.2
E:21388 / J:39204  X0703M.BROADCORRIDOR.ASSAULT.FA.X07MJOSH.SIMONWOUNDED01
E:21389 / J:39207  X0703M.BROADCORRIDOR.ASSAULT.FA.X07MMARLA.SIMONWOUNDED03
E:21398 / J:39228  X0703M.BROADCORRIDOR.LOOK.PC.X07MSIMON.OPINION
E:21399 / J:39229  X0703M.BROADCORRIDOR.LOOK.PC.X07MSIMON.TRICK
E:21400 / J:39230  X0703M.BROADCORRIDOR.LOOK.PC.X07MSIMON.ATTACK
E:21467 / J:39377  X0703M.ROOF.BRAD.PC.X07MSIMON.WOUNDED01
E:21471 / J:39381  X0703M.ROOF.BRAD.PC.X07MSIMON.WOUNDED02
E:21473 / J:39383  X0703M.ROOF.BRAD.PC.X07MSIMON.WOUNDED01MARKUS
E:21474 / J:39384  X0703M.ROOF.BRAD.PC.X07MSIMON.WOUNDED02B
T14:673  {{ t("X0703M.BROADCORRIDOR.LOOK.PC.X07MSIMON.OPINION") }}
T14:818  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MJOSH.SIMONWOUNDED01"
T14:825  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MSIMON.SIMONWOUNDED02"
T14:832  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MMARLA.SIMONWOUNDED03"
T14:884  <div class="condition">
T14:885  <p>Shoot the right guard</p>
T14:886  </div>
T14:907  <div class="condition">
T14:908  <p>Shoot the left guard</p>
T14:909  </div>
T14:923  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MJOSH.SIMONWOUNDED01"
T14:930  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MSIMON.SIMONWOUNDED02"
T14:937  "X0703M.BROADCORRIDOR.ASSAULT.FA.X07MMARLA.SIMONWOUNDED03"
T14:1307  <div class="condition">
T14:1308  <p>The alarm wasn't triggered</p>
T14:1309  </div>
T14:1332  <div class="condition"><p>SWAT storms the room</p></div>
T14:1455  <div class="condition">
T14:1456  <p>Save Simon</p>
T14:1457  </div>
T14:1463  "X0703M.ROOF.BRAD.PC.X07MSIMON.WOUNDED01"
T32:669  <h2 id="save-simon">Save Simon</h2>
```

### ch23-02

**Observation to settle:** [a stat arrow] With nobody killed, BEGIN CALMLY and END DETERMINEDLY: did Public Opinion go up at Media Reacts (yes/no)? (A 'no' means the ending drives the tone line, as built.)

**Condition needed:** mediaTone depends on opening CALM or ending PEACEFUL and human kills.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** CALM is the opening label; DETERMINED occurs at both ends. Template condition prose does not name an internal speech-tone register or assignment order. No change to M12 ending-based news tone or public opinion.

**Cross-check:** FC23; PP23-1, PP23-2. Guard injury and SWAT rescue routes exist; the chart must not be supplemented by an inferred hidden severity variable. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0703M\.[A-Z0-9.]*?(?:CALM|DETERMINED|PEACEFUL)|X0704M\.[A-Z0-9.]*?(?:CALM|DETERMINED|PEACEFUL))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
chose CALM|chose DETERMINED|didn.t kill anyone
```

**All search hits (75 source locations):**

```text
E:21098 / J:38570  X0703M.TV.REACTIONS.PC.X07MBRINKLEY.PEACEFUL
E:21112 / J:38617  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.1
E:21113 / J:38618  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.2
E:21114 / J:38619  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.3
E:21115 / J:38620  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.4
E:21116 / J:38621  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.5
E:21117 / J:38622  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.6
E:21118 / J:38623  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.7
E:21119 / J:38624  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.8
E:21120 / J:38625  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2.9
E:21121 / J:38628  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.1
E:21122 / J:38629  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.2
E:21123 / J:38630  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.3
E:21124 / J:38631  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.4
E:21125 / J:38632  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.5
E:21126 / J:38633  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.6
E:21127 / J:38634  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.7
E:21128 / J:38635  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.8
E:21129 / J:38636  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2.9
E:21143 / J:38656  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.1
E:21144 / J:38657  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.2
E:21145 / J:38658  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.3
E:21146 / J:38659  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.4
E:21147 / J:38660  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.5
E:21148 / J:38661  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.6
E:21149 / J:38662  X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2.7
E:21173 / J:38703  X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01.CALM
E:21174 / J:38704  X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01.DETERMINED
E:21188 / J:38728  X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01V2.CALM
E:21189 / J:38729  X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01V2.DETERMINED
T14:1050  t('X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01.CALM')
T14:1057  "X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.CALMV2"
T14:1066  'X0703M.BROADCAST.MESSAGE.PC.READYCHOICE01.DETERMINED'
T14:1074  "X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDV2"
T14:1295  "X0703M.BROADCAST.MESSAGE.PC.X07MMARKUS.DETERMINEDENDV2"
T14:1735  <div class="condition"><p>Didn't kill anyone</p></div>
T14:1763  <app-condition-group>
T14:1764  <app-conditioned-content>
T14:1765  <div class="condition">
T14:1766  <p>Chose DETERMINED or killed humans</p>
T14:1767  </div>
T14:1768  <div class="content">
T14:1769  <p>
T14:1770  <app-relation
T14:1771  [name]="RelationName.PublicOpinion"
T14:1772  [type]="RelationType.LargeDown"
T14:1773  ></app-relation>
T14:1774  <app-dialogue-line name="CTN TV - Michael Brinkley">
T14:1775  {{
T14:1776  t(
T14:1777  "X0703M.TV.REACTIONS.PC.X07MBRINKLEY.AGRESSIVE"
T14:1778  )
T14:1779  }}
T14:1780  </app-dialogue-line>
T14:1781  </p>
T14:1782  </div>
T14:1783  </app-conditioned-content>
T14:1784  <app-conditioned-content>
T14:1785  <div class="condition">
T14:1786  <p>Chose CALM and didn't kill anyone</p>
T14:1787  </div>
T14:1788  <div class="content">
T14:1789  <p>
T14:1790  <app-relation
T14:1791  [name]="RelationName.PublicOpinion"
T14:1792  [type]="RelationType.LargeUp"
T14:1793  ></app-relation>
T14:1794  <app-dialogue-line name="CTN TV - Michael Brinkley">
T14:1795  {{
T14:1796  t(
T14:1797  "X0703M.TV.REACTIONS.PC.X07MBRINKLEY.PEACEFUL"
T14:1798  )
T14:1799  }}
T14:1800  </app-dialogue-line>
T14:1801  </p>
```

### ch25-01

**Observation to settle:** [which ending] With every piece of evidence hidden, coffee made, ALICE and TIRED answered, if you answer DOG to the laundry-room noise, does the officer open the laundry room (yes/no)?

**Condition needed:** suspicion accumulator plus DOG answer passes officer-inspection cutoff.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Answer-specific keys and fooled/suspicious blocks confirm alternatives, but there is no answer-weight or suspicion cutoff expression. Safe/unsafe recipes do not isolate a clean DOG control. No change to DOG=2 or threshold=3.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:GUI\.SUSPICIONGAUGE\.|X0801K\.COP\.INSPECTION\.[A-Z0-9.]*?(?:DOG|WIND|MACHINE|NOTHING))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Policeman is fooled|Policeman is suspicious
```

**All search hits (31 source locations):**

```text
E:759 / J:888  GUI.SUSPICIONGAUGE.TITLE
  J:888  "TITLE": "SUSPICION LEVEL"
E:22214 / J:40851  X0801K.COP.INSPECTION.PC.X08KKARA.DOG.1
E:22215 / J:40852  X0801K.COP.INSPECTION.PC.X08KKARA.DOG.2
E:22216 / J:40855  X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE.1
E:22217 / J:40856  X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE.2
E:22218 / J:40859  X0801K.COP.INSPECTION.PC.X08KKARA.WIND.1
E:22219 / J:40860  X0801K.COP.INSPECTION.PC.X08KKARA.WIND.2
E:22220 / J:40862  X0801K.COP.INSPECTION.PC.X08KKARA.NOTHINGHEARD
E:22232 / J:40880  X0801K.COP.INSPECTION.PC.X08KADAM.DOG
E:22233 / J:40881  X0801K.COP.INSPECTION.PC.X08KADAM.WASHMACHINE
E:22234 / J:40882  X0801K.COP.INSPECTION.PC.X08KADAM.WIND
E:22235 / J:40883  X0801K.COP.INSPECTION.PC.X08KADAM.NOTHINGHEARD
E:22253 / J:40909  X0801K.COP.INSPECTION.PC.X08KCOP.DOG
E:22254 / J:40910  X0801K.COP.INSPECTION.PC.X08KCOP.WASHMACHINE
E:22255 / J:40911  X0801K.COP.INSPECTION.PC.X08KCOP.WIND
E:22256 / J:40912  X0801K.COP.INSPECTION.PC.X08KCOP.NOTHINGHEARD
E:22272 / J:40942  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.DOG
E:22273 / J:40943  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WASHMACHINE
E:22274 / J:40944  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WIND
E:22275 / J:40945  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.NOTHINGHEARD
E:22276 / J:40946  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.DONOTHING
T16:1735  t('X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.DOG')
T16:1741  {{ t("X0801K.COP.INSPECTION.PC.X08KKARA.DOG.2") }}
T16:1748  'X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WASHMACHINE'
T16:1756  "X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE"
T16:1764  t('X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WIND')
T16:1771  "X0801K.COP.INSPECTION.PC.X08KKARA.WIND"
T16:1780  'X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.NOTHINGHEARD'
T16:1788  "X0801K.COP.INSPECTION.PC.X08KKARA.NOTHINGHEARD"
T16:1798  <div class="condition"><p>Policeman is fooled</p></div>
T16:1841  <div class="condition"><p>Policeman is suspicious</p></div>
```

### ch25-02

**Observation to settle:** [which ending] With no evidence hidden (door opened in time, Luther and Alice upstairs), does WASHING MACHINE still make the officer leave (yes/no)?

**Condition needed:** exposed evidence count contributes enough suspicion despite WASHING_MACHINE.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Evidence objectives distinguish hiding success from suspicion success, but no 3-items-implies-inspection condition is stored. Detailed earlier player counterexamples remain reasons to test the benchmark, not decoded weights. No change to evidence weights/cutoff.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:THOUGHTS\.0801K\.[A-Z0-9.]*?(?:SUSPICION|EVIDENCES)|X0801K\.COP\.[A-Z0-9.]*?(?:BLOOD|MAGAZINE|CLOTH|MACHINE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
policeman sees blue blood|Policeman is fooled|Policeman is suspicious
```

**All search hits (26 source locations):**

```text
E:4236 / J:5905  THOUGHTS.0801K.SUSPICION
  J:5905  "SUSPICION": "HIDE DEVIANT EVIDENCES",
E:4238 / J:5908  THOUGHTS.0801K.EVIDENCES.0
  J:5908  "0": "FIND DEVIANT EVIDENCE : 0/4",
E:4239 / J:5909  THOUGHTS.0801K.EVIDENCES.1
  J:5909  "1": "FIND EVIDENCE OF DEVIANTS ( 1 LEFT)",
E:4240 / J:5910  THOUGHTS.0801K.EVIDENCES.2
  J:5910  "2": "FIND EVIDENCE OF DEVIANTS ( 2 LEFT)",
E:4241 / J:5911  THOUGHTS.0801K.EVIDENCES.3
  J:5911  "3": "FIND EVIDENCE OF DEVIANTS ( 3 LEFT)",
E:4242 / J:5912  THOUGHTS.0801K.EVIDENCES.4
  J:5912  "4": "FIND EVIDENCE OF DEVIANTS ( 4 LEFT)",
E:4243 / J:5913  THOUGHTS.0801K.EVIDENCES.VALUE
  J:5913  "VALUE": "DON'T AROUSE SUSPICION"
E:4263 / J:5934  THOUGHTS.0801K.SUSPICIONVAL
  J:5934  "SUSPICIONVAL": "NO DEVIANT EVIDENCE LEFT",
E:4264 / J:5935  THOUGHTS.0801K.EVIDENCESVAL
  J:5935  "EVIDENCESVAL": "DIDN'T AROUSE SUSPICION",
E:4279 / J:5950  THOUGHTS.0801K.FINDEVIDENCES
  J:5950  "FINDEVIDENCES": "FIND DEVIANT EVIDENCE",
E:4280 / J:5951  THOUGHTS.0801K.FINDREMAINGINGEVIDENCES
  J:5951  "FINDREMAINGINGEVIDENCES": "FIND REMAINING DEVIANT EVIDENCES",
E:22216 / J:40855  X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE.1
E:22217 / J:40856  X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE.2
E:22233 / J:40881  X0801K.COP.INSPECTION.PC.X08KADAM.WASHMACHINE
E:22254 / J:40910  X0801K.COP.INSPECTION.PC.X08KCOP.WASHMACHINE
E:22273 / J:40943  X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WASHMACHINE
T16:1416  <div class="condition">
T16:1417  <p>
T16:1418  Kara didn't close the cupboard - policeman sees blue
T16:1419  blood
T16:1420  </p>
T16:1421  </div>
T16:1748  'X0801K.COP.INSPECTION.PC.BIGNOISECHOICE04.WASHMACHINE'
T16:1756  "X0801K.COP.INSPECTION.PC.X08KKARA.WASHMACHINE"
T16:1798  <div class="condition"><p>Policeman is fooled</p></div>
T16:1841  <div class="condition"><p>Policeman is suspicious</p></div>
```

### ch25-03

**Observation to settle:** [a number] In one replay with the meter on screen: does skipping the coffee raise it, and does UPSET (instead of TIRED) raise it (yes/no for each)?

**Condition needed:** coffee and UPSET update suspicion, independently of Adam dialogue.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Coffee/no-coffee branches are scripted variants; UPSET/TIRED keys name explanations, not suspicion increments. No numerical or signed update is attached. No change to +1 coffee omission/UPSET calibrations.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0801K\.COP\.[A-Z0-9.]*?(?:COFFEE|UPSET|TIRED)|GUI\.SUSPICIONGAUGE\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
made coffee|didn.t make coffee
```

**All search hits (17 source locations):**

```text
E:759 / J:888  GUI.SUSPICIONGAUGE.TITLE
  J:888  "TITLE": "SUSPICION LEVEL"
E:22176 / J:40786  X0801K.COP.INSPECTION.FA.X08KCOP.COFFEE
E:22208 / J:40841  X0801K.COP.INSPECTION.PC.X08KKARA.TIRED.1
E:22209 / J:40842  X0801K.COP.INSPECTION.PC.X08KKARA.TIRED.2
E:22226 / J:40872  X0801K.COP.INSPECTION.PC.X08KADAM.TIRED
E:22248 / J:40902  X0801K.COP.INSPECTION.PC.X08KCOP.TIRED
E:22269 / J:40937  X0801K.COP.INSPECTION.PC.ADAMCHOICE03.TIRED
E:22277 / J:40952  X0801K.COP.INSPECTION.VO.X08KCOP.NOCOFFEE.1
E:22278 / J:40953  X0801K.COP.INSPECTION.VO.X08KCOP.NOCOFFEE.2
E:22279 / J:40954  X0801K.COP.INSPECTION.VO.X08KCOP.NOCOFFEE.3
T16:1568  <div class="condition"><p>Made coffee</p></div>
T16:1573  t("X0801K.COP.INSPECTION.FA.X08KCOP.COFFEE")
T16:1649  t('X0801K.COP.INSPECTION.PC.ADAMCHOICE03.TIRED')
T16:1656  "X0801K.COP.INSPECTION.PC.X08KKARA.TIRED"
T16:1697  <div class="condition"><p>Made coffee</p></div>
T16:1711  <div class="condition"><p>Didn't make coffee</p></div>
T16:1717  "X0801K.COP.INSPECTION.VO.X08KCOP.NOCOFFEE"
```

### ch25-04

**Observation to settle:** [which ending] With everything else hidden and the laundry-room door left open, does the officer still leave after WASHING MACHINE (yes/no)?

**Condition needed:** laundryDoorOpen contributes suspicion or direct discovery.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Closing the laundry door is a chart action, but no officer-sees-open-door node or weighted update is specified. No change to +1 open-door calibration.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.08K\.[A-Z0-9.]*?(?:DOOR|LAUNDRY)|X0801K\.COP\.[A-Z0-9.]*?(?:LAUNDRY|DOOR))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
laundry.*door|door.*laundry
```

**All search hits (4 source locations):**

```text
E:9401 / J:15323  MENU.FLOWCHART.08K.CHECKLAUNDRY
  J:15323  "CHECKLAUNDRY": "CHECK ON DEVIANTS",
E:9407 / J:15329  MENU.FLOWCHART.08K.COPATDOOR
  J:15329  "COPATDOOR": "COP AT THE DOOR",
E:9413 / J:15335  MENU.FLOWCHART.08K.CLOSELAUNDRY
  J:15335  "CLOSELAUNDRY": "SHUT THE DOOR OF LAUNDRY ROOM",
E:9424 / J:15346  MENU.FLOWCHART.08K.COPOPENDOOR
  J:15346  "COPOPENDOOR": "OPEN THE DOOR",
```

### ch25-05

**Observation to settle:** [a number] Moving deliberately, how many of the hiding actions (cover, blood cupboard, clothes, laundry door, tell Luther, curtain, Adam) can you finish before the officer insists (a number)?

**Condition needed:** doorInsistence timer duration, action durations and suspension rules.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Insistence and timed evidence-hiding events exist, but neither a fixed six-action budget nor action durations are extracted. PowerPyx supplies approximately 50 seconds, not six actions. No change to six/seven conversion; keep it explicitly calibrated.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0801K\.[A-Z0-9.]*?(?:INSIST|TIMEOUT)|MENU\.FLOWCHART\.08K\.[A-Z0-9.]*?(?:INSIST|HIDE|EVIDENCE)))|(?:X0801K\.[A-Z0-9.]*?(?:INSIST|TIMEOUT)|THOUGHTS\.0801K\.TIMER|MENU\.FLOWCHART\.08K\.[A-Z0-9.]*?(?:INSIST|HIDE|EVIDENCE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
policeman insists|police.*door|hide.*evidence
```

**All search hits (26 source locations):**

```text
E:4269 / J:5940  THOUGHTS.0801K.TIMERPOLICE
  J:5940  "TIMERPOLICE": "OPEN TO THE POLICE",
E:9408 / J:15330  MENU.FLOWCHART.08K.SANDBOXEVIDENCES
  J:15330  "SANDBOXEVIDENCES": "FIND AND HIDE EVIDENCE OF DEVIANTS",
E:9409 / J:15331  MENU.FLOWCHART.08K.HIDEMAGAZINE
  J:15331  "HIDEMAGAZINE": "CHANGE MAGAZINE COVER",
E:9410 / J:15332  MENU.FLOWCHART.08K.HIDEBLOOD
  J:15332  "HIDEBLOOD": "HIDE BLUE BLOOD POUCHES",
E:9412 / J:15334  MENU.FLOWCHART.08K.HIDELUTHERALICE
  J:15334  "HIDELUTHERALICE": "TELL ALICE & LUTHER TO HIDE",
E:9414 / J:15336  MENU.FLOWCHART.08K.HIDECLOTHES
  J:15336  "HIDECLOTHES": "HIDE THE ANDROID CLOTHES",
E:9415 / J:15337  MENU.FLOWCHART.08K.HIDEUPSTAIRS
  J:15337  "HIDEUPSTAIRS": "UPSTAIRS",
E:9416 / J:15338  MENU.FLOWCHART.08K.HIDESTORAGE
  J:15338  "HIDESTORAGE": "IN THE LAUNDRY ROOM",
E:9417 / J:15339  MENU.FLOWCHART.08K.HIDEKITCHEN
  J:15339  "HIDEKITCHEN": "IN THE KITCHEN",
E:9421 / J:15343  MENU.FLOWCHART.08K.SCENEENDHIDELUTHERKILLSCOP
  J:15343  "SCENEENDHIDELUTHERKILLSCOP": "LUTHER DIED KILLING POLICEMAN",
E:9425 / J:15347  MENU.FLOWCHART.08K.COPINSISTS
  J:15347  "COPINSISTS": "POLICEMAN INSISTS AND KARA HAS TO OPEN THE DOOR",
E:9442 / J:15364  MENU.FLOWCHART.08K.HIDEALICE
  J:15364  "HIDEALICE": "TELL ALICE TO HIDE",
E:22094 / J:40600  X0801K.HOUSE.TEA.PC.CHOICE04.INSIST
E:22381 / J:41208  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.1
E:22382 / J:41209  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.2
E:22383 / J:41210  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.3
E:22385 / J:41215  X0801K.WAIT.ALICE.PC.X08KALICE.INSIST
E:22395 / J:41231  X0801K.WAIT.ALICE.PC.INSISTCHOICE.INSIST
E:22396 / J:41232  X0801K.WAIT.ALICE.PC.INSISTCHOICE.LETITGO
E:22397 / J:41237  X0801K.WAIT.ALICE.FA.X08KALICE.INSISTSEC
T16:795  [choiceLabel]="t('X0801K.HOUSE.TEA.PC.CHOICE04.INSIST')"
T16:1001  t('X0801K.WAIT.ALICE.PC.INSISTCHOICE.INSIST')
T16:1006  {{ t("X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.1") }}
T16:1009  {{ t("X0801K.WAIT.ALICE.PC.X08KALICE.INSIST") }}
T16:1014  "X0801K.WAIT.ALICE.PC.X08KKARA.INSIST",
T16:1023  t('X0801K.WAIT.ALICE.PC.INSISTCHOICE.LETITGO')
```

### ch25-06

**Observation to settle:** [which buttons the model is offered] After TAKE ALICE OUTSIDE (PREVENT ALICE SEEING MARY), can Kara still sit with Alice by the fire and get the INSIST / LET IT GO prompt (yes/no)?

**Condition needed:** fireplaceAliceTalk disabled by TAKE_ALICE_OUTSIDE versus merely reordered.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The two early choices and later conversation are named without an executable visit guard. Unconditional template placement does not disprove the wiki's STAY prerequisite. No change to K15q gate.

**Cross-check:** FC25; PP25-1, PP25-2, PP25-3, PP25-4. Door/evidence actions and officer outcomes are nodes; no suspicion weights or inspection percentage are printed. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0801K\.[A-Z0-9.]*?(?:GETALICEOUT|LETGO|INSIST)|MENU\.FLOWCHART\.08K\.[A-Z0-9.]*?(?:ALICE|MARY))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
join Alice|talking to Alice|take Alice outside
```

**All search hits (36 source locations):**

```text
E:9379 / J:15301  MENU.FLOWCHART.08K.STARTWITHALICE
  J:15301  "STARTWITHALICE": "ARRIVE AT ROSE'S PLACE WITH ALICE",
E:9383 / J:15305  MENU.FLOWCHART.08K.INQUIREALICE
  J:15305  "INQUIREALICE": "CHECK ON ALICE",
E:9387 / J:15309  MENU.FLOWCHART.08K.PREPAREALICE
  J:15309  "PREPAREALICE": "GET ALICE READY FOR BED",
E:9389 / J:15311  MENU.FLOWCHART.08K.LUTHERWATCHESALICE
  J:15311  "LUTHERWATCHESALICE": "LUTHER WATCHES OVER ALICE",
E:9393 / J:15315  MENU.FLOWCHART.08K.COMFORTMARY
  J:15315  "COMFORTMARY": "PAY RESPECTS TO MARY",
E:9394 / J:15316  MENU.FLOWCHART.08K.MARYWAKESUP
  J:15316  "MARYWAKESUP": "MARY WAKES UP",
E:9400 / J:15322  MENU.FLOWCHART.08K.SBCHECKALICE
  J:15322  "SBCHECKALICE": "CHECK ON ALICE",
E:9411 / J:15333  MENU.FLOWCHART.08K.HIDALICE
  J:15333  "HIDALICE": "TELL ALICE TO HIDE",
E:9412 / J:15334  MENU.FLOWCHART.08K.HIDELUTHERALICE
  J:15334  "HIDELUTHERALICE": "TELL ALICE & LUTHER TO HIDE",
E:9419 / J:15341  MENU.FLOWCHART.08K.ALICEDISCOVERED
  J:15341  "ALICEDISCOVERED": "POLICEMAN DISCOVERS ALICE HIDDEN",
E:9420 / J:15342  MENU.FLOWCHART.08K.LUTHERALICEDISCOVERED
  J:15342  "LUTHERALICEDISCOVERED": "POLICEMAN DISCOVERS ALICE & LUTHER HIDDEN",
E:9427 / J:15349  MENU.FLOWCHART.08K.LIEABOUTALICE
  J:15349  "LIEABOUTALICE": "LIE ABOUT ALICE",
E:9428 / J:15350  MENU.FLOWCHART.08K.COPSUSPICIOUSALICE
  J:15350  "COPSUSPICIOUSALICE": "POLICEMAN SUSPICIOUS ABOUT UPSTAIRS",
E:9442 / J:15364  MENU.FLOWCHART.08K.HIDEALICE
  J:15364  "HIDEALICE": "TELL ALICE TO HIDE",
E:9443 / J:15365  MENU.FLOWCHART.08K.ALICEMARYLET
  J:15365  "ALICEMARYLET": "LET ALICE SEE MARY",
E:9444 / J:15366  MENU.FLOWCHART.08K.ALICEMARYPREVENT
  J:15366  "ALICEMARYPREVENT": "PREVENT ALICE SEEING MARY",
E:9445 / J:15367  MENU.FLOWCHART.08K.ALICEAPPROACHMARY
  J:15367  "ALICEAPPROACHMARY": "ALICE APPROACHES MARY",
E:22094 / J:40600  X0801K.HOUSE.TEA.PC.CHOICE04.INSIST
E:22381 / J:41208  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.1
E:22382 / J:41209  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.2
E:22383 / J:41210  X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.3
E:22385 / J:41215  X0801K.WAIT.ALICE.PC.X08KALICE.INSIST
E:22395 / J:41231  X0801K.WAIT.ALICE.PC.INSISTCHOICE.INSIST
E:22396 / J:41232  X0801K.WAIT.ALICE.PC.INSISTCHOICE.LETITGO
E:22397 / J:41237  X0801K.WAIT.ALICE.FA.X08KALICE.INSISTSEC
T12:377  <h2 id="alice-talk">Talking to Alice</h2>
T16:795  [choiceLabel]="t('X0801K.HOUSE.TEA.PC.CHOICE04.INSIST')"
T16:965  <h2 id="talk-alice-inside">Talking to Alice</h2>
T16:986  <h2 id="join-alice-fire">Join Alice</h2>
T16:1001  t('X0801K.WAIT.ALICE.PC.INSISTCHOICE.INSIST')
T16:1006  {{ t("X0801K.WAIT.ALICE.PC.X08KKARA.INSIST.1") }}
T16:1009  {{ t("X0801K.WAIT.ALICE.PC.X08KALICE.INSIST") }}
T16:1014  "X0801K.WAIT.ALICE.PC.X08KKARA.INSIST",
T16:1023  t('X0801K.WAIT.ALICE.PC.INSISTCHOICE.LETITGO')
T28:988  <h2 id="join-alice">Join Alice</h2>
T28:1554  <h2 id="join-alice-success">Join Alice</h2>
```

### ch26-01

**Observation to settle:** [which ending] Take North's Molotov at the pavilion first, then do only peaceful actions until the sirens: is the ending MARKUS LED A VIOLENT RIOT (yes/no)?

**Condition needed:** tookMolotov overrides message score or ending classification.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Molotov TAKE has North SmallUp and REFUSE SmallDown. No setter says TAKE forces aggressiveMessage or violentEnding. Message and final riot are different nodes, so a peaceful message followed by a riot is structurally possible. No change to override without a controlled run.

**Cross-check:** FC26; PP26-1, PP26-2. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0802M\.DEMONSTR\.LIGHTMYFIRE\.|MENU\.FLOWCHART\.08M\.[A-Z0-9.]*?(?:MOLOTOV|AGGRESS|PACIFI|RIOT)))|(?:X0802M\.DEMONSTR\.LIGHTMYFIRE\.|MENU\.FLOWCHART\.08M\.(?:ACCEPT|REFUSE|AGRESSIVE|PACIFIST|EPACIFIST|EAGRESSIVE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
molotov|sent a pacifist message|sent an aggressive message
```

**All search hits (69 source locations):**

```text
E:6670 / J:10698  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.OFFER
E:6671 / J:10699  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE
E:6672 / J:10700  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.TAKE
E:6673 / J:10701  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND
E:6674 / J:10705  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.1
E:6675 / J:10706  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.2
E:6676 / J:10708  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSE
E:6677 / J:10709  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.TAKE
E:6678 / J:10710  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH
E:6679 / J:10711  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSEND
E:6680 / J:10714  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE
E:6681 / J:10715  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE
E:8542 / J:14402  MENU.FLOWCHART.08M.RIOT
  J:14402  "RIOT": "MAKE A STATEMENT",
E:8561 / J:14421  MENU.FLOWCHART.08M.REFUSE
  J:14421  "REFUSE": "REFUSE MOLOTOV",
E:8562 / J:14422  MENU.FLOWCHART.08M.ACCEPT
  J:14422  "ACCEPT": "ACCEPT MOLOTOV",
E:8580 / J:14440  MENU.FLOWCHART.08M.AGRESSIVE
  J:14440  "AGRESSIVE": "AGGRESSIVE MESSAGE",
E:8581 / J:14441  MENU.FLOWCHART.08M.PACIFIST
  J:14441  "PACIFIST": "PACIFIST MESSAGE",
E:8582 / J:14442  MENU.FLOWCHART.08M.EPACIFIST
  J:14442  "EPACIFIST": "MARKUS LED A PEACEFUL PROTEST",
E:8583 / J:14443  MENU.FLOWCHART.08M.EAGRESSIVE
  J:14443  "EAGRESSIVE": "MARKUS LED A VIOLENT RIOT",
T17:1442  <h2 id="molotov">North gives a molotov cocktail</h2>
T17:1447  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER"
T17:1452  <app-choice-group>
T17:1453  <app-choice-item
T17:1454  [choiceLabel]="
T17:1455  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE')
T17:1456  "
T17:1457  >
T17:1458  <p>
T17:1459  <app-relation
T17:1460  [name]="RelationName.North"
T17:1461  [type]="RelationType.SmallDown"
T17:1462  ></app-relation>
T17:1463  <app-dialogue-line name="Markus">
T17:1464  {{
T17:1466  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE"
T17:1473  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH"
T17:1480  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND"
T17:1483  </app-dialogue-line>
T17:1484  </p>
T17:1485  </app-choice-item>
T17:1486  <app-choice-item
T17:1487  [choiceLabel]="
T17:1488  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE')
T17:1489  "
T17:1490  >
T17:1491  <p>
T17:1492  <app-relation
T17:1493  [name]="RelationName.North"
T17:1494  [type]="RelationType.SmallUp"
T17:1495  ></app-relation>
T17:1496  <span>&oslash;</span>
T17:1497  </p>
T17:1498  </app-choice-item>
T17:1499  </app-choice-group>
T17:1500  </section>
T17:1648  <div class="condition"><p>Sent a pacifist message</p></div>
T17:1690  <div class="condition">
T17:1691  <p>Sent an aggressive message</p>
T17:1692  </div>
T17:1874  <div class="condition"><p>Sent a pacifist message</p></div>
T17:1895  <div class="condition"><p>Sent an aggressive message</p></div>
T19:63  <app-unlock-condition [unlockType]="UnlockType.Lock">
T19:64  Sent a pacifist message in
T19:65  <a [routerLink]="['/chapters', 26]">Capitol Park</a>
T19:66  </app-unlock-condition>
T19:81  <app-unlock-condition [unlockType]="UnlockType.Lock">
T19:82  Sent an aggressive message in
T19:83  <a [routerLink]="['/chapters', 26]">Capitol Park</a>
T19:84  </app-unlock-condition>
```

### ch26-02

**Observation to settle:** [which buttons the model is offered] Tag one object, then walk to the pavilion: does North still offer the Molotov (yes/no)?

**Condition needed:** MolotovOffer requires peaceful count below a fixed cutoff or no prior action.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** There is no unlock annotation on the Molotov section, and no numeric condition in its keys. Consistent and outstanding feedback categories show why plain action count may be insufficient. The prior multi-tag recipe challenges one-tag suppression but supplies no exact replacement. No change to 60% offer cutoff.

**Cross-check:** FC26; PP26-1, PP26-2. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0802M\.DEMONSTR\.LIGHTMYFIRE\.|GUI\.MESSAGESTRENGTH\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
molotov|sent a peaceful message in Stratford
```

**All search hits (34 source locations):**

```text
E:715 / J:816  GUI.MESSAGESTRENGTH.TITLEVIOLENT
  J:816  "TITLEVIOLENT": "AGGRESSIVE MESSAGE",
E:716 / J:817  GUI.MESSAGESTRENGTH.TITLEPACIFIST
  J:817  "TITLEPACIFIST": "PACIFIST MESSAGE",
E:717 / J:818  GUI.MESSAGESTRENGTH.ACTIONPACIFIST
  J:818  "ACTIONPACIFIST": "PACIFIST ACTION",
E:718 / J:819  GUI.MESSAGESTRENGTH.ACTIONVIOLENT
  J:819  "ACTIONVIOLENT": "VIOLENT ACTION",
E:719 / J:820  GUI.MESSAGESTRENGTH.CONSISTENTPACIFIST
  J:820  "CONSISTENTPACIFIST": "CONSISTENT PACIFIST ACTION",
E:720 / J:821  GUI.MESSAGESTRENGTH.CONSISTENTVIOLENT
  J:821  "CONSISTENTVIOLENT": "CONSISTENT VIOLENT ACTION",
E:721 / J:822  GUI.MESSAGESTRENGTH.OUTSTANDING
  J:822  "OUTSTANDING": "OUTSTANDING ACTION",
E:722 / J:823  GUI.MESSAGESTRENGTH.VIOLENT
  J:823  "VIOLENT": "VIOLENT",
E:723 / J:824  GUI.MESSAGESTRENGTH.PACIFIST
  J:824  "PACIFIST": "PACIFIST"
E:6670 / J:10698  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.OFFER
E:6671 / J:10699  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE
E:6672 / J:10700  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.TAKE
E:6673 / J:10701  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND
E:6674 / J:10705  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.1
E:6675 / J:10706  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.2
E:6676 / J:10708  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSE
E:6677 / J:10709  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.TAKE
E:6678 / J:10710  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH
E:6679 / J:10711  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSEND
E:6680 / J:10714  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE
E:6681 / J:10715  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE
T17:51  <div class="condition">
T17:52  <p>
T17:53  Sent a peaceful message in
T17:54  <a [routerLink]="['/chapters', 23]">Stratford Tower</a>
T17:55  </p>
T17:56  </div>
T17:1442  <h2 id="molotov">North gives a molotov cocktail</h2>
T17:1447  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER"
T17:1455  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE')
T17:1466  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE"
T17:1473  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH"
T17:1480  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND"
T17:1488  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE')
```

### ch26-03

**Observation to settle:** [which ending] If the meter ends about 55% peaceful / 45% violent (no Molotov), which ending plays: PEACEFUL PROTEST, VIOLENT RIOT, or FAILED TO DELIVER?

**Condition needed:** message numerator, denominator, minimum strength and tie/balanced fallback.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The corpus distinguishes pacifist/violent, consistent/outstanding feedback, strong-message and failed-message states, but no 60%, tie rule or 55/45 transition. A missing third balanced label does not prove an aggressive fallback. No change to under-60%-peaceful classification.

**Cross-check:** FC26; PP26-1, PP26-2. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:GUI\.MESSAGESTRENGTH\.|MENU\.FLOWCHART\.08M\.[A-Z0-9.]*?(?:MESSAGE|PACIFI|AGGRESS)))|(?:GUI\.MESSAGESTRENGTH\.|MENU\.FLOWCHART\.08M\.(?:FAIL|STRONG|AGRESSIVE|PACIFIST|EFAIL|EPACIFIST|EAGRESSIVE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
sent a pacifist message|sent an aggressive message
```

**All search hits (30 source locations):**

```text
E:715 / J:816  GUI.MESSAGESTRENGTH.TITLEVIOLENT
  J:816  "TITLEVIOLENT": "AGGRESSIVE MESSAGE",
E:716 / J:817  GUI.MESSAGESTRENGTH.TITLEPACIFIST
  J:817  "TITLEPACIFIST": "PACIFIST MESSAGE",
E:717 / J:818  GUI.MESSAGESTRENGTH.ACTIONPACIFIST
  J:818  "ACTIONPACIFIST": "PACIFIST ACTION",
E:718 / J:819  GUI.MESSAGESTRENGTH.ACTIONVIOLENT
  J:819  "ACTIONVIOLENT": "VIOLENT ACTION",
E:719 / J:820  GUI.MESSAGESTRENGTH.CONSISTENTPACIFIST
  J:820  "CONSISTENTPACIFIST": "CONSISTENT PACIFIST ACTION",
E:720 / J:821  GUI.MESSAGESTRENGTH.CONSISTENTVIOLENT
  J:821  "CONSISTENTVIOLENT": "CONSISTENT VIOLENT ACTION",
E:721 / J:822  GUI.MESSAGESTRENGTH.OUTSTANDING
  J:822  "OUTSTANDING": "OUTSTANDING ACTION",
E:722 / J:823  GUI.MESSAGESTRENGTH.VIOLENT
  J:823  "VIOLENT": "VIOLENT",
E:723 / J:824  GUI.MESSAGESTRENGTH.PACIFIST
  J:824  "PACIFIST": "PACIFIST"
E:8573 / J:14433  MENU.FLOWCHART.08M.FAIL
  J:14433  "FAIL": "FAIL TO SEND A MESSAGE",
E:8574 / J:14434  MENU.FLOWCHART.08M.STRONG
  J:14434  "STRONG": "SEND A STRONG MESSAGE",
E:8580 / J:14440  MENU.FLOWCHART.08M.AGRESSIVE
  J:14440  "AGRESSIVE": "AGGRESSIVE MESSAGE",
E:8581 / J:14441  MENU.FLOWCHART.08M.PACIFIST
  J:14441  "PACIFIST": "PACIFIST MESSAGE",
E:8582 / J:14442  MENU.FLOWCHART.08M.EPACIFIST
  J:14442  "EPACIFIST": "MARKUS LED A PEACEFUL PROTEST",
E:8583 / J:14443  MENU.FLOWCHART.08M.EAGRESSIVE
  J:14443  "EAGRESSIVE": "MARKUS LED A VIOLENT RIOT",
E:8587 / J:14447  MENU.FLOWCHART.08M.EFAIL
  J:14447  "EFAIL": "MARKUS FAILED TO DELIVER HIS MESSAGE"
T17:1648  <div class="condition"><p>Sent a pacifist message</p></div>
T17:1690  <div class="condition">
T17:1691  <p>Sent an aggressive message</p>
T17:1692  </div>
T17:1874  <div class="condition"><p>Sent a pacifist message</p></div>
T17:1895  <div class="condition"><p>Sent an aggressive message</p></div>
T19:63  <app-unlock-condition [unlockType]="UnlockType.Lock">
T19:64  Sent a pacifist message in
T19:65  <a [routerLink]="['/chapters', 26]">Capitol Park</a>
T19:66  </app-unlock-condition>
T19:81  <app-unlock-condition [unlockType]="UnlockType.Lock">
T19:82  Sent an aggressive message in
T19:83  <a [routerLink]="['/chapters', 26]">Capitol Park</a>
T19:84  </app-unlock-condition>
```

### ch26-04

**Observation to settle:** [a number] With the meter on screen, does FREE ANDROIDS IN SHOP WINDOWS push it toward violent, and does HACK BILLBOARDS (after a peaceful tower speech) push it toward violent (yes/no each)?

**Condition needed:** window/billboard/light/banner/overload meter valence and speech/current-ratio predicate.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Object keys identify actions, while opening peaceful/violent Stratford variants refer to earlier speech. No text expression binds either speech tone or current meter ratio to each object's score. Prior window and billboard observations remain partial. No unconditional meter reclassification is justified.

**Cross-check:** FC26; PP26-1, PP26-2. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0802M\.DEMONSTR\.[A-Z0-9.]*?(?:SCREEN|BILLBOARD|LIGHT|BANNER|WINDOW|OVERLOAD)|MENU\.FLOWCHART\.08M\.[A-Z0-9.]*?(?:SCREEN|BILLBOARD|LIGHT|BANNER|WINDOW|OVERLOAD)))|(?:X0802M\.DEMONSTR\.[A-Z0-9.]*?(?:SCREEN|LIGHT|BANNER|WINDOW|OVERLOAD)|MENU\.FLOWCHART\.08M\.(?:HBILLBOARD|TBILLBOARD|HAD|TAD|BANNER|FREE|OVERLOAD))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
sent a peaceful message in Stratford|sent a violent message in Stratford|push car|dumpster
```

**All search hits (54 source locations):**

```text
E:6624 / J:10586  X0802M.DEMONSTR.CHOICES.PC.ADSCREEN01.MESSAGE
E:6625 / J:10587  X0802M.DEMONSTR.CHOICES.PC.ADSCREEN01.SYMBOL
E:6626 / J:10588  X0802M.DEMONSTR.CHOICES.PC.ADSCREEN01.TURNOFF
E:6651 / J:10635  X0802M.DEMONSTR.WINDOW.FA.X08MMARLA.DESTROY
E:6652 / J:10638  X0802M.DEMONSTR.WINDOW.FA.CHOICE.TAG
E:6653 / J:10639  X0802M.DEMONSTR.WINDOW.FA.CHOICE.DESTROY
E:6657 / J:10655  X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.SCREENS
E:6670 / J:10698  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.OFFER
E:6671 / J:10699  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE
E:6672 / J:10700  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.TAKE
E:6673 / J:10701  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND
E:6674 / J:10705  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.1
E:6675 / J:10706  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER.2
E:6676 / J:10708  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSE
E:6677 / J:10709  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.TAKE
E:6678 / J:10710  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH
E:6679 / J:10711  X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSEND
E:6680 / J:10714  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE
E:6681 / J:10715  X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE
E:8548 / J:14408  MENU.FLOWCHART.08M.HBILLBOARD
  J:14408  "HBILLBOARD": "HACK BILLBOARDS",
E:8549 / J:14409  MENU.FLOWCHART.08M.TBILLBOARD
  J:14409  "TBILLBOARD": "TURN OFF BILLBOARDS",
E:8554 / J:14414  MENU.FLOWCHART.08M.HAD
  J:14414  "HAD": "HACK STREET LIGHTS",
E:8555 / J:14415  MENU.FLOWCHART.08M.TAD
  J:14415  "TAD": "TURN OFF STREET LIGHTS",
E:8558 / J:14418  MENU.FLOWCHART.08M.DWINDOWS
  J:14418  "DWINDOWS": "DESTROY WINDOWS",
E:8559 / J:14419  MENU.FLOWCHART.08M.TWINDOWS
  J:14419  "TWINDOWS": "TAG WINDOWS",
E:8565 / J:14425  MENU.FLOWCHART.08M.BANNER
  J:14425  "BANNER": "DEPLOY BANNER",
E:8566 / J:14426  MENU.FLOWCHART.08M.FREE
  J:14426  "FREE": "FREE ANDROIDS IN SHOP WINDOWS",
E:8567 / J:14427  MENU.FLOWCHART.08M.OVERLOAD
  J:14427  "OVERLOAD": "OVERLOAD ELECTRIC SYSTEM",
T17:51  <div class="condition">
T17:52  <p>
T17:53  Sent a peaceful message in
T17:54  <a [routerLink]="['/chapters', 23]">Stratford Tower</a>
T17:55  </p>
T17:56  </div>
T17:77  <div class="condition">
T17:78  <p>
T17:79  Sent a violent message in
T17:80  <a [routerLink]="['/chapters', 23]">Stratford Tower</a>
T17:81  </p>
T17:82  </div>
T17:1406  {{ t("X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.SCREENS") }}
T17:1447  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.OFFER"
T17:1455  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.REFUSE')
T17:1466  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSE"
T17:1473  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARLA.REFUSNORTH"
T17:1480  "X0802M.DEMONSTR.LIGHTMYFIRE.PC.X08MMARKUS.REFUSEND"
T17:1488  t('X0802M.DEMONSTR.LIGHTMYFIRE.PC.CHOICE.TAKE')
T17:1503  <h2 id="push-car">Push car</h2>
T17:1512  <h2 id="push-dumpster">
T17:1513  Push and burn the dumpster by the coffee shop
T17:1514  </h2>
T17:1518  <div class="condition">
T17:1519  <p>Go and grab the dumpster directly</p>
T17:1520  </div>
```

### ch26-08

**Observation to settle:** [a stat arrow] Overturn a bench and then a car: do you get two separate North ▲ popups (yes/no), and does freeing the shop-window androids show a Jericho ▲?

**Condition needed:** North object reward repetition and Jericho window reward event.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The template omits separate bench/car reward blocks, so it cannot decide repeated North popups or a once-per-category rule. Named object nodes do not specify arrows. Preserve filmed bench/window findings; no change to per-object rewards.

**Cross-check:** FC26; PP26-1, PP26-2. Message classification and peaceful/riot ending nodes are separate. A title is not an override assignment or 60% rule. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X0802M\.DEMONSTR\.[A-Z0-9.]*?(?:BENCH|NEEDYOU|WINDOW)|MENU\.FLOWCHART\.08M\.[A-Z0-9.]*?(?:BENCH|CAR|WINDOW))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
push car|molotov
```

**All search hits (22 source locations):**

```text
E:6621 / J:10581  X0802M.DEMONSTR.CHOICES.PC.BENCH.TAG
E:6622 / J:10582  X0802M.DEMONSTR.CHOICES.PC.BENCH.KNOCKOVER
E:6623 / J:10583  X0802M.DEMONSTR.CHOICES.PC.BENCH.BURN
E:6651 / J:10635  X0802M.DEMONSTR.WINDOW.FA.X08MMARLA.DESTROY
E:6652 / J:10638  X0802M.DEMONSTR.WINDOW.FA.CHOICE.TAG
E:6653 / J:10639  X0802M.DEMONSTR.WINDOW.FA.CHOICE.DESTROY
E:6655 / J:10653  X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.HAND
E:6656 / J:10654  X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.HELPYOU
E:6657 / J:10655  X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.SCREENS
E:8552 / J:14412  MENU.FLOWCHART.08M.TBENCHES
  J:14412  "TBENCHES": "TAG BENCHES",
E:8553 / J:14413  MENU.FLOWCHART.08M.OBENCHES
  J:14413  "OBENCHES": "OVERTURN BENCHES",
E:8556 / J:14416  MENU.FLOWCHART.08M.PCAR
  J:14416  "PCAR": "PUSH CAR",
E:8557 / J:14417  MENU.FLOWCHART.08M.OCAR
  J:14417  "OCAR": "OVERTURN CAR",
E:8558 / J:14418  MENU.FLOWCHART.08M.DWINDOWS
  J:14418  "DWINDOWS": "DESTROY WINDOWS",
E:8559 / J:14419  MENU.FLOWCHART.08M.TWINDOWS
  J:14419  "TWINDOWS": "TAG WINDOWS",
E:8570 / J:14430  MENU.FLOWCHART.08M.CARS
  J:14430  "CARS": "BURN CARS",
E:8584 / J:14444  MENU.FLOWCHART.08M.POLICECAR
  J:14444  "POLICECAR": "POLICE CAR ARRIVES",
T17:1406  {{ t("X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.SCREENS") }}
T17:1442  <h2 id="molotov">North gives a molotov cocktail</h2>
T17:1503  <h2 id="push-car">Push car</h2>
T17:1506  {{ t("X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.HELPYOU") }}
T17:1526  "X0802M.DEMONSTR.NEEDYOU.VO.X08MMARLA.HAND"
```

### ch27-13

**Observation to settle:** [wording only] If Markus fled Capitol Park (no officers scene), does Hank say anything about Chris when Connor arrives with him (yes/no)?

**Condition needed:** ChrisTopicAvailable if officers neither spared nor killed because Markus fled.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Killed/spared variants do not encode a third no-encounter selector. The chart merge can omit conversation without specifying exactly when. No change to fled-route CHRIS exclusion.

**Cross-check:** FC27; PP27-1. The killed/spared prerequisites do not establish which conversation, if any, runs after fleeing before the officers. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X1101C\.[A-Z0-9.]*?(?:CHRIS|COP)|X1101C\.[A-Z0-9.]*?(?:SPARED|DEAD)))|(?:MENU\.FLOWCHART\.11C\.GC\.CHRIS(?:DEAD|SAVED)|X1102C\.OUTSIDE\.INTRO\.[A-Z0-9.]*?(?:EXECUTED|BEATENDEATH|CHRIS|KILLED|SPARED))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Chris was spared|Chris.*(?:dead|died|killed)
```

**All search hits (28 source locations):**

```text
E:9292 / J:15207  MENU.FLOWCHART.11C.GC.CHRISDEAD
  J:15207  "CHRISDEAD": "COPS KILLED IN 'CAPITOL PARK'",
E:9293 / J:15208  MENU.FLOWCHART.11C.GC.CHRISSAVED
  J:15208  "CHRISSAVED": "COPS SPARED IN 'CAPITOL PARK'"
E:23270 / J:43002  X1102C.OUTSIDE.INTRO.PC.X11CCONNOR.EXECUTED
E:23271 / J:43003  X1102C.OUTSIDE.INTRO.PC.X11CCONNOR.BEATENDEATH
E:23286 / J:43027  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.1
E:23287 / J:43028  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.2
E:23288 / J:43029  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.3
E:23289 / J:43030  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.4
E:23290 / J:43031  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.5
E:23291 / J:43032  X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.6
E:23292 / J:43035  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.1
E:23293 / J:43036  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.2
E:23294 / J:43037  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.3
E:23295 / J:43038  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.4
E:23296 / J:43039  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.5
E:23297 / J:43040  X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH.6
T18:144  <div class="condition">
T18:145  <p>
T18:146  Chris died in
T18:147  <a href="chapter26.html">Capitol Park</a>
T18:148  </p>
T18:149  </div>
T18:162  "X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED"
T18:201 [CUT]  "X1102C.OUTSIDE.INTRO.PC.X11CHANK.BEATENDEATH"
T18:210  <div class="condition"><p>Chris was spared</p></div>
T18:322  <div class="condition"><p>Chris was spared</p></div>
T18:343  <div class="condition"><p>Chris was killed</p></div>
T18:356  "X1102C.OUTSIDE.INTRO.PC.X11CHANK.EXECUTED.3"
```

### ch28-01

**Observation to settle:** [which ending] With John not recruited and Simon alive at Neutral, does Simon give his life for Markus after SACRIFICE (yes/no)?

**Condition needed:** rescuer priority John then Simon with minimum relationship and alive/returned flags.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The template requires Simon survival and a good relationship, but good has no encoded band. Elsewhere the same corpus explicitly says friend or higher when it means that, so do not translate good into a recovered Friend cutoff. No change to above-Neutral Simon gate.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X1001M\.[A-Z0-9.]*?(?:SACRIF|SAVEMARKUS)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:SIMON|JOHN|SACRIF))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
John joined|Simon survived.*good relationship|No one is there to save Markus
```

**All search hits (61 source locations):**

```text
E:9884 / J:15872  MENU.FLOWCHART.10M.JOHNJUMPS
  J:15872  "JOHNJUMPS": "JOHN SACRIFICES HIMSELF",
E:9885 / J:15873  MENU.FLOWCHART.10M.SIMONJUMPS
  J:15873  "SIMONJUMPS": "SIMON SACRIFICES HIMSELF",
E:9888 / J:15876  MENU.FLOWCHART.10M.SIMONSACRIFICE
  J:15876  "SIMONSACRIFICE": "SIMON GAVE HIS LIFE TO SAVE MARKUS",
E:9889 / J:15877  MENU.FLOWCHART.10M.JOHNSACRIFICE
  J:15877  "JOHNSACRIFICE": "JOHN GAVE HIS LIFE TO SAVE MARKUS",
E:9890 / J:15878  MENU.FLOWCHART.10M.SIMONDEAD
  J:15878  "SIMONDEAD": "SIMON DEAD",
E:9891 / J:15879  MENU.FLOWCHART.10M.JOHNDEAD
  J:15879  "JOHNDEAD": "JOHN DEAD",
E:9894 / J:15883  MENU.FLOWCHART.10M.GC.SIMONALIVE
  J:15883  "SIMONALIVE": "SIMON SURVIVED IN 'PUBLIC ENEMY'",
E:9895 / J:15884  MENU.FLOWCHART.10M.GC.JOHNALIVE
  J:15884  "JOHNALIVE": "JOHN JOINED IN 'SPARE PARTS'"
E:14243 / J:24281  X1001M.FINALSTAGE.SPEECH.PC.LASTCHOICE.SACRIFICE
T19:1630  'X1001M.FINALSTAGE.SPEECH.PC.LASTCHOICE.SACRIFICE'
T19:1645  <app-condition-group>
T19:1646  <app-conditioned-content>
T19:1647  <div class="condition">
T19:1648  <p>
T19:1649  <app-unlock-condition
T19:1650  [unlockType]="
T19:1651  UnlockType.Lock
T19:1652  "
T19:1653  >
T19:1654  <span class="font-bold">
T19:1655  John joined in
T19:1656  <a
T19:1657  [routerLink]="[
T19:1658  '/chapters',
T19:1659  19,
T19:1660  ]"
T19:1661  >Spare Parts</a
T19:1662  >
T19:1663  </span>
T19:1664  </app-unlock-condition>
T19:1665  </p>
T19:1666  </div>
T19:1684  <app-conditioned-content>
T19:1685  <div class="condition">
T19:1686  <p>
T19:1687  <app-unlock-condition
T19:1688  [unlockType]="
T19:1689  UnlockType.Lock
T19:1690  "
T19:1691  >
T19:1692  <span class="font-bold">
T19:1693  Simon survived in
T19:1694  <a
T19:1695  [routerLink]="[
T19:1696  '/chapters',
T19:1697  24,
T19:1698  ]"
T19:1699  >Public Enemy</a
T19:1700  >
T19:1701  and has a good
T19:1702  relationship with Markus
T19:1703  </span>
T19:1704  </app-unlock-condition>
T19:1705  </p>
T19:1706  </div>
T19:1725  <div class="condition">
T19:1726  <p>
T19:1727  No one is there to save Markus
T19:1728  </p>
T19:1729  </div>
T19:1878  'X1001M.FINALSTAGE.SPEECH.PC.LASTCHOICE.SACRIFICE'
```

### ch28-04

**Observation to settle:** [which buttons the model is offered] After a first STAND GROUND, does choosing ATTACK ask CONFIRM / ABANDON again (yes/no)?

**Condition needed:** postStandAttack enters confirmation menu versus starts fight.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** A shared CONFIRM/ABANDON label pair and template cross-reference prove a menu exists, not its entry edges after STAND. No transition graph identifies whether the same menu is reused. No change to direct fight after STAND ATTACK.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X1001M\.[A-Z0-9.]*?(?:CONFIRM|ABANDON)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:ATTACK|CHARGE|STAND))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
ATTACK|STAND GROUND
```

**All search hits (155 source locations):**

```text
E:9868 / J:15856  MENU.FLOWCHART.10M.CHARGE
  J:15856  "CHARGE": "CHARGE",
E:9872 / J:15860  MENU.FLOWCHART.10M.STAND
  J:15860  "STAND": "SACRIFICE SELF",
E:9878 / J:15866  MENU.FLOWCHART.10M.ENDSTAND
  J:15866  "ENDSTAND": "MARKUS STOOD HIS GROUND AND WAS KILLED",
E:14152 / J:24158  X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.CONFIRM
E:14153 / J:24159  X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.ABANDON
E:14173 / J:24183  X1001M.FINALSTAGE.SPEECH.PC.X10MMARLA.CONFIRM
E:14174 / J:24184  X1001M.FINALSTAGE.SPEECH.PC.X10MMARLA.ABANDON
E:14191 / J:24205  X1001M.FINALSTAGE.SPEECH.PC.X10MJOSH.CONFIRM
E:14192 / J:24206  X1001M.FINALSTAGE.SPEECH.PC.X10MJOSH.ABANDON
E:14208 / J:24226  X1001M.FINALSTAGE.SPEECH.PC.X10MSIMON.CONFIRM
E:14209 / J:24227  X1001M.FINALSTAGE.SPEECH.PC.X10MSIMON.ABANDON
E:14234 / J:24266  X1001M.FINALSTAGE.SPEECH.PC.ASSAULTCHOICE.CONFIRM
E:14235 / J:24267  X1001M.FINALSTAGE.SPEECH.PC.ASSAULTCHOICE.ABANDON
T10:126  <h2 id="attack-drone">Attack the drone</h2>
T10:130  <div class="condition"><p>Fail Attacking Drone</p></div>
T10:170  <div class="condition"><p>Succeed Attacking Drone</p></div>
T15:610  <div class="condition">
T15:611  <p>
T15:612  Attacked the guards in
T15:613  <a [routerLink]="['/chapters', 23]"
T15:614  >The Stratford Tower</a
T15:615  >
T15:616  </p>
T15:617  </div>
T19:1284  'X1001M.FINALSTAGE.SPEECH.PC.ASSAULTCHOICE.CONFIRM'
T19:1292  "X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.CONFIRM"
T19:1439  'X1001M.FINALSTAGE.SPEECH.PC.ASSAULTCHOICE.ABANDON'
T19:1482  <p class="note">
T19:1483  <span dir="ltr"
T19:1484  >See ATTACK &gt; CHARGE.</span
T19:1485  >
T19:1486  </p>
T19:1495  <p class="note">
T19:1496  <span dir="ltr"
T19:1497  >See STAND GROUND &gt; STAND
T19:1498  GROUND.</span
T19:1499  >
T19:1500  </p>
T19:1580  >
T19:1581  <p class="note">
T19:1582  <span dir="ltr">See ATTACK.</span>
T19:1583  </p>
T19:1584  </app-choice-item>
T19:1585  <app-choice-item
T19:1586  [choiceLabel]="
T19:1587  t(
T19:1588  'X1001M.FINALSTAGE.SPEECH.PC.SHOOTINGCHOICE.STANDGROUND'
T19:1589  )
T19:1590  "
T19:1591  >
T19:1592  <app-relation
T19:1593  [name]="RelationName.PublicOpinion"
T19:1594  [type]="RelationType.SmallUp"
T19:1621  <p class="note">
T19:1622  <span dir="ltr"
T19:1623  >See ATTACK &gt; CONFIRM.</span
T19:1624  >
T19:1625  </p>
T19:1854  <p class="note">
T19:1855  <span dir="ltr">See ATTACK &gt; CONFIRM.</span>
T19:1856  </p>
T19:1871  <p class="note">
T19:1872  <span dir="ltr">See ATTACK &gt; CONFIRM.</span>
T19:1873  </p>
T19:1882  <p class="note">
T19:1883  <span dir="ltr"
T19:1884  >See STAND GROUND &gt; SACRIFICE.</span
T19:1885  >
T19:1886  </p>
T19:1893  <p class="note">
T19:1894  <span dir="ltr"
T19:1895  >See STAND GROUND &gt; RUN AWAY.</span
T19:1896  >
T19:1897  </p>
T19:1924  <p class="note">
T19:1925  <span dir="ltr">See STAND GROUND &gt; RUN AWAY.</span>
T19:1926  </p>
T21:11  <div class="condition">
T21:12  <p>
T21:13  Markus didn't attack the police in
T21:14  <a [routerLink]="['/chapters', 28]">Freedom March</a>
T21:15  </p>
T21:16  </div>
T21:64  <div class="condition">
T21:65  <p>
T21:66  Markus attacked the police in
T21:67  <a [routerLink]="['/chapters', 28]">Freedom March</a>
T21:68  </p>
T21:69  </div>
T22:680  <p class="note">
T22:681  <span dir="ltr"
T22:682  >Kara's part of this chapter ends if Jericho is not
T22:683  attacked (Connor series decommissioned).</span
T22:684  >
T22:685  </p>
T22:721  <p class="note">
T22:722  <span dir="ltr"
T22:723  >Kara's gameplay ends here if Jericho is not
T22:724  attacked (Connor series decommissioned).</span
T22:725  >
T22:726  </p>
T22:736  <h2 id="jericho-attack">Jericho under attack</h2>
T22:1372  <p class="note">
T22:1373  <span dir="ltr"
T22:1374  >Leads to the same result as choosing
T22:1375  ATTACK.</span
T22:1376  >
T22:1377  </p>
T22:1472  <p class="note">
T22:1473  <span dir="ltr">
T22:1474  Leads to the same result as choosing
T22:1475  ATTACK.
T22:1476  </span>
T22:1477  </p>
T22:1599  <div class="condition">
T22:1600  <p>
T22:1601  Luther is dead and Kara played dead
T22:1602  before attacking
T22:1603  </p>
T22:1604  </div>
T23:1477  <div class="condition">
T23:1478  <p>Attacked the soldier</p>
T23:1479  </div>
T23:1500  <div class="condition">
T23:1501  <p>Didn't attack the soldier</p>
T23:1502  </div>
T24:157  <div class="condition">
T24:158  <p>
T24:159  Attacked the Police during the march in
T24:160  <a [routerLink]="['/chapters', 28]"
T24:161  >Freedom March</a
T24:162  >
T24:163  </p>
T24:164  </div>
T25:586  <h1 id="church">In the church : Jericho was attacked</h1>
T26:281  <h1 id="church">In the church : Jericho was attacked</h1>
T27:14  <div class="condition">
T27:15  <p>Jericho wasn't attacked : Luther is there</p>
T27:16  </div>
T30:111  <div class="condition">
T30:112  <p>Attacking the guards and using the elevator</p>
T30:113  </div>
T31:229  <app-unlock-condition [unlockType]="UnlockType.None">
T31:230  Jericho was attacked
T31:231  </app-unlock-condition>
T31:1634  <h1 id="barricade-attacked">Barricade is attacked</h1>
T32:3  <h1 id="speech">
T32:4  In the church or in Jericho (if not attacked in Crossroads)
T32:5  </h1>
T32:686  <h2 id="attacking">Attacking</h2>
T32:719  <h2 id="attacking-2">Attacking</h2>
T32:729  <h1 id="attack-success">
T32:730  Assault successful - Approaching Recall Center N°5
T32:731  </h1>
T32:851  <h1 id="attack-failed">Assault failed</h1>
```

### ch28-06

**Observation to settle:** [a stat arrow] In the charge, is shoving North clear (Push) an optional prompt that appears on every fight and shows North ▲ when pressed (yes/no)?

**Condition needed:** fightPushNorth prompt activation and successful-input North reward.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** A Push action key cannot prove every fight reaches it or attaches a North increment; the template lacks a corresponding discrete reward section. Prior footage supports existence only. No change to PUSH universality or +1.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:GUI\.ACTION\.10M\.[A-Z0-9.]*?PUSH|X1001M\.[A-Z0-9.]*?(?:PUSH|SAVENORTH)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:PUSH|NORTH))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
push.*North|North.*push
```

**All search hits (3 source locations):**

```text
E:648 / J:722  GUI.ACTION.10M.PUSH
E:9833 / J:15821  MENU.FLOWCHART.10M.NORTH
  J:15821  "NORTH": "NORTH ARRIVES",
E:9835 / J:15823  MENU.FLOWCHART.10M.NORTHLEAVES
  J:15823  "NORTHLEAVES": "NORTH LEAVES",
```

### ch28-07

**Observation to settle:** [a stat arrow] Converting only the mall androids, the street androids and the first recruit (no conversions during the march): does the Jericho ▲ still pop (yes/no)?

**Condition needed:** conversion tally counts individual androids or groups, phase inclusion and reward threshold.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Mall, street and march conversion phases are explicit; no integer group sizes or Jericho-at-ten predicate is present. Do not treat a phase label as two androids. No change to group size 2 or threshold 10; both stay calibrations.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X1001M\.[A-Z0-9.]*?(?:CONVERT|CONVERSION)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?CONVERT)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
convert.*android|converting any androids
```

**All search hits (66 source locations):**

```text
E:9859 / J:15847  MENU.FLOWCHART.10M.CONVERT
  J:15847  "CONVERT": "CONVERT ANDROIDS",
E:13777 / J:23461  X1001M.CONVERSION.ANDROID.FA.X10MMARKUS.FREE01
E:13778 / J:23462  X1001M.CONVERSION.ANDROID.FA.X10MMARKUS.FREE05
E:13779 / J:23467  X1001M.CONVERSION.ANDROID.VO.X10MMARKUS.FREE02
E:13780 / J:23468  X1001M.CONVERSION.ANDROID.VO.X10MMARKUS.FREE03
E:13781 / J:23469  X1001M.CONVERSION.ANDROID.VO.X10MMARKUS.FREE04
E:13782 / J:23477  X1001M.CONVERSION.REACT.FA.X10MMAN01.MAN01.1
E:13783 / J:23478  X1001M.CONVERSION.REACT.FA.X10MMAN01.MAN01.2
E:13784 / J:23483  X1001M.CONVERSION.REACT.FA.X10MMAN02.MAN02.1
E:13785 / J:23484  X1001M.CONVERSION.REACT.FA.X10MMAN02.MAN02.2
E:13786 / J:23489  X1001M.CONVERSION.REACT.FA.X10MMAN03.MAN03.1
E:13787 / J:23490  X1001M.CONVERSION.REACT.FA.X10MMAN03.MAN03.2
E:13788 / J:23495  X1001M.CONVERSION.REACT.FA.X10MWOM03.WOM03.1
E:13789 / J:23496  X1001M.CONVERSION.REACT.FA.X10MWOM03.WOM03.2
E:13790 / J:23501  X1001M.CONVERSION.REACT.FA.X10MWOM01.WOM01.1
E:13791 / J:23502  X1001M.CONVERSION.REACT.FA.X10MWOM01.WOM01.2
E:13792 / J:23503  X1001M.CONVERSION.REACT.FA.X10MWOM01.WOM01.3
E:13793 / J:23504  X1001M.CONVERSION.REACT.FA.X10MWOM01.WOM01.4
T14:394  <h2 id="convert">Convert android</h2>
T17:399  <h2 id="convert">Convert Androids</h2>
T17:650  <h3 id="alarm-convert-androids">Convert the androids</h3>
T17:1167  <h2 id="convert-road-android">Convert androids</h2>
T17:1316  <h2 id="convert-store-androids">Convert androids</h2>
T19:793  <h2 id="try-leave">
T19:794  Attempting to go out of the mall without converting any androids
T19:795  </h2>
T19:826  <h2 id="convert-mall">Convert android</h2>
T19:829  {{ t("X1001M.CONVERSION.ANDROID.FA.X10MMARKUS.FREE01") }}
T19:832  {{ t("X1001M.CONVERSION.ANDROID.FA.X10MMARKUS.FREE05") }}
T19:877  <h2 id="convert-street">Convert androids</h2>
T19:944  <h2 id="convert-march">Convert androids</h2>
T19:947  {{ t("X1001M.CONVERSION.ANDROID.VO.X10MMARKUS.FREE02") }}
T19:952  "X1001M.CONVERSION.REACT.FA.X10MMAN01.MAN01"
T19:959  "X1001M.CONVERSION.REACT.FA.X10MMAN02.MAN02"
T19:966  "X1001M.CONVERSION.REACT.FA.X10MMAN03.MAN03"
T19:973  "X1001M.CONVERSION.REACT.FA.X10MWOM03.WOM03"
T19:980  "X1001M.CONVERSION.REACT.FA.X10MWOM01.WOM01"
T30:960  <div class="condition">
T30:961  <p>
T30:962  Successfully converting the
T30:963  android
T30:964  </p>
T30:965  </div>
T30:1114  <div class="condition">
T30:1115  <p>
T30:1116  Fail to convert the
T30:1117  android
T30:1118  </p>
T30:1119  </div>
T30:1121  <p class="note">
T30:1122  <span dir="ltr">
T30:1123  Leads to the
T30:1124  same outcomes as
T30:1125  if Hank is dead
T30:1126  for STAND UP,
T30:1127  SHOOT and [ TAKE
T30:1128  TOO MUCH TIME TO
T30:1129  CHOOSE ], and to
T30:1130  the same result
T30:1131  as successfully
T30:1132  converting the
T30:1133  android when
T30:1134  choosing
T30:1135  TRANSFER.
T30:1136  </span>
T30:1137  </p>
```

### ch28-08

**Observation to settle:** [what unlocks] After a peaceful Capitol Park protest (store freed), is the ANDROID RIOT magazine on the roof, and is EASTERN SPACE RACE there too (yes/no each)?

**Condition needed:** roof magazines depend on successful raid versus violent outcome.

**Verdict: not settled — high confidence that the bounded corpus does not supply the requested numeric/boolean rule; game result unresolved.** Magazine metadata lists publications without save-state conditions. No successful-store/violent-only expression assigns the roof pair. No change to wiki-based separate gates.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:GUI\.MAGAZINE\.[A-Z0-9.]*?(?:RIOT|SPACE)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:MAGAZINE|READ)))|(?:\b(?:ANDROIDARSON|SPACERACE)\b|GUI\.MAGAZINE\.[A-Z0-9.]*?(?:ANDROIDARSON|SPACERACE)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:MAGAZINE|READ))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
ANDROID RIOT|EASTERN SPACE RACE
```

**All search hits (16 source locations):**

```text
E:1561 / J:2026  GUI.MAGAZINE.DNEWS.ANDROIDARSON.TITLE
E:1562 / J:2027  GUI.MAGAZINE.DNEWS.ANDROIDARSON.SUBTITLE
E:1563 / J:2028  GUI.MAGAZINE.DNEWS.ANDROIDARSON.ARTICLE1
E:1564 / J:2029  GUI.MAGAZINE.DNEWS.ANDROIDARSON.ARTICLE2
E:1652 / J:2161  GUI.MAGAZINE.TECHADDICT.SPACERACE.TITLE
E:1653 / J:2162  GUI.MAGAZINE.TECHADDICT.SPACERACE.SUBTITLE
E:1654 / J:2163  GUI.MAGAZINE.TECHADDICT.SPACERACE.ARTICLE1
E:1655 / J:2164  GUI.MAGAZINE.TECHADDICT.SPACERACE.ARTICLE2
E:1656 / J:2167  GUI.MAGAZINE.TECHADDICT.SPACETOURISM.TITLE
E:1657 / J:2168  GUI.MAGAZINE.TECHADDICT.SPACETOURISM.SUBTITLE
E:1658 / J:2169  GUI.MAGAZINE.TECHADDICT.SPACETOURISM.ARTICLE1
E:1659 / J:2170  GUI.MAGAZINE.TECHADDICT.SPACETOURISM.ARTICLE2
E:9832 / J:15820  MENU.FLOWCHART.10M.MAGAZINE1ST
  J:15820  "MAGAZINE1ST": "READ \"ANDROID ARSON\"",
E:9893 / J:15881  MENU.FLOWCHART.10M.MAGAZINE2ND
  J:15881  "MAGAZINE2ND": "READ \"EASTERN SPACE RACE\"",
T43:138  'SPACERACE',
T43:306  'ANDROIDARSON',
```

### ch28-09

**Observation to settle:** [which buttons the model is offered] After a first STAND GROUND, does choosing DISPERSE lead to the police opening fire with CHARGE / STAY / DISPERSE offered (yes/no)?

**Condition needed:** postStandDisperse goes straight to flight versus first-disperse gunfire menu.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The second STAND menu's DISPERSE has no See DISPERSE cross-reference while ATTACK does; that supports immediate flight but absence of a pointer is not an executable edge. Chart topology and earlier walkthrough lead remain a correction candidate. No change until the requested control resolves it.

**Cross-check:** FC28; PP28-1, PP28-2. Police and rescue routes establish outcomes, not exact Simon-band, conversion-count or menu-reuse predicates. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X1001M\.[A-Z0-9.]*?(?:DISPERSE|LEAVE|STAY)|MENU\.FLOWCHART\.10M\.[A-Z0-9.]*?(?:DISPERSE|LEAVE|FIRE|STAND))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
disperse|stand.*ground
```

**All search hits (93 source locations):**

```text
E:9835 / J:15823  MENU.FLOWCHART.10M.NORTHLEAVES
  J:15823  "NORTHLEAVES": "NORTH LEAVES",
E:9839 / J:15827  MENU.FLOWCHART.10M.LEAVE
  J:15827  "LEAVE": "LEAVE",
E:9867 / J:15855  MENU.FLOWCHART.10M.DECIDETOLEAVE
  J:15855  "DECIDETOLEAVE": "LEAVE",
E:9869 / J:15857  MENU.FLOWCHART.10M.OPENFIRE
  J:15857  "OPENFIRE": "POLICE FIRE UNPROVOKED",
E:9872 / J:15860  MENU.FLOWCHART.10M.STAND
  J:15860  "STAND": "SACRIFICE SELF",
E:9878 / J:15866  MENU.FLOWCHART.10M.ENDSTAND
  J:15866  "ENDSTAND": "MARKUS STOOD HIS GROUND AND WAS KILLED",
E:13761 / J:23432  X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE.1
E:13762 / J:23433  X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE.2
E:13763 / J:23434  X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE.3
E:13764 / J:23435  X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE.4
E:13765 / J:23436  X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE.5
E:13882 / J:23694  X1001M.ROOF.NORTH.PC.X10MMARKUS.05LEAVE
E:13941 / J:23777  X1001M.ROOF.NORTH.PC.X10MMARLA.05LEAVE
E:13988 / J:23844  X1001M.ROOF.NORTH.PC.CHOICE05.LEAVE
E:14002 / J:23882  X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY01
E:14003 / J:23883  X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY02
E:14004 / J:23884  X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY03
E:14150 / J:24155  X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.DISPERSE01.1
E:14151 / J:24156  X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.DISPERSE01.2
E:14172 / J:24182  X1001M.FINALSTAGE.SPEECH.PC.X10MMARLA.DISPERSE01
E:14190 / J:24204  X1001M.FINALSTAGE.SPEECH.PC.X10MJOSH.DISPERSE01
E:14207 / J:24225  X1001M.FINALSTAGE.SPEECH.PC.X10MSIMON.DISPERSE01
E:14225 / J:24250  X1001M.FINALSTAGE.SPEECH.PC.X10MRIOTPOLICECHIEF.DISPERSE02.1
E:14226 / J:24251  X1001M.FINALSTAGE.SPEECH.PC.X10MRIOTPOLICECHIEF.DISPERSE02.2
E:14233 / J:24263  X1001M.FINALSTAGE.SPEECH.PC.DECISIONCHOICE.DISPERSE
E:14236 / J:24270  X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.CHARGE
E:14237 / J:24271  X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.RUN
E:14238 / J:24272  X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.STAY
E:14241 / J:24277  X1001M.FINALSTAGE.SPEECH.PC.SHOOTINGCHOICE.DISPERSE
T19:584  [choiceLabel]="t('X1001M.ROOF.NORTH.PC.CHOICE05.LEAVE')"
T19:592  {{ t("X1001M.ROOF.NORTH.PC.X10MMARLA.05LEAVE") }}
T19:595  {{ t("X1001M.ROOF.NORTH.PC.X10MMARKUS.05LEAVE") }}
T19:909  {{ t("X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY01") }}
T19:910  {{ t("X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY02") }}
T19:911  {{ t("X1001M.STAGE01.HUMAN.FA.X10MAGRESSIVMAN.STAY03") }}
T19:1197  "X1001M.STAGE02.POLICEMAN.PC.X10MPOLICEMAN01.DISPERSE"
T19:1495  <p class="note">
T19:1496  <span dir="ltr"
T19:1497  >See STAND GROUND &gt; STAND
T19:1498  GROUND.</span
T19:1499  >
T19:1500  </p>
T19:1505  'X1001M.FINALSTAGE.SPEECH.PC.SHOOTINGCHOICE.DISPERSE'
T19:1509  <p class="note">
T19:1510  <span dir="ltr">See DISPERSE.</span>
T19:1511  </p>
T19:1798  </app-choice-item>
T19:1799  </app-choice-group>
T19:1800  </app-choice-item>
T19:1801  <app-choice-item
T19:1802  [choiceLabel]="
T19:1803  t(
T19:1804  'X1001M.FINALSTAGE.SPEECH.PC.SHOOTINGCHOICE.DISPERSE'
T19:1805  )
T19:1806  "
T19:1807  >
T19:1808  <p>
T19:1809  <app-dialogue-line name="Markus">
T19:1810  {{
T19:1811  t(
T19:1812  "X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.DISPERSE01.2"
T19:1813  )
T19:1814  }}
T19:1815  </app-dialogue-line>
T19:1816  <app-dialogue-line name="Policeman">
T19:1817  {{
T19:1818  translationService.translateObject(
T19:1819  "X1001M.FINALSTAGE.SPEECH.PC.X10MRIOTPOLICECHIEF.DISPERSE02"
T19:1820  ) | async
T19:1821  }}
T19:1822  </app-dialogue-line>
T19:1823  </p>
T19:1824  </app-choice-item>
T19:1825  </app-choice-group>
T19:1829  t('X1001M.FINALSTAGE.SPEECH.PC.DECISIONCHOICE.DISPERSE')
T19:1836  "X1001M.FINALSTAGE.SPEECH.PC.X10MMARKUS.DISPERSE01"
T19:1843  "X1001M.FINALSTAGE.SPEECH.PC.X10MRIOTPOLICECHIEF.DISPERSE02"
T19:1851  t('X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.CHARGE')
T19:1860  t('X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.STAY')
T19:1882  <p class="note">
T19:1883  <span dir="ltr"
T19:1884  >See STAND GROUND &gt; SACRIFICE.</span
T19:1885  >
T19:1886  </p>
T19:1893  <p class="note">
T19:1894  <span dir="ltr"
T19:1895  >See STAND GROUND &gt; RUN AWAY.</span
T19:1896  >
T19:1897  </p>
T19:1903  t('X1001M.FINALSTAGE.SPEECH.PC.DISPERSECHOICE.RUN')
T19:1924  <p class="note">
T19:1925  <span dir="ltr">See STAND GROUND &gt; RUN AWAY.</span>
T19:1926  </p>
```

### ch29-01

**Observation to settle:** [which ending] With Carlos' android dead but Rupert escaped, the Tracis spared, Simon alive and the Stratford deviant escaped, did Fowler's office lead to the evidence room (yes) or straight to decommissioning (no)?

**Condition needed:** sufficientEvidence checks any corpse or at least one usable Jericho solution.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** CARLOSANDROIDMEMORY has a friendly-approach condition, distinct from Carlos' body availability. INSUFFICIENT/SUFFICIENT labels and NOTENOUGHEVIDENCE HUD do not supply the admission predicate. Any-body versus solvable-chain remains unresolved. No change to sufficientEvidence.

**Cross-check:** FC29; PP29-1, PP29-2. The completed alternative charts include the sufficiency split; they do not publish the evidence-admission formula. Use those rather than treating PowerPyx’s 98% zoom as complete. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.12C\.(?:NOTENOUGHEVIDENCES|ENOUGHEVIDENCES|CARLOS[A-Z]*|GC\.[A-Z]*CARLOS[A-Z]*)|THOUGHTS\.1201C\.(?:NOTENOUGH|PROBE|LINK)[A-Z0-9.]*)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Not enough evidence to find Jericho|friendly approach|look at Ortiz
```

**All search hits (17 source locations):**

```text
E:4427 / J:6172  THOUGHTS.1201C.NOTENOUGHEVIDENCE
  J:6172  "NOTENOUGHEVIDENCE": "NOT ENOUGH EVIDENCE",
E:4474 / J:6279  THOUGHTS.1201C.PROBE.MEMORY.VALUE
  J:6279  "VALUE": "PROBE AN ANDROID MEMORY",
E:4475 / J:6280  THOUGHTS.1201C.PROBE.MEMORY.VALIDATED
  J:6280  "VALIDATED": "MEMORY PROBED"
E:9907 / J:15899  MENU.FLOWCHART.12C.NOTENOUGHEVIDENCES
  J:15899  "NOTENOUGHEVIDENCES": "INSUFFICIENT EVIDENCE",
E:9908 / J:15900  MENU.FLOWCHART.12C.ENOUGHEVIDENCES
  J:15900  "ENOUGHEVIDENCES": "SUFFICIENT EVIDENCE",
E:9936 / J:15928  MENU.FLOWCHART.12C.CARLOSBODY
  J:15928  "CARLOSBODY": "BODY OF CARLOS' ANDROID",
E:9939 / J:15931  MENU.FLOWCHART.12C.CARLOSVIDEO
  J:15931  "CARLOSVIDEO": "CARLOS' ANDROID'S MEMORY",
E:9940 / J:15932  MENU.FLOWCHART.12C.CARLOSIDOL
  J:15932  "CARLOSIDOL": "CARLOS' ANDROID'S STATUE",
E:9983 / J:15976  MENU.FLOWCHART.12C.GC.CARLOSANDROID
  J:15976  "CARLOSANDROID": "DIED IN PREVIOUS SCENES",
E:9985 / J:15978  MENU.FLOWCHART.12C.GC.CARLOSANDROIDMEMORY
  J:15978  "CARLOSANDROIDMEMORY": "USED FRIENDLY APPROACH IN 'THE INTERROGATION'",
E:9988 / J:15981  MENU.FLOWCHART.12C.GC.CARLOSANDROIDSTATUE
  J:15981  "CARLOSANDROIDSTATUE": "FOUND IN 'PARTNERS'",
T20:3106  <h2 id="ortiz">Look at Ortiz's android</h2>
T20:3115  <h2 id="timeout">
T20:3116  <app-unlock-condition [unlockType]="UnlockType.Time">
T20:3117  Not enough evidence to find Jericho or took too much time
T20:3118  </app-unlock-condition>
T20:3119  </h2>
```

### ch29-03

**Observation to settle:** [which buttons the model is offered] On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)?

**Condition needed:** insufficientEvidence bypasses Amanda opening and enters Fowler directly.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The template opens with Amanda without an insufficient-evidence condition; the chart START sequence also does not expose a save-state selector. Existing office-first clips support a bypass, but not the controlled Carlos-only history. No change to opening gate.

**Cross-check:** FC29; PP29-1, PP29-2. The completed alternative charts include the sufficiency split; they do not publish the evidence-admission formula. Use those rather than treating PowerPyx’s 98% zoom as complete. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:X1201C\.[A-Z0-9.]*?(?:INTRO|START)|MENU\.FLOWCHART\.12C\.(?:START|AMANDA|NOTENOUGHEVIDENCES))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Fowler.s office|Not enough evidence to find Jericho
```

**All search hits (13 source locations):**

```text
E:9897 / J:15889  MENU.FLOWCHART.12C.START
  J:15889  "START": "START",
E:9907 / J:15899  MENU.FLOWCHART.12C.NOTENOUGHEVIDENCES
  J:15899  "NOTENOUGHEVIDENCES": "INSUFFICIENT EVIDENCE",
E:23541 / J:43414  X1201C.FROZEN.AMANDA.PC.X12CAMANDA.INTRO.1
E:23542 / J:43415  X1201C.FROZEN.AMANDA.PC.X12CAMANDA.INTRO.2
E:23543 / J:43416  X1201C.FROZEN.AMANDA.PC.X12CAMANDA.INTRO.3
E:23588 / J:43484  X1201C.FROZEN.AMANDA.PC.X12CCONNOR.INTRO
T20:15  "X1201C.FROZEN.AMANDA.PC.X12CAMANDA.INTRO"
T20:509  <h2 id="fowler-office">In Fowler's office</h2>
T20:3115  <h2 id="timeout">
T20:3116  <app-unlock-condition [unlockType]="UnlockType.Time">
T20:3117  Not enough evidence to find Jericho or took too much time
T20:3118  </app-unlock-condition>
T20:3119  </h2>
```

### ch29-05

**Observation to settle:** [a number] In the archive fight with Gavin, does missing a single QTE prompt lose the fight (yes), or can you miss one or two and still win (no)?

**Condition needed:** Gavin fight accumulated failures, wound count and difficulty-specific loss cutoff.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Win/loss and Gavin-return text describes outcomes, not input-by-input tolerance. Ordinal dialogue suffixes are not missed-QTE counters. No change to 0.25 calibration or a deterministic miss cutoff.

**Cross-check:** FC29; PP29-1, PP29-2. The completed alternative charts include the sufficiency split; they do not publish the evidence-admission formula. Use those rather than treating PowerPyx’s 98% zoom as complete. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.12C\.[A-Z0-9.]*?(?:GAVIN|FIGHT)|X1202C\.[A-Z0-9.]*?(?:FIGHT|GAVIN.*KILL))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
lose the fight|win the fight
```

**All search hits (73 source locations):**

```text
E:9924 / J:15916  MENU.FLOWCHART.12C.GAVINYELLS
  J:15916  "GAVINYELLS": "GAVIN YELLS",
E:9925 / J:15917  MENU.FLOWCHART.12C.GAVINIGNORE
  J:15917  "GAVINIGNORE": "IGNORE GAVIN",
E:9926 / J:15918  MENU.FLOWCHART.12C.GAVINDISMISS
  J:15918  "GAVINDISMISS": "DISMISS GAVIN",
E:9927 / J:15919  MENU.FLOWCHART.12C.GAVINANSWER
  J:15919  "GAVINANSWER": "ANSWER CALMLY",
E:9928 / J:15920  MENU.FLOWCHART.12C.GAVINNOTCONVINCED
  J:15920  "GAVINNOTCONVINCED": "GAVIN IS SUSPICIOUS",
E:9929 / J:15921  MENU.FLOWCHART.12C.GAVINCONVINCED
  J:15921  "GAVINCONVINCED": "GAVIN IS CONVINCED",
E:9975 / J:15967  MENU.FLOWCHART.12C.AFTERSANDBOXGAVINAPPEARS
  J:15967  "AFTERSANDBOXGAVINAPPEARS": "GAVIN RETURNS",
E:9976 / J:15968  MENU.FLOWCHART.12C.FIGHTGAVIN
  J:15968  "FIGHTGAVIN": "FIGHT GAVIN",
E:9977 / J:15969  MENU.FLOWCHART.12C.FIGHTLOSE
  J:15969  "FIGHTLOSE": "LOSE FIGHT",
E:9978 / J:15970  MENU.FLOWCHART.12C.FIGHTWIN
  J:15970  "FIGHTWIN": "WIN FIGHT",
E:9980 / J:15972  MENU.FLOWCHART.12C.SCENEENDGAVINUNCONSCIOUS
  J:15972  "SCENEENDGAVINUNCONSCIOUS": "CONNOR INCAPACITATED GAVIN",
E:20645 / J:37595  X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT01
E:20646 / J:37596  X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT02
E:20647 / J:37597  X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT05
E:20648 / J:37601  X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT03.1
E:20649 / J:37602  X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT03.2
E:20650 / J:37605  X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT06.1
E:20651 / J:37606  X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT06.2
E:20652 / J:37611  X1202C.OFFICE.HANKHELP.FA.X12CPERKINS.FIGHT04.1
E:20653 / J:37612  X1202C.OFFICE.HANKHELP.FA.X12CPERKINS.FIGHT04.2
E:20654 / J:37613  X1202C.OFFICE.HANKHELP.FA.X12CPERKINS.FIGHT04.3
T11:1142  <div class="condition"><p>Win the fight</p></div>
T11:1252  <div class="condition"><p>Lose the fight</p></div>
T19:1300  <div class="condition">
T19:1301  <p>Win the fight</p>
T19:1302  </div>
T19:1359  <div class="condition">
T19:1360  <p>Lose the fight</p>
T19:1361  </div>
T20:1218  "X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT01"
T20:1225  "X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT03.1"
T20:1232  "X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT02"
T20:1239  "X1202C.OFFICE.HANKHELP.FA.X12CPERKINS.FIGHT04"
T20:1246  "X1202C.OFFICE.HANKHELP.FA.X12CHANK.FIGHT05"
T20:1253  "X1202C.OFFICE.HANKHELP.FA.X12CCOP01.FIGHT06.1"
T20:3185  <div class="condition">
T20:3186  <p>Lose the fight</p>
T20:3187  </div>
T23:1253  <div class="condition"><p>Lose the fight</p></div>
T24:1673  <div class="condition">
T24:1674  <p>Lose the fight</p>
T24:1675  </div>
T29:346  <div class="condition">
T29:347  <p>Win the fight</p>
T29:348  </div>
T29:426  <div class="condition">
T29:427  <p>Lose the fight</p>
T29:428  </div>
T29:622  <div class="condition">
T29:623  <p>Win the fight</p>
T29:624  </div>
T29:638  <div class="condition">
T29:639  <p>Lose the fight</p>
T29:640  </div>
T36:942  <div class="condition">
T36:943  <p>
T36:944  Win the fight unharmed: Kara
T36:945  kills Todd
T36:946  </p>
T36:947  </div>
T36:1017  <div class="condition">
T36:1018  <p>
T36:1019  Lose the fight / Don't reach
T36:1020  the gun in time: Alice kills
T36:1021  Todd
T36:1022  </p>
T36:1023  </div>
T36:1156  <div class="condition">
T36:1157  <p>
T36:1158  Win the fight: Todd is
T36:1159  stunned
T36:1160  </p>
T36:1161  </div>
```

### ch30-01

**Observation to settle:** [a number] As Markus in the raid corridors, did the second bullet hit kill him (yes), or did he survive two hits and die on the third (no)?

**Condition needed:** raid wound count, pre-existing wound offset, fatal cutoff and takeover sharing.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Template predicates explicitly say shot twice, but do not identify initialization, which failed inputs increment, or whether visible hits correspond one-for-one to the counter. Both Connor and Markus cases are named. No replacement of the current cutoff from suffixes or prose alone.

**Cross-check:** FC30; PP30-1. Character subcharts show injuries, departures and rescues, not the initialization or update code of shared counters. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.02A\.[MC]\.[A-Z0-9.]*?(?:SHOT|WOUND)|X0205A\.[A-Z0-9.]*?(?:WOUNDED|SHOT))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
(?:Markus|Connor).*shot twice|Soldiers shoot (?:Markus|Connor) twice|Markus.*injured
```

**All search hits (91 source locations):**

```text
E:10220 / J:16239  MENU.FLOWCHART.02A.C.INTERRUPTSHOT
  J:16239  "INTERRUPTSHOT": "CONNOR IS SHOT DEAD",
E:10247 / J:16266  MENU.FLOWCHART.02A.C.CONNORSHOT
  J:16266  "CONNORSHOT": "CONNOR IS SHOT",
E:10256 / J:16275  MENU.FLOWCHART.02A.C.CHASEDSHOT
  J:16275  "CHASEDSHOT": "ANDROIDS ARE SHOT",
E:10273 / J:16292  MENU.FLOWCHART.02A.C.SAVEANDROIDSWOUNDED
  J:16292  "SAVEANDROIDSWOUNDED": "CONNOR IS WOUNDED",
E:10275 / J:16294  MENU.FLOWCHART.02A.C.CONNORWOUNDED
  J:16294  "CONNORWOUNDED": "CONNOR IS WOUNDED",
E:10284 / J:16305  MENU.FLOWCHART.02A.C.SHOTBYCONNOR
  J:16305  "SHOTBYCONNOR": "CONNOR KILLED MARKUS",
E:10448 / J:16479  MENU.FLOWCHART.02A.M.SHOT
  J:16479  "SHOT": "GET SHOT",
E:10450 / J:16481  MENU.FLOWCHART.02A.M.WOUNDED
  J:16481  "WOUNDED": "MARKUS WOUNDED",
E:10455 / J:16486  MENU.FLOWCHART.02A.M.WOUNDED2
  J:16486  "WOUNDED2": "MARKUS WOUNDED",
E:10456 / J:16487  MENU.FLOWCHART.02A.M.WOUNDEDBADLY
  J:16487  "WOUNDEDBADLY": "MARKUS COLLAPSES",
E:10461 / J:16492  MENU.FLOWCHART.02A.M.CHASEDSHOT
  J:16492  "CHASEDSHOT": "ANDROIDS ARE SHOT",
E:10471 / J:16502  MENU.FLOWCHART.02A.M.JOSHSHOT
  J:16502  "JOSHSHOT": "SOLDIER SHOT JOSH",
E:10486 / J:16517  MENU.FLOWCHART.02A.M.SHOTDEAD
  J:16517  "SHOTDEAD": "MARKUS IS SHOT DEAD",
E:10497 / J:16528  MENU.FLOWCHART.02A.M.NORTHSHOT
  J:16528  "NORTHSHOT": "NORTH IS SHOT",
E:10502 / J:16533  MENU.FLOWCHART.02A.M.MARKUSSHOT
  J:16533  "MARKUSSHOT": "MARKUS GETS SHOT",
E:10520 / J:16551  MENU.FLOWCHART.02A.M.SHOTBYCONNOR
  J:16551  "SHOTBYCONNOR": "CONNOR KILLED MARKUS",
E:10521 / J:16552  MENU.FLOWCHART.02A.M.WOUNDEDBADLY2
  J:16552  "WOUNDEDBADLY2": "MARKUS COLLAPSES",
E:10524 / J:16555  MENU.FLOWCHART.02A.M.MARKUSSHOTRUN
  J:16555  "MARKUSSHOTRUN": "MARKUS GETS SHOT",
E:10526 / J:16557  MENU.FLOWCHART.02A.M.SOLDIERSHOOTWOUNDED
  J:16557  "SOLDIERSHOOTWOUNDED": "MARKUS IS WOUNDED",
E:10530 / J:16561  MENU.FLOWCHART.02A.M.WOUNDEDBADLY3
  J:16561  "WOUNDEDBADLY3": "MARKUS COLLAPSES",
E:10531 / J:16562  MENU.FLOWCHART.02A.M.JOSHSHOT2
  J:16562  "JOSHSHOT2": "JOSH IS SHOT BY THE SOLDIER",
E:11420 / J:17884  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.TOOLATESIMON
E:11421 / J:17885  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.RUN
E:11422 / J:17886  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.WOUNDEDSAVE
E:11423 / J:17887  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.TOOLATEJOSH
E:11424 / J:17888  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.RUNSIMON
E:11425 / J:17889  X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.RUNJOSH
E:11426 / J:17892  X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.TOOLATESIMON
E:11427 / J:17893  X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.RUN
E:11428 / J:17894  X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.WOUNDEDSAVE
E:11429 / J:17895  X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.RUNSIMON
E:11430 / J:17898  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.TOOLATESIMON
E:11431 / J:17899  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.RUN
E:11432 / J:17901  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.WOUNDEDSAVE.1
E:11433 / J:17902  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.WOUNDEDSAVE.2
E:11434 / J:17904  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.TOOLATEJOSH
E:11435 / J:17905  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.RUNSIMON
E:11436 / J:17906  X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.RUNJOSH
E:11437 / J:17909  X0205A.MARKUS.NORTHSHOT.PC.SAVECHOICE.SAVENORTH
E:11438 / J:17910  X0205A.MARKUS.NORTHSHOT.PC.SAVECHOICE.RUN
E:11439 / J:17916  X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE.1
E:11440 / J:17917  X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE.2
E:11441 / J:17918  X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE.3
E:11442 / J:17919  X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE.4
E:11443 / J:17923  X0205A.MARKUS.NORTHSHOT.FA.X02AMARLA.SAVEFAILURENORTH
E:11444 / J:17924  X0205A.MARKUS.NORTHSHOT.FA.X02AMARLA.SAVEFAILURENORTHV2
T23:877  <div class="condition">
T23:878  <p>
T23:879  <app-unlock-condition [unlockType]="UnlockType.Death">
T23:880  <span class="font-bold"
T23:881  >Soldiers shoot Connor twice before arming
T23:882  explosive</span
T23:883  >
T23:884  </app-unlock-condition>
T23:885  </p>
T23:886  </div>
T24:1193  <div class="condition"><p>Soldiers shoot Markus twice</p></div>
T24:1566  <div class="condition">
T24:1567  <p>
T24:1568  <app-unlock-condition
T24:1569  [unlockType]="
T24:1570  UnlockType.Death
T24:1571  "
T24:1572  >
T24:1573  <span class="font-bold"
T24:1574  >Markus shot twice</span
T24:1575  >
T24:1576  </app-unlock-condition>
T24:1577  </p>
T24:1578  </div>
T24:1896  "X0205A.MARKUS.NORTHSHOT.FA.X02AMARLA.SAVEFAILURENORTHV2"
T24:1903  "X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE"
T24:1923  "X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.TOOLATESIMON"
T24:1937  "X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.TOOLATEJOSH"
T24:1949  t('X0205A.MARKUS.NORTHSHOT.PC.SAVECHOICE.SAVENORTH')
T24:1954  <div class="condition">
T24:1955  <p>Markus is injured - cannot save North</p>
T24:1956  </div>
T24:1974  "X0205A.MARKUS.NORTHSHOT.PC.X02AMARKUS.WOUNDEDSAVE"
T24:1981  "X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.WOUNDEDSAVE"
T24:1988  "X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.WOUNDEDSAVE"
T24:1996  <div class="condition">
T24:1997  <p>Markus is not injured</p>
T24:1998  </div>
T24:2185  "X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE"
T24:2226  "X0205A.MARKUS.NORTHSHOT.FA.X02AMARLA.SAVEFAILURENORTHV2"
T24:2249  "X0205A.MARKUS.NORTHSHOT.FA.X02AMARLA.SAVEFAILURENORTHV2"
T24:2260  "X0205A.MARKUS.NORTHSHOT.FA.X02APERKINS.INTERVENE"
T24:2278  t('X0205A.MARKUS.NORTHSHOT.PC.SAVECHOICE.RUN')
T24:2297  "X0205A.MARKUS.NORTHSHOT.PC.X02ASIMON.RUNSIMON"
T24:2304  "X0205A.MARKUS.NORTHSHOT.PC.X02AJOSH.RUNJOSH"
```

### ch30-04

**Observation to settle:** [what unlocks] After choosing DON'T KISS in Crossroads, was KISS NORTH still offered in Battle for Detroit?

**Condition needed:** DONT_KISS clears lover flag versus applies relationship decrease only.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** DON'T KISS has a LargeDown annotation, while later kisses require Lover. No boolean-clear assignment or threshold-driven lover recomputation is serialized. No change to northLover persistence.

**Cross-check:** FC30; PP30-1. Character subcharts show injuries, departures and rescues, not the initialization or update code of shared counters. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X0201A\.[A-Z0-9.]*?(?:KISS|LOVER)|X0203A\.[A-Z0-9.]*?(?:KISS|LOVER)|GUI\.GAUGE\.NORTH\.LOVER))|(?:X0203A\.BRIDGE\.ROMANCE\.[A-Z0-9.]*?(?:KISS|NOKISS)|GUI\.GAUGE\.NORTH\.LOVER)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
North has lover|North is lover|lover.*North
```

**All search hits (67 source locations):**

```text
E:793 / J:937  GUI.GAUGE.NORTH.LOVER
  J:937  "LOVER": "LOVER",
E:24187 / J:44573  X0203A.BRIDGE.ROMANCE.PC.X02AMARKUS.KISS
E:24188 / J:44575  X0203A.BRIDGE.ROMANCE.PC.X02AMARKUS.NOKISS.1
E:24189 / J:44576  X0203A.BRIDGE.ROMANCE.PC.X02AMARKUS.NOKISS.2
E:24196 / J:44586  X0203A.BRIDGE.ROMANCE.PC.X02AMARKUS.NOKISSB
E:24215 / J:44614  X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.KISS.1
E:24216 / J:44615  X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.KISS.2
E:24217 / J:44616  X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.KISS.3
E:24218 / J:44618  X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.NOKISS
E:24227 / J:44631  X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.NOKISSB
E:24242 / J:44654  X0203A.BRIDGE.ROMANCE.PC.KISSCHOICE.KISS
E:24243 / J:44655  X0203A.BRIDGE.ROMANCE.PC.KISSCHOICE.NOKISS
T24:695  <div class="condition">
T24:696  <p>North has lover relationship status</p>
T24:697  </div>
T24:712  'X0203A.BRIDGE.ROMANCE.PC.KISSCHOICE.KISS'
T24:720  "X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.KISS"
T24:724  </p>
T24:725  </app-choice-item>
T24:726  <app-choice-item
T24:727  [choiceLabel]="
T24:728  t(
T24:729  'X0203A.BRIDGE.ROMANCE.PC.KISSCHOICE.NOKISS'
T24:730  )
T24:731  "
T24:732  >
T24:733  <p>
T24:734  <app-relation
T24:735  [name]="RelationName.North"
T24:736  [type]="
T24:737  RelationType.LargeDown
T24:738  "
T24:739  ></app-relation>
T24:740  <app-dialogue-line
T24:741  name="Markus"
T24:742  >
T24:743  {{
T24:744  translationService.translateObject(
T24:745  "X0203A.BRIDGE.ROMANCE.PC.X02AMARKUS.NOKISS"
T24:752  "X0203A.BRIDGE.ROMANCE.PC.X02AMARLA.NOKISSB"
T25:1028  <div class="condition">
T25:1029  <p>North has lover relationship status</p>
T25:1030  </div>
T31:1449  <div class="condition">
T31:1450  <p>North has lover relationship status</p>
T31:1451  </div>
T31:1665  <h2 id="north-saves">
T31:1666  Fail the QTE and have lover status with North - North saves
T31:1667  Markus
T31:1668  </h2>
T31:1710  <app-unlock-condition [unlockType]="UnlockType.Lock">
T31:1711  North has lover status
T31:1712  </app-unlock-condition>
T32:445  <div class="condition">
T32:446  <p>North is lover</p>
T32:447  </div>
T32:479  <div class="condition">
T32:480  <p>North is lover</p>
T32:481  </div>
T32:535  <div class="condition">
T32:536  <p>North is lover</p>
T32:537  </div>
T32:953  <app-unlock-condition
T32:954  [unlockType]="UnlockType.Lock"
T32:955  >
T32:956  Lover with North
T32:957  </app-unlock-condition>
```

### ch30-05

**Observation to settle:** [what unlocks] With Alice at Neutral (above Distant but below Warm), did choosing DISTANT in Crossroads make Alice walk away when the raid began?

**Condition needed:** Alice departure uses current band below Warm versus historical maximum below Neutral.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The template's below-WARM condition is nested in an Alice-is-DISTANT/look-for-Alice block, making it unsafe to read as a freestanding replacement formula. Internal choice/node names do not contain a historical-maximum register. Neither current-only nor historical gate is decoded. No change to aliceMax.

**Cross-check:** FC30; PP30-1. Character subcharts show injuries, departures and rescues, not the initialization or update code of shared counters. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.02A\.K\.[A-Z0-9.]*?(?:ALICE|DISTANT)|X0201A\.[A-Z0-9.]*?(?:DISTANT|REJECT)|GUI\.GAUGE\.ALICE\.(?:NEUTRAL|WARM|DISTANT))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Alice.*DISTANT|Alice relation is below WARM
```

**All search hits (33 source locations):**

```text
E:772 / J:910  GUI.GAUGE.ALICE.DISTANT
  J:910  "DISTANT": "DISTANT",
E:773 / J:911  GUI.GAUGE.ALICE.WARM
  J:911  "WARM": "WARM",
E:776 / J:914  GUI.GAUGE.ALICE.NEUTRAL
  J:914  "NEUTRAL": "NEUTRAL",
E:10296 / J:16319  MENU.FLOWCHART.02A.K.SPOTFORALICE
  J:16319  "SPOTFORALICE": "FIND A WARM PLACE FOR ALICE",
E:10302 / J:16325  MENU.FLOWCHART.02A.K.BACKTOALICE
  J:16325  "BACKTOALICE": "GO BACK TO ALICE",
E:10304 / J:16327  MENU.FLOWCHART.02A.K.JOINALICE
  J:16327  "JOINALICE": "JOIN ALICE",
E:10305 / J:16328  MENU.FLOWCHART.02A.K.STAYDISTANT
  J:16328  "STAYDISTANT": "STAY DISTANT",
E:10322 / J:16345  MENU.FLOWCHART.02A.K.KARAALICESHOT
  J:16345  "KARAALICESHOT": "SHOT BY SOLDIERS",
E:10323 / J:16346  MENU.FLOWCHART.02A.K.KARAALICEDIED
  J:16346  "KARAALICEDIED": "KARA & ALICE DIED",
E:10376 / J:16399  MENU.FLOWCHART.02A.K.CLOSERALICE
  J:16399  "CLOSERALICE": "GET CLOSER TO ALICE",
E:10383 / J:16406  MENU.FLOWCHART.02A.K.SACRIFICEALICE
  J:16406  "SACRIFICEALICE": "ALICE SACRIFICES HERSELF",
E:10384 / J:16407  MENU.FLOWCHART.02A.K.ALICESHOT
  J:16407  "ALICESHOT": "ALICE IS SHOT",
E:10404 / J:16431  MENU.FLOWCHART.02A.K.ALICELEAVESALONE
  J:16431  "ALICELEAVESALONE": "ALICE LEAVES ALONE",
E:10405 / J:16432  MENU.FLOWCHART.02A.K.ALICELEAVESLUTHER
  J:16432  "ALICELEAVESLUTHER": "ALICE LEAVES WITH LUTHER",
E:10407 / J:16434  MENU.FLOWCHART.02A.K.ALICECHOICERUN
  J:16434  "ALICECHOICERUN": "RUN AWAY",
E:10408 / J:16435  MENU.FLOWCHART.02A.K.ALICECHOICEFIND
  J:16435  "ALICECHOICEFIND": "FIND ALICE",
E:10409 / J:16436  MENU.FLOWCHART.02A.K.ALICECHOICEEND
  J:16436  "ALICECHOICEEND": "KARA LEFT JERICHO ALONE",
T22:779  <app-condition-group>
T22:780  <app-conditioned-content>
T22:781  <div class="condition">
T22:782  <p>Alice is DISTANT, but Kara chose LOOK FOR ALICE</p>
T22:783  </div>
T22:784  <div class="content">
T22:785  <p>
T22:786  <app-unlock-condition
T22:787  [unlockType]="UnlockType.Lock"
T22:788  >
T22:789  Alice relation is below WARM and choose DISTANT
T22:790  </app-unlock-condition>
T22:791  <app-relation
T22:792  [name]="RelationName.Alice"
T22:793  [type]="RelationType.LargeUp"
T22:794  ></app-relation>
```

### ch30-06

**Observation to settle:** [what unlocks] If Kara chose PROTECT ALICE and left Luther in the corridor, did Luther reappear in Battle for Detroit (FIND LUTHER & JERRY)?

**Condition needed:** protectAlice abandons wounded Luther alive or marks him dead for later rescue.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Abandonment and later find-Luther nodes coexist, but a living/not-already-with-Kara consumer does not establish the corridor producer's survival bit. No change to luther=false on PROTECT ALICE.

**Cross-check:** FC30; PP30-1. Character subcharts show injuries, departures and rescues, not the initialization or update code of shared counters. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.02A\.K\.[A-Z0-9.]*?(?:LUTHER|PROTECT)|MENU\.FLOWCHART\.04A\.[A-Z0-9.]*?(?:LUTHER|JERRY)|X0205A\.[A-Z0-9.]*?(?:ABANDON|PROTECTALICE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Get Luther to safety|Fail to get to safety|Luther is alive|Luther is dead
```

**All search hits (157 source locations):**

```text
E:10307 / J:16330  MENU.FLOWCHART.02A.K.SAFELUTHER
  J:16330  "SAFELUTHER": "KARA, ALICE & LUTHER SAFE AT JERICHO",
E:10312 / J:16335  MENU.FLOWCHART.02A.K.ESCAPEDLUTHER
  J:16335  "ESCAPEDLUTHER": "KARA, ALICE & LUTHER LEFT JERICHO",
E:10315 / J:16338  MENU.FLOWCHART.02A.K.FOLLOWLUTHER
  J:16338  "FOLLOWLUTHER": "ESCAPE WITH LUTHER",
E:10317 / J:16340  MENU.FLOWCHART.02A.K.LUTHERDOOR
  J:16340  "LUTHERDOOR": "LUTHER OPENS THE DOOR",
E:10319 / J:16342  MENU.FLOWCHART.02A.K.LUTHERSHOT
  J:16342  "LUTHERSHOT": "LUTHER IS SHOT",
E:10329 / J:16352  MENU.FLOWCHART.02A.K.RUNLUTHER
  J:16352  "RUNLUTHER": "RUN TO LUTHER",
E:10330 / J:16353  MENU.FLOWCHART.02A.K.LEAVELUTHER
  J:16353  "LEAVELUTHER": "LEAVE LUTHER",
E:10331 / J:16354  MENU.FLOWCHART.02A.K.LIFTLUTHER
  J:16354  "LIFTLUTHER": "HELP LUTHER",
E:10332 / J:16355  MENU.FLOWCHART.02A.K.LUTHERSAFE
  J:16355  "LUTHERSAFE": "GET LUTHER TO SAFETY",
E:10333 / J:16356  MENU.FLOWCHART.02A.K.FAILLUTHERSAFE
  J:16356  "FAILLUTHERSAFE": "FAIL",
E:10337 / J:16360  MENU.FLOWCHART.02A.K.LUTHERHIDDEN
  J:16360  "LUTHERHIDDEN": "LEAVE LUTHER HIDDEN",
E:10378 / J:16401  MENU.FLOWCHART.02A.K.LUTHERDIED
  J:16401  "LUTHERDIED": "LUTHER DIED",
E:10379 / J:16402  MENU.FLOWCHART.02A.K.LUTHERDIED2
  J:16402  "LUTHERDIED2": "LUTHER DIED",
E:10387 / J:16410  MENU.FLOWCHART.02A.K.LUTHERDIED3
  J:16410  "LUTHERDIED3": "LUTHER DIED",
E:10394 / J:16418  MENU.FLOWCHART.02A.K.ENDDIED.NOLUTHER
  J:16418  "NOLUTHER": "KARA & ALICE DIED IN THE ASSAULT"
E:10397 / J:16423  MENU.FLOWCHART.02A.K.ENDALLDIED2.NOLUTHER
  J:16423  "NOLUTHER": "KARA & ALICE DIED"
E:10405 / J:16432  MENU.FLOWCHART.02A.K.ALICELEAVESLUTHER
  J:16432  "ALICELEAVESLUTHER": "ALICE LEAVES WITH LUTHER",
E:10411 / J:16439  MENU.FLOWCHART.02A.K.GC.LUTHERDEAD
  J:16439  "LUTHERDEAD": "LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'"
E:10412 / J:16441  MENU.FLOWCHART.02A.K.INCARLUTHER
  J:16441  "INCARLUTHER": "DRIVING TO JERICHO WITH ALICE & LUTHER"
E:10627 / J:16668  MENU.FLOWCHART.04A.KA.LUTHERGUN
  J:16668  "LUTHERGUN": "LUTHER FINDS A GUN",
E:10631 / J:16672  MENU.FLOWCHART.04A.KA.FINDJERRY
  J:16672  "FINDJERRY": "FIND JERRYS",
E:10632 / J:16673  MENU.FLOWCHART.04A.KA.FINDLUTHERANDJERRY
  J:16673  "FINDLUTHERANDJERRY": "FIND LUTHER & JERRY",
E:10633 / J:16674  MENU.FLOWCHART.04A.KA.SAVEJERRY
  J:16674  "SAVEJERRY": "SAVE JERRYS",
E:10634 / J:16675  MENU.FLOWCHART.04A.KA.SAVELUTHER
  J:16675  "SAVELUTHER": "SAVE LUTHER",
E:10635 / J:16676  MENU.FLOWCHART.04A.KA.DONTSAVEJERRYLUTHER
  J:16676  "DONTSAVEJERRYLUTHER": "HURRY",
E:10638 / J:16679  MENU.FLOWCHART.04A.KA.JERRYRUNAWAY
  J:16679  "JERRYRUNAWAY": "JERRYS FLEE",
E:10639 / J:16680  MENU.FLOWCHART.04A.KA.LUTHERJOINGROUP
  J:16680  "LUTHERJOINGROUP": "JERRY FLEES AND LUTHER JOINS THE GROUP",
E:10652 / J:16693  MENU.FLOWCHART.04A.KA.CHECKPOINTLUTHERNERVOUS
  J:16693  "CHECKPOINTLUTHERNERVOUS": "LUTHER IS NERVOUS",
E:10653 / J:16694  MENU.FLOWCHART.04A.KA.CHECKPOINTASKLUTHERSHOOT01
  J:16694  "CHECKPOINTASKLUTHERSHOOT01": "ASK LUTHER TO SHOOT",
E:10654 / J:16695  MENU.FLOWCHART.04A.KA.CHECKPOINTASKLUTHERDONTSHOOT01
  J:16695  "CHECKPOINTASKLUTHERDONTSHOOT01": "ASK LUTHER TO STAY CALM",
E:10656 / J:16697  MENU.FLOWCHART.04A.KA.CHECKPOINTASKLUTHERSHOOT02
  J:16697  "CHECKPOINTASKLUTHERSHOOT02": "ASK LUTHER TO SHOOT",
E:10657 / J:16698  MENU.FLOWCHART.04A.KA.CHECKPOINTASKLUTHERDONTSHOOT02
  J:16698  "CHECKPOINTASKLUTHERDONTSHOOT02": "ASK LUTHER TO STAY CALM",
E:10658 / J:16699  MENU.FLOWCHART.04A.KA.CHECKPOINTLUTHERSHOOTS
  J:16699  "CHECKPOINTLUTHERSHOOTS": "LUTHER SHOOTS GUARDS",
E:10672 / J:16713  MENU.FLOWCHART.04A.KA.CONTROLTALKLUTHER
  J:16713  "CONTROLTALKLUTHER": "TALK TO LUTHER",
E:10674 / J:16715  MENU.FLOWCHART.04A.KA.CONTROLTALKJERRY
  J:16715  "CONTROLTALKJERRY": "TALK TO JERRY",
E:10685 / J:16726  MENU.FLOWCHART.04A.KA.SACRIFICEJERRY
  J:16726  "SACRIFICEJERRY": "SACRIFICE JERRY",
E:10686 / J:16727  MENU.FLOWCHART.04A.KA.SACRIFICELUTHER
  J:16727  "SACRIFICELUTHER": "SACRIFICE LUTHER",
E:10690 / J:16731  MENU.FLOWCHART.04A.KA.SACRIFICEJERRYKILLED
  J:16731  "SACRIFICEJERRYKILLED": "JERRY SACRIFICES HIMSELF TO CREATE DIVERSION",
E:10691 / J:16732  MENU.FLOWCHART.04A.KA.SACRIFICELUTHERKILLED
  J:16732  "SACRIFICELUTHERKILLED": "LUTHER SACRIFICES HIMSELF TO CREATE DIVERSION",
E:10692 / J:16733  MENU.FLOWCHART.04A.KA.SACRIFICEKARAALICEWITHLUTHER
  J:16733  "SACRIFICEKARAALICEWITHLUTHER": "LUTHER GETS THROUGH WITH ALICE",
E:10696 / J:16737  MENU.FLOWCHART.04A.KA.SCENEENDJERRYDEAD
  J:16737  "SCENEENDJERRYDEAD": "THE GROUP CROSSED THE BORDER",
E:10697 / J:16738  MENU.FLOWCHART.04A.KA.SCENEENDLUTHERDEAD
  J:16738  "SCENEENDLUTHERDEAD": "KARA & ALICE CROSSED THE BORDER",
E:10699 / J:16740  MENU.FLOWCHART.04A.KA.SCENEENDALICEWITHLUTHER
  J:16740  "SCENEENDALICEWITHLUTHER": "ALICE GOT TO CANADA WITH LUTHER",
E:10712 / J:16753  MENU.FLOWCHART.04A.KA.RIVERHIDEBEHINDLUTHER
  J:16753  "RIVERHIDEBEHINDLUTHER": "HIDE BEHIND LUTHER",
E:10719 / J:16760  MENU.FLOWCHART.04A.KA.SINKINGDUMPLUTHER
  J:16760  "SINKINGDUMPLUTHER": "CAST LUTHER AWAY",
E:10756 / J:16797  MENU.FLOWCHART.04A.KA.BUSTERMINALSOLDIERSCONTROLWITHLUTHER
  J:16797  "BUSTERMINALSOLDIERSCONTROLWITHLUTHER": "SECURITY CHECK",
E:10757 / J:16798  MENU.FLOWCHART.04A.KA.BUSTERMINALLUTHERDIVERSION
  J:16798  "BUSTERMINALLUTHERDIVERSION": "LUTHER CREATES A DIVERSION",
E:10762 / J:16804  MENU.FLOWCHART.04A.KA.GC.LUTHERDEAD
  J:16804  "LUTHERDEAD": "LUTHER DIED",
E:10766 / J:16808  MENU.FLOWCHART.04A.KA.GC.LUTHERALIVE
  J:16808  "LUTHERALIVE": "LUTHER SAVED IN 'CROSSROADS'"
E:10769 / J:16812  MENU.FLOWCHART.04A.KA.ARRESTEDWITHLUTHER
  J:16812  "ARRESTEDWITHLUTHER": "KARA, ALICE & LUTHER ARRESTED",
E:10775 / J:16818  MENU.FLOWCHART.04A.KA.LUTHERSHOT
  J:16818  "LUTHERSHOT": "LUTHER DIED",
E:10776 / J:16819  MENU.FLOWCHART.04A.KA.LUTHERDEAD
  J:16819  "LUTHERDEAD": "LUTHER DIED",
E:10778 / J:16821  MENU.FLOWCHART.04A.KA.BUSTERMINALEXECUTEDLUTHER
  J:16821  "BUSTERMINALEXECUTEDLUTHER": "SOLDIERS EXECUTED KARA, ALICE & LUTHER",
E:10896 / J:16945  MENU.FLOWCHART.04A.KB.ENCLOSTALKJERRY
  J:16945  "ENCLOSTALKJERRY": "TALK TO JERRY",
E:10902 / J:16951  MENU.FLOWCHART.04A.KB.ENCLOSTALKOTHERJERRY
  J:16951  "ENCLOSTALKOTHERJERRY": "TALK TO OTHER JERRY",
E:10913 / J:16962  MENU.FLOWCHART.04A.KB.ENCLOSTALKLUTHER
  J:16962  "ENCLOSTALKLUTHER": "TALK TO LUTHER",
E:10914 / J:16963  MENU.FLOWCHART.04A.KB.ENCLOSLUTHERTAKEN
  J:16963  "ENCLOSLUTHERTAKEN": "LUTHER GETS TAKEN AWAY",
E:10915 / J:16964  MENU.FLOWCHART.04A.KB.ENCLOSLUTHERINTERVENE
  J:16964  "ENCLOSLUTHERINTERVENE": "INTERVENE",
E:10916 / J:16965  MENU.FLOWCHART.04A.KB.ENCLOSLUTHERDONTINTERVENE
  J:16965  "ENCLOSLUTHERDONTINTERVENE": "DO NOT INTERVENE",
E:10939 / J:16988  MENU.FLOWCHART.04A.KB.REACHTALKLUTHER
  J:16988  "REACHTALKLUTHER": "TALK TO LUTHER",
E:10941 / J:16990  MENU.FLOWCHART.04A.KB.REACHLUTHERREACHMACHINE
  J:16990  "REACHLUTHERREACHMACHINE": "LUTHER REACHES THE RECYCLING MACHINE",
E:10945 / J:16994  MENU.FLOWCHART.04A.KB.REACHJERRYDIES
  J:16994  "REACHJERRYDIES": "JERRY DIES",
E:10955 / J:17004  MENU.FLOWCHART.04A.KB.REACHTALKJERRY
  J:17004  "REACHTALKJERRY": "TALK TO JERRY",
E:10957 / J:17006  MENU.FLOWCHART.04A.KB.REACHASKDIVERSIONJERRY
  J:17006  "REACHASKDIVERSIONJERRY": "ASK JERRY TO CREATE DIVERSION",
E:10969 / J:17018  MENU.FLOWCHART.04A.KB.ESCAPELUTHERREACHMACHINE
  J:17018  "ESCAPELUTHERREACHMACHINE": "LUTHER REACHES THE RECYCLING MACHINE",
E:10970 / J:17019  MENU.FLOWCHART.04A.KB.ESCAPETALKJERRY
  J:17019  "ESCAPETALKJERRY": "TALK TO JERRY",
E:10972 / J:17021  MENU.FLOWCHART.04A.KB.ESCAPETALKLUTHER
  J:17021  "ESCAPETALKLUTHER": "TALK TO LUTHER",
E:10973 / J:17022  MENU.FLOWCHART.04A.KB.ESCAPEASKDIVERSIONJERRY
  J:17022  "ESCAPEASKDIVERSIONJERRY": "ASK JERRY TO CREATE DIVERSION",
E:10975 / J:17024  MENU.FLOWCHART.04A.KB.ESCAPEASKDIVERSIONLUTHER
  J:17024  "ESCAPEASKDIVERSIONLUTHER": "ASK LUTHER TO CREATE DIVERSION",
E:10981 / J:17030  MENU.FLOWCHART.04A.KB.SCENEENDSOLDIERSHOOT01WITHLUTHER
  J:17030  "SCENEENDSOLDIERSHOOT01WITHLUTHER": "KARA, LUTHER AND ALICE WERE KILLED",
E:10983 / J:17032  MENU.FLOWCHART.04A.KB.ALICELUTHERPASSBARBED
  J:17032  "ALICELUTHERPASSBARBED": "ALICE & LUTHER GET PAST THE BARBED WIRE",
E:10988 / J:17037  MENU.FLOWCHART.04A.KB.SCENEENDALICELUTHERESCAPE
  J:17037  "SCENEENDALICELUTHERESCAPE": "ALICE & LUTHER ESCAPED BY TRUCKS",
E:10994 / J:17043  MENU.FLOWCHART.04A.KB.SCENEENDSOLDIERSHOOT02WITHLUTHER
  J:17043  "SCENEENDSOLDIERSHOOT02WITHLUTHER": "KARA, LUTHER AND ALICE WERE KILLED",
E:10998 / J:17047  MENU.FLOWCHART.04A.KB.LUTHERINTERVENES
  J:17047  "LUTHERINTERVENES": "LUTHER INTERVENES",
E:11000 / J:17049  MENU.FLOWCHART.04A.KB.SCENEENDESCAPEDTRUCKSWITHLUTHER
  J:17049  "SCENEENDESCAPEDTRUCKSWITHLUTHER": "KARA, LUTHER AND ALICE ESCAPED ON TRUCK",
E:11005 / J:17055  MENU.FLOWCHART.04A.KB.GC.LUTHER
  J:17055  "LUTHER": "SAVED IN PREVIOUS SCENES"
T16:57  <div class="condition">
T16:58  <p>Luther is alive</p>
T16:59  </div>
T16:419 [CUT]  <div class="condition">
T16:420 [CUT]  <p>Luther is alive</p>
T16:421 [CUT]  </div>
T16:565  <div class="condition">
T16:566  <p>Luther is alive</p>
T16:567  </div>
T22:69  <div class="condition"><p>Luther is alive</p></div>
T22:103  <div class="condition"><p>Luther is alive</p></div>
T22:132  <div class="condition"><p>Luther is alive</p></div>
T22:216  <div class="condition"><p>Luther is alive</p></div>
T22:230  <div class="condition"><p>Luther is dead</p></div>
T22:376  <div class="condition"><p>Luther is alive</p></div>
T22:390  <div class="condition"><p>Luther is dead</p></div>
T22:607  <div class="condition"><p>Luther is alive</p></div>
T22:621  <div class="condition">
T22:622  <p>
T22:623  <app-unlock-condition
T22:624  [unlockType]="UnlockType.Death"
T22:625  >
T22:626  <span class="font-bold">Luther is dead</span>
T22:627  </app-unlock-condition>
T22:628  </p>
T22:629  </div>
T22:701  <div class="condition"><p>Luther is alive</p></div>
T22:740  <div class="condition"><p>Luther is alive</p></div>
T22:874  <div class="condition"><p>Luther is alive</p></div>
T22:918  <div class="condition">
T22:919  <p>
T22:920  <app-unlock-condition [unlockType]="UnlockType.Death">
T22:921  <span class="font-bold">Luther is dead</span>
T22:922  </app-unlock-condition>
T22:923  </p>
T22:924  </div>
T22:976  <div class="condition"><p>Luther is alive</p></div>
T22:1033  <div class="condition">
T22:1034  <p>Get Luther to safety</p>
T22:1035  </div>
T22:1089  <div class="condition">
T22:1090  <p>Fail to get to safety</p>
T22:1091  </div>
T22:1200  <div class="condition">
T22:1201  <p>
T22:1202  <app-unlock-condition
T22:1203  [unlockType]="UnlockType.Death"
T22:1204  [bracketsOnlyAroundIcon]="true"
T22:1205  >
T22:1206  <span class="font-bold">Luther is dead</span>
T22:1207  </app-unlock-condition>
T22:1208  </p>
T22:1209  </div>
T22:1545  <div class="condition">
T22:1546  <p>
T22:1547  Luther is alive - Luther sacrifices
T22:1548  himself
T22:1549  </p>
T22:1550  </div>
T22:1571  <div class="condition">
T22:1572  <p>Luther is dead</p>
T22:1573  </div>
T22:1599  <div class="condition">
T22:1600  <p>
T22:1601  Luther is dead and Kara played dead
T22:1602  before attacking
T22:1603  </p>
T22:1604  </div>
T22:1835  <div class="condition">
T22:1836  <p>
T22:1837  Luther is alive - Luther sacrifices
T22:1838  himself
T22:1839  </p>
T22:1840  </div>
T22:1861  <div class="condition">
T22:1862  <p>Luther is dead</p>
T22:1863  </div>
T27:571  <div class="condition">
T27:572  <p>Luther is alive - Save Luther and Jerry</p>
T27:573  </div>
T27:2202  <div class="condition"><p>Luther is dead</p></div>
```

### ch31-01

**Observation to settle:** [which ending] If a machine Connor survived Crossroads by shooting Markus, did Night of the Soul show Connor with Amanda in the snowy Zen Garden (THIN ICE)?

**Condition needed:** ThinIce includes surviving machine killer of Markus versus replacement Connor only.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The template expressly includes machine Connor surviving after killing Markus, but reuses Battle-for-Detroit string namespaces. Namespace placement is not chapter chronology. No change without the unedited chapter boundary.

**Cross-check:** FC31; PP31-1. Character outcomes and optional talks are charted; absent-character scene scheduling is not encoded by the localized node labels. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X1301C\.[A-Z0-9.]*?(?:AMANDA|INTRO)|MENU\.FLOWCHART\.03A\.[A-Z0-9.]*?(?:THIN|CONNOR)|X0301A\.[A-Z0-9.]*?(?:AMANDA|MACHINE)))|(?:X1204C\.AMANDA\.LASTTALK\.|X1303C\.ZENGARDEN\.BRIDGE\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Connor stayed a machine|Connor died in Crossroads
```

**All search hits (107 source locations):**

```text
E:9615 / J:15575  MENU.FLOWCHART.03A.MARKUS.CHURCH.CONNOR
  J:15575  "CONNOR": "TALK TO CONNOR",
E:9616 / J:15576  MENU.FLOWCHART.03A.MARKUS.CHURCH.CONNORDECIDE
  J:15576  "CONNORDECIDE": "DECIDE IF CONNOR IS TRUSTWORTHY",
E:9617 / J:15577  MENU.FLOWCHART.03A.MARKUS.CHURCH.CONNORKILL
  J:15577  "CONNORKILL": "KILL CONNOR",
E:9618 / J:15578  MENU.FLOWCHART.03A.MARKUS.CHURCH.CONNORSPARE
  J:15578  "CONNORSPARE": "SPARE CONNOR",
E:9622 / J:15582  MENU.FLOWCHART.03A.MARKUS.CHURCH.CONNORKILLCYBERLIFE
  J:15582  "CONNORKILLCYBERLIFE": "A NEW CONNOR WILL BE SENT"
E:9625 / J:15591  MENU.FLOWCHART.03A.CONNOR.CHURCH.START
  J:15591  "START": "CONNOR ON SACRED GROUND",
E:9626 / J:15592  MENU.FLOWCHART.03A.CONNOR.CHURCH.REGROUP
  J:15592  "REGROUP": "DEVIANTS REGROUP",
E:9627 / J:15593  MENU.FLOWCHART.03A.CONNOR.CHURCH.NORTH
  J:15593  "NORTH": "TALK TO NORTH",
E:9628 / J:15594  MENU.FLOWCHART.03A.CONNOR.CHURCH.KARA
  J:15594  "KARA": "TALK TO KARA",
E:9629 / J:15595  MENU.FLOWCHART.03A.CONNOR.CHURCH.JOSH
  J:15595  "JOSH": "CHECK ON JOSH",
E:9630 / J:15596  MENU.FLOWCHART.03A.CONNOR.CHURCH.SIMON
  J:15596  "SIMON": "CHECK ON SIMON",
E:9631 / J:15597  MENU.FLOWCHART.03A.CONNOR.CHURCH.SPEECH
  J:15597  "SPEECH": "NORTH CALLS TO ARMS",
E:9632 / J:15598  MENU.FLOWCHART.03A.CONNOR.CHURCH.EXPLORE
  J:15598  "EXPLORE": "EXPLORE THE CHURCH"
E:9638 / J:15607  MENU.FLOWCHART.03A.GC.CONNORCHURCH
  J:15607  "CONNORCHURCH": "CONNOR JOINED THE REVOLUTION IN 'CROSSROADS'"
E:24550 / J:45285  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR01.1
E:24551 / J:45286  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR01.2
E:24552 / J:45287  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR01.3
E:24553 / J:45289  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR02
E:24554 / J:45291  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR03.1
E:24555 / J:45292  X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR03.2
E:24556 / J:45296  X1204C.AMANDA.LASTTALK.PC.X12CCONNOR.BADCONNOR01
E:24557 / J:45297  X1204C.AMANDA.LASTTALK.PC.X12CCONNOR.BADCONNOR02
E:24558 / J:45298  X1204C.AMANDA.LASTTALK.PC.X12CCONNOR.BADCONNOR03
E:24777 / J:45695  X1301C.ELEVATOR.AMANDA.PC.X13CCONNOR.DEVIANT
E:24778 / J:45699  X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT.1
E:24779 / J:45700  X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT.2
E:24780 / J:45701  X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT.3
E:24781 / J:45702  X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT.4
E:24782 / J:45703  X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT.5
E:25039 / J:46203  X1303C.ZENGARDEN.BRIDGE.PC.X13CCONNOR.PEACEFUL
E:25040 / J:46204  X1303C.ZENGARDEN.BRIDGE.PC.X13CCONNOR.REVOLUTION
E:25041 / J:46205  X1303C.ZENGARDEN.BRIDGE.PC.X13CCONNOR.MISSION01
E:25042 / J:46206  X1303C.ZENGARDEN.BRIDGE.PC.X13CCONNOR.MISSION02
E:25043 / J:46210  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.PEACEFUL.1
E:25044 / J:46211  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.PEACEFUL.2
E:25045 / J:46214  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.REVOLUTION.1
E:25046 / J:46215  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.REVOLUTION.2
E:25047 / J:46218  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.MISSION01.1
E:25048 / J:46219  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.MISSION01.2
E:25049 / J:46220  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.MISSION01.3
E:25050 / J:46222  X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.MISSION02
T24:2140  <div class="condition">
T24:2141  <p>
T24:2142  Fail to run to
T24:2143  exit (Connor
T24:2144  stayed a
T24:2145  machine) -
T24:2146  Markus dies
T24:2147  </p>
T24:2148  </div>
T24:2234  <div class="condition">
T24:2235  <p>
T24:2236  Connor stayed a
T24:2237  machine - Markus
T24:2238  dies, North
T24:2239  escapes
T24:2240  </p>
T24:2241  </div>
T26:12  <app-unlock-condition [unlockType]="UnlockType.Lock">
T26:13  Connor stayed a machine or died in
T26:14  <a [routerLink]="['/chapters', 31]">Crossroads</a>
T26:15  </app-unlock-condition>
T26:20  <div class="condition">
T26:21  <p>
T26:22  <app-unlock-condition
T26:23  [unlockType]="UnlockType.Death"
T26:24  [bracketsOnlyAroundIcon]="true"
T26:25  >
T26:26  <span class="font-bold">
T26:27  Connor died in
T26:28  <a [routerLink]="['/chapters', 31]"
T26:29  >Crossroads</a
T26:30  >
T26:31  </span>
T26:32  </app-unlock-condition>
T26:33  </p>
T26:34  </div>
T26:40  "X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR01"
T26:47  "X1204C.AMANDA.LASTTALK.PC.X12CCONNOR.BADCONNOR02"
T26:54  "X1204C.AMANDA.LASTTALK.PC.X12CAMANDA.BADCONNOR03"
T26:61  <app-conditioned-content>
T26:62  <div class="condition">
T26:63  <p>
T26:64  Connor stayed a machine and didn't die in
T26:65  <a [routerLink]="['/chapters', 31]">Crossroads</a>
T26:66  (killed Markus), North is leading a violent revolution
T26:67  </p>
T26:68  </div>
T26:69  <div class="content">
T26:70  <p>
T26:71  <app-dialogue-line name="Amanda">
T26:72  {{
T26:73  translationService.translateObject(
T26:74  "X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.REVOLUTION"
T26:75  ) | async
T26:76  }}
T26:77  {{
T26:78  translationService.translateObject(
T26:79  "X1303C.ZENGARDEN.BRIDGE.PC.X13CAMANDA.MISSION01"
T26:80  ) | async
T26:81  }}
T26:82  </app-dialogue-line>
T26:83  </p>
T26:84  </div>
T26:85  </app-conditioned-content>
T30:103  "X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT"
T30:222  "X1301C.ELEVATOR.AMANDA.PC.X13CAMANDA.DEVIANT"
```

### ch31-03

**Observation to settle:** [what unlocks] If Hank resigned in Last Chance, Connor and Connor was then decommissioned there, did Hank still end up dead (HANK COMMITTED SUICIDE on Night of the Soul's chart or Hank absent later)?

**Condition needed:** HankSuicide runs independently after resignation even if Connor decommissioned.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** Hostile-and-resigned is the template's local scene lock, but it does not say whether the whole Connor segment runs when his series was decommissioned. No cross-character world-event scheduler is present. No change to Hank death handling.

**Cross-check:** FC31; PP31-1. Character outcomes and optional talks are charted; absent-character scene scheduling is not encoded by the localized node labels. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.03A\.[A-Z0-9.]*?(?:HANK|SUICIDE)|X0301A\.[A-Z0-9.]*?(?:HANK|SUICIDE)))|(?:MENU\.FLOWCHART\.03A\.GC\.HANK|MENU\.FLOWCHART\.04A\.(?:CA|CB)\.GC\.HANKSUICIDE|MENU\.FLOWCHART\.03A\.HANK\.|X1204C\.HOUSE\.HANK\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Hank was hostile.*resigned
```

**All search hits (93 source locations):**

```text
E:9571 / J:15514  MENU.FLOWCHART.03A.GRAVE.SUICIDE
  J:15514  "SUICIDE": "HANK COMMITTED SUICIDE"
E:9591 / J:15540  MENU.FLOWCHART.03A.HANK.START
  J:15540  "START": "HANK'S HOUSE",
E:9592 / J:15541  MENU.FLOWCHART.03A.HANK.ENTER
  J:15541  "ENTER": "ENTER HOUSE",
E:9593 / J:15542  MENU.FLOWCHART.03A.HANK.DISCUSS
  J:15542  "DISCUSS": "TALK TO HANK",
E:9594 / J:15543  MENU.FLOWCHART.03A.HANK.SON
  J:15543  "SON": "HANK CONFIDES ABOUT HIS SON",
E:9595 / J:15544  MENU.FLOWCHART.03A.HANK.ANDROID
  J:15544  "ANDROID": "HANK RAILS AGAINST ANDROIDS",
E:9596 / J:15545  MENU.FLOWCHART.03A.HANK.LEAVE
  J:15545  "LEAVE": "LEAVE"
E:9637 / J:15606  MENU.FLOWCHART.03A.GC.HANK
  J:15606  "HANK": "HANK QUIT THE FORCE",
E:10621 / J:16659  MENU.FLOWCHART.04A.CB.GC.HANKSUICIDE
  J:16659  "HANKSUICIDE": "HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'"
E:11049 / J:17103  MENU.FLOWCHART.04A.CA.GC.HANKSUICIDE
  J:17103  "HANKSUICIDE": "HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'"
E:24559 / J:45308  X1204C.HOUSE.HANK.PC.X12CCONNOR.WORRIEDHANK.1
E:24560 / J:45309  X1204C.HOUSE.HANK.PC.X12CCONNOR.WORRIEDHANK.2
E:24561 / J:45312  X1204C.HOUSE.HANK.PC.X12CCONNOR.APOLOGIZE.1
E:24562 / J:45313  X1204C.HOUSE.HANK.PC.X12CCONNOR.APOLOGIZE.2
E:24563 / J:45315  X1204C.HOUSE.HANK.PC.X12CCONNOR.GOODBYE
E:24564 / J:45317  X1204C.HOUSE.HANK.PC.X12CCONNOR.ALCOHOL.1
E:24565 / J:45318  X1204C.HOUSE.HANK.PC.X12CCONNOR.ALCOHOL.2
E:24566 / J:45321  X1204C.HOUSE.HANK.PC.X12CCONNOR.GUN.1
E:24567 / J:45322  X1204C.HOUSE.HANK.PC.X12CCONNOR.GUN.2
E:24568 / J:45325  X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO.1
E:24569 / J:45326  X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO.2
E:24570 / J:45327  X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO.3
E:24571 / J:45328  X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO.4
E:24572 / J:45329  X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO.5
E:24573 / J:45331  X1204C.HOUSE.HANK.PC.X12CCONNOR.SEVERALDEATHS
E:24574 / J:45332  X1204C.HOUSE.HANK.PC.X12CCONNOR.NOHOPE
E:24575 / J:45333  X1204C.HOUSE.HANK.PC.X12CCONNOR.DONTINSIST
E:24576 / J:45334  X1204C.HOUSE.HANK.PC.X12CCONNOR.CONVINCE
E:24577 / J:45335  X1204C.HOUSE.HANK.PC.X12CCONNOR.LEAVEME
E:24578 / J:45337  X1204C.HOUSE.HANK.PC.X12CCONNOR.RECONCILE.1
E:24579 / J:45338  X1204C.HOUSE.HANK.PC.X12CCONNOR.RECONCILE.2
E:24580 / J:45339  X1204C.HOUSE.HANK.PC.X12CCONNOR.RECONCILE.3
E:24581 / J:45343  X1204C.HOUSE.HANK.PC.X12CHANK.WORRIEDHANK
E:24582 / J:45344  X1204C.HOUSE.HANK.PC.X12CHANK.APOLOGIZE
E:24583 / J:45345  X1204C.HOUSE.HANK.PC.X12CHANK.GOODBYE
E:24584 / J:45346  X1204C.HOUSE.HANK.PC.X12CHANK.ALCOHOL
E:24585 / J:45347  X1204C.HOUSE.HANK.PC.X12CHANK.GUN
E:24586 / J:45348  X1204C.HOUSE.HANK.PC.X12CHANK.PHOTO
E:24587 / J:45350  X1204C.HOUSE.HANK.PC.X12CHANK.SEVERALDEATHS.1
E:24588 / J:45351  X1204C.HOUSE.HANK.PC.X12CHANK.SEVERALDEATHS.2
E:24589 / J:45352  X1204C.HOUSE.HANK.PC.X12CHANK.SEVERALDEATHS.3
E:24590 / J:45353  X1204C.HOUSE.HANK.PC.X12CHANK.SEVERALDEATHS.4
E:24591 / J:45356  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.1
E:24592 / J:45357  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.2
E:24593 / J:45358  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.3
E:24594 / J:45359  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.4
E:24595 / J:45360  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.5
E:24596 / J:45361  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.6
E:24597 / J:45362  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.7
E:24598 / J:45363  X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE.8
E:24599 / J:45365  X1204C.HOUSE.HANK.PC.X12CHANK.DONTINSIST
E:24600 / J:45366  X1204C.HOUSE.HANK.PC.X12CHANK.CONVINCE
E:24601 / J:45368  X1204C.HOUSE.HANK.PC.X12CHANK.LEAVEME.1
E:24602 / J:45369  X1204C.HOUSE.HANK.PC.X12CHANK.LEAVEME.2
E:24603 / J:45370  X1204C.HOUSE.HANK.PC.X12CHANK.LEAVEME.3
E:24604 / J:45372  X1204C.HOUSE.HANK.PC.X12CHANK.RECONCILE
E:24605 / J:45375  X1204C.HOUSE.HANK.PC.HELLOCHOICE.WORRIEDHANK
E:24606 / J:45376  X1204C.HOUSE.HANK.PC.HELLOCHOICE.APOLOGIZE
E:24607 / J:45377  X1204C.HOUSE.HANK.PC.HELLOCHOICE.GOODBYE
E:24608 / J:45378  X1204C.HOUSE.HANK.PC.HELLOCHOICE.RECONCILE
E:24609 / J:45381  X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.ALCOHOL
E:24610 / J:45382  X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.GUN
E:24611 / J:45383  X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.PHOTO
E:24612 / J:45386  X1204C.HOUSE.HANK.PC.EXPLAINCHOICE.DONTINSIST
E:24613 / J:45387  X1204C.HOUSE.HANK.PC.EXPLAINCHOICE.CONVINCE
E:24614 / J:45388  X1204C.HOUSE.HANK.PC.EXPLAINCHOICE.EXPLAIN
T26:94  <app-unlock-condition [unlockType]="UnlockType.Lock">
T26:95  Hank was hostile in
T26:96  <a [routerLink]="['/chapters', 29]">Last Chance, Connor</a> and
T26:97  resigned
T26:98  </app-unlock-condition>
T26:103  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.HELLOCHOICE.GOODBYE')"
T26:107  {{ t("X1204C.HOUSE.HANK.PC.X12CCONNOR.GOODBYE") }}
T26:112  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.HELLOCHOICE.APOLOGIZE')"
T26:118  "X1204C.HOUSE.HANK.PC.X12CCONNOR.APOLOGIZE"
T26:126  t('X1204C.HOUSE.HANK.PC.HELLOCHOICE.WORRIEDHANK')
T26:133  "X1204C.HOUSE.HANK.PC.X12CCONNOR.WORRIEDHANK"
T26:140  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.HELLOCHOICE.RECONCILE')"
T26:146  "X1204C.HOUSE.HANK.PC.X12CCONNOR.RECONCILE"
T26:158  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.PHOTO')"
T26:169  "X1204C.HOUSE.HANK.PC.X12CCONNOR.PHOTO"
T26:176  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.GUN')"
T26:182  "X1204C.HOUSE.HANK.PC.X12CCONNOR.GUN"
T26:190  t('X1204C.HOUSE.HANK.PC.SHOULDNOTCHOICE.ALCOHOL')
T26:197  "X1204C.HOUSE.HANK.PC.X12CCONNOR.ALCOHOL"
T26:217  "X1204C.HOUSE.HANK.PC.X12CHANK.SEVERALDEATHS"
T26:233  "X1204C.HOUSE.HANK.PC.X12CHANK.NOHOPE"
T26:246  [choiceLabel]="t('X1204C.HOUSE.HANK.PC.EXPLAINCHOICE.CONVINCE')"
T26:250  {{ t("X1204C.HOUSE.HANK.PC.X12CCONNOR.CONVINCE") }}
T26:256  t('X1204C.HOUSE.HANK.PC.EXPLAINCHOICE.DONTINSIST')
T26:261  {{ t("X1204C.HOUSE.HANK.PC.X12CCONNOR.DONTINSIST") }}
T26:271  "X1204C.HOUSE.HANK.PC.X12CHANK.LEAVEME"
T29:462  {{ t("MENU.FLOWCHART.04A.CA.GC.HANKSUICIDE") }}
```

### ch31-05

**Observation to settle:** [which buttons the model is offered] With Markus ousted (alive but gone) and Josh alive, was CHECK ON JOSH offered to deviant Connor in the church?

**Condition needed:** ConnorJoshTalk if Markus died only versus ousted-and-absent too.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The church segment explicitly admits dead or rejected-and-not-returned Markus, but has no Connor Josh-talk block. Segment eligibility cannot establish every optional interaction. No change to CHECK ON JOSH.

**Cross-check:** FC31; PP31-1. Character outcomes and optional talks are charted; absent-character scene scheduling is not encoded by the localized node labels. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:MENU\.FLOWCHART\.03A\.[A-Z0-9.]*?JOSH|X0301A\.[A-Z0-9.]*?JOSH)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Connor became a deviant and Markus|Markus was rejected by Jericho|Markus is dead
```

**All search hits (39 source locations):**

```text
E:9612 / J:15572  MENU.FLOWCHART.03A.MARKUS.CHURCH.JOSH
  J:15572  "JOSH": "TALK TO JOSH",
E:9629 / J:15595  MENU.FLOWCHART.03A.CONNOR.CHURCH.JOSH
  J:15595  "JOSH": "CHECK ON JOSH",
T23:505  <h2 id="find-north">
T23:506  Find North - If Markus is dead or rejected by Jericho
T23:507  </h2>
T23:831  <h1 id="deviant-connor">
T23:832  Deviant Connor in corridor : Markus is dead or rejected
T23:833  </h1>
T23:1458  <div class="condition">
T23:1459  <p>
T23:1460  Markus is dead or left Jericho - Connor goes after
T23:1461  North
T23:1462  </p>
T23:1463  </div>
T24:1798  <div class="condition">
T24:1799  <p>Markus was rejected by Jericho</p>
T24:1800  </div>
T25:1047  <div class="condition">
T25:1048  <p>Markus was rejected by Jericho</p>
T25:1049  </div>
T26:284  <app-unlock-condition [unlockType]="UnlockType.None">
T26:285  Connor became a deviant and Markus is dead / rejected and did
T26:286  not return
T26:287  </app-unlock-condition>
T26:347  <app-unlock-condition [unlockType]="UnlockType.Death">
T26:348  Markus is dead
T26:349  </app-unlock-condition>
T26:516  <div class="condition">
T26:517  <p>Markus was rejected by Jericho</p>
T26:518  </div>
T31:107  <div class="condition">
T31:108  <p>
T31:109  Markus is dead and North is leading the
T31:110  revolution
T31:111  </p>
T31:112  </div>
T32:1249  <h1 id="markus-dead">
T32:1250  Markus is dead : North is leading the revolution
T32:1251  </h1>
```

### ch32-02

**Observation to settle:** [which ending] When the assault failed with North at Companion (not Lover), did she take shelter in the store with Markus (yes) or get shot (no)?

**Condition needed:** failedAssaultNorthStore needs Lover, Companion or lower band.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The revolution template gives a Companion condition for North donating her heart earlier, not for the later store retreat. Do not transplant that nearby predicate. The store section starts from North alive, leaving her survival condition unresolved. No change to Companion store access.

**Cross-check:** FC32; PP32-1, PP32-2, PP32C-1. Store survival, bullet interception and rooftop exit concern separate branches; do not transfer a nearby relationship gate between them. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.04A\.[A-Z0-9.]*?(?:NORTH.*(?:SHOT|STORE)|(?:SHOT|STORE).*NORTH)|X1103M\.[A-Z0-9.]*?(?:NORTHDEAD|NORTHALIVE)))|(?:MENU\.FLOWCHART\.04A\.MA\.(?:MARKUSSHELTERSWITHNORTH|NORTHGETSHOTFALLBACK|CHECKPOINTINSIDECYBERWITHNORTH)|X1103M\.LOSTBATTLE\.[A-Z0-9.]*?(?:NORTH|COMPANION))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
North is at least companion|North is alive : Surrounded by soldiers|North is dead and Connor
```

**All search hits (129 source locations):**

```text
E:10815 / J:16860  MENU.FLOWCHART.04A.MB.NEGONORTHSHOT
  J:16860  "NEGONORTHSHOT": "PERKINS SHOOTS NORTH",
E:11083 / J:17140  MENU.FLOWCHART.04A.MA.MARKUSSHELTERSWITHNORTH
  J:17140  "MARKUSSHELTERSWITHNORTH": "MARKUS AND NORTH TAKE SHELTER IN STORE",
E:11086 / J:17143  MENU.FLOWCHART.04A.MA.NORTHGETSHOTFALLBACK
  J:17143  "NORTHGETSHOTFALLBACK": "NORTH GETS SHOT",
E:11087 / J:17144  MENU.FLOWCHART.04A.MA.CHECKPOINTINSIDECYBERWITHNORTH
  J:17144  "CHECKPOINTINSIDECYBERWITHNORTH": "INSIDE STORE WITH NORTH",
E:11123 / J:17180  MENU.FLOWCHART.04A.MA.SOLDIERSSURROUNDSHOPWITHNORTH
  J:17180  "SOLDIERSSURROUNDSHOPWITHNORTH": "SOLDIERS SURROUND STORE",
E:11129 / J:17186  MENU.FLOWCHART.04A.MA.MARKUSNORTHDEADEXITSHOT
  J:17186  "MARKUSNORTHDEADEXITSHOT": "MARKUS AND NORTH DIED LEAVING THE STORE",
E:11136 / J:17193  MENU.FLOWCHART.04A.MA.NORTHSHELTERS
  J:17193  "NORTHSHELTERS": "NORTH TAKES SHELTER IN STORE",
E:11137 / J:17194  MENU.FLOWCHART.04A.MA.NORTHCONNORCYBERLIFE
  J:17194  "NORTHCONNORCYBERLIFE": "CONNOR IN CYBERLIFE STORE",
E:11142 / J:17199  MENU.FLOWCHART.04A.MA.NORTHSHOTBYCONNOR
  J:17199  "NORTHSHOTBYCONNOR": "NORTH WAS SHOT BY CONNOR",
E:11147 / J:17204  MENU.FLOWCHART.04A.MA.NORTHSHOT
  J:17204  "NORTHSHOT": "NORTH IS SHOT",
E:11154 / J:17212  MENU.FLOWCHART.04A.MA.GC.NORTHSHOT
  J:17212  "NORTHSHOT": "NORTH WAS SHOT",
E:11164 / J:17223  MENU.FLOWCHART.04A.MA.NORTHSHOTBATTLEFIELD
  J:17223  "NORTHSHOTBATTLEFIELD": "NORTH WAS SHOT BY SOLDIERS",
E:18616 / J:33470  X1103M.FINAL.SUCCESS.PC.X11MMARKUS.NORTHALIVE
E:18620 / J:33479  X1103M.FINAL.SUCCESS.PC.X11MMARLA.NORTHALIVE.1
E:18621 / J:33480  X1103M.FINAL.SUCCESS.PC.X11MMARLA.NORTHALIVE.2
E:18622 / J:33481  X1103M.FINAL.SUCCESS.PC.X11MMARLA.NORTHALIVE.3
E:18630 / J:33506  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SUMMONS
E:18631 / J:33507  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SUICIDE
E:18632 / J:33508  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.CONFIRMSUICIDE
E:18633 / J:33509  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.DIRTYBOMB
E:18634 / J:33511  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER.1
E:18635 / J:33512  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER.2
E:18636 / J:33513  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER.3
E:18637 / J:33514  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER.4
E:18638 / J:33515  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER.5
E:18639 / J:33517  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.KISS
E:18640 / J:33519  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.GIVEUP.1
E:18641 / J:33520  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.GIVEUP.2
E:18642 / J:33522  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.PRESS
E:18643 / J:33523  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.PUTDOWN
E:18644 / J:33524  X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.HANDSTOUCH
E:18645 / J:33528  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SUMMONS.1
E:18646 / J:33529  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SUMMONS.2
E:18647 / J:33531  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SUICIDE
E:18648 / J:33532  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.CONFIRMSUICIDE
E:18649 / J:33534  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.DIRTYBOMB.1
E:18650 / J:33535  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.DIRTYBOMB.2
E:18651 / J:33538  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SURRENDER.1
E:18652 / J:33539  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SURRENDER.2
E:18653 / J:33541  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.KISS
E:18654 / J:33542  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.GIVEUP
E:18655 / J:33543  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.PRESS
E:18656 / J:33544  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.PUTDOWN
E:18657 / J:33545  X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.HANDSTOUCH
E:18658 / J:33548  X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.SUICIDE
E:18659 / J:33549  X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.SURRENDER
E:18660 / J:33550  X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.DIRTYBOMB
E:18661 / J:33551  X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.KISS
E:18662 / J:33554  X1103M.FINAL.NORTHALIVE.PC.SUICIDECHOICE.PUTDOWN
E:18663 / J:33555  X1103M.FINAL.NORTHALIVE.PC.SUICIDECHOICE.CONFIRMSUICIDE
E:18664 / J:33558  X1103M.FINAL.NORTHALIVE.PC.BOMBCHOICE.PRESS
E:18665 / J:33559  X1103M.FINAL.NORTHALIVE.PC.BOMBCHOICE.GIVEUP
E:18666 / J:33567  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS.1
E:18667 / J:33568  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS.2
E:18668 / J:33569  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS.3
E:18669 / J:33570  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS.4
E:18670 / J:33573  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SURRENDER.1
E:18671 / J:33574  X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SURRENDER.2
E:18672 / J:33578  X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.SUICIDE
E:18673 / J:33579  X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.SURRENDER
E:18674 / J:33580  X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.DIRTYBOMB
E:18755 / J:33766  X1103M.LOSTBATTLE.SIDEKICKSWARNING.FA.X11MSIMON.NORTHDEAD.1
E:18756 / J:33767  X1103M.LOSTBATTLE.SIDEKICKSWARNING.FA.X11MSIMON.NORTHDEAD.2
E:18759 / J:33775  X1103M.LOSTBATTLE.SIDEKICKSWARNING.FA.X11MMARKUS.NORTHSHOT
T31:1658  "X1103M.LOSTBATTLE.SIDEKICKSWARNING.FA.X11MMARKUS.NORTHSHOT"
T32:347  <app-condition-group>
T32:348  <app-conditioned-content>
T32:349  <div class="condition"><p>Markus badly wounded</p></div>
T32:350  <div class="content">
T32:351  <app-condition-group>
T32:352  <app-conditioned-content>
T32:353  <div class="condition">
T32:354  <p>
T32:355  North is at least companion: North gives her
T32:356  heart
T32:357  </p>
T32:358  </div>
T32:359  <div class="content">
T32:360  <p>
T32:361  <app-dialogue-line name="North">
T32:362  {{
T32:778  "X1103M.FINAL.SUCCESS.PC.X11MMARLA.NORTHALIVE"
T32:887  "X1103M.LOSTBATTLE.SIDEKICKSWARNING.FA.X11MSIMON.NORTHDEAD"
T32:911  
T32:912  <app-condition-group>
T32:913  <app-conditioned-content>
T32:914  <div class="condition">
T32:915  <p>North is alive : Surrounded by soldiers</p>
T32:916  </div>
T32:917  <div class="content">
T32:918  <p>
T32:919  <app-dialogue-line name="Soldier">
T32:920  {{
T32:921  translationService.translateObject(
T32:922  "X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS",
T32:923  0,
T32:924  3
T32:925  ) | async
T32:926  }}
T32:927  </app-dialogue-line>
T32:931  "X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SUMMONS"
T32:938  "X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS.4"
T32:947  'X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.KISS'
T32:968  'X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.DIRTYBOMB'
T32:982  "X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.DIRTYBOMB"
T32:992  'X1103M.FINAL.NORTHALIVE.PC.BOMBCHOICE.PRESS'
T32:1001  'X1103M.FINAL.NORTHALIVE.PC.BOMBCHOICE.GIVEUP'
T32:1009  "X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.GIVEUP"
T32:1020  'X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.SUICIDE'
T32:1027  'X1103M.FINAL.NORTHALIVE.PC.SUICIDECHOICE.CONFIRMSUICIDE'
T32:1036  'X1103M.FINAL.NORTHALIVE.PC.SUICIDECHOICE.PUTDOWN'
T32:1046  'X1103M.FINAL.NORTHALIVE.PC.SUMMONSCHOICE.SURRENDER'
T32:1058  "X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER",
T32:1067  "X1103M.FINAL.NORTHALIVE.PC.X11MMARLA.SURRENDER"
T32:1074  "X1103M.FINAL.NORTHALIVE.PC.X11MMARKUS.SURRENDER",
T32:1085  <div class="condition">
T32:1086  <p>North is dead and Connor is machine : Connor arrives</p>
T32:1087  </div>
T32:1182  <div class="condition">
T32:1183  <p>
T32:1184  North is dead and Connor is not here: Markus alone in
T32:1185  the store
T32:1186  </p>
T32:1187  </div>
T32:1193  "X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SUMMONS"
T32:1203  'X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.SUICIDE'
T32:1212  'X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.SURRENDER'
T32:1220  "X1103M.FINAL.NORTHDEAD.PC.X11MOFFICER.SURRENDER"
T32:1229  'X1103M.FINAL.NORTHDEAD.PC.SUMMONSCHOICE.DIRTYBOMB'
```

### ch32-03

**Observation to settle:** [which ending] When Markus failed the barricade QTE with North at Friend or Companion (not Lover), did North throw herself in front of the bullet?

**Condition needed:** barricadeBulletIntercept requires Lover versus at-least-Friend/Companion.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The demonstration template explicitly calls the QTE-failure save Lover-only. Other Companion heart-donation gates concern different actions. No internal key encodes the disputed Friend/Companion alternative; the conflict with player reports remains. No change to bullet gate.

**Cross-check:** FC32; PP32-1, PP32-2, PP32C-1. Store survival, bullet interception and rooftop exit concern separate branches; do not transfer a nearby relationship gate between them. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:MENU\.FLOWCHART\.04A\.[A-Z0-9.]*?(?:NORTH.*SAVE|SAVE.*NORTH)|X1103M\.[A-Z0-9.]*?(?:SACRIF|SAVEMARKUS)|X1103M\.[A-Z0-9.]*?NORTH.*BULLET))|(?:X1106M\.ATTACK\.FAIL\.[A-Z0-9.]*?NORTHALIVESECU|MENU\.FLOWCHART\.04A\.MB\.[A-Z0-9.]*?(?:NORTH|SACRIF))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Fail the QTE and have lover status|North is at least companion
```

**All search hits (43 source locations):**

```text
E:10800 / J:16845  MENU.FLOWCHART.04A.MB.BARRICADENORTH
  J:16845  "BARRICADENORTH": "TALK TO NORTH",
E:10813 / J:16858  MENU.FLOWCHART.04A.MB.NEGOTALKNORTH
  J:16858  "NEGOTALKNORTH": "TALK TO NORTH",
E:10815 / J:16860  MENU.FLOWCHART.04A.MB.NEGONORTHSHOT
  J:16860  "NEGONORTHSHOT": "PERKINS SHOOTS NORTH",
E:10824 / J:16869  MENU.FLOWCHART.04A.MB.DONTNEGONORTHTAKESBULLETFORMARKUS
  J:16869  "DONTNEGONORTHTAKESBULLETFORMARKUS": "NORTH TAKES A BULLET FOR MARKUS",
E:10826 / J:16871  MENU.FLOWCHART.04A.MB.NORTHJOINS
  J:16871  "NORTHJOINS": "NORTH JOINS HIM",
E:10832 / J:16877  MENU.FLOWCHART.04A.MB.FINALSACRIFICE
  J:16877  "FINALSACRIFICE": "SACRIFICE",
E:10849 / J:16894  MENU.FLOWCHART.04A.MB.NEGONORTHDIES
  J:16894  "NEGONORTHDIES": "NORTH DIES",
E:10850 / J:16896  MENU.FLOWCHART.04A.MB.GC.NORTHDEAD
  J:16896  "NORTHDEAD": "NORTH DIED",
E:25471 / J:47108  X1106M.ATTACK.FAIL.FA.X11MMARKUS.NORTHALIVESECU.1
E:25472 / J:47109  X1106M.ATTACK.FAIL.FA.X11MMARKUS.NORTHALIVESECU.2
E:25473 / J:47110  X1106M.ATTACK.FAIL.FA.X11MMARKUS.NORTHALIVESECU.3
E:25474 / J:47115  X1106M.ATTACK.FAIL.FA.X11MMARLA.NORTHALIVESECU.1
E:25475 / J:47116  X1106M.ATTACK.FAIL.FA.X11MMARLA.NORTHALIVESECU.2
T31:1663  
T31:1664  <section aria-labelledby="north-saves">
T31:1665  <h2 id="north-saves">
T31:1666  Fail the QTE and have lover status with North - North saves
T31:1667  Markus
T31:1668  </h2>
T31:1669  <p>
T31:1670  <app-dialogue-line name="North">
T31:1671  {{ t("X1106M.ATTACK.FAIL.FA.X11MMARLA.NORTHALIVESECU.1") }}
T31:1672  </app-dialogue-line>
T31:1673  <app-dialogue-line name="Markus">
T31:1674  {{
T31:1675  translationService.translateObject(
T31:1676  "X1106M.ATTACK.FAIL.FA.X11MMARKUS.NORTHALIVESECU"
T31:1677  ) | async
T31:1678  }}
T31:1679  </app-dialogue-line>
T31:1680  <app-dialogue-line name="North">
T31:1681  {{ t("X1106M.ATTACK.FAIL.FA.X11MMARLA.NORTHALIVESECU.2") }}
T31:1682  </app-dialogue-line>
T31:1683  </p>
T31:1684  </section>
T31:1685  
T31:1686  <mat-divider></mat-divider>
T32:353  <div class="condition">
T32:354  <p>
T32:355  North is at least companion: North gives her
T32:356  heart
T32:357  </p>
T32:358  </div>
```

### ch32-04

**Observation to settle:** [which buttons the model is offered] With Hank at Friend, was LEAVE (give up the shot) offered on the rooftop without first choosing HANK'S SON and then HANK'S SON (INSIST)?

**Condition needed:** roofLeave needs Friend plus son-topic count twice, evaluated before/after arrival loss.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The son and insist inputs are separately named, and LEAVE has a Friend annotation, but no topic counter or conjunction is serialized. A known positive unlock after both questions does not prove they are necessary. No change to rooftop LEAVE availability.

**Cross-check:** FC32; PP32-1, PP32-2, PP32C-1. Store survival, bullet interception and rooftop exit concern separate branches; do not transfer a nearby relationship gate between them. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X1303C\.FACETOFACE\.HANK\.[A-Z0-9.]*?(?:SON|INSIST|LEAVE)|MENU\.FLOWCHART\.04A\.[A-Z0-9.]*?(?:SON|LEAVESHOT)))|(?:X1303C\.FACETOFACE\.HANK\.[A-Z0-9.]*?(?:HANKSSON|TOEND\.ABANDON)|MENU\.FLOWCHART\.04A\.CA\.(?:TALKABOUTHANKSON|LEAVE))
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Be friend with Hank
```

**All search hits (59 source locations):**

```text
E:10596 / J:16633  MENU.FLOWCHART.04A.CB.HANKASKSSON
  J:16633  "HANKASKSSON": "HANK ASKS ABOUT HIS SON'S NAME",
E:10597 / J:16634  MENU.FLOWCHART.04A.CB.SAYSONANYOTHER
  J:16634  "SAYSONANYOTHER": "WRONG ANSWER",
E:10598 / J:16635  MENU.FLOWCHART.04A.CB.SAYSONCOLE
  J:16635  "SAYSONCOLE": "COLE",
E:11023 / J:17076  MENU.FLOWCHART.04A.CA.TALKABOUTHANKSON
  J:17076  "TALKABOUTHANKSON": "TALK ABOUT HANK'S SON",
E:25078 / J:46291  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.REASONABLE.1
E:25079 / J:46292  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.REASONABLE.2
E:25086 / J:46305  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSIST.1
E:25087 / J:46306  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSIST.2
E:25088 / J:46307  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSIST.3
E:25089 / J:46308  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSIST.4
E:25093 / J:46316  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSON.1
E:25094 / J:46317  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSON.2
E:25095 / J:46318  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSON.3
E:25096 / J:46319  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSON.4
E:25097 / J:46321  X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSISTCONT
E:25112 / J:46347  X1303C.FACETOFACE.HANK.PC.X13CHANK.REASONABLE.1
E:25113 / J:46348  X1303C.FACETOFACE.HANK.PC.X13CHANK.REASONABLE.2
E:25114 / J:46349  X1303C.FACETOFACE.HANK.PC.X13CHANK.REASONABLE.3
E:25118 / J:46357  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSIST.1
E:25119 / J:46358  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSIST.2
E:25120 / J:46359  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSIST.3
E:25121 / J:46360  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSIST.4
E:25122 / J:46363  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSON.1
E:25123 / J:46364  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSON.2
E:25124 / J:46367  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSISTCONT.1
E:25125 / J:46368  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSISTCONT.2
E:25126 / J:46369  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSISTCONT.3
E:25127 / J:46370  X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSISTCONT.4
E:25142 / J:46392  X1303C.FACETOFACE.HANK.PC.CHOICE01.REASONABLE
E:25148 / J:46400  X1303C.FACETOFACE.HANK.PC.CHOICE02.HANKSSON
E:25149 / J:46401  X1303C.FACETOFACE.HANK.PC.CHOICE02.HANKSSONINSIST
E:25150 / J:46404  X1303C.FACETOFACE.HANK.PC.TOEND.ABANDON
T29:108  'X1303C.FACETOFACE.HANK.PC.CHOICE01.REASONABLE'
T29:116  "X1303C.FACETOFACE.HANK.PC.X13CCONNOR.REASONABLE"
T29:123  "X1303C.FACETOFACE.HANK.PC.X13CHANK.REASONABLE"
T29:243  t('X1303C.FACETOFACE.HANK.PC.CHOICE02.HANKSSON')
T29:250  "X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSON"
T29:257  "X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSON"
T29:266  'X1303C.FACETOFACE.HANK.PC.CHOICE02.HANKSSONINSIST'
T29:281  "X1303C.FACETOFACE.HANK.PC.X13CCONNOR.HANKSSONINSIST"
T29:288  "X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSIST"
T29:304  "X1303C.FACETOFACE.HANK.PC.X13CHANK.HANKSSONINSISTCONT"
T29:319  [choiceLabel]="
T29:320  t('X1303C.FACETOFACE.HANK.PC.TOEND.ABANDON')
T29:321  "
T29:322  [brackets]="true"
T29:323  >
T29:324  <p>
T29:325  <app-unlock-condition
T29:326  [unlockType]="UnlockType.Lock"
T29:327  >
T29:328  Be friend with Hank
T29:329  </app-unlock-condition>
T29:330  <app-dialogue-line name="Connor">
T29:331  {{
T29:332  translationService.translateObject(
T29:333  "X1303C.FACETOFACE.HANK.PC.X13CCONNOR.ABANDON"
T29:334  ) | async
T29:335  }}
```

### ch32-05

**Observation to settle:** [which ending] With Connor still a machine and Markus killed by soldiers or Perkins (not by Connor), and no dirty bomb, did the after-credits scene of Amanda presenting the new RK900 play?

**Condition needed:** RK900 success requires Connor personally stopping Markus versus any Markus death without dirty bomb.

**Verdict: partially — moderate confidence in the stated partial inference; exact discriminating game result unresolved.** The ending template says machine Connor stopped Markus; the localized replacement dialogue contains no killer-identity predicate. A role-description is not proof of personal kill attribution. No change to the broader wiki-based RK900 gate.

**Cross-check:** FC32; PP32-1, PP32-2, PP32C-1. Store survival, bullet interception and rooftop exit concern separate branches; do not transfer a nearby relationship gate between them. The precise unresolved implication for this item is stated in the verdict above.

**Identifiers/value search (case-insensitive):**

```regex
(?:(?:X1301C\.[A-Z0-9.]*?(?:RK900|NEWCONNOR|SUCCESS)|X1303C\.[A-Z0-9.]*?(?:RK900|NEWCONNOR)|MENU\.FLOWCHART\.[A-Z0-9.]*?RK900))|(?:X2003A\.ZENGARDEN\.NEWMODEL\.|GUI\.GALLERY\.CONNOR\.COSTUME03\.)
```

**Condition/arrow-context search (case-insensitive, all chapters):**

```regex
Machine Connor stopped Markus
```

**All search hits (33 source locations):**

```text
E:2040 / J:2993  GUI.GALLERY.CONNOR.COSTUME03.NAME
E:2041 / J:2994  GUI.GALLERY.CONNOR.COSTUME03.TEXT01
E:2042 / J:2995  GUI.GALLERY.CONNOR.COSTUME03.TEXT02
E:2043 / J:2996  GUI.GALLERY.CONNOR.COSTUME03.RESUME
E:25574 / J:47360  X2003A.ZENGARDEN.NEWMODEL.PC.X20ACONNOR.DEACTIVATED
E:25575 / J:47364  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.1
E:25576 / J:47365  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.2
E:25577 / J:47366  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.3
E:25578 / J:47367  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.4
E:25579 / J:47368  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.5
E:25580 / J:47369  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.6
E:25581 / J:47370  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.7
E:25582 / J:47371  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.8
E:25583 / J:47372  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.9
E:25584 / J:47373  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.10
E:25585 / J:47374  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.11
E:25586 / J:47375  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.12
E:25587 / J:47376  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.13
E:25588 / J:47377  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.14
E:25589 / J:47378  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.15
E:25590 / J:47379  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.16
E:25591 / J:47380  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.17
E:25592 / J:47381  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED.18
E:25593 / J:47383  X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.FLOWERCYC
T40:224  <app-unlock-condition
T40:225  [unlockType]="UnlockType.Lock"
T40:226  >
T40:227  Machine Connor stopped Markus
T40:228  </app-unlock-condition>
T40:235  "X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED",
T40:250  "X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED",
T40:259  "X2003A.ZENGARDEN.NEWMODEL.PC.X20ACONNOR.DEACTIVATED"
T40:266  "X2003A.ZENGARDEN.NEWMODEL.PC.X20AAMANDA.DEACTIVATED",
```

## What this corpus structurally cannot answer

It contains localization and a transcript website, not the game’s `SCRIPT_CONTROLLER`, `KERNEL_FLOW`, `FLOW_DATA` or event-controller implementations. Therefore a negative search is bounded evidence about these files, not proof that the game lacks a variable. The site’s executable IF/ELSE and numeric values implement navigation, localization and icons; the transcript’s condition groups render all alternatives rather than execute a saved game.

1. **Gauge numbers:** no initial-point table, signed small/large increment mapping or band boundary array was recovered. The TypeScript enum has four ordinal members; the renderer maps them to icon/class choices. Zero/one/two/three enum ordinals must not become game deltas. Level-name keys do not prove active levels, their order or use of Alice Close/Luther Wary/Jericho Uncertain.

2. **Timers and QTEs:** timeout captions identify timed sequences but do not publish timer initialization, pauses, input tolerance, animation durations, Experienced/Casual update rules or wound-counter offsets. An action budget cannot be decoded from seconds, and a dialogue suffix `01` or `02` is not a miss counter.

3. **Counters:** Midnight Train’s evidence HUD describes four pieces of evidence; that is not the officer’s suspicion scale or inspection cutoff. The misleading internal names reinforce this: `THOUGHTS.0801K.SUSPICION` captions evidence hiding, while `THOUGHTS.0801K.EVIDENCES.VALUE` captions avoiding suspicion; these are localization handles, not recovered counter variables. Capitol Park’s message feedback distinguishes ordinary/consistent/outstanding actions without exposing the scoring function. Freedom March’s conversion scene names do not supply group sizes or a reward-at-ten predicate. Zlatko’s progressively restored name suffixes index displayed text, not the number of recollections required.

4. **Persistent flags:** no producer/consumer assignment graph connects Fugitives theft/threat to later TV/Ralph branches, Carlos-only admission to Last Chance, or Luther abandonment to later survival. A downstream variant proves a distinguishable line exists; it does not identify all earlier choices that set its condition.

5. **Reachability and cut content:** the string table preserves unused or patched-out nodes. `SQUAT.C.LEAVE` and the Pirates’ Cove cut chase are reminders that presence is not reachability. Template `app-unused-content` must not become a shipped choice. Fire dialogue under `GAMEOVER` proves a named dialogue grouping, not a fatal edge or probability.

6. **Chapter placement:** reused string namespaces may appear in a later/earlier chapter; localization prefixes do not resolve the surviving-machine Connor chronology. Likewise Companion heart donation, store retreat and Lover bullet sacrifice remain separate conditions even when they concern North.

### Relation enum and renderer: verbatim code audit

`C/src/app/shared/enums/relation-type.enum.ts`:

```text
1: export enum RelationType {
2: 	SmallDown,
3: 	SmallUp,
4: 	LargeDown,
5: 	LargeUp,
6: }
```

`C/src/app/shared/components/relation/relation.component.ts`:

```text
24: 	@Input({ required: true }) public type: RelationType | null = null;
25: 
26: 	public imageSource: WritableSignal<string> = signal('');
27: 	public imageAlt: WritableSignal<string> = signal('');
28: 
29: 	public up: WritableSignal<boolean> = signal(true);
30: 
31: 	ngOnInit(): void {
32: 		switch (this.type) {
33: 			case RelationType.SmallUp:
34: 				this.imageSource.set('images/slight_increase.png');
35: 				this.imageAlt.set('slight_increase');
36: 				this.up.set(true);
37: 				break;
38: 			case RelationType.LargeUp:
39: 				this.imageSource.set('images/large_increase.png');
40: 				this.imageAlt.set('large_increase');
41: 				this.up.set(true);
42: 				break;
43: 			case RelationType.SmallDown:
44: 				this.imageSource.set('images/slight_decrease.png');
45: 				this.imageAlt.set('slight_decrease');
46: 				this.up.set(false);
47: 				break;
48: 			case RelationType.LargeDown:
49: 				this.imageSource.set('images/large_decrease.png');
50: 				this.imageAlt.set('large_decrease');
51: 				this.up.set(false);
52: 				break;
53: 			default:
54: 				break;
55: 		}
56: 	}
57: }
```

### Numeric and IF/ELSE-equivalent sweep

The following global semantic-unit query was also run (no chapter filter). Every matched unit is quoted. Its results contain prose conditions and comparison-like language, not the missing game-state assignments. The complete results and all item hits are retained in `C/search-results.json`.

```regex
threshold|\bcounter\b|\bif\b|\belse\b|[<>]=?\s*\d|\b(?:0\.6|0\.7|60%|70%|50 seconds|50 second|ten androids|10 androids)\b
```

`C/src/app/chapters/components/chapter-contents/10-fugitives-chapter-content/fugitives-chapter-content.component.html:666`:

```text
666: <p class="note">
667: <span dir="ltr">
668: If Kara convinced the clerk to get the money,
669: the dialogue will go directly to the LIE option
670: with an increase in relationship level.
671: </span>
672: </p>
```

`C/src/app/chapters/components/chapter-contents/15-the-nest-chapter-content/the-nest-chapter-content.component.html:1266`:

```text
1266: <h2 id="hank-sink">
1267: Hank looking at the sink (if Connor hasn't investigated yet)
1268: </h2>
```

`C/src/app/chapters/components/chapter-contents/22-the-bridge-chapter-content/the-bridge-chapter-content.component.html:33`:

```text
33: <p class="note">
34: <span dir="ltr"
35: >If Connor didn't look at the photo in
36: <a [routerLink]="['/chapters', 18]">Russian Roulette</a
37: >, no choice will be given and the dialogue will go
38: directly to the SUICIDE option.</span
39: >
40: </p>
```

`C/src/app/chapters/components/chapter-contents/24-public-enemy-chapter-content/public-enemy-chapter-content.component.html:1402`:

```text
1402: <p class="note">
1403: <span dir="ltr">
1404: If Connor checked the CCTV, the dialogue will continue.
1405: Otherwise, he can come back later to resume the dialogue
1406: here.
1407: </span>
1408: </p>
```

`C/src/app/chapters/components/chapter-contents/30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html:680`:

```text
680: <p class="note">
681: <span dir="ltr"
682: >Kara's part of this chapter ends if Jericho is not
683: attacked (Connor series decommissioned).</span
684: >
685: </p>
```

`C/src/app/chapters/components/chapter-contents/30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html:721`:

```text
721: <p class="note">
722: <span dir="ltr"
723: >Kara's gameplay ends here if Jericho is not
724: attacked (Connor series decommissioned).</span
725: >
726: </p>
```

`C/src/app/chapters/components/chapter-contents/30.2-crossroads-connor-chapter-content/crossroads-connor-chapter-content.component.html:505`:

```text
505: <h2 id="find-north">
506: Find North - If Markus is dead or rejected by Jericho
507: </h2>
```

`C/src/app/chapters/components/chapter-contents/32.4-connor-cyberlife-tower-chapter-content/connor-cyberlife-tower-chapter-content.component.html:706`:

```text
706: <app-unlock-condition
707: [unlockType]="
708: UnlockType.Lock
709: "
710: >
711: Will be highlighted if
712: Connor looked at the
713: photo in
714: <a
715: [routerLink]="[
716: '/chapters',
717: 18,
718: ]"
719: >Russian Roulette</a
720: >
721: </app-unlock-condition>
```

`C/src/app/chapters/components/chapter-contents/32.4-connor-cyberlife-tower-chapter-content/connor-cyberlife-tower-chapter-content.component.html:1121`:

```text
1121: <p class="note">
1122: <span dir="ltr">
1123: Leads to the
1124: same outcomes as
1125: if Hank is dead
1126: for STAND UP,
1127: SHOOT and [ TAKE
1128: TOO MUCH TIME TO
1129: CHOOSE ], and to
1130: the same result
1131: as successfully
1132: converting the
1133: android when
1134: choosing
1135: TRANSFER.
1136: </span>
1137: </p>
```

`C/src/app/chapters/components/chapter-contents/32.6-markus-revolution-chapter-content/markus-revolution-chapter-content.component.html:3`:

```text
3: <h1 id="speech">
4: In the church or in Jericho (if not attacked in Crossroads)
5: </h1>
```

`C/src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html:548`:

```text
548: <p class="note">
549: <span dir="ltr"
550: >This dialogue will also trigger if
551: "Pressure it" fails</span
552: >
553: </p>
```

`C/src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html:909`:

```text
909: <app-unlock-condition
910: [unlockType]="UnlockType.None"
911: >
912: Will also automatically happen if the chosen
913: approach failed twice
914: </app-unlock-condition>
```

`C/src/app/layout/info-dialog/info-dialog.component.html:61`:

```text
61: <app-unlock-condition [unlockType]="UnlockType.Time">
62: An hourglass icon means the event occurs if you take too
63: much time.
64: </app-unlock-condition>
```

### Global internal-condition and numeric-key audit

This follow-up query scans all English internal paths, independently of chapter namespaces. Every matching path is listed below; generic HUD/condition labels are quoted from their original JSON line. No numeric JSON leaf exists: all 25,923 leaves are strings. That does not exclude numbers embedded in display text. `GC` entries are chart condition-tab labels, not a game variable registry. `THOUGHTS.0801K.EVIDENCES.0–4` exposes a four-item HUD, not four suspicion points. `THOUGHTS.0501K.MYNAMEISKARA01–10` exposes progressively restored text, not a ten-memory predicate.

```regex
\b(?:THRESHOLD|COUNTER)\b|GUI\.(?:GAUGE|TIMER|STRESS|MESSAGESTRENGTH|SUSPICIONGAUGE)\.|\.GC\.|THOUGHTS\.0501K\.(?:MYNAMEISKARA|TIMER)|THOUGHTS\.0801K\.(?:EVIDENCES|SUSPICION|TIMER)|THOUGHTS\.0501C\.RISKHANK|THOUGHTS\.0901C\.HANKCHANCES
```

```text
E:710 / J:809 GUI.STRESS.TITLE
  "TITLE": "LEVEL OF STRESS",
E:711 / J:810 GUI.STRESS.TOOLOW
  "TOOLOW": "TOO LOW",
E:712 / J:811 GUI.STRESS.TOOHIGH
  "TOOHIGH": "TOO HIGH",
E:713 / J:812 GUI.STRESS.DANGER
  "DANGER": "CRITICAL",
E:714 / J:813 GUI.STRESS.OPTIMAL
  "OPTIMAL": "OPTIMAL"
E:715 / J:816 GUI.MESSAGESTRENGTH.TITLEVIOLENT
  "TITLEVIOLENT": "AGGRESSIVE MESSAGE",
E:716 / J:817 GUI.MESSAGESTRENGTH.TITLEPACIFIST
  "TITLEPACIFIST": "PACIFIST MESSAGE",
E:717 / J:818 GUI.MESSAGESTRENGTH.ACTIONPACIFIST
  "ACTIONPACIFIST": "PACIFIST ACTION",
E:718 / J:819 GUI.MESSAGESTRENGTH.ACTIONVIOLENT
  "ACTIONVIOLENT": "VIOLENT ACTION",
E:719 / J:820 GUI.MESSAGESTRENGTH.CONSISTENTPACIFIST
  "CONSISTENTPACIFIST": "CONSISTENT PACIFIST ACTION",
E:720 / J:821 GUI.MESSAGESTRENGTH.CONSISTENTVIOLENT
  "CONSISTENTVIOLENT": "CONSISTENT VIOLENT ACTION",
E:721 / J:822 GUI.MESSAGESTRENGTH.OUTSTANDING
  "OUTSTANDING": "OUTSTANDING ACTION",
E:722 / J:823 GUI.MESSAGESTRENGTH.VIOLENT
  "VIOLENT": "VIOLENT",
E:723 / J:824 GUI.MESSAGESTRENGTH.PACIFIST
  "PACIFIST": "PACIFIST"
E:730 / J:835 GUI.TIMER.NOLKTITLE
  "NOLKTITLE": "TIME REMAINING BEFORE ATTACK",
E:731 / J:836 GUI.TIMER.GENERIC
  "GENERIC": "TIME REMAINING",
E:732 / J:837 GUI.TIMER.ZLATKORESET
  "ZLATKORESET": "REINITIALIZATION PROGRESS",
E:733 / J:839 GUI.TIMER.B2BS.SHUTDOWN
  "SHUTDOWN": "TIME REMAINING BEFORE SHUTDOWN"
E:734 / J:841 GUI.TIMER.WARZONE
  "WARZONE": "LAST BUS DEPARTS",
E:735 / J:842 GUI.TIMER.CAMP
  "CAMP": "TIME BEFORE SHUTDOWN"
E:759 / J:888 GUI.SUSPICIONGAUGE.TITLE
  "TITLE": "SUSPICION LEVEL"
E:762 / J:896 GUI.GAUGE.HANK.NAME
  "NAME": "HANK",
E:763 / J:897 GUI.GAUGE.HANK.HOSTILE
  "HOSTILE": "HOSTILE",
E:764 / J:898 GUI.GAUGE.HANK.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:765 / J:899 GUI.GAUGE.HANK.FRIEND
  "FRIEND": "FRIEND",
E:766 / J:900 GUI.GAUGE.HANK.TENSE
  "TENSE": "TENSE",
E:767 / J:901 GUI.GAUGE.HANK.WARM
  "WARM": "WARM"
E:768 / J:904 GUI.GAUGE.DEVIANT.NAME
  "NAME": "SOFTWARE INSTABILITY",
E:769 / J:905 GUI.GAUGE.DEVIANT.MACHINE
  "MACHINE": "MACHINE",
E:770 / J:906 GUI.GAUGE.DEVIANT.DEVIANT
  "DEVIANT": "DEVIANT"
E:771 / J:909 GUI.GAUGE.ALICE.NAME
  "NAME": "ALICE",
E:772 / J:910 GUI.GAUGE.ALICE.DISTANT
  "DISTANT": "DISTANT",
E:773 / J:911 GUI.GAUGE.ALICE.WARM
  "WARM": "WARM",
E:774 / J:912 GUI.GAUGE.ALICE.CLOSE
  "CLOSE": "CLOSE",
E:775 / J:913 GUI.GAUGE.ALICE.FAMILY
  "FAMILY": "FAMILY",
E:776 / J:914 GUI.GAUGE.ALICE.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:777 / J:915 GUI.GAUGE.ALICE.TRUSTED
  "TRUSTED": "TRUSTED"
E:778 / J:918 GUI.GAUGE.LUTHER.NAME
  "NAME": "LUTHER",
E:779 / J:919 GUI.GAUGE.LUTHER.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:780 / J:920 GUI.GAUGE.LUTHER.CLOSE
  "CLOSE": "CLOSE",
E:781 / J:921 GUI.GAUGE.LUTHER.FAMILY
  "FAMILY": "FAMILY",
E:782 / J:922 GUI.GAUGE.LUTHER.TRUSTED
  "TRUSTED": "TRUSTED",
E:783 / J:923 GUI.GAUGE.LUTHER.WARY
  "WARY": "WARY"
E:784 / J:926 GUI.GAUGE.LEADER.NAME
  "NAME": "JERICHO",
E:785 / J:927 GUI.GAUGE.LEADER.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:786 / J:928 GUI.GAUGE.LEADER.REJECTED
  "REJECTED": "REJECTED",
E:787 / J:929 GUI.GAUGE.LEADER.RESPECTED
  "RESPECTED": "RESPECTED",
E:788 / J:930 GUI.GAUGE.LEADER.LEADER
  "LEADER": "LEADER",
E:789 / J:931 GUI.GAUGE.LEADER.NEGATIVE
  "NEGATIVE": "UNCERTAIN",
E:790 / J:932 GUI.GAUGE.LEADER.UNPOPULAR
  "UNPOPULAR": "UNPOPULAR",
E:791 / J:933 GUI.GAUGE.LEADER.ADMIRED
  "ADMIRED": "ADMIRED"
E:792 / J:936 GUI.GAUGE.NORTH.NAME
  "NAME": "NORTH",
E:793 / J:937 GUI.GAUGE.NORTH.LOVER
  "LOVER": "LOVER",
E:794 / J:938 GUI.GAUGE.NORTH.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:795 / J:939 GUI.GAUGE.NORTH.HOSTILE
  "HOSTILE": "HOSTILE",
E:796 / J:940 GUI.GAUGE.NORTH.FRIEND
  "FRIEND": "FRIEND",
E:797 / J:941 GUI.GAUGE.NORTH.RESENTFUL
  "RESENTFUL": "RESENTFUL",
E:798 / J:942 GUI.GAUGE.NORTH.COMPANION
  "COMPANION": "COMPANION"
E:799 / J:945 GUI.GAUGE.JOSH.NAME
  "NAME": "JOSH",
E:800 / J:946 GUI.GAUGE.JOSH.FRIEND
  "FRIEND": "FRIEND",
E:801 / J:947 GUI.GAUGE.JOSH.HOSTILE
  "HOSTILE": "HOSTILE",
E:802 / J:948 GUI.GAUGE.JOSH.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:803 / J:949 GUI.GAUGE.JOSH.RESENTFUL
  "RESENTFUL": "RESENTFUL",
E:804 / J:950 GUI.GAUGE.JOSH.COMPANION
  "COMPANION": "COMPANION"
E:805 / J:953 GUI.GAUGE.SIMON.NAME
  "NAME": "SIMON",
E:806 / J:954 GUI.GAUGE.SIMON.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:807 / J:955 GUI.GAUGE.SIMON.HOSTILE
  "HOSTILE": "HOSTILE",
E:808 / J:956 GUI.GAUGE.SIMON.FRIEND
  "FRIEND": "FRIEND",
E:809 / J:957 GUI.GAUGE.SIMON.RESENTFUL
  "RESENTFUL": "RESENTFUL",
E:810 / J:958 GUI.GAUGE.SIMON.COMPANION
  "COMPANION": "COMPANION"
E:811 / J:961 GUI.GAUGE.PUBLIC.NAME
  "NAME": "PUBLIC OPINION",
E:812 / J:962 GUI.GAUGE.PUBLIC.NEUTRAL
  "NEUTRAL": "INDIFFERENT",
E:813 / J:963 GUI.GAUGE.PUBLIC.HOSTILE
  "HOSTILE": "HOSTILE",
E:814 / J:964 GUI.GAUGE.PUBLIC.SUPPORTIVE
  "SUPPORTIVE": "SUPPORTIVE",
E:815 / J:965 GUI.GAUGE.PUBLIC.HATED
  "HATED": "HATED",
E:816 / J:966 GUI.GAUGE.PUBLIC.SCEPTICAL
  "SCEPTICAL": "SKEPTICAL",
E:817 / J:967 GUI.GAUGE.PUBLIC.SYMPATHETIC
  "SYMPATHETIC": "SYMPATHETIC"
E:818 / J:970 GUI.GAUGE.UNIT.POURCENT
  "POURCENT": "%",
E:819 / J:971 GUI.GAUGE.UNIT.M
  "M": "M"
E:820 / J:974 GUI.GAUGE.ZLATKO.RESET
  "RESET": "RESET",
E:821 / J:975 GUI.GAUGE.ZLATKO.PREPARING
  "PREPARING": "PREPARING MEMORY WIPE",
E:822 / J:976 GUI.GAUGE.ZLATKO.PROGRESS
  "PROGRESS": "MEMORY WIPE PROGRESS"
E:823 / J:979 GUI.GAUGE.STRESS.ALICE
  "ALICE": "ALICE'S STRESS"
E:824 / J:981 GUI.GAUGE.UNLOCK
  "UNLOCK": "PATH UNLOCKED",
E:825 / J:983 GUI.GAUGE.AMANDA.TRUSTED
  "TRUSTED": "TRUSTED",
E:826 / J:984 GUI.GAUGE.AMANDA.DISTRUSTED
  "DISTRUSTED": "DISTRUSTED",
E:827 / J:985 GUI.GAUGE.AMANDA.NEUTRAL
  "NEUTRAL": "NEUTRAL",
E:828 / J:986 GUI.GAUGE.AMANDA.BETRAYED
  "BETRAYED": "BETRAYED",
E:829 / J:987 GUI.GAUGE.AMANDA.NAME
  "NAME": "AMANDA"
E:3630 / J:5255 THOUGHTS.0901C.HANKCHANCES
  "HANKCHANCES": "HANK SURVIVAL PROBABILITY : 40%",
E:3841 / J:5486 THOUGHTS.0501K.MYNAMEISKARA01
  "MYNAMEISKARA01": "## ####*# ##.#+",
E:3842 / J:5487 THOUGHTS.0501K.MYNAMEISKARA02
  "MYNAMEISKARA02": "## ###3*# ##.r+",
E:3843 / J:5488 THOUGHTS.0501K.MYNAMEISKARA03
  "MYNAMEISKARA03": "M# ###3*# #@.r+",
E:3893 / J:5538 THOUGHTS.0501K.MYNAMEISKARA04
  "MYNAMEISKARA04": "M# #@#3*5 #@.r+",
E:3894 / J:5539 THOUGHTS.0501K.MYNAMEISKARA05
  "MYNAMEISKARA05": "M# #@m3*5 &a@.r+",
E:3895 / J:5540 THOUGHTS.0501K.MYNAMEISKARA06
  "MYNAMEISKARA06": "M# n@m3*5 &a.r+",
E:3896 / J:5541 THOUGHTS.0501K.MYNAMEISKARA07
  "MYNAMEISKARA07": "M# na@m3*s &a.r+",
E:3897 / J:5542 THOUGHTS.0501K.MYNAMEISKARA08
  "MYNAMEISKARA08": "M# na@me*s Kar+",
E:3898 / J:5543 THOUGHTS.0501K.MYNAMEISKARA09
  "MYNAMEISKARA09": "My name*s Kar+",
E:3899 / J:5544 THOUGHTS.0501K.MYNAMEISKARA10
  "MYNAMEISKARA10": "MY NAME IS KARA",
E:3901 / J:5546 THOUGHTS.0501K.TIMERALICE
  "TIMERALICE": "BEFORE 'LITTLE ONE' IS BROUGHT TO ZLATKO",
E:3902 / J:5547 THOUGHTS.0501K.TIMERALICENORESET
  "TIMERALICENORESET": "BEFORE ALICE IS BROUGHT TO ZLATKO",
E:3907 / J:5552 THOUGHTS.0501K.TIMERPROGRESSRESET
  "TIMERPROGRESSRESET": "PROGRESS",
E:4126 / J:5789 THOUGHTS.0501C.RISKHANK
  "RISKHANK": "CHANCE OF SURVIVAL: 89%",
E:4236 / J:5905 THOUGHTS.0801K.SUSPICION
  "SUSPICION": "HIDE DEVIANT EVIDENCES",
E:4238 / J:5908 THOUGHTS.0801K.EVIDENCES.0
  "0": "FIND DEVIANT EVIDENCE : 0/4",
E:4239 / J:5909 THOUGHTS.0801K.EVIDENCES.1
  "1": "FIND EVIDENCE OF DEVIANTS ( 1 LEFT)",
E:4240 / J:5910 THOUGHTS.0801K.EVIDENCES.2
  "2": "FIND EVIDENCE OF DEVIANTS ( 2 LEFT)",
E:4241 / J:5911 THOUGHTS.0801K.EVIDENCES.3
  "3": "FIND EVIDENCE OF DEVIANTS ( 3 LEFT)",
E:4242 / J:5912 THOUGHTS.0801K.EVIDENCES.4
  "4": "FIND EVIDENCE OF DEVIANTS ( 4 LEFT)",
E:4243 / J:5913 THOUGHTS.0801K.EVIDENCES.VALUE
  "VALUE": "DON'T AROUSE SUSPICION"
E:4263 / J:5934 THOUGHTS.0801K.SUSPICIONVAL
  "SUSPICIONVAL": "NO DEVIANT EVIDENCE LEFT",
E:4264 / J:5935 THOUGHTS.0801K.EVIDENCESVAL
  "EVIDENCESVAL": "DIDN'T AROUSE SUSPICION",
E:4269 / J:5940 THOUGHTS.0801K.TIMERPOLICE
  "TIMERPOLICE": "OPEN TO THE POLICE",
E:8597 / J:14460 MENU.FLOWCHART.02K.GC.TAKEGUN
  "TAKEGUN": "KARA HAS GUN",
E:8598 / J:14461 MENU.FLOWCHART.02K.GC.TODDDEAD
  "TODDDEAD": "TODD IS DEAD",
E:8599 / J:14462 MENU.FLOWCHART.02K.GC.GAMEOVER
  "GAMEOVER": "KARA & ALICE ARE DEAD",
E:8600 / J:14463 MENU.FLOWCHART.02K.GC.GUNUNLOCKED
  "GUNUNLOCKED": "GUN SEEN IN 'A NEW HOME'",
E:8601 / J:14464 MENU.FLOWCHART.02K.GC.WINDOWUNLOCKED
  "WINDOWUNLOCKED": "WAY OUT SEEN IN 'A NEW HOME'"
E:8897 / J:14780 MENU.FLOWCHART.03C.GC.ANDROID
  "ANDROID": "ANDROID SAVED IN 'THE INTERROGATION'"
E:8935 / J:14822 MENU.FLOWCHART.04C.GC.SCENEUNLOCKED
  "SCENEUNLOCKED": "SUSPECT FOUND IN 'PARTNERS'"
E:8954 / J:14845 MENU.FLOWCHART.08C.GC.PHOTOSEEN
  "PHOTOSEEN": "PHOTO SEEN IN 'RUSSIAN ROULETTE'"
E:9291 / J:15206 MENU.FLOWCHART.11C.GC.CONNORDEAD
  "CONNORDEAD": "CONNOR DIED IN 'PUBLIC ENEMY'",
E:9292 / J:15207 MENU.FLOWCHART.11C.GC.CHRISDEAD
  "CHRISDEAD": "COPS KILLED IN 'CAPITOL PARK'",
E:9293 / J:15208 MENU.FLOWCHART.11C.GC.CHRISSAVED
  "CHRISSAVED": "COPS SPARED IN 'CAPITOL PARK'"
E:9369 / J:15288 MENU.FLOWCHART.09C.GC.BROADCASTEMPLOYEE
  "BROADCASTEMPLOYEE": "KILLED DURING 'STATFORD TOWER'",
E:9370 / J:15289 MENU.FLOWCHART.09C.GC.PHONEGUARD
  "PHONEGUARD": "KILLED DURING 'STATFORD TOWER'",
E:9371 / J:15290 MENU.FLOWCHART.09C.GC.GUNGUARD
  "GUNGUARD": "KILLED DURING 'STATFORD TOWER'",
E:9372 / J:15291 MENU.FLOWCHART.09C.GC.SIMONHURTCORRIDOR
  "SIMONHURTCORRIDOR": "WOUNDED DURING 'STATFORD TOWER'",
E:9373 / J:15292 MENU.FLOWCHART.09C.GC.HOSTAGECOP
  "HOSTAGECOP": "SAVED DURING 'THE HOSTAGE''",
E:9374 / J:15293 MENU.FLOWCHART.09C.GC.ASSAULT
  "ASSAULT": "ATTACKED BY SWAT DURING 'STATFORD TOWER'",
E:9375 / J:15294 MENU.FLOWCHART.09C.GC.SIMONDIEDROOM
  "SIMONDIEDROOM": "DIED IN BROADCAST DURING 'STATFORD TOWER'",
E:9376 / J:15295 MENU.FLOWCHART.09C.GC.SIMONDIEDROOF
  "SIMONDIEDROOF": "DIED ON ROOFTOP DURING 'STATFORD TOWER'"
E:9446 / J:15369 MENU.FLOWCHART.08K.GC.LUTHERDEAD
  "LUTHERDEAD": "LUTHER DIED IN 'PIRATE'S COVE'"
E:9633 / J:15602 MENU.FLOWCHART.03A.GC.LEO
  "LEO": "CARL DETERIORATED AFTER LEO WAS HURT IN 'BROKEN'",
E:9634 / J:15603 MENU.FLOWCHART.03A.GC.CARL
  "CARL": "CARL DIED IN 'BROKEN'",
E:9635 / J:15604 MENU.FLOWCHART.03A.GC.CHURCH
  "CHURCH": "JERICHO WAS ATTACKED IN 'CROSSROADS'",
E:9636 / J:15605 MENU.FLOWCHART.03A.GC.MARKUS
  "MARKUS": "JERICHO LOST THEIR LEADER IN A PREVIOUS SCENE",
E:9637 / J:15606 MENU.FLOWCHART.03A.GC.HANK
  "HANK": "HANK QUIT THE FORCE",
E:9638 / J:15607 MENU.FLOWCHART.03A.GC.CONNORCHURCH
  "CONNORCHURCH": "CONNOR JOINED THE REVOLUTION IN 'CROSSROADS'"
E:9738 / J:15721 MENU.FLOWCHART.03K.GC.GUN
  "GUN": "GUN TAKEN IN 'STORMY NIGHT'"
E:9894 / J:15883 MENU.FLOWCHART.10M.GC.SIMONALIVE
  "SIMONALIVE": "SIMON SURVIVED IN 'PUBLIC ENEMY'",
E:9895 / J:15884 MENU.FLOWCHART.10M.GC.JOHNALIVE
  "JOHNALIVE": "JOHN JOINED IN 'SPARE PARTS'"
E:9983 / J:15976 MENU.FLOWCHART.12C.GC.CARLOSANDROID
  "CARLOSANDROID": "DIED IN PREVIOUS SCENES",
E:9984 / J:15977 MENU.FLOWCHART.12C.GC.JERICHO
  "JERICHO": "GOT INFORMATION IN 'PUBLIC ENEMY'",
E:9985 / J:15978 MENU.FLOWCHART.12C.GC.CARLOSANDROIDMEMORY
  "CARLOSANDROIDMEMORY": "USED FRIENDLY APPROACH IN 'THE INTERROGATION'",
E:9986 / J:15979 MENU.FLOWCHART.12C.GC.RUPERT
  "RUPERT": "COMMITTED SUICIDE IN 'THE NEST'",
E:9987 / J:15980 MENU.FLOWCHART.12C.GC.RUPERTDIARY
  "RUPERTDIARY": "FOUND IN 'THE NEST'",
E:9988 / J:15981 MENU.FLOWCHART.12C.GC.CARLOSANDROIDSTATUE
  "CARLOSANDROIDSTATUE": "FOUND IN 'PARTNERS'",
E:9989 / J:15982 MENU.FLOWCHART.12C.GC.TRACIS
  "TRACIS": "KILLED IN 'EDEN CLUB'",
E:9990 / J:15983 MENU.FLOWCHART.12C.GC.SIMON
  "SIMON": "KILLED IN 'PUBLIC ENEMY'",
E:9991 / J:15984 MENU.FLOWCHART.12C.GC.STARTFORDANDROID
  "STARTFORDANDROID": "KILLED IN 'PUBLIC ENEMY'"
E:10283 / J:16303 MENU.FLOWCHART.02A.C.GC.NEWCONNOR
  "NEWCONNOR": "CYBERLIFE WILL SEND A NEW CONNOR"
E:10410 / J:16438 MENU.FLOWCHART.02A.K.GC.MEETNORTH
  "MEETNORTH": "MARKUS DIED IN 'FREEDOM MARCH'",
E:10411 / J:16439 MENU.FLOWCHART.02A.K.GC.LUTHERDEAD
  "LUTHERDEAD": "LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'"
E:10539 / J:16571 MENU.FLOWCHART.02A.M.GC.MEETNORTH
  "MEETNORTH": "MARKUS DIED IN 'FREEDOM MARCH'"
E:10618 / J:16656 MENU.FLOWCHART.04A.CB.GC.CONNORDEAD
  "CONNORDEAD": "CONNOR DIED",
E:10619 / J:16657 MENU.FLOWCHART.04A.CB.GC.HANKDEAD
  "HANKDEAD": "HANK DIED",
E:10620 / J:16658 MENU.FLOWCHART.04A.CB.GC.CONNORHANKDEAD
  "CONNORHANKDEAD": "CONNOR & HANK DIED",
E:10621 / J:16659 MENU.FLOWCHART.04A.CB.GC.HANKSUICIDE
  "HANKSUICIDE": "HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'"
E:10762 / J:16804 MENU.FLOWCHART.04A.KA.GC.LUTHERDEAD
  "LUTHERDEAD": "LUTHER DIED",
E:10763 / J:16805 MENU.FLOWCHART.04A.KA.GC.ALICEINJURED
  "ALICEINJURED": "ALICE WAS INJURED",
E:10764 / J:16806 MENU.FLOWCHART.04A.KA.GC.KARADEAD
  "KARADEAD": "KARA DIED",
E:10765 / J:16807 MENU.FLOWCHART.04A.KA.GC.ALICEDEAD
  "ALICEDEAD": "ALICE DIED",
E:10766 / J:16808 MENU.FLOWCHART.04A.KA.GC.LUTHERALIVE
  "LUTHERALIVE": "LUTHER SAVED IN 'CROSSROADS'"
E:10850 / J:16896 MENU.FLOWCHART.04A.MB.GC.NORTHDEAD
  "NORTHDEAD": "NORTH DIED",
E:10851 / J:16897 MENU.FLOWCHART.04A.MB.GC.BOMB
  "BOMB": "TOOK DETONATOR IN ‘CROSSROADS’"
E:11001 / J:17051 MENU.FLOWCHART.04A.KB.GC.ALICEDEAD
  "ALICEDEAD": "ALICE DIED",
E:11002 / J:17052 MENU.FLOWCHART.04A.KB.GC.KARADEAD
  "KARADEAD": "KARA DIED",
E:11003 / J:17053 MENU.FLOWCHART.04A.KB.GC.RALPH
  "RALPH": "MET IN 'FUGITIVES'",
E:11004 / J:17054 MENU.FLOWCHART.04A.KB.GC.ZLATKO
  "ZLATKO": "FREED IN 'ZLATKO'",
E:11005 / J:17055 MENU.FLOWCHART.04A.KB.GC.LUTHER
  "LUTHER": "SAVED IN PREVIOUS SCENES"
E:11047 / J:17101 MENU.FLOWCHART.04A.CA.GC.CONNORDEAD
  "CONNORDEAD": "CONNOR DIED",
E:11048 / J:17102 MENU.FLOWCHART.04A.CA.GC.HANKDEAD
  "HANKDEAD": "HANK DIED",
E:11049 / J:17103 MENU.FLOWCHART.04A.CA.GC.HANKSUICIDE
  "HANKSUICIDE": "HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'"
E:11150 / J:17208 MENU.FLOWCHART.04A.MA.GC.JOSHDEAD
  "JOSHDEAD": "JOSH DIED",
E:11151 / J:17209 MENU.FLOWCHART.04A.MA.GC.SIMONDEAD
  "SIMONDEAD": "SIMON DIED",
E:11152 / J:17210 MENU.FLOWCHART.04A.MA.GC.NORTHDEAD
  "NORTHDEAD": "NORTH DIED",
E:11153 / J:17211 MENU.FLOWCHART.04A.MA.GC.SIMONSHOT
  "SIMONSHOT": "SIMON WAS SHOT",
E:11154 / J:17212 MENU.FLOWCHART.04A.MA.GC.NORTHSHOT
  "NORTHSHOT": "NORTH WAS SHOT",
E:11155 / J:17213 MENU.FLOWCHART.04A.MA.GC.MARKUSDEAD
  "MARKUSDEAD": "MARKUS DIED",
E:11156 / J:17214 MENU.FLOWCHART.04A.MA.GC.CONNORDEAD
  "CONNORDEAD": "CONNOR DIED",
E:11157 / J:17215 MENU.FLOWCHART.04A.MA.GC.NORTHLEADER
  "NORTHLEADER": "NORTH BECAME LEADER IN A PREVIOUS SCENE",
E:11158 / J:17216 MENU.FLOWCHART.04A.MA.GC.BOMB
  "BOMB": "TOOK DETONATOR IN 'CROSSROADS'"
```

### Executable website IF/ELSE audit

All TypeScript files were scanned for these executable branch tokens. Every matching source line is quoted below. These implement website navigation/settings/translation/rendering; none is a game save-state predicate. To inspect a full enclosing block, open the original file at the cited line.

```regex
\bif\s*\(|\belse\b|\bswitch\s*\(|case RelationType\.
```

```text
C/src/app/app.component.ts:39: if (event.key === 'l') {
C/src/app/app.component.ts:41: } else if (event.key === 'k') {
C/src/app/app.component.ts:43: } else {
C/src/app/app.component.ts:57: if (nextIndex === allLangs.length) {
C/src/app/app.component.ts:59: } else if (nextIndex < 0) {
C/src/app/chapters/pages/chapter/chapter.component.ts:57: if (currentItem !== null) {
C/src/app/chapters/pages/chapter/chapter.component.ts:86: if (portal !== null) {
C/src/app/chapters/pages/chapter/chapter.component.ts:103: if (!this.tocBottomSheetOpened()) {
C/src/app/chapters/pages/chapter/chapter.component.ts:117: if (clickedOutside || clickedInside) {
C/src/app/layout/lang-picker/lang-picker.component.ts:31: if (
C/src/app/shared/components/relation/relation.component.ts:32: switch (this.type) {
C/src/app/shared/components/relation/relation.component.ts:33: case RelationType.SmallUp:
C/src/app/shared/components/relation/relation.component.ts:38: case RelationType.LargeUp:
C/src/app/shared/components/relation/relation.component.ts:43: case RelationType.SmallDown:
C/src/app/shared/components/relation/relation.component.ts:48: case RelationType.LargeDown:
C/src/app/shared/services/chapter-navigation.service.ts:14: if (item === null) {
C/src/app/shared/services/chapter-navigation.service.ts:29: if (item === null) {
C/src/app/shared/services/chapter-navigation.service.ts:50: if (item === null) {
C/src/app/shared/services/chapter-navigation.service.ts:55: if (event.key == 'ArrowRight' && event.ctrlKey) {
C/src/app/shared/services/chapter-navigation.service.ts:59: } else if (event.key == 'ArrowLeft' && event.ctrlKey) {
C/src/app/shared/services/chapter-navigation.service.ts:63: } else {
C/src/app/shared/services/chapter-navigation.service.ts:70: if (newId === null) {
C/src/app/shared/services/chapter-navigation.service.ts:76: if (itemExists) {
C/src/app/shared/services/chapter-toc.service.ts:30: if (this.translationReady) {
C/src/app/shared/services/chapter-toc.service.ts:37: if (this.translationReady) {
C/src/app/shared/services/chapter-toc.service.ts:54: if (chapterContentNode === null) {
C/src/app/shared/services/chapter-toc.service.ts:74: if (new Set(items.map((i) => i.id)).size !== items.length) {
C/src/app/shared/services/goat-counter.service.ts:14: if (
C/src/app/shared/services/goat-counter.service.ts:28: if (this.allowLocal) {
C/src/app/shared/services/item-navigation.service.ts:32: if (item === null) {
C/src/app/shared/services/item-navigation.service.ts:43: if (item === null) {
C/src/app/shared/services/item-navigation.service.ts:61: if (idParam === null) {
C/src/app/shared/services/item-navigation.service.ts:69: if (item === undefined) {
C/src/app/shared/services/item-navigation.service.ts:80: if (item === null) {
C/src/app/shared/services/item-navigation.service.ts:85: if (event.key == 'ArrowRight') {
C/src/app/shared/services/item-navigation.service.ts:87: } else if (event.key == 'ArrowLeft') {
C/src/app/shared/services/item-navigation.service.ts:89: } else {
C/src/app/shared/services/item-navigation.service.ts:97: if (newId !== null && itemExists) {
C/src/app/shared/services/magazine.service.ts:344: switch (type) {
C/src/app/shared/services/theme-picker.service.ts:19: if (storedValue !== null) {
C/src/app/shared/services/theme-picker.service.ts:21: } else if (
C/src/app/shared/services/translation.service.ts:20: if (!this.translatedObjects.has(key)) {
C/src/app/shared/services/translation.service.ts:43: if (typeof value === 'string') {
```

## Closing implied-changes table

“No change” means no implementation edit is justified by this corpus pass. It does not endorse an unsourced calibration as an extracted game number. These rows cover all 67 open IDs exactly once.

| Item | Verdict | Exact benchmark action implied |
|---|---|---|
| [gauge-01](#gauge-01) | not settled | No change to start, spill, Neutral or Warm. |
| [gauge-02](#gauge-02) | not settled | No change to Alice bands or key threshold. |
| [gauge-03](#gauge-03) | not settled | No change to Trusted-to-Family width. |
| [gauge-04](#gauge-04) | not settled | No change. |
| [gauge-05](#gauge-05) | not settled | No change to first Friend. |
| [gauge-06](#gauge-06) | not settled | No change to Simon bands. |
| [gauge-07](#gauge-07) | not settled | No change. |
| [gauge-08](#gauge-08) | not settled | No change to truck magnitude. |
| [gauge-09](#gauge-09) | not settled | No change to +3 Sympathetic or the calibrated news magnitude. |
| [ch06-03](#ch06-03) | not settled | No change to the investigation action budget or post-10 behavior. |
| [ch09-01](#ch09-01) | partially | No change to four prompts. |
| [ch09-14](#ch09-14) | partially | No change to the exact ending gate. |
| [ch09-16](#ch09-16) | not settled | No change to Amanda's probe-route delta. |
| [ch10-18](#ch10-18) | partially | No change to ch10RobberyNews. Same unresolved producer as ch17-05. |
| [ch10-24](#ch10-24) | partially | No change to generator availability. |
| [ch10-34](#ch10-34) | not settled | No change to shelter availability/order. |
| [ch11-05](#ch11-05) | not settled | No change to encounter order. |
| [ch13-01](#ch13-01) | partially | No change pending interaction control. |
| [ch13-29](#ch13-29) | partially | No change to CHANGE CHANNEL availability. |
| [ch13-36](#ch13-36) | partially | No change to the breakfast-only producer. |
| [ch14-05](#ch14-05) | partially | No change to magazine or Zlatko report gates. |
| [ch15-12](#ch15-12) | not settled | No change to timeout ending or its calibrated deltas. |
| [ch15-14](#ch15-14) | partially | No change to cage-only gate. |
| [ch15-18](#ch15-18) | not settled | No change to nestRupert not-found exclusion. |
| [ch17-01](#ch17-01) | partially | No change to report priority or arrow count. |
| [ch17-02](#ch17-02) | partially | No change. No new death/risk branch from text alone. |
| [ch17-03](#ch17-03) | partially | No change to labelled action or 0.3 risk calibration. |
| [ch17-04](#ch17-04) | partially | No change to inputs.report-based memory eligibility. |
| [ch17-05](#ch17-05) | partially | No change. Duplicate producer with ch10-18; keep the memory consumer separately documented. |
| [ch17-06](#ch17-06) | not settled | No change to ch10RalphCarving gate. |
| [ch17-07](#ch17-07) | not settled | No change to upstairs.book/downstairs.rewash. |
| [ch19-02](#ch19-02) | partially | No change to M05n branch. |
| [ch19-03](#ch19-03) | not settled | No change to the explicitly calibrated 0.08 failure chance. |
| [ch23-01](#ch23-01) | partially | No change to guard-only Simon escape. |
| [ch23-02](#ch23-02) | partially | No change to M12 ending-based news tone or public opinion. |
| [ch25-01](#ch25-01) | partially | No change to DOG=2 or threshold=3. |
| [ch25-02](#ch25-02) | partially | No change to evidence weights/cutoff. |
| [ch25-03](#ch25-03) | partially | No change to +1 coffee omission/UPSET calibrations. |
| [ch25-04](#ch25-04) | not settled | No change to +1 open-door calibration. |
| [ch25-05](#ch25-05) | partially | No change to six/seven conversion; keep it explicitly calibrated. |
| [ch25-06](#ch25-06) | partially | No change to K15q gate. |
| [ch26-01](#ch26-01) | partially | No change to override without a controlled run. |
| [ch26-02](#ch26-02) | partially | No change to 60% offer cutoff. |
| [ch26-03](#ch26-03) | partially | No change to under-60%-peaceful classification. |
| [ch26-04](#ch26-04) | partially | No change. No unconditional meter reclassification is justified. |
| [ch26-08](#ch26-08) | partially | No change to per-object rewards. |
| [ch27-13](#ch27-13) | not settled | No change to fled-route CHRIS exclusion. |
| [ch28-01](#ch28-01) | partially | No change to above-Neutral Simon gate. |
| [ch28-04](#ch28-04) | partially | No change to direct fight after STAND ATTACK. |
| [ch28-06](#ch28-06) | partially | No change to PUSH universality or +1. |
| [ch28-07](#ch28-07) | partially | No change to group size 2 or threshold 10; both stay calibrations. |
| [ch28-08](#ch28-08) | not settled | No change to wiki-based separate gates. |
| [ch28-09](#ch28-09) | partially | No change until the requested control resolves it. |
| [ch29-01](#ch29-01) | partially | No change to sufficientEvidence. |
| [ch29-03](#ch29-03) | partially | No change to opening gate. |
| [ch29-05](#ch29-05) | partially | No change to 0.25 calibration or a deterministic miss cutoff. |
| [ch30-01](#ch30-01) | partially | No change. No replacement of the current cutoff from suffixes or prose alone. |
| [ch30-04](#ch30-04) | partially | No change to northLover persistence. |
| [ch30-05](#ch30-05) | partially | No change to aliceMax. |
| [ch30-06](#ch30-06) | partially | No change to luther=false on PROTECT ALICE. |
| [ch31-01](#ch31-01) | partially | No change without the unedited chapter boundary. |
| [ch31-03](#ch31-03) | partially | No change to Hank death handling. |
| [ch31-05](#ch31-05) | partially | No change to CHECK ON JOSH. |
| [ch32-02](#ch32-02) | partially | No change to Companion store access. |
| [ch32-03](#ch32-03) | partially | No change to bullet gate. |
| [ch32-04](#ch32-04) | partially | No change to rooftop LEAVE availability. |
| [ch32-05](#ch32-05) | partially | No change to the broader wiki-based RK900 gate. |

Research follow-ups for the orchestrator: preserve the distinction between evidence count and suspicion; annotate `LEADER` as Jericho’s string namespace when searching; keep North heart/store/bullet gates separate; retain the nested context on Alice below-WARM; do not convert ten restored-name strings to a memory threshold. These are documentation/measurement cautions, not requests to change code, conflicts or source records automatically.
