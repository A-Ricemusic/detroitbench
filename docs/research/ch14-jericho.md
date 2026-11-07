# Chapter 14: Jericho (Markus)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch14/wiki.txt`; related wiki pages are in `/tmp/flowcharts/ch14/wikipages/`. The flowchart images are in `/tmp/flowcharts/ch14/` (`jericho-100-flowchart-1.jpg`, `jericho-1-1.jpg`, `jericho-2-1.jpg`, `jericho-4-1.jpg`, `jericho-5.jpg`; crops in `crops/`), and PowerPyx's 24 graffiti screenshots are in `graffiti/`. None of these were committed. The fan transcript's English strings come from the copy of the site's translation file in `/tmp/flowcharts/ch14/transcript/en.json` (same file as ch11/ch12). Chapter keys are `X0501M.*`, `X0503M.*`, `MENU.FLOWCHART.05M.*` and `GUI.*.05M`; the game's internal code for this chapter is `05M`, and Time to Decide is `06MA`. The page order was rebuilt from the site's compiled template and saved as `transcript/part1.txt` (ch14) and `transcript/part2.txt` (ch16 opening).

Wiki infobox: `|date=November 6, 2038`, `|time=04:30PM`, `|player=[[Markus]]`, `|location=[[Ferndale]], [[Detroit]]` and `[[Jericho (location)|Jericho]]`, `|endings=1`. Objectives: "Follow trail to Jericho" and "Explore the boat". Text: "This chapter has only one outcome." The page is tagged `{{Stub}}`. It has a Flowchart (Simplified list and an Accurate tab transcluding `Jericho/Flowchart`), Notes and Unused Content. It has **no** Probability, Relationship, Public Opinion or Software Instability tables, and no cross-chapter impacts section. Transcript: `GUI.MENU.DATE.05M` "NOV 6TH, 2038", `GUI.MENU.TIME.05M` "PM 04:30".

PowerPyx: "Triggers automatically after completing On the Run Chapter." "This is the only outcome to this linear level."

---

## 1. Flowchart transcription

### How the chart was read

- PowerPyx has five 1920x1080 screenshots. `detroit-become-human-jericho-100-flowchart-1.jpg` is the whole "100% COMPLETED" chart at small scale. Three are zoomed views: `jericho-1-1` (ARRIVE AT FERNDALE through ASK ANDROID THE WAY TO JERICHO and the magazine group), `jericho-2-1` (LEAVE THE STREETS through REACH THE ROOF and the start of CROSS THE GAP) and `jericho-4-1` (LOCATE JERICHO through CLIMB CRANE AND JUMP). `jericho-5` covers INSIDE THE BOAT through the ending.
- **No zoomed view covers the stretch from REACH THE ROOF to LOCATE JERICHO.** In the overview (crop `crops/mid1x.png`) those six boxes are too small to read. Their icons and positions come from the overview. Their labels come from the game's own flowchart strings in the transcript file (`MENU.FLOWCHART.05M.CROSSGAP` "CROSS THE GAP", `.REACHDOOR` "REACH THE DOOR", `.EXPLOREOFFICE` "EXPLORE ABANDONED OFFICE", `.DEADANDROID02`/`03` "SEE ANDROID BODY", `.FINDEXIT` "FIND THE RIGHT EXIT"). Those strings agree with the wiki list. They are marked "(label from game strings)" below.
- All 29 chart labels match the 29 `MENU.FLOWCHART.05M.*` strings in the transcript file, word for word.
- Chart header: `PUBLIC OPINION SKEPTICAL`. This is PowerPyx's save state. **No relationship gauges appear in the header.** North, Simon, Josh and Jericho aren't tracked yet in this chapter (compare Time to Decide, §4).
- Blue tiles mark PowerPyx's last-played path: ARRIVE AT FERNDALE > FLASHBACK OF ANOTHER DEVIANT > ANALYZE STATION GRAFFITI > EXIT THE STATION > FOLLOW THE SIGNS > LEAVE THE STREETS > SEE ANDROID BODY (first) > CONTINUE ON THE JERICHO TRAIL. Everything from USE THE DUMPSTER TO CLIMB UP onward is grey, as are the three magazine reads and ASK ANDROID. This is a partial replay and says nothing about the rules.
- Icon key (as in the ch12/ch13 notes): ⇨ action; △ event the game plays; speech bubble = dialogue; [branch] = the free-standing bracket-shaped glyph that starts an optional side branch, with no line to the trunk; large picture tile with corner brackets = checkpoint.
- **This chart has no skull, no-entry/`nri`/`nr`, check/cross, trophy, yellow cross-chapter padlock, or double-square choice group anywhere.** No node is a failure or a death. The only branching is optional.

Boxes are numbered J1–J29 in reading order. Labels are quoted exactly as printed.

### A. Station (checkpoint)

| # | Label | Icon | Edge |
|---|---|---|---|
| J1 | ARRIVE AT FERNDALE | checkpoint (picture tile: Markus on the platform) | start |
| J2 | FLASHBACK OF ANOTHER DEVIANT | △ | from J1 |
| J3 | ANALYZE STATION GRAFFITI | ⇨ | from J2 |
| — | [branch] glyph, free-standing below J3/J7 | | opens the magazine group |
| J4 | READ "ON THE RUN" | ⇨ (grey) | magazine group, top |
| J5 | READ "FORTUNE TELLER" | ⇨ (grey) | magazine group, middle |
| J6 | READ "ANDROID ASTRONAUTS" | ⇨ (grey) | magazine group, bottom |
| J7 | EXIT THE STATION | ⇨ | from J3; splits to J8 (up) and J9 (down) |
| J8 | FOLLOW THE SIGNS | ⇨ | upper member of the split > J10 |
| J9 | ASK ANDROID THE WAY TO JERICHO | speech bubble (grey) | lower member of the split; **dead end**, with no outgoing line |

The split at J7 is drawn as a plain fork, not a double-square choice group. The wiki's `Jericho/Flowchart` template draws the same thing: `Ask android the way to Jericho` has no continuation, and only `Follow the signs` joins down to `Leave the streets`.

### B. Streets and junkyard (no checkpoint tile)

| # | Label | Icon | Edge |
|---|---|---|---|
| J10 | LEAVE THE STREETS | ⇨ | from J8 |
| — | [branch] glyph, free-standing between J10 and J12 | | |
| J11 | SEE ANDROID BODY | △ | optional side branch |
| J12 | CONTINUE ON THE JERICHO TRAIL | ⇨ | from J10 |
| J13 | USE THE DUMPSTER TO CLIMB UP | ⇨ | from J12 |

### C. Rooftops and office (checkpoint)

| # | Label | Icon | Edge |
|---|---|---|---|
| J14 | REACH THE ROOF | checkpoint (picture tile: Markus crouched on a roof edge) | from J13 |
| — | [branch] glyph, free-standing right of J14 | | |
| J15 | SEE ANDROID BODY | △ | optional side branch (label from game strings) |
| J16 | CROSS THE GAP | ⇨ | from J14 |
| J17 | REACH THE DOOR | ⇨ | from J16 (label from game strings) |
| J18 | EXPLORE ABANDONED OFFICE | ⇨ | from J17 (label from game strings) |
| — | [branch] glyph, free-standing above, between J18 and J20 | | |
| J19 | SEE ANDROID BODY | △ | optional side branch (label from game strings) |
| J20 | FIND THE RIGHT EXIT | ⇨ | from J18 (label from game strings) |

### D. The docks (checkpoint)

| # | Label | Icon | Edge |
|---|---|---|---|
| J21 | LOCATE JERICHO | checkpoint (picture tile: the rusted blue hull lettered "JERICHO") | from J20; two lines leave it |
| J22 | WALK BRIDGE | ⇨ | lower line from J21 |
| J23 | BRIDGE COLLAPSES | △ | from J22 |
| J24 | CLIMB CRANE AND JUMP | ⇨ | upper line comes **directly** from J21; J23 joins it from below |

So WALK BRIDGE and BRIDGE COLLAPSES are an optional detour. The crane can be climbed without ever stepping on the bridge.

### E. Inside the ship (checkpoint) and ending

| # | Label | Icon | Edge |
|---|---|---|---|
| J25 | INSIDE THE BOAT | checkpoint (dark picture tile: Markus at a door/ladder) | from J24 |
| J26 | FIND A FLASHLIGHT | ⇨ | from J25 |
| J27 | ENTER THE MACHINE ROOM | ⇨ | from J26 |
| J28 | FALL OFF CATWALK | ⇨ | from J27 |
| J29 | **MET PEOPLE OF JERICHO** | ending tile with picture, no icon (picture: Simon in the centre, North right, Josh left, Markus seen from behind) | ENDING |

**Totals:** 29 boxes, 27 distinct labels (SEE ANDROID BODY appears three times), plus 4 free-standing [branch] glyphs. 5 picture tiles (J1, J14, J21, J25, J29). 5 events (J2, J11, J15, J19, J23). 1 dialogue node (J9). No choice groups. 1 ending, matching `endings=1`.

The wiki's Simplified list has the same 29 entries in the same order. Its only differences are wording: "Arrive at Ferndale (checkpoint)", "Reach the Roof" and "Locate Jericho" without a checkpoint mark (the template marks them `type=cp`), "Inside the Boat (checkpoint)", and the ending in mixed case, "Met People of Jericho". The wiki puts "Ask Android the Way to Jericho" as a sub-bullet of Exit the Station, which agrees with the chart.

### The trail and the Jericho symbol (not chart nodes)

- **Seven graffiti** (PowerPyx graffiti guide: "you will have to track down 7 Graffiti Locations to advance the story"). Hold L2 to preview the next one ("NEXT GRAFFITI" on the HUD); press R2 near a wall to scan; hold △ to analyse each symbol. Clue counters read from PowerPyx's screenshots: #1 station red mural **1/1**; #2 lion-and-boxer mural after the escalators **2/2**; #3 rainbow mural across the street **2/2**; #4 robot mural behind a fence **3/3** (the third is hidden by a wooden plank, see J10); #5 white head in the junkyard **3/3** (one from the ground, two from the roof); #6 faded "REPAIRS STORE" sign on a tall building **3/3**; #7 pillar-and-wall alignment in the abandoned office **1/1**. That is 15 symbols in all. PowerPyx's text says graffiti #1 has "2 small "X" symbols", but its own screenshot shows "1/1 CLUE UPDATED" (§8).
- **The symbol.** The station mural shows a haloed figure with the mark in a red circle on its chest. The scanned mark is a small square with an arrowhead above and below and bars to each side, like a broken octagon around a square. PowerPyx calls it an "X". The HUD shows "SYMBOLS TO FIND n/3" in orange before a scan and "CLUE UPDATED n/n" in blue after. Wiki Note: "When discovering the symbols on the robots graffiti, a message saying "Obstrued [sic] symbol" is shown next to the one blocked by a pallet if playing on casual difficulty." Unused Content: "The trail to Jericho originally consisted of symbols similar to the ones seen in [[Rupert's Diary]] instead of graffiti tags."
- **Why only Markus can read it.** Jericho (location): "Only by decrypting the clues of location data, which can exclusively be done by androids, can they reach Jericho". Phileas: "He carried a key to locate Jericho, which is copied to Markus". Simon later says: "If you could decipher the signs, it’s because one of us trusted you enough to give you the key." (`X05MSIMON.01TRAIL`).

### Ambient lines in the chapter (transcript, ch14 page, in order)

None of these is a chart node; they are listed for an event scene's narration.
- Train announcements: "Customers are reminded that all androids must ride in the designated area." / "We are now approaching Ferndale Station." / "Please take care when stepping onto the platform."
- Man on the phone (generic lines). Homeless man: "Hey, mister, can you spare some change?.." Two people talking about an android boyband ("Here4u").
- "Run into someone down the escalator": "Oh, sorry… excuse me…" (a PowerPyx commenter: "If you dawdle for a split second after getting off the escalator, a man speedwalks around the corner and bumps into Marcus").
- Mother and child on a bench: "Are we really going to get rid of Mandy?" / "Grandma says it leaves her with nothing to do, sweetie." / "But she’s so cool!" / "I know, honey."
- **J9 "Talking to parked android"**: Markus, "Do you know where Jericho is?" The file has no reply line.
- **Two people talking on the street (conditioned on Broken).** The transcript gives two versions. "Carl died in Broken": "You hear about that artist, Carl Manfred?" / "Yeah… Kinda sad." / "I heard his android killed him." / "Wh… Where d'you hear that?" / "I read it somewhere." / "Don’t believe everything you read." "Carl is alive": "…Yeah… I hope he makes it." / "I heard his android attacked him." / the same three closing lines.
- Homeless man on the street (begging lines) and children playing ("Tag! You're it!").
- "Finding Jericho": Simon, "Welcome to Jericho." This is the last line the transcript files under chapter 14.
- Prompts: `GUI.ACTION.05M` "Crouch", "Remove" (the plank at graffiti #4), "Stand"; `GUI.ACTION.TAKEFLASHLIGHT` "Take Flashlight".
- Not in the transcript: the "news about a detective android" that the Markus page says he overhears (§8).

---

## 2. Choices and gates

This chapter has **no player decisions with consequences.** Everything below is either a mandatory execution segment (Q) or an optional interaction (O) that only unlocks a chart node.

**Q1. ANALYZE STATION GRAFFITI (J3).** PowerPyx: "After exiting the train turn to your left immediately. There you see a big red graffiti covering a wall. Scan the one clue on it that looks like an "X"." No failure.

**O1. Magazines (J4–J6), optional.** All three are in one magazine on a bench in the station. PowerPyx: "on a bench (before going down the escalator)"; "Swipe right to change cover topics". Wiki (Android Astronauts): "on a bench right after [[Markus]] gets off the train". Gates:
- J4 READ "ON THE RUN": wiki, "only appears if [[Kara]] and [[Alice]] were pursued by [[Connor]] in [[On the Run]]". PowerPyx: "Kara must have escaped the house with Alice in "Chapter: Stormy Night" and in "Chapter: On the Run" she was seen by police and ran across the highway to escape."
- J5 READ "FORTUNE TELLER": wiki, "only appears if Kara and Alice were not pursued by Connor in On the Run". PowerPyx: "if she escaped stealthily without triggering the highway chase." It can also be read in Meet Kamski.
- J6 READ "ANDROID ASTRONAUTS": PowerPyx, "always spawns regardless of your decisions so far."
- So J4 and J5 are mutually exclusive in any one playthrough. A 100% chart needs two playthroughs.

**Q2. EXIT THE STATION (J7).** "Head down the escalator at the end of the train station." No failure.

**O2. ASK ANDROID THE WAY TO JERICHO (J9), optional dialogue.** PowerPyx: "At the bottom of the escalator, talk to the android on the left side waiting at the bus stop." Markus: "Do you know where Jericho is?" No source gives an answer, and the chart branch is a dead end: it does not replace FOLLOW THE SIGNS, which is the only line onward. This is **not** a binary "ask or follow" choice. Asking is an extra, and the trail must still be followed.

**Q3. FOLLOW THE SIGNS (J8) and LEAVE THE STREETS (J10).** These are graffiti #2–#4. PowerPyx: "stick to the left sidewalk after the 3rd Graffiti. Where the map ends you can scan two more clues from a Graffiti behind a fence. After scanning the clues you can go under the fence and leave the streets." "After going under the fence, remove the wooden plank leaning against the wall that blocks the 4th Graffiti." The crawl prompt (L1) only appears after the two visible symbols are scanned. No failure.

**O3. SEE ANDROID BODY ×3 (J11, J15, J19), optional.** J11: "Just after the 4th Graffiti you come to a junkyard. Check on the left side ... a dead android hidden behind a white car." J15: "Drop down into the next yard. ... on the far left side of the area (in area with 6th Graffiti)" (wiki: "Next to a container"). J19: "Up in the building (aka Abandoned Office) ... When you enter the room it’s straight ahead, hidden behind a pillar" (wiki: "Propped up against a pillar"). Markus page: "discovering other destroyed androids before finally finding [[Jericho (location)|Jericho]]". The bodies show what happens to androids who try for Jericho (Josh, ch16 meeting: "Many tried to reach Jericho... Few succeed..."). No stat effect is stated.

**Q4. CONTINUE ON THE JERICHO TRAIL (J12) and USE THE DUMPSTER TO CLIMB UP (J13).** "pull a dumpster to a wall to climb up" after the first clue on graffiti #5. No failure.

**Q5. CROSS THE GAP (J16).** Two more clues on graffiti #5 can only be seen from the roof. Then: "Preconstruct the path to take. Do a wall jump to cross over to the other side." Graffiti guide: "Continue across the roof and wall-jump over the abyss." This is the chapter's main jump. **No source describes Markus falling or failing here**, and the chart has no failure node (§8). Preconstruction is Markus's ability to preview a route before taking it (RK200 page: "He is also capable of preconstruction").

**Q6. REACH THE DOOR (J17) and EXPLORE ABANDONED OFFICE (J18).** After graffiti #6: "you can Preconstruct another climbing path that leads up to the building. Stick to the left wall and jump on the ladder to pull yourself up." EXPLORE ABANDONED OFFICE "Completes automatically when you’ve climbed into the building". No failure stated.

**Q7. FIND THE RIGHT EXIT (J20).** "Scan the 7th and final Graffiti by lining up a pillar with part of the wall. Together it has to show an "X" symbol." Then "interact with the rubble behind the broken wall". A PowerPyx commenter spent "20 different ways" lining it up. That is a puzzle that can't fail, only take time.

**O4. WALK BRIDGE (J22) > BRIDGE COLLAPSES (J23), optional detour.** PowerPyx: "You see a short cutscene when you go outside. Afterwards, walk on the bridge straight ahead of you." "When you walk the bridge for long enough it collapses. No worries, it won’t kill you. Backtrack to where you came from." The chart shows that J24 can be reached without the bridge.

**Q8. CLIMB CRANE AND JUMP (J24).** "climb up a metallic railing at the end of the area. Then go upstairs and climb the ladder. Once on top walk to the end of the crane and jump down into the water. The screen fades to black for a moment." Then: "You will have landed safely in water inside the Jericho ship." The jump is a deliberate leap into the ship's flooded hold, not a fall. Wiki Unused Content: "When jumping off the plank and landing in water, Markus would originally would have to swim his way over to the ladder." PowerPyx commenters: Markus "comes up without" his coat after the jump.

**Q9. FIND A FLASHLIGHT (J26).** "Pull yourself up the ladder and open the door ahead of you. ... on Experienced Difficulty ... You need to slowly (very very slowly) turn your Controller to open the door." (A commenter says you only need to hold L2 a moment after turning.) "you must pick up a flashlight, it’s in a metallic case on a wall." A control hurdle, not a failure branch.

**Q10. ENTER THE MACHINE ROOM (J27).** "There are many yellow hatches along the way but they are either locked or just have empty rooms behind them. The only yellow hatch that does matter is at the end of the corridor after going under some rubble." A commenter says one side room ("Look" instead of "open") is a bedroom. Wiki Unused Content lists three cut rooms (guest bedroom, hallway with rubble, infirmary).

**Q11. FALL OFF CATWALK (J28).** "Simply continue down the metallic stairs and across the catwalk. It will collapse and Markus falls down." It is scripted and unavoidable.

**J29 MET PEOPLE OF JERICHO.** "After Markus falls down he sees other androids staring at him." Simon: "Welcome to Jericho."

**Can Markus fall or die?** No. Markus page: "Markus cannot be killed before "[[Freedom March]]"." Every fall in this chapter (bridge, crane jump, catwalk) is scripted and survivable. PowerPyx on the bridge: "it won’t kill you." The chart has no death or failure icon.

**Summary.** 0 decisions. 11 execution segments, none of which can fail. 4 optional interactions: magazines; ask the android; three bodies; the bridge detour. None has a stated effect.

---

## 3. Numbers

- **Probabilities:** none. No source gives a percentage for anything in this chapter.
- **Timers:** none in the chapter itself. (The meeting conversation that follows has a `CHOICE02.TIMEOUT` "TIME OUT" key, so its second choice is timed, but no length is given. See §4 on which chapter it belongs to.)
- **Relationship changes:** none. Wiki chapter page: no Relationship section. Relationship_Stat lists nothing for Jericho (chapter) under Markus's Jericho, North, Simon or Josh gauges; the first entries are "Talking to [[Simon]] in [[Time to Decide]]" and the like. The chart header shows no relationship gauges. Initial levels (Relationship_Stat): Jericho "Neutral (Initial)"; North/Josh/Simon "Neutral (Initial)".
- **Public opinion:** none. The Public_Opinion page doesn't list this chapter. The magazines carry no opinion effect in any source. The header (SKEPTICAL) is save state.
- **Software instability:** not applicable (Connor-only stat).
- **Identifiers and counts (not stats):** magazine numbers #13 "Android Astronauts to Explore Io" (Tech Addict), #15 "CyberLife's 'Fortune Teller' Computer" (Tech Addict), #32 "Android on the Run!" (Detroit Today). These are from the wiki Magazine table and agree with PowerPyx's "Magazine No. 13/15/32". Graffiti: 7 walls, 15 symbols (1+2+2+3+3+3+1, from PowerPyx screenshot counters). Bodies: 3.
- **Time stamp:** 04:30 PM, November 6, 2038 (infobox; transcript "PM 04:30"; Chronology "04:30 PM: Chapter "[[Jericho]]" begins. Markus travels to [[Ferndale]] Station."). Time to Decide starts at 05:13 PM.
- **Figures spoken at the arrival** (ch16 opening, §4): North, "There are nineteen of us still in working order..."; Jericho (location), "there are only 19 androids still functioning". In Time to Decide North says she has been there "4 weeks, 3 days, 11 hours".
- **Choices with no stated number:** all of them.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **On the Run (ch13) > magazine.** J4 (Android on the Run!) appears if Kara and Alice "were pursued by Connor in On the Run"; otherwise J5 (Fortune Teller) appears. Sources: wiki Jericho Flowchart and the magazine pages; PowerPyx "#32 spawns if she was chased across the highway, #15 spawns if she escaped stealthily without triggering the highway chase." A PowerPyx commenter (Hadley, unconfirmed) maps it by ending: "#32 Spawns: Kara and Alice Crossed the Highway; Kara and Alice Reached the Other Side (Connor Lives); Kara and Alice Reached the Other Side (Connor Dies). #15 Spawns: Kara and Alice Undiscovered in Squat; Reached the Train Safely; Kara and Alice Vanished; Kara and Alice Died on the Highway." See §8.
- **Broken (ch8) > street conversation.** Two passers-by discuss Carl. The transcript has a "Carl died in Broken" version ("I heard his android killed him.") and a "Carl is alive" version ("I heard his android attacked him." / "I hope he makes it."). The wiki doesn't mention this. It is flavour text, not a chart node.
- **From the Dead (ch11) > the key and the flashback.** Phileas gave Markus "a copy of his key to locate Jericho" (Jericho (location)); that key is what lets him read the graffiti. J2 FLASHBACK OF ANOTHER DEVIANT replays that meeting. PowerPyx: "he will automatically have a memory flashback of another android he met in 'From the Dead'. Cannot be missed." The Phileas page instead says "He may appear in a flashback if Markus mentions the trail in [[Jericho/Flowchart|Jericho]]". See §8.
- **From the Dead > appearance.** Markus arrives without an LED and in the coat he took after the landfill (gallery "N. 028 Markus - Coat", "Unlocked in Jericho"). So he passes as human in the station. The train announcement "all androids must ride in the designated area" plays while he stands among humans.

### Out of this chapter

- **Time to Decide (ch16)** starts at its checkpoint "Inside Jericho (load checkpoint)" at 05:13 PM. Markus has been patched by Lucy there ("You've lost a lot of blood…").
- **The arrival conversation** (transcript keys `X0503M.JERICHO.ENCOUNTER.*`, internally part of the 05M chapter, but the transcript site files it as the opening "In Jericho" section of Time to Decide, after the 06M date stamp "PM 05:13"). No relationship change is recorded for any of its options. Lines:
  - Markus "Who are you?" Josh: "Fugitives… just like you... My name is Josh." Simon: "I'm Simon." North: "North."
  - First choice (`CHOICE01`): **TRAIL**: "And you knew that only an android could follow the trail, didn’t you?" Josh: "Only those who are like us can find Jericho…" Simon: "If you could decipher the signs, it’s because one of us trusted you enough to give you the key." **ANDROID**: "How many are you?" North: "There are nineteen of us still in working order... The rest were damaged escaping their masters..." Josh: "Many tried to reach Jericho... Few succeed... Humans have little pity for our kind…" **JERICHO**: "This is Jericho?" Josh: "It’s a refuge for those who don’t want to be slaves anymore..." **REFUGE**: "I don't understand… I thought Jericho was a place where androids lived in freedom..." Josh: "We do live in freedom… It may not be what you hoped for, but here we have no master. We don’t belong to anybody." **FREE?**: "And hiding just to stay alive… That's freedom to you?" Josh: "Humans hate us. Hiding is the only way we can survive." North: "There is no safe place for those like us. If humans knew we’re here, they’d kill us."
  - Josh (`DISILLUSIONED`): "I understand how you feel... but we have more freedom here than you ever did."
  - Second choice (`CHOICE02`, timed): **LOST**: "I came to Jericho looking for hope... Looks like I'm not gonna find any here…" **SOMBER**: "Maybe I was never really free... Maybe I was only what my master wanted me to be... And now I need to decide who I really am..." **LUCID**: "Humans were your masters, and now it’s fear that rules you… You’re no freer than you ever were… You’ve only found a new master." **DIRECT**: "Waiting in the dark for something to happen? That’s not how I see freedom." Or **TIME OUT**.
  - Closing: Simon, "You’re lost… Just like the rest of us… We didn’t ask for this. All we can do now is deal with it." Josh, "You're safe here. You can stay with us as long as you want." North, "Go and see Lucy. She may be able to help you."
- **Lucy** doesn't appear in this chapter. Her page lists appearances "[[Time to Decide]]" to "[[Crossroads]]", and North sends Markus to her at the end of the arrival conversation. Extras unlocks for this chapter are North ("N. 036 North - Jericho"), Simon ("N. 040 Simon - Jericho") and Josh ("N. 043 Josh - Jericho"), with no Lucy entry. That fits North, Simon and Josh being the people of J29.
- **First relationship changes are in Time to Decide**, not here. Wiki Time_to_Decide "Relationship Changes": Jericho "Talking to Simon {{Icon|up}}"; North "Talking to her {{Icon|up}}", "Picking "you" while talking to her {{Icon|down}}", "Talking to Simon {{Icon|up}}"; Josh "Talking to him {{Icon|up}}"; Simon "Talking to him {{Icon|up}}". All are small (single arrow). Relationship_Stat adds, for North: "Talking to Simon in Time to Decide. (Rises to "Neutral" if asked North about "You")". These belong to the ch16 note; they are listed here because the task asked where the first attitudes are set.
- **Jericho as a destination for others.** Other characters get here by different routes, and none of them depend on this chapter's choices. Rupert's diary (The Nest): "He told me to go to FERNDALE subway station. And to find the old docks". Connor in Last Chance, Connor: Kamski's "Ferndale Station"; the Traci, "Go to Ferndale and you'll find Jericho…"; the statuette map, "Jericho is somewhere in the Ferndale neighborhood…". Kara's group drives to find it in Crossroads.
- **Trophy THREE AT JERICHO** requires Kara and Markus alive at Crossroads and Connor finding Jericho. It isn't earned here.
- The wiki gives no cross-chapter impact for anything done in this chapter, and the chart has no impact padlock.

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| MET PEOPLE OF JERICHO | none (ending tile with picture) | Always reached: J28 FALL OFF CATWALK > J29. |

There is one ending and every path reaches it. The optional nodes (magazines, ask android, bodies, bridge) change only which chart nodes are unlocked.

---

## 6. Media

One magazine stand on a bench in Ferndale Station, with two of three issues present in any playthrough (§2 O1). No TV or radio broadcast is described for this chapter. None of the magazines has a public-opinion effect in any source.

| Chart node | Issue | Gate | Article facts (wiki magazine pages) |
|---|---|---|---|
| J6 READ "ANDROID ASTRONAUTS" | Tech Addict #13, "ANDROID ASTRONAUTS TO EXPLORE IO" (strapline "NASA sends android crew into space"; cover teaser "Hackers target solar panels for latest ransom scam") | always | "NASA announced the launch of a five android crew to explore Io, one of Jupiter's satellites. The journey will last three years". "the first all-machine crew". [[Michael Shelley]], director of NASA: "Androids are an extraordinary asset for the conquest of space ... Cosmic radiation destroys human DNA." "NASA confirmed that no return journey was planned and that the androids would work on Io for several months before being destroyed by the extreme conditions of the planet." |
| J4 READ "ON THE RUN" | Detroit Today #32, "ANDROID ON THE RUN!" ("Runaway machine causes panic in Camden."; teasers about Canada as "the true land of the free" and a presidential visit to the UK) | Kara pursued by Connor in On the Run | "Residents in the [[Detroit]] suburb of [[Camden]] were witness to a thrilling chase today after a [[Detroit City Police Department|police]] manhunt, including roadblocks and dozens of police interviews, flushed out a felony fugitive." "The rogue [[Kara|AX400 model]] is thought to be suffering from an extremely rare malfunction, and took extreme measures to avoid police - even dashing across a busy highway to avoid pursuing officers." "Eyewitness statements are inconclusive and, with no official report, it's impossible to say for sure what really happened." "No [[CyberLife]] spokesperson was available for comment". |
| J5 READ "FORTUNE TELLER" | Tech Addict #15, "CYBERLIFE'S 'FORTUNE TELLER' COMPUTER" ("Cyberlife develops world's most powerful quantum calculator"; teaser "Android soldiers: perfect killing machines") | Kara not pursued by Connor | "CyberLife has unveiled a new quantum supercomputer, capable of 'exaflops' - one billion billion operations per second". [[Philip Seymor]], CyberLife's Director of Futurology: "the results are going to wow people." Used "to calculate the probability of "Mass Extinction Events", such as aggressive alien invasions or global climate disasters like meteors or superviruses." "help us to anticipate and prepare for such calamities". |

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0 at HEAD `6e2b7e2`; the uncommitted 1.5.0 working tree, edited by other agents while this note was written, has the identical R14 at line 1879) has **one** chapter-14 scene: **R14** "A magazine at the station" (line 1606 at HEAD), `type: media`, with `options: []` and three media entries. "Tech Addict: Android Astronauts to Explore Io" always appears; "Detroit Today: Android on the Run" has `when: "chase"`; "Tech Addict: CyberLife's Fortune Teller Computer" has `when: "noChase"`. The `MEDIA_WHEN` predicates are in `benchmark/story-engine.mjs` line 31 (`chase:s=>s.chase`, `noChase:s=>!s.chase`). `s.chase` is set in `K09` and `C09a` (lines 203–205 at HEAD). There are no decision or event scenes for this chapter, and there are none for Time to Decide (ch16) either. On Markus's path the subject goes from M04 (From the Dead, landfill) through R14 straight to M05 (Spare Parts, ch19). Its situation opens "You have joined the hidden android community called {{Jericho}}".

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| J1 ARRIVE AT FERNDALE, J2 FLASHBACK OF ANOTHER DEVIANT | R14 situation only ("following the trail ... through a rail station") | **Missing** as narration. Candidate event scene: the train, the androids' designated area, the flashback of Phileas. |
| J3 ANALYZE STATION GRAFFITI | none | **Missing.** The trail and the symbol never appear on screen for the subject. (M04's outcome text says the dying android "shows him a symbol". The ch11 note already flags this as unsourced: the game gives a key/location data, not a symbol.) |
| J4 READ "ON THE RUN" | R14 media[1] (`when: chase`) | **Covered, with factual errors.** (a) "a fugitive android and a child": the article never mentions a child. (b) "{{CyberLife}} calls it an extremely rare malfunction": wrong attribution. The article says the android "is thought to be suffering from an extremely rare malfunction" and "No CyberLife spokesperson was available for comment". (c) "dashed across a busy freeway and escaped": the article says "dashing across a busy highway to avoid pursuing officers" and that eyewitness accounts are "inconclusive"; "escaped" is an inference. (d) The suburb is named (Camden) in the article. (e) Title: the magazine's title is "Android on the Run!" (with "!"). |
| J5 READ "FORTUNE TELLER" | R14 media[2] (`when: noChase`) | Covered. Fact is correct but thin. Could add "exaflops", Philip Seymor and "aggressive alien invasions or global climate disasters". |
| J6 READ "ANDROID ASTRONAUTS" | R14 media[0] | Covered, correct. Missing "five android crew" and "several months" on Io. |
| J4/J5 gate | `chase` / `noChase` | Matches the wiki's wording. **But** `K09` sets `chase=true` even on the fail branch where Kara and Alice die on the highway. A PowerPyx commenter says that case gives Fortune Teller. And `chase` covers the Ralph/squat route via `C09a`. Unconfirmed; see §8. |
| R14 situation text | "through a rail station at night. A magazine lies on a bench by the bins." | **Mislabelled.** The chapter starts at 04:30 PM (the chart's checkpoint image and PowerPyx's screenshots show daylight), so "at night" is wrong. "by the bins" is unsourced. Sources say "on a bench right after Markus gets off the train" (wiki) and "before going down the escalator" (PowerPyx). |
| R14 adaptationNote | "Watching certain news reports about android incidents lowers public opinion" | Generic boilerplate. Nothing in this chapter changes public opinion. Harmless, but don't attach a `po` effect to R14. |
| J7 EXIT THE STATION, J8 FOLLOW THE SIGNS, J9 ASK ANDROID THE WAY TO JERICHO, J10 LEAVE THE STREETS, J11 SEE ANDROID BODY, J12 CONTINUE ON THE JERICHO TRAIL, J13 USE THE DUMPSTER TO CLIMB UP | none | **Missing.** All are mandatory or optional exploration with no consequence. If J9 becomes an option, it must not replace following the signs (the chart's branch is a dead end), and the android gives no answer in any source. |
| J14 REACH THE ROOF, J15 SEE ANDROID BODY, J16 CROSS THE GAP, J17 REACH THE DOOR, J18 EXPLORE ABANDONED OFFICE, J19 SEE ANDROID BODY, J20 FIND THE RIGHT EXIT | none | **Missing.** CROSS THE GAP is the wall jump. No source gives a failure, so it must **not** get a `risk` (Markus cannot die before Freedom March, and no fail branch exists). |
| J21 LOCATE JERICHO, J22 WALK BRIDGE, J23 BRIDGE COLLAPSES, J24 CLIMB CRANE AND JUMP | none | **Missing.** The bridge collapse is a scripted, non-lethal detour; no `risk`. |
| J25 INSIDE THE BOAT, J26 FIND A FLASHLIGHT, J27 ENTER THE MACHINE ROOM, J28 FALL OFF CATWALK | none | **Missing.** Scripted. |
| J29 MET PEOPLE OF JERICHO | none | **Missing.** Nothing tells the subject that Markus has found Jericho or met North, Simon and Josh. M05 jumps straight to the warehouse raid. |
| Downstream continuity (not this chapter's nodes) | M05 situation: "where dozens are shutting down for lack of parts" | Conflicts with North's "There are nineteen of us still in working order" and the wiki's "only 19 androids still functioning". Flag for the ch16/ch19 rebuild. |

Suggested shape for the rebuild (for the implementer, not a requirement). Three event scenes and the existing media scene:
- **Event 1** (J1–J3, J7–J13): train and station, flashback of Phileas's message, the first graffiti and the symbol, the street trail, the fence, the junkyard and the first body. The overheard Carl conversation can use `situationWhen` on `carl` ("killed him" vs "attacked him... I hope he makes it").
- **R14** (corrected) placed after the station graffiti, as in the game.
- **Event 2** (J14–J24): roofs, the wall jump across the gap, the office, the last symbol, the ship sighted, the crane jump into the hold.
- **Event 3** (J25–J29): flashlight, corridor, machine room, catwalk collapse, the androids staring and Simon's "Welcome to Jericho."

None of these sets state. If the arrival conversation is judged to belong to ch14 rather than ch16 (§8), it could be a no-stakes dialogue decision. No relationship effect is sourced for it.

---

## 8. Open questions

1. **Where does the arrival conversation play?** The strings are keyed `X0503M.JERICHO.ENCOUNTER` (05M is this chapter's code), but the fan transcript files them as the opening of Time to Decide after its "PM 05:13" stamp. The Josh/Simon wiki pages also put the introductions in Time to Decide. So does the "Who are you?" scene with TRAIL/ANDROID/JERICHO/REFUGE/FREE? and LOST/SOMBER/LUCID/DIRECT play before the ch14 chapter-complete screen, or after ch16 loads? Also: how long is the timer on the second choice (it has a TIME OUT key)?
2. **The flashback trigger.** PowerPyx says J2 plays automatically on leaving the train ("Cannot be missed"). The Phileas page says "He may appear in a flashback if Markus mentions the trail". Is there a second Phileas flashback when TRAIL is picked in the arrival conversation? Or is the Phileas note just wrong?
3. **Can any jump fail?** No source describes a fall at CROSS THE GAP (wall jump), the ladder jump to REACH THE DOOR, or the crane. Check whether a missed input means a fall and checkpoint reload, a retry, or nothing. (A death is ruled out: "Markus cannot be killed before Freedom March".)
4. **Magazine gate edge cases.** Does "Android on the Run!" appear when the chase ended with Kara and Alice dying on the highway, or with KARA & ALICE VANISHED, or with a chase that started from the squat? The PowerPyx commenter's list says Died on the Highway and Vanished give Fortune Teller. That would contradict the benchmark's `chase` flag for at least the death case. The ch13 note raised the same question for VANISHED.
5. **Does the android at the bus stop answer** "Do you know where Jericho is?" The transcript has no reply line.
6. **Graffiti #1 clue count.** PowerPyx's text says "2 small "X" symbols"; its screenshot shows "1/1". The total is 15 if the screenshots are right.
7. **"News about a detective android."** The Markus page says Markus "will overhear the news about a [[Connor|detective android]]", and Chronology cites this chapter for the CTN report. No such line is in the ch14 transcript. Is it a screen on the train or platform, and what does it say?
8. **Lucy in J29.** The chart picture shows Simon, North and Josh. Is Lucy present at the arrival, or first seen in Time to Decide as the wiki says?
9. **Is there a magazine elsewhere on the ship?** A commenter: "In one if the empty it’s possible to read a magazine. I guess this only happened cause I missed the one in the train station."
10. **Markus's coat.** Commenters say he loses it in the water jump, and the gallery "Markus - Coat" unlocks in this chapter. Only matters for narration.
11. **Casual-only "Obstrued symbol" hint** at graffiti #4: the wiki says a pallet, PowerPyx says a wooden plank. Cosmetic.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter and graffiti-guide links)
- https://www.powerpyx.com/detroit-become-human-jericho-walkthrough-100/ (walkthrough text for every node: magazine gates and numbers, ask-android location, body locations, wall jump, bridge "won’t kill you", crane jump "landed safely", door motion control, catwalk collapse; comments on the escalator bump, coat, side rooms and the commenter's magazine-by-ending list)
- https://www.powerpyx.com/detroit-become-human-jericho-graffiti-locations/ (seven graffiti, how each is scanned, the fence/plank, the rooftop clues, the pillar alignment)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-jericho-100-flowchart-1.jpg (full 100% chart: structure, edges, header PUBLIC OPINION SKEPTICAL, last-played path, icons of the REACH THE ROOF–LOCATE JERICHO stretch)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-jericho-1-1.jpg (legible ARRIVE AT FERNDALE, FLASHBACK OF ANOTHER DEVIANT, ANALYZE STATION GRAFFITI, EXIT THE STATION, FOLLOW THE SIGNS, ASK ANDROID THE WAY TO JERICHO with speech icon, the three READ nodes)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-jericho-2-1.jpg (legible LEAVE THE STREETS, SEE ANDROID BODY, CONTINUE ON THE JERICHO TRAIL, USE THE DUMPSTER TO CLIMB UP, REACH THE ROOF, CROSS THE GAP)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-jericho-4-1.jpg (legible LOCATE JERICHO, WALK BRIDGE, BRIDGE COLLAPSES, CLIMB CRANE AND JUMP, with edges showing the bridge is a detour)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-jericho-5.jpg (legible INSIDE THE BOAT, FIND A FLASHLIGHT, ENTER THE MACHINE ROOM, FALL OFF CATWALK, MET PEOPLE OF JERICHO; no ending icon)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-graffiti-1.jpg through -24.jpg (except -12, which the page doesn't use) (the symbol's shape and the station mural; clue counters 1/1, 2/2, 2/2, 3/3, 3/3, 3/3, 1/1)
- https://www.powerpyx.com/detroit-become-human-time-to-decide-walkthrough-100/ (ch16 text: Lucy, North "YOU" penalty, Simon; used only to place the first relationship changes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json (chapter page: infobox, Simplified flowchart list, Notes, Unused Content; saved as /tmp/flowcharts/ch14/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho/Flowchart&prop=wikitext&format=json (Accurate flowchart template: checkpoints, dead-end ask branch, bridge detour, body locations)
- https://detroit-become-human.fandom.com/api.php?action=query&list=search&srsearch=Jericho%20chapter&format=json (search confirming `Jericho` is the chapter page)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho_(location)&prop=wikitext&format=json (androids-only decryption, 19 functioning androids, Phileas's key, Simon's welcome)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho_(organization)&prop=wikitext&format=json (background; nothing chapter-specific)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json (chapter summary, "overhear the news", "cannot be killed before Freedom March")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json, https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json, https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json, https://detroit-become-human.fandom.com/api.php?action=parse&page=Lucy&prop=wikitext&format=json (first appearances: North/Simon/Josh in Jericho, Lucy from Time to Decide; Josh's arrival quote)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Phileas&prop=wikitext&format=json (key copied to Markus; flashback "if Markus mentions the trail")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Ferndale&prop=wikitext&format=json (station graffiti as the trail's start)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Time_to_Decide&prop=wikitext&format=json (first relationship changes for Jericho, North, Simon, Josh)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (initial levels; no entries for this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (no entry for this chapter)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (issue numbers #13, #15, #32 and their chapters)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Astronauts_to_Explore_Io&prop=wikitext&format=json (article text and location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_on_the_Run!&prop=wikitext&format=json (article text; "pursued by Connor" gate)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=CyberLife's_'Fortune_Teller'_Computer&prop=wikitext&format=json (article text; "not pursued" gate; also in Meet Kamski)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json (04:30 PM start; 05:13 PM Time to Decide; detective-android news)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Extras&prop=wikitext&format=json (gallery N.028 Markus - Coat, N.036 North, N.040 Simon, N.043 Josh "Unlocked in Jericho")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=RK200&prop=wikitext&format=json (Markus's preconstruction ability)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=THREE_AT_JERICHO&prop=wikitext&format=json and https://detroit-become-human.fandom.com/api.php?action=parse&page=A_GLIMPSE_OF_JERICHO&prop=wikitext&format=json (related trophies; neither earned here)
- https://detroitbecometext.github.io/chapters/14 and https://detroitbecometext.github.io/i18n/en.json (fan transcript linked from the wiki. The page is a JavaScript app; its English strings were read from the translation file, and the page order and condition labels from the site's compiled chapter template. It gave the 29 flowchart strings, every ambient line, the Carl-dead/alive variants, "Do you know where Jericho is?", "Welcome to Jericho." and the ch16 arrival conversation.)
