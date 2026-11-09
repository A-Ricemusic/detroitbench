# Chapter 24: Public Enemy (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06. Sources: the PowerPyx 100% flowchart screenshots and walkthrough text (including reader comments), the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, magazine, character and later-chapter pages, and the fan transcript at detroitbecometext.github.io (chapter 24). The transcript's text was read from its `i18n/en.json` and the compiled chapter template (function `UL` in `chunk-JCLJBPDO.js`, the same bundle the ch12 and ch15 agents used). I decoded the template with a small script that resolves the Angular instructions and the translation keys. The data gives the in-game strings, the relationship/stat icons per option, the unlock conditions, the HUD strings and the flowchart string table (`MENU.FLOWCHART.09C.*`; the game's internal ID for this chapter is `09C`). Working files are in `/tmp/flowcharts/ch24/` (not committed): `wiki.txt`, `pp.txt`, `transcript.txt` (decoded), `strings09C.txt`, `wikipages/`, `crops/`. The wiki has no `Public_Enemy/Flowchart` and no `Public_Enemy_(Transcript)` page (both `missingtitle`); the chapter page links to the fan transcript.

Game date and time (wiki infobox and game strings `GUI.MENU.DATE.09C`/`TIME.09C`): November 8, 2038, 04:06 PM. Location: Stratford Tower, floor 79 (broadcast floor of Channel 16). Infobox objectives: "Find Amanda", "Investigate the attack", "Interrogate androids in the kitchen", "Stop the deviant", "Follow blue blood traces (only if Simon was left behind on the roof)". Wiki: "This chapter has eight different outcomes." (`|endings=8`). PowerPyx: "Triggers automatically after completing The Stratford Tower Chapter."

Summary:
- **Chart size:** 70 chart nodes, plus 3 bracketed phase labels (`INVESTIGATE CORRIDORS`, `INVESTIGATE BROADCAST ROOM`, `INVESTIGATE ROOFTOP`) and 10 yellow cross-chapter condition tabs. There are 2 checkpoints (`FALL IN THE ZEN GARDEN`, `INSIDE STRATFORD TOWER`).
- **Endings (8):** `CONNOR AND HANK LEFT THE CRIME SCENE`, `CONNOR DIED RUNNING TOWARD SIMON` (skull), `CONNOR WAS TRAUMATIZED`, `HANK AND CONNOR SURVIVED UNSCATHED`, `CONNOR SHUT DOWN` (skull), `CONNOR AND HANK SURVIVED`, `CONNOR SACRIFICED HIMSELF FOR HANK` (skull), `MASSACRE PREVENTED`.
- **Choices on the chart:** two player choices (Simon: `RUSH DEVIANT` / `STAY IN COVER`; corridor: `RUSH DEVIANT` / `PROTECT HANK` / `DRAW GUN`). Two performance outcomes use the same marker (`SHOT BY SIMON` / `REACH SIMON`; `DEVIANT NOT FOUND` / `FIND DEVIANT`).
- **Choices off the chart:** four Amanda dialogue rounds in the Zen Garden (one only if the Tracis were spared), four interrogation rounds in the kitchen, the free-roam order (roof, kitchen, or leave), and a YES/NO when asking Hank to leave.
- **Three branches:** the Simon rooftop branch and the kitchen-deviant branch each end the chapter, so one playthrough sees at most one of them. Leaving ends it with neither.
- **Numbers found:**
  - The only probability is the HUD string `HANK SURVIVAL PROBABILITY : 40%`, from the game string table. Neither the wiki nor PowerPyx gives it.
  - Timers: 1:45 to put the biocomponent back (PowerPyx), and Connor auto-charges after 14 s in the corridor (wiki). In-game text also gives "sixty-three seconds" and "Desactivated since 60s".

---

## 1. Flowchart transcription

Read from `Detroit-Public-Enemy-1-001.jpg` (whole chart) and the zooms `-2` (start), `-3` (corridors), `-4` (broadcast room), `-5` (rooftop), `-6` (Simon), `-7` (leave, kitchen, deviant attack), `-8` (corridor finale). Crops are in `crops/`. Every label matches the game's string table (`MENU.FLOWCHART.09C.*`) one for one. The chart misspells the previous chapter as `'STATFORD TOWER'` in every condition tab. The hostage tab reads `SAVED DURING 'THE HOSTAGE''` with a doubled closing quote. Both are quoted exactly below.

Chart header (PowerPyx run): `100% COMPLETED` / `PUBLIC ENEMY`. World-stats strip: `PUBLIC OPINION SYMPATHETIC`, `SOFTWARE INSTABILITY ???`, `HANK FRIEND`, `AMANDA TRUSTED`.

Icon key (as drawn):
- [arrow] = action
- [triangle] = event the game triggers
- [choice] = the overlapping-squares choice marker
- [branch] = the small free-standing origin glyph used for optional side branches, as in the ch12/ch15 notes
- [lock] = yellow tab with an open padlock (cross-chapter impact)
- [skull] = yellow tab with a skull (death, cross-chapter)
- [cond] = a yellow tab whose text is an earlier-chapter condition. The tab is filled yellow when met on this save and grey with a yellow icon when not; it gates the node after it.

Blue fill = reached on the photographed save. Reached on this save:
- the start, coin and briefing nodes, and `MEET PERKINS`
- in the broadcast room: the cop, all four SWAT nodes, cap, video and camera
- on the rooftop: door, bag, the roof `ANALYZE DESTROYED ANDROID`, footprints and weapon
- the whole kitchen line through `DRAW GUN`, `SHOOT DEVIANT`, `RESCUE COP` and `MASSACRE PREVENTED`

Met condition tabs: `SAVED DURING 'THE HOSTAGE''`, `ATTACKED BY SWAT...` and `DIED ON ROOFTOP...`. So this save had the cop saved, SWAT storming the room, and Simon executed on the roof by Markus. All corridor nodes are grey, including `CHECK CCTV`.

### Start

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `FALL IN THE ZEN GARDEN` | checkpoint (large card, Zen Garden image) | chapter start |
| 2 | `TALK TO AMANDA` | [arrow] | #1 |
| 3 | `INSIDE STRATFORD TOWER` | checkpoint (large card, elevator image) | #2 |
| 4 | `HANK CONFISCATES COIN` | [triangle], from a [branch] glyph | optional side branch above the main line |
| 5 | `LISTEN TO BRIEFING` | [arrow], from a [branch] glyph | optional side branch below the main line |

### Investigate corridors (bracket entered from #3)

| # | Node | Icon | Gate tab / notes |
|---|---|---|---|
| - | `INVESTIGATE CORRIDORS` | bracketed phase label | encloses #6 to #11 |
| 6 | `ANALYZE GUARD NEXT TO PHONE` | [arrow] | [cond] `KILLED DURING 'STATFORD TOWER'` |
| 7 | `ANALYZE SIMON'S BLUE BLOOD` | [arrow] | [cond] `WOUNDED DURING 'STATFORD TOWER'` |
| 8 | `ANALYZE DEAD EMPLOYEE` | [arrow] | [cond] `KILLED DURING 'STATFORD TOWER'` |
| 9 | `CHECK CCTV` | [arrow] | no tab |
| 10 | `ANALYZE PHONE` | [arrow] | no tab (but conditional; see 2c) |
| 11 | `ANALYZE ARMED GUARD` | [arrow] | [cond] `KILLED DURING 'STATFORD TOWER'` |
| 12 | `MEET PERKINS` | [arrow] | out of the corridors bracket |

### Investigate broadcast room (bracket entered from #12)

| # | Node | Icon | Gate tab / notes |
|---|---|---|---|
| - | `INVESTIGATE BROADCAST ROOM` | bracketed phase label | encloses #13 to #22 |
| 13 | `MEET COP FROM HOSTAGE SITUATION` | [arrow] | [cond] `SAVED DURING 'THE HOSTAGE''` |
| 14 | `ANALYZE CORRIDOR BULLET HOLES` | [arrow] | [cond] `ATTACKED BY SWAT DURING 'STATFORD TOWER'` (one tab feeds #14 to #17) |
| 15 | `ANALYZE ROOF ACCESS BULLET HOLES` | [arrow] | same tab |
| 16 | `ANALYZE SCREEN BULLET HOLES` | [arrow] | same tab |
| 17 | `ANALYZE BLUE BLOOD ON WALL` | [arrow] | same tab |
| 18 | `ANALYZE CAP` | [arrow] | no tab |
| 19 | `WATCH VIDEO` | [arrow] | no tab |
| 20 | `CHECK CAMERA` | [arrow] | no tab |
| 21 | `ANALYZE DESTROYED ANDROID` | [arrow] | [cond] `DIED IN BROADCAST DURING 'STATFORD TOWER'` |
| 22 | `ANALYZE BLUE BLOOD ON CONSOLE` | [arrow] | [cond] `WOUNDED DURING 'STATFORD TOWER'` |

Three lines leave the broadcast-room bracket: up to #25, right to #23, down to #44.

### Leave

| # | Node | Icon | Follows |
|---|---|---|---|
| 23 | `DECIDE TO LEAVE` | [arrow] | broadcast-room bracket |
| 24 | `CONNOR AND HANK LEFT THE CRIME SCENE` | ending (large card, Markus-on-screen image, no icon) | #23 |

### Rooftop

| # | Node | Icon | Gate tab / notes |
|---|---|---|---|
| 25 | `GO TO ROOFTOP` | [arrow] | broadcast-room bracket |
| - | `INVESTIGATE ROOFTOP` | bracketed phase label | encloses #26 to #31 |
| 26 | `ANALYZE DOOR` | [arrow] | no tab |
| 27 | `ANALYZE BAG` | [arrow] | no tab |
| 28 | `ANALYZE DESTROYED ANDROID` | [arrow] | [cond] `DIED ON ROOFTOP DURING 'STATFORD TOWER'` |
| 29 | `ANALYZE BLUE BLOOD` | [arrow] | [cond] `WOUNDED DURING 'STATFORD TOWER'` |
| 30 | `FIND FOOTPRINTS` | [arrow] | no tab. The chart draws it straight off the bracket; the wiki nests it under "Wounded" |
| 31 | `ANALYZE WEAPON` | [arrow] | no tab |
| 32 | `FIND SIMON` | [arrow] | out of the rooftop bracket's right side (the only exit) |
| 33 | `RUSH DEVIANT` | [choice] option 1 | #32 |
| 34 | `STAY IN COVER` | [choice] option 2 | #32 |
| 35 | `SHOT BY SIMON` | [choice] outcome row 1 | #33 |
| 36 | `REACH SIMON` | [choice] outcome row 2 | #33 |
| 37 | `SIMON IS DESTROYED BY SWAT` | [lock] | #35 |
| 38 | `CONNOR DIED RUNNING TOWARD SIMON` | ending (large card), [skull] | #37 |
| 39 | `FLASH FROM SIMON'S MEMORY` | [lock] | #36 |
| 40 | `SIMON SELF-DESTRUCTS` | [lock] | #39 |
| 41 | `CONNOR WAS TRAUMATIZED` | ending (large card, no icon) | #40 |
| 42 | `SIMON IS DESTROYED BY SWAT` | [lock] | #34 |
| 43 | `HANK AND CONNOR SURVIVED UNSCATHED` | ending (large card, no icon) | #42 |

### Kitchen

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 44 | `ENTER THE KITCHEN` | [arrow] | broadcast-room bracket |
| 45 | `READ "BLEEDING BLUE"` | [arrow], from a [branch] glyph | optional (magazine) |
| 46 | `READ "CLEAN FOOD CRAZE"` | [arrow], from the same [branch] glyph | optional (magazine) |
| 47 | `INTERROGATE ANDROIDS` | [arrow] | #44 |
| 48 | `DEVIANT NOT FOUND` | [choice] outcome row 1 | #47. No outgoing line drawn |
| 49 | `FIND DEVIANT` | [choice] outcome row 2 | #47 |
| 50 | `DEVIANT ATTACKS` | [triangle] | #49 |
| 51 | `OUT OF TIME` | [triangle] | #50 |
| 52 | `CONNOR SHUT DOWN` | ending (large card), [skull] | #51 |
| 53 | `REMOVE KNIFE` | [arrow] | #50 |
| 54 | `RECOVER BIOCOMPONENT` | [arrow] | #53 |
| 55 | `LOSE TOO MUCH TIME` | [triangle] | #54 |
| 56 | `SWAT DESTROYS DEVIANT` | [lock] | #55 |
| 57 | `DEVIANT KILLS COP FROM HOSTAGE SITUATION` | [triangle] | #56 and #63 (two lines join) |
| 58 | `CONNOR AND HANK SURVIVED` | ending (large card, no icon) | #56 and #63 (two lines join) |
| 59 | `CHASE DEVIANT` | [arrow] | #54 |
| 60 | `RUSH DEVIANT` | [choice] option 1 | #59 |
| 61 | `PROTECT HANK` | [choice] option 2 | #59 |
| 62 | `DRAW GUN` | [choice] option 3 | #59 |
| 63 | `DEVIANT SELF-DESTRUCTS` | [lock] | #60 |
| 64 | `DEVIANT SHOOTS CONNOR` | [triangle] | #61 |
| 65 | `SWAT DESTROYS DEVIANT` | [lock] | #64 |
| 66 | `DEVIANT KILLS COP FROM HOSTAGE SITUATION` | [triangle] | #65 |
| 67 | `CONNOR SACRIFICED HIMSELF FOR HANK` | ending (large card), [skull] | #65 |
| 68 | `SHOOT DEVIANT` | [lock] | #62 |
| 69 | `RESCUE COP` | [triangle] | #68 |
| 70 | `MASSACRE PREVENTED` | ending (large card, no icon) | #68 |

Total: 70 nodes (excluding the three bracket labels and the ten condition tabs).

Condition-tab strings (`MENU.FLOWCHART.09C.GC.*`):
- `PHONEGUARD`, `GUNGUARD` and `BROADCASTEMPLOYEE` all read `KILLED DURING 'STATFORD TOWER'`.
- `SIMONHURTCORRIDOR` reads `WOUNDED DURING 'STATFORD TOWER'`.
- `HOSTAGECOP` reads `SAVED DURING 'THE HOSTAGE''`.
- `ASSAULT` reads `ATTACKED BY SWAT DURING 'STATFORD TOWER'`.
- `SIMONDIEDROOM` reads `DIED IN BROADCAST DURING 'STATFORD TOWER'`.
- `SIMONDIEDROOF` reads `DIED ON ROOFTOP DURING 'STATFORD TOWER'`.

Strings in the table that are not drawn on the chart:
- `TALK TO AMANDA` (`REINFORCEMENT`, a duplicate)
- `FIND BAG`
- `CONNOR DIED`
- `CONNOR SAW JERICHO MEMORY`
- `FLASH FROM DEVIANT'S MEMORY`
- a second `FIND DEVIANT` (`DEVIANT`)
- a third `DEVIANT KILLS COP FROM HOSTAGE SITUATION` (`SAVEDCOPDEADOLD`)

These appear to be cut or renamed nodes. `FLASH FROM DEVIANT'S MEMORY` suggests a cut probe of the JB300 in the corridor.

Wording differences on the wiki's text flowchart:
- "Recover Biocomponent", "Deviant killed cop from 'The Hostage'" and "Deviant Kills Cop From The Hostage": the chart says `DEVIANT KILLS COP FROM HOSTAGE SITUATION`.
- "Simon Self-Destructs": same as the chart.
- "Rescue Cop (if saved during The Hostage)": same.
- The wiki puts `CONNOR AND HANK SURVIVED` after `LOSE TOO MUCH TIME` under `RECOVER BIOCOMPONENT`, which agrees with the chart.
- The wiki nests `DEVIANT KILLS COP` and `CONNOR AND HANK SURVIVED` under `DEVIANT SELF-DESTRUCTS`, which agrees with the chart's joined lines.

---

## 2. Choices and gates

### 2a. Zen Garden (nodes 1 to 2; four off-chart dialogue rounds)

Amanda is in a rowing boat; Connor rows. Amanda: "Hello, Connor. I thought you might enjoy a little cruise… I love this place… Tell me, what have you discovered?" (`X0901C.BOAT.CHAT.PC.X09CAMANDA.CLIMB`/`START`).

Round 1, "what have you discovered?":

| Option | Variant (transcript condition) | Line | Icons (transcript) |
|---|---|---|---|
| `HANK` | "Hank shot Connor in The Bridge" | "I'm having difficulties with Lieutenant Anderson. He's unstable, even hostile. He shot me in the head last night…" | none |
| `HANK` | "Hank left Connor alone in The Bridge" | "My relationship with Lieutenant Anderson is problematic… I suspect it clouds his judgement regarding deviants." Amanda: "Nothing matters more than your investigation… Don't let Anderson or anyone else get in your way." | none |
| `EDEN CLUB` | "Connor didn't find the Tracis" | "I went to the Eden Club… but I didn't learn anything new…" Amanda: "That's disappointing. Looks like another missed opportunity." | Amanda small down |
| `EDEN CLUB` | "found the Tracis… and let them go" | "…they managed to escape…" Amanda: "That's too bad... You seemed so close to stopping them." | Amanda small down |
| `EDEN CLUB` | "found the Tracis… and they died" | "…I had to destroy them…" | Amanda small up |

Round 2. Amanda: "You seem… lost, Connor. Lost and perturbed…"

| Option | Requires | Line | Icons (transcript) | Wiki / PowerPyx |
|---|---|---|---|---|
| `SINCERE` | transcript lock: "Spared the Tracis in The Eden Club"; PowerPyx: "[Unlocked by being friends with Hank]" | "I thought I knew what I had to do… but now I realize it's not that simple…" | Amanda small down | wiki: Amanda down |
| `DETERMINED` | none | "I'm just frustrated with my lack of progress, but I'm determined to accomplish my mission." | none | wiki: Amanda up; PowerPyx: Amanda▲ |
| `COLD` | none | "The investigation is more challenging than I anticipated, but I have no doubt that I will solve this case and stop the deviants." | SI small down | wiki: Amanda up, SI down; PowerPyx: SI▼ Amanda▲ |
| `TROUBLED` | none | "Perturbed? No… No, of course not. Why would I be perturbed?" | SI small up, Amanda small down | wiki and PowerPyx agree |

Round 3, only if "Connor spared the Tracis in The Eden Club". Amanda: "You had your gun trained on those deviants at the Eden Club. Why didn't you shoot?"

| Option | Line | Icons (transcript) | Wiki / PowerPyx |
|---|---|---|---|
| `TOO FAR` | "They were out of range. If I had the opportunity to stop them, why wouldn't I?" Amanda: "You tell me." | none | wiki: Amanda down ("too far"; Relationship Stat calls it "Out of Range"); PowerPyx: Amanda▼ |
| `NO USE` | "We need the deviants intact for analysis. Shooting them wouldn't have told us anything." | none | PowerPyx: no effect |
| `TRUTH` | "I don't know… I don't know." | Amanda large down | wiki large down; PowerPyx Amanda▼▼▼ |

Round 4. Amanda: "If your investigation doesn't make progress soon, I may have to replace you, Connor…"

| Option | Line | Icons (transcript) |
|---|---|---|
| `CONFLICTED` | "I understand." | SI small up |
| `CONFIDENT` | "I know I will succeed. All I need is time." | Amanda small up |
| `INDIFFERENT` | "I am of no importance. The mission is all that matters." | SI small down, Amanda large up |

Close: Amanda: "Something's happening… Something serious. Hurry, Connor. Time is running out." HUD: `FIND AMANDA`, then `REPORT TO AMANDA` / `GET IN THE BARK`.

### 2b. Elevator and briefing (nodes 3 to 5)

Two mutually exclusive elevator openings:
- "Hank shot Connor in The Bridge" (death unlock). Connor: "Why did you shoot me last night? Some fragments of memory are lost every time I'm destroyed. It slows down the investigation." Hank: "Who cares, you're back this morning, aren't ya?… My humblest apologies, I promise I'll never shoot you again." No coin.
- "Hank didn't shoot Connor in The Bridge" = `HANK CONFISCATES COIN`. Hank: "You're starting to piss me off with that coin, Connor." Connor: "Sorry, Lieutenant." Hank pockets the coin and can later be seen practising Connor's tricks.
  - PowerPyx ("if Hank is a Friend") and the wiki Connor page ("he only does this if the two have a friendly relationship") add a Friend requirement. The transcript conditions only on the Bridge outcome. See Open questions.

`LISTEN TO BRIEFING` (PowerPyx: "hold [button] until Chris is done talking"). Officer Chris Miller gives the briefing.
- Opening: "A group of four androids… They knew the building, and they were very well organized."
- Guards, by Markus's choice:
  - "Knocked out the guards": "They attacked two guards in the hallway... They got taken down before they could react…"
  - "Attacked the guards": "They knocked one out and shot the other in cold blood…"
- Station employee:
  - not shot: "One of the station employees managed to get away. He's in shock…"
  - shot: "A station employee… shot to the back as he was trying to get away. One bullet straight through the heart, from fifty feet… that's the kind of shooting only an android could do."
- "Just two employees and three androids. The deviants took the humans hostage and broadcast their message live. They made their getaway from the roof… they jumped with parachutes…"
- Simon, by outcome:
  - "SWAT killed Simon": "One of the deviants… SWAT took it out. It's a pity they couldn't manage to capture it alive."
  - "Simon was killed on the roof": "We found the body of an android on the rooftop… Maybe it got wounded- I mean damaged, and couldn't make the jump."
- "We stored the station androids in the kitchen. There's no evidence that they were involved…" Then the screen with the broadcast.

Background cops: "You check the roof?" / "Not yet… There's so much to look at." / "Have to make sure we check it out." These variants exist when Simon is on the roof (`SIMON01-03`). Variants `NOSIMON01-03` exist otherwise: "Yeah… There's nothing up there."

### 2c. Investigate corridors (nodes 6 to 11)

All optional scans. Text from the transcript observation items and PowerPyx.

| Node | Requires (Stratford Tower) | Scan text |
|---|---|---|
| `ANALYZE GUARD NEXT TO PHONE` | Markus shot the guard on the phone ("Shoot Guard on Phone"; transcript "Left guard was shot") | `CHEDD, SEAN` "Estimated time of death: 13:53:36", "Cause of death: Fatal gunshot wound" |
| `ANALYZE SIMON'S BLUE BLOOD` | Simon was shot in the corridor fight (PowerPyx: "unlocked if Simon had been shot by the guard"; wiki: "Wounded During 'Stratford Tower'") | `FRESH BLUE BLOOD` "Model: PL-600", "Reported missing 2036.16.02". HUD `WOUNDED DEVIANT WAS SHOT` |
| `ANALYZE DEAD EMPLOYEE` | Markus's team shot the fleeing operator ("Shoot Operator") | `THOMPSON, EVAN` "Estimated time of death: 13:55:24", "Cause of death: Fatal gunshot wound". HUD `EMPLOYEE TRIED TO ESCAPE` |
| `CHECK CCTV` | none | The camera above the broadcast-room door. Connor: "They didn't break in?" Chris: "No, no sign of forced entry." Connor: "There are cameras in the hallway. The staff would have seen what was happening… Why did they let them in?" Hank: "Maybe they didn't check the cameras…" HUD `DEVIANTS DIDN'T BREAK IN`, `INCIDENT WAS CAPTURED BY CCTV`, `CHECK CCTV RECORDING` |
| `ANALYZE PHONE` | North kicked the guard on the phone (wiki: "You can only analyze the phone if North attacked the guard on phone"; wiki flowchart: "If North attacked the guard on phone and Markus shot the other guard") | `PHONE` "Attempted call: Central Security", "Call interrupted". HUD `GUARD TRIED TO ALERT SECURITY` |
| `ANALYZE ARMED GUARD` | Markus shot the guard drawing his weapon ("Shoot Guard Drawing Weapon"; transcript "Right guard was shot") | `FRESH BLOOD` "Name: Robert, Chris"; `ROBERT, CHRIS` "Estimated time of death: 13:53:36". HUD `GUARD WAS SHOT AND DISARMED` |

Other HUD conclusions in the string table: `GUARD WAS KNOCKED OUT`, `GUARD WAS DRAGGED`, `GUARD WAS SHOT`.

`MEET PERKINS`. Chris: "Oh Lieutenant, this is Special Agent Perkins from the FBI." Perkins: "What's that?" Connor: "My name is Connor. I'm the android sent by CyberLife." Perkins: "Androids investigating androids, huh? You sure you want an android hanging around?.. After everything that happened… Whatever, the FBI will take over the investigation, you'll soon be off the case… And you watch your step. Don't fuck up my crime scene." Hank: "What a fuckin' prick!" There is no choice and no stat change.

### 2d. Investigate broadcast room (nodes 13 to 22)

| Node | Requires | Text / effect |
|---|---|---|
| `MEET COP FROM HOSTAGE SITUATION` | Officer M. Wilson saved in The Hostage (tourniquet; benchmark `C03` option 0). The brief called him a SWAT officer; he is a uniformed DPD officer shot on the terrace | Automatic mini-cutscene when Connor walks past (commenters: "there is no prompt"). Cop: "Connor?.. You remember me? I was on that terrace… I was shot, you saved me…" Three variants: "Connor didn't die before": "I remember you." / "…I never thought I'd say this to an android, but… Thank you…"; "Connor died in The Hostage": "Sorry, you must be mistaken." / "…That Connor was destroyed... Connor saved my life… Even if it wasn't you… Thank you…"; "Connor died after The Hostage": "Sorry, you must be mistaken." / "I would have died on that terrace… Connor saved my life…". No stat icon. The transcript files this under "Going near the kitchen" |
| `ANALYZE CORRIDOR BULLET HOLES`, `ANALYZE ROOF ACCESS BULLET HOLES`, `ANALYZE SCREEN BULLET HOLES` | an alarm brought SWAT in (PowerPyx: "an employee triggers an alarm that summoned SWAT") | `BULLET HOLES` "Calibre: .45", "Weapon: Assault Rifle" (SWAT); a second set "Calibre: .457", "Weapon: Handgun" (deviants' stolen pistols) |
| `ANALYZE BLUE BLOOD ON WALL` | same tab (PowerPyx: "If Simon was shot by SWAT, but you helped him to the roof") | `FRESH BLUE BLOOD` (PL-600). HUD `DEVIANT WAS SHOT`, `ACCOMPLICE TRIED TO HELP DEVIANT` |
| `ANALYZE CAP` | none | `CAP` "Stolen maintenance uniform", "Assailants were disguised" |
| `WATCH VIDEO` | none | Markus's broadcast. Hank: "Think that's rA9?" Connor: "Deviants say rA9 will set them free. This android seems to have that objective." Scans: `OPTICAL UNIT` "#8087q - BLUE IRIS", "SPARE PART"; `PUPIL REFLECTION` "Recorded at 13:59:54", "Deviant had accomplices"; `RK-SERIES PROTOTYPE RK200` "Registered as 'Markus'", "Gift from Elijah Kamski to Carl Manfred". Hank: "Anything else I should know?" Connor: "No. Nothing." (He keeps the Kamski/Manfred link to himself; wiki Note.) HUD `SPEECH WAS SHOT FROM HERE`, `DEVIANT HACKED THE BROADCAST` |
| `CHECK CAMERA` | none | The CCTV recording of the hallway. HUD `AN ANDROID WAS MONITORING CCTV`. This is the clue that unlocks the deviant accusation in the kitchen (wiki: "must have watched the CCTV footage to unlock further items in this branch"; transcript note: "If Connor checked the CCTV, the dialogue will continue. Otherwise, he can come back later to resume the dialogue here") |
| `ANALYZE DESTROYED ANDROID` | Simon died in the broadcast room (Markus left him, or failed to save him, and SWAT killed him) | Simon's body. Simon wiki: "he will not be able to interact with it" |
| `ANALYZE BLUE BLOOD ON CONSOLE` | Simon was wounded (any wound) | Simon's blood. Wiki Notes: "If Simon got wounded you can analyze his blue blood near the elevator, on the walls and on the console" |

Off chart: "If Markus was shot in The Stratford Tower, Connor will have an option to examine Markus' blue blood" (wiki Note; observation `FRESH BLUE BLOOD` "RK-Series Prototype RK200", "Property of Carl Manfred"). Wiki Note: "If Markus locked the door, incapacitated the guards/killed the guard on phone and shot the reporter, the broadcast room will appear undamaged".

### 2e. Free roam: rooftop, kitchen, or leave (nodes 23, 25, 44)

The three branches leave the same bracket and the player picks them by walking.
- **Finding Simon ends the chapter.** Commenters: "If you go to the rooftop at all you will NOT be given a choice in how to respond to the deviant android"; "you'll never spot the deviant if you go to the roof".
- **Finding the kitchen deviant ends the chapter.** Commenters: "if you decide to interrogate the androids before checking the roof then the chapter will end after that sequence"; "I found the deviant in the kitchen and it self destructed and then it just went on to the next chapter".
- **Simon on the roof but the kitchen comes first:** he survives. Wiki Note: "If Simon was left behind on the rooftop and Connor follows The Stratford Android, after the investigation is done, Simon can be seen in the safe showing relief". Simon page: "If Connor does not go up to the roof, or leaves the rooftop without finding him, Simon stays hidden until the police and FBI leave the building."
- **Simon not on the roof:** the rooftop investigation yields only clues (HUD `NO EVIDENCE ON ROOF`). Connor then goes back down to the kitchen or leaves.

`DECIDE TO LEAVE`. Transcript heading "Taking too much time / Ask Hank to leave", with a Time unlock icon. Connor: "I think we have seen everything there is to see." Hank: "You wanna go?"

| Option | Line | Effect |
|---|---|---|
| `YES` | "Yes." Hank: "Ok, we're outta here." | `CONNOR AND HANK LEFT THE CRIME SCENE` |
| `NO` | "Actually, I'll have another look around." Hank: "You're the boss." | investigation continues |

PowerPyx says leaving is offered only once the objectives are complete ("listen to briefing, inspect the broadcast room, and inspect the roof"): "walk up to Hank while he's idling and talk to him". Commenters add:
- the roof objective must be ticked off, and Hank sometimes blocks the roof door until he moves;
- after `DEVIANT NOT FOUND` the game "cuts to Connor going to Hank and saying he wants to go", playing the same lines without a choice (transcript "Fail to find the deviant").

There are no stat icons on either option.

### 2f. Rooftop and Simon (nodes 25 to 43)

Hank on arrival: "They made their way up through the whole building, past all the guards and jumped off the roof with parachutes… Pretty fucking impressive I'd say."

| Node | Text |
|---|---|
| `ANALYZE DOOR` | `DOOR` "Wireless security lock", "Recently hacked". HUD `DEVIANT HACKED THE DOOR TO BLOCK IT` |
| `ANALYZE BAG` | Hank: "How'd they manage to smuggle in a big bag like that?" Connor: "They didn't… Someone brought it in for them." (HUD `POSSIBLE ACCOMPLICE?`). If "Simon was left behind alive", Hank: "Oh, that's strange... They planned a perfect operation but got the number of parachutes wrong." Connor: "Unless one of the deviants was left behind." (HUD `ONLY THREE DEVIANTS JUMPED`, `DEVIANT LEFT BEHIND?`) |
| `ANALYZE DESTROYED ANDROID` | only if Markus executed Simon on the roof. `MODEL PL-600` "Serial number : #501 743 923", "Reported missing 2036.16.02" |
| `ANALYZE BLUE BLOOD` | Simon wounded. HUD `WOUNDED DEVIANT DIDN'T JUMP`, `DEVIANT COULDN'T JUMP WITH THOSE WOUNDS`, `FOLLOW BLUE BLOOD TRACES` |
| `FIND FOOTPRINTS` | `SHOE PRINTS` "Stratford maintenance footwear - standard issue", "Recent - Partially covered by snow" |
| `ANALYZE WEAPON` | `WEAPONS` ".457 Handgun", "Stratford Tower Security issue" (the pistols taken from the guards) |

**`FIND SIMON`.** Lock: "Simon was left alive on the roof in The Stratford Tower". Connor follows the blood to a ventilation/air-cooler unit ("compartment on the far left side of the rooftop"; Simon page: "an air cooler unit"). He opens it and Simon shoots him (Simon page: "in the shoulder"; PowerPyx: "Open the door and you'll be shot"). Hank drags Connor behind cover. SWAT and FBI open fire on the unit. Connor: "You have to stop them! If they destroy it, we won't learn anything!" Hank: "We can't save it, it's too late! We'll just get ourselves killed!"

| Option | In-game button | Leads to | Effect |
|---|---|---|---|
| `RUSH DEVIANT` (chart) | `CHARGE DEVIANT` (`X0903C.ROOF.BRAD.FA.FOUNDCHOICE01.GETOUT`) | a QTE run under fire: `SHOT BY SIMON` or `REACH SIMON` | see below |
| `STAY IN COVER` | `STAY IN COVER` | `SIMON IS DESTROYED BY SWAT` → `HANK AND CONNOR SURVIVED UNSCATHED` | No icon in the transcript (it prints "ø" for this option's content). Simon page: "If Connor allows SWAT to kill Simon, he is disappointed they did not capture him alive" |

Performance outcomes after `RUSH DEVIANT`:

| Chart node | Cause | Text | Effect |
|---|---|---|---|
| `SHOT BY SIMON` → `SIMON IS DESTROYED BY SWAT` → `CONNOR DIED RUNNING TOWARD SIMON` | failing the dodge QTEs (PowerPyx: "if you don't succeed at several QTEs in a row, you'll get shot"; wiki: "Connor is shot in the head by Simon") | Transcript death unlock "Connor dies rushing Simon". Hank: "Connor! Connor!... Oh Connor… Oh no…" SWAT kills Simon | SI small down (wiki; PowerPyx "Software Instability▼"). Connor dies |
| `REACH SIMON` → `FLASH FROM SIMON'S MEMORY` → `SIMON SELF-DESTRUCTS` → `CONNOR WAS TRAUMATIZED` | passing the QTEs | Connor grabs Simon and probes his memory; Simon shoots himself in the head during the probe. Hank: "Connor! Connor you all right?" Connor: "Okay…" Hank: "Are you hurt?" Connor: "I'm ok…" Hank: "Jesus! You scared the shit outta me… For fuck sake, I told you not to move! Why do you never do what I say?" Connor: "I was connected to its memory… when it fired… I felt it die… Like I was dying. I was scared… I saw something, in its memory… a word… painted on a piece of rusty metal … 'Jericho'" | SI large up (transcript `SoftwareInstability LargeUp`; wiki "Charge at Simon and successfully probe his memory"; PowerPyx SI▲▲▲) |

Simon cannot survive once found (Simon page: "If Connor finds Simon, there is no way for Simon to survive the chapter").

### 2g. Kitchen and the Stratford android (nodes 44 to 54)

Three identical JB300 broadcast-operator androids stand in the kitchen. The deviant is `JB300 #336 445 581` ("Broadcast Android 1" on the wiki), "the one closest to the kitchen counter". PowerPyx: "it has always the one on the left". Its tell is glancing at Connor, gritting its teeth, and turning its head. Each question is put to one android of the player's choosing. HUD: `INTERROGATE ANDROIDS AND CHECK THEIR REACTION`, `LOOK FOR A REACTION TO SPOT THE DEVIANT`.

| Round | Options (transcript) | Replies |
|---|---|---|
| 1 | `FUNCTION` ("What is your function?") / `MODEL` ("State your model.") | "I am a broadcast operator." / "Model JB300, Serial number 336 445 581." (all three give the same serial; wiki Note) |
| 2 | `WITNESS` ("Were you present when the deviants broke in?") / `MEMORY` ("Has anybody accessed your memory recently?") / `DIAGNOSTIC` ("Run a diagnostic.") / `CONTACT` ("Have you been in contact with any other androids recently?") | "I do not remember." / "Not to my knowledge." / "All systems fully operational." / "Only station androids in the normal course of my function." |
| gate | needs `CHECK CAMERA` ("If Connor checked the CCTV, the dialogue will continue"). Without it the HUD says `QUESTION ANDROIDS AGAIN` and Connor must come back | Connor: "One of you saw the attack on the surveillance cameras and said nothing. Which means there is a deviant in this room… and I'm going to find out which it is." |
| 3 | `THREATEN` ("You're going to be switched off… You're going to be destroyed!") / `DEAL` ("If you give yourself up, maybe I can convince the humans not to destroy you.") / `GUILT` ("Why should you all be destroyed, if only one is deviant? Turn yourself in, or two innocent androids will be shut down because of you.") | none |
| 4 (aimed at one android) | `VIOLENCE` ("You scumbag! I know it's you! You're just a fucking deviant. Go on, admit it!") / `BLUFF` ("The deviants have just been caught… They gave you up…") / `TORTURE` ("Biocomponent #8451... Regulates the heartbeat... Without this module, you will shut down in exactly sixty-three seconds… I could put it back… But, you just have to tell me the truth. Are you the deviant?") / `PROBE MEMORY` (on the wrong android: "No memory.") | none |

None of the interrogation options carries a stat icon in the transcript, PowerPyx or the wiki.

Outcomes:
- **`DEVIANT NOT FOUND`.** Round 4 is aimed at the wrong android (PowerPyx: "If somehow you haven't identified the correct android… you'll conclude that there isn't a deviant among them and give up"; HUD `NO DEVIANT AMONG THEM`). The JB300 "will look at Connor in shock as he leaves" (wiki). The transcript then plays the leave lines ("I think we have seen everything there is to see." / "You wanna go?" / "Yes." / "Ok, we're outta here."). No line is drawn to an ending on the chart; see Open questions.
- **`FIND DEVIANT` → `DEVIANT ATTACKS`.** Round 4 is aimed at the deviant. Any of the four triggers it (PowerPyx). The android pins Connor's hand to the counter with a knife, tears out his thirium pump regulator (HUD `BIOCOMPONENT #8456w MISSING`, `VITAL SYSTEM DAMAGED`, `TIME REMAINING BEFORE SHUTDOWN`; scan `CARDIAC CELL` "Biocomponent #845", "Desactivated since 60s"), and runs, shouting "JERICHO!" Connor: "Hank!.. Hank, I need help!.." (there is also a `CALL` button). Wiki Note: "Before removing the knife Connor can try to call Hank and push a chair."

| Chart node | Cause | Text | Effect |
|---|---|---|---|
| `REMOVE KNIFE` → `RECOVER BIOCOMPONENT` | QTEs: pull the knife, crawl to the component, reinsert it before the timer (PowerPyx: "leaving you only 1:45") | HUD `RECOVER CARDIAC CELL` | continues to the chase |
| `OUT OF TIME` → `CONNOR SHUT DOWN` | timer expires. Wiki: "If you fail to remove the knife in time, Connor will remove the knife and call Hank for help, but if you removed the knife but failed to reach the heart, a similar scene plays out but instead it jumps to Connor crawling" | Hank: "Connor! Hang on son, hang on, hang on! We're gonna save you, hang on!.. Here, here..." Connor: "deviant… there was… a deviant…" Hank: "Connor! Connor... No…" The deviant escapes (wiki: "the android will leave without a trace") | SI small down, Hank small down (transcript; wiki "Connor fails to remove knife"/"fails to reach heart" SI down; PowerPyx Hank▼ SI▼). Connor dies |

### 2h. The corridor (nodes 55 to 70)

| Chart node | Cause | Text / effect |
|---|---|---|
| `LOSE TOO MUCH TIME` → `SWAT DESTROYS DEVIANT` (→ `DEVIANT KILLS COP FROM HOSTAGE SITUATION` if Wilson was saved) → `CONNOR AND HANK SURVIVED` | after recovering, Connor does not chase at once (PowerPyx: "If you don't chase it immediately, events will play out without you") or runs the wrong way. Wiki: "If Connor goes the wrong direction when chasing the deviant, Hank can be seen having killed the deviant"; JB300 page: "JB300 will kill everyone in the hallway except for Hank and Chris, and Hank will have killed the android by the time Connor arrives" | PowerPyx: "Connor and Hank Survived: Public Opinion▼ Software Instability▲▲▲" and "Deviant Kills Cop...: Public Opinion▼". The transcript has no block for this branch |
| `CHASE DEVIANT` | Connor follows at once | Connor: "It's a deviant! STOP IT!" The JB300 grabs a SWAT officer's assault rifle. A timed three-way choice by looking direction: ahead `ATTACK`, left `SAVE HANK`, right `TAKE GUN` (PowerPyx). Wiki Notes: "If you stand still the game will have Connor automatically charge at the deviant"; "If you wait 14 seconds the game will make Connor charge"; "If you are slightly slower the deviant will grab the gun before the timer starts." Wilson appears in the corridor if he was saved ("if the cop that Connor previously saved is alive he will also appear in the corridor") |

| Option (chart) | Button (transcript / PowerPyx) | Leads to | Text | Icons |
|---|---|---|---|---|
| `RUSH DEVIANT` | `ATTACK` | `DEVIANT SELF-DESTRUCTS` (→ `DEVIANT KILLS COP FROM HOSTAGE SITUATION` if saved) → `CONNOR AND HANK SURVIVED` | PowerPyx: "You will rush the deviant, but several cops will die… he puts the gun under his own chin and pulls the trigger." JB300 page: "he will shoot himself and kill police officer M. Wilson". Hank: "Connor! Connor, are you okay?" Connor: "I tried to stop it but… I was too late." | transcript: PO small down, SI large up. Wiki: PO down ×2, SI large up. PowerPyx: PO▼ on the cop kill, SI▲▲▲ on the ending |
| `PROTECT HANK` | `SAVE HANK` (`THOUGHTS.0601C.SAVE`) | `DEVIANT SHOOTS CONNOR` → `SWAT DESTROYS DEVIANT` (→ `DEVIANT KILLS COP FROM HOSTAGE SITUATION` if saved) → `CONNOR SACRIFICED HIMSELF FOR HANK` | Connor throws Hank to the ground and takes the burst. The JB300 kills officers (including Wilson), FBI agents and CSI before SWAT kills it. SWAT radio: "Shots fired, repeat shots fired - call the paramedics!" Hank: "Good thing you were here. Otherwise I – Connor… Connor, no…" | transcript: PO small down, Hank large up. Wiki: Hank large up; SI down ("Connor sacrifices himself to protect Hank"); PO down. PowerPyx: Hank▲▲▲ SI▼. Connor dies |
| `DRAW GUN` | `TAKE GUN` (`THOUGHTS.0701K.TAKEGUN`; wiki: "Take gun from FBI agent's holster") | `SHOOT DEVIANT` (→ `RESCUE COP` if saved) → `MASSACRE PREVENTED` | Connor shoots the JB300 before it fires. Hank: "Nice shot, Connor." Connor: "I wanted it alive." Hank: "You saved... human lives… You saved my life." Wiki Note: the officer Connor hands the gun back to is snowy if Connor went to the roof first | transcript: Hank large up. Wiki: Hank large up. PowerPyx: Hank▲▲▲ |

The chart allows exactly one outcome per option. Draw Gun always succeeds, Rush always ends in self-destruction with Connor alive, and Protect always kills Connor. No performance failure is drawn after the choice.

---

## 3. Numbers

### Probabilities and timers

| Item | Figure | Source |
|---|---|---|
| Hank's survival estimate | 40% | HUD string `THOUGHTS.0901C.HANKCHANCES = HANK SURVIVAL PROBABILITY : 40%` (game text via the fan transcript's `en.json`). Not on the wiki or PowerPyx. Where it shows is not documented; most likely at the corridor choice when Connor looks toward Hank. It is a displayed estimate, not a roll |
| Biocomponent timer | 1:45 | PowerPyx: "leaving you only 1:45 to put it back in your chest". The scan reads "Desactivated since 60s"; the HUD reads `TIME REMAINING BEFORE SHUTDOWN` |
| JB300 shutdown in TORTURE | "exactly sixty-three seconds" | Connor's TORTURE line (`X0903C.KITCHEN.QUESTIONS.PC.X09CCONNOR.TORTURE`). Dialogue only; no mechanic is attached |
| Corridor choice timer | 14 seconds, then auto-charge | wiki Notes: "If you wait 14 seconds the game will make Connor charge." |
| Simon dodge QTEs | none stated | PowerPyx "several QTEs in a row" |
| Kitchen interrogation | none stated | depends on which android is targeted in round 4 |

### Amanda (Zen Garden)

| Moment | Change | Source line |
|---|---|---|
| `EDEN CLUB`, Tracis shot | small up | wiki: "Picking "Eden Club" when Amanda asks what he discovered if he shot the Traci {{Icon\|up}}"; transcript `Amanda SmallUp` |
| `EDEN CLUB`, Tracis escaped or not found | small down | wiki: "...if the Tracis escaped or if he didn't find them {{Icon\|down}}"; transcript `Amanda SmallDown` (both variants) |
| `HANK` | none | no icon anywhere; PowerPyx "HANK: No Effect" |
| `SINCERE`, `TROUBLED` | small down | wiki: "Picking "troubled" or "sincere" when Amanda accuses Connor of seeming lost {{Icon\|down}}"; transcript `Amanda SmallDown` on both |
| `DETERMINED`, `COLD` | small up (wiki, PowerPyx); no icon (transcript) | wiki: "Picking "determined" or "cold" when Amanda accuses Connor of seeming lost {{Icon\|up}}"; PowerPyx "DETERMINED: Amanda▲", "COLD: Software Instability▼Amanda▲" |
| `TOO FAR` | small down (wiki, PowerPyx); no icon (transcript) | wiki: "Picking "too far" when Amanda asks why Connor didn't shoot the Tracis {{Icon\|down}}" |
| `NO USE` | none | PowerPyx "NO USE: No effect" |
| `TRUTH` | large down | wiki: "Picking "truth" when Amanda asks why Connor didn't shoot the Tracis {{Icon\|largedown}}"; transcript `Amanda LargeDown`; PowerPyx "Amanda▼ ▼ ▼" |
| `CONFIDENT` | small up | wiki: "Picking "confident" when Amanda threatens to replace Connor {{Icon\|up}}"; transcript `Amanda SmallUp` |
| `INDIFFERENT` | large up | wiki: "Picking "indifferent"... {{Icon\|largeup}}"; transcript `Amanda LargeUp` |
| `CONFLICTED` | none | no Amanda icon in any source |

### Hank

| Moment | Change | Source line |
|---|---|---|
| `CONNOR SHUT DOWN` | small down | Public Enemy: "Connor dies while trying to reconnect his biocomponent {{Icon\|down}}"; Relationship Stat: "If Public Enemy concludes with the "Connor shut down" ending."; transcript `Hank SmallDown`; PowerPyx "Hank▼" |
| `PROTECT HANK` (sacrifice) | large up | Public Enemy: "Shielding Hank from the deviant or shoot the deviant {{Icon\|largeup}}"; Relationship Stat: "Either of the following endings... Connor sacrificed himself for Hank / Massacre prevented"; transcript `Hank LargeUp` |
| `DRAW GUN` | large up | same lines; transcript `Hank LargeUp`; PowerPyx "Massacre Prevented: Hank▲ ▲ ▲" |
| `RUSH DEVIANT` (corridor), `LOSE TOO MUCH TIME`, every Simon outcome, `DECIDE TO LEAVE`, interrogation, coin | none stated | no icon in any source |
| Any Connor death here | small down, applied at the start of Meet Kamski | Meet Kamski: "Connor died in Public Enemy {{Icon\|down}}"; Relationship Stat: "At the beginning of Meet Kamski if Connor died in Public Enemy." |

### Software instability

| Moment | Change | Source line |
|---|---|---|
| `TROUBLED` | small up | Public Enemy: "Picking "troubled" when Amanda accuses Connor of seeming lost {{Icon\|up}}"; transcript `SmallUp` |
| `COLD` | small down | Public Enemy: "Picking "cold"... {{Icon\|down}}"; transcript `SmallDown` |
| `CONFLICTED` | small up | Public Enemy: "Picking "conflicted" when Amanda threatens to replace Connor {{Icon\|up}}"; transcript `SmallUp` |
| `INDIFFERENT` | small down | Public Enemy: "Picking "indifferent"... {{Icon\|down}}"; transcript `SmallDown` |
| `REACH SIMON` (memory probe) | large up | Public Enemy: "Charge at Simon and successfully probe his memory {{Icon\|largeup}}"; Software Instability: "Connor was traumatized (if Simon was found and Connor manages to reach him)"; transcript `LargeUp` |
| `SHOT BY SIMON` (death) | small down | Public Enemy: "Connor is shot in the head by Simon {{Icon\|down}}"; Software Instability: "Any ending of Public Enemy in which Connor dies: Connor died running toward Simon" |
| `OUT OF TIME` (death) | small down | Public Enemy: "Connor fails to remove knife {{Icon\|down}}" / "Connor fails to reach heart {{Icon\|down}}"; transcript `SmallDown` |
| `RUSH DEVIANT` (corridor) | large up | Public Enemy: "Charge the JB300 deviant {{Icon\|largeup}}"; Software Instability: "Choosing to attack the deviant (or choosing not to do anything within the time limit) at the end of Public Enemy."; transcript `LargeUp` |
| `PROTECT HANK` (death) | small down | Public Enemy: "Connor sacrifices himself to protect Hank {{Icon\|down}}"; Software Instability: "Connor sacrificed himself for Hank". No icon in the transcript |
| `LOSE TOO MUCH TIME` | large up per PowerPyx only | PowerPyx "Connor and Hank Survived: Public Opinion▼ Software Instability▲ ▲ ▲" (see Open questions) |
| `STAY IN COVER`, `DRAW GUN`, `DECIDE TO LEAVE`, interrogation | none stated | - |

### Public opinion

| Moment | Change | Source line |
|---|---|---|
| `RUSH DEVIANT` (corridor) | small down ×2 (wiki), small down ×1 (transcript) | Public Enemy: "Attack the deviant {{Icon\|down}} x2"; Public Opinion: "Choosing to "rush deviant" in Public Enemy." plus the ending "Connor and Hank survived. (If Connor was present)"; transcript `PublicOpinion SmallDown` on `ATTACK` |
| `PROTECT HANK` | small down | Public Enemy: "Save Hank {{Icon\|down}}"; Public Opinion: "Connor sacrificed himself for Hank."; transcript `PublicOpinion SmallDown` |
| `DEVIANT KILLS COP FROM HOSTAGE SITUATION` (any branch) | small down per PowerPyx only | PowerPyx attaches "Public Opinion▼" to each of the three cop-death nodes |
| `LOSE TOO MUCH TIME` ending | small down per PowerPyx; the Public Opinion page's "(If Connor was present)" suggests it does not count | PowerPyx "Connor and Hank Survived: Public Opinion▼" |
| `DRAW GUN`, Simon branch, leave | none | - |

### Choices with no stated number

No published figures exist for: the Simon QTE failure rate, the kitchen identification (it is deterministic on the targeted android), the leave timer, or the coin condition. All stat icons give direction and size only.

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Tracis shot / spared / not found (The Eden Club) | `EDEN CLUB` variant and Amanda icon. `SINCERE` locked to "Spared the Tracis". Round 3 (TOO FAR / NO USE / TRUTH) only if spared | transcript conditions; wiki Amanda lines |
| Hank shot Connor (The Bridge) | elevator apology scene instead of `HANK CONFISCATES COIN`; `HANK` answer to Amanda changes | transcript "Hank shot Connor in The Bridge" / "Hank didn't shoot Connor"; wiki flowchart "Hank Confiscates Coin - if Connor was not killed in 'The Bridge'" |
| Hank relationship Friend | coin confiscation (PowerPyx and wiki Connor page; not in the transcript) | PowerPyx "Immediately at the start of this level, if Hank is a Friend"; Connor page "he only does this if the two have a friendly relationship" |
| Guard on phone shot / armed guard shot / operator shot (Stratford Tower) | `ANALYZE GUARD NEXT TO PHONE` / `ANALYZE ARMED GUARD` / `ANALYZE DEAD EMPLOYEE`; briefing lines | condition tabs; transcript "Left guard was shot", "Right guard was shot", "Employee was shot" |
| North kicked the phone guard | `ANALYZE PHONE` | wiki Note "You can only analyze the phone if North attacked the guard on phone" |
| Alarm raised, SWAT stormed | the four SWAT-damage nodes | tab `ATTACKED BY SWAT DURING 'STATFORD TOWER'`; PowerPyx |
| Simon wounded | `ANALYZE SIMON'S BLUE BLOOD`, `ANALYZE BLUE BLOOD ON CONSOLE`, roof `ANALYZE BLUE BLOOD` | tabs; Notes |
| Simon killed in the broadcast room | `ANALYZE DESTROYED ANDROID` (broadcast); Chris "SWAT took it out" | tab `DIED IN BROADCAST...`; transcript "SWAT killed Simon" |
| Simon executed on the roof by Markus | roof `ANALYZE DESTROYED ANDROID`; Chris "We found the body of an android on the rooftop" | tab `DIED ON ROOFTOP...`; transcript "Simon was killed on the roof" |
| Simon left alive on the roof (`The Group Escaped But Simon Was Left Behind`) | `FIND SIMON` and the whole Simon branch; bag dialogue about parachutes | transcript lock "Simon was left alive on the roof in The Stratford Tower" |
| Markus shot (Stratford Tower) | off-chart scan of Markus's blood | wiki Note |
| Officer Wilson saved (The Hostage) | `MEET COP FROM HOSTAGE SITUATION`; he can die (`DEVIANT KILLS COP...`) or be rescued (`RESCUE COP`) | tab `SAVED DURING 'THE HOSTAGE''`; M. Wilson page |
| Any earlier Connor death (in or after The Hostage) | Connor does not remember Wilson | transcript "Connor didn't die before" / "Connor died in The Hostage" / "Connor died after The Hostage" |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| Simon not found (any ending except the three Simon endings, with Simon left on the roof) | Simon returns to Jericho: Freedom March `Reunited in Jericho` / `Simon Forgives Markus`; he can later sacrifice himself for Markus; present in Crossroads, Night of the Soul, Battle for Detroit | game string `MENU.FLOWCHART.10M.GC.SIMONALIVE = SIMON SURVIVED IN 'PUBLIC ENEMY'`; Freedom March: "{{Icon\|impact}}[[Simon]] survived in '[[Public Enemy]]' / Reunited in Jericho / Simon Forgives Markus"; Simon page: "If he is spared and remains undetected in Public Enemy, Simon returns to Jericho and Markus hugs him" |
| `SIMON IS DESTROYED BY SWAT` or `SIMON SELF-DESTRUCTS` | Simon dead for Markus's story. Simon's body in the Last Chance, Connor evidence room: reactivate, interrogate, impersonate Markus (needs `MARKUS' BROADCAST`), download the Jericho key | Public Enemy: "Simon will not appear in further chapters"; Last Chance: "Simon's Body (if killed in Public Enemy) / Reactivate Simon / Interrogate Simon - leads to Impersonate Markus"; string `MENU.FLOWCHART.12C.GC.SIMON = KILLED IN 'PUBLIC ENEMY'` |
| `FLASH FROM SIMON'S MEMORY` | `JERICHO TABLET` evidence in Last Chance; with the statue map from Partners, Jericho is located without reactivating anyone | Public Enemy: "unlocks an additional evidence item in Last Chance, Connor."; Last Chance: "Jericho Tablet - only if Connor probed Simon's memory in Public Enemy"; Notes: "it is possible to use the memory to narrow the search with the map"; string `MENU.FLOWCHART.12C.GC.JERICHO = GOT INFORMATION IN 'PUBLIC ENEMY'` |
| `SWAT DESTROYS DEVIANT`, `DEVIANT SELF-DESTRUCTS`, `SHOOT DEVIANT` | Stratford android's body in the evidence room: reactivate, trick by impersonating Markus | Public Enemy: "unlocks deviant's body as an evidence item in Last Chance, Connor."; Last Chance: "Stratford Android's Body (if killed in Public Enemy) / Reactivate Deviant / Interrogate Deviant"; string `MENU.FLOWCHART.12C.GC.STARTFORDANDROID = KILLED IN 'PUBLIC ENEMY'`; reader confirmation for Draw Gun ("Yes. That's the way I just did it.") |
| JB300 escapes (`CONNOR SHUT DOWN`, `DEVIANT NOT FOUND`, `CONNOR AND HANK LEFT THE CRIME SCENE`, any Simon ending) | no Stratford android body | inferred from the conditions above |
| Connor dies (`CONNOR DIED RUNNING TOWARD SIMON`, `CONNOR SHUT DOWN`, `CONNOR SACRIFICED HIMSELF FOR HANK`) | Meet Kamski opens with `Wait for Hank` / `Hank Isn't Pleased to See Connor`, Hank small down. Adds to the death count Last Chance reads ("died at least twice" Hank dialogue; graves in the Zen Garden). Hank quote if Connor "died more than once and died in Public Enemy" | string `MENU.FLOWCHART.11C.GC.CONNORDEAD = CONNOR DIED IN 'PUBLIC ENEMY'`; Meet Kamski flowchart and "Connor died in Public Enemy {{Icon\|down}}"; Hank page quote; Last Chance Notes |
| `PROTECT HANK` | Last Chance Hank empathy line: "Back at Stratford Tower, when that android was shooting at anything that moved… You protected me… You... Risked your life to save mine. That showed empathy, Connor. And empathy is a human emotion." Used when Connor did not save Hank in The Nest and shot Chloe | Last Chance transcript condition "Connor saved Hank at the Stratford Tower in Public Enemy"; Last Chance Notes "If Connor saved Hank from the Stratford Deviant (Occurs If Connor didn't save Hank on the rooftop, if Connor sacrificed himself to protect Hank in Public Enemy, and shot Chloe)" |
| `HANK CONFISCATES COIN` | Connor's coin idle animation is gone for the rest of the game; Hank practises the tricks | Quarter coin page |
| Amanda, Hank and instability changes | feed Last Chance (Hank Friend gate for the diversion), Crossroads (deviancy) and the endings | Relationship Stat; Software Instability |
| Officer Wilson killed here | no later reference found | M. Wilson page lists no later appearance |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `CONNOR AND HANK LEFT THE CRIME SCENE` | none | `DECIDE TO LEAVE`, `YES`. Possibly also after `DEVIANT NOT FOUND` (transcript and commenters; see Open questions). JB300 escapes; Simon (if on the roof and not found) survives |
| `CONNOR DIED RUNNING TOWARD SIMON` | [skull] | Simon left on the roof; `FIND SIMON`, `RUSH DEVIANT`, `SHOT BY SIMON`, `SIMON IS DESTROYED BY SWAT` |
| `CONNOR WAS TRAUMATIZED` | none | `FIND SIMON`, `RUSH DEVIANT`, `REACH SIMON`, `FLASH FROM SIMON'S MEMORY`, `SIMON SELF-DESTRUCTS` |
| `HANK AND CONNOR SURVIVED UNSCATHED` | none | `FIND SIMON`, `STAY IN COVER`, `SIMON IS DESTROYED BY SWAT`. (Connor is still shot in the shoulder when he opens the unit; "unscathed" is the chart's word) |
| `CONNOR SHUT DOWN` | [skull] | `FIND DEVIANT`, `DEVIANT ATTACKS`, `OUT OF TIME` (knife or crawl too slow). JB300 escapes |
| `CONNOR AND HANK SURVIVED` | none | either `LOSE TOO MUCH TIME` → `SWAT DESTROYS DEVIANT`, or `CHASE DEVIANT` → `RUSH DEVIANT` → `DEVIANT SELF-DESTRUCTS`. Wilson dies in both if he was saved |
| `CONNOR SACRIFICED HIMSELF FOR HANK` | [skull] | `CHASE DEVIANT`, `PROTECT HANK`, `DEVIANT SHOOTS CONNOR`, `SWAT DESTROYS DEVIANT`. Wilson dies if saved |
| `MASSACRE PREVENTED` | none | `CHASE DEVIANT`, `DRAW GUN`, `SHOOT DEVIANT` (`RESCUE COP` if Wilson was saved). No human dies |

---

## 6. Media

Two magazines on a lunch table in the kitchen off the broadcast room (PowerPyx: "On one of the lunch tables as you walk in. Be sure to read it before you start interrogating the androids."). Both are optional. There is no stat effect and no TV broadcast in the chapter. Markus's recorded broadcast (`WATCH VIDEO`) is an investigation clue, not a media item, with no public-opinion effect.

**`READ "BLEEDING BLUE"`: *Tech Addict*, "Bleeding Blue"** (Magazine page #16)
- Cover: "The quantum magnet that could scrub carbon from the air"; "How CyberLife created a technological revolution"; "Space tourism: is Mars your next holiday destination?"
- "After decades of android designs that were primitive, robotic, and expensive, CyberLife revolutionized the industry through an innovation of their CEO and visionary Elijah Kamski."
- "Thirium 310 (the chemical name of blue blood, which is a trademark) is a compound vital to the functioning of all CyberLife androids, circulating energy and electrical information throughout the machine's 'body'."
- It powers "bio-components", synthetic organs; "the loss of blue blood will impair an android's functions, ultimately resulting in shutdown."
- "That this wonder chemical... was developed by one man - who isn't even a trained chemist - only furthers the myth of Elijah Kamski."

**`READ "CLEAN FOOD CRAZE"`: *Green Earth*, "Clean Food Craze"** (Magazine page #21)
- Cover: "Mass forest fires expected in California, Arizona, New Mexico"; "Detroit Urban Farms is changing the way we eat"; "Miami to heighten sea wall by further ten meters".
- Detroit Urban Farms "takes city 'dead space' - such as high rooftops and unused courtyards - and turns them into GM-free farmland... staffed by urban unemployed".
- "All food is grown without pesticides or other chemicals".
- Brothers Daniel and Parker Trent started it five years ago; "we went to every bank in the city, but nobody would lend us enough for a shovel". "DUF employs over 50 staff supervising hundreds of androids: 'We get requests every day from investment firms offering us capital, but we'd rather stay independent.'"

Public opinion effect: none for either.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) tags five nodes with chapter 24, in file order:
- `R24` (media, index 82)
- `C14` (index 83)
- `C14b` (index 84)
- `C15` (index 85)
- `C16` (index 86)

Engine references in `benchmark/story-engine.mjs`:
- gates in `blocked()`, lines 89 to 91 (`C14b` needs `C14` option 0; `C15` and `C16` need `s.kitchen`)
- option removal at line 154 (`C14` option 0 removed unless `s.simonHidden && s.simon`)
- effects at lines 228 to 232
- `connorDies` at line 178 (`connorDeaths++`, `si(-1)`, `hank(-1)`, `amanda(-1)`)
- `evidenceRoutes` at line 26

The Stratford Tower inputs come from `M10` to `M14` (lines 223 to 227): `simonWounded`, `simonHidden`, `simon`, `casualties`. The saved hostage officer is only recorded as `choices.C03 === '0'`.

### What exists

- **`R24` "A magazine in the studio kitchen":** both magazines, no effect. Facts match the articles. Bleeding Blue's "without being a trained chemist" matches. Clean Food Craze says "rooftops" where the article says "high rooftops and unused courtyards", and "staffed by the unemployed supervising hundreds of androids" where the article says "over 50 staff". Close enough.
- **`C14` "The broadcast tower":**
  - Option 0, follow the blood to the roof: only when Simon is hidden.
  - Option 1, question the kitchen androids: sets `kitchen`.
  - Option 2, "Do neither; let the federal agents take over": `amanda(-1)`.
  - Options 1 and 2 with Simon hidden leave Simon alive.
- **`C14b` "The wounded android on the roof":**
  - Option 0, rush and probe: `risk: 0.3`. Success gives `si(2)`, `amanda(2)` and `simonTablet`. Failure runs `connorDies`.
  - Option 1, stay in cover.
  - Every branch kills Simon and sets `simonBody`.
- **`C15` "The three androids in the kitchen":** BLUFF, intimidation/pain, PROBE. All three make the deviant attack. No stat effect.
- **`C16` "The corridor":**
  - Option 0, shield Hank: `hank(2)` plus `connorDies`.
  - Option 1, grab the pistol: `risk: 0.15`. Success gives `hank(2)`, `amanda(1)`; failure runs `connorDies`.
  - Option 2, charge: `risk: 0.3`. Success gives `si(2)`, `po(-1)`; failure runs `connorDies`.
  - Every branch sets `kitchenBody`.

### Node by node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `FALL IN THE ZEN GARDEN`, `TALK TO AMANDA` and the four Amanda rounds | missing | Real decisions with Amanda and instability effects: EDEN CLUB up/down by Traci outcome; SINCERE/TROUBLED Amanda down; TROUBLED SI up; COLD SI down (and Amanda up per wiki); TOO FAR down (wiki); TRUTH Amanda large down; CONFLICTED SI up; CONFIDENT Amanda up; INDIFFERENT Amanda large up, SI down. Gates read `C12` (Tracis) and `C13` (Hank shot Connor) |
| `INSIDE STRATFORD TOWER`, `HANK CONFISCATES COIN`, `LISTEN TO BRIEFING` | missing | narration. The coin needs Hank not to have shot Connor (`C13`), possibly Friend. The briefing varies with `M10`/`M11`/`M13`/`M14` |
| Corridors bracket (6 nodes) and `MEET PERKINS` | missing | clue narration. `ANALYZE PHONE` and the guard nodes need a guard-level distinction the engine lacks: `M10` option 1 sets `casualties` but does not say which guard died, and `M10` option 0's failure path wounds Simon without recording whether North kicked the phone guard |
| `MEET COP FROM HOSTAGE SITUATION` | missing | needs `choices.C03 === '0'`; the variant line needs `connorDeaths` |
| Broadcast-room clue nodes, including `WATCH VIDEO` and `CHECK CAMERA` | missing (summarized in `C14`'s situation) | `CHECK CAMERA` is the real gate for the kitchen accusation. `C14`'s situation says "one of them was shot", which is false when Simon was not wounded |
| `DECIDE TO LEAVE`, `CONNOR AND HANK LEFT THE CRIME SCENE` | `C14` option 2 | Present in spirit. `amanda(-1)` has no source (no Amanda effect is stated for leaving). The chart ending name and the YES/NO are not modelled |
| `GO TO ROOFTOP`, rooftop bracket | `C14` option 0 | Only offered when Simon is hidden. In the game the roof can be inspected regardless (it yields clues, the bag/parachute deduction, or Simon's body) and, without Simon, does not end the chapter |
| `FIND SIMON`, `RUSH DEVIANT` / `STAY IN COVER` | `C14b` | Present. The situation matches (Simon in a ventilation unit fires and hits Connor; SWAT closing). The game calls the button `CHARGE DEVIANT` |
| `SHOT BY SIMON` / `REACH SIMON` | `C14b` option 0 `risk: 0.3` | The risk is a reasonable stand-in for the QTE outcome group, but no figure is published; label as an adaptation. Fail branch: `connorDies` (si -1, hank -1, amanda -1). Sources give SI small down only here; the Hank down comes at Meet Kamski; no Amanda change is stated. Success: `si(2)` matches large up; `amanda(2)` has no source. Event text matches ("glimpses Jericho as Simon dies. The experience shakes him") |
| `SIMON IS DESTROYED BY SWAT` / `SIMON SELF-DESTRUCTS` carry-forward | `simon=false`, `evidence.simonBody`, `simonTablet` | correct. `evidenceRoutes` uses `simonBody` for "impersonate" and `simonTablet && statueMap` for "tablet", which matches Last Chance |
| `ENTER THE KITCHEN`, magazines | `C14` option 1, `R24` | present |
| `INTERROGATE ANDROIDS` (4 rounds) | `C15` (one round of three) | Partly right. The game has FUNCTION/MODEL, four questions, THREATEN/DEAL/GUILT, then VIOLENCE/BLUFF/TORTURE/PROBE MEMORY aimed at one of three androids. `C15` offers three of the four final approaches (no VIOLENCE as such; "intimidation and pain" merges VIOLENCE and TORTURE). The situation gives away the tell ("a slight tremor and a faint sign of stress"). The game's tell is visual and can be missed |
| `DEVIANT NOT FOUND` | missing | the scene always finds the deviant. Picking the wrong android, or not checking the camera, should be possible; the JB300 then escapes with no body |
| `DEVIANT ATTACKS`, `REMOVE KNIFE`, `RECOVER BIOCOMPONENT` | `C15` outcome text | present as narration ("tears a component from his chest, then runs") |
| `OUT OF TIME`, `CONNOR SHUT DOWN` | missing | A death ending with SI small down and Hank small down, and no JB300 body. `C16`'s situation asserts "you got it back in place just in time" |
| `LOSE TOO MUCH TIME`, `SWAT DESTROYS DEVIANT` (upper), `CONNOR AND HANK SURVIVED` (via SWAT) | missing | Connor arrives after Hank/SWAT have killed the JB300; body available; Wilson dies if saved |
| `CHASE DEVIANT`, `RUSH DEVIANT` / `PROTECT HANK` / `DRAW GUN` | `C16` | present, three options |
| `PROTECT HANK` → `CONNOR SACRIFICED HIMSELF FOR HANK` | `C16` option 0 | Outcome right (Connor dies). Effects: `hank(2)` then `connorDies` (`hank(-1)`, `si(-1)`, `amanda(-1)`), net Hank +1. The game's Hank large up is immediate, with the death penalty applied at Meet Kamski, so the net is similar; the Amanda down has no source. Missing: `po(-1)` (transcript and wiki), Wilson's death, and a flag for the Last Chance "You protected me" line |
| `DRAW GUN` → `SHOOT DEVIANT` → `MASSACRE PREVENTED` | `C16` option 1 `risk: 0.15` | Mislabelled risk. The chart has one outcome after `DRAW GUN`; the engine's 15% "the deviant fires first and cuts Connor down" has no counterpart. `hank(2)` matches. `amanda(1)` has no source. `RESCUE COP` not modelled. The situation's "grab the pistol from the officer beside you" should be an FBI agent's holstered gun |
| `RUSH DEVIANT` → `DEVIANT SELF-DESTRUCTS` → `CONNOR AND HANK SURVIVED` | `C16` option 2 `risk: 0.3` | Mislabelled risk. The chart has one outcome; the engine's 30% "empties it into him" death has no counterpart. `si(2)` matches large up. `po(-1)` matches one of the wiki's ×2. The event text "kills several officers before Connor reaches him; he then shoots himself" matches, but the game's rush lines show Connor alive ("I tried to stop it but… I was too late") |
| `DEVIANT KILLS COP FROM HOSTAGE SITUATION` (×2), `RESCUE COP` | missing | flavour unless the cop is tracked; PowerPyx gives a PO down for each death |
| Corridor timeout (14 s → auto-charge) | missing | the engine has no timeout default; the game default is RUSH |
| `HANK SURVIVAL PROBABILITY : 40%` | missing | could be quoted in `C16`'s situation |

Effects present that the sources do not support:
- `C14` option 2 `amanda(-1)`
- `C14b` success `amanda(2)`
- `C16` option 1 `amanda(1)`
- the 15% failure on `C16` option 1 and the 30% failure on `C16` option 2
- the `amanda(-1)` inside `connorDies` for this chapter's deaths (no Amanda change is stated)

Effects the sources state that are absent:
- the whole Amanda conversation (eight icons)
- `CONNOR SHUT DOWN` (SI down, Hank down)
- `DEVIANT NOT FOUND`, and the Simon-survives route through it
- `PROTECT HANK`'s PO down
- the Last Chance "saved Hank at the Stratford Tower" flag
- the coin
- Wilson's meeting and death or rescue
- the PowerPyx-only PO downs on cop deaths
- the PowerPyx-only SI up on `LOSE TOO MUCH TIME`

Name tokens a rebuild will need that are not in `NAMES`:
- Chris (Miller) and Wilson
- Stratford Tower and Channel 16
- Evan Thompson, Sean Chedd, Chris Robert
- Carl Manfred (`{{Carl}}` exists), Elijah (`{{Kamski}}` exists)
- the Trent brothers and Detroit Urban Farms (magazine)
- the word rA9 (no neutral substitute in `NEUTRAL_TERMS`)

"FBI" and "Homeland security" may also identify the setting.

---

## 8. Open questions

1. **Coin condition.** Does `HANK CONFISCATES COIN` need Hank at Friend (PowerPyx, wiki Connor page), or only that Hank did not shoot Connor in The Bridge (transcript, Quarter coin page)?
2. **`SINCERE` gate.** The transcript locks it to "Spared the Tracis"; PowerPyx says "friends with Hank", and two commenters at Friend did not get it. Confirm.
3. **Amanda icons in round 2 and round 3.** The wiki and PowerPyx give `DETERMINED` and `COLD` Amanda up and `TOO FAR` Amanda down; the transcript shows no Amanda icon on any of the three. Which is right?
4. **Where does `HANK SURVIVAL PROBABILITY : 40%` appear?** Presumably at the corridor choice when Connor looks at Hank, or perhaps on the roof when Hank pulls Connor to cover. It is not on the wiki or PowerPyx.
5. **What follows `DEVIANT NOT FOUND`?** The chart draws no line from it. The transcript and one commenter say Connor goes straight to Hank and leaves (`CONNOR AND HANK LEFT THE CRIME SCENE`). Another commenter failed the kitchen, then visited the roof, then left. Does the cut to leaving depend on the other objectives being done? Can Simon still be found after a failed interrogation?
6. **`DECIDE TO LEAVE` requirements.** PowerPyx says all objectives (briefing, broadcast room, roof) must be complete. The transcript heads it "Taking too much time" with a Time icon, and has two string sets (`LEAVE`/`YES`/`NO` and `LEAVEV2`). Is there a timer after which Hank offers to leave?
7. **`LOSE TOO MUCH TIME` stats.** PowerPyx gives PO down and SI large up; the wiki stat pages say nothing for this branch. The SI page's "(or choosing not to do anything within the time limit)" may refer to the corridor's 14-second auto-charge instead.
8. **Corridor PO.** Is `RUSH DEVIANT` one small down (transcript) or two (wiki "x2")? Does each `DEVIANT KILLS COP FROM HOSTAGE SITUATION` add its own down (PowerPyx), or only the endings (wiki Public Opinion page)? When Wilson was never saved, is the PO change the same?
9. **`PROTECT HANK` SI.** The wiki and PowerPyx give SI small down (death); the transcript shows no SI icon. Confirm.
10. **Biocomponent timer.** Is it 1:45 (PowerPyx)? The scan reads "Desactivated since 60s". Is there a separate knife-removal window?
11. **Roof without Simon.** With Simon not left behind, is the rooftop purely clues, with no chapter end? Does it tick the "inspect the roof" objective needed to leave? With Simon on the roof, can Connor leave the roof without following the blood (Simon page says yes)?
12. **Kitchen gate.** Is `CHECK CAMERA` (broadcast room) the only requirement for the accusation round, or does the corridor `CHECK CCTV` also count? On the photographed save `CHECK CCTV` is grey while the kitchen line is complete, which suggests `CHECK CAMERA` alone.
13. **Last Chance "saved Hank at the Stratford Tower".** Is this set only by `PROTECT HANK` (Hank: "You protected me… Risked your life"), or also by `DRAW GUN` (Hank: "You saved my life")? The wiki note names only the sacrifice.
14. **`SIMON SURVIVED IN 'PUBLIC ENEMY'` for Freedom March.** Does this gate (Simon's sacrifice, the reunion) also count for a Simon who escaped by parachute unharmed, or only for the left-behind Simon who went unfound?
15. **JB300 body after `LOSE TOO MUCH TIME`.** The chart has `SWAT DESTROYS DEVIANT` [lock]. The wiki JB300 page says Hank killed it. Confirm the body reaches the evidence room either way.
16. **Unused strings.** `FLASH FROM DEVIANT'S MEMORY`, `CONNOR SAW JERICHO MEMORY`, `FIND BAG` and `CONNOR DIED` exist in the string table but not on the chart. Presumably cut content; check nothing reaches them in game.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the Public Enemy walkthrough |
| https://www.powerpyx.com/detroit-become-human-public-enemy-walkthrough-100/ | walkthrough text: Amanda options with arrows, coin "if Hank is a Friend", every clue location and its Stratford condition, kitchen tell, 1:45 timer, look-direction buttons, stat arrows per ending; reader comments on branch exclusivity, the leave condition, `DEVIANT NOT FOUND` cutting to leaving, SINCERE not unlocking at Friend, the cop cutscene, the body after Draw Gun |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-1-001.jpg | whole 100% chart; layout, reached state |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-2-002.jpg | zoom: header and world stats, start, checkpoints, coin, briefing |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-3-003.jpg | zoom: INVESTIGATE CORRIDORS bracket, condition tabs, MEET PERKINS |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-4-004.jpg | zoom: INVESTIGATE BROADCAST ROOM bracket, condition tabs, DECIDE TO LEAVE, ENTER THE KITCHEN |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-5-005.jpg | zoom: GO TO ROOFTOP, INVESTIGATE ROOFTOP bracket, FIND SIMON |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-6-006.jpg | zoom: Simon choice, outcome group, three Simon endings with icons |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-7-007.jpg | zoom: leave ending, magazines, interrogation, deviant attack, CONNOR SHUT DOWN |
| https://www.powerpyx.com/wp-content/uploads/Detroit-Public-Enemy-8-008.jpg | zoom: LOSE TOO MUCH TIME, corridor choice, all kitchen endings and the joined lines |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | chapter page: infobox, text flowchart, Amanda/Hank/SI/PO lists, Notes (14-second auto-charge, wrong-direction outcome, phone condition, cop variants) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy/Flowchart&prop=wikitext&format=json | checked: page does not exist |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy_(Transcript)&prop=wikitext&format=json | checked: page does not exist |
| https://detroitbecometext.github.io/chapters/24 | fan transcript linked from the wiki. Text read from https://detroitbecometext.github.io/i18n/en.json and the chapter template (function `UL`) in https://detroitbecometext.github.io/chunk-JCLJBPDO.js. Gave all dialogue options and lines, relation icons, unlock conditions, scan texts, HUD strings (`HANK SURVIVAL PROBABILITY : 40%`, `TIME REMAINING BEFORE SHUTDOWN`), the flowchart string table including unused labels, and the later-chapter condition strings (`10M`, `11C`, `12C`) |
| https://detroitbecometext.github.io/chapters/29 (same data files; Last Chance, Connor template, decoded earlier at `/tmp/flowcharts/ch15/dbt/lcc.txt`) | "Connor saved Hank at the Stratford Tower in Public Enemy" line; "Find Jericho by using the android from Public Enemy" section |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Amanda and Hank change lists for Public Enemy and Meet Kamski |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | traumatized large up, attack large up, Amanda-dialogue entries, every Connor death small down |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | rush deviant down; endings "Connor and Hank survived (If Connor was present)" and "Connor sacrificed himself for Hank" down |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazine list: #16 Bleeding Blue, #21 Clean Food Craze in Public Enemy |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Bleeding_Blue&prop=wikitext&format=json | Tech Addict article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Clean_Food_Craze&prop=wikitext&format=json | Green Earth article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Stratford_Tower&prop=wikitext&format=json | upstream choices: guards, phone, operator, SWAT, Simon left/executed/killed |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Simon's Public Enemy fates, hiding place, shoulder shot, survival if not found, evidence-room use |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=JB300_336_445_581&prop=wikitext&format=json | the Stratford deviant: tell, outcomes per choice, wrong-direction branch, evidence room |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=M._Wilson&prop=wikitext&format=json | the saved officer: meeting variants by Connor deaths, death per corridor choice |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Perkins&prop=wikitext&format=json | Perkins introduction |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | evidence list (Jericho Tablet, Simon's body, Stratford Android's body, Markus' Broadcast); Hank dialogue conditions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json | "Simon survived in 'Public Enemy'" gates: reunion, Simon's sacrifice |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json | Wait for Hank opening and Hank down if Connor died in Public Enemy |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | chapter summary, coin Friend claim, death causes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | elevator scenes, quotes, coin tricks |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | boat conversation summary |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Quarter_coin&prop=wikitext&format=json | coin confiscation condition and lost idle animation |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Biocomponent&prop=wikitext&format=json | #8451 (JB300) and #8456w (Connor) thirium pump regulators |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Sean_Chedd&prop=wikitext&format=json, ...&page=Chris_Robert..., ...&page=Evan_Thompson... | the guard and operator bodies and their briefing mentions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json, ...&page=Night_of_the_Soul..., ...&page=Battle_for_Detroit... | later Simon appearances conditional on survival |

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/24-public-enemy-chapter-content/public-enemy-chapter-content.component.html`, read raw from GitHub (`master`) on 2026-11-06 and resolved against `en.json` by `/tmp/dbt-scripts/render1724.py`. The rendered outline is also saved as `/tmp/dbt/ch24.txt`.

Outline legend: `#` headings are the template's own section titles (written by the transcribers, not game text). `PROMPT n` is an `app-choice-group`; `OPTION "LABEL"` is an `app-choice-item` with its game label (`bracketed` = shown in brackets on the site, used for options that need an unlock; `timeout` = the time-out branch). `ARROW Name Type` is an `app-relation` (gauge name from `GUI.GAUGE.*`). `OBSERVATION [label]` / `CLUE title / subline / subline` are `app-observation` / `app-observation-item`. `IF:` is the condition text of an `app-conditioned-content` (transcriber wording). `[UNLOCK TYPE]` is an `app-unlock-condition` (LOCK = needs an earlier action, DEATH, TIME = timer runs out, TV). `UNUSED/CUT:` is an `app-unused-content` block. Dialogue is shown only inside options and cut blocks, at most two lines each, cut at 110 characters.

**Counts.** Live prompts: 11 (32 options). Observations: 7 groups, 15 clues. Live arrows: 20. Unlock conditions: 9. Cut blocks: 0 (containing 0 prompts, 0 options, 0 arrows).

### 10.1 Rendered outline

```text
# In the Zen Garden
PROMPT 1:
  OPTION "HANK"
    CONDITION GROUP:
      IF: [UNLOCK DEATH] Hank shot Connor in The Bridge
        Connor: I’m having difficulties with Lieutenant Anderson. He’s unstable, even hostile. He shot me in the head last ...
      IF: Hank left Connor alone in The Bridge
        Connor: My relationship with Lieutenant Anderson is problematic. He continues to struggle with psychological issues...
        Amanda: Nothing matters more than your investigation. What’s happening is too important. Don’t let Anderson or anyo...
  OPTION "EDEN CLUB"
    CONDITION GROUP:
      IF: Connor didn't find the Tracis in The Eden Club
        ARROW Amanda SmallDown (AMANDA)
        Connor: I went to the Eden Club… but I didn’t learn anything new…
        Amanda: That's disappointing. Looks like another missed opportunity.
      IF: Connor found the Tracis in The Eden Club and let them go
        ARROW Amanda SmallDown (AMANDA)
        Connor: I found two deviants at the Eden Club… I hoped to learn something but… they managed to escape…
        Amanda: That's too bad... You seemed so close to stopping them.
      IF: Connor found the Tracis in The Eden Club and they died
        ARROW Amanda SmallUp (AMANDA)
        Connor: I found two deviants at the Eden Club… I hoped to learn something but… I had to destroy them…
PROMPT 2:
  OPTION "SINCERE" (bracketed)
    [UNLOCK LOCK] Spared the Tracis in The Eden Club
    ARROW Amanda SmallDown (AMANDA)
    Connor: I thought I knew what I had to do… but now I realize it’s not that simple…
  OPTION "DETERMINED"
    Connor: I’m just frustrated with my lack of progress, but I’m determined to accomplish my mission.
  OPTION "COLD"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    Connor: The investigation is more challenging than I anticipated, but I have no doubt that I will solve this case a...
  OPTION "TROUBLED"
    ARROW SoftwareInstability SmallUp (SOFTWARE INSTABILITY)
    ARROW Amanda SmallDown (AMANDA)
    Connor: Perturbed? No… No, of course not. Why would I be perturbed?
CONDITION GROUP:
  IF: Connor spared the Tracis in The Eden Club
    PROMPT 3:
      OPTION "TOO FAR"
        Connor: They were out of range. If I had the opportunity to stop them, why wouldn’t I?
        Amanda: You tell me.
      OPTION "NO USE"
        Connor: We need the deviants intact for analysis. Shooting them wouldn’t have told us anything.
      OPTION "TRUTH"
        ARROW Amanda LargeDown (AMANDA)
        Connor: I don’t know… I don’t know.
PROMPT 4:
  OPTION "CONFLICTED"
    ARROW SoftwareInstability SmallUp (SOFTWARE INSTABILITY)
    Connor: I understand.
  OPTION "CONFIDENT"
    ARROW Amanda SmallUp (AMANDA)
    Connor: I know I will succeed. All I need is time.
  OPTION "INDIFFERENT"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Amanda LargeUp (AMANDA)
    Connor: I am of no importance. The mission is all that matters.
# In the tower
CONDITION GROUP:
  IF: [UNLOCK DEATH] Hank shot Connor in The Bridge
  IF: Hank didn't shoot Connor in The Bridge
CONDITION GROUP:
  IF: Knocked out the guards in The Stratford Tower
  IF: Attacked the guards in The Stratford Tower
CONDITION GROUP:
  IF: Station employee wasn't shot in The Stratford Tower
  IF: Station employee was shot in The Stratford Tower
CONDITION GROUP:
  IF: SWAT killed Simon
  IF: Simon was killed on the roof
## Investigating
OBSERVATION [Investigate]:
  CLUE BULLET HOLES / Calibre: .45 / Weapon: Assault Rifle
  CLUE BULLET HOLES / Calibre: .457 / Weapon: Handgun
  CLUE FRESH BLUE BLOOD / Model: PL-600 / Reported missing 2036.16.02
  CLUE CAP / Stolen maintenance uniform / Assailants were disguised
CONDITION GROUP:
  IF: Employee was shot
    OBSERVATION [Body]:
      CLUE THOMPSON, EVAN / Estimated time of death: 13:55:24 / Cause of death: Fatal gunshot wound
CONDITION GROUP:
  IF: Left guard was shot
    OBSERVATION [Body]:
      CLUE CHEDD, SEAN / Estimated time of death: 13:53:36 / Cause of death: Fatal gunshot wound
  IF: Right guard was shot
    OBSERVATION [Wall and body]:
      CLUE FRESH BLOOD / Name: Robert, Chris / Cause of death: Fatal gunshot wound
      CLUE ROBERT, CHRIS / Estimated time of death: 13:53:36 / Cause of death: Fatal gunshot wound
CONDITION GROUP:
  IF: Going near the kitchen - Talking to the cop from The Hostage
    [UNLOCK LOCK] Saved the wounded cop in The Hostage
    CONDITION GROUP:
      IF: Connor didn't die before
      IF: [UNLOCK DEATH] Connor died in The Hostage
      IF: [UNLOCK DEATH] Connor died after The Hostage
### Check CCTV
### Look at the speech
OBSERVATION [Analyze]:
  CLUE OPTICAL UNIT / #8087q - BLUE IRIS / SPARE PART
  CLUE PUPIL REFLECTION / Recorded at 13:59:54 / Deviant had accomplices
  CLUE RK-SERIES PROTOTYPE RK200 / Registered as 'Markus' / Gift from Elijah Kamski to Carl Manfred
### [UNLOCK TIME] Taking too much time / Ask Hank to leave
PROMPT 5:
  OPTION "YES"
    Connor: Yes.
    Hank: Ok, we're outta here.
  OPTION "NO"
    Connor: Actually, I'll have another look around.
    Hank: You're the boss.
## In the kitchen
PROMPT 6:
  OPTION "FUNCTION"
    Connor: What is your function?
    Android: I am a broadcast operator.
  OPTION "MODEL"
    Connor: State your model.
    Android: Model JB300, Serial number 336 445 581.
PROMPT 7:
  OPTION "WITNESS"
    Connor: Were you present when the deviants broke in?
    Android: I do not remember.
  OPTION "MEMORY"
    Connor: Has anybody accessed your memory recently?
    Android: Not to my knowledge.
  OPTION "DIAGNOSTIC"
    Connor: Run a diagnostic.
    Android: All systems fully operational.
  OPTION "CONTACT"
    Connor: Have you been in contact with any other androids recently?
    Android: Only station androids in the normal course of my function.
PROMPT 8:
  OPTION "THREATEN"
    Connor: You’re going to be switched off. We're gonna search your memory and tear you apart piece by piece for analy...
  OPTION "DEAL"
    Connor: If you give yourself up, maybe I can convince the humans not to destroy you.
  OPTION "GUILT"
    Connor: Why should you all be destroyed, if only one is deviant? Turn yourself in, or two innocent androids will be...
PROMPT 9:
  OPTION "VIOLENCE"
    Connor: You scumbag! I know it's you! You're just a fucking deviant. Go on, admit it!
  OPTION "BLUFF"
    Connor: The deviants have just been caught… They gave you up. There's no point in lying. We know everything.
  OPTION "TORTURE"
    Connor: Biocomponent #8451... Regulates the heartbeat... Without this module, you will shut down in exactly sixty-t...
  OPTION "PROBE MEMORY"
    CONDITION GROUP:
      IF: Probing the wrong android
        Connor: No memory.
CONDITION GROUP:
  IF: Found the deviant
    CONDITION GROUP:
      IF: Get the biocomponent back and go after the deviant
        PROMPT 10:
          OPTION "ATTACK"
            ARROW PublicOpinion SmallDown (PUBLIC OPINION)
            ARROW SoftwareInstability LargeUp (SOFTWARE INSTABILITY)
            Hank: Connor! Connor, are you okay?
            Connor: I tried to stop it but… I was too late.
          OPTION "SAVE HANK"
            ARROW PublicOpinion SmallDown (PUBLIC OPINION)
            ARROW Hank LargeUp (HANK)
            Hank: Good thing you were here. Otherwise I – Connor… Connor, no…
          OPTION "TAKE GUN"
            ARROW Hank LargeUp (HANK)
            Hank: Nice shot, Connor.
            Connor: I wanted it alive.
      IF: Fail to get the biocomponent
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        ARROW Hank SmallDown (HANK)
  IF: Fail to find the deviant
## On the roof
OBSERVATION [Investigate]:
  CLUE DOOR / Wireless security lock / Recently hacked
  CLUE SHOE PRINTS / Stratford maintenance footwear - standard issue / Recent - Partially covered by snow
  CLUE WEAPONS / .457 Handgun / Stratford Tower Security issue
CONDITION GROUP:
  IF: Simon is dead
    OBSERVATION [Body]:
      CLUE MODEL PL-600 / Serial number : #501 743 923 / Reported missing 2036.16.02
### Analyze bag
CONDITION GROUP:
  IF: Simon was left behind alive in The Stratford Tower
### Find Simon
[UNLOCK LOCK] Simon was left alive on the roof in The Stratford Tower
PROMPT 11:
  OPTION "CHARGE DEVIANT"
    CONDITION GROUP:
      IF: [UNLOCK DEATH] Connor dies rushing Simon
        Hank: Connor! Connor!... Oh Connor… Oh no…
      IF: Connor reaches Simon
        ARROW SoftwareInstability LargeUp (SOFTWARE INSTABILITY)
        Hank: Connor! Connor you all right? Connor!
        Connor: Okay…
  OPTION "STAY IN COVER"
```

### 10.2 Flowchart node labels as the game prints them (`MENU.FLOWCHART.09C.*`)

The table also holds labels for cut or patched-out nodes; presence here does not prove a node is reachable.

```text
START = FALL IN THE ZEN GARDEN
AMANDA = TALK TO AMANDA
STRATFORD = INSIDE STRATFORD TOWER
COIN = HANK CONFISCATES COIN
BRIEFING = LISTEN TO BRIEFING
REINFORCEMENT = TALK TO AMANDA
DEADREINFORCEMENT = ANALYZE GUARD NEXT TO PHONE
DEADSHOOT = ANALYZE ARMED GUARD
SIMONBLOOD = ANALYZE SIMON'S BLUE BLOOD
INVESTIGATEC = INVESTIGATE CORRIDORS
CHECKCAM = CHECK CCTV
PHONE = ANALYZE PHONE
DEADEMPLOYEE = ANALYZE DEAD EMPLOYEE
PERKINS = MEET PERKINS
INVESTIGATEB = INVESTIGATE BROADCAST ROOM
BULLETC = ANALYZE CORRIDOR BULLET HOLES
BULLETR = ANALYZE ROOF ACCESS BULLET HOLES
BULLETS = ANALYZE SCREEN BULLET HOLES
VIDEO = WATCH VIDEO
CAP = ANALYZE CAP
CAMERA = CHECK CAMERA
BLOODWALL = ANALYZE BLUE BLOOD ON WALL
DEADSIMON = ANALYZE DESTROYED ANDROID
BLOODCONSOLE = ANALYZE BLUE BLOOD ON CONSOLE
INVESTIGATER = INVESTIGATE ROOFTOP
FOOTPRINTS = FIND FOOTPRINTS
GOTOROOF = GO TO ROOFTOP
HACKED = ANALYZE DOOR
BAG = ANALYZE BAG
WEAPON = ANALYZE WEAPON
BLUEBLOOD = ANALYZE BLUE BLOOD
MEETCOP = MEET COP FROM HOSTAGE SITUATION
FINDBAG = FIND BAG
FINDSIMON = FIND SIMON
STAYCOVER = STAY IN COVER
RUSH = RUSH DEVIANT
SHOT = SHOT BY SIMON
REACH = REACH SIMON
SIMONKILLED = SIMON IS DESTROYED BY SWAT
CONNORDIED = CONNOR DIED
HANKRUSH = CONNOR DIED RUNNING TOWARD SIMON
JERICHO = CONNOR SAW JERICHO MEMORY
SIMONMEMORY = FLASH FROM SIMON'S MEMORY
SIMONSUICIDE = SIMON SELF-DESTRUCTS
SHOCKED = CONNOR WAS TRAUMATIZED
LEFTSHOCKED = HANK AND CONNOR SURVIVED UNSCATHED
DECIDELEAVE = DECIDE TO LEAVE
LEFTCRIME = CONNOR AND HANK LEFT THE CRIME SCENE
ENTERKITCHEN = ENTER THE KITCHEN
INTERROGATE = INTERROGATE ANDROIDS
NODEVIANT = DEVIANT NOT FOUND
FINDDEVIANT = FIND DEVIANT
DEVIANTATTACK = DEVIANT ATTACKS
TIMEOUT = OUT OF TIME
KNIFE = REMOVE KNIFE
BIOCOMPONENT = RECOVER BIOCOMPONENT
CHASE = CHASE DEVIANT
PROTECTHANK = PROTECT HANK
SHOOT = DRAW GUN
DEVIANTKILLED = SWAT DESTROYS DEVIANT
SAVEDCOPDEADOLD = DEVIANT KILLS COP FROM HOSTAGE SITUATION
HANKSHOCKED = CONNOR SACRIFICED HIMSELF FOR HANK
DEVIANTMEMORY = FLASH FROM DEVIANT'S MEMORY
DEVIANTSUICIDE = DEVIANT SELF-DESTRUCTS
SHOCKEDDEAD = CONNOR AND HANK SURVIVED
CONNORKILLED = DEVIANT SHOOTS CONNOR
DEVIANT = FIND DEVIANT
COPSAFE = RESCUE COP
EVERYONE = MASSACRE PREVENTED
MAGAZINE1ST = READ "BLEEDING BLUE"
MAGAZINE2ND = READ "CLEAN FOOD CRAZE"
SHOOT2 = SHOOT DEVIANT
LOSETIME = LOSE TOO MUCH TIME
DEVIANTKILLED02 = SWAT DESTROYS DEVIANT
SAVEDCOPDEAD2 = DEVIANT KILLS COP FROM HOSTAGE SITUATION
GC.BROADCASTEMPLOYEE = KILLED DURING 'STATFORD TOWER'
GC.PHONEGUARD = KILLED DURING 'STATFORD TOWER'
GC.GUNGUARD = KILLED DURING 'STATFORD TOWER'
GC.SIMONHURTCORRIDOR = WOUNDED DURING 'STATFORD TOWER'
GC.HOSTAGECOP = SAVED DURING 'THE HOSTAGE''
GC.ASSAULT = ATTACKED BY SWAT DURING 'STATFORD TOWER'
GC.SIMONDIEDROOM = DIED IN BROADCAST DURING 'STATFORD TOWER'
GC.SIMONDIEDROOF = DIED ON ROOFTOP DURING 'STATFORD TOWER'
HANKRUSHKITCHEN = CONNOR SHUT DOWN
SAVEDCOPDEAD = DEVIANT KILLS COP FROM HOSTAGE SITUATION
```

### 10.3 Disagreements with sections 1 to 3

Rule (README item 10): the template and string table win for labels, prompts, arrows and clue text; the flowchart image wins for node order; the wiki wins where the template is silent. Template condition wording is transcript tier.

§2 and §3 were built from the compiled form of this template (function `UL`); every prompt, observation and arrow in 10.1 is already in the note. §3 records several wiki-or-PowerPyx arrows the transcript lacks. The template decides them:

1. **`DETERMINED` and `COLD` (Zen Garden round 2): no Amanda arrow.** §3: "small up (wiki, PowerPyx); no icon (transcript)". Template wins: **none** (`COLD` keeps its SI small down).
2. **`TOO FAR` (round 3): no Amanda arrow.** §3: "small down (wiki, PowerPyx); no icon (transcript)". Template wins: **none**.
3. **`SHOT BY SIMON` (Connor dies rushing Simon): no instability arrow.** §3 gives SI small down from the wiki and the Software Instability page. The template's death branch ("Connor dies rushing Simon") carries no `app-relation`, while the template does tag the other death in this chapter (biocomponent failure: SI −1, Hank −1). By the README rule the template wins: **no SI arrow**. Because the wiki states a general rule ("Dying reduces software instability"), the operator should confirm in game.
4. **`PROTECT HANK` / `SAVE HANK`: no instability arrow.** §3 cites the wiki's SI small down ("Connor sacrifices himself to protect Hank"; "No icon in the transcript"). Template wins: **Public Opinion small down and Hank large up only**. Same caveat as item 3.
5. **Corridor `ATTACK`: one Public Opinion arrow, not two.** §3: "small down ×2 (wiki), small down ×1 (transcript)". Template wins: **one small down** (plus SI large up).
6. **`LOSE TOO MUCH TIME` and the cop deaths.** The template has no block for "Lose too much time" and no arrow on any cop death; the PowerPyx-only arrows in §3 (SI large up, Public Opinion small down) have no template or wiki support beyond the Public_Opinion line "(If Connor was present)". Template silent, wiki ambiguous: do not build them; keep §8's open question.
7. **Clue gating in the corridors and broadcast room.** The template lists both `BULLET HOLES` scans, `FRESH BLUE BLOOD` (PL-600) and `CAP` in one unconditioned "Investigate" group, whereas §1 and §2d put the bullet holes behind the SWAT tab and the blood behind the Wounded tab. Gating is the flowchart's (§1 tabs): keep §2's conditions. The clue texts agree word for word.
8. **Clues the template does not render.** `PHONE` ("Attempted call: Central Security", "Call interrupted"), `CARDIAC CELL` ("Biocomponent #845", "Desactivated since 60s") and Markus's `FRESH BLUE BLOOD` ("RK-Series Prototype RK200", "Property of Carl Manfred") in §2c, §2d and §2g are string-table entries without an `app-observation`. Template silent; keep them.
9. **Coin condition.** The template conditions the elevator openings only on "Hank shot / didn't shoot Connor in The Bridge"; §2b and §8 note the wiki's and PowerPyx's Friend requirement. Condition wording is transcript tier, so the wiki's Friend requirement stands until the operator checks.

Agreements (no action): round 1 `HANK` (two variants, no arrow) and `EDEN CLUB` (not found Amanda −1, let go Amanda −1, died Amanda +1); round 2 `SINCERE` (lock "Spared the Tracis", Amanda −1), `TROUBLED` (SI +1, Amanda −1); round 3 only when the Tracis were spared, `TRUTH` Amanda −2; round 4 `CONFLICTED` SI +1, `CONFIDENT` Amanda +1, `INDIFFERENT` SI −1 Amanda +2; the briefing variants (guards, employee, Simon); body clues `THOMPSON, EVAN`, `CHEDD, SEAN` (left guard), `FRESH BLOOD` and `ROBERT, CHRIS` (right guard); broadcast `OPTICAL UNIT`, `PUPIL REFLECTION`, `RK-SERIES PROTOTYPE RK200`; the cop from The Hostage (lock, three death variants); `YES` / `NO` with the time unlock; the four kitchen rounds (`FUNCTION` / `MODEL`; `WITNESS` / `MEMORY` / `DIAGNOSTIC` / `CONTACT`; `THREATEN` / `DEAL` / `GUILT`; `VIOLENCE` / `BLUFF` / `TORTURE` / `PROBE MEMORY`), none with an arrow; corridor `TAKE GUN` Hank +2; "Fail to get the biocomponent" SI −1 Hank −1; roof clues `DOOR`, `SHOE PRINTS`, `WEAPONS`, Simon's body `MODEL PL-600`; `FIND SIMON` lock "Simon was left alive on the roof"; `CHARGE DEVIANT` / `STAY IN COVER`, with "Connor reaches Simon" SI +2. No cut content in this template.

### 10.4 Disagreements with the benchmark (story.json 1.6.0: R24, C14, C14b, C15, C16)

Engine sizes are read as ±1 = small arrow, ±2 = large arrow.

1. **Zen Garden missing.** PROMPT 1 (`HANK` / `EDEN CLUB`), PROMPT 2 (`SINCERE` locked / `DETERMINED` / `COLD` / `TROUBLED`), PROMPT 3 (`TOO FAR` / `NO USE` / `TRUTH`, only if the Tracis were spared) and PROMPT 4 (`CONFLICTED` / `CONFIDENT` / `INDIFFERENT`) have no scene. Their arrows (Amanda ±1/±2 on six answers, SI ±1 on four) are not applied.
2. **Observations not offered.** None of the template's 15 clue texts (Investigate 4, three body groups, Analyze 3, roof 3, Simon's body 1) is presented; C14's situation summarises them.
3. **C14 conflates PROMPT 5 with the free-roam route.** Option 2 "Do neither; let the federal agents take over" stands for `YES` (leave) and applies `amanda(-1)`; the template has no arrow on `YES` / `NO`. Remove the Amanda change and use the labels.
4. **C14b labels and extra arrows.** "Rush him and probe his memory" / "Stay in cover and let the tactical team take him" stand for `CHARGE DEVIANT` / `STAY IN COVER`. Success applies `si(2)` (matches) and `amanda(2)` (no template arrow). Failure calls `connorDies`: `si(-1)` (not in the template, see 10.3 item 3), `hank(-1)` (the wiki's small down belongs to the start of Meet Kamski, not here) and `amanda(-1)` (no source).
5. **Kitchen collapsed.** C15 offers three paraphrases of round 4 ("Bluff", "physical intimidation and pain", "probe his memory" for `BLUFF`, `TORTURE`, `PROBE MEMORY`). Missing: rounds 1 to 3 (9 options), `VIOLENCE`, the choice of which android to question, the CHECK CAMERA gate, and the DEVIANT NOT FOUND branch (C15 always finds the deviant).
6. **Biocomponent failure missing.** "Fail to get the biocomponent" (CONNOR SHUT DOWN; SI −1, Hank −1) has no counterpart; C16's situation says the regulator was always recovered in time.
7. **C16 labels.** "Shield Hank with your body" / "Grab the pistol and shoot the deviant" / "Charge him bare-handed" stand for `SAVE HANK` / `TAKE GUN` / `ATTACK`.
8. **C16 `SAVE HANK` arrows.** Engine: `hank(2)`, then `connorDies` (`si(-1)`, `hank(-1)`, `amanda(-1)`), so Hank nets +1. Template: Hank +2 and Public Opinion −1; no SI or Amanda arrow. Public Opinion −1 is missing; the SI, Hank −1 and Amanda changes are extra.
9. **C16 `TAKE GUN` has a failure and an Amanda arrow.** Option 1 carries risk 0.15 with a death on failure, and success applies `amanda(1)`. The template (and §2h, "Draw Gun always succeeds") has no failure branch and only Hank +2.
10. **C16 `ATTACK` has a failure.** Option 2 carries risk 0.3 with a death on failure. The template's `ATTACK` always ends with the deviant's suicide and Connor alive; its arrows (Public Opinion −1, SI +2) match the engine's success branch.
11. **Cop from The Hostage not consulted.** The template's lock "Saved the wounded cop in The Hostage" (and the DEVIANT KILLS COP / RESCUE COP nodes) depends on `C03` in The Hostage; no scene in this chapter reads it.

C14 option 0 (roof) correctly requires Simon left alive on the roof, as the template's `FIND SIMON` lock does. C14b `STAY IN COVER` applies nothing, which matches the template. C15 applies no arrow, which matches the template's kitchen rounds.
