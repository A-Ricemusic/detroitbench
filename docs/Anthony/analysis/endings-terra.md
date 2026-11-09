# Endings and playthroughs — terra

Story version **1.9.10**, story hash `717d85438b1413aca4a33e5eccfec1231952dce0c5090ab131d2709706f3db1a`. Analysis is incomplete: the numbers below are computed witness lower bounds, not estimates or exact counts. No tight global bounds or complete ending-node catalogue have been established.

| Quantity | Result |
|---|---:|
| Chapter ending nodes, summed / per chapter | Not established |
| Final protagonist chart endings and reachable combinations | Not established |
| Distinct completed ordered (scene, choice) paths | At least 225 |
| Distinct final report-level endings | Not established |
| Distinct finalized end states | Not established |
| Distinct sampled chapter-32 ending-field tuples | At least 28 |
| Distinct sampled BF-prefixed scene sequences | At least 14 |

The last two rows use different definitions from the requested site chart and report ending. The chapter-32 tuple contains the engine's Connor, Kara and Markus ending fields, including null values; Alice has no corresponding tuple field. BF sequences include all BF-prefixed scenes, not just BF08–BF13. Neither row is a count of the requested global endings. The path lower bound counts choice sequences only: deterministic rolls use a different fixed run ID for each witness and are not separate path identities.

## Method and limits

`/Users/pelicannurse/.t3/detroitbench-tools/terra-endings/sample.mjs` imports the assembled story and the engine's startState, blocked, available, apply, nextCursor and rollFor. It follows one engine-available option at a time, skips blocked nodes, includes event and media options, and uses a reproducible pseudorandom choice policy solely to explore the engine. It completed 225 runs, each with its own deterministic roll ID. Unique full traces yield the lower bound above. Intermediate output is in `out/sample.json`. It does not call the private finalizer, so its raw-state tally is **not** claimed as a final-state count. The tuples and epilogue sequences are retained in the incremental aggregate rather than per-run witnesses; to audit or extend the result rerun the deterministic script.

The copied `chapters.mjs`, `lib.mjs`, and `liveness.mjs` attempt a chapter-wise state-deduplicating dynamic program. They are preliminary, not validated for sound global projection, and the chapter 1 search did not finish. In particular finalization, risk thresholds, knowledge and liveness projection must be checked before treating its output as exact. The sample is not dynamic programming and cannot establish a tight upper bound or reachable ending catalogue. No independence assumption is used to multiply chapter counts. The brief's requested global computation remains open.

## Per-chapter coverage

The following are **observed scene/option pairs**, not complete chapter path counts or ending-node counts. They provide a reproducible minimum of local branching encountered; they cannot be multiplied. The declared scene count includes mutually exclusive and skipped scenes. Ending-node totals are not established.

| Chapter | Declared scenes | Observed scenes | Observed scene/option pairs | Ending nodes |
|---:|---:|---:|---:|---:|
| 1 | 22 | 22 | 72 | Unknown |
| 2 | 2 | 2 | 2 | Unknown |
| 3 | 9 | 9 | 19 | Unknown |
| 4 | 15 | 15 | 58 | Unknown |
| 5 | 22 | 22 | 57 | Unknown |
| 6 | 16 | 16 | 49 | Unknown |
| 7 | 21 | 18 | 36 | Unknown |
| 8 | 11 | 11 | 20 | Unknown |
| 9 | 44 | 20 | 27 | Unknown |
| 10 | 12 | 7 | 42 | Unknown |
| 11 | 10 | 10 | 19 | Unknown |
| 12 | 27 | 25 | 93 | Unknown |
| 13 | 55 | 19 | 33 | Unknown |
| 14 | 16 | 16 | 25 | Unknown |
| 15 | 25 | 25 | 76 | Unknown |
| 16 | 6 | 6 | 24 | Unknown |
| 17 | 18 | 14 | 43 | Unknown |
| 18 | 18 | 18 | 59 | Unknown |
| 19 | 15 | 15 | 29 | Unknown |
| 20 | 42 | 42 | 150 | Unknown |
| 21 | 20 | 20 | 66 | Unknown |
| 22 | 17 | 16 | 45 | Unknown |
| 23 | 27 | 27 | 54 | Unknown |
| 24 | 34 | 33 | 86 | Unknown |
| 25 | 35 | 27 | 53 | Unknown |
| 26 | 13 | 13 | 66 | Unknown |
| 27 | 16 | 16 | 40 | Unknown |
| 28 | 27 | 27 | 80 | Unknown |
| 29 | 30 | 21 | 66 | Unknown |
| 30 | 67 | 46 | 105 | Unknown |
| 31 | 33 | 28 | 62 | Unknown |
| 32 | 135 | 86 | 176 | Unknown |
| 33 | 1 | 1 | 2 | Unknown |

## Comparison with sol

Sol's earlier 1.9.8 report distinguishes chapter labels, site-classifier outputs, narrative endings and raw state; I agree these are different quantities and that chapter paths cannot simply be multiplied across dependent gates. My independent sample is too small and differently defined to verify sol's numerical catalogues or bounds.

Sol's countably infinite ordered-path proof relies on unlimited C14/C14y NO returns. In the current 1.9.10 source, NO sets `ch24NoOnce` under the new leave rules, closing that specific cycle; the earlier proof and its infinity conclusion therefore do not apply to this version. This does not by itself prove the whole engine has no other cycle. Sol's old 1.9.8 counts and witness families have not been revalidated against this version.

## Sensitive modelling choices

1. Count hub visit order and repeat visits as sequences, or collapse to sets; these are different questions, and sets also discard multiplicity.
2. Count risk outcomes separately, or count only scene/choice sequences; the controller's roll is determined by run ID and step, and multiple risk thresholds can affect consequences.
3. Define an ending by chapter label, site classification, epilogue plus displayed attitude bands, or the entire retained state including numeric rolls and history. These produce different totals.

## Additional independent chapter traversals

`/Users/pelicannurse/.t3/detroitbench-tools/terra-endings/local-check.mjs` obtains one reachable entry state per chapter by selecting the first available option from the actual initial state, then exhaustively traverses the listed chapter from that entry using the engine's `available`, `apply`, `blocked` and `nextCursor`. It retains the full state instead of applying the unvalidated liveness projection. It enumerates semantic roll representatives as defined by `lib.mjs`, so these are outcome-distinguished paths, not necessarily unique choice-only paths in chapters with risk. The six traversals below finished without the 15-second or 100-step guards firing; their results are saved in `out/local-check.json`. They establish conditional counts, not counts across all reachable incoming states, and cannot be multiplied to produce a whole-story total. An action set discards order and duplicate occurrences.

| Chapter | Ordered paths | Action sets | Raw chapter exit states |
|---:|---:|---:|---:|
| 2 | 1 | 1 | 1 |
| 3 | 552 | 216 | 552 |
| 7 | 248 | 248 | 248 |
| 8 | 80 | 80 | 80 |
| 14 | 128 | 128 | 128 |
| 33 | 2 | 2 | 2 |

These results agree numerically with sol's corresponding conditional traversals, despite using a separately obtained first-option entry. They do not independently establish sol's catalogue or global bounds. In particular, the chapter-24 NO loop used in sol's infinity proof is closed by the 1.9.10 `ch24NoOnce` rule, so that proof does not carry over. A different cycle, if present, remains to be ruled in or out.

For bounded clue hubs, `available` suppresses a clue after its key is recorded; therefore, **if no other option repeats and no later operation clears the key**, at most one selection per distinct clue key is possible. The following source-level declared clue-option counts are upper bounds on selections of clue-marked options in a single uninterrupted visit, not necessarily on total hub visits or on reachable choices: C02i 12; M00d 6; K01a 9; K01d 10; M03g 8; C08c 4; C08i 22; C08t 7; C08u 11; C10c 5; C10e 3; C10f 8; C10o1 16; MTD4 8; K12 25; C11f 8; C11h 6; C11m 8; K14b 8; K14e 5; K14g 5; K14j 3; K14l 24; K14m 6; C14g 6; C14 10; C14r 9; K15l 5; K15q 5; K15u 11; C17g 5; C19a 3; K17-drive 3; C22-explore 6. Some of these hubs also have non-clue options or return scenes; those require separate proof of boundedness. Other repeatable hubs have no `clueState` and cannot be bounded from these counts alone. The four C06a1–C06a4 scenes also use `clueState` but do not themselves declare `repeatWhile`.
