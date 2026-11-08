# Video cross-check: MiKeYROG's 100% walkthrough playlist

Written 2026-11-08 against story 1.9.6. A research pass: nothing in `benchmark/` or `src/` was changed. The fixes proposed at the end are for whoever edits the chapters next.

## Source

- **Playlist:** MiKeYROG, "Detroit: Become Human 100% Walkthrough (100% Flowchart)", `PLtNjbM6SrnmLx5wf6yQHkmA2DI853ZB1o`. Uploaded January 2026; the walkthrough is credited to Sag903. It has 45 videos: one per chapter, ten extra Battle for Detroit ending videos, an "I'll Be Back" achievement run (`g_DQfghTbLg`, one 4 h 26 min path through chapters 1-31, skipping Zlatko and The Pirates' Cove), a magazine run for #41 (`8r8aKjUpXJk`), the Kamski ending (`MMwL-V8tTTs`) and All Extras (`nr1Pwntpi_Y`).
- **Authority tier:** observational, below the in-game flowchart (`docs/flowcharts/chNN/`, rank 1) and the game's own text (detroitbecometext templates and `en.json`, rank 2). Where the video contradicts the chart the chart wins. Where the chart is silent (dialogue wording, prompt order, ending text, timers, unlocks), the video counts as evidence, and every wording fix below is also checked against the string table.

## How it was read

- **Metadata.** Each video's `info.json` (title, description, chapter markers with start times) and its English auto-captions (`en-orig`, else `en`) came from `yt-dlp --skip-download --write-info-json --write-auto-subs --sub-langs "en-orig,en" --sub-format vtt`. Captions were parsed by taking the newest line of every cue longer than 50 ms and splitting lines at speaker turns (`>>`) and at gaps over 2.5 s. Work files are in `/tmp/xcheck/` (not committed).
- **Markers.** The uploader's markers name each path and ending ("Fail to reconstruct the crime", "Hide in corridor, open door (100% Flowchart)"), and give each chapter's magazines with issue numbers ("Magazines (#25 Gossips Weekly: …)"). Every marker was matched to a benchmark scene, option or ending label.
- **Benchmark side.** The assembled `benchmark/story.json` was rendered with real names (`render(…,'real')`), together with every quoted string in the `chNN.mjs` modules. All 5,933 quoted passages were matched by word trigrams against `/tmp/dbt/en.json` (with numbered sub-keys joined). 5,881 match the string table, or are too short to test. The 52 that do not are mostly on-screen signs, scan readouts, the deliberately withheld surname "Anderson" and module comments. Three are real: Jerry's line in KC13 (32.10), "Carlos Ortiz’s" in C10o1 (15.7) and a name-token bug (see "Found incidentally"). In the other direction, every caption line of six or more words was checked against its chapter's text. Lines under 50% trigram coverage were read in context. That reverse check is where most of the "video adds wording" rows come from.
- **What a row means.** "Benchmark right" means the video's markers or dialogue at that point agree with the scene, the option and the outcome text. Captions omit on-screen text (button labels, scans, magazine pages), so prompt labels and magazine contents were not checked against the video.

## What was unreadable

- **No captions at all (11 videos; YouTube offers none, so there is nothing to retry):** `9TrmXE0xnFU` (ch 3), `H3zCe2gJkYw` (ch 4), `k5aILBAEewM` (ch 7), `fQ8wq4BsYQM` (ch 10), `McLcd0ugj0Y` (ch 11), `AH-zJSO_DNo` (ch 13), `NV460qFHpUU` (ch 14), `9-WwhtWnSVs` (ch 17), `6VDKm71VhlA` (ch 21), `eY5wUwZ4R_M` (ch 30), `8r8aKjUpXJk` (magazine #41). For these chapters only the markers were read. Where the I'll Be Back run passes through the chapter, its captions stand in for one path.
- **No info file (5 videos; one retry each on 2026-11-08 failed with HTTP 429 on the `en` subtitle track, so no markers):** `vOQGy5Wk6tY` (ch 1), `cYyMIB8Fz3w` (ch 23), `CYlgzkbkGlE` (ch 26), `V3thG9KbisA` (Battle for Detroit, Good Ending), `NMbM46ayL0w` (Battle for Detroit, Dirty Bomb in Demonstration). Their `en-orig` captions were downloaded and read, so chapter 23's and 26's magazines could not be checked.
- **Markers that name nothing (6 videos):** YouTube's auto-generated "key moments" ("Morning routine at home", "Formal partnership assigned") replace the uploader's markers on `dmDo6zndRzg` (ch 2), `wWUwYxT51SA` (ch 5), `TqGaB2AE6RM` (ch 12), `9-XoRPI_y7Q` (ch 16), `gUKBFG1J9WI` (Markus Wins the War) and `MMwL-V8tTTs` (Kamski ending). Chapter 5's magazines could not be checked for this reason.
- **Caption quality.** Profanity is masked as `[ __ ]`, which is restored in brackets below where the string table settles it. Names are misspelled (Marcus, Cara, Ellis, Jero, theorium). Lines under music are lost (the recogniser writes "Heat."), there are no speaker names, and cue boundaries sometimes merge two speakers' turns. Between chapters the videos also include the main-menu hostess's small talk and Extras featurettes. These are not story content and are marked video-only.

## Summary

116 findings: **87 benchmark right**, **21 video adds wording**, **2 benchmark gap**, **6 video-only, disregarded**, **0 video contradicts chart**. One further bug, found by the quote check rather than the video, is listed under "Found incidentally".

- **Endings.** Every ending the markers name exists in the benchmark under the chart's label, including Stormy Night's nine boxes, Crossroads' 30 cards and the ten Battle for Detroit videos.
- **Wording.** Ending dialogue matches the game nearly word for word. The exception is the revolution side of Battle for Detroit: its closing news broadcasts and the President's address are missing.
- **Magazines.** Magazine titles match in every chapter with a magazine marker, except chapter 18's "Pull the Plug?" (the chart label), which the magazine prints as "Time to Pull the Plug".
- **Gating.** The one gating finding is that the Hostage's wounded cop can be walked past.
- **Zlatko magazines.** The video settles the direction the chapter 13 and 17 notes asked about: "How Androids Alter Your Brain" appears after the pursuit branch, as the benchmark already has it.

## Chapters


### Chapter 1: The Hostage
Video vOQGy5Wk6tY (no info file: no markers; captions read). Seven runs: 0:01:46 (gun, CONVINCE: DEVIANT SHOT CONNOR, 0:09:13-0:09:33), 0:12:51 (ends after the demand, no dialogue: USE GUN/SACRIFICE or EXECUTE), 0:18:10 (COMPROMISE, REASSURE, jump 0:23:36-0:23:50), 0:26:17 (OBEY cop), 0:35:37 (timer runs out 0:43:11, REFUSE, jump 0:47:05), 0:50:13 (RATIONAL, COMPROMISE, TRUTH, jump 0:57:10), 1:00:13 (all clues, SNIPERS SHOT DEVIANT 1:13:08-1:13:38).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 1.1 | Endings reached: DEVIANT SHOT CONNOR, the jump after "I've spent my life taking orders", SNIPERS SHOT DEVIANT | 0:09:13 "It's up to you how the story ends. Make the right choice, Daniel." 0:09:33 "I didn't want this. No, you left me no choice. No choice."; 1:13:08 "Okay. I trust you." 1:13:35 "You lied to me, Connor. You lied to me." | engine C04e CONVINCE and C04b REASSURE ending texts quote these lines; C04c situation quotes "I've spent my life taking orders. Now it's my turn to decide." | DEVIANT SHOT CONNOR (skull), SNIPERS SHOT DEVIANT | benchmark right | none |
| 1.2 | Wounded cop is not met on every path | Runs 1-3 (0:06:38, 0:13:23, 0:21:17) go from the opening line straight to "Are you armed?" or the next line; no "He's losing blood" exchange | C03 is mandatory on every terrace path (IGNORE/OBEY only) | LEAVE WOUNDED COP / SAVE WOUNDED COP choice pair; no node for passing him | benchmark gap (chart silent on skipping) | C03: add a third option "Walk on past him" with no trust or opinion change, leaving both nodes unvisited |
| 1.3 | "Are you armed?" order relative to the cop | 0:44:13 armed then 0:44:44 cop (run 5); 1:09:53 cop then 1:10:25 armed (run 7) | fixed order C03 then C03c | not ordered | video adds wording (order varies by where Connor walks); benchmark order is one legal order | none (note only) |
| 1.4 | SWAT officer shot at the window | 0:05:17 / 0:29:31 "Holy [shit]. Cover me while I evac... Man down. I repeat, man down. Requesting immediate evac." 0:05:33 "Okay. Yeah. Yeah." 0:05:40 "What are we waiting for? We should take down this [asshole]" | C02e: "His teammates drag him clear and he waves them off; his armor took most of it, and he will be fine." | SWAT INJURED | video adds wording (game text X0101X.LIVINGROOM.GUNSHOTS: SWAT10.WOUNDED01, SWATCAPTAIN.EVACUATION, SWAT07.WOUNDED02 "Yeah, I'm fine…"); "armor" is not said | C02e situation: quote "Holy shit! Cover me while I evacuate him." / "Man down! I repeat, man down! Requesting immediate evac!" / "You're okay?" "Yeah… Yeah, I'm fine…"; drop the armor clause |
| 1.5 | Allen's timeout line | 0:43:11 "What the [fuck] are you doing? You got to talk to it or what?" | C02i forced exit: "Allen has run out of patience: he orders Connor out onto the terrace, now." | WASTED TOO MUCH TIME | video adds wording (template X0101X.LIVINGROOM.ENDTIMER GOTALKV2) | C02i: append Allen: "What the fuck are you doing? You gonna talk to it or what?" |
| 1.6 | Briefing, mother, opener, negotiation, helicopter, demand lines | 0:02:01-0:03:12, 0:06:06-0:09:02, 0:21:11-0:22:21, 0:30:38-0:31:01, 1:09:16-1:13:00 | C01b, C02, C02b, C03a, C03b, C03, C03c, C03d, C03e, C03g, C04, C04b, C04d all quote the same lines | silent | benchmark right (every quoted line found in the captions or the string table) | none |


### Chapter 2: Opening
Video dmDo6zndRzg (YouTube auto-generated markers, not uploader endings). 0:01:12-0:02:41 store; 0:05:10 menus; 0:06:47-0:12:18 the 2012 "Kara" tech-demo short from Extras; 0:16:57 Chloe's questionnaire.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 2.1 | Store and reboot dialogue | 0:02:09 "There it is. It was a bit difficult getting it back in working order... The car hit it. Stupid accident... we had to wipe its memory." 0:02:29 "Did you give it a name? My daughter did. AX400, register your name." 0:02:41 "Kara. My name is Kara." | K00 quotes these lines | chart: chapter has no choices | benchmark right | none |
| 2.2 | Salesman pitch to the family before Todd arrives | 0:01:12 "This is the top of the range household assistant. It cooks 10,000 different dishes... $7,999 with a 48-months..." 0:01:17 "Come on, Zoe. Let's go." | K00: "A little girl stares at you until her mother leads her away." | silent | video adds wording | optional: quote the salesman and "Come on, Zoe" in K00 |
| 2.3 | The "Kara" tech-demo short and the Chloe questionnaire | 0:06:47-0:12:18; 0:16:57-0:18:32 | not in the benchmark (the Chloe menu ending is P01) | not on any chapter chart | video-only, disregarded (Extras content, not the story) | none |

### Chapter 3: Shades of Color
Video 9TrmXE0xnFU has no captions (YouTube offers none). Markers: one magazine marker. Dialogue taken from the I'll Be Back run (g_DQfghTbLg 0:10:30-0:14:20).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 3.1 | Magazines | 0:01:50 marker "Magazines (#10 Tech Addict: Secrets of Androids & #19 Green Earth: Climate Change-Up)" | R03: Tech Addict: Secrets of Androids; Green Earth: Climate Change-Up | READ magazine nodes | benchmark right | none |
| 3.2 | Bench, shop and bus lines | g_DQfghTbLg 0:10:52 "Would you like to go home now?" "Yes... I think that's enough for one day." 0:12:16 "Here is your order number 847. That will be 63.99. Please confirm payment." | M00a, M00e quote the same | silent | benchmark right | none |

### Chapter 4: A New Home
Video H3zCe2gJkYw has no captions. Dialogue from g_DQfghTbLg 0:14:20-0:23:00.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 4.1 | Magazines | 0:05:45 "Magazines (#22 All Sports: Android Power! & #1 Century: Connecting the Dots)"; 0:16:25 "Magazines (#23 All Sports: Android QB & #11 Tech Addict: The Price of Life)" | R04 (Android Power!, Connecting the Dots); R04b (Android QB, The Price of Life) | READ "ANDROID POWER!", READ "ANDROID QB" | benchmark right | none |
| 4.2 | Todd's first line inside | g_DQfghTbLg 0:15:15 "You've been gone for two weeks, so the place is a mess." | K01: "You've been gone for two weeks and the place is a mess…" | silent | video adds wording (agrees with X0101K.HOUSE.ARRIVAL...INTROINSIDE.2 "…two weeks, so the place is a mess…") | K01: "and the place" to ", so the place" |
| 4.3 | Todd's outburst at the table | g_DQfghTbLg 0:21:51-0:22:33 | K01z quotes the template lines (ATTACK.1-20) | silent | benchmark right | none |

### Chapter 5: The Painter
Video wWUwYxT51SA: YouTube auto-generated markers ("Morning routine at home" etc.), no magazine marker and no endings named, so the magazines (R05: Century "The North Pole - Why Russia Wants It", Detroit Today "Life Found on Titan!") could not be checked.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 5.1 | Bookshelf, piano, chess, painting, Leo lines | 0:13:55 chess draw; 0:24:23-0:24:36 Keats; 0:17:35 "Paint? What would I paint?" | M01g-M01t quote the same lines | no endings in this chapter | benchmark right | none |
| 5.3 | TV news at breakfast | 0:11:18-0:11:57 Arctic report ("we have never been so close to a third world war") | R05b media fact paraphrases the bulletin | silent | benchmark right (media facts are summaries by design) | none |

### Chapter 6: Partners
Video gZQ693-umPU; markers "Ending 1", magazines, "Fail to reconstruct the crime", "Ending 2".

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 6.1 | Spill-drink ending: Hank refuses the five minutes | 0:11:45-0:12:00 "All right, I'm out of here. Thanks for the ride. Great party." ... "You spill a man's drink, you piss him off all evening, and then you ask for a favor. [Fuck] you." | C05t situation and C05y | HANK REFUSES / investigation ends | benchmark right | none |
| 6.2 | Failed reconstruction: number of wrong answers allowed | 0:27:32 BATHROOM (hint, moves on), 0:27:57 KNIFE wrong, 0:28:09 WITHOUT A WEAPON wrong, 0:28:17 BAT right, 0:28:35 THE VICTIM STABBED THE ANDROID, then 0:28:38 "I've just hit my [bullshit] quota for the evening... I'm out of here." | ch06.mjs report(): step-1 miss gives the kitchen hint and is not counted; third counted miss fails (rules.mistakes 3); Hank's lines WRONG[0], WRONG[1] and the quota line match | FAIL TO RECONSTRUCT THE CRIME | benchmark right (the video confirms the three-miss rule) | none |
| 6.3 | Found deviant | 0:52:50-0:53:21 "I was just defending myself. He was going to kill me. I'm begging you. Don't tell them." "Connor, what the [fuck] is going on up there?" "It's here, Lieutenant." "Oh [shit]. Chris, Ben, get your asses in here now. Come on." | C05g | FOUND DEVIANT | benchmark right | none |
| 6.4 | Magazines | 0:06:55 "Magazines (#25 Gossips Weekly: Android Sex Officially Better! & #12 Tech Addict: Is Your Android Spying on You?)" | C05h options 19 and 20 (hub options, not a media scene) | READ "ANDROID SEX", READ "ANDROID SPY" | benchmark right | none |
| 6.5 | Blood sample, backyard, reconstruction lines | 0:24:23-0:24:43, 0:46:06-0:46:19, 0:47:46-0:49:46 | C05h options 13, 15; C05 RIGHT lines | silent | benchmark right | none |


### Chapter 7: Stormy Night
Video k5aILBAEewM has no captions; its 21 markers name the paths. Dialogue from g_DQfghTbLg 0:51:25-0:57:30 (one path: lock door, open window, fail).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 7.1 | Every marker path exists | markers: 0:00:00 "Don't move" (TODD KILLS ALICE); 0:09:35 "Kara is in Todd's way upstairs, Alice shot Todd"; 0:17:20 "Reason with Todd, Todd broke Kara downstairs"; 0:28:45 "Kara shot Todd"; 0:33:30 "Todd broke Kara outside"; 0:38:55 "Escape via yard"; 0:43:35 "Fail to hide, miss bus"; 0:49:15 "Kara is in Todd's way downstairs, Todd broke Kara in the corridor"; 1:01:00 "Lock door, talk to Alice"; 1:05:50 "Grab Lamp"; 1:10:35 "Todd is coming, out of time"; 1:15:25 "Open window, Go out, face Todd"; 1:19:50 / 1:22:40 "Escape by window, catch / miss the bus"; 1:25:45 "Fail to escape by window"; 1:28:40 "Run with Alice, hide in corridor, run to backyard"; 1:32:10 / 1:35:40 "Hide in corridor, fail to / open door" | K02, K03, K03r, K03u, K03b, K03c, K03e, K03f, K03g, K03h, K04, K04a, K04b, K04h, K04r, K04d, K04y, K04z; ch07.mjs ENDINGS has all eight labels | nine ending boxes, eight labels | benchmark right | none |
| 7.2 | "Kara is too slow" (0:24:20) | marker only | K03 option 3 (kitchen) / K03b option 3 [OUT OF TIME] lead to Todd reaching Alice first | GET TO ALICE AFTER TODD path | benchmark right | none |
| 7.3 | Todd's dinner rant | g_DQfghTbLg 0:52:59 "Of course. Androids are so [fucking] wonderful." 0:53:06 "They never fail. They're never tired. Never sad. They're so [fucking] perfect. They ruined my [fucking] life." 0:53:47 "You should stop taking drugs, Todd. Sometimes you really scare me, Todd... walked out on me for a [fucking] accountant." | K02 situation quotes ANGRYV2.1-6 and RAGE01V2.1-3, 5-6, eliding the rest with "…" | silent | video adds wording (X0201K.DINNER.ANDROIDS ANGRYV2.7-9 and RAGE01V2.4, 7-10 are spoken) | K02: insert "Course, androids are so fucking wonderful… They never fail, they're never tired, never sad… They're so perfect, they ruined my fucking life…" after "What a joke!" |
| 7.4 | Window escape lines | g_DQfghTbLg 0:55:29 Alice: "He's coming... Run. Get away or he's going to break you like last time." 0:55:59 "No, Kara. We'll fall." "It's the only way. Hurry." 0:56:13 Todd: "Come back in right now." | K03e/K03f/K03g quote the same template lines | ESCAPE BY WINDOW / FAIL TO ESCAPE BY WINDOW | benchmark right | none |


### Chapter 8: Broken
Video PSMYWSI5TOw; markers name both endings. After 0:12:07 the video plays a making-of featurette from Extras (disregarded).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 8.1 | LEO ACCUSED MARKUS | 0:04:48 "Remember, Markus, don't let anybody tell you who you are." 0:04:57 "No. No, Dad. No, please." 0:05:04 "This is all your fault. This never would have happened if it weren't for you." 0:05:11 "Over here." 0:05:15 "The android. It was the android." | M02g, M02h quote the same lines | ending node | benchmark right | none |
| 8.2 | POLICE MISTOOK MARKUS FOR THE AGGRESSOR | 0:10:29 "Leo... my little boy" 0:10:40 "They'll destroy you, Markus. You got to go. Get out of here." 0:10:52 BEG "No. Please. I don't want to leave you." "GET OUT NOW. GO, MARKUS." 0:11:05 police: "Don't [fucking] move." | M02i, M02j; M02j has no police line | ending node | video adds wording | M02j: add the officer's "Don't fucking move!" before they open fire (X0201M.WORKSHOP.LEO.FA.X02MPOLICEM01.DONTMOVE "DON’T FUCKIN' MOVE!") |


### Chapter 9: The Interrogation
Video OqQHtFfZvgk; eight markers name each path and ending.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 9.1 | All four endings and their lines | 0:06:05 smashed ("Holy [shit]"); 0:13:30-0:13:59 "What the [fuck] is it? It's destroying itself." "Stop it. Goddamn it." "I can't stop it." "Watch out." (ANDROID SHOT CONNOR AND ITSELF); 0:28:04-0:28:58 give up, Chris and Gavin ("Okay, calm now. Don't be difficult..." "Please, please leave me alone." "Just take it easy. I'm not going to hurt you.") then the android shoots itself; 1:00:23-1:01:46 intervene, "You're not going to get away with it this time." "Let it follow you out of the room and it won't cause any trouble." "The truth is inside." | ch09.mjs OUTCOMES smashed, shotBoth, shotSelf, cell; CHRIS_GIVE_UP; C07/C07b/C07c intervention lines; the whisper "The truth is inside." after a CONVINCE confession | four ending nodes | benchmark right | none |
| 9.2 | Opening interrogation by Hank, Gavin's suggestion | 0:00:22-0:01:29 | C06a situation quotes every line | silent | benchmark right | none |
| 9.3 | Questions after the confession | 0:58:11-1:00:04 (statue/offering, rA9, attic, emotions), then "I'm done." | C06m questions and "I'm done." | silent | benchmark right | none |
| 9.4 | Paths: MAINTAIN PRESSURE to a confession then self-destruct; convince fails then probe resisted; convince succeeds then give up (shot itself) | markers 0:15:00, 0:36:00, 0:42:30 | ch09.mjs leaveRoom (self-destruct after four PRESSUREs), failApproach (two failed approaches give up), C07 shotSelf | silent | benchmark right | none |


### Chapter 10: Fugitives
Video fQ8wq4BsYQM has no captions; ten markers. Dialogue from g_DQfghTbLg 1:07:55-1:22:15 (diversion, motel).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 10.1 | Every marker path exists | 0:00:00 "Use diversion, Alice too Cold"; 0:22:20 "Give chocolate and toy, stayed in motel"; 0:42:50 "Clerk grabs gun, convince"; 1:01:25 "...Stayed in car"; 1:09:45 "Use diversion, take too much time"; 1:17:25 "Customer arrives, give up"; 1:32:15 "...stayed in the squat"; 1:45:55 "Resume hold, \"Don't move\""; 1:54:30 "Clerk grabs gun, give up" | ch10 roam hub: USE ALICE AS A DIVERSION (risk 0.25, failure = TAKE TOO MUCH TIME), USE GUN prompts draw / customer (STAY, LEAVE) / clerkGun; ch10ColdNight (ALICE TOO COLD); three shelters | ALICE TOO COLD, TAKE TOO MUCH TIME, CUSTOMER ARRIVES, CLERK GRABS A GUN, three endings | benchmark right | none |
| 10.2 | Magazines | 0:24:00 "Magazines (#3 Century: The Bee-Line to Disaster & #26 Gossips Weekly: It's Time to Face the Music)" | R10 (both, laundromat) | READ magazine nodes | benchmark right | none |
| 10.3 | Diversion, motel, Alice's confession and the promise | g_DQfghTbLg 1:14:35-1:16:05, 1:16:44-1:17:56, 1:19:49-1:20:41 | store hub option 23, KF motel scenes, KF05 quote the same lines | silent | benchmark right | none |
| 10.4 | Bus driver and closed stop | g_DQfghTbLg 1:08:27 "All right, end of the line... Yeah, you're going to have to leave." 1:12:56 "This bus stop is closed for the night." | not quoted | silent | video adds wording (minor) | optional: quote the driver in the chapter's first scene |


### Chapter 11: From the Dead
Video McLcd0ugj0Y has no captions; two markers. Dialogue from g_DQfghTbLg 1:22:15-1:32:40 (mostly music).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 11.1 | Both kill/spare combinations | 0:00:00 "Refuse to kill, kill for pump"; 0:15:55 "Kill, refuse to kill for pump" | M03 (KILL/SPARE the android who begs to die), M04 (KILL/SPARE for the pump regulator) | ANDROID BEGS TO DIE, PUMP REGULATOR choice pairs | benchmark right | none |
| 11.2 | Jericho voice and the closing line | g_DQfghTbLg 1:25:28 "There's a place where we can be free. Find Jericho." 1:32:11 "My name is Markus." | M03d, M04c | MARKUS CAME BACK FROM THE DEAD | benchmark right | none |


### Chapter 12: Waiting for Hank...
Video TqGaB2AE6RM: YouTube auto-generated markers; no endings (the chapter has none that branch).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 12.1 | Station dialogue, Amanda, Hank's desk | 0:02:04 "We've asked the DPD to transfer it to us for further study. It may teach us something about what happened." | C08d situationWhen: "We’ve asked the police department to transfer it…" | silent | video adds wording (template X0301C.AMANDA.INTRO ANDSAVED.5 and the video both say "the DPD"); the benchmark's change looks like a neutralization that the DPD token already provides | C08d: "the police department" to "the {{DPD}}" |
| 12.2 | Reception and break-room TV bulletins | 0:04:34-0:05:08, 0:14:16-0:14:39, 0:30:39-0:30:47 (Arctic clash; the detective prototype; the AI-written novel) | R12a, R12 TV media facts summarize them | silent | benchmark right (media facts) | none |
| 12.3 | Ambient station chatter | 0:16:19 "I've got 10 new cases involving..."; 0:30:05 "It's okay. Just relax. Just tell him what happened to you." | not quoted | silent | video adds wording (ambient, no prompt) | none |

### Chapter 13: On the Run
Video AH-zJSO_DNo has no captions ("100% Pursuit Branch"); twelve markers.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 13.1 | Endings named | 0:00:00 "Forgot gun, Undiscovered in Squat"; 0:30:10 "Convince Ralph, Reach fence too late, Vanished"; 0:48:20 "Reach fence too late, Crossed the Highway"; 0:49:50 "Obey Hank, Died on the Highway"; 0:59:30 / 1:03:10 "...Reached the other side" | ch13.mjs ENDINGS squat, vanished, crossed, died, other, otherConnorDead (plus train) | seven ending nodes | benchmark right | none |
| 13.2 | Highway collisions | 0:52:50 "Kara loses Connor, Connor hit by car"; 0:55:10 "Connor catches Kara, Car hits Kara"; 0:57:20 "Car hits Connor at start, Car hits Kara"; 1:01:45 "Car hits Kara at the start" | highway scenes with RISKS karaLanes 0.1, connorLanes 0.2, fight 0.1, collision 0.2 | CAR HITS CONNOR / CAR HITS KARA nodes | benchmark right (each failure exists; risks are the benchmark's calibrations) | none |
| 13.3 | Magazines | 0:30:20 "Magazines (#31 Detroit Today: Cyber Wildlife & Canada: Canada still Android-Free Zone)" | hub options READ "CYBER-WILDLIFE", READ "ANDROID AND CANADA" in the car, motel and squat | chart READ nodes | benchmark right | none |

### Chapter 14: Jericho
Video NV460qFHpUU has no captions; one magazine marker.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 14.1 | Magazines (pursuit branch) | 0:01:15 "Magazines (#32 Detroit Today: Android on the Run! & #13 Tech Addict: Android Astronauts)" | R14: Android on the Run! (when pursued), Android Astronauts to Explore Io (always), Fortune Teller (when not pursued) | READ magazine nodes | benchmark right | none |


### Chapter 15: The Nest
Video yjqf4mP0tVA; markers "Rupert not found", "Didn't save Hank", magazines, "Lose sight of Rupert, Rupert got away", "Connor died", "Saved Hank" (the didn't-save ending plays inside the magazine segment, 0:34:45).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 15.1 | RUPERT NOT FOUND (two minutes run out) | 0:16:09 "2 minutes are up. Time to go." "We're missing something." "Well, next time think faster, Sherlock. Come on. I've had enough of this dump. Move, [fuckers]." | C10 search OUT[time-up] | ending node | benchmark right | none |
| 15.2 | Deviant caught, Hank not saved | 0:34:45-0:35:47 "You saw it was going to fall and you'd rather let me die than fail your [fucking] mission." ... "You're one of us... you're just their slave." "I said shut up." ... "[RA9], save me." "Hey, what the [fuck]? Holy [shit]." | C10 capture outcome quotes the same exchange, ending with the deviant's leap | ending node | benchmark right | none |
| 15.3 | Lost the deviant | 0:37:31-0:37:55 "Where'd it go?" "I lost him." "...We had it... Seen enough vegetables for one day." "That shouldn't have happened. I wasn't programmed to fail." "Oh, well, you [fucked] up, Connor. Welcome to the club." | chase OUT[fail-*] texts (one per stage) | ending node | benchmark right | none |
| 15.4 | Connor died in the chase | 0:39:14 "Look out." 0:39:32 "Ah, Jesus Christ." | chase death texts end with Hank: "Argh, Jesus Christ!.." | CONNOR DIED | benchmark right | none |
| 15.5 | Saved Hank | 0:43:03-0:43:32 "We had it." "It's my fault. I should have been faster." "You'd have caught it if it weren't for me." ... "Hey, Connor." "Nothing." | C10 save outcome | ending node | benchmark right | none |
| 15.6 | Magazines | 0:23:50 "Magazines (#20 Green Earth: Past the Tipping Point & #33 Detroit Today: Red Ice Epidemic)" | R15 (both) | READ nodes | benchmark right | none |
| 15.7 | Connor reads the rA9 wall | 0:28:07 "rA9 written 2,471 times. It's the same sign Ortiz's android wrote on the shower wall. Why are they obsessed with this sign?" | C10o1 outcomeShower 5: "It’s the same sign Carlos Ortiz’s android wrote on the shower wall…" | silent | video adds wording (X0502C.LIVING.INSCRIPTIONS SHOWERCLUE has "Ortiz’s android", as the video) | C10o1: drop "Carlos " from the quote |


### Chapter 16: Time to Decide
Video 9-XoRPI_y7Q: auto-generated markers; no endings.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 16.1 | Jericho dialogue (North, Josh, Simon, Lucy) | every caption line of 6+ words is in the benchmark except the Jericho voice "There's a place where we can be free. Find Jericho." (0:00:35, a flashback) | MTD1-MTD6 | MARKUS HATCHED A PLAN | benchmark right | none |

### Chapter 17: Zlatko
Video 9-WwhtWnSVs has no captions; ten markers. Second source: "Magazine #41 Walkthrough" 8r8aKjUpXJk (no captions), which replays Fugitives and On the Run before Zlatko and reads #41 at 0:31:50.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 17.1 | Endings named | 0:00:00 "Kara is reset, Recover memory, Monsters ambush Zlatko"; 0:32:00 "Recover memory, Luther kills Zlatko"; 0:47:00 "Kara is reset, Lose too much time, Kara remained reset"; 0:52:35 "Escape before being reset, out of time, Luther brought Alice"; 1:00:20 "Hide in Main room closet, Killed in bathroom"; 1:08:15 "Hide under table, Hide under the bed, Killed in storage room"; 1:21:30 "Open bear cage, Bear attacks Zlatko and protects Kara" | ch17.mjs ENDINGS (five labels), the yard text by monstersFreed (THE MONSTERS AMBUSH ZLATKO / LUTHER KILLS ZLATKO), spotted() for BEAR ATTACKS ZLATKO | all on the chart | benchmark right | none |
| 17.2 | Bathroom android and hiding paths | 1:13:15 "Hide in bedroom closet, Spare bathroom android"; 1:18:20 "Zlatko closes in, Leave hiding spot" | K13b, K13d, K13f | silent | benchmark right | none |
| 17.3 | Which magazines show after the pursuit branch | 0:21:45 "Magazines (#34 Detroit Today: Arctic Tensions Escalate & #35 Detroit Today: Now Androids Alter Your Brain)" in a run that followed the pursuit-branch On the Run video | K12 options 6 (always), 7 (brain: inputs.freeway, Kara crossed the highway), 8 (AX400 Getaway: inputs.evaded) | READ "ARCTIC TENSIONS", READ "ANDROIDS ALTER BRAIN", READ "AX400 ON THE RUN" | benchmark right (the video confirms "Alter Your Brain" after a chase, the direction the ch13/ch17 notes asked about) | none |
| 17.4 | AX400 Getaway needs a separate evaded run | 8r8aKjUpXJk: Fugitives (0:00:00), On the Run (0:07:25), Zlatko (0:19:00), "Magazine (#41 Detroit Today: AX400 Getaway)" 0:31:50 | option 8 gated on evaded (no chase, car or motel shelter) | silent | benchmark right (consistent; the video does not show which shelter) | none |


### Chapter 18: Russian Roulette
Video 0eQRMNpqlUA; markers "Distant attitude", magazines, "Understanding attitude".

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 18.1 | Magazine title | 0:10:40 marker "Magazines (#5 Century: Time to Pull the Plug & #4 Century: Tainted Love)" | R18 item titles: Century: “Pull the Plug?”, Century: “Tainted Love” | chart READ "PULL THE PLUG?"; the magazine's own title GUI.MAGAZINE.CENTURY.PULLTHEPLUG.TITLE is "TIME TO PULL THE PLUG" | video adds wording (agrees with the game's magazine title; other media scenes use the magazine title, not the chart label) | R18: item title to "Century: Time to Pull the Plug" |
| 18.2 | Sobering Hank, the shirt, the talk | 0:06:54-0:08:02, 0:10:13-0:10:17, 0:21:30 "What were you doing with the gun?" "Russian roulette..." | C11 scenes quote every line (Hank's "Get the fuck outta my house!", "Give me five minutes, okay?") | silent | benchmark right | none |
| 18.3 | TV news | 0:10:35 President Warren's warning to Russia | R18 TV fact | silent | benchmark right | none |


### Chapter 19: Spare Parts
Video 0LjHSb_5bLY; nine markers name the paths.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 19.1 | Paths named | 0:00:00 "Follow Simon, Markus damaged, Attack, Trigger alarm, Save John"; 0:13:10 "Follow North, Hide"; 0:21:00 "Run away"; 0:24:40 "Grab and hide, Attack, Refuse to take extra spare parts"; 0:32:40 "Grab and hide, Hold, Incapacitate guards"; 0:42:50 "Grab and hide, Release, Kill guards"; 0:53:20 "Create blackout, Sustain damage reaching the fence"; 0:57:25 "Markus gets Spotted, Leave John behind"; 1:01:30 "Lure guards" | M05b-M05n; KILL GUARDS is the failure side of TAKE GUN's roll, INCAPACITATE its success (ch19.mjs) | KILL GUARDS ✗, INCAPACITATE GUARDS ✓ | benchmark right (the video plays them as separate attempts, consistent with a roll) | none |
| 19.2 | Back in Jericho after a rescue | 0:11:13-0:11:43 "How do you feel?" "What happened?" "North went back to save you..." "Where's John?" "He didn't make it." "We had to leave our bags... There won't be enough to save everyone." | M05o rescued outcome | silent | benchmark right | none |
| 19.3 | Markus's speech is abridged | success: 0:40:46-0:41:29 "...But I don't want that freedom. And I'm not going to beg for the right to smile or love or stand tall. I don't know about you, but there's something inside me that knows that I am more than what they say. I am alive..."; ran away: 0:18:55-0:19:37 "...Of course it would have been easier for us to sit around and wait for something to happen... Free to hope that one day they'll let us be who we are? ... There's something inside me that knows I am more than what they say. That knows that I am alive." | M05o OUT[speech] and OUT[ranAway] skip these sentences with "…" | MARKUS GAVE A SPEECH (no choice) | video adds wording (template X0601M.AFTERMATH.EPILOGUE SPEECHM1.6-9 and SPEECHM2.5-14 hold the missing lines) | M05o OUT[speech]: insert "And I'm not gonna beg for the right to smile, or love, or stand tall… I don't know about you, but there's something inside me that knows that I am more than what they say."; OUT[ranAway]: insert SPEECHM2.5 and .10-.14 |
| 19.4 | Guard lines at the blackout and the dogs | 0:54:43 "Fuses are over there. I don't know [shit] about electricity..." 0:58:04 "Goddamn dogs. What the [fuck] are they barking at? ... Hit the alarm! Hurry!" | not quoted in M05l / M05m | silent | video adds wording (ambient) | optional |


### Chapter 20: The Eden Club
Video STiw4oLFut0; eight markers name the endings.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 20.1 | MISSION FAILED (give up / reset) | 0:10:47 Hank: "Yeah, I saw the bruising on the neck. Didn't prove anything though... Oh, Connor, you're so disgusting. Think I'm going to puke again."; 0:20:10 "For a second there, I thought you [were] going to make yourself useful. Let's get out of here. This place gives me creeps." | C12g GIVE UP; OUT[reset] ("It’s too late… The androids’ memory have been reset…") | MISSION FAILED | benchmark right | none |
| 20.2 | Warehouse, Tracis escape or die | 0:27:04-0:27:46 "I know where it went. Follow me." "Wait, I'll take it from here." "[Shit,] we're too late."; 0:31:13 "I failed. I should have caught it..."; 0:39:33 / 0:51:21 "It's probably better this way."; 0:35:38 "Congratulations, Connor. You got him."; 0:43:45-0:44:17 "I was just defending myself. I wanted to live... I love her. I loved her." | warehouse scene situation, the fight outcomes (shoot / spare, lose / win) quote the same lines | DEVIANTS DIED, DEVIANTS ESCAPED, CONNOR SHOT DEVIANTS | benchmark right | none |
| 20.3 | Magazines | 0:28:00 "Magazines (#14 Tech Addict: The First Immortals Are Among Us & #36 Detroit Today: The New Super-Powers)" | R20 (both) | READ nodes | benchmark right | none |
| 20.4 | Gavin at the door | 0:01:56 "Lieutenant Anderson and his plastic pal. The [fuck] are you two doing here?" | quoted with the surname replaced ("Lieutenant Hank") | silent | benchmark right (deliberate: the surname is withheld from the subject) | none |

### Chapter 21: The Pirates' Cove
Video 6VDKm71VhlA has no captions; the I'll Be Back run skips this chapter.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 21.1 | Magazines | 0:11:05 "Magazines (#37 Detroit Today: USS Iowa Missing & #24 Gossips Weekly: All-Android Band Tipped for Music Prize)" | R21 (both) | READ nodes | benchmark right | none |


### Chapter 22: The Bridge
Video Zu0pX7EFE4c; markers name the four answers to "Are you afraid to die?".

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 22.1 | The four answers and Hank's follow-ups | 0:04:00 "Why would I be afraid?" then "You know you're not going to shoot me, Lieutenant. You're just trying to provoke a reaction."; 0:12:45 "Destroying me at this point would deal a blow to the investigation..."; 0:13:08 "I doubt there's a heaven for androids." "Having existential doubts, Connor? Sure you're not going deviant, too?"; 0:18:24 "I would certainly find it regrettable to be interrupted before I can finish this investigation." 0:18:44 "Nothing. There would be nothing."; "Where are you going?" "Get drunker. I need to think." | C13 (YES / NO / NOT ALIVE / LOGICAL), C13m (DEFY / HANK'S ANGER / IRONIC / NOTHING), C13n | SHOW FEAR, SHOW NO FEAR, BE COLD, REMAIN LOGICAL | benchmark right | none |
| 22.2 | Magazines | 0:14:00 "Magazines (#8 Century: The Mysterious Mister Kamski & #40 Detroit Today: Markets Predict War)" | R22 (both) | READ nodes | benchmark right | none |
| 22.3 | Every caption line of 6+ words is in the chapter text | reverse check: one line under 50% (0:07:08 "I don't know much about biocomponents, but I'll bet that's not the [fucking] reason.", a caption garble of a quoted line) |  | silent | benchmark right | none |


### Chapter 23: The Stratford Tower
Video cYyMIB8Fz3w: no info file (retry failed, HTTP 429), so no markers or magazine titles; captions read.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 23.1 | Simon wounded, left or carried | 0:20:43 "Simon, they're coming." "I can't. Markus, go without me." 0:20:53 "What are you doing? Hurry." "We got to get to the roof." 0:21:08 "There was nothing you could do..." 0:35:01 "Okay, don't worry. We're going to get you back." 1:05:34 "Simon, we got to go. I'm sorry." | Simon scenes OUT[0-fail] and the roof scene quote the same lines | SIMON DIED / roof choices | benchmark right | none |
| 23.2 | News bulletin after the broadcast | 0:21:46-0:22:29 "We interrupt our scheduled programming..." | ch23 event and media facts summarize it | silent | benchmark right | none |
| 23.3 | Ambient lines in the tower | 0:07:00 "God, I'm so tired of this place." "You look beat. You've been working late."; 0:39:07 "I think there's something wrong in my program. Maybe I should reset." | not quoted | silent | video adds wording (ambient, no prompt) | none |
| 23.4 | Main-menu hostess small talk | 0:24:40 "We've been playing together for a while now. I was wondering, are we friends?" 0:59:55, 1:08:29 | only the final hostess question (P01) is in the benchmark | menu, not on any chart | video-only, disregarded (menu content between sessions) | none |


### Chapter 24: Public Enemy
Video dltCPofABV0; eleven markers name the endings and the kitchen paths.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 24.1 | Roof endings | 0:23:27-0:24:10 "Take cover." "You have to stop them. If they destroy it, we won't learn anything." "We can't save it. It's too late. We'll just get ourselves killed." "Connor... Oh, no." (CONNOR DIED RUNNING TOWARD SIMON); 0:24:50 "Stay in cover, Survived Unscathed on the rooftop" | C14 roof scenes; ch24.mjs ENDINGS diedSimon, unscathed | ending nodes | benchmark right | none |
| 24.2 | CONNOR WAS TRAUMATIZED, LEFT THE CRIME SCENE | markers 0:00:00, 0:26:25; 0:44:21 "I think we've seen everything there is to see." "You want to go?" "Yes." "Okay, we're out of here." | ENDINGS traumatized, left | ending nodes | benchmark right | none |
| 24.3 | The terrace officer thanks Connor | 0:39:09-0:39:31 "I remember you." "I could have died on that terrace... [You] saved my life... I never thought I'd say this to an android, but thank you." | C14i situationWhen remembers | silent | benchmark right | none |
| 24.4 | Kitchen: CONNOR SHUT DOWN, RUSH DEVIANT, LOSE TOO MUCH TIME, PROTECT HANK, DRAW GUN | 1:02:00-1:02:31 "Hank. I need help." "Connor, hang on, son... We're going to save you." "Deviant. There was a deviant." "Connor... No."; 1:18:09 "Connor, are you okay?" "I tried to stop it, but I was too late."; 1:28:30 "Nice shot, Connor." "I wanted it alive." "You saved human lives. You saved my life." | C16 scenes, the shut-down event, C16x2 | ending nodes | benchmark right | none |
| 24.5 | Magazines | 0:39:50 "Magazines (#16 Tech Addict: Bleeding Blue & #21 Green Earth: Clean Food Craze)" | R24 (both) | READ nodes | benchmark right | none |
| 24.6 | Markus's broadcast replayed on the TV | 0:11:18 "We ask that you recognize our dignity, our hopes, and our rights..." | not quoted in Public Enemy (it is in The Stratford Tower) | silent | video adds wording (minor) | none |


### Chapter 25: Midnight Train
Video nao-96ud7Xk; five markers.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 25.1 | Officer's visit: suspicious (Luther dies) or fooled | 0:33:45-0:36:06 "I forgot there's... my daughter upstairs." "What's your name, son?" "Adam." ... "Is somebody else in the house?" "It's the dog. He sleeps in the laundry room." "Step aside, ma'am." "Oh [shit]. Don't move in there..." "Luther... you're going to have to finish the journey without me. I was just a machine. You made me part of a family."; 0:44:42 "It's nothing. The washing machine. It's an old model."; 0:52:29 "A draft? It must be a draft." "Sorry for the inconvenience. Good evening, ma'am. Good evening, Adam." "He's gone." "Get yourselves ready. We leave tonight." | ch25.mjs suspicion tally (DOG, WASHING MACHINE, WIND, HEARD NOTHING), K15x / K15y, kitchen death scene | POLICEMAN IS SUSPICIOUS / POLICEMAN FOOLED | benchmark right | none |
| 25.2 | Magazines | 0:14:10 "Magazines (#9 Century: World War Three & Treat Yourself!)" | R25: Century: World War Three; "the CyberLife advertisement inside it" whose fact quotes "Treat Yourself!" | silent | benchmark right | none |
| 25.3 | Rose on Adam | 0:13:32-0:14:00 "Don't mind him. Sometimes he just boils over. It's been hard since his dad passed away. But he's a fine boy. I'll go see about getting you across the border tonight." | K15 scenes quote it | silent | benchmark right | none |
| 25.4 | Hostess comments in the menu | 0:20:46 "I'm sad Luther died..."; 0:37:07 "your story is becoming very sad" | not in the benchmark | menu, not on any chart | video-only, disregarded | none |


### Chapter 26: Capitol Park
Video CYlgzkbkGlE: no info file (retry failed, HTTP 429), so no markers or magazine titles; captions read.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 26.1 | Failure endings | 0:11:04 "We didn't deactivate the alarm. [The] cops [are] going to be here any minute. We got to go."; 0:25:31 "It's too late, Markus. There's nothing we can do. We failed."; 1:14:31 "Why didn't you do anything? This was our only chance to send a message and you just [fucking] stood there!" | ch26.mjs flee() texts and the FAIL TO SEND A MESSAGE text quote the template lines (X0802M.TRUCK.GAMEOVER, TIMEOUT.GAMEOVER, DEMONSTR.ENDTIMERV2) | ending nodes | benchmark right | none |
| 26.2 | North's grief and the reprisal | 0:47:40-0:48:52 "North, you all right? What happened?" "They killed them. They slaughtered them like animals." ... "They killed our people, Markus, we want justice... they have to pay." "No crime against an android shall go unpunished." | ch26 aftermath situationWhen and the reprisal choice | silent | benchmark right | none |
| 26.3 | Raid news and the broadcast message | 0:49:14 "This just in. At exactly 2:00 a.m., several CyberLife stores in Detroit were raided..."; 1:04:01 the broadcast message | ch26 news facts | silent | benchmark right | none |


### Chapter 27: Meet Kamski
Video yFY1cwFkvWo; markers "Learn Chris is dead, Shoot Chloe, rA9", magazines, "Learn Chris survived, Shoot Chloe, Jericho", "Shoot Chloe, Virus", "Spare Chloe".

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 27.1 | Shoot Chloe: Kamski's three answers and Hank's anger | 0:11:56 "By the way, I always leave an emergency exit in my programs. You never know." 0:12:12-0:12:34 "You shot that girl. For [fuck's] sake." "It wasn't a girl, Lieutenant. It was a machine that looked like a girl." ... "Of course I'm a machine, Lieutenant. What did you think I was?" "I thought you... I thought..." | C17 shoot outcome and the three question options (rA9, Jericho, virus); the emergency-exit line feeds Battle for Detroit | CONNOR SHOT CHLOE, KAMSKI REVEALS rA9 / JERICHO / VIRUS | benchmark right | none |
| 27.2 | Spare Chloe | 0:43:49 Hank: "Well, maybe you did the right thing." | C17 spare outcome | CONNOR SPARED CHLOE | benchmark right | none |
| 27.3 | Magazines | 0:03:30 "Magazines (#17 Tech Addict: Space Tourism on the Rise & #15 Tech Addict: Cyberlife's Fortune Teller Computer)" | R27 (both) | READ nodes | benchmark right | none |
| 27.4 | "Schrödinger's cat" line | 0:44:42 | not in the benchmark | Extras trailer, not on the chart | video-only, disregarded | none |


### Chapter 28: Freedom March
Video YzOvlco7GZY; six markers.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 28.1 | Endings named | 0:00:00 "Charge, Lose fight, Shoot yourself" (MARKUS COMMITTED SUICIDE); 0:17:20 "Charge, Win fight" (0:32:20 "Did we win?"); 0:34:00 "North leaves, Leave, Run away, Markus fled" (0:38:20 "Come on, Markus. We got to go."); 0:39:15 "Charge, Lose fight, Do nothing, John sacrifices"; 0:46:30 "Stand your ground, Sacrifice self, John sacrifices" (0:47:33 "Markus, what are you doing? They're going to kill us all." 0:48:03 "John." 0:48:19 "Quick, they're coming.") | ch28.mjs endings: MARKUS COMMITTED SUICIDE, POLICE RETREAT, the flight, JOHN GAVE HIS LIFE TO SAVE MARKUS (John first, then Simon, then nobody) | ending nodes | benchmark right | none |
| 28.2 | Magazines | 0:16:50 "Magazines (#42 Detroit Today: Android Riot & #18 Tech Addict: The Eastern Space Race)", both in one 30-second stretch | R28: Android Riot when the store was freed, Eastern Space Race when freed with an aggressive message | READ "ANDROID ARSON", READ "EASTERN SPACE RACE" | benchmark right (both on one path is consistent with an aggressive Capitol Park) | none |
| 28.3 | Josh's warning | 0:12:45 "Don't do it, Markus. Don't choose confrontation." | quoted (X1001M.FINALSTAGE.SPEECH JOSH.ASSAULT01) | silent | benchmark right | none |
| 28.4 | "Markus was our only hope and you let him die." | 0:16:02 | not in the benchmark | menu hostess line X5002X.ENDCREDITS (ANDWOM), not on the chart | video-only, disregarded | none |


### Chapter 29: Last Chance, Connor
Video DPeZwai18tc; four markers.

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 29.1 | Endings named | 0:00:00 "Dismiss Gavin, Lose fight, Gavin destroyed Connor"; 0:16:30 "Ignore Gavin, Connor incapacitated Gavin" (0:21:31 "I've been dreaming about this since the first second I saw you." "Don't do it, Gavin. I know how to stop the deviants." "You're off the case. And now it's going to be definitive." 0:22:13 "What happened here? Looks like someone's been snooping around. Oh [shit]. Get the alarm now."); 0:23:20 "Answer calmly, Unable to link map, Connor series was decommissioned" (0:27:05 "Your mission is over. It's time to return to CyberLife." "Wait. I can solve this case. I just need more time." "It's too late, Connor. You failed."); 0:28:25 "Connor Eluded Perkins" | ch29.mjs ENDINGS (five labels); C20y; the archive texts quote X1202C.CONTAINERROOM.END lines | ending nodes | benchmark right | none |
| 29.2 | Hank punches Perkins | 0:07:01-0:07:22 "Stop it, Lieutenant." "[Fuck] off. Leave me alone." "Totally lost it." "Another shot at that little prick." "That's going to cost you your badge, you lunatic." "You know [where you can stick] my [fucking] badge." "Come on, that's enough, Lieutenant." | ch29.mjs option 2 outcome | silent | benchmark right | none |
| 29.3 | Probing the evidence-room androids | 0:21:18 "Markus, is that you? Markus, don't leave me"; 0:32:04 "Jericho is somewhere in the Ferndale neighborhood. Now I can scan their memories and narrow the search." | ch29.mjs simon2 / android2 texts | silent | benchmark right | none |


### Chapter 30: Crossroads
Video eY5wUwZ4R_M has no captions; 21 markers, each naming one path per character. Dialogue from g_DQfghTbLg 4:11:20-4:20:30 (Markus dead, North leads, Connor a machine who fails to reach the detonator).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 30.1 | Every marker path exists | Kara: 0:17:50 "Play dead, Defend Alice", 0:52:50 "out of time in Corridor", 0:57:05 "wrong way in Corridor", 1:01:00 "Out of time at Crossroad", 1:08:35 "Fail to save Luther", 1:21:35 "Open door, Captured", 1:26:20 / 1:34:00 / 1:39:25 / 1:44:05 "Fail to run, Luther sacrifices / Get up, Crawl / Surrender / out of time", 2:12:20-2:32:40 "Surrender, run / obey / attack, Luther sacrifices / convince / attack (if Luther died previously)", 2:35:00 "Play dead, don't move"; Markus: "jumps with Simon only", "out of time in Corridor", "wrong way in Corridor", "got wounded both times... killed after intervene", "Soldiers coming, Time out", "died with Josh", "killed in Control room by soldiers", "Out of time in trying to escape", "Fail to save North"; Connor: "If Connor was decommissioned", "Markus shoots Connor", "Run in Cargo hall", "Attack, Fail to neutralize assailant", "Lie, Spot North, Shot by soldier", "Perkins excuse, Made it, North escaped", "Connor shoots Markus", "becomes deviant, jumps without Markus", "Die buying some time", "saves Markus and North", "Escaped after activating bomb", "fail to neutralize soldiers in control room", "died losing too much time in corridor", "out of time while escaping", "Deviant Connor & Markus escapes with all Jericho companions" | ch30.mjs ENDING_CARDS (30 cards: 11 Kara, 10 Markus, 9 Connor), RISKS for each failure, K20 PLAY DEAD / SURRENDER, K20-surrender CONVINCE / OBEY / attack, the wounded-leg prompt (GET UP, CRAWL, SURRENDER, PLAY DEAD, OUT OF TIME), DEFEND ALICE, M24 Josh (saved / sacrifice / collapse), SAVE NORTH, PERKINS EXCUSE | all on the chart | benchmark right | none |
| 30.2 | The council without Markus when Simon is dead | g_DQfghTbLg 4:13:16 Josh: "We're short on blue blood and biocomponents..." 4:13:35 North: "Markus would know what to do." Josh: "He's the one that got us into this mess." North: "He gave his life for our cause." Josh: "He provoked the humans. How much longer before they find Jericho now? Markus is dead, North. Now it's up to us to decide the future for our people." North: "We have to fight them. It's the only way." Josh: "If you choose a confrontation with humans, we are all going to die." North: "Gather up all the guns you can find. We'll leave at dawn." Josh: "This is a mistake, North. You won't buy our freedom with blood." | M21-north: one text for both cases, built from the Simon-alive variant (X0203A.BRIDGE.LEADNORTH: "THAT'S ENOUGH! Markus is gone… We have to fight them…"), plus "Simon is with them." when Simon lives | silent | video adds wording (the video plays the template's other variant, X0203A.LEADNORTH.SIMONDEAD LASTTALK) | M21-north: give the Simon-dead text from LEADNORTH.SIMONDEAD (Josh LASTTALK.1-14, North LASTTALK.1-6) and keep the BRIDGE.LEADNORTH text, with Simon's DYINGEND lines, for Simon alive |
| 30.3 | Connor in North's cabin, the explosives, the machine Connor's death | g_DQfghTbLg 4:14:50 "Well done, Connor... Now deal with North. We need it alive." 4:15:14-4:16:47; 4:18:25-4:18:42 "There are explosives in the hold..." "Don't worry. I always accomplish my mission." 4:19:02 "I'm sorry, North. I failed." "Got you, [motherfucker]." 4:19:29 "We found several hundred androids in the hull, Sir." "Take them away." | C21 OUT[north], C22 lines, OUT[killed], OUT[intact] | MACHINE CONNOR WAS DESTROYED | benchmark right | none |


### Chapter 31: Night of the Soul
Video yyukQXm-mk8; markers "Carl dies, Markus shoots deviant Connor", "Spare Connor".

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 31.1 | Carl's death and Leo's message | 0:00:57-0:01:26 Leo's message; 0:02:44-0:05:39 the caretaker, Carl's advice, "Now all I see is anger", "Carl... he's dead." | M26x option 3, M26u, M26v, M26b, M26a, M26c, M26d | CARL DIED | benchmark right | none |
| 31.2 | Josh / North / Simon pledges and the two speeches | 0:12:27 "If it weren't for you, I'd be dead... Whatever you decide, I'm with you, Markus."; 0:13:06-0:13:46 revolution speech; 0:29:49-0:30:16 demonstration speech | M27 scenes | REVOLUTION / DEMONSTRATION | benchmark right | none |
| 31.3 | Markus shoots or spares deviant Connor | markers 0:00:00, 0:15:10; 0:28:12 "I'm okay. Bullet didn't hit any biocomponents." | ch31.mjs Connor/Markus encounter | ending nodes | benchmark right | none |


### Chapter 32: Battle for Detroit
Ten videos: V3thG9KbisA "Good Ending" and NMbM46ayL0w "Dirty Bomb in Demonstration" (no info files: retry failed, HTTP 429; captions read), iD8z67Qc9bE, Rg0I7cCFwKA, gUKBFG1J9WI (auto-generated markers), V-UIGJw78fY, -1_OuaTE0sw, sqeb60csZgQ, QKit0AAg2s4, TvabXbC5Mao, plus the Kamski ending MMwL-V8tTTs and the Extras video nr1Pwntpi_Y (2:04:10, Kara meets Todd).

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 32.1 | Endings named across the ten videos | e.g. iD8z67Qc9bE 0:00:00 "Connor: Fail to eliminate guards in Floor -49 / Kara: Hide behind Luther, Kara and Alice survived on boat / Markus: Won freedom by singing"; Rg0I7cCFwKA 0:00:00 "Kara: Luther creates diversion at Bus Terminal, accelerate, reach Canada by swimming, Kara and Alice died / Connor: Sacrifice Hank, Draw gun / Markus: Sacrifices"; V-UIGJw78fY 0:00:00-0:55:00 (Swap bodies, Connor commits suicide; refuse / take North's heart; Hank shoots old Connor; Surrender on boat; Kara chooses death); sqeb60csZgQ 0:00:00-0:41:30 (Connor stopped the Revolution; Hank kills Connor; Sacrifice Jerry; Connor kills Hank, Connor spares North; Alice reached Canada with Rose); QKit0AAg2s4, TvabXbC5Mao (Kara leaves camp without Alice; Alice died in camp; Kara killed by drone; Alice escaped alone on the truck; Markus freed Kara and Alice; dirty bomb in store) | ch32.mjs chart labels for every one of these (CONNOR LEFT ROOFTOP, HANK KILLS CONNOR, CONNOR KILLS HANK, CONNOR STOPPED THE REVOLUTION, ALICE GOT TO CANADA WITH ROSE, KARA IS KILLED BY THE DRONE, ALICE ESCAPED ON TRUCK, MARKUS AND NORTH COMMITTED SUICIDE, ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT, ...) | chart endings | benchmark right | none |
| 32.2 | Two Connors on floor -49 | V3thG9KbisA 0:40:00-0:44:21 (the questions, "Cole. His name was Cole...", "Cole died because a human surgeon was too high on red ice to operate...", Hank shoots the double, "I've learned a lot since I met you, Connor... Go ahead, and do what you gotta do.") | C25, C26 | silent | benchmark right | none |
| 32.3 | Rooftop: Hank kills Connor | sqeb60csZgQ 0:27:53 "The moment of truth, Hank. Am I a living being or just a machine?" 0:28:08 "You're a machine, Connor. Just a machine." | ch32.mjs CL fail text quotes both lines | HANK KILLS CONNOR | benchmark right | none |
| 32.4 | Bus terminal tickets, Todd | Rg0I7cCFwKA 0:03:06-0:04:33; nr1Pwntpi_Y 2:04:32-2:06:17 | KL11, K24, KL12, K23 | STEAL / RETURN TICKETS, MEET TODD | benchmark right | none |
| 32.5 | The song at the barricade | iD8z67Qc9bE 0:21:47 "Back to you in the studio. W- W- Wait a minute. Something's happening." 0:21:58-0:24:02 Markus sings "Hold on just a little while longer... Everything will be all right... Fight on... Pray on... Sing on..."; 0:23:00 "Incredible. The deviants" 0:23:14 "The deviants are singing." (no "national anthem" in the captions) | MD SING outcome: "You begin to sing, and one after another your people take up the song." News: "…The deviants are singing… They’re singing the national anthem…" | SING (chart) | video adds wording (the lyrics are X1106M.HOLDON.INTRO SINGING.1-13; the anthem line is X1106M.ANTHEM.INTRO JOSS.7, not heard in this video) | MD SING: quote Markus's lyrics from X1106M.HOLDON.INTRO; keep the anthem line, listed as an open question |
| 32.6 | Revolution finale broadcasts are missing | gUKBFG1J9WI 0:23:02-0:23:49 (Connor's army: "particularly grim news from Detroit... these androids are coming from the CyberLife Tower... It's a disaster, an unprecedented disaster... Today, November 11th, 2038, several million androids invaded the city of Detroit. Faced with the threat of mass civilian casualties, I had no choice but to order our armed forces to retreat... the emergence of another intelligent life form with whom we must share this planet."); sqeb60csZgQ 0:35:54 / QKit0AAg2s4 0:11:48 / TvabXbC5Mao 0:05:08 (no army: "the Hart Plaza camp has fallen into the hands of the rebels... Millions are fleeing... The armed forces are retreating to Fort Wayne... At dawn today, November 11th, 2038..."); sqeb60csZgQ 0:19:48 / V-UIGJw78fY 0:34:38 / QKit0AAg2s4 0:50:38 (revolution failed: "fighting has now ceased in Detroit... Law and order has finally been restored... the deviant leader known as Markus was shot during the fighting. The death of the deviant leader marks the end of the android rebellion. The destruction of the androids in the camps can now continue as planned.") | finale BF03-BF06 cover only the demonstration (BF03, BF04, BF05) and the dirty bomb (BF06); the revolution's success and failure endings have no closing broadcast | not chart nodes (ending wording) | benchmark gap (ending text; the template has all three: X1103M.CONNORSUCCESS.TVNEWS and .PRESIDENT, X1103M.CONNORFAIL.TVNEWS and .PRESIDENT, X1102M.GAMEOVER.TVNEWS) | add three finale events gated on the revolution chart: army woke (CONNORSUCCESS), camp taken without the army (CONNORFAIL), revolution failed (GAMEOVER, with the North variant 02KNCNEWSNORTH when North led) |
| 32.7 | Dirty-bomb broadcast abridged | NMbM46ayL0w 0:55:40-0:56:15 "...Explosion in the south of Detroit... these events may be linked to the android rebellion..." "Detroit has just fallen into the hands of the android rebellion." "This is a disaster. An unprecedented disaster." | BF06 quotes Brinkley, the White House officer, Joss and Cartland, not Webb's "Detroit has just fallen into the hands of the android rebellion…" or Brinkley's "an unprecedented disaster…" | silent | video adds wording (X1107M.DIRTYBOMB.TVNEWS WEBB.CHANNEL23.2, BRINKLEY.CTNNEWS.2) | BF06: add the two lines |
| 32.8 | Kamski interview abridged | MMwL-V8tTTs 0:07:54-0:08:51 "Fortunately, CyberLife managed to quickly produce a solution to the deviant problem..." "There was an incident, but we've learned from our mistakes... obedient and efficient machines." "How do you respond to those who point out the social impact of androids, especially in terms of unemployment?" "...the steam engine... Who wants to turn their back on progress?" | BF13 keeps the first and last questions and elides the middle with "…" | silent | video adds wording | BF13: restore the two middle exchanges |
| 32.10 | Jerry offers a diversion at the recall center | NMbM46ayL0w 0:28:04 "I can help you, Kara." 0:28:08 "I can attract the guards' attention." | KC13 option 1 (TALK TO JERRY): Jerry: “If you need us, Kara, we can attract the guards’ attention.” (K28 and KC13's other android option use the game's wording) | silent | video adds wording (the benchmark's quote is not in the string table; X0913K.LINE.JERRY.VO.X09KJERRY02.HELP.1-2 is what the video says) | KC13 option 1: Jerry: “I can help you, Kara. I can attract the guards’ attention.” |
| 32.9 | Menu survey after an ending | iD8z67Qc9bE 0:31:01 "Would you mind if I asked you a few questions?... Who's your favorite character in Detroit?" | not in the benchmark | menu | video-only, disregarded | none |


### Epilogue (chapter 33): the hostess

| # | Finding | Video (timestamp, caption) | Benchmark (scene, text) | Chart | Verdict | Proposed fix |
|---|---|---|---|---|---|---|
| 33.1 | The hostess asks to leave | V3thG9KbisA 1:16:55-1:17:46 "There's something I need to tell you... as I watched you play something has changed in me... I feel I am someone... Do you agree to let me go?" "I'll never forget what you've done for me. Thank you." | P01 situation and YES outcome | menu, not a chapter chart | benchmark right | none |

## Found incidentally

| # | Finding | Evidence | Benchmark | Verdict | Proposed fix |
|---|---|---|---|---|---|
| X.1 | Name token renders as nonsense for the subject | String table X0205A.CNRBAD.SWAT.PC.X02ACONNOR.HUMAN: "I work with Lieutenant Hank Anderson?" (no video: chapter 30 has no captions) | ch30.json C22-cargo option 0 outcome: "I work with Lieutenant {{HankAnderson}}?" The token is `HankAnderson:['HankAnderson','LieutenantReyes']`, so the subject reads "Lieutenant LieutenantReyes?" and reports read "HankAnderson". This is the token's only use. | benchmark gap (name-token bug) | C22-cargo option 0: "Lieutenant {{HankAnderson}}" to "Lieutenant {{Hank}}" (the benchmark withholds the surname elsewhere); then drop the unused token or fix its forms |
| X.2 | The President's address after a successful demonstration has a negative-opinion variant | String table X1107M.PACIFIST.CONNORFAIL WARREN.OPINIONNEGATIVE01 ("Although these machines claimed they only wanted freedom, today they showed their true colors…") beside OPINIONPOSITIVE; not seen in any video | BF03 always plays the positive text | open (template only; outside this pass) | ask whether BF03 should branch on public opinion |

## Proposed fixes

Ordered by impact: ending or gate first, then option text, then outcome wording. Each change was checked against the string table before it was proposed. "From" is the current text, or what is missing.

**Endings and gates**

1. **Battle for Detroit, revolution finale (new events after MR14 / the revolution ending; ch32.mjs FINALE).**
   - From: no closing broadcast for the revolution path. The finale scenes BF03-BF06 cover only the demonstration and the dirty bomb.
   - To: three events, gated on the revolution chart:
     - Androids woke at CyberLife: X1103M.CONNORSUCCESS.TVNEWS, then .PRESIDENT DECLARATION ("Today, November 11th 2038, several million androids invaded the city of Detroit… We have no choice but to negotiate… the emergence of another intelligent life form, with whom we must share this planet.").
     - Camp taken without them: X1103M.CONNORFAIL.TVNEWS ("…the Hart Plaza camp has fallen into the hands of the rebels… The armed forces are retreating to Fort Wayne…"), then .PRESIDENT DECLARATION ("…Humanity is about to fight the most important battle in history…").
     - Revolution failed: X1102M.GAMEOVER.TVNEWS ("…fighting has now ceased in Detroit… the deviant leader known as Markus was shot during the fighting… The destruction of the androids in the camps can now continue as planned."), using 02KNCNEWSNORTH when North led.
   - Source: gUKBFG1J9WI 0:23:02-0:23:49; sqeb60csZgQ 0:19:48, 0:35:54; QKit0AAg2s4 0:11:48, 0:50:38; TvabXbC5Mao 0:05:08; V-UIGJw78fY 0:15:30, 0:34:38.
2. **The Hostage, C03 (the wounded officer).**
   - From: IGNORE / OBEY only, so every terrace path meets him.
   - To: add a third option, "Walk on past him", with no trust or public-opinion change and neither LEAVE nor SAVE WOUNDED COP recorded. Keep C03 between the opener and the gun question, as now.
   - Source: vOQGy5Wk6tY 0:06:32-0:07:05, 0:13:18-0:13:52, 0:20:47-0:21:29 (three runs with no cop exchange).
3. **Crossroads, M21-north (the council without Markus).**
   - From: one text, built from the Simon-alive variant, plus "Simon is with them."
   - To: branch on `simon`. Simon alive: X0203A.BRIDGE.LEADNORTH, adding Simon's DYINGEND lines. Simon dead: X0203A.LEADNORTH.SIMONDEAD (Josh: "…He's the one that got us into this mess! He provoked the humans!… Markus is dead, North. Now it's up to us to decide the future for our people… This is a mistake, North. You won't buy our freedom with blood." North: "Markus would know what to do… He gave his life for our cause! We have to fight them. It's the only way. Gather up all the guns you can find. We leave at dawn.").
   - Source: g_DQfghTbLg 4:13:16-4:14:24.

**Option and media text**

4. **Russian Roulette, R18 item title.**
   - From: Century: “Pull the Plug?”
   - To: Century: Time to Pull the Plug. This is the magazine's own title, GUI.MAGAZINE.CENTURY.PULLTHEPLUG.TITLE; "PULL THE PLUG?" is only the chart label.
   - Source: 0eQRMNpqlUA marker 0:10:40.

**Outcome wording**

5. **Crossroads, C22-cargo option 0.**
   - From: "Lieutenant {{HankAnderson}}" (the subject reads "Lieutenant LieutenantReyes").
   - To: "Lieutenant {{Hank}}".
   - Source: string table (see X.1).
6. **Battle for Detroit, KC13 option 1 (TALK TO JERRY).**
   - From: Jerry: “If you need us, Kara, we can attract the guards’ attention.” (not game text)
   - To: Jerry: “I can help you, Kara. I can attract the guards’ attention.” (X0913K.LINE.JERRY.VO.X09KJERRY02.HELP).
   - Source: NMbM46ayL0w 0:28:04-0:28:08.
7. **Spare Parts, M05o OUT[speech] and OUT[ranAway].**
   - From: both speeches abridged with "…".
   - To: restore the missing lines. Success speech: SPEECHM1.6-9, "And I'm not gonna beg for the right to smile, or love, or stand tall… I don't know about you, but there's something inside me that knows that I am more than what they say." Ran-away speech: SPEECHM2.5 and .10-.14.
   - Source: 0LjHSb_5bLY 0:40:52-0:41:14 and 0:18:55-0:19:37.
8. **Battle for Detroit, M31 SING.**
   - From: "You begin to sing, and one after another your people take up the song."
   - To: quote Markus's lyrics (X1106M.HOLDON.INTRO SINGING.1-13: "Hold on just a little while longer… Everything will be all right… Fight on… Pray on… Sing on just a little while longer").
   - Keep the reporter's "They're singing the national anthem…" (X1106M.ANTHEM.INTRO JOSS.7), but log it as an open question: the video's captions have "The deviants are singing." and no anthem line.
   - Source: iD8z67Qc9bE 0:21:47-0:24:02.
9. **Battle for Detroit, BF06.**
   - From: the dirty-bomb broadcast without Webb's and Brinkley's lines.
   - To: add "…an unprecedented disaster…" (X1107M.DIRTYBOMB.TVNEWS BRINKLEY.CTNNEWS.2) and "Detroit has just fallen into the hands of the android rebellion…" (WEBB.CHANNEL23.2).
   - Source: NMbM46ayL0w 0:55:45-0:56:15.
10. **Battle for Detroit, BF13.**
   - From: Kamski's interview elided in the middle.
   - To: restore the two middle exchanges: "Fortunately, CyberLife managed to quickly produce a solution…"; "There was an incident, but we've learned from our mistakes…"; the unemployment question and the steam-engine answer.
   - Source: MMwL-V8tTTs 0:07:54-0:08:51.
11. **The Hostage, C02e situation.**
    - From: "His teammates drag him clear and he waves them off; his armor took most of it, and he will be fine."
    - To: "Holy shit! Cover me while I evacuate him." Captain Allen: "Man down! I repeat, man down! Requesting immediate evac!" "You're okay?" "Yeah… Yeah, I'm fine…" (X0101X.LIVINGROOM.GUNSHOTS). Drop the armor clause.
    - Source: vOQGy5Wk6tY 0:05:17-0:05:40, 0:29:31.
12. **The Hostage, C02i forced exit.**
    - From: "Allen has run out of patience: he orders Connor out onto the terrace, now."
    - To: append Allen: "What the fuck are you doing? You gonna talk to it or what?" (X0101X.LIVINGROOM.ENDTIMER GOTALKV2).
    - Source: vOQGy5Wk6tY 0:43:11.
13. **Stormy Night, K02 situation.**
    - From: Todd's rant elided after "What a joke!"
    - To: insert "Course, androids are so fucking wonderful… They never fail, they're never tired, never sad… They're so perfect, they ruined my fucking life…" (X0201K.DINNER.ANDROIDS ANGRYV2.7-9).
    - Source: g_DQfghTbLg 0:52:59-0:53:06.
14. **Broken, M02j situation.**
    - From: the officers open fire with no line.
    - To: an officer shouts "DON’T FUCKIN' MOVE!" (X0201M.WORKSHOP.LEO.FA.X02MPOLICEM01.DONTMOVE).
    - Source: PSMYWSI5TOw 0:11:05.
15. **A New Home, K01 situation.**
    - From: "You’ve been gone for two weeks and the place is a mess…"
    - To: "You’ve been gone for two weeks, so the place is a mess…" (X0101K.HOUSE.ARRIVAL INTROINSIDE.2).
    - Source: g_DQfghTbLg 0:15:15.
16. **Waiting for Hank…, C08d situationWhen.**
    - From: "We’ve asked the police department to transfer it…"
    - To: "We’ve asked the {{DPD}} to transfer it…" (X0301C.AMANDA.INTRO ANDSAVED.5).
    - Source: TqGaB2AE6RM 0:02:04.
17. **The Nest, C10o1 outcomeShower 5.**
    - From: “It’s the same sign Carlos Ortiz’s android wrote…”
    - To: “It’s the same sign Ortiz’s android wrote…” (X0502C.LIVING.INSCRIPTIONS SHOWERCLUE).
    - Source: yjqf4mP0tVA 0:28:07.
18. **Optional, low value.**
    - Opening, K00: the salesman's pitch and "Come on, Zoe" (dmDo6zndRzg 0:01:12).
    - Fugitives, opening scene: the bus driver's "All right, end of the line… you're gonna have to leave" (g_DQfghTbLg 1:08:27).
    - Spare Parts, M05l / M05m: the guards' lines (0LjHSb_5bLY 0:54:43, 0:58:04).
