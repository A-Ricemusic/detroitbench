# Endings and playthroughs — Sol, story 1.9.10

Computed from a frozen copy of **story 1.9.10**, **861 scenes**, **463 initial state keys**. Story-object SHA-256: `717d85438b1413aca4a33e5eccfec1231952dce0c5090ab131d2709706f3db1a`. Snapshot and every authored script/result are in `/Users/pelicannurse/.t3/detroitbench-tools/sol-endings-1.9.10/`. The earlier report calls its own snapshot **1.9.8**, despite the task referring to it as 1.9.9. No old witnesses or numbers were accepted without recomputation. A final comparison found one concurrent source edit: a documentation path inside a scales.mjs comment changed from docs/research/ch04-a-new-home.md to docs/research/chapters/ch04-a-new-home.md. Engine, chapter and scale behavior remained identical; the exact lexical diff and 66 source fingerprints are saved in concurrent-comment-change.diff and source-check.json.

**This is an incomplete global enumeration.** The exact catalogue, 17-category range, 12 after-credits sets, finite-cycle audit, constructive lower bounds, conditional chapter counts and explicit finite upper bounds below are computed; the requested tight global bounds and exact reachable ending/end-state totals have not been established. The chapter-local search has not combined every reachable incoming cross-chapter state. A conditional chapter count is not a global count or an independence claim.

| Definition | Recomputed result | Qualification |
|---|---:|---|
| Chapter ending-label catalogue, summed | **166** | Exact declared label catalogue; not proof all labels are globally reachable |
| Chapter 32 labels by protagonist | **Connor 6 / Kara 24 / Markus 22** | 52 lane-qualified labels; Alice has no parallel stored ending-label field |
| Site declared rows, Connor / Kara / Alice / Markus | **4 / 5 / 4 / 5** | 18 rows, product 400 before compatibility |
| Reachable site categories | **4 / 4 / 4 / 5** | 17 total; each category witnessed; Kara Captured impossible |
| Site-category combinations | **45 ≤ combinations ≤ 228** | Lower bound from completed engine traversals; upper from engine invariants enumerated in ending-bounds.json |
| BF08–BF13 scene sets | **12** | Exact: all 12 compatible sets have complete current() witnesses |
| Those sets plus P01 choice | **24** | P01 always offers two actions |
| Full report-level endings | **≥ 2084** | Completed signatures with both P01 values; see projection caveat below |
| Ordered complete paths, choice/outcome distinguished | **20678954309879648527319040000000 ≤ paths ≤ U** | Finite; U has 1619 decimal digits |
| Unordered sets of (scene, choice) | **20678954309879648527319040000000 ≤ sets ≤ V** | V has 622 decimal digits; wide, not tight |
| Literal retained final states, controller roll alphabet | **20678954309879648527319040000000 ≤ states ≤ W** | W = U × 2^(32 × 87); wide, not exact |

Here **U**, **V**, and **W** are the exact computed integers in `summary.json` and `cycles.json`; their constructive product definitions are below. Lower bound order of magnitude: **2.0678 × 10^31**, tens of nonillions. Upper bounds are approximately **2.0587 × 10^1618**, **1.2557 × 10^621**, and **2.4049 × 10^2456** respectively. These intervals must not be described as tight. The old countably-infinite ordered-path result is false for this snapshot.

For discussing narrative endings, I would use protagonist outcome prose, finale scenes, and displayed attitude levels, rather than a sum of chapter labels or raw historical state. The exact total under that definition remains unresolved.

## What changed from the older analysis

The NO action at C14y now requires `ch24NoOnce=false` and sets it true; YES ends the chapter. The frozen snapshot includes all current ch17/18/19/23/24/29 arrow, text and gate changes, rather than applying a correction to an old total. `input-changes.diff` records the working-tree chapter changes relative to the recorded HEAD. C14y's own adaptation note dates the once-only rule to **1.9.9**; it is present in this 1.9.10 snapshot.

The site classifier in the current `scripts/prepare.mjs` also differs from the old report. Connor's control-loss prose now matches the Controlled row. Camp escape/liberation cards 4, 7, 10, 11, 14 and 15 now avoid the Captured classification. Thus the old proof that only 16 categories could be produced is obsolete. Declared rows remain 18, but **Kara Captured is now unreachable**, leaving **17 reachable categories: 4 / 4 / 4 / 5**. Camp card 1 sets Kara inactive (Left Alice); cards 2, 3, 5, 6, 8, 9, 10, 11, 12 and 13 kill Kara; cards 4, 7, 14 and 15 count as campFree (Survived). Earlier permanent Kara exits are inactive or dead, and the completed leaving route uses border. This exhausts ways a surviving active Kara could retain karaRoute=camp. All 17 remaining categories have complete-run witnesses. Witnessed values are `{"connor":["free","controlled","machine","deactivated"],"kara":["alive","left","died","canada"],"alice":["died","captured","canada","alive"],"markus":["uprising won","died","peaceful win","alive","cast out"]}`. Narrative geography and classifier Canada are still different: the report recognizes the river-arrival rule as well as `border`, whereas the classifier tests `border`.

## Engine traversal and risk model

`core.mjs` imports the frozen **startState, blocked, available, apply, nextCursor, current**. Private skipBlocked is reproduced by repeatedly calling exported blocked. Choice availability is recalculated at every visit; skipped scenes are not choices. Event Continue and media per-item/all/skip actions are included. Complete saved witnesses are replayed through **current**, which invokes the actual finalizer; `validate.mjs` compares the entire returned state with the traversal's final state. These are research witnesses outside data/experiences, not fabricated benchmark evidence. `adapt.mjs` uses older records only as a proposed choice policy and reexecutes all availability, consequences, gates and rolls against 1.9.10.

The ordered local DP distinguishes mechanically different risk outcomes, not numerical roll representatives. Representatives partition at risk, risk/2 for ch15 and ch17, and 0.1 for ch19; duplicate resulting state/event/failure classes are removed. Some options therefore have three outcomes. Dynamic ch32 assault risk is obtained from available(), rather than the authored raw option. These counts concern the engine transition relation; they do not prove that every joint outcome assignment is realized by a single UUID's deterministic roll stream. The choice-only ordered count has the same constructive lower bound and is at most U.

Literal retained state includes numeric rolls, choices, numeric scores and knowledge-array order. For W the controller's rollFor has **2^32** possible values at each scene; `apply` called with arbitrary JavaScript doubles is a different raw-state universe. Report signatures exclude raw rolls, reasons, knowledge ordering and numeric differences within one attitude level.

## Constructive global lower bound

`neutral-actual.mjs` replays saved complete witnesses and finds once-visited scenes whose alternatives have identical mechanical successors and identical future-read knowledge predicates. It conservatively excludes scene IDs read by later choice logic, excludeChosenAt, interrupts and JSON requirements. Dynamic C12p menus are also excluded. Knowledge predicates preserved are rA9, garden/magic stone/hand print and emergency exit. The family uses one actual fixed UUID and the controller's rollFor at the controller's one-based steps. All alternatives preserve scene visits and step positions, so every risky step keeps the same actual hash-derived roll. The checked family in `neutral-actual.json` contains **64 scenes**, whose alternative-count product is **10339477154939824263659520000000**. Each combination can follow the same completed suffix. Both P01 choices independently double the family to **20678954309879648527319040000000**.

Every member differs at a once-visited scene, so the family injects into ordered traces, unordered action sets, and retained choices maps in finalState. This is the sole globally multiplied independence family here. Twelve composed substitutions were replayed through current and their roll values were checked against rollFor for that same UUID; source dependency exclusion plus successor equivalence, rather than twelve samples, supports the whole product. The differing fact text is never treated as mechanically irrelevant without checking the predicates above.

## Finite upper bounds and cycle audit

`cycles.mjs` searches the entire syntactic control-flow graph formed by next edges, repeatWhile self-edges, interrupt edges and returnTo edges. These are all sources of backward movement in nextCursor; gate skipping only moves forward. There are **76 repeatable hubs**, **20 returnTo edges**, and **72 cyclic SCCs**. Syntactic cycles remain; no unbounded executable cycle was found in the source audit. The ranking table below explains what bounds every hub, including several custom hubs that do not use clueState. Clue sets and timers establish termination; absence of a repeated state in a sample would not establish it.

For each SCC, let `m=1+sum(hub visit bounds in that SCC)`; each node in that component is assigned cap m, and an acyclic node cap 1. Every backward transition consumes a listed finite resource or completes a bounded interrupt. Let a_n be the number of distinct authored choice IDs (media and events included), and b_n the maximum number of action/outcome symbols, using up to three outcomes for risky ch15/17/19 actions. A complete trace is recoverable deterministically from the queue of action/outcome symbols consumed at each scene. Consequently:

- **U = ∏_n Σ_{k=0}^{cap_n} b_n^k**. This relaxes every gate and many local restrictions.
- **V = ∏_n (a_n+1)** on cap-1 nodes, times **∏_n 2^{a_n}** on repeat-cap nodes. This is a gate-relaxed set upper bound, improved over the earlier blanket 2^alphabet bound. The current distinct-pair alphabet has **2605** entries; duplicated phase-dependent option IDs count once.
- **W = U × 2^(32R)**, R=87 risky scene IDs: replace each representative outcome with any possible retained controller roll at that scene. This deliberately overcounts impossible roll combinations.

The exact integers and per-chapter factors are saved in cycles.json. Multiplying these upper factors is safe because gates have been relaxed, not because chapters are independent. These are finite rigorous outer bounds conditional on the audited visit caps, **not** the requested tight chapter-kernel combination.

| Chapter | Hub | Audited visit cap (often conservative) | Finite resource / exit |
|---:|---|---:|---|
| 1 | C02i | 6 | hostageActions reaches maxActions=6; each clue once; terrace exits |
| 3 | M00d | 6 | engine removes every consumed clue; 6 clue flags |
| 4 | K01a | 9 | engine removes every consumed clue; 9 clue flags |
| 4 | K01d | 8 | engine removes every consumed clue; 8 clue flags |
| 6 | C05h | 21 | item flags ch06Clues only grow; search and extension clocks bound earlier exit |
| 6 | C05 | 7 | five advancing quiz steps and at most two nonterminal mistakes |
| 10 | KF02 | 26 | nightLength=19 plus at most seven pending indoor/dialogue actions |
| 10 | R10 | 2 | at most one first-entry media interrupt in each of laundromat and store; hub action clears media flag |
| 11 | M03g | 8 | engine removes every consumed clue; 8 clue flags |
| 12 | C08c | 3 | engine removes every consumed clue; 3 clue flags |
| 12 | C08i | 17 | engine removes every consumed clue; 17 clue flags |
| 12 | C08t | 7 | engine removes every consumed clue; 7 clue flags |
| 12 | C08u | 7 | engine removes every consumed clue; 7 clue flags |
| 13 | K09l | 9 | lot flags and last/pending dialogue; no action can be repeated |
| 13 | K09m | 8 | room flags and one pending Alice dialogue |
| 13 | K09q | 7 | squat flags and one Ralph dialogue |
| 13 | K09u | 5 | upstairs flags and one Alice dialogue |
| 13 | C09q | 7 | search flags and exit |
| 15 | C10c | 5 | engine removes every consumed clue; 5 clue flags |
| 15 | C10e | 3 | engine removes every consumed clue; 3 clue flags |
| 15 | C10f | 8 | engine removes every consumed clue; 8 clue flags |
| 15 | C10o1 | 16 | engine removes every consumed clue; 16 clue flags |
| 16 | MTD4 | 8 | engine removes every consumed clue; 8 clue flags |
| 17 | K12 | 26 | engine removes every consumed clue; 25 clue flags; nonclue actions exit or consume the chapter budget |
| 18 | C11f | 8 | engine removes every consumed clue; 8 clue flags |
| 18 | C11h | 6 | engine removes every consumed clue; 6 clue flags |
| 18 | C11m | 8 | engine removes every consumed clue; 8 clue flags |
| 21 | K14b | 8 | engine removes every consumed clue; 8 clue flags |
| 21 | K14e | 5 | engine removes every consumed clue; 5 clue flags |
| 21 | K14g | 5 | engine removes every consumed clue; 5 clue flags |
| 21 | K14j | 3 | engine removes every consumed clue; 3 clue flags |
| 21 | K14l | 8 | engine removes every consumed clue; 8 clue flags |
| 21 | K14m | 6 | engine removes every consumed clue; 6 clue flags |
| 24 | C14g | 7 | engine removes every consumed clue; 6 clue flags; nonclue actions exit or consume the chapter budget |
| 24 | C14 | 14 | ten consumed clue flags, kitchen at most twice, leave at most twice |
| 24 | C14y | 2 | NO consumes ch24NoOnce; next leave answer must be YES |
| 24 | C14r | 8 | seven roof clue flags and an exit/Simon branch |
| 25 | K15l | 6 | engine removes every consumed clue; 5 clue flags; nonclue actions exit or consume the chapter budget |
| 25 | K15q | 5 | engine removes every consumed clue; 4 clue flags; nonclue actions exit or consume the chapter budget |
| 25 | K15u | 8 | engine removes every consumed clue; 7 clue flags; nonclue actions exit or consume the chapter budget |
| 26 | CP05 | 56 | 10-minute secure timer plus finite once-only actions and pending prompts |
| 26 | CP09 | 88 | 12-unit spread budget, wait cost4, finite group/action flags and Molotov prompt |
| 27 | C17g | 5 | engine removes every consumed clue; 5 clue flags |
| 28 | M17a | 2 | mirror once, beam exits |
| 28 | M17k | 6 | four convert flags, at most one empty exit refusal, final exit |
| 28 | M17l | 3 | two street flags then delivery exit |
| 28 | M18b | 6 | at most three recruited groups, screens once, chant once, exit |
| 29 | C19a | 3 | engine removes every consumed clue; 3 clue flags |
| 29 | C19d | 3 | three distinct Amanda questions |
| 29 | C20a | 4 | guesses disappear; correct code exits |
| 29 | C20 | 40 | finite seen objects plus 12-unit archive timer; talk time consumes same budget |
| 29 | C20t | 24 | finite talk rounds drawing from same 12-unit archive timer |
| 30 | K17-drive | 3 | engine removes every consumed clue; 3 clue flags |
| 30 | C22-explore | 6 | engine removes every consumed clue; 6 clue flags |
| 30 | M23-escape | 2 | each failure adds wound; second wound kills |
| 30 | C23-escape | 2 | each failure adds wound; second wound kills |
| 30 | K20-leg | 2 | GET UP only at legVisits=0; second visit has no retry option |
| 31 | M26x | 6 | house actions once, upstairs exits |
| 31 | M26r | 20 | each church companion marked once after finite dialogue modes; exit |
| 31 | CN10 | 12 | four companion flags and finite North follow-up; exit |
| 32 | PC02 | 4 | four unique press questions |
| 32 | CT02 | 7 | floor advances each action or redirect/wait terminates |
| 32 | KL02 | 6 | done flags plus one Alice subprompt |
| 32 | KL14 | 4 | terminal done flags and once-only Todd interrupt |
| 32 | KL19 | 15 | done flags, finite Rose topic menu and queueActions=10 |
| 32 | KL21 | 4 | riverbank done flags then goodbye |
| 32 | K34 | 7 | done flags; four-minute sinking budget before lightening; finite remaining engine/push actions |
| 32 | MD07 | 20 | done flags for activities and finite scared/North dialogue modes |
| 32 | M28 | 6 | four unique questions, then accept/refuse |
| 32 | MD12 | 2 | North farewell once; Perkins exits |
| 32 | M31 | 3 | dirty-bomb give-up once, then terminal last-stand action |
| 32 | MR04 | 7 | three action flags and a finite android reply mode; advance exits |
| 32 | MR12 | 8 | kiss once; bomb and suicide may each be cancelled only once; terminal choice |
| 32 | KC09 | 20 | six enclosure done flags and finite drone/Ralph/scarred modes |
| 32 | K28 | 20 | stress rises20 per roam, only three bounded reply reductions; panic/exit; buzzer returns consume finite roam ticks |
| 32 | KC13 | 7 | five escape ticks and two buzzer subprompts |

The ch24 kitchen return C15c happens at most once: after the first kitchen visit, reentry needs the camera, which disables C15c. Roof return C14r2 happens once because ascent consumes the roof clue. C14y happens at most twice. Other return edges are bounded interrupts of their owning hubs. The ch30 GET UP retry is once only; the second leg menu removes it. MR12's bomb/suicide cancellations each mark the originating action done. These checks matter because a finite authored graph alone does not imply finitely many complete traces.

## Chapter-local DP and unresolved global combination

`reads.mjs` uses the installed Babel parser to collect state reads from module ASTs, excluding bare simple assignment targets. The corrected projection explicitly retains every generic clueState key; an earlier projection omitted nestSearchClues and falsely merged ch24 corridor clue states, and those attempts were invalidated/retried. `inventory.mjs` additionally collects JSON requires/when/situationWhen/repeatWhile/interrupt reads, clueState and choice exclusions. Shared active-protagonist gates and Hostage state are added explicitly. Regex-driven cross-state reads in ch22/ch32 are retained conservatively. Keys, retained choice references, cursor, relevant knowledge predicates and representative rolls form a canonical memo key. The local DFS uses BigInt weights; active-stack repeats fail the search. All seed states come from actual complete traversals. Results are checkpointed after each chapter.

This is **conditional local enumeration from one reachable incoming state per chapter**. A time/node cutoff contributes zero for unexplored branches and therefore yields a lower bound, not an estimate. The table records exact completed searches and partial bounds separately. It does not enumerate every possible incoming score/flag combination, does not construct the full cross-chapter transfer kernels, and does not multiply conditional counts. Those missing kernels are precisely what would be needed to fulfill the brief's tight-global-bound requirement.

| Ch. | Stored ending labels | Conditional ordered paths (risk outcomes separate) | Expanded memo states | Completed? |
|---:|---:|---:|---:|---|
| 1 | 6 | ≥ 364848 | 9880 | Unresolved |
| 2 | 0 | 1 | 2 | Exact for its saved entry |
| 3 | 0 | 552 | 578 | Exact for its saved entry |
| 4 | 0 | ≥ 616320 | 8624 | Unresolved |
| 5 | 1 | 42120 | 1623 | Exact for its saved entry |
| 6 | 2 | ≥ 2000460 | 12803 | Unresolved |
| 7 | 8 | 248 | 254 | Exact for its saved entry |
| 8 | 2 | 80 | 11 | Exact for its saved entry |
| 9 | 4 | ≥ 1559594 | 5293 | Unresolved |
| 10 | 3 | ≥ 51618 | 7628 | Unresolved |
| 11 | 1 | 10479 | 895 | Exact for its saved entry |
| 12 | 2 | ≥ 31013070336 | 4313 | Unresolved |
| 13 | 7 | 1359944 | 7090 | Exact for its saved entry |
| 14 | 1 | 128 | 72 | Exact for its saved entry |
| 15 | 4 | ≥ 86774 | 3801 | Unresolved |
| 16 | 1 | 901600 | 1636 | Exact for its saved entry |
| 17 | 5 | ≥ 102772 | 2883 | Unresolved |
| 18 | 1 | ≥ 218396160 | 3923 | Unresolved |
| 19 | 3 | 976 | 1704 | Exact for its saved entry |
| 20 | 4 | ≥ 216926 | 3973 | Unresolved |
| 21 | 1 | ≥ 23587477344 | 4879 | Unresolved |
| 22 | 2 | 49152 | 3095 | Exact for its saved entry |
| 23 | 3 | ≥ 627480 | 6549 | Unresolved |
| 24 | 8 | ≥ 97446960 | 3140 | Unresolved |
| 25 | 3 | ≥ 38160 | 3703 | Unresolved |
| 26 | 6 | ≥ 25252 | 5506 | Unresolved |
| 27 | 2 | 476928 | 4910 | Exact for its saved entry |
| 28 | 7 | ≥ 3476160 | 3984 | Unresolved |
| 29 | 5 | 1800 | 1121 | Exact for its saved entry |
| 30 | 17 | 1 | 1 | Exact for its saved entry |
| 31 | 5 | 1 | 2 | Exact for its saved entry |
| 32 | 52 | 3024 | 1847 | Exact for its saved entry |
| 33 | 0 | 2 | 1 | Exact for its saved entry |

Independent exact choice-sequence / choice-set chapter counts from small.mjs: ch2 1 / 1; ch3 552 / 216; ch7 248 / 248; ch8 80 / 80; ch11 10479 / 40; ch14 128 / 128; ch33 2 / 2. These remain conditional on their saved entry states.

Additional incoming-witness counts (the ch30–32 entries keep the protagonists active) give: ch29 1800; ch30 ≥ 75384; ch31 108000; ch32 ≥ 16584. These conditional counts and projection keys are in local-live.json, and are still not globally composable totals.

The chapter label catalogue is extracted by catalogue.mjs from actual exported ending tables and engine/module assignments, including helper-assigned Eden Club endings, RETREAT, and all ch32 lanes. It counts label text deduplicated within each chapter. Keeping the state-field/protagonist identity as well as label text gives **167 field-qualified chapter endings** (Crossroads contributes 18 rather than 17). Crossroads has 30 card IDs (11/10/9 Kara/Markus/Connor) but 17 unique texts; identical text in different lanes can merge. Chapter 32's 52 is lane-qualified. Chapters 2, 3 and 4 store no ending-label field; chapter 33 stores chloeFree. Catalogue size is not global reachability. Labels and all per-chapter upper factors are in catalogue.json and cycles.json.

## Ending projection and remaining gaps

The survey's report signature contains the three rendered report outcome descriptions, displayed attitudes, peaceful/contamination flags, all BF-prefixed finale scenes, and chloeFree. It omits historical chapter choices, site status rows, and Canada flags (to avoid deriving the report's any-visit river rule from only a last-choice value). It is a conservative lower-bound projection of the requested report+epilogue definition: adding C27–C29 or other finale details can only split it. summary.json counts distinct signatures after pairing every observed signature with both P01 choices. It does not assert an exact ending total. BF08/BF09/BF11/BF13 are mutually exclusive; BF10 cannot coexist with BF11/BF12/BF13; BF12 cannot coexist with BF13. Enumerating subsets under these necessary constraints yields 12 candidate after-credits sets. Every candidate now has a saved complete-run witness, indexed in witness-index.json. epilogues.mjs constructed the four missing combinations by changing only offered actions on an existing complete witness, then replayed each through actual current(). This proves the exact 12-set and 24-with-P01 totals. ending-bounds.mjs also enumerates the necessary protagonist constraints: Kara Canada pairs only with Alice Canada/Died; Kara Survived pairs only with Alice Survived/Died; Machine Connor cannot coexist with a final Peaceful win (the crowd confrontation either kills Markus or ends with Connor classified Free). This leaves 228 possible category tuples, not a proof all are reachable.

The requested exact reachable ending combinations, exact report-level ending total, tight ordered/unordered bounds and exact raw end-state count remain open. In particular, no complete global state count is inferred from observed samples, and no source catalogue is relabelled as an engine reachability count.

## Sensitivities and reproduction

1. **Hub order and multiplicity:** sequences retain order; sets discard both order and repeated identical actions. With the NO loop closed, both are finite. Other budgets such as Fugitives' 19+7 action limit, Capitol Park's timers and the camp stress/action rules are benchmark calibrations; changing them changes path counts.
2. **Risk identity and reachable roll streams:** outcome classes differ from raw values, and independent possible outcomes differ from outcomes induced by a single controller run ID. The half-risk and 0.1 splits must be retained.
3. **Ending definition and attitudes:** 166 chapter labels, 18 site rows, BF sets, outcome/attitude signatures, and entire retained states are different quantities. Arrow changes can cross gates or attitude thresholds even when they add no options.
4. **Cross-chapter correlations:** Alice's highest bond, evidence availability, surviving companions, instability, public opinion and Jericho standing cannot be multiplied as independent inputs. These are the dominant unresolved dimensions of the global computation.

Run scripts with `export PATH="$HOME/.bun/bin:$PATH"`, then `bun /Users/pelicannurse/.t3/detroitbench-tools/sol-endings-1.9.10/inventory.mjs`, `reads.mjs`, `catalogue.mjs`, `cycles.mjs`, `local.mjs 100000 30`, `neutral-actual.mjs`, `validate.mjs`, and `report.mjs` (each script path uses the same directory). Survey/target/adaptation scripts save independently; local.json saves completed chapter results and partial lower bounds. walk-upper.mjs is an exploratory gate-relaxed automaton bound and is not used in the headline results. source-check.mjs also checks every saved witness against the audited hub caps. Rerunning local.mjs skips already exact entries and retries incomplete ones. Intermediate DFS stacks are not checkpointed, so reboot loses only the current chapter attempt, not earlier results. No evidence, benchmark, site or other documentation was edited; no subagents or commits were created.
