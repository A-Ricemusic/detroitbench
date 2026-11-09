# Chapter 17: Zlatko (Kara)

Research note for rebuilding the chapter's scenes, written 2026-11-06. Sources and their order of authority follow `docs/research/README.md`. Working files are in `/tmp/flowcharts/ch17/` and were not committed:
- the seven PowerPyx screenshots, with zoomed crops in `crops/`;
- the chapter wikitext (`wiki.txt`) and related wiki pages (`w_*.txt`);
- the fan transcript data in `dbt/`: `en.json` and the compiled chapter template `chunk-JCLJBPDO.js`, the same files the ch12 agent used. They were rendered to `dbt/zlatko_transcript.txt`, and every chapter string is dumped in `dbt/keys.txt`.

The plain wiki title `Zlatko` is the chapter page (the character is `Zlatko_Andronikov`). `Zlatko_(chapter)` returns `missingtitle`.

Wiki infobox:
- `|date=November 6, 2038`, `|time=07:45PM`, `|player=[[Kara]]`
- `|location=[[Zlatko Andronikov's House|Zlatko's House]], [[Detroit]]`
- `|objectives=* Find help * Find a way to escape ** Serve Zlatko ** Recover enough memories * Escape`
- `|endings=5`

The text says: "This chapter has five different outcomes." The page carries a `{{Stub}}` tag. It has no Probability table and no Relationship section. Its only stat section is one Public Opinion line.

Transcript header: `NOV 6TH, 2038` / `PM 07:45`. The game's internal chapter code is `05K`, and every flowchart label exists as `MENU.FLOWCHART.05K.*` in `en.json`. Those strings were used to confirm spelling.

---

## 1. Flowchart transcription

### How the chart was read

- **Overview.** `detroit-zlatko-flowchart-100.jpg` is PowerPyx's whole-chart screenshot (EXIF 2018:06:07 23:11). Its labels are too small to read, so it was used only for layout and edges.
- **Zoomed 100% screenshots.**
  - `detroit-zlatko-beginning-100.jpg` (23:11) covers the start through the reset group.
  - `detroit-zlatko-explore-100.jpg` (23:11) covers the side branches, the reset tasks and the memory phase.
- **Zoomed screenshots from 2018-06-03.**
  - `detroit-zlatko-middle.jpg` (14:32) shows both paths and the three non-success endings on the left. It predates 100% and has two red-padlock `[...]` slots, which `explore-100` fills as READ "AX400 ON THE RUN" and RECALL ESCAPE.
  - `detroit-zlatko-search.jpg` (14:32) covers the search phase and ALICE FOUND.
  - `detroit-zlatko-alice-found-branch.jpg` (18:17) covers the hiding and sneaking routes. It was taken mid-chase, with "PUSH AWAY" and "THROW" prompts and the subtitle "Just be reasonable." on screen.
  - `detroit-zlatko-chase.jpg` (14:32) covers the chase and the endings.
- **Header** of `beginning-100`: `PUBLIC OPINION SKEPTICAL`, `ALICE WARM`. This is PowerPyx's save state, not something the chapter sets.
- **PowerPyx's last path** (blue on the overview): KARA IS RESET > OBEY YOUR NEW MASTER > … > RECOLLECT ENOUGH MEMORIES > MEMORY RECOVERED > … > BEAR ATTACKS ZLATKO AND PROTECTS KARA (hiding group) > KARA REACHES THE STAIRS > … > THE MONSTERS AMBUSH ZLATKO > LUTHER JOINS KARA & ALICE. That path also took FREE MONSTERS and read two magazines. It is a save state, not a rule.

Icon key (wiki `Template:Icon`, and the ch12/ch13 notes):
- ⇨ action.
- △ event the game plays.
- 🔍 magnifier: an investigation or clue node. Every memory and search node uses it.
- Double square: a group of alternatives.
- [branch]: the small bracket glyph that starts an optional side branch.
- Yellow open padlock: cross-chapter impact (`cc_impact`).
- Yellow circle-slash (wiki `{{Icon|nri}}`): a no-entry ending.
- Large picture tile: a checkpoint or key-moment tile.

**There is no skull, ✓/✗ or trophy anywhere on this chart.** All four failure endings carry the yellow no-entry icon, including the two where Kara is shot. The one success ending carries no icon. The only cross-chapter padlock is on FREE MONSTERS.

Boxes are numbered N1–N78 in reading order (left to right, top to bottom within each column). Labels are quoted exactly as printed. The chart misspells one ending as "ZLAKTO". The game string agrees: `MENU.FLOWCHART.05K.FAILALICE = LUTHER BROUGHT ALICE TO ZLAKTO`. The transitional node N40 is spelled correctly.

### A. Arrival and the machine

| # | Label | Icon | Edge / notes |
|---|---|---|---|
| N1 | LOOK FOR HELP | checkpoint (large tile with image) | > N2 |
| N2 | REACH ZLATKO'S HOUSE | ⇨ | > N3 |
| N3 | ENTER THE HOUSE | ⇨ | > N4 |
| N4 | MEET ZLATKO | ⇨ | > N5 |
| N5 | FOLLOW ZLATKO TO THE BASEMENT | ⇨ | > N6 |
| N6 | CLIMB INTO THE MACHINE | ⇨ | > N8 |
| N7 | ALICE ATTRACTED BY ODD NOISES | △, from a [branch] glyph under the N5–N6 line | side event; no outgoing edge |
| N8 | KARA IS BEING RESET | △ | > group N9/N10 |
| N9 | ESCAPE BEFORE BEING RESET | group member | > N11 |
| N10 | KARA IS RESET | group member | > N24 |

PowerPyx: "all of the following points are unmissable" for N2–N8.

### B. Escape path, and the side branches open on both paths

| # | Label | Icon | Edge / notes |
|---|---|---|---|
| N11 | SNEAK THROUGH HOUSE | large picture tile | a long line along the top of the chart runs to [SEARCH HOUSE FOR ALICE] (§E) |
| N12 | FREE MONSTERS | **yellow open padlock** (cross-chapter impact), from a [branch] glyph | optional; no outgoing edge |
| N13 | ENTER STORAGE ROOM | ⇨, from a [branch] glyph | > N14 |
| N14 | FREE THE BEAR | ⇨ | optional |
| N15 | ENTER BATHROOM | ⇨, from a [branch] glyph | > N16 |
| N16 | BATHROOM ANDROID IS LOUD | △ | > group N17/N18 |
| N17 | KILL | group member | |
| N18 | SPARE | group member | |
| N19 | READ "ARCTIC TENSIONS" | ⇨, from a [branch] glyph (magazine junction) | optional |
| N20 | READ "ANDROIDS ALTER BRAIN" | ⇨ | optional, conditional (§2, §4) |
| N21 | READ "AX400 ON THE RUN" | ⇨ | optional, conditional; a red-padlock `[...]` on `middle` |
| N22 | OUT OF TIME | △, from a [branch] glyph | > N23 |
| N23 | **LUTHER BROUGHT ALICE TO ZLAKTO** | ending tile with image; **yellow no-entry** | ENDING |

The wiki groups N12–N23 under "side options independent of whether Kara is reset or she escapes".

### C. Reset path

| # | Label | Icon | Edge / notes |
|---|---|---|---|
| N24 | OBEY YOUR NEW MASTER | large picture tile | > N25 |
| N25 | GO SEE LUTHER | ⇨ | > N26 |
| N26 | BRING THE TRAY TO ZLATKO | ⇨ | > N27 |
| N27 | DROP THE ANDROID TORSO | ⇨ | > [EXPLORE THE HOUSE TO RECOVER MEMORY] |
| — | [EXPLORE THE HOUSE TO RECOVER MEMORY] | bracketed phase label (not a box) | frames N28–N38; exits > N39 and > N42 |

### D. Memory clues (inside the phase label; every one is 🔍)

| # | Label | Column | Notes |
|---|---|---|---|
| N28 | OBSERVE MONSTERS' CELL | left | |
| N29 | RECALL ALICE'S BOOK | left | conditional |
| N30 | RECALL OFFERING COAT | left | |
| N31 | RECALL ESCAPE | left | conditional; a red-padlock `[...]` on `middle` |
| N32 | SEE NEWS FLASH OF ESCAPE | left | conditional |
| N33 | SEE A KID THROUGH THE DOOR HOLE | right | |
| N34 | RECALL DISCUSSION WITH ZLATKO | right | |
| N35 | RECALL TODD'S RED ICE PIPE | right | conditional |
| N36 | RECALL CHANGING APPEARANCE | right | |
| N37 | RECALL SQUAT FIREPLACE | right | conditional |
| N38 | RECALL RA9 SYMBOLS | right | conditional |

| # | Label | Icon | Edge |
|---|---|---|---|
| N39 | LOSE TOO MUCH TIME | △ | > N40 |
| N40 | LUTHER BRINGS ALICE TO ZLATKO | △ | > N41 |
| N41 | **KARA REMAINED RESET** | ending tile with image; **yellow no-entry** | ENDING |
| N42 | RECOLLECT ENOUGH MEMORIES | △ | > N43 |
| N43 | MEMORY RECOVERED | large picture tile | > [SEARCH HOUSE FOR ALICE] |

### E. Search and Alice

| # | Label | Icon | Edge |
|---|---|---|---|
| — | [SEARCH HOUSE FOR ALICE] | bracketed phase label | inputs N11 and N43; frames N44–N47 > N48 |
| N44 | CHECK FIREPLACE EMBERS | 🔍 | optional |
| N45 | CHECK TV | 🔍 | optional |
| N46 | CHECK EMPTY SHOTGUN | 🔍 | optional |
| N47 | RA9 | 🔍 | optional |
| N48 | ALICE FOUND | checkpoint (large tile; the wiki says "(checkpoint)") | > N49 |
| N49 | LUTHER GOES TO COLLECT ALICE | △ | > N50 |

### F. Escaping the upper floor

| # | Label | Icon | Edge |
|---|---|---|---|
| N50 | ENTER MAIN ROOM | ⇨ | > N51, N52, N53, N54; the group's lower line > N68 |
| N51 | HIDE UNDER TABLE | ⇨ | |
| N52 | HIDE IN CLOSET | ⇨ | |
| N53 | ENTER BEDROOM | ⇨ | > N56, N57, N58; > N68 |
| N54 | SET FIRE TO HOUSE | ⇨ | > N55 |
| N55 | BURNING DOWN THE HOUSE | △ | outgoing edge not legible (§8) |
| N56 | HIDE UNDER BED | ⇨ | |
| N57 | HIDE IN CLOSET (copy 2) | ⇨ | |
| N58 | GO THROUGH CORRIDOR | ⇨ | > N59; a vertical line > N73 (top) and > N68 (bottom) |
| N59 | GO THROUGH BATHROOM | ⇨ | > N60 (up), > N63, > N68 |
| N60 | BATHROOM ANDROID ALERTS ZLATKO | △ | > group N61/N62 |
| N61 | KILL (copy 2) | group member | |
| N62 | SPARE (copy 2) | group member | |
| N63 | SNEAK THROUGH STORAGE ROOM | ⇨ | > N64, > N65, > N68 |
| N64 | OPEN BEAR CAGE | ⇨ | optional |
| N65 | ZLATKO CLOSES IN | △ | > group N66/N67 |
| N66 | LEAVE HIDING SPOT | group member | |
| N67 | BEAR ATTACKS ZLATKO AND PROTECTS KARA (copy 1) | group member | the group > N73 |
| N68 | GET SPOTTED | △ | inputs from the main room, bedroom, corridor, bathroom and storage room (five lines bundled into one) > N69 |

### G. Chase and the yard

| # | Label | Icon | Edge |
|---|---|---|---|
| N69 | CHASE STARTED | large picture tile | > N73, > N70, > N71, > N72 |
| N70 | BEAR ATTACKS ZLATKO AND PROTECTS KARA (copy 2) | △ | > N73 |
| N71 | **ZLATKO KILLED KARA IN THE STORAGE ROOM** | ending tile with image; **yellow no-entry** | ENDING |
| N72 | **ZLATKO KILLED KARA IN THE BATHROOM** | ending tile with image; **yellow no-entry** | ENDING |
| N73 | KARA REACHES THE STAIRS | ⇨ | inputs from N58, the N66/N67 group, N69 and N70 > N74 |
| N74 | KARA & ALICE ESCAPE TO THE YARD | ⇨ | > N75 |
| N75 | ZLATKO CATCHES UP | △ | > N76 or N77 |
| N76 | LUTHER KILLS ZLATKO | △ | > N78 |
| N77 | THE MONSTERS AMBUSH ZLATKO | △ | > N78 |
| N78 | **LUTHER JOINS KARA & ALICE** | ending tile with image; **no icon** | ENDING |

Order within groups as printed:
- ESCAPE BEFORE BEING RESET is above KARA IS RESET.
- KILL is above SPARE (both copies).
- LEAVE HIDING SPOT is above BEAR ATTACKS ZLATKO AND PROTECTS KARA.
- Main-room choices read top to bottom: HIDE UNDER TABLE, HIDE IN CLOSET, ENTER BEDROOM, SET FIRE TO HOUSE.
- Bedroom choices read: HIDE UNDER BED, HIDE IN CLOSET, GO THROUGH CORRIDOR.

**Totals.**
- 78 boxes plus 2 bracketed phase labels.
- Repeated labels: KILL ×2, SPARE ×2, HIDE IN CLOSET ×2, BEAR ATTACKS ZLATKO AND PROTECTS KARA ×2.
- 5 ending tiles with 5 distinct labels, which matches `endings=5`.
- One yellow-padlock box (FREE MONSTERS).
- 11 memory clues and 4 search clues.

**Game strings that are not chart boxes** (`MENU.FLOWCHART.05K.*`):
- GET SPOTTED IN THE BEDROOM / … IN THE CORRIDOR / … IN THE BATHROOM / … IN THE STORAGE ROOM. The chart draws them as the single GET SPOTTED, N68.
- ENTER MONSTERS' CELL, FIND MAGAZINE (`TABLETNORESET`) and READ MAGAZINE. None of the screenshots shows these.

### Interactions not on the chart (transcript, wiki notes, PowerPyx)

- **Alice's doubt, on the way to the basement.** Alice: "I don't like this place, and that man. Let's go, I have a bad feeling…". Kara has four replies, `DOUBTCHOICE01`:
  - CAREFUL: "I know. I don't trust him either… We have to be careful…"
  - REASSURE: "It'll be okay, Alice. He's going to remove my Tracker and then we can start over again in Canada. You want that too, right?"
  - COMFORT: "He's a bit odd… but I think we can trust him. We don't have much of a choice anyway."
  - NO CHOICE: "Alice, we have nowhere else to go… We have to trust him."

  The transcript shows no relationship icon on any of them. The wiki's Attention to Detail says: "Reassuring Alice. (If you reassure her after talking to Zlatko, Kara will say "Come on, Alice")".
- **Zlatko's test.** "I see… Deviant, huh?.. What about her?" Kara: "She's human." (A fixed line, not a choice.)
- **Bathroom android, first encounter.** There are four options, `CHOICEGROUP01`: SHUT DOWN, ALICE ("I'm looking for a little girl. Have you seen her?" > "A little girl? No, no, no, I haven't seen her."), DEAL ("Will you be quiet if I let go?" > "Yes, yes, I promise to be quiet. Don't turn me off.") and SPARE ("No… No, of course not…"). The chart collapses them to KILL / SPARE.
- **Ember prompt.** In the main room the prompt is SET FIRE / PUT BACK (`BIGROOM.PUTFIRE`).
- **ZLATKO CLOSES IN prompts.** RUN OUT / PUSH AWAY / THROW. PowerPyx: "choose to either throw something at him, push him or make a run for the door."
- **Bottom of the stairs.** PowerPyx: "choose ⭘ to go for the back door. The front door is always locked."
- **Luther in the hallway** (escape path): "I… I'm sorry… about the little one…"
- **Zlatko's flashlight speech in the storage room** (transcript): "Think about that little girl. How… how scared she must be… Just be reasonable."
- **Cut content in the data.**
  - Luther ACCEPT / REFUSE (`X0503K.LOST.FINALE.PC.JOINCHOICE`), with Luther's refusal line "I understand… I'll show you how to find the Midnight Special."
  - A Todd-alive / Todd-dead TV report (`X0503K.LOST.TV`).
  - The storage-room finale strings (`X0602K`).

  The wiki agrees: "At the end of this chapter, the players originally had the option to not take Luther" and "The news on the tv would originally report on whether or not Kara killed Todd."

---

## 2. Choices and gates

D-numbers are player decisions. Q-numbers are execution checks (QTEs or timers). Node numbers refer to §1.

**D1. Alice's doubt (off-chart).** CAREFUL / REASSURE / COMFORT / NO CHOICE. No gate, no stated effect.

**D2 / Q1. The machine (N8 > N9 or N10).** This is both a choice and an execution test. PowerPyx: "Once you regain control of Kara, you need to interact with two things (in any order), to stop your memory being wiped out." The two things are:
- the red cart that knocks down a lamp;
- the green cable that knocks over a bottle of vodka. "Mash △ and then press ⭘ and ✕ to tear it down."

Doing nothing gives KARA IS RESET. PowerPyx: "Let the Reset-progress finish and don't do anything." GamerGuides: "by not doing anything to escape, or by taking too long to escape". The on-screen gauges are `PREPARING MEMORY WIPE`, `MEMORY WIPE PROGRESS` and `REINITIALIZATION PROGRESS`. No duration is stated.

**Escape path (N9 > N11).**
- Zlatko tells Luther: "I should be done here in ten minutes or so. I'll have a look at the little one". Luther: "Understood, Zlatko. I'll bring you the little one in 10 minutes."
- **T1 (timer).** PowerPyx: "When you go upstairs, a 10-minute-timer will start. You have to find Alice in this time, which is more than enough. If you don't do anything and let the time run out, you will get the Out of Time / Luther brought Alice to Zlatko-choices." The result is OUT OF TIME > LUTHER BROUGHT ALICE TO ZLAKTO (ending).
- Transcript ("Don't find Alice in time"): Zlatko says "I should've dismantled you from the start… Time to rectify that mistake…", then Luther: "Here's the little one, Zlatko."
- Kara page: "If Kara escapes the memory machine or recovers her memory, but fails to find Alice in time, Zlatko will kill her with a shotgun and Luther will bring Alice to him."

**Reset path (N10 > N24).**
- OBEY YOUR NEW MASTER > GO SEE LUTHER > BRING THE TRAY TO ZLATKO > DROP THE ANDROID TORSO is linear.
  - Luther: "Master's dinner's ready. Take it up to him."
  - Zlatko: "Get rid of that carcass. Uh, take it next door."
- Then **D3, the memory exploration (Q2, timer).** Kara must find enough clues before the timer ends.
  - PowerPyx: "Recollect enough Memories: The exact number varies each time depending on what you have found. You shouldn't need more than six. If you got your memory back, you can't search for more." Also: "If you don't do anything and let the 10-minute-timer run out, you will get the Lose too much Time / Luther brought Alice to Zlatko / Kara remained Reset-choices."
  - Success gives RECOLLECT ENOUGH MEMORIES > MEMORY RECOVERED > search. Failure gives LOSE TOO MUCH TIME > LUTHER BRINGS ALICE TO ZLATKO > KARA REMAINED RESET.
  - Recollection line: Kara: "Alice…". Timeout lines: "Kara! Save me, Kara! Please save me!" and Zlatko: "Oh, will you shut up?!"
- **The memory clues and what each needs.** Locations are from PowerPyx and GamerGuides; conditions are quoted from the wiki Flowchart list and PowerPyx.

| Node | Where | Condition (wiki) | Condition (PowerPyx / GamerGuides) |
|---|---|---|---|
| OBSERVE MONSTERS' CELL | Basement corridor, "check any cell downstairs" | none | none. GamerGuides: "trigger the memory of Alice being distracted by strange noises" |
| RECALL ALICE'S BOOK | Upper floor, Big Room, "on a chair next to the fireplace" (GamerGuides says "bedroom") | "If Kara saw the Alice in Wonderland book in her room in [[A New Home]]" | none stated |
| RECALL OFFERING COAT | Entrance hall coat-rack | none | none |
| RECALL ESCAPE | Upper floor bedroom, the magazine "AX400 on the Run" | "(Magazine Article AX400 on the Run)" | "Only available, if escaped stealthily in On the Run" |
| SEE NEWS FLASH OF ESCAPE | Upper floor, Big Room TV | "If Kara either robbed the supermarket in [[Fugitives]] or ran from the police in [[On the Run]]" | "Only available, if escaped via Freeway in On the Run" |
| SEE A KID THROUGH THE DOOR HOLE | Upper corridor, last door | none | none |
| RECALL DISCUSSION WITH ZLATKO | Living-room table where the tray was | none | none |
| RECALL TODD'S RED ICE PIPE | Storage room, shelf between the two doors | "If Kara washed Todd's clothes in [[A New Home]]" | none stated |
| RECALL CHANGING APPEARANCE | Mirror next to the basement stairs | none | none |
| RECALL SQUAT FIREPLACE | Big Room fireplace ("alternatively" the living-room fireplace) | "If Kara chose to stay in the squat in [[Fugitives]]" | "Only available, if slept in Squat in Fugitives." |
| RECALL RA9 SYMBOLS | Storage room corner where the torso was carried in | "If Kara saw [[Ralph]] carve the symbols in [[Fugitives]]" | "Only available, if slept in Squat in Fugitives." (GamerGuides: "if you chose to take shelter at the abandoned house") |

  So 6 clues are unconditional (monsters' cell, coat, door hole, discussion, changing appearance, and one fireplace per PowerPyx), and 5 depend on earlier chapters. The game's internal names suggest what each clue looks like: `COATRACK`, `WHISKY` (the discussion), `CRACKPIPE`, `TABLET` (the escape), `TRAY` (changing appearance), `TV`, `FIREPLACE`, `RA9`, `DOORHOLE`, `MONSTERSCELL`, `ALICEBOOK`.

**Side options on both paths (N12–N21).**
- **D4. FREE MONSTERS** (padlock). PowerPyx: "Open the cage-door in the basement, where Alice stopped in front of earlier." No gate. The cell androids speak in both states:
  - reset: "He erased her memory…", then "You must remember who you are… otherwise the little one will die…";
  - not reset: "You have to remember, for her sake…".
- **D5. FREE THE BEAR** (storage room). PowerPyx: "Open the cage, which will be beneficial later." There is a second chance during the escape: OPEN BEAR CAGE (N64), "only possible, if you haven't freed the bear before!" The wiki adds: "There is a second chance to free the bear as Kara tries to sneak away."
- **D6. Bathroom android, first encounter** (BATHROOM ANDROID IS LOUD > KILL / SPARE). PowerPyx: "There is an android in the bathtub and he will always notice you. Kill: … SHUT DOWN. Spare: … SPARE." The ALICE and DEAL options are off-chart (§1).
- **Magazines.** They are on the nightstand/table of the upper-floor bedroom.
  - READ "ARCTIC TENSIONS": PowerPyx says "is always there".
  - READ "ANDROIDS ALTER BRAIN": wiki "(If Connor chased Kara in [[On the Run]])"; PowerPyx "if escaped over Freeway".
  - READ "AX400 ON THE RUN": wiki "(If Kara evaded the police in [[On the Run]])"; PowerPyx "if stealthily escaped". The AX400_Getaway page: "Only spawns if [[Kara]] slept in the abandoned car or the motel in chapter [[Fugitives]], then made it past the police without being seen in chapter [[On the Run]]."

**D7. Search clues (after N11 or N43; all optional; no stated effect).**
- CHECK FIREPLACE EMBERS: Big Room.
- CHECK TV: Big Room. This plays the news (§6).
- CHECK EMPTY SHOTGUN: bedroom nightstand.
- RA9: storage room, "in the corner adjacent to the Workshop".

**D8. Main room (after ALICE FOUND > LUTHER GOES TO COLLECT ALICE > ENTER MAIN ROOM).**
- HIDE UNDER TABLE / HIDE IN CLOSET (there are two closets).
- SET FIRE TO HOUSE ("pick up a burning ember from the fireplace and choose to burn the house"), which leads to BURNING DOWN THE HOUSE. The house page says: "This will end the hunt early and force everyone outside for the final confrontation."
- ENTER BEDROOM ("take the left out of the two doors").
- GET SPOTTED ("let Luther spot you").

**D9. Bedroom.**
- HIDE UNDER BED / HIDE IN CLOSET "before Zlatko comes in".
- GO THROUGH CORRIDOR ("wait for Zlatko to leave the room again").
- GET SPOTTED ("don't hide or leave hideout too early").

**D10. Corridor.**
- GO THROUGH BATHROOM ("quickly press ⭘ after entering the corridor").
- GET SPOTTED ("don't enter the Bathroom quickly enough").
- The chart also draws GO THROUGH CORRIDOR straight to KARA REACHES THE STAIRS. The wiki says: "Go Through Corridor > Kara & Alice Escape to the Yard".

**D11. Bathroom, second encounter (BATHROOM ANDROID ALERTS ZLATKO > KILL / SPARE).**
- **Gate:** the android is still alive. PowerPyx: "if you haven't killed him earlier, he will alert Zlatko now. Striking a deal with him earlier doesn't work."
- KILL: "hold R1 for a bit, then R-up". SPARE: "tip the R1-button for a split-second. If done correctly, the 'silencing' will fail and he is quiet."
- Wiki footnote: "Unlocking the "spare" option requires failing the "kill android" QTE by quickly tapping R1 when facing the android, then failing the "open door" QTE by pushing up on the right stick and not completing the rotation."
- Bathtub page: "if she is quick enough, Zlatko will not be notified." If Kara stays too long after the alert, she is spotted.

**D12. Storage room (SNEAK THROUGH STORAGE ROOM).**
- OPEN BEAR CAGE: only if the bear is still caged. "Hide behind the shelf … and wait a bit to study Zlatko & Luther's patrol pattern. If you storm to the cage right away, you will get spotted."
- GET SPOTTED: "change your hiding spot at a risky time".
- ZLATKO CLOSES IN > LEAVE HIDING SPOT (RUN OUT / PUSH AWAY / THROW).
- ZLATKO CLOSES IN > BEAR ATTACKS ZLATKO AND PROTECTS KARA: **requires the bear freed.** "Stay hidden until he attacks Zlatko."

**Q3. The chase (after GET SPOTTED > CHASE STARTED).** These are QTEs.
- Pass all of them: KARA REACHES THE STAIRS.
- Fail them after being spotted at the bathroom: ZLATKO KILLED KARA IN THE BATHROOM. PowerPyx: "get spotted before / while entering the Bathroom and fail all QTE's."
- Fail them after being spotted at the storage room: ZLATKO KILLED KARA IN THE STORAGE ROOM. PowerPyx: "Only possible, if you haven't freed the bear before." Wiki: "(Only available if the bear cage is not unlocked)".
- With the bear freed: BEAR ATTACKS ZLATKO AND PROTECTS KARA (N70) > stairs. The Polar Bear page says Zlatko "shoots it twice with a shotgun, resulting in it shutting down".

**Ending sequence (no player choice).** KARA REACHES THE STAIRS > KARA & ALICE ESCAPE TO THE YARD (back door) > ZLATKO CATCHES UP, then:
- **LUTHER KILLS ZLATKO** if the monsters were **not** freed. PowerPyx: "if you haven't freed the monsters in the basement, Luther will shoot Zlatko."
- **THE MONSTERS AMBUSH ZLATKO** if they **were** freed.
- Either way, LUTHER JOINS KARA & ALICE.

**What decides whether Luther joins.** Nothing the player picks. Luther turns in every run that reaches the yard. GamerGuides: "Luther will automatically join you – you don't get to decide if you trust him or not". The transcript has Luther say "No… Not this time…" and then "I didn't want to hurt you... He programmed me to obey him... When I saw the little one risk her life to save you, it was like opening my eyes for the first time...". Kara answers "All right. I trust you." There is no option. Unused content: "Kara initially was able to choose whether or not to trust Luther".

**Who can die here.**
- **Kara.** She is shot in ZLATKO KILLED KARA IN THE STORAGE ROOM or IN THE BATHROOM. Per the Kara page and the transcript she is also killed in LUTHER BROUGHT ALICE TO ZLAKTO (escape-path timeout).
- In KARA REMAINED RESET she survives as Zlatko's servant. Kara page: "she does not interfere as Luther brings Alice to Zlatko and remains as Zlatko's slave, ending her storyline." The post-credits scene shows her eyes turned black.
- **Alice.** She is never shown dying. Alice page: "If Kara is reset and fails to recover her memories, or runs out of time, Luther finds Alice and brings her to Zlatko. She is presumably killed or experimented on." No source states her fate in the two shotgun endings (§8).
- **Luther cannot die in this chapter.**
- **Zlatko always dies** if Kara and Alice reach the yard. Wiki: "Kara can't escape without Zlatko dying."
- **Optional deaths:** the bathroom android (KILL), and the bear (shot if it attacks Zlatko). The bear survives if Kara "sets fire to the house and isn't detected or gets spotted at any given moment and fails the final QTE in the storage room".

**Summary.**
- 12 decision points: D1–D12. D1 is off-chart.
- D3 is a free-roam clue hunt, D7 is optional clue checks, and D4–D6 are optional side actions on either path.
- 3 execution checks:
  - Q1, the machine;
  - Q2, the memory timer;
  - Q3, the chase QTEs.
- 1 escape-path timer, T1 (10 minutes).
- The only branching that changes the chapter's outcome:
  - reset or not;
  - finding Alice or recovering memory in time;
  - being caught and failing the chase.
- FREE MONSTERS changes how Zlatko dies. FREE THE BEAR / OPEN BEAR CAGE removes one death ending.

---

## 3. Numbers

- **Probabilities:** none. The Zlatko page has no Probability table and no percentage, and neither do PowerPyx, GamerGuides or the transcript.
- **Timers:**
  - Escape path: 10 minutes from reaching the upper floor. PowerPyx: "When you go upstairs, a 10-minute-timer will start". In game: "I'll bring you the little one in 10 minutes."
  - Reset path: 10 minutes for memory recovery. PowerPyx: "If you don't do anything and let the 10-minute-timer run out".
  - The machine's reset gauge has no stated duration.
  - The hiding windows and chase QTEs have no stated duration.
- **Memories needed:** not fixed. "The exact number varies each time depending on what you have found. You shouldn't need more than six." (PowerPyx; GamerGuides repeats it.) There are 11 clues, 5 of them conditional.
- **Alice relationship: no stated change anywhere in this chapter.**
  - The Zlatko page has no Relationship section.
  - `Relationship_Stat` has no line that mentions Zlatko.
  - The transcript's chapter template has no relationship icon. Its only `app-relation` bindings are the two Public Opinion ones below.
  - D1 (CAREFUL/REASSURE/COMFORT/NO CHOICE), Kara's reunion line and the ending carry no icon.
- **Luther relationship:** none in this chapter. His first stated change is in The Pirates' Cove ("When Kara answers [[Luther]] about Alice's true nature"). Relationship_Stat: "Luther is the only character in the game to not have large increases or decreases regardless of the player's choices as Kara."
- **Public opinion.**
  - Zlatko page, Public Opinion: "Turning on the TV if [[Kara]] was chased by [[Connor]] in [[On the Run]] {{Icon|down}}" (small ↓).
  - Public_Opinion page, Small Decrease: "Turning on the TV in [[Zlatko]] if [[Kara]] was chased by [[Connor]] in [[On the Run]] or robbed the [[24|convenience store]] of its money in [[Fugitives]]."
  - Transcript ("Watch TV", unlock type `Tv`):
    - "Connor ran after Kara" > `RelationName.PublicOpinion`, `RelationType.SmallDown`;
    - "Kara robbed the supermarket …, in her android uniform" > `PublicOpinion`, `SmallDown`;
    - "…, in stolen clothes" > **no relation icon**.
  - Wiki note: the disguised-robbery video "does not lower Public Opinion, like the other two."
  - Public_Opinion notes elsewhere: "Kara's actions can only decrease public opinion by a small amount with a total of four times."
- **Software instability:** not applicable (Connor only).
- **No stated number** for: the machine, any memory clue, FREE MONSTERS, FREE THE BEAR / OPEN BEAR CAGE, KILL / SPARE (either encounter), the magazines, the search clues, any hiding choice, SET FIRE TO HOUSE (inside this chapter), the chase, or Luther joining.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Reaching the chapter.** The chapter needs Kara and Alice to have survived On the Run, i.e. not KARA & ALICE DIED ON THE HIGHWAY. The overview places it after Time to Decide. The address comes from the trash collector in Fugitives: "receiving information about [[Zlatko Andronikov|Zlatko]]'s house from an android trash collector". The house page names it as "an WR600 trash collector android".
- **A New Home.**
  - RECALL ALICE'S BOOK: "If Kara saw the Alice in Wonderland book in her room in [[A New Home]]".
  - RECALL TODD'S RED ICE PIPE: "If Kara washed Todd's clothes in [[A New Home]]" (REWASH CLOTHES / FIND RED ICE; see ch04 note §4).
- **Fugitives.**
  - RECALL SQUAT FIREPLACE: stayed in the squat.
  - RECALL RA9 SYMBOLS: saw Ralph carve rA9 (wiki) or stayed in the squat (PowerPyx).
  - SEE NEWS FLASH OF ESCAPE / TV: "robbed the supermarket" (wiki). The broadcast script says "held up at gunpoint" (§6). Which robbery report plays depends on whether Kara wore the stolen laundromat clothes during the robbery.
  - The Kara page: "if she stays in the abandoned car but does not take the jacket, she can remain in her uniform until after "Zlatko"". The wiki also notes: "If Kara still has her uniform and has her memory erased, her name will not show up on her uniform until she regains her memory."
- **On the Run.**
  - Chased (spotted, freeway): the "ANDROIDS ALTER BRAIN" magazine, the highway TV report (opinion small ↓) and SEE NEWS FLASH OF ESCAPE.
  - Evaded unseen: the "AX400 ON THE RUN" magazine and RECALL ESCAPE.
- **Not used here:** the Stormy Night gun, Todd alive or dead (a cut TV report only), and the Ralph meal.

### Out of this chapter

- **Luther** (every LUTHER JOINS KARA & ALICE). He joins Kara and Alice. They take Zlatko's car into The Pirates' Cove ("Kara, Alice, and [[Luther]] are in [[Zlatko Andronikov|Zlatko]]'s car"). Every later Luther branch depends on this: Midnight Train, Crossroads and Battle for Detroit.
- **The Jerrys.** **No Zlatko choice affects them.** They are first met in The Pirates' Cove, and their later counts depend on Luther's survival after this chapter. The Jerry page says "one or two (if Luther died in a previous chapter…)". No source links a Zlatko node to the Jerrys.
- **FREE MONSTERS (padlock).**
  - In this chapter: THE MONSTERS AMBUSH ZLATKO instead of LUTHER KILLS ZLATKO.
  - In Battle for Detroit (recall center): Battle_for_Detroit, "Talk to Scarred Android (if freed in [[Zlatko]])" (both in the enclosure and in the line). The game string is `MENU.FLOWCHART.04A.KB.GC.ZLATKO = FREED IN 'ZLATKO'` and `…ENCLOSTALKZLATKO = TALK TO SCARRED ANDROID`.
  - Scarred android page: "If freed in "[[Zlatko]]", she and her fellow androids have been captured by the [[U.S. Army]] and sent to the [[Recall Center Nº5|recall center]]", and "the scarred android will offer to help distract the soldier so Kara can go to Alice."
  - Zlatko notes: "The Monster Androids can later appear in the recall center if Kara got captured."
- **SET FIRE TO HOUSE.**
  - The Pirates' Cove, Public Opinion: "Continuing watching news, if the house has been burned in [[Zlatko]] {{Icon|down}}".
  - Public_Opinion: "Changing the radio channel at least 4 different times in the car at the start of The Pirates' Cove (Only if Kara set fire to Zlatko's mansion during 'Zlatko')" (small ↓).
  - House page: "If Kara burned the mansion, she has the option to hear a news report about it from [[Michael Webb]] detailing the house fire. A body along with dozens of androids were discovered in the wreckage."
- **The bear, the bathroom android, hiding choices, magazines and memory clues:** no stated carry-forward.
- **KARA REMAINED RESET** ends Kara's storyline and adds the post-credits servant scene. LUTHER BROUGHT ALICE TO ZLAKTO and both ZLATKO KILLED KARA endings end it too.

---

## 5. Endings

| Chart label | Icon | Conditions | Carries forward |
|---|---|---|---|
| LUTHER BROUGHT ALICE TO ZLAKTO | yellow no-entry | Escape path (or memory recovered) with the 10-minute timer expiring before ALICE FOUND: OUT OF TIME. | Kara killed by Zlatko (Kara page), Alice taken ("presumably killed or experimented on"). Kara's story ends. |
| KARA REMAINED RESET | yellow no-entry | Reset path, timer expires before enough memories: LOSE TOO MUCH TIME > LUTHER BRINGS ALICE TO ZLATKO. | Kara survives as Zlatko's servant (post-credits, black eyes). Alice presumed dead. Kara's story ends. |
| ZLATKO KILLED KARA IN THE STORAGE ROOM | yellow no-entry | GET SPOTTED > CHASE STARTED, caught at the storage room, chase QTEs failed, bear **not** freed. | Kara dead. Alice's fate not stated. Story ends. |
| ZLATKO KILLED KARA IN THE BATHROOM | yellow no-entry | GET SPOTTED > CHASE STARTED, caught at the bathroom, chase QTEs failed. | Kara dead. Alice's fate not stated. Story ends. |
| LUTHER JOINS KARA & ALICE | none | KARA REACHES THE STAIRS > ESCAPE TO THE YARD > ZLATKO CATCHES UP > LUTHER KILLS ZLATKO (monsters caged) or THE MONSTERS AMBUSH ZLATKO (monsters freed). | Luther with Kara and Alice. Zlatko dead. Freed monsters can reach the recall center. A fire triggers the Pirates' Cove news. |

---

## 6. Media

- **Magazines** are in the upper-floor bedroom. Magazine page: #34, #35, #41, all *Detroit Today*.
  - **#34 "Arctic Tensions Escalate"** (chart: READ "ARCTIC TENSIONS"). Always present. Cover lines: "American ships fired on"; "UN warns of World War Three"; "[[President Warren]] at 33% approval". Facts:
    - "A Russian aircraft carrier is reported to have fired on an American patrol boat in the arctic, with the US vessel returning fire. Neither ship was damaged."
    - Warren "called Russia's activity in the Arctic "a crime against the international community"" and branded [[Artem Ivanoff]] "a dangerous individual".
    - "Many international relations experts are saying an armed conflict is inevitable."
  - **#35 "How Androids Alter Your Brain"** (chart: READ "ANDROIDS ALTER BRAIN"). Present if Connor chased Kara in On the Run. Cover lines: "Talking to machines is changing the way we communicate"; "[[CyberLife]] world's first trillion dollar company"; "Global population reaches 10 billion". Facts:
    - "Most people spend more time talking to [[android]]s, smartphones tablets, and entertainment systems than they do other people."
    - "'command-led communication', is characterized by instructions and orders rather than persuasion, humor, or intimacy", with "persuasion skills getting weaker through lack of use".
    - Adolescents have "highly limited social skills".
  - **#41 "AX400 Getaway"** (chart: READ "AX400 ON THE RUN"). Present if Kara evaded the police unseen. Reading it during the reset gives RECALL ESCAPE. Cover: "RUNAWAY ANDROID STILL AT LARGE". Facts:
    - "An [[android]] was pursued through a [[Detroit]] suburb today".
    - It "may in fact be the same android that was recently reported missing".
    - Witnesses say it "was dressed like a human" and had no LED, but "the presence of a certain Lieutenant [[Hank Anderson]] … suggests the suspect was in fact a machine".
    - It "remains at large and is believed to be highly dangerous".
    - Note: it names "Ferndale Station".
  - Public-opinion effect: none for any magazine.
- **TV (Big Room, CHECK TV / SEE NEWS FLASH OF ESCAPE).** Channel 16, Michael Webb. The wiki says: "The TV can show three different reports, depending on Kara's previous actions."
  - **Chased by Connor.** Opinion small ↓. Headline: "POLICE CHASE ENDS IN DESTRUCTION OF TWO DEFECTIVE ANDROIDS". Script: "a young woman and a little girl were trying to escape from the police … The chase is reported to have ended on a freeway, where the two fugitives risked their lives to cross the traffic. … Further unconfirmed reports suggest the fugitives were two defective androids on the run."
  - **Robbed in uniform.** Opinion small ↓. Headline: "AX400 AND LITTLE GIRL ROB DETROIT SUPERMARKET AT GUNPOINT". Script: "held up at gunpoint last night. The cashier reports that he was attacked by an android in the company of a little girl. … it would be the first case of an android conducting an armed robbery. … the same AX400 that was reported missing this morning."
  - **Robbed in stolen clothes.** No opinion change. Headline: "YOUNG WOMAN AND LITTLE GIRL ROB DETROIT SUPERMARKET AT GUNPOINT". Script: "attacked by a young woman in the company of a little girl. The police have not ruled out the possibility of the culprit being the AX400 model that was reported missing this morning."
  - Ticker: "Police search in Camden, Detroit rumored to be linked with 'fugitive' AX400. | DPD declined to make official statement, but officers seen searching Camden district. | Android band Here4U tipped to sweep the board at upcoming music awards."
- **Cut:** a Todd-alive / Todd-dead TV report (`X0503K.LOST.TV`).

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has five chapter-17 scenes, in this order: K10 (execution-policy), R17 (media), K11, K12, K13. Engine logic in `benchmark/story-engine.mjs`:
- consequences at lines 211–215;
- media predicates `chase` / `noChase` / `robberyUniform` / `robberyDisguise` at lines 31–33;
- the generic Kara gate at line 59;
- `monstersFreed` used by K28 at line 162 and line 291;
- `fire` feeding R21 (The Pirates' Cove) at line 34;
- the Luther "Dead" / "Never met" report logic at line 360.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| LOOK FOR HELP … CLIMB INTO THE MACHINE, ALICE ATTRACTED BY ODD NOISES | folded into the K10 situation | Acceptable as narration. Errors in K10's situation: it says Alice "is somewhere upstairs with him", but Zlatko is in the basement and orders Luther to "lock it up". "Your arms are almost free" is unsourced. |
| Alice's doubt (CAREFUL/REASSURE/COMFORT/NO CHOICE) | none | Missing. It has no stat, so it can be omitted or narrated. |
| KARA IS BEING RESET > ESCAPE BEFORE BEING RESET / KARA IS RESET | K10 options 0 (fight, `risk: 0.25`) / 1 (stop struggling, `risk: 0.4`) | Structure covered. **Both risk figures are unsourced** (§3). The engine (line 211) turns a failed escape into a wipe followed by an automatic memory recovery. In the game a failed escape is just KARA IS RESET, and Kara then faces the same memory timer. |
| Reset path: OBEY YOUR NEW MASTER > GO SEE LUTHER > BRING THE TRAY > DROP THE ANDROID TORSO | narrated in K10 outcomes | Acceptable as narration. |
| EXPLORE THE HOUSE TO RECOVER MEMORY, 11 clues, RECOLLECT ENOUGH MEMORIES / LOSE TOO MUCH TIME | K10 option 1's risk roll | **Missing as a scene.** None of the five conditional clues (book, pipe, escape article, news flash, fireplace, rA9) is modelled, so earlier choices have no effect on recovery. |
| KARA REMAINED RESET | K10 option 1 fail: `karaActive=false; kara=false`, karaOutcome "…stayed in {{Zlatko}}'s house as his servant while {{Alice}} was taken away" | Ending covered. But `s.alice` stays `true`, while the wiki says Alice is "presumably killed or experimented on". `s.kara=false` marks Kara as dead even though she survives as a servant; check how reports render this. |
| Escape-path timer: OUT OF TIME > LUTHER BROUGHT ALICE TO ZLAKTO | none | **Missing ending.** No scene asks Kara to find Alice in time, and nothing kills Kara on the escape path. |
| FREE MONSTERS (padlock) / cell dialogue | K11 options 0 / 1; `monstersFreed` | Covered. Used correctly in K13's outcome text (monsters vs Luther) and K28's scarred-android option. K11's situation ("Searching the mansion for {{Alice}}") is fine. In game, freeing them is also possible on the reset path, where they urge Kara to remember. |
| ENTER STORAGE ROOM > FREE THE BEAR | folded into K13 option 2 | **Mislabelled.** The bear is caged in the storage room, not "in the hall". Freeing it can happen before the escape (N14) or during it (OPEN BEAR CAGE). Freeing it removes the storage-room death and makes the bear attack Zlatko. |
| ENTER BATHROOM > BATHROOM ANDROID IS LOUD > KILL / SPARE | K12 options 0 / 1; no state set | Partly covered. ALICE and DEAL are missing. **No downstream effect:** in game, a spared android alerts Zlatko on the bathroom route (BATHROOM ANDROID ALERTS ZLATKO > KILL / SPARE). K12's situation is wrong: the android is "submerged" and Zlatko and Luther "are hunting you". At the first encounter the hunt has not started, and the android lies limbless in the tub. |
| READ ×3 magazines | R17 media | Arctic Tensions is correct. **AX400 Getaway (`when: chase`) and How Androids Alter Your Brain (`when: noChase`) are reversed** against the wiki, PowerPyx, GamerGuides and the AX400_Getaway page. All of them tie Brain to the chase and AX400 to evading. This was already flagged in the ch13 note. R17 also puts the TV in the bedroom; it is in the Big/Main Room. |
| CHECK TV / SEE NEWS FLASH OF ESCAPE | R17 tv items: `chase` (−1), `robberyUniform` (−1), `robberyDisguise` (0) | Consistent with the transcript's three reports and their icons. The robbery predicates require `robbery==='gun'`, which matches the broadcast ("held up at gunpoint"). But the wiki says just "robbed the supermarket", and DRAW GUN + TAKE MONEY (Fugitives) never sets `robbery`. `!s.chase` gives the highway report precedence; no source states which plays when both apply (§8). |
| CHECK FIREPLACE EMBERS, CHECK EMPTY SHOTGUN, RA9 | none | Missing; no stated effect, so acceptable to omit. |
| ALICE FOUND, LUTHER GOES TO COLLECT ALICE | K13 situation ("You have found {{Alice}} hiding") | Acceptable. |
| Main room / bedroom / corridor / bathroom / storage room hiding routes; SET FIRE TO HOUSE > BURNING DOWN THE HOUSE | K13 options 0 (hide, `risk: 0.2`), 1 (fire, `risk: 0.3`), 2 (bear, `risk: 0.25`) | **Collapsed; all three risks are unsourced.** Problems with the failure texts: (a) option 1, "The fire drew {{Zlatko}} straight to them", has no source. The only death nodes follow GET SPOTTED > CHASE STARTED, in the bathroom or storage room. (b) Option 2, "The bear turned on {{Kara}}", contradicts the sources: the bear "does not actually attack her if she unlocks the cage" and protects her. (c) Freeing the bear should lower the risk (it removes the storage-room death), but it has the second-highest figure. |
| GET SPOTTED > CHASE STARTED > ZLATKO KILLED KARA IN THE STORAGE ROOM / BATHROOM, BEAR ATTACKS ZLATKO | K13 failure (`kara=false; alice=false`) | Partly covered. The two death endings are merged into K13's per-option texts. `alice=false` is an assumption (§8). |
| KARA REACHES THE STAIRS > ESCAPE TO THE YARD > ZLATKO CATCHES UP > LUTHER KILLS ZLATKO / THE MONSTERS AMBUSH ZLATKO > LUTHER JOINS KARA & ALICE | K13 success: `luther=true; lutherWith=true`; event text by `monstersFreed` | Covered and correct, including "Luther asks to come with you" with no choice. `fire=true` on option 1 feeds R21's fire report (−1), which matches the Pirates' Cove and Public_Opinion lines. |
| Alice / Luther relationship | none applied in chapter 17 | Correct: no source gives a change. |

---

## 8. Open questions

1. **rA9 memory condition.** The wiki says "If Kara saw [[Ralph]] carve the symbols in [[Fugitives]]". PowerPyx and GamerGuides say it needs the squat night. Can Kara see Ralph carve without staying (meet Ralph, then LEAVE SQUAT), and does that unlock the clue?
2. **News-flash memory condition.** The wiki says robbery **or** On the Run chase. PowerPyx and GamerGuides say "only if escaped over the highway". Does a robbery report alone give SEE NEWS FLASH OF ESCAPE? Does CHECK TV (search) need any report to exist?
3. **TV precedence.** The transcript lists the chase report and the two robbery reports as two separate condition groups. If Kara both robbed the store and was chased, which report plays, and does she take one or two opinion decreases? (Kara is capped at four small decreases in total.)
4. **Which robberies count.** The broadcast says "held up at gunpoint". Does the Fugitives diversion theft (STEAL DISCREETLY) produce no report? Does DRAW GUN + TAKE MONEY count as a hold-up?
5. **Alice's book and Todd's pipe.** PowerPyx lists no condition for either. The wiki gates them on A New Home. Do the objects appear in the house without the earlier scenes, or only the memory link?
6. **Squat fireplace.** PowerPyx gives two fireplaces (Big Room, "alternatively" the living room). Is one of them an unconditional fireplace memory?
7. **Is the escape-path timeout a Kara death?** The chart gives LUTHER BROUGHT ALICE TO ZLAKTO a no-entry icon, not a skull. The Kara page and Zlatko's line ("Time to rectify that mistake…") say Kara is killed. Confirm in game.
8. **Alice in the shotgun endings.** No source says what happens to Alice in ZLATKO KILLED KARA IN THE STORAGE ROOM / BATHROOM. The engine sets her dead.
9. **BURNING DOWN THE HOUSE edge.** The chart's outgoing edge isn't legible. The house page says fire "force[s] everyone outside", but the bear page implies Kara can still be detected after the fire. Can Kara be spotted, and killed, after setting the fire, or does the fire always lead to the stairs?
10. **Can the machine escape fail in a way the player didn't choose?** PowerPyx and GamerGuides imply the reset happens only if Kara does nothing or is too slow. Is there a QTE failure state, and how long is the reset gauge?
11. **Number of memories.** "Varies each time … shouldn't need more than six". Is it fixed per save, or random? Does it depend on how many conditional clues exist?
12. **Bathroom-android spare QTE.** The wiki's footnote describes a fail-to-kill, fail-to-open-door trick for the second SPARE node. Is SPARE (copy 2) an intended choice, or a QTE quirk?
13. **GO THROUGH CORRIDOR > KARA REACHES THE STAIRS.** The chart and wiki show the corridor can lead straight to the stairs without the bathroom or storage room. What triggers that route?

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; the chapter link)
- https://www.powerpyx.com/detroit-become-human-zlatko-walkthrough-100/ (walkthrough text: house layout; the machine interactions; the 10-minute timers; clue locations and conditions; "shouldn't need more than six"; hiding, bear and bathroom rules; chase outcomes; Luther vs monsters)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-flowchart-100.jpg (100% overview; layout, edges, PowerPyx's last path)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-beginning-100.jpg (legible N1–N10; header PUBLIC OPINION SKEPTICAL / ALICE WARM)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-middle.jpg (both paths, side branches, OUT OF TIME, the three non-success endings; pre-100% red-padlock slots; FREE MONSTERS padlock)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-explore-100.jpg (legible side branches, all three magazines, the 11 memory clues, LOSE TOO MUCH TIME / RECOLLECT ENOUGH MEMORIES)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-search.jpg (ending labels incl. "ZLAKTO", MEMORY RECOVERED, the four search clues, ALICE FOUND)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-alice-found-branch.jpg (legible hiding/sneaking routes N49–N68)
- https://www.powerpyx.com/wp-content/uploads/detroit-zlatko-chase.jpg (CHASE STARTED, the two shotgun endings, stairs, yard, LUTHER KILLS ZLATKO / THE MONSTERS AMBUSH ZLATKO, LUTHER JOINS KARA & ALICE with no icon)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json (chapter page: infobox, Flowchart list with clue conditions, Public Opinion, Attention to Detail, Notes on TV reports, bear and bathroom android, Unused Content; saved as /tmp/flowcharts/ch17/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=query&list=search&srsearch=Zlatko%20chapter&format=json (title search; `Zlatko_(chapter)` does not exist)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings, `nri`)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (Zlatko TV small decrease; Pirates' Cove radio after the fire; Kara's four-decrease cap)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (no Zlatko entries; Luther levels; Luther has no large changes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (#34, #35, #41 located in Zlatko)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Arctic_Tensions_Escalate&prop=wikitext&format=json (article text)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=How_Androids_Alter_Your_Brain&prop=wikitext&format=json (article text)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=AX400_Getaway&prop=wikitext&format=json (article text; spawn condition; Ferndale note)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json (Luther's turn; later chapters)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko_Andronikov&prop=wikitext&format=json (Zlatko's deaths by Luther or the creatures)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko_Andronikov's_House&prop=wikitext&format=json (trash-collector address; fire ends the hunt; Pirates' Cove fire report)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko's_Creatures&prop=wikitext&format=json (cell dialogue; recall-center reappearance)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Scarred_Android&prop=wikitext&format=json (freed in Zlatko > recall center; distraction offer)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Polar_Bear_Android&prop=wikitext&format=json (bear never attacks Kara; shot by Zlatko; survival cases; Open Cage condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Bathtub_Android&prop=wikitext&format=json (four options; second-encounter alert; spare by failed QTE)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (chapter summary; Kara deaths incl. timeout; reset post-credits; uniform note)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (Alice presumed killed if Kara is reset or out of time)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Pirates'_Cove&prop=wikitext&format=json (fire news opinion decrease; Zlatko's car)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json ("Talk to Scarred Android (if freed in [[Zlatko]])")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jerry&prop=wikitext&format=json (no Zlatko dependency)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json (chase vs evade context; via the ch13 note)
- https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/zlatko (used to cross-check conditions; mirrors PowerPyx; "Luther will automatically join you")
- https://detroitbecometext.github.io/chapters/17 (fan transcript; read from https://detroitbecometext.github.io/i18n/en.json and the template chunk https://detroitbecometext.github.io/chunk-JCLJBPDO.js, copies in /tmp/flowcharts/ch17/dbt/: all dialogue, D1 and bathroom choice labels, TV scripts and their public-opinion icons, unlock conditions, flowchart label strings, cut Luther ACCEPT/REFUSE)

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/17-zlatko-chapter-content/zlatko-chapter-content.component.html`, read raw from GitHub (`master`) on 2026-11-06 and resolved against `en.json` by `/tmp/dbt-scripts/render1724.py`. The rendered outline is also saved as `/tmp/dbt/ch17.txt`.

Outline legend: `#` headings are the template's own section titles (written by the transcribers, not game text). `PROMPT n` is an `app-choice-group`; `OPTION "LABEL"` is an `app-choice-item` with its game label (`bracketed` = shown in brackets on the site, used for options that need an unlock; `timeout` = the time-out branch). `ARROW Name Type` is an `app-relation` (gauge name from `GUI.GAUGE.*`). `OBSERVATION [label]` / `CLUE title / subline / subline` are `app-observation` / `app-observation-item`. `IF:` is the condition text of an `app-conditioned-content` (transcriber wording). `[UNLOCK TYPE]` is an `app-unlock-condition` (LOCK = needs an earlier action, DEATH, TIME = timer runs out, TV). `UNUSED/CUT:` is an `app-unused-content` block. Dialogue is shown only inside options and cut blocks, at most two lines each, cut at 110 characters.

**Counts.** Live prompts: 2 (8 options). Observations: 0 groups, 0 clues. Live arrows: 2. Unlock conditions: 3. Cut blocks: 1 (containing 0 prompts, 0 options, 0 arrows).

### 10.1 Rendered outline

```text
# At Zlatko's house
PROMPT 1:
  OPTION "CAREFUL"
    Kara: I know. I don't trust him either… We have to be careful…
  OPTION "REASSURE"
    Kara: It'll be okay, Alice. He's going to remove my Tracker and then we can start over again in Canada. You want ...
  OPTION "COMFORT"
    Kara: He's a bit odd… but I think we can trust him. We don't have much of a choice anyway.
  OPTION "NO CHOICE"
    Kara: Alice, we have nowhere else to go… We have to trust him.
UNUSED/CUT:
  Zlatko: I didn't tell you about that... I'm a bit of a handyman in my spare time... I like to... amuse myself by pl...
## Looking at the cell
## Opening the cells
CONDITION GROUP:
  IF: Kara was reset
  IF: Kara wasn't reset
CONDITION GROUP:
  IF: Kara was reset
    ## Go see Luther
    ## Bring the tray to Zlatko
    ## Recollect enough memories
    ## [UNLOCK TIME] Take too much time
  IF: Kara wasn't reset - Search house for Alice
    ## Looking at Luther in the hallway
    ## See android in bathtub
    ## Talk to the android in the bathtub
    PROMPT 2:
      OPTION "SHUT DOWN"
      OPTION "ALICE"
        Kara: I'm looking for a little girl. Have you seen her?
        Android: A little girl? No, no, no, I haven't seen her.
      OPTION "DEAL"
        Kara: Will you be quiet if I let go?
        Android: Yes, yes, I promise to be quiet. Don't turn me off.
      OPTION "SPARE"
        Kara: No… No, of course not…
    ## [UNLOCK TV] Watch TV
    CONDITION GROUP:
      IF: Connor ran after Kara in On The Run
        ARROW PublicOpinion SmallDown (PUBLIC OPINION)
    CONDITION GROUP:
      IF: Kara robbed the supermarket in On The Run, in her android uniform
        ARROW PublicOpinion SmallDown (PUBLIC OPINION)
      IF: Kara robbed the supermarket in On The Run, in stolen clothes
    ## [UNLOCK TIME] Don't find Alice in time
## Find Alice
CONDITION GROUP:
  IF: Set fire to the house
  IF: Hide
    ### Hide in the main room
    ### Hide in the bedroom
    ### Go in the bathroom
    CONDITION GROUP:
      IF: Saw the android while searching for Alice
      IF: Didn't see the android
    ### Sneak through the storage room
    ### Get spotted
## Outside the house
CONDITION GROUP:
  IF: Freed the androids in the basement
  IF: Didn't free the androids
```

### 10.2 Flowchart node labels as the game prints them (`MENU.FLOWCHART.05K.*`)

The table also holds labels for cut or patched-out nodes; presence here does not prove a node is reachable.

```text
START = LOOK FOR HELP
REACHZLATKOSHOUSE = REACH ZLATKO'S HOUSE
ENTERHOUSE = ENTER THE HOUSE
MEETZLATKO = MEET ZLATKO
FOLLOWZLATKOBASEMENT = FOLLOW ZLATKO TO THE BASEMENT
CLIMBINMACHINE = CLIMB INTO THE MACHINE
ALICEATTRACTEDBYNOISES = ALICE ATTRACTED BY ODD NOISES
KARABEINGRESET = KARA IS BEING RESET
ESCAPEBEFOREEND = ESCAPE BEFORE BEING RESET
KARAISRESET = KARA IS RESET
INFILTRATEHOUSE = SNEAK THROUGH HOUSE
OBEYYOURNEWMASTER = OBEY YOUR NEW MASTER
FREEMONSTERS = FREE MONSTERS
GOSEELUTHER = GO SEE LUTHER
BRINGTRAYTOZLATKO = BRING THE TRAY TO ZLATKO
DROPANDROIDTORSO = DROP THE ANDROID TORSO
SANDBOXEXPLOREHOUSEFORMEMORY = EXPLORE THE HOUSE TO RECOVER MEMORY
DOORHOLE = SEE A KID THROUGH THE DOOR HOLE
ALICEBOOK = RECALL ALICE’S BOOK
COATRACK = RECALL OFFERING COAT
WHISKY = RECALL DISCUSSION WITH ZLATKO
CRACKPIPE = RECALL TODD’S RED ICE PIPE
MONSTERSCELL = OBSERVE MONSTERS’ CELL
TABLET = RECALL ESCAPE
TRAY = RECALL CHANGING APPEARANCE
FIREPLACE = RECALL SQUAT FIREPLACE
RA9 = RECALL RA9 SYMBOLS
TV = SEE NEWS FLASH OF ESCAPE
ENTERBATHROOM = ENTER BATHROOM
ANDROIDBATHROOMLOUD = BATHROOM ANDROID IS LOUD
KILLBATHROOMANDROID = KILL
SPAREBATHROOMANDROID = SPARE
ENTERSTORAGEROOM = ENTER STORAGE ROOM
FREEBEAR = FREE THE BEAR
LOSETOOMUCHTIMERECOVER = LOSE TOO MUCH TIME
SAWENOUGHMEMORIES = RECOLLECT ENOUGH MEMORIES
SEARCHFORALICE = SEARCH HOUSE FOR ALICE
MEMORYRECOVERED = MEMORY RECOVERED
KARAREMAINSRESET = KARA REMAINED RESET
ALICEFOUND = ALICE FOUND
LUTHERCOMESTOTAKEALICE = LUTHER GOES TO COLLECT ALICE
ENTERBIGROOM = ENTER MAIN ROOM
HIDEUNDERTABLEBIGROOM = HIDE UNDER TABLE
HIDEINCLOSETBIGROOM = HIDE IN CLOSET
ENTERINBEDROOM = ENTER BEDROOM
GETSPOTTEDBIGROOM = GET SPOTTED
SETFIRETOHOUSE = SET FIRE TO HOUSE
HOUSEISBURNING = BURNING DOWN THE HOUSE
HIDEUNDERBED = HIDE UNDER BED
HIDEINCLOSETBEDROOM = HIDE IN CLOSET
GOTHROUGHCORRIDOR = GO THROUGH CORRIDOR
GETSPOTTEDINBEDROOM = GET SPOTTED IN THE BEDROOM
GETSPOTTEDINCORRIDOR = GET SPOTTED IN THE CORRIDOR
GOTHROUGHBATHROOM = GO THROUGH BATHROOM
GETSPOTTEDINBATHROOM = GET SPOTTED IN THE BATHROOM
ANDROIDALERTSZLATKO = BATHROOM ANDROID ALERTS ZLATKO
SNEAKINSTORAGEROOM = SNEAK THROUGH STORAGE ROOM
KILLANDROIDALERT = KILL
SPAREANDROIDALERT = SPARE
GETSPOTTEDINSTORAGEROOM = GET SPOTTED IN THE STORAGE ROOM
OPENBEARCAGEAFTERSNEAKIN = OPEN BEAR CAGE
KARAREACHESTHESTAIRS = KARA REACHES THE STAIRS
CHASESTARTED = CHASE STARTED
KARAANDALICERUNGARDEN = KARA & ALICE ESCAPE TO THE YARD
BEARATTACKSZLATKO = BEAR ATTACKS ZLATKO AND PROTECTS KARA
KARAKILLEDINBATHROOM = ZLATKO KILLED KARA IN THE BATHROOM
KARAISKILLEDINSTORAGEROOM = ZLATKO KILLED KARA IN THE STORAGE ROOM
ZLATKOCLOSESONTHEM = ZLATKO CATCHES UP
LUTHERKILLSZLATKO = LUTHER KILLS ZLATKO
MONSTERSATTACKZLATKO = THE MONSTERS AMBUSH ZLATKO
LUTHERJOINSKARAANDALICE = LUTHER JOINS KARA & ALICE
TOOMUCHTIME = OUT OF TIME
FAILALICE = LUTHER BROUGHT ALICE TO ZLAKTO
ENTERCELL = ENTER MONSTERS' CELL
FIREPLACENORESET = CHECK FIREPLACE EMBERS
TVNORESET = CHECK TV
SHOTGUN = CHECK EMPTY SHOTGUN
RA9NORESET = RA9
TABLETNORESET = FIND MAGAZINE
KARAREMAINSRESETBEFORE = LUTHER BRINGS ALICE TO ZLAKTO
MAGAZINE = READ MAGAZINE
MAGAZINE1ST = READ "ARCTIC TENSIONS"
MAGAZINE2ND = READ "ANDROIDS ALTER BRAIN"
BEARATTACKSZLATKO2 = BEAR ATTACKS ZLATKO AND PROTECTS KARA
BEARATTACKSZLATKO3 = BEAR ATTACKS ZLATKO AND PROTECTS KARA
ZLATKOCLOSER = ZLATKO CLOSES IN
EXITHIDINGSPOT = LEAVE HIDING SPOT
MAGAZINE3RD = READ "AX400 ON THE RUN"
```

### 10.3 Disagreements with sections 1 to 3

Rule (README item 10): the template and string table win for labels, prompts, arrows and clue text; the flowchart image wins for node order; the wiki wins where the template is silent. The template's condition wording and nesting are the transcribers' reconstruction (transcript tier, below the wiki), so the wiki wins on gating.

1. **N40 spelling.** §1 says N40 is "spelled correctly" as LUTHER BRINGS ALICE TO ZLATKO (also §2, §5). The string table has `MENU.FLOWCHART.05K.KARAREMAINSRESETBEFORE = LUTHER BRINGS ALICE TO ZLAKTO`, the same misspelling as N23 (`FAILALICE`). The game text wins for the label: quote it as LUTHER BRINGS ALICE TO ZLAKTO, unless the operator sees ZLATKO on screen (then the two strings differ by patch, and the screen wins).
2. **Cut line missing from §1.** The template's only `app-unused-content` block is part of Zlatko's workshop speech (`X0501K.WORKSHOP.ROLLERCOASTER.PC.X05KZLATKO.TRACKER`, values 16 to 28: "I'm a bit of a handyman in my spare time... I like to... amuse myself by playing God..."). §1's cut list (Luther ACCEPT / REFUSE, the Todd TV report, `X0602K`) does not mention it. Conversely, none of the three items in §1's cut list is marked as cut in this template; they rest on the wiki Trivia and on string presence. Both lists stand; add the speech fragment to the cut list. Not to be built.
3. **Path nesting.** The template transcribes the bathroom android talk (PROMPT 2), the TV and the escape-path timeout only under "Kara wasn't reset - Search house for Alice". §1 B and §2 (wiki) put the bathroom android, TV and magazines on both paths. The template is a single transcribed path, not a gate; the wiki wins: both paths.
4. **Template error, not a note error.** Both TV conditions say Kara "robbed the supermarket in On The Run". The robbery is in Fugitives (wiki, Public_Opinion). §3 is right.

Agreements (no action): PROMPT 1 labels CAREFUL / REASSURE / COMFORT / NO CHOICE with no arrow (matches §1 and §3); PROMPT 2 labels SHUT DOWN / ALICE / DEAL / SPARE with no arrow (matches §1 D6); exactly two arrows in the chapter, both Public Opinion small down on the TV (chase report, uniform-robbery report), none on the stolen-clothes report (matches §3); two TIME unlocks (reset path "Take too much time" > KARA REMAINED RESET, escape path "Don't find Alice in time" > Luther brings Alice) and one TV unlock (matches §2 T1 and Q2). The template has **no observation items**: none of the 11 memory clues or 4 search clues has template text, so their wording comes from the flowchart labels in 10.2. The ember prompt SET FIRE / PUT BACK and the RUN OUT / PUSH AWAY / THROW prompts cited in §1 are string-table entries; the template does not render them as choice groups (it renders only the conditions "Set fire to the house" and "Hide").

### 10.4 Disagreements with the benchmark (story.json 1.6.0: K10, R17, K11, K12, K13)

Engine sizes are read as ±1 = small arrow, ±2 = large arrow.

1. **PROMPT 1 is missing.** Alice's doubt on the way to the basement (CAREFUL / REASSURE / COMFORT / NO CHOICE) has no scene. Add it as a decision scene before K10 with the four game labels and no effect.
2. **PROMPT 2 is missing two options.** K12 offers "Shut him down." and "Leave him and move on quietly."; the template has SHUT DOWN / ALICE / DEAL / SPARE. ALICE and DEAL are absent.
3. **PROMPT 2 labels differ.** K12's two options paraphrase SHUT DOWN and SPARE. Use the game labels.
4. **TV report exclusivity.** R17 charges Public Opinion −1 for the chase report (`when: chase`) and −1 for the uniform-robbery report (`when: robberyUniform`), none for the disguise report: character and size match the template. But `MEDIA_WHEN.robberyUniform` and `robberyDisguise` require `!s.chase`, so a Kara who robbed in uniform and was then chased sees only the chase report. The template puts the two reports in separate condition groups, which reads as both playing. The wiki ("chased by Connor … or robbed") does not settle it: open question for the operator (does the TV show both reports?).
5. **Escape-path timeout not modelled.** The template's "Don't find Alice in time" (TIME unlock: Zlatko shoots Kara, Luther brings Alice; ending LUTHER BROUGHT ALICE TO ZLAKTO) has no counterpart: K10 option 0 always continues, and no scene can time out on the escape path. The reset-path TIME unlock maps to K10 option 1's risk failure (KARA REMAINED RESET), which is present.

No arrow is applied by the engine in K10 to K13, and the template has none there: correct. No cut content is built: correct. The memory and search clue hubs (§1 D, E) are missing from the benchmark, but that is a flowchart gap already listed in §7, not a template one.
