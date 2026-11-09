# Video readings, pass 2: chapters 01–08

Read 2026-11-08. Backlog: **ch04-10, ch05-08, ch06-02, ch06-03, ch07-17**. Chapters 01–03 and 08 have no open entry; ch06-13 and ch07-21 were already settled in pass 1 and were not counted again.

Method: read BRIEF.md, ch01-16.md, readings-ch01-16.md, the chapter 01–08 portion of CONFLICTS.md and the research README. Searched the web and YouTube metadata for missing leads. Downloaded only selected sections, one video at a time, with `yt-dlp --download-sections` and `-f 'bv*[height<=720]'`, without cookies or login. Sections include margins around the target, except where the source itself ends. Used ffmpeg to extract frames and read the images directly, including contact sheets and closer sequences at the decisive moments. Captions were used to locate Partners warnings, not to establish the evidence count. Times are nominal positions in the source video (section start plus extraction offset); allow small stream-cut timing differences. No benchmark code or source inventory was edited.

Logs, downloaded sections, metadata, search results, helper scripts and contact sheets: `/Users/pelicannurse/.t3/detroitbench-tools/video-pass2/ch01-08/`. `download.sh` and `followup-download.sh` record the exact requested ranges and retry policy. All game-video downloads succeeded on the first attempt; the one-minute refusal retry was not needed. Metadata for some rejected alternatives is retained without downloading their video.

The completed in-game charts remain authoritative for structure. None of these readings requires inventing a chart node. In particular, the Painter reading concerns an optional activity omitted before the existing studio continuation, rather than a new ending or a new activity node.

**Result: 5 conflicts attempted; 3 settled, 0 partially settled, 2 not settled.** “Settled” for ch06-02 means a measured count in one recorded investigation, not a universal count independent of player speed.

| Conflict | Verdict | Reading | Implied change |
|---|---|---|---|
| ch04-10 | Not settled | See room-cleaning inspection below | None yet |
| ch05-08 | Settled | Waiting without an activity reaches the speech and “Let's go to the studio” | Add a wait / do-nothing option to M01f |
| ch06-02 | Settled for this recorded pass | 3/10 before the first departure warning in that investigation | Record the observation; do not turn it into a universal action threshold |
| ch06-03 | Not settled | No inspected route waits after 10/10 | None yet |
| ch07-17 | Settled | Downstairs reasoning → knockdown → upstairs gun pickup | None; current route is supported |

## 04 · A New Home

### ch04-10: Talk to Alice with both bedrooms done, bathroom/book/shelf skipped

- **Question:** Can Kara kneel to talk to Alice with both bedrooms done while the bathroom is not cleaned and the book and shelf have not been inspected?
- **Lead inspected:** [MiKeYROG / Sag903, Chapter 04 A New Home](https://youtu.be/H3zCe2gJkYw), the operator's 100% compilation. Its description gives magazine markers at 05:45 and 16:25, but no marker for this omission test. Downloaded 17:30–21:30 and 21:10–28:00 to inspect the upstairs sequence. Additional searches for the exact omissions and speedruns did not establish a matching route. DanaDuchy's `vGFEnueMKXM` and the other generic cleaning/trophy recordings were only search candidates, not evidence of omitted chores.
- **Reading:** The 17:30–21:30 section is still in Todd’s bedroom: the gun discovery is around 17:45 and much of the rest is an optional TV sequence. In the later section Kara leaves Todd’s room, enters the bathroom around 22:35 and cleans it, including vacuuming the floor at **23:25**. She then enters Alice’s room, makes the bed around 24:25, explores and ventilates it. At **25:40** the objective display has **TALK TO ALICE** available, with the “You’ve unlocked a dialogue” tutorial; by **26:10** Kara is kneeling and the conversation menu offers NAME KARA / INTERESTS? / SEEM QUIET / MOTHER?. This is a successful conversation **after bathroom cleaning**, so it lacks the required omission. The recording cannot settle whether the bathroom, book and shelf may all be skipped.
- **Frames saved:** `../video-evidence/ch04/ch04-10-H3zCe2gJkYw-23-25.png` (bathroom chore), `ch04-10-H3zCe2gJkYw-25-40.png` (talk objective/tutorial), `ch04-10-H3zCe2gJkYw-26-10.png` (conversation menu), all in the ch04 evidence folder.
- **Verdict:** **Not settled.** A successful conversation after doing the disputed chores cannot show that those chores are unnecessary; failure to see a prompt before both bedrooms are done also cannot show that they are required.
- **Benchmark change:** None. Keep the question open for a controlled omission replay unless a recording shows all of its prerequisites.

## 05 · The Painter

### ch05-08: Wait without chess, books or piano

- **New lead:** [What Happens if You DON'T Find Something To Do | Detroit: Become Human (The Painter)](https://youtu.be/Girel6zYFVo), **Bonds Box**, id `Girel6zYFVo`, duration 2:56; description: “Skip to 1:10”, explicitly describing not finding an activity after breakfast. Downloaded **00:50–02:56** (20 seconds before the marked moment through the end of the source).
- **Reading:** At 00:50–01:10 Carl is eating and Markus stands beside him. Through the subsequent TV/news exchange and waiting, Markus remains in the dining area and does not use the chessboard, books or piano. Around 02:28 the camera cuts to Carl. At **02:32** the subtitle is “One day, I won't be here to take care of you anymore.” The rest of the familiar speech follows, including “and make your choices…” (02:37). Crucially, **02:52** reads **“Let's go to the studio.”** The clip ends at 02:56; actual wheelchair transport into the studio is not shown, but Carl's studio instruction after the no-activity wait is shown directly.
- **Verdict:** **Settled: yes** to the no-activity breakfast continuation. The missing activity is not an obstacle to the speech or instruction to move to the studio. This supplies direct gameplay support for the wiki's no-activity variant. It does not supply a precise idle timeout.
- **Frames saved:** `../video-evidence/ch05/ch05-08-Girel6zYFVo-01-10.png`, `-02-27.png`, `-02-29.png`, `-02-32.png`, `-02-37.png`, `-02-52.png`, `-02-55.png` (same filename prefix throughout). The decisive text frames are **02:32** and **02:52**.
- **Rejected operator-recording route:** [MiKeYROG / Sag903 Chapter 05](https://youtu.be/wWUwYxT51SA), downloaded **11:15–14:40**. The FIND SOMETHING TO DO objective is visible at 12:45, the player approaches the chessboard, then plays chess around 13:20–13:40 before Carl's speech. It cannot test an omitted activity. Its metadata/captions also locate later book and piano variants; these were not treated as a no-activity route.
- **Benchmark change:** Add a fourth M01f option representing waiting / doing nothing; set `painterActivity` to `'none'` and proceed to the existing studio continuation. Do not fabricate a fourth activity on the flowchart or an exact waiting duration. As CONFLICTS.md notes, ch31 M26x already accommodates absence of all three pastimes. Apply through the integrator's normal story-version/replay-preservation workflow.

## 06 · Partners

### ch06-02: Evidence count at Hank's first departure warning

- **Lead:** [MiKeYROG / Sag903, Chapter 06 Partners (All Endings)](https://youtu.be/gZQ693-umPU), id `gZQ693-umPU`. The description's **13:40** marker begins a fresh investigation that later fails its report; it is not itself the warning time. Downloaded **24:30–26:40** around its first warning. Also inspected **08:30–13:40** around an earlier route's 11:45 warning.
- **Reading:** In the later investigation, **25:45** visibly reads **REVIEW EVIDENCE: 3/10**, beneath BRIEFING CONCLUDED and VICTIM EXAMINED. From that HUD display to the warning, Connor walks toward the body, then stands; no clue is analyzed or reconstruction completed. At **25:57**, Hank's subtitle is **“All right… I'm outta here. Thanks for the ride.”** Connor asks for five more minutes and Hank grants them (about 26:10–26:20). At 26:25–26:35 the player resumes investigating the knife. The counter therefore remains **3/10 at the first warning in this investigation**.
- **Verdict:** **Settled as a recorded observation: 3.** This is a leisurely pass with optional magazine viewing and walking/standing as well as evidence work. It is not a fixed game rule: another player's pace and route can produce a different count when a real-time warning fires. It cannot validate or replace the benchmark's 13 + 5 action budget by itself.
- **Frames saved:** `../video-evidence/ch06/ch06-02-gZQ693-umPU-25-45.png` (readable 3/10); `ch06-02-gZQ693-umPU-25-57.png` (warning). The earlier unsuccessful locator also has `ch06-02-gZQ693-umPU-11-40.png` and `ch06-02-gZQ693-umPU-11-45.png`: a nearby OPEN prompt and the earlier warning, but no readable evidence count. These are not used for the number.
- **Benchmark change:** No mechanical change justified. Add the observed 3/10 warning to the research/calibration evidence, preserving the distinction between the game's timer and the benchmark's action budget.

### ch06-03: Does the timer continue after REVIEW EVIDENCE 10/10?

- **Leads/attempt:** Same `gZQ693-umPU` sections, **08:30–13:40** and **24:30–26:40**, plus searches for a post-10/10 warning and alternate crime-unsolved recordings. Alternate metadata candidates included `lwMdKKCN47k` (all sequences/100% flowchart), `I2PUsq8ptHA` (100% flowchart), `_buqie7q73o` (Leave The Crime Scene) and `qm3q0b_dkqE` (unsolved outcomes). None of their returned descriptions established deliberate continued examination after 10/10, so their titles were not counted as proof and their video was not downloaded.
- **Reading:** The first inspected route shows Hank's departure warning around 11:45 and the chart's CRIME UNSOLVED outcome around 12:55. The later route explicitly has **only 3/10** at its warning (above). Neither demonstrates the required completed-evidence condition. The chart frame shows OUT OF TIME / HANK ENDS INVESTIGATION feeding CRIME UNSOLVED, but does not show whether the timer is disabled at 10/10.
- **Verdict:** **Not settled.** A pre-10/10 warning is not evidence that the same warning remains enabled after 10/10. A successful report made promptly after completion would not disprove it either.
- **Frame saved:** `../video-evidence/ch06/ch06-03-gZQ693-umPU-12-55.png` (chart for the incomplete investigation); also the 3/10 and warning frames cited under ch06-02.
- **Benchmark change:** None. Still needs a controlled wait after 10/10, or an uninterrupted recording doing that.

## 07 · Stormy Night

### ch07-17: Take the gun after reasoning with Todd downstairs

- **Lead:** [MiKeYROG / Sag903, Chapter 07 Stormy Night (All Endings)](https://youtu.be/k5aILBAEewM), id `k5aILBAEewM`. Two useful description markers: **17:20 “Reason with Todd, Todd broke Kara downstairs”** and **28:45 “Kara shot Todd.”** The second marker unexpectedly contains the exact reasoning-plus-gun route. Downloaded **17:00–20:40** and **28:25–30:30**.
- **Reading, decisive route:** At **28:55**, Kara says **“Todd, please, I know you're angry, but–”** downstairs. Todd rejects her intervention, strikes her, and she is getting up at **29:15**. She then climbs the stairs (about 29:25), enters Todd's bedroom, and opens his bedside drawer. At **29:37**, Kara is visibly holding the pistol over the open drawer. She leaves that bedroom and only then enters Alice's room (about 29:45–29:50); Todd is already inside with Alice. Thus the gun pickup follows downstairs reasoning and its knockdown in the same continuous route, before entering Alice's room.
- **Verdict:** **Settled: yes.** The route is directly reachable. This supports the benchmark's K03/K03r → K04 routing. The video establishes the calm wording of the downstairs exchange; it is not a separate observed test of every downstairs dialogue variant.
- **Frames saved, decisive route:** `../video-evidence/ch07/ch07-17-k5aILBAEewM-28-55.png` (reasoning line), `-29-15.png` (recovering from the strike), `-29-37.png` (gun in hands), `-29-38.png` (subsequent close-up in Todd's bedroom; same prefix throughout).
- **Other route read:** At **18:20**, the downstairs menu has CALM / DETERMINED / UNDERSTANDING; the player selects DETERMINED in the surrounding sequence. Kara is knocked down and regains control by the stairs (**18:50**), then goes toward Alice's door (**19:00**). That route does not attempt the gun and alone would have left the question open. Frames: `ch07-17-k5aILBAEewM-18-20.png`, `-18-50.png`, `-19-00.png` in the same ch07 evidence folder. The shorter CINEMATIC GAMING compilation `WtdVMW04fPo` was found as another search candidate; only its metadata was fetched, since the operator's recording supplied the needed branch.
- **Benchmark change:** None. Keep gun pickup available after downstairs reasoning; do not redirect the whole route to K04a on the basis of the blurry overview.

## Benchmark changes implied by settled readings

| Conflict | Scene or rule | From | To |
|---|---|---|---|
| ch05-08 | M01f / `painterActivity` | Only chess, books or piano offered | Add waiting / doing nothing, set `'none'`, then use the existing speech/studio continuation; no invented precise idle timer |
| ch06-02 | Partners timer/action-budget research | No video-measured evidence count at the warning | Record **3/10** in the inspected investigation; keep **13 + 5 actions** explicitly calibrated, with no mechanical threshold change inferred |
| ch07-17 | K03/K03r → K04 | Gun pickup available after downstairs reasoning | Retain; directly confirmed by the 28:55 → 29:37 sequence |

No change is implied yet for ch04-10 or ch06-03. No commits were made; CONFLICTS.md, SOURCES.md, benchmark/, atlas, recaps, tests and src were not edited by this reader.
