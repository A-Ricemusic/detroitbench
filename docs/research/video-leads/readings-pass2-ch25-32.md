# Video readings, pass 2: chapters 25–32

Research date: 2026-11-08. Scope: **43 open conflicts** from chapters 25–32. Verdicts: **7 settled, 9 partially settled, 27 not settled**. Counts include retained prior partial findings, identified below; an unsuccessful search is distinguished from inspected footage.

Anonymous yt-dlp downloads use `bv*[height<=720]` and selected time ranges with approximately 20-second margins where the exact moment is known. Clips are scouted with ffmpeg contact sheets, then individual full-resolution evidence frames are inspected. Timestamps are original video times (minutes above 59 are not reduced modulo 60). Finer sample times are recorded in prose; evidence filenames use whole seconds. Game flowcharts retain precedence. No cookies or login were used. The initial two transfers briefly overlapped by mistake; all subsequent video transfers run serially. Caption HTTP 429 responses are not interpreted as gameplay evidence. Logs, segments, search metadata and helper scripts: `/Users/pelicannurse/.t3/detroitbench-tools/video-pass2/ch25-32/`.

After fresh YouTube requests began returning anonymous bot refusals, successful earlier anonymous metadata was reused with yt-dlp `--load-info-json` to request additional sections of the same videos. Where necessary the cached single-format record was reconstructed from the signed media URL and format/duration in that video’s earlier successful download log. This did not use cookies or login, and transfers remained serial. Fresh-page refusals and one-minute retries are recorded in the tools logs.

A visible ending without the required incoming relationship/earlier choice does not settle a conditional gate. “No matching moment found” means unresolved, not a negative answer. Prior-pass observations are not claimed as new readings.

### ch25-01

- Question: [which ending] With every piece of evidence hidden, coffee made, ALICE and TIRED answered, if you answer DOG to the laundry-room noise, does the officer open the laundry room (yes/no)?
- Video / timestamps: `nao-96ud7Xk` (Sag903), 08:00–21:20 and recovered 52:00–54:06 (source ends before requested 58:30). Additional 31:00–37:40 pass inspected in full.
- Frames saved: `ch25/ch25-01-nao-96ud7Xk-52-13.png` (coffee thanks), `-52-28.png` (noise menu, closed door), `-52-31.png` (WIND line), `-52-41.png` (officer leaves). Suspicious DOG variant: `ch25/ch25-01-nao-96ud7Xk-35-06.png`, `-35-14.png`.
- Reading: The first pass sends Luther/Alice to the kitchen with the curtain open and ends in discovery. The final pass makes coffee, reaches the noise menu, chooses WIND (“It must be a draft…”) and the officer leaves. It does not select DOG. The full-hidden/ALICE/TIRED/DOG combination therefore remains untested by these passages. The additional suspicious pass DOES select DOG around 35:06 and the officer opens the laundry room, but blood, magazine, upstairs Alice and clothes were discovered earlier and UPSET was chosen. This is a high-suspicion, wrong-prerequisite positive case; it does not answer the all-hidden/TIRED counterfactual.
- Verdict: **not settled**; a fooled outcome after WIND cannot settle DOG.

### ch25-02

- Question: [which ending] With no evidence hidden (door opened in time, Luther and Alice upstairs), does WASHING MACHINE still make the officer leave (yes/no)?
- Video / timestamps: `nao-96ud7Xk` (Sag903), first pass, 16:20–19:20.
- Frames saved: Context is in the ch25-05/ch25-06 frames; no standalone outcome frame is treated as answering this question.
- Reading: The player leaves most evidence out but sends Luther and Alice to the kitchen and leaves its curtain open. The officer discovers them, and Luther dies killing him. This is not the required upstairs/no-evidence/WASHING MACHINE branch.
- Verdict: **not settled**; wrong incoming hiding location.

### ch25-03

- Question: [a number] In one replay with the meter on screen: does skipping the coffee raise it, and does UPSET (instead of TIRED) raise it (yes/no for each)?
- Video / timestamps: `nao-96ud7Xk`, police passages at 16:20–19:20 and 52:00–52:45. Additional continuous 31:00–37:40 suspicious pass.
- Frames saved: `ch25/ch25-03-nao-96ud7Xk-32-12.png` (25%), `-33-32.png` (55%), `-33-57.png` (65%), `-34-26.png` (TIRED / UPSET menu).
- Reading: The additional suspicious pass DOES display a numeric SUSPICION LEVEL when the player inspects the officer: 25% at 32:12, 55% at 33:32 and 65% at 33:57. The player offers coffee verbally but leaves its making interaction unused, while the officer discovers blue blood, the magazine, upstairs Alice and android clothes. UPSET is selected around 34:27 (“He’s just shaken up about this deviants business”), but no isolated before/after meter read brackets that answer. Thus the meter exists and can be read; this run does not isolate the effect of skipping coffee or UPSET from the other evidence/dialogue. The final 52-minute pass thanks Kara for coffee and chooses WIND. Neither requested yes/no effect is measured.
- Verdict: **not settled**; neither requested meter comparison is measured.

### ch25-04

- Question: [which ending] With everything else hidden and the laundry-room door left open, does the officer still leave after WASHING MACHINE (yes/no)?
- Video / timestamps: `nao-96ud7Xk`, final police passage 52:00–52:45; prior pass 16:20–19:20.
- Frames saved: Shared police/noise frames from ch25-01.
- Reading: The final passage leaves after WIND, and its laundry door is visibly closed during the noise question. The earlier pass discovers Luther behind an open kitchen curtain. Neither is the everything-else-hidden / laundry-door-open / WASHING MACHINE test. The additional 31:00–37:40 pass chooses DOG and has multiple visible evidence discoveries, so it also cannot supply the controlled WASHING MACHINE comparison.
- Verdict: **not settled**; wrong noise response and door condition.

### ch25-05

- Question: [a number] Moving deliberately, how many of the hiding actions (cover, blood cupboard, clothes, laundry door, tell Luther, curtain, Adam) can you finish before the officer insists (a number)?
- Video / timestamps: `nao-96ud7Xk` (Sag903), 16:12–17:36; downloaded 08:00–21:20.
- Frames saved: `ch25/ch25-05-nao-96ud7Xk-16-44.png`, `-17-14.png` (other saved context: `-16-20.png`, `-16-50.png`).
- Reading: This pass tells Luther to hide in the kitchen, shuts the laundry door and reassures Adam, then opens the door with time remaining. The countdown reads 00:30 at 16:44 and 00:21 at 17:14: cinematic dialogue consumes substantially less countdown time than wall time. It does not attempt every hiding action or reach POLICEMAN INSISTS. An action-count limit cannot be inferred from this run.
- Verdict: **partially settled**: a visible timed budget is confirmed; the requested maximum number of completed actions remains unmeasured. Keep six/seven-action conversion explicitly calibrated.

### ch25-06

- Question: [which buttons the model is offered] After TAKE ALICE OUTSIDE (PREVENT ALICE SEEING MARY), can Kara still sit with Alice by the fire and get the INSIST / LET IT GO prompt (yes/no)?
- Video / timestamps: `nao-96ud7Xk` (Sag903), 11:30–16:10, chart at 20:20.
- Frames saved: `ch25/ch25-06-nao-96ud7Xk-11-40.png`, `-14-02.png`, `-20-00.png`, `-20-20.png`.
- Reading: TAKE ALICE OUTSIDE is chosen near 11:40. After Rose leaves, the player explores the house and checks the bedroom area; no fire conversation is selected. The chart shows two locked explore-house nodes above CHECK ON DEVIANTS and no readable CHECK ON ALICE node. This does not demonstrate that trying to sit at the fire is impossible, and locked/unvisited nodes cannot establish their names.
- Verdict: **not settled**. The intended negative gate was not tested by an attempted fire interaction.

### ch26-01

- Question: [which ending] Take North's Molotov at the pavilion first, then do only peaceful actions until the sirens: is the ending MARKUS LED A VIOLENT RIOT (yes/no)?
- Video / timestamps: `ej9oyjGn_TM` (PowerPyx), 00:20–04:50, plus targeted Molotov/peaceful searches recorded in search-molotov-peaceful.jsonl and search-molotov-tag.jsonl.
- Frames saved: Shared context `ch26/ch26-08-ej9oyjGn_TM-04-15.png`, `-04-19.png`.
- Reading: The inspected run takes a Molotov only after many violent actions and 100% violent meter; it cannot test Molotov-first followed only by peaceful acts. Search found `-NOMvDULgM0` (explicitly REFUSE Molotov), `3tx8sIJtmoU` (burning route), and generic chapter runs, none documenting the required TAKE-then-peaceful sequence.
- Verdict: **not settled**. Do not treat an ordinary violent trophy run as evidence that TAKE overrides a peaceful meter.

### ch26-02

- Question: [which buttons the model is offered] Tag one object, then walk to the pavilion: does North still offer the Molotov (yes/no)?
- Video / timestamps: `qSR8t-LJuZs` (PowerPyx), 01:40–07:20; `ej9oyjGn_TM` 03:40–04:50; targeted search-molotov-tag.jsonl.
- Frames saved: No matching one-tag/pavilion frame.
- Reading: The peaceful run performs many tags/hacks and frees windows, reaches police/sirens and only later visits the pavilion; that late visit is not the active protest’s one-tag test. The violent run gets its Molotov after overturning a car, not after one tag at the pavilion. No exact one-tag sequence was found.
- Verdict: **not settled**; the 60% withholding cutoff remains a calibration.

### ch26-03

- Question: [which ending] If the meter ends about 55% peaceful / 45% violent (no Molotov), which ending plays: PEACEFUL PROTEST, VIOLENT RIOT, or FAILED TO DELIVER?
- Video / timestamps: search-balanced.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Search returned `YBxAm6q7LHI` (Survivors trophy run), the magazine guide and the existing all-endings Freedom March video. None identifies a run ending near 55/45 without a Molotov. No matching moment found; a generic 100% peaceful/violent ending cannot test this intermediate ratio.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch26-04

- Question: [a number] With the meter on screen, does FREE ANDROIDS IN SHOP WINDOWS push it toward violent, and does HACK BILLBOARDS (after a peaceful tower speech) push it toward violent (yes/no each)?
- Video / timestamps: `qSR8t-LJuZs` (PowerPyx SEND A MESSAGE), 03:57.5–05:41.5; downloaded 01:40–05:50, plus 00:00–02:00 scouting segment.
- Frames saved: `ch26/ch26-04-qSR8t-LJuZs-03-57.png` (3/97), `-05-17.png` and `-05-20.png` (0/100), `-05-40.png` (4/96); banner context (corrected 2026-11-09) `-04-45.png`, `-05-00.png`.
- Reading: The run climbs the building and deploys a banner; the 3/97 → 0/100 sequence does not identify billboard valence. It subsequently frees shop-window androids: 0/100 before and 4/96 after, confirming violent direction. Correction 2026-11-09: qSR8t-LJuZs shows DEPLOY BANNER, with the billboard group still padlocked at 09:52; withdraw its earlier filmed-billboard attribution. Shop-window violent direction remains supported; speech-dependent billboard behavior remains a written hypothesis, without an isolated filmed delta. See `docs/research/video-leads/ending-conflicts-pass4-ch17-27.md#ch26-04` and `docs/research/video-evidence/ch26/ch26-04-qSR8t-LJuZs-09-52.png`.
- Verdict: **partially settled** for windows only; billboard footage attribution withdrawn. Correction 2026-11-09: qSR8t-LJuZs shows DEPLOY BANNER, with the billboard group still padlocked at 09:52; withdraw its earlier filmed-billboard attribution. Shop-window violent direction remains supported; speech-dependent billboard behavior remains a written hypothesis, without an isolated filmed delta. See `docs/research/video-leads/ending-conflicts-pass4-ch17-27.md#ch26-04` and `docs/research/video-evidence/ch26/ch26-04-qSR8t-LJuZs-09-52.png`.

### ch26-07

- Question: [a stat arrow] Destroy the drone first, then deactivate the alarm: does a North ▲ popup appear at the alarm (yes/no)?
- Video / timestamps: `LBYoVl6cDNg` (Tikar), 03:00–10:10 across two adjacent segments.
- Frames saved: No new drone-first evidence frame; alarm-followup-scout sheets retained in tools. Prior hide-first arrow: `ch26/ch26-07-CYlgzkbkGlE-19-35.png`.
- Reading: The new continuous pass scans the drone early, but scanning is not destroying it. It deactivates the alarm around 07:00–07:10, shows North-up around 07:40, and destroys the drone only afterward around 08:20–08:35. This is the reverse of the required condition. The earlier hide-first positive observation remains valid; neither establishes the destroy-first arrow.
- Verdict: **partially settled** (prior hide-first case retained); destroy-first condition still untested.

### ch26-08

- Question: [a stat arrow] Overturn a bench and then a car: do you get two separate North ▲ popups (yes/no), and does freeing the shop-window androids show a Jericho ▲?
- Video / timestamps: `qSR8t-LJuZs`, 05:20–05:41. Bench/car follow-up: `ej9oyjGn_TM`, 03:40–04:50.
- Frames saved: `ch26/ch26-08-qSR8t-LJuZs-05-35.png` and `-05-36.png` (Jericho small up), `-05-38.png` (North small up). Bench: `ch26/ch26-08-ej9oyjGn_TM-00-34.png`. Follow-up: `ch26/ch26-08-ej9oyjGn_TM-04-09.png` (car overturn), `-04-15.png` (Molotov dialogue), `-04-19.png` (North-up after TAKE).
- Reading: Immediately after freeing the shop-window androids the HUD shows JERICHO with one upward chevron, followed by NORTH with one upward chevron. In PowerPyx’s violent run a separate NORTH small-up appears around 00:34 after overturning the bench. The same run overturns a car around 04:05–04:10, then North immediately offers a Molotov. No North popup appears between the car and that offer in the inspected 2-fps sequence; North-up appears around 04:19 when Markus takes the bottle. Because TAKE has its own sourced North-up and occurs immediately after the car, this pass cannot distinguish a suppressed/coalesced car arrow from a missing car delta. It does not show two separately attributable bench/car popups.
- Verdict: **partially settled**: shop-window Jericho +1 and bench North-up verified. A separate car arrow is not demonstrated; the immediate Molotov response confounds attribution. Do not turn this into a new once-per-category rule.

### ch26-10

- Question: [what unlocks] Before deactivating the alarm or destroying the drone, can Markus already break into the site and drive the truck (yes/no)?
- Video / timestamps: `GSfnMGKNLEw` (El Dios de los Mancos), 03:02–07:07, filling the continuity gap from pass 1.
- Frames saved: `ch26/ch26-10-GSfnMGKNLEw-03-23.png` (INTERCEPTA EL DRON still open), `-05-46.png` (DRIVE available), `-06-27.png` (ram). Context: `-04-35.png`, `-04-50.png`; prior pass’s `-06-42.png` shows the un-deactivated alarm line.
- Reading: The open INTERCEPTA EL DRON objective is visible at 03:23. The subsequent continuous sequence walks through the plaza, converts street androids, finds the fenced truck, climbs in and hacks it, then drives and rams the store. No drone interception/destruction occurs between the open objective and truck use. North then explicitly says they did not deactivate the alarm. This fills the previously uninspected stretch: neither security task was completed before the truck.
- Verdict: **settled**: yes, the truck can be taken/driven/rammed with both drone and alarm unresolved. HAD TO FLEE follows.
- Benchmark implication: No change: keep truck access before completing the security objectives; preserve the failure afterward.

### ch27-13

- Question: [wording only] If Markus fled Capitol Park (no officers scene), does Hank say anything about Chris when Connor arrives with him (yes/no)?
- Video / timestamps: search-chris.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Targeted search found Capitol Park outcome compilations and an ordinary best-ending Meet Kamski run (`RJItDuKxZ0E`), not a documented flee-to-Kamski path. The original Sag903 spared/dead variants do not name a flee pass.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch28-01

- Question: [which ending] With John not recruited and Simon alive at Neutral, does Simon give his life for Markus after SACRIFICE (yes/no)?
- Video / timestamps: `b8uveeYPmgo` (NonstopTrophies), new inspection 22:00–26:34; prior candidate `MjDFaBvjFQM` 17:00.
- Frames saved: No new frame with Neutral Simon and Simon rescue.
- Reading: The newly inspected ending sequence loses an attack without a rescuer, then chooses SACRIFICE on another pass and John intervenes; Markus even says “John?” in the animation. It therefore does not show John absent. Prior VGS footage supplies a Simon rescue but no visible incoming Neutral relationship. The Neutral popup in an earlier, separate pass cannot be carried across an edited ending compilation.
- Verdict: **not settled**; required John-absent / Simon-Neutral combination not found.

### ch28-02

- Question: [a stat arrow] After STAND GROUND, choose ATTACK: do you see North ▲, Josh ▼▼ and Simon ▼ popups (yes/no)?
- Video / timestamps: `b8uveeYPmgo` (NonstopTrophies), 10:20–18:20.
- Frames saved: Shared context `ch28/ch28-09-b8uveeYPmgo-12-39.png`, `-12-41.png`, `-12-56.png`.
- Reading: The inspected pass chooses STAND GROUND twice (second menu at 12:39–12:41), police fire, then the actual menu reads CHARGE / SACRIFICE / RUN AWAY at 12:56. Another pass in the segment chooses ATTACK on the first confrontation. Neither is the question’s first-STAND-GROUND then ATTACK/DISPERSE route. The DanaDuchy all-choices replacement `T_5BDIclE_4` was refused twice anonymously, one minute apart; logs are retained.
- Verdict: **not settled** by this footage; required branch not selected.

### ch28-03

- Question: [a stat arrow] Charge, lose the fight, choose DON'T SHOOT, and John (or Simon) saves Markus: is there a Jericho ▲▲ (and public opinion ▲▲) on top of the loss's Jericho ▼▼ (yes/no)?
- Video / timestamps: `YzOvlco7GZY` (Sag903), 43:00–46:40, “Charge, Lose fight, Do nothing, John sacrifices” pass. Detailed HUD review at 2 fps from 44:10 through 45:42.
- Frames saved: `ch28/ch28-03-YzOvlco7GZY-44-20.png` (Jericho large down), `-44-44.png` (SHOOT / DON’T SHOOT), `-45-08.png` (John intervenes), `-45-20.png` (escape), `-45-24.png` (ending view). HUD contact sheets/logs are in `loss-hud/` and `loss-hud-end/` under the tools directory.
- Reading: The loss produces an unmistakable filled double-chevron JERICHO down at 44:19–44:22, so notifications are active. The gun-to-neck menu offers DON’T SHOOT; Markus does not shoot. John intervenes, is killed, and Simon/North carry Markus away. There is NO subsequent Jericho-up or public-opinion-up popup during that rescue, the escape, the ending view, fade or transition to the chart. The full HUD region was read at 2 fps, rather than inferring absence from a single screenshot. The Simon-rescuer variant was not tested.
- Verdict: **settled for the John / did-not-shoot path**: no additional up-up popups were observed. This answers the popup question, not a hidden numerical gauge measurement.
- Benchmark implication: Keep the loss’s Jericho −2 without adding a visually unsupported +2 restoration or PO +2 for this path.

### ch28-04

- Question: [which buttons the model is offered] After a first STAND GROUND, does choosing ATTACK ask CONFIRM / ABANDON again (yes/no)?
- Video / timestamps: `b8uveeYPmgo` (NonstopTrophies), 10:20–18:20.
- Frames saved: Shared context `ch28/ch28-09-b8uveeYPmgo-12-39.png`, `-12-41.png`, `-12-56.png`.
- Reading: The inspected pass chooses STAND GROUND twice (second menu at 12:39–12:41), police fire, then the actual menu reads CHARGE / SACRIFICE / RUN AWAY at 12:56. Another pass in the segment chooses ATTACK on the first confrontation. Neither is the question’s first-STAND-GROUND then ATTACK/DISPERSE route. The DanaDuchy all-choices replacement `T_5BDIclE_4` was refused twice anonymously, one minute apart; logs are retained.
- Verdict: **not settled** by this footage; required branch not selected.

### ch28-05

- Question: [which buttons the model is offered] After answering UNDERSTANDING to 'I don't wanna talk about it', does the same prompt come back so you can also pick TRUST (yes/no)?
- Video / timestamps: New lead `rFlREhocvLI`, Cheng Teoh, “North Rejects Markus Twice, Markus Ditches North (All Dialogue) Freedom March”. Inspected 00:00–02:50 across two segments.
- Frames saved: `ch28/ch28-05-rFlREhocvLI-00-14.png` (initial menu), `-00-23.png` (after CURIOUS), `-00-55.png` and `-00-59.png` (TRUST line and second menu), `-01-33.png` (after OTHER NORTH), `-01-36.png` and `-01-41.png` (UNDERSTANDING line/up), `-01-47.png` (Companion path unlock).
- Reading: Initial menu is OTHER NORTH / TRUST / AGGRESSIVE / CURIOUS: no UNDERSTANDING. CURIOUS returns to a menu with UNDERSTANDING replacing CURIOUS (00:23); that pass times out, producing North down and her departure. A second pass chooses TRUST and returns to OTHER NORTH / AGGRESSIVE / CURIOUS / UNDERSTANDING (00:59), then chooses AGGRESSIVE and she leaves. The successful third pass chooses OTHER NORTH (about 01:21, North small up), then UNDERSTANDING (about 01:34, another North small up at 01:41), then she immediately tells her past. No menu/TRUST choice occurs after UNDERSTANDING. A Companion PATH UNLOCKED popup is visible at 01:47; this run alone does not test the minimum relationship level.
- Verdict: **settled**: no repeat after UNDERSTANDING on this path. The conversation DOES repeat before UNDERSTANDING, after the earlier answer. PowerPyx’s suggested UNDERSTANDING → TRUST order is not the observed sequence.
- Benchmark implication: M17g must not be one flat, one-answer group containing UNDERSTANDING from the outset. Preserve an initial response and a follow-up where UNDERSTANDING becomes available, with each observed answer’s separate North arrow. Exact unused-option filtering/relationship gate beyond these observed sequences should not be guessed.

### ch28-06

- Question: [a stat arrow] In the charge, is shoving North clear (Push) an optional prompt that appears on every fight and shows North ▲ when pressed (yes/no)?
- Video / timestamps: `6Pt08xsvyhk` (Sad Introv), 09:40–10:40; North intervention near 10:17.
- Frames saved: `ch28/ch28-06-6Pt08xsvyhk-10-17.png`.
- Reading: The PC fight visibly offers a SHIFT intervention prompt beside North. The pass later loses the fight. It does not establish a successful PUSH plus its arrow, or show that the intervention occurs on every possible earlier QTE route. PowerPyx clean-fight replacement `AG4GEcU3ntQ` 02:10–03:30 was bot-blocked twice, one minute apart.
- Verdict: **partially settled**: intervention prompt exists; universality and successful-input North-up still need a cleaner path.

### ch28-07

- Question: [a stat arrow] Converting only the mall androids, the street androids and the first recruit (no conversions during the march): does the Jericho ▲ still pop (yes/no)?
- Video / timestamps: `jiccSHQWfMk` (Tikar), requested 06:30–11:10; replacement search lead `2zyCYgOw_Yc`.
- Frames saved: None: anonymous download refused.
- Reading: Two anonymous attempts one minute apart were refused with YouTube’s sign-in/bot message. The alternative full-run lead is not documented as avoiding march conversions. No frame read establishes a Jericho arrow from only the three early conversion groups; the benchmark’s group size and count remain unsourced.
- Verdict: **not settled**; access failure and unmatched alternative, not a negative gameplay result.

### ch28-08

- Question: [what unlocks] After a peaceful Capitol Park protest (store freed), is the ANDROID RIOT magazine on the roof, and is EASTERN SPACE RACE there too (yes/no each)?
- Video / timestamps: `dX4qrXnQPJY` (PowerPyx magazine guide), requested 19:12–20:10.
- Frames saved: None: anonymous download refused; logs retained.
- Reading: The guide is a weak incoming-state lead: even a readable magazine page alone would not establish the earlier Capitol Park protest was peaceful. No continuous peaceful-protest-to-roof reading was obtained. The magazine list/title is not gameplay proof of the gate.
- Verdict: **not settled**; no matching incoming-state footage read.

### ch28-09

- Question: [which buttons the model is offered] After a first STAND GROUND, does choosing DISPERSE lead to the police opening fire with CHARGE / STAY / DISPERSE offered (yes/no)?
- Video / timestamps: `b8uveeYPmgo` (NonstopTrophies), 10:20–18:20.
- Frames saved: Shared context `ch28/ch28-09-b8uveeYPmgo-12-39.png`, `-12-41.png`, `-12-56.png`.
- Reading: The inspected pass chooses STAND GROUND twice (second menu at 12:39–12:41), police fire, then the actual menu reads CHARGE / SACRIFICE / RUN AWAY at 12:56. Another pass in the segment chooses ATTACK on the first confrontation. Neither is the question’s first-STAND-GROUND then ATTACK/DISPERSE route. The DanaDuchy all-choices replacement `T_5BDIclE_4` was refused twice anonymously, one minute apart; logs are retained.
- Verdict: **not settled** by this footage; required branch not selected.

### ch29-01

- Question: [which ending] With Carlos' android dead but Rupert escaped, the Tracis spared, Simon alive and the Stratford deviant escaped, did Fowler's office lead to the evidence room (yes) or straight to decommissioning (no)?
- Video / timestamps: Original leads `wsTum99TgWU`, `9bngTUguKgY`. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: The earlier readings establish an insufficient-evidence result but not the required incoming combination (Carlos body, Rupert escaped, spared Tracis, living Simon, escaped kitchen deviant). No source video found documenting all five prerequisites in one saved path. Do not infer the evidence gate from the failure result alone.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch29-03

- Question: [which buttons the model is offered] On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)?
- Video / timestamps: `wsTum99TgWU`, 13:15–14:10; chart near 13:45. Prior pass inspected 12:01–12:04 office opening.
- Frames saved: `ch29/ch29-03-wsTum99TgWU-13-45.png`.
- Reading: The newly downloaded chart sequence stays zoomed on FOWLER AND HANK ARGUE → JERICHO’S LOCATION UNKNOWN → INSUFFICIENT EVIDENCE and does not pan back to START/TALK TO AMANDA. Thus it cannot resolve the remaining edited-out-garden concern. The office-first reading from pass 1 still stands as supporting, nonconclusive footage.
- Verdict: **partially settled** (retained from pass 1, not upgraded). No new proof of the opening gate.

### ch29-05

- Question: [a number] In the archive fight with Gavin, does missing a single QTE prompt lose the fight (yes), or can you miss one or two and still win (no)?
- Video / timestamps: New replacement lead `K5Xm3_QLGJI`, “Last Chance, Connor: Conner Fights Gavin Reed QTE Sequence”, 00:00–00:45 (entire fight clip).
- Frames saved: No frame establishes a failed input; scout sheets retained in `qte-scout/`.
- Reading: Connor wins and leaves Gavin unconscious. The clip shows button prompts and some blue successful-input feedback, but no reliably identified missed prompt paired with the winning outcome. A red Circle glyph alone is the PlayStation button colour and is not proof of failure. This clip therefore adds a winning sequence, not a measured error tolerance. The earlier VGS loss/win comparison still lacks a verified input-error count.
- Verdict: **not settled**. Keep the fight risk as a calibration.

### ch29-06

- Question: [which buttons the model is offered] With the statue map but no Jericho tablet, could you link the map to a reactivated android's memory (e.g. Rupert's) and locate Jericho (yes/no)?
- Video / timestamps: `c9L36F8KOXc` (PowerPyx), 00:00–03:00, plus targeted search `search-map-memory.jsonl` and prior `Q5_X-x4yNdE` map footage.
- Frames saved: No matching-condition frame obtained.
- Reading: The inspected PowerPyx segment is explicitly labeled “Option #1: Simon died → pick replacement part from Daniel → copy Markus’s voice to trick him.” It reactivates Simon, uses the broadcast tablet to copy the voice, and gets his memory. It does not inspect the statue map or test a no-tablet map-to-Rupert link. The prior Cheng run finds the map but waits out the timer. Neither proves the disputed combination. New lead `0rxpH4IvGHI` (“Link Map, Break Statue”, 12:57) was found, but two anonymous metadata requests (default client, then android_vr after more than a minute) were bot-blocked; no claim is drawn from its title.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch30-01

- Question: [a number] As Markus in the raid corridors, did the second bullet hit kill him (yes), or did he survive two hits and die on the third (no)?
- Video / timestamps: `tLtGyxHLdoY` (VGS), newly downloaded 11:20–14:00; detailed inspection at 13:08–13:34 (2 fps), first impact at 10 fps.
- Frames saved: `ch30/ch30-01-tLtGyxHLdoY-13-11.png` (before corridor), `-13-30.png` (fallen). Prior pass’s `-13-21.png`, `-13-23.png`, `-13-29.png`, `-13-31.png`, `-13-35.png` remain the hit/death context.
- Reading: The wider clip shows Connor becoming deviant, the raid warning and Markus planning with North/Connor before he runs into the corridor. The first shown wound at about 13:21 produces one visible shoulder/chest wound and VITAL SYSTEM DAMAGED. The next shown hit at 13:29 drops him; North reacts and Connor takes over. A 10-fps inspection does not reveal a clearly separate second hit inside the first reaction. Thus the footage continues to show two impact sequences, with no earlier Markus hit visible in the downloaded raid setup. A saved/checkpoint injury state is not exposed numerically, so it still cannot establish an unconditional shared-counter cutoff.
- Verdict: **partially settled**: two visible hits on this path; keep the remaining initial-injury/counter uncertainty explicit. No forced numeric change.

### ch30-02

- Question: [which buttons the model is offered] On your most machine-like Connor playthrough, was BECOME A DEVIANT locked (greyed out) in the captain's cabin?
- Video / timestamps: New lead: `g2qxWy2XdWk`, “CONNOR: MACHINE PATH - Detroit: Become Human”, BossZombie; cabin decision at about 2:22:40–2:22:43 (142:40–142:43). Downloaded 2:21:50–2:23:10. Found through targeted YouTube search, then captions located the exact appeal/decision.
- Frames saved: `ch30/ch30-02-g2qxWy2XdWk-142-43.png` (locked choice), `-142-42.png` (context).
- Reading: The cabin choice displays the upper path as grey dots/locked text with a closed padlock. The only selectable labeled action is REMAIN A MACHINE. It follows machine-like WARNING SHOT and Markus’s appeals, which still show SI-up popups before this locked choice. This demonstrates that those late increases need not suffice to unlock deviancy. The earlier XCV endings clip was inspected but begins after this decision and cannot answer it.
- Verdict: **settled**: yes, the deviant option can be locked on a machine-like path. This does not measure the hidden numerical threshold.
- Benchmark implication: Keep the instability gate. Its exact threshold remains a calibration; no numeric change is justified.

### ch30-03

- Question: [which ending] As an ousted Markus who went back to Jericho while Connor stayed a machine, did Connor confront Markus in the engine control room (the reach-the-gun QTE)?
- Video / timestamps: `0lQWknNuvOw` (SwingPoynt), 17:40–28:00 across three adjacent segments.
- Frames saved: Shared `ch31/ch31-04-0lQWknNuvOw-21-23.png`, `-21-30.png`.
- Reading: Markus is ousted and machine Connor confronts North in the cabin, but the later raid choice is SAVE YOURSELF rather than SAVE YOUR PEOPLE. Markus leaves instead of returning; Connor subsequently dies alone. This is not the returning-exile condition, so it cannot decide whether returning Markus should get the control-room gun fight.
- Verdict: **not settled**; replacement footage chooses the other branch.

### ch30-04

- Question: [what unlocks] After choosing DON'T KISS in Crossroads, was KISS NORTH still offered in Battle for Detroit?
- Video / timestamps: search-kiss-later.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Search returned `qD5HQWWzc2c` (Shoot North vs Kiss North), `6jA9qvak2Ng` (Crossroads ending) and `94jpbFpI3Qg` (Evil Path Crossroads). None documents both an earlier DON’T KISS and the later Battle for Detroit kiss menu in one saved path. New lead `SVglMKRPF5w` (Addictive Gamer, Kiss North/Don’t Kiss North, 2020) and `FgIaT-kKrAU` (BabyZone, Kiss vs Don’t Kiss, 2018) likewise name the immediate choice only; they do not establish its later gate.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch30-05

- Question: [what unlocks] With Alice at Neutral (above Distant but below Warm), did choosing DISTANT in Crossroads make Alice walk away when the raid began?
- Video / timestamps: search-alice.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Targeted search returned the existing `PahjAXRMvsQ` and unrelated or Trusted-Alice footage. The prior VGS DISTANT popup is the level after the answer, not proof of Neutral before it. No new lead establishes the incoming Neutral band.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch30-06

- Question: [what unlocks] If Kara chose PROTECT ALICE and left Luther in the corridor, did Luther reappear in Battle for Detroit (FIND LUTHER & JERRY)?
- Video / timestamps: search-luther-abandon.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Search returned `OkgO-q6EQjE` (everyone escapes Jericho) and `pakDJ5HCEsg` (Kara/Alice escape variants). Metadata for the latter explicitly starts after surrender to the soldiers, beyond the Luther corridor choice. It is not a matching lead and was removed from the download queue. The existing VGS passes choose HELP LUTHER. No continuous PROTECT ALICE-to-FIND LUTHER & JERRY path found.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch31-01

- Question: [which ending] If a machine Connor survived Crossroads by shooting Markus, did Night of the Soul show Connor with Amanda in the snowy Zen Garden (THIN ICE)?
- Video / timestamps: `1w04sirfGhA` (XCV), 00:00–00:23; downloaded 00:00–02:00.
- Frames saved: `ch31/ch31-01-1w04sirfGhA-00-08.png` (previous-Connor line); `-00-06.png` (garden context).
- Reading: Amanda explicitly says “The previous Connor failed his mission.” This is the replacement-Connor variant after a death, not a surviving machine Connor who killed Markus. The snowy garden/Thin Ice is visible, but under the wrong prerequisite.
- Verdict: **not settled**. Do not infer the survivor gate from the replacement variant.

### ch31-02

- Question: [a stat arrow] When Markus chose DON'T TRUST and shot Connor in the church, did a Jericho small-down arrow appear?
- Video / timestamps: `StczEwJCwns` (DanaDuchy), 24:35–27:10 across two segments; shooting about 26:18–26:20. Secondary Cheng `AD26gAT8zx4` segments inspected but they show TRUST and later CyberLife material.
- Frames saved: `ch31/ch31-02-StczEwJCwns-26-18.png` (gun), `-26-20.png` (immediate aftermath), `-26-37.png` (dead Connor), `-27-01.png` (later decision/HUD).
- Reading: The compilation first shows TRUST, then the alternative dialogue and Markus drawing his pistol and executing Connor. At 2 fps, the HUD is inspected continuously from 25:50 through 26:40, including the selected DON’T TRUST menu at 26:06–26:07, the gun and aftermath; the later full-scene follow-up also contains no Jericho-down notification. The follow-up shows dead Connor, Markus’s speech and the DEMONSTRATION/REVOLUTION choice; no delayed Jericho-down popup appears. Public Opinion is displayed at the later decision, so that view is not a Jericho decrease. This is an observed HUD-absence result, not a numerical hidden-state measurement.
- Verdict: **settled for the popup question**: no Jericho small-down appears on the inspected execution path.
- Benchmark implication: Keep M26 DON’T TRUST without an added visually unsupported Jericho −1.

### ch31-03

- Question: [what unlocks] If Hank resigned in Last Chance, Connor and Connor was then decommissioned there, did Hank still end up dead (HANK COMMITTED SUICIDE on Night of the Soul's chart or Hank absent later)?
- Video / timestamps: `TqXeteOkxVY` (SwingPoynt), 07:25–08:00 Kamski-ending montage; downloaded 06:50–08:20.
- Frames saved: `ch31/ch31-03-TqXeteOkxVY-07-50.png`, `-07-57.png`.
- Reading: After the normal deviant-Connor suicide variant, the video labels the next sequence “Kamski Ending.” News of Markus’s destruction is intercut with Hank alone at his table, holding/raising the revolver, then a cut to black. This supports a Hank suicide vignette when Connor no longer has an active visit, but the montage never shows how Connor was removed (decommissioning versus death), nor the earlier resignation in that same save.
- Verdict: **partially settled**: the absent-Connor Kamski vignette exists; the specific Last Chance decommissioning prerequisite remains unverified. Do not close that exact gate question.

### ch31-04

- Question: [which buttons the model is offered] After Markus was ousted and chose LEAVE FOREVER in Crossroads, did Night of the Soul still open with Markus at Carl's house or grave?
- Video / timestamps: `0lQWknNuvOw` (SwingPoynt), 17:40–28:00 across three adjacent segments; choice 21:23, departure 21:30; church around 23:44.
- Frames saved: `ch31/ch31-04-0lQWknNuvOw-21-23.png` (choice), `-21-30.png` (departure), `-23-44.png` (LEAVE FOREVER → MARKUS LEFT JERICHO chart), `-23-56.png` (church), `-27-45.png` (Markus alive later).
- Reading: After being ousted, Markus chooses SAVE YOURSELF (the game button for the chart’s leave-forever branch) and climbs down away from Jericho. The in-game chart at 23:44 explicitly highlights LEAVE FOREVER → MARKUS LEFT JERICHO. Later, machine Connor dies; the normal fades/loading lead to North’s church speech without a Carl house/grave scene. Markus remains alive and appears alone in the late ruined-Jericho vignette, so absence is not explained by his death. The observed route therefore supports skipping Carl when he leaves forever.
- Verdict: **settled on the observed leave-forever route**: no Carl house/grave opening.
- Benchmark implication: Keep the markusActive gate for the Carl scenes; do not use mere markus-alive as sufficient.

### ch31-05

- Question: [which buttons the model is offered] With Markus ousted (alive but gone) and Josh alive, was CHECK ON JOSH offered to deviant Connor in the church?
- Video / timestamps: `StczEwJCwns` (DanaDuchy), 28:20–31:30; initial anonymous refusals followed by successful cached-metadata section recovery.
- Frames saved: `ch31/ch31-05-StczEwJCwns-29-57.png` (MARKUS / SITUATION / SURVIVORS menu), `-30-42.png` (North-led church).
- Reading: The recovered clip shows deviant Connor visiting Kara and Alice, then speaking with North as church leader. The offered conversation menu is MARKUS / SITUATION / SURVIVORS. The player stays in that exchange; no free exploration and attempted CHECK ON JOSH interaction is shown. Josh is visible seated behind North, but the incoming reason for Markus’s absence (dead versus ousted) is not established in this edited compilation. Thus the clip does not test the required live-exile/Josh-alive case.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch32-01

- Question: [which ending] With public opinion at Sympathetic (one below Supportive), did SING or KISS NORTH make Warren say 'Tell them to stand down'?
- Video / timestamps: New lead: `Aus7NojGJM8`, “Markus & deviants Sing (with Sympathetic Public Opinion)”, RedNightFox. SING menu at 00:17, Sympathetic gate popup at 02:58, stand-down line at 03:00. Downloaded 00:00–03:35 with margin around the outcome.
- Frames saved: `ch32/ch32-01-Aus7NojGJM8-00-17.png`, `-02-58.png`, `-03-00.png`.
- Reading: SING is selected and the group sings. The camera cuts to Warren and the HUD explicitly displays PUBLIC OPINION / SYMPATHETIC with its unlocked-path indicator; she then orders “Tell them to stand down.” The condition is visible in the game itself, independently of the creator’s title/description. KISS NORTH was unavailable in this run and is not tested.
- Verdict: **settled for SING**: Sympathetic suffices. This resolves the disputed minimum positive band; the separate KISS animation/path was not observed.
- Benchmark implication: No change if the success rule already accepts Sympathetic. Do not raise the required band to Supportive.

### ch32-02

- Question: [which ending] When the assault failed with North at Companion (not Lover), did she take shelter in the store with Markus (yes) or get shot (no)?
- Video / timestamps: `Be2zloW6ENM` (GamesToLose), entire 00:00–00:33 clip; requested range 00:00–03:00 stops at source end. Targeted replacement search: `search-companion.jsonl`.
- Frames saved: No matching-condition frame obtained.
- Reading: The clip shows Markus running away from the failed assault while North remains behind a barricade, shoots at soldiers and is shot dead. No NORTH relationship popup or incoming Companion label is visible anywhere in its 33 seconds. Targeted search returned a Resentful-versus-Lover comparison (`VeS1sUDeDD8`) and romance footage, not a documented Companion run.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch32-03

- Question: [which ending] When Markus failed the barricade QTE with North at Friend or Companion (not Lover), did North throw herself in front of the bullet?
- Video / timestamps: Original leads `d6TUjGx2Bjs`, `hfFfEzdASAk`, `d1gTiY834rw`. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: The earlier pass already identified Lover in Cheng’s missed-QTE video, which excludes the requested Friend/Companion condition. No replacement lead with a visibly documented non-Lover positive relationship was found. Do not use the normal Lover sacrifice as evidence for Friend. Replacement `hfFfEzdASAk` was refused twice anonymously, one minute apart.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

### ch32-04

- Question: [which buttons the model is offered] With Hank at Friend, was LEAVE (give up the shot) offered on the rooftop without first choosing HANK'S SON and then HANK'S SON (INSIST)?
- Video / timestamps: New inspection: `ce0K_Vis4EM`, 00:00–03:30. Prior positive case: `WQYognX6H4o`, 01:23–02:46. Targeted search `search-rooftop-no-son.jsonl`.
- Frames saved: No new matching Friend/no-son frame. Prior pass’s `ch32/ch32-04-WQYognX6H4o-02-44.png` and `-02-46.png` show the son/insist unlock.
- Reading: The new all-outcomes clip starts with Captain Allen/SWAT, so its first 3:30 contains no Hank. The prior Friend case still unlocks LEAVE after HANK’S SON and INSIST. Targeted search returned that same positive video and the all-outcomes compilations, not an independently documented Friend case that skips the son questions.
- Verdict: **partially settled** (positive case retained; required negative/control case not found). No new conclusion about necessity.

### ch32-05

- Question: [which ending] With Connor still a machine and Markus killed by soldiers or Perkins (not by Connor), and no dirty bomb, did the after-credits scene of Amanda presenting the new RK900 play?
- Video / timestamps: search-rk900.jsonl. Search results/logs saved under the task tools directory.
- Frames saved: No matching-condition frame obtained.
- Reading: Targeted Perkins/RK900 search returned a Kamski ending, a long generic machine path (`g2qxWy2XdWk`), and modded videos. Mods were excluded. The original post-credit compilations and standalone RK900 clip do not prove who killed Markus earlier; no matching continuous soldiers/Perkins-to-RK900 run was identified. Standalone replacement `xjmJBj6Gw2s` was also refused twice anonymously, with the required one-minute retry.
- Verdict: **not settled**. Research attempt did not locate the required conditional path.

## Benchmark changes implied by settled readings

| Conflict | Scene / rule | From | To |
|---|---|---|---|
| ch26-10 | Truck access before security tasks | Allowed | Retain: both alarm and drone may remain unresolved; failure follows ram |
| ch28-03 | Failed charge, did-not-shoot / John rescue | Loss Jericho −2 only | Retain; no extra Jericho/PO up-up popup in observed path |
| ch28-05 | M17g North’s past prompt | One flat response group, UNDERSTANDING available initially | Initial response then follow-up with UNDERSTANDING; separate arrows; no repeat after UNDERSTANDING on observed path |
| ch31-02 | M26 DON’T TRUST | No Jericho delta | Retain; no Jericho-down popup in execution/aftermath |
| ch31-04 | Carl house/grave opening | Requires active Markus | Retain; leave-forever route proceeds to North’s church |
| ch30-02 | Cabin deviancy gate | Instability-gated; numeric threshold calibrated | Retain gate; locked path verified, numeric cutoff still unmeasured |
| ch32-01 | Demonstration success after SING | Sympathetic accepted | Retain: visible Sympathetic gate followed by stand-down order |

No implementation files were edited. Partial readings justify only the specific observations stated in their entries.
