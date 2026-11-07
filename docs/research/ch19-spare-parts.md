# Chapter 19: Spare Parts (Markus)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Written 2026-11-06 from the PowerPyx flowchart screenshots and walkthrough text, the Fandom wiki chapter page (wikitext via the MediaWiki API, saved to `/tmp/flowcharts/ch19/wiki.txt`), the wiki's character, stat and later-chapter pages (`/tmp/flowcharts/ch19/wikipages/`), and the fan transcript at detroitbecometext.github.io (chapter 19). The transcript was read two ways: its Angular source template `spare-parts-chapter-content.component.html` (saved as `/tmp/flowcharts/ch19/dbt19.html`), and a rendering of the compiled template against the game-string table `i18n/en.json` (`/tmp/flowcharts/ch19/transcript.txt`, with the chapter's strings dumped to `/tmp/flowcharts/ch19/strings.txt`). The transcript carries the in-game relationship icons for each option and the flowchart labels (`MENU.FLOWCHART.06MB.*`). The wiki has no `Spare_Parts/Flowchart` page and no `Spare_Parts_(Transcript)` page; both return `missingtitle`. Images are in `/tmp/flowcharts/ch19/` and were not committed.

Wiki infobox: `|date=November 6, 2038`, `|time=08:01PM`, `|player=[[Markus]]`, `|location=[[CyberLife Warehouse and Docks]]`, `|endings=3`. Objectives: "Reach CyberLife Warehouse", "Gather spare parts" (sub-objective "Steal an electronic key"), "Escape". The text says: "This chapter has three different outcomes." The page is tagged `{{Stub}}`. Previous chapter in play order: Russian Roulette (Connor). Next: The Eden Club (Connor). Markus's previous chapter is Time to Decide (16), and his next is The Stratford Tower. PowerPyx: "Triggers automatically after completing the Russian Roulette Chapter." Transcript heading: "At the CyberLife warehouses / NOV 6TH, 2038 / PM 08:01".

---

## 1. Flowchart transcription

### How the chart was read

- PowerPyx's page has seven chart images, all 1920×1080:
  - `detroit-become-human-spare-parts-1.jpg` is the full chart, headed "100% COMPLETED". Its labels are too small to read, so it was used for structure and edges.
  - `-2` to `-7` are zoomed views in reading order, with legible labels. `-2` is headed "96% COMPLETED", which means it was taken before the last node was unlocked. The 100% overview is the authority for completeness. Every label on the zoomed views matches a `MENU.FLOWCHART.06MB` string in the game data.
  - `detroit-become-human-wallpaper.jpg` is site art, not a chart.
- The overview header shows five relationship meters under the title. They read approximately PUBLIC OPINION SKEPTICAL, JERICHO RESPECTED, NORTH NEUTRAL, JOSH NEUTRAL and SIMON NEUTRAL (blurry). This is PowerPyx's save state, not something the chapter sets.
- PowerPyx's last playthrough is the blue highlighted path: FOLLOW NORTH > MARKUS DAMAGED > GRAB ANDROID AND HIDE > HOLD POSITION > HUMAN GUARD LEAVES > LEAVE ANDROIDS > ACCEPT > ACCEPT > THREATEN GUARDS > KILL GUARDS > MARKUS SPILLS BLOOD > STEAL KEY > LEAVE WITH TRUCK > MARKUS STOLE A TRUCK FULL OF PARTS.
- Edges were traced on upscaled crops (`/tmp/flowcharts/ch19/crops/`). Where an edge is uncertain, the table says so.

Icon key (checked against the wiki's `Template:Icon` and the ch07 note):
- Arrow (⇨): an action the player takes.
- Triangle (△): an event or consequence the game plays.
- Double square: a group of alternatives, either a choice set or a QTE pass/fail set.
- ✓ / ✗: success / failure marks inside a group.
- Large tile with an image: a checkpoint (HUNTING FOR PARTS, REACH CYBERLIFE, RESUME SEARCH, CONTROL ROOM) or an ending.
- **This chart has no skull (death), no no-entry, no padlock (cross-chapter impact) and no trophy icon.** The three ending tiles carry no icon.

Boxes are numbered N1–N63 in reading order. Labels are quoted exactly as printed.

### A. Docks (checkpoint HUNTING FOR PARTS)

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | HUNTING FOR PARTS | checkpoint tile | > N2 |
| N2 | CLIMB ONTO DOCK | arrow | > N3 |
| N3 | FOLLOW NORTH | arrow | > N4 |
| N4 | ALMOST SPOTTED | triangle | > N5. A short stub line enters it from the left, and its exit merges with a second line at N5. A bypass from N3 straight to N5 is likely; see §8. |
| N5 | CLIMB ON CONTAINERS | arrow | > N6 |
| N6 | PROGRESS TOWARD CYBERLIFE | arrow | > group N7/N8. A stub also enters from the left. |
| N7 | FOLLOW NORTH | group member | > N9 |
| N8 | FOLLOW SIMON | group member | > N9 |
| N9 | DRONE BLOCKS PATH | triangle | > N10 |
| N10 | NEUTRALIZE DRONE | arrow | > group N11/N12 |
| N11 | MARKUS UNHARMED | ✓ | > N13 |
| N12 | MARKUS DAMAGED | ✗ | > N13 |

### B. The warehouse (checkpoint REACH CYBERLIFE)

| # | Label | Icon | Edge |
|---|---|---|---|
| N13 | REACH CYBERLIFE | checkpoint tile | > N14 |
| N14 | GATHER SPARE PARTS | arrow | > N15 |
| N15 | SECURITY ANDROID APPEARS | triangle | > group N16–N19 |
| N16 | ATTACK | group member | > N20 and > N25 (two lines) |
| N17 | GRAB ANDROID AND HIDE | group member | > N20 and > N21 |
| N18 | RUN AWAY | group member | > the long bottom line to N54 (lower ALARM SOUNDS) |
| N19 | HIDE | group member | > the long bottom line to N54 |
| N20 | JOHN BECOMES DEVIANT | triangle | no outgoing edge (side event) |
| N21 | GUARD SEARCHES FOR SECURITY ANDROID | triangle | > group N22–N24 |
| N22 | ATTACK | group member | > N25 |
| N23 | RELEASE | group member | > N26 |
| N24 | HOLD POSITION | group member | > N26 |
| N25 | MARKUS SPILLS BLOOD | triangle | > N27 |
| N26 | HUMAN GUARD LEAVES | triangle | > N27 |

### C. The crates and John (checkpoint RESUME SEARCH)

| # | Label | Icon | Edge |
|---|---|---|---|
| N27 | RESUME SEARCH | checkpoint tile | > N28, and a second line straight to N31 (the crate can be skipped) |
| N28 | FIND CRATE OF ANDROIDS | triangle | > group N29/N30 |
| N29 | FREE ANDROIDS | group member | > N31 |
| N30 | LEAVE ANDROIDS | group member | > N31 |
| N31 | JOHN WANTS TO JOIN | triangle | > group N32/N33 |
| N32 | ACCEPT | group member | > N34 |
| N33 | REFUSE | group member | > drops to the long bottom line > N54 (lower ALARM SOUNDS) |
| N34 | JOHN MENTIONS KEY | triangle | > group N35/N36 |
| N35 | ACCEPT | group member | > N37 |
| N36 | REFUSE | group member | > a separate long line > N55 (lower RUN TO FENCE), with no alarm |

### D. The control room (checkpoint CONTROL ROOM) and the escape

| # | Label | Icon | Edge |
|---|---|---|---|
| N37 | CONTROL ROOM | checkpoint tile | > N38 |
| N38 | ENTER ROOM | arrow | > N39, and > N40 |
| N39 | FIND KEY | arrow | > group N41–N43, and > N40 |
| N40 | MARKUS GETS SPOTTED | arrow | > N52 |
| N41 | THREATEN GUARDS | group member | > group N44–N46 |
| N42 | LURE GUARDS | group member | > group N47/N48 |
| N43 | CREATE BLACKOUT | group member | > group N47/N48 |
| N44 | KILL GUARDS | ✗ | > N49 and > N50 (two lines) |
| N45 | INCAPACITATE GUARDS | ✓ | > N50 |
| N46 | TRIGGER ALARM | ✗ | > N52 |
| N47 | AVOID GUARDS | group member (no mark) | > N50 |
| N48 | FAIL TO AVOID GUARDS | group member (no mark) | > N52 |
| N49 | MARKUS SPILLS BLOOD (copy 2) | triangle | no outgoing edge (side event) |
| N50 | STEAL KEY | arrow | > N51 |
| N51 | LEAVE WITH TRUCK | arrow | > N61 |
| N52 | ALARM SOUNDS (upper copy) | triangle | > N53 |
| N53 | RUN TO FENCE (upper copy) | arrow | > N56 and > N59 (traced; see §8) |
| N54 | ALARM SOUNDS (lower copy) | triangle | inputs: N18, N19, N33 > N55 |
| N55 | RUN TO FENCE (lower copy) | arrow | inputs: N54, N36 > N59 and > N60 (traced; see §8) |
| N56 | DOGS MAUL JOHN | triangle | > group N57/N58 |
| N57 | LEAVE JOHN BEHIND | group member | > N62 |
| N58 | SUSTAIN DAMAGE TRYING TO SAVE JOHN | group member | > N63 |
| N59 | SUSTAIN DAMAGE REACHING THE FENCE | triangle | > N63 |
| N60 | BACK TO JERICHO | arrow | > N62 and > N63 (two lines) |

### E. Endings

| # | Label | Icon |
|---|---|---|
| N61 | **MARKUS STOLE A TRUCK FULL OF PARTS** | ending tile, no icon |
| N62 | **GROUP RETURNED WITH FULL BAGS** | ending tile, no icon |
| N63 | **GROUP FAILED THEIR MISSION** | ending tile, no icon |

Order within groups, as printed: FOLLOW NORTH above FOLLOW SIMON; MARKUS UNHARMED above MARKUS DAMAGED; ATTACK, GRAB ANDROID AND HIDE, RUN AWAY, HIDE; ATTACK, RELEASE, HOLD POSITION; FREE ANDROIDS above LEAVE ANDROIDS; ACCEPT above REFUSE (both pairs); THREATEN GUARDS, LURE GUARDS, CREATE BLACKOUT; KILL GUARDS, INCAPACITATE GUARDS, TRIGGER ALARM; AVOID GUARDS above FAIL TO AVOID GUARDS; LEAVE JOHN BEHIND above SUSTAIN DAMAGE TRYING TO SAVE JOHN.

**Totals:** 63 boxes and 55 distinct labels. Repeated labels: FOLLOW NORTH ×2 (N3 action, N7 choice), ATTACK ×2, ACCEPT ×2, REFUSE ×2, MARKUS SPILLS BLOOD ×2, ALARM SOUNDS ×2, RUN TO FENCE ×2. There are 3 ending tiles, which matches `endings=3`. There are 4 checkpoints.

### Flowchart strings in the game data that are not on PowerPyx's 100% chart

`MENU.FLOWCHART.06MB` also contains `LOOT` = "OPEN BIGGER CRATES", `DIDNT` = "OVERLOOK CRATE OF ANDROIDS", `DIDNT2` = "JOHN DIDN'T JOIN MARKUS", `KILLED` = "JOHN GETS KILLED", `RUN3` = a third "RUN TO FENCE", and `BACK2` = a second "BACK TO JERICHO". None of these appears on the 100% chart. They are probably cut or hidden nodes. Do not build scenes from them. The chart does draw the "overlook" route as a bare edge (N27 > N31).

### Interactions not on the chart

None of these is a chart node. They are listed so the operator can decide whether any of them belongs in a scene's narration.

- **Opening** (transcript): Josh: "This is crazy... If they catch us, we’re dead..." Simon: "What do we do now?" Markus: "We need to find the CyberLife warehouse. That’s where they keep the spare parts and the blue blood." North: "Follow me!" Then "Watch out!", "Now what do we do?", "I’ll find another way…".
- **Lagging behind** (unlock type Time): "Markus! What are you doing?" Wiki: "If Markus takes too long to follow the group, North will impatiently call out to him."
- **The crane fork.** North: "Markus, climb up here!" On the Follow Simon branch: "Where the hell are you going?" / "Markus, that way!" Wiki: "if Markus takes too long to join to jump on the crate with North and Josh, the claw holds the crate will rise up and make it impossible for Markus to follow North."
- **Drone setup.** Simon: "CyberLife warehouses… They have everything we're looking for…" North: "First, we have to get rid of that drone…" Markus: "Leave it to me." In-game prompts (THOUGHTS.0601M): "GET RID OF THE DRONE", "FIND A WAY UP", "WOULD BE SPOTTED / WOULD BE TOO HIGH / WOULD BE TOO FAR", "DRONE DESTROYED". PowerPyx: "Markus has to preconstruct a climbing path to jump on top of the drone to destroy it."
- **Gathering.** Simon: "Quick, open the other crates and fill your bags. Take as much as you can!" Wiki: "Markus can loot the two crates in either order." The objective "BAG FILLED WITH SPARE PARTS".
- **Guard chatter in the control room.** The two guards are Al Dante and Derek Myers: "Goddamn dogs… What the fuck are they barking at?.." / "Could be the weather… They don’t like storms…" / "Is Mike still in Zone 4?" Prompts: "STEAL AN ELECTRONIC KEY", "DON'T BE SEEN", "THREATEN THE GUARDS?", "LURE THE GUARDS OUTSIDE?", "CAUSE A BLACKOUT ?". Object prompts: "ATTRACT GUARD / CANCEL" (barrel), "SHORT CIRCUIT / PUT BACK" (screwdriver), "TAKE GUN / CANCEL".
- **Blood on the hand.** Wiki Notes: "If Markus killed Mike and/or Derek, then upon returning under the condition that the mission is successful, the scene will end with Markus looking at his blood covered hand."
- **Closing speech in Jericho.** There are two versions. One plays on "Successfully escaped or Markus was rescued" ("…Our days of slavery are over… We are people, we are alive, WE ARE FREE!"). The other plays on "Ran away when the guard arrived" ("Yes... we took a risk... And yes, we failed… But at least we tried…").

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution checks (QTEs or movement). Node numbers refer to §1. The in-game prompt labels come from `X0602M.*.CHOICEGROUP*` in the game strings. Where they differ from the chart labels, both are given.

**D1. The crane (N6 > N7/N8).**
- FOLLOW NORTH: jump on the crane crate with North and Josh. FOLLOW SIMON: jump over the containers. PowerPyx: "North will call you to follow her. You can either do that and jump on the crane with her or you can follow Simon and jump over the rest of the containers." Josh comments "Nice…" on the crane, and Markus says "I’ll go around…".
- No requirement. No stat effect in any source. Both routes rejoin at DRONE BLOCKS PATH.

**Q1. The drone (N10 > N11/N12).**
- MARKUS UNHARMED ✓: "Quickly press the shown button". MARKUS DAMAGED ✗: "Fail to press any buttons while jumping on the drone" (PowerPyx). Dialogue on success: Simon "You okay?", Markus "Yeah… Yeah, I’m fine.", North "Good job, Markus…". On failure: Simon "Markus… You alright?", Markus "Nothing I can’t handle…", North "Nice work…".
- The drone is always neutralized. Only Markus's damage and the relationship deltas differ.

**D2. The security android (N15 > N16–N19).** John (a GJ500) says: "You are trespassing on private property. Your presence constitutes a Level 2 infraction. I will notify security." Then Mike, the human guard: "JOHN! JOHN! Goddamn machine... where is it this time?" The in-game prompts are KILL HUMAN GUARD / SEIZE ANDROID / FLEE / HIDE, plus a `[do nothing]` string.
- **ATTACK** (KILL HUMAN GUARD): Markus kills Mike. Leads to MARKUS SPILLS BLOOD and JOHN BECOMES DEVIANT. Wiki John: "If Markus kills the guard, John will deviate on his own due to the emotional shock he experiences." Then RESUME SEARCH.
- **GRAB ANDROID AND HIDE** (SEIZE ANDROID): Markus converts John ("I need your help…"). Leads to JOHN BECOMES DEVIANT and GUARD SEARCHES FOR SECURITY ANDROID, then D3.
- **RUN AWAY** (FLEE): "Let's get outta here!" Mike: "What are you waiting for? Hit the fucking alarm!" Leads to lower ALARM SOUNDS. Wiki John: "If Markus runs, John will again trigger the alarm." **Experienced difficulty only.** PowerPyx commenter: "I wasn’t given the option to “run away”… The game needed to be on a harder difficulty instead of the easier one."
- **HIDE**: John reports them: "There are four androids hiding behind these crates." Mike orders the alarm. Leads to lower ALARM SOUNDS. PowerPyx (corrected after reader reports): "You can hide but the second security guard will see you and it ends in the team running away and ending the mission early."
- No requirement for any option.

**D3. Guard searches for John (N21 > N22–N24).** Only after GRAB ANDROID AND HIDE. The in-game prompts are KILL HUMAN GUARD / RELEASE ANDROID / DON'T MOVE.
- **ATTACK**: Markus kills Mike. Leads to MARKUS SPILLS BLOOD. Wiki John: "If Markus attacks the guard, John will stand by and not react."
- **RELEASE**: John covers for them: "I was inspecting the platform. Everything is in order." Mike: "Good - then I’m going back to the control station. I'm soaked. Take the drone to maintenance and make a report." Leads to HUMAN GUARD LEAVES.
- **HOLD POSITION** (DON'T MOVE): Mike: "First the drone, now this… Just my luck…" Wiki: "Mike will shine his flashlight around the crates but misses the androids." Leads to HUMAN GUARD LEAVES.
- None of these can fail. The chart has no alarm edge out of this group.

**D4. The crate of androids (N28 > N29/N30), optional.** Markus: "Why aren’t you like us? Don’t you wanna be free?" The in-game prompts are FREE THEM / CLOSE AGAIN.
- FREE ANDROIDS: Markus wakes three AP700s (wiki CyberLife_Warehouse_and_Docks: "Markus can also convert three AP700 androids"). This is the first on-screen use of Markus's converting touch (Markus page). LEAVE ANDROIDS: nothing.
- The crate can be skipped. The chart draws a line from RESUME SEARCH straight to JOHN WANTS TO JOIN, and PowerPyx says "climb up the platform to the big box". Freeing changes the dialogue at D5: "Awoke androids" gives Simon "We can’t bring them back with us. It’s too dangerous!" and Markus "They come with us."

**D5. John wants to join (N31 > N32/N33).** Always reached once the warehouse phase continues. Simon: "That’s all we can carry. Let’s go!" John: "Take me with you." North: "He’s on their side. We can’t trust him." Josh: "He took a risk for us. We can’t just leave him here." Simon: "We can’t bring him back. It’s too dangerous!"
- **ACCEPT**: "He comes with us." (or "They come with us." if D4 freed the androids). John joins and goes on to JOHN MENTIONS KEY.
- **REFUSE**: "I'm sorry. You can’t come with us." John: "I helped you… It’s not fair. I helped you and now you’re just gonna leave without me? You’re no better than humans. YOU'RE NO BETTER THAN HUMANS!" North: "He triggered the alarm! RUN!" Leads to lower ALARM SOUNDS. The bags are already full.

**D6. The truck key (N34 > N35/N36).** Requires ACCEPT at D5. John: "I know where you can find more spare parts. … The trucks. They're full of biocomponents. They run on auto pilot, but they can be driven manually with a key. … Down there, in the control station. There are two human guards. You'll have to get the key without being noticed." Simon: "This is suicide, Markus. Our bags are full." North: "This is a truck full of spare parts… There’d be enough for all of us… We can't pass this up!" Josh: "And if we get killed, our people will have nothing. We can’t take that chance. It’s too risky!" The in-game prompts are GET THE KEY / LEAVE.
- **ACCEPT** (GET THE KEY): "Wait here. If I'm not back in ten minutes, go without me." North: "I'm coming with you." Markus: "No, I’m going alone." Leads to CONTROL ROOM.
- **REFUSE** (LEAVE): "It’s not worth the risk. We have what we need." John: "We can go over the fence. It’s the quickest way out." Leads to lower RUN TO FENCE with no alarm.

**D7. The control room (N39 > N40–N43).** Requires D6 ACCEPT. PowerPyx: "Press L1 to locate the key inside the guard house."
- **THREATEN GUARDS**: take the gun from the case. Wiki Derek_Myers: "they will throw their guns on the ground. When Markus moves to get the key, Derek kicks his chair to knock Markus off balance, then he and Al attempt to subdue him." This leads to Q2.
- **LURE GUARDS**: kick a barrel outside (ATTRACT GUARD). Guards: "Fuck, what was that?" / "The drums fell down…". Leads to Q3.
- **CREATE BLACKOUT**: screwdriver in the server (SHORT CIRCUIT). Guards: "Must be the fuse box…" / "Somebody jammed the circuit with a screwdriver!" / "There must be someone in here… Show yourself!" Leads to Q3. Wiki: "They will not start looking for you until they have investigated the short & do not look outside."
- **MARKUS GETS SPOTTED**: do none of the three and walk into the guards (PowerPyx: "Walk straight into the two guards and they will spot you and ring the alarm"). The chart draws it from both ENTER ROOM and FIND KEY. Leads to upper ALARM SOUNDS.

**Q2. The fight after threatening (group N44–N46).**
- KILL GUARDS ✗ > MARKUS SPILLS BLOOD **and** STEAL KEY. PowerPyx: "press all button prompts until you are done chocking the small guard… After chocking the guard stop pressing any buttons. Then the big guard points a gun at Markus. Markus pushed the small guard into the big one and then uses his own weapon to kill him." The chart counts this as a failure, but Markus still gets the key. Wiki Notes: "Despite the flowchart stating that Markus killed both guards in the control room, Al Dante is never killed onscreen regardless." Only Derek dies.
- INCAPACITATE GUARDS ✓ > STEAL KEY. "Win the fight against the guards after threatening them with the gun."
- TRIGGER ALARM ✗ > upper ALARM SOUNDS. "Don’t press any buttons during the guard fight and they will ring the alarm." Guard: "Motherfucker! Hit the alarm! Hurry!"

**Q3. Stealth (group N47/N48).**
- AVOID GUARDS > STEAL KEY. PowerPyx: "get back inside through the window and pick the key from the console. Get back outside through the window before the guards come back. Do not be seen by the guards during this!"
- FAIL TO AVOID GUARDS > upper ALARM SOUNDS. Guards: "There!" / "Don't move, asshole!" / "Holy shit! Hit the alarm, hurry!"
- A PowerPyx commenter reports reaching both nodes in one run. Possibly Markus can be seen after taking the key; see §8.

**After STEAL KEY.** North: "Did you get it? Nice." Markus: "Hurry, get in!" Prompts: "GET INSIDE TRUCK", "DRIVE OUT OF THE DOCKS". This leads to LEAVE WITH TRUCK and the truck ending. No failure is possible after the key.

**Q4. Run to the fence, upper copy (after a control-room alarm).** Markus: "We need to move!" John: "We have to get to that fence!"
- Reaching the fence triggers DOGS MAUL JOHN, which leads to D8. North: "It’s too late. If we go back we’ll be killed too!"
- Taking too long gives SUSTAIN DAMAGE REACHING THE FENCE and the mission failed. The objective is "ESCAPE OVER FENCE". A commenter: "I wasn’t making it to the fence in time. Problem solved."

**D8. Dogs maul John (N56 > N57/N58).** The in-game prompts are SAVE / ABANDON.
- ABANDON (LEAVE JOHN BEHIND) > GROUP RETURNED WITH FULL BAGS. John is killed.
- SAVE (SUSTAIN DAMAGE TRYING TO SAVE JOHN) > GROUP FAILED THEIR MISSION. North: "MARKUS!" In Jericho: "Okay, where's John?" / "He didn't make it." / "We had to leave our bags… We didn’t bring back much…" PowerPyx: "go back to save John and mess up the button sequence." A commenter: "No matter what I do, I get no button sequence for when the dog attacks… you can’t save John if you run."
- Wiki John: John "dies regardless if Markus chooses to go back for him or leave."

**Q5. Run to the fence, lower copy (after RUN AWAY, HIDE, REFUSE John, or REFUSE the key).** North: "Over the fence! Quick!" The drone: "You are committing a class 3 offense. This infraction is being reported to the Police. Stay where you are." Taking too long: "Markus, what are you doing? Hurry up!"
- Making it leads to BACK TO JERICHO. The ending is full bags, or failed if the group ran at the first encounter.
- Failing leads to SUSTAIN DAMAGE REACHING THE FENCE ("Fail to escape": North "MARKUS!"), and the mission is failed.
- After REFUSE of the key there is no alarm. John leads the group to the fence: "That fence over there. It leads to the outside." / "Ok, let's go!"

**Summary.** There are 8 player decision points, D1–D8. All are genuine choices except that D7's MARKUS GETS SPOTTED is reached by inaction. There are 5 execution checks: Q1 drone, Q2 fight, Q3 stealth, Q4 and Q5 the fence. ALMOST SPOTTED is a movement event, not a choice; see §8. RUN AWAY is Experienced-only.

---

## 3. Numbers

**Probabilities:** none. The wiki page has no Probability table and gives no percentage for any node. PowerPyx gives none.

**Timers:** none quantified. Markus's line "If I'm not back in ten minutes, go without me" is narrative, not a timer. The fence run and the lagging-behind call are `UnlockType.Time` conditions in the transcript ("Take too much time") with no stated duration.

**Public opinion:** no change in this chapter. The Public_Opinion page has no Spare Parts entry. Wiki Unused Content: "If the mission was successful, the news would react to the events. Killing Mike and/or Derek would have decreased the relationship status with the Public Opinion." That effect is unused.

**Software instability:** not applicable. Software_Instability: "Software Instability is Connor's exclusive feature".

**Relationships.** The Markus scales (Relationship_Stat, ch16 note) are Jericho: Leader / Admired / Respected / Neutral / Unpopular / Rejected; North, Josh and Simon: Lover / Companion / Friend / Neutral / Resentful / Hostile. All start at Neutral before Time to Decide. Below, "small" and "large" are the game's single and double arrows. The engine's convention is ±1 and ±2.

Each row cites the transcript icon (T) and the wiki chapter page or Relationship_Stat line (W), with PowerPyx (P) where it gives one.

| Event (node) | Jericho | North | Simon | Josh | Source lines |
|---|---|---|---|---|---|
| MARKUS UNHARMED (N11) | small up (W only) | small up | small up | small up | T: "Succeed Attacking Drone" North/Simon/Josh SmallUp, no Jericho icon. W: "Neutralized the drone and remained unharmed {{Icon\|up}}" under Jericho, North, Josh and Simon. |
| MARKUS DAMAGED (N12) | small down (W only) | small down | small down | small down | T: "Fail Attacking Drone" North/Simon/Josh SmallDown. W: "Neutralized the drone but Markus got damaged {{Icon\|down}}" ×4. P commenter: "you will lose respect with North, Josh, Simon and Jericho." |
| ATTACK at D2 or D3 (kill Mike) | — | — | — | **large down** | T: `KILLGUARD` and `ATTACK` each "Josh LargeDown". W Josh: "Killing the human guard when he comes to check on John {{Icon\|largedown}}"; Relationship_Stat: "Choosing to kill the security guard in Spare Parts." |
| RUN AWAY (N18) | small down | small down **×2** | small down | small down | T: `RUNAWAY` North SmallDown, North SmallDown, Jericho SmallDown, Josh SmallDown, Simon SmallDown. W: "Choose to run away when the human guard comes to check on John {{Icon\|down}}" (North: "x2"). |
| HIDE (N19), GRAB, RELEASE, HOLD | — | — | — | — | T: no icons. W: none. |
| FREE ANDROIDS (N29) | small up (W, P only) | small up | small up | small up | T: `FREE THEM` North/Simon/Josh SmallUp, no Jericho icon. W: "Releasing the androids from the crate {{Icon\|up}}" ×4. P: "North▲, Jericho▲, Josh▲, Simon▲". |
| LEAVE ANDROIDS (N30) | — | — | — | — | T: "ø". P: "no benefit". |
| ACCEPT John (N32) | small up (W only) | small down | small down | small up | T: `ACCEPT` North SmallDown, Simon SmallDown, Josh SmallUp. W: "Taking other androids with them" Jericho up, North down, Simon down, Josh up. P: "Josh ▲, Simon ▼"; commenter: "deteriorates your relation with North (North ▼)". |
| REFUSE John (N33) | — | — | — | — | T: none. W: none. |
| ACCEPT key / GET THE KEY (N35) | — | small up | small up | small down | T: North SmallUp, Simon SmallUp, Josh SmallDown. W: "Agree to steal truck with supplies" North up, Simon up, Josh down. P commenter: "North and Simon small opinion raise when you accept to get key from office. Josh small opinion fall." |
| REFUSE key / LEAVE (N36) | — | small down | — | small up | T: North SmallDown, Josh SmallUp. W: "Refuse to steal truck with supplies" North down, Josh up. |
| Seen by the guards, alarm in the control room (N40, N48, probably N46) | small down **×2** | small down **×2** | small down | small down | T: "Be seen by the guards" Jericho ×2, North ×2, Josh, Simon SmallDown. W: "Running to the fence after failing to get the key {{Icon\|down}}" (North "x2"), plus Jericho "Dogs maul John as he tries to escape {{Icon\|down}}". Relationship_Stat (North) lists both "The alarm sounds after Markus fails to get the key" and "Running to the fence after failing to get the key". Wiki Note: "If Markus fails to get the key, Markus' relationship with North decreases twice, though this does not apply if he took it prior to being detected by the guards." |
| THREATEN, KILL GUARDS, INCAPACITATE | — | — | — | — | T: "Threaten guards with the gun" ø. Wiki Note: "Killing Derek is one of the only instances where killing a human does not decrease Markus' relationship with Josh… Josh didn't see it happen." |
| SAVE / ABANDON John (D8) | — | — | — | — | T: no icons on either. |
| Ending: MARKUS STOLE A TRUCK FULL OF PARTS | **large up** | **large up** | **large up** | small up | T: "Successfully escaped and stole the truck" Jericho/Simon/North LargeUp, Josh SmallUp. W: "Successfully stole a truck full of parts" largeup (Jericho, North, Simon), up (Josh). P: "North▲▲▲, Jericho▲▲▲, Josh▲, Simon▲▲▲". |
| Ending: GROUP RETURNED WITH FULL BAGS | small up | small up | small up | small up | T: "Successfully escaped, without stealing the truck" all four SmallUp. W: "Returned to Jericho with full bags {{Icon\|up}}" ×4. |
| Ending: GROUP FAILED, ran at the first encounter | **large down** | small down | small down | small down | T: "Ran away when the guard arrived" Jericho LargeDown, Simon/North/Josh SmallDown. W: Jericho "Failing the mission {{Icon\|largedown}}"; North "Failed the mission but Markus managed to run away {{Icon\|down}}". |
| Ending: GROUP FAILED, Markus damaged at the fence or saving John | **large down** | **large down** | small down | small down | T: "Markus failed to escape and had to be rescued" Jericho LargeDown, Simon SmallDown, North LargeDown, Josh SmallDown. The "Markus went back to save John" lines are nested inside this block, so both damage endings take these icons. W North: "Failed the mission and Markus was attacked by the dogs {{Icon\|largedown}}". |

Choices with no stated number: FOLLOW NORTH / FOLLOW SIMON, ALMOST SPOTTED, HIDE, GRAB ANDROID AND HIDE, RELEASE, HOLD POSITION, LEAVE ANDROIDS, REFUSE John, every control-room method, KILL GUARDS, INCAPACITATE GUARDS, AVOID GUARDS, and SAVE / ABANDON.

Totals for some paths, from transcript icons only (small = 1, large = 2), for checking an implementation:
- Stealth truck run. Drone ✓, grab and release, free, accept, get key, lure, avoid: Jericho +2, North +4, Simon +4, Josh +3. Adding the wiki-only Jericho icons (drone, free, accept) gives Jericho +5.
- Same, but John refused after freeing (full bags via the alarm): Jericho +1, North +3, Simon +3, Josh +3.
- Ran at the first encounter, drone ✓: Jericho −3, North −2, Simon −1, Josh −1.
- Truck attempt caught in the control room, then ABANDON (full bags), drone ✓, crate left: Jericho −1, North 0, Simon +1, Josh +1.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Nothing gates any node.** The transcript has no `[CONDITION]` naming an earlier chapter, and the wiki states no requirement. The only conditions are internal: "Follow Simon", the drone result, "Awoke androids", "Create short-circuit", "Attract the guards by knocking a barrel", "Threaten guards with the gun", "Be seen by the guards", and the "Stole the key" / "Ran away" ending blocks.
- The setup comes from Time to Decide (16): `CHECK EMPTY CRATE` "(Obtains a location for parts)" and `TALK TO SIMON` > `MARKUS HATCHED A PLAN`. Markus: "The CyberLife warehouses in Detroit Harbor, they have everything we need" (ch16 note). The whole crew always goes. Josh "only decides to help Markus steal spare parts when North and Simon volunteer as well."
- The relationship levels from Time to Decide carry in. Nothing here is gated on them.
- Difficulty: RUN AWAY appears only on Experienced (PowerPyx commenter, above).

### Out of this chapter

- **John.** The game string `MENU.FLOWCHART.10M.GC.JOHNALIVE` = "JOHN JOINED IN 'SPARE PARTS'" is a Freedom March chart node. Freedom_March: "{{Icon|impact}} John joined in '[[Spare Parts]]' > [[John]] Sacrifices Himself > {{Icon|impact}} '''''John Gave His Life to Save Markus'''''". Note: "If John joined Jericho in [[Spare Parts]], he will always sacrifice himself regardless of Simon's presence." Markus page: "If he did not rally [[John]] during the "[[Spare Parts]]" chapter and [[Simon]] is dead or has a poor relationship with Markus, a SWAT officer will shoot Markus in the head."
  - **John survives the chapter** if ACCEPT and then either MARKUS STOLE A TRUCK FULL OF PARTS or REFUSE of the key. John page: "If Markus is able to steal the extra biocomponents successfully or leaves without the key, John will later be seen in Jericho."
  - **John dies** at DOGS MAUL JOHN, whether Markus picks SAVE or ABANDON. John page: "John will be attacked by a security dog, and dies regardless if Markus chooses to go back for him or leave."
  - **Glitch.** John page Notes: "If Markus goes to steal a truck but gets caught and then does not move towards the fence (and so does not trigger the scene of John being attacked by a dog), characters will act as if John died but he will still appear in Freedom March." The chapter Notes say the same. This is the upper SUSTAIN DAMAGE REACHING THE FENCE path.
  - **REFUSE John** leaves him at the warehouse. He does not appear later.
  - John in Crossroads (John page): "As Kara it is possible to catch a glimpse of John in [[Crossroads]] at Jericho if Markus charged at the soldiers or ran away."
- **Relationship levels** carry forward. Jericho "Unpopular" in Crossroads drops to "Rejected" (Markus is ousted). Simon's Freedom March sacrifice needs Markus "not unpopular" (Freedom_March) and Simon "at least Friend" (Simon page). This chapter has the largest swings in the early Markus arc: up to two large ups, or a large down.
- **Mike and Derek.** Their deaths appear only in the Markus page's "Killed Victims" list ("[[Mike]] (Determinant)", "[[Derek Myers]] (Accidental, Determinant)"). No later chapter is said to react. The news reaction is unused content.
- **The three freed AP700s.** No later reference on the wiki.
- **The parts.** The Stratford Tower and North pages say only "Having gotten enough parts for the Jericho androids". No later chapter branches on which ending was reached, apart from the relationship deltas.
- **Possible Connor clue.** The game strings have `THOUGHTS.02A04.MEDICAL` = "ANDROID SPARE PARTS REPORTED STOLEN", in the same set as "FIND DEVIANT LEADER" and "FREIGHTER IS RIGGED". That is evidently Connor's Jericho infiltration. No source says whether it depends on this chapter's ending. See §8.
- Capitol Park's "If Markus fails to invade the CyberLife warehouse" / "successfully raids the CyberLife warehouse" lines refer to the **Capitol Park CyberLife store**, not this warehouse. They are not a dependency on this chapter.

**Can anyone die here?**
- **Markus cannot.** Markus page Trivia: "Markus cannot be killed before "[[Freedom March]]"." SUSTAIN DAMAGE nodes are damage only: "North went back to save you… We managed to get away before the humans arrived...".
- North, Simon and Josh cannot die here. No source lists a death for them in this chapter.
- **John** can die (DOGS MAUL JOHN).
- **Mike** dies on either ATTACK.
- **Derek Myers** dies on KILL GUARDS.
- **Al Dante** never dies, despite the chart's "KILL GUARDS".

---

## 5. Endings

| Chart label | Icon | Conditions | State after |
|---|---|---|---|
| **MARKUS STOLE A TRUCK FULL OF PARTS** | none | D5 ACCEPT > D6 ACCEPT > STEAL KEY via INCAPACITATE GUARDS, KILL GUARDS, or LURE/BLACKOUT + AVOID GUARDS > LEAVE WITH TRUCK. Jericho: "A truckload! We stole a whole truckload! / We got biocomponents for everybody! / We couldn’t have done it without Markus..." | John alive and with Jericho. Derek dead if KILL GUARDS; Mike dead if ATTACK at D2/D3. |
| **GROUP RETURNED WITH FULL BAGS** | none | (a) D5 REFUSE > alarm > lower fence > BACK TO JERICHO; (b) D6 REFUSE > lower fence > BACK TO JERICHO; (c) control-room alarm > upper fence > DOGS MAUL JOHN > LEAVE JOHN BEHIND. Jericho: "We have blue blood and biocomponents! / There will be enough for everyone!" | John: (a) left at the warehouse; (b) alive and with Jericho; (c) dead. |
| **GROUP FAILED THEIR MISSION** | none | (d) D2 RUN AWAY or HIDE > lower alarm > lower fence > BACK TO JERICHO ("We took what we could, but we had to run before we could fill our bags…"); (e) SUSTAIN DAMAGE REACHING THE FENCE on either fence; (f) DOGS MAUL JOHN > SUSTAIN DAMAGE TRYING TO SAVE JOHN ("We had to leave our bags…"). | Markus damaged in (e) and (f). John dead in (f). In (e) John is dead on the upper fence (but see the glitch in §4) or as in (a)/(b) on the lower fence. |

PowerPyx: "Markus Stole A Truck Full of Parts: You allowed John to join you so he gives you info about the truck. Then you go the key from the guard house and used it on the truck to drive away." "Group Returned with Full Bags: You got rid of the second security guard that comes around while you’re stealing from the boxes. Then you can loot another box and put the contents in your bag before you leave." "Group Failed Their Mission: You did not get enough parts or had to leave everything behind. When the second security guard comes simply pick the “Run Away” option."

There is no death ending for Markus and no ending icon of any kind.

---

## 6. Media

None.
- The wiki Magazine page has no Spare Parts entry. PowerPyx lists no magazine.
- No TV or radio is described.
- The only broadcast idea is unused ("If the mission was successful, the news would react to the events").
- The benchmark's `R18` (Russian Roulette) and `R20` (The Eden Club) are the neighbouring media scenes and belong to other chapters.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has four chapter-19 scenes, all `decision`:
- `M05` "The security android"
- `M06` "The dormant androids"
- `M07` "{{John}} wants to join"
- `M08` "The truck"

There are no event or media scenes. Engine logic is in `benchmark/story-engine.mjs`: gates at lines 86–88 and consequences at lines 217–220. The downstream use is `s.john` in Freedom March (`M19`, line 240; charge branch line 242).

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| HUNTING FOR PARTS, CLIMB ONTO DOCK, FOLLOW NORTH, ALMOST SPOTTED, CLIMB ON CONTAINERS, PROGRESS TOWARD CYBERLIFE | folded into the `M05` situation ("You have led North, Simon and Josh on a night raid") | **Missing** as an event scene. |
| FOLLOW NORTH / FOLLOW SIMON | none | **Missing** decision (no stat effect). |
| DRONE BLOCKS PATH > NEUTRALIZE DRONE > MARKUS UNHARMED / MARKUS DAMAGED | none | **Missing.** This is a QTE with ±1 North/Simon/Josh, and ±1 Jericho per the wiki. |
| REACH CYBERLIFE, GATHER SPARE PARTS, SECURITY ANDROID APPEARS | `M05` situation | Covered as narration. The situation says Mike "is walking toward you both". |
| D2: ATTACK / GRAB ANDROID AND HIDE / RUN AWAY / HIDE | `M05` options 0 (grab, risk 0.15), 1 (attack, risk 0.1), 2 (run) | **Partly covered.** HIDE is **missing**. **Both risks are unsupported.** The chart has no failure branch out of GRAB or ATTACK: both go to JOHN BECOMES DEVIANT, and the alarm comes only from RUN AWAY and HIDE. Option 0's failure ("The guard spots them. Alarms sound") and option 1's failure ("The guard gets a shot off and hits the alarm before he dies") have no source. |
| `M05` option 1 effects | `josh(-2)` | Matches the transcript (Josh LargeDown). |
| `M05` option 2 effects | `jer(-2); north(-2); simon(-1)` | **Wrong.** The game gives the choice icons Jericho −1, North −2, Simon −1, Josh −1, then the "Ran away" ending Jericho −2, North −1, Simon −1, Josh −1. Total: Jericho −3, North −3, Simon −2, Josh −2. The engine has no Josh change at all. |
| D3: GUARD SEARCHES FOR SECURITY ANDROID > ATTACK / RELEASE / HOLD POSITION > MARKUS SPILLS BLOOD / HUMAN GUARD LEAVES | none (merged into `M05` option 0's outcome text, which describes HOLD) | **Missing.** The second kill option (Josh large down) and RELEASE (John covers for them) are absent. |
| JOHN BECOMES DEVIANT | implicit | Covered in effect. John deviates on GRAB and on ATTACK. |
| RESUME SEARCH > FIND CRATE OF ANDROIDS > FREE / LEAVE | `M06` | **Mislabelled.** Option 0 says "Wake them and bring them with you", and its outcome says "They follow Markus out of the container". In the game, freeing does not take them anywhere. Bringing them is part of D5 ACCEPT ("They come with us."). The `M06` situation says "a shipping container full of brand-new androids standing inert in rows, waiting to be sold". The game has three AP700s. Effects `jer(1);north(1);simon(1);josh(1)` match the wiki. The transcript has no Jericho icon. |
| N27 > N31 (crate skipped) | none | Not modelled. Low priority. |
| D5: JOHN WANTS TO JOIN > ACCEPT / REFUSE | `M07` | **Partly covered.** ACCEPT is `josh(1);simon(-1)`. **North −1 is missing** (transcript), and so is the wiki's Jericho +1 when the androids come too. REFUSE is described correctly in `adaptationNote` and the event, but the engine applies no ending effect: the full-bags small ups for all four never fire. The situation puts North **and Simon** against John for being "a tracker or a traitor"; in the game North says "We can’t trust him" and Simon says "It’s too dangerous!". That is acceptable. |
| D6: JOHN MENTIONS KEY > ACCEPT / REFUSE | merged into `M08` (option 2 = leave) | **Conflated.** The key decision and the method decision are one scene with three options. GET THE KEY's own icons (North +1, Simon +1, Josh −1) are never applied. LEAVE `north(-1);josh(1)` matches the transcript, but the full-bags ending +1 ×4 is missing. |
| D7: THREATEN / LURE / BLACKOUT / MARKUS GETS SPOTTED | `M08` options 0 ("distraction or a blackout", risk 0.25) and 1 ("gunpoint", risk 0.3) | **Partly covered.** LURE and BLACKOUT are merged; that is defensible, since both lead to the same Q3. No source backs the risk numbers. MARKUS GETS SPOTTED (inaction) is not modelled. |
| Q2: KILL GUARDS / INCAPACITATE GUARDS / TRIGGER ALARM; MARKUS SPILLS BLOOD (copy 2) | `M08` option 1 success / failure | **Partly covered.** KILL GUARDS (Derek dies, key still taken) is missing. The engine gives `north(1)` on gunpoint success, which **has no source**. Threatening has no icon in the transcript. |
| Q3: AVOID / FAIL TO AVOID GUARDS | `M08` option 0 success / failure | Covered as a risk roll. |
| STEAL KEY > LEAVE WITH TRUCK > MARKUS STOLE A TRUCK FULL OF PARTS | `M08` success: `jer(1)` (+`north(1)` at gunpoint) | **Effects wrong.** The game gives North +1, Simon +1, Josh −1 for GET THE KEY, then the truck ending: Jericho +2, North +2, Simon +2, Josh +1. The engine gives Jericho +1 only, plus an unsourced North +1 on the gunpoint route. |
| ALARM SOUNDS > RUN TO FENCE > DOGS MAUL JOHN > LEAVE JOHN BEHIND / SUSTAIN DAMAGE TRYING TO SAVE JOHN | `M08` failure: `s.john=false; jer(-1)`, event "John is brought down by the dogs and killed; the truck is lost." | **Partly covered.** John's death is right. Missing: the SAVE / ABANDON decision; the "Be seen by the guards" icons (Jericho −2, North −2, Simon −1, Josh −1); and the ending icons. ABANDON gives full bags (+1 ×4). SAVE gives failed (Jericho −2, North −2, Simon −1, Josh −1). |
| SUSTAIN DAMAGE REACHING THE FENCE (both copies) | none | **Missing.** This is a fence-run check after any alarm, with the failed ending. Markus is damaged, not killed. |
| BACK TO JERICHO | none | Implicit. |
| The three endings as a recorded outcome | none | **Missing.** The engine stores `raidAbandoned` and `john` only. No state records MARKUS STOLE A TRUCK FULL OF PARTS / FULL BAGS / FAILED, or that Markus spilled blood. Nothing downstream needs the ending, but the report's "Where this path ended" card would. |
| Gates | `M06`, `M07`: `c('M05')!=='2' && !s.raidAbandoned`; `M08`: `s.john` | `M08`'s gate is correct (the key needs ACCEPT). `M06`/`M07` should also close after HIDE (missing option). The `raidAbandoned` failure state that closes them has no source. |
| Downstream `s.john` | `M19` | Consistent with Freedom March: John always sacrifices himself if he joined. Under the game's rules `s.john` should be false after DOGS MAUL JOHN (both options) and true after the truck or REFUSE of the key. The engine sets it false on any `M08` failure. That is right except for the wiki's glitch case (upper SUSTAIN DAMAGE REACHING THE FENCE leaves John alive). |

---

## 8. Open questions

1. **Jericho icon on the drone, the crate and ACCEPT.** The transcript shows no Jericho icon on MARKUS UNHARMED / DAMAGED, FREE ANDROIDS or ACCEPT. The wiki lists Jericho up/down for the drone, up for freeing, and up for "Taking other androids with them". PowerPyx and a commenter also include Jericho for the drone and for freeing. The transcript does use Jericho elsewhere in this chapter, so its silence may be deliberate. Check in game which meters move.
2. **"Taking other androids with them."** Does the wiki's line (Jericho up, North down, Simon down, Josh up) apply only to ACCEPT after FREE ANDROIDS ("They come with us."), or to every ACCEPT? The transcript gives North/Simon down and Josh up on ACCEPT regardless.
3. **The edges out of the two RUN TO FENCE nodes.** From the crops: upper RUN TO FENCE goes to DOGS MAUL JOHN and SUSTAIN DAMAGE REACHING THE FENCE; lower RUN TO FENCE goes to SUSTAIN DAMAGE REACHING THE FENCE and BACK TO JERICHO. The lines cross at the SUSTAIN DAMAGE junction, so this is not certain. The wiki nests BACK TO JERICHO under the control-room alarm too. Confirm that after a control-room alarm the only outcomes are the dogs or Markus's damage.
4. **Can SAVE ever save John?** PowerPyx says to "mess up the button sequence" to get SUSTAIN DAMAGE TRYING TO SAVE JOHN, which implies a sequence that can be passed. A commenter found none. The chart has no node for a saved John, and the wiki says he "dies regardless". Confirm.
5. **Which control-room failures carry the "Be seen by the guards" icons?** MARKUS GETS SPOTTED and FAIL TO AVOID GUARDS surely do. Does TRIGGER ALARM after threatening? The transcript's "Threaten guards with the gun" block is empty. The wiki's "If Markus fails to get the key… North decreases twice, though this does not apply if he took it prior to being detected" suggests being seen after STEAL KEY is possible. Can the alarm sound after the key is taken (the commenter who got both AVOID and FAIL TO AVOID)? If so, where does it lead?
6. **ALMOST SPOTTED.** Is it optional? PowerPyx: "Markus must move left to the two guards to complete this task." The chart shows stub lines into ALMOST SPOTTED and PROGRESS TOWARD CYBERLIFE whose origin isn't visible. Is there a direct FOLLOW NORTH > CLIMB ON CONTAINERS path?
7. **HIDE and the failed ending.** HIDE carries no icons of its own. Does it give the "Ran away when the guard arrived" ending block (Jericho large down etc.) like RUN AWAY? PowerPyx says it "ends in the team running away".
8. **`[do nothing]` at the first encounter.** The game strings have `CHOICEGROUP01.NOCHOICE`. Does a timeout behave like HIDE?
9. **Difficulty.** RUN AWAY is Experienced-only (PowerPyx commenter). Are any fence failures Casual-impossible? No source says.
10. **ANDROID SPARE PARTS REPORTED STOLEN.** Is this Connor clue in Crossroads conditional on this chapter's ending (truck vs bags vs failed)?
11. **KILL GUARDS as a "failure".** The chart marks KILL GUARDS ✗, yet it leads to STEAL KEY and the truck ending. For the benchmark: should killing be a chosen action, or the failure side of the gunpoint risk roll as the game has it?

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter walkthrough link)
- https://www.powerpyx.com/detroit-become-human-spare-parts-walkthrough-100/ (walkthrough text: inputs per node, Hide correction, kill-guards method, ending descriptions, relationship arrows; reader comments on Run Away being Experienced-only, the dog sequence, the North drop on Accept and the key-acceptance deltas)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-1.jpg (full "100% COMPLETED" chart; structure, edges, 3 endings, header meters)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-2.jpg (legible: HUNTING FOR PARTS to PROGRESS TOWARD CYBERLIFE; "96% COMPLETED")
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-3.jpg (legible: FOLLOW NORTH/SIMON, DRONE BLOCKS PATH, NEUTRALIZE DRONE, UNHARMED ✓ / DAMAGED ✗, REACH CYBERLIFE)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-4.jpg (legible: GATHER SPARE PARTS through MARKUS SPILLS BLOOD / HUMAN GUARD LEAVES; edges of both guard choice groups)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-5.jpg (legible: RESUME SEARCH, crate pair, both ACCEPT/REFUSE pairs; the crate-bypass edge)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-6.jpg (legible: CONTROL ROOM through the fence nodes; both ALARM SOUNDS and RUN TO FENCE copies)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-spare-parts-7.jpg (legible: the three ending tiles and their incoming edges)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-wallpaper.jpg (site art, not a chart)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json (infobox, Flowchart list, Guard Station, Relationship Changes, Notes, Unused Content; saved as /tmp/flowcharts/ch19/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts/Flowchart&prop=wikitext&format=json and `Spare_Parts_(Transcript)` (both `missingtitle`)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (every Spare Parts relationship line for Jericho, North, Josh, Simon)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=John&prop=wikitext&format=json (John's conversion, alarm behaviour, death "regardless", survival conditions, fence glitch, Freedom March, Crossroads)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Mike&prop=wikitext&format=json (human guard; killed by Markus)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Derek_Myers&prop=wikitext&format=json (control-room fight; can be killed)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Al_Dante&prop=wikitext&format=json (never killed; flowchart "incorrect")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=CyberLife_Warehouse_and_Docks&prop=wikitext&format=json (location summary; three AP700s)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json ("John joined in 'Spare Parts'" impact node and sacrifice rules)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json (chapter summary, "Markus cannot be killed before Freedom March", Killed Victims, Freedom March death rule)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json, `Simon`, `Josh` (character reactions in the chapter; Simon's sacrifice condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Time_to_Decide&prop=wikitext&format=json (setup: Check Empty Crate gives the location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json (its "CyberLife warehouse" lines refer to the store, not this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json, `Software_Instability`, `Magazine` (no Spare Parts entries)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Drones&prop=wikitext&format=json (security drone behaviour)
- https://detroitbecometext.github.io/chapters/19 (fan transcript, linked from the wiki page)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html (chapter template: condition blocks, relationship icons per option and per ending, unlock conditions; saved as /tmp/flowcharts/ch19/dbt19.html)
- https://detroitbecometext.github.io/i18n/en.json and https://detroitbecometext.github.io/chunk-JCLJBPDO.js (game strings: dialogue, in-game choice prompts `X0602M.*.CHOICEGROUP*`, flowchart labels `MENU.FLOWCHART.06MB.*` including unused ones, objectives `THOUGHTS.0601M.*`, Freedom March's `JOHN JOINED IN 'SPARE PARTS'`, Connor's `ANDROID SPARE PARTS REPORTED STOLEN`)

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/19-spare-parts-chapter-content/spare-parts-chapter-content.component.html`, read raw from GitHub (`master`) on 2026-11-06 and resolved against `en.json` by `/tmp/dbt-scripts/render1724.py`. The rendered outline is also saved as `/tmp/dbt/ch19.txt`.

Outline legend: `#` headings are the template's own section titles (written by the transcribers, not game text). `PROMPT n` is an `app-choice-group`; `OPTION "LABEL"` is an `app-choice-item` with its game label (`bracketed` = shown in brackets on the site, used for options that need an unlock; `timeout` = the time-out branch). `ARROW Name Type` is an `app-relation` (gauge name from `GUI.GAUGE.*`). `OBSERVATION [label]` / `CLUE title / subline / subline` are `app-observation` / `app-observation-item`. `IF:` is the condition text of an `app-conditioned-content` (transcriber wording). `[UNLOCK TYPE]` is an `app-unlock-condition` (LOCK = needs an earlier action, DEATH, TIME = timer runs out, TV). `UNUSED/CUT:` is an `app-unused-content` block. Dialogue is shown only inside options and cut blocks, at most two lines each, cut at 110 characters.

**Counts.** Live prompts: 6 (15 options). Observations: 0 groups, 0 clues. Live arrows: 46. Unlock conditions: 2. Cut blocks: 0 (containing 0 prompts, 0 options, 0 arrows).

### 10.1 Rendered outline

```text
# At the CyberLife warehouses
## [UNLOCK TIME] Take too much time
CONDITION GROUP:
  IF: Follow Simon
## Attack the drone
CONDITION GROUP:
  IF: Fail Attacking Drone
    ARROW North SmallDown (NORTH)
    ARROW Simon SmallDown (SIMON)
    ARROW Josh SmallDown (JOSH)
  IF: Succeed Attacking Drone
    ARROW North SmallUp (NORTH)
    ARROW Simon SmallUp (SIMON)
    ARROW Josh SmallUp (JOSH)
## Guard arrives
PROMPT 1:
  OPTION "Kill Guard"
    ARROW Josh LargeDown (JOSH)
    Guard: What are you doing? I told you to-
  OPTION "Run away"
    ARROW North SmallDown (NORTH)
    ARROW North SmallDown (NORTH)
    ARROW Jericho SmallDown (JERICHO)
    ARROW Josh SmallDown (JOSH)
    ARROW Simon SmallDown (SIMON)
    Markus: Let's get outta here!
    Guard: What are you waiting for? Hit the fucking alarm!
  OPTION "HIDE"
    Guard: What the hell you doing? I told you to wait for me!
    John: There are four androids hiding behind these crates.
  OPTION "Grab and Hide"
    Guard: John?
    Markus: I need your help…
    PROMPT 2:
      OPTION "Hold"
        Guard: First the drone, now this… Just my luck…
      OPTION "Release"
        Guard: There you are. What the hell are you doing?
        John: I was inspecting the platform. Everything is in order.
      OPTION "ATTACK"
        ARROW Josh LargeDown (JOSH)
## Check the bigger crate
PROMPT 3:
  OPTION "FREE THEM"
    ARROW North SmallUp (NORTH)
    ARROW Simon SmallUp (SIMON)
    ARROW Josh SmallUp (JOSH)
  OPTION "CLOSE AGAIN"
CONDITION GROUP:
  IF: Awoke androids
  IF: Didn't awake androids
PROMPT 4:
  OPTION "ACCEPT"
    ARROW North SmallDown (NORTH)
    ARROW Simon SmallDown (SIMON)
    ARROW Josh SmallUp (JOSH)
    CONDITION GROUP:
      IF: Awoke androids
        Markus: They come with us.
      IF: Didn't awake androids
        Markus: He comes with us.
  OPTION "REFUSE"
    Markus: I'm sorry. You can’t come with us.
    John: I helped you… It’s not fair. I helped you and now you’re just gonna leave without me? You’re no better than...
## Let John join the group - Steal the key
PROMPT 5:
  OPTION "GET THE KEY"
    ARROW North SmallUp (NORTH)
    ARROW Simon SmallUp (SIMON)
    ARROW Josh SmallDown (JOSH)
    Markus: Wait here. If I'm not back in ten minutes, go without me.
    Josh: Markus…
    CONDITION GROUP:
      IF: Create short-circuit
        Guard 1: Shit, what’s going on?
        Guard 2: Lights are still on outside. Must be the fuse box…
      IF: Attract the guards by knocking a barrel
        Guard 1: Fuck, what was that?
        Guard 2: The drums fell down…
      IF: Threaten guards with the gun
      IF: Be seen by the guards
        ARROW North SmallDown (NORTH)
        ARROW North SmallDown (NORTH)
        ARROW Jericho SmallDown (JERICHO)
        ARROW Jericho SmallDown (JERICHO)
        ARROW Josh SmallDown (JOSH)
        ARROW Simon SmallDown (SIMON)
        Guard 1: Don't move, asshole!
        Guard 2: Holy shit! Hit the alarm, hurry!
        PROMPT 6:
          OPTION "SAVE"
            North: MARKUS!
          OPTION "ABANDON"
    CONDITION GROUP:
      IF: Stole the key - go back to the truck
        North: Did you get it? Nice.
  OPTION "LEAVE"
    ARROW North SmallDown (NORTH)
    ARROW Josh SmallUp (JOSH)
    Markus: It’s not worth the risk. We have what we need.
    John: We can go over the fence. It’s the quickest way out.
## Was detected by the guards - Running away
### [UNLOCK TIME] Take too much time
### Fail to escape
# In Jericho
CONDITION GROUP:
  IF: Successfully escaped and stole the truck
    ARROW Jericho LargeUp (JERICHO)
    ARROW Simon LargeUp (SIMON)
    ARROW North LargeUp (NORTH)
    ARROW Josh SmallUp (JOSH)
  IF: Successfully escaped, without stealing the truck
    ARROW Jericho SmallUp (JERICHO)
    ARROW Simon SmallUp (SIMON)
    ARROW North SmallUp (NORTH)
    ARROW Josh SmallUp (JOSH)
  IF: Ran away when the guard arrived
    ARROW Jericho LargeDown (JERICHO)
    ARROW Simon SmallDown (SIMON)
    ARROW North SmallDown (NORTH)
    ARROW Josh SmallDown (JOSH)
  IF: Markus failed to escape and had to be rescued
    ARROW Jericho LargeDown (JERICHO)
    ARROW Simon SmallDown (SIMON)
    ARROW North LargeDown (NORTH)
    ARROW Josh SmallDown (JOSH)
    CONDITION GROUP:
      IF: Markus went back to save John
CONDITION GROUP:
  IF: Successfully escaped or Markus was rescued
  IF: Ran away when the guard arrived
```

### 10.2 Flowchart node labels as the game prints them (`MENU.FLOWCHART.06MB.*`)

The table also holds labels for cut or patched-out nodes; presence here does not prove a node is reachable.

```text
START = HUNTING FOR PARTS
EMERGE = CLIMB ONTO DOCK
FOLLOW = FOLLOW NORTH
ALMOST = ALMOST SPOTTED
CLIMB = CLIMB ON CONTAINERS
CONTAINER = PROGRESS TOWARD CYBERLIFE
NORTH = FOLLOW NORTH
SIMON = FOLLOW SIMON
DRONE = DRONE BLOCKS PATH
RID = NEUTRALIZE DRONE
FINE = MARKUS UNHARMED
HURT = MARKUS DAMAGED
CYBERLIFE = REACH CYBERLIFE
GATHER = GATHER SPARE PARTS
GUARD = SECURITY ANDROID APPEARS
ATTACK = ATTACK
GRAB = GRAB ANDROID AND HIDE
RUNAWAY = RUN AWAY
HIDE = HIDE
JOHN = JOHN BECOMES DEVIANT
LOOKS = GUARD SEARCHES FOR SECURITY ANDROID
ATTACK2 = ATTACK
RELEASE = RELEASE
NOTHING = HOLD POSITION
BLOOD = MARKUS SPILLS BLOOD
LEAVES = HUMAN GUARD LEAVES
DEALT = RESUME SEARCH
LOOT = OPEN BIGGER CRATES
FOUND = FIND CRATE OF ANDROIDS
DIDNT = OVERLOOK CRATE OF ANDROIDS
FREE = FREE ANDROIDS
LEAVE = LEAVE ANDROIDS
JOIN = JOHN WANTS TO JOIN
ACCEPT = ACCEPT
REFUSE = REFUSE
DIDNT2 = JOHN DIDN'T JOIN MARKUS
TALKS = JOHN MENTIONS KEY
ACCEPT2 = ACCEPT
REFUSE2 = REFUSE
CONTROL = CONTROL ROOM
ENTER = ENTER ROOM
KEY = FIND KEY
THREATEN = THREATEN GUARDS
LURE = LURE GUARDS
BLACKOUT = CREATE BLACKOUT
DEAD = KILL GUARDS
UNCONSCIOUS = INCAPACITATE GUARDS
ALARM = TRIGGER ALARM
SEEN = AVOID GUARDS
DISCOVERED = FAIL TO AVOID GUARDS
BLOOD2 = MARKUS SPILLS BLOOD
STOLEN = STEAL KEY
ON = ALARM SOUNDS
TRUCK = LEAVE WITH TRUCK
RUN1 = RUN TO FENCE
RUN2 = RUN TO FENCE
RUN3 = RUN TO FENCE
KILLED = JOHN GETS KILLED
SAFE = LEAVE JOHN BEHIND
DOGS = SUSTAIN DAMAGE TRYING TO SAVE JOHN
BACK = BACK TO JERICHO
BACK2 = BACK TO JERICHO
FULL = GROUP RETURNED WITH FULL BAGS
HALF = GROUP FAILED THEIR MISSION
TRUCKL = MARKUS STOLE A TRUCK FULL OF PARTS
SPOTTED = MARKUS GETS SPOTTED
JOHNATTACK = DOGS MAUL JOHN
DOGSMARKUS = SUSTAIN DAMAGE REACHING THE FENCE
```

### 10.3 Disagreements with sections 1 to 3

Rule (README item 10): the template and string table win for labels, prompts, arrows and clue text; the flowchart image wins for node order; the wiki wins where the template is silent. Template condition wording is transcript tier.

§3 was built from this template (column T) and every arrow in 10.1 is already in §3's table with the right character, size and count. The differences:

1. **Wiki-only Jericho arrows.** §3 lists Jericho small up on MARKUS UNHARMED, small down on MARKUS DAMAGED, small up on FREE ANDROIDS and small up on ACCEPT John as "(W only)" and adds them to one path total. The template has no Jericho arrow at any of these four points (it does tag Jericho elsewhere, so this is not an omission of the gauge). The template wins for arrows: **do not build these four Jericho arrows**. The corrected stealth-truck total is Jericho +2, as §3's first line already says.
2. **Labels of the first two prompts.** The template labels PROMPT 1 and PROMPT 2 with the generic action strings `GUI.ACTION.KILLGUARD` "Kill Guard", `GUI.ACTION.RUNAWAY` "Run away", `GUI.ACTION.GRABANDHIDE` "Grab and Hide", `GUI.ACTION.HOLD` "Hold", `GUI.ACTION.RELEASE` "Release", `GUI.ACTION.ATTACK` "ATTACK"; only HIDE uses the scene key (`X0602M.WAREHOUSE.SURPRISE.PC.CHOICEGROUP01.HIDDEN`). §2 D2 and D3 give the scene keys: KILL HUMAN GUARD / SEIZE ANDROID / FLEE / HIDE and KILL HUMAN GUARD / RELEASE ANDROID / DON'T MOVE (plus `[do nothing]`). Both are game strings. The README rule makes the template's labels the default, but the scene-specific `CHOICEGROUP01/02` keys are the ones bound to this prompt, and the `GUI.ACTION` set is the generic button vocabulary. Open for the operator: which wording appears on screen. Until checked, use the template's.
3. **Option order in PROMPT 1.** The template lists Kill Guard, Run away, HIDE, Grab and Hide; the chart (§1) prints ATTACK, GRAB ANDROID AND HIDE, RUN AWAY, HIDE. Order is the flowchart's to decide: keep §1's order.

Agreements (no action): drone success / failure arrows (North, Simon, Josh small up / small down, no Jericho); Kill Guard and the post-grab ATTACK each Josh large down; Run away North small down ×2, Jericho, Josh, Simon small down; HIDE, Grab and Hide, Hold, Release no arrow; FREE THEM North, Simon, Josh small up, CLOSE AGAIN none; ACCEPT North and Simon small down, Josh small up, REFUSE none; GET THE KEY North and Simon small up, Josh small down; LEAVE North small down, Josh small up; "Be seen by the guards" Jericho ×2, North ×2, Josh, Simon small down; SAVE / ABANDON none; the four ending blocks in Jericho as in §3. The template has no observation items and no cut content in this chapter. The crane fork (D1) appears only as the condition "Follow Simon", not as a prompt; the control-room methods appear only as conditions ("Create short-circuit", "Attract the guards by knocking a barrel", "Threaten guards with the gun", "Be seen by the guards"), matching §2 D7.

### 10.4 Disagreements with the benchmark (story.json 1.6.0: M05, M06, M07, M08)

Engine sizes are read as ±1 = small arrow, ±2 = large arrow.

1. **Drone arrows missing.** No scene covers the drone. Template: success North, Simon, Josh +1 each; failure −1 each. None applied.
2. **PROMPT 1 is missing HIDE.** M05 offers grab-and-hold, attack, run. HIDE (John reports them, alarm, run to fence) is absent.
3. **PROMPT 1 labels paraphrased.** M05's texts are paraphrases; use the game labels (see 10.3 item 2).
4. **PROMPT 2 collapsed.** M05 option 0 merges Grab and Hide with Hold. Release and the post-grab ATTACK (Josh large down) are not offered.
5. **Run away arrows wrong.** Template: North −1 ×2, Jericho −1, Josh −1, Simon −1. Engine M05 option 2: `jer(-2)`, `north(-2)`, `simon(-1)`. Jericho is large instead of small, and Josh's small down is missing.
6. **Risk failures with arrows the template lacks.** M05 option 0 (risk 0.15) and option 1 (risk 0.1) can fail with `raidAbandoned` and `jer(-1)`. The template gives Grab and Hide / Hold no failure branch and no arrow, and Kill Guard only Josh large down. Neither failure exists in the template (§2: "None of these can fail").
7. **FREE THEM has an extra Jericho arrow.** M06 option 0 applies `jer(1)` with North, Simon, Josh +1. The template has no Jericho arrow (10.3 item 1). Labels: use FREE THEM / CLOSE AGAIN.
8. **ACCEPT John is missing North's arrow.** M07 option 0 applies `josh(1)`, `simon(-1)`; the template adds North small down. Labels: use ACCEPT / REFUSE.
9. **GET THE KEY arrows missing.** Template: North +1, Simon +1, Josh −1 on choosing to get the key. M08 options 0 and 1 apply none of these at the choice. LEAVE (M08 option 2: `north(-1)`, `josh(1)`) matches.
10. **Control-room arrows not in the template.** M08 success applies `jer(1)` and, for the gunpoint option, `north(1)`; the template has no arrow on any control-room method ("Threaten guards with the gun" has none) and puts the truck's reward in the Jericho ending block instead.
11. **"Be seen by the guards" arrows wrong.** Template: Jericho −1 ×2, North −1 ×2, Josh −1, Simon −1. M08 failure applies only `jer(-1)`.
12. **PROMPT 6 missing.** SAVE / ABANDON (dogs maul John) has no scene; M08's failure kills John automatically. SAVE leads to GROUP FAILED THEIR MISSION in the template, ABANDON to full bags.
13. **Ending arrows missing.** The Jericho blocks are not applied: truck (Jericho +2, Simon +2, North +2, Josh +1), full bags (all four +1), ran away (Jericho −2, Simon, North, Josh −1), failed and rescued (Jericho −2, North −2, Simon −1, Josh −1). The engine has no ending scene for this chapter; the only partial equivalents are item 5 and M08's `jer(±1)`.
14. **Time unlocks not modelled.** The two "Take too much time" fence outcomes (fail to escape, Markus rescued) have no counterpart.

M07 option 1 (REFUSE, no arrow, alarm) matches the template.
