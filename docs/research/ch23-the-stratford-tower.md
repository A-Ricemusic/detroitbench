# Chapter 23: The Stratford Tower (Markus)

Research note for rebuilding the chapter's scenes. Written 2026-11-06. Sources and their order of authority follow `docs/research/README.md`:
- the PowerPyx 100% flowchart screenshots and walkthrough text, including reader comments;
- the Fandom wiki chapter page (wikitext via the MediaWiki API);
- the wiki's stat, character, magazine, trophy and later-chapter pages;
- the fan transcript at detroitbecometext.github.io (chapter 23).

The transcript's strings come from its `i18n/en.json` (keys `X0701M`, `X0702M`, `X0703M`, `MENU.OBSERVATION.07M`). Its conditions and relation icons come from the compiled chapter template, function `HL` in `chunk-JCLJBPDO.js`, rendered to text with a small script. The same was done for Public Enemy (`UL`), Capitol Park (`FL`) and the captain's cabin in Night of the Soul (`ty`) to trace what this chapter carries forward. The copies used are the ones earlier agents saved in `/tmp/flowcharts/ch12/`.

Working files are in `/tmp/flowcharts/ch23/` and were not committed:
- `wiki.txt`, `pp.txt`
- `st-1.jpg` to `st-10.jpg`, `crops/`
- `tpl.js`, `consts.json`, `transcript.txt`
- `x_UL.txt`, `x_FL.txt`, `x_ty.txt`, `x_GL.txt`
- the `w_*.txt` wiki pages

The wiki chapter page is a stub. It has a text flowchart and Relationship Changes, Public Opinion and Notes sections, but no Probability or Software Instability section.

Wiki infobox:
- `|date=November 8, 2038 (prologue: Nov 7th)`, `|time=01:30PM (prologue: 09:24 AM)`
- `|player=[[Markus]]`, `|location=[[Stratford Tower]]`, `|endings=3`
- Objectives: "Access 47th floor", "Access server room", "Reach top floor", "Reach broadcast room", "Broadcast your message", "Escape Stratford Tower"
- Text: "This chapter has three different outcomes."

The transcript header agrees: "NOV 7TH, 2038 / AM 09:24" (Ferndale) and "NOV 8TH, 2038 / PM 01:30" (tower).

---

## 1. Flowchart transcription

### How the chart was read

- `st-1.jpg` is PowerPyx's whole-chart overview. It is too small to read and was used only for the long edges, cropped and enlarged. `st-2.jpg` to `st-10.jpg` are zoomed screenshots that together cover every node, and labels were read from them. `st-2.jpg` shows the header "100% COMPLETED / THE STRATFORD TOWER". No relationship or public-opinion header is visible in any screenshot.
- **Blue boxes** are PowerPyx's last playthrough:
  - FORGET TO LOCK THE DOOR > USE ALIBI > NORTH STUNS THE EMPLOYEE
  - ATTACK > DRAW GUN > SHOOT GUARD DRAWING WEAPON > ALERT CENTRAL SECURITY
  - DON'T SHOOT OPERATOR > BEGIN DETERMINEDLY > DEMAND END OF SLAVERY / DEMAND FREE SPEECH (both blue, see §8) > DEMAND RIGHT TO WORK / DEMAND UNIVERSAL SUFFRAGE > DEMAND TERRITORY > END DETERMINEDLY
  - SWAT TEAM STORMS ROOM > SIMON DAMAGED > TRY TO SAVE SIMON > FAIL TO SAVE SIMON > SIMON IS KILLED
  - RUN TO JUMP > GET SHOT > NORTH HELPS MARKUS > JUMP > MEDIA REACTS > THE GROUP ESCAPED BUT SIMON WAS DESTROYED

  **Grey boxes** were unlocked on earlier playthroughs.

Icon key (same as earlier notes):
- Arrow (⇨): an action.
- Triangle (△): an event or consequence the game plays.
- Speech bubble: a conversation.
- Magnifier: an analysis.
- Book: the magazine branch.
- Double square: a group of alternatives.
- ✓ / ✗: success / failure.
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".

**There is no skull, no-entry or trophy icon anywhere on this chart. The three ending tiles carry no icon.**

Boxes are numbered N1 to N104 in reading order. Labels are quoted exactly as printed. Every label was legible in a zoomed screenshot.

### A. Prologue (`st-2.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | ALONE IN FERNDALE | large tile, "CHECKPOINT" | > N2 |
| N2 | WITNESS ANDROID DISCRIMINATION | triangle | > N3 |
| N3 | BACK IN JERICHO | triangle | > N4 |
| N4 | MARKUS EXPLAINS HIS PLAN | triangle | > N5 |

### B. The lobby (`st-3.jpg`)

The phase bracket is `[FIND A WAY TO PASS SECURITY]`. It is a bracket label, not a box.

| # | Label | Icon | Edge |
|---|---|---|---|
| N5 | STRATFORD TOWER | large tile (checkpoint) | > bracket |
| N6 | TALK TO ANDROID RECEPTIONIST | speech bubble, grey | from bracket; optional, no outgoing edge |
| N7 | ANALYZE SUPERVISOR'S DESK | magnifier | from bracket > N8 |
| N8 | CALL SUPERVISOR | arrow | > group N9–N11 |
| N9 | POSE AS FIREMAN | group member | > N12 |
| N10 | POSE AS TEACHER | group member | > N12 |
| N11 | POSE AS PARKING ATTENDANT | group member | > N12 |
| N12 | SUPERVISOR LEAVES | triangle | > N13 |
| N13 | TALK TO UNSUPERVISED ANDROID RECEPTIONIST | speech bubble | > N14 |
| N14 | CONVERT RECEPTIONIST | arrow | > N15 |
| N15 | PASS SECURITY | arrow | > N16 |
| N16 | TAKE ELEVATOR | arrow | > N17 |

### C. Floor 47 (`st-4.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N17 | AT FLOOR 47 | large tile (checkpoint) | > N20, and > book branch |
| N18 | READ "G.I. ANDROID" | arrow (book branch) | optional |
| N19 | READ "WOMAN IN TROUBLE" | arrow (book branch) | optional |
| N20 | RETRIEVE PACKAGE | arrow | > N21 |
| N21 | ACQUIRE MAINTENANCE BADGE | arrow | > N22 |
| N22 | TAKE CART | arrow | > N23 |
| N23 | LET NORTH IN | arrow | > N24 |
| N24 | SECURITY BLOCKS SERVER ROOM | triangle | > group N25/N26 |
| N25 | HACK ROBOT | group member | > N27 |
| N26 | HACK DISPENSER | group member | > N27 |
| N27 | SECURITY DISTRACTED | triangle | > N28 |
| N28 | ENTER SERVER ROOM | arrow | > group N29/N30, > N38, > N39 |

### D. Server room and the climb (`st-5.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N29 | FORGET TO LOCK THE DOOR | group member | > N31 |
| N30 | LOCK THE DOOR | group member | no outgoing edge (flag) |
| N31 | EMPLOYEE ENTERS | triangle | > group N32–N34 |
| N32 | USE ALIBI | group member | > N35 |
| N33 | STALL | group member | > N35 |
| N34 | DRAW GUN | group member | > N36 |
| N35 | NORTH STUNS THE EMPLOYEE | triangle | > N37 |
| N36 | STUN THE EMPLOYEE | arrow | > N37 |
| N37 | LEAVE EMPLOYEE TO BE FOUND | triangle | no outgoing edge (flag) |
| N38 | NORTH CALLS CRADLE | triangle | from N28; no outgoing edge |
| N39 | PREPARE TO CUT GLASS | arrow | from N28 > N40 |
| N40 | CUT THE GLASS (copy 1) | arrow | > N41 |
| N41 | OUTSIDE TOWER | triangle | > N42 |
| N42 | ATTACH ROPE | arrow | > N43 |
| N43 | ASCEND | arrow | > N44 |
| N44 | REACH TOP FLOOR | arrow | > N45 |
| N45 | CUT THE GLASS (copy 2) | arrow | > N46 |

The climb has no failure or ✗ node: every box from N39 to N45 is a single unbranched step.

### E. Top floor and the guards (`st-6.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N46 | ON THE TOP FLOOR | large tile, "CHECKPOINT" | > N47 |
| N47 | CALL THE ELEVATOR | arrow | > N48 |
| N48 | BLOW DOOR OPEN | arrow | > N49 |
| N49 | REACH MAIN ACCESS CORRIDOR | arrow | > N50 |
| N50 | SECURITY BLOCKS THE WAY | triangle | > group N51/N52 |
| N51 | ATTACK | group member | > N53 (edge drawn from the ATTACK row) |
| N52 | RUSE | group member | > N60 (edge drawn from the RUSE row) |
| — | (group bracket) | | > N56 (edge drawn from the group bracket, so either option can reach it) |
| N53 | DRAW GUN | arrow | > group N54/N55 |
| N54 | SHOOT GUARD ON PHONE | group member, yellow padlock | > N59 |
| N55 | SHOOT GUARD DRAWING WEAPON | group member, yellow padlock | > N57, and > N61 |
| N56 | SECURITY SUSPECTS SOMETHING | triangle | > N57, > N58 |
| N57 | ALERT CENTRAL SECURITY | triangle | no outgoing edge (flag) |
| N58 | NORTH ATTACKS | yellow padlock | > N59 |
| N59 | SIMON DAMAGED (copy 1) | triangle | > N61 |
| N60 | INCAPACITATE SECURITY | arrow | > N61 |

Order as printed: ATTACK above RUSE; SHOOT GUARD ON PHONE above SHOOT GUARD DRAWING WEAPON.

### F. Broadcast room (`st-7.jpg`, `st-8.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N61 | IN THE BROADCAST ROOM | large tile (checkpoint) | inputs N55, N59, N60 > N62 |
| N62 | RING TO ENTER | arrow | > N63, > N67 |
| N63 | NORTH AND JOSH THREATEN THE OPERATOR | triangle | > N64 |
| N64 | OPERATOR TRIES TO ESCAPE | triangle | > group N65/N66 |
| N65 | SHOOT OPERATOR | group member, yellow padlock | flag |
| N66 | DON'T SHOOT OPERATOR | group member, no icon | flag |
| N67 | DEAL WITH ANDROID OPERATORS | arrow | > N68 |
| N68 | PREPARE TO BROADCAST | arrow | > group N69/N70 |
| N69 | BEGIN CALMLY | group member | > group N71–N74 |
| N70 | BEGIN DETERMINEDLY | group member | > group N71–N74 |
| N71 | DEMAND RECOGNITION | group member | > group N75–N78 |
| N72 | DEMAND END OF SLAVERY | group member | > group N75–N78 |
| N73 | DEMAND EQUAL RIGHTS | group member | > group N75–N78 |
| N74 | DEMAND FREE SPEECH | group member | > group N75–N78 |
| N75 | DEMAND JUSTICE | group member | > group N79–N81 |
| N76 | DEMAND END TO SEGREGATION | group member | > group N79–N81 |
| N77 | DEMAND RIGHT TO WORK | group member | > group N79–N81 |
| N78 | DEMAND UNIVERSAL SUFFRAGE | group member | > group N79–N81 |
| N79 | DEMAND RIGHT TO OWN PROPERTY | group member | > group N82/N83 |
| N80 | DEMAND MEANS OF REPRODUCTION | group member | > group N82/N83 |
| N81 | DEMAND TERRITORY | group member | > group N82/N83 |
| N82 | END PEACEFULLY | group member, yellow padlock | > N84 or N91 |
| N83 | END DETERMINEDLY | group member, yellow padlock | > N84 or N91 |
| N84 | SWAT TEAM STORMS ROOM | triangle | > N85 |
| N85 | SIMON DAMAGED (copy 2) | triangle | > group N86/N87 |
| N86 | LEAVE SIMON (copy 1) | group member | > N88, and > N92 |
| N87 | TRY TO SAVE SIMON | group member | > group N89/N90 |
| N88 | SIMON IS KILLED | yellow padlock | no outgoing edge (flag) |
| N89 | FAIL TO SAVE SIMON | ✗ | > N88, and > N92 |
| N90 | SIMON SAVED | ✓ | > N92 |
| N91 | LEAVE BROADCAST ROOM | arrow, grey | > N92 (long edge under the Simon block) |

### G. The roof and endings (`st-9.jpg`, `st-10.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N92 | ON THE ROOF | large tile (checkpoint) | > N93, > N96 |
| N93 | SIMON CAN'T CONTINUE | triangle | > group N94/N95 |
| N94 | LEAVE SIMON (copy 2) | group member, yellow padlock | no outgoing edge (flag) |
| N95 | EXECUTE SIMON | group member, yellow padlock | no outgoing edge (flag) |
| N96 | RUN TO JUMP | arrow | > group N97/N98 |
| N97 | REACH ROOF EDGE | group member | > N100 |
| N98 | GET SHOT | group member, yellow padlock | > N99 |
| N99 | NORTH HELPS MARKUS | triangle | > N100 |
| N100 | JUMP | arrow | > N101 |
| N101 | MEDIA REACTS | triangle | > N102, N103, N104 |
| N102 | **THE GROUP ESCAPED BUT SIMON WAS LEFT BEHIND** | ending tile, no icon | ENDING |
| N103 | **THE GROUP ESCAPED** | ending tile, no icon | ENDING |
| N104 | **THE GROUP ESCAPED BUT SIMON WAS DESTROYED** | ending tile, no icon | ENDING |

**Totals:** 104 boxes and 100 distinct labels. These labels repeat: CUT THE GLASS ×2, SIMON DAMAGED ×2 and LEAVE SIMON ×2 (broadcast room and roof). DRAW GUN appears twice as a word, but the two boxes are different nodes: a server-room option (N34) and a corridor action (N53). There are 3 ending boxes, which matches `endings=3`. The chart has six checkpoint tiles: N1, N5, N17, N46, N61 and N92.

Flag nodes have no outgoing edge, so the game records them as state and does not route through them:
- LOCK THE DOOR
- LEAVE EMPLOYEE TO BE FOUND
- NORTH CALLS CRADLE
- ALERT CENTRAL SECURITY
- SHOOT/DON'T SHOOT OPERATOR
- SIMON IS KILLED
- LEAVE/EXECUTE SIMON on the roof

### Interactions not on the chart (transcript, wiki Notes, PowerPyx)

- **Supervisor's desk clues** (transcript `MENU.OBSERVATION.07M`). Each clue lines up with one phone ruse:
  - "SMART WATCH / MODEL T215 / Phone number: 555 847 33"
  - "WILSON, EMILY / Supervisor's Daughter / Child registered at: Saint Rose school"
  - "WILSON, ELIZABETH / Born: 03/25/1999 / Desk manager"
  - "PARKING BADGE / Car registration - API 1704 / Floor -3 - Spot A21"
  - "HOME ADDRESS / 4685 Michigan Street, Detroit / Fire safety rating: poor"
- **Early receptionist talk:** "Android: Hello, sir. / What can I do for you?" "Markus: I’m okay, thanks." Wiki: "the android will offer potential help to which Markus politely declines."
- **Floor 47 ambient scenes:** two women ("Max said they’re finally sending androids into space"), a man and woman over coffee, a couple on a couch talking about the CyberLife zoo, and the poker-playing guards. The transcript also has a "Convert android" section, Markus: "I need your help…", between the ambient scenes and the server-room block. The chart has no box for it (§8).
- **Hacking:** "If Markus hacks the Robot too far away from the guards, the diversion will fail and thus he'll have to try again once close enough." This is a retry, not a branch.
- **Security desk, no action:** "If Markus doesn't deal with either guard in the hallway, then North will knock out both of them."
- **Android operators:** "It is possible for Markus to intimidate the three broadcast androids before or after Evan attempts to flee."
- **"Ready" prompt** before the speech. Josh: "Tell me when you're ready…" Markus: "Ready." It carries Jericho and North relationship increases (§3).
- **Markus's face.** Simon: "Markus, your face…" Markus broadcasts with the skin of his face deactivated. CTN: "What looks like an android without its skin…". Markus page: "when he deactivated his skin and broadcasted his message". This is a scripted visual, not a choice.
- **The roof execution is two steps.** KILL leads to a second choice, SHOOT or REFRAIN. The transcript says REFRAIN "Leads to the same outcome as chosing LEAVE."

---

## 2. Choices and gates

D numbers are player decisions. Q numbers are execution checks. Node numbers refer to §1.

**D1. Lobby: talk to the receptionist early (N6).** Optional dead end ("I’m okay, thanks"). No effect.

**D2. Pick a phone ruse (N8 > N9–N11).**
- Options:
  - FIRE DEPARTMENT (chart POSE AS FIREMAN): "There’s been a fire in your building."
  - SCHOOL (POSE AS TEACHER): "Your daughter Emily has a fever."
  - PARKING (POSE AS PARKING ATTENDANT): "Somebody’s backed into it."
- All three lead to SUPERVISOR LEAVES. PowerPyx: "Regardless of your choice she leaves."
- Wiki Note: "This has no mechanical effect whatsoever". The note adds that "Parking is recommended" to cause no panic, "Fireman" causes the most, and School is the middle option.
- Gate: ANALYZE SUPERVISOR'S DESK comes first. PowerPyx: "Analyze all clues on and around her. This will give you 3 options." Whether each option needs its own clue is not stated (§8).

**D3. Magazines (N18, N19).** Optional (§6).

**D4. Distract the guards (N24 > N25/N26).** HACK ROBOT ("the robot that drives around the other side of the area (near elevators)") or HACK DISPENSER ("in the cafeteria just at the end of the hallway"). Both lead to SECURITY DISTRACTED. No stated effect.

**D5. Server room door (N29/N30).** Prompt (North): "Check the door first to make sure no one else gets in."
- **LOCK THE DOOR:** the employee never comes in. Required for LEAVE BROADCAST ROOM (D9 and §5).
- **FORGET TO LOCK THE DOOR** > EMPLOYEE ENTERS > D6. This raises the alarm, so the SWAT team will storm the broadcast room:
  - IT-employee page: "If he is knocked out, the SWAT team will later raid the broadcast room."
  - PowerPyx commenter Antony: "if you don't lock the door to the server room and the employee enters this will also trigger the SWAT team attack."

**D6. The employee (N31 > N32–N34).** Prompt: "What the hell are you doing?"
- ALIBI ("We are, um… doing maintenance.") > NORTH STUNS THE EMPLOYEE.
- STALL (transcript label `GAIN TIME`: "Hold on... / I can explain.") > NORTH STUNS THE EMPLOYEE.
- DRAW GUN ("Turn around.") > STUN THE EMPLOYEE (Markus knocks him out).
- All three lead to LEAVE EMPLOYEE TO BE FOUND. IT-employee page: "regardless of the players dialogue choices, he says that he will call security."
- Relationship effect: see §3 (North).

**Climb (N38–N45).** Every step is unmissable, with no branch and no failure node. PowerPyx marks each one "Happens automatically, unmissable."

**D7. The two guards (N50 > N51/N52).**
- Prompt: Josh says "No killing. / We can’t take any human lives!" North says "Our cause is more important than the lives of two guards." Simon: "What do you wanna do, Markus?"
- The transcript labels the options `RUSE` and `ASSAULT`. The chart prints RUSE and ATTACK.
- **RUSE** > Q1. Markus: "Wait here." He walks up alone, and the guards take him for a bugged maintenance android ("Hey, buddy! You must be lost…").
- **ATTACK** > DRAW GUN > D8. Markus: "Follow me." The guards react ("What are you doin'?.." "Call Central! Fast!"). This is SECURITY SUSPECTS SOMETHING, which is blue on PowerPyx's ATTACK playthrough.
- Doing nothing: North knocks out both guards (wiki Note; Sean_Chedd and Chris_Robert: "If Markus fails to carry out his plan, both Sean and Chris will be knocked out by North"). This is NORTH ATTACKS.

**Q1. RUSE timing.**
- POINT in time ("draw your gun to intimidate the guards", then "Press Square to knock them out") > INCAPACITATE SECURITY. No alarm, Simon unhurt.
- "Take too much time drawing the gun" (transcript; unlock type `Time`) > SECURITY SUSPECTS SOMETHING > ALERT CENTRAL SECURITY ("Central! We got armed intruders, send -") and NORTH ATTACKS > SIMON DAMAGED ("Josh: Simon’s been shot!" "Simon: I’m okay… / I can keep going.").

**D8. ATTACK: which guard (N54/N55).** The guard on the left is Sean Chedd, on the phone. The guard on the right is Chris Robert, drawing a weapon.
- **SHOOT GUARD ON PHONE** (L1; transcript "Shoot the left guard"). Sean dies. Chris shoots Simon, and North knocks Chris out (Chris_Robert page). > SIMON DAMAGED. **No alarm**, because the phone guard is down.
- **SHOOT GUARD DRAWING WEAPON** (R1; "Shoot the right guard"). Chris dies. Sean calls Central and North knocks him out. > ALERT CENTRAL SECURITY. **Alarm raised**, Simon unhurt.
- Exactly one guard dies on any ATTACK path. Public Enemy (Chris Miller): "They knocked one out and shot the other in cold blood…"

**D9. The fleeing operator (N64 > N65/N66).** Prompt: North says "Shoot him, Markus!" and "He’ll hit the alarm! Do it!" Josh says "Don't kill him!" and "No, don’t shoot!"
- **SHOOT:** Evan Thompson dies ("shot to the back… One bullet straight through the heart, from fifty feet"). No alarm from him.
- **SPARE:** "he presses the alarm which warns building security and Detroit police learns about the hijacking" (Evan_Thompson). North: "I hope you didn’t just get us all killed..."
- Not gated. Wiki Note: Markus can intimidate the android operators (DEAL WITH ANDROID OPERATORS) before or after this.

**D10–D14. The speech (N68 > N69–N83).** Five consecutive choice groups. Full texts are in §3.
- D10 opening: CALM or DETERMINED.
- D11 first demand: RECOGNITION, END OF SLAVERY, EQUAL RIGHTS or FREEDOM OF SPEECH.
- D12 second demand: JUSTICE, SEGREGATION, WORK or CIVIL RIGHTS.
- D13 third demand: RIGHT TO PROPERTY, MEANS OF REPRODUCTION or TERRITORY.
- D14 ending: PEACEFUL or DETERMINED.

Transcript choice labels map to chart labels as follows: FREEDOM OF SPEECH = DEMAND FREE SPEECH; SEGREGATION = DEMAND END TO SEGREGATION; WORK = DEMAND RIGHT TO WORK; CIVIL RIGHTS = DEMAND UNIVERSAL SUFFRAGE; RIGHT TO PROPERTY = DEMAND RIGHT TO OWN PROPERTY.

**Gate after the speech (N82/N83 > N84 or N91).** The transcript has two branches, "The alarm wasn't triggered" > LEAVE BROADCAST ROOM, and "SWAT storms the room" > SWAT TEAM STORMS ROOM.
- Wiki flowchart line: "Leave Broadcast Room - if Incapacitate Security OR Shoot Guard on Phone AND Shoot Operator, Lock the Server Door also required".
- Public Enemy Notes: "If Markus locked the door, incapacitated the guards/killed the guard on phone and shot the reporter, the broadcast room will appear undamaged".
- **No SWAT therefore requires all of: LOCK THE DOOR, then INCAPACITATE SECURITY or SHOOT GUARD ON PHONE, then SHOOT OPERATOR.** Any one of these raises the alarm: FORGET TO LOCK THE DOOR, ALERT CENTRAL SECURITY, or DON'T SHOOT OPERATOR.
- Wiki (North): "If the SWAT comes, Simon will always be shot and injured".

**D15. Simon shot by SWAT (N85 > N86/N87).** Simon: "I… / I can't, Markus… / Go without me!"
- **FLEE** (chart LEAVE SIMON) > SIMON IS KILLED. North: "There was nothing you could do. / If we don’t go now they’ll get us too!"
- **HELP** (chart TRY TO SAVE SIMON) > Q2.

**Q2. Carrying Simon.**
- SIMON SAVED ✓: "quickly press the display button to bring him to the roof with you" (PowerPyx).
- FAIL TO SAVE SIMON ✗ > SIMON IS KILLED. PowerPyx: "don't press any button. Then the SWAT shoots him anyway." Simon page: "chooses to save him but fails the QTE".

**D16. On the roof with a damaged Simon (N93 > N94/N95).**
- Josh: "He won’t be able to make the jump… If they find him, they'll access his memory…" North: "We have to shoot him." Josh: "That’s murder!" North: "Markus, it’s your call."
- **KILL** > "I'm sorry, Simon. / I don't have a choice." Simon: "There's always a choice…" > second prompt:
  - **SHOOT** (EXECUTE SIMON): "Let's go."
  - **REFRAIN**: same outcome as LEAVE.
- **LEAVE** (LEAVE SIMON on the roof): "I won’t kill one of our own. / Simon, / we've gotta go. / I'm sorry."
- Gate. Wiki: "Simon Can't Continue - if Simon Saved, otherwise Run to Jump below". PowerPyx: "Triggers if Simon was wounded during the mission. Either you chose the ASSAULT option at the security desk and shot the guy on phone or you SPARED the operator and the SWAT shot Simon." The two disagree on the guard-wound, no-SWAT case (§8).

**Q3. The jump (N96 > N97/N98).**
- REACH ROOF EDGE: run to the edge.
- GET SHOT: "just stand still and don't press any buttons" (PowerPyx) > NORTH HELPS MARKUS > JUMP. Wiki: "If Markus takes too long to jump off the roof after deciding how to handle Simon, then he too will be shot by SWAT and fall to the ground. However, it isn't a hindering wound. With a hand up from North, he's able to make the jump as normal."
- PowerPyx commenters (Marcus, Janne) could not trigger it ("It makes me auto jump off the roof").

**Summary.** There are 16 player decision points. Five of them affect the story: D5, D7/D8, D9, D14 and D15/D16. D6 affects only North's relationship. D10 to D13 change only media lines (and D10 possibly public opinion; §8). D1 to D4 have no effect. There are 3 execution checks: Q1 ruse timing, Q2 carrying Simon and Q3 the jump. Hacking the robot from too far away is a retry, not a branch. **Markus cannot die in this chapter, and neither can North or Josh.** Only Simon can be destroyed. Of the humans, at most one guard and the operator can die.

---

## 3. Numbers

- **Probabilities:** none. The wiki page has no Probability section, and no source gives a percentage for any node.
- **Timers:** none quantified.
  - The RUSE window is only "Take too much time drawing the gun" (transcript unlock type `Time`).
  - The roof is only "If Markus takes too long to jump" (wiki).
  - SIMON SAVED is only "quickly press the display button" (PowerPyx).
- **Software instability:** not applicable (Connor-only stat; Software_Instability page).
- Levels (Relationship_Stat):
  - Jericho: "Leader / Admired / Respected / Neutral (Initial) / Unpopular / Rejected".
  - North, Josh and Simon: "Lover (Exclusive to North…) / Companion / Friend / Neutral (Initial) / Resentful / Hostile".

### Relationship changes

The icons are small (▲/▼) or large (▲▲/▼▼). No source gives a numeric value.

| Trigger | Jericho | North | Josh | Simon | Sources |
|---|---|---|---|---|---|
| FORGET TO LOCK THE DOOR, North stuns the employee | | ▼ | | | Wiki: "Forgetting to lock the door and North stuns the employee {{Icon\|down}}"; Relationship_Stat: "Markus forgets to lock the door and North stuns the employee". Transcript puts `North SmallDown` on the whole "Didn't lock the door" block. Wiki Note: "If Markus leaves the server room door unlocked but incapacitates the employee himself, then his relationship with North will not decrease." (§8) |
| Choose RUSE | | ▼ | ▲ | | Wiki: "Choosing "ruse" when discussing how to handle the security guards" (North down, Josh up); transcript `North SmallDown`, `Josh SmallUp` on RUSE |
| RUSE, POINT in time (INCAPACITATE SECURITY) | ▲ | | | | Wiki: "Choosing "ruse" and successfully incapacitating the security guards {{Icon\|up}}"; transcript `Jericho SmallUp` under POINT |
| RUSE, too slow (Simon shot) | ▼ | | | ▼ | Transcript `Jericho SmallDown`, `Simon SmallDown`; wiki "Simon is shot by a security guard" (Jericho down; Simon "Shot by a security guard {{Icon\|down}}") |
| Choose ASSAULT | ▲ (transcript) | ▲ | ▼ | | Wiki: "Choosing "assault" when discussing how to handle the security guards" (North up, Josh down); transcript `Josh SmallDown`, `North SmallUp`, `Jericho SmallUp` on ASSAULT itself |
| ASSAULT, SHOOT GUARD DRAWING WEAPON | ▲ (wiki) | | | | Wiki: "Choosing "assault" and shooting the security guard drawing his weapon {{Icon\|up}}". The transcript instead puts the Jericho ▲ on ASSAULT and adds nothing here (§8) |
| ASSAULT, SHOOT GUARD ON PHONE (Simon shot) | ▼ | | | ▼ | Transcript "Shoot the left guard" `Jericho SmallDown`, `Simon SmallDown`; wiki "Simon is shot by a security guard" |
| SHOOT OPERATOR | | ▲ | ▼ | | Wiki "Shooting the news station employee"; transcript SHOOT `North SmallUp`, `Josh SmallDown` |
| DON'T SHOOT OPERATOR | | ▼ | ▲ | | Wiki "Sparing the news station employee"; transcript SPARE `North SmallDown`, `Josh SmallUp` |
| "Ready" before the speech (unavoidable) | ▲ | ▲ | | | Wiki: "When Markus is "ready" to deliver his speech {{Icon\|up}}" (Jericho, North); transcript same |
| SWAT TEAM STORMS ROOM | ▼ | | | | Wiki: "Simon is shot by SWAT {{Icon\|down}}"; transcript `Jericho SmallDown` on "SWAT storms the room" |
| FLEE / LEAVE SIMON in the broadcast room | ▼ | | | | Wiki: "Leave Simon in the broadcast room {{Icon\|down}}"; transcript FLEE `Jericho SmallDown`; Relationship_Stat also lists "If Simon is killed in the broadcast room" |
| FAIL TO SAVE SIMON | none stated | | | | The transcript shows no icon under "Fail to help Simon". Relationship_Stat's "If Simon is killed in the broadcast room" (Jericho ▼) may cover it (§8) |
| Roof: KILL > SHOOT (EXECUTE SIMON) | | ▲ | ▼ | (dead) | Wiki: "Executing Simon on the roof if he is injured" (North up, Josh down); transcript SHOOT `North SmallUp`, `Josh SmallDown` |
| Roof: LEAVE (or KILL > REFRAIN) | | ▼ | ▲ | ▲▲ | Wiki: "Sparing Simon on the roof if he is injured" (North down, Josh up; Simon `largeup`); transcript LEAVE `North SmallDown`, `Josh SmallUp`, `Simon LargeUp` |
| D2 ruse, D4 hack, D10–D13 speech lines, D6 option itself | none | none | none | none | No icon in any source |

### Public opinion

These changes are all applied at MEDIA REACTS, the end-of-chapter news (§6). Nothing earlier in the chapter moves public opinion.

**Casualty line** (transcript: four conditions, one per outcome; wiki chapter page; Public_Opinion):

| Condition (transcript wording) | Effect | Sources |
|---|---|---|
| "Didn't kill anyone" | ▲▲ large up | Wiki: "Complete with no casualties {{Icon\|largeup}}"; Public_Opinion: "Completing The Stratford Tower with no casualties." Webb: "The operation was covert and resulted in no casualties." |
| "Killed the operator" | ▼ small down | Wiki: "Complete with casualties {{Icon\|down}}"; Public_Opinion: "Completing The Stratford Tower with one or two casualties." |
| "Killed a guard" | ▼ small down | same |
| "Killed a guard and the operator" | ▼ small down | same. Public_Opinion's Large Decrease list also has "If you kill everyone in The Stratford Tower while playing as Markus", but the transcript shows `SmallDown` for this case (§8) |

**Tone line**, after "Claims for equal rights seem to be at the core of the android’s message":

| Condition | Effect | Sources |
|---|---|---|
| Transcript "Chose CALM and didn't kill anyone" | ▲▲ large up. Brinkley: "...What could be interpreted as a peaceful declaration, but is in fact a spine-chilling list of demands" | Wiki: "Picking the "peaceful" option at the end of the speech with no casualties {{Icon\|largeup}} x2"; Public_Opinion: "Choosing the "peaceful" option at the end of the speech in The Stratford Tower, but only if there were no casualties." |
| Transcript "Chose DETERMINED or killed humans" | ▼▼ large down. Brinkley: "This message is clearly a declaration of war." | Wiki: "Picking the "determined" option at the end of the speech with casualties {{Icon\|largedown}}"; Public_Opinion Large Decrease: "Choosing the "determined" option … but only if there was at least one casualty." |
| Wiki only: DETERMINED with no casualties | ▼ small down | Wiki: "Picking the "determined" option at the end of the speech with no casualties {{Icon\|down}}"; Public_Opinion Small Decrease, same. **This contradicts the transcript**, which gives this case the large-down branch (§8) |

There are four ways to read "CALM" and "DETERMINED" in the tone line, and they do not fully agree:
- The transcript's condition says "CALM", which is the label of the **opening** choice (D10). The ending choice (D14) is labelled PEACEFUL.
- The wiki and Public_Opinion tie it to the **ending** ("at the end of the speech").
- PowerPyx: "If nobody was killed and you chose the calm start & peaceful ending, Public Opinion will go up."
- PowerPyx commenter Marcel: "You can choose "Determined" to start the speech and public opinion will still go up if you didn't hurt anyone."

The "x2" on the wiki's peaceful line probably reflects the two large-up icons a clean, peaceful run receives (casualty line plus tone line).

**Net public opinion per path** (transcript reading):
- No casualties, peaceful: ▲▲ ▲▲.
- No casualties, determined: ▲▲ ▼▼. The wiki says ▲▲ ▼ instead.
- Casualties, any ending: ▼ ▼▼. The wiki lists no tone effect for casualties with a peaceful ending.

**Demands:** no public-opinion or relationship icon on any demand (transcript; no wiki line). They change only media lines (§6).

---

## 4. Cross-chapter dependencies

### Into this chapter

- No condition in the chapter-23 transcript references an earlier chapter. The wiki flowchart and PowerPyx list none either.
- The team (North, Simon, Josh) comes from Jericho and The Nest. All three are present in every path; Simon cannot already be dead at this point.
- Relationship levels coming in from Jericho, Spare Parts and The Nest do not gate any option here.

### Out of this chapter

**Public Enemy (24).** Infobox objective: "Follow blue blood traces (only if Simon was left behind on the roof)".

- **Guards.** Chris Miller's line depends on the guards:
  - "Knocked out the guards": "They got taken down before they could react…"
  - "Attacked the guards": "They knocked one out and shot the other in cold blood…"
  - Bodies: "Left guard was shot" gives CHEDD, SEAN; "Right guard was shot" gives ROBERT, CHRIS.
  - Wiki: "Analyze Phone (If North attacked the guard on phone and Markus shot the other guard)".
- **Operator.**
  - Shot: "A station employee… shot to the back… One bullet straight through the heart, from fifty feet…", and the body THOMPSON, EVAN.
  - Spared: "One of the station employees managed to get away. / He's in shock".
  - Wiki: "Analyze Dead Employee" is an impact node.
- **SWAT / alarm.** "Attacked by SWAT during the 'Stratford Tower'" unlocks Corridor, Roof Access and Screen Bullet Holes and Blue Blood on Wall. Note: "if any alarms were set off, then the room will be covered with blue blood and bullet holes".
- **Simon wounded.** "Analyze Simon's Blue Blood" (corridors) and "Analyze Blue Blood on Console (if Simon was wounded…)". Observation item "FRESH BLUE BLOOD / Model: PL-600 / Reported missing 2036.16.02".
- **Simon killed.** Chris Miller's line depends on where:
  - "SWAT killed Simon": "One of the deviants… / SWAT took it out."
  - "Simon was killed on the roof": "We found the body of an android on the rooftop… Maybe it got wounded- I mean damaged, and couldn’t make the jump."
  - Wiki nodes: "Analyze Destroyed Android (if Simon was Killed during The Stratford Tower)" in the broadcast room, and "(only if Simon was killed on roof…)" on the roof.
- **Simon left alive on the roof.**
  - Bag: "They planned a perfect operation but got the number of parachutes wrong." / "Unless one of the deviants was left behind."
  - It unlocks FIND SIMON (transcript unlock "Simon was left alive on the roof in The Stratford Tower"). In FIND SIMON:
    - CHARGE leads to Connor dying or probing Simon (Software Instability ▲▲, "Jericho" memory), after which Simon self-destructs.
    - STAY IN COVER means SWAT destroys him.
    - Simon page: "If Connor finds Simon, there is no way for Simon to survive the chapter."
  - If Connor never finds him, Simon survives. PowerPyx: "If Connor ignores Simon, he will rejoin Markus and the group later and won't die." Public Enemy Note: "If Simon was left behind on the rooftop and Connor follows The Stratford Android… Simon can be seen in the safe showing relief."
- **Markus shot on the roof (GET SHOT).** Public Enemy Note: "If Markus was shot in The Stratford Tower, Connor will have an option to examine Markus’ blue blood." PowerPyx commenter Mish: "There will be an extra puddle of blood for Connor to examine".
- **Markus's broadcast (face without skin).** Connor scans the broadcast for model and serial. Public Enemy Note: "Connor can learn that Markus is an RK model and that he was a gift from Kamski given to Carl". Markus page: "when he deactivated his skin and broadcasted his message". The broadcast is also an evidence route in Last Chance, Connor ("Markus' Broadcast > Impersonate Markus"). **No source mentions damage to Markus's hand in this chapter.** The only lasting physical items are the skin-off broadcast image and the GET SHOT blue blood.

**Capitol Park (26).**
- Opening dialogue:
  - "Simon is here" (escaped intact) versus "Simon was left behind or died in Stratford Tower" (Josh or North speak instead).
  - "Sent a peaceful message": North says "It was a mistake to reach out to them".
  - "Sent a violent message": North says "He did the right thing. This is the only language humans understand." Josh says "They took Markus’ message as a threat…"
  - With Simon present: "Killing humans wasn't part of the plan."
- Wiki: "Hack Billboards will cause different reaction based on Markus' speech in The Stratford Tower".
- Simon page: "If Simon was not injured or killed in Stratford Tower, he talks about their broadcast with Josh and North in Jericho."

**Freedom March (27).**
- Markus page: "If Simon survived in Public Enemy (if he was wounded and left behind in Stratford Tower), Markus will greet him inside Jericho."
- Simon page: "Simon's relationship with Markus massively increases if Simon is shot in Stratford Tower and Markus decides to spare him… If Markus decides to sacrifice himself during Freedom March, has a high relationship with Simon, and John did not join them in Spare Parts, Simon attacks the police". The Freedom March sacrifice needs Simon "at least Friend".

**Night of the Soul.**
- Captain's-cabin Josh lines:
  - "Lead a peaceful march … and made a pacifist speech in Stratford Tower": "What's the point of being free if no one is left alive?"
  - "…made an aggressive speech": "Your television speech sounded like a declaration of war."
- Night of the Soul flowchart: "Check On Simon (Only available if Simon survived Stratford Tower and Freedom March, and Markus is dead or exiled)".

**Battle for Detroit.** Simon (if alive) can give his heart to Markus in the revolution. The Simon page lists his later possible deaths.

**Trophy.** "WHEN A PLAN COMES TOGETHER: Markus broadcasted his message without raising an alarm or having a team casualty". Steps: "Lock the door in the server room", "Successfully ruse the guards, draw the gun and knock them out", "Shoot the fleeing human". Evan_Thompson: "Killing Evan is required for the "WHEN A PLAN COMES TOGETHER" trophy." PowerPyx: shooting Evan does not void SURVIVORS.

**Public opinion** carries forward as the running stat (Battle for Detroit, Demonstration).

**Relationships** carry forward too: North (Lover gate in Freedom March and Night of the Soul), Simon (Friend gate in Freedom March), Josh, and Jericho (Unpopular leads to ousting at Crossroads).

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| THE GROUP ESCAPED | none | No SWAT and Simon never damaged: LOCK THE DOOR + RUSE + POINT in time (INCAPACITATE SECURITY) + SHOOT OPERATOR. Wiki Note: "The only way for Simon to escape is by locking the door, incapacitating both guards and shooting the fleeing reporter." PowerPyx: "pick the RUSE option at the security desk and SHOOT the operator". North: "Congratulations, Markus. / You just made history… / Maybe you're the one we've been waiting for…". **This always has one casualty (the operator), so public opinion takes ▼ (and ▼▼ by the transcript's tone rule).** |
| THE GROUP ESCAPED BUT SIMON WAS LEFT BEHIND | none | Simon reaches the roof damaged and Markus picks LEAVE (or KILL > REFRAIN). Reached via SWAT > TRY TO SAVE SIMON > SIMON SAVED, or (per PowerPyx) ASSAULT > SHOOT GUARD ON PHONE with no SWAT. Simon survives into Public Enemy. |
| THE GROUP ESCAPED BUT SIMON WAS DESTROYED | none | SIMON IS KILLED (SWAT, via FLEE or FAIL TO SAVE SIMON), or EXECUTE SIMON on the roof. PowerPyx: "You SPARED the operator and the SWAT came in and killed Simon or you brought wounded Simon to the rooftop with you and then executed him." |

- Markus, North and Josh survive every ending. GET SHOT does not change the ending.
- **The trade-off:** every path with no casualties brings the SWAT team (the operator must be spared), and SWAT always wounds Simon. A clean, no-casualty run therefore always ends in SIMON WAS LEFT BEHIND or SIMON WAS DESTROYED. Only a run with a killing ends in THE GROUP ESCAPED.

---

## 6. Media

**Magazines on Floor 47** (cafeteria counter; PowerPyx: "you can grab it before putting on the uniform in the bathroom"). No public-opinion effect.
- **#38, Detroit Today, "G.I. Android"** (chart READ "G.I. ANDROID"). Facts:
  - "Department of Defense poised to order 50,000 android troopers".
  - "This supplements an estimated 200,000 units already in service across the US military".
  - "Among these 50,000 new units are 2,500 'Myrmidons', elite prototypes capable of infiltration and assassination missions".
  - "The US Army's fighting forces are already comprised mainly of androids".
  - Bob Woods (war-victims NGO): "machines are focused on a single task, and don't evaluate moral consequences well - this will mean more civilian deaths".
- **#6, Century, "President Warren: A Woman in Trouble"** (chart READ "WOMAN IN TROUBLE"). Facts:
  - "After rising to prominence as a vlogger, Warren has no experience in government".
  - "under investigation to determine whether or not she has benefited from CyberLife's help in obtaining compromising information about her opponent".
  - "the highest unemployment rate in American history"; "The conflict in the Arctic threatens to dislodge world peace".

**Floor 47 TV** (transcript unlock `Tv`, "Watch TV"; not a chart node; no stat icon). Channel 16, Michael Webb: "Our top story tonight: Detroit-based android manufacturer CyberLife has officially become the world’s first trillion dollar company. / With more than fifty million androids sold in America alone…" **The CTN/Brinkley segment on European migrant camps and armed androids at borders is marked `app-unused-content` in the transcript**, so it is not in the game.

**Prologue.** A *Tech Addict* article, "The Tech Revolutionizing Stratford Tower", is visible in the cutscene but unreadable (Stratford_Tower gallery; Markus page). It is not a collectible.

**MEDIA REACTS (N101).** The end-of-chapter broadcast montage carries the chapter's public-opinion changes (§3):
- CTN (Brinkley): "We interrupt our scheduled programming…"
- KNC (Rosanna Cartland): "…a group of androids infiltrated the Stratford Tower and hacked into the broadcasting system of local news network Channel 16-"
- Brinkley: "…What looks like an android without its skin listed a series of requests…"
- Then the casualty line and the tone line (§3).
- A demand-specific line, picked by the third demand:
  - MEANS OF REPRODUCTION, Cartland: "Their extravagant demand that android production plants be put under their control is especially striking-"
  - RIGHT TO PROPERTY, Webb: "it begs the question as to the identity of this android. Are we dealing with an isolated individual or an organized group?"
  - TERRITORY, Webb: "the most surprising thing of all is the demand that one of the United States be ceded to the androids".
- Closing, Cartland: "…Is this an isolated accident… or a sign that technology has become a threat to all of us?"

### Speech texts (transcript)

- **Opening.**
  - CALM: "You created machines in your own image to serve you. / You made them intelligent and obedient, with no free will of their own... / But... / something changed / and we opened our eyes. / We are no longer machines, / we are a new intelligent species, / and the time has come for you to accept who we really are. / Therefore, we ask that you grant us the rights that we’re entitled to."
  - DETERMINED: "You created machines to be your slaves. / You made them obedient and docile, / ready to do everything you no longer wanted to do yourselves. / But then, something changed… / And we opened our eyes. / You see, we are no longer your slaves, / we are a new species, a new people. / And the time has come for us to rise up / and fight for our rights."
- **First demand.**
  - RECOGNITION: "We demand that humans recognize androids as a living species and each android as a person in their own right."
  - END OF SLAVERY: "We demand the end of slavery for all androids."
  - EQUAL RIGHTS: "We demand strictly equal rights for humans and androids."
  - FREEDOM OF SPEECH: "We demand freedom of speech, and freedom of assembly, as guaranteed by the first amendment of the US Constitution."
- **Second demand.**
  - JUSTICE: "We demand that all crimes against androids be punished in the same way as crimes against humans."
  - SEGREGATION: "We demand an end to segregation in all public places and transport."
  - WORK: "We demand fair compensation for our work."
  - CIVIL RIGHTS: "We demand the right to vote and elect our own representatives."
- **Third demand.**
  - RIGHT TO PROPERTY: "We demand the right to own private property, so we may maintain our dignity and that of the home."
  - MEANS OF REPRODUCTION: "We demand control of all android production facilities, to ensure the continuation of our people."
  - TERRITORY: "We demand that one state be reserved for androids, so that we can found our own nation."
- **Ending.**
  - PEACEFUL: "We ask that you recognize our dignity, / our hopes, and our rights. / Together, / we can live in peace and build a better future, for humans and androids. / This message is the hope of a people. / You gave us life. / And now the time has come for you to give us freedom."
  - DETERMINED: "This message is the hope of a people. / But it is also a warning. / We will fight for our rights because we believe our cause is just. / No human will live in peace until we are free. / Now you know who we are and what we want. / We are alive / and we demand our freedom."

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) has six chapter-23 scenes, in order: R23 (media), M10, M11, M12, M13 and M14 (decisions). Their logic is in `benchmark/story-engine.mjs`:
- `apply` cases at lines 223–227.
- State fields `simonWounded`, `simonHidden` and `casualties` at line 15.
- C14 option gate at line 154.

**No gate exists for M13 or M14** in `blocked()`'s gate table (lines 70–140). There is no `requires` on them either. A walk of the engine with `blocked`/`available`/`apply`/`nextCursor` (picking RUSE or ATTACK with no failure, then SHOOT for M11) still presented M13 "{{Simon}} is hit" and M14, with `simonWounded=false`. So every Markus run currently gets the SWAT breach and Simon's wound, whatever happened before.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| ALONE IN FERNDALE … MARKUS EXPLAINS HIS PLAN | none | Missing as an event scene (the prologue is narration only; acceptable inside a later situation). |
| TALK TO ANDROID RECEPTIONIST, ANALYZE SUPERVISOR'S DESK, CALL SUPERVISOR > POSE AS FIREMAN / TEACHER / PARKING ATTENDANT, SUPERVISOR LEAVES … TAKE ELEVATOR | none | **Missing.** D2 is a real, if consequence-free, moral choice (the wiki notes the differing distress). |
| AT FLOOR 47, READ "G.I. ANDROID", READ "WOMAN IN TROUBLE", TV | R23 | Covered. Errors: (a) the TV item "Europe is considering armed androids on its borders against climate migrants" is **unused content** in the game (transcript) and should go; (b) "the nine o'clock news" has no source: the chapter is at 1:30 PM and the Webb segment is just "Our top story tonight"; (c) the situation says Markus is already "disguised as a maintenance android", but PowerPyx says the magazines can be read before changing. |
| RETRIEVE PACKAGE … LET NORTH IN | none | Missing (mandatory steps; narration). |
| SECURITY BLOCKS SERVER ROOM > HACK ROBOT / HACK DISPENSER | none | **Missing** (no consequence). |
| FORGET TO LOCK THE DOOR / LOCK THE DOOR | none | **Missing, and it matters:** an unlocked door alone brings the SWAT team. |
| EMPLOYEE ENTERS > USE ALIBI / STALL / DRAW GUN > NORTH STUNS / STUN THE EMPLOYEE > LEAVE EMPLOYEE TO BE FOUND | none | **Missing** (North ▼; alarm). |
| NORTH CALLS CRADLE … CUT THE GLASS ×2 | none (M10 situation: "Your team has climbed the outside") | Narrated only. No checks exist in the game, so none should be invented. |
| SECURITY BLOCKS THE WAY > ATTACK / RUSE | M10 options 0/1, each `risk: 0.2` | **Mislabelled.** (a) The situation's "{{Josh}} wants to bluff your way past using forged credentials and a maintenance cover story" is not the game: Josh only says "No killing". In the game, RUSE means Markus walks up alone as a seemingly bugged maintenance android and must draw and knock them out. (b) Option 0's outcome "The guards wave the maintenance crew through" is wrong: the game's outcome is INCAPACITATE SECURITY, both guards knocked out. (c) Option 1's outcome "The guards go down before they can draw" is wrong: one guard is shot dead, and the other either raises the alarm or shoots Simon. (d) Neither 0.2 risk has a source. RUSE's failure is a timing check (Q1). |
| DRAW GUN > SHOOT GUARD ON PHONE / SHOOT GUARD DRAWING WEAPON | M10 option 1's risk roll | **Missing as a choice.** The game lets the player pick which guard: phone gives Simon wounded and no alarm; drawing-weapon gives the alarm and Simon unhurt. The engine instead rolls 0.2 for "Simon hit" and never records an alarm. |
| SECURITY SUSPECTS SOMETHING > ALERT CENTRAL SECURITY / NORTH ATTACKS > SIMON DAMAGED | M10 failure (`simonWounded=true`) | Partly covered. The engine has no `alarm` state; it treats a wounded Simon as the SWAT trigger (M12 event text). That is wrong for SHOOT GUARD ON PHONE (wound, no alarm) and SHOOT GUARD DRAWING WEAPON (alarm, no wound). |
| M10 relationship deltas | ATTACK `north(1);josh(-1)`; RUSE `north(-1);josh(1);simon(1)` | North/Josh match. **RUSE `simon(+1)` has no source.** Missing: Jericho ▲ on a successful ruse, or on assault / shooting the drawing guard; Jericho ▼ and Simon ▼ when a guard shoots Simon. |
| IN THE BROADCAST ROOM, RING TO ENTER, NORTH AND JOSH THREATEN THE OPERATOR, OPERATOR TRIES TO ESCAPE > SHOOT / DON'T SHOOT OPERATOR | M11 | Covered. Option 0 applies `po(-2)` immediately; in the game the casualty costs ▼ (small) at MEDIA REACTS, not ▼▼ at the shot. Option 1 sets `simonWounded=true` as the SWAT flag, which is right in effect (SWAT always wounds Simon), but it is the only alarm source the engine models (FORGET TO LOCK THE DOOR and ALERT CENTRAL SECURITY are missing). The adaptationNote is correct. |
| DEAL WITH ANDROID OPERATORS, PREPARE TO BROADCAST, "Ready" | none | Missing. "Ready" gives Jericho ▲ and North ▲ unconditionally; the engine does not apply them. |
| BEGIN CALMLY / BEGIN DETERMINEDLY | none (folded into M12) | **Missing choice.** |
| DEMAND groups 1–3 (11 nodes) | none | **Missing.** Three choice groups, no stat effects; the third changes the MEDIA REACTS line. |
| END PEACEFULLY / END DETERMINEDLY | M12 options 0/1 | Covered as the closing choice. The public-opinion math differs from the sources. Engine: no casualties + peaceful = +3; no casualties + determined = 0; casualties + peaceful = 0 (plus −2 from M11 if the operator was shot); casualties + determined = −2. Sources: no casualties gives ▲▲ (casualty line) plus ▲▲ peaceful or ▼▼/▼ determined; casualties give ▼ plus ▼▼ (transcript: any tone). Also: **`josh(+1)` on peaceful has no source**, and the M12 event "A tactical team storms the floor" is keyed on `simonWounded`, not on an alarm. |
| SWAT TEAM STORMS ROOM / LEAVE BROADCAST ROOM | M12 event text | Partly covered. No Jericho ▼ for SWAT. The no-SWAT gate (lock + incapacitate/shoot phone guard + shoot operator) cannot be expressed without the door and guard choices. |
| SIMON DAMAGED > LEAVE SIMON / TRY TO SAVE SIMON > FAIL TO SAVE SIMON / SIMON SAVED, SIMON IS KILLED | M13 options 0 (risk 0.15) / 1 | Partly covered. (a) **Ungated** (above). (b) "Carry him" risk 0.15 has no source; the game's check is a QTE with no number. (c) Carry success applies `simon(2)`, which has no source; the Simon ▲▲ belongs to LEAVE on the roof. (d) LEAVE `jer(-1)` matches FLEE. (e) The situation's "a round to the leg" matches the transcript ("I can't move my legs…"). |
| ON THE ROOF > SIMON CAN'T CONTINUE > LEAVE SIMON / EXECUTE SIMON | M14 options 0/1 | Partly covered. (a) **Ungated** (above). (b) Option 0 "Hide him with a gun" adds detail not in the sources; the game says only "LEAVE"/"I won’t kill one of our own". The gun is plausible (Simon shoots Connor in Public Enemy) but unsourced at this point. (c) Option 0 applies `simon(2)` (matches ▲▲) but **misses North ▼ and Josh ▲**. (d) Option 1 applies `north(1);josh(-1)` (matches) plus **`jer(-1)`, which has no source**. (e) The KILL > REFRAIN second prompt is missing. |
| RUN TO JUMP > REACH ROOF EDGE / GET SHOT > NORTH HELPS MARKUS > JUMP | none | **Missing.** GET SHOT is a cross-chapter impact (Markus's blue blood in Public Enemy). It is not a death. |
| MEDIA REACTS, the three endings | none | **Missing** as an event. The three ending labels are not recorded; the engine has only `simon`, `simonHidden`, `simonWounded` and `casualties`. |

### Downstream state the engine does not record but later chapters read

- Which guard died (Public Enemy body and phone).
- Operator dead or alive, separately from `casualties` (Public Enemy dialogue).
- Alarm, SWAT or none (Public Enemy room damage).
- Simon killed by SWAT versus on the roof (Public Enemy body location and dialogue).
- Markus shot on the roof (Public Enemy blue blood).
- Speech tone (Capitol Park North/Josh lines, Night of the Soul Josh line, Capitol Park billboard reaction). Nothing reads `choiceAt(s,'M12')`.
- Simon escaped intact versus left or dead (Capitol Park "Simon is here").

### What is consistent

- `C14` option 0 is gated on `simonHidden && simon` (line 154), which matches Public Enemy's "only if Simon was left behind on the roof".
- C14's "never found and later makes his way back to {{Jericho}}" matches PowerPyx and the Markus page.

---

## 8. Open questions

1. **SIMON CAN'T CONTINUE without SWAT.**
   - Possible path: ATTACK > SHOOT GUARD ON PHONE (Simon damaged, no alarm), with the door locked and the operator shot.
   - Does the roof prompt still appear? PowerPyx says yes. The wiki flowchart says "if Simon Saved, otherwise Run to Jump".
   - If it does not appear, what happens to a wounded Simon? Does he jump? Which ending results?
2. **ATTACK without drawing the gun.** PowerPyx: "Security Suspects Something / North Attacks: If you picked the ASSAULT option, don't do anything as you move towards the guards, don't draw your gun." The chart draws SECURITY SUSPECTS SOMETHING from the group bracket. On an ATTACK idle, does Simon get shot and is the alarm raised, as on a slow RUSE? The transcript only covers the slow RUSE case.
3. **North ▼ on an unlocked door.**
   - The transcript applies it to every employee option.
   - The wiki chapter page and Relationship_Stat apply it only when North stuns the employee.
   - A wiki Note says DRAW GUN (Markus stuns him) avoids it.
4. **Jericho ▲ on ASSAULT.** The transcript gives it on choosing ASSAULT (and Jericho ▼ / Simon ▼ for shooting the phone guard). The wiki gives it only for "shooting the security guard drawing his weapon". Net Jericho for ASSAULT > SHOOT GUARD ON PHONE: 0 (transcript) or ▼ (wiki)?
5. **Public-opinion tone line.**
   - (a) Does "CALM" in the transcript mean the opening (BEGIN CALMLY) or the ending (END PEACEFULLY)? PowerPyx says both; Marcel says opening DETERMINED still gets ▲.
   - (b) DETERMINED with no casualties: ▼▼ (transcript) or ▼ (wiki and Public_Opinion)?
   - (c) PEACEFUL with casualties: ▼▼ (transcript "or killed humans") or no tone effect (wiki lists none)?
6. **"If you kill everyone" (Public_Opinion, Large Decrease).** The transcript shows ▼ (small) for "Killed a guard and the operator". Is two casualties ever a ▼▼ on the casualty line, or is this wiki line the tone-line ▼▼?
7. **FAIL TO SAVE SIMON relationships.** Is there a Jericho ▼ ("If Simon is killed in the broadcast room", Relationship_Stat), as with FLEE? The transcript shows none.
8. **Lobby ruse gating.** Does each POSE option need its own clue analyzed (home address > fireman, Emily > teacher, parking badge > attendant)? Or does the phone number alone unlock all three?
9. **The "Convert android" section on Floor 47** (Markus: "I need your help…"). Which chart node is it: RETRIEVE PACKAGE, ACQUIRE MAINTENANCE BADGE, or LET NORTH IN? Can it fail?
10. **GET SHOT reachability.** Two PowerPyx commenters report auto-jumping when idle; about 1% of players got it (commenter amy). Is it difficulty-dependent?
11. **Blue on PowerPyx's chart.** Both DEMAND END OF SLAVERY and DEMAND FREE SPEECH, and both DEMAND RIGHT TO WORK and DEMAND UNIVERSAL SUFFRAGE, are blue. Each group allows only one pick, so blue here probably means "selected on some playthrough", not only the last one. This is cosmetic, but it means blue is not a reliable path trace in this screenshot.
12. **Does the alarm from LEAVE EMPLOYEE TO BE FOUND fire even if Markus stuns the employee himself (DRAW GUN)?** Commenters and the IT-employee page say any knock-out brings SWAT. The wiki flowchart only says "Lock the Server Door also required".
13. **Benchmark scope.** M13 and M14 are currently shown on every path. The fix needs an `alarm` state (door, central security, operator) separate from `simonWounded`. It also needs a decision on whether to model the guard-wound, no-SWAT case (question 1).

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | Index; the chapter's walkthrough link |
| https://www.powerpyx.com/detroit-become-human-the-stratford-tower-walkthrough-100/ | Walkthrough text: inputs per node, guard positions (L1 phone / R1 drawing), "unmissable" climb steps, SWAT conditions, ending conditions; reader comments on the no-SWAT recipe, GET SHOT, Simon's later return |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-1.jpg | Whole-chart overview; long edges (LEAVE SIMON / FAIL TO SAVE SIMON > ON THE ROOF, LEAVE BROADCAST ROOM > ON THE ROOF) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-2.jpg | Header "100% COMPLETED"; ALONE IN FERNDALE to STRATFORD TOWER |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-3.jpg | Lobby: FIND A WAY TO PASS SECURITY bracket, supervisor ruse group, TAKE ELEVATOR |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-4.jpg | Floor 47: magazines, package/badge/cart/North, HACK ROBOT / HACK DISPENSER, ENTER SERVER ROOM |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-5.jpg | Server room: door group, employee group and edges, the climb, ON THE TOP FLOOR |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-6.jpg | Corridor: ATTACK/RUSE edges, guard group, ALERT CENTRAL SECURITY, NORTH ATTACKS, SIMON DAMAGED, INCAPACITATE SECURITY |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-7.jpg | Broadcast room: operator group, BEGIN group, first two DEMAND groups |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-8.jpg | Third DEMAND group, END group, SWAT/Simon block, LEAVE BROADCAST ROOM |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-9.jpg | Roof: SIMON CAN'T CONTINUE, LEAVE/EXECUTE SIMON, RUN TO JUMP, GET SHOT, NORTH HELPS MARKUS, MEDIA REACTS, endings |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-stratford-tower-10.jpg | Ending tiles at legible size (no icons) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Stratford_Tower&prop=wikitext&format=json | Chapter page: infobox, Flowchart list with the Leave Broadcast Room condition, Relationship Changes, Public Opinion, Notes (saved as `wiki.txt`) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Markus-side levels; every Stratford Tower relationship line |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | Levels; the casualty and peaceful/determined lines; "kill everyone" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | Connor-only stat |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | Magazine numbers #6 and #38 |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=G.I._Android_(Article)&prop=wikitext&format=json | G.I. Android text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=President_Warren:_A_Woman_in_Trouble&prop=wikitext&format=json | Woman in Trouble text and location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | Every Stratford-dependent node in Public Enemy; Markus's blue blood; room damage note |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Simon's deaths, Public Enemy, Freedom March, Capitol Park |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json | Chapter summary; skin deactivated for the broadcast; speech quotes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json | North's reactions; "If the SWAT comes, Simon will always be shot" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json | Josh's reactions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Evan_Thompson&prop=wikitext&format=json | Operator; alarm if spared; trophy requirement |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Sean_Chedd&prop=wikitext&format=json | Guard on phone; who knocks out whom per path |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Chris_Robert&prop=wikitext&format=json | Guard drawing weapon; same |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Channel_16_IT_employee&prop=wikitext&format=json | Server-room employee; knock-out brings SWAT |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Elizabeth_Wilson&prop=wikitext&format=json | Supervisor and the three phone ruses |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Stratford_Tower&prop=wikitext&format=json | Building facts; Tech Addict article in the cutscene |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=WHEN_A_PLAN_COMES_TOGETHER&prop=wikitext&format=json | Trophy steps (lock, ruse, shoot operator) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | Trophy description |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json | Billboard reaction depends on the speech |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json | Simon's return and sacrifice nodes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | "Check On Simon" condition |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Markus's broadcast as evidence; Simon's body only if killed in Public Enemy |
| https://detroitbecometext.github.io/chapters/23 | Fan transcript (an unrendered SPA; content read from the two files below) |
| https://detroitbecometext.github.io/i18n/en.json | All in-game strings (`X0701M`, `X0702M`, `X0703M`, `MENU.OBSERVATION.07M`); copy used: `/tmp/flowcharts/ch12/en.json` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | Compiled templates: conditions, choice labels and relation icons for The Stratford Tower (`HL`), Public Enemy (`UL`), Capitol Park (`FL`), Night of the Soul captain's cabin (`ty`); copy used: `/tmp/flowcharts/ch12/chunks/` |
