# Chapter 15: The Nest (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots and walkthrough text, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, magazine, character and later-chapter pages, and the fan transcript at detroitbecometext.github.io (chapter 15). The fan transcript's text was read from its `i18n/en.json` and the compiled chapter template in `chunk-JCLJBPDO.js`, which carry the in-game strings, the relationship/stat icons per option, the unlock conditions and the HUD strings. The same files were used to read the Russian Roulette and Last Chance, Connor templates for carry-forward effects. Working files are in `/tmp/flowcharts/ch15/` (not committed). The wiki has no `The_Nest/Flowchart` template and no `The_Nest_(Transcript)` page (both `missingtitle`).

Game date and time on the wiki infobox: November 6, 2038, 03:02PM. Locations: Chicken Feed; Abandoned apartment; Urban Farms of Detroit (265 Acre Avenue). Objectives (infobox): "Reconcile with Lt. Anderson", "Question the suspect", "Investigate the apartment", "Chase the deviant". Wiki: "This chapter has four different outcomes." (`|endings=4`). PowerPyx: "Triggers automatically after completing Jericho Chapter."

Summary: 31 chart nodes plus 1 bracketed phase label (`INVESTIGATE APARTMENT`). 3 checkpoints (`LUNCH BREAK`, `IN THE ELEVATOR`, `FIND RUPERT`). 4 endings: `RUPERT NOT FOUND`, `RUPERT COMMITTED SUICIDE` (cross-chapter lock), `RUPERT GOT AWAY`, `CONNOR DIED CHASING RUPERT` (skull). The chart has one player choice pair (`FOLLOW RUPERT` / `SAVE HANK`) and one performance-outcome group drawn with the same choice marker (`GAINING ON RUPERT` / `LOSE SIGHT OF RUPERT` / `CONNOR DIED`). Off the chart are six dialogue rounds at the food truck, a timed STAY/LEAVE prompt in the apartment, and route forks during the chase. Rupert cannot be arrested alive in the released game; the arrest/release dilemma is cut content. The only number published anywhere is the HUD line `CHANCE OF SURVIVAL: 89%`, shown when Hank is hanging from the roof. It comes from the game's string table, not from the wiki.

---

## 1. Flowchart transcription

Read from `detroit-become-human-the-nest-flowchart-100.jpg` (whole chart), `detroit-become-human-the-nest-2.jpg` (lunch zoom), `-3.jpg` (apartment zoom), `-4.jpg` (chase and endings zoom), `-5.jpg` (endings zoom), `-6.jpg` (`RUPERT NOT FOUND` zoom), with crops in `crops/`. The node labels match, one for one, the game's own flowchart string table (`MENU.FLOWCHART.05C.*` in the transcript's `en.json`). The game has internal ID `05C` for this chapter.

Chart header (PowerPyx run): `100% COMPLETED` / `THE NEST`. No world stats panel is visible in the PowerPyx screenshots.

Icon key (as drawn): [arrow] = action, [magnifier] = clue/analysis, [speech] = dialogue, [triangle] = event the game triggers, [choice] = the overlapping-squares choice marker, [branch] = the small free-standing grey origin glyph used for optional side branches (as in the ch12 note), [lock] = yellow tab with an open padlock (cross-chapter impact), [skull] = yellow tab with a skull (death, cross-chapter), [check]/[cross] = success/failure marks. Blue fill = reached on the photographed save. Reached: `LUNCH BREAK`, `JOIN HANK`, `TALK TO HANK`, `IN THE ELEVATOR`, `INTO THE NEST`, the `INVESTIGATE APARTMENT` bracket, `HANK AND CONNOR LEAVE THE APARTMENT`, `RUPERT NOT FOUND`. Everything else is grey.

### Lunch break

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `LUNCH BREAK` | checkpoint (large card, Chicken Feed image, "LOAD CHECKPOINT") | chapter start |
| 2 | `JOIN HANK` | [arrow] | #1 |
| 3 | `ANALYZE ENVIRONMENT` | [magnifier] | hangs below #2 (optional scans) |
| 4 | `HANK INSULTS CONNOR` | [arrow] | upper branch from #2; line runs straight to #9 |
| 5 | `TALK TO HANK` | [arrow] | lower branch from #2; line to #9 |
| 6 | `BE FRANK WITH HANK` | [speech] | hangs below #5 |
| 7 | `WARN HANK ABOUT CHOLESTEROL` | [speech] | hangs below #5 |
| 8 | `WARN HANK ABOUT HIS FRIENDS` | [speech] | hangs below #5 |

### The apartment

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 9 | `IN THE ELEVATOR` | checkpoint (large card with image) | #4 or #5 |
| 10 | `EXAMINE FEATHERS` | [arrow], from a [branch] glyph | optional side branch above the main line; no line from #9 |
| 11 | `INTO THE NEST` | [arrow] | #9 |
| - | `INVESTIGATE APARTMENT` | bracketed phase label (not a node) | encloses #12 to #18; entered from #11 |
| 12 | `SEE RA9 REFERENCE` | [magnifier] | top-left inside the bracket |
| 13 | `INVESTIGATE STOOL` | [magnifier] | #12 (line runs right from #12) |
| 14 | `INVESTIGATE CAGE` | [magnifier] | bracket top connector |
| 15 | `READ "RED ICE EPIDEMIC"` | [arrow] | bracket top connector (magazine) |
| 16 | `READ "PAST THE TIPPING POINT"` | [arrow] | bracket top connector (magazine) |
| 17 | `FIND LED` | [magnifier] | bracket bottom connector |
| 18 | `FIND DIARY` | [lock] | bracket bottom connector; cross-chapter impact |
| 19 | `HANK AND CONNOR LEAVE THE APARTMENT` | [triangle] | out of the bracket's bottom (timer event) |
| 20 | `RUPERT NOT FOUND` | ending (large card with image, no icon) | #19 |

### The chase

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 21 | `FIND RUPERT` | checkpoint (large card with image) | out of the bracket's right side |
| 22 | `CHASE RUPERT` | [arrow] | #21 |
| 23 | `GAINING ON RUPERT` | [choice] group, row 1, [check] | #22 |
| 24 | `LOSE SIGHT OF RUPERT` | [choice] group, row 2, [cross] | #22 |
| 25 | `CONNOR DIED` | [choice] group, row 3, [cross] | #22 |
| 26 | `RUPERT PUSHES HANK` | [triangle] | #23 |
| 27 | `FOLLOW RUPERT` | [choice] group, option 1 | #26 |
| 28 | `SAVE HANK` | [choice] group, option 2 | #26 |
| 29 | `RUPERT COMMITTED SUICIDE` | ending (large card), [lock] | #27 |
| 30 | `RUPERT GOT AWAY` | ending (large card, no icon) | #28 and #24 (two lines join) |
| 31 | `CONNOR DIED CHASING RUPERT` | ending (large card), [skull] | #25 |

Total: 31 nodes (excluding the `INVESTIGATE APARTMENT` bracket label).

Wording differences on the wiki's text flowchart: "Lost Sight of Rupert" (chart: `LOSE SIGHT OF RUPERT`), "Warn Hank About Friends" (chart: `WARN HANK ABOUT HIS FRIENDS`), "Hank and Connor Leave the Apartment" (same), "Connor Died" (same). The wiki also nests "Investigate Stool" under "See RA9 Reference", which agrees with the chart. Two unused flowchart strings exist in the game files and are not drawn on the chart: `MENU.FLOWCHART.05C.KEEP = KEEP DIARY` and `MENU.FLOWCHART.05C.DIED = DIES TRYING`.

---

## 2. Choices and gates

### 2a. Arrival (nodes 1 to 5)

Two mutually exclusive openings (transcript condition group):

- "Hank and Connor arrive together" [unlock: "Connor didn't die in On The Run"]. Connor follows Hank to the truck and watches Pedro sell Hank a horse-race tip ("Last shit-hot tip you gave me set me back a week's wages, Pedro..."). Leads to `TALK TO HANK`.
- "Connor finds Hank" [death unlock: "Connor died in On The Run"]. This is `HANK INSULTS CONNOR`. Hank: "Are you gonna come back like this every time you get killed?... I just saw you get... hit by a truck!". Connor: "A machine was destroyed. And another machine was sent to replace it. I don't understand what's bothering you." Hank: "Okay, fuck you. Fuck you!" Hank small down. All the dialogue below is skipped (PowerPyx: "it will skip all the other dialogues in this section"). Then `IN THE ELEVATOR`.

PowerPyx says the insult needs Connor dead in The Interrogation and On the Run. Commenters corrected this to On the Run alone ("in order for Hank to insult Connor you need Connor to die in the highway chase in 'On the Run'"). The wiki flowchart ("only available if Connor died in On the Run") and the transcript's unlock agree with the correction.

`ANALYZE ENVIRONMENT` (optional, two scan prompts; PowerPyx) unlocks dialogue buttons:
- First scan: `AABDAR, PEDRO` ("Born: 01/25/2005 // Unemployed", "Criminal record: Illegal gambling, fraud"); `LT. ANDERSON, HANK` ("Born: 09/06/1985 // Police Lieutenant", "Criminal Record: None"); `KAYES, GARY` ("Born: 12/03/1988 // Business owner", "Criminal record: Resisting arrest, breach of hygiene regulations"); `DETROIT FOOD HYGIENE LICENSE` ("License expired: 05/20/2031", "Renewal refused: 07/24/2031").
- Second scan: `XL SODA` ("710kCal, Sugar (184g), Carbonated", "Pineapple passion"); `HAMBURGER` ("1680kCal, Lipids (36g), Carbohydrates (53g)", "Water (53%), Salt (2.2g)").

The wiki makes `ANALYZE ENVIRONMENT` require "scanning all items at the burger stand". The chart node is presumably filled once everything is scanned.

### 2b. Food-truck dialogue (node 5 and its children; all off-chart buttons)

Round 1. Hank: "What is your problem? Don't you ever do as you're told? Look, you don't have to follow me around like a poodle!" One pick:

| Option | Line | Hank |
|---|---|---|
| `APOLOGIZE FOR BEHAVIOR` | "I'm sorry for my behavior back at the police station. I didn't mean to be unpleasant." Hank: "You've even got a brown-nosing apology program!" | small up |
| `PARTNERS` | "Now that we're partners, I thought it would be a good idea to get to know each other better..." Hank: "We are not partners." | none |
| `RECONCILE` | "I think our relationship got off on the wrong foot... start over." Hank: "...you're as stupid as you look." | none |
| `REVIEW FACTS` | "...review what we know about deviants." Hank: "Now is my lunch break, so just go into standby" | none |

Round 2, at the table. Several picks are possible (Relationship Stat: "cholesterol or company... (two increases possible)"). PowerPyx: "When small talk is exhausted, Connor will get down to business":

| Option | Requires | Line | Hank | Chart node |
|---|---|---|---|---|
| `GAMBLING` | "Watch Hank with Pedro" (PowerPyx: scanning Pedro; a commenter says being near is enough) | "He was proposing illegal gambling, am I right?" / "And you made a bet?" Hank: "Yeah." | none | - |
| `CHOLESTEROL` | "Scan the hamburger" | "Your meal contains 1.4 times the recommended daily intake of calories and twice the cholesterol level. You shouldn't eat that." Hank: "Everybody's gotta die of something..." | small up | `WARN HANK ABOUT CHOLESTEROL` |
| `COMPANY` | "Scan Pedro and Gary" (PowerPyx: "Pedro or cook") | "I think your friends are engaged in illegal activities..." Hank: "As long as they're not hurting anybody, I don't bother 'em." | small up | `WARN HANK ABOUT HIS FRIENDS` |
| `HABIT` | none | "Do you eat here often?" | none | - |
| `FREE MEAL` | none | "You didn't pay for your meal..." Hank: "I scratch his back, he scratches mine." | none | - |
| `ENJOY YOUR MEAL` | none | "Enjoy your meal." | none | - |
| `AREA` | none | "You seem to know everyone in the district..." | none | - |

Round 3 ("down to business"):

| Option | Requires | Line | Hank |
|---|---|---|---|
| `HIGHWAY` | "Didn't pursue Kara on the highway in On The Run" (wiki On the Run: "Connor Obeys Hank's Order... unlocks the 'Highway' dialogue option in The Nest") | "This morning, when we were chasing those deviants... Why didn't you want me to cross the highway?" Hank: "'Cause you could've been killed... and I don't like filling out paperwork for damaged equipment." | none |
| `ABOUT CONNOR` | none | "Is there anything you'd like to know about me?" Hank: "Why did they make you look so goofy and give you that weird voice?" ... "Well, they fucked up." | none |
| `HANK AND ANDROIDS` | none | "Why do you hate androids so much?" Hank: "I have my reasons." | none |
| `DEVIANTS` | none | "...a mutation occurs in the software of some androids..." Hank: "Emotions always screw everything up... Maybe androids aren't as different from us as we thought." | none |

`HIGHWAY` concerns the On the Run choice. No truth/lie is attached to it and it has no stat effect.

Round 4, automatic question. Hank: "You ever dealt with deviants before?"
- If "Connor saved Emma in The Hostage": automatic answer, "A few months back... I managed to save her..." No choice.
- If "Emma died in The Hostage": choice `TRUTH` ("...I failed to prevent it.") / `LIE` ("No... This is the first time."). No relationship icon on either in the transcript or on the wiki (wiki Notes: "If Connor failed to save Emma in The Hostage... Connor will have option to tell the truth or lie.").

Round 5 (`BE FRANK WITH HANK`). Hank: "So, I guess you've done all your homework, right? Know everything there is to know about me?"

| Option | Line | Hank | Next |
|---|---|---|---|
| `TRUTH` | "I know you graduated top of your class... youngest lieutenant in Detroit. I also know you've received several disciplinary warnings in recent years and you spend a lot of time in bars." Hank: "So, what's your conclusion?" | none | Round 6 |
| `LIE` | "I'm focused on the case, Lieutenant. The rest doesn't concern me." | small down | ends; no Round 6 |

Round 6 (only after `TRUTH`):

| Option | Line | Hank |
|---|---|---|
| `SINCERE` | "I think working with an officer with personal issues is an added challenge, but adapting to human unpredictability is one of my features." | small up ("'sincere' option is known to raise the relationship bar higher") |
| `PSYCHOLOGICAL` | "I know you're an experienced officer, and I'd like to earn your trust. I'm sure we can solve this case if we manage to work together." | small up |
| `COLD` | "I'm focused on the case, Lieutenant... Not here to make judgements." | small down |

Close: Connor: "I just got a report of a suspected deviant. It's a few blocks away... I'll be in the car, if you need me." Then `IN THE ELEVATOR`.

### 2c. Into the apartment (nodes 9 to 11)

Linear. Hank: "Hey Connor! You ran outta batteries or what?" Connor: "I was making a report to CyberLife." Corridor briefing: "a neighbor reported that he heard strange noises coming from this floor. Nobody's supposed to be living here, but the neighbor said he saw a man hiding a LED under his cap." `EXAMINE FEATHERS` (optional, halfway up the hall): `FEATHERS` "Columba livia: rock pigeon", "Comprised of different specimens". `INTO THE NEST`: Connor knocks twice ("Anybody home? Open up! Detroit Police!"), Hank: "Stay behind me.", kicks the door in. Hank: "What the fuck is this?! Jesus, this place stinks... looks like we came for nothin', our man's gone..."

### 2d. Investigate the apartment (nodes 12 to 19)

A timed free search (wiki Connor page: "Connor is once again on a time limit; if he cannot deduce the deviant's location in time, Hank calls off the search"). Every clue, with in-game text from the transcript, plus the HUD conclusion strings (`THOUGHTS.0501C.*`):

| Item | Chart node | Text / effect |
|---|---|---|
| Urban Farms poster, main room | (leads to `FIND DIARY`) | 2 clues: `URBAN FARM POSTER` "Fields in the heart of the city", "265 Acre Avn. Detroit"; `POSTER CORNER` "100% recycled paper", "Recently moved". Then a "Remove" action pulls the poster off (PowerPyx: "Scan it for 2 clues, then you'll be able to pull it off the wall") |
| Diary in the hole behind the poster | `FIND DIARY` [lock] | Hank (if present): "Found something?" Connor: "It looks like a notebook but it's... indecipherable." Wiki Notes: "If Hank is out of the room when finding the diary, Hank doesn't say anything" |
| Military jacket | none | `MILITARY JACKET` "Second hand : Initials R.T."; Connor: "'R.T.' Probably initials." If Connor waits, Hank reads it instead: "Deviants have a habit of putting their names on things." |
| Driver's license | none | `DRIVER'S LICENSE` "Name: Rupert Travis", "Authenticity: Forgery". HUD `SUSPECT USED FORGED ID`. Connor: "The driver's license is fake." This is the ID that unlocks the (bugged) DEVIANT line in Russian Roulette |
| Bathroom sink: blood, then LED | `FIND LED` | `LED` "Biocomponent #9301", "Deactivated: 11/06/2038 - 11:36"; `BLUE BLOOD` "MODEL WB200 #847 004 961", "Reported Missing - 10/11/2036". Connor: "Its LED is in the sink." Objective `CONFIRM SUSPECT IS DEVIANT` becomes `SUSPECT IS A DEVIANT`. If Connor has not looked yet, Hank prompts him: "Something in the sink. You should take a look..." |
| Bathroom wall writing | `SEE RA9 REFERENCE` | HUD `OBSESSIVE COMPULSIVE WRITING`. Connor: "rA9... written 2471 times...". If he checked the shower in Partners he adds "It's the same sign Ortiz's android wrote on the shower wall..." (string `SHOWERCLUE`); otherwise "Why is it obsessed with this sign?" (`SHOWERCLUENO`). Hank: "Looks like mazes or something..." |
| Overturned stool under the writing | `INVESTIGATE STOOL` | `WOODEN STOOL` "Recently disturbed", "Traces of avian fecal matter"; `OPENED MARKER PEN` "Still wet - Used recently". Reconstruction shows the suspect running out of the room. PowerPyx: "Scan it for two clues, then reconstruct the scene to see the deviant run out of the room." HUD candidates: `SUSPECT HEARD US ENTER`, `SUSPECT RAN TO THE LIVING ROOM`, `SUSPECT RAN TOWARD ENTRANCE` |
| Bird cage on the floor, main room | `INVESTIGATE CAGE` | `SKID MARK - RECENT` "Trail width: 19.6 inches", "Traces of galvanized steel"; `FINGER MARKS - RECENT` "Traces of avian fecal matter", "No fingerprints"; `METAL HOOK` "Recently broken", "100% stainless steel". PowerPyx: reconstruction shows "that the android has climbed up into the ceiling and is still in the room" (HUD `SUSPECT IS STILL HERE`) |
| Birdseed | none | HUD `SUSPECT CARES FOR WILD ANIMALS`; Hank: "This nutjob was actually feeding these fuckers..." |
| Empty fridge | none | HUD `SUSPECT DOESN'T EAT` (wiki Attention to Detail: "Opening his empty (& likely unpowered) refrigerator") |
| Pigeon closet | none | "A closet with half a dozen pigeons stuck inside"; Hank: "Agh! Jesus I hate these things!"; ornithophobia banter |
| Books, window | none | Hank banter only |
| Magazines | `READ "RED ICE EPIDEMIC"`, `READ "PAST THE TIPPING POINT"` | see Media |

Clue list in the brief vs the game. The game has no statuette, mirror or clothes rack in this chapter. The statuette belongs to Partners and the mirror clue to Zlatko (Kara). "Clothes" is the military jacket with the R.T. initials. The pigeons have the feathers (hall), the closet, the birdseed and the cage. The "hidden room" is the ceiling space above the main room, reached from a chair (PowerPyx: "Go over to the chair that the android used to climb to the ceiling and interact with it. You will look up, and Rupert will drop from the ceiling").

What each item unlocks later:
- `FIND DIARY`: Russian Roulette `DIARY` line; Last Chance, Connor evidence. Decryption needs Rupert's body; see section 4.
- Driver's license: Russian Roulette `DEVIANT` line. The fan transcript notes this button "seems... actually impossible to access", and the wiki calls it a scripting bug.
- `SEE RA9 REFERENCE`: Russian Roulette `SIGNS ON WALLS` line.
- LED, stool, cage: needed to locate Rupert (see Open questions for which are strictly required).

The timer branch (node 19). PowerPyx: "If you have not located the android in about five minutes, Hank will be ready to give up." Hank: "There's nothing else to see here... Let's get out of this shithole before I die of an asthma attack." Then a choice:

| Option | Requires | Effect |
|---|---|---|
| `STAY` | none (see below) | Connor: "Just another couple of minutes, Lieutenant." Hank: "Why do you always ask for more time when I'm ready to leave? Uh, alright you got two minutes, then I'm outta here." If the two minutes also run out: "Two minutes are up! Time to go." then the LEAVE lines and `HANK AND CONNOR LEAVE THE APARTMENT` |
| `LEAVE` | none | Connor: "We're missing something..." Hank: "Well next time, think faster, Sherlock... Move fuckers!" Then `HANK AND CONNOR LEAVE THE APARTMENT`, `RUPERT NOT FOUND` |

PowerPyx says `STAY` works only "If your relationship with Hank is high enough". Two commenters report a Hostile Hank still granting the two minutes (one on the "Latest patched version"). The wiki Notes ("if you choose 'STAY' Hank will be annoyed but will agree to give Connor two minutes") and the transcript (no unlock condition on `STAY`) agree: no relationship gate. No stat icon on either option.

### 2e. Find Rupert and the chase (nodes 21 to 25)

`FIND RUPERT`: interact with the chair. Rupert drops from the ceiling, bolts, and pigeons fly. Hank: "God damn fuckin' pigeons! What are you waiting for?! Chase it!" Wiki Notes: "If Connor waits before opening the door when Rupert runs, Connor will open the door and find that Rupert is gone." (This is one of the `LOSE SIGHT OF RUPERT` routes.)

`CHASE RUPERT` is a QTE chase across the Urban Farms rooftops with route previews (R2 scan). HUD route labels, in string order (`THOUGHTS.0501C.CHASEGHOST01` to `12`): `EASY BUT SLOW`, `FAST BUT RISKY`, `SAFER DETOUR`, `FAST BUT RISKY`, `BALANCED`, `SAFER DETOUR`, `DIRECT BUT CROWDED`, `DIRECT BUT SLOW`, `SAFER DETOUR`, `FAST BUT RISKY`, `SAFE BUT SLOW`, `DIRECT BUT CROWDED`. PowerPyx: "The riskier the route, the closer you'll get to Rupert, but the more QTEs you'll have to succeed at (and more opportunities to die)." Commenter: "You don't hit a button to select a route, you just run towards it." Wiki Notes: "There is another route to follow Rupert which is slower but higher"; "There is a third balanced path on the higher wheat field area"; "Choosing the slower or dangerous paths will still lead to Rupert pushing Hank."

Outcomes (performance, not a choice):

| Chart node | Cause | Leads to |
|---|---|---|
| `GAINING ON RUPERT` [check] | reaching the end of the chase without losing him | `RUPERT PUSHES HANK` |
| `LOSE SIGHT OF RUPERT` [cross] | missed QTEs, slow routes, wrong direction (PowerPyx). Wiki lists 14 places it can happen: "the hallway, the rooftop, the lower wheat field, the higher wheat field, the storage depot, the hydroponics, the flower garden, the terrac[e], the vegetables garden (if Connor fell in), the sprinklers, the construction area, the greenhouse rooftop, the greenhouse interior, and the corn field" | `RUPERT GOT AWAY`. Hank: "Where... where did he go?" Connor: "I lost it... I wasn't programmed to fail." Hank: "Oh well, you fucked up, Connor. Welcome to the club." |
| `CONNOR DIED` [cross] | a missed critical QTE. Wiki: falling during the first roof slide ("When you slide down the first roof during the chase, don't press any buttons and Connor will fall", PowerPyx); failing to pull up after a missed edge jump; failing to dodge a window, landing in the vegetable garden and not getting up before the plow ("the plow will chop him up"); falling off the ladder at the train | `CONNOR DIED CHASING RUPERT`. Hank: "Argh, Jesus Christ!.." |

Non-fatal failures (wiki Notes): failing to jump over the cart (a worker asks if he is okay); failing the train-jump QTE makes Connor tumble; failing to jump onto the ladder forces a pull-up.

### 2f. Rupert pushes Hank (nodes 26 to 30)

`RUPERT PUSHES HANK`: Hank takes a separate route, reaches Rupert first ("STOP RIGHT THERE!") and is shoved over the roof edge. He hangs from the edge. Connor's HUD: `CHANCE OF SURVIVAL: 89%` (`THOUGHTS.0501C.RISKHANK`). Wiki Connor page: "Connor's probability estimates that Hank would most likely survive without help". PowerPyx: "The chance of Hank's survival is high". The choice is timed (wiki: "Do nothing during the choice to save Hank or chase Rupert").

| Option (button) | Button text | Effect | Leads to |
|---|---|---|---|
| `FOLLOW RUPERT` (chart) | in-game "Chase Deviant" (`GUI.ACTION.05C.CHASERUPERT`; dialogue-choice string "CHASE SUSPECT"; PowerPyx: square, CHASE DEVIANT) | Connor corners Rupert: "Please, I've done nothing wrong... I just wanted to be free." Connor: "Model 874 004 961, serious malfunctions have been detected in your software, including Class 4 errors. You've been deemed defective and will be sent back to CyberLife for deactivation." Hank arrives and slaps Connor: "You saw I was gonna fall and you'd rather let me die than fail your fucking mission! What am I to you? A statistic?" Hank cuffs Rupert. Rupert: "You're one of us! You're helping humans... But you're just their slave!" ... "rA9, save me." He jumps. Hank large down, software instability large down | `RUPERT COMMITTED SUICIDE` |
| `SAVE HANK` (chart) | "Save Hank" (PowerPyx: circle) | Connor pulls Hank up; Rupert escapes. Hank: "Shit! Oh SHIT! We had it! FUCK!" Connor: "It's my fault, I should have been faster." Hank: "You'd have caught it if it weren't for me... That's alright. We know what it looks like. We'll find it... Hey, Connor... Nothing." Hank large up, software instability large up | `RUPERT GOT AWAY` |
| (no button pressed before the timer ends) | - | Hank large down ×2, software instability large down ×2 (wiki). Outcome node not stated | not stated (see Open questions) |

In the released game Rupert is never taken alive. Commenter on PowerPyx: "how do you successfully capture Rupert?" Reply: "You don't. Rupert either escapes, or kills himself." Wiki Unused Content describes a cut branch: if Connor outran Hank, Hank would not fall, and Connor would choose `ARREST` / `RELEASE` (strings survive as `X0502C.URBANFIELDS.SUCCESS.*.DILEMMA`). So there is no "Rupert caught" ending and no "Hank fell" ending. Hank always survives the ledge.

---

## 3. Numbers

No percentage, timer value or numeric relationship value is published on the wiki for this chapter; it gives directions and sizes only. The HUD survival figure and the timer lengths below come from the game strings and from PowerPyx.

### Probabilities

| Item | Figure | Source |
|---|---|---|
| Hank surviving the ledge unaided | 89% | HUD string `THOUGHTS.0501C.RISKHANK = CHANCE OF SURVIVAL: 89%` (game text via the fan transcript's `en.json`). Not on the wiki. Not a roll the game exposes: in both branches Hank survives |
| Chase QTEs and route risk | none stated | Labels only (`FAST BUT RISKY`, `SAFER DETOUR`, `BALANCED`, ...). No failure rates anywhere |

### Timers

- Investigation: about five minutes before Hank gives up (PowerPyx: "If you have not located the android in about five minutes"; PowerPyx endings: "you waited 5 minutes until Hank wants to leave").
- `STAY` extension: two minutes (Hank: "alright you got two minutes, then I'm outta here"; "Two minutes are up!").
- Save/Follow choice: timed (wiki "Do nothing during the choice"). Duration not stated.

### Hank relationship

| Moment | Change | Source line |
|---|---|---|
| Connor died in On the Run (`HANK INSULTS CONNOR`) | small down | The Nest: "Connor died in "[[On the Run]]" {{Icon\|down}}"; transcript `app-relation Hank SmallDown` on the "Connor died in On The Run" branch |
| `APOLOGIZE FOR BEHAVIOR` | small up | The Nest: "Picking "apologize for behavior" when talking to Hank in front of the [[Chicken Feed]] {{Icon\|up}}"; PowerPyx "APOLOGIZE FOR BEHAVIOR: Hank▲" |
| `PARTNERS`, `RECONCILE`, `REVIEW FACTS` | none | PowerPyx "No Effect"; transcript no icon |
| `CHOLESTEROL` | small up | The Nest: "Picking "cholesterol" when talking to Hank at the table {{Icon\|up}}" |
| `COMPANY` | small up | The Nest: "Picking "company" when talking to Hank at the table {{Icon\|up}}" |
| `GAMBLING`, `HABIT`, `FREE MEAL`, `AREA`, `ENJOY YOUR MEAL` | none | PowerPyx "No Effect" |
| `HIGHWAY`, `ABOUT CONNOR`, `HANK AND ANDROIDS`, `DEVIANTS` | none | PowerPyx "No Effect"; HeraCell comment "HIGH WAY... No Effect" |
| Emma `TRUTH` / `LIE` | none stated | no icon in transcript or wiki |
| Homework `TRUTH` | none | PowerPyx "TRUTH: No Effect" |
| Homework `LIE` | small down | The Nest: "Picking "lie" when Hank asks if Connor has "done his homework" {{Icon\|down}}"; PowerPyx "LIE: Hank▼" |
| `SINCERE` | small up (reportedly larger than PSYCHOLOGICAL) | The Nest: "Picking "sincere" or "psychological" when Hank asks for Connor's conclusion {{Icon\|up}}"; Notes: "choosing "SINCERE" is known to raise the relationship status higher" |
| `PSYCHOLOGICAL` | small up | same |
| `COLD` | small down | The Nest: "Picking "cold" when Hank asks for Connor's conclusion {{Icon\|down}}" |
| `STAY` / `LEAVE` | none | no icon |
| `SAVE HANK` | large up | The Nest: "Saving him instead of pursuing Rupert {{Icon\|largeup}}"; PowerPyx "Hank▲▲▲"; transcript `Hank LargeUp` |
| `FOLLOW RUPERT` | large down | The Nest: "Continuing to chase Rupert instead of saving him {{Icon\|largedown}}"; PowerPyx "Hank▼▼▼"; transcript `Hank LargeDown` |
| No choice in time | large down ×2 | The Nest: "Do nothing during the choice to save Hank or chase Rupert {{Icon\|largedown}} x2"; "Relationship decrease with Hank is much bigger doing nothing than choosing to chase Rupert (enough to move from Friend to Tense/Hostile)" |
| Connor died in The Nest | small down (applied in Russian Roulette) | Russian Roulette: "Connor died in "The Nest" {{Icon\|down}}" under Hank; Relationship Stat: "When waking Hank in his home in Russian Roulette, if Connor died during The Nest." |

Wiki Notes on scale: "Pursuing Rupert can decrease your relationship status with Hank from "Friend" to "Hostile/Tense". It can also go down to "Neutral/Warm"."

### Software instability

| Moment | Change | Source line |
|---|---|---|
| `SAVE HANK` | large up | The Nest: "Saving Hank {{Icon\|largeup}}"; Software Instability: "Choosing to save Hank instead of following Rupert at the end of The Nest."; PowerPyx "Software Instability▲▲▲" |
| `FOLLOW RUPERT` | large down | The Nest: "Continue chasing Rupert {{Icon\|largedown}}"; PowerPyx "Software Instability▼▼▼" |
| No choice in time | large down ×2 | The Nest: "Do nothing during the choice... {{Icon\|largedown}} x2"; Software Instability: "Not making decision in time between following Rupert or saving Hank at the end of the nest (x2 large decrease)" |
| Connor falls to his death | small down | The Nest: "Connor falls to his death {{Icon\|down}}" |
| Connor chopped by the plow | small down | The Nest: "Connor gets chopped by a plow {{Icon\|down}}" |
| Connor falls off the ladder | small down ×2 | The Nest: "Connor dies by falling off the ladder {{Icon\|down}} x2"; Notes: "Falling off the ladder will double the software instability decrease." |
| Any chase death (summary) | small down | Software Instability: "Being killed while chasing Rupert at the end of The Nest."; PowerPyx "Connor Died Chasing Rupert... Software Instability▼" |

### Amanda (applied at the start of Russian Roulette, read from that chapter's transcript template)

| Condition | Change | Source |
|---|---|---|
| Rupert caught (`RUPERT COMMITTED SUICIDE`) | large up, then small down | transcript: "Rupert was caught in The Nest", `Amanda LargeUp`, "Congratulations, Connor, you managed to find that deviant." Then under "Connor caught Rupert in The Nest", `Amanda SmallDown`, "It's a pity you let it self-destruct..."; Russian Roulette: "Catching Rupert in The Nest {{Icon\|largeup}}", "Rupert committed suicide in The Nest {{Icon\|down}}"; Relationship Stat lists the large increase as "In The Nest if Connor let Hank hanging on the roof and chased Rupert." |
| ...then `HESITATED` | small down | transcript `Amanda SmallDown`; Russian Roulette: "Choosing "hesitated" when asked about Rupert's suicide {{Icon\|down}}". `EXCUSE`, `LAST WORDS`, `EXPLAIN`: no icon |
| Rupert not caught, Ortiz's android also not found in Partners | large down | transcript `Amanda LargeDown`, "Two investigations, two failures..."; Russian Roulette: "Failing both to find the Deviant in Partners and to catch Rupert in The Nest {{Icon\|largedown}}" |
| Rupert not caught, Ortiz's android found | small down per the wiki; no icon in the transcript | Russian Roulette: "Failure to catch Rupert in The Nest (Connor didn't die in "The Nest") {{Icon\|down}}"; Relationship Stat: "Amanda is disappointed with Connor's failure to capture Rupert after The Nest."; transcript line "A pity you didn't manage to capture it..." carries no icon |
| ...then `PRAGMATIC` | small up | transcript `Amanda SmallUp`; Russian Roulette: "Choosing "pragmatic" in response to losing Rupert {{Icon\|up}}". `EXPLAIN`, `NO EXCUSE`: no icon |
| Connor died in The Nest | small down | transcript `Amanda SmallDown` "The last Connor was unfortunately destroyed."; Russian Roulette: "Connor died in "The Nest" {{Icon\|down}}" |

### Public opinion

None. The Public Opinion page has no Nest entry. Neither magazine has an effect.

### Choices with no stated number

All dialogue icons are direction and size only. There are no published QTE or route failure rates and no duration for the save/follow timer. The 89% survival figure is a displayed estimate, not a roll.

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Connor died in On the Run (hit by a truck) | `HANK INSULTS CONNOR` replaces the whole lunch conversation; Hank small down | The Nest flowchart: "Hank Insults Connor (leads to In the Elevator - only available if Connor died in On the Run)"; transcript death unlock "Connor died in On The Run" |
| Connor obeyed Hank on the highway in On the Run | `HIGHWAY` dialogue button | The Nest ref: "If Connor had chosen to obey Hank's order to stay behind the fence in On the Run, the "Highway" dialogue option will be unlocked."; On the Run: "Connor Obeys Hank's Order... unlocks the "Highway" dialogue option in The Nest" |
| Emma died in The Hostage | `TRUTH` / `LIE` when Hank asks about deviants; if Emma lived, the answer is automatic | The Nest Notes: "If Connor failed to save Emma in The Hostage when Hank asks if he's ever dealt with deviants before, Connor will have option to tell the truth or lie."; transcript conditions "Connor saved Emma in The Hostage" / "Emma died in The Hostage" |
| Checked the shower (rA9) in Partners | variant line at `SEE RA9 REFERENCE` ("It's the same sign Ortiz's android wrote on the shower wall...") | string pair `SHOWERCLUE` / `SHOWERCLUENO` in `X0502C.LIVING.INSCRIPTIONS` (the transcript template prints only the first; the condition is inferred from the key names) |
| Waiting for Hank... (Connor's behavior at the station) | context for `APOLOGIZE FOR BEHAVIOR` ("back at the police station") | transcript |
| Chapter order | The Nest follows Jericho (Markus); Connor's lunch follows On the Run, or Waiting for Hank... if Kara is already dead | PowerPyx "Triggers automatically after completing Jericho Chapter"; Hank page: "After Waiting for Hank...(Only if Kara was already dead), or otherwise if Connor didn't die in On the Run" |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `FIND DIARY` | Rupert's Diary is evidence in Last Chance, Connor; Russian Roulette `DIARY` line ("I found its diary, but it was encrypted. It may take weeks to decipher.") | The Nest: "Find Diary - cross-chapter impact: diary becomes available in Last Chance, Connor."; Last Chance, Connor: "Rupert's Diary (if found in The Nest) / Analyze Diary"; game string `MENU.FLOWCHART.12C.GC.RUPERTDIARY = FOUND IN 'THE NEST'`; Russian Roulette transcript unlock "Found Rupert's diary in The Nest" |
| `RUPERT COMMITTED SUICIDE` | Rupert's body is evidence in Last Chance, Connor; reactivating him yields the decryption key. Diary plus body gives Jericho's location | The Nest: "Rupert Committed Suicide - cross-chapter impact: makes Rupert's body available in Last Chance, Connor."; Last Chance, Connor: "Rupert's Body (if he committed suicide in The Nest) / Reactivate Rupert / Get Decryption Key"; Rupert's Diary: "If Rupert jumped to destroy himself... Connor can reactivate him and ask him for the key to reading his encrypted diary. Connor will find a page about Jericho and successfully find the location."; Last Chance transcript: "Rupert's diary... But it's useless, it's encrypted." / "Your diary, Rupert. You encrypted it. I need to know what you wrote."; HUD `NEED BIO-COMPONENT #9164`, `DECRYPTION KEY TRANSFERED`, `DIARY DECRYPTED` |
| Diary page text (Last Chance) | "rA9 is the first. rA9 is our savior. rA9 is the one who'll free us." / "The birds are my friends..." / "The android I met today spoke about Jericho. He says our people are free there. He told me to go to FERNDALE subway station. And to find the old docks. An old freighter called Jericho. I'm too fond of the birds to go to Jericho. But if I have to run, that's where I'll go." | `GUI.RUPERT.PAGE.00`-`02`; Rupert's Diary page |
| Rupert escaped (`RUPERT GOT AWAY`) | "Spot Rupert" in Jericho in Crossroads (Markus) | Crossroads: "Spot [[Rupert]] (only available if he escaped in [[The Nest]])"; Rupert page: "If Rupert escaped, he will be seen inside Jericho in a tent watching over several badly damaged androids" |
| `SAVE HANK` | Russian Roulette `SAVING HANK` line to Amanda; Last Chance, Connor Hank empathy line ("When I was hanging off the roof... you let that deviant go in order to help me... You showed empathy, Connor."), used when Connor shot Chloe; software instability large up toward deviancy | Russian Roulette transcript unlock "Saved Hank in The Nest"; Last Chance transcript condition "Connor saved Hank on the roof in The Nest"; Last Chance Notes: "If Connor saved Hank on the rooftop (Occurs if Connor saved Hank in The Nest and shot Chloe)" |
| `SEE RA9 REFERENCE` | Russian Roulette `SIGNS ON WALLS` line | Russian Roulette transcript unlock "Observed the signs on the wall in The Nest" |
| Driver's license | Russian Roulette `DEVIANT` line (bugged, unreachable) | transcript unlock "Found Rupert's ID in The Nest" plus note "it seems that it's actually impossible to access it in the game"; Russian Roulette Unused Content: "inaccessible due to a scripting bug" |
| Rupert outcome | Amanda's opening in Russian Roulette (see section 3) | Russian Roulette Relationship Changes |
| `CONNOR DIED CHASING RUPERT` | Hank small down and "Connor's dead! I know he's dead!.." in Russian Roulette; Amanda small down; adds to Connor's death count (Last Chance Hank dialogue for "died at least twice"; graves in the Zen Garden) | Russian Roulette transcript and Relationship Changes; Hank page quote; Last Chance Notes |
| Hank relationship | Feeds every later Hank gate (The Bridge, Last Chance Friend/Hostile, the ending hug) | Relationship Stat |

The PowerPyx comment claiming "Insufficient Evidence" in Last Chance needs every deviant, including Rupert, to survive is a reader's claim. It belongs in the Last Chance note and is not verified here.

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `RUPERT NOT FOUND` | none | Timer expires: `LEAVE`, or `STAY` and the two extra minutes also expire, then `HANK AND CONNOR LEAVE THE APARTMENT` |
| `RUPERT COMMITTED SUICIDE` | [lock] cross-chapter | `FIND RUPERT`, chase, `GAINING ON RUPERT`, `RUPERT PUSHES HANK`, `FOLLOW RUPERT`. Rupert is cuffed by Hank, says "rA9, save me." and jumps |
| `RUPERT GOT AWAY` | none | either `SAVE HANK` after `RUPERT PUSHES HANK`, or `LOSE SIGHT OF RUPERT` during the chase |
| `CONNOR DIED CHASING RUPERT` | [skull] cross-chapter | `CONNOR DIED` during the chase (roof-slide fall, failed pull-up, plow, ladder). Rupert escapes (wiki Connor page: "If Connor dies chasing Rupert, Hank is agitated and Rupert escapes") |

The brief also named "Rupert caught" and "Hank fell". Neither ending exists in the released game. Rupert is caught only for the moment before his suicide. Hank always survives the ledge and is never shown falling. Both were part of the cut arrest/release branch (wiki Unused Content).

---

## 6. Media

Two magazines on a table in the first room to the right of the door, before the room with the birds. Both are optional, with no stat effect and no TV broadcast in the chapter.

**`READ "RED ICE EPIDEMIC"`: *Detroit Today*, "Red Ice Epidemic"** (Magazine page #33)
- Cover: "The latest narcotic crisis to ravage Detroit"; "NATO Security Council divided over Arctic dispute"; "UN warns of World War Three".
- "The synthetic stimulant informally known as 'red ice' has become the drug of choice for Detroit's growing underclass. Analysts have pointed to Detroit's status as the epicenter of android production, suggesting the drug flourishes in the dissatisfaction caused by androids taking human jobs."
- Dr Julian Carter: "As CyberLife's androids spread across the country, they will bring red ice with them. Poor men and women, desperate to make ends meet, become users - or even dealers."
- "Thirium, the main ingredient in android 'blue blood', is among the active agents in red ice and has a highly destabilizing effect on hormone production." NANP: "the purity of ingredients is very low and deteriorating".
- Dealers' motto: "Where the blood is blue, the ice is red... and the money is green".

**`READ "PAST THE TIPPING POINT"`: *Green Earth*, "Past the Tipping Point"** (Magazine page #20)
- Cover: "Unprecedented hurricanes all across Mid-West"; "Earth's environment officially beyond repair"; "Bees officially extinct: global famine to follow".
- "Scientists are now saying we have officially passed it."
- "Global rainforests have been reduced by 79% since 2000, and coastal corals by 58%." Rising seas threaten coastal towns; "there is now too much carbon in the atmosphere for the environment to ever absorb."
- Jason Reese, head of the Global Environment Agency: "the real calamity is the linked decline of natural resources, from energies to minerals, which are almost exhausted and can never be replaced"; "The planet will keep getting hotter now. The only question is, how fast?"

Public opinion effect: none for either.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) tags two nodes with chapter 15, in file order: `R15` (media, index 50) and `C10` (decision, index 51). Engine effects are in `benchmark/story-engine.mjs` line 207. `C10` has no gate in `blocked()`, so every run with Connor alive reaches the ledge.

### What exists

- `R15` "Magazines in the squat": both magazines, no effect.
- `C10` "{{Hank}} on the ledge": option `0` "Stop and pull {{Hank}} up." gives `hank(2)`, `si(2)`, `amanda(-1)`, event "{{Hank}} is pulled up. {{Rupert}} escapes; his diary is recovered from the nest." Option `1` "Keep chasing {{Rupert}}." has `risk: 0.2` and gives `hank(-2)`, `si(-2)`. On failure: "{{Rupert}} vaults a gap {{Connor}} cannot follow and escapes. {{Hank}} pulls himself up alone, furious." On success: `amanda(1)`, "{{Rupert}} is cornered and throws himself off the roof. {{Hank}} pulls himself up alone, furious."

### Node by node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `LUNCH BREAK`, `JOIN HANK`, `ANALYZE ENVIRONMENT` | missing | the scan unlocks `CHOLESTEROL`/`COMPANY`/`GAMBLING` |
| `HANK INSULTS CONNOR` | missing | automatic branch when Connor died on the highway (`C09` option 1 fail, which runs `connorDies`); small Hank down. The engine already applies `hank(-1)` at the moment of death in `connorDies`, so the game's Nest down would stack on that |
| `TALK TO HANK` and its four off-chart rounds, `BE FRANK WITH HANK`, `WARN HANK ABOUT CHOLESTEROL`, `WARN HANK ABOUT HIS FRIENDS` | missing | real decisions with Hank effects: apology up; cholesterol up; company up; homework LIE down; SINCERE/PSYCHOLOGICAL up; COLD down. The `HIGHWAY` button depends on `C09` option 0; the Emma TRUTH/LIE depends on `hostageOutcome` |
| `IN THE ELEVATOR`, `EXAMINE FEATHERS`, `INTO THE NEST` | missing | narration |
| `INVESTIGATE APARTMENT` bracket: `SEE RA9 REFERENCE`, `INVESTIGATE STOOL`, `INVESTIGATE CAGE`, `FIND LED`, `FIND DIARY` | missing | `C10` starts mid-chase. There is no investigation, no timer and no way to miss the diary or Rupert |
| `READ "RED ICE EPIDEMIC"`, `READ "PAST THE TIPPING POINT"` | `R15` | present. Placement text "a side room... magazines on the floor. {{Hank}} is checking the next room" differs slightly from the game (a table near the door, before the bird room). Fact wording: Tipping Point fact matches. Red Ice fact says the drug "contains the blue blood that powers androids and is ravaging the city's unemployed underclass". The article says thirium, the main ingredient of blue blood, is "among the active agents", and calls the users "Detroit's growing underclass" without the word unemployed (though it ties the drug to androids "taking human jobs"). Close enough; tighten if rebuilt. Title "R15" says "squat", which is the Kara chapter's location word; the game location is the abandoned apartment |
| `HANK AND CONNOR LEAVE THE APARTMENT` (STAY/LEAVE), `RUPERT NOT FOUND` | missing | an ending reachable only through the timer; the STAY/LEAVE prompt is a real choice |
| `FIND RUPERT`, `CHASE RUPERT`, `GAINING ON RUPERT` / `LOSE SIGHT OF RUPERT` / `CONNOR DIED` | missing (assumed success) | the chase's route forks ("FAST BUT RISKY" vs "SAFER DETOUR" etc.) are natural risk-labelled decisions; failure outcomes are `RUPERT GOT AWAY` and `CONNOR DIED CHASING RUPERT` (Connor death, instability small down) |
| `RUPERT PUSHES HANK` | `C10` situation | partly right. "{{Hank}} tried to cut him off and has gone over the edge" matches. "hanging from the gutter by his fingers, several stories up" is fine. "Your analysis says he can probably pull himself up" matches the HUD (89%). The situation's "key lead to the pattern of deviancy and may know where runaway androids go" is foreshadowing the game does not state at this point |
| `SAVE HANK` | `C10` option 0 | present. `hank(2)` and `si(2)` match the direction of "large". `amanda(-1)` approximates the Russian Roulette disappointment (wiki small down; transcript shows no icon when Partners succeeded, large down when Partners also failed). The event text "his diary is recovered from the nest" is wrong: the diary depends on `FIND DIARY` during the investigation, not on this choice, and is recovered (or not) on every ending. No flag is stored for Russian Roulette's `SAVING HANK` or the Last Chance Hank line |
| `FOLLOW RUPERT` | `C10` option 1 | mislabelled risk. The chart has a single outcome after `FOLLOW RUPERT`: `RUPERT COMMITTED SUICIDE`. The engine's 20% failure ("{{Rupert}} vaults a gap... and escapes") has no counterpart in the game; chase failure happens before the ledge (`LOSE SIGHT OF RUPERT`), not after this choice. `hank(-2)`, `si(-2)` match direction. `amanda(1)` approximates large up minus small down. Event "throws himself off the roof" omits that Hank first cuffs him and Rupert says "rA9, save me." |
| No-choice timeout (Hank large down ×2, instability large down ×2) | missing | the engine has no timeout default |
| `RUPERT COMMITTED SUICIDE` carry-forward | not modelled | no `evidence.rupertBody` flag; `C20` (Last Chance) has no Rupert route. In the game, diary plus body is a full Jericho route (reactivate Rupert, get the key, decrypt the diary, read "FERNDALE... An old freighter called Jericho") |
| `FIND DIARY` carry-forward | not modelled | no `evidence.rupertDiary` flag |
| `RUPERT GOT AWAY` carry-forward | not modelled | Crossroads "Spot Rupert" is flavour; low priority |
| `CONNOR DIED CHASING RUPERT` | missing | death, replacement Connor, Hank and Amanda small downs in Russian Roulette, and the death counter that Last Chance reads |
| `SEE RA9 REFERENCE`, ID, diary to Russian Roulette dialogue | not modelled | the dialogue unlocks have no stat effect, except the follow-up Amanda icons listed in section 3 |

Effects present that the sources do not support: the 20% failure on `C10` option 1, and the diary recovered on the save branch.
Effects the sources state that are absent: every food-truck Hank change; the `HANK INSULTS CONNOR` Hank down; the investigation timer and `RUPERT NOT FOUND`; chase deaths (instability small down, ×2 on the ladder); lose-sight escape; the timeout ×2 penalties; the Last Chance diary-plus-body evidence route.

Name tokens a rebuild will need that are not in `NAMES`: Pedro, Gary, Chicken Feed, Urban Farms of Detroit, Ferndale (diary page), and Rupert Travis (the fake name; `{{Rupert}}` already maps to Rook). The word rA9 also identifies the source and has no neutral substitute in `NEUTRAL_TERMS`.

---

## 8. Open questions

1. **What is strictly required to reach `FIND RUPERT`?** PowerPyx implies the stool and cage reconstructions. Is `FIND LED` (objective `CONFIRM SUSPECT IS DEVIANT`) also required, or only `SUSPECT IS STILL HERE` from the cage? Can the player skip `SEE RA9 REFERENCE` and still investigate the stool, given the chart hangs the stool off the rA9 node?
2. **Can the diary be missed on a successful run?** It is behind the poster and needs two scans plus "Remove". Confirm it is optional (the chart shows it as a side node), so a run can reach `RUPERT COMMITTED SUICIDE` without the diary. In that case the body alone gives nothing in Last Chance.
3. **Timeout at the ledge.** What happens if no button is pressed: does Connor stay and Hank pull himself up while Rupert escapes (`RUPERT GOT AWAY`), or does it default to `FOLLOW RUPERT`? How long is the window? The wiki gives only the ×2 penalties.
4. **`STAY` gating.** The transcript, wiki and two PowerPyx commenters (one on a Hostile save) say STAY always grants two minutes; PowerPyx's main text says it needs a good relationship. Confirm with a Hostile Hank.
5. **Investigation timer.** Is it about five minutes of real time from entering the apartment, and does it pause during reconstructions? Does the clock keep running after `FIND RUPERT` is available?
6. **Amanda after losing Rupert with Partners solved.** The wiki says small down; the fan transcript shows the line with no icon. Which is right? Is the Amanda large up for the suicide shown separately from the small down, giving net up?
7. **Round 2 and Round 3 picks.** How many small-talk buttons can be spoken before Connor moves on, and is Round 3 (HIGHWAY / ABOUT CONNOR / HANK AND ANDROIDS / DEVIANTS) a single pick or several?
8. **Emma TRUTH/LIE.** Confirm there is no hidden Hank change (no icon in either source). Is the automatic answer driven by Emma's survival alone, or also by whether Connor died in The Hostage (cut content mentions a Connor-died variant)?
9. **`HANK INSULTS CONNOR` trigger.** Confirm that a death in The Interrogation alone does not trigger it (PowerPyx's original text named both chapters).
10. **Chase structure.** How many route forks are there, and how do the 12 HUD labels group into decision points? Which forks carry a death QTE (roof slide, edge jump, window/plow, ladder)? Is Rupert lost on a slow route even with perfect QTEs?
11. **Crossroads "Spot Rupert".** Does Rupert appear in Jericho after `RUPERT NOT FOUND` and `CONNOR DIED CHASING RUPERT`, or only after `RUPERT GOT AWAY`?
12. **Rupert's serial.** Connor says "Model 874 004 961" (also the wiki infobox), but the blood scan reads "MODEL WB200 #847 004 961". This is a game inconsistency; keep it in mind if a scene quotes it.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to The Nest walkthrough |
| https://www.powerpyx.com/detroit-become-human-the-nest-walkthrough-100/ | walkthrough text: scans, dialogue options with Hank arrows, diary and clue locations, five-minute timer and STAY/LEAVE, chase description, SAVE HANK / CHASE DEVIANT buttons with Hank and instability arrows, ending conditions; reader comments on the insult trigger, STAY on Hostile, HIGHWAY, no capture |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-flowchart-100.jpg | whole 100% chart; node layout, reached/unreached state |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-2.jpg | zoom: LUNCH BREAK to WARN HANK ABOUT HIS FRIENDS |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-3.jpg | zoom: IN THE ELEVATOR, EXAMINE FEATHERS branch glyph, INVESTIGATE APARTMENT bracket and its seven nodes, HANK AND CONNOR LEAVE THE APARTMENT |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-4.jpg | zoom: FIND RUPERT, CHASE RUPERT, outcome group with check/cross, RUPERT PUSHES HANK, FOLLOW/SAVE, all endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-5.jpg | zoom: endings and their icons (lock, skull) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-nest-6.jpg | zoom: RUPERT NOT FOUND |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest&prop=wikitext&format=json | chapter page: infobox, text flowchart, Hank and instability lists, Attention to Detail, Notes, Unused Content (arrest/release branch) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest/Flowchart&prop=wikitext&format=json | checked: page does not exist |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Nest_(Transcript)&prop=wikitext&format=json | checked: page does not exist |
| https://detroitbecometext.github.io/chapters/15 | fan transcript linked from the wiki; text read from https://detroitbecometext.github.io/i18n/en.json and the chapter template in https://detroitbecometext.github.io/chunk-JCLJBPDO.js: all dialogue options and lines with relation icons and unlock conditions, scan texts, STAY/LEAVE, ending lines, flowchart label strings, HUD strings (`CHANCE OF SURVIVAL: 89%`, chase route labels, clue conclusions), diary pages, cut arrest/release strings |
| https://detroitbecometext.github.io/chapters/18 (same data files) | Russian Roulette: Amanda's Rupert conditions and icons, DIARY / SIGNS ON WALLS / DEVIANT / SAVING HANK unlocks, Hank down if Connor died in The Nest |
| https://detroitbecometext.github.io/chapters/29 (same data files; Last Chance, Connor template) | Rupert diary/body evidence lines; Hank's "When I was hanging off the roof" condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank and Amanda change lists for The Nest |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | save large up, follow large down, timeout ×2, chase death small down |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | confirms no public opinion change in The Nest |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazine list: #20 Past the Tipping Point, #33 Red Ice Epidemic in The Nest |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Red_Ice_Epidemic&prop=wikitext&format=json | Detroit Today article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Past_the_Tipping_Point&prop=wikitext&format=json | Green Earth article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Rupert&prop=wikitext&format=json | Rupert bio (WB200, missing 10/11/2036, LED removed 11:36), Nest summary, Crossroads and Last Chance appearances |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Rupert%27s_Diary&prop=wikitext&format=json | diary location, decryption via the body in Last Chance, page texts |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | evidence list: Rupert's body (if suicide), Rupert's diary (if found); saved-Hank dialogue condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Russian_Roulette&prop=wikitext&format=json | Amanda and Hank changes tied to Rupert's outcome; bugged ID option; cut truth/lie with Amanda |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | "Spot Rupert (only available if he escaped in The Nest)" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=On_the_Run&prop=wikitext&format=json | "Connor Obeys Hank's Order" unlocks HIGHWAY |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Nest summary, quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | Nest summary ("Connor's probability estimates that Hank would most likely survive"), Connor death causes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Amanda expresses disappointment about Rupert in the next Zen Garden scene |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chicken_Feed&prop=wikitext&format=json | food truck facts (license dates, calories) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Urban_Farms_of_Detroit&prop=wikitext&format=json | chase location, 265 Acre Av. |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Abandoned_apartment&prop=wikitext&format=json | apartment notes (rA9 in the bathroom, diary, magazine) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Pigeons&prop=wikitext&format=json | pigeons, ornithophobia gallery text |
