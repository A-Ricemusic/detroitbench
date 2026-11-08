# DetroitBench · conflicts · what only the game can settle

_Updated 2026-11-08. Story 1.9.6, 25 runs published. Nine conflicts settled from video frames (see docs/research/video-leads/readings-ch01-16.md and the frames in docs/research/video-evidence/)._

Replaces the 1,595-line dump of the same date. Every line of that dump was sorted by a source check into four bins: settled from a cited source, a documented simplification, wording only, or a question only the operator can answer in game. Only the last bin is listed below. The per-item rationale, the merged duplicates and the citations are in `docs/research/triage/chNN.json` (one file per chapter) and the short summaries in `chNN.md`; the method is in `triage/BRIEF.md`.

## Result of the triage

| Bin | Items | What it means |
|---|---|---|
| Settled from a source | 427 | A flowchart image, the game's text or the wiki answers it; where the benchmark disagreed, a fix was recorded (see below) |
| Documented simplification | 176 | A cut line, an idle comment, a collapsed free-roam order or similar; the sources do not contradict it |
| Wording only | 82 | Cannot be settled by reading but changes no option, arrow, gate or ending |
| Needs the game | 105 | Listed below, 90 after merging cross-chapter duplicates |

## What the sources are worth

From the four cases settled in game so far (SOURCES.md, Reliability log) and the source comparison during the triage:

- **The in-game flowcharts** are the game's own output, photographed from the Chapters screen, so they are correct by definition: every node, its name, its order and every ending is exactly what happens in the game, event for event. If any other source disagrees with the chart, the chart wins. What the chart does not show is numbers: how far public opinion, instability or a relationship moves. Copies of all 32 charts live in docs/flowcharts/.
- **The game's own text (detroitbecometext templates and en.json)** was right on every prompt label, option and unlock condition tested. Its stat arrows are right on ordinary dialogue and were wrong both times they sat on a death or failure outcome (SACRIFICE SELF and CONVINCE in The Hostage), where the wiki's ending-level page was right.
- **The wiki** is reliable for its stat pages and published numbers (the Hostage probability table, Alice reaching Trusted after eight increases) and unreliable for unlock prose (both of its TALK TO HOSTAGE conditions were wrong).
- **PowerPyx** is silent on most arrows. Where it disagrees with the wiki on a number (GIVE UP stress in the Interrogation, when Hank shoots on the Bridge) the benchmark follows the wiki and the question stays on the list below.
- **Nobody publishes the real numbers.** The size of a large arrow, the width of a relationship level and the deviancy threshold are estimates (benchmark/scales.mjs lists each hypothesis and what reading would falsify it). Community posts contradict each other on all three. Only a gauge watched in game settles them, which is why Partners is the most valuable single replay.

## Fixes made from the triage

Applied on 2026-11-07 as story 1.9.2 (496 tests green; both published runs still replay because each fix that would have changed their recorded path is switched on by a field their embedded story lacks). Rationale per entry in `docs/research/triage/`.

| Entry | Ch | Where | Change | Source |
|---|---|---|---|---|
| ch01-02 | 1 | C02i, C03d | Father's body (+3) and his tablet (+7) are two separate actions; POSSIBLE CAUSE needs the tablet | Transcript |
| ch01-06 | 1 | C04c | The leap has no risk roll | PowerPyx endings |
| ch01-07 | 1 | hostage() | Staying back ends on "Connor failed to reach deviant in time"; the invented seventh ending is gone | PowerPyx, en.json, wiki |
| ch01-17 | 1 | C03a | The −15% helicopter fly-by applies on stepping out, not after the second topic round | Transcript |
| ch01.md | 1 | C02b | Allen says nothing in his second round | Transcript |
| ch03-01 | 3 | M00f | Both protester risks removed; the route alone decides | Transcript outranks the journal |
| ch04-20 | 4 | K01 | Alice "looks about nine" | Wiki |
| ch04.md | 4 | K01g, K01g2, ch04.mjs | Four room-talk menus; LEAVE ALONE only in the fourth; the key after it | Transcript |
| ch06-01 | 6 | C05h | Flyer and backyard are not evidence, the statue is; all ten required | Transcript counters |
| ch09-11 | 9 | ch09.mjs | Each stress change shows the percentage and band; the LED scan reads 35% | Game shows the meter |
| ch08.md | 32 | BF13 | "Carl died recently" keys on the Broken ending | Template |
| ch10-22 | 32 | ch32.mjs kcRalph | Ralph in the camp needs only "met Ralph in Fugitives"; wiki conflict recorded | Template |
| ch11-02 | 11 | M03g | The dead android's regulator no longer requires sparing her | PowerPyx |
| ch12.md | 12 | ch12.mjs | "Intervened" means sent back to its cell; Gavin's line keys on Hank drawing | Template |
| ch13-15 | 13 | K09q5 | [CHECK GUN] also needs the second REFUSE | Wiki, PowerPyx readers |
| ch15-21 | 15 | C10 | CHASE DEVIANT listed first | Chart and template order |
| ch17.md | 17 | ch17.mjs, K12 | The chase report and "Androids Alter Brain" need a freeway ending, not any pursuit | PowerPyx, wiki |
| ch20-01 | 29 | ch29.mjs tracisShot | A won fight followed by shooting counts as shooting the Tracis | Template, PowerPyx |
| ch22.md | 22 | ch22.mjs seenRa9 | Only Connor's rA9 clues unlock his rA9 answer | Template lock |
| ch23-19 | 23 | M13 | FLEE listed first | Template, chart |
| ch25.md | 25 | ch25.mjs | A qualitative cue after each rise in the officer's suspicion | Game shows the meter |
| ch26.md | 26 | ch26.mjs, CP05 | One rule for wiki-only arrows; Jericho −1 on GET SPOTTED BY DRONE | Wiki relationship list |
| ch29-10 | 29 | C20 | Map link: risk and failure branch removed; UNABLE TO LINK only via timeout | PowerPyx |
| ch29.md | 29 | C20t | "You lied… I trusted you" only after Snipers shot deviant | Template |
| ch30-10 | 30 | ch30.mjs | Markus dead in the hold: the ship is not blown up | Chart, wiki |
| ch30.md | 30 | ch30.mjs | A machine Connor confronts a returning ousted Markus in the control room | Template |

Not applied, each waiting on a question below: ch13 K09q5 after sitting at once, ch28 conversion arrow, ch31 Hank question, ch32 rooftop LEAVE. Not applied on purpose: ch10 gift gating (only conflicting reader comments), ch20 no-input policy (design, not a source error), ch24 unused state key (removing it would break replay).

## Replays worth doing, in order

1. **Partners (chapter 6): done.** Two replays on 2026-11-07 settled the spill (−3), the drink (+2), the single reconstruction arrow, no arrow on finding the deviant, and that Amanda does not appear. Story 1.9.3 carries the result. Still open from this chapter: Run C in the task page (the slow evidence pass, a wrong answer on purpose, examining after 10/10).
2. **The Interrogation and Waiting for Hank (chapters 9 and 12).** The stress meter is a visible percentage; read it after PROBE, each PRESSURE and GIVE UP (wiki −20 versus PowerPyx −5). Continue Hank from the Run B save: the arrow at which the header first reads WARM says whether Neutral is three wide or five. Amanda's first arrow in Waiting for Hank tests her scale.
3. Then the chapters with the most open questions: Capitol Park (10), Freedom March (9), Zlatko (8), Midnight Train (6), Last Chance, Connor (6), Crossroads (6).

## Settled since the triage

- **ch06-13**: No: a wrong report answer is removed when the question repeats (video, MiKeYROG gZQ693-umPU; frame in video-evidence/ch06). Fixed in story 1.9.8
- **ch07-21**: No REFUSE / ACCEPT prompt before the fight after FACE TODD (video, MiKeYROG k5aILBAEewM 1:15:25). Benchmark already right
- **ch09-03**: The COMFORT round is picked once (video, MiKeYROG OqQHtFfZvgk 16:13). Benchmark already right
- **ch09-04**: About −5: GIVE UP after PRESSURE took stress 73% → 68% and 21% → 16% (video, OqQHtFfZvgk 27:44 and 33:13). PowerPyx right, wiki −20 wrong. Fixed in story 1.9.8
- **ch10-07**: Two small Alice ups for sleeping beside her at the motel, the second showing TRUSTED (video, DanaDuchy D-nrWXiEsVo 20:39 and 20:53). Fixed in story 1.9.8
- **ch10-13**: Yes, one small Alice up when she is given the toy (video, DanaDuchy D-nrWXiEsVo 20:13). Fixed in story 1.9.8
- **ch13-09**: GO: instability down and Hank down; GIVE UP: instability up and Hank up, all small (video, MiKeYROG AH-zJSO_DNo 55:39). Benchmark already right
- **ch13-13**: Yes, a small Hank down after the wait-in-the-car reply (video, ScorpionTank BBXCrNx-ocU). Benchmark already right
- **ch16-05**: Yes, a small Jericho up when Markus proposes the raid to Simon, alongside North and Simon (video, ScorpionTank y50ZjZWX0gU 11:45). Fixed in story 1.9.8
- **ch04-01**: No key after the dishes alone; Alice stays Distant (operator, 2026-11-07). The key needs two points, as the benchmark has it
- **ch04-08**: The window cannot be skipped; ventilating is part of tidying the room (operator, 2026-11-07). Fixed in story 1.9.5
- **ch03-02**: INDIFFERENT in the Shades of Color header after saving the wounded cop (operator, 2026-11-07); H9 holds for the first step
- **ch06-21**: Tense (the spill is worth three points, Tense is three wide; operator, two replays 2026-11-07)
- **ch06-09**: No arrow shown (operator, both replays); the wiki claim is kept as unobserved
- Story 1.9.4 (2026-11-07): the Fugitives street hub was rebuilt after two Haiku runs stopped there believing it looped; this was a benchmark defect, not an open question, and is recorded in the ch10 recap.

## Conflicts the sources cannot settle, by chapter

Each question is one yes/no or one number. In brackets: what the answer changes. Where the benchmark has already picked an answer, the question says so, and a "no" means the benchmark must change.


### 04 · A New Home · 1

- [ ] **ch04-10** [which buttons the model is offered] Could you kneel to talk to Alice with both bedrooms done but the bathroom not cleaned and without looking at the Alice in Wonderland book or her shelf? _(PowerPyx's walkthrough (above the wiki) requires the bathroom, the book and the shelf. The transcript requires only both bedrooms, and a PowerPyx reader's recipe skips the bathroom and the book. If the book is required, every run gets its +1, which moves the key threshold. This can be tested in the same replay as ch04-08)_

### 05 · The Painter · 1

- [ ] **ch05-08** [which buttons the model is offered] At FIND SOMETHING TO DO, if you touch neither the chessboard, the books nor the piano and just wait, does Carl finish breakfast, give his 'One day, I won't be here…' speech and go to the studio (yes/no)? _(wiki transcript has a 'Don’t Find Something To Do' tab ('Carl finishes his breakfast.' then the same speech) and the wiki says 'Markus can just do nothing', but the flowchart (painter-3.jpg) draws no line from FIND SOMETHING TO DO to TAKE CARL TO THE STUDIO that bypasses the activity group. If yes: add a fourth M01f option (sets painterActivity 'none'); ch31 M26x already offers none of the three pastimes when it is absent)_

### 06 · Partners · 2

- [ ] **ch06-02** [a number] On an unhurried first pass, how many of the ten REVIEW EVIDENCE pieces had you found when Hank first said 'All right… I'm outta here'? (a number, or 'never' if you finished first) _(PowerPyx 'approximately five minutes' and transcript 'After five minutes' are real time; the 13 + 5 action budget is an unsourced calibration)_
- [ ] **ch06-03** [which ending] After REVIEW EVIDENCE 10/10, if you keep examining things instead of going to Hank, does Hank ever announce he is leaving (yes/no)? _(transcript splits into 'Know What Happened' and the five-minute tab but never says whether the timer keeps running; template TIME unlock is unconditioned)_

### 07 · Stormy Night · 1

- [ ] **ch07-17** [which buttons the model is offered] After REASON WITH TODD downstairs (Todd knocks Kara down and goes up), could Kara still go into Todd's bedroom and take the gun before entering Alice's room (yes/no)? _(the blurry overview seems to draw TAKE GUN's inputs from GO UPSTAIRS, TODD SHOVES KARA UPSTAIRS and TODD TAKES ALICE TO HER ROOM only; PowerPyx lists Take Gun under the Reason-with-Todd branch; template silent. Benchmark offers it (K03 options 1-2 and K03r → K04). If no: route them to K04a)_

### 09 · The Interrogation · 3

- [ ] **ch09-01** [which buttons the model is offered] Under PRESSURE IT, did the android ever confess before you had pressed PRESSURE four times (yes/no)? _(Template prints PRESSURE IT as one speech with a nested GIVE UP and no press count; wiki only says what happens after 'all 4 times'; PowerPyx says he talks 'at the end of any approach' above 50%. No source says whether an earlier press can end the approach. The benchmark always offers all four prompts)_
- [ ] **ch09-14** [which ending] After pressuring him without getting a confession, if you INTERVENE once and then GIVE UP, does the android shoot Connor (yes/no)? _(PowerPyx: 'Choosing GIVE UP at any time will cause ... it will shoot itself', but no source tests the shoot-Connor condition after an INTERVENE. en.json has a GIVE UP label only for the third prompt (INSISTCHOICE.CEDE); CHOICEGROUP01 and ANDROIDSTRUGGLE have only INTERVENE, so the first two may be single-button prompts)_
- [ ] **ch09-16** [a stat arrow] After a successful memory probe where Connor survived (DO NOTHING at the self-destruct), did Amanda in the Zen Garden next chapter congratulate Connor (arrow up) or criticise him (arrow down)? _(Chapter 12 template splits 'Got a confession, without dying' (Amanda LargeUp) from 'found the deviant but didn't get a confession' (SmallDown); the probe's 'CONFESSION UNNECESSARY' fits neither label. Benchmark treats it as no confession (-1))_

### 10 · Fugitives · 3

- [ ] **ch10-18** [a stat arrow] In Zlatko, did the TV report on Kara robbing the store play when she had got the money only through Alice's can diversion, with no gun (yes/no)? _(Zlatko template: 'Kara robbed the supermarket ... in her android uniform' ARROW PublicOpinion SmallDown, without naming the method. Benchmark counts the diversion, the hold-up and a gun drawn when caught (even without the money), but not CONVINCE; CONVINCE and gun-without-money are secondary unknowns)_
- [ ] **ch10-24** [what unlocks] Could Kara pick up the pliers on the parking-lot generator before she had looked at the squat's fence (yes/no)? _(PowerPyx and a commenter say only the store's wire cutters need the fence checked first; the chart draws CHECK SQUAT before the single TAKE WIRE CUTTERS node. Benchmark lets her take the pliers any time)_
- [ ] **ch10-34** [which buttons the model is offered] Could Kara settle into a shelter (for example the abandoned car) without ever meeting the trash-collector android (yes/no)? _(PowerPyx says the scene is forced 'at some point' but not before shelters; On the Run's lines ('That android yesterday… he gave me an address') assume it always happened. Benchmark lets Kara commit to a shelter first)_

### 11 · From the Dead · 1

- [ ] **ch11-05** [which buttons the model is offered] After Markus had already fitted both the new eye and the new audio processor, could the crawling android still grab him and beg to die (yes/no)? _(Wiki: must happen 'before replacing Markus' damaged parts'; PowerPyx's own route meets him after the eye; commenters disagree (audio first only; eye and audio both first; 'walked over him like 20 times'). Benchmark always plays him on the way to the middle, at any point)_

### 13 · On the Run · 5

- [ ] **ch13-01** [which buttons the model is offered] As Connor searching the squat (Ralph kept quiet), could you walk out on your own before Hank ordered you out, and did that unlock a LEAVE THE SQUAT node? (yes/no) _(chart crop inv-zoom.png shows only a red padlock and '[...]' to the right of the hub; en.json has MENU.FLOWCHART.04K.SQUAT.C.LEAVE = LEAVE THE SQUAT in the Connor squat group, but no source shows it is reachable; PowerPyx commenters (Jun–Jul 2018) never unlocked it and one says it was removed by a patch. Benchmark offers it as C09q option 6)_
- [ ] **ch13-16** [which buttons the model is offered] When Kara agreed to sit at once (no refusal), did the WORRIED / EXPLAIN / AGREE prompt still appear, or did Ralph go straight to 'That's better…'? (shown / not shown) _(chart: AGREE TO SIT goes straight to SIT AT THE TABLE while REFUSE TO SIT passes RALPH THREATENS ALICE; the prompt's lines ('You're not gonna hurt her, are you?', 'Okay. We'll… eat together') answer a threat; the template lists the prompt unnested. Benchmark K09q5 always shows it)_
- [ ] **ch13-18** [which buttons the model is offered] At Ralph's table, after choosing BLUFF ('We're going to stand up now…'), did the menu come back, or did Ralph apologise and let them go? (menu back / apologised) _(template: BLUFF gets 'No… you're not going to leave. Not until Ralph says so.' (no apology), FAMILY and INSIST end with 'Then let us go.'; PowerPyx: 'Try to Convince Ralph: Press BLUFF'. Labels and THREATEN's knife/gun variants are settled by the template; benchmark K09q7–K09q9 re-asks after BLUFF)_
- [ ] **ch13-29** [which buttons the model is offered] In the motel, could Kara go to the TV without drawing the bath, so that she never cut her hair or removed her LED? (yes/no) _(the chart draws an edge from TALK TO ALICE straight to EXPLORE MOTEL ROOM (wiki list 'Go directly to Explore Motel Room'), but the wiki chapter text says the motel Kara 'still needs to cut her hair' (line 176) and the template plays 'You're pretty like that' before the TV; a PowerPyx commenter (2018-07-26) asked the same and got no answer. Benchmark K09m allows CHANGE CHANNEL without the bath)_
- [ ] **ch13-36** [what unlocks] If Kara threatened Ralph with the gun in Fugitives but was kind at the table in On the Run, did Ralph give her away to Connor ('She ran out the back door!')? (yes/no) _(template variant reads only 'Kara threatened Ralph'; PowerPyx: 'If Kara threatened Ralph with her Gun a few seconds back'; wiki Kara line 90: 'if Kara had threatened Ralph at any point'. Benchmark uses only the table THREATEN)_

### 14 · Jericho · 1

- [ ] **ch14-05** [wording only] In a run where Connor stood still and Kara & Alice VANISHED in On the Run, which cover was on the Ferndale bench in Jericho: 'Android on the Run!' or 'Fortune Teller'? _(wiki Android_on_the_Run! line 36: 'Only appears if Kara and Alice were pursued by Connor'; PowerPyx text: 'she was seen by police and ran across the highway'; PowerPyx reader Hadley (2023-09-12, asks for confirmation) puts VANISHED and DIED ON THE HIGHWAY under Fortune Teller. The same flag drives Zlatko's chase report (public opinion down), so the answer also fixes an arrow. Benchmark: any pursuit sets chase → Android on the Run!. The died case needs no answer for Zlatko (Kara's story is over) and only changes a magazine cover)_

### 15 · The Nest · 4

- [ ] **ch15-10** [a stat arrow] In Russian Roulette's Zen Garden, after Rupert got away in The Nest (Carlos's android found in Partners), did Amanda's 'A pity you didn't manage to capture it' show an Amanda-down arrow? (yes/no) _(the ch18 template prints the line with no arrow (benchmark ch18.mjs notCaughtPartnersFound: 0); wiki Russian_Roulette and Relationship_Stat give small down. It is a mission-failure arrow, where the reliability log says the wiki has been right against the template. The other half (caught: large up, then small down for the suicide, shown separately) is settled by the template and built)_
- [ ] **ch15-12** [which ending] At the ledge, if you pressed neither SAVE HANK nor CHASE DEVIANT, which ending did you get: RUPERT COMMITTED SUICIDE or RUPERT GOT AWAY? _(the wiki gives only the arrows (Hank and instability large down ×2, lines 77/86); the template has no timeout branch; no source names the ending. Benchmark option 2 applies −4/−4 and sends it to RUPERT COMMITTED SUICIDE (which also decides Rupert's body in Last Chance and Amanda's reaction))_
- [ ] **ch15-14** [what unlocks] Could you look up from the chair and find Rupert after reconstructing only the bird cage, without having done the stool reconstruction or examined the LED in the sink? (yes/no) _(PowerPyx says the cage reconstruction shows 'the android has climbed up into the ceiling' but lists the stool and the LED as steps too; the chart only hangs INVESTIGATE STOOL off SEE RA9 REFERENCE; HUD objectives (CONFIRM SUSPECT IS DEVIANT, SUSPECT IS STILL HERE) do not say which are required. Benchmark needs only the cage reconstruction)_
- [ ] **ch15-18** [which buttons the model is offered] If The Nest ended RUPERT NOT FOUND (Hank and Connor left the apartment), could Connor spot Rupert in Jericho in Crossroads? (yes/no) _(Crossroads: 'Spot Rupert (only available if he escaped in The Nest)'; for a Connor death the wiki Connor page says 'Rupert escapes', so that case is settled (benchmark sets nestRupert 'escaped'); for NOT FOUND no source says. Benchmark sets nestRupert 'not found', so ch30 does not offer the clue)_

### 16 · Time to Decide · 1

- [ ] **ch16-03** [a number] After talking to North and choosing YOU, did her gauge read below Neutral (for example Resentful) before you went to Simon? (below Neutral / Neutral) _(arrows agree (template and wiki: talk up, YOU down, Simon scene up), but Relationship_Stat line 306 says the Simon scene makes her rise 'to Neutral' if YOU was picked, which the benchmark's equal step sizes cannot produce (benchmark: +1 −1 = Neutral before Simon). The answer calibrates step size or band width, which decides the North label the model sees from chapter 19)_

### 17 · Zlatko · 8

- [ ] **ch17-01** [a stat arrow] On a run where Kara robbed the store in her uniform (Fugitives) AND was chased by Connor (On the Run), did Zlatko's TV show both news reports (two public-opinion down arrows) or only one? _(template puts the chase report and the robbery reports in two separate condition groups (reads as both); wiki 'three different reports, depending on Kara's previous actions' (reads as one); benchmark inputs.report plays only the chase report (one -1))_
- [ ] **ch17-02** [which ending] After SET FIRE in the main room, could Kara still get spotted/chased (or killed), or did the game always cut straight to the stairs and the yard? _(BURNING DOWN THE HOUSE has no visible outgoing edge in detroit-zlatko-alice-found-branch.jpg; house page says fire 'force[s] everyone outside', but the Polar Bear page says 'sets fire to the house and isn't detected' and the string table has X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.1-4 ('Oh, shit! It set the house on fire! Luther! Grab them!') under a GAMEOVER key; benchmark K13 opt 3 / K13a opt 1 have no risk)_
- [ ] **ch17-03** [which buttons the model is offered] From the upstairs corridor (after the bedroom), can Kara skip the bathroom and run straight down the stairs, and if so, was there a separate prompt or did it just happen by walking past the bathroom door? _(chart image draws a line from GO THROUGH CORRIDOR up to the top bus toward KARA REACHES THE STAIRS and the wiki lists 'Go Through Corridor > Kara & Alice Escape to the Yard', but PowerPyx only describes the bathroom route or GET SPOTTED; benchmark K13c option 1 offers it at risk 0.3)_
- [ ] **ch17-04** [what unlocks] On a reset run where Kara robbed the store but was never chased by Connor, did switching on the big-room TV count as a memory (SEE NEWS FLASH OF ESCAPE)? _(wiki: 'If Kara either robbed the supermarket in Fugitives or ran from the police in On the Run'; PowerPyx: 'Only available, if escaped via Freeway in On the Run'; benchmark counts any report (house(): TV is a memory whenever inputs.report is non-null))_
- [ ] **ch17-05** [a stat arrow] If Kara got the money by USE ALICE AS A DIVERSION > STEAL DISCREETLY (no gun), did Zlatko's TV still show a supermarket-robbery report? _(template conditions say only 'Kara robbed the supermarket'; both broadcast scripts say 'held up at gunpoint'; Nathan_Clark page (ch10 note) says after a discreet theft he only runs outside; benchmark: ch10 sets ch10RobberyNews only on the gun routes (ch10.mjs lines 249, 258), so a uniform theft gives no report and no -1)_
- [ ] **ch17-06** [what unlocks] On a reset run where Kara stayed in the squat but never asked Ralph about the symbols he was carving, did the storage-room corner still give the rA9 memory? _(wiki: 'If Kara saw Ralph carve the symbols'; PowerPyx and GamerGuides: 'Only available, if slept in Squat'; benchmark reads ch10RalphCarving, which ch10 sets only on the ralphTalk button (ch10.mjs:279, 298))_
- [ ] **ch17-07** [what unlocks] On a reset run, did the book on the big-room chair (or the pipe in the storage room) give a memory even though Kara never looked at Alice's book (or never re-washed Todd's clothes) in A New Home? _(PowerPyx marks 'Only available' conditions on four memories but none on these two; the wiki gates them on A New Home; benchmark follows the wiki (upstairs.book, downstairs.rewash))_
- [ ] **ch17-08** [wording only] When Zlatko shot Kara in the bathroom or storage room, did the scene show Alice being taken or killed, or was she left unseen? _(Alice page covers only the reset and timeout endings ('presumably killed or experimented on'); no source covers the shotgun endings; benchmark sets alice=false in spotted(), which only changes report wording because Kara's storyline ends)_

### 18 · Russian Roulette · 2

- [ ] **ch18-01** [a stat arrow] On a run where Rupert got away in The Nest (or Connor saved Hank) and Connor survived, what Amanda arrow showed at the start of the garden walk: none, small down, or large down? And had Connor found Ortiz's android in Partners on that run? _(template (transcript.txt lines 13-35) gives no arrow when Partners succeeded and only LargeDown when both failed; the wiki chapter page line 62 ('Failure to catch Rupert in The Nest (Connor didn't die) down') and Relationship Stat give a small down, possibly stacked on the large down; the reliability log says the template's arrows on failure outcomes were wrong twice. Benchmark C11z: 0 or -2)_
- [ ] **ch18-02** [what unlocks] While Hank was getting dressed, after Connor looked at the revolver on the kitchen floor, could he still go and look at Cole's photo (or anything else) before Hank came out? _(PowerPyx: 'keep the gun for last, checking it will end the mission'; wiki: the photo 'will trigger Hank is Ready, so do this last'; a PowerPyx reader: 'I've been able to check other things after checking Hank's gun … a combination of both'. Benchmark C11m ends the wait on the gun, so a model that checks the gun first loses knowsCole (The Bridge, Night of the Soul, the Tower))_

### 19 · Spare Parts · 3

- [ ] **ch19-01** [a stat arrow] When Markus freed the three androids in the crate (FREE THEM), did a Jericho arrow appear along with the North, Simon and Josh arrows? _(template gives North/Simon/Josh only on the drone, FREE THEM and ACCEPT although it tags Jericho elsewhere in the chapter; wiki (Jericho list lines 100-104) and PowerPyx ('North▲, Jericho▲, Josh▲, Simon▲' on freeing) add Jericho up/down; the reliability log has the template wrong twice on arrows. One answer settles all three moments. Benchmark applies no Jericho arrow (up to +3/-1 Jericho at stake))_
- [ ] **ch19-02** [which ending] After the guards raised the alarm in the control room, did the group ever get over the fence without the dogs catching John? _(lines at the SUSTAIN DAMAGE junction cross in sp-7.jpg; the wiki nests 'Back to Jericho > Group Failed Their Mission OR Group Returned With Full Bags' under Fail to Avoid Guards > Run to Fence; benchmark gives only dogs (M05n) or damage, so John always dies after a control-room alarm)_
- [ ] **ch19-03** [which ending] After LEAVE at the truck-key question (no alarm), could Markus still be too slow at the fence and get damaged? _(the template files the fence 'Take too much time' under '## Was detected by the guards - Running away'; the chart's lower RUN TO FENCE (fed by both the alarm and LEAVE) has an uncertain edge to SUSTAIN DAMAGE REACHING THE FENCE; benchmark rolls 0.08 for failure after LEAVE)_

### 21 · The Pirates’ Cove · 1

- [ ] **ch21-01** [a stat arrow] In the car, with Zlatko's house NOT burned, did a Public Opinion ↓ popup appear at any point while you watched the TV news (yes/no)? _(Template (dbt21 'Watch the news') puts its only PublicOpinion SmallDown inside CONDITION GROUP 'IF Kara set the house on fire in Zlatko'; the wiki chapter page ('Turning on news {{Icon|down}}') and Public_Opinion ('Watching the news in the car at the start of The Pirates' Cove') both add a second ↓. Other chapters' templates (ch12, ch13, ch17) do mark TV-news arrows, so an omission here is plausible but unproven. The second half of the question is settled: the fourth (fire) report exists only with the fire (template condition group; Public_Opinion '(Only if Kara set fire to Zlatko's mansion)'), as built in K14b option 1)_

### 22 · The Bridge · 1

- [ ] **ch22-01** [a stat arrow] When Hank shot Connor on the bridge, did a Software Instability ↓ popup appear (yes/no)? _(Template has no shooting branch; the wiki Software_Instability page says 'Dying reduces software instability no matter if Connor dies…' but its decrease list names deaths in The Hostage, The Interrogation, On the Run, The Nest and Public Enemy and not The Bridge; SOURCES §13 lists conflicting community claims on death SI. The benchmark applies none (C13o, deathEffect {hankTrust:-1}))_

### 23 · The Stratford Tower · 3

- [ ] **ch23-01** [which ending] On a run with ASSAULT > shoot the guard on the phone (Simon is shot), the server door locked and the operator shot (so no SWAT team), did the roof scene 'Simon can't continue' with LEAVE / KILL appear (yes/no)? _(The template nests PROMPT 11 only under SWAT storms the room > Help > Save Simon, and the wiki flowchart says 'Simon Can't Continue - if Simon Saved, otherwise Run to Jump'; but PowerPyx says it 'Triggers if Simon was wounded during the mission. Either you chose the ASSAULT option … and shot the guy on phone or …' (and lists the same path under SIMON WAS LEFT BEHIND), the wiki's own note says 'The only way for Simon to escape is by locking the door, incapacitating both guards and shooting the fleeing reporter', and the Simon page says 'If Simon was injured by SWAT and/or security, he is unable to make the jump off the roof'. Against them, the template's left-guard line is Simon's 'I'm okay… I can keep going.' The benchmark has that Simon jump with the group (THE GROUP ESCAPED), which changes Simon's survival into Public Enemy)_
- [ ] **ch23-02** [a stat arrow] With nobody killed, BEGIN CALMLY and END DETERMINEDLY: did Public Opinion go up at Media Reacts (yes/no)? (A 'no' means the ending drives the tone line, as built.) _(Template tone condition reads 'Chose CALM and didn't kill anyone' (CALM is the opening's label, PROMPT 5) and 'Chose DETERMINED or killed humans' (a label on both PROMPT 5 and 9); the wiki chapter page and Public_Opinion tie it to 'the "peaceful" option at the end of the speech'; PowerPyx needs 'the calm start & peaceful ending'. The benchmark keys it on the ending (M12). Worth ±2 public opinion either way)_
- [ ] **ch23-09** [a stat arrow] With the server door unlocked, when you chose DRAW GUN and Markus knocked the employee out himself, did a North ↓ popup appear (yes/no)? _(The template puts ARROW North SmallDown at the top of the whole 'IF: Didn't lock the door' block (before PROMPT 2); the wiki chapter page lists it as 'Forgetting to lock the door and North stuns the employee' and a wiki note says explicitly that if Markus 'incapacitates the employee himself, then his relationship with North will not decrease'. The benchmark applies −1 on all three options (M10e))_

### 24 · Public Enemy · 1

- [ ] **ch24-01** [a stat arrow] In the opening Zen Garden talk, did DETERMINED or COLD show an Amanda ↑, and did TOO FAR show an Amanda ↓ (yes/no for each)? _(The template has no Amanda arrow on DETERMINED, COLD or TOO FAR (dbt PROMPT 2 and 3) while PowerPyx lists per-option popups 'DETERMINED: Amanda▲', 'COLD: Software Instability▼Amanda▲', 'TOO FAR: Amanda▼' and the wiki agrees; PowerPyx matches the template on every other option in this chapter and in The Bridge. The benchmark follows the template (C14z2, C14z3))_

### 25 · Midnight Train · 6

- [ ] **ch25-01** [which ending] With every piece of evidence hidden, coffee made, ALICE and TIRED answered, if you answer DOG to the laundry-room noise, does the officer open the laundry room (yes/no)? _(PowerPyx/GamerGuides give only recipes (hide nothing + DOG = suspicious; hide all + WASHING MACHINE = fooled); officer wiki page says HEARD NOTHING or a timeout sends him in; no source states the meter values. Benchmark (K15w10 rule: weights DOG 2, WIND 1, WASHING MACHINE 0, HEARD NOTHING 3, threshold 3) says no for DOG, yes for HEARD NOTHING)_
- [ ] **ch25-02** [which ending] With no evidence hidden (door opened in time, Luther and Alice upstairs), does WASHING MACHINE still make the officer leave (yes/no)? _(IGN: evidence can be left out 'without the police officer really caring too much'; PowerPyx's suspicious recipe uses DOG. Benchmark: no answer fools him once three or more evidence items are out)_
- [ ] **ch25-03** [a number] In one replay with the meter on screen: does skipping the coffee raise it, and does UPSET (instead of TIRED) raise it (yes/no for each)? _(Template prints Adam's stammer 'The… The androids, they…' unconditionally (so his line never changes), and gives no suspicion data. PowerPyx's suspicious recipe includes 'Don't make him coffee'; the Adam wiki page says nervousness raises suspicion unless dismissed as exhaustion. Benchmark: +1 for no coffee, +1 UPSET, +1 NOT MINE; TALK TO ADAM, REASSURE/THREATEN/CALM and YES/NO have no effect)_
- [ ] **ch25-04** [which ending] With everything else hidden and the laundry-room door left open, does the officer still leave after WASHING MACHINE (yes/no)? _(Chart has SHUT THE DOOR OF LAUNDRY ROOM but no 'policeman sees' node for it; no source states the consequence. Benchmark counts it +1 suspicion at the noise question)_
- [ ] **ch25-05** [a number] Moving deliberately, how many of the hiding actions (cover, blood cupboard, clothes, laundry door, tell Luther, curtain, Adam) can you finish before the officer insists (a number)? _(PowerPyx 'roughly 50 seconds', GamerGuides '50 second timer'; no source gives an action count. Benchmark: six actions, a seventh forces POLICEMAN INSISTS (+1 suspicion))_
- [ ] **ch25-06** [which buttons the model is offered] After TAKE ALICE OUTSIDE (PREVENT ALICE SEEING MARY), can Kara still sit with Alice by the fire and get the INSIST / LET IT GO prompt (yes/no)? _(Only the wiki flowchart list gates it ('Check On Alice - if Let Alice See Mary above'); template marks no gate; PowerPyx lists it unconditionally. Benchmark (K15q) offers it only after STAY)_

### 26 · Capitol Park · 10

- [ ] **ch26-01** [which ending] Take North's Molotov at the pavilion first, then do only peaceful actions until the sirens: is the ending MARKUS LED A VIOLENT RIOT (yes/no)? _(Only PowerPyx commenters (Jd: 75% peaceful meter yet riot; Ravyn Black: 'automatically gets you a riot') say so; the wiki footnote talks only of the 60% meter. Benchmark: TAKE always gives AGGRESSIVE MESSAGE)_
- [ ] **ch26-02** [which buttons the model is offered] Tag one object, then walk to the pavilion: does North still offer the Molotov (yes/no)? _(Wiki Note: 'if enough peaceful actions were chosen prior then North will not offer'; PowerPyx: go there 'first thing… (don't touch other objects yet)'. No count is given. Benchmark withholds it whenever the meter already reads at least 60% peaceful, so one tag withholds it)_
- [ ] **ch26-03** [which ending] If the meter ends about 55% peaceful / 45% violent (no Molotov), which ending plays: PEACEFUL PROTEST, VIOLENT RIOT, or FAILED TO DELIVER? _(Wiki footnote: 'at least 60% on either side' for either message node; FAIL TO SEND needs no action at all (wiki footnote, PowerPyx). Nothing covers a balanced meter after actions. Benchmark counts anything under 60% peaceful as aggressive)_
- [ ] **ch26-04** [a number] With the meter on screen, does FREE ANDROIDS IN SHOP WINDOWS push it toward violent, and does HACK BILLBOARDS (after a peaceful tower speech) push it toward violent (yes/no each)? _(BURN THE PLACE trophy lists 'Free androids' and 'Hijack screen' as violent; wiki Notes say shop windows can stay peaceful and billboards depend on the Stratford speech, and street lights/banner on the current ratio; OVERLOAD ELECTRIC SYSTEM has no source. Benchmark: shop windows, both billboard hacks, lights-off and overload violent; banner and hack lights peaceful)_
- [ ] **ch26-05** [a stat arrow] When the ten minutes run out (RETREAT), do you see Jericho ▼▼ and North ▼ popups (yes/no)? _(Template puts arrows only on Abandon Mission and none on the timeout or 'have to flee' blocks; wiki chapter page, Relationship_Stat ('Any ending of Capitol Park in which Markus flees', incl. 'failed to secure the area before ramming') and PowerPyx give Jericho large down, North down. Reliability log: template missed failure arrows twice before. Benchmark applies the wiki arrows on RETREAT and HAD TO FLEE)_
- [ ] **ch26-06** [a stat arrow] When the drone spots Markus at the alarm junction, is there a Jericho ▼ popup as well as North ▼ (yes/no)? _(Template 'Fail to hide' variant: North SmallDown only; wiki chapter page and Relationship_Stat ('Failing to destroy the drone or being seen by it') add Jericho down. Benchmark: North −1 only)_
- [ ] **ch26-07** [a stat arrow] Destroy the drone first, then deactivate the alarm: does a North ▲ popup appear at the alarm (yes/no)? _(Template's alarm block has arrows only on the Hide / Fail-to-hide variants; wiki 'deactivated the alarm after destroying the drone or hid from it' and Relationship_Stat 'Deactivating the alarm…' say up. Benchmark applies North +1)_
- [ ] **ch26-08** [a stat arrow] Overturn a bench and then a car: do you get two separate North ▲ popups (yes/no), and does freeing the shop-window androids show a Jericho ▲? _(Template has no section for these objects; wiki 'removes a bench, overturns a car, destroys android parking or breaks the glass to free androids' (one line, North up) and 'breaks the glass to free androids' (Jericho up). Benchmark: North +1 per act, Jericho +1 for shop windows)_
- [ ] **ch26-09** [a stat arrow] After FAIL TO SEND A MESSAGE, does the closing news show a public opinion ▲▲ (yes/no)? _(Wiki chapter page ('fails to deliver a message' largeup) and Public_Opinion ('Markus failed to deliver his message') say ▲▲; the template's news block has only pacifist and aggressive variants. Benchmark applies +2)_
- [ ] **ch26-10** [what unlocks] Before deactivating the alarm or destroying the drone, can Markus already break into the site and drive the truck (yes/no)? _(Template's 'Find the truck' opens with 'Looks like the plaza's secure', and commenter CharmedAnt could not take the truck until the drone and alarm were done; but the chart and template both have HAD TO FLEE with 'alarm wasn't deactivated' / 'drone wasn't destroyed' lines. Benchmark allows ramming at any time)_

### 27 · Meet Kamski · 1

- [ ] **ch27-13** [wording only] If Markus fled Capitol Park (no officers scene), does Hank say anything about Chris when Connor arrives with him (yes/no)? _(The template has only 'Chris died' / 'Chris was spared' variants; the chart seems to draw GET OUT OF CAR straight to the merge as well. Benchmark: no news, and no CHRIS walk option on start A)_

### 28 · Freedom March · 9

- [ ] **ch28-01** [which ending] With John not recruited and Simon alive at Neutral, does Simon give his life for Markus after SACRIFICE (yes/no)? _(Template: 'Simon survived in Public Enemy and has a good relationship with Markus' (no level). Simon wiki page 'at least Friend', PowerPyx 'positive (friendly)'; PowerPyx commenters split (one: Neutral is not enough, another: Neutral still sacrificed). Benchmark: Simon must be above Neutral)_
- [ ] **ch28-02** [a stat arrow] After STAND GROUND, choose ATTACK: do you see North ▲, Josh ▼▼ and Simon ▼ popups (yes/no)? _(Wiki lists these three arrows for 'attack after abandon, stand ground or disperse'. Those are exactly the places where the template prints only pointers ('See ATTACK', 'See ATTACK > CHARGE', 'See ATTACK > CONFIRM'), so its silence is weak. Benchmark applies none)_
- [ ] **ch28-03** [a stat arrow] Charge, lose the fight, choose DON'T SHOOT, and John (or Simon) saves Markus: is there a Jericho ▲▲ (and public opinion ▲▲) on top of the loss's Jericho ▼▼ (yes/no)? _(Template's DON'T SHOOT says only 'See SACRIFICE.' (SACRIFICE carries PO and Jericho LargeUp); Relationship_Stat lists the John and Simon sacrifice endings under Jericho large increase. Benchmark applies only the loss's Jericho −2)_
- [ ] **ch28-04** [which buttons the model is offered] After a first STAND GROUND, does choosing ATTACK ask CONFIRM / ABANDON again (yes/no)? _(Template pointers 'See ATTACK' (after STAND GROUND) and 'See ATTACK > CHARGE' (after ABANDON) are ambiguous; 'ATTACK > CHARGE' does not exist. Benchmark goes straight to the fight)_
- [ ] **ch28-05** [which buttons the model is offered] After answering UNDERSTANDING to 'I don't wanna talk about it', does the same prompt come back so you can also pick TRUST (yes/no)? _(PowerPyx's recipe 'NORTH'S PAST > UNDERSTANDING > TRUST' implies two answers; the template shows one prompt. Each answer moves North, so a repeat adds arrows. Benchmark: one answer. The level check is read after the answer's arrow, which matches the template's order)_
- [ ] **ch28-06** [a stat arrow] In the charge, is shoving North clear (Push) an optional prompt that appears on every fight and shows North ▲ when pressed (yes/no)? _(Only the wiki ('Choosing to "push" North during the police fight' ▲) and the string GUI action 'Push'; template silent. Benchmark offers PUSH as a choice with North +1)_
- [ ] **ch28-07** [a stat arrow] Converting only the mall androids, the street androids and the first recruit (no conversions during the march): does the Jericho ▲ still pop (yes/no)? _(Wiki only: 'Converting at least around 10 androids during the Freedom March' ▲; the template is silent and no exact count exists. The benchmark counts every conversion in the chapter with an unsourced group size of 2 and triggers at 10. Those non-march conversions alone reach 10)_
- [ ] **ch28-08** [what unlocks] After a peaceful Capitol Park protest (store freed), is the ANDROID RIOT magazine on the roof, and is EASTERN SPACE RACE there too (yes/no each)? _(Android_Riot wiki: any successful store raid; Eastern Space Race wiki: store freed and violence; PowerPyx saw both only after a violent riot; commenter Rin saw the first after a peaceful one. Benchmark follows the wiki pages)_
- [ ] **ch28-09** [which buttons the model is offered] After a first STAND GROUND, does choosing DISPERSE lead to the police opening fire with CHARGE / STAY / DISPERSE offered (yes/no)? _(The template gives this DISPERSE only lines, with no 'See DISPERSE' pointer. The wiki tree has only Stand Your Ground > Police Fire Unprovoked and Leave > Police Open Fire. Benchmark routes it to POLICE OPEN FIRE like the first DISPERSE)_

### 29 · Last Chance, Connor · 6

- [ ] **ch29-01** [which ending] With Carlos' android dead but Rupert escaped, the Tracis spared, Simon alive and the Stratford deviant escaped, did Fowler's office lead to the evidence room (yes) or straight to decommissioning (no)? _(PowerPyx (pp.txt lines 39/43) counts any deviant body, so Carlos' body alone is sufficient although it opens no route; two PowerPyx readers (Tereza: Simon's memory seen yet 'straight for deactivation') contradict; template and chart are silent on the test)_
- [ ] **ch29-02** [what unlocks] With Hank Hostile and Connor holding Kamski's Jericho key, did Hank hand in his badge and gun in Fowler's office (yes/no)? _(chart (lcc-2.jpg) draws HANK RESIGNS AND LEAVES only off the SUFFICIENT EVIDENCE group; the template files the resignation in Fowler's office before the route split and the Connor wiki (line 124) says Connor talks to Hank on the Kamski route 'unless Hank quit the force'; decides hankResigned for Night of the Soul)_
- [ ] **ch29-03** [which buttons the model is offered] On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)? _(wiki Notes line 159 and a PowerPyx reader ('Connor opens his eyes in the office') say skipped; template and chart (START -> TALK TO AMANDA) show no condition; the reliability log treats wiki prose on gating as a hypothesis)_
- [ ] **ch29-04** [a number] In the evidence archive, about how many minutes passed before OUT OF TIME if you just stood still (upstairs PowerPyx says about 6)? _(no source gives the archive limit (no GUI.TIMER string; IGN only 'a few minutes'); the 12-action budget is the benchmark's calibration)_
- [ ] **ch29-05** [a number] In the archive fight with Gavin, does missing a single QTE prompt lose the fight (yes), or can you miss one or two and still win (no)? _(wiki: failing the first QTE only wounds Connor; PowerPyx: win by pressing '(most of)' the sequences; no prompt count or odds anywhere; risk 0.25 is a calibration)_
- [ ] **ch29-06** [which buttons the model is offered] With the statue map but no Jericho tablet, could you link the map to a reactivated android's memory (e.g. Rupert's) and locate Jericho (yes/no)? _(template has only the tablet link step and PowerPyx names the tablet; the wiki WR400 page (line 40) and readers say a reactivated memory also cross-references; matters only when Rupert's body is present without the diary)_

### 30 · Crossroads · 6

- [ ] **ch30-01** [a number] As Markus in the raid corridors, did the second bullet hit kill him (yes), or did he survive two hits and die on the third (no)? _(wiki text chart '(if already wounded) Soldier Kills Markus' and template 'Soldiers shoot Markus twice' read as two; PowerPyx ('The third bullet kills him'), GamerGuides and three commenters say three; the same counter drives deviant Connor's takeover deaths)_
- [ ] **ch30-02** [which buttons the model is offered] On your most machine-like Connor playthrough, was BECOME A DEVIANT locked (greyed out) in the captain's cabin? _(template lock 'Have enough software instability' and PowerPyx 'high software instability' give no value; the engine's threshold is a calibration)_
- [ ] **ch30-03** [which ending] As an ousted Markus who went back to Jericho while Connor stayed a machine, did Connor confront Markus in the engine control room (the reach-the-gun QTE)? _(wiki text chart sends him to MARKUS IN THE CORRIDOR and the Connor template's hold variant reads 'Markus is alive - Connor finds Markus', but wiki Notes say a machine Connor dies whenever Markus is 'dead or ousted'; the benchmark sets leader North at the cabin, so M24-gun is never offered to a returning exile)_
- [ ] **ch30-04** [what unlocks] After choosing DON'T KISS in Crossroads, was KISS NORTH still offered in Battle for Detroit? _(DON'T KISS is North large down (template) but no source says whether Lover survives it; Battle for Detroit's kiss, Perkins' offer and North taking the bullet key on Lover; the benchmark keeps northLover)_
- [ ] **ch30-05** [what unlocks] With Alice at Neutral (above Distant but below Warm), did choosing DISTANT in Crossroads make Alice walk away when the raid began? _(template lock 'Alice relation is below WARM and choose DISTANT' vs wiki 'never raise it to NEUTRAL'; commenters report it glitched; the benchmark uses the wiki (aliceMax below Neutral))_
- [ ] **ch30-06** [what unlocks] If Kara chose PROTECT ALICE and left Luther in the corridor, did Luther reappear in Battle for Detroit (FIND LUTHER & JERRY)? _(wiki: 'his death is not confirmed'; ch32 template/wiki key on 'Luther is alive' and 'not already with Kara'; the benchmark sets luther=false)_

### 31 · Night of the Soul · 5

- [ ] **ch31-01** [which ending] If a machine Connor survived Crossroads by shooting Markus, did Night of the Soul show Connor with Amanda in the snowy Zen Garden (THIN ICE)? _(template lock 'Connor stayed a machine or died in Crossroads' plus a machine-survivor variant (with Battle for Detroit string keys) vs wiki 'Only available if Connor died during Crossroads' and a PowerPyx reader; Thin Ice is one of the chapter's counted endings)_
- [ ] **ch31-02** [a stat arrow] When Markus chose DON'T TRUST and shot Connor in the church, did a Jericho small-down arrow appear? _(template has no arrow; wiki Relationship_Stat gives Jericho small down; the option ends in Connor's death, where the reliability log found template arrows wrong twice)_
- [ ] **ch31-03** [what unlocks] If Hank resigned in Last Chance, Connor and Connor was then decommissioned there, did Hank still end up dead (HANK COMMITTED SUICIDE on Night of the Soul's chart or Hank absent later)? _(template lock is only 'Hank was hostile ... and resigned'; Hank's House is a Connor scene, so the engine skips it when Connor is gone and Hank stays alive; no source covers the decommissioned case)_
- [ ] **ch31-04** [which buttons the model is offered] After Markus was ousted and chose LEAVE FOREVER in Crossroads, did Night of the Soul still open with Markus at Carl's house or grave? _(wiki: Pay Respects/Welcome Home 'if Markus is still alive' (silent on leaving); the engine blocks Markus scenes once markusActive is false)_
- [ ] **ch31-05** [which buttons the model is offered] With Markus ousted (alive but gone) and Josh alive, was CHECK ON JOSH offered to deviant Connor in the church? _(PowerPyx 'Only if Markus died in Crossroads' vs wiki 'died during Crossroads after saving Josh'; the Connor template has no Josh section; neither covers the ousting)_

### 32 · Battle for Detroit · 5

- [ ] **ch32-01** [which ending] With public opinion at Sympathetic (one below Supportive), did SING or KISS NORTH make Warren say 'Tell them to stand down'? _(template only 'Public opinion is positive'; wiki chapter and Public Opinion pages say Sympathetic, PowerPyx says 'must be supportive' (pp-markus lines 73-82), one reader says Sympathetic works)_
- [ ] **ch32-02** [which ending] When the assault failed with North at Companion (not Lover), did she take shelter in the store with Markus (yes) or get shot (no)? _(template has no condition; PowerPyx 'Lovers or Companion' (line 168) and 'NORTH GETS SHOT: Neutral or lower'; readers at Companion report her shot (lines 280, 446); the benchmark lets Companion through)_
- [ ] **ch32-03** [which ending] When Markus failed the barricade QTE with North at Friend or Companion (not Lover), did North throw herself in front of the bullet? _(template heading 'Fail the QTE and have lover status with North' and PowerPyx say Lover; wiki says Friend or above, and a PowerPyx reader (line 338) says she did it 'even though they were just friends')_
- [ ] **ch32-04** [which buttons the model is offered] With Hank at Friend, was LEAVE (give up the shot) offered on the rooftop without first choosing HANK'S SON and then HANK'S SON (INSIST)? _(template lock is only 'Be friend with Hank'; PowerPyx (pp-connor line 196) and the wiki add 'asked twice about Hank's son', and two readers at Friend never saw it; the benchmark reads Friend before the arrival drop and needs nothing else. HANK'S SON itself has no photo lock in the template)_
- [ ] **ch32-05** [which ending] With Connor still a machine and Markus killed by soldiers or Perkins (not by Connor), and no dirty bomb, did the after-credits scene of Amanda presenting the new RK900 play? _(template lock 'Machine Connor stopped Markus' vs wiki Secret-Endings 'or Markus must die during Battle of Detroit'; the benchmark follows the wiki)_

## Duplicates merged across chapters

- ch10-29 is the same question as ch13-36.
- ch13-37 is the same question as ch14-05.
- ch12-06 is the same question as ch09-16.

## How to answer

Tick the box and write the answer after it, or dictate it in the playthrough journal thread. Each answer goes into the Reliability log in SOURCES.md and, where it changes the benchmark, into the chapter files with a story version bump.
