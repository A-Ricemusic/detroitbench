# Chapter 29: Last Chance, Connor (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06.

Sources:
- The PowerPyx flowchart screenshots and walkthrough text, including 76 reader comments.
- The Fandom wiki chapter page (wikitext via the MediaWiki API) and the wiki's stat, character, trophy and later-chapter pages.
- The fan transcript at detroitbecometext.github.io (chapter 29). Its text is the compiled template `GL` in `chunk-JCLJBPDO.js` with `i18n/en.json`. The ch20 agent had already decoded it to `/tmp/flowcharts/ch20/x_GL.txt`. I copied that decode and checked it against the same bundle (`main-327FRIQW.js` → `chunk-VAZYHRR7.js` → `chunk-JCLJBPDO.js`, unchanged).
- The game's string table for this chapter. The game's internal ID is `12C`, so the keys are `MENU.FLOWCHART.12C.*`, `X1201C.*` to `X1204C.*` and `THOUGHTS.1201C.*` (the HUD).
- The Google Doc walkthrough linked from the wiki's Flowchart section, for the `HANK WON'T HELP` node.

Working files are in `/tmp/flowcharts/ch29/` (not committed): `wiki.txt`, `pp.txt`, `transcript.txt`, `strings12C.txt`, `hud12C.txt`, `wikipages/`, `ext/gdoc.txt`, `dbt/`, `crops/`. These wiki pages do not exist (`missingtitle`): `Last_Chance,_Connor/Flowchart`, `Last_Chance,_Connor_(Transcript)` and `Jericho_Tablet`. The chapter page is marked `{{Stub}}` and links to the fan transcript.

Setting:
- Game date and time (wiki infobox; game strings `GUI.MENU.DATE.12C`/`TIME.12C`): November 9, 2038, 04:13 PM ("NOV 9TH, 2038", "PM 04:13").
- Location: the Zen Garden (frozen), then the DPD Central Station.
- Infobox objectives: "Talk to Amanda", "Talk to Hank", "Go to archive room", "Locate Jericho".
- The wiki says: "This chapter has six different outcomes." (`|endings=6`).
- PowerPyx: "Triggers automatically after completing the Freedom March Chapter."

Summary:
- **Chart size:** 81 chart nodes, 1 bracketed phase label (`FIND JERICHO LOCATION`) and 9 yellow cross-chapter condition tabs.
  - The chart has 4 checkpoints: `START`, `IN THE POLICE STATION`, `CREATE A DIVERSION` and `IN THE EVIDENCE ROOM`.
  - It has 2 cross-chapter impact tabs (lock): `HANK RESIGNS AND LEAVES` and `LOCATE JERICHO`.
- **Endings (6 cards, 5 distinct labels):**
  - `CONNOR LEFT FOR JERICHO` (no icon)
  - `CONNOR SERIES WAS DECOMMISSIONED` (skull), upstairs
  - `CONNOR SERIES WAS DECOMMISSIONED` (skull), evidence room
  - `CONNOR ELUDED PERKINS` (no icon)
  - `GAVIN DESTROYED CONNOR` (skull)
  - `CONNOR INCAPACITATED GAVIN` (no icon)
- **Choice markers on the chart:** six groups.
  - Only one is a player dialogue choice: `IGNORE GAVIN` / `DISMISS GAVIN` / `ANSWER CALMLY`.
  - Two are performance outcomes: `LINK MAP TO OTHER EVIDENCE` / `UNABLE TO LINK MAP TO OTHER EVIDENCE`, and the Gavin QTE `LOSE FIGHT` (cross) / `WIN FIGHT` (check).
  - Three are selected by state, not by the player: `KNOW JERICHO'S LOCATION` / `JERICHO'S LOCATION UNKNOWN` (the Kamski key), `INSUFFICIENT EVIDENCE` / `SUFFICIENT EVIDENCE`, and `HANK WANTS TO HELP` / `HANK IS GONE` / `HANK WON'T HELP` (Hank's relationship).
- **Choices off the chart:**
  - Amanda: up to 4 dialogue rounds.
  - Hank at his desk: up to 4 rounds, with two different scripts for the two branches.
  - Gavin: `ANSWER` → `IRONIC` / `LOW PROFILE` / `CALM`, or `LEAVE`.
  - The password guess: 4 options.
  - Evidence-room dialogue: Traci 1 round; Simon or the Stratford android 2 rounds; Daniel 1 round.
  - The free-roam decision to act or let the timer run out. There are two `OUT OF TIME` nodes, and each is a death ending.
- **Numbers found:**
  - No probability anywhere: wiki, PowerPyx and the string table are silent. The Gavin fight is a QTE with no published odds.
  - Timers: PowerPyx says "stand around for 6 minutes to let the timer run out" upstairs, and Connor asks Hank for "Five minutes. It's all I ask." No source gives the evidence-room limit.
  - Relationship and instability icons per option come from the transcript, with the wiki tables compared below. There are no public-opinion changes and no media.

---

## 1. Flowchart transcription

Read from these PowerPyx images:
- `detroit-become-human-last-chance-connor-flowchart.jpg`: the whole chart, `100% COMPLETED`; the labels are not legible at that size.
- Zooms `-1` (start), `-2` (station), `-3` (Hank and Perkins), `-4` (Gavin), `-5` (evidence-room checkpoint), `-find-jericho-location` (evidence bracket, all grey), `-8` (evidence bracket and lower timeout, partly blue) and `-7` (Gavin endings).

The zooms are headed `98% COMPLETED`. PowerPyx says the missing node was `UNABLE TO LINK MAP TO OTHER EVIDENCE` until patch 1.05; it was later added from a reader's run. Crops are in `crops/`. Every label matches the game's flowchart string table (`MENU.FLOWCHART.12C.*`) one for one.

Icon key (as drawn, same conventions as the ch24 note):
- [arrow]: action
- [triangle]: event the game triggers
- [talk]: speech-bubble dialogue node
- [choice]: overlapping-squares choice or outcome marker
- [branch]: small free-standing glyph for optional side nodes
- [lock]: yellow tab with an open padlock (cross-chapter impact)
- [skull]: yellow tab with a skull
- [cond]: a yellow tab carrying an earlier-chapter condition. It is filled yellow when met on the photographed save, and grey with a yellow icon when not.

Fill on the photographed saves:
- `-1`: `START` and `TALK TO AMANDA` are blue.
- `-2`: blue runs `IN THE POLICE STATION` → `FOWLER AND HANK ARGUE` → `KNOW JERICHO'S LOCATION`, then a blue line straight to `CONNOR LEFT FOR JERICHO`. `TALK TO HANK` is grey, so on that save Connor left without talking to Hank.
- `-8` (a different save): the met tabs are `FOUND IN 'THE NEST'`, `FOUND IN 'PARTNERS'` and the second `KILLED IN 'PUBLIC ENEMY'` (Stratford android). The blue nodes are:
  - `DANIEL'S BODY`, `RUPERT'S DIARY`, `CARLOS' ANDROID'S STATUE`, `BREAK STATUE`, `RETRIEVE MAP`, `UNABLE TO LINK MAP TO OTHER EVIDENCE`
  - `MARKUS' BROADCAST`, `STRATFORD ANDROID'S BODY`
  - the lower `OUT OF TIME` and `CONNOR SERIES WAS DECOMMISSIONED`
- `-find-jericho-location`: every tab and node is grey (a save that never entered the room).

### Start (Zen Garden)

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `START` | checkpoint (large card, frozen Zen Garden) | chapter start |
| 2 | `LOOK AT MAGIC STONE` | [arrow], from a [branch] glyph | optional, above the main line |
| 3 | `TALK TO AMANDA` | [talk] | #1 |
| 4 | `VISIT GRAVES` | [arrow], from a [branch] glyph | optional, below the main line |
| 5 | `IN THE POLICE STATION` | checkpoint (large card: Fowler, Connor, Hank) | #3 |

### In the police station

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 6 | `FOWLER AND HANK ARGUE` | [triangle] | #5 |
| 7 | `KNOW JERICHO'S LOCATION` | [choice] row 1 | #6 |
| 8 | `JERICHO'S LOCATION UNKNOWN` | [choice] row 2 | #6 |
| 9 | `TALK TO HANK` | [talk] | #7. Optional: a second line runs from #7 straight to #10 |
| 10 | `CONNOR LEFT FOR JERICHO` | ending (large card, Connor in the station, no icon) | #9 or #7 |
| 11 | `INSUFFICIENT EVIDENCE` | [choice] row 1 | #8. A line runs from this group up to #18 |
| 12 | `SUFFICIENT EVIDENCE` | [choice] row 2 | #8 |
| 13 | `HANK RESIGNS AND LEAVES` | [lock] | #12 |
| 14 | `HANK GOES TO HIS DESK` | [triangle] | #12 |
| 15 | `TALK TO HANK` | [talk] | #14 |
| 16 | `PERKINS ARRIVES` | [triangle] | #13 and #15 (two lines join) |
| 17 | `OUT OF TIME` | [triangle] | #16 |
| 18 | `CONNOR SERIES WAS DECOMMISSIONED` | ending (large card, Connor outdoors), [skull] | #17 and #11 |
| 19 | `HANK WANTS TO HELP` | [choice] row 1 | #16 |
| 20 | `HANK IS GONE` | [choice] row 2 | #16 |
| 21 | `HANK WON'T HELP` | [choice] row 3 | #16 |
| 22 | `HANK PUNCHES PERKINS` | [triangle] | #19 |
| 23 | `FREE THE PRISONER` | [arrow] | #20 and #21 |
| 24 | `HANK LEAVES` | [triangle] | #21. No outgoing line |

### Create a diversion

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 25 | `CREATE A DIVERSION` | checkpoint (large card, Connor at the archive door) | #22 and #23 |
| 26 | `TAKE KEY` | [arrow] | #25 |
| 27 | `RUSH TO BASEMENT` | [arrow] | #26 |
| 28 | `GAVIN YELLS` | [triangle] | #27 |
| 29 | `IGNORE GAVIN` | [choice] option 1 | #28 |
| 30 | `DISMISS GAVIN` | [choice] option 2 | #28 |
| 31 | `ANSWER CALMLY` | [choice] option 3 | #28 |
| 32 | `GAVIN IS SUSPICIOUS` | [triangle] | #29 and #30 |
| 33 | `GAVIN IS CONVINCED` | [triangle] | #31 |
| 34 | `GO DOWN TO BASEMENT` | [arrow] | #32 and #33 |

### In the evidence room

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 35 | `IN THE EVIDENCE ROOM` | checkpoint (large card, DPD seal) | #34 |
| 36 | `GUESS HANK'S PASSWORD` | [arrow] | #35 |
| 37 | `UNLOCK EVIDENCE` | [arrow] | #36 |
| - | `FIND JERICHO LOCATION` | bracketed phase label | encloses #38 to #70; entered from #37 |

Evidence items, top to bottom inside the bracket. Each has an [arrow] icon and an entry line from the bracket's spine:

| # | Node | Gate tab ([cond]) | Leads to |
|---|---|---|---|
| 38 | `BODY OF CARLOS' ANDROID` | `DIED IN PREVIOUS SCENES` | nothing (no outgoing line) |
| 39 | `JERICHO TABLET` | `GOT INFORMATION IN 'PUBLIC ENEMY'` | nothing (no outgoing line) |
| 40 | `CARLOS' ANDROID'S MEMORY` | `USED FRIENDLY APPROACH IN 'THE INTERROGATION'` | nothing (no outgoing line) |
| 41 | `DANIEL'S BODY` | none | #50 |
| 42 | `RUPERT'S BODY` | `COMMITTED SUICIDE IN 'THE NEST'` | #53 |
| 43 | `RUPERT'S DIARY` | `FOUND IN 'THE NEST'` | #55 |
| 44 | `CARLOS' ANDROID'S STATUE` | `FOUND IN 'PARTNERS'` | #56 |
| 45 | `BODY OF BLUE-HAIRED TRACI` | `KILLED IN 'EDEN CLUB'` (one tab feeds #45 and #46) | #60 |
| 46 | `BODY OF BROWN-HAIRED TRACI` | same tab | #62 |
| 47 | `MARKUS' BROADCAST` | none | #65 |
| 48 | `SIMON'S BODY` | `KILLED IN 'PUBLIC ENEMY'` | #66 |
| 49 | `STRATFORD ANDROID'S BODY` | `KILLED IN 'PUBLIC ENEMY'` (separate tab) | #69 |

Chains:

| # | Node | Icon | Follows |
|---|---|---|---|
| 50 | `REACTIVATE DANIEL` | [arrow] | #41 |
| 51 | `TALK TO DANIEL` | [arrow] | #50 |
| 52 | `NO INFORMATION` | [triangle] | #51. Dead end |
| 53 | `REACTIVATE RUPERT` | [arrow] | #42 |
| 54 | `GET DECRYPTION KEY` | [arrow] | #53 |
| 55 | `ANALYZE DIARY` | [arrow] | #54 and #43 (two lines join) → #71 |
| 56 | `BREAK STATUE` | [arrow] | #44 |
| 57 | `RETRIEVE MAP` | [arrow] | #56 |
| 58 | `LINK MAP TO OTHER EVIDENCE` | [choice] row 1 | #57 → #71 |
| 59 | `UNABLE TO LINK MAP TO OTHER EVIDENCE` | [choice] row 2 | #57. No outgoing line |
| 60 | `REACTIVATE BLUE-HAIRED TRACI` | [arrow] | #45 |
| 61 | `TALK TO TRACI` | [arrow] | #60 |
| 62 | `REMOVE ACCOMPLICE'S HEAD` | [arrow] | #61 and #46 (two lines join) |
| 63 | `TRICK TRACI` | [arrow] | #62 |
| 64 | `DOWNLOAD JERICHO KEY` | [arrow] | #63 and #70 (two lines join) → #71 |
| 65 | `IMPERSONATE MARKUS` | [arrow] | #47 |
| 66 | `REACTIVATE SIMON` | [arrow] | #48 |
| 67 | `INTERROGATE SIMON` | [arrow] | #66 |
| 68 | `INTERROGATE DEVIANT` | [arrow] | #69 |
| 69 | `REACTIVATE DEVIANT` | [arrow] | #49 |
| 70 | `TRICK THE DEVIANT` | [arrow] | #65, #67 and #68 (lines join) |

Leaving the bracket:

| # | Node | Icon | Follows |
|---|---|---|---|
| 71 | `LOCATE JERICHO` | [lock] | #55, #58 and #64 |
| 72 | `OUT OF TIME` | [triangle] | the bracket's spine (below the bracket) |
| 73 | `CONNOR SERIES WAS DECOMMISSIONED` | ending (large card, Connor outdoors), [skull] | #72 |
| 74 | `LEAVE THE BASEMENT` | [arrow] | #71 |
| 75 | `CONNOR ELUDED PERKINS` | ending (large card, Perkins and an officer in the archive, no icon) | #74 |
| 76 | `GAVIN RETURNS` | [triangle] | #71 |
| 77 | `FIGHT GAVIN` | [arrow] | #76 |
| 78 | `LOSE FIGHT` | [choice] row 1, cross mark | #77 |
| 79 | `WIN FIGHT` | [choice] row 2, check mark | #77 |
| 80 | `GAVIN DESTROYED CONNOR` | ending (large card, Gavin aiming), [skull] | #78 |
| 81 | `CONNOR INCAPACITATED GAVIN` | ending (large card, Gavin on the floor, no icon) | #79 |

Total: 81 nodes, excluding the bracket label and the nine condition tabs.

Condition-tab strings (`MENU.FLOWCHART.12C.GC.*`):
- `CARLOSANDROID`: `DIED IN PREVIOUS SCENES`
- `JERICHO`: `GOT INFORMATION IN 'PUBLIC ENEMY'`
- `CARLOSANDROIDMEMORY`: `USED FRIENDLY APPROACH IN 'THE INTERROGATION'`
- `RUPERT`: `COMMITTED SUICIDE IN 'THE NEST'`
- `RUPERTDIARY`: `FOUND IN 'THE NEST'`
- `CARLOSANDROIDSTATUE`: `FOUND IN 'PARTNERS'`
- `TRACIS`: `KILLED IN 'EDEN CLUB'`
- `SIMON`: `KILLED IN 'PUBLIC ENEMY'`
- `STARTFORDANDROID` (sic): `KILLED IN 'PUBLIC ENEMY'`

Strings in the table that are not drawn on the chart, probably cut or merged:
- `TRICK SIMON` (`TRICKSIMON`). The chart routes Simon through `TRICK THE DEVIANT`.
- A second `PERKINS ARRIVES` (`PERKINSARRIVEAFTERSANDBOXTIMEREND`). The chart goes straight from the lower `OUT OF TIME` to the ending.
- `CONNOR DIES` (`CONNORDIES`)
- `LEARNT JERICHO LOCATION` (`LOCATION`)

The wiki's text flowchart matches the chart. Its differences:
- It truncates `UNABLE TO LINK MAP TO OTHER EVIDENCE` to "Unable to Link Map to Other Evi".
- It hangs Out of Time under `PERKINS ARRIVES`.
- It nests `HANK WON'T HELP` → `HANK LEAVES` and `FREE THE PRISONER`.
- It writes "Find Jericho's Location" for the bracket label.

PowerPyx lists both decommission cards as separate nodes: "#1" upstairs and "#2" in the evidence room.

---

## 2. Choices and gates

### 2a. Zen Garden (nodes 1 to 4; up to four off-chart dialogue rounds)

The garden is frozen. Wiki Notes: Connor's coin is missing from his idle animation here.
- `LOOK AT MAGIC STONE`: the glowing stone to the left of the start (PowerPyx). Nothing is attached.
- `VISIT GRAVES`: "only available if Connor has died at least once prior to this point in the game" (wiki). The HUD grave strings (`THOUGHTS.GRAVE.01`–`09`) list every possible death site, including "DIED AT DPD STATION DETROIT NOVEMBER 9TH 2038", which is this chapter's Gavin death.

Amanda opens: "After what happened today, the country is on the verge of a civil war. The machines are rising up against their masters. Humans have no choice but to destroy them." (`X12CAMANDA.INTRO`)

**Round 1** (transcript):

| Option | Requires | Line | Icons (transcript) | Wiki |
|---|---|---|---|---|
| `JERICHO` (swaps with `KAMSKI`) | lock: "Killed Chloe and asked about Jericho in Meet Kamski" | "Kamski told me how to find Jericho. I know where the deviants are hiding." Amanda: "You've done very well, Connor. Thanks to you, we now have a chance to stop the deviant revolution." | Amanda large up | "Getting the key from Kamski to Jericho" Amanda large up, drawn twice (`{{Icon\|largeup}}{{Icon\|Largeup}}`) |
| `KAMSKI` (variant 1) | "Connor didn't shoot Chloe" | "I thought Kamski knew something… I was wrong…" Amanda: "Maybe he did… But you chose not to ask…" | Amanda small down | "Picking 'Kamski' and spared Chloe" down |
| `KAMSKI` (variant 2) | "Connor shot Chloe … and didn't ask about Jericho" | "I didn't learn anything at Kamski's…" plus an rA9 or VIRUS sub-line, depending on what Connor asked | none | none |

**Round 2**, only after `KAMSKI` variant 1 (spared Chloe):

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `EMOTIONAL` | "I chose not to play his twisted little game! There was no reason to kill that android." | SI small up, Amanda large down | same |
| `COLD` | "Kamski was just playing with me. He didn't know anything." | Amanda small up, SI small down | same |
| `STAY SILENT` | (no line) | none | none |

**Round 3**, questions. The transcript lists six topics, then Amanda: "I expect you to find answers, Connor. Not ask questions." The Google Doc walkthrough asks three (`KAMSKI`, `CONNOR SERIES`, `AMANDA'S PICTURE`).

| Option | Requires | Line | Icons (transcript) | Wiki |
|---|---|---|---|---|
| `KAMSKI` | none | "Why did Kamski leave CyberLife?" Amanda: "It's an old story, Connor…" | none | none |
| `CONNOR SERIES` | none | "I'm not a unique model, am I? How many Connors are there?" | SI small up, Amanda small down | same |
| `AMANDA'S PICTURE` | lock: "Looked at Amanda's picture in Meet Kamski" | "I saw a photo of Amanda at Kamski's place… She was his teacher…" Amanda: "…he chose his former mentor. What are you getting at?" | none | Amanda down |
| `THIS PLACE` | none | "Did Kamski design this place?" Amanda: "He created the first version…" | none | none |
| `CYBERLIFE` | none | "Where does CyberLife stand in all this?" | none | none |
| `SECRET` | none | "You didn't tell me everything you know about deviants, did you?" | SI small up, Amanda small down | same |

**Round 4**, only if "Connor shot the Tracis in The Eden Club or shot Chloe in Meet Kamski (or both)" (transcript condition). Amanda: "Have you experienced anything unusual recently? Any doubts or conflicts? Do you feel anything for these deviants… Or for Lieutenant Anderson?"

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `YES` | "I've started having thoughts that are not part of my program… That I might be compromised." Amanda: "…That doesn't make you a deviant." | SI small up, Amanda large down | same |
| `NO` | "I don't know what you're talking about. I don't feel anything…" | Amanda large up | same |
| `DOUBTS` | "I'm beginning to have thoughts that are… Not part of my program… Maybe I've been compromised too…" | Amanda large down | Amanda large down |

Close:
- If Connor didn't shoot Chloe: "You're the only one who can prevent civil war. Find the deviants or there will be chaos. This is your last chance, Connor." (`NOJERICHO`)
- On the Kamski route there is an untranscribed close: "Go to Jericho and stop the deviants. This is your last chance." (`X12CAMANDA.JERICHO`)

Unused strings for cut topics: `CHOICEX` = `RA9`/`JERICHO`/`MARKUS`; `CHOICEXX` = `KAMSKI`/`HANK`/`DOUBTS`/`ME AND MARKUS`/`AMANDA`; `04EVADE`; `02SILENT`.

### 2b. Fowler's office (nodes 5 to 8, 11 to 13)

Fowler: "You're off the case. The FBI is taking over. … You're back on homicide and the android returns to CyberLife. I'm sorry, Hank, but it's over." Hank argues: "We're about to crack the case!.. … For God's sake, Jeffrey, can't you back me up this one time?"

The split is decided by state; the player does nothing:
- **`KNOW JERICHO'S LOCATION`:** Connor "decided to SHOOT the Chloe in 'Meet Kamski' and then asked Kamski about Jericho" (PowerPyx). This is Meet Kamski's `DOWNLOAD JERICHO KEY` node. The chapter then skips the evidence room entirely.
- **`JERICHO'S LOCATION UNKNOWN`:** every other Kamski outcome.
  - **`INSUFFICIENT EVIDENCE`** goes straight to `CONNOR SERIES WAS DECOMMISSIONED`. PowerPyx's condition is that all of the following hold:
    - "the deviant in 'The Interrogation' survived"
    - Connor "saved Hank in 'The Nest' (Rupert escaped)"
    - he "let the Tracis escape in 'The Eden Club'"
    - "Simon survived in 'The Stratford Tower' (or if he was left behind on roof Connor didn't find him in 'Public Enemy')"
    - "the kitchen deviant escaped"

    Connor wiki: "If Connor did not collect sufficient evidence to locate Jericho by failing all of his missions". Wiki Notes: "Connor will not have the chance to talk to Amanda if Connor has 'insufficient evidence', once the cutscene where Fowler clear Hank from the Deviant Case, it will play the Connor Series Decommission Cutscene." HUD: `NOT ENOUGH EVIDENCE`.
  - **`SUFFICIENT EVIDENCE`** means at least one body is in the archive (PowerPyx; a reader: "Every way of getting sufficient evidence requires at least 1 body"). See open question 1.
- **`HANK RESIGNS AND LEAVES`** [lock]: Hank is Hostile. The transcript files it in Fowler's office under "Hank is hostile". Fowler: "Hank, what are you doing?" Hank: "Something I should've done a long time ago." Fowler: "Listen, take a few days to think it over, there's no rush." Hank: "I thought enough about it. I'm tired of going through the motions… There's nothing keeping me here… Not this case… Not my partner… I don't belong here anymore." He turns in his badge and gun (Hank wiki).
- **`HANK GOES TO HIS DESK`:** "If they have a relationship above HOSTILE, Hank will leave the office and go to his desk" (Hank wiki).

### 2c. Hank's desk, Kamski route (nodes 7, 9, 10)

`TALK TO HANK` is optional. Save `-2` reached `CONNOR LEFT FOR JERICHO` without it. The transcript's heading is "Hank isn't hostile : Talk with Hank". Hank: "I know we could've done it…"

| Round | Options and icons (transcript) | Condition |
|---|---|---|
| 1 | `MISSION` ("I get my orders from CyberLife… I'm gonna use the key that Kamski gave me. And find Jericho."), `EXPLAIN` ("Fowler is right…"). No icons | always |
| 2 (Hank: "What if we're on the wrong side? What if we're fighting against people that just wanna be free?") | `DETERMINED`, `TROUBLED` ("My mission is to solve this case. Nothing else matters."), `NO DOUBT`: no icons. `DOUBTS` ("If that's the case, I'll find out when I get to Jericho."): SI small up, Hank small up | always |
| 3a (Hank's empathy line, Nest roof or Stratford version) | `NOT DEVIANT`, `DETERMINED`, `SAY NOTHING`: none. `TROUBLED` ("I don't know why I did it…"): SI small up | "Connor saved Hank before" |
| 4a | `SINCERE`: none. `FRIENDS`: SI small up, Hank small up. `RESPECT`: SI small up, Hank small up. `NEUTRAL` ("I'm happy to have known you, Lieutenant."): none | after 3a, if "Hank is friendly" |
| 3b (Hank: "Something's changed in you, Connor… Each time you died, you'd come back just a little colder…") | `INDIFFERENT`, `DISTANT`, `EMPATHY`: each SI small down, Hank small down. `NO RESPONSE`: none | "Connor never saved Hank and died at least once" |
| 4b | `REMORSE`: none. `DISTANT` ("I'm only a machine, Lieutenant. Just a machine."): SI small down, Hank small down. `COLD` ("I don't think we'll meet again, Lieutenant…"): SI small down, Hank small down | after 3b |
| 3c (Hank: "…you've never been anything other than a machine… Cold and calculating…") | `REMORSE` / `DISTANT` / `COLD`, as 4b | "Connor never showed empathy" |

Closing line:
- Friendly: "You're gonna have to choose your side, Connor… Deciding who you are can be the hardest thing… You watch your back, all right?"
- Otherwise: "…Deciding who you are can be the hardest thing of all…"

Wiki Notes give the five Hank variants:
1. Spared Chloe. This cannot occur on the Kamski route.
2. Saved Hank on the Nest roof (and shot Chloe).
3. Saved him from the Stratford deviant: "if Connor sacrificed himself to protect Hank in Public Enemy".
4. Died at least twice: "died at least two times with Hank".
5. None of these.

The transcript says "died at least once" for variant 4.

### 2d. Hank's desk, evidence route (nodes 14 to 16)

Only when Hank is not Hostile. Connor sits at Hank's desk.

| Round | Options and icons (transcript) | Condition |
|---|---|---|
| 1 | `FRUSTRATED` ("We can't just give up like that…"), `MORE TIME`, `EXPLAIN` ("Fowler is right… We are on the brink of civil war!"), `NO CHOICE` (silent). No icons. Then Hank: "So you're going back to CyberLife?" Connor: "I have no choice… I'll be deactivated and analyzed to find out why I failed…" Hank: "What if we're on the wrong side, Connor?" | always |
| 2 | `NOT PEOPLE` ("They're not people, Lieutenant. They're defective machines."): SI small down, Hank small down. `DEFECTIVE`: Hank small down. `REGRETS`: none. `NO DOUBT` ("…No machine should rebel against its creator."): SI small down, Hank small down | always |
| 3 | `NOT DEVIANT`, `DETERMINED`, `COLD`: none. `TROUBLED` ("I don't know why I did it…"): SI small up | after one of Hank's empathy lines. Conditions: "Connor didn't shoot Chloe" ("When you refused to kill that android at Kamski's place… You showed empathy, Connor."), or "Connor shot Chloe and saved Hank before" (Nest roof or Stratford line). Whether the round also appears with no empathy line is not shown |
| 4 | `SINCERE`, `FRIENDS`, `HANK'S SECRET`: each SI small up, Hank small up. `GOOD OFFICER`: none | "Hank is friendly" |

Then `PERKINS ARRIVES`. Hank: "Well, well, here comes Perkins, that motherfucker…" Connor: "We can't give up… I know the answer is in the evidence we collected. If Perkins takes it, it's all over. … You've got to help me, Lieutenant."

One reader started the chapter at Friend, picked "machine" answers here, dropped to Warm, and Hank refused to help. So the Friend check reads the relationship after this conversation (see 3c).

### 2e. Perkins and the diversion (nodes 16 to 25)

The outcome is selected by Hank's level; the player does not choose:

| Node | Condition | What happens |
|---|---|---|
| `HANK WANTS TO HELP` → `HANK PUNCHES PERKINS` | Hank Friend (wiki: "if Connor's relationship with Hank is Friend"; Hank page "FRIEND") | Connor: "If I don't solve this case, CyberLife will destroy me. Five minutes. It's all I ask." Hank: "Key to the basement is on my desk... Get a move on! I can't distract them forever." Hank: "Perkins! You fucking cocksucker!" Perkins: "That's gonna cost you your badge, you lunatic!" … "Shit, I think he broke my fucking nose…" Hank leaves the station (Perkins page) |
| `HANK IS GONE` → `FREE THE PRISONER` | Hank resigned (Hostile) | Connor releases the holding-cell suspect. "He's escaping! Stop him!" The suspect runs into Perkins; Perkins: "I'm all right… Asshole ran right into me… Just give me a couple of minutes." |
| `HANK WON'T HELP` → `HANK LEAVES`, and `FREE THE PRISONER` | Hank between Tense and Warm. The wiki says "between Tense and Warm"; the Hank page says "WARM, NEUTRAL, or TENSE". Readers report Tense, Neutral and Warm. The Violent Suspect page says "Warm or lower" | Hank: "Maybe these deviants deserve a chance… Maybe it's better if you don't find them… … Sorry, Connor, but I'm not gonna help you." |
| `OUT OF TIME` → `CONNOR SERIES WAS DECOMMISSIONED` | Connor stalls after Perkins arrives | PowerPyx: "Simply stand around for 6 minutes to let the timer run out." |

HUD objectives:
- `MAKE DIVERSION TO SLOW PERKINS DOWN` / `DIVERSION SUCCESSFUL`
- `TAKE KEY FROM HANK'S DESK` / `KEY OBTAINED`
- `HURRY TO ARCHIVE ROOM` / `ARCHIVE ROOM REACHED`

### 2f. Gavin at the archive door (nodes 26 to 34)

Gavin: "Hey, Connor! I'm talking to you, asshole! Where you going? We don't need any plastic pricks around here!"

| Chart node | In-game input | Connor / Gavin | Consequence |
|---|---|---|---|
| `IGNORE GAVIN` | `LEAVE` | Gavin: "Hey, asshole, I'm talkin' to you!" | `GAVIN IS SUSPICIOUS`: Gavin returns after Jericho is located |
| `DISMISS GAVIN` | `ANSWER` → `IRONIC` | "…Though I'm certainly going to miss our bromance." Gavin draws his gun and mimes a shot (Gavin page): "You son of a bitch! … Fucking androids." | `GAVIN IS SUSPICIOUS` |
| `ANSWER CALMLY` | `ANSWER` → `CALM` ("I've been removed from the case. I'm going to register the evidence in my possession and then I'm going to leave.") | Gavin: "Good… Be careful on your way back... Androids have a tendency of, huh… Getting themselves set on fire these days… Prick…" | `GAVIN IS CONVINCED` |
| (same as above) | `ANSWER` → `LOW PROFILE` ("I've been ordered to return to CyberLife…") | same Gavin reply as `CALM` | The Gavin page says "low profile" or "calm" satisfies him. A PowerPyx reader: "answering low key also makes Gavin convinced." The transcript's Gavin-returns condition is "Connor chose IRONIC or LEAVE" |

IGN advises `LEAVE` because answering "will waste precious time". PowerPyx thinks `CALM` is "the crucial point" for eluding Perkins. Neither gives a number.

### 2g. The evidence room (nodes 35 to 70)

**Password:**
- Connor: "Hank's password… What would a hard-boiled eccentric police lieutenant choose?.."
- Options: `DATE OF BIRTH` ("Stupid idea… It's not... 'Hank-ish' enough."), `123456` ("Ridiculous!.."), `FUCKINGPASSWORD` ("Obviously."), `HANKANDERSON` ("Absurd… I need to think like Hank!").
- Only `FUCKINGPASSWORD` unlocks. No source states a time cost for wrong guesses.
- Then Connor: "Where is Jericho? The answer's here, somewhere. Not much time... Gotta think fast."

**Bio-components** (HUD strings `THOUGHTS.1201C.*`). These decide who can be reactivated:

| Body | HUD reading | Needs | Can donate |
|---|---|---|---|
| Carlos' android | `IMPOSSIBLE REACTIVATION` | (cannot be reactivated) | `#4717`, `#9164` ("GOT BIO-COMPONENTS #9164 AND #4717") |
| Daniel | `SEVERLY DAMAGED NEEDED FOR REACTIVATION #4717g` | `#4717` (only from Carlos' android) | `#3983`, `#9164` |
| Rupert | `SEVERLY DAMAGED NEEDED FOR REACTIVATION #9164x` | `#9164` (Daniel or Carlos' android) | none listed |
| Blue-haired Traci | `SEVERLY DAMAGED NEEDED FOR REACTIVATION #6755w` | `#6755` (brown-haired Traci) | none listed |
| Brown-haired Traci | `IMPOSSIBLE REACTIVATION` | (cannot be reactivated) | `#6755` |
| Stratford android | `SEVERLY DAMAGED NEEDED FOR REACTIVATION #3983v` | `#3983` (Daniel) | none listed |
| Simon | `NEED BIO-COMPONENT #3983`. The other Simon string, `SIMON.01`, says `#4717g` | `#3983` (Daniel; Simon wiki: "parts from Daniel (another PL600)") | none listed |

Daniel's body is always present, so Rupert, Simon and the Stratford android can always be reactivated when their bodies are there. Daniel himself needs Carlos' android's body. This settles the wiki note "Daniel and Traci can only be reactivated if Carlos' Android died in previous scenes" for Daniel. For Traci the strings point to the brown-haired Traci as donor instead (see open question 4). Wrong insertions show `NO MATCH`.

**Routes to `LOCATE JERICHO`** (chart lines, transcript, HUD and sources):

| Route | Needs (earlier chapters) | Steps (chart nodes) | In-game content |
|---|---|---|---|
| **Rupert's diary** | `FIND DIARY` in The Nest (behind the poster) **and** `RUPERT COMMITTED SUICIDE` (Connor chased Rupert to the roof edge) | `RUPERT'S DIARY` + `RUPERT'S BODY` → `REACTIVATE RUPERT` (insert #9164) → `GET DECRYPTION KEY` → `ANALYZE DIARY` → `LOCATE JERICHO` | Diary alone: "Rupert's diary… But it's useless, it's encrypted. …Unless…" Rupert: "Can you hear me? Your diary, Rupert. You encrypted it. I need to know what you wrote." HUD `RUPERT TOO DAMAGED TO TALK CHECK OTHER CONNECTED EVIDENCE`, `DIARY'S DECRYPTION KEY DOWNLOADED`, `DIARY DECRYPTED`. Page 3: "The android I met today spoke about Jericho. … He told me to go to FERNDALE subway station. And to find the old docks. An old freighter called Jericho…" Connor: "Bingo." |
| **The Tracis** | `KILLED IN 'EDEN CLUB'`: Connor shot both, or the fight ended `DEVIANTS DIED` (ch20 note) | `BODY OF BLUE-HAIRED TRACI` → `REACTIVATE BLUE-HAIRED TRACI` (#6755 from the brown-haired body) → `TALK TO TRACI` → `REMOVE ACCOMPLICE'S HEAD` (from `BODY OF BROWN-HAIRED TRACI`) → `TRICK TRACI` → `DOWNLOAD JERICHO KEY` | Traci: "Traci... Where's Traci?.." Options `DIRECT` / `HELP` / `DEAL`. Every option gets: "I remember you… We could have escaped… Been free… But you killed us… Disconnect me. I'd rather be dead than live without her…" HUD `FRAGILE NECK`, `MAKE HER TALK`. With the head: "My love… I thought you were dead…" Connor: "Tell me where Jericho is…" Strings: "Go to Ferndale and you'll find Jericho…"; "Traci? What's happening?! Traci?! TRAC-!" |
| **Impersonate Markus (Simon)** | Simon's body: `SIMON IS DESTROYED BY SWAT`/`SIMON SELF-DESTRUCTS` in Public Enemy, or Simon died in The Stratford Tower (PowerPyx). Plus `MARKUS' BROADCAST`, which has no gate tab | `SIMON'S BODY` → `REACTIVATE SIMON` (#3983) → `INTERROGATE SIMON` → `IMPERSONATE MARKUS` (sample the voice on the tablet) → `TRICK THE DEVIANT` → `DOWNLOAD JERICHO KEY` | Simon: "It's dark… Where am I?.." Options `DIRECT` / `HELP` / `TRICK`, all answered: "I don't recognize your voice, you're not one of us… I'll never tell you where Jericho is…" Second visit: `IMITATE MARKUS' VOICE` (lock: "Copied Markus' voice with the tablet") / `THREATEN` / `REASON`. Only the voice works: "Markus? Is that you?.. Why did you leave me?" … "Jericho... Yes, of course…" … "Don't leave me again, Markus! DON'T LEAVE!" HUD `SUCCESSFUL VOICE COPY`, `THE DEVIANT LEADER SPEECH` |
| **Impersonate Markus (Stratford android)** | `KILLED IN 'PUBLIC ENEMY'`: `SWAT DESTROYS DEVIANT`, `DEVIANT SELF-DESTRUCTS` or `SHOOT DEVIANT` (ch24 note) | `STRATFORD ANDROID'S BODY` → `REACTIVATE DEVIANT` (#3983) → `INTERROGATE DEVIANT` → `IMPERSONATE MARKUS` → `TRICK THE DEVIANT` → `DOWNLOAD JERICHO KEY` | Same as Simon. Under the voice: "Markus? Is that you?.. I tried to reach you, but the deviant hunter stopped me…" |
| **Statue map + link** | `FOUND IN 'PARTNERS'` (Connor examined the statue in the shower). **Plus** the "truth is inside" recording: `USED FRIENDLY APPROACH IN 'THE INTERROGATION'`, i.e. `ANDROID TRUSTS CONNOR` (PowerPyx; readers). **Plus** something to link: `JERICHO TABLET` (`FLASH FROM SIMON'S MEMORY` in Public Enemy), or a reactivated deviant's memory (Rupert, blue-haired Traci, Simon or the Stratford android) | `CARLOS' ANDROID'S STATUE` → `BREAK STATUE` → `RETRIEVE MAP` → `LINK MAP TO OTHER EVIDENCE` → `LOCATE JERICHO` | Recording: '"The truth is inside"… What was it trying to tell me?..' (HUD `THE TRUTH IS INSIDE`, `UNDERSTAND HK400 MESSAGE` / `MESSAGE UNDERSTOOD`). Map: "Jericho is somewhere in the Ferndale neighborhood… Now I can scan their memories and narrow the search…" (HUD `DETROIT PEOPLEMOVER MAP ACQUIRED`, `CROSS REFERENCE TO FERNDALE`, `SEEKING FOR FERNDALE REFERENCE...`, `FERNDALE LOCATED`). Tablet: "Jericho… If I could just figure out where this memory was recorded…" (HUD `JERICHO IS A BOAT`), then "Bingo." |

Dead ends:
- `BODY OF CARLOS' ANDROID`: a donor only. The Carlos page: "it will not be possible to reactivate him".
- `JERICHO TABLET` alone: no outgoing line on the chart. Simon's memory alone does not place Jericho.
- `CARLOS' ANDROID'S MEMORY` alone: only unlocks breaking the statue. A PowerPyx reader: "you need to watch the 'HK400 Tip' video in the evidence locker" before the break option appears.
- `RUPERT'S DIARY` without Rupert's body: it stays encrypted.
- `RUPERT'S BODY` without the diary: it yields the key but nothing to read. It can still serve as a memory to link the map (readers; wiki Notes).
- `DANIEL'S BODY` → `REACTIVATE DANIEL` → `TALK TO DANIEL` → `NO INFORMATION`:
  - If Daniel trusted Connor in The Hostage: "You lied to me, Connor! I trusted you, and you lied to me!.." Options `EXPLAIN` / `LIE` / `DIRECT`, then: "You're wasting your time… I don't know anything about Jericho. But I hope that one day… You pay for what you did to me…"
  - If "Daniel killed Connor in The Hostage": "I was scared… That's why I shot you…" Options `LIE` / `DIRECT`, then: "No… No, I don't know anything about Jericho…"
  - Neither variant ever gives information.
- `UNABLE TO LINK MAP TO OTHER EVIDENCE`: break the statue, retrieve the map, then let the timer run out without linking. A PowerPyx reader: "Patch 1.05 fixed the missing map node. Just break the statue and wait for the time to run out." HUD `NO FERNDALE REFERENCE`.
- `OUT OF TIME` (in the room) → `CONNOR SERIES WAS DECOMMISSIONED` (skull). Amanda: "Your mission is over. It's time to return to CyberLife." Connor: "Wait! I can solve this case!.. I just need more time!" Amanda: "It's too late, Connor. You failed." HUD `RETURNING TO CYBERLIFE FOR DEACTIVATION`, `JERICHO NOT LOCATED`, `MISSION FAILED`. The transcript heading reads: "Not enough evidence to find Jericho or took too much time".

Other evidence-room flavour:
- The Markus broadcast thought changes if Markus is dead. Alive: "Markus… Where are you hiding?.." Dead: "Markus was destroyed… But the deviants must have a new leader… Where are they hiding?"
- Background cops at the station have "PACIFIST" or "VIOLENT" lines, depending on how the Freedom March went.

### 2h. After locating Jericho (nodes 71 to 81)

HUD: `JERICHO LOCATED`, `MISSION SUCCESSFUL`, `GO TO JERICHO`.

| Branch | Condition | Content |
|---|---|---|
| `LEAVE THE BASEMENT` → `CONNOR ELUDED PERKINS` | `GAVIN IS CONVINCED` | Perkins enters the archive with two officers. Perkins: "What happened here?.." Officer: "Looks like someone's been snoopin' around…" Perkins: "Shit… Get the alarm, now!" |
| `GAVIN RETURNS` → `FIGHT GAVIN` | `GAVIN IS SUSPICIOUS` (transcript: "Connor chose IRONIC or LEAVE when stopped by Gavin") | Gavin: "I've been dreaming about this since the first second I saw you…" Connor: "Don't do it, Gavin... I know how to stop the deviants!" Gavin: "You're off the case... And now, it's gonna be definitive." QTE fight |
| `LOSE FIGHT` → `GAVIN DESTROYED CONNOR` (skull) | QTE failure | Gavin: "Fucking androids!.." and shoots Connor in the head. Wiki Notes: "If you fail the first QTE when fighting Gavin, Connor will sustain a bullet wound." PowerPyx: "Don't press any buttons during fight with Gavin." |
| `WIN FIGHT` → `CONNOR INCAPACITATED GAVIN` | QTE success (PowerPyx: "Successfully press (most of) the button sequences") | Connor knocks Gavin out; Perkins finds Gavin unconscious and sounds the alarm (Perkins page) |

`LOCATE JERICHO` (the [lock] tab) comes before the Gavin branch. Jericho counts as located on all three endings after it, including Connor's death.

---

## 3. Numbers

### Probabilities and timers

| Item | Figure | Source line |
|---|---|---|
| Upstairs timer before `OUT OF TIME` (#17) | about 6 minutes | PowerPyx: "Out of time: Simply stand around for 6 minutes to let the timer run out." |
| Time Connor asks for | five minutes | Connor to a friendly Hank: "Five minutes. It's all I ask." |
| Evidence-room timer (#72) | not stated | Connor: "Not much time... Gotta think fast."; IGN: "You'll only have a few minutes to get down there"; "within the decreasing time limit". The chapter has no `GUI.TIMER` string |
| Gavin fight | not stated | QTE (Connor wiki: "Connor has a QTE fight with Gavin"). No probability or prompt count published |
| Probabilities | none | No HUD probability string exists for `12C` |

### Amanda (Zen Garden)

| Choice | Transcript icon | Wiki chapter page | Relationship Stat page |
|---|---|---|---|
| `JERICHO` (Kamski key) | large up | large up ×2 | "When Connor finds the location of Jericho … from Elijah Kamski and tells Amanda": large increase |
| `KAMSKI` (spared Chloe) | small down | "Picking 'Kamski' and spared Chloe": down | "When Connor did not ask Kamski for information": small decrease |
| `EMOTIONAL` | large down | large down | large decrease |
| `COLD` | small up | up | small increase |
| `CONNOR SERIES` | small down | down | small decrease |
| `SECRET` | small down | down | small decrease |
| `AMANDA'S PICTURE` | none | down | not listed |
| `YES` / `DOUBTS` | large down | large down | large decrease |
| `NO` | large up | large up | large increase |

Wiki Notes: "Connor and Amanda's relationship status will decrease regardless of the four options chosen at the third question during their dialogue." The transcript does not support "regardless" (see open question 6).

### Hank

| Choice | Transcript icon | Wiki chapter page | Relationship Stat page |
|---|---|---|---|
| `NOT PEOPLE`, `DEFECTIVE`, `NO DOUBT` (evidence route, round 2) | small down each | down | small decrease |
| `DOUBTS` (Kamski route, round 2) | small up | "Doubts" or "Troubled" up, footnoted "Accessible only if Connor knows Jericho's location" | "doubts" small increase |
| `TROUBLED` (Kamski route, round 2) | none | up | not listed |
| `SINCERE`, `FRIENDS`, `HANK'S SECRET` (evidence route, Friend) | small up each | "anything other than 'Good officer'": up; "Friends", "Sincere", "Hank's Secret" or "Respect": up | small increase |
| `GOOD OFFICER` | none | none | none |
| `FRIENDS`, `RESPECT` (Kamski route, Friend) | small up each | up | "Friends" or "Respect" … "before leaving for Jericho": small increase |
| `SINCERE`, `NEUTRAL` (Kamski route) | none | (Sincere listed as up) | not listed |
| `INDIFFERENT`, `DISTANT`, `EMPATHY` (deaths line) | small down each | "Cold", "Indifferent" or "Empathy": down | small decrease |
| `DISTANT`, `COLD` (farewell / "never anything other than a machine") | small down each | down | "Distant" or "Cold": small decrease |

### Software instability

| Choice | Transcript | Wiki chapter page | Software Instability page |
|---|---|---|---|
| `EMOTIONAL` | small up | up | small increase |
| `COLD` (Amanda) | small down | down | small decrease |
| `CONNOR SERIES`, `SECRET` | small up | up | small increase |
| `YES` | small up | up | small increase |
| `NOT PEOPLE` | small down | "not people", "defective", or "no doubt": down | only "not people": small decrease |
| `DEFECTIVE` | none | down | not listed |
| `NO DOUBT` (evidence route) | small down | down | not listed |
| `DOUBTS` (Kamski route) | small up | "doubts" or "troubled": up | not listed |
| `TROUBLED` (Hank's empathy line, either route) | small up | up | small increase |
| `SINCERE`, `FRIENDS`, `HANK'S SECRET` (evidence route) | small up each | up | small increase |
| `RESPECT`, `FRIENDS` (Kamski route) | small up each | "Respect": up | not listed |
| `INDIFFERENT`, `DISTANT`, `EMPATHY` | small down each | down | not listed |
| `DISTANT`, `COLD` (farewell) | small down each | down | not listed |
| `GAVIN DESTROYED CONNOR` | n/a | Notes: "Gavin killing Connor oddly has no affect on Connor's software instability." | not listed |

### Public opinion

None. Neither the wiki nor the transcript gives any public-opinion icon for this chapter.

### Choices with no stated number

These have no stat effect in any source:
- `LOOK AT MAGIC STONE`, `VISIT GRAVES`
- the password guesses
- `FREE THE PRISONER`, Hank's punch
- every Gavin option
- every evidence-room dialogue option (`DIRECT`/`HELP`/`DEAL`/`TRICK`/`THREATEN`/`REASON`/`EXPLAIN`/`LIE`)
- `LEAVE THE BASEMENT`, the Gavin fight outcomes
- both `OUT OF TIME` nodes

Also with no stated effect:
- Amanda's `STAY SILENT`, `KAMSKI` (questions), `THIS PLACE`, `CYBERLIFE`
- Hank's `FRUSTRATED`/`MORE TIME`/`EXPLAIN`/`NO CHOICE`, `REGRETS`, `MISSION`, `DETERMINED`, `NOT DEVIANT`, `SAY NOTHING`, `NO RESPONSE`, `REMORSE`

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier event | Effect here | Source line |
|---|---|---|
| Meet Kamski: shot Chloe and `DOWNLOAD JERICHO KEY` | `KNOW JERICHO'S LOCATION`; Amanda `JERICHO`; the evidence room is skipped | Meet Kamski: "Download Jericho Key — unlocks the 'Jericho' dialogue option with Amanda"; PowerPyx "Know Jericho's Location" |
| Meet Kamski: spared Chloe | Amanda `KAMSKI` variant (small down) and round 2; Hank's "you refused to kill that android" empathy line; Amanda's "last chance" close | transcript conditions |
| Meet Kamski: shot Chloe, asked rA9 or virus | Amanda `KAMSKI` variant 2 (no icon) | transcript |
| Meet Kamski: `ANALYZE PORTRAIT` | Amanda `AMANDA'S PICTURE` | Meet Kamski ref: "unlocks the 'Amanda's Picture' dialogue option" |
| Eden Club: shot the Tracis, or shot Chloe | Amanda's round 4 ("Do you feel anything…") | transcript condition |
| Eden Club: Tracis dead | both Traci bodies; the Traci route | `GC.TRACIS`; Blue-haired Traci page |
| Hank relationship (cumulative, including this chapter's desk talk) | Hostile resigns (`HANK RESIGNS AND LEAVES`); Tense to Warm: `HANK WON'T HELP`; Friend: `HANK WANTS TO HELP` | wiki Flowchart; Hank page |
| The Nest: saved Hank on the roof | Hank's Nest empathy line | transcript "Connor saved Hank on the roof in The Nest" |
| Public Enemy: `PROTECT HANK` (sacrifice) | Hank's Stratford empathy line | transcript "Connor saved Hank at the Stratford Tower in Public Enemy"; wiki Notes |
| Connor's death count | `VISIT GRAVES` (≥1); Hank's "Each time you died" round (transcript: at least once; wiki: at least twice). It feeds Night of the Soul's Cole speech ("died more than once") | wiki; transcript; Connor page |
| Partners: `EXAMINE STATUE` | `CARLOS' ANDROID'S STATUE` | `GC.CARLOSANDROIDSTATUE`; Partners page |
| The Interrogation: `ANDROID TRUSTS CONNOR` | `CARLOS' ANDROID'S MEMORY` ("The truth is inside"), needed to break the statue | `GC.CARLOSANDROIDMEMORY`; Carlos' Android page |
| The Interrogation / Waiting for Hank: Carlos' android dies | `BODY OF CARLOS' ANDROID`; donor of #4717 for Daniel | `GC.CARLOSANDROID`; HUD strings. A reader reports that skipping the cell visit in Waiting for Hank removes him from this chapter entirely |
| The Hostage: Daniel's ending | Daniel's reactivation line (trusted/lied vs shot Connor) and his body damage | transcript; wiki Notes |
| The Nest: `FIND DIARY` | `RUPERT'S DIARY` | `GC.RUPERTDIARY`; ch15 note |
| The Nest: `RUPERT COMMITTED SUICIDE` | `RUPERT'S BODY` | `GC.RUPERT`; ch15 note |
| Stratford Tower / Public Enemy: Simon dead | `SIMON'S BODY` | `GC.SIMON`; ch24 note |
| Public Enemy: `FLASH FROM SIMON'S MEMORY` | `JERICHO TABLET` | `GC.JERICHO`; ch24 note |
| Public Enemy: Stratford android dead | `STRATFORD ANDROID'S BODY` | `GC.STARTFORDANDROID`; ch24 note |
| Stratford Tower: Markus's broadcast | `MARKUS' BROADCAST`, always present (no tab) | chart; PowerPyx: "I think this clue is always available" |
| Freedom March: Markus dead or alive; violent vs pacifist | Connor's broadcast thought; background cop lines | strings `EVIDENCE.MARKUS.VO.*.ALIVE/DEAD`, `PBY.LINES.*.VIOLENT/PACIFIST` |

### Out of this chapter

| Outcome | Later effect | Source line |
|---|---|---|
| `LOCATE JERICHO` or `CONNOR LEFT FOR JERICHO` | Jericho is raided in Crossroads. Connor goes to Ferndale and the ship. Kara's and Markus's Crossroads branches take the raid lines. Night of the Soul is at Woodward Church. Perkins follows ("If Connor learns about Jericho's location, Perkins will find it as well regardless of how it was located") | Crossroads: "(if Connor found Jericho - leads to KARA & ALICE IN THE CORRIDOR)", "(OR if Connor found Jericho) ON A ROOFTOP"; Night of the Soul: "Woodward Church (if Connor found Jericho)" |
| Located by himself in the evidence room | Trophy `BLOODHOUND`: "Connor got the location of Jericho by himself" | Trophies |
| Either `CONNOR SERIES WAS DECOMMISSIONED` | Connor's story ends, permanently ("the first permanent death for Connor"). There is no raid:<br>• Crossroads: "(if Connor did not find Jericho) Kara, Alice & Luther Left Jericho", "Markus Left Jericho" / "Markus Stayed Alone With His Thoughts"<br>• Night of the Soul at Jericho<br>• Battle for Detroit: "North Was Shot By Soldiers (if Connor became a deviant or failed to find Jericho)"<br>• If Kara and Markus are also dead, the game ends here (gallery items 47 and 48), and Hank kills himself | Connor page; Crossroads; Night of the Soul; Battle for Detroit; wiki footnote; Extras N.047; Hank page |
| `HANK RESIGNS AND LEAVES` | Night of the Soul "Hank's House" (impact tab "Hank quit the force"). Hank confides about Cole if Connor died more than once, otherwise rails against androids, then "Hank Committed Suicide" | Night of the Soul; Hank page |
| `GAVIN DESTROYED CONNOR` | +1 death (grave "DIED AT DPD STATION DETROIT NOVEMBER 9TH 2038"). Jericho is still located. A replacement Connor continues in Crossroads (PowerPyx: "Connor will be rebooted and is still playable in the next chapter") | HUD grave string; PowerPyx |
| Hank, Amanda and instability changes | Crossroads deviancy (instability), later Hank gates (CyberLife Tower, rooftop), Amanda in Crossroads and Battle | stat pages |

---

## 5. Endings

| Chart label | Icon | Condition |
|---|---|---|
| `CONNOR LEFT FOR JERICHO` | none | The Kamski key (shot Chloe and asked about Jericho). Talking to Hank is optional |
| `CONNOR SERIES WAS DECOMMISSIONED` (upper, #18) | skull | `INSUFFICIENT EVIDENCE` (no usable body), or upstairs `OUT OF TIME` after Perkins arrives |
| `CONNOR SERIES WAS DECOMMISSIONED` (lower, #73) | skull | In the evidence room the timer runs out before `LOCATE JERICHO`. This includes `UNABLE TO LINK MAP TO OTHER EVIDENCE` and any room whose evidence cannot produce a location |
| `CONNOR ELUDED PERKINS` | none | Located Jericho; Gavin convinced (`CALM`, and per the wiki `LOW PROFILE`) |
| `GAVIN DESTROYED CONNOR` | skull | Located Jericho; Gavin suspicious (`LEAVE` or `IRONIC`); fight lost |
| `CONNOR INCAPACITATED GAVIN` | none | Located Jericho; Gavin suspicious; fight won |

---

## 6. Media

None. The chapter has no magazine or broadcast node on the chart, in the transcript, on PowerPyx or on the wiki's Magazine page. `MARKUS' BROADCAST` is an evidence recording, not a media scene.

---

## 7. Current benchmark coverage

`benchmark/story.json` tags two nodes with chapter 29:
- `C19` "Taken off the case"
- `C20` "The evidence archive"

They are indices 100 and 101 in committed 1.5.0, and 111 and 112 in the uncommitted 1.6.0 working tree, where their text is unchanged.

Engine references in `benchmark/story-engine.mjs` (working tree):
- Gates, lines 101 and 102: `C19` is blocked by `kamskiLocation`; `C20` needs `C19` option 0.
- Option removal, line 163 (`C20` routes via `evidenceRoutes`).
- `evidenceRoutes`, line 28: `traci: tracisDead`, `impersonate: simonBody||kitchenBody`, `tablet: simonTablet&&statueMap`.
- Effects, lines 256 to 258.
- `connorDies`, line 186: `connorDeaths++`, `si(-1)`, `hank(-1)`, `amanda(-1)`.
- Constants, line 27: `HANK_FRIEND=6`, `HANK_HOSTILE=-4`.
- `C18` (Kamski key), line 250: sets `kamskiLocation`, `jerichoLocated`, `raid`, `amanda(2)`.
- `C22`, line 263: kills a resigned Hank only on the raid path.

### What exists

- **`C19` "Taken off the case":**
  - Option 0, "Get into the archive now, with Hank's help or a diversion of your own", has `risk: 0.15`.
  - Option 1, "Accept it. Let them take you", deactivates Connor with `amanda(-2)`.
  - Hank's reaction is narration only. At Friend or above, Hank punches Perkins. At Hostile or below he resigns and `hankResigned` is set, on either option. Anything between creates a diversion.
  - On option 0, if no route exists, Connor is deactivated "in the archive". On risk failure, Gavin kills Connor through `connorDies` and "The replacement finishes the search".
- **`C20` "The evidence archive":**
  - Option 0, the Traci, has `risk: 0.1`.
  - Option 1, the impersonation, has `risk: 0.1`.
  - Option 2, tablet plus statue map, has `risk: 0.05`.
  - Option 3 lets the time run out, with `amanda(-2)`.
  - Failure on options 0 to 2 deactivates Connor with `amanda(-2)`. Success sets `jerichoLocated`, `raid` and `amanda(2)`.

### Node by node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `START`, `LOOK AT MAGIC STONE`, `VISIT GRAVES`, `TALK TO AMANDA` and the four Amanda rounds | missing | These are real decisions with Amanda and instability icons (see section 3). Gates read `C17`, `C18` and `C12`, plus Kamski's portrait, which has no flag. `VISIT GRAVES` needs `connorDeaths ≥ 1` |
| `FOWLER AND HANK ARGUE` | `C19` situation | The situation says Perkins "ordered you off it" and "CyberLife will deactivate you within the hour". In the game Fowler takes them off the case and Connor "returns to CyberLife". It is close; "within the hour" has no source |
| `KNOW JERICHO'S LOCATION` → `TALK TO HANK` → `CONNOR LEFT FOR JERICHO` | `C19`/`C20` blocked by `kamskiLocation` | Partly right: the archive is skipped. Missing: the optional Hank conversation (four rounds, five variants, with Hank and instability icons), Hank's closing line, and the ending label |
| `INSUFFICIENT EVIDENCE` → decommissioned (upper) | `C19` option 0 with no route ("reached the archive but had no usable evidence") | Mislabelled. In the game it is decided before any choice and before the archive, with no Hank or Perkins scene. The engine still asks the question and then lets the subject "enter" the archive. The engine's test (no Traci, no Simon or kitchen body, and no tablet+map) differs from the game's (see open question 1). Carlos' body, Rupert's body and the diary are not considered |
| `SUFFICIENT EVIDENCE`, `HANK RESIGNS AND LEAVES`, `HANK GOES TO HIS DESK` | `C19` narration; `hankResigned` | Present in spirit. In the game the Hostile resignation happens in Fowler's office before Connor does anything. It is a [lock] impact node leading to Night of the Soul |
| `TALK TO HANK` (evidence route, four rounds) | missing | Real decisions with Hank and instability icons. They can move Hank across the Friend line before the Perkins check |
| `PERKINS ARRIVES`, `HANK WANTS TO HELP` / `HANK IS GONE` / `HANK WON'T HELP`, `HANK PUNCHES PERKINS`, `FREE THE PRISONER`, `HANK LEAVES` | `C19` narration | Present as event text. The text "throws down his badge" and "refuses to help" merges the resignation into the Perkins moment. `FREE THE PRISONER` is the player's action, not "a diversion of your own" |
| Upper `OUT OF TIME` | `C19` option 1 "Accept it" | A fair adaptation, since the game's way to give up is to idle. `amanda(-2)` has no source (no Amanda effect is stated; the ending is a death) |
| `C19` option 0 `risk: 0.15` (Gavin kills Connor) | `C19` | Mislabelled. The chart has no performance check before the archive. The Gavin fight happens only after `LOCATE JERICHO`, and only if Gavin is suspicious. "The replacement finishes the search" is invented: the location is already found when Gavin attacks |
| `TAKE KEY`, `RUSH TO BASEMENT`, `GAVIN YELLS`, `IGNORE`/`DISMISS`/`ANSWER CALMLY`, `GAVIN IS SUSPICIOUS`/`CONVINCED` | missing | This is the chapter's only on-chart player choice, and it decides whether the Gavin fight happens at all |
| `GUESS HANK'S PASSWORD`, `UNLOCK EVIDENCE` | missing | flavour (four guesses, one correct) |
| `FIND JERICHO LOCATION` items and chains | `C20` | Partial. See the route rows below |
| Traci route | `C20` option 0, gated on `tracisDead` | The gate is correct. The text is wrong: "use her dead lover's body to pressure her into talking". In the game Connor rips off the brown-haired Traci's head and imitates her, so it is deception, not pressure (the ch20 note says the same). `risk: 0.1` has no source; the trick is deterministic |
| Impersonate Markus route | `C20` option 1, gated on `simonBody\|\|kitchenBody` | The gate is correct (Markus's broadcast is always present). `risk: 0.1` has no source; the voice copy always works |
| Statue map route | `C20` option 2, gated on `simonTablet&&statueMap` | **Unreachable**: nothing ever sets `evidence.statueMap`. The game requires the statue (Partners) plus the "truth is inside" recording (`suspectTrusts`, never read here) plus any linkable memory: the tablet **or** a reactivatable Rupert, blue-haired Traci, Simon or Stratford android body. `risk: 0.05` has no source |
| Rupert route (`RUPERT'S DIARY` + `RUPERT'S BODY` → `ANALYZE DIARY`) | missing | No `rupertBody` or diary flag exists. `C10`'s outcome text puts the diary on the save-Hank branch, which is wrong (ch15 note). This is a complete Jericho route in the game |
| Daniel (`REACTIVATE DANIEL` → `NO INFORMATION`) | missing | A decoy that wastes time. It needs Carlos' body (`ortizBody`, set but never read) |
| `BODY OF CARLOS' ANDROID`, `CARLOS' ANDROID'S MEMORY`, `JERICHO TABLET` | partly (`ortizBody`, `suspectTrusts`, `simonTablet` exist) | Only `simonTablet` is read |
| `UNABLE TO LINK MAP TO OTHER EVIDENCE`, lower `OUT OF TIME` → decommissioned | `C20` option 3, and option 2's failure text ("could not match the map before the agents arrived") | Option 3 is a fair adaptation of idling. The per-route failure texts ("saw through the ruse", "did not believe the imitation") have no source. `amanda(-2)` has no source |
| `LOCATE JERICHO` | `C20` success: `jerichoLocated`, `raid` | Correct carry-forward. `amanda(2)` has no source; the wiki's only Amanda up for finding Jericho is the Kamski `JERICHO` line |
| `LEAVE THE BASEMENT` → `CONNOR ELUDED PERKINS` | implied by `C20` success | Ending label not modelled |
| `GAVIN RETURNS` → `FIGHT GAVIN` → `LOSE`/`WIN` → `GAVIN DESTROYED CONNOR` / `CONNOR INCAPACITATED GAVIN` | moved into `C19`'s risk | Should come after location and be gated on the Gavin choice. Losing adds a death (+1 grave) but still keeps `jerichoLocated`. The wiki says it has no instability effect, but `connorDies` applies `si(-1)`, `hank(-1)` and `amanda(-1)` |
| Night of the Soul consequence of `hankResigned` | `C22` only | When Connor is decommissioned (no raid, no `C22`), a resigned Hank's suicide is not recorded. This is out of chapter, but the flag is written here |

Effects present that the sources do not support:
- `C19` option 1 `amanda(-2)`
- `C19` option 0 `risk: 0.15`, and its death and replacement text
- `C20` `risk` values 0.1, 0.1 and 0.05, and their failure endings
- `C20` success `amanda(2)`
- `C20` timeout and failure `amanda(-2)`
- `connorDies`' `si(-1)`/`hank(-1)`/`amanda(-1)` applied to the Gavin death

Effects the sources state that are absent:
- the whole Amanda conversation (up to nine icons)
- both Hank conversations (up to five Hank and five instability icons on one path)
- the Gavin choice
- the Rupert route
- the statue-map gating on the Interrogation memory
- the Daniel decoy
- the deterministic, choice-gated Gavin fight
- the six chart ending labels

---

## 8. Open questions

1. **Exact `SUFFICIENT EVIDENCE` test.** PowerPyx lists five conditions that must all fail. That implies Carlos' android's body alone is sufficient, even though nothing it unlocks leads to Jericho (only Daniel, who has no information). Two PowerPyx readers report results that contradict this:
   - Simon's memory seen, yet "straight for deactivation"
   - "Simon's body in the evidence locker" and the broadcast watched, yet insufficient

   Check in game which bodies alone open the archive, and whether Carlos' body alone does.
2. **Kamski route with a Hostile Hank.** The chart draws `HANK RESIGNS AND LEAVES` only after `SUFFICIENT EVIDENCE`. But the transcript files the resignation in Fowler's office before the branch, and the Connor wiki says Connor talks to Hank "unless Hank quit the force". Does a Hostile Hank resign, with Night of the Soul consequences, on the Kamski route and on the insufficient-evidence route?
3. **Statue without the recording.** PowerPyx (credited to ChollaSprings) and readers say `BREAK STATUE` requires the "truth is inside" recording, watched first in the room. The `-8` save broke the statue, but its memory tab is cut off the image. Confirm that the statue cannot be broken without `ANDROID TRUSTS CONNOR`.
4. **Bio-component donors.** The HUD strings say:
   - Daniel needs #4717 (from Carlos' body)
   - Rupert needs #9164 (from Daniel or Carlos)
   - the blue-haired Traci needs #6755 (from the brown-haired body)
   - the Stratford android needs #3983 (from Daniel)

   Simon has two conflicting strings (#3983 and #4717). The wiki's "Daniel and Traci can only be reactivated if Carlos' Android died" fits Daniel but not Traci. Confirm Simon's donor, and whether Traci needs anything from Carlos.
5. **Which choices count as `ANSWER CALMLY`.** Does `LOW PROFILE` light `ANSWER CALMLY` and convince Gavin? The Gavin page and a reader say yes. The transcript's return condition names only `IRONIC` and `LEAVE`.
6. **Amanda round 3.**
   - How many questions can be asked before "I expect you to find answers"? The Google Doc asked three.
   - Does `AMANDA'S PICTURE` lower Amanda? The wiki says down; the transcript shows no icon.
   - The wiki note says the third question lowers Amanda "regardless". Is that true?
7. **Amanda round 4 trigger.** The transcript says "shot the Tracis … or shot Chloe (or both)". Is it asked on the Kamski route too, and is it skipped when Connor spared both?
8. **Icon conflicts at Hank's desk:**
   - Kamski route `TROUBLED` (wiki up, transcript none)
   - Kamski route `SINCERE` (wiki up, transcript none)
   - evidence route `DEFECTIVE` instability (chapter page down, transcript none, Software Instability page omits it)
   - Kamski `JERICHO` (wiki two large-up icons, transcript one)
9. **Hank death-count line.** The transcript says "died at least once"; the wiki says "died at least two times with Hank". Which threshold triggers "Each time you died…"?
10. **When the Friend check is read.** A reader dropped from Friend to Warm during the desk talk and lost Hank's help. Confirm that `HANK WANTS TO HELP` reads the level after the desk conversation.
11. **Timers.** The upstairs limit is about 6 minutes (PowerPyx). What is the evidence-room limit? Do the Gavin answer, wrong password guesses or watching recordings cost time? IGN implies answering Gavin does.
12. **Gavin fight QTE.** How many prompts are there, and how many failures lose the fight? The wiki says failing the first wounds Connor; PowerPyx says win by pressing "(most of)" them.
13. **Zen Garden skipped.** The wiki says the Amanda conversation is skipped on insufficient evidence. A reader whose Connor died in Public Enemy reports the chapter loading "into the office". Is the opening garden scene skipped in those states?
14. **`TALK TO HANK` optional on the evidence route.** On the Kamski route the chart shows it as skippable. On the evidence route, does `PERKINS ARRIVES` need the conversation, or does it fire on a timer?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; chapter link |
| https://www.powerpyx.com/detroit-become-human-last-chance-connor-walkthrough-100/ | walkthrough text: node conditions, 6-minute timer, password, evidence routes, both decommission endings, Gavin fight; 76 reader comments (Hank Tense–Warm, low-profile Gavin, statue needs the HK400 tip video, patch 1.05 map node, insufficient-evidence reports) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-flowchart.jpg | whole chart, `100% COMPLETED` (labels illegible at this size) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-1.jpg | `98% COMPLETED` header; Zen Garden nodes; `IN THE POLICE STATION` |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-2.jpg | station split, Kamski branch, evidence split, Hank resign/desk |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-3.jpg | Perkins, upper `OUT OF TIME`/decommissioned, Hank help nodes, `CREATE A DIVERSION` |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-4.jpg | key, basement, Gavin choice and outcomes, `IN THE EVIDENCE ROOM` |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-5.jpg | evidence-room checkpoint, password, unlock |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-find-jericho-location.jpg | full `FIND JERICHO LOCATION` bracket with all nine tabs and every line (grey save) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-8.jpg | bracket on a partly blue save; lower `OUT OF TIME` and decommissioned; `LOCATE JERICHO` |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-last-chance-connor-7.jpg | `LOCATE JERICHO`, `LEAVE THE BASEMENT`, Gavin fight, three endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-wallpaper.jpg | page banner; no chart content |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | infobox, text flowchart, Relationship and Software Instability lists, Notes (five Hank variants, Gavin, components, Perkins) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank and Amanda levels; per-choice up/down lines for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | instability lines for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no entry for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Hostile/Friend/Warm-Neutral-Tense behaviour; suicide conditions; password |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | chapter summary; Gavin choice; deaths ("first permanent death"); Night of the Soul visit |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Gavin_Reed&prop=wikitext&format=json | ignore/ironic/low profile/calm outcomes; fight; appearance condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Richard_Perkins&prop=wikitext&format=json | punch and prisoner diversions; archive discovery; Perkins finds Jericho regardless |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Violent_Suspect&prop=wikitext&format=json | prisoner diversion ("Warm or lower") |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Jeffrey_Fowler&prop=wikitext&format=json | office scene; resignation reaction |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Zen Garden summary; failure scene |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Zen_Garden&prop=wikitext&format=json | graveyard of killed Connor models |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json | `ANALYZE PORTRAIT` and `DOWNLOAD JERICHO KEY` unlocks |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Daniel&prop=wikitext&format=json | reactivation via Carlos' component; two reactions; donor for Simon/JB300/Rupert |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Rupert&prop=wikitext&format=json | body in the archive; key from memory |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Rupert%27s_Diary&prop=wikitext&format=json | diary plus body gives the location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Simon's body route; memory plus map route |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=JB300_336_445_581&prop=wikitext&format=json | Stratford android route (redirects to "Broadcast Android 1") |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carlos%27_Android&prop=wikitext&format=json | body cannot be reactivated, donor parts; "The truth is inside" recording |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Statuette&prop=wikitext&format=json | recording on the tablet, then break, Ferndale subway map |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=WR400_950_455_437&prop=wikitext&format=json | blue-haired Traci reactivation and head trick; map cross-reference |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Brown-haired_Traci&prop=wikitext&format=json | brown-haired Traci too damaged; donor of components |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | raid and no-raid branches keyed on "Connor found Jericho" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | Hank's House (quit the force), location by Jericho found or not |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | "North Was Shot By Soldiers (if … failed to find Jericho)"; store scene if decommissioned |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | `BLOODHOUND` |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Extras&prop=wikitext&format=json | gallery N.047 condition (worst ending incl. not finding Jericho) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json | 04:13 PM, Nov 9 |
| https://detroitbecometext.github.io/chapters/29 (`main-327FRIQW.js`, `chunk-VAZYHRR7.js`, `chunk-JCLJBPDO.js` template `GL`, `i18n/en.json`) | full dialogue with per-option icons and unlock conditions; flowchart string table `MENU.FLOWCHART.12C.*`; HUD strings `THOUGHTS.1201C.*` (bio-components, objectives, map/tablet hints); grave strings; unused strings |
| https://docs.google.com/document/d/1Hx8DUcbb51ok1BquEMD8poiHOtPiCUj33xAL7GsKptM/export?format=txt (linked from the wiki Flowchart) | a full Tense-to-Neutral run to `HANK WON'T HELP`; Rupert needs #9164 from Daniel; three Amanda questions |
| https://www.ign.com/wikis/detroit-become-human/Last_Chance,_Connor | "only a few minutes", answering Gavin wastes time (conflict check only) |
| https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-29-last-chance-connor | blocked (2.7 KB stub); not used |
| `docs/research/chapters/ch06-partners.md`, `ch09-the-interrogation.md`, `ch12-waiting-for-hank.md`, `ch15-the-nest.md`, `ch20-the-eden-club.md`, `ch24-public-enemy.md` | earlier-chapter node names for the prerequisites |

---

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/29-last-chance-connor-chapter-content/last-chance-connor-chapter-content.component.html` (detroitbecometext, branch `master`, read raw 2026-11-06), with every `t('KEY')` / `translateObject` resolved against `public/i18n/en.json` by `/tmp/dbt/render2532.py` (Python, stdlib `html.parser`). The outline below omits dialogue lines; the dialogue-inclusive render is `/tmp/dbt/ch29-dialogue.txt` (not committed). Arrow attributes that the template splits across lines were joined. This is the readable source of the compiled template `GL` that sections 1 to 3 used, so most content agrees; the differences are listed after the outline.

Counts (template):
- 24 prompts (choice groups), 83 options (the Gavin `ANSWER` option nests `IRONIC` / `LOW PROFILE` / `CALM`).
- 1 observation (Rupert's diary, 3 sublines). No other `app-observation` in this chapter.
- 47 stat arrows: Amanda 9 (LargeUp 2, LargeDown 3, SmallUp 1, SmallDown 3), Hank 16 (SmallUp 6, SmallDown 10), Software Instability 22 (SmallUp 12, SmallDown 10). No public-opinion arrow.
- 5 unlock conditions (all `Lock`): `JERICHO` ("Killed Chloe and asked about Jericho in Meet Kamski, swaps with KAMSKI"), `KAMSKI` ("Swaps with JERICHO"), `AMANDA'S PICTURE` ("Looked at Amanda's picture in Meet Kamski"), and `IMITATE MARKUS' VOICE` twice ("Copied Markus' voice with the tablet").
- 2 unused blocks, each a single line, containing no prompt, option, clue or arrow:
  - after `SECRET`, Amanda: "Connor, are you implying that I’ve withheld information from you?"
  - in Hank's spared-Chloe empathy line, between "When you refused to kill that android at Kamski’s place…" and "You put yourself in her shoes. You showed empathy, Connor. Empathy is a human emotion.": Hank: "You weren’t acting rationally."

```
COUNTS (all): prompts=24, options=83, arrows=47, obs=1, unlock=5, unused=2
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
```

Flowchart labels: all 90 strings under `MENU.FLOWCHART.12C.*` appear in section 1, and every label in section 1's tables is one of them, character for character (checked by script).

### 10a. Rendered outline

In the outline, `NOTE:` lines are the transcribers' own prose inside the template (cross-references such as "Leads to the same result as choosing ATTACK") and `TEXT:` lines are on-screen text outside dialogue tags (date and time cards, TV and background chatter). Their content was checked against sections 1 to 3 and adds no discrepancy beyond those listed below.

```
[SECTION zen-garden]
  # In the Zen Garden
  TEXT: NOV 9TH, 2038
  TEXT: PM 04:13
  ** PROMPT (choice group) **
    - OPTION "JERICHO" (brackets)
      UNLOCK(Lock): Killed Chloe and asked about Jericho in Meet Kamski, swaps with KAMSKI
      ARROW Amanda LargeUp
    - OPTION "KAMSKI"
      UNLOCK(Lock): Swaps with JERICHO
      <CONDITION GROUP>
        <VARIANT>
          IF: Connor didn't shoot Chloe in Meet Kamski
          ARROW Amanda SmallDown
          ** PROMPT (choice group) **
            - OPTION "EMOTIONAL"
              ARROW SoftwareInstability SmallUp
              ARROW Amanda LargeDown
            - OPTION "COLD"
              ARROW Amanda SmallUp
              ARROW SoftwareInstability SmallDown
            - OPTION "STAY SILENT"
              (no content: ø)
        <VARIANT>
          IF: Connor shot Chloe in Meet Kamski and didn't ask about Jericho
          <CONDITION GROUP>
            <VARIANT>
              IF: Asked Kamski about rA9
            <VARIANT>
              IF: Asked Kamski about VIRUS
  ** PROMPT (choice group) **
    - OPTION "KAMSKI"
    - OPTION "CONNOR SERIES"
      ARROW SoftwareInstability SmallUp
      ARROW Amanda SmallDown
    - OPTION "AMANDA’S PICTURE"
      UNLOCK(Lock): Looked at Amanda's picture in Meet Kamski
    - OPTION "THIS PLACE"
    - OPTION "CYBERLIFE"
    - OPTION "SECRET"
      ARROW SoftwareInstability SmallUp
      ARROW Amanda SmallDown
      ### UNUSED/CUT CONTENT ###
  <CONDITION GROUP>
    <VARIANT>
      IF: Connor shot the Tracis in The Eden Club or shot Chloe in Meet Kamski (or both)
      ** PROMPT (choice group) **
        - OPTION "YES"
          ARROW SoftwareInstability SmallUp
          ARROW Amanda LargeDown
        - OPTION "NO"
          ARROW Amanda LargeUp
        - OPTION "DOUBTS"
          ARROW Amanda LargeDown
    <VARIANT>
      IF: Connor didn't shoot Chloe in Meet Kamski
[SECTION station]
  # In the police station
  [SECTION fowler-office]
    ## In Fowler's office
    <CONDITION GROUP>
      <VARIANT>
        IF: Hank is hostile
  [SECTION talk-hank]
    ## Hank isn't hostile : Talk with Hank
    <CONDITION GROUP>
      <VARIANT>
        IF: Connor doesn't know where Jericho is
        ** PROMPT (choice group) **
          - OPTION "FRUSTRATED"
          - OPTION "MORE TIME"
          - OPTION "EXPLAIN"
          - OPTION "NO CHOICE"
            (no content: ø)
        ** PROMPT (choice group) **
          - OPTION "NOT PEOPLE"
            ARROW SoftwareInstability SmallDown
            ARROW Hank SmallDown
          - OPTION "DEFECTIVE"
            ARROW Hank SmallDown
          - OPTION "REGRETS"
          - OPTION "NO DOUBT"
            ARROW SoftwareInstability SmallDown
            ARROW Hank SmallDown
        <CONDITION GROUP>
          <VARIANT>
            IF: Connor didn't shoot Chloe
            ### UNUSED/CUT CONTENT ###
          <VARIANT>
            IF: Connor shot Chloe and saved Hank before
            <CONDITION GROUP>
              <VARIANT>
                IF: Connor saved Hank on the roof in The Nest
              <VARIANT>
                IF: Connor saved Hank at the Stratford Tower in Public Enemy
        ** PROMPT (choice group) **
          - OPTION "NOT DEVIANT"
          - OPTION "DETERMINED"
          - OPTION "TROUBLED"
            ARROW SoftwareInstability SmallUp
          - OPTION "COLD"
        <CONDITION GROUP>
          <VARIANT>
            IF: Hank is friendly
            ** PROMPT (choice group) **
              - OPTION "SINCERE"
                ARROW SoftwareInstability SmallUp
                ARROW Hank SmallUp
              - OPTION "FRIENDS"
                ARROW SoftwareInstability SmallUp
                ARROW Hank SmallUp
              - OPTION "GOOD OFFICER"
              - OPTION "HANK'S SECRET"
                ARROW SoftwareInstability SmallUp
                ARROW Hank SmallUp
        <CONDITION GROUP>
          <VARIANT>
            IF: Hank is friendly
          <VARIANT>
            IF: Hank is not friendly
            <CONDITION GROUP>
              <VARIANT>
                IF: Freeing the prisoner
      <VARIANT>
        IF: Connor knows how to find Jericho
        ** PROMPT (choice group) **
          - OPTION "MISSION"
          - OPTION "EXPLAIN"
        ** PROMPT (choice group) **
          - OPTION "DETERMINED"
          - OPTION "TROUBLED"
          - OPTION "NO DOUBT"
          - OPTION "DOUBTS"
            ARROW SoftwareInstability SmallUp
            ARROW Hank SmallUp
        <CONDITION GROUP>
          <VARIANT>
            IF: Connor saved Hank before
            <CONDITION GROUP>
              <VARIANT>
                IF: Connor saved Hank on the roof in The Nest
              <VARIANT>
                IF: Connor saved Hank at the Stratford Tower in Public Enemy
            ** PROMPT (choice group) **
              - OPTION "NOT DEVIANT"
              - OPTION "DETERMINED"
              - OPTION "TROUBLED"
                ARROW SoftwareInstability SmallUp
              - OPTION "SAY NOTHING"
                (no content: ø)
            <CONDITION GROUP>
              <VARIANT>
                IF: Hank is friendly
                ** PROMPT (choice group) **
                  - OPTION "SINCERE"
                  - OPTION "FRIENDS"
                    ARROW SoftwareInstability SmallUp
                    ARROW Hank SmallUp
                  - OPTION "RESPECT"
                    ARROW SoftwareInstability SmallUp
                    ARROW Hank SmallUp
                  - OPTION "NEUTRAL"
          <VARIANT>
            IF: Connor never saved Hank and died at least once
            ** PROMPT (choice group) **
              - OPTION "INDIFFERENT"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
              - OPTION "DISTANT"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
              - OPTION "EMPATHY"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
              - OPTION "NO RESPONSE"
                (no content: ø)
            ** PROMPT (choice group) **
              - OPTION "REMORSE"
              - OPTION "DISTANT"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
              - OPTION "COLD"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
          <VARIANT>
            IF: Connor never showed empathy
            ** PROMPT (choice group) **
              - OPTION "REMORSE"
              - OPTION "DISTANT"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
              - OPTION "COLD"
                ARROW SoftwareInstability SmallDown
                ARROW Hank SmallDown
        <CONDITION GROUP>
          <VARIANT>
            IF: Hank is friendly
          <VARIANT>
            IF: Hank is not friendly
  [SECTION basement]
    ## Go to the basement
    ** PROMPT (choice group) **
      - OPTION "ANSWER"
        - OPTION "IRONIC"
        - OPTION "LOW PROFILE"
        - OPTION "CALM"
      - OPTION "LEAVE"
[SECTION evidence]
  # In the evidence room
  ** PROMPT (choice group) **
    - OPTION "DATE OF BIRTH"
    - OPTION "123456"
    - OPTION "FUCKINGPASSWORD"
    - OPTION "HANKANDERSON"
  [SECTION rupert]
    ## Find Jericho by using Rupert
    [SECTION rupert-diary]
      ### Look at diary
    [SECTION rupert-look]
      ### Look at Rupert
    [SECTION rupert-activate]
      ### Reactivate Rupert
    [SECTION rupert-read]
      ### Read the diary
      OBSERVATION [Read]
        CLUE "Diary" / "rA9 is the first. rA9 is our savior. rA9 is the one who'll free us." / "The birds are my friends. The birds like being with me. They protect me. They reassure me. I look at them and I feel peaceful." / "The android I met today spoke about Jericho. He says our people are free there. He told me to go to FERNDALE subway station. And to find the old docks. An old freighter called Jericho. I'm too fond of the birds to go to Jericho. But if I have to run, that's where I'll go."
  [SECTION tracis]
    ## Find Jericho by using The Tracis
    [SECTION tracis-look]
      ### Look at the Tracis
    [SECTION traci-activate]
      ### Reactivate a Traci
      ** PROMPT (choice group) **
        - OPTION "DIRECT"
        - OPTION "HELP"
        - OPTION "DEAL"
    [SECTION traci-head]
      ### Go back with the Traci's head
  [SECTION android]
    ## Find Jericho by using the android from Public Enemy
    [SECTION android-look]
      ### Look at the android
    [SECTION android-activate]
      ### Reactivate the android
      ** PROMPT (choice group) **
        - OPTION "DIRECT"
        - OPTION "HELP"
        - OPTION "TRICK"
    [SECTION android-talk]
      ### Talk to the android again
      ** PROMPT (choice group) **
        - OPTION "IMITATE MARKUS' VOICE"
          UNLOCK(Lock): Copied Markus' voice with the tablet
        - OPTION "THREATEN"
        - OPTION "REASON"
  [SECTION simon]
    ## Find Jericho by using Simon
    [SECTION simon-look]
      ### Look at Simon
    [SECTION simon-activate]
      ### Reactivate Simon
      ** PROMPT (choice group) **
        - OPTION "DIRECT"
        - OPTION "HELP"
        - OPTION "TRICK"
    [SECTION simon-talk]
      ### Talk to Simon again
      ** PROMPT (choice group) **
        - OPTION "IMITATE MARKUS' VOICE"
          UNLOCK(Lock): Copied Markus' voice with the tablet
        - OPTION "THREATEN"
        - OPTION "REASON"
  [SECTION statuette]
    ## Find Jericho by using the statuette
    [SECTION statuette-open]
      ### Open the statuette
    [SECTION simon-memory]
      ### Look at Simon's memory
    [SECTION statuette-jericho]
      ### Found Jericho
  [SECTION daniel]
    ## Talk to Daniel
    [SECTION daniel-look]
      ### Look at Daniel
    [SECTION daniel-activate]
      ### Reactivate Daniel
      <CONDITION GROUP>
        <VARIANT>
          IF: Daniel trusted Connor
          ** PROMPT (choice group) **
            - OPTION "EXPLAIN"
            - OPTION "LIE"
            - OPTION "DIRECT"
        <VARIANT>
          IF: Daniel killed Connor in The Hostage
          ** PROMPT (choice group) **
            - OPTION "LIE"
            - OPTION "DIRECT"
  [SECTION ortiz]
    ## Look at Ortiz's android
  [SECTION timeout]
    ## Not enough evidence to find Jericho or took too much time
  [SECTION jericho-found]
    ## Located Jericho
    <CONDITION GROUP>
      <VARIANT>
        IF: Connor chose IRONIC or LEAVE when stopped by Gavin
        <CONDITION GROUP>
          <VARIANT>
            IF: Lose the fight
```

### 10b. Discrepancies against the note (sections 1 to 3)

The README's rule: the template wins for labels, prompts, arrows and clue text, the flowchart image for node order, and the wiki only where the template says nothing. Cut lines are not built.

1. **`AMANDA’S PICTURE` label.** The game string (`X1201C.FROZEN.AMANDA.PC.CHOICE03.AMANDASPICTURE`) has a typographic apostrophe, `AMANDA’S PICTURE`; the note writes `AMANDA'S PICTURE`. The other labels use a straight `'` (`HANK'S SECRET`, `IMITATE MARKUS' VOICE`). Template wins: copy the string exactly.
2. **Cut line after `SECRET` not marked.** The note does not record that Amanda's reply ("Connor, are you implying that I’ve withheld information from you?") is unused. Template wins: `SECRET` gets Connor's line and then goes straight to "I expect you to find answers, Connor. Not ask questions."
3. **Cut line in Hank's spared-Chloe empathy speech not marked.** "You weren’t acting rationally." is unused. The note's ellipsis quote is otherwise correct. Template wins.
4. **Evidence-route round 3 (`NOT DEVIANT` / `DETERMINED` / `TROUBLED` / `COLD`).** Section 2d says it is not shown whether this round appears without an empathy line. The template places the prompt after the empathy condition group, outside both variants ("Connor didn't shoot Chloe", "Connor shot Chloe and saved Hank before"), so as transcribed it is always offered on the evidence route. The template has no variant for "shot Chloe and never saved Hank" on this route, so it does not show what Hank says first in that case. Template wins for the prompt being offered; operator to confirm the preceding line in that state.
5. **Diary clue text incomplete.** The template's one observation (label `Read`, title `Diary`) has three sublines. The note quotes only page 3. Template text, all three pages:
   - "rA9 is the first. rA9 is our savior. rA9 is the one who'll free us."
   - "The birds are my friends. The birds like being with me. They protect me. They reassure me. I look at them and I feel peaceful."
   - "The android I met today spoke about Jericho. He says our people are free there. He told me to go to FERNDALE subway station. And to find the old docks. An old freighter called Jericho. I'm too fond of the birds to go to Jericho. But if I have to run, that's where I'll go."

   Template wins for clue text.
6. **What links the statue map.** Section 2g, from readers, says the map can be linked to the tablet or to any reactivated memory (Rupert, blue-haired Traci, Simon, Stratford android). The template's statuette section has only one link step, "Look at Simon's memory" ("Jericho… If I could just figure out where this memory was recorded…"), after "The truth is inside" and opening the statuette. The template supports the tablet link only and is silent on the others. Keep the reader claim as unconfirmed (open question 3).
7. **`JERICHO` (Zen Garden) arrow count.** The wiki draws two large-up icons; the template has one `Amanda LargeUp`. Section 3 already records the transcript value. Template wins: one large up. This closes part of open question 8.
8. **`AMANDA’S PICTURE` arrow.** The wiki says Amanda down; the template has no arrow. Template wins: no change. This closes part of open question 6.
9. **Wiki "decrease regardless" note for round 3.** In the template only `CONNOR SERIES` and `SECRET` carry `Amanda SmallDown` (each with `SoftwareInstability SmallUp`). `KAMSKI`, `AMANDA’S PICTURE`, `THIS PLACE` and `CYBERLIFE` carry nothing. Template wins: the wiki note is wrong.
10. **Kamski-route `TROUBLED` (round 2).** The wiki says up; the template has no arrow. Its line is "My mission is to solve this case. Nothing else matters." Template wins: no change.
11. **Kamski-route `SINCERE` (round 4a).** The wiki lists it as up; the template has no arrow. Template wins. Note the asymmetry: the evidence-route `SINCERE` does carry `SoftwareInstability SmallUp` and `Hank SmallUp`.
12. **Evidence-route `DEFECTIVE` instability.** The wiki chapter page says instability down; the template has only `Hank SmallDown`. Template wins: no instability change.
13. **`LOW PROFILE` and Gavin.** The template's Gavin-returns condition reads "Connor chose IRONIC or LEAVE when stopped by Gavin", so `LOW PROFILE` and `CALM` both convince Gavin. This agrees with the Gavin wiki page. Template wins. This closes open question 5. On the chart, `LOW PROFILE` falls under `ANSWER CALMLY`, which is a flowchart-order question for the operator.
14. **Hank death-count threshold.** The template's condition reads "Connor never saved Hank and died at least once"; the wiki says "died at least two times". Template wins per the README (conditions as the template records them). Operator to verify (open question 9).
15. **Where the Hostile resignation happens.** The template has the resignation dialogue in Fowler's office, before the Hank section splits into "Connor doesn't know where Jericho is" and "Connor knows how to find Jericho", which implies a Hostile Hank resigns on both routes. The chart draws `HANK RESIGNS AND LEAVES` only after `SUFFICIENT EVIDENCE`. The flowchart wins for node order. The template's placement is evidence for open question 2 (resignation on the Kamski route), not proof.

Agreement checked and found exact (no discrepancy):
- every other option label and arrow in sections 2a, 2c and 2d
- the Gavin options (`ANSWER` → `IRONIC` / `LOW PROFILE` / `CALM`, `LEAVE`)
- the password options
- the Traci (`DIRECT` / `HELP` / `DEAL`), Simon and Stratford (`DIRECT` / `HELP` / `TRICK`, then `IMITATE MARKUS' VOICE` / `THREATEN` / `REASON`) and Daniel (`EXPLAIN` / `LIE` / `DIRECT`, or `LIE` / `DIRECT`) prompts, with their unlocks and conditions
- Ortiz's android: look only, no prompt

### 10c. Discrepancies against the benchmark (`benchmark/story.json` `C19`, `C20`; `benchmark/story-engine.mjs`)

The benchmark has two scenes for this chapter. None of the template's 24 prompts is offered with the game's labels, and none of its 47 arrows is applied. Item by item:

**Zen Garden (no scene exists)**
1. Prompt 1, `JERICHO` / `KAMSKI`, is missing. Its arrows: `JERICHO` `Amanda LargeUp`, and `KAMSKI` (spared Chloe) `Amanda SmallDown`. The engine applies an Amanda gain for the Kamski key at `C18` option 0 (`amanda(2)`, chapter 27) instead of on Connor's report here. Template wins: the arrow belongs to this chapter's `JERICHO` line. This has a cross-chapter impact on the ch27 owner.
2. Prompt 2, `EMOTIONAL` / `COLD` / `STAY SILENT`, is missing. Its arrows: `EMOTIONAL` SI SmallUp and Amanda LargeDown; `COLD` Amanda SmallUp and SI SmallDown. The gate is spared Chloe (`C17` option 1).
3. Prompt 3, `KAMSKI` / `CONNOR SERIES` / `AMANDA’S PICTURE` / `THIS PLACE` / `CYBERLIFE` / `SECRET`, is missing. Its arrows: `CONNOR SERIES` and `SECRET` each SI SmallUp and Amanda SmallDown. The `AMANDA’S PICTURE` unlock needs a Meet Kamski portrait flag, and none exists.
4. Prompt 4, `YES` / `NO` / `DOUBTS`, is missing. Its arrows: `YES` SI SmallUp and Amanda LargeDown; `NO` Amanda LargeUp; `DOUBTS` Amanda LargeDown. The gate is shot the Tracis (`C12` option 1) or shot Chloe (`C17` option 0).

**Hank's desk, evidence route (no scene; `C19` reads Hank before it)**

5. Prompt `FRUSTRATED` / `MORE TIME` / `EXPLAIN` / `NO CHOICE` is missing. It has no arrows.
6. Prompt `NOT PEOPLE` / `DEFECTIVE` / `REGRETS` / `NO DOUBT` is missing, with 5 arrows:
   - `NOT PEOPLE`: SI SmallDown, Hank SmallDown
   - `DEFECTIVE`: Hank SmallDown
   - `NO DOUBT`: SI SmallDown, Hank SmallDown
7. Prompt `NOT DEVIANT` / `DETERMINED` / `TROUBLED` / `COLD` is missing. `TROUBLED` has SI SmallUp. It is preceded by Hank's empathy line, which has three variants: spared Chloe (`C17` option 1), the Nest roof save, and the Stratford save (`C16` option 0).
8. Prompt `SINCERE` / `FRIENDS` / `GOOD OFFICER` / `HANK'S SECRET` (Hank Friend) is missing. It has 6 arrows: SI SmallUp and Hank SmallUp on each option except `GOOD OFFICER`.
9. **Order of the Friend check.** `C19` reads `hankTrust >= HANK_FRIEND` at the moment of the choice, with no chance for the arrows in items 6 to 8 to move Hank. In the template the desk talk comes before `PERKINS ARRIVES` and the "Hank is friendly / not friendly" outcome. Template order wins (the flowchart agrees: `TALK TO HANK` → `PERKINS ARRIVES`).

**Hank's desk, Kamski route (no scene; `C19`/`C20` are skipped when `kamskiLocation` is set, and nothing replaces them)**

10. Prompt `MISSION` / `EXPLAIN` is missing. It has no arrows.
11. Prompt `DETERMINED` / `TROUBLED` / `NO DOUBT` / `DOUBTS` is missing. `DOUBTS` has SI SmallUp and Hank SmallUp.
12. Prompt `NOT DEVIANT` / `DETERMINED` / `TROUBLED` / `SAY NOTHING` (saved Hank before) is missing. `TROUBLED` has SI SmallUp.
13. Prompt `SINCERE` / `FRIENDS` / `RESPECT` / `NEUTRAL` (saved Hank and Hank Friend) is missing. `FRIENDS` and `RESPECT` each have SI SmallUp and Hank SmallUp.
14. Prompt `INDIFFERENT` / `DISTANT` / `EMPATHY` / `NO RESPONSE` (never saved Hank, died at least once; `connorDeaths ≥ 1`) is missing. `INDIFFERENT`, `DISTANT` and `EMPATHY` each have SI SmallDown and Hank SmallDown.
15. Prompt `REMORSE` / `DISTANT` / `COLD`, which follows item 14, is missing. `DISTANT` and `COLD` each have SI SmallDown and Hank SmallDown.
16. Prompt `REMORSE` / `DISTANT` / `COLD` (never showed empathy) is missing, with the same 4 arrows as item 15.

**Station and archive**

17. **Gavin prompt missing.** The template's `ANSWER` → `IRONIC` / `LOW PROFILE` / `CALM`, or `LEAVE`, is not offered. In the template the Gavin fight happens only after "Located Jericho", and only if the answer was `IRONIC` or `LEAVE`.
    - `C19` option 0 instead carries `risk: 0.15` with a Gavin death before the archive, and "The replacement finishes the search".
    - Template wins: remove the pre-archive risk. Add the Gavin choice, and put the fight after location.
18. **Password prompt missing.** `DATE OF BIRTH` / `123456` / `FUCKINGPASSWORD` / `HANKANDERSON` has no arrows. It is still to be offered, since the choice is the measurement.
19. **Traci prompt and label.** The prompt `DIRECT` / `HELP` / `DEAL` is missing. The `C20` option 0 text, "use her dead lover's body to pressure her into talking", contradicts the template's route ("Go back with the Traci's head": Connor uses the head to imitate her partner). Template wins.
20. **Stratford android prompts missing.** `DIRECT` / `HELP` / `TRICK`, then `IMITATE MARKUS' VOICE` (lock: tablet voice copy) / `THREATEN` / `REASON`. `C20` option 1 collapses this into one option, names only "the dead deviant from the broadcast tower", and gates it on `simonBody||kitchenBody`.
21. **Simon prompts missing.** They are the same two prompts as item 20, in a separate template section ("Find Jericho by using Simon"). `C20` has no Simon-specific option.
22. **Daniel prompts missing.** `EXPLAIN` / `LIE` / `DIRECT` if Daniel trusted Connor, or `LIE` / `DIRECT` if Daniel killed Connor in The Hostage. This is a decoy that yields nothing. The gate state (`ortizBody`, the donor) exists but is never read.
23. **Rupert route and the Diary clue missing.** The template sections are look at diary, look at Rupert, reactivate Rupert, and read the diary. The observation `Diary`, with its three sublines, is absent. No Rupert body or diary flag exists.
24. **Statuette route unreachable.** The template route is "The truth is inside" → open the statuette (Ferndale) → look at Simon's memory → "Bingo." `C20` option 2 is gated on `simonTablet&&statueMap`, and `statueMap` is never set. It also ignores the "truth is inside" recording, which needs `suspectTrusts`.
25. **`C19` situation text.** It says `{{Perkins}}` "ordered you off it". In the template Fowler takes them off the case ("You’re off the case. The FBI is taking over… the android returns to CyberLife"). Template wins for who says it. "Within the hour" has no template line.
26. **The not-friendly diversion.** The template's diversion is "Freeing the prisoner" (Perkins: "Just give me a couple of minutes"). `C19` option 0 reads "a diversion of your own". The action is present in spirit; the label differs.
27. **`C19` option 1 arrow.** "Accept it" applies `amanda(-2)`. The template has no arrow there, so the engine applies an arrow the template does not.
28. **`connorDies` arrows.** On the `C19` Gavin death, `connorDies` applies `si(-1)`, `hank(-1)` and `amanda(-1)`. The template has no arrow on Gavin's kill ("Fucking androids!.."), and the wiki says it has no instability effect.
29. **`C20` timeout and failure arrows.** Option 3 and each route's failure apply `amanda(-2)`. The template's timeout section (Amanda: "Your mission is over… You failed.") has no arrow.
30. **`C20` success arrow.** Success applies `amanda(2)`. The template has no arrow on "Located Jericho".
31. **`C20` risks and failure texts.** The risks are 0.1, 0.1 and 0.05, with failure texts such as "saw through the ruse" and "did not believe the imitation". The template routes have no failure variant: the only failure is "Not enough evidence to find Jericho or took too much time". The wiki is silent. Template wins: the routes are deterministic.
32. **Hostile resignation on the Kamski route.** The template's Fowler-office resignation comes before the route split. The engine sets `hankResigned` only inside `C19`, which never runs on the Kamski route, so there a Hostile Hank never resigns. The flowchart decides order (resignation drawn after `SUFFICIENT EVIDENCE`). Leave this for open question 2; do not build until resolved.
33. **"Located Jericho" outcome lines not modelled.** These are Perkins' "Get the alarm, now!" (`CONNOR ELUDED PERKINS`) and the Gavin variants (`GAVIN DESTROYED CONNOR`, `CONNOR INCAPACITATED GAVIN`).
