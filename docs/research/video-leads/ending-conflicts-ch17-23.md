# Ending conflicts: chapters 17–23, targeted follow-up

Research date: 2026-11-08. Research only; no benchmark, tests, conflict registry or source-inventory edits; no commit; no subagents. This follows [research A](ending-conflicts-A.md) and [research B](ending-conflicts-B.md). Scope includes their direct questions **and** attitude questions with ending-threshold consequences: **ch17-01–07, ch19-02–03, ch21-01, ch23-01–02** (12 items). Chapters 18, 20 and 22 have no remaining in-scope question in those reports; ch18-02 was already settled in the preceding video pass.

## Evidence standard and reproducibility

Completed charts decide which branches exist. Actual frames decide what a recorded route did; game strings supply dialogue and labels. Template condition prose is the transcribers’ description, not extracted executable game logic. PowerPyx/wiki/community sources help qualify leads and corroborate observations. An edited compilation cannot establish continuous cross-chapter history. A successful escape cannot measure a failure probability; a visible object cannot by itself prove it counted as a memory.

Working directory: `/Users/pelicannurse/.t3/detroitbench-tools/ending-conflicts/ch17-23/`. It contains query results, video metadata, anonymous yt-dlp segment-download logs, downloaded segments, frame/contact-sheet scripts, fresh raw templates/strings/wiki/PowerPyx responses, and history diffs. `source-audit.md` describes the source review. New frame times are source-video timestamps, with repository filenames following the existing `chNN-ID-video-MM-SS.png` convention. Existing frames are explicitly identified as inherited evidence.

Primary chart references, personally inspected: [Zlatko escape](https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-alice-found-branch.jpg), [Spare Parts control-room/fence](https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-6.jpg), [Stratford roof](https://i.imgur.com/R7665Td.jpeg). Their local READMEs identify the full chart sets. No numeric risk or counter was recovered from game data.

Fresh wiki audit: all four chapter articles and their latest 50 revision headers were retrieved. All four Talk requests returned `missingtitle`. Historical-content fetches through `action=parse&oldid` were refused (403); a fallback `action=query&revids` succeeded. Relevant diffs are saved in `history-diffs.txt`: Pirates’ Cove revision **35332** (2019-10-12) added both opinion-loss claims together, with no test citation; Spare Parts **30319** only adds the steal-key/truck sequence, not evidence of a clean post-alarm fence escape; Zlatko **40096** changes a link, not a memory prerequisite; Stratford **47107** moves unrelated trivia. Revision longevity is not experimental confirmation.

## ch17-01 — Two eligible Zlatko TV stories

**Decisive observation.** On one propagated save, establish an armed store robbery in Kara’s uniform and the subsequent freeway chase. While not leaving the TV, play a complete news cycle, including after the first story ends; count both broadcasts and their opinion popups. Re-activating the TV must be distinguished from two losses on one activation.

**Source cross-check.** The [Zlatko template](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/17-zlatko-chapter-content/zlatko-chapter-content.component.html) has separate conditioned groups for `X0502K.TV.NEWS.PC.X05KWEBB.HIGHWAYNEWS` and `SUPERMARKETROBBER01/02`. Each script ends by moving to other headlines; that does not encode order, mutual exclusion or looping. The [wiki chapter](https://detroit-become-human.fandom.com/wiki/Zlatko) and [Public Opinion](https://detroit-become-human.fandom.com/wiki/Public_Opinion) do not provide the required controlled two-report run.

**Footage hunt.** Targeted searches `robbery-both` and `zlatko-broadcast` found no qualified both-prerequisite run. Inherited `9-WwhtWnSVs` 23:19–23:26 shows uniform-robbery news and an opinion down; its earlier magazine is compatible with a freeway save, but the player leaves the TV. `SojpjnlC9kg` shows only a short chase broadcast. These are not a complete two-report experiment.

**Verdict: not settled; low confidence in exclusivity or multiplicity.** **No change** to `ch17.mjs inputs.report` (freeway precedence, one report). Do not add a second loss from separate template blocks alone.

## ch17-02 — Fire, pursuit and death

**Decisive observation.** Set fire on screen, then follow a continuous route to a lethal upstairs bathroom/storage-room QTE and fail it. Record the resulting shot/death and chart, or show the supposedly lethal input safely completing because of fire. Failing only downstairs inputs tests a different question: the game can already be safe once Kara reaches the stairs.

**Source cross-check.** The chart contains SET FIRE TO HOUSE, GET SPOTTED, CHASE STARTED and two upstairs death endings. `X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE` supplies Zlatko’s fire-discovery dialogue; its `GAMEOVER` namespace does not prove a death branch. [PowerPyx](https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/) and the [GameFAQs route](https://gamefaqs.gamespot.com/ps4/255825-quantic-dream-collection/faqs/75941/chapter-16-zlatko) allow movement after lighting the fire. [Gamepressure](https://www.gamepressure.com/detroit-become-human/zlatko/z8b015) explicitly distinguishes lethal upstairs checks from safe downstairs action.

**Inherited visual evidence, re-inspected.** `9-WwhtWnSVs` 25:35 shows the burning log; 26:20 shows the bathroom pursuit/QTE. `pUhnQ6H68Ck` 14:02–15:08 and `G171egwG5V0` establish fire plus later pursuit, not failed-fire death. New all-QTE footage is evaluated in the footage ledger below.

**Verdict: partially settled; high confidence that fire does not skip all house pursuit; post-fire death unproven.** **Implied routing correction:** K13/K13a SET FIRE currently sets `ch17Route='stairs'` immediately; replace that direct transition with the observed post-fire escape interactions before stairs. Do not assign a new death probability from the existing success examples. Exact routing should follow the additional footage reading, rather than assuming every non-fire hide choice survives the fire.

## ch17-03 — Corridor directly to stairs

**Decisive observation.** Leave the bedroom into the corridor, bypass the bathroom, and reach the stairs. Keep the controls visible to distinguish free walking from a labelled action/QTE and show the consequence of a failed attempt. This must be a no-fire case if the claim is that the bypass is generally available.

**Source cross-check.** The completed chart and [Shacknews chart transcription](https://www.shacknews.com/article/105265/zlatko---detroit-become-human) include corridor → stairs. The template is not a control map. [GamerGuides](https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/zlatko) describes bathroom entry and detection, not the bypass control. The benchmark’s `K13c` risk 0.30 is a calibration, not a measured probability.

**Footage hunt.** New `eq_sVgK8fCQ`, “All QTE Routes and Outcomes,” explicitly advertises Bedroom–Bathroom, Corridor–Rush–Bathroom and Corridor–Bathroom variants. `51yy5rqyd9Y` is another escape-route lead. Exact visual readings are in the ledger below. Inherited `QNuM3gzByaI` and `n8X2MTL1a8M` enter the bathroom and do not answer the skip question.

**Verdict: partially settled; high confidence in the chart edge, low confidence in the exact bypass control.** The new footage supplies labelled transitions and pursuit QTEs, but does not isolate a successful no-bathroom bypass. Keep the chart bypass. Do not present 0.30 as extracted game data or conclude from a failed RUSH that the chart’s direct-stairs edge is absent. **No change** to K13c from this pass.

## ch17-04 — Robbery-only broadcast as a recovery memory

**Decisive observation.** Establish robbery plus no police chase, propagate that save to Zlatko, let Kara be reset, and turn on the TV before recovery is complete. Record an actual memory flash/progress, preferably the selected SEE NEWS FLASH OF ESCAPE chart node. Merely hearing the robbery story after recovery is insufficient.

**Source cross-check.** Wiki says robbery or chase; PowerPyx’s main list says freeway. PowerPyx reader Daniel also reports robbery-or-freeway. A later reader, Giugliu, reports unlocking the memory while the **supermarket-gun** story played, but explicitly says that save also crossed the freeway. That is useful evidence that robbery content can accompany the node; it does not isolate the no-freeway condition. The two broadcast namespaces in the game text contain no executable eligibility predicate.

**Footage hunt.** Targeted robbery-memory searches returned no verified no-chase recovery route. Inherited `9-WwhtWnSVs` 20:01 already has restored memory before the robbery TV at 23:20. Reset titles and recovery-object compilations do not repair that missing antecedent.

**Verdict: not settled; low confidence in necessity of freeway, medium confidence that robbery content is compatible with the memory.** **No change** to `house()` TV memory eligibility through `inputs.report`. Current code already permits robbery-only news; the stricter freeway-only alternative is not demonstrated.

## ch17-05 — Discreet theft and the robbery report

**Decisive observation.** Show USE ALICE AS A DIVERSION → STEAL DISCREETLY without drawing the gun, then carry that history to Zlatko and watch the TV. Prefer no chase, so a chase story cannot mask theft eligibility. If reset, record whether any story also contributes a memory.

**Source cross-check.** `SUPERMARKETROBBER01/02` describe an armed hold-up. Template clothing variants do not say which cash-register theft flags enable them. Neither wiki nor the Fugitives/On the Run text supplies a tested diversion-only news case. The clothing split must not be mistaken for the robbery-method test.

**Footage hunt.** Queries `discreet-news`, `robbery-discreet` and prior `search-theft` leads found Fugitives option demonstrations (`doM7h-6T7hc`, `BiTuFKyp7xk`), not their propagated Zlatko TV. No downloaded TV example establishes diversion-only history.

**Verdict: not settled; low confidence.** **No change** to chapter 10’s `ch10RobberyNews` producer or chapter 17’s report selector. Keep gun robbery → eligible; do not broaden to discreet theft from the shared word “robbery.”

## ch17-06 — rA9 memory without asking Ralph

**Decisive observation.** Stay overnight in the squat without inspecting/asking about Ralph’s carving, propagate that save, then reset Kara and inspect the storage-room symbols while recovery is incomplete. Distinguish RECALL RA9 SYMBOLS from the ordinary post-recovery RA9 search node.

**Source cross-check.** Wiki conditions the recollection on witnessing Ralph carve; PowerPyx’s list uses squat lodging. A PowerPyx commenter’s “rA9 was there” without squat does not distinguish ordinary symbols from a recovery memory. [Completion-oriented Reddit advice](https://www.reddit.com/r/DetroitBecomeHuman/comments/k4yviz) specifically says inspect the symbols, supporting the narrower gate. Related reposts are not independent replications. Game labels `MENU.FLOWCHART.05K.RA9` and `RA9NORESET` explicitly distinguish the two nodes; they contain no trigger implementation.

**Footage hunt.** New exact-condition search found no negative-prerequisite test. Inherited `9-WwhtWnSVs` 18:50–19:00 shows a recollection but not the earlier omission; I re-inspected its 18:50 frame. Full-reset and serving-Zlatko speedrun leads do not establish the squat-without-carving control.

**Verdict: not settled; medium confidence retaining the narrower gate, low confidence answering the experimental question.** **No change** to `inputs.carving` / `ch10RalphCarving`. Do not replace inspection with lodging merely because a generic guide omits the extra action.

## ch17-07 — Alice’s book and Todd’s pipe without earlier interactions

**Decisive observation.** Two independently controlled tests: skip Alice’s book in A New Home, then inspect the Zlatko book while reset; skip REWASH CLOTHES / Red Ice discovery, then inspect the storage-room pipe while reset. Show the earlier omissions, the propagated save, memory response and chart. A shared flashback from Stormy Night is not itself evidence that the laundry prerequisite is unnecessary.

**Source cross-check.** Wiki gives book/laundry prerequisites. Gamepressure explicitly confirms the book prerequisite; PowerPyx’s comments and [Reddit completion advice](https://www.reddit.com/r/DetroitBecomeHuman/comments/12n7n29) corroborate it. Generic pipe recipes in [GameFAQs](https://gamefaqs.gamespot.com/ps4/182637-detroit-become-human/faqs/76123/zlatko) and Neoseeker omit earlier-state conditions, which does not disprove the wiki gate. The string table supplies ALICEBOOK/CRACKPIPE chart names and flashback dialogue, not the counter logic.

**Footage hunt.** Searches `book-memory` and `pipe-memory` found `KqT-Zp2oKJ0`, `T3wmz8e-qcI`, `QX7T6dbpk4c` and other reset playthroughs. No metadata establishes the skipped A New Home interactions. Inherited `9-WwhtWnSVs` 19:40–19:50 has a pipe flashback with unknown prior laundry state. Its other reset-pass edits cannot establish independent controls.

**Verdict: partially settled at source level for the book prerequisite (medium-high); not settled for pipe; overall partially settled, no new controlled footage.** **No change** to `inputs.book = !!upstairs.book` or `inputs.pipe = !!downstairs.rewash`. No numerical memory-weight change is justified.

## ch19-02 — Control-room alarm and a clean fence escape with John

**Decisive observation.** Recruit John, trigger the control-room alarm, then reach/cross the fence promptly with no dog intervention on John. Show him surviving or the selected route excluding DOGS MAUL JOHN. Failing before the fence is not this experiment: the existing benchmark deliberately preserves John on that separate rescue route.

**Source cross-check.** The upper alarm RUN TO FENCE fans toward dogs and Markus damage; lower escape edges cross it in the photographed chart. Wiki nesting alone does not prove a clean upper exit. Template “Was detected by the guards – Running away” contains timed failure; [PowerPyx](https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/) and its commenters describe the dog encounter. Its reader’s “problem solved” after making the fence is not an explicit report of John surviving without dogs. History revision 30319 adds key/truck nodes, not this edge.

**Footage hunt.** New `JQbq0D02yl4` and `eCWM3Atsi88` all-branch leads were selected alongside `kzfC6qtmqas`; the latter’s description explicitly says John is mauled after the alarm. Inherited `0LjHSb_5bLY` 55:15–56:05 is the pre-fence damage/rescue route; 58:15–59:10 and `w8Y7-ZmTVZ0` show fence dogs. New visual readings are in the ledger.

**Verdict: partially settled; medium confidence in mandatory dogs after reaching the fence with John, no counterexample found.** **No change** to `M05n`’s `control alarm && reached fence && !ch19MarkusRescued` gate. Preserve John on the separate pre-fence rescue exception; the registry’s “always dies on alarm” summary is stale.

## ch19-03 — Quiet LEAVE and delayed fence damage

**Decisive observation.** ACCEPT John → LEAVE the key, with no alarm. Once player control returns, wait through the full escape window rather than moving to the fence. Record damage/rescue or automatic safe completion and the chart. A prompt successful crossing does not distinguish an absent failure branch from an untriggered timeout.

**Source cross-check.** Chart lower RUN TO FENCE edges are the disputed junction. Template nests the explicit delay/failure under detection; PowerPyx describes damage following an alarm. No source gives a failure percentage. `RISKS.fenceQuiet = 0.08` is a benchmark calibration.

**Footage hunt.** Targeted `quiet-fence`, all-endings and challenge searches produced no deliberately stationary quiet-LEAVE test. Inherited `0LjHSb_5bLY` 29:35–30:00 runs straight to the fence and safely returns full bags; its 53-minute damage run has a control-room alarm. New alarm footage cannot validate the quiet risk.

**Verdict: not settled; low confidence.** **No change** to M05m’s quiet risk; retain the explicit calibration label. Do not infer 0% or 8% from an ordinary successful departure.

## ch21-01 — Initial car news with no house fire

**Decisive observation.** Establish no SET FIRE at Zlatko on the save actually propagated to Pirates’ Cove, then activate and watch the first car report with opinion popups visible. A complete no-fire channel cycle can help identify the save. A fire-save first-report down is useful timing evidence but does not alone prove no-fire behavior.

**Source cross-check.** The [Pirates’ Cove template](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/21-pirates-cove-chapter-content/pirates-cove-chapter-content.component.html) marks only `X0703K.TV.NEWS.PC.X07KWEBB.HOUSEFIRE` with opinion down; the initial report is `X0701K.INTRO.RADIOGAGA.PC.X07KWEBB.STATION03`. Wiki and Public Opinion list both. Wiki history shows both were added together in revision 35332, without recorded experimental support. That makes it one assertion repeated across sources, not two measurements.

**Footage hunt.** New ScorpionTank `AAkd55hfWQ4` car segment and preceding `9f5n9q23nAY` escape segment were selected because their single Experienced-difficulty series explicitly avoids burning the house. Its description alone is not counted as observation. Inherited `6VDKm71VhlA` 00:41 visibly has a small down on the first report; that series’ prior fire-state continuity was unverified. Exact new frame reading is recorded below.

**New visual result.** [ScorpionTank’s car scene](https://www.youtube.com/watch?v=AAkd55hfWQ4&t=58) shows the initial missing-AX400 report and **PUBLIC OPINION small down at about 00:59**, before the international report (~01:15) and weather (~01:40). The [same series’ preceding Kara escape](https://www.youtube.com/watch?v=9f5n9q23nAY&t=1190) stays in the closet, gets discovered and completes the bathroom/storage/downstairs escape without setting fire; the house remains unburned. The intervening chapters have no Kara fire-setting opportunity. The car run watches the three ordinary reports and switches off after weather. This is a single-playthrough series, not Sag903’s stitched alternate-save compilation; propagation is inferred from that coherent series rather than independently inspecting its save files. Selected frames: `ch21/ch21-01-AAkd55hfWQ4-00-59.png`, `ch21/ch21-01-9f5n9q23nAY-20-55.png`, `-21-30.png`, `-22-35.png`.

**Verdict: settled — yes; high confidence in the initial-report arrow, medium-high confidence in the no-fire saved history.** **Change:** `K14b` option `0` (switch on TV/watch ordinary news), `publicSupport` **0 → −1**, once through its existing `clue: news` hub handling. Add it to the module’s `rules.arrows`; retain option `1`’s separate **fire-only −1**. Correct the scene/module/recap claim that the fire report supplies the chapter’s only opinion decrease. Do not remove the fire gate or award a loss on each international/weather channel.

## ch23-01 — Guard-only Simon wound, no SWAT

**Decisive observation.** Lock the server door; ASSAULT and shoot the phone guard, leaving Simon wounded; shoot the fleeing operator; show no SWAT after the speech, Simon walking up to the roof, then LEAVE/KILL and his chart ending. Continuous guard → speech → roof footage with no SWAT can establish the result even if the earlier door lock is offscreen; do not splice the guard and rooftop variants of a compilation.

**Source cross-check.** The chart’s ON THE ROOF → SIMON CAN’T CONTINUE branch exists but does not label its predicate. The template nests the roof under SWAT; that is insufficient to disprove another incoming route. [PowerPyx](https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/) explicitly includes the phone-guard wound. A [2026 Reddit troubleshooting exchange](https://www.reddit.com/r/DetroitBecomeHuman/comments/1vsns6u/how_to_save_simon_at_stratford_tower_i_keep/) gives the exact no-SWAT recipe and says Simon walks upstairs then collapses. It distinguishes an unlocked door as the third alarm source, stronger than a generic “Simon cannot jump” claim.

**Footage hunt.** New `eBM96LYNQk4`, `5q_kgmQkse4` and `x8aCRIFZBsw` all-outcomes leads were reviewed/qualified. Inherited `cYyMIB8Fz3w` has SWAT; `eaYoywitjR4` cuts between guard variants. They cannot settle the controlled guard-only case. Exact new visual result is recorded in the ledger.

**Verdict: partially settled at source level; medium-high confidence in the candidate correction, exact controlled footage not found.** **Candidate for the orchestrator:** in M12’s no-alarm branch, `stratfordSimonFate='escaped'` unconditionally → `'escaped'` only when healthy, otherwise a distinct wounded/walked-to-roof fate. M14’s `stratfordSimonFate==='carried'` gate → also admit that wounded arrival. Route to LEAVE/KILL, not `THE GROUP ESCAPED`; preserve M13 as a SWAT-only rescue. M10b already sets `simonWounded` on `phoneShot`, so do not add a duplicate wound or alarm there. **No unconditional application recommended from the new clips alone**; the source-based candidate is stronger, not newly filmed.

## ch23-02 — CALM opening, DETERMINED ending, zero deaths

**Decisive observation.** Incapacitate both guards, spare the fleeing operator, choose CALM opening and DETERMINED final words. Record the complete MEDIA REACTS sequence: the no-casualty increase and the separate tone popup. One increase alone cannot distinguish casualty credit from a positive tone effect.

**Source cross-check.** Template “Chose CALM” is editorial and ambiguous between the opening and a loosely described peaceful ending. Actual labels are CALM at opening, PEACEFUL/DETERMINED at ending. Wiki Public Opinion keys on the ending; PowerPyx’s peaceful recipe combines opening and ending and therefore cannot isolate them. Reader Marcel reports a DETERMINED opening still permits opinion up, but does not give a complete mixed-route measurement.

**Footage hunt.** New `77Del_W3Dps` compares calm/determined speeches; `eBM96LYNQk4` includes multiple speech choices and media reactions. Both need visual checks for mixed choices, zero casualties and continuity. Inherited `jY9WWQg1N2s` is CALM + PEACEFUL; `_SuPnzu9Jno` kills the operator and uses DETERMINED, so neither tests this item.

**Verdict: not settled; low confidence in choosing between the opening and ending predicates.** **No change** to ending-based `stratfordNewsTone` or its tone-line ±2. Do not use a speech-only comparison without the aftermath to infer an opinion delta.

## New footage ledger and final implied changes

**Final count: 1 settled, 5 partially settled, 6 not settled.** The new closure is ch21-01; the remaining partial findings do not acquire invented probabilities or hidden-state predicates.

Downloaded **11 completed sections from 9 videos**, all anonymous, maximum 720p; final stream copies use 360p. Initial forced-keyframe re-encodes were too slow and were superseded; their partial files are not counted as completed observations. Logs distinguish intentional replacement from an access refusal. No login/cookies used; no YouTube access-refusal retry was needed. Copy cuts can retain several seconds of keyframe lead-in; adjusted timing is recorded in `clip-timing.json`. Contact-sheet captions are approximate, selected PNG names use the adjusted source times.

| Video / requested section | Visual reading and relevance |
|---|---|
| [eq_sVgK8fCQ](https://www.youtube.com/watch?v=eq_sVgK8fCQ), 00:00–04:30, 04:30–09:00, 09:00–13:44 | Main-room/bedroom/corridor variants, bathroom/storage QTEs, failed shots, and downstairs/yard variants. Inspected complete contact sheets at 5-second spacing, with a denser corridor window. ~06:53 shows labelled TO BEDROOM / TO CORRIDOR and ~07:03 a bathroom pursuit input. No isolated successful corridor-to-stairs bypass. The ordinary fireplace flame is **not** SET FIRE TO HOUSE; no post-fire death established. Saved `ch17/ch17-03-eq_sVgK8fCQ-06-53.png`, `-07-03.png`. |
| [51yy5rqyd9Y](https://www.youtube.com/watch?v=51yy5rqyd9Y), 23:00–28:38 | Closet/main-room-to-corridor pursuit and bathroom/storage escape followed by yard. It enters the bathroom; it cannot identify the no-bathroom control. |
| [9f5n9q23nAY](https://www.youtube.com/watch?v=9f5n9q23nAY), 19:50–23:20 | Coherent single-path no-fire escape: closet, detection, upstairs QTEs and unburned downstairs/yard. Earlier in the same chapter Kara escaped reset; this supplies no negative-prerequisite memory experiment. |
| [AAkd55hfWQ4](https://www.youtube.com/watch?v=AAkd55hfWQ4), 00:15–02:30 | Initial ordinary-news opinion down at ~00:59, before international/weather. Completes the ch21-01 case with the preceding no-fire episode; first-report reading agrees with the inherited Sag903 frame. |
| [JQbq0D02yl4](https://www.youtube.com/watch?v=JQbq0D02yl4), 04:00–09:00 | XCV’s second route accepts John, attempts blackout/key theft, is detected in the control room, runs to fence, sees John mauled and SAVE/ABANDON, then returns with full bags. It is not a clean no-dogs exit or a quiet-LEAVE timeout. Saved `ch19/ch19-02-JQbq0D02yl4-07-45.png`, `-07-47.png`, `-08-00.png`, `-08-05.png`, `-08-07.png`; chapter outcome alone does not mean John survived. |
| [77Del_W3Dps](https://www.youtube.com/watch?v=77Del_W3Dps), 00:00–05:11 | Separate CALM/PEACEFUL and DETERMINED/DETERMINED speech demonstrations. It ends after speech/room footage and creator end cards, without the mixed-route MEDIA REACTS measurement. Saved `ch23/ch23-02-77Del_W3Dps-04-37.png` identifies the final determined dialogue only. |
| [eBM96LYNQk4](https://www.youtube.com/watch?v=eBM96LYNQk4), 10:30–21:31 | Multiple guard, operator, speech, roof and media variants are edited together. The visible roof rescue follows SWAT. Mixed prompt examples and a later opinion up are not a continuous no-death CALM/DETERMINED experiment. Saved `ch23/ch23-02-eBM96LYNQk4-17-00.png` is a speech-only reference, not an arrow verdict. |
| [5q_kgmQkse4](https://www.youtube.com/watch?v=5q_kgmQkse4), 00:00–04:15 | XCV’s first endings begin after the broadcast, then SWAT wounds Simon; later roof choices follow carrying him. Does not show guard-only injury without SWAT. |
| [x8aCRIFZBsw](https://www.youtube.com/watch?v=x8aCRIFZBsw), 00:00–04:00 | Opening explicitly labels security called; operator escapes; overlay and frames show SWAT arriving. Later leave/kill variants do not establish the guard-only route. Exclusion frame: `ch23/ch23-01-x8aCRIFZBsw-01-20.png` (SWAT overlay/arrival). |

Other qualified leads were rejected before further segment downloads where they lacked the required saved history. `grSDE3Fk1yA`’s storyboard was used only to locate/reject candidate sequences, not as gameplay-frame proof. No new memory eligibility, no-fire death immunity, quiet-fence failure percentage or mixed-speech opinion claim is inferred from titles/captions.

## Implied-changes table

“Candidate” means a concrete source-based proposal for the orchestrator, not a newly settled observation. “No change” means this pass does not justify changing the current benchmark; it does not establish the current calibration as a measured game rule.

| Item | Final verdict / confidence | Exact scene, gate or rule: from → to |
|---|---|---|
| ch17-01 | Not settled / low | **No change.** `inputs.report`: single selected report with freeway precedence retained; no second PO loss inferred. |
| ch17-02 | Partially / high for chase, low for post-fire death | **Supported routing correction, inherited:** K13/K13a SET FIRE `ch17Route='stairs'` immediately → observed post-fire upstairs escape/pursuit before stairs. Death reachability and probability remain open; add no invented death roll. |
| ch17-03 | Partially / high for chart edge, low for control | **No change.** Keep K13c bypass; 0.30 remains calibration. New clips go through bathroom. |
| ch17-04 | Not settled / low on gate | **No change.** `house()` TV recollection through eligible robbery/chase `inputs.report`; robbery-only/no-chase control absent. |
| ch17-05 | Not settled / low | **No change.** Gun-only `ch10RobberyNews` eligibility retained; do not broaden to discreet diversion. |
| ch17-06 | Not settled / medium for conservative gate | **No change.** `inputs.carving` continues to use `ch10RalphCarving`, not squat lodging alone. |
| ch17-07 | Partially / medium-high book, low pipe | **No change.** `upstairs.book` and `downstairs.rewash` memory prerequisites retained; neither negative control filmed. |
| ch19-02 | Partially / medium | **No change.** M05n control-alarm/reached-fence dogs gate retained; preserve `ch19MarkusRescued` John-survival exception. |
| ch19-03 | Not settled / low | **No change.** `RISKS.fenceQuiet=0.08` remains explicitly calibrated; no stationary quiet-LEAVE case found. |
| ch21-01 | **Settled, yes / medium-high** | **K14b option 0: `publicSupport` 0 → −1 once** on initial news. Add to `rules.arrows`; retain separate option 1 fire-only −1; update the “only fire arrow” adaptation/recap statement. |
| ch23-01 | Partially / medium-high source-based candidate | **Candidate:** M12 no-alarm `escaped` regardless of wound → healthy `escaped`, wounded roof-arrival fate. M14 carried-only → carried **or wounded walking arrival**. Keep M13 SWAT-only; existing M10b wound remains. No controlled new clip, so orchestrator decides whether source agreement is sufficient. |
| ch23-02 | Not settled / low | **No change.** Keep final-choice `stratfordNewsTone` and current ±2 tone line; mixed speech plus complete casualty/tone popups not isolated. |

No changes were applied to benchmark code, tests, CONFLICTS.md or SOURCES.md. Required baseline `bun run check` passed (story 1.9.11: 862 questions, 490 atlas entries). The baseline test command encountered numerous five-second timeouts under heavy concurrent machine load and was stopped after about 30 minutes; its log is preserved separately and does not support a claim of a healthy baseline. Research findings do not depend on those timeouts.

