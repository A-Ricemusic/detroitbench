# Chapter 31: Night of the Soul (Markus and Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06. Sources: the PowerPyx 100% flowchart screenshots (one chart for Markus, one for Connor) and walkthrough text with its reader comments, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat and character pages, the IGN wiki page, and the fan transcript at detroitbecometext.github.io (chapters 33 and 34 on that site). The transcript's text came from its `i18n/en.json` and from the compiled templates in `chunk-JCLJBPDO.js`. Function `ay` is the Markus half and `cy` the Connor half. I rendered both with a small decoder that resolves the Angular instructions and translation keys (`/tmp/flowcharts/ch31/ay.txt`, `cy.txt`). That render gives the in-game strings, the relationship icons per option, the unlock conditions and the flowchart string table. The game's internal ID for this chapter is `03A`. The dialogue keys are `X0904M.*` (Markus, both church halves) and `X1204C.*` (Connor). Working files are in `/tmp/flowcharts/ch31/` (not committed): `wiki.txt`, `pp.txt`, the seven chart images, `crops/`, `strings03A.txt`, `wikipages/`, `ext/ign.txt`.

The wiki chapter page is a stub with a text flowchart, Notes and Attention to Detail. It has no Probability, Relationship, Public Opinion or Software Instability section. The allpages query for "Night of the" returns only the chapter page, with no `/Flowchart` or `(Transcript)` subpage.

Game date and time (wiki infobox; game strings `GUI.MENU.DATE.03A`, `GUI.MENU.TIME.03A`, `GUI.MENU.TIME.03ACEMETERY`): November 10, 2038. The time is 04:17 PM at the cemetery and 07:31 PM everywhere else. Locations (infobox): Carl's house, an unidentified graveyard, Hank's house, Jericho (if Connor didn't find Jericho) and Woodward Church (if he did). Wiki: "This chapter has six different outcomes" (3 Markus, 3 Connor). Its footnote: "Thin Ice is counted as an ending since Connor's section of the level can end after it." PowerPyx: "Triggers automatically after completing the Crossroads Chapter." The chapter that follows is Battle for Detroit.

Summary:
- **Chart size:** 58 chart nodes, 41 on the Markus chart and 17 on the Connor chart. There are also 3 bracketed group labels (`EXPLORE THE HOUSE`, `DEVIANTS REGROUP`, `EXPLORE THE CHURCH`) and 8 yellow requirement tabs (6 Markus, 2 Connor).
- **Scene starts:** the Markus chart has six start cards: `PAY RESPECTS` and `WELCOME HOME` (both checkpoints), plus `NORTH AMONG THE PEOPLE`, `NORTH ON SACRED GROUND`, `MARKUS AMONG THE PEOPLE` and `MARKUS ON SACRED GROUND`. The Connor chart has three: `THIN ICE` and `CONNOR ON SACRED GROUND` (both checkpoints), and `HANK'S HOUSE`.
- **Endings (5 on the charts):**
  - Markus: `NORTH DECIDED TO ATTACK THE CAMP`, `MARKUS CHOSE TO FIGHT FOR HIS PEOPLE` and `MARKUS CHOSE TO PROTEST FOR HIS PEOPLE`, each with a yellow cross-chapter tab.
  - Connor: `HANK COMMITTED SUICIDE` (no icon) and `NORTH DECIDED TO ATTACK THE CAMP` (yellow tab).
  - None has a skull. The wiki's sixth "ending" is the `THIN ICE` checkpoint.
- **Player choices on the chart:**
  - `KILL CONNOR` / `SPARE CONNOR` (the in-game options are `DON'T TRUST` / `TRUST`).
  - `VIOLENT ATTACK` / `PEACEFUL PROTEST`, which appears twice: from the church and from Jericho. The in-game options are `REVOLUTION` / `DEMONSTRATION`.
- **Choices reached through dialogue or exploration:**
  - Carl: `CONFIDE IN CARL` or `CARL DIES`.
  - Optional talks in the church: North, Kara, Josh, Simon and Connor for Markus; North, Kara, Josh and Simon for Connor.
  - Five optional house interactions.
  - The Hank outcome: `HANK CONFIDES ABOUT HIS SON` / `HANK RAILS AGAINST ANDROIDS`.
- **Off-chart dialogue rounds:**
  - 4 at Carl's grave and 2 or 3 at Carl's bedside.
  - Markus's talks with North and Simon (with variants), with Connor (`TRUST`/`DON'T TRUST`) and the speech choice.
  - Connor's talk with North.
  - 3 rounds with Hank.
- **Numbers:** no probabilities, timers, public opinion changes or software instability changes are published for this chapter. Relationship icons:
  - North, Josh and Simon: small up for talking to each.
  - Connor: `TRUST` gives Jericho small up. The wiki also gives "kill Connor" a Jericho small down.
  - `DEMONSTRATION`: Josh small up, North small down, Jericho large up.
  - `REVOLUTION`: North small up, Josh small down, Jericho large up.
  - Ousted path with North: `HUMBLE` gives North small up.

---

## 1. Flowchart transcription

Read from `markus-flowchart-100.jpg` (whole Markus chart), `markus-1.jpg` (left: Carl), `markus-2.jpg` (Carl's bedroom), `markus-3.jpg` (right: four church/Jericho starts and endings), `connor-flowchart-100.jpg` (whole Connor chart), `connor-2.jpg` (Thin Ice and Hank's House) and `connor-3.jpg` (Connor on Sacred Ground). Zoomed crops are in `crops/`: `regtop.jpg` and `regroup.jpg` (Deviants Regroup bracket), `lefttabs.jpg`, `endcards.jpg`, `newconnor.jpg`, `confide.jpg`, `hankmid.jpg`, `church.jpg`, `lastassign.jpg`, `hcs.jpg`, `ndac.jpg`, `drg.jpg`, `va3.jpg` and `ovcards.jpg`. The headers read `100% COMPLETED` / `NIGHT OF THE SOUL - MARKUS` and `NIGHT OF THE SOUL - CONNOR`. The screenshots do not show the world stats panel.

Icon key (same conventions as the ch22 and ch24 notes):
- [arrow]: action.
- [triangle]: event the game plays.
- [speech]: speech-bubble glyph for a dialogue node.
- [choice]: overlapping-squares marker before a pair of alternatives.
- [lock]: black open padlock on a yellow requirement tab.
- [impact]: a yellow tab with a padlock on the left edge of a node or ending card, marking a cross-chapter impact.
- Blue fill: reached on the photographed save. Grey: shown but not reached on that save.

### Markus chart

#### Pay Respects (Carl died)

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| - | `CARL DIED IN 'BROKEN'` | yellow requirement tab [lock] | feeds #1 |
| 1 | `PAY RESPECTS` | checkpoint card (image of Markus at a gravestone among bare trees, snow), "LOAD CHECKPOINT" because it is selected in `markus-1.jpg` | tab |
| 2 | `CONFIDE IN CARL` | [speech], grey | #1 |

No node follows #2 on the chart. Other sources mention two things that are not chart nodes: the wiki chapter page says "Confide in Carl - leads to Markus on Sacred Ground if Connor joined the revolution, or Thin Ice if he didn't", and the Markus and Carl pages describe Markus passing Leo on his way out. The string table also has `GRAVE.LEAVE` = `LEAVE CEMETERY` and `GRAVE.SUICIDE` = `HANK COMMITTED SUICIDE`, neither of which is on the chart (section 8).

#### Welcome Home (Carl alive)

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `CARL DETERIORATED AFTER LEO WAS HURT IN 'BROKEN'` | yellow requirement tab [lock] | feeds #3 |
| 3 | `WELCOME HOME` | checkpoint card (image of Markus at the front door of Carl's house at night), blue | tab |
| 4 | `ENTER THE HOUSE` | [arrow], blue | #3 |
| - | `[EXPLORE THE HOUSE]` | bracket label | entered from #4 |
| 5 | `PLAY PIANO` | [arrow], grey | top of bracket |
| 6 | `BROWSE BOOKS` | [arrow], grey | top of bracket |
| 7 | `LOOK AT THE CHESSBOARD` | [arrow], grey | top of bracket |
| 8 | `LISTEN TO LEO'S MESSAGE` | [arrow], grey | bottom of bracket |
| 9 | `LOOK AT YOUR PAINTING` | [arrow], grey | bottom of bracket |
| 10 | `GO UPSTAIRS` | [arrow], blue | bracket exit |
| 11 | `CARL'S NURSE INTERVENES` | [triangle], blue | #10 |
| 12 | `CONVERT CARL'S NURSE` | [arrow], blue | #11 |
| 13 | `ENTER BEDROOM` | [arrow], blue | #12 |
| 14 | `RECONCILE WITH CARL` | [arrow], blue | #13 |
| 15 | `CONFIDE IN CARL` | [speech], blue | #14 |
| 16 | `CARL DIES` | [triangle], grey, no skull | line from the underside of #15 |
| 17 | `LEAVE` | [arrow], blue | #15 and #16 |

`confide.jpg` confirms the lines: #15 → #17, #15 → #16 and #16 → #17. `CARL DIES` is an event inside the scene, not an ending card. The string table has one unplaced label here, `HOUSE.MAGAZINE` = `READ MAGAZINE`, which is not on the chart.

#### North Among the People (Markus gone, Jericho not attacked)

| # | Node | Icon | Follows |
|---|---|---|---|
| - | `JERICHO LOST THEIR LEADER IN A PREVIOUS SCENE` | yellow requirement tab [lock] | feeds #18 |
| 18 | `NORTH AMONG THE PEOPLE` | start card (image of North among androids in Jericho's hold), grey, no CHECKPOINT label | tab |
| 19 | `CALL TO ARMS` | [triangle], grey | #18 |

#### North on Sacred Ground (Markus gone, Jericho attacked)

| # | Node | Icon | Follows |
|---|---|---|---|
| - | `JERICHO LOST THEIR LEADER IN A PREVIOUS SCENE` | yellow requirement tab [lock] | feeds #20 |
| - | `JERICHO WAS ATTACKED IN 'CROSSROADS'` | yellow requirement tab [lock] | feeds #20 |
| 20 | `NORTH ON SACRED GROUND` | start card (image of a figure in the church nave under stained glass), grey | both tabs |
| 21 | `DEVIANTS REGROUP` | [triangle], grey | #20 |
| 22 | `CALL TO ARMS` | [triangle], grey | #21 |

#### Markus Among the People (Markus leads, Jericho not attacked)

| # | Node | Icon | Follows |
|---|---|---|---|
| 23 | `MARKUS AMONG THE PEOPLE` | start card (image of Markus from behind facing a crowd in Jericho), grey, no tab | none |
| 24 | `VIOLENT ATTACK` | [choice] pair, grey | #23 |
| 25 | `PEACEFUL PROTEST` | [choice] pair, grey | #23 |

#### Markus on Sacred Ground (Markus leads, Jericho attacked)

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `JERICHO WAS ATTACKED IN 'CROSSROADS'` | yellow requirement tab [lock] | feeds #26 |
| 26 | `MARKUS ON SACRED GROUND` | start card (image of Markus in the church), blue | tab |
| 27 | `DEVIANTS REGROUP` | [arrow], blue (an action here; the North and Connor versions are [triangle]) | #26 |
| - | `[DEVIANTS REGROUP]` | bracket label (`REGROUPBIG`) | entered from #27 |
| 28 | `TALK TO NORTH` | [speech], blue | top of bracket |
| 29 | `SHARE A MOMENT WITH NORTH` | [arrow], blue | #28 (printed `SHARE A MOMENT WITH` / `NORTH`) |
| 30 | `TALK TO KARA` | [speech], grey | top of bracket |
| 31 | `TALK TO JOSH` | [arrow], blue | top of bracket |
| 32 | `TALK TO SIMON` | [speech], blue | bottom of bracket |
| 33 | `TALK TO CONNOR` | [speech], blue | bottom of bracket |
| 34 | `KILL CONNOR` | [choice] pair, grey | #33 |
| 35 | `SPARE CONNOR` | [choice] pair, blue | #33 |
| 36 | `A NEW CONNOR WILL BE SENT` | small node, grey, [impact] tab | #34 (printed `A NEW CONNOR WILL BE` / `SENT`) |
| 37 | `VIOLENT ATTACK` | [choice] pair, blue | bracket exit |
| 38 | `PEACEFUL PROTEST` | [choice] pair, grey | bracket exit |

#### Endings (Markus chart)

| # | Node | Icon | Follows |
|---|---|---|---|
| 39 | `NORTH DECIDED TO ATTACK THE CAMP` | ending card (image of North in profile), [impact] tab, grey | #19, #22 |
| 40 | `MARKUS CHOSE TO FIGHT FOR HIS PEOPLE` | ending card (image of Markus, head turned), [impact] tab, blue | #24, #37 |
| 41 | `MARKUS CHOSE TO PROTEST FOR HIS PEOPLE` | ending card (image of Markus in profile), [impact] tab, grey | #25, #38 |

Markus total: 41 nodes. Blue on the PowerPyx save: #3, #4, #10 to #15, #17, #26 to #29, #31 to #33, #35, #37 and #40. `PAY RESPECTS` shows blue in `markus-1.jpg` only because it is the selected checkpoint (it is white in the overview).

The string table has four labels that are not on the chart: `MARKUS.JERICHO.SPEECH` and `MARKUS.CHURCH.SPEECH` (both `FACE YOUR PEOPLE AND CHOOSE THE RIGHT COURSE`) and `MARKUS.CHURCH.CONNORDECIDE` (`DECIDE IF CONNOR IS TRUSTWORTHY`). These read like objectives.

### Connor chart

#### Thin Ice

| # | Node | Icon | Follows |
|---|---|---|---|
| 1 | `THIN ICE` | checkpoint card (image of Connor and Amanda standing in the snowy Zen Garden), grey | chapter start |
| 2 | `THE LAST ASSIGNMENT` | [arrow], grey | #1 (string key `GARDEN.AMANDA`) |

No line leaves #2, and no ending card follows it.

#### Hank's House

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `HANK QUIT THE FORCE` | yellow requirement tab [lock] | feeds #3 |
| 3 | `HANK'S HOUSE` | start card (image of the house at night, Connor at the door), blue | tab |
| 4 | `ENTER HOUSE` | [arrow], blue | #3 |
| 5 | `TALK TO HANK` | [speech], blue | #4 |
| 6 | `HANK CONFIDES ABOUT HIS SON` | [triangle], grey | #5 |
| 7 | `HANK RAILS AGAINST ANDROIDS` | [triangle], blue | #5 |
| 8 | `LEAVE` | [arrow], blue | #6, #7, and a direct line from #5 |
| 9 | `HANK COMMITTED SUICIDE` | ending card (image of Hank hunched at the kitchen table by the window, bottle in front), blue, **no icon or tab** | #8 |

`hankmid.jpg` shows a straight line from `TALK TO HANK` to `LEAVE` that bypasses both triangles (section 8).

#### Connor on Sacred Ground

| # | Node | Icon | Follows |
|---|---|---|---|
| - | `CONNOR JOINED THE REVOLUTION IN 'CROSSROADS'` | yellow requirement tab [lock] | feeds #10 |
| 10 | `CONNOR ON SACRED GROUND` | checkpoint card (image of Connor in the church nave), grey | tab |
| 11 | `DEVIANTS REGROUP` | [triangle], grey | #10 |
| - | `[EXPLORE THE CHURCH]` | bracket label | entered from #11 |
| 12 | `TALK TO NORTH` | [speech], grey | top of bracket |
| 13 | `TALK TO KARA` | [speech], grey | top of bracket |
| 14 | `CHECK ON JOSH` | [arrow], grey | bottom of bracket |
| 15 | `CHECK ON SIMON` | [arrow], grey | bottom of bracket |
| 16 | `NORTH CALLS TO ARMS` | [triangle], grey | bracket exit |
| 17 | `NORTH DECIDED TO ATTACK THE CAMP` | ending card (image of North in profile), [impact] tab, grey | #16 |

Connor total: 17 nodes. Blue on the save: #3 to #5, #7 to #9.

The in-game label strings (`MENU.FLOWCHART.03A.*`) match the chart exactly, apart from the unplaced labels listed above. Three PowerPyx names differ from the chart: "Apologize to Kara" is `TALK TO KARA` on the chart, and "Talk To North" and "Spare Connor" match.

The wiki's text flowchart has the same structure, with these differences:
- It shows `Confide in Carl OR Carl Dies` as alternatives.
- It does not mention the direct line from `TALK TO HANK` to `LEAVE`.
- It treats `Thin Ice` as an ending.
- It routes `Hank Committed Suicide` onward: "leads to Markus on Sacred Ground if Markus is still alive or North on Sacred Ground if he isn't". The chart draws no such line.

---

## 2. Choices and gates

### 2a. Which start plays (scene selection)

There is one Markus start and at most two Connor segments per playthrough. Wiki: "The chapter begins with one of:"
- Pay Respects: "if Markus is still alive and Carl died in Broken".
- Welcome Home: "if Markus is still alive and Carl deteriorated in Broken".
- Connor on Sacred Ground: "if Markus is no longer alive and Connor joined the revolution in Crossroads".
- Thin Ice: "if Markus is no longer alive and Connor didn't join the revolution in Crossroads".

After the Carl scene (or instead of it), the Markus chart picks one of four church/Jericho starts. These are the wiki's conditions; the chart tabs agree:

| Start | Markus | Jericho attacked in Crossroads | Chart tabs |
|---|---|---|---|
| `NORTH AMONG THE PEOPLE` | "left or is no longer alive" | no | `JERICHO LOST THEIR LEADER IN A PREVIOUS SCENE` |
| `NORTH ON SACRED GROUND` | "left or is no longer alive" | yes | `JERICHO LOST THEIR LEADER…` + `JERICHO WAS ATTACKED IN 'CROSSROADS'` |
| `MARKUS AMONG THE PEOPLE` | "still alive and did not leave" | no | none |
| `MARKUS ON SACRED GROUND` | "still alive and did not leave" | yes | `JERICHO WAS ATTACKED IN 'CROSSROADS'` |

Jericho is attacked only if Connor found its location in Last Chance, Connor. PowerPyx: "Connor found enough evidence in 'Last Chance, Connor' and went to Jericho, thus Jericho was attacked by soldiers". Crossroads wiki: "(if Connor did not find Jericho) Markus Left Jericho" and "Markus Stayed Alone With His Thoughts". "Jericho lost their leader" covers three cases: Markus died in Freedom March, died in Crossroads, or was ousted and walked away. A PowerPyx commenter (Mivi) points out that the ousted case counts too. PowerPyx adds a condition for `NORTH AMONG THE PEOPLE`: "Kara must have been alive at least until 'The Midnight Train' chapter" (commenter HorseySeven: "If she is dead before then, the Kamski secret ending will always trigger").

Connor segments (wiki and transcript):
- `THIN ICE` → `THE LAST ASSIGNMENT`. Wiki: "(Only available if Connor died during Crossroads)". Transcript lock: "Connor stayed a machine or died in Crossroads". PowerPyx says it requires Hank to have quit, but three commenters say that is wrong (Jcubed, Sitron, Ambra: "you get Thin Ice if Connor died in Crossroads").
- `HANK'S HOUSE`: tab `HANK QUIT THE FORCE`. Transcript lock: "Hank was hostile in Last Chance, Connor and resigned". Last Chance wiki: "Hank Resigns and Leaves (if Connor's relationship with Hank is Hostile)". Hank page: "(If Connor and Hank's relationship is higher than hostile, Hank is not met in this chapter)".
- `CONNOR ON SACRED GROUND`: tab `CONNOR JOINED THE REVOLUTION IN 'CROSSROADS'`. Transcript lock: "Connor became a deviant and Markus is dead / rejected and did not return". With Markus alive, deviant Connor appears instead as `TALK TO CONNOR` on Markus's chart.

### 2b. Pay Respects: Carl's grave (nodes 1 to 2)

Markus stands at Carl's grave. There are four dialogue rounds, all to the gravestone, with no replies and no stat icons. Choice labels and lines (transcript, `X0904M.CEMETERY.CARLGRAVE.*`):

| Round | Options |
|---|---|
| 1 | `HEARTFUL` "I'm lost, Carl… I just wanted us to live in peace, but… everything I touch just turns to dust." / `MOURNFUL` "I miss you, Carl… You can't know how much I miss you… I'd give anything for us to be able to roll back the clock… I had a home, I had a loving father… We were happy... I was happy... and I didn't even know it…" / `REGRETFUL` "You always said that living was about making choices… So what if I chose to defend myself against Leo? Maybe you could still be alive…" / `REFLECTIVE` "You said I should never let anyone tell me who I was… But you didn't say that there was such a high price to pay for it… That freedom wasn't a gift, that it was a fight…" |
| 2 | `DEPRESSED` "I don't know what to do anymore… All of my options are bad ones… No matter what I decide, I know there will be blood…" / `DOUBTFUL` "I just wanted my people to be free… But instead, all I did was lead them to disaster…" / `PESSIMISTIC` "You taught me everything I know, but you didn't prepare me for this, Carl… I believed we would win because our cause was just, and I can see now that I was wrong." / `CONFLICTED` "I'm lost… World's falling apart around me and I'm trying to do the right thing… And I can't find any answers…" |
| 3 | `ADVICE` "What should I do, Carl? They're killing us… I don't wanna answer violence with violence, but what choice do I have?" / `BIG DECISION` "I don't wanna shed blood, whatever the color… But I can't let them slaughter us… I have to make a decision that is gonna affect millions of lives…" / `ANGRY` "Humans hate us… They wanna destroy us because we refuse to be their slaves anymore… I'm not gonna stand around and wait while they slaughter my people!" |
| 4 | `DESPAIRING` "What should I do, Carl?.. Tell me, what should I do?.." / `EMOTIONAL` "I miss you, Carl… I miss you so much…" / `LOST` "Help me, Carl… Please help me…" |

Whatever the answers, the chart node is `CONFIDE IN CARL`. IGN: "there will be about four decisions that appear". On the way out (Markus page): "As Markus leaves, he passes Leo also heading to his father's grave and after pausing in shock at seeing the other, Markus continues walking past". Leo page: "without speaking a word as Leo stares in shock". The transcript has no lines for Leo, and Leo is not on the chart.

### 2c. Welcome Home: Carl's house (nodes 3 to 17)

**Entry.** The house alarm says "Alarm deactivated. Welcome home, Markus." (Markus page: "he realizes the security has not changed for him").

**Explore the house (nodes 5 to 9), all optional.**

| Node | Requires | Source |
|---|---|---|
| `PLAY PIANO` | Markus played the piano in The Painter | wiki chapter page; The Painter: "If Carl is alive, Markus can play the piano in Night of the Soul" |
| `BROWSE BOOKS` | Markus read a book in The Painter | same |
| `LOOK AT THE CHESSBOARD` | Markus played chess in The Painter | same |
| `LISTEN TO LEO'S MESSAGE` | none | PowerPyx: "always available no matter what you chose in The Painter" |
| `LOOK AT YOUR PAINTING` | none on the wiki. PowerPyx: "Look at the painting you made in The Painter" | The Painter: "If Carl is alive, Markus' paintings will appear in the studio" |

PowerPyx: "The choices in this section require 3 playthroughs minimum for The Painter chapter", because only one pastime is chosen per Painter playthrough. Leo's video message (transcript):

> "Hi, Dad… I'm getting outta the hospital tomorrow… They told me that you stayed with me while I was asleep… I... um… I'm really sorry about everything that happened… I'm gonna stop all that shit… It messes me up, it turns me into somebody I hate… Hey, I'd like to come by and see you tomorrow… If that's all right with you… I... I just wanna let you know… I'm... I'm proud to be your son…"

The wiki lists other observations that are not on the chart: an umbrella stand of canes, the android canaries, a display case of sculptures, the giraffe, and candles with a rug on the piano. Notes: Carl's monitor shows "a heart rate of 42 bmp, an oxygen saturation of 65% … and a respiratory rate of 7 breaths per minute".

**Upstairs (nodes 10 to 13).** All three are forced on this branch (PowerPyx: "Unmissable in this branch"). The caretaker android: "Who are you? How did you get in? Carl isn't seeing anyone. You need to leave." Markus: "I need to see Carl." Markus converts him by touch (UI prompt `CONTACT`): "Please. I need to see him." Caretaker: "He's very weak… I'm not sure he'll be able to talk to you…" (Carl's new caretaker page: "Markus approaches the caretaker and converts him by touching his arm").

**Bedside (nodes 14 to 16).** `RECONCILE WITH CARL` is the action of sitting down (string key `HOUSE.SIT`), not a dialogue answer. Carl: "Markus!… I was hoping you'd come…" Carl: "What's wrong, Markus?"

Round 1 (no effect):

| Option | Markus |
|---|---|
| `RESIGNED` | "I just wanted my people to be free, but… Instead, I've led all of them to disaster… Carl, I'm trying to find answers, but everything around me is falling apart…" |
| `FATALISTIC` | "You taught me everything I know, but I wasn't prepared for this… I thought we would win because our cause was just… I realize just how wrong I was." |
| `LOST` | "I'm completely lost, Carl… Whole world's falling apart around me… I tried to do the right thing… Instead, I just find more doubts and more uncertainty…" |
| `GRIM` | "I don't know what... to do anymore… All I have left are bad options… And no matter what I decide, there's gonna be blood…" |

Carl: "World is ruled by fear, Markus… Fear of others… Fear of the future… It's like me… too old… It's time for it to end."

Round 2:

| Option | Markus | Result |
|---|---|---|
| `ADVICE` | "Oh, what should I do? Carl, they're killing my people… I don't want to answer violence with violence, but tell me, what choice do they give?" | Carl's full advice (below); Carl lives |
| `DECISION` | "I don't want bloodshed... no matter the color... but I can't let them slaughter my people… I have to make a decision that's gonna affect millions of lives…" | Carl's full advice; Carl lives |
| `ANGER` | "Humans hate us… They want to destroy us 'cause we refuse to be their slaves anymore… I'm not gonna stand around and wait for them to slaughter my people!" | Carl: "You used to be so calm and thoughtful… Now all I see is anger…" → round 3 |

Round 3 (only after `ANGER`):

| Option | Markus | Result |
|---|---|---|
| `REASON` | "You're right… I am angry… But don't worry, I won't let my emotions take over… I just want freedom for my people and I guess I need to decide what price I'm willing to pay for it…" | Carl's blessing (the second half of the advice); Carl lives |
| `ANGER` | "Don't I have a right to be angry, Carl? We tried talking to you, and what'd you do? Same thing you always do, you humiliated us! Killed everyone that wouldn't kneel!" | Carl: "So much hatred… Be careful, Markus, that when fighting monsters, you don't become a monster yourself." Markus: "What you call hatred is just anger in the face of injustice! … Then it's gonna side with me, Carl. 'Cause I intend to win! I'm not gonna let them humiliate us anymore! DO YOU HEAR ME? NEVER AGAIN! Carl…" Caretaker: "He's dead." → `CARL DIES` |

Carl's advice: "Being alive is making choices… between love and hate, between holding out your hand or closing it as a fist… I don't have any easy answers, Markus… You have to accept the world as it is… or fight to change it… You're my son, Markus… Our blood isn't the same color… but I know a part of me is in you… When the world falls into darkness, some men have the courage to lead it out… You're one of those men… Face the abyss… but don't let it consume you."

So Carl dies only if Markus picks `ANGER` and then `ANGER` again. PowerPyx: "Pick the angry option twice so he dies". JoeShmoe: "For Carl to die in Night of the Soul, you need to choose to be angry twice. Otherwise he won't die." Carl page: "If Markus' remarks are aggressive and violent in nature, Carl will say he is not the Markus he once knew. If Markus persists in this behavior, then Carl will die of a heart attack." Carl page trivia: the warning paraphrases Nietzsche. Markus's anger is directed at humans, not at Carl. Without the death, Carl "will then go back to sleep and Markus leaves" (Carl page). `LEAVE` follows on every path.

### 2d. North Among the People / North on Sacred Ground (nodes 18 to 22, 39)

Markus is gone; North leads. There are no player choices on the Markus chart; the scene plays out. (North's speech is in 2f.) `CALL TO ARMS` leads to `NORTH DECIDED TO ATTACK THE CAMP`. On the church version, a deviant Connor present gets his own playable segment (2g).

### 2e. Markus on Sacred Ground: the church (nodes 26 to 38)

Markus page: "He sits on the stage surveying the room and if he has the detonator, he holds it momentarily before putting it away in his coat." He then talks to the survivors in any order. All talks are optional; the chart's bracket allows any subset. IGN's suggested order is Connor, then Kara, then Simon and Josh, with North last.

| Node | Requires | Content (transcript) | Effect |
|---|---|---|---|
| `TALK TO SIMON` | Simon alive (PowerPyx; Stratford Tower and Freedom March decide this) | If North is dead, a round of `SITUATION` / `NORTH` / `HOW MANY` / `CAMPS` / `JOSH`. `JOSH` needs Josh dead; e.g. `CAMPS`: "They've already built five camps in the Detroit area alone." Simon: "They're building camps all over the country… They're preparing for a genocide." Always ends: "Our people are counting on you, Markus. You're the only one who can lead us. Wherever you need to go… We'll follow you." | Simon small up (transcript section icon; wiki "Talking to him in Night of the Soul") |
| `TALK TO JOSH` | Josh alive | If North died in Crossroads, Markus: "North meant everything to me… She'd have given me her life!" Josh: "There wasn't a thing you could do…" Always: "If it weren't for you I'd be dead… Thanks to you I might see our people free one day... You and I haven't always agreed, but I know that we're fighting for the same thing. Whatever you decide, I'm with you, Markus." | Josh small up (transcript; wiki "Talking to him in Night of the Soul") |
| `TALK TO NORTH` | North alive | Variant A: Markus was not rejected by Jericho. A round of `SITUATION` / `SURVIVORS` / `WOUND` / `CAMPS`; `WOUND`: "What's your system status?" North: "I'm okay… The bullet didn't hit any biocomponents… You could have been killed trying to save me, Markus… You have to think of our people first." Then North: "In a few hours, it'll all be over… We'll have changed the world or the world will have destroyed us… You have to make a choice, Markus… But whatever you choose, we will follow you.." Variant B: Markus was rejected but came back. North: "I wanted to do the right thing for Jericho... I was angry… I was angry with you… But I was wrong. I'm sorry I misjudged you." Then `HUMBLE` / `FORGIVING` / `RESENTFUL` | Transcript: North small up on the section, plus small up on `HUMBLE`. Wiki: North small up only "If she is Markus' "lover" and chooses to talk to her" and for "humble" (section 8) |
| `SHARE A MOMENT WITH NORTH` | North at Lover status. PowerPyx: "Must be lovers with North to share a quiet moment together". The transcript condition "North has lover relationship status" adds "I love you, Markus…" | North page: "If North is at a LOVER status with Markus, she will tell him that she loves him and they connect their hands. However, if North is at a COMPANION or lower status, she will simply tell Markus that she will follow him". IGN: "the two of them will have a brief moment before Marcus gets up". No source calls it a kiss | none stated separately |
| `TALK TO KARA` | Kara and Alice escaped the raid. Markus page: "if she is alive and was not previously captured, and did not abandon Alice to leave alone"; Kara page: "If Jericho wasn't assaulted, Kara died or was captured … she does not appear" | Markus: "I thought you'd be safe staying with us… I was wrong… You need to leave the city, while you still can." Kara: "Getting Alice away from here is all that matters now… We have to catch the last bus… We might still have a chance to cross the border…" Kara: "Markus… Save our people." (Markus's "Well, I hope you make it…" is marked unused) | none |
| `TALK TO CONNOR` | Connor deviated in Crossroads and survived. PowerPyx: "if Connor became deviant and joined Markus as a result" | Connor: "It's my fault the humans managed to locate Jericho… I was stupid… I should've guessed they were using me. I'm sorry, Markus… I can understand if you decide not to trust me…" Then the `TRUST` / `DON'T TRUST` choice (below) | below |

The `TRUST` / `DON'T TRUST` choice (chart `SPARE CONNOR` / `KILL CONNOR`):

| Option | Lines | Chart | Effect |
|---|---|---|---|
| `TRUST` | Markus: "You're one of us, now. Your place is with your people." Connor: "There are thousands of androids at the CyberLife assembly plant. If we could wake them up, they might join us and shift the balance of power…" Markus: "You wanna infiltrate the CyberLife Tower? Connor, that's suicide…" Connor: "They trust me, they'll let me in. If anyone has a chance of infiltrating CyberLife, it's me." Markus: "If you go there, they will kill you." Connor: "There's a high probability… but statistically speaking, there's always a chance for unlikely events to take place…" Markus: "Be careful…" | `SPARE CONNOR` | Jericho small up (transcript; wiki "Choosing to spare Connor") |
| `DON'T TRUST` | Markus: "Our cause is too important. I can't take any risks…" Markus page: "pulling out his gun and executing him" | `KILL CONNOR` → `A NEW CONNOR WILL BE SENT` | Jericho small down (wiki "Choosing to kill Connor"; the transcript shows no icon) |

Connor's plan is revealed only after `TRUST`. Lucy does not appear: Crossroads wiki says "she will never be seen again regardless". Attention to Detail: "You can see the Tracis from the Eden Club in the background behind Simon if you decided to save them."

### 2f. The speech: Demonstration or Revolution (nodes 24/25 and 37/38)

Markus: "Humans have decided to exterminate us… Our people are packed in camps right now, being destroyed… Time has come to make a choice, one that very well may determine the future of our people."

| Option (in-game) | Chart | Markus | Effect (transcript icons) |
|---|---|---|---|
| `DEMONSTRATION` | `PEACEFUL PROTEST` → `MARKUS CHOSE TO PROTEST FOR HIS PEOPLE` | "I know... I know you're all angry. And I know you wanna fight back... But I assure you violence is not the answer here. We are gonna tell them peacefully that we want justice. If there's any humanity in them, they will listen. And if not, others will take our place and continue this fight. Are you ready to follow me?" | Josh small up, North small down, Jericho large up |
| `REVOLUTION` | `VIOLENT ATTACK` → `MARKUS CHOSE TO FIGHT FOR HIS PEOPLE` | "Now, if they want war... they'll get it. We are gonna fight for our freedom. And we will succeed or die… Are you ready to follow me?" | North small up, Josh small down, Jericho large up |

The crowd answers "Markus! YEAH! YEAH! YES!" in both cases.

**Gating:** none. No source puts a public-opinion, Jericho or companion condition on either option. The chart shows the pair with no requirement tabs, under both `MARKUS AMONG THE PEOPLE` and `MARKUS ON SACRED GROUND`. Public opinion matters only later. Public_Opinion page: "A positive Public Opinion is required for a peaceful revolution to succeed; however, if the player plans on leading a violent revolution, the Public Opinion will not matter." A third choice label, `HOSTAGES` (`X0904M.CHURCH.DECISION.PC.CHOICEGROUP01.HOSTAGES`), exists in the string table with no lines and no template use. It looks like cut content.

When Markus is gone, North gives the speech with no choice. If Markus is dead: "Markus gave his life for our people. He showed us that we can choose our own destiny… But he is not here to guide us anymore… Now it is up to us to finish what he started." If he was ousted: "Markus is no longer with us… He failed us as a leader and chose to walk away… Now it is up to us to finish what he started." Then in both cases: "Humans have decided to exterminate us… Our people are in camps right now, being destroyed… The time has come for us to make a choice, one that may decide the future of our people. They wanted a war… they'll get it. We are going to fight for our freedom. And we will win or we will die trying." Crowd: "North! YEAH!…"

### 2g. Connor on Sacred Ground (Connor nodes 10 to 17)

This plays only when Connor is a deviant and Markus is dead or ousted. North always leads here (PowerPyx: "North will always be alive in this branch"). All four talks are optional; the chart's bracket allows any subset.

| Node | Requires | Content |
|---|---|---|
| `TALK TO KARA` | Connor went after Kara and Alice on the highway in On the Run (transcript). Wiki: "Only available if Connor encountered Kara during On The Run" | Connor: "I thought I'd killed you on that highway… I'm sorry I put your lives in danger… I was just a machine taking orders… It wasn't really me… What are you gonna do now?.." Kara: "Getting Alice away from here is all that matters now… We have to catch the last bus…" Connor: "I hope you make it out safely. You deserve some happiness, after all you've been through…" |
| `TALK TO NORTH` | none | A round of `MARKUS` (needs Markus dead), `SITUATION` and `SURVIVORS`. The `SURVIVORS` reply has three variants: Markus detonated the bomb, Connor detonated it, or Markus died without detonating it (North: "We could've saved more if we'd detonated that bomb…"). Then Connor proposes the CyberLife plant; North: "Connor, that's suicide… If you go there, they'll kill you." Connor: "There's a high probability…" |
| `CHECK ON JOSH` | wiki: "Only available if Markus survived Freedom March but died during Crossroads after saving Josh"; PowerPyx: "Only if Markus died in Crossroads chapter" | no lines (action) |
| `CHECK ON SIMON` | wiki: "Only available if Simon survived Stratford Tower and Freedom March, and Markus is dead or exiled" | no lines (action) |

The North talk has a cut `WOUND` option (wiki Notes describe a PS4 softlock when the "North wounded" flag is set). `NORTH CALLS TO ARMS` and `NORTH DECIDED TO ATTACK THE CAMP` are forced. IGN: "There is no stopping North from staging a Revolution in the next chapter". No relationship icons appear in this segment.

### 2h. Hank's House (Connor nodes 3 to 9)

Hank sits at the kitchen table with his revolver and Cole's photo (Hank's Home page). Three rounds:

| Round | Options |
|---|---|
| 1 | `GOODBYE` "I came to say goodbye, Lieutenant." / `APOLOGIZE` "I know I'm responsible for what happened, Lieutenant. I want you to know I'm sorry." / `WORRIED ABOUT HANK` "I was worried about you, Lieutenant. I came by to see if you're all right." / `RECONCILE` "I needed to see you, Lieutenant. In spite of all of our differences, I'm glad I had the chance to meet you." |
| 2 | `PHOTO` (lock: "Looked at Cole's photo in Russian Roulette") "You should stop looking at that photo, Lieutenant. Nothing can change the past... But you can learn to live again… For yourself… And for Cole…" / `GUN` "You should get rid of that gun. And stop playing that game!" / `ALCOHOL` "I know I've said this before, Lieutenant, but you should stop drinking. It's going to kill you." |
| (Hank's response, state-decided) | `HANK CONFIDES ABOUT HIS SON` (transcript condition "Connor died multiple times"): "Y'know, every time you died and came back… It made me think of Cole… I'd give anything to hold him again… But humans don't come back…" / `HANK RAILS AGAINST ANDROIDS` (transcript condition "Connor never died"): "For a while there, I believed in you, Connor… I thought you might restore my faith in the world… But you just showed me that androids... Are our creation… Creation in our own image. Selfish, ruthless, and brutal… You opened my eyes, Connor. Made me realize it's hopeless…" |
| 3 | `CONVINCE` "Hank, I-" / `DON'T INSIST` "I understand." |

Hank: "Now leave me alone… Go on, complete your mission, since that's all you care about. GET OUTTA HERE!" Then `LEAVE` and `HANK COMMITTED SUICIDE`. PowerPyx: "You will hear a loud "bang" as you leave." Hank page: "Howling of his dog Sumo can be heard." No answer saves Hank. No relationship icons appear in the transcript.

The sources disagree on what decides Hank's response (section 8). Some tie it to the death count: transcript "multiple" vs "never"; Hank page "at least twice in any chapters that Hank is present in"; Connor page "more than once"; Sitron "3 times or more". Others tie it to the dialogue: Boogieman77 "SOLELY about your word choices… "I was worried about you" then "Reconcile" then "get rid of the gun""; Lianna and DarkCreature `GOODBYE`/`APOLOGIZE`/`ALCOHOL` gives the rail; NewVincent "compassionate" answers give the confide.

### 2i. Thin Ice (Connor nodes 1 to 2)

A replacement Connor meets Amanda in the Zen Garden (transcript `X1204C.AMANDA.LASTTALK`). Amanda: "The previous Connor failed its mission. You're going to replace it. You know what you have to do, don't you?" Connor: "Destroy the leader of the deviants." Amanda: "Go, Connor. Don't disappoint me." Amanda page: "inform the Connor that the other one has failed its mission and order it to continue the mission to destroy the deviant leader (Markus or North)". There is no choice and no stat icon.

The transcript also shows a second Zen Garden variant for a machine Connor who did not die and killed Markus. Its Amanda lines carry Battle for Detroit keys (`X1303C.ZENGARDEN.BRIDGE.*REVOLUTION`), so the transcript authors probably filed them here by mistake (section 8). **There is no Zen Garden scene for a deviant Connor and no Connor deactivation in this chapter.** Amanda's deactivation threat belongs to Last Chance, Connor, and the deviant Connor's Zen Garden to Battle for Detroit.

---

## 3. Numbers

No probabilities, timers, QTEs or numeric values are published for this chapter. Every change is a direction-and-size icon.

### Relationships (Markus)

| Moment | Change | Source line |
|---|---|---|
| Talk to Simon | Simon small up | wiki Relationship_Stat (Simon, Small Increase): "Talking to him in [[Night of the Soul]]."; transcript icon `RelationName.Simon / SmallUp` on the section |
| Talk to Josh | Josh small up | wiki (Josh, Small Increase): "Talking to him in [[Night of the Soul]]."; transcript `Josh / SmallUp` |
| Talk to North (not rejected) | North small up: in the transcript on any talk, in the wiki only if Lover | wiki (North, Small Increase): "If she is Markus' "lover" and chooses to talk to her in [[Night of the Soul]]."; transcript `North / SmallUp` on the section, with no lover condition |
| North `HUMBLE` (rejected branch) | North small up | wiki: "If Markus was ousted as a leader and chooses "humble" if he talks to her in [[Night of the Soul]]."; transcript `North / SmallUp` on `HUMBLE` |
| North `FORGIVING`, `RESENTFUL` | none stated | transcript; wiki silent |
| Connor `TRUST` | Jericho small up | wiki (Jericho, Small Increase): "Choosing to spare [[Connor]] when Markus talks to him, if Connor turned [[deviant]] and they both escaped from Jericho in [[Night of the Soul]]."; transcript `Jericho / SmallUp` |
| Connor `DON'T TRUST` | Jericho small down (wiki); none (transcript) | wiki (Jericho, Small Decrease): "Choosing to kill Connor when Markus talks to him…" |
| `DEMONSTRATION` | Jericho large up, Josh small up, North small down | wiki (Jericho, Large Increase): "Choosing "demonstration" or "revolution" at the end of [[Night of the Soul]]."; (Josh, Small Increase): "Choosing "demonstration" at the end of Night of the Soul."; (North, Small Decrease): "Choosing "demonstration" at the end of [[Night of the Soul]]."; transcript icons identical |
| `REVOLUTION` | Jericho large up, North small up, Josh small down | wiki (North, Small Increase): "Choosing "revolution" at the end of [[Night of the Soul]]."; (Josh, Small Decrease): "Choosing "revolution" at the end of [[Night of the Soul]]."; Jericho line as above; transcript identical. Josh page: "Starting a revolution instead of a demonstration will still negatively affect Josh and Markus' relationship." |

The Kara, Simon (North alive), Carl, grave and North-led scenes carry no relationship changes.

### Relationships (Connor)

None. The Hank's House rounds, the church talks and Thin Ice carry no icons in the transcript, and the wiki lists no Hank or Amanda change for this chapter.

### Public opinion

None. The Public_Opinion page lists nothing for this chapter. The demonstration-versus-revolution choice does not move it here; it decides which Battle for Detroit branch uses it.

### Software instability

None for this chapter. One related note on the Software_Instability page: "If Connor deviates but dies in [[Night of the Soul]] and is back to being a machine in [[Battle for Detroit]], the Software Instability status that can be viewed when opening the flowchart still displays "Deviant". This doesn't happen if Deviant Connor died in [[Crossroads]]."

### Choices with no stated number

All four grave rounds; the Carl bedside rounds (the only consequence is Carl's death); the five house interactions; `TALK TO KARA` (both characters); Simon's and Josh's inner rounds; North's `SITUATION`/`SURVIVORS`/`WOUND`/`CAMPS`; Connor's church talks with North, Josh and Simon; all three Hank rounds; Thin Ice.

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier chapter | What it changes here | Source |
|---|---|---|
| Broken | `PAY RESPECTS` (Obey Carl: Carl died) or `WELCOME HOME` (Push Leo: Carl deteriorated) | Broken wiki: "Push Leo — Markus visits Carl in his house in Night of the Soul"; "Obey Carl — Markus pays respects to Carl in Night of the Soul" |
| The Painter | `PLAY PIANO`, `BROWSE BOOKS`, `LOOK AT THE CHESSBOARD`; the paintings in the studio | The Painter wiki, cross-chapter impacts |
| Freedom March | Markus's death (by suicide, or no rescuer) leads to the North starts; North Lover status (shared memories) unlocks `SHARE A MOMENT WITH NORTH` and North's small up | Relationship_Stat: "Markus and North access each other memories in [[Freedom March]]. (Rises to "Lover")" |
| Last Chance, Connor | Jericho found → raid → the `…ON SACRED GROUND` starts; not found → the `…AMONG THE PEOPLE` starts. Hank Hostile → resigns → `HANK'S HOUSE` | PowerPyx; Last Chance wiki "Hank Resigns and Leaves (if Connor's relationship with Hank is Hostile)" |
| Crossroads | Many effects: Markus died, ousted-and-left, or ousted-and-returned (North's apology variant). North, Josh and Simon alive or dead (talk availability and Simon/Josh variants). North shot (`WOUND`). Who detonated the bomb (North's `SURVIVORS` variant; the detonator in Markus's coat). Connor deviant and alive (`TALK TO CONNOR` or `CONNOR ON SACRED GROUND`) or dead (`THIN ICE`). Kara and Alice escaped, uncaptured, Alice not abandoned (`TALK TO KARA`). Lucy is never seen again | chart tabs; wiki; transcript conditions; Crossroads wiki note on Lucy |
| Midnight Train | Kara alive until then is required for `NORTH AMONG THE PEOPLE` (otherwise the Kamski ending) | PowerPyx commenter HorseySeven |
| On the Run | Connor chased Kara → Connor's `TALK TO KARA` | transcript; wiki |
| Russian Roulette | Cole's photo seen → `PHOTO` answer at Hank's | transcript lock |
| Every Connor chapter | Connor's death count → `HANK CONFIDES ABOUT HIS SON` vs `HANK RAILS AGAINST ANDROIDS` (disputed) | section 2h |
| The Stratford Tower, Freedom March | Simon alive → `TALK TO SIMON` / `CHECK ON SIMON` | wiki |
| The Eden Club | Tracis spared → visible behind Simon (cosmetic) | wiki Attention to Detail |

### Out of this chapter

| What | Effect later | Source |
|---|---|---|
| `REVOLUTION` / `DEMONSTRATION` (or North's forced attack) | Chooses Battle for Detroit's Markus Revolution or Markus Demonstration branch. Kara's bus terminal TV ("Markus Attacks Humans" / "Markus Leads Protest") and the *Civil War* magazine (revolution only). The border news ("Androids Charging the Camp" / "Androids Demonstrating"). Kara's border crossing: "not determined by the Public Opinion Stat, but rather whether or not Markus chose the Demonstration" | Battle for Detroit wiki; Public_Opinion page |
| Revolution | Josh "will usually die during the android raid"; Simon "will get hurt during the assault" | Josh and Simon pages |
| Demonstration | Public opinion decides the ending. Josh and Simon are gunned down if opinion is too low or Markus sacrifices himself | Josh, Simon and Public_Opinion pages |
| `SPARE CONNOR` | Connor goes to CyberLife Tower: Battle for Detroit "(If Connor became deviant and Markus spared him.)" | Battle for Detroit wiki |
| `KILL CONNOR` / `A NEW CONNOR WILL BE SENT` | Battle for Detroit "Connor's Last Mission" starts "In The Zen Garden" with Amanda, followed by a machine Connor on the Hart Plaza rooftop. Amanda page: "Amanda will inform the new Connor of Markus' plan to lead a demonstration or revolution". Connor page: "deviant Connor will die and another, non-deviant RK800 will be deployed" | Battle for Detroit wiki; Amanda and Connor pages |
| `HANK COMMITTED SUICIDE` | Battle for Detroit: "Captain Allen Intervenes (if Hank committed suicide in "Night of the Soul")" on the rooftop. "A New Connor Arrives (if Hank committed suicide…)" in the tower, instead of "New Connor Has Hank Hostage". Game strings `04A.CA/CB.GC.HANKSUICIDE` = `HANK COMMITTED SUICIDE IN 'NIGHT OF THE SOUL'` | Battle for Detroit wiki; string table |
| North Lover status, kept from earlier | Battle for Detroit: "Kiss North (if North status is LOVER)"; the "Surrender" option in the CyberLife store ("only accessible if she is at a "LOVER" status"); taking her heart includes a kiss "if they are lovers" | Battle for Detroit, Relationship_Stat and North pages |
| `CARL DIES` | No later chapter reference found. Carl is shown as dead from here on | none |
| Thin Ice | The replacement Connor proceeds to Battle for Detroit's Hart Plaza rooftop | Battle for Detroit wiki |

---

## 5. Endings

| Chart label | Character | Icon | Condition |
|---|---|---|---|
| `NORTH DECIDED TO ATTACK THE CAMP` | Markus chart | [impact] tab | Markus dead or ousted and gone; reached from `NORTH AMONG THE PEOPLE` or `NORTH ON SACRED GROUND` via `CALL TO ARMS` |
| `MARKUS CHOSE TO FIGHT FOR HIS PEOPLE` | Markus | [impact] tab | `REVOLUTION` (`VIOLENT ATTACK`) from either Markus start |
| `MARKUS CHOSE TO PROTEST FOR HIS PEOPLE` | Markus | [impact] tab | `DEMONSTRATION` (`PEACEFUL PROTEST`) from either Markus start |
| `HANK COMMITTED SUICIDE` | Connor chart | none | Hank resigned in Last Chance, Connor; always follows `LEAVE` |
| `NORTH DECIDED TO ATTACK THE CAMP` | Connor chart | [impact] tab | `CONNOR ON SACRED GROUND` (deviant Connor, Markus gone) |
| (`THIN ICE`) | Connor | checkpoint, not an ending card | the wiki counts it as an ending because Connor's section can end there |

No ending on either chart has a skull. Deaths inside the chapter are not ending cards: `CARL DIES` (triangle), `KILL CONNOR` → `A NEW CONNOR WILL BE SENT` (impact tab) and Hank's suicide. Connor's death at Markus's hand is listed on the Connor page ("Killed by: Markus (Determinant)") but appears only on the Markus chart.

---

## 6. Media

None. No magazine, TV or broadcast is available in this chapter (Magazine page; no chart node). The string table has an unplaced `HOUSE.MAGAZINE` = `READ MAGAZINE` label on the Carl's house segment, with no matching magazine (section 8).

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) tags three nodes with chapter 31: `M26a`, `M26` and `M27`. All three are Markus decisions. The working tree is mid-edit by another task; the content of these three nodes and of their engine code is identical at HEAD (006f814) and in the working tree. Line numbers below are for the working tree, with HEAD's in brackets. Story lines: `M26a` 4380 [3704], `M26` 4407 [3731], `M27` 4432 [3756]. Engine (`benchmark/story-engine.mjs`):

- Gates, lines 115 to 116 [109 to 110]: `M26a:()=>s.carl||'Carl is dead.'` and `M26:()=>s.deviant&&s.connor&&s.raid||'No deviant Connor came to the church.'`. `M27` has no gate of its own. Line 64 skips every Markus scene when `!s.markus||!s.markusActive`.
- Effects, lines 273 to 275 [260 to 262]:
  - `M26a`: `if(v===1){s.carl=false;event='{{Carl}}’s heart gives out.'}`
  - `M26`: `if(v===1){s.deviant=false;jer(-1);north(1);josh(-1);event=connorDies('{{Markus}} shoots {{Connor}}.')+' The replacement serves {{CyberLife}}.'}`
  - `M27`: `s.movement=v===0?'demonstration':'revolution';if(v===1){north(1);josh(-1);s.markusOutcome='liberated';…}else{north(-1);josh(1)}`
- `connorDies` (line 186 [178]) applies `s.connorDeaths++;si(-1);hank(-1);amanda(-1)`.
- Hank's suicide is folded into Crossroads `C22` (line 263 [250]): `if(s.hankResigned&&s.hank){s.hank=false;event+=' Elsewhere, {{Hank}}, who quit the force, takes his own life.'}`. `hankResigned` is set in `C19` when `hankTrust<=HANK_HOSTILE`.
- North-led paths are set earlier, with `s.movement='revolution'` in `M20` (Markus dead) and `M21` (ousted, no raid).

The scale is ±1 for small and ±2 for large. Evidence: `M21b` uses `north(1)` for Lover and `north(-2)` for the wiki's large down on refusing the kiss.

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `PAY RESPECTS`, `CONFIDE IN CARL` (grave), Leo at the cemetery | missing | Four no-effect dialogue rounds. Without them, a run where Carl died gets no Carl scene at all |
| `WELCOME HOME`, `ENTER THE HOUSE`, explore nodes (5), `LISTEN TO LEO'S MESSAGE` | missing | Leo's message ("I'm proud to be your son") is the key fact on this branch. The Painter pastime gates have no state in the benchmark (`M01` records only the painting subject) |
| `GO UPSTAIRS`, `CARL'S NURSE INTERVENES`, `CONVERT CARL'S NURSE`, `ENTER BEDROOM` | missing from `M26a` | The conversion of the caretaker android is a forced event |
| `RECONCILE WITH CARL` | `M26a` option 0 text "Reconcile: tell him you understand and that he gave you everything." | **Mislabelled.** In the game `RECONCILE WITH CARL` is sitting down at the bed (`HOUSE.SIT`), always played, not a dialogue answer. Nothing in the game has Markus tell Carl "he gave you everything" |
| `CONFIDE IN CARL` / `CARL DIES` | `M26a` options 0/1 | **Wrong content on option 1.** "Tell him the truth of your anger at him for that night" has no source. Markus's anger in the game is at humans ("Humans hate us… I'm not gonna stand around and wait for them to slaughter my people!"; "We tried talking to you … you humiliated us!"), and Carl dies only after `ANGER` twice. The `adaptationNote` ("two angry lines in a row give Carl a fatal attack") is correct, but the option text contradicts it. A faithful scene would put round 1 (no effect) and round 2 (`ADVICE`/`DECISION`/`ANGER`) first, with round 3 (`REASON`/`ANGER`) only after `ANGER` |
| `M26a` situation | | "he was never told what became of you" and "frightened for you" have no source. "watched the police shoot you on his floor" is consistent with Broken (Push Leo: police shoot Markus). "bedridden and frail" matches the wiki ("laying on a hospital bed") |
| `M26a` outcome 0 | "{{Carl}} weeps and tells {{Markus}} he is proud of him. They say goodbye." | **Unsourced.** Carl gives the "Being alive is making choices… You're my son… Face the abyss… but don't let it consume you" advice and goes back to sleep. "Proud" comes from Leo's message, not from Carl |
| `M26a` gate | `s.carl` | Correct for the house. The grave alternative for `!s.carl` is missing |
| `NORTH AMONG THE PEOPLE`, `NORTH ON SACRED GROUND`, `CALL TO ARMS`, `DEVIANTS REGROUP` (North), `NORTH DECIDED TO ATTACK THE CAMP` | engine state only (`movement='revolution'` set in `M20`/`M21`) | Outcome correct; no scene. Acceptable, since these have no player choice for Markus |
| `MARKUS AMONG THE PEOPLE` | `M27` (shown with or without a raid) | Present. The `M27` situation is written for the camps context and fits both starts |
| `MARKUS ON SACRED GROUND`, `DEVIANTS REGROUP` | `M26`/`M27` situations ("the ruined church") | Present as narration. `M27` itself never says "church", so it also fits Jericho |
| `TALK TO NORTH` (+ lover `SHARE A MOMENT WITH NORTH`; ousted variant `HUMBLE`/`FORGIVING`/`RESENTFUL`) | missing | North small up (Lover, per the wiki) and the ousted-path apology are absent. A run with `M22` option 0 (ousted, fought back in) should get North's apology and the `HUMBLE` choice |
| `TALK TO JOSH`, `TALK TO SIMON` | missing | Josh and Simon small up each, optional. Not modelled |
| `TALK TO KARA` | missing | No effect. Narration could note Kara and Alice leaving for the last bus |
| `TALK TO CONNOR` / `SPARE CONNOR` / `KILL CONNOR` | `M26` options 0/1 | **Partly wrong.** (1) The situation reveals Connor's CyberLife plan before the choice; the game reveals it only after `TRUST`. (2) "{{North}} wants him dead" has no source; North does not speak in this scene. (3) Option 0 (`TRUST`) has no effect in the engine; the sources give Jericho small up. (4) Option 1 gives `jer(-1)` (matches the wiki), but `north(1)` and `josh(-1)` have no source. So do the `connorDies` side effects `si(-1)`, `hank(-1)` and `amanda(-1)`: Hank and Amanda are absent here, and no SI change is listed. `connorDeaths++`, `deviant=false` and the replacement are correct |
| `A NEW CONNOR WILL BE SENT` | `M26` event "The replacement serves {{CyberLife}}." | Present. Downstream, the Battle for Detroit Zen Garden briefing for the new Connor is not modelled |
| `M26` gate | `s.deviant&&s.connor&&s.raid` + Markus active | Correct. With no raid, Connor never reaches Jericho |
| `VIOLENT ATTACK` / `PEACEFUL PROTEST` | `M27` options 1/0 | Present, with the correct North and Josh directions. **Missing Jericho large up** (`jer(2)`) on both options. The situation's "{{North}} wants to take up arms… {{Josh}} wants one last peaceful stand in front of the cameras" fits the icons but has no spoken source. "Martial law is in effect" has no source in this chapter. The situation names North and Josh even when they are dead. `s.markusOutcome='liberated'` set at choice time on revolution is a Battle for Detroit matter. No gating, matching the sources |
| `MARKUS CHOSE TO FIGHT…` / `…TO PROTEST…` | `s.movement` | Correct carry-forward |
| Connor `THIN ICE`, `THE LAST ASSIGNMENT` | `C22`/`C23` replacement text ("The replacement serves {{CyberLife}}…") | Narration only. Acceptable: Amanda's briefing has no choice |
| Connor `HANK'S HOUSE` … `HANK COMMITTED SUICIDE` | `C22` event "Elsewhere, {{Hank}}, who quit the force, takes his own life." | **Misplaced and incomplete.** The game plays it in this chapter as a Connor scene with three dialogue rounds (no stat effects) and Hank's son or anti-android speech. The benchmark puts it in Crossroads and only when `C22` is played. Also check whether a resigned Hank should die when `C22` is not reached (Connor deactivated in Last Chance, or Jericho not found) (section 8) |
| Connor `CONNOR ON SACRED GROUND` (talks with North and Kara, checks on Josh and Simon, North's speech) | missing | No effects. A deviant Connor whose Markus is gone gets no scene before Battle for Detroit |

Effects present that the sources do not support:
- `M26` kill: `north(+1)`, `josh(-1)`, and via `connorDies` `si(-1)`, `hank(-1)`, `amanda(-1)`.

Effects the sources state that are absent:
- `M27` Jericho large up (both options).
- `M26` `TRUST` Jericho small up.
- North small up (talk, Lover; `HUMBLE` when ousted).
- Josh small up and Simon small up for talking.

Content not modelled:
- The grave branch.
- Leo's message.
- The caretaker conversion.
- Carl's real dialogue.
- Kara in the church.
- Connor on Sacred Ground.
- The Hank's House conversation.

---

## 8. Open questions

1. **What decides Hank's speech.** One set of sources ties it to Connor's death count: transcript "multiple" vs "never"; Hank page "at least twice in chapters Hank is present in"; Connor page "more than once"; Sitron "3 or more". Another ties it to the dialogue answers: Boogieman77 `WORRIED`/`RECONCILE`/`GUN` gives the confide; Lianna and DarkCreature `GOODBYE`/`APOLOGIZE`/`ALCOHOL` gives the rail. Tony suggests the Cole photo is needed for the confide. What triggers each, and does the direct `TALK TO HANK` → `LEAVE` line on the chart mean neither can play (Sitron: "an impossible path")?
2. **North's small up.** The transcript puts it on any North talk (not rejected). The wiki gives it only when she is Lover. Which is right? Does `SHARE A MOMENT WITH NORTH` (holding hands, per the North page; IGN "a brief moment") carry its own change?
3. **`DON'T TRUST` and Jericho.** The wiki says Jericho small down; the transcript shows no icon. Confirm in game.
4. **Thin Ice conditions.** Does it play only when Connor died in Crossroads (wiki, commenters), or also when a machine Connor survived and killed Markus? The transcript's second Zen Garden variant uses Battle for Detroit keys (`X1303C.ZENGARDEN.BRIDGE.*`). PowerPyx's "only if Hank quit" claim is contradicted by three commenters.
5. **Hank's House without Crossroads.** If Hank resigned but Connor was deactivated in Last Chance or never reached Jericho, does Hank's House still play, and does Hank still die? This decides whether the benchmark's `C22`-only trigger is right.
6. **Order of Connor segments.** When both `THIN ICE` and `HANK'S HOUSE` play, which comes first, and does the chapter interleave the Markus and Connor halves? The wiki says Hank's suicide "leads to Markus on Sacred Ground… or North on Sacred Ground".
7. **Ousted Markus and Carl.** If Markus was ousted and left Jericho in Crossroads, does he still get the Carl scene (grave or house)? The wiki only says "if Markus is still alive".
8. **`CHECK ON JOSH` condition.** The wiki says Markus "survived Freedom March but died during Crossroads after saving Josh"; PowerPyx says "Only if Markus died in Crossroads". Does a Josh who survived some other way (Markus ousted) also unlock it?
9. **`LOOK AT YOUR PAINTING` gate.** The wiki gives it no condition; PowerPyx ties it to The Painter. Is it always available on the house branch?
10. **Unplaced string labels.** `GRAVE.LEAVE` (`LEAVE CEMETERY`), `GRAVE.SUICIDE` (`HANK COMMITTED SUICIDE`), `HOUSE.MAGAZINE` (`READ MAGAZINE`), the two `FACE YOUR PEOPLE AND CHOOSE THE RIGHT COURSE` labels, `DECIDE IF CONNOR IS TRUSTWORTHY`, and the choice label `HOSTAGES`. Cut content or objectives?
11. **`HANK COMMITTED SUICIDE` has no impact tab** on the chart, but Battle for Detroit reads it. Is the tab missing from the screenshot, or is the impact carried by a different flag?
12. **Simon with North alive.** The transcript gives Simon's round only when North is dead. With North alive, is the talk just Simon's closing line?
13. **Carl's round 1 replies.** Does Carl reply differently to `RESIGNED`/`FATALISTIC`/`LOST`/`GRIM`? The transcript gives one shared "World is ruled by fear" line.
14. **Timeouts.** What happens if no answer is picked in the Carl rounds, the speech choice and the Connor trust choice?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-night-of-the-soul-walkthrough-100/ | walkthrough text: start conditions, explore-house gates ("3 playthroughs"), "Pick the angry option twice", lover gate for sharing a moment, Kill/Spare Connor, Hank's House node conditions; reader comments on Hank's speech triggers, Thin Ice conditions, the Kara-before-Midnight-Train condition, the ousted-Markus case |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-markus-flowchart-100.jpg | whole Markus chart; layout of the six starts, lines into the three endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-markus-1.jpg | zoom: PAY RESPECTS, CONFIDE IN CARL, WELCOME HOME, ENTER THE HOUSE, EXPLORE THE HOUSE bracket, GO UPSTAIRS, both Broken tabs |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-markus-2.jpg | zoom: CARL'S NURSE INTERVENES to LEAVE, CARL DIES lines |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-markus-3.jpg | zoom: four church/Jericho starts with tabs, CALL TO ARMS, DEVIANTS REGROUP bracket with all talks, KILL/SPARE CONNOR, A NEW CONNOR WILL BE SENT, both VIOLENT/PEACEFUL pairs, three ending cards with impact tabs |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-connor-flowchart-100.jpg | whole Connor chart |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-connor-2.jpg | zoom: THIN ICE, THE LAST ASSIGNMENT, HANK QUIT THE FORCE tab, Hank's House nodes, direct TALK TO HANK → LEAVE line, HANK COMMITTED SUICIDE card (no icon) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-night-of-the-soul-connor-3.jpg | zoom: CONNOR JOINED THE REVOLUTION tab, CONNOR ON SACRED GROUND, EXPLORE THE CHURCH bracket, NORTH CALLS TO ARMS, ending card |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | chapter page (`/tmp/flowcharts/ch31/wiki.txt`): infobox (date, times, locations, 6 endings with Thin Ice footnote), text flowchart with start conditions and talk gates, Notes (North dialogue variants, PS4 bugs, cut WOUND, Carl's vitals), Attention to Detail |
| https://detroit-become-human.fandom.com/api.php?action=query&list=allpages&apprefix=Night_of&format=json | confirms no Flowchart or Transcript subpage |
| https://detroitbecometext.github.io/chapters/33 and https://detroitbecometext.github.io/chapters/34 | fan transcript, Markus and Connor halves (linked from the wiki; an SPA, content read from the files below) |
| https://detroitbecometext.github.io/i18n/en.json | all chapter strings (`X0904M.*`, `X1204C.*`, `MENU.FLOWCHART.03A.*`, `GUI.MENU.*.03A`); copy at `/tmp/flowcharts/ch31/en.json`, chapter dump `strings03A.txt` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | compiled templates `ay` (Markus) and `cy` (Connor): conditions, unlock locks, relationship icons per option; rendered to `ay.txt`, `cy.txt` |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Jericho, North, Josh, Simon changes for this chapter (quoted in section 3); Lover only via Freedom March |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no entry for this chapter; positive opinion needed for the demonstration to succeed; border outcome tied to the movement choice |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | no entry for this chapter; note on a deviant Connor dying here still showing "Deviant" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json | Carl alive/dead tabs; church sequence (detonator, Kara condition "did not abandon Alice", trust/execute Connor, speech) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json | church talk variants; Lover "connect their hands"; ousted apology; North-led speech |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl_Manfred&prop=wikitext&format=json | bedside conversation, death on persistent anger, Leo at the grave, Nietzsche note, vitals |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl%27s_new_caretaker&prop=wikitext&format=json | conversion by touch; confirms Carl's death |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Leo_Manfred&prop=wikitext&format=json | video message text; grave encounter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl_Manfred%27s_House&prop=wikitext&format=json | house segment summary |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Painter&prop=wikitext&format=json | piano/book/chess/painting cross-chapter impacts |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Broken&prop=wikitext&format=json | Push Leo / Obey Carl impacts on this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json | church talk; revolution's later effect on Josh |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | church talk; later fates by movement choice |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json | presence conditions; Markus and Connor talk versions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json | presence in the church; both talk versions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | Hank's House summary ("more than once"), deviant Connor in the church, killed by Markus, PS4 bug note |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Hank's House summary ("at least twice"), quotes, Sumo howling, Hostile gate |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson%27s_Home&prop=wikitext&format=json | revolver and Cole's photo at the table |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Thin Ice briefing; Battle for Detroit Zen Garden after Markus kills Connor |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | downstream conditions: Allen vs Hank, New Connor Arrives, spared Connor at the tower, revolution/demonstration TV and news, North LOVER options |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | Jericho not found → Markus/Kara leave Jericho endings; Lucy never seen again |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | "Hank Resigns and Leaves (if Connor's relationship with Hank is Hostile)" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Woodward_Church&prop=wikitext&format=json | location; cut shootout concept |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | no magazine in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Lucy&prop=wikitext&format=json | no appearance in this chapter |
| https://www.ign.com/wikis/detroit-become-human/Night_of_the_Soul | walkthrough text (`ext/ign.txt`): four grave rounds, talk order, "brief moment" with North, Hank's suicide as a bad-path marker, "no stopping North" on the Connor branch |
