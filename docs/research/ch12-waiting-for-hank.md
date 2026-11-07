# Chapter 12: Waiting for Hank... (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots and walkthrough text, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, magazine, character and later-chapter pages, and the fan transcript at detroitbecometext.github.io (chapter 12), whose in-game strings were read from its `i18n/en.json` and the compiled chapter template, including its relationship/stat icons and unlock conditions. Working files are in `/tmp/flowcharts/ch12/` (not committed). The wiki has no `Waiting_for_Hank.../Flowchart` template and no `(Transcript)` page (both return `missingtitle`).

Game date and time on the wiki infobox: November 6, 2038, 09:56AM. Locations: Zen Garden; DPD Central Station. Objectives (infobox): "Find Amanda", "Find Lt. Anderson", "Wait for Lt. Anderson", "Progress the case". Wiki: "This chapter has two different outcomes." (`|endings=2`). Wiki Unused Content: "The chapter was originally titled 'Police Works'." PowerPyx: "Triggers automatically after completing the chapter From the Dead."

Summary: 26 chart nodes plus 1 bracketed phase label (`WAIT FOR HANK`), 2 checkpoints, 2 endings (`HANK GOT A LEAD`, `HANK LEFT TO GET LUNCH`), both decided by whether Kara is alive, not by anything Connor does here. No choice pair appears on the chart; every decision in the chapter is an off-chart dialogue round. No probabilities or timers are published. Stat changes: Amanda (opening reaction plus one dialogue answer), Hank (four desk-topic questions, one unavoidable down, one death-related down), one software instability up, one public opinion down.

---

## 1. Flowchart transcription

Read from `Waiting_for_Hank_1.jpg` (whole chart), `Waiting_for_Hank_2.jpg` (Zen Garden zoom), `Waiting_for_Hank_3.jpg` (station zoom) and `Waiting_for_Hank_4.jpg` (end zoom), with crops of the icons. The chart header shows only `100% COMPLETED` / `WAITING FOR HANK...`; the PowerPyx screenshots do not show the world stats panel for this chapter.

Icon key (as drawn): [arrow] = action, [speech] = dialogue, [triangle] = event the game triggers, [branch] = the free-standing bracket-shaped origin glyph used for optional side branches (as in ch03/ch05 notes), [unlock] = black open padlock on a yellow node (a condition carried in from an earlier chapter), [lock] = yellow open-padlock tab (cross-chapter impact, same glyph as `SPILL HANK'S DRINK` in Partners). Blue fill = reached on the photographed save; grey with a black arrow = shown but not reached on that save. No death, failure, success or trophy icon appears anywhere on this chart.

### Zen Garden

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `IN THE ZEN GARDEN` | checkpoint (large card with image, "LOAD CHECKPOINT") | chapter start |
| 2 | `FIND AMANDA` | [arrow] | #1 |
| 3 | `FIND MAGIC STONE` | [arrow], from a [branch] glyph above the main line | optional side branch, no line from #2 |
| 4 | `CHECK THE GRAVES` | [arrow], from a [branch] glyph below the main line | optional side branch; wiki: "only if Connor previously died in The Hostage and/or The Interrogation" |
| 5 | `TALK WITH AMANDA` | [speech] | #2 |

### Police station

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 6 | `ARRIVE AT POLICE STATION` | checkpoint (large card with image) | #5 |
| 7 | `FIND LT. ANDERSON` | [arrow] | #6. Its outgoing line splits: up into the `WAIT FOR HANK` bracket, down to #19 |
| - | `WAIT FOR HANK` | bracketed phase label (not a node) | encloses #8 to #18 |
| 8 | `ANDROID SAVED IN 'THE INTERROGATION'` | yellow node, [unlock] | condition node; top-left inside the bracket |
| 9 | `EXPLORE THE STATION` | [arrow] | from the bracket's top-left |
| 10 | `TALK WITH CARLOS' ANDROID` | [speech] | the lines from #8 and #9 join before it, so it needs both |
| 11 | `CARLOS' ANDROID SELF-DESTRUCTS` | [lock] (yellow tab in the icon position) | #10; cross-chapter impact |
| 12 | `TALK WITH GAVIN` | [speech], grey | #9 |
| 13 | `READ "FAMOUS PAINTER DIES"` | [arrow], grey | from the bracket's top connector |
| 14 | `READ "ROBOTIC PARENTING"` | [arrow], grey | from the bracket's top connector |
| 15 | `READ "IVANOFF SAYS "NIET"!"` | [arrow], grey | from the bracket's bottom connector (printed across two lines: `READ "IVANOFF SAYS` / `"NIET"!"`) |
| 16 | `FOLLOW HANK IN FOWLER'S OFFICE` | [arrow] | from the bracket's bottom connector |
| 17 | `EXAMINE HANK'S DESK` | [arrow] | from the bracket's bottom connector |
| 18 | `LEARN ABOUT HANK` | [arrow] | #17 |
| 19 | `HANK ARRIVES` | [triangle] | #7 (lower line, outside the bracket) |
| 20 | `HANK STORMS OUT` | [triangle] | #19; its line runs right and joins the bracket's right-hand exit before #21 |

### Hank's desk and endings

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 21 | `TALK TO HANK` | [speech] | `WAIT FOR HANK` bracket exit + #20 |
| 22 | `EXAMINE FILES` | [arrow] | #21 |
| 23 | `TALK ABOUT THE CASE` | [arrow] | #22 |
| 24 | `HANK IS MAD` | [arrow] | #23 |
| 25 | `HANK GOT A LEAD` | ending (large card with image of Hank and Connor), no icon | #24 |
| 26 | `HANK LEFT TO GET LUNCH` | ending (large card with image of Hank walking off), no icon | #24 |

Total: 26 nodes (excluding the `WAIT FOR HANK` label), counting the yellow condition node #8. Grey on the PowerPyx save: `TALK WITH GAVIN`, `READ "FAMOUS PAINTER DIES"`, `READ "ROBOTIC PARENTING"`, `READ "IVANOFF SAYS "NIET"!"`. Every other node, including both endings, is blue.

The wiki's text flowchart lists the same 26 items with the same grouping (Hank Arrives > Hank Storms Out nested under Find Lt. Anderson; the reads, Fowler's office, desk and Explore the Station nested under Wait for Hank; Talk With Carlos' Android "only if the android was saved in The Interrogation"; Carlos' Android Self-Destructs marked `{{Icon|impact}}`). Wording differences: the wiki writes "Talk with Gavin", "Read *Famous Painter Dies*", "Read *Robotic Parenting*", "Read *Ivanoff Says "Niet"!*"; the in-game labels are as above.

Reading of the structure: `WAIT FOR HANK` covers both the time before Hank arrives and the time he spends in Fowler's office (the wiki's Attention to Detail lists the men's room, observation room and briefing room as "Things Connor can do while Hank is in Fowler's office", and `FOLLOW HANK IN FOWLER'S OFFICE` is inside the bracket). The `HANK ARRIVES` / `HANK STORMS OUT` track runs in parallel; `TALK TO HANK` opens once Hank is back at his desk.

---

## 2. Choices and gates

None of these dialogue rounds is a chart node; they sit inside `TALK WITH AMANDA`, `TALK WITH CARLOS' ANDROID`, `TALK WITH GAVIN`, `FOLLOW HANK IN FOWLER'S OFFICE`, `TALK TO HANK`, `LEARN ABOUT HANK`, `TALK ABOUT THE CASE` and `HANK IS MAD`. Option labels and lines are from the in-game strings.

### 2a. Zen Garden (nodes 1 to 5)

Free walk. `FIND MAGIC STONE`: PowerPyx "go left along the edge of the pond until you find a circular archway... Interact with it". `CHECK THE GRAVES`: PowerPyx "If Connor has died at least once... go right along the edge of the pond... small graveyard"; Zen Garden page: "gravestones for killed Connor models". The Interrogation page: Connor dies > "Another gravestone is present in the Zen Garden in Waiting for Hank...". `FIND AMANDA`: Amanda is tending roses on the island.

`TALK WITH AMANDA`. Opening: Connor "Hello, Amanda." Amanda "Connor... It's good to see you." Then one of four reactions, decided by Partners and The Interrogation (transcript conditions):

| Condition (transcript wording) | Amanda's line (abridged) | Amanda |
|---|---|---|
| "Connor didn't find the deviant in Partners" | "I expected you to find the deviant who killed that man... I must admit I'm a little bit disappointed..." Connor: "I'm sorry. I know I should have succeeded." | large down |
| Found, "Got a confession, without dying" | "Congratulations, Connor... the way you interrogated it was very clever. You've been remarkably efficient, Connor." "We've asked the DPD to transfer it to us for further study." | large up |
| "Connor died during The Interrogation" | "Your predecessor was unfortunately destroyed... it wasn't careful enough... When a Connor model is destroyed, its memory is transferred to the next one, but some data can be lost in the process. Avoid being destroyed." | small down |
| "Connor found the deviant but didn't get a confession in The Interrogation" | "you showed great skill in your investigation. But you knew deviants could be unstable. You should have been more cautious." Connor: "I thought I could make it talk... It was a judgement error." | small down |

Question 1, "The interrogation seemed... challenging... What did you think of the deviant?"

| Option | Line | Requires | Effect |
|---|---|---|---|
| `TRAUMATIZED` | "It showed signs of PTSD after being abused by its owner, as if its original program had been completely replaced by new instructions." | none | none |
| `DEVIANCY` | "It showed all the signs of deviancy: cognitive instability, unpredictable behavior, and the emulation of human emotions. It was even afraid to die. The model was clearly defective." | none | none stated |
| `INTERVENTION` | "I prevented it from being damaged, so we might still learn something by analyzing it." If it confessed, adds: "It said something to me: 'The truth is inside'..." | "Intervened and saved the deviant in The Interrogation" (padlock) | none |
| `REGRETS` | "It could've killed everyone in the room. The previous Connor should have anticipated the danger. It was a mistake to let an armed policeman so close to the deviant." | "Connor died in The Interrogation" (death unlock) | none |
| `SIMULATION` | "It simulated human emotion, fear in particular, in a very convincing way. It seemed completely overwhelmed by them, and behaved irrationally," | none | none |

Question 2, "This... Lieutenant Anderson has been officially assigned to the deviancy case... What do you make of him?"

| Option | Line | Effect |
|---|---|---|
| `UNPLEASANT` | "I find him unpleasant and unprofessional. He seems to have an addictive personality, has a lack of respect for procedure, and despises androids..." | none |
| `DYSFUNCTIONAL` | "I would define him as 'dysfunctional'. He obviously has a personal situation impacting his professional behavior and... seems to have no interest in the investigation." | none |
| `INTRIGUING` | "I think he's irritable, and socially challenged. But I also think he used to be a good detective... He's an intriguing character." | none |
| `UNSURE` | "He's obviously not what I was expecting, but... I don't have enough information yet to form a definitive opinion." | none |

Question 3, "Unfortunately, we have no choice but to work with him... What do you think is the best approach?"

| Option | Line | Effect |
|---|---|---|
| `FRIENDLY` | "I will try to establish a friendly relationship. If I can get him to trust me, it will be helpful for the investigation." | Amanda small down |
| `ADAPT` | "I will adapt to his personality. It is in the best interest of the investigation that I avoid conflict and try to accommodate his psychology." | Amanda small down |
| `INDIFFERENT` | "I will focus on the investigation and try to ignore him. As long as he doesn't interfere and we avoid conflict, he shouldn't be a problem." | Amanda small up |
| `DON'T KNOW` | "I don't have enough data to decide that yet. I'll learn more about him and try to adapt my behavior accordingly." | none |

Close: Connor "You can count on me, Amanda." Amanda: (if Connor died) "Pick up the investigation where the previous Connor left off, and put a stop to this." / (if deviant not found) "Continue your investigation and put a stop to this." / "Hurry, Connor. There's little time."

### 2b. Arriving and waiting (nodes 6 to 9, 13 to 18)

- Reception: an android receptionist: "Lieutenant Anderson hasn't arrived yet, but you can wait at his desk." Trying the gate without signing in: "No access without prior authorization." A TV at reception plays an Arctic news item (see Media; no stat effect). `FIND LT. ANDERSON` is going through the gates.
- Officer at the next desk (wiki: Officer Wilson): Connor "Do you know what time Lieutenant Anderson usually arrives?" "Depends on where he was the night before... If we're lucky, we'll see him before noon..."
- Calling Hank (optional, not on chart): voicemail "Hi, this is Hank. Not here at the moment... don't expect me to call back. Beep... Whatever." Choice `LEAVE A MESSAGE` ("Lieutenant Anderson? This is Connor, I'm the android sent by CyberLife. It's almost noon and I'm waiting for you at the office.") or `HANG UP`. No effect.
- Chris Miller (optional): if Connor died: "Good Lord! They already repaired you?"; otherwise "You still here? I thought your assignment was over." If Connor intervened: "You were right about that android... it's been quiet in the cell all night. Scheduled for transfer today."
- `EXPLORE THE STATION`: PowerPyx "At Hank's desk, sit in the chair in front of it briefly, then get up again."
- `EXAMINE HANK'S DESK` / `LEARN ABOUT HANK`: scan items (in-game titles and sublines):

| Item | Text | Unlocks |
|---|---|---|
| `KNIGHTS OF THE BLACK DEATH` (headset) | "Dark Heavy Metal", "Release date - 2021" | `MUSIC` ("Listened to Hank's music") |
| `COFFEE CUP` | "Cold coffee", "Traces of caffeine" | |
| `JAPANESE MAPLE` | "Asian", "Shishigashira Shohin" | |
| `DONUTS` | "Calories: 452...", "Cholesterol: 19mg..." | |
| `DETROIT BASKETBALL CAP` | "Cotton: 90%", "Polyester: 10%" | `BASKETBALL` ("Analyzed the basketball cap") |
| `ANTI-ANDROID SLOGANS` | "Use your brain not your android", "Android-free space" | `ANTI-ANDROIDS` ("Looked at the anti-androids stickers") |
| `MATCHES` | "Origin: JIMMY'S BAR", "Wood, Phosphorus" | |
| `HAIRS` (on the chair) | "Canine hairs", "Saint Bernard Dog" | `DOG` ("Analyzed the dog hairs on the chair") |
| `RED ICE TASK FORCE 2027` | "Multi-department unit", "Responsible for the RED ICE network dismantle of 2028" | |
| Terminal: "Research LT. Anderson" | three articles: "DETROIT POLICE DISMANTLE A NETWORK OF RED ICE DEALERS" (Feb 3, 2028), "DETECTIVE ANDERSON PROMOTED TO THE RANK OF LIEUTENANT" (Aug 22, 2029; "Becoming the youngest lieutenant on the Detroit police force"), "NEW RECORD SEIZURE OF RED ICE IN DETROIT!" (Nov 23, 2031) | |

PowerPyx: "Scan the desk to find 8 clues." The string table also has `LT. HANK ANDERSON` (nameplate: "Born: 09/06/1985, Lives 115 Michigan Drive - Detroit"), `TISSUE` ("Rhinovirus") and `POLICE CASES`; the wiki lists the handkerchief as unused content. **There is no photo of Cole on the desk in the final game.** Wiki Unused Content: "Connor could originally find a photo of Cole on Hank's desk... Later, Connor could talk about it with Hank only for Hank to cut him off and warn him never to speak about his son." The `HANK'S SON` dialogue ("I know what happened to your son, and I want you to know-" / "You never talk about my son! You got that? Never!") is marked unused in the transcript.

### 2c. Hank arrives and Fowler's office (nodes 16, 19, 20)

`HANK ARRIVES`: if Connor died in The Interrogation: "Hello, Lieutenant. My name is Connor... My predecessor was unfortunately destroyed, but CyberLife transferred its memory..." Hank: "God, I saw you get shot in the head last night..." (Hank small down). Otherwise: "It's good to see you again, Lieutenant." Hank: "Uh, Jesus..." Fowler: "Hank! In my office!"

`FOLLOW HANK IN FOWLER'S OFFICE` (optional; Connor listens at the glass, then enters): Fowler assigns Hank all android cases ("I've got ten new cases involving androids on my desk every day... we're getting reports of assaults and even homicides, like that guy last night") and Connor as partner; Hank: "No fuckin' way! I don't need a partner, and certainly not this plastic prick!"; Fowler: "Either you do your job or you hand in your badge." `HANK STORMS OUT`. Connor alone with Fowler:

| Option | Line | Fowler | Effect |
|---|---|---|---|
| `ANDERSON` | "I wonder whether Lieutenant Anderson is really the best person for this investigation." | "I don't need a machine to tell me how to handle my men, okay? So get the fuck outta my office." | none |
| `POSITIVE` | "I'm very pleased to have joined the team..." | "Close the door on your way out." | none |
| `FILE` | "I would like to start reviewing the case files..." | "Talk to Hank. Close the door on your way out." | none |
| `LEAVE` | "Well, then... I won't keep you any longer." / "Have a nice day, Captain." | | none |

PowerPyx: "All responses to the Captain have no effect."

### 2d. Carlos' android in the holding cell (nodes 8, 10, 11)

Requires `ANDROID SAVED IN 'THE INTERROGATION'` (transcript: "Deviant didn't die in The Interrogation"; wiki chapter page: "only if the android was saved in The Interrogation"; The Interrogation flowchart ending "Android was sent back to his cell"). Must be done before sitting down at Hank's desk (wiki Notes: "It is possible to skip the interaction with Carlos Ortiz's HK400 if Connor does not go see him before sitting down at the desk").

Android: "They're gonna destroy me..."

| Option | Line | Effect |
|---|---|---|
| `SINCERE` | "It's probable. They have to analyze your biocomponents. They need to understand what happened." | none |
| `COLD` | "My objective was to capture you alive. What happens now is not my problem." | none |
| `COMPASSIONATE` | "I'm sorry. It's not what I wanted... but there's nothing I can do." | software instability small up |
| `INDIFFERENT` | "You're only a machine. It doesn't matter." | none |

Connor: "I know there's something you didn't tell me. I need to know, before they take you away..."

| Option | Line | Requires |
|---|---|---|
| `STATUETTE` | "The sculpture you made... Tell me more about it..." | "Looked at the statuette in Partners" (padlock); PowerPyx "Unlocked by seeing the statuette in the shower in Partners" |
| `SECRET` | "What you said yesterday... 'the truth is inside'... What does it mean?" | none listed |
| `rA9` | "What you wrote on the wall... rA9... What does it mean?" | none listed |
| `DEVIANTS` | "Do you know any other deviants? Are there many of you?" | none |

All lead to: "I'm going to die..." then `CARLOS' ANDROID SELF-DESTRUCTS` (wiki: "he will kill himself by repeatedly smashing his head against the cell window"; officer: "Open the cell, quick! Hurry! I'll call CyberLife... Clean this mess up..."). PowerPyx: "As Connor starts to walk away from the holding area, the android smashes its head into the glass until it dies." Wiki: "it will always kill itself afterwards." No answer is recorded in the transcript.

### 2e. Gavin in the break room (nodes 9, 12)

Gavin's opener depends on earlier chapters: Connor died ("a fucking ghost... Another son of a bitch takes his place..."); Connor alive ("Our friend the plastic detective is back in town! Congratulations on last night, very impressive!", plus "Could've got something outta that android if you haven't fucked it up..." if no confession); deviant never found ("It seems Hank has a new partner!... You his drinking buddy?").

1. `GREET` ("Hello, Detective Reed.") / `INTRODUCE` ("Hello. My name is Connor.") / `IGNORE`. All lead to "Never seen an android like you before... What model are you?"
2. `ANSWER` ("RK800. I'm a prototype." / Gavin: "So machines are gonna... replace us all... is that it?..") / `REFUSE` ("I'm sorry, but I'm not authorized to answer you...") / `IGNORE` ("Hey, asshole, I'm talkin' to you!"). Then "Hey, bring me a coffee, dipshit! GET A MOVE ON!"
3. `ACCEPT` (Gavin: "Do yourself a favor, stay outta my way.") / `REFUSE` ("I'm sorry, but I only take orders from Lieutenant Anderson."; Gavin punches Connor, wiki gallery) / `IGNORE` ("I gave you an order!", then as REFUSE). After REFUSE: "If Hank hadn't got in the way yesterday, I would've fucked you up for disobeying a human..." (if Connor intervened in The Interrogation) or "When a human gives you an order, you obey. Got it?..."

No stat effect on any Gavin option. The break-room TV that follows carries the public opinion drop (see Numbers and Media).

### 2f. Talk to Hank (node 21)

First statement (transcript ordering):

| Option | Line | Requires | Effect |
|---|---|---|---|
| `NEW CONNOR` | "I understand the destruction of my predecessor may have been unpleasant for you, Lieutenant. I'll do everything I can to make sure it doesn't happen again." | "Connor died in The Interrogation" | none |
| `LAST NIGHT` | "I'm... sorry I bothered you at the bar last night, Lieutenant. I guess I ruined your evening..." | "Spilled Hank's drink in Partners"; wiki: "If Connor spilled Hank's drink and failed to find the HK400 in Partners" | none stated |
| `UNDERSTANDING` | "I get the impression my presence causes you some inconvenience, Lieutenant. I'd like you to know I'm very sorry about that." | none | none |
| `PRAGMATIC` | "Listen, I know you don't like me, but we're going to have to work together, we'll both have to make an effort." | none | none |
| `CONSTRUCTIVE` | "It's an honor to be working with you, Lieutenant. I'm sure we'll make a great team." | none | none |

Follow-up: `PARTNERS` ("Now that we're partners, it would be great to get to know each other better.") / `POSITIVE` ("...I'm very happy to be working with you...") / `DESK` ("Is there a desk anywhere I could use?" Hank: "No one's using that one."). `THANKS` ("I wanna thank you for last night, Lieutenant. Without your intervention, I probably would have been destroyed." Hank: "I'm already regretting it.") requires "Hank intervened during The Interrogation" but the wiki says "due to a bug it's permanently locked".

### 2g. Desk topics (node 18 `LEARN ABOUT HANK` content, asked from the spare desk)

Repeatable menu; topics appear as earlier answers and scans unlock them (PowerPyx: "Additional questions will present themselves as you get answers").

| Option | Exchange | Requires | Hank |
|---|---|---|---|
| `DOG` | "You have a dog, right?" / "How do you know that?" / "The dog hairs on your chair. I like dogs. What's your dog's name?" / "What's it to you? Sumo, I call him Sumo." | scanned `HAIRS` | small up |
| `BASKETBALL` | "You're a Detroit Gears fan, right? Denton Carter scored 53% of his shots from the three-point line yesterday. Did you see the game?" / "That's what I was watchin' at the bar last night." / "Oh..." | scanned the cap | small down |
| `MUSIC` | "Do you listen to Knights of the Black Death? I really like that music. It's... full of energy..." / "You listen to Heavy Metal?" / "Well, I don't really listen to music, as such... but I'd like to." | listened to the headset | small up |
| `ANTI-ANDROIDS` | "...Is there any reason in particular you despise me?" / "Yeah... there is one." | scanned the stickers | small down |
| `FOWLER` | "Have you known Captain Fowler for long?" / "Yeah... Too long." | none | none |
| `HOURS` | "Do you always arrive at the office at this time?" / "I arrive when I arrive. Stop busting my balls, okay?" | none | none |
| `START WORKING` | "If you have any files on deviants, I'd like to take a look at them..." / "Terminal's on your desk. Knock yourself out." | none | none; ends the menu, leads to `EXAMINE FILES` |

### 2h. Examine files (node 22)

Connor's terminal (wiki Unused Content had Hank mention "37 cases"; the final line is "Terminal's on your desk"). Connor's summary: "243 files... The first dates back nine months... It all started in Detroit... And quickly spread across the country..." The six readable reports, all "CASE ASSIGNED TO LT. ANDERSON":

| # | Reference | Victim | Status | Offense / report | Details (in-game text) |
|---|---|---|---|---|---|
| 1 | DISAPPEARANCE | GORDON LOPEZ | OPEN | 10/04/38 | "The plaintiff reports that he left his android at home as usual when he went to work. When he returned, the android was nowhere to be found. No trace of a break-in... The android may have left the home without being ordered to." |
| 2 | ATTACK | CHARLES BELL | OPEN | 09/14/38, rep. 09/15/38 | "attacked by a AV500 #234 777 821 model android working as a waiter in the FAST CONEY DOGS restaurant chain situated at 842 Chamberlain Avenue... 'lunged' at him unexpectedly and attempted to strangle the man... The android remains at large." |
| 3 | ATTACK | SARAH CORNWAL | OPEN | 10/22/38, rep. 10/23/38 | "attacked by her android, an AP700 #480 913 802 model. The android also trashed several rooms in the house before taking flight." |
| 4 | DISAPPEARANCE | FLOYD MILLS | OPEN | 10/04/38, rep. 10/05/38 | "the manager of the EDEN CLUB, reported the unexplained disappearance of a 'Sex android', model WR400 #641 790 831. The android disappeared after accompanying a customer to his home and never returned to the club." (wiki Notes: this is North's file) |
| 5 | ATTEMPTED MURDER | LEO MANFRED | SOLVED | 11/05/38 | Carl alive: "Leo MANFRED was found unconscious in the home of his father, Carl MANFRED... The android is thought to be a prototype (unknown model and serial number) and was destroyed at the scene by attending officers." Carl dead: "Famous painter Carl MANFRED was found dead in his home following an altercation between his android and his son. The latter's witness statement attests to the android behaving violently..." (Markus' file; wiki: "android without a picture") |
| 6 | AGGRESSION or HOMICIDE | TODD WILLIAMS | OPEN | 11/05/38, rep. 11/06/38 | Todd alive (AGGRESSION): "The plaintiff claims he was violently attacked by his domestic android, an AX400 model. The android had just returned from being repaired the previous day and had shown signs of aggression in the past." Todd dead (HOMICIDE): "The victim's body was found by a friend... death by gunshot wound. The murder weapon may have belonged to the victim. His android, an AX400, was not found on the scene and is the main suspect." |

Connor's conclusion: Kara alive, Todd alive: "An AX400 is reported to have assaulted a man last night. That could be a good starting point for our investigation." Todd killed: "...to have murdered a man last night..." Kara died in Stormy Night: "We could follow up on one of these cases. See if we could figure out what happened..." Hank, reading his tablet: "Uh, Jesus..."

### 2i. Talk about the case and Hank is mad (nodes 23, 24)

Round 1 (`TALK ABOUT THE CASE`; PowerPyx "All responses have no effect"):

| Option | Connor | Hank |
|---|---|---|
| `DIRECT` | "You shouldn't let your personal situation hamper the investigation, Lieutenant." | "You don't know what the hell you're talking about. So why don't you just run your program and shut the fuck up?" |
| `AGGRESSIVE` | "If the situation doesn't suit you, Lieutenant, you should ask to be relieved of duties and let me work with someone else." | "I know exactly what I have to do! So keep your advice to yourself and mind your own business!" |
| `PROFESSIONAL` | "I know you didn't ask for this investigation, Lieutenant, but I'm sure you're a professional." | "Why don't you go fuck yourself?" |
| `UNDERSTANDING` | "I understand you're facing personal issues, Lieutenant, but you need to move past them... and-" | "Hey! Don't talk to me like you know me. I'm not your friend and I don't need your advice, okay?" |

Round 2 (`HANK IS MAD`; PowerPyx "Connor can't win with this one. All responses cause Hank▼"):

| Option | Connor |
|---|---|
| `DETERMINED` | "I've been assigned this mission, Lieutenant. I didn't come here to wait until you feel like working." |
| `RESIGN THE MISSION` | "I suggest you sort out your personal issues and let me work with someone more competent." |
| `THREATEN` | "I'm going to file a report with my superiors that you refuse to work on this investigation." |

Hank grabs Connor by the collar and shoves him against the partition: "Listen, asshole. If it was up to me, I'd throw the lot of you in a dumpster and set a match to it. So, stop pissing me off... or things are gonna get nasty." Then the ending (section 5).

---

## 3. Numbers

No probabilities, no timers and no numeric values are published for this chapter. All changes are direction and size (small/large) icons.

### Amanda

Starting level per the Relationship Stat page: "Trusted (Initial)".

| Moment | Change | Source line |
|---|---|---|
| Deviant not found in Partners | large down | Waiting for Hank...: "Connor failed to find the deviant in Partners {{Icon\|largedown}}"; Relationship Stat: "When Connor fails to find the deviant in Partners."; transcript `Amanda LargeDown` on the not-found branch |
| Confession, Connor survived | large up | WfH: "Connor got the confession out of the deviant and survived the interrogation {{Icon\|largeup}}"; Relationship Stat: "When Amanda shows admiration for Connor's way of successfully interrogating the deviant during The Interrogation in Waiting for Hank..."; PowerPyx "Amanda▲▲▲" |
| Connor died in The Interrogation | small down | WfH: "Connor was killed by the deviant during the interrogation {{Icon\|down}}"; Relationship Stat: "When Amanda speaks of her disappointment about the other Connor..."; PowerPyx "Amanda▼" |
| Found, no confession, Connor survived | small down | WfH: "Connor failed to get the confession out of the deviant and survived The Interrogation {{Icon\|down}}"; transcript `Amanda SmallDown` |
| `FRIENDLY` | small down | WfH: "Picking 'friendly' or 'adapt' when asked about the best approach with Hank {{Icon\|down}}"; PowerPyx "FRIENDLY: Amanda▼" |
| `ADAPT` | small down | same line; PowerPyx "ADAPT: Amanda▼" |
| `INDIFFERENT` | small up | WfH: "Picking 'indifferent' when asked about the best approach with Hank {{Icon\|up}}"; PowerPyx "INDIFFERENT: Amanda▲" |
| `DON'T KNOW`, all question 1 and 2 answers | none | PowerPyx "No effect" (DEVIANCY and DON'T KNOW left blank); no icon in transcript |

### Hank

| Moment | Change | Source line |
|---|---|---|
| `HANK ARRIVES` after Connor died in The Interrogation | small down | WfH: "Connor was killed by the deviant during the interrogation {{Icon\|down}}" (under Hank); Relationship Stat: "When first meeting Hank in Waiting for Hank... if Connor previously died in The Interrogation."; PowerPyx "Hank is a little unnerved to see you up and around. Hank▼"; transcript `Hank SmallDown` |
| `DOG` | small up | WfH: "Inquiring about 'dog' when talking to Hank {{Icon\|up}}"; PowerPyx "Hank▲" |
| `MUSIC` | small up | WfH: "Inquiring about 'music'... {{Icon\|up}}"; Relationship Stat: "Choosing 'dog' or 'music'... (two increases possible)" |
| `BASKETBALL` | small down | WfH: "Inquiring about 'basketball'... {{Icon\|down}}"; PowerPyx "Hank points out that Connor made him miss last night's game. Hank▼" |
| `ANTI-ANDROIDS` | small down | WfH: "Inquiring about 'anti-androids'... {{Icon\|down}}" |
| `HANK IS MAD` | small down, unavoidable | WfH: "When Hank gets angry with Connor (unavoidable) {{Icon\|down}}"; Relationship Stat: "When Hank gets mad at the end of Waiting for Hank...."; PowerPyx "All responses cause Hank▼". The transcript shows no icon on these options |
| `FOWLER`, `HOURS`, opening statements, follow-ups, Fowler's office, Gavin | none | PowerPyx "No effect" throughout; no icons in transcript |

Range from desk topics alone: +2 small (dog and music) to -2 small (basketball and anti-androids), plus the unavoidable -1.

### Software instability

| Moment | Change | Source line |
|---|---|---|
| `COMPASSIONATE` to Carlos' android | small up | WfH: "Selecting 'compassionate' when talking to Carlos Ortiz's HK400 had it survived the interrogation {{Icon\|up}}"; Software Instability: "Selecting 'compassionate' when talking to Carlos Ortiz's HK400 in Waiting for Hank..."; PowerPyx "COMPASSIONATE: Software Instability▲"; transcript `SoftwareInstability SmallUp` |

No other software instability change. The Software Instability page lists nothing else for this chapter.

### Public opinion

| Moment | Change | Source line |
|---|---|---|
| Break-room CTN TV after the Gavin scene | small down | WfH: "Listening to the CTN TV news report on the television in the break room after talking to Gavin {{Icon\|down}}"; Public Opinion: "Listening to the television in the break room after talking to Gavin in Waiting for Hank..."; transcript `PublicOpinion SmallDown` on both the found and not-found news variants. PowerPyx attributes it to Gavin ("No matter what options you pick, it results in Public Opinion▼"); a PowerPyx commenter: "you lose public opinion when talking to Gavin, but not because of him, but the news report on the TV after the encounter" |

The reception TV (Arctic news) and the magazines carry no opinion change.

### Timers and probabilities

None documented. No risk action exists in the chapter. No timer is stated on any dialogue round. Whether Hank's arrival is time- or trigger-based is not stated (Open questions).

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Partners: deviant not found | Amanda large down and her "disappointed" lines; Gavin's "new partner" opener; break-room TV runs the Carlos Ortiz body story; files and Amanda close "Continue your investigation" | WfH Amanda list; transcript conditions; Gavin page |
| Partners: `SPILL HANK'S DRINK` (+ crime unsolved per wiki) | `LAST NIGHT` opening statement | WfH Notes: "If Connor spilled Hank's drink and failed to find the HK400 in Partners, the dialog 'LAST NIGHT' will be unlocked."; transcript unlock "Spilled Hank's drink in Partners" (no "not found" condition shown) |
| Partners: `EXAMINE STATUE` | `STATUETTE` question to Carlos' android | transcript "Looked at the statuette in Partners"; PowerPyx |
| The Interrogation: confession, survived | Amanda large up; Gavin "Congratulations on last night" | WfH; Gavin page |
| The Interrogation: found, no confession | Amanda small down; Gavin "Could've got something outta that android" | WfH; Gavin page |
| The Interrogation: Connor died | Amanda small down; Hank small down on arrival; extra grave in the Zen Garden; `REGRETS` (Amanda) and `NEW CONNOR` (Hank) unlocked; Chris and Gavin "ghost" lines | The Interrogation cross-chapter list ("Another gravestone...", "Connor can express regret", "Chris shocked to see Connor", "Gavin sarcastically remarks about his reincarnation", "Hank is unhappy to see Connor", "Connor can console Hank") |
| The Interrogation: "Android was sent back to his cell" | `ANDROID SAVED IN 'THE INTERROGATION'`: Carlos' android in the cell; `INTERVENTION` answer to Amanda; Chris "Scheduled for transfer today" | chart; transcript; WfH flowchart |
| The Interrogation: Connor intervened (Gavin drew his gun) | Gavin's post-refusal line "If Hank hadn't got in the way yesterday..." | transcript condition "Connor intervened during The Interrogation" |
| The Interrogation: android or Connor died in the room | Thirium traces visible in the interrogation room via mind palace (flavour) | WfH cross-chapter impacts |
| The Hostage: Connor died | Grave in the Zen Garden | WfH flowchart "Check the Graves... only if Connor previously died in The Hostage and/or The Interrogation" |
| Broken: Obey Carl (Carl dies) | `READ "FAMOUS PAINTER DIES"`; Markus file variant "Famous painter Carl MANFRED was found dead" | Broken cross-chapter: "Obey Carl: ... Read Famous Painter Dies in Waiting for Hank..."; Famous Detroit Painter Dies: "only show up if Markus chose not to attack Leo" |
| Broken: Push Leo (Carl lives) | `READ "ROBOTIC PARENTING"`; Markus file variant "Leo MANFRED was found unconscious" | Broken: "Push Leo: ... Read The Three Laws of Robotic Parenting in Waiting for Hank..."; magazine page: "only if Markus attacked Leo" |
| Stormy Night: Kara killed Todd | Todd file is HOMICIDE; Connor says "murdered"; officer says "the AX400 that killed the guy" | transcript conditions |
| Stormy Night: Todd alive | Todd file is AGGRESSION; wiki: "he can be inside the Police station filing a police report of Kara attacking him" | WfH cross-chapter impacts |
| Stormy Night: Kara died | `HANK LEFT TO GET LUNCH` ending | WfH flowchart "only if Kara died in Stormy Night" |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `DOG` asked (Connor knows Sumo's name) | Russian Roulette: "Calm Hank's Dog" instead of "Rile Hank's Dog" when Sumo blocks Connor | Russian Roulette flowchart: "Calm Hank's Dog (if Connor learned the dog's name in Waiting for Hank...) OR Rile Hank's Dog (if not)"; transcript (Russian Roulette): "Connor knows Sumo's name / Asked Hank about his dog in Waiting for Hank..."; Sumo page |
| Cole | **Nothing from this chapter.** The desk photo of Cole and the `HANK'S SON` topic are cut content. Connor learns of Cole in Russian Roulette ("Find Picture of Hank's Son on the kitchen table - required to talk to Hank about it during The Bridge, and to give the correct name during Battle for Detroit") | WfH Unused Content; Russian Roulette flowchart |
| `CARLOS' ANDROID SELF-DESTRUCTS` | His body is in the evidence room in Last Chance, Connor | WfH: "Its body will reappear again inside the evidence room in Last Chance, Connor."; Last Chance, Connor: "Body of Carlos' Android (if died in previous chapters)"; "Daniel and Traci can only be reactivated if Carlos' Android died in previous scenes." |
| Skipping the cell conversation | The android's memory recording is still usable later; his fate is left open | WfH Notes; Last Chance, Connor Notes: "It is possible to find the recording of Carlos' Android telling Connor the secret without him self-destructing in Waiting For Hank, just simply skip the conversation." |
| `HANK GOT A LEAD` | On the Run (Connor and Hank follow the AX400 lead to Ravendale) | ending; Hank page |
| `HANK LEFT TO GET LUNCH` | Next Connor scene is The Nest's Chicken Feed lunch | Hank page: "After Waiting for Hank... (Only if Kara was already dead)... Hank decides to head for lunch" |
| Amanda, Hank, instability, public opinion changes above | carried | stat pages |
| Case files, magazines, news | knowledge only | |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `HANK GOT A LEAD` | none | Kara alive after Stormy Night (wiki: "only if Kara didn't die in Stormy Night"). An officer (wiki chapter text says Chris Miller; the transcript speaker key is `HARVEY`) interrupts the collar grab: "Lieutenant... uh... sorry to disturb you. I have some information on the AX400 that attacked the guy last night... It's been seen in the Ravendale district." (Todd killed: "...the AX400 that killed the guy last night... It's been sighted in the Ravendale district."). Hank: "I'm on it." |
| `HANK LEFT TO GET LUNCH` | none | Kara died in Stormy Night. Hank lets go; Connor: "Where are you going?" Hank: "Lunch. Bullshit makes me hungry." |

Both endings follow the unavoidable `HANK IS MAD`. Nothing Connor chooses in this chapter decides which ending plays. No death, failure, trophy or "mission failed" ending.

---

## 6. Media

Three magazines (Detroit Today, Magazine page #28 to #30) on a desk in the centre of the station (PowerPyx: "on the counter near Hank's desk... Be sure to check both pages"). Exactly one of the first two appears. Two TVs. Unused: a news report on Todd ("An AX400 android is reported to have attacked its owner in a Detroit suburb last night..." / "...is suspected of killing its owner...") exists in the string table, matching the wiki's "Unused dialogue shows that there was supposed to be a news report determined by whether or not Kara killed Todd."

**`READ "FAMOUS PAINTER DIES"`: *Detroit Today*, "Famous Detroit Painter Dies"** (#28; only if Carl died in Broken)
- Cover: "Carl Manfred: 'One of Detroit's brightest lights'"; "UN warns of World War Three"; "President Warren at 33% approval".
- "Reports of famous artist Carl Manfred's death have been confirmed. The coroner's described a 'fatal cardiac event', induced by a stressful domestic situation. Manfred's son, Leo, has asked the media to respect his family's privacy at this difficult time."
- "Carl Manfred rose to fame in the 2020s as a figurehead of neo-symbolism, with powerful and dark works in the mold of Francis Bacon." A dark period "marked by alcohol and drugs", but he had "returned to work in recent months".
- The Governor "describing Manfred as 'one of Detroit's brightest lights'. A collection of Manfred's paintings will be auctioned by his estate in the coming weeks."

**`READ "ROBOTIC PARENTING"`: *Detroit Today*, "The Three Laws of Robotic Parenting"** (#29; only if Carl lived)
- Cover: "Family life has never been easier..."; "UN warns of World War Three"; "President Warren at 33% approval".
- CyberLife's child range, once doubted, is "one of CyberLife's bestsellers". "Customizable, removable LED, no hunger, no expensive childcare... no smelly diapers!"
- "With unemployment at 37.3%, $7,500 for a child that avoids the dreaded teenage years and shelling out for college, seems like a wise investment compared to $350,000 over 17 years."
- Sociologist Mary Wallace: "these androids are leading fewer parents to have children at a time when our birthrates are already far too low", "the baby doom". Jason Graff (CyberLife director of humanization): "the usual resistance to new ideas", "a triumph of humanization design".

**`READ "IVANOFF SAYS "NIET"!"`: *Detroit Today*, "Ivanoff Says 'Niet'!"** (#30; always)
- Cover: "Russian President responds to Warren's warning"; "CyberLife world's first trillion dollar company"; "Global population reaches 10 billion".
- After Warren's demand that "all Russian troops withdraw from the arctic immediately", Ivanoff branded her comments "megaphone diplomacy" and said "US sabre-rattling is the number one threat to stability in the region."
- "The Kremlin produced a detailed statement outlining Russia's claim to the territory"; Ivanoff "would 'remind President Warren' that 'the United States is subject to UN conventions, like everybody else.' The conflict shows no signs of abating."

**Reception TV (Watch TV, no effect):** "Tensions in the Arctic have reached a new level, with a Russian carrier and an American patrol boat reported to have clashed last night. Several warning shots were exchanged... The Minister for Defense, Denis Riggs, has spoken of 'intolerable provocation that cannot go unanswered'. The countries in the region, particularly Sweden and Canada, have called for military forces to withdraw and an international conference to be held..."

**Break-room CTN TV (after Gavin; public opinion small down):**
- Deviant found in Partners: "Several sources report that CyberLife has provided Detroit Police with a prototype detective android. Although police assistant androids have existed for several years now, this would be the first case of an android being authorized to play an active role in criminal investigations. We contacted CyberLife for comment but no one was available to answer our questions."
- Deviant not found: "Detroit Police found the body of thirty-year-old Carlos Ortiz in his home last night... He is thought to have died several weeks ago. The police are conducting forensic tests but appear to be treating the death as a homicide. The victim's android is also reported missing."
- Then, either way (Rosanna Cartland): "The first book written by an artificial intelligence has just been published... Do Humans Dream of Mammalian Sheep? has shot to the top of the bestseller list... Designed by CyberLife, the AI known as VOLTAIRE analyzed human centers of interest on social networks for several months... the odds are that most of the books written in the coming years will be the work of artificial intelligence." (This is the wiki's "News mentions the unsolved case" target from the Partners note: the not-found variant.)

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) tags three nodes with chapter 12, in file order: `R12` (media, line 1379), `C08` (decision, line 1430), `C08b` (decision, line 1457). Engine: gate `C08b` at `benchmark/story-engine.mjs` line 82 (`s.suspectAlive`); effects line 201 (`C08`: option 0 `hank(1)` and `knowsSumo=true`, option 1 `hank(-1)`) and line 202 (`C08b`: option 0 `si(1)`; both options set `suspectAlive=false`, `evidence.ortizBody=true`); media conditions `carlDead`/`carlAlive` at line 31; media effects applied at line 181.

### What exists

- `R12` "A magazine on the next desk and the break-room TV": Ivanoff (always), Famous Painter Dies (`carlDead`), Robotic Parenting (`carlAlive`), one TV item with two facts (Arctic clash; "You are the first android authorized to take an active role in criminal investigations") and `publicSupport: -1`.
- `C08` "Getting to know Hank": "Ask about him: his dog, his music, his life." / "Keep it strictly about the case and brief him coldly."
- `C08b` "The android in the cell": "Talk to him with compassion." / "Ignore him." Note: "He self-destructs in the cell either way".

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `IN THE ZEN GARDEN`, `FIND AMANDA`, `FIND MAGIC STONE`, `CHECK THE GRAVES` | missing | narration only; graves need `connorDeaths > 0` |
| `TALK WITH AMANDA` | missing | Three questions are missing, and the third (`FRIENDLY`/`ADAPT` small down, `INDIFFERENT` small up, `DON'T KNOW` none) has stat effects. Amanda's opening reaction is also missing: large down if not found, large up for confession and survival, small down for no confession or death. The engine instead gives `amanda(1)` at `C05` option 0 (Partners) and `amanda(1)` at `C06` options 0, 1 and 2 (Interrogation). It never applies the large down for not finding the deviant. `C06` option 3 (no confession) gets no Amanda change; the game gives a small down here. `C06` option 2 (forced probe, self-destruct, no confession by the transcript's terms) gets `amanda(1)`; the game appears to give a small down (see Open questions) |
| `ARRIVE AT POLICE STATION`, `FIND LT. ANDERSON` | folded into `C08`/`R12` situation | acceptable as narration |
| `READ "FAMOUS PAINTER DIES"`, `READ "ROBOTIC PARENTING"`, `READ "IVANOFF SAYS "NIET"!"` | `R12` | present, with correct `carlDead`/`carlAlive` gating. Placement "on the empty desk beside his" is close enough (wiki: "a desk in the center of the station") |
| Reception TV, break-room TV | `R12` tv item | Mislabelled and incomplete. The Arctic item plays on the reception TV and has no opinion effect, but the benchmark puts it in the break-room item that carries the -1. The break-room report has two variants by Partners outcome, and only the "found" variant is present; on a not-found path the game shows the Carlos Ortiz body story instead. The VOLTAIRE book report is missing. The fact "You are the first android..." adds an identification the broadcast does not make: the report says "would be the first case of an android being authorized" and does not name Connor. The `-1` matches the small down |
| `EXPLORE THE STATION`, `TALK WITH GAVIN` | missing | Three dialogue rounds with no stat effect. The opinion drop belongs to the TV that follows (covered by `R12`) |
| `ANDROID SAVED IN 'THE INTERROGATION'` | `C08b` gate `s.suspectAlive` | Roughly right. In the game the gate is the Interrogation ending "Android was sent back to his cell". The engine leaves `suspectAlive` true after `C06` option 3 and after `C07` option 0 unpressured; check that this matches the chart's sent-back-to-cell conditions in the ch09 note |
| `TALK WITH CARLOS' ANDROID` | `C08b` | Partial. Option 0 matches `COMPASSIONATE` (`si(1)`, correct). Option 1 "Ignore him" stands for three no-effect answers (`SINCERE`, `COLD`, `INDIFFERENT`) and also for skipping the visit, which in the game are different things. The second question (`STATUETTE`/`SECRET`/`rA9`/`DEVIANTS`) is missing |
| `CARLOS' ANDROID SELF-DESTRUCTS` | `C08b` outcome (both options) | The game triggers it only after the conversation. Skipping the visit leaves him unresolved (wiki Notes; Last Chance, Connor Notes), but the engine destroys him on both options. Wording: the engine says "Later that night... self-destructs in his cell"; the game has him smash his head against the cell glass as Connor walks away, in the morning, in front of officers |
| Order | `R12`, `C08`, `C08b` | `C08b` comes after `C08` in file order. In the game the cell visit must happen before Connor sits at Hank's desk (wiki Notes), so it belongs before `TALK TO HANK` |
| `EXAMINE HANK'S DESK`, `LEARN ABOUT HANK` | `C08` situation ("a basketball cap, anti-android stickers, heavy-metal albums, dog hair on his chair, and a file on his past as a decorated officer") | Acceptable as narration. "heavy-metal albums" should be the headset playing Knights of the Black Death |
| `HANK ARRIVES` | `C08` situation ("arrives late and hungover") | The Hank small down after a Connor death is applied at the death in `connorDies` (line 176, `hank(-1)`), which is equivalent in total |
| `FOLLOW HANK IN FOWLER'S OFFICE`, `HANK STORMS OUT` | missing | no stat effect; narration would carry the assignment of the android cases |
| `TALK TO HANK` (`NEW CONNOR`, `LAST NIGHT`, `UNDERSTANDING`, `PRAGMATIC`, `CONSTRUCTIVE`; `PARTNERS`, `POSITIVE`, `DESK`) | missing | No stat effects. `LAST NIGHT` would need a spill flag, which Partners does not store (ch06 note) |
| Desk topics (`DOG`, `MUSIC`, `BASKETBALL`, `ANTI-ANDROIDS`, `FOWLER`, `HOURS`, `START WORKING`) | `C08` options 0 and 1 | Mismodelled. The game lets Connor ask each topic separately: two small ups, two small downs, two neutral. The benchmark bundles them into "his dog, his music, his life" (+1) against "Keep it strictly about the case and brief him coldly" (-1), which is not a game option. A run can therefore never get +2, can never pick up a basketball or anti-android down, and gets a down for staying neutral. In the game, asking nothing (`START WORKING` straight away) costs nothing here |
| `knowsSumo` | set by `C08` option 0 and unconditionally by `C11` (line 213) | Never read. `C11`'s situation names Sumo whether or not Connor asked, and the Russian Roulette `Calm`/`Rile Hank's Dog` split is not modelled. With `C11` setting `knowsSumo=true` unconditionally, the flag is meaningless |
| `C08` outcome "he does not want to talk about why he transferred" | extra | Nothing in the game's lines supports this; there is no transfer. The cut `HANK'S SON` line is the nearest thing ("You never talk about my son!") |
| `EXAMINE FILES` | missing | Six case files, three of them path-dependent (Leo/Carl, Todd alive/dead). They are knowledge-only and good material for a media-style or event scene |
| `TALK ABOUT THE CASE`, `HANK IS MAD` | missing | Two dialogue rounds. The second ends in an unavoidable Hank small down that the engine never applies |
| `HANK GOT A LEAD` / `HANK LEFT TO GET LUNCH` | `C08` outcomes ("The two of them are sent to look at a new case.") | Only the lead ending is narrated, and it is narrated even when Kara is dead. It should depend on `s.kara` (Kara alive after Stormy Night), and on the lunch path the next Connor scene is The Nest |
| `evidence.ortizBody`, `suspectTrusts` | written by `C06`/`C07`/`C08b` | Never read by `evidenceRoutes` (line 26) or anywhere else, so the Carlos body and memory routes into Last Chance, Connor are not modelled (this belongs in the ch29 note) |

Effects present that the wiki does not support: `C08` option 1 `hank(-1)` (no such option in the game); `C05` option 0 `amanda(1)` and `C06` options 0 to 2 `amanda(1)` in place of this chapter's Amanda reactions; `C08b` making the android self-destruct when Connor skips him.
Effects the wiki states that are absent: Amanda large down if the deviant was not found; Amanda large up for confession and survival (the engine has +1 split across chapters); Amanda small down for no confession; Amanda `FRIENDLY`/`ADAPT` down and `INDIFFERENT` up; Hank `MUSIC` up as a separate +1; Hank `BASKETBALL` and `ANTI-ANDROIDS` downs; Hank unavoidable down at `HANK IS MAD`.

Side note: the experience prompt shows Amanda's satisfaction from chapter 12 on with `LEVELS.hank(state.amandaTrust)` (`experience-prompt.mjs` line 53). From the initial 0 this reads "Neutral", but the wiki gives Amanda's starting level as "Trusted (Initial)".

---

## 8. Open questions

1. **Hank's arrival trigger.** Is `HANK ARRIVES` timed, or triggered by scanning the desk or sitting in his chair? PowerPyx ties `EXPLORE THE STATION` to sitting in Hank's chair ("sit in the chair in front of it briefly, then get up again"). Can Gavin, the magazines and the cell be visited before Hank arrives, or only while he is in Fowler's office?
2. **Amanda question 1 when the deviant was not found.** The transcript prints "The interrogation seemed... challenging... What did you think of the deviant?" with no condition, but there was no interrogation on that path. Does Amanda skip to the Hank question?
3. **Confession and death together.** If Connor got a confession and was then shot (pressure, then intervene), which Amanda reaction plays: the death small down, the confession large up, or both?
4. **Probe route.** Probing the memory (flashback, then self-destruct, with no spoken confession) counts as "found the deviant but didn't get a confession" by the transcript's terms, so Amanda small down. Confirm. The benchmark currently gives `amanda(1)` there.
5. **`LAST NIGHT` condition.** The wiki requires a spilled drink and a failed Partners; the transcript shows only "Spilled Hank's drink in Partners". Can it appear after spill plus found deviant? Is it in the first-statement round (transcript) or the follow-up round (PowerPyx shows "?" among the follow-ups)?
6. **The eight desk clues.** PowerPyx: "Scan the desk to find 8 clues." The transcript lists nine scannable items plus the terminal research. Which eight count for `LEARN ABOUT HANK`? Is the nameplate (115 Michigan Drive) scannable?
7. **Hank-is-mad timing.** Is the unavoidable Hank down applied on the round-2 answer (PowerPyx) or at the collar grab? Does any round-1 answer carry an icon in game? The transcript shows none on either round.
8. **Public opinion drop if the TV is skipped.** A PowerPyx commenter says leaving the break room before the report avoids the drop here but that "Markus sees that report on the metro in the Jericho-chapter, and the loss in public opinion happens there". The wiki Jericho chapter page has no such entry. Check in game.
9. **Skipped cell visit.** If Connor never visits Carlos' android, does the android survive into Last Chance, Connor (no body in the evidence room, memory available)? Wiki Notes say the fate is "unknown".
10. **Todd at the station.** The wiki says a surviving Todd "can be inside the Police station filing a police report"; the transcript's reception couple ("I'm getting nervous, Mark") does not name him. Confirm whether Todd appears and where.
11. **Ending speaker.** The wiki chapter text and Hank page say Officer Chris Miller brings the Ravendale lead; the transcript speaker key is `HARVEY`. Confirm who delivers it.
12. **Kara dead but Todd file.** If Kara died in Stormy Night (Todd alive), which Todd file variant appears, and does Connor still say the AX400 line? The transcript only shows the `KARADEAD` line for Connor.
13. **Grey nodes on the PowerPyx save.** `TALK WITH GAVIN` and all three reads are grey on a "100%" chart. Confirm that grey means revealed but not reached on that save (as in the ch04 and ch06 notes), not some other state.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-waiting-for-hank-walkthrough-100/ | walkthrough text: Zen Garden locations, Amanda answers with arrows, magazine locations, desk clue count, Hank arrival down, Gavin opinion claim, Carlos android options, Hank topics with arrows, "Hank is mad" downs, ending conditions; reader comments on graves, `LAST NIGHT`, the TV drop |
| https://www.powerpyx.com/wp-content/uploads/Waiting_for_Hank_1.jpg | whole 100% chart; overall layout and the parallel HANK ARRIVES track |
| https://www.powerpyx.com/wp-content/uploads/Waiting_for_Hank_2.jpg | zoom: IN THE ZEN GARDEN, FIND AMANDA, FIND MAGIC STONE, CHECK THE GRAVES, TALK WITH AMANDA, side-branch glyphs |
| https://www.powerpyx.com/wp-content/uploads/Waiting_for_Hank_3.jpg | zoom: ARRIVE AT POLICE STATION to HANK STORMS OUT, the WAIT FOR HANK bracket, yellow ANDROID SAVED node, cross-chapter padlock on CARLOS' ANDROID SELF-DESTRUCTS, grey nodes |
| https://www.powerpyx.com/wp-content/uploads/Waiting_for_Hank_4.jpg | zoom: TALK TO HANK, EXAMINE FILES, TALK ABOUT THE CASE, HANK IS MAD, both endings |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json | chapter page (saved as `/tmp/flowcharts/ch12/wiki.txt`): text flowchart with gating, cross-chapter impacts, Amanda/Hank/instability/opinion lists, Notes (`LAST NIGHT`, `NEW CONNOR`, `THANKS` bug, skip the cell), Unused Content (Cole photo, `HANK'S SON`, Todd news) |
| https://detroitbecometext.github.io/chapters/12 | fan transcript; text read from https://detroitbecometext.github.io/i18n/en.json and the chapter template in https://detroitbecometext.github.io/chunk-JCLJBPDO.js: all dialogue options and lines, stat icons per option, unlock conditions, scan item texts, case files, TV scripts |
| detroitbecometext.github.io, Russian Roulette chapter (same data files) | Russian Roulette condition "Connor knows Sumo's name / Asked Hank about his dog in Waiting for Hank..." |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Amanda and Hank change lists for this chapter; Amanda "Trusted (Initial)" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | `COMPASSIONATE` small up is the only change |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | break-room TV small down |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazines #28 to #30 in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Famous_Detroit_Painter_Dies&prop=wikitext&format=json | article text; location condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Three_Laws_of_Robotic_Parenting&prop=wikitext&format=json | article text; location condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Ivanoff_Says_%22Niet%22!&prop=wikitext&format=json | article text |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Broken&prop=wikitext&format=json | Obey Carl / Push Leo and which magazine each unlocks |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Interrogation&prop=wikitext&format=json | Interrogation endings and cross-chapter list (grave, regret, Chris, Gavin, Hank, thirium) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Russian_Roulette&prop=wikitext&format=json | Calm/Rile Hank's Dog depends on learning Sumo's name here; Cole photo found there |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Carlos body and memory in the evidence room; skipping the cell keeps the recording |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | chapter summary, Fowler scene, collar grab, endings, lunch path into The Nest |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Zen Garden scene summary |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Gavin_Reed&prop=wikitext&format=json | Gavin openers by condition; punch on refusal |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carlos%27_Android&prop=wikitext&format=json | cell self-destruct; skipping leaves his fate ambiguous; body in the evidence room |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Sumo&prop=wikitext&format=json | dog hairs on the chair, Saint Bernard, name learned here |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Cole_Anderson&prop=wikitext&format=json | Cole facts; learned in Russian Roulette, not here |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Zen_Garden&prop=wikitext&format=json | graveyard of killed Connor models |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json | checked for the metro news opinion drop claimed by a PowerPyx commenter; nothing found |
| https://detroit-become-human.fandom.com/api.php?action=query&list=allpages&apprefix=Waiting&format=json | confirms there is no Flowchart or Transcript subpage for this chapter |
