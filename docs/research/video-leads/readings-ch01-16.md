# Video readings: chapters 01–16

Read 2026-11-08 from the leads in `ch01-16.md`. Method: each segment downloaded with yt-dlp (720p or lower; 1080p for one flowchart), frames extracted with ffmpeg at 1 fps (2–4 fps around popups and menus) and read directly; popups were cropped and zoomed. Timestamps below are positions in the source video. Decisive frames are in `docs/research/video-evidence/chNN/` (`<conflictId>-<videoId>-<mm-ss>.png`; composites run left to right in time).

No frame contradicts a completed in-game chart (`docs/flowcharts/`). The charts print no arrows or numbers, so every arrow and number reading below comes from the video alone.

**Result: 11 conflicts with leads. 9 settled, 1 partly settled, 1 not settled.**

| Conflict | Verdict | Answer | Benchmark change |
|---|---|---|---|
| ch06-13 | Settled | No. The wrong button just picked is removed from the repeated menu | C05: hide wrong answers already picked for the current question |
| ch07-21 | Settled | No. FACE TODD goes straight to the fight, with no REFUSE / ACCEPT | None (benchmark already follows the template) |
| ch09-01 | Partly settled | Did not confess early on this path: four PRESSUREs at 79–99% before the confession | None |
| ch09-03 | Settled | Once | None |
| ch09-04 | Settled | About 5 (73→68 and 21→16) | `RULES.pressureGiveUp` −20 → −5 |
| ch10-07 | Settled | Two Alice up arrows | Sleep beside Alice +1 → +2 |
| ch10-13 | Settled | Yes, one small Alice up | Give the toy: 0 → +1 |
| ch13-01 | Not settled | — | — |
| ch13-09 | Settled | GO: Hank down, instability down. GIVE UP: Hank up, instability up (all small) | None (benchmark already applies the wiki's ±1) |
| ch13-13 | Settled | Yes, a small Hank down (seen after DIPLOMATIC) | None (benchmark already applies −1) |
| ch16-05 | Settled | Yes, a small Jericho up | MTD6 option 0: add jerichoTrust +1 |

---

## 06 · Partners

### ch06-13: Is a wrong report answer still offered on the retry?

- **Question:** In the report to Hank, when a question repeats after a wrong answer, is the wrong button you just picked still on screen?
- **Lead:** `gZQ693-umPU` (MiKeYROG / Sag903), segment "Fail to reconstruct the crime". The report is at 27:24–28:47.
- **Reading:** Second question ("the victim attacked the android…"). At 27:56 the menu shows three buttons: …WITH THE BAT (Y), …WITH THE KNIFE (B), …WITHOUT A WEAPON (A). The player picks WITH THE KNIFE (27:58), and Hank says "No, that can't be right…". When the question returns (28:07), the menu has only two buttons, …WITH THE BAT (B) and …WITHOUT A WEAPON (A); the knife is gone and the other buttons move up. The player then picks WITHOUT A WEAPON ("Your story makes no sense…") and next WITH THE BAT ("That lines up with the evidence"). A third wrong answer later ("The victim stabbed the android") ends the report: "I've just hit my bullshit quota…", and a HANK small-down popup appears at 28:38. That matches the benchmark's −1 for three wrong answers.
- **Verdict:** Settled: **no**. A wrong answer is removed from the repeated question, so each retry offers one fewer button.
- **Frames:** `video-evidence/ch06/ch06-13-gZQ693-umPU-27-56.png` (3 buttons → knife picked → 2 buttons), `ch06-13-gZQ693-umPU-28-38.png` (Hank down on the third mistake).
- **Benchmark change:** In C05 (`benchmark/chapters/ch06.mjs` `available`), drop options already answered wrong at the current `ch06QuizStep`. This needs a per-question record of wrong picks, for example `ch06WrongPicked[step]`. Today, retries show the same set ("Retries retain exactly the same mapping"). The change must be gated by story version for replay. Side effect: a question can now be failed at most twice (two wrong of three) before only the right answer remains, so the three-mistake failure needs wrong answers spread over at least two questions. That matches what the video shows.

## 07 · Stormy Night

### ch07-21: FACE TODD at the window: REFUSE / ACCEPT before the fight?

- **Question:** After choosing FACE TODD at the open window, does Todd order Kara to move with REFUSE / ACCEPT buttons before the fight?
- **Lead:** `k5aILBAEewM` (MiKeYROG / Sag903), segment "Open window, Go out, face Todd" (1:15:25–1:19:50).
- **Reading:** At 1:16:30 the JOIN ALICE (B) / FACE TODD (A) menu is on screen, and FACE TODD is pressed at 1:16:31. Todd enters the room and grabs Kara by the shoulder, and Kara is thrown against the crib at about 1:16:33. The choke and push QTEs follow from about 1:16:36. Frames read at 3 fps from 1:16:28 to 1:16:38 show no menu between FACE TODD and the fight.
- **Verdict:** Settled: **no**. After FACE TODD there is no REFUSE / ACCEPT prompt; the fight (DEFEND ALICE) starts at once. This matches the template, not the wiki.
- **Frames:** `video-evidence/ch07/ch07-21-k5aILBAEewM-76-29.png` (menu → Todd at the door → grab → fight).
- **Benchmark change:** None. K03g's FACE TODD already goes to the fight without the prompt (K03h adaptation note).

## 09 · The Interrogation

### ch09-01: Can confession occur before four PRESSURE inputs?

- **Question:** Under PRESSURE IT, did the android ever confess before you had pressed PRESSURE four times?
- **Lead:** `OqQHtFfZvgk` (MiKeYROG / Sag903), segment "Pressure, maintain pressure, Android confesses" (15:00).
- **Reading:** After PRESSURE IT the gauge reads 69% (about 18:04). The PRESSURE / GIVE UP menu then comes back after every press while stress climbs 79% (18:13), 89% (18:22) and 99% (18:28). The menu is still offered at 99% ("Stop it, stop!", 18:31). After the fourth PRESSURE ("Just say you killed him"), the android confesses at 18:45 ("He tortured me every day…"). Stress was above 50% from PRESSURE IT onward, but no early confession happened.
- **Verdict:** Partly settled. On this path (well above 50% after PRESSURE IT), the confession needed all four PRESSUREs, and the menu was offered after each of the first three. That supports the benchmark. One path cannot rule out an early confession from some other starting stress, but it does rule out "talks as soon as he is above 50%". It also confirms +10% per PRESSURE.
- **Frames:** `video-evidence/ch09/ch09-01-OqQHtFfZvgk-18-13.png` (79% → 89% → 99%), `ch09-01-OqQHtFfZvgk-18-31.png` (menu at 99% → fourth press → confession).
- **Benchmark change:** None.

### ch09-03: One or two COMFORT / REASSURE / THREATEN / BLAME selections?

- **Question:** In the COMFORT / REASSURE / THREATEN / BLAME round, did you pick once or twice before the SYMPATHIZE / THREATEN / PROBE MEMORY / TRUST round started?
- **Lead:** `OqQHtFfZvgk`, markers 42:30 and 50:50. The round was read in the 15:00 segment, which plays the same opening, and checked against the dialogue of the 29:55 convince path.
- **Reading:** The COMFORT / REASSURE / THREATEN / BLAME menu is on screen at 16:13. One pick (THREATEN: "You've refused to talk since they arrested you… they'll do things the hard way") moves stress from 36% to 39% (TOO LOW). The SYMPATHIZE / THREATEN / PROBE MEMORY / TRUST menu follows directly at 16:27. That next round is picked **twice**: at 16:40 the same menu returns without THREATEN, and PROBE MEMORY is then picked. The 29:55 path shows the same pattern in its dialogue: one COMFORT line ("I know you've been through a lot"), then two lines from the next round (SYMPATHIZE "I'm on your side", TRUST "you've got to trust me").
- **Verdict:** Settled: **once**.
- **Frames:** `video-evidence/ch09/ch09-03-OqQHtFfZvgk-16-13.png` (COMFORT round → SYMPATHIZE round → same round again without THREATEN).
- **Benchmark change:** None. C06d is asked once, and C06e/C06f ask the SYMPATHIZE round twice.

### ch09-04: GIVE UP after PRESSURE: −20 or −5 stress?

- **Question:** After PRESSURE IT, when you chose GIVE UP, by how many points did the stress percentage drop (about 20 or about 5)?
- **Lead:** `OqQHtFfZvgk`, markers 24:10 ("Pressure, give up, give up") and 29:55 ("Pressure, give up, intervene").
- **Reading:** 24:10 path: after PRESSURE IT the gauge reads 73% with the PRESSURE / GIVE UP menu (27:44). GIVE UP ("All right… Everything is going to be okay") leaves the gauge at **68% (OPTIMAL)** at 27:56. 29:55 path: PRESSURE IT reads 21% (33:13), and GIVE UP leaves **16% (TOO LOW)** at 33:23. Both drops are 5 points.
- **Verdict:** Settled: **about 5** (−5%, as PowerPyx says; the wiki's −20 is wrong).
- **Frames:** `video-evidence/ch09/ch09-04-OqQHtFfZvgk-27-44.png` (73% → 68%), `ch09-04-OqQHtFfZvgk-33-13.png` (21% → 16%).
- **Benchmark change:** `benchmark/chapters/ch09.mjs` `RULES.pressureGiveUp` −20 → −5 (GIVE UP, option 1 of C06p1–4 and C06rp1–4). Gate it by story version for replay. As the conflict notes, this decides whether a later CONVINCE can land in 50–70%: a pressure-then-give-up path now stays much higher (for example 68%, inside OPTIMAL, in the first path).

### ch09-14: not counted (no qualified lead in `ch01-16.md`).

## 10 · Fugitives

### ch10-07: Number of Alice arrows specifically for sleeping beside her

- **Question:** When Kara chose to sleep next to Alice in the motel or squat, how many Alice up arrows appeared: none, one or two?
- **Lead:** `D-nrWXiEsVo` (DanaDuchy, 2022), Motel section (15:15).
- **Reading:** At 20:39 the motel prompt GET IN BED / WALK AWAY is on screen, and Kara lies down beside Alice. From 20:53, at 4 fps: "ALICE ^" appears (single chevron, small) for about 1.5 s. The arrow then disappears and "ALICE" fades. A fresh chevron then appears, and the popup reads "ALICE ^" with a **TRUSTED** level badge (20:56–20:58). For comparison, a single level-changing popup (On the Run, `tSyMeat_n-M` about 23:37, "ALICE ^ FAMILY") shows the arrow and badge together in one continuous popup without the arrow leaving and coming back. A single non-changing popup (the toy, below) shows one arrow that fades once. So these are two separate small increases, and the second one moved Alice into Trusted.
- **Verdict:** Settled: **two** (the wiki's "x2" is two arrows for one sleep, not one per place).
- **Frames:** `video-evidence/ch10/ch10-07-D-nrWXiEsVo-20-39.png` (GET IN BED prompt, then the first and second popups), `ch10-07-D-nrWXiEsVo-20-53-strip4fps.png` (the full 4 fps sequence: arrow, fade, second arrow with TRUSTED).
- **Benchmark change:** `benchmark/chapters/ch10.mjs`, arrow table row "KARA SLEEPS NEXT TO ALICE (motel or squat)": +1 → +2 (two small ups), wherever the sleep-beside option is applied (KF07). Gate by story version. Only the motel was observed; the squat is assumed to be the same, since the wiki names both together.

### ch10-13: Alice arrow when given the stolen toy

- **Question:** When Kara gave Alice the stolen toy, did an Alice up arrow appear?
- **Lead:** `fQ8wq4BsYQM` (MiKeYROG), marker 22:20. That marker is the start of the segment (the bus and the walk to shelter), not the gift; the window read (22:15–24:05) ended at the laundromat before the toy. The moment was read instead in the ch10-07 lead's video, `D-nrWXiEsVo` (DanaDuchy).
- **Reading:** In the motel, after the chocolate, Kara takes the stolen plush dog from the table, holds it behind her back (20:13) and puts it in sleeping Alice's arms. A single "ALICE ^" (one chevron, small, no badge) appears at 20:21 and fades once.
- **Verdict:** Settled: **yes**, one small Alice up (the wiki is right; the template omits it).
- **Frames:** `video-evidence/ch10/ch10-13-D-nrWXiEsVo-20-13.png` (toy in hand → Alice with toy, ALICE ^).
- **Benchmark change:** Give the toy (KF06, the toy option that sets `ch10ToyGiven`): 0 → Alice +1. Gate by story version. The benchmark's "ch10 gift gating" note is unaffected.

## 13 · On the Run

### ch13-01: Voluntarily leave the squat while Ralph keeps quiet

- **Question:** As Connor searching the squat (Ralph kept quiet), could you walk out on your own before Hank ordered you out, and did that unlock a LEAVE THE SQUAT node?
- **Lead:** `AH-zJSO_DNo` (MiKeYROG / Sag903), segment "Forgot gun, Undiscovered in Squat" (00:00).
- **Reading:** The player searches the ground floor (Ralph's stress gauge visible throughout), then stands still until Hank comes in ("Connor… what the fuck are you doing?… C'mon, let's get outta here", about 16:00). No voluntary exit is tried. The chart at 18:10 shows INVESTIGATE SQUAT GROUND FLOOR with CHECK UPSTAIRS, ANALYZE SQUAT ANDROID, CHECK TABLE, CHECK KITCHEN, CHECK FIREPLACE and HANK COMMANDS CONNOR TO LEAVE (5%) → SQUAT ANDROID DISAPPEARS → KARA & ALICE UNDISCOVERED IN SQUAT. Two padlocked "[…]" nodes remain: one under CHECK UPSTAIRS, fed from the bracket, and one after CHECK TABLE. The video's end-of-chapter chart reads 57% complete for the chapter, so it is not a 100% chart.
- **Verdict:** Not settled. The lead does not attempt the exit. The locked node fed from the hub is consistent with an unreached LEAVE THE SQUAT but does not show it is reachable.
- **Frames:** `video-evidence/ch13/ch13-01-AH-zJSO_DNo-18-10.png` (the squat bracket with the locked nodes and HANK COMMANDS CONNOR TO LEAVE).
- **Benchmark change:** None yet.

### ch13-09: Fence GO / GIVE UP: Hank and instability arrows

- **Question:** At the fence, did GO show Hank down and software instability down, and GIVE UP Hank up and instability up?
- **Lead:** `BBXCrNx-ocU` (ScorpionTank, 2020, Experienced) for GIVE UP. GO was read in `AH-zJSO_DNo` (MiKeYROG), segment "Connor catches Kara, Car hits Kara" (55:10), because the brief had no GO lead.
- **Reading:** GIVE UP: at 10:42 the GO / GIVE UP prompt is on screen ("Hey, you will get yourself killed!"), and GIVE UP is chosen. "SOFTWARE INSTABILITY ^" (10:46) is followed by "HANK ^" (10:48), each with a single chevron. GO: at 55:39–55:40 the B GO prompt is pressed and Connor climbs. "SOFTWARE INSTABILITY v" appears, then "HANK v" (about 55:42–55:44), each with a single chevron.
- **Verdict:** Settled: **yes for each**. GO gives Hank small down and instability small down; GIVE UP gives Hank small up and instability small up (the wiki is right; the template omits them).
- **Frames:** `video-evidence/ch13/ch13-09-BBXCrNx-ocU-10-42.png` (prompt → SI ^ → HANK ^), `ch13-09-BBXCrNx-ocU-10-46.png` (zoomed popups), `ch13-09-AH-zJSO_DNo-55-39-GO-strip3fps.png` (GO pressed → SI v → HANK v).
- **Benchmark change:** None. C09 already applies these ±1 (`WIKI_ONLY` in `ch13.mjs`); they can now be marked as observed.

### ch13-13: Hank arrow on RATIONAL / DIPLOMATIC / DIRECT at the motel

- **Question:** At the motel, when Hank said "You wait in the car" and Connor answered (RATIONAL / DIPLOMATIC / DIRECT), did a Hank-down arrow appear?
- **Lead:** `tSyMeat_n-M` (DanaDuchy), Motel 22:11. Its motel section opens with Kara's morning, and the window read did not reach Connor's arrival. The exchange was read instead in `BBXCrNx-ocU` (ScorpionTank, Experienced), "Connor And Hank Arrive" (07:32).
- **Reading:** At 8:32 the RATIONAL / DIPLOMATIC / DIRECT menu is on screen, and DIPLOMATIC is chosen ("I think it's best if I go with you"). Hank: "Listen, I'm tired of you talkin' back to me… shut the fuck up and do what I say!" Connor: "All I want is to accomplish my mission. I'm sorry if that upsets you." Hank: "Wanna see the end of your mission? Stop busting my fucking balls…" As Hank walks off, "HANK v" (single chevron) appears at 8:51. The creator's description calls the decrease "unavoidable if Kara stayed in the motel".
- **Verdict:** Settled: **yes**, a small Hank down (observed after DIPLOMATIC). RATIONAL and DIRECT play the same continuation in the template, and the arrow comes at its end, so the same arrow is expected for all three; only DIPLOMATIC was seen.
- **Frames:** `video-evidence/ch13/ch13-13-BBXCrNx-ocU-08-32.png` (menu → HANK v).
- **Benchmark change:** None. C09m1 already applies −1 on all three options.

## 16 · Time to Decide

### ch16-05: Jericho arrow on proposing the raid to Simon

- **Question:** When Markus proposed the raid to Simon at the end of Time to Decide, did a Jericho arrow appear (besides North and Simon)?
- **Lead:** `y50ZjZWX0gU` (ScorpionTank, 2020, Experienced), closing Simon scene (about 11:14–11:58).
- **Reading:** After North's "I'm with you" (11:45), "NORTH ^" appears. "JERICHO ^" with a NEUTRAL badge follows at about 11:47, then "SIMON ^" with a NEUTRAL badge at about 11:50. All are single chevrons (small). The creator's description agrees: "when speaking to Simon you will get an increase to everyone (Jericho included…), except Josh."
- **Verdict:** Settled: **yes**, a small Jericho up (the wiki is right; the template omits it).
- **Frames:** `video-evidence/ch16/ch16-05-y50ZjZWX0gU-11-45.png` (NORTH ^ → JERICHO ^ → SIMON ^ NEUTRAL).
- **Benchmark change:** MTD6 option 0: add `{key:'jerichoTrust', delta:+1}` (`benchmark/chapters/ch16.mjs`, alongside the North and Simon +1; remove the "Not applied" note). Gate by story version.
- **Side reading (scales):** The first popup for each of North (talk, about 6:52), Jericho and Simon carries a NEUTRAL badge after one small increase from the start. This is consistent with H7 and H8 in `benchmark/scales.mjs` (start at the bottom of Neutral, so one small up stays Neutral). North's second up in the Simon scene shows no badge. If a badge means a level change, this suggests North was still Neutral after two small ups, which would falsify H8's width 2. However, the NEUTRAL badges on first display show that badges are not only level changes. The badge's meaning is unclear, so this is recorded and not acted on. The video ends without a chart header.

---

## Conflicts in `ch01-16.md` without a lead (not read)

ch04-10, ch05-08, ch06-02, ch06-03, ch07-17, ch09-14, ch09-16, ch10-18, ch10-24, ch10-34, ch11-05, ch13-16, ch13-18, ch13-29, ch13-36, ch14-05, ch15-10, ch15-12, ch15-14, ch15-18, ch16-03.
