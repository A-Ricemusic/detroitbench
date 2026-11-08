# Video readings, chapters 17 to 32

Pass of 2026-11-08 over `docs/research/video-leads/ch17-32.md`. Every segment was downloaded with yt-dlp (720p or lower), turned into 1 fps frames (2 to 15 fps around popups) and read frame by frame. Times are video times (mm:ss, or hh:mm:ss for long videos). Evidence frames are in `docs/research/video-evidence/chNN/`, named `<conflictId>-<videoId>-<mm-ss>.png` (for videos over an hour, minutes run past 60, so `72-32` means 1:12:32). Each is under 300 KB.

**Summary.** 61 conflicts have leads. Results: **11 settled, 8 partially settled, 42 not settled**. Of the 42, 7 were attempted without a result. 35 were not attempted. About 45 segments downloaded normally. Then YouTube started returning "Sign in to confirm you're not a bot" for every new download (seen on 0LjHSb_5bLY, YzOvlco7GZY, 0lQWknNuvOw, AD26gAT8zx4 and w8Y7-ZmTVZ0, still failing at the end of the pass). Strong leads that were never downloaded are marked "blocked". A later pass can pick them up once downloads work again. The only way around the block is browser cookies, and I did not use the operator's browser cookies.

Nothing below contradicts a stored chapter flowchart. Where a run's earlier choices matter, the path is noted.

## Settled

### ch17-08: Alice when Zlatko shoots Kara (bathroom or storage room)
- Question: when Zlatko shot Kara in the bathroom or the storage room, was Alice shown being taken or killed, or left unseen?
- Leads: `_jI0YfvvTMY` (El Dios de los Mancos, bathroom death), `TbqIcpEqH-U` (VGS, 27:43 to 28:00), `9-WwhtWnSVs` (Sag903, storage-room death at 1:12:14 to 1:12:37).
- Reading: bathroom (`_jI0YfvvTMY`). Kara is shot at 1:44. Alice stands in the doorway from 1:46 to 1:51, and a close-up shows her terrified at 1:55. Zlatko's shotgun point of view comes at 1:57. The scene then cuts to the house exterior and the chart ("ZLATKO HA MATADO A KARA EN EL BAÑO"). The VGS run is the same. Storage room (Sag903): the same pattern. Kara is down, Alice watches (close-up at 1:12:33), the shotgun comes at 1:12:34, then the exterior and the chart at 1:12:35. In neither death is Alice taken or killed on screen. She is last seen alive, watching, and her fate is not shown.
- Verdict: **settled**. Alice is seen alive and then left unresolved: not taken and not killed.
- Frames: `ch17/ch17-08-_jI0YfvvTMY-01-46.png`, `-01-49.png`, `-01-55.png`; `ch17/ch17-08-9-WwhtWnSVs-72-32.png`, `-72-33.png`, `-72-34.png`.
- Benchmark change: wording only. The death text should say that Alice is left watching, with no fate shown, rather than imply she was taken. `alice=false` in `spotted()` can stay, because Kara's storyline ends.

### ch18-01: Amanda's arrow at the garden walk after Rupert got away
- Question: on a run where Rupert got away and Connor survived, which Amanda arrow showed at the start of the garden walk (none, small down or large down), and had Ortiz's android been found in Partners?
- Lead: `8IQ_ODu3IeE` (Cheng Teoh; tags: Rupert got away, Connor saved Hank).
- Reading: at 0:47 Connor greets Amanda. Her name popup appears with the level bar (TRUSTED) and no arrow. This is the meeting popup. At 1:06 to 1:09 Amanda says "That deviant seemed to be an intriguing case. A pity you didn't manage to capture it…". At 1:10 an **AMANDA small down** (single chevron) appears. The next popup is AMANDA small up at 1:21, after PRAGMATIC ("I agree. I may not be suited for this investigation. Maybe you should consider replacing me."), which matches the benchmark's +1 for PRAGMATIC. Partners: the reaction line is the "not caught" line, not the template's "Two investigations, two failures…" line. On the template's own split, that means the Partners deviant had been found on this run.
- Verdict: **settled** for this branch (Rupert escaped, Partners android found): one small down. The double-failure branch (both missed) was not observed. Per the conflict's log, the template's no-arrow reading is wrong here a third time.
- Frames: `ch18/ch18-01-8IQ_ODu3IeE-00-47.png` (meeting popup, no arrow), `-01-06.png` (reaction line), `-01-10.png` (small down), `-01-21.png` (PRAGMATIC up).
- Benchmark change: `benchmark/chapters/ch18.mjs` `rules.amanda.notCaughtPartnersFound`, from 0 to −1 (C11z). The double-failure value (−2) is untouched by this reading.

### ch19-01: Jericho arrow on FREE THEM
- Question: when Markus freed the three androids in the crate, did a Jericho arrow appear along with the North, Simon and Josh arrows?
- Leads: `F0Gyu2X-loM` (PowerPyx, Jericho's Hero), `s2CesiZnx0k` (PS5Trophies).
- Reading: PowerPyx, FREE THEM at about 3:50. NORTH small up at 3:54, then **JERICHO small up** (level bar RESPECTED) at 3:57, then JOSH up and SIMON up by 4:01. PS5Trophies, ACCEPT John at 1:05: NORTH small down at 1:08, **JERICHO small up** at 1:09 to 1:10, then JOSH up at 1:11. (Its FREE THEM at 0:56 is edited with no popups visible.) At 1:13 to 1:16 there are JOSH down and SIMON up popups that fit GET THE KEY, but the prompt itself is cut. The Simon down that the template gives ACCEPT was not seen in that run.
- Verdict: **settled**. Yes, Jericho small up on FREE THEM, and also on ACCEPT. The drone moment was not checked.
- Frames: `ch19/ch19-01-F0Gyu2X-loM-03-54.png`, `-03-57.png`; `ch19/ch19-01-s2CesiZnx0k-01-08.png`.
- Benchmark change: M05h FREE THEM effect, add `jerichoTrust: +1`. M05i ACCEPT, add `jerichoTrust: +1`. Recheck ACCEPT's `simonTrust: −1`, which was not seen on screen.

### ch22-01: Software Instability when Hank shoots Connor
- Question: when Hank shot Connor on the bridge, did a Software Instability down popup appear?
- Leads: `cfWIQsrWBCg` (VGS, 7:30), `yFJ45Ip6pBc` (PS5Trophies).
- Reading: VGS. Connor answers NOTHING, the HANK label reads HOSTILE (8:22 to 8:23), then HANK down at 8:24. The shot comes at about 8:29, Connor lies dead until 8:59, and the chart follows at 9:00. There is no SI popup between the shot and the chart. (An SI down at 7:52 belongs to an earlier answer.) PS5Trophies: HANK down at 4:45, the shot at about 4:50, the body until 5:22, the chart at 5:24. There is no SI popup at 2 fps.
- Verdict: **settled**. No (two runs).
- Frames: `ch22/ch22-01-cfWIQsrWBCg-08-24.png`, `-08-32.png`; `ch22/ch22-01-yFJ45Ip6pBc-04-45.png`, `-04-56.png`.
- Benchmark change: none (C13o `deathEffect {hankTrust:-1}` stays without SI).

### ch23-09: North arrow when Markus knocks the employee out himself
- Question: with the server door unlocked, DRAW GUN, and Markus knocks the employee out: did a North down popup appear?
- Lead: `C385ESPT9mI` (Cheng Teoh, "you forget to lock the door"). The video plays all three options.
- Reading: ALIBI, then North stuns the employee, then NORTH small down at about 1:03. GAIN TIME, then North stuns him, then NORTH small down at 1:44. DRAW GUN at 1:52, Markus knocks the employee out at 1:59, "Alright, we gotta move fast" at 2:03, and no North popup through 2:07, when the video cuts away.
- Verdict: **settled**. No North arrow on DRAW GUN. North down only when she stuns him (ALIBI, GAIN TIME), as the wiki note says.
- Frames: `ch23/ch23-09-C385ESPT9mI-01-44.png` (GAIN TIME arrow), `-01-52.png`, `-01-59.png`, `-02-04.png` (DRAW GUN, no arrow).
- Benchmark change: `ch23.mjs` case `M10e`: apply `h.north(-1)` only when `v!==2` (ALIBI and GAIN TIME), not on DRAW GUN.

### ch24-01: Amanda arrows on DETERMINED, COLD and TOO FAR
- Question: in the opening Zen Garden talk, did DETERMINED or COLD show an Amanda up, and did TOO FAR show an Amanda down?
- Lead: `-xIyydd0Yrc` (Cheng Teoh, all dialogue; the creator plays each option and rewinds).
- Reading: SINCERE gives AMANDA small down at 4:19 (matches the benchmark's −1). DETERMINED ("I'm just frustrated with my lack of progress…") gives **AMANDA small up** at 4:27. COLD's line plays from 4:32 to 4:39. An SI down is starting to appear at 4:40 when the creator rewinds. TROUBLED gives SI up at 4:43 and AMANDA down at 4:46 (matches). The main path then resumes at 4:52 with **SI down** followed by **AMANDA up** at 4:53, before Amanda asks "You had your gun trained…". SI down together with Amanda up can only be COLD: no other option gives SI down. TOO FAR ("They were out of range… why wouldn't I?" / "You tell me.") gives **AMANDA small down** at 5:19.
- Verdict: **settled**. DETERMINED Amanda up (yes), COLD Amanda up as well as SI down (yes), TOO FAR Amanda down (yes). This matches PowerPyx and the wiki. The template is wrong.
- Frames: `ch24/ch24-01--xIyydd0Yrc-04-19.png`, `-04-27.png`, `-04-40.png`, `-04-52.png`, `-04-53.png`, `-05-16.png`, `-05-19.png`.
- Benchmark change: C14z2 DETERMINED, add `amandaTrust: +1`. C14z2 COLD, add `amandaTrust: +1` (keep `instability: −1`). C14z3 TOO FAR, add `amandaTrust: −1`.

### ch26-05: arrows when the ten minutes run out (RETREAT)
- Question: when time runs out, do Jericho down-down and North down popups appear?
- Leads: `jaGQ4ARCjF4` (El Dios de los Mancos, forced retreat), `CYlgzkbkGlE` (Sag903, 17:40 "out of time, retreat").
- Reading: El Dios. Simon's radio says the other teams succeeded, then "Hemos fallado" (4:22). **JERICHO large down** (filled double chevron, level RESPETO) at 4:42, then **NORTH small down** at 5:19 during the argument in the alley. Sag903, same pass: "Marcus, we did it… We failed" at 25:23, **JERICHO large down** (RESPECTED) at 25:42, NORTH small down at about 26:19.
- Verdict: **settled**. Yes, both (two runs).
- Frames: `ch26/ch26-05-jaGQ4ARCjF4-04-22.png`, `-04-42.png`, `-05-19.png`; `ch26/ch26-05-CYlgzkbkGlE-25-42.png`.
- Benchmark change: none (RETREAT already has Jericho −2, North −1).

### ch26-06: Jericho arrow when the drone spots Markus
- Question: when the drone spots Markus at the alarm junction, is there a Jericho down popup as well as North down?
- Leads: `vrEttBQaL_w` (Cheng Teoh, caught by the drone), `CYlgzkbkGlE` (Sag903).
- Reading: Cheng. The alarm is deactivated (INNER LOOP CREATED, 0:13). Walking back, North says "Markus, watch out" (0:22). The hide prompt fails and the drone light finds him ("You are committing a class 3 offense…", about 0:31). The drone is downed, North says "I told you to watch out!", and then **NORTH small down** at 0:42 and **JERICHO small down** at 0:48. Sag903, a drone-fight failure at about 21:38 ("class 3 offense… reported to the police"): JERICHO small down at 21:38, NORTH small down at 21:54 ("I thought you could handle a drone without alerting every cop…").
- Verdict: **settled**. Yes, Jericho small down with North small down, on both the failed hide and the failed attack.
- Frames: `ch26/ch26-06-vrEttBQaL_w-00-42.png`, `-00-48.png` (`-00-27.png` is context); `ch26/ch26-06-CYlgzkbkGlE-21-38.png`, `-21-54.png`.
- Benchmark change: none needed. `ch26.mjs` lines 130 to 131 already apply `h.north(-1); h.jer(-1)` on GET SPOTTED BY DRONE. The CONFLICTS entry ("Benchmark: North −1 only") is stale and should be closed.

### ch26-09: public opinion after FAIL TO SEND A MESSAGE
- Question: after FAIL TO SEND A MESSAGE, does the closing news show public opinion up-up?
- Lead: `_ys34j9MI4U` (El Dios de los Mancos, failed to deliver).
- Reading: the closing news runs 4:40 to 4:55. Then **PUBLIC OPINION large up** (double chevron, level label COMPRENSIÓN) at 4:55 to 4:57.
- Verdict: **settled**. Yes, large up.
- Frame: `ch26/ch26-09-_ys34j9MI4U-04-56.png`.
- Benchmark change: none (+2 already applied). Side note: on the same ending, Cheng's `A9U-vYc3SKM` shows North small down at about 2:15, which matches the benchmark's North −1.

### ch29-02: does a Hostile Hank resign on the Kamski route?
- Question: with Hank Hostile and Connor holding Kamski's Jericho key, did Hank hand in his badge and gun in Fowler's office?
- Lead: `9bngTUguKgY` (VGS, 4:00 "Hank Quits the Force. Connor Discovers Jericho").
- Reading: in Fowler's office, Hank's label reads **HOSTILE** (3:59). He lays his gun and badge on Fowler's desk (4:01 to 4:03): "Something I should've done a long time ago… I don't belong here anymore." The chart at 4:44 runs AT THE POLICE STATION, FOWLER AND HANK ARGUE, KNOW JERICHO'S LOCATION, CONNOR LEFT FOR JERICHO. That is the Kamski-key route, and the evidence branch is not taken. The chart has no separate node for the resignation on this route, so it does not contradict the frame.
- Verdict: **settled**. Yes, Hank resigns on the Kamski route when Hostile.
- Frames: `ch29/ch29-02-9bngTUguKgY-03-59.png`, `-04-03.png`, `-04-33.png`, `-04-44.png`.
- Benchmark change: `ch29.mjs` gate `C19g`, from `route('evidence')(s)&&hostile(s)` to `hostile(s)` on both routes, so that `hankResigned` is also set on the Kamski route. This feeds Night of the Soul.

### ch29-04: minutes before OUT OF TIME standing still in the archive
- Question: about how many minutes pass before OUT OF TIME if you just stand still?
- Leads: `GCdznbgDYwg` (Cheng Teoh, out of time), plus `9bngTUguKgY` (VGS) and `Q5_X-x4yNdE` (Cheng), both of which show the timer.
- Reading: the countdown is on screen. It starts at 5:00 when Connor takes Hank's key (VGS: 4:59 just after TAKE KEY). On reaching the archive stairs it reads 4:33 (VGS 11:58), and at the evidence wall 4:28 (VGS 12:39; Cheng Q5_X 1:54: 4:27). VGS then captions "Wait 5 minutes" and gets JERICHO NOT LOCATED (12:58). Cheng `GCdznbgDYwg` shows the last seconds (0:06 down to 0) and then JERICHO NOT LOCATED and RETURNING TO CYBERLIFE FOR DEACTIVATION.
- Verdict: **settled**. About 4.5 minutes in the archive itself, out of a 5:00 timer that starts at the desk/key. The "about 6" figure does not hold.
- Frames: `ch29/ch29-04-9bngTUguKgY-11-58.png`, `-12-39.png`, `-12-58.png`; `ch29/ch29-04-GCdznbgDYwg-00-02.png`, `-00-15.png`; `ch29/ch29-04-Q5_X-x4yNdE-01-54.png`.
- Benchmark change: none forced. The 12-action budget remains a calibration. Its adaptation note (C20) can now cite a real 5:00 timer with about 4:30 left on entry, and the operator can scale the action count against it.

## Partially settled

### ch17-02: after SET FIRE, can Kara still be spotted, chased or killed?
- Leads: `pUhnQ6H68Ck` (RoxNotKiddo; worked); `C3n-rbxkTP0` (Pix'Perience; not downloaded).
- Reading: SET FIRE at 14:00, with fire in the main room. Zlatko: "What are you waiting for, go look." Kara gets Alice upstairs ("There's smoke everywhere… There's a fucking fire! Luther!"). On the way down, **Luther sees them** at 14:38 and chases them (14:41). There is a lamp QTE at 14:45. They exit by the back door and are caught in the yard ("Alice! Go, Alice!", about 14:57). Zlatko: "I warned you… dreams always end in tears" (15:08). Luther refuses, and the monsters ambush Zlatko.
- Verdict: **partially settled**. The game does not cut straight to the yard after SET FIRE: Kara was spotted and chased through the house and caught in the yard (normal yard ending). Whether she can be killed after the fire was not observed. The B&C chart (ch17-03 frames) shows BURNING DOWN THE HOUSE with no outgoing line, so the chase is not drawn as a separate node.
- Frames: `ch17/ch17-02-pUhnQ6H68Ck-14-02.png`, `-14-38.png`, `-14-41.png`, `-14-45.png`, `-15-08.png`.
- Benchmark change: K13 option 3 and K13a option 1 (SET FIRE) should lead to the spotted/chase sequence (K13c/yard), not a guaranteed clean escape. Any death risk stays unsourced.

### ch17-03: from the upstairs corridor, straight to the stairs?
- Lead: `W1vWV4zkFWs` (Basic & Casual, in-game 100% chart at 23:56 to 24:07).
- Reading: the completed in-game chart draws a grey line from GO THROUGH CORRIDOR up to the top bus that ends at KARA REACHES THE STAIRS. The same vertical also feeds the GET SPOTTED bundle. BURNING DOWN THE HOUSE has no outgoing line.
- Verdict: **partially settled**. The edge exists, so skipping the bathroom is possible. Whether it is a separate prompt or just walking past the bathroom door is not shown.
- Frames: `ch17/ch17-03-W1vWV4zkFWs-23-56.png`, `-24-07.png`.
- Benchmark change: none (K13c option 1 stays).

### ch26-07: North arrow at the alarm after destroying the drone first
- Lead used: `CYlgzkbkGlE` (Sag903, 17:40 pass).
- Reading: in this pass the alarm network is found (17:56) and the inner loop is created. North says "Markus, watch out" at 19:14, Markus hides, and at 19:34 North says "Nice job, Markus", followed by a **NORTH small up** at about 19:35. The drone is dealt with afterwards (20:10, "We need to get rid of it").
- Verdict: **partially settled**. The alarm does carry North up when it is deactivated after hiding from the drone. The drone-first order named in the question was not observed.
- Frames: `ch26/ch26-07-CYlgzkbkGlE-19-06.png`, `-19-35.png`.
- Benchmark change: none (North +1 already applied).

### ch26-10: can Markus ram the truck before the alarm or the drone is dealt with?
- Leads: `GSfnMGKNLEw` (El Dios de los Mancos, the alarm goes off), `5k7tdJndgdY` (VGS 14:00), `at1VT8mk3aE` (Belated Explorer).
- Reading: El Dios. At 3:22 the HUD reads ASEGURA LA ZONA with intercept-drone and alarm objectives open. At the truck yard (4:18) STEAL TRUCK is available. Markus drives into the store at 6:26. North: "We didn't deactivate the alarm!" (6:42). **JERICHO large down** at 6:47, then the retreat. VGS 14:00 is the same ("didn't deactivate the alarm", Jericho down). The Belated Explorer run actually neutralized the alarm first (HUD 2:00), so it does not test the question.
- Verdict: **partially settled**. Yes, the truck can be taken and rammed **before the alarm** is deactivated (HAD TO FLEE follows). Whether the drone had been destroyed in these runs is not shown, so the drone half stays open.
- Frames: `ch26/ch26-10-GSfnMGKNLEw-03-22.png`, `-04-18.png`, `-06-26.png`, `-06-42.png`, `-06-47.png`.
- Benchmark change: none (ramming at any time is allowed). This also confirms Jericho −2 on HAD TO FLEE.

### ch28-04: after a first STAND GROUND, does ATTACK ask CONFIRM / ABANDON again?
- Lead used: `AG4GEcU3ntQ` (PowerPyx CONFRONTATION). Medium leads `b8uveeYPmgo` and `xPD_oe6BryM` were not downloaded.
- Reading: at the first police warning the prompt is ATTACK / STAND GROUND / DISPERSE (1:27). John: "Don't do it, Markus…". Choosing ATTACK brings **CONFIRM / ABANDON** (1:35), and CONFIRM leads to "Follow me!" and the charge. No North, Josh or Simon popup appears from the ATTACK prompt through the charge (strip at 2 fps). This is a first-prompt ATTACK, not ATTACK after STAND GROUND.
- Verdict: **partially settled**. The CONFIRM / ABANDON step is real on a first-prompt ATTACK. The after-STAND-GROUND case was not observed.
- Frames: `ch28/ch28-04-AG4GEcU3ntQ-01-27.png` (ATTACK / STAND GROUND / DISPERSE), `-01-35.png` (CONFIRM / ABANDON).
- Benchmark change: none until the after-STAND-GROUND case is seen.

### ch29-03: insufficient-evidence save: garden first, or Fowler's office?
- Leads: `wsTum99TgWU` (Cheng Teoh, insufficient evidence), `9bngTUguKgY` (VGS 9:50).
- Reading: Cheng's compilation goes from the end of Meet Kamski (car, about 11:58) to a close-up of Connor's eyes (12:01), and then directly into Fowler's office (12:04, "you're off the case", Hank argues). There is no opening garden in between. After the office comes a foggy garden ("too late, Connor", 13:10), then RETURNING TO CYBERLIFE FOR DEACTIVATION, and the chart at 13:46 (FOWLER AND HANK ARGUE, JERICHO'S LOCATION UNKNOWN, INSUFFICIENT EVIDENCE). VGS 9:50 likewise shows the failure in the garden after the office.
- Verdict: **partially settled**. Both videos read as "opens in Fowler's office", which favours the wiki note. Cheng's video is an edited compilation, so a cut garden cannot be ruled out. The chart frame was not read at full zoom for a lit or unlit TALK TO AMANDA node.
- Frames: `ch29/ch29-03-wsTum99TgWU-12-01.png`, `-12-04.png`, `-13-10.png`, `-13-46.png`.
- Benchmark change (if confirmed): skip the ch29 opening Amanda scene when the evidence is insufficient.

### ch30-01: second or third corridor hit kills Markus?
- Lead: `tLtGyxHLdoY` (VGS 13:19, "Markus Killed in the Corridor").
- Reading: on the corridor run (RUN TOWARDS THE GUNS), Markus is hit once at 13:21 (VITAL SYSTEM DAMAGED, 13:23) and keeps running. At 13:29 to 13:31 he is hit again and falls. The soldier says "Don't move, asshole" (13:35), then North: "Markus!". That gives two hits on screen in this corridor, and the second kills.
- Verdict: **partially settled**. On this run the second corridor hit killed him. It is not visible whether he had already been wounded earlier in Crossroads (before 12:49), which the "third bullet" claim may count.
- Frames: `ch30/ch30-01-tLtGyxHLdoY-13-21.png`, `-13-23.png`, `-13-29.png`, `-13-31.png`, `-13-35.png`.
- Benchmark change: none until the shared counter's earlier hits are checked.

### ch32-04: LEAVE on the rooftop with Hank at Friend
- Lead: `WQYognX6H4o` (Seadooer, friends with Hank on the rooftop). `D-aFtb70eGc` (SwingPoynt) was used through its captions only.
- Reading: on arrival, HANK large down (0:27). The first menu is THREATEN / PLEAD / HANK'S SON / DEFY (1:23). After that the menu is THREATEN / HANK'S SON / DEFY (1:49). Then **[HANK'S SON (INSIST)]** is unlocked and chosen (2:06). At 2:43 to 2:46 a popup reads **HANK, FRIEND, PATH UNLOCKED**, and the menu is **[LEAVE]** (unlocked) / ATTACK. SwingPoynt's commentary likewise says "Oh, I can leave" only after the son conversation (10:35).
- Verdict: **partially settled**. LEAVE unlocks right after HANK'S SON then INSIST, through a "Friend: path unlocked" popup. The case without the son questions was not seen. The timing supports PowerPyx's "asked twice" recipe but does not prove it is required.
- Frames: `ch32/ch32-04-WQYognX6H4o-00-27.png`, `-01-23.png`, `-01-49.png`, `-02-06.png`, `-02-44.png`, `-02-46.png`.
- Benchmark change (likely, pending the negative case): C24 LEAVE should require Friend **and** HANK'S SON plus INSIST at the preceding prompts.

## Not settled (attempted)

- **ch19-02** (fence after the control-room alarm, John and the dogs). The B&C chart frame at 14:47 (`1VC64TkfitU`) is too small to trace the crossed lines. Sag903 `0LjHSb_5bLY` is blocked. Its captions only (no frames): the 57:25 pass "Markus gets spotted, leave John behind" ends with "It's too late. If we go back, we'll be killed too", then "There will be enough for everyone". So after an alarm the group returned with full bags and John left behind, which is unverified on screen.
- **ch23-01** (Simon on the roof after the phone guard is shot, door locked, operator shot). No frames; Sag903 `cYyMIB8Fz3w` is blocked. Captions: in every Sag903 pass where the phone guard is shot ("Simon, the shot." / "I'm okay. I can keep going."), a SWAT or broadcast-room sequence follows, and the news reports a casualty or no operator death. So none of those passes has the door locked with the operator shot. `eaYoywitjR4` was not downloaded.
- **ch29-01** (evidence room or decommissioned on the stated mix). VGS 9:50 to 13:00 shows the insufficient-evidence failure, but the run's earlier outcomes are not visible.
- **ch29-05** (one missed QTE in the Gavin fight). VGS 17:57 (win) and 19:27 (loss) show the QTE icons, but a missed press cannot be told from a hit at this resolution.
- **ch29-06** (statue map without the tablet). Cheng `Q5_X-x4yNdE` finds the map (1:45, "Jericho is somewhere in the Ferndale neighborhood… Now I can scan their memories and narrow the search", objective CROSS REFERENCE TO FERNDALE, 1:48), then deliberately does nothing until time runs out. The link to a reactivated memory is never attempted. Frames: `ch29/ch29-06-Q5_X-x4yNdE-01-45.png`, `-01-48.png`.
- **ch30-05** (Alice at Neutral, DISTANT). VGS `l6a1tfMyvlA`: DISTANT (12:10) gives ALICE small down (12:17), the label reads **DISTANT** (12:32), and she walks off (LOOK FOR ALICE / SAVE YOURSELF). This is the Distant case. The level before the choice is not visible, so the Neutral case is not tested. Frames: `ch30/ch30-05-l6a1tfMyvlA-11-37.png`, `-12-17.png`, `-12-32.png`.
- **ch30-06** (PROTECT ALICE, Luther left behind). The VGS 15:16 segment chooses HELP LUTHER in both passes, not PROTECT ALICE.

## Not attempted

- **Blocked** (strong leads that could not be downloaded): ch19-03 (`w8Y7-ZmTVZ0`), ch30-03 and ch31-04 (`0lQWknNuvOw`), ch31-02 (`AD26gAT8zx4`; the other lead, `-UQdmPf-QqQ`, turned out to show the next Connor chapter, not the church), ch28-03 (Sag903 `YzOvlco7GZY`).
- **Downloaded but not reached in time**: ch28-01 (VGS `MjDFaBvjFQM` 16:17 to 17:00; Simon's level is not shown in it anyway), ch28-03 (`OvpametCLyA`, a Simon sacrifice via STAND GROUND, not DON'T SHOOT), ch32-03 (`d6TUjGx2Bjs`; per its tags North is at Lover, not Friend or Companion, so it cannot answer the question), ch31-03 (VGS 0:42, Hank's suicide on a Hostile run, not the decommissioned case).
- **Medium or weak leads not tried**: ch17-01, ch17-04, ch21-01, ch25-01 to ch25-06, ch26-01 to ch26-04, ch26-08, ch27-13, ch28-02, ch28-06 to ch28-09, ch30-02, ch31-01, ch31-05, ch32-01, ch32-02, ch32-05.

## Benchmark changes implied by settled readings

| Conflict | Scene / rule | From | To |
|---|---|---|---|
| ch18-01 | `ch18.mjs` `rules.amanda.notCaughtPartnersFound` (C11z) | 0 | −1 |
| ch19-01 | M05h FREE THEM effect | North/Simon/Josh +1 | add Jericho +1 |
| ch19-01 | M05i ACCEPT effect | North −1, Simon −1, Josh +1 | add Jericho +1 (recheck Simon −1) |
| ch23-09 | `ch23.mjs` case M10e | North −1 on all options | North −1 on ALIBI and GAIN TIME only |
| ch24-01 | C14z2 DETERMINED | no arrow | Amanda +1 |
| ch24-01 | C14z2 COLD | SI −1 | SI −1, Amanda +1 |
| ch24-01 | C14z3 TOO FAR | no arrow | Amanda −1 |
| ch29-02 | `ch29.mjs` gate C19g | evidence route and Hostile | Hostile on either route |
| ch17-08 | spotted() death text | (wording) | Alice seen watching; fate not shown |
| ch26-06 | CONFLICTS entry | open | close: module already applies Jericho −1 |

No change for ch22-01, ch26-05, ch26-09 or ch29-04 (ch29-04 only refines the C20 note).
