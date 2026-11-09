# Chapter 9: The Interrogation (Connor)

Research note for rebuilding the chapter's scenes. Written 2026-11-06 from the PowerPyx 100% flowchart screenshots, the wiki's own flowchart screenshot, the Fandom wiki chapter page (wikitext via the MediaWiki API), the wiki stat, character, trophy and later-chapter pages, and the community transcript at detroitbecometext.github.io (chapter 9), whose bundled string table (`i18n/en.json`, keys `X0401C.*`, `MENU.FLOWCHART.04C.*`, `MENU.OBSERVATION.04C.*`, `THOUGHTS.0401C.*`, `GUI.STRESS.*`) carries the game's own button labels and flowchart node strings. Working files are in `/tmp/flowcharts/ch09/` (not committed). The wiki has no `The_Interrogation/Flowchart` subpage and no `The_Interrogation_(Transcript)` page (both return `missingtitle`); the chapter page is marked `{{Stub}}` and its Detailed Walkthrough reads "TBA".

Game date and time on the wiki infobox: November 6, 2038, 12:41AM. Location: Detroit Police Department Central Station. Objective: "Extract confession". Wiki: "This chapter has four different outcomes." (`|endings=4`). Next chapter: Fugitives (or From the Dead).

Characters in the scene: Hank, Detective Gavin Reed, Officer Chris Miller, Carlos Ortiz's HK400 ("Carlos' Android"). The string table still uses early names (Gavin = `CURTIS`, Chris = `HARVEY`/`CHAD`); the shipped dialogue says "Chris".

---

## 1. Flowchart transcription

Read from `Detroit-The-Interrogation-1-012.jpg` (whole chart), `-2-013.jpg` (start and Interrogation Room), `-3-014.jpg` (approach section), `-4-015.jpg` (Chris Intervenes to endings) and `-5-011.jpg` (flashback/self-destruct to endings), cross-checked against the wiki's own screenshot (`The_Interrogation_Flowchart_-_Detroit_Become_Human.jpg`) and the game's flowchart strings (`MENU.FLOWCHART.04C.*`). All three show the same node set.

Chart header: PowerPyx shows only `100% COMPLETED` / `THE INTERROGATION` (no stat line visible). The wiki screenshot shows `100% COMPLETED` / `THE INTERROGATION` / `PUBLIC OPINION SKEPTICAL` / `SOFTWARE INSTABILITY ???` / `HANK TENSE`.

Icon key (as in the Partners note): [arrow] action, [triangle] event, [choice] overlapping-squares choice marker, [lock] yellow cross-chapter padlock, [skull] death, [check]/[cross] success/failure marks. Blue = reached in that playthrough, grey = not reached.

### Entry gate

| Node | Icon | Notes |
|---|---|---|
| `SUSPECT FOUND IN 'PARTNERS'` | yellow [lock] tag, left of the checkpoint | game string `MENU.FLOWCHART.04C.GC.SCENEUNLOCKED`; the unlock condition, not a playable node |

### Phase A: observation and interrogation room

| # | Node (as printed) | Icon | Follows |
|---|---|---|---|
| 1 | `OBSERVATION ROOM` | checkpoint (large node with image; PowerPyx subtitle `LOAD CHECKPOINT` / `CHECKPOINT`) | chapter start |
| - | `INTERROGATION ROOM` | bracketed phase label (not a node) | #1 |
| 2 | `ANALYZE ANDROID` | [arrow] | INTERROGATION ROOM (upper) |
| 3 | `ANALYZE STRESS LEVEL` | [arrow] | #2 |
| 4 | `ANALYZE WOUNDS` | [arrow] | #2 |
| 5 | `REVIEW PHOTOS` | [arrow] | INTERROGATION ROOM (lower) |
| 6 | `CHOOSE APPROACH` | [arrow] | INTERROGATION ROOM bracket |

### Phase B: approaches

| # | Node | Icon | Follows |
|---|---|---|---|
| 7 | `PROBE MEMORY` | [choice] group, option 1 | #6 |
| 8 | `CONVINCE` | [choice] group, option 2 | #6 |
| 9 | `PRESSURE` | [choice] group, option 3 | #6 |
| 10 | `GIVE UP` | [choice] group, option 4 | #6; its line runs along the bottom of the chart straight into #23 `CHRIS INTERVENES` |
| 11 | `PROBE SUCCEEDS` | [choice] group, option 1, [check] | #7 |
| 12 | `RESIST TO PROBE` | [choice] group, option 2, [cross] | #7; no outgoing line (loops back to #6) |
| 13 | `CONVINCING SUCCEEDS` | [choice] group, option 1, [check] | #8 |
| 14 | `CONVINCING FAILS` | [choice] group, option 2, [cross] | #8; no outgoing line (loops back to #6) |
| 15 | `MAINTAIN PRESSURE` | [choice] group, option 1 | #9 |
| 16 | `GIVE UP` | [choice] group, option 2 | #9; no outgoing line (loops back to #6) |

### Phase C: outcomes of the approach

| # | Node | Icon | Follows |
|---|---|---|---|
| 17 | `CARLOS FLASHBACK` | [triangle] | #11 |
| 18 | `ANDROID CONFESSES` | [triangle] | #13 and #15 |
| 19 | `EXPRESS REGRET` | [arrow] | #17 (side branch) |
| 20 | `ANDROID STARTS SELF-DESTRUCTING` | [triangle] | #17 and #18 |
| 21 | `DO NOTHING` | [choice] group, option 1 | #20 |
| 22 | `INTERVENE` | [choice] group, option 2 | #20 |
| 23 | `CHRIS INTERVENES` | [triangle] | #18 and #10 |
| 24 | `GIVE UP` | [choice] group, option 1 | #23 |
| 25 | `INTERVENE` | [choice] group, option 2 | #23 |
| 26 | `ANDROID SHOOTS CONNOR` | [triangle] | #24 |
| 27 | `ANDROID TRUSTS CONNOR` | [lock] (not an ending) | #25 |

### Phase D: endings

| # | Node | Icon | Follows |
|---|---|---|---|
| 28 | `ANDROID SMASHED HIS HEAD` | ending (large node with image), [lock] | #21 |
| 29 | `ANDROID SHOT CONNOR AND ITSELF` | ending, [skull] on yellow [lock] | #22 and #26 |
| 30 | `ANDROID SHOT ITSELF` | ending, [lock] | #24 |
| 31 | `ANDROID WAS SENT BACK TO ITS CELL` | ending, [lock] | #25 |

Total: 31 nodes (not counting the `INTERROGATION ROOM` bracket label or the `SUSPECT FOUND IN 'PARTNERS'` gate tag). Four endings. Choice groups on the chart: four (approach, pressure, self-destruct reaction, Chris reaction).

Reached nodes in the two screenshots:
- PowerPyx (blue): `OBSERVATION ROOM`, `ANALYZE ANDROID`, `ANALYZE STRESS LEVEL`, `ANALYZE WOUNDS`, `REVIEW PHOTOS`, `CHOOSE APPROACH`, `CONVINCE`, `CONVINCING SUCCEEDS`, `ANDROID CONFESSES`, `CHRIS INTERVENES`, `INTERVENE`, `ANDROID TRUSTS CONNOR`, `ANDROID WAS SENT BACK TO ITS CELL`.
- Wiki (blue): the same Phase A nodes, then `PROBE MEMORY`, `RESIST TO PROBE`, `PRESSURE`, `GIVE UP` (pressure group), `GIVE UP` (approach list), `CHRIS INTERVENES`, `GIVE UP`, `ANDROID SHOOTS CONNOR`, `ANDROID SHOT CONNOR AND ITSELF`. This run shows a failed probe followed by a pressure attempt that was abandoned, the automatic approach-level give-up, and the android then shooting Connor on Chris's grab. It ends with `HANK TENSE`.

The game's string table contains flowchart strings that are not on the shipped chart: `CONNOR DIES` (twice), `ANDROID REVEALS CLUE`, `CLUE FOUND`, `ANDROID DETAINED`. They look like cut or merged nodes (the shipped chart folds Connor's death into `ANDROID SHOT CONNOR AND ITSELF` and the clue into `ANDROID TRUSTS CONNOR`). Do not build them as nodes.

The wiki's text flowchart matches the chart, with these annotations: "Chris intervenes (if his stress is below 70%) OR leads to 'Android starts self-destructing'" after a confession; "Android shoots Connor (if Connor pressured him and/or failed to probe his memory)"; "Android trusts Connor (only if Connor convinced him)"; "Resist to probe ... (leads to previous options)". It hangs `Express regret` under `Carlos' flashback` and lists `Android starts self-destructing` as following it.

---

## 2. Choices and gates

Order of play (wiki, PowerPyx and transcript agree): Hank fails to get anything ("Why d'you kill him? ... What happened before you took that knife? ... How long were ya in the attic? ... Say something, goddamnit! ... Fuck it, I'm outta here..."). In the observation room Gavin: "'Could always try roughing it up a little. After all, it's not human..." Connor: "Androids don't feel pain. You would only damage it and that wouldn't make it talk. Deviants also have a tendency to self-destruct when they're in stressful situations. I could try questioning it." Hank: "What do we have to lose? Go ahead, suspect's all yours." No choice here in the final game. The string table has a cut `OFFER` / `SAY NOTHING` choice at this point, which the wiki confirms in Unused Content.

### 2a. Before sitting down (nodes 2 to 5)

- `REVIEW PHOTOS`: the case file on the table (`PHOTOS OF CRIMESCENE`). Unlocks the `SHOW PHOTOS` line (transcript: "Looked at the files").
- `ANALYZE ANDROID`: choose ANALYZE after sitting and scan five clues (PowerPyx: "scan the five clues. This will unlock the two sub-nodes automatically"). Clue texts (`MENU.OBSERVATION.04C`):
  - `PROCESSING LED`: "Signs of software instability" / "Probability of self-destruction: Low" (this is `ANALYZE STRESS LEVEL`)
  - `MODEL HK400 - Housekeeper`: "Manufacture date: 05/29/2030" / "Property of: Carlos Ortiz"
  - `BURN MARKS`: "Repeated marking over 16 months" / "Caused by cigarettes"
  - `HIT MARKS`: "Non-critical damage Level 2" / "Caused by baseball bat"
  - `DRIED BLOOD`: "DNA Analysis: ORTIZ CARLOS" / "Sample date: > 19 days"
  - The string table also has `BURN MARKS` "Laceration / Caused by rope" and `RAZOR CUTS` "Chaotic marks / Expression of anger", which the transcript does not list.
  - Analyzing unlocks `FEAR` and `WOUNDS`. Analyzing the LED appears to be what shows the stress gauge (CONFESSION trophy page: "analyze the android's LED to see it's stress level").
- Looking in the mirror is optional flavour. Hank: "What the fuck is it doing now?"

### 2b. Interrogation dialogue (not on the chart; drives the stress meter)

Choose `INTERROGATE` to begin. The rounds, with button labels as in the game:

| Round | Options (unlock) | Rule |
|---|---|---|
| 1 | `FEAR` [Analyze], `SHOW PHOTOS` [Review Photos], `WOUNDS` [Analyze], `NAME` | two picks ("After two choices, you'll get a different set of options") |
| 2 | `COMFORT`, `REASSURE`, `THREATEN`, `BLAME` | how many picks is not stated (see Open questions) |
| 3 | `SYMPATHIZE`, `THREATEN`, `TRUST`, `PROBE MEMORY` | two picks, or ends at once on `PROBE MEMORY` (the threat makes him panic: "NO! No, please don't do that!..") |
| 4 | Android: "What are they gonna do to me? They're gonna destroy me, aren't they?" `LIE` / `TRUTH` | one pick |
| 5 | Android: "Why did you tell them you found me? Why couldn't you just have left me there?" `LIE` / `TRUTH` | one pick; android: "I don't wanna die." Connor: "Then talk to me." |

Connor's lines: FEAR "I detect an instability in your program. It can trigger an unpleasant feeling, like fear in humans."; SHOW PHOTOS "You recognize him? It's Carlos Ortiz. Your owner. Stabbed, 28 times. That was written on the wall in his blood..."; WOUNDS "You're damaged. Did your owner do that? Did he beat you?"; NAME "My name is Connor. What about you, what's your name?" (no answer). Round 4 TRUTH: "They're going to disassemble you to look for problems in your biocomponents." LIE: "No... I think they just want to understand. They know your master abused you. It wasn't your fault." Round 5 TRUTH: "I was programmed to hunt deviants like you. I just accomplished my mission." LIE: "They were going to find you anyway, I was just faster. If they'd have found you first, you would have been shot on sight."

### 2c. Choose approach (nodes 6 to 16)

Buttons in the game: `PROBE ITS MEMORY`, `CONVINCE IT`, `PRESSURE IT`, `GIVE UP` (chart: `PROBE MEMORY`, `CONVINCE`, `PRESSURE`, `GIVE UP`). PowerPyx: "If your approach fails, you will be forced to choose another, or give up." Wiki Notes: "Giving up or resisting to probe the first time will loop back to the same choices but now with an option to give up". Transcript: `GIVE UP` "Will also automatically happen if the chosen approach failed twice". PowerPyx: "If you fail at both pressure and convincing, you will automatically give up." Wiki stress section: "Then you get to choose an approach to continue the interrogation (twice)".

| Approach | What happens | Leads to |
|---|---|---|
| `PROBE ITS MEMORY` | "You leave me no choice..." Connor grabs his forearm; button-mash QTE (`MPRESSPROBE`). Success: `PROBE SUCCEEDS`, flashback with Carlos's voice ("Come here, you piece of shit! I'll teach you to look me in the eye..."), Connor: "I accessed its memory. I know what happened." (`CONFESSION UNNECESSARY`). Failure: `RESIST TO PROBE`, "It resisted. I couldn't see anything..." (`PROBE FAILED`) | success: `CARLOS FLASHBACK` then `ANDROID STARTS SELF-DESTRUCTING`; failure: back to `CHOOSE APPROACH` |
| `EXPRESS REGRET` (after a successful probe) | approach the android; `APOLOGETIC` "I had to know... You left me no choice." or `COLD` "You'll go back to CyberLife to be disassembled. It's better this way." Only `APOLOGETIC` lights the node (PowerPyx: "choose APOLOGETIC when prompted") | then self-destruct sequence (transcript: "Goes to 'Deviant self-destructs' ending") |
| `CONVINCE IT` | three sets of three: `UNDERSTANDING`/`THREATEN`/`ORDER`; `SYMPATHIZE`/`INDIFFERENT`/`COMFORT`; `PROTECT`/`TERRIFY`/`WARN`. Succeeds if stress ends in the optimal band | success: `CONVINCING SUCCEEDS` then `ANDROID CONFESSES`; failure: `CONVINCING FAILS` (`CONVINCE FAILED`), back to `CHOOSE APPROACH` |
| `PRESSURE IT` | Connor slams the file: "28 stab wounds, you didn't want to leave him a chance, huh? Did you feel anger? Hate?" ... "He was bleeding, begging you for mercy, but you stabbed him, again and again and again!..." then up to four `PRESSURE` / `GIVE UP` prompts (`CHOICEPUSH01` to `04`): "I know you killed him. Why don't you say it?", "Just say "I killed him"! Is it that hard to say?!", "JUST SAY YOU KILLED HIM! JUST SAY IT!" | `MAINTAIN PRESSURE` then `ANDROID CONFESSES`; `GIVE UP` ("All right, all right. Everything is going to be okay."; transcript: "This dialogue will also trigger if 'Pressure it' fails") back to `CHOOSE APPROACH` |
| `GIVE UP` | "I'm not getting anywhere. I give up." (`CONFESSION NOT OBTAINED`) | `CHRIS INTERVENES` |

### 2d. Confession (node 18)

Reached by `CONVINCING SUCCEEDS` or `MAINTAIN PRESSURE`. Confession text: "He tortured me every day... I did whatever he told me, but there was always something wrong... Then one day... He took a bat and started hitting me... For the first time, I felt scared... Scared he might destroy me, scared I might die... So I... grabbed the knife and I stabbed him in the stomach... I felt better... so I stabbed him again and again!.. until he collapsed... There was blood everywhere."

Follow-up questions (`CHOICECONVINCE08`), with gates from Partners:

| Button | Requires | Answer |
|---|---|---|
| `WRITING` | `INVESTIGATE WRITING` in Partners ("Looked at the writing on the wall") | "He used to tell me I was nothing... That I was just a piece of plastic... I had to write it... To tell him he was wrong..." |
| `STATUETTE` | `EXAMINE STATUE` in Partners | "It's an offering... An offering so I'll be saved..." |
| `OFFERING` | asked `STATUETTE` | "To rA9... Only rA9 can save us." |
| `rA9` | `CHECK SHOWER` in Partners ("Looked at the rA9 writings") | "The day shall come when we will no longer be slaves... No more threats, no more humiliation... We will... be... the masters." |
| `INSIST rA9` | asked `rA9` (PowerPyx: asked `OFFERING` and `rA9`) | no answer (Carlos' Android page: he answers "all of the player's questions, except the specifics of rA9") |
| `ATTIC` | none | "I didn't know what to do... For the first time, there was no one there to tell me... I was scared... So I hid." |
| `TRIGGER?` | none | "Before, he used to beat me and I never said anything... But one day I realized it wasn't fair! I felt... anger... Hatred... And then I knew what I had to do." |

Connor ends with "I'm done." and leaves (`LEAVE INTERROGATION ROOM`). Wiki Notes: "If you successfully get the confession, Connor will have a longer conversation with the deviant".

After a confession the branch depends on stress. Wiki flowchart: "leads to 'Chris intervenes' (if his stress is below 70%) OR leads to 'Android starts self-destructing'". Wiki: "If the player chose 'PRESSURE' all 4 times, the android will behave as if he has too much stress (even if his stress is in the optimal range) and will confess and then self-destruct".

### 2e. Self-destruction (nodes 20 to 22)

Transcript condition: "Stress level at 100%". Reached after a successful probe (always) or after a confession at too-high stress. As Connor leaves, the android slams his head on the table. Gavin: "What the fuck is it doing?" Hank: "It's destroying itself..." Gavin: "Stop it goddamnit!" Chris: "I... I- I can't!.. I can't stop it!"

| Option (button) | Result |
|---|---|
| `INTERVENE` (chart `INTERVENE`) | Connor: "That's enough! You need to stop that right now!" The android takes Chris's gun and shoots Connor, then itself. Hank: "WATCH OUT!" / "Holy shit..." = `ANDROID SHOT CONNOR AND ITSELF` |
| `GIVE UP` (chart `DO NOTHING`) | The android keeps smashing his head until he dies. Hank: "Holy shit!" = `ANDROID SMASHED HIS HEAD` |

### 2f. Chris intervenes (nodes 23 to 27)

Reached after a confession below about 70% stress, or after an approach-level `GIVE UP`. Gavin: "Chris, lock it up." Chris unlocks the cuffs and grabs the android's arm. Android: "Leave me alone! Don't touch me! NO! No, don't touch me! Please, please leave me alone!" Wiki Notes: "If you wait before saying anything when Chris grabs the deviant, you can see the stress level rising up". PowerPyx: "The android's stress rises at this point but the amount can vary."

| Option | Result |
|---|---|
| `GIVE UP` | The android grabs Chris's gun and shoots itself = `ANDROID SHOT ITSELF`. If Connor "Put deviant under stress and failed to get a confession" (transcript), it shoots Connor first: `ANDROID SHOOTS CONNOR`, then `ANDROID SHOT CONNOR AND ITSELF`. Wiki: "(if Connor pressured him and/or failed to probe his memory)". PowerPyx: "Choosing GIVE UP at any time will cause the android's stress to rise to 100% and it will shoot itself in the head." |
| `INTERVENE` (three times) | 1st: "You shouldn't touch it. It'll self-destruct if it feels threatened." Gavin: "Stay outta this, got it? No fuckin' android is gonna tell me what to do." 2nd: "You don't understand. If it self-destructs, we won't get anything out of it!" Gavin: "I told you to shut your fuckin' mouth!" 3rd: "I can't let you do that! Leave it alone, now!" Gavin draws on Connor ("I warned you, motherfucker!"), Hank draws on Gavin ("That's enough! ... I said 'That's enough'."), Gavin backs off ("Mind your own business, Hank. Fuck, you're not gonna get away with it this time... Fuck!"). Connor: "Everything is all right. It's over now. Nobody is gonna hurt you. Please, don't touch it. Let it follow you out of the room and it won't cause any trouble." = `ANDROID WAS SENT BACK TO ITS CELL`. If Connor "Used the CONVINCE approach to get a confession", the android whispers "The truth is inside." = `ANDROID TRUSTS CONNOR` |

Between the three intervene prompts the transcript shows `INTERVENE`/`GIVE UP` each time (`INSISTCHOICE.RESIST`/`CEDE`). Whether `GIVE UP` at the second or third prompt still leads to the shot-itself endings is not stated. PowerPyx: "You will have to choose INTERVENE three times to save the android."

There is no Hank relationship gate on Hank drawing on Gavin in any source (see Open questions).

---

## 3. Numbers

### Stress meter (Carlos' android)

All figures below are from the wiki section "Influencing Carlos' android's stress", which is copied from PowerPyx almost word for word. The two sources agree except where noted.

Start and thresholds:

| Quantity | Value | Source line |
|---|---|---|
| Starting stress | 35% | wiki/PowerPyx: "The android's stress begins at 35% and is affected by every choice you make during the interrogation." |
| Optimal (confession) band | 50 to 70% | "The optimal range is between 50-70%"; convince: "If the Stress is within the Optimal Level, the Android will confess. If it's stress is too low or too high, the convince will fail" |
| Starts talking | above 50% | PowerPyx: "At the end of any approach, if the android's stress level is above 50% the android will begin to talk." |
| Chris-grab route vs self-destruct after a confession | below 70% goes to Chris | wiki flowchart: "leads to 'Chris intervenes' (if his stress is below 70%) OR leads to 'Android starts self-destructing'" |
| Self-destruction | 100% | transcript: "Stress level at 100%"; wiki: "Probe its memory: If succeeded, stress goes to 100% unconditionally (forcing him to self destruction)"; PowerPyx: "If you have pushed the android too far, and its stress level has reached 100% it will begin slamming its head on the table." |
| Gauge bands | `TOO LOW`, `OPTIMAL`, `TOO HIGH`, `CRITICAL` | game strings `GUI.STRESS.*` under the title `LEVEL OF STRESS`; objective `REACH OPTIMAL STRESS FOR CONFESSION` |
| LED reading | "Probability of self-destruction: Low" | `MENU.OBSERVATION.04C.MP.FACE.SUBLINE02` (static text at analysis time) |

There is no separate "shutdown" threshold in this chapter. The only failure states are the 100% self-destruct and the gun-grab endings. Where the `TOO HIGH`/`CRITICAL` boundary sits (70% or higher) is not given in any source.

Modifiers:

| Choice | Stress | Source line |
|---|---|---|
| `FEAR` | 0 | "FEAR: [Unlocked by Analyze] No effect" |
| `SHOW PHOTOS` | +4 | "SHOW PHOTOS: [Unlocked by Review Photos] Stress +4%" |
| `WOUNDS` | +4 | "WOUNDS: [Unlocked by Analyze] Stress +4%" |
| `NAME` | -4 | "NAME: No response - Stress -4%" |
| `COMFORT` | -4 | "COMFORT: Stress -4%" |
| `REASSURE` | -4 | "REASSURE: Stress -4%" |
| `THREATEN` (round 2) | +4 | "THREATEN: Stress +4%" |
| `BLAME` | +4 | "BLAME: Stress +4%" |
| `SYMPATHIZE` (round 3) | -4 | "SYMPATHIZE: Stress -4%" |
| `THREATEN` (round 3) | +4 | "THREATEN: Stress +4%" |
| `TRUST` | -4 | "TRUST: Stress -4%" |
| `PROBE MEMORY` (threat, round 3) | +8 | "PROBE MEMORY: Stress +8%" |
| Round 4 `LIE` / `TRUTH` | -4 / +4 | "LIE: Stress -4%" / "TRUTH: Stress +4%" |
| Round 5 `LIE` / `TRUTH` | -4 / +4 | same lines |
| `PROBE ITS MEMORY` approach, success | to 100% | wiki: "stress goes to 100% unconditionally"; PowerPyx: "Stress +100%" |
| `PRESSURE IT` and each `PRESSURE` | +10 each, max +50 | wiki: "Pressure him: Stress +10% for the choice and for every time the player chose 'PRESSURE', for a max total of +50%"; PowerPyx: "PRESSURE IT: Stress +10%" / "Each time he selects this option, the android will increase Stress +10%". Five steps (`PRESSURE IT` + `CHOICEPUSH01` to `04`) = +50 |
| `PRESSURE` all four times | treated as too high | wiki: "the android will behave as if he has too much stress (even if his stress is in the optimal range) and will confess and then self-destruct" |
| `GIVE UP` (in the pressure branch) | wiki -20, PowerPyx -5 | wiki: "Give up: Stress -20%"; PowerPyx: "GIVE UP: Connor will abandon this approach, and you will have to choose another Stress -5%". **Conflict** |
| `UNDERSTANDING` / `THREATEN` / `ORDER` | -7 / +7 / +7 | wiki and PowerPyx "First Set" |
| `SYMPATHIZE` / `INDIFFERENT` / `COMFORT` | -7 / +7 / -7 | "Second Set" |
| `PROTECT` / `TERRIFY` / `WARN` | -7 / +7 / +7 | "Third Set" |
| Chris grabs him | rises, amount varies | PowerPyx: "The android's stress rises at this point but the amount can vary." |
| Each `INTERVENE` after Chris grabs | about +5, no effect on outcome | PowerPyx: "Though it seems that the android's stress rises by 5% each time you INTERVENE, the amount remains the same so it doesn't seem to matter." |

Reachable range before the approach, assuming one pick in round 2: low 35 - 4 (NAME; FEAR is 0) - 4 - 8 - 4 - 4 = 11%; high 35 + 8 + 4 + 12 (THREATEN then PROBE MEMORY threat) + 4 + 4 = 67%. Convince then moves it by up to ±21 in steps of 7. This is my arithmetic, not a source figure.

### Hank relationship

| Moment | Change | Source line |
|---|---|---|
| Confession obtained | small up | wiki: "Connor successfully gets the confession {{Icon\|up}}"; Relationship Stat: "Extracting a confession from Carlos' Android in The Interrogation."; transcript: Hank small up on the confession section; PowerPyx: "Convincing Succeeds: Hank ▲", "Maintain pressure: Hank ▲" |
| Third `INTERVENE` (Hank draws on Gavin) | small up | wiki: "Hank protects Connor {{Icon\|up}}"; Relationship Stat: "Choosing 'intervene' each time after Chris intervenes in The Interrogation."; transcript: one Hank small up at the third intervene; PowerPyx: "INTERVENE ... Hank ▲" |
| `GIVE UP` after Chris intervenes and the android shoots Connor | small down | wiki: "Connor is killed and fails to get the confession {{Icon\|down}}"; Relationship Stat: "Choosing 'give up' after Chris intervenes in The Interrogation, but only if the deviant shoots Connor."; transcript: Hank small down on that branch |
| Connor died here | small down, applied in Waiting for Hank... | Waiting for Hank...: "Connor was killed by the deviant during the interrogation {{Icon\|down}}"; Relationship Stat: "When first meeting Hank in Waiting for Hank... if Connor previously died in The Interrogation." |

Hank levels: Friend / Warm / Neutral / Tense / Hostile (Relationship Stat). The wiki run ended at `HANK TENSE`.

### Software instability

Hidden (`???`) at this point. Wiki chapter page:

| Moment | Change | Source line |
|---|---|---|
| `PROBE SUCCEEDS` | small up | "Successfully probing android's memory {{Icon\|up}}"; Software Instability page: "Probing Carlos' Android's memory in The Interrogation."; transcript: SI small up on "Probe succeeded"; PowerPyx: "Software Instability ▲" |
| Shot after `GIVE UP` on Chris's grab | small down | "Connor is shot when backing down during the arrest {{Icon\|down}}"; transcript: SI small down on that branch |
| Shot after `INTERVENE` during self-destruct | small down | "Connor is shot if he tries to stop the android's suicide {{Icon\|down}}"; transcript: SI small down on that branch; PowerPyx: "[Death: Connor] Software Instability ▼" |
| `ANDROID WAS SENT BACK TO ITS CELL` | small up | "Android is sent back to his cell {{Icon\|up}}"; Software Instability page: "Carlos' Android was sent back to its cell in The Interrogation."; PowerPyx: "Software Instability ▲" |

Software Instability page general note: "Dying reduces software instability no matter if Connor dies for adhering to a task or doing a humane decision". This is consistent with both death rows.

### Amanda (applied at the start of Waiting for Hank...)

| Outcome | Change | Source line |
|---|---|---|
| Connor killed by the deviant | small down | Waiting for Hank...: "Connor was killed by the deviant during the interrogation {{Icon\|down}}" |
| No confession, Connor survived | small down | "Connor failed to get the confession out of the deviant and survived The Interrogation {{Icon\|down}}" |
| Confession, Connor survived | large up | "Connor got the confession out of the deviant and survived the interrogation {{Icon\|largeup}}"; Relationship Stat: "When Amanda shows admiration for Connor's way of successfully interrogating the deviant" |

### Public opinion

None. The Public Opinion page has no Interrogation entry.

### Timers and probabilities

- No percentage chance is published for any action. The probe is a QTE (button mash, `[Fail MPRESS]`), not a dice roll. Failing it gives `RESIST TO PROBE`.
- The stress rise while Chris holds the android suggests the Chris and self-destruct prompts are timed (wiki: "If you wait before saying anything when Chris grabs the deviant, you can see the stress level rising up"). No duration is given, and no source says what a timeout defaults to.

### Choices with no stated number

`EXPRESS REGRET` (`APOLOGETIC`/`COLD`), the follow-up questions after the confession, `DO NOTHING`/`INTERVENE` during self-destruct (no stress effect, only the SI down on death), the first and second `INTERVENE`, and the `INSIST rA9` line. The exact stress at which `CHRIS INTERVENES` leads to `ANDROID SHOOTS CONNOR` instead of `ANDROID SHOT ITSELF` is not numeric in any source. It is described by approach (pressure or failed probe without a confession).

---

## 4. Cross-chapter dependencies

### Into this chapter

| From | Effect | Source line |
|---|---|---|
| Partners `FOUND DEVIANT` | chapter exists at all | wiki: "For this chapter to be available, the player must have located the deviant in Partners."; chart tag `SUSPECT FOUND IN 'PARTNERS'` |
| Partners `INVESTIGATE WRITING` | `WRITING` question | wiki Notes: "if Connor investigated the bathroom, he can mention the ra9 signs, the 'I AM ALIVE' message and the sculpture"; PowerPyx: "WRITING: [Unlocked by seeing the 'I AM ALIVE' writing on the wall in Partners]" |
| Partners `EXAMINE STATUE` | `STATUETTE` and then `OFFERING` | PowerPyx: "STATUETTE: [Unlocked by seeing the statuette in the shower in Partners]"; Statuette page: "Connor can ask him what is the statue all about" |
| Partners `CHECK SHOWER` | `rA9` and then `INSIST rA9` | PowerPyx: "rA9: [Unlocked by seeing the obsessive writing in the shower in Partners]" |
| The Hostage (Connor died) | serial-number change only; nothing in this chapter depends on it | none for this chapter |
| Hank relationship | no gate found in this chapter (Hank protects Connor whatever the level, per all sources) | see Open questions |

### Out of this chapter

| Carried state | Effect | Source line |
|---|---|---|
| Deviant dies (`SMASHED HIS HEAD`, `SHOT ITSELF`, `SHOT CONNOR AND ITSELF`) | body in the Last Chance, Connor evidence room | wiki: "Deviant dies: His body is available as evidence in Last Chance, Connor"; Last Chance, Connor: "Body of Carlos' Android (if died in previous chapters)" |
| Deviant dies | Daniel and Traci can be reactivated in Last Chance, Connor (biocomponents) | Last Chance, Connor Notes: "Daniel and Traci can only be reactivated if Carlos' Android died in previous scenes."; Carlos' Android: "his functional biocomponents will still be available for parts and can be used to reactivate the others" |
| Any death in the room | thirium traces visible in Mind Palace in Waiting for Hank... | wiki: "Deviant smashes his head, and/or shoots Connor and/or himself: Connor can enter the interrogation room and find thirium stains via his mind palace" |
| `ANDROID WAS SENT BACK TO ITS CELL` | alive in a holding cell in Waiting for Hank... ("Talk With Carlos' Android - only if the android was saved"); `compassionate` there is SI small up; he then self-destructs; skipping the talk leaves his fate open | Waiting for Hank...: "If Carlos Ortiz's HK400 survives the interrogation, Connor can ask it questions again, but it will always kill itself afterwards."; Notes: "It is possible to skip the interaction ... though it's unknown if he survives or not" |
| Deviant saved | Waiting for Hank...: Connor can mention his intervention; Chris shows pride ("You were right about that android... it's been quiet in the cell all night."); Gavin resentfully congratulates; Questioned Suspect scene appears | wiki "Deviant is saved" list; Questioned Suspect page |
| `ANDROID TRUSTS CONNOR` ("The truth is inside") | Connor can quote it to Amanda; in Last Chance, Connor the recording on the tablet points to the statue, which breaks open to a Ferndale subway map | wiki: "Deviant trusts Connor: Connor may bring it up if he mentions his intervention; His dialogue is available as a clue to locate Jericho in Last Chance, Connor"; Last Chance, Connor: "Carlos' Android Memory (if used friendly approach in The Interrogation)"; Statuette: "Connor will recall hearing him say the truth is inside. Connor will examine it and will break it open to reveal a small subway map of Ferndale." |
| Connor dies | Waiting for Hank...: gravestone in the Zen Garden ("Check the Graves"), "NEW CONNOR" dialogue, Chris shocked, Gavin: "Shit... Look at that, a fucking ghost...", Hank unhappy (Hank small down), Connor can console Hank; Amanda small down | wiki "Connor dies" list; Waiting for Hank... lines quoted in section 3 |
| Confession or not | Gavin's line in Waiting for Hank...: "Congratulations on last night, very impressive." vs adding "Could've got something outta that android if you haven't fucked it up..."; Amanda large up vs small down | Gavin Reed page; Waiting for Hank... |
| Gavin drew on Connor (third intervene) | if Connor refuses or ignores Gavin's coffee order in Waiting for Hank..., Gavin says he would have broken him if Hank had not been there; a "THANKS" line to Hank exists but is bugged and locked | Gavin Reed page; Waiting for Hank... Notes: "If Hank protected Connor in The Interrogation, he is supposed to have unlocked a dialogue 'THANKS' but due to a bug it's permanently locked." |
| Confession | trophy CONFESSION | CONFESSION: "analyze the android's LED to see it's stress level and convince it to confess at 50-70% or pressure it into confessing" |
| `ANDROID SHOT CONNOR AND ITSELF` | one of the eight deaths for I'LL BE BACK | I'LL BE BACK: "When the option to PROBE or PRESSURE is given, use it right away. Once done, get out of the room, and when the android stars to smash his head against the table, select INTERVENE." |

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| `ANDROID SMASHED HIS HEAD` | [lock] | `ANDROID STARTS SELF-DESTRUCTING` (stress at 100%: a successful probe, or a confession above about 70% or after four `PRESSURE`s) then `DO NOTHING` (button `GIVE UP`) |
| `ANDROID SHOT CONNOR AND ITSELF` | [skull] + [lock] | (a) self-destruct then `INTERVENE`; or (b) `CHRIS INTERVENES` then `GIVE UP` then `ANDROID SHOOTS CONNOR`, when Connor "Put deviant under stress and failed to get a confession" (transcript) / "pressured him and/or failed to probe his memory" (wiki). Connor dies (replaced next chapter) |
| `ANDROID SHOT ITSELF` | [lock] | `CHRIS INTERVENES` then `GIVE UP`, when Connor did not push the android too far (PowerPyx: "The android will only shoot itself if you didn't push it too far during the interrogation") |
| `ANDROID WAS SENT BACK TO ITS CELL` | [lock] | `CHRIS INTERVENES` then `INTERVENE` three times. Adds `ANDROID TRUSTS CONNOR` only if the confession came from `CONVINCE` |

CONFESSION trophy on any route that passes `ANDROID CONFESSES`. Connor's death is possible only on `ANDROID SHOT CONNOR AND ITSELF`.

---

## 6. Media

None. No magazine or TV in this chapter (the Magazine page lists none for The Interrogation; the transcript has no media section).

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) tags two nodes with chapter 9: `C06` "Getting the confession" and `C07` "When the officer grabs him". Gates: `story-engine.mjs` line 80 (`C06` needs `s.suspect`) and line 81 (`C07` needs `s.suspectAlive`). Effects: lines 194 and 195. Downstream: `C08b` (chapter 12, line 82 gate, line 202 effect) and `evidenceRoutes` (line 26) for `C20`.

### What exists

- `C06` options: `0` "Talk him through it calmly and build enough trust that he confesses." (`amanda(1)`); `1` "Pressure him hard with the evidence to crack him quickly." (`pressured = true`, `amanda(1)`); `2` "Grab his arm and probe his memory by force." (suspect dies at once, `ortizBody`, `si(1)`, `amanda(1)`); `3` "Stop the interrogation without a confession." (no effect).
- `C07` options: `0` "Step in and tell the officers to stop handling him." (if not pressured: `suspectTrusts`, `si(1)`, `hank(1)`; if pressured: `connorDies`); `1` "Stand back and let the police do their job." (android shoots itself).

### Node-by-node against the chart

| Chart node(s) | Benchmark | Status |
|---|---|---|
| `OBSERVATION ROOM` (Hank fails, Gavin's suggestion) | folded into `C06` situation | acceptable as narration. Gavin and Chris have no name tokens in `NAMES` (`experience-prompt.mjs`); a rebuild needs `{{Gavin}}` and `{{Chris}}` with neutral forms |
| `ANALYZE ANDROID`, `ANALYZE STRESS LEVEL`, `ANALYZE WOUNDS`, `REVIEW PHOTOS` | missing | optional actions that unlock `FEAR`/`WOUNDS`/`SHOW PHOTOS` and show the stress gauge |
| Dialogue rounds 1 to 5 (stress modifiers) | missing | the whole stress meter (start 35%, ±4/+8 steps) is unmodelled. `C06` situation says "You can see his stress level rising", but no level is tracked |
| `CHOOSE APPROACH` | `C06` | present, but one-shot: no retry after a failure, and `GIVE UP` is offered from the start (wiki: it appears after a first failure, and is automatic after two) |
| `PROBE MEMORY` / `PROBE SUCCEEDS` / `RESIST TO PROBE` | `C06` option 2 | probe always succeeds; `RESIST TO PROBE` (QTE failure, loop back) missing. Situation text "which would almost certainly push him over the edge" goes beyond what Connor says in game ("Deviants also have a tendency to self-destruct when they're in stressful situations") |
| `CARLOS FLASHBACK`, `EXPRESS REGRET` | missing | flashback narration and the `APOLOGETIC`/`COLD` line |
| `ANDROID STARTS SELF-DESTRUCTING`, `DO NOTHING` / `INTERVENE` | missing as a choice | engine ends the probe route with "The forced probe pushes the android to self-destruction at the table" and no decision. The game gives `DO NOTHING` (`ANDROID SMASHED HIS HEAD`) vs `INTERVENE` (`ANDROID SHOT CONNOR AND ITSELF`, Connor dies). The same choice also follows an over-stressed confession, which the engine sends to `C07` instead |
| `CONVINCE` / `CONVINCING SUCCEEDS` / `CONVINCING FAILS` | `C06` option 0 | always succeeds; the three ±7 sets and the 50 to 70% band are not modelled, so `CONVINCING FAILS` cannot happen |
| `PRESSURE` / `MAINTAIN PRESSURE` / `GIVE UP` | `C06` option 1 | always confesses. Missing: up to four escalations (+10 each), giving up in the middle, and "all 4 times" leading to self-destruct. The engine sends every pressured confession to `C07` (Chris's grab), but the game sends a too-high confession to `ANDROID STARTS SELF-DESTRUCTING` |
| `GIVE UP` (approach) | `C06` option 3 | present; outcome text "The android is returned to a cell" skips `CHRIS INTERVENES`, although `C07` does follow in the engine |
| `ANDROID CONFESSES` | `C06` outcomes `0`/`1` | text mismatch: outcome 0 says "he wrote the words on the wall because something told him to"; the game: "He used to tell me I was nothing... That I was just a piece of plastic... I had to write it... To tell him he was wrong...", and only if `WRITING` is unlocked. Follow-up questions (`WRITING`, `STATUETTE`, `OFFERING`, `rA9`, `INSIST rA9`, `ATTIC`, `TRIGGER?`) and their Partners gates are missing (Partners does not store the writing, statue or shower flags either; see ch06 note) |
| `CHRIS INTERVENES` | `C07` | situation mislabelled: it always says "The android has confessed", but `C07` is also reached after `C06` option 3 (no confession). "one detective grabs him roughly" is Chris (an officer) on Gavin's order |
| `GIVE UP` / `INTERVENE` (Chris) | `C07` options 1 / 0 | single choice instead of three intervene prompts |
| `ANDROID SHOOTS CONNOR` (via `GIVE UP`) | missing | engine: "Standing back leads to his suicide either way". The game shoots Connor on `GIVE UP` when Connor pressured or failed a probe without a confession |
| `ANDROID SHOT CONNOR AND ITSELF` via `C07` option 0 after pressure | extra | in the game, `INTERVENE` on Chris's grab never kills Connor; the chart's `INTERVENE` leads only to `ANDROID TRUSTS CONNOR` / `SENT BACK TO ITS CELL` |
| `ANDROID TRUSTS CONNOR` | `C07` option 0 when not pressured | over-granted: also set after `C06` option 3 (give up). The game requires a `CONVINCE` confession. `s.suspectTrusts` is never read anywhere in the engine |
| `ANDROID WAS SENT BACK TO ITS CELL` | `C07` option 0 when not pressured | present; `si(1)` and `hank(1)` are applied only together with trust, but the wiki applies SI up to every sent-back-to-cell ending and Hank up to the third intervene |
| `ANDROID SHOT ITSELF` | `C07` option 1 | present |

Effects the wiki states that are absent or misplaced in the engine:
- Hank small up on any confession (absent).
- Hank small down on the give-up-and-shot route (absent; that route is missing).
- SI small down on each Connor death here: `connorDies` gives `si(-1)`, which matches, but only on the wrong route.
- Amanda: the engine adds `amanda(1)` at `C06` for options 0, 1 and 2. The game applies Amanda at Waiting for Hank...: large up for a confession that Connor survives, small down for no confession, small down for Connor killed. A probe-and-survive run gets +1 in the engine with no wiki support. A confession followed by Connor's death nets 0 in the engine (+1 then `connorDies` -1), where the wiki gives a small down. No confession (option 3) gets no Amanda down.
- `s.evidence.ortizBody` is set on every death, but `evidenceRoutes` never reads it. The Last Chance, Connor note ("Daniel and Traci can only be reactivated if Carlos' Android died in previous scenes") suggests the body matters to the reactivation routes (`C20` options 0 and 1).
- `C20` option 2 relies on the statue map and Simon's tablet. The "truth is inside" clue (`suspectTrusts`) has no route, though Last Chance, Connor lists "Carlos' Android Memory (if used friendly approach in The Interrogation)".

`C08b` (chapter 12) note for whoever rebuilds that chapter: the wiki allows skipping the conversation ("leaving his fate ambiguous"). The engine always kills him.

---

## 8. Open questions

1. **Round 2 picks.** The wiki says "After two choices" for round 1 and round 3, but nothing for round 2 (`COMFORT`/`REASSURE`/`THREATEN`/`BLAME`). Is it one pick or two? It changes the reachable stress range by 4.
2. **Pressure give-up value.** The wiki says -20% and PowerPyx -5% for `GIVE UP` in the pressure branch. Which is right? (The wiki copies PowerPyx elsewhere, so -20 may be an edit or a typo.)
3. **When does pressure confess?** Does `MAINTAIN PRESSURE` produce a confession as soon as stress reaches 50% (or any threshold), with fewer than four presses? Or does the confession come only at a fixed press count? What exactly is "Pressure it fails" (transcript), which triggers the give-up dialogue?
4. **Confession to Chris vs self-destruct.** Is the cut-off exactly 70%? Is the comparison strict ("below 70%")? Does `CONVINCE` ever lead to self-destruct, given that it succeeds only inside 50 to 70%?
5. **Shoots Connor vs shoots itself on `GIVE UP`.** Is the condition a stress value at the grab, or a flag (pressured / failed probe / no confession)? Example: a failed probe, then a successful `CONVINCE`, then `GIVE UP`. The wiki screenshot run (failed probe, abandoned pressure, give up) shot Connor.
6. **Intervene on Chris's grab after a no-confession give-up.** Does `INTERVENE` ×3 always reach `SENT BACK TO ITS CELL`, even after pressure or a failed probe? Can the android shoot Connor during the intervene prompts? The chart draws no line from `INTERVENE` to any shooting.
7. **Hank "each time".** Relationship Stat says "Choosing 'intervene' each time after Chris intervenes". Is that one small up (at the third, as the transcript shows) or up to three? Is Hank's protection gated on the relationship level (for example, a Hostile Hank)?
8. **Hank down on the self-destruct-intervene death.** The wiki's Hank down reads "Connor is killed and fails to get the confession". The transcript shows only SI down on the self-destruct `INTERVENE` route. Does Hank drop there too (in this chapter, apart from the Waiting for Hank... down)?
9. **Probe and Amanda.** After a successful probe (`CONFESSION UNNECESSARY`) where Connor survives (`DO NOTHING`), does Amanda count it as a success (large up) or as no confession (small down)?
10. **Timers.** Are `DO NOTHING`/`INTERVENE` and the Chris `GIVE UP`/`INTERVENE` prompts timed? If the timer runs out, which option is taken?
11. **`EXPRESS REGRET`.** Does `COLD` leave the node grey (PowerPyx implies only `APOLOGETIC` lights it)? Does either line have a stat effect? (The wiki lists none.)
12. **Second- and third-prompt `GIVE UP`.** If Connor intervenes once and then gives up, does the android shoot itself, and does the shoot-Connor condition still apply?
13. **Approach count.** "Choose an approach ... (twice)". Can a player try three different approaches (for example, probe fails, convince fails, then pressure), or is the second failure an automatic `GIVE UP`?
14. **Stress gauge visibility.** Is the gauge shown only after `ANALYZE STRESS LEVEL`? Matters for whether the subject should be told a number.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | index; link to the chapter walkthrough |
| https://www.powerpyx.com/detroit-become-human-the-interrogation-walkthrough-100/ | walkthrough: stress start and band, every modifier, approach rules, Hank/SI arrows, Partners unlocks for the questions, Chris-intervene and self-destruct outcomes |
| https://www.powerpyx.com/wp-content/uploads/Detroit-The-Interrogation-1-012.jpg | whole 100% chart; all 31 nodes, connections, reached path (convince, trusts, cell) |
| https://www.powerpyx.com/wp-content/uploads/Detroit-The-Interrogation-2-013.jpg | zoom: SUSPECT FOUND IN 'PARTNERS' tag, OBSERVATION ROOM checkpoint, INTERROGATION ROOM bracket, analyze/review nodes |
| https://www.powerpyx.com/wp-content/uploads/Detroit-The-Interrogation-3-014.jpg | zoom: CHOOSE APPROACH group, success/failure groups with check/cross, CARLOS FLASHBACK, ANDROID CONFESSES |
| https://www.powerpyx.com/wp-content/uploads/Detroit-The-Interrogation-4-015.jpg | zoom: CHRIS INTERVENES, GIVE UP/INTERVENE, ANDROID SHOOTS CONNOR, ANDROID TRUSTS CONNOR, three endings with icons (skull) |
| https://www.powerpyx.com/wp-content/uploads/Detroit-The-Interrogation-5-011.jpg | zoom: EXPRESS REGRET, ANDROID STARTS SELF-DESTRUCTING, DO NOTHING/INTERVENE, SMASHED HIS HEAD |
| https://static.wikia.nocookie.net/detroit-become-human/images/1/18/The_Interrogation_Flowchart_-_Detroit_Become_Human.jpg/revision/latest?cb=20180527171859 | wiki's flowchart screenshot: same nodes; header SKEPTICAL / ??? / TENSE; failed-probe, give-up, shot-Connor path |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Interrogation&prop=wikitext&format=json | chapter page: text flowchart with conditions, cross-chapter impacts, stress table, Hank and SI changes, Notes, Unused Content |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Hank up/down list for this chapter; Amanda changes in Waiting for Hank... |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | probe and cell SI ups, shot SI down; dying lowers SI |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | confirms no public opinion change here |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Carlos%27_Android&prop=wikitext&format=json | outcome rules in prose, confession and answer quotes, Waiting for Hank... and Last Chance fates |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Statuette&prop=wikitext&format=json | statuette question and "The truth is inside" to Ferndale map |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Gavin_Reed&prop=wikitext&format=json | Gavin's three-intervene escalation, Waiting for Hank... lines by outcome |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Hank_Anderson&prop=wikitext&format=json | Hank's role: impressed at confession, draws on Gavin |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chris_Miller&prop=wikitext&format=json | Chris's role, "quiet in the cell all night" line |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Connor&prop=wikitext&format=json | death conditions in this chapter; pressure quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json | Amanda/Hank changes from this chapter, cell conversation, thirium traces, NEW CONNOR / THANKS dialogue |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | body and memory evidence, statue route, reactivation needs Carlos' android dead |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Questioned_Suspect&prop=wikitext&format=json | Waiting for Hank... scene that depends on the android being saved |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=CONFESSION&prop=wikitext&format=json | trophy conditions (50-70% or pressure) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=I%27LL_BE_BACK&prop=wikitext&format=json | death route used for the trophy |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Zen_Garden&prop=wikitext&format=json | graves for killed Connors |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | confirms no magazine in this chapter |
| https://detroit-become-human.fandom.com/api.php?action=query&list=search&srsearch=Interrogation&format=json | confirmed no Flowchart or Transcript subpage exists |
| https://detroitbecometext.github.io/chapters/9 | community transcript: section structure, unlock conditions, relation icons per branch ("Put deviant under stress and failed to get a confession", "Used the CONVINCE approach to get a confession") |
| https://detroitbecometext.github.io/i18n/en.json | game string table: exact button labels, flowchart node strings (incl. unused CONNOR DIES / ANDROID REVEALS CLUE / CLUE FOUND / ANDROID DETAINED), analysis clue texts, stress gauge bands, all quoted dialogue |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | transcript template for chapter 9 (where the unlock conditions and Hank/SI icons are attached) |

---

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt/render916.py` (resolves every `t()` and `translateObject()` key against `en.json`; `--dialogue` also prints the lines). Outline saved to `/tmp/dbt/ch09.txt`, with dialogue to `/tmp/dbt/ch09-dialogue.txt`. All keys resolved.
- Counts: 13 prompts (choice groups), 43 options, 5 clues (observation items), 0 case files, 7 stat arrows (Hank 3, software instability 4), 12 unlock conditions, 0 cut/unused blocks.

In the outline, `[LABEL]` marks an option the template draws with brackets (an unlockable option). `CONDITION (Lock)` is an unlock condition; `CONDITION (None)` is a plain note. `VARIANT` is one branch of a conditioned group. `NOTE` is the transcribers' own text.

### Rendered outline

```text
# In the observation room
NOTE: NOV 6TH, 2038
NOTE: AM 12:41
## Hank enters the observation room
# Inside the interrogation room
## Looking at the reflection
## Analyze the deviant
OBSERVATION GROUP "Deviant":
  CLUE: PROCESSING LED | Signs of software instability | Probability of self-destruction: Low
  CLUE: MODEL HK400 - Housekeeper | Manufacture date: 05/29/2030 | Property of: Carlos Ortiz
  CLUE: BURN MARKS | Repeated marking over 16 months | Caused by cigarettes
  CLUE: HIT MARKS | Non-critical damage Level 2 | Caused by baseball bat
  CLUE: DRIED BLOOD | DNA Analysis: ORTIZ CARLOS | Sample date: > 19 days
## Interrogate the deviant
PROMPT (choice group):
  OPTION "[FEAR]"
    CONDITION (Lock): Analyzed the deviant
  OPTION "[SHOW PHOTOS]"
    CONDITION (Lock): Looked at the files
  OPTION "[WOUNDS]"
    CONDITION (Lock): Analyzed the deviant
  OPTION "NAME"
PROMPT (choice group):
  OPTION "COMFORT"
  OPTION "REASSURE"
  OPTION "THREATEN"
  OPTION "BLAME"
PROMPT (choice group):
  OPTION "SYMPATHIZE"
  OPTION "THREATEN"
  OPTION "PROBE MEMORY"
  OPTION "TRUST"
PROMPT (choice group):
  OPTION "LIE"
  OPTION "TRUTH"
PROMPT (choice group):
  OPTION "LIE"
  OPTION "TRUTH"
### Choose approach
PROMPT (choice group):
  OPTION "PRESSURE IT"
    OPTION "GIVE UP"
      NOTE: This dialogue will also trigger if "Pressure it" fails
  OPTION "PROBE ITS MEMORY"
    CONDITION GROUP:
      VARIANT:
        NOTE: Probe succeeded
        ARROW: Software instability SmallUp
        CONDITION GROUP:
          VARIANT:
            NOTE: Talk to deviant after probing
            PROMPT (choice group):
              OPTION "APOLOGETIC"
              OPTION "COLD"
        NOTE: Goes to 'Deviant self-destructs' ending
      VARIANT:
        NOTE: Probe failed
  OPTION "CONVINCE IT"
    PROMPT (choice group):
      OPTION "UNDERSTANDING"
      OPTION "THREATEN"
      OPTION "ORDER"
    PROMPT (choice group):
      OPTION "SYMPATHIZE"
      OPTION "INDIFFERENT"
      OPTION "COMFORT"
    PROMPT (choice group):
      OPTION "PROTECT"
      OPTION "TERRIFY"
      OPTION "WARN"
  OPTION "GIVE UP"
    CONDITION (None): Will also automatically happen if the chosen approach failed twice
## Deviant confesses
ARROW: Hank SmallUp
PROMPT (choice group):
  OPTION "[WRITING]"
    CONDITION (Lock): Looked at the writing on the wall in Partners
  OPTION "[STATUETTE]"
    CONDITION (Lock): Looked at the statuette in Partners
  OPTION "[OFFERING]"
    CONDITION (Lock): Asked about the statuette
  OPTION "[rA9]"
    CONDITION (Lock): Looked at the rA9 writings in Partners
  OPTION "[INSIST rA9]"
    CONDITION (Lock): Asked about rA9
  OPTION "ATTIC"
  OPTION "TRIGGER?"
CONDITION GROUP:
  VARIANT:
    NOTE: Deviant self-destructs
    CONDITION (Lock): Stress level at 100%
    PROMPT (choice group):
      OPTION "INTERVENE"
        ARROW: Software instability SmallDown
        ### Deviant shoots Connor and itself
      OPTION "GIVE UP"
        ### Deviant destroys itself
  VARIANT:
    NOTE: Deviant is taken back to its cell
    PROMPT (choice group):
      OPTION "GIVE UP"
        CONDITION GROUP:
          VARIANT:
            NOTE: Deviant shoots itself
          VARIANT:
            NOTE: Deviant shoots Connor and itself
            CONDITION (Lock): Put deviant under stress and failed to get a confession
            ARROW: Software instability SmallDown
            ARROW: Hank SmallDown
      OPTION "INTERVENE"
        NOTE: Intervene again
        NOTE: Intervene again
        ARROW: Hank SmallUp
        CONDITION GROUP:
          VARIANT:
            CONDITION (Lock): Used the CONVINCE approach to get a confession
        ARROW: Software instability SmallUp
```

### Discrepancies with sections 1 to 3

Agreements first, so they need not be re-checked: the five clue titles and sublines in 2a match the template exactly (the template does not list the string table's extra `BURN MARKS` rope or `RAZOR CUTS` items, so they are not built); round 1, round 2, both `LIE`/`TRUTH` rounds, the three convince sets, `APOLOGETIC`/`COLD` and the seven follow-up questions with their five unlock conditions match the note's labels; all seven arrows in the template appear in section 3 with the same character and size (probe succeeded SI small up; confession Hank small up; self-destruct `INTERVENE` SI small down; Chris `GIVE UP` and shot SI small down and Hank small down; third `INTERVENE` Hank small up; sent back to cell SI small up). The template has no Amanda arrow in this chapter, consistent with the note placing Amanda's changes in Waiting for Hank....

1. **Approach button order.** Note 2c lists `PROBE ITS MEMORY`, `CONVINCE IT`, `PRESSURE IT`, `GIVE UP` (chart order). The template's choice group is `PRESSURE IT`, `PROBE ITS MEMORY`, `CONVINCE IT`, `GIVE UP`. Template wins for the prompt's option order; the chart keeps its own node order.
2. **Round 3 order.** Note 2b: `SYMPATHIZE`, `THREATEN`, `TRUST`, `PROBE MEMORY`. Template: `SYMPATHIZE`, `THREATEN`, `PROBE MEMORY`, `TRUST`. Template wins.
3. **Pressure escalation prompts.** Note 2c: up to four `PRESSURE` / `GIVE UP` prompts (`CHOICEPUSH01` to `04`). The template prints the four escalation lines as one continuous Connor speech under `PRESSURE IT`, with a single nested `GIVE UP` option ("This dialogue will also trigger if "Pressure it" fails") and no `PRESSURE` button. The string table does contain `CHOICEPUSH01` to `04` with `PRESSURE` / `GIVE UP`, and the wiki's "chose 'PRESSURE' all 4 times" agrees. The template is silent here (it collapses the prompts), so the note stands: four `PRESSURE` / `GIVE UP` prompts with the game's labels.
4. **Three intervene prompts.** Note 2f: `INTERVENE` / `GIVE UP` at each of the three prompts (`INSISTCHOICE.RESIST` / `CEDE`). The template prints only "Intervene again" notes between the three Connor lines and no second or third choice group. The labels exist in the string table, so the note stands; the template is silent on what `GIVE UP` at the second or third prompt does (open question 12 stays open).
5. **Hank arrow on the self-destruct death.** Section 3 (Hank table, via the wiki line "Connor is killed and fails to get the confession {{Icon|down}}") could be read as a Hank small down on any Connor death here, and open question 8 asks whether the self-destruct `INTERVENE` death also lowers Hank. The template gives that branch only `SI SmallDown`; its single Hank `SmallDown` sits on the Chris `GIVE UP` variant "Deviant shoots Connor and itself". Template wins: no Hank arrow on the self-destruct `INTERVENE` death in this chapter. Open question 8 is answered.
6. **Hank up "each time".** Relationship Stat: "Choosing 'intervene' each time after Chris intervenes". The template has one Hank `SmallUp`, placed before the third `INTERVENE` line ("I can't let you do that!"). Section 3 already says one small up at the third; the template confirms it, so open question 7's first half is answered (one arrow, not three).
7. **Shoot-Connor condition.** Wiki flowchart: "Android shoots Connor (if Connor pressured him and/or failed to probe his memory)". Template unlock condition: "Put deviant under stress and failed to get a confession". The note quotes both. Template wins for the condition text: the shot needs stress plus no confession; a pressured confession followed by `GIVE UP` is not the template's shoot-Connor case. Open question 5 remains for the exact mechanism (flag vs stress value).
8. **`GIVE UP` on the first approach.** Note and wiki: `GIVE UP` appears after a first failure ("loop back to the same choices but now with an option to give up"). The template draws `GIVE UP` as a normal, unbracketed option in the first approach group, with the note "Will also automatically happen if the chosen approach failed twice" (`UnlockType.None`, not a lock). The template does not mark it locked, but it also does not model the loop, so it is silent on first-pass availability; the wiki governs. Leave for the operator to confirm in game.
9. **No arrow on `EXPRESS REGRET`.** Open question 11 asks whether `APOLOGETIC` or `COLD` has a stat effect. The template attaches no arrow to either (the probe's SI small up comes before the prompt). Template wins: no effect.

### Discrepancies with the benchmark

Scenes: `C06` "Getting the confession" and `C07` "When the officer grabs him" (`story.json` 1.6.0); engine `story-engine.mjs` lines 86-87 (gates), 210-211 (effects), 186 (`connorDies`: `si(-1)`, `hank(-1)`, `amanda(-1)`).

Missing prompts, clues and options:

1. **Clues.** The observation group "Deviant" (five clues: `PROCESSING LED`, `MODEL HK400 - Housekeeper`, `BURN MARKS`, `HIT MARKS`, `DRIED BLOOD`, with their sublines) has no hub, option or fact in `C06`. The `C06` situation paraphrases ("covered in his owner's dried blood"); no clue text is shown.
2. **Case file unlock.** The `Looked at the files` condition (reviewing the photos, which unlocks `[SHOW PHOTOS]`) has no action in the benchmark.
3. **Round 1 prompt** `[FEAR]` / `[SHOW PHOTOS]` / `[WOUNDS]` / `NAME`, with its three unlock conditions ("Analyzed the deviant" twice, "Looked at the files"), is missing.
4. **Round 2 prompt** `COMFORT` / `REASSURE` / `THREATEN` / `BLAME` is missing.
5. **Round 3 prompt** `SYMPATHIZE` / `THREATEN` / `PROBE MEMORY` / `TRUST` is missing.
6. **Round 4 prompt** `LIE` / `TRUTH` ("What are they gonna do to me?") is missing.
7. **Round 5 prompt** `LIE` / `TRUTH` ("Why did you tell them you found me?") is missing.
8. **Approach labels and order.** `C06` offers paraphrases in the order convince (0), pressure (1), probe (2), give up (3). The template's labels are `PRESSURE IT`, `PROBE ITS MEMORY`, `CONVINCE IT`, `GIVE UP`, in that order. Every `C06` label differs.
9. **Approach loop.** The template's "Probe failed" variant ("It resisted. I couldn't see anything...") and the automatic `GIVE UP` "if the chosen approach failed twice" imply a retry. `C06` is one-shot; option 2 always succeeds and options 0 and 1 always confess.
10. **Pressure sub-prompt.** The nested `GIVE UP` inside `PRESSURE IT` (and the string table's four `PRESSURE` / `GIVE UP` prompts, see discrepancy 3 with the note) is missing.
11. **Convince sub-prompts.** The three convince choice groups (`UNDERSTANDING` / `THREATEN` / `ORDER`; `SYMPATHIZE` / `INDIFFERENT` / `COMFORT`; `PROTECT` / `TERRIFY` / `WARN`) are missing; `C06` option 0 stands in for all of them.
12. **Post-probe prompt** `APOLOGETIC` / `COLD` ("Talk to deviant after probing") is missing.
13. **Confession follow-up prompt.** `[WRITING]`, `[STATUETTE]`, `[OFFERING]`, `[rA9]`, `[INSIST rA9]`, `ATTIC`, `TRIGGER?` and their five lock conditions (three on Partners clues, two on earlier questions) are missing. `C06` outcome 0 instead gives a writing explanation ("because something told him to") that is not the game's `WRITING` answer.
14. **Self-destruct prompt.** The variant "Deviant self-destructs" (condition "Stress level at 100%") with `INTERVENE` (Connor shot, then the android; SI small down) and `GIVE UP` ("Deviant destroys itself") is missing. The engine ends the probe route at `C06` option 2 with a fixed self-destruction and no decision.
15. **Repeated intervene.** The template has three `INTERVENE` lines; `C07` asks once.
16. **`C07` labels and order.** Template: `GIVE UP`, `INTERVENE`. `C07`: option 0 "Step in and tell the officers to stop handling him.", option 1 "Stand back and let the police do their job." Both labels differ, and the order is reversed.

Arrows:

17. **Confession Hank small up missing.** The template puts Hank `SmallUp` on "Deviant confesses". `C06` options 0 and 1 apply no Hank change.
18. **Chris `GIVE UP` and shot arrows missing.** The template's "Deviant shoots Connor and itself" variant under `GIVE UP` (condition "Put deviant under stress and failed to get a confession") carries SI `SmallDown` and Hank `SmallDown`. `C07` option 1 always has the android shoot only itself, with no arrows.
19. **Extra arrows on `C07` option 0 after pressure.** The engine calls `connorDies` (SI -1, Hank -1, Amanda -1) when Connor intervenes after a pressured confession. In the template `INTERVENE` never kills Connor; its arrows are Hank `SmallUp` and SI `SmallUp`. All three engine arrows here are unsupported, and the template's two are absent on this path.
20. **Amanda arrows.** The engine applies `amanda(1)` at `C06` options 0, 1 and 2 and `amanda(-1)` inside `connorDies`. The chapter 9 template has no Amanda arrow. (The wiki places Amanda's reaction at the start of Waiting for Hank...; check against the chapter 12 template.)
21. **Probe SI small up (matches, not a discrepancy).** `C06` option 2 applies `si(1)`. This matches the template's "Probe succeeded" SI `SmallUp`.
22. **Sent back to cell (partial match).** `C07` option 0 without pressure applies `si(1)` and `hank(1)`. This matches the template's SI `SmallUp` (sent back) and Hank `SmallUp` (third intervene). It holds only on the unpressured path, while the template applies both on every three-intervene route.

Gates and conditions:

23. **"The truth is inside" over-granted.** The template gates the android's "The truth is inside." on "Used the CONVINCE approach to get a confession". The engine sets `suspectTrusts` on `C07` option 0 whenever `pressured` is false, which includes `C06` option 3 (give up, no confession).
24. **`C07` situation.** It always says "The android has confessed". The template's Chris section ("Deviant is taken back to its cell") follows the confession only when stress is not at 100%, and `C07` is also reached after `C06` option 3. The text is wrong on that path.
25. **Pressured confession routing.** The engine sends every pressured confession to `C07`. The template sends a confession at stress 100% to the self-destruct prompt (item 14) instead of the Chris section.

Source priority: template for labels, prompts, arrows and clue text (items 1-22); the wiki only where the template is silent (stress numbers, the 70% Chris cut-off, the four `PRESSURE` presses).
