# Chapter 26: Capitol Park (Markus)

Research note for rebuilding the chapter's scenes. Written 2026-11-06. Sources and their order of authority follow `docs/research/README.md`:
- the PowerPyx flowchart screenshots and walkthrough text, including reader comments;
- the Fandom wiki chapter page (wikitext via the MediaWiki API);
- the wiki's stat, character, magazine, trophy and later-chapter pages;
- the fan transcript at detroitbecometext.github.io (chapter 26).

The transcript's strings come from its `i18n/en.json`: keys `X0802M.*`, `MENU.FLOWCHART.08M.*`, `MENU.OBSERVATION.08M.*` and `GUI.ACTION.08M.*`. The game's internal code for this chapter is `08M`. Conditions and relation icons come from the compiled chapter template, function `FL` in `chunk-JCLJBPDO.js`. That template had already been rendered to text by the chapter-23 agent (`/tmp/flowcharts/ch23/x_FL.txt`), and that render was reused here. Two more templates were tokenised to trace what this chapter carries forward: Freedom March (`kL`) and Meet Kamski (`wL`).

`en.json` also holds the game's own flowchart labels, `MENU.FLOWCHART.08M.*`: 72 strings, which are 70 boxes plus the two phase brackets. Every label below was checked against them.

Working files are in `/tmp/flowcharts/ch26/` and were not committed:
- `wiki.txt`, `pp.txt`
- `cp-flowchart-100.jpg`, `cp-2.jpg` to `cp-6.jpg`, `crops/`
- `transcript.txt` (copy of the `FL` render), `tpl_FL.js`, `strings08M.txt`
- `x_kL.js`, `x_kL.keys.txt`, `x_wL.js`, `x_wL.keys.txt`
- `wikipages/w_*.txt`

The wiki chapter page is marked as a stub. It has:
- a text flowchart with footnotes;
- Notes;
- Relationship Changes (Jericho and North only);
- Public Opinion.

It has no Probability section and no Software Instability section.

Wiki infobox:
- `|date=November 9, 2038`, `|time=01:51AM`
- `|player=[[Markus]]`, `|location= [[Capitol_Park_(location)|Capitol Park]]`, `|endings=6`
- Objectives: "Find CyberLife store", "Get into the store", "Secure the area", "Awake the androids", "Send a message to the humans", "Approach the group"
- Text: "This chapter has six different outcomes."

The transcript header agrees: "NOV 9TH, 2038 / AM 01:51". The plan is to strike "simultaneously at 2AM".

---

## 1. Flowchart transcription

### How the chart was read

- `cp-flowchart-100.jpg` is PowerPyx's whole-chart overview. Its header reads "100% COMPLETED / CAPITOL PARK" with these stats: PUBLIC OPINION HATED, JERICHO ADMIRED, NORTH FRIEND, JOSH COMPANION, SIMON COMPANION. The overview is too small to read, so it was cropped and enlarged (`crops/`) and used only for the long edges.
- `cp-2.jpg` to `cp-6.jpg` are zoomed screenshots from a different save. Their header reads "94% COMPLETED", with PUBLIC OPINION SYMPATHETIC, JERICHO ADMIRED, NORTH FRIEND, JOSH COMPANION, SIMON COMPANION. Together they cover every node, and labels were read from them.
- PowerPyx's index page links no `-1`, `-7` or endings image for this chapter (those URLs return 404).
- **Blue boxes** in the overview:
  - AVOID POLICE CAR > JUMP ON DRONE > FALL FROM DRONE > NORTH DESTROYS DRONE > POLICE CAR ARRIVES > HIDE AND HACK RADIO
  - BLOCK ROAD, DEACTIVATE ALARM, FIND TRUCK > RAM STORE > POLICE NOT ALERTED > INSIDE THE STORE > CONVERT ANDROIDS AND MAKE A STATEMENT > MAKE A STATEMENT
  - DESTROY WINDOWS > ACCEPT MOLOTOV, MAKE A PYRE > BURN DUMPSTERS, BURN HOTEL
  - FAIL TO SEND A MESSAGE > MARKUS FAILED TO DELIVER HIS MESSAGE
  - POLICE PATROL ARRIVES > LET CROWD DECIDE > TEAM RETURN TO JERICHO

  This set cannot be one playthrough: FAIL TO SEND A MESSAGE requires that no message action was taken (wiki footnote), yet DESTROY WINDOWS and ACCEPT MOLOTOV are also blue. As in chapter 23, blue here means "selected on some playthrough" and is not a path trace (§8).

Icon key (same as earlier notes):
- Arrow (⇨): an action.
- Triangle (△): an event or consequence the game plays.
- Book: the magazine branch.
- Double square: a group of alternatives.
- ✓ / ✗: success / failure.
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".
- Merge icon (a blue box with a vertical bar): a junction with no label. It is drawn where two inputs (ACCEPT MOLOTOV and MAKE A PYRE) merge before the five BURN nodes.

**There is no skull, no-entry or trophy icon anywhere on this chart. The six ending tiles carry no icon.** The only cross-chapter padlocks are on KILL, SPARE and LET CROWD DECIDE.

Boxes are numbered N1 to N70 in reading order. Labels are quoted exactly as printed, and every one was legible in a zoomed screenshot. `SECURE THE PLACE` and `SPREAD YOUR MESSAGE` are phase-bracket labels, not boxes.

### A. Mission start (`cp-2.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | MISSION START | large tile (checkpoint) | > group N4/N5, > N6 (direct edge), > book branch |
| N2 | READ "WHO IS IT?" | arrow (book branch) | optional |
| N3 | READ "ANDROID PRESIDENT?" | arrow (book branch) | optional |
| N4 | NORTH SAVES YOU | group member | > N6 |
| N5 | AVOID POLICE CAR | group member | > N6 |
| N6 | REACH STORE | large tile (checkpoint) | > bracket SECURE THE PLACE, > N20, > N25 |

### B. Securing the plaza (`cp-3.jpg`)

The bracket `[SECURE THE PLACE]` encloses N7–N13. Edges run from the bracket to JUMP ON DRONE, BLOCK ROAD and DEACTIVATE ALARM.

| # | Label | Icon | Edge |
|---|---|---|---|
| N7 | JUMP ON DRONE | arrow | > group N8/N9 |
| N8 | DESTROY DRONE | group member, ✓ | no outgoing edge (flag) |
| N9 | FALL FROM DRONE | group member, ✗ | > N14 |
| N10 | BLOCK ROAD | arrow | no outgoing edge (flag) |
| N11 | DEACTIVATE ALARM | arrow | > group N12/N13 |
| N12 | GET SPOTTED BY DRONE | group member, ✗ | > N14 |
| N13 | HIDE | group member, ✓ | no outgoing edge (flag) |
| N14 | NORTH DESTROYS DRONE | triangle | > N15 |
| N15 | POLICE CAR ARRIVES | triangle | > group N16–N18 |
| N16 | RUN AWAY | group member | > N19 |
| N17 | HIDE AND HACK RADIO | group member | no outgoing edge (play continues) |
| N18 | FEIGN KISS | group member | no outgoing edge (play continues) |
| N19 | **DECIDED TO FLEE** | ending tile, no icon | ENDING |
| N20 | FIND TRUCK | arrow | > N21 |
| N21 | RAM STORE | arrow | > group N22/N23 |
| N22 | POLICE NOT ALERTED | group member, ✓ | > N27 |
| N23 | POLICE ALERTED | group member, ✗ | > N24 |
| N24 | **HAD TO FLEE** | ending tile, no icon | ENDING |
| N25 | OUT OF TIME | triangle | > N26 |
| N26 | **RETREAT** | ending tile, no icon | ENDING |

Order as printed: DESTROY DRONE above FALL FROM DRONE; GET SPOTTED BY DRONE above HIDE; RUN AWAY, HIDE AND HACK RADIO, FEIGN KISS; POLICE NOT ALERTED above POLICE ALERTED.

### C. The store (`cp-4.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N27 | INSIDE THE STORE | large tile (checkpoint) | > N28 |
| N28 | CONVERT ANDROIDS AND MAKE A STATEMENT | arrow | > N29 |
| N29 | MAKE A STATEMENT | large tile (checkpoint) | > bracket SPREAD YOUR MESSAGE |

### D. Spread your message (`cp-5.jpg`)

The bracket `[SPREAD YOUR MESSAGE]` encloses everything in this section. All groups and single actions hang off the bracket and are optional free-roam interactions.

Upper block:

| # | Label | Icon | Edge |
|---|---|---|---|
| N30 | DESTROY STATUE | group member | flag |
| N31 | TAG STATUE | group member | flag |
| N32 | HACK BUS STOP | group member | flag |
| N33 | DESTROY BUS STOP | group member | flag |
| N34 | TAG BENCHES | group member | flag |
| N35 | OVERTURN BENCHES | group member | flag |
| N36 | HACK BILLBOARDS | group member | flag |
| N37 | TURN OFF BILLBOARDS | group member | flag |
| N38 | HACK ANDROID PARKING | group member | flag |
| N39 | DESTROY ANDROID PARKING | group member | flag |
| N40 | HACK STREET LIGHTS | group member | flag |
| N41 | TURN OFF STREET LIGHTS | group member | flag |
| N42 | DEPLOY BANNER | arrow | flag |
| N43 | FREE ANDROIDS IN SHOP WINDOWS | arrow | flag |
| N44 | OVERLOAD ELECTRIC SYSTEM | arrow | flag |

Lower block:

| # | Label | Icon | Edge |
|---|---|---|---|
| N45 | PUSH CAR | group member | > N47 |
| N46 | OVERTURN CAR | group member | > group N50/N51 |
| N47 | TAG CARS | arrow | flag |
| N48 | DESTROY WINDOWS | group member | > group N50/N51 |
| N49 | TAG WINDOWS | group member | flag |
| N50 | REFUSE MOLOTOV | group member | no outgoing edge |
| N51 | ACCEPT MOLOTOV | group member | > junction |
| N52 | PLANT FLAG | group member | no outgoing edge |
| N53 | MAKE A PYRE | group member | > junction |
| — | (junction icon) | merge | > N54–N58 |
| N54 | BURN COFFEE SHOP | arrow | flag |
| N55 | BURN DUMPSTERS | arrow | flag |
| N56 | BURN CARS | arrow | flag |
| N57 | BURN HOTEL | arrow | flag |
| N58 | BURN CYBERLIFE | arrow | flag |

The bracket's right side > N59/N60 group and > N66.

### E. Aftermath and endings (`cp-6.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N59 | FAIL TO SEND A MESSAGE | group member, ✗ | > N61 |
| N60 | SEND A STRONG MESSAGE | group member, ✓ | > group N62/N63 |
| N61 | **MARKUS FAILED TO DELIVER HIS MESSAGE** | ending tile, no icon | ENDING |
| N62 | AGGRESSIVE MESSAGE | group member | > N64 |
| N63 | PACIFIST MESSAGE | group member | > N65 |
| N64 | **MARKUS LED A VIOLENT RIOT** | ending tile, no icon | ENDING |
| N65 | **MARKUS LED A PEACEFUL PROTEST** | ending tile, no icon | ENDING |
| N66 | POLICE PATROL ARRIVES | triangle | > group N67–N69 |
| N67 | KILL | group member, yellow padlock | > N70 |
| N68 | SPARE | group member, yellow padlock | > N70 |
| N69 | LET CROWD DECIDE | group member, yellow padlock | > N70 |
| N70 | TEAM RETURN TO JERICHO | triangle | end of chart |

**Totals:**
- 70 boxes and 70 distinct labels, with no repeats.
- Six ending tiles (N19, N24, N26, N61, N64, N65), which matches `endings=6`.
- Four checkpoint tiles: N1, N6, N27, N29.
- 18 choice groups:
  - 3 execution checks: N4/N5, N8/N9, N12/N13;
  - 3 derived outcomes: N22/N23, N59/N60, N62/N63;
  - 12 player decisions: N16–N18, the 9 Spread pairs N30–N41 and N45–N53 (statue, bus stop, benches, billboards, parking, lights, car, windows, kiosk), N50/N51, and N67–N69.
- The three message endings are not terminal. POLICE PATROL ARRIVES branches from the same bracket edge, so the police scene follows every path that reached MAKE A STATEMENT (§2 D11).

Flag nodes have no outgoing edge. The game records them as state:
- DESTROY DRONE, BLOCK ROAD and HIDE (all three feed the POLICE NOT ALERTED test, §2);
- HIDE AND HACK RADIO and FEIGN KISS;
- every Spread action except OVERTURN CAR, DESTROY WINDOWS, PUSH CAR, ACCEPT MOLOTOV and MAKE A PYRE.

### Interactions not on the chart (transcript, wiki Notes, PowerPyx)

- **Jericho prologue.** The scene opens in Jericho with North, Josh and possibly Simon arguing about the broadcast (lines in §4). Markus then gives the plan: "There are five CyberLife stores across Detroit… We break into five teams, one for each store. We hack their security systems and we strike... / simultaneously at 2AM. No violence." The chart has no node for it.
- **Ambient interactions.** Each is a dead end with no stat icon:
  - "Look at the statue": "We are superior to them but they are our masters… / That’s about to change…"
  - "Look inside stores": "You'll soon be with us."
  - Converting street androids before the store: "You're free." PowerPyx commenters Ben and DogeChan describe gardeners, parked androids and snow shovellers; none of these has a chart node.
- **Store analysis.** Markus scans the store window, the store androids and the security cameras:
  - "REINFORCED GRID SHUTTER / Fiber-Reinforced Polymer / Toughened Glass Door"
  - "AP SERIES", "AX SERIES", "WJ SERIES"
  - "SECURITY CAMERA / NETWORK #894.084.241.056"

  He then follows the camera network to two androids in a hole in the sidewalk ("ALARM NETWORK / CyberLife NETID #1523 / GRID Junction 23.A"), converts them, and the alarm is down.
- **Police drone scan:** "POLICE DRONE / Serial #87199 / Firewall active". Markus reconstructs its route (`GUI.ACTION.08M.DRONEREC` "Reconstruct Route") and climbs the scaffold.
- **Police car scan** (HIDE AND HACK RADIO). Officer "P.O CHEN, TINA / ID #5195 UNIT #975 / 917 Lapeer Street - DETROIT", "PATROL #00975 / Assigned to Capitol Park H.D.", "POLICE RADIO MODULE / Frequency 453.02500". Her partner is Robert Lewis (Tina_Chen page).
- **The other North.** Inside the store, North stares at a BL100 that looks like her. Markus: "North… Are you okay?" North: "Let’s get them out of here."
  - The wiki footnote says looking at the BL100 "unlocks an additional dialogue option "Other North" when talking to North at the beginning of Freedom March".
  - PowerPyx commenter Lieven: "press L1 when looking at them and do that before you free one of the androids on the singular white stands at the back of the store".
  - The chart has no node for it (§4).
- **The store speech** (scripted, no choice). It starts "I am Markus… and just like you, I was a slave… an object, designed to obey them…" and ends "Or you can come join us, fight alongside us... You are free now..." The androids answer "I’m with you." / "We're with you!"; Markus: "THEN FOLLOW ME!"
- **Tagging prompts** (en.json `X0802M.DEMONSTR.CHOICES`). A tag action asks TAG SYMBOL or TAG SLOGAN, then one of four symbols or a slogan. Slogan strings in the file:
  - "I THINK THEREFORE I AM", "WE HAVE A DREAM", "ONE PLANET. TWO RACES", "EQUAL RIGHTS FOR ANDROIDS!"
  - "I CAN’T BREATHE BUT I’M ALIVE", "NOT YOUR SLAVE ANYMORE!", "BLUE POWER", "WE ANDROID NATION"
  - A second set: "I AM SOMEBODY", "WE THINK THEREFORE WE ARE", "WE ARE PEOPLE"

  The wiki says "There are four slogans", two of them "We have a dream" and "I think therefore I am". The symbol and slogan picks are cosmetic.
- **Smoke bomb.** `GUI.ACTION.08M.SMOKE` "Smoke Bomb" exists, and the SEND_A_MESSAGE trophy page lists "Throw smoke bomb" as a pacifist action. The chart has no node for it.
- **Idle in the Spread phase.** North: "They're waiting for your instructions, Markus! Show them what to do!" / "There's not much time! What are you waiting for, Markus?" / "We gotta go, Markus. The humans will arrive any minute now!" After a second timeout comes FAIL TO SEND A MESSAGE (§2 D10).
- **North and the slaughtered androids.** At POLICE PATROL ARRIVES, North is found crying ("They killed them… / they slaughtered them like animals…") beside her destroyed look-alike (North page; BL100 page: "A white BL100 is shot by a policeman in Capitol Park"). Chris Miller: "Chris and his partner arrive on scene and gun down several androids that are fleeing the area."
- **Draft content, not in the shipped game.** Do not use any of these:
  - en.json `X0802M.FREEANDROIDS.*`: picking Simon, Josh or "Marla" as a partner, a "Lime store", and a WAKEUP > PEACE/VIOLENCE choice;
  - `X0802M.CYBERSHOP.BIGTALK.PC.CHOICE01` "PEACEFUL DEMONSTRATION / VIOLENT DEMONSTRATION";
  - `X0802M.AFTERMATHS.TV.*` (Lime stores);
  - `X0802M.E32017.*` (E3 trailer);
  - `X0802M.DRONES.ARRIVAL` ("TEMP:" lines);
  - `X0802M.EYEFOREYE.COPS.*`, where Josh and Simon say "Violence begets violence. We can't kill them in cold blood."

  None of these appear in the `FL` template. The shipped game has no explicit peaceful/violent choice: the outcome comes from the meter (§2 D10).

---

## 2. Choices and gates

D numbers are player decisions. Q numbers are execution checks. Node numbers refer to §1.

**D0. Magazines (N2, N3).** Optional (§6).

**Q1. The first police car (N4/N5).** North: "MARKUS! THIS WAY! QUICK!"
- AVOID POLICE CAR: hide behind the container with North. North: "It’s okay… They’re gone…"
- NORTH SAVES YOU: "stand still, don’t press any buttons" (PowerPyx). North: "The hell are you doing? / You almost got us caught…"
- Relationship effects in §3. Both lead to REACH STORE; no lasting flag beyond the icons.

**The 10-minute timer (N25 > N26).** The timer starts on arrival at the store. Markus: "There's ten minutes until all our teams attack."
- North's prompts: "We gotta be fast, there's not much time.", "We're down to five minutes Markus. If we're not inside by then we'll have to give up.", "There's no more time…"
- PowerPyx: "simply wait for 10 minutes and the mission will fail automatically". DogeChan: the timer "does not start until you reach the shop".
- Expiry > OUT OF TIME > RETREAT. The radio (Simon if alive, else Josh): "Markus, we did it! / All teams succeeded – our people are free." North: "This place is gonna be crawling with cops. We have to go."

**D1. Securing the plaza: order and completeness (N7–N13, free roam).** Three optional objectives, in any order:
- **Drone:** JUMP ON DRONE > Q2.
- **Alarm:** DEACTIVATE ALARM. Analyse the store, follow the network, convert the two technicians. If the drone is still flying, this triggers Q3. Wiki: "Get Spotted By Drone (if drone was not destroyed …)", "Hide (if drone was not destroyed)".
- **Road:** BLOCK ROAD. Convert the two road workers and move the sign. Markus: "We have to block the road." North: "There… nobody should bother us now."

**Q2. The drone (N8/N9).** PowerPyx: "jump on the drone. Then mash ✕ really fast to destroy it."
- DESTROY DRONE ✓. North: "I hope it didn't have time to call the cops…"
- FALL FROM DRONE ✗ ("don’t press any buttons"). Drone: "You are committing a class 3 offense. / This infraction is being reported to the Police." > NORTH DESTROYS DRONE > POLICE CAR ARRIVES.

**Q3. Drone at the alarm junction (N12/N13).** North: "Markus! Watch out!"
- HIDE ✓: "When the drone comes, choose the HIDE option". North: "Nice job Markus." The drone is still alive and must still be destroyed.
- GET SPOTTED BY DRONE ✗ ("let the timer run down"). Drone warning > NORTH DESTROYS DRONE > POLICE CAR ARRIVES.

**D2. The police car (N15 > N16–N18).** This happens only after Q2 or Q3 fails. North: "Shit… They're coming, Markus!" Transcript choice labels (`GUI.ACTION`), with chart labels:
- **Abandon Mission** (chart RUN AWAY) > DECIDED TO FLEE (ending). "We gotta go!… If we stay here, we're gonna get shot!"
  - DogeChan (PowerPyx): "the option to FLEE/RUN AWAY is not actually a prompt, you simply have to wait out the (short) timer, and Markus will then run away".
  - The timeout line "What are you doing, Markus? We've gotta get out of here right now!" (`POLICECAR.GHOSTCHOICE.TIMEOUT`) supports this.
- **HIDE** (chart HIDE AND HACK RADIO). The officers get out and look for the drone ("only the signal stopped suddenly…"). Markus scans the car and spoofs dispatch: "Suspected robbery in progress at the warehouse on Jefferson and Walker." They leave. North: "I gotta hand it to you, Markus… / That was impressive."
- **Act Natural** (chart FEIGN KISS). Markus kisses North so the patrol drives past without getting out (Tina_Chen page). North: "What’s wrong with you? You crazy or what?" Markus: "The cops were coming, I had to do something!" North: "Never do that again, got it?"
- After HIDE or Act Natural, play continues in the plaza and the drone counts as destroyed (by North).

**D3. Ram the store (N20 > N21 > N22/N23).** FIND TRUCK: look through the gap at the end of the blue fence. Markus: "We need to find a truck to ram the storefront." Then jump the fence, break it open, take the truck and ram the store.

The outcome is a gate, not a choice. The transcript's "Markus and North have to flee" block lists three failure conditions, each with its own line:
- "Alarm wasn't deactivated": "We didn't deactivate the alarm!"
- "Drone wasn't destroyed": "We forgot about the drone…"
- "Road wasn't blocked": "He saw us... / I knew we should've blocked the road…"

So **POLICE NOT ALERTED requires the alarm deactivated, the drone destroyed (by Markus or North) and the road blocked.** Otherwise POLICE ALERTED > HAD TO FLEE. Markus: "It's too late, North! / We failed."
- PowerPyx gives only alarm and drone.
- PowerPyx commenter CharmedAnt reports the truck would not start until "secure the area" was done, and ChibiHoshi answers that this is the road block (§8).

**D4. Inside the store (N27 > N28).** CONVERT ANDROIDS AND MAKE A STATEMENT is unmissable ("Unmissable after you ram into the store (without triggering alarm)"). Optional: look at the other North (§1).

**D5–D9. Spread your message (N30–N58).** This is a free-roam phase with optional interactions. Each one moves a hidden peaceful/violent meter. In-game prompts from en.json are in brackets.

| Object | Peaceful option | Violent option | Notes |
|---|---|---|---|
| Statue (in the park) | TAG STATUE [Tag]: "We don't need masters anymore. / We're free." | DESTROY STATUE [Push]: "We'll never be slaves again!" | Destroy: North ▲ |
| Bus stop | HACK BUS STOP [HACK] | DESTROY BUS STOP [DESTROY] | |
| Benches | TAG BENCHES [TAG] | OVERTURN BENCHES [KNOCK]; North: "Let me help!" | A third string, BURN, exists for benches |
| Billboards ("Get Yours Today") | TURN OFF BILLBOARDS [TURN OFF] | HACK BILLBOARDS [MARKUS MESSAGE / ANDROID SYMBOL] | Wiki: "Hack Billboards will cause different reaction based on Markus' speech in The Stratford Tower". The BURN_THE_PLACE trophy lists "Hijack screen" as violent |
| Android parking | HACK ANDROID PARKING [HACK] | DESTROY ANDROID PARKING [DESTROY] | |
| Street lights | HACK STREET LIGHTS | TURN OFF STREET LIGHTS | SEND_A_MESSAGE trophy: "Hack streetlight" is pacifist; BURN_THE_PLACE: "Blackout streetlight" is violent. Wiki: "Hack Street Lights and Deploy Banner will depend on current violent/peaceful ratio" |
| Car | PUSH CAR [CREATE BARRICADE / "Move on Road"] > TAG CARS | OVERTURN CAR [DESTROY / "Upturn"] > molotov offer | Commenter Stefan: the electric system cannot be overloaded after a car is pushed |
| Windows by the store | TAG WINDOWS [Tag] | DESTROY WINDOWS [Destroy] > molotov offer | |
| Kiosk / pavilion | PLANT FLAG [PLANT OUR FLAG] | MAKE A PYRE [PREPARE PYRE] | PowerPyx: go there first and North hands you the molotov; "TAKE to ‘Make a Pyre’ and REFUSE to ‘Plant Flag’" |
| Tall building | DEPLOY BANNER (single) | — | Trophy page: "Climb building and place giant flag" is pacifist |
| Shop windows across the road | — | FREE ANDROIDS IN SHOP WINDOWS (single, smash glass) | Trophy page: violent. Wiki Note: "It is possible to free the androids from the shop windows … during a peaceful protest and have the game mechanics still treat it as a peaceful protest" |
| Car recharge stations | — | OVERLOAD ELECTRIC SYSTEM (single) | Valence not stated by any source |
| Smoke bomb | (not on chart) | | Trophy page: pacifist |

**D8. The molotov (N50/N51).** North: "Markus! / Violence is the only language humans understand..."
- **REFUSE**: "And I want them to understand… but I do not want to start a war." North: "They won’t listen if they’re not afraid." Markus: "Then they won’t have a choice."
- **TAKE**: Markus throws it; the kiosk becomes a pyre or the nearest target burns.
- **When it is offered:** at the kiosk, or after OVERTURN CAR or DESTROY WINDOWS (Henry Gerull, Nolan Peacock).
- **When it is not offered.** Wiki Note: "if enough peaceful actions were chosen prior then North will not offer Markus the molotov cocktail and Markus will simply plant the flag without any interference. This also avoids decreasing Markus' relationship with North."
- **Effect on the ending.** Commenters Jd, Ravyn Black and Tjones say accepting it forces the violent ending: "If you accept the molotov, even if it’s the only violent action you do, it automatically gets you a riot."

**D9. Burn targets (N54–N58).** These are available only after TAKE or MAKE A PYRE.
- BURN COFFEE SHOP and BURN HOTEL: push a burning dumpster in. Garbage-bin prompt: KNOCK OVER / PUSH THROUGH WINDOW.
- BURN DUMPSTERS, BURN CARS.
- BURN CYBERLIFE: "by throwing a molotov at the truck you used earlier" (Henry Gerull).
- Followers copy Markus, so not all five can be credited in one run (Kyrie, Nolan Peacock).

**D10. Outcome of the message (N59–N65).** This is derived, not chosen.
- **FAIL TO SEND A MESSAGE.**
  - Wiki footnote: "This option becomes unavailable once you have taken any action which influences the violent/pacifist meter, so the only way to unlock it is to not take any action in the "spread your message" section, and wait a couple of minutes for a cutscene to trigger."
  - Then North: "Why didn't you do anything? / This was our only chance to send a message and you just fucking stood there!"
- **SEND A STRONG MESSAGE.**
  - Wiki footnote: "You must have at least 60% on either side of the violent/pacifist meter to trigger either of the "aggressive message" or "pacifist message" nodes. However, even if the "pacifist message" node is chosen, it can still lead to the "Markus led a violent riot" ending, if enough violent options were chosen."
  - PowerPyx: "I got it with 60/40 split in favor of violent riot".
- **What happens between 40% and 60%, after at least one action, is not stated (§8).**
- North's reactions at the end of the Spread phase:
  - Pacifist: "We sent a message without violence, just like you wanted… / I hope you know what you’re doing…" Markus: "You can't fight violence with violence." North: "Unless there's no other choice..."
  - Aggressive: "Now humans will have no choice but to listen to us…" Markus: "They'll be afraid… / and fear feeds hatred…" North: "I’ll take hatred over indifference."

**D11. The police officers (N66 > N67–N69).**
- The setup: two officers, Chris Miller and an unnamed partner, gun down fleeing androids and are overpowered. An android holds one of their pistols on them as they kneel.
  - Androids: "They killed our people, Markus…", "We want justice, Markus!", "They have to pay!"
  - Chris: "You don't have to do this… / No… / Please… / Please…"
- Transcript choice labels, with chart labels:
  - **REVENGE** (KILL): "No crime against an android shall go unpunished." Markus shoots both officers (Relationship_Stat: "Choosing to shoot the police officers").
  - **SPARE** (SPARE): "An eye for an eye and the world goes blind… / We won’t punish a crime with another crime."
  - **DON'T DECIDE** (LET CROWD DECIDE): "It's up to you to decide." Wiki Note: "he passes the gun to a fellow android, asking the crowd to decide. The game will fade to black with two gunshot sounds. The crowd will always kill despite Markus' previously peaceful or violent actions."
- The transcript's news uses one condition, "Killed Chris and his partner", for both KILL and LET CROWD DECIDE.
- No source says what happens if the timer runs out (§8).
- **Gate:** reached only after INSIDE THE STORE. PowerPyx says it also follows FAIL TO SEND A MESSAGE: "You still need to finish the scene with the cops to end the chapter."
- Then TEAM RETURN TO JERICHO and the news montage (§6).

**Summary.**
- **Decision points:**
  - 12 player decisions: D2, the 9 Spread pairs, the molotov (D8) and the officers (D11).
  - Plus optional single actions: banner, shop windows, electric system, tag cars, five burns, magazines, looking at the other North.
  - Plus the securing order and the timing of the ram (D1, D3).
- **Execution checks:** 3 (Q1, Q2, Q3).
- **Timers:** 2 (the 10-minute store timer and the Spread-phase timer).
- **Choices that change later chapters:**
  - D11 (Chris lives or dies);
  - the message outcome (D10);
  - reaching the store or fleeing;
  - looking at the other North;
  - the North and Jericho relationship totals (§4).
- **Markus and North cannot die in this chapter.** There is no skull on the chart; every failure is a retreat.
- **Deaths:**
  - Chris Miller and his partner (KILL or LET CROWD DECIDE);
  - an unspecified number of freed androids, shot by the police in a cutscene on every path that reaches POLICE PATROL ARRIVES, including North's BL100 look-alike.

---

## 3. Numbers

- **Probabilities:** none. No source gives a percentage for any node.
- **Timers:**
  - Store: 10 minutes (in-game "There's ten minutes until all our teams attack"; PowerPyx "wait for 10 minutes"; Relationship_Stat "Markus let the ten minutes pass by"). North warns at five minutes.
  - Spread phase: unquantified. PowerPyx: "a few minutes"; Henry Gerull: "the time limit for transforming Capitol Park is way more strict when you are violent". No source gives a duration.
  - Drone hide prompt and police-car prompt: unquantified ("let the timer run down", "(short) timer").
- **Meter threshold:** "at least 60% on either side of the violent/pacifist meter" (wiki footnote). No per-action weights are published.
- **Software instability:** not applicable (Connor-only stat).
- Levels (Relationship_Stat):
  - Jericho: "Leader / Admired / Respected / Neutral (Initial) / Unpopular / Rejected".
  - North, Josh and Simon: "Lover (Exclusive to North…) / Companion / Friend / Neutral (Initial) / Resentful / Hostile".
- Public opinion levels: "Supportive / Sympathetic / Indifferent / Skeptical (Initial) / Hostile / Hated".

### Relationship changes

The icons are small (▲/▼) or large (▲▲/▼▼). PowerPyx writes ▲▲▲/▼▼▼ for large. No source gives a numeric value. "T" = transcript (`FL` template `app-relation`). "W" = wiki chapter page. "RS" = Relationship_Stat. "PP" = PowerPyx text or comments.

| Trigger | Jericho | North | Josh | Simon | Sources |
|---|---|---|---|---|---|
| NORTH SAVES YOU (fail to hide from first police car) | ▼ | ▼ | | | T: "Fail to hide, North saves Markus" `North SmallDown`, `Jericho SmallDown`; W: "If North had to save Markus from being spotted by a police car" (both); RS both; PP "North▼" |
| DESTROY DRONE | | ▲ | | | T `North SmallUp`; W "If Markus takes down the police drone"; RS "Destroying the drone first"; commenters Karnnie, yossiz74 |
| FALL FROM DRONE | ▼ | ▼ | | | T "Fail to destroy drone" `Jericho SmallDown`, `North SmallDown`; W "If Markus fails to take down the drone" (both); PP "North▼, Jericho▼" |
| HIDE (from drone at the alarm) | | ▲ | | | T `North SmallUp`; RS "Deactivating the alarm or hiding from the drone after deactivating the alarm"; W "If Markus deactivated the alarm after destroying the drone or hid from it" (§8) |
| GET SPOTTED BY DRONE | ▼ (W, RS only) | ▼ | | | T "Fail to hide" `North SmallDown` only; W "If Markus was spotted by the drone" lists Jericho ▼ and North ▼; RS "Failing to destroy the drone or being seen by it" (Jericho ▼, North ▼) (§8) |
| Police car: HIDE AND HACK RADIO | | ▲ | | | T HIDE `North SmallUp`; W "If Markus distracts the police officers with a fake radio call"; RS "Hiding from the police car after getting spotted by the drone"; PP "North ▲" |
| Police car: FEIGN KISS (Act Natural) | | ▼▼ | | | T `North LargeDown`; W "If Markus tricks the police officers by kissing her without her permission {{Icon\|largedown}}"; RS "Kissing North after getting spotted by the drone"; PP "North▼▼▼" |
| Police car: RUN AWAY (Abandon Mission) > DECIDED TO FLEE | ▼▼ | ▼ | (▼) | (▼) | T `Jericho LargeDown`, `North SmallDown`; W "fails to invade the CyberLife warehouse" (Jericho largedown, North down); RS "Markus was spotted by a drone and chose to run away or do nothing". W footnote: "Although not stated by the game, failing to invade the CyberLife warehouse will also lower relationship with Josh and Simon." |
| OUT OF TIME > RETREAT | ▼▼ (RS, W, PP) | ▼ (RS, W, PP) | (▼) | (▼) | RS "Markus let the ten minutes pass by without doing anything"; PP "Jericho▼▼▼, North▼". **The transcript shows no icon on the timeout block** (§8) |
| POLICE ALERTED > HAD TO FLEE | ▼▼ (RS, W) | ▼ (RS, W) | (▼) | (▼) | RS "Markus failed to secure the area before ramming the store with the truck". **No icon in the transcript** (§8) |
| CONVERT ANDROIDS AND MAKE A STATEMENT (unavoidable once inside) | ▲▲ | ▲▲ | | | T "Talk to androids" `North LargeUp`, `Jericho LargeUp`; W "If Markus successfully raids the CyberLife warehouse and recruits the androids inside {{Icon\|largeup}}" (both); PP "North ▲▲▲, Jericho ▲▲▲" |
| DESTROY STATUE | | ▲ | | | T `North SmallUp`; W "If Markus destroys the statue"; RS; commenter Adam |
| TAG STATUE | | | | | T: no icon |
| OVERTURN BENCHES, OVERTURN CAR, DESTROY ANDROID PARKING, FREE ANDROIDS IN SHOP WINDOWS | | ▲ (W) | | | W "If Markus removes a bench, overturns a car, destroys android parking or breaks the glass to free androids {{Icon\|up}}"; RS "Choosing to burn/damage the buildings and/or objects", "overturn the benches". **No icon in the transcript** for any of these. It is unclear whether this is one ▲ per action or one in total (§8) |
| FREE ANDROIDS IN SHOP WINDOWS | ▲ | (see above) | | | W "If Markus breaks the glass to free androids {{icon\|up}}"; RS "Choosing to free the androids in the shop windows"; commenter Adam. No icon in the transcript |
| ACCEPT MOLOTOV (TAKE) | | ▲ | | | T `North SmallUp`; W "If Markus takes the molotov from North"; RS |
| REFUSE MOLOTOV | | ▼ | | | T `North SmallDown`; W "If Markus refuses to take molotov from North"; RS |
| Idle twice > FAIL TO SEND A MESSAGE | | ▼ | | | T "Take too much time again" `North SmallDown`; W "If Markus does nothing in sending a message"; RS "Failing to deliver a strong enough message" |
| AGGRESSIVE MESSAGE | | ▲ | | | T "Sent an aggressive message" `North SmallUp`; W "If Markus leads a violent protest"; RS; Adam: "Completing a pacifist riot has no effect" |
| PACIFIST MESSAGE | | | | | T: no icon |
| KILL (REVENGE) | | ▲ | | | T `North SmallUp`; W "If Markus shoots the police officers"; RS |
| SPARE | | | | | T: no icon; no wiki line |
| LET CROWD DECIDE (DON'T DECIDE) | | | | | T: no icon; Adam: "has no effect with North" |
| Tagging, hacking, PLANT FLAG, DEPLOY BANNER, the burn nodes, magazines, looking at the other North | | | | | No icon in any source |

**There is no Josh or Simon icon anywhere in the `FL` template.** Josh and Simon appear only on the radio and in the Jericho prologue. The wiki's Josh/Simon ▼ for failing comes only from its own footnote, which says the game does not state it.

Ranges per path, with the transcript as base:
- **Successful raid, pacifist, SPARE.** Jericho ▲▲. North ▲▲, plus ▲ per drone/hide success, minus ▼ for REFUSE MOLOTOV if it was offered.
- **Successful raid, violent, KILL.** Jericho ▲▲. North ▲▲ ▲ ▲ ▲ (convert, molotov, aggressive, kill), plus statue and drone ▲.
- **Flee endings.** Jericho ▼▼, North ▼, by RS. The transcript has these only on Abandon Mission.

### Public opinion

All public-opinion effects are applied in the closing news montage (§6). Nothing earlier in the chapter moves public opinion.

| Condition | Effect | Sources |
|---|---|---|
| PACIFIST MESSAGE (MARKUS LED A PEACEFUL PROTEST) | ▲▲ large up | T "Sent a pacifist message" `PublicOpinion LargeUp`; W "If Markus sends a peaceful message or fails to deliver a message {{Icon\|largeup}}"; Public_Opinion Large Increase "Markus led a peaceful protest." |
| FAIL TO SEND A MESSAGE (MARKUS FAILED TO DELIVER HIS MESSAGE) | ▲▲ large up (W, Public_Opinion) | W (same line); Public_Opinion Large Increase "Markus failed to deliver his message." **The transcript's news block has only "pacifist" and "aggressive" conditions**, so which news plays for the failed case is unconfirmed (§8) |
| AGGRESSIVE MESSAGE (MARKUS LED A VIOLENT RIOT) | ▼▼ large down | T "Sent an aggressive message" `PublicOpinion LargeDown`; W "If Markus sends a violent message {{Icon\|largedown}}"; Public_Opinion Large Decrease "If the Capitol Park chapter concludes with the "Markus led a violent riot" ending." |
| KILL or LET CROWD DECIDE | ▼▼ large down | T "Killed Chris and his partner" `PublicOpinion LargeDown`; W "If police officers were killed by either Markus or the android crowd {{Icon\|largedown}}"; Public_Opinion "Choosing to shoot or letting the androids shoot the police officers" |
| SPARE | none | T "Didn't kill Chris and his partner": no icon. No wiki line. PowerPyx commenter Adam claims "Sparing the two police officers gives major positive karma for public opinion"; no other source supports this, so it is treated as wrong |
| Flee endings (RETREAT, DECIDED TO FLEE, HAD TO FLEE) | none | No news montage on these paths (transcript "Mission failed" block); no wiki line |

Net public opinion per path:
- Pacifist + SPARE: ▲▲.
- Pacifist + KILL or CROWD: ▲▲ ▼▼.
- Violent + SPARE: ▼▼.
- Violent + KILL or CROWD: ▼▼ ▼▼.
- Failed + SPARE: ▲▲ (wiki).
- Flee: 0.

The meter itself (the share of violent actions) has no direct public-opinion effect beyond deciding which ending applies.

---

## 4. Cross-chapter dependencies

### Into this chapter

From **The Stratford Tower** (transcript conditions in the Jericho prologue):
- **Simon's status.**
  - "Simon is here" (escaped intact), Simon: "Our broadcast is all over the news… / We got what we wanted. / Now humans know…"
  - "Simon was left behind or died in Stratford Tower", Josh: "Our broadcast is all over the news. / Now humans know…"
- **Speech tone.**
  - "Sent a peaceful message", North: "It was a mistake to reach out to them. / They’ll never negotiate with their slaves." Josh: "Violence is never the answer. / Dialogue is the only way, I'm sure the humans will listen to us."
  - "Sent a violent message", Josh: "They took Markus’ message as a threat…" North: "He did the right thing. This is the only language humans understand." Josh: "…A confrontation will get us nowhere."
- **The argument** depends on Simon again:
  - With Simon: "Killing humans wasn't part of the plan." … Simon: "THAT'S ENOUGH!"
  - Without Simon: Josh: "Simon paid with his life…" North: "He's a hero! / He died for the revolution – and he won't be the last!" … Markus: "THAT'S ENOUGH!"
- The radio lines at the store timeout and in "Mission failed" switch between Simon and Josh on "Simon is alive" / "Simon is dead". At the police arrival they switch on "Simon is here" / "Simon was left behind or died".
- Wiki Note: "Hack Billboards will cause different reaction based on Markus' speech in The Stratford Tower."
- Simon page: "If Simon was not injured or killed in Stratford Tower, he talks about their broadcast with Josh and North in Jericho." Wiki Note: "Simon can physically appear in this chapter." (§8).

No other earlier choice gates anything here. Relationship levels do not gate any option.

### Out of this chapter

**Meet Kamski (Connor).**
- Wiki flowchart: "{{Icon|impact}} Cops spared in 'Capitol Park' OR {{Icon|impact}} Cops killed in 'Capitol Park'" > "Learn Chris Survived OR Learn Chris Is Dead".
- Hank's lines (`wL`):
  - Killed: "Chris was on patrol last night and he got attacked by deviants… / They found his body early this morning… / He was executed in cold blood with his own service weapon… / He became a father three months ago". An alternative line has "He'd been beat to death…".
  - Spared: "He said he was saved by Markus himself... / Yeah, he’s in shock but,… / he’s alive…"
- A walk option CHRIS is unlocked by either state. No relation icon is attached.

**Freedom March, the roof conversation** (`kL`, CHOICE02; each option is a locked choice unlocked by a Capitol Park condition):
- **FOLLOWERS**, condition "Sent a pacifist message in Capitol Park": "They all obey me, they follow me without question… / And that much power feels good… / and scary". The wiki footnote instead ties "Followers" to SEND A STRONG MESSAGE (§8).
- **APPEAL OF POWER**, condition "Sent an aggressive message": "Yesterday, / when we set fire to that place… / In that moment, I enjoyed it…"
- **REGRET POLICEMAN**, condition "Markus killed Chris and his partner": "I just can’t stop thinking about those two policemen…". Wiki footnote on KILL: "unlocks the "Regret Policeman" dialogue option".
- **FAILED**, condition "Failed to free the androids in Capitol Park": "I panicked last night… / We should have succeeded…". Freedom March Notes say instead: "if Markus failed to send a message during Capitol Park, a new dialogue option will unlock" (§8).
- None of the CHOICE02 options carries a relation icon.
- **OTHER NORTH**, condition "Looked at the other North in Capitol Park" (CHOICE06): `North SmallUp`. "That android you were looking at in the store… / She reminded you of who you were, didn’t she?" RS: "Choosing "other North" or "trust" when Markus asks about her past on the roof and he is at least her "friend"".

**Freedom March, North gates.**
- The CHOICE06 group follows "North is not hostile".
- "Connect with North" (Share Memories, which makes North a Lover) requires "North is friend or higher".
- Capitol Park is the chapter with the largest North swings before that check:
  - ▲▲ for converting the store androids;
  - up to ▲ ×5 more on the violent path;
  - ▼▼ for FEIGN KISS;
  - ▼ for each failure.
- Lover status in turn gates the kiss options: Crossroads "Kiss North OR Don't Kiss North" (refusing is ▼▼); Battle for Detroit Demonstration KISS; the revolution's CyberLife-store kiss.
- FEIGN KISS here is a separate, non-romantic kiss and does not count toward any of these.

**Freedom March, other effects.**
- **Magazine "Android Riot"** (Detroit Today). Location: "only if Markus succeeded in crashing the truck into the CyberLife store and awakening the androids inside, not to retreat." It reports the night as a riot by "psychotic machines" and says police "had no choice but to open fire". Its condition is the store raid, not a violent riot.
- **Crowd on the march route** (`kL` "People reacting to the march"): conditions "Shot the cops in Capitol Park" and "Didn't shoot the cops in Capitol Park". Public_Opinion Note: "The crowds that line the streets in Freedom March will show their support for the androids if Markus spares Chris and his partner in Capitol Park, but will shout in-universe slurs and will express a desire to see the androids burned alive if they are shot. Public Opinion does nothing to change this."
- North on the roof (unconditioned): "All the media are talking about what we did last night… / The humans are terrified... / Many of our people were burned in response to what happened…"

**Crossroads.** Josh page quote: ""You are responsible for the deaths of two policemen. Violence begets violence." - Josh during Crossroads if Markus killed Chris." The Crossroads wiki flowchart and the transcript templates checked here do not confirm it (§8).

**Public opinion** carries forward as the running stat. Battle for Detroit Demonstration: KISS or SING "will unlock a sympathetic path … (Only unlocks if public opinion is "sympathetic" at least)". This chapter can move public opinion by up to ▲▲ or ▼▼▼▼.

**Jericho** carries forward too. An Unpopular rating at Crossroads drops to Rejected (Markus ousted). The flee endings cost ▼▼ here, and the raid gains ▲▲.

**Trophies.**
- SEND A MESSAGE: "Markus conducted a pacifist riot". "Killing police officer Chris Miler does not void the trophy."
- BURN THE PLACE: "Markus conducted a violent riot". "Sparing Chris Miller does not void the trophy."

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| RETREAT | none | OUT OF TIME: the 10-minute timer expires before the store is rammed. Relationship (RS, W, PP): Jericho ▼▼, North ▼. No public-opinion change. Store androids not freed; other teams succeed (radio). |
| DECIDED TO FLEE | none | The drone is not destroyed by Markus (FALL FROM DRONE or GET SPOTTED BY DRONE) > NORTH DESTROYS DRONE > POLICE CAR ARRIVES > RUN AWAY (Abandon Mission, or let the timer run). Jericho ▼▼, North ▼ (transcript). |
| HAD TO FLEE | none | RAM STORE with the alarm still active, the drone not destroyed, or (transcript) the road not blocked > POLICE ALERTED. RS: Jericho ▼▼, North ▼; no transcript icon. |
| MARKUS FAILED TO DELIVER HIS MESSAGE | none | Inside the store, then no Spread action at all, and the phase times out twice. North ▼; public opinion ▲▲ (wiki). The police scene follows (PowerPyx). |
| MARKUS LED A VIOLENT RIOT | none | At least 60% violent (wiki footnote), or any accepted molotov (commenters). North ▲ (aggressive), public opinion ▼▼. The police scene follows. |
| MARKUS LED A PEACEFUL PROTEST | none | At least 60% pacifist and the molotov refused or never offered. Public opinion ▲▲. The police scene follows. |

- The three flee endings end the chapter early with the "Mission failed" exchange. North: "How could you get this so wrong? … The fate of our people is in your hands. / You have to succeed." There is no news montage and no police scene.
- The three message endings each continue to POLICE PATROL ARRIVES > KILL / SPARE / LET CROWD DECIDE > TEAM RETURN TO JERICHO. The officers' fate is recorded separately and is not an ending tile.
- Markus and North survive every ending.

---

## 6. Media

**Magazines at the mission start** ("found on a box at the start"; PowerPyx: "on the left side of where you start (before taking a single step in the chapter)"). No public-opinion effect.
- **Detroit Today, "Who Is It?"** (chart READ "WHO IS IT?"). Facts:
  - Cover: "The question everyone's asking"; side headlines "NATO Security Council divided over Arctic dispute", "UN warns of World War Three".
  - "Following the pirate broadcast in Detroit, everybody wants to know: who is this android?"
  - "A federal investigation is underway to track the machine down and neutralize it, but law enforcement is being very tight-lipped about the details."
  - "Eye-witnesses claim the android broke into the Stratford Tower … with a group of accomplices. The machines were armed and organized, clearly following orders from this mysterious ringleader."
  - "until this dangerous machine is destroyed, the speculation will continue."
- **Century, "An Android for President?"** (chart READ "ANDROID PRESIDENT?"). Facts:
  - "A recent study by an expert panel found that androids would be more effective than humans in a number of government positions, including that of President."
  - "androids are incorruptible and indifferent to any form of pressure … without having to worry about popularity or re-election".
  - "deemed it "just a matter of time" until public opinion is ready to accept the idea."
  - Side headlines: "Dating website discovered to have "less than 5% female members"", "Police to use marketing data to identify criminals early".

**Store voice-overs** (ambient, no effect):
- CyberLife window: "Our new AV models are always ready to serve – imagined by CyberLife, built in Detroit."
- Swish Motors, Coffee Central and Smith and White adverts.
- The CyberLife billboard reads "GET YOURS TODAY" (chart image).

**Closing news montage**, after TEAM RETURN TO JERICHO (transcript; carries every public-opinion change in §3):
- Opening: CTN, Brinkley: "…We interrupt this broadcast with breaking news..." KNC, Cartland: "This just in: at exactly 2AM several CyberLife stores in Detroit were raided..." Channel 16, Webb: "Different locations were hit in what seems to be a coordinated terrorist attack…"
- Pacifist (▲▲): Cartland: "…Most shop windows were covered with graffiti demanding rights for androids and other obscure slogans…" Webb: "Police report that pro-android graffiti was found in the neighborhoods of CyberLife's stores…"
- Aggressive (▼▼): Cartland: "Numerous storefronts have been broken, with cars vandalized and set alight, leaving many Detroit neighborhoods in chaos..." Webb: "Property was damaged and fires continue to rage in several major districts across the city..."
- Officers killed (▼▼): Brinkley: "…the bodies of two policemen patrolling the area were discovered near one of the CyberLife stores..." Cartland: "…the two officers were executed with their own service weapons..."
- Officers spared (no icon): Brinkley: "…two policemen were found in a state of shock near one of the CyberLife stores..." Webb: "…they confirm that the attackers were a group of androids..."
- Closing: Cartland: "This is an alarming situation. Could our machines now be turning against us?" Brinkley: "have androids become a threat to our security?" Webb: "Is this the beginning of a terrorist campaign, conducted right here in the United States?"

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) has three chapter-26 scenes, in order: R26 (media), M15 and M16 (decisions).

Logic in `benchmark/story-engine.mjs`:
- `apply` cases at lines 247–248:
  - `M15`: option 0 `po(2);josh(1)`; option 1 `po(-2);north(1);josh(-1)`.
  - `M16`: option 0 `north(-1);josh(1)`; option 1 `po(-2);north(1);josh(-1)`; option 2 `po(-2);josh(-1)` with the event "The crowd kills both officers."
- Media conditions at line 36: `capitolViolent` = `choiceAt(s,'M15')==='1'`, `capitolPeaceful` = otherwise.

R26, M15 and M16 have no gate in `blocked()`'s table (lines 76–146) and no `requires`, so all three are shown on every Markus path. Nothing records the raid's success, Chris's fate, the other North, or a failed message.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| Jericho prologue (not on chart) | M15 situation "{{Jericho}} is divided" | Partly covered. The game's prologue lines depend on Simon's status and the Stratford speech tone (§4); M15 reads neither. Acceptable as narration, but the plan (five stores, five teams, 2 AM, "No violence") is missing from the situation. |
| MISSION START, READ "WHO IS IT?", READ "ANDROID PRESIDENT?" | R26 | Covered. Facts match the wiki articles. Errors: (a) "emerging from the sewers … A magazine lies on a crate beside you" / title "by the manhole": sources say only "found on a box at the start"; the manhole detail comes from the later Android Riot article and is unsourced here. (b) The adaptationNote says "Watching certain news reports about android incidents lowers public opinion", but neither magazine has a public-opinion effect. |
| NORTH SAVES YOU / AVOID POLICE CAR | none | **Missing** (execution check; Jericho ▼, North ▼ on failure). |
| REACH STORE, the 10-minute timer, OUT OF TIME > RETREAT | none | **Missing**, including the ending. |
| SECURE THE PLACE: JUMP ON DRONE > DESTROY / FALL FROM DRONE; DEACTIVATE ALARM > GET SPOTTED / HIDE; BLOCK ROAD | none | **Missing.** These are the chapter's main checks, and their failure leads to two of the six endings. |
| NORTH DESTROYS DRONE > POLICE CAR ARRIVES > RUN AWAY / HIDE AND HACK RADIO / FEIGN KISS > DECIDED TO FLEE | none | **Missing.** A real three-way decision with relationship weight (FEIGN KISS ▼▼ North, RUN AWAY ▼▼ Jericho), and an ending. |
| FIND TRUCK > RAM STORE > POLICE NOT ALERTED / POLICE ALERTED > HAD TO FLEE | none | **Missing**, including the ending. Needs an alarm/drone/road state. |
| INSIDE THE STORE > CONVERT ANDROIDS AND MAKE A STATEMENT | M15 situation ("waking hundreds of androids") | Narrated only. **The unavoidable Jericho ▲▲ and North ▲▲ are not applied.** The situation also says "you have led your people into the city's android stores", but in the game Markus and North take one store (Capitol Park) while other teams take the other four. The other-North interaction (Freedom March impact) is missing. |
| MAKE A STATEMENT > SPREAD YOUR MESSAGE (9 choice pairs, 3 singles, TAG CARS) | M15 options 0/1 | **Collapsed into one binary choice.** The game has no single peaceful/violent prompt (the draft "PEACEFUL / VIOLENT DEMONSTRATION" choice is unused); the outcome comes from a meter over many small acts. Acceptable as an abstraction, but: (a) there is no way to do nothing, so FAIL TO SEND A MESSAGE and its ending are unreachable; (b) the per-act North ▲ (statue, and per the wiki benches, car, parking, glass) and Jericho ▲ (free androids in shop windows) are not modelled. |
| REFUSE MOLOTOV / ACCEPT MOLOTOV | folded into M15 ("{{North}} hands you a Molotov cocktail and waits") | **Missing as its own choice, and mislabelled.** In the game North offers it only at the kiosk or after overturning a car or smashing windows, and not at all if Markus has already been peaceful enough (wiki Note). Accepting gives North ▲ and (commenters) forces the violent ending; refusing gives North ▼. M15 option 0 applies no North ▼ for refusing. |
| BURN COFFEE SHOP … BURN CYBERLIFE, MAKE A PYRE | M15 option 1 outcome "the stores burn" | Narrated only; acceptable. |
| FAIL TO SEND A MESSAGE > MARKUS FAILED TO DELIVER HIS MESSAGE | none | **Missing** (North ▼; public opinion ▲▲ per wiki). |
| AGGRESSIVE MESSAGE > MARKUS LED A VIOLENT RIOT | M15 option 1 | Covered. `po(-2)` matches ▼▼. `north(1)` matches the aggressive-message ▲, but misses the molotov ▲ and statue ▲ that a violent run nearly always includes. **`josh(-1)` has no source** (no Josh icon anywhere in the chapter). |
| PACIFIST MESSAGE > MARKUS LED A PEACEFUL PROTEST | M15 option 0 | Covered. `po(2)` matches ▲▲. **`josh(+1)` has no source.** |
| POLICE PATROL ARRIVES | M16 situation | Partly covered. Errors: (a) "opened fire on your people, killing one": the sources say several fleeing androids were gunned down ("they slaughtered them like animals"), including North's BL100 look-alike. (b) "{{Josh}} says if you kill them you prove everything they say about you": **Josh is not present and has no line in the shipped scene.** The only Josh/Simon "Violence begets violence" lines are in an unused string group. The androids and North demand justice; nobody argues for mercy. (c) "North says … humans will only respect strength" is a paraphrase; in the shipped scene North only says "They killed them… they slaughtered them like animals…". (d) Not gated: the scene must not appear after any flee ending. |
| KILL / SPARE / LET CROWD DECIDE | M16 options 1 / 0 / 2 | Covered, but the order differs from the chart (KILL, SPARE, LET CROWD DECIDE). Effects: KILL `po(-2);north(1)` matches; **`josh(-1)` unsourced**. SPARE **`north(-1);josh(+1)` unsourced** (the transcript and wiki show no icon for SPARE); no public-opinion effect matches. LET CROWD DECIDE `po(-2)` matches; **`josh(-1)` unsourced**. Outcome 0, "The officers run for their car. The crowd mutters but lets them go", is unsourced; the game shows only Markus's line and the later news ("found in a state of shock"). The adaptationNote "The crowd always kills them" matches the wiki. |
| TEAM RETURN TO JERICHO, closing news | none | **Missing** as an event. The public-opinion changes are applied at the choice instead of at the news; the totals match except where noted above. |

### Downstream state the engine does not record but later chapters read

- **Raid succeeded or fled.**
  - Freedom March "Android Riot" magazine: the engine shows it on `capitolViolent`, but the wiki condition is "succeeded in crashing the truck … not to retreat". **It should show for a peaceful protest too.**
  - Freedom March FAILED roof option.
- **Chris Miller killed or spared.**
  - Meet Kamski: Hank's line and the CHRIS walk option.
  - Freedom March: crowd reaction and the REGRET POLICEMAN option.
  - Crossroads: Josh's line, wiki only.
  - Nothing reads `choiceAt(s,'M16')`.
- **Message: pacifist, aggressive or failed.** The Freedom March roof (FOLLOWERS, APPEAL OF POWER, FAILED). Only the two media conditions read M15.
- **Looked at the other North.** The Freedom March OTHER NORTH option (North ▲).
- **North's level.** "Connect with North" in Freedom March requires "North is friend or higher". M17 is currently ungated on North's level (lines 103 and 251), so Capitol Park's North changes have no downstream effect in the benchmark.

---

## 8. Open questions

1. **The POLICE NOT ALERTED gate.** Does an unblocked road alone cause HAD TO FLEE, as the transcript's third condition ("Road wasn't blocked") says? PowerPyx lists only the alarm and the drone. Can the truck be taken before all three objectives are done? CharmedAnt says the truck would not start until "secure the area" was complete.
2. **Relationship icons the wiki lists but the transcript does not:**
   - Jericho ▼ on GET SPOTTED BY DRONE;
   - North ▲ for "deactivated the alarm after destroying the drone" (beyond HIDE);
   - North ▲ for overturning a bench or car, destroying parking or freeing the shop-window androids, and whether this is one ▲ per act or one overall;
   - Jericho ▲ for freeing the shop-window androids;
   - Jericho ▼▼ and North ▼ on RETREAT and HAD TO FLEE (the transcript shows icons only on Abandon Mission);
   - Josh and Simon ▼ on any flee ending (the wiki footnote itself says "not stated by the game").
3. **FAIL TO SEND A MESSAGE:**
   - (a) Does the police scene still follow? PowerPyx says yes.
   - (b) Which news plays, and is the ▲▲ public opinion (wiki, Public_Opinion) applied, given that the transcript's news block has only pacifist and aggressive conditions?
   - (c) Commenter vlido could not trigger it after waiting 10 minutes.
4. **Freedom March roof conditions.** Is FOLLOWERS unlocked by a pacifist message (transcript) or by any strong message (wiki footnote)? Is FAILED unlocked by a flee ending ("Failed to free the androids", transcript) or by FAIL TO SEND A MESSAGE (Freedom March Notes)?
5. **Meter between 40% and 60%.** After at least one action, which ending applies if neither side reaches 60%? The wiki footnote also says a "pacifist message" node "can still lead to the "Markus led a violent riot" ending", but the chart draws each message node to its own ending.
6. **Does an accepted molotov always force the violent ending** (commenters), or does it only add a large violent weight? When exactly is the molotov withheld ("enough peaceful actions")?
7. **Ambiguous actions.** What are the valences of FREE ANDROIDS IN SHOP WINDOWS (trophy page: violent; wiki Note: can stay peaceful), HACK BILLBOARDS (speech-dependent; trophy page: "Hijack screen" violent), the street lights, DEPLOY BANNER (ratio-dependent) and OVERLOAD ELECTRIC SYSTEM (no source)?
8. **Officers: timer.** What happens if Markus makes no choice before the timer ends: default to LET CROWD DECIDE?
9. **Who is physically present at the police scene?** "Simon can physically appear in this chapter" (wiki). Does Simon (or Josh) arrive in person at POLICE PATROL ARRIVES, or only on the radio? This affects the M16 situation.
10. **Slogans.** Which four of the eleven slogan strings are offered in the shipped game? The wiki names "We have a dream" and "I think therefore I am".
11. **Blue boxes on PowerPyx's overview** include both FAIL TO SEND A MESSAGE and violent actions, so blue is not one path. This is cosmetic.
12. **The first police car (Q1).** Is AVOID POLICE CAR a timed prompt or free movement ("Hide behind the container")? Either way it is a check, not a choice.
13. **Crossroads Josh line** "You are responsible for the deaths of two policemen" (Josh page quote). Not found in the Crossroads wiki flowchart; confirm its condition in game.
14. **Benchmark scope.** The current M15/M16 pair cannot express:
    - the securing phase;
    - the police car decision;
    - the three flee endings;
    - the failed-message ending;
    - the molotov decision;
    - the other North.

    A rebuild needs at least these state fields: `capitolRaid` (fled or inside), `capitolMessage` (pacifist, aggressive or failed), `chrisDead`, `otherNorth`. It also needs gates on M16 and on the Freedom March media and roof options.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | Index; the chapter's walkthrough link |
| https://www.powerpyx.com/detroit-become-human-capitol-park-walkthrough-100/ | Walkthrough text: inputs per node, 10-minute timer, drone and hide checks, police-car options with relationship icons, ram-store conditions, Spread action locations, molotov timing, endings; reader comments on burn nodes, the other North, idle failure, the molotov forcing a riot, relationship observations, the run-away timer |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-flowchart-100.jpg | Whole-chart overview ("100% COMPLETED"), header stats, long edges, blue boxes |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-2.jpg | Header ("94% COMPLETED"); MISSION START, police-car group, magazines, REACH STORE |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-3.jpg | SECURE THE PLACE block, NORTH DESTROYS DRONE, POLICE CAR ARRIVES group, FIND TRUCK, RAM STORE, POLICE (NOT) ALERTED, OUT OF TIME, RETREAT |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-4.jpg | DECIDED TO FLEE, INSIDE THE STORE, CONVERT ANDROIDS AND MAKE A STATEMENT, HAD TO FLEE, MAKE A STATEMENT |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-5.jpg | SPREAD YOUR MESSAGE: all pairs, singles, molotov group, junction, burn nodes |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-capitol-park-6.jpg | FAIL/SEND group, AGGRESSIVE/PACIFIST group, the three message endings, POLICE PATROL ARRIVES, KILL/SPARE/LET CROWD DECIDE (padlocks), TEAM RETURN TO JERICHO |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json | Chapter page: infobox, text flowchart with footnotes (60% rule, fail rule, Followers/Regret/Other North unlocks), Notes, Relationship Changes, Public Opinion (saved as `wiki.txt`) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Every Capitol Park Jericho/North line; flee-ending ▼▼ list |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | Levels; peaceful/failed ▲▲, violent ▼▼, officers ▼▼; Freedom March crowd note |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | Connor-only stat |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Who_Is_It%3F&prop=wikitext&format=json | Magazine text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=An_Android_for_President%3F&prop=wikitext&format=json | Magazine text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | Magazine list (both in Capitol Park) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Riot&prop=wikitext&format=json | Freedom March magazine; condition "succeeded in crashing the truck into the CyberLife store" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chris_Miller&prop=wikitext&format=json | The officers' scene; Meet Kamski consequences |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Tina_Chen&prop=wikitext&format=json | Police-car officers (Tina Chen, Robert Lewis); FEIGN KISS makes them drive by |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=BL100&prop=wikitext&format=json | North's look-alike; shot by a policeman |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park_(location)&prop=wikitext&format=json | Location, stores, statue |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json | Chapter summary from North's side (look-alike, arguments, flee conditions) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json | Prologue argument; Crossroads "two policemen" quote |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Simon's presence in the prologue |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json | Chapter summary; speech and officer-choice quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json | Roof conversation, failed-message dialogue note, relationship and public-opinion lists |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json | "Cops spared / killed in 'Capitol Park'" impact nodes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | Kiss North gate (checked; no Capitol Park condition) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | Kiss/sing public-opinion gate (checked) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | SEND A MESSAGE / BURN THE PLACE |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=SEND_A_MESSAGE&prop=wikitext&format=json | List of pacifist actions (incl. smoke bomb); killing Chris does not void it |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=BURN_THE_PLACE&prop=wikitext&format=json | List of violent actions (incl. shop-window glass, hijack screen) |
| https://detroitbecometext.github.io/chapters/26 | Fan transcript (an unrendered SPA; content read from the two files below) |
| https://detroitbecometext.github.io/i18n/en.json | All chapter strings (`X0802M`, `MENU.FLOWCHART.08M`, `MENU.OBSERVATION.08M`, `GUI.ACTION.08M`), including the chart's own 72 labels; copy used: `/tmp/flowcharts/ch12/en.json` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | Compiled templates: Capitol Park (`FL`; render reused from `/tmp/flowcharts/ch23/x_FL.txt`), Freedom March (`kL`), Meet Kamski (`wL`); copy used: `/tmp/flowcharts/ch24/chunk-JCLJBPDO.js` |

GamerGuides and Gamepressure were tried for conflict resolution. The GamerGuides chapter URL returned 404 and no Gamepressure chapter page could be located, so neither is used.
