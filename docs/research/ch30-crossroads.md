# Chapter 30: Crossroads (Kara, Markus, Connor)

This is the research note for rebuilding the chapter's scenes. It was written on 2026-11-06.

**Sources.**
- PowerPyx's three walkthrough pages (Kara, Markus and Connor), with their flowchart screenshots and reader comments.
- The Fandom wiki chapter page, read as wikitext through the MediaWiki API.
- The wiki's stat, character, magazine and later-chapter pages.
- The fan transcript at detroitbecometext.github.io, chapters 30.1 (Kara), 30.2 (Connor) and 30.3 (Markus), plus the shared intro components (`30-crossroads-intro/screens` and `background-dialogues`). These were rendered from the site's source templates and `public/i18n/en.json`.
- The game's flowchart string table `MENU.FLOWCHART.02A.*` (the game's internal ID for this chapter is `02A`).
- GamerGuides' three Crossroads pages, used only to check conflicts.

**Working files** are in `/tmp/flowcharts/ch30/` and are not committed:
- `wiki.txt` (the chapter wikitext)
- `wikipages/*.txt`
- `pp-{kara,markus,connor}.txt` and `ppc-*.txt` (PowerPyx text and comments)
- `transcript-{kara,connor,markus,intro-bg,intro-screens}.txt` (the decoded fan transcript)
- `strings02A.txt` (the flowchart string table)
- `crops/` and `other/gg-*.txt`

The wiki has no `Crossroads/Flowchart`, `Crossroads_(Transcript)` or `Crossroads/Transcript` page; all three return `missingtitle`.

**Date, place and objectives.** The wiki infobox gives November 9, 2038, 09:34 PM; the game strings agree (`NOV 9TH, 2038` / `PM 09:34`). The location is Jericho, the freighter. The wiki says "This chapter has thirty different outcomes in total" (`|endings=30`: 11 Kara, 9 Connor, 10 Markus). The infobox objectives are:
- Kara: "Find Jericho, Explore Jericho, Find leader of Jericho, Return to Alice, Escape Jericho".
- Connor: "Find deviant leader, Stop Markus/North, Blow up Jericho (if Markus is dead and Connor becomes deviant), Escape Jericho, Neutralize deviant leader (if Connor remains a machine)".
- Markus: "Blow up Jericho, Escape Jericho".

**How the chapter is played.** It is a single chapter played on three flowcharts (`CROSSROADS - KARA`, `CROSSROADS - CONNOR`, `CROSSROADS - MARKUS`), and control cuts between the characters many times. The fan transcript's scene-change comments give the order:
1. Kara in the car.
2. Connor at Ferndale.
3. Kara arrives and sits Alice down.
4. Connor explores and is stopped by Lucy.
5. Kara meets Markus or North and learns Alice's secret.
6. Markus or North counsel in the captain's cabin.
7. Connor in the cabin.
8. The raid. It intercuts Kara (corridor), Markus (corridors), machine Connor (cargo hall), Kara (cabin), Markus (Josh), Kara (flee) and Markus or Connor (hold and escape).

**The raid happens only if Connor located Jericho.** Without it, the chapter ends quietly for every character:
- Wiki Kara flowchart: "(if Connor did not find Jericho) '''''Kara, Alice & Luther Left Jericho'''''".
- PowerPyx Kara: "If Connor didn't find the location of the Jericho in Last Chance, Connor the whole last section of this chapter (the chase on the Jericho) is unavailable."
- PowerPyx comment: "does jericho always get attacked? / Only if Connor survives Last Chance, Connor."
- Last Chance, Connor wiki: "Know Jericho's Location - only if it was learned from Kamski during Meet Kamski" leads to "Connor Left For Jericho", and "Jericho's Location Unknown" leads to "Connor Series was Decommissioned".

Summary:
- **Chart size.** 332 nodes in total: 101 on Kara's chart, 108 on Markus's and 123 on Connor's. Two of Kara's nodes (`KARA FLEES`, `TRY TO ESCAPE`) fall between PowerPyx's zooms and are taken from the string table and the wiki.
  - Phase labels: one bracketed phase label (`EXPLORE JERICHO`, Connor).
  - Condition tabs: `LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'` (Kara) and `MARKUS DIED IN 'FREEDOM MARCH'` (Kara and Markus).
  - Checkpoints:
    - Kara: `DRIVING TO JERICHO WITH ALICE`, `… & LUTHER`, `ARRIVE AT JERICHO`, `UPSTAIRS`, `KARA & ALICE IN THE CORRIDOR`, `KARA & ALICE AT CROSSROAD`, `KARA FLEES`.
    - Markus: `CAPTAIN'S CABIN`, `CAPTAIN'S CABIN WITH NORTH`, `ON A ROOFTOP`, `IN THE CORRIDOR WITH MARKUS` (twice), `MARKUS IN THE CORRIDOR`, `IN THE HOLD WITH MARKUS`.
    - Connor: `AT FERNDALE`, `IN THE SHIP` (twice), `BACK IN CAPTAIN'S CABIN [WITH NORTH]`, `CARGO HALL`, `CORRIDOR CONFRONTATION`, `DEVIANT CONNOR IN CORRIDOR` (three cards), `IN THE HOLD WITH DEVIANT CONNOR`.
- **Endings: 30.** The wiki gives 11 for Kara, 10 for Markus and 9 for Connor, and the chart has exactly that many ending cards. Several share a label. The distinct labels:
  - Kara: `KARA LEFT JERICHO ALONE`, `KARA, ALICE & LUTHER LEFT JERICHO`, `KARA & ALICE LEFT JERICHO`, `KARA, ALICE & LUTHER CAPTURED` (×2), `KARA & ALICE CAPTURED` (×4), `KARA & ALICE DIED IN THE ASSAULT`, `KARA & ALICE ESCAPED JERICHO`.
  - Markus: `NORTH STAYED ALONE WITH HER THOUGHTS`, `MARKUS STAYED ALONE WITH HIS THOUGHTS`, `MARKUS LEFT JERICHO`, `MARKUS KILLED AND MOST OF JERICHO CAPTURED` (×4), `CONNOR KILLED MARKUS`, `MARKUS DIED BUYING TIME FOR JERICHO`, `MARKUS FLED WITH HIS PEOPLE`.
  - Connor: `MACHINE CONNOR WAS DESTROYED` (×3), `CONNOR KILLED MARKUS`, `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` (×4), `CONNOR ESCAPED WITH JERICHO'S PEOPLE`.
- **Decisions.**
  - On the charts: 18 player choices. Kara has 8, Markus 6 plus one optional interaction (the reservoir), and Connor 4 (including the deviancy choice).
  - Off the charts: about 17 dialogue rounds.
    - Markus has 4 counsel rounds, the detonator, the team line, and 3 rounds speaking to Connor during Connor's confrontation, where the player controls Markus.
    - Connor has 2 rounds facing Markus, or 4 facing North.
    - Kara has 1 or 2 rounds with Markus or North, plus CONSOLE/HURRY.
  - About 15 performance outcome groups (QTEs, timers, wrong-way failures).
- **Who can die here:**
  - Kara and Alice, together.
  - Luther.
  - Markus.
  - North.
  - Josh.
  - Connor (machine or deviant).
  - Lucy (presumably).
  - The androids Markus or Connor fail to save.
  - Simon cannot die in this chapter. The wiki says "Simon and Hank are the only main characters that cannot die in this chapter", and Hank never appears.
- **Numbers found.**
  - **Probabilities:** none. No source states a probability for any action in this chapter.
  - **Timers:** one. PowerPyx gives the 10-second timer at `SOLDIERS COMING MARKUS' WAY` ("During the 10s timer"; the transcript strings say nothing). Rose's "The last bus for the border leaves at midnight" and Luther's "The last bus is in two hours" are story text.
  - **Relationship, stat and software-instability changes:** about 60 icon-level changes, all small or large arrows, with no numeric values.
  - **Deviancy threshold:** the deviancy option needs "Have enough software instability" (transcript lock), but no source gives a threshold.

---

## 1. Flowchart transcription

PowerPyx's images, all 1920×1080:
- **Kara:** `detroit-crossroads-kara-flowchart-1` (overview), `-first-checkpoints`, `-inside-upstairs-1`, `-in-corridor-1`, `-at-crossroad-2`, `-chase-ending`.
- **Markus:** `detroit-become-human-crossroads-markus-flowchart-100` (overview) and `-1` to `-7`.
- **Connor:** `Detroit-Crossroads-002` (overview) and `-003` to `-015` (with `-013-1`).

Crops are in `crops/`. Every label below matches the string table `MENU.FLOWCHART.02A.{K,M,C}.*` exactly.

The photographed saves differ:
- **Kara:** the chart header reads `76% COMPLETED`. Its world-stats strip reads `PUBLIC OPINION HOSTILE`, `ALICE NEUTRAL`, `LUTHER NEUTRAL` (greyed). The save started with Luther dead.
- **Connor:** the header reads `100% COMPLETED`.
- **Markus:** the zooms are captioned "100% complete" on PowerPyx.

Blue fill marks the photographed save's own path:
- Kara: the Alice-only drive to `FIND A WARM PLACE FOR ALICE`.
- Markus: cabin, counsel with Simon, kiss, corridor and fled; the deviant-Connor branch.
- Connor: the deviant branch through `CONNOR JOINS THE OTHERS` and `HELP MARKUS` to `CONNOR ESCAPED WITH JERICHO'S PEOPLE`.

Icon key (as drawn, following the ch24 convention):
- [arrow] = action
- [triangle] = event the game triggers
- [choice] = the overlapping-squares choice marker
- [outcome] = the same marker on a group decided by performance or state. Where the chart prints a check (✓) or cross (✗) beside a row, it is noted.
- [split] = the small capsule-shaped junction glyph. It is used where alternative failures (`OUT OF TIME` / `WRONG WAY`) or optional actions branch.
- [branch] = the small free-standing origin glyph for optional side nodes (magazines).
- [lock] = yellow tab with an open padlock (cross-chapter impact).
- [skull] = yellow tab with a skull (death).
- [no-entry] = a circle with a slash. It appears in a yellow tab on one Kara ending and in place of the node icon on five Kara nodes.
- [cond] = a yellow tab carrying an earlier-chapter condition that gates the node after it.

### 1a. CROSSROADS - KARA (101 nodes)

**Drive and arrival**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K1 | `DRIVING TO JERICHO WITH ALICE` | checkpoint card | [cond] `LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'` (`K.GC.LUTHERDEAD`) |
| K2 | `DRIVING TO JERICHO WITH ALICE & LUTHER` | checkpoint card | Luther alive |
| – | [split] | | K1 and K2 join here, then branch to K3, K4 and K5 |
| K3 | `LOOK OUTSIDE` | [arrow] | optional |
| K4 | `CHANGE RADIO STATION` | [arrow] | optional |
| K5 | `PARKING LOT` | [triangle] | K3, K4 and the split all join |
| K6 | `TIME TO SAY GOODBYE` | [arrow] | K5 |
| K7 | `ARRIVE AT JERICHO` | checkpoint card | K6 |
| K8 | `BOARD THE SHIP` | [arrow] | K7 |
| K9 | `FIND A WARM PLACE FOR ALICE` | [arrow] | K8 |

**Upstairs**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K10 | `UPSTAIRS` | checkpoint card | K9 |
| K11 | `READ "DETROIT IN CHAOS"` | [arrow], from a [branch] glyph | optional magazine |
| K12 | `READ "TERROR IN DETROIT"` | [arrow], same glyph | optional magazine |
| K13 | `MEET MARKUS` | [arrow] | K10 |
| K14 | `MEET NORTH` | [arrow] | [cond] `MARKUS DIED IN 'FREEDOM MARCH'` (`K.GC.MEETNORTH`) |
| K15 | `GO BACK TO ALICE` | [arrow] | K13 or K14 |
| K16 | `SPOT THE ANDROID CHILD` | [arrow] | K15 |
| K17 | `JOIN ALICE` | [arrow] | K15 and K16 |
| K18 | `STAY DISTANT` | [choice] row 1 | K17 |
| K19 | `HUG ALICE` | [choice] row 2 | K17 |
| K20 | `ALICE LEAVES WITH LUTHER` | [outcome] row 1 | K18 |
| K21 | `ALICE LEAVES ALONE` | [outcome] row 2 | K18 |
| K22 | `JERICHO IS UNDER ATTACK` | [triangle] | K20 and K21 |
| K23 | `RUN AWAY` | [choice] row 1 | K22 |
| K24 | `FIND ALICE` | [choice] row 2 | K22, leading to K28 |
| K25 | `KARA LEFT JERICHO ALONE` | ending card, no icon | K23 |
| K26 | `KARA, ALICE & LUTHER LEFT JERICHO` | ending card, no icon | K18/K19 group (no raid, Luther alive) |
| K27 | `KARA & ALICE LEFT JERICHO` | ending card, no icon | K18/K19 group (no raid, Luther dead) |

**Corridor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K28 | `KARA & ALICE IN THE CORRIDOR` | checkpoint card | K18/K19 group (raid) and K24 |
| K29 | `ESCAPE WITH LUTHER` | [arrow] | K28 (Luther alive) |
| K30 | `SEARCH FOR EXIT` | [arrow] | K28 (Luther dead) |
| – | [split] | | from K29 and K30 |
| K31 | `OUT OF TIME` | [triangle] | split |
| K32 | `WRONG WAY` | [triangle] | split |
| K33 | `KARA, ALICE & LUTHER CAPTURED` | ending card, [lock] | K31 or K32 (Luther alive) |
| K34 | `KARA & ALICE CAPTURED` | ending card, [lock] | K31 or K32 (Luther dead) |
| K35 | `LUTHER OPENS THE DOOR` | [triangle] | K29 |
| K36 | `GO THROUGH THE DOOR` | [arrow] | K35 |
| K37 | `LUTHER IS SHOT` | [triangle] | K36 |
| K38 | `ANDROID OPENS DOOR AND IS SHOT` | [triangle] | K30 |
| K39 | `GO THROUGH THE DOOR` | [arrow] | K38 |

**Crossroad**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K40 | `KARA & ALICE AT CROSSROAD` | large card (checkpoint on the wiki) | K37 and K39 |
| – | [split] | | K40 |
| K41 | `OUT OF TIME` | [triangle] | split |
| K42 | `WRONG WAY` | [triangle] | split |
| K43 | `KARA & ALICE CAPTURED` | ending card, [lock] | K41 or K42 |
| K44 | `RUN TO LUTHER` | [arrow] | K40 (Luther alive) |
| K45 | `LEAVE LUTHER` | [choice] row 1, with [lock] | K44 |
| K46 | `HELP LUTHER` | [choice] row 2 | K44 |
| K47 | `GET LUTHER TO SAFETY` | [outcome] row 1 | K46 |
| K48 | `FAIL` | [outcome] row 2 | K46 |
| K49 | `LEAVE LUTHER HIDDEN` | [arrow] | K47 |
| K50 | `CAUGHT BY SOLDIER` | [triangle] | K48 |
| K51 | `KARA, ALICE & LUTHER CAPTURED` | ending card, [lock] | K50 |

**Cabin**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K52 | `RUN TOWARD EXIT` | [arrow] | K40 (Luther dead), K45, K49 |
| K53 | `SOLDIERS BLOCK THE WAY` | [triangle] | K52 |
| K54 | `HIDE` | [arrow] | K53 |
| K55 | `ANDROID SEEKS SHELTER` | [triangle] | K54 |
| K56 | `OPEN THE DOOR` | [choice] row 1 | K55 |
| K57 | `KEEP THE DOOR CLOSED` | [choice] row 2 | K55 |
| K58 | `ANDROID ENTERS BUT IS SHOT` | [triangle] | K56 |
| K59 | `CAPTURED` | [outcome] row 1 | K58 |
| K60 | `FIGHT BACK` | [outcome] row 2 | K58 |
| K61 | `KARA & ALICE CAPTURED` | ending card, [lock] | K59 |
| K62 | `SOLDIERS SHOOT ANDROID AND MOVE ON` | [triangle] | K57 |
| K63 | `ESCAPE CABIN` | [arrow] | K60 and K62 |

**Flight to the breach**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| K64 | `KARA FLEES` | checkpoint (between zooms; string `K.NEARCABIN`, wiki "'''KARA FLEES'''") | K63 |
| K65 | `TRY TO ESCAPE` | between zooms (string `K.TOWARDSHOLE`; wiki) | K64 |
| K66 | `ALMOST REACH THE BREACH` | [outcome] row 1 | K65 |
| K67 | `FAIL TO RUN` | [outcome] row 2 | K65 |
| K68 | `SOLDIERS SHOOT AT THE CROWD` | [triangle] | K66 |
| K69 | `SURRENDER` | [arrow] | K68 |
| K70 | `RUN AWAY` | [arrow] | K68, leading to K81 |
| K71 | `PLAY DEAD` | [arrow] | K68, leading to K92 |
| K72 | `FACE` | [choice] row 1 | K69 |
| K73 | `CONVINCE` | [choice] row 2 | K69 |
| K74 | `OBEY` | [choice] row 3 | K69, leading to K80 |
| K75 | `RUN AWAY` | [choice] row 4 | K69, leading to K81 |
| K76 | `LUTHER SACRIFICES HIMSELF` | [lock] | K72 (Luther hidden), leading to K100 |
| K77 | `KARA IS STRUCK` | [triangle] | K72 and K83 (Luther dead) |
| K78 | `ALICE INTERVENES` | [arrow] | K77, leading to K98 |
| K79 | `SOLDIER THREATENS KARA & ALICE` | [triangle] | K73 |
| K80 | `RAISE ARMS` | [arrow] | K79 and K74, leading to K98 |
| K81 | `KARA IS SHOT IN THE LEG` | [triangle] | K67, K70, K75 |
| K82–K87 | `SURRENDER` / `FACE` / `CRAWL` [no-entry] / `OUT OF TIME` [no-entry] / `GET UP` / `PLAY DEAD` | [choice], six rows | K81 |
| K88 | `RAISE ARMS` | [arrow] | K82, leading to K98 |
| K89 | `LUTHER SACRIFICES HIMSELF` | [lock] | K83 (Luther hidden), leading to K100 |
| K90 | `ALICE IS SHOT` | [no-entry] | K84 and K85, leading to K99 |
| K91 | `KARA FAILS TO GET UP` | [triangle] | K86 (loops to K81's options) |
| K92 | `SOLDIERS CLOSE IN` | [triangle] | K71 and K87 |
| K93 | `DEFEND ALICE` | [choice] row 1 | K92 |
| K94 | `REMAIN STILL` | [choice] row 2 | K92, leading to K100 |
| K95 | `KARA IS SHOT` | [no-entry] | K93 (Luther dead) |
| K96 | `GET CLOSER TO ALICE` | [no-entry] | K95, leading to K99 |
| K97 | `LUTHER SACRIFICES HIMSELF` | [lock] | K93 (Luther hidden), leading to K100 |
| K98 | `KARA & ALICE CAPTURED` | ending card, [lock] | K78, K80, K88 |
| K99 | `KARA & ALICE DIED IN THE ASSAULT` | ending card, yellow [no-entry] tab | K90 and K96 |
| K100 | `LEAVE JERICHO` | [arrow] | K76, K89, K94, K97 |
| K101 | `KARA & ALICE ESCAPED JERICHO` | ending card, no icon | K100 |

The Kara death ending uses a yellow no-entry tab, not the skull used on the Markus and Connor charts. See Open questions.

Strings in `02A.K` that are not drawn:
- `WALK TOWARD JERICHO`
- `CHOOSE TO STAY`, `CHOOSE TO LEAVE`. These match Kara's automatic line "Maybe you're right… We might be safer here" or "we wanna leave now", which depends on whether Connor found Jericho.
- `KARA, ALICE & LUTHER SAFE AT JERICHO`, `KARA & ALICE SAFE AT JERICHO`
- `OUTSIDE THE BOAT`, `ESCAPE THROUGH BUILDING`, `REACH THE ROOF`
- `SHOT BY SOLDIERS`, `KARA & ALICE DIED`, `KARA, ALICE & LUTHER DIED` (×2)
- `KARA, ALICE & LUTHER ROUNDED UP`, `KARA & ALICE ROUNDED UP` (×2)
- `LUTHER DIED` (×3), `ALICE SACRIFICES HERSELF`, `GET CLOSER TO ALICE` (second copy), `KARA & ALICE DIED` (second copy)
- `ENDDIED.VALUE` = `KARA, ALICE & LUTHER DIED IN THE ASSAULT`

These look like cut content. A Luther-alive variant of the death ending exists only as a string.

### 1b. CROSSROADS - MARKUS (108 nodes)

**Cabin**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M1 | `CAPTAIN'S CABIN` | checkpoint card | Markus alive |
| M2 | `CAPTAIN'S CABIN WITH NORTH` | checkpoint card | [cond] `MARKUS DIED IN 'FREEDOM MARCH'` (`M.GC.MEETNORTH`) |
| M3 | `COUNSEL WITH SIMON, JOSH AND NORTH` | [arrow] | M1 (Simon alive) |
| M4 | `COUNSEL WITH JOSH AND NORTH` | [arrow] | M1 (Simon dead) |
| M5 | `JOSH AND NORTH DISCUSS` | [outcome] row 1 | M2 (Simon dead) |
| M6 | `JOSH, SIMON AND NORTH DISCUSS` | [outcome] row 2 | M2 (Simon alive) |
| M7 | `NORTH STAYED ALONE WITH HER THOUGHTS` | ending card, no icon | M5 and M6 |
| M8 | `MARKUS OUSTED` | [triangle] | M3 and M4 (Jericho Unpopular) |
| M9 | `DISCUSS WITH NORTH` | [arrow] | M3 and M4 (Jericho above Unpopular) |
| M10 | `KISS NORTH` | [choice] row 1 | M9 (North Lover) |
| M11 | `DON'T KISS NORTH` | [choice] row 2 | M9 |
| M12 | `NORTH LEAVES MARKUS ALONE` | [triangle] | M9, M10, M11 |
| M13 | `MARKUS STAYED ALONE WITH HIS THOUGHTS` | ending card, no icon | M12 (no raid) |
| M14 | `CONNOR WATCHES NORTH LEAVE` | [triangle] | M12 (raid) |
| M15 | `JERICHO IS UNDER ATTACK` | [triangle] | M14, leading to M21 |

**Rooftop (ousted Markus)**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M16 | `ON A ROOFTOP` | large card | M8 (raid) |
| M17 | `JERICHO IS UNDER ATTACK` | [triangle] | M16 |
| M18 | `LEAVE FOREVER` | [choice] row 1 | M17 |
| M19 | `GO BACK TO JERICHO` | [choice] row 2 | M17. A long line runs to M32 or M83 (see 2f) |
| M20 | `MARKUS LEFT JERICHO` | ending card, [lock] | M8 (no raid; direct line) and M18 |

**First corridor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M21 | `IN THE CORRIDOR WITH MARKUS` | checkpoint card | M15 |
| M22 | `MEET YOUR TEAM` | [arrow] | M21 |
| M23 | `TRY TO ESCAPE` | [arrow] | M22 |
| M24 | `MEET LUCY` | [arrow] | M23 |
| M25 | `WRONG WAY` | [triangle] | M23 |
| M26 | `OUT OF TIME` | [triangle] | M23 |
| M27 | `SOLDIERS SHOOT MARKUS` | [triangle] | M25 and M26 |
| M28 | `MARKUS IS WOUNDED` | [triangle] | M27 (loops back to M23) |
| M29 | `SOLDIERS KILL MARKUS` | [triangle] | M27 |
| M30 | `MARKUS KILLED AND MOST OF JERICHO CAPTURED` | ending card, [skull] | M29 |
| M31 | `A BRIDGE BREAKS UNDER MARKUS` | [triangle] | M24 |

**Second corridor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M32 | `MARKUS IN THE CORRIDOR` | checkpoint card | M31 (and M19 when Connor is a machine) |
| M33 | `SNEAK AROUND THE SOLDIERS` | [arrow] | M32 |
| M34 | `SOLDIERS THREATEN ANDROIDS` | [triangle] | M33 |
| M35 | `STAY AWAY` | [choice] row 1 | M34 |
| M36 | `INTERVENE` | [choice] row 2 | M34 |
| M37 | `ANDROIDS ARE KILLED` | [triangle] | M35, leading to M43 |
| M38 | `DEAL WITH SOLDIERS` | [outcome] ✓ | M36 |
| M39 | `GET SHOT` | [outcome] ✗ | M36 |
| M40 | `ANDROIDS ESCAPE` | [triangle] | M38 and M41, leading to M43 |
| M41 | `MARKUS WOUNDED` | [triangle] | M39 (not yet wounded) |
| M42 | `MARKUS COLLAPSES` | [triangle] | M39 (already wounded), leading to M50 |
| M43 | `PROGRESS TO THE NEXT CORRIDOR` | [arrow] | M37 and M40 |
| M44 | `SOLDIERS COMING MARKUS' WAY` | [triangle] | M43 |
| M45 | `JUMP SOLDIERS` | [choice] row 1 | M44 |
| M46 | `CLIMB AWAY` | [choice] row 2 | M44 |
| M47 | `TIME OUT` | [choice] row 3 ✗ | M44 |
| M48 | `MARKUS WOUNDED` | [triangle] | M47 (not yet wounded), leading to M51 |
| M49 | `MARKUS COLLAPSES` | [triangle] | M47 (already wounded) |
| M50 | `MARKUS KILLED AND MOST OF JERICHO CAPTURED` | ending card, [skull] | M42 and M49 |
| M51 | `ENTER A WELL` | [arrow] | M45, M46, M48 |
| M52 | `ANDROIDS ARE CHASED BY SOLDIERS` | [triangle] | M51 |
| M53 | `ANDROIDS ARE SHOT` | [triangle] | M52, leading to M56 |
| M54 | `KNOCK SOLDIERS OUT` | [arrow] | M52 (optional interaction) |
| M55 | `ANDROIDS ESCAPE` | [arrow] | M54 |
| M56 | `APPROACH THE HOLD` | [arrow] | M53 and M55 |

**Josh**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M57 | `JOSH FIGHTING A SOLDIER` | [triangle] | M56 |
| M58 | `INTERVENE` | [choice] row 1 | M57 |
| M59 | `STAY AWAY` | [choice] row 2 | M57 |
| M60 | `NEUTRALIZE SOLDIERS` | [outcome] ✓ | M58 |
| M61 | `LOSE THE UPPER HAND` | [outcome] ✗ | M58 |
| M62 | `JOSH ESCAPES` | [triangle] | M60, leading to M69 |
| M63 | `MARKUS COLLAPSES` | [triangle] | M61 (already wounded) |
| M64 | `JOSH IS SHOT BY THE SOLDIER` | [lock] | M63 |
| M65 | `MARKUS KILLED AND MOST OF JERICHO CAPTURED` | ending card, [skull] | M64 |
| M66 | `JOSH SACRIFICES HIMSELF` | [triangle] | M61 (not wounded) |
| M67 | `COMFORT JOSH` | [arrow] | M66 and M68, leading to M69 |
| M68 | `SOLDIER SHOT JOSH` | [lock] | M59 |

**Hold**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M69 | `IN THE HOLD WITH MARKUS` | checkpoint card | M62, M67, M68 |
| M70 | `ENTER OLD ENGINE CONTROL ROOM` | [arrow] | M69 |
| M71 | `CONNOR INTERRUPTS AND MARKUS PUSHES HIM ASIDE` | [triangle] | M70 (Connor a machine) |
| M72 | `FAIL TO REACH THE GUN` | [outcome] ✗ | M71 |
| M73 | `REACH THE GUN` | [outcome] ✓ | M71 |
| M74 | `CONNOR SHOOTS MARKUS` | [triangle] | M72 |
| M75 | `CONNOR KILLED MARKUS` | ending card, [skull] | M74 |
| M76 | `MARKUS SHOOTS CONNOR` | [lock] | M73, leading to M82 |
| M77 | `SOLDIERS INTERRUPT` | [triangle] | M70 (Connor deviant, or absent) |
| M78 | `NEUTRALIZE THEM` | [outcome] ✓ | M77, leading to M82 |
| M79 | `FAIL TO NEUTRALIZE THEM` | [outcome] ✗ | M77 |
| M80 | `MARKUS IS SHOT DEAD` | [triangle] | M79 |
| M81 | `MARKUS KILLED AND MOST OF JERICHO CAPTURED` | ending card, [skull] | M80 |
| M82 | `TRIGGER THE COUNTDOWN` | [arrow] | M76 and M78 |

**Escape**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| M83 | `IN THE CORRIDOR WITH MARKUS` | checkpoint card | M82 (and M19 when Connor is deviant) |
| M84 | `JOIN THE OTHERS` | [arrow] | M83 |
| M85 | `TRY TO ESCAPE` | [arrow] | M84 |
| M86 | `LOSE TOO MUCH TIME` | [triangle] | M85, leading to M97 |
| M87 | `NORTH IS SHOT` | [triangle] | M85 |
| M88 | `CHOOSE TO SAVE NORTH` | [choice] row 1 | M87 |
| M89 | `RUN AWAY` | [choice] row 2 | M87, leading to M103 |
| M90 | `FAIL TO SAVE NORTH` | [outcome] ✗ | M88 |
| M91 | `SAVE NORTH` | [outcome] ✓ | M88 |
| M92 | `CONNOR RESCUES MARKUS` | [arrow] | M90 (Connor deviant) |
| M93 | `CONNOR PROTECTS MARKUS AND NORTH` | [arrow] | M91 (Connor deviant) |
| M94 | `KILL THE SOLDIERS` | [outcome] ✓ | M92 and M93, leading to M103 |
| M95 | `DIE BUYING SOME TIME` | [outcome] ✗ | M92 and M93, leading to M103 |
| M96 | `RUN TO EXIT` | [arrow] | M91 (no deviant Connor), leading to M103, or M97 if too slow |
| M97 | `MARKUS GETS SHOT` | [triangle] | M86, M90 (no deviant Connor), M96 |
| M98 | `NORTH ESCAPES` | [triangle] | M97 |
| M99–M101 | `CONNOR JUMPS WITH HER` / `SIMON JUMPS WITH HER` / `JOSH JUMPS WITH HER` | [triangle] each | M98 |
| M102 | `MARKUS DIED BUYING TIME FOR JERICHO` | ending card, [skull] | M98 |
| M103 | `MARKUS JUMPS` | [arrow] | M89, M94, M95, M96 |
| M104 | `MARKUS FLED WITH HIS PEOPLE` | ending card, no icon | M103 |
| M105–M108 | `SIMON JUMPS WITH HIM` / `JOSH JUMPS WITH HIM` / `NORTH JUMPS WITH HIM` / `CONNOR JUMPS WITH HIM` | [triangle] each | M103 |

Strings in `02A.M` that are not drawn:
- `HELICOPTER PASSES OVER MARKUS`
- `AMANDA THANKS CONNOR FOR FINDING JERICHO`
- `PLAY CONNOR`, `PLAY MARKUS`. These are the control switch during the hold fight.
- `SOLDIERS SHOOT MARKUS`'s alternatives `MARKUS DIED` (×7), `CONNOR DIED`, `JOSH DIED` (×2)
- `NORTH JUMPS`, `NORTH BECOMES JERICHO LEADER`
- `MARKUS GETS SHOT` (second copy, `MARKUSSHOTRUN`), `OUT OF TIME` (`MARKUSRUNFAIL`)
- `FAIL TO REACH THE GUN` and `REACH THE GUN` (second copies)
- `MARKUS COLLAPSES` (third copy)
- `MARKUS KILLED AND MOST OF JERICHO CAPTURED` (×2 extra)
- `CONNOR JUMPS WITH HER` (second copy)

### 1c. CROSSROADS - CONNOR (123 nodes)

**Arrival and the cabin**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| C1 | `AT FERNDALE` | checkpoint card | Connor found Jericho in Last Chance, Connor |
| C2 | `FOLLOW JERICHO TRAIL` | [arrow] | C1 |
| C3 | `IN THE SHIP` | large card | C2 |
| – | `EXPLORE JERICHO` | bracketed phase label | encloses C4 to C10 |
| C4 | `SPOT KARA` | [arrow] | optional (Kara at Jericho) |
| C5 | `SPOT ALICE` | [arrow] | optional |
| C6 | `SPOT EXPLOSIVES` | [arrow] | optional |
| C7 | `SPOT TRACI` | [arrow] | optional (Tracis escaped in The Eden Club) |
| C8 | `SPOT RUPERT` | [arrow] | optional (Rupert escaped in The Nest) |
| C9 | `READ "DETROIT IN CHAOS"` | [arrow] | optional magazine (Markus charged in Freedom March) |
| C10 | `READ "TERROR IN DETROIT"` | [arrow] | optional magazine (same condition) |
| C11 | `STOPPED BY LUCY` | [triangle] | bracket |
| C12 | `BACK IN CAPTAIN'S CABIN` | large card | C11 (Markus leads) |
| C13 | `BACK IN CAPTAIN'S CABIN WITH NORTH` | large card | C11 (Markus dead or ousted) |
| C14 | `ENTER CAPTAIN'S CABIN` | [arrow] | C12 and C13 |
| C15 | `THREATEN MARKUS` | [arrow] | C14 |
| C16 | `THREATEN NORTH` | [arrow] | C14 |
| C17 | `CONFRONT MARKUS` | [arrow] | C15 |
| C18 | `CONFRONT NORTH` | [arrow] | C16 |
| C19 | `REMAIN A MACHINE` | [choice] row 1, with [lock] | C17 and C18 |
| C20 | `BECOME DEVIANT` | [choice] row 2, with [lock] | C17 and C18 |

**Machine Connor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| C21 | `JERICHO IS UNDER ATTACK` | [triangle] | C19 |
| C22 | `MARKUS JUMPS CONNOR` | [triangle] | C21 |
| C23 | `NORTH JUMPS CONNOR` | [triangle] | C21 |
| C24 | `IN THE SHIP` | checkpoint card | C22 and C23 |
| C25 | `PURSUE MARKUS` | [arrow] | C24 |
| C26 | `PURSUE NORTH` | [arrow] | C24 |
| C27 | `CARGO HALL` | large card | C25 and C26 |
| C28 | `STOPPED BY SOLDIER` | [triangle] | C27 |
| C29 | `PERKINS ALIBI` | [choice] row 1 | C28, leading to C38 |
| C30 | `ATTEMPT TO PERSUADE` | [choice] row 2 | C28, leading to C38 |
| C31 | `ATTACK` | [arrow] | C28 |
| C32 | `RUN` | [arrow] | C28 |
| C33 | `NEUTRALIZE ASSAILANT` | [outcome] ✓ | C31, leading to C38 |
| C34 | `FAIL TO NEUTRALIZE ASSAILANT` | [outcome] ✗ | C31, leading to C36 |
| C35 | `SOLDIERS SHOOT CONNOR` | [triangle] | C32 |
| C36 | `MACHINE CONNOR WAS DESTROYED` | ending card, [skull] | C34 and C35 |
| C37 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C36 |
| C38 | `RESUME PURSUIT` | [arrow] | C29, C30, C33 |
| C39 | `CONNOR INTERRUPTS AND MARKUS PUSHES HIM ASIDE` | [triangle] | C38 (Markus alive) |
| C40 | `FAIL TO REACH GUN BEFORE MARKUS` | [outcome] row 1 | C39 |
| C41 | `REACH GUN BEFORE MARKUS` | [outcome] row 2 | C39 |
| C42 | `MARKUS SHOOTS CONNOR` | [triangle] | C40 |
| C43 | `MACHINE CONNOR WAS DESTROYED` | ending card, [skull] | C42 |
| C44 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C43 |
| C45 | `CONNOR SHOOTS MARKUS` | [triangle] | C41 |
| C46 | `CONNOR KILLED MARKUS` | ending card, [lock] | C45 |
| C47 | `CORRIDOR CONFRONTATION` | large card | C38 (Markus dead or ousted) |
| C48 | `FIND JOSH` | [arrow] | C47 |
| C49 | `SPOT NORTH` | [arrow] | C48 |
| C50 | `MADE IT` | [outcome] row 1 | C49 |
| C51 | `SHOT BY SOLDIER` | [outcome] row 2 | C49 |
| C52 | `NORTH ESCAPED` | [triangle] | C50, leading to C53 |
| C53 | `SOLDIER KILLS CONNOR` | [triangle] | C51 and C52 |
| C54 | `MACHINE CONNOR WAS DESTROYED` | ending card, [skull] | C53 |
| C55 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C54 |

**Deviant Connor: warning and the first corridor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| C56 | `WARN MARKUS` | [arrow] | C20 |
| C57 | `WARN NORTH` | [arrow] | C20 |
| C58 | `JERICHO IS UNDER ATTACK` | [triangle] | C56 and C57. Five lines leave it (to C59, C67, C92, C105, C118) |
| C59 | `DEVIANT CONNOR IN CORRIDOR` (#1) | checkpoint card | C58 (Markus died or left before the attack) |
| C60 | `JOIN DEVIANTS` | [arrow] | C59 |
| C61 | `MAKE FOR THE HOLD` | [arrow] | C60 |
| C62 | `MEET LUCY` | [arrow] | C61 |
| C63 | `BRIDGE COLLAPSES` | [triangle] | C62, leading to C67 |
| C64 | `CONNOR GOES WRONG WAY` | [triangle] | C61 |
| C65 | `OUT OF TIME` | [triangle] | C61 |
| C66 | `SOLDIER SHOOTS CONNOR` | [triangle] | C64 and C65. Leads to C85 if already wounded; otherwise Connor continues |

**Deviant Connor: the second corridor**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| C67 | `DEVIANT CONNOR IN CORRIDOR` (#2) | large card | C63, and C58 (Markus died before `MARKUS IN THE CORRIDOR`) |
| C68 | `SNEAK PAST SOLDIERS` | [arrow] | C67 |
| C69 | `SOLDIERS THREATEN ANDROIDS` | [triangle] | C68 |
| C70 | `STAY AWAY` | [choice] row 1 | C69 |
| C71 | `INTERVENE` | [choice] row 2 | C69 |
| C72 | `ANDROIDS ARE EXECUTED` | [triangle] | C70, leading to C78 |
| C73 | `KILL THE SOLDIERS` | [outcome] row 1 (no ✓ drawn) | C71 |
| C74 | `GET SHOT` | [outcome] row 2 | C71 |
| C75 | `ANDROIDS ESCAPE` | [triangle] | C73 and C76, leading to C78 |
| C76 | `CONNOR IS WOUNDED` | [triangle] | C74 (not wounded) |
| C77 | `CONNOR IS SHOT` | [triangle] | C74 (wounded), leading to C85 |
| C78 | `NEXT CORRIDOR` | [arrow] | C72 and C75 |
| C79 | `SOLDIERS COMING` | [triangle] | C78 |
| C80 | `JUMP SOLDIERS` | [choice] row 1 | C79 |
| C81 | `CLIMB BESIDE SOLDIERS` | [choice] row 2 | C79 |
| C82 | `LOSE TOO MUCH TIME` | [choice] row 3 | C79 |
| C83 | `CONNOR IS WOUNDED` | [triangle] | C82 (not wounded), leading to C87 |
| C84 | `CONNOR IS SHOT` | [triangle] | C82 (wounded) |
| C85 | `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` | ending card, [skull] | C66, C77, C84 |
| C86 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C85 |
| C87 | `ENTER A WELL` | [arrow] | C80, C81, C83 |
| C88 | `ANDROIDS ARE CHASED BY SOLDIERS` | [triangle] | C87 |
| C89 | `ANDROIDS ARE SHOT` | [triangle] | C88, leading to C93 |
| C90 | `USE RESERVOIR TO KNOCK SOLDIERS OUT` | [arrow] | C88 |
| C91 | `ANDROIDS ESCAPE` | [arrow] | C90, leading to C93 |

**Deviant Connor: the hold and the escape**

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| C92 | `CONNOR TAKES OVER MARKUS' MISSION` | [arrow] | C58 (Markus died after `MARKUS IN THE CORRIDOR`, before the hold) |
| C93 | `APPROACH HOLD` | [arrow] | C89, C91, C92 |
| C94 | `JOSH IS DYING` | [triangle] | C93 |
| C95 | `COMFORT JOSH` | [arrow] | C94 |
| C96 | `IN THE HOLD WITH DEVIANT CONNOR` | large card | C95 |
| C97 | `IN CONTROL ROOM` | [arrow] | C96 |
| C98 | `SOLDIERS INTERRUPT` | [triangle] | C97 |
| C99 | `NEUTRALIZE THEM` | [outcome] ✓ | C98 |
| C100 | `FAIL` | [outcome] ✗ | C98 |
| C101 | `CONNOR IS SHOT DEAD` | [triangle] | C100 |
| C102 | `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` | ending card, [skull] | C101 |
| C103 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C102 |
| C104 | `ARM EXPLOSIVE` | [arrow] | C99. Leads to C105 if Markus is dead or left, otherwise C118 |
| C105 | `DEVIANT CONNOR IN CORRIDOR` (#3) | large card | C104, and C58 (Markus died at the bomb) |
| C106 | `JOIN THE OTHERS` | [arrow] | C105 |
| C107 | `TRY TO ESCAPE` | [arrow] | C106 |
| C108 | `OUT OF TIME` | [outcome] row 1 | C107 |
| C109 | `MADE IT` | [outcome] row 2 | C107 |
| C110 | `NORTH JUMPS` | [triangle] | C108 |
| C111 | `SIMON JUMPS WITH HER` | [triangle] | C110 |
| C112 | `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` | ending card, [skull] | C110 |
| C113 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C112 |
| C114 | `CONNOR JUMPS` | [arrow] | C109 |
| C115 | `SIMON JUMPS WITH HIM` | [triangle] | C114 |
| C116 | `NORTH JUMPS WITH HIM` | [triangle] | C114 |
| C117 | `CONNOR ESCAPED WITH JERICHO'S PEOPLE` | ending card, no icon | C114 and C121 |
| C118 | `CONNOR JOINS THE OTHERS` | [triangle] | C58 (Markus triggered the bomb) and C104 |
| C119 | `HELP MARKUS` | [outcome] row 1 | C118 |
| C120 | `FAIL TO HELP MARKUS` | [outcome] row 2 | C118 |
| C121 | `CONNOR JUMPS WITH THE OTHERS` | [triangle] | C119, leading to C117 |
| C122 | `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` | ending card, [skull] | C120 |
| C123 | `CYBERLIFE WILL SEND A NEW CONNOR` | [triangle] | C122 |

The same event is labelled differently on the two charts:
- **Markus's fight in the hold.** Markus's chart labels it from Markus's side (`REACH THE GUN` → `MARKUS SHOOTS CONNOR`). Connor's chart labels it from Connor's side (`REACH GUN BEFORE MARKUS` → `CONNOR SHOOTS MARKUS`).
- **`CONNOR KILLED MARKUS`.** On Connor's chart it carries [lock]; on Markus's it carries [skull].

Strings in `02A.C` that are not drawn:
- `SPOT POLICEMAN`
- `OUT OF TIME` (`DEVIANTTIMEOUT`, `HOLDTIMEOUT`, `TOOLATE`, `TOOLATE2`)
- `SOLDIERS SHOOT CONNOR` (`HOLDSOLDIERSHOOT`)
- `CONNOR DIED` (×3), `CONNOR DIED AND LOST HIS MEMORY` (×4)
- `JOSH JUMPS WITH HIM`, `JOSH JUMPS WITH HER`
- `CONNOR BECAME DEVIANT`, `DEVIANT CONNOR IN CORRIDOR` (`BOATDEVIANT`), `IN THE SHIP` (`BOATCONNOR`)
- `CONNOR REMAINED A MACHINE`, `MARKUS DIED`, `JOSH DIED` (×2)
- `CONNOR IS WOUNDED` (`CONNORWOUNDED`)
- `PLAY CONNOR`, `PLAY MARKUS`
- `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` (`DIEDDEVIANT07`)

The `CONNOR DIED AND LOST HIS MEMORY` strings suggest a cut memory-loss variant.

### 1d. Wiki text flowchart vs the chart

Where the wiki's wording differs from the chart:
- **Kara:**
  - Wiki: "Kara & Alice Died in the Assault". Chart: `KARA & ALICE DIED IN THE ASSAULT`.
  - Wiki: "Kara & Alice Captured" after "Out of Time OR Wrong Way" at the crossroad. Chart: same.
  - The wiki routes "(if Luther died) Kara is Struck" under FACE in both places, as does the chart.
  - The wiki omits `KARA FLEES` → `TRY TO ESCAPE` only by formatting.
- **Markus:**
  - The wiki calls the escape checkpoints "IN THE CORRIDOR WITH MARKUS #1/#2". The chart has two identical `IN THE CORRIDOR WITH MARKUS` cards.
  - Wiki: "Androids Are Chased By Soldiers". Same on the chart.
  - The wiki's "Markus Wounded (loops back to Try to Escape)" matches the chart's loop line.
- **Connor:**
  - The wiki numbers "Deviant Connor in Corridor #1/#2/#3". The chart has three cards with the same label; the third card follows `ARM EXPLOSIVE`.
  - Wiki: "Perkins Alibi (leads to 'Resume Pursuit')". Same on the chart.
  - The wiki routes "Fail to Neutralize Assailant" to destruction. The chart joins it to the `MACHINE CONNOR WAS DESTROYED` card.

---

## 2. Choices and gates

### 2a. Kara: drive and arrival (K1 to K9)

**Opening checkpoint.** `DRIVING TO JERICHO WITH ALICE & LUTHER` if Luther survived Midnight Train; otherwise `… WITH ALICE` (tab `LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'`). Rose drives.

**Optional `LOOK OUTSIDE`.** Rose: "They've been conducting raids all over the city… Everybody is on edge after what happened yesterday…"

**Optional `CHANGE RADIO STATION`.** KNC's Rosanna Cartland: "With all androids being turned over to the authorities, the country is grinding to a halt. Hospitals and schools are closing… our armed forces have lost two thirds of their effective personnel, which consisted of specialized android models." Rose: "How about some music instead?"

**`TIME TO SAY GOODBYE`.** Rose: "…there's a large freighter called Jericho. When you get there, find Markus. He will help you. The last bus for the border leaves at midnight… My brother lives in Ontario, I've given you his address…"

**Inside.** `FIND A WARM PLACE FOR ALICE` is the oil-drum fire (PowerPyx). Alice: "I'm hot and cold at the same time…"
- **Luther alive:** "The last bus is in two hours… Kara… There's something I have to tell you… It's about Alice…" Kara: "We'll have lots of time to talk on the bus…"

**Background dialogue** (transcript, shared intro). The background lines are angry: "Androids were hanged all along Woodward Avenue", "Blood for blood!". They also vary by Markus's state:
- Markus alive: "Markus will have to choose between vengeance and dialogue with the humans."
- Markus dead: "North is going to take his place."

There are no choices and no stat icons in this part.

### 2b. Kara: Markus or North, and Alice's secret (K10 to K27)

**Magazines.** They lie on a crate before the stairs and exist only if Markus charged in Freedom March (see section 6).

**`MEET MARKUS`** (Markus alive) or **`MEET NORTH`** (Markus died in Freedom March). Kara asks for passports. Markus: "Detroit's under curfew… Maybe you should stay here a while." Kara's reply is automatic and depends on Connor:
- "Connor knows the location of Jericho": "Maybe you're right… We might be safer here until things calm down."
- "Connor series was decommissioned": "Thanks for the offer… But we wanna leave now."

Off-chart dialogue, with no icons in the transcript:

| Round | Speaker / condition | Options |
|---|---|---|
| North only | North: "I'll have him give you one." | `MARKUS…` ("I heard about what happened today… And Markus being killed… He gave hope to our people." North: "I was there when they killed him…") / `THANK YOU` |
| Both | "You know that humans hate us… Why are you protecting her?" | `BOND` ("She needs me. And I need her.") / `NO DIFFERENCE` ("I don't care whether she's human or android…") / `SECRET` ("It's a long story.") |

**`GO BACK TO ALICE`, `SPOT THE ANDROID CHILD`, `JOIN ALICE`.**
- Kara sees a YK500 with an LED. She always has a flashback of the YK500 flyer (wiki Note).
- If Todd chased Kara in Stormy Night, she also has a flashback of Todd: "COME BACK HERE! YOU'RE MINE!".
- The explanation comes from Luther if alive ("You knew from the beginning. You just didn't want to see it. She wanted a mom, and you wanted someone to care for… Forgetting who you are, to become what someone needs you to be... Maybe that's what it means to be alive.").
- If Luther is dead, Lucy says it instead (transcript death-unlock "Luther is dead"; Lucy page).

Alice: "Kara? Is there something wrong?.."

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `HUG` (`HUG ALICE`) | Alice: "We'll be together forever, won't we Kara?" Kara: "Yes, forever…" | Alice large up, Luther small up | Alice large up; Luther up |
| `DISTANT` (`STAY DISTANT`) | Luther: "Come on… let's not stay here." "Luther and Alice leave Kara." | Alice large down | Alice large down; Luther down |

**What follows the choice:**
- **No raid** (Connor did not find Jericho): the chapter ends for Kara, with `KARA, ALICE & LUTHER LEFT JERICHO` or `KARA & ALICE LEFT JERICHO` (transcript: "Kara's part of this chapter ends if Jericho is not attacked").
- **Raid and `HUG`:** `KARA & ALICE IN THE CORRIDOR`.
- **Raid and `DISTANT` with a low Alice relationship:**
  - `ALICE LEAVES WITH LUTHER` or `ALICE LEAVES ALONE`, then `JERICHO IS UNDER ATTACK`, then a choice:
    - `RUN AWAY` → `KARA LEFT JERICHO ALONE` (Kara's story ends; secret ending "Alone again").
    - `FIND ALICE` → Alice large up; Kara: "Alice… I'm so sorry." This leads to the corridor.
  - Transcript lock on `FIND ALICE`: "Alice relation is below WARM and choose DISTANT".
  - Wiki flowchart: "(if Alice status was DISTANT from the beginning and did not increase to NEUTRAL, and Connor found Jericho)".
  - Wiki Note: "The only way to have Alice… leave Kara before Connor confronts Jericho's leader is to keep her status DISTANT from the beginning and never raise it to NEUTRAL, and when Kara chooses 'Distant'".
  - PowerPyx commenters disagree on the exact threshold, and one says it is glitched since v1.04. See Open questions.
- **Raid and `DISTANT` when Alice is above the threshold:** straight to the corridor.

### 2c. Kara: corridor and crossroad (K28 to K51)

**Corridor.** `ESCAPE WITH LUTHER` (Luther alive) or `SEARCH FOR EXIT` (Luther dead). These are navigation, not choices.
- Standing still (`OUT OF TIME`) or running at the soldiers (`WRONG WAY`) ends in capture: `KARA, ALICE & LUTHER CAPTURED` or `KARA & ALICE CAPTURED`. PowerPyx: "don't move and let yourselves get arrested" / "run towards soldiers and get arrested".
- Otherwise:
  - With Luther: `LUTHER OPENS THE DOOR`, `GO THROUGH THE DOOR`, `LUTHER IS SHOT`. PowerPyx: "Luther will always get shot here."
  - Without Luther: `ANDROID OPENS DOOR AND IS SHOT`, `GO THROUGH THE DOOR`.

**Crossroad.** `KARA & ALICE AT CROSSROAD`. The same `OUT OF TIME` / `WRONG WAY` failures lead to `KARA & ALICE CAPTURED`. With Luther, `RUN TO LUTHER`. Luther: "It's too late, Kara! Save yourself! Save Alice!" Alice: "No, we're not going to leave you behind!"

| Option | Requires | Icons (transcript) | Wiki | Leads to |
|---|---|---|---|---|
| `HELP LUTHER` | Luther alive | Alice small up, Luther small up | Alice up, Luther up | QTE outcomes below |
| `PROTECT ALICE` (chart `LEAVE LUTHER`, [lock]) | Luther alive | Alice small down | Alice down ("Protecting Alice and leaving Luther behind") | Alice: "They're going to kill him!"; then the CONSOLE/HURRY round |

The outcomes of `HELP LUTHER`:
- **`GET LUTHER TO SAFETY`, then `LEAVE LUTHER HIDDEN`.** Luther: "You can't put Alice in danger… Don't worry, I'll catch up with you at the border". The game then goes to `RUN TOWARD EXIT`.
- **`FAIL`, then `CAUGHT BY SOLDIER`.** This ends in `KARA, ALICE & LUTHER CAPTURED`. PowerPyx: "don't walk any further and get yourselves busted".

The CONSOLE/HURRY round after `PROTECT ALICE` is off the chart:
- `CONSOLE`: "We have to be strong. So he didn't die for nothing". No icon.
- `HURRY`: "If we don't get outta here now, they're going to kill us too!". Alice small down; the wiki agrees ("Choosing 'hurry' after leaving Luther behind").

The left Luther is not seen again in this chapter. Luther page: "If Kara ditches him, he is not seen again, however, his death is not confirmed."

### 2d. Kara: the cabin (K52 to K63)

The path runs `RUN TOWARD EXIT`, `SOLDIERS BLOCK THE WAY`, `HIDE`, `ANDROID SEEKS SHELTER`. The android is female: "Open up! Open up, they're coming! Please open the door!" Alice: "She'll die out there Kara! Open it!"

| Option | Icons (transcript) | Wiki | Result |
|---|---|---|---|
| `OPEN` (`OPEN THE DOOR`) | Alice small up | Alice up | `ANDROID ENTERS BUT IS SHOT`. Then a QTE against the soldier: `FIGHT BACK` leads to `ESCAPE CABIN`; `CAPTURED` leads to `KARA & ALICE CAPTURED` (PowerPyx: "fail the QTE against the soldier") |
| `DON'T OPEN` (`KEEP THE DOOR CLOSED`) | Alice small down | Alice down | `SOLDIERS SHOOT ANDROID AND MOVE ON`, then `ESCAPE CABIN`. Kara: "There was nothing we could do." |

### 2e. Kara: flight to the breach (K64 to K101)

**`TRY TO ESCAPE`.** A mash QTE. PowerPyx: "Almost Reach the Breach: successfully mash [X]… Fail to Run: don't mash [X] and Kara gets shot". Kara: "A way out! We're safe, Alice!" Soldier: "Stop!"

After `ALMOST REACH THE BREACH` → `SOLDIERS SHOOT AT THE CROWD`, there is a three-way choice. The transcript lists the options as `PLAY DEAD`, `RUN`, `SURRENDER`:

| Option | Next | Detail |
|---|---|---|
| `PLAY DEAD` | `SOLDIERS CLOSE IN`: [choice] `DEFEND ALICE` / `DON'T MOVE` (chart `REMAIN STILL`) | `REMAIN STILL` → `LEAVE JERICHO` → `KARA & ALICE ESCAPED JERICHO` ("Come on, let's get outta here!"). `DEFEND ALICE` "Leads to the same result as choosing ATTACK": with Luther hidden, `LUTHER SACRIFICES HIMSELF` → escape; with Luther dead, `KARA IS SHOT` → `GET CLOSER TO ALICE` → `KARA & ALICE DIED IN THE ASSAULT`. The transcript has a death scene ("Luther is dead and Kara played dead before attacking"): "We did it, Alice… Are we free? Yes… we're free… I love you too…" with the HUD `SHUTDOWN IMMINENT` |
| `RUN` (chart `RUN AWAY`) | `KARA IS SHOT IN THE LEG` | see the leg-shot round below |
| `SURRENDER` | [choice] `FACE` / `CONVINCE` / `OBEY` / `RUN AWAY` | Soldier: "Stay where you are! Come on. Go join the others." Kara: "Whatever happens, just... Stay calm." |

The surrender round:
- `FACE` (transcript `ATTACK`): with Luther hidden, `LUTHER SACRIFICES HIMSELF` → `LEAVE JERICHO`. Otherwise `KARA IS STRUCK` → `ALICE INTERVENES` ("No, please don't kill her!") → `KARA & ALICE CAPTURED`.
- `CONVINCE` ("please let her go… She's just a little girl"): `SOLDIER THREATENS KARA & ALICE` ("A heap of plastic, you mean") → `RAISE ARMS` → captured.
- `OBEY`: `RAISE ARMS` → captured.
- `RUN AWAY`: `KARA IS SHOT IN THE LEG`.

**The leg-shot round** follows `KARA IS SHOT IN THE LEG`, reached from `FAIL TO RUN`, `RUN` or `RUN AWAY`. Alice: "Kara! Get up! He's coming!" The options:

| Option | Gate | Result |
|---|---|---|
| `SURRENDER` | none | `RAISE ARMS` → `KARA & ALICE CAPTURED` ("Can it walk?" Alice: "Yes, I'll help her…") |
| `FACE` (transcript `ATTACK`) | none | Luther hidden: `LUTHER SACRIFICES HIMSELF` → escape. Luther dead: `KARA IS STRUCK` → `ALICE INTERVENES` → captured |
| `CRAWL` [no-entry] | only after `GET UP` (wiki "(if Kara already tried to Get Up) Crawl"; transcript shows it in the second round) | `ALICE IS SHOT` → `KARA & ALICE DIED IN THE ASSAULT` ("Alice! No… No!..") |
| `OUT OF TIME` [no-entry] | let the timer run out | same as `CRAWL` |
| `GET UP` | first round only | `KARA FAILS TO GET UP`, which returns with `CRAWL` / `ATTACK` / `SURRENDER` |
| `PLAY DEAD` | none | `SOLDIERS CLOSE IN` (as above) |

**Luther's sacrifice.** "Luther sacrifices himself" requires that Luther was helped and hidden earlier. PowerPyx comment: "If you 'Play Dead' and then 'Defend Alice' with Luther still alive (kept him alive in Midnight Train and you helped him earlier) he will suddenly appear and sacrifice himself… also occurs in… 'Surrender' – 'Face' and 'Run Away' – 'Kara Shot in Leg' – 'Face'." Luther: "You're gonna have to continue the journey without me, Alice… I was a machine... You made me part of a family… Take good care of Kara… Promise me?"

**No icons in the flight.** The transcript shows no relationship icons anywhere in the breach sequence.

### 2f. Markus: the captain's cabin (M1 to M20)

**Markus dead (Freedom March).** The opening is `CAPTAIN'S CABIN WITH NORTH`. The cutscene `JOSH AND NORTH DISCUSS` (Simon dead) or `JOSH, SIMON AND NORTH DISCUSS` (Simon alive) plays. North: "THAT'S ENOUGH! Markus is gone… We have to fight them… Gather up all the guns you can find, we leave at dawn." Josh: "You're making a mistake North. You will not buy our freedom with blood." There is no choice. The ending is `NORTH STAYED ALONE WITH HER THOUGHTS`, then Connor's cabin scene if he found Jericho.

**Markus alive.** The opening is `COUNSEL WITH SIMON, JOSH AND NORTH` (Simon alive) or `COUNSEL WITH JOSH AND NORTH`. Josh: "We're short on blue blood and biocomponents…" Simon: "President Warren is saying we're a threat to national security…" Josh: "It's all our fault…"

Four off-chart dialogue rounds follow. Icons are from the transcript.

**Round 1 (tone).** No icons:
- `AGGRESSIVE`: "Live like cowards just to survive?"
- `DETERMINED`: "I'd rather die free than live as a slave."
- `RIGHTEOUS`: "they're killing us! Nothing is gonna justify that."
- `SOMBER`: "So now they punish us for who we are."

**Round 2 (Josh's accusation).** Josh's line depends on earlier choices:
- Peaceful march and pacifist speech: "What's the point of being free if no one is left alive?"
- Peaceful march and aggressive speech: "Your television speech sounded like a declaration of war… You reap what you sow!"
- Attacked the police: "It was a peaceful march, and you chose to attack…"
- The wiki also quotes a line for killing Chris: "You are responsible for the deaths of two policemen". The transcript has a TODO for `02SHOTPOLICEMEN`.

| Option | Line | Icon (transcript) | Wiki |
|---|---|---|---|
| `ANGRY` | "You keep complaining. What have you done exactly, Josh?" | Josh small down | Josh down |
| `BITTER` | "We either fight for our freedom, or we die in silence." | none | none |
| `REMORSE` | "Maybe my judgement was clouded by... Anger." | Josh small up | Josh up |
| `NO REGRETS` | "Humans enslaved us! I'll never regret standing up to that." | none | none |

**Gate after round 2: Jericho reputation.**
- **Unpopular** (`MARKUS OUSTED`). Jericho large down (transcript and wiki: "Having an unpopular reputation with Jericho"; Relationship Stat: "Drops to 'Rejected'"). North: "You can no longer lead the revolution. You're not the one we've been waiting for. I'm gonna take over…" Josh: "I'm with North." Simon: "I'm with North." Markus: "If that's what you want, then I'll leave." There is no detonator talk. The wiki footnote says of the detonator: "you can't get it if Markus was exiled from Jericho".
  - No raid: `MARKUS LEFT JERICHO` [lock].
  - Raid: `ON A ROOFTOP`, then `JERICHO IS UNDER ATTACK`, then [choice]:
    - `LEAVE FOREVER` → `MARKUS LEFT JERICHO`. This is the secret ending "Wasted Potential": "you must choose to 'Save yourself', leaving Jericho forever".
    - `GO BACK TO JERICHO`. If Connor remained a machine, this leads to `MARKUS IN THE CORRIDOR`. If Connor became deviant, it leads to the second `IN THE CORRIDOR WITH MARKUS`: Connor has already armed the bomb and Markus only joins the escape. Wiki: "Go Back to Jericho (if Connor remained a machine - leads to MARKUS IN THE CORRIDOR) OR (if Connor became a deviant - leads to IN THE CORRIDOR WITH MARKUS #2)".
    - With Markus gone, Connor faces North in the cabin.
- **Above Unpopular** (`DISCUSS WITH NORTH`). Simon (or Josh): "We shouldn't forget who our enemies are." North: "All that matters now is what we do next. Markus?" Rounds 3 to 5 follow.

**Round 3 (the plan).** This is the main counsel decision:

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `CONFRONTATION` | "We have to face them… Get all the guns that you can find. We're going to free Detroit." Josh: "You won't buy our freedom with blood!" | North small up, Josh small down | North up, Josh down |
| `DIALOGUE` | "Dialogue. It is the only way... I will go alone, try to talk to them one last time." North: "They'll kill you!" | North small down, Josh small up | North down, Josh up |
| `STAY HIDING` | "We are going to dig in here. We'll lay low…" North: "We can't hide in Jericho forever!" | Josh small up, North small down, Simon small up | Josh up, North down, Simon up |

**Round 4 (reflection, alone with North).** No icons:
- `SAD`: "Is this what we dreamed of?"
- `ANGRY`: "They're stupid!"
- `THOUGHTFUL`: "They've been butchering each other for centuries…" (wiki Note)
- `BITTER`: "I had a dream..."

North: "Since you've been here, you've given us hope… You've given me hope."

**Round 5 (the detonator).** North: "Today, a deviant arrived in Jericho and he told me that he stole a truck transporting radioactive cobalt… rigged it to explode. I convinced him not to do it, and to give me the detonator." Markus: "A dirty bomb…"

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `KEEP` | "I just hope we never have to use it…" | none | none ("Taking it unlocks some potential endings") |
| `REFUSE` | "We shouldn't become like them, North…" North: "I hope you're right…" | none | none |

**The kiss** (`KISS NORTH` / `DON'T KISS NORTH`). It requires "North has lover relationship status" (transcript). PowerPyx: "If Markus is lovers with north". Lover is reached by sharing memories in Freedom March (Relationship Stat: "Markus and North access each other memories in Freedom March (Rises to 'Lover')"). North: "Whatever happens tomorrow, I just want you to know that I- I'm glad I met you…"

| Option | Line | Icons (transcript) | Wiki |
|---|---|---|---|
| `KISS` | North: "I'll go join the others. Look after yourself… I don't wanna lose you." | none | North large up |
| `DON'T KISS` | Markus: "We have to get ready… The next few hours will be crucial." | North large down | North large down ("Refusing to kiss her") |

**After the talk.** `NORTH LEAVES MARKUS ALONE`.
- No raid: `MARKUS STAYED ALONE WITH HIS THOUGHTS`.
- Raid: `CONNOR WATCHES NORTH LEAVE` (Connor is outside the door), then `JERICHO IS UNDER ATTACK` after Connor's scene.

### 2g. Connor: Ferndale, Jericho, the cabin (C1 to C20)

**Arrival.** `FOLLOW JERICHO TRAIL`: Connor matches the hand graffiti to the walls (PowerPyx). `IN THE SHIP` is the `EXPLORE JERICHO` bracket, with all spots optional:
- `SPOT KARA`, `SPOT ALICE`: only when Kara is at Jericho. This is the scene where all three protagonists share a room (wiki Notes).
- `SPOT EXPLOSIVES`: always.
- `SPOT TRACI`: "If you let the Tracis go in The Eden Club"; they are upstairs to the left (commenter).
- `SPOT RUPERT`: "(only available if he escaped in The Nest)".
- The two magazines.

An unused background line: "Who's that? Never seen this model before…".

**`STOPPED BY LUCY`** is triggered near the stairs. Lucy: "You're lost. You're looking for something… You're looking for yourself…"

**The cabin.** Connor faces Markus (`BACK IN CAPTAIN'S CABIN`, Markus leading) or North (`… WITH NORTH`, if Markus died in Freedom March or was ousted). Amanda: "Well done, Connor. You succeeded in locating Jericho and finding their leader. Now deal with Markus [North]. We need it alive." Connor: "I've been ordered to take you alive, but I won't hesitate to shoot if you give me no choice."

**Facing Markus.** The player alternates between Markus and Connor. GamerGuides: "Play as both Markus and Connor". The wiki SI page lists these as "Choosing 'reason' as Markus…". Icons are from the transcript:

| Round | Played as | Options and icons | Wiki SI page / chapter page |
|---|---|---|---|
| 1 | Markus | `REASON` SI small up ("You are one of us… You can't betray your own people"); `DEFY` none; `DISCOURAGE` none ("Someone else will just take my place"); `THREATEN` none ("We are thousands! And you are alone") | "reason" up; "convince or discourage" up (SI page) / "'reason' or 'discourage'" up (chapter). Conflict on DISCOURAGE |
| 2 | Connor | `INTIMIDATE` ("Don't force me to neutralize you.") / `INSTRUCTIONS` ("You're coming with me!"); no icons | none |
| 3 | Markus | `CONVINCE` SI up ("You're just a tool…"); `APPEAL` SI up ("We are your people…"); `I KNOW YOU` none ("You're Connor, aren't you? That famous deviant hunter"); `OUR CAUSE` SI up | SI page: convince, appeal, our cause up; the chapter page lists "our cause" with no icon |
| 4 | Connor | `STAY BACK!` SI small down; `WARNING SHOT` SI small down; `ENOUGH!` SI small down; `SAY NOTHING` none | the chapter page gives all three down; the SI page lists only "warning shot" |
| 5 | Markus | `SOW DOUBTS`, `QUESTION`, `RALLY`, `UNDERMINE`, each SI small up | all up on both pages |
| 6 | Connor | "It's time to decide." `BECOME A DEVIANT` (lock "Have enough software instability"; Amanda large down) / `REMAIN A MACHINE` ("Nice try... But I'm no deviant.") | Amanda large down, "Lead to her being Betrayed" |

Markus can add at most three small SI increases (rounds 1, 3 and 5); Connor can subtract at most one (round 4).

**Facing North** (Markus dead or ousted). The player controls only Connor. North: "You're one of us. You can't betray your own kind."
- `INSTRUCTIONS` / `INTIMIDATE`: no icons.
- North: "You're Connor, aren't you?…" Then `STAY BACK!` / `WARNING SHOT` / `ENOUGH!` each SI small down; `SAY NOTHING` none.
- North: "We are your people…" Then `DISTURBED` SI small up ("Shut up. You're coming with me!"), `SAY NOTHING` none, `COLD` SI small down.
- North: "You never had any doubts…?" Then `COLD` SI small down ("I know what I am"), `DISTURBED` SI small up ("I'm not deviant, if that's what you wanna know"), `SAY NOTHING` none.
- North: "Join our cause." The final choice is the same as with Markus.
- Wiki chapter page: "disturbed" up, "cold" down.

**Deviancy gate.** PowerPyx: "(Unlocked by having a high software instability)… If your software instability is too low, you won't have this option available and will be forced to follow your programming." No threshold is published.

### 2h. Connor: machine branch (C21 to C55)

**The raid begins.** `JERICHO IS UNDER ATTACK`, then `MARKUS JUMPS CONNOR` or `NORTH JUMPS CONNOR`. The leader escapes. Then `IN THE SHIP`, `PURSUE MARKUS` or `PURSUE NORTH`, `CARGO HALL`, `STOPPED BY SOLDIER`. Soldier: "Don't move!" Connor: "Don't shoot. I'm on your side." Soldier: "With us? Are you a human?"

| Option (transcript / chart) | Result |
|---|---|
| `LIE` / `ATTEMPT TO PERSUADE` | "DPD. I work with Lieutenant Hank Anderson… If I knew you were coming I would have brought some donuts." Soldier: "You're a lucky guy… You should go back up on deck." Leads to `RESUME PURSUIT` |
| `PERKINS EXCUSE` / `PERKINS ALIBI` | "I work with Agent Perkins." Same result |
| `ATTACK` | QTE. `NEUTRALIZE ASSAILANT` leads to `RESUME PURSUIT`; `FAIL TO NEUTRALIZE ASSAILANT` leads to `MACHINE CONNOR WAS DESTROYED` ("Fuckin' androids…") |
| `RUN` | `SOLDIERS SHOOT CONNOR`, then `MACHINE CONNOR WAS DESTROYED` |

There are no icons. Then `RESUME PURSUIT`:

**Markus alive (and on his mission).** In the hold: `CONNOR INTERRUPTS AND MARKUS PUSHES HIM ASIDE`. Connor: "My mission is to neutralize you and I always accomplish my mission." Markus: "And my mission is to save our species. Looks like only one of us can succeed…" The QTE is played as Markus (PowerPyx: "There will be a QTE that you'll play as Markus to determine Connor's fate"):
- **Markus reaches the gun:** `MARKUS SHOOTS CONNOR` [lock on Markus's chart]. Markus: "I didn't want this…" Connor: "We'll meet again, Markus. This isn't over." This leads to `MACHINE CONNOR WAS DESTROYED` and `TRIGGER THE COUNTDOWN`.
- **Markus fails:** `CONNOR SHOOTS MARKUS`, then `CONNOR KILLED MARKUS`. Connor: "Mission accomplished." North: "Markus! No... They killed him…" The bomb is not set; Perkins: "We found several hundred androids in the hull… Take 'em away."
- Wiki Note: "the only way of Machine Connor leaving Jericho alive is if he kills Markus in the explosives room".

**Markus dead or ousted.** `CORRIDOR CONFRONTATION`, `FIND JOSH` (Josh: "It's all over… This is the end… Of Jericho…"), `SPOT NORTH`, then an outcome group:
- `MADE IT` → `NORTH ESCAPED` → `SOLDIER KILLS CONNOR`.
- `SHOT BY SOLDIER` → `SOLDIER KILLS CONNOR`.

Either way Connor dies with `MACHINE CONNOR WAS DESTROYED`. Wiki: "If Markus is already dead or ousted, Machine Connor is guaranteed to die as all outcomes for him end with him being shot by the soldiers." Connor's line: "Don't shoot. I'm on your side. I-" if he attacked the cargo-hall soldier; "Fuckin' android!" otherwise.

### 2i. Connor: deviant branch (C56 to C123)

**The warning.** `WARN MARKUS` / `WARN NORTH`. Connor: "They're going to attack Jericho… We have to get outta here!" Then `JERICHO IS UNDER ATTACK`.

Where Connor's raid goes depends on Markus. The wiki's list:
- "(if Markus died/left before attack - leads to 'Deviant Connor in Corridor #1')"
- "(if Markus died before reaching 'Markus in the Corridor' - leads to 'Deviant Connor in Corridor #2')"
- "(if Markus died after 'Markus in the Corridor' but before 'In the Hold with Markus' - leads to 'Connor Takes Over Markus' Mission')"
- "(if Markus died trying to activate the bomb - leads to 'Deviant Connor in Corridor #3')"
- "(if Markus triggered the bomb - leads to 'Connor Joins the Others')"

When Markus is gone, Connor takes over:
- In the corridor, Josh: "Our people are trapped in the lower deck…" North: "We have to blow up Jericho, it's our only chance!" Connor: "I'll go… Don't worry... I always accomplish my mission."
- After Markus dies in the corridor, North: "Markus! No..." Connor: "I'll go."
- The route then copies Markus's: `MEET LUCY` (Lucy: "You've chosen your side... But it's too late. Run… Get out of here!") → `BRIDGE COLLAPSES` → `SNEAK PAST SOLDIERS` → `SOLDIERS THREATEN ANDROIDS` (`STAY AWAY` / `INTERVENE`) → `NEXT CORRIDOR` → `SOLDIERS COMING` (`JUMP SOLDIERS` / `CLIMB BESIDE SOLDIERS` / `LOSE TOO MUCH TIME`) → `ENTER A WELL` → the reservoir.
- The transcript shows no Jericho icons for any of Connor's choices.

**Josh cannot be saved by Connor.** `APPROACH HOLD` leads to `JOSH IS DYING` and `COMFORT JOSH`. Commenter: "only Marcus has the option to save Josh". Wiki Note: "If Markus is not there, then Josh's survival is based on whether Connor dies before seeing him."

**The hold.** `IN THE HOLD WITH DEVIANT CONNOR`, `IN CONTROL ROOM`, `SOLDIERS INTERRUPT`:
- **`NEUTRALIZE THEM`:** `ARM EXPLOSIVE`. North: "Connor!" Connor: "The bomb's gonna explode!"
- **`FAIL`:** `CONNOR IS SHOT DEAD`. Soldier: "I'll teach you to act like a hero, asshole." North: "Connor!.. No…"

**Escape (#3).** `JOIN THE OTHERS`, `TRY TO ESCAPE`:
- **`OUT OF TIME`:** `NORTH JUMPS` (`SIMON JUMPS WITH HER` if alive), and Connor is destroyed.
- **`MADE IT`:** `CONNOR JUMPS` with Simon and North, ending `CONNOR ESCAPED WITH JERICHO'S PEOPLE`.

**Markus triggered the bomb.** `CONNOR JOINS THE OTHERS`, then an outcome group:
- `HELP MARKUS` → `CONNOR JUMPS WITH THE OTHERS`.
- `FAIL TO HELP MARKUS` → `DEVIANT CONNOR WAS DESTROYED ON THE SHIP`.

This is the same event as Markus's `KILL THE SOLDIERS` / `DIE BUYING SOME TIME` when North is shot (2j).

**Wound rule.** Wiki Connor page: "If Connor becomes deviant… and was shot in an earlier scene… he will be killed." Commenter: "the soldiers will only kill you if you've already been shot twice before… Get shot a total of three times and you die". See Open questions.

### 2j. Markus: the raid (M21 to M108)

**`IN THE CORRIDOR WITH MARKUS` and `MEET YOUR TEAM`.** North: "They're coming from all sides! Our people are trapped in the hold, they're gonna be slaughtered!" An off-chart dialogue round follows, with no icons:
- `MESSAGE`: "There are exits on the second and third floor… jump in the river!"
- `SIMON AND JOSH` (Simon alive) or `JOSH` (Simon dead).
- `HELICOPTERS`.
- `BLOW UP JERICHO`: "If the ship goes down, they'll evacuate and our people can escape!" A deviant Connor adds: "She's right! They know who you are."

PowerPyx: "he will always end up with this choice". Markus: "Go and help the others. I'll join you later."

**`TRY TO ESCAPE`.** Walking the wrong way (`WRONG WAY`) or standing still (`OUT OF TIME`) leads to `SOLDIERS SHOOT MARKUS`. Then either `MARKUS IS WOUNDED`, which loops back, or `SOLDIERS KILL MARKUS`. PowerPyx: "Markus repeatedly runs back to the soldiers and gets shot 3 times. The third bullet kills him." GamerGuides: "the third hit will kill him".

With a deviant Connor, Markus's death here hands the mission to Connor. The transcript: "Soldiers shoot Markus twice… Connor: I'll go." Otherwise `MEET LUCY` (Lucy: "This is the end of Jericho… Save our people, Markus…") leads to `A BRIDGE BREAKS UNDER MARKUS`.

**`MARKUS IN THE CORRIDOR`.**
- **`SOLDIERS THREATEN ANDROIDS`.** Androids: "Please don't kill us!"
  - `INTERVENE`: Jericho small up (transcript). Then a QTE:
    - `DEAL WITH SOLDIERS` → `ANDROIDS ESCAPE` ("Markus… You saved us…").
    - `GET SHOT` → `MARKUS WOUNDED` → `ANDROIDS ESCAPE` ("Markus… Are you wounded?..").
    - Already wounded: `MARKUS COLLAPSES` → ending.
  - `DON'T INTERVENE` (chart `STAY AWAY`): Jericho small down; `ANDROIDS ARE KILLED`.
- **`SOLDIERS COMING MARKUS' WAY`.** PowerPyx: "During the 10s timer":
  - `JUMP SOLDIERS` ("run straight ahead").
  - `CLIMB AWAY` ("climb the wall on the left").
  - `TIME OUT` → `MARKUS WOUNDED` (first hit) or `MARKUS COLLAPSES` (already wounded) → ending.
- **`ENTER A WELL`, `ANDROIDS ARE CHASED BY SOLDIERS`.** Androids: "We surrender! We surrender, don't shoot!"
  - Interact with the pipe or rope on the right, `KNOCK SOLDIERS OUT`: Jericho small up ("Markus! It's Markus!").
  - Walk past: `ANDROIDS ARE SHOT`, Jericho small down (transcript "Abandoned androids").
  - PowerPyx: "Immediately after the last 10s timed scene… interact with a rope on the right side… If you go too far you will miss it."
- **`APPROACH THE HOLD`, `JOSH FIGHTING A SOLDIER`.** Markus: "Josh…"

| Option | Result | Icons (transcript) | Wiki |
|---|---|---|---|
| `INTERVENE`, `NEUTRALIZE SOLDIERS` | `JOSH ESCAPES` ("Quick, this way!" Markus: "Find North! I'll join you later!") | Jericho small up, Josh large up | Josh large up ("Choosing 'intervene' and saving him"); Jericho up |
| `INTERVENE`, `LOSE THE UPPER HAND`, not wounded | `JOSH SACRIFICES HIMSELF`, then `COMFORT JOSH`. Josh: "That's what causes violence… Don't become like them, Markus…" | Jericho small down | Jericho down ("Choosing to let Josh die") |
| `INTERVENE`, `LOSE THE UPPER HAND`, wounded | `MARKUS COLLAPSES`, `JOSH IS SHOT BY THE SOLDIER`, `MARKUS KILLED AND MOST OF JERICHO CAPTURED`. Soldier: "Got you, motherfucker." North: "Markus! No..." | Jericho small down | – |
| `HIDE` (chart `STAY AWAY`) | `SOLDIER SHOT JOSH` [lock], then `COMFORT JOSH` | Jericho small down | Jericho down |

The `JOSH SACRIFICES HIMSELF` row has a disputed condition. GamerGuides: "If your reputation with Josh is in good standing, then he will save Markus". A commenter: "Markus's relationship with him needs to be Highly Positive". Another commenter: "you don't have to be close with Josh… don't let Markus get shot at all up until Josh is fighting the soldier". See Open questions.

**`IN THE HOLD WITH MARKUS`, `ENTER OLD ENGINE CONTROL ROOM`.**
- **Machine Connor:** the gun QTE described in 2h. If Markus wins, `TRIGGER THE COUNTDOWN`.
- **Deviant Connor, or no Connor:** `SOLDIERS INTERRUPT` (Soldier: "DON'T MOVE! Go and join the others!").
  - `NEUTRALIZE THEM` → `TRIGGER THE COUNTDOWN`.
  - `FAIL TO NEUTRALIZE THEM` → `MARKUS IS SHOT DEAD`. Simon or Josh: "Come on, we gotta go!" North: "They killed him…" When Connor is deviant, Connor's chart shows `DEVIANT CONNOR IN CORRIDOR` #3: he then arms the bomb.

**Escape (second `IN THE CORRIDOR WITH MARKUS`).**
- **Rejoining the others.** `JOIN THE OTHERS` (transcript "Explosives were activated") gives North, Jericho, Josh and Simon one small up each (wiki: "When Markus rejoins his friends"). An exiled Markus who came back gets Jericho large up instead (wiki chapter page: "If outcast as leader but returns to save the people"). North: "Markus, I'm sorry-" Markus: "There's no time, come on."
- **`TRY TO ESCAPE`.** Standing still (`LOSE TOO MUCH TIME`) leads to `MARKUS GETS SHOT`. Perkins: "Wait! This one's mine. Nowhere to run… Nowhere to hide." `NORTH ESCAPES`, and the others jump with her, ending `MARKUS DIED BUYING TIME FOR JERICHO`.
- **`NORTH IS SHOT`.** Simon or Josh: "It's too late, Markus! There's nothing we can do for her, we've gotta run!"

| Option | Condition | Result | Icons (transcript) | Wiki |
|---|---|---|---|---|
| `SAVE NORTH` | Markus wounded earlier | Markus stops short. North dies. Simon: "Come on Markus!" | Jericho small down, Simon small down, Josh large down | Note: "If Markus is shot prior to reaching the hold… Markus will be unable to save her" |
| `SAVE NORTH`, QTE `SAVE NORTH` ✓ | not wounded | With a deviant Connor alive: `CONNOR PROTECTS MARKUS AND NORTH`, then QTE `KILL THE SOLDIERS` / `DIE BUYING SOME TIME` (Connor dies) → `MARKUS JUMPS`. With no deviant Connor: `RUN TO EXIT` → `MARKUS JUMPS`, or too slow → `MARKUS GETS SHOT` ("NO! Markus!" "Save our people…") and North escapes | Jericho small up, North large up, Josh small up, Simon small up | North large up; Jericho, Josh, Simon up |
| `SAVE NORTH`, QTE `FAIL TO SAVE NORTH` ✗ | not wounded | Deviant Connor alive: North dies; `CONNOR RESCUES MARKUS` → kill/die QTE → `MARKUS JUMPS`. No deviant Connor: `MARKUS GETS SHOT` (Perkins), `NORTH ESCAPES`, Markus dies | deviant case: Jericho small down | "Choosing to let North die or failing to save her": Jericho down, Josh large down, Simon down |
| `RUN` (chart `RUN AWAY`) | – | North dies. Simon and Josh: "Come on, Markus!" → `MARKUS JUMPS` | Jericho small down, Simon small down, Josh large down | same |

**`RUN TO EXIT` gate.** Commenters: "Connor must be a MACHINE, North… has to be saved… since Connor is a machine-he must be died in order to get Marcus to escape". Also: "I was able to unlock it by NOT having Connor with me".

**`MARKUS JUMPS`.** This leads to `MARKUS FLED WITH HIS PEOPLE`, with `SIMON` / `JOSH` / `NORTH` / `CONNOR JUMPS WITH HIM` for each one alive.

**Closing.**
- Bomb detonated: Soldier: "The ship is sinking, Sir." Perkins: "Order the men to evacuate… This ain't over, Markus…" If Markus is dead or gone: "This isn't over…".
- No bomb: "We found several hundred androids in the hull, Sir." "Take 'em away."
- Wiki Note: "if Markus survives the attack on Jericho, the ship will always explode. However, there is one combination… Markus is exiled… but returns and manages to escape into the water [and] Connor becomes deviant but dies after seeing Lucy and before arming the explosives."

---

## 3. Numbers

### Probabilities and timers

- **No probability is stated anywhere for this chapter.** The wiki, PowerPyx, GamerGuides and the transcript strings all lack one. There is no HUD percentage string in the transcript for these chapters, and the flowchart strings carry none.
- **Timers:**
  - "Jump Soldiers: During the 10s timer, choose to run straight ahead… Climb Away: During the 10s timer… Time Out: Let the 10s timer run out." (PowerPyx Markus.) GamerGuides: "You'll have a 10 second timer".
  - The other timed beats have no stated length: `OUT OF TIME` in the corridors, `LOSE TOO MUCH TIME` during the escape, Kara's `OUT OF TIME` at the leg shot, and the breach mash. PowerPyx: "stand still in the corridor until a bullet hits Markus".
- **Hit counts:** Markus and deviant Connor die on a repeat hit.
  - Wiki flowchart: "(if Markus is already wounded) Soldier Kills Markus".
  - PowerPyx: "gets shot 3 times. The third bullet kills him".
  - GamerGuides: "the third hit will kill him".
  - Commenter: "failing the QTE will only get him killed if he has already been wounded twice".
  - The transcript's death conditions read "Soldiers shoot Markus twice", "Markus shot twice", "Soldiers shoot Connor twice before arming explosive". This suggests the wrong-way loop counts hits per shot.
  - See Open questions.

### Relationship icons (no numeric magnitudes anywhere)

The tables mark each change as transcript (T) and/or wiki chapter page (W), with the Relationship Stat page (RS) where it adds anything.

**Alice (Kara)**

| Event | Icon | Source |
|---|---|---|
| `HUG` | large up | T, W ("Hug her {{Icon\|largeup}}"), RS |
| `DISTANT` | large down | T, W ("Stay distant {{Icon\|largedown}}"), RS |
| `FIND ALICE` after distant | large up | T, W ("Finding her if Kara was distant… after Jericho is attacked {{Icon\|largeup}}") |
| `HELP LUTHER` | small up | T, W |
| `PROTECT ALICE` (leave Luther) | small down | T, W |
| `HURRY` after leaving Luther | small down | T, W |
| `OPEN` the door | small up | T, W |
| `DON'T OPEN` | small down | T, W |

**Luther (Kara)**

| Event | Icon | Source |
|---|---|---|
| `HUG` | small up | T, W ("Kara hugs Alice {{Icon\|up}}") |
| `DISTANT` | small down | W only ("Kara stays distant from Alice {{Icon\|down}}"); T shows none |
| `HELP LUTHER` | small up | T, W |

**Jericho (Markus)**

| Event | Icon | Source |
|---|---|---|
| reputation Unpopular (ousted) | large down (to Rejected) | T, W, RS |
| exiled Markus returns and rejoins | large up | W, RS |
| `INTERVENE` (first androids) | small up | T; W "save the first two androids"; RS "first three androids" |
| `DON'T INTERVENE` | small down | T, W |
| `KNOCK SOLDIERS OUT` | small up | T; W "save the next two androids" |
| walk past (androids shot) | small down | T; W "Failing to save the next two androids on time" |
| Josh: `NEUTRALIZE SOLDIERS` | small up | T; W "Choosing to save Josh" |
| Josh: `LOSE THE UPPER HAND` or `HIDE` | small down | T; W "Choosing to let Josh die" |
| rejoin the others | small up | T, W |
| `SAVE NORTH` succeeds | small up | T, W |
| North dies (injured, failed with Connor, or `RUN`) | small down | T, W |

**North**

| Event | Icon | Source |
|---|---|---|
| `CONFRONTATION` | small up | T, W |
| `DIALOGUE` / `STAY HIDING` | small down | T, W |
| `KISS` | large up | W, RS (T: none) |
| `DON'T KISS` | large down | T, W, RS |
| rejoin the others | small up | T, W |
| `SAVE NORTH` | large up | T, W |

**Josh**

| Event | Icon | Source |
|---|---|---|
| `REMORSE` | small up | T, W |
| `ANGRY` | small down | T, W |
| `CONFRONTATION` | small down | T, W |
| `DIALOGUE` / `STAY HIDING` | small up | T, W |
| saved (`NEUTRALIZE SOLDIERS`) | large up | T, W |
| rejoin the others | small up | T, W |
| `SAVE NORTH` | small up | T, W |
| North dies (injured, or `RUN`) | large down | T, W ("Choosing to let North die or failing to save her {{Icon\|largedown}}") |

**Simon**

| Event | Icon | Source |
|---|---|---|
| `STAY HIDING` | small up | T, W |
| rejoin the others | small up | T, W |
| `SAVE NORTH` | small up | T, W |
| North dies (injured, or `RUN`) | small down | T, W |

**Amanda (Connor)**

| Event | Icon | Source |
|---|---|---|
| `BECOME DEVIANT` | large down (to Betrayed) | T, W ("Becoming a deviant {{Icon\|largedown}} (Lead to her being Betrayed)"), RS |

### Software instability (Connor)

| Event | Icon | Source |
|---|---|---|
| Markus: `REASON` | small up | T, W, SI page |
| Markus: `DISCOURAGE` | small up per W and the SI page; **none** per T | conflict |
| Markus: `DEFY`, `THREATEN`, `I KNOW YOU` | none | T; not on W |
| Markus: `CONVINCE`, `APPEAL` | small up | T, W, SI page |
| Markus: `OUR CAUSE` | small up per T and the SI page; W lists it with no icon | probably a missing icon on W |
| Markus: `SOW DOUBTS`, `QUESTION`, `RALLY`, `UNDERMINE` | small up | T, W, SI page |
| Connor: `STAY BACK!`, `ENOUGH!` | small down | T, W (the SI page lists only "warning shot") |
| Connor: `WARNING SHOT` | small down | T, W, SI page |
| Connor: `SAY NOTHING` | none | T |
| Connor vs North: `DISTURBED` (twice) | small up | T, W, SI page |
| Connor vs North: `COLD` (twice) | small down | T, W, SI page |

The deviancy option needs "Have enough software instability" (T lock; Connor page "Only if Connor's software instability is high"). No threshold is published.

### Public opinion

**None in this chapter.** The Public Opinion page has no Crossroads entry. Line 72 says only how the public is shown: "In Crossroads, the public will be shown sympathizing with androids following the events of Freedom March if Markus runs away or stands his ground and will call them monsters… if he chooses to attack. Their reaction will be the same regardless of what the Public Opinion Gameplay Stat's ranking currently is." The magazines and TV carry no stated effect.

### Choices with no stated number or icon

The following have no number or icon in any source:
- All of Kara's meeting dialogue (`BOND`, `NO DIFFERENCE`, `SECRET`, `MARKUS…`, `THANK YOU`) and `CONSOLE`.
- Every choice in the breach sequence.
- Markus's round 1 and round 4 options, `BITTER`, `NO REGRETS`, `KEEP` and `REFUSE`, and the `MEET YOUR TEAM` lines.
- Connor's `INTIMIDATE` and `INSTRUCTIONS`, every cargo-hall choice, and every choice in the deviant takeover (no Jericho icons are shown for Connor).
- The optional spots.

None of the performance groups has a published success rate.

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Connor located Jericho (Last Chance, Connor evidence, or Kamski's key in Meet Kamski) | The raid happens. Without it: Kara ends at K26 or K27, Markus at M13 or M20, North at M7; Connor's chart is unplayed | Wiki Kara "(if Connor did not find Jericho) Kara, Alice & Luther Left Jericho"; Markus "(if Connor did not find Jericho) Markus Left Jericho / Markus Stayed Alone With His Thoughts"; PowerPyx comment "Only if Connor survives Last Chance, Connor" |
| Luther survived Midnight Train | K2 versus K1; Luther explains Alice (otherwise Lucy); Luther corridor, `RUN TO LUTHER`, the sacrifice nodes | Chart tab `LUTHER SACRIFICED IN 'MIDNIGHT TRAIN'`; Lucy page "If Luther died… Lucy replaces him" |
| Markus died in Freedom March | Kara meets North; `CAPTAIN'S CABIN WITH NORTH`; Connor confronts North | Chart tab `MARKUS DIED IN 'FREEDOM MARCH'` (Kara and Markus charts) |
| Simon alive (Stratford Tower, Public Enemy, Freedom March) | `COUNSEL WITH SIMON, JOSH AND NORTH` versus `… JOSH AND NORTH`; Simon's lines; `SIMON JUMPS WITH HIM/HER` | PowerPyx "Simon has died (can die in The Stratford Tower, Public Enemy, or Freedom March)" |
| Jericho reputation Unpopular | `MARKUS OUSTED` | PowerPyx "Reputation with Jericho must be 'Unpopular' (most negative)" |
| North at Lover (shared memories in Freedom March) | `KISS NORTH` / `DON'T KISS NORTH` | T "North has lover relationship status"; RS "(Rises to 'Lover')" |
| Markus charged the police in Freedom March | Magazines on both charts; TV variant; Josh's "you chose to attack" line | Wiki "only available if Markus charged at the police in Freedom March"; T TV conditions |
| Freedom March peaceful, and the Stratford speech pacifist or aggressive | Josh's round-2 line | T |
| Alice relationship Distant and never higher | `ALICE LEAVES WITH LUTHER` / `ALONE`, and the `RUN AWAY` / `FIND ALICE` choice | Wiki Note; T lock "Alice relation is below WARM and choose DISTANT" |
| Todd chased Kara in Stormy Night | an extra flashback of Todd | Wiki Note |
| Tracis escaped (Eden Club); Rupert escaped (The Nest) | `SPOT TRACI`; `SPOT RUPERT` | Wiki Connor flowchart |
| Connor's software instability (whole game) | whether `BECOME DEVIANT` is offered | T lock; PowerPyx |
| Hank's state | Hank never appears. Hank quitting the force matters only in Night of the Soul | Wiki Note "Hank is the only main character who will never make an appearance in this chapter" |

### Out of this chapter

**Night of the Soul** (wiki Night of the Soul):
- **Setting.** `Jericho was attacked in 'Crossroads'` selects the Woodward Church versions ("Markus on Sacred Ground", "North on Sacred Ground"). Otherwise the scene is at Jericho ("Markus Among the People", "North Among the People").
- **Who leads:**
  - "Markus is still alive and did not leave" → Markus's scenes.
  - Markus dead or exiled → North leads ("North Decided to Attack the Camp").
  - Exiled Markus who returned: "North will apologize to Markus for exiling him in Jericho".
- **Connor:**
  - `Connor joined the revolution in 'Crossroads'` with Markus dead → "Connor on Sacred Ground".
  - With Markus alive → Markus's "Talk to Connor (if deviated)" → `Kill Connor` / `Spare Connor`.
  - "Thin Ice (Only available if Connor died during Crossroads)".
  - Wiki Note: "If deviant Connor dies here or in the next chapter he is automatically set on his machine route."
  - The SI page: the flowchart stat does not keep "Deviant" if deviant Connor died in Crossroads.
- **Who appears.** Alive North, Josh, Simon and Kara/Alice appear in the church:
  - "Talk to Kara (if alive)": "if she is alive and was not previously captured, and did not abandon Alice".
  - "Check On Josh (Only available if Markus survived Freedom March but died during Crossroads after saving Josh)".
  - North's injury dialogue if she was shot and saved.
- **Detonator.** Holding it shows in the church ("if he has the detonator, he holds it momentarily").
- **Known bugs.** The wiki Notes give two PS4 bugs: deviant Connor dies in Crossroads, Markus is absent, and Hank quit. These are "zombie Connor" and a softlock.

**Battle for Detroit** (wiki Battle for Detroit and the character pages):
- **Kara:**
  - Escaped (`KARA & ALICE ESCAPED JERICHO`) or no raid: "Kara Leaving Detroit".
  - "Luther Finds a Gun (if Luther was alive and Connor never found Jericho)". Luther starts with Kara only without a raid; PowerPyx: "he always gets injured here".
  - A hidden Luther returns as "Find Luther & Jerry (if Luther is alive and not already with Kara)".
  - Luther sacrificed or left behind → "Find Jerrys" (commenter: "it'll be 2 Jerrys you can rescue rather than Luther and a Jerry").
  - Captured endings → "Kara Captured" at the Recall Center.
  - `KARA LEFT JERICHO ALONE` and `KARA & ALICE DIED IN THE ASSAULT` end Kara's story. The first gives the secret ending "Alone again".
- **Markus:**
  - The detonator `KEEP` enables "Detonate Bomb (if Markus accepted the dirty bomb)" in both Demonstration and Revolution.
  - North at Lover enables "Kiss North (if North status is LOVER)" in Demonstration.
  - North dead: "Simon Gets Shot (if North died in Crossroads…)" and Simon's heart offer in the Revolution.
  - `MARKUS LEFT JERICHO` → secret ending "Wasted Potential".
  - With Kara gone, Connor failing Jericho, and Markus dead or exiled → "Kamski Ending".
- **Connor:**
  - Remained a machine, or died as a deviant → "Connor's Last Mission" at the Hart Plaza rooftop ("If Connor remained a Machine or died a deviant at Jericho, the scene will start here").
  - Deviant and spared → "Connor at the CyberLife Tower".
  - Amanda is "Betrayed" after `BECOME DEVIANT`.
  - Relationship Stat: Hank down "If Connor is a still a machine or died as a deviant in Crossroads in Battle for Detroit-Connor's Last Mission".
  - Wiki Note: "it is impossible for Connor-51 and Markus to fight in Battle for Detroit in the revolution route, as the only way Machine Connor can survive is by killing Markus."
- **Trophies:**
  - `THREE AT JERICHO`: "Bring the three characters to Crossroads".
  - `SCORCHED EARTH`: "Markus or Connor detonated the freighter".

---

## 5. Endings

| Character | Chart label | Icon | Conditions |
|---|---|---|---|
| Kara | `KARA LEFT JERICHO ALONE` | none | Raid, low Alice, `STAY DISTANT`, Alice leaves, `RUN AWAY`. Kara's story ends; Alice's fate is unresolved. Secret ending "Alone again" |
| Kara | `KARA, ALICE & LUTHER LEFT JERICHO` | none | No raid, Luther alive (either choice at `JOIN ALICE`; whether Distant changes this is disputed) |
| Kara | `KARA & ALICE LEFT JERICHO` | none | No raid, Luther dead |
| Kara | `KARA, ALICE & LUTHER CAPTURED` (×2) | [lock] | Corridor `OUT OF TIME` / `WRONG WAY` with Luther; or `HELP LUTHER` → `FAIL` → `CAUGHT BY SOLDIER` |
| Kara | `KARA & ALICE CAPTURED` (×4) | [lock] | Corridor failure without Luther; crossroad failure; the cabin QTE `CAPTURED`; or the breach (`OBEY`, `CONVINCE`, `SURRENDER` after the leg shot, or `FACE` with Luther not hidden) |
| Kara | `KARA & ALICE DIED IN THE ASSAULT` | yellow [no-entry] | `CRAWL` or `OUT OF TIME` after the leg shot; or `PLAY DEAD` → `DEFEND ALICE` with Luther not hidden. Kara and Alice both die |
| Kara | `KARA & ALICE ESCAPED JERICHO` | none | `REMAIN STILL`; or Luther's sacrifice after `FACE` or `DEFEND ALICE` (Luther then dies) |
| Markus | `NORTH STAYED ALONE WITH HER THOUGHTS` | none | Markus died in Freedom March (the only Markus-chart outcome on that path) |
| Markus | `MARKUS STAYED ALONE WITH HIS THOUGHTS` | none | Not ousted, no raid |
| Markus | `MARKUS LEFT JERICHO` | [lock] | Ousted with no raid; or ousted with a raid and `LEAVE FOREVER` |
| Markus | `MARKUS KILLED AND MOST OF JERICHO CAPTURED` (×4) | [skull] | A third hit or a failed QTE: in the first corridor (`SOLDIERS KILL MARKUS`), the androids fight or the 10 s timer (`MARKUS COLLAPSES`), Josh's fight when wounded, or `FAIL TO NEUTRALIZE THEM` in the hold |
| Markus | `CONNOR KILLED MARKUS` | [skull] (Connor chart: [lock]) | Machine Connor; Markus fails the gun QTE |
| Markus | `MARKUS DIED BUYING TIME FOR JERICHO` | [skull] | Bomb set; `LOSE TOO MUCH TIME`; or North saved with no deviant Connor but too slow to the exit; or `FAIL TO SAVE NORTH` with no deviant Connor. North escapes |
| Markus | `MARKUS FLED WITH HIS PEOPLE` | none | `MARKUS JUMPS` after `RUN AWAY`, a saved North (`RUN TO EXIT`, or Connor protects), or a failed save with a deviant Connor |
| Connor | `MACHINE CONNOR WAS DESTROYED` (×3) | [skull] | Cargo hall `RUN` or a failed `ATTACK`; Markus wins the gun QTE; or the corridor confrontation with North (always) |
| Connor | `CONNOR KILLED MARKUS` | [lock] | Machine; Markus loses the gun QTE. The only surviving machine path |
| Connor | `DEVIANT CONNOR WAS DESTROYED ON THE SHIP` (×4) | [skull] | Takeover route: a repeat hit (wrong way or out of time, androids fight, `LOSE TOO MUCH TIME`); `FAIL` in the control room; `OUT OF TIME` at the jump; or `FAIL TO HELP MARKUS` |
| Connor | `CONNOR ESCAPED WITH JERICHO'S PEOPLE` | none | Deviant; `MADE IT` → `CONNOR JUMPS`, or `HELP MARKUS` → `CONNOR JUMPS WITH THE OTHERS` |

Every `… DESTROYED` card is followed by `CYBERLIFE WILL SEND A NEW CONNOR`.

Deaths possible in this chapter, by character:
- **Kara and Alice, together:** see `DIED IN THE ASSAULT`.
- **Luther:** sacrifice nodes (`LUTHER SACRIFICES HIMSELF` ×3). "Left behind" is unconfirmed.
- **Markus:** five ending cards.
- **North:** dies if Markus is wounded and tries to save her, fails the save with a deviant Connor, or runs (North page "If Markus either failed to save her or chose to run, North is killed by the army"). She cannot die if Markus is absent: the wiki says "North is guaranteed to survive if Markus isn't present".
- **Josh:**
  - Dies on `SOLDIER SHOT JOSH`, `JOSH SACRIFICES HIMSELF` or `JOSH IS SHOT BY THE SOLDIER`.
  - Always dies on Connor's takeover route (`JOSH IS DYING`).
  - Machine Connor's `FIND JOSH` shows him mortally wounded.
- **Connor:** see above.
- **Lucy:** "presumably fatally injured" (Lucy page; Note "whether or not she actually died is currently unclear"). She survives only without a raid.
- **The threatened androids** in the corridors.
- **Simon cannot die here.**

---

## 6. Media

**Car radio (Kara, `CHANGE RADIO STATION`).** KNC, Rosanna Cartland: "With all androids being turned over to the authorities, the country is grinding to a halt. Hospitals and schools are closing. Water cuts, blackouts, and network failures are expected. Maybe most worrying of all, our armed forces have lost two thirds of their effective personnel, which consisted of specialized android models. The situation is extremely alarming." This is a chart node, but the source has no PO effect.

**Jericho TV.** It is in the shared intro, available to Kara and Connor, with the transcript unlock `Watch TV`. It is not a chart node.

If Markus did not attack the police in Freedom March:
- KNC: "The authorities have ordered all androids to be delivered to the nearest police station or army barracks immediately… Under no circumstances should you try to destroy your android yourself."
- Channel 16 interviewees:
  - "The androids weren't doing any harm… And the cops just... gunned them down. It was sheer carnage…"
  - "…They opened fire."
  - "I know they're only machines, but… People who wanna be free!"
- KNC: "A new stage has been reached, demonstrating beyond all doubt that these defective machines have become a real danger for American society."
- CTN, Michael Brinkley: "The time has come for us to destroy our machines… before they destroy us."
- Channel 16, Michael Webb: "Without the courage and the determination of the police, the machines would have reduced Detroit to a state of chaos…"

If Markus attacked:
- KNC: the "grinding to a halt" text above.
- Interviewees:
  - "It's them or us."
  - "We soaked the thing and then we torched it!"
  - "They rushed the police and... They slaughtered them! Those things are monsters!"
- KNC: "Several hundred androids took to the streets, destroying everything in their path."
- Brinkley: "they met with the extreme violence of the machines".
- Webb: "the authorities will be pitiless in their response".

Always:
- Brinkley: "Following the android crisis and the neutralization of all military androids, American forces in the Arctic have been forced to withdraw… the Russian forces also seem mysteriously to have withdrawn… Douglas Cornwell, has called for… an international conference on the status of the Arctic… the danger of a third world war seems to have been ruled out... for the moment."
- Unused: a Deep Space 5 Mars shuttle crewed by five androids; New Horizon genetic selection of children.

**Magazine #43, *Detroit Today*, "Detroit in Chaos"** (chart nodes K11 and C9). Cover lines:
- "All androids to be destroyed as a precaution"
- "0.4% of world population holds 94% of global wealth"
- "Canada: where the air is clean and the welcome is always warm."

Text:
- "Recent android disturbances have reached a new level after the recent gathering in a public Detroit plaza. President Warren has reacted strongly, announcing a mass product recall of all androids in circulation across the country. These androids will be collected by the authorities and taken to centers for disassembly."
- Security agencies stress that deviancy "is only present in a tiny fraction of androids. The rest will only be destroyed as a precaution".
- "with a national curfew in effect, and armed forces patrolling the streets… A spokesman for the American Liberty Press (ALP) has described the situation as 'totalitarian'".

**Magazine #44, *Detroit Today*, "Android Terror in Detroit"** (chart nodes K12 and C10). Cover lines:
- "Thousands of androids attack civilians"
- "Discover the landscape, discover the wild, discover Canada."

Text:
- "The machines gathered outside a local mall in alarming numbers before occupying St. John Plaza… One eye witness describes their apparent ringleader threatening a police officer."
- "Though the DPD was reluctant to use firearms… the androids forced a confrontation and officers had no choice but to open fire."
- "One officer in particular was singled out for praise".
- "President Warren is said to be taking a personal interest… describing the android activity has 'brainless savagery'. Some expect Federal intervention."

**Where the magazines are.** Both are on a crate before the staircase. The wiki Location says "only if Markus chose to charge at police during the Freedom March". The wiki Magazine page lists both under "Crossroads (Connor)". PowerPyx Kara and the Kara chart (K11, K12) show Kara can read them too: "They can also be picked up by Connor, if he found the location of Jericho."

**Public opinion effect.** None stated for either magazine or the TV.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.6.0) tags 16 nodes with chapter 30. In file order (indices 113 to 128):
- `M21` "The detonator"
- `M21b` "{{North}} on the deck"
- `R30k` (media)
- `K17` "What {{Alice}} is"
- `K31` "Leaving {{Alice}}"
- `R30c` (media)
- `C22` "Face to face with {{Markus}}"
- `M22` "Cast out"
- `M23` "The androids by the wall"
- `M24` "{{Josh}}"
- `M25` "{{North}} falls"
- `C23` "Deviant in the raid"
- `K18` "{{Luther}} is hit"
- `K19` "The pounding on the door"
- `K20` "The exit"
- `K20-still` "The soldier and {{Alice}}"

Engine references in `benchmark/story-engine.mjs`:
- `blocked()` lines 69 and 103 to 114.
- Option removal at line 164 (`C22` deviant option removed when `instability < DEVIANCY_THRESHOLD`, which is 4 in `experience-prompt.mjs` line 42).
- Effects at lines 259 to 272.
- `connorDies` at line 186 (`si(-1)`, `hank(-1)`, `amanda(-1)`).
- `markusHit` at line 187 (death at `markusHits>=3`).
- `raidDeath` at line 366.

`raid`/`jerichoLocated` are set by `C18` option 0 (Kamski) or `C20` success, which matches the game's gate.

### What exists, against the game

- **`M21` (detonator).** It matches `KEEP` / `REFUSE`.
  - Problems:
    - `north(1)` on keep has no source.
    - The situation says "she took from a stolen shipment". The game says a deviant stole a truck of radioactive cobalt, rigged it somewhere in Detroit, and North talked him into handing over the detonator.
    - `M21` is offered before the ousting check, so an ousted Markus can take the detonator. The game gives no detonator talk to an exiled Markus.
    - `M21` also performs the no-raid ousting (`MARKUS LEFT JERICHO`), which is correct in outcome.
  - Missing before it: the four counsel rounds (tone; Josh's accusation with `ANGRY` Josh down / `REMORSE` Josh up; the plan `CONFRONTATION` / `DIALOGUE` / `STAY HIDING` with North, Josh and Simon icons; the reflection) and the ousting cutscene's Jericho large down.
- **`M21b` (kiss).**
  - Gate `s.northBond && s.north`. This matches Lover via shared memories, but it should also require not ousted.
  - Effects: kiss sets `northLover`, `north(1)`; refuse `north(-2)`. The wiki gives kiss large up (the transcript none) and refuse large down. The +1 against "large up" is a magnitude choice.
  - In the game Lover status already exists before the kiss, and Battle for Detroit's "Kiss North" gates on LOVER status. The engine sets `northLover` only on the kiss, so a Lover who refuses loses the later option. That matches only if refusing drops North below Lover (unknown).
  - The situation "On the deck… under the lights of the city" is wrong: the game sets it in the captain's cabin, after the detonator, with North saying "I'm glad I met you".
- **`R30k` (Jericho TV).** The facts are close but mixed:
  - "androids are being lynched": the hangings are background talk, not TV.
  - "state of emergency… military camps": the TV says delivery to police or army barracks; the camps come from Simon, North and the magazine.
  - The not-charged version includes "Hospitals and schools are closing… two thirds". In the transcript that is the charged TV version, and Kara's car radio (which plays always).
  - The car radio itself (`CHANGE RADIO STATION`) is not offered.
  - There is no PO effect, which is correct.
- **`K17` (Alice's secret).**
  - Effects: `alice(±2)`, `luther(1)` on hug. This matches large up/down and Luther up. Missing: Luther down on distant (wiki only).
  - Situation problems:
    - It invents "does not eat… identical to the child androids in the shop window". The game shows a YK500 with an LED, the flyer flashback, and Todd's flashback if he chased Kara.
    - It names Luther unconditionally; Lucy says the lines when Luther is dead.
  - No raid: `karaRoute='escape'` with Alice for both options. This matches the wiki's K26 and K27 but not the PowerPyx commenter who got `KARA LEFT JERICHO ALONE` without a raid.
  - Missing before it: `MEET MARKUS` / `MEET NORTH`, with Kara's automatic stay-or-leave line and the `BOND` / `NO DIFFERENCE` / `SECRET` round (and `MARKUS…` / `THANK YOU` with North). There are no icons, but these are the game's dialogue choices.
- **`K31` (leaving Alice).**
  - Gate `raid && K17==='1' && aliceMax<1`, i.e. never above Distant. The wiki condition is "never raised to NEUTRAL"; the transcript says "below WARM".
  - Option 0 maps to `RUN AWAY` → `KARA LEFT JERICHO ALONE` (correct).
  - Option 1 lacks the `FIND ALICE` Alice large up.
  - The situation says "Luther has Alice". It should be "Alice left with Luther" or "Alice left alone".
- **`R30c` (magazines).** Gated `jerichoLocated` and `marchCharged`; the facts match. The chart puts both magazines on Kara's chart as well. A Kara version (Kara at Jericho, Markus charged) is missing; the gate is not tied to Connor.
- **`C22` (face to face).** A single deviant-or-machine choice.
  - Problems:
    - The deviant option needs instability ≥ 4 (an engine constant with no source).
    - The six dialogue rounds with SI changes are missing. Three are played as Markus and can raise Connor's SI by up to three small steps; Connor's own round can lower it.
    - The North version (Markus dead or ousted) is missing. The situation always says Markus and "in the hold"; the game says the captain's cabin.
    - Machine outcome: `connorDies` immediately, with the text "overwhelmed in the hold". The game has the leader jumping Connor, the cargo-hall four-way choice with two deaths, and the gun QTE where machine Connor can kill Markus (`CONNOR KILLED MARKUS`: Markus dies, no bomb, hundreds captured). With North leading, Connor always dies. The engine never lets machine Connor kill Markus or survive.
    - The deviant outcome has no Amanda change; the game has Amanda large down.
    - `connorDies` applies `amanda(-1)` and `hank(-1)` on the spot. No source states either for Crossroads; the Hank down is a Battle for Detroit line.
    - The Hank-suicide event appended here (`hankResigned`) belongs to Night of the Soul (`Hank Committed Suicide`), not Crossroads.
  - Missing before it: `FOLLOW JERICHO TRAIL`, the `EXPLORE JERICHO` spots (Kara, Alice, explosives, Traci, Rupert) and `STOPPED BY LUCY`. These are narration, but the spots reflect earlier choices.
- **`M22` (cast out).**
  - Gate `raid && jerichoTrust<=JERICHO_UNPOPULAR` (−3). Leave maps to `MARKUS LEFT JERICHO` (correct).
  - Go back gives `jer(2)`. This matches the wiki's large up for an exiled Markus who returns, but the game awards it on rejoining at the end.
  - Missing: the ousting's Jericho large down (to "Rejected").
  - After going back, the engine always runs `M23` and `M24`. In the game, with a deviant Connor, Markus skips straight to the escape (Connor has already armed the bomb).
- **`M23` (androids by the wall).** `risk: 0.2` is a stand-in for the QTE.
  - The game gives Jericho small up for `INTERVENE` regardless of outcome. On failure Markus is wounded and the androids escape. The engine says "the androids at the wall are shot anyway" and gives no Jericho change.
  - Stay gives `jer(-1)`, which matches small down.
  - Missing before it: the first corridor (`MEET YOUR TEAM` dialogue; `TRY TO ESCAPE` with the wrong-way and out-of-time hits; `MEET LUCY`; the bridge).
  - Missing after it: `SOLDIERS COMING MARKUS' WAY` (10 s; `JUMP SOLDIERS` / `CLIMB AWAY` / `TIME OUT` with a hit) and the reservoir (`KNOCK SOLDIERS OUT`, Jericho up / walk past, Jericho down).
- **`M24` (Josh).** `risk: 0.15` stands in for the QTE.
  - Success gives `josh(2)` (matches large up) but lacks Jericho small up.
  - Failure: Josh dies plus `markusHit`. In the game, failure when not wounded means Josh sacrifices himself and Markus is unhurt; when wounded, both die.
  - Keep moving: Josh dies, matching `SOLDIER SHOT JOSH`, but the Jericho small down is missing.
- **`M25` (North falls).** `risk: 0.2`.
  - Success gives `north(2)`, `simon(1)`, `josh(1)`, matching North large up, Simon up and Josh up; Jericho small up is missing.
  - Failure: North dies (and a hit). The game splits failure two ways: with a deviant Connor, North dies and Connor rescues Markus (Connor may die); without one, Markus dies (`MARKUS DIED BUYING TIME FOR JERICHO`) and North escapes.
  - Keep running: North dies with no stats. The game gives Jericho down, Simon down and Josh large down.
  - Missing:
    - A Markus wounded earlier cannot save North at all.
    - `LOSE TOO MUCH TIME` before North is shot (Markus dies).
    - `RUN TO EXIT` being too slow.
    - The rejoin small ups for North, Jericho, Josh and Simon.
    - The machine-Connor gun QTE and the deviant soldiers' QTE in the hold (Markus can die at both).
- **`C23` (deviant in the raid).** This is mislabelled.
  - With Markus alive and on his mission, a deviant Connor has no corridor choices. He arms nothing and appears at `CONNOR JOINS THE OTHERS`, followed by the `HELP MARKUS` QTE, which is Markus's `KILL THE SOLDIERS` / `DIE BUYING SOME TIME` beat.
  - With Markus dead or ousted, Connor takes over the bomb run. He has the same `STAY AWAY` / `INTERVENE` and `JUMP` / `CLIMB` / `LOSE TOO MUCH TIME` choices, no icons, `JOSH IS DYING`, the control-room QTE and the jump outcome.
  - The engine's single "break cover" choice with `risk: 0.25` and `si(1)` on success has no source. Its failure sets `deviant=false`, which is correct in effect (the wiki Note: "If deviant Connor dies here… he is automatically set on his machine route").
- **`K18` (Luther is hit).** `HELP LUTHER` maps to option 0 with `risk: 0.2`.
  - Failure leads to capture (correct, `KARA, ALICE & LUTHER CAPTURED`). Success sets `lutherHidden` and `luther(2)`; the game gives Luther small up and Alice small up.
  - Option 1 (leave) sets `s.luther=false` and `alice(-1)`. Alice small down matches; Luther's death is "not confirmed" per the wiki.
  - Missing: the `CONSOLE` / `HURRY` round (`HURRY` Alice down).
  - Missing before it: the corridor capture failures (`OUT OF TIME` / `WRONG WAY` in the corridor and at the crossroad).
- **`K19` (door).** It matches the game: open gives Alice up and a QTE (`risk: 0.25` ⇒ captured); keep shut gives Alice down. The situation calls the android "him"; the game's android is female ("She'll die out there").
- **`K20` (the exit).**
  - The options play dead / surrender / run match the three choices after `ALMOST REACH THE BREACH`.
  - Missing: the mash outcome `FAIL TO RUN`, which goes straight to the leg shot.
  - Surrender: the engine always captures. The game's `SURRENDER` → `FACE` gives Luther's sacrifice and escape when Luther is hidden; `CONVINCE` and `OBEY` capture. The follow-up round is missing.
  - Run: the engine auto-resolves (hidden Luther → escape; else capture). The game gives the six-option leg-shot round. `CRAWL` or `OUT OF TIME` kill Kara and Alice, a death the engine reaches only via `K20-still`. `FACE` gives Luther or capture, `SURRENDER` capture, `GET UP` a failure and repeat, `PLAY DEAD` leads to `SOLDIERS CLOSE IN`.
  - The adaptation note "running always gets Kara shot in the leg" matches; "Surrender always means capture" is wrong when Luther is hidden.
- **`K20-still`.** It matches `SOLDIERS CLOSE IN` → `DEFEND ALICE` / `REMAIN STILL`, including Luther's sacrifice and the double death. The kicked, whimpering Alice is not in the sources; the transcript has no line here.

### Node by node: what is missing

**Missing chart decisions:**
- Kara: `RUN AWAY` / `FIND ALICE` is partly covered by `K31`; the surrender follow-up and the leg-shot round are missing.
- Markus: `JUMP SOLDIERS` / `CLIMB AWAY` / `TIME OUT`; the reservoir; `CHOOSE TO SAVE NORTH`'s injured branch.
- Connor:
  - The cargo-hall four-way.
  - The takeover route's `STAY AWAY` / `INTERVENE` and `JUMP SOLDIERS` / `CLIMB BESIDE SOLDIERS` / `LOSE TOO MUCH TIME`.

**Missing off-chart dialogue with stat icons:**
- The Markus counsel (rounds 2 and 3).
- The Connor confrontation (all six rounds as Markus, or four as North).
- `HURRY`.

**Missing endings:**
- `MARKUS STAYED ALONE WITH HIS THOUGHTS` (no-raid, not ousted). The engine just proceeds.
- `CONNOR KILLED MARKUS`.
- `MARKUS DIED BUYING TIME FOR JERICHO`. The engine's `raidDeath` text says "died buying time", but it is reached only by a third hit, not by the escape-timing and failed-save routes.
- `CONNOR ESCAPED WITH JERICHO'S PEOPLE` as a distinct outcome.
- The deviant-Connor deaths (except `C23` failure).
- Kara's capture-by-navigation endings.
- The `CRAWL` / `OUT OF TIME` death.

**Effects present that the sources do not support:**
- `M21` keep `north(1)`.
- `C23` success `si(1)` and its risk.
- `connorDies`' `amanda(-1)` and `hank(-1)` in this chapter.
- `C22`'s Hank suicide.
- `M24` failure killing Josh when Markus is unwounded.

**Effects the sources state that are absent:**
- Amanda large down on deviancy.
- Jericho large down on ousting.
- All Jericho icons in `M23`, `M24` and `M25`, the reservoir, and the rejoin.
- North, Josh and Simon on the counsel and the rejoin.
- Josh large down and Simon down on `RUN`.
- Luther down on `DISTANT` (wiki only).
- Alice large up on `FIND ALICE`.
- Alice down on `HURRY`.
- Alice up on `HELP LUTHER`.
- Every Connor SI change.

**Gating to fix:**
- `M21` and `M21b` must not run when ousted.
- `C22` must have a North variant.
- `M22` go-back with a deviant Connor must skip to the escape.
- A Markus wounded earlier cannot save North.
- `R30c` should be offered to Kara too.
- `K17` must use the Lucy variant when Luther is dead.

**Name tokens a rebuild will need** that are not in `NAMES`:
- Lucy; Ferndale; Woodward Avenue.
- Ontario (Rose's brother).
- KNC, CTN, Channel 16; Rosanna Cartland, Michael Brinkley, Michael Webb.
- Douglas Cornwell; St. John Plaza; the American Liberty Press.
- "rA9", which the Jericho crowd says.

`LEVELS.jericho` uses Unpopular / Uncertain / Respected / Trusted. The game's ladder is Leader / Admired / Respected / Neutral / Unpopular / Rejected.

---

## 8. Open questions

1. **Deviancy threshold.** How much software instability unlocks `BECOME DEVIANT`? No source gives a value; the engine uses 4. Can Markus's three increases in the cabin alone tip a borderline Connor?
2. **`DISCOURAGE` and `OUR CAUSE`.** The transcript shows `DISCOURAGE` with no icon and `OUR CAUSE` with SI up. The wiki chapter page has "reason or discourage" up and lists "our cause" without an icon. Check in game.
3. **The `KISS` icon and Lover after `DON'T KISS`.** The wiki gives North large up for the kiss; the transcript shows none. Does refusing (North large down) drop North below Lover, which would remove Battle for Detroit's "Kiss North"?
4. **Alice leaving.** Is the condition "never above Distant" (wiki) or "below Warm" (transcript lock)?
   - Does it require Connor to have found Jericho? The wiki says yes. A PowerPyx commenter got `KARA LEFT JERICHO ALONE` with no raid ("it'll just jump to 'Kara left Jericho alone'").
   - Does Luther's presence change it (`ALICE LEAVES WITH LUTHER` vs `ALONE`)?
   - Several commenters could not trigger it at all.
5. **Kara's death icon.** `KARA & ALICE DIED IN THE ASSAULT` carries a yellow no-entry tab, and five Kara nodes use the no-entry icon. Markus's and Connor's deaths use skulls. Confirm the in-game legend meaning. Is the no-entry tab used because two characters die, or because it is Kara's death icon?
6. **Hit counting.**
   - The wiki and chart say a wounded Markus dies on the next hit. PowerPyx, GamerGuides and three commenters say the third hit kills.
   - The transcript conditions say "shot twice".
   - How many hits does the first corridor's wrong-way loop give per pass?
   - Does Connor's takeover use the same counter, including hits Markus took before dying?
7. **`JOSH SACRIFICES HIMSELF`.** Does it need a good Josh relationship (GamerGuides; commenter "Highly Positive"), or only an unwounded Markus losing the QTE (commenter "you don't have to be close with Josh")?
8. **`FAIL TO SAVE NORTH` with no deviant Connor.** The wiki routes it to `MARKUS GETS SHOT`, and the transcript says "Markus dies, North escapes". So North survives a failed save while Markus dies. Confirm that North lives, and which stat icons apply.
9. **`RUN TO EXIT`.** Commenters say it needs no deviant Connor present (machine, or dead). Is it a timed sprint whose failure is `MARKUS GETS SHOT`?
10. **The exiled Markus who returns.**
    - With a machine Connor, he re-enters at `MARKUS IN THE CORRIDOR`. Does he then face the full corridor sequence and the gun QTE?
    - With a deviant Connor, he joins only the escape. Does he still get `JOIN THE OTHERS`' small ups, the wiki's large up, or both?
11. **Connor's takeover route.** Do `INTERVENE` / `STAY AWAY` and the reservoir carry any Jericho or SI icons for Connor? The transcript shows none. Is the route reachable when Markus was ousted and returned (a commenter reports the takeover after an ousting)?
12. **Magazines for Kara.** The chart has both on Kara's chart (K11, K12), and PowerPyx Kara lists them. The wiki Magazine page lists them only under Connor. Confirm that Kara can read them, and that reading by either character counts once.
13. **`KARA & ALICE AT CROSSROAD` and `ON A ROOFTOP`.** Are these loadable checkpoints? They are drawn as large cards without the "CHECKPOINT" caption in PowerPyx's images. The wiki bolds `KARA & ALICE AT CROSSROAD` as a checkpoint.
14. **The unused `CHOOSE TO STAY` / `CHOOSE TO LEAVE` strings.** Is Kara's reply to Markus ever a player choice in any version, or always automatic by Connor's state (transcript)?
15. **Luther left behind (`LEAVE LUTHER`).** Is he dead for later chapters? The wiki: "his death is not confirmed". Battle for Detroit's "Find Luther & Jerry" is tied to a living Luther not with Kara. Does that include an abandoned Luther, or only a hidden one?
16. **Lucy.** Does any later chapter treat her as dead or alive after a raid?
17. **Spot nodes.** `SPOT POLICEMAN` exists as a string but is not drawn. Is it cut content, perhaps the saved Wilson?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; the three Crossroads walkthrough links |
| https://www.powerpyx.com/detroit-become-human-crossroads-kara-walkthrough-100/ | Kara walkthrough: Luther and Markus gates, `LOOK OUTSIDE` and radio controls, magazines "only available if Markus was violent… can also be picked up by Connor", corridor failures, breach choices with buttons. 39 comments: the Alice-leaving conditions and the disputed glitch, Luther's sacrifice paths, the complete breach tree, Jerrys in Battle for Detroit |
| https://www.powerpyx.com/detroit-become-human-crossroads-markus-walkthrough-100/ | Markus walkthrough: ousting via Unpopular, kiss "if Markus is lovers with north", "10s timer", third-hit death, reservoir location, Josh and hold QTEs, the North save tree. 34 comments: hit counting, Josh's sacrifice condition, `RUN TO EXIT`, the Unpopular recipe |
| https://www.powerpyx.com/detroit-become-human-crossroads-connor-walkthrough-100/ | Connor walkthrough: the spots (Traci condition), Lucy at the stairs, deviancy "Unlocked by having a high software instability", the cargo-hall options mapped to LIE and PERKINS EXCUSE, the gun QTE "you'll play as Markus", the four deviant corridor paths. 25 comments: the zombie-Connor bug, the takeover trigger, Connor's hit count, the Rupert spot |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-flowchart-1.jpg | Kara overview (76%) |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-first-checkpoints.jpg | Kara header and world stats, both drive checkpoints, Luther tab, drive to `FIND A WARM PLACE FOR ALICE` |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-inside-upstairs-1.jpg | `UPSTAIRS` to the corridor checkpoint: Markus/North tab, magazines, Alice choice, Alice-leaves group, the three early endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-in-corridor-1.jpg | corridor: Luther and exit routes, capture endings with lock tabs, crossroad, `RUN TO LUTHER` |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-at-crossroad-2.jpg | crossroad failures, Luther choice and outcomes, cabin and door choice, `ESCAPE CABIN` |
| https://www.powerpyx.com/wp-content/uploads/detroit-crossroads-kara-chase-ending.jpg | breach tree: surrender, run, play dead, leg-shot six-way, Luther sacrifices, no-entry icons, captured, died, escaped |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-flowchart-100.jpg | Markus overview |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-1.jpg | cabin checkpoints, counsel arrows, North-led group and ending, `MARKUS OUSTED`, kiss choice |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-2.jpg | rooftop branch, `MARKUS LEFT JERICHO` [lock], `MARKUS STAYED ALONE…`, `CONNOR WATCHES NORTH LEAVE`, first corridor checkpoint |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-3.jpg | wrong way, out of time, wounded/killed loop, Lucy, bridge, `MARKUS IN THE CORRIDOR`, androids choice |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-4.jpg | androids QTE ✓/✗, collapses, 10-second choice with `TIME OUT` ✗, the well |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-5.jpg | reservoir, approach, Josh choice and QTE, `JOSH IS SHOT BY THE SOLDIER` and `SOLDIER SHOT JOSH` locks, `COMFORT JOSH` |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-6.jpg | hold: Connor gun QTE, `CONNOR KILLED MARKUS` [skull], `MARKUS SHOOTS CONNOR` [lock], soldiers QTE, countdown, escape checkpoint |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-crossroads-markus-7.jpg | escape: lose time, North shot, save/run, save QTE, Connor rescue/protect, kill/die QTE, `RUN TO EXIT`, `MARKUS GETS SHOT`, jumps, the two final endings |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-002.jpg | Connor overview |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-003.jpg | header (100%), `AT FERNDALE`, trail, `IN THE SHIP` |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-004.jpg | `EXPLORE JERICHO` bracket: six spots and two magazines |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-005.jpg | Lucy, cabin cards, threaten and confront nodes, machine/deviant choice with locks |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-006.jpg | machine: attack, jumps, `IN THE SHIP` checkpoint, pursue; the warn nodes |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-007.jpg | cargo hall: the alibi/persuade pair, attack QTE, run, soldiers shoot |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-008.jpg | resume pursuit, gun QTE, `MACHINE CONNOR WAS DESTROYED` [skull], `CONNOR KILLED MARKUS` [lock], corridor confrontation |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-009.jpg | North corridor outcomes, the third machine death |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-010.jpg | warn, attack, `DEVIANT CONNOR IN CORRIDOR` checkpoint, `JOIN DEVIANTS` |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-011.jpg | make for the hold, Lucy, bridge, wrong way, out of time, soldier shoots |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-012.jpg | the second corridor card, sneak, androids choice and outcomes |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-013-1.jpg | soldiers coming, the three-way choice, wounded or shot, `DEVIANT CONNOR WAS DESTROYED ON THE SHIP`, well, reservoir, takeover, approach |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-014.jpg | Josh dying, the hold card, control room, soldiers QTE, arm explosive |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Crossroads-015.jpg | third corridor card, try to escape, North jumps, Connor jumps, joins the others, help Markus, the last two endings |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | chapter page: infobox, transcript links, text flowcharts for all three characters, relationship and SI lists, Notes (Alice condition, ship-intact combination, Lucy, Simon cannot die, machine Connor survival) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads/Flowchart&prop=wikitext&format=json (also `Crossroads_(Transcript)`, `Crossroads/Transcript`) | checked: these pages do not exist |
| https://detroitbecometext.github.io/chapters/30 (Kara), /31 (Connor), /32 (Markus), as linked from the wiki | the fan transcript. Rendered from https://github.com/detroitbecometext/detroitbecometext.github.io source files `src/app/chapters/components/chapter-contents/30.1-crossroads-kara-…`, `30.2-crossroads-connor-…`, `30.3-crossroads-markus-…`, `30-crossroads-intro/{screens,background-dialogues}`, and `public/i18n/en.json`, fetched from raw.githubusercontent.com (master). Gave every dialogue option, relation and SI icon, unlock conditions, the TV and radio text, and the string table `MENU.FLOWCHART.02A.*` including undrawn labels |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | relationship levels (Jericho, North, Josh, Simon, Alice, Luther, Amanda ladders); Crossroads entries for Alice, Luther, Jericho, North, Josh, Simon and Amanda |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | Crossroads SI entries ("as Markus"), no threshold, Note on deviant death in Crossroads |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no Crossroads PO entry; the public's portrayal follows Freedom March, not the stat |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | #43 and #44, both listed under Crossroads (Connor) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Detroit_in_Chaos&prop=wikitext&format=json | magazine text and location condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Terror_in_Detroit&prop=wikitext&format=json | magazine text and location condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json | Crossroads summary, the reveal, the escape outcomes, Night of the Soul appearance |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json | Kara's Crossroads death condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json | Luther shot in the corridor, hidden or left, sacrifice at the exit, "death is not confirmed", quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Lucy&prop=wikitext&format=json | Lucy replaces Luther; her raid fate and lines |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json | North-led cabin, detonator, Crossroads death conditions, Night of the Soul follow-ups |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json | Josh's lines by earlier choices, death conditions, Connor finding him dying |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Simon in the cabin and the escape; Night of the Soul and Revolution dependencies |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json | Markus's Crossroads deaths (Connor, Army, Perkins); exile ending |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | deviancy gate; every Connor death in Crossroads; PS4 zombie-Connor bug |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho_(location)&prop=wikitext&format=json | raid summary, ship sinking versus capture of several hundred androids |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Jericho location (evidence or Kamski) versus decommissioning; the gate for the raid |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | start conditions tied to Crossroads, church versus Jericho, Thin Ice, Josh check-on, bugs |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | Kara Leaving Detroit and Kara Captured starts; Luther and Jerry; detonator and "Kiss North (if LOVER)"; Connor's Last Mission start for machine or dead-deviant Connor |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Secret_Endings&prop=wikitext&format=json | "Alone again" (Kara), "Wasted Potential" (Markus), Kamski Ending conditions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | THREE AT JERICHO, SCORCHED EARTH, BLOODHOUND |
| https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/chapter-29-crossroads-kara (and `-markus`, `-connor`) | conflict checks: "Play as both Markus and Connor"; Josh's sacrifice needs good standing; "the third hit will kill him"; 10-second timer |

---

## 10. Template cross-check

Written 2026-11-06 from the detroitbecometext templates (master), read raw from `raw.githubusercontent.com`, under `src/app/chapters/components/chapter-contents/`:
- Intro: `30-crossroads-intro/screens/screens.component.html` (the Jericho TV) and `30-crossroads-intro/background-dialogues/background-dialogues.component.html`. Both are embedded (`<app-screens>`, `<app-background-dialogues>`) in the Kara and Connor templates.
- Kara: `30.1-crossroads-kara-chapter-content/crossroads-kara-chapter-content.component.html`.
- Connor: `30.2-crossroads-connor-chapter-content/crossroads-connor-chapter-content.component.html`.
- Markus: `30.3-crossroads-markus-chapter-content/crossroads-markus-chapter-content.component.html`.

Rendered with `/tmp/dbt/render2532.py` (Python, stdlib `html.parser`), which resolves every `t('KEY')` and `translateObject(KEY, start, end)` against `public/i18n/en.json` and prints sections, condition groups and variants (`IF:` is the transcribers' condition text), choice groups (`** PROMPT **`) with each option's label, `app-relation` arrows (`ARROW <name> <type>`), `app-unlock-condition` (`UNLOCK(<type>)`), `app-observation-item` clues, and `app-unused-content` blocks. Dialogue lines are omitted from the outline (a full version with dialogue is in `/tmp/dbt/ch30*-dialogue.txt`, not committed). `(no content: ø)` marks an option the template leaves empty.

Counts (all / inside cut blocks):

| Part | Prompts | Options | Clues | Arrows | Unlocks | Cut blocks |
|---|---|---|---|---|---|---|
| Intro (screens) | 0 | 0 | 0 | 0 | 0 | 1 (two TV items) |
| Intro (background dialogues) | 0 | 0 | 0 | 0 | 0 | 0 |
| 30.1 Kara | 12 / 0 | 32 / 0 | 0 | 10 / 0 | 2 | 0 |
| 30.2 Connor | 13 / 0 | 40 / 0 | 0 | 20 / 0 | 4 | 3 (dialogue only) |
| 30.3 Markus | 10 / 0 | 30 / 0 | 0 | 34 / 0 | 6 | 2 (dialogue only) |

No prompt, option, clue or arrow in this chapter sits inside a cut block; the cut blocks hold only dialogue lines and two TV items. The templates contain no `app-observation` clues for this chapter (the magazines are handled by the site's magazine service, not the templates, and the flowchart node labels live in `MENU.FLOWCHART.02A.*`, already checked in section 1).

Cut lines, for the record (not to be built):
- TV (screens): KNC "Deep Space 5, the NASA shuttle, is about to reach the planet Mars…"; Channel 16 "New Horizon is a company that now offers parents the possibility of defining the genetic characteristics of their children…".
- Connor: background "Who's that? Never seen this model before…" / "No… Neither have I…" / "Wonder where he came from."; at Lucy, Connor "No, I-"; machine hold, after Markus reaches the gun, Markus "You could have joined us. You could have been free…".
- Markus: Josh in the pacifist-march-and-pacifist-speech variant, "Thousands of our people are about to be destroyed because you decided to fight humans."; Markus on `REMORSE`, "Yeah, maybe I made some mistakes."

### 10a. Rendered outlines

In the outline, `NOTE:` lines are the transcribers' own prose inside the template (cross-references such as "Leads to the same result as choosing ATTACK") and `TEXT:` lines are on-screen text outside dialogue tags (date and time cards, TV and background chatter). Their content was checked against sections 1 to 3 and adds no discrepancy beyond those listed below.

#### Intro (30-crossroads-intro: screens, then background-dialogues)

```
=== 30-crossroads-intro/screens ===
[SECTION tv]
  ## Watch TV
  <CONDITION GROUP>
    <VARIANT>
      IF: Markus didn't attack the police in Freedom March
    <VARIANT>
      IF: Markus attacked the police in Freedom March
  ### UNUSED/CUT CONTENT ###

COUNTS (all): prompts=0, options=0, arrows=0, obs=0, unlock=0, unused=1
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
=== 30-crossroads-intro/background-dialogues ===
TEXT: They're conducting raids across the city! Androids were hanged all along Woodward Avenue.
TEXT: We've gotta do something!.. We can't just stand by and let them slaughter us!
TEXT: Our people are being lined up and executed…
TEXT: Quick, he needs blue blood!
TEXT: They opened fire on us even though we were unarmed… Hundreds of us died there, the place was covered with blue blood!.. We cannot just sit here and watch them murder us, we've gotta defend ourselves! We've gotta fight back, we have no choice!
TEXT: They'll kill us all if we don't do something…
TEXT: They're slaughtering our people! We can't talk with them! We have to stand up to them! Blood for blood!
TEXT: We were just there. We didn't do anything wrong!… We just wanted to tell them "We want freedom!"… Then they opened fire!.. It was carnage. Carnage…
TEXT: Why? Why did they do it! Why?
TEXT: We gotta kill the bastards! We've got to avenge our dead!
TEXT: They're going to kill us all! Well I'm willing to fight. We can't just let them slaughter us!
<CONDITION GROUP>
  <VARIANT>
    IF: Markus is alive
    TEXT: Markus will have to choose between vengeance and dialogue with the humans.
    TEXT: What's Markus doing? He's the leader. If he's rA9, it's up to him to save our people!
  <VARIANT>
    IF: Markus died in Freedom March
    TEXT: Markus is dead? He was rA9! Who's going to lead us now?
    TEXT: North is going to take his place. She knew him best.
    TEXT: They've killed Markus! They shot him in the square…
    TEXT: I was there… I saw Markus get shot… He fought to the very end to save his people… but there were too many of them…
    TEXT: Markus dead? That's impossible, what will we do without him?!
    TEXT: I heard North was going to take his place.
    TEXT: They've killed Markus… He was our guide… I'm sure he was rA9. He was the only one who could save us.
    TEXT: Markus is dead… The humans killed him!

COUNTS (all): prompts=0, options=0, arrows=0, obs=0, unlock=0, unused=0
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
```

#### 30.1 Crossroads - Kara

```
[SECTION car]
  # In the car
  TEXT: NOV 9TH, 2038
  TEXT: PM 09:34
  [SECTION car-window]
    ## Looking out the window
  [SECTION car-radio]
    ## Listening to the radio
  [SECTION car-jericho]
    ## Arriving at Jericho
  <CONDITION GROUP>
    <VARIANT>
      IF: Luther is alive
[SECTION jericho]
  # In Jericho
  <<embedded app-screens>>
  <CONDITION GROUP>
    <VARIANT>
      IF: Luther is alive
  [SECTION backgroud-dialogues]
    ## Background dialogues
    <<embedded app-background-dialogues>>
  [SECTION sit-down]
    ## Sitting down
    <CONDITION GROUP>
      <VARIANT>
        IF: Luther is alive
      <VARIANT>
        IF: Luther died in Midnight Train
  <CONDITION GROUP>
    <VARIANT>
      IF: Talking to Markus
      <CONDITION GROUP>
        <VARIANT>
          IF: Luther is alive
        <VARIANT>
          IF: Luther is dead
      <CONDITION GROUP>
        <VARIANT>
          IF: Connor knows the location of Jericho
        <VARIANT>
          IF: Connor series was decommissioned
      ** PROMPT (choice group) **
        - OPTION "BOND"
        - OPTION "NO DIFFERENCE"
        - OPTION "SECRET"
    <VARIANT>
      IF: Talking to North
      UNLOCK(Death): Markus died in Freedom March
      <CONDITION GROUP>
        <VARIANT>
          IF: Luther is alive
        <VARIANT>
          IF: Luther is dead
      <CONDITION GROUP>
        <VARIANT>
          IF: Connor knows the location of Jericho
        <VARIANT>
          IF: Connor series was decommissioned
      ** PROMPT (choice group) **
        - OPTION "MARKUS…"
        - OPTION "THANK YOU"
      ** PROMPT (choice group) **
        - OPTION "BOND"
        - OPTION "NO DIFFERENCE"
        - OPTION "SECRET"
  [SECTION alice-return]
    ## Returning to Alice
    <CONDITION GROUP>
      <VARIANT>
        IF: Todd chased Kara escaping in Stormy Night
        NOTE: Flashback
    <CONDITION GROUP>
      <VARIANT>
        IF: Luther is alive
      <VARIANT>
        IF: Luther is dead
    ** PROMPT (choice group) **
      - OPTION "HUG"
        ARROW Alice LargeUp
        ARROW Luther SmallUp
        NOTE: Kara's part of this chapter ends if Jericho is not attacked (Connor series decommissioned).
      - OPTION "DISTANT"
        ARROW Alice LargeDown
        <CONDITION GROUP>
          <VARIANT>
            IF: Luther is alive
            NOTE: Luther and Alice leave Kara.
        NOTE: Kara's gameplay ends here if Jericho is not attacked (Connor series decommissioned).
  [SECTION jericho-attack]
    ## Jericho under attack
    <CONDITION GROUP>
      <VARIANT>
        IF: Luther is alive
    <CONDITION GROUP>
      <VARIANT>
        IF: Alice is DISTANT, but Kara chose LOOK FOR ALICE
        UNLOCK(Lock): Alice relation is below WARM and choose DISTANT
        ARROW Alice LargeUp
  [SECTION wrong-way]
    ## Go the wrong way
  [SECTION shot]
    ## Get shot
    <CONDITION GROUP>
      <VARIANT>
        IF: Out of time or wrong way
  <CONDITION GROUP>
    <VARIANT>
      IF: Luther is alive
    <VARIANT>
      IF: Luther is dead
  <CONDITION GROUP>
    <VARIANT>
      IF: Luther is alive
      ** PROMPT (choice group) **
        - OPTION "HELP LUTHER"
          ARROW Alice SmallUp
          ARROW Luther SmallUp
          <CONDITION GROUP>
            <VARIANT>
              IF: Get Luther to safety
            <VARIANT>
              IF: Fail to get to safety
        - OPTION "PROTECT ALICE"
          ARROW Alice SmallDown
          ** PROMPT (choice group) **
            - OPTION "CONSOLE"
            - OPTION "HURRY"
              ARROW Alice SmallDown
    <VARIANT>
      IF: Luther is dead
  [SECTION hide-cabin]
    ## Hide in cabin
    ** PROMPT (choice group) **
      - OPTION "OPEN"
        ARROW Alice SmallUp
        <CONDITION GROUP>
          <VARIANT>
            IF: Kill soldier
          <VARIANT>
            IF: Lose fight
            (no content: ø)
      - OPTION "DON'T OPEN"
        ARROW Alice SmallDown
  [SECTION flee]
    ## Kara flees for the breach
    ** PROMPT (choice group) **
      - OPTION "PLAY DEAD"
        ** PROMPT (choice group) **
          - OPTION "DEFEND ALICE"
            NOTE: Leads to the same result as choosing ATTACK.
          - OPTION "DON'T MOVE"
      - OPTION "RUN"
        ** PROMPT (choice group) **
          - OPTION "GET UP"
            ** PROMPT (choice group) **
              - OPTION "CRAWL"
              - OPTION "ATTACK"
                NOTE: Leads to the same result as choosing ATTACK.
              - OPTION "SURRENDER"
          - OPTION "ATTACK"
            <CONDITION GROUP>
              <VARIANT>
                IF: Luther is alive - Luther sacrifices himself
              <VARIANT>
                IF: Luther is dead
              <VARIANT>
                IF: Luther is dead and Kara played dead before attacking
                NOTE: -00:00:04 SHUTDOWN IMMINENT
          - OPTION "SURRENDER"
          - OPTION "PLAY DEAD"
            NOTE: Leads to the same result as choosing PLAY DEAD.
      - OPTION "SURRENDER"
        ** PROMPT (choice group) **
          - OPTION "RUN"
            NOTE: Leads to the same result as choosing RUN.
          - OPTION "CONVINCE"
          - OPTION "ATTACK"
            <CONDITION GROUP>
              <VARIANT>
                IF: Luther is alive - Luther sacrifices himself
              <VARIANT>
                IF: Luther is dead
          - OPTION "OBEY"

COUNTS (all): prompts=12, options=32, arrows=10, obs=0, unlock=2, unused=0
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
```

#### 30.2 Crossroads - Connor

```
[SECTION jericho]
  # In Jericho
  <<embedded app-screens>>
  [SECTION background-dialogues]
    ## Background dialogues
    <<embedded app-background-dialogues>>
    ### UNUSED/CUT CONTENT ###
  [SECTION stairs]
    ## Going to the stairs
    ### UNUSED/CUT CONTENT ###
[SECTION captain-cabin]
  # Captain's Cabin
  [SECTION find-markus]
    ## Finding Markus
    ** PROMPT (choice group) **
      - OPTION "REASON"
        ARROW SoftwareInstability SmallUp
      - OPTION "DEFY"
      - OPTION "DISCOURAGE"
      - OPTION "THREATEN"
    ** PROMPT (choice group) **
      - OPTION "INTIMIDATE"
      - OPTION "INSTRUCTIONS"
    ** PROMPT (choice group) **
      - OPTION "CONVINCE"
        ARROW SoftwareInstability SmallUp
      - OPTION "APPEAL"
        ARROW SoftwareInstability SmallUp
      - OPTION "I KNOW YOU"
      - OPTION "OUR CAUSE"
        ARROW SoftwareInstability SmallUp
    ** PROMPT (choice group) **
      - OPTION "STAY BACK!"
        ARROW SoftwareInstability SmallDown
      - OPTION "WARNING SHOT"
        ARROW SoftwareInstability SmallDown
        (no content: ø)
      - OPTION "ENOUGH!"
        ARROW SoftwareInstability SmallDown
      - OPTION "SAY NOTHING"
        (no content: ø)
    ** PROMPT (choice group) **
      - OPTION "SOW DOUBTS"
        ARROW SoftwareInstability SmallUp
      - OPTION "QUESTION"
        ARROW SoftwareInstability SmallUp
      - OPTION "RALLY"
        ARROW SoftwareInstability SmallUp
      - OPTION "UNDERMINE"
        ARROW SoftwareInstability SmallUp
    ** PROMPT (choice group) **
      - OPTION "BECOME A DEVIANT" (brackets)
        UNLOCK(Lock): Have enough software instability
        ARROW Amanda LargeDown
        NOTE: See
        NOTE: Crossroads - Markus
        NOTE: : In the corridor.
      - OPTION "REMAIN A MACHINE"
  [SECTION find-north]
    ## Find North - If Markus is dead or rejected by Jericho
    ** PROMPT (choice group) **
      - OPTION "INSTRUCTIONS"
      - OPTION "INTIMIDATE"
    ** PROMPT (choice group) **
      - OPTION "STAY BACK!"
        ARROW SoftwareInstability SmallDown
      - OPTION "WARNING SHOT"
        ARROW SoftwareInstability SmallDown
        (no content: ø)
      - OPTION "ENOUGH!"
        ARROW SoftwareInstability SmallDown
      - OPTION "SAY NOTHING"
        (no content: ø)
    ** PROMPT (choice group) **
      - OPTION "DISTURBED"
        ARROW SoftwareInstability SmallUp
      - OPTION "SAY NOTHING"
        (no content: ø)
      - OPTION "COLD"
        ARROW SoftwareInstability SmallDown
    ** PROMPT (choice group) **
      - OPTION "COLD"
        ARROW SoftwareInstability SmallDown
      - OPTION "DISTURBED"
        ARROW SoftwareInstability SmallUp
      - OPTION "SAY NOTHING"
        (no content: ø)
    ** PROMPT (choice group) **
      - OPTION "BECOME A DEVIANT" (brackets)
        UNLOCK(Lock): Have enough software instability
        ARROW Amanda LargeDown
      - OPTION "REMAIN A MACHINE"
[SECTION deviant-connor]
  # Deviant Connor in corridor : Markus is dead or rejected
  <CONDITION GROUP>
    <VARIANT>
      IF: Soldiers shoot Connor twice before arming explosive
      NOTE: See
      NOTE: Crossroads - Markus
      NOTE: : Surviving characters jump.
  [SECTION lucy]
    ## Meet Lucy
  [SECTION bridge]
    ## Bridge breaks under Connor
  [SECTION soldiers-threaten]
    ## Soldiers threaten androids
    ** PROMPT (choice group) **
      - OPTION "INTERVENE"
      - OPTION "DON'T INTERVENE"
        (no content: ø)
  [SECTION soldiers-coming]
    ## Soldiers coming
  [SECTION androids-chased]
    ## Androids are chased by soldiers
    <CONDITION GROUP>
      <VARIANT>
        IF: Knock soldiers out
  [SECTION josh-dying]
    ## Josh is dying
  [SECTION deviant-hold]
    ## In the hold
    <CONDITION GROUP>
      <VARIANT>
        IF: Connor dies
  [SECTION explosives]
    ## Explosive armed
    NOTE: See
    NOTE: Crossroads - Markus
    NOTE: : Escape from Jericho.
[SECTION machine-connor]
  # Connor remained a machine
  [SECTION cargo-hall]
    ## Cargo Hall
    ** PROMPT (choice group) **
      - OPTION "LIE"
      - OPTION "PERKINS EXCUSE"
      - OPTION "ATTACK"
        <CONDITION GROUP>
          <VARIANT>
            IF: Lose the fight
      - OPTION "RUN"
  [SECTION machine-hold]
    ## In the hold
    <CONDITION GROUP>
      <VARIANT>
        IF: Markus is alive - Connor finds Markus
        <CONDITION GROUP>
          <VARIANT>
            IF: Reach the gun
            UNLOCK(Death): Markus kills Connor
            ### UNUSED/CUT CONTENT ###
            NOTE: See
            NOTE: Crossroads - Markus: Escape from Jericho.
          <VARIANT>
            IF: Fail to reach the gun
            UNLOCK(Death): Connor kills Markus
            <CONDITION GROUP>
              <VARIANT>
                IF: Simon is alive
              <VARIANT>
                IF: Simon is dead
            NOTE: See
            NOTE: Crossroads - Markus: Surviving characters jump.
      <VARIANT>
        IF: Markus is dead or left Jericho - Connor goes after North
        <CONDITION GROUP>
          <VARIANT>
            IF: Attacked the soldier
          <VARIANT>
            IF: Didn't attack the soldier
        NOTE: See
        NOTE: Crossroads - Markus: Surviving characters jump.

COUNTS (all): prompts=13, options=40, arrows=20, obs=0, unlock=4, unused=3
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
```

#### 30.3 Crossroads - Markus

```
[SECTION captain-cabin]
  # In the captain's cabin
  [SECTION markus-alive]
    ## Markus is alive
    ** PROMPT (choice group) **
      - OPTION "AGGRESSIVE"
      - OPTION "DETERMINED"
      - OPTION "RIGHTEOUS"
      - OPTION "SOMBER"
    <CONDITION GROUP>
      <VARIANT>
        IF: Lead a peaceful march in Freedom March and made a pacifist speech in Stratford Tower
        ### UNUSED/CUT CONTENT ###
      <VARIANT>
        IF: Lead a peaceful march in Freedom March and made an aggressive speech in Stratford Tower
      <VARIANT>
        IF: Attacked the Police during the march in Freedom March
    ** PROMPT (choice group) **
      - OPTION "ANGRY"
        ARROW Josh SmallDown
      - OPTION "BITTER"
      - OPTION "REMORSE"
        ARROW Josh SmallUp
        ### UNUSED/CUT CONTENT ###
      - OPTION "NO REGRETS"
    <CONDITION GROUP>
      <VARIANT>
        IF: Reputation with Jericho is higher than 'unpopular'
        <CONDITION GROUP>
          <VARIANT>
            IF: Simon is here
          <VARIANT>
            IF: Simon is dead
        ** PROMPT (choice group) **
          - OPTION "CONFRONTATION"
            ARROW North SmallUp
            ARROW Josh SmallDown
            <CONDITION GROUP>
              <VARIANT>
                IF: Simon is alive
          - OPTION "DIALOGUE"
            ARROW North SmallDown
            ARROW Josh SmallUp
            <CONDITION GROUP>
              <VARIANT>
                IF: Simon is alive
          - OPTION "STAY HIDING"
            ARROW Josh SmallUp
            ARROW North SmallDown
            ARROW Simon SmallUp
            <CONDITION GROUP>
              <VARIANT>
                IF: Simon is alive
              <VARIANT>
                IF: Simon is dead
        ** PROMPT (choice group) **
          - OPTION "SAD"
          - OPTION "ANGRY"
          - OPTION "THOUGHTFUL"
          - OPTION "BITTER"
        ** PROMPT (choice group) **
          - OPTION "KEEP"
          - OPTION "REFUSE"
        <CONDITION GROUP>
          <VARIANT>
            IF: North has lover relationship status
            ** PROMPT (choice group) **
              - OPTION "KISS"
              - OPTION "DON'T KISS"
                ARROW North LargeDown
        [SECTION connor-arrives-popular]
          ### Connor arrives to find Markus
          UNLOCK(Lock): Connor found Jericho
          NOTE: See
          NOTE: Crossroads - Connor
          NOTE: : Finding Markus.
      <VARIANT>
        IF: Reputation with Jericho is unpopular
        ARROW Jericho LargeDown
        [SECTION connor-arrives-unpopular]
          ### Connor arrives to find North
          UNLOCK(Lock): Connor found Jericho
          NOTE: See
          NOTE: Crossroads - Connor
          NOTE: : Find North.
  [SECTION markus-dead]
    ## Markus died in Freedom March
    <CONDITION GROUP>
      <VARIANT>
        IF: Simon is alive
      <VARIANT>
        IF: Simon is dead
    <CONDITION GROUP>
      <VARIANT>
        IF: Simon is alive
      <VARIANT>
        IF: Simon is dead
    [SECTION connor-arrives-north]
      ### Connor arrives
      UNLOCK(Lock): Connor found Jericho
      NOTE: See
      NOTE: Crossroads - Connor
      NOTE: : Find North.
[SECTION corridor]
  # In the corridor
  ** PROMPT (choice group) **
    - OPTION "MESSAGE"
    - OPTION "SIMON AND JOSH"
      UNLOCK(None): Simon is alive
    - OPTION "JOSH"
      UNLOCK(Death): Simon is dead
    - OPTION "HELICOPTERS"
    - OPTION "BLOW UP JERICHO"
      <CONDITION GROUP>
        <VARIANT>
          IF: Connor became deviant
  <CONDITION GROUP>
    <VARIANT>
      IF: Soldiers shoot Markus twice
      <CONDITION GROUP>
        <VARIANT>
          IF: Connor became deviant
          NOTE: See
          NOTE: Crossroads - Connor
          NOTE: : Deviant Connor in corridor.
  [SECTION lucy]
    ## Meet Lucy
  [SECTION bridge]
    ## Bridge breaks under Markus
  [SECTION soldiers-androids]
    ## Soldiers threaten androids
    ** PROMPT (choice group) **
      - OPTION "INTERVENE"
        ARROW Jericho SmallUp
        <CONDITION GROUP>
          <VARIANT>
            IF: Deal with soldiers
          <VARIANT>
            IF: Get shot
      - OPTION "DON'T INTERVENE"
        ARROW Jericho SmallDown
        (no content: ø)
  [SECTION soldiers-coming]
    ## Soldiers coming Markus' way
  [SECTION androids-chased]
    ## Androids are chased by soldiers
    <CONDITION GROUP>
      <VARIANT>
        IF: Knock soldiers out
        ARROW Jericho SmallUp
      <VARIANT>
        IF: Abandoned androids
        ARROW Jericho SmallDown
        (no content: ø)
  [SECTION josh-fighting]
    ## Josh is fighting a soldier
    ** PROMPT (choice group) **
      - OPTION "INTERVENE"
        <CONDITION GROUP>
          <VARIANT>
            IF: Neutralize soldiers
            ARROW Jericho SmallUp
            ARROW Josh LargeUp
          <VARIANT>
            IF: Lose the upper hand
            ARROW Jericho SmallDown
            <CONDITION GROUP>
              <VARIANT>
                IF: Markus shot twice
              <VARIANT>
                IF: Markus wounded
      - OPTION "HIDE"
        ARROW Jericho SmallDown
  [SECTION hold]
    ## In the hold
    <CONDITION GROUP>
      <VARIANT>
        IF: Connor became a deviant
        <CONDITION GROUP>
          <VARIANT>
            IF: Lose the fight
            <CONDITION GROUP>
              <VARIANT>
                IF: Simon is alive
              <VARIANT>
                IF: Simon is dead
      <VARIANT>
        IF: Connor remained a machine
        NOTE: Connor interrupts; See
        NOTE: Connor - Crossroads: Connor remained a machine.
[SECTION jericho-escape]
  # Escape from Jericho
  [SECTION explosives]
    ## Explosives were activated
    ARROW North SmallUp
    ARROW Jericho SmallUp
    ARROW Josh SmallUp
    ARROW Simon SmallUp
    <CONDITION GROUP>
      <VARIANT>
        IF: Markus was rejected by Jericho
        UNLOCK(Lock): Markus did not leave forever
      <VARIANT>
        IF: Markus wasn't rejected
    <CONDITION GROUP>
      <VARIANT>
        IF: Lose too much time
    [SECTION north-shot]
      ### North is shot
      <CONDITION GROUP>
        <VARIANT>
          IF: Simon is alive
        <VARIANT>
          IF: Simon is dead
      ** PROMPT (choice group) **
        - OPTION "SAVE NORTH"
          <CONDITION GROUP>
            <VARIANT>
              IF: Markus is injured - cannot save North
              ARROW Jericho SmallDown
              ARROW Simon SmallDown
              ARROW Josh LargeDown
            <VARIANT>
              IF: Markus is not injured
              ARROW Jericho SmallUp
              ARROW North LargeUp
              ARROW Josh SmallUp
              ARROW Simon SmallUp
              <CONDITION GROUP>
                <VARIANT>
                  IF: Save North
                  <CONDITION GROUP>
                    <VARIANT>
                      IF: Connor became deviant - Connor protects Markus and North
                      <CONDITION GROUP>
                        <VARIANT>
                          IF: Connor kills the soldiers
                  <CONDITION GROUP>
                    <VARIANT>
                      IF: Run to exit
                    <VARIANT>
                      IF: Fail to run to exit (Connor stayed a machine) - Markus dies
                <VARIANT>
                  IF: Fail to save North
                  <CONDITION GROUP>
                    <VARIANT>
                      IF: Connor became a deviant - North dies, Connor rescues Markus
                      ARROW Jericho SmallDown
                    <VARIANT>
                      IF: Connor stayed a machine - Markus dies, North escapes
        - OPTION "RUN"
          ARROW Jericho SmallDown
          ARROW Simon SmallDown
          ARROW Josh LargeDown
  [SECTION jump]
    ## Surviving characters jump
    <CONDITION GROUP>
      <VARIANT>
        IF: Explosives were activated
        <CONDITION GROUP>
          <VARIANT>
            IF: Markus survived
          <VARIANT>
            IF: Markus died or was rejected
      <VARIANT>
        IF: Explosives weren't activated

COUNTS (all): prompts=10, options=30, arrows=34, obs=0, unlock=6, unused=2
COUNTS (inside unused/cut blocks): prompts=0, options=0, arrows=0, obs=0
```

### 10b. Discrepancies

Rule applied (README): the template wins for labels, prompts, arrows and clue text; the flowchart image wins for node order and node names; the wiki only where the template is silent; cut content is not built. Unlock and condition texts are the transcribers' reconstruction (SOURCES.md 1.1: transcript tier, below the wiki), so for gates the wiki stands and conflicts go to the operator. An arrow written on an option before its outcome variants applies whatever the outcome; an arrow inside a variant applies only on that outcome.

#### Against the note (sections 1 to 3)

Intro: none. Section 6 already records both TV variants, the shared Arctic item and the two cut items.

Kara (30.1):
1. **Surrender round labels.** Section 2e names the options `FACE` / `CONVINCE` / `OBEY` / `RUN AWAY`. The template's buttons read `RUN`, `CONVINCE`, `ATTACK`, `OBEY`, in that order. `FACE` and `RUN AWAY` are chart node names. The template wins for the labels the scene offers.
2. **Leg-shot round labels.** Section 2e lists `FACE (transcript ATTACK)`. The template's first round is `GET UP` / `ATTACK` / `SURRENDER` / `PLAY DEAD`, and after `GET UP` it is `CRAWL` / `ATTACK` / `SURRENDER`. `OUT OF TIME` is a timeout, not a button. Template wins: the button is `ATTACK`.
3. **Luther on `DISTANT`.** Section 3 (Luther table) keeps "small down, W only". The template has no Luther arrow on `DISTANT`. Template wins: no Luther change.
4. **Abandonment gate (`RUN AWAY` / `FIND ALICE`).** The template's lock reads "Alice relation is below WARM and choose DISTANT"; the wiki reads "did not increase to NEUTRAL". Section 2b quotes both and does not resolve them. Under the rule above the wiki gate stands (never above Distant). Open question 4 already asks the operator. The template has no choice group here, only the `LOOK FOR ALICE` variant with Alice large up. The chart label is `FIND ALICE` (`MENU.FLOWCHART.02A.K.ALICECHOICEFIND`), so the chart wins for the name.
5. **Arrows apply before the QTE.** `HELP LUTHER` (Alice small up, Luther small up) and `OPEN` (Alice small up) carry their arrows on the option, ahead of the `Get Luther to safety` / `Fail to get to safety` and `Kill soldier` / `Lose fight` variants, so they apply on any outcome. The tables in 2c, 2d and 3 do not say this. Template wins.

Connor (30.2):
6. **`DISCOURAGE`.** Section 2g/3 and open question 2 leave the conflict open (W and SI page: up; T: none). Template wins: no SI change.
7. **`OUR CAUSE`.** Section 3 calls the wiki's missing icon "probably" an omission. Template wins: SI small up.
8. **Cut lines.** "No, I-" at Lucy and Markus's "You could have joined us. You could have been free…" are not recorded as cut in the note (only the background line is, in 2g). Record only; do not build.

Markus (30.3):
9. **`KISS`.** Sections 2f and 3 give North large up (W, RS; "T: none"). The template has no arrow on `KISS`; `DON'T KISS` has North large down. Template wins: no change on `KISS` (open question 3 can still be confirmed in game).
10. **Exiled Markus who returns.** Sections 2j and 3 give Jericho large up "instead" of the rejoin arrows (W, RS). In the template, the four rejoin arrows (North, Jericho, Josh and Simon, each small up) sit at the top of "Explosives were activated". They come before the `Markus was rejected by Jericho` / `Markus wasn't rejected` split, so they apply to a returning exile too. There is no Jericho large up anywhere in the template. Template wins: four small ups and no large up (answers the second half of open question 10).
11. **`SAVE NORTH` arrows.** The template puts Jericho small up, North large up, Josh small up and Simon small up on choosing `SAVE NORTH` while "Markus is not injured", before the `Save North` / `Fail to save North` split. Failing with a deviant Connor adds only Jericho small down. Failing with a machine Connor (Markus dies, North escapes) adds nothing. Section 2j's table puts the ups on the success row only, and section 3 keeps the wiki's "failing to save her: Jericho down, Josh large down, Simon down" for the failure. Template wins. Josh large down and Simon small down apply only to `RUN` and the injured case.
12. **Josh fight, `LOSE THE UPPER HAND`.** The template's variants are `Markus shot twice` (the soldier kills Markus: "Got you, motherfucker." North: "Markus! No...") and `Markus wounded` (Josh's dying line "Don't become like them, Markus…"). Section 2j frames the split as "not wounded / wounded" before the fight. The template reads as a hit counter (this hit wounds Markus; on the third hit he dies), which matches "Soldiers shoot Markus twice" in the corridor. The template is silent on whether the state is prior or resulting, so the wiki and the chart stand on structure. Add to open questions 6 and 7.
13. **Cut lines.** Josh's "Thousands of our people are about to be destroyed…" (pacifist variant) and Markus's "Yeah, maybe I made some mistakes." (`REMORSE`) are not recorded as cut. Record only.

No discrepancy with section 1. The templates carry no flowchart node labels. Their section headings are the transcribers' prose and agree in order with the chart: Kara car → Jericho → sit down → Markus/North → Alice → attack → corridor → crossroad → cabin → flee; Connor cabin → deviant corridor / machine cargo hall → hold; Markus cabin → corridor → Lucy → bridge → androids → soldiers coming → reservoir → Josh → hold → escape → jump.

#### Against the benchmark (`benchmark/story.json` 1.6.0, `benchmark/story-engine.mjs`)

Magnitudes: engine ±1 = small, ±2 = large. Every benchmark option is prose; the game's label is given here for each.

Intro:
14. **`R30k` is Kara-only.** The template embeds the Jericho TV (`<app-screens>`, "Watch TV") in Connor's "In Jericho" section as well as Kara's. A Connor viewing (when he reaches Jericho) is missing.
15. **`R30k` facts differ from the template's TV text.**
    - "State of emergency… gathered into military camps for immediate destruction… androids are being lynched" is in neither variant. The TV says "delivered to the nearest police station or army barracks", and the lynchings are background talk.
    - The not-charged item (`media[1]`) carries "Hospitals and schools are closing… two thirds of their personnel", which is only in the attacked variant (and Kara's car radio).
    - The template wins for the text. There are no arrows on either variant; `R30k` has no effect, which is correct.

Kara:
16. **Missing prompt (Markus alive).** `BOND` / `NO DIFFERENCE` / `SECRET` (no arrows). No scene.
17. **Missing prompts (Markus died in Freedom March, `UNLOCK(Death)`).** `MARKUS…` / `THANK YOU`, then `BOND` / `NO DIFFERENCE` / `SECRET` (no arrows). No scene.
18. **`K17` labels and situation.**
    - The labels should be `HUG` / `DISTANT` (benchmark: "Hold her and tell her it changes nothing." / "Pull back from her.").
    - The arrows match: `alice(±2)`, and `luther(+1)` on HUG when Luther is with her.
    - The template gives the explanation to Lucy when Luther is dead; the situation always names Luther.
    - Fix: use the game's labels and add the Lucy variant.
19. **`K31` is missing Alice large up on option 1.** The template's `LOOK FOR ALICE` carries Alice large up, but the engine applies none. Template wins; add `alice(+2)`. `K31` itself is a chart-only choice and the chart keeps it. For the gate, see item 4.
20. **`K18` arrows.**
    - The template's `HELP LUTHER` gives Alice small up and Luther small up on any outcome.
    - The engine gives `luther(+2)` (wrong size) on success only, nothing on failure, and no Alice arrow.
    - Fix: `alice(+1)`, `luther(+1)` on option 0 regardless of the roll.
    - `PROTECT ALICE` `alice(-1)` matches.
21. **`K18` labels.** They should be `HELP LUTHER` / `PROTECT ALICE` (benchmark: "Hide him in a cabin." / "Leave him and run with Alice.").
22. **Missing prompt after `PROTECT ALICE`.** `CONSOLE` / `HURRY`, with `HURRY` giving Alice small down. No scene.
23. **`K19` labels and situation.** The arrows match (`alice(+1)` / `alice(-1)`). The labels should be `OPEN` / `DON'T OPEN`. The template's android is female ("She'll die out there Kara!"); the situation says "him".
24. **`K20` labels and order.** The template has `PLAY DEAD` / `RUN` / `SURRENDER`. The benchmark has play dead / surrender / run, in prose. No arrows on either side.
25. **Missing prompts after `RUN`.**
    - `GET UP` / `ATTACK` / `SURRENDER` / `PLAY DEAD`, then after `GET UP`, `CRAWL` / `ATTACK` / `SURRENDER`.
    - `ATTACK` has three variants: Luther alive and sacrificing himself; Luther dead; Luther dead after playing dead.
    - The engine auto-resolves `RUN`.
26. **Missing prompt after `SURRENDER`.** `RUN` / `CONVINCE` / `ATTACK` / `OBEY`; `ATTACK` with Luther alive leads to Luther's sacrifice. The engine always captures.
27. **`K20-still` labels and order.** The template has `DEFEND ALICE` then `DON'T MOVE`; the benchmark has still first, in prose. No arrows on either side. The kick and whimper are not in the template.

Connor:
28 to 32. **Missing prompts (facing Markus), with 11 SI arrows the engine never applies.**
   - 28: `REASON` (SI small up) / `DEFY` / `DISCOURAGE` / `THREATEN`.
   - 29: `INTIMIDATE` / `INSTRUCTIONS`.
   - 30: `CONVINCE` (up) / `APPEAL` (up) / `I KNOW YOU` / `OUR CAUSE` (up).
   - 31: `STAY BACK!` (SI small down) / `WARNING SHOT` (down) / `ENOUGH!` (down) / `SAY NOTHING`.
   - 32: `SOW DOUBTS` / `QUESTION` / `RALLY` / `UNDERMINE` (each up).
33 to 37. **Missing North version ("Find North - If Markus is dead or rejected by Jericho"), with 8 SI arrows and Amanda large down.**
   - 33: `INSTRUCTIONS` / `INTIMIDATE`.
   - 34: `STAY BACK!` / `WARNING SHOT` / `ENOUGH!` (each down) / `SAY NOTHING`.
   - 35: `DISTURBED` (up) / `SAY NOTHING` / `COLD` (down).
   - 36: `COLD` (down) / `DISTURBED` (up) / `SAY NOTHING`.
   - 37: `BECOME A DEVIANT` / `REMAIN A MACHINE`.
   - `C22` always presents Markus.
38. **`C22` labels and setting.** The labels should be `BECOME A DEVIANT` (lock "Have enough software instability") / `REMAIN A MACHINE`. The setting is the captain's cabin, not "the hold". The engine's threshold `instability >= 4` has no source; the template gives none.
39. **`C22` is missing Amanda large down on `BECOME A DEVIANT`.** Add `amanda(-2)`.
40. **`C22` machine option applies arrows the template does not have.** It calls `connorDies` (`si(-1)`, `hank(-1)`, `amanda(-1)`), and the template has none of these. It also appends Hank's suicide when `hankResigned`, which is not in this template (that is Night of the Soul). Remove both from this scene.
41. **Missing machine-branch prompt.** Cargo hall: `LIE` / `PERKINS EXCUSE` / `ATTACK` (variant "Lose the fight") / `RUN` (no arrows). After it comes the hold outcome: "Reach the gun" → Markus kills Connor; "Fail to reach the gun" → Connor kills Markus. Neither is in the benchmark; machine Connor always dies at `C22`.
42. **`C23` matches no template prompt.**
    - The only deviant prompt is in "Deviant Connor in corridor: Markus is dead or rejected": `INTERVENE` / `DON'T INTERVENE`, with no arrows.
    - The engine's `si(+1)` on success and `risk: 0.25` are unsupported.
    - `C23` also runs while Markus is alive and on his mission, where the template gives Connor no choice.
    - Fix: replace it with the template prompt, gated on Markus dead or rejected, with no arrows.

Markus:
43. **Missing prompt.** `AGGRESSIVE` / `DETERMINED` / `RIGHTEOUS` / `SOMBER` (no arrows).
44. **Missing prompt.** `ANGRY` (Josh small down) / `BITTER` / `REMORSE` (Josh small up) / `NO REGRETS`.
45. **Missing prompt (Jericho above Unpopular).** `CONFRONTATION` (North up, Josh down) / `DIALOGUE` (North down, Josh up) / `STAY HIDING` (Josh up, North down, Simon up). Seven small arrows.
46. **Missing prompt.** `SAD` / `ANGRY` / `THOUGHTFUL` / `BITTER` (no arrows).
47. **Missing Jericho large down on the ousting.** It applies in the "Reputation with Jericho is unpopular" variant; the engine applies none (`M21` only performs the no-raid exit).
48. **`M21` labels.** They should be `KEEP` / `REFUSE`.
49. **`M21` applies an arrow the template does not.** `north(+1)` on KEEP has no arrow in the template. Remove it.
50. **`M21` gate.** The template offers `KEEP` / `REFUSE` only in the above-Unpopular variant; the engine offers `M21` to an ousted Markus too.
51. **`M21b` labels and gate.**
    - The labels should be `KISS` / `DON'T KISS`.
    - The gate should be "North has lover relationship status" inside the above-Unpopular variant; the engine uses `northBond && north`, with no ousting check.
    - The setting is the cabin after the detonator; the benchmark has "the deck".
52. **`M21b` applies an arrow the template does not.** `north(+1)` on KISS has no arrow in the template. `DON'T KISS` `north(-2)` matches large down.
53. **`M22` go-back arrow.** `M22` is a chart-only choice; the template's only trace is the lock "Markus did not leave forever". Its `jer(+2)` on going back has no template arrow. The template gives the four rejoin small ups instead (item 56). Remove `jer(+2)`.
54. **Missing prompt.** The corridor team round: `MESSAGE` / `SIMON AND JOSH` (Simon alive) / `JOSH` (`UNLOCK(Death)`, Simon dead) / `HELICOPTERS` / `BLOW UP JERICHO` (no arrows; a deviant Connor adds a line).
55. **`M23` labels and arrows.**
    - The labels should be `INTERVENE` / `DON'T INTERVENE`.
    - The template's Jericho small up is on `INTERVENE` itself, before the `Deal with soldiers` / `Get shot` variants. The engine gives `jer(+1)` only on success.
    - On failure the template wounds Markus and the androids escape. The engine says the androids are shot anyway.
    - `DON'T INTERVENE` `jer(-1)` matches.
56. **Missing rejoin arrows.** "Explosives were activated": North, Jericho, Josh and Simon each small up. The engine applies none.
57. **Missing reservoir arrows.** "Knock soldiers out" gives Jericho small up; "Abandoned androids" gives Jericho small down. These are conditioned content, not a choice group; the chart has the interaction. No scene.
58. **`M24` labels and arrows.**
    - The labels should be `INTERVENE` / `HIDE`.
    - On `Neutralize soldiers` the engine gives `josh(+2)`, which matches Josh large up, but Jericho small up is missing.
    - On `Lose the upper hand` Jericho small down is missing. The engine's Josh death plus `markusHit` agrees with the template's hit-count reading (item 12).
    - On `HIDE` Jericho small down is missing.
59. **`M25` labels and arrows.**
    - The labels should be `SAVE NORTH` / `RUN`.
    - **Uninjured.** Jericho small up is missing, and the engine gives the North, Simon and Josh ups only on success, where the template gives them on the choice (item 11).
    - **Failure with a deviant Connor.** Jericho small down is missing.
    - **Failure with a machine Connor.** The template has Markus die and North escape; the engine kills North.
    - **`RUN`.** Jericho small down, Simon small down and Josh large down are missing; the engine applies nothing.
    - **Injured branch.** The template's "Markus is injured - cannot save North" (Jericho small down, Simon small down, Josh large down) is missing.

Totals: 13 discrepancies with the note (Kara 5, Connor 3, Markus 5, intro 0); 46 with the benchmark (intro 2, Kara 12, Connor 15, Markus 17).
