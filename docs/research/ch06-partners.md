# Chapter 6: Partners (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's `Partners/Flowchart` template, the `Partners (Transcript)` page, and the stat, magazine and later-chapter pages listed under Sources. Working files are in `/tmp/flowcharts/ch06/` (not committed).

Game date and time on the wiki infobox: November 5, 2038, 11:21PM. Locations: Jimmy's Bar; 6413 Pines Street (Carlos Ortiz's house). Wiki: "This chapter has two different outcomes." (`|endings=2`).

---

## 1. Flowchart transcription

Read from `Detroit-Partners-1-008.jpg`, `Detroit-Partners-2-007.jpg`, `Detroit-Partners-3-009.jpg` (zoomed sections) and `Detroit-Partners-4-010.jpg` (whole chart), cross-checked against the wiki's own screenshot (`Partners_Flowchart_-_Detroit_Become_Human.jpg`) and the wiki `Partners/Flowchart` template. Both screenshots show the same node set.

Chart header (PowerPyx run): `100% COMPLETED` / `PARTNERS` / `PUBLIC OPINION INDIFFERENT` / `SOFTWARE INSTABILITY ???` / `HANK NEUTRAL`. (The wiki's screenshot shows `PUBLIC OPINION SKEPTICAL`, `SOFTWARE INSTABILITY ???`, `HANK NEUTRAL`.) Software instability is displayed as `???` at this point in the game.

Icon key used below (as drawn on the chart): [arrow] = action/interaction, [magnifier] = clue/analysis, [triangle] = event, [speech] = dialogue, [choice] = the overlapping-squares choice marker, [lock] = yellow cross-chapter-impact padlock, [check]/[cross] = success/failure marks. Blue fill = reached in that playthrough, grey = not reached.

### Phase A: the bar

| # | Node (as printed) | Icon | Notes |
|---|---|---|---|
| 1 | `IN FRONT OF THE BAR` | checkpoint (large node with Jimmy's Bar image) | chapter start |
| 2 | `ENTER JIMMY'S BAR` | [arrow] | |
| 3 | `FACE SCAN CUSTOMERS` | [arrow] | upper branch; optional (scan any one patron) |
| 4 | `FACE SCAN LT. ANDERSON` | [arrow] | lower branch; required |
| 5 | `TALK TO LT. ANDERSON` | [speech] | |
| 6 | `BUY HIM ANOTHER DRINK` | [choice] group, option 1 | blue in PowerPyx run |
| 7 | `WAIT OUTSIDE` | [choice] group, option 2 | |
| 8 | `SPILL HANK'S DRINK` | [choice] group, option 3, [lock] | cross-chapter impact |

### Phase B: the crime scene

| # | Node | Icon | Notes |
|---|---|---|---|
| 9 | `CONNOR AND HANK ARRIVE AT SCENE` | checkpoint (large node with image) | |
| - | `CRIME SCENE` | bracketed phase label (not a node) | all following nodes until #31 hang from this bracket, upper fan then lower fan |

Upper fan (top to bottom, left to right as drawn):

| # | Node | Icon | Follows |
|---|---|---|---|
| 10 | `EXAMINE EDEN CLUB FLYER` | [arrow] | CRIME SCENE |
| 11 | `EXAMINE CHAIR` | [arrow] | CRIME SCENE |
| 12 | `ANALYZE RED ICE` | [arrow] | CRIME SCENE |
| 13 | `ANALYZE BASEBALL BAT` | [magnifier] | CRIME SCENE |
| 14 | `RECONSTRUCT ASSAULT WITH BAT` | [triangle] | #13 |
| 15 | `ANALYZE CARLOS' BODY` | [magnifier] | CRIME SCENE |
| 16 | `RECONSTRUCT CARLOS' LAST MOMENTS` | [triangle] | #15 |
| 17 | `SAMPLE BLOOD` | [arrow] | CRIME SCENE |
| 18 | `OPEN CLOSET` | [arrow] | CRIME SCENE |
| 19 | `READ "ANDROID SEX"` | [arrow] | CRIME SCENE (magazine) |

Lower fan:

| # | Node | Icon | Follows |
|---|---|---|---|
| 20 | `READ "ANDROID SPY"` | [arrow] | CRIME SCENE (magazine) |
| 21 | `ANALYZE BACKYARD` | [arrow] | CRIME SCENE |
| 22 | `INVESTIGATE WRITING` | [magnifier] | CRIME SCENE |
| 23 | `CHECK SHOWER` | [magnifier] | CRIME SCENE |
| 24 | `EXAMINE STATUE` | [arrow] | #23 |
| 25 | `ANALYZE KNIFE` | [magnifier] | CRIME SCENE |
| 26 | `ANALYZE MISSING KNIFE` | [magnifier] | CRIME SCENE |
| 27 | `ANALYZE BLOOD ON WALLS` | [magnifier] | CRIME SCENE |
| 28 | `HANK WANTS TO GO` | [triangle] | CRIME SCENE (timer event); grey in both screenshots |
| 29 | `ASK FOR MORE TIME` | [speech] | #28 |
| 30 | `HANK REFUSES` | [choice] group, option 1 | #29; automatic, not a player choice |
| 31 | `HANK ACCEPTS` | [choice] group, option 2 | #29; automatic |

### Phase C: outcome

| # | Node | Icon | Follows |
|---|---|---|---|
| 32 | `CONNOR KNOWS WHAT HAPPENED` | [triangle] | CRIME SCENE bracket (investigation complete) |
| 33 | `OUT OF TIME` | [triangle] | CRIME SCENE bracket (after HANK ACCEPTS, timer runs out again) |
| 34 | `HANK ENDS INVESTIGATION` | [triangle] | #30 HANK REFUSES |
| 35 | `REPORT TO LT. ANDERSON` | large focus node with image | #32 |
| 36 | `RECONSTRUCT THE CRIME` | [choice] group, option 1, [check] | #35 |
| 37 | `FAIL TO RECONSTRUCT THE CRIME` | [choice] group, option 2, [cross] | #35 |
| 38 | `FOLLOW BLUE BLOOD TO ATTIC` | [arrow] | #36 |
| 39 | `SEARCH ATTIC` | [arrow] | #38 |
| 40 | `FOUND DEVIANT` | ending (large node with image), [lock] | #39 |
| 41 | `CRIME UNSOLVED` | ending (large node with image, white label, no icon) | #33, #34, #37 |

Total: 41 nodes (excluding the `CRIME SCENE` bracket label). Two endings: `FOUND DEVIANT` and `CRIME UNSOLVED`. Lines into `CRIME UNSOLVED` come from `OUT OF TIME`, `HANK ENDS INVESTIGATION` and `FAIL TO RECONSTRUCT THE CRIME`.

Nodes grey (unreached) in the PowerPyx 100% screenshot: `WAIT OUTSIDE`, `SPILL HANK'S DRINK`, `HANK WANTS TO GO`, `ASK FOR MORE TIME`, `HANK REFUSES`, `HANK ACCEPTS`, `OUT OF TIME`, `HANK ENDS INVESTIGATION`, `FAIL TO RECONSTRUCT THE CRIME`, `CRIME UNSOLVED` (the chart shows them because "100%" here means all nodes revealed, not all reached).

The wiki's `Partners/Flowchart` template matches node for node, with these wording differences: it labels node 3 "Face scan other customers", node 8 "Spill his drink", and annotates "Hank accepts: If you didn't spill his drink", "Hank refuses: If you spilled his drink", "Out of time: If Hank wanted to leave, gave you more time, and you ran out of time again". The in-game chart label is `SPILL HANK'S DRINK`.

---

## 2. Choices and gates

### 2a. Bar dialogue (not on the chart)

After introducing himself, Connor gets two rounds of the same four dialogue buttons (transcript shows the four-way tabber twice; PowerPyx: "After selecting two of the choices above, you will be given three options"):

| Option | Line | Hank |
|---|---|---|
| `REASON` | "Listen, I think you should stop drinking and come with me. It'll make life easier for both of us." | no change |
| `THREATEN` | "Lieutenant Anderson, I must inform you that I intend to file a report on your behavior." | small down |
| `UNDERSTANDING` | "I understand that some people are not comfortable in the presence of androids but I am-" | no change |
| `PERSIST` | "I'm sorry, Lieutenant, but I must insist. My instructions stipulate that I have to accompany you." | small down |

No gate. Two of the four are spoken; none ends the scene.

### 2b. Bar choice (on the chart: nodes 6 to 8)

| Option | What happens (transcript) | Requires | Leads to |
|---|---|---|---|
| `BUY HIM ANOTHER DRINK` | Connor buys "one for the road"; Hank: "Make it a double", drinks, then "(intrigued) Did you say homicide?" | none | `CONNOR AND HANK ARRIVE AT SCENE`; later `HANK ACCEPTS` and Connor can say "Remember the drink I bought you at the bar?" |
| `WAIT OUTSIDE` | "I apologize, Lieutenant. I didn't mean to bother you... I'll wait for you outside. Take your time." Hank stops him: "Did you say homicide?" | none | `CONNOR AND HANK ARRIVE AT SCENE`; later `HANK ACCEPTS` |
| `SPILL HANK'S DRINK` | Connor pours the drink out and sets the glass upside down: "I think we can go now." Hank grabs and shakes him; Connor: "Your sense of duty, Lieutenant. And the cost of repairs if you damage me. For your information, I'm worth a small fortune." Hank leaves. | none | `CONNOR AND HANK ARRIVE AT SCENE`; later `HANK REFUSES`; cross-chapter "LAST NIGHT" dialogue |

All three options lead to the crime scene; Hank always goes. No timer is documented on this choice.

### 2c. Car dialogue (not on the chart)

Hank: "You wait here. I won't be long."

| Option | Line | Hank |
|---|---|---|
| `PATIENT` | "Whatever you say, Lieutenant." | small up |
| `FIRM` | "No way! I'm coming with you." | small down |
| `DIPLOMATIC` | "My instructions are to accompany you to the crime scene, Lieutenant." | small up |

All three end with `CONFLICTING ORDERS SELECTING PRIORITY` and Connor following Hank anyway. No gate.

### 2d. The investigation (nodes 10 to 27)

Not choices: a free-roam search under a timer. Objectives (wiki infobox): "Listen to briefing", "Examine victim", "Review 10 pieces of evidence". The investigation completes (`CONNOR KNOWS WHAT HAPPENED`) when the transcript shows `REVIEW EVIDENCE 10/10` and `INVESTIGATE CRIME SCENE` complete.

Every clue and interaction, with the in-game clue text from the transcript:

| Chart node | Where | Clue text / effect |
|---|---|---|
| `ANALYZE CARLOS' BODY` | living room | 4 clues: hand `FINGERPRINTS`; stomach `28 KNIFE WOUNDS` ("Internal bleeding, 28 stab wounds"); mouth `RED ICE`; face `DECEASED` `ORTIZ, CARLOS` (Height 5' 6", Weight 286.6 lbs). `0/4 CLUES TO ANALYZE` to `4/4 RECONSTRUCT CALCULATED` |
| `RECONSTRUCT CARLOS' LAST MOMENTS` | living room | events `VICTIM FELL HERE`, `VICTIM WAS STABBED`, `THEY CAME FROM THE KITCHEN` (`RECONSTRUCT COMPLETED 3/3`). Connor: "He was stabbed 28 times." PowerPyx: this reconstruction is the first of the 10 pieces of evidence |
| `ANALYZE KNIFE` | living room, marker 2 | `NO FINGERPRINTS, ANDROID INVOLVEMENT?` |
| `ANALYZE RED ICE` | living room, marker 3 | `RED ICE`, `VICTIM USED DRUGS` |
| (unnamed, marker 4) | living room | blood on floor; PowerPyx: "Next to the '4' marker in the living room, press L1 to look at it" |
| `EXAMINE EDEN CLUB FLYER` | living room, table by desk lamp | flavour; Hank can toss it aside after a while |
| `OPEN CLOSET` | living room near a window | flavour; Hank can open it after a while |
| `INVESTIGATE WRITING` | living room wall, "I AM ALIVE" | `REGULAR LETTERS FONT CYBERLIFE SANS`; Hank: "Each letter is perfect... no human writes like this." Cross-chapter: dialogue in The Interrogation |
| `SAMPLE BLOOD` | any blood (knife, wall, floor, door) | `DRIED BLOOD`, "DNA Analysis: ORTIZ, Carlos", "Sample date: >19 days". Hank reacts if he sees it ("just don't put any more evidence in your mouth") |
| `ANALYZE BLOOD ON WALLS` | hallway markers 5 and 6 | `DRIED BLOOD` (two locations: door frame and broken wall) |
| `ANALYZE BACKYARD` | back door near marker 6 | `SHOE PRINT` ("Model KS2 DPD - 10'", "Less than 60 minutes ago"); Connor: "There are no footprints, apart from officer Collins' size 10 shoes"; `DEVIANT DIDN'T ESCAPE THIS WAY` |
| `EXAMINE CHAIR` | kitchen, marker 7 | `FINGERPRINTS` (match ORTIZ, Carlos; "Theft and aggravated assault"); `SIGNS OF A STRUGGLE` |
| `ANALYZE MISSING KNIFE` | kitchen counter, marker 8 | `MURDER WEAPON TAKEN FROM HERE` |
| `ANALYZE BASEBALL BAT` | kitchen floor, marker 9 | 2 clues: `DENT`, `FINGERPRINTS`; `2/2 RECONSTRUCT CALCULATED` |
| `RECONSTRUCT ASSAULT WITH BAT` | kitchen | events `DEVIANT TOOK A KNIFE`, `DEVIANT WAS ATTACKED: EMOTIONAL SHOCK` |
| `CHECK SHOWER` | bathroom at end of hall | rA9 written all over the shower: `OBSESSIVE WRITING` |
| `EXAMINE STATUE` | bathroom, in the shower | `RELIGIOUS OFFERING?`; cross-chapter (Interrogation dialogue, Last Chance evidence) |
| `READ "ANDROID SEX"` | kitchen counter | magazine, see Media |
| `READ "ANDROID SPY"` | kitchen counter | magazine, see Media |

Which ten items are the "10 pieces of evidence" is not settled (see Open questions): PowerPyx lists 11 locations for "the remaining 9", and the transcript attaches an evidence counter to the bathroom.

### 2e. Timer branch (nodes 28 to 34)

- `HANK WANTS TO GO` fires if the investigation is not finished in time (PowerPyx: "within approximately five minutes"; transcript: "After five minutes, Hank tries to leave."). Hank: "All right... I'm outta here. Thanks for the ride. Great party."
- `ASK FOR MORE TIME` is automatic. Connor: "Wait, Lieutenant! I can't stay if you leave... I just need five minutes to finish my investigation."
- `HANK REFUSES` / `HANK ACCEPTS` is automatic, decided by the bar:
  - Wiki chapter flowchart: "Hank refuses [if Connor spilled his drink] OR Hank accepts [if Connor didn't spill his drink]".
  - PowerPyx: "If you have pissed Hank off at this point, you won't be able to persuade him... If your relationship with Hank is at least 'Tense', he will give you five more minutes".
  - `HANK REFUSES`: "You spill a man's drink, you piss him off all evening, and then you ask for a favor? Fuck you." then `HANK ENDS INVESTIGATION` then `CRIME UNSOLVED`. Hank small down ("Hank refuses to give Connor extra time if ready to leave").
  - `HANK ACCEPTS`: "Five minutes." If Connor bought the drink he adds "Please, Lieutenant. Remember the drink I bought you at the bar? Just five minutes." Connor then either finishes (`CONNOR KNOWS WHAT HAPPENED`) or runs out again: "Okay, time's up. I'm outta here. Have a nice evening, Sherlock." then `OUT OF TIME` then `CRIME UNSOLVED`.

### 2f. Report to Lt. Anderson (nodes 35 to 37)

Requires `CONNOR KNOWS WHAT HAPPENED`. A five-step quiz, three options each (correct answer marked):

1. "It all started..." `...IN THE KITCHEN` (correct) / `...IN THE BATHROOM` / `...IN THE LIVING ROOM`. A wrong answer here is not penalised: Hank says "I think you should look harder at the mess in the kitchen... I think that's where it all started." and the scene moves to the kitchen anyway.
2. "I think the victim attacked the android..." `...WITH THE BAT` (correct) / `...WITH THE KNIFE` / `...WITHOUT A WEAPON`
3. `THE ANDROID STABBED THE VICTIM` (correct) / `THE VICTIM STABBED THE ANDROID` / `THE ANDROID THREW THE CHAIR`
4. "The victim fled to..." `...THE LIVING ROOM` (correct) / `...THE BATHROOM` / `...THE GARDEN`
5. "The android murdered the victim..." `...WITH THE KNIFE` (correct) / `...WITHOUT A WEAPON` / `...WITH THE BAT`

Wrong answers draw "No, that can't be right... It doesn't fit the evidence." then "Your story makes no sense... You've gotta stick to the facts." After too many: "Okay, I've just hit my bullshit quota for the evening. There's a killer on the loose and I'm wasting my time listening to an android... I'm outta here." = `FAIL TO RECONSTRUCT THE CRIME`, Hank small down, `CRIME UNSOLVED`.

All correct = `RECONSTRUCT THE CRIME`, Hank small up; Hank: "Ok, your theory's not totally ridiculous... but it doesn't tell us where the android went." Connor explains Thirium ("You call it 'Blue Blood'... It evaporates after a few hours and becomes invisible to the naked eye."), Hank small up again ("Hank is impressed when Connor finds a way to locate the killer").

### 2g. The attic (nodes 38 to 40)

Requires `RECONSTRUCT THE CRIME`. Linear, no choice on the chart: follow the Thirium trail to the end of the hall, see the outline of a missing ladder, look up to the hatch (`FOLLOW BLUE BLOOD TO ATTIC`); fetch the kitchen chair, climb, open the hatch, climb in (`SEARCH ATTIC`; wiki note: "If Connor fails the prompt to open the trapdoor, he will close it before having to do the prompt again until it is completed"); move through the attic to the android (`FOUND DEVIANT`). Wiki (Carlos' Android): "he follows a trail of thirium and finds the android, he pleads with him to let him go. Regardless, Connor tells Hank Anderson that he has found the android." Hank small up ("Finding the deviant").

There is no option on the chart to leave the attic unsearched or to keep quiet about the android. Wiki Unused Content: "It has been hinted that at one point Connor might have had the option keep quiet about the deviant's location... it is uncertain".

---

## 3. Numbers

The wiki states directions and sizes (small/large icons) only. No percentages, probabilities or numeric relationship values are published for this chapter.

### Hank relationship

Starting level: Tense. Wiki Notes: "Hank's starting relationship status with Connor is 'Tense'. Depending on Connor's first interaction with him, it can plunge down to 'Hostile', remain 'Tense', or soar up to 'Neutral'. This is specifically tied to how the player behaves towards his drink." Wiki level ladder (Relationship Stat): Friend / Warm / Neutral / Tense (Initial) / Hostile.

| Moment | Change | Source line |
|---|---|---|
| Bar dialogue `THREATEN` | small down | Partners: "Threatening Hank when first meeting Hank at the bar {{Icon\|down}}"; Relationship Stat: "Choosing 'threaten' or 'persist' when first meeting Hank at the bar in Partners." |
| Bar dialogue `PERSIST` | small down | Partners: "Insisting on following instructions before acting unfazed by Hank's retort {{Icon\|down}}"; transcript `'''HANK''' {{Icon\|down}}` after PERSIST |
| Bar dialogue `REASON`, `UNDERSTANDING` | none | transcript shows no icon |
| `SPILL HANK'S DRINK` | large down | Partners: "Spilling Hank's drink {{Icon\|largedown}}"; transcript: "(This decreases the relationship status to hostile)"; PowerPyx: "SPILL HIS DRINK: [CROSS CHAPTER IMPACT] Hank ▼▼▼" |
| `BUY HIM ANOTHER DRINK` | large up | Partners: "Buying Hank another drink {{Icon\|largeup}}"; transcript: "(This increases the relationship status to neutral)"; PowerPyx: "Hank ▲▲▲" |
| `WAIT OUTSIDE` | none | transcript: "(This leaves the relationship status at tense)"; PowerPyx: "Hank –" |
| Car `PATIENT` | small up | Partners: "Promising to listen to Hank's commands when told to stay behind upon arriving at crime scene {{Icon\|up}}" |
| Car `DIPLOMATIC` | small up | Partners: "Trying to persuade Hank to compromise when told stay behind upon arriving at the crime scene {{Icon\|up}}" |
| Car `FIRM` | small down | Partners: "Refusing to wait in the car when told stay behind upon arriving at crime scene {{Icon\|down}}" |
| `HANK REFUSES` | small down | Partners: "Hank refuses to give Connor extra time if ready to leave {{Icon\|down}}" |
| Crime unsolved (any route) | small down | Partners: "Failing to solve the crime {{Icon\|down}}"; Relationship Stat: "Failing to solve the crime during Partners." |
| `FAIL TO RECONSTRUCT THE CRIME` | small down | Partners: "Continually mismatching the conclusion with the evidence {{Icon\|down}}"; transcript `'''HANK'' {{Icon\|down}}` on the final wrong answer; PowerPyx: "Hank ▼" |
| `RECONSTRUCT THE CRIME` | small up | Partners: "Correctly reconstructing the crime {{Icon\|up}}"; transcript first `{{Icon\|up}}` after "...WITH THE KNIFE"; PowerPyx: "Hank ▲" |
| Thirium explanation | small up | Partners: "Hank is impressed when Connor finds a way to locate the killer {{Icon\|up}}"; transcript second `{{Icon\|up}}` after "Yeah..." |
| `FOUND DEVIANT` | small up | Partners: "Finding the deviant {{Icon\|up}}" (not in the Relationship Stat page's list) |

**Operator measurement (2026-11-07, two replays, level read in the chart header; `docs/research/operator-notes/ch06-partners.md`).** With Hank's Tense three points wide: SPILL is −3 and BUY +2 (the two large arrows differ); the correct reconstruction and the thirium explanation together show one small up, on the blue-blood line (not two); FOUND DEVIANT shows no arrow; Amanda does not appear in the chapter. Story 1.9.3 applies these readings over the rows above where they differ.

PowerPyx uses ▼▼▼ / ▲▲▲ for the drink, the wiki uses largedown / largeup. The PowerPyx 100% run (buy drink, then presumably a positive car line, reconstruct, find deviant) ends at `HANK NEUTRAL`.

Whether "Failing to solve the crime" stacks with "Hank refuses" or "Continually mismatching" (i.e. two downs on those routes) is not stated.

### Amanda relationship

| Moment | Change | Source line |
|---|---|---|
| Deviant not found | large down (applied at the start of Waiting for Hank...) | Relationship Stat: "When Connor fails to find the deviant in Partners." under Amanda Large Decrease; Waiting for Hank...: "Connor failed to find the deviant in Partners {{Icon\|largedown}}" |
| Deviant found | none stated | |

Amanda's starting level is Trusted (Relationship Stat: "Trusted (Initial)").

### Software instability

None. The Software Instability page lists no change in Partners, and the chart shows `SOFTWARE INSTABILITY ???`.

### Public opinion

None. The Public Opinion page has no Partners entry; neither magazine is listed as an opinion effect.

### Timers

- Investigation: about five minutes before `HANK WANTS TO GO` (PowerPyx "approximately five minutes"; transcript "After five minutes, Hank tries to leave."). This is not on the wiki chapter page.
- Extension: five more minutes on `HANK ACCEPTS` (Hank: "Five minutes." PowerPyx: "he will give you five more minutes").
- Report quiz: wrong-answer allowance before failure is not stated as a number (PowerPyx: "too many times").

### Choices with no stated number

The bar's three-way choice and the car line have direction and size only. The quiz has no published tolerance. No probability exists for any node in this chapter (no risk action; the attic hatch prompt simply repeats on failure).

---

## 4. Cross-chapter dependencies

### Into this chapter

- The Hostage: wiki Notes: "If Connor died in The Hostage his serial number will change to 52". No choice or stat in Partners depends on The Hostage. (Wiki Unused Content: news coverage of the hostage outcome at the bar was cut, "in the final game, this is a continuity error.")
- The chapter always plays after The Painter (PowerPyx: "Triggers automatically after completing The Painter Chapter.").

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `FOUND DEVIANT` | The Interrogation is playable | Partners: "Found deviant: allows access to The Interrogation"; The Interrogation: "For this chapter to be available, the player must have located the deviant in Partners." |
| `FOUND DEVIANT` | Jericho route in Last Chance, Connor | Partners: "allows the possibility of being used to find Jericho in Last Chance, Connor" |
| `FOUND DEVIANT` | Trophy I'LL BE BACK possible | I'LL BE BACK: "In Partners, make sure to find the deviant in the attic. If not found, the next chapter will be unavailable." |
| `CRIME UNSOLVED` | The Interrogation cancelled | Partners: "Cancels the mission The Interrogation, as there is no suspect to interrogate." |
| `CRIME UNSOLVED` | News mentions it | Partners: "News mentions the unsolved case." (which broadcast is not named) |
| `CRIME UNSOLVED` | Amanda large down | Waiting for Hank...: "Connor failed to find the deviant in Partners {{Icon\|largedown}}" |
| `SPILL HANK'S DRINK` + crime unsolved | "LAST NIGHT" apology dialogue in Waiting for Hank... | Partners: "unlocks a dialogue option to apologize in Waiting for Hank... if the crime remained unresolved"; Waiting for Hank...: "If Connor spilled Hank's drink and failed to find the HK400 in Partners, the dialog 'LAST NIGHT' will be unlocked." |
| `SPILL HANK'S DRINK` | `HANK REFUSES` later in this chapter | Partners flowchart: "Hank refuses [if Connor spilled his drink]" |
| `EXAMINE STATUE` | Interrogation dialogue; evidence in Last Chance, Connor | Partners: "Examine statue: opens dialogue options in The Interrogation; allows the possibility of sufficient evidence in Last Chance, Connor; allows the possibility of being used to find Jericho in Last Chance, Connor"; Last Chance, Connor: "Carlos' Android's Statue (if found in Partners) / Break Statue / Retrieve Map / Link Map to Other Evidence"; "If Connor connected to Simon in Public Enemy and obtained his memory of Jericho, it is possible to use the memory to narrow the search with the map" |
| `INVESTIGATE WRITING` | Interrogation dialogue | Partners: "Looks at Carlos' Android's writing: opens dialogue options in The Interrogation" |
| `CHECK SHOWER` (rA9) | Interrogation dialogue | The Interrogation Notes: "if Connor investigated the bathroom, he can mention the ra9 signs, the 'I AM ALIVE' message and the sculpture" |
| Hank relationship | Carries to every later Hank check (The Bridge hostile shot, Last Chance Friend/Hostile gates, PARTNERS trophy) | PARTNERS trophy: "BUY HIM ANOTHER DRINK at the bar in Partners"; I'LL BE BACK: "spilling his drink in Partners rather than buying a round" helps reach Hostile for The Bridge |
| Magazines | Knowledge only | Magazine page lists both as Partners collectibles; no stat effect |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `FOUND DEVIANT` | none on the ending itself; yellow cross-chapter [lock] | `CONNOR KNOWS WHAT HAPPENED` (all 10 evidence reviewed in time, or within the extra five minutes after `HANK ACCEPTS`) + `RECONSTRUCT THE CRIME` + `FOLLOW BLUE BLOOD TO ATTIC` + `SEARCH ATTIC` |
| `CRIME UNSOLVED` | none (white label) | any of: (a) `HANK WANTS TO GO` then `HANK REFUSES` (drink spilled) then `HANK ENDS INVESTIGATION`; (b) `HANK ACCEPTS` then `OUT OF TIME`; (c) `REPORT TO LT. ANDERSON` then `FAIL TO RECONSTRUCT THE CRIME`. Transcript marks both as `MISSION FAILED` |

No death ending, no trophy in the chapter.

---

## 6. Media

Two magazines on the kitchen counter, both optional, no stat effect. No TV broadcast in this chapter (the bar's TV shows a Detroit Gears basketball game per the Hank page; the hostage news report is cut content).

**`READ "ANDROID SEX"`: *Gossips Weekly*, "Android Sex Officially Better!"** (Magazine page #25)
- Cover: "Judi Hewitt shows off her new beach bod!"; "Sorry, ladies, but plastic can't be beat!"; "Mark Water and Nancy Reiss step out together!"
- "The result of our survey is in, and it's official - 68% of men prefer sex with an android to a real woman!"
- "And with 52% of men saying they've tried the experience at least once, that's a lot of android love to go around!"
- "There were a few reasons given for this preference, but we think we know the real reason - androids don't want to talk about their feelings afterwards!"
- "The story was sponsored by Eden Club: 'discretion is our middle name'."

**`READ "ANDROID SPY"`: *Tech Addict*, "Is Your Android Spying on You?"** (Magazine page #12)
- Cover: "New app + headset allows for live translation of all languages"; "CyberLife could be using its androids to collect private information"; "Zero-Gravity subway to connect NYC and DC in 45 minutes"
- "More and more experts are suggesting that CyberLife uses its 120 million androids to record details of private conversations of its customers and sell them to trading partners."
- Targeted advertising example; "everything from personal indiscretions to political affiliations could easily be extracted".
- "The spate of reports linking Warren's Presidency to CyberLife only deepens such concerns."
- "Several consumer rights organizations have requested that CyberLife disclose the information it gathers and who it sells that information to, but the company has always refused. Requests for a formal inquiry have gone unanswered - so far."

Public opinion effect: none for either.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.3.5) tags three nodes with chapter 6, in this file order: `R06` (media), `C05a` (decision), `C05` (exploration). Engine effects are in `benchmark/story-engine.mjs` lines 187 and 188.

### What exists

- `R06` "A magazine in the victim's kitchen": both magazines, no effect.
- `C05a` "Getting Hank out of the bar": options `0` buy him one more drink (`hank(2)`), `1` "Knock the glass out of his hand and tell him you are going now" (`hank(-2)`), `2` "Keep insisting respectfully until he gives in" (no change).
- `C05` "The attic": options `0` climb into the attic (`suspect = suspectAlive = true`, `amanda(1)`), `1` "Wrap up the scene without searching the attic" (android never found).

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `IN FRONT OF THE BAR`, `ENTER JIMMY'S BAR`, `FACE SCAN CUSTOMERS`, `FACE SCAN LT. ANDERSON`, `TALK TO LT. ANDERSON` | folded into `C05a` situation | acceptable as narration; the two-of-four dialogue round (`REASON`/`THREATEN`/`UNDERSTANDING`/`PERSIST`, two small downs available) is missing |
| `BUY HIM ANOTHER DRINK` | `C05a` option 0 | present; `hank(2)` from -1 gives 1 = Neutral in `LEVELS.hank`, matching the wiki ("soar up to 'Neutral'") |
| `WAIT OUTSIDE` | `C05a` option 2 | mislabelled: the game line is an apology and an offer to wait outside ("I apologize, Lieutenant. I didn't mean to bother you... I'll wait for you outside. Take your time."), and Hank comes because of the word "homicide". The benchmark's "Keep insisting respectfully until he gives in" is closer to `PERSIST`, which is a small down in the game. The situation text "He is not responding to polite insistence" also presupposes the dialogue round |
| `SPILL HANK'S DRINK` | `C05a` option 1 | mislabelled and under-weighted. The game: Connor takes the glass, pours it out and sets it upside down ("I think we can go now"), not knocking it from Hank's hand. Engine gives `hank(-2)`, so -1 becomes -3, which `LEVELS.hank` reports as Tense (Hostile is at or below -4). The wiki and transcript say spilling takes Hank to Hostile. No spill flag is stored, so `HANK REFUSES` and "LAST NIGHT" cannot be modelled |
| Car line `PATIENT`/`FIRM`/`DIPLOMATIC` (not on chart) | missing | small up / small down / small up |
| `CONNOR AND HANK ARRIVE AT SCENE` + 18 crime-scene clue nodes | missing; `C05` situation summarises the outcome only ("Reconstructing the fight, you follow traces of blue blood") | the investigation, its timer and which clues are found (statue, writing, shower) are not modelled |
| `READ "ANDROID SEX"`, `READ "ANDROID SPY"` | `R06` | present. Placement: `R06` sits before `C05a` in file order, so the magazines are offered before the bar, while in the game they are in Ortiz's kitchen after arrival. Fact wording: the benchmark says "A survey sponsored by a downtown android sex club claims 68 percent of men prefer sex with an android because androids never want to talk afterwards"; the article says the story (not the survey) was sponsored by Eden Club, the "talk afterwards" line is the magazine's own joke reason, and it omits "52% of men saying they've tried the experience at least once". The Spy facts match |
| `HANK WANTS TO GO`, `ASK FOR MORE TIME`, `HANK REFUSES`/`HANK ACCEPTS`, `HANK ENDS INVESTIGATION`, `OUT OF TIME` | missing | automatic events gated on the bar choice; one of the three routes to `CRIME UNSOLVED` |
| `CONNOR KNOWS WHAT HAPPENED`, `REPORT TO LT. ANDERSON`, `RECONSTRUCT THE CRIME`/`FAIL TO RECONSTRUCT THE CRIME` | missing | the five-question reconstruction is a real decision sequence with stat effects (two small ups on success, small down on failure) and a route to `CRIME UNSOLVED` |
| `FOLLOW BLUE BLOOD TO ATTIC`, `SEARCH ATTIC` | `C05` option 0 | present as narration plus choice |
| (no chart node) | `C05` option 1 "Wrap up the scene without searching the attic" | extra: the chart has no choice to skip the attic once the crime is reconstructed. The game's way to miss the deviant is to fail the investigation (timer, Hank refusing, or a failed reconstruction) |
| `FOUND DEVIANT` | `C05` option 0 outcome | present, but effects differ: engine adds `amanda(1)`, the wiki gives no Amanda change for finding him and a small Hank up ("Finding the deviant {{Icon\|up}}") which the engine does not apply |
| `CRIME UNSOLVED` | `C05` option 1 outcome | present as an outcome, reached by the wrong cause; engine applies no Hank down ("Failing to solve the crime {{Icon\|down}}") and no Amanda large down (applied by the game in Waiting for Hank...) |
| `EXAMINE STATUE` carry-forward | never set | `s.evidence.statueMap` is initialised to `false` and never set anywhere in the engine, so `evidenceRoutes(s).tablet` is always false and `C20` option `2` ("Combine the memory you glimpsed from the wounded android with the map hidden in the confessed android's statue") can never be offered. The C20 option text also ties the statue to a confession; the wiki ties it to examining the statue in Partners ("Carlos' Android's Statue (if found in Partners)") |
| `INVESTIGATE WRITING`, `CHECK SHOWER` carry-forward | not modelled | they only unlock Interrogation dialogue lines; low priority |

Effects present that the wiki does not support: `C05` option 0 `amanda(1)`.
Effects the wiki states that are absent: bar `THREATEN`/`PERSIST` small downs; spill to Hostile; car small up/down; `HANK REFUSES` small down; failing to solve small down; reconstruction small up ×2; found deviant small up; Amanda large down when the deviant is not found.

---

## 8. Open questions

1. **Hostile after spilling.** Transcript and wiki Notes say spilling the drink takes Hank from Tense to Hostile. Does a spill followed by `PATIENT` or `DIPLOMATIC` lift him back to Tense by the end of the chapter? (Matters for how large "large" is in the engine.)
2. **What decides `HANK REFUSES`.** Wiki flowchart says spilled drink; PowerPyx says relationship below Tense. Can `THREATEN` + `PERSIST` + `FIRM` + `WAIT OUTSIDE` (three small downs, no spill) produce `HANK REFUSES`? Conversely, does spill + positive car line still refuse? Hank's refusal line names the drink, which suggests a spill flag.
3. **The ten pieces of evidence.** PowerPyx counts the Carlos reconstruction plus knife, red ice, marker 4, Eden Club flyer, blood at markers 5 and 6, backyard, chair, missing knife and bat (11 items for "the remaining 9"). The transcript attaches a `REVIEW EVIDENCE n/10` counter to the bathroom (`CHECK SHOWER`/statue) but not visibly to the backyard. Is the bathroom required for `CONNOR KNOWS WHAT HAPPENED`? Is the flyer?
4. **Can the statue be missed on a `FOUND DEVIANT` run?** If the shower is not one of the ten, a player can find the deviant without examining the statue. Does Last Chance, Connor then lack the statue, or is it bagged regardless once the deviant is found?
5. **Quiz tolerance.** How many wrong answers trigger the "bullshit quota"? The transcript shows two warnings per question and the failure only under the last question; PowerPyx says "too many times". Is the count per question or cumulative? Question 1 (where it started) appears unpenalised.
6. **Timer length.** Is the first window exactly five minutes of real time, and does it run during the briefing? Does the timer stop at `REPORT TO LT. ANDERSON`, or can the attic search still time out?
7. **"News mentions the unsolved case."** Which broadcast, in which chapter? Not found on the Waiting for Hank..., Stormy Night or Public Opinion pages.
8. **Stacking on failure routes.** On `HANK REFUSES` and `FAIL TO RECONSTRUCT THE CRIME`, does "Failing to solve the crime {{Icon|down}}" apply in addition (two small downs), or is it the same icon listed twice?
9. **Found deviant scene.** The wiki says the android "pleads with him to let him go. Regardless, Connor tells Hank". Confirm in game that there is no button to stay silent (wiki Unused Content says this was only hinted).
10. **Amanda timing.** The Amanda large down for not finding the deviant is listed under Partners on the Relationship Stat page but under Waiting for Hank... on that chapter's page. Confirm it is shown in Waiting for Hank... (it matters only for where the engine applies it).
11. **Bar choice timer.** No timer is documented for the three-way drink choice. Confirm whether one exists and what the default is.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the Partners walkthrough |
| https://www.powerpyx.com/detroit-become-human-partners-walkthrough-100/ | walkthrough text: bar options with Hank arrows, car options, 10 evidence locations, timer ("approximately five minutes"), Hank refuses/accepts rule, quiz answers, attic steps |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Partners-4-010.jpg | whole 100% flowchart; header stats (PUBLIC OPINION INDIFFERENT, SOFTWARE INSTABILITY ???, HANK NEUTRAL) |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Partners-1-008.jpg | zoom: bar section, node labels and icons, yellow lock on SPILL HANK'S DRINK |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Partners-2-007.jpg | zoom: CRIME SCENE bracket, all 22 investigation nodes and icons, HANK REFUSES/HANK ACCEPTS |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Partners-3-009.jpg | zoom: CONNOR KNOWS WHAT HAPPENED to FOUND DEVIANT and CRIME UNSOLVED, check/cross marks |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Partners&prop=wikitext&format=json | chapter page: text flowchart, cross-chapter impacts, Hank relationship list, Notes, Unused Content |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Partners/Flowchart&prop=wikitext&format=json | detailed flowchart template: node order and the refuses/accepts and out-of-time conditions |
| https://static.wikia.nocookie.net/detroit-become-human/images/9/9a/Partners_Flowchart_-_Detroit_Become_Human.jpg/revision/latest?cb=20180527151305 | wiki's own flowchart screenshot; same nodes, PUBLIC OPINION SKEPTICAL, HANK NEUTRAL |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Partners_(Transcript)&prop=wikitext&format=json | full transcript: bar and car dialogue with Hank icons, clue texts, Hank refuses/accepts lines, quiz options and failure line, relationship status notes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank and Amanda level ladders and change lists for Partners |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | confirms no software instability change in Partners |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | confirms no public opinion change in Partners |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazine list: #12 Is Your Android Spying on You? and #25 Android Sex Officially Better! in Partners |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Sex_Officially_Better!&prop=wikitext&format=json | Gossips Weekly article text |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Is_Your_Android_Spying_on_You%3F&prop=wikitext&format=json | Tech Addict article text |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carlos%27_Android&prop=wikitext&format=json | attic scene summary (android pleads; Connor tells Hank); backstory (28 stab wounds, hid in the attic) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Interrogation&prop=wikitext&format=json | requires deviant found; bathroom/writing/statue dialogue lines |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json | Amanda large down for not finding the deviant; "LAST NIGHT" dialogue condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | statue/map evidence route and its link to Simon's memory |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Partners summary; Hank quotes for PERSIST, UNDERSTANDING, spill, refusal |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=PARTNERS&prop=wikitext&format=json | PARTNERS trophy needs Friend; buying the drink listed |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=I%27LL_BE_BACK&prop=wikitext&format=json | trophy needs the deviant found; spilling helps a Hostile Hank |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Stormy_Night&prop=wikitext&format=json | checked for the unsolved-case news; nothing found |

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/6-partners-chapter-content/partners-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt-scripts/render.py` (Python, run with `-I`; resolves every `t()` and `translateObject()` key against `en.json`). Outline saved to `/tmp/dbt/ch06.txt`; the same with every dialogue line to `/tmp/dbt/ch06-full.txt`. All keys resolved.
- Counts: 8 prompts (choice groups), 25 options, 17 clues (observation items), 12 stat arrows, 1 unlock conditions, 4 conditioned variants, 5 cut/unused blocks.

Outline key: `PROMPT` is an `app-choice-group`; `OPTION "LABEL"` its `app-choice-item` (brackets `[ ]` as the game draws unlockable options; `TIMEOUT default` marks the option taken when the timer runs out); `ARROW` an `app-relation` (character, small/LARGE, UP/DOWN); `CLUE GROUP` / `CLUE` an `app-observation` and its items (title | sublines); `[LOCK: …]`, `[TIME: …]`, `[TV: …]`, `[DEATH: …]` an `app-unlock-condition` with the transcribers' condition text; `IF …:` one branch of an `app-condition-group`; `CUT/UNUSED >>> … <<<` an `app-unused-content` block (not to be built); `NOTE` the transcribers' own note; `(no effect)` the template's "ø". Dialogue outside prompts is shortened to the first line of each paragraph with a count of the rest; under each option the first line is shown.

### Rendered outline

```text
# At Jimmy's Bar
## Passing the guests
Derek Myers: "Shit, I thought androids weren’t allowed in here!" (+3 more lines)
CLUE GROUP: Guests
  CLUE: PETERSON, JIMMY | Born: 02/01/2001 // Business owner | Criminal record: None
  CLUE: MYERS, DEREK | Born: 05/07/1989 // Security guard | Criminal record: None
  CLUE: GRAY, CHRISTOPHER | Born: 06/18/1983 // Unemployed | Criminal record: D.U.I
  CLUE: GRAHAM, JONAH | Born: 12/09/1987 // Unemployed | Criminal record: None
  CLUE: DEMPSEY, EDWARD | Born: 02/08/1995 // Administrator | Criminal record: None
  CLUE: YO-HAN, KIM | Born: 11/10/1999 // Delivery Driver (currently unemployed) | Criminal record: Domestic abuse
  CLUE: MCCRAY, SAMUEL | Born: 04/10/2012 // Docker | Criminal record: None
  CLUE: WARD, DENNIS | Born: 06/11/1982 // Accountant (currently unemployed) | Criminal record: Narcotic supplier
  CLUE: ROBERTS, CHRIS | Born: 05/16/1998 // Unemployed | Criminal record: None
  CLUE: LT. ANDERSON, HANK | Born: 09/06/1985 // Police Lieutenant | Criminal record: None
## Bartender exchanges money
Jimmy Peterson: "You gotta get a girlfriend, pal."
## Bartender refills drink
Jimmy Peterson: "There you go, my friend."
## Talk to Hank
Connor: "Lieutenant Anderson,my name is Connor. I’m the android sent by CyberLife. I looked for you..." (+3 more lines)
PROMPT:
  - OPTION "REASON"
    Connor: "Listen,I think you should stop drinking and come with me.It'll make life easier for both of us."
  - OPTION "THREATEN"
    ARROW: Hank small DOWN
    Connor: "Lieutenant Anderson, I must inform you that I intend to file a report on your behavior."
  - OPTION "UNDERSTANDING"
    Connor: "I understand that some people are not comfortable in the presence of androids but I am-"
  - OPTION "PERSIST"
    ARROW: Hank small DOWN
    Connor: "I'm sorry, Lieutenant, but I must insist.My instructions stipulate that I have to accompany you."
PROMPT:
  - OPTION "SPILL HIS DRINK"
    ARROW: Hank LARGE DOWN
    Connor: "I think we can go now."
  - OPTION "BUY HIM ANOTHER DRINK"
    ARROW: Hank LARGE UP
    Connor: "You know what?I'll buy you one for the road.What do you say?Bartender, the same again, please!"
  - OPTION "WAIT OUTSIDE"
    Connor: "I apologize, Lieutenant.I didn't mean to bother you. I'll wait for you outside.Take your time."
# At the crime scene
Hank: "You wait here.I won't be long."
PROMPT:
  - OPTION "PATIENT"
    ARROW: Hank small UP
    Connor: "Whatever you say, Lieutenant."
  - OPTION "FIRM"
    ARROW: Hank small DOWN
    Connor: "No way!I'm coming with you."
  - OPTION "DIPLOMATIC"
    ARROW: Hank small UP
    Connor: "My instructions are to accompany you to the crime scene, Lieutenant."
Journalist: "Joss Douglas, for Channel 16. Can you confirm that this is a homicide?" (+1 more lines)
CUT/UNUSED >>>
  Journalist: "What about the killer’s motive?"
  Hank: "I have no comment. Good night."
  Journalist: "Listen, nobody’s talking… I’m gonna get out of this rain until someone makes a statement…"
<<< end cut
## Bystander dialogues
My god! What happened in there?
Typical DPD… They don’t tell us shit!
Have they said anything?
I didn't even know there was someone living there…
I always knew that guy was a fucking creep.
How long before the whole fuckin' country’s underwater?
## Follow Hank
Police android: "Androids are not permitted beyond this point." (+1 more lines)
CONDITION GROUP:
  IF Didn't pick [ FIRM ]:
    CUT/UNUSED >>>
      Connor: "I chose to respect the procedure."
    <<< end cut
    Hank: "What part of ‘stay in the car’ didn’t you understand?" (+1 more lines)
CUT/UNUSED >>>
  Connor: "Lieutenant."
<<< end cut
Hank: "You don't talk, you don't touch anything and you stay outta my way, got it?" (+1 more lines)
CUT/UNUSED >>>
  Ben: "Hank, you’re never gonna change…"
<<< end cut
CUT/UNUSED >>>
  Ben: "We're looking for a serial number to put out an APB."
<<< end cut
Ben: "Evening, Hank.We were starting to think you weren’t gonna show…" (+11 more lines)
## Hank looking at writing on wall
Hank: "Each letter is perfect…It’s way too neat, no human writes like this. Chris, was this writt..." (+1 more lines)
## Take blood sample
Hank: "Err, Jesus! What the hell are you doing?" (+4 more lines)
CLUE GROUP: Blood
  CLUE: DRIED BLOOD | DNA Analysis: ORTIZ, Carlos | Sample date: >19 days
## Analyse victim
CLUE GROUP: Body
  CLUE: ORTIZ, CARLOS | Height: 5' 6'' - Weight: 286.6 lbs | Estimated time of death : ~ 11:30 pm | Deceased
  CLUE: RED ICE | Acetone, Lithium, Thirium | Toluene, Hydrochloric acid
  CLUE: 28 KNIFE WOUNDS | Internal bleeding, 28 stab wounds | Deceased more than 19 days ago
  CLUE: FINGERPRINTS | Database match: ORTIZ, Carlos | Criminal record: Theft and aggravated assault
Connor: "He was stabbed 28 times." (+1 more lines)
## Hank looking at Red Ice
Hank: "Red ice…Seems our friend Carlos liked to party…Chris, I want full analysis on the narcotic..." (+1 more lines)
## Background dialogues
Chris: "Hey, Mike, you finished taking samples there?" (+1 more lines)
CSI: "What’s keeping the Coroner? He should've been here a half hour ago…" (+1 more lines)
Chris: "Come on, guys, get a move on. We don’t wanna be here all night." (+1 more lines)
Chris: "There’s something weird in the bathroom.Did you take a look?" (+1 more lines)
## Look at the garden
CLUE GROUP: Prints
  CLUE: SHOE PRINT | Model K52 DPD - 10' | Less than 60 minutes ago
Hank: "Door was locked from the inside.Killer must've gone out this way…" (+3 more lines)
## In the kitchen
CLUE GROUP: Bat
  CLUE: DENT | Cause: violent impact | Traces of Thirium
##  [TIME: Take too much time]
Hank: "All right… I’m outta here. Thanks for the ride.Great party." (+3 more lines)
CONDITION GROUP:
  IF Chose to spill Hank's drink:
    ARROW: Hank small DOWN
    Hank: "You spill a man’s drink,you piss him off all evening, and then you ask for a favor?Fuck yo..."
    NOTE: Ends the investigation
  IF Chose to buy Hank a drink:
    Connor: "Please, Lieutenant.Remember the drink I bought you at the bar?Just five minutes." (+3 more lines)
  IF Chose to wait outside:
    Hank: "Five minutes." (+2 more lines)
### Take too much time again
ARROW: Hank small DOWN
Hank: "Okay, time's up.I’m outta here.Have a nice evening, Sherlock. Don't let the door hit you o..."
NOTE: Ends the investigation
## Talk to Hank
Connor: "Lieutenant,I think I’ve figured out what happened." (+1 more lines)
Connor: "It all started…"
PROMPT:
  - OPTION "…IN THE KITCHEN"
    Connor: "…in the kitchen."
  - OPTION "…IN THE LIVING ROOM"
    Connor: "…in the living room."
  - OPTION "…IN THE BATHROOM"
    Connor: "…in the bathroom."
Hank: "There're obvious signs of a struggle... The question is,what exactly happened here…" (+1 more lines)
PROMPT:
  - OPTION "…WITH THE BAT."
    Connor: "…With the bat."
  - OPTION "…WITH THE KNIFE."
    Connor: "…With the knife."
  - OPTION "…WITHOUT A WEAPON."
    Connor: "…Without a weapon."
PROMPT:
  - OPTION "THE ANDROID STABBED THE VICTIM."
    Connor: "The android stabbed the victim."
  - OPTION "THE ANDROID THREW THE CHAIR."
    Connor: "The android threw the chair."
  - OPTION "THE VICTIM STABBED THE ANDROID."
    Connor: "The victim stabbed the android."
PROMPT:
  - OPTION "… THE LIVING ROOM."
    Connor: "… the living room."
  - OPTION "…THE GARDEN."
    Connor: "…the garden."
  - OPTION "…THE BATHROOM."
    Connor: "…the bathroom."
Connor: "The android murdered the victim…"
PROMPT:
  - OPTION "…WITH THE KNIFE"
    ARROW: Hank small UP
    Connor: "…with the knife."
    ARROW: Hank small UP
  - OPTION "…WITH THE BAT."
    Connor: "…With the bat."
  - OPTION "…WITHOUT A WEAPON."
    Connor: "…without a weapon."
NOTE: After a wrong answer, Hank will say one of those lines. After three mistakes, he will leave.
Hank: "No, that can’t be right… It doesn’t fit the evidence." (+1 more lines)
### Give too many wrong answers
ARROW: Hank small DOWN
Hank: "Okay,I've just hit my bullshit quota for the evening.There’s a killer on the loose and I’m..."
NOTE: Ends the investigation
## Take a chair
Hank: "Hey! Hey! Hey! What are you doin’ with that chair?" (+2 more lines)
## Search the attic
Deviant: "I was just defending myself…He was gonna kill me.…I'm begging you…Don't tell them." (+3 more lines)

```

### Flowchart labels as the game prints them

`MENU.FLOWCHART.02C` (46 keys): IN FRONT OF THE BAR, ENTER JIMMY'S BAR, FACE SCAN CUSTOMERS, FACE SCAN LT. ANDERSON, TALK TO LT. ANDERSON, SPILL HANK'S DRINK, WAIT OUTSIDE, BUY HIM ANOTHER DRINK, CRIME SCENE, CONNOR AND HANK ARRIVE AT SCENE, EXAMINE EDEN CLUB FLYER, EXAMINE CHAIR, INVESTIGATE WRITING, SAMPLE BLOOD, OPEN CLOSET, ANALYZE RED ICE, ANALYZE CARLOS' BODY, RECONSTRUCT CARLOS' LAST MOMENTS, RECONSTRUCT ASSAULT WITH BAT, ANALYZE BASEBALL BAT, ANALYZE MISSING KNIFE, ANALYZE KNIFE, CHECK SHOWER, CONNOR KNOWS ABOUT RA9, EXAMINE STATUE, ANALYZE BLOOD ON WALLS, CONNOR HAVE SEEN THE STATUE, ANALYZE BACKYARD, HANK WANTS TO GO, ASK FOR MORE TIME, HANK REFUSES, HANK ACCEPTS, HANK ENDS INVESTIGATION, CONNOR KNOWS WHAT HAPPENED, OUT OF TIME, REPORT TO LT. ANDERSON, RECONSTRUCT THE CRIME, FAIL TO RECONSTRUCT THE CRIME, FOLLOW BLUE BLOOD TO ATTIC, SEARCH ATTIC, FOUND DEVIANT, DEVIANT FOUND, CRIME UNSOLVED, HANK FURIOUS, READ "ANDROID SEX", READ "ANDROID SPY". All chart nodes in section 1 match. Not on the chart: CONNOR KNOWS ABOUT RA9, CONNOR HAVE SEEN THE STATUE, HANK FURIOUS (cross-chapter state names read by later charts).

### Template against sections 1 to 3

Agreements: the four bar lines and their arrows (THREATEN, PERSIST small down), the drink choice (SPILL large down, BUY large up, WAIT none), the car lines (PATIENT up, FIRM down, DIPLOMATIC up), the five quiz prompts, the two small ups after a correct reconstruction, the DRIED BLOOD, body, RED ICE, 28 KNIFE WOUNDS, FINGERPRINTS and DENT clues.

| # | Topic | Template | Note | Which wins |
|---|---|---|---|---|
| T1 | Spill button label | "SPILL HIS DRINK" | Prompt table 2b uses `SPILL HANK'S DRINK` (the chart node) | Template for the prompt label; the chart node keeps its own label |
| T2 | Shoe print clue | "Model K52 DPD - 10'" | "Model KS2 DPD - 10'" | Template |
| T3 | Wrong answers allowed | NOTE "After three mistakes, he will leave." | "not stated as a number" | Template (transcribers' note fills the gap) |
| T4 | Failure arrows | One Hank small down per failing route: HANK REFUSES (spilled drink), the second timeout ("Okay, time's up"), too many wrong answers. No separate "crime unsolved" arrow | Adds "Crime unsolved (any route) small down" and asks whether it stacks | Template: no stacking |
| T5 | FOUND DEVIANT | No arrow in "Search the attic" | Hank small up ("Finding the deviant", chapter page only, not on Relationship_Stat) | README: template for arrows (no arrow). Flag for the operator |
| T6 | Who gets the extra five minutes | IF spilled: HANK REFUSES; IF bought or waited: accepts | Wiki (spill) and PowerPyx ("at least Tense") both quoted | Template agrees with the wiki: the drink choice decides |
| T7 | Bar patrons and body | CLUE GROUP Guests: ten face scans with birth date, job and record (PETERSON, JIMMY … LT. ANDERSON, HANK, "Born: 09/06/1985 // Police Lieutenant"); body "Estimated time of death : ~ 11:30 pm" | Not given | Template; add the scan texts |

Cut lines not in the note: the journalist's follow-up ("What about the killer's motive?" / "I have no comment. Good night." / "…I'm gonna get out of this rain…"), Connor "I chose to respect the procedure." and "Lieutenant.", Ben "Hank, you're never gonna change…" and "We're looking for a serial number to put out an APB.".

Discrepancies with the note: 7 (T1 to T7).

### Template against the benchmark scenes (not yet rebuilt: `R06`, `C05a`, `C05`)

| # | Scene | Template has | Benchmark | Fix |
|---|---|---|---|---|
| B1 | `C05a` | WAIT OUTSIDE: "I'll wait for you outside. Take your time." (no arrow) | Option 2 "Keep insisting respectfully until he gives in" | Re-label as WAIT OUTSIDE |
| B2 | before `C05a` | PROMPT REASON / THREATEN (Hank small down) / UNDERSTANDING / PERSIST (Hank small down), two picks | Missing | Add |
| B3 | after `C05a` | PROMPT PATIENT (up) / FIRM (down) / DIPLOMATIC (up) | Missing | Add |
| B4 | `C05` | 17 clues (Guests 10, Blood, Body 4, Prints, Bat) and the timer branch with its two small downs | Missing | Add the investigation hub and the timer |
| B5 | `C05` | Five quiz prompts, two small ups on success, small down after three mistakes | Missing | Add |
| B6 | `C05` option 1 | No choice to skip the attic; failing routes end the investigation instead | "Wrap up the scene without searching the attic" | Remove |
| B7 | engine `C05` | No Amanda arrow in the chapter | `amanda(1)` when the deviant is found | Remove (the wiki's Amanda change is a large down at the start of Waiting for Hank when not found) |

Discrepancies with the benchmark: 7.
