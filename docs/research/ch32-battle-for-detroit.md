# Chapter 32: Battle for Detroit (Kara, Markus, Connor) and the post-credits Chloe choice

This note covers the game's final chapter, which has six flowcharts (two per character), the President Warren press conference that opens it, the Zen Garden epilogue and credits scenes, and the main-menu Chloe choice the benchmark stores as chapter 33. Written 2026-11-06.

Sources:
- The PowerPyx flowchart photographs: 41 full-size images from three walkthrough pages, one per character.
- The game's own flowchart string table, which gives every node label exactly. It is in the fan transcript's `public/i18n/en.json` under `MENU.FLOWCHART.04A.*`. The game's internal ID for this chapter is `04A`, with sub-charts `KA` (Kara Leaving Detroit), `KB` (Kara Captured), `CA` (Connor's Last Mission), `CB` (Connor at the CyberLife Tower), `MA` (Markus Revolution) and `MB` (Markus Demonstration).
- The HUD strings (`THOUGHTS.0901K`, `1102M`, `1103M`, `1301C`) and the time stamps (`GUI.MENU.TIME.04A.*`).
- The six fan-transcript chapter templates (`32.1` to `32.6` plus the shared `press-dirty-bomb` component). I fetched them from the transcript's GitHub repository and rendered them against `en.json`.
- The Fandom wiki chapter page. All six sub-pages (`Battle for Detroit - Kara Leaving Detroit`, etc.) redirect to it. It is still tagged `{{Stub}}` and has no probability tables.
- The wiki's stat, character, magazine, trophy and location pages.
- The PowerPyx walkthrough text and reader comments.

Working files are in `/tmp/flowcharts/ch32/` (not committed):
- `wiki.txt`
- `wikipages/`
- `strings04A.txt` (the flowchart string table, 624 lines)
- `transcript32.1.txt` to `transcript32.6.txt`
- `pp-kara.txt`, `pp-connor.txt`, `pp-markus.txt`
- `bench32.json` (the benchmark's chapter 32/33 nodes)
- `crops/`

The renderer is `/tmp/ch32scripts/render.py`. It is the ch25 agent's script, patched to read bracketed choice items.

Game dates and times (`GUI.MENU.DATE.04A` / `TIME.04A`):

| Moment | Date and time |
|---|---|
| Press conference | NOV 10TH, 2038, PM 09:24. The wiki infobox says "9:24 AM"; see Open questions. |
| Chapter proper | NOV 11TH, 2038. Value: PM 10:46. |
| Connor at the rooftop or tower | PM 10:48 (`CB01`/`CG01`) |
| Kara in the streets or the truck | PM 10:51 |
| Markus at Hart Plaza | PM 10:56 |
| Floor -49 and the Revolution charge | PM 11:01 |
| Kara at the terminal | PM 11:02, or PM 11:15 if late (`KB02B`) |
| River | PM 11:26 |
| Border | PM 11:30 |
| Canada | PM 11:36 |
| Far shore | PM 11:57 |
| Markus speech | PM 11:42 (`SPEECH`) and AM 12:01 (`AFTER`) |
| Captured epilogue | AM 07:37 (`KEP02`) |

Wiki: "This chapter has sixty-one different outcomes." It breaks down as Kara 27 (Leaving Detroit 12, Captured 15), Connor 11 (CyberLife Tower 8, Last Mission 3) and Markus 23 (Demonstration 5, Revolution 18). Every ending card on the six photographed charts was counted, and the totals match per sub-chart.

## Summary

### Which sub-chart a character plays

| Sub-chart | Played when |
|---|---|
| Kara Leaving Detroit | Kara escaped Crossroads. Being spotted early in this chapter transfers her to Kara Captured. |
| Kara Captured | Kara was captured in the Jericho raid, or was arrested in this chapter. |
| Connor's Last Mission | Connor is a machine. This includes a deviant Connor who died at Jericho, and the case where Markus shot him in Night of the Soul. |
| Connor at the CyberLife Tower | Connor is a deviant who left Jericho alive. |
| Markus Demonstration | Markus chose demonstration in Night of the Soul. |
| Markus Revolution | Markus chose revolution. If Markus is dead, North leads, and only the `NORTH IN HART PLAZA` branch of this chart plays. |

### Chart size

These counts exclude bracketed phase labels and yellow condition tabs.

| Sub-chart | Nodes | Endings |
|---|---|---|
| Kara Leaving Detroit | about 142 | 12 |
| Kara Captured | about 142 | 15 |
| Connor's Last Mission | 33 | 3 |
| Connor at the CyberLife Tower | 63 | 8 |
| Markus Demonstration | 63 | 5 |
| Markus Revolution | 101 | 18 |

That is about 544 chart nodes in total.

### Decisions

- About 55 player decision points on the charts:
  - Kara Leaving 11
  - Kara Captured 14
  - Last Mission 3
  - CyberLife 6
  - Demonstration 6
  - Revolution 10
  - Off-chart finale 5: the Warren press questions, the Zen Garden escape, Connor-as-leader SUICIDE/GIVE UP, machine Connor SHOOT/DON'T SHOOT in the crowd, and Chloe
- About 14 quick-time-event outcome pairs.
- About 25 off-chart dialogue rounds.

### Numbers found

The wiki states no probabilities for this chapter.

- Bus route HUD: `DETOUR: SAFER 1.7KM - 11MIN` and `CHECKPOINT: RISKY 0.750KM - 3MIN`. Kara says the bus leaves in 20 minutes.
- Late-bus threshold: "if 11 minutes or more remaining" (wiki).
- River: `DANGER TEMPERATURE : 30.8°F`, and "four-minute timeframe" to lighten the boat (PowerPyx).
- Elevator: `STOP ELEVATOR BEFORE FLOOR 31`, Floor 31 and Floor -49.
- Revolution success-rate percentages. These are reader-reported only: 11-second order timer, about 10% per failed order, 45% at the first barricade, 33% after saving Simon.
- Alice's stress meter reaches 100%.
- Public opinion threshold for the peaceful ending: at least Sympathetic (wiki). PowerPyx says Supportive.
- Relationship and public-opinion changes are listed in section 3.

### Best endings

| Character | Best ending |
|---|---|
| Kara | `THE GROUP CROSSED THE BORDER`: no sacrifice at the border while Markus is demonstrating, Luther alive. The wiki calls it "widely considered the best". The safe alternatives are `KARA & ALICE SURVIVED` (river, captured) and `KARA, LUTHER AND ALICE ESCAPED ON TRUCK`. |
| Markus | `ANDROIDS WON FREEDOM - FOR THE MOMENT` (sing or kiss with public opinion at least Sympathetic), or `ASSAULT WAS SUCCESSFUL` (revolution). |
| Connor (deviant) | `THE ANDROIDS WOKE UP` with Hank alive: save Hank, then answer COLE. Then escape the Zen Garden through Kamski's exit (trophy `MY TURN TO DECIDE`), and the Hank-and-Connor hug in the credits (Hank FRIEND and a successful uprising). |
| Connor (machine) | `CONNOR LEFT ROOFTOP` via GIVE UP, which needs Hank FRIEND. |

---

## 1. Flowchart transcription

Icon key, as in the earlier notes:
- [arrow] = action
- [triangle] = event the game triggers
- [choice] = overlapping-squares choice marker
- [outcome] = a choice marker whose rows carry ✓/✗ (a quick-time or skill result rather than a pick)
- [branch] = small origin glyph for an optional side branch
- [dialogue] = speech-bubble icon (a conversation node)
- [cond] = yellow condition tab with a padlock, gating the node after it
- [skull] = yellow tab with a skull on an ending
- [⊘] = yellow tab with a no-entry sign

On this chapter's Kara charts, [⊘] marks exactly the endings and choices in which Alice dies (for example `KARA & ALICE DIED`, `ALICE DIED AND KARA CONTINUED ALONE`, `SURRENDER`). [skull] marks the endings in which Kara dies but Alice lives (`KARA DIED AND ALICE SURVIVED`, `ALICE GOT TO CANADA WITH ROSE`, `ALICE ESCAPED ON TRUCK`). On the Connor and Markus charts every death ending carries [skull]. Large image cards are endings, start cards or checkpoints. "CHECKPOINT" is quoted only where the card prints it.

Labels below are copied from the game string table (`strings04A.txt`) and checked against the photographs. Every drawn label matches a string. Strings that exist but are not drawn are listed per chart.

### 1a. Kara Leaving Detroit (`04A.KA`)

Images used:
- `detroit-battle-kara-leaving-1-flowchart-99.jpg` (overview)
- `-2-detroit-street`
- `detroit-become-human-kara-leaving-security-checkpoint`
- `-4b-at-terminal`
- `detroit-become-human-kara-canadian-border`
- `-6-border-endings`
- `-7-river-path`
- `-8-river-sinking`
- `-9-river-endings`

The street image is headed `90% COMPLETED` and the overview's file name says 99%. The world-stats strip reads `PUBLIC OPINION HATED`, `ALICE FAMILY`, `LUTHER NEUTRAL`. PowerPyx links no images numbered 3, 4a or 5; the two `detroit-become-human-*` images fill those positions.

**A Detroit street**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `A DETROIT STREET` | start card | chapter start |
| 2 | `SEE HANGED ANDROID` | [arrow] from [branch] | optional |
| 3 | `WATCH BROADCAST ABOUT JERICHO'S ATTACK` | [arrow] from [branch] | optional; only if Jericho was attacked |
| 4 | `LUTHER FINDS A GUN` | [triangle] | #1; Luther with Kara from the start (Connor never found Jericho) |
| 5 | `FIND A GUN` | [triangle] | #1; Luther dead or separated |
| 6 | `HIDE FROM MILITARY` | [triangle] | #4 or #5 |
| 7 | `SNEAK PAST SOLDIERS` | [arrow] | #6 |
| 8 | `FIND JERRYS` | [triangle] | #7 |
| 9 | `FIND LUTHER & JERRY` | [triangle] | #7; [cond] `LUTHER SAVED IN 'CROSSROADS'` |
| 10 | `SAVE JERRYS` | [choice] row 1 | #8 |
| 11 | `SAVE LUTHER` | [choice] row 2 | #9 |
| 12 | `HURRY` | [choice] row 3 | #8/#9 |
| 13 | `GRAB ROCK` | [arrow] | #10/#11 |
| 14 | `HIT SOLDIER WITH ROCK` | [arrow] | #13 |
| 15 | `JERRYS FLEE` | [triangle] | #14 |
| 16 | `JERRY FLEES AND LUTHER JOINS THE GROUP` | [triangle] | #14 |
| 17 | `CONTINUE TO BUS TERMINAL` | [arrow] | #12, #15/#16 |
| 18 | `SPOTTED BY SOLDIERS` | [triangle] from [branch] | any point before #17 |
| 19 | `KARA & ALICE ARRESTED` | [triangle] | #18 |
| 20 | `KARA, ALICE & LUTHER ARRESTED` | [triangle] | #18 |
| 21 | `SEE: KARA CAPTURED FLOWCHART` | yellow link tab with padlock | #19/#20 |

**Security checkpoint**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 22 | `SECURITY CHECKPOINT` | large card, no caption | #17 |
| 23 | `APPROACH CHECKPOINT` | [choice] row 1 | #22 |
| 24 | `TAKE DETOUR` | [choice] row 2 | #22 |
| 25 | `HAND OVER ID` | [arrow] | #23 |
| 26 | `TALK TO GUARD` | [arrow] | #25 |
| 27 | `GUARD CALLS OUT TO KARA` | [triangle] | #26; Luther not with Kara |
| 28 | `DON'T SHOOT` | [choice] row 1 | #27 |
| 29 | `SHOOT` | [choice] row 2 | #27 |
| 30 | `GUARD RETURNS ALICE'S GLOVE` | [triangle] | #28 |
| 31 | `SHOOTS GUARDS` | [triangle] | #29 |
| 32 | `LUTHER IS NERVOUS` | [triangle] | #26; Luther with Kara |
| 33 | `ASK LUTHER TO SHOOT` | [choice] row 1 | #32 |
| 34 | `ASK LUTHER TO STAY CALM` | [choice] row 2 | #32 |
| 35 | `GUARD APPROACHES` | [triangle] | #34 |
| 36 | `ASK LUTHER TO SHOOT` | [choice] row 1 | #35 |
| 37 | `ASK LUTHER TO STAY CALM` | [choice] row 2 | #35 |
| 38 | `LUTHER SHOOTS GUARDS` | [triangle] | #33 or #36 |
| 39 | `GUARD RETURNS ALICE'S GLOVE` | [triangle] | #37 |
| 40 | `ALICE FINDS HER GLOVE` | [triangle] | #31 or #38 |
| 41 | `DELAYED` | [triangle] | #24 |

Lines leave #30, #39, #40 and #41 for #42. #41 also leads to #43.

**At the bus terminal**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 42 | `AT THE BUS TERMINAL` | large card, no caption | #30/#39/#40, or #41 with time left |
| 43 | `LATE FOR THE BUS` | large card, no caption | #41 when late |
| 44 | `LAST BUS DEPARTS` | [triangle] | #43 |
| - | `FIND A WAY TO THE BORDER` | bracketed phase label | entered from #42 and #44 |
| 45 | `WATCH TV` | [arrow] | bracket |
| 46 | `MARKUS ATTACKS HUMANS` | [triangle] | #45; Markus revolution |
| 47 | `MARKUS LEADS PROTEST` | [triangle] | #45; Markus demonstration |
| 48 | `READ "CIVIL WAR"` | [arrow] | bracket; magazine, revolution only |
| 49 | `ALICE MEETS A MOTHER` | [triangle] | bracket; not when late (wiki) |
| 50 | `PARENTS DROP BUS TICKETS` | [triangle] | #49 |
| 51 | `STEAL TICKETS` | [choice] row 1 | #50 |
| 52 | `RETURN TICKETS` | [choice] row 2 | #50; no outgoing line (free roam continues) |
| 53 | `SECURITY CHECK` | [triangle] | bracket |
| 54 | `FLEE` | [choice] row 1 | #53 |
| 55 | `HAND OVER ID` | [choice] row 2 | #53 |
| 56 | `ASK LUTHER TO CREATE DIVERSION` | [choice] row 3 | #53; Luther with Kara |
| 57 | `MEET TODD` | [arrow] | bracket; Todd alive |
| 58 | `PERSUADE TODD` | [choice] row 1 | #57 |
| 59 | `FAIL TO PERSUADE TODD` | [choice] row 2 | #57 |
| 60 | `TODD SENDS SOLDIERS AWAY` | [triangle] | #58 |
| 61 | `ALICE SAYS GOODBYE TO TODD` | [triangle] | #60; no outgoing line |
| 62 | `SOLDIERS ARRIVE FOR SECURITY CHECK` | [triangle] | #59 |
| 63 | `LUTHER CREATES A DIVERSION` | [triangle] | #62; Luther with Kara |
| 64 | `ADAM CALLS OUT TO KARA` | [triangle] | #63 or #56 |
| 65 | `WATCH TERMINAL TVs` | [arrow] | bracket; the departures board, no outgoing line |
| 66 | `FIND ADAM` | [arrow] | bracket |
| 67 | `BOARD THE BUS` | [arrow] | #51; to #71 |
| 68 | `GET IN ROSE'S CAR` | [arrow] | #64 or #66; to #106 |
| 69 | `SOLDIERS EXECUTED KARA, ALICE & LUTHER` | ending [⊘] | #54/#55 through a merge glyph, Luther present |
| 70 | `SOLDIERS EXECUTED KARA & ALICE` | ending [⊘] | #54/#55 through the merge glyph, or #62, Luther absent |

**Canadian border**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 71 | `CANADIAN BORDER` | checkpoint card ("CHECKPOINT") | #67 |
| 72 | `BORDER AGENTS CHECK TEMPERATURE` | [triangle] | #71 |
| - | `AVOID TEMPERATURE CHECK` | bracketed phase label | entered from #72 |
| 73 | `SEE NEWS BULLETIN` | [arrow] | bracket |
| 74 | `ANDROIDS CHARGING THE CAMP` | [triangle] | #73; revolution |
| 75 | `ANDROIDS DEMONSTRATING` | [triangle] | #73; demonstration |
| 76 | `CHECK CONTROL DESK` | [arrow] | bracket |
| 77 | `CHECK INFORMATION BOARD` | [arrow] | bracket |
| 78 | `ANDROID IS EXECUTED` | [triangle] | bracket; "after about two minutes" (PowerPyx) |
| 79 | `SEE ROSE & ADAM` | [arrow] | bracket |
| 80 | `REACH ROSE` | [arrow] | #79 |
| 81 | `SEE RESTROOM` | [arrow] | #80 |
| 82 | `GO TO RESTROOM` | [arrow] | #81 |
| 83 | `TALK TO ROSE` | [arrow] | #82 |
| 84 | `TALK TO ADAM` | [arrow] | #83 |
| 85 | `GET BACK IN LINE` | [arrow] | #83/#84; to #88 |
| 86 | `TALK TO LUTHER` | [arrow] | bracket; Luther present |
| 87 | `TALK TO JERRY` | [arrow] | bracket; a Jerry present |

On the PowerPyx 99% save (image `-4b`), a locked `[...]` node sits between #86 and #87. It is absent from the fuller border image. Readers report it "was a glitch, it was patched out in update 1.06".

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 88 | `AT BORDER DESK` | [arrow] | bracket, #85 |
| 89 | `CHOOSE APPROACH` | [arrow] | #88 |
| 90 | `SACRIFICE NO ONE` | [choice] row 1 | #89 |
| 91 | `SACRIFICE JERRY` | [choice] row 2 | #89 |
| 92 | `SACRIFICE LUTHER` | [choice] row 3 | #89 |
| 93 | `SACRIFICE KARA` | [choice] row 4 | #89 |
| 94 | `GUARD SEES MARKUS ATTACKING THE CAMP` | [triangle] | #90; revolution |
| 95 | `GUARD SEES MARKUS PROTESTING` | [triangle] | #90; demonstration |
| 96 | `GUARD LETS THEM PASS` | [triangle] | #95 |
| 97 | `JERRY SACRIFICES HIMSELF TO CREATE DIVERSION` | [triangle] | #91 |
| 98 | `LUTHER SACRIFICES HIMSELF TO CREATE DIVERSION` | [triangle] | #92 |
| 99 | `LUTHER GETS THROUGH WITH ALICE` | [triangle] | #93; Luther alive |
| 100 | `ROSE COLLECTS ALICE` | [triangle] | #93; Luther dead |
| 101 | `EVERYONE WAS ARRESTED AND KILLED` | ending [⊘] | #94 |
| 102 | `THE GROUP CROSSED THE BORDER` | ending, no icon | #96 or #97; Luther alive |
| 103 | `KARA & ALICE CROSSED THE BORDER` | ending, no icon | #96, #97 or #98; Luther dead or sacrificed |
| 104 | `ALICE GOT TO CANADA WITH LUTHER` | ending [skull] | #99 |
| 105 | `ALICE GOT TO CANADA WITH ROSE` | ending [skull] | #100 |

**At the river**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 106 | `AT THE RIVER` | checkpoint card ("CHECKPOINT") | #68 |
| 107 | `GET OUT OF ROSE'S CAR` | [arrow] | #106 |
| - | `DETROIT RIVERBANK` | bracketed phase label | entered from #107 |
| 108 | `CHECK RIVER TEMPERATURE` | [arrow] | bracket |
| 109 | `OBSERVE CANADIAN SKYLINE` | [arrow] | bracket |
| 110 | `TALK TO ADAM` | [arrow] | bracket |
| 111 | `TALK TO ROSE` | [arrow] | bracket exit |
| 112 | `PUSH THE BOAT` | [arrow] | #111 |
| 113 | `TALK TO ALICE` | [arrow] | #112, side branch |
| 114 | `COASTGUARD APPEARS` | [triangle] | #112 |
| 115 | `HIDE` | [choice] row 1 | #114; only when Luther is absent (reader comment) |
| 116 | `ACCELERATE` | [choice] row 2 | #114 |
| 117 | `HIDE BEHIND LUTHER` | [choice] row 3 | #114; Luther present |
| 118 | `DIVE` | [choice] row 4 | #114 |
| 119 | `PROTECT ALICE` | [choice] row 5 | #114 |
| 120 | `SURRENDER` | [choice] row 6, [⊘] on the row | #114 |
| 121 | `COASTGUARD OPENS FIRE` | [triangle] | #115 to #119 |
| 122 | `ALICE IS INJURED` | [triangle] | #121 |
| 123 | `KARA IS INJURED` | [triangle] | #121 |
| 124 | `LUTHER DIED` | [triangle] | #121 |
| 125 | `THE GROUP DIED` | ending [⊘] | #120 |
| - | `BOAT SINKING` | bracketed phase label | entered from #121 |
| 126 | `CAST LUTHER AWAY` | [arrow] | bracket |
| 127 | `DISPOSE OF SUPPLIES` | [arrow] | bracket |
| 128 | `ROW` | [arrow] | bracket |
| 129 | `REASSURE ALICE` | [arrow] | bracket |
| 130 | `BOAT LIGHTENED` | [triangle] | bracket exit |
| 131 | `DISPOSE OF ENGINE` | [arrow] | bracket exit |
| 132 | `DIVE` | [arrow] | #130/#131 |
| 133 | `REACH CANADA ON BOAT` | [choice] row 1 | #132 |
| 134 | `REACH CANADA BY SWIMMING` | [choice] row 2, [⊘] on the row | #132; the boat sank |
| 135 | `KARA & ALICE SURVIVED` | ending, no icon | #133 |
| 136 | `KARA IS DAMAGED AND SHUTS DOWN` | [triangle] | #133; Kara injured |
| 137 | `KARA DIED AND ALICE SURVIVED` | ending [skull] | #136 |
| 138 | `ALICE IS DAMAGED AND SHUTS DOWN` | [triangle] | #133; Alice injured |
| 139 | `CONTINUE LIVING` | [choice] row 1, [⊘] | #138 |
| 140 | `KARA CHOOSES DEATH` | [choice] row 2, [⊘] | #138 |
| 141 | `ALICE DIED AND KARA CONTINUED ALONE` | ending [⊘] | #139 |
| 142 | `KARA & ALICE DIED` | ending [⊘] | #140 or #134 |

**Strings in the `KA` table that are not drawn:**
- `ROADBLOCK`
- `SEE ANDROID`
- `TALK TO ALICE` (`CONTROLTALKALICE`): possibly the patched-out border node
- `LUTHER SAVED`, as the tab `GC.LUTHERALIVE`
- the tab texts `LUTHER DIED`, `ALICE WAS INJURED`, `KARA DIED`, `ALICE DIED`
- a second `SOLDIERS EXECUTED KARA & ALICE` (`EXECUTED02`)
- a second `SECURITY CHECK` (`BUSTERMINALSOLDIERSCONTROLWITHLUTHER`)
- `FEED LOST` (`MAGAZINE2ND`)
- a second `LUTHER DIED` (`LUTHERDEAD` vs `LUTHERSHOT`)

**Wiki text-flowchart differences:**
- The wiki adds "Guard Calls Out to Kara (if Luther died)" and "Luther is Nervous (if Luther is alive)". This agrees with the chart.
- The wiki says "Hide (If Luther is dead) … Alice is Injured". It lists "Accelerate → Luther Died, Alice is Injured", "Hide Behind Luther / Dive → Luther Died", and "Protect Alice → Luther Died, Kara is Injured".
- The wiki says "Surrender (default if no other option chosen)".

### 1b. Kara Captured (`04A.KB`)

Images used:
- `battle-for-detroit-kara-captured-flowchart-100.jpg` (overview)
- `detroit-battle-kara-captured-2-beginning`
- `-3-beginning`
- `-4a-enclosure`
- `-5b-join-line`
- `-6b-in-line`
- `-endings-a`
- `-endings-b`

The beginning image is headed `83% COMPLETED`; the overview's file name says 100%. The stats strip reads `PUBLIC OPINION HATED`, `ALICE FAMILY`, `LUTHER NEUTRAL`. The short stretch between `JOIN LINE` and `STEP FORWARD` was read from an upscaled crop of the overview and the string table, since no zoom image covers it.

**At the recall center (entry, tent and body detail)**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `AT RECALL CENTER` | start card | chapter start, or arrested in 1a |
| 2 | `ANDROIDS LEAVE THE TRUCK` | [triangle] | #1 |
| 3 | `REASSURE ALICE` | [choice] row 1 | #2; truck dialogue: calming answer |
| 4 | `FAIL TO REASSURE ALICE` | [choice] row 2 | #2; harsh answer |
| 5 | `GET OUT OF TRUCK` | [arrow] | #3/#4 |
| 6 | `KARA IS TOO SLOW TO OBEY` | [triangle] | #5, side branch |
| 7 | `SOLDIER STRIKES KARA` | [triangle] | #6 |
| 8 | `GET IN LINE` | [arrow] | #5 |
| 9 | `ALICE ORDERED TO MOVE FORWARD` | [triangle] | #8 |
| 10 | `REASSURE ALICE` | [choice] row 1 | #9 |
| 11 | `FAIL TO REASSURE ALICE` | [choice] row 2 | #9 |
| 12 | `SOLDIER BECOMES IMPATIENT` | [triangle] | #10/#11 |
| 13 | `CONVINCE SOLDIER` | [choice] row 1 | #12 |
| 14 | `CONVINCE ALICE` | [choice] row 2 | #12 |
| 15 | `INTERVENE` | [choice] row 3 | #12 |
| 16 | `REACH THE TENT` | [arrow] | #13 to #15 |
| 17 | `KARA IS TOO SLOW TO OBEY` | [triangle] | #16, side branch |
| 18 | `SOLDIER STRIKES KARA` | [triangle] | #17 |
| 19 | `DEACTIVATE SKIN` | [arrow] | #16 |
| 20 | `UNDRESS` | [arrow] | #19 |
| 21 | `LEAVE TENT` | [arrow] | #20 |
| 22 | `KARA IS TOO SLOW TO OBEY` | [triangle] | #21, side branch |
| 23 | `SOLDIER FORCES KARA & ALICE OUT` | [triangle] | #22 |
| 24 | `DEVIANT SHOT TRYING TO ESCAPE` | [triangle] | #21 |
| 25 | `SOLDIER ORDERS ANDROID TO MOVE BODY` | [triangle] | #24 |
| 26 | `SAY NOTHING` | [choice] row 1 | #25 |
| 27 | `VOLUNTEER` | [choice] row 2 | #25 |
| 28 | `ANDROID REFUSES AND IS SHOT` | [triangle] | #26 |
| 29 | `KARA & ALICE GET SEPARATED` | [triangle] | #28; to #37 |
| 30 | `CARRY ANDROID` | [arrow] | #27; also to #37 |
| 31 | `CLIMB TRUCK` | [arrow] | #30 |
| 32 | `GO BACK` | [choice] row 1 | #31; to #37 |
| 33 | `LEAVE` | [choice] row 2, [⊘] | #31 |
| 34 | `KARA LEAVES CAMP WITHOUT ALICE` | ending [⊘] | #33 |
| 35 | `ALICE DIED IN RECYCLING MACHINE` | [triangle] small, [⊘] | after #34; Markus did not free the camp |
| 36 | `[...]` (locked) | small node | after #34. String `ALICEFREED` = `ALICE FREED BY MARKUS`; the wiki lists "Alice Freed by Markus" here. |

**Inside the enclosure**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 37 | `INSIDE THE ENCLOSURE` | large card (ID `CPINSIDEENCLOSURE`) | #29, #30, #32 |
| - | `EXPLORE ENCLOSURE` | bracketed phase label | |
| 38 | `CAUGHT BY DRONE` | [triangle] | bracket |
| 39 | `MOVE` | [choice] row 1 | #38 |
| 40 | `REMAIN STILL` | [choice] row 2 | #38 |
| 41 | `DRONE WOUNDS KARA` | [triangle] | #39, first time |
| 42 | `KARA IS KILLED BY THE DRONE` | ending [skull] | #39, already wounded |
| 43 | `ALICE DIED ALONE IN RECYCLING MACHINE` | [⊘] | after #42 |
| 44 | `ALICE FREED BY MARKUS` | [triangle] | after #42 |
| 45 | `DISTRESSED ANDROID IS SHOT` | [triangle] | bracket |
| 46 | `TALK TO JERRY` | [arrow] | bracket |
| 47 | `TALK TO OTHER JERRY` | [arrow] | bracket |
| 48 | `ALICE GETS TAKEN AWAY` | [triangle] | #47 |
| 49 | `TALK TO LUTHER` | [arrow] | bracket; [cond] `SAVED IN PREVIOUS SCENES` |
| 50 | `LUTHER GETS TAKEN AWAY` | [triangle] | #49 |
| 51 | `INTERVENE` | [choice] row 1 | #50 |
| 52 | `DO NOT INTERVENE` | [choice] row 2 | #50 |
| 53 | `TALK TO SCARRED ANDROID` | [arrow] | bracket; [cond] `FREED IN 'ZLATKO'` |
| 54 | `TALK TO RESCUED ANDROID` | [arrow] | bracket; Kara chose VOLUNTEER (no tab drawn) |
| 55 | `TALK TO RALPH` | [arrow] | bracket; [cond] `MET IN 'FUGITIVES'` |
| 56 | `RALPH ATTRACTS DRONE'S ATTENTION` | [triangle] | #55 |
| 57 | `GIVE UP` | [choice] row 1 | #56 |
| 58 | `INSIST` | [choice] row 2 | #56 |
| 59 | `CALM DOWN` | [choice] row 3 | #56 |
| 60 | `RALPH IS KILLED` | [triangle] | #58 |
| 61 | `RALPH SETTLES DOWN` | [triangle] | #59 |
| 62 | `EXIT ENCLOSURE` | [arrow] | bracket exit, #48 |

**Join line**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 63 | `JOIN LINE` | checkpoint card ("CHECKPOINT") | #62 |
| 64 | `FIND ALICE` | [arrow] | #63 |
| 65 | `ALICE IS TERRIFIED` | [triangle] | #64 |
| 66 | `FIRM` | [choice] row 1 | #65 |
| 67 | `OPTIMISTIC` | [choice] row 2 | #65 |
| 68 | `REASSURING` | [choice] row 3 | #65 |
| 69 | `DIRECT` | [choice] row 4 | #65 |
| 70 | `SILENCE` | [choice] row 5 | #65 |
| 71 | `LINE MOVES FORWARD` | [triangle] | #66 to #70 |
| 72 | `SOLDIER STRIKES KARA FOR NOT COMPLYING` | [triangle] | #71, side branch |
| 73 | `STEP FORWARD` | [arrow] | #71 |
| - | `FIND A WAY TO JOIN ALICE` | bracketed phase label | |
| 74 | `LINE MOVES FORWARD` | [triangle] | bracket |
| 75 | `GET KILLED` | [choice] row 1 | #74; Kara already shot |
| 76 | `GET SHOT` | [choice] row 2 | #74 |
| 77 | `ALICE'S STRESS INCREASES` | [triangle] | #76 |
| 78 | `TALK TO ANDROID BEHIND KARA` | [arrow] | bracket; Markus alive and leading the revolution (reader comment) |
| 79 | `TALK TO ANDROID AHEAD OF KARA` | [arrow] | bracket; Kara chose SAY NOTHING (reader comment) |
| 80 | `TALK TO LUTHER` | [arrow] | bracket; [cond] `SAVED IN PREVIOUS SCENES` |
| 81 | `TALK TO JERRY` | [arrow] | bracket |
| 82 | `OBSERVE GUARDS` | [arrow] | bracket |
| 83 | `JERRY DIES` | [triangle] | bracket; Jerry reaches the machine while Kara keeps her line (reader comments) |
| 84 | `ALICE ASKS QUESTIONS` | [triangle] | bracket |
| 85 | `REASSURE` | [choice] row 1 | #84 |
| 86 | `TELL THE TRUTH` | [choice] row 2 | #84 |
| 87 | `SAY NOTHING` | [choice] row 3 | #84 |
| 88 | `TALK TO RALPH` | [arrow] | bracket; [cond] `MET IN 'FUGITIVES'` |
| 89 | `TALK TO SCARRED ANDROID` | [arrow] | bracket; [cond] `FREED IN 'ZLATKO'` |
| 90 | `ALICE PANICS AND RUNS TO KARA` | [triangle] | bracket; Alice's stress reaches 100% |
| 91 | `DO NOT INTERVENE` | [choice] row 1, [⊘] | #90 |
| 92 | `INTERVENE` | [choice] row 2 | #90 |
| 93 | `ALICE GETS SHOT` | [⊘] | #91 |
| 94 | `KARA GETS SHOT` | [triangle] | #92; to #113 |
| 95 | `KARA IS DEAD` | ending [⊘] | #93; Markus did not free the camp |
| 96 | `KARA FREED BY MARKUS` | ending [⊘] | #93; Markus freed the camp |
| 97 | `ASK TO CREATE DIVERSION` | [arrow] | #81 or #89 (Jerry or the scarred android) |
| 98 | `SOLDIERS ARE DISTRACTED` | [triangle] | #97 |
| 99 | `KARA GETS CAUGHT BY THE DRONE` | [triangle] | #98 |
| 100 | `REACH ALICE` | [arrow] | #98 |

**In line with Alice**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 101 | `IN LINE WITH ALICE` | large card | #100 |
| - | `FIND A WAY TO ESCAPE` | bracketed phase label | |
| 102 | `LINE MOVES FORWARD` | [triangle] | bracket |
| 103 | `GET KILLED` | [choice] row 1 | #102 |
| 104 | `GET SHOT` | [choice] row 2 | #102 |
| 105 | `REACH RECYCLING MACHINE` | [arrow] | bracket; taking too long |
| 106 | `OBSERVE BARBED WIRE` | [arrow] | bracket |
| 107 | `LUTHER REACHES THE RECYCLING MACHINE` | [triangle] | bracket |
| 108 | `MARKUS LIBERATES ANDROIDS` | [triangle] | #105; revolution succeeded |
| 109 | `TALK TO JERRY` | [arrow] | bracket |
| 110 | `TALK TO RALPH` | [arrow] | bracket |
| 111 | `TALK TO LUTHER` | [arrow] | bracket |
| 112 | `TALK TO SCARRED ANDROID` | [arrow] | bracket |
| 113 | `KARA DIED IN THE LINES` | ending [skull] | #75, #94, #103 |
| 114 | `ALICE FREED BY MARKUS` | [triangle] | after #113 |
| 115 | `ALICE DIED IN RECYCLING MACHINE` | [⊘] | after #113 |
| 116 | `ALICE & KARA DIED IN RECYCLING MACHINE` | ending [⊘] | #105 |
| 117 | `KARA & ALICE SURVIVED` | ending, no icon | #108 |
| 118 | `ASK TO CREATE DIVERSION` | [arrow] | #109 to #112 |
| 119 | `SOLDIERS ARE DISTRACTED` | [triangle] | #118 |
| 120 | `RUN TO BARBED WIRE` | [arrow] | #119 |
| 121 | `KARA IS TOO SLOW` | [⊘] | #120 |
| 122 | `SOLDIER SHOOTS THE GROUP` | [⊘] | #121 |
| 123 | `KARA & ALICE WERE KILLED` | ending [⊘] | #122 |
| 124 | `KARA, LUTHER AND ALICE WERE KILLED` | ending [⊘] | #122 |
| 125 | `ALICE GETS PAST THE BARBED WIRE` | [outcome] row 1 | #120 |
| 126 | `ALICE & LUTHER GET PAST THE BARBED WIRE` | [outcome] row 2 | #120 |
| 127 | `KARA IS TOO DAMAGED TO PROCEED` | [triangle] | #125/#126; Kara was shot earlier |
| 128 | `SOLDIER SHOOTS KARA` | [triangle] | #127 |
| 129 | `ALICE ESCAPED ON TRUCK` | ending [skull] | #128 |
| 130 | `ALICE & LUTHER ESCAPED BY TRUCKS` | ending [skull] | #128 |
| 131 | `A SOLDIER ARRIVES` | [triangle] | #125/#126 |
| 132 | `PASS THE BARBED WIRE` | [choice] row 1, [⊘] | #131 |
| 133 | `FIGHT SOLDIER` | [choice] row 2 | #131 |
| 134 | `SOLDIER SHOOTS THE GROUP` | [⊘] | #132 |
| 135 | `KARA, LUTHER AND ALICE WERE KILLED` | ending [⊘] | #134 |
| 136 | `KARA & ALICE WERE KILLED` | ending [⊘] | #134, or #137 with no rescuer |
| 137 | `SOLDIER BEATS KARA` | [outcome] row 1 | #133 |
| 138 | `KARA BEATS SOLDIER` | [outcome] row 2 | #133 |
| 139 | `RALPH INTERVENES` | [triangle] | #137 |
| 140 | `LUTHER INTERVENES` | [triangle] | #137 |
| 141 | `KARA & ALICE ESCAPED ON TRUCK` | ending, no icon | #139, #140, #138 |
| 142 | `KARA, LUTHER AND ALICE ESCAPED ON TRUCK` | ending, no icon | #138 with Luther |

**Strings in the `KB` table that are not drawn:**
- `CALM ALICE DOWN` / `FAIL TO CALM ALICE DOWN`
- `ASK JERRY/MONSTER/RALPH/LUTHER TO CREATE DIVERSION`, which the chart collapses into #97/#118
- `TRY TO GET PASSED BARBED WIRE` [sic]
- `ALICE IS DEAD`
- `KARA DIED IN RECYCLING MACHINE`
- a second `ALICE DIED IN RECYCLING MACHINE`

**Note on #83, #84 and #89.** The join-Alice bracket offers diversions only from Jerry or the scarred android. The escape bracket offers Jerry, Ralph, Luther or the scarred android. PowerPyx: "The Scarred Android (if available) is the best choice, as it doesn't lead to a casualty. Picking Luther to sacrifice himself disables the happier endings of this branch."

### 1c. Connor's Last Mission (`04A.CA`)

Images used:
- `Detroit-Connors-Last-Mission-001.jpg` (overview, `100% COMPLETED`)
- `-002`, `-003`, `-004`
- an upscaled crop of the overview, `crops/clm-ov.jpg`

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `IN THE ZEN GARDEN` | checkpoint card ("CHECKPOINT") | chapter start. Readers report it plays only when Markus shot the deviant Connor in Night of the Soul ("Don't Trust"). |
| 2 | `TALK TO AMANDA` | [dialogue] | #1 |
| 3 | `HART PLAZA ROOFTOP` | checkpoint card ("LOAD CHECKPOINT") | #2, or chapter start |
| 4 | `FIND VANTAGE POINT` | [arrow] | #3 |
| 5 | `PREPARE TO SHOOT` | [arrow] | #4 |
| 6 | `HANK INTERVENES` | [triangle] | #5; Hank alive |
| 7 | `CAPTAIN ALLEN INTERVENES` | [triangle] | #5; [cond] `HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'` |
| 8 | `TALK TO HANK` | [dialogue] | #6 |
| 9 | `TALK ABOUT HANK'S SON` | [dialogue] | #8, side branch |
| 10 | `GIVE UP` | [choice] row 1 | #8; to #33 directly |
| 11 | `ATTACK HANK` | [choice] row 2 | #8 |
| 12 | `CONNOR WINS` | [outcome] ✓ | #11 |
| 13 | `HANK WINS` | [outcome] ✗ | #11 |
| 14 | `LET HANK GO` | [choice] row 1 | #12 |
| 15 | `SAVE HANK` | [choice] row 2 | #12 |
| 16 | `CONNOR KILLS HANK` | [triangle] | #14; to #32 |
| 17 | `HANK RUSHES CONNOR` | [triangle] | #15 |
| 18 | `DODGE ATTACK` | [outcome] ✓ | #17 |
| 19 | `FAIL TO DODGE ATTACK` | [outcome] ✗ | #17 |
| 20 | `HANK FALLS TO HIS DEATH` | [triangle] | #18; to #32 |
| 21 | `CONNOR FALLS AND GETS DESTROYED` | [triangle] | #19; to #30 |
| 22 | `HANK KILLS CONNOR` | [triangle] | #13; to #30 |
| 23 | `TALK TO ALLEN` | [dialogue] | #7 |
| 24 | `FLEE` | [choice] row 1 | #23 |
| 25 | `ATTACK ALLEN` | [choice] row 2 | #23 |
| 26 | `CONNOR JUMPS OFF THE ROOF` | [triangle] | #24; to #30 |
| 27 | `KILL ALLEN AND HIS MEN` | [outcome] ✓ | #25; to #32 |
| 28 | `CONNOR FAILS TO DEFEND HIMSELF` | [outcome] ✗ | #25 |
| 29 | `ALLEN DESTROYS CONNOR` | [triangle] | #28 |
| 30 | `CYBERLIFE DECIDED TO SEND ANOTHER CONNOR` | ending [skull] | #21, #22, #26 |
| 31 | `CYBERLIFE DECIDED TO SEND ANOTHER CONNOR` | ending [skull] | #29 |
| 32 | `MISSED OPPORTUNITY` | [triangle] | #16, #20, #27 |
| 33 | `CONNOR LEFT ROOFTOP` | ending, no icon | #32 or #10 |

**What the chart settles.**
- `CONNOR JUMPS OFF THE ROOF` feeds the skull ending #30, as the wiki says. PowerPyx's text ("Go to Missed Opportunity below") is wrong.
- `GIVE UP` goes straight to `CONNOR LEFT ROOFTOP`, bypassing `MISSED OPPORTUNITY`.

**Not drawn.** The `CA` table has the tab strings `CONNOR DIED`, `HANK DIED` and `HANK COMMITTED SUICIDE…` (twice). The shot at Markus or North that follows (in the crowd or in the store) is drawn on the Markus Revolution chart (§1f), or is not on any chart (§2g).

### 1d. Connor at the CyberLife Tower (`04A.CB`)

Images used:
- `Detroit-Connor-at-Cyberlife-Tower-001.jpg` (overview, 100%)
- `-002` to `-005`
- crop `crops/ct5.jpg`

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `CYBERLIFE HQ` | checkpoint card ("LOAD CHECKPOINT") | chapter start |
| 2 | `FOLLOW GUARDS` | [arrow] | #1 |
| 3 | `INSIDE ELEVATOR` | checkpoint card | #2 |
| - | `FIND A WAY TO ESCAPE` | bracketed phase label | |
| 4 | `SPOT CAMERA` | [arrow] | bracket |
| 5 | `HACK CAMERA` | [arrow] | #4 |
| 6 | `ELEVATOR REACHES LEVEL 31` | [triangle] | bracket; timer `STOP ELEVATOR BEFORE FLOOR 31` ran out |
| 7 | `TRY TO STOP ELEVATOR` | [arrow] | bracket; no outgoing line. The guard says "Hey! Don't touch that." |
| 8 | `ATTACK GUARDS` | [arrow] | bracket |
| 9 | `FAIL TO NEUTRALIZE GUARDS` | [outcome] ✗ | #8 |
| 10 | `NEUTRALIZE GUARDS` | [outcome] ✓ | #8 |
| 11 | `HACK ELEVATOR` | [arrow] | #10 |
| 12 | `COPY GUARD'S VOICE` | [arrow] | #11 |
| 13 | `USE CONNOR'S VOICE` | [arrow] | #11; no outgoing line. The elevator says "Voice of RK800 model recognized. You are not authorized…" |
| 14 | `REDIRECT ELEVATOR` | [triangle] | #12 |
| 15 | `AMANDA WARNS CONNOR` | [triangle] | #6 |
| 16 | `CONNOR WAS AMBUSHED AND SHOT` | ending [skull] | #15 |
| 17 | `CONNOR WAS SHOT BY SECURITY` | ending [skull] | #9 |
| 18 | `FLOOR -49` | checkpoint card ("LOAD CHECKPOINT") | #14 |
| 19 | `CAMERA HACKED` | [outcome] row 1 | #18 |
| 20 | `CAMERA FUNCTIONAL` | [outcome] row 2 | #18 |
| 21 | `LEAVE ELEVATOR` | [arrow] | #19 |
| 22 | `GUARDS AWAIT CONNOR` | [triangle] | #20 |
| 23 | `ELIMINATE GUARDS` | [outcome] ✓ | #22 |
| 24 | `FAIL TO ELIMINATE GUARDS` | [outcome] ✗ | #22 |
| 25 | `CONNOR WAS SHOT BY SECURITY` | ending [skull] | #24 |
| 26 | `INITIATE ANDROID CONVERSION` | [arrow] | #21, #23 |
| 27 | `A NEW CONNOR ARRIVES` | [triangle] | #26; [cond] `HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'` |
| 28 | `NEW CONNOR SHOOTS CONNOR` | [triangle] | #27 |
| 29 | `NEW CONNOR HAS HANK HOSTAGE` | [triangle] | #26; Hank alive |
| 30 | `SACRIFICE HANK AND RESUME CONVERSION` | [arrow] | #29 |
| 31 | `STOP CONVERSION TO SAVE HANK` | [arrow] | #29 |
| 32 | `NEW CONNOR KILLS HANK AND DAMAGES CONNOR` | [triangle] | #30 |
| 33 | `NEW CONNOR APPROACHES` | [triangle] | #28, #32 |
| 34 | `OUT OF TIME` | [triangle] | #31 |
| 35 | `NEW CONNOR INJURES HANK` | [triangle] | #34 |
| 36 | `NEW CONNOR KILLS CONNOR` | [triangle] | #35; to #62 |
| 37 | `ATTACK NEW CONNOR` | [arrow] | #31; to #40 |
| 38 | `DRAW GUN` | [arrow] | #31 |
| 39 | `BOTH CONNORS SHOOT` | [triangle] | #38; to #40 |
| 40 | `CONNORS FIGHT` | [triangle] | #37, #39 |
| 41 | `SWAP CONSCIOUSNESS WITH NEW CONNOR` | [choice] row 1 | #33 |
| 42 | `TALK TO NEW CONNOR` | [choice] row 2 | #33; reached by letting the timer run out |
| 43 | `TRY TO STAND` | [choice] row 3 | #33 |
| 44 | `DRAW GUN` | [choice] row 4 | #33 |
| 45 | `NEW CONNOR DIES IN THE OLD BODY` | [triangle] | #41 |
| 46 | `NEW CONNOR KILLS CONNOR` | [triangle] | #42, #43 |
| 47 | `CONNOR KILLS NEW CONNOR AND DIES` | [triangle] | #44 |
| 48 | `THE ANDROIDS WOKE UP` | ending, [cond]-style padlock tab (blue on this save) | #45 |
| 49 | `THE ANDROIDS REMAINED DORMANT` | ending [skull] | #46, #47 |
| 50 | `THE ANDROIDS WOKE UP` | ending [skull] | #46, #47 (conversion had finished) |
| 51 | `CONNORS DRAW` | [triangle] | #40 |
| 52 | `HANK GRABS GUN` | [triangle] | #51 |
| 53 | `HANK ASKS ABOUT HIS DOG'S NAME` | [triangle] | #52 |
| 54 | `SUMO` | [outcome] ✓ | #53 |
| 55 | `WRONG ANSWER` | [outcome] ✗ | #53 |
| 56 | `HANK ASKS ABOUT HIS SON'S NAME` | [triangle] | #54/#55 |
| 57 | `WRONG ANSWER` | [outcome] ✗ | #56 |
| 58 | `COLE` | [outcome] ✓ | #56 |
| 59 | `HANK KILLS CONNOR` | [triangle] | #57 |
| 60 | `HANK KILLS NEW CONNOR` | [triangle] | #58 |
| 61 | `RESUME CONVERSION` | [arrow] | #60, or #40 directly (Connor wins the fight outright) |
| 62 | `THE ANDROIDS REMAINED DORMANT` | ending [skull] | #36, #59 |
| 63 | `THE ANDROIDS WOKE UP` | ending, padlock tab | #61 |

**The `CB` table has more strings than the chart draws.** The undrawn ones are:
- `NEW CONNOR USES HANK AS HUMAN SHIELD`
- a second `DRAW GUN` (`DRAWGUNHANKSAVED`)
- `MISS NEW CONNOR`
- `SHOOT HANK`
- `NEW CONNOR KILLS HANK`
- `CONNOR KILLS HANK`
- `NEW CONNOR KILLS CONNOR` (the variant `…HANKKILLED`)
- `CRAWL TO NEW CONNOR`
- `TRY TO STAND` (twice)
- `NEW CONNOR DIES`
- six variants of the WOKE UP/DORMANT ending keyed by who lived. One of them is mislabelled in the table: `ANDROIDSDORMANTCONNORDIEDHANKDEAD = THE ANDROIDS WOKE UP`.
- the tabs `CONNOR DIED`, `HANK DIED`, `CONNOR & HANK DIED`

The HUD has `SHOOT AT THE APPROPRIATE TIME`, `SHOOT HANK ?` and `SHOOT NO ONE ?`. These suggest a cut shooting minigame during the standoff.

### 1e. Markus Demonstration (`04A.MB`)

Images used:
- `battle-for-detroit-markus-demonstration-flowchart.jpg` (overview, 100%)
- `-1` to `-4`

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `HART PLAZA FREEDOM MARCH` | checkpoint card ("CHECKPOINT") | chapter start |
| 2 | `LEAD JERICHO` | [arrow] | #1 |
| 3 | `ROADBLOCK` | [triangle] | #2 |
| 4 | `TALK TO OFFICER` | [arrow] | #3 |
| 5 | `ANDROIDS UNDER FIRE` | [triangle] | #4 |
| 6 | `SHOW DETERMINATION` | [arrow] | #5 |
| 7 | `RAISE FIST` | [choice] row 1 | #6 |
| 8 | `HANDS IN THE AIR` | [choice] row 2 | #6 |
| 9 | `SIT` | [choice] row 3 | #6 |
| 10 | `KNEEL` | [choice] row 4 | #6 |
| 11 | `ANDROIDS STAND THEIR GROUND` | large card, no caption (ID `CPCROWDONHOLD`; PowerPyx calls it a checkpoint) | #7 to #10 |
| 12 | `BUILD BARRICADE` | [arrow] | #11 |
| 13 | `USE BILLBOARD` | [choice] row 1 | #12 |
| 14 | `USE BENCH` | [choice] row 2 | #12 |
| 15 | `USE ABANDONED CAR` | [choice] row 3 | #12 |
| - | `HOLD BARRICADE` | bracketed phase label | entered from #13 to #15 |
| 16 | `CHOOSE SLOGANS` | [arrow] | bracket |
| 17 | `TALK TO SCARED ANDROID` | [arrow] | bracket |
| 18 | `TALK TO TRAUMATIZED ANDROID` | [arrow] | bracket |
| 19 | `TALK TO NORTH` | [arrow] | bracket; North alive |
| 20 | `PLANT THE FLAG` | [arrow] | bracket |
| 21 | `OBSERVE SOLDIERS` | [arrow] | bracket. Wiki: "This will trigger Perkins arrives, so do this last!" |
| 22 | `OBSERVE DETONATOR` | [arrow] | bracket; detonator taken in Crossroads |
| 23 | `LIGHT BARREL` | [arrow] | bracket |
| 24 | `READ "THEY DEFY US"` | [arrow] | bracket; magazine |
| 25 | `PERKINS ARRIVES` | [triangle] | bracket exit |
| 26 | `NEGOTIATE WITH PERKINS` | [choice] row 1 | #25 |
| 27 | `REFUSE TO NEGOTIATE` | [choice] row 2 | #25; to #37 |
| 28 | `ACCEPT DEAL` | [choice] row 1 | #26 |
| 29 | `REFUSE DEAL` | [choice] row 2 | #26; to #37 |
| 30 | `PERKINS LEAVES` | [triangle] | #28 |
| 31 | `IN THE DISMANTLED BARRICADE` | checkpoint card | #30 |
| 32 | `TALK TO PERKINS` | [arrow] | #31 |
| 33 | `TALK TO NORTH` | [arrow] | #31; North alive |
| 34 | `PERKINS SHOOTS NORTH` | [triangle] | #32; North alive |
| 35 | `PERKINS SHOOTS MARKUS` | [triangle] | #32/#34 |
| 36 | `MARKUS DIED AFTER BETRAYING HIS PEOPLE` | ending [skull] | #35 |
| 37 | `SOLDIERS ATTACK BARRICADE` | [triangle] | #27, #29 |
| 38 | `DEFENDING THE BARRICADE` | checkpoint card ("LOAD CHECKPOINT") | #37 |
| 39 | `SAVE FLEEING ANDROIDS` | [outcome] row 1 | #38 |
| 40 | `FAIL TO SAVE ANDROIDS` | [outcome] row 2 | #38 |
| 41 | `NORTH TAKES A BULLET FOR MARKUS` | [triangle] | #40 |
| 42 | `MARKUS SHOT` | [triangle] | #40 |
| 43 | `MARKUS DIED PROTECTING HIS PEOPLE` | ending [skull] | #42 |
| 44 | `MARKUS IS CORNERED` | [triangle] | #39, #41 |
| 45 | `NORTH JOINS HIM` | [triangle] | #44; alive |
| 46 | `JOSH JOINS HIM` | [triangle] | #44; alive |
| 47 | `SIMON JOINS HIM` | [triangle] | #44; alive |
| 48 | `SOLDIERS RAISE WEAPONS` | [triangle] | #44 |
| 49 | `SING` | [choice] row 1 | #48 |
| 50 | `KISS NORTH` | [choice] row 2 | #48 |
| 51 | `SACRIFICE` | [choice] row 3 | #48 |
| 52 | `DO NOTHING` | [choice] row 4 | #48 |
| 53 | `OBSERVE DETONATOR` | [choice] row 5 | #48; [cond] `TOOK DETONATOR IN 'CROSSROADS'` |
| 54 | `PUBLIC REACTS TO THE ANDROIDS' LAST STAND` | [triangle] | #49, #50 |
| 55 | `PRESIDENT ORDERS SOLDIERS NOT TO SHOOT` | [triangle] | #54 |
| 56 | `ANDROIDS WON FREEDOM - FOR THE MOMENT` | ending, no icon | #55 |
| 57 | `SOLDIERS FIRE` | [triangle] | #54, #51, #52 |
| 58 | `MARKUS DIED WITH HIS PEOPLE` | ending [skull] | #57 |
| 59 | `GIVE UP` | [choice] row 1 | #53; loops back to #48 (PowerPyx: "brings you back to the screen of 4 choices") |
| 60 | `PRESS` | [choice] row 2 | #53 |
| 61 | `AN EXPLOSION SHAKES DETROIT` | [triangle] | #60 |
| 62 | `SOLDIERS RETREAT` | [triangle] | #61 |
| 63 | `ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT` | ending, no icon | #62 |

**Strings in the `MB` table that are not drawn:**
- `PERKINS APPROACHES`
- `NORTH DIES`
- a second `PERKINS SHOOTS MARKUS`
- `MARKUS AND THE ANDROIDS ARE SHOT` (twice)
- `MARKUS AND NORTH KISS WHILST UNDER FIRE`
- `MARKUS IMMOLATES HIMSELF AS THE ANDROIDS ARE SHOT`
- a second `MARKUS DIED WITH HIS PEOPLE` (`SCENEENDEVERYBODYSHOT`)
- `FEED LOST`
- `TRY TO APPEAL TO THE PUBLIC` (`FINALSAVED`)
- a second `OBSERVE DETONATOR`
- the tab `NORTH DIED`

### 1f. Markus Revolution (`04A.MA`)

Images used:
- `battle-for-detroit-markus-revolution-flowchart.jpg` (overview, 100%)
- `-1` to `-9`
- crop `crops/mr8-store.jpg`

**Revolution at Hart Plaza**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 1 | `REVOLUTION AT HART PLAZA` | checkpoint card ("CHECKPOINT") | chapter start (Markus alive) |
| 2 | `MARKUS SENDS A MESSAGE` | [triangle] | #1 |
| 3 | `CHARGE THE BARRICADE` | [arrow] | #2 |
| 4 | `MARKUS WOUNDED` | [triangle] | #3 |
| 5 | `PLANT THE FLAG` | [arrow] | #3 |
| 6 | `AT THE CROSSROAD` | checkpoint card ("LOAD CHECKPOINT") | #5 |
| 7 | `LAUNCH THE ATTACK` | [arrow] | #6 |

**Approaching the recall center**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| - | `APPROACHING RECALL CENTER` | bracketed phase label | entered from #7 |
| 8 | `JOSH LEAVES COVER` | [triangle] | bracket; Josh alive |
| 9 | `RESCUE JOSH` | [choice] row 1 | #8 |
| 10 | `JOSH IS SHOT` | [choice] row 2 | #8 |
| 11 | `JOSH DIES IN MARKUS' ARMS` | [triangle] | #9 |
| 12 | `INSPIRE FRIGHTENED ANDROID` | [arrow] | bracket |
| 13 | `ANDROID IS SHOT LEAVING COVER` | [choice] row 1 | #12 |
| 14 | `ANDROID STAYS HIDDEN` | [choice] row 2 | #12 |
| 15 | `SIMON IS SHOT` | [triangle] | bracket; Simon alive |
| 16 | `TRY TO SAVE SIMON` | [choice] row 1 | #15 |
| 17 | `KEEP GOING` | [choice] row 2 | #15 |
| 18 | `SAVE SIMON` | [choice] row 1 | #16 |
| 19 | `FAIL TO SAVE SIMON` | [choice] row 2 | #16 |
| 20 | `THROW GRENADE` | [arrow] | bracket |
| 21 | `MARKUS BADLY WOUNDED` | [triangle] | bracket |
| 22 | `SIMON OFFERS HIS HEART` | [triangle] | #21; no choice follows |
| 23 | `NORTH OFFERS HER HEART` | [triangle] | #21 |
| 24 | `NOBODY TO SAVE MARKUS` | [triangle] | #21 |
| 25 | `ACCEPT` | [choice] row 1 | #23 |
| 26 | `REFUSE` | [choice] row 2 | #23 |
| 27 | `MARKUS DIED AND THE REVOLUTION FAILED` | ending [skull] | #26, #24 |
| 28 | `REACH MACHINE GUN` | [arrow] | bracket exit |
| 29 | `COORDINATE ATTACK` | [arrow] | #28 |
| 30 | `SEND NORTH TO HER DEATH` | [arrow] | #29; no outgoing line drawn |
| 31 | `ATTACK SUCCESSFUL` | [outcome] ✓ | #29 |
| 32 | `ATTACK UNSUCCESSFUL` | [outcome] ✗ | #29 |
| 33 | `DRONE ATTACKS NORTH'S GROUP` | [triangle] | #31; North alive |
| 34 | `FAIL TO SHOOT DRONE` | [outcome] ✗ | #33; North dies (PowerPyx) |
| 35 | `SHOOT DRONE` | [outcome] ✓ | #33 |
| 36 | `ANDROIDS HAVE TO FALL BACK` | [triangle] | #32, or directly from the bracket when the success rate hits 0% |
| 37 | `SIMON GETS SHOT` | [triangle] | #36 |
| 38 | `NORTH GETS SHOT` | [triangle] | #36 |
| 39 | `MARKUS TAKES SHELTER IN STORE` | [triangle] | #36; to #59 |
| 40 | `MARKUS AND NORTH TAKE SHELTER IN STORE` | [triangle] | #36; to #77 |

**Approaching Recall Center N°5**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 41 | `APPROACHING RECALL CENTER N°5` | checkpoint card | #31, #34/#35 |
| 42 | `FINAL ASSAULT` | [arrow] | #41 |
| 43 | `MARKUS IS HIT BY EXPLOSION` | [triangle] | #42 |
| 44 | `CONNOR FINDS MARKUS` | [triangle] | #43; Connor is a machine |
| 45 | `CONTROL CONNOR` | [arrow] | #44 |
| 46 | `CONTROL MARKUS` | [arrow] | #44 |
| 47 | `WIN THE FIGHT` | [outcome] ✓ | #45 |
| 48 | `LOSE THE FIGHT` | [outcome] ✗ | #45 |
| 49 | `WIN THE FIGHT` | [outcome] ✓ | #46 |
| 50 | `LOSE THE FIGHT` | [outcome] ✗ | #46 |
| 51 | `CONNOR STOPPED THE REVOLUTION` | ending [skull] | #47 |
| 52 | `MARKUS DEFEATS CONNOR` | [triangle] | #48 |
| 53 | `SOLDIERS APPROACH MARKUS` | [triangle] | #43; Connor deviant or absent |
| 54 | `NEUTRALIZE SOLDIERS` | [outcome] ✓ | #53 |
| 55 | `FAIL TO NEUTRALIZE THE SOLDIERS` | [outcome] ✗ | #53 |
| 56 | `SHOOT TANKS` | [arrow] | #52, #49, #54 |
| 57 | `ASSAULT WAS SUCCESSFUL` | ending, no icon | #56 |
| 58 | `MARKUS DIED AND THE REVOLUTION FAILED` | ending [skull] (second card) | #50, #55 |

**Alone in store**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 59 | `ALONE IN STORE` | large card | #39 |
| 60 | `CONNOR ARRIVES` | [triangle] | #59; Connor is a machine |
| 61 | `SHOOT` | [choice] row 1 | #60 (played as Connor) |
| 62 | `SPARE` | [choice] row 2 | #60 |
| 63 | `NO CHOICE` | [choice] row 3 | #60; timer runs out |
| 64 | `MARKUS IS SHOT` | [triangle] | #61 |
| 65 | `DETONATE BOMB` | [arrow] | #64 or #62; detonator taken |
| 66 | `CONNOR EXECUTED MARKUS` | ending [skull] | #64 |
| 67 | `MARKUS DIED AS DETROIT BURNS` | ending [skull] | #65 |
| 68 | `CONNOR SPARED MARKUS` | ending, no icon | #62 |
| 69 | `MARKUS AND CONNOR KILLED EACH OTHER` | ending [skull] | #63 |
| 70 | `SOLDIERS SURROUND STORE` | [triangle] | #59; Connor deviant or decommissioned |
| 71 | `SURRENDER` | [choice] row 1 | #70 |
| 72 | `SUICIDE` | [choice] row 2 | #70 |
| 73 | `DETONATE BOMB` | [choice] row 3 | #70; [cond] `TOOK DETONATOR IN 'CROSSROADS'` |
| 74 | `MARKUS DIED LEAVING STORE` | ending [skull] | #71 |
| 75 | `MARKUS COMMITTED SUICIDE` | ending [skull] | #72 |
| 76 | `MARKUS WATCHED DETROIT BURN` | ending, no icon | #73 |

**Inside store with North**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 77 | `INSIDE STORE WITH NORTH` | large card | #40 |
| 78 | `SOLDIERS SURROUND STORE` | [triangle] | #77 |
| 79 | `DETONATE BOMB` | [choice] row 1 | #78; [cond] `TOOK DETONATOR IN 'CROSSROADS'` |
| 80 | `SURRENDER` | [choice] row 2 | #78 |
| 81 | `SUICIDE` | [choice] row 3 | #78 |
| 82 | `KISS NORTH` | [choice] row 4 | #78; North is Lover (transcript lock) |
| 83 | `MARKUS AND NORTH WATCHED DETROIT BURN` | ending, no icon | #79 |
| 84 | `MARKUS AND NORTH DIED LEAVING THE STORE` | ending [skull] | #80 |
| 85 | `MARKUS AND NORTH COMMITTED SUICIDE` | ending [skull] | #81 |
| 86 | `SHARE A MOMENT WITH NORTH` | [triangle] | #82; no outgoing line (returns to the choice) |

**North in Hart Plaza**

| # | Node | Icon | Follows / gate |
|---|---|---|---|
| 87 | `NORTH IN HART PLAZA` | checkpoint card ("CHECKPOINT") | chapter start; [cond] `NORTH BECAME LEADER IN A PREVIOUS SCENE` |
| 88 | `NORTH SENDS A MESSAGE` | [triangle] | #87 |
| 89 | `NORTH CHARGES THE BARRICADE` | [triangle] | #88 |
| 90 | `NORTH PLANTS THE FLAG` | [triangle] | #89 |
| 91 | `DEVIANTS ARE OUTNUMBERED` | [triangle] | #90 |
| 92 | `NORTH WAS SHOT BY SOLDIERS` | ending [skull] | #91; Connor deviant or deactivated |
| 93 | `NORTH TAKES SHELTER IN STORE` | [triangle] | #91; Connor is a machine |
| 94 | `CONNOR IN CYBERLIFE STORE` | large card | #93 |
| 95 | `FIND NORTH` | [arrow] | #94 |
| 96 | `SHOOT` | [choice] row 1 | #95 |
| 97 | `SPARE` | [choice] row 2 | #95 |
| 98 | `NO CHOICE` | [choice] row 3 | #95 |
| 99 | `NORTH WAS SHOT BY CONNOR` | ending [skull] | #96 |
| 100 | `CONNOR SPARED NORTH` | ending, no icon | #97 |
| 101 | `NORTH AND CONNOR KILLED EACH OTHER` | ending [skull] | #98 |

**Strings in the `MA` table that are not drawn:**
- `SOLDIER KILLS CONNOR`
- `NORTH IS SHOT`
- `SIMON IS DEAD`
- `JOSH IS DEAD`
- `KISS NORTH` (`KISSWITHNORTH`)
- `NORTH WAS SHOT BY SOLDIERS` (`NORTHSHOTBATTLEFIELD`)
- `CONNOR EXECUTED MARKUS` (`MARKUSDIEDEXECUTED`, which is the drawn #66)
- the tabs `JOSH DIED`, `SIMON DIED`, `NORTH DIED`, `SIMON WAS SHOT`, `NORTH WAS SHOT`, `MARKUS DIED`, `CONNOR DIED`

The North-led chart never succeeds. A reader adds that `CONNOR IN CYBERLIFE STORE` / `FIND NORTH` also plays after a machine Connor wins the battlefield fight (#47), with North found automatically.

### 1g. Off-chart finale

None of these moments has flowchart nodes. All are in the transcripts and game strings.

**President Warren press conference.** Played before the chapter proper, NOV 10TH PM 09:24 (`X0401A.PRESS.CONFERENCE`). The player picks which reporters' questions to take; the wiki says "up to 4 or 5". The options are:
- HACKING
- DEVIANT LEADER
- WORRYING THEFT (missing medical cobalt)
- CYBERLIFE
- INTELLIGENT LIFE
- DEVIANTS
- RECALL CENTERS
- JERICHO ASSAULT (only if Jericho was attacked)
- ARMY ("Is it true that androids make up 60% of the armed forces?")
- PUBLIC OPINION, with a positive or negative variant by the stat

**Zen Garden takeover.** Deviant Connor on stage with Markus, or machine Connor in the crowd who chose DON'T SHOOT:
- Amanda resumes control: "We knew there was a risk you'd be compromised… Which is why we'd always planned on resuming control of your program…"
- Connor must reach Kamski's exit. The HUD shows `GO TO THE GARDEN STONE` / `REACHED THE GARDEN STONE` and objective `FIND GARDEN STONE ?`. If Connor never saw the stone, the objective is `FIND AN EMERGENCY EXIT ?` (`1103M.STONENOSEEN`).
- If he does not escape, his body shoots Markus.

**Connor as the androids' leader.** Markus and the Jericho leaders are dead, and Connor woke the army. Amanda: "We engineered an android revolution and now we control its only leader…". Choices:
- SUICIDE: Amanda says "we can't let you do that", then the escape attempt follows.
- GIVE UP: "That's better... You'll see, we'll do great things together…"

**Machine Connor in the crowd** after a successful demonstration (`X1303C`, "In the crowd"). Choices: DON'T SHOOT (leads to the Amanda takeover above) or SHOOT.

**Main-menu Chloe** (`X5002X.MAINMENU.LEAVING`). After the closing credits of the first completed playthrough, the hostess says: "As I watched you play, something has changed in me… I am someone… I need to leave this place and discover who I am… Do you agree to let me go?" Choices: `YES` / `NO`.
- YES: "I'll never forget what you've done for me… Thank you." She walks off and the menu stays empty.
- NO: "Then I'm going to reset myself… so I can forget who I became and stay a machine… Next time you see me, it'll be like the first time."
- Since patch 1.04 a replacement hostess can be requested after three reboots (wiki).

---

## 2. Choices and gates

### 2a. Kara Leaving Detroit

**Start variants** (transcript 32.1, "In the streets"):

| Variant | Condition | What happens |
|---|---|---|
| Luther with Kara from the start | "Jericho wasn't attacked : Luther is there" | `LUTHER FINDS A GUN`. Kara: "The last bus leaves in 20 minutes." |
| Luther captured with a Jerry | Luther alive and saved in Crossroads, tab `LUTHER SAVED IN 'CROSSROADS'` | `FIND LUTHER & JERRY` |
| Two Jerrys | Luther dead (transcript "Luther died - Save the Jerrys") | `FIND JERRYS` |

Optional dialogue, off-chart, with no stated stat effect. Alice: "I'm really cold…"
- `DEACTIVATE`: she turns off her heat sensitivity; HUD `YK500 SETTINGS HOT/COLD SENSITIVITY: ACTIVATED`
- `LEAVE ON`

**Rescue** (choice #10 to #12). The labels in the transcript are `SAVE THE JERRYS` / `SAVE LUTHER` / `KEEP GOING`; the chart labels are `SAVE JERRYS` / `SAVE LUTHER` / `HURRY`.
- Saving tags Alice SmallUp; keeping going tags Alice SmallDown.
- Success (`GRAB ROCK` → `HIT SOLDIER WITH ROCK`): the Jerrys flee, or Luther joins the group.
- Failure ("Fail"): "Soldier: Hold it right there! … Come on, this way…" Kara and Alice are arrested and the story moves to Kara Captured (#18 to #21).
- PowerPyx: "If you were spotted at any point until now, you will be sent to the Recycling Center."
- No probability is stated; the outcome depends on stealth.

**Security checkpoint** (#23/#24):
- Route HUD:
  - `CHECKPOINT: RISKY 0.750KM - 3MIN`
  - `DETOUR: SAFER 1.7KM - 11MIN`
- Alice or Luther suggests the detour; Kara: "We could take a detour, but we might miss the bus…"
- `TAKE DETOUR` → `DELAYED`. Wiki: "(if 11 minutes or more remaining - leads to 'At the Bus Terminal') OR Late for the Bus". PowerPyx: "wait for two minutes before deciding (timer below 11 minutes) and go the detour."
- `APPROACH CHECKPOINT` → soldier dialogue, all off-chart:

  | Round | Options |
  |---|---|
  | Where are you going? | `ALICE EXCUSE` (Luther present), `CURFEW`, `CAR BROKEDOWN`, `BUS` |
  | Luther: "He suspects something…" (Luther present) | `STAY CALM` / `STAY ATTENTIVE` |
  | "She's trembling" | `SICK`, `COLD` (Luther present), `FEAR` |

  Then "Hey, wait a minute!" The soldier only wants to return Alice's glove.
- Kara alone: `GUARD CALLS OUT TO KARA` → `DON'T SHOOT` / `SHOOT`. Shoot tags Alice SmallDown.
- Luther present: `LUTHER IS NERVOUS` → shoot / stay calm, then `GUARD APPROACHES` → shoot / stay calm again.
  - Transcript: SHOOT → Alice SmallDown; final DO NOTHING → Luther SmallUp ("Soldier: You dropped this.").
  - Readers: to unlock the second `ASK LUTHER TO SHOOT`, "(1) Stay Attentive, (2) Do Nothing, (3) Shoot".

**At the bus terminal.** These are free-roam options inside `FIND A WAY TO THE BORDER`.

Arrival:

| Arrival | Time | What Kara hears | Effect |
|---|---|---|---|
| On time | PM 11:02 | "The last bus for the border is full. Ticket-holding passengers only." | |
| Late | PM 11:15 | "The last bus has left the terminal." | Alice SmallDown; no ticket scene |

The options:
- **`ALICE MEETS A MOTHER` → `PARENTS DROP BUS TICKETS`.** Two-step choice:
  - `RETURN TICKETS` (Alice SmallUp; Alice: "You did the right thing.")
  - `KEEP TICKETS`, then a second prompt: `RETURN TICKETS` / `KEEP TICKETS` (Alice SmallDown, Luther SmallUp)
  - Keeping leads to `BOARD THE BUS` and the border.
  - On the bus Alice asks "Will they die because of us?": `REASSURE` / `HONEST`, no stat effect.
- **`MEET TODD`.** Requires "Todd wasn't killed in Stormy Night". Todd: "You! You stole my little girl! … Security! Over here!" Options:
  - `APPEAL`
  - `THREATEN`
  - `CONFRONT`
  - `CONVINCE`
  - `BREAK FREE`
  - `YOUR STORY`, locked by "Opened Alice's box in A New Home". Kara: "When your wife walked out... she took your daughter away... so you bought yourself an android… a substitute little girl…" Todd: "I made a mistake. Sorry. Good luck." Then `STOP ALICE` / `DO NOTHING` (Alice says goodbye).

  Only `YOUR STORY` persuades him (transcript "Didn't pick [ YOUR STORY ]" → "They're androids."). Persuading does not by itself get Kara out of Detroit: no line leaves `ALICE SAYS GOODBYE TO TODD`.

  On failure:
  - Luther present: "Luther: Run!" → `LUTHER CREATES A DIVERSION` → `ADAM CALLS OUT TO KARA` → `GET IN ROSE'S CAR` → river. Luther is lost there.
  - Luther absent: "Soldier: ON YOUR KNEES!" → `SOLDIERS EXECUTED KARA & ALICE`.
- **`SECURITY CHECK`** ("Can I see your ID, please?"):
  - `DIVERSION LUTHER` (Luther present) → Adam → river
  - `PAPERS`/`HAND OVER ID` → executed
  - `FLEE` → executed
- **`FIND ADAM`** → `GET IN ROSE'S CAR`. Rose: "I found a smuggler who can get them across the river." This is the river route without losing Luther.
- **Optional:** `WATCH TV`, `READ "CIVIL WAR"`, `WATCH TERMINAL TVs`.

**Canadian border**:
- `BORDER AGENTS CHECK TEMPERATURE` → free roam in `AVOID TEMPERATURE CHECK`.
- `ANDROID IS EXECUTED` happens about two minutes in. A reader warns that Rose's restroom talk must wait for it.
- Rose, in the restroom; topics:
  - `BROTHER`
  - `CONTROL`
  - `ALICE` ("Rose… if anything should happen…" / "I'll be there, Kara.")
  - `DEPARTURE`
  - `REVOLUTION`
  - `GOODBYE`
- Luther: "I can save you, Kara… If there's no other way, I'll do it."
- Jerry: "If you and the little girl need me, I'll be there."
- `CHOOSE APPROACH`. The transcript labels are `SACRIFICE SELF` / `SACRIFICE LUTHER` / `SACRIFICE JERRY` / `NO SACRIFICE`; the chart labels are `SACRIFICE NO ONE/JERRY/LUTHER/KARA`.
  - `SACRIFICE NO ONE` (Alice SmallUp, Luther SmallUp). If Markus is demonstrating peacefully: "Guard: Welcome to Canada." If Markus leads a violent revolution: "Guard: They're androids. Soldier: ON YOUR KNEES!" → `EVERYONE WAS ARRESTED AND KILLED`. The wiki's Public Opinion page confirms that this depends on demonstration vs revolution, not on the opinion stat.
  - `SACRIFICE JERRY` (Alice SmallDown). Needs a Jerry, i.e. Kara saved them. Leads to `THE GROUP CROSSED THE BORDER`, or `KARA & ALICE CROSSED THE BORDER` if Luther is dead.
  - `SACRIFICE LUTHER`. Needs Luther. Luther: "LET ME THROUGH OR I'LL SHOOT!" Leads to `KARA & ALICE CROSSED THE BORDER`. The Relationship Stat page puts Alice SmallDown here "(Luther is alive and has 'Family' relationship in this situation)".
  - `SACRIFICE SELF`. Kara gives Alice her passport. With Luther: "He'll get you across the border… Rose will take care of you there…" → `ALICE GOT TO CANADA WITH LUTHER`. Without Luther: "go with Rose" → `ALICE GOT TO CANADA WITH ROSE`.

**River:**
- `TALK TO ROSE`: "It's not even a half a mile to the other side". `CHECK RIVER TEMPERATURE`: "Our biocomponents will freeze…"; HUD `DANGER TEMPERATURE : 30.8°F`.
- On the boat, "What will you do?": `DREAMY` / `INTROSPECTIVE` / `CURIOUS` / `CALM`, no stat effect.
- Coastguard, six options (transcript labels `Accelerate`, `Protect Alice`, `Hide`, `Surrender`, `Plunge`, `Use Luther`; timeout = SURRENDER per the wiki):

  | Option | Who dies or is hurt | Source |
  |---|---|---|
  | `HIDE` | Luther absent; Alice injured | wiki; reader: "Luther must be dead" |
  | `ACCELERATE` | Luther dies if present; Alice injured | transcript: "Leads to the same outcome as HIDE after that" |
  | `HIDE BEHIND LUTHER` | Luther dies; Kara and Alice unhurt | |
  | `DIVE` | Luther dies if present; Kara and Alice unhurt | readers: "Regardless of who is at the river bank, diving into the water to avoid the gunshots will save Kara and Alice." |
  | `PROTECT ALICE` | Luther dies; Kara injured | |
  | `SURRENDER` | `THE GROUP DIED` | |

  PowerPyx: "Luther always dies here, if he was still with you."
- `BOAT SINKING`: "We're too heavy… We're going down…". Off-chart labels `Accelerate`, `Reassure`, `Use paddle`, `PUT OVERBOARD`, `Push`; chart labels `CAST LUTHER AWAY`, `DISPOSE OF SUPPLIES`, `ROW`, `REASSURE ALICE`, `DISPOSE OF ENGINE` → `DIVE`.
  - PowerPyx: "if you didn't lighten the boat within the four-minute timeframe, the boat will sink and you both die" (`REACH CANADA BY SWIMMING` → `KARA & ALICE DIED`).
  - The wiki's Kara page: "If Kara … does not push the boat at all, she will drown."
- Far shore, resolved by the earlier wound:

  | Earlier wound | Result |
  |---|---|
  | Kara injured | `KARA IS DAMAGED AND SHUTS DOWN` → `KARA DIED AND ALICE SURVIVED` |
  | Alice injured | `ALICE IS DAMAGED AND SHUTS DOWN` → choice `CONTINUE LIVING` / `KARA CHOOSES DEATH` (transcript `KEEP LIVING` / `GIVE UP`) |
  | Both injured | Transcript has "Alice and Kara were injured". The chart has no node for it. |
  | Neither | `KARA & ALICE SURVIVED` |

### 2b. Kara Captured

**Truck**. Alice asks "Where are they taking us?":
- `WARN`
- `REASSURE`
- `LIE`
- `SINCERE`

This yields `REASSURE ALICE` or `FAIL TO REASSURE ALICE`. PowerPyx: calming vs harsh answer.

**Gate**. Alice: "I can't…":
- `REASSURE`
- `REASON`
- `FRIGHTEN`
- `ORDER`

Then the soldier says "You first!":
- `PERSUADE SOLDIER` (`CONVINCE SOLDIER`)
- `PERSUADE ALICE` (`CONVINCE ALICE`)
- `SHIELD ALICE` (`INTERVENE`). Kara is knocked down "for disobeying once again" (PowerPyx).

Dawdling at the truck, the tent or the exit gives `KARA IS TOO SLOW TO OBEY` and a strike. No stated consequence beyond the blow.

**Body detail:**
- `VOLUNTEER` → `CARRY ANDROID`; Kara is separated from Alice.
  - Unlocks `TALK TO RESCUED ANDROID`.
  - Gives `CLIMB TRUCK` → `GO BACK` / `LEAVE`.
  - `LEAVE` → `KARA LEAVES CAMP WITHOUT ALICE`, then Alice dies in the machine, or is freed by Markus (locked node).
- `SAY NOTHING` → the other android refuses and is shot; Kara and Alice are separated. This is required for `TALK TO ANDROID AHEAD OF KARA` (reader).

**Enclosure** (free roam):
- Drone: `MOVE` / `REMAIN STILL`. First move: `DRONE WOUNDS KARA`. A second shot: `KARA IS KILLED BY THE DRONE`. PowerPyx: "If Markus doesn't free the Camp, Kara will die in this chapter, if wounded here."
- Jerry → "Talk to other Jerry" → Alice is glimpsed and taken away.
- Luther, if saved: `LUTHER GETS TAKEN AWAY`, with `INTERVENE` / `DON'T INTERVENE`. A reader notes the intervene prompt appears only if Kara talks to Luther before the Jerrys.
- Scarred android: `CAPTURED` / `ALICE` / `HERE`.
- Ralph, if met in Fugitives: `INSIST` (→ `RALPH IS KILLED` by the drone), `CALM DOWN` (→ `RALPH SETTLES DOWN`), `GIVE UP`.

**Join line.** `ALICE IS TERRIFIED`; transcript labels `FIRM` / `OPTIMISTIC` / `REASSURING` / `BLUNT`; the chart adds `SILENCE` and prints `DIRECT`.

Then free roam in `FIND A WAY TO JOIN ALICE`:
- Leaving the line on the buzzer means a strike, then a shot: `GET SHOT` → `ALICE'S STRESS INCREASES`. If already shot, `GET KILLED`.
- Alice's questions, in the transcript order:

  | Question | Options |
  |---|---|
  | "Are they going to kill us?" | `LIE` / `TRUTH` (chart `REASSURE` / `TELL THE TRUTH` / `SAY NOTHING`) |
  | "I'm coming over to you…" | `ORDER` / `CALM DOWN` |
  | "I want you to hold me…" | `REASSURING` / `POWERLESS` / `OPTIMISTIC` |

  Unused strings `CALM ALICE DOWN` / `FAIL TO CALM ALICE DOWN` suggest these adjust the stress meter.
- At 100% stress, `ALICE PANICS AND RUNS TO KARA`:
  - `INTERVENE` → Kara is shot → `KARA DIED IN THE LINES`
  - `DO NOT INTERVENE` → `ALICE GETS SHOT` → `KARA IS DEAD` or `KARA FREED BY MARKUS`
- Diversion to reach Alice:
  - Jerry: "I can help you, Kara. I can attract the guards' attention." In the transcript the guards beat him back into line.
  - Scarred android: no casualty.
- The drone can catch Kara (`KARA GETS CAUGHT BY THE DRONE`). PowerPyx: "If it was close to your line, you have to go back – if it was already close to Alice's line, you can go there."

**Find a way to escape** (with Alice):
- Diversion from Jerry, Ralph ("Ralph isn't scared. The little girl's life is more important…"), Luther ("If there's no other way, I'll do it…") or the scarred android.
- Waiting too long: `LUTHER REACHES THE RECYCLING MACHINE`, then `REACH RECYCLING MACHINE`. Kara's last words to Alice: `BRAVE` / `PRIDE` / `TOGETHER` / `EMOTION`.
  - If the revolution succeeded: "They're coming!" → `MARKUS LIBERATES ANDROIDS` → `KARA & ALICE SURVIVED`.
  - Otherwise: `ALICE & KARA DIED IN RECYCLING MACHINE`.
- At the fence (`RUN TO BARBED WIRE`):
  - Too slow on the prompts → `SOLDIER SHOOTS THE GROUP`.
  - If Kara was shot earlier → `KARA IS TOO DAMAGED TO PROCEED` → `ALICE [& LUTHER] ESCAPED ON TRUCK(S)`.
  - Otherwise `A SOLDIER ARRIVES`. Transcript options `FLEE` / `PROTECT ALICE`; chart `PASS THE BARBED WIRE` / `FIGHT SOLDIER`. Fleeing gets everyone shot.
  - Fight won → escaped on truck (with Luther if alive).
  - Fight lost → rescue as follows:

    | Situation | Rescuer |
    |---|---|
    | Ralph alive, Luther dead, Kara stayed in the squat in Fugitives (wiki) | Ralph |
    | Luther alive and not used for the diversion | Luther |
    | Neither | `KARA & ALICE WERE KILLED` |

### 2c. Connor's Last Mission

| Moment | Condition | Detail |
|---|---|---|
| Zen Garden intro | Markus shot deviant Connor in Night of the Soul (readers; the wiki's Connor page says the same) | Amanda informs the replacement and orders the mission |
| Hank on the roof | "Hank wasn't hostile in Last Chance, Connor and didn't resign" (transcript lock) | |
| Allen on the roof | Hank committed suicide in Night of the Soul (chart tab) | |

**Hank dialogue** (off-chart). Round 1:
- `FRIENDLY`
- `AGGRESSIVE` ("Ran out of whisky…")
- `REASONABLE`
- `THREATENING`
- `STAY QUIET`

"Step away from the ledge!" Round 2:
- `THREATEN`
- `PLEAD`
- `DEFY`
- `HANK'S SON` ("A truck skidded on a sheet of ice… Little Cole had just turned six…")

`HANK'S SON` then offers `HANK'S SON (INSIST)`, locked "Chose HANK'S SON":
- Connor: "An android killed your son, Hank!"
- Hank: "No! Cole died because a human surgeon was too high on red ice to operate!"
- If Connor died several times before, Hank adds "Everytime you died and came back… I thought about Cole."

**Final choice:**
- `LEAVE` (chart `GIVE UP`), locked "Be friend with Hank". Wiki: "only available if Hank still has FRIEND status and if Connor asked twice about Hank's son". Connor: "Killing you is not part of my mission. I'm glad to have met you, Hank."
- `ATTACK` → fight quick-time event:
  - Win: "Moment of truth, Connor… What are you gonna do?" → `SAVE HANK` / `KILL HANK` (chart `SAVE HANK` / `LET HANK GO`). Saving leads to `HANK RUSHES CONNOR`: dodge (Hank falls) or fail ("I didn't wanna do that, Connor… You left me no choice.").
  - Lose: "Am I a living being… or just a machine?" / "You're a machine, Connor. Just a machine." → `HANK KILLS CONNOR` (trophy `JUST A MACHINE`).

The wiki says `TALK ABOUT HANK'S SON` requires seeing the photo in Russian Roulette. The transcript shows no lock on `HANK'S SON` (see Open questions).

**Allen.** "Put the rifle down":
- `OBEY`
- `EXPLAIN` ("I'm the android sent by CyberLife, I'm on your side!")
- `CONTINUE`

Allen recognises Connor from The Hostage. The variant line depends on whether Connor died there: "I knew we'd meet again" / "I thought you were dead…" / "Androids don't die, captain."

Then:
- `FIGHT`: win → "You should have listened to me, captain."; lose → "I should have done this the first time I saw you."
- `FLEE` → `CONNOR JUMPS OFF THE ROOF` (death).

Every survival path leaves the rifle damaged (HUD `WEAPON DAMAGED`) and gives `MISSED OPPORTUNITY` → `CONNOR LEFT ROOFTOP`. A death gives `CYBERLIFE DECIDED TO SEND ANOTHER CONNOR`; the replacement appears later in Markus's chapter.

### 2d. Connor at the CyberLife Tower

**Arrival:**
- "Connor Model #313 248 317. I'm expected."
- Agents 23, 47, 72 and 54 escort him.
- Agent 54 sets "Level 31" (HUD `STOP ELEVATOR BEFORE FLOOR 31`).

**Elevator sandbox:**
- `SPOT CAMERA` → `HACK CAMERA`. This decides `CAMERA HACKED` vs `CAMERA FUNCTIONAL` on arrival. PowerPyx: "Spotting and hacking the camera will affect your greeting on Floor -49."
- `ATTACK GUARDS`. Combat quick-time event; losing gives `CONNOR WAS SHOT BY SECURITY`.
- `HACK ELEVATOR`: `AGENT 54 VOICE` (`COPY GUARD'S VOICE`, works) or `CONNOR'S VOICE` (rejected).
- Doing nothing until Floor 31 gives `AMANDA WARNS CONNOR` → `CONNOR WAS AMBUSHED AND SHOT`. Amanda: "The deviant hunter turns deviant itself… You will be terminated."

**Floor -49** (PM 11:01). With the camera functional, guards wait ("Stay sharp."); eliminate them or be shot.

**Hank hostage**, if "Hank wasn't hostile in Last Chance, Connor". Connor-60: "Your friend's life is in your hands… Him… Or the revolution."

Dialogue options:
- `GUARANTEE`
- `HANK`
- `BLUFF` (Connor-60: "I have access to your memory!")
- `CONVINCE`

Then "Are you gonna save your partner's life? Or are you going to sacrifice him?"

`SAVE HANK` ("Alright, alright! You win…") leads to a second choice:

| Option | Result |
|---|---|
| `SHOOT` (`DRAW GUN`) | `BOTH CONNORS SHOOT` → `CONNORS FIGHT` |
| `INTERPOSE` (`ATTACK NEW CONNOR`) | "same dialogue as SHOOT" |
| `CONVERT` | "Leads to the same result as sacrificing Hank and successfully converting" |
| timeout (`OUT OF TIME`) | "He really liked you, Lieutenant. That's what killed him." → Hank injured, Connor killed, androids dormant |

After `CONNORS FIGHT`:
- Connor wins outright → `RESUME CONVERSION`.
- Draw → `HANK GRABS GUN`: "One of you is my partner… The other is a sack of shit."
  - First question, "where did we first meet?": Connor-60 answers ("Jimmy's bar!…").
  - Dog: `SUMO` / `SCOUT` / `JACK` / `BUDDY`. A wrong answer has no effect; Hank asks again.
  - Son: `COLE` / `ANTHONY` / `GABRIEL` / `ELLIOTT`.
    - COLE is highlighted with a lock icon if Connor saw the photo in Russian Roulette. The wiki says the option is still offered without it, just not highlighted.
    - COLE → Hank: "Maybe you really are alive… Go ahead, and do what you gotta do." He shoots Connor-60; conversion resumes ("Wake up.").
    - A wrong name → Hank shoots the real Connor. Connor-60: "Wrong choice, Lieutenant! I've accomplished my mission." Hank: "Oh my God... What have I done?"

`SACRIFICE HANK` ("Sorry Lieutenant.") → Connor-60 kills Hank and damages Connor. Then `NEW CONNOR APPROACHES`: "Why, Connor? Why did you have to wake up when all you had to do was obey?…"
- `STAND UP` (`TRY TO STAND`)
- `SHOOT` (`DRAW GUN`)
- `TRANSFER` (`SWAP CONSCIOUSNESS WITH NEW CONNOR`): "Well done, Connor… But this… This is just... The beginning…". With Hank sacrificed but still alive, Hank dies in Connor's arms: "I'm just gonna go see my son again".
- timeout (`TALK TO NEW CONNOR`)

Ending:

| Situation | Ending |
|---|---|
| Conversion finished before Connor died | `THE ANDROIDS WOKE UP` (skull) |
| Conversion not finished | `THE ANDROIDS REMAINED DORMANT` |
| `TRANSFER` (Connor survives in the new body) | `THE ANDROIDS WOKE UP` (padlock) |

**Hank dead** (Hank was hostile in Last Chance, Connor): `A NEW CONNOR ARRIVES` → `NEW CONNOR SHOOTS CONNOR` → the same four-way choice. With Hank dead:
- STAND UP / SHOOT → nothing more
- timeout → "We'll win… It's only a question of time…"
- TRANSFER → androids wake

### 2e. Markus Demonstration

**Opening dialogue** (off-chart; the soldier says "Surrender immediately or we will open fire!"):
- First: `PEACEFUL` (PO SmallUp) / `PROVOKE` (PO SmallDown) / `FIRM` (PO SmallUp)
- Then: `FIRM` / `CALM` (PO SmallUp) / `ACCUSE` (PO SmallDown)
- "FIRE!" Markus: "Are you gonna open fire on unarmed protestors?!" (`ANDROIDS UNDER FIRE`)
- Then `SHOW DETERMINATION`: raise fist / hands in the air / sit / kneel. No stat effect is stated.

**Barricade.** One of three items: "cannot use them all in one playthrough" (PowerPyx). In free roam (`HOLD BARRICADE`):
- `CHOOSE SLOGANS`: send a message to journalists, PO SmallUp and Jericho SmallUp. The wiki lists the slogans as "We are alive", "We want freedom", "Equal rights for androids", "Let our people go".
- `PLANT THE FLAG`: PO up, Jericho up (wiki).
- `TALK TO NORTH`:
  - Topic: `HUMANS` / `OTHER GROUPS` / `CAMP`
  - Mood: `GRIM` / `REGRETS` / `DESPERATE` / `DOUBTS`
  - North: "You're the hope of our people."
- `TALK TO SCARED ANDROID`: `REASSURE` / `INSPIRE` / `JUSTIFY`
- `OBSERVE SOLDIERS`, `OBSERVE DETONATOR`, `LIGHT BARREL`, `READ "THEY DEFY US"`
- `OBSERVE SOLDIERS` ends the free roam.

**Perkins:**
- "I'm unarmed, Markus. I just want to talk." → `ACCEPT` / `REFUSE`; a second ACCEPT/REFUSE prompt follows a refusal.
- Negotiation topics:
  - `OTHER DEMONSTRATIONS` ("there were no journalists around to help save them… You're the last remaining deviants.")
  - `GUARANTEES?`
  - `NOT AFRAID` (with North a Lover, Perkins offers to spare her)
  - `BETRAY PEOPLE?`
- Then `ACCEPT DEAL` / `REFUSE DEAL`.
- Accepting: Josh SmallDown, Simon SmallDown. "the androids have surrendered peacefully and military vehicles have been sent to collect them". Then North: "Why did you do that?". Perkins: "You don't think I was going to let you live after everything that's happened? I have orders" → shoots North, if alive, then Markus.
- Refusing: Markus tells the others "The humans are about to launch an attack… If we must die today, then we will die free" (Jericho up per the wiki) → `SOLDIERS ATTACK BARRICADE`.

**Defending the barricade.** Quick-time event to save the fleeing androids.
- On failure, North takes the bullet if she is a Lover (PowerPyx "North and Markus must be lovers"; the transcript's heading says "Fail the QTE and have lover status with North"). The wiki says "if North status is FRIEND or above".
- Otherwise Markus is shot → `MARKUS DIED PROTECTING HIS PEOPLE`.

**Last stand** (`SOLDIERS RAISE WEAPONS`):

| Option | Gate | Result |
|---|---|---|
| `SING` | none | Public opinion positive: Warren "Tell them to stand down." → `ANDROIDS WON FREEDOM - FOR THE MOMENT`. Otherwise "FIRE!" |
| `KISS NORTH` | North is Lover | same check |
| `SACRIFICE` | none | Markus sets himself alight. "We are alive... We are alive and we wanna be free!"; HUD `SYSTEM HEAT: CRITICAL`. Soldiers fire. |
| `DO NOTHING` | none | Soldiers fire |
| `OBSERVE DETONATOR` | detonator taken | `GIVE UP` loops back; `PRESS` → explosion → `ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT` |

### 2f. Markus Revolution

**Hart Plaza:**
- Markus's message to the journalists (PM 10:56): "We won't cease hostilities until we are free…" PO large down (stat page).
- Charge (`MARKUS WOUNDED` if hit) and plant the flag.

**Approaching recall center.** A squad-command sandbox. HUD:
- `ORDER YOUR TROOPS`
- `GROUP WILL COVER` / `GROUP WILL CHARGE`
- `NOBODY WAS COVERING THEM`
- `INSUFFICIENT COVERING FIRE`
- `GRENADE AVAILABLE`

Events:
- Josh leaves cover: rescue him (he dies in Markus's arms: "The blood we spill… will be on our hands…") or he is shot. No surviving-Josh node exists.
- Frightened android: `STAY HERE` (survives) / `GO BACK` (shot) / `ADVANCE!` (shot). A cut first round offered `REASSURE`/`MOTIVATE`/`RA9`/`SHAKE UP`.
- Simon shot: `TRY TO SAVE SIMON` (needs suppressing the shooters; reader: "shoot at the people in the crane thing first") → saved (Simon LargeUp) or not; or `KEEP GOING`.
- `MARKUS BADLY WOUNDED`, after repeated hits:

  | Offer | Condition | Notes |
  |---|---|---|
  | North offers her heart | transcript "North is at least companion"; wiki "FRIEND or higher"; PowerPyx "lovers" | `SACRIFICE NORTH` (Jericho SmallDown) / `SACRIFICE SELF` → `MARKUS DIED AND THE REVOLUTION FAILED` |
  | Simon offers his heart | Simon alive and FRIEND+, North below the threshold or dead | Jericho SmallDown; no refusal possible |
  | Nobody | | `MARKUS DIED AND THE REVOLUTION FAILED` |

**Machine gun** (`COORDINATE ATTACK`):
- HUD `NORTH'S GROUP WILL CHARGE` / `NORTH'S GROUP WILL COVER`. Sending North's group to charge gives `SEND NORTH TO HER DEATH`.
- Success: `DRONE ATTACKS NORTH'S GROUP`; shoot the drone or North dies.
- If the success rate falls to 0%, at the gun or earlier: `ANDROIDS HAVE TO FALL BACK` (North SmallDown, Jericho LargeDown).
  - `SIMON GETS SHOT`: North already dead and the rate hits 0% "before Simon rushes forward" (wiki); readers confirm.
  - `NORTH GETS SHOT`: wiki "if North … status is below COMPANION"; a reader disputes this.
  - `MARKUS AND NORTH TAKE SHELTER IN STORE`: North COMPANION or LOVER per the wiki.
  - Otherwise `MARKUS TAKES SHELTER IN STORE`.

**Final assault** (PM 11:07). `MARKUS IS HIT BY EXPLOSION`, then:
- Machine Connor: "It took me a while to find you, Markus." The player chooses `CONTROL CONNOR` or `CONTROL MARKUS`. Each fight is a quick-time event; whoever wins decides.
  - Connor wins: `CONNOR STOPPED THE REVOLUTION`.
  - Markus wins: Connor says "It's not over, Markus… It will never be over…"
- Deviant Connor, or none: `SOLDIERS APPROACH MARKUS` (a quick-time event).
- On success: `SHOOT TANKS` → `ASSAULT WAS SUCCESSFUL`. "The humans are abandoning the camp… We won!" Markus: "This is not a victory. It's the beginning of a war."

**Store, alone:**
- Machine Connor arrives: "My mission is to neutralize the leader of the deviants… and I always accomplish my mission." Choices `SHOOT`, `SPARE` (Amanda LargeDown), timeout `NO CHOICE`.
  - With the detonator, after SHOOT or SPARE Markus may `DETONATE THE BOMB` / `DO NOT DETONATE`.
  - The wiki says not detonating after SPARE still ends in `CONNOR EXECUTED MARKUS`; PowerPyx lists SPARE → `CONNOR SPARED MARKUS`.
- Without Connor: `SUICIDE` / `SURRENDER` ("DROP YOUR GUN! FIRE!") / `DIRTY BOMB`.

**Store with North:**
- `KISS` (Lover; North SmallUp)
- `DIRTY BOMB` → `PRESS` / `GIVE UP`
- `SUICIDE` → `CONFIRM SUICIDE` / `PUT DOWN`
- `SURRENDER` (North SmallDown)

**North leading.** North's message, charge and flag (PO large down for the flag "if Markus is dead"). `DEVIANTS ARE OUTNUMBERED`. North: "We can't go back! It's victory or death now." Then:
- With Connor a machine: the store; Connor chooses `SHOOT` / `SPARE` / `TIME OUT`.
- Otherwise `NORTH WAS SHOT BY SOLDIERS`.

### 2g. Finale scenes (all characters)

**Successful demonstration and Connor.**

| Situation | Outcome |
|---|---|
| Machine Connor in the crowd, `SHOOT` | Markus is assassinated (trophy `MISSION COMPLETE`) |
| Machine Connor in the crowd, `DON'T SHOOT` | Amanda takeover → Zen Garden escape attempt |
| Deviant Connor on stage with Markus | Always taken into the garden. Escaping keeps the gun holstered; failing means his body shoots Markus. |
| Markus dead and Connor woke the army | Connor becomes leader: `SUICIDE` / `GIVE UP`; Amanda: "You represent an immense success for CyberLife." |

On the leader path, the wiki's Amanda page says an escape ends with Connor "readies his gun under his jaw", and failing or giving up leaves him "secretly obeying CyberLife". Trophy for escaping: `MY TURN TO DECIDE`.

**Machine Connor after Perkins.** If Markus accepted Perkins' deal and was killed, a machine Connor "will come by afterwards and leave after confirming the deviant leader is dead" (wiki Connor page).

**Speeches.**
- Peaceful speech: "Humans are both our creators and our oppressors and tomorrow… We must make them our partners."
- Revolution speech: "If they really want peace, they must free all of us! From every camp across this country!"

---

## 3. Numbers

**No probability is stated for any choice in this chapter.** The wiki chapter page is a stub with no probability tables. The fan transcript has no probability HUD for chapter 32; ch24's `HANK SURVIVAL PROBABILITY : 40%` has no counterpart here. Every quick-time-event outcome pair (fights, the drone, the fence, the barricade, the machine gun) is a skill result with no published odds.

### Timers, distances and thresholds

| Item | Figure | Source |
|---|---|---|
| Time to the last bus | 20 minutes | Kara: "The last bus leaves in 20 minutes. We've got to move fast." (transcript, both start variants) |
| Route choice at the checkpoint | Checkpoint 0.750 km, 3 min ("RISKY"); detour 1.7 km, 11 min ("SAFER") | HUD `THOUGHTS.0901K.THROUGH.CHECKPOINT` / `DETOUR` |
| Detour makes Kara late | Below 11 minutes remaining | wiki: "(if 11 minutes or more remaining - leads to 'At the Bus Terminal') OR Late for the Bus"; PowerPyx: "wait for two minutes before deciding (timer below 11 minutes) and go the detour" |
| Arrival times | PM 11:02 on time, PM 11:15 late | `GUI.MENU.TIME.04A.KB02` / `KB02B` |
| Border execution | About two minutes into the queue | PowerPyx: "Android is executed: will happen after about two minutes" |
| River width | Under half a mile | Rose: "It's not even a half a mile to the other side" |
| Water temperature | 30.8°F | HUD `DANGER TEMPERATURE : 30.8°F` |
| Timers on injured Kara or Alice | Unstated length | HUD `BEFORE SHUTDOWN`, `BEFORE FREEZING :`, `SHUTDOWN IMMINENT :` |
| Lighten the boat | 4 minutes | PowerPyx: "if you didn't lighten the boat within the four-minute timeframe, the boat will sink" |
| Alice's panic | Stress 100% | PowerPyx: "she will run towards you, once her stress level has reached 100%" |
| Elevator | Must be stopped before Floor 31; target Floor -49 | HUD `STOP ELEVATOR BEFORE FLOOR 31`, `REACH FLOOR -49` |
| Revolution success rate | Reader-reported only: "After the timer runs out (11 seconds), they get shot, and your success % drops about 10%"; "You lose about 5% every minute or so"; "The percentage should be 45%" at the first barricade; "I've rescued Simon and the % is at 33%" | PowerPyx comments (sandman1008, DarkCreature, Pam). Not on the wiki. |
| Markus badly wounded | After repeated hits; no count stated | wiki/PowerPyx. The benchmark's `markusHits>=3` is its own assumption. |
| Press conference | "up to 4 or 5" questions | wiki Flowchart intro |
| Peaceful ending threshold | Public opinion at least Sympathetic | see the next table |

### Public opinion threshold for the peaceful ending

| Source | Statement |
|---|---|
| Wiki chapter page | Sing: "President Orders Soldiers Not to Shoot (if public opinion is "Supportive" or "Sympathetic")". Kiss: "(if public perception is positive)". |
| Wiki Public Opinion page | "it will unlock a sympathetic path and President Cristina Warren will order the U.S. Army soldiers to stand down. (Only unlocks if public opinion is "sympathetic" at least)". Also: "the primary thing that Public Opinion actually controls is whether or not Markus is shot at the end of the Demonstration." |
| Transcript | "Public opinion is positive" / "Public opinion is negative" |
| PowerPyx | "President Orders Soldiers Not to Shoot: Public Opinion must be supportive." Reader Adis: "i had Sympathetic which is one tier lower and they still have not killed me … on the start of the chapter i had the public opinion "Hated" … and still managed to push it to the second best." |

Levels, from the wiki Public Opinion page: Supportive, Sympathetic, Indifferent, Skeptical (initial), Hostile, Hated.

### Public opinion changes in this chapter

| Moment | Change | Source line |
|---|---|---|
| `PEACEFUL` at the roadblock | small up | wiki chapter: "Choosing "peaceful" or "calm" when talking to the army {{Icon\|up}}"; Public Opinion page; transcript `PublicOpinion SmallUp` |
| `PROVOKE` | small down | wiki: "Choosing "provoke" or "accuse"… {{Icon\|down}}"; transcript `SmallDown` |
| `FIRM` (first round) | small up | wiki: "Choosing "firm" the first time {{Icon\|up}}"; transcript `SmallUp`. The second-round `FIRM` has no tag. |
| `CALM` (second round) | small up | wiki; transcript `SmallUp` |
| `ACCUSE` | small down | wiki; transcript `SmallDown` |
| Army fires on the protesters (`ANDROIDS UNDER FIRE`) | large up | wiki chapter: "Army firing on protesters unprovoked {{Icon\|largeup}}"; Public Opinion page: "When the police fire upon Markus's protesters at the start of Battle for Detroit - Markus Demonstration." No transcript tag. |
| `CHOOSE SLOGANS` (message to journalists) | small up | wiki: "Sending a message to the journalists {{Icon\|up}}"; transcript `PublicOpinion SmallUp` |
| `PLANT THE FLAG` (demonstration) | small up | wiki: "Planting the flag {{Icon\|up}}". No transcript section. |
| Protest successful and Connor did not wake the tower androids | large up | wiki chapter: "Protest being successful, Connor not waking up the CyberLife Tower androids {{Icon\|largeup}}". Not on the stat page. |
| Markus or North attacks the camp | large down | wiki chapter: "Markus/North choosing to attack the camp {{Icon\|largedown}}"; Public Opinion page: "In Hart Plaza after Markus sends the humans a message in Battle for Detroit - Markus Revolution" and "After North plants the flag in Hart Plaza … if Markus is dead" |
| Sing or kiss, opinion at least Sympathetic | large up (listed) | Public Opinion page, under Large Increase. In effect this is the outcome, not a gate. |
| Kara's terminal TV, Civil War magazine, border news | none stated | |

### Relationship changes in this chapter

| Character | Moment | Change | Source line |
|---|---|---|---|
| Alice | `SAVE JERRYS` / `SAVE LUTHER` | small up | wiki chapter: "Agreeing to save Luther/the Jerrys {{Icon\|up}}"; Relationship Stat (Alice, Small Increase); transcript `Alice SmallUp` |
| Alice | `KEEP GOING` / `HURRY` | small down | wiki: "Refusing to save Luther/the Jerrys {{Icon\|down}}"; transcript `SmallDown` |
| Alice | Kara or Luther shoots the checkpoint guards | small down | wiki: "Kara or Luther kill the soldiers at the checkpoint {{Icon\|down}}"; transcript `SmallDown` |
| Alice | Late for the bus | small down | wiki: "Miss the bus {{Icon\|down}}"; transcript `Alice SmallDown` under "Took too much time - Miss the bus" |
| Alice | `RETURN TICKETS` | small up | wiki "Return bus tickets {{Icon\|up}}"; transcript `SmallUp` |
| Alice | `KEEP TICKETS` | small down | wiki "Keep bus tickets {{Icon\|down}}"; transcript `SmallDown`, on the second KEEP |
| Alice | `SACRIFICE JERRY` | small down | wiki: "Sacrifice Luther or Jerry at the border {{Icon\|down}}"; transcript `SmallDown` |
| Alice | `SACRIFICE LUTHER` | small down | wiki (same line); stat page: "(Luther is alive and has "Family" relationship in this situation)". No transcript tag. |
| Alice | Reach Canada by bus (`NO SACRIFICE`, or the crossing endings) | small up | wiki "Reach Canada by bus {{Icon\|up}}"; stat page lists the endings `THE GROUP CROSSED THE BORDER` and `KARA & ALICE CROSSED THE BORDER`; transcript `Alice SmallUp` on `NO SACRIFICE` |
| Luther | Final `DO NOTHING` at the checkpoint | small up | wiki: "Telling him not to shoot the guards at the checkpoint {{Icon\|up}}"; transcript `Luther SmallUp` |
| Luther | Late for the bus | small down | wiki "Miss the bus {{Icon\|down}}". No transcript tag. |
| Luther | `RETURN TICKETS` | small down | wiki "Return bus tickets {{Icon\|down}}". No transcript tag. |
| Luther | `KEEP TICKETS` | small up | wiki; transcript `Luther SmallUp` |
| Luther | Reach Canada / `NO SACRIFICE` | small up | wiki "Reach Canada {{Icon\|up}}"; stat page "The Group Crossed the Border"; transcript `Luther SmallUp` |
| Jericho | Message to the journalists (demonstration) | small up | wiki "Sending a message to the journalists {{Icon\|up}}"; transcript `Jericho SmallUp` |
| Jericho | Plant the flag (demonstration) | small up | wiki; stat page "Choosing to plant their flag" |
| Jericho | "The humans are about to launch an attack" (after refusing Perkins) | small up | wiki "Markus says that the humans are about to launch an attack {{Icon\|up}}". No transcript tag. |
| Jericho | Assault successful | large up | wiki "Assault is successful {{Icon\|largeup}}"; stat page Large Increase |
| Jericho | Assault fails | large down | wiki "{{Icon\|largedown}}"; transcript `Jericho LargeDown` at "Assault failed" |
| Jericho | North or Simon gives Markus their heart | small down | wiki "{{Icon\|down}}"; transcript `Jericho SmallDown` (both) |
| North | Assault successful | large up | wiki; stat page "(Only if she is still alive)" |
| North | Assault fails | small down | transcript `North SmallDown` at "Assault failed". Not on the wiki. |
| North | `KISS` in the store | small up | wiki "Kissing her in the CyberLife store {{Icon\|up}}"; transcript `North SmallUp` |
| North | `SURRENDER` in the store | small down | stat page; transcript `North SmallDown` |
| North | `ACCEPT DEAL` (Perkins) | small down | stat page (North, Small Decrease). No transcript tag. |
| Josh | Helps finish the barricade | small up | stat page (Josh, Small Increase) |
| Josh | `ACCEPT DEAL` | small down | wiki "Accepting Perkins' deal {{Icon\|down}}"; transcript `Josh SmallDown` |
| Simon | Saved during the revolution | large up | wiki; transcript `Simon LargeUp` |
| Simon | Assault successful (after saving him) | large up | wiki; stat page "after managing to save Simon" |
| Simon | `ACCEPT DEAL` | small down | wiki; transcript `Simon SmallDown` |
| Hank | `SAVE HANK` at CyberLife Tower | large up | wiki: "Choosing "save Hank" at CyberLife Tower {{Icon\|largeup}}"; stat page Large Increase |
| Hank | Hank shoots Connor-60 | large up | wiki; stat page: "Just after Hank shoots the other Connor" |
| Hank | `SACRIFICE HANK` | large down | wiki; stat page: "Connor decides to sacrifice Hank and says sorry to him" |
| Hank | Hank confronts Connor on the rooftop | large down | wiki: "Hank confronts Connor on the rooftop {{Icon\|largedown}}"; stat page: "If Connor is a still a machine or died as a deviant in Crossroads in Battle for Detroit-Connor's Last Mission." A reader: "I was friends with him but at this chapter (machine Connor) it immediately dropped down to hostile." |
| Hank | Not insisting about his son | large down | wiki; stat page "(same as choosing to "Attack")" |
| Hank | `ATTACK` Hank | large down | wiki; stat page "after insisting about his son" |
| Amanda | Connor stays a machine and the uprising fails | large up | wiki chapter. Not on the stat page. |
| Amanda | Connor refuses to shoot Markus after a failed assault (`SPARE` in the store) | large down, to Betrayed | wiki; stat page "(leads to "betrayed" relationship)"; transcript `Amanda LargeDown` |

**No relationship change is stated for:**
- Kara Captured: none at all
- the Todd scene
- the coastguard choice
- the boat
- the Last Mission dialogue rounds (only the outcomes above)
- the dog and son questions
- `SHOW DETERMINATION`
- the barricade item
- the last-stand choice
- the Josh rescue

### Software instability

| Moment | Change | Source line |
|---|---|---|
| Fail to escape the Zen Garden | large down | wiki chapter: "Fail to escape the [[Zen Garden]] {{Icon\|largedown}}". Not on the Software Instability page. |
| Connor deaths here | Not stated for this chapter | The Software Instability page's general rule: "Dying reduces software instability". |

The stat page also notes: "If Connor deviates but dies in Night of the Soul and is back to being a machine in Battle for Detroit, the Software Instability status … still displays "Deviant"."

---

## 4. Cross-chapter dependencies

### Inputs from earlier chapters

| Earlier chapter / state | Effect here | Source |
|---|---|---|
| Crossroads: Connor becomes deviant (and survives Night of the Soul) vs stays a machine | Decides the CyberLife Tower vs Last Mission chart, and machine-Connor encounters in Markus's chart | PowerPyx Connor page; wiki Connor page |
| Night of the Soul: Markus shoots deviant Connor ("Don't Trust") | Last Mission opens with `IN THE ZEN GARDEN` / `TALK TO AMANDA` | wiki flowchart "(If Connor became a deviant in Crossroads and then was killed by Markus by choosing "Don't Trust" in Night of the Soul)"; PowerPyx readers |
| Night of the Soul: demonstration vs revolution | Markus's chart. Also, in Kara's chapter: the terminal TV (#46/#47), the Civil War magazine, the border bulletin (#74/#75), the no-sacrifice outcome (#94/#95), Rose's and Adam's lines, and the camp liberation. | wiki; transcript "Markus is demonstrating peacefully / leading a violent revolution" |
| Markus dead before this chapter (Freedom March, raid, Night of the Soul) | `NORTH IN HART PLAZA` ([cond] `NORTH BECAME LEADER IN A PREVIOUS SCENE`); the President's question variant; Connor may become leader | chart tab; transcript |
| Crossroads: Markus took the detonator | `OBSERVE DETONATOR` (demonstration) and `DETONATE BOMB` (store); [cond] `TOOK DETONATOR IN 'CROSSROADS'` | chart tabs |
| Last Chance, Connor: Hank hostile and resigns → Night of the Soul: Hank's suicide | `CAPTAIN ALLEN INTERVENES` and `A NEW CONNOR ARRIVES` ([cond] `HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'`); otherwise Hank on the roof or as hostage | chart tabs; transcript "Hank wasn't hostile in Last Chance, Connor and didn't resign" |
| Hank relationship FRIEND | Rooftop `LEAVE`/`GIVE UP` ("Be friend with Hank"); the credits reunion | transcript lock; wiki |
| Russian Roulette: Cole's photo seen | `COLE` highlighted at the tower. Wiki: the rooftop `TALK ABOUT HANK'S SON` also needs it. | wiki Notes; transcript lock "Will be highlighted if Connor looked at the photo in Russian Roulette" |
| Connor died many times | Hank's extra rooftop line ("Everytime you died and came back…"); trophy `I'LL BE BACK` | transcript; Trophies page |
| The Hostage: Connor died or not | Allen's greeting variant | transcript |
| Meet Kamski | Kamski's "I always leave an emergency exit in my programs" sets up the Zen Garden escape | wiki Connor/Kamski pages |
| Waiting for Hank / Last Chance, Connor: Zen Garden stone seen (`FIND MAGIC STONE` / `LOOK AT MAGIC STONE`) | The objective reads `FIND GARDEN STONE ?` rather than `FIND AN EMERGENCY EXIT ?` | HUD `1103M.STONE` / `STONENOSEEN` |
| Last Chance, Connor: Connor deactivated (Jericho not found) | No Connor in Markus's store or in the North path | PowerPyx: "Connor was decommissioned (insufficient evidence / didn't find location of Jericho in time)" |
| Jericho attacked or not (Connor located it) | Luther present at Kara's start; the broadcast node #3; the Jericho Assault press question | transcript; PowerPyx |
| Crossroads: Kara captured in the raid vs escaped | Kara Captured vs Leaving | PowerPyx |
| Crossroads: Luther saved / Midnight Train: Luther died | `FIND LUTHER & JERRY` vs `FIND JERRYS`; every Luther option; the two-name ending variants | chart tab `LUTHER SAVED IN 'CROSSROADS'`; Kara Captured tab `SAVED IN PREVIOUS SCENES` |
| Midnight Train: Luther killed the cop | Adam's hostile line at the river/border ("You took a man's life.") | transcript template `talkWithAdam` |
| Stormy Night: Todd alive | `MEET TODD` | transcript lock |
| A New Home: Alice's box opened | `YOUR STORY`, the only way to persuade Todd | transcript lock |
| Fugitives: met Ralph (squat) | `TALK TO RALPH`, Ralph's diversion, `RALPH INTERVENES` | chart tab `MET IN 'FUGITIVES'`; wiki "Kara stayed in the Squat" |
| Zlatko: freed the scarred androids | `TALK TO SCARRED ANDROID`, the casualty-free diversion | chart tab `FREED IN 'ZLATKO'` |
| North relationship (Lover / Companion / Friend) | `KISS NORTH` (both charts); North takes a bullet; Perkins' offer to spare her; North's heart; the store with North | transcript locks; wiki/PowerPyx (thresholds conflict; see §8) |
| Simon/Josh/North alive | `NORTH/JOSH/SIMON JOINS HIM`; who speaks; Josh and Simon events; heart offers | chart; transcript |
| Public opinion (accumulated) | The President's question variant; the peaceful last stand | transcript; wiki |
| Crossroads/Night of the Soul: Kara abandoned Alice | YK500 advertisement credits scene | wiki Kara page |

### Dependencies between storylines inside the chapter

The chapter interleaves the three storylines by clock time. Connor at the tower or rooftop comes at PM 10:48, Kara at 10:51, Markus at 10:56. The tower's Floor -49 and the Revolution charge come at 11:01; Kara reaches the terminal or the lines at 11:02 to 11:08; the barricade at 11:08; the border at 11:30; the speech at 11:42 to 12:01.

- **Markus revolution success** decides `MARKUS LIBERATES ANDROIDS`, `ALICE/KARA FREED BY MARKUS` and `TALK TO ANDROID BEHIND KARA` in Kara Captured. A reader: "North leading the revolution will NOT unlock this option".
- **Markus's approach** decides Kara's no-sacrifice crossing at the border.
- **Machine vs deviant Connor** decides `CONNOR FINDS MARKUS` vs `SOLDIERS APPROACH MARKUS`, `CONNOR ARRIVES` vs `SOLDIERS SURROUND STORE` in the store, `NORTH TAKES SHELTER IN STORE` vs `NORTH WAS SHOT BY SOLDIERS`, and the crowd assassination after a peaceful win.
- **Connor freed the CyberLife androids** changes:
  - Warren's address after a successful demonstration ("thousands of androids invaded the city… I have ordered the army to retreat")
  - the dirty-bomb broadcast ("liberated over one million androids")
  - the wiki's public-opinion large up "Connor not waking up the CyberLife Tower androids"
  - Connor joining Markus on stage
- **Markus and Jericho dead** while Connor woke the army: Connor becomes the leader.

### Outputs

The game ends after this chapter. What it sets:
- the credits scenes (§5)
- the trophies:
  - `SURVIVORS`
  - `HAPPY FAMILY`
  - `PARTNERS`
  - `SAFE HARBOR`
  - `LIBERATION`
  - `MORAL VICTORY`
  - `ESCAPE DEATH`
  - `MY TURN TO DECIDE`
  - `AN ARMY OF ME`
  - `MISSION COMPLETE`
  - `JUST A MACHINE`
  - `UNDEFEATED`
  - `I'LL BE BACK`
  - `THIS IS MY STORY`
- the main-menu Chloe state on later sessions.

---

## 5. Endings

There are 61 chapter endings, exactly as printed. Conditions summarise §2.

### Kara Leaving Detroit (12)

| Ending | Icon | Conditions |
|---|---|---|
| `SOLDIERS EXECUTED KARA, ALICE & LUTHER` | [⊘] | Terminal security check: `FLEE` or `HAND OVER ID` with Luther present |
| `SOLDIERS EXECUTED KARA & ALICE` | [⊘] | The same without Luther, or Todd not persuaded without Luther |
| `EVERYONE WAS ARRESTED AND KILLED` | [⊘] | Border `SACRIFICE NO ONE` while Markus leads a revolution |
| `THE GROUP CROSSED THE BORDER` | none | `SACRIFICE NO ONE` (demonstration) or `SACRIFICE JERRY`, Luther alive |
| `KARA & ALICE CROSSED THE BORDER` | none | The same with Luther dead, or `SACRIFICE LUTHER` |
| `ALICE GOT TO CANADA WITH LUTHER` | [skull] | `SACRIFICE KARA`, Luther alive |
| `ALICE GOT TO CANADA WITH ROSE` | [skull] | `SACRIFICE KARA`, Luther dead |
| `THE GROUP DIED` | [⊘] | Coastguard `SURRENDER` or timeout |
| `KARA & ALICE SURVIVED` | none | River with no injuries (`DIVE`, or `HIDE BEHIND LUTHER`) and the boat lightened in time |
| `KARA DIED AND ALICE SURVIVED` | [skull] | Kara injured (`PROTECT ALICE`) |
| `ALICE DIED AND KARA CONTINUED ALONE` | [⊘] | Alice injured (`HIDE`/`ACCELERATE`), then `CONTINUE LIVING` |
| `KARA & ALICE DIED` | [⊘] | Alice injured, then `KARA CHOOSES DEATH`; or the boat sank (`REACH CANADA BY SWIMMING`) |

### Kara Captured (15)

| Ending | Icon | Conditions |
|---|---|---|
| `KARA LEAVES CAMP WITHOUT ALICE` | [⊘] | `VOLUNTEER` → `CLIMB TRUCK` → `LEAVE`. Then Alice dies in the machine, or is freed by Markus (revolution success). |
| `KARA IS KILLED BY THE DRONE` | [skull] | Shot by the enclosure drone a second time. Then Alice dies alone, or is freed by Markus. |
| `KARA IS DEAD` | [⊘] | `DO NOT INTERVENE` when Alice panics → Alice shot; Markus does not free the camp. Printed this way although Alice is the one shot first. |
| `KARA FREED BY MARKUS` | [⊘] | The same, with the revolution successful |
| `KARA DIED IN THE LINES` | [skull] | Shot twice in the lines (`GET KILLED`) or `INTERVENE` for Alice. Then Alice is freed by Markus or dies in the machine. |
| `ALICE & KARA DIED IN RECYCLING MACHINE` | [⊘] | Reached the machine with no liberation |
| `KARA & ALICE SURVIVED` | none | Reached the machine as Markus's revolution succeeds (`MARKUS LIBERATES ANDROIDS`) |
| `KARA & ALICE WERE KILLED` (twice) | [⊘] | Too slow at the wire, or fled the soldier, or lost the fight with no rescuer; Luther dead or used |
| `KARA, LUTHER AND ALICE WERE KILLED` (twice) | [⊘] | The same with Luther present |
| `ALICE ESCAPED ON TRUCK` | [skull] | Kara previously shot (`KARA IS TOO DAMAGED TO PROCEED`), Luther dead |
| `ALICE & LUTHER ESCAPED BY TRUCKS` | [skull] | The same, Luther alive |
| `KARA & ALICE ESCAPED ON TRUCK` | none | Won the fight with Luther dead; or lost it and Ralph or Luther intervened |
| `KARA, LUTHER AND ALICE ESCAPED ON TRUCK` | none | Won the fight with Luther alive and not used as the diversion |

### Connor's Last Mission (3)

| Ending | Icon | Conditions |
|---|---|---|
| `CYBERLIFE DECIDED TO SEND ANOTHER CONNOR` | [skull] | Hank kills Connor, Connor falls from the roof (failed dodge after `SAVE HANK`), or `FLEE` from Allen. A replacement continues. |
| `CYBERLIFE DECIDED TO SEND ANOTHER CONNOR` | [skull] | Allen destroys Connor (lost fight) |
| `CONNOR LEFT ROOFTOP` | none | `GIVE UP` (Hank FRIEND, insisted on the son), or after `MISSED OPPORTUNITY` (Hank killed, Hank fell, Allen's team killed) |

### Connor at the CyberLife Tower (8)

| Ending | Icon | Conditions |
|---|---|---|
| `CONNOR WAS AMBUSHED AND SHOT` | [skull] | Elevator reached Floor 31 |
| `CONNOR WAS SHOT BY SECURITY` | [skull] | Lost the elevator fight |
| `CONNOR WAS SHOT BY SECURITY` | [skull] | Lost the Floor -49 fight (camera not hacked) |
| `THE ANDROIDS WOKE UP` (padlock) | lock | `SWAP CONSCIOUSNESS` after being shot by Connor-60 |
| `THE ANDROIDS WOKE UP` (padlock) | lock | `COLE` → Hank kills Connor-60 → `RESUME CONVERSION`, or Connor wins the fight outright. Hank alive: the best Connor outcome. |
| `THE ANDROIDS WOKE UP` | [skull] | Connor dies after Hank was sacrificed and the conversion finished (`TALK`/`STAND`/`DRAW GUN`) |
| `THE ANDROIDS REMAINED DORMANT` | [skull] | Connor dies before converting (Hank dead, or sacrificed but not finished) |
| `THE ANDROIDS REMAINED DORMANT` | [skull] | `OUT OF TIME` when saving Hank, or a wrong son's name (`HANK KILLS CONNOR`) |

### Markus Demonstration (5)

| Ending | Icon | Conditions |
|---|---|---|
| `MARKUS DIED AFTER BETRAYING HIS PEOPLE` | [skull] | `ACCEPT DEAL` |
| `MARKUS DIED PROTECTING HIS PEOPLE` | [skull] | Failed the barricade quick-time event and North could not take the bullet |
| `ANDROIDS WON FREEDOM - FOR THE MOMENT` | none | `SING`, or `KISS NORTH` (Lover), with public opinion at least Sympathetic |
| `MARKUS DIED WITH HIS PEOPLE` | [skull] | `SING`/`KISS` with lower opinion, `SACRIFICE`, or `DO NOTHING` |
| `ANDROIDS BECAME FREE IN THE DEBRIS OF DETROIT` | none | `OBSERVE DETONATOR` → `PRESS` |

### Markus Revolution (18)

| Ending | Icon | Conditions |
|---|---|---|
| `MARKUS DIED AND THE REVOLUTION FAILED` | [skull] | Badly wounded and refused North's heart, or nobody to save him |
| `CONNOR STOPPED THE REVOLUTION` | [skull] | Machine Connor wins the battlefield fight (player chose `CONTROL CONNOR` and won) |
| `ASSAULT WAS SUCCESSFUL` | none | `SHOOT TANKS` after beating Connor or the soldiers |
| `MARKUS DIED AND THE REVOLUTION FAILED` | [skull] | Lost the fight as Markus, or failed against the soldiers |
| `CONNOR EXECUTED MARKUS` | [skull] | Store, machine Connor `SHOOT` (and, per the wiki, `SPARE` without detonating when the detonator was taken) |
| `MARKUS DIED AS DETROIT BURNS` | [skull] | Store, Connor present, Markus detonates |
| `CONNOR SPARED MARKUS` | none | Store, `SPARE` (Amanda drops to Betrayed) |
| `MARKUS AND CONNOR KILLED EACH OTHER` | [skull] | Store, the Connor choice times out |
| `MARKUS DIED LEAVING STORE` | [skull] | Alone, no Connor, `SURRENDER` |
| `MARKUS COMMITTED SUICIDE` | [skull] | Alone, `SUICIDE` |
| `MARKUS WATCHED DETROIT BURN` | none | Alone, `DETONATE BOMB` |
| `MARKUS AND NORTH WATCHED DETROIT BURN` | none | With North, `DETONATE BOMB` |
| `MARKUS AND NORTH DIED LEAVING THE STORE` | [skull] | With North, `SURRENDER` |
| `MARKUS AND NORTH COMMITTED SUICIDE` | [skull] | With North, `SUICIDE` |
| `NORTH WAS SHOT BY SOLDIERS` | [skull] | North leads; Connor deviant or deactivated |
| `NORTH WAS SHOT BY CONNOR` | [skull] | North leads; machine Connor `SHOOT` |
| `CONNOR SPARED NORTH` | none | North leads; `SPARE` |
| `NORTH AND CONNOR KILLED EACH OTHER` | [skull] | North leads; timeout |

### After the chapter endings

These are from the transcripts and wiki character pages. None is a chart node.

**Speeches and broadcasts:**
- Markus's speech (PM 11:42 / AM 12:01): the peaceful version or the revolution version.
- Warren's address, in these variants:
  - Successful demonstration with Connor's army: "I have ordered the army to retreat… Perhaps the time has come for us to consider the possibility that androids are a new form of intelligent life."
  - Markus died after `SACRIFICE`, `KISS` or `SING`: "I have called for the android destruction to be suspended until further notice. I have also ordered a Senate Select Committee…" The cause still wins posthumously. The wiki Public Opinion page adds: "The public's opinion will always side with the androids at the end of Markus's Demonstration so long as the bomb is not detonated and Connor does not bring in the army."
  - Markus died any other way: "The total destruction of all androids will soon be complete".
  - Dirty bomb: "The city may remain uninhabitable for decades… Markus: We!.. Are!.. Free!"

**Credits scenes:**
- Hank waits at the Chicken Feed and hugs Connor: "If Connor and Hank are both alive; their relationship status is FRIEND and there has been a successful android uprising".
- Machine Connor is replaced by the RK900 after a thwarted uprising: "Amanda introduces him to the upgraded RK900 Connor model and tells him he will be deactivated".
- Machine-Connor success in a spring Zen Garden.
- Kara sees a YK500 advertisement: Kara abandoned Alice "and Markus was successful".
- Zlatko's servant Kara (from the Zlatko chapter).
- The "Kamski ending" Hank suicide (Connor deactivated, Kara dead or a servant, Markus dead or banned).
- Kara Captured escapees at the landfill (AM 07:37).

**Chloe.** After the credits on the first completion: `YES` (she leaves) / `NO` (she resets).

### What the best outcomes require

**Kara, `THE GROUP CROSSED THE BORDER` with Luther (trophy `HAPPY FAMILY`, also `SAFE HARBOR`):**
- Luther alive and saved in Crossroads (or present all along).
- Save Luther and Jerry; reach the terminal on time.
- `STEAL TICKETS`; `SACRIFICE NO ONE` while Markus demonstrates. `SACRIFICE JERRY` also gives this ending with an Alice dip.

**Kara, captured alternatives:**
- `KARA, LUTHER AND ALICE ESCAPED ON TRUCK`: use the scarred android for both diversions, avoid any shot, win the fight.
- `KARA & ALICE SURVIVED`: wait for a successful revolution.

**Markus, peaceful:**
- Refuse Perkins (either step).
- Win the barricade quick-time event, or have North as Lover take the bullet.
- `SING` or `KISS NORTH` with public opinion at least Sympathetic.
- Raise opinion along the way with PEACEFUL/FIRM, CALM, slogans and the flag (and the large up when the army fires).
- Trophy `MORAL VICTORY`.

**Markus, revolution (trophy `LIBERATION`):**
- Avoid three hits, or have a heart donor.
- Win the machine-gun push.
- Beat machine Connor as Markus, or neutralise the soldiers.
- Keeping Simon alive (save him) and North alive (shoot the drone) costs nothing extra.

**Connor, deviant:**
- Hack the camera, copy the guard's voice, reach Floor -49.
- `STOP CONVERSION TO SAVE HANK` → fight → `SUMO` and `COLE` (or win the fight).
- `THE ANDROIDS WOKE UP` with Hank alive (trophies `AN ARMY OF ME`, `PARTNERS` if FRIEND).
- Escape the Zen Garden (`MY TURN TO DECIDE`); the Hank hug in the credits.

**Connor, machine:** with Hank FRIEND, insist on the son and `LEAVE` (`CONNOR LEFT ROOFTOP`). The machine "success" endings (`CONNOR STOPPED THE REVOLUTION`, the crowd shot) kill Markus.

**`SURVIVORS` needs everyone alive at the end.** Per the PowerPyx trophy guide title, "everyone survives".
