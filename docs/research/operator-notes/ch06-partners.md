# Operator notes · Chapter 6 · Partners (Connor)

Recorded 2026-11-07 from the operator's two replays, run A (the hostile route) and run B (the drink bought), dictated to the orchestrator. The purpose was to read Hank's level in the flowchart header after every arrow, to calibrate the gauge. Levels are as printed in the header.

| Step | Action | Arrow seen | Hank level after |
|---|---|---|---|
| 0 | Chapter start | — | TENSE (header also: public opinion SKEPTICAL, software instability shown as question marks) |
| 1 | Bar: PERSIST, once | small down (red) | TENSE |
| 2 | Bar: SPILL HANK'S DRINK | large down | HOSTILE |
| 3 | Car: PATIENT | small up | HOSTILE |
| 4 | RECONSTRUCT THE CRIME (correct) | operator did not see an arrow here (uncertain; watching closely) | — |
| 5 | Connor explains the blue blood | small up | TENSE |
| 6 | FOUND DEVIANT (attic) | none shown | TENSE |

Also reported: after the correct reconstruction and the conversation with Hank that follows it, Hank is Tense, no longer Hostile. The operator did not experience HANK REFUSES / HANK ACCEPTS (the "five minutes" prompt): that prompt only appears when Hank's real-time patience runs out before the investigation is finished and Connor asks for more time; on this run the evidence was complete before Hank wanted to leave.

Operator's own caveat: "I don't remember seeing a small up after reconstructing the crime scene. I only saw one after Connor explained the blue blood. I can't verify this; if the wiki says something else I would trust the wiki."

## What this settles (arithmetic in points, one small arrow = 1)

Let the start be S, the top of Tense (one small up from the start reads Neutral per the wiki and the transcript's "to neutral" on the drink). Observed: S−1 Tense; S−1−L Hostile (L = points of the spill's large arrow); S−L Hostile; S−L+1 (or +2 if the reconstruction arrow fired) Tense; one more up, still Tense.

- The benchmark's model at the time (benchmark/scales.mjs H3 and H4: large = 2, Tense three wide with Hostile from −4) is **falsified**: it predicts Tense, not Hostile, after SPILL, and Tense after PATIENT. The transcript's "(This decreases the relationship status to hostile)" was right.
- Fits that remain: (a) Tense two wide and large = 2; (b) Tense three wide and the spill worth 3 (as the Reddit Atticvs reading "spill = −3 small"); (c) Tense five wide and the spill worth 5. Run B (BUY HIM ANOTHER DRINK, then PATIENT, reconstruct, blue blood, find the deviant, reading the level after the drink and at the end) separates them: (a) predicts Friend at the end, (b) Warm or Friend, (c) Neutral, which is what the PowerPyx 100% chart header shows.
- Superseded by the conclusion below: these predictions assumed the drink as large as the spill and the reconstruction's two template arrows; Run B showed neither.

## Run B (the drink bought)

Recorded the same day, same procedure.

| Step | Action | Arrow seen | Hank level after |
|---|---|---|---|
| 0 | Chapter start | — | TENSE |
| 1 | Bar: PERSIST, once | small down | TENSE |
| 2 | Bar: BUY HIM ANOTHER DRINK | large up | NEUTRAL |
| 3 | Car: PATIENT | small up | NEUTRAL |
| 4–5 | RECONSTRUCT THE CRIME (correct), then Connor explains the blue blood | one small up in total, on the blue-blood line | NEUTRAL |
| 6 | FOUND DEVIANT (attic) | no arrow on screen | NEUTRAL (matches the PowerPyx 100% chart header) |

Amanda does not appear anywhere in Partners (checked on both replays; it was an open question).

## Conclusion from both runs (arithmetic in points, one small arrow = 1)

Start S = −1 at the top of Tense, Tense = [−w, −1], Hostile from −w−1, Neutral = [0, w−1].

- Run A: after PERSIST Hank is at −2 (Tense). The spill (L points) reads Hostile, so −2−L ≤ −w−1; one small up still reads Hostile, so −1−L ≤ −w−1; the single blue-blood up reads Tense, so −L ≥ −w. Together: **L = w** exactly.
- Run B: after PERSIST −2; the drink (D points) reads Neutral, so D ≥ 2; two more small ups still read Neutral, so −2+D+2 ≤ w−1, i.e. **2 ≤ D ≤ w−1**, which needs **w ≥ 3**.
- "Large" is therefore not one size. The minimal fit is **w = 3: spill −3, drink +2**, exactly the Reddit Atticvs reading (SOURCES.md section 13). It keeps the benchmark's Hank width (3) and start (−1).
- Under w = 3, Run B ends at +2, the top of Neutral: a second small up on the reconstruction, or a hidden small up on FOUND DEVIANT, would have read Warm. Both are ruled out. (Run A cannot tell: it ends at −3, where one more small up still reads Tense.)

Adopted in story 1.9.3: SPILL HANK'S DRINK −3 (was −2), BUY HIM ANOTHER DRINK +2, one +1 for the reconstruction and the blue-blood explanation together (was two), no arrow on FOUND DEVIANT, no Amanda change in Partners. benchmark/scales.mjs records this as M4 and lists the spill in `MEASURED_ARROWS`; tests/ch06.test.mjs replays both runs and checks the level after every step.

## Still open

- Is w exactly 3? A wider Tense with a matching spill also fits both runs (w = 4: spill −4, drink +2 or +3; w = 5: spill −5, drink +2 to +4). One more small Hank up after Run B's route, read in the next header where Hank appears, separates them: Warm under w = 3, still Neutral under w = 4 or 5 with a +2 drink.
