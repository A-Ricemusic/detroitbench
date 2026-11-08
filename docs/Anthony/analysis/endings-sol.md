# Endings and playthroughs — sol

Measured 2026-11-08 against a frozen **story 1.9.8**, **861 scenes**, **463 initial state fields**. Story-object SHA-256 (`storyHash`):

`5e55e2e4b579a0aed0ec772a35d629cee3fa6fc3b985ff40cc2906380c5ddcfb`

The working tree changed from 1.9.7 to 1.9.8 during this investigation. Results below use the later snapshot under `/tmp/sol-endings/snapshot/`; preliminary results against 1.9.7 are not mixed into the totals. Checkout HEAD was `1fe478f961345c9d6f959ae1fa00e7bac1cd8309`, with existing uncommitted changes. That commit alone does not reproduce this snapshot. The assembled story matched the chapter sources when checked. No benchmark, site, evidence, or other documentation files were changed.

## Headline results

| Definition | Computed result | What this establishes |
|---|---:|---|
| Implemented chapter ending **label catalogue**, summed over chapters | **166** | Exact catalogue size, deduplicating identical label text within a chapter. This is not 166 whole-game endings, nor a proof that every declared label is globally reachable. |
| Site ending taxonomy | **18 declared rows: 4 / 5 / 4 / 5** | Connor / Kara / Alice / Markus. |
| Outputs the current site classifier can actually produce | **16: 3 / 4 / 4 / 5** | Two declared rows are unreachable with the current engine's outcome strings and state handoffs; see below. Each remaining category has an engine-generated complete-run witness. |
| Reachable combinations of those four classifier outputs | **38 ≤ combinations ≤ 124** | Lower bound from complete runs; upper bound from source-level compatibility constraints. The exact total is unresolved. The naive product 400 is invalid. |
| Chapter 32 ending-label catalogue | **Connor 6; Kara 24; Markus 22** | 52 distinct labels. Alice has no parallel chapter-32 ending-label field; her separate site taxonomy has four rows. |
| After-credits **scene sets** BF08–BF13 | **10 ≤ sets ≤ 12** | Coarse narrative signatures, excluding attitudes and earlier chapter history. |
| Those scene sets plus the hostess's final choice | **20 ≤ signatures ≤ 24** | P01 is always offered and has two actions. This is a defensible coarse ending definition, but it omits most narrative detail. |
| Report-level full-story ending projection | **at least 350** | Distinct outcome prose, ending flags, displayed attitudes, finale scenes, and hostess result. Exact total unresolved. |
| Complete ordered sequences of `(scene, choice)` | **Countably infinite (ℵ₀)** | Exact, with a reachable, repeatable, exitable engine-state cycle and completed suffix. Holds even without distinguishing risk outcomes. |
| Complete paths treated as **sets** of `(scene, choice)` | **91,906,463,599,465,104,565,862,400,000 ≤ paths ≤ 2²⁶¹⁷** | Approximately **9.19 × 10²⁸ to 6.24 × 10⁷⁸⁷**. These are rigorous but very wide bounds, not a tight enumeration. |
| Literal retained `finalState` objects | **at least 91,906,463,599,465,104,565,862,400,000** | Same constructed family gives distinct retained choice maps. Exact total unresolved; no numerical upper bound established here. |

For human discussion I would use **a combination of the protagonists' semantic outcomes, finale scenes, and displayed attitudes** as “an ending.” I would not report 166, 18, or the Cartesian product of chart rows as the number of whole-story endings. This investigation does **not** establish an exact total under that preferred definition. Its exact global result is that the brief's ordered-playthrough count is infinite, not merely astronomically large.

## Why the playthrough count is infinite

The engine permits this loop in Public Enemy:

1. At `C14`, choose `2`: tell Hank you have seen everything.
2. At `C14y`, choose `1`: **NO**, have another look around.
3. `returnTo: "C14"` returns to the broadcast-room menu.

`C14:2` requires that the roof has been visited, but has no once-only clue flag. `C14y:1` restores `ch24Phase='room'`; there is no attempt counter, timer, or exhaustion gate. Both choices are risk-free.

I reached this loop from `startState`, through **468 preceding records**. After one stabilizing lap, a further lap returns to an **identical full engine state**, including `choices`, `rolls`, and knowledge-array order, at the same cursor. I then replayed completed paths with **646, 648, 650, and 666 records**. All four finished and had identical final-state hash:

`79c7ee069c60253454adad471deaa75522006942cc232a5d4e8062c7a9f3b1ae`

Every extra lap gives a different finite sequence; YES at `C14y` exits. Hence there are at least countably many complete paths. A finite action alphabet has only countably many finite words, giving the matching upper bound. The proof is in `proof.mjs`, `loop.json`, and `verified-cycle.json`.

This is a reachability result, not a claim that a normal player would repeat the conversation indefinitely. A fixed controller record limit would change it; no such limit is part of the engine path definition in the brief. Nonterminating infinite executions are not counted.

## What the ending charts actually classify

The declared rows are:

- Connor: Free, Controlled, Machine, Deactivated.
- Kara: Canada, Survived, Left Alice, Captured, Died.
- Alice: Canada, Survived, Captured, Died.
- Markus: Peaceful win, Uprising won, Survived, Cast out, Died.

The classifier is in `scripts/prepare.mjs:52`, and the row definitions are in `src/components/Charts.jsx` and `src/components/EndingCharts.jsx`. Two distinctions matter:

**Connor's Controlled row is unreachable in the current classifier.** It tests Connor's ending prose for `/controlled|regained control|submitted/i`. The engine instead writes “Amanda took control …”, “CyberLife controls the leader …”, and “secretly obeying CyberLife.” None matches. For a surviving deviant these paths are therefore classified **Free**, including the witnessed loss-of-control paths. The word “controlled” in the assassination ending is in **Markus's** outcome, not Connor's. This is a classification mismatch, not an absent narrative branch.

**Kara's Survived row is unreachable under the current handoffs.** A surviving active Kara ends with `border=true` or `karaRoute='camp'`; earlier abandonment/reset sets `karaActive=false`. The classifier checks Canada, Left, and Captured before its fallback “alive.” Camp escape and camp liberation retain `karaRoute='camp'`, so even a free camp survivor is classified Captured. The Alice “alive” row remains reachable: the low-bond witness abandons her at Jericho with `aliceMax=0`, `K31:0`, Kara inactive, and Alice alive outside a camp route.

Thus the exact current classifier range is **3 / 4 / 4 / 5**. I have not silently repaired these rules to match the prose definitions.

The **124** upper bound is computed in `ending-bounds.mjs`. The possible Kara/Alice row pairs are restricted to:

`(died,died), (died,canada), (died,captured), (canada,canada), (canada,died), (captured,captured), (captured,died), (left,alive), (left,died), (left,captured)`.

Machine Connor cannot coexist with the final Peaceful win row: the victory-crowd confrontation either kills Markus or leads to refusal and the Free row. In addition, `(captured,died)` and `(left,captured)` require camp liberation: Markus must end Uprising won, or die in the later assassination. Enumerating the remaining category tuples gives 124. This is an upper bound, not an assertion that every surviving tuple is reachable.

For the after-credits upper bound, BF08, BF09, BF11, and BF13 are mutually exclusive. BF10 cannot coexist with BF11, BF12, or BF13; BF12 cannot coexist with BF13. These follow from Connor's mode/aliveness, Markus's leadership/aliveness, and Kara's reset versus abandonment route. Enumerating subsets under those restrictions gives 12. Ten were observed on completed engine paths. Applying both P01 choices doubles the count.

## Distinctness and full end states

The 166 count is a **catalogue of label strings** extracted from the chapter modules, rules, and engine assignments. Null/unplayed chapters are not extra ending labels. Chapters 2, 3, and 4 have no stored ending-label field; chapter 33 stores `chloeFree` rather than a chapter ending label. “Thin Ice” counts because chapter 31 actually writes it to its ending field, although it is also described as a checkpoint.

A label is not always a chart-node identity. Crossroads has **30 explicit card IDs**: Kara 11, Markus 10, Connor 9. These collapse to **7 / 7 / 4 lane-qualified labels**, or **17 distinct texts**, because “CONNOR KILLED MARKUS” occurs in two lanes. Chapter 32 retains 3 rooftop card IDs, 8 tower card IDs, and 15 camp card IDs; some share labels. Kara's leaving-route and Markus's other endings are not all retained under equivalent card-ID fields. I therefore do not invent one uniform game-flowchart-node total from the label catalogue.

Nor is the site's flowchart catalogue itself a sufficient count: its extraction misses Eden Club's helper-assigned endings, excludes the one-word RETREAT label, and admits the incomplete literal “ZLATKO KILLED KARA IN THE ” from a string concatenation. `catalogue.mjs` selects the actual ending exports/assignments and handles those cases explicitly.

The report-level projection used for the **350** witnessed full endings contains:

- The report's three rendered ending descriptions, including its unresolved/liberated fallbacks.
- Peaceful strategy, contamination, Kara-in-Canada, and Alice-in-Canada flags, using the report's river-arrival rule.
- All displayed final attitudes from the engine's `attitudes()` function, at **level** granularity, including Dead/Never met.
- The finale/epilogue scene IDs reached (`BF01`–`BF16`, `C27`–`C29`, `P01`) and `chloeFree`.

Different numeric scores within the same displayed level do not split this projection. Different BF08–BF13 scene sets do. Raw rolls and reason text do not. The 350 figure is a deduplicated lower bound from saved complete witnesses and their two P01 variants; it is not a sample-size estimate of the total.

Literal `finalState` is much finer: it retains chapter history, last choices, numeric scores, knowledge and its ordering, and rolls. It is not synonymous with a narrative ending, and is not equivalent to a complete path because repeated choices overwrite earlier visits.

## Counting method and the finite bounds

All traversals import the frozen engine's **`startState`, `blocked`, `available`, `apply`, and `nextCursor`**. `skipBlocked` is private, so `core.mjs` implements its loop using exported `blocked`. Full replay checks use **`current`**, which applies the engine's own finalization. The cheap sampling finalizer was separately checked against complete `current` replays.

`frozen-dp.mjs` performs DFS/dynamic programming over `(cursor, projected engine state)`. It canonicalizes object-key order, retains every changed mechanical state field, and retains choice references needed by chapter logic, exclusion menus and interrupts. It drops irrelevant knowledge text while retaining the knowledge predicates actually read by gates (rA9, garden stone); rolls are represented by transition outcomes rather than arbitrary numeric values. Dynamic choice lookups are handled conservatively by retaining that chapter's choices. Equal states merge with **BigInt** path weights; an active-stack repeat detects a cycle. Each chapter starts from a saved **reachable incoming state**, not an invented fixture.

This is **conditional per-chapter DP**, not a globally exhaustive state traversal. A five-second cap per chapter leaves partial lower bounds in the table. Completed subtrees contribute their exact path weights; unexpanded frontiers contribute zero. Chapter 17's preliminary risk partition was finer than its semantic outcomes, so its capped DP weight is deliberately not presented as a valid semantic-path lower bound. Chapter 19 was rerun with its exact three-way threat split; its capped result is still a lower bound. The six small chapters in `small.mjs` were also enumerated without state projection, checking both path and set counts independently.

Risk is counted by **outcome**, not by probability or a decimal roll value, for the local DP column. Some options have more than two mechanically distinct outcomes: The Nest and Zlatko subdivide failure at half the risk, and Spare Parts subdivides the threat at 0.1. The sampling survey uses explicit representative rolls and checks every offered action. The path model treats each engine-allowed risk outcome as a possible transition, as the brief permits; it does not enumerate UUIDs or prove that every joint outcome pattern is induced by one controller run ID. Numerical roll representatives themselves are not extra path identities. The literal-state lower bound uses retained choices, not variation in raw roll values. For the global infinity proof, risk conventions make no difference. For the global finite set bound below, outcomes are **not** an extra identity: it counts only `(scene, choice)` sets. If outcomes are added to the alphabet, its upper exponent must be recomputed.

The finite lower bound is constructive. `neutral.mjs` found **62 once-visited scenes** on one completed path with alternative actions that have identical mechanical successor states and knowledge predicates. It excludes scene IDs read elsewhere by transition logic, using a conservative source dependency scan. Knowledge text itself can vary. Since no future transition reads those alternative choice values, the alternatives compose independently along this **one** suffix. Their product is:

`45,953,231,799,732,552,282,931,200,000`.

P01 independently doubles this to **91,906,463,599,465,104,565,862,400,000**. Each member differs at a once-visited scene, so its action set differs and its retained `choices` map differs. This proves the same lower bound for unordered action sets and literal final states. Twelve composed alternatives were independently replayed through `current`; the dependency argument, not twelve samples, justifies the full product. This is the only multiplicative independence claim used globally.

For the set upper bound, the story supplies **2,617 possible `(scene, choice)` identities**, counting event Continue, each media item, all, and skip with their maximum possible availability. Any path maps to a subset of that finite alphabet, so **2²⁶¹⁷** is a sound upper bound even though many subsets are invalid. It relaxes every gate; it is intentionally loose. This investigation does not meet a demand for a *tight* finite bound on the unordered count, nor establish an exact raw-state count.

Ignoring **order but retaining multiplicity** means multisets, not sets: the repeatable NO loop still makes that count infinite. Truly using sets discards repeated identical actions as well as order, and makes the count finite.

## Per-chapter ending labels and branch counts

“DP” is the number of **outcome-distinguished ordered chapter paths from entry seed 0 for that chapter**. An unadorned integer is exact for that incoming state; ≥ is a partial lower bound. These are not maxima over all possible chapter inputs. In particular, chapter 31's one path is the North-led incoming route, not a claim that Night of the Soul has one branch. Do not multiply this column.

“Observed seq / sets” counts unique **choice-only** chapter traces among the 180 saved complete witnesses used by `summary.mjs`; an empty trace is included when that chapter was skipped. The 600-suffix survey is additional reachability evidence, not included wholesale in this saved-witness column. “Set upper” is the gate-relaxed per-chapter alphabet bound. End-label counts include declared labels beyond those encountered in these witnesses.

| Ch. | Chapter | Ending labels | Conditional DP | Observed seq / sets | Set upper |
|---:|---|---:|---:|---:|---:|
| 1 | The Hostage | 6 | ≥ 4,254 | 39 / 38 | 2^75 |
| 2 | Opening | 0 | 1 | 1 / 1 | 2^2 |
| 3 | Shades of Color | 0 | 552 | 20 / 20 | 2^19 |
| 4 | A New Home | 0 | ≥ 21,730 | 63 / 63 | 2^58 |
| 5 | The Painter | 1 | 42,120 | 34 / 34 | 2^57 |
| 6 | Partners | 2 | ≥ 838 | 62 / 45 | 2^61 |
| 7 | Stormy Night | 8 | 248 | 34 / 34 | 2^47 |
| 8 | Broken | 2 | 80 | 18 / 18 | 2^20 |
| 9 | The Interrogation | 4 | ≥ 253,526 | 57 / 57 | 2^146 |
| 10 | Fugitives | 3 | ≥ 4,918 | 41 / 39 | 2^101 |
| 11 | From the Dead | 1 | 10,479 | 47 / 15 | 2^19 |
| 12 | Waiting for Hank… | 2 | ≥ 73,536 | 97 / 94 | 2^111 |
| 13 | On the Run | 7 | ≥ 11,937 | 54 / 54 | 2^132 |
| 14 | Jericho | 1 | 128 | 38 / 38 | 2^25 |
| 15 | The Nest | 4 | ≥ 59,199 | 111 / 105 | 2^77 |
| 16 | Time to Decide | 1 | ≥ 7,693 | 57 / 42 | 2^24 |
| 17 | Zlatko | 5 | capped | 56 / 56 | 2^59 |
| 18 | Russian Roulette | 1 | ≥ 34,243 | 102 / 102 | 2^61 |
| 19 | Spare Parts | 3 | ≥ 786 | 30 / 30 | 2^29 |
| 20 | The Eden Club | 4 | ≥ 1,911 | 83 / 83 | 2^170 |
| 21 | The Pirates’ Cove | 1 | ≥ 323,116,162 | 40 / 40 | 2^80 |
| 22 | The Bridge | 2 | 61,440 | 60 / 60 | 2^49 |
| 23 | The Stratford Tower | 3 | ≥ 850 | 69 / 69 | 2^54 |
| 24 | Public Enemy | 8 | ∞ | 133 / 132 | 2^90 |
| 25 | Midnight Train | 3 | ≥ 6,530 | 42 / 42 | 2^87 |
| 26 | Capitol Park | 6 | ≥ 1,009 | 128 / 127 | 2^68 |
| 27 | Meet Kamski | 2 | ≥ 1,277 | 130 / 129 | 2^41 |
| 28 | Freedom March | 7 | ≥ 1,331 | 136 / 136 | 2^84 |
| 29 | Last Chance, Connor | 5 | ≥ 342,999 | 151 / 149 | 2^126 |
| 30 | Crossroads | 17 | 2,400 | 120 / 120 | 2^157 |
| 31 | Night of the Soul | 5 | 1 | 77 / 73 | 2^86 |
| 32 | Battle for Detroit | 52 | ≥ 3,081 | 168 / 161 | 2^400 |
| 33 | Epilogue · menu Chloe | 0 | 2 | 2 / 2 | 2^2 |

**Sum of chapter ending labels: 166.** This sum is over chapters, not over combinations of chapter results.

The independent small-chapter sequence/set counts are: ch02 **1/1**, ch03 **552/216**, ch07 **248/248**, ch08 **80/80**, ch14 **128/128**, and ch33 **2/2**, all conditional on the saved incoming state. The ch03 difference directly demonstrates why hub order matters even without the infinite loop.

## Three modelling choices that dominate the answer

1. **Sequences, multisets, or sets.** Keeping repeated hub visits gives ℵ₀ complete playthroughs. Dropping repetitions as well as order gives a finite set count, with the constructive lower bound above. Optional read/skip and per-item choices remain decisions even when they do not change the ending.
2. **Narrative outcomes versus the current site's classifier.** The declared 18 rows become 16 actual outputs because of the Controlled and Kara Survived mismatches. Shared labels also merge distinct card nodes. Correcting those rules would change the classification totals and combination bounds without adding story branches.
3. **Ending projection, including attitudes and risk identity.** Adding displayed attitude levels splits narrative endings; adding raw score values, knowledge ordering, choice history or numeric rolls splits retained states much further. Risk thresholds also affect reachable outcomes and later gates; numerical calibration alone does not multiply paths unless it changes the transition structure.

## Reproduction artifacts and limits

Everything authored for the computation is under `/tmp/sol-endings/`. Principal scripts:

- `core.mjs`: frozen story/engine loader and traversal helpers.
- `catalogue.mjs`: chapter label catalogue and source fingerprints; `catalogue.json` includes all extracted labels.
- `sample.mjs`, `adapt.mjs`, `late.mjs`, `low-bond.mjs`: complete engine paths and saved reachable inputs. Adaptation of old records is only a choice policy; old evidence is never treated as valid under the new engine without executing its available actions.
- `frozen-dp.mjs`, `small.mjs`: conditional state-deduplicated DP and independent small-chapter enumeration.
- `proof.mjs`: full-state cycle and completion replay.
- `neutral.mjs`, `bounds.mjs`: constructive path/state family, dependency exclusions, and composition checks.
- `ending-bounds.mjs`: category-tuple and after-credits compatibility enumeration.
- `summary.mjs`: deduplicated classifier outputs and report-level full endings.

Useful result files: `verified-cycle.json`, `neutral-family.json`, `neutral-validation.json`, `frozen-dp-results.jsonl`, `small-results.json`, `ending-bounds.json`, `summary.json`, and `late-results.json`. The JSONL DP file retains both chapter-19 attempts; use its **last** row for chapter 19. Earlier unqualified `dp*` logs and the preliminary 1.9.7 inventory are exploratory, not the reported snapshot's totals.

Example read-only reruns: `bun /tmp/sol-endings/proof.mjs`, `bun /tmp/sol-endings/catalogue.mjs`, `bun /tmp/sol-endings/ending-bounds.mjs`, `bun /tmp/sol-endings/small.mjs`. DP caps are time based, so partial lower bounds can vary between reruns; completed exact counts and the cycle proof should not. The snapshot and generated witness JSONs are retained so the report does not depend on later working-tree edits.

The broad 38–124 category bound, 20–24 coarse epilogue bound, and ≥350 report-level endings remain incomplete reachability enumerations. The finite unordered bounds are wide. No chapter-independence assumption has been used to disguise those gaps as an exact global result. The literal final-state lower bound and the infinite ordered-path count are constructive proofs.
