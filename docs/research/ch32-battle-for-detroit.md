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
