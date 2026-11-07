# Chapter 13: On the Run (Kara and Connor)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch13/wiki.txt`, and the related wiki pages to `/tmp/flowcharts/ch13/w_*.txt`. The flowchart images are in `/tmp/flowcharts/ch13/`, with zoomed crops in `/tmp/flowcharts/ch13/crops/`. None of them were committed.

Wiki infobox: `|date=November 6, 2038`, `|time=10:25AM`, `|player=[[Kara]] [[Connor]] <small>(if players chose to sleep at the squat or motel, or got spotted)</small>`, `|location=Camden, [[Detroit]]`, `|endings=7`. Objectives: Kara has "Watch over Alice", "Change appearance" and "Sneak past cops"; Connor has "Investigate deviant trail" and "Catch deviant android". The text says: "This chapter has seven different outcomes." Wiki Overview: "The start of this chapter varies based on where Kara decided to stay in [[Fugitives]]." The Flowchart section adds: "Trees are shown from squatting, the motel, and the parking lot. All points merge where "Connor Pursues Kara"."

---

## 1. Flowchart transcription

### How the chart was read

- The full chart is `detroit-become-human-on-the-run-flowchart-100.jpg`, PowerPyx's overview. Its progress bar is full, but at 1920×1080 none of the labels can be read. It was used for the layout and for counting boxes. The labels come from the ten zoomed screenshots:
  - `explore-lot`: parking lot, taken at 78% completion; the rest of the chart is shown as red-padlock `[...]`.
  - `-3` to `-7`: motel and the start of the squat.
  - `squat-branch-explore`, `squat-branch-police`, `squat-branch-connor-investigation`: squat.
  - `middle-before-chase`: the street.
  - `pursuit-branch-a` and `pursuit-branch-b`: the chase.
- There are three starting checkpoints, stacked on the left: MORNING IN PARKING LOT (top), MORNING IN MOTEL (middle) and MORNING IN SQUAT (bottom). The parking-lot and motel rows merge into KARA & ALICE IN THE STREET. The street and squat rows then merge, together with the motel's CHECK THE DOOR, into CONNOR PURSUES KARA. The pursuit has its own section on the far right.
- The overview's blue path is PowerPyx's last run: motel > … > KARA & ALICE IN THE STREET > … > SPOTTED BY POLICE > CONNOR PURSUES KARA > … > KARA & ALICE DIED ON THE HIGHWAY. That is a save state, not part of the chapter's structure.
- Icon key. This is the same as ch07, plus three icons that ch07 didn't use:
  - ⇨ action.
  - △ event.
  - Double square: a group of alternatives.
  - ✓ success. ✗ failure (on CAR HITS CONNOR only).
  - Small black circle with a slash (⊘, wiki `nr`, "not required"): on every "CAR HITS KARA…" node.
  - Yellow circle with a slash (wiki `nri`): only on the ending KARA & ALICE DIED ON THE HIGHWAY.
  - Yellow padlock (cross-chapter impact): on every CUT AND COLOR HAIR, on CHANGE CLOTHES and on FIND SOME CLOTHES.
  - New: speech bubble (a dialogue node), on CHEER ALICE UP.
  - New: magnifier (a Connor clue), on the CHECK… and ANALYZE… nodes.
  - New: a large picture tile without an end bracket. These are the checkpoints, or "key moment" tiles such as POLICE ARRIVES and KARA & ALICE ARE AT THE HIGHWAY.
- No skull and no trophy appear on this chart.
- PowerPyx's text tags TAKE GUN BACK, FORGOT GUN, THREATEN RALPH and SQUAT DEVIANT INFORMS ON AX400 as "[CROSS CHAPTER IMPACT]". On the chart those four nodes carry no padlock; they show plain ⇨ or △ icons.

Labels are quoted exactly as printed. "(inferred)" means the label couldn't be read in any zoomed screenshot; the text then comes from the wiki or PowerPyx, and only the box's position comes from the overview. "Hub" means a large-type group title such as `[ EXPLORE PARKING LOT ]` that frames optional actions. Hubs are counted as boxes.

### A. Parking lot (Kara; Fugitives ending "Alice & Kara Stayed in Abandoned Car")

| # | Label | Icon | Edge |
|---|---|---|---|
| P1 | MORNING IN PARKING LOT | checkpoint (tile, "CHECKPOINT") | > P2 |
| P2 | LEAVE ALICE ASLEEP IN CAR | ⇨ | > P3 |
| P3 | EXPLORE PARKING LOT | hub | contains P4–P18 > P19 |
| P4 | FIND SOME RUSTED SCISSORS | ⇨ | > P5 |
| P5 | CUT AND COLOR HAIR | yellow padlock | > group P6–P9 |
| P6–P9 | BROWN / BLACK / WHITE / BLONDE | choice group | > P10 |
| P10 | REMOVE LED | ⇨ | end of sub-branch |
| P11 | FIND BURNT ANDROID | ⇨ | optional |
| P12 | READ "CYBER-WILDLIFE" | ⇨ | optional |
| P13 | READ "ANDROID AND CANADA" | ⇨ | optional |
| P14 | TRY TO OPEN CAR TRUNK | ⇨ | > P15 |
| P15 | FIND A CROWBAR | ⇨ | > P16 |
| P16 | FIND SOME CLOTHES | yellow padlock | end of sub-branch |
| P17 | CHECK NEIGHBORHOOD | ⇨ | > P18 |
| P18 | POLICE IS IN VICINITY | △ | (the wiki prints "Police in Vicinity") |
| P19 | WAKE UP ALICE | ⇨ | > P20 |
| P20 | LEAVE THE PARKING LOT | ⇨ | > P21 |
| P21 | CONNOR INVESTIGATES SUPERMARKET | checkpoint tile (inferred) | > P22 |
| P22 | POLICE DON'T HAVE A LEAD | small node (inferred) | > S1 (a long line along the top of the chart) |

### B. Motel, Kara (Fugitives ending "Alice & Kara Stayed in Motel")

| # | Label | Icon | Edge |
|---|---|---|---|
| M1 | MORNING IN MOTEL | checkpoint | > M2 |
| M2 | TALK TO ALICE | ⇨ | > M3, and a separate line straight to the M11 hub (wiki: "Go directly to Explore Motel Room") |
| M3 | DRAW A BATH FOR ALICE | ⇨ | > M4 |
| M4 | CUT AND COLOR HAIR | yellow padlock | > group M5–M8 |
| M5–M8 | BROWN / BLACK / WHITE / BLONDE | choice group | > M9 |
| M9 | REMOVE LED | ⇨ | > M11 and > M10 |
| M10 | FINISH DRAWING BATH | ⇨ | > M17 (bypasses the hub; wiki: "leads to either Explore Motel Room below or bypasses it") |
| M11 | EXPLORE MOTEL ROOM | hub | contains M12–M16 > M17 |
| M12 | LOOK AT THE CLOCK | ⇨ | optional |
| M13 | LOOK OUTSIDE | ⇨ | optional |
| M14 | READ "CYBER-WILDLIFE" | ⇨ | optional |
| M15 | READ "ANDROID AND CANADA" | ⇨ | optional |
| M16 | LOOK AT THE PAINTING | ⇨ | optional |
| M17 | CHANGE CHANNEL | ⇨ | > M18 (no bypass edge is visible; see §8) |
| M18 | ALICE HEARS ABOUT TODD | △ | > M19 |
| M19 | CHEER ALICE UP | speech bubble | > M20 |
| M20 | LOOK FOR BREAKFAST | ⇨ | > M21 |
| M21 | KARA SPOTS POLICE FORCES | △ | > M22 |

### C. Motel, Connor

| # | Label | Icon | Edge |
|---|---|---|---|
| M22 | CONNOR INVESTIGATES THE MOTEL | checkpoint | > M23 |
| M23 | INTERROGATE RECEPTIONIST | ⇨ | > M24 |
| M24 | FOLLOW HANK | ⇨ | > M25 or M26 |
| M25 | HANK CHECKS MOTEL ROOM | △ | > S1 |
| M26 | CHECK THE DOOR | ⇨ | > H1 (a long line under the street section) |

### D. Kara & Alice in the street (Kara; the parking-lot and motel rows)

| # | Label | Icon | Edge |
|---|---|---|---|
| S1 | KARA & ALICE IN THE STREET | checkpoint tile (PowerPyx: "Checkpoint: Kara & Alice in the Street") | inputs: P22, M25 > S2 |
| S2 | WALK TOWARD TRAIN STATION | ⇨ | > group S3/S4 |
| S3 | SNEAK PAST POLICE FORCES | group member | > S5 |
| S4 | SPOTTED BY POLICE | group member | > S6 |
| S5 | **REACHED THE TRAIN SAFELY** | ending tile, no icon | ENDING |
| S6 | KARA & ALICE RUN AWAY | △ | > H1 |

### E. Squat, Kara (Fugitives ending "Alice & Kara Stayed in the Squat")

| # | Label | Icon | Edge |
|---|---|---|---|
| Q1 | MORNING IN SQUAT | checkpoint | > Q2 |
| Q2 | EXPLORE SQUAT | hub | contains Q3–Q9 > Q10 |
| Q3 | READ "CYBER-WILDLIFE" | ⇨ | optional |
| Q4 | READ "ANDROID AND CANADA" | ⇨ | optional |
| Q5 | REVIVE FIRE | ⇨ | PowerPyx: "Unmissable in order to continue" |
| Q6 | READ LEAFLET | ⇨ | optional |
| Q7 | CHECK ON ALICE | ⇨ | optional |
| Q8 | LOOK AT RALPH'S STUFF | ⇨ | > Q9 |
| Q9 | STEAL MONEY | ⇨ | optional |
| Q10 | GO UPSTAIRS | ⇨ | > Q11 and > Q19 |
| Q11 | CUT AND COLOR HAIR | yellow padlock | > group Q12–Q15 |
| Q12–Q15 | BROWN / BLACK / WHITE / BLONDE | choice group | > Q16 |
| Q16 | REMOVE LED | ⇨ | > Q18, or > Q17 > Q18 |
| Q17 | FIND CORPSE IN BATHTUB | ⇨ | > Q18 |
| Q18 | GO DOWNSTAIRS | ⇨ | > Q22 |
| Q19 | CHANGE CLOTHES | yellow padlock | > Q20 or Q21 |
| Q20 | FORGOT GUN | ⇨ | |
| Q21 | TAKE GUN BACK | ⇨ | |
| Q22 | POLICE ARRIVES | large tile | > Q23 |
| Q23 | RALPH WANTS A FAMILY MEAL | △ | > group Q24/Q25 |
| Q24 | AGREE TO SIT | group member | > Q27 |
| Q25 | REFUSE TO SIT | group member | > Q26 |
| Q26 | RALPH THREATENS ALICE | △ | > Q27 |
| Q27 | SIT AT THE TABLE | ⇨ | > group Q28–Q30 |
| Q28 | DISCUSS CORPSE | group member | > Q31 |
| Q29 | TRY TO CONVINCE RALPH | group member | > Q31 |
| Q30 | THREATEN RALPH | group member | > Q32 (bypasses Q31) |
| Q31 | RALPH APOLOGIZES | △ | > Q32 |
| Q32 | DISTURBED BY CONNOR | △ | > Q33 |

### F. Squat, Connor

| # | Label | Icon | Edge |
|---|---|---|---|
| Q33 | CONNOR INVESTIGATES SQUAT | checkpoint | > Q34 |
| Q34 | ENTER SQUAT | ⇨ | > Q35 |
| Q35 | INTERROGATE SQUAT ANDROID | ⇨ | > Q36 or Q37 |
| Q36 | SQUAT DEVIANT INFORMS ON AX400 | △ | > H1 |
| Q37 | SQUAT ANDROID KEEPS QUIET | △ | > Q38 |
| Q38 | INVESTIGATE SQUAT GROUND FLOOR | hub | contains Q39–Q45 |
| Q39 | CHECK UPSTAIRS | magnifier | clue |
| Q40 | ANALYZE SQUAT ANDROID | magnifier | clue |
| Q41 | CHECK TABLE | magnifier | clue |
| Q42 | CHECK UNDER THE STAIRS | magnifier | > Q47 |
| Q43 | CHECK KITCHEN | magnifier | clue |
| Q44 | CHECK FIREPLACE | magnifier | clue |
| Q45 | HANK COMMANDS CONNOR TO LEAVE | △ | > Q49 |
| Q46 | `[...]` (label unknown) | red padlock on the zoomed screenshot; reddish and unreadable on the 100% overview | from the right edge of the Q38 hub > Q49. Not in the wiki list. See §8. |
| Q47 | SQUAT ANDROID ATTACKS CONNOR | △ | > Q48 |
| Q48 | AX400 AND CHILD ESCAPED | △ | > H1 |
| Q49 | SQUAT ANDROID DISAPPEARS | △ | > Q50 |
| Q50 | **KARA & ALICE UNDISCOVERED IN SQUAT** | ending tile, no icon | ENDING |

### G. Connor pursues Kara (shared finale)

| # | Label | Icon | Edge |
|---|---|---|---|
| H1 | CONNOR PURSUES KARA | checkpoint tile | inputs: S6, M26, Q36, Q48 > H2 |
| H2 | RUN TOWARD THEIR LAST KNOWN POSITION | ⇨ | > H3, or > group H5/H6 |
| H3 | REACH FENCE TOO LATE | △ | > H4 |
| H4 | **KARA & ALICE VANISHED** | ending tile, no icon | ENDING |
| H5 | REACH FENCE IN TIME | group member | > H8 |
| H6 | REACH FENCE TOO LATE | group member | > H7 |
| H7 | **KARA & ALICE CROSSED THE HIGHWAY** | ending tile, no icon | ENDING |
| H8 | KARA & ALICE ARE AT THE HIGHWAY | large tile | > group H9/H10 |
| H9 | KARA & ALICE REACH MIDDLE SECTION | ✓ | > H11 |
| H10 | CAR HITS KARA & ALICE (copy 1, first lanes) | ⊘ | > H28 |
| H11 | HANK ORDERS CONNOR NOT TO GO | △ | > group H12/H13 |
| H12 | CONNOR OBEYS HANK'S ORDER | group member | > group H14/H15 |
| H13 | CONNOR PURSUES AX400 | group member | > group H16/H17 |
| H14 | KARA & ALICE GET TO THE OTHER SIDE (copy 1) | ✓ | > H26 |
| H15 | CAR HITS KARA & ALICE (copy 2, obey path) | ⊘ | > H28 |
| H16 | CONNOR REACHES MIDDLE SECTION | ✓ | > H18 |
| H17 | CAR HITS CONNOR | ✗ | > group H24/H25 |
| H18 | KARA & ALICE CROSS LAST SECTION | ⇨ | > H19 |
| H19 | CONNOR CATCHES KARA | △ | > group H20/H21 |
| H20 | KARA LOSES CONNOR | ✓ | > group H22/H23 |
| H21 | CAR HITS KARA | ⊘ | > H28 |
| H22 | CONNOR AVOIDS COLLISION | group member | > H26 |
| H23 | CONNOR HIT BY CAR | group member | > H27 |
| H24 | KARA & ALICE GET TO THE OTHER SIDE (copy 2) | ✓ | > H27 |
| H25 | CAR HITS KARA & ALICE (copy 3, after Connor is hit) | ⊘ | > H28 |
| H26 | **KARA & ALICE REACHED THE OTHER SIDE** (copy 1, top; picture shows Connor standing) | ending tile, no icon | ENDING (Connor alive) |
| H27 | **KARA & ALICE REACHED THE OTHER SIDE** (copy 2, middle; picture shows Connor lying on the road) | ending tile, no icon | ENDING (Connor destroyed) |
| H28 | **KARA & ALICE DIED ON THE HIGHWAY** | yellow no-entry (`nri`) | ENDING; inputs: H10, H15, H21, H25 |

Order within groups as printed: SNEAK PAST POLICE FORCES above SPOTTED BY POLICE; AGREE TO SIT above REFUSE TO SIT; DISCUSS CORPSE, TRY TO CONVINCE RALPH, THREATEN RALPH; REACH FENCE IN TIME above REACH FENCE TOO LATE; success above failure in every QTE pair; CONNOR OBEYS HANK'S ORDER above CONNOR PURSUES AX400; CONNOR AVOIDS COLLISION above CONNOR HIT BY CAR.

The H22/H23 edges were checked on a zoomed crop (`crops/pb-right.png`). AVOIDS COLLISION feeds the top REACHED THE OTHER SIDE, which the obey path's H14 also feeds. HIT BY CAR feeds the middle copy, which H24 also feeds.

**Totals:** 132 boxes, numbered P1–P22, M1–M26, S1–S6, Q1–Q50 and H1–H28. Each colour counts as one box. By section: parking lot 22, motel Kara 21, motel Connor 5, street 6, squat Kara 32, squat Connor 18, pursuit 28. Of the 132, 4 are hubs (P3, M11, Q2, Q38) and 1 is the unlabelled Q46. That leaves 127 labelled action, event or outcome boxes.

Repeated labels:
- READ "CYBER-WILDLIFE", READ "ANDROID AND CANADA", CUT AND COLOR HAIR, REMOVE LED and BROWN/BLACK/WHITE/BLONDE: ×3 each.
- REACH FENCE TOO LATE ×2, KARA & ALICE GET TO THE OTHER SIDE ×2, KARA & ALICE REACHED THE OTHER SIDE ×2.
- CAR HITS KARA & ALICE ×3.

**7 ending boxes, 6 distinct ending labels.** This matches `endings=7`.

### Interactions not on the chart (wiki and PowerPyx)

- Motel dialogue:
  - On waking, "bath?" or "hungry?" (Alice ↑).
  - At CHEER ALICE UP, four options: "moving", "determined", "comforting", "supportive" (all Alice ↑).
  - Unused: "REASSURING", "ANALYTICAL", "VULNERABLE", "SINCERE".
- Motel, Connor: a three-way dialogue outside the desk, "rational", "diplomatic" or "direct". Relationship_Stat calls it "Any response to Hank asking Connor to wait in the car after interrogating the motel receptionist" (Hank ↓ whatever is picked).
- Squat:
  - Ralph asks what Alice was whispering; Kara can answer "lie" (Alice ↑) or "truth" (Alice ↓).
  - "Choosing "refuse" twice when Ralph asks Kara and Alice to join him" (Alice ↑).
  - CHECK GUN: wiki note: "When Ralph offers food for Alice, Kara must refuse both times. This will cause Ralph to stop Alice, and Kara will have the option to "Check Gun"". This is how FORGOT GUN is revealed.
- Squat: the knife. Ralph page: "if she sits down and doesn't have the gun (either she didn't take it in Stormy Night or she forgot to pick up and left it upstairs) she can then threaten Ralph with a knife on the table."
- Squat hiding. Wiki: "If Kara was kind to Ralph, then Ralph will intervene on their behalf when Connor gets close to their hiding place." Ralph page: "When Connor approaches, Ralph will hide the girls under the stairs to protect them." PowerPyx: "If you keep a lookout for Ralph's Stress-Level once Connor walks around, you notice that it will go up if you get closer to the stairs and arcade-machine. If you step too close to the side of the stairs, Ralph will hold Connor, while Alice & Kara run away."
- Squat, CHECK UPSTAIRS. PowerPyx: "Connor will stay in the middle of them and ask Ralph if there is anyone upstairs. Ralph declines and Connor believes him."
- The street sneak. PowerPyx gives a cover-to-cover route: motel side, bus shelter, cross fast ("If you are a bit too slow, you will be spotted"), umbrella, and then "use the ATM-Cover to the right once given the choice between two."
- Fence. Hank page: "Connor will attempt to climb the fence, but Hank will grab his shoulder and tell him that he could get himself killed. If Connor climbs the fence, Hank will be disappointed. If Connor gets hit by a truck crossing the highway, Hank will be upset." The prompt buttons are GIVE UP and GO (PowerPyx).
- Wiki note on deaths: "If Connor gives up on chasing Kara and Alice after Hank orders him to and the latter two fail to cross the highway, with Kara and Alice both dying, then the scene with Hank feeling emotionally distraught will play as usual, only this time with Connor present. The same scene will still play if Connor does continue to chase Kara and Alice if all 3 of them die on the Highway, only this time, Connor is absent from the cutscene."

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution checks. Node numbers refer to §1.

**Gate G0. Which start (from Fugitives).** The shelter from Fugitives picks the row: MORNING IN PARKING LOT, MORNING IN MOTEL or MORNING IN SQUAT. The player doesn't choose it in this chapter. Infobox: Connor is playable "if players chose to sleep at the squat or motel, or got spotted".

**D1. Hair colour (P5, M4, Q11).** BROWN, BLACK, WHITE or BLONDE. On every row this is followed by REMOVE LED. PowerPyx: "Remove LED: Unmissable, Kara will always rip it out after choosing her new haircut."
- Motel: the haircut sits under DRAW A BATH FOR ALICE (M3).
- Car: under FIND SOME RUSTED SCISSORS (P4).
- Squat: under GO UPSTAIRS (Q10).
- Effect: no gate is stated. The padlock marks a cross-chapter impact; see §4.

**D2. Clothes (car P14–P16; squat Q19).**
- Car: TRY TO OPEN CAR TRUNK > FIND A CROWBAR > FIND SOME CLOTHES. Wiki: "Try to Open Car Trunk (only available if didn't obtain clothes in [[Fugitives]])"; "If Kara stole clothes from the laundromat, the crowbar will not be available." It is optional: Kara page: "if she stays in the abandoned car but does not take the jacket, she can remain in her uniform until after "Zlatko"".
- Squat: CHANGE CLOTHES. PowerPyx: "Only possible, if you haven't stolen new clothes in Fugitives!"
- Motel: no node. Kara already wears the laundromat clothes, because the motel required them.

**D3. The gun in the squat (Q20/Q21).** This comes after CHANGE CLOTHES and **requires the gun**, which means Kara or Alice shot Todd in Stormy Night.
- TAKE GUN BACK.
- FORGOT GUN. PowerPyx: "Don't pick it up and proceed. Once in the argument with Ralph downstairs, choose the Check Gun option to realize, you didn't pick it up."
- Wiki: "In order to unlock "Forgot Gun", Kara must have taken the gun in Stormy Night, not taken the clothes from the laundromat and stayed in the Squat in Fugitive."

**D4. Optional exploration.** None of these change anything on the chart:
- STEAL MONEY (needs LOOK AT RALPH'S STUFF). Unused content: "Initially, Kara could make use of whatever money she kept for future purchases."
- READ LEAFLET, CHECK ON ALICE.
- FIND BURNT ANDROID, LOOK AT THE CLOCK, LOOK OUTSIDE, LOOK AT THE PAINTING.
- Two magazines in every row (§6).

**D5. FIND CORPSE IN BATHTUB (Q17).** Optional. It unlocks DISCUSS CORPSE (Q28). PowerPyx: "pull away the curtain to see a body. This will open a new dialogue option soon."

**D6. Ralph's meal (after Q23).**
- AGREE TO SIT > SIT AT THE TABLE.
- REFUSE TO SIT > RALPH THREATENS ALICE > SIT AT THE TABLE. PowerPyx: "No matter what you chose before, you will eventually sit down." Alice ↑ if Kara "initially refuses to sit down" (On_the_Run), or "Choosing "refuse" twice" (Relationship_Stat).
- Not on the chart: "lie" (Alice ↑) or "truth" (Alice ↓) when Ralph asks what Alice said.

**D7. At the table (group Q28–Q30).**
- DISCUSS CORPSE. **Requires FIND CORPSE IN BATHTUB.** Leads to RALPH APOLOGIZES > DISTURBED BY CONNOR.
- TRY TO CONVINCE RALPH (PowerPyx: "BLUFF"). Leads to RALPH APOLOGIZES > DISTURBED BY CONNOR.
- THREATEN RALPH > DISTURBED BY CONNOR.
  - PowerPyx: "If you have your gun on you, press [Triangle] to threaten him."
  - Ralph page: without the gun she can "threaten Ralph with a knife on the table".
  - It routes Connor's interrogation to SQUAT DEVIANT INFORMS ON AX400. PowerPyx: "If Kara threatened Ralph with her Gun a few seconds back, Ralph will tell Connor immediately that Kara & Alice just ran away."
  - Kara page: "if Kara had threatened Ralph at any point, he will become distressed and gives up their location immediately". See §8.

**D8. Connor in the squat (after Q35).** Q36 versus Q37 is not a Connor choice. It follows D7: THREATEN RALPH gives INFORMS, anything else gives KEEPS QUIET. On KEEPS QUIET the player explores Q38:
- CHECK UNDER THE STAIRS > SQUAT ANDROID ATTACKS CONNOR > AX400 AND CHILD ESCAPED > CONNOR PURSUES KARA. Ralph defended Kara; this matters in Battle for Detroit (§4).
- Don't find them > HANK COMMANDS CONNOR TO LEAVE > SQUAT ANDROID DISAPPEARS > KARA & ALICE UNDISCOVERED IN SQUAT. PowerPyx: "If you wait for a long time and don't find Kara & Alices' hideout, Hank will come in and order you to leave."
- The other clue nodes change nothing.

**D9. Motel morning (M2–M20).**
- TALK TO ALICE ("bath?" or "hungry?"; both Alice ↑).
- Then DRAW A BATH FOR ALICE (haircut) or go straight to EXPLORE MOTEL ROOM.
- After REMOVE LED: FINISH DRAWING BATH (skips the hub) or explore.
- CHANGE CHANNEL > ALICE HEARS ABOUT TODD: the TV report, with its public-opinion drop (§3, §6).
- CHEER ALICE UP: four dialogue options, all Alice ↑.
- Which TV report plays depends on Todd's fate in Stormy Night: an interview if Todd is alive, a murder report if he is dead.

**D10. Connor at the motel (M24).**
- FOLLOW HANK > HANK CHECKS MOTEL ROOM. Kara gets the street sneak (S1).
- CHECK THE DOOR > CONNOR PURSUES KARA. The chase starts immediately, with no sneak. PowerPyx commenter: "Instead of going to the stairs, head more to the right side. There you can see a blue door, which you can check." Kara page: "Connor may notice the door and give chase."
- The receptionist dialogue before this is Hank ↓ whatever is chosen.

**Q1. The street sneak (S2 > S3/S4).** This is stealth execution, with a choice of cover at each stop.
- SNEAK PAST POLICE FORCES > REACHED THE TRAIN SAFELY.
- SPOTTED BY POLICE > KARA & ALICE RUN AWAY > CONNOR PURSUES KARA.
- Reached from the car start (always) and from the motel start after FOLLOW HANK.

**D11. Connor's pursuit (H2).** This is Connor's effort, and the player decides it.
- Don't move > REACH FENCE TOO LATE (△) > KARA & ALICE VANISHED. PowerPyx: "simply don't move at all. The chase will fail about 30 seconds later".
- Run partway > REACH FENCE TOO LATE (group) > KARA & ALICE CROSSED THE HIGHWAY. PowerPyx: "run towards the first checkpoint, where the police officer leads you into the alley. Don't run any further and let them escape over the freeway."
- Run hard > REACH FENCE IN TIME > KARA & ALICE ARE AT THE HIGHWAY. PowerPyx: "Be quick enough to reach the fence, while Kara & Alice are just climbing it down."
- The wiki list prints "Reach Fence On Time" for the CROSSED branch. The chart prints REACH FENCE TOO LATE for both, so the wiki's wording is a typo.

**Q2. Kara, first lanes (H9/H10).** Played as Kara before Hank's order.
- ✓ KARA & ALICE REACH MIDDLE SECTION.
- ⊘ CAR HITS KARA & ALICE > DIED ON THE HIGHWAY. Wiki: "(not possible on "casual" difficulty)". PowerPyx: "[only on experienced difficulty] … Fail the QTE while crossing the first set of lanes."

**D12. Hank's order (H11 > H12/H13).** PowerPyx: "Press [X] GIVE UP" or "[O] GO".
- CONNOR OBEYS HANK'S ORDER: Hank ↑, Software Instability ↑, and The Nest's "Highway" dialogue. Then Q3.
- CONNOR PURSUES AX400: Hank ↓, Software Instability ↓. Then Q4.

**Q3. Kara, second lanes after obey (H14/H15).**
- ✓ GET TO THE OTHER SIDE > REACHED THE OTHER SIDE (copy 1).
- ⊘ CAR HITS KARA & ALICE > DIED. PowerPyx marks this "[only on experienced difficulty]"; the wiki doesn't.

**Q4. Connor, first lanes (H16/H17).**
- ✓ CONNOR REACHES MIDDLE SECTION > KARA & ALICE CROSS LAST SECTION > CONNOR CATCHES KARA > Q5.
- ✗ CAR HITS CONNOR (Connor destroyed) > Q6. PowerPyx: "Car hits Connor: Fail the QTE while crossing the first set of lanes."

**Q5. Kara fights Connor (H20/H21).**
- ✓ KARA LOSES CONNOR > Q5b.
- ⊘ CAR HITS KARA > DIED. PowerPyx: "[only on experienced difficulty] Car hits Kara: Fail the QTE with Kara fighting Connor."

**Q5b. Connor after losing the fight (H22/H23).** Played as Connor.
- CONNOR AVOIDS COLLISION > REACHED THE OTHER SIDE (copy 1).
- CONNOR HIT BY CAR (Connor destroyed) > REACHED THE OTHER SIDE (copy 2).

**Q6. Kara, second lanes after Connor is hit (H24/H25).**
- ✓ > REACHED THE OTHER SIDE (copy 2).
- ⊘ > DIED. Neither source marks this one as Experienced-only.

**Summary.**
- 12 decision points (D1–D12). The ones that change the story are D2, D3, D7, D8 (search), D9 (watching TV), D10, D11 and D12.
- D1 has no stated effect within the chapter. D4 and D5 are optional; D5 only unlocks an option.
- 7 execution checks (Q1–Q6, plus Q5b).
- Six of them are QTEs during the highway crossing. Four can kill Kara and Alice; two can destroy Connor.
- Q1 is a stealth sequence.

---

## 3. Numbers

- **Probabilities:** none. On_the_Run has no Probability table, and no source gives a percentage for any node: the sneak, the fence, the QTEs or Connor's collision.
- **Timers:**
  - "The chase will fail about 30 seconds later" if Connor doesn't move (PowerPyx, REACH FENCE TOO LATE 1/2).
  - Nothing else is quantified. "If you wait for a long time and don't find Kara & Alices' hideout, Hank will come in and order you to leave" (PowerPyx). "If you are a bit too slow, you will be spotted" (PowerPyx, street sneak).
- **Public opinion** (wiki On_the_Run, "Public Opinion" section): "Todd was killed or injured in [[Stormy Night]], Kara & Alice stay in motel in [[Fugitives]], Kara switches on the TV to the news report about Todd's death/injury. {{Icon|down}}". That is a **small decrease**.
  - Public_Opinion, Small Decrease: "Staying in the motel and seeing a news report TV about Kara's escape in [[On the Run]]."
  - Kara page: "Either outcome will lower [[Public Opinion]] of androids."
  - Todd_Williams mentions the drop only for the murder report: "Watching the news report will lead to a small decrease in public opinion on androids."
  - Public_Opinion notes: "Kara's actions can only decrease public opinion by a small amount with a total of four times."
- **Hank relationship** (On_the_Run, "Relationship Changes / Hank"; Relationship_Stat; all small):
  - "When Connor chooses any of the three dialogue choices ("rational", "diplomatic" or "direct") outside the hotel desk (unavoidable) {{Icon|down}}". Relationship_Stat, Small Decrease: "Any response to Hank asking Connor to wait in the car after interrogating the motel receptionist in [[On the Run]]."
  - "Connor gives up the chase after Hank orders him to {{Icon|up}}". Relationship_Stat, Small Increase: "Choosing "give up" when Hank orders Connor not to pursue Kara in On the Run."
  - "Connor chases Kara after Hank orders him not to {{Icon|down}}". Relationship_Stat, Small Decrease: "Choosing "go" when Hank orders Connor not to pursue Kara in On the Run."
  - Applied in the next chapter: The_Nest, "Relationship Changes / Hank": "Connor died in "[[On the Run]]" {{Icon|down}}".
- **Alice relationship** (On_the_Run, "Relationship Changes / Alice"; all small per Relationship_Stat):
  - "Choosing either "bath?" or "hungry?" after waking up in the motel. {{Icon|up}}"
  - "When Kara chooses any of the 4 options of dialogue ("moving", "determined", "comforting" or "supportive") in the motel after deciding what to do next. {{Icon|up}}"
  - "Kara stayed in the squat and initially refuses to sit down {{Icon|up}}". Relationship_Stat words it: "Choosing "refuse" twice when Ralph asks Kara and Alice to join him".
  - "Kara stayed in the squat and choose to "lie" to Ralph {{Icon|up}}"
  - "Kara stayed in the squat and choose to tell "truth" to Ralph {{Icon|down}}"
  - The car start has none.
- **Software instability** (On_the_Run; Software_Instability):
  - "Connor gives up the chase after Hank orders him to {{Icon|up}}". Software_Instability, Small Increase: "Choosing "give up" when Hank orders Connor not to pursue Kara in On the Run."
  - "Connor chases Kara after Hank orders him not to {{Icon|down}}". Small Decrease: "Choosing "go" ...".
  - "Connor dies {{Icon|down}}". Small Decrease: "Being killed while crossing the road when pursuing Kara in On the Run."
- **Choices with no stated number:**
  - Hair colour, clothes, the gun, STEAL MONEY, FIND CORPSE, AGREE TO SIT, DISCUSS CORPSE, TRY TO CONVINCE, THREATEN RALPH.
  - CHECK THE DOOR versus FOLLOW HANK, the squat search, fence timing.
  - Every QTE outcome except Connor's death.
- **Amanda:** no wiki source gives an Amanda change in this chapter.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Fugitives shelter.** This picks the start row.
  - Motel: "Check Motel - the motel requires money to stay at"; "Steal Clothes - required to stay in the motel".
  - Squat: "{{Icon|impact}} Meet [[Ralph]] - important for later", by convincing him or threatening him with the gun.
  - Car: either chosen ("Break Into Car > Stay"), or forced: "Alice too Cold ... leads to Alice & Kara Stayed in Abandoned Car".
- **Fugitives laundromat clothes** ("{{Icon|impact}} Wear Clothes"). They remove TRY TO OPEN CAR TRUNK and the crowbar (car), and CHANGE CLOTHES with its gun pair (squat). Wiki note: "If Kara successfully stole the clothes in the laundromat from [[Fugitives]] she will not have the option to change her clothes if she stayed in the squat or abandoned car."
- **Stormy Night gun.** It is needed for TAKE GUN BACK / FORGOT GUN and for the gun version of THREATEN RALPH. Stormy Night: "Kara takes the gun / Gun is available in [[Fugitives]] / If Kara and Alice stay in the house in [[Fugitives]], the gun can be used in [[On the Run]]".
- **Stormy Night, Todd's fate.** It decides which motel TV report plays.
  - Todd_Williams: "If alive, he will be seen on television in the [[Eastern Motel]] being interviewed by [[Joss Douglas]] ... He claims that [[Kara]] assaulted him for no reason. He mentions nothing about [[Alice]] missing."
  - "If he was killed, [[Joss Douglas]] will report that Todd was murdered by an [[AX400]] and police are conducting a search for the android."
  - Alice page: "Alice is never mentioned in stories about Kara's case on TV or in magazines".
- **Waiting for Hank.** The chapter needs Kara alive (Hank Got a Lead). With Kara dead, Connor goes straight from Waiting for Hank to The Nest's lunch (Hank_Anderson).
- **Fugitives Ralph threat.** Whether a gun threat in Fugitives counts for SQUAT DEVIANT INFORMS ON AX400 is unclear (§8).

### Out of this chapter

- **Ralph.**
  - The wiki note: "The only way to have Ralph reappear in [[Battle for Detroit]] is for Connor to find Kara and Alice in the Squat and have Ralph defend Kara." That means CHECK UNDER THE STAIRS > SQUAT ANDROID ATTACKS CONNOR.
  - Battle for Detroit (Kara): "Talk to Ralph (if Ralph attacked Connor in On The Run)"; "OR Ralph Intervenes (if Luther is dead, Kara stayed in the Squat, and Ralph is alive)".
  - Ralph page on the threat path: "If Kara threatened Ralph, he will freak out ... From here, Ralph will disappear from the story entirely and not reappear again in Battle for Detroit - Kara Captured."
- **Connor pursued Kara.**
  - Jericho: "Read ''[[Android on the Run!|On the Run]]'' (found on bench in station) - only appears if [[Kara]] and [[Alice]] were pursued by [[Connor]] in [[On the Run]]". Otherwise "''[[CyberLife's 'Fortune Teller' Computer|Fortune Teller]]''".
  - Zlatko: "Turning on the TV if [[Kara]] was chased by [[Connor]] in [[On the Run]] {{Icon|down}}" (public opinion). Also "See Newsflash of Escape (If Kara either robbed the supermarket in [[Fugitives]] or ran from the police in [[On the Run]])".
  - Zlatko magazines: "Read ''How Androids Alter Your Brain'' (If Connor chased Kara in On the Run)" and "Read ''AX400 on the Run'' (If Kara evaded the police in On the Run)". The AX400_Getaway page agrees: "Only spawns if Kara slept in the abandoned car or the motel ... then made it past the police without being seen". But the article itself describes a pursuit. See §8.
  - Zlatko's flashbacks: "Recall Squat Fireplace (If Kara chose to stay in the squat in [[Fugitives]])".
- **Connor obeyed Hank.** The_Nest: "If Connor had chosen to obey Hank's order to stay behind the fence in [[On the Run]], the "Highway" dialogue option will be unlocked."
- **Connor died** (CAR HITS CONNOR or CONNOR HIT BY CAR):
  - The_Nest: "Hank Insults Connor (leads to In the Elevator - only available if Connor died in On the Run)".
  - "Analyze Environment ... only available if Connor didn't die in On the Run".
  - "Talk to Hank ... only available if Connor didn't die".
  - Hank ↓ at the start of The Nest. Software instability ↓ in this chapter.
- **Kara and Alice died** (KARA & ALICE DIED ON THE HIGHWAY). Kara's storyline ends. Hank's distraught scene plays, with Connor present only if he obeyed (wiki note).
- **Hair colour** (padlock) is a persistent appearance change. Kara page: "Brown (changeable to Blonde, White or Black)". No later wiki page names a choice it gates.
- **Clothes** (padlock): "{{Icon|impact}} Find Some Clothes - important for later" (car). Kara page: "if she stays in the abandoned car but does not take the jacket, she can remain in her uniform until after "Zlatko"". Zlatko note: "If Kara still has her uniform and has her memory erased, her name will not show up on her uniform until she regains her memory."
- **Gun.** TAKE GUN BACK keeps it. The sources state no later use beyond this chapter's threat. Check Battle for Detroit; see §8.
- **Watching the motel TV:** public opinion small decrease (§3).

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| REACHED THE TRAIN SAFELY | none | Car start, or motel start with FOLLOW HANK > HANK CHECKS MOTEL ROOM; then WALK TOWARD TRAIN STATION > SNEAK PAST POLICE FORCES. No chase. |
| KARA & ALICE UNDISCOVERED IN SQUAT | none | Squat start, Ralph not threatened (SQUAT ANDROID KEEPS QUIET), Connor never checks under the stairs > HANK COMMANDS CONNOR TO LEAVE (or the unlabelled Q46) > SQUAT ANDROID DISAPPEARS. No chase; Ralph doesn't defend Kara. |
| KARA & ALICE VANISHED | none | Any chase; Connor doesn't move > REACH FENCE TOO LATE (△). |
| KARA & ALICE CROSSED THE HIGHWAY | none | Any chase; Connor runs only partway > REACH FENCE TOO LATE (group). |
| KARA & ALICE REACHED THE OTHER SIDE (copy 1) | none | REACH FENCE IN TIME > REACH MIDDLE SECTION, then either OBEYS > GET TO THE OTHER SIDE, or PURSUES > REACHES MIDDLE SECTION > CATCHES KARA > KARA LOSES CONNOR > CONNOR AVOIDS COLLISION. Connor survives. |
| KARA & ALICE REACHED THE OTHER SIDE (copy 2) | none | PURSUES AX400, then either CAR HITS CONNOR > GET TO THE OTHER SIDE, or ... KARA LOSES CONNOR > CONNOR HIT BY CAR. Connor is destroyed and replaced. |
| KARA & ALICE DIED ON THE HIGHWAY | yellow no-entry | Any of CAR HITS KARA & ALICE (first lanes, before Hank's order; obey path second lanes; after Connor is hit) or CAR HITS KARA (the fight with Connor). Kara's storyline ends. Connor survives unless he was also hit. |

Kara and Alice survive in six of the seven endings. Connor can die only in REACHED THE OTHER SIDE (copy 2) and in the DIED ON THE HIGHWAY path that goes through CAR HITS CONNOR. There is no ending where Kara and Alice are caught or arrested. Unused content: "Files mention that at one point, it was originally possible for Kara and Alice to get arrested in this chapter ... it seems that this idea was short lived." There is also no ending where only one of Kara or Alice dies.

On Casual, the first-lane death is impossible (wiki and PowerPyx). Per PowerPyx, so are the obey-path second-lane death and the fight death. A PowerPyx commenter disputes the second-lane case: "I was able to get Kara and Alice run over in the second lane on normal difficulty". See §8.

---

## 6. Media

- **Detroit Today #31, "Cyber-Wildlife"** (wiki Magazine table: `|#31 |[[Detroit Today]] |"[[Cyber-Wildlife]]" |[[On the Run]]`). It is in every row: car "in front of the car", motel "in front of the television", squat "on the same side of the squat that Alice sleeps". Cover lines: "First android zoo opens", "US life expectancy now 91", "0.4% of world population holds 94% of global wealth". Story: "[[CyberLife]] is set to open the first android zoo in Los Angeles, which will exhibit all exotic species to have become extinct in the last thirty years." The animals listed are "Lute turtles, polar bears, mountain gorillas, African elephants and several species of tiger". CSR spokeswoman Danielle Carnegie says it "caters to people of all ages". CyberLife promises they will be "more real than the real thing". No public-opinion effect.
- **Canada, "Canada Still Android-Free Zone"** (Magazine table: `|N/A |[[Canada (magazine)|Canada]] |"[[Canada Still Android-Free Zone]]" |[[On the Run]]`). It is in the same three locations. "Canada: where the air is clean and the welcome is always warm." "Despite the United States voting in its Android Act as early as 2028, the Canadian parliament has yet again pushed back its decision on whether to permit androids in the country. As a result, androids are still not sold in Canada and have no official status in the country." "With androids continuing to fuel unprecedented growth in the US economy, yet contributing to record levels of unemployment, the arguments for and against ... rages on." No effect.
- **Motel TV (CHANGE CHANNEL > ALICE HEARS ABOUT TODD).** Joss Douglas reports.
  - Todd alive: an interview at Todd's house; Todd "claims that [[Kara]] assaulted him for no reason. He mentions nothing about [[Alice]] missing." Alice page: he says he was "minding his own business when his android attacked him".
  - Todd dead: "Todd was murdered by an AX400 and police are conducting a search for the android."
  - Public opinion small decrease (§3). Alice's reaction: if Todd is dead she "will try to cheer her up by telling her he would have killed her"; if Todd is alive she "will instead become angry that Todd is lying".
- **READ LEAFLET (squat kitchen trash can).** It is on the chart, but no wiki page gives its contents. It isn't in the Magazine table.
- Downstream media driven by this chapter: Jericho's "Android on the Run!" or "Fortune Teller", and Zlatko's magazines and TV (§4).

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has four chapter-13 scenes, in this order: R13 (media), K09 (execution-policy), C09a (decision), C09 (decision). Gates are at `benchmark/story-engine.mjs` lines 83–85, consequences at lines 203–206, and the media predicates `motelToddDead` / `motelToddAlive` / `chase` / `noChase` at lines 31–32.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| MORNING IN PARKING LOT … LEAVE THE PARKING LOT (P1–P20), including hair and FIND SOME CLOTHES | none | **Missing.** No car-morning scene. The clothes impact (`s.clothes`) is never set here, so a car-start Kara who takes the jacket isn't recorded. |
| CONNOR INVESTIGATES SUPERMARKET / POLICE DON'T HAVE A LEAD | none | Missing as an event. Acceptable as narration. |
| MORNING IN MOTEL … LOOK FOR BREAKFAST (M1–M20) | R13 (magazines + TV) | Partly covered as media only. **Missing:** TALK TO ALICE dialogue (Alice ↑), bath versus explore, hair, CHEER ALICE UP (Alice ↑ on all four options). The engine applies no Alice change in this chapter. |
| CHANGE CHANNEL > ALICE HEARS ABOUT TODD | R13 TV items with `publicSupport: -1` | Effect covered. **Wrong fact:** the Todd-dead item says "a police search now under way for the android **and a child**". The wiki says the search is "for the android", and the Alice page says "Alice is never mentioned in stories about Kara's case on TV". |
| READ "CYBER-WILDLIFE" / READ "ANDROID AND CANADA" | R13 magazines | Covered. Minor: "android zoos" should be one zoo, in Los Angeles; the cover lines aren't included. |
| READ LEAFLET (squat) | none | Missing; its contents are unknown. |
| CONNOR INVESTIGATES THE MOTEL, INTERROGATE RECEPTIONIST, FOLLOW HANK | none | **Missing.** The unavoidable Hank ↓ (receptionist dialogue) is never applied. |
| CHECK THE DOOR > CONNOR PURSUES KARA | none | **Missing Connor decision.** At the motel, the chase can start from Connor's choice without any sneak. In the benchmark the motel and car paths only reach the chase through K09's risk roll. |
| KARA & ALICE IN THE STREET > WALK TOWARD TRAIN STATION > SNEAK / SPOTTED | K09 (options: careful, risk 0.2; no attempt, risk 0.25) | Partly covered. The chart's outcome pair matches (`chase` true or false). Problems: (a) no source backs the risk values (§3); (b) K09's situation says "{{Todd}} has reported you and the news is calling you a kidnapper". Todd reports nothing if dead, and no report mentions Alice. |
| K09 option 1 failure (`kara=false, alice=false`, "ran into freeway traffic and were killed") | engine line 204 | **No chart path.** Spotted > RUN AWAY > CONNOR PURSUES KARA always comes first. A highway death needs REACH FENCE IN TIME and then a failed crossing QTE. Also, this failure sets `chase=true` while Kara is dead. C09 is gated only on `s.chase` (line 85), and the Connor-scene guard (line 61) checks only `s.connor`. So C09 still appears, and its outcome text says Kara and Alice "escape". |
| MORNING IN SQUAT … GO DOWNSTAIRS (Q1–Q18), CHANGE CLOTHES, FORGOT GUN / TAKE GUN BACK | none | **Missing.** None of the squat-morning scene is represented: hair, clothes, gun, corpse or money. |
| POLICE ARRIVES … DISTURBED BY CONNOR (Q22–Q32): family meal, AGREE / REFUSE TO SIT, DISCUSS CORPSE / TRY TO CONVINCE / THREATEN RALPH | partly folded into K07b (Fugitives), which mentions "a dead rodent he caught for her dinner"; K07b option 2 "Pull the gun on him" sets `ralphHostile` | **Mislabelled and misplaced.** The chart's threat that makes Ralph inform comes at the On the Run table (THREATEN RALPH), not in Fugitives. In this chapter it doesn't need the gun (the knife; Ralph page). K07b option 2 requires `s.gun` (engine line 151). The Alice ↑/↓ of refuse / lie / truth are missing. |
| ENTER SQUAT > INTERROGATE > SQUAT DEVIANT INFORMS ON AX400 | C09a when `ralphHostile`: the event "{{Ralph}} tells {{Connor}} they are upstairs" | Effect covered. But C09a still offers both options on the hostile path, and its situation says Ralph "swears nobody else is here", which contradicts INFORMS. On this path it should be an event, not a decision. Also "upstairs" is wrong: they "ran out the back door" (Ralph page). |
| SQUAT ANDROID KEEPS QUIET > INVESTIGATE SQUAT GROUND FLOOR > CHECK UNDER THE STAIRS > SQUAT ANDROID ATTACKS CONNOR > AX400 AND CHILD ESCAPED | C09a option 0, "Push past him and search upstairs" (risk 0.2); sets `ralphDefended` | **Mislabelled.** The hiding place is under the stairs. CHECK UPSTAIRS is a dead-end clue ("Ralph declines and Connor believes him"). The situation's "You can hear something upstairs" is wrong too. **The 0.2 risk has no chart basis:** finding them always gives SQUAT ANDROID ATTACKS CONNOR > AX400 AND CHILD ESCAPED, and there's no failure node. The failure text "slashes Connor and throws him down the stairs ... fled out of the window" and its `amanda(-1)` are unsourced. |
| HANK COMMANDS CONNOR TO LEAVE > SQUAT ANDROID DISAPPEARS > KARA & ALICE UNDISCOVERED IN SQUAT | C09a option 1, "Take {{Hank}}'s word for it and leave" | Covered in effect. The game reaches it by not finding them, not by choosing to leave; the unlabelled Q46 may be a voluntary exit (§8). |
| CONNOR PURSUES KARA > RUN TOWARD THEIR LAST KNOWN POSITION > REACH FENCE TOO LATE > KARA & ALICE VANISHED / CROSSED THE HIGHWAY | none | **Missing Connor decision and two endings.** C09 always assumes REACH FENCE IN TIME. |
| KARA & ALICE ARE AT THE HIGHWAY > REACH MIDDLE SECTION / CAR HITS KARA & ALICE (first lanes) | none | **Missing.** Kara's first-lane crossing, and its death before Hank's order (Experienced only), aren't modelled. There's no Kara scene at the highway at all. |
| HANK ORDERS CONNOR NOT TO GO > OBEYS / PURSUES AX400 | C09 options 0 and 1 | Covered. Stat changes: option 0 is `hank(1); si(1)`, option 1 is `hank(-1); si(-1)`, which match the wiki. `amanda(-1)` / `amanda(+1)` are unsourced. |
| OBEYS > GET TO THE OTHER SIDE / CAR HITS KARA & ALICE (second lanes) | C09 option 0, always "make it across" | **Missing the Kara death branch** (Experienced only per PowerPyx; disputed). |
| PURSUES > CONNOR REACHES MIDDLE SECTION / CAR HITS CONNOR | C09 option 1 risk 0.35; failure = `connorDies`, "hit by a truck in the second lane" | Partly covered. The chart's CAR HITS CONNOR is the **first** set of lanes (PowerPyx). A second Connor-death node, CONNOR HIT BY CAR, comes after the fight. No source backs 0.35. `connorDies` applies `si(-1)` (matches the wiki) and `hank(-1)` (the wiki puts this at the start of The Nest; the effect is the same if applied here) and `amanda(-1)` (unsourced). |
| CROSS LAST SECTION > CONNOR CATCHES KARA > KARA LOSES CONNOR / CAR HITS KARA > CONNOR AVOIDS COLLISION / CONNOR HIT BY CAR | C09 option 1 success: "nearly has them, but ... make it across" | **Missing.** The fight, the Kara death at the fight (Experienced only), and Connor's second death chance are absent. |
| CAR HITS CONNOR > GET TO THE OTHER SIDE / CAR HITS KARA & ALICE | none (the fail text always says Kara escapes) | **Missing Kara death branch.** It isn't marked Experienced-only in any source. |
| REACHED THE OTHER SIDE copy 1 / copy 2, DIED ON THE HIGHWAY | not distinguished; `karaOutcome` only from K09 | **Missing.** Copy 1 versus copy 2 is captured indirectly by `connorDeaths`. DIED ON THE HIGHWAY isn't reachable from C09. |

### Downstream consistency

- **R14 (Jericho):** "Android on the Run" when `chase`, "Fortune Teller" when `noChase`. Matches the wiki.
- **R17 (Zlatko):**
  - The TV "news flash about you" when `chase`, with `publicSupport: -1`. Matches.
  - Its magazines are the **reverse of the wiki's Zlatko list**: "AX400 Getaway" when `chase` and "How Androids Alter Your Brain" when `noChase`. The wiki's Zlatko page and the AX400_Getaway page tie AX400 Getaway to *evading* the police, but that article's text describes a pursuit. Flagged in §8; not changed here.
- **The Nest:** the "Highway" dialogue (obey) and "Hank Insults Connor" (Connor died here) aren't modelled. A grep of the engine finds no use of `C09`'s choice outside line 206.
- **K28 (camp, Ralph option):** gated on `s.ralph && s.ralphDefended && !s.ralphHostile`. This matches the wiki's "Ralph attacked Connor" condition.
- **Fugitives K07 option 2:** applies `alice(-2)` for the car. That's outside this chapter, but no wiki line gives it.
- **No state is kept** for hair colour, the car jacket, TAKE GUN BACK versus FORGOT GUN, or STEAL MONEY.

---

## 8. Open questions

1. **The unlabelled node Q46.** It sits between INVESTIGATE SQUAT GROUND FLOOR and SQUAT ANDROID DISAPPEARS: a red-padlock `[...]` on the zoomed screenshot, and reddish and unreadable on the 100% overview. The wiki's Flowchart list doesn't have it. It may be Connor choosing to leave the squat himself, rather than Hank ordering him out. What is the label, and is it a Connor decision?
2. **What makes Ralph inform.** PowerPyx says it is THREATEN RALPH at the table ("a few seconds back"). The Kara page says "if Kara had threatened Ralph at any point". Does a gun threat in Fugitives ("Threaten With Gun") also produce SQUAT DEVIANT INFORMS ON AX400 if Kara is kind at the table?
3. **THREATEN RALPH without the gun.** PowerPyx says "If you have your gun on you". The Ralph page says the table knife is used if she has no gun or forgot it. Is THREATEN RALPH always available?
4. **Is CHANGE CHANNEL avoidable?** The chart shows no edge around it, but the Kara page says "Kara can change the channels". If it is unavoidable, the motel start always costs public opinion. Also, which report lowers opinion: both (On_the_Run "killed or injured"; Kara page "Either outcome") or only the murder report (Todd_Williams)?
5. **Skipping the bath.** TALK TO ALICE has an edge straight to EXPLORE MOTEL ROOM. Can Kara leave the motel without cutting her hair or removing her LED? The hair group sits only under DRAW A BATH FOR ALICE.
6. **Difficulty and the highway deaths.**
   - The wiki marks only the first-lane death as Casual-impossible.
   - PowerPyx also marks the obey-path second-lane death and the fight death as Experienced-only.
   - Neither source marks the second-lane death after CAR HITS CONNOR.
   - A PowerPyx commenter says the second-lane death happens on normal.
   
   The benchmark has to choose a difficulty, as in ch07.
7. **The two REACH FENCE TOO LATE nodes.** Confirm in game that standing still gives VANISHED and a partial run gives CROSSED THE HIGHWAY (from PowerPyx's "1/2" and "2/2"). The wiki's "Reach Fence On Time > Crossed the Highway" looks like a typo.
8. **Zlatko magazines.** The AX400 Getaway article describes a pursuit ("An android was pursued through a Detroit suburb"). But both the Zlatko page and the AX400_Getaway page say it spawns only if Kara "made it past the police without being seen". The engine (R17) does the opposite. Which is right?
9. **Do VANISHED and CROSSED THE HIGHWAY count as "pursued by Connor"** for Jericho's magazine and Zlatko's TV drop? They start at CONNOR PURSUES KARA, so presumably yes.
10. **Hank ↓ for Connor's death.** It is listed under The Nest, not On the Run. Is it applied when the new Connor meets Hank? The engine applies it inside `connorDies` straight away.
11. **"lie" / "truth" with Ralph.** Where does this dialogue sit relative to AGREE / REFUSE TO SIT? It isn't on the chart.
12. **Does STEAL MONEY or TAKE GUN BACK have any later use?** The unused-content note suggests the money was cut. No later chapter page mentions the squat gun again. Check Battle for Detroit (Kara) for any gun option that depends on TAKE GUN BACK versus FORGOT GUN.
13. **Hair colour impact.** The chart marks it as cross-chapter, but no wiki page names a later gate. Is it cosmetic only?
14. **Labels that were only inferred:** CONNOR INVESTIGATES SUPERMARKET and POLICE DON'T HAVE A LEAD. No zoomed screenshot covers them. Also check whether the parking-lot Connor sequence is playable or a cutscene; the infobox says Connor is playable only for the squat, the motel or if Kara is spotted.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter link)
- https://www.powerpyx.com/detroit-become-human-on-the-run-walkthrough-100/ (walkthrough text; input for each node; Experienced-only notes; the ~30-second chase timeout; GIVE UP / GO buttons; Check Gun; the stairs hiding spot; commenters on the second-lane death and the motel door)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-flowchart-100.jpg (full chart, credited to Sitron; layout, box counts, 7 ending tiles; labels illegible)
- https://www.powerpyx.com/wp-content/uploads/detroit-on-the-run-explore-lot.jpg (parking-lot labels P1–P20; taken at 78%)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-3.jpg (MORNING IN MOTEL, TALK TO ALICE, DRAW A BATH, motel hair group, MORNING IN SQUAT, EXPLORE SQUAT, start of squat hair and CHANGE CLOTHES)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-4.jpg (motel REMOVE LED, FINISH DRAWING BATH, EXPLORE MOTEL ROOM hub, CHANGE CHANNEL, ALICE HEARS ABOUT TODD; squat REMOVE LED, FIND CORPSE IN BATHTUB, GO DOWNSTAIRS, FORGOT GUN / TAKE GUN BACK, POLICE ARRIVES)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-5.jpg (CHEER ALICE UP with dialogue icon, LOOK FOR BREAKFAST, KARA SPOTS POLICE FORCES, CONNOR INVESTIGATES THE MOTEL; RALPH WANTS A FAMILY MEAL through RALPH APOLOGIZES, RALPH THREATENS ALICE)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-6.jpg (INTERROGATE RECEPTIONIST, FOLLOW HANK, HANK CHECKS MOTEL ROOM, CHECK THE DOOR, KARA & ALICE IN THE STREET)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-on-the-run-7.jpg (street: WALK TOWARD TRAIN STATION, SNEAK / SPOTTED, REACHED THE TRAIN SAFELY, KARA & ALICE RUN AWAY)
- https://www.powerpyx.com/wp-content/uploads/detroit-on-the-run-middle-before-chase.jpg (street section and the edges into CONNOR PURSUES KARA)
- https://www.powerpyx.com/wp-content/uploads/detroit-ontherun-squat-branch-explore.jpg (EXPLORE SQUAT hub with LOOK AT RALPH'S STUFF > STEAL MONEY, GO UPSTAIRS split)
- https://www.powerpyx.com/wp-content/uploads/detroit-ontherun-squat-branch-police.jpg (POLICE ARRIVES through DISTURBED BY CONNOR, with edges)
- https://www.powerpyx.com/wp-content/uploads/detroit-ontherun-squat-branch-connor-investigation.jpg (Connor squat: ENTER SQUAT through KARA & ALICE UNDISCOVERED IN SQUAT; the `[...]` node Q46)
- https://www.powerpyx.com/wp-content/uploads/detroit-ontherun-pursuit-branch-a.jpg (CONNOR PURSUES KARA through HANK ORDERS / OBEYS / PURSUES; VANISHED, AT THE HIGHWAY, CROSSED THE HIGHWAY)
- https://www.powerpyx.com/wp-content/uploads/detroit-ontherun-pursuit-branch-b.jpg (the rest of the highway: QTE pairs, CONNOR CATCHES KARA, two REACHED THE OTHER SIDE tiles, DIED ON THE HIGHWAY with yellow no-entry)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Public Opinion, Relationship Changes, Software Instability, Notes, Unused Content; saved as /tmp/flowcharts/ch13/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (Hank and Alice changes, with small or large magnitudes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (give up ↑, go ↓, death ↓, all small)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (motel TV small decrease; Zlatko TV after the chase)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (#31 Cyber-Wildlife, Canada magazine; Jericho and Zlatko issues)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Cyber-Wildlife&prop=wikitext&format=json (article text and locations)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Canada_Still_Android-Free_Zone&prop=wikitext&format=json (article text and locations)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Ralph&prop=wikitext&format=json (meal, knife threat, hiding under the stairs, informing, Battle for Detroit consequences)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Abandoned_house&prop=wikitext&format=json (squat sequence)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (per-shelter chapter summary; both TV reports lower opinion; uniform until Zlatko)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (Alice never mentioned on TV; her reaction to the reports)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Todd_Williams&prop=wikitext&format=json (TV interview or murder report)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Joss_Douglas&prop=wikitext&format=json (the reporter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Joseph_Sheldon&prop=wikitext&format=json (motel receptionist scene)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Eastern_Motel&prop=wikitext&format=json (location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Isaac_Falone&prop=wikitext&format=json (Hank's lead on the squat path)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json (fence scene and Hank's reactions)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json (shelter, clothes and gun gates into this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json ("Highway" dialogue; Connor-died branches; Hank ↓)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json (Android on the Run! or Fortune Teller)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json (magazine and TV conditions after this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=AX400_Getaway&prop=wikitext&format=json (article text versus spawn condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_on_the_Run!&prop=wikitext&format=json (Jericho article; pursued condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=How_Androids_Alter_Your_Brain&prop=wikitext&format=json (Zlatko article)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Kara_Leaving_Detroit&prop=wikitext&format=json (Ralph in the camp)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json (chapter order)
- https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-13-on-the-run and https://www.gamepressure.com/detroitbecomehuman/on-the-run/z8d6e3 (tried in order to name Q46; one returned 404 and the other was a stub, so neither was used)
- https://detroitbecometext.github.io/chapters/13 (transcript linked from the wiki; a JavaScript app, not used)

---

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/13-on-the-run-chapter-content/on-the-run-chapter-content.component.html (downloaded to `/tmp/dbt/tpl916/ch13.html`).
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json (`/tmp/dbt/en.json`). Every `t()` / `translateObject()` key in the template resolved; none was missing.
- Renderer: `/tmp/dbt/render916.py` (outline at `/tmp/dbt/ch13.txt`; the same outline with every dialogue line is `/tmp/dbt/ch13-dialogue.txt`).
- **One template covers both characters.** There is only one ch13 file in the repository tree. It has five top-level sections: "Kara stayed at the Parking lot", "Kara stayed at the Squat" (Kara's meal and Connor's search), "Kara stayed at the Motel" (Kara's morning and Connor at the desk), "Kara and Alice in the street" and "Connor pursues Kara".
- Counts:
  - 13 prompts (choice groups). One of them is inside a cut block, so 12 are live.
  - 43 options, 39 of them live.
  - 3 clues (observation items), 0 case files.
  - 11 arrows: 9 Alice, 2 Public opinion. There are no Hank, Software instability or Amanda arrows anywhere in the template.
  - 3 unlock conditions, all `Lock`.
  - 7 condition groups (14 variants).
  - 2 cut blocks.
- `ø` in the outline is the template's own marker for an option with no line of dialogue.

### Rendered outline

```text
# Kara stayed at the Parking lot
NOTE: NOV 6TH, 2038
NOTE: AM 10:25
## The police are outside the supermarket
CONDITION GROUP:
  VARIANT:
    NOTE: Kara and Alice reach the train station unnoticed
# Kara stayed at the Squat
## The police are outside the supermarket
CONDITION GROUP:
  VARIANT:
    NOTE: Kara stole wire cutters from the supermarket in
    NOTE: Fugitives
  VARIANT:
    NOTE: Kara didn't steal the wire cutters
## In the squat with Ralph
PROMPT (choice group):
  OPTION "SIT"
    NOTE: ø
  OPTION "REFUSE"
    PROMPT (choice group):
      OPTION "SIT"
        NOTE: ø
      OPTION "REFUSE"
        ARROW: Alice SmallUp
PROMPT (choice group):
  OPTION "[CHECK GUN]"
    CONDITION (Lock): Took the gun in Stormy Night and didn't forget it upstairs
    NOTE: ø
  OPTION "WORRIED"
  OPTION "EXPLAIN"
  OPTION "AGREE"
PROMPT (choice group):
  OPTION "LIE"
    ARROW: Alice SmallUp
  OPTION "TRUTH"
    ARROW: Alice SmallDown
PROMPT (choice group):
  OPTION "[ASK ABOUT CORPSE]"
    CONDITION (Lock): Saw the body in the bathroom
  OPTION "[INSIST ABOUT CORPSE]"
    CONDITION (Lock): Asked about corpse
  OPTION "THREATEN"
    CONDITION GROUP:
      VARIANT:
        NOTE: No gun : Kara takes a knife
      VARIANT:
        NOTE: Kara has a gun : Kara threatens Ralph with the gun
  OPTION "BLUFF"
  OPTION "FAMILY"
## Connor investigates the squat
CONDITION GROUP:
  VARIANT:
    NOTE: Kara was nice with Ralph
    OBSERVATION GROUP "Scan Ralph":
      CLUE: PROCESSING LED | Signs of software instability | Probability of self-destruction: Moderate
      CLUE: MODEL WR600 - Gardener | Serial#: 021 753 034 | Status: REPORTED MISSING
      CLUE: BURN MARK | Irreversible skin damage | Probable cause: Extreme heat
    PROMPT (choice group):
      OPTION "AX400"
      OPTION "DEVIANTS"
      OPTION "REASSURE"
      OPTION "BLUE BLOOD"
    ### Connor finds Kara
    NOTE: Leads to
    NOTE: Connor pursues Kara
    NOTE: .
  VARIANT:
    NOTE: Kara threatened Ralph
    PROMPT (choice group):
      OPTION "AX400"
      OPTION "DEVIANTS"
      OPTION "REASSURE"
      OPTION "BLUE BLOOD"
      OPTION "PRESSURIZE"
    NOTE: Leads to
    NOTE: Connor pursues Kara
    NOTE: .
### Go upstairs
CUT/UNUSED CONTENT:
### Take too much time
### Taking too much time again
# Kara stayed at the Motel
PROMPT (choice group):
  OPTION "BATH?"
    ARROW: Alice SmallUp
  OPTION "HUNGRY?"
    ARROW: Alice SmallUp
  OPTION "TIRED?"
## Watch TV
CONDITION GROUP:
  VARIANT:
    NOTE: Todd was killed in
    NOTE: Stormy Night
    ARROW: Public opinion SmallDown
    CONDITION GROUP:
      VARIANT:
        NOTE: Kara shot Todd
      VARIANT:
        NOTE: Alice shot Todd
  VARIANT:
    NOTE: Todd is alive
    ARROW: Public opinion SmallDown
CUT/UNUSED CONTENT:
  PROMPT (choice group):
    OPTION "REASSURING"
    OPTION "ANALYTICAL"
    OPTION "VULNERABLE"
    OPTION "SINCERE"
PROMPT (choice group):
  OPTION "CAN'T STAY HERE"
  OPTION "FAMILY"
  OPTION "CONTACT ANDROID"
PROMPT (choice group):
  OPTION "MOVING"
    ARROW: Alice SmallUp
  OPTION "DETERMINED"
    ARROW: Alice SmallUp
  OPTION "COMFORTING"
    ARROW: Alice SmallUp
  OPTION "SUPPORTIVE"
    ARROW: Alice SmallUp
## Police is at the motel
PROMPT (choice group):
  OPTION "RATIONAL"
  OPTION "DIPLOMATIC"
  OPTION "DIRECT"
### Go into the room
# Kara and Alice in the street
## Spotted by Police
# Connor pursues Kara
## Take too much time
## Reach the fence
PROMPT (choice group):
  OPTION "GO"
    CONDITION GROUP:
      VARIANT:
        NOTE: Connor dies on the highway
      VARIANT:
        NOTE: Kara gets hit by a car
      VARIANT:
        NOTE: Kara escapes and Connor survives
  OPTION "GIVE UP"
    NOTE: ø
```

Flowchart strings for this chapter (`MENU.FLOWCHART.04K.*`, the game's labels). They agree with the §1 labels, with these points to note:

- Both `CONNOR INVESTIGATES THE SQUAT` (`SQUAT.C.INVESTIGATE01`) and `CONNOR INVESTIGATES SQUAT` (`CONNOR.SQUAT`) exist.
- `POLICE DON’T HAVE A LEAD` and `CONNOR OBEYS HANK’S ORDER` use a typographic apostrophe.
- Strings that are not on the §1 chart (candidates for hidden nodes, or for nodes that were cut):
  - `KARA CHANGED HAIR COLOR` and `KARA CHANGED CLOTHES`.
  - `FIND CORPSE`.
  - **`LEAVE THE SQUAT` (`SQUAT.C.LEAVE`)**.
  - Nine street sneak steps: `AVOID COPS IN FRONT OF THE SQUAT`, `CROSS THE STREET TO THE MOTEL`, `AVOID COPS IN FRONT OF THE MOTEL`, `CROSS THE STREET TO THE COFFEE SHOP`, `HIDE FROM COPS NEAR LAUNDROMAT`, `CROSS THE STREET TO GO NEAR THE BANK`, `HIDE USING AN UMBRELLA`, `HIDE IN THE PAWN SHOP`, plus `SNEAK PAST POLICE FORCES`.
  - `KARA & ALICE CROSS FIRST SECTION OF HIGHWAY` and `CONNOR STARTS TO CLIMB THE FENCE`.
  - `CAR APPROACHES CONNOR`, `CONNOR IS DEAD` and `KARA IS DEAD`.

`en.json` also has two Connor scan strings that the template does not place: `MENU.OBSERVATION.04K.MP.STRESS` (STRESS | Emotion Engine: Activated | Status: Abnormal variations) and `MP.KARABLOOD` (MODEL UNDETERMINED | Serial#: Unknown (corrupted data) | Status: Wounded).

### Discrepancies with sections 1 to 3

Rule (README): the template wins for labels, prompts, arrows and clue text, the flowchart image for node order, and the wiki only where the template is silent. Where the template has a prompt but no arrow and the wiki states one, the rule gives the template. These cases are marked **(arrow conflict)** and should be checked in game, because a transcriber omission cannot be ruled out.

1. **Motel wake-up prompt (§1 "Interactions", §3 Alice).**
   - Note: two options, "bath?" and "hungry?", both Alice ↑.
   - Template: three options, `BATH?` (Alice SmallUp), `HUNGRY?` (Alice SmallUp) and `TIRED?` (no arrow; Alice: "I'm not tired anymore").
   - The note misses `TIRED?`. **Template wins.**
2. **Motel "what are we gonna do" prompt.**
   - Note: absent.
   - Template: a live prompt `CAN'T STAY HERE` / `FAMILY` / `CONTACT ANDROID`, with no arrows. It comes after the TV report and before CHEER ALICE UP.
   - **Template wins.** Add the prompt.
3. **CHEER ALICE UP.**
   - Note and template agree: `MOVING` / `DETERMINED` / `COMFORTING` / `SUPPORTIVE`, each Alice SmallUp.
   - Note and template also agree that `REASSURING` / `ANALYTICAL` / `VULNERABLE` / `SINCERE` is cut.
   - No conflict.
4. **Motel TV, public opinion (§3, §8 Q4).** The template puts `Public opinion SmallDown` on **both** variants ("Todd was killed in Stormy Night" and "Todd is alive"). This agrees with On_the_Run and the Kara page, and settles Q4's second half against the Todd_Williams wording. Inside the Todd-killed variant, the template gives Alice two different reactions: one if Kara shot Todd, one if Alice did. The note mentions only one reaction for the killed case. **Template wins.**
5. **Connor at the motel desk (§1, §2 D10, §3 Hank) (arrow conflict).**
   - Labels agree: `RATIONAL` / `DIPLOMATIC` / `DIRECT`.
   - The wiki and Relationship_Stat give Hank ↓ for any of the three. The template has **no arrow** on any of them.
   - By the rule the template wins, so no Hank change. Flag it for an in-game check.
6. **Fence prompt (§2 D12, §3 Hank and Software instability) (arrow conflict).**
   - Labels: the template has `GO` and `GIVE UP`, which agrees with PowerPyx.
   - The wiki gives `GIVE UP` Hank ↑ and Software instability ↑, and `GO` Hank ↓ and Software instability ↓. The template has **no arrow** on either option.
   - The wiki's "Connor dies" Software instability ↓ also has no arrow in the template.
   - By the rule the template wins. These three wiki entries are corroborated by two wiki pages each (On_the_Run plus Relationship_Stat or Software_Instability), so this is the most important arrow to check in game.
7. **Ralph's meal, SIT/REFUSE (§2 D6, §3 Alice).**
   - Template: a first prompt `SIT` / `REFUSE`. `REFUSE` opens a second `SIT` / `REFUSE`, and only the **second** `REFUSE` carries Alice SmallUp ("No, Ralph. We're leaving now.", then Ralph: "The little girl's going nowhere.").
   - This matches Relationship_Stat ("refuse twice"). The On_the_Run wording "initially refuses" is wrong. **Template wins.**
8. **Prompt missing from the note: `[CHECK GUN]` / `WORRIED` / `EXPLAIN` / `AGREE`.**
   - The template gives this prompt after the sit prompt, as a sibling, not nested under `REFUSE`. It has no arrows.
   - `[CHECK GUN]` has the lock "Took the gun in Stormy Night and didn't forget it upstairs", and `ø` dialogue.
   - This **conflicts** with §1/§2 D3 (wiki: "Kara must refuse both times ... option to Check Gun"; PowerPyx: Check Gun is how FORGOT GUN is revealed). The template's lock says the option needs the gun **on her**.
   - The template wins for the prompt and its labels. The lock text is the transcribers' wording and contradicts two guides, so leave it as an open question for the operator: is CHECK GUN shown when the gun was forgotten, or only when it was taken?
   - The template also does not support the wiki's claim that the button needs two refusals.
9. **LIE / TRUTH (§3 Alice, §8 Q11).**
   - Arrows agree: `LIE` Alice SmallUp, `TRUTH` Alice SmallDown.
   - The template answers Q11. The prompt comes after `[CHECK GUN]`/`WORRIED`/`EXPLAIN`/`AGREE` and Alice's "Please, Kara. I don't wanna eat that!", and before the table prompt.
10. **Table prompt (§1 Q28–Q30, §2 D7, §8 Q3).**
    - Template labels: `[ASK ABOUT CORPSE]` (lock "Saw the body in the bathroom"), `[INSIST ABOUT CORPSE]` (lock "Asked about corpse"), `THREATEN`, `BLUFF`, `FAMILY`. No arrows.
    - The note names only the chart groups. It equates TRY TO CONVINCE RALPH with `BLUFF` (from PowerPyx) and has no `FAMILY` and no `INSIST`.
    - The template's dialogue suggests a different mapping:
      - `BLUFF` gets "No… you're not going to leave. Not until Ralph says so." That is not an apology.
      - `FAMILY` and `[INSIST ABOUT CORPSE]` both end with Ralph apologising, and "Then let us go."
      - So TRY TO CONVINCE RALPH is more likely `FAMILY` (and `BLUFF` a non-resolving line).
    - **Template wins for labels.** The chart-node mapping is an operator check.
    - `THREATEN` has two variants: "No gun: Kara takes a knife" and "Kara has a gun: Kara threatens Ralph with the gun". This answers Q3: THREATEN is always offered. It agrees with the Ralph page and corrects PowerPyx's "If you have your gun on you".
11. **Connor's interrogation of Ralph (§1 Q35–Q37, §2 D8).**
    - The template conditions it on Kara's conduct: variant "Kara was nice with Ralph" versus "Kara threatened Ralph". The second variant presumably means this chapter's table threat. The template doesn't say whether a Fugitives threat counts (§8 Q2 stays open).
    - "Nice" variant:
      - Observation group "Scan Ralph" with three clues: `PROCESSING LED` | Signs of software instability | Probability of self-destruction: Moderate; `MODEL WR600 - Gardener` | Serial#: 021 753 034 | Status: REPORTED MISSING; `BURN MARK` | Irreversible skin damage | Probable cause: Extreme heat.
      - Prompt `AX400` / `DEVIANTS` / `REASSURE` / `BLUE BLOOD`.
    - "Threatened" variant: the same prompt with a fifth option, `PRESSURIZE`, and no scan. Ralph: "She ran out the back door!"
    - The note has ANALYZE SQUAT ANDROID only as a chart clue node, with no scan text and no interrogation labels. **Template wins.** Add the scan text and the prompt.
12. **The search hub (§1 Q38–Q46).**
    - The template gives no observation items for CHECK TABLE / KITCHEN / FIREPLACE / UNDER THE STAIRS. It is silent there, so the chart stands.
    - "Go upstairs" plays "Is anyone upstairs?" / "No. Nobody.", which agrees with PowerPyx's dead-end CHECK UPSTAIRS. A cut line follows it: "I'm taking you into custody." / "With you?! No! Ralph doesn't wanna go anywhere."
    - "Take too much time" and "Taking too much time again" are Hank's two calls. The second ends the search ("C'mon, let's get outta here"), with Ralph "Protect the little girl… The humans must not find her." This is HANK COMMANDS CONNOR TO LEAVE.
    - For the unlabelled Q46, the string table offers `LEAVE THE SQUAT` (`MENU.FLOWCHART.04K.SQUAT.C.LEAVE`), which is not on the note's chart. It is a candidate label, not a proof.
13. **Squat start, wire cutters (§4, not in the note).** The squat's Connor/Hank opening has a variant "Kara stole wire cutters from the supermarket in Fugitives", in which Connor deduces she is hiding nearby. The note's §4 does not list this dependency. It changes dialogue only.
14. **Parking-lot start (§1 P21–P22, labels marked "inferred").** The string table confirms `CONNOR INVESTIGATES SUPERMARKET` and `POLICE DON’T HAVE A LEAD`. The template's parking-lot section has the Connor/Hank supermarket dialogue, then a variant "Kara and Alice reach the train station unnoticed". The template has no Kara exploration prompts for the car, and none for hair in any row. It is silent there, so the chart stands.
15. **Pursuit (§1 H2–H28, §2 D11).**
    - The template has "Take too much time" ("We lost it." / "Game over, Connor."), which is KARA & ALICE VANISHED.
    - It has nothing for the partial-run CROSSED THE HIGHWAY, so it is silent there.
    - `GO` lists three outcome variants: "Connor dies on the highway", "Kara gets hit by a car" (Alice: "Watch out, Kara! NO!") and "Kara escapes and Connor survives".
    - `GIVE UP` is `ø`. The template doesn't list the obey-path second-lane death, so it is silent there and the chart (H15) stands.
16. **Ambient lines not in the note.** "Spotted by Police" has four cop lines. Connor asks "Which way did it go?" and a cop answers "That way - they're headed for the train station!". Narration only.

### Discrepancies with the benchmark

These are checked against `benchmark/story.json` 1.6.0 and `benchmark/story-engine.mjs`: option removal at lines 159–161, the `connorDies` helper at line 186, consequences at lines 214–222. The chapter-13 scenes are R13, K09, C09a and C09. K07b is a Fugitives scene, but it carries this chapter's meal and threat. Cut content is not counted.

1. **Missing prompt: motel wake-up.** `BATH?` (Alice SmallUp) / `HUNGRY?` (Alice SmallUp) / `TIRED?` has no scene. The two Alice SmallUp arrows are never applied, and the engine has no Alice change in ch13.
2. **Missing prompt: motel plans.** `CAN'T STAY HERE` / `FAMILY` / `CONTACT ANDROID` has no scene.
3. **Missing prompt: CHEER ALICE UP.** `MOVING` / `DETERMINED` / `COMFORTING` / `SUPPORTIVE`, each Alice SmallUp, has no scene, so the arrow is missing.
4. **R13 motel TV.**
   - The `publicSupport: -1` on both TV items matches the template's two Public opinion SmallDown arrows.
   - The template has no "skip" for the broadcast, while R13 offers one through its generic media options. The chart's CHANGE CHANNEL is an action, so this may be acceptable; see §8 Q4.
   - The Todd-dead fact says "a police search now under way for the android and a child". The broadcast text is "The android fled the scene and a police search is now in progress". There is no child in it. **Template wins.**
   - Alice's reaction lines (she shot Todd, Kara shot Todd, or Todd is lying) are not used.
5. **Missing prompt: Connor at the motel desk.** `RATIONAL` / `DIPLOMATIC` / `DIRECT` has no scene. It has no arrow in the template, so leaving out the Hank ↓ agrees with the template (see §10 discrepancy 5 above). The prompt itself is still missing. The motel route has no Connor scene at all: no FOLLOW HANK or CHECK THE DOOR, and the template's "Go into the room: It's gone…" is not narrated.
6. **Missing prompts in the squat meal.** The benchmark has none of these:
   - the nested `SIT` / `REFUSE` → `SIT` / `REFUSE` (second `REFUSE` Alice SmallUp);
   - `[CHECK GUN]` / `WORRIED` / `EXPLAIN` / `AGREE`;
   - `LIE` (Alice SmallUp) / `TRUTH` (Alice SmallDown);
   - `[ASK ABOUT CORPSE]` / `[INSIST ABOUT CORPSE]` / `THREATEN` / `BLUFF` / `FAMILY`.
   That is four live prompts and three Alice arrows missing.
7. **K07b stands in for the meal, with the wrong arrow and gate.** K07b (Fugitives) folds the meal into one Fugitives scene. Its situation has "a dead rodent he caught for her dinner", and its option 1 is "refuse his food".
   - The engine applies `alice(+1)` for option 0, "Accept his hospitality and treat him kindly" (line 215). The template's meal arrow is the opposite: Alice SmallUp for **refusing** twice. Whether ch10's template has an Alice arrow for kindness to Ralph is for the ch10 cross-check.
   - K07b option 2, "Pull the gun on him", sets `ralphHostile`, and `remove(2)` drops it without the gun (line 161). The template's threat is this chapter's table `THREATEN`, which is offered **with or without** the gun (the knife variant). The gate differs.
8. **Missing unlock: the corpse.** `[ASK ABOUT CORPSE]` needs "Saw the body in the bathroom". The benchmark has no squat-morning scene, no corpse clue and no corpse state.
9. **Missing clues: Connor's scan of Ralph.** The three observation items (`PROCESSING LED` … Moderate; `MODEL WR600 - Gardener` … REPORTED MISSING; `BURN MARK` … Extreme heat) are absent. C09a has no clue options.
10. **Missing prompt: Connor's interrogation.** `AX400` / `DEVIANTS` / `REASSURE` / `BLUE BLOOD`, plus `PRESSURIZE` when Kara threatened Ralph. C09a offers instead "Push past him and search upstairs." (risk 0.2) and "Take {{Hank}}'s word for it and leave.". Neither is a template label.
    - The template's upstairs check is a dead end ("Is anyone upstairs?" / "No. Nobody.").
    - The template has no failure branch for finding Kara ("Connor finds Kara": Ralph shouts "RUN! QUICK! KARA!").
    - So C09a's `risk: 0.2`, its failure text ("slashes {{Connor}} and throws him down the stairs") and the failure's `amanda(-1)` (line 221) have no template basis.
11. **C09a on the threatened path.**
    - The engine event is "{{Ralph}} tells {{Connor}} they are upstairs". The template line is "She ran out the back door!". **Label differs; template wins.**
    - The template's threatened variant still contains the five-option prompt. Ralph informs after it, so the informing comes out of the prompt rather than replacing it, and C09a's decision should be the interrogation prompt rather than a removed scene.
12. **C09 labels.** The game's buttons are `GO` and `GIVE UP`. C09 offers "Do as {{Hank}} says and let them go." and "Go after them across the traffic.". The meaning matches; the labels differ.
13. **C09 arrows the template does not have.**
    - Option 0 applies `hank(1)`, `si(1)`, `amanda(-1)`.
    - Option 1 applies `hank(-1)`, `si(-1)`, `amanda(1)`.
    - On failure, `connorDies` also applies `si(-1)`, `hank(-1)`, `amanda(-1)`.
    - The template carries **no** arrow on either button or on Connor's death.
    - Hank and Software instability are backed by the wiki (§10 discrepancy 6 above, arrow conflict). The Amanda changes are backed by no source at all.
14. **C09 outcomes.**
    - The template lists three outcomes for `GO`: Connor dies; Kara gets hit by a car; Kara escapes and Connor survives.
    - C09 option 1 has only Connor-dies (risk 0.35, with no number in any source) or escape. "Kara gets hit by a car" is missing.
    - The template's "Take too much time" → KARA & ALICE VANISHED pursuit outcome is also missing: C09 always assumes Connor reached the fence.
15. **K09.**
    - The template's street section is a scripted event, "Spotted by Police", followed by "Connor pursues Kara". It has no prompt, and no death outside the highway.
    - K09 option 1's failure branch ("ran into freeway traffic and were killed", line 220) has no template basis.
    - K09's situation "{{Todd}} has reported you and the news is calling you a kidnapper" contradicts both broadcasts. Neither mentions a child or a kidnapping, and in the Todd-dead variant there is no Todd to report.
16. **Wire-cutters variant.** The squat opening depends on whether Kara stole wire cutters in Fugitives. The benchmark has no wire-cutters state. This changes dialogue only, so it is low priority.
17. **Amanda arrows overall.** The template has no Amanda arrow in ch13. The engine applies Amanda changes in three places: C09a failure, both C09 options, and every `connorDies`.

Totals: 16 discrepancies with sections 1 to 3, and 17 with the benchmark.
