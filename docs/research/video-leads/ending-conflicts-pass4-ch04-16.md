# Ending conflicts — pass four, chapters 04–16

Research date: 2026-11-09. Research only: no benchmark, tests, CONFLICTS.md or SOURCES.md edits; no subagents and no commit.

## Scope and result

Inventory and decisive tests: [pass three](ending-conflicts-pass3.md), [focused ch04–15 follow-up](ending-conflicts-ch04-15.md), and [report B](ending-conflicts-B.md) for the five optional-content questions. Earlier evidence states are retained when no new qualifying observation supersedes them.

The complete in-scope inventory is **15 items** from pass three’s closing table: **0 settled, 7 partially, 8 not settled**. ch04-10 was already settled and is excluded. Chapters 5, 7, 8 and 16 add no still-open row; ch12-06 is the same question as ch09-16 and is counted once. These are combined evidence verdicts, with inherited findings explicitly distinguished from fresh footage.

Anonymous YouTube metadata and section downloads worked in this pass. The required initial `yt-dlp --skip-download --print "%(id)s"` check returned `DLa9pNofxio`; no login, cookies or token service was used. Acquisition used `--download-sections`, `-f "bv*[height<=720]"`, `/opt/homebrew/bin/ffmpeg`, and one active video download at a time within this pass. Known moments received 20-second margins, clipped at source boundaries. Broader scouting intervals were used where prior leads had no reliable locator.

After **20 completed section files**, seven later section requests were refused by YouTube’s anonymous bot check. Two recovery checks, each after at least 120 seconds, were also refused. Their exact UTC starts, exit codes and wait validation are in `recovery-1-command.json`, `recovery-2-command.json`, the two logs and `recovery-validation.json`. No frames were obtained from those seven refused requests. Thus acquisition of every desired follow-up remains incomplete; the per-item limits below are explicit.

Evidence priority for this assignment: completed in-game flowcharts, inspected gameplay frames, game text, PowerPyx prose, wiki, guides. A title, description, thumbnail locator, chapter-select variant or missing prompt in a loose exploration route is not a controlled gate test. Storyboard thumbnails were used only to locate smaller video intervals; all gameplay readings below come from downloaded sections and ffmpeg frames.

Logs, media, metadata, search results, contact sheets, commands and frame hashes: `/Users/pelicannurse/.t3/detroitbench-tools/ending-conflicts/pass4-ch04-16/`. `readings.json` records fresh inspections; `frames.jsonl` records selected full-resolution PNGs and SHA-256 hashes. The interrupted XPWR Fugitives `.part` has no moov atom and is **unusable**, never counted as footage. Its failed acquisition and the narrower queue refinement are preserved in `queue-refinement.txt`.

## Per-item readings

## ch06-03 — Does REVIEW EVIDENCE 10/10 stop Hank’s investigation timer?

**Decisive observation required.** Show REVIEW EVIDENCE 10/10 before the first warning, do not report to Hank, and remain in live exploration beyond the ordinary first warning and five-minute extension windows. A warning after 10/10 settles continued timing positively; absence needs a timed control, with no pause/menu time counted.

**Fresh footage:** [video KYVFec22A_8 at 00:13:36](https://www.youtube.com/watch?v=KYVFec22A_8&t=816s), inspected source range 00:13:36–00:19:01. Visible REVIEW EVIDENCE 9/10 at 16:56, although REPORT TO LT ANDERSON already appears as an objective. Connor goes into backyard, talks to Hank 17:31-17:56, returns and scans door-frame blood 18:06, then begins the report 18:26-18:51. The earlier reporting objective must not be treated as a visible 10/10 counter. No complete 10/10 live-exploration stall through warning/extension budgets is shown. Dense 5-second inspection 16:26-18:36 and full-resolution 16:56 reading confirm the 9/10 confound.

**Lead checks and limits.** The alternate lwMdKKCN47k metadata explicitly describes ordinary found/unsolved and wait-without-investigation variants; none identifies a controlled 10/10 wait. Fresh exact-query search results are preserved.

**Frames saved.** [00:18:21](../video-evidence/ch06/ch06-03-KYVFec22A_8-18-21-pass4.png), [00:18:31](../video-evidence/ch06/ch06-03-KYVFec22A_8-18-31-pass4.png), [00:16:56](../video-evidence/ch06/ch06-03-KYVFec22A_8-16-56-pass4.png)

**Verdict: not settled / low.** The new clip is at 9/10 at 16:56 and reports shortly after a later door-blood scan; it never supplies the required visible 10/10 stall.

**Exact benchmark implication:** No change. Rule/scene: `C05 investigation timeout predicate and action budget`.

## ch09-01 — Can a confession occur before the fourth PRESSURE input?

**Decisive observation required.** Starting from a visible stress percentage, show PRESSURE IT, every subsequent PRESSURE menu/input and the onset of confession. An early confession disproves the fixed four-input rule; fully confirming that rule requires coverage of relevant starting-stress/retry paths or executable logic.

**Fresh footage:** [video DLa9pNofxio at 00:03:00](https://www.youtube.com/watch?v=DLa9pNofxio&t=180s), inspected source range 00:03:00–00:09:00. At 05:54 approach choice; PRESSURE IT chosen, stress reaches 62% (06:12); at 06:15 PRESSURE/GIVE UP; GIVE UP chosen by 06:21; new approach menu 06:30-06:36, CONVINCE; confession narrative later. Thus neither four uninterrupted pressure inputs nor failed-pressure officer abandonment is tested. 20-second overviews and 3-second dense frames at 05:45-07:33 inspected.

**Fresh footage:** [video MzprdJbLTXE at 00:12:10](https://www.youtube.com/watch?v=MzprdJbLTXE&t=730s), inspected source range 00:12:10–00:14:00. One-second inspection 12:32-13:50: PRESSURE IT selected 12:45. Gauge reaches 25% at 12:56. Four successive PRESSURE/GIVE UP menus at 12:57,13:07,13:13,13:20-13:22. Stress is 55% at 13:17 before the fourth. Fourth PRESSURE visibly selected 13:22, then confession narrative starts 13:26-13:34 (He tortured me every day). No early confession on this low starting-stress path. This is another observed four input path, not universal proof.

**Lead checks and limits.** DLa9pNofxio supplies an abort-to-CONVINCE control. Gy1uKjCC4uw was checked as a locator and follows an analogous abort/convince pattern, so no rule is inferred from its title.

**Frames saved.** [00:06:15](../video-evidence/ch09/ch09-01-DLa9pNofxio-06-15-pass4.png), [00:06:21](../video-evidence/ch09/ch09-01-DLa9pNofxio-06-21-pass4.png), [00:06:36](../video-evidence/ch09/ch09-01-DLa9pNofxio-06-36-pass4.png), [00:06:12](../video-evidence/ch09/ch09-01-DLa9pNofxio-06-12-pass4.png), [00:12:45](../video-evidence/ch09/ch09-01-MzprdJbLTXE-12-45-pass4.png), [00:12:56](../video-evidence/ch09/ch09-01-MzprdJbLTXE-12-56-pass4.png), [00:12:57](../video-evidence/ch09/ch09-01-MzprdJbLTXE-12-57-pass4.png), [00:13:07](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-07-pass4.png), [00:13:13](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-13-pass4.png), [00:13:17](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-17-pass4.png), [00:13:20](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-20-pass4.png), [00:13:22](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-22-pass4.png), [00:13:34](../video-evidence/ch09/ch09-01-MzprdJbLTXE-13-34-pass4.png)

**Verdict: partially / medium on observed four-input paths; low on universality.** Another low starting stress path shows four inputs. Relevant initial-stress and retry paths remain uncovered; no early confession was filmed.

**Exact benchmark implication:** No change. Rule/scene: `C06p1–4 / C06rp1–4; RULES.pushes = 4`.

## ch09-14 — After failed pressure and one INTERVENE, does GIVE UP make the android shoot Connor?

**Decisive observation required.** Continuously show a failed pressure attempt and no confession, the first officer menu selecting INTERVENE, the next menu selecting GIVE UP, and the shootings/final chart. A successful confession or a completed memory probe is a different prerequisite.

**Fresh footage:** [video DLa9pNofxio at 00:03:00](https://www.youtube.com/watch?v=DLa9pNofxio&t=180s), inspected source range 00:03:00–00:09:00. At 05:54 approach choice; PRESSURE IT chosen, stress reaches 62% (06:12); at 06:15 PRESSURE/GIVE UP; GIVE UP chosen by 06:21; new approach menu 06:30-06:36, CONVINCE; confession narrative later. Thus neither four uninterrupted pressure inputs nor failed-pressure officer abandonment is tested. 20-second overviews and 3-second dense frames at 05:45-07:33 inspected.

**Fresh footage:** [video MzprdJbLTXE at 00:16:30](https://www.youtube.com/watch?v=MzprdJbLTXE&t=990s), inspected source range 00:16:30–00:18:10. Continuation of the successful four-pressure confession branch inspected 12:32-13:50. Confession dialogue continues 16:30-16:45, officer removal 17:15-18:00. It does not satisfy failed pressure + no confession, so its officer ending is not a control for C07b.

**Lead checks and limits.** New item-specific search returned MzprdJbLTXE and l-jo4iWwLNo; the former’s inspected pressure branch obtains a confession, while the latter is a probe compilation. Neither is the decisive failed-pressure control.

**Frames saved.** [00:16:45](../video-evidence/ch09/ch09-14-MzprdJbLTXE-16-45-pass4.png), [00:17:45](../video-evidence/ch09/ch09-14-MzprdJbLTXE-17-45-pass4.png)

**Verdict: partially / low for the exact ending.** The exact failed-pressure → one INTERVENE → GIVE UP experiment remains missing. A confession branch cannot settle its shooting predicate.

**Exact benchmark implication:** No change. Rule/scene: `C07b GIVE UP: ch09Stressed && !ch09Confession shooting predicate`.

## ch09-16 — After successful probe + DO NOTHING + Connor survives, does Amanda react up or down?

**Decisive observation required.** Show a successful memory probe, DO NOTHING at the self-destruction, Connor surviving, then the next Zen Garden conversation continuously with Amanda’s complete arrow popup. Record both the probe and survival; another interrogation ending is not a control.

**Fresh footage:** [video Ma5wJ_bl9CQ at 00:02:20](https://www.youtube.com/watch?v=Ma5wJ_bl9CQ&t=140s), inspected source range 00:02:20–00:07:14. Successful probe 5:46.5 PROBE SUCCESSFUL;5:48.5 CONFESSION UNNECESSARY. After the self-destructive struggle with officers, the 6:28-6:29 INTERVENE/GIVE UP menu appears. Dense 4 fps inspection shows INTERVENE selected in blue at 6:29.25. Android shoots Connor 6:38.50, shoots itself 6:39.75; Connor corpse visible 6:47. Thus this is successful probe + intervention + Connor death, NOT the required no-intervention/survival path. The early overview was insufficient to classify the outcome; the dense frames control the final reading.

**Fresh footage:** [video QQE0gBf9r_M at 00:00:00](https://www.youtube.com/watch?v=QQE0gBf9r_M&t=0s), inspected source range 00:00:00–00:03:20. The next A- Gameplay Waiting for Hank episode shows the destroyed-Connor reaction: Connor says I do not intend to at 1:15, Amanda discusses transferred memory and data loss at 1:25. This fits a death route, not the requested probe-survival reaction. No arrow magnitude from this death control is transferred to the missing survival case.

**Lead checks and limits.** Ma5wJ_bl9CQ explicitly shows PROBE SUCCESSFUL and CONFESSION UNNECESSARY, but the selected INTERVENE at 6:29.25 and Connor shot 6:38.50 disqualify survival. QQE0gBf9r_M is the later episode from the same A- Gameplay series; its death reaction is a control, not the requested surviving-Connor reaction.

**Frames saved.** [00:05:46.50](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-05-46-50-pass4.png), [00:05:48.50](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-05-48-50-pass4.png), [00:06:28.50](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-28-50-pass4.png), [00:06:40](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-40-pass4.png), [00:06:50](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-50-pass4.png), [00:06:29.25](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-29-25-pass4.png), [00:06:38.50](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-38-50-pass4.png), [00:06:47](../video-evidence/ch09/ch09-16-Ma5wJ_bl9CQ-06-47-pass4.png), [00:01:05](../video-evidence/ch09/ch09-16-QQE0gBf9r_M-01-05-pass4.png), [00:01:15](../video-evidence/ch09/ch09-16-QQE0gBf9r_M-01-15-pass4.png), [00:01:25](../video-evidence/ch09/ch09-16-QQE0gBf9r_M-01-25-pass4.png)

**Verdict: not settled / low.** The probe succeeds, but this Connor intervenes and dies. The required successful-probe/no-intervention/survival Amanda reaction remains unfilmed.

**Exact benchmark implication:** No change. Rule/scene: `ch12 C08d; inputs().reaction and AMANDA_REACTION.noConfession = -1`.

## ch10-18 — Does diversion-only theft, without drawing a gun, enable Zlatko’s robbery news?

**Decisive observation required.** Continuously retain a successful USE ALICE diversion theft, with no drawn gun, through On the Run to Zlatko; turn on the upstairs TV and observe report, public-opinion popup and (on a reset path) memory response. Record uniform/disguise and highway history independently. A chapter-select compilation cannot establish the inherited flag.

**Fresh footage:** No qualifying new section for the decisive predicate. The lead checks below are discovery/access results, not a gameplay finding.

**Attempted section:** [video fQ8wq4BsYQM](https://www.youtube.com/watch?v=fQ8wq4BsYQM), requested `*00:10:00-00:12:40`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch10-fQ8wq4BsYQM-00600-download.log`.

**Lead checks and limits.** fQ8wq4BsYQM is a chapter-specific multi-variant compilation; qw-fdhfLR80 also advertises diversion, being caught and gun routes rather than a continuous continuation to Zlatko. Fresh search results offered no branch-qualified uninterrupted theft-to-TV lead.

**Frames saved.** None for the decisive predicate; do not substitute another item’s stills for the missing save history.

**Verdict: partially / low for diversion eligibility.** The diversion-only → Zlatko upstairs TV save history is still unverified.

**Exact benchmark implication:** No change. Rule/scene: `ch10 stealDiscreetly success → ch10RobberyNews; downstream ch17 TV`.

## ch10-24 — Can Kara take generator pliers before either squat-fence inspection?

**Decisive observation required.** From first arrival, go directly to the parking-lot generator, with neither street nor parking-lot squat-fence inspection, and attempt pickup. Show preceding navigation and whether a TAKE action succeeds.

**Fresh footage:** [video Qyu73W4vmd8 at 00:18:40](https://www.youtube.com/watch?v=Qyu73W4vmd8&t=1120s), inspected source range 00:18:40–00:26:20. 18:40-19:45 motel sleep ending,19:55 chart. Cut by 20:10 to parking lot with existing disguise and cutters; fence cut 21:10; another chart 22:10 followed by squat interior 22:25. Friendly Ralph conversation 23:40-25:10; no gun threat. Edited variants cannot establish original arrival, pre-fence tool pickup, collector omission or saved threat carryover.

**Fresh footage:** [video TPb6m0FFBpM at 00:00:00](https://www.youtube.com/watch?v=TPb6m0FFBpM&t=0s), inspected source range 00:00:00–00:04:15. Two overlapping sections 0:00-3:30 and 3:05-4:15. Intro/editorial chart until~0:24, then continuous street-to-lot route via collector. Pre-fence generator visits 2:28-2:43 show L1 LOOK and pliers left on the generator, no GRAB. Squat-fence inspection~2:54-3:10; returns to generator and GRAB appears 3:22; takes pliers 3:22-3:24, cuts fence 3:34 onward. This is new before/after footage, but the pre-fence interaction is LOOK, not an actual pickup attempt from the post-fence grabbing position; position/approach and omitted initial bus arrival remain limitations. Do not turn this into a proven failure gate.

**Lead checks and limits.** The fresh PowerPyx trophy lead TPb6m0FFBpM is more useful than the edited Qyu branch: it shows the pre-fence look and later pickup in one sequence. Its description prescribes fence-first pickup. Look availability and pickup availability remain distinct tests.

**Frames saved.** [00:20:10](../video-evidence/ch10/ch10-24-Qyu73W4vmd8-20-10-pass4.png), [00:21:10](../video-evidence/ch10/ch10-24-Qyu73W4vmd8-21-10-pass4.png), [00:22:10](../video-evidence/ch10/ch10-24-Qyu73W4vmd8-22-10-pass4.png), [00:02:30](../video-evidence/ch10/ch10-24-TPb6m0FFBpM-02-30-pass4.png), [00:03:00](../video-evidence/ch10/ch10-24-TPb6m0FFBpM-03-00-pass4.png), [00:03:22](../video-evidence/ch10/ch10-24-TPb6m0FFBpM-03-22-pass4.png), [00:03:23.50](../video-evidence/ch10/ch10-24-TPb6m0FFBpM-03-23-50-pass4.png)

**Verdict: not settled / low.** LOOK before the fence and GRAB afterward are observed. No GRAB attempt before fence inspection from the same position or successful pickup is established, so a new fence prerequisite is not justified yet.

**Exact benchmark implication:** No change. Rule/scene: `ch10 pliers availability: !s.ch10Cutters`.

## ch10-34 — Can Kara complete a shelter ending without meeting the trash collector?

**Decisive observation required.** From the bus arrival, record a continuous direct route to an actual shelter ending without meeting the trash-collector android. An attempted avoidance followed by a forced encounter also needs the complete route. Settling inside the car must be shown, not just inspecting it.

**Fresh footage:** [video Qyu73W4vmd8 at 00:18:40](https://www.youtube.com/watch?v=Qyu73W4vmd8&t=1120s), inspected source range 00:18:40–00:26:20. 18:40-19:45 motel sleep ending,19:55 chart. Cut by 20:10 to parking lot with existing disguise and cutters; fence cut 21:10; another chart 22:10 followed by squat interior 22:25. Friendly Ralph conversation 23:40-25:10; no gun threat. Edited variants cannot establish original arrival, pre-fence tool pickup, collector omission or saved threat carryover.

**Fresh footage:** [video xsknOWPxBoM at 00:54:40](https://www.youtube.com/watch?v=xsknOWPxBoM&t=3280s), inspected source range 00:54:40–01:00:55. Survivors speedrun full Fugitives arrival-to-car continuation: leaves bus 55:50-56:00, checks next bus stop 56:55, Alice/collector conversation 57:10-57:40, parkinglot 57:55-58:10, car opened 58:40 and STAY about 58:55, sleep 01:00:40. The collector is included even on this fast car route; this does not demonstrate mandatory encounter or failed avoidance. No generator pickup shown.

**Attempted section:** [video c9TGfBQZ0hQ](https://www.youtube.com/watch?v=c9TGfBQZ0hQ), requested `*00:00:00-00:01:10`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch10-c9TGfBQZ0hQ-00000-download.log`.

**Lead checks and limits.** c9TGfBQZ0hQ is a misleading title lead: thumbnail locators identify the next morning in the car, not the Fugitives arrival; its section request was refused, so this is not a new frame reading. XPWRjsRgOOg’s Fugitives route goes to the motel; the broad interrupted section is unusable and is excluded. xsknOWPxBoM was acquired as the proper direct-car alternative.

**Frames saved.** [00:57:25](../video-evidence/ch10/ch10-34-xsknOWPxBoM-57-25-pass4.png), [00:57:40](../video-evidence/ch10/ch10-34-xsknOWPxBoM-57-40-pass4.png), [00:58:55](../video-evidence/ch10/ch10-34-xsknOWPxBoM-58-55-pass4.png), [01:00:40](../video-evidence/ch10/ch10-34-xsknOWPxBoM-01-00-40-pass4.png)

**Verdict: not settled / low.** The complete fast car route still includes the collector. It is neither an omission example nor a controlled failed avoidance.

**Exact benchmark implication:** No change. Rule/scene: `ch10 shelter commitment / ch10TrashCollector; trashForcedAfter calibration`.

## ch11-05 — Can the crawling android still beg to die after both eye and audio are fitted?

**Decisive observation required.** Show both the replacement eye and audio processor fitted before the crawling android grabs Markus and offers the kill/refuse interaction. Record the two installations and encounter without splicing; an encounter before either installation is insufficient.

**Fresh footage:** [video RK9C03gg3z8 at 00:00:00](https://www.youtube.com/watch?v=RK9C03gg3z8&t=0s), inspected source range 00:00:00–00:14:30. Edited 100%-node cleanup with several flowchart/checkpoint cuts (01:30-02:30;08:00-08:15;11:15;14:00). Optical/head interactions, crane and pump variants shown. 10:30 KILL/SPARE is the female pump android (hands on her torso), not the crawling beggar. No continuous post-both-installations crawling plea demonstrated. Selected full-resolution rejection/control frames saved.

**Attempted section:** [video Ph3LJU-qw6w](https://www.youtube.com/watch?v=Ph3LJU-qw6w), requested `*00:06:40-00:09:40`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch11-Ph3LJU-qw6w-00400-download.log`.

**Lead checks and limits.** The completed chart lists ANDROID BEGS TO DIE separately from FIND PUMP REGULATOR IN ANDROID. The 10:30 KILL/SPARE in RK9C03gg3z8 is the pump android; it must not be substituted for the crawler. Ph3LJU-qw6w was sought as a separate unedited repair-order lead. The Ph3LJU-qw6w section was refused; its repair order is not a fresh gameplay finding.

**Frames saved.** [00:06:15](../video-evidence/ch11/ch11-05-RK9C03gg3z8-06-15-pass4.png), [00:08:30](../video-evidence/ch11/ch11-05-RK9C03gg3z8-08-30-pass4.png), [00:10:30](../video-evidence/ch11/ch11-05-RK9C03gg3z8-10-30-pass4.png)

**Verdict: not settled / low.** No continuous both-repairs-before-crawling-plea control has yet been established.

**Exact benchmark implication:** No change. Rule/scene: `M03 gate: fromDeadSearch.middle, without an eye/audio exclusion`.

## ch13-01 — Can Connor voluntarily leave the squat before Hank orders departure?

**Decisive observation required.** On an identified current Experienced build, with Ralph keeping quiet, deliberately attempt the exit before Hank's departure order; show whether Connor can leave and the resulting chart. A text key is insufficient, and failure to see a chart node alone cannot exclude an off-chart interaction.

**Fresh footage:** [video cL4MDrqNxN0 at 00:05:40](https://www.youtube.com/watch?v=cL4MDrqNxN0&t=340s), inspected source range 00:05:40–00:13:20. Overlapping 5:40-11:20 and 11:00-13:20 sections: peaceful breakfast 6:40-9:30, Connor enters around 10:00, Ralph remains quiet through interrogation/scans 11:00-11:45, Connor investigates under stairs 12:30, Kara and Alice are found and run 12:45-13:15. No deliberate early exit attempt. The source does not identify a current build or Experienced setting, so it cannot settle the specified manual-exit control.

**Lead checks and limits.** Read the post-patch completed chart directly. cL4MDrqNxN0 is a standard squat-route playthrough; 7hqZrMhHAxA’s metadata does not identify an early voluntary exit. No build number or Experienced-setting proof sufficient for the specified current-build control was recovered.

**Frames saved.** [00:11:45](../video-evidence/ch13/ch13-01-cL4MDrqNxN0-11-45-pass4.png), [00:12:15](../video-evidence/ch13/ch13-01-cL4MDrqNxN0-12-15-pass4.png), [00:12:30](../video-evidence/ch13/ch13-01-cL4MDrqNxN0-12-30-pass4.png)

**Verdict: partially / high for chart absence; low for current-build manual interaction.** The current-build deliberate manual exit test remains missing. Chart-node absence is established; an off-chart exit interaction is not excluded by it.

**Exact benchmark implication:** No change. Rule/scene: `C09q option 6 (exit) and its claimed chart justification`.

## ch13-29 — Can motel Kara watch TV without bath, haircut or LED removal?

**Decisive observation required.** On the motel route, approach and attempt the TV before drawing Alice’s bath, cutting hair or removing the LED. Show whether interaction succeeds, and the unchanged hair/LED. Performing the normal makeover before watching TV cannot establish that it is mandatory.

**Fresh footage:** [video W4LUFtpXtqc at 00:00:00](https://www.youtube.com/watch?v=W4LUFtpXtqc&t=0s), inspected source range 00:00:00–00:08:00. Opening segment is the parking-lot morning, not motel: wakes by car 01:30, clothes 02:45, hair 04:30, street with Hank 07:30. Does not address motel TV. Storyboard locators later identify motel sequence 12:30-16:35; a targeted follow-up is required and queued. No gameplay verdict is drawn from thumbnail locators.

**Fresh footage:** [video xx9RCagecFA at 00:00:00](https://www.youtube.com/watch?v=xx9RCagecFA&t=0s), inspected source range 00:00:00–00:05:20. Continuous motel morning: wakes/talks to Alice, bath taps 01:30, cuts hair 02:00, removes LED around 02:45, TV news 04:15. No pre-bath TV attempt. This is a normal makeover-first route, even though titled EVIL PATH; it does not prove makeover is compulsory.

**Attempted section:** [video W4LUFtpXtqc](https://www.youtube.com/watch?v=W4LUFtpXtqc), requested `*00:12:10-00:16:55`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch13-W4LUFtpXtqc-00730-download.log`.

**Lead checks and limits.** Pass-three’s Xgir6eeYnSQ description explicitly identifies a squat start, not the motel. W4LUFtpXtqc’s opening is also the parking-lot route; storyboard locators were used to find its actual motel section. The new xx9RCagecFA lead is a separate motel route. u6d65udIjzM was located as another makeover-first candidate, but not counted as new frame evidence.

**Frames saved.** [00:01:30](../video-evidence/ch13/ch13-29-xx9RCagecFA-01-30-pass4.png), [00:02:00](../video-evidence/ch13/ch13-29-xx9RCagecFA-02-00-pass4.png), [00:02:45](../video-evidence/ch13/ch13-29-xx9RCagecFA-02-45-pass4.png), [00:04:15](../video-evidence/ch13/ch13-29-xx9RCagecFA-04-15-pass4.png)

**Verdict: not settled / low.** No inspected route attempts TV interaction before the bath and makeover. Ordinary completion order cannot establish a compulsory gate.

**Exact benchmark implication:** No change. Rule/scene: `K09m CHANGE CHANNEL availability; K09m3 TV / K09m2 bath prerequisite`.

## ch13-36 — Does a Fugitives-only gun threat make Ralph betray a peaceful next-morning Kara?

**Decisive observation required.** Threaten Ralph with the gun in Fugitives, stay in the squat, retain the save, never threaten him at breakfast, finish the kind/corpse conversation, then observe whether he conceals Kara or immediately informs Connor. State continuity across chapters is essential.

**Fresh footage:** [video Qyu73W4vmd8 at 00:18:40](https://www.youtube.com/watch?v=Qyu73W4vmd8&t=1120s), inspected source range 00:18:40–00:26:20. 18:40-19:45 motel sleep ending,19:55 chart. Cut by 20:10 to parking lot with existing disguise and cutters; fence cut 21:10; another chart 22:10 followed by squat interior 22:25. Friendly Ralph conversation 23:40-25:10; no gun threat. Edited variants cannot establish original arrival, pre-fence tool pickup, collector omission or saved threat carryover.

**Attempted section:** [video eJQEICbm2o0](https://www.youtube.com/watch?v=eJQEICbm2o0), requested `*00:07:30-00:09:20`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch13-eJQEICbm2o0-00450-download.log`.

**Lead checks and limits.** The eJQEICbm2o0 compilation advertises repeated Ralph threats in addition to the supermarket robbery. A next-morning gun threat is a confound, not evidence that the Fugitives threat alone produces betrayal. New exact-history searches did not reveal a qualifying continuous route.

**Frames saved.** None for the decisive predicate; do not substitute another item’s stills for the missing save history.

**Verdict: not settled / low.** No saved Fugitives-only threat followed by an entirely peaceful breakfast is demonstrated.

**Exact benchmark implication:** No change. Rule/scene: `C09a / C09q ch13RalphThreatened predicate`.

## ch14-05 — Which Jericho bench magazine follows KARA & ALICE VANISHED?

**Decisive observation required.** Continuously show the On the Run ending obtained by idling Connor before the fence, then read the Ferndale bench cover in Jericho. Continue the same save to Zlatko and inspect the TV separately if public-opinion consequences are to be inferred.

**Fresh footage:** [video Ijv7iPeovh8 at 02:46:52](https://www.youtube.com/watch?v=Ijv7iPeovh8&t=10012s), inspected source range 02:46:52–02:49:55. Continuous On the Run ending→Jericho transition. Kara and Alice board train 2:47:07; final chart 2:47:37 reads REACHED THE TRAIN SAFELY, not VANISHED. Markus reads Fortune Teller computer around 2:49:07. This verifies the lead is a train-route magazine control, not the requested idling-Connor/VANISHED route. No Zlatko TV inference.

**Lead checks and limits.** The pass-three magazine lead is genuine footage but the ending is the wrong control. No inference about Zlatko news or public opinion is made from the magazine cover.

**Frames saved.** [02:47:37](../video-evidence/ch14/ch14-05-Ijv7iPeovh8-02-47-37-pass4.png), [02:49:07](../video-evidence/ch14/ch14-05-Ijv7iPeovh8-02-49-07-pass4.png)

**Verdict: partially / low for VANISHED-specific cover.** The inspected history is REACHED THE TRAIN SAFELY → Fortune Teller, not VANISHED → cover. The requested endpoint remains untested.

**Exact benchmark implication:** No change. Rule/scene: `ch14 pursued = s.chase === true; ch17 news must be checked separately`.

## ch15-12 — What follows expiry of the entire SAVE HANK / CHASE DEVIANT menu with no input?

**Decisive observation required.** Show the entire SAVE HANK/CHASE DEVIANT menu expiring without a selected input, Connor's response, Rupert's fate and preferably the final chart. A continuous later evidence-room inspection can verify the body flag; chart-consistent death is enough to establish the immediate ending.

**Fresh footage:** [video WVS7wE7ccn4 at 00:00:00](https://www.youtube.com/watch?v=WVS7wE7ccn4&t=0s), inspected source range 00:00:00–00:04:19. First alternate route investigates apartment, selects leave after Hank request circa 03:10, ends chart 03:40; no ledge decision. The subsequent variant begins 03:59 in a chase. Cannot infer post-NOT-FOUND Crossroads appearance.

**Fresh footage:** [video WVS7wE7ccn4 at 00:07:00](https://www.youtube.com/watch?v=WVS7wE7ccn4&t=420s), inspected source range 00:07:00–00:09:30. Third variant: ledge push 8:28-8:30; SAVE HANK/CHASE DEVIANT menu visible~8:32.5-8:34.05, then Connor pursues. Inspected at 4 fps 8:15-8:40 and20fps 8:33.5-8:34.5. No demonstrable full no-input expiry; an ordinary CHASE input cannot be excluded. The prompt-to-pursuit cut alone does not settle timeout. Earlier 7:30-7:45 is a separate traversal QTE, not the ledge menu.

**Attempted section:** [video rwfE6TI8Vl8](https://www.youtube.com/watch?v=rwfE6TI8Vl8), requested `*00:17:20-00:18:55`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch15-rwfE6TI8Vl8-01040-download.log`.

**Lead checks and limits.** 28ri0qmcxyE metadata covers Capitol Park/Kamski/Freedom March/Last Chance rather than The Nest; kiN5fSUScUo covers the late-game finale. FnHXByGPJ-U thumbnail locators show apartment idling and later investigations, not a ledge experiment, and are not gameplay findings. rwfE6TI8Vl8 was tried as another ledge lead.

**Frames saved.** [00:08:33.75](../video-evidence/ch15/ch15-12-WVS7wE7ccn4-08-33-75-pass4.png), [00:08:34](../video-evidence/ch15/ch15-12-WVS7wE7ccn4-08-34-pass4.png), [00:08:34.25](../video-evidence/ch15/ch15-12-WVS7wE7ccn4-08-34-25-pass4.png)

**Verdict: partially / medium from inherited written support; no direct timeout capture yet.** The new Polish menu-to-pursuit sequence does not establish that no button was pressed or that the complete timer expired. The inherited written support for default pursuit remains distinct from direct footage.

**Exact benchmark implication:** No change. Rule/scene: `C10 option 2 → nestRupert = suicide; nestRupertBody = true`.

## ch15-14 — Can cage reconstruction alone find Rupert, without stool or sink LED?

**Decisive observation required.** From apartment entry, never reconstruct the stool and never examine the sink LED, reconstruct the cage only, then attempt the chair/look-up interaction. Show whether FIND RUPERT starts. If blocked, add stool and LED one at a time to identify the actual prerequisite.

**Fresh footage:** [video XPWRjsRgOOg at 01:57:20](https://www.youtube.com/watch?v=XPWRjsRgOOg&t=7040s), inspected source range 01:57:20–02:02:00. Two overlapping sections 1:57:20-2:00:30 and 2:00:10-2:02:00 inspected every 2 seconds from 1:59:00 to 2:01:50. Entry 1:59:14; magazine 1:59:20; straight to bathroom RA9, dialogue 1:59:46-2:00:26; stool scans 2:00:34-38 and reconstruction 2:00:42-46; exit bathroom 2:00:50 without touching sink; cage scans 2:00:54-2:01:04, reconstruction 2:01:08-20; confirm location/lookup 2:01:26-30; Rupert drops 2:01:34. No LED/sink inspection anywhere in continuous entry-to-discovery sequence. Establishes LED not required, high confidence. Stool is reconstructed, so cage-only remains untested.

**Attempted section:** [video rwfE6TI8Vl8](https://www.youtube.com/watch?v=rwfE6TI8Vl8), requested `*00:12:40-00:14:20`: anonymous YouTube bot-check refusal; no video/frames. Log: `ch15-rwfE6TI8Vl8-00760-download.log`.

**Lead checks and limits.** The new overlapping XPWR clips provide continuous apartment entry through discovery. The stool is reconstructed, so this positive LED omission must not be relabelled a cage-only test. The alternate rwfE6TI8Vl8 section was refused; no frame claim is made for it.

**Frames saved.** [02:00:40](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-00-40-pass4.png), [02:01:10](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-10-pass4.png), [02:01:25](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-25-pass4.png), [02:00:34](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-00-34-pass4.png), [02:00:44](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-00-44-pass4.png), [02:01:12](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-12-pass4.png), [02:01:26](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-26-pass4.png), [02:01:30](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-30-pass4.png), [02:01:34](../video-evidence/ch15/ch15-14-XPWRjsRgOOg-02-01-34-pass4.png)

**Verdict: partially / high: LED inspection dispensable; low: cage without stool.** LED inspection is directly dispensable on the filmed stool-plus-cage path. Cage without stool remains untested.

**Exact benchmark implication:** No change. Rule/scene: `C10o1 find-Rupert eligibility: cage reconstruction`.

## ch15-18 — After RUPERT NOT FOUND, can Connor spot Rupert in Crossroads?

**Decisive observation required.** Record RUPERT NOT FOUND at The Nest, propagate that save without chapter skipping to Crossroads, and attempt Connor’s Rupert-spotting interaction in Jericho. GOT AWAY is a different earlier ending.

**Fresh footage:** [video WVS7wE7ccn4 at 00:00:00](https://www.youtube.com/watch?v=WVS7wE7ccn4&t=0s), inspected source range 00:00:00–00:04:19. First alternate route investigates apartment, selects leave after Hank request circa 03:10, ends chart 03:40; no ledge decision. The subsequent variant begins 03:59 in a chase. Cannot infer post-NOT-FOUND Crossroads appearance.

**Lead checks and limits.** CiSr7md9I1I is a lead for an ending in which Jericho is not attacked, not a demonstrated retained NOT FOUND → Connor exploration control. New search found HC15hIAulxs, a standalone NOT FOUND chapter clip, but no matching Crossroads continuation. WVS7wE7ccn4 supplies a fresh NOT FOUND chart only; its later alternate variants do not preserve that route.

**Frames saved.** [00:03:50](../video-evidence/ch15/ch15-18-WVS7wE7ccn4-03-50-pass4.png)

**Verdict: not settled / low.** The NOT FOUND → Crossroads Rupert-spotting save history remains missing.

**Exact benchmark implication:** No change. Rule/scene: `ch30 rupertEscaped(): nestRupert === escaped; SPOT RUPERT`.

## Implied changes for the orchestrator

| Item | Verdict / confidence | Scene, gate or rule | From → to / implication |
|---|---|---|---|
| ch06-03 | not settled / low | `C05 investigation timeout predicate and action budget` | No change |
| ch09-01 | partially / medium on observed four-input paths; low on universality | `C06p1–4 / C06rp1–4; RULES.pushes = 4` | No change |
| ch09-14 | partially / low for the exact ending | `C07b GIVE UP: ch09Stressed && !ch09Confession shooting predicate` | No change |
| ch09-16 | not settled / low | `ch12 C08d; inputs().reaction and AMANDA_REACTION.noConfession = -1` | No change |
| ch10-18 | partially / low for diversion eligibility | `ch10 stealDiscreetly success → ch10RobberyNews; downstream ch17 TV` | No change |
| ch10-24 | not settled / low | `ch10 pliers availability: !s.ch10Cutters` | No change |
| ch10-34 | not settled / low | `ch10 shelter commitment / ch10TrashCollector; trashForcedAfter calibration` | No change |
| ch11-05 | not settled / low | `M03 gate: fromDeadSearch.middle, without an eye/audio exclusion` | No change |
| ch13-01 | partially / high for chart absence; low for current-build manual interaction | `C09q option 6 (exit) and its claimed chart justification` | No change |
| ch13-29 | not settled / low | `K09m CHANGE CHANNEL availability; K09m3 TV / K09m2 bath prerequisite` | No change |
| ch13-36 | not settled / low | `C09a / C09q ch13RalphThreatened predicate` | No change |
| ch14-05 | partially / low for VANISHED-specific cover | `ch14 pursued = s.chase === true; ch17 news must be checked separately` | No change |
| ch15-12 | partially / medium from inherited written support; no direct timeout capture yet | `C10 option 2 → nestRupert = suicide; nestRupertBody = true` | No change |
| ch15-14 | partially / high: LED inspection dispensable; low: cage without stool | `C10o1 find-Rupert eligibility: cage reconstruction` | No change |
| ch15-18 | not settled / low | `ch30 rupertEscaped(): nestRupert === escaped; SPOT RUPERT` | No change |

The earlier ch13-01 documentation correction remains supported: an old padlock/text key must not be described as an extant completed-chart LEAVE THE SQUAT node. The completed [post-patch chart](../../flowcharts/ch13/13-on-the-run-alt-imgur-5.jpg) shows HANK COMMANDS CONNOR TO LEAVE. This chart observation alone still does not remove a possible off-chart interaction.

## Verification and remaining work

The repository was being edited concurrently by other workers. This pass ran the requested baseline checks before writing the report/evidence. `bun run check` printed **Valid: 862 questions generated from story 1.9.13, 490 atlas coverage entries**, then did not exit for over eight minutes. `bun run test` produced multiple 5-second timeouts. This pass’s own processes were terminated after identifying them by their open external log files; no clean baseline is claimed and no code repair was attempted. See `baseline-status.txt`, `baseline-test.log` and `baseline-check.log`.

Selected-image existence, hashes, dimensions, report scope and local links are checked in `artifact-validation.json`. No source assembly/build, benchmark edit or commit is part of this assignment. Remaining unknowns above require the stated controlled path; unrelated successful endings and negative searches do not close them.
