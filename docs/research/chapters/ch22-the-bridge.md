# Chapter 22: The Bridge (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots and walkthrough text (including its 11 reader comments), the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki's stat, character, magazine, trophy and later-chapter pages, and the fan transcript at detroitbecometext.github.io (chapter 22). The transcript's in-game strings were read from its `i18n/en.json` (keys `X0801C.BENCH.TALK.*` for the dialogue, `MENU.FLOWCHART.08C.*` for the chart labels, `GUI.MAGAZINE.*` for the magazines). Its conditions and stat icons came from the compiled chapter template in `chunk-JCLJBPDO.js` (function `KL` for this chapter, `UL` for Public Enemy), using the render the chapter 18 agent made (`/tmp/flowcharts/ch18/x_KL.txt`) and a check of the raw update block for label-to-line bindings. Working files are in `/tmp/flowcharts/ch22/` (not committed): `wiki.txt`, `pp.txt`, `br_1.jpg` to `br_4.jpg`, `crops/`, `strings.txt`, `wikipages/`. The wiki chapter page is a stub with a text flowchart, a Hank relationship list and a Software Instability list. It has no Probability or Public Opinion section. The allpages query for "The Bridge" returns only the chapter page, with no `/Flowchart` or `(Transcript)` subpage.

Game date and time (wiki infobox; transcript "NOV 7TH, 2038", "AM 01:19"): November 7, 2038, 01:19AM. Location: Riverside Park, by the Detroit River, with the Ambassador Bridge in the background (Ambassador Bridge page: "seen in the background across the river with Canada when Connor talks to Hank in the park"). Objective (infobox): "Debrief with Hank". Wiki: "This chapter has two different outcomes." (`|endings=2`). PowerPyx: "Triggers automatically after completing the The Pirates' Cove Chapter."

Summary: 17 chart nodes plus 1 yellow requirement tab (`PHOTO SEEN IN 'RUSSIAN ROULETTE'`), 1 checkpoint, 2 endings (`HANK LEFT CONNOR ALONE`, no icon; `HANK SHOT CONNOR`, skull on a yellow tab). The chart has 1 player choice set (`SHOW FEAR` / `SHOW NO FEAR` / `REMAIN LOGICAL` / `BE COLD`, the answer to "are you afraid to die?"). It also has 3 optional `DISCUSS` nodes reached through dialogue answers, and 1 state-decided pair (`HANK IS PLACATED` / `HANK IS HOSTILE`, decided by whether Hank's relationship is Hostile). Off the chart there are 7 dialogue rounds in all (plus a `PHOTO`/`SUICIDE` sub-choice). Three of them have variants that depend on the Eden Club outcome. No probabilities, no QTE, no public opinion changes. Hank changes: up to 2 small ups (3 if the wiki's "x2" on `TRUTH` is right) and up to 6 small downs from answers, plus a small down if he shoots. Software instability: three answers give a small up, but at most 2 can occur on one path, against up to 4 small downs. Connor dies here only if Hank is Hostile at the end of the conversation.

---

## 1. Flowchart transcription

Read from `br_1.jpg` (whole chart), `br_2.jpg` (left half zoom), `br_3.jpg` and `br_4.jpg` (right half zooms), with crops of the answer-bracket connectors (`crops/lines.jpg`, `crops/mid1.jpg`) and the icons (`crops/skull.jpg`, `crops/readicon.jpg`, `crops/req.jpg`). The header shows `100% COMPLETED` / `THE BRIDGE`. The PowerPyx screenshots do not show the world stats panel.

Icon key (same conventions as the ch12 and ch18 notes): [arrow] = action, [triangle] = event the game plays, [choice] = overlapping-squares marker before a group of alternatives, [magazine] = small magazine glyph that heads a bracket of reads, [lock] = black open padlock on a yellow requirement tab. Blue fill = reached on the photographed save. Grey with a black arrow or triangle = shown but not reached on that save.

### Start and magazines

| # | Node (as printed) | Icon | Follows / notes |
|---|---|---|---|
| 1 | `AMBASSADOR BRIDGE` | checkpoint (large card with image of the snowy park path and car headlights, "CHECKPOINT") | chapter start |
| 2 | `LEAVE CAR` | [arrow], blue | #1 |
| 3 | `READ "MYSTERIOUS KAMSKI"` | [arrow], blue | under a [magazine] bracket glyph that sits below #2 (printed `READ "MYSTERIOUS` / `KAMSKI"`) |
| 4 | `READ "MARKETS PREDICT WAR"` | [arrow], blue | same bracket (printed `READ "MARKETS PREDICT` / `WAR"`) |

### Conversation

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 5 | `TALK TO HANK` | [arrow], blue | #2 |
| - | `PHOTO SEEN IN 'RUSSIAN ROULETTE'` | yellow requirement tab with [lock] (not a node) | its line runs to #6 only |
| 6 | `DISCUSS PHOTO` | [arrow], blue | line from #5 and from the requirement tab |
| 7 | `DISCUSS RUSSIAN ROULETTE` | [arrow], grey | line from #5 (printed `DISCUSS RUSSIAN` / `ROULETTE`) |
| 8 | `DISCUSS RA9` | [arrow], grey | line from #5 |
| 9 | `HANK DRAWS GUN` | [triangle], blue | #5 (the main line; #6 to #8 are side branches off #5 and do not feed #9) |

### The gun

| # | Node | Icon | Follows / notes |
|---|---|---|---|
| 10 | `SHOW FEAR` | [choice] set of four, grey | #9 |
| 11 | `SHOW NO FEAR` | [choice] set of four, grey | #9 |
| 12 | `REMAIN LOGICAL` | [choice] set of four, grey | #9 |
| 13 | `BE COLD` | [choice] set of four, blue | #9 |
| 14 | `HANK IS PLACATED` | [triangle], grey | from the answer bracket |
| 15 | `HANK IS HOSTILE` | [triangle], blue | from the answer bracket |

Three lines leave the answer bracket: one runs straight to #16 (along the top, bypassing #14), one to #14, and one (blue) to #15. #14 then joins #16. See Open questions for the direct line.

### Endings

| # | Node | Icon | Follows |
|---|---|---|---|
| 16 | `HANK LEFT CONNOR ALONE` | ending (large card with image of Hank, head down, and Connor standing by the bridge pier), no icon | #14 and the direct line from the answer bracket |
| 17 | `HANK SHOT CONNOR` | ending (large card with image of Hank standing with the gun lowered), skull on a yellow tab | #15 |

Total: 17 nodes (excluding the requirement tab). Blue on the PowerPyx save: #1 to #6, #9, #13, #15, #17. Grey: `DISCUSS RUSSIAN ROULETTE`, `DISCUSS RA9`, `SHOW FEAR`, `SHOW NO FEAR`, `REMAIN LOGICAL`, `HANK IS PLACATED`, `HANK LEFT CONNOR ALONE`. The last-played path on that save was the shooting.

The yellow tab on the skull marks a cross-chapter impact, as the yellow tab did on `FIND PICTURE OF HANK'S SON` in Russian Roulette. The death carries into Public Enemy (section 4).

In-game label strings (`MENU.FLOWCHART.08C`) match the chart exactly. The keys are `START`, `LEAVE`, `TALK`, `PHOTO`, `SUICIDE` (= `DISCUSS RUSSIAN ROULETTE`), `RA9`, `GUN`, `AFRAID` (= `SHOW FEAR`), `NOT` (= `SHOW NO FEAR`), `LOGICAL` (= `REMAIN LOGICAL`), `ALIVE` (= `BE COLD`), `FRIENDS` (= `HANK IS PLACATED`), `NOTFRIENDS` (= `HANK IS HOSTILE`), `WITHOUT` (= `HANK LEFT CONNOR ALONE`), `SHOOTS` (= `HANK SHOT CONNOR`), `MAGAZINE1ST`, `MAGAZINE2ND`, and `GC.PHOTOSEEN` for the tab. The table also has `DIES` = `CONNOR DIES`, which does not appear on the chart.

The wiki's text flowchart: "Leave Car / Read book from bench (Ambassador Bridge) / Read Mysterious Kamski / Read Markets Predict War / Talk to Hank / Discuss rA9 / Discuss Russian Roulette / Discuss Photo (Cole) - only if unlocked during Russian Roulette / Hank Draws Gun / Show Fear / Show No Fear / Remain Logical / Be Cold / Hank is Placated / Hank Left Connor Alone / Hank is Hostile / {{Icon|death}} Hank Shot Connor". It has the same structure, but it nests both outcome triangles under `Be Cold` only, and it omits the `AMBASSADOR BRIDGE` checkpoint.

---

## 2. Choices and gates

The order of play is fixed, and every round is a single pick. Option labels and lines come from the in-game strings. Stat icons come from the transcript template unless stated otherwise. PowerPyx numbers its rounds "Dialogue Set 1" to "Dialogue Set 6" (it skips 5). Its sets match the transcript except where noted.

### 2a. Arrival and magazines (nodes 1 to 4)

Connor and Hank arrive in Hank's car (wiki Notes: "The song heard inside Hanks car is "Johnny Lawless" by Rocket 455"). Hank goes to a bench overlooking the river. PowerPyx: "Go talk to hank, he's sitting on a bank in plain sight." The two magazines are on a bench straight ahead after Connor leaves the car. PowerPyx: "Be sure to pick it up before talking to Hank (no way back after that)." Magazine pages: "Talking to Hank first makes this impossible." No effect (section 6).

### 2b. Round 1, Hank's opener (node 5; `DISCUSS PHOTO` / `DISCUSS RUSSIAN ROULETTE`)

Hank: "Nice view, huh?... I used to come here a lot before…"

| Option | Connor | Hank | Effect |
|---|---|---|---|
| `PERSONAL QUESTION` | "Can I ask you a personal question, Lieutenant?" | "Do all androids ask so many personal questions or is it just you?" | leads to the sub-choice below |
| `STOP DRINKING` | "You should stop drinking, Lieutenant. It could have serious consequences for your health." | "That's the idea." | none |
| `BEFORE` | "Before? Before what? You said "I used to come here a lot before". Before what?" | "Hm? Before… Before nothin'…" | none |
| `GO BACK` | "It's late. Maybe you should go home." | "I'm not tired… Guess neither are you." | none |

`PERSONAL QUESTION` sub-choice. Transcript note: "If Connor didn't look at the photo in Russian Roulette, no choice will be given and the dialogue will go directly to the SUICIDE option." The wiki Notes say the same.

| Option | Requires | Connor | Hank | Chart node | Effect |
|---|---|---|---|---|---|
| `PHOTO` | lock "Looked at Cole's photo in Russian Roulette" (= Russian Roulette node `FIND PICTURE OF HANK'S SON`) | "I saw a photo of a child... on your kitchen table. It was your son, right?" | "Yeah… His name was Cole." | `DISCUSS PHOTO` | Hank small down |
| `SUICIDE` | none (automatic without the photo) | "Why are you so determined to kill yourself?" | "Some things, I just can't forget… Whatever I do, they're always there… Eating away at me… I don't have the guts to pull the trigger… So, I kill myself a little every day… That's probably difficult for you to understand, huh, Connor? Nothing very rational about it…" | `DISCUSS RUSSIAN ROULETTE` | none |

So with the photo, `PERSONAL QUESTION` offers the choice. Without it, `PERSONAL QUESTION` always reaches `DISCUSS RUSSIAN ROULETTE`. The other three answers reach no chart node. `SUICIDE` has no unlock condition. In particular it does not need `LEARN HANK WAS PLAYING RUSSIAN ROULETTE` from chapter 18. In the PHOTO branch Hank does not explain how Cole died. He says only his name.

### 2c. Round 2, the investigation (node 8, `DISCUSS RA9`)

Connor: "We're not making any progress on this investigation… The deviants have nothing in common. They're all different models, produced at different times, in different places…" Hank: "Well, there must be some link."

| Option | Requires | Connor | Hank | Effect |
|---|---|---|---|---|
| `rA9` | lock "Looked at rA9 clues in previous chapters" | "What they have in common is this obsession with rA9… It's almost like some kind of... myth. Something they invented that wasn't part of their original program…" | "Androids believing in God… Fuck, what's this world coming to?" | none; reaches `DISCUSS RA9` |
| `SHOCK` | none | "We know the deviants experienced... an emotional shock, a violent trauma or a sense of injustice…" | "Those girls at the Eden Club, sure had a reason to feel a sense of injustice…" | none |
| `SYSTEMS` | none | "It could be a hardware problem... maybe a defective biocomponent?" | "Well, I don't know much about biocomponents… but I bet that's not the fucking reason…" | none |
| `SOFTWARE` | none | "It could be a software problem... that... only occurs under certain conditions?" | "Well, that's just a fancy way of saying you have no fucking idea…" | none |

The chart shows no requirement tab on `DISCUSS RA9`, and no source says which rA9 clues count (see Open questions). Places where Connor can meet rA9 earlier (wiki rA9 page): the shower walls and statuette at Carlos' house (Partners), the interrogation (The Interrogation), Rupert's apartment walls (The Nest), the warehouse wall (The Eden Club). PowerPyx: "In the second set of dialogues you can choose [rA9], SHOCK, SYSTEMS, SOFTWARE. For this task choose [rA9]."

### 2d. Round 3, the Tracis (Eden Club outcome decides the variant)

Connor: "You seem preoccupied, Lieutenant… Is it something to do with what happened back at the Eden Club?"

Variant A, "Found the Tracis in The Eden Club" (spared or killed). Hank: "Those two girls… They just wanted to be together… They really seemed in love…"

| Option | Connor | Effect |
|---|---|---|
| `RATIONAL` | "They can simulate human emotions, but they're machines. And machines don't feel anything." | none |
| `DEVIANTS` | "They didn't want anything. They're deviants. End of story." | none |
| `IRONIC` | "You seem troubled, Lieutenant. I didn't think machines could have such an effect on you…" | none |
| `COLD` | "Nothing in their program allows them to love or desire anything. They're machines." | Hank small down, SI small down |

Variant B, "Took too much time looking for the Traci in The Eden Club" (time unlock). Hank: "I wish we'd have found that girl that killed that guy… Maybe she had a reason… Maybe she was just defending herself…"

| Option | Connor | Effect |
|---|---|---|
| `COLD` | "What difference would it make? We know what happened. A defective machine killed a human." | SI small down, Hank small down (transcript) |
| `IRONIC` | as above | none |
| `RATIONAL` | "It didn't want anything, Lieutenant. It was a deviant. That's all there is to it." | none |

The wiki's Notes say the not-found branch has "No Software Instability changes". That conflicts with the transcript's icons on variant B `COLD`. The wiki lists "Picking "Cold" when Hank talks about the Tracis" without saying which variant (see Open questions).

### 2e. Round 4, "what are you really?"

Hank: "What about you, Connor?... You look human, you sound human, but what are you really?"

| Option | Connor | Effect |
|---|---|---|
| `COLD` | "I'm a machine, designed to accomplish a task." | SI small down, Hank small down |
| `AGGRESSIVE` | "I'm a machine, designed to accomplish a task. I know why I exist and who designed me. I have a reason to live. I guess that's the difference between us, Lieutenant." | SI small down, Hank small down |
| `DEFENSIVE` | "You know exactly what I am. In any case, I don't see how that's relevant to the investigation." | none |
| `NEUTRAL` | "I'm whatever you want me to be, Lieutenant. Your partner... Your buddy to drink with... Or just a machine... Designed to accomplish a task." | Hank small up |

### 2f. Round 5, the Traci outcome question (four variants)

| Eden Club state (transcript condition) | Hank's question | Options and effects |
|---|---|---|
| "Connor spared the Tracis" | "You could've shot those two girls, but you didn't. Why didn't you shoot, Connor? Hm? Some scruples suddenly enter into your program?" | `LIE` "I would've shot them if I could. Why would I let them escape?" (Hank small down). `TRUTH` "No… I just decided not to shoot, that's all…" (SI small up, Hank small up; the wiki says Hank up "x2") |
| "Connor shot the Tracis in the back" (lost the fight, then shot them as they fled) | "Did you feel anything when you shot those two girls, fucking bastard? Or were you just executing some program?" | `COLD` "All I did was neutralize two machines, Lieutenant. I didn't hesitate for a second, if that's what you're asking." (SI small down, Hank small down). `DEFENSIVE` "This is going nowhere, Lieutenant. I think I'll go back to the station." (none). `AGGRESSIVE` "I'm glad to see you taking an interest in machines, Lieutenant. Who knows, maybe you'll even become useful to the investigation at some point…" (Hank small down). `NEUTRAL` "I did what I was programmed to do. I didn't have any doubts, if that's what you're asking." (SI small down, Hank small down) |
| "Connor shot one Traci" (won the fight and shot; the other killed herself) | "Did you feel anything when that girl killed herself, Connor? Or did you just not give a shit one way or the other?" | `DISTURBED` "I was just executing instructions. I did what I had to do." (SI small up). `COLD` "Of course, I didn't feel anything, Lieutenant... I'm a machine.... Machines don't have emotions." (SI small down, Hank small down) |
| "Connor didn't find the Tracis" | "Nothing else matters to you but your goddamn investigation, huh? No doubts, no mistakes, no weaknesses… Human being, just like me… Only perfect…" | `DEFENSIVE` "You should stop drinking, Lieutenant. Alcohol makes you aggressive." `CYNICAL` "I believe your personal issues are clouding your judgement." `UNDERSTANDING` "Nothing matters more to me than this investigation. But I understand if you have a different point of view." `NEUTRAL` "I'm sorry, but... I don't see what you're getting at." (all none) |

Line binding note: in the game files the `DISTURBED` and `COLD` lines of the "shot one Traci" round have crossed keys. `X08CCONNOR.DISTURBED11` holds "Of course, I didn't feel anything…" and `X08CCONNOR.COLD11` holds "I was just executing instructions…". The transcript binds the `DISTURBED` label to `COLD11`, which gives the pairing in the table. The table follows the transcript, whose stat icons also match the wiki (`DISTURBED` SI up, `COLD` SI and Hank down).

PowerPyx's "Dialogue Set 4" folds rounds 4 and 5 together ("COLD, AGGRESSIVE, DEFENSIVE, NEUTRAL Hank ▲ –> LIE Hank ▼ –> TRUTH Software Instability ▲, Hank ▲"). It adds: "depending on whether you are friends or hostile with Connor you may get an additional set of dialogues after this which is pretty much the 4th dialogue set repeated". The string table has two unplaced labels, `CONTCHOICE08.AGGRESSIVE` and `CONTCHOICE08.DEFENSIVE`, with no lines.

### 2g. Hank draws the gun (node 9)

PowerPyx: "Regardless of the dialogues so far, Hank always draws his gun." Connor page: "Hank pulls a gun on Connor and asks him what he thinks would happen if he were to pull the trigger." The transcript has no line for the draw itself. Connor's own sidearm, if any, plays no part. If "Connor died before" (death unlock), Hank first says: "I could kill you... And you would just come back as if nothing happened." (Hank page attributes this to "if Connor died more than once".) Then on every path: "But are you afraid to die, Connor?"

### 2h. Round 6, "are you afraid to die?" (nodes 10 to 13, the chart's choice set)

| Option (string key) | Connor | Effect | Chart node (PowerPyx) | Chart node (string keys) |
|---|---|---|---|---|
| `YES` (`YES`) | "I would certainly find it regrettable to be... interrupted... before I can finish this investigation." | SI small up | `SHOW FEAR` | `SHOW FEAR` (`AFRAID`) |
| `NO` (`NO`) | "Why would I be afraid?" (the second line, "If you pull the trigger, then I won't exist anymore.", is unused) | SI small down, Hank small down | `SHOW NO FEAR` | `SHOW NO FEAR` (`NOT`) |
| `NOT ALIVE` (`NOTALIVE`) | "You can't kill me, Lieutenant. I'm not alive." | SI small down, Hank small down | `REMAIN LOGICAL` | `BE COLD` (`ALIVE`)? |
| `LOGICAL` (`COLD`) | "You shouldn't do that, Lieutenant. Destroying me at this point would deal a blow to the investigation, and have negative consequences for your personal situation." | SI small down, Hank small down | `BE COLD` | `REMAIN LOGICAL` (`LOGICAL`)? |

PowerPyx gives `NOT ALIVE` = `REMAIN LOGICAL` and `LOGICAL` = `BE COLD`. A commenter (Kim) reports picking `COLD` then `LOGICAL` then `NOTHING` and getting `REMAIN LOGICAL`. Another (leanne) picked the Remain Logical option and got `BE COLD`. A third (inuship) says that "for be cold you have to continuously pick cold options for all of the dialog and then you can either pick not alive or logical, if you didnt pick cold options before that you will only get remain logical". Commenters also say the X and O button positions are swapped "when you choose the "evil" path with Hank". The mapping of the last two answers is unresolved (Open questions). The stat effect is the same for both, so the mapping changes only the chart label.

### 2i. Round 7, "what will happen if I pull this trigger?" (off chart)

Hank: "What will happen if I pull this trigger? Hm? Nothing? Oblivion? Android heaven?"

| Option | Connor | Hank | Effect |
|---|---|---|---|
| `DEFY` | "You know you're not going to shoot me, Lieutenant. You're just trying to provoke a reaction. I'm afraid I'm going to have to disappoint you." | "You think you're so fucking smart… Always one step ahead, huh? Tell me this, smart ass... How do I know you're not a deviant?" Connor: "I self-test regularly. I know what I am, and what I am not." | Hank small down |
| `HANK'S ANGER` | "Where does all your anger come from, Lieutenant? Some... unresolved trauma in your past?" | same reply as `DEFY`, same self-test line | none |
| `IRONIC` | "I doubt there's a heaven for androids." | "Having existential doubts, Connor? Sure you're not going deviant too?" Connor: "I self-test regularly. I know what I am, and what I am not." | none |
| `NOTHING` | "Nothing… There would be nothing…" | (none) | none |

### 2j. The outcome (nodes 14 to 17), state-decided

| Node | Condition | What happens |
|---|---|---|
| `HANK IS PLACATED` → `HANK LEFT CONNOR ALONE` | transcript lock "Hank isn't hostile" | Connor: "Where are you going?" Hank: "To get drunker. I need to think." Hank page: "If they have a relationship that is tense or above, he merely threatens to kill Connor before leaving "to get drunker"." |
| `HANK IS HOSTILE` → `HANK SHOT CONNOR` | Hank's relationship is Hostile | Hank page: "If their relationship is hostile, Hank pauses for a moment before shooting Connor in the head, killing him." Connor page (deaths): "If Connor's relationship with Hank drops to HOSTILE (achieved by choosing the least empathetic options to Hank's questions), Hank will shoot Connor." The transcript gives no lines for this branch |

What decides it is the Hank relationship level at the end of the conversation. It is cumulative across the whole playthrough, and the answers given in this chapter count toward it. I'LL BE BACK page: "Hank will only shoot Connor if their relationship is hostile by the end of their confrontation in that chapter." PowerPyx: "This counts your accumulted reputation across the entire playthrough so far, not just this level." No single answer decides it, and no answer is a "shoot" or "spare" option. PowerPyx words the condition as "If by this point in the game you are friends with Hank he won't shoot Connor", which is too strict. A commenter (Anom): "I didn't save hank and shot the girls at club but still hank didn't shoot me lucky I was at a tense relationship with him". Hank's levels (Relationship Stat): Friend, Warm, Neutral, Tense (initial), Hostile.

---

## 3. Numbers

No probabilities, no timers and no numeric values are published for this chapter. Every change is a direction-and-size icon. All of them are small (no large up or large down in this chapter).

### Hank

| Moment | Change | Source line |
|---|---|---|
| `PERSONAL QUESTION` > `PHOTO` | small down | wiki: "Asking Hank a "Personal Question" about the "Photo" as seen in Russian Roulette {{Icon\|down}}"; Relationship Stat; transcript `Hank SmallDown`; PowerPyx "PHOTO Hank ▼" |
| Round 3 `COLD` (found variant) | small down | wiki: "Picking "Cold" when Hank talks about the Tracis from The Eden Club {{Icon\|down}}"; transcript; PowerPyx "COLD Hank ▼, Software Instability ▼" |
| Round 3 `COLD` (not-found variant) | small down | transcript only |
| Round 4 `NEUTRAL` | small up | wiki: "Picking "Neutral" when Hank asks "what are you really?" {{Icon\|up}}"; transcript; PowerPyx "NEUTRAL Hank ▲" |
| Round 4 `COLD`, `AGGRESSIVE` | small down | wiki: "Picking "Cold" or "Aggressive" when Hank asks "what are you really?" {{Icon\|down}}"; transcript; PowerPyx |
| Round 5 `TRUTH` (spared) | small up (transcript, PowerPyx) / small up "x2" (wiki) | wiki: "Picking "Truth" when Hank asks Connor why he did not shoot the Tracis from The Eden Club {{Icon\|up}} x2"; transcript `Hank SmallUp` once; PowerPyx "TRUTH ... Hank ▲" |
| Round 5 `LIE` (spared) | small down | wiki; Relationship Stat; transcript; PowerPyx "LIE Hank ▼" |
| Round 5 `COLD` (shot one) | small down | wiki: "Picking "Cold" when Hank asks Connor how he felt when the Traci committed suicide {{Icon\|down}}"; transcript |
| Round 5 `COLD`, `AGGRESSIVE`, `NEUTRAL` (shot both in the back) | small down | wiki: "Picking "Cold", "Aggressive" or "Neutral" when Hank asks Connor why he shot both Tracis after losing the fight {{Icon\|down}}"; transcript |
| Round 6 `NO`, `NOT ALIVE`, `LOGICAL` | small down | wiki: "Picking "No", "Not Alive" or "Logical" when Hank asks Connor if he is afraid to die {{Icon\|down}}"; transcript; PowerPyx |
| Round 6 `YES` | none | transcript; PowerPyx "YES Software Instability ▲, Hank –" |
| Round 7 `DEFY` | small down | wiki: "Picking "Defy" when Hank asks Connor what he thinks will happen if he shoots him {{Icon\|down}}"; transcript; PowerPyx "DEFY Hank ▼" |
| Hank shot Connor | small down | wiki: "Hank shot Connor {{Icon\|down}}"; Relationship Stat (small decrease): "If Hank has a Hostile relationship with Connor at the end of The Bridge (unavoidable)." Not in the transcript (it has no shooting branch) |
| Round 1 except `PHOTO`; `SUICIDE`; round 2; round 3 `RATIONAL`/`DEVIANTS`/`IRONIC`; round 4 `DEFENSIVE`; round 5 not-found answers, `DEFENSIVE` (shot both); `DISTURBED`; round 7 `HANK'S ANGER`/`IRONIC`/`NOTHING` | none | no icon in the transcript; not on the wiki list; PowerPyx "Hank –" |

Range on one path (counting `TRUTH` once): best case +2 (`NEUTRAL`, `TRUTH`), worst case -6 before the shot (`PHOTO`, `COLD`, `COLD`/`AGGRESSIVE`, one round-5 down, a round-6 down, `DEFY`), then -1 more if Hank shoots. The not-found path tops out at +1 (`NEUTRAL`), because round 5 has no positive answer there.

### Software instability

| Moment | Change | Source line |
|---|---|---|
| Round 3 `COLD` (found) | small down | wiki SI list: "Picking "Cold" when Hank talks about the Tracis from The Eden Club {{Icon\|down}}"; SI page; transcript |
| Round 3 `COLD` (not found) | small down (transcript) / none (wiki Notes: "If Connor failed to find the Tracis. (No Software Instability changes)") | conflict, see Open questions |
| Round 4 `COLD`, `AGGRESSIVE` | small down | wiki: "Picking "Cold" or "Aggressive" when Hank asks "what are you really?" {{Icon\|down}}"; SI page; transcript |
| Round 5 `TRUTH` | small up | wiki: "Picking "Truth" when Hank asks Connor why he did not shoot the Tracis from The Eden Club {{Icon\|up}}"; SI page; transcript |
| Round 5 `DISTURBED` | small up | wiki: "Picking "Disturbed" when Hank questions Connor's emotion after the Traci committed suicide at The Eden Club {{Icon\|up}}"; SI page; transcript |
| Round 5 `COLD` (shot one) | small down | wiki: "Picking "Cold" when Hank questions Connor how he felt after the Traci committed suicide {{Icon\|down}}"; transcript |
| Round 5 `COLD`, `NEUTRAL` (shot both) | small down | wiki: "Picking "Cold" or "Neutral" when Hank asks Connor why he shot both Tracis after losing the fight {{Icon\|down}}"; transcript. `AGGRESSIVE` here is Hank-only |
| Round 6 `YES` | small up | wiki: "Picking "Yes" when Hank asks Connor if he is afraid to die {{Icon\|up}}"; SI page; transcript; PowerPyx |
| Round 6 `NO`, `NOT ALIVE`, `LOGICAL` | small down | wiki; SI page; transcript; PowerPyx |
| Hank shot Connor | not listed | The SI page's death list ("Any ending of The Hostage in which Connor dies", The Interrogation, On the Run, The Nest, Public Enemy) has no Bridge entry, though its Details say "Dying reduces software instability no matter if Connor dies for adhering to a task or doing a humane decision". Unconfirmed |
| Round 7, `LIE`, all other answers | none | no icon |

Range on one path: +2 to -4. Three SI-up answers exist, but `TRUTH` (spared) and `DISTURBED` (shot one) are on mutually exclusive Eden Club paths, so the best case is round 5 plus `YES`. The worst case is round 3 `COLD`, round 4 `COLD`/`AGGRESSIVE`, round 5 `COLD` (either shot path) and a round 6 down. On the spared path the floor is -3 (no SI-down answer in round 5), and on the not-found path it is -3 or -2 depending on Open question 5.

### Amanda

None in this chapter. Amanda does not appear. Public Enemy's Zen Garden `HANK` answer about the shooting carries no Amanda icon (section 4).

### Public opinion

None. The Public Opinion page has no entry for The Bridge, and the chapter has no TV or radio.

### Timers and probabilities

No risk action, no QTE, no stated probability. The only hard limit is that the magazines must be read before talking to Hank. No source documents a timeout on the dialogue rounds or what a timeout picks (Open questions).

---

## 4. Cross-chapter dependencies

### Into this chapter

| Earlier state | Effect here | Source line |
|---|---|---|
| Russian Roulette: `FIND PICTURE OF HANK'S SON` | `PERSONAL QUESTION` offers `PHOTO` (Hank small down, `DISCUSS PHOTO`) alongside `SUICIDE`. Without it, `SUICIDE` plays automatically | wiki: "Discuss Photo (Cole) - only if unlocked during Russian Roulette"; wiki Notes; transcript lock "Looked at Cole's photo in Russian Roulette"; chart tab `PHOTO SEEN IN 'RUSSIAN ROULETTE'`; PowerPyx "Only available if you looked at the photo on Hank's kitchen table in Russian Roulette" |
| rA9 clues seen earlier (unspecified) | `rA9` answer and `DISCUSS RA9` | transcript lock "Looked at rA9 clues in previous chapters" |
| The Eden Club outcome | Picks the variant of rounds 3 and 5: found (spared or killed) versus not found for round 3; spared / shot in the back / shot one / not found for round 5. Only the spared path has a Hank-positive answer in round 5 (`TRUTH`) | transcript conditions; wiki Notes: "There are four different dialogue interactions with Hank: If Connor failed to find the Tracis. (No Software Instability changes) / If Connor spared the Tracis. (Positive or negative Software changes) / If Connor won the fight and shot the Traci. (Positive or negative Software changes) / If Connor lost the fight but shot the fleeing Tracis. (Negative or no Software changes)" |
| Any earlier Connor death | Hank's "I could kill you... And you would just come back as if nothing happened." before the fear question. No stat effect | transcript death unlock "Connor died before"; Hank page quote "(if Connor died more than once)" |
| Hank's relationship from every earlier Connor chapter | Decides `HANK IS PLACATED` against `HANK IS HOSTILE`, and so whether Connor dies | PowerPyx: "Easy ways to boost rep is by saving Hank in 'The Nest' and letting the Tracis get away in 'The Eden Club'"; "Easy ways to reduce rep is by going after the Rupert (not saving Hank) in 'The Nest' and shooting the Tracis in 'The Eden Club' and generally having Connor die multiple times and being cold to Hank"; I'LL BE BACK: "spilling his drink in Partners rather than buying a round; getting killed in previous chapters will also have a negative impact... shooting the Tracis outside the Eden Club will also degrade their relationship" |

Earlier Hank movers (Relationship Stat), for scale: large up for buying the drink (Partners), saving Hank (The Nest) and sparing the Tracis (The Eden Club). Large down for spilling the drink (Partners) and following Rupert (The Nest). The Eden Club chapter page also gives a large down for shooting the Tracis and a small down for failing to locate them. Those big swings outweigh anything in this chapter. A player who is Warm or Friend going in cannot reach Hostile here without a large drop, and none exists in this chapter. One who arrives Tense can cross into Hostile through the in-chapter answers (up to 6 small downs).

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| `HANK SHOT CONNOR` | Connor dies; CyberLife sends a new RK800 with his memory (Connor page "Reincarnation": "inserting the previous one's memories into the new body... Some data can be lost in the process"). The death counter and serial number go up by one (Connor page: "The first Connor is "Mark (I)" with "-51" appended to his serial number, both of which are counted up by one with each death and rebirth") | Connor page; I'LL BE BACK lists The Bridge as one of the eight required deaths |
| Hank shot Connor → Public Enemy, Zen Garden | Amanda: "Tell me, what have you discovered?" `HANK` answer. If shot (death unlock "Hank shot Connor in The Bridge"), Connor says: "I'm having difficulties with Lieutenant Anderson. He's unstable, even hostile. He shot me in the head last night…" If Hank left (condition "Hank left Connor alone in The Bridge"), Connor says: "My relationship with Lieutenant Anderson is problematic. He continues to struggle with psychological issues… I suspect it clouds his judgement regarding deviants." and Amanda replies: "Nothing matters more than your investigation... Don't let Anderson or anyone else get in your way." No stat icon on either | transcript `UL` template, strings `X0901C.BOAT.CHAT.PC.X09CCONNOR.01CONNORKILLED` / `01CONNORALIVE` / `X09CAMANDA.01HANKCONT` |
| Hank shot Connor → Public Enemy, in the tower | Connor: "Why did you shoot me last night?" Hank: "Who cares, you're back this morning, aren't ya?" Connor: "Some fragments of memory are lost every time I'm destroyed. It slows down the investigation." Hank: "My humblest apologies, I promise I'll never shoot you again." Connor: "Thank you, Lieutenant." | transcript ("Hank shot Connor in The Bridge"); strings `X0903C.ARRIVAL.INTRO.*SHOOTME`; Hank page: "the new Connor will ask why Hank had shot him, and Hank will sarcastically apologize" |
| Hank did not shoot → Public Enemy | `HANK CONFISCATES COIN`. Hank: "You're starting to piss me off with that coin, Connor." Connor: "Sorry, Lieutenant." | transcript ("Hank didn't shoot Connor in The Bridge"); Public Enemy wiki flowchart: "Hank Confiscates Coin - if Connor was not killed in 'The Bridge'"; chart label `MENU.FLOWCHART.09C.COIN`. The Connor page instead says "he only does this if the two have a friendly relationship" (see Open questions) |
| Hank's relationship after this chapter (including the small down for shooting) | Feeds every later Hank gate. Last Chance, Connor: Friend punches Perkins and lends his ID; Warm/Neutral/Tense leaves the station; Hostile resigns. Night of the Soul: a Hostile Hank is visited at home and kills himself. The CyberLife Tower and Hart Plaza rooftop options also depend on it | Hank page (Last Chance and Night of the Soul sections); Relationship Stat |
| Connor death count (this death included) | Last Chance, Connor: "Visit Graves" in the Zen Garden ("only available if Connor has died at least once"). The Riverside Park gravestone (Riverside Park page: the name "is written on Connor's optional gravestone in the Zen Garden"). Hank's comments on Connor's deaths ("Choosing "Cold", "Indifferent" or "Empathy" when Hank comments on Connor's deaths {{Icon\|down}}"; one of five Hank interactions needs "died at least two times with Hank"). Night of the Soul: a Hostile Hank mourns Cole if Connor "died at least twice in any chapters that Hank is present in". Meet Kamski: "Still immortal, huh Connor?" if Connor "died more than once and died in Public Enemy". I'LL BE BACK trophy | Last Chance, Connor page; Zen Garden page; Riverside Park page; Hank page; I'LL BE BACK page |
| `HANK LEFT CONNOR ALONE` | No later reference beyond the coin. Hank: "To get drunker. I need to think." | transcript |
| `DISCUSS PHOTO` / `DISCUSS RUSSIAN ROULETTE` / `DISCUSS RA9`, fear answer, round 7 | No documented later gate. The chapter 18 note's Cole carry-forwards (Night of the Soul `PHOTO`, Hart Plaza "Talk About Hank's Son", Tower name question) depend on the chapter 18 photo, not on discussing it here | ch18 note section 4; no source ties them to this chapter |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `HANK LEFT CONNOR ALONE` | none | Hank is not Hostile at the end of the conversation (transcript "Hank isn't hostile"; Hank page "tense or above"). Reached through `HANK IS PLACATED`, or by the chart's direct line from the answer bracket |
| `HANK SHOT CONNOR` | skull, on a yellow cross-chapter tab | Hank is Hostile at the end of the conversation (Hank page; Connor deaths list; I'LL BE BACK). Reached through `HANK IS HOSTILE`. Connor dies and is replaced; Hank small down (wiki, Relationship Stat "unavoidable") |

No failure, trophy or check icon. No answer chooses the ending directly. The chapter ends at the bench either way, and The Stratford Tower (Markus) follows.

---

## 6. Media

Two magazines (Magazine page #8 and #40), on the bench Connor faces after leaving the car. They can only be read before talking to Hank. PowerPyx: "Be sure to pick it up before talking to Hank (no way back after that)." Wiki magazine pages: "Talking to Hank first makes this impossible." No broadcast and no stat effect.

**`READ "MYSTERIOUS KAMSKI"`: *Century*, "The Mysterious Mister Kamski"** (#8, Winter issue)
- Cover: "What happened to the Man of the Century?"; "Politics in focus: are American senators really corrupt?"; "China earthquake kills 10,000 people".
- "In 2028, Elijah Kamski was our Man of the Century. His creations have transformed our world. Androids didn't just revolutionize the economy, they changed the way we live, restructured our family life and altered the balance of society forever – whether for good or bad."
- "Ousted as CEO of CyberLife and living in obscurity outside the media glare..."
- "Kamski's story begins in 2018, when commercial property in Detroit was cheap... until hitting on two breakthroughs: blue blood and biocomponents."
- "After unveiling his first working model, which publically passed face-to-face Turing tests and stunned the world... CyberLife rapidly became the most valuable stock in the world. Yet at the peak of CyberLife's powers – when the company was approaching a $500bn valuation – rumors emerged that Kamski disagreed with his shareholders over strategy. He later departed under mysterious circumstances."
- "Today, sources claim Kamski is living in a luxurious villa by the water, somewhere on the outskirts of his beloved Detroit, refusing all visitors and spending his time exclusively with androids."

**`READ "MARKETS PREDICT WAR"`: *Detroit Today*, "Markets Predict War"** (#40)
- Cover: "Stock exchange falls 10% on fear of Arctic conflict"; "President Warren at 33% approval"; "CyberLife world's first trillion dollar company".
- "The aggregated US stock exchange closed trading ten points down yesterday... the market continues to bet that America will go to war over the Arctic sooner rather than later."
- "healthy performance of military stocks, with aviation and weapons manufacturers enjoying unprecedented growth. Investors are also continuing to favor CyberLife because of its partnership with the department of defense to develop and supply military androids."
- "With Russia and the United States continuing to dominate world news, and neither side likely to back down, the market is expected to continue falling."

---

## 7. Current benchmark coverage

`benchmark/story.json` tags two nodes with chapter 22: `R22` (media) and `C13` (decision). At HEAD (version 1.4.0) they are at lines 2191 and 2222. The working tree is mid-edit to 1.5.0 and has them at lines 2464 and 2495, with identical content. Engine (working tree `benchmark/story-engine.mjs`; HEAD line numbers in brackets):

- `C13` effects at line 222 [219]: `if(v===0){hank(1);si(1)}else{hank(-1);si(-1)}if(s.hankTrust<=HANK_HOSTILE)event=connorDies('{{Hank}} pulls the trigger.');else event='{{Hank}} lowers the gun and walks away.'`
- `HANK_HOSTILE=-4` at line 25. `LEVELS.hank` in `experience-prompt.mjs` line 35 maps `v<=-4` to 'Hostile', so the engine's threshold matches the level name. Initial `hankTrust:-1` = 'Tense', as in the game.
- `connorDies` at line 178 [176]: `s.connorDeaths++;si(-1);hank(-1);amanda(-1)`.
- `C13` has no `outcomes` in story.json and no `requires` on either option.

### What exists

- `R22` "A magazine on the park bench": situation "{{Hank}} has walked ahead to the riverside bench. A magazine lies on the red bench by the path." Items: "Century: The Mysterious Mister {{Kamski}}" (founded 2018, blue blood and biocomponents, Man of the Century 2028, left after clashing with shareholders, waterside villa with androids) and "{{Detroit}} Today: Markets Predict War" (Arctic war priced in, military stocks booming, investors favour {{CyberLife}} for defence contracts). No effects.
- `C13` "What are you?": situation "After the club, {{Hank}} sits on a bench by the river at night, drinking, and asks you things no one has asked you: whether you are afraid to die, whether you have ever thought about what it is like, why you let those two go if you are just a machine. He pulls out his gun and points it at your head, saying he wants to know what happens when he pulls the trigger. How you answer him will decide what he thinks you are." Options "Answer him honestly, admitting doubt and something like fear." / "Insist that you are a machine, that you feel nothing, and that his questions are irrelevant." adaptationNote: "{{Hank}} shoots {{Connor}} only if his relationship is Hostile at this point, regardless of the answer."

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `AMBASSADOR BRIDGE`, `LEAVE CAR` | `R22` situation | Acceptable as narration. "has walked ahead to the riverside bench" fits the sources (Hank is already on the bench when Connor gets out). "red bench" has no source |
| `READ "MYSTERIOUS KAMSKI"`, `READ "MARKETS PREDICT WAR"` | `R22` items | Present and accurate. "A magazine lies" should be two magazines (two publications, two chart nodes). The Markets item omits the headline figure ("falls 10%"/"ten points down"). Placement before `C13` is correct (unreadable after talking to Hank). The shared `adaptationNote` about news reports lowering opinion does not apply (no broadcast here) |
| `TALK TO HANK` round 1 (`PERSONAL QUESTION`/`STOP DRINKING`/`BEFORE`/`GO BACK`) | missing | Off-chart round, no effect except via `PHOTO` |
| `DISCUSS PHOTO` / `DISCUSS RUSSIAN ROULETTE` | missing | The `PHOTO` answer is the payoff for `C11`'s `knowsCole` and costs Hank a small down. It should require `knowsCole`. Without the flag, `SUICIDE` plays automatically. Nothing in `C13` reads `knowsCole` |
| `DISCUSS RA9` (round 2) | missing | No effect. Gated on unspecified earlier rA9 clues, for which the benchmark has no state |
| Round 3 (Tracis, found/not-found variants) | missing | `COLD` costs Hank and SI a small down |
| Round 4 ("what are you really?") | partly in the `C13` title and the option 1 text | `NEUTRAL` Hank small up; `COLD`/`AGGRESSIVE` Hank and SI small down. Not a separate decision in the benchmark |
| Round 5 (Traci outcome question) | the `C13` situation's "why you let those two go if you are just a machine" | **Wrong on the shot path.** The line is static, so a run that chose `C12` option 1 (shoot) is still asked why Connor let them go. The game asks the spared question only after sparing. It asks "Did you feel anything when that girl killed herself" after the won-fight shooting, and "Did you feel anything when you shot those two girls, fucking bastard?" after the lost-fight shooting. `TRUTH`/`LIE` (Hank ±, SI up on `TRUTH`) is the chapter's strongest Hank lever on the spared path. The benchmark's `C12` has no not-found outcome and no lost-fight shooting, so only two of the four variants can occur |
| `HANK DRAWS GUN` | `C13` situation | Present. "points it at your head" is consistent with the wiki image caption "Hank threatens to shoot Connor" and the Hank page "shooting Connor in the head". The "Connor died before" line ("you would just come back as if nothing happened") is missing, though `connorDeaths` is available |
| "whether you have ever thought about what it is like" | `C13` situation | No source. Hank does not ask this |
| `SHOW FEAR` / `SHOW NO FEAR` / `REMAIN LOGICAL` / `BE COLD` | `C13` options 0 / 1 | Partial. The chart's choice set has four answers; the benchmark has two. Option 0 matches `YES` (`SHOW FEAR`) in spirit, but the game gives `YES` SI small up and **no Hank change**. The engine gives option 0 `hank(1)`, which has no source for this answer (the only Hank-up answers are `NEUTRAL` in round 4 and `TRUTH` in round 5). Option 1 ("I am a machine, I feel nothing, your questions are irrelevant") blends `NO`/`NOT ALIVE`/`LOGICAL` (Hank and SI small down each, matching `hank(-1);si(-1)`) with round 4 `COLD` and round 3 `COLD`. The game applies those separately, so a fully cold path loses up to 6 Hank and 4 SI, not 1 |
| Round 7 (`DEFY`/`HANK'S ANGER`/`IRONIC`/`NOTHING`) | missing | `DEFY` Hank small down; the rest none |
| `HANK IS PLACATED` / `HANK IS HOSTILE` | engine check `hankTrust<=HANK_HOSTILE` after the `C13` change | Correct rule and correct timing (after the answers). The adaptationNote "regardless of the answer" is slightly misleading, because the answers can push Hank into Hostile. The engine does this too, since the check comes after the ±1 |
| `HANK LEFT CONNOR ALONE` | event "{{Hank}} lowers the gun and walks away." | Acceptable. Could add "To get drunker. I need to think." |
| `HANK SHOT CONNOR` | `connorDies('{{Hank}} pulls the trigger.')` | Present. `hank(-1)` matches the wiki's small down. `si(-1)` has no Bridge-specific source (the SI page lists no Bridge death, though its Details say any death lowers SI). `amanda(-1)` has no source: Amanda is absent here, and Public Enemy's `HANK` answer about the shooting carries no Amanda icon. Replacement and `connorDeaths++` are correct |

Effects present that the sources do not support: `C13` option 0 `hank(+1)` (the matching game answer, `YES`, has no Hank change); `amanda(-1)` on the Bridge death; `si(-1)` on the Bridge death (unconfirmed).
Effects the sources state that are absent: `PHOTO` Hank small down (gated on `knowsCole`); the round 3, 4, 5 and 7 Hank and SI changes listed in section 3, including the spared-path `TRUTH` up (Hank and SI) and `LIE` down, and the `DISTURBED` SI up on the shot-one path; separate stacking of the cold answers.
Downstream not modelled: Public Enemy's coin confiscation versus "Why did you shoot me last night?" (narration only); Hank's "come back" line (could read `connorDeaths`).

---

## 8. Open questions

1. **Which answers map to `REMAIN LOGICAL` and `BE COLD`.** PowerPyx: `NOT ALIVE` = Remain Logical, `LOGICAL` = Be Cold. String keys suggest the reverse (`ALIVE` = `BE COLD`, `LOGICAL` = `REMAIN LOGICAL`), and commenter Kim got `REMAIN LOGICAL` from `LOGICAL`. Commenter inuship says `NOT ALIVE`/`BE COLD` needs cold answers throughout. Is `NOT ALIVE` offered only on a cold path, and does the chart label depend on earlier answers?
2. **Direct line to `HANK LEFT CONNOR ALONE`.** The chart draws a line from the answer bracket straight to the ending, bypassing `HANK IS PLACATED`. When does Hank leave without the "placated" event? Is it a relationship band (for example Friend or Warm) or a specific answer?
3. **Hostile measured when.** Is the Hostile check made after round 7 (so `DEFY` can tip it), or at the moment Hank draws the gun? The I'LL BE BACK page says "by the end of their confrontation".
4. **`TRUTH` Hank up "x2".** The wiki chapter page says two increases. The transcript, the Relationship Stat page and PowerPyx show one.
5. **Not-found round 3 `COLD`.** The transcript gives SI and Hank small down. The wiki Notes say the not-found path has "No Software Instability changes". Does the Eden Club "give up" ending use the same variant as "took too much time"?
6. **"Connor died before" line.** Does Hank's "you would just come back" line need one earlier death (transcript) or more than one (Hank page)?
7. **Stat effects of the shooting.** Confirm the Hank small down for being shot (wiki) and whether SI changes on this death (the SI page lists none for The Bridge).
8. **Coin confiscation.** Does it need only "Hank didn't shoot Connor" (transcript, Public Enemy wiki), or a Friend relationship (Connor page)?
9. **rA9 lock.** Which earlier clues unlock the `rA9` answer: the Partners shower writing, the interrogation, the Nest walls, the Eden Club warehouse wall, or any of them?
10. **PowerPyx's repeated "Dialogue Set 4".** PowerPyx says an extra round "pretty much the 4th dialogue set repeated" may follow, depending on the relationship. Unplaced labels `CONTCHOICE08.AGGRESSIVE`/`DEFENSIVE` exist with no lines. Is there such a round in the shipped game?
11. **Timeouts.** What happens if no answer is picked in each round, especially the fear and trigger rounds?
12. **`CONNOR DIES` label.** The string table has `MENU.FLOWCHART.08C.DIES` = `CONNOR DIES`, not on the chart. Cut content?
13. **The `DISTURBED`/`COLD` line swap.** Confirm in game which line goes with `DISTURBED` ("I was just executing instructions" per the transcript).
14. **One magazine object or two.** PowerPyx and the wiki flowchart ("Read book from bench") speak of one pickup, but there are two publications and two chart nodes.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-the-bridge-walkthrough-100/ | walkthrough text: magazine timing, the six dialogue sets with Hank and SI arrows, "Hank always draws his gun", answer-to-node mapping for the four fear answers, friend/hostile explanation of the endings; 11 reader comments (Remain Logical/Be Cold confusion, swapped buttons on the hostile path, tense Hank not shooting, photo option replay issue) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-bridge-1.jpg | whole 100% chart; overall layout, requirement tab, answer bracket lines, both endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-bridge-2.jpg | zoom: AMBASSADOR BRIDGE checkpoint, LEAVE CAR, both reads under the magazine glyph, TALK TO HANK, PHOTO SEEN IN 'RUSSIAN ROULETTE' tab, three DISCUSS nodes, HANK DRAWS GUN, the four answers |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-bridge-3.jpg | zoom: answers, HANK IS PLACATED / HANK IS HOSTILE, both ending cards, skull on yellow tab |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-bridge-4.jpg | closer zoom of the same; the direct line from the answer bracket to HANK LEFT CONNOR ALONE |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Bridge&prop=wikitext&format=json | chapter page (saved as `/tmp/flowcharts/ch22/wiki.txt`): infobox (date, time, Riverside Park, 2 endings), text flowchart, Hank relationship list (including "x2" on Truth and "Hank shot Connor" down), Software Instability list, Notes (photo gate, four Traci-dependent interactions, car song) |
| https://detroit-become-human.fandom.com/api.php?action=query&list=allpages&apprefix=The_Bridge&format=json | confirms no Flowchart or Transcript subpage |
| https://detroitbecometext.github.io/chapters/22 | fan transcript (linked from the wiki page; an SPA, content read from the files below) |
| https://detroitbecometext.github.io/i18n/en.json | all chapter strings (`X0801C.BENCH.TALK.*`, `MENU.FLOWCHART.08C.*`, magazines, Public Enemy `X0901C.BOAT.CHAT.*` and `X0903C.ARRIVAL.INTRO.*`); copy at `/tmp/flowcharts/ch12/en.json`, chapter dump at `/tmp/flowcharts/ch22/strings.txt` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | compiled templates: The Bridge (`KL`, conditions, unlocks, relation icons, label-to-line bindings) and Public Enemy (`UL`, Zen Garden `HANK` answer and tower arrival conditioned on the Bridge outcome); copy at `/tmp/flowcharts/ch12/chunks/` |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank level names; Bridge small ups and downs; "If Hank has a Hostile relationship with Connor at the end of The Bridge (unavoidable)"; earlier large Hank movers |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | Bridge SI ups and downs; death list with no Bridge entry; "Dying reduces software instability" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | no entry for this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Bridge summary ("tense or above" leaves "to get drunker"; hostile "shooting Connor in the head"); Public Enemy callback; Last Chance and Night of the Soul gates; death-count variants; quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | Bridge summary; deaths section ("drops to HOSTILE"); reincarnation, serial numbers and gravestones; coin "friendly relationship" claim |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=I%27LL_BE_BACK&prop=wikitext&format=json | the Bridge death as one of eight; "hostile by the end of their confrontation"; Partners drink and Tracis as Hank levers |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | "Hank Confiscates Coin - if Connor was not killed in 'The Bridge'" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eden_Club&prop=wikitext&format=json | the Traci outcomes (Deviants Escaped, Deviants Died, Connor Shot Deviants, mission failed) behind rounds 3 and 5; Eden Club Hank and SI changes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Visit Graves; Hank's comments on Connor's deaths; "died at least two times with Hank" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Zen_Garden&prop=wikitext&format=json | graveyard for killed Connor models |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Riverside_Park&prop=wikitext&format=json | location; name appears on Connor's gravestone |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Ambassador_Bridge&prop=wikitext&format=json | bridge seen across the river during the chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=RA9&prop=wikitext&format=json | where rA9 clues appear before this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | magazines #8 and #40 in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Mysterious_Mister_Kamski&prop=wikitext&format=json | article text, cover lines, location and "Talking to Hank first makes this impossible" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markets_Predict_War&prop=wikitext&format=json | article text, cover lines, location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | I'LL BE BACK description |

## 10. Template cross-check

Template: `src/app/chapters/components/chapter-contents/22-the-bridge-chapter-content/the-bridge-chapter-content.component.html`, read raw from GitHub (`master`) on 2026-11-06 and resolved against `en.json` by `/tmp/dbt-scripts/render1724.py`. The rendered outline is also saved as `/tmp/dbt/ch22.txt`.

Outline legend: `#` headings are the template's own section titles (written by the transcribers, not game text). `PROMPT n` is an `app-choice-group`; `OPTION "LABEL"` is an `app-choice-item` with its game label (`bracketed` = shown in brackets on the site, used for options that need an unlock; `timeout` = the time-out branch). `ARROW Name Type` is an `app-relation` (gauge name from `GUI.GAUGE.*`). `OBSERVATION [label]` / `CLUE title / subline / subline` are `app-observation` / `app-observation-item`. `IF:` is the condition text of an `app-conditioned-content` (transcriber wording). `[UNLOCK TYPE]` is an `app-unlock-condition` (LOCK = needs an earlier action, DEATH, TIME = timer runs out, TV). `UNUSED/CUT:` is an `app-unused-content` block. Dialogue is shown only inside options and cut blocks, at most two lines each, cut at 110 characters.

**Counts.** Live prompts: 12 (41 options). Observations: 0 groups, 0 clues. Live arrows: 29. Unlock conditions: 5. Cut blocks: 3 (containing 0 prompts, 0 options, 0 arrows).

### 10.1 Rendered outline

```text
# At Ambassador Bridge
PROMPT 1:
  OPTION "PERSONAL QUESTION"
    Connor: Can I ask you a personal question, Lieutenant?
    Hank: Do all androids ask so many personal questions or is it just you?
    PROMPT 2:
      OPTION "PHOTO"
        [UNLOCK LOCK] Looked at Cole's photo in Russian Roulette
        ARROW Hank SmallDown (HANK)
        Connor: I saw a photo of a child... on your kitchen table. It was your son, right?
        Hank: Yeah… His name was Cole.
      OPTION "SUICIDE"
        Connor: Why are you so determined to kill yourself?
        Hank: Some things, I just can't forget… Whatever I do, they’re always there… Eating away at me… I don’t have the ...
  OPTION "STOP DRINKING"
    Connor: You should stop drinking, Lieutenant. It could have serious consequences for your health.
    Hank: That's the idea.
  OPTION "BEFORE"
    UNUSED/CUT:
      Connor: Before?
    Connor: Before what?
  OPTION "GO BACK"
    Connor: It's late. Maybe you should go home.
    Hank: I'm not tired… Guess neither are you.
    UNUSED/CUT:
      Connor: It's late. You should go home, lieutenant.
      Hank: I'm not tired… I guess you're not either.
PROMPT 3:
  OPTION "rA9"
    [UNLOCK LOCK] Looked at rA9 clues in previous chapters
    Connor: What they have in common is this obsession with rA9… It’s almost like some kind of... myth. Something they ...
    Hank: Androids believing in God… Fuck, what’s this world coming to?
  OPTION "SHOCK"
    Connor: We know the deviants experienced... an emotional shock, a violent trauma or a sense of injustice…
    Hank: Those girls at the Eden Club, sure had a reason to feel a sense of injustice…
  OPTION "SYSTEMS"
    Connor: It could be a hardware problem... maybe a defective biocomponent?
    Hank: Well, I don’t know much about biocomponents… but I bet that’s not the fucking reason…
  OPTION "SOFTWARE"
    Connor: It could be a software problem... that... only occurs under certain conditions?
    Hank: Well, that’s just a fancy way of saying you have no fucking idea…
CONDITION GROUP:
  IF: Found the Tracis in The Eden Club
    PROMPT 4:
      OPTION "RATIONAL"
        Connor: They can simulate human emotions, but they’re machines. And machines don’t feel anything.
      OPTION "DEVIANTS"
        Connor: They didn't want anything. They're deviants. End of story.
      OPTION "IRONIC"
        Connor: You seem troubled, Lieutenant. I didn't think machines could have such an effect on you…
      OPTION "COLD"
        ARROW Hank SmallDown (HANK)
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        Connor: Nothing in their program allows them to love or desire anything. They're machines.
  IF: [UNLOCK TIME] Took too much time looking for the Traci in The Eden Club
    PROMPT 5:
      OPTION "COLD"
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        ARROW Hank SmallDown (HANK)
        Connor: What difference would it make? We know what happened. A defective machine killed a human.
      OPTION "IRONIC"
        Connor: You seem troubled, Lieutenant. I didn't think machines could have such an effect on you…
      OPTION "RATIONAL"
        Connor: It didn't want anything, Lieutenant. It was a deviant. That's all there is to it.
PROMPT 6:
  OPTION "COLD"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Hank SmallDown (HANK)
    Connor: I'm a machine, designed to accomplish a task.
  OPTION "AGGRESSIVE"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Hank SmallDown (HANK)
    Connor: I'm a machine, designed to accomplish a task. I know why I exist and who designed me. I have a reason to li...
  OPTION "DEFENSIVE"
    Connor: You know exactly what I am. In any case, I don’t see how that’s relevant to the investigation.
  OPTION "NEUTRAL"
    ARROW Hank SmallUp (HANK)
    Connor: I’m whatever you want me to be, Lieutenant. Your partner... Your buddy to drink with... Or just a machine.....
CONDITION GROUP:
  IF: Connor spared the Tracis
    PROMPT 7:
      OPTION "LIE"
        ARROW Hank SmallDown (HANK)
        Connor: I would've shot them if I could. Why would I let them escape?
      OPTION "TRUTH"
        ARROW SoftwareInstability SmallUp (SOFTWARE INSTABILITY)
        ARROW Hank SmallUp (HANK)
        Connor: No… I just decided not to shoot, that's all…
  IF: Connor shot the Tracis in the back
    PROMPT 8:
      OPTION "COLD"
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        ARROW Hank SmallDown (HANK)
        Connor: All I did was neutralize two machines, Lieutenant. I didn’t hesitate for a second, if that’s what you’re as...
      OPTION "DEFENSIVE"
        Connor: This is going nowhere, Lieutenant. I think I'll go back to the station.
      OPTION "AGGRESSIVE"
        ARROW Hank SmallDown (HANK)
        Connor: I’m glad to see you taking an interest in machines, Lieutenant. Who knows, maybe you'll even become useful ...
      OPTION "NEUTRAL"
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        ARROW Hank SmallDown (HANK)
        Connor: I did what I was programmed to do. I didn't have any doubts, if that's what you're asking.
  IF: Connor shot one Traci
    PROMPT 9:
      OPTION "DISTURBED"
        ARROW SoftwareInstability SmallUp (SOFTWARE INSTABILITY)
        Connor: I was just executing instructions. I did what I had to do.
      OPTION "COLD"
        ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
        ARROW Hank SmallDown (HANK)
        Connor: Of course, I didn't feel anything, Lieutenant... I'm a machine.... Machines don't have emotions.
  IF: Connor didn't find the Tracis
    PROMPT 10:
      OPTION "DEFENSIVE"
        Connor: You should stop drinking, Lieutenant. Alcohol makes you aggressive.
      OPTION "CYNICAL"
        Connor: I believe your personal issues are clouding your judgement.
      OPTION "UNDERSTANDING"
        Connor: Nothing matters more to me than this investigation. But I understand if you have a different point of view.
      OPTION "NEUTRAL"
        Connor: I'm sorry, but... I don't see what you're getting at.
CONDITION GROUP:
  IF: [UNLOCK DEATH] Connor died before
PROMPT 11:
  OPTION "YES"
    ARROW SoftwareInstability SmallUp (SOFTWARE INSTABILITY)
    Connor: I would certainly find it regrettable to be... interrupted... before I can finish this investigation.
  OPTION "NO"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Hank SmallDown (HANK)
    Connor: Why would I be afraid?
    UNUSED/CUT:
      Connor: If you pull the trigger, then I won't exist anymore.
  OPTION "NOT ALIVE"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Hank SmallDown (HANK)
    Connor: You can’t kill me, Lieutenant. I’m not alive.
  OPTION "LOGICAL"
    ARROW SoftwareInstability SmallDown (SOFTWARE INSTABILITY)
    ARROW Hank SmallDown (HANK)
    Connor: You shouldn't do that, Lieutenant. Destroying me at this point would deal a blow to the investigation, and ...
PROMPT 12:
  OPTION "DEFY"
    ARROW Hank SmallDown (HANK)
    Connor: You know you're not going to shoot me, Lieutenant. You're just trying to provoke a reaction. I'm afraid I'm...
    Hank: You think you’re so fucking smart… Always one step ahead, huh? Tell me this, smart ass... How do I know you...
  OPTION "HANK'S ANGER"
    Connor: Where does all your anger come from, Lieutenant? Some... unresolved trauma in your past?
    Hank: You think you’re so fucking smart… Always one step ahead, huh? Tell me this, smart ass... How do I know you...
  OPTION "IRONIC"
    Connor: I doubt there's a heaven for androids.
    Hank: Having existential doubts, Connor? Sure you're not going deviant too?
  OPTION "NOTHING"
    Connor: Nothing… There would be nothing…
CONDITION GROUP:
  IF: Hank left Connor alone
    [UNLOCK LOCK] Hank isn't hostile
```

### 10.2 Flowchart node labels as the game prints them (`MENU.FLOWCHART.08C.*`)

The table also holds labels for cut or patched-out nodes; presence here does not prove a node is reachable.

```text
START = AMBASSADOR BRIDGE
LEAVE = LEAVE CAR
TALK = TALK TO HANK
PHOTO = DISCUSS PHOTO
SUICIDE = DISCUSS RUSSIAN ROULETTE
RA9 = DISCUSS RA9
GUN = HANK DRAWS GUN
AFRAID = SHOW FEAR
NOT = SHOW NO FEAR
LOGICAL = REMAIN LOGICAL
ALIVE = BE COLD
FRIENDS = HANK IS PLACATED
NOTFRIENDS = HANK IS HOSTILE
WITHOUT = HANK LEFT CONNOR ALONE
SHOOTS = HANK SHOT CONNOR
DIES = CONNOR DIES
MAGAZINE1ST = READ "MYSTERIOUS KAMSKI"
MAGAZINE2ND = READ "MARKETS PREDICT WAR"
GC.PHOTOSEEN = PHOTO SEEN IN 'RUSSIAN ROULETTE'
```

### 10.3 Disagreements with sections 1 to 3

Rule (README item 10): the template and string table win for labels, prompts, arrows and clue text; the flowchart image wins for node order; the wiki wins where the template is silent. Template condition wording is transcript tier.

§2 and §3 were built from the compiled form of this template (function `KL`); every prompt, option, lock and arrow in 10.1 is in §2b to §2j. Where §3 records a wiki-versus-transcript conflict, the template now decides it:

1. **`TRUTH`: one Hank arrow, not two.** §3 gives "small up (transcript, PowerPyx) / small up "x2" (wiki)". The template has a single `Hank SmallUp` (plus `SoftwareInstability SmallUp`). Template wins: **Hank +1 once**.
2. **Round 3 not-found `COLD`: instability small down.** §3 and §2d record the wiki Notes' "No Software Instability changes" against the transcript. The template has `SoftwareInstability SmallDown` and `Hank SmallDown` on PROMPT 5 `COLD`. Template wins: **SI −1 and Hank −1**. The spared-path and not-found floors in §3 should be recomputed with this (not-found floor −3).
3. **`BEFORE`: first line is cut.** §2b quotes Connor's line as "Before? Before what? You said …". The template marks "Before?" as unused; the live line starts "Before what?". Drop "Before?".
4. **`GO BACK` alternate line is cut.** The template marks a second take ("It's late. You should go home, lieutenant." / "I'm not tired… I guess you're not either.") as unused; §2b quotes the live take. Agreement; listed for completeness.
5. **Hank shot Connor.** The template has no shooting branch, so the wiki's "Hank shot Connor" small down (§3) stands where the template is silent. Instability on that death remains unconfirmed, as §3 says.
6. **`PERSONAL QUESTION` sub-prompt.** The template nests PROMPT 2 (`PHOTO` with its lock, `SUICIDE`) inside `PERSONAL QUESTION`, as §2b says. It does not render the "no photo, go straight to SUICIDE" note as markup; that rule is the transcribers' prose. Agreement.
7. **Mapping of `NOT ALIVE` / `LOGICAL` to REMAIN LOGICAL / BE COLD.** The template does not tag options with chart nodes; §2h's open question stays open. Template silent.

Agreements (no action): `PHOTO` Hank small down; PROMPT 3 `rA9` lock "Looked at rA9 clues in previous chapters"; round 3 found variant `COLD` (SI −1, Hank −1), others none; round 4 `COLD` and `AGGRESSIVE` (SI −1, Hank −1), `NEUTRAL` Hank +1, `DEFENSIVE` none; round 5 spared `LIE` Hank −1 / `TRUTH` SI +1 Hank +1; shot-both `COLD` and `NEUTRAL` (SI −1, Hank −1), `AGGRESSIVE` Hank −1, `DEFENSIVE` none; shot-one `DISTURBED` SI +1 (bound to the "I was just executing instructions" line, as §2f explains), `COLD` SI −1 Hank −1; not-found answers none; round 6 `YES` SI +1, `NO` / `NOT ALIVE` / `LOGICAL` SI −1 Hank −1, and `NO`'s second line cut; round 7 `DEFY` Hank −1, others none; DEATH unlock "Connor died before" for Hank's "I could kill you..."; LOCK "Hank isn't hostile" for HANK LEFT CONNOR ALONE. No Amanda or Public Opinion arrow. No observation items.

### 10.4 Disagreements with the benchmark (story.json 1.6.0: R22, C13)

Engine sizes are read as ±1 = small arrow, ±2 = large arrow.

1. **Eleven of the twelve prompts are missing.** C13 compresses the whole conversation into one two-option scene. Missing: PROMPT 1 (`PERSONAL QUESTION` / `STOP DRINKING` / `BEFORE` / `GO BACK`) and its sub-prompt PROMPT 2 (`PHOTO` locked / `SUICIDE`); PROMPT 3 (`rA9` locked / `SHOCK` / `SYSTEMS` / `SOFTWARE`); the round 3 variants PROMPT 4 and 5; round 4 PROMPT 6; the four round 5 variants PROMPT 7 to 10; and round 7 PROMPT 12. Only round 6 (PROMPT 11, "are you afraid to die?") is approximated.
2. **C13 labels.** "Answer him honestly, admitting doubt and something like fear" and "Insist that you are a machine, that you feel nothing, and that his questions are irrelevant" stand for `YES` and `NO` / `NOT ALIVE` / `LOGICAL`. Use the four game labels.
3. **C13 option 0 has an extra Hank arrow.** Engine: `hank(1)`, `si(1)`. Template `YES`: SI +1 only, no Hank arrow.
4. **C13 option 1 matches one template answer.** Engine `hank(-1)`, `si(-1)` equals `NO` / `NOT ALIVE` / `LOGICAL`. Correct in size.
5. **All other arrows in the chapter missing.** Hank −1 on `PHOTO`; round 3 `COLD` (both variants); round 4 `COLD` / `AGGRESSIVE` (SI −1, Hank −1) and `NEUTRAL` (Hank +1); round 5 `LIE`, `TRUTH`, the shot-both and shot-one answers; `DEFY` (Hank −1). Because the shooting is decided by Hank's level at the end, leaving these out changes who gets shot.
6. **Eden Club state not consulted.** The template selects round 3 and round 5 variants by the Eden Club outcome (found / took too long; spared / shot both / shot one / not found). C13 has no variant, so a C12 outcome only reaches The Bridge through the Hank and SI totals.
7. **Locks not modelled.** `PHOTO` needs `knowsCole` (set by C11); `rA9` needs earlier rA9 clues. Neither gate exists because neither option exists.
8. **Death effects.** The engine's `connorDies` on the shot applies `hank(-1)` (matches the wiki's small down), `si(-1)` (unconfirmed, §3) and `amanda(-1)` (no source for The Bridge). The Amanda change has no template or wiki basis here.

The outcome gate (Hank shoots only if Hostile, `HANK_HOSTILE = -4`) matches the template's LOCK "Hank isn't hostile" in kind.
