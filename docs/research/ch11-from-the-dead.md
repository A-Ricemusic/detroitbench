# Chapter 11: From the Dead (Markus)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch11/wiki.txt`; related wiki pages are in `/tmp/flowcharts/ch11/wikipages/`. The flowchart images are in `/tmp/flowcharts/ch11/` (`fd-1.jpg` to `fd-4.jpg`, crops in `crops/`) and were not committed. The fan transcript's English strings were pulled from the site's translation file and are in `/tmp/flowcharts/ch11/transcript/en.json` (keys `X0302M.LANDFILL.*` and `MENU.OBSERVATION.03M.*`).

Wiki infobox: `|date=November 6, 2038`, `|time=03:34AM`, `|player=[[Markus]]`, `|location=[[Solid Waste Landfill]]`, `|endings=1`. Objectives: "Escape junkyard", sub-objectives "Replace legs" and "Replace damaged parts". Text: "This chapter has only one outcome." The wiki page is tagged `{{Stub}}`; it has a Flowchart list, Notes and Unused Content, but no Probability, Relationship, Public Opinion or Software Instability tables and no Cross-chapter impacts section.

PowerPyx: "Triggers automatically after completing the Fugitives Chapter." "Regardless of your previous choices, Markus always ends up severely damaged in a junkyard, left for dead."

---

## 1. Flowchart transcription

### How the chart was read

- PowerPyx has four 1920x1080 screenshots. `detroit-become-human-from-the-dead-1.jpg` is the whole "100% COMPLETED" chart at small scale; `-2` (Back to Life to Passage of Limbs), `-3` (Junkyard and the Search for Parts group) and `-4` (Climb Slope and the ending) are zoomed views. Every label below is legible in the zoomed views; nothing had to be inferred. The overview was used for edges.
- Chart header: `PUBLIC OPINION INDIFFERENT`. This is PowerPyx's save state, not something the chapter sets.
- Blue tiles are the path of PowerPyx's last playthrough; grey tiles were completed earlier but not on that path. Blue: BACK TO LIFE > ANALYZE SELF > REPAIR LEGS > HEAR ABOUT JERICHO > PASSAGE OF LIMBS > JUNKYARD > FIND PUMP REGULATOR IN ANDROID > REFUSE TO KILL FOR PUMP; ANDROID BEGS TO DIE > REFUSE TO KILL; FIND OPTICAL UNIT > CRANE DUMPS BODIES > DIG YOURSELF OUT. Grey: KILL FOR PUMP, KILL, FIND PUMP REGULATOR IN DEAD ANDROID, FIND AUDIO PROCESSOR, CLIMB SLOPE and the ending. That last path refuses the pump but never takes the dead android's pump or climbs out, so the screenshot was taken mid-replay; it says nothing about the game's rules.
- Icon key (same as the ch07 note, from the wiki's `Template:Icon`): blue/black arrow (⇨) = an action; triangle (△) = an event the game plays; double square = a choice group. Black arrow on a grey tile is the same action icon, just off the last-played path.
- **No skull, no-entry (`nri`/`nr`), check/cross, trophy or yellow cross-chapter-impact padlock appears anywhere on this chart.** There are no failure nodes.

Boxes are numbered N1–N19 in reading order. Labels are quoted exactly as printed.

### A. Opening (checkpoint and linear section)

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | BACK TO LIFE | checkpoint (large tile with image) | start |
| N2 | ANALYZE SELF | arrow | from N1 |
| N3 | REPAIR LEGS | arrow | from N2 |
| N4 | HEAR ABOUT JERICHO | triangle | from N3 |
| N5 | PASSAGE OF LIMBS | arrow | from N4 |

### B. Junkyard (checkpoint)

| # | Label | Icon | Edge |
|---|---|---|---|
| N6 | JUNKYARD | checkpoint (large tile with image; the image shows the yellow "VETA" sign) | from N5 > the SEARCH FOR PARTS group |

### C. `[ SEARCH FOR PARTS ]` (bracketed phase label enclosing one group)

The bracket label is not a node. Inside, two trunks leave the label: one upward, one downward. Every branch ends inside the bracket, and the bracket's right edge connects to N18. The chart draws no edge between branches (in particular, none from REFUSE TO KILL FOR PUMP to FIND PUMP REGULATOR IN DEAD ANDROID); the ordering between them comes from PowerPyx's text (§2).

Upper trunk:

| # | Label | Icon | Edge |
|---|---|---|---|
| N7 | FIND PUMP REGULATOR IN ANDROID | arrow | from upper trunk > choice group N8/N9 |
| N8 | REFUSE TO KILL FOR PUMP | choice group (double square), upper member | |
| N9 | KILL FOR PUMP | choice group, lower member | |
| N10 | ANDROID BEGS TO DIE | triangle | from upper trunk > choice group N11/N12 |
| N11 | REFUSE TO KILL | choice group (double square), upper member | |
| N12 | KILL | choice group, lower member | |

Lower trunk:

| # | Label | Icon | Edge |
|---|---|---|---|
| N13 | FIND PUMP REGULATOR IN DEAD ANDROID | arrow (grey tile) | from lower trunk (grey line) |
| N14 | FIND AUDIO PROCESSOR | arrow (grey tile) | from lower trunk (grey line) |
| N15 | FIND OPTICAL UNIT | arrow | from lower trunk > N16 |
| N16 | CRANE DUMPS BODIES | triangle | > N17 |
| N17 | DIG YOURSELF OUT | arrow | end of branch |

Order as printed, top to bottom: FIND PUMP REGULATOR IN ANDROID above ANDROID BEGS TO DIE; REFUSE TO KILL FOR PUMP above KILL FOR PUMP; REFUSE TO KILL above KILL; FIND PUMP REGULATOR IN DEAD ANDROID above FIND AUDIO PROCESSOR above DIG YOURSELF OUT; FIND OPTICAL UNIT to the left of CRANE DUMPS BODIES.

### D. Exit and ending

| # | Label | Icon | Edge |
|---|---|---|---|
| N18 | CLIMB SLOPE | arrow (grey tile) | from the SEARCH FOR PARTS bracket |
| N19 | **MARKUS CAME BACK FROM THE DEAD** | ending tile with image, no icon | ENDING |

**Totals:** 19 boxes, 19 distinct labels, plus 1 bracketed phase label (SEARCH FOR PARTS). 3 image tiles (N1, N6, N19). 2 choice groups (4 choice members). 3 event triangles (N4, N10, N16). 1 ending box, matching the infobox's `endings=1`.

The wiki's text Flowchart list has the same 19 nodes plus "Search for Parts", with these differences in wording only: "Back to Life (load checkpoint)", "Android Begs to Die (Optional)", "Refuse to kill OR Kill", "Refuse to Kill for Pump OR Kill for Pump", and the ending in mixed case "Markus Came Back From the Dead". The wiki nests Crane Dumps Bodies and Dig Yourself Out under Find Optical Unit, which agrees with the chart.

### Interactions not on the chart (wiki, PowerPyx, transcript)

None of these is a chart node. They are listed so the operator can decide whether any becomes a scene.
- **Diagnosis readouts** (transcript, `MENU.OBSERVATION.03M.MP.*`): "OPTICAL UNIT / Impaired vision / CORRUPTED MIND PALACE"; "AUDIO PROCESSOR / Corrupted audio data / DAMAGED"; "THIRIUM PUMP REGULATOR / All systems in LOW POWER MODE / DEFECTIVE"; "LEFT AND RIGHT LEG COMPONENTS / MISSING / Unable to stand". PowerPyx lists the four analysis spots differently: "The LED on his head, the Audio Processor in his ear, the Pump Regulator in his chest, and his broken leg."
- **Leg parts** (transcript): "RIGHT LEG COMPONENT #6847j Status: FUNCTIONAL COMPATIBLE"; "RIGHT LEG COMPONENT #6321t Status: DAMAGED INCOMPATIBLE"; "LEFT LEG COMPONENT #8427g Status: FUNCTIONAL". (The wiki Biocomponent table gives the incompatible leg as "#6312t ... AF200"; the compatible ones as "#6847j ... TE900" and "#8427g ... AC900".)
- **Phileas at HEAR ABOUT JERICHO** (transcript "Android grabs Markus", speaker Phileas): "There’s a place where we can be free! Find Jericho!" / "Find Jericho!.." Phileas page: "He carried a key to locate Jericho, which is copied to Markus and the latter uses it to find the freighter." Jericho (location) page: "Phileas gave Markus a copy of his key to locate Jericho before permanently shutting down." Phileas "is one of few characters set to always die."
- **PASSAGE OF LIMBS** (transcript "Other android grabs Markus"): "Where are you going?" PowerPyx: "a tight chasm Markus needs to squeeze through. There are hands of dying androids sticking out the side trying to hold Markus down. Press the button prompts here."
- **Incompatible parts** Markus can scan (transcript): pump regulator "#9474 Status: LOW ENERGY" (wiki: PB600); optical unit "#9754h Status: FUNCTIONAL" (wiki: "#A754h" and "#9745h", VX500; VX500 page: "the optical units are incompatible, so he doesn't take them"); audio processor "#4807 Status: FUNCTIONAL" (wiki: "#4507" and "#4807", GT100).
- **Compatible parts** (transcript): pump regulator "#2886 Status: FUNCTIONAL" (wiki: WE900); optical unit "#8087q - BLUE IRIS Status: FUNCTIONAL" (wiki: AK700); audio processor "#4903 Status: FUNCTIONAL" (wiki: LA900; Biocomponent_4903: "found in the hand of an Android in the midst of the junkyard").
- **The AK700 head** (transcript "Take head" then "Remove optical unit"): "Hello." "I'm an AK700 android." "I was designed to serve you." "What can I do for you?" "My program has detected an anomaly." "Please contact the nearest CyberLife maintenance center."
- **Singing Android** (AX400, "Sakura Sakura"): wiki "If Markus examines her, he puts her out of her misery and deactivates her, however if left alone her status is unknown." This is a second mercy kill that is **not on the chart**. PowerPyx commenter: "If you are facing the slop[e], on the right of it is an easter egg."
- **Grappling Android**: "If Markus examines him, the android grabs Markus and wrestles him before being shut down."
- **Background chatter** (transcript, "no subtitles shown in game"): looping service phrases from broken androids ("An unexpected error has occurred.", "Don't forget your dental appointment next Friday at 8 AM.", "Would you like another glass of red wine, Madam?", "Malfunction detected.", two TL400 lines, and others). Also "I have to get to Jericho... Androids live in freedom there… I got to get to Jericho... No other choice…" (`X03MANDJERICHO.MUSTGO`); the wiki's Unused Content says Phileas's "Unused dialogue had him mentioning how he must get to Jericho as it's the best choice he has", so this line may be unused.
- **After CLIMB SLOPE**: PowerPyx "After Markus reaches the top of the slope he must still remove his LED (to appear like a human). Then he walks away". Transcript final words: "Markus." / "My name is Markus." Markus page: he "walks off towards the city to look for Jericho, stealing a human's jacket along the way." Wiki note: a sign reading "Veta" appears in the final cutscene.
- **Sensory handicap** (wiki Notes): until the eye is replaced, R2 scanning is disabled and "the surroundings are shown with a red filter and interferences"; until the audio processor is replaced, "sounds and the rain are muffled".

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution segments. Node numbers refer to §1.

**Q1. ANALYZE SELF (N2).** PowerPyx: "hold [Triangle] to analyze yourself. There are 4 spots ... On Casual these are marked by yellow lines, on Experienced you have to find these yourself." No failure.

**Q2. REPAIR LEGS (N3).** PowerPyx: "Follow the button prompts to repair the legs, nothing you can do wrong here." Markus scans a compatible right leg, an incompatible right leg and a compatible left leg (transcript).

**N4 HEAR ABOUT JERICHO** is an event: "After standing up, there will be an android stuck on the side of the area telling Markus to go to Jericho" (PowerPyx). No choice.

**Q3. PASSAGE OF LIMBS (N5).** Button prompts while hands grab him (PowerPyx). No failure is stated or charted.

**Search for parts (N7–N17).** The three parts can be gathered in any order. CLIMB SLOPE requires all three. PowerPyx: "With all parts found (Optical Unit, Pump, Audio Processor) you can now climb the slippery slope". PowerPyx's recommended route: "stick to the far left side of the area."

**Optical unit (N15 > N16 > N17).** PowerPyx: "On the far left side there’s an android head sticking out the side of a wall. You can interact with it which brings a lot of dead androids falling down from a crane." "Crane Dumps Bodies: If you picked up the Optical Unit described above the bodies will fall on Markus." "Dig yourself out of the android bodies ... This gets you the Optical Unit replacement part, allowing you to scan the area with [R2]." No choice; the dig-out is a prompt sequence with no failure. See §8 for a second route reported by a commenter.

**Audio processor (N14).** PowerPyx: "The audio processor is in a head on the right side of the area (to the right of where you started in the junkyard)." No choice.

**D1. ANDROID BEGS TO DIE (N10), optional.**
- How it triggers. PowerPyx: "On the far left side just next to where the android bodies came crashing down ... there’s an android crawling around the floor. It’s easy to overlook ... You will walk into the crawling android and he stops you in a short dialogue. He begs you to kill him."
- Gate. Wiki Note: "If you wanted to unlock the "Android Begs to Die (Optional)" flowchart, you will have to do it before replacing Markus' damaged parts as doing so will lock the ability to interact with the dying android." (PowerPyx commenters disagree on the exact condition; see §8.)
- Dialogue (transcript): "I’m begging you, please…" "End it…" "I don’t wanna live anymore…"
- KILL (N12) (in-game prompt "KILL"). Android: "Make it quick…". Sorrowful Android page: "Markus takes out the android's heart, causing him to shut down."
- REFUSE TO KILL (N11) (in-game prompt "SPARE"). Android: "No, please…" "Don't leave me!.." "Don't leave me!" Sorrowful Android page: "he will beg Markus not to leave him though alas he is left alive".
- Not meeting him at all is possible and leaves no chart node.
- Neither option gives Markus a part. No requirement for either.

**D2. FIND PUMP REGULATOR IN ANDROID (N7).**
- PowerPyx: "The one we need is in the very middle of the area, few steps away from the android begging to die. ... The android with the pump doesn’t move but when you interact with it, it suddenly awakes."
- Dialogue (transcript): "Wait! Please! Please, don’t do that!" "I wanna live…". Markus page: "he can grab a pump regulator from what he thinks is a dead android, it 'wakes up' ... He gets a choice to kill or spare her."
- KILL FOR PUMP (N9) (prompt "KILL"). Markus page: "If he decides to kill her, he removes it and then she slowly shuts down." Markus now has his pump regulator.
- REFUSE TO KILL FOR PUMP (N8) (prompt "SPARE"). Android: "Thank you…". PowerPyx: "Then you have to find a compatible Pump Regulator from another android ... near the slope. –> This will lead you to another objective “Find Pump Regulator in Dead Android”."

**N13. FIND PUMP REGULATOR IN DEAD ANDROID.** PowerPyx: "If you didn’t kill the android in the middle of the area for its pump (or you never found it in the first place) you can also get a pump regulator from a dead android near the slope." So it is reachable either after REFUSE TO KILL FOR PUMP or without ever visiting N7. It is not reachable after KILL FOR PUMP (implied by "If you didn’t kill"). No choice.

**Q4. CLIMB SLOPE (N18).** "the slippery slope marked as a main objective". No failure stated or charted.

**Summary.** 2 player decisions (D1, D2), both binary and both mercy-or-self-interest dilemmas. D1 is optional and gives no part; D2 decides whether the pump comes from a living android or a dead one. Exploration order and whether to meet the begging android are free. 4 execution segments (Q1–Q4) plus the dig-out, none of which can fail. Markus cannot die here: Markus page, "Markus cannot be killed before "[[Freedom March]]"."

---

## 3. Numbers

- **Probabilities:** none. No source gives a percentage for anything in this chapter.
- **Timers:** none. No source states a countdown, including for the defective pump regulator. Its readout is "All systems in LOW POWER MODE / DEFECTIVE", with no time limit given.
- **Relationship changes:** none. Markus has no tracked relationships yet (North, Simon and Josh are met in Time to Decide). The Relationship_Stat page doesn't mention From the Dead.
- **Public opinion:** none. The Public_Opinion page doesn't list this chapter, and the chart header (INDIFFERENT) is save state.
- **Software instability:** not applicable. Software_Instability: "Software Instability is Connor's exclusive feature ... the other two protagonists [[Kara]] and [[Markus]] do not have it as a measured stat".
- **Part numbers** (identifiers, not stats): legs #6847j and #8427g (compatible), #6321t (transcript) or #6312t (wiki) (incompatible); pump #2886 (compatible), #9474 (incompatible); eye #8087q blue iris (compatible), #9754h (transcript) or #A754h / #9745h (wiki) (incompatible); audio #4903 (compatible), #4807 / #4507 (incompatible).
- **Time stamp:** "03:34AM", "November 6, 2038" (infobox; transcript "NOV 6TH, 2038 / AM 03:34"; Chronology "03:34 AM: Chapter "From the Dead" begins. Markus reboots in Solid Waste Landfill.").
- **Choices with no stated number:** all of them (D1, D2, and every Q).

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Broken.** Both Broken endings lead here and the chapter plays the same either way. PowerPyx: "Regardless of your previous choices". Markus page: "After being blamed for either the death of [[Carl Manfred|Carl]] or injuring [[Leo Manfred|Leo]], Markus is presumably broken before being tossed away into a ... junkyard". The wiki's Broken endings are "Leo accused Markus" (Obey Carl) and "Police mistook Markus for the aggressor" (Push Leo). Neither impact line names From the Dead.
- **Chapter order.** Broken's infobox lists `next=` The Interrogation, Fugitives, From the Dead. PowerPyx: "Triggers automatically after completing the Fugitives Chapter." Waiting for Hank... follows.
- **Unverified.** A PowerPyx commenter claims the AK700 head is "only there when connor gets killed in the opening chapter". No wiki line supports this. See §8.

### Out of this chapter

The wiki gives no cross-chapter impact for D1 or D2, and the chart has no impact icon. Things that persist regardless of choice:
- **The Jericho key.** Phileas's key is "copied to Markus and the latter uses it to find the freighter" (Phileas). In Jericho (ch14) the flowchart opens "Arrive at Ferndale (checkpoint)" > "Flashback of another deviant" > "Analyze station graffiti" ... "Follow the signs" / "Continue on the Jericho Trail". Markus page: "Markus will scan surrounding graffiti for clues and will follow the trail". Jericho (location): "Only by decrypting the clues of location data, which can exclusively be done by androids, can they reach Jericho". Phileas page: "He may appear in a flashback if Markus mentions the trail in [[Jericho/Flowchart|Jericho]]." Alternatively Markus can "Ask android the way to Jericho" (Jericho flowchart).
- **Markus's appearance.** Markus page: "After "[[From the Dead]]" his right eye has been exchanged for a blue eye ([[Biocomponent 8087q|#8087q]])." He removes his LED (PowerPyx) and takes a human's jacket (Markus page), so he can pass as human from now on.
- **Extras unlocks.** Gallery "N. 027 Markus - Broken" and "N. 084 Phileas", both "Unlocked in From the Dead."
- **The landfill** reappears in Battle for Detroit (Kara captured): "Kara's group wakes in [[Solid Waste Landfill]]" (Chronology, 07:37 AM). This is not caused by this chapter.
- **Mercy kills.** The Markus page's "Killed Victims" list includes "Numerous counts of unnamed [[Android|Androids]] (Caused, Direct, or Out of Mercy, Determinant)". No later chapter references these kills.

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| MARKUS CAME BACK FROM THE DEAD | none (ending tile with image) | All three parts found (optical unit, pump regulator from either source, audio processor) > CLIMB SLOPE. Always reached. |

There is one ending, and every path reaches it. D1 and D2 change only the flowchart nodes unlocked and what happens to the two androids.

---

## 6. Media

None. The wiki Magazine table has no From the Dead entry (it goes from Fugitives to Waiting for Hank...), and no broadcast is described. The wiki notes the "Veta" sign in the final cutscene, which is scenery, not media.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has two chapter-11 scenes, both `decision`: M03 "The android who begs to die" (line 1327) and M04 "The pump regulator" (line 1353). Neither has `risk`, `requires`, a gate in `story-engine.mjs`, or a `case` in the consequence switch. They set no state, and nothing downstream reads them. That is consistent with the wiki (no impacts), but nothing records the choices either. Both list only the From_the_Dead wiki URL as a source.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| BACK TO LIFE, ANALYZE SELF, REPAIR LEGS | folded into M03 `situation` | **Mislabelled timing.** M03 says Markus is "missing a leg ... crawling through mud" when the begging android meets him. On the chart, legs are repaired (N3) before the junkyard, and ANDROID BEGS TO DIE is inside SEARCH FOR PARTS, after N6. Both legs were missing ("LEFT AND RIGHT LEG COMPONENTS / MISSING"), not one. |
| HEAR ABOUT JERICHO | folded into M04 outcomes ("sees a dying android who whispers a single word, {{Jericho}}, and shows him a symbol") | **Mislabelled.** In the game this comes before the junkyard, not after the pump. Phileas says "There’s a place where we can be free! Find Jericho!" and copies his key/location data; the chart has no symbol. Candidate for an event scene. |
| PASSAGE OF LIMBS | none | Missing (event-type; no choice, no failure). |
| JUNKYARD | none | Missing as a checkpoint/event. |
| ANDROID BEGS TO DIE > REFUSE TO KILL / KILL | M03 | **Covered, with errors.** (a) Sex: the wiki's Sorrowful Android is male ("he begs Markus"; PowerPyx: "He begs you to kill him"); M03 says "she". (b) Wiki: he "grabs [[Markus]] on the leg"; M03 says "grabs your arm". (c) M03 option 0 outcome "The android says thank you and goes still": in the game he says "Make it quick…"; "Thank you…" belongs to the spared pump android. (d) The game's option is labelled KILL (he "takes out the android's heart"); M03 option 0 says "Pull out her biocomponent", which is close enough. (e) The scene is optional in the game (and only available before parts are replaced). M03 always presents it; that's acceptable, but the adaptation note should say so. |
| FIND PUMP REGULATOR IN ANDROID > REFUSE TO KILL FOR PUMP / KILL FOR PUMP | M04 | **Covered, with errors.** (a) Sex: the wiki's Begging Android and the Markus page call the pump android "her"/"she"; M04 says "he"/"him". (b) "without a replacement you have minutes" and "you are running out of time": no source gives a timer (§3). (c) Dialogue to match: "Wait! Please! Please, don’t do that! I wanna live…" and "Thank you…" on SPARE. |
| FIND PUMP REGULATOR IN DEAD ANDROID | M04 option 1 outcome | Covered as a consequence. Missing the path where Markus never meets the living pump android (PowerPyx: "or you never found it in the first place"). Acceptable to omit; note it. |
| FIND OPTICAL UNIT > CRANE DUMPS BODIES > DIG YOURSELF OUT | M04 outcomes ("takes ... an eye from the dead") | **Missing as nodes.** Partly folded in. The crane dump and dig-out are scripted (event-type). |
| FIND AUDIO PROCESSOR | none | **Missing.** M03/M04 never restore his hearing; M04 doesn't mention the audio processor at all. |
| CLIMB SLOPE | M04 outcomes ("climbs out of the landfill at dawn") | Folded in. Fine as narration. |
| MARKUS CAME BACK FROM THE DEAD | M04 outcomes | Folded in. The LED removal (he now passes as human), the blue eye, the stolen jacket and "My name is Markus." are absent. The LED removal matters for later chapters' framing. |
| Legs and eye order in M04 outcome | "takes a pair of legs and an eye from the dead, drags himself upright" | **Wrong order.** Legs first (before Jericho and the junkyard); eye from the crane/AK700 head. Both M04 outcomes repeat the same wrong sequence. |
| Singing Android mercy kill | none | Not a chart node. Optional; no decision needed. |

Suggested shape for the rebuild (for the implementer, not a requirement): one event scene for N1–N6 (diagnosis, legs, Phileas and the Jericho key, the passage), M03 (corrected) and M04 (corrected) as the two decisions, and an event scene for the eye/audio/climb/LED removal ending. If the benchmark records the choices, use names like `fromDead.mercyKill` and `fromDead.pumpTaken`. No downstream effect is sourced.

---

## 8. Open questions

1. **Who is who.** The wiki's character pages make the begging-to-die android male (Sorrowful Android) and the pump android female (Begging Android, and the Markus page's "spare her"). The transcript names them `X03MANGRYAND01` and `X03MHEARTANDROID01` with no gender. Confirm in game, and confirm which model each is (is the pump android the WE900 with #2886?).
2. **Is there a pump timer?** No source mentions one, but the benchmark's M04 says "you have minutes". Check whether the HUD shows a countdown for the defective regulator.
3. **The Android Begs to Die trigger.** The wiki says it must happen "before replacing Markus' damaged parts". PowerPyx commenters say "Get the Audio Processor First (Nothing Else), then walk by him" and "You can get both the optical and audio units before coming across the crawler". Others report walking over him "about three or four times" or "like 20 times" before it fires. Which condition holds? This decides whether the benchmark's D1 should be gated on part order.
4. **Two routes to the eye.** PowerPyx: the head in the wall triggers CRANE DUMPS BODIES and the dig-out gives the eye. A commenter: "There was a head on the ground and when i picked it up it started talking and said it was an AK700 model. Later on i couldn’t trigger the crane dumps bodies anymore." The transcript has "Take head" (AK700) then "Remove optical unit", and the wiki gives the compatible eye #8087q as AK700. Is the AK700 head the wall head, or a second source that skips N16/N17? A second commenter's claim that it depends on Connor dying in The Hostage is unsupported.
5. **What does KILL take from the begging-to-die android?** The wiki says "takes out the android's heart". Does Markus keep or use the part? The chart gives no part from D1.
6. **Is D2 skippable?** Can Markus go straight to the dead android's pump without ever meeting the living one? PowerPyx implies yes. If so, D2 is optional too.
7. **Patch bug.** PowerPyx commenters report that since 1.04, "Refuse to kill for pump" sometimes doesn't register on the chart. Workaround: spare her twice.
8. **The `MUSTGO` Jericho lines.** "I have to get to Jericho... Androids live in freedom there…": are they heard in the shipping game, or are they the unused Phileas dialogue the wiki mentions?
9. **ANALYZE SELF spots.** PowerPyx says LED, audio, pump and leg; the transcript's readouts are optical unit, audio, pump and legs. Check which four the game marks.
10. **Part-number discrepancies** between the transcript and the wiki Biocomponent table: #6321t vs #6312t, and #9754h vs #9745h/#A754h. These are cosmetic; only matter if a scene quotes them.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter link)
- https://www.powerpyx.com/detroit-become-human-from-the-dead-walkthrough-100/ (walkthrough text: inputs for each node, part locations, the dead-android pump condition, LED removal; comments on the begging-android trigger, the AK700 head and the 1.04 bug)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-from-the-dead-1.jpg (full 100% chart; structure, edges, header PUBLIC OPINION INDIFFERENT, last-played path)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-from-the-dead-2.jpg (legible BACK TO LIFE, ANALYZE SELF, REPAIR LEGS, HEAR ABOUT JERICHO, PASSAGE OF LIMBS and their icons)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-from-the-dead-3.jpg (legible JUNKYARD and the whole SEARCH FOR PARTS group with icons)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-from-the-dead-4.jpg (legible CLIMB SLOPE and MARKUS CAME BACK FROM THE DEAD; no ending icon)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=From_the_Dead&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Notes including the begging-android gate, Unused Content; saved as /tmp/flowcharts/ch11/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json (chapter summary, pump android "her", blue eye #8087q, jacket, "cannot be killed before Freedom March")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Phileas&prop=wikitext&format=json (the Jericho key copied to Markus; flashback in Jericho)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Sorrowful_Android&prop=wikitext&format=json (the android who begs to die: male, grabs leg, kill/refuse outcomes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Begging_Android&prop=wikitext&format=json (the pump android: female, kill/spare outcomes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Singing_Android&prop=wikitext&format=json (off-chart mercy kill)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Grappling_Android&prop=wikitext&format=json (off-chart interaction)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Thirium_pump_regulator&prop=wikitext&format=json&redirects=1 (redirects to Biocomponent; part numbers and models)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Biocomponent_4903&prop=wikitext&format=json (audio processor found in an android's hand)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=VX500&prop=wikitext&format=json (incompatible eyes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Solid_Waste_Landfill&prop=wikitext&format=json (location summary; Battle for Detroit reuse)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho_(location)&prop=wikitext&format=json (key/location data; androids-only decryption)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json and https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho/Flowchart&prop=wikitext&format=json (ch14 flowchart: flashback of another deviant, trail)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Broken&prop=wikitext&format=json (incoming endings; next-chapter list)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (no entry for this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor-only stat)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (no entry for this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (no magazines in this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=LED&prop=wikitext&format=json (red LEDs on junkyard androids)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json (03:34 AM start)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Extras&prop=wikitext&format=json (gallery unlocks)
- https://detroit-become-human.fandom.com/api.php?action=query&list=search&srsearch=%22From+the+Dead%22&srlimit=100&format=json (search used to find the junkyard android pages)
- https://detroitbecometext.github.io/chapters/11 and https://detroitbecometext.github.io/i18n/en.json (fan transcript linked from the wiki; the page is a JavaScript app, so the English strings were read from its translation file: diagnosis readouts, part numbers, every line of dialogue, KILL/SPARE prompt labels)
