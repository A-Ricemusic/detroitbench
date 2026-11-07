# Chapter 27: Meet Kamski (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from these sources:

- the PowerPyx 100% flowchart screenshots and walkthrough text, with its 9 reader comments;
- the Fandom wiki chapter page (wikitext via the MediaWiki API);
- the wiki's stat, character, magazine, trophy and later-chapter pages;
- the fan transcript at detroitbecometext.github.io (chapter 27), linked from the wiki page;
- one IGN walkthrough page, used only to settle the magazine-unlock conflict.

The transcript's in-game strings come from its `i18n/en.json`: keys `X1102C.*` for the dialogue, `MENU.FLOWCHART.11C.*` for the chart labels, `MENU.OBSERVATION.11C.*` for the scan cards and `GUI.MAGAZINE.*` for the magazines. Its conditions, stat icons and label-to-line bindings come from the compiled chapter template in `chunk-JCLJBPDO.js`: function `wL` for this chapter and `GL` for Last Chance, Connor, which is used for the carry-forwards. I rendered both with a small parser into `/tmp/flowcharts/ch27/render.txt` and `/tmp/flowcharts/ch27/renderGL.txt`.

Working files are in `/tmp/flowcharts/ch27/` and are not committed: `wiki.txt`, `pp.txt`, `mk-*.jpg`, `crops/`, `s27.txt`, `tpl.js`, `render.txt`, `renderGL.txt`, `wikipages/`, `ext/`.

The wiki chapter page is a stub. It has a text flowchart, a Hank relationship list, a Software Instability list and Notes. It has no Probability, Amanda or Public Opinion section. An allpages query for "Meet" returns only the chapter page, so there is no `/Flowchart` or `(Transcript)` subpage.

Game date and time: November 9, 2038, 11:17AM. The wiki infobox gives this, and the transcript shows "NOV 9TH, 2038", "AM 11:17". Location: Elijah Kamski's house, a villa on the Detroit River near Belle Isle (Kamski's house page). Objective, from the infobox: "Meet Kamski". The wiki says "This chapter has two different outcomes." (`|endings=2`). PowerPyx says the chapter "Triggers automatically after completing the Capitol Park Chapter."

## Summary

**Nodes and endings.** The chart has 33 nodes plus 1 bracketed phase label (`WAIT FOR KAMSKI`). It also has 3 yellow cross-chapter condition tabs:

- `CONNOR DIED IN 'PUBLIC ENEMY'`
- `COPS KILLED IN 'CAPITOL PARK'`
- `COPS SPARED IN 'CAPITOL PARK'`

There are 2 checkpoint cards (`WAIT FOR HANK`, `ARRIVE WITH HANK`) and 2 endings: `HANK WAS DISAPPOINTED WITH CONNOR'S DECISION` and `HANK THOUGHT CONNOR MADE THE RIGHT DECISION`. Neither ending has an icon.

**Decisions on the chart.** There are 2:

- the Kamski test: `SHOOT CHLOE` / `SPARE CHLOE`;
- on the shoot path only, the one question: `ASK ABOUT VIRUS` / `ASK ABOUT RA9` / `ASK ABOUT JERICHO`.

**Dialogue rounds off the chart.** There are 6:

- the walk to the door;
- two rounds with Hank in the lobby;
- three rounds with Kamski by the pool.

The start variant depends on whether Connor died in Public Enemy. The car-news variant depends on Capitol Park.

**Numbers.** No probabilities, no timers and no public opinion changes. All stat changes are icons:

- `SHOOT`: Hank large down, software instability large down.
- `DON'T SHOOT`: software instability large up, then Hank large up when they leave.
- Kamski conversation: three answers give a small software instability up (`DEFENSIVE` twice, `TROUBLED`). At most 2 of them can occur on one path.
- Hank small down at the start if Connor died in Public Enemy.
- No Amanda change in this chapter. Amanda's reaction to the Kamski outcome comes at the start of Last Chance, Connor.

**What carries forward.**

- The Jericho key lets Last Chance skip the evidence room.
- Analyzing the Amanda photo unlocks a question to Amanda.
- Kamski's emergency-exit line plays on both paths, according to the transcript.

---

## 1. Flowchart transcription

Read from these images:

- `mk-flowchart-100.jpg`: the whole chart.
- `mk-2.jpg`: zoom on the two starts and the stats panel.
- `mk-3.jpg`: zoom on the lobby and the wait bracket.
- `mk-4.jpg`: zoom on the test and the shoot branch.
- `mk-5.jpg`: zoom on the shoot-path tail and the endings.
- `mk-endings.jpg`: both ending cards.
- Crops: `crops/start.jpg`, `crops/test.jpg`, `crops/asks.jpg`.

The header shows `100% COMPLETED` / `MEET KAMSKI`. The world stats panel on the PowerPyx save reads: `PUBLIC OPINION INDIFFERENT`, `SOFTWARE INSTABILITY ???`, `HANK HOSTILE`, `AMANDA TRUSTED`. That save took the Public Enemy death start, shot Chloe and asked about rA9.

Icon key, using the same conventions as the ch22 note:

- [arrow]: action.
- [triangle]: an event the game plays.
- [bubble]: a dialogue node (speech-bubble glyph).
- [choice]: the overlapping-squares marker before a group of alternatives.
- [lock-tab]: a black open padlock on a yellow tab, marking a cross-chapter condition or impact.
- Blue fill: reached on the photographed save.
- Grey with a black glyph: shown but not reached on that save.
- A fully yellow tab is a satisfied condition. A grey box with a yellow lock tab is an unsatisfied condition, or a cross-chapter impact node.

### Start A: Connor died in Public Enemy (top row)

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| - | `CONNOR DIED IN 'PUBLIC ENEMY'` | fully yellow tab with [lock] (condition, not a node; satisfied on this save) | its line runs to #1 |
| 1 | `WAIT FOR HANK` | checkpoint (large card with image of Hank getting out of his car in the snow while Connor stands waiting), blue | chapter start A |
| 2 | `HANK ISN'T PLEASED TO SEE CONNOR` | [triangle], blue | #1; its line runs down to #7 |

### Start B: Connor did not die in Public Enemy (bottom row)

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 3 | `ARRIVE WITH HANK` | checkpoint (large card with image from inside the car: Connor in the passenger seat, Hank outside on the phone), grey | chapter start B |
| 4 | `GET OUT OF CAR` | [arrow], grey | #3 |
| - | `COPS KILLED IN 'CAPITOL PARK'` | grey box with yellow [lock-tab] (condition) | its line runs to #5 |
| 5 | `LEARN CHRIS IS DEAD` | [triangle], grey | #4 plus the `COPS KILLED` tab |
| - | `COPS SPARED IN 'CAPITOL PARK'` | grey box with yellow [lock-tab] (condition) | its line runs to #6 |
| 6 | `LEARN CHRIS SURVIVED` | [triangle], grey | #4 plus the `COPS SPARED` tab |

Lines in `crops/start.jpg` and `mk-2.jpg`: #4 feeds a vertical connector with stubs to #5 and #6, and its line also continues right to the merge bus before #7. #5 and #6 also run to the merge bus. The bus from #2, #4, #5 and #6 enters #7.

### Arrival and lobby

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 7 | `FOLLOW HANK TO KAMSKI'S PLACE` | [arrow], blue | #2 or the start-B bus (printed `FOLLOW HANK TO` / `KAMSKI'S PLACE`) |
| 8 | `CHLOE ANSWERS DOOR` | [triangle], blue | #7 |
| 9 | `ENTER LOBBY` | [arrow], blue | #8 |
| 10 | `CHLOE GOES TO GET KAMSKI` | [triangle], blue | #9 (printed `CHLOE GOES TO GET` / `KAMSKI`) |

### Waiting (bracketed phase)

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `[ WAIT FOR KAMSKI ]` | large bracketed phase label inside a shaded box | #10 |
| 11 | `READ "SPACE TOURISM"` | [arrow], grey | top of bracket, outermost line |
| 12 | `ANALYZE PORTRAIT` | [arrow], grey | top of bracket |
| 13 | `ANALYZE PAINTING` | [arrow], grey | top of bracket |
| 14 | `ANALYZE SCULPTURE` | [arrow], grey | bottom of bracket |
| 15 | `TALK TO HANK` | [bubble], blue | bottom of bracket |
| 16 | `READ "FORTUNE TELLER"` | [arrow], grey | bottom of bracket, outermost line |

All six hang directly off the phase label. The chart draws no line from `ANALYZE PORTRAIT` to the two reads, although PowerPyx and IGN say the magazines are usable only after the photo is analyzed (section 2c). The phase box's right edge runs to #17.

### Meeting Kamski

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 17 | `CHLOE RETURNS` | [triangle], blue | wait bracket |
| 18 | `MEET KAMSKI` | [arrow], blue | #17 |
| 19 | `QUESTION KAMSKI` | [bubble], blue | #18 |
| 20 | `KAMSKI TEST` | [triangle], blue | #19 |
| 21 | `SHOOT CHLOE` | [arrow], blue | #20 (upper branch) |
| 22 | `SPARE CHLOE` | [arrow], grey | #20 (lower branch) |

There is no [choice] marker before #21 and #22. Both are plain action arrows on two lines leaving #20.

### Shoot path

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 23 | `KAMSKI AGREES TO ANSWER ONE QUESTION` | [triangle], blue | #21 |
| 24 | `ASK ABOUT VIRUS` | [choice] set of three, grey | #23 |
| 25 | `ASK ABOUT RA9` | [choice] set of three, blue | #23 |
| 26 | `ASK ABOUT JERICHO` | [choice] set of three, grey | #23 |
| 27 | `KAMSKI IS CRYPTIC` | [triangle], blue | lines from #24 and #25 |
| 28 | `KAMSKI OFFERS JERICHO KEY THROUGH CHLOE` | [triangle], grey | line from #26 (printed `KAMSKI OFFERS JERICHO` / `KEY THROUGH CHLOE`) |
| 29 | `DOWNLOAD JERICHO KEY` | grey box with yellow [lock-tab] (cross-chapter impact node; the wiki marks it `{{Icon\|impact}}`) | #28 |
| 30 | `LEAVE KAMSKI'S HOUSE` | [arrow], blue | #27 and #29 |
| 31 | `HANK WAS DISAPPOINTED WITH CONNOR'S DECISION` | ending (large card with image of Hank shouting and pointing at Connor in the snow), no icon, blue | #30 |

### Spare path

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 32 | `LEAVE KAMSKI'S HOUSE` | [arrow], grey | #22 |
| 33 | `HANK THOUGHT CONNOR MADE THE RIGHT DECISION` | ending (large card with image of Connor and Hank standing in falling snow), no icon, grey | #32 |

**Totals.** 33 nodes, excluding the phase label and the 3 condition tabs.

- **Blue on the PowerPyx save:** #1, #2, #7 to #10, #15, #17 to #21, #23, #25, #27, #30, #31.
- **Grey:** all of start B, the five other wait nodes, `SPARE CHLOE`, `ASK ABOUT VIRUS`, `ASK ABOUT JERICHO`, #28, #29, and the spare path.

**In-game label strings.** The `MENU.FLOWCHART.11C` labels match the chart exactly:

| Key | Label |
|---|---|
| `ARRIVEALONE` | `WAIT FOR HANK` |
| `HANKNOTPLEASED` | `HANK ISN'T PLEASED TO SEE CONNOR` |
| `ARRIVEWITHHANK` | `ARRIVE WITH HANK` |
| `CARDOOR` | `GET OUT OF CAR` |
| `HANKPHONEDEATH` / `HANKPHONEALIVE` | the two `LEARN CHRIS …` nodes |
| `FOLLOW` | `FOLLOW HANK TO KAMSKI'S PLACE` |
| `RT600` | `CHLOE ANSWERS DOOR` |
| `ENTER` | `ENTER LOBBY` |
| `ANDROIDLEAVE` | `CHLOE GOES TO GET KAMSKI` |
| `WAIT` | `WAIT FOR KAMSKI` |
| `ANALYSEPORTRAIT`, `ANALYSEPAINTING`, `ANALYSESCULPTURE` | the three `ANALYZE` nodes |
| `DISCUSS` | `TALK TO HANK` |
| `MAGAZINE1ST` / `MAGAZINE2ND` | the two reads |
| `ANDROIDCOMEBACK` | `CHLOE RETURNS` |
| `ENTERPOOL` | `MEET KAMSKI` |
| `INTERROGATE` | `QUESTION KAMSKI` |
| `TEST` | `KAMSKI TEST` |
| `KILL` / `SPARE` | `SHOOT CHLOE` / `SPARE CHLOE` |
| `AGREE` | `KAMSKI AGREES TO ANSWER ONE QUESTION` |
| `VIRUS`, `RA9`, `JERICHO` | the three `ASK ABOUT` nodes |
| `CRYPTICANSWER` | `KAMSKI IS CRYPTIC` |
| `JERICHOANSWER` | `KAMSKI OFFERS JERICHO KEY THROUGH CHLOE` |
| `KEY` | `DOWNLOAD JERICHO KEY` |
| `LEAVE` | `LEAVE KAMSKI'S HOUSE` |
| `ENDKILL` / `ENDSPARE` | the two endings |
| `GC.CONNORDEAD`, `GC.CHRISDEAD`, `GC.CHRISSAVED` | the three tabs |

The table has four labels that do not appear on the chart: `HANKPHONE` = `HANK TELLS THE NEWS ABOUT`, `REFUSE` = `CONNOR REFUSED TO SHOOT`, `SHOT` = `CONNOR CHOSE TO SHOOT`, `LOCATION` = `LEARNT JERICHO LOCATION`. See Open questions.

**The wiki's text flowchart** has the same structure, with two differences. It lists "Wait for Hank (checkpoint)" and "Arrive With Hank (checkpoint)" as separate starts. It gives the `Wait for Hank` start only five steps, ending at "Chloe Answers Door". It also adds footnotes:

- On Analyze Portrait: "Choosing this action unlocks the "Amanda's Picture" dialogue option with Amanda at the beginning of Last Chance, Connor."
- On Download Jericho Key: "Choosing this action unlocks the "Jericho" dialogue option with Amanda at the beginning of Last Chance, Connor."

---

## 2. Choices and gates

The order of play is fixed. Option labels and lines come from the in-game strings. Stat icons come from the transcript template unless stated otherwise.

### 2a. The two starts (nodes 1 to 6)

**Start A** (`WAIT FOR HANK`, `HANK ISN'T PLEASED TO SEE CONNOR`):

- Condition: Connor died in Public Enemy. The transcript gives the death unlock "Connor died in Public Enemy". The tab reads `CONNOR DIED IN 'PUBLIC ENEMY'`.
- PowerPyx: "the broadcast kitchen deviant attacked Connor and he bled out or chose to save hank and thereby sacrificed himself".
- The three Public Enemy deaths are `CONNOR DIED RUNNING TOWARD SIMON`, `CONNOR SHUT DOWN` and `CONNOR SACRIFICED HIMSELF FOR HANK` (ch24 note).
- Connor waits by the villa and Hank drives up alone.
- Transcript: "Hank arrives alone" carries a Hank small down icon. Wiki: "Connor died in Public Enemy {{Icon|down}}".

Two dialogue variants, neither of which is a player choice:

| Transcript condition | Lines |
|---|---|
| "Connor died multiple times" | Hank: "Still immortal, huh Connor?" Connor: "In a way." Hank: "You know, I was hoping you wouldn't come back." Connor: "I'm just a machine replacing another machine, lieutenant. You shouldn't get emotional about it." Hank: "Fuck you." |
| "Connor died for the first time in Public Enemy" | Hank: "Jesus Christ…" Connor: "My predecessor was unfortunately destroyed, but CyberLife transferred its memory and sent me to replace it." Hank: "You died in my arms... and now you're... back here as if nothing happened... Fuck you." |

An unused line, `WANTYOUBACK`, is marked by the transcript as "Would have played instead of the above if Hank is not hostile with Connor": "You know, I couldn't decide whether I wanted you to come back this time... Half of me had just started to like you… The other half never wanted to see ya again…". As shipped, the "multiple deaths" variant always uses `DONTCOMEBACK`.

The wiki's Note covers a quirk of the first variant: "Still immortal huh, Connor?"... is Hank's reaction if Connor has died more than once, "even if Connor's first death happened in The Hostage and Hank has only witnessed one other death."

**Start B** (`ARRIVE WITH HANK`, `GET OUT OF CAR`, `LEARN CHRIS …`):

- Condition: transcript lock "Connor didn't die in Public Enemy".
- Hank has been on the phone. The empty keys `X11CHANK.PHONECYC` and `HANKPARK` hint at this, and the checkpoint image shows Hank outside the car on the phone.
- Connor: "Is everything ok, lieutenant?"

| Capitol Park state | Node | Lines | Effect |
|---|---|---|---|
| Cops killed (transcript "Chris died in Capitol Park"; tab `COPS KILLED IN 'CAPITOL PARK'`) | `LEARN CHRIS IS DEAD` | Hank: "Chris was on patrol last night and he got attacked by deviants… They found his body early this morning… He was executed in cold blood with his own service weapon… He became a father three months ago… Fuck, why did it have to be him?" Connor: "I didn't know officer Miller well, but… He seemed to be a good person…" Hank: "Yeah…" Connor: "I'm sorry, Lieutenant…" (unused alternative: "He'd been beat to death…") | none |
| Cops spared (transcript "Chris was spared"; tab `COPS SPARED IN 'CAPITOL PARK'`) | `LEARN CHRIS SURVIVED` | Hank: "Chris was on patrol last night. He was attacked by a bunch of deviants… He said he was saved by Markus himself..." Connor: "Is Chris ok?" Hank: "Yeah, he's in shock but,… he's alive… What the hell…" | none |

"Cops killed" covers both Markus shooting them and the crowd killing them. The Capitol Park wiki says that when Markus leaves it to the crowd, "The crowd will always kill". The Chris Miller page: "If Chris died, a saddened Hank will state that his body was found early that morning killed by his own service weapon... If Chris survived... Markus saved him."

### 2b. The walk to the door (node 7; off-chart round)

This is one choice group in the transcript (`WALKCHOICE`). It has no stat icons.

| Option | Requires | Connor | Hank |
|---|---|---|---|
| `INSTINCT` | none | "I have a bad feeling, lieutenant. We shouldn't have come here." | "Bad feeling, huh? Should get your program checked. Might be a glitch…" |
| `LEAD` | none | "How did you find Kamski?" | "I remember this guy was all over the media when CyberLife first started selling androids… I made a few calls, here we are." |
| `KAMSKI` | none | "Kamski left CyberLife ten years ago… Why did you wanna meet him?" | "This guy created the first android to pass the Turing test. And he's the founder of CyberLife. Anybody can tell us about deviants, it's him…" |
| `CHRIS` | lock "Connor and Hank arrived separately" (start A only) | spared: "I heard Officer Chris was attacked by deviants last night." / killed: "I heard Officer Miller was killed by deviants last night. My condolences, lieutenant. I didn't know him very well but... he seemed like a good person." | spared: "Yeah, he was in the wrong place at the wrong time… but he got lucky… He said that this Markus intervened to save him… He's still in shock but... at least he's alive…" / killed: "He was executed in cold blood with his own service weapon… Just became a father three months ago… Fuck, why did it have to be him?" |

So on start A the Capitol Park news reaches Connor only through the optional `CHRIS` answer, and the chart has no node for it. On start B the news is told automatically in the car.

### 2c. Door and lobby (nodes 8 to 16)

Hank at the door: "Hi… Uh... I'm, er, Lieutenant Hank Anderson, Detroit Police Department. I'm here to see Mr. Elijah Kamski." Chloe: "Please, come in." Then: "I'll let Elijah know you're here. But please, make yourself comfortable."

The PowerPyx save's lobby screenshot shows the Chloe who opens the door. PowerPyx describes her as "the android seen in the main menu". That is a likeness only: the wiki gives the door Chloe as an RT600 and the menu hostess as an ST200 (section 4).

The `TALK TO HANK` node covers two rounds. Neither has stat icons.

| Round | Prompt | Options (Connor line → Hank reply) |
|---|---|---|
| Hall 1 | Hank: "Nice girl…" | `SINCERE` "You're right... she's really pretty…" (no reply) · `ANALYTICAL` "An RT600. The first CyberLife android to pass the Turing test." → "I didn't ask for her technical specs… I just said she was nice…" · `INDIFFERENT` "It's not a girl. It's an android that looks like a girl." → "I know what it is, Connor…" |
| Hall 2 | Hank: "Nice place… Guess androids haven't been a bad thing for everybody…" / "So, you're about to meet your maker, Connor. How does it feel?" | `IMPATIENT` "Kamski is one of the great geniuses of the 21st century. It'll be interesting to meet him in person." · `DISTANT` "I don't know... I'll tell you when I see him." · `INDIFFERENT` "It doesn't raise any existential questions... if that's what you mean." |

After the second round Hank says: "Sometimes I wish I could meet my creator face to face… I'd have a couple of things I'd wanna tell him…"

Optional actions. PowerPyx: "While waiting press R2 an analyze everything in the room!"

**`ANALYZE PAINTING`** is the large portrait of Kamski. PowerPyx: "Check out the portrait of Kamski himself". The scan card, transcript label "Portrait", reads: "KAMSKI, ELIJAH / Cyberlife Founder - Resigned 2028 / Inventor of Thirium and bio-components technology".

**`ANALYZE PORTRAIT`** is the framed photo by the door Chloe used. PowerPyx: "Check the framed image by the door Chloe went through... This is needed to unlock the magazines." The transcript section is "Analysing photo of Amanda and Kamski", with two cards:

- "STERN, AMANDA / AI Professor at University of Colbridge / Born: 05/14/78 - Died: 02/23/27"
- "KAMSKI, ELIJAH / AI Graduate at University of Colbridge / Born: 07/17/02"

Connor then says: "Amanda…". This node unlocks `AMANDA'S PICTURE` in Last Chance (section 4).

**`ANALYZE SCULPTURE`**: "one of the two stone sculptures on either side of the Kamski painting" (PowerPyx). No transcript card.

**`READ "SPACE TOURISM"` / `READ "FORTUNE TELLER"`**: two magazines in one spot.

- PowerPyx: "After analyzing the portrait you can pick up the magazine. It's under the portait."
- IGN: "You can also pick up a magazine on a table after you examine the photograph above it."
- The wiki magazine pages say: "Once players look at the painting, the magazine below it can be interacted with."

So the sources disagree on painting versus photo. Two of the three, and the PowerPyx node description, say the photo. See Open questions.

IGN: "you'll still have to wait a set amount of time for Chloe to come back". There is no fail state for waiting.

### 2d. Meeting Kamski (nodes 17 to 19; three off-chart rounds)

Chloe: "Elijah will see you now." Kamski finishes a lap of the pool. Hank: "Mister Kamski?" Kamski: "Just a moment, please." Hank: "I'm Lieutenant Anderson. This is Connor." Kamski: "What can I do for you, Lieutenant?" Hank: "Sir, we're investigating deviants. I know you left CyberLife years ago but, I was hoping you'd be able to tell us something we don't know…"

Kamski: "Deviants… Fascinating, aren't they? Perfect beings with infinite intelligence, and now they have free will… Machines are so superior to us, confrontation was inevitable… Humanity's greatest achievement threatens to be its downfall. Isn't it ironic?"

**Round K1 (`HELPCHOICE`).** No icons.

| Option | Connor |
|---|---|
| `HELP` | "We need to understand how androids become deviants. Do you know anything that could help us?" |
| `DEVIANTS` | "Something in the deviants' program seems to emulate emotion. We thought you might know something about how that occurs." |
| `VIRUS` | "Deviancy seems to spread like some kind of virus. We thought you might know something about that." |
| `WAR` | "If a war breaks out between humans and deviants, millions could die, Mr. Kamski. It's quite a serious matter." |

Kamski (any answer): "All ideas are viruses that spread like epidemics... Is the desire to be free a contagious disease?" Hank: "Listen, I didn't come here to talk philosophy. The machines you created may be planning a revolution. Either you can tell us something that'll be helpful, or we will be on our way." Kamski: "What about you, Connor? Whose side are you on?"

**Round K2 (`SIDECHOICE`).**

| Option | Connor | Effect |
|---|---|---|
| `NEUTRAL` | "I have no side. I was designed to stop deviants and that's what I intend to do." | none |
| `DEFENSIVE` | "It's not about me, Mr. Kamski. All I want is to solve this case." | SI small up |
| `DIRECT` | "I'm on the humans' side, of course." | none |

Kamski: "Well, that's what you're programmed to say… but you… what do you really want?"

**Round K3 (`WANTCHOICE`).**

| Option | Connor | Effect |
|---|---|---|
| `AGGRESSIVE` | "I believe we're the ones asking the questions." | none |
| `DEFENSIVE` | "I'm sorry, but I don't see where you're getting at." | SI small up |
| `TROUBLED` | "What I want is not important." | SI small up |
| `NEUTRAL` | "I don't want anything. I am a machine." | none |

### 2e. The Kamski test (nodes 20 to 22; the chapter's main decision)

Kamski: "Chloe? I'm sure you're familiar with the Turing test. Mere formality, simple question of algorithms and computing capacity. What interests me is whether machines are capable of empathy. I call it "the Kamski test", it's very simple, you'll see… Magnificent, isn't it? One of the first intelligent models developed by CyberLife. Young and beautiful forever. A flower that will never wither… …But what is it really? Piece of plastic imitating a human? Or a living being... With a soul... It's up to you to answer that fascinating question, Connor. Destroy this machine and I'll tell you all I know. Or spare it, if you feel it's alive, but you'll leave here without having learnt anything from me."

He puts a gun in Connor's hand and has Chloe kneel. The Connor page says: "He gives Connor a gun and gets Chloe on her knees."

Hank: "Okay, I think we're done here. Come on, Connor. Let's go. Sorry to get you outta your pool."

Kamski: "What's more important to you, Connor? Your investigation, or the life of this android? Decide who you are. An obedient machine… Or a living being endowed with free will…"

Hank: "That's enough! Connor, we're leaving." Kamski: "Pull the trigger" Hank: "Connor, don't…" Kamski: "and I'll tell you what you wanna know."

| Option (`SHOOTCHOICE`) | Chart node | Effect (transcript icons) | Immediate result |
|---|---|---|---|
| `SHOOT` | `SHOOT CHLOE` | SI large down, Hank large down | Hank: "Fuck…" Kamski: "Test negative. You chose your investigation over the life of another android. You feel no empathy. I'm a man of my word. Ask one question... I'll tell you all I know." → `KAMSKI AGREES TO ANSWER ONE QUESTION` |
| `DON'T SHOOT` | `SPARE CHLOE` | SI large up (here); Hank large up (on leaving, section 2g) | Kamski: "Fascinating… CyberLife's last chance to save humanity... is itself a deviant…" Connor: "I'm… I'm not a deviant…" Kamski: "You preferred to spare a machine rather than accomplish your mission. You saw a living being in this android. You showed empathy. A war is coming, you'll have to choose your side… Will you betray your own people or stand up against your creators? I wouldn't like to be in your shoes, Connor… What could be worse than having to choose between two evils?" Hank: "Let's get outta here…" |

There is no requirement on either option. No source documents a timer on this choice, or what happens if no button is pressed. PowerPyx button mapping: "During the Turing Test, choose [O] SHOOT" and "[X] DON'T SHOOT".

### 2f. The one question (nodes 23 to 29; shoot path only)

| Option (`QUESTIONCHOICE`) | Chart node | Connor | Kamski | Next |
|---|---|---|---|---|
| `rA9` | `ASK ABOUT RA9` | "I want to know who rA9 is." | "rA9, the origin, the first android to awaken… A strange phenomenon, like a spontaneous religion… I don't know who rA9 is. I don't even know if it really exists. Maybe it's a messiah. Maybe it's just a myth… but deviants need to believe in something bigger than themselves, even if it's irrational... That's something they have in common with humans… An interesting question, Connor… but maybe not the one you needed to ask…" | `KAMSKI IS CRYPTIC` |
| `JERICHO LOCATION` | `ASK ABOUT JERICHO` | "I want to know where Jericho is." | "Jericho… A place where androids are free. A place for deviants, who rise up against their creators!.. They transmit a piece of code to each other, in order to find their sanctuary. Now you have the key. Ferndale Station is the door." | `KAMSKI OFFERS JERICHO KEY THROUGH CHLOE` → `DOWNLOAD JERICHO KEY` (cross-chapter) |
| `VIRUS` | `ASK ABOUT VIRUS` | "I want to know how deviancy spreads." | "Androids share identification data when they meet another android. An error in this program would quickly spread like a virus, and become an epidemic. The virus would remains dormant, until an emotional shock occurs… Fear, anger, frustration. And the android becomes deviant. Probably all started with one model, copy error… A zero instead of a one… Unless of course... Some kind of spontaneous mutation. That's all I know… An interesting question, Connor. But I doubt my answer be very helpful to you." | `KAMSKI IS CRYPTIC` |

None of the three answers has a stat icon. PowerPyx: "JERICHO LOCATION – this is the best pick as it helps with your mission. The other two only provide some background info but nothing useful for Connor."

After the answer, on all three, Kamski says: "A war is coming... you'll have to choose your side… Will you betray your own people or stand against your creators? I wouldn't like to be in your shoes, Connor… What could be worse than having to choose between two evils?" The wiki quotes this as: "Kamski stops Connor before he leaves to warn him."

The chart and string say the key passes "THROUGH CHLOE". No source says which Chloe hands it over. One Chloe is dead on this path, and others are in the pool (Kamski's house page: "several Chloe models").

### 2g. Leaving (nodes 30 to 33), decided by the test

**On both paths**, before the leaving section, Kamski says: "By the way… I always leave an emergency exit in my programs… You never know…"

- The transcript places this line after the shoot/spare choice group, outside both branches.
- The Connor page puts it on the spare path only: "If you decide to spare Chloe, Kamski keeps his word and does not answer any questions but cryptically says, "I always leave an emergency exit in my programs.""
- See Open questions.

| Transcript condition | Chart | Lines | Effect |
|---|---|---|---|
| "Connor shot Chloe" | `LEAVE KAMSKI'S HOUSE` → `HANK WAS DISAPPOINTED WITH CONNOR'S DECISION` | Hank: "You shot that girl, for fuck's sake…" Connor: "It wasn't a girl, Lieutenant. It was a machine that looked like a girl." Hank: "You put your gun against her head and you blew her fucking brains out!" Connor: "I did what I had to do to advance the investigation and I'd do it again if I had to!" Hank: "You're a lowlife! You don't feel a thing, do you? A machine! That's what you are! You're just a fucking machine…" Connor: "Of course I'm a machine, Lieutenant. What did you think I was?" Hank: "I thought you… I thou-… Fuck." | none here (the Hank large down was at `SHOOT`) |
| "Connor didn't shoot Chloe" | `LEAVE KAMSKI'S HOUSE` → `HANK THOUGHT CONNOR MADE THE RIGHT DECISION` | Hank: "Why didn't you shoot?" Connor: "I just saw that girl's eyes… and I couldn't, that's all…" Hank: "You're always saying you would do anything to accomplish your mission. That was our chance to learn something, and you let it go..." Connor: "Yeah, I know what I should've done! I told you I couldn't. I'm sorry, okay?" Hank: "Maybe you did the right thing." | Hank large up |

The leaving conversation has no player choice.

---

## 3. Numbers

No probabilities, no QTEs, no timers and no numeric values are published for this chapter. Every change is a direction-and-size icon.

### Hank

| Moment | Change | Source line |
|---|---|---|
| Start A (Connor died in Public Enemy) | small down | wiki: "Connor died in Public Enemy {{Icon\|down}}"; Relationship Stat (small decrease): "At the beginning of Meet Kamski if Connor died in Public Enemy."; transcript "Hank arrives alone" `Hank SmallDown` |
| `SHOOT` | large down | wiki: "Kill Chloe {{Icon\|largedown}}"; Relationship Stat (large decrease): "Choosing to shoot Chloe at the end of Meet Kamski."; transcript `Hank LargeDown` on `SHOOT`; PowerPyx "Hank▼▼▼" |
| `DON'T SHOOT` | large up | wiki: "Spare Chloe {{Icon\|largeup}}"; Relationship Stat (large increase): "Choosing to spare Chloe at the end of Meet Kamski."; transcript `Hank LargeUp` in the "Connor didn't shoot Chloe" leaving block; PowerPyx "Hank ▲▲▲" |
| Walk, hall and Kamski rounds; the one question | none | no icon in the transcript; not on any wiki list |

On one path Hank moves by one large step from the test, plus a small down on start A. Since Hank begins the chapter at whatever level the earlier chapters left, the test alone moves him one large step toward Friend or Hostile before Last Chance.

### Software instability

| Moment | Change | Source line |
|---|---|---|
| K2 `DEFENSIVE` ("Whose side are you on?") | small up | transcript `SoftwareInstability SmallUp`. The wiki chapter page has the broader "Choose "defensive" or "troubled" while talking to Kamski {{Icon\|up}}"; the SI page narrows it to "what he really wants" (see Open questions); PowerPyx commenter Karnnie: "Being Defensive with Kamski leads to increased software instability" |
| K3 `DEFENSIVE` | small up | transcript; wiki chapter page; SI page: "Choosing "troubled" or "defensive" when Kamski asks Connor what he really wants in Meet Kamski." |
| K3 `TROUBLED` | small up | same sources |
| `SHOOT` | large down | wiki: "Kill Chloe {{Icon\|largedown}}"; SI page (large decrease): "Choosing to shoot the Chloe at the end of Meet Kamski."; Chloe page: "his Software Instability will have a massive decrease"; transcript `SoftwareInstability LargeDown`; PowerPyx "Software Instability▼▼▼" |
| `DON'T SHOOT` | large up | wiki: "Spare Chloe {{Icon\|largeup}}"; SI page (large increase): "Choosing to spare the Chloe at the end of Meet Kamski."; Chloe page "massive increase"; transcript `SoftwareInstability LargeUp`; PowerPyx "Software Instability ▲▲▲" |
| K1 answers, K2 `NEUTRAL`/`DIRECT`, K3 `AGGRESSIVE`/`NEUTRAL`, the question, hall and walk rounds | none | no icon |

Range on one path: from two small ups plus a large up, down to a large down only.

### Amanda

None in this chapter. Amanda does not appear. Connor only says "Amanda…" at the photo. Neither the wiki chapter page nor the transcript gives an Amanda icon. Her reactions to this chapter come in Last Chance, Connor (section 4).

### Public opinion

None. The Public Opinion page has no Meet Kamski entry. The chapter has no TV or radio.

### Timers and probabilities

None stated. Two other facts:

- The lobby wait is fixed-length (IGN). It is the window for the optional reads and scans; they appear to close when Chloe returns.
- Both trophies are bronze: `PRIORITIES` ("Connor killed the Chloe") and `KINSHIP` ("Connor refused to kill the Chloe"). `PRIORITIES` "will then unlock during the flowchart screen once the chapter ends."

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Public Enemy: any Connor death (`CONNOR DIED RUNNING TOWARD SIMON`, `CONNOR SHUT DOWN`, `CONNOR SACRIFICED HIMSELF FOR HANK`) | Start A (`WAIT FOR HANK`, `HANK ISN'T PLEASED TO SEE CONNOR`), Hank small down, the `CHRIS` walk answer unlocked; no car news | chart tab `CONNOR DIED IN 'PUBLIC ENEMY'`; wiki "Wait for Hank - if Connor died in Public Enemy"; transcript; ch24 note section 4 |
| Connor deaths before Public Enemy (any chapter) | On start A, picks "Still immortal, huh Connor?" over "You died in my arms" | transcript "Connor died multiple times" / "Connor died for the first time in Public Enemy"; Hank page quote "(If Connor died more than once and died in Public Enemy)"; wiki Note |
| Capitol Park (Markus): police officers killed or spared | Start B: `LEARN CHRIS IS DEAD` or `LEARN CHRIS SURVIVED`. Start A: the reply to the optional `CHRIS` answer | chart tabs `COPS KILLED/SPARED IN 'CAPITOL PARK'`; PowerPyx "[CROSS CHAPTER] Cops Killed in 'Capitol Park'... This results in a different dialogue with Hank"; Chris Miller page |
| Hank's relationship from all earlier chapters | Nothing in the shipped lines; one unused start-A line would have depended on it (`WANTYOUBACK`, "if Hank is not hostile") | transcript unused-content note |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `DOWNLOAD JERICHO KEY` (shot Chloe and asked about Jericho) | **Last Chance, Connor.** In the Zen Garden, the `JERICHO` answer (locked "Killed Chloe and asked about Jericho in Meet Kamski, swaps with KAMSKI"): Connor "Kamski told me how to find Jericho. I know where the deviants are hiding." Amanda "You've done very well, Connor." Amanda large up. In the station, `KNOW JERICHO'S LOCATION`: Connor skips the evidence room, talks to Hank ("I'm gonna use the key that Kamski gave me. And find Jericho.") and ends `CONNOR LEFT FOR JERICHO`. This feeds the Jericho raid in Crossroads | transcript `GL`; Last Chance wiki: "Know Jericho's Location - only if it was learned from Kamski during Meet Kamski" and Amanda "Getting the key from Kamski to Jericho. {{Icon\|largeup}}{{Icon\|Largeup}}"; Relationship Stat (Amanda large increase): "When Connor finds the location of Jericho and its leader from Elijah Kamski and tells Amanda about it"; Hank page: "If Connor killed Chloe in Meet Kamski and learned of the location of Jericho from Kamski, he will automatically go to find Jericho." |
| Spared Chloe | **Last Chance, Amanda.** The `KAMSKI` answer: Connor "I thought Kamski knew something… I was wrong…" Amanda "Maybe he did… But you chose not to ask…" (Amanda small down). Then a sub-choice: `EMOTIONAL` "I chose not to play his twisted little game! There was no reason to kill that android." (SI small up, Amanda large down), `COLD` "Kamski was just playing with me. He didn't know anything." (Amanda small up, SI small down), or `STAY SILENT`. Amanda closes with "You're the only one who can prevent civil war... This is your last chance, Connor." | transcript `GL`; Last Chance wiki Amanda and SI lists; Relationship Stat; SI page |
| Spared Chloe | **Last Chance, Hank**, if Hank is not Hostile and Jericho is unknown: "When you refused to kill that android at Kamski's place… You put yourself in her shoes. You showed empathy, Connor. Empathy is a human emotion." The Last Chance wiki lists a `TROUBLED` reply with SI small up. If Chloe was shot, this line is replaced by the rooftop (The Nest) or Stratford Tower (Public Enemy) rescue line, or by a death-count or default line | transcript `GL`; Last Chance wiki Notes: "There are five different dialogue interactions with Hank: If Connor Spared Chloe..." |
| Shot Chloe, asked about rA9 or virus | **Last Chance, Amanda.** Connor "I didn't learn anything at Kamski's…" plus "I thought rA9 was the key to the whole thing but… I was wrong…" (rA9) or "I thought Kamski knew something… I was wrong…" / Amanda "Maybe he did…" (virus). No icon in the transcript. The Relationship Stat line "When Connor did not ask Kamski for information... small decrease" reads as the spared case above | transcript `GL`; Relationship Stat |
| Shot Chloe (or shot the Tracis in The Eden Club) | **Last Chance, Amanda** asks "Have you experienced anything unusual recently?... Do you feel anything for these deviants… Or for Lieutenant Anderson?" (`YES` SI small up, Amanda large down; `NO` Amanda large up; `DOUBTS` Amanda large down). Otherwise she gives the "last chance" line | transcript `GL` condition "Connor shot the Tracis in The Eden Club or shot Chloe in Meet Kamski (or both)"; Chloe page: "Amanda only begins to question whether Connor might feel something for deviants in Last Chance, Connor if he shoots either or both of Chloe and the Brown-Haired Traci." |
| `ANALYZE PORTRAIT` | **Last Chance**: the `AMANDA'S PICTURE` question (locked "Looked at Amanda's picture in Meet Kamski"): Connor "I saw a photo of Amanda at Kamski's place… She was his teacher…" Amanda "When Kamski designed me, he wanted an interface that would look familiar… That's why he chose his former mentor. What are you getting at?" | wiki footnote; transcript `GL` (no icon on this answer); Last Chance wiki Amanda list: "Picking "Amanda's Picture" when questioning Amanda {{Icon\|down}}" (conflict, see Open questions) |
| Kamski's emergency-exit line (both paths per the transcript) | **Battle for Detroit.** When Amanda traps Connor in the Zen Garden (machine Connor refusing to shoot Markus after a successful demonstration; deviant Connor on the podium), he can look for the exit, "a structure with a glowing hand print pad", and regain control. No source gates the escape on the Chloe choice or the question | Zen Garden page: "Kamski left an emergency exit in it as he claims he does with all programs... if Connor becomes trapped by CyberLife, he can use this exit to leave the Zen Garden"; Connor page; Battle for Detroit SI: "Fail to escape the Zen Garden {{Icon\|largedown}}" |
| Hank's level after the test | Feeds every later Hank gate: Last Chance (Friend punches Perkins; Tense to Warm leaves; Hostile resigns; the farewell line is warmer at Friend); Night of the Soul (a Hostile Hank kills himself); Battle for Detroit rooftop and CyberLife Tower | Last Chance wiki flowchart and Notes ("if your relationship status is at Tense/Neutral/Warm Hank will tell Connor in a cold tone... if the status is at Friend, Hank will speak in a more sincere tone"); Hank page |
| Software instability after the test | Counts toward deviancy in Crossroads | SI page ("A stable software usually leans towards the side of Connor staying Machine, while a high software instability opens up the option to become Deviant") |
| Chloe's fate | The RT600 Chloe dies only if shot (Chloe infobox `deathDate = November 9, 2038 (determinant)`, `deathPlace = Kamski's house`). There is no later reference to her in Connor's story. In the Kamski epilogue (everyone dead or decommissioned) a Chloe still brings Kamski a glass even if one was shot: "If beat the game on the "Kamski Ending" but shoot Chloe... Chloe will still show up and bring Elijah a glass." | Chloe page; Kamski's house page: "Kamski and his house may appear at the end of chapter Battle for Detroit / in a Credits scene if all characters are dead." |
| Menu Chloe | **Not linked to this chapter.** The main-menu hostess is a different android, an ST200 ("An ST200 Chloe appears in the game's menu and settings"). She "oddly does not react should Connor kill one of the Chloes in Meet Kamski". Her request to be set free comes after the first completion, regardless of this choice | Chloe page; Hostess Chloe page |
| Trophies | `PRIORITIES` (shoot) or `KINSHIP` (spare) | trophy pages |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `HANK WAS DISAPPOINTED WITH CONNOR'S DECISION` | none | Connor chose `SHOOT` at the Kamski test (any question afterward). Hank large down was applied at the shot. PowerPyx: "End of the chapter if Connor shot Chloe." |
| `HANK THOUGHT CONNOR MADE THE RIGHT DECISION` | none | Connor chose `DON'T SHOOT`. Hank large up is applied in the leaving scene. PowerPyx: "End of the chapter if Connor spared Chloe." |

There is no death, failure, check or trophy icon. Connor cannot die in this chapter. Freedom March (Markus) follows.

---

## 6. Media

Two magazines lie on a table in the lobby, under the framed photo by the door (PowerPyx, IGN). They can be read only during the wait (section 2c). Both are *Tech Addict* issues. There is no broadcast and no stat effect.

**`READ "SPACE TOURISM"`: *Tech Addict*, "Space Tourism on the Rise"** (Magazine page #17; this chapter only)
- Cover: "New app + headset allows for live translation of all languages"; "Luxury holidaymakers turn to the stars"; "Zero-Gravity subway to connect NYC and DC in 45 minutes".
- "With the advent of reusable space shuttles, space tourism is becoming a reality - for those able to afford it. Luxury travel brand "Clear Skies" is offering the first commercially available flight into space."
- "The experience includes a three hour orbit of the moon, affording spectacular views of earth through a specially designed observation deck."
- "consumer rights activists are already decrying such 'boutique experiences' as a sign of the widening social equality gap. A spokesman for Aid On Poverty (AOP) said: "While the top 1% are enjoying earth from space, the rest of us are down here suffering from pollution, famine and poverty.""
- "Clear Skies was not available for comment, but the new slogans for their space faring holidays looks increasingly apt: "Get away from it all.""

**`READ "FORTUNE TELLER"`: *Tech Addict*, "CyberLife's 'Fortune Teller' Computer"** (Magazine page #15; also found in the Jericho chapter)
- Cover: "Androids! We review the latest models inside"; "Cyberlife develops world's most powerful quantum calculator"; "Android soldiers: perfect killing machines".
- "CyberLife has unveiled a new quantum supercomputer, capable of 'exaflops' - one billion billion operations per second - the equivalent of several human minds in a single machine."
- "The computer was specifically designed to analyze vast data from various sources and generate predictions. Philip Seymor, CyberLife's Director of Futurology, is highly confident: "We've been testing for a while, and the results are going to wow people.""
- "The computer will be used to calculate the probability of "Mass Extinction Events", such as aggressive alien invasions or global climate disasters like meteors or superviruses."
- "help us to anticipate and prepare for such calamities, ensuring humanity is never caught off guard."; "Despite doomsday predictions from those fearful that AI is gaining too much influence already, many experts are hailing this as a quantum leap in applied artificial intelligence."

The lobby scans (section 2c) are not media, but they carry lore that a scene could use. The Amanda photo gives Amanda Stern as Kamski's AI professor at Colbridge, died 02/23/27. The Kamski painting gives "Resigned 2028" and "Inventor of Thirium and bio-components technology".

---

## 7. Current benchmark coverage

`benchmark/story.json` tags three nodes with chapter 27: `R27` (media), `C17` (decision) and `C18` (decision).

At HEAD (680d764, story 1.5.0) they are at lines 2984, 3015 and 3037. The working tree is being edited concurrently: `story-engine.mjs` and `experience-prompt.mjs` are modified, and the engine header now says 1.6.x. Node IDs and content are unchanged there, so cite by ID.

Engine at HEAD, with working-tree line numbers in brackets:

- Gate `C18:()=>c('C17')==='0'` at line 92 [98].
- `C19:()=>!s.kamskiLocation` at line 95 [101] and `C20` at line 96 [102]: the Jericho key skips the Last Chance archive. This is correct per the Last Chance wiki.
- `C17` effects at line 236 [249]:
  - option 0: `hank(-2);si(-2);amanda(1)`, event "{{Chloe}} falls. {{Hank}} is appalled."
  - option 1: `hank(2);si(2);amanda(-2)`, event "{{Kamski}} smiles: “a deviant himself.” As you leave he says he always leaves an emergency exit in his programs."
- `C18` effects at line 237 [250]:
  - option 0: `s.kamskiLocation=s.jerichoLocated=s.raid=true;amanda(2)`, event "{{Kamski}} hands {{Connor}} the key to {{Jericho}}’s location."
  - option 1: "{{Kamski}} answers cryptically and gives nothing useful."
- `connorDies` at line 178 [186] applies `hank(-1)` at the moment of each death. For a Public Enemy death, this stands in for the game's small down at the start of Meet Kamski.
- `C27` (Battle for Detroit) mentions "{{Kamski}} once mentioned he always leaves a way out of his programs" and is not gated on chapter 27.
- `P01` (menu hostess) is independent of `C17`, which is correct.

Neutral names exist for Kamski (Halden), Chloe (Ivy), Amanda (Vera), Chris (Owen), Jericho (Haven) and Perkins. There is no token for Ferndale or rA9. `C18` already paraphrases rA9 as "the name that deviants keep writing on walls".

### What exists

- **`R27` "{{Kamski}}'s lobby".** Situation: "While you and {{Hank}} wait in {{Kamski}}'s lobby, there is a magazine beneath a photograph of him with a woman you recognize." Two items:
  - *Tech Addict*: Space Tourism on the Rise ("Reusable shuttles now sell three-hour lunar orbits to the rich while... the rest suffer pollution, famine and poverty below.")
  - *Tech Addict*: {{CyberLife}}'s Fortune Teller Computer ("quantum supercomputer meant to predict mass-extinction events")
  - No effects. The shared adaptationNote mentions news reports lowering opinion.
- **`C17` "The {{Kamski}} test".** Situation: Kamski offers a deal, puts a pistol in Connor's hand, Chloe kneels, "Shoot her, he says, and he will answer any question you ask; refuse, and you leave with nothing. {{Hank}} tells you not to do it and that you do not need this." Options: "Shoot {{Chloe}}." / "Hand back the gun and refuse." No `outcomes` field.
- **`C18` "The question".** Situation lists three possible questions: the deviants' hiding place, "what deviancy really is and whether it is a virus he designed", and the rA9 name. Options: "Ask where the deviants are hiding." / "Ask what deviancy is and whether he created it."

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `WAIT FOR HANK`, `HANK ISN'T PLEASED TO SEE CONNOR` (+ tab) | missing | Narration only. The engine has no flag for "died in Public Enemy" (only `connorDeaths`). It could be derived from the `C14b`/`C16` results. The Hank small down is already applied by `connorDies` at the death itself (amount right, timing earlier). The "Still immortal" / "You died in my arms" line needs `connorDeaths` before and after Public Enemy |
| `ARRIVE WITH HANK`, `GET OUT OF CAR` | missing | Narration only |
| `LEARN CHRIS IS DEAD` / `LEARN CHRIS SURVIVED` (+ tabs) | missing | The payoff of `M16` (Capitol Park) on Connor's side. `M16` option 0 = spared → survived; options 1 and 2 = killed → dead. No stat effect. Hank's line "He said he was saved by Markus himself" is a cross-character beat the narration could carry |
| `FOLLOW HANK TO KAMSKI'S PLACE` + walk round | missing | No effects; `CHRIS` answer only on start A |
| `CHLOE ANSWERS DOOR`, `ENTER LOBBY`, `CHLOE GOES TO GET KAMSKI` | `R27` situation ("wait in {{Kamski}}'s lobby") | Acceptable as narration |
| `TALK TO HANK` (two hall rounds) | missing | No effects |
| `ANALYZE PORTRAIT` | `R27` situation ("a photograph of him with a woman you recognize") | Partly. The photo is mentioned as scenery, but analyzing it is optional in the game and unlocks Last Chance's `AMANDA'S PICTURE` question. The benchmark has no flag, and no Last Chance Amanda scene that could use one |
| `ANALYZE PAINTING`, `ANALYZE SCULPTURE` | missing | No effects |
| `READ "SPACE TOURISM"`, `READ "FORTUNE TELLER"` | `R27` items | Present and accurate. "there is a magazine" should be two magazines. The Fortune Teller item could add "one billion billion operations per second" and "Philip Seymor, Director of Futurology". The Space Tourism item could name Clear Skies. The adaptationNote about news reports does not apply (no broadcast here) |
| `CHLOE RETURNS`, `MEET KAMSKI` | `C17` situation ("You and {{Hank}} have gone to see {{Kamski}}...") | Acceptable |
| `QUESTION KAMSKI` (rounds K1 to K3) | missing | K2 `DEFENSIVE`, K3 `DEFENSIVE`/`TROUBLED` each give SI small up. Kamski's "Whose side are you on?" and "what do you really want?" frame the test and are the chapter's only small SI movers |
| `KAMSKI TEST` | `C17` situation | Mostly right. "he will answer any question you ask" should be one question ("Ask one question..."). "{{Hank}} tells you not to do it and that you do not need this" partly matches: Hank says "Okay, I think we're done here", "That's enough! Connor, we're leaving." and "Connor, don't…", but "you do not need this" has no source. Missing Kamski's framing: "Your investigation, or the life of this android? Decide who you are. An obedient machine… Or a living being endowed with free will…" |
| `SHOOT CHLOE` / `SPARE CHLOE` | `C17` options 0 / 1 | Present. `hank(∓2)` and `si(∓2)` match the large icons. **`amanda(+1)` on shoot and `amanda(-2)` on spare have no source in this chapter.** The game's Amanda changes come at the start of Last Chance and depend on Connor's answers there (spared: `KAMSKI` small down, then `EMOTIONAL` large down or `COLD` small up). Hank's large up on sparing comes in the leaving scene, not at the choice; on a single scene the net is the same |
| `KAMSKI AGREES TO ANSWER ONE QUESTION` | `C18` situation | Present |
| `ASK ABOUT VIRUS` / `ASK ABOUT RA9` / `ASK ABOUT JERICHO` | `C18` options 1 / (none) / 0 | **The chart has three answers; the benchmark has two.** rA9 is described in the situation but has no option. Option 1 "Ask what deviancy is and whether he created it" and the situation's "whether it is a virus he designed" go beyond the game. Connor asks "how deviancy spreads", and Kamski blames a copy error or "spontaneous mutation"; nobody asks whether he created it |
| `KAMSKI IS CRYPTIC` | `C18` option 1 event | Acceptable. "gives nothing useful" fits; the content of either answer could be summarized |
| `KAMSKI OFFERS JERICHO KEY THROUGH CHLOE`, `DOWNLOAD JERICHO KEY` | `C18` option 0 event and flags | Present. "hands {{Connor}} the key" should say the key comes through a Chloe and that "Ferndale Station is the door" (no neutral token). `kamskiLocation`/`jerichoLocated`/`raid` set here are correct. `amanda(2)` matches the game's Amanda large up but applies it here rather than when Connor reports in Last Chance (the wiki shows two large-up icons; the transcript shows one) |
| Kamski's "A war is coming" warning | missing | Both paths. Narration |
| Kamski's emergency-exit line | `C17` option 1 event only | **Should be on both paths** per the transcript (see Open questions). `C27` relies on Connor having heard it, so a shoot-path run reaches `C27` with no prior mention in its own record |
| `LEAVE KAMSKI'S HOUSE` → `HANK WAS DISAPPOINTED WITH CONNOR'S DECISION` | `C17` option 0 event "{{Hank}} is appalled." | Acceptable; could add "A machine! That's what you are!... I thought you…" |
| `LEAVE KAMSKI'S HOUSE` → `HANK THOUGHT CONNOR MADE THE RIGHT DECISION` | `C17` option 1 event | **Hank's verdict is missing.** The event text is Kamski's reaction and the exit line. Hank's "Maybe you did the right thing." is the chapter ending. Hank's large up belongs here |

Effects present that the sources do not support:

- `C17` `amanda(+1)` on shoot.
- `C17` `amanda(-2)` on spare.

Effects the sources state that are absent:

- SI small up for K2 `DEFENSIVE`, K3 `DEFENSIVE` and K3 `TROUBLED`.

Downstream not modelled:

- `AMANDA'S PICTURE` in Last Chance (no flag for the photo).
- The Last Chance Amanda dialogue that reacts to the Kamski outcome.
- Hank's Last Chance "You showed empathy" line for a spared Chloe.
- The Capitol Park news (narration).

---

## 8. Open questions

1. **Emergency exit on the shoot path.** The transcript template places "By the way… I always leave an emergency exit in my programs…" after the shoot/spare group, so it plays on both paths. The Connor page attaches it to sparing, and the benchmark's `C17` event does the same. Does Kamski say it after `SHOOT` too?
2. **Which Kamski round gives the `DEFENSIVE` SI up.** The transcript gives SI small up to `DEFENSIVE` in both "Whose side are you on?" and "what do you really want?". The SI page lists only the second. The wiki chapter page says only "while talking to Kamski".
3. **Magazine unlock.** PowerPyx and IGN say the magazines (under the framed photo) can be picked up only after analyzing the photo (`ANALYZE PORTRAIT`). The wiki magazine pages say "look at the painting". The chart draws no line from either scan to the reads.
4. **`ANALYZE PORTRAIT` versus `ANALYZE PAINTING`.** PowerPyx maps `PAINTING` to the Kamski portrait and `PORTRAIT` to the framed photo. The transcript labels the Kamski scan "Portrait" and the Amanda one "Photo". Confirm which chart node lights for the Amanda photo; the wiki footnote ties `ANALYZE PORTRAIT` to Last Chance's `AMANDA'S PICTURE`.
5. **`AMANDA'S PICTURE` stat.** The Last Chance wiki gives Amanda small down for picking it. The transcript shows no icon. This belongs to the Last Chance note but bears on whether the photo flag matters numerically.
6. **Jericho key Amanda bonus.** The Last Chance wiki shows two large-up icons for "Getting the key from Kamski to Jericho". The transcript shows one Amanda large up on the `JERICHO` answer.
7. **Start A without a Public Enemy death.** PowerPyx commenter Leonardo Felix: "Connor didn't die in any chapter, but Hank still arrive alone." Is there another trigger for start A (for example `CONNOR SHUT DOWN` counted differently), or is that a save-sync bug like the one Vee reports for the Capitol Park tabs?
8. **"Still immortal" condition.** The transcript says "died multiple times". The wiki Note says Hank says it "even if Connor's first death happened in The Hostage". Is the count any two deaths in any chapters, including deaths Hank did not witness?
9. **Unused chart labels.** `HANK TELLS THE NEWS ABOUT`, `CONNOR REFUSED TO SHOOT`, `CONNOR CHOSE TO SHOOT`, `LEARNT JERICHO LOCATION` are in the string table but not on the chart. Cut content?
10. **Who hands over the key.** `KAMSKI OFFERS JERICHO KEY THROUGH CHLOE`: is it another RT600 from the pool, and does Connor interface with her hand? No source describes the transfer.
11. **Walk round.** Is the `INSTINCT`/`LEAD`/`KAMSKI`/`CHRIS` group a single pick, or can Connor ask several before reaching the door?
12. **Timeouts.** What happens if no button is pressed at the Kamski test, or at the one question?
13. **Start-B line map.** `GET OUT OF CAR` appears to have a line straight to the merge bus as well as to both `LEARN CHRIS …` nodes. Is there a start-B path with no Chris news (for example, a save where the Capitol Park flag is missing)?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-meet-kamski-walkthrough-100/ | walkthrough text: both starts and their cross-chapter conditions, the wait actions (portrait unlocks the magazines), the test with Hank/SI triple arrows, the three questions, both endings; 9 reader comments (Capitol Park flag bug, Defensive SI up, Hank arriving alone without a death) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-flowchart-100.jpg | whole 100% chart; overall layout and which nodes are blue |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-2.jpg | zoom: stats panel, both checkpoint cards, three condition tabs, HANK ISN'T PLEASED, GET OUT OF CAR, both LEARN CHRIS nodes, FOLLOW HANK |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-3.jpg | zoom: FOLLOW HANK to CHLOE GOES TO GET KAMSKI and the WAIT FOR KAMSKI bracket with its six actions |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-4.jpg | zoom: CHLOE RETURNS to KAMSKI TEST, SHOOT/SPARE, the question bracket, spare-path LEAVE and ending card |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-5.jpg | zoom: KAMSKI IS CRYPTIC, KAMSKI OFFERS JERICHO KEY THROUGH CHLOE, DOWNLOAD JERICHO KEY with lock tab, shoot-path LEAVE and ending card |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-meet-kamski-endings.jpg | both ending cards (no icons) and the shoot-path tail over the L1 overlay |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json | chapter page (saved as `/tmp/flowcharts/ch27/wiki.txt`): infobox, text flowchart with footnotes (Amanda's Picture, Jericho), Hank and SI lists, Notes ("Still immortal") |
| https://detroit-become-human.fandom.com/api.php?action=query&list=allpages&apprefix=Meet&format=json | confirms no Flowchart or Transcript subpage |
| https://detroitbecometext.github.io/chapters/27 | fan transcript (linked from the wiki page; an SPA, content read from the files below) |
| https://detroitbecometext.github.io/i18n/en.json | all chapter strings (`X1102C.*`, `MENU.FLOWCHART.11C.*`, `MENU.OBSERVATION.11C.*`) and Last Chance strings (`X1201C.*`, `X1202C.*`); copy at `/tmp/flowcharts/ch24/en.json`, dump at `/tmp/flowcharts/ch27/s27.txt` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | compiled templates: Meet Kamski (`wL`: conditions, unlocks, stat icons, unused content) and Last Chance, Connor (`GL`: Amanda and Hank lines conditioned on this chapter); copy at `/tmp/flowcharts/ch24/` |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank large up/down for spare/shoot, small down at the start after a Public Enemy death; Amanda Last Chance entries tied to Kamski |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | spare large up, shoot large down, "troubled" or "defensive" on "what he really wants"; Last Chance follow-ups |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no entry for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Elijah_Kamski&prop=wikitext&format=json | Kamski test description, quotes (including the exit line and the war warning), biography, Zen Garden backdoor |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chloe&prop=wikitext&format=json | RT600 identity, determinant death, "massive" SI changes, the ST200 menu Chloe distinction, Kamski-ending glass note, Amanda's question tied to shooting |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hostess_Chloe&prop=wikitext&format=json | menu Chloe does not react to Meet Kamski; her release request after completion |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Kamski%27s_house&prop=wikitext&format=json | location notes, several Chloes, epilogue appearance |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | chapter summary (exit line attached to sparing), Zen Garden escape in Battle for Detroit |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | chapter summary, "Still immortal" quote condition, Last Chance and Kamski-ending consequences |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Know Jericho's Location route, Amanda and SI lists for the Kamski answers, the five Hank interactions, Hank farewell variants |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Zen_Garden&prop=wikitext&format=json | the emergency exit and its use in Battle for Detroit |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | Zen Garden trap situations; "Fail to escape the Zen Garden" SI large down; no Kamski gate |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Amanda's Last Chance reactions to sparing or shooting Chloe |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json | Kill/Spare of the officers; crowd always kills |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chris_Miller&prop=wikitext&format=json | Hank's news about Chris in this chapter; son born three months earlier |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | the three Connor death endings that trigger start A |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazines #15 and #17 in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Space_Tourism_on_the_Rise&prop=wikitext&format=json | article text, cover lines, location ("look at the painting") |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=CyberLife%27s_%27Fortune_Teller%27_Computer&prop=wikitext&format=json | article text, cover lines, both locations |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | PRIORITIES and KINSHIP |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=PRIORITIES&prop=wikitext&format=json | bronze; unlocks on the flowchart screen |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=KINSHIP&prop=wikitext&format=json | bronze; not shooting Chloe |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=RA9&prop=wikitext&format=json | Kamski's rA9 answer as the wiki summarizes it |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Secret-Endings&prop=wikitext&format=json | Kamski ending conditions |
| https://www.ign.com/wikis/detroit-become-human/Meet_Kamski | tie-breaker: "pick up a magazine on a table after you examine the photograph above it"; fixed wait; Hank's trust "will dramatically fall" on shooting |
