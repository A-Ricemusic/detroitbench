# Chapter 10: Fugitives (Kara)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch10/wiki.txt`; related wiki pages are saved alongside it as `/tmp/flowcharts/ch10/w_*.txt`. The flowchart images are in `/tmp/flowcharts/ch10/` (upscaled crops of the overview in `/tmp/flowcharts/ch10/crops/`) and were not committed.

Wiki infobox: `|date=November 5, 2038`, `|time=10:58PM`, `|player=[[Kara]]`, `|location=Camden, [[Detroit]]` with `[[Laundromatic]]`, `[[24]] convenience store`, `[[Eastern Motel]]`, `[[Abandoned house]]`; `|objectives=Find shelter for the night`, `|endings=3`. The text says: "This chapter has three different outcomes." The chapter only exists if Kara and Alice escaped Todd's house: "It takes place after [[Stormy Night]], provided players were successful in removing [[Alice]] from her home."

**Scope note on the brief.** The task asked for "beg" and "the parking meter" money options and for the Todd news report. None of the sources has a parking-meter node or a separate begging option. The only request for money is TALK TO CLERK, and the clerk always refuses: PowerPyx says "he will refuse to help you", and the Nathan Clark page says "He informs her that he cannot give money away." The Todd news report is not in this chapter. It plays on the motel TV in **On the Run** (CHANGE CHANNEL > ALICE HEARS ABOUT TODD), so it is covered under §4 and §6 as a downstream effect of the motel ending.

---

## 1. Flowchart transcription

### How the chart was read

- The full chart is `detroit-fugitives-flowchart-100.jpg`, PowerPyx's "100% COMPLETED" screenshot (EXIF 2018:07:12 21:10:04). Its small labels are mostly unreadable at full size, so labels come from the zoomed screenshots. The overview and its upscaled crops were used for edges and for completeness.
- The zoomed screenshots are `first-branch` (74% COMPLETED, 2018:06:01 09:41), `laundromat-branch-1` (13:04), `motel-branch` (13:00), `parking-branch` (13:41), `squat-branch` (17:11), and two undated supermarket close-ups, `detroit-become-human-fugitives-inside-supermarket-1` and `-2`. The supermarket close-ups show the full hold-up subtree with no padlocks.
- `motel-branch` and `squat-branch` were taken before 100% and show red-padlock `[...]` placeholders: in the car's promise group and gift nodes, in the hold-up groups, and as a `[...]` where DRAW GUN now sits. In `squat-branch` the group after CLERK GRABS A GUN has three slots (`[...]`, CONVINCE, `[...]`). The 100% overview and `inside-supermarket-2` both show two slots (GIVE UP, CONVINCE). PowerPyx says: "Fixed with Patch 1.06: There is a missing decision from the supermarket while using the gun to rob the clerk." The two-slot post-patch chart is treated as authoritative.
- The `first-branch` header reads `PUBLIC OPINION INDIFFERENT` and `ALICE WARM`. This is PowerPyx's save state, not something the chapter sets.
- PowerPyx's last playthrough is the blue path on the 100% overview: LAST STOP > LEAVE BUS > CHECK PARKING LOT > INSIDE PARKING LOT > BREAK INTO CAR > STAY > GET IN CAR > TALK TO ALICE > DON'T MAKE PROMISE > KARA SLEEPS NEXT TO ALICE > ALICE & KARA STAYED IN ABANDONED CAR. The same playthrough visited the supermarket (TALK TO CLERK > NOTICE CASH REGISTER > USE GUN > CUSTOMER ARRIVES > RESUME HOLD UP > OPEN CASH REGISTER > CLERK GRABS A GUN > GIVE UP > LEAVE SUPERMARKET; STEAL WIRE CUTTERS) and took TAKE WIRE CUTTERS from the parking lot.

Icon key, checked against the wiki's `Template:Icon` and the ch07 note:
- Arrow (⇨): an action the player takes.
- Triangle (△): an event or consequence the game plays.
- Double square: a group of alternatives (a choice set or a QTE pass/fail pair).
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".
- Large tile with an image: a checkpoint or location node.
- Small magazine icon: a collectible junction (for the two READ nodes).
- **No skull, no-entry, ✓/✗ or trophy icon appears anywhere on this chart.** None of the three ending tiles carries an icon. There is no death or failure ending in this chapter.

Boxes are numbered N1–N95 in reading order (top to bottom by branch as the chart lays them out: hub, laundromat, motel, parking lot, squat, supermarket). Labels are quoted exactly as printed. "(legible)" means read in a zoomed screenshot. "(overview)" means the label could be read only from its position and shape on the 100% overview, with the text matching the wiki and PowerPyx.

### A. Opening and the hub

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N1 | LAST STOP | checkpoint (large tile with image; "CHECKPOINT" subtitle on overview) | legible > N2 |
| N2 | LEAVE BUS | arrow | legible; PowerPyx: "unmissable" > hub |
| — | [FIND SHELTER FOR THE NIGHT] | bracketed phase label (not a box) | legible; it frames N3–N10 |
| N3 | ENTER LAUNDROMAT | arrow | legible > N11 |
| N4 | TALK TO PARKED ANDROID | arrow | legible; no outgoing edge to another node |
| N5 | CHECK MOTEL | arrow | legible > N20 |
| N6 | CHECK PARKING LOT | arrow | legible > N34 |
| N7 | ALICE TOO COLD | triangle | legible; input from N8; > N45 (the car's KARA SLEEPS NEXT TO ALICE), then N46 |
| N8 | TALK TO ANDROID TRASH COLLECTOR | arrow | legible > N7 (optional) |
| N9 | CHECK SQUAT | arrow | legible > N47 |
| N10 | ENTER SUPERMARKET | arrow | legible > N68 |

The hub is free-roam: N3–N10 can be done in any order, and every branch except the endings returns here. Hub order on the chart: ENTER LAUNDROMAT; TALK TO PARKED ANDROID; CHECK MOTEL; CHECK PARKING LOT; ALICE TOO COLD; TALK TO ANDROID TRASH COLLECTOR; CHECK SQUAT; ENTER SUPERMARKET.

### B. Laundromat

| # | Label | Icon | Edge |
|---|---|---|---|
| N11 | INSIDE LAUNDROMAT | location tile with image | legible > N14, and the magazine junction |
| N12 | READ "BEE-LINE TO DISASTER" | arrow (via magazine icon) | legible; optional |
| N13 | READ "FACE THE MUSIC" | arrow (via magazine icon) | legible; optional |
| N14 | INSPECT DRYER | arrow | legible > group N15/N16 |
| N15 | LEAVE CLOTHES | group member | legible > N19 |
| N16 | STEAL CLOTHES | group member | legible > group N17/N18 |
| N17 | WEAR CLOTHES | group member, **yellow padlock** (cross-chapter impact) | legible > N19 |
| N18 | DISTURB MAN | group member | legible > N19 |
| N19 | LEAVE LAUNDROMAT | arrow | legible; PowerPyx: "No matter what you’ve decided before, leaving the store is unmissable." |

### C. Motel

| # | Label | Icon | Edge |
|---|---|---|---|
| N20 | HAVE MONEY AND DISGUISE | triangle | legible; from N5 > N21 |
| N21 | INSIDE MOTEL | location tile with image | legible > N22 |
| N22 | TALK TO RECEPTIONIST | arrow | legible > N23 |
| N23 | CHECK IN | arrow | legible > N24 |
| N24 | FIND AND ENTER ROOM 28 | arrow | legible > N25 |
| N25 | REMOVE WET CLOTHES | arrow | legible > N26 |
| N26 | TALK TO ALICE | arrow | legible > group N27/N28 |
| N27 | MAKE PROMISE | group member | legible |
| N28 | DON'T MAKE PROMISE | group member | legible; the group > N29 (optional), N30 (optional), and > group N31/N32 |
| N29 | GIVE TOY | arrow | legible > group N31/N32 |
| N30 | GIVE CHOCOLATE | arrow | legible > group N31/N32 |
| N31 | KARA SLEEPS NEXT TO ALICE | group member | legible |
| N32 | WATCH ALICE FROM CHAIR | group member | legible; the group > N33 |
| N33 | **ALICE & KARA STAYED IN MOTEL** | ending tile with image; no icon | ENDING |

### D. Parking lot (abandoned car)

| # | Label | Icon | Edge |
|---|---|---|---|
| N34 | INSIDE PARKING LOT | location tile with image | legible; from N6 > N35, N36, N47 |
| N35 | BREAK INTO CAR | arrow | legible > group N37/N38 |
| N36 | LEAVE PARKING LOT | arrow | legible; back to hub |
| N37 | STAY | group member | legible > N39 |
| N38 | FIND ANOTHER OPTION | group member | legible; back to hub |
| N39 | GET IN CAR | arrow | legible > N40 |
| N40 | TALK TO ALICE | arrow | legible > group N41/N42 |
| N41 | MAKE PROMISE | group member | legible |
| N42 | DON'T MAKE PROMISE | group member | legible; the group > N43 (optional), N44 (optional), N45 |
| N43 | GIVE TOY | arrow | legible > N45 |
| N44 | GIVE CHOCOLATE | arrow | legible > N45 |
| N45 | KARA SLEEPS NEXT TO ALICE | arrow (a single node, not a group; there is no chair option in the car) | legible; inputs N41–N44 and N7 > N46 |
| N46 | **ALICE & KARA STAYED IN ABANDONED CAR** | ending tile with image; no icon | ENDING |

The edge from ALICE TOO COLD runs along the bottom of the parking-lot row and rises into N45. It is visible in both the overview and `motel-branch`.

### E. Squat

| # | Label | Icon | Edge |
|---|---|---|---|
| N47 | TAKE WIRE CUTTERS | arrow | legible; inputs N9 (CHECK SQUAT), N34 (from INSIDE PARKING LOT: the pliers on the generator), and STEAL WIRE CUTTERS (N94) per PowerPyx > group N48/N49 |
| N48 | CUT STREET FENCE | arrow | legible > N50 |
| N49 | CUT PARKING LOT FENCE | arrow | legible > N50 |
| N50 | INSIDE SQUAT | location tile with image | legible > N51 |
| N51 | MEET RALPH | arrow, **yellow padlock** (cross-chapter impact) | legible > group N53/N54, and > N56 directly |
| N52 | GUN TAKEN IN 'STORMY NIGHT' | yellow padlock (cross-chapter impact) | legible > N54 |
| N53 | CONVINCE | group member | legible |
| N54 | THREATEN WITH GUN | group member | legible; the group > N55 and > N56 |
| N55 | FOLLOW RALPH | arrow | legible > N57, N58, N59 |
| N56 | GIVE UP | arrow | legible > N59 |
| N57 | START A FIRE | arrow | legible > N60 |
| N58 | MAKE A BED | arrow | legible > N60 |
| N59 | LEAVE SQUAT | arrow | legible; back to hub (no further edge) |
| N60 | TALK TO ALICE | arrow | legible > group N61/N62 |
| N61 | MAKE PROMISE | group member | legible |
| N62 | DON'T MAKE PROMISE | group member | legible; the group > N63 (optional), N64 (optional), and > group N65/N66 |
| N63 | GIVE TOY | arrow | legible |
| N64 | GIVE CHOCOLATE | arrow | legible |
| N65 | KARA SLEEPS NEXT TO ALICE | group member | legible |
| N66 | WATCH ALICE FROM CHAIR | group member | legible; the group > N67 |
| N67 | **ALICE & KARA STAYED IN THE SQUAT** | ending tile with image; no icon | ENDING |

### F. Supermarket

| # | Label | Icon | Edge |
|---|---|---|---|
| N68 | INSIDE SUPERMARKET | location tile with image | legible > N69, N71, and the three item groups |
| N69 | TALK TO CLERK | arrow | legible > N70 |
| N70 | NOTICE CASH REGISTER | arrow | legible > group N73/N74 |
| N71 | NOTICE CAN STACK | arrow | legible > group N73/N74 |
| N72 | GUN TAKEN IN 'STORMY NIGHT' (copy 1) | yellow padlock | legible > N74 |
| N73 | USE ALICE AS A DIVERSION | group member | legible > group N75/N76 |
| N74 | USE GUN | group member | legible > N77 |
| N75 | STEAL DISCREETLY | group member | legible > N88 |
| N76 | TAKE TOO MUCH TIME | group member | legible > N86 |
| N77 | CUSTOMER ARRIVES | triangle | legible > group N78/N79 |
| N78 | GIVE UP (copy 1) | group member | legible > N88 |
| N79 | RESUME HOLD UP | group member | legible > group N80/N81 |
| N80 | OPEN CASH REGISTER | group member | legible > N82 |
| N81 | "DON'T MOVE" | group member | legible (printed with quotation marks) > N85 |
| N82 | CLERK GRABS A GUN | triangle | legible > group N83/N84 |
| N83 | GIVE UP (copy 2) | group member | legible > N88 |
| N84 | CONVINCE | group member | legible > N85 |
| N85 | TAKE MONEY | arrow | legible; inputs N81, N84, and N87 > N88 |
| N86 | CLERK SPOTS KARA STEALING | triangle | legible; inputs N76 and the three item groups > N87 (gun) or > N88 |
| N87 | DRAW GUN | arrow | legible; input N86 plus N89 > N85 and/or N88 |
| N88 | LEAVE SUPERMARKET | arrow | legible; all supermarket exits > hub |
| N89 | GUN TAKEN IN 'STORMY NIGHT' (copy 2) | yellow padlock | legible > N87 |
| N90 | STEAL CHOCOLATE BAR | group member | legible |
| N91 | LEAVE CHOCOLATE BAR | group member | legible |
| N92 | STEAL TOY | group member | legible |
| N93 | LEAVE TOY | group member | legible |
| N94 | STEAL WIRE CUTTERS | group member | legible |
| N95 | LEAVE WIRE CUTTERS | group member | legible |

Order within groups as printed: LEAVE CLOTHES above STEAL CLOTHES; WEAR CLOTHES above DISTURB MAN; MAKE PROMISE above DON'T MAKE PROMISE (all three copies); KARA SLEEPS NEXT TO ALICE above WATCH ALICE FROM CHAIR; STAY above FIND ANOTHER OPTION; CONVINCE above THREATEN WITH GUN; USE ALICE AS A DIVERSION above USE GUN; STEAL DISCREETLY above TAKE TOO MUCH TIME; GIVE UP above RESUME HOLD UP; OPEN CASH REGISTER above "DON'T MOVE"; GIVE UP above CONVINCE; STEAL above LEAVE in each item pair. The item pairs read top to bottom: CHOCOLATE BAR, TOY, WIRE CUTTERS.

**Totals:** 95 boxes plus one bracketed phase label. Distinct labels: 78. Repeated labels: TALK TO ALICE ×3, MAKE PROMISE ×3, DON'T MAKE PROMISE ×3, GIVE TOY ×3, GIVE CHOCOLATE ×3, KARA SLEEPS NEXT TO ALICE ×3, WATCH ALICE FROM CHAIR ×2, GIVE UP ×3 (squat, customer, clerk's gun), GUN TAKEN IN 'STORMY NIGHT' ×3. There are 3 ending tiles with 3 distinct labels, which matches `endings=3`. Yellow-padlock boxes: WEAR CLOTHES, MEET RALPH, and the three GUN TAKEN IN 'STORMY NIGHT' gates.

### Interactions not on the chart (wiki Notes, Attention to Detail, PowerPyx)

None of these is a chart node. They are listed so the operator can decide whether any of them becomes a scene.
- Dialogue after a robbery. Wiki Notes: "If Kara chose to threaten the clerk, normally when leaving and being asked by Alice how got the money, the relationship will decrease and Kara will have an option to lie or tell the truth, though if she convinced the clerk to give her the money, Kara will automatically pick the “LIE” dialogue though in this case it’s half true thus increasing her relationship with Alice." The "apologize" choice (§3) is also asked here.
- Hold-up dialogue labels. Nathan_Clark: "Kara can order him to: Back off!, Turn Around! or Bills! If you choose "Bills", Nathan will grab a hidden pistol in the cash register." The chart groups Back off!/Turn around! as "DON'T MOVE" and Bills! as OPEN CASH REGISTER. PowerPyx: "Tell the clerk with either O or Triangle to back off or turn around to grab the money yourself."
- Draw-gun line. Relationship_Stat: "using the gun to tell the clerk to get on the floor".
- Meeting Ralph. Wiki: "If Kara chooses “LITTLE GIRL” upon meeting Ralph, Ralph will say she’s not a little girl"; "If Kara has the gun, a dialogue will unlock called “[GUN]” which will allow Kara to threaten him, if she doesn’t, she’ll instead have a dialogue called “HOSPITALITY” which will have Kara ask Ralph for help."
- Ralph carving rA9. Ralph page: "he will be seen carving [[rA9]] on the walls with a knife. If Kara asks what it means, he replies "I don't know."" Zlatko uses this (§4).
- Motel check-in. "When given an option of dialogue regarding the ID, if Kara says nothing she’ll nervously say should have it somewhere." Eastern_Motel: "Kara signs the motel's paperwork with the name "Archer"". "The dialogue when Kara attempts to enter the motel but can’t will change based on whether Kara has no human clothes, no money or neither."
- Clerk attitude. "if Kara is in her normal uniform, the clerk will be hostile though if she’s wearing a human jacket, he’ll be more friendly but will still refuse to help regardless."
- Optional exploration ("little to no story impact"): assessing shops, scoping the laundromat through the window, a second washer, the pliers on the generator, both squat entrances, the motel mural, the motel window, the drugstore and coffee shop (scan only). Also "Kara can take the matches, talk to Ralph and still leave the squat," and "Kara can offer the candy bar twice in this chapter if she goes to the squat, leaves and then goes to the motel."
- Gun on the TV stand: "If Kara has the gun and goes to the motel, she’ll place her gun on the tv stand along with whatever else she collected".

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution checks (QTEs or timers). Node numbers refer to §1.

**D1. The hub: where to go (after LEAVE BUS).** This is free roam. Kara can visit the laundromat, the supermarket, the motel door, the parking lot and the squat fence in any order, any number of times, and can talk to the two street androids.
- TALK TO PARKED ANDROID (N4): no gate, no consequence on the chart.
- TALK TO ANDROID TRASH COLLECTOR (N8). PowerPyx: "You are forced to talk to Alice at some point, which will trigger the scene with the Trashman." Kara page: "They are approached by a [[WR600]] android who provides them information about a safe location, but it is on the opposite side of town." This is the source of Zlatko's address (§4).
- Do nothing > ALICE TOO COLD (N7). **Requires N8.** Wiki: "requires having talked to the android trash collector, then standing outside for 12 minutes (Alice will sneeze more and more)- leads to '''''Alice & Kara Stayed in Abandoned Car''''' ending". PowerPyx: "stand in the rain for about 12 minutes and don’t do anything ... Kara breaks into the car and both will crash the night there." The chart routes N7 to the car's KARA SLEEPS NEXT TO ALICE, which skips the car's promise and gifts. The wiki infobox phrasing, "Kara and Alice will stay here automatically if you run out of time," agrees.

**D2. Laundromat (INSPECT DRYER).**
- LEAVE CLOTHES (N15). PowerPyx: "When Alice wants you to stop stealing the clothes, press X to listen to her and leave again." Alice ↑.
- STEAL CLOTHES (N16). PowerPyx: "press O to take them anyhow." Alice ↓. Wiki: "Steal Clothes - required to stay in the motel".
- The two can both happen. Relationship_Stat: "If Kara agrees to not steal clothes from the [[Laundromatic]] even if she later does in [[Fugitives]]" (↑ is kept). PowerPyx notes a bug fixed in Patch 1.05 with switching between Steal and Leave.

**Q1. Taking the clothes (after STEAL CLOTHES).**
- WEAR CLOTHES ✓ (impact). PowerPyx: "Pass the QTE’s (hold R1 and move L-left for the first, hold R2 + R1 + R-up for the second) to steal two complete outfits. This is needed to have a disguise for the motel-branch!"
- DISTURB MAN. PowerPyx: "Fail the QTE to wake the man and leave the shop again – with no clothes." Both lead to LEAVE LAUNDROMAT.
- The chart has no ✓/✗ icons on this pair; it is drawn as an ordinary group.

**D3. Supermarket shoplifting (three independent pairs).**
- STEAL / LEAVE CHOCOLATE BAR; STEAL / LEAVE TOY; STEAL / LEAVE WIRE CUTTERS.
- Gate: wire cutters. PowerPyx: "To interact with the Wire Cutters, Kara needs to check either side of the fence of the Abandoned House before."
- Being caught. PowerPyx: "You can steal one of these three items without being caught. Stealing a second item will always get you busted." Wiki: "Kara is less likely to be caught if she steals only one object from the store and then leaves immediately." "If you steal two items, the store clerk will still catch you, even if Kara stole an item and then returned later after stealing the clothes." A second theft > CLERK SPOTS KARA STEALING (N86), so this is effectively deterministic.
- Stolen toy and chocolate unlock GIVE TOY / GIVE CHOCOLATE at every ending. PowerPyx: "Stealing either the Chocolate Bar and/or the Toy successfully will enable Kara to give either item to Alice later."

**D4. After CLERK SPOTS KARA STEALING (N86).**
- DRAW GUN (N87). **Requires GUN TAKEN IN 'STORMY NIGHT'.** PowerPyx: "Kara can use it after being caught and keep both stolen items." Wiki: "Draw Gun AND Leave Supermarket AND/OR Take Money". Alice ↓ ("using the gun to tell the clerk to get on the floor"); TAKE MONEY is a further ↓ ("Robbing the cash register").
- Without the gun, Kara has to hand the items back and leave. Wiki: "If you are caught by the store clerk in the supermarket and you do not use the gun taken from [[Stormy Night]], you will lose all of your stolen goods, though the flowchart will indicate they were stolen." Nathan_Clark: "she is forced to put back what he saw her take and leave the store for good."

**D5. Getting the register money (after TALK TO CLERK > NOTICE CASH REGISTER).** Asking the clerk always fails.
- USE ALICE AS A DIVERSION (N73). **Requires NOTICE CASH REGISTER and NOTICE CAN STACK.** PowerPyx: "after noticing both aforementioned things, talk to Alice and ask her for help." Alice ↓.
- USE GUN (N74). **Requires GUN TAKEN IN 'STORMY NIGHT'.** PowerPyx: "you can use it against the clerk after he rejects your formal request for money."
- Leave without money (no node; just LEAVE SUPERMARKET).

**Q2. Diversion (after USE ALICE AS A DIVERSION).**
- STEAL DISCREETLY > LEAVE SUPERMARKET with money. PowerPyx: "quickly go to the cash register and pass the QTE (hold R-down first, then move L-left)."
- TAKE TOO MUCH TIME > CLERK SPOTS KARA STEALING > D4. PowerPyx: "don’t pass the QTE in time to get busted."
- Nathan_Clark: after a discreet theft "he will run outside to see if he can find Kara and Alice. He is disappointed when they are nowhere to be found."

**D6. Hold-up: CUSTOMER ARRIVES (N77).**
- GIVE UP > LEAVE SUPERMARKET, no money. PowerPyx: "Abort your Store-Hold-Up and go without money."
- RESUME HOLD UP. PowerPyx: "Stay at the counter with your gun concealed and let the customer buy, pay and leave without him noticing."

**D7. Hold-up demand.**
- OPEN CASH REGISTER ("Bills!") > CLERK GRABS A GUN > D8.
- "DON'T MOVE" ("Back off!" / "Turn around!") > TAKE MONEY. Alice ↓.

**D8. CLERK GRABS A GUN (N82).**
- GIVE UP > LEAVE SUPERMARKET, no money.
- CONVINCE > TAKE MONEY. PowerPyx: "tell the clerk the story of your and Alice’s night and he will hand over the money willingly." Nathan_Clark: "he will let her have the money, and he will not call the police." Alice ↑.
- No stand-off or shooting outcome exists.

**D9. Apologize, lie or tell the truth to Alice after a robbery (not on the chart).** See §1 and §3.

**D10. Motel door (CHECK MOTEL).**
- HAVE MONEY AND DISGUISE (N20) **requires TAKE MONEY or STEAL DISCREETLY, and WEAR CLOTHES.** PowerPyx: "Kara needs to get 40$ from the Supermarket’s register and new clothes from the Laundromat to hide being an android. If you have failed one of these two things, you can’t get into the Motel on your current playthrough." Without both, Kara is turned away (no chart node).
- Inside, the chain TALK TO RECEPTIONIST > CHECK IN > FIND AND ENTER ROOM 28 > REMOVE WET CLOTHES > TALK TO ALICE is linear. PowerPyx: "use any excuse for not having an ID to check in."

**D11. Parking lot.**
- BREAK INTO CAR. PowerPyx: "Press X and hit R-right three times to break the window". Or LEAVE PARKING LOT.
- After breaking in: STAY ("Convince Alice that the car is the best option you have right now") or FIND ANOTHER OPTION ("Agree with Alice to look for something else") > hub.
- The parking lot also holds the pliers for TAKE WIRE CUTTERS. Wiki: "There's a pair of pliers near the car the player can take to get into the Squat without stealing anything."

**D12. Squat entry.**
- TAKE WIRE CUTTERS (from the parking-lot generator, or N94 STEAL WIRE CUTTERS) **requires CHECK SQUAT** for the store option.
- CUT STREET FENCE or CUT PARKING LOT FENCE. These are equivalent. "If Kara crawls through the fence while wearing a jacket, her sleeve will get slightly torn."

**D13. MEET RALPH (N51).** PowerPyx: "unmissable after checking the door of the house".
- CONVINCE ("HOSPITALITY" / "LITTLE GIRL" dialogue).
- THREATEN WITH GUN. **Requires GUN TAKEN IN 'STORMY NIGHT'.** PowerPyx: "use it to defend Alice and either leave or stay on the compound."
- GIVE UP > LEAVE SQUAT. PowerPyx: "At some part dialogue, press X LEAVE, to exit the compound."

**D14. After CONVINCE / THREATEN.**
- FOLLOW RALPH, or GIVE UP > LEAVE SQUAT.

**D15. Inside the house.**
- START A FIRE and MAKE A BED. PowerPyx: "Upon completing the two previous tasks, talk to Alice to proceed." Both are required.
- Or LEAVE SQUAT. Wiki: "It is possible for Kara and Alice to leave the abandoned house after meeting Ralph simply by picking leave when it becomes available. Doing this closes off the Squat ending."

**D16. TALK TO ALICE at the chosen shelter (all three endings).**
- MAKE PROMISE (Alice ↑) or DON'T MAKE PROMISE (Alice ↓). PowerPyx: "When Alice asks you if you’re going to be forever, press O to confirm it" / "press X to be hesitant." Kara page: "Kara may immediately promise or hesitate, but ultimately will relent."

**D17. Gifts (optional, each needs the stolen item).**
- GIVE TOY (Alice ↑). Kara page: "Alice accepts the stolen stuffed toy".
- GIVE CHOCOLATE (no change). Kara page: "she will refuse any candy, as she is not hungry."

**D18. Where Kara rests (motel and squat only).**
- KARA SLEEPS NEXT TO ALICE (Alice ↑, the wiki says "x2") or WATCH ALICE FROM CHAIR (no stated change). In the car the only node is KARA SLEEPS NEXT TO ALICE.

**Summary.** There are 18 decision points (D1–D18). D1 is the free-roam hub that chooses the shelter. D3 is three independent steal/leave pairs. D9 is off-chart dialogue. There are 2 execution checks (Q1 laundromat QTE, Q2 register QTE) and 1 timer (ALICE TOO COLD, 12 minutes). Being caught shoplifting is deterministic: one item is safe and a second is always caught. No choice in the chapter kills Kara or Alice.

---

## 3. Numbers

- **Probabilities:** none. The Fugitives page has no Probability table and no percentage for any node.
- **Timers:**
  - ALICE TOO COLD: "standing outside for 12 minutes" (wiki). PowerPyx says "about 12 minutes".
  - The QTEs (WEAR CLOTHES, STEAL DISCREETLY) are timed but have no stated duration.
- **Money:** the motel costs $40. Eastern_Motel: "A motel room costs $40 dollars." PowerPyx: "Kara needs to get 40$ from the Supermarket’s register". The Fugitives page says "it requires $40 to stay the night and refuses to serve androids." No source states how much each robbery method yields.
- **Room:** "FIND AND ENTER ROOM 28" (chart). PowerPyx: "Your room is going to be the second from the left."
- **Shoplifting limit:** one item is safe, and "Stealing a second item will always get you busted" (PowerPyx).
- **Alice relationship.** The Fugitives page's "Relationship Changes" section, quoted exactly with the icon size (`up`/`down` = small, `largedown` = large):

| Trigger (chart node) | Icon | Fugitives wiki line | Relationship_Stat line |
|---|---|---|---|
| STEAL CLOTHES | small ↓ | "Stealing clothes from the Laundromat {{Icon|down}}" | "Choosing to steal clothes from the [[Laundromatic]] in [[Fugitives]]." |
| LEAVE CLOTHES | small ↑ | "Not stealing clothes from the Laundromat {{Icon|up}}" | "If Kara agrees to not steal clothes from the [[Laundromatic]] even if she later does in [[Fugitives]]." |
| USE ALICE AS A DIVERSION | small ↓ | "Using her as a distraction to rob the store {{Icon|down}}" | "Using her as a distraction to rob the convenience store in Fugitives." |
| "DON'T MOVE" (back off / turn around) | small ↓ | "Holding the clerk at gunpoint & choosing either "back off!" or "turn around" {{Icon|down}}" | "Robbing the convenience store at gunpoint and telling the clerk to either "back off!" or "turn around!" in Fugitives." |
| Apologize afterwards (off-chart) | small ↑ | "Apologizing when she is upset about robbing the register using either "back off!", "turn around", or using Alice as a distraction.{{Icon|up}}" | "Choosing to "apologize" after successfully robbing the convenience store either discreetly or at gunpoint and telling the clerk to either "back off!" or "turn around!" in Fugitives." |
| CONVINCE (clerk's gun) | small ↑ | "Holding the clerk at gunpoint, picking "convince" {{Icon|up}}" | "Robbing the convenience store at gunpoint and choosing to "convince" the clerk in Fugitives." |
| DRAW GUN | small ↓ | "Using the gun after getting caught stealing from the aisles {{Icon|down}}" | "Getting caught stealing in the convenience store and using the gun to tell the clerk to get on the floor in Fugitives." with sub-bullet "Robbing the cash register in Fugitives." |
| ALICE TOO COLD or STAY in the car (ending) | **large ↓** | "Spending the night in the Abandoned Car {{Icon|largedown}}" | "Sleeping in the car in [[Fugitives]]. ** Both being forced to sleep due to Alice getting too cold, or actively choosing will lead to a large decrease." |
| GIVE TOY | small ↑ | "Giving Alice the stuffed toy (need to have stolen one) {{Icon|up}}" | "Giving her the toy in Fugitives." |
| MAKE PROMISE | small ↑ | "Promising Alice you'll always be together {{Icon|up}}" | "Choosing "promise" after Alice prepares to go to sleep in Fugitives." |
| DON'T MAKE PROMISE | small ↓ | "Not promising you'll be together forever {{Icon|down}}" | "Choosing "can't promise" after [[Alice]] prepares to go to sleep in Fugitives." |
| KARA SLEEPS NEXT TO ALICE (motel or squat) | small ↑ **×2** | "Sleeping beside Alice either in the Squat or the Motel {{Icon|up}} x2" | "Sleeping next to Alice in either the motel or squat in Fugitives." (no ×2) |

  - Also: "If Kara chose to threaten the clerk, normally when leaving and being asked by Alice how got the money, the relationship will decrease ... if she convinced the clerk ... Kara will automatically pick the “LIE” dialogue ... thus increasing her relationship with Alice." This may be the same ↓/↑ as the table rows rather than an extra change (§8).
  - "Alice's relationship status with Kara can actually drop a level if she and Kara sleep in the Abandoned Car. ** But it’s also possible that her relationship level can rebound as the chapter closes if you've otherwise been dedicated to making her happy."
  - **No stated change:** TALK TO PARKED ANDROID, TRASH COLLECTOR, reading magazines, DISTURB MAN, stealing or leaving items (only GIVE TOY counts), STEAL DISCREETLY vs TAKE TOO MUCH TIME as such, CUSTOMER ARRIVES / GIVE UP / RESUME HOLD UP, OPEN CASH REGISTER, GIVE UP after CLERK GRABS A GUN, motel check-in, BREAK INTO CAR, FIND ANOTHER OPTION, wire cutters, fences, every Ralph choice (CONVINCE, THREATEN WITH GUN, FOLLOW RALPH, GIVE UP, LEAVE SQUAT), START A FIRE, MAKE A BED, GIVE CHOCOLATE, WATCH ALICE FROM CHAIR, and the motel and squat endings as such.
  - Relationship levels (Relationship_Stat): Family / Trusted / Warm / Neutral / Distant (Initial).
- **Public opinion:** no change inside this chapter. The Fugitives page has no Public Opinion section. Downstream effects (see §4):
  - Public_Opinion, Small Decrease: "Staying in the motel and seeing a news report TV about Kara's escape in [[On the Run]]."
  - On_the_Run: "Todd was killed or injured in [[Stormy Night]], Kara & Alice stay in motel in [[Fugitives]], Kara switches on the TV to the news report about Todd's death/injury. {{Icon|down}}"
  - Public_Opinion, Small Decrease: "Turning on the TV in [[Zlatko]] if [[Kara]] was chased by [[Connor]] in [[On the Run]] or robbed the [[24|convenience store]] of its money in [[Fugitives]]." This conflicts with the Zlatko page (§8).
  - Public_Opinion notes: "Kara's actions can only decrease public opinion by a small amount with a total of four times."
- **Software instability:** not applicable. It is Connor-only (Software_Instability page).

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Stormy Night survival.** The chapter is played only if Kara and Alice caught the bus (KARA & ALICE EVADED TODD, KARA & ALICE FOUGHT THEIR WAY OUT, KARA SHOT TODD or ALICE SHOT TODD). Wiki overview: "provided players were successful in removing [[Alice]] from her home."
- **The gun.** The chart has three GUN TAKEN IN 'STORMY NIGHT' padlock gates: USE GUN (supermarket), DRAW GUN (caught shoplifting) and THREATEN WITH GUN (Ralph). Stormy Night lines (see ch07 note): ending KARA SHOT TODD / ALICE SHOT TODD "allows "Use gun" path during [[Fugitives]]"; Stormy Night "Kara takes the gun / Gun is available in [[Fugitives]]". The Fugitives wiki lines: "Use Gun - if used during [[Stormy Night]]"; "Draw Gun AND Leave Supermarket AND/OR Take Money - if used during [[Stormy Night]]"; "Convince OR Threaten With Gun - if used during [[Stormy Night]]".
- **What the gun changes here:** (a) a second way to get the register money (USE GUN), with its own customer/clerk-gun sub-branch; (b) on being caught shoplifting, Kara keeps the items and can take money (DRAW GUN) instead of handing them back; (c) a THREATEN WITH GUN option with Ralph; (d) cosmetic: Kara puts the gun on the motel TV stand. Without the gun, the only money route is the diversion, so a gunless motel run needs NOTICE CAN STACK and a passed STEAL DISCREETLY QTE.
- **Todd alive or dead** has no effect inside this chapter. It only selects the On the Run TV report.

### Out of this chapter

**Shelter (the ending) decides how On the Run starts.** On_the_Run: "The start of this chapter varies based on where Kara decided to stay in [[Fugitives]]."
- **Motel.** "Morning in Motel" > Talk to Alice ("bath?" / "hungry?" ↑) > Cut and Color Hair > Explore Motel Room > **Change Channel > Alice Hears About Todd** (the Todd news report; public opinion small ↓, from the On_the_Run line in §3) > Cheer Alice Up ("moving" / "determined" / "comforting" / "supportive" ↑) > Look For Breakfast > Kara Spots Police Forces > Connor interrogates the receptionist. Alice page: "When Kara looks at the TV hearing Todd was killed by her (determinant), Alice will try to cheer her up ... If Todd is alive, Alice will instead become angry that Todd is lying".
- **Squat.** Morning in Squat > clothes and hair upstairs > corpse in bathroom > "Ralph Wants a Family Meal" > Connor Investigates Squat. Alice changes in On the Run: refuse to sit ↑, "lie" ↑, "truth" ↓. This is the only start where Connor is sure to come to Kara's door. Detailed walkthrough: "If Kara and Alice stayed in the Squat or were spotted by the police, then the player will take control of Connor chasing them down".
- **Abandoned car.** Morning in the Parking Lot > Leave Alice Asleep in Car > rusted scissors > "Try to Open Car Trunk (only available if didn't obtain clothes in [[Fugitives]])" > crowbar > "Find Some Clothes" > Connor Investigates Supermarket > "Police Don't Have a Lead". Walkthrough: "The sparsest conditions are when Kara and Alice stayed in the car ... there are no opportunities to interact with her."

**Clothes (WEAR CLOTHES, padlock).**
- Motel entry, within this chapter.
- On the Run: "If Kara successfully stole the clothes in the laundromat from [[Fugitives]] she will not have the option to change her clothes if she stayed in the squat or abandoned car." The car's trunk clothes exist only if Kara has no clothes.
- On the Run, "Forgot Gun": "Kara must have taken the gun in Stormy Night, not taken the clothes from the laundromat and stayed in the Squat in Fugitive."
- Zlatko news flash: with stolen clothes on, she "is presumed human ... This video does not lower Public Opinion".
- Kara page: "if she stays in the abandoned car but does not take the jacket, she can remain in her uniform until after “Zlatko”".

**Robbery (any TAKE MONEY or STEAL DISCREETLY).**
- Zlatko: "See Newsflash of Escape (If Kara either robbed the supermarket in [[Fugitives]] or ran from the police in [[On the Run]])", which is a memory clue after a reset.
- Public_Opinion lists a small ↓ for "Turning on the TV in [[Zlatko]] if ... robbed the convenience store of its money". Zlatko notes say there are two robbery videos and the disguised one "does not lower Public Opinion". See §8.

**Ralph (MEET RALPH, padlock).**
- On the Run (squat start): the family meal, and whether Ralph shields Kara from Connor. Ralph page: "If Kara was kind to Ralph, then Ralph will intervene on their behalf ... If Kara threatened Ralph, they appear to be already fled and Ralph will tell Connor she has already left." The page doesn't say clearly whether this "threatened" is the Fugitives THREATEN WITH GUN or the On the Run meal threat; see §8.
- Battle for Detroit (camp): "Talk to Ralph (if Ralph attacked Connor in On The Run)"; "Ralph Intervenes (if Luther is dead, Kara stayed in the Squat, and Ralph is alive)". The Kara page says Kara can ask "Ralph (if met in "Fugitives")" to create a distraction. The Ralph page says "Ralph is among those sent to [[Recall Center Nº5]] if Kara ran into him in Fugitives and she didn't threaten him." On the Run note: "The only way to have Ralph reappear in [[Battle for Detroit]] is for Connor to find Kara and Alice in the Squat and have Ralph defend Kara."
- Zlatko memory clues: "Recall [[rA9]] Symbols (If Kara saw [[Ralph]] carve the symbols in [[Fugitives]])" and "Recall Squat Fireplace (If Kara chose to stay in the squat in [[Fugitives]])".
- Wiki: "It is possible to never come across Ralph at all during the whole game".

**Trash collector (TALK TO ANDROID TRASH COLLECTOR).** Zlatko overview: "receiving information about [[Zlatko Andronikov|Zlatko]]'s house from an android trash collector, Kara and Alice arrive at the house". The Alice page puts the On the Run decision this way: "they agree to go to the location the trash collector android gave them". On the chart it is an ordinary arrow node with no padlock.

**Wire cutters / pliers.** Wiki: "If Kara steals pliers from the store, it will later on be mentioned by Connor if she stayed at the house or car." On the Run (car start) includes "Connor Investigates Supermarket".

**Gun carried forward.** The gun is kept whatever happens here (Kara places it on the motel TV stand). In the squat it feeds On the Run's "Forgot Gun OR Take Gun Back" and the gun threat at the meal. Stormy Night note: "If Kara and Alice stay in the house in [[Fugitives]], the gun can be used in [[On the Run]]".

**Alice relationship** carries forward as a running total. Every ↑/↓ in §3 counts.

---

## 5. Endings

| Chart label | Icon | Conditions | Carries forward |
|---|---|---|---|
| ALICE & KARA STAYED IN MOTEL | none | CHECK MOTEL with HAVE MONEY AND DISGUISE (WEAR CLOTHES + money from TAKE MONEY or STEAL DISCREETLY) > receptionist > CHECK IN > ROOM 28 > REMOVE WET CLOTHES > TALK TO ALICE > promise group > optional gifts > KARA SLEEPS NEXT TO ALICE or WATCH ALICE FROM CHAIR. | On the Run motel start: Todd TV report (opinion ↓), extra Alice dialogue (↑), police arrive at the motel. Kara has to evade on foot; Connor chases only if she is spotted. |
| ALICE & KARA STAYED IN ABANDONED CAR | none | (a) INSIDE PARKING LOT > BREAK INTO CAR > STAY > GET IN CAR > TALK TO ALICE > promise group > optional gifts > KARA SLEEPS NEXT TO ALICE; or (b) TRASH COLLECTOR, then 12 minutes idle > ALICE TOO COLD > KARA SLEEPS NEXT TO ALICE (no promise or gifts on the chart). Alice **large ↓** either way. | On the Run parking-lot start: Alice asleep and no dialogue, trunk clothes if none were stolen, "Police Don't Have a Lead". |
| ALICE & KARA STAYED IN THE SQUAT | none | TAKE WIRE CUTTERS > CUT (either) FENCE > INSIDE SQUAT > MEET RALPH > CONVINCE or THREATEN WITH GUN > FOLLOW RALPH > START A FIRE + MAKE A BED > TALK TO ALICE > promise group > optional gifts > KARA SLEEPS NEXT TO ALICE or WATCH ALICE FROM CHAIR. | On the Run squat start: Ralph's family meal, Connor searches the squat, and (unless hidden) a highway chase. Zlatko "Recall Squat Fireplace". Ralph can appear in Battle for Detroit. Gun "Forgot Gun / Take Gun Back". |

No ending kills anyone, and none carries a death, failure or padlock icon. The promise question is asked at all three shelters (the Alice page: "No matter where you seek shelter, Alice will ask Kara if they will stay together forever"), except on the forced ALICE TOO COLD path as charted.

---

## 6. Media

- **Magazines, laundromat** (both on "top of the cupboard next to the door"):
  - #3 Century, "The Bee-Line to Disaster" (chart: READ "BEE-LINE TO DISASTER"). Facts: "Pollinating bees officially extinct"; the GIES "announced ... that wild bees are now officially extinct - living specimens exist only in captivity"; caused by Colony Collapse Disorder "accelerated by the overuse of pesticides in crops, parasites and pollution"; "one in three mouthfuls of food we eat relies on pollination of some kind"; famine will lead to "millions of deaths"; "[[CyberLife]], in cooperation with GIES, have come forward with plans on creating robotic bees"; Detroit Urban Farms is trying modified captive bee strains. Cover lines: "Cyber security expert warns: "your android could be hacked""; "Dating website discovered to have "less than 5% female members"".
  - #26 Gossips Weekly, "It's Time to Face the Music" (chart: READ "FACE THE MUSIC"). Facts: "For the younger generation, watching concerts in VR has become the norm"; "Nina & Kosuke Music have launched a campaign to bring back old-school concerts with live audiences"; the band Break the Wall will be among the first; next step "to bring back music festivals". Cover lines: ""My husband got an android pregnant" - story inside!"; "Ten ways to please your man - and keep him!"
  - Public-opinion effect: none for either magazine.
- **Broadcasts:** none sourced in this chapter. The wiki mentions only the motel's music ("Set Me Free" and "I'd Rather Be Alone" by Thornetta Davis). The motel TV news (Todd) and the "Cyber-Wildlife" android-zoo magazine both belong to **On the Run**. The Zlatko page records that "The news on the tv would originally report on whether or not Kara killed Todd" as cut content in Zlatko.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has seven chapter-10 scenes in this order: R10 (media), K05, K06, K07, R10b (media), K07b, K08. Engine logic in `benchmark/story-engine.mjs`: gates at lines 79 (K07b), 149–151 (option removal for K06, K07, K07b), consequences at lines 196–200, media predicates at lines 31–33, and the state fields `clothes`, `money`, `robbery`, `shelter`, `ralph`, `ralphHostile` at line 13. The `alice()` scale used there is ±1 for small and ±2 for large (see K07 car `alice(-2)`).

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| LAST STOP, LEAVE BUS | none | **Missing** as an event scene (fine as narration). |
| TALK TO PARKED ANDROID | none | Missing; no consequence, so acceptable to omit. |
| TALK TO ANDROID TRASH COLLECTOR | none | **Missing.** It is the in-story source of Zlatko's address. K10 (Zlatko) opens with "A man named {{Zlatko}} promised…" and has no lead-in. |
| ALICE TOO COLD (forced car, large ↓) | none | **Missing.** It is the hub's "do nothing" outcome. |
| Free-roam hub (visit in any order, back out of the car and the squat) | fixed sequence K05 > K06 > K07 | **Structural gap.** FIND ANOTHER OPTION, LEAVE PARKING LOT, GIVE UP and LEAVE SQUAT (backing out to try elsewhere) aren't modelled, and neither is visiting the store before the laundromat. Order only matters for the wiki's "Leave clothes, then steal" ↑/↓ pair. |
| INSIDE LAUNDROMAT, READ ×2 | R10 media | Covered. The facts are accurate. R10's situation ("While {{Alice}} warms up by the dryers") is fine. |
| INSPECT DRYER > LEAVE CLOTHES / STEAL CLOTHES | K05 options 1 / 0; `alice(+1)` / `alice(-1)` | Covered; the numbers match the wiki. |
| WEAR CLOTHES / DISTURB MAN (QTE) | none; K05 option 0 always succeeds | **Missing** QTE. **Mislabelled outcome:** K05 option 0 says Kara "cuts the marker from her temple". LED removal is an On the Run node ("Remove [[LED]]", after Cut and Color Hair), not Fugitives. |
| INSIDE SUPERMARKET, TALK TO CLERK, NOTICE CASH REGISTER, NOTICE CAN STACK | folded into K06 situation | Acceptable as narration. The situation's "The register is open whenever he turns away" isn't in any source. |
| STEAL/LEAVE CHOCOLATE BAR, TOY, WIRE CUTTERS; CLERK SPOTS KARA STEALING; DRAW GUN | none | **Missing.** The toy feeds GIVE TOY (↑). The wire cutters are one of two squat keys. DRAW GUN is a gun use with its own ↓ and an extra TAKE MONEY ↓. |
| USE ALICE AS A DIVERSION > STEAL DISCREETLY / TAKE TOO MUCH TIME | K06 option 0 (no risk); `money=true`, `alice(-1)`, `robbery='theft'` | Partly covered. The ↓ matches. The QTE failure (TAKE TOO MUCH TIME > caught > lose items, or DRAW GUN) is **missing**. |
| USE GUN > CUSTOMER ARRIVES > GIVE UP / RESUME HOLD UP > OPEN CASH REGISTER / "DON'T MOVE" > CLERK GRABS A GUN > GIVE UP / CONVINCE > TAKE MONEY | K06 option 1 (gated on `s.gun`); `money=true`, `alice(-1)`, `robbery='gun'` | **Collapsed and partly wrong.** The game has two give-up exits with no money and two money routes with opposite Alice effects: "DON'T MOVE" ↓ but CONVINCE ↑. The engine always applies ↓. The outcome text ("The clerk freezes with his hands up") matches only "DON'T MOVE". |
| Apologize / lie / truth to Alice after a robbery | none | Missing off-chart dialogue (↑ for apologize). |
| Take nothing | K06 option 2 | Covered. |
| K06 situation mentions the gun to gunless players | K06 situation: "If you have {{Todd}}'s gun you could simply point it at him." | Minor: the option is removed (engine line 149) but the prose still raises it. |
| CHECK MOTEL / HAVE MONEY AND DISGUISE gate | K07 option 0 removed unless `clothes && money` (line 150) | Covered. The gate matches PowerPyx. |
| INSIDE MOTEL > TALK TO RECEPTIONIST > CHECK IN > ROOM 28 > REMOVE WET CLOTHES | K07 option 0 outcome text | Acceptable as narration. The outcome says "a bed and a shower, and {{Alice}} falls asleep almost at once", which skips TALK TO ALICE. The order is fine only because K08 follows. |
| CHECK PARKING LOT > BREAK INTO CAR > STAY / FIND ANOTHER OPTION > GET IN CAR | K07 option 2; `alice(-2)` | Covered as a single choice; the large ↓ matches. FIND ANOTHER OPTION is missing. K07 calls it "a wrecked car" and the outcome says "a freezing, sleepless night" while the chart has KARA SLEEPS NEXT TO ALICE. Minor wording. |
| CHECK SQUAT > TAKE WIRE CUTTERS > CUT STREET / PARKING LOT FENCE > INSIDE SQUAT | K07 option 1 ("Break into the abandoned house"; outcome "{{Kara}} forces a way into the boarded-up house") | **Mislabelled.** In the game Kara cuts the fence with the generator pliers or stolen wire cutters. There's no forcing of the house, and no item gate. |
| MEET RALPH > CONVINCE / THREATEN WITH GUN / GIVE UP > FOLLOW RALPH / GIVE UP | K07b options 0/1/2 | **Mislabelled and merged with On the Run.** K07b's situation and option 1 ("refuse his food"; "later, a dead rodent he caught for her dinner") describe On the Run's "Ralph Wants a Family Meal". The Fugitives choice is CONVINCE vs THREATEN WITH GUN vs GIVE UP (leave), then FOLLOW RALPH vs GIVE UP. K07b has no "leave the squat" option, so once K07 picks the squat the ending is locked in. K07b option 0's `alice(+1)` has **no source**: no Ralph choice in Fugitives moves Alice. Option 2 setting `ralphHostile`: see §8. K07b's situation says "he has not threatened you", but the Ralph page says "Ralph is seen holding a knife and threatening Alice". |
| START A FIRE, MAKE A BED, LEAVE SQUAT | none (K07b option 0 outcome mentions the fire) | Missing as tasks. LEAVE SQUAT (abandon the squat ending) is **missing**. `fire:false` exists in state but isn't set here. |
| TALK TO ALICE > MAKE PROMISE / DON'T MAKE PROMISE | K08 options 0 / 1; `alice(+2)` / `alice(-1)` | Covered, but **the promise value is wrong**: the wiki gives a small ↑ ({{Icon|up}}), and +2 is the engine's large scale. Can't-promise −1 matches. |
| GIVE TOY / GIVE CHOCOLATE | none | **Missing** (toy ↑; chocolate refused, no change). |
| KARA SLEEPS NEXT TO ALICE / WATCH ALICE FROM CHAIR | none | **Missing** (↑ "x2" for sleeping beside, motel/squat only). |
| Endings MOTEL / ABANDONED CAR / THE SQUAT | `s.shelter` = motel / car / squat | Covered. On the Run predicates (`motel`, `motelToddDead/Alive`), K09 and C09a use it correctly. |
| R10b "The motel television" (android zoo) | media scene gated on `shelter==='motel'` | **Extra / unsourced.** No source has a TV broadcast in the Fugitives motel. The android-zoo facts come from the "Cyber-Wildlife" magazine in On the Run, which R13 already carries. Recommend removing it or replacing it with nothing. |
| Robbery news in Zlatko | R17 media, `robberyUniform` (effect `publicSupport −1`) and `robberyDisguise` (no effect) | Consistent with the Zlatko notes (the disguised video doesn't lower opinion). But both predicates require `robbery==='gun'`, so a diversion theft never triggers the news flash. The Zlatko flowchart says "If Kara either robbed the supermarket", and Public_Opinion says "robbed the convenience store of its money" with no method. See §8. |
| Todd TV report (On the Run) | R13, `motelToddDead/Alive`, `publicSupport −1` | Consistent with On_the_Run (killed **or** injured). Out of this chapter's scope. |
| Trash-collector address, Ralph rA9 carving, squat fireplace (Zlatko memories) | none | Missing downstream flags if Zlatko's memory recovery is rebuilt. |
| Pliers / wire cutters mentioned by Connor | none | Missing (minor flavour). |
| Clothes > On the Run trunk clothes and "Forgot Gun" | `s.clothes` exists | Not checked in this pass whether On the Run scenes use it. |

---

## 8. Open questions

1. **ALICE TOO COLD path.** The chart draws ALICE TOO COLD straight into the car's KARA SLEEPS NEXT TO ALICE, which bypasses TALK TO ALICE and the promise. Does the forced car night still ask the promise question and offer gifts? Does it still give the sleeping-beside ↑ in addition to the large ↓? (The wiki limits the sleeping ↑ to "the Squat or the Motel".)
2. **"x2" on sleeping beside Alice.** The Fugitives page says "{{Icon|up}} x2"; Relationship_Stat lists one entry with no multiplier. Is it two small increases, or one entry that applies to two locations?
3. **Lie / truth / apologize after a robbery.** The Notes say the relationship decreases when Alice asks how Kara got the money, then offer lie or truth. Is that the same ↓ as the "DON'T MOVE" row or an extra one? Do "lie" and "truth" have their own effects? Does "apologize" appear after a diversion theft (Fugitives page) or only after STEAL DISCREETLY / "DON'T MOVE" (Relationship_Stat)? The two pages word it differently.
4. **DRAW GUN outputs.** The chart edges suggest DRAW GUN > TAKE MONEY and DRAW GUN > LEAVE SUPERMARKET; the wiki says "AND/OR Take Money". Confirm that after drawing on the clerk Kara can choose whether to empty the register, and that this money opens the motel.
5. **Is the trash collector unmissable?** PowerPyx implies that talking to Alice eventually triggers it. If it can be skipped, how does Kara learn Zlatko's address in Zlatko?
6. **Threatening Ralph in Fugitives vs On the Run.** The engine's `ralphHostile` (set by K07b's gun option) makes Ralph give Kara away to Connor and keeps him out of the camp. The Ralph page attributes the betrayal to "If Kara threatened Ralph" without naming the chapter, and describes threats with the gun or a knife at the On the Run meal. The Recall Center line says "if Kara ran into him in Fugitives and she didn't threaten him". Which threat counts: Fugitives THREATEN WITH GUN, the On the Run meal threat, or either?
7. **Ralph in the camp.** The sources disagree on the condition. Battle for Detroit says "if Ralph attacked Connor in On The Run"; the Ralph page says met in Fugitives and not threatened; the On the Run note says only if Connor finds them and Ralph defends Kara.
8. **Robbery news and public opinion.** Public_Opinion: TV in Zlatko lowers opinion if Kara "robbed the convenience store of its money". The Zlatko page's own Public Opinion section lists only the chase, and its notes say the disguised-robbery video "does not lower Public Opinion". Does a diversion theft (no gun) count as a robbery for the news flash? Check in game.
9. **Turned away at the motel.** There is no chart node for being refused. Is it a dead end that just sends Kara back to the hub (as PowerPyx implies)?
10. **Pre-patch hold-up group.** The pre-100% screenshot showed three slots after CLERK GRABS A GUN; post-patch shows GIVE UP / CONVINCE. Confirm on the current game version that there is no third option, such as a shoot-out.
11. **Wire cutters from the store** need CHECK SQUAT first (PowerPyx). Confirm that the parking-lot pliers need it too, or whether they can be picked up any time.
12. **Shoplifting "less likely to be caught".** The wiki's "less likely" wording conflicts with PowerPyx's deterministic rule ("Stealing a second item will always get you busted"). Is there any randomness?

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter walkthrough link)
- https://www.powerpyx.com/detroit-become-human-fugitives-walkthrough-100/ (walkthrough text: inputs per node, the 12-minute ALICE TOO COLD timer, the one-item shoplifting rule, $40 motel requirement, Room 28 location, patch 1.05/1.06 notes)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-flowchart-100.jpg (full 100% chart; structure, edges, the three ending tiles, PowerPyx's last path)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-first-branch.jpg (legible hub labels, LAST STOP, LEAVE BUS, FIND SHELTER FOR THE NIGHT, ALICE TOO COLD, HAVE MONEY AND DISGUISE; header PUBLIC OPINION INDIFFERENT / ALICE WARM; 74% completion)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-laundromat-branch-1.jpg (legible laundromat branch, WEAR CLOTHES padlock, the two READ nodes, INSIDE MOTEL / TALK TO RECEPTIONIST)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-motel-branch.jpg (legible motel chain to ALICE & KARA STAYED IN MOTEL; the car ending tile; ALICE TOO COLD edge into the car's sleep node; pre-100% padlocks)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-parking-branch.jpg (legible parking-lot chain, STAY / FIND ANOTHER OPTION, the car's single KARA SLEEPS NEXT TO ALICE node)
- https://www.powerpyx.com/wp-content/uploads/detroit-fugitives-squat-branch.jpg (legible squat chain to ALICE & KARA STAYED IN THE SQUAT; pre-patch hold-up groups with `[...]` placeholders)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-fugitives-inside-supermarket-1.jpg (legible supermarket start: item pairs, TALK TO CLERK, NOTICE nodes, diversion/gun group, GUN TAKEN gate, TAKE WIRE CUTTERS / fence nodes)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-fugitives-inside-supermarket-2.jpg (legible full hold-up subtree, CLERK SPOTS KARA STEALING > DRAW GUN, TAKE MONEY, LEAVE SUPERMARKET; MEET RALPH > CONVINCE / THREATEN WITH GUN > FOLLOW RALPH / GIVE UP > START A FIRE / MAKE A BED / LEAVE SQUAT)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Relationship Changes, Notes, Unused Content; saved as /tmp/flowcharts/ch10/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (Alice levels and the Fugitives changes, including "even if she later does" and "Robbing the cash register")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (motel news and Zlatko robbery-news decreases; Kara's four small decreases)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor-only stat)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (magazines #3 and #26 located in Fugitives)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Bee-Line_to_Disaster&prop=wikitext&format=json (article text and location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=It's_Time_to_Face_the_Music&prop=wikitext&format=json (article text and location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json (the three shelter-dependent starts, motel Todd report ↓, trunk clothes, "Forgot Gun", Alice changes in On the Run)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json (trash-collector address, robbery news flash, rA9 and fireplace memories, conflicting opinion notes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Ralph&prop=wikitext&format=json (meeting, gun/hospitality, rA9 carving, later betrayal or defence, recall-centre condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Nathan_Clark&prop=wikitext&format=json (clerk; Back off!/Turn Around!/Bills!; convince outcome; caught without the gun)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Eastern_Motel&prop=wikitext&format=json ($40 room; "Archer")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (chapter summary, WR600 trash collector, toy accepted and candy refused, uniform note, Ralph in the camp)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (promise asked at every shelter; motel TV reaction in On the Run)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Kara_Leaving_Detroit&prop=wikitext&format=json (Ralph in the camp and "Ralph Intervenes" conditions)
- https://detroitbecometext.github.io/chapters/10 (transcript linked from the wiki; a JavaScript app that couldn't be read with curl, so not used)

---

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/10-fugitives-chapter-content/fugitives-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt/render916.py` (resolves every `t()` and `translateObject()` key against `en.json`; `--dialogue` also prints the lines). Outline saved to `/tmp/dbt/ch10.txt`, with dialogue to `/tmp/dbt/ch10-dialogue.txt`. All keys resolved.
- Counts: 22 prompts (choice groups), 60 options (this includes the three ungrouped options under "Be seen stealing" and the four `TRUTH` follow-ups, which the template nests directly under `TRUTH` without their own group), 0 clues (no observation items or case files), 16 stat arrows (all Alice: 2 large down, 7 small up, 7 small down), 7 unlock conditions, 0 cut/unused blocks.

In the outline, `[LABEL]` marks an option the template draws with brackets (an unlockable option). `CONDITION (Lock)` is an unlock condition. `VARIANT` is one branch of a conditioned group. `NOTE` is the transcribers' own text (`ø` means the option has no lines).

### Rendered outline

```text
# In the bus
NOTE: NOV 5TH, 2038
NOTE: PM 10:58
PROMPT (choice group):
  OPTION "STAY HERE?"
  OPTION "SHELTER?"
# In the street
## Going too far away
## Talking to parked androids
## Alice sits at the bus stop
## Take too much time
NOTE: Kara and Alice will go stay in the abandoned car.
ARROW: Alice LargeDown
# In the supermarket
## Watch TV
## Talk to the Clerk
CONDITION GROUP:
  VARIANT:
    NOTE: Kara is in android uniform
  VARIANT:
    NOTE: Kara stole clothes
    PROMPT (choice group):
      OPTION "NO"
      OPTION "HELP"
## Try to steal money
CONDITION GROUP:
  VARIANT:
    NOTE: Threaten the clerk with the gun
    CONDITION (Lock): Took the gun in Stormy Night
    PROMPT (choice group):
      OPTION "SINCERE"
      OPTION "CALM"
      OPTION "AGGRESSIVE"
    PROMPT (choice group):
      OPTION "CASH REGISTER"
    PROMPT (choice group):
      OPTION "STAY"
        PROMPT (choice group):
          OPTION "BACK OFF!"
          OPTION "TURN AROUND!"
          OPTION "OPEN THE REGISTER!"
          OPTION "BILLS!"
            CONDITION (Lock): Chose OPEN REGISTER
            PROMPT (choice group):
              OPTION "CONVINCE"
              OPTION "GIVE UP"
      OPTION "LEAVE"
        NOTE: ø
    CONDITION GROUP:
      VARIANT:
        NOTE: Kara stole the money without convincing the clerk
    NOTE: If Kara convinced the clerk to get the money, the dialogue will go directly to the LIE option with an increase in relationship level.
    ARROW: Alice SmallUp
    NOTE: Otherwise, there will be a decrease.
    ARROW: Alice SmallDown
    PROMPT (choice group):
      OPTION "TRUTH"
        OPTION "FACTUAL"
        OPTION "JUSTIFY"
        OPTION "UNCERTAIN"
        OPTION "APOLOGIZE"
          ARROW: Alice SmallUp
      OPTION "LIE"
  VARIANT:
    NOTE: Use Alice as a diversion
    CONDITION (Lock): Kara noticed the can stack
    ARROW: Alice SmallDown
    PROMPT (choice group):
      OPTION "FACTUAL"
      OPTION "JUSTIFY"
      OPTION "UNCERTAIN"
      OPTION "APOLOGIZE"
        ARROW: Alice SmallUp
## Be seen stealing
OPTION "[GUN]"
  CONDITION (Lock): Took the gun in Stormy Night
  ARROW: Alice SmallDown
  PROMPT (choice group):
    OPTION "ANGRY"
    OPTION "APOLOGETIC"
    OPTION "CALM"
OPTION "LEAVE"
  CONDITION (Lock): Kara is seen stealing from the register
OPTION "PUT BACK"
  CONDITION (Lock): Kara is seen stealing food or a toy
# In the Laundromat
## Open the washing machine
PROMPT (choice group):
  OPTION "STEAL"
    ARROW: Alice SmallDown
    CONDITION GROUP:
      VARIANT:
        NOTE: Fail to steal
        NOTE: They leave the laundromat.
  OPTION "DON'T STEAL"
    ARROW: Alice SmallUp
# At the Motel
CONDITION GROUP:
  VARIANT:
    NOTE: Still in android uniform and no money
  VARIANT:
    NOTE: Stole the clothes in the laundromat but don't have money
  VARIANT:
    NOTE: Didn't steal the clothes but got money
## Have clothes and money : going in the motel
PROMPT (choice group):
  OPTION "IN THE CAR"
  OPTION "FORGOT"
  OPTION "NO LICENSE"
  OPTION "SAY NOTHING"
## In the room
## Talking with Alice
PROMPT (choice group):
  OPTION "PROMISE"
    ARROW: Alice SmallUp
  OPTION "CAN'T PROMISE"
    ARROW: Alice SmallDown
PROMPT (choice group):
  OPTION "FOREVER"
CONDITION GROUP:
  VARIANT:
    NOTE: Stole a toy at the supermarket
  VARIANT:
    NOTE: Stole a chocolate bar at the supermarket
# At the squat
## Found a wire cutter: going through the fence
PROMPT (choice group):
  OPTION "ANDROID"
  OPTION "LITTLE GIRL"
  OPTION "INNOCENT"
  OPTION "JUSTIFY"
PROMPT (choice group):
  OPTION "[GUN]"
  OPTION "INSIST"
  OPTION "REASSURE"
  OPTION "HOSPITALITY"
    CONDITION (Lock): Kara doesn't have the gun
  OPTION "LEAVE"
    NOTE: They leave the squat.
PROMPT (choice group):
  OPTION "LEAVE"
    NOTE: They leave the squat.
  OPTION "STAY"
## Talk to Ralph
## Talking with Alice
PROMPT (choice group):
  OPTION "PROMISE"
    ARROW: Alice SmallUp
  OPTION "CAN’T PROMISE"
    ARROW: Alice SmallDown
PROMPT (choice group):
  OPTION "FOREVER"
# In the parking lot
## Looking at the car
PROMPT (choice group):
  OPTION "STAY HERE"
    ARROW: Alice LargeDown
    PROMPT (choice group):
      OPTION "PROMISE"
        ARROW: Alice SmallUp
      OPTION "CAN’T PROMISE"
        ARROW: Alice SmallDown
    PROMPT (choice group):
      OPTION "FOREVER"
  OPTION "KEEP SEARCHING"
```

### Discrepancies with sections 1 to 3

The template is a transcript, so it holds the dialogue prompts but none of the free-roam actions. It has no shoplifting pairs, no `NOTICE` nodes, no fence cutting, no fire or bed tasks, no gift prompt and no sleeping-place prompt. Where it is silent, the chart (structure) and the wiki (numbers) stand. The items below are the places where it adds to or contradicts the note.

1. **Bus prompt missing from the note.** The template opens with a prompt on the bus: `STAY HERE?` / `SHELTER?` (the driver refuses both). The note starts at `LAST STOP` > `LEAVE BUS` and has no prompt there. There is no arrow. Template wins: add it.
2. **Clerk prompt.** The template's "Talk to the Clerk" has two variants. In android uniform, Kara asks for help with no prompt and the clerk is hostile. In stolen clothes, the clerk asks "Can I help you?" and Kara picks `NO` / `HELP`; with `HELP`, the clerk refuses. The note (D5, §1 Notes) has the attitude difference but not the `NO` / `HELP` prompt. Template wins for the labels.
3. **Gun hold-up prompts.** Note D6 to D8 give `GIVE UP` / `RESUME HOLD UP`, then `OPEN CASH REGISTER` ("Bills!") vs `"DON'T MOVE"` ("Back off!" / "Turn around!"), then `GIVE UP` / `CONVINCE`. The template has five prompts:
   - `SINCERE` / `CALM` / `AGGRESSIVE` (how Kara draws on the clerk);
   - `CASH REGISTER` (a single option);
   - `STAY` / `LEAVE` when the customer arrives (chart `RESUME HOLD UP` / `GIVE UP`);
   - `BACK OFF!` / `TURN AROUND!` / `OPEN THE REGISTER!` / `BILLS!`, where `BILLS!` is locked behind "Chose OPEN REGISTER" and is the line after which the clerk warns "You better get outta here before things get nasty";
   - `CONVINCE` / `GIVE UP`.

   So the chart's `OPEN CASH REGISTER` corresponds to `OPEN THE REGISTER!` followed by `BILLS!`, not to `BILLS!` alone. The note is also missing the first two prompts. Template wins for the labels and the `BILLS!` lock; the chart keeps its node grouping.
4. **Where the robbery arrows sit.** The note's table puts a small down on `"DON'T MOVE"` and a small up on `CONVINCE` (wiki). The template has no arrow on any hold-up button. It puts one arrow on Alice's question "Wait! How did you get it?": a small up if Kara convinced the clerk ("the dialogue will go directly to the LIE option with an increase"), otherwise a small down. The net effect is the same, so template placement wins. This answers open question 3: the Notes' decrease is the same arrow, not an extra one.
5. **Post-robbery prompt.** After a gun robbery without convincing, the template offers `TRUTH` / `LIE`. `TRUTH` leads to `FACTUAL` / `JUSTIFY` / `UNCERTAIN` / `APOLOGIZE`, and `APOLOGIZE` is a small up; `LIE` has no arrow. After the diversion, the template goes straight to `FACTUAL` / `JUSTIFY` / `UNCERTAIN` / `APOLOGIZE` (`APOLOGIZE` small up) with no lie option. Note D9 has no labels and leaves open where "apologize" is offered. Template wins: apologize is offered after both the diversion and a gun robbery (via `TRUTH`), but never after `CONVINCE`.
6. **Diversion gate.** The note says `USE ALICE AS A DIVERSION` requires `NOTICE CASH REGISTER` and `NOTICE CAN STACK`. The template's lock says only "Kara noticed the can stack". The chart draws both `NOTICE` nodes into the group, so the flowchart wins for the structure (both); the template's text is the condition as the game words it.
7. **Caught stealing: one arrow, not two.** Note D4 and the §3 table: `DRAW GUN` is a small down, and `TAKE MONEY` is "a further ↓" (Relationship_Stat sub-bullet "Robbing the cash register"). The template's "Be seen stealing" has `[GUN]` (locked on "Took the gun in Stormy Night") with one Alice small down, followed by `ANGRY` / `APOLOGETIC` / `CALM` ("get down on the floor"). Template wins: one small down. It also gives the gunless exits as `LEAVE` (locked on "Kara is seen stealing from the register") and `PUT BACK` (locked on "Kara is seen stealing food or a toy"). The note has neither label.
8. **Laundromat button labels.** The template's buttons are `STEAL` (Alice small down) and `DON'T STEAL` (Alice small up). The chart's `STEAL CLOTHES` / `LEAVE CLOTHES` remain the node names. The template's "Fail to steal" variant ("They leave the laundromat.") is the chart's `DISTURB MAN`. The arrows match the note.
9. **Motel ID prompt.** The template gives the check-in excuses as `IN THE CAR` / `FORGOT` / `NO LICENSE` / `SAY NOTHING`, all with the same result ("No worries. We can deal with it tomorrow"). The note says only "use any excuse". Template wins for the labels. Its three turned-away variants (uniform and no money; clothes but no money; money but no clothes) are dialogue only, with no node or prompt. That supports open question 9: Kara is simply turned back.
10. **`FOREVER` prompt.** After `PROMISE` / `CAN'T PROMISE`, every shelter has a one-option prompt `FOREVER` ("Will we be together forever?"). The note does not list it. There is no arrow.
11. **Gifts.** The template has the toy and chocolate only as conditioned lines after Kara turns off the light: "Stole a toy at the supermarket" gives "Look, what I've got for you…" / "Thanks.", and the chocolate variant gives "I have a chocolate bar. Are you hungry?". There is no prompt and no arrow. The note (D17, §3) gives `GIVE TOY` a small up from the wiki. By the README, the template wins for arrows, so it is read as no arrow. However, the chart has `GIVE TOY` as an action node and the wiki and Relationship_Stat both list the up, so flag this for the operator. The template's versions appear only in the motel section.
12. **Sleeping place.** The template has no `KARA SLEEPS NEXT TO ALICE` / `WATCH ALICE FROM CHAIR` prompt and no arrow there. It is silent, so the chart and the wiki's small up ("x2", open question 2) stand.
13. **Ralph prompts.** The note uses the chart's `CONVINCE` / `THREATEN WITH GUN` / `GIVE UP` > `FOLLOW RALPH` / `GIVE UP`, plus the wiki's `LITTLE GIRL` and `HOSPITALITY`. The template has three prompts:
    - `ANDROID` / `LITTLE GIRL` / `INNOCENT` / `JUSTIFY`;
    - `[GUN]` / `INSIST` / `REASSURE` / `HOSPITALITY` / `LEAVE`, where `HOSPITALITY` is locked on "Kara doesn't have the gun", so `[GUN]` and `HOSPITALITY` are mutually exclusive, and `LEAVE` exits ("They leave the squat.");
    - `LEAVE` / `STAY`.

    None carries an arrow, which agrees with the note's "every Ralph choice" having no stated change. Template wins for the labels. The chart's `CONVINCE` covers `INSIST` / `REASSURE` / `HOSPITALITY`, and the chart's `GIVE UP` and `FOLLOW RALPH` are `LEAVE` and `STAY`.
14. **`ALICE TOO COLD` has no promise.** The template's "Take too much time" section ("Can't go on, Kara… Too cold…") carries the Alice large down. It ends with Kara's "We're better off staying" line and no `PROMISE` prompt. That answers the first half of open question 1: no promise on the forced path. The template does not cover gifts or the sleeping up there either.
15. **Car prompt labels.** Template: `STAY HERE` (Alice large down, then the promise prompts) / `KEEP SEARCHING`. Chart: `STAY` / `FIND ANOTHER OPTION`. The note follows the chart; the arrow matches. Template wins for the button labels.
16. **Supermarket TV.** Note §6: "Broadcasts: none sourced in this chapter". Note §7 calls `R10b` "Extra / unsourced" and assigns the android-zoo facts to On the Run's "Cyber-Wildlife" magazine. The template has a "Watch TV" section in the supermarket with a Channel 16 (Michael Webb) report: "The first CyberLife zoo in Detroit opened its gates to the first visitors today following a grand inauguration. Hundreds of species, most of them now extinct, have been recreated in more than 100 acres of natural environments using CyberLife's android technology. Guests can now experience polar bears, leopards, elephants and even two blue whales... CyberLife has announced the opening of eleven new android zoos all over the country". Template wins: this chapter has one broadcast, in the supermarket, with no public-opinion arrow.
17. **Trash collector.** The template places the WR600's lines ("You look lost." / "I know someone who can help you." / "But, that's on the other side of town…") under "Alice sits at the bus stop", with no prompt. This supports PowerPyx's description that the scene is triggered by stopping with Alice rather than by a chosen talk action (open question 5). The chart label `TALK TO ANDROID TRASH COLLECTOR` stands.

### Discrepancies with the benchmark

Scenes: `R10`, `K05`, `K06`, `K07`, `R10b`, `K07b`, `K08` (`story.json` 1.6.0); engine `story-engine.mjs` line 85 (`K07b` gate), lines 159-161 (option removal), lines 212-216 (effects).

Matches, for the record:
- `K05` options 0 / 1 apply Alice -1 / +1, matching `STEAL` small down / `DON'T STEAL` small up.
- `K06` option 0 applies Alice -1, matching the diversion small down.
- `K07` option 2 applies Alice -2, matching `STAY HERE` large down.
- `K08` option 1 applies Alice -1, matching `CAN'T PROMISE` small down.
- `K06` removes option 1 without the gun, and `K07b` removes option 2 without the gun. These match the template's `Took the gun in Stormy Night` lock and the `[GUN]` bracket.

Missing prompts and labels:

1. **Bus prompt** `STAY HERE?` / `SHELTER?` is missing (no scene before `R10`).
2. **Forced car path.** "Take too much time" (Alice large down, no promise) has no scene. The trash collector's lines ("I know someone who can help you") are also absent, so `K10` (Zlatko) has no lead-in.
3. **Supermarket TV misplaced.** The template's broadcast is in the supermarket and is open to every route. `R10b` puts it on the motel TV ("The motel room television is on when you come in"), gated on `when: "motel"`, and titles it "the local news" rather than a Channel 16 report. Its fact omits the eleven new zoos and the named animals. The scene should move to the supermarket, ungated.
4. **Clerk prompt** `NO` / `HELP` (offered only in stolen clothes) is missing. `K06` says only "the clerk shrugs when you ask for help", and it shows that line whether or not Kara wears the clothes (`K06` comes after `K05` either way).
5. **Gun hold-up prompts missing.** `K06` option 1 collapses five prompts: `SINCERE` / `CALM` / `AGGRESSIVE`; `CASH REGISTER`; `STAY` / `LEAVE`; `BACK OFF!` / `TURN AROUND!` / `OPEN THE REGISTER!` / `BILLS!` (with the `BILLS!` lock); and `CONVINCE` / `GIVE UP`. The two no-money exits (`LEAVE` when the customer arrives, `GIVE UP` at the clerk's gun) are also missing.
6. **Gun robbery arrow wrong on the convince route.** The engine applies Alice -1 on every `K06` option 1. The template gives a small down only if Kara did not convince the clerk. Convincing gives a small up, and the two give-up exits give none.
7. **Post-robbery prompt missing.** `TRUTH` (then `FACTUAL` / `JUSTIFY` / `UNCERTAIN` / `APOLOGIZE`) / `LIE` after a gun robbery is missing, and so is the `APOLOGIZE` small up.
8. **Post-diversion prompt missing.** `FACTUAL` / `JUSTIFY` / `UNCERTAIN` / `APOLOGIZE` (the last a small up) after `K06` option 0 is missing.
9. **Diversion lock.** The template locks the diversion on "Kara noticed the can stack". `K06` option 0 is always offered, and there is no noticing action.
10. **"Be seen stealing" missing.** `[GUN]` (Alice small down, then `ANGRY` / `APOLOGETIC` / `CALM`), `LEAVE` (seen at the register) and `PUT BACK` (seen with food or a toy) have no scene. The shoplifting and diversion failure that lead there (chart nodes) are missing too.
11. **`K05` labels.** Template: `STEAL` / `DON'T STEAL`. `K05`: "Take the sleeping man's clothes." / "Listen to {{Alice}} and leave them.". The template's "Fail to steal" variant has no counterpart, because option 0 always succeeds. `K05` outcome 0 ("cuts the marker from her temple") has no basis in this template; the laundromat section contains no LED removal.
12. **Motel ID prompt** `IN THE CAR` / `FORGOT` / `NO LICENSE` / `SAY NOTHING` is missing. `K07` outcome 0 says "The night clerk barely looks up".
13. **Car prompt.** `KEEP SEARCHING` (back out) is missing; the `K07` option 2 label ("Spend the night in the abandoned car.") is not the game's `STAY HERE`.
14. **Squat entry.** `K07` option 1 is "Break into the abandoned house." / "{{Kara}} forces a way into the boarded-up house". The template's section is "Found a wire cutter: going through the fence" ("it's just a scratch"). The label is wrong, and there is no item gate.
15. **Ralph prompt 1** `ANDROID` / `LITTLE GIRL` / `INNOCENT` / `JUSTIFY` is missing.
16. **Ralph prompt 2 labels and gate.** Template: `[GUN]` / `INSIST` / `REASSURE` / `HOSPITALITY` / `LEAVE`. `K07b`: option 0 "Accept his hospitality and treat him kindly.", option 1 "Stay polite but keep {{Alice}} away from him and refuse his food.", option 2 "Pull the gun on him...". `INSIST`, `REASSURE` and `LEAVE` are missing. Option 1's "refuse his food" belongs to On the Run's family meal, as does the situation's "a dead rodent he caught for her dinner". `HOSPITALITY` is locked on "Kara doesn't have the gun", but the engine never removes `K07b` option 0 when Kara has the gun.
17. **Ralph prompt 3** `LEAVE` / `STAY` is missing, so the squat ending cannot be abandoned once `K07` option 1 is picked.
18. **Extra arrow on `K07b`.** The engine applies `alice(1)` on `K07b` option 0. No Ralph option in the template carries an arrow.
19. **Promise arrow size.** The engine applies `alice(2)` (large) on `K08` option 0. The template's `PROMISE` is `SmallUp` at all three shelters.
20. **`K08` labels and prompt.** Template: `PROMISE` / `CAN'T PROMISE`, then `FOREVER`. `K08`: "Promise her you will always be together." / "Tell her honestly that you cannot promise that.", and no `FOREVER` prompt. The situation's lead-in ("you tell her about going somewhere safe, maybe across the border") is not in the template, where Alice first asks "Why didn't he ever love me?..." and then "You'll never leave me, right? Promise you'll never go!". The outcomes' "somewhere safe across the river" line is not in the template either.
21. **Gifts.** The template's toy and chocolate lines (conditioned on stolen items) have no counterpart, because the benchmark has no stolen items. The template gives them no arrow, so nothing is lost in stats.
22. **`K08` on the forced car path.** The engine plays `K08` for every shelter. That matches the template, which has the promise at the motel, the squat and `STAY HERE`, but not on "Take too much time", so a rebuilt forced-car path should skip it.

Source priority: template for labels, prompts and arrows (items 1-22); the chart for structure the template omits (shoplifting, noticing, fences, fire and bed, sleeping place); the wiki only where the template is silent (sleeping-beside small up, the 12-minute timer, the $40 room).
