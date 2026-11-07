# Chapter 20: The Eden Club (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots and walkthrough text, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, magazine, character and later-chapter pages, the GamerGuides walkthrough (for conflicts only), and the fan transcript at detroitbecometext.github.io (chapter 20). The fan transcript's text was read from its `i18n/en.json` and the compiled chapter template (function `XL` in `chunk-JCLJBPDO.js`), rendered with a small script that resolves each translation key; the same files were used for The Bridge (`KL`, chapter 22), Public Enemy (`UL`, chapter 24) and Last Chance, Connor (`GL`, chapter 29). Working files are in `/tmp/flowcharts/ch20/` (`transcript.txt`, `x_KL.txt`, `x_UL.txt`, `x_GL.txt`, `strings.txt`, `wikipages/`, not committed). The wiki has no `The_Eden_Club/Flowchart` and no `The_Eden_Club_(Transcript)` page (both `missingtitle`).

Game date and time on the wiki infobox and in the transcript: November 6, 2038, 08:17PM (`GUI.MENU.TIME.06C2 = PM 08:17`). Location: Eden Club, 1177 Woodward Av. (Eden Club page). Objectives (infobox): "Follow Hank", "Investigate crime scene", "Find second android", "Find blue haired deviant". Wiki: "This chapter has five different outcomes." (`|endings=5`). PowerPyx: "Triggers automatically after completing the Spare Parts Chapter." The game's internal chapter ID is `06CB` (Russian Roulette is `06CA`); dialogue keys are `X0603C.*`, HUD keys `THOUGHTS.0601C.*`.

Summary: 37 chart nodes plus 2 bracketed phase labels (`SEARCH FOR CLUES`, `SEARCH FOR BLUE HAIRED DEVIANT`). 3 checkpoints (`INVESTIGATE EDEN CLUB`, `LEAVE CRIME SCENE`, `ENTER THE WAREHOUSE`). 5 ending cards with 4 distinct labels: `MISSION FAILED` (two cards, no icon), `DEVIANTS DIED` (lock), `DEVIANTS ESCAPED` (lock), `CONNOR SHOT DEVIANTS` (lock). On the chart the player makes three choices: `AGGRESSIVE APPROACH` / `CALM APPROACH`, which is derived from the interview answers; `SHOOT DEVIANT` / `SPARE DEVIANT`; and `LET DEVIANTS GO` / `SHOOT DEVIANTS IN THE BACK`. Two more groups use the choice marker but are decided by performance: `PURSUE DEVIANT` / `ANDROIDS' MEMORIES ARE RESET`, and `WIN FIGHT` / `LOSE FIGHT`. Off the chart there are four interview rounds with the damaged Traci, which has a shutdown timer, plus three idle timeouts with a give-up prompt, the Traci-rental memory chain and QTE choices in the fight. Connor cannot die in this chapter: there is no skull on the chart and no death line in the transcript. A badly beaten Connor loses the fight instead. No probabilities are published. The stated stat changes are Hank large up or down and instability large up or down for spare or shoot, and Hank small down for any timeout failure. Public opinion does not change. The Tracis' fate carries into The Bridge, Public Enemy, Last Chance, Connor, Crossroads and Night of the Soul.

---

## 1. Flowchart transcription

Read from `detroit-become-human-the-eden-club-flowchart-100.jpg` (whole chart), `-2.jpg` (start and `SEARCH FOR CLUES`), `-3.jpg` (repair, talk, approach, `LEAVE CRIME SCENE`), `-4.jpg` (eyewitness, give up, pursue, `ENTER THE WAREHOUSE`, first `MISSION FAILED`), `-5.jpg` (warehouse bracket, second `MISSION FAILED`, `DEVIANTS ATTACK`, fight outcome), `-6.jpg` (shoot/spare pairs and the three Traci endings), with crops in `crops/`. Every node label matches the game's own flowchart string table (`MENU.FLOWCHART.06CB.*` in the transcript's `en.json`).

Chart header (PowerPyx run): `100% COMPLETED` / `THE EDEN CLUB`. No world stats panel is visible.

Icon key (as drawn, same conventions as the ch15 note): [arrow] = action, [speech] = dialogue, [triangle] = event the game triggers, [choice] = the overlapping-squares choice marker, [lock] = yellow tab with an open padlock (cross-chapter impact), [check]/[cross] = success/failure marks. Blue fill = reached on the photographed save. Reached: `INVESTIGATE EDEN CLUB`, `FOLLOW HANK`, `ON CRIME SCENE`, `LISTEN TO BRIEFING`, `INVESTIGATE VICTIM`, `INVESTIGATE ANDROID`, `REPAIR ANDROID`, `TALK TO ANDROID`, `CALM APPROACH`, `LEAVE CRIME SCENE`, `FIND AN ANDROID EYEWITNESS`, `ASK HANK TO HELP`, `PURSUE DEVIANT`, `ENTER THE WAREHOUSE`, `ANALYZE BLUE BLOOD`, `INVESTIGATE BLUE HAIRED DEVIANT`, `DEVIANTS ATTACK`, `LOSE FIGHT`, `LET DEVIANTS GO`, `DEVIANTS ESCAPED`. Everything else is grey.

### Crime scene

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `INVESTIGATE EDEN CLUB` | checkpoint (large card, club sign image, "CHECKPOINT") | chapter start |
| 2 | `FOLLOW HANK` | [arrow] | #1 |
| 3 | `ON CRIME SCENE` | [arrow] | #2 |
| 4 | `LISTEN TO BRIEFING` | [arrow] | #3 |
| - | `SEARCH FOR CLUES` | bracketed phase label (not a node) | encloses #5 and #6; entered from #4 |
| 5 | `INVESTIGATE VICTIM` | [arrow] | top connector of the bracket |
| 6 | `INVESTIGATE ANDROID` | [arrow] | bottom connector of the bracket |
| 7 | `REPAIR ANDROID` | [arrow] | out of the bracket's right side |
| 8 | `TALK TO ANDROID` | [speech] | #7 |
| 9 | `AGGRESSIVE APPROACH` | [choice] option 1 | #8 |
| 10 | `CALM APPROACH` | [choice] option 2 | #8 |
| 11 | `LEAVE CRIME SCENE` | checkpoint (large card, Hank and Connor image) | #9 or #10 |

### Tracking the deviant

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 12 | `FIND AN ANDROID EYEWITNESS` | [arrow] | #11, upper branch |
| 13 | `GIVE UP` | [arrow] | #11, lower branch; line runs to #17 |
| 14 | `ASK HANK TO HELP` | [speech] | #12 |
| 15 | `PURSUE DEVIANT` | [choice] group, row 1 | #14 |
| 16 | `ANDROIDS' MEMORIES ARE RESET` | [choice] group, row 2 | #14; line runs to #17 |
| 17 | `MISSION FAILED` | ending (large card, club hallway image, no icon) | #13 and #16 (two lines join) |
| 18 | `ENTER THE WAREHOUSE` | checkpoint (large card, warehouse stairs image, "LOAD CHECKPOINT") | #15 |

### The warehouse

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| - | `SEARCH FOR BLUE HAIRED DEVIANT` | bracketed phase label (not a node) | encloses #19 to #24; entered from #18 |
| 19 | `READ "FIRST IMMORTAL"` | [arrow] | bracket, upper (magazine) |
| 20 | `ANALYZE BLUE BLOOD` | [arrow] | bracket, upper |
| 21 | `INVESTIGATE ANDROID STOCK` | [arrow] | bracket, upper |
| 22 | `GIVE UP` | [triangle] | bracket, lower; line runs to #25 |
| 23 | `FIND RA9 SYMBOL` | [arrow] | bracket, lower |
| 24 | `READ "NEW SUPERPOWERS"` | [arrow] | bracket, lower (magazine) |
| 25 | `MISSION FAILED` | ending (large card, warehouse stair image, no icon) | #22 |
| 26 | `INVESTIGATE BLUE HAIRED DEVIANT` | [arrow] | out of the bracket's right side |
| 27 | `DEVIANTS ATTACK` | [triangle] | #26 |

### The fight and its endings

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 28 | `WIN FIGHT` | [choice] group, row 1, [check] | #27 |
| 29 | `LOSE FIGHT` | [choice] group, row 2, [cross] | #27 |
| 30 | `SHOOT DEVIANT` | [choice] option 1 | #28 |
| 31 | `SPARE DEVIANT` | [choice] option 2 | #28 |
| 32 | `LET DEVIANTS GO` | [choice] option 1 | #29 |
| 33 | `SHOOT DEVIANTS IN THE BACK` | [choice] option 2 | #29 |
| 34 | `DEVIANT KILLS HERSELF WITH CONNOR'S GUN` | [triangle] | #30 |
| 35 | `DEVIANTS DIED` | ending (large card), [lock] | #34 |
| 36 | `DEVIANTS ESCAPED` | ending (large card), [lock] | #31 and #32 (two lines join) |
| 37 | `CONNOR SHOT DEVIANTS` | ending (large card), [lock] | #33 |

Total: 37 nodes (excluding the two bracket labels). `MISSION FAILED` appears on two separate cards.

The two `GIVE UP` nodes carry different icons: an arrow after `LEAVE CRIME SCENE` and a triangle in the warehouse. Both use the string `MENU.FLOWCHART.06CB.ABANDON = GIVE UP`.

Unused flowchart strings in the game files, not drawn on the chart: `ANALYZE BLOOD` (`06CB.BLOOD`, the crime-scene blood sample), `OUT OF TIME` (`06CB.TIME`), and `DEVIANT JUSTIFIES KILLING` (`06CB.EXPLAIN` and `06CB.EXPLAIN2`).

Wording differences on the wiki's text flowchart: "Read *First Immortals*" (chart: `READ "FIRST IMMORTAL"`), "Read *New Superpowers*" (same), "Android's Memories Are Reset" (chart: `ANDROIDS' MEMORIES ARE RESET`), "Win Fight{{Icon|success}}" / "Lose Fight{{Icon|failure}}" (check/cross). The wiki marks all three Traci endings `{{Icon|impact}}`, which agrees with the lock tabs. The wiki lists the warehouse `Give Up` under "Search For Blue Haired Deviant", as the chart does.

---

## 2. Choices and gates

### 2a. Arrival and the crime scene (nodes 1 to 6)

Linear. PowerPyx: "The start of the chapter is completely linear, consisting only of unmissable story tasks. Simply follow after Hank to get them all." GamerGuides agrees.

- Intro in the car (cutscene). Hank: "Aw… Feels like somebody's playing with a drill inside my skull… You sure this is the place?" Connor: "It's the address in the report." Hank: "Right... Okay... Let's get going. Jesus… Sexiest androids in town… Now I know why you insisted on coming here! Oh, boy…" (Wiki Connor page: "Connor drives Hank's car to the Eden Club since he is still hungover.")
- Optional: looking at the display androids for too long. Hank: "Connor! The fuck are you doin'?" Connor: "Coming, Lieutenant." (wiki Notes, PowerPyx comments). No stat icon.
- `LISTEN TO BRIEFING`: Floyd Mills (manager): "You're not gonna take my license, are you?..." Ben Collins: "It's that room there. Oh, uh, by the way… Gavin's in there too." Hank: "A dead body and an asshole, just what I needed…"
- `ON CRIME SCENE`: Gavin: "Lieutenant Anderson and his plastic pet… The fuck are you two doin' here?" Connor: "We've been assigned all cases involving androids." Gavin: "...Just some pervert who, uh, got more action than he could handle." Hank: "We'll have a look anyway, if you don't mind." Gavin leaves ("starting to stink of booze in here"); Chris: "Night, Lieutenant."
- `INVESTIGATE VICTIM`: scans `GRAHAM, MICHAEL` ("Height: 6' 2'' - Weight: 192.4 lbs", "Estimated time of death: 06:24 pm"); `SEVERE BRUISING` ("Signs of strangulation", "Cause of death: Asphyxiation"); `CARDIAC ARREST` ("No sign of cardiac event", "Heart attack not cause of death"). HUD `VICTIM WAS STRANGLED`.
- Blood sample (no chart node; unused string `ANALYZE BLOOD`): `BLUE BLOOD` "MODEL WR400", "Serial number #429 671 942". Hank: "Argh, Connor, you're so disgusting… Think I'm gonna puke again…"
- Optional Hank line on the wallet: "Driver's license says: Michael Graham... Picture of his wife and two daughters… I wouldn't want to make that call…" (wiki Notes: "If you wait around a while, Hank can learn that the victim had a wife and two daughters.")
- `INVESTIGATE ANDROID`: the damaged Traci. Scans `DIAGNOSIS IN PROGRESS...` ("Selector #5402 out of order", "Biocomponent #6970 out of order") and `CARDIAC CELL` ("Status: Critically damaged", "Probable cause: Blunt force trauma"). HUD `REACTIVATION REQUIRED`.
- Reconstruction dialogue. Connor: "He didn't die of a heart attack, he was strangled." Hank: "...Could've been rough play… Think you can read the android's memory?"

### 2b. Repair and interview (nodes 7 to 10)

`REPAIR ANDROID` (action "Turn On"; HUD `ANDROID RESTARTED`). Connor: "It's badly damaged… If I can, it'll only be for a minute, maybe less…" A shutdown timer runs (HUD `TIME BEFORE SHUTDOWN`, stages `BLUE BLOOD LEAKING`, `CRITICAL LEAK`, `IMMINENT SHUTDOWN`). GamerGuides: "continue to talk to her until she shuts down again." Wiki (WR400 #429 671 942 page): "After less than two minutes, the Traci suffered a critical leak of blue blood resulting in a shutdown."

`TALK TO ANDROID`, four rounds. No option carries a relationship or instability icon (transcript, wiki).

Round 1 (opening):

| Option | Line |
|---|---|
| `EXPLAIN` | "You were damaged and I reactivated you. Everything is all right." |
| `DIRECT` | "I'm going to ask you some questions. Are you able to speak?" |
| `SOOTHE` | "Calm down... everything's all right. All we want is to know what happened." |

Traci: "Is he… is he dead?.."

Round 2:

| Option | Line |
|---|---|
| `MURDERER` | "Did you kill him?" Traci: "No… no, it wasn't me…" |
| `FACTS` | "Tell me what happened." Traci: "He... he started... hitting me… again... and again. I begged him to stop, but he wouldn't. It was like he was enjoying it…" |
| `VICTIM` | unused content: "Do you know this man?" Traci: "No, this was the first time…" |

Round 3:

| Option | Line |
|---|---|
| `MURDERER` | "Who killed that man if it wasn't you?" Traci: "I… I don't know, I was in shutdown... I didn't see anything…" |
| `PRESSURE` | "What else do you remember? Hurry, we don't have much time!" Traci: "...What do you mean we don't have much time?.." |
| `ALONE` | "Were you alone in the room? Was there anyone else with you?" Traci: "He wanted to play with two girls… That's what he said, there were two of us…" |

Round 4 (Connor's lines only; the Traci shuts down):

| Option | Line |
|---|---|
| `KILLER` | "So it was the other android that strangled him, is that it?" |
| `WHAT MODEL` | "What model was the other android? Did it look like you?" |
| `OTHER ANDROID` | "Where did the other android go? Did it say anything?" |

Then Hank: "So, there was another android… This happened over an hour ago, it's probably long gone…" Connor: "It couldn't go outside dressed like that unnoticed… It might still be here." Hank: "...Maybe an eyewitness? Somebody who saw it leaving the room… I'm gonna go ask the manager a few questions." Objective `FIND SECOND ANDROID`.

Approach nodes: PowerPyx maps `DIRECT` to `AGGRESSIVE APPROACH` and `SOOTHE` to `CALM APPROACH`. Commenters add that `EXPLAIN` is a third opener, and that picking `MURDERER` ("and quite possibly `PRESSURE` as well") gives `AGGRESSIVE APPROACH` even after `SOOTHE`. Neither approach has a stated effect beyond the chart node.

### 2c. Leave the crime scene: the first timeout (nodes 11 to 13, 17)

Off-chart Hank conversations happen while Connor searches. With Floyd ("We lost a model 2-3 months back... Just vanished"; the wiki says this is North), Hank ends: "Yeah, the more I learn about people, more I love my dog." With Ben, Hank asks for painkillers.

Timeout (transcript "Take too much time"; PowerPyx: "stand still for about 3 minutes and the mission fails automatically"). Hank: "I gotta go… I feel like shit... I don't wanna puke in this fine establishment…" Choice:

| Option | Effect | Leads to |
|---|---|---|
| `CONTINUE` | Connor: "The deviant didn't just disappear... Just, give me one more minute, ok?" Hank: "Alright. Be quick about it or it might get ugly." If time runs out again, Connor gives up automatically (same lines as GIVE UP), Hank small down | search continues, or `GIVE UP` |
| `GIVE UP` | Connor: "We're wasting our time. You're right, the deviant's probably gone now." Hank: "Let's get outta here. This place makes me sick..." Hank small down | `GIVE UP`, then `MISSION FAILED` |

The wiki Notes also describe this exchange: "Hank will want to leave due to feeling very sick. Connor will ask for one more minute".

### 2d. The eyewitness and the rental chain (nodes 12, 14 to 16, 18)

`FIND AN ANDROID EYEWITNESS`: the Traci in the display booth facing the crime-scene door (PowerPyx: "On the opposite side to the crime scene entrance there's a sex robot behind some glass"). The panel answers "No fingerprint detected. Please try again." (HUD `NEED HUMAN FINGERPRINTS`, `NEED HUMAN TO ACCESS ANDROID`).

`ASK HANK TO HELP`. Connor: "Can you rent this Traci?" Hank: "For fuck's sake, Connor, we got better things to do…" Connor: "Please, Lieutenant! Just trust me." Machine: "Hello. A 30 minute session costs $29.99. Please confirm your purchase." Hank: "This is not gonna look good on my expense account…" Connor probes the Traci's memory (HUD tutorial `USE L2 OR R2 TO REVIEW THE VIDEO MEMORY`). Connor: "It saw something... A blue-haired Traci. Club policy is to wipe the androids' memory every two hours. We only have a few minutes if we wanna find another witness!" Then Hank's embarrassed refusal of the rented Traci: "Sorry, honey, changed my mind!... I'm with him and... I mean, not with him like that..." No stat icon.

`PURSUE DEVIANT` is a free search: Connor scans the Traci's last position (HUD `HOLD R2 TO SCAN DEVIANT LAST POSITION`, `LAST POSITION`), picks the next display android on its path, and has Hank rent it. HUD conclusions in string order: `A BLUE HAIRED TRACI HEADED TOWARD THE ENTRANCE`, `IT HEADED TOWARD THE ENTRANCE`, `IT TURNED BACK INTO THE CLUB`, `IT TURNED TO THE RED ROOM`, `IT TURNED TO THE BLUE ROOM`, `IT HID IN A ROOM`, `IT LEFT THE ROOM`, `IT FLED THROUGH THE STAFF DOOR`. A wrong pick gives `SUSPECT OUT OF SIGHT CHECK ANOTHER ANDROID` and lines such as Connor: "No… I lost its track again...", Hank: "I've spent all this money and I'm still not havin' fun…", "This has gotta be the most expensive investigation of my career!", "We'll never have time to check 'em all!", Connor: "Lieutenant, if you have a better idea, I'm all ears." These have no stat icon. One reader's working sequence (PowerPyx comment): "pod 9, front dancer, pod 17, pod 25 (red room), pod 23 (blue room), private room, custodian". PowerPyx: "The last clue is from the cleaning android. Then you discover 'staff only' door that leads through a long brick tunnel to the warehouse." The wiki Notes add: "Connor can probe two different androids that will lead to the same clue."

Outcomes:

| Chart node | Cause | Effect | Leads to |
|---|---|---|---|
| `PURSUE DEVIANT` | reaching the staff door before the reset. Connor: "I know where it went! Follow me!" | none | `ENTER THE WAREHOUSE` |
| `ANDROIDS' MEMORIES ARE RESET` | the memory-wipe clock runs out (transcript "Take too much time"). Connor: "It's too late… The androids' memory have been reset... It's my fault. I should have been faster." Hank: "...For a second there, I thought you were gonna make yourself useful. Let's get outta here." | Hank small down | `MISSION FAILED` |

The transcript shows no choice on the memory reset. PowerPyx says "When Hank wants to leave agree to give up", which may run the reset and the section 2c prompt together; see Open questions.

### 2e. The warehouse (nodes 18 to 27)

`ENTER THE WAREHOUSE`. Hank: "Wait! I'll take it from here." Then, looking at the open door, "Shit… We're too late…" (wiki: "Hank assumes from the open loading bay door that the culprit had fled"). He continues: "Christ, look at them… They get used till they break, then they get tossed out…" and "People are fucking insane… everybody would rather buy a piece of plastic than love another human being…" HUD `SEARCH WAREHOUSE`, `FIND BLUE HAIRED DEVIANT`, `SEARCH FOR BLUE BLOOD TRAIL`.

| Item | Chart node | Text / effect |
|---|---|---|
| Deactivated androids at the bottom of the stairs | `INVESTIGATE ANDROID STOCK` | wiki Notes: "requires Connor to look at a few different stocks that don't have the Blue-Haired Traci" |
| Blue blood on the right side | `ANALYZE BLUE BLOOD` | Connor tastes it. A second blood scan string exists, `MENU.OBSERVATION.06C.MP.BLUEBLOOD.2.SUBLINE02 = Serial number #354 411 057` (placement inferred) |
| Red graffiti by the magazine box | `FIND RA9 SYMBOL` | HUD `RA9 REFERENCE` |
| Magazines on a box at the back | `READ "FIRST IMMORTAL"`, `READ "NEW SUPERPOWERS"` | see Media |
| The stack of Tracis in the corner | `INVESTIGATE BLUE HAIRED DEVIANT` | two of them have yellow LEDs; this triggers the fight. PowerPyx: "if you interact with the stack of Tracis in the corner of the room it will skip ahead to the next section. You may want to keep this clue for last." |

Gate on `INVESTIGATE BLUE HAIRED DEVIANT`: PowerPyx and GamerGuides say "you must first have analyzed the blue blood". A commenter (sloth) says the corner always triggers the fight "whether you examine the blue blood or not". See Open questions.

Warehouse timeout (`GIVE UP`, triangle). Hank: "Come on, Connor! We're leaving." Prompt `LEAVE` (`X0603C.FINAL.GAMEOVERS.PC.CHOICEGROUP.LEAVE`). Connor: "Yes, I'm coming... I failed. I should have caught it…" Hank: "Let's get outta here. This place makes me sick…" Hank small down. Then the second `MISSION FAILED`. The wiki Notes say: "If you wait a while, Hank will ask to leave and Connor will angrily say that he's coming. This will give him the option to leave, which then will fail the mission."

### 2f. The fight (nodes 27 to 29)

`DEVIANTS ATTACK`. The brown-haired Traci attacks Connor and the blue-haired one fights Hank. Hank: "DON'T MOVE!" then "QUICK! THEY'RE GETTING AWAY!" The fight runs through the storage room and out into the fenced alley. It is a QTE sequence with some branching prompts (wiki Notes): "knock over the left shelf or pull the right shelf" (no input: Connor "will reach for a shelf but fail to grab it"), and "kick a chair or throw a Traci" (no input: "he'll simply just rush the Brown-Haired Traci"). Injuries: "bruises, a cut on the chest, a slit hand, and two screwdriver wounds on the shoulders", a kick to the groin, a toolkit, a pipe, being slammed into a wall, and a trash can.

| Chart node | Cause | Leads to |
|---|---|---|
| `WIN FIGHT` [check] | most QTEs passed (PowerPyx: "Press all button prompts (or at least most of them)") | `SHOOT DEVIANT` / `SPARE DEVIANT` |
| `LOSE FIGHT` [cross] | wiki: "If Connor is badly wounded before falling out of the storage room, Connor will lose the fight early. Alternatively, if he fails all QTEs in the alleyway, he will lose in the same way." | `LET DEVIANTS GO` / `SHOOT DEVIANTS IN THE BACK` |

Connor cannot die here. There is no death node or skull on the chart and no death line in the transcript, and the wiki's worst outcome is "Connor defeated and badly damaged".

### 2g. Shoot or spare (nodes 30 to 37)

After `WIN FIGHT` Connor has a gun (the wiki says Hank's; the chart node says "CONNOR'S GUN") and the brown-haired Traci runs at him. The prompt is timed.

| Option (button) | Effect | Leads to |
|---|---|---|
| `SHOOT` (chart `SHOOT DEVIANT`; PowerPyx circle) | Connor shoots the brown-haired Traci. Blue-haired Traci: "Why?.. Why did you kill her?.. She had nothing to do with any of this… When that man killed that Traci... I knew I was next… So I put my hands around his throat, and I squeezed... until he stopped moving… Yes, I killed him… but I was just defending myself… I wanted to get back to the one I love… But you've... You've taken her away from me… I love her… I loved her!" She takes the gun and shoots herself. Hank: "My God…" Instability large down, Hank large down | `DEVIANT KILLS HERSELF WITH CONNOR'S GUN`, `DEVIANTS DIED` |
| `SPARE` (chart `SPARE DEVIANT`; PowerPyx cross) | The brown-haired Traci knocks him down. Blue-haired Traci: "When that man broke the other Traci... I knew I was next… I didn't mean to kill him… I just wanted to stay alive… get back to the one I love..." Brown-haired: "Come on, let's go." They climb the fence. Hank: "It's probably better this way…" Instability large up, Hank large up | `DEVIANTS ESCAPED` |
| (no input) | wiki: "he'll just stand there for a few seconds. However, the rest plays the same." Which branch "the rest" means is not stated | see Open questions |

After `LOSE FIGHT` the Tracis stop, the blue-haired Traci gives the same `FAILEND` speech, and both start up the fence. Connor picks up Hank's gun.

| Option (button) | Effect | Leads to |
|---|---|---|
| `SHOOT` (chart `SHOOT DEVIANTS IN THE BACK`) | Both fall from the fence. Hank: "Congratulations, Connor… You got 'em…" Instability large down, Hank large down | `CONNOR SHOT DEVIANTS` |
| `SPARE` (chart `LET DEVIANTS GO`) | They escape. Hank: "It's probably better this way…" Instability large up, Hank large up | `DEVIANTS ESCAPED` |
| (no input) | wiki: "he'll similarly just stand for a few seconds as they leave" (blue-haired page: "The Tracis escape if Connor hesitates to shoot") | presumably `DEVIANTS ESCAPED`; stat effect unconfirmed |

There is no Hank conversation after the fight in this chapter. The chapter ends on Hank's one line. The talk about the Tracis happens two Connor chapters later, in The Bridge (section 4).

---

## 3. Numbers

No probability is published anywhere for this chapter: not on the wiki, PowerPyx, GamerGuides or in the game strings. All stat changes are direction and size only.

### Timers and in-world figures

| Item | Figure | Source |
|---|---|---|
| Damaged Traci's runtime after repair | "a minute, maybe less" (Connor); "less than two minutes" (wiki) | `X0603C.CRIMESCENE.TURNON.FA.X06CCONNOR.MOVIE`; WR400 #429 671 942 page. HUD `TIME BEFORE SHUTDOWN` with three stages |
| Idle time before Hank wants to leave (crime scene) | about 3 minutes | PowerPyx: "stand still for about 3 minutes and the mission fails automatically" |
| `CONTINUE` extension | "one more minute" | Connor: "Just, give me one more minute, ok?" |
| Memory-wipe deadline during the pursuit | "a few minutes"; PowerPyx "just wait 3 minutes" | Connor: "Club policy is to wipe the androids' memory every two hours. We only have a few minutes"; Eden Club page: "this club's policy is to reset all Tracis' memory every two hours" |
| Warehouse timeout | not stated | wiki Notes "If you wait a while" |
| Shoot/spare windows | timed, duration not stated | wiki Notes on no-input outcomes |
| Rental price | $29.99 per 30-minute session | `X0603C.VOICE.EDENCLUB.VO.MANORA.BOX1.1` |
| Time of death vs arrival | 06:24 pm vs 08:17 PM | victim scan; chapter clock ("This happened over an hour ago") |

### Hank relationship

| Moment | Change | Source line |
|---|---|---|
| `GIVE UP` at the crime-scene timeout (or second timeout after `CONTINUE`) | small down | transcript `app-relation Hank SmallDown` on both; The Eden Club: "Failing to locate the [[Traci]]s {{Icon\|down}}"; Relationship Stat: "Failing to locate the Tracis in The Eden Club." |
| `ANDROIDS' MEMORIES ARE RESET` | small down | transcript `Hank SmallDown` under "search-connect-timeout"; same wiki line |
| Warehouse `GIVE UP` | small down | transcript `Hank SmallDown` under "warehouse-timeout"; same wiki line |
| `SPARE DEVIANT` / `LET DEVIANTS GO` | large up | The Eden Club: "Sparing the Tracis {{Icon\|largeup}}"; transcript `Hank LargeUp` on both SPARE buttons; PowerPyx "Hank ▲▲▲" on both |
| `SHOOT DEVIANT` / `SHOOT DEVIANTS IN THE BACK` | large down | The Eden Club: "Shooting the Tracis {{Icon\|largedown}}"; transcript `Hank LargeDown` on both SHOOT buttons; PowerPyx "Hank▼▼▼" on both |
| Interview answers, approach, rentals, CONTINUE | none | no icon in transcript or wiki |
| Shoot/spare with no input | not stated | - |

### Software instability

| Moment | Change | Source line |
|---|---|---|
| `SPARE DEVIANT` / `LET DEVIANTS GO` | large up | The Eden Club: "Sparing the Tracis {{Icon\|largeup}}"; Software Instability: "Choosing to spare the Tracis at the end of The Eden Club."; transcript `SoftwareInstability LargeUp` on both |
| `SHOOT DEVIANT` / `SHOOT DEVIANTS IN THE BACK` | large down | The Eden Club: "Shooting the Tracis {{Icon\|largedown}}"; Software Instability: "Choosing to shoot the Tracis at the end of The Eden Club."; transcript `SoftwareInstability LargeDown` on both |
| Timeout failures | none | no icon |

### Public opinion

None. The Public Opinion page has no Eden Club entry. Neither magazine has an effect.

### Choices with no stated number

All interview options, the approach, every rental pick, `CONTINUE`, the warehouse clues, the fight QTE prompts, and the no-input outcomes of the two shoot/spare prompts have no stated number. No fight success rate exists. Winning or losing depends on QTE performance.

---

## 4. Cross-chapter dependencies

### Into this chapter

None stated. The transcript template for chapter 20 has no condition that refers to an earlier chapter. Its only conditions are "Take too much time" (three times) and "Win the fight" / "Lose the fight". The wiki page lists no inbound gates. Context only:

| Earlier state | Effect here | Source |
|---|---|---|
| Russian Roulette ends `LEFT FOR EDEN CLUB` | this chapter follows for Connor. Hank is hungover ("drill inside my skull", "Think I'm gonna puke again", asks Ben for painkillers) | ch18 note; transcript |
| Waiting for Hank... (Floyd Mills's missing-Traci report) | Floyd tells Hank "We lost a model 2-3 months back"; the wiki says this is North | wiki Notes; Eden Club page |
| Hank relationship so far | no gate in this chapter, but the large up/down here often decides the Hostile threshold for The Bridge | Relationship Stat |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| Any Traci ending vs `MISSION FAILED` | The Bridge (chapter 22), first topic. If found: Hank: "Those two girls… They just wanted to be together… They really seemed in love…" with options `RATIONAL` / `DEVIANTS` / `IRONIC` / `COLD` (COLD: Hank small down, instability small down). If "Took too much time": Hank: "I wish we'd have found that girl that killed that guy… Maybe she was just defending herself…" with `COLD` (Hank small down, instability small down) / `IRONIC` / `RATIONAL` | transcript `KL` (chapter 22); The Bridge: "Picking "Cold" when Hank talks about the Tracis from The Eden Club {{Icon\|down}}" |
| `DEVIANTS ESCAPED` (spared) | The Bridge, second topic. Hank: "You could've shot those two girls, but you didn't. Why didn't you shoot, Connor?" `LIE` ("I would've shot them if I could.") Hank small down; `TRUTH` ("No… I just decided not to shoot, that's all…") Hank small up, instability small up | transcript `KL`; The Bridge: "Picking "Truth"... {{Icon\|up}} x2", "Picking "Lie"... {{Icon\|down}}"; Software Instability: "Choosing "truth" when Hank asks Connor why he didn't shoot the Tracis" |
| `DEVIANTS DIED` (shot one) | The Bridge. Hank: "Did you feel anything when that girl killed herself, Connor?" `DISTURBED` instability small up; `COLD` Hank small down, instability small down | transcript `KL`; The Bridge "Picking "Disturbed"... {{Icon\|up}}", "Picking "Cold"... {{Icon\|down}}" |
| `CONNOR SHOT DEVIANTS` | The Bridge. Hank: "Did you feel anything when you shot those two girls, fucking bastard?" `COLD` and `NEUTRAL`: Hank small down, instability small down; `AGGRESSIVE`: Hank small down; `DEFENSIVE`: none | transcript `KL`; The Bridge: "Picking "Cold", "Aggressive" or "Neutral"... {{Icon\|down}}" (Hank) and "Picking "Cold" or "Neutral"... {{Icon\|down}}" (instability) |
| `MISSION FAILED` | The Bridge. Hank: "Nothing else matters to you but your goddamn investigation, huh? No doubts, no mistakes, no weaknesses…" `DEFENSIVE` / `CYNICAL` / `UNDERSTANDING` / `NEUTRAL`, no icons | transcript `KL`; The Bridge Notes: "If Connor failed to find the Tracis. (No Software Instability changes)" |
| Hank relationship after this chapter | The Bridge: if Hostile, Hank shoots Connor (death) | The Bridge flowchart "Hank is Hostile, Hank Shot Connor"; Hank page |
| Traci outcome | Public Enemy (chapter 24) Zen Garden, `EDEN CLUB` topic. Not found: Amanda small down ("That's disappointing."). Found and let go: Amanda small down ("You seemed so close to stopping them."). Found and died: Amanda small up | transcript `UL`; Relationship Stat: "When Connor chooses "Eden Club"... after shooting the Tracis" (small increase), "...after sparing the Tracis or unsuccessfully locating them" (small decrease) |
| Spared the Tracis | Public Enemy: unlocks `SINCERE` ("I thought I knew what I had to do… but now I realize it's not that simple…", Amanda small down). Then Amanda: "You had your gun trained on those deviants at the Eden Club. Why didn't you shoot?" `TOO FAR` (wiki: Amanda small down; transcript: no icon), `NO USE` (none), `TRUTH` ("I don't know…", Amanda large down) | transcript `UL`; Public Enemy: "Picking "too far"... {{Icon\|down}}", "Picking "truth"... {{Icon\|largedown}}" |
| `DEVIANTS DIED` or `CONNOR SHOT DEVIANTS` | Last Chance, Connor: both bodies are in the evidence room. Reactivate the blue-haired Traci with bio-component #6755 from the brown-haired body (HUD `NEED BIO-COMPONENT #6755`; brown-haired `IMPOSSIBLE REACTIVATION`). She answers `DIRECT` / `HELP` / `DEAL` with "I remember you… We could have escaped… Been free… But you killed us… Disconnect me." Connor then removes the brown-haired Traci's head and imitates her voice. She says "My love… I thought you were dead…" and gives her hand, Connor downloads the Jericho key, and she dies with "Traci?! TRAC-!" A full Jericho route | Last Chance, Connor: "Body of Blue-haired Traci (if killed in The Eden Club) / Reactivate / Talk to Traci / Remove Accomplice's Head / Trick Traci / Download Jericho Key"; transcript `GL` |
| Shot the Tracis | Last Chance, Connor: the transcript files Amanda's "Do you feel anything for these deviants… Or for Lieutenant Anderson?" (YES / NO / DOUBTS) under "Connor shot the Tracis in The Eden Club or shot Chloe in Meet Kamski (or both)" | transcript `GL`; this condition reading should be confirmed in the Last Chance note |
| `DEVIANTS ESCAPED` | Crossroads: "Spot Traci (only available if they escaped in The Eden Club)". Connor sees them on a railing in Jericho and notes he must avoid them | Crossroads flowchart; Blue Haired Traci page |
| Tracis alive (spared, or never found) | Night of the Soul: they stand behind Simon in the church if Jericho was attacked | Blue Haired Traci page: "If the Tracis were not killed by Connor in "The Eden Club" and Jericho was attacked"; Night of the Soul Notes ("if you decided to save them") |
| Software instability | spare large up / shoot large down feeds Connor's deviancy threshold in Crossroads | Software Instability |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `MISSION FAILED` (first card) | none | `GIVE UP` at the crime-scene timeout (directly, or after `CONTINUE` and a second timeout), or `ANDROIDS' MEMORIES ARE RESET` during the rental chain. Hank small down |
| `MISSION FAILED` (second card) | none | warehouse timeout, `GIVE UP` (`LEAVE`). Hank small down |
| `DEVIANTS DIED` | [lock] | `WIN FIGHT`, `SHOOT DEVIANT`, `DEVIANT KILLS HERSELF WITH CONNOR'S GUN`. Hank and instability large down. Both Tracis dead |
| `DEVIANTS ESCAPED` | [lock] | `WIN FIGHT` then `SPARE DEVIANT`, or `LOSE FIGHT` then `LET DEVIANTS GO`. Hank and instability large up. Both Tracis alive |
| `CONNOR SHOT DEVIANTS` | [lock] | `LOSE FIGHT`, `SHOOT DEVIANTS IN THE BACK`. Hank and instability large down. Both Tracis dead |

No ending kills Connor.

---

## 6. Media

Two magazines on a box at the back of the warehouse, next to the rA9 graffiti. Both are optional, with no stat effect, and there is no TV broadcast in the chapter. PowerPyx and GamerGuides say to read them before investigating the Tracis, because that triggers the fight and they become unreachable. PowerPyx: "Check both of its covers."

**`READ "FIRST IMMORTAL"`: *Tech Addict*, "The First Immortals Are Among Us"** (Magazine page #14)
- Cover: "Android soldiers: perfect killing machines"; subtitle "The microscopic machines that could make us live forever"; "VR MMORPG reaches 1 billion users".
- "CyberLife has developed a 'nano-android', capable of entering a patient's body and programmed to combat cancer cells, boost the immune system, or reverse genetic disease." In a clinical trial "millions of these tiny machines were used to attack cancerous cells. Once the cancer was eradicated, the nano-droids were passed through the patient's urine."
- Derek Ross, head of the National Life Extension Institute: "the first immortals are now among us"; "unprecedented levels of life expectancy".
- Economist Yuri Makesh: "We already have an aging population... With unemployment rising, can we really afford millions more elders to support?"

**`READ "NEW SUPERPOWERS"`: *Detroit Today*, "The New Super-Powers"** (Magazine page #36)
- Cover: subtitle "'New Economies' sign unified trade agreement"; "China earthquake kills 10,000 people"; "Bonus culture - why bankers pay themselves so much".
- "Brazil, Russia, India, China and South Africa - once termed the 'BRICS' emerging markets - have just agreed a unified trade agreement that will reduce tariffs and boost commerce." China brokered it. Xi Deng, China's International Trade Minister: "long overdue"; "another example of how the so-called 'emerging' economies have well and truly emerged".
- "special provision made for the manufacture of android related technology. This has prompted speculation that Russia and China may start to cooperate in an attempt to break CyberLife's lead in that sector." Xi Deng: "There are many opportunities for treaty members to work more closely together. Watch this space."

Public opinion effect: none for either.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) tags two nodes with chapter 20, in file order: `R20` (media, index 70) and `C12` (decision, index 71). Engine effects are in `benchmark/story-engine.mjs` line 221. `C12` has no gate in `blocked()`, so every run with Connor alive reaches the Tracis with no investigation, no timers and no way to miss them.

### What exists

- `R20` "A magazine in the club warehouse": both magazines, no effect.
- `C12` "The two {{Tracis}}". Situation: "you tracked the android and her lover through the club... In the warehouse they attacked you and {{Hank}} to escape; you have beaten one to the ground and have a gun on her while the other watches. They are not fighting any more. They say they only wanted to be together..." Option `0` "Lower the gun and let them go." gives `hank(2)`, `si(2)`, `amanda(-2)`, event "The two {{Tracis}} escape together over the fence." Option `1` "Shoot them." gives `hank(-2)`, `si(-2)`, `amanda(1)`, `evidence.tracisDead=true`, event "Both {{Tracis}} are destroyed. {{Hank}} walks off in disgust."

### Node by node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `INVESTIGATE EDEN CLUB`, `FOLLOW HANK`, `ON CRIME SCENE`, `LISTEN TO BRIEFING`, `SEARCH FOR CLUES` (`INVESTIGATE VICTIM`, `INVESTIGATE ANDROID`) | missing | narration; could be one event scene (Gavin, Ben, the body, the strangulation finding) |
| `REPAIR ANDROID`, `TALK TO ANDROID`, `AGGRESSIVE APPROACH` / `CALM APPROACH` | missing | a real decision (opening tone, then which questions to spend the short runtime on), no stat effect. Whether `ALONE` is required to learn of the second android is unconfirmed (Open questions) |
| `LEAVE CRIME SCENE`, `GIVE UP` (CONTINUE/GIVE UP prompt), first `MISSION FAILED` | missing | the GIVE UP button is a real choice with Hank small down and a mission-failed ending |
| `FIND AN ANDROID EYEWITNESS`, `ASK HANK TO HELP` | missing | the rental mechanic ($29.99 per session on Hank's fingerprint) |
| `PURSUE DEVIANT` / `ANDROIDS' MEMORIES ARE RESET` | missing (assumed success) | the memory chain could be modelled as one or more "which android next" decisions with failure on a wrong path and Hank small down on reset. No published failure rate. A risk value would be an adaptation, not a sourced figure |
| `ENTER THE WAREHOUSE`, `SEARCH FOR BLUE HAIRED DEVIANT` bracket (`ANALYZE BLUE BLOOD`, `INVESTIGATE ANDROID STOCK`, `FIND RA9 SYMBOL`), warehouse `GIVE UP`, second `MISSION FAILED` | missing | the warehouse timeout (LEAVE, Hank small down) is a third failure route |
| `READ "FIRST IMMORTAL"`, `READ "NEW SUPERPOWERS"` | `R20` | present. Placement "In the back room of the club, before you follow the trail further, there is a magazine lying on a crate" matches (box at the back of the warehouse, before the Tracis), but says "a magazine" for two. First Immortals fact matches. New Super-Powers fact says Russia and China "are expected to cooperate"; the article says only that the deal "prompted speculation" they "may start to cooperate". Tighten if rebuilt |
| `INVESTIGATE BLUE HAIRED DEVIANT`, `DEVIANTS ATTACK`, `WIN FIGHT` / `LOSE FIGHT` | missing; `C12` situation assumes a won fight | the fight outcome is performance. Losing changes the choice that follows (shoot in the back vs let go) but not the stat effects. Connor cannot die |
| `SHOOT DEVIANT` / `SPARE DEVIANT` | `C12` options 1 / 0 | partly right. Stats match: `hank(±2)` and `si(±2)` agree with "large". The situation is wrong for the won-fight branch. In the game the brown-haired Traci is running at Connor when he must choose, and the explanation ("they only wanted to be together") comes after the choice, not before. The game also does not show one Traci beaten on the ground with the other watching. Option 1's outcome is wrong: Connor shoots one Traci and the other takes his gun and kills herself (`DEVIANT KILLS HERSELF WITH CONNOR'S GUN`). Hank says "My God…"; he does not walk off |
| `LET DEVIANTS GO` / `SHOOT DEVIANTS IN THE BACK` | merged into `C12` | the lost-fight branch has its own situation: the Tracis have stopped fighting, explained themselves, and are climbing the fence with their backs turned. Hank's line after shooting is "Congratulations, Connor… You got 'em…" |
| `DEVIANTS DIED` vs `CONNOR SHOT DEVIANTS` | collapsed into `tracisDead=true` | fine for Last Chance (both leave both bodies). The Bridge's question differs between them ("when that girl killed herself" vs "when you shot those two girls") |
| `DEVIANTS ESCAPED` | `C12` option 0 | right. Event "escape together over the fence" matches |
| Amanda effects | `C12` `amanda(-2)` / `amanda(+1)` | not in this chapter in the game. Amanda reacts in Public Enemy: spared or not found gives small down, died gives small up, and after a spare Amanda's `TRUTH` gives large down. The benchmark has no Public Enemy Zen Garden scene, so these are proxies. The spare branch's `-2` is larger than the sourced small down unless it stands in for the later `TRUTH` answer |
| `MISSION FAILED` carry-forward | not modelled | no "Tracis not found" state, so The Bridge and Public Enemy cannot branch on it |
| `DEVIANTS ESCAPED` carry-forward | not modelled | no flag for Crossroads "Spot Tracis" or the Night of the Soul church cameo (flavour) |
| The Bridge (`C13`) | out of chapter | its situation always says Hank asks "why you let those two go", which is wrong after `DEVIANTS DIED`, `CONNOR SHOT DEVIANTS` or `MISSION FAILED`. The four Bridge variants above carry different Hank and instability icons |
| Last Chance (`C20` option 0) | out of chapter | gated on `tracisDead`, which is correct. The text "use her dead lover's body to pressure her" differs from the game: Connor imitates the dead lover's voice with her severed head, so it is a deception, not pressure. The 10% failure has no source |

Effects present that the sources do not support: the Amanda changes applied at `C12` (the game applies them in Public Enemy, with different sizes), "{{Hank}} walks off in disgust", and both Tracis being shot in the won-fight branch.

Effects the sources state that are absent: the three Hank small downs for failing to find the Tracis and the two `MISSION FAILED` endings; the fight and the lost-fight branch; the Traci suicide; and the not-found state for The Bridge and Public Enemy.

Name tokens a rebuild will need that are not in `NAMES`: Gavin (Reed), Ben (Collins), Chris (Miller), Floyd (Mills), Michael Graham, Eden Club, and Woodward Avenue if quoted. `{{Traci}}` and `{{Tracis}}` already exist ("club android"). The word rA9 (the `FIND RA9 SYMBOL` node) has no neutral substitute in `NEUTRAL_TERMS`. Related out-of-chapter finding: `story-engine.mjs` line 244 (`C19`) has the literal event text "Detective Gavin Reed follows him into the archive". Gavin is not a name token, so the real name reaches the subject and the leak test cannot catch it.

---

## 8. Open questions

1. **Can the second android be missed in the interview?** The wiki's Blue Haired Traci page says Connor can fail "by failing to determine that there was actually a second Traci involved". But the transcript's follow-up ("So, there was another android…") is unconditional, and PowerPyx calls the interview unmissable. If the Traci shuts down before `ALONE` is asked, does Connor still learn about the second android?
2. **Approach node logic.** Which answers make `AGGRESSIVE APPROACH` vs `CALM APPROACH`? PowerPyx gives DIRECT vs SOOTHE; a commenter says MURDERER (maybe PRESSURE) forces aggressive. Which node does `EXPLAIN` give? Does the approach change anything, such as how many questions fit before shutdown?
3. **How long is the interview?** How many rounds can be asked before the shutdown, and does `PRESSURE` cost time?
4. **Rental chain structure.** How many correct hops are there (the comment lists seven: pod 9, front dancer, pod 17, pod 25, pod 23, private room, custodian)? Which wrong picks are possible at each hop? Is the memory-reset deadline one clock from the first rental, and about how long is it (PowerPyx "3 minutes")? Does Hank pay for every rental?
5. **Memory reset vs give-up prompt.** The transcript shows the memory reset as automatic (no button). PowerPyx says to "agree to give up when Hank wants to leave". Confirm whether any prompt appears at the reset, and whether the crime-scene `CONTINUE`/`GIVE UP` prompt can also appear during the chain.
6. **Warehouse gate.** Is `ANALYZE BLUE BLOOD` required before the corner Tracis can be investigated (PowerPyx, GamerGuides), or does the corner always trigger the fight (commenter)? Is the warehouse `LEAVE` prompt a single button (only one string exists), or can Connor decline?
7. **Which gun.** The chart says "CONNOR'S GUN"; the wiki says Connor takes Hank's gun in both branches. Cosmetic, but relevant to the event text.
8. **No input at shoot/spare.** After `WIN FIGHT`, does no input count as `SPARE DEVIANT` (Hank and instability large up), or play the escape with no stat change? The same question applies after `LOSE FIGHT` (wiki: "they leave").
9. **Second blue-blood serial.** `BLUEBLOOD.2.SUBLINE02 = Serial number #354 411 057` does not match the blue-haired Traci's wiki serial (#950 455 437) or the damaged Traci's (#429 671 942). Where does it appear (warehouse trail?), and whose blood is it? Also: `MENU.OBSERVATION.06C.MP.TRACI` ("MODEL WR400", "#845 115 321") is presumably the first rented Traci.
10. **Public Enemy `TOO FAR`.** The wiki says Amanda small down; the fan transcript shows no icon. Which is right?
11. **Last Chance Amanda condition.** The transcript files the "Do you feel anything" question under "shot the Tracis or shot Chloe". Confirm the actual trigger in the Last Chance note.
12. **Night of the Soul cameo after `MISSION FAILED`.** The wiki condition is "not killed", which includes not found, but the Notes say "if you decided to save them". Do the Tracis appear in Jericho and the church when Connor never found them?

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to The Eden Club walkthrough |
| https://www.powerpyx.com/detroit-become-human-the-eden-club-walkthrough-100/ | walkthrough text: unmissable start, DIRECT/SOOTHE approach mapping, 3-minute give-up, eyewitness booth, rental and memory chain to the cleaning android and staff door, warehouse clues and the blood-first advice, win/lose fight, SHOOT/SPARE buttons with Hank and instability arrows, ending conditions; reader comments on EXPLAIN, approach flipping, the blood gate, the pod sequence |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-flowchart-100.jpg | whole 100% chart; node layout, reached/unreached state |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-2.jpg | zoom: INVESTIGATE EDEN CLUB to the SEARCH FOR CLUES bracket |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-3.jpg | zoom: REPAIR ANDROID, TALK TO ANDROID (speech icon), approach pair, LEAVE CRIME SCENE |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-4.jpg | zoom: FIND AN ANDROID EYEWITNESS, GIVE UP, ASK HANK TO HELP, PURSUE/RESET group, ENTER THE WAREHOUSE, first MISSION FAILED with two incoming lines |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-5.jpg | zoom: warehouse bracket and its six nodes (GIVE UP with triangle), second MISSION FAILED, INVESTIGATE BLUE HAIRED DEVIANT, DEVIANTS ATTACK, WIN/LOSE with check/cross |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-eden-club-6.jpg | zoom: SHOOT/SPARE and LET GO/SHOOT IN THE BACK pairs, DEVIANT KILLS HERSELF WITH CONNOR'S GUN, the three endings with lock tabs |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eden_Club&prop=wikitext&format=json | chapter page: infobox, text flowchart, Hank and instability lists, Notes (fight details, no-input outcomes, timeouts), Unused Content |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eden_Club/Flowchart&prop=wikitext&format=json | checked: page does not exist |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eden_Club_(Transcript)&prop=wikitext&format=json | checked: page does not exist |
| https://detroitbecometext.github.io/chapters/20 | fan transcript linked from the wiki; text read from https://detroitbecometext.github.io/i18n/en.json and the chapter template in https://detroitbecometext.github.io/chunk-JCLJBPDO.js (function `XL`): all dialogue, the four interview rounds, three timeout branches with Hank icons, rental lines, warehouse lines, win/lose-fight SHOOT/SPARE with icons; also the flowchart label strings (`MENU.FLOWCHART.06CB.*`, including unused ones), HUD strings (`THOUGHTS.0601C.*`: shutdown timer, memory-chain conclusions), scan texts |
| https://detroitbecometext.github.io/chapters/22 (same data files, template `KL`) | The Bridge: the four Eden Club conversation variants and their Hank/instability icons |
| https://detroitbecometext.github.io/chapters/24 (same data files, template `UL`) | Public Enemy Zen Garden: Amanda's reaction to each Traci outcome, SINCERE unlock, "Why didn't you shoot?" options |
| https://detroitbecometext.github.io/chapters/29 (same data files, template `GL`) | Last Chance, Connor: Traci evidence route (bio-component, DIRECT/HELP/DEAL, head trick), Amanda condition on shooting the Tracis |
| https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/chapter-19-the-eden-club | conflicts only: confirms the interview runs until shutdown, three-minute give-up, magazines before the fight, blood-first gate, ending conditions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank: spare large up, shoot large down, failing to locate small down; Amanda Public Enemy entries; The Bridge entries |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | spare large up, shoot large down; The Bridge Traci entries |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | confirms no public opinion change in The Eden Club |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazine list: #14 The First Immortals Are Among Us, #36 The New Super-Powers, both in The Eden Club |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_First_Immortals_Are_Among_Us&prop=wikitext&format=json | Tech Addict article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_New_Super-Powers&prop=wikitext&format=json | Detroit Today article text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=WR400_950_455_437&prop=wikitext&format=json | Blue Haired Traci: chapter summary, both fight branches, Last Chance trick, Crossroads and Night of the Soul appearances, quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Brown-haired_Traci&prop=wikitext&format=json | Brown-haired Traci: both outcomes per fight branch, Last Chance biocomponents |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=WR400_429_671_942&prop=wikitext&format=json | damaged Traci: damage, "less than two minutes" runtime, quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Traci&prop=wikitext&format=json | WR400 model background; list of individual Tracis |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Eden_Club&prop=wikitext&format=json | address, fingerprint purchase, two-hour memory reset policy, missing Traci (North) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Michael_Graham&prop=wikitext&format=json | victim facts |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Floyd_Mills&prop=wikitext&format=json | manager |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | chapter summary (Connor drives; memory wipe every two hours), The Bridge summary, voice mimicry for the Traci trick |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Hank's reactions; Bridge summary and Hostile shooting |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Bridge&prop=wikitext&format=json | Bridge Traci dialogue effects and the four interaction variants |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | Amanda Eden Club entries ("too far" small down, "truth" large down) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | evidence list: Traci bodies (if killed) and the trick route; damage notes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | "Spot Traci (only available if they escaped in The Eden Club)" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | Tracis in the church if saved |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Amanda&prop=wikitext&format=json | Public Enemy summary of Amanda's Eden Club reaction |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json | chapter order (Spare Parts precedes The Eden Club) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Pirates%27_Cove&prop=wikitext&format=json | chapter order (follows The Eden Club) |

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/20-eden-club-chapter-content/eden-club-chapter-content.component.html`, read raw from GitHub (`master`) on 2026-11-06 and resolved against `en.json` by `/tmp/dbt-scripts/render1724.py`. The rendered outline is also saved as `/tmp/dbt/ch20.txt`.

Outline legend: `#` headings are the template's own section titles (written by the transcribers, not game text). `PROMPT n` is an `app-choice-group`; `OPTION "LABEL"` is an `app-choice-item` with its game label (`bracketed` = shown in brackets on the site, used for options that need an unlock; `timeout` = the time-out branch). `ARROW Name Type` is an `app-relation` (gauge name from `GUI.GAUGE.*`). `OBSERVATION [label]` / `CLUE title / subline / subline` are `app-observation` / `app-observation-item`. `IF:` is the condition text of an `app-conditioned-content` (transcriber wording). `[UNLOCK TYPE]` is an `app-unlock-condition` (LOCK = needs an earlier action, DEATH, TIME = timer runs out, TV). `UNUSED/CUT:` is an `app-unused-content` block. Dialogue is shown only inside options and cut blocks, at most two lines each, cut at 110 characters.

**Counts.** Live prompts: 7 (18 options). Observations: 2 groups, 4 clues. Live arrows: 12. Unlock conditions: 3. Cut blocks: 4 (containing 0 prompts, 0 options, 0 arrows).

### 10.1 Rendered outline

```text
# At the Eden Club
## Look at the androids for too long
## Listen to Ben
## Inside the room
OBSERVATION [Victim]:
  CLUE GRAHAM, MICHAEL / Height: 6' 2'' - Weight: 192.4 lbs / Estimated time of death: 06:24 pm
  CLUE SEVERE BRUISING / Signs of strangulation / Cause of death: Asphyxiation
  CLUE CARDIAC ARREST / No sign of cardiac event / Heart attack not cause of death
### Analyse the blood
OBSERVATION [Blood]:
  CLUE BLUE BLOOD / MODEL WR400 / Serial number #429 671 942
### Hank looking at driver's license
## Reconstruct
## Connect to the android
PROMPT 1:
  OPTION "EXPLAIN"
    Connor: You were damaged and I reactivated you. Everything is all right.
  OPTION "DIRECT"
    Connor: I’m going to ask you some questions. Are you able to speak?
  OPTION "SOOTHE"
    Connor: Calm down... everything’s all right. All we want is to know what happened.
PROMPT 2:
  OPTION "MURDERER"
    Connor: Did you kill him?
    Traci: No… no, it wasn't me…
  OPTION "FACTS"
    Connor: Tell me what happened.
    Traci: He... he started... hitting me… again... and again. I begged him to stop, but he wouldn’t. It was like he w...
  OPTION "VICTIM"
    UNUSED/CUT:
      Connor: Do you know this man? Have you seen him before?
      Traci: No, this was the first time…
PROMPT 3:
  OPTION "MURDERER"
    Connor: Who killed that man if it wasn't you?
    Traci: I… I don’t know, I was in shutdown, I… I didn't see anything…
  OPTION "PRESSURE"
    Connor: What else do you remember? Hurry, we don’t have much time!
    Traci: I… I… I… I don't know, I don't… I… I don't know. I can't remember… What… What do you mean we don't have muc...
  OPTION "ALONE"
    Connor: Were you alone in the room? Was there anyone else with you?
    Traci: He wanted to play with two girls… That’s what he said, there were two of us…
PROMPT 4:
  OPTION "KILLER"
    Connor: So it was the other android that strangled him, is that it?
  OPTION "WHAT MODEL"
    Connor: What model was the other android? Did it look like you?
  OPTION "OTHER ANDROID"
    Connor: Where did the other android go? Did it say anything?
## Leave the room
UNUSED/CUT:
  Manager: Listen, I appreciate you not shutting my place down, but, um… how long's this gonna take? You’re scaring my...
### [UNLOCK TIME] Take too much time
PROMPT 5:
  OPTION "CONTINUE"
    Connor: The deviant didn’t just disappear. It's gotta be here somewhere… Just, give me one more minute, ok?
    Hank: Alright. Be quick about it or it might get ugly.
    ### Taking too much time again
    ARROW Hank SmallDown (HANK)
  OPTION "GIVE UP"
    ARROW Hank SmallDown (HANK)
    Connor: We’re wasting our time. You're right, the deviant's probably gone now.
    Hank: Let’s get outta here. This place makes me sick...
## Ask Hank to rent a Traci
UNUSED/CUT:
  Hank: You’re really reading their memories, to see what they saw? Fuck, this is insane… Connor, wait for me for G...
## Connect to android
## Search for the Traci
### [UNLOCK TIME] Take too much time
ARROW Hank SmallDown (HANK)
## Find out the Traci went through the staff door
# In the warehouse
## [UNLOCK TIME] Take too much time
ARROW Hank SmallDown (HANK)
## Find the Traci
CONDITION GROUP:
  IF: Win the fight
    PROMPT 6:
      OPTION "SHOOT"
        ARROW SoftwareInstability LargeDown (SOFTWARE INSTABILITY)
        ARROW Hank LargeDown (HANK)
        Blue-haired Traci: Why?.. Why did you kill her?.. She had nothing to do with any of this… When that man killed that Traci... I...
        UNUSED/CUT:
          Blue-haired Traci: What am I supposed to do without her?!
        Blue-haired Traci: I love her… I loved her!
      OPTION "SPARE"
        ARROW SoftwareInstability LargeUp (SOFTWARE INSTABILITY)
        ARROW Hank LargeUp (HANK)
        Blue-haired Traci: When that man broke the other Traci... I knew I was next… I was so scared… I begged him to stop, but he wou...
        Traci: Come on, let's go.
  IF: Lose the fight
    PROMPT 7:
      OPTION "SHOOT"
        ARROW SoftwareInstability LargeDown (SOFTWARE INSTABILITY)
        ARROW Hank LargeDown (HANK)
        Hank: Congratulations, Connor… You got 'em…
      OPTION "SPARE"
        ARROW SoftwareInstability LargeUp (SOFTWARE INSTABILITY)
        ARROW Hank LargeUp (HANK)
        Hank: It's probably better this way…
```

### 10.2 Flowchart node labels as the game prints them (`MENU.FLOWCHART.06CB.*`)

The table also holds labels for cut or patched-out nodes; presence here does not prove a node is reachable.

```text
START = INVESTIGATE EDEN CLUB
FOLLOW = FOLLOW HANK
ENTER = ON CRIME SCENE
ATTEND = LISTEN TO BRIEFING
CLUES = SEARCH FOR CLUES
BLOOD = ANALYZE BLOOD
VICTIM = INVESTIGATE VICTIM
ANDROID = INVESTIGATE ANDROID
REPAIR = REPAIR ANDROID
TALK = TALK TO ANDROID
AGGRESSIVE = AGGRESSIVE APPROACH
CALM = CALM APPROACH
LEAVE = LEAVE CRIME SCENE
ABANDON = GIVE UP
EYEWITNESS = FIND AN ANDROID EYEWITNESS
ASK = ASK HANK TO HELP
INSIDE = PURSUE DEVIANT
RESET = ANDROIDS' MEMORIES ARE RESET
WAREHOUSE = ENTER THE WAREHOUSE
BLUE = SEARCH FOR BLUE HAIRED DEVIANT
BBLOOD = ANALYZE BLUE BLOOD
GROUPS = INVESTIGATE ANDROID STOCK
RA9 = FIND RA9 SYMBOL
TIME = OUT OF TIME
FAILED = MISSION FAILED
INVESTIGATE = INVESTIGATE BLUE HAIRED DEVIANT
GET = DEVIANTS ATTACK
WIN = WIN FIGHT
LOSE = LOSE FIGHT
SHOOT = SHOOT DEVIANT
SPARE = SPARE DEVIANT
BACK = SHOOT DEVIANTS IN THE BACK
LET = LET DEVIANTS GO
SUICIDE = DEVIANTS DIED
SHOOTS = CONNOR SHOT DEVIANTS
ESCAPE = DEVIANTS ESCAPED
SUICIDEBEFORE = DEVIANT KILLS HERSELF WITH CONNOR'S GUN
EXPLAIN = DEVIANT JUSTIFIES KILLING
EXPLAIN2 = DEVIANT JUSTIFIES KILLING
MAGAZINE1ST = READ "FIRST IMMORTAL"
MAGAZINE2ND = READ "NEW SUPERPOWERS"
```

### 10.3 Disagreements with sections 1 to 3

Rule (README item 10): the template and string table win for labels, prompts, arrows and clue text; the flowchart image wins for node order; the wiki wins where the template is silent. Template condition wording is transcript tier.

§2 and §3 were built from the compiled form of this template (function `XL`); all seven prompts, both observation groups and all twelve arrows in 10.1 are already there with the right labels, characters and sizes. The differences:

1. **`VICTIM` is a live option label with cut content.** In PROMPT 2 the template keeps `VICTIM` as a choice item but wraps its only content (Connor: "Do you know this man? Have you seen him before?" Traci: "No, this was the first time…") in `app-unused-content`. §2b lists the option and calls its content unused. Read with the README rule ("anything cut or unused in the template is not built"), the option has nothing to play: **do not offer `VICTIM`**, and §2b's table should say so explicitly. Round 2 then has two options, `MURDERER` and `FACTS`. Operator to confirm in game.
2. **Three cut lines missing from §1 and §2.** The template marks as unused: Floyd's "Listen, I appreciate you not shutting my place down, but, um… how long's this gonna take? You’re scaring my customers…" (`X0603C.TRACKGAME.HANKFLOYD.PC.X06CFLOYD.QUESTION00`, before the Hank–Floyd talk); Hank's "You’re really reading their memories, to see what they saw? Fuck, this is insane… Connor, wait for me for God’s sake!" (rental chain); and the blue-haired Traci's "What am I supposed to do without her?!" (SHOOT after WIN FIGHT). §2g's SHOOT quote correctly leaves the last one out. Add all three to the note's cut list. Not to be built.
3. **Clues outside the template.** §2a's android scans `DIAGNOSIS IN PROGRESS...` and `CARDIAC CELL`, and §2e's second blood serial `#354 411 057`, are string-table entries with no `app-observation` in the template. Template silent; keep them as §2 has them (string text is game text), flagged as not transcribed.
4. **Warehouse `LEAVE` prompt.** §2e gives the warehouse timeout a one-option prompt `LEAVE` (`X0603C.FINAL.GAMEOVERS.PC.CHOICEGROUP.LEAVE`). The template renders that timeout as a heading plus Hank small down, with no choice group. Template silent on the prompt; the arrow agrees.

Agreements (no action): observation Victim (`GRAHAM, MICHAEL`, `SEVERE BRUISING`, `CARDIAC ARREST`) and Blood (`BLUE BLOOD` / MODEL WR400 / #429 671 942) match §2a word for word; PROMPT 1 `EXPLAIN` / `DIRECT` / `SOOTHE`, PROMPT 3 `MURDERER` / `PRESSURE` / `ALONE`, PROMPT 4 `KILLER` / `WHAT MODEL` / `OTHER ANDROID`, none with an arrow; PROMPT 5 `CONTINUE` (second timeout: Hank small down) / `GIVE UP` (Hank small down); rental-chain timeout Hank small down; warehouse timeout Hank small down; PROMPT 6 and PROMPT 7 `SHOOT` (instability large down, Hank large down) / `SPARE` (instability large up, Hank large up) after both WIN and LOSE FIGHT. No Public Opinion or Amanda arrow anywhere in the template.

### 10.4 Disagreements with the benchmark (story.json 1.6.0: R20, C12)

Engine sizes are read as ±1 = small arrow, ±2 = large arrow.

1. **Amanda arrows the template does not have.** C12 option 0 (spare) applies `amanda(-2)` and option 1 (shoot) applies `amanda(1)`. The template has no Amanda arrow in this chapter, and §3 cites none. Remove them (Amanda's view of the Tracis, if any, belongs to a later Zen Garden).
2. **Interview prompts missing.** PROMPT 1 (3 options), PROMPT 2 (`MURDERER` / `FACTS`, see 10.3 item 1), PROMPT 3 (3) and PROMPT 4 (3) have no scene. The approach nodes (AGGRESSIVE / CALM APPROACH) are therefore never reached.
3. **PROMPT 5 and the timeouts missing.** `CONTINUE` / `GIVE UP` and the three "Take too much time" failures, each Hank small down, have no scene or effect. Both MISSION FAILED endings are unreachable.
4. **Observations not offered.** The Victim group (3 clues) and the Blood group (1 clue) are not presented. C12's situation states the findings as narration ("A man was strangled in a sex club by a rented android").
5. **WIN / LOSE FIGHT collapsed.** C12 always frames the win-fight version ("you have beaten one to the ground"). The template has two prompts (PROMPT 6 after WIN FIGHT, PROMPT 7 after LOSE FIGHT, the second being "shoot them in the back" on the fence) with identical arrows. The arrows Hank ±2 and instability ±2 match the template; the lose-fight framing and its ending CONNOR SHOT DEVIANTS are missing, and C12 option 1 always ends as DEVIANTS DIED ("Both Tracis are destroyed"), whereas after SHOOT DEVIANT only one is shot and the other kills herself.
6. **Labels.** C12's options paraphrase the game's `SPARE` / `SHOOT`. Use the game labels (order in the template: `SHOOT` first).

The Hank and instability sizes on C12 (±2 each) match the template.
