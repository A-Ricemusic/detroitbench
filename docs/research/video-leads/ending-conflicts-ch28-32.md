# Ending conflicts: chapters 28–32, targeted follow-up

Research date: 2026-11-08. Research only; no benchmark, tests, CONFLICTS.md or SOURCES.md edits, no subagents, no commit. This is a follow-up to [A](ending-conflicts-A.md) and [B](ending-conflicts-B.md), not an independent claim to have performed their experiments.

## Scope and method

The main inventory is **19 outcome-relevant items**: ch28-01/02/04/06/07/09; ch29-01/05; ch30-01/03/04/05/06; ch31-01/03; ch32-02/03/04/05. This includes the three indirect Freedom March relationship questions, since they can affect rescue, romance or ousting. ch30-03 remains here because B settled the obsolete *code discrepancy*, while A left the actual game observation unresolved. ch29-03 is a supporting control below. Already-settled ch29-06 is carried forward, not reopened. Magazine-only ch28-08 and optional-dialogue-only ch31-05 are outside the outcome inventory.

Read the research README, both reports' relevant sections, the five chapter notes and triage rationales, SOURCES.md's text-source inventory/reliability discussion, and all five flowchart READMEs. Inspected the stored chart images for the plaza/rescue, corridor injury, Thin Ice, barricade and retreat branches. The hierarchy used here is completed chart > actual gameplay frames > game strings and reconstructed templates > PowerPyx > wiki > other guides/accounts. A completed chart does not enumerate every dialogue menu or relationship cutoff. Angular conditions are transcriber descriptions, not executable game predicates.

Working directory: `/Users/pelicannurse/.t3/detroitbench-tools/ending-conflicts/ch28-32/`. It contains targeted YouTube search JSONL/logs, exact download command arrays and attempt logs, selected clips, contact sheets, frame extraction scripts, string/template/wiki cross-checks and the evidence manifest. Downloads are anonymous, video-only, at most 720p, with `--download-sections`; no cookies or login. The downloader waits 60 seconds and retries once on a failed attempt. A successful download is not evidence until its frames have been inspected. Timestamps below refer to the original video; clip-local offsets are separate in `selected-frames.json`.

**Verdict discipline:** “partially” identifies the proposition actually established; it does not silently settle the disputed control. Missing incoming relationship labels, edits between branches, unrecorded difficulty and checkpoint history prevent numeric/boolean conclusions. A generic all-endings title is a lead, not a controlled experiment. No exact hidden game flag or counter dump answering these questions was found in the public text/template sources. Benchmark identifiers below are implementation names, not claims about names in the game's binary.

## Main follow-up findings

- **Directly observed:** the final late-CHARGE menu gives Josh large down, Simon small down and North small up (6Pt08xsvyhk 2:58–3:04). This supports adding the missing M19a CHARGE effects; it does not independently settle second-menu ATTACK after first STAND.
- **Directly observed constraint:** ATTACK → ABANDON → DISPERSE retains another CHARGE/STAY/DISPERSE menu (2:51). A blanket M18g DISPERSE → flight correction would be wrong on this route. First-STAND → DISPERSE remains unfilmed in the inspected material.
- **Still missing:** Neutral-at-rescue Simon; a no-son Friend rooftop control; non-Lover Companion/Friend North gate controls; continuous cross-chapter refusal/abandonment/decommissioning histories. No remaining original game predicate is promoted to fully settled merely from a title or an unmatched positive example.

## Source register

- **Charts:** [ch28](../../flowcharts/ch28/README.md), [ch29](../../flowcharts/ch29/README.md), [ch30](../../flowcharts/ch30/README.md), [ch31](../../flowcharts/ch31/README.md), [ch32](../../flowcharts/ch32/README.md). Especially ch28 `-imgur-5/6`, ch30 Markus `-3/6`, ch31 Connor `-2`, ch32 demonstration `-4` and revolution retreat images. The chapter READMEs preserve the original image URLs and completeness qualifications.
- **Text/templates:** [repository](https://github.com/detroitbecometext/detroitbecometext.github.io), [English game strings](https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json). Raw chapter templates are under `src/app/chapters/components/chapter-contents/`, in the `28-…`, `29-…`, `30.1/2/3-…`, `31.1/2-…`, and `32.1` through `32.6-…` directories; secret scenes are in `src/app/chapters/pages/endings/endings.component.html`. Preserved raw sources are in sibling `B/sources/`; this pass's line-numbered extracts are `dbt-*-crosscheck.txt` and `string-crosscheck.tsv`.
- **PowerPyx:** [Freedom March](https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/), [Last Chance](https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/), [Crossroads Markus](https://www.powerpyx.com/detroit-become-human-crossroads-markus-walkthrough-100/), [Crossroads Kara](https://www.powerpyx.com/detroit-become-human-crossroads-kara-walkthrough-100/), [Night of the Soul](https://www.powerpyx.com/detroit-become-human-night-of-the-soul-walkthrough-100/), [Battle Markus](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-markus-walkthrough-100/), [Battle Connor](https://www.powerpyx.com/detroit-become-human-battle-for-detroit-connor-walkthrough-100/). Main prose and contradictory reader tests were distinguished.
- **Wiki:** freshly fetched chapter pages, Simon, North, Alice, Luther and Secret-Endings, plus talk-page results and up to 50 recent revision summaries each, in `sources/`. Most talk requests return `missingtitle`; Simon's available talk text does not discuss these gates. That is not a search of every Fandom discussion. B's preserved historical content remains relevant: Battle oldids 35963/40389 widen the bullet gate; North oldid 40911 differs from current retreat/bullet wording; Crossroads oldid 40391 differs on Alice's historical versus current relationship. None supplies a controlled test or decoded predicate. See `source-fetch-log.json` and `wiki-crosscheck.txt`.
- **Other checks:** [Neoseeker Freedom March](https://www.neoseeker.com/detroit-become-human/walkthrough/Freedom_March), [GameFAQs Freedom March](https://gamefaqs.gamespot.com/ps4/182637-detroit-become-human/faqs/75941/chapter-27-freedom-march), [GameFAQs Last Chance](https://gamefaqs.gamespot.com/ps4/182637-detroit-become-human/faqs/76123/last-chance-connor), [Speedrun any% route](https://www.speedrun.com/dbh/guides/3eqei), [North relationship replay discussion](https://www.reddit.com/r/DetroitBecomeHuman/comments/1n43p4u/), [RK900 attempts](https://www.reddit.com/r/DetroitBecomeHuman/comments/bs31b5/), [Luther/checkpoint discussion](https://www.reddit.com/r/DetroitBecomeHuman/comments/12igus1/). Some direct HTTP fetches were blocked; web-readable material was checked where available. Failures are logged. The North author's claim that numerical deltas came from game files does not authenticate the separately memory-written unlock rules.

## Freedom March

### ch28-01 — Simon at Neutral rescues Markus

**Decisive observation.** John absent; Simon alive; show Simon's **current** Neutral band after every plaza relation change, then SACRIFICE and the full rescue/execution. A failed-charge test must additionally show the late-attack decrease. Record Jericho's band too, so a purported additional Jericho prerequisite can be tested rather than assumed. A chapter-start Neutral label is insufficient.

**Hunt and reading.** Searches named Simon, Neutral, sacrifice, all endings and challenge runs (`ch28-rescue`, `ch28-challenge`, `neutral-simon`). They repeatedly returned Battle-for-Detroit heart donations, including `iHkTLYQCYlg` and `-z2XmdXCHjo`; those are the wrong chapter. Inspected new portions of [b8uveeYPmgo](https://www.youtube.com/watch?v=b8uveeYPmgo), the stored DanaDuchy choices material, and the XCV all-ending lead. In b8, Simon reads Neutral at **12:26** after the first stand, but the observed path subsequently stands again and runs away; its Friend popup at **13:16** follows flight. Neither reading is an incoming sacrifice test. These frames are preserved as controls, not as a Neutral-rescue finding.

**Cross-check.** The completed chart's Simon-survived tag names survival, not a band. The template says good relationship. PowerPyx says friendly; its comments include both a Neutral-success account and a Neutral-failure account subsequently resolved at Friend. The Simon/wiki and Steam recipe support Friend, but cannot resolve the contradictory Neutral report. John priority is separately supported and unchanged.

**Verdict:** **partially; medium confidence** in retaining Friend as the working rule; Neutral itself **not settled**. **Change:** no change to `inputs.simonGood`/`rescue`: keep `simon && simonTrust >= SIMON_FRIEND`, John first. Do not lower the gate to Neutral or add a Jericho conjunct.

### ch28-02 — late ATTACK relationship arrows

**Decisive observation.** Select first STAND GROUND, then ATTACK; retain every menu and the North/Josh/Simon popups through commitment to the charge. Separate the initial stand's North/Simon decreases from the late attack's changes. A different route into CHARGE is corroboration, not the exact requested test.

**Hunt and reading.** Searched both generic late-attack footage and QTE-branch recordings. [6Pt08xsvyhk, Freedom March — All QTE Outcomes](https://www.youtube.com/watch?v=6Pt08xsvyhk) provides additional menu/charge material; its lead-in includes initial ATTACK, ABANDON and a later police-warning choice. Close inspection establishes ATTACK → ABANDON → DISPERSE → STAY → CHARGE. At **2:51**, the extra CHARGE/STAY/DISPERSE menu is visible; **2:58** shows the final CHARGE/SACRIFICE/RUN AWAY menu. Committing to CHARGE produces **Josh large down at 2:59, Simon small down at 3:01, North small up at 3:04**. Thus the final-menu late-charge arrows are directly observed, while after-first-STAND ATTACK remains an unfilmed subcase. Saved all three popups and both menus: [Josh large down](../video-evidence/ch28/ch28-02-6Pt08xsvyhk-02-59.png), [Simon small down](../video-evidence/ch28/ch28-02-6Pt08xsvyhk-03-01.png), [North small up](../video-evidence/ch28/ch28-02-6Pt08xsvyhk-03-04.png). Generic b8 first-ATTACK material does not answer the after-STAND case.

**Cross-check.** `X1001M.FINALSTAGE.SPEECH.PC.SHOOTINGCHOICE.*` and `DISPERSECHOICE.*` distinguish the second warning from the first-disperse menu. The template uses cross-references instead of local arrows. Wiki and Neoseeker agree on North small up, Josh large down, Simon small down for late attacks; their agreement is stronger than template silence but is not a new gameplay measurement.

**Verdict:** **partially; high confidence in the filmed M19a late-CHARGE arrows**, medium in extending them to after-first-STAND ATTACK. **Change:** supported for the filmed final-menu charge: M19a CHARGE no relationship deltas → North +1, Josh −2, Simon −1 once. Extension to M18g/M18h stays a corroborated candidate. Do not apply these again on initial M18f CONFIRM.

### ch28-04 — late ATTACK asks CONFIRM / ABANDON?

**Decisive observation.** First STAND GROUND → second-menu ATTACK, then show either CONFIRM/ABANDON or uninterrupted charge. Preserve a separate initial-ATTACK control.

**Hunt and reading.** Inspected initial-attack confirmation in new b8/QTE footage and the prior AG4GEcU3ntQ observation. Those confirm the first-menu case only. Searched late-attack, all-choice and reaction compilations; source titles do not establish the selected branch. The QTE recording instead follows ABANDON → DISPERSE → STAY → CHARGE; the final charge has no confirmation, but it is not second-menu ATTACK after first STAND.

**Cross-check.** Template after-STAND pointer is “See ATTACK”; after-ABANDON is “See ATTACK > CHARGE”, an undefined heading. Neoseeker distinguishes initial confirmation from committed late charges. The chart collapses these dialogue steps.

**Verdict:** **partially; medium confidence** in the present immediate-charge rule. **Change:** no change to M18g ATTACK → `charge(s)`; do not add another confirmation merely from the template pointer.

### ch28-06 — PUSH North, optionality and arrow

**Decisive observation.** Show the PUSH opportunity, deliberately press it, and retain the resulting North small-up popup; repeat across alternate fight routes and misses that change choreography. To establish “every fight”, distinguish fights lost before the intervention point from fights reaching that point.

**Hunt and reading.** Targeted QTE searches found [6Pt08xsvyhk](https://www.youtube.com/watch?v=6Pt08xsvyhk). New segments show alternate fight choreography, North endangered and North protecting Markus after missed actions. A successful full fight, an intervention prompt and a reaction by North are three different observations; none alone proves the requested universal occurrence plus arrow. Close-read L4NDvcRLrxw 5:17–5:45 also shows successive North/fight interventions; it does not supply a separately attributable North-up popup. The inspected excerpts therefore do not supply a clean incoming branch → successful PUSH → separately attributable North-popup sequence.

**Cross-check.** `GUI.ACTION.10M.PUSH` is the game's string “Push”; it establishes an action label, not its occurrence on every choreography. Wiki Relationship_Stat and Neoseeker support the small-up effect. The template is silent. The community North replay also reports pushing her, but its numbers are not a primary measurement here.

**Verdict:** **partially; medium confidence** in existence/effect, low in universality. **Change:** no change to M19b's PUSH/+1 representation; keep its placement as an adaptation, not a proven universal step.

### ch28-07 — Jericho conversion bonus counts pre-march androids?

**Decisive observation.** Show all pre-march conversions and the first AX400/worker recruitment, then decline every optional street-side conversion through the plaza. Record the complete Jericho-popup timeline. Compare a second run adding march conversions one at a time; do not equate the large crowd HUD with Markus's manually converted count.

**Hunt and reading.** New no-optional-conversion searches returned [fefKnYQ09xk](https://www.youtube.com/watch?v=fefKnYQ09xk) and [Z9w-xRY9E5A](https://www.youtube.com/watch?v=Z9w-xRY9E5A), not an identified controlled test. The inspected Dana/b8 march passages contain optional conversions. Their crowd totals therefore cannot validate the benchmark's assumed group sizes or threshold.

**Cross-check.** Chart lists conversion nodes without a numeric tally predicate; the template and game strings expose no hidden counter. Wiki says approximately ten during the march; Neoseeker locates the increase among optional march conversions. No inspected history/talk/GameFAQs/speedrun source measures the exclusion or inclusion of pre-march groups.

**Verdict:** **not settled; low confidence** in any replacement count. **Change:** no change to `convert()` or `rules.convertThreshold`; retain the explicit calibration. Candidate all-chapter tally → march-only tally remains unmeasured; do not silently substitute it.

### ch28-09 — STAND GROUND → DISPERSE gives another menu?

**Decisive observation.** Select first STAND GROUND; select DISPERSE on the next ATTACK/STAND GROUND/DISPERSE menu; retain all frames to the ending chart. A path that stands twice and then runs, or disperses at the initial menu, does not answer this.

**Hunt and reading.** Inspected b8 10:40–17:40, the final section of [9JGOJ5oHKxA, Disperse Option](https://www.youtube.com/watch?v=9JGOJ5oHKxA), and the QTE/reaction/XCV leads. The b8 flight branch is **STAND → STAND → RUN AWAY**, not STAND → DISPERSE. Its second menu is at 12:40; by 12:56 CHARGE/SACRIFICE/RUN AWAY is visible. Preserved these frames specifically to prevent that false positive. The QTE video provides an important contrary control: **ATTACK → ABANDON → DISPERSE does offer CHARGE/STAY/DISPERSE at 2:51** ([frame](../video-evidence/ch28/ch28-09-6Pt08xsvyhk-02-51.png)). The template explicitly redirects after-ABANDON DISPERSE to the initial DISPERSE subtree. Therefore the two origins of the benchmark's shared M18g scene cannot safely be treated as interchangeable. The single-disperse video supplies an initial-DISPERSE control. Close checks of XCV 1:42–2:19 show STAND → STAND → RUN AWAY; L4NDvcRLrxw 0:45–1:40 shows initial DISPERSE → DISPERSE. Neither is the queried first-STAND → DISPERSE case.

**Cross-check.** Template post-STAND DISPERSE has dialogue only, whereas initial DISPERSE nests CHARGE/STAY/DISPERSE. Neoseeker explicitly describes direct MARKUS FLED after post-STAND DISPERSE. GameFAQs describes another prompt after standing but does not resolve this particular response. The chart merges flight branches and cannot count menus.

**Verdict:** **partially; medium-high confidence** in the text-supported correction candidate, not yet a matched-footage closure. **Change:** reject a blanket M18g option-2 `openFire` → `fled(s)` patch: it would break the newly observed after-ABANDON branch. If first-STAND → DISPERSE is ultimately shown to flee, track the second warning's origin (`stand` versus `abandon`) and alter **only the stand-origin branch**, with flight arrows once. Preserve initial DISPERSE and after-ABANDON DISPERSE → M18h. The exact stand-origin observation is still required.

## Last Chance, Connor

### ch29-01 — Carlos' body alone permits archive entry

**Decisive observation.** Carlos dead, Rupert escaped, Tracis spared, Simon alive, kitchen deviant escaped, no Kamski key; document the history and continue from Fowler's office into archive play or decommissioning. Also distinguish Carlos's trusted confession/statue clue from a body with no usable Jericho chain.

**Hunt and reading.** New searches again found [NcSz8JKSl00, choices](https://www.youtube.com/watch?v=NcSz8JKSl00), a general evidence-link video and ordinary playthroughs. Neither title nor an evidence-room clip showing Carlos establishes that the other bodies/tablet/Kamski route were unavailable. No newly identified continuous Carlos-only control was found.

**Cross-check.** Chart has SUFFICIENT/INSUFFICIENT EVIDENCE without the predicate. Game strings name evidence and outcomes, not the test. PowerPyx's any-body rule includes Carlos; wiki/Steam recipes describe usable routes but do not prove the archive gate checks solvability. GameFAQs' statue-plus-body recipes do not answer admission with only an unusable body. No history/talk source supplies a controlled counterexample.

**Verdict:** **not settled; low confidence**. **Change:** no change to `sufficientEvidence()`; do not replace any qualifying body with `evidenceRoutes()` solubility on logical inference alone.

### ch29-05 — Gavin tolerates one or two QTE misses

**Decisive observation.** Experienced difficulty, visibly fail exactly the first prompt, succeed on every remaining prompt, show the result; repeat with two specified failures. Record input failure feedback. A red PlayStation Circle glyph is not by itself a failed input.

**Hunt and reading.** Downloaded and inspected the fight/outcome portion of [pMoFXXhJCX8](https://www.youtube.com/watch?v=pMoFXXhJCX8), including win and loss variants; the win ends with Gavin on the floor at **5:06**. It proves both outcomes exist, not a one/two-miss budget. Searches also returned K5Xm3_QLGJI and EL_ig_jz-n4, with no identified controlled Experienced single-miss demonstration.

**Cross-check.** The chart's WIN/LOSE split gives no input count. Template/strings give no failure budget. PowerPyx says most sequences; wiki says the first failure wounds Connor. Those challenge a single-miss-always-loses claim, but do not calibrate a probability or count by themselves.

**Verdict:** **partially; medium confidence** in tolerance as a source-supported hypothesis, low in the exact budget. **Change:** no change to C20g's whole-fight `risk: 0.25`; label it calibrated, not a sourced 25% statistic. Do not replace it with an all-or-nothing one-prompt rule.

## Crossroads

### ch30-01 — second versus third wound

**Decisive observation.** Start before the fresh raid with zero recorded injuries; show each distinct VITAL SYSTEM DAMAGED/wound event, route choice and death without a splice. Repeat for the deviant-Connor takeover. Count failure events separately from bullets fired in an animation or a final execution shot.

**Hunt and reading.** Newly downloaded [iObK3yJJLh4, all Crossroads outcomes](https://www.youtube.com/watch?v=iObK3yJJLh4) **4:15–4:58** and **17:57–18:36**. The author's description explicitly calls corridor failures “two strikes”; the Markus clip shows one VITAL SYSTEM DAMAGED event and a subsequent incapacitation/execution. Its opening briefly shows Markus with Connor/North before cutting into the failure vignette, so it is stronger corroboration than an isolated death, but not an unedited zero-wound history. Do not count the execution bullet as a third survivable injury. Prior tLtGyxHLdoY remains similarly limited.

**Cross-check.** Chart branches on wounded/collapse without publishing a counter. Template describes two shots; PowerPyx and Supersoluce describe three. Those may count failure events versus physical projectiles differently. No named executable `woundsToDie` counter was recovered; that is the benchmark's abstraction.

**Verdict:** **partially; medium-high confidence** in the two-failure-event model, not a globally measured bullet count. **Change:** no change to `rules.woundsToDie=2`/`hitMarkus`/`hitConnor`; do not globally change 2 → 3 from guide prose.

### ch30-03 — returning exile versus machine Connor in the hold

**Decisive observation.** Show ousting, SAVE YOUR PEOPLE, Connor remaining a machine, surviving his pursuit, then the returning Markus's hold encounter/reach-the-gun QTE. A replacement Connor appearing outside the ship does not establish that the pursuer survived to the hold.

**Hunt and reading.** Fresh searches returned [7b_tvVylUh8](https://www.youtube.com/watch?v=7b_tvVylUh8); prior [YnDNMUECTg0](https://www.youtube.com/watch?v=YnDNMUECTg0) shows return and a later machine Connor but omits the decisive pursuit continuity. The new general machine-path clip is a normal Markus-leader case, not the returning-exile control.

**Cross-check.** Completed Markus chart sends GO BACK TO JERICHO into the corridor. Connor template uses alive/found Markus for the hold variant. Wiki's “dead or ousted” summary is too broad to negate a returned exile. Inspected current module: M24-gun already reads active Markus/pursuit, not `leader==='Markus'`; the conflict/triage code diagnosis is stale.

**Verdict:** **settled for current code; partially for the in-game predicate, medium confidence**. **Change:** no change; preserve already-implemented returning-exile access. Do not apply the old cabin-leader patch twice. Game-level closure still needs the specified recording.

### ch30-04 — DON'T KISS ends Lover status?

**Decisive observation.** Establish Lover, select DON'T KISS, show the band immediately afterwards, continue on the same save through Night of the Soul to ch32's KISS NORTH menu. Record any intervening relationship changes and whether final KISS is available.

**Hunt and reading.** Searches found [qD5HQWWzc2c](https://www.youtube.com/watch?v=qD5HQWWzc2c), final-kiss clips and a general Crossroads episode, not a continuous refusal-to-final-menu control. An immediate refusal clip cannot settle the downstream unlock.

**Cross-check.** Template specifies a large decrease but no romance termination. North wiki/community rule says Lover persists; the Reddit author explicitly says path unlocks were written from memory. No inspected game string or template supplies an executable romance-reset flag. Numeric trust and the separately unlocked Lover path must not be conflated.

**Verdict:** **partially; medium confidence** in persistence. **Change:** no change to M21b DON'T KISS: retain `northLover` and the large decrease; do not add `northLover=false` without the control.

### ch30-05 — Neutral Alice plus DISTANT

**Decisive observation.** Show Alice Neutral before DISTANT, with prior history known to have reached Neutral, then show the post-choice band and whether she leaves as the raid begins. Compare Warm and Distant controls; resolve whether the check precedes or follows the choice's delta.

**Hunt and reading.** Searches returned [PahjAXRMvsQ](https://www.youtube.com/watch?v=PahjAXRMvsQ), a Trusted-arrival variant and unrelated North footage. Existing l6a1tfMyvlA shows Distant after selection, without a measured incoming Neutral/history control. The new outcome compilation lists Alice-leaves variants but does not expose the requested incoming/history combination.

**Cross-check.** Template condition at Crossroads Kara lines 782–790 refers to below Warm plus DISTANT; current wiki prose instead says never reached Neutral. Older Crossroads oldid 40391 used current Distant plus an unopened memory box. Neither revision attaches a measured test. Game text contains dialogue variants, not the predicate for historical maximum.

**Verdict:** **partially; high confidence in the source conflict, low-medium in the runtime boundary**. **Change:** no unconditional runtime correction. Source-priority candidate K17 `v===1 && aliceMax<ALICE_KEY` → `v===1 && current Alice band below Warm`, with check timing explicitly specified. Do not present that candidate as observed or substitute an invented numeric cutoff.

### ch30-06 — abandoned Luther returns later

**Decisive observation.** Select PROTECT ALICE at Luther's initial corridor wound; escape with Kara/Alice and continue to the later captive encounter without skipping chapters. Show FIND LUTHER & JERRY versus Jerry alone; alternatively record an explicit confirmed later death. Distinguish this from HELP LUTHER → hide him safely.

**Hunt and reading.** New searches returned [RrIJSKFMS8U](https://www.youtube.com/watch?v=RrIJSKFMS8U) and escape/survivor guides. A already inspected its immediate leave-Luther scene; it ends before the later encounter. The newly checked Reddit 12igus1 account explicitly says Luther was **hidden** before Kara was captured and abandoned Alice; the reply places him in the camp. That is the HELP/hide branch and cannot establish survival after PROTECT ALICE.

**Cross-check.** Luther wiki calls death unconfirmed and says he is not seen again; the template narrates presumed death. Ch32's alive/not-with-Kara condition does not prove that this abandonment preserves life. Neoseeker describes the abandonment as fatal, but supplies no downstream controlled recording.

**Verdict:** **not settled; low-medium confidence**. **Change:** no change to K18 PROTECT ALICE `luther=false`/left fate. Narration should distinguish presumed loss from a witnessed death; do not resurrect him from the hidden-Luther example.

## Night of the Soul

### ch31-01 — surviving machine Connor gets THIN ICE

**Decisive observation.** Connor survives the gun contest and shoots Markus; show chapter transition, the entire Night of the Soul sequence and title/flowchart, then any later garden scene. Distinguish replacement dialogue about the previous Connor from a survivor briefing.

**Hunt and reading.** Newly inspected [sHCvhIcfDiA](https://www.youtube.com/watch?v=sHCvhIcfDiA) at **10:14–10:41** is the replacement briefing, not the survivor control. Also downloaded [g2qxWy2XdWk](https://www.youtube.com/watch?v=g2qxWy2XdWk) **2:24:20–2:30:30**: Connor survives after shooting Markus, next appears at Hank's house, then North leads and Connor reaches the rooftop. The inspected passage contains no survivor garden briefing. However, this is an edited Connor-path compilation, so absence cannot prove a skipped scene or date a possibly omitted garden segment.

**Cross-check.** Completed chart gives THIN ICE → THE LAST ASSIGNMENT, with no explicit survived-machine condition. Template's wide condition includes a second variant using `X1303C.ZENGARDEN.BRIDGE` keys; those keys and the revolution lines alone do not prove chapter placement. Wiki/commenters restrict Thin Ice to death/replacement. No new controlled chronology defeats that narrower interpretation.

**Verdict:** **partially; medium-high confidence** in retaining replacement-only Thin Ice. **Change:** no change to CN01 `connorDied && !deviant`; do not widen it solely because the template files the X1303C variant there.

### ch31-03 — Hank dies after resignation and Connor decommissioning

**Decisive observation.** Show Hank resigning, Connor subsequently decommissioned in Last Chance, then Hank's fate on the same history. Test the continued Markus/Kara branch separately from the all-three-gone Kamski ending; do not infer the general rule from a distinct terminal vignette.

**Hunt and reading.** Searches found RvUFfpZ-Fw4, dADTX_M8ZEY and G7yepfhSLFY. They provide Kamski/suicide leads, not a verified resignation → archive decommissioning → later Hank chain. The new machine-path clip instead has a living Connor visiting Hank, so is an exclusion control.

**Cross-check.** Chart and template condition Hank's house on resignation but assume Connor can visit. Hank wiki separately describes suicide in the all-three-gone ending. A's prior absent-Connor Kamski vignette establishes that offscreen suicide can be narrated without Connor; it does not establish this exact general trigger. Talk/history did not add an executable rule.

**Verdict:** **partially; low confidence** in the general gate. **Change:** no change to automatic Hank fate; candidate `hankResigned && Connor absent` → later suicide remains unverified and must not be made unconditional.

## Battle for Detroit

### ch32-02 — non-Lover Companion North reaches store

**Decisive observation.** Show non-Lover Companion before the failed assault **and after its North-down popup**, then record retreat to store or North's shooting. Keep health, North survival and relationship changes visible. Starting at the bottom of Companion and falling to Friend is not a Companion-at-gate test.

**Hunt and reading.** Downloaded [ZXTSnnwlk48](https://www.youtube.com/watch?v=ZXTSnnwlk48) 0:00–3:00: failed assault and retreat with North are visible, but the inspected lead-in does not establish non-Lover Companion at the gate. Store/kiss montages and all-North-deaths clips likewise omit the required incoming band.

**Cross-check.** Chart distinguishes North shot/store without publishing the relation threshold. Template records North small down on failed assault, but no store threshold. PowerPyx and Steam guide say Companion/Lover; current North page and reader reports conflict. Historical wiki changes are assertions, not independently measured tests. The failure decrease is a plausible confound, not proof explaining every report.

**Verdict:** **partially; medium confidence** in the working rule. **Change:** no change to MR10 `northCompanion()`; do not replace Companion-or-Lover with Lover-only, or widen to Friend, from these clips.

### ch32-03 — non-Lover Friend/Companion North takes the bullet

**Decisive observation.** Use a non-romanced Companion save, show band before the barricade QTE, fail the decisive input and show sacrifice/death. Repeat at Friend. A Lover positive control is necessary but cannot establish either lower band.

**Hunt and reading.** Newly downloaded and read [d6TUjGx2Bjs](https://www.youtube.com/watch?v=d6TUjGx2Bjs) 0:00–2:00. At **0:54**, North's popup explicitly reads **LOVER / PATH UNLOCKED**, followed by her sacrifice. Saved that frame and the action at 1:00. This is a clean Lover control and a false positive for the queried non-Lover threshold. The detailed Reddit author reports an actual Companion replay; their Friend extension is explicitly an assumption.

**Cross-check.** Chart shows NORTH TAKES A BULLET FOR MARKUS with no level tag. Template/PowerPyx require Lover; wiki revisions widened the condition without attaching footage. Current North and Battle pages disagree on Companion versus Friend. This pass found no lower-band video satisfying the observation.

**Verdict:** **partially; medium confidence** for the Companion counterclaim, low for Friend; Lover control **high confidence**. **Change:** no change to MD14 `northLover`; candidate `northLover || non-Lover Companion` requires the controlled clip. Do not implement Friend-or-above as settled.

### ch32-04 — rooftop LEAVE needs son / insist

**Decisive observation.** Same sufficiently high Friend save, omit both son questions while preserving the band, inspect LEAVE locked/unlocked; then ask HANK'S SON and INSIST and compare. Record Friend both before and after the arrival decrease. Separate a newly unlocked Friend path from current numeric band.

**Hunt and reading.** Searches returned ce0K_Vis4EM, WQYognX6H4o, D-aFtb70eGc and O9-4IjNAXAI. The newly downloaded [ce0K_Vis4EM](https://www.youtube.com/watch?v=ce0K_Vis4EM) material begins with Allen variants, then Hank. In its **5:00–8:00** excerpt Connor selects HANK'S SON and INSIST, but the ensuing segment proceeds to combat; no incoming Friend band is established. This is not a Friend/no-son control and does not refute the positive Friend-plus-questions sequence. A's WQYognX6H4o 2:44–2:46 positive unlock after both questions remains valid but establishes sufficiency only.

**Cross-check.** Template locks LEAVE only on Friend, while wiki/PowerPyx add the two son questions. The current module stores incoming Friend before the arrival decrease and separately records `ch32cl.insisted`, but availability only checks Friend. No published game string exposes a conjunct proving insist is mandatory.

**Verdict:** **partially; medium-high confidence** in the positive sequence, unresolved necessity. **Change:** no unconditional patch. Candidate C24 option 0 `friendBeforeDrop` → `friendBeforeDrop && ch32cl.insisted` only after the matched negative control.

### ch32-05 — RK900 when soldiers / Perkins kill Markus

**Decisive observation.** Machine Connor alive, Markus killed by soldiers or Perkins rather than Connor, no dirty bomb; show all endgame/credits through the epilogue or main menu. Hold North's leadership/survival outcome fixed. Test soldiers and Perkins separately if the predicates differ.

**Hunt and reading.** New searches returned generic machine-path, Kamski and death compilations. The inspected g2qxWy2XdWk transition shows Connor personally shooting Markus in Crossroads; it cannot test third-party Markus death. Standalone RK900 videos omit attribution. Reddit bs31b5 gives direct-kill recipes and failed attempts, not the specified third-party-kill control.

**Cross-check.** Secret-scene template says machine Connor stopped Markus; wiki widens to Markus dying during Battle. Game strings contain RK900's introduction but no machine-success Boolean. Neither chart nor inspected history/talk/GameFAQs account resolves the attribution predicate. Direct-kill sufficiency does not establish third-party-kill sufficiency.

**Verdict:** **not settled; low confidence**. **Change:** no change to the RK900 epilogue gate; do not narrow or broaden from an unmatched machine ending.

## Supporting controls and carry-forward

- **ch29-03:** still partially settled. The existing office-first recordings support skipping Amanda with insufficient evidence, but the underlying Carlos-only sufficiency predicate remains uncontrolled. No new outcome consequence beyond decommissioning is demonstrated. Candidate garden gate remains provisional.
- **ch29-06:** already settled by A's gameplay memory scan and B's text audit; do not lose that result because this pass focuses on unresolved questions. C20 `map && tablet` → `map && (tablet || eligible repaired/scannable memory route)`, route-specific scan text, no invented random link failure. A's filmed Stratford route does not independently test every body's repair requirements.
- **ch31-05:** optional CHECK ON JOSH for an ousted Markus has no demonstrated ending effect and was not promoted into the outcome inventory. No change recommended from this pass.

## Implied-change decision table

This table distinguishes an implementable result from a conditional candidate. “No change” means the follow-up does not justify altering the current rule; it does not certify that rule as an extracted game constant.

| ID | Verdict / confidence | Exact benchmark implication |
|---|---|---|
| ch28-01 | partially / medium | No change: John priority, then Simon Friend+. Neutral control still missing. |
| ch28-02 | partially / high filmed branch | Supported M19a CHARGE: no arrows → North +1, Josh −2, Simon −1 once. M18g/M18h extension still candidate; initial CONFIRM unchanged. |
| ch28-04 | partially / medium | No change: M18g ATTACK → charge; no new confirmation justified. |
| ch28-06 | partially / medium | No change: PUSH/+1 retained; universality is an adaptation. |
| ch28-07 | not settled / low | No change: no measured replacement for all-chapter conversion tally/group sizes/10 threshold. |
| ch28-09 | partially / high after-ABANDON control | No blanket M18g patch. Preserve after-ABANDON DISPERSE → M18h; any future stand-origin flight correction must track origin separately. |
| ch29-01 | not settled / low | No change: do not replace any-body archive admission with route-solvability check. |
| ch29-05 | partially / medium | No change: C20g 0.25 remains whole-fight calibration, not a measured QTE budget. |
| ch30-01 | partially / medium-high | No change: keep two wound/failure events; do not equate animation bullets with counter increments. |
| ch30-03 | code settled; game partially / medium | No change: returning-exile M24-gun already uses active Markus/pursuit. |
| ch30-04 | partially / medium | No change: DON'T KISS keeps northLover, applies large decrease. |
| ch30-05 | partially / low-medium runtime | Candidate only: K17 historical aliceMax below Neutral → current band below Warm; timing still needs observation. |
| ch30-06 | not settled / low-medium | No change: K18 PROTECT ALICE retains Luther left/unavailable; no witnessed-death claim. |
| ch31-01 | partially / medium-high | No change: CN01 replacement/death-only; survivor garden chronology not established. |
| ch31-03 | partially / low | No change: no general automatic suicide rule for resigned Hank with absent Connor. |
| ch32-02 | partially / medium | No change: MR10 Companion/Lover working gate; check post-failure band. |
| ch32-03 | partially / medium | No change: MD14 Lover working gate; do not treat the Lover clip as Companion evidence. |
| ch32-04 | partially / medium-high positive case | Candidate only: C24 Friend → Friend && insisted; necessity remains untested. |
| ch32-05 | not settled / low | No change: third-party-kill RK900 gate unresolved. |
| ch29-06, carry-forward | settled previously | Retain pending map-to-memory correction; not a new finding of this pass. |

Final frame readings, download inventory and verification results are recorded in the working directory's manifests/logs: 23 clip artifacts and 21 selected frame entries, verified against SHA256. `bun run check` passed. The optional full baseline test run was interrupted after approximately 26 minutes under concurrent shared-machine test load; its partial log is not a passing-suite claim. No benchmark correction is applied by this report.
