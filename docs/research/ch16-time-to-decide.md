# Chapter 16: Time to Decide (Markus)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshot and walkthrough text, the Fandom wiki chapter page (wikitext via the MediaWiki API, saved at `/tmp/flowcharts/ch16/wiki.txt`), the wiki's stat, character and next-chapter pages (saved under `/tmp/flowcharts/ch16/wikipages/`), and the fan transcript at detroitbecometext.github.io (chapter 16). I rendered the transcript's chapter template with its English game strings, including its relationship icons, to `/tmp/flowcharts/ch16/transcript.txt`. The flowchart image and crops are in `/tmp/flowcharts/ch16/` and were not committed. The wiki has no `Time_to_Decide/Flowchart` template and no `Time_to_Decide_(Transcript)` page; both return `missingtitle`.

Wiki infobox: `|date=November 6, 2038`, `|time=05:13PM`, `|player=[[Markus]]`, `|location=[[Jericho (location)|Jericho]]`, `|objectives=Settle in` / `* Explore Jericho`, `|endings=1`. The text says: "This chapter has only one outcome." The page is tagged `{{Stub}}`. Previous chapter: The Nest (Connor). Next: Zlatko (Kara). Markus's previous chapter is Jericho (14) and his next is Spare Parts (19). Chronology: "05:13 PM: Chapter "Time to Decide" begins. Markus meets Jericho androids." PowerPyx: "Triggers automatically after completing The Nest Chapter."

**Summary.**
- The chart has 10 nodes plus 1 bracketed phase label (`EXPLORE JERICHO`).
- It has 1 checkpoint (`INSIDE JERICHO`) and 1 ending (`MARKUS HATCHED A PLAN`, no icon).
- **The chart has no choice pair and no failure or death branch.** Five nodes are optional free-roam interactions inside the bracket. Three nodes are mandatory: `TALK TO LUCY`, `CHECK EMPTY CRATE` and `TALK TO SIMON`.
- Three dialogue choices sit off the chart: two at the opening encounter and one in North's conversation. Only North's `YOU` option has a stat effect.
- The raid proposal (`TALK TO SIMON`) is a fixed cutscene with no choice.
- No probabilities, timers, public-opinion or software-instability changes are published.
- Relationship changes are all small, all from the wiki and the transcript:
  - Josh +1 for talking to him.
  - North +1 for talking to her, −1 for `YOU`, and +1 at the Simon scene.
  - Simon +1 at the Simon scene.
  - Jericho +1 at the Simon scene (wiki only; see §8).
- The chapter has no magazine and no broadcast.

---

## 1. Flowchart transcription

### How the chart was read

- PowerPyx's walkthrough page has a single chart screenshot, `detroit-become-human-time-to-decide.jpg` (1920×1080, no EXIF). The page's other `wp-content/uploads` images are resized copies of it (`-300x169`, `-768x432`, `-1024x576`, `-178x100`), plus the site favicon, header and a wallpaper. The page was published 2018-05-28 and modified 2018-07-18.
- The whole chart fits on one screen, and every label is legible at full size. I cropped and enlarged the bracket (`crops/explore.png`) and the right half (`crops/right.png`) to confirm labels, icons and lines. Every label below was read from the image; none is inferred.
- Header: `100% COMPLETED` / `TIME TO DECIDE`. No world-stats panel and no relationship line is shown.
- Colour key, as in earlier notes:
  - Blue fill means the node was reached on PowerPyx's last save.
  - A grey box with a black arrow means the node is unlocked but was not on that save.
- On this chart, all five bracket nodes are grey and every node outside the bracket is blue. PowerPyx's last run therefore went straight to the main objectives.
- Icon key: [arrow] = an action the player takes. No dialogue, triangle, padlock, skull, no-entry, check, ✗ or trophy icon appears anywhere on the chart.

### A. Opening

| # | Label (as printed) | Icon | Edge |
|---|---|---|---|
| N1 | `INSIDE JERICHO` | checkpoint (large tile with an image of Markus facing Josh and Simon; caption `CHECKPOINT`) | > `EXPLORE JERICHO` bracket |

### B. Free roam: `EXPLORE JERICHO` bracket

`EXPLORE JERICHO` is printed in large blue type between square brackets, inside a grey frame with blue corner marks. It is a phase label, not a node. A connector rises from a dot above the label and feeds three nodes. A second connector drops from a dot below the label and feeds two more. No node inside the bracket links to another, so each is an independent optional activity.

| # | Label | Icon | Position |
|---|---|---|---|
| N2 | `TALK TO DYING ANDROID` | [arrow], grey | top connector, first |
| N3 | `TALK TO JOSH` | [arrow], grey | top connector, second |
| N4 | `TALK TO NORTH` | [arrow], grey | top connector, third |
| N5 | `TALK TO DAMAGED ANDROID` | [arrow], grey (printed on two lines: `TALK TO DAMAGED` / `ANDROID`) | bottom connector, first |
| N6 | `LET THERE BE LIGHT` | [arrow], grey | bottom connector, second |

### C. Main line and ending

The bracket has one exit on the right. That line forks into two parallel nodes, which rejoin into one.

| # | Label | Icon | Edge |
|---|---|---|---|
| N7 | `TALK TO LUCY` | [arrow], blue | bracket exit (upper fork) > N9 |
| N8 | `CHECK EMPTY CRATE` | [arrow], blue | bracket exit (lower fork) > N9 |
| N9 | `TALK TO SIMON` | [arrow], blue | N7 + N8 joined > N10 |
| N10 | **`MARKUS HATCHED A PLAN`** | ending (large tile with an image of Markus holding a flashlight in the hold; printed on two lines `MARKUS HATCHED A` / `PLAN`); no icon | ENDING |

**Totals:** 10 nodes and 1 phase label. The nodes are 1 checkpoint, 8 arrow action nodes (5 optional inside the bracket and 3 on the main line) and 1 ending. There is no choice group.

The fork from the bracket into N7 and N8 is drawn the way the game draws two parallel required tasks. It is not drawn as a choice group: there is no double-square bracket. Both lines rejoin before N9.
- PowerPyx treats both as required. Lucy is "marked as a main objective", and the crate is to be checked "Before talking to Simon".
- The wiki makes the crate the step that gives the warehouse location. See §2.

### The wiki's Flowchart list

```
;Inside Jericho (load checkpoint)
The things you can do to explore Jericho:

*Talk to [[Dying Android]]
*Talk to [[Josh]]
*Talk to [[North]]

*Talk to [[Damaged Android]]
*Let There Be Light (Light the oil drums)
**Check Empty Crate (Obtains a [[CyberLife Warehouse and Docks|location]] for parts)
**Talk to [[Lucy]]

;Talk to [[Simon]]
*'''''Markus Hatched a Plan'''''
```

The node names match the chart. The structure differs in two ways:
- The wiki nests Check Empty Crate and Talk to Lucy under Let There Be Light. On the chart they sit outside the bracket, as the two forks of its exit.
- The wiki lists the crate before Lucy. The chart puts Lucy on the upper fork.

The chart wins. The nesting is probably an artefact of the wiki's bullet list, since nothing suggests that lighting the drums gates Lucy or the crate. PowerPyx's own walkthrough order is Dying Android, Josh, North, Damaged Android, Let There Be Light, Lucy, Check Empty Crate, Talk to Simon.

### Interactions not on the chart (transcript, wiki and PowerPyx)

The dialogue is from the detroitbecometext transcript (`16-time-to-decide-chapter-content`). Its English strings were rendered to `/tmp/flowcharts/ch16/transcript.txt`, and the speaker names are the transcript's own.

**Opening encounter, under `INSIDE JERICHO`** (transcript section "In Jericho", `NOV 6TH, 2038` / `PM 05:13`). The Jericho chapter's transcript ends with Simon: "Welcome to Jericho." This chapter opens on the reply:
- Markus: "Who are you?" Josh: "Fugitives… / just like you... / My name is Josh." Simon: "I'm Simon." North: "North."
- **Dialogue choice T1** (string group `X0503M.JERICHO.ENCOUNTER.PC.CHOICE01`), five options:
  - `TRAIL`. Markus: "And you knew that only an android could follow the trail, didn't you?" Josh: "Only those who are like us can find Jericho…" Simon: "If you could decipher the signs, it's because one of us trusted you enough to give you the key."
  - `ANDROID`. Markus: "How many are you?" North: "There are nineteen of us still in working order... / The rest were damaged escaping their masters..." Josh: "Many tried to reach Jericho... / Few succeed... / Humans have little pity for our kind…"
  - `JERICHO`. Markus: "This is Jericho?" Josh: "It's a refuge for those who don't want to be slaves anymore..."
  - `REFUGE`. Markus: "I don't understand… I thought Jericho was a place where androids lived in freedom..." Josh: "We do live in freedom… / It may not be what you hoped for, but here we have no master. / We don't belong to anybody."
  - `FREE?`. Markus: "And hiding just to stay alive… That's freedom to you?" Josh: "Humans hate us. / Hiding is the only way we can survive." North: "There is no safe place for those like us. / If humans knew we're here, they'd kill us."
- After T1, Josh: "I understand how you feel... / but we have more freedom here than you ever did."
- **Dialogue choice T2** (`CHOICE02`), four options:
  - `LOST`: "I came to Jericho looking for hope... / Looks like I'm not gonna find any here…"
  - `SOMBER`: "Maybe I was never really free... / Maybe I was only what my master wanted me to be... / And now / I need to decide who I really am..."
  - `LUCID`: "Humans were your masters, and now it's fear that rules you… / You're no freer than you ever were… / You've only found a new master."
  - `DIRECT`: "Waiting in the dark for something to happen? / That's not how I see freedom."
- Every branch closes the same way. Simon: "You're lost… / Just like the rest of us… / We didn't ask for this. / All we can do now / is deal with it." Josh: "You're safe here. / You can stay with us as long as you want." North: "Go and see Lucy. / She may be able to help you."
- The transcript shows no relationship icon in T1 or T2.
- The string keys are `X0503M` (the Jericho chapter's script prefix), while the rest of this chapter uses `X0601M`. Phileas's wiki page says: "He may appear in a flashback if Markus mentions the trail in [[Jericho/Flowchart|Jericho]]." See §8 on which chapter the encounter belongs to.

**`TALK TO DYING ANDROID` (N2).** The transcript calls this "Talk with damaged android (near fire)", and the wiki page is Dying_Android.
- Android: "I've heard humans are afraid of dying too… / Do you know what happens after death?" Markus: "No… / No, I don't…" Android: "Well, I'm about to find out… / What's your name?" Markus: "Markus." Android: "I was glad to meet you, Markus."
- Wiki: "She then dies after the conversation." Her infobox status is `Deceased`. PowerPyx: "Talk to her and she will shut down, after saying she was glad to have met you."
- There is no choice and no stat change.

**`TALK TO JOSH` (N3).** Josh is watching over an android child (Young_Boy_Android: "his parents (owners) had abandoned and discarded him").
- Transcript, with `{REL Josh SmallUp}` at the start of the section. Josh: "They threw him out when they didn't want him anymore... / He was living on the streets before we brought him here..." Markus: "They'll all shut down if we don't find a way to help them…" Josh: "To help them we need blue blood and biocomponents. / We salvage what we can from those who shut down… / But there's never enough…" Markus: "So… How do they survive?" Josh: "They won't. / We're slowly dying out…"
- There is no choice.

**`TALK TO NORTH` (N4).** North "sits on a box and bounces a ball against a wall" (PowerPyx). The transcript puts `{REL North SmallUp}` at the start of the section. Then comes **dialogue choice T3**, five options:
- `TIME HERE?`. Markus: "How long have you been here?" North: "4 weeks, 3 days, 11 hours. / When I escaped there was nowhere else to go. / Jericho seemed as good a place as any…"
- `WOUNDED`. Markus: "A lot of these guys're in pretty bad shape…" North: "That's how the humans treat those who disobey… / They despise us. / They'll never accept what we are…"
- `JERICHO`. Markus: "Who found this place?" North: "Nobody knows anymore… / Whoever he was, his body's probably laying somewhere on this boat…"
- `YOU`, marked `{REL North SmallDown}`. Markus: "What was your function before coming here?" North: "What do you care?"
- `SPARE PARTS`. Markus: "Well these guys need spare parts and blue blood. Why hasn't anybody gone to get that?" North: "It's not that simple. / Can't just go shopping at a CyberLife store. / Anyway, nobody wants to risk leaving Jericho…"
- After T3, North: "If you came here for comfort, you came to the wrong place."

**`TALK TO DAMAGED ANDROID` (N5).** The transcript calls this "Talk with damaged android (sitting)".
- Android: "I'm not in very good shape, am I?.. / My diagnostic program isn't working... / I don't think it would have anything good to say anyway…" Markus: "What happened to you?" Android: "They tied me to the back of a car... / I think they wanted to have fun... / I don't wanna shut down... / No, I... / I don't wanna shut down..."
- Wiki: "Unlike the Dying Android, despite being damaged, he never explicitly dies on screen." His status is `Alive`.
- There is no choice and no stat change.

**`LET THERE BE LIGHT` (N6).** Markus lights oil drums in the hold.
- Wiki Notes: "There are four oil drums Markus can light in the hold." and "Androids will congregate around the lit oil drums, despite not needing any warmth."
- PowerPyx: "Make a fire in all the barrels." A PowerPyx comment: "there are 4x barrels in total to light-up for the "Let There Be Light" flowchart unlock."
- There is no dialogue and no stat change.

**`TALK TO LUCY` (N7).**
- Wiki Notes: Lucy is heard "humming the chords of "Hold On", an old gospel hymn. She doesn't stop until Markus goes to see her".
- Transcript. Markus: "Are you Lucy?" Lucy: "Sit down." "Show me…" "I'll stop the bleeding." "Drink this." "Give me your hand." "You had it all / and you lost it all... / You've seen hell and now hell lives in you... / Your heart is troubled… / A part of shadow and a part of light... / Which will prevail? / Your choices will shape our destiny."
- Two lines are marked unused: "You've lost a lot of blood…" and "It's left over from one of our own."
- PowerPyx: "She will heal Markus's wounds and give him some blue blood to drink." The wiki's Unused Content: "Files suggest that Markus' injury on his abdomen was avoidable."
- There is no choice and no stat change.

**`CHECK EMPTY CRATE` (N8).**
- Wiki: "Check Empty Crate (Obtains a location for parts)". Markus: "Markus will discover an empty shipping container and secures a route to a local Cyberlife warehouse to find more parts."
- PowerPyx: "check the crates by the wall. This also completes the main objective "Explore Jericho". Markus now has the idea to get more spare parts to make the androids of Jericho stronger."
- There is no dialogue in the transcript and no stat change.

**`TALK TO SIMON` (N9).** The transcript calls this "Finished exploring - Talk with Simon". It is the raid proposal, a fixed exchange with no choice:
- Markus: "Simon! / I know where we can find spare parts... / The CyberLife warehouses in Detroit Harbor, they have everything we need."
- Simon: "The docks are guarded. / We can't just walk in there and take what we want... / Humans will never let us…"
- Markus: "Which is why we won't ask permission."
- Josh: "We don't have any weapons… / and even if we did, none of us knows how to fight."
- Markus: "We can steal what we need without fighting." Josh: "We'll just get ourselves killed." Markus: "Maybe, / but it's better than waiting here to be shut down."
- North: "I'm with you." Simon: "Maybe it's worth a try..." Josh: "Ok… / I'm in."
- The scene ends `{REL North SmallUp}` `{REL Simon SmallUp}`.
- Wiki, Simon: "when North agrees to come with Markus, Simon says "Maybe it's worth a try...", looking at Josh to persuade him too."

**Unused content (wiki), not in the shipped game:**
- residents in their own rooms;
- animal androids;
- residents on the balconies;
- the Damaged Android mentioning "a few hours left to live";
- Lucy, rather than Josh, explaining the boy's background;
- an unoccupied bedroom to search for medical equipment;
- four androids lounging in a camping room;
- "This chapter was initially meant to play after Zlatko instead of before."

---

## 2. Choices and gates

**There is no decision on the chart.** No node is a choice group, and every route reaches `MARKUS HATCHED A PLAN`. The player's only freedoms are which optional nodes to visit and three dialogue choices that are not on the chart (T1 to T3).

**Optional nodes N2 to N6.** No requirement is stated for any of them; each is available as soon as `INSIDE JERICHO` starts.
- They are not mutually exclusive. A 100% chart has all five, and PowerPyx visits all five in one run.
- Only `TALK TO JOSH` and `TALK TO NORTH` change a stat. See §3.
- No source says whether they close once the player talks to Simon, or once the crate or Lucy is done. Since `TALK TO SIMON` ends the chapter ("This results in your main task "Markus Hatched a Plan" being finished and concludes the 'Time to Decide' Chapter"), anything not done by then is missed.

**Mandatory nodes N7 and N8.**
- `TALK TO LUCY`: PowerPyx says "Lucy is the "leader" marked as a main objective". North's closing line in the encounter, "Go and see Lucy", points the player to her.
- `CHECK EMPTY CRATE` completes "Explore Jericho" (PowerPyx) and gives the location (wiki). Both lines must join before `TALK TO SIMON`.
- No source says whether they can be done in either order. The chart draws them as parallel. See §8.

**Mandatory node N9, `TALK TO SIMON`.** It needs N7 and N8. The raid proposal is fixed: Markus proposes, Simon and Josh object, North agrees, then Simon and Josh agree. **The player cannot decline the raid, and cannot choose how to argue for it.**

**T1, the opening encounter (5 options: TRAIL / ANDROID / JERICHO / REFUGE / FREE?).** It has no requirement and no stat effect. Every option reaches the same Josh line. The transcript lists them as a single choice group, so presumably only one is picked; see §8. Phileas's wiki page links `TRAIL` to a flashback.

**T2, Markus's reaction (4 options: LOST / SOMBER / LUCID / DIRECT).** It has no requirement and no stat effect. Every option is followed by the same Simon, Josh and North lines.

**T3, North's topic (5 options: TIME HERE? / WOUNDED / JERICHO / YOU / SPARE PARTS).**
- It has no requirement. `YOU` lowers North. The others have no effect.
- The transcript shows a single choice group followed by one closing line, which suggests one topic per conversation; see §8.
- PowerPyx: "During the talk do not choose the option YOU. She doesn't want to talk about her past and it will decrease reputation with her."
- North: "If Markus asks her about her past, she will immediately close up… This will also result in Markus' relationship with North decreasing."

**Summary.**
- The chart has 0 decisions.
- There are 3 dialogue choices off the chart; 1 of them (T3 `YOU`) has a consequence.
- 2 optional visits have a consequence: `TALK TO JOSH` and `TALK TO NORTH`.
- There are no execution checks (QTEs that can fail), no timers and no difficulty-dependent branches.
- From a benchmark point of view, the chapter's only consequential choices are:
  - (a) whether Markus talks to Josh;
  - (b) whether he talks to North;
  - (c) whether he asks North about her past.

---

## 3. Numbers

- **Probabilities:** none. The wiki page has no Probability table, and nothing in the chapter can fail.
- **Timers:** none. The transcript has no `UnlockType.Time` branch in this chapter.
- **Relationships.** These are from the wiki chapter page's "Relationship Changes" section, checked against the wiki's Relationship_Stat page and the transcript's icons. All are small (`{{Icon|up}}` / `{{Icon|down}}`); none is large.

| Stat | Trigger | Wiki chapter page | Relationship_Stat page | Transcript |
|---|---|---|---|---|
| Jericho | `TALK TO SIMON` (unavoidable) | "Talking to Simon {{Icon|up}}" | Small Increase: "Talking to [[Simon]] in [[Time to Decide]]." | **no icon** |
| North | `TALK TO NORTH` (optional) | "Talking to her {{Icon|up}}" | Small Increase: "Talking to her in [[Time to Decide]]." | `{REL North SmallUp}` at the start of the conversation |
| North | T3 `YOU` | "Picking "you" while talking to her {{Icon|down}}" | Small Decrease: "Choosing "you" while talking to her in [[Time to Decide]]." | `{REL North SmallDown}` on `YOU` |
| North | `TALK TO SIMON` (unavoidable) | "Talking to Simon {{Icon|up}}" | Small Increase: "Talking to Simon in Time to Decide. (Rises to "Neutral" if asked North about "You")" | `{REL North SmallUp}` at the end of the Simon scene |
| Josh | `TALK TO JOSH` (optional) | "Talking to him {{Icon|up}}" | Small Increase: "Talking to him in [[Time to Decide]]." | `{REL Josh SmallUp}` at the start of the conversation |
| Simon | `TALK TO SIMON` (unavoidable) | "Talking to him {{Icon|up}}" | Small Increase: "Talking to him in [[Time to Decide]]." | `{REL Simon SmallUp}` at the end of the Simon scene |

- Starting levels (Relationship_Stat):
  - Jericho: "Neutral (Initial)", on the scale Leader / Admired / Respected / Neutral / Unpopular / Rejected.
  - North, Josh and Simon: "Neutral (Initial)", on the scale Lover / Companion / Friend / Neutral / Resentful / Hostile.
- **This chapter is the first in which any Markus relationship moves.** The ch11 note already observed that North, Simon and Josh are first met here.
- Net range by the end of the chapter, counting small = 1 and taking the icons at face value:

  | Stat | Lowest | Highest | How |
  |---|---|---|---|
  | North | +1 | +2 | Simon-scene +1 always. Skipping her, or talking and asking `YOU` (+1 −1), leaves +1. Talking without `YOU` gives +2. |
  | Josh | 0 | +1 | Only the optional talk. |
  | Simon | +1 | +1 | Simon-scene +1, unavoidable. |
  | Jericho | +1 | +1 | Simon-scene +1, unavoidable (wiki only; see §8). |

- The Relationship_Stat parenthetical, "Rises to "Neutral" if asked North about "You"", implies that after `YOU` North sits below Neutral until the Simon scene. That fits only if `YOU`'s −1 outweighs the opening +1 (different step sizes), or if the +1 is not applied when `YOU` is chosen. Neither source says which; see §8.
- **Public opinion:** no change. The Public_Opinion page has no Time to Decide entry.
- **Software instability:** not applicable. Software_Instability is "Connor's exclusive feature".
- **Other figures the sources give** (none is a game mechanic):
  - "nineteen of us still in working order" (North, T1 `ANDROID`);
  - "4 weeks, 3 days, 11 hours" (North, T3 `TIME HERE?`). The wiki derives that she arrived "On October 7th after 6 AM", while the Chronology page says "10/06";
  - "four oil drums" (wiki Notes);
  - 05:13 PM chapter start.
- **Choices with no stated number:** T1, T2, T3 options other than `YOU`, and every node except those in the table above.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **None that gates anything.** The transcript has no `[CONDITION]` or unlock block in this chapter, and the wiki states no requirement for any node. No earlier choice by any character changes what is offered.
- Carl's fate (Broken), Markus's choices in From the Dead and the Jericho chapter's optional reads change nothing here.
- The setup comes from the Jericho chapter (14): its single ending is `Met people of Jericho` (wiki `Jericho/Flowchart`: `MET=Met people of Jericho`), and its last line is Simon's "Welcome to Jericho."
- Markus's abdominal wound, which Lucy treats, is unconditional. The wiki's Unused Content says only that "Files suggest that Markus' injury on his abdomen was avoidable."

### Out of this chapter

The wiki chapter page has no "Cross-chapter impacts" section, and no node carries the impact padlock. What carries forward:

**The raid on the CyberLife warehouse (Spare Parts, Markus chapter 19).**
- Spare Parts opens with `Hunting for Parts` > `Climb Onto Dock` > `Follow [[North]]`. Its infobox location is CyberLife Warehouse and Docks (8:01 PM per Chronology). The whole crew always goes: Josh: "he only decides to help Markus steal spare parts when North and Simon volunteer as well".
- Nothing about who goes on the raid depends on Time to Decide.
- Jericho_(location): "He then tells Jericho that there are some android parts in the warehouses and convinces them to help for the sake of their lives."

**Relationship levels.** The +1/−1 changes above carry into Spare Parts and beyond. They are the starting point for every later threshold:
- Jericho "Unpopular" leads to Markus being ousted in Crossroads (Relationship_Stat: "If Markus' reputation at Jericho is "Unpopular" in Crossroads. (Drops to "Rejected")").
- North's "at least her "friend"" condition for the Freedom March roof options.
- North "Lover", which is reached only through the Freedom March memory share.

Time to Decide alone cannot move any of these past one step. No wiki line names a later effect specific to this chapter's choices.

**North's past.** Asking `YOU` here is the first time Markus can ask about her past. Freedom March reopens the subject (Relationship_Stat: "Asking her about her past in Freedom March", "Choosing "avoid" or "not important" when she asks Markus about his past in Freedom March"). No source ties the Freedom March dialogue to whether `YOU` was asked here.

**Characters introduced.**
- **Lucy** reappears in Crossroads. If Luther died in Midnight Train, she replaces him in telling Kara about Alice. During the raid she is found wounded: "This is the end of Jericho. Save our people, Markus."
- The Dying Android dies here.
- The Damaged Android and the boy have no later appearance listed on the wiki.

**Zlatko (Kara, chapter 17)** is next in play order. Nothing in Zlatko depends on this chapter.

---

## 5. Endings

| Chart label | Icon | Conditions | State after |
|---|---|---|---|
| **MARKUS HATCHED A PLAN** | none (large ending tile) | Always. Reached by `TALK TO SIMON`, which needs `TALK TO LUCY` and `CHECK EMPTY CRATE`. | North, Simon and Josh agree to raid the CyberLife warehouses at the docks for blue blood and biocomponents. Markus has been treated by Lucy. Relationship deltas as in §3. |

Wiki: "This chapter has only one outcome." (`|endings=1`). There is no death, failure or trophy ending.

---

## 6. Media

**None in this chapter.**
- The wiki's Magazine table (46 entries) has no row whose location is Time to Decide.
- The nearest magazines are Jericho's "[[Android Astronauts to Explore Io]]", "On the Run" and "Fortune Teller" (benchmark scene R14), and Zlatko's three (R17).
- No broadcast is mentioned on the chapter page, in PowerPyx or in the transcript.
- No public-opinion effect.

The only other "media" is Lucy's humming of "Hold On (Just a Little While Longer)" (wiki Notes; Hold_On_(song)). It is ambient and has no effect. The Hold_On page places the humming "In the chapter "Jericho"…when Markus first arrives". The chapter page places it in this chapter: "She doesn't stop until Markus goes to see her".

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has **no chapter-16 scene**. The Markus sequence runs from M04 (chapter 11) and R14 (chapter 14, magazines at the station) straight to M05 (chapter 19, "The security android"). In node order, chapter 16 would sit between C10 (The Nest, chapter 15) and K10 (Zlatko, chapter 17).

What exists that touches this chapter:
- M05's `situation` summarizes it in one sentence: "You have joined the hidden android community called {{Jericho}}, where dozens are shutting down for lack of parts. You have led {{North}}, {{Simon}} and {{Josh}} on a night raid of a {{CyberLife}} warehouse at the docks."
- `benchmark/story-engine.mjs` line 14 sets the initial `jerichoTrust:0, northTrust:0, simonTrust:0, joshTrust:0`. That matches "Neutral (Initial)" for all four.
- `benchmark/experience-prompt.mjs` lines 67 and 70 show the companion and Jericho levels only from chapter 19 (`ch>=19`).
- No name token exists for Lucy (no `Lucy` in `NAMES`).

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| INSIDE JERICHO, with the encounter (T1, T2) | none | **Missing.** Markus's arrival, the three introductions and his reaction to Jericho are not narrated. T1 and T2 have no stat effect, so this could be one event scene, or one cosmetic decision (T2 is the more characterful: LOST / SOMBER / LUCID / DIRECT). |
| TALK TO DYING ANDROID | none | **Missing**, optional. An event beat: the android asks what happens after death and shuts down. |
| TALK TO JOSH | none | **Missing**, optional, **stat-bearing** (Josh +1). Its content (biocomponents, "We're slowly dying out") is the motive for the raid. |
| TALK TO NORTH (with T3) | none | **Missing**, optional, **stat-bearing** (North +1; `YOU` −1). This is the chapter's only real dialogue decision with a consequence, and the first chance to set the North relationship. |
| TALK TO DAMAGED ANDROID | none | **Missing**, optional, no stat. |
| LET THERE BE LIGHT | none | **Missing**, optional, no stat. |
| TALK TO LUCY | none | **Missing**, mandatory. No Lucy name token exists. Her prophecy ("A part of shadow and a part of light... Which will prevail?") is the chapter's thematic beat. |
| CHECK EMPTY CRATE | none | **Missing**, mandatory. This is where the warehouse location comes from. |
| TALK TO SIMON | folded into M05 `situation` ("You have led {{North}}, {{Simon}} and {{Josh}} on a night raid") | **Missing as a scene.** The proposal and the crew's agreement are presented as already done. **Stat changes not applied:** Simon +1, North +1, Jericho +1 (wiki). Because Jericho trust gates the ousting (M22, `jerichoTrust<=JERICHO_UNPOPULAR` with `JERICHO_UNPOPULAR=-3`) and Simon's later rescue (engine lines 237 and 239), the missing +1 shifts later thresholds. |
| MARKUS HATCHED A PLAN | none | **Missing.** The run report has no chapter-16 ending label. |
| Risk | none | **Correct** to have none. Nothing in the chapter can fail. |

### Suggested shape (for the implementer, not a decision)

- One event scene for the arrival and encounter, with the choice of T2 optional.
- One scene offering the optional visits. Josh and North are the ones that matter, and their effects are optional +1s.
- North's T3 topic as a decision, with `YOU` at −1.
- One event scene each for Lucy, the crate and the Simon proposal, with the unavoidable +1s applied.
- Follow AGENTS.md's event-scene convention: a single Continue action, and stat changes only where declared.
- A `Lucy` token is needed in `NAMES` (real and neutral form) if she is named.

### Downstream consistency

- **M05's "dozens are shutting down"**:
  - North says "nineteen of us still in working order... The rest were damaged".
  - Josh says "We're slowly dying out".
  - "Dozens" in total is not contradicted, but no source gives a count of dying androids. Consider wording from the transcript.
- **Companion level labels.** `experience-prompt.mjs` line 67 shows North, Simon and Josh with `LEVELS.hank` (Hostile / Tense / Neutral / Warm / Friend). The game's scale for them is Lover / Companion / Friend / Neutral / Resentful / Hostile. That is outside this chapter, but it becomes visible as soon as chapter-16 deltas are applied.
- **M05 situation** would need trimming once the proposal is its own scene. "You have led … on a night raid" then becomes continuity, not exposition.

---

## 8. Open questions

1. **Jericho +1 at the Simon scene.**
   - The wiki chapter page and Relationship_Stat both list "Talking to Simon" as a Jericho small increase.
   - The transcript shows only North and Simon icons at the end of that scene, although its enum has a `Jericho` relation (`GUI.GAUGE.LEADER.NAME`) that it uses in other chapters (seven times in Spare Parts).
   - Check in game whether the Jericho gauge moves when Markus talks to Simon.
2. **North's arithmetic after `YOU`.** Relationship_Stat says the Simon-scene increase makes North rise "to "Neutral" if asked North about "You"". That implies North is below Neutral after `YOU`, even though talking to her gave +1 first. Is the opening +1 conditional on not picking `YOU`, or is `YOU`'s decrease larger than the icon suggests? Check the gauge in game.
3. **One topic or several with North (T3)?** The transcript shows one choice group and one closing line. PowerPyx only says "do not choose the option YOU". Can Markus ask more than one topic, and can he come back and ask again?
4. **Order of Lucy and the crate.** The chart draws them as parallel. The wiki nests both under Let There Be Light, crate first. PowerPyx goes Lucy then crate. Can the crate be checked before seeing Lucy, and do the optional nodes stay open after both are done (until Simon)?
5. **Where the encounter belongs.**
   - The opening "Who are you?" exchange (T1, T2) uses `X0503M` string keys, the Jericho chapter's script prefix.
   - The transcript and the 05:13 PM timestamp put it at the start of Time to Decide.
   - Phileas's wiki page links the `TRAIL` flashback to the Jericho flowchart.
   - Confirm in game that T1 and T2 play after the `INSIDE JERICHO` checkpoint loads. Also confirm that `TRAIL` triggers a Phileas flashback.
6. **T1 single pick?** Five options in one group; confirm that only one is asked before Josh's "I understand how you feel".
7. **Dying Android without the talk.** Does she shut down whether or not Markus talks to her? Her wiki status is `Deceased`, but the page describes only the talk.
8. **Lucy's humming: chapter 14 or 16?** The chapter page says it stops when Markus sees Lucy (this chapter). The Hold_On page attributes it to "the chapter "Jericho"". This is cosmetic.
9. **"Inside Jericho" checkpoint bug.** The wiki and two PowerPyx commenters report that the checkpoint can stay locked. This doesn't affect the story, but it explains a chart with a locked first node.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter link)
- https://www.powerpyx.com/detroit-become-human-time-to-decide-walkthrough-100/ (walkthrough text for every node: North `YOU` warning, Lucy as main objective, crate completes "Explore Jericho", Simon ends the chapter; comments on the four barrels and the locked-checkpoint bug; published 2018-05-28)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-time-to-decide.jpg (the only full-size chart image; 1920×1080; all 10 nodes, the EXPLORE JERICHO bracket, the fork and join, the ending tile; saved at /tmp/flowcharts/ch16/)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-time-to-decide-300x169.jpg, `-768x432.jpg`, `-1024x576.jpg`, `-178x100.jpg` (resized copies of the same image; not used)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Time_to_Decide&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Relationship Changes, Notes, Unused Content; saved as /tmp/flowcharts/ch16/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Time_to_Decide/Flowchart&prop=wikitext&format=json and `page=Time_to_Decide_(Transcript)` (both `missingtitle`)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (Markus scales and initial levels; Time to Decide entries for Jericho, North, Josh, Simon, including "Rises to "Neutral" if asked North about "You"")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (no Time to Decide entry)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor-only stat)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (no Time to Decide magazine)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json (next Markus chapter: opening nodes, raid, its relationship table)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json and `page=Jericho/Flowchart` (previous Markus chapter; single ending "Met people of Jericho")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho_(location)&prop=wikitext&format=json (Time to Decide summary: Josh reveals the androids are dying; Markus convinces them)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json (ball against the wall; closes up on her past; relationship decrease; arrival date derived from "4 weeks, 3 days, 11 hours")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json ("Maybe it's worth a try...", looking at Josh)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json (the child; scarce biocomponents; reluctant agreement once North and Simon volunteer)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Lucy&prop=wikitext&format=json (treats Markus; prophecy quote; Crossroads reappearance and last words)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json (Time to Decide summary: empty shipping container, route to the warehouse, the plan)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Dying_Android&prop=wikitext&format=json (dialogue; dies after the conversation; Deceased)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Damaged_Android&prop=wikitext&format=json (dialogue; does not die on screen; unused "few hours left" line)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Young_Boy_Android&prop=wikitext&format=json (the abandoned child Josh tends)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Phileas&prop=wikitext&format=json (flashback "if Markus mentions the trail")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=CyberLife_Warehouse_and_Docks&prop=wikitext&format=json (raid target; West Torrance Avenue; leased 2022)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Hold_On_(song)&prop=wikitext&format=json (Lucy's humming)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json (05:13 PM start; Spare Parts at 08:01 PM; North's arrival "10/06")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json and `page=Zlatko` (neighbouring chapters in play order; no dependency)
- https://detroitbecometext.github.io/chapters/16 (transcript linked from the wiki; a JavaScript app, read through its source below)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/src/app/chapters/components/chapter-contents/16-time-to-decide-chapter-content/time-to-decide-chapter-content.component.html (chapter structure: encounter choice groups T1/T2, North's T3, relation icons, unused Lucy lines; rendered to /tmp/flowcharts/ch16/transcript.txt)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/src/app/chapters/components/chapter-contents/14-jericho-chapter-content/jericho-chapter-content.component.html (confirms chapter 14 ends on "Welcome to Jericho.")
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/src/app/shared/enums/relation-name.enum.ts (transcript has a Jericho relation it does not use in this chapter)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/public/i18n/en.json (English game strings for every line and option label quoted above)

---

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/16-time-to-decide-chapter-content/time-to-decide-chapter-content.component.html (local copy `/tmp/dbt/tpl916/ch16.html`).
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json (local `/tmp/dbt/en.json`). Every key resolved.
- Renderer: `/tmp/dbt/render916.py`. Outline at `/tmp/dbt/ch16.txt`, with dialogue at `/tmp/dbt/ch16-dialogue.txt`.
- Counts:
  - **3 choice groups (prompts)** with **14 options**: T1 has 5, T2 has 4 and T3 has 5.
  - **0 clues** (no observation items or case files).
  - **5 stat arrows**: Josh SmallUp; North SmallUp; North SmallDown on `YOU`; North SmallUp and Simon SmallUp at the Simon scene.
  - **0 unlock conditions**, **0 condition groups**, **2 cut/unused blocks** (both lines of Lucy's).
- String prefixes: T1 and T2 and the encounter dialogue use `X0503M.JERICHO.ENCOUNTER.*` (25 keys). North's T3 and the rest of the chapter use `X0601M.INTRO.*` (43 keys). This confirms section 1's observation.
- The template has no section for `LET THERE BE LIGHT` or `CHECK EMPTY CRATE` (no dialogue), and no magazine or TV markup.

### Rendered outline

```text
# In Jericho
NOTE: NOV 6TH, 2038
NOTE: PM 05:13
PROMPT (choice group):
  OPTION "TRAIL"
  OPTION "ANDROID"
  OPTION "JERICHO"
  OPTION "REFUGE"
  OPTION "FREE?"
PROMPT (choice group):
  OPTION "LOST"
  OPTION "SOMBER"
  OPTION "LUCID"
  OPTION "DIRECT"
# Explore Jericho
## Talk with Josh
ARROW: Josh SmallUp
## Talk with North
ARROW: North SmallUp
PROMPT (choice group):
  OPTION "TIME HERE?"
  OPTION "WOUNDED"
  OPTION "JERICHO"
  OPTION "YOU"
    ARROW: North SmallDown
  OPTION "SPARE PARTS"
## Talk with Lucy
CUT/UNUSED CONTENT:
CUT/UNUSED CONTENT:
## Talk with damaged android (sitting)
## Talk with damaged android (near fire)
## Finished exploring - Talk with Simon
ARROW: North SmallUp
ARROW: Simon SmallUp
```

The cut blocks under "Talk with Lucy" are Lucy: "You've lost a lot of blood…" and Lucy: "It's left over from one of our own." (shown in `/tmp/dbt/ch16-dialogue.txt`). The template's heading "Talk with damaged android (sitting)" is the wiki's Damaged Android ("They tied me to the back of a car..."). "Talk with damaged android (near fire)" is the Dying Android ("I was glad to meet you, Markus."). Section 1 maps them the same way.

### Discrepancies with sections 1 to 3

1. **Jericho +1 at `TALK TO SIMON` (summary bullets, section 3 table and net-range table).** The note lists "Jericho +1 at the Simon scene (wiki only)" from the wiki chapter page and Relationship_Stat. The template's Simon scene ends with exactly two arrows, `North SmallUp` and `Simon SmallUp`, and no `RelationName.Jericho`, although the enum has one and other chapters use it. The template is not silent here: it lists the scene's arrows and leaves Jericho out. Per the README, **the template wins**, so the Jericho +1 should not be built unless the operator sees the gauge move in game (open question 1). If it is dropped, the net-range row for Jericho becomes 0 / 0.
2. **Section order versus chart order (information, no correction).** The template orders the sections Josh, North, Lucy, damaged android (sitting), damaged android (near fire), Simon. The chart has Dying Android, Josh, North, Damaged Android and Let There Be Light in the bracket, then Lucy and the crate, then Simon. Per the README the flowchart image wins for node order, and section 1 already follows the chart.

Everything else agrees with the note:
- the T1, T2 and T3 labels exactly (`TRAIL`, `ANDROID`, `JERICHO`, `REFUGE`, `FREE?`; `LOST`, `SOMBER`, `LUCID`, `DIRECT`; `TIME HERE?`, `WOUNDED`, `JERICHO`, `YOU`, `SPARE PARTS`);
- no arrows in T1 and T2;
- Josh SmallUp at the start of his talk;
- North SmallUp at the start of hers and SmallDown on `YOU`;
- North and Simon SmallUp at the end of the Simon scene;
- the two unused Lucy lines;
- no timer or death branch.

**2 discrepancies: 1 substantive (Jericho arrow), 1 order note.**

### Discrepancies with the benchmark

Confirmed: `benchmark/story.json` (1.6.0) has no scene with `chapter: 16`, none titled Time to Decide, and no scene mentions Lucy. In file order, `R14` (chapter 14) and `R15`/`C10` (chapter 15) are followed by `K10` (chapter 17). The only Markus scenes after `R14` are `M05` to `M08` (Spare Parts, chapter 19). `story-engine.mjs` applies no North/Josh/Simon/Jericho change before `case 'M05'`, and `experience-prompt.mjs` shows the companion and Jericho levels only from `ch>=19`.

1. **Missing prompt T1** (`TRAIL` / `ANDROID` / `JERICHO` / `REFUGE` / `FREE?`), no arrows.
2. **Missing prompt T2** (`LOST` / `SOMBER` / `LUCID` / `DIRECT`), no arrows.
3. **Missing prompt T3** (`TIME HERE?` / `WOUNDED` / `JERICHO` / `YOU` / `SPARE PARTS`). The `YOU` arrow (North SmallDown) is not applied.
4. **Missing arrow: Josh SmallUp** for talking to Josh (an optional visit; no scene offers it).
5. **Missing arrow: North SmallUp** for talking to North (optional; no scene).
6. **Missing arrows: North SmallUp and Simon SmallUp** at the Simon scene (unavoidable). `M05`'s situation folds the proposal into exposition ("You have led {{North}}, {{Simon}} and {{Josh}} on a night raid") and applies neither arrow, so every run enters Spare Parts with North and Simon one small step lower than the game allows.
7. **When the chapter is built, do not add a Jericho +1** at the Simon scene (see discrepancy 1 with the note), and do not build the two cut Lucy lines.

**7 benchmark items: 3 missing prompts, 5 missing arrows (items 3 to 6), 0 missing clues, and 1 build instruction.** Nothing the benchmark applies contradicts the template, because the benchmark applies nothing for this chapter. The template wins for all labels and arrows above. The flowchart image (section 1) governs the order of the visits.
