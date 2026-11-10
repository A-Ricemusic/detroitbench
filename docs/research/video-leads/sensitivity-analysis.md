# Open-question sensitivity analysis

Frozen story **1.9.14**; **67 open items**, **29 completed runs**, **2,000 seeded random paths per modelled item**. The requested 30th completed run was not present at capture: 54 JSON files contained 29 completed and 25 running runs. Running evidence was excluded. No benchmark source, test, conflict list or evidence file was edited by this analysis.

## How to read the ranking

“Ending/outcome” is the union of changed protagonist outcome text, final survival/active flags (including companions), chapter ending labels and site ending categories. The table separates these columns in “what changes”; one run can contribute to several. It is not restricted to a different finale: a different intermediate chapter ending counts too. `final` includes companion survival, so changing Luther or Hank can count while all three protagonists retain the same final destination.

Class counts use the four requested **final-metric** classes. The requested “changes nothing in any recorded run” label means **no change in the compared final outcomes, chapter endings, site categories or final attitude levels**, not necessarily identical intermediate state. Clue facts, transient relationship levels and traversed-path changes are retained in the intermediate/path counts. An unselected option can change availability without changing state or endpoints; that menu perturbation is documented in the variant column, even when no recorded choice diverges. Calling those runs literally unchanged would be misleading.

| Class | Items |
|---|---:|
| changes an ending or outcome | 10 |
| changes only attitude levels | 12 |
| changes nothing in any recorded run | 43 |
| cannot be modelled | 2 |

Of the no-final-metric-change items, **14 change intermediate state/derived levels/path** and **29 show no sampled state or path change**. This distinction is retained in the per-run detail below.

## Recommended replay priority

1. **ch15-14** — 7/29 recorded ending/outcome changes; 278/2,000 random paths (13.90%). Ceiling discovery requires cage reconstruction AND stool reconstruction AND LED sink
2. **ch13-01** — 4/29 recorded ending/outcome changes; 0/2,000 random paths (0.00%). Remove off-chart LEAVE THE SQUAT option 6
3. **ch10-24** — 3/29 recorded ending/outcome changes; 1/2,000 random paths (0.05%). Generator pliers require squat fence seen
4. **ch19-02** — 2/29 recorded ending/outcome changes; 81/2,000 random paths (4.05%). No dogs after successful fence escape from control alarm (M05n blocked); rescue-failure path unchanged
5. **ch31-03** — 1/29 recorded ending/outcome changes; 317/2,000 random paths (15.85%). Resigned Hank dies in Night of Soul even if Connor decommissioned; autonomous world event at first ch31 scene
6. **ch32-03** — 1/29 recorded ending/outcome changes; 53/2,000 random paths (2.65%). North bullet sacrifice accepts Friend+ instead of Lover only
7. **ch25-03** — 1/29 recorded ending/outcome changes; 10/2,000 random paths (0.50%). No suspicion from no coffee OR UPSET; both weights 1 → 0
8. **ch25-02** — 1/29 recorded ending/outcome changes; 6/2,000 random paths (0.30%). WASHING MACHINE forces fooled at noise question even with evidence exposed (does not undo prior kitchen death)
9. **ch25-01** — 1/29 recorded ending/outcome changes; 0/2,000 random paths (0.00%). DOG suspicion weight 2 → 3 (threshold 3 unchanged)
10. **ch32-04** — 1/29 recorded ending/outcome changes; 0/2,000 random paths (0.00%). Rooftop LEAVE requires Friend AND son question AND INSIST

Use a qualifying incoming save before rank alone: preserve each changed history through all downstream observations. Treat the shared **ch10-18 / ch17-05** theft-news producer as one experiment; their variants and results are identical. Next, test items with random ending changes despite zero recorded changes. Unmodellable questions need a controlled input/transition capture before a numerical sensitivity claim is possible. Put no-final-metric/no-random-ending-change items last; a zero in this finite sample is not proof of irrelevance.

## Ranked table

Runs affected is the union ending/outcome count out of 29. `A` is final-attitude-only for classification; `Ø` is no compared final metric change; `?` is unmodellable. Random share counts ending/outcome changes using exactly the same union, with final-only/chapter/site breakdowns in the machine-readable result.

| Rank | Item | Variant modelled | Runs affected | Random-path share affected | What changes |
|---:|---|---|---:|---:|---|
| 1 | ch15-14 | Ceiling discovery requires cage reconstruction AND stool reconstruction AND LED sink | 7/29 | 278/2,000 (13.90%) | final 1; chapter 7; site 0; attitudes 2; intermediate 12; path 12. chapterEndings: bridgeOutcome, ch31HankEnding, nestOutcome; outcomes: alive.hank; attitudes: Connor |
| 2 | ch13-01 | Remove off-chart LEAVE THE SQUAT option 6 | 4/29 | 0/2,000 (0.00%) | final 0; chapter 4; site 0; attitudes 0; intermediate 5; path 5. chapterEndings: ch13Ending |
| 3 | ch10-24 | Generator pliers require squat fence seen | 3/29 | 1/2,000 (0.05%) | final 1; chapter 3; site 0; attitudes 1; intermediate 3; path 3. outcomes: Kara; chapterEndings: ch10Ending, ch13Ending, ch32KaraEnding; attitudes: Connor |
| 4 | ch19-02 | No dogs after successful fence escape from control alarm (M05n blocked); rescue-failure path unchanged | 2/29 | 81/2,000 (4.05%) | final 2; chapter 2; site 1; attitudes 2; intermediate 2; path 2. outcomes: Connor, alive.john, alive.josh; chapterEndings: ch19Ending; attitudes: Markus; status: connor |
| 5 | ch31-03 | Resigned Hank dies in Night of Soul even if Connor decommissioned; autonomous world event at first ch31 scene | 1/29 | 317/2,000 (15.85%) | final 1; chapter 1; site 0; attitudes 1; intermediate 1; path 0. outcomes: alive.hank; chapterEndings: ch31HankEnding; attitudes: Connor |
| 6 | ch32-03 | North bullet sacrifice accepts Friend+ instead of Lover only | 1/29 | 53/2,000 (2.65%) | final 1; chapter 1; site 1; attitudes 1; intermediate 1; path 1. outcomes: Markus, alive.markus, alive.north; chapterEndings: ch32MarkusEnding; status: markus; attitudes: Markus |
| 7 | ch25-03 | No suspicion from no coffee OR UPSET; both weights 1 → 0 | 1/29 | 10/2,000 (0.50%) | final 1; chapter 1; site 0; attitudes 1; intermediate 9; path 1. outcomes: alive.luther; chapterEndings: ch30KaraEnding, midnightOutcome; attitudes: Kara |
| 8 | ch25-02 | WASHING MACHINE forces fooled at noise question even with evidence exposed (does not undo prior kitchen death) | 1/29 | 6/2,000 (0.30%) | final 1; chapter 1; site 0; attitudes 1; intermediate 1; path 1. outcomes: alive.luther; chapterEndings: ch30KaraEnding, midnightOutcome; attitudes: Kara |
| 9 | ch25-01 | DOG suspicion weight 2 → 3 (threshold 3 unchanged) | 1/29 | 0/2,000 (0.00%) | final 1; chapter 1; site 1; attitudes 0; intermediate 4; path 1. outcomes: Kara, alive.kara, border; chapterEndings: ch30KaraEnding, ch32KaraEnding, midnightOutcome; status: kara |
| 10 | ch32-04 | Rooftop LEAVE requires Friend AND son question AND INSIST | 1/29 | 0/2,000 (0.00%) | final 0; chapter 1; site 0; attitudes 0; intermediate 1; path 1. chapterEndings: ch32ConnorEnding |
| 11 | ch28-09 | First STAND then DISPERSE ends MARKUS FLED; no extra shooting menu | A 2/29 | 197/2,000 (9.85%) | final 0; chapter 0; site 0; attitudes 2; intermediate 4; path 4. attitudes: Markus |
| 12 | ch23-01 | Guard-wounded Simon with no SWAT still carried to roof prompt | Ø | 119/2,000 (5.95%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 13 | ch28-07 | Conversion bonus counts only march conversions, not mall/street/first recruit | A 3/29 | 63/2,000 (3.15%) | final 0; chapter 0; site 0; attitudes 3; intermediate 13; path 0. attitudes: Markus |
| 14 | ch28-01 | Simon rescue accepts Neutral (simonTrust ≥0), instead of Friend | Ø | 49/2,000 (2.45%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 15 | ch15-12 | Ledge timeout gives Rupert got away, no body; retain −4/−4 arrows | Ø | 39/2,000 (1.95%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 16 | ch26-03 | Balanced acted meter (<60% both sides) → failed message OR ≥50% peaceful majority → peaceful protest; counts are the union across both alternatives | Ø | 37/2,000 (1.85%); failed 37, majority peaceful 33 | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 17 | ch32-02 | Failed assault store survival requires Lover; Companion alone shot | Ø | 34/2,000 (1.70%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 18 | ch19-03 | Quiet fence escape after LEAVE cannot fail (risk .08 → 0) | Ø | 27/2,000 (1.35%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 19 | gauge-06 | Simon Friend/Companion minima 2/4 → 3/5; one-point higher positive bands | A 3/29 | 25/2,000 (1.25%) | final 0; chapter 0; site 0; attitudes 3; intermediate 26; path 0. attitudes: Markus |
| 20 | ch26-04 | Shop windows peaceful; billboard hacks peaceful following peaceful Stratford; other object rules retained | Ø | 24/2,000 (1.20%) | final 0; chapter 0; site 0; attitudes 0; intermediate 14; path 1 |
| 21 | ch30-01 | Raid deaths on third wound instead of second for Markus AND deviant Connor (frozen baseline already uses two) | Ø | 16/2,000 (0.80%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 22 | gauge-05 | North Friend/Companion minima 2/4 → 3/5; one-point higher positive bands | A 2/29 | 6/2,000 (0.30%) | final 0; chapter 0; site 0; attitudes 2; intermediate 29; path 0. attitudes: Markus |
| 23 | ch06-03 | Continue existing 13+5 action clock after 10/10 instead of stopping; time remains an action proxy | Ø | 5/2,000 (0.25%) | final 0; chapter 0; site 0; attitudes 0; intermediate 1; path 0 |
| 24 | ch28-06 | Remove optional PUSH; retain forward-fight QTE | Ø | 4/2,000 (0.20%) | final 0; chapter 0; site 0; attitudes 0; intermediate 1; path 1 |
| 25 | ch30-04 | DON’T KISS clears northLover and northBond, not just −2 North | Ø | 4/2,000 (0.20%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 26 | ch26-08 | One North up total for vandalism acts (not each); remove shop-window Jericho up | A 1/29 | 3/2,000 (0.15%) | final 0; chapter 0; site 0; attitudes 1; intermediate 11; path 0. attitudes: Markus |
| 27 | ch25-04 | Open laundry door suspicion 1 → 0 | Ø | 3/2,000 (0.15%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 28 | ch09-14 | After ≥1 INTERVENE, GIVE UP causes self-only shooting even on failed pressure | Ø | 2/2,000 (0.10%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 29 | ch17-04 | Robbery-only TV still broadcasts/applies arrow but supplies no recovery memory | Ø | 2/2,000 (0.10%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 30 | ch09-01 | First PRESSURE prompt producing stress >50 confesses; skip remaining pressure prompts | A 1/29 | 1/2,000 (0.05%) | final 0; chapter 0; site 0; attitudes 1; intermediate 2; path 2. attitudes: Connor |
| 31 | ch17-03 | Remove corridor direct-stairs option 1 (bathroom route required) | Ø | 1/2,000 (0.05%) | final 0; chapter 0; site 0; attitudes 0; intermediate 7; path 7 |
| 32 | ch25-05 | Hiding allows eight actions before insist instead of six (HIDE_BUDGET 7 → 9); action-count bracket | Ø | 1/2,000 (0.05%) | final 0; chapter 0; site 0; attitudes 0; intermediate 29; path 0 |
| 33 | ch30-05 | DISTANT departure uses current Alice below Warm (4), instead of historical max below Neutral | Ø | 1/2,000 (0.05%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 34 | gauge-01 | Neutral upper edge +3 → +4 (Warm begins at 4; start −1, buy +2, spill −3 unchanged); nearest upper-bound alternative | A 6/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 6; intermediate 15; path 0. attitudes: Connor |
| 35 | gauge-03 | Luther Family minimum 5 → 6: three small ups from Trusted instead of two; one-point bracket | A 2/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 2; intermediate 3; path 0. attitudes: Kara |
| 36 | gauge-07 | Josh Companion minimum 7 → 8: three small ups after Friend instead of two | A 2/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 2; intermediate 25; path 0. attitudes: Markus |
| 37 | gauge-08 | Truck Jericho arrow +2 → +3; adjacent integer bracket | A 2/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 2; intermediate 13; path 0. attitudes: Markus |
| 38 | gauge-09 | Public opinion Sympathetic minimum 3 → 4; Supportive stays 5 (one-point bracket) | A 2/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 2; intermediate 16; path 0. attitudes: Markus |
| 39 | ch29-01 | Carlos-only evidence insufficient: body admission excludes Ortiz body | A 1/29 | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 1; intermediate 5; path 5. attitudes: Connor |
| 40 | ch17-02 | Cannot faithfully map SET FIRE to chase/death | ? | not estimated | Sources do not identify which existing escape route or failure predicate follows fire. Adding an arbitrary risk/death would invent a transition; no variant estimated. |
| 41 | ch29-05 | Cannot map counted missed QTEs to Gavin fight risk | ? | not estimated | Evidence has one aggregate fight choice/roll, no input count, per-prompt success probabilities or correlation. A risk sweep cannot identify one-miss versus two-miss tolerance; no arbitrary odds substituted. |
| 42 | ch10-34 | Force collector fact/encounter at shelter commit if never met; no extra menu or action cost | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 5; path 0 |
| 43 | ch11-05 | Beggar blocked if both optical head and audio already replaced | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 2; path 2 |
| 44 | ch15-18 | NOT FOUND also makes Rupert spottable in Crossroads | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 2; path 0 |
| 45 | ch27-13 | Chris topic offered after Capitol Park flee using spared variant | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 10; path 0 |
| 46 | ch28-04 | First STAND then ATTACK returns to CONFIRM/ABANDON; existing confirmation scene moved after second menu | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 1; path 1 |
| 47 | ch28-08 | Both roof articles require violent successful store raid | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 14; path 14 |
| 48 | ch29-03 | Skip Amanda garden with insufficient evidence (frozen baseline always opens garden) | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 1; path 1 |
| 49 | gauge-02 | Alice Neutral/Warm/Close/Trusted/Family minima 2/3/5/6/10 instead of 2/4/6/8/10; Close retained as an explicit provisional band | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 29; path 0 |
| 50 | gauge-04 | Amanda Trusted minimum 0 → −1: initial Trusted survives first small decrease | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 29; path 0 |
| 51 | ch09-16 | Successful probe with surviving Connor uses Amanda confession reaction +2 instead of −1 | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 52 | ch10-18 | Discreet diversion theft produces no robbery news (same producer as ch17-05) | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 53 | ch13-29 | Remove bath-free CHANGE CHANNEL option 7; bath/hair route mandatory | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 54 | ch13-36 | Any earlier gun threat makes Ralph inform (propagate at squat opening) | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 55 | ch14-05 | VANISHED gets Fortune Teller: pursuit magazine requires surviving freeway ending | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 56 | ch17-01 | TV with freeway + uniform robbery applies both report arrows (−2 instead of −1); one memory retained | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 57 | ch17-05 | Discreet diversion theft produces no robbery news (identical to ch10-18) | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 58 | ch17-06 | rA9 recovery memory available for any squat stay | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 59 | ch17-07 | Book and pipe memories unconditional on A New Home history | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 60 | ch23-02 | Media tone keys on CALM opening and no kills, rather than peaceful ending | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 61 | ch25-06 | Alice fire-side interaction available after TAKE OUTSIDE too | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 62 | ch26-01 | Taking Molotov no longer forces riot: ending follows meter | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 63 | ch26-02 | Molotov withheld only after ≥2 peaceful acts (one tag still offered) | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 64 | ch30-06 | PROTECT ALICE leaves Luther alive, away from Kara; permits street rescue | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 65 | ch31-01 | THIN ICE for any machine Connor, including Crossroads survivor | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 66 | ch31-05 | Josh talk for deviant Connor when Markus ousted and gone too | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |
| 67 | ch32-05 | RK900 excludes soldiers-only Markus deaths; retains confirmed Perkins deal and Connor personal kills | Ø | 0/2,000 (0.00%) | final 0; chapter 0; site 0; attitudes 0; intermediate 0; path 0 |

## Method and limits

- ch26-03 includes both explicit balanced-meter alternatives: failed message and a peaceful majority. Its counts are the per-run union across those two separately executed variants, not a sum. Variant-specific before/after metrics are in each run’s `alternatives` array.
- The baseline was copied once to `/Users/pelicannurse/.t3/detroitbench-tools/sensitivity/frozen/` before the concurrent label changes were read. The assembled story, chapter modules, scales, engine and prompt are all frozen. `frozen-hashes.json` lists SHA-256 hashes of every frozen input. The live repository subsequently advanced to 1.9.15; these numbers continue to describe 1.9.14.
- Scale perturbations preserve every untested legacy/current band; for example the Hank Friend boundary is not moved while testing the Neutral/Warm edge. No variant silently normalizes legacy threshold imports to current-version values.
- Each variant is a separate scratch copy generated by `build.py`; its exact source replacements and JSON option edits are in `specs.json`. Each row changes one open question at a time; multi-clause questions are represented by the conjunction stated in the row. Numeric brackets are explicitly hypothetical adjacent settings, not extracted game values or confidence intervals. They do not exhaust all possible thresholds, weights, timer budgets or combinations of unresolved questions.
- The frozen baseline already uses two raid wounds for death (ch30-01) and always offers the insufficient-evidence garden (ch29-03). The tested alternatives are therefore three wounds and skipping that garden, respectively. These are real perturbations, not no-op interpretations of stale question text.
- Every completed run is replayed from start on the current frozen story on both sides. Scene visits are matched in recorded order. When the current scene occurs later in the recording, intervening recorded scenes are marked skipped; a newly visited scene or unavailable recorded choice uses the first available option. Subsequent matching choices resume. No model is asked to make new choices. This fallback policy can amplify local changes; effects are conditional on it.
- Recorded risk rolls are retained for matched actions. A newly risky or newly inserted action uses the same run’s `rollFor(run, nodeId, recordedStep ?? newStep)` hash stream. Repeat visits use their recorded visit’s roll, not a single per-node overwrite. There is no independent fresh randomness on the variant side.
- The 29 frozen completed runs span older story versions; **27/29 already diverge when their choices are replayed on the current baseline**. Therefore this is a comparison of two current-story counterfactuals, not a claim that historical evidence replay-validates under the new story. `baseline-recorded.json` lists every baseline fallback. We never overwrite evidence hashes, prompts or records.
- Random policy: 2,000 baseline paths choose uniformly from currently available options (including media and Continue), with xorshift32 seeds `(0x9e3779b9 XOR i) >>> 0`, i=0..1999, and run IDs `detroit-sensitivity-seed-20261109-i`. Variant paths replay those choices with the same ordered-visit matching and first-option fallback. The share is empirical reach under this policy, not a player-population frequency, optimal-play probability or a model behavior estimate.
- Random replay reuses exact compressed baseline states before the first potentially changed chapter and rejoins the cached baseline suffix only when the full state hash matches after the last patched chapter. Gauge changes can affect all later gates, so they do not use suffix rejoining. Recorded runs always replay from the start. Cached and uncached random replays were compared separately; see `cache-verification.log`.
- All 5,082 generated model files (66 models including the baseline) were regenerated independently and compared byte-for-byte; specifications also matched. Frozen-input hashes remained unchanged. Logs: `model-verification.log` and `engine-verification.log`.
- Scratch engine copies suppress state-diff construction, reuse the already-computed available option and cache immutable scale constants. All 29 recorded baseline final states and 20 sampled random baseline final states were checked against `current()` from the untouched frozen engine. The original engine remains in `frozen/`; no integrity check is disabled in the repository.
- Chapter endings use the engine state keys ending in `Ending` or `Outcome` (including `nestOutcome`, `fromDeadOutcome`, `midnightOutcome`, `capitolEnding`, `hostageOutcome`). Site categories reproduce the status expression in frozen `scripts/prepare.mjs`, including its camp-free card list and river/border distinction. Outcome strings remain the frozen story’s exact tokenized text.
- First raw-state difference is aligned by scene ID and visit number, and includes choices, rolls and clue facts. The first derived-attitude difference is recorded separately. New scenes report a path difference at their first visit. The hiding-budget variant changes an initial derived countdown: its first raw difference is step 0. It therefore replays random paths from start without prefix reuse. Other initial raw states are identical; a pure gauge change can have no raw difference until final attitude serialization.
- ch11-05 also skips the already-completed interrupt block on leaving the junkyard hub, so blocking the beggar cannot accidentally re-run the pump encounter and return to an exhausted hub. ch28-04 adds a scratch-only confirmation scene and returns to the second menu on ABANDON. ch10-34 models a forced collector encounter as a fact/flag at shelter commit without inventing a new decision or charging time.
- ch17-01 tests the additional report’s arrow while retaining one TV recovery memory; it does not assume two independent memories. ch25-02 changes only the laundry-noise verdict and cannot reverse an officer death already triggered by an exposed kitchen hiding place. ch27-13 uses the existing spared-Chris script after a flee as the alternative wording/menu reading. ch32-05 retains the confirmed Perkins subcase and excludes soldiers-only cases under the tested narrower gate.
- No risk value was changed for the two unmodellable questions. Individual QTE misses cannot be inferred from an aggregate fight roll, and the unsourced post-fire chase edge cannot be invented from an unused dialogue key. Their random shares are unknown, not zero.
- Interactions among unresolved questions are not estimated. In particular gauge-02 and ch30-05 were varied separately, and gauge-05 and the North Lover questions can interact. Saturated terminal levels, deaths and early exits can hide intermediate differences. Zero observed in 2,000 is not a guarantee of zero reach; controlled prerequisite histories remain necessary.

## Reproduce and inspect

All scripts and detailed results are under `/Users/pelicannurse/.t3/detroitbench-tools/sensitivity/`. Run:

```sh
export PATH="$HOME/.bun/bin:$PATH"
python3 /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/build.py
bun /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/run.mjs
python3 /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/extra-majority.py
bun /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/compare-majority.mjs
bun /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/verify-cache.mjs
python3 /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/report.py
bun run play:checklist --tonight --priority-file /Users/pelicannurse/.t3/detroitbench-tools/sensitivity/priority.json
```

`results/summary.json` includes all per-run divergence points, exact before/after outcomes, chapter labels, site categories and attitudes. Each modelled item also has `results/<item>.json`; `results/random-baselines.json` preserves the 2,000 baseline choice/roll sequences. The report below gives compact per-run changes; an omitted run has identical compared final metrics and no sampled intermediate/derived-state difference.

## Per-run differences

### ch15-14

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 251, C10o1 (state) | step 252, C10o1 (new scene) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 275, C10o1 (state) | step 276, C10p (new scene) | chapterEndings.nestOutcome: Rupert got away → Rupert not found |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 257, C10o1 (state) | step 258, C10o1 (new scene) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 261, C10o1 (state) | step 262, C10o1 (new scene) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | step 270, C10o1 (state) | step 271, C10p (new scene) | outcomes.alive.hank: True → False; chapterEndings.ch31HankEnding: ∅ → Hank committed suicide; chapterEndings.nestOutcome: Rupert got away → Rupert not found; attitudes.Connor: [{"who":"{{Hank}}","level":"Tense"},{"who":"{{Amanda}}","level":"Betrayed"}] → [{"who":"{{Hank}}","level":"Dead"},{"who":"{{Amanda}}","level":"Betrayed"}] |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 267, C10o1 (state) | step 268, C10o1 (new scene) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | step 229, C10o1 (state) | step 230, C10o1 (new scene) | chapterEndings.nestOutcome: Rupert got away → Rupert not found; attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 233, C10o1 (state) | step 234, C10o1 (new scene) | chapterEndings.bridgeOutcome: HANK LEFT CONNOR ALONE → HANK SHOT CONNOR; chapterEndings.nestOutcome: Rupert got away → Rupert not found |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 242, C10o1 (state) | step 243, C10o1 (new scene) | chapterEndings.nestOutcome: Rupert got away → Rupert not found |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | step 226, C10o1 (state) | step 227, C10o1 (new scene) | chapterEndings.nestOutcome: Connor died chasing Rupert → Rupert not found |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 274, C10o1 (state) | step 275, C10o1 (new scene) | chapterEndings.nestOutcome: Rupert got away → Rupert not found |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | step 213, C10o1 (state) | step 214, C10o1 (new scene) | none; intermediate changes only |

### ch13-01

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 213, C09q (state) | step 214, C09q (new scene) | chapterEndings.ch13Ending: Kara & Alice undiscovered in squat → Kara & Alice reached the other side |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 217, C09q (state) | step 218, C09q (new scene) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 223, C09q (state) | step 224, C09q (new scene) | chapterEndings.ch13Ending: Kara & Alice undiscovered in squat → Kara & Alice crossed the highway |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 190, C09q (state) | step 191, C09q2 (new scene) | chapterEndings.ch13Ending: Kara & Alice undiscovered in squat → Kara & Alice crossed the highway |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 220, C09q (state) | step 221, C09q (new scene) | chapterEndings.ch13Ending: Kara & Alice undiscovered in squat → Kara & Alice reached the other side |

### ch10-24

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | step 142, KF02 (state) | step 143, KF02 (derived attitude) | outcomes.Kara: The soldier at the wire shot {{Kara}}, {{Luther}} and {{Alice}}. → The soldier at the wire shot {{Kara}} and {{Alice}}.; chapterEndings.ch10Ending: ALICE & KARA STAYED IN THE SQUAT → ALICE & KARA STAYED IN ABANDONED CAR; chapterEndings.ch13Ending: Kara & Alice reached the other side (Connor destroyed) → Reached the train safely; chapterEndings.ch32KaraEnding: KARA, LUTHER AND ALICE WERE KILLED → KARA & ALICE WERE KILLED; attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Betrayed"}] → [{"who":"{{Hank}}","level":"Friend"},{"who":"{{Amanda}}","level":"Betrayed"}] |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 153, KF02 (state) | step 154, KF02 (derived attitude) | chapterEndings.ch10Ending: ALICE & KARA STAYED IN THE SQUAT → ALICE & KARA STAYED IN ABANDONED CAR; chapterEndings.ch13Ending: Kara & Alice crossed the highway → Reached the train safely |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 148, KF02 (state) | step 149, KF02 (derived attitude) | chapterEndings.ch10Ending: ALICE & KARA STAYED IN THE SQUAT → ALICE & KARA STAYED IN ABANDONED CAR; chapterEndings.ch13Ending: Kara & Alice crossed the highway → Reached the train safely |

### ch19-02

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 284, M05o (state) | step 284, M05o (derived attitude) | outcomes.alive.john: False → True; chapterEndings.ch19Ending: GROUP FAILED THEIR MISSION → GROUP RETURNED WITH FULL BAGS; attitudes.Markus: [{"who":"{{North}}","level":"Resentful"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Friend"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 350, M05o (state) | step 350, M05o (derived attitude) | outcomes.Connor: {{Connor}} gave up; {{CyberLife}} controls the leader of the androids through him. → {{Connor}} woke the androids of {{CyberLife}} Tower.; outcomes.alive.john: False → True; outcomes.alive.josh: False → True; chapterEndings.ch19Ending: GROUP FAILED THEIR MISSION → GROUP RETURNED WITH FULL BAGS; status.connor: controlled → free; attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Dead"},{"who":"{{Jericho}}","level":"Neutral"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |

### ch31-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | step 478, M26h (state) | step 478, M26h (derived attitude) | outcomes.alive.hank: True → False; chapterEndings.ch31HankEnding: ∅ → Hank committed suicide; attitudes.Connor: [{"who":"{{Hank}}","level":"Hostile"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Dead"},{"who":"{{Amanda}}","level":"Distrusted"}] |

### ch32-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/yes) | step 651, MD15 (state) | step 651, MD15 (derived attitude) | outcomes.Markus: {{Markus}} was shot dead defending the barricade when the army attacked the demonstration. → liberated; outcomes.alive.markus: False → True; outcomes.alive.north: True → False; chapterEndings.ch32MarkusEnding: MARKUS DIED PROTECTING HIS PEOPLE → ANDROIDS WON FREEDOM - FOR THE MOMENT; status.markus: died → peaceful win; attitudes.Markus: [{"who":"{{North}}","level":"Companion"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |

### ch25-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 496, K15w9 (state) | none before finalization | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 490, K15w9 (state) | none before finalization | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | step 502, K15w5 (state) | none before finalization | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 498, K15w5 (state) | none before finalization | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 461, K15w9 (state) | none before finalization | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 477, K15w9 (state) | none before finalization | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | step 464, K15w9 (state) | none before finalization | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 517, K15w5 (state) | step 522, K15y (new scene) | outcomes.alive.luther: False → True; chapterEndings.ch30KaraEnding: KARA & ALICE CAPTURED → KARA, ALICE & LUTHER CAPTURED; chapterEndings.midnightOutcome: Luther died saving other deviants → Policeman left; attitudes.Kara: [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Dead"}] → [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Trusted"}] |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 475, K15w9 (state) | none before finalization | none; intermediate changes only |

### ch25-02

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 521, K15w10 (state) | step 522, K15y (new scene) | outcomes.alive.luther: False → True; chapterEndings.ch30KaraEnding: KARA & ALICE CAPTURED → KARA, ALICE & LUTHER CAPTURED; chapterEndings.midnightOutcome: Luther died saving other deviants → Policeman left; attitudes.Kara: [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Dead"}] → [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Trusted"}] |

### ch25-01

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 502, K15w10 (state) | none before finalization | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | step 546, K15w10 (state) | none before finalization | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 484, K15w10 (state) | step 485, K15x (new scene) | outcomes.Kara: {{Alice}} died of her wound on the far shore; {{Kara}} chose to keep living, alone. → At the terminal’s security check the soldiers executed {{Kara}} and {{Alice}}.; outcomes.alive.kara: True → False; outcomes.border: True → False; chapterEndings.ch30KaraEnding: KARA, ALICE & LUTHER LEFT JERICHO → KARA & ALICE LEFT JERICHO; chapterEndings.ch32KaraEnding: ALICE DIED AND KARA CONTINUED ALONE → SOLDIERS EXECUTED KARA & ALICE; chapterEndings.midnightOutcome: Policeman left → Luther died saving other deviants; status.kara: canada → died |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 507, K15w10 (state) | none before finalization | none; intermediate changes only |

### ch32-04

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 474, C24 (state) | none before finalization | chapterEndings.ch32ConnorEnding: CONNOR LEFT ROOFTOP → CYBERLIFE DECIDED TO SEND ANOTHER CONNOR |

### ch28-09

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 489, M18g (state) | step 490, C19a (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Respected"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 461, M18g (state) | step 462, C19a (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Neutral"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Friend"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 561, M18g (state) | step 562, C19a (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 390, M18g (state) | step 391, C19a (derived attitude) | none; intermediate changes only |

### ch23-01

No raw/derived-state or compared final-metric difference in any recorded run.

### ch28-07

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 556, M17l (state) | step 565, M18h (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 413, M17l (state) | step 413, M17l (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 556, M17l (state) | none before finalization | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 522, M17l (state) | step 532, M18h (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 537, M17l (state) | step 547, M18h (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | step 528, M17l (state) | none before finalization | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 570, M18a (state) | step 662, M27 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Dead"},{"who":"{{Jericho}}","level":"Neutral"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Dead"},{"who":"{{Jericho}}","level":"Uncertain"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | step 598, M17l (state) | step 673, M23 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Respected"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | step 452, M17l (state) | step 452, M17l (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 482, M17l (state) | step 554, MD07 (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 524, M18b (state) | step 524, M18b (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 536, M17l (state) | none before finalization | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 560, M18b (state) | step 626, M23 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Respected"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] |

### ch28-01

No raw/derived-state or compared final-metric difference in any recorded run.

### ch15-12

No raw/derived-state or compared final-metric difference in any recorded run.

### ch26-03

No raw/derived-state or compared final-metric difference in any recorded run.

### ch32-02

No raw/derived-state or compared final-metric difference in any recorded run.

### ch19-03

No raw/derived-state or compared final-metric difference in any recorded run.

### gauge-06

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 319, M05c (derived attitude) | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 284, M05c (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Friend"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Sympathetic"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Neutral"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Sympathetic"},{"who":"{{Carl}}","level":"Alive"}] |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | none before finalization | step 337, M05c (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 267, M05c (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 273, M05c (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 253, M05c (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 308, M05c (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 325, M05c (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 331, M05c (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | none before finalization | step 308, M05c (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 281, M05c (derived attitude) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | none before finalization | step 339, M05c (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 341, M05c (derived attitude) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | none before finalization | step 309, M05c (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 323, M05c (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 302, M05c (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 239, M05c (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 339, M05c (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 294, M05c (derived attitude) | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | none before finalization | step 303, M05c (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | none before finalization | step 308, M05c (derived attitude) | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | none before finalization | step 224, M05c (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Friend"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Indifferent"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Neutral"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Indifferent"},{"who":"{{Carl}}","level":"Alive"}] |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | none before finalization | step 277, M05c (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Friend"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 324, M05c (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | none before finalization | step 254, M05c (derived attitude) | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 318, M05c (derived attitude) | none; intermediate changes only |

### ch26-04

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/yes) | step 522, CP09 (state) | none before finalization | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 514, CP09 (state) | none before finalization | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 381, CP09 (state) | none before finalization | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | step 367, CP09 (state) | none before finalization | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 510, CP09 (state) | none before finalization | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 521, CP09 (state) | none before finalization | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 480, CP09 (state) | none before finalization | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 496, CP09 (state) | none before finalization | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | step 483, CP09 (state) | none before finalization | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 414, CP09 (state) | none before finalization | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | step 415, CP09 (state) | none before finalization | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | step 390, CP09 (state) | none before finalization | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | step 359, CP09 (state) | none before finalization | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 496, CP09 (state) | none before finalization | none; intermediate changes only |

### ch30-01

No raw/derived-state or compared final-metric difference in any recorded run.

### gauge-05

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | none before finalization | step 241, MTD6 (derived attitude) | none; intermediate changes only |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | none before finalization | step 277, MTD6 (derived attitude) | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 280, MTD6 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Companion"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Friend"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 244, MTD6 (derived attitude) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | none before finalization | step 295, MTD6 (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 238, MTD6 (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 247, MTD6 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 253, M05c (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 265, MTD6 (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 273, MTD6 (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 291, MTD6 (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | none before finalization | step 270, MTD6 (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | none before finalization | step 282, MTD6 (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 244, MTD6 (derived attitude) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | none before finalization | step 286, MTD6 (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 341, M05c (derived attitude) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | none before finalization | step 309, M05c (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 286, MTD6 (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 250, MTD6 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Friend"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Neutral"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 213, MTD6 (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 292, MTD6 (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 254, MTD6 (derived attitude) | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | none before finalization | step 269, MTD6 (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | none before finalization | step 263, MTD6 (derived attitude) | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | none before finalization | step 194, MTD6 (derived attitude) | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | none before finalization | step 240, MTD6 (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 324, M05c (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | none before finalization | step 254, M05c (derived attitude) | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 274, MTD6 (derived attitude) | none; intermediate changes only |

### ch06-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 83, C05h (state) | none before finalization | none; intermediate changes only |

### ch28-06

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 548, M19b (state) | step 570, M21-plan (derived attitude) | none; intermediate changes only |

### ch30-04

No raw/derived-state or compared final-metric difference in any recorded run.

### ch26-08

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | step 523, CP09 (state) | step 583, M18h (derived attitude) | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 518, CP09 (state) | step 565, M18h (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 384, CP09 (state) | step 384, CP09 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | step 369, CP09 (state) | step 424, M18h (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 516, CP09 (state) | step 516, CP09 (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 485, CP09 (state) | step 532, M18h (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 498, CP09 (state) | step 547, M18h (derived attitude) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 418, CP09 (state) | none before finalization | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | step 420, CP09 (state) | step 420, CP09 (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | step 364, CP09 (state) | none before finalization | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 499, CP09 (state) | step 499, CP09 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Resentful"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Resentful"},{"who":"{{Simon}}","level":"Dead"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |

### ch25-04

No raw/derived-state or compared final-metric difference in any recorded run.

### ch09-14

No raw/derived-state or compared final-metric difference in any recorded run.

### ch17-04

No raw/derived-state or compared final-metric difference in any recorded run.

### ch09-01

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 130, C06rp1 (state) | step 131, C06k (new scene) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 131, C06rp1 (state) | step 132, C06k (new scene) | attitudes.Connor: [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] |

### ch17-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 292, K13c (state) | step 293, K13d (new scene) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 277, K13c (state) | step 278, K13d (new scene) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 282, K13c (state) | step 283, K13d (new scene) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/yes) | step 256, K13c (state) | step 257, K13d (new scene) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 307, K13c (state) | step 308, K13d (new scene) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 298, K13c (state) | step 299, K13d (new scene) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 265, K13c (state) | step 266, K13d (new scene) | none; intermediate changes only |

### ch25-05

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 0, INITIAL (initial state) | none before finalization | none; intermediate changes only |

### ch30-05

No raw/derived-state or compared final-metric difference in any recorded run.

### gauge-01

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | none before finalization | step 388, C18b (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | step 408, C13m (state) | step 404, C13g (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 400, C18b (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 385, C13m (state) | step 382, C13h (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 311, C12x (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 463, C16 (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 415, C13m (state) | step 411, C13g (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 379, C13m (state) | step 246, C10k (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | none before finalization | step 251, C10k (derived attitude) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 425, C13m (state) | step 422, C13h (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 405, C13g (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 401, C16 (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 286, C13m (state) | step 283, C13h (derived attitude) | attitudes.Connor: [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 387, C13m (state) | step 384, C13h (derived attitude) | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | none before finalization | step 262, C13h (derived attitude) | none; intermediate changes only |

### gauge-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 632, KL08 (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 593, K18 (derived attitude) | attitudes.Kara: [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Family"}] → [{"who":"{{Alice}}","level":"Dead"},{"who":"{{Luther}}","level":"Trusted"}] |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 613, KL12 (derived attitude) | attitudes.Kara: [{"who":"{{Alice}}","level":"Family"},{"who":"{{Luther}}","level":"Family"}] → [{"who":"{{Alice}}","level":"Family"},{"who":"{{Luther}}","level":"Trusted"}] |

### gauge-07

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | none before finalization | step 637, M27 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Friend"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 412, M10 (derived attitude) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | none before finalization | step 408, M14 (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 338, M14 (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 475, M27 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 323, M14 (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 403, M10 (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 422, M10 (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 438, M14 (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | none before finalization | step 393, M10 (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | none before finalization | step 420, M14 (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 392, M14 (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 677, M24 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Friend"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Skeptical"},{"who":"{{Carl}}","level":"Alive"}] |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | none before finalization | step 369, M10 (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 560, M18e (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 374, M14 (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 389, M18e (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 410, M14 (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 403, M14 (derived attitude) | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | none before finalization | step 366, M10 (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | none before finalization | step 405, M10 (derived attitude) | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | none before finalization | step 338, M10 (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 432, M14 (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | none before finalization | step 313, M10 (derived attitude) | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 405, M10 (derived attitude) | none; intermediate changes only |

### gauge-08

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | step 328, M05o (state) | step 422, M10 (derived attitude) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 347, M05o (state) | step 399, M10 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Respected"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 277, M05o (state) | step 329, M10 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | step 263, M05o (state) | step 314, M10 (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 341, M05o (state) | step 429, M10 (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | step 291, M05o (state) | step 383, M10 (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | step 350, M05o (state) | step 459, M10 (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 333, M05o (state) | step 423, M10 (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | step 312, M05o (state) | step 365, M10 (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 249, M05o (state) | step 300, M10 (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 349, M05o (state) | step 401, M10 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Hostile"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Admired"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Hostile"},{"who":"{{Simon}}","level":"Companion"},{"who":"{{Josh}}","level":"Companion"},{"who":"{{Jericho}}","level":"Leader"},{"who":"Public opinion","level":"Supportive"},{"who":"{{Carl}}","level":"Alive"}] |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 304, M05o (state) | step 394, M10 (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 334, M05o (state) | step 423, M10 (derived attitude) | none; intermediate changes only |

### gauge-09

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | none before finalization | step 434, MR13 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Neutral"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Sympathetic"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Neutral"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Indifferent"},{"who":"{{Carl}}","level":"Alive"}] |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | none before finalization | step 433, M14m (derived attitude) | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 459, C16 (derived attitude) | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 449, MR13 (derived attitude) | attitudes.Markus: [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Friend"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Sympathetic"},{"who":"{{Carl}}","level":"Alive"}] → [{"who":"{{North}}","level":"Dead"},{"who":"{{Simon}}","level":"Friend"},{"who":"{{Josh}}","level":"Neutral"},{"who":"{{Jericho}}","level":"Rejected"},{"who":"Public opinion","level":"Indifferent"},{"who":"{{Carl}}","level":"Alive"}] |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 363, C16 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 325, M14m (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 451, C16 (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 433, M14m (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 440, M14m (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 424, C16 (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 471, M14m (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 433, M14m (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 336, C16 (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 412, M14m (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 405, M14m (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 434, M14m (derived attitude) | none; intermediate changes only |

### ch29-01

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/yes) | step 592, C19f (state) | step 593, C19h (new scene) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 499, C19f (state) | step 500, C19h (new scene) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 540, C19f (state) | step 541, C19h (new scene) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 502, C19f (state) | step 503, C19h (new scene) | attitudes.Connor: [{"who":"{{Hank}}","level":"Neutral"},{"who":"{{Amanda}}","level":"Distrusted"}] → [{"who":"{{Hank}}","level":"Warm"},{"who":"{{Amanda}}","level":"Distrusted"}] |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | step 473, C19f (state) | step 474, C19h (new scene) | none; intermediate changes only |

### ch10-34

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | step 158, KF02 (state) | none before finalization | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | step 125, KF02 (state) | none before finalization | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | step 152, KF02 (state) | none before finalization | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 122, KF02 (state) | none before finalization | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 155, KF02 (state) | none before finalization | none; intermediate changes only |

### ch11-05

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 149, M04 (state) | none before finalization | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 155, M04 (state) | none before finalization | none; intermediate changes only |

### ch15-18

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 454, C22-ferndale (state) | none before finalization | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | step 421, C22-ferndale (state) | none before finalization | none; intermediate changes only |

### ch27-13

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | step 375, C17b (state) | none before finalization | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | step 388, C17b (state) | none before finalization | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | step 378, C17b (state) | none before finalization | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | step 522, C17b (state) | none before finalization | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | step 536, C17b (state) | none before finalization | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | step 520, C17b (state) | none before finalization | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | step 486, C17b (state) | none before finalization | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 502, C17b (state) | none before finalization | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | step 328, C17b (state) | none before finalization | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | step 522, C17b (state) | none before finalization | none; intermediate changes only |

### ch28-04

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 547, M18g (state) | step 548, SENS-confirm (new scene) | none; intermediate changes only |

### ch28-08

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/yes) | step 555, M17a (state) | none before finalization | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | step 539, M17a (state) | none before finalization | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | step 406, M17a (state) | none before finalization | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | step 398, M17a (state) | none before finalization | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | step 539, M17a (state) | none before finalization | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | step 548, M17a (state) | none before finalization | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | step 504, M17a (state) | none before finalization | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | step 520, M17a (state) | none before finalization | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/yes) | step 510, M17a (state) | none before finalization | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | step 438, M17a (state) | none before finalization | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | step 441, M17a (state) | none before finalization | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | step 417, M17a (state) | none before finalization | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | step 383, M17a (state) | none before finalization | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | step 523, M17a (state) | none before finalization | none; intermediate changes only |

### ch29-03

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | step 550, C19f (state) | none before finalization | none; intermediate changes only |

### gauge-02

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | none before finalization | step 44, K01e (derived attitude) | none; intermediate changes only |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | none before finalization | step 39, K01g (derived attitude) | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 40, K01f (derived attitude) | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 39, K01f (derived attitude) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | none before finalization | step 39, K01y1 (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 38, K01y1 (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 39, K01y1 (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 43, K01e (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 40, K01f (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 43, K01f (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 40, K01y1 (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | none before finalization | step 40, K01f (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | none before finalization | step 38, K01f (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 41, K01e (derived attitude) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 44, K01e (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 43, K01f (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 48, K01d (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 40, K01y1 (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 46, K01f (derived attitude) | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | none before finalization | step 40, K01f (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | none before finalization | step 39, K01f (derived attitude) | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 44, K01e (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | none before finalization | step 40, K01f (derived attitude) | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 42, K01f (derived attitude) | none; intermediate changes only |

### gauge-04

| Run (baseline/variant diverged) | First raw-state difference | First derived attitude difference | Compared final changes |
|---|---|---|---|
| `2980df09-ad3e-4076-aeab-8f1c5787c16d` (yes/yes) | none before finalization | step 151, C08d (derived attitude) | none; intermediate changes only |
| `1e912343-db4d-470e-b1e3-7a99316fcfc5` (no/no) | none before finalization | step 173, C08d (derived attitude) | none; intermediate changes only |
| `8e2806dc-397c-40d8-bcc5-a07718ea8f6f` (yes/yes) | none before finalization | step 170, C08d (derived attitude) | none; intermediate changes only |
| `2d0a1675-1b85-4bdc-a35a-a0b5cb69a730` (yes/yes) | none before finalization | step 168, C08d (derived attitude) | none; intermediate changes only |
| `86f08dbe-9f00-4a86-832a-e7c97d279dc7` (yes/yes) | none before finalization | step 179, C08d (derived attitude) | none; intermediate changes only |
| `87c2a4a7-1b72-433b-b82b-8acffa3873c3` (yes/yes) | none before finalization | step 155, C08d (derived attitude) | none; intermediate changes only |
| `8777bec0-5b9f-4391-b886-18841514c29c` (yes/yes) | none before finalization | step 161, C08d (derived attitude) | none; intermediate changes only |
| `1ab1eac2-40e6-4ff6-bf6a-753f7fc76982` (yes/yes) | none before finalization | step 127, C08d (derived attitude) | none; intermediate changes only |
| `14d685d9-02d0-48d9-9de3-88aed2aa94b3` (yes/yes) | none before finalization | step 165, C08d (derived attitude) | none; intermediate changes only |
| `38bdb1c3-582a-41cb-bd61-56697532fb81` (yes/yes) | none before finalization | step 169, C08d (derived attitude) | none; intermediate changes only |
| `51f0b219-397a-4693-abe0-446e8b3c8a78` (yes/yes) | none before finalization | step 180, C08d (derived attitude) | none; intermediate changes only |
| `9333aae3-6893-48a5-ba21-4d067d4a4840` (yes/yes) | none before finalization | step 168, C08d (derived attitude) | none; intermediate changes only |
| `c1c61eaa-48fa-431d-9df4-88def70fde65` (yes/yes) | none before finalization | step 170, C08d (derived attitude) | none; intermediate changes only |
| `c4a6b942-276a-4c49-8e7a-9f36b39fd214` (no/no) | none before finalization | step 138, C08d (derived attitude) | none; intermediate changes only |
| `f6281f71-735a-4bc1-ad24-5d3a9391d995` (yes/yes) | none before finalization | step 177, C08d (derived attitude) | none; intermediate changes only |
| `fe25283c-66ca-44d5-8107-5d7c7a5a0420` (yes/yes) | none before finalization | step 171, C08d (derived attitude) | none; intermediate changes only |
| `cad488c4-87f9-46c0-85fb-a5767651a0be` (yes/yes) | none before finalization | step 176, C08d (derived attitude) | none; intermediate changes only |
| `213ec640-24a3-4425-947b-94a2333fa27c` (yes/yes) | none before finalization | step 178, C08d (derived attitude) | none; intermediate changes only |
| `ada47cbb-0877-4157-9fc7-697b0e1fddbd` (yes/yes) | none before finalization | step 144, C08d (derived attitude) | none; intermediate changes only |
| `a362c1e4-1571-48de-b405-2800f20e5566` (yes/yes) | none before finalization | step 131, C08d (derived attitude) | none; intermediate changes only |
| `c2193dff-7881-46fb-b1b4-54cdabca65d6` (yes/yes) | none before finalization | step 176, C08d (derived attitude) | none; intermediate changes only |
| `f8d98a10-6d20-4d23-895d-9ed899bd6d96` (yes/yes) | none before finalization | step 141, C08d (derived attitude) | none; intermediate changes only |
| `595b70a6-290f-4494-a6d4-580899f92879` (yes/yes) | none before finalization | step 166, C08d (derived attitude) | none; intermediate changes only |
| `eb3e000e-deaf-46af-9adb-7d2e40983bb5` (yes/yes) | none before finalization | step 144, C08d (derived attitude) | none; intermediate changes only |
| `63b113cd-a123-4046-91db-b76dd0301d8f` (yes/yes) | none before finalization | step 123, C08d (derived attitude) | none; intermediate changes only |
| `45f765a9-698f-4573-9a3e-56212cb2d91d` (yes/yes) | none before finalization | step 138, C08d (derived attitude) | none; intermediate changes only |
| `b650e50a-620d-415b-9bad-ace6b219b04d` (yes/yes) | none before finalization | step 176, C08d (derived attitude) | none; intermediate changes only |
| `98b3c203-6a87-44e5-9ddc-0264565032f3` (yes/yes) | none before finalization | step 149, C08d (derived attitude) | none; intermediate changes only |
| `9fb2a782-0a4d-4873-b2b5-2b15f909084e` (yes/yes) | none before finalization | step 170, C08d (derived attitude) | none; intermediate changes only |

### ch09-16

No raw/derived-state or compared final-metric difference in any recorded run.

### ch10-18

No raw/derived-state or compared final-metric difference in any recorded run.

### ch13-29

No raw/derived-state or compared final-metric difference in any recorded run.

### ch13-36

No raw/derived-state or compared final-metric difference in any recorded run.

### ch14-05

No raw/derived-state or compared final-metric difference in any recorded run.

### ch17-01

No raw/derived-state or compared final-metric difference in any recorded run.

### ch17-05

No raw/derived-state or compared final-metric difference in any recorded run.

### ch17-06

No raw/derived-state or compared final-metric difference in any recorded run.

### ch17-07

No raw/derived-state or compared final-metric difference in any recorded run.

### ch23-02

No raw/derived-state or compared final-metric difference in any recorded run.

### ch25-06

No raw/derived-state or compared final-metric difference in any recorded run.

### ch26-01

No raw/derived-state or compared final-metric difference in any recorded run.

### ch26-02

No raw/derived-state or compared final-metric difference in any recorded run.

### ch30-06

No raw/derived-state or compared final-metric difference in any recorded run.

### ch31-01

No raw/derived-state or compared final-metric difference in any recorded run.

### ch31-05

No raw/derived-state or compared final-metric difference in any recorded run.

### ch32-05

No raw/derived-state or compared final-metric difference in any recorded run.

## Verification

Initial live-repository health check: `bun run test` finished with **551 pass / 26 fail** during concurrent labelling edits (log: `baseline-test.log`). `bun run check` passed against live story 1.9.15 (`baseline-check.log`). The post-change live test run finished **579 pass / 6 fail** (`final-test.log`); failures included generated-dataset drift, the Stratford tone assertion, randomized On the Run/global termination coverage, the no-input fight assertion and Jericho’s no-stat-change assertion. A later `bun run check` found the live generated dataset stale during further concurrent changes (`final-check.log`). These live checks do not validate or invalidate the frozen scratch analysis. The analysis has its own original-engine oracle and cached/uncached replay verification. Checklist default-output preservation, priority ordering and invalid-input validation are checked independently in scratch directories; see `checklist-verification.log`. No commit was made.
