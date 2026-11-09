# Video readings, pass 2: chapters 09–16

Read 2026-11-08. Scope: the 18 listed entries in the chapter 09–16 sections of `CONFLICTS.md`, including the partly settled ch09-01 and unresolved ch13-01 from pass 1. This is a separate reader report; no conflict list, source inventory, chapter implementation, atlas, recap or test was edited.

**Result:** 17 backlog conflicts investigated: **3 newly settled, 2 partially settled, 12 not settled**. The additional ch15-10 entry was reviewed as an **already settled duplicate** of ch18-01, giving 18 entries reviewed in total (4 settled if that inherited duplicate is included). Eleven conflicts received new frame inspection; six received searches without a branch-qualified new frame reading. All 50 referenced evidence PNGs exist and are 720 pixels high or lower; the frame inventory and checksums are in `evidence-check.json` in the helper directory. Unsettled does not mean the benchmark is wrong.

New settlements: **ch13-16** (immediate SIT bypasses the extra prompt), **ch13-18** (BLUFF has a follow-up menu), **ch16-03** (North is Resentful after YOU, before Simon). The closing table separates behavior changes, a confirmed existing behavior and the inherited duplicate.

## Method and limits

Read `BRIEF.md`, `ch01-16.md`, `readings-ch01-16.md`, the chapter 09–16 conflict questions and `research/README.md` first. Completed in-game flowcharts remain authoritative. Downloaded segments use `yt-dlp --download-sections` with `-f "bv*[height<=720]"`, no cookies or login, one video download at a time. Download ranges, logs, metadata searches, extracted inspection frames and helper scripts are under `/Users/pelicannurse/.t3/detroitbench-tools/video-pass2/ch09-16/`. Overview inspection uses frames every 2–10 seconds, with denser extraction around candidate prompts. Only selected evidence frames are copied into `docs/research/video-evidence/chNN/`.

A search-only attempt does not count as a frame reading. A clip of the right scene without the disputed earlier condition does not settle a conditional gate. A route that performs an optional action does not establish that the action is mandatory. No numerical calibration is inferred from an unlabelled relationship bar.

## 09 · The Interrogation

### ch09-01 — Confession before the fourth PRESSURE

- **Existing frame evidence:** `OqQHtFfZvgk`, 18:04–18:45; see pass 1 and its saved frames. Four presses on the observed high-stress path.
- **Additional search:** `pressure-search.txt`: `r0rqPzM3l_o` (THE INTERROGATION WITH PRESSURE), `MzprdJbLTXE` (all choices), `KADLvfx7n4A` (100% stress). The metadata does not identify an early confession; `r0rqPzM3l_o` was then inspected as an alternate pressure path.
- **New video / reading:** [r0rqPzM3l_o](https://youtu.be/r0rqPzM3l_o), *Detroit : Become Human THE INTERROGATION WITH PRESSURE (PlayStation 4 GamePlay)*. Download 00:00–04:22; overview every 5 seconds, then 2 fps from 02:25–03:20. PRESSURE IT is selected around 02:31. The first PRESSURE / GIVE UP menu follows at about 02:43, after the meter settles at 61%. Further menus occur at about 02:53 (71%), 02:59 (81%) and 03:06 (91%). The confession begins around 03:19, after the fourth pressure response. There is no early confession on this lower-stress route either. Difficulty was not established.
- **Frames:** `../video-evidence/ch09/ch09-01-r0rqPzM3l_o-02-43.png`, `ch09-01-r0rqPzM3l_o-02-48-75.png`, `ch09-01-r0rqPzM3l_o-02-53-75.png`, `ch09-01-r0rqPzM3l_o-02-59-75.png`, `ch09-01-r0rqPzM3l_o-03-03-75.png`, `ch09-01-r0rqPzM3l_o-03-06.png`, `ch09-01-r0rqPzM3l_o-03-19.png`.
- **Verdict:** **Partially settled**. Two different observed stress paths require four presses; an early confession at another starting stress is still not excluded. No change implied.

### ch09-14 — Failed PRESSURE, INTERVENE once, then GIVE UP

- **Video:** [T_GnIC_Ymno](https://youtu.be/T_GnIC_Ymno), PopDance Ai, *DETROIT BECOME HUMAN - CONNOR INTERROGATION - DIFFERENT SCENARIOS*.
- **Download:** 11:50–14:10; inspected overview every 10 seconds and officer sequence every 3 seconds.
- **Reading:** At 12:16 an editorial card says “SCENE 2: CONNOR INTERVENES ONCE/ ANDROID SHOOTS ITSELF”. At 12:22 the first officer menu offers both INTERVENE and GIVE UP. After Connor's intervention (“It'll self-destruct if it feels threatened”), the second menu at 12:31 again offers INTERVENE / GIVE UP. The android shoots itself by 12:37; Connor survives. A separate following variant ends with Connor dead on the floor at 13:19; it must not be conflated with the preceding editorially labelled one-intervention variant. The clip cuts into the officer sequence, so the earlier interrogation approach is not established by this segment.
- **Frames:** `../video-evidence/ch09/ch09-14-T_GnIC_Ymno-12-16.png` (editorial variant label), `ch09-14-T_GnIC_Ymno-12-22.png`, `ch09-14-T_GnIC_Ymno-12-31.png`, `ch09-14-T_GnIC_Ymno-12-37.png`, `ch09-14-T_GnIC_Ymno-12-43.png`, `ch09-14-T_GnIC_Ymno-13-19.png`.
- **Second locator check:** the 20:06 marker begins a new full interrogation replay, not the pressure action. Downloaded 19:46–22:30: it covers the chapter setup and analysis, not the requested ending.
- **Further candidate check:** `T_GnIC_Ymno` 26:40–30:10 shows a completed confession (26:42 onward), post-confession questions and then the officer removal at 30:02. Thus this candidate does not establish the required **without confession** prerequisite, irrespective of the later death outcome.
- **Failed-pressure candidate:** `OqQHtFfZvgk`, variant starting 29:55. Pass 1 already saved its pressure-stage GIVE UP at 33:13–33:23. New segments 33:30–35:15 and 35:00–37:30 show CONFESSION NOT OBTAINED at 33:33; INTERVENE is selected around 33:55. At the second officer menu around 34:03 the player intervenes again, continuing to the Gavin confrontation and subsequent calming sequence. The android is escorted out at 35:13; the final chart reads ANDROID WAS SENT BACK TO ITS CELL. This route establishes failed interrogation plus continued intervention, **not** GIVE UP after exactly one intervention. It therefore does not settle the requested ending.
- **Additional frames:** `../video-evidence/ch09/ch09-14-OqQHtFfZvgk-33-33.png`, `ch09-14-OqQHtFfZvgk-33-55.png`, `ch09-14-OqQHtFfZvgk-34-03.png`, `ch09-14-OqQHtFfZvgk-34-05.png`, `ch09-14-OqQHtFfZvgk-35-27.png`.
- **Verdict:** **Partially settled** for button availability only: GIVE UP is present on the first two officer menus, despite those labels missing from the cited string groups. The exact failed-pressure ending still needs its prerequisite shown. Do not infer that all interrogation approaches share this ending.

### ch09-16 — Amanda after successful probe, Connor survives

- **Searches:** `probe-search.txt`, `probe-amanda-search.txt`, `continuous-search.txt`; metadata in `amanda-description.txt`.
- **Candidates rejected:** `XjqtDT_Oa_w` is restored Amanda dialogue, not normal gameplay; `l-jo4iWwLNo` concerns a resisted probe; `wsTum99TgWU` explicitly follows crime-unsolved / insufficient-evidence failures, not a successful probe. None establishes the required continuous save.
- **Frames saved:** None.
- **Verdict:** **Not settled**. No change implied.

## 10 · Fugitives

### ch10-18 — Zlatko robbery report after diversion, no gun

- **Search:** `robbery-search.txt`; candidates `Xxa7f68lrp8` (shelter choices) and `doM7h-6T7hc` (store choices).
- **Reading:** No frame reading establishing the diversion/no-gun action and Zlatko report on the same saved path. A store compilation alone cannot answer the cross-chapter question.
- **Frames saved:** None.
- **Verdict:** **Not settled**. No change implied.

### ch10-24 — Generator pliers before inspecting squat fence

- **Candidates:** DanaDuchy `D-nrWXiEsVo`, Parking Lot marker 30:52; additional wire-cutter guides `1dgr0q9cIfc` and `rIWS1Yscfps` (`pliers-search.txt`, `extra-descriptions.txt`).
- **Compilation reading:** The 30:32–34:04 DanaDuchy segment shows the abandoned-car interaction and its alternatives, with a cut between clothing variants. It contains no generator-pliers pickup and cannot establish the fence prerequisite.
- **Guide reading:** `1dgr0q9cIfc`, downloaded 00:00–02:30 (the source ends at about 01:08). It starts by inspecting the squat fence (00:02–00:22, including the “CAN CUT FENCE HERE WITH A WIRE CUTTER” objective), then walks into the parking lot and shows GRAB at the generator at 00:52. This establishes the pickup location, but its order is fence first, so it cannot test pickup before inspection.
- **Frames:** `../video-evidence/ch10/ch10-24-1dgr0q9cIfc-00-22.png`, `ch10-24-1dgr0q9cIfc-00-52.png`.
- **Second guide:** `rIWS1Yscfps`, downloaded 00:00–03:00 and inspected every 5 seconds. It likewise starts by inspecting the fence (00:02), then takes **store** wire cutters around 01:12, not the generator pliers. It tests neither pickup before inspection nor the generator-specific gate. Frames: `../video-evidence/ch10/ch10-24-rIWS1Yscfps-00-02.png`, `ch10-24-rIWS1Yscfps-01-12.png`.
- **Verdict:** **Not settled**. The generator pickup location is observed, but pickup before checking the fence is not.

### ch10-34 — Shelter without trash-collector meeting

- **Searches / new lead:** `shelter-search.txt` and `car-search.txt`; [SXUnU7yxZpU](https://youtu.be/SXUnU7yxZpU), *Let's Play Detroit: Become Human - Fugitives (Abandoned Car) (Survivors Trophy Run)*. Its short continuous car route was downloaded from 00:00–10:42, because the omission question requires checking the whole street-to-shelter path. Inspected every 5 seconds, including its opening and final charts.
- **Reading:** The video begins before leaving the bus. Kara explores the street, inspects the squat fence around 04:45–05:02, returns toward Alice, and meets the trash-collector android around 05:50–06:15. She enters the parking lot around 06:40, opens the car and selects STAY HERE around 08:07, then completes the car ending. This route therefore includes the collector before shelter commitment. There is no demonstrated collector omission. The earlier street android at 03:12–03:22 is the unresponsive android at a parking stand, a separate encounter; it was not substituted for the collector.
- **Frames:** `../video-evidence/ch10/ch10-34-SXUnU7yxZpU-05-52.png`, `ch10-34-SXUnU7yxZpU-06-07.png`, `ch10-34-SXUnU7yxZpU-08-07.png`, `ch10-34-SXUnU7yxZpU-10-27.png`.
- **Further search:** `car-fast-search.txt` / `car-direct-search.txt` sought a direct speedrun route. The new candidate `Qyu73W4vmd8` (VGS, all endings) marks the car ending at 32:20 in a 33:54 compilation; its metadata does not establish a continuous omission route, so it is not counted as proof.
- **Verdict:** **Not settled**. Observing the meeting on this route does not prove every possible route requires it. No change implied.

## 11 · From the Dead

### ch11-05 — Crawling plea after eye and audio repaired

- **Video:** DanaDuchy [3y5R9Td2TLg](https://youtu.be/3y5R9Td2TLg), *Jericho (choices) | Detroit Become Human*, From the dead marker 00:00.
- **Additional search:** `crawl-search.txt` returned `Ph3LJU-qw6w` and `PoVAMT8iXvs`; descriptions do not establish replacement order.
- **Downloads / reading:** `3y5R9Td2TLg` 03:00–08:30 and 08:10–11:55, inspected every 5 seconds. The compilation shows KILL / SPARE interactions before the replacement sequence, a compatible audio processor around 06:57 and taking it around 07:02–07:17, the optical/head sequence around 07:30–08:17, then part collection, a stabilized condition and climbing the slope around 09:22. No verified fresh crawling-android plea after both replacements was identified. The compilation contains alternate interactions; a KILL / SPARE prompt for the pump android must not be substituted for the crawling android.
- **Frames:** `../video-evidence/ch11/ch11-05-3y5R9Td2TLg-06-57.png`, `ch11-05-3y5R9Td2TLg-07-12.png`, `ch11-05-3y5R9Td2TLg-07-57.png`, `ch11-05-3y5R9Td2TLg-09-17.png`, `ch11-05-3y5R9Td2TLg-09-22.png`. These document the inspected repair/exit route, not a positive trigger test.
- **Additional full-chapter lead:** `McLcd0ugj0Y`, MiKeYROG / Sag903, *100% Flowchart Chapter 11 From the Dead*, markers 00:00 “Refuse to kill, kill for pump” and 15:55 “Kill, refuse to kill for pump” (`dead-100-description.txt`). Its metadata does not identify the eye/audio order; no frame claim is made for that candidate.
- **Verdict:** **Not settled**. No post-repair trigger or controlled failed-trigger test was established.

## 13 · On the Run

### ch13-01 — Voluntary Connor exit from squat

- **Existing evidence:** `AH-zJSO_DNo` 16:00–18:10, pass 1. Player waits for Hank's order; chart has locked nodes and no attempted voluntary exit.
- **Additional search:** `leave-search.txt` returned no branch-qualified new lead.
- **Frames saved this pass:** None.
- **Verdict:** **Not settled**. The additional searches did not locate a recording attempting the voluntary exit. An unused exit must not be treated as an impossible exit. No change implied.

### ch13-16 — Immediate SIT and WORRIED / EXPLAIN / AGREE

- **First candidate:** DanaDuchy `tSyMeat_n-M`, 02:00–08:30. It refuses twice, checks the gun and reaches WORRIED / EXPLAIN / AGREE. That refusal route cannot answer the immediate-SIT question.
- **Decisive video:** [AH-zJSO_DNo](https://youtu.be/AH-zJSO_DNo), MiKeYROG / Sag903, *100% Pursuit Branch Chapter 13 On the Run*, variant beginning 18:25 “Threaten with gun, Kara loses Connor”. The 18:05–20:40 locator covers morning preparations, not the meal; the targeted 22:30–25:10 segment reaches the meal.
- **Reading:** Ralph introduces the meal from about 22:47. The first SIT / REFUSE menu is offered around 23:11. SIT is visibly selected at about 23:11.9, with no prior refusal. Kara sits directly (23:14), and Ralph says “That's better” (23:16). There is no WORRIED / EXPLAIN / AGREE menu between that selection and sitting. Inspected every quarter second from 23:05–23:25. The later gun threat at the table is a separate decision and does not alter the already observed seating sequence.
- **Frames:** `../video-evidence/ch13/ch13-16-AH-zJSO_DNo-23-11-90.png` (SIT selected), `ch13-16-AH-zJSO_DNo-23-14.png` (sitting), `ch13-16-AH-zJSO_DNo-23-16.png` (“That's better”). Dense inspection frames remain in the helper directory.
- **Verdict:** **Settled: not shown.** Immediate agreement bypasses the threat-response prompt, matching the chart's direct AGREE TO SIT → SIT AT THE TABLE edge. Restrict `K09q5` to the refusal/threat route instead of always showing it.

### ch13-18 — BLUFF repeats menu or releases Kara

- **Video:** `tSyMeat_n-M`, DanaDuchy; downloaded 08:10–12:30. Inspected at 5-second intervals, then every second around BLUFF.
- **Reading:** BLUFF is visibly selected at 09:59 from the DRAW GUN / BLUFF prompt. Ralph remains at the table. At 10:16 a further THREATEN / FAMILY menu appears; FAMILY is selected at 10:18. Only after that follow-up does the peaceful release proceed. BLUFF therefore does not itself finish the conversation or release Kara. This is a continuation menu, not an unchanged repetition of every initial option. The compilation has no subtitles, so this finding rests on the visible selected labels and subsequent prompt, not a claimed transcription of spoken dialogue.
- **Frames:** `../video-evidence/ch13/ch13-18-tSyMeat_n-M-09-59.png`, `ch13-18-tSyMeat_n-M-10-16.png`, `ch13-18-tSyMeat_n-M-10-18.png`, `ch13-18-tSyMeat_n-M-10-42.png`.
- **Verdict:** **Settled: menu back** (with further options). The benchmark already continues after BLUFF and removes it. **Additional visible staging difference:** the first menu has a locked unidentified item, locked DRAW GUN and BLUFF; FAMILY is absent. FAMILY appears on the follow-up menu after BLUFF. `K09q7` currently offers FAMILY unconditionally, so its initial availability needs restricting at least on this observed route (gun forgotten, corpse option locked). This reading does not determine its availability on every other table route.

### ch13-29 — Motel TV without bath / haircut / LED removal

- **Video:** `tSyMeat_n-M`, Motel marker 22:11.
- **Additional search:** `tv-search.txt` returned haircut-focused recordings, not a confirmed skip route.
- **Download / reading:** 22:00–26:00 of `tSyMeat_n-M`, inspected every 5 seconds. Kara starts the bath at about 23:47, cuts her hair, removes the LED around 24:42, and watches the TV report around 25:22. This is the ordinary makeover-first route; no attempt to interact with the TV before the bath is shown.
- **Frames:** `../video-evidence/ch13/ch13-29-tSyMeat_n-M-23-47.png`, `ch13-29-tSyMeat_n-M-24-42.png`, `ch13-29-tSyMeat_n-M-25-22.png`.
- **Verdict:** **Not settled**. Following the makeover does not prove it is compulsory.

### ch13-36 — Prior-chapter-only gun threat and Ralph betrayal

- **Search:** `betray-search.txt` produced no branch-qualified lead.
- **Reading:** A table gun threat or first-meeting clip is insufficient. No same-save recording establishes prior-chapter threat, peaceful breakfast and subsequent Connor search together.
- **Frames saved:** None.
- **Verdict:** **Not settled**. No change implied.

## 14 · Jericho

### ch14-05 — Bench cover after idle-Connor VANISHED

- **Search:** `magazine-search.txt`; `_dIKvPxivqs`, *Jericho [100% Flowchart]*, and `Ijv7iPeovh8`, true-ending/all-magazines recording.
- **Reading:** Neither returned metadata establishes the prior idle-Connor VANISHED state on the same save. A Jericho-only chart showcase cannot distinguish this from a pursued escape.
- **Frames saved:** None.
- **Verdict:** **Not settled**. No change implied.

## 15 · The Nest

### ch15-10 — Amanda small down after Rupert escaped

- **Status on arrival:** `CONFLICTS.md` explicitly marks this as the duplicate of ch18-01, already frame-settled on 2026-11-08 and implemented in benchmark 1.9.10.
- **Verdict:** **Settled (inherited duplicate; not a new frame reading)**: Amanda small down. No additional change implied. The integrator should retain the other reader's evidence citation when merging the duplicate.

### ch15-12 — Ledge no-input ending

- **Video:** [yjqf4mP0tVA](https://youtu.be/yjqf4mP0tVA), MiKeYROG / Sag903, *100% Walkthrough Chapter 15 The Nest*, marker 17:00 “Didn't save Hank”.
- **Additional search:** `nest-search.txt` found Cheng Teoh `tams0EEqotU`; its description specifies investigation idleness and binary SAVE / CHASE variants, without claiming ledge idleness. `FnHXByGPJ-U` describes investigation inactivity only.
- **Download / reading:** 20:00–23:55 first located only lunch / apartment entry. The later targeted segment, 33:50–36:50, reaches SAVE HANK / CHASE DEVIANT at about 33:56–33:58, then Connor pursues Rupert, who jumps; the final chart at 36:07 reads RUPERT COMMITTED SUICIDE. Inspected the ledge at 4 fps, then the final 0.8 seconds of its menu at 0.025-second seek intervals. The recording does not unambiguously demonstrate that no control was pressed: the CHASE icon ring differs from SAVE, and no explicit timeout marker or input display establishes the no-input premise. A suicide after this menu is not sufficient to identify the timeout branch.
- **Frames:** `../video-evidence/ch15/ch15-12-yjqf4mP0tVA-33-58-25.png`, `ch15-12-yjqf4mP0tVA-33-59.png`, `ch15-12-yjqf4mP0tVA-35-37.png`, `ch15-12-yjqf4mP0tVA-36-07.png`.
- **Verdict:** **Not settled**. This is a located ending, with the required no-input condition unverified. Do not change the timeout ending on this evidence.

### ch15-14 — Cage-only reconstruction finds Rupert

- **Search:** `cage-search.txt` and MiKeYROG's chapter description (`nest-description.txt`). Returned recordings do not explicitly omit both stool reconstruction and sink LED.
- **Additional frame reading:** `yjqf4mP0tVA` 36:27, the in-game final chart for the inspected suicide route. INVESTIGATE STOOL, INVESTIGATE CAGE, FIND LED and FIND RUPERT are all blue on the current path. This confirms the candidate used the disputed steps rather than omitting them.
- **Frame:** `../video-evidence/ch15/ch15-14-yjqf4mP0tVA-36-27.png`.
- **Verdict:** **Not settled**. No change implied.

### ch15-18 — Rupert in Crossroads after NOT FOUND

- **Search:** `rupert-search.txt`: `S-Ca-Mbh7sc` is GOT AWAY; `s7w93GgsaH8` concerns evidence-room reactivation, not a Crossroads sighting.
- **Reading:** No same-save NOT FOUND → Crossroads lead established.
- **Frames saved:** None.
- **Verdict:** **Not settled**. No change implied.

## 16 · Time to Decide

### ch16-03 — North's level after YOU, before Simon

- **Video:** [3y5R9Td2TLg](https://youtu.be/3y5R9Td2TLg), DanaDuchy, *Jericho (choices) | Detroit Become Human*. Time to decide starts at 19:38; the relevant North conversation is 24:36–26:08, before the Simon proposal at about 29:05.
- **Downloads / inspection:** 19:18–24:30 located the chapter opening; 24:10–29:51 covers the exchange and later Simon scene. Inspected at 5-second intervals, then at 2 fps from 24:32–26:12, including a full-resolution crop of the HUD for each frame.
- **Reading:** Talking to North shows one small up chevron at about 24:37. After the WOUNDED topic, the player selects YOU at 25:18. A small down chevron appears around 25:24, followed by a clearly readable **RESENTFUL** badge at 25:25. This is well before Simon. The compilation also asks other non-arrow topics; the observed up and down are distinct, with the label printed after YOU.
- **Frames:** `../video-evidence/ch16/ch16-03-3y5R9Td2TLg-24-37.png` (small up), `ch16-03-3y5R9Td2TLg-25-18.png` (YOU selected), `ch16-03-3y5R9Td2TLg-25-24.png` (small down), `ch16-03-3y5R9Td2TLg-25-25.png` (RESENTFUL).
- **Verdict:** **Settled: below Neutral, specifically Resentful.** The benchmark's current Neutral result after talk +1 / YOU −1 does not reproduce this reading. Both visible arrows remain small. The frame does **not** uniquely determine numerical step sizes, band widths or the initial numeric offset; those alternative explanations must not be collapsed into an invented exact delta. The required observable result is Resentful before Simon.

## Benchmark changes implied by settled readings

| Conflict | Scene or rule | From | To |
|---|---|---|---|
| ch13-16 | `K09q5`, threat-response prompt | Always shown | Skip after immediate SIT; retain on the refusal/threat route |
| ch13-18 | `K09q7`–`K09q9`, BLUFF continuation | Continues; used BLUFF removed | Keep continuation; mark as observed |
| ch13-18 (menu staging, observed forgotten-gun / locked-corpse route) | Initial `K09q7` FAMILY availability | FAMILY offered unconditionally | Hide FAMILY initially on this route; it appears after BLUFF. Full alternate-route gating remains unverified |
| ch16-03 | North state after TALK TO NORTH then YOU, before Simon | Neutral under current +1 / −1 and initial value | Resentful. Recalibrate the starting offset / step mapping to reproduce the printed label; exact numeric repair is not identified by these frames |
| ch15-10 (duplicate ch18-01) | ch18 Amanda, `notCaughtPartnersFound` | Already changed to −1 in 1.9.10 per current conflict note | No further change; merge duplicate with existing evidence |
