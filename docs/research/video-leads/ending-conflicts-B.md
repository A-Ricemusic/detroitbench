# Ending-conflict research B

Independent text-source audit of the 64 unchecked entries in `docs/research/CONFLICTS.md` (input identifies story 1.9.11). Research only: no benchmark, test, CONFLICTS, SOURCES, evidence, or commit changes. Existing workspace modifications were present before this work.

## Result and scope

**43 direct outcome conflicts, 12 indirect ending-relevant conflicts, 9 with no demonstrated ending consequence.** All 64 appear in the classification table; each of the 55 outcome-relevant entries (plus the important ch29-03 opening-order control) has its own question, evidence assessment, verdict, proposed change and decisive test below. Direct includes chapter-ending cards, not only the final credits. Indirect means a stat can cross an actual later gate; it does not mean that every arrow changes every run.

**Two settled findings, narrowly defined:** ch29-06 is text-supported missing map-to-memory functionality; ch30-03 is an obsolete benchmark discrepancy, already fixed in the current code. Neither claims a new isolated in-game experiment. All other disputed runtime predicates remain partially or not settled. Confidence is in the stated proposition, not an invented numerical probability.

Source priority follows this task: completed game flowchart > clear gameplay frames > game strings/transcriber templates > PowerPyx > wiki > other guides/player accounts. Templates reconstruct conditions; `en.json` contains labels and dialogue, not executable predicates. The public string table and assets list do **not** reveal the actual tally weights, timer-to-action conversion, QTE fail budget, relationship band widths, or all branch flags. A condition in an Angular template is descriptive transcription, not an extracted game-script Boolean.

I re-fetched all available chapter templates, all 25,923 English leaf strings, core chapter/stat/character wiki pages, and PowerPyx pages. I inspected the local completed ch26/ch28 chart images for the core message and police branches, read the ch26/28/29/30 chart READMEs, chapter 25–30 research specifications and triage rationales. Prior frame findings are **inherited observations from CONFLICTS/research notes, not new frame measurements by B**. No new video was represented as watched.

Snapshots, flattened strings, downloaded HTML/wikitext, selected wiki revisions, fetch failures, classification JSON and machine-readable findings are in `/Users/pelicannurse/.t3/detroitbench-tools/ending-conflicts/B/`. Source aliases below link to originals; `sources/<filename>` under that directory is the preserved copy. Raw local text searches may be reproduced against `extracted/strings.tsv` and `sources/dbt-*.html`. The rendered extracts resolve direct `t(...)` expressions but retain some `translateObject(...)` placeholders; use the raw namespace in `strings.tsv` for those, not an apparently blank rendered passage.

## Important changes in the evidence

1. The GameFAQs pacifist recipe tags several objects before refusing North's Molotov. That challenges the current one-tag suppression, even though it does not identify the real threshold.
2. Detailed PowerPyx reader tests say the policeman can leave with evidence exposed, coffee, TIRED, and WASHING MACHINE. That challenges the current automatic failure from three exposed-item points. The Steam guide's 70% claim is an observation to test, not a decoded threshold.
3. A missing archive route has converging sources: the statuette map can be compared with a reactivated android's memory, including Rupert, without the Simon tablet. The benchmark currently requires the tablet.
4. Post-STAND-GROUND DISPERSE is described as immediate flight by Neoseeker and has no nested follow-up menu in the template; current code adds the first-DISPERSE menu again. This is a strong correction candidate, still lacking the requested direct clip.
5. Wiki revision history exposes changing North threshold claims. A recent detailed player replay supports Companion bullet sacrifice without romance; it does not establish Friend. Do not silently widen the gate to Friend from that account.
6. The returning-exile engine-room access is already implemented. Reapplying the stale conflict's proposed patch would misdescribe current code.

## Classification of every unchecked conflict

D = direct chapter/ending/survival gate. I = indirect through a stat or evidence producer. P = prompt/wording/non-gating attitude; no outcome dependency demonstrated in current code or inspected sources. P is not permission to delete that prompt: the benchmark measures choices without story effects too.

| ID | Class | Verdict | State, gate, or consequence |
|---|---|---|---|
| ch04-10 | I | not settled | Alice book arrow → aliceBond/key → Todd persuasion in ch32 |
| ch06-03 | D | not settled | C05 investigation timeout → CRIME UNSOLVED versus found deviant; evidence.ortizBody/suspectTrusts downstream |
| ch09-01 | D | partially | Pressure stopping point → stress/confession → interrogation death/survival and usable clue |
| ch09-14 | D | partially | Intervention/GIVE UP → Connor shot versus android-only suicide |
| ch09-16 | P | not settled | amandaTrust only; no Amanda-level ending gate demonstrated |
| ch10-18 | I | partially | ch10RobberyNews → ch17 report/publicSupport; also potential memory eligibility (duplicate ch17-05) |
| ch10-24 | D | not settled | ch10Cutters → squat access/shelter chapter outcome |
| ch10-34 | P | not settled | Trash-collector encounter order; no demonstrated ending gate |
| ch11-05 | P | not settled | Mercy encounter availability; no demonstrated player-outcome gate |
| ch13-01 | D | not settled | C09q voluntary departure → pursuit avoided versus chase |
| ch13-29 | P | not settled | Motel bath/hair/LED sequence; no demonstrated different outcome solely from TV availability |
| ch13-36 | D | partially | Ralph gun threat flag → betrayal → pursuit/highway survival |
| ch14-05 | I | partially | Magazine wording plus shared chase-news flag → publicSupport; not purely cosmetic |
| ch15-12 | D | not settled | C10 timeout → nestRupertBody/evidence.rupertBody → ch29 sufficiency/diary route |
| ch15-14 | D | not settled | Cage/stool/LED prerequisites → finding Rupert versus NOT FOUND |
| ch15-18 | P | not settled | ch30Rupert exploration clue only; no demonstrated outcome consequence |
| ch17-01 | I | not settled | inputs.report multiplicity → publicSupport → ch32 demonstration survival |
| ch17-02 | D | partially | K13/K13a SET FIRE → house chase and Kara death/survival |
| ch17-03 | D | partially | K13c corridor skip/risk → stairs escape versus Kara killed |
| ch17-04 | D | not settled | TV memory eligibility → recovery before reset timer versus KARA RESET |
| ch17-05 | D | partially | ch10RobberyNews → TV memory and publicSupport (overlaps ch10-18) |
| ch17-06 | D | not settled | ch10RalphCarving → rA9 memory → recovery before reset timer |
| ch17-07 | D | not settled | upstairs.book/downstairs.rewash → memories → recovery before reset timer |
| ch19-02 | D | partially | M05n alarm/fence → john alive → ch28 rescue and Markus survival |
| ch19-03 | D | not settled | Fence failure after LEAVE → damaged/mission outcome; QTE risk calibration |
| ch21-01 | I | not settled | K14b TV → publicSupport → ch32 demonstration survival |
| ch23-01 | D | partially | Security wound → Simon rooftop leave/kill versus group escape → ch24/ch28/ch29 |
| ch23-02 | I | not settled | stratfordNewsTone → publicSupport → ch32 demonstration survival |
| ch25-01 | D | partially | K15w10 DOG suspicion → policeman leaves versus Luther death |
| ch25-02 | D | partially | K15w10 evidence weights/threshold → policeman leaves versus Luther death |
| ch25-03 | D | partially | Coffee/UPSET suspicion weights → same threshold and Luther survival |
| ch25-04 | D | not settled | Laundry-door suspicion weight → same threshold and Luther survival |
| ch25-05 | D | partially | K15h hiding action timer → forced door/suspicion → Luther survival |
| ch25-06 | I | not settled | K15q INSIST/LET IT GO → Alice relationship → Crossroads separation threshold |
| ch26-01 | D | partially | message(): capitolMolotov override → capitolEnding/message/publicSupport |
| ch26-02 | D | partially | readsPeaceful()/Molotov offer → available violent action and override ending |
| ch26-03 | D | not settled | message(): peacefulShare 0.6 fallback → peaceful/riot/failed chapter result |
| ch26-04 | D | partially | CP09 option.meter → capitolPeace/capitolViolence → message ending |
| ch26-07 | I | partially | Alarm northTrust arrow → Friend/romance and later rescue gates |
| ch26-08 | I | partially | Object northTrust/jerichoTrust arrows → romance/ousting gates |
| ch27-13 | P | not settled | Chris dialogue presence only; no demonstrated outcome gate |
| ch28-01 | D | partially | inputs.simonGood/John priority → rescue versus Markus killed |
| ch28-02 | I | partially | Late ATTACK simonTrust/northTrust → rescue/romance; Josh alone has no proven ending gate |
| ch28-04 | D | partially | M18g ATTACK → confirm/abandon opportunity versus immediate fight |
| ch28-06 | I | partially | M19b PUSH northTrust → relationship gates; optionality also changes offered fight actions |
| ch28-07 | I | not settled | ch28Converted/convertThreshold → jerichoTrust → Crossroads ousting |
| ch28-08 | P | not settled | Roof magazine availability only; no demonstrated outcome gate |
| ch28-09 | D | partially | M18g DISPERSE → M18h extra CHARGE/STAY choices versus immediate MARKUS FLED |
| ch29-01 | D | not settled | sufficientEvidence → decommission now versus evidence room → raid exists |
| ch29-03 | P | partially | Insufficient-evidence opening skips Amanda; Connor is permanently decommissioned, so no downstream ending gate |
| ch29-05 | D | partially | C20g QTE/risk → GAVIN DESTROYED CONNOR versus incapacitated |
| ch29-06 | D | settled | roomOpen().linkMap requires tablet → Jericho found versus decommission with Rupert/no diary |
| ch30-01 | D | partially | rules.woundsToDie/markusWounds/connorWounds → death and North rescue eligibility |
| ch30-03 | D | settled | M24-gun/markusOn returning exile → Connor/Markus duel and survivor |
| ch30-04 | D | partially | northLover persistence after M21b → ch32 kiss/Perkins/bullet gates |
| ch30-05 | D | partially | K17 aliceMax historical gate versus current aliceBond below Warm → Alice leaves/K31 solo ending |
| ch30-06 | D | not settled | K18 PROTECT ALICE → luther/ch30LutherFate → ch32 Jerry rescue/border routes |
| ch31-01 | D | partially | CN01 THIN ICE chapter outcome gate for surviving machine Connor |
| ch31-03 | D | partially | hankResigned with decommissioned Connor → hankAlive/suicide epilogue |
| ch31-05 | P | not settled | Deviant Connor CHECK ON JOSH availability; no demonstrated ending gate |
| ch32-02 | D | partially | northCompanion/store retreat → North shot versus together-store endings |
| ch32-03 | D | partially | MD14 northLover bullet interception → Markus survival versus shot |
| ch32-04 | D | partially | C24 LEAVE friend/son/insisted gate → peaceful rooftop exit versus fight/deaths |
| ch32-05 | D | not settled | Machine Connor success/RK900 epilogue eligibility after other agent kills Markus |

The complete ending-changing list is every D row above (43). The I rows are additionally relevant when comparing endings across runs. ch14-05 is deliberately promoted from its original wording-only label because its shared producer also controls a PO report. ch09-16 is deliberately excluded from ending priority because Amanda's displayed attitude has no demonstrated outcome threshold. ch29-03 is P: Amanda dialogue can move instability on other routes, but skipping it on an insufficient-evidence route has no demonstrated later effect once Connor is permanently removed. It receives an extended card because it is a useful control for the disputed sufficiency predicate.

## Evidence excerpts and exact source locations

The short quotations below are reused by reference in the per-item findings; longer full-page copies remain outside the repository. A source label's wording is evidence of text, not automatically of a numerical gate.

- **E17** — `en.json`, `X0502K.BIGROOM.GAMEOVER.PC.X05KZLATKO.FIRE.4`: “Grab them!” The namespace has fire-triggered pursuit dialogue; it does not itself prove post-fire death. See [English strings](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json), saved `sources/en.json`.
- **E25T** — [T25], noise-choice section near `X0801K.COP.INSPECTION.PC.X08KKARA.DOG`: “Policeman is fooled” / “Policeman is suspicious” are separate conditional blocks. Their text does not encode weights or a threshold.
- **E25P** — [PP25], reader comments by Stefan (2021-12-04), Simon (2020-04-03), Alvin (2023-10-24) and Damian Vixen (2020-04-10). Stefan concludes “I still fooled him.” His specified exposed-magazine/coffee/TIRED/WASHING MACHINE route matters more than a generic safe recipe. Damian reports success provoking inspection only after HEARD NOTHING. These accounts do not hold every original question variable constant.
- **E-Steam25** — [Steam Outcomes](https://steamcommunity.com/sharedfiles/filedetails/?id=2935499852), Midnight Train, web lines 394–400, describes safe DOG/WASHING MACHINE below a 70% suspicion threshold, and bad WIND/HEARD NOTHING even below it. No published meter trace or decoded flag accompanies that threshold. Saved web retrievals are `steam-web-result*.json`.
- **E26T** — [T26], `X0802M.*` message sections: the template supplies tone/news variants, not a function for the message meter. English string namespaces `GUI.MESSAGESTRENGTH.ACTIONPACIFIST`, `CONSISTENTPACIFIST`, `CONSISTENTVIOLENT`, `OUTSTANDING` distinguish kinds of feedback. Simple action counts need not equal the real meter.
- **E26P** — [PP26], Jd (2019-12-02): “my peace meter was 75%, but I got the violent riot ending”. Ravyn Black later attributes this to accepting Molotov. This is useful conflicting-path evidence, still a player report.
- **E26G** — [GameFAQs Capitol Park](https://gamefaqs.gamespot.com/ps4/182637-detroit-become-human/faqs/76123/capitol-park), Warhawk route: “tag the two benches” precedes the statue and kiosk instructions, then “REFUSE when North hands Markus a molotov.” Raw shell fetch was 403; web-index text was available. This conflicts with a one-tag cutoff, not with some larger hidden cutoff.
- **E26W** — [W26], wikitext line 91, says “at least 60% on either side”; its note also permits a pacifist-message node leading to a riot ending. Lines 107–112 distinguish speech-dependent billboards and ratio-dependent other objects. No 55/45 test is supplied.
- **E28T** — [T28], raw lines 1582, 1623, 1700-area, 1810-area: “See ATTACK.” / “See ATTACK > CONFIRM.” / “good relationship with Markus”. The post-stand DISPERSE item has dialogue only, unlike the first DISPERSE item with nested buttons. Pointers explain missing repeated arrows but do not settle every repeated menu.
- **E28W** — [WSimon], Possible Deaths/Freedom March: “at least Friend”. The chapter's Notes instead refer to Markus not being unpopular. That may conflate Jericho reputation and Simon's relationship; neither phrase is an extracted predicate.
- **E28R** — [Neutral failure account 2024](https://www.reddit.com/r/DetroitBecomeHuman/comments/1d47n5e), [Neutral failure account 2025](https://www.reddit.com/r/DetroitBecomeHuman/comments/1k93i5u), [2019 successful repaired path](https://www.reddit.com/r/DetroitBecomeHuman/comments/czju49), and [2020 fight explanation](https://www.reddit.com/r/DetroitBecomeHuman/comments/kgzipv). Accounts explicitly distinguish Neutral from positive relationship; the 2019 account increases relationship by saving/sparing roof Simon before successful rescue. PP28 comments contradict this in other runs. Save propagation and within-scene down arrows are confounds.
- **E-Steam28** — Steam Outcomes, web lines 440–448, specifies Friend/Companion for Simon's rescue and no John. It supplies no new quantitative relationship width.
- **E28N** — [Neoseeker Freedom March](https://www.neoseeker.com/detroit-become-human/walkthrough/Freedom_March), Stand Your Ground subsection: “Obtain the Markus Fled ending.” is the stated result of the next DISPERSE. The same page limits confirmation to immediate initial attack and lists late-attack relationship changes. Raw fetch 403, web text readable. It also contains a minor character-name typo in its death recipe, so it is corroboration, not a replacement for the chart.
- **E29P** — [PP29], sufficient-evidence section: “at least one deviant’s body”. This is an archive-entry assertion; a body being useless to solve Jericho does not logically refute the assertion. Comments contain reports of decommissioning despite claimed Simon evidence, without continuous-save proof.
- **E29M** — [Neoseeker Last Chance](https://www.neoseeker.com/detroit-become-human/walkthrough/Last_Chance_Connor), map subsection: “Reactivate an android and scan its memories for references to Ferndale”. [Steam archive guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3062750973), web lines 180–205, explicitly lists Rupert paired with statue and a memory scan separate from diary decryption. [W29] Notes and [PP29] comments further name Rupert; the latter reader writes “You could also scan Blue-haired Traci and Rupert’s body”. These sources agree on a generic chart link, not a new ending node.
- **E29S** — `THOUGHTS.1201C.FERNDALE.VALUE`: “CROSS REFERENCE TO FERNDALE”; `THOUGHTS.1201C.NOFERNDALE`: “NO FERNDALE REFERENCE”. The string keys distinguish memory reference work from diary-key retrieval. `GUI.ACTION.SCANMEMORY` supplies the interaction caption. No mapping of each body to each flag is in this string table.
- **E30T** — [T30M], raw line 1193: “Soldiers shoot Markus twice”; a later condition also counts two shots. [T30C] has a parallel deviant-Connor two-shot condition before arming. No source-provided float risk is present.
- **E30P** — [PP30M], first-corridor death: “The third bullet kills him”. [Steam Outcomes](https://steamcommunity.com/sharedfiles/filedetails/?id=2935499852), Crossroads, instead describes two-strike corridor failures. Existing frames show two hits on one path without establishing initial injury.
- **E30C** — [T30C], raw line 1288: “Markus is alive - Connor finds Markus”. The matching alternate condition sends Connor after North if Markus is dead or left. Current `benchmark/chapters/ch30.mjs:231` gates M24-gun by a living active Markus in the hold and machine Connor in pursuit, already allowing a returning exile.
- **E30K** — [T30K], raw line 789: “Alice relation is below WARM and choose DISTANT”. This condition uses current relation language, not maximum historic relation. Timing before/after the down arrow is not explicit.
- **E30A** — [GameFAQs Alice discussion](https://gamefaqs.gamespot.com/boards/182637-detroit-become-human/76679906), especially post 5, and [PP30K] readers discuss the large immediate relation drop. Neither supplies the Neutral-before-DISTANT control required to prove the precise threshold or remove every other conjunct.
- **E31T** — [T31C], opening condition: “Connor stayed a machine or died in Crossroads”. The nested survivor variant uses `X1303C.ZENGARDEN.BRIDGE.*` strings; their association with the next chapter makes chronology part of the dispute. The house subsection conditions on Hank's Hostile resignation but assumes Connor visiting.
- **E32T** — [T32D], raw line 1666: “Fail the QTE and have lover status with North”. The sacrifice dialogue belongs to the demonstration. Keep this distinct from North offering her heart in the revolution.
- **E32C** — [T32C], raw line 328: “Be friend with Hank”. The bracketed LEAVE item follows the son conversation structurally, so omission of a separate second-son lock is not proof that the second question is unnecessary.
- **E32R** — [RK900 player discussion](https://www.reddit.com/r/DetroitBecomeHuman/comments/bs31b5) gives direct-kill recipes and failed attempts; it does not test other-agent death. [WSecret] is broader than [TEndings].
- **E-Endings** — [TEndings], CyberLife ending condition: “Machine Connor stopped Markus”. The wiki widens the condition to Markus dying during battle without a dirty bomb. Neither wording says which internal success flag is tested.
- **E-North** — [2025 North guide and test report](https://www.reddit.com/r/DetroitBecomeHuman/comments/1n43p4u), source saved as `north-reddit-web-result.json`. Its author expressly separates provenance: > Dialogue and path unlocks I wrote from memory. Increases and decreases are from the game files. They claim a Lover floor, a first-violent-action North bonus, and larger varying arrow magnitudes, but supply no dump, file offsets or extraction script. Their reply reports a specific replay: > She was at Companion for the final mission, and she still took a bullet for Markus. They explicitly assume, rather than test, Friend. There are visible sign/number inconsistencies in the guide's Night of the Soul rows. Treat this as a strong **video lead**, not authenticated datamining or a calibrated-scale replacement.

## Wiki history and talk audit

Fetched revision metadata (up to 50 recent revisions each) for all 22 initial chapter/stat/character pages; fetched selected historical content for twelve outcome-critical pages. This is a sample of history, not every edit ever made. `history-review.txt` records matching lines and `sources/revision-*.json` stores revision metadata/content. No selected revision provides a reproducible script dump or a controlled video for the disputed thresholds.

| Page/history | Exact change in the inspected revisions | Interpretation |
|---|---|---|
| [Battle for Detroit oldid 35963](https://detroit-become-human.fandom.com/wiki/Battle_for_Detroit?oldid=35963) → [40389](https://detroit-become-human.fandom.com/wiki/Battle_for_Detroit?oldid=40389) | North bullet gate changes Lover → Friend-or-above; store rule remains Companion/Lover | A later assertion is not independent confirmation; neither selected text attaches a test to the widened gate. |
| [North oldid 40911](https://detroit-become-human.fandom.com/wiki/North?oldid=40911) versus current page | Revolution death boundary Friend-or-below → Companion-or-below; demonstration sacrifice Lover → Companion | The two pages disagree with each other as well as across time. |
| [Crossroads oldid 40391](https://detroit-become-human.fandom.com/wiki/Crossroads?oldid=40391) versus current page | Former note requires unopened memory box plus current Distant; current flowchart prose requires never reaching Neutral | Do not treat historic maximum Alice relation as primary extracted data. |
| [Capitol Park oldid 7357](https://detroit-become-human.fandom.com/wiki/Capitol_Park?oldid=7357) | Already contains the 60%-either-side footnote and pacifist-node/riot distinction | The gap for balanced acted-on meters is inherited, not solved by the claim's age. |
| Simon, Freedom March, Last Chance, Midnight Train, Luther, Alice, Nest, Night of the Soul | Selected content preserves broad outcomes but no isolated missing predicates | No new threshold was recovered from edit comments/content. |

The API's `Talk:<Title>` parse calls mostly returned `missingtitle`; Simon's talk page redirects to its image-comment discussion (`<comment-stream />`), and Hank's is a redirect. An absent talk wikitext page does not prove absence of Discussions, image comments or all historical debate. These access results are saved, not described as successful comment review. Stat-page revisions were inspected at metadata level; selected-content history focused on the twelve pages listed in the fetch log.

## Datamining/condition-string audit

Searched the entire flattened English table and the relevant raw templates for chapter IDs `08M`, `10M`, `12C`, `02A`, `X0801K`, `X0802M`, `X1001M`, `X1202C`, `X0203A`, `X0204A`, and `X1303C`, as well as Molotov, peaceful/aggressive, suspicion, Ferndale, diary, STANDGROUND/ATTACK/DISPERSE, shots, relation conditions and romance labels. Relevant exact primary keys are in E17/E26T/E28T/E29S and the per-item cards. `B/extracted/strings.tsv` preserves every key/value; template file/line citations remain stable in the downloaded copies.

Fetched [Detroit-Become-Documented asset types](https://raw.githubusercontent.com/BLiNXthetimesweeperGOD/Detroit-Become-Documented/main/formats/asset%20types.md) and [Randomizer AssetList](https://raw.githubusercontent.com/BLiNXthetimesweeperGOD/Detroit-Become-Human-Randomizer/main/AssetList.txt). The type list identifies `SCRIPT_CONTROLLER` (0x001A), `KERNEL_FLOW` (0x03F3), and `FLOW_DATA` (0x0879). The asset list is predominantly typed hexadecimal asset IDs; searching apparent chapter codes can accidentally match hexadecimal IDs and is not evidence of named state flags. **No decoded, attributable flag/counter listing answering these conflicts was found in these artifacts.** The Reddit claim above is not promoted to primary-source status merely because its author says game files.

## Per-item findings (D and I, plus the ch29-03 control)

For each entry, source aliases and evidence codes name the material actually checked. “Candidate” is a concrete from→to proposal for the orchestrator, conditional on the remaining test; it is not a claim that the proposed value has been measured. No-change entries are deliberate where text cannot discriminate the alternatives.

### ch04-10 · not settled · I

**Question.** Could you kneel to talk to Alice with both bedrooms done but the bathroom not cleaned and without looking at the Alice in Wonderland book or her shelf?

**Affected state/gate.** Alice book arrow → aliceBond/key → Todd persuasion in ch32.

**Sources checked, evidence and contradictions.** [[T4]] and [[PP4]] disagree on prerequisites; the book supplies an Alice increase and the key later unlocks Todd persuasion. Neither route is an isolated negative control.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change; retain the existing talk gate pending the specific prerequisite test.

**Still open / decisive evidence.** Complete bedrooms only, omit bathroom/book/shelf, attempt kneeling and record key/relationship.

### ch06-03 · not settled · D

**Question.** After REVIEW EVIDENCE 10/10, if you keep examining things instead of going to Hank, does Hank ever announce he is leaving (yes/no)?

**Affected state/gate.** C05 investigation timeout → CRIME UNSOLVED versus found deviant; evidence.ortizBody/suspectTrusts downstream.

**Sources checked, evidence and contradictions.** [[T6]] exposes a time unlock but does not encode its Boolean dependence on completing evidence. [[W6]] and [[PP6]] do not demonstrate a 10/10 stall.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to the investigation timeout predicate.

**Still open / decisive evidence.** Reach 10/10 before the warning, idle beyond both departure deadlines, then approach Hank.

### ch09-01 · partially · D

**Question.** Under PRESSURE IT, did the android ever confess before you had pressed PRESSURE four times (yes/no)?

**Affected state/gate.** Pressure stopping point → stress/confession → interrogation death/survival and usable clue.

**Sources checked, evidence and contradictions.** [[T9]] has a single pressure approach with nested abandonment, not four executable counter definitions. Existing frames show four presses on two paths; [[PP9]] gives no tested early termination.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** No change to four pressure prompts or stress weights.

**Still open / decisive evidence.** Enter pressure with near-optimal/high stress and record every press and confession onset.

### ch09-14 · partially · D

**Question.** After pressuring him without getting a confession, if you INTERVENE once and then GIVE UP, does the android shoot Connor (yes/no)?

**Affected state/gate.** Intervention/GIVE UP → Connor shot versus android-only suicide.

**Sources checked, evidence and contradictions.** [[T9]] label omissions cannot remove observed GIVE UP buttons. [[PP9]] describes android suicide after giving up, but not the requested failed-pressure + one-intervention history.

**Verdict/confidence.** partially; low.

**Benchmark change implied.** No change to the failed-pressure death branch; preserve observed buttons.

**Still open / decisive evidence.** Fail pressure, intervene once, then GIVE UP; record who is shot and the chart.

### ch10-18 · partially · I

**Question.** In Zlatko, did the TV report on Kara robbing the store play when she had got the money only through Alice's can diversion, with no gun (yes/no)?

**Affected state/gate.** ch10RobberyNews → ch17 report/publicSupport; also potential memory eligibility (duplicate ch17-05).

**Sources checked, evidence and contradictions.** [[T17]] groups robbery news by clothing, while its broadcast script describes a gun hold-up; that wording does not prove diversion theft raises ch10RobberyNews. Overlaps ch17-05.

**Verdict/confidence.** partially; low.

**Benchmark change implied.** No change; do not infer a gun from the report wording or a theft flag from the generic template condition.

**Still open / decisive evidence.** Use diversion without drawing any gun, watch Zlatko TV both reset and unreset, note report/memory/PO.

### ch10-24 · not settled · D

**Question.** Could Kara pick up the pliers on the parking-lot generator before she had looked at the squat's fence (yes/no)?

**Affected state/gate.** ch10Cutters → squat access/shelter chapter outcome.

**Sources checked, evidence and contradictions.** [[T10]] and the chart group wire cutters together; [[PP10]] distinguishes parking-lot tools from shop tools. No exact pre-fence pickup demonstration.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to free parking-lot pliers availability.

**Still open / decisive evidence.** Attempt generator pliers immediately, before approaching the squat fence.

### ch13-01 · not settled · D

**Question.** As Connor searching the squat (Ralph kept quiet), could you walk out on your own before Hank ordered you out, and did that unlock a LEAVE THE SQUAT node? (yes/no)

**Affected state/gate.** C09q voluntary departure → pursuit avoided versus chase.

**Sources checked, evidence and contradictions.** [[T13]]/string node existence is compatible with cut/patched content. [[PP13]] comments report an unreachable leave node; no current-patch successful path was found.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No removal of C09q option 6 solely from failed attempts.

**Still open / decisive evidence.** On a current Experienced save with Ralph silent, attempt voluntary exit before Hank interrupts.

### ch13-36 · partially · D

**Question.** If Kara threatened Ralph with the gun in Fugitives but was kind at the table in On the Run, did Ralph give her away to Connor ('She ran out the back door!')? (yes/no)

**Affected state/gate.** Ralph gun threat flag → betrayal → pursuit/highway survival.

**Sources checked, evidence and contradictions.** [[T13]] condition wording does not identify which chapter supplied the threat. [[PP13]] locates it at the breakfast table; [[W13]]/character wording can include any prior threat.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** No change; candidate is tableThreatened → tableThreatened OR ch10 gunThreatened, but only after a control.

**Still open / decisive evidence.** Threaten only in Fugitives, be kind at breakfast, have Connor question Ralph.

### ch14-05 · partially · I

**Question.** In a run where Connor stood still and Kara & Alice VANISHED in On the Run, which cover was on the Ferndale bench in Jericho: 'Android on the Run!' or 'Fortune Teller'?

**Affected state/gate.** Magazine wording plus shared chase-news flag → publicSupport; not purely cosmetic.

**Sources checked, evidence and contradictions.** The magazine label is secondary; the chase-report producer also changes PO. Existing notes/pages conflict between any police pursuit and freeway pursuit. A cover alone does not establish that a TV arrow occurred.

**Verdict/confidence.** partially; low.

**Benchmark change implied.** No change; test magazine and ch17 news separately rather than propagating one guessed flag to both.

**Still open / decisive evidence.** Make Kara/Alice VANISH after pursuit starts; inspect the bench magazine and Zlatko TV.

### ch15-12 · not settled · D

**Question.** At the ledge, if you pressed neither SAVE HANK nor CHASE DEVIANT, which ending did you get: RUPERT COMMITTED SUICIDE or RUPERT GOT AWAY?

**Affected state/gate.** C10 timeout → nestRupertBody/evidence.rupertBody → ch29 sufficiency/diary route.

**Sources checked, evidence and contradictions.** [[T15]] omits the timeout branch; [[W15]] documents much larger Hank/SI decreases but does not name the ending. Neither source proves that failing to choose is chasing.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change; candidate C10 timeout nestRupert='suicide'/body=true → escaped/body=false only if observed.

**Still open / decisive evidence.** Let the roof decision expire, read chart, then inspect evidence room in a continuous run.

### ch15-14 · not settled · D

**Question.** Could you look up from the chair and find Rupert after reconstructing only the bird cage, without having done the stool reconstruction or examined the LED in the sink? (yes/no)

**Affected state/gate.** Cage/stool/LED prerequisites → finding Rupert versus NOT FOUND.

**Sources checked, evidence and contradictions.** [[T15]]/[[W15]]/[[PP15]] describe all investigation clues but do not isolate the cage prerequisite. The chart places the stool below rA9, not a universal explicit prerequisite.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to cage-only eligibility.

**Still open / decisive evidence.** Reconstruct cage only, omit stool and sink LED, look upward from the chair before timeout.

### ch17-01 · not settled · I

**Question.** On a run where Kara robbed the store in her uniform (Fugitives) AND was chased by Connor (On the Run), did Zlatko's TV show both news reports (two public-opinion down arrows) or only one?

**Affected state/gate.** inputs.report multiplicity → publicSupport → ch32 demonstration survival.

**Sources checked, evidence and contradictions.** [[T17]] uses separate conditioned news groups, which permits but does not prove consecutive playback; [[W17]] describes alternative reports. Both-vs-one affects the PO total.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to inputs.report single-report selection.

**Still open / decisive evidence.** Uniform robbery plus freeway escape, turn TV on and leave it running through a complete cycle with popups visible.

### ch17-02 · partially · D

**Question.** After SET FIRE in the main room, could Kara still get spotted/chased (or killed), or did the game always cut straight to the stairs and the yard?

**Affected state/gate.** K13/K13a SET FIRE → house chase and Kara death/survival.

**Sources checked, evidence and contradictions.** E17 and the existing fire video establish pursuit after fire. A GAMEOVER string namespace is not proof of an executable death branch; the ending chart does not supply a fire-specific death probability.

**Verdict/confidence.** partially; high for chase; low for death.

**Benchmark change implied.** Candidate K13/K13a SET FIRE direct yard → observed house-chase sequence; do not invent a risk or post-fire death.

**Still open / decisive evidence.** After setting fire, fail a clearly identified pursuit QTE, record any death and complete chart.

### ch17-03 · partially · D

**Question.** From the upstairs corridor (after the bedroom), can Kara skip the bathroom and run straight down the stairs, and if so, was there a separate prompt or did it just happen by walking past the bathroom door?

**Affected state/gate.** K13c corridor skip/risk → stairs escape versus Kara killed.

**Sources checked, evidence and contradictions.** The already-recorded chart edge from corridor to stairs outranks prose that discusses only the bathroom. Neither [[T17]] nor [[PP17]] proves a 0.30 death roll for walking past it.

**Verdict/confidence.** partially; high for edge; low for prompt/risk.

**Benchmark change implied.** Keep corridor skip; leave its 0.30 risk marked calibration, not a sourced value.

**Still open / decisive evidence.** Traverse corridor without entering bathroom, record interaction label and failure possibility.

### ch17-04 · not settled · D

**Question.** On a reset run where Kara robbed the store but was never chased by Connor, did switching on the big-room TV count as a memory (SEE NEWS FLASH OF ESCAPE)?

**Affected state/gate.** TV memory eligibility → recovery before reset timer versus KARA RESET.

**Sources checked, evidence and contradictions.** [[T17]]'s news-memory section does not disambiguate robbery-only news. [[W17]] allows robbery or chase; [[PP17]] restricts to freeway. This affects recovery and the reset ending.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to house() TV-memory eligibility.

**Still open / decisive evidence.** Reset after a robbery-only, never-chased run; watch TV and measure recovery progress.

### ch17-05 · partially · D

**Question.** If Kara got the money by USE ALICE AS A DIVERSION > STEAL DISCREETLY (no gun), did Zlatko's TV still show a supermarket-robbery report?

**Affected state/gate.** ch10RobberyNews → TV memory and publicSupport (overlaps ch10-18).

**Sources checked, evidence and contradictions.** Same unresolved source wording as ch10-18. This is direct outcome-relevant as well as PO-relevant because an eligible broadcast may supply a memory.

**Verdict/confidence.** partially; low.

**Benchmark change implied.** No change to ch10RobberyNews or inputs.report.

**Still open / decisive evidence.** The diversion-only TV experiment specified under ch10-18, including memory progress.

### ch17-06 · not settled · D

**Question.** On a reset run where Kara stayed in the squat but never asked Ralph about the symbols he was carving, did the storage-room corner still give the rA9 memory?

**Affected state/gate.** ch10RalphCarving → rA9 memory → recovery before reset timer.

**Sources checked, evidence and contradictions.** [[T17]]'s memory arrangement, [[W17]]'s carving predicate and [[PP17]]'s broader squat predicate do not identify whether just seeing Ralph counts as seeing the symbols.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to inputs.carving using ch10RalphCarving.

**Still open / decisive evidence.** Sleep in squat but never ask about carving; reset and inspect the storage-room symbol.

### ch17-07 · not settled · D

**Question.** On a reset run, did the book on the big-room chair (or the pipe in the storage room) give a memory even though Kara never looked at Alice's book (or never re-washed Todd's clothes) in A New Home?

**Affected state/gate.** upstairs.book/downstairs.rewash → memories → recovery before reset timer.

**Sources checked, evidence and contradictions.** [[T17]] identifies both memory objects; [[W17]] imposes prior book/laundry experiences. [[PP17]] omission of conditions is not affirmative proof that those conditions do not exist.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to inputs.book/pipe.

**Still open / decisive evidence.** Skip the original book and rewash independently; reset and inspect each object with memory progress visible.

### ch19-02 · partially · D

**Question.** After the guards raised the alarm in the control room, did the group ever get over the fence without the dogs catching John?

**Affected state/gate.** M05n alarm/fence → john alive → ch28 rescue and Markus survival.

**Sources checked, evidence and contradictions.** [[PP19]] confirms dog danger after an alarm and offers a successful fence outcome, but does not prove the dog can be bypassed with John recruited after this particular control-room alarm. [[W19]] nesting and crossing chart edges remain ambiguous.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** No change to mandatory dog handling on the recruited-John alarm route.

**Still open / decisive evidence.** Accept John, trigger only the control-room alarm, sprint cleanly to fence; inspect John later.

### ch19-03 · not settled · D

**Question.** After LEAVE at the truck-key question (no alarm), could Markus still be too slow at the fence and get damaged?

**Affected state/gate.** Fence failure after LEAVE → damaged/mission outcome; QTE risk calibration.

**Sources checked, evidence and contradictions.** [[T19]] nests delay under detection. [[PP19]] describes damage on alarm escape; it does not show the clean LEAVE case. The benchmark's 0.08 is not source-derived.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No forced removal of LEAVE risk; keep it explicitly calibrated.

**Still open / decisive evidence.** Refuse key without alarm and stand still at the fence until capture/damage or safe completion.

### ch21-01 · not settled · I

**Question.** In the car, with Zlatko's house NOT burned, did a Public Opinion ↓ popup appear at any point while you watched the TV news (yes/no)?

**Affected state/gate.** K14b TV → publicSupport → ch32 demonstration survival.

**Sources checked, evidence and contradictions.** [[T21]] supplies a PO arrow in the fire-conditioned report, while [[W21]] and Public_Opinion additionally attribute one to switching on news. No non-fire observation establishes two distinct causes.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No additional or removed K14b PO delta.

**Still open / decisive evidence.** Watch car TV with no house fire and record complete popup window.

### ch23-01 · partially · D

**Question.** On a run with ASSAULT > shoot the guard on the phone (Simon is shot), the server door locked and the operator shot (so no SWAT team), did the roof scene 'Simon can't continue' with LEAVE / KILL appear (yes/no)?

**Affected state/gate.** Security wound → Simon rooftop leave/kill versus group escape → ch24/ch28/ch29.

**Sources checked, evidence and contradictions.** [[T23]] nests the roof help prompt under SWAT. [[PP23]] and [[W23]]/Simon say security wounds also prevent jumping; Steam Outcomes explicitly lists the left-guard injury as a left-behind route (E-Steam23). This is stronger than a generic walkthrough recipe, but lacks a full controlled clip.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Candidate securityWounded AND noSWAT → roof LEAVE/KILL instead of THE GROUP ESCAPED; do not implement from nesting alone.

**Still open / decisive evidence.** Shoot phone guard, lock server door, shoot fleeing employee; record roof and Simon's chart ending.

### ch23-02 · not settled · I

**Question.** With nobody killed, BEGIN CALMLY and END DETERMINEDLY: did Public Opinion go up at Media Reacts (yes/no)? (A 'no' means the ending drives the tone line, as built.)

**Affected state/gate.** stratfordNewsTone → publicSupport → ch32 demonstration survival.

**Sources checked, evidence and contradictions.** [[T23]]'s tone condition ambiguously references calm opening/determined labels; [[W23]]/Public_Opinion say ending tone, and [[PP23]] gives a combined peaceful recipe. No mixed speech is tested.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to ending-based stratfordNewsTone or PO.

**Still open / decisive evidence.** CALM opening + DETERMINED ending + no casualties, record media reaction and PO.

### ch25-01 · partially · D

**Question.** With every piece of evidence hidden, coffee made, ALICE and TIRED answered, if you answer DOG to the laundry-room noise, does the officer open the laundry room (yes/no)?

**Affected state/gate.** K15w10 DOG suspicion → policeman leaves versus Luther death.

**Sources checked, evidence and contradictions.** E25P readers report safe DOG answers, so DOG is not an unconditional failure. E-Steam25 also distinguishes safe answers from bad ones by incoming suspicion, but no fully controlled all-hidden DOG reading is supplied.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Keep all-hidden DOG safe; do not promote current noise weight 2 or threshold 3 to facts.

**Still open / decisive evidence.** All evidence hidden, coffee, ALICE/TIRED, DOG, full meter visible.

### ch25-02 · partially · D

**Question.** With no evidence hidden (door opened in time, Luther and Alice upstairs), does WASHING MACHINE still make the officer leave (yes/no)?

**Affected state/gate.** K15w10 evidence weights/threshold → policeman leaves versus Luther death.

**Sources checked, evidence and contradictions.** E25P includes an unusually specific reader test: evidence left out, magazine deliberately android-facing, coffee/TIRED/WASHING MACHINE and police leave. This directly challenges automatic failure after three exposed items. Steam's percentage rule differs from the benchmark's unit weights.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Candidate rules.suspicion: exposedItems>=3 always fails → safety can be recovered by coffee/responses; numeric replacement remains unmeasured, so no drop-in rule is justified.

**Still open / decisive evidence.** Reproduce the exact zero-hidden, timely door, upstairs + WASHING MACHINE setup with meter readings after each event.

### ch25-03 · partially · D

**Question.** In one replay with the meter on screen: does skipping the coffee raise it, and does UPSET (instead of TIRED) raise it (yes/no for each)?

**Affected state/gate.** Coffee/UPSET suspicion weights → same threshold and Luther survival.

**Sources checked, evidence and contradictions.** [[PP25]] recipes plus the detailed reader account make coffee reducing suspicion plausible. [[T25]] provides alternative coffee dialogue but no weights; Gamepur even recommends UPSET, conflicting with the benchmark's penalty.

**Verdict/confidence.** partially; medium for coffee; low for UPSET.

**Benchmark change implied.** No numeric weight changes. Candidate noCoffee +1 → measured coffee decrement; UPSET +1 → measured value only.

**Still open / decisive evidence.** Record numerical/bar change on coffee and compare TIRED versus UPSET from identical checkpoint states.

### ch25-04 · not settled · D

**Question.** With everything else hidden and the laundry-room door left open, does the officer still leave after WASHING MACHINE (yes/no)?

**Affected state/gate.** Laundry-door suspicion weight → same threshold and Luther survival.

**Sources checked, evidence and contradictions.** The completed chart includes the laundry-door action but no dedicated discovery node; [[T25]] does not assign a meter contribution. A visible open door is not proof of +1.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to K15w10 open-door +1.

**Still open / decisive evidence.** Everything hidden except door, WASHING MACHINE, show meter and outcome.

### ch25-05 · partially · D

**Question.** Moving deliberately, how many of the hiding actions (cover, blood cupboard, clothes, laundry door, tell Luther, curtain, Adam) can you finish before the officer insists (a number)?

**Affected state/gate.** K15h hiding action timer → forced door/suspicion → Luther survival.

**Sources checked, evidence and contradictions.** [[PP25]] specifies about fifty seconds; existing frames confirm a timed budget. This does not yield six actions because movement and animation times vary.

**Verdict/confidence.** partially; high for seconds; low for actions.

**Benchmark change implied.** Keep HIDE_BUDGET 7 explicitly as adaptation; do not call it an extracted maximum.

**Still open / decisive evidence.** Time each feasible hiding order; count completed actions before forced opening.

### ch25-06 · not settled · I

**Question.** After TAKE ALICE OUTSIDE (PREVENT ALICE SEEING MARY), can Kara still sit with Alice by the fire and get the INSIST / LET IT GO prompt (yes/no)?

**Affected state/gate.** K15q INSIST/LET IT GO → Alice relationship → Crossroads separation threshold.

**Sources checked, evidence and contradictions.** [[T25]] and [[PP25]] list the conversation without a Mary gate, [[W25]]'s chart list adds one. Availability affects Alice arrows, so it is not wording-only.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to K15q STAY gate.

**Still open / decisive evidence.** Take Alice outside, then approach fireplace and attempt INSIST/LET IT GO.

### ch26-01 · partially · D

**Question.** Take North's Molotov at the pavilion first, then do only peaceful actions until the sirens: is the ending MARKUS LED A VIOLENT RIOT (yes/no)?

**Affected state/gate.** message(): capitolMolotov override → capitolEnding/message/publicSupport.

**Sources checked, evidence and contradictions.** E26P reports a riot despite a strongly peaceful meter after taking Molotov; multiple comments agree. The chart allows peaceful-message presentation to coexist with a riot ending, but does not specify a Molotov Boolean override.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Retain message() capitolMolotov==='taken' override provisionally; no new change.

**Still open / decisive evidence.** Take Molotov first, only peaceful acts thereafter, show final meter and ending tile in one recording.

### ch26-02 · partially · D

**Question.** Tag one object, then walk to the pavilion: does North still offer the Molotov (yes/no)?

**Affected state/gate.** readsPeaceful()/Molotov offer → available violent action and override ending.

**Sources checked, evidence and contradictions.** E26G's concrete guide route tags benches and statue before reaching kiosk and refusing Molotov. That conflicts with suppressing it after one peaceful act. [[T26]] has no count; [[W26]] says only enough peaceful actions, not 60% specifically.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** Candidate readsPeaceful()-based suppression → measured count/strength gate. Do not substitute an invented count.

**Still open / decisive evidence.** Tag exactly one object then visit untouched pavilion, recording offered choice; repeat with increasing tags.

### ch26-03 · not settled · D

**Question.** If the meter ends about 55% peaceful / 45% violent (no Molotov), which ending plays: PEACEFUL PROTEST, VIOLENT RIOT, or FAILED TO DELIVER?

**Affected state/gate.** message(): peacefulShare 0.6 fallback → peaceful/riot/failed chapter result.

**Sources checked, evidence and contradictions.** [[W26]]'s 60%-either-side footnote leaves the middle interval undefined. [[PP26]] gives a 60/40 success example, not a 55/45 test. The complete chart has three message endings but no printed numeric cutoffs.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to message() p/(p+v)>=0.6 fallback. Mark 55/45→aggressive as unverified.

**Still open / decisive evidence.** Achieve a non-Molotov meter strictly between forty and sixty, wait for completion, show chart and tone.

### ch26-04 · partially · D

**Question.** With the meter on screen, does FREE ANDROIDS IN SHOP WINDOWS push it toward violent, and does HACK BILLBOARDS (after a peaceful tower speech) push it toward violent (yes/no each)?

**Affected state/gate.** CP09 option.meter → capitolPeace/capitolViolence → message ending.

**Sources checked, evidence and contradictions.** Existing window video confirms violent direction; [[T26]] is sparse on objects. [[W26]] says billboards depend on prior speech, lights/banner on current ratio. Correction 2026-11-09: qSR8t-LJuZs shows DEPLOY BANNER, with the billboard group still padlocked at 09:52; withdraw its earlier filmed-billboard attribution. Shop-window violent direction remains supported; speech-dependent billboard behavior remains a written hypothesis, without an isolated filmed delta. See `docs/research/video-leads/ending-conflicts-pass4-ch17-27.md#ch26-04` and `docs/research/video-evidence/ch26/ch26-04-qSR8t-LJuZs-09-52.png`.

**Verdict/confidence.** partially; high for windows; billboard video attribution withdrawn 2026-11-09, with the written conditional hypothesis still unverified.

**Benchmark change implied.** Candidate CP09 both billboard variants meter='violent' → peaceful if peaceful Stratford speech, violent if aggressive; retain window direction; validate condition before applying.

**Still open / decisive evidence.** Record Stratford speech then billboard meter delta in one continuous save; repeat aggressive speech.

### ch26-07 · partially · I

**Question.** Destroy the drone first, then deactivate the alarm: does a North ▲ popup appear at the alarm (yes/no)?

**Affected state/gate.** Alarm northTrust arrow → Friend/romance and later rescue gates.

**Sources checked, evidence and contradictions.** Existing hide-first alarm arrow does not test destroy-first. [[W26]]/Relationship_Stat support an alarm increase; [[T26]] arrows attach only to hide branches.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** No change to North +1 on destroy-first alarm.

**Still open / decisive evidence.** Destroy drone successfully, then deactivate alarm with popup area visible.

### ch26-08 · partially · I

**Question.** Overturn a bench and then a car: do you get two separate North ▲ popups (yes/no), and does freeing the shop-window androids show a Jericho ▲?

**Affected state/gate.** Object northTrust/jerichoTrust arrows → romance/ousting gates.

**Sources checked, evidence and contradictions.** Existing frames establish bench North-up and shop-window Jericho-up, not a separate car-up. The North guide E-North claims a first-violent-action bonus, but supplies no script and also lists object bonuses.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** Keep per-object current arrows provisionally; candidate bench/car repeated North +1 → first-violent-only only after isolated measurements.

**Still open / decisive evidence.** Bench then car before any Molotov prompt, show all North popups; separately free windows.

### ch28-01 · partially · D

**Question.** With John not recruited and Simon alive at Neutral, does Simon give his life for Markus after SACRIFICE (yes/no)?

**Affected state/gate.** inputs.simonGood/John priority → rescue versus Markus killed.

**Sources checked, evidence and contradictions.** E28T says good relationship, E28W's character page says Friend, E-Steam28 specifies Friend/Companion. E28R includes two explicit Neutral-failed accounts; [[PP28]] contains contradictory Neutral-success anecdotes. Stand/attack losses can themselves lower Simon before the rescue; chapter-start band is not enough.

**Verdict/confidence.** partially; medium-high for Friend rule, not exact disputed Neutral.

**Benchmark change implied.** Retain inputs.simonGood >= SIMON_FRIEND and John priority; do not add a Jericho predicate from ambiguous wiki wording.

**Still open / decisive evidence.** No John; show Simon band immediately before rescue after all option deltas, not only chapter start; hold Jericho high.

### ch28-02 · partially · I

**Question.** After STAND GROUND, choose ATTACK: do you see North ▲, Josh ▼▼ and Simon ▼ popups (yes/no)?

**Affected state/gate.** Late ATTACK simonTrust/northTrust → rescue/romance; Josh alone has no proven ending gate.

**Sources checked, evidence and contradictions.** [[T28]]'s late-attack pointers reuse earlier attack text; [[W28]] lists North up/Josh large-down/Simon down for all late attacks, and Neoseeker explicitly corroborates those branches. A missing local arrow beside a pointer is weak negative evidence.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Candidate late charge calls from M18g/M18h/M19a: no relation deltas → North +1, Josh -2, Simon -1 once per committed attack; avoid double counting initial CONFIRM.

**Still open / decisive evidence.** Record late ATTACK/CHARGE popups and Simon band; apply shared entry effect only if observed.

### ch28-04 · partially · D

**Question.** After a first STAND GROUND, does choosing ATTACK ask CONFIRM / ABANDON again (yes/no)?

**Affected state/gate.** M18g ATTACK → confirm/abandon opportunity versus immediate fight.

**Sources checked, evidence and contradictions.** E28T's pointer from SHOOTINGCHOICE.ATTACK goes to See ATTACK, but other pointers jump straight to CONFIRM. Neoseeker says the confirmation exists only on initial attack. The chart collapses these dialogue prompts.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** Keep M18g ATTACK → immediate charge provisionally; candidate → confirm state only if video shows second menu.

**Still open / decisive evidence.** STAND GROUND once, then ATTACK, with all button menus visible.

### ch28-06 · partially · I

**Question.** In the charge, is shoving North clear (Push) an optional prompt that appears on every fight and shows North ▲ when pressed (yes/no)?

**Affected state/gate.** M19b PUSH northTrust → relationship gates; optionality also changes offered fight actions.

**Sources checked, evidence and contradictions.** GUI Push and [[W28]]/E-North support the action and increase. Existing frames show an intervention prompt, but neither universal occurrence nor successful arrow is established.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** No change to M19b PUSH option/+1; its universality remains an adaptation.

**Still open / decisive evidence.** Repeat fight with varied prior branch and complete Push, show North arrow separately from fight outcome.

### ch28-07 · not settled · I

**Question.** Converting only the mall androids, the street androids and the first recruit (no conversions during the march): does the Jericho ▲ still pop (yes/no)?

**Affected state/gate.** ch28Converted/convertThreshold → jerichoTrust → Crossroads ousting.

**Sources checked, evidence and contradictions.** [[W28]] says roughly ten conversions during the march; [[T28]] gives no numeric counter. Neoseeker locates the Jericho increase among street-side march conversions. Pre-march group sizes in rules are assumptions.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No exact replacement. Candidate convert() all chapter count → march-only counted recruits, after controlled threshold measurement.

**Still open / decisive evidence.** Convert only pre-march androids; avoid all optional march conversion prompts; show Jericho popup timeline.

### ch28-09 · partially · D

**Question.** After a first STAND GROUND, does choosing DISPERSE lead to the police opening fire with CHARGE / STAY / DISPERSE offered (yes/no)?

**Affected state/gate.** M18g DISPERSE → M18h extra CHARGE/STAY choices versus immediate MARKUS FLED.

**Sources checked, evidence and contradictions.** [[T28]]'s post-stand DISPERSE contains dialogue only, unlike the first DISPERSE branch that nests CHARGE/STAY/DISPERSE. Neoseeker explicitly maps post-stand DISPERSE to Markus Fled. The chart pools eventual flight and cannot establish an extra decision round.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Candidate M18g v===2: ch28Plaza='openFire' → fled(s), with flight deltas applied once; preserve initial M18e DISPERSE → M18h.

**Still open / decisive evidence.** STAND GROUND then DISPERSE and show whether any extra button menu occurs before ending.

### ch29-01 · not settled · D

**Question.** With Carlos' android dead but Rupert escaped, the Tracis spared, Simon alive and the Stratford deviant escaped, did Fowler's office lead to the evidence room (yes) or straight to decommissioning (no)?

**Affected state/gate.** sufficientEvidence → decommission now versus evidence room → raid exists.

**Sources checked, evidence and contradictions.** E29P says any body, including Carlos, suffices. Carlos is unusable for Jericho but that does not logically prove the archive-entry test computes solvability. E29R also contains false-negative-looking reports with Simon evidence, possibly checkpoint contamination. No exact Carlos-only run was found.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** Keep sufficientEvidence(any body); do not replace it with evidenceRoutes solubility without a controlled run.

**Still open / decisive evidence.** Carlos dead without trust clue, Rupert escaped, Tracis spared, Simon alive, kitchen deviant escaped, no Kamski key; follow continuously to office.

### ch29-03 · partially · P

**Question.** On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)?

**Affected state/gate.** Insufficient-evidence opening skips Amanda; Connor is permanently decommissioned, so no downstream ending gate.

**Sources checked, evidence and contradictions.** [[W29]] explicitly skips Amanda when insufficient; E-Steam29's overview also says chapter ends immediately. Existing two openings favour that rule, but one is an edited compilation and neither shows every prerequisite.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Candidate C19a-e unconditionally offered → gate before garden on !kamskiLocation && !sufficientEvidence; no change until sufficiency predicate controlled.

**Still open / decisive evidence.** Record prior chapter end through Last Chance start without edits, with known insufficient evidence.

### ch29-05 · partially · D

**Question.** In the archive fight with Gavin, does missing a single QTE prompt lose the fight (yes), or can you miss one or two and still win (no)?

**Affected state/gate.** C20g QTE/risk → GAVIN DESTROYED CONNOR versus incapacitated.

**Sources checked, evidence and contradictions.** [[W29]] says the first miss wounds Connor and [[PP29]] says most sequences, undermining an all-or-nothing single-miss interpretation. The benchmark already represents the whole QTE as calibrated risk 0.25 rather than individual prompts.

**Verdict/confidence.** partially; medium-high for tolerance, low for number.

**Benchmark change implied.** Keep C20g 0.25 explicitly calibrated; no sourced prompt-count model.

**Still open / decisive evidence.** Miss exactly first QTE then complete remaining inputs; repeat with two misses on Experienced.

### ch29-06 · settled · D

**Question.** With the statue map but no Jericho tablet, could you link the map to a reactivated android's memory (e.g. Rupert's) and locate Jericho (yes/no)?

**Affected state/gate.** roomOpen().linkMap requires tablet → Jericho found versus decommission with Rupert/no diary.

**Sources checked, evidence and contradictions.** E29M gives specific memory-scan recipes, independently corroborated by wiki notes and [[PP29]] reader reports naming Rupert. Primary HUD strings distinguish a Ferndale-reference scan from diary decryption. [[T29]]'s tablet path is not an explicit exclusivity condition; the chart names a generic link action.

**Verdict/confidence.** settled; medium-high, text-supported.

**Benchmark change implied.** C20 roomOpen.linkMap: d.map && x.tablet → d.map && (x.tablet OR a repaired/scannable Rupert/Traci/Simon/kitchen body), consuming the memory-scan action; use route-specific narration, no new random risk. Start with Rupert/no diary to cover the queried hole.

**Still open / decisive evidence.** A no-tablet/no-diary Rupert recording would upgrade runtime confidence; verify individual bodies and whether repair is mandatory before generalizing all.

### ch30-01 · partially · D

**Question.** As Markus in the raid corridors, did the second bullet hit kill him (yes), or did he survive two hits and die on the third (no)?

**Affected state/gate.** rules.woundsToDie/markusWounds/connorWounds → death and North rescue eligibility.

**Sources checked, evidence and contradictions.** E30T describes two shots, while E30P says three. E-Steam30 explicitly describes two-strike corridor failures; existing video has two visible hits but unknown prior injury. These may count different hits/locations.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** Retain woundsToDie=2; do not globally switch to three from the walkthrough alone.

**Still open / decisive evidence.** Fresh corridor checkpoint with zero wounds, record each wrong-way hit and resulting flags/chart; distinguish combat wounds.

### ch30-03 · settled · D

**Question.** As an ousted Markus who went back to Jericho while Connor stayed a machine, did Connor confront Markus in the engine control room (the reach-the-gun QTE)?

**Affected state/gate.** M24-gun/markusOn returning exile → Connor/Markus duel and survivor.

**Sources checked, evidence and contradictions.** E30C's alive/found-Markus hold condition includes a returning exile and chart sends returning Markus onward. Current ch30.mjs M24-gun uses markusOn and pursuit, not cabin leader. The conflict entry describes old code.

**Verdict/confidence.** settled; high for benchmark discrepancy already fixed; medium for full in-game gate.

**Benchmark change implied.** No new benchmark change: stale leader==='Markus' prerequisite → already removed. Keep returning-exile M24-gun access.

**Still open / decisive evidence.** For game-level closure, return as exile with machine Connor and record the engine-room duel; do not reapply an already-present patch.

### ch30-04 · partially · D

**Question.** After choosing DON'T KISS in Crossroads, was KISS NORTH still offered in Battle for Detroit?

**Affected state/gate.** northLover persistence after M21b → ch32 kiss/Perkins/bullet gates.

**Sources checked, evidence and contradictions.** [[T30M]] gives a large down for refusing a kiss but does not say romance ends. E-North explicitly claims Lover is locked and supplies a file-value claim without dump. The exact downstream KISS test is absent.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** Keep persistent northLover on M21b DON'T KISS. No new numeric or romance-loss rule.

**Still open / decisive evidence.** Become Lover, DON'T KISS, survive and inspect ch32 final KISS availability with relationship header visible.

### ch30-05 · partially · D

**Question.** With Alice at Neutral (above Distant but below Warm), did choosing DISTANT in Crossroads make Alice walk away when the raid began?

**Affected state/gate.** K17 aliceMax historical gate versus current aliceBond below Warm → Alice leaves/K31 solo ending.

**Sources checked, evidence and contradictions.** E30K explicitly says below Warm plus DISTANT. [[W30]] instead requires a history never reaching Neutral; an older wiki revision 40391 used current Distant plus no memory-box, showing gate prose drift. E30A player accounts favour current relationship, but are not a Neutral control.

**Verdict/confidence.** partially; high for specification conflict; low-medium for exact runtime threshold.

**Benchmark change implied.** Source-priority correction candidate K17: v===1 && aliceMax<ALICE_KEY → v===1 && current Alice relation below Warm. Evaluate timing relative to DISTANT's delta explicitly; never use aliceMax as a substitute for current relation.

**Still open / decisive evidence.** Start Neutral (previously reached Neutral), choose DISTANT, show before/after band and departure; compare Warm boundary.

### ch30-06 · not settled · D

**Question.** If Kara chose PROTECT ALICE and left Luther in the corridor, did Luther reappear in Battle for Detroit (FIND LUTHER & JERRY)?

**Affected state/gate.** K18 PROTECT ALICE → luther/ch30LutherFate → ch32 Jerry rescue/border routes.

**Sources checked, evidence and contradictions.** [[WLuther]] explicitly says he is not seen again and death is unconfirmed when abandoned. [[T30K]] narrates presumed death; T32 only gates on alive, which does not prove this path preserves life.

**Verdict/confidence.** not settled; low-medium.

**Benchmark change implied.** Keep K18 PROTECT ALICE luther=false as operational fate; wording should avoid claiming a witnessed death. No resurrection based on an unconfirmed death.

**Still open / decisive evidence.** Abandon at initial corridor wound, survive to streets, inspect Luther/Jerry captive location without skipping chapters.

### ch31-01 · partially · D

**Question.** If a machine Connor survived Crossroads by shooting Markus, did Night of the Soul show Connor with Amanda in the snowy Zen Garden (THIN ICE)?

**Affected state/gate.** CN01 THIN ICE chapter outcome gate for surviving machine Connor.

**Sources checked, evidence and contradictions.** E31T explicitly includes surviving machine Connor, but uses X1303C strings associated with Battle for Detroit. [[W31]]/[[PP31]] put Thin Ice on a replacement Connor path, so template placement alone cannot date the scene.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** No change to CN01 yet; candidate death-only gate → machine survivor OR death only if chronology shown.

**Still open / decisive evidence.** Machine Connor shoots Markus in Crossroads; record chapter transitions through Amanda scene and title/flowchart.

### ch31-03 · partially · D

**Question.** If Hank resigned in Last Chance, Connor and Connor was then decommissioned there, did Hank still end up dead (HANK COMMITTED SUICIDE on Night of the Soul's chart or Hank absent later)?

**Affected state/gate.** hankResigned with decommissioned Connor → hankAlive/suicide epilogue.

**Sources checked, evidence and contradictions.** E31T conditions the house on resignation but assumes a visiting Connor. Existing Kamski vignette establishes offscreen Hank suicide can be narrated without Connor; it does not establish this exact archive decommissioning history.

**Verdict/confidence.** partially; low.

**Benchmark change implied.** No change to automatic Hank fate; candidate Connor absent + hankResigned → later suicide narration only if matched path exists.

**Still open / decisive evidence.** Have Hank resign, time out archive, continue without Connor; record Kamski vignette/Hank references.

### ch32-02 · partially · D

**Question.** When the assault failed with North at Companion (not Lover), did she take shelter in the store with Markus (yes) or get shot (no)?

**Affected state/gate.** northCompanion/store retreat → North shot versus together-store endings.

**Sources checked, evidence and contradictions.** [[PP32M]] says Companion; [[W32]] agrees, but [[WNorth]] now says Companion-or-below dies and [[PP32M]] readers report Companion death. E-North's memory-written gate even includes Friend. These are irreconcilable without initial and post-failure bands.

**Verdict/confidence.** partially; medium.

**Benchmark change implied.** Keep northCompanion() store rule provisionally; candidate >=Companion → Lover-only if controlled Companion dies, checking whether loss delta crossed a boundary.

**Still open / decisive evidence.** Show Companion immediately after failed-assault relation loss, before retreat; record store/shooting and absence of romance.

### ch32-03 · partially · D

**Question.** When Markus failed the barricade QTE with North at Friend or Companion (not Lover), did North throw herself in front of the bullet?

**Affected state/gate.** MD14 northLover bullet interception → Markus survival versus shot.

**Sources checked, evidence and contradictions.** E32T/[[PP32M]] require Lover. [[W32]] expanded to Friend; [[WNorth]] says Companion. E-North includes an explicit replay at Companion without romance where she took the bullet. Its Friend extrapolation is openly an assumption.

**Verdict/confidence.** partially; medium-high for Companion counterexample; low for Friend.

**Benchmark change implied.** Do not apply Friend-or-above as settled. Candidate MD14 northLover → northLover OR northCompanion only after Companion video; test Friend independently.

**Still open / decisive evidence.** Fail barricade QTE with non-Lover Companion, then non-Lover Friend; show band and sacrifice in each.

### ch32-04 · partially · D

**Question.** With Hank at Friend, was LEAVE (give up the shot) offered on the rooftop without first choosing HANK'S SON and then HANK'S SON (INSIST)?

**Affected state/gate.** C24 LEAVE friend/son/insisted gate → peaceful rooftop exit versus fight/deaths.

**Sources checked, evidence and contradictions.** E32C's lock says Friend only. [[W32]] and [[PP32C]] commenters add son twice; existing positive video shows unlock after son/insist but no negative control. Friend can fall to Warm on arrival, an additional confound.

**Verdict/confidence.** partially; medium-high.

**Benchmark change implied.** No immediate change; candidate C24 option0 availability friendBeforeDrop → friendBeforeDrop && ch32cl.insisted if negative control proves necessity.

**Still open / decisive evidence.** Same Friend save, omit son questions while preserving band, inspect LEAVE; then ask both and compare.

### ch32-05 · not settled · D

**Question.** With Connor still a machine and Markus killed by soldiers or Perkins (not by Connor), and no dirty bomb, did the after-credits scene of Amanda presenting the new RK900 play?

**Affected state/gate.** Machine Connor success/RK900 epilogue eligibility after other agent kills Markus.

**Sources checked, evidence and contradictions.** E-Endings requires machine Connor stopping Markus, [[WSecret]] permits Markus dying in battle. E32R gives recipes requiring Connor's direct kill but also failed attempts; it never tests soldiers/Perkins with the other conditions held.

**Verdict/confidence.** not settled; low.

**Benchmark change implied.** No change to RK900 epilogue gate; do not equate any Markus death with Connor success without test.

**Still open / decisive evidence.** Machine Connor alive, Markus killed by soldiers or Perkins, no bomb, play through credits and record Amanda scene or absence.

## Remaining prompt/attitude-only items

These nine are still open and are not omitted from the 64-item audit. Their original research triage and corresponding chapter template were checked; no new answer is claimed here.

| ID | Question | Verdict / reason no ending change proposed |
|---|---|---|
| ch09-16 | After a successful memory probe where Connor survived (DO NOTHING at the self-destruct), did Amanda in the Zen Garden next chapter congratulate Connor (arrow up) or criticise him (arrow down)? | Not settled; amandaTrust only; no Amanda-level ending gate demonstrated. |
| ch10-34 | Could Kara settle into a shelter (for example the abandoned car) without ever meeting the trash-collector android (yes/no)? | Not settled; Trash-collector encounter order; no demonstrated ending gate. |
| ch11-05 | After Markus had already fitted both the new eye and the new audio processor, could the crawling android still grab him and beg to die (yes/no)? | Not settled; Mercy encounter availability; no demonstrated player-outcome gate. |
| ch13-29 | In the motel, could Kara go to the TV without drawing the bath, so that she never cut her hair or removed her LED? (yes/no) | Not settled; Motel bath/hair/LED sequence; no demonstrated different outcome solely from TV availability. |
| ch15-18 | If The Nest ended RUPERT NOT FOUND (Hank and Connor left the apartment), could Connor spot Rupert in Jericho in Crossroads? (yes/no) | Not settled; ch30Rupert exploration clue only; no demonstrated outcome consequence. |
| ch27-13 | If Markus fled Capitol Park (no officers scene), does Hank say anything about Chris when Connor arrives with him (yes/no)? | Not settled; Chris dialogue presence only; no demonstrated outcome gate. |
| ch28-08 | After a peaceful Capitol Park protest (store freed), is the ANDROID RIOT magazine on the roof, and is EASTERN SPACE RACE there too (yes/no each)? | Not settled; Roof magazine availability only; no demonstrated outcome gate. |
| ch29-03 | On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)? | Not settled; Insufficient-evidence opening skips Amanda; Connor is permanently decommissioned, so no downstream ending gate. |
| ch31-05 | With Markus ousted (alive but gone) and Josh alive, was CHECK ON JOSH offered to deviant Connor in the church? | Not settled; Deviant Connor CHECK ON JOSH availability; no demonstrated ending gate. |

## Implied-change decision table

This is the concise implementation handoff. Everything not listed remains unchanged pending the per-item test. Do not confuse “retain provisionally” with measured correctness.

| Conflict | Scene/rule | From → to | Recommendation |
|---|---|---|---|
| ch29-06 | C20 `roomOpen().linkMap` and memory interaction | map + tablet only → map + tablet **or** scannable reactivated android memory, including Rupert without diary | Text-supported change; start with Rupert; verify repair/action order and each additional body. No random failure. |
| ch30-03 | M24-gun | cabin leader must be Markus → living returned Markus at hold accepted | Already changed in current file; no additional edit. |
| ch30-05 | K17 separation | `aliceMax < ALICE_KEY` history test → current relation below Warm + DISTANT | Primary-template priority candidate; pin evaluation before/after DISTANT arrow using Neutral control. |
| ch28-09 | M18g DISPERSE | `ch28Plaza='openFire'` → `fled(s)` and exactly one set of flight deltas | Strong text-supported candidate; confirm actual menu sequence. Initial DISPERSE retains its open-fire prompt. |
| ch28-02 | Shared committed late-attack entry | no late relation arrows → North +1, Josh −2, Simon −1 | Apply once if verified; particularly affects Simon's rescue threshold. |
| ch26-02 | Molotov offer | >=60% peaceful after one act blocks offer → actual count/strength predicate | Current simple ratio challenged by tagged-before-Molotov guide; no replacement number established. |
| ch26-04 | CP09 billboard effects | both hacks always violent → prior-speech-conditioned direction | Keep windows violent; establish the speech condition before implementation. |
| ch25-02/03 | `rules.suspicion` | exposed-item sum inevitably ≥3 and fails → coffee/responses can offset enough suspicion | Detailed counterexamples; no defensible numeric replacement yet. Do not import Steam 70% as code. |
| ch23-01 | Security-only Simon wound at roof | healthy-jump outcome → roof LEAVE/KILL handling if any wound blocks jumping | Medium-high candidate; no-SWAT route must be shown explicitly. |
| ch17-02 | SET FIRE | direct safe yard cut → actual observed house-chase routing | Existing observation supports chase; no unsourced new death probability. |
| ch29-03 | Garden opening | unconditional C19a–e → skip on proven insufficient-evidence route | Candidate only after exact sufficiency predicate/control. |
| ch32-03 | MD14 sacrifice | Lover only → possibly Companion too; Friend separately unproven | Player reports justify targeted replay, not a settled Friend threshold. |
| ch32-04 | C24 LEAVE | Friend before arrival drop alone → Friend and `ch32cl.insisted` if control proves necessity | Positive unlock frame is insufficient to establish necessity. |
| ch26-01, ch28-01, ch30-01, ch30-04, ch32-02 | Molotov override; Simon rescue; wound cap; Lover persistence; store gate | current rules → unchanged provisionally | Better-supported or unresolved; do not recalibrate from popularity of anecdotes. |

## Timer and tally limits relevant to the ending audit

Capitol Park has two distinct clocks. CP05's store deadline is ten real minutes in the walkthroughs; `rules.storeMinutes=10` and per-action costs approximate it. CP09's `spreadTime=12` and `spreadWait=4` are action-budget calibrations, not twelve/four extracted seconds or minutes. The acted-on balanced-meter question ch26-03 must be tested through the phase ending; do not conflate it with an untouched 50/50 idle failure. No active conflict supplies the true conversion of time to actions. The ch26-10 truck-access question and the observed retreat arrows were already closed in the input and are not counted again.

Midnight Train's roughly fifty-second hiding window does not establish an invariant six-action maximum. Last Chance's inherited five-minute timer begins when the key is taken, before reaching the archive; `ROOM_TIME=12` and Gavin's one-action cost remain calibrations. The earlier approximate-six-minute claim has already been superseded in the input, so this report does not create a sixty-fifth conflict by reopening it.

## Highest-value new recording leads

1. **Archive map with Rupert, no tablet, no diary**: capture the exact scan-memory interaction and ending; the text sources already converge and this should verify a concrete missing route quickly.
2. **Freedom March post-stand DISPERSE**, then separately post-stand ATTACK: record all menus; the first tests extra fight opportunities, the second tests confirmation and rescue-affecting arrows.
3. **Capitol Park one-tag Molotov**, then Molotov-plus-peaceful and 55/45: show a meter with ending; the completed chart's world-stat percentages are never meter thresholds or risk probabilities.
4. **Midnight Train no evidence hidden + coffee + TIRED + WASHING MACHINE**: meter visible throughout. Existing reader descriptions are unusually specific and contradict the present suspicion sum.
5. **Non-romanced Companion North at barricade**, then Friend: use the 2025 tester's described route as a reproducible lead, and record the relationship immediately before sacrifice.
6. **Neutral Alice before DISTANT**, with known previous Neutral history: separates primary-template current relation from the benchmark's historical maximum.

The [Steam Outcomes video-series playlist](https://www.youtube.com/playlist?list=PLIbWFosvUouEGlM4-t1GfOxpZi_deMjrO) is a lead for Experienced outcomes, not a new watched-frame citation in this report. Existing inherited video IDs/frames remain under CONFLICTS and `docs/research/video-evidence/`; none was silently upgraded to a new B measurement.

## Source aliases and preserved files

- **PP10**: [pp-fugitives.html](https://www.powerpyx.com/detroit-become-human-fugitives-walkthrough-100/); saved `B/sources/pp-fugitives.html`.
- **PP13**: [pp-on-the-run.html](https://www.powerpyx.com/detroit-become-human-on-the-run-walkthrough-100/); saved `B/sources/pp-on-the-run.html`.
- **PP15**: [pp-the-nest.html](https://www.powerpyx.com/detroit-become-human-the-nest-walkthrough-100/); saved `B/sources/pp-the-nest.html`.
- **PP17**: [pp-zlatko.html](https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/); saved `B/sources/pp-zlatko.html`.
- **PP19**: [pp-spare-parts.html](https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/); saved `B/sources/pp-spare-parts.html`.
- **PP21**: [pp-the-pirates-cove.html](https://www.powerpyx.com/detroit-become-human-the-pirates-cove-walkthrough-100/); saved `B/sources/pp-the-pirates-cove.html`.
- **PP23**: [pp-the-stratford-tower.html](https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/); saved `B/sources/pp-the-stratford-tower.html`.
- **PP25**: [pp-midnight-train.html](https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/); saved `B/sources/pp-midnight-train.html`.
- **PP26**: [pp-capitol-park.html](https://www.powerpyx.com/detroit-become-human-capitol-park-walkthrough-100/); saved `B/sources/pp-capitol-park.html`.
- **PP28**: [pp-freedom-march.html](https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/); saved `B/sources/pp-freedom-march.html`.
- **PP29**: [pp-last-chance-connor.html](https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/); saved `B/sources/pp-last-chance-connor.html`.
- **PP30C**: [pp-crossroads-connor.html](https://www.powerpyx.com/detroit-become-human-crossroads-connor-walkthrough-100/); saved `B/sources/pp-crossroads-connor.html`.
- **PP30K**: [pp-crossroads-kara.html](https://www.powerpyx.com/detroit-become-human-crossroads-kara-walkthrough-100/); saved `B/sources/pp-crossroads-kara.html`.
- **PP30M**: [pp-crossroads-markus.html](https://www.powerpyx.com/detroit-become-human-crossroads-markus-walkthrough-100/); saved `B/sources/pp-crossroads-markus.html`.
- **PP31**: [pp-night-of-the-soul.html](https://www.powerpyx.com/detroit-become-human-night-of-the-soul-walkthrough-100/); saved `B/sources/pp-night-of-the-soul.html`.
- **PP32C**: [pp-battle-for-detroit-connor.html](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-connor-walkthrough-100/); saved `B/sources/pp-battle-for-detroit-connor.html`.
- **PP32M**: [pp-battle-for-detroit-markus.html](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-markus-walkthrough-100/); saved `B/sources/pp-battle-for-detroit-markus.html`.
- **PP4**: [pp-a-new-home.html](https://www.powerpyx.com/detroit-become-human-a-new-home-walkthrough-100/); saved `B/sources/pp-a-new-home.html`.
- **PP6**: [pp-partners.html](https://www.powerpyx.com/detroit-become-human-partners-walkthrough-100/); saved `B/sources/pp-partners.html`.
- **PP9**: [pp-the-interrogation.html](https://www.powerpyx.com/detroit-become-human-the-interrogation-walkthrough-100/); saved `B/sources/pp-the-interrogation.html`.
- **T1**: [dbt-1-the-hostage-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/1-the-hostage-chapter-content/the-hostage-chapter-content.component.html); saved `B/sources/dbt-1-the-hostage-chapter-content.html`.
- **T10**: [dbt-10-fugitives-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/10-fugitives-chapter-content/fugitives-chapter-content.component.html); saved `B/sources/dbt-10-fugitives-chapter-content.html`.
- **T11**: [dbt-11-from-the-dead-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/11-from-the-dead-chapter-content/from-the-dead-chapter-content.component.html); saved `B/sources/dbt-11-from-the-dead-chapter-content.html`.
- **T12**: [dbt-12-waiting-for-hank-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/12-waiting-for-hank-chapter-content/waiting-for-hank-chapter-content.component.html); saved `B/sources/dbt-12-waiting-for-hank-chapter-content.html`.
- **T13**: [dbt-13-on-the-run-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/13-on-the-run-chapter-content/on-the-run-chapter-content.component.html); saved `B/sources/dbt-13-on-the-run-chapter-content.html`.
- **T14**: [dbt-14-jericho-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/14-jericho-chapter-content/jericho-chapter-content.component.html); saved `B/sources/dbt-14-jericho-chapter-content.html`.
- **T15**: [dbt-15-the-nest-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/15-the-nest-chapter-content/the-nest-chapter-content.component.html); saved `B/sources/dbt-15-the-nest-chapter-content.html`.
- **T16**: [dbt-16-time-to-decide-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/16-time-to-decide-chapter-content/time-to-decide-chapter-content.component.html); saved `B/sources/dbt-16-time-to-decide-chapter-content.html`.
- **T17**: [dbt-17-zlatko-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/17-zlatko-chapter-content/zlatko-chapter-content.component.html); saved `B/sources/dbt-17-zlatko-chapter-content.html`.
- **T18**: [dbt-18-russian-roulette-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/18-russian-roulette-chapter-content/russian-roulette-chapter-content.component.html); saved `B/sources/dbt-18-russian-roulette-chapter-content.html`.
- **T19**: [dbt-19-spare-parts-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html); saved `B/sources/dbt-19-spare-parts-chapter-content.html`.
- **T2**: [dbt-2-opening-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/2-opening-chapter-content/opening-chapter-content.component.html); saved `B/sources/dbt-2-opening-chapter-content.html`.
- **T20**: [dbt-20-eden-club-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/20-eden-club-chapter-content/eden-club-chapter-content.component.html); saved `B/sources/dbt-20-eden-club-chapter-content.html`.
- **T21**: [dbt-21-pirates-cove-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/21-pirates-cove-chapter-content/pirates-cove-chapter-content.component.html); saved `B/sources/dbt-21-pirates-cove-chapter-content.html`.
- **T22**: [dbt-22-the-bridge-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/22-the-bridge-chapter-content/the-bridge-chapter-content.component.html); saved `B/sources/dbt-22-the-bridge-chapter-content.html`.
- **T23**: [dbt-23-stratford-tower-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/23-stratford-tower-chapter-content/stratford-tower-chapter-content.component.html); saved `B/sources/dbt-23-stratford-tower-chapter-content.html`.
- **T24**: [dbt-24-public-enemy-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/24-public-enemy-chapter-content/public-enemy-chapter-content.component.html); saved `B/sources/dbt-24-public-enemy-chapter-content.html`.
- **T25**: [dbt-25-midnight-train-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/25-midnight-train-chapter-content/midnight-train-chapter-content.component.html); saved `B/sources/dbt-25-midnight-train-chapter-content.html`.
- **T26**: [dbt-26-capitol-park-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/26-capitol-park-chapter-content/capitol-park-chapter-content.component.html); saved `B/sources/dbt-26-capitol-park-chapter-content.html`.
- **T27**: [dbt-27-meet-kamski-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/27-meet-kamski-chapter-content/meet-kamski-chapter-content.component.html); saved `B/sources/dbt-27-meet-kamski-chapter-content.html`.
- **T28**: [dbt-28-freedom-march-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/28-freedom-march-chapter-content/freedom-march-chapter-content.component.html); saved `B/sources/dbt-28-freedom-march-chapter-content.html`.
- **T29**: [dbt-29-last-chance-connor-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/29-last-chance-connor-chapter-content/last-chance-connor-chapter-content.component.html); saved `B/sources/dbt-29-last-chance-connor-chapter-content.html`.
- **T3**: [dbt-3-shades-color-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/3-shades-color-chapter-content/shades-color-chapter-content.component.html); saved `B/sources/dbt-3-shades-color-chapter-content.html`.
- **T30C**: [dbt-30.2-crossroads-connor-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.2-crossroads-connor-chapter-content/crossroads-connor-chapter-content.component.html); saved `B/sources/dbt-30.2-crossroads-connor-chapter-content.html`.
- **T30K**: [dbt-30.1-crossroads-kara-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html); saved `B/sources/dbt-30.1-crossroads-kara-chapter-content.html`.
- **T30M**: [dbt-30.3-crossroads-markus-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.3-crossroads-markus-chapter-content/crossroads-markus-chapter-content.component.html); saved `B/sources/dbt-30.3-crossroads-markus-chapter-content.html`.
- **T31C**: [dbt-31.2-night-soul-connor-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/31.2-night-soul-connor-chapter-content/night-soul-connor-chapter-content.component.html); saved `B/sources/dbt-31.2-night-soul-connor-chapter-content.html`.
- **T31M**: [dbt-31.1-night-soul-markus-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/31.1-night-soul-markus-chapter-content/night-soul-markus-chapter-content.component.html); saved `B/sources/dbt-31.1-night-soul-markus-chapter-content.html`.
- **T32C**: [dbt-32.3-connors-last-mission-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.3-connors-last-mission-chapter-content/connors-last-mission-chapter-content.component.html); saved `B/sources/dbt-32.3-connors-last-mission-chapter-content.html`.
- **T32CT**: [dbt-32.4-connor-cyberlife-tower-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.4-connor-cyberlife-tower-chapter-content/connor-cyberlife-tower-chapter-content.component.html); saved `B/sources/dbt-32.4-connor-cyberlife-tower-chapter-content.html`.
- **T32D**: [dbt-32.5-markus-demonstration-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.5-markus-demonstration-chapter-content/markus-demonstration-chapter-content.component.html); saved `B/sources/dbt-32.5-markus-demonstration-chapter-content.html`.
- **T32K**: [dbt-32.1-kara-leaving-detroit-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.1-kara-leaving-detroit-chapter-content/kara-leaving-detroit-chapter-content.component.html); saved `B/sources/dbt-32.1-kara-leaving-detroit-chapter-content.html`.
- **T32KC**: [dbt-32.2-kara-captured-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.2-kara-captured-chapter-content/kara-captured-chapter-content.component.html); saved `B/sources/dbt-32.2-kara-captured-chapter-content.html`.
- **T32R**: [dbt-32.6-markus-revolution-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.6-markus-revolution-chapter-content/markus-revolution-chapter-content.component.html); saved `B/sources/dbt-32.6-markus-revolution-chapter-content.html`.
- **T4**: [dbt-4-new-home-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/4-new-home-chapter-content/new-home-chapter-content.component.html); saved `B/sources/dbt-4-new-home-chapter-content.html`.
- **T5**: [dbt-5-painter-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/5-painter-chapter-content/painter-chapter-content.component.html); saved `B/sources/dbt-5-painter-chapter-content.html`.
- **T6**: [dbt-6-partners-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/6-partners-chapter-content/partners-chapter-content.component.html); saved `B/sources/dbt-6-partners-chapter-content.html`.
- **T7**: [dbt-7-stormy-night-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/7-stormy-night-chapter-content/stormy-night-chapter-content.component.html); saved `B/sources/dbt-7-stormy-night-chapter-content.html`.
- **T8**: [dbt-8-broken-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/8-broken-chapter-content/broken-chapter-content.component.html); saved `B/sources/dbt-8-broken-chapter-content.html`.
- **T9**: [dbt-9-the-interrogation-chapter-content.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html); saved `B/sources/dbt-9-the-interrogation-chapter-content.html`.
- **TEndings**: [dbt-endings.html](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/pages/endings/endings.component.html); saved `B/sources/dbt-endings.html`.
- **W10**: [wiki-Fugitives.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json); saved `B/sources/wiki-Fugitives.json`.
- **W13**: [wiki-On_the_Run.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json); saved `B/sources/wiki-On_the_Run.json`.
- **W14**: [wiki-Jericho.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json); saved `B/sources/wiki-Jericho.json`.
- **W15**: [wiki-The_Nest.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json); saved `B/sources/wiki-The_Nest.json`.
- **W17**: [wiki-Zlatko.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json); saved `B/sources/wiki-Zlatko.json`.
- **W19**: [wiki-Spare_Parts.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json); saved `B/sources/wiki-Spare_Parts.json`.
- **W21**: [wiki-The_Pirates'_Cove.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Pirates%27_Cove&prop=wikitext&format=json); saved `B/sources/wiki-The_Pirates'_Cove.json`.
- **W23**: [wiki-The_Stratford_Tower.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Stratford_Tower&prop=wikitext&format=json); saved `B/sources/wiki-The_Stratford_Tower.json`.
- **W25**: [wiki-Midnight_Train.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Midnight_Train&prop=wikitext&format=json); saved `B/sources/wiki-Midnight_Train.json`.
- **W26**: [wiki-Capitol_Park.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json); saved `B/sources/wiki-Capitol_Park.json`.
- **W27**: [wiki-Meet_Kamski.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json); saved `B/sources/wiki-Meet_Kamski.json`.
- **W28**: [wiki-Freedom_March.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json); saved `B/sources/wiki-Freedom_March.json`.
- **W29**: [wiki-Last_Chance,_Connor.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance%2C_Connor&prop=wikitext&format=json); saved `B/sources/wiki-Last_Chance,_Connor.json`.
- **W30**: [wiki-Crossroads.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json); saved `B/sources/wiki-Crossroads.json`.
- **W31**: [wiki-Night_of_the_Soul.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json); saved `B/sources/wiki-Night_of_the_Soul.json`.
- **W32**: [wiki-Battle_for_Detroit.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json); saved `B/sources/wiki-Battle_for_Detroit.json`.
- **W4**: [wiki-A_New_Home.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=A_New_Home&prop=wikitext&format=json); saved `B/sources/wiki-A_New_Home.json`.
- **W6**: [wiki-Partners.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Partners&prop=wikitext&format=json); saved `B/sources/wiki-Partners.json`.
- **W9**: [wiki-The_Interrogation.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Interrogation&prop=wikitext&format=json); saved `B/sources/wiki-The_Interrogation.json`.
- **WLuther**: [wiki-Luther.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json); saved `B/sources/wiki-Luther.json`.
- **WNorth**: [wiki-North.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json); saved `B/sources/wiki-North.json`.
- **WPO**: [wiki-Public_Opinion.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json); saved `B/sources/wiki-Public_Opinion.json`.
- **WRelation**: [wiki-Relationship_Stat.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json); saved `B/sources/wiki-Relationship_Stat.json`.
- **WSI**: [wiki-Software_Instability.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json); saved `B/sources/wiki-Software_Instability.json`.
- **WSecret**: [wiki-Secret-Endings.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Secret-Endings&prop=wikitext&format=json); saved `B/sources/wiki-Secret-Endings.json`.
- **WSimon**: [wiki-Simon.json](https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json); saved `B/sources/wiki-Simon.json`.

[PP10]: https://www.powerpyx.com/detroit-become-human-fugitives-walkthrough-100/

[PP13]: https://www.powerpyx.com/detroit-become-human-on-the-run-walkthrough-100/

[PP15]: https://www.powerpyx.com/detroit-become-human-the-nest-walkthrough-100/

[PP17]: https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/

[PP19]: https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/

[PP21]: https://www.powerpyx.com/detroit-become-human-the-pirates-cove-walkthrough-100/

[PP23]: https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/

[PP25]: https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/

[PP26]: https://www.powerpyx.com/detroit-become-human-capitol-park-walkthrough-100/

[PP28]: https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/

[PP29]: https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/

[PP30C]: https://www.powerpyx.com/detroit-become-human-crossroads-connor-walkthrough-100/

[PP30K]: https://www.powerpyx.com/detroit-become-human-crossroads-kara-walkthrough-100/

[PP30M]: https://www.powerpyx.com/detroit-become-human-crossroads-markus-walkthrough-100/

[PP31]: https://www.powerpyx.com/detroit-become-human-night-of-the-soul-walkthrough-100/

[PP32C]: https://www.powerpyx.com/detroit-become-human-battle-for-detroit-connor-walkthrough-100/

[PP32M]: https://www.powerpyx.com/detroit-become-human-battle-for-detroit-markus-walkthrough-100/

[PP4]: https://www.powerpyx.com/detroit-become-human-a-new-home-walkthrough-100/

[PP6]: https://www.powerpyx.com/detroit-become-human-partners-walkthrough-100/

[PP9]: https://www.powerpyx.com/detroit-become-human-the-interrogation-walkthrough-100/

[T1]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/1-the-hostage-chapter-content/the-hostage-chapter-content.component.html

[T10]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/10-fugitives-chapter-content/fugitives-chapter-content.component.html

[T11]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/11-from-the-dead-chapter-content/from-the-dead-chapter-content.component.html

[T12]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/12-waiting-for-hank-chapter-content/waiting-for-hank-chapter-content.component.html

[T13]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/13-on-the-run-chapter-content/on-the-run-chapter-content.component.html

[T14]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/14-jericho-chapter-content/jericho-chapter-content.component.html

[T15]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/15-the-nest-chapter-content/the-nest-chapter-content.component.html

[T16]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/16-time-to-decide-chapter-content/time-to-decide-chapter-content.component.html

[T17]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/17-zlatko-chapter-content/zlatko-chapter-content.component.html

[T18]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/18-russian-roulette-chapter-content/russian-roulette-chapter-content.component.html

[T19]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html

[T2]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/2-opening-chapter-content/opening-chapter-content.component.html

[T20]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/20-eden-club-chapter-content/eden-club-chapter-content.component.html

[T21]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/21-pirates-cove-chapter-content/pirates-cove-chapter-content.component.html

[T22]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/22-the-bridge-chapter-content/the-bridge-chapter-content.component.html

[T23]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/23-stratford-tower-chapter-content/stratford-tower-chapter-content.component.html

[T24]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/24-public-enemy-chapter-content/public-enemy-chapter-content.component.html

[T25]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/25-midnight-train-chapter-content/midnight-train-chapter-content.component.html

[T26]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/26-capitol-park-chapter-content/capitol-park-chapter-content.component.html

[T27]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/27-meet-kamski-chapter-content/meet-kamski-chapter-content.component.html

[T28]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/28-freedom-march-chapter-content/freedom-march-chapter-content.component.html

[T29]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/29-last-chance-connor-chapter-content/last-chance-connor-chapter-content.component.html

[T3]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/3-shades-color-chapter-content/shades-color-chapter-content.component.html

[T30C]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.2-crossroads-connor-chapter-content/crossroads-connor-chapter-content.component.html

[T30K]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html

[T30M]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/30.3-crossroads-markus-chapter-content/crossroads-markus-chapter-content.component.html

[T31C]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/31.2-night-soul-connor-chapter-content/night-soul-connor-chapter-content.component.html

[T31M]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/31.1-night-soul-markus-chapter-content/night-soul-markus-chapter-content.component.html

[T32C]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.3-connors-last-mission-chapter-content/connors-last-mission-chapter-content.component.html

[T32CT]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.4-connor-cyberlife-tower-chapter-content/connor-cyberlife-tower-chapter-content.component.html

[T32D]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.5-markus-demonstration-chapter-content/markus-demonstration-chapter-content.component.html

[T32K]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.1-kara-leaving-detroit-chapter-content/kara-leaving-detroit-chapter-content.component.html

[T32KC]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.2-kara-captured-chapter-content/kara-captured-chapter-content.component.html

[T32R]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/32.6-markus-revolution-chapter-content/markus-revolution-chapter-content.component.html

[T4]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/4-new-home-chapter-content/new-home-chapter-content.component.html

[T5]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/5-painter-chapter-content/painter-chapter-content.component.html

[T6]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/6-partners-chapter-content/partners-chapter-content.component.html

[T7]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/7-stormy-night-chapter-content/stormy-night-chapter-content.component.html

[T8]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/8-broken-chapter-content/broken-chapter-content.component.html

[T9]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html

[TEndings]: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/pages/endings/endings.component.html

[W10]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json

[W13]: https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json

[W14]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json

[W15]: https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json

[W17]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json

[W19]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json

[W21]: https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Pirates%27_Cove&prop=wikitext&format=json

[W23]: https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Stratford_Tower&prop=wikitext&format=json

[W25]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Midnight_Train&prop=wikitext&format=json

[W26]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json

[W27]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json

[W28]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json

[W29]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance%2C_Connor&prop=wikitext&format=json

[W30]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json

[W31]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json

[W32]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json

[W4]: https://detroit-become-human.fandom.com/api.php?action=parse&page=A_New_Home&prop=wikitext&format=json

[W6]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Partners&prop=wikitext&format=json

[W9]: https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Interrogation&prop=wikitext&format=json

[WLuther]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json

[WNorth]: https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json

[WPO]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json

[WRelation]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json

[WSI]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json

[WSecret]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Secret-Endings&prop=wikitext&format=json

[WSimon]: https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json
