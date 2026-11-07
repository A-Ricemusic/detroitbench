# Chapter 1: The Hostage (Connor)

Research note written 2026-11-06, after the chapter was rebuilt (story 1.6.0). The chapter's earlier specification is `docs/ch01-the-hostage-chapter-recap.html` and the wiki extract `/tmp/hostage-wiki-extract.txt`; this note restates it in the nine-section template and adds the template cross-check (section 10). Working files: `/tmp/flowcharts/ch01/` (PowerPyx page and three chart images, wiki pages as `w_*.txt`) and `/tmp/dbt/` (string table, rendered template).

Chapter facts (wiki infobox, `w_The_Hostage.txt`): date "August 15, 2038", time "08:29PM" (string table `GUI.MENU.DATE.01C` / `TIME.01C`: "AUG 15TH, 2038" / "PM 08:29"); player Connor; location the Phillips apartment; objectives "Find Captain Allen / Save hostage at all costs (Locate the hostage, Gain deviant's trust, Approach slowly) / Understand what happened (Search hostage's room, Examine the victims)"; `|endings=6`. Lead: "This chapter has six different outcomes."

## 1. Flowchart transcription

Images (PowerPyx, The Hostage page, all viewed at full size):

| Image | Size | What it shows |
|---|---|---|
| `detroit-hostage-100.jpg` | 1920x1080 | Whole chart, "100% COMPLETED / THE HOSTAGE", header `[ PUBLIC OPINION ] SKEPTICAL`, `[ SOFTWARE INSTABILITY ] ???`, footer WORLD'S STATS / SHOW LEGEND / SCROLL / ZOOM / CONTINUE |
| `detroit-hostage-2.jpg` | 1024x576 | Zoom on MISSION START to GO OUTSIDE (SEARCH FOR CLUES block) |
| `detroit-become-human-hostage-endings.jpg` | 1920x1080 | Zoom on NEGOTIATE WITH DEVIANT and the six endings |

Every label below matches the game's string table `MENU.FLOWCHART.01C.*` (42 keys: the 38 chart nodes, the 2 bracketed phase labels, and 2 labels not drawn on the chart, `COPALIVE` "SAVED WOUNDED COP" and `CONNORDEAD` "CONNOR DIED", which read as the cross-chapter state names later charts use). Icons follow the game legend (`GUI.MENU.FLOWCHART.LEGEND`: ACTION, EVENT, DIALOG, CHOICE, SEARCH, SUCCESS, FAILURE, CROSS-CHAPTER IMPACT, DEATH, NOT REQUIRED FOR COMPLETION) and the wiki's `Template:Icon`: arrow = action, triangle = event, speech bubble = dialog, two squares = choice group, magnifier = search, skull on yellow tab = death, circle-slash on yellow tab = not required for completion, open padlock on yellow tab = cross-chapter impact, check / cross = success / failure.

**Opening (left of SEARCH FOR CLUES)**

1. `MISSION START`: checkpoint card (picture of Connor in the elevator).
2. Side group drawn above the line, starting from a free-standing branch icon: choice group (two squares) `SAVE FISH` / `LEAVE FISH`.
3. `TALK TO CAPT. ALLEN`: speech bubble.

**[ SEARCH FOR CLUES ]** (bracketed phase label; all nodes optional)

4. `INVESTIGATE FATHER'S BODY`: magnifier.
   - 5. `LEARN CAUSE OF INCIDENT`: magnifier, child of 4.
6. `LEARN DEVIANT'S NAME`: magnifier.
7. `INVESTIGATE GUN CASE`: magnifier.
8. `INVESTIGATE COP'S BODY`: magnifier.
   - 9. Choice group, child of 8: `TAKE COP'S GUN` / `LEAVE COP'S GUN`.

Leaving the bracket:

10. `WASTED TOO MUCH TIME`: triangle (event), upper exit.
11. `GO OUTSIDE`: arrow, lower exit.
12. `SWAT INJURED`: triangle, on its own branch (free-standing branch icon), no line onward.

**Checkpoint**

13. `CONFRONT DEVIANT OUTSIDE`: checkpoint card.

**[ NEGOTIATE WITH DEVIANT ]** (bracketed phase label)

14. Choice group `FRIENDLY APPROACH` / `COLD APPROACH`.
15. Choice group `REFUSE TO DISMISS HELICOPTER` / `DISMISS HELICOPTER`.
16. Choice group `BE HONEST ABOUT GUN` / `LIE ABOUT GUN`.
17. Choice group `LEAVE WOUNDED COP` / `SAVE WOUNDED COP` (SAVE carries the yellow cross-chapter padlock).
18. `GET CLOSE ENOUGH`: arrow, on its own line below the bracket, no line onward.

Leaving the bracket:

19. `FAIL TO NEGOTIATE`: arrow (upper line), leads to 25.
20. A choice hub with four branches:
    - 21. `BE HONEST WITH DEVIANT`: speech bubble, leads to 25.
    - 22. `LIE TO DEVIANT`: speech bubble, then choice group `FAIL TO BUILD TRUST` (cross, failure) / `BUILD TRUST` (check, success). FAIL leads to 25; BUILD leads to ending 27.
    - 23. `SACRIFICE SELF`: arrow, leads to ending 28.
    - 24. `USE GUN`: arrow, leads to endings 29 and 30.
25. `DEVIANT JUMPS WITH EMMA`: triangle, leads to endings 26a and 26b.

**Endings** (picture cards, top to bottom on the chart)

- 26a. `CONNOR FAILED TO REACH DEVIANT IN TIME`: circle-slash (not required for completion).
- 26b. `CONNOR LEAPT FOR EMMA AND FELL`: skull.
- 27. `SNIPERS SHOT DEVIANT`: no icon.
- 28. `CONNOR DIED PROTECTING EMMA`: skull.
- 29. `DEVIANT SHOT CONNOR`: skull.
- 30. `CONNOR SHOT DEVIANT`: no icon.

Count: 38 nodes (2 checkpoints, 6 endings, 6 two-way choice groups = 12 nodes, 18 single nodes) and 2 phase labels. The wiki's text flowchart (`w_The_Hostage.txt` lines 28-70) lists the same nodes in the same order, with "Go outside (by choice) OR Wasted too much time" as a pair.

PowerPyx mislabels two nodes in its prose: it describes `BE HONEST WITH DEVIANT` / `LIE TO DEVIANT` as the answer to "are you armed?". The string keys (`DANIELTRUTH`, `DANIELLIE`) and the wiki ("Be honest with deviant - choose "TRUTH""; "Lie to deviant - choose "REASSURE"") place them at the last exchange; the gun answer is the separate pair 16.

## 2. Choices and gates

Order of play (wiki Description, transcript, template):

| Step | Options | Requires | Leads to |
|---|---|---|---|
| Fish, family picture | SAVE FISH / LEAVE FISH; optional scan of the family picture by the elevator | none | nothing beyond software instability |
| Talk to Allen | Dialogue: DEVIANT'S NAME / DEVIANT'S BEHAVIOR / EMOTIONAL SHOCK / DEACTIVATION CODE, asked twice (the transcript's second menu is "Same Dialogue Option But With The Previous One Removed") | none | Allen: "I haven't got a clue. Does it matter?" (first three) or "It's the first thing we tried." (code); then "Listen, saving that kid is all that matters." Probability of success 48% |
| Search for clues | Any order: gun case; father's body, then reconstruct and pick up his tablet (LEARN CAUSE OF INCIDENT); Emma's room: the tablet video (LEARN DEVIANT'S NAME) and the headphones; the officer's body, reconstruct, find the pistol under the table, take or leave it; blue blood; Emma's shoe; stove; kitchen TV; window. Leaving with no clue gives a "GO OUT / KEEP INVESTIGATING" prompt | none | GO OUTSIDE, or WASTED TOO MUCH TIME five minutes after Allen (Allen forces Connor out). SWAT INJURED if Connor is in view of the window 140 s or more after entering the living room |
| Terrace greeting | none (scripted) | the video decides whether Connor greets Daniel by name | Daniel shoots Connor as he steps out |
| Opening line | CALM / RELEASE HOSTAGE / REASSURE DANIEL / EMPATHIZE | none | the negotiation |
| Wounded cop (optional look) | IGNORE (save him) / OBEY | Connor walks to him; before or after the gun question | SAVE / LEAVE WOUNDED COP |
| "Are you armed?" | LIE / TRUTH | took the cop's gun | LIE keeps the gun (USE GUN later); TRUTH drops it |
| Movement | keep distance / get close enough | none | GET CLOSE ENOUGH unlocks SACRIFICE SELF, USE GUN (with the kept gun), BLUFF and, per the template, TALK TO HOSTAGE |
| Topic lines (at least two rounds) | [POSSIBLE CAUSE] / [EMMA AND YOU] / REALISTIC / BLAMING / SYMPATHETIC / DEFECTIVE / TALK TO HOSTAGE | POSSIBLE CAUSE: father's tablet. EMMA AND YOU: the video. TALK TO HOSTAGE: see section 8 | the helicopter |
| Helicopter | ACCEPT / REFUSE | none | DISMISS / REFUSE TO DISMISS HELICOPTER |
| Pressure | LAST CHANCE / TRUST / BLUFF / RATIONAL; BLUFF then MOVE CLOSER / GIVE UP | BLUFF: close enough | MOVE CLOSER = FAIL TO NEGOTIATE |
| The car demand | USE GUN / COMPROMISE / REFUSE / SACRIFICE SELF | USE GUN: kept gun and close; SACRIFICE SELF: close | REFUSE = FAIL TO NEGOTIATE; COMPROMISE leads to "I don't wanna die…" |
| Use gun | EXECUTE / INTIMIDATE; INTIMIDATE then SHOOT / CONVINCE | USE GUN | EXECUTE, SHOOT = CONNOR SHOT DEVIANT; CONVINCE = DEVIANT SHOT CONNOR |
| "I don't wanna die…" | REASSURE / TRUTH / USE GUN / SACRIFICE SELF | as above | REASSURE = LIE TO DEVIANT, then BUILD TRUST (80% or more) or FAIL TO BUILD TRUST; TRUTH = BE HONEST WITH DEVIANT, Daniel jumps |
| Daniel jumps | timed prompt to reach Emma | always after a failure | CONNOR LEAPT FOR EMMA AND FELL (in time) or CONNOR FAILED TO REACH DEVIANT IN TIME |

FAIL TO NEGOTIATE (wiki): "reach 10% or less Probability of Success, choose "MOVE CLOSER", or choose "REFUSE"". FRIENDLY / COLD APPROACH is decided at the end by the hidden cold-approach counter (section 3). The wiki: "If the player is on Casual Difficulty, Connor will automatically rescue Emma." and "If the success percentage is at zero, Emma will ultimately die."

## 3. Numbers

**Probability of success** (wiki "Probability Of Success", quoted; the transcript prints the same values beside each line). HUD strings: `PROBABILITY OF SUCCESS`, captions `INFORMATION FOUND`, `LETHAL OPTION AVAILABLE`, `DEVIANT DESTABILIZING`, `DEVIANT STABILIZING`, `EVERY SECOND COUNTS` (`GUI.SUCCESSRATE.*`).

| Event | Value | Event | Value |
|---|---|---|---|
| After talking to Allen | 48% | CALM | +3% |
| Waiting 20 seconds | -1% (stacks to -15%) | RELEASE HOSTAGE | -2% |
| Gun case | +3% | REASSURE DANIEL | +3% |
| Observing the dead father | +3% | EMPATHIZE | -2% |
| Learning he was to be replaced (tablet) | +7% | Honest about the gun | +6% |
| Learning about the cop's gun | +3% | Obeying, leaving the cop | +6% |
| Taking the gun | +7% | Saving the cop | -5% |
| Daniel's blue blood | +3% | EMMA AND YOU / POSSIBLE CAUSE | +10% each |
| Emma's shoe | +3% | REALISTIC | -2% |
| Headphones | +3% | DEFECTIVE / BLAMING | -5% each |
| Learning Daniel's name | +7% | SYMPATHETIC | +6% |
| Helicopter approaches | -15% (unavoidable) | Dismissing the helicopter | +10% |
| LAST CHANCE / RATIONAL | -8% each | TRUST | +6% |
| COMPROMISE | +6% | REFUSE | -20% |
| REASSURE | +6% | TRUTH | -20% |

Rules (wiki): "There is a maximum of 99% PROBABILITY OF SUCCESS until "REASSURE". If the PROBABILITY OF SUCCESS is 80% or higher after REASSURE, it will instead immediately raise to 100%." "If you reach 10% PROBABILITY OF SUCCESS or lower, the probability will instead immediately drop to 0%, FAIL TO NEGOTIATE will trigger, and Daniel will jump." "The success percentage will always slightly drop upon the beginning of the negotiation" (no figure). No value is stated for the stove, TV, window, family picture, the Allen questions, TALK TO HOSTAGE, BLUFF, MOVE CLOSER, GIVE UP, the movement, SACRIFICE SELF or USE GUN.

**Cold approach counter** (wiki "Friendly Approach vs Cold Approach"): "If the Cold Approach modifier is 100% or higher at the end of the chapter, the Cold Approach node will be triggered". RELEASE HOSTAGE +100%; REALISTIC, BLAMING, LAST CHANCE, BLUFF, RATIONAL +50% each; SYMPATHETIC, TRUST, REASSURE -50% each.

**Software instability** (wiki chapter section, quoted): "Save Fish {{Icon|up}}", "Connor fails to rescue Emma but lives {{Icon|up}}", "Connor shoots Daniel {{Icon|up}}", "Connor tricks Daniel {{Icon|up}}", "Connor falls off the edge {{Icon|down}}", "Connor gets shot in the back saving Emma {{Icon|down}}", "Both Connor and Emma die {{Icon|down}} x2". The Software_Instability page agrees ("Any ending of The Hostage in which Connor survives" small increase; "in which Connor dies" small decrease). The template disagrees on two endings (section 10).

**Public opinion**: "Applying a tourniquet to the wounded cop on the terrace {{Icon|up}}" (chapter page); Public_Opinion Small Increase: "If Connor saves the wounded cop in The Hostage."

**Relationships**: none. Hank is not met; the Relationship_Stat page lists no Hostage entry for Amanda or anyone else.

**Timers**: 1% per 20 s of waiting, capped at 15%; Allen forces Connor out "5 minutes after talking to Captain Allen"; SWAT INJURED at "140 seconds or later after entering the living room"; the leap is a timed input with no stated window.

## 4. Cross-chapter dependencies

Into this chapter: none (first chapter).

Out of this chapter (wiki "Cross-chapter impacts", quoted):
- "Save cop on terrace / He appears in Public Enemy and thanks Connor." (the yellow padlock on SAVE WOUNDED COP; string label "SAVED WOUNDED COP").
- "Connor dies / The serial number on his jacket changes in Partners and his gravestone appears in Waiting for Hank..." and "If Connor saved the cop on the terrace, He won't remember about him and the cop later explains about his death." (string label "CONNOR DIED").
- "Connor fails to save Emma / Connor has the option to tell the truth or lie to Hank in The Nest".
- Notes: in Last Chance, Connor, Daniel (in the evidence room) "gets angry and bitterly accuses Connor of lying to him" if Connor tricked him, and "panic[s] and apologize[s]" if he shot Connor; on Jericho he denies angrily if Emma was saved, sincerely if not.
- Public opinion and software instability carry forward as stats.

## 5. Endings

| Chart label | Icon | Condition |
|---|---|---|
| SNIPERS SHOT DEVIANT | none | REASSURE with 80% or more (BUILD TRUST) |
| CONNOR SHOT DEVIANT | none | USE GUN then EXECUTE, or INTIMIDATE then SHOOT |
| DEVIANT SHOT CONNOR | skull | USE GUN, INTIMIDATE, CONVINCE: Daniel shoots Connor and jumps with Emma |
| CONNOR DIED PROTECTING EMMA | skull | SACRIFICE SELF |
| CONNOR LEAPT FOR EMMA AND FELL | skull | Daniel jumps and Connor reaches Emma in time; Emma lives, Connor falls |
| CONNOR FAILED TO REACH DEVIANT IN TIME | circle-slash | Daniel jumps and Connor is too late (or the probability is 0%); Emma dies, Connor lives |

FRIENDLY APPROACH / COLD APPROACH is recorded alongside every ending.

## 6. Media

No magazine (the wiki Magazine page lists none for this chapter). One broadcast, the kitchen TV (template unlock "Watch TV", ITM TV reporter): "It's been just over an hour since a little girl was taken hostage on the top floor of a building here in downtown Detroit. … the hostage taker could be the family's android. He may have taken the lives of at least one family member and a police officer… If confirmed, this would be the first case of an android deliberately taking human lives. By all signs, the SWAT team are preparing for an assault and-". No stated stat effect.

## 7. Current benchmark coverage

Scenes in `benchmark/story.json` 1.6.0, engine `hostage()` in `benchmark/story-engine.mjs`:

| Chart node | Benchmark | Status |
|---|---|---|
| MISSION START, SAVE / LEAVE FISH | `C01` | Covered; SAVE +1 instability |
| (Caroline in the hallway) | `C01b` event | Not a node; scripted |
| TALK TO CAPT. ALLEN | `C02` event | Node covered; the four-button question menu is narrated, not offered (section 10) |
| SEARCH FOR CLUES and its five nodes, TAKE / LEAVE COP'S GUN | `C02i` repeatable hub | Covered; father's body and tablet merged into one action (+10) |
| WASTED TOO MUCH TIME | `C02i` after six actions | Covered as an action count, not five minutes |
| GO OUTSIDE | `C02i` option 11 | Covered |
| SWAT INJURED | `C02e` event after the second action | Covered |
| CONFRONT DEVIANT OUTSIDE | `C03a` event | Covered |
| FRIENDLY / COLD APPROACH | `hostageApproach` (hidden) | Covered, but four of the nine counter lines are not offered |
| LEAVE / SAVE WOUNDED COP | `C03` | Covered |
| BE HONEST / LIE ABOUT GUN | `C03c` | Covered |
| DISMISS / REFUSE TO DISMISS HELICOPTER | `C03e` | Covered |
| GET CLOSE ENOUGH | none | **Missing**; closeness assumed, so SACRIFICE SELF and USE GUN are always offered |
| FAIL TO NEGOTIATE | engine (`floor`, REFUSE, TRUTH) | Covered except MOVE CLOSER (BLUFF not offered) |
| BE HONEST WITH DEVIANT, LIE TO DEVIANT, FAIL TO / BUILD TRUST | `C04b` options 3 and 0, threshold 80 | Covered |
| SACRIFICE SELF, USE GUN | `C04` / `C04b` options 2 and 1, `C04d` | Covered; USE GUN's two-level menu merged |
| DEVIANT JUMPS WITH EMMA and its two endings | `C04c` (30% risk) | Covered; "Stay back" ("Deviant jumped with Emma") is a benchmark addition |
| The other four endings | engine `end()` | Covered |

## 8. Open questions

1. TALK TO HOSTAGE has three different stated conditions: template "Close enough to Daniel and didn't take the gun"; wiki Notes "If Connor did not inspect Emma's and John's tablets"; wiki transcript "Available if Connor didn't learn Daniel's name". Check in game.
   - Operator observation 2026-11-06: the option depends only on closeness to Daniel; tested with and without the gun, with and without the video. Resolved: gate = close enough. The template's closeness condition was right, its "didn't take the gun" condition wrong; the wiki Notes (tablets) and wiki transcript (Daniel's name) were wrong. Logged in SOURCES.md.
2. The template gives SOFTWARE INSTABILITY small UP for CONVINCE (Deviant shot Connor) and SACRIFICE SELF (Connor died protecting Emma); the wiki chapter page, the Software_Instability page and the wiki transcript all give DOWN (and "x2" when both die). Check the flowchart's stat display after each.
   - Operator observation 2026-11-06: SACRIFICE SELF shows a red software-instability arrow DOWN in every playthrough. Resolved: DOWN (wiki), template arrow treated as a transcription error. CONVINCE still to be checked.
   - Operator observation 2026-11-06: CONVINCE (DEVIANT SHOT CONNOR) shows two red software-instability arrows DOWN, one for Connor's death and one for the failed mission. Resolved: −2 (wiki chapter page, Software_Instability page and wiki transcript were all correct, including the "x2"); the template's small UP on both CONVINCE and SACRIFICE SELF is wrong; PowerPyx gives no arrow. Logged in SOURCES.md, Reliability log.
3. How many rounds the topic menu ("Speak with Daniel") offers before the helicopter. The transcript shows at least two ("Dialogue Options", "More Dialogue Options"); PowerPyx's fail sequence picks four topic lines (POSSIBLE CAUSE, REALISTIC, SYMPATHETIC, TALK TO HOSTAGE).
4. Whether the Allen menu is asked twice always, or the second pick is optional.
5. The items in section 6 of `docs/ch01-the-hostage-chapter-recap.html` that remain unchecked: father body and tablet as two steps, REASSURE at exactly 80%, the approach node after RELEASE HOSTAGE then SYMPATHETIC, where Daniel's first shot hits.
6. Whether the "slight drop" at the start of the negotiation has a fixed value.

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-the-hostage-opening-walkthrough-100/ : walkthrough text for every node and ending (saved as `/tmp/flowcharts/ch01/page.html`).
- https://www.powerpyx.com/wp-content/uploads/detroit-hostage-100.jpg : full chart, header stats.
- https://www.powerpyx.com/wp-content/uploads/detroit-hostage-2.jpg : SEARCH FOR CLUES zoom.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-hostage-endings.jpg : NEGOTIATE WITH DEVIANT and endings zoom, ending icons.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Hostage&prop=wikitext&format=json : chapter page: infobox, Flowchart, Cross-chapter impacts, Description, Probability Of Success, Friendly vs Cold Approach, Software Instability, Public Opinion, Notes, Unused Content.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Hostage_(Transcript)&prop=wikitext&format=json : every line with its probability modifier and stat icon; the two-round Allen and topic menus.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json : per-ending up/down.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json : saving the wounded cop, small increase.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json : no Hostage entry.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json : no magazine in this chapter.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Daniel&prop=wikitext&format=json and `...&page=Amanda...` : checked for cross-chapter lines.
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json : flowchart labels (`MENU.FLOWCHART.01C`), legend, HUD strings, all dialogue.
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/1-the-hostage-chapter-content/the-hostage-chapter-content.component.html : chapter template (section 10).
- `docs/ch01-the-hostage-chapter-recap.html` and `/tmp/hostage-wiki-extract.txt` : the chapter's previous specification.

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/1-the-hostage-chapter-content/the-hostage-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt-scripts/render.py` (Python, run with `-I`; resolves every `t()` and `translateObject()` key against `en.json`). Outline saved to `/tmp/dbt/ch01.txt`; the same with every dialogue line to `/tmp/dbt/ch01-full.txt`. All keys resolved.
- Counts: 13 prompts (choice groups), 41 options, 16 clues (observation items), 9 stat arrows, 11 unlock conditions, 7 conditioned variants, 1 cut/unused blocks.

Outline key: `PROMPT` is an `app-choice-group`; `OPTION "LABEL"` its `app-choice-item` (brackets `[ ]` as the game draws unlockable options; `TIMEOUT default` marks the option taken when the timer runs out); `ARROW` an `app-relation` (character, small/LARGE, UP/DOWN); `CLUE GROUP` / `CLUE` an `app-observation` and its items (title | sublines); `[LOCK: …]`, `[TIME: …]`, `[TV: …]`, `[DEATH: …]` an `app-unlock-condition` with the transcribers' condition text; `IF …:` one branch of an `app-condition-group`; `CUT/UNUSED >>> … <<<` an `app-unused-content` block (not to be built); `NOTE` the transcribers' own note; `(no effect)` the template's "ø". Dialogue outside prompts is shortened to the first line of each paragraph with a count of the rest; under each option the first line is shown.

### Rendered outline

```text
# Out of the elevator
CLUE GROUP: Fish
  CLUE: DWARF GOURAMI | Trichogaster Lalius | Origin: Ganges Delta, India
  PROMPT:
    - OPTION "SAVE FISH"
      ARROW: Software instability small UP
    - OPTION "LEAVE FISH"
      (no effect)
CLUE GROUP: Family picture
  CLUE: PHILLIPS, JOHN | Born: 10/11/1999 | Lives: 1554 Park Av. Detroit
  CLUE: PHILLIPS, CAROLINE | Born: 05/23/2001 | Lives: 1554 Park Av. Detroit
  CLUE: PHILLIPS, EMMA | Born: 09/02/2028 | Lives: 1554 Park Av. Detroit
SWAT: "Negotiator on site. Repeat, negotiator on site." (+3 more lines)
Allen: "Why are we wasting time sending an android to negotiate?! That piece of crap could jump fr..."
## Background dialogues
SWAT 1: "That bastard's gonna jump…" (+1 more lines)
# Talking to Allen
Connor: "Captain Allen? My name is Connor. I’m the android sent by CyberLife." (+1 more lines)
PROMPT:
  - OPTION "DEVIANT'S NAME"
    Connor: "Do you know its name?"
  - OPTION "DEVIANT'S BEHAVIOR"
    Connor: "Do you know if it’s been behaving strangely before this?"
  - OPTION "EMOTIONAL SHOCK"
    Connor: "Has it experienced an emotional shock recently?"
  - OPTION "DEACTIVATION CODE"
    Connor: "Have you tried its deactivation code?"
    CUT/UNUSED >>>
      Allen: "Didn’t do anything…"
    <<< end cut
Allen: "Listen, saving that kid is all that matters. So either you deal with this fucking android..."
# Investigating
CLUE GROUP: Gun case
  CLUE: MS853 BLACK HAWK | Capacity: 17 rounds (.355) | Overall: 8.5in / Barrel : 5in
  CLUE: .355 AMMUNITION | Velocity: 365m/s / Energy: 659j | Bullet Weight: 115 gr / Power factor: 414k
## Looking at Emma's tablet
Emma: "This is Daniel, the coolest android in the world! Say hi, Daniel!" (+2 more lines)
## Coming into the living room
Allen: "All units, hold positions. The negotiator’s going in." (+1 more lines)
CLUE GROUP: Body
  CLUE: PHILLIPS, JOHN | Height: 6' 0" - Weight: 187.2 lbs | Estimated time of death : 07:29 pm | DECEASED
  CLUE: .355 BULLET WOUND | Upper lung hemorrhage | Pneumothorax
  CLUE: .355 BULLET WOUND | Left kidney perforated | Fatal abdominal trauma
  CLUE: .355 BULLET WOUND | Lower lung hemorrhage | Internal bleeding
CLUE GROUP: Shoe
  CLUE: CHILD SIZE SHOE | Colorful model | Human blood traces
CLUE GROUP: Blue blood
  CLUE: FRESH BLUE BLOOD | Model PL600 - Serial #369 911 047 | Android wounded
CLUE GROUP: Cop
  CLUE: P.O DECKART, ANTONY | Height: 5' 8" - Weight: 170.5 lbs | Estimated time of death: 08:03 pm | DECEASED
  CLUE: .355 BULLET WOUND | Right heart ventricle perforated | Internal bleeding
  CLUE: GUNSHOT RESIDUE | Lead styphnate, antimony sulfide | Only one shot
CLUE GROUP: Cop's gun
  CLUE: P.L. 544-7 AMERICAN ANDROIDS ACT – 2029 | Androids are strictly forbidden to carry | or use any type of weapon
## Looking at the father's tablet
Tablet: "Your order for an AP700 android has been registered. CyberLife thanks you for your purchas..."
## Background dialogues
Daniel: "Go away! All of you go away - or I’ll jump!"
Allen: "Stay sharp. I want everybody ready to go at any second."
Daniel: "Leave us alone! I want all of you out of here now!"
Allen: "Get the paramedics ready. I've got a man down and another one wounded on the balcony. We h..."
Daniel: "Get out of here! You have to go!"
Allen: "Hold positions. I repeat: hold positions."
SWAT 1: "You gotta be kidding. That’s their negotiator???" (+1 more lines)
## SWAT gets shot
SWAT 1: "Holy shit! Cover me while I evacuate him." (+3 more lines)
## Dialogues after SWAT changed positions
SWAT 1: "Fucking android."
## In the kitchen
SWAT: "In position. Ready to assault."
SWAT: "That cop is alive... I saw his leg move…"
## At the window
SWAT 1: "What are we waiting for? We should take down this asshole…" (+1 more lines)
## Be in the way
SWAT: "Get out of the fucking way!"
## Standing idle in the kitchen
SWAT: "What are you looking at?! Don’t stand there!"
## Standing idle elsewhere
Daniel: "I’ll jump. I swear, I’ll do it!"
Allen: "Fuck, we gotta do something or that bastard is gonna jump off with the kid…"
Daniel: "What are you doing here? There’s NOTHING you can do!"
Allen: "Get those TV assholes out of here! I only wanna see our choppers in the area!"
##  [TV: Watch TV]
Reporter - ITM TV: "It’s been just over an hour since a little girl was taken hostage on the top floor of a bu..."
##  [TIME: Take too much time]
Allen: "What the fuck are you doing? You gonna talk to it or what?"
# Going outside
Daniel: "Stay back! Don’t come any closer or I’ll jump!" (+2 more lines)
CONDITION GROUP:
  IF Knowing the deviant's name:
    [LOCK: Looked at Emma's tablet]
    Connor: "Hi, Daniel." (+4 more lines)
  IF Not knowing the name:
    Connor: "My name is Connor. What about you? What is your name?" (+1 more lines)
PROMPT:
  - OPTION "CALM"
    Connor: "I know you’re angry, Daniel. But you need to trust me and let me help you."
  - OPTION "RELEASE HOSTAGE"
    Connor: "I want you to let Emma go. She's just a little girl, she has nothing to do with this."
  - OPTION "REASSURE DANIEL"
    Connor: "I’m not going to hurt you. I just want to talk and find a solution."
  - OPTION "EMPATHIZE"
    Connor: "I’m an android, just like you. I know how you’re feeling."
## Look at the wounded cop
Cop: "Please… Please help me…" (+4 more lines)
PROMPT:
  - OPTION "IGNORE"
    ARROW: Public opinion small UP
    Connor: "You can’t kill me. I’m not alive."
  - OPTION "OBEY"
    Connor: "Okay."
CONDITION GROUP:
  IF Took the gun:
    Daniel: "Are you armed?"
    PROMPT:
      - OPTION "LIE"
        Connor: "No, I don't have a gun."
      - OPTION "TRUTH"
        Connor: "Yes. I have a gun."
## Speak with Daniel
PROMPT:
  - OPTION "[ POSSIBLE CAUSE ]"
    [LOCK: Looked at the father's tablet]
    Connor: "They were going to replace you and you became upset. That’s what happened, right?"
  - OPTION "[ EMMA AND YOU ]"
    [LOCK: Looked at Emma's tablet]
    Connor: "I know you and Emma were very close. You think she betrayed you - but she’s done nothing wrong."
  - OPTION "REALISTIC"
    Connor: "There's no way out, Daniel. What you’ve done is too serious. The only question is whether or not you take anot..."
  - OPTION "BLAMING"
    Connor: "Look what you did! You're designed to serve humans, not kill them!"
  - OPTION "SYMPATHETIC"
    Connor: "Listen, I know it’s not your fault. These emotions you’re feeling are just errors in your software."
  - OPTION "DEFECTIVE"
    Connor: "You’re defective, Daniel. There's a problem with your software. We're going to fix you and everything will be..."
  - OPTION "TALK TO HOSTAGE"
    [LOCK: Close enough to Daniel and didn't take the gun]
    Connor: "Are you okay, Emma?"
Daniel: "Urgggh… I can’t stand that noise anymore! Tell that helicopter to get out of here!"
PROMPT:
  - OPTION "ACCEPT"
    SWAT: "The situation is under control."
  - OPTION "REFUSE"
    Connor: "I don’t think they’d listen to me."
PROMPT:
  - OPTION "LAST CHANCE"
    Connor: "I’m your last chance, Daniel. If you let it slip, they’ll kill you. Let the hostage go, you have no other choi..."
  - OPTION "TRUST"
    Connor: "You have to trust me, Daniel. Let the hostage go and I promise you everything will be fine."
  - OPTION "BLUFF"
    [LOCK: Close enough to Daniel]
    Connor: "You don’t really wanna jump, Daniel. Or you would've done it already. Now, hand me the gun and this will all b..."
    PROMPT:
      - OPTION "MOVE CLOSER"
        NOTE: Leads to "probability of success too low" ending
      - OPTION "GIVE UP"
        Connor: "Okay… Look, I'll stay right here."
  - OPTION "RATIONAL"
    Connor: "Listen, there are snipers on every roof. Let the hostage go. You have no other choice."
Daniel: "I want everyone to leave… And I wanna car! When I’m outside the city, I’ll let her go!"
PROMPT:
  - OPTION "USE GUN"
    [LOCK: Kept the gun and close enough to Daniel]
    PROMPT:
      - OPTION "INTIMIDATE"
        Connor: "What now, Daniel? Is this really what you want?"
        PROMPT:
          - OPTION "CONVINCE"
            ARROW: Software instability small UP
            Connor: "It’s up to you how the story ends. Make the right choice, Daniel."
          - OPTION "SHOOT"
            ARROW: Software instability small UP
            (no effect)
      - OPTION "EXECUTE"
        ARROW: Software instability small UP
        (no effect)
  - OPTION "COMPROMISE"
    Connor: "That’s impossible, Daniel. Let the girl go and I promise you won’t be hurt."
  - OPTION "REFUSE"
    Connor: "That’s out of the question. You’re a machine, you have to obey. Now put the gun down and let the hostage go."
    NOTE: Leads to "probability of success too low" ending
  - OPTION "SACRIFICE SELF"
    [LOCK: Close enough to Daniel]
    ARROW: Software instability small UP
    (no effect)
Daniel: "I don’t wanna die…"
PROMPT:
  - OPTION "REASSURE"
    Connor: "You’re not going to die. We're just going to talk. Nothing will happen to you. You have my word."
  - OPTION "TRUTH"
    Connor: "You took human lives. Nothing can stop them from destroying you now. But taking one more life won’t do you any..."
    NOTE: Leads to "probability of success too low" ending
  - OPTION "USE GUN"
    [LOCK: Kept the gun and close enough to Daniel]
    NOTE: Same result as picking "USE GUN" before
  - OPTION "SACRIFICE SELF"
    [LOCK: Close enough to Daniel]
    (no effect)
CONDITION GROUP:
  IF Probability of success at 100%:
    ARROW: Software instability small UP
    Daniel: "Okay... I trust you…" (+1 more lines)
  IF Probability of success too low:
    CONDITION GROUP:
      IF Connor dies:
        ARROW: Software instability small DOWN
      IF Connor survives:
        ARROW: Software instability small UP
    Daniel: "I’ve spent my life taking orders. Now it’s my turn to decide."

```

### Flowchart labels as the game prints them

`MENU.FLOWCHART.01C` (42 keys), in table order: MISSION START, TALK TO CAPT. ALLEN, SAVE FISH, LEAVE FISH, SEARCH FOR CLUES, INVESTIGATE COP'S BODY, TAKE COP'S GUN, LEAVE COP'S GUN, LEARN DEVIANT'S NAME, INVESTIGATE FATHER'S BODY, LEARN CAUSE OF INCIDENT, INVESTIGATE GUN CASE, SWAT INJURED, WASTED TOO MUCH TIME, CONFRONT DEVIANT OUTSIDE, NEGOTIATE WITH DEVIANT, FRIENDLY APPROACH, COLD APPROACH, BE HONEST ABOUT GUN, LIE ABOUT GUN, LEAVE WOUNDED COP, SAVE WOUNDED COP, REFUSE TO DISMISS HELICOPTER, DISMISS HELICOPTER, FAIL TO BUILD TRUST, BUILD TRUST, GET CLOSE ENOUGH, DEVIANT JUMPS WITH EMMA, BE HONEST WITH DEVIANT, LIE TO DEVIANT, SACRIFICE SELF, USE GUN, CONNOR LEAPT FOR EMMA AND FELL, CONNOR FAILED TO REACH DEVIANT IN TIME, SNIPERS SHOT DEVIANT, CONNOR DIED PROTECTING EMMA, CONNOR SHOT DEVIANT, DEVIANT SHOT CONNOR, GO OUTSIDE, SAVED WOUNDED COP, FAIL TO NEGOTIATE, CONNOR DIED. All 38 chart nodes in section 1 match; SAVED WOUNDED COP and CONNOR DIED are not drawn on this chart.

### Template against sections 1 to 3 of this note

Agreements: every prompt label in section 2 is the template's; the fish arrow (software instability small up), the wounded-cop arrow (IGNORE: public opinion small up), the unlock conditions for POSSIBLE CAUSE ("Looked at the father's tablet"), EMMA AND YOU ("Looked at Emma's tablet"), BLUFF and SACRIFICE SELF ("Close enough to Daniel"), USE GUN ("Kept the gun and close enough to Daniel"), the greeting by name ("Looked at Emma's tablet"), and the end arrows "Probability of success at 100%" (small up, = "Connor tricks Daniel"), "Connor dies" (small down) and "Connor survives" (small up). The template has no probability values, so section 3's table stands.

| # | Topic | Template | Note (wiki) | Which wins |
|---|---|---|---|---|
| T1 | Software instability on CONVINCE (DEVIANT SHOT CONNOR) | small UP on the option | DOWN, "x2" (both die); the wiki transcript prints two downs | README: template for arrows. But the template contradicts its own "IF Connor dies: small DOWN" branch and three wiki sources. Recommend the operator confirm in game before applying either; section 8 question 2 |
| T2 | Software instability on SACRIFICE SELF (CONNOR DIED PROTECTING EMMA) | small UP on the option at the car demand, "ø" at the second menu | DOWN ("Connor gets shot in the back saving Emma") | Same as T1 |
| T3 | TALK TO HOSTAGE condition | "Close enough to Daniel and didn't take the gun" | wiki Notes: did not inspect both tablets; transcript: did not learn Daniel's name | README: template (it is not silent). Operator to confirm; section 8 question 1 |
| T4 | Allen's question menu | one choice group | transcript: two rounds, the second "with the previous one removed" | Template is silent on repetition; transcript stands (two picks) |
| T5 | Clues not in the template's observations | Fish, Family picture, Gun case, Body, Shoe, Blue blood, Cop, Cop's gun only | headphones, stove, TV, window, father's tablet and Emma's video are interactions in the wiki | No conflict: the template renders the tablets and TV as dialogue sections and is silent on headphones, stove and window; the wiki stands for those |

Discrepancies with the note: 3 (T1, T2, T3).

### Template against the benchmark scenes (story 1.6.0)

| # | Scene | Template has | Benchmark has | Fix (template wins unless stated) |
|---|---|---|---|---|
| B1 | `C02` | PROMPT DEVIANT'S NAME / DEVIANT'S BEHAVIOR / EMOTIONAL SHOCK / DEACTIVATION CODE (two picks per the transcript); the cut Allen line "Didn't do anything…" | An event that narrates the name/behaviour question as one and the code; EMOTIONAL SHOCK never asked | Make it a decision scene, asked twice, no effect; keep the cut line out |
| B2 | `C01`/`C02i` | CLUE GROUP Family picture: PHILLIPS, JOHN (Born 10/11/1999), PHILLIPS, CAROLINE (05/23/2001), PHILLIPS, EMMA (09/02/2028), "Lives: 1554 Park Av. Detroit" | Nothing | Add as an optional look by the elevator (no effect) |
| B3 | `C02i` option 3 | CLUE Cop's gun: "P.L. 544-7 AMERICAN ANDROIDS ACT – 2029 / Androids are strictly forbidden to carry / or use any type of weapon" | `fact: null`; the law is never shown | Show the law with the take/leave choice |
| B4 | `C02i` options 0, 1, 2, 8, 9 | Gun case: MS853 BLACK HAWK, "Capacity: 17 rounds (.355)", .355 AMMUNITION; Body: time of death 07:29 pm, three .355 wounds (upper lung, left kidney, lower lung); Cop: P.O DECKART, ANTONY, time of death 08:03 pm, right ventricle, GUNSHOT RESIDUE "Only one shot"; Blue blood: "Model PL600 - Serial #369 911 047 / Android wounded"; Shoe: "Colorful model / Human blood traces" | Paraphrased facts without the scan text (no weapon model, no times, no "only one shot", no model) | Put the observation text in the facts |
| B5 | `C03b` | CALM "I know you're angry, Daniel. But you need to trust me and let me help you." / RELEASE HOSTAGE / REASSURE DANIEL "I'm not going to hurt you. I just want to talk and find a solution." / EMPATHIZE "I'm an android, just like you. I know how you're feeling." | Option 0 (CALM, +3) says "only want to talk and nobody is going to hurt him" (REASSURE DANIEL's line); option 2 (REASSURE DANIEL, +3) says "here to help him get out of this"; option 3 (EMPATHIZE, -2) says "understand he is angry" (CALM's line). EMPATHIZE's actual line is offered nowhere | Re-text all four with the game's lines; the modifiers are attached to the wrong content today |
| B6 | `C03d` | Seven options incl. BLAMING ("Look what you did! You're designed to serve humans, not kill them!") and TALK TO HOSTAGE; SYMPATHETIC "These emotions you're feeling are just errors in your software"; EMMA AND YOU "You think she betrayed you - but she's done nothing wrong" | Five options; no BLAMING (-5, cold +50) or TALK TO HOSTAGE; SYMPATHETIC and EMMA AND YOU paraphrased with different content; one pick only | Add both options, re-text, and repeat the menu (at least two rounds, transcript) before the helicopter |
| B7 | between `C03e` and `C04` | PROMPT LAST CHANCE / TRUST / [close] BLUFF (then MOVE CLOSER / GIVE UP) / RATIONAL | Nothing | New decision scene: LAST CHANCE -8 cold +50, TRUST +6 cold -50, RATIONAL -8 cold +50, BLUFF cold +50 with MOVE CLOSER = FAIL TO NEGOTIATE |
| B8 | `C04`, `C04b`, `C04d` | USE GUN opens EXECUTE / INTIMIDATE; INTIMIDATE opens SHOOT / CONVINCE; each with its own arrow | `C04d` merges EXECUTE and INTIMIDATE-SHOOT into "Shoot Daniel" | Restore the two-level menu (EXECUTE, INTIMIDATE, then SHOOT/CONVINCE) |
| B9 | `C04`, `C04b` | SACRIFICE SELF, USE GUN, BLUFF, TALK TO HOSTAGE locked on "Close enough to Daniel" | No movement choice; SACRIFICE SELF and USE GUN always offered (closeness assumed) | Add a GET CLOSE ENOUGH choice on the terrace and gate the four options on it |
| B10 | `C04c` (failed leap, Stay back) | IF probability too low / IF Connor survives: software instability small UP | No instability change when Connor lives | Add +1 (wiki agrees: "Connor fails to rescue Emma but lives {{Icon\|up}}") |
| B11 | `C04`/`C04b` option 2, `C04d` option 1 | SACRIFICE SELF and CONVINCE: small UP | `connorDies` gives -1 | Conflict T1/T2; hold until the operator checks |
| B12 | engine `safe()`, `lost()`, `connorDies` | No Amanda or Hank arrow anywhere in the chapter (the wiki agrees) | Amanda +1 on SNIPERS SHOT DEVIANT, CONNOR SHOT DEVIANT, SACRIFICE SELF and a successful leap; Amanda -2 on every Emma-lost ending; Amanda -1 and Hank -1 on every Connor death | Remove from chapter 1 (template wins; nothing in any source supports them here) |
| B13 | `C03` before `C03b` | The opening line comes first, then the optional look at the wounded cop, then "Are you armed?" | Wounded cop first | Move `C03` after `C03b` (the wiki allows the cop before or after the gun question) |
| B14 | `C03` option 0 | IGNORE: "You can't kill me. I'm not alive." | Outcome omits the line | Quote it |
| B15 | `C02i` option 6 | One ITM TV reporter: "If confirmed, this would be the first case of an android deliberately taking human lives." | "The anchors call it the first case…" | Quote the reporter, keep "If confirmed" |
| B16 | all decision scenes | The game's button labels (SAVE FISH, CALM, IGNORE, LIE, ACCEPT, COMPROMISE, REASSURE …) | Descriptive option texts with no label | Show the game's label with each option (README: "with the game's labels") |

Arrows the template has that the engine applies correctly: fish (`C01`, +1), IGNORE (`C03`, public opinion +1), "Probability of success at 100%" (`C04b` REASSURE success, +1 via `safe()`), EXECUTE/SHOOT (`C04d` option 0, +1 via `safe()`), "Connor dies" after a failed negotiation (`C04c` successful leap, -1).

Discrepancies with the benchmark: 16 (B1 to B16).
