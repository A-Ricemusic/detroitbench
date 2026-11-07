# Operator notes · Chapter 6 · Partners (Connor)

Recorded 2026-11-07 from the operator's replay, run A (the hostile route), dictated to the orchestrator. The purpose was to read Hank's level in the flowchart header after every arrow, to calibrate the gauge. Levels are as printed in the header.

| Step | Action | Arrow seen | Hank level after |
|---|---|---|---|
| 0 | Chapter start | — | TENSE (header also: public opinion SKEPTICAL, software instability shown as question marks) |
| 1 | Bar: PERSIST, once | small down (red) | TENSE |
| 2 | Bar: SPILL HANK'S DRINK | large down | HOSTILE |
| 3 | Car: PATIENT | small up | HOSTILE |
| 4 | RECONSTRUCT THE CRIME (correct) | operator did not see an arrow here (uncertain; watching closely) | — |
| 5 | Connor explains the blue blood | small up | TENSE |
| 6 | FOUND DEVIANT (attic) | not reported | TENSE |

Also reported: after the correct reconstruction and the conversation with Hank that follows it, Hank is Tense, no longer Hostile. The operator did not experience HANK REFUSES / HANK ACCEPTS (the "five minutes" prompt): that prompt only appears when Hank's real-time patience runs out before the investigation is finished and Connor asks for more time; on this run the evidence was complete before Hank wanted to leave.

Operator's own caveat: "I don't remember seeing a small up after reconstructing the crime scene. I only saw one after Connor explained the blue blood. I can't verify this; if the wiki says something else I would trust the wiki."

## What this settles (arithmetic in points, one small arrow = 1)

Let the start be S, the top of Tense (one small up from the start reads Neutral per the wiki and the transcript's "to neutral" on the drink). Observed: S−1 Tense; S−1−L Hostile (L = points of the spill's large arrow); S−L Hostile; S−L+1 (or +2 if the reconstruction arrow fired) Tense; one more up, still Tense.

- The benchmark's model at the time (benchmark/scales.mjs H3 and H4: large = 2, Tense three wide with Hostile from −4) is **falsified**: it predicts Tense, not Hostile, after SPILL, and Tense after PATIENT. The transcript's "(This decreases the relationship status to hostile)" was right.
- Fits that remain: (a) Tense two wide and large = 2; (b) Tense three wide and the spill worth 3 (as the Reddit Atticvs reading "spill = −3 small"); (c) Tense five wide and the spill worth 5. Run B (BUY HIM ANOTHER DRINK, then PATIENT, reconstruct, blue blood, find the deviant, reading the level after the drink and at the end) separates them: (a) predicts Friend at the end, (b) Warm or Friend, (c) Neutral, which is what the PowerPyx 100% chart header shows.

## Open after this run

- Does RECONSTRUCT THE CRIME show its own Hank up arrow (wiki: yes; operator: not seen)?
- Does FOUND DEVIANT show a Hank up arrow (wiki: yes; not reported)?
- Run B readings.
