# Chapter 7: Stormy Night (Kara)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch07/wiki.txt`. The flowchart images are in `/tmp/flowcharts/ch07/` and were not committed.

Wiki infobox: `|date=November 5, 2038`, `|time=09:14PM`, `|player=[[Kara]]`, `|location=North Corktown ... Todd's house`, `|endings=9`. Objectives listed in the infobox: "Serve dinner", "Don't move", "Do something now!" (sub-objectives "Protect Alice" and "Reason with Todd"), and "Run!". The text says: "This chapter has nine different outcomes."

---

## 1. Flowchart transcription

### How the chart was read

- The full chart is `detroit-stormy-night-100.jpg`, PowerPyx's "100% COMPLETED" screenshot. At full size most small labels can't be read, so labels come from the four zoomed screenshots: `first-choice-branch`, `lower-branch-a`, `lower-branch-b` and `upper-branch1`. The overview was used for edges and positions.
- `upper-branch1.jpg` has an earlier timestamp (EXIF 2018:05:25 18:01:48; the others are 21:58:36). It shows several red-padlock `[...]` placeholder nodes, which means PowerPyx hadn't finished the chapter when they took it. It was used for labels only. The 100% overview is the authority for completeness.
- The chart header reads `PUBLIC OPINION INDIFFERENT` and `ALICE TRUSTED`. This is PowerPyx's save state, not something the chapter sets.
- The blue highlighted path on the 100% overview is PowerPyx's last playthrough: BREAK PROGRAMMING > KARA BECOMES DEVIANT > GO UPSTAIRS > GET TO ALICE BEFORE TODD > RUN AWAY > HIDE IN CORRIDOR > TODD REALIZES KARA AND ALICE ARE GONE > TRY FRONT DOOR > OPEN FRONT DOOR > RUN TO THE BUS > MISS BUS > TODD BROKE KARA OUTSIDE (the right-hand copy).

Icon key, checked against the wiki's `Template:Icon`:
- Blue/black arrow (⇨): an action the player takes.
- Triangle (△): an event or consequence the game plays.
- Double square: a group of alternatives, either a choice set or a QTE pass/fail pair.
- ✓: success. ✗: failure.
- Yellow circle with a slash: `cc_notrequired.png`, "Not required for completion" (wiki `nri`). This is the "no-entry" icon in the README's terms. On this chart it marks every ending where Kara dies.
- Small black circle with a slash: `notrequired.png` (wiki `nr`), on intermediate nodes.
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".
- No skull (death) icon and no trophy icon appear anywhere on this chart.

Each box is numbered N1–N73 in reading order (left to right, top to bottom within each branch). Labels are quoted exactly as printed. "(legible)" means the label could be read in a zoomed screenshot. "(inferred)" means it was readable only from its shape on the overview, and the text comes from the wiki or PowerPyx.

### A. Opening (checkpoints)

| # | Label | Icon | Notes |
|---|---|---|---|
| N1 | DINNER'S READY | checkpoint (large tile with image) | legible |
| N2 | WAIT ON TODD & ALICE | arrow | legible; PowerPyx: "Unmissable" |
| N3 | TODD GETS MAD | checkpoint (large tile with image) | legible |

### B. First choice: the deviancy wall

| # | Label | Icon | Edge |
|---|---|---|---|
| N4 | BREAK PROGRAMMING | arrow | from N3 |
| N5 | KARA FAILS TO BECOME DEVIANT | triangle | from N3 > N7 |
| N6 | KARA IS TOO SLOW | triangle | enters from a connector marker at the far left (no line drawn from N8; the wiki nests it under "Kara becomes deviant") > N7 |
| N7 | **TODD KILLS ALICE** | yellow no-entry (not required) | ENDING |
| N8 | KARA BECOMES DEVIANT | triangle | from N4 |

### C. Downstairs after deviating

| # | Label | Icon | Edge |
|---|---|---|---|
| N9 | KARA IS IN TODD'S WAY DOWNSTAIRS | triangle | from N8 > N11 |
| N10 | REASON WITH TODD | arrow | from N8 > N11 |
| N11 | TODD SHOVES KARA DOWNSTAIRS | triangle | > N12 |
| N12 | TODD GOES UPSTAIRS | triangle | (inferred: illegible on the overview; label from the wiki "Todd goes upstairs" and PowerPyx "Todd goes upstairs: Unmissable") > N19 |
| N13 | GO UPSTAIRS | arrow | from N8 |

### D. Upstairs: the gun and the corridor

| # | Label | Icon | Edge |
|---|---|---|---|
| N14 | KARA IS IN TODD'S WAY UPSTAIRS | triangle | from N13 > N15 |
| N15 | TODD SHOVES KARA UPSTAIRS | triangle | > N17 (optional) and > N19 |
| N16 | GUN SEEN IN 'A NEW HOME' | yellow padlock (cross-chapter impact) | (inferred: same shape as N32; the wiki says "gun seen in 'A New Home'" and PowerPyx says 'Gun seen in "A New Home"') > N17 |
| N17 | TAKE GUN | arrow | inputs: N13, N15, N16, N24 > N19 |
| N18 | GET TO ALICE BEFORE TODD | large tile with image (focus point) | from N13 |
| N19 | GET TO ALICE AFTER TODD | large tile with image (focus point) | inputs: N12, N15, N17, N24 |

### E. "Get to Alice before Todd" branch (lower half of the chart)

| # | Label | Icon | Edge |
|---|---|---|---|
| N20 | REASON WITH TODD | arrow | from N18 > N15 |
| N21 | RUN AWAY | arrow | from N18 > group N22/N23 |
| N22 | FAIL TO HIDE | ✗ | > N24 |
| N23 | HIDE IN CORRIDOR | ✓ | > N25 |
| N24 | TODD TAKES ALICE TO HER ROOM | triangle | > N17 (optional) and > N19 |
| N25 | TODD REALIZES KARA AND ALICE ARE GONE | triangle | > group N39/N40 |
| N26 | TODD IS COMING | triangle | from N18 > N27 |
| N27 | OUT OF TIME | triangle | > N28 |
| N28 | TODD BREAKS INTO BEDROOM | triangle | inputs: N27, N30, N31 > N48 |
| N29 | LOCK DOOR | arrow | from N18 > N30, N31, N33 (three separate action nodes, not a grouped choice) |
| N30 | GRAB LAMP | arrow | > N28 |
| N31 | TALK TO ALICE | arrow | > N28 |
| N32 | WAY OUT SEEN IN 'A NEW HOME' | yellow padlock (cross-chapter impact) | legible > N33 |
| N33 | OPEN WINDOW | arrow | inputs: N29, N32 > group N34/N35 |
| N34 | FACE TODD | group member | > N48 |
| N35 | GO OUT | group member | > group N36/N37 |
| N36 | FAIL TO ESCAPE BY WINDOW | ✗ | > N38 (on Casual, > N48 instead; see §2) |
| N37 | ESCAPE BY WINDOW | ✓ | > N43 |
| N38 | **TODD BROKE KARA OUTSIDE** (copy 1, by the window) | yellow no-entry (not required) | ENDING |
| N39 | RUN TO BACKYARD | group member | > N67 |
| N40 | TRY FRONT DOOR | group member | > group N41/N42 |
| N41 | FAIL TO OPEN DOOR | ✗ | > N67 |
| N42 | OPEN FRONT DOOR | ✓ | > N43 |
| N43 | RUN TO THE BUS | arrow | inputs: N37, N42 > group N44/N45 |
| N44 | MISS BUS | small no-entry (not required) | > N73 |
| N45 | CATCH BUS | ✓ | > N46 |
| N46 | **KARA & ALICE EVADED TODD** | yellow padlock (cross-chapter impact) | ENDING |

Order within the lower groups as printed: FAIL TO HIDE above HIDE IN CORRIDOR; FACE TODD above GO OUT; FAIL TO ESCAPE BY WINDOW above ESCAPE BY WINDOW; RUN TO BACKYARD above TRY FRONT DOOR; FAIL TO OPEN DOOR above OPEN FRONT DOOR; MISS BUS above CATCH BUS.

### F. "Get to Alice after Todd" branch (upper half of the chart)

| # | Label | Icon | Edge |
|---|---|---|---|
| N47 | THREATEN WITH GUN | arrow | from N19 (requires N17) > N48 |
| N48 | DEFEND ALICE | arrow | inputs: N19, N47, N28, N34, N36 (Casual) > group N49–N51 |
| N49 | KARA KILLS TODD | group member | > N52 |
| N50 | ALICE KILLS TODD | group member | > N52 |
| N51 | STUN TODD | group member | > N56 |
| N52 | OPEN FRONT DOOR | arrow | > N53 |
| N53 | RUN TO THE BUS | arrow | > N54 or N55 (whichever matches N49/N50) |
| N54 | **KARA SHOT TODD** | yellow padlock (cross-chapter impact) | ENDING |
| N55 | **ALICE SHOT TODD** | yellow padlock (cross-chapter impact) | ENDING |
| N56 | LEAVE THE ROOM | arrow | > N57 |
| N57 | TODD CHASES KARA | triangle | > N58, or > group N60/N61 |
| N58 | TODD CATCHES THEM | triangle | > N59 |
| N59 | **TODD BROKE KARA IN THE CORRIDOR** | yellow no-entry (not required) | ENDING |
| N60 | TRY FRONT DOOR | group member | > group N62/N63 |
| N61 | RUN TO BACKYARD | group member | > N67 |
| N62 | OPEN FRONT DOOR | ✓ | > group N64/N65 |
| N63 | FAIL TO OPEN DOOR | ✗ | > N67 |
| N64 | CATCH BUS | ✓ | > N66 |
| N65 | MISS BUS | small no-entry (not required) | > N73 |
| N66 | **KARA & ALICE FOUGHT THEIR WAY OUT** | yellow padlock (cross-chapter impact) | ENDING |
| N67 | FIGHT DOWNSTAIRS | arrow | inputs: N39, N41, N61, N63 > group N68/N69 |
| N68 | ESCAPE FROM TODD | ✓ | > group N71/N72 |
| N69 | TODD WINS FIGHT | small no-entry (not required) | > N70 |
| N70 | **TODD BROKE KARA DOWNSTAIRS** | yellow no-entry (not required) | ENDING |
| N71 | ESCAPE VIA YARD | ✓ | > group N64/N65 (the same CATCH BUS / MISS BUS pair) |
| N72 | FAIL TO ESCAPE | small no-entry (not required) | > N73 |
| N73 | **TODD BROKE KARA OUTSIDE** (copy 2, far right) | yellow no-entry (not required) | ENDING |

Order within the upper groups as printed: KARA KILLS TODD, ALICE KILLS TODD, STUN TODD; TRY FRONT DOOR above RUN TO BACKYARD; OPEN FRONT DOOR above FAIL TO OPEN DOOR; CATCH BUS above MISS BUS; ESCAPE FROM TODD above TODD WINS FIGHT; ESCAPE VIA YARD above FAIL TO ESCAPE.

**Totals:** 73 boxes and 63 distinct labels. Repeated labels: REASON WITH TODD ×2, TODD BROKE KARA OUTSIDE ×2, TRY FRONT DOOR ×2, RUN TO BACKYARD ×2, OPEN FRONT DOOR ×3 (lower QTE, upper QTE, and the arrow after the shooting), FAIL TO OPEN DOOR ×2, RUN TO THE BUS ×2, CATCH BUS ×2, MISS BUS ×2. There are 9 ending boxes with 8 distinct ending labels, which matches the infobox's `endings=9`.

### Interactions not on the chart (wiki Notes and PowerPyx)

None of these is a chart node. They are listed so the operator can decide whether any of them becomes a scene.
- Before the rage: "You can turn on the lights before serving the food." "Kara can put a napkin on Alice's lap." "It is possible to not do any of the tasks before Todd rages at Alice." "If you move while Todd is ranting about androids, he'll get startled and tell Kara stop moving".
- Deviancy input. PowerPyx: "become deviant by holding L1 and mashing X". The wiki notes that blocking Todd in the living room, on the stairway or in the hallway each plays a different shove.
- Prompt labels as the wiki quotes them in Alice's room: "When given the choice to “LOCK ROOM”, “SPEAK TO TODD”, or “RUN WITH ALICE” if you do nothing, Todd will enter the room." The chart prints these as LOCK DOOR, REASON WITH TODD and RUN AWAY.
- ACCEPT / REFUSE. Wiki: "Kara can take the lamp, doing so will result in Todd telling Kara to move and Kara either choosing to “ACCEPT” or “REFUSE”. This also occurs in scenarios such as facing Todd, talking to Alice, not speaking to Alice, or failing to make a choice. Choosing “ACCEPT” in any scenario will have Kara move away and change her mind." "It is possible for Kara to stand up to Todd twice."
- Fight QTEs in Alice's room: dodge, get up, push. "Failing to push Todd will give Kara a second opportunity to push him and she can take as long as she wants to chose an option." "If you look at Todd after stunning him, he'll beg Alice for help."
- Fence/yard: "If Kara fails to run to the fence, she'll have to pickup Alice and she fails to pickup Alice she'll have to try again, if she fails both times she will die".
- Door: "If Kara opened the door Todd will yell “YOU HAVE TO OBEY ME! You’re mine…” and will actually show remorse."

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution checks (QTEs). Node numbers refer to §1.

**D1. The order "Don't move" (after N3).**
- BREAK PROGRAMMING (N4) > KARA BECOMES DEVIANT (N8). PowerPyx: "hold L1 and mash X to be able to move".
- Do nothing > KARA FAILS TO BECOME DEVIANT (N5) > TODD KILLS ALICE (N7). PowerPyx: "Simply stand still and do nothing. Todd will go upstairs and kills Alice and Kara after this." Kara page: "she will stand obediently in place as Todd kills Alice, with Todd blaming Kara despite clearly doing so and destroying her, ending their storyline."
- No requirement for either option.

**D2. After deviating, before Todd reaches the stairs (from N8).**
- GO UPSTAIRS (N13).
- REASON WITH TODD (N10) > TODD SHOVES KARA DOWNSTAIRS > TODD GOES UPSTAIRS > GET TO ALICE AFTER TODD. PowerPyx: "He will always smack you to the ground and be upstairs before you can be there."
- Stand in his path > KARA IS IN TODD'S WAY DOWNSTAIRS (N9) > same shove chain.
- Do nothing / go to the kitchen > KARA IS TOO SLOW (N6) > TODD KILLS ALICE. PowerPyx: "don’t go upstairs, don’t talk to Todd and don’t stand in his path when he goes up. Walk to the kitchen instead and do nothing until the final cutscene starts."
- Timing gate. Wiki: "If you become deviant when Todd is heading upstairs, Kara will still get the objective to protect Alice, but instead views Todd heading upstairs and the option to reason with Todd is removed."

**D3. Upstairs (from N13).**
- Into Alice's room > GET TO ALICE BEFORE TODD (N18).
- Wait in the corridor > KARA IS IN TODD'S WAY UPSTAIRS (N14) > TODD SHOVES KARA UPSTAIRS. PowerPyx: "go up, but don’t enter Alice’s room. Stand in the middle of the corridor instead."
- TAKE GUN (N17) from Todd's room. **Requires "Kara sees gun" in A New Home.** Wiki: "If Kara didn’t previously find the gun, she will not have the option to enter Todd's room." Taking it before Todd is upstairs routes to GET TO ALICE AFTER TODD. Wiki: "If you take the gun before Todd is upstairs, a cutscene of Todd coming upstairs and going to Alice’s room will play out."
- TAKE GUN is also offered after TODD SHOVES KARA UPSTAIRS (N15) and after TODD TAKES ALICE TO HER ROOM (N24). In both cases it is optional; without it Kara goes straight to GET TO ALICE AFTER TODD.

**D4. In Alice's room before Todd (from N18).**
- REASON WITH TODD (N20) > TODD SHOVES KARA UPSTAIRS. PowerPyx: "press X to make Kara leave Alice’s room and face Todd in the corridor".
- RUN AWAY (N21). PowerPyx: "press Triangle to take Alice and walk out of her room". Leads to Q1.
- LOCK DOOR (N29). PowerPyx: "press O to lock the room with a time window of 10 seconds". Leads to D5.
- Do nothing > TODD IS COMING > OUT OF TIME > TODD BREAKS INTO BEDROOM > DEFEND ALICE. PowerPyx: "don’t press any button".

**Q1. Hiding (from N21).**
- HIDE IN CORRIDOR ✓ > TODD REALIZES KARA AND ALICE ARE GONE. PowerPyx: "hide in either room with holding Square or O. When he walks past, let go off the button and proceed to the stairs."
- FAIL TO HIDE ✗ > TODD TAKES ALICE TO HER ROOM > (optional TAKE GUN) > GET TO ALICE AFTER TODD. PowerPyx: "Go out of Alice’s room and don’t move any further, until Todd comes."
- This is partly a choice (hide or stand) and partly execution.

**D5. After LOCK DOOR.**
- GRAB LAMP > TODD BREAKS INTO BEDROOM.
- TALK TO ALICE > TODD BREAKS INTO BEDROOM.
- OPEN WINDOW. **Requires WAY OUT SEEN IN 'A NEW HOME'** ("Kara discovers a way down", from "Ventilate room" in A New Home). PowerPyx: "press L2 and R-up to open the window (if you found this route in Chapter 4)".
- Do nothing or don't talk to Alice > Todd enters. Wiki: "He will also do so if Kara simply doesn't talk to Alice."

**D6. At the open window (N33).**
- FACE TODD > DEFEND ALICE. PowerPyx: "listen to Alice’s remark and don’t climb out, but face Todd."
- GO OUT > Q2. PowerPyx: "press O to help Alice climb out and O again to JOIN ALICE".

**Q2. Window escape.**
- ESCAPE BY WINDOW ✓ > RUN TO THE BUS.
- FAIL TO ESCAPE BY WINDOW ✗ > TODD BROKE KARA OUTSIDE. Wiki: on Casual this leads to "Defend Alice" instead. Wiki: "If you fail to get Todd off you, he’ll pull you back inside and the rest of the scene will play out as if she chose to face Todd." Wiki: "If you are on Experienced mode, when escaping through window, Todd will try to grab you and exit the window, however if you play on Casual mode, Todd will just stay still."

**D7. Escape route downstairs (after N25 or N57).**
- TRY FRONT DOOR > Q3.
- RUN TO BACKYARD > FIGHT DOWNSTAIRS. This holds on both the hide path and the stun path.
- Wiki: "If you don’t make choice on whether to run to the garden or open the door, Todd will catch up and Alice will panic, thus extending the fight."

**Q3. Front door.**
- OPEN FRONT DOOR ✓ > the bus (via RUN TO THE BUS on the hide path; straight to CATCH/MISS on the stun path).
- FAIL TO OPEN DOOR ✗ > FIGHT DOWNSTAIRS.

**D8. Bus (N43 and the N64/N65 pair).**
- CATCH BUS ✓ > ending.
- MISS BUS > TODD BROKE KARA OUTSIDE. PowerPyx: "Miss Bus / Todd broke Kara outside: don’t run towards the bus." The wiki marks MISS BUS "(not possible on "casual difficulty")".
- Wiki: "Normally taking too long to get the bus will result in the bus leaving and Todd killing Kara, but if Todd is already dead, the bus will just wait there forever until Kara boards it."

**D9. Todd reached Alice first (from N19).**
- THREATEN WITH GUN (N47). **Requires TAKE GUN.** Leads to DEFEND ALICE.
- DEFEND ALICE (N48) unarmed.

**D10 / Q4. The fight in Alice's room (group N49–N51).**
- KARA KILLS TODD and ALICE KILLS TODD **require the gun**. PowerPyx: "When prompted to mash X to pick up the gun again, do so and Kara will shoot him" versus "don’t do it – Alice will pick it up and shoot him". This is an input, but the player chooses it.
- STUN TODD is the unarmed outcome. PowerPyx: "no matter how good or bad you are in the unarmed melee-combat against Todd, you will always have an option to push him in some way to stun him and escape Alice’s room."
- The chart has no node for losing in Alice's room. Compare the Kara page, which says "If Kara fights Todd without grabbing the gun and fails to win, Todd will break her apart and proceed to kill Alice". See §8.

**D11. After STUN TODD.**
- LEAVE THE ROOM > TODD CHASES KARA. Then either TODD CATCHES THEM (wiki: "not possible on "casual" difficulty"; PowerPyx: "don’t run towards the stairs and let him get you") > TODD BROKE KARA IN THE CORRIDOR, or D7.

**Q5. FIGHT DOWNSTAIRS.**
- ESCAPE FROM TODD ✓.
- TODD WINS FIGHT > TODD BROKE KARA DOWNSTAIRS. PowerPyx: "[only on Experienced Difficulty]". The wiki doesn't mark it as Casual-impossible.
- Wiki: "If Kara hides from Todd and fails to fight him downstairs, Kara will be presented with the same chance to charge and stun Todd downstairs. Otherwise, if Kara already stunned Todd upstairs, Kara will shut down."

**Q6. Yard (after ESCAPE FROM TODD).**
- ESCAPE VIA YARD ✓ > CATCH BUS / MISS BUS.
- FAIL TO ESCAPE > TODD BROKE KARA OUTSIDE. Wiki: "(not possible on "casual difficulty")". "Kara can be broken in the garden."

**Summary.** There are 11 player decision points (D1–D11). D1, D2, D3, D4, D5, D6, D7, D9 and D11 are genuine choices. D8 and D10 are inputs the player decides on. There are 6 execution checks (Q1–Q6). Four kinds of failure are Experienced-only: MISS BUS, TODD CATCHES THEM, FAIL TO ESCAPE, and window failure as a death. TODD WINS FIGHT is Experienced-only per PowerPyx.

---

## 3. Numbers

- **Probabilities:** none. The wiki page has no Probability table and gives no percentage for any node.
- **Timers:**
  - LOCK DOOR has "a time window of 10 seconds" (PowerPyx: "Lock Door: press O to lock the room with a time window of 10 seconds").
  - No other timer is quantified. These are stated only qualitatively: "When given the choice to “LOCK ROOM”, “SPEAK TO TODD”, or “RUN WITH ALICE” if you do nothing, Todd will enter the room"; "taking too long to get the bus will result in the bus leaving".
- **Alice relationship:** no change in this chapter. The wiki's Relationship_Stat page lists every Kara–Alice change ("Large Increase", "Small Increase", "Small Decrease"), and none mentions Stormy Night. The listed changes come from A New Home, Fugitives, On the Run, Pirates' Cove, Midnight Train, Crossroads and Battle for Detroit. Levels are "Family / Trusted / Warm / Neutral / Distant (Initial)". The chart header in PowerPyx's screenshot reads `ALICE TRUSTED`, which reflects their save state.
- **Public opinion:** no change in this chapter. The chart header shows `PUBLIC OPINION INDIFFERENT` (save state). There is a downstream effect: On the Run, Public Opinion section: "Todd was killed or injured in [[Stormy Night]], Kara & Alice stay in motel in [[Fugitives]], Kara switches on the TV to the news report about Todd's death/injury. {{Icon|down}}" (small decrease). Public_Opinion notes: "The only way to avoid Kara decreasing public opinion is by allowing her to die in [[Stormy Night]]."
- **Software instability:** not applicable. Software_Instability: "Software Instability is Connor's exclusive feature ... the other two protagonists [[Kara]] and [[Markus]] do not have it as a measured stat and deviate early in the game."
- **The deviancy wall:** no number. The input is "hold L1 and mash X" (PowerPyx). Nothing states how fast or how much mashing is needed.
- **The fight with Todd and its outcomes:** no number for any of TODD SHOT (by Kara or by Alice), KARA SHOT (none exists; Todd has no gun in the fight), ALICE HURT (no node), TODD WINS FIGHT, TODD CATCHES THEM, FAIL TO ESCAPE, MISS BUS, FAIL TO HIDE, FAIL TO OPEN DOOR or window failure.
- Choices with no stated number: every node in §1 except LOCK DOOR (10 s).

---

## 4. Cross-chapter dependencies

### Into this chapter

- **A New Home, "Kara sees gun"** (Clean Todd's Room > Tidy pills). The wiki line: "{{Icon|impact}} Kara sees gun - cross-chapter impact: required to unlock the "Kara Shot Todd" and "Alice Shot Todd" endings in [[Stormy Night]], and the "use gun" path in [[Fugitives]]." Chart node: GUN SEEN IN 'A NEW HOME' > TAKE GUN.
- **A New Home, "Kara discovers a way down"** (Clean Alice's room > Ventilate room; "the player must actually raise the controller to perform this in "experienced" difficulty"). The wiki line: "{{Icon|impact}} Kara discovers a way down - cross-chapter impact: allows escape via window during [[Stormy Night]]." Chart node: WAY OUT SEEN IN 'A NEW HOME' > OPEN WINDOW.
- The A New Home "Open Alice's box" result isn't used here; it matters in Battle for Detroit.

### Out of this chapter

The Stormy Night wiki page has a "Cross-chapter impacts" section:
- "Kara takes the gun / Gun is available in [[Fugitives]] / If Kara and Alice stay in the house in [[Fugitives]], the gun can be used in [[On the Run]]".
- "Kara and Alice die / Hank and Connor don't get a lead in [[Waiting for Hank...]]".
- "Todd lives / He can be seen in the television on [[On the Run]] / He can be met again in [[Battle for Detroit]] at the Bus Station".
- "Todd Dies / He will be mentioned by [[Joss Douglas]] in television on On the Run".

**The gun leaves this chapter only through KARA SHOT TODD and ALICE SHOT TODD.**
- Ending N54: "cross-chapter impact: allows "Use gun" path during [[Fugitives]] and disallows "Meet Todd" path during [[Battle for Detroit - Kara Leaving Detroit]]". Ending N55 carries the same text.
- PowerPyx on KARA KILLS TODD: "This approach will give Kara the gun for future chapters!"
- In Fugitives:
  - "Draw Gun AND Leave Supermarket AND/OR Take Money - if used during [[Stormy Night]]"
  - "Use Gun - if used during [[Stormy Night]]"
  - Ralph: "Convince OR Threaten With Gun - if used during [[Stormy Night]]"
- In On the Run: "In order to unlock "Forgot Gun", Kara must have taken the gun in Stormy Night, not taken the clothes from the laundromat and stayed in the Squat in Fugitive."

**Todd's fate:**
- **Alive** after N46 (KARA & ALICE EVADED TODD) or N66 (KARA & ALICE FOUGHT THEIR WAY OUT).
  - Waiting for Hank: "If [[Todd Williams|Todd]] is alive after Kara's escape during ''Stormy Night'', he can be inside the Police station filing a police report of ''Kara'' attacking him." Todd_Williams adds: "If [[Kara]] fought and stunned him, he will be seen with a bandage over his forehead."
  - On the Run TV: Todd_Williams says "If alive, he will be seen on television in the [[Eastern Motel]] being interviewed by [[Joss Douglas]] ... He claims that [[Kara]] assaulted him for no reason."
  - Battle for Detroit: "Meet [[Todd Williams|Todd]] (Todd was not killed in [[Stormy Night]])", leading to "Persuade Todd" (needs Alice's box) or "Fail to Persuade Todd".
- **Dead** after N54 or N55.
  - Waiting for Hank (Todd_Williams): "If dead, a police report in the computer will note his death, discovered by a friend, and the disappeared [[AX400]]."
  - On the Run TV: "Joss Douglas will report that Todd was murdered by an AX400 ... Watching the news report will lead to a small decrease in public opinion on androids."
- **Todd chased Kara** (N57). Wiki note: "If Todd chased Kara, later on at Jericho, an additional flashback of Todd yelling “YOU’RE MINE!” will play out."

**Kara dead** (any yellow no-entry ending). Waiting for Hank: "'''''Hank Got a Lead''''' - only if [[Kara]] didn't die in [[Stormy Night]]" and "'''''Hank Left to Get Lunch''''' - only if Kara died in Stormy Night." Kara's storyline ends.

**The window** doesn't carry forward. It is an input from A New Home only.

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| TODD KILLS ALICE | yellow no-entry (not required) | KARA FAILS TO BECOME DEVIANT (obey) **or** KARA IS TOO SLOW (deviated but never intervened). Kara is also destroyed (Kara page). |
| KARA SHOT TODD | yellow padlock (impact) | Gun taken > GET TO ALICE AFTER TODD > THREATEN WITH GUN > DEFEND ALICE > KARA KILLS TODD (Kara picks the gun back up) > OPEN FRONT DOOR > RUN TO THE BUS. Todd dead, gun kept. |
| ALICE SHOT TODD | yellow padlock (impact) | Same path, but Kara doesn't pick up the gun, so ALICE KILLS TODD. Todd dead, gun kept. |
| TODD BROKE KARA IN THE CORRIDOR | yellow no-entry | STUN TODD > LEAVE THE ROOM > TODD CHASES KARA > TODD CATCHES THEM. Experienced only. |
| KARA & ALICE FOUGHT THEIR WAY OUT | yellow padlock (impact) | Stun path (STUN TODD > LEAVE THE ROOM > TODD CHASES KARA), then either the front door succeeds or FIGHT DOWNSTAIRS > ESCAPE FROM TODD > ESCAPE VIA YARD; then CATCH BUS. Todd alive. **Also reached from the hide path** whenever it goes through FIGHT DOWNSTAIRS (RUN TO BACKYARD or FAIL TO OPEN DOOR), because FIGHT DOWNSTAIRS joins the upper CATCH/MISS pair. |
| TODD BROKE KARA DOWNSTAIRS | yellow no-entry | FIGHT DOWNSTAIRS > TODD WINS FIGHT. Experienced only per PowerPyx. On the hide path the wiki says Kara gets a second chance to stun first. |
| TODD BROKE KARA OUTSIDE (copy 1) | yellow no-entry | OPEN WINDOW > GO OUT > FAIL TO ESCAPE BY WINDOW (Experienced; on Casual the game routes to DEFEND ALICE). |
| TODD BROKE KARA OUTSIDE (copy 2) | yellow no-entry | MISS BUS (either pair) or FAIL TO ESCAPE in the yard. Experienced only. |
| KARA & ALICE EVADED TODD | yellow padlock (impact) | GET TO ALICE BEFORE TODD, then either RUN AWAY > HIDE IN CORRIDOR > TRY FRONT DOOR > OPEN FRONT DOOR, or LOCK DOOR > OPEN WINDOW > GO OUT > ESCAPE BY WINDOW; then RUN TO THE BUS > CATCH BUS. Todd alive and never fought. |

Kara and Alice survive in four endings: KARA SHOT TODD, ALICE SHOT TODD, KARA & ALICE FOUGHT THEIR WAY OUT and KARA & ALICE EVADED TODD. In the other five, Kara is destroyed and Alice is killed (Kara page, "Possible Deaths"; Todd_Williams: "Then Todd looms over [[Alice]] with his belt, likely killing her off-screen"). There is no ending where Kara is shot (Todd never has the gun in the fight), and no ending where Alice is hurt but survives.

On Casual, only TODD KILLS ALICE and the four survival endings are reachable. TODD BROKE KARA DOWNSTAIRS is uncertain; see §8.

---

## 6. Media

None. The wiki Magazine table has no entry for Stormy Night (Todd's house magazines are listed under A New Home: Connecting the Dots, Android QB, The Price of Life). No broadcast is described in the chapter.

The only media link is downstream: the On the Run motel TV report about Todd, which carries a public-opinion drop (see §3 and §4).

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.3.5) has three chapter-7 scenes: K02 "Breaking the order", K03 "Reaching {{Alice}}" and K04 "{{Todd}}'s gun". All are `decision`. There are no media or event scenes. Related logic is in `benchmark/story-engine.mjs`: line 78 (gate on K04) and lines 189–192 (consequences). The prerequisite K01 (chapter 4) is at engine line 185.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| DINNER'S READY, WAIT ON TODD & ALICE, TODD GETS MAD | folded into K02 `situation` | Missing as an event scene. Acceptable as narration, but the checkpoint pair isn't represented. |
| BREAK PROGRAMMING / KARA FAILS TO BECOME DEVIANT > TODD KILLS ALICE | K02 options 0/1; option 1 sets `kara=false, alice=false` | Covered. The outcome text matches. |
| KARA IS TOO SLOW > TODD KILLS ALICE | none | **Missing.** Kara deviates but doesn't intervene. |
| KARA IS IN TODD'S WAY DOWNSTAIRS / REASON WITH TODD > TODD SHOVES KARA DOWNSTAIRS > TODD GOES UPSTAIRS | K03 option 1 ("reason") and option 2 ("Confront him physically") | Partly covered. "Confront him physically" doesn't exist as a chart option: blocking him gets Kara shoved (N9 > N11), and the fight only starts at DEFEND ALICE. Option 2's outcome "the fight begins in Alice’s room" skips the shove. **Mislabelled.** |
| GO UPSTAIRS / KARA IS IN TODD'S WAY UPSTAIRS / TODD SHOVES KARA UPSTAIRS | K03 option 0 (risk 0.2) | **Mislabelled / conflated.** Option 0 merges GO UPSTAIRS, GET TO ALICE BEFORE TODD and the whole escape into one risk roll. Its failure (`toddCaught`, "Todd catches Kara on the stairs and throws her down") roughly matches TODD SHOVES KARA UPSTAIRS. |
| TAKE GUN (from GO UPSTAIRS, TODD SHOVES KARA UPSTAIRS, TODD TAKES ALICE TO HER ROOM) | K04 option 0 | Partly covered. The gate (engine line 78: `gunDiscovered && (K03 in 1,2 || toddCaught)`) is close, but the chart also offers TAKE GUN straight from GO UPSTAIRS and after FAIL TO HIDE. |
| GET TO ALICE BEFORE TODD > REASON WITH TODD (upstairs) | none | **Missing.** |
| RUN AWAY > FAIL TO HIDE / HIDE IN CORRIDOR > TODD TAKES ALICE TO HER ROOM / TODD REALIZES KARA AND ALICE ARE GONE | none | **Missing.** The whole hide-and-sneak route is absent. |
| TODD IS COMING > OUT OF TIME > TODD BREAKS INTO BEDROOM | none | **Missing.** |
| LOCK DOOR > GRAB LAMP / TALK TO ALICE / OPEN WINDOW | none | **Missing.** |
| WAY OUT SEEN IN 'A NEW HOME' gate | none | **Missing gate.** K01 option 0 bundles "take note of the gun **and** free Alice's window", and the engine only records `gunDiscovered` (line 185). Nothing records the window. K03 option 0 success always says Kara "gets her out through the window" without checking it. The chart has two separate impact nodes, so gun and window should be two separate A New Home facts. |
| FACE TODD / GO OUT, FAIL TO ESCAPE BY WINDOW / ESCAPE BY WINDOW | K03 option 0 success text only | **Missing as choices.** |
| TRY FRONT DOOR / RUN TO BACKYARD, OPEN FRONT DOOR / FAIL TO OPEN DOOR (both copies) | none | **Missing.** |
| RUN TO THE BUS, CATCH BUS / MISS BUS (both copies) | Every success outcome says "catch the last bus" | **Missing** as a check, and the death on missing the bus is absent. |
| THREATEN WITH GUN > DEFEND ALICE > KARA KILLS TODD / ALICE KILLS TODD | K04 option 0 (risk 0.1); success = Kara shoots, failure = Alice shoots; sets `gun=true, todd=false` | Covered in effect. Two problems: (a) on failure the engine applies `alice(-1)` (engine line 191), and **no wiki source gives an Alice relationship change in this chapter**; (b) in the game, Kara vs Alice shooting is decided by whether the player picks the gun up, not by chance. |
| DEFEND ALICE (unarmed) > STUN TODD > LEAVE THE ROOM > TODD CHASES KARA | K04 option 1 (risk 0.3); success text "escapes with Alice out of the window to the last bus. Todd is alive." | **Mislabelled.** After STUN TODD the escape is through the corridor, the front door or the backyard, not the window. Option 1's failure (`kara=false`, "Todd overpowered Kara and destroyed her, then killed Alice") has **no chart node in Alice's room**: STUN TODD is always available (PowerPyx). The deaths come later, at TODD CATCHES THEM, TODD WINS FIGHT, FAIL TO ESCAPE and MISS BUS. |
| Unarmed fight when the gun was never seen | none | **Gap.** K04 is skipped when `gunDiscovered` is false (engine line 78), so a K03 option 1 or 2 run with no gun has no fight or escape scene at all and leaves the chapter with Todd alive by default. |
| TODD CATCHES THEM > TODD BROKE KARA IN THE CORRIDOR | none | **Missing ending.** |
| FIGHT DOWNSTAIRS > ESCAPE FROM TODD / TODD WINS FIGHT > TODD BROKE KARA DOWNSTAIRS | none | **Missing ending.** |
| ESCAPE VIA YARD / FAIL TO ESCAPE > TODD BROKE KARA OUTSIDE | none | **Missing ending.** |
| KARA & ALICE EVADED TODD vs KARA & ALICE FOUGHT THEIR WAY OUT | not distinguished | **Missing.** The engine records only `todd` (alive or dead). The difference matters downstream: Todd's bandage at the police station if he was stunned, and the "YOU’RE MINE!" flashback if Todd chased Kara. |
| Risk values K03 0.2, K04 0.1/0.3 | — | No source number backs these (§3). The chart has no gameplay-failure path from "take the gun", so a 0.1 risk on the gun option that only flips who shoots isn't a failure in the game's sense. |

Downstream use is consistent with the wiki. `s.gun` gates K06 option 1 and K07b option 2 (engine lines 149 and 151). `s.todd` gates K23 (line 119) and the motel news predicates `motelToddDead` / `motelToddAlive` (line 32). Not checked in this pass: whether Waiting for Hank (C08 / R12) branches on Kara's death ("Hank Left to Get Lunch"). A search of story.json for "lunch" or "got a lead" found nothing.

---

## 8. Open questions

1. **Difficulty.** Five endings or failure branches exist only on Experienced: MISS BUS, TODD CATCHES THEM, FAIL TO ESCAPE, window failure as a death, and (per PowerPyx) TODD WINS FIGHT. The benchmark has to choose Experienced or Casual. The wiki marks TODD WINS FIGHT only as `nr`, not "not possible on casual", which contradicts PowerPyx. Check in game.
2. **Losing the fight in Alice's room.** The Kara page says "If Kara fights Todd without grabbing the gun and fails to win, Todd will break her apart and proceed to kill Alice". The Alice page says Kara can "fail to fight off Todd in the living room or in Alice's room" (Experienced). But the chart has no death node after DEFEND ALICE, and PowerPyx says STUN TODD is always available. Which is right? (Wiki note: "If Kara hides from Todd and fails to fight him downstairs, Kara will be presented with the same chance to charge and stun Todd downstairs. Otherwise, if Kara already stunned Todd upstairs, Kara will shut down." This suggests the in-room death is really TODD BROKE KARA DOWNSTAIRS.)
3. **Gun taken but Todd not shot.** Wiki note: "It is possible to take the gun without killing Todd however in order to so, Kara will have to do nothing which will result in Alice and then Kara too, playing similarly to if she didn't deviate." Which chart node does this end on? There is no edge from the gun path to TODD KILLS ALICE. Can Kara with the gun choose STUN TODD and keep the gun into Fugitives? (Fugitives says the gun is usable "if used during Stormy Night".)
4. **KARA IS TOO SLOW incoming edge.** The chart draws it from a connector marker at the far left, not from KARA BECOMES DEVIANT. Does it also trigger after GO UPSTAIRS if Kara then dawdles? The Kara page says "If Kara deviates but is not fast enough to enter the room to save Alice before Todd beat the former to death".
5. **The edges out of TODD GOES UPSTAIRS (N12) and into TAKE GUN (N17)** were traced from the low-resolution overview. Confirm in game that after TODD SHOVES KARA DOWNSTAIRS Kara can still go to Todd's room for the gun before entering Alice's room.
6. **FAIL TO ESCAPE BY WINDOW on Casual.** The chart draws edges to both TODD BROKE KARA OUTSIDE and DEFEND ALICE. Confirm which applies on which difficulty.
7. **Public opinion from the On the Run news.** On_the_Run says the drop applies when Todd was "killed or injured". Todd_Williams attributes the drop only to the murder report. Which TV report lowers opinion?
8. **Alice relationship.** Does anything in Stormy Night move it? The Relationship_Stat page lists nothing. The engine's `alice(-1)` on ALICE KILLS TODD has no source.
9. **Is the Alice-room ACCEPT/REFUSE prompt** (Todd tells Kara to move) a decision the benchmark should model? It changes nothing on the chart ("Choosing “ACCEPT” in any scenario will have Kara move away and change her mind").
10. **Labels read only from the overview** need checking against the in-game chart: TODD GOES UPSTAIRS and GUN SEEN IN 'A NEW HOME'.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter walkthrough link)
- https://www.powerpyx.com/detroit-become-human-stormy-night-walkthrough-100/ (PowerPyx walkthrough text: the input for each node, the Experienced-only failures, the 10-second Lock Door window, gun-pickup control of Kara vs Alice shooting)
- https://www.powerpyx.com/wp-content/uploads/detroit-stormy-night-100.jpg (full 100% chart; structure, edges, 9 ending boxes, header state PUBLIC OPINION INDIFFERENT / ALICE TRUSTED)
- https://www.powerpyx.com/wp-content/uploads/detroit-stormy-night-first-choice-branch.jpg (legible labels for DINNER'S READY through GO UPSTAIRS, the downstairs branch, TODD KILLS ALICE)
- https://www.powerpyx.com/wp-content/uploads/detroit-stormy-night-lower-branch-a.jpg (legible labels for GET TO ALICE BEFORE TODD, the hide/lock/window branch, WAY OUT SEEN IN 'A NEW HOME', TAKE GUN, TODD SHOVES KARA UPSTAIRS)
- https://www.powerpyx.com/wp-content/uploads/detroit-stormy-night-lower-branch-b.jpg (legible labels for the escape after hiding, both bus pairs, KARA & ALICE EVADED TODD, TODD BROKE KARA DOWNSTAIRS/OUTSIDE)
- https://www.powerpyx.com/wp-content/uploads/detroit-stormy-night-upper-branch1.jpg (legible labels for THREATEN WITH GUN, DEFEND ALICE, the shoot/stun group, KARA SHOT TODD, ALICE SHOT TODD, the chase, FIGHT DOWNSTAIRS; taken before 100%, shows `[...]` placeholders)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Stormy_Night&prop=wikitext&format=json (wiki chapter page: infobox, Flowchart list, Cross-chapter impacts, Notes, Unused Content; saved as /tmp/flowcharts/ch07/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings: nri = "Not required for completion", impact = "Cross-chapter impact")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (Alice levels and the full list of changes; none in Stormy Night)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (Kara's four small decreases; dying in Stormy Night avoids them)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor-only stat)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (no Stormy Night magazines)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=A_New_Home&prop=wikitext&format=json ("Kara sees gun" and "Kara discovers a way down" impact lines)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json (gun-gated options)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json (TV report public-opinion drop; "Forgot Gun")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json (Hank Got a Lead / Hank Left to Get Lunch; Todd at the station)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Kara_Leaving_Detroit&prop=wikitext&format=json (Meet Todd when Todd is alive)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Todd_Williams&prop=wikitext&format=json (Todd's fates downstream; bandage if stunned; news report)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (chapter summary and "Possible Deaths" list)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (deaths and the Experienced-only note)
- https://detroitbecometext.github.io/chapters/7 (transcript linked from the wiki; a JavaScript app that couldn't be read with curl, so not used)
