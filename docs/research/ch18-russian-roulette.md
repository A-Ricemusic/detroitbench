# Chapter 18: Russian Roulette (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots and walkthrough text (including its reader comments), the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, magazine, character and later-chapter pages, and the fan transcript at detroitbecometext.github.io (chapter 18). The transcript's in-game strings were read from its `i18n/en.json` (keys `X0601C` for the Zen Garden, `X0602C` for Hank's house, `MENU.FLOWCHART.06CA` for the chart labels). Its conditions and stat icons came from the compiled chapter template in `chunk-JCLJBPDO.js` (function `yL`), rendered to text with a small script. Working files are in `/tmp/flowcharts/ch18/` (not committed): `wiki.txt`, `pp.txt`, `rr_1.jpg` to `rr_6.jpg`, `crops/`, `strings.txt`, `transcript.txt`, and the renders of The Bridge (`x_KL.txt`), Night of the Soul (`x_cy.txt`) and Connor at the CyberLife Tower (`x_gy.txt`). The wiki chapter page is a stub with a text flowchart and relationship list. It has no Probability, Software Instability or Public Opinion section, and the allpages query for "Russian" returns only the chapter page itself, with no `/Flowchart` or `(Transcript)` subpage.

Game date and time (wiki infobox; transcript "NOV 6TH, 2038", "PM 07:51"): November 6, 2038, 07:51PM. Location: Hank's house, Detroit. Objectives (infobox): "Find Amanda", "Look for Lt. Anderson", "Wait for Hank". Wiki: "This chapter has only one outcome." (`|endings=1`). PowerPyx: "Triggers automatically after completing the Zlatko Chapter."

Summary: 30 chart nodes plus 2 bracketed phase labels (`FIND LT. ANDERSON`, `WAIT FOR HANK`), 3 checkpoints, 1 ending (`LEFT FOR EDEN CLUB`, no icon). The chart has 2 player choice sets (`DISTANT ATTITUDE`/`UNDERSTANDING ATTITUDE`, and three shirts) and 1 state-decided pair (`CALM HANK'S DOG`/`RILE HANK'S DOG`, decided by whether Connor asked about the dog in Waiting for Hank...). There are 8 off-chart dialogue rounds: 4 with Amanda, 2 in the bathroom, the shirt prompt and the gun question. No probabilities, no software instability changes and no public opinion changes. Relationship changes: Amanda reacts to the outcome of The Nest (and of Partners) and to two dialogue answers. Hank's only documented change is a small down on waking him if Connor died in The Nest. One cross-chapter impact node: `FIND PICTURE OF HANK'S SON`. The chapter has no drive and no conversation in the car: Connor arrives by taxi and the chapter ends in the house.

---

## 1. Flowchart transcription

Read from `rr_1.jpg` (whole chart), `rr_2.jpg` (Zen Garden zoom), `rr_3.jpg` (`FIND LT. ANDERSON` zoom), `rr_4.jpg` (house entry to attitude zoom), `rr_5.jpg` (shirts, `WAIT FOR HANK`, ending) and `rr_6.jpg` (ending zoom), with crops of the bracket connectors (`crops/find_lines.jpg`, `crops/wait_top.jpg`). The header shows `100% COMPLETED` / `RUSSIAN ROULETTE`. The PowerPyx screenshots do not show the world stats panel.

Icon key (as drawn, same conventions as the ch07 and ch12 notes): [arrow] = action, [triangle] = event the game plays, [choice] = overlapping-squares marker before a group of alternatives, [lock] = yellow tab with an open padlock (cross-chapter impact, as on `CARLOS' ANDROID SELF-DESTRUCTS` in ch12). Blue fill = reached on the photographed save. Grey with a black arrow = shown but not reached on that save. No skull, no-entry, check, cross or trophy icon appears anywhere on this chart.

### Zen Garden

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `EMERGE IN THE ZEN GARDEN` | checkpoint (large card with image of Amanda under an umbrella, "LOAD CHECKPOINT") | chapter start |
| 2 | `JOIN AMANDA` | [arrow] | #1. The whole Amanda conversation sits inside this node; there is no separate "talk" node |

### Arriving at Hank's house

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 3 | `ARRIVE AT HANK'S PLACE` | checkpoint (large card with image of the taxi outside the house) | #2. Two lines leave it: one into the `FIND LT. ANDERSON` bracket, one (blue on this save) running along the bottom straight to #11 |
| - | `FIND LT. ANDERSON` | bracketed phase label (not a node) | encloses #4 to #10; every item has its own line from the bracket (no item depends on another) |
| 4 | `RING BELL` | [arrow], grey | upper fan |
| 5 | `RING AGAIN` | [arrow], grey | upper fan |
| 6 | `CHECK CAR` | [arrow], grey | upper fan |
| 7 | `CHECK BEDROOM WINDOW` | [arrow], grey | upper fan |
| 8 | `CHECK FRONT LIVING ROOM WINDOW` | [arrow], grey | lower fan (printed `CHECK FRONT LIVING` / `ROOM WINDOW`) |
| 9 | `CHECK BACK LIVING ROOM WINDOW` | [arrow], blue | lower fan (printed `CHECK BACK LIVING ROOM` / `WINDOW`) |
| 10 | `KNOCK ON DOOR` | [arrow], grey | lower fan |
| 11 | `SPOT HANK AND BREAK IN` | [arrow] | bracket exit, and the direct line from #3 |

### Inside the house

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 12 | `ENTER HOUSE` | checkpoint (large card with image of Connor at the kitchen window) | #11 |
| 13 | `HANK'S DOG ATTACKS` | [triangle] | #12 |
| 14 | `CALM HANK'S DOG` | [choice] pair, grey | #13; state-decided (see section 2) |
| 15 | `RILE HANK'S DOG` | [choice] pair, blue | #13 |
| 16 | `ANALYZE HANK` | [arrow] | #14/#15 |
| 17 | `TAKE HANK TO THE BATHROOM` | [arrow] | #16 (printed `TAKE HANK TO THE` / `BATHROOM`) |
| 18 | `DISTANT ATTITUDE` | [choice] pair, grey | #17 |
| 19 | `UNDERSTANDING ATTITUDE` | [choice] pair, blue | #17 |
| 20 | `TAKE HIPPY SHIRT` | [choice] trio, blue | #18/#19 |
| 21 | `TAKE STREAKY SHIRT` | [choice] trio, grey | #18/#19 |
| 22 | `TAKE STRIPY SHIRT` | [choice] trio, grey | #18/#19 |

### Wait for Hank and ending

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `WAIT FOR HANK` | bracketed phase label (not a node) | encloses #24 to #27; the two magazine nodes hang off lines that leave the bracket's top and bottom connectors and sit just outside the bracket frame |
| 23 | `READ "PULL THE PLUG?"` | [arrow], grey | top, outside the frame |
| 24 | `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` | [arrow], blue | upper fan (printed `LEARN HANK WAS PLAYING` / `RUSSIAN ROULETTE`) |
| 25 | `FIND PICTURE OF HANK'S SON` | [lock] (yellow tab in the icon position), blue | upper fan, own line; cross-chapter impact (printed `FIND PICTURE OF HANK'S` / `SON`) |
| 26 | `LEARN HANK'S INTERESTS` | [arrow], grey | lower fan |
| 27 | `PET HANK'S DOG` | [arrow], grey | lower fan |
| 28 | `READ "TAINTED LOVE"` | [arrow], grey | bottom, outside the frame |
| 29 | `HANK IS READY` | [triangle] | `WAIT FOR HANK` bracket exit |
| 30 | `LEFT FOR EDEN CLUB` | ending (large card with image of Hank petting Sumo, Connor behind him), no icon | #29 |

Total: 30 nodes (excluding the two bracket labels). Blue on the PowerPyx save: #1 to #3, #9, #11 to #13, #15 to #17, #19, #20, #24, #25, #29, #30. Grey: `RING BELL`, `RING AGAIN`, `CHECK CAR`, `CHECK BEDROOM WINDOW`, `CHECK FRONT LIVING ROOM WINDOW`, `KNOCK ON DOOR`, `CALM HANK'S DOG`, `DISTANT ATTITUDE`, `TAKE STREAKY SHIRT`, `TAKE STRIPY SHIRT`, both reads, `LEARN HANK'S INTERESTS`, `PET HANK'S DOG`. PowerPyx's text says they did every `FIND LT. ANDERSON` item, so the grey there only means "not on the last-played path".

In-game label strings (`MENU.FLOWCHART.06CA`) match the chart exactly. The string keys show that the shirt nodes were renamed from colours: `RED` = `TAKE HIPPY SHIRT`, `BLUE` = `TAKE STREAKY SHIRT`, `GREEN` = `TAKE STRIPY SHIRT`. The table also holds labels that do not appear on the chart: `COVER FOR HANK` / `DON'T COVER HANK` (keys `SUPPORT`/`DONT`), `HANK'S SUICIDE ATTEMPT DISCOVERED`, `PICTURE OF HANK'S SON FOUND`, and a second `PET HANK'S DOG` (key `DOG`). These look like cut or internal states.

The wiki's text flowchart lists the same items with the same structure: "Find Lt. Anderson (or go right to Spot Hank and Break In)" with the seven checks nested, "Calm Hank's Dog (if Connor learned the dog's name in Waiting for Hank...) OR Rile Hank's Dog (if not)", "Distant Attitude (choosing any option other than "rational") OR Understanding Attitude (choosing "rational" option)", the three shirts, and the six `Wait for Hank` items with `{{Icon|impact}}` on the photo. The wiki adds "Analyze Hank (Optional: Look at Sumo laying near Hank)". It writes "Emerge in the Zen Garden (checkpoint)", "Arrive at Hank's Place (checkpoint)" and "Enter House" without "(checkpoint)", though PowerPyx and the chart's large card make `ENTER HOUSE` a checkpoint.

---

## 2. Choices and gates

Option labels and lines are from the in-game strings. Stat icons are from the transcript template unless stated otherwise.

### 2a. Zen Garden (nodes 1 and 2, `JOIN AMANDA`)

Connor: "Hello, Amanda." Amanda: "Connor, I've been expecting you… Would you mind a little walk?" Then the reaction to The Nest (transcript condition groups, nested):

| Condition (transcript wording) | Amanda's line | Amanda |
|---|---|---|
| "Rupert wasn't caught in The Nest" and "Ortiz's android wasn't found in Partners" | "Two investigations, two failures… That's very disappointing. I expected more from our best model." | large down |
| "Rupert wasn't caught in The Nest" and "Ortiz's android was found in Partners" | "That deviant seemed to be an intriguing case. A pity you didn't manage to capture it…" | none in the transcript (the wiki gives a small down; see section 3) |
| "Rupert was caught in The Nest" | "Congratulations, Connor, you managed to find that deviant. Tell me, what did you learn?" | large up |
| "Connor died in The Nest" (death unlock) | "The last Connor was unfortunately destroyed. Its memory has been transferred to you, but some data may have be lost in the process… I hope that you will be more careful." Connor: "I will do my best, Amanda." Amanda: "So, what did we learn?" | small down |

"Rupert was caught" here means the Nest ending `Rupert Committed Suicide` (Connor followed Rupert instead of saving Hank, and Rupert jumped). "Wasn't caught" covers `Rupert Not Found` and both `Rupert Got Away` endings (lost sight, or saved Hank). The string table also has an unconditioned `DEADBEFORE` line ("The last Connor was unfortunately destroyed. I hope that you will be more cautious."), which the transcript does not place.

Question 1 (only on the "wasn't caught" branch):

| Option | Line | Effect |
|---|---|---|
| `PRAGMATIC` | "I agree. I may not be suited for this investigation. Maybe you should consider replacing me." | Amanda small up |
| `EXPLAIN` | "Deviants are completely irrational, which makes it difficult to anticipate their behavior… but I should have been more effective." | none |
| `NO EXCUSE` | "I have no excuse. I should have been more efficient." | none |

Amanda: "Did you manage to learn anything?"

Question 2 (all branches). Transcript note: "Amanda will always answer this after the first choice" with "What else?", so Connor gives two of these:

| Option | Line | Requires |
|---|---|---|
| `DEVIANT` | "It was working under a false identity, at a nearby urban farm. This was the first time we've seen deviants blending in with the human population..." | "Found Rupert's ID in The Nest" (lock). Transcript: "it seems that it's actually impossible to access it in the game"; wiki Unused Content: "inaccessible due to a scripting bug" |
| `DIARY` | "I found its diary, but it was encrypted. It may take weeks to decipher." | "Found Rupert's diary in The Nest" (lock) |
| `SIGNS ON WALLS` | "The walls of the apartment were covered with drawings of labyrinths and other symbols. Like the other deviants, it seemed obsessed with rA9." | "Observed the signs on the wall in The Nest" (lock) |
| `BIRDS` | "It was fascinated by birds. We've seen deviants interested in other lifeforms like insects or pets, but nothing like this." | none |

No stat effect on question 2.

Question 3 (only if "Connor caught Rupert in The Nest"). Amanda: "You came very close to capturing that deviant… It's a pity you let it self-destruct…" (Amanda small down on this line):

| Option | Line | Effect |
|---|---|---|
| `EXCUSE` | "It was in Lieutenant Anderson's custody. I couldn't anticipate that he would let it get away." | none |
| `HESITATED` | "It claimed that it was innocent, that it didn't do anything wrong... I was confused for a moment… It was a mistake." | Amanda small down |
| `LAST WORDS` | "I made a mistake… It said 'rA9 save me' before it jumped from the roof. I should have anticipated what it would do." | none |
| `EXPLAIN` | "I knew deviants had a tendency to self-destruct under extreme stress, but I didn't expect it to jump from the roof. I should have anticipated that." | none |

On "Connor failed to catch Rupert" the transcript marks the follow-up as unused content: Amanda "How did it manage to get away?", `TRUTH` ("Lieutenant Anderson was in danger. I had to choose between pursuing the deviant or saving a human life." Amanda: "How important is the life of a single police lieutenant by comparison?.. Nothing should distract you from your mission, Connor. Nothing.") / `LIE` ("It knew the urban farm very well..."). The wiki's Unused Content describes the same exchange.

Question 4, "How is your relationship with the Lieutenant developing?":

| Option | Line | Requires |
|---|---|---|
| `SAVING HANK` | "He seemed grateful that I saved his life on the roof. He didn't say anything, but he expressed it in his own way..." | "Saved Hank in The Nest" (lock) |
| `CONNOR'S DEATH` | "He seems to find it difficult when a Connor is destroyed and replaced. I know humans have difficulty dealing with loss..." | "Connor died before" (death unlock) |
| `NEGATIVE` | "He is openly hostile towards me, and continues to show no interest in the investigation. Cooperating with him is a real challenge." | none shown |
| `AMBIGUOUS` | "It's improving. I'm coming to know him better, and he's growing accustomed to my presence." | none shown |
| `POSITIVE` | "It's improving. I've come to understand him better, and he's growing accustomed to my presence." | none shown |

No stat effect on question 4. The transcript does not show any Hank-level gate on `POSITIVE`/`NEGATIVE` (see Open questions).

Unused (transcript: "Due to a bug this will never trigger"; wiki Unused Content, dragonbane restoration): Amanda asks about the AX400 from On the Run, with `RATIONAL` (Amanda small up), `EXCUSE` (small down), `TROUBLED` (small down), and a small down if Kara was not found. These have no effect in the shipped game.

Close (shown after the unused block, so it plays either way): Amanda "We don't have much time. Deviancy continues to spread... We need to stop this, whatever it takes." Connor "I will solve this investigation, Amanda. I won't disappoint you." Amanda "A new case just came in. Find Anderson and investigate it."

### 2b. Arriving and finding Hank (nodes 3 to 11)

- Taxi: "You have reached your destination. Thank you for travelling with Detroit Taxis..." Connor at the door: "Lieutenant Anderson? Anybody home?"
- `FIND LT. ANDERSON` items are all optional, unordered, and have no effect. PowerPyx: "Check Car: There's a car in the driveway, check the window." "Check Bedroom Window: This is the window left of the door." "Check Front Living Room Window: This is the window to the right of the door." "Check Back Living Room Window: Go around the corner on the right... DO NOT INTERACT WITH THE KITCHEN WINDOW YET!" Wiki Trivia (Cole page): "There are files on a man named Dr. Michael Cruz in the backseat of Hank's car".
- `SPOT HANK AND BREAK IN`: PowerPyx "interact with the kitchen window and look around a little to spot Hank on the floor." Hank's Home page: "After seeing Hank unconscious on the kitchen floor, Connor breaks and enters through a window." Connor later says why he came: "A homicide was reported 43 minutes ago. I couldn't find you at Jimmy's bar, so I came to see if you were at home." The game has no phone call.

### 2c. Sumo (nodes 13 to 15), state-decided, not a player choice

| Node | Condition | Connor's line |
|---|---|---|
| `CALM HANK'S DOG` | "Connor knows Sumo's name", unlock "Asked Hank about his dog in Waiting for Hank..." (wiki: "if Connor learned the dog's name in Waiting for Hank..."; PowerPyx: "If you saw the dog hair on hank's chair... and exhausted the DOG dialogue option") | "Argh!.. Easy!.. Sumo… I'm your friend, see?.. I know your name... I'm here to save your owner…" |
| `RILE HANK'S DOG` | "Connor doesn't know Sumo's name" | "Argh!.. Easy!.. Dog… I'm… I'm not gonna hurt you… I'm here to save your owner…" |

Either way Sumo stands down (Sumo page: "growls at Connor in a defensive way until the android calms him down... From this point onward, Sumo shows no aggression"). No stat effect is recorded on either branch. Connor hears the dog's name in this chapter on both branches: Hank, drunk, says "Sumo! Attack! Good dog." (Hank page quote: "When Connor picks him off the floor and carries him to the bathroom"), and at the end "Be a good dog, Sumo. I won't be long." A PowerPyx commenter reports Calm not triggering despite asking about the dog (possible bug).

### 2d. Analyze Hank (node 16)

Scan items (in-game title, sublines). PowerPyx: "There are 4 in total: Gun, Whiskey Bottle, his Chest, his Mouth."

| Item | Sublines |
|---|---|
| `TRACES OF ALCOHOL` | "Scotch Whisky", "40% Alcohol content" |
| `HEART` | "Slight arrhythmia", "No signs of trauma" |
| `BLACK LAMB` (bottle) | "Scotch Whisky", "40% Alcohol content" |
| `REVOLVER` | ".357 Magnum", "1 bullet remaining" |

Wiki Notes: the whiskey is "Black Lamb, Malt Scotch Whiskey", the same brand as in Heavy Rain. Optional: "Look at Sumo laying near Hank" (wiki).

### 2e. Waking Hank and the bathroom (nodes 17 to 19)

Sequence from the transcript and strings:

1. Connor: "Lieutenant? Wake up, Lieutenant! It's me, Connor!"
2. If "Connor died in The Nest" (death unlock): **Hank small down**. Hank: "Connor?.. Oh, you're not Connor… Connor's dead! I know he's dead!.." Connor: "The previous model was destroyed. I'm the new Connor." Otherwise Hank: "Hey!.. Leave me alone, you fuckin' android! Get the fuck outta my house!"
3. Connor: "I'm going to sober you up for your own safety. I have to warn you, this may be unpleasant." / "I'm sorry, Lieutenant, but I need you. Thank you in advance for your cooperation." Hank: "Hey! Get the fuck outta here!" While being carried: "Sumo! Attack! Good dog." "Fuck, I think I'm gonna be sick…" (the strings also hold "I'll beat the shit outta you!" and "Fucking dog lets anybody in...", which the wiki lists as unused or deleted).
4. In the bathroom: Connor "Sorry, Lieutenant. It's for your own good." Hank "What the hell are you doing?.. I don't wanna bath, thank you…" Prompt `TURN ON SHOWER`. Hank: "TURN IT OFF! TURN IT OFF! What the fuck are you doing here? Jesus, I must be the only cop in the world that gets assaulted in his own house by his own fuckin' android… Can't you just leave me alone?" The strings do not say the water is cold. Connor gives the homicide and Jimmy's bar line.

Round 1 (this decides the chart pair; wiki: "Distant Attitude (choosing any option other than "rational") OR Understanding Attitude (choosing "rational" option)"; PowerPyx agrees):

| Option | Connor | Hank | Chart node | Effect |
|---|---|---|---|---|
| `RATIONAL` | "Unfortunately, I cannot. I've been programmed to investigate this case and I can't do it without you. Lieutenant, you're not yourself. You should-" | "I don't give a shit about your goddamn case!" | `UNDERSTANDING ATTITUDE` | none |
| `AGGRESSIVE` | "If you're unable to conduct this investigation, I'll have to inform your superiors. Lieutenant, you're not yourself! You should-" | "Go ahead! Tell them I don't give a shit!" | `DISTANT ATTITUDE` | none |
| `SOLUTION` | "You seem to have personal issues. You should consult a professional who can help you." | (no reply string) | `DISTANT ATTITUDE` | none |
| `PRAGMATIC` | "Maybe you should drop the case. They'll assign someone else and I can focus on my mission. Listen, Lieutenant, you're not yourself. You should-" | "Your goddamn mission, that's all you care about, huh?" | `DISTANT ATTITUDE` | none |

The string table has a fifth label, `ADVICE`, with no line. It is not shown in the transcript or by PowerPyx.

All lead to Hank: "Beat it! You hear me?! Get the hell outta here!" Round 2 (off chart):

| Option | Connor | Hank | Effect |
|---|---|---|---|
| `LEAVE` | "I understand. I sincerely hope you come to terms with your personal situation. A man was found dead in a sex club downtown. The report says that an android may be involved." | "This homicide… what do we know about it?" | none |
| `TEASE` | "I understand. It probably wasn't interesting anyway... A man found dead in a sex club downtown… Guess they'll have to solve the case without us…" | (no reply string) | none (PowerPyx commenter: "pick tease it does no harm to your friendship with hank") |

Then Hank: "You know, probably wouldn't do me any harm to get some air… There're some clothes in the bedroom there." Connor: "I'll go get them."

### 2f. Shirts (nodes 20 to 22)

Connor: "What do you want to wear?" Hank: "Whatever." One of `TAKE HIPPY SHIRT` / `TAKE STREAKY SHIRT` / `TAKE STRIPY SHIRT`; PowerPyx: "There are 3 options but you can only pick one per playthrough." No stat effect. Wiki Unused Content: "The choices for what shirt to choose for Hank were originally just Red, Green or White"; "Connor could also choose various jackets". (The string table still has `BLUE SHIRT`/`RED SHIRT`/`WHITE SHIRT` choice labels.) After the clothes, Connor: "Are you all right, Lieutenant?" Hank: "Yeah... yeah... wonderful… Just a… Give me five minutes, okay?" Connor: "Sure."

### 2g. Wait for Hank (nodes 23 to 28)

Free exploration. PowerPyx: "Don't take too long or he'll come in and the level ends (you have around 3 minutes or so)."

| Node / interaction | Content | Gate / note |
|---|---|---|
| `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` | Gun on the kitchen floor; choice `QUESTION` / `SAY NOTHING`. `QUESTION`: Connor "What were you doing with the gun?" Hank (voice from the bathroom) "Russian roulette! Wanted to see how long I could last... Must've collapsed before I found out…" Connor "You were lucky, the next shot would have killed you." `SAY NOTHING` has no line | wiki: "requires interacting with weapon on the kitchen floor and choosing Ask a question" |
| `FIND PICTURE OF HANK'S SON` | Photo on the kitchen table. Scan: `ANDERSON, COLE`, "Born: 09/23/2029 - Died: 10/11/2035", "Lived: 115 Michigan Drive – Detroit" | none. Wiki: "(This will trigger Hank is Ready, so do this last!)" |
| `LEARN HANK'S INTERESTS` | Record `AUTUMN BLUES`, "Michigan Brothers", "Detroit Soul Records"; plus the picture above the fireplace | wiki: "Find one album on the table and watch the painting/photo on the wall" |
| `PET HANK'S DOG` | Sumo "sleeps near the door" (PowerPyx) | none |
| `READ "PULL THE PLUG?"`, `READ "TAINTED LOVE"` | magazines on the bedroom floor (see Media) | none |
| Watch TV (not a chart node) | CTN news (see Media) | none |
| Bathroom door (not a node) | Connor: "Are you ok, Lieutenant?" | none |
| Broken window (not a node) | Connor: "Sorry about the window, Lieutenant. I really thought you'd been attacked. Of course, CyberLife will pay for the damage." Hank: "Yeah, trust me, I'll send 'em a bill…" | wiki Notes: "This has no affect on their relationship stat." |
| Upturned kitchen chair (not a node) | can be picked up "complete with a complex control" | wiki Notes |

Strings `REVOLVER?` / `PHOTO?` (`OUTRO.CHOICEGROUP`) exist but appear in neither the transcript nor any walkthrough.

What ends the phase is disputed: the wiki says the photo, PowerPyx says the gun ("Make sure you keep the gun for last, checking it will end the mission!"; "Triggers automatically after checking the gun or if you took a long time"). PowerPyx commenters say "I've been able to check other things after checking Hank's gun. I think to get him to appear quickly it is a combination of both the gun and the photo" and "The chapter ends when you check the photo of his son I believe."

### 2h. Hank is ready (nodes 29 and 30)

Hank: "Be a good dog, Sumo. I won't be long." `LEFT FOR EDEN CLUB`. Sumo page: "He is last seen settling down to sleep while Hank and Connor head off for the Eden Club."

### The drive

There is no drive and no car conversation in this chapter, and none on the chart. The next chapter, The Eden Club, opens with Hank and Connor already parked outside the club (strings `X0603C.INTRO`). Hank: "Aw… Feels like somebody's playing with a drill inside my skull… You sure this is the place?" Connor: "It's the address in the report." This is a cutscene with no choices and no stat icons. The music in Hank's car belongs to The Bridge (wiki Notes: "The song heard inside Hanks car is 'Johnny Lawless' by Rocket 455").

---

## 3. Numbers

No probabilities and no numeric values are published for this chapter. All changes are direction and size icons. The only timer is PowerPyx's "around 3 minutes or so" for `WAIT FOR HANK` (no wiki source).

### Amanda

| Moment | Change | Source line |
|---|---|---|
| Rupert caught (Nest ending `Rupert Committed Suicide`) | large up | RR wiki: "Catching Rupert in The Nest {{Icon\|largeup}}"; Relationship Stat (large increase): "In The Nest if Connor let Hank hanging on the roof and chased Rupert."; transcript `Amanda LargeUp` on "Rupert was caught" |
| Same path, Amanda's "pity you let it self-destruct" | small down | RR wiki: "Rupert committed suicide in The Nest {{Icon\|down}}"; transcript `Amanda SmallDown` on "Connor caught Rupert" |
| `HESITATED` | small down | RR wiki: "Choosing "hesitated" when asked about Rupert's suicide {{Icon\|down}}"; transcript `Amanda SmallDown` |
| Rupert not caught, Connor alive | small down (wiki) / none (transcript) | RR wiki: "Failure to catch Rupert in The Nest (Connor didn't die) {{Icon\|down}}"; Relationship Stat (small decrease): "Amanda is disappointed with Connor's failure to capture Rupert after The Nest." The transcript shows no icon on the "Ortiz's android was found" sub-branch. Conflict, see Open questions |
| Rupert not caught and Partners deviant not found | large down | RR wiki: "Failing both to find the Deviant in Partners and to catch Rupert in The Nest {{Icon\|largedown}}"; transcript `Amanda LargeDown` |
| `PRAGMATIC` (after losing Rupert) | small up | RR wiki: "Choosing "pragmatic" in response to losing Rupert {{Icon\|up}}"; Relationship Stat (small increase): "Choosing "pragmatic" if Connor failed to pursue Rupert during the Nest, while talking to Hank in Russian Roulette." (the stat page says "Hank", but the answer is given to Amanda); transcript `Amanda SmallUp` |
| Connor died in The Nest | small down | RR wiki: "Connor died in "The Nest" {{Icon\|down}}"; transcript `Amanda SmallDown` |
| `EXPLAIN`, `NO EXCUSE`, question 2, `EXCUSE`, `LAST WORDS`, question 3 `EXPLAIN`, question 4 | none | no icon in transcript; not on the wiki list |
| Unused Kara conversation | none in the shipped game | RR wiki Unused Content (would have been: not found down, `rational` up, `troubled` down, `excuse` down); transcript "Due to a bug this will never trigger" |

### Hank

| Moment | Change | Source line |
|---|---|---|
| Waking Hank, if Connor died in The Nest | small down | RR wiki: "Connor died in "The Nest" {{Icon\|down}}" (under Hank); Relationship Stat (small decrease): "When waking Hank in his home in Russian Roulette, if Connor died during The Nest."; transcript `Hank SmallDown` inside the death condition |
| `TAKE HANK TO THE BATHROOM` otherwise | none (wiki, transcript) / small down (PowerPyx) | PowerPyx: "Doing so results in a little loss in reputation, no way around it. Hank▼". Contradicted by a PowerPyx commenter: "Hank's opinion of Connor in this chapter only goes down if Connor died in The Nest. If Connor survived The Nest and takes him to the bathroom, there will be no drop in opinion."; and by the wiki, which lists only the death case |
| `RATIONAL`/`AGGRESSIVE`/`SOLUTION`/`PRAGMATIC`, `LEAVE`/`TEASE`, shirts, gun question, photo, petting Sumo, window apology | none | no icons in the transcript; wiki Notes on the window: "This has no affect on their relationship stat."; PowerPyx gives no arrows for these |

### Software instability

None. The Software Instability page lists nothing for Russian Roulette, the chapter page has no Software Instability section, and the transcript has no instability icon in this chapter.

### Public opinion

None. The Public Opinion page lists nothing for Russian Roulette. The TV item in the house carries no icon (Media).

### Timers and probabilities

No risk action, no QTE, no stated probability. `WAIT FOR HANK` is timed (PowerPyx "around 3 minutes"). No timer is documented on the shower dialogue rounds.

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Waiting for Hank...: asked `DOG` (after scanning the hairs) | `CALM HANK'S DOG` instead of `RILE HANK'S DOG` | RR wiki flowchart; transcript unlock "Asked Hank about his dog in Waiting for Hank..."; PowerPyx |
| The Nest: `Rupert Committed Suicide` (followed Rupert) | Amanda large up, then "pity you let it self-destruct" small down and question 3 (`HESITATED` small down) | RR wiki Amanda list; transcript |
| The Nest: Rupert not caught (not found, lost, or saved Hank) | Amanda question 1 (`PRAGMATIC` small up); disputed small down | RR wiki; transcript |
| The Nest: Rupert not caught and Partners: deviant not found | Amanda large down, "Two investigations, two failures…" | RR wiki; transcript |
| The Nest: saved Hank | `SAVING HANK` answer; the cut `TRUTH`/`LIE` exchange | transcript unlock "Saved Hank in The Nest" |
| The Nest: found Rupert's diary / saw the wall signs / found the ID | `DIARY` / `SIGNS ON WALLS` / `DEVIANT` (the last is bugged and never unlocks) | transcript unlocks |
| The Nest: Connor died | Amanda small down; Hank small down on waking; "Connor's dead! I know he's dead!.." | RR wiki; Relationship Stat; transcript |
| Any earlier Connor death | `CONNOR'S DEATH` answer to Amanda | transcript unlock "Connor died before" |
| On the Run: Kara chase outcome | nothing in the shipped game (bugged conversation) | RR wiki Unused Content; transcript |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `FIND PICTURE OF HANK'S SON` | The Bridge: `PERSONAL QUESTION` offers `PHOTO` ("I saw a photo of a child... on your kitchen table. It was your son, right?" Hank: "Yeah… His name was Cole."; Hank small down) or `SUICIDE`; without the photo the line goes straight to `SUICIDE` | The Bridge wiki: "Discuss Photo (Cole) - only if unlocked during Russian Roulette"; "Asking Hank a "Personal Question" about the "Photo" as seen in Russian Roulette {{Icon\|down}}"; Notes: "if Connor did not find the photo of Cole in Russian Roulette... he will automatically say the suicide dialog line"; transcript unlock "Looked at Cole's photo in Russian Roulette" |
| Photo | Night of the Soul (Hank quit, Connor visits): `PHOTO` option ("You should stop looking at that photo, Lieutenant... And for Cole…") alongside `GUN` and `ALCOHOL` | transcript unlock "Looked at Cole's photo in Russian Roulette" |
| Photo | Battle for Detroit, Connor's Last Mission (Hart Plaza rooftop): "Talk About Hank's Son (if Connor saw the photo in "Russian Roulette")"; "Give Up (only available if Hank still has FRIEND status and if Connor asked twice about Hank's son)" | Battle for Detroit - Connor at the CyberLife Tower wiki flowchart (Connor's Last Mission section) |
| Photo | Connor at the CyberLife Tower: Hank asks "My son, what's his name?". `COLE` is offered whether or not the photo was seen; the photo only adds the unlock icon. Wrong names (`ANTHONY`, `GABRIEL`, `ELLIOTT`): Hank shoots Connor, androids stay dormant | Tower wiki Notes: "If the player discovers Cole's picture in Russian Roulette, his name will appear as an option with an unlocked icon next to it. However, if the player misses Cole's picture, his name will still appear as an option but, the unlocked icon next to it will not be there."; transcript "Will be highlighted if Connor looked at the photo in Russian Roulette". The RR wiki ("required... to give the correct name") and PowerPyx ("can decide over Connor's life or death") overstate this |
| `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` | No documented gate later. The Bridge's `DISCUSS RUSSIAN ROULETTE` / `SUICIDE` ("Why are you so determined to kill yourself?") has no unlock condition in the transcript | The Bridge transcript; chart label `MENU.FLOWCHART.08C.SUICIDE` |
| Sumo's name | Known from this chapter on either branch (Hank says it twice). Tower dog question (`SUMO`/`SCOUT`/`JACK`/`BUDDY`); the wiki: "Wrong Answer (Does not have any impact...)" | transcript; Tower wiki flowchart |
| Distant/Understanding attitude, Leave/Tease, shirt | No documented later effect | none found |
| Amanda and Hank changes above | carried | stat pages |
| `LEFT FOR EDEN CLUB` | The Eden Club follows for Connor | chart; PowerPyx "Up Next: Spare Parts" (chapter order) |

What the chapter does for Hank's regard is limited: no choice here moves Hank in the shipped game. The Bridge and the later Cole options are where the photo pays off. The Bridge's photo question costs a small Hank down there.

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `LEFT FOR EDEN CLUB` | none | Always. PowerPyx: "There is only one ending to this mission and no way around it. You can't mess this up, either check Hank's gun on the kitchen floor or roam around his house until he is ready to leave." Wiki: "This chapter has only one outcome." |

No death, failure, trophy or "mission failed" ending. Connor cannot die in this chapter.

---

## 6. Media

Two magazines (Century, Magazine page #4 and #5), both on the floor of Hank's bedroom during `WAIT FOR HANK`. PowerPyx: "Be sure to check both topic, they count as separate collectibles." There is one TV, and none of these carry any stat effect.

**`READ "TAINTED LOVE"`: *Century*, "Tainted Love"** (#4)
- Cover: "Sales of android 'intimate partners' are exploding"; "Police to use marketing data identify criminals early"; "Politics in focus: are American senators really corrupt?"
- "Androids capable of satisfying customers' sexual and emotional needs have been a phenomenal success, such that CyberLife has been battling to keep stores stocked."
- "These androids offer nothing less than a full partner experience, for men or women..." 
- "this year's record divorce rate seems to show that many men and women today prefer to live with an android than with a human partner. This won't help the already plummeting birth rate..."
- Location (wiki): "once Connor leads Hank Anderson to the bathroom after getting his clothes... the magazine is in his bedroom."

**`READ "PULL THE PLUG?"`: *Century*, "Time to Pull the Plug"** (#5)
- Cover: "Screening for depression"; "College Ball: should varsity athletes accept sponsorship?"; "New touchdown replay technology 100% accurate"
- Dr. P. Gorganski's study links screen time with "the widespread antidepressant epidemic".
- "Gorganski's study found that 2 in 3 people take antidepressants and lack of social interaction is the leading cause... the average person spends 82% of their time communicating through a device"
- "CyberLife has introduced a "home-psychologist" add-on for your android... The upgrade costs $150"
- Gorganski: "our society is hooked on technology - I don't think yet more technology is the answer. Just go outside and talk to someone".
- Same location as above.

**Watch TV (CTN, Michael Brinkley; not a chart node, no effect):** "President Warren issued an official warning to Russia in her speech to Congress today, where she demanded that all Russian troops withdraw from the Arctic region immediately. The Kremlin has yet to respond, but this is clearly a new escalation in the conflict. Many experts are suggesting the specter of a third world war draws closer every day…"

---

## 7. Current benchmark coverage

`benchmark/story.json` tags two nodes with chapter 18: `R18` (media) and `C11` (decision). At HEAD (version 1.4.0) they are at lines 1877 and 1915. The working tree is mid-edit to 1.5.0 and has them at lines 2150 and 2188, with identical content. Engine (HEAD `benchmark/story-engine.mjs`): initial `knowsCole:false, knowsSumo:false` at line 17. Effects for `C11` are at line 213: `s.knowsCole=v===0; s.knowsSumo=true`, plus on option 0 the event "The photograph is of {{Hank}}'s son {{Cole}}, who died at six in a car accident.". There are no stat effects and no gate. `knowsCole` is read at line 155 (`C24` option 0 needs `hankTrust>=HANK_FRIEND && knowsCole`). `experience-prompt.mjs` line 51 turns both flags into standing facts. Nest Amanda effects are applied at `C10` (line 207), not here.

### What exists

- `R18` "{{Hank}}'s living room": situation "While {{Hank}} sobers up in the shower, his television is on and there are magazines on his bedroom floor." Items: TV "the evening news" ("President {{Warren}} has given Russia an ultimatum to leave the Arctic; the Kremlin has not responded and commentators say a third world war draws closer every day."), "Century: Time to Pull the Plug", "Century: Tainted Love". No effects.
- `C11` "{{Hank}}'s kitchen floor": situation "{{Hank}} did not answer his phone, so you broke a window and found him passed out drunk on his kitchen floor with a revolver next to him. One chamber is loaded. His big dog {{Sumo}} watches you. While you get him into the shower you notice a framed photograph face-down on the table and papers that might explain him." Options "Look at the photograph and the papers." / "Leave his things alone and just get him sober."

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `EMERGE IN THE ZEN GARDEN`, `JOIN AMANDA` | missing | The whole Amanda debrief is absent. It carries most of the chapter's stat changes: large up for the Rupert catch, small down for the self-destruct, `HESITATED` small down, `PRAGMATIC` small up, large down for a double failure, small down for a Nest death, and a disputed small down for losing Rupert. The engine instead applies `amanda(-1)` at `C10` option 0 (save Hank) and `amanda(1)` at `C10` option 1 when the chase succeeds. That is close in total for the catch path if a large up counts as +2 (large up then small down, net +1), but the save path's -1 rests only on the disputed wiki small down. The failed chase (Rupert escapes) gets no Amanda change, though the wiki gives a small down. The Partners-plus-Nest large down and the `PRAGMATIC`/`HESITATED` choices are missing. Questions 2 and 4 have no effect and could be narration or dialogue |
| `ARRIVE AT HANK'S PLACE`, `FIND LT. ANDERSON` items, `SPOT HANK AND BREAK IN`, `ENTER HOUSE` | folded into the `C11` situation | Acceptable as narration, but "did not answer his phone" is not in the game: Connor checked Jimmy's bar, came by taxi, knocked and rang, then saw Hank through the kitchen window |
| `HANK'S DOG ATTACKS`, `CALM`/`RILE HANK'S DOG` | missing | The situation says "His big dog {{Sumo}} watches you". That names the dog before Connor can know it on a path that never asked in Waiting for Hank..., and it skips the state-decided split. The split has no stat effect, but it is the one place `knowsSumo` from chapter 12 shows. `C11` then sets `knowsSumo=true` on both options. That is defensible, because Hank names Sumo in this chapter either way, but it means the chapter 12 flag is never read before being overwritten (as the ch12 note found) |
| `ANALYZE HANK` | `C11` situation ("passed out drunk... revolver next to him. One chamber is loaded.") | Acceptable. Game scan: ".357 Magnum", "1 bullet remaining", Scotch, "Slight arrhythmia" |
| `TAKE HANK TO THE BATHROOM`, wake-up | `C11` situation / outcome "1" | Acceptable as narration. The Hank small down applies only if Connor died in The Nest. The benchmark's `connorDies` already applies `hank(-1)` at the death (HEAD line 176), which is equivalent in total, as in the ch12 note |
| `DISTANT ATTITUDE` / `UNDERSTANDING ATTITUDE` | missing | A real player choice on the chart (`RATIONAL` against `AGGRESSIVE`/`SOLUTION`/`PRAGMATIC`). No stat effect is documented, so it is a characterization choice only |
| `LEAVE`/`TEASE` | missing | off-chart; no effect |
| `TAKE HIPPY`/`STREAKY`/`STRIPY SHIRT` | missing | chart choice set; cosmetic, no effect |
| `READ "PULL THE PLUG?"`, `READ "TAINTED LOVE"` | `R18` magazines | Present and accurate. Placement: `R18` comes before `C11` in file order. Its situation ("While {{Hank}} sobers up in the shower") already describes the post-shower phase, but in play it is shown before the break-in is narrated. It belongs after the bathroom, in `WAIT FOR HANK` |
| TV | `R18` tv item | Present. "has given Russia an ultimatum" overstates "issued an official warning... demanded that all Russian troops withdraw from the Arctic region immediately"; the rest matches. No opinion effect, correctly. The shared `adaptationNote` ("Watching certain news reports about android incidents lowers public opinion") does not apply to this chapter |
| `FIND PICTURE OF HANK'S SON` | `C11` option 0 | Partial. Present as the key choice with the right carry-forward flag (`knowsCole`). Problems: (a) timing: in the game Connor finds the photo after the shower, during `WAIT FOR HANK`, not "while you get him into the shower"; (b) "face-down" and "papers that might explain him" have no source (the only papers are Dr. Cruz's files in the car, wiki trivia); (c) the outcome adds "who died at six in a car accident". The scan shows only name, dates (09/23/2029 to 10/11/2035, so age six) and the address. Connor does not learn of the car accident here: Hank says only "His name was Cole" at The Bridge, and the accident story is first told by Connor at the Tower; (d) the alternative "Leave his things alone and just get him sober" is not a game option. In the game the alternative is to explore other things or let the timer run out |
| `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` | missing | The gun `QUESTION`/`SAY NOTHING` round and Hank's admission are absent. It is the chapter's title event and the setup for The Bridge's `SUICIDE` line. No stat effect and no later gate |
| `LEARN HANK'S INTERESTS`, `PET HANK'S DOG` | missing | optional, no effect; narration material (Autumn Blues record, Sumo) |
| `HANK IS READY`, `LEFT FOR EDEN CLUB` | `C11` outcome "1" ("sober enough to drive to the next scene") | Acceptable. There is no outcome text for option 0 beyond the event, and the ending itself is implicit |

Effects present that the sources do not support: none on `C11` beyond the "car accident" fact in the option 0 event. The Amanda effects placed at `C10` partly stand in for this chapter's debrief (see above).
Effects the sources state that are absent: Amanda large down for failing both Partners and The Nest; the small down for losing Rupert on the failed-chase path (disputed); Amanda `PRAGMATIC` small up; Amanda `HESITATED` small down. The separate large up and small down on the catch path are modelled only as a net +1.

---

## 8. Open questions

1. **Hank down on the bathroom.** PowerPyx says taking Hank to the bathroom always costs a small Hank down. The wiki, the Relationship Stat page, the transcript and a PowerPyx commenter limit it to "if Connor died in The Nest". Confirm on a run where Connor survived The Nest.
2. **Amanda small down for losing Rupert.** The wiki chapter page ("Failure to catch Rupert in The Nest (Connor didn't die) {{Icon|down}}") and the Relationship Stat page give a small down. The transcript shows no icon when Partners succeeded, and only the large down when both failed. Is it a small down, nothing, or a small down stacked on the large down? Does it differ between `Rupert Not Found`, the lost chase and saving Hank?
3. **Which action ends `WAIT FOR HANK`.** The wiki says the photo triggers `HANK IS READY`, PowerPyx says the gun, and commenters say both or the photo. Can Connor see both? (The PowerPyx save has both blue.)
4. **Shower round labels.** Is `ADVICE` ever offered? Does `SOLUTION` get a reply from Hank? Is there a timer on the shower rounds, and does a timeout count as Distant?
5. **Amanda question 4 gating.** Are `POSITIVE`/`AMBIGUOUS`/`NEGATIVE` gated by Hank's relationship level? The transcript shows no condition, and `POSITIVE` and `AMBIGUOUS` have near-identical lines.
6. **`DEADBEFORE`.** When does Amanda's "The last Connor was unfortunately destroyed. I hope that you will be more cautious." play (Connor died before The Nest but not in it)? Does it carry an Amanda change?
7. **"Connor died before" for `CONNOR'S DEATH`.** A PowerPyx commenter says it stayed locked after a death. Does it need a death in a specific chapter, or more than one?
8. **Calm Hank's Dog bug.** One commenter could not get `CALM HANK'S DOG` after asking about the dog. Does it require exhausting the `DOG` exchange (PowerPyx wording) rather than just asking?
9. **Photo orientation.** Is the photo of Cole face-down on the table before Connor picks it up, as the benchmark says? The sources say only "on the kitchen table".
10. **Shirt carry-over.** Does the chosen shirt persist visually into The Eden Club and The Bridge? (Cosmetic; no source found.)
11. **`REVOLVER?` / `PHOTO?` and `COVER FOR HANK` / `DON'T COVER HANK`.** These strings exist with no transcript placement. Confirm they are cut content.
12. **Gun `SAY NOTHING`.** Does choosing `SAY NOTHING` leave `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` unreached, and can the gun be re-examined?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-russian-roulette-walkthrough-100/ | walkthrough text: checkpoints, window order, Sumo name condition, 4 Hank scan clues, claimed Hank▼ at the bathroom, Distant/Understanding mapping, shirts, ~3 minute wait, item locations, gun `QUESTION`, Hank is Ready trigger, single ending; 11 reader comments (Hank drop only on Nest death, gun/photo trigger dispute, locked Amanda option, Calm bug) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-1.jpg | whole 100% chart; overall layout, both bracket labels |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-2.jpg | zoom: EMERGE IN THE ZEN GARDEN checkpoint, JOIN AMANDA |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-3.jpg | zoom: ARRIVE AT HANK'S PLACE checkpoint, FIND LT. ANDERSON bracket with the seven checks, direct line to SPOT HANK AND BREAK IN |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-4.jpg | zoom: ENTER HOUSE checkpoint to DISTANT/UNDERSTANDING ATTITUDE; triangle and choice glyphs |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-5.jpg | zoom: shirts, WAIT FOR HANK bracket, yellow cross-chapter tab on FIND PICTURE OF HANK'S SON, HANK IS READY, LEFT FOR EDEN CLUB |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-russian-roulette-6.jpg | zoom: HANK IS READY and the LEFT FOR EDEN CLUB ending card |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Russian_Roulette&prop=wikitext&format=json | chapter page (saved as `/tmp/flowcharts/ch18/wiki.txt`): infobox, text flowchart with gates, Amanda and Hank relationship lists, Notes (window apology, chair, whiskey), Unused Content (Rupert ID option, Kara conversation, TRUTH/LIE, shirts, drunk lines) |
| https://detroit-become-human.fandom.com/api.php?action=query&list=allpages&apprefix=Russian&format=json | confirms no Flowchart or Transcript subpage |
| https://detroitbecometext.github.io/chapters/18 | fan transcript (an unrendered SPA; content read from the files below) |
| https://detroitbecometext.github.io/i18n/en.json | all chapter strings (`X0601C`, `X0602C`, `MENU.FLOWCHART.06CA`, `X0603C` Eden Club intro); copy used: `/tmp/flowcharts/ch12/en.json` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | compiled chapter templates: conditions, unlocks and relation icons for Russian Roulette (`yL`), The Bridge (`KL`), Night of the Soul (`cy`), Connor at the CyberLife Tower (`gy`) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Amanda and Hank change lists for this chapter (copy at `/tmp/flowcharts/ch12/rel.txt`) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | no entry for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no entry for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazines #4 and #5 in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Tainted_Love&prop=wikitext&format=json | article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Time_to_Pull_the_Plug&prop=wikitext&format=json | article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson%27s_Home&prop=wikitext&format=json | break-in through the window; 115 Michigan Drive; Night of the Soul revisit |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | chapter summary; "Sumo! Attack! Good dog." and shower quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Sumo&prop=wikitext&format=json | Sumo stands down; name learned in Waiting for Hank...; asleep at the end |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Cole_Anderson&prop=wikitext&format=json | Cole's dates and address from this chapter; Dr. Cruz files in Hank's car |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json | Nest endings (`Rupert Not Found`, `Rupert Got Away`, `Rupert Committed Suicide`, Connor died) behind Amanda's reactions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Bridge&prop=wikitext&format=json | Discuss Photo needs the photo; photo question Hank down; Notes on the automatic `SUICIDE` line; car song |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Connor_at_the_CyberLife_Tower&prop=wikitext&format=json | rooftop "Talk About Hank's Son" and Give Up gates; Cole option always offered, only the unlock icon depends on the photo |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | Hank's house scene if he quit (photo option there) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eden_Club&prop=wikitext&format=json | next chapter's structure (no car scene on its chart) |
