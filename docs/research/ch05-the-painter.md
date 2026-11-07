# Chapter 5: The Painter (Markus)

In-game date and time: November 5, 2038, 09:58AM. Location: Carl Manfred's house. Wiki: "This chapter has only one outcome." (`|endings = 1`).

Images used (full-size, 1920x1080, downloaded to `/tmp/flowcharts/ch05/`):

- `painter-1.jpg`: the whole chart zoomed out, 100% COMPLETED.
- `painter-2.jpg`: left third, from ARRIVING HOME to FIND SOMETHING TO DO.
- `painter-3.jpg`: middle, from FIND SOMETHING TO DO to TAKE CARL TO THE STUDIO.
- `painter-4.jpg`: right third, from PAINT SOMETHING YOU SEE to the ending.

The chart legend (SHOW LEGEND) was not photographed. Icon names below follow the game's usual legend: two overlapping squares = choice group; dotted arrow = path node; triangle = node unlocked by an earlier chapter; bracketed bar icon = optional side branch. Blue fill means the node was on the most recent playthrough shown; grey means unlocked on another playthrough. Colour is not a gate.

## 1. Flowchart transcription

Labels are copied exactly as printed, misprints included. Reading order is left to right; groups are listed in the order the chart stacks them, top to bottom.

**Phase A: ARRIVING HOME**

1. `ARRIVING HOME`: CHECKPOINT (large picture node: Markus walking up to the gate).
2. `DROP OFF PACKAGE`: arrow, blue.
3. Optional side group, drawn under the WAKE CARL column with no line from the main path. It has the side-branch icon.
   - `ACTIVATE BIRDS`: arrow, blue.
   - `READ "NORTH POLE RUSSIA"`: arrow, grey box, two lines in the box (`READ "NORTH POLE` / `RUSSIA"`).
   - `READ "LIFE ON TITAN"`: arrow, grey box.
4. `WAKE CARL`: arrow, blue.
5. After WAKE CARL the line forks to two nodes, stacked:
   - `SERVE BREAKFAST`: arrow, blue (top).
   - `CARL NOTICES MARKUS' CLOTHES`: **triangle icon** (unlocked by an earlier chapter), blue (bottom). Printed in two lines: `CARL NOTICES MARKUS'` / `CLOTHES`.

   Both lines join FIND SOMETHING TO DO.

**Phase B: FIND SOMETHING TO DO**

6. `FIND SOMETHING TO DO`: CHECKPOINT (picture node: Markus standing by the bookshelf, Carl in his wheelchair).
7. Choice group (two squares, blue): `PLAY CHESS` (blue), `READ BOOK`, `PLAY PIANO`.
8. Three sub-choice groups, stacked top to bottom:
   - From PLAY CHESS (two squares, blue): `WIN`, `LOSE`, `DRAW` (DRAW blue).
   - From READ BOOK (two squares, black): `THE REPUBLIC BY PLATO`, `TRAGEDIES OF WILLIAM SHAKESPEARE` (two lines: `TRAGEDIES OF WILLIAM` / `SHAKESPEARE`), `ODES BY JOHN KEATS`.
   - From PLAY PIANO (two squares, black): `MELANCHOLIC`, `HOPEFUL`, `INTIMATE`, `ENIGMATIC`.
9. All three sub-groups join `TAKE CARL TO THE STUDIO`: arrow, blue.

**Phase C: the studio (no checkpoint)**

10. `PAINT SOMETHING YOU SEE`: arrow, blue.
11. Choice group (two squares, blue): `COPY CARL'S PAINTING`, `COPY DESK` (blue), `COPY STATUE`.
12. `PAINT FROM THE THE HEART`: arrow, blue. The word "THE" is doubled on the chart, as printed in two lines: `PAINT FROM THE THE` / `HEART`. The wiki writes "Paint from the heart".
13. Choice group (two squares, blue): `ANDROIDS`, `HUMANITY`, `IDENTITY` (IDENTITY blue).
14. Three sub-choice groups, stacked top to bottom:
    - From ANDROIDS (two squares): `FATE`, `HOPE`, `PAIN`, `SADNESS`.
    - From HUMANITY (two squares): `ANGER`, `COMFORT`, `EMPATHY`, `HOPE`.
    - From IDENTITY (two squares, blue): `ANDROIDS`, `DESPAIR` (blue), `DOUBTS`, `PRISONER`.
15. All three sub-groups join the ending.

**Ending**

16. `LEO INTRUDED TO ASK FOR MONEY` (two lines: `LEO INTRUDED TO ASK` / `FOR MONEY`): the large picture ending node (Markus holding a palette, Leo in the doorway). **No icon**: no skull, no-entry sign, check or trophy.

**Count:** 44 nodes. That is 2 checkpoints, 1 ending, 7 single path nodes (DROP OFF PACKAGE, WAKE CARL, SERVE BREAKFAST, CARL NOTICES MARKUS' CLOTHES, TAKE CARL TO THE STUDIO, PAINT SOMETHING YOU SEE, PAINT FROM THE THE HEART), 3 optional side nodes and 31 choice-option nodes in 9 choice groups.

The 9 choice groups are: activity (3 options), chess (3), book (3), piano (4), copy (3), heart theme (3), ANDROIDS sub-group (4), HUMANITY sub-group (4) and IDENTITY sub-group (4).

One playthrough makes **5 chart decisions**: activity, the activity's sub-choice, copy subject, heart theme and the theme's sub-choice.

PowerPyx: "Just do each category once and the sub-tasks (e.g. win, lose, draw in chess) will all complete at once, no matter which one you pick." The same applies to the heart sub-choices: "All 4 sub-choices will complete in the flowchart simultaneously, regardless of which one you pick."

The wiki's text flowchart lists the same nodes in the same order. Its labels differ only in case and spelling ("Paint something you see", "Paint from the heart", "Androids OR Humanity OR Identity"). It labels the magazine group "(Magazine) (side option) - in the dining room" and ACTIVATE BIRDS "(side option) - found in main lobby".

## 2. Choices and gates

| Chart node | Options (chart labels) | Requires | Leads to |
|---|---|---|---|
| Optional side group | ACTIVATE BIRDS; READ "NORTH POLE RUSSIA"; READ "LIFE ON TITAN" | Nothing. These are optional interactions that can be done any time before Carl's breakfast is over. The transcript offers the magazine again in the "Find something to do" phase. | Nothing (no story effect). The chart shows no outbound line. |
| WAKE CARL → SERVE BREAKFAST / CARL NOTICES MARKUS' CLOTHES | Not a choice | CARL NOTICES MARKUS' CLOTHES needs *Protesters harass Markus* in Shades of Color. PowerPyx: "This flowchart task completes automatically if Markus was attacked by Protesters in Shades of Color (Flowcharts task 'Protesters Harass Markus')." | FIND SOMETHING TO DO |
| Activity (FIND SOMETHING TO DO) | PLAY CHESS / READ BOOK / PLAY PIANO | None. Only one activity per playthrough. PowerPyx: "You can pick one side activity to do and the story will progress automatically." | The matching sub-group |
| Chess | WIN / LOSE / DRAW | PLAY CHESS | TAKE CARL TO THE STUDIO |
| Book | THE REPUBLIC BY PLATO / TRAGEDIES OF WILLIAM SHAKESPEARE / ODES BY JOHN KEATS | READ BOOK | TAKE CARL TO THE STUDIO |
| Piano | MELANCHOLIC / HOPEFUL / INTIMATE / ENIGMATIC | PLAY PIANO | TAKE CARL TO THE STUDIO |
| PAINT SOMETHING YOU SEE | COPY CARL'S PAINTING / COPY DESK / COPY STATUE | None | PAINT FROM THE THE HEART |
| PAINT FROM THE THE HEART | ANDROIDS / HUMANITY / IDENTITY | None | The matching sub-group |
| ANDROIDS sub-group | FATE / HOPE / PAIN / SADNESS | ANDROIDS | LEO INTRUDED TO ASK FOR MONEY |
| HUMANITY sub-group | ANGER / COMFORT / EMPATHY / HOPE | HUMANITY | LEO INTRUDED TO ASK FOR MONEY |
| IDENTITY sub-group | ANDROIDS / DESPAIR / DOUBTS / PRISONER | IDENTITY | LEO INTRUDED TO ASK FOR MONEY |

**What each choice shows** (from the wiki transcript, The_Painter_(Transcript)):

- **Chess.** The game is speed chess. After three moves Markus stops at the final move.
  - WIN: Carl says, "That's what I call a thorough beating, it's not easy for an old man to compete with a machine." Off-chart reply: JUSTIFY or SORRY.
  - LOSE: Carl says, "are your circuits rusty? Or are you just taking pity on an old man?" Off-chart reply: LIE or TRUTH. Carl answers both with "Never throw a match, Markus. If you can win, win."
  - DRAW: Carl says, "That is a very odd draw…" Off-chart reply: LIE ("You don't lie as good as you play chess") or TRUTH ("A draw feels like an honorable compromise, no?").
- **Books.**
  - Keats: "there's a lot of sadness in his poems." Carl: "there's nothing like love to make a man feel miserable."
  - Shakespeare: the in-game book is *Macbeth*. Markus: "Human emotions are… intriguing…"
  - Plato: Markus: "It asks the questions that I can't answer. What is right or what is wrong…" Carl: "Asking questions that have no answers is part of being human, Markus."
- **Piano.** Every theme ends with Carl: "Something has changed in the way you play… Sometimes I think you have more humanity than most humans…"
  - There is an off-chart playing prompt: Exit / Play Quickly / Play Slowly / Finish Song.
  - The four themes, according to the wiki's Notes: "Melancholic" = "Markus's theme"; "Hopeful" = "the opening theme of the game"; "Intimate" = "Kara's theme song"; "Enigmatic" = "another part of Markus's theme".
- **Every activity**, and also doing nothing, ends with the same line from Carl: "One day, I won't be here to take care of you anymore. You'll have to protect yourself, and make your choices… Decide who you are, and wanna become… This world doesn't like those who are different, Markus. Don't let anyone tell you who you should be. Let's go to the studio."
- **Copy.** In game the prompt is FIND A SUBJECT TO PAINT, with the options PAINT CARL'S PAINTING / PAINT STATUE / PAINT DESK. Every option gets the same reply: "That is a perfect copy, of reality. But painting is not about replicating the world, it's about interpreting it, improving on it, showing something you see."
- **Heart.** Carl's instruction: "Try to imagine something that doesn't exist. Something you've never seen. Now, concentrate... on how it makes you feel..." What each painting shows, per the transcript:
  - ANDROIDS
    - FATE: "himself on his knees"
    - HOPE: "his hand covered in what looks to be oil"
    - PAIN: "himself decaying and in agony"
    - SADNESS: "hands covered in blue blood"
  - HUMANITY
    - ANGER: "himself enraged and screaming"
    - COMFORT: "Carl with a brave and stoic expression"
    - EMPATHY: "two hands covered in blue blood and two hands covered in red blood"
    - HOPE: "two hands grabbing each other"
  - IDENTITY
    - ANDROIDS: "himself covered in blue blood"
    - DESPAIR: "himself with his hand on his face"
    - DOUBTS: "himself wearing regular clothes in front of a red wall"
    - PRISONER: "himself with Carl behind him"
  - Every painting gets the same reaction from Carl: "Oh my God…". Leo then enters.

**Interactions that are not on the chart.** The wiki Description and Attention to Detail sections and the transcript list these, none of them a chart node:

- look at the mirror;
- observe the painting behind the bench;
- spin the globe;
- examine the giraffe statue, upstairs and downstairs;
- look at the dinosaur skeleton and the metal deer artwork;
- walk on the stair carpet;
- look at the chessboard ("CHECKMATE IN 3 MOVES FOR SILVER");
- look at the shelf;
- play piano before breakfast ("playing the intro used in 'A New Home'");
- Watch The News: the TV comes on when Carl says "Television." after breakfast is served;
- serve breakfast before or after waking Carl;
- administer Carl's medicine and carry him to the bath;
- wander off or take too long, which draws three idle comments from Carl;
- clean the studio (move brushes and jars, paint buckets, big papers, paint box) or do nothing;
- remove the sheet;
- watch Carl paint;
- give Carl a verdict on his painting: **LIKE / DON'T LIKE / NO OPINION**. Every answer gets the same reply: "The truth is I have nothing left to say anymore…"

The wiki also mentions a "do nothing" path: "Alternatively, Markus can just do nothing." The transcript calls it "Don't Find Something To Do", and Carl delivers the same closing line. The chart draws no bypass line for it (see Open questions).

## 3. Numbers

**This chapter has no probability, timer, relationship change, public opinion change or software instability change in any source.**

- **Carl relationship:** the game has no Carl relationship stat. The wiki's Relationship_Stat page lists Markus's tracked relationships as "Jericho Levels" and "North/Josh/Simon Levels" only, and its "== Markus ==" section has subsections for Jericho, North, Josh and Simon only. No source gives a Carl number for any choice in this chapter (chess result, book, piano theme, copy subject, heart theme or sub-choice, or the verdict on Carl's painting). The chapter page has no Relationship table.
- **Public opinion:** The Painter does not appear on the wiki Public_Opinion page. Its only news-watching entries are On the Run, Zlatko and The Pirates' Cove. The TV report here (Arctic crisis) has no stated effect.
- **Software instability:** none. Software_Instability: "Software Instability is Connor's exclusive feature … the other two protagonists [[Kara]] and [[Markus]] do not have it as a measured stat."
- **Probabilities / risk:** none. No action can fail; the chapter has one outcome.
- **Timers:** none with a stated figure. Wiki: "After some time Carl may turn off the tv if you haven't interacted with anything yet." Transcript: "(After some time) Carl: Television: off. Mankind is so depressing… Nothing but greed, stupidity and violence… 5,000 years of civilization just to get to where we are…"
- **Figures stated in the chapter's text (flavour only):**
  - Start time "09:58AM".
  - Markus's report: "It's 10 AM". Wiki Attention to Detail: "his daily report will state 10am, rather than just a few minutes from the time shown during the chapter intro".
  - Weather: "partly cloudy, 54°", "80% humidity".
  - Order "#847 at Bellini Paints".
  - Gallery director "left four messages".
  - "CHECKMATE IN 3 MOVES FOR SILVER".
  - Each heart painting is made in "ten" strokes (transcript: "Markus strokes the canvas ten times").
  - Magazines: #2 (Century) and #27 (Detroit Today) of the 46 counted toward BOOKWORM.

## 4. Cross-chapter dependencies

**Into this chapter**

- **Shades of Color → CARL NOTICES MARKUS' CLOTHES.** The Shades_of_Color "Cross-chapter impacts" section says: "Protestors harass Markus — Carl notices the damage to Markus' shirt in [[The Painter]]". The Painter flowchart says: "Carl notices Markus' clothes - happens if Markus encounters the protestors in [[Shades of Color]]". Transcript lines, harassed variant:
  - Carl: "Hey. What happened to your clothes?"
  - Markus: "Oh it's nothing… Just some demonstrators in the street, Carl…"
  - Carl: "What a bunch of idiots… They think they can stop progress by roughing up a few androids? I hope they didn't harm you…"
  - Markus: "They just pushed me around, Carl. I'm fine."

  The mirror text also changes ("torn shirt" or "unscathed shirt"). Unused content: "If Markus got attacked by the protesters … Markus could reassure Carl or directly explain what happened". That dialogue choice was cut, so no choice exists here.
- No other earlier choice by any character changes this chapter.

**Out of this chapter**

- **Night of the Soul ("Welcome Home" branch, which needs Carl alive, i.e. Markus pushed Leo in Broken):**
  - The Painter "Cross-chapter impacts":
    - "Markus plays piano — If Carl is alive, Markus can play the piano in [[Night of the Soul]]"
    - "Markus reads a book — If Carl is alive, Markus can browse books in [[Night of the Soul]]"
    - "Markus plays chess — If Carl is alive, Markus can look at the chessboard in [[Night of the Soul]]"
    - "Markus' paintings — If Carl is alive, Markus' paintings will appear in the studio in [[Night of the Soul]]."
  - Night_of_the_Soul flowchart: "Browse Books - only available if [[Markus]] chose to read a book in [[The Painter]]"; "Play Piano - only available if [[Markus]] chose to play the piano in The Painter"; "Look at the Chessboard - only available if Markus chose to play chess in The Painter"; "Look at Your Painting".
  - The benchmark therefore needs to record two things: the activity (chess / book / piano / none), and the painting (heart theme and sub-choice, and arguably the copy subject).
- **Broken: no carried-forward stat.** No wiki line says any Painter choice changes Broken: the Broken page has no cross-chapter impact from The Painter, and no Carl relationship stat exists (section 3). The carry-over is narrative only: Leo's introduction and his grievance, "You'd rather take care of your plastic toy here than your own son" and "This thing is not your son. IT'S A FUCKING MACHINE!" Carl_Manfred says of Broken: "Leo has broken into Carl's studio to steal artwork". The wiki does not say that Markus's own painting is among the stolen works.
- **Magazines:** reading them unlocks Extras entries and counts toward the BOOKWORM trophy (Magazine page: "unlocked when all 46 magazines were collected"). No story effect.

## 5. Endings

| Chart label | Icon | Condition |
|---|---|---|
| `LEO INTRUDED TO ASK FOR MONEY` | none | Always reached. Wiki: "This chapter has only one outcome." The wiki flowchart prints it as the final bold-italic line: "[[Leo Manfred\|Leo]] intruded to ask for money". |

Ending content, from the transcript:

1. Leo asks for cash.
2. Carl asks, "What happened to the money I just gave you?", then says "you're on it again, aren't you?" and "Sorry... the answer's no."
3. Leo replies with the "plastic toy" / "IT'S A FUCKING MACHINE!" lines and "Leo shoves Markus pretty violently".
4. Carl shouts, "Leo, that's enough! … ENOUGH!"
5. Leo says, "You don't care about anything except yourself and your goddamn paintings… You never loved me." He storms out, and Carl sighs.

Nobody orders Markus out of the room.

## 6. Media

| Chart node | Publication / item | Wiki facts | Public opinion |
|---|---|---|---|
| READ "NORTH POLE RUSSIA" | Century, "The North Pole - Why Russia Wants It" (Magazine list #2; issue "Winter") | Cover lines: "Frozen treasures", "Bonus culture- why bankers pay themselves so much", "Is [[President Warren]] too close to [[CyberLife]]?". Story: "recent discovery of precious minerals trapped in the frozen ice, many of which are used in synthesizing [[Thirium]]"; "surplus Thirium reserves would allow either nation to experiment in more advanced android models, enhancing their military and industrial output tremendously"; the region "connects Russia with Europe through Norway and Denmark (Greenland), as well as [[Canada]]"; NATO: "A conflict would benefit nobody"; Warren: "It's simple. Russia has no business in the Arctic. If the Kremlin doesn't understand that, we will make them understand." | None stated |
| READ "LIFE ON TITAN" | Detroit Today, "Life Found on Titan!" (Magazine list #27) | Cover lines: "Evidence for alien life grows", "[[President Warren]] to make state visit to United Kingdom", "NATO Security Council divided over Arctic dispute". Story: "The Darwin probe, which left exactly nineteen years ago … has just confirmed the presence of microorganisms living hundreds of kilometers below the surface, in an ocean of salt water"; similar matter found on Enceladus; NASA: "our [[android]] expedition to IO [sic] is one among many such voyages"; Jason Graff, CyberLife Director of Humanization: "Our space-faring androids are specially designed to function on long-range missions of this kind". | None stated |
| (not a chart node) Watch The News | CTN TV, Michael Brinkley | "Tensions continue to rise in the Arctic since Russia unilaterally declared the region part of its national territory. Several Russian warships have taken position in the Barents Sea since Saturday and a Russian flag now flies over the ice field … Several American destroyers are reported to be headed for the Barents Sea. Douglas Cornwell, Chairman of the UN, announced … that we have never been so close to a Third World War." The report then cuts to sports (Chicago Bears). Afterwards Carl may say "Television: off. Mankind is so depressing…" | None stated |

Location: both magazine pages say "downstairs on the living room table in front of the television". The wiki chapter flowchart says "in the dining room". PowerPyx says "On the table in front of the TV sits a magazine. It has two topics", treating both articles as one physical magazine that counts as two collectibles. The transcript menu shows them as two tabs of a single "Read Magazine" interaction, with NEXT/PREVIOUS between them.

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.3.5) has two chapter-5 scenes, in order `… K01b, R05, M01, R06 …`.

**R05 "Breakfast news at {{Carl}}'s" (media)**

- **Covers:** READ "NORTH POLE RUSSIA", READ "LIFE ON TITAN" and the off-chart TV report.
- **Mislabelled title:** "Century: Why Russia Wants the North Pole" should be "Century: The North Pole - Why Russia Wants It" (chart: NORTH POLE RUSSIA). "Life Found on Titan" is missing the "!".
- **Wrong timing:** the situation says "While you prepare {{Carl}}'s breakfast he asks for the news channel". In game the magazine is available from arrival, before Carl is woken. The TV comes on only after breakfast is served ("Carl: Television."), while Markus is told to find something to do.
- **Titan fact** says "{{CyberLife}} is building androids for long-range space missions". The source says the androids "are specially designed to function on long-range missions"; also missing is the Io expedition.
- **adaptationNote** says "Watching certain news reports about android incidents lowers public opinion". That is generic and does not apply to this chapter (section 3). It should say there is no effect, to avoid implying one.
- **Missing:** ACTIVATE BIRDS. It is a side node with no effect; it could be omitted, but the omission should be noted.

**M01 "Painting from the heart" (decision)**

- **Covers** only PAINT FROM THE THE HEART → ANDROIDS / HUMANITY / IDENTITY.
- **Missing chart nodes:**
  - DROP OFF PACKAGE, WAKE CARL, SERVE BREAKFAST: path nodes, could be one event scene.
  - CARL NOTICES MARKUS' CLOTHES: conditional on `shirtTorn`. The engine already sets `s.shirtTorn` in M00 (story-engine.mjs line 184), but no chapter-5 scene reads it. It needs a `situationWhen` or an event.
  - FIND SOMETHING TO DO: decision PLAY CHESS / READ BOOK / PLAY PIANO.
  - Chess WIN / LOSE / DRAW; book THE REPUBLIC BY PLATO / TRAGEDIES OF WILLIAM SHAKESPEARE / ODES BY JOHN KEATS; piano MELANCHOLIC / HOPEFUL / INTIMATE / ENIGMATIC. These are three decision scenes gated on the activity.
  - TAKE CARL TO THE STUDIO: path.
  - PAINT SOMETHING YOU SEE: decision COPY CARL'S PAINTING / COPY DESK / COPY STATUE.
  - The four sub-choices under each heart theme. These are three decision scenes gated on the theme, 12 options in all.
  - LEO INTRUDED TO ASK FOR MONEY: currently folded into M01's outcomes. It should be the chapter's ending event.
- **Incorrect situation:** the scene says Carl "asks you to paint something of your own, not a copy". In game Markus first paints a copy (PAINT SOMETHING YOU SEE). Carl then says it is "a perfect copy, of reality. But painting is not about replicating the world…" and only after that asks him to close his eyes.
- **Invented outcomes:**
  - "androids reaching for something beyond themselves", "humanity as he sees it" and "a figure searching for its own face" do not match any of the 12 game paintings listed in section 2.
  - "{{Carl}} is moved and says it is unlike anything he has seen" is also invented; the game line is "Oh my God…".
  - "{{Carl}} orders {{Markus}} out of the room while they argue" is not in the game. Leo shoves Markus, Carl shouts "ENOUGH!", and Leo storms out.
- **adaptationNote** "Expressive choice with no mechanical effect" is correct for this chapter. But the choice does have a cross-chapter effect: the painting appears in Night of the Soul if Carl is alive. It should be stored in state (e.g. `markusPainting`).
- **Missing state for Night of the Soul:** the activity (chess / book / piano) gates three interactions in Night of the Soul (section 4). M26a ("{{Carl}}", chapter 31) currently has no use for it, but the state should be recorded now.

**Extra:** none. Neither scene covers anything that is absent from the chart, apart from the off-chart TV broadcast inside R05, which is legitimate media.

**Off-chart choices the rebuild should not add as nodes** (they are not on the chart): the verdict on Carl's painting (LIKE / DON'T LIKE / NO OPINION), the chess follow-ups (JUSTIFY / SORRY, LIE / TRUTH), piano tempo, clean studio or wait, and breakfast before or after waking Carl. Their dialogue can be folded into outcome text.

## 8. Open questions

1. **"Do nothing" path.** The wiki says "Markus can just do nothing", and the transcript has a "Don't Find Something To Do" branch where Carl just finishes breakfast. The chart draws no line from FIND SOMETHING TO DO to TAKE CARL TO THE STUDIO that bypasses the activity group. Does skipping all three activities still reach TAKE CARL TO THE STUDIO, and does the chart then show no activity node? This decides whether the activity scene needs a fourth "do nothing" option.
2. **Legend icons.** Confirm with SHOW LEGEND that the triangle on CARL NOTICES MARKUS' CLOTHES means "consequence of an earlier chapter", and what the bracketed bar icon on the side group means.
3. **Book title.** The chart prints TRAGEDIES OF WILLIAM SHAKESPEARE; the transcript and wiki Description say the book is *Macbeth*. Confirm the on-screen option label in game.
4. **Piano themes.** The wiki Notes say "Hopeful" is "the opening theme of the game"; the transcript says "Kara's opening theme". Both sources agree that "Intimate" is Kara's theme ("Little One"). Flavour only.
5. **PowerPyx vs transcript on chess.** PowerPyx: "If you win at chess or have a draw he is covinced you let him win on purpose." The transcript gives different lines: WIN gets "That's what I call a thorough beating…" and only LOSE gets "are you just taking pity on an old man?". Check in game.
6. **Which painting appears in Night of the Soul.** Is it only the heart painting, or also the copy? The wiki says "Markus' paintings" (plural) and the flowchart node is "Look at Your Painting".
7. **Magazine location.** The wiki chapter flowchart says "in the dining room"; the magazine pages and PowerPyx say the living room table in front of the TV. It is also unclear whether it can still be read after breakfast; the transcript offers it again in the find-something-to-do phase.
8. **Choice prompt labels.** The in-game copy prompt reads PAINT CARL'S PAINTING / PAINT STATUE / PAINT DESK (transcript), while the chart uses COPY …. Check the on-screen text and on-screen order: the chart order is COPY CARL'S PAINTING, COPY DESK, COPY STATUE, but the transcript order is painting, statue, desk. The heart sub-choices on the chart appear alphabetical; confirm their on-screen order.

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/: index; gave the chapter link.
- https://www.powerpyx.com/detroit-become-human-the-painter-walkthrough-100/: walkthrough text (gating of CARL NOTICES MARKUS' CLOTHES, one activity per run, sub-choices complete together, magazine location, dialogue notes).
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-painter-1.jpg: full chart overview, 100% COMPLETED; node order and grouping.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-painter-2.jpg: ARRIVING HOME through FIND SOMETHING TO DO; side group, triangle icon on CARL NOTICES MARKUS' CLOTHES.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-painter-3.jpg: activity group and the chess, book and piano sub-groups, TAKE CARL TO THE STUDIO.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-painter-4.jpg: PAINT SOMETHING YOU SEE through the ending; "PAINT FROM THE THE HEART" misprint; ending node without icon.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-wallpaper.jpg: site banner, not a chart (checked, ignored).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Painter&prop=wikitext&format=json: chapter page (saved as `/tmp/flowcharts/ch05/wiki.txt`; revision 47057, 2026-09-22): infobox, Flowchart, Cross-chapter impacts, Description, Notes, Unused Content.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Painter_(Transcript)&prop=wikitext&format=json: full transcript; all dialogue, off-chart choices, painting descriptions, TV report text.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json: confirms Markus's tracked relationships are Jericho, North, Josh and Simon only (no Carl).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json: no Painter entry.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json: Connor-only stat.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json: magazine list numbers #2 and #27, BOOKWORM total of 46.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_North_Pole_-_Why_Russia_Wants_It&prop=wikitext&format=json: article text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Life_Found_on_Titan!&prop=wikitext&format=json: article text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Shades_of_Color&prop=wikitext&format=json: cross-chapter line "Protestors harass Markus → Carl notices the damage to Markus' shirt in The Painter".
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Broken&prop=wikitext&format=json: no dependency on The Painter.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json: Browse Books, Play Piano and Look at the Chessboard gated on the Painter activity; Look at Your Painting.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl_Manfred&prop=wikitext&format=json: Carl's role in the chapter and in Broken; painting dedicated to Markus in Night of the Soul.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Leo_Manfred&prop=wikitext&format=json: Leo's scene in The Painter.

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/5-painter-chapter-content/painter-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt-scripts/render.py` (Python, run with `-I`; resolves every `t()` and `translateObject()` key against `en.json`). Outline saved to `/tmp/dbt/ch05.txt`; the same with every dialogue line to `/tmp/dbt/ch05-full.txt`. All keys resolved.
- Counts: 6 prompts (choice groups), 14 options, 0 clues (observation items), 0 stat arrows, 3 unlock conditions, 8 conditioned variants, 7 cut/unused blocks.

Outline key: `PROMPT` is an `app-choice-group`; `OPTION "LABEL"` its `app-choice-item` (brackets `[ ]` as the game draws unlockable options; `TIMEOUT default` marks the option taken when the timer runs out); `ARROW` an `app-relation` (character, small/LARGE, UP/DOWN); `CLUE GROUP` / `CLUE` an `app-observation` and its items (title | sublines); `[LOCK: …]`, `[TIME: …]`, `[TV: …]`, `[DEATH: …]` an `app-unlock-condition` with the transcribers' condition text; `IF …:` one branch of an `app-condition-group`; `CUT/UNUSED >>> … <<<` an `app-unused-content` block (not to be built); `NOTE` the transcribers' own note; `(no effect)` the template's "ø". Dialogue outside prompts is shortened to the first line of each paragraph with a count of the rest; under each option the first line is shown.

### Rendered outline

```text
# At Carl's house
Alarm: "Alarm deactivated. Welcome home, Markus."
## Going to see Carl
Markus: "Good morning, Carl." (+9 more lines)
CUT/UNUSED >>>
  Markus: "Our morning routine."
<<< end cut
Carl: "Humans are such a fragile machine…They break down so quickly… All this effort to keep 'em..."
CONDITION GROUP:
  IF Markus ran into the protesters in Shades of Color:
    Carl: "What happened to your clothes?" (+1 more lines)
    CUT/UNUSED >>>
      PROMPT: [CUT]
        - OPTION "FACTUAL"
          Markus: "I was assaulted by two protesters on my way back. A policeman intervened."
        - OPTION "REASSURING"
          Markus: "Oh, it's nothing… Just some demonstrators in the street, Carl…"
    <<< end cut
    Carl: "What a bunch of idiots… They think they can stop progress by roughing up a few androids? I..." (+1 more lines)
Markus: "Okay. I'll take you to the bathroom now."
## On the way downstairs
Carl: "Anything special on the agenda today?" (+8 more lines)
CONDITION GROUP:
  IF Going without Carl:
    Carl: "Markus, I'm waiting…" (+1 more lines)
    Carl: "So... shall we go?"
    Carl: "Markus, what exactly are you doing? You don't seem yourself this morning." (+1 more lines)
###  [TIME: Take too much time]
Carl: "Markus, have you forgotten where the living room is?"
## In the living room
Carl: "I'm starving." (+3 more lines)
###  [TIME: Take too much time]
Carl: "I would like to have my breakfast before noon, if you don't mind."
## Served breakfast
Carl: "Thank you, Markus. Television."
Carl: "Why don’t you find something to do while I finish my breakfast?" (+1 more lines)
###  [TV: Watch TV]
Michael Brinkley - CTN TV: "Tensions continue to rise in the Arctic since Russia unilaterally declared the region part..." (+1 more lines)
## Find something to do
CONDITION GROUP:
  IF READ BOOK:
    Carl: "What are you reading?"
    CONDITION GROUP:
      IF Shakespeare:
        Markus: "Uh, Macbeth! It's one of the books you recommended." (+3 more lines)
      IF Plato:
        Markus: "Plato's Republic. It's one of the books you recommended." (+3 more lines)
      IF Keats' Odes:
        Markus: "Oh, Keats' Odes. It's one of the books you recommended." (+3 more lines)
  IF PLAY PIANO:
    Carl: "Something has changed in the way you play… Sometimes I think you have more humanity than m..."
  IF PLAY CHESS:
    Carl: "Fancy a game of chess?" (+3 more lines)
    PROMPT:
      - OPTION "WIN"
        Carl: "That's what I call a thorough beating… It's not easy for an old man to compete with a machine."
        PROMPT:
          - OPTION "JUSTIFY"
            Markus: "Well, I know you don't like losing and you don't like when I let you win. So I felt I… didn't have many choice..."
          - OPTION "SORRY"
            Markus: "My apologies, Carl. I thought, I shou-"
      - OPTION "LOSE"
        Carl: "Now, it's just a little bit too easy… Are your circuits rusty? Or are you just taking pity on an old man?"
        PROMPT:
          - OPTION "LIE"
            Markus: "Neither, Carl. You just played better!"
          - OPTION "TRUTH"
            Markus: "Well, I thought… You'd enjoy winning."
      - OPTION "DRAW"
        Carl: "That is a very odd draw…"
        CUT/UNUSED >>>
          Carl: "Have I miraculously improved my game? Or you just sparing an old man's feelings?"
        <<< end cut
        PROMPT:
          - OPTION "LIE"
            Markus: "Well, maybe you just played better!"
          - OPTION "TRUTH"
            Markus: "Well, I know that you don't like to lose, but you don't like it when I let you win either.A draw feels like an..."
            CUT/UNUSED >>>
              Carl: "It's sounds like you have a good grasp of human psychology."
            <<< end cut
Carl: "One day, I won't be here to take care of you anymore. You'll have to protect yourself, and..."
# In the studio
CUT/UNUSED >>>
  Carl: "It's time to get back to work… Hook me up to the chair lift."
<<< end cut
Carl: "Let’s see where we left off…Remove the sheet!"
## Carl finished the painting
Carl: "So... What's your verdict, Markus?"
PROMPT:
  - OPTION "LIKE"
    Markus: "Yes, there is something about it."
    CUT/UNUSED >>>
      Markus: "Yes, there is something about it, isn't there?Something I can't define.Yes, I think, I…I think I like it."
    <<< end cut
  - OPTION "DON'T LIKE"
    Markus: "I'm not a very good judge, I…I don't think it's your best work…"
  - OPTION "NO OPINION"
    Markus: "I'm not programmed to criticize art, I- You would be a much better judge than I would."
    CUT/UNUSED >>>
      Markus: "Honestly Carl, I'm not programmed to criticize art, I- You are a much better judge than I am."
    <<< end cut
Carl: "The truth is I have nothing left to say anymore…Each day that goes by brings me closer to..." (+4 more lines)
## Copied object
Carl: "That is a perfect copy,of reality.But painting is not about replicating the world, it's ab..." (+2 more lines)
## Finish own painting
Carl: "Oh my God…" (+17 more lines)

```

### Flowchart labels as the game prints them

`MENU.FLOWCHART.01MB` (47 keys): ARRIVING HOME, DROP OFF PACKAGE, ACTIVATE BIRDS, WAKE CARL, CARL NOTICES MARKUS' CLOTHES, SERVE BREAKFAST, FIND SOMETHING TO DO, PLAY CHESS, READ BOOK, ODES BY JOHN KEATS, TRAGEDIES OF WILLIAM SHAKESPEARE, THE REPUBLIC BY PLATO, PLAY PIANO, CHANGE NIGHT OF THE SOUL MUSIC THEME, TAKE CARL TO THE STUDIO, PAINT SOMETHING YOU SEE, COPY CARL'S PAINTING, COPY DESK, COPY STATUE, PAINT FROM THE HEART, LEO INTRUDED TO ASK FOR MONEY, CARL, MARKUS, ANDROIDS, EMOTIONS, ANGER, HOPE, SADNESS, FUTURE, FATE, PAIN, COMFORT, EMPATHY, DESPAIR, DOUBTS, PRISONER, HUMANITY, IDENTITY, WIN, DRAW, LOSE, MELANCHOLIC, ENIGMATIC, HOPEFUL, INTIMATE, READ "NORTH POLE RUSSIA", READ "LIFE ON TITAN". The piano labels sit under keys MOURNFUL = MELANCHOLIC, MELANCHOLY = HOPEFUL, UPLIFTING = INTIMATE, INTIMATE = ENIGMATIC. Not on the chart: CHANGE NIGHT OF THE SOUL MUSIC THEME, CARL, MARKUS, EMOTIONS, FUTURE (cut or unused theme labels; do not build).

### Template against sections 1 to 3

The template has 6 prompts, one of them cut (the clothes reply), so 5 live prompts: chess WIN / LOSE / DRAW; after WIN, JUSTIFY / SORRY; after LOSE, LIE / TRUTH; after DRAW, LIE / TRUTH; Carl's painting, LIKE / DON'T LIKE / NO OPINION. All match section 2. No arrows, as section 3 says. The book and piano picks, the copy subject and the heart theme are not template prompts (the template renders the book choice as three conditioned variants and the piano as one line).

| # | Topic | Template / string table | Note | Which wins |
|---|---|---|---|---|
| T1 | Heart node label | "PAINT FROM THE HEART" (`MENU.FLOWCHART.01MB.HEART`) | `PAINT FROM THE THE HEART`, "The word "THE" is doubled on the chart" | String table: the doubled word is a misreading of the wrapped label |
| T2 | Labels in the table but not on the chart | CHANGE NIGHT OF THE SOUL MUSIC THEME, CARL, MARKUS, EMOTIONS, FUTURE | Not mentioned; section 1 counts 44 nodes | Record as cut; do not build |
| T3 | Cut lines | Marked unused: Markus "Our morning routine."; after DRAW, Carl "Have I miraculously improved my game? Or you just sparing an old man's feelings?"; after DRAW, TRUTH, Carl "It's sounds like you have a good grasp of human psychology."; studio, Carl "It's time to get back to work… Hook me up to the chair lift."; longer alternates of LIKE and NO OPINION | Not marked | Template: these lines are not built |

Not in the note but shipped (template): JUSTIFY gets Carl "True. We humans are complicated."; SORRY gets "Don't apologize, you did the right thing. I prefer humiliation to pity."; the clothes exchange plays Markus "Oh, it's nothing… Just some demonstrators in the street, Carl…", Carl "What a bunch of idiots… They think they can stop progress by roughing up a few androids? I hope they didn't harm you…", Markus "Oh, no, no... They just pushed me around, Carl. I'm fine." (the FACTUAL / REASSURING prompt around it is cut, as section 4 says).

Discrepancies with the note: 3 (T1 to T3).

### Template against the benchmark scenes (not yet rebuilt: `R05`, `M01`)

| # | Template has | Benchmark | Fix |
|---|---|---|---|
| B1 | Chess PROMPT WIN / LOSE / DRAW and its three follow-ups (JUSTIFY / SORRY; LIE / TRUTH; LIE / TRUTH) | Missing (no activity scene at all) | Add the activity choice (chart: PLAY CHESS / READ BOOK / PLAY PIANO) with the chess prompts |
| B2 | PROMPT LIKE / DON'T LIKE / NO OPINION on Carl's painting | Missing | Add (no effect) |
| B3 | Condition "Markus ran into the protesters in Shades of Color": Carl's clothes exchange | Missing; `shirtTorn` is never read | Add as a conditioned event line |
| B4 | TV unlock: CTN on the Arctic | `R05` has "the morning news"; its note claims news can lower public opinion | Drop the claim; the template has no arrow |
| B5 | (chart) copy subject and heart sub-choices | `M01` offers only ANDROIDS / HUMANITY / IDENTITY | Per section 7 of this note |

Discrepancies with the benchmark: 5.
