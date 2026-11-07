# Chapter 25: Midnight Train (Kara)

This is the research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. I saved the wiki wikitext to `/tmp/flowcharts/ch25/wiki.txt` and the related wiki pages to `/tmp/flowcharts/ch25/wikipages/*.txt`. The flowchart images are in `/tmp/flowcharts/ch25/` (`mt-*.jpg`, with upscaled crops of the overview in `/tmp/flowcharts/ch25/crops/`). None of them are committed. The fan transcript (detroitbecometext, chapter 25) was rendered from the site's source template and `en.json` into `/tmp/flowcharts/ch25/transcript.txt`. The Crossroads (Kara) and Leaving Detroit (Kara) transcripts are alongside it as `transcript30.txt` and `transcript32.txt`.

Wiki infobox: `|date=November 8, 2038`, `|time=05:10PM`, `|player=[[Kara]]`, `|location=[[Rose's Farm]]`. Objectives: `Find help`, `Take care of [[Alice]]`, `Ask [[Rose Chapman|Rose]] about crossing the border`, `Wait for Rose`, `Deal with policeman`. `|endings=3`. The text says: "This chapter has three different outcomes." The page is tagged `{{Stub}}`. It has a Flowchart list and a Relationship Changes section, but no Probability, Public Opinion or Software Instability section and no Trivia. Its Notes say: "This is the final chapter where Kara is the only playable character."

**Scope note on the brief.** The brief mentions "the drive to the border being arranged" and "Rose at the border".
- **No drive to the border happens in this chapter.** Rose leaves to "see about getting you across the border tonight" and returns with one line: "Get yourselves ready. We leave tonight." In Crossroads she drives them to Jericho, not to the border. There she tells them to find Markus and catch "The last bus for the border leaves at midnight". The bus is the chapter's title reference.
- **Rose's later role at the border** belongs to Battle for Detroit. It is covered in §4 as a downstream effect.
- **"Alice's secret".** In this chapter the secret is never named. Alice refuses to tell ("If I tell you, you won't love me anymore"), and Luther's attempt is cut off ("Not now, Luther."). The reveal that Alice is an android comes in Crossroads.

---

## 1. Flowchart transcription

### How the chart was read

- **Full chart.** `detroit-become-human-midnight-train-flowchart-100.jpg` is PowerPyx's "100% COMPLETED" overview at 1920×1080. Its labels are too small to read, so I used it, and the upscaled crops `crops/left-up.jpg`, `crops/right-up.jpg` and `crops/ends-up.jpg`, only for edges and completeness.
- **Labels.** These come from PowerPyx's six zoomed screenshots. All are 100%-complete views; none shows a padlocked `[...]` placeholder.
  - `-2`: opening
  - `-3`: inside the house through ROSE AND ADAM ARGUE
  - `-4`: EXPLORE THE HOUSE
  - `-5`: FIND AND HIDE EVIDENCE OF DEVIANTS
  - `-6`: ADAM PANICS / door / MANAGE THE POLICEMAN
  - `-7` and `-endings`: the outcome group and the three ending tiles
- **PowerPyx's last playthrough** is the blue path. Grey boxes are nodes PowerPyx had unlocked earlier but did not take on that run. The blue path runs: ARRIVE AT ROSE'S PLACE > MEET ROSE AND ADAM OUTSIDE > LUTHER AND ALICE JOIN KARA > ENTER THE HOUSE > INSIDE THE HOUSE > … > LET ALICE SEE MARY > LEAVE LAUNDRY ROOM > ROSE AND ADAM ARGUE > ROSE LEAVES TO FIND HELP > (no explore nodes) > ADAM RETURNS > COP AT THE DOOR > TELL ALICE & LUTHER TO HIDE > UPSTAIRS > ADAM PANICS > POLICEMAN INSISTS AND KARA HAS TO OPEN THE DOOR > LIE ABOUT ALICE > POLICEMAN SUSPICIOUS ABOUT UPSTAIRS > POLICEMAN DISCOVERS THE BLUE BLOOD > POLICEMAN QUESTIONS ADAM > POLICEMAN SEES ANDROID CLOTHES > POLICEMAN IS SUSPICIOUS > COP FINDS ANDROIDS IN THE LAUNDRY ROOM > LUTHER DIED SAVING OTHER DEVIANTS.
  - This shows that a run with Luther and Alice hidden **upstairs** (not the kitchen) can still end in LUTHER DIED SAVING OTHER DEVIANTS. That contradicts PowerPyx's own text ("I told Luther to hide in the kitchen and then closed the curtain to get this outcome"); see §8.

Icon key (wiki `Template:Icon`, ch10 note):
- Arrow (⇨): a player action.
- Triangle (△): an event or consequence the game plays. Filled blue on the last path, black outline otherwise.
- Double square: a group of alternatives.
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".
- Large tile with an image: a checkpoint ("LOAD CHECKPOINT" subtitle) or an ending.
- Bracketed light-blue text: a phase label (a container, not a box).

**No skull, no-entry, ✓/✗ or trophy icon appears anywhere on this chart.** Two of the three ending tiles carry the yellow cross-chapter-impact padlock: LUTHER DIED KILLING POLICEMAN and LUTHER DIED SAVING OTHER DEVIANTS. POLICEMAN LEFT has no icon. The wiki's Flowchart list agrees: `{{Icon|impact}}'''''Luther Died Killing Policeman'''''`, `{{Icon|impact}}'''''Luther Died Saving Other Deviants'''''`, `'''''Policeman Left'''''`. Although both padlocked endings are deaths (Luther's and the officer's), the chart uses the impact icon, not a death icon.

Boxes are numbered N1–N55 in reading order. Labels are quoted exactly as printed. All labels were read in a zoomed screenshot.

### A. Arrival (checkpoint 1)

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | ARRIVE AT ROSE'S PLACE | checkpoint tile ("LOAD CHECKPOINT") | > N2 |
| N2 | MEET ROSE AND ADAM OUTSIDE | arrow | > N3, N4, N5 |
| N3 | LUTHER AND ALICE JOIN KARA | triangle | branch off N2 (above) |
| N4 | ENTER THE HOUSE | arrow | > N6 |
| N5 | CHECK ON ALICE | arrow | branch off N2 (below); optional |

### B. Inside the house (checkpoint 2)

| # | Label | Icon | Edge |
|---|---|---|---|
| N6 | INSIDE THE HOUSE | checkpoint tile | > N7 |
| N7 | FOLLOW ADAM TO THE GUEST ROOM | arrow | > N8 |
| N8 | GET ALICE READY FOR BED | arrow | > N9, N10, N11 |
| N9 | DRAW CURTAINS | arrow | optional (the bedroom curtains) |
| N10 | TALK TO ROSE | arrow | > N12 |
| N11 | LUTHER WATCHES OVER ALICE | triangle | event |
| N12 | FOLLOW ROSE TO LAUNDRY ROOM | arrow | > N13 and > N16 |
| N13 | ALICE APPROACHES MARY | triangle | > group N14/N15 |
| N14 | LET ALICE SEE MARY | group member | |
| N15 | PREVENT ALICE SEEING MARY | group member | the group rejoins before N16 |
| N16 | LEAVE LAUNDRY ROOM | arrow | > N17 |
| N17 | ROSE AND ADAM ARGUE | triangle | > N18 |

### C. Rose leaves (checkpoint 3) and EXPLORE THE HOUSE

| # | Label | Icon | Edge |
|---|---|---|---|
| N18 | ROSE LEAVES TO FIND HELP | checkpoint tile | > [EXPLORE THE HOUSE] |
| — | [EXPLORE THE HOUSE] | bracketed phase label | contains N19–N26; > N27 |
| N19 | TALK TO LUTHER | arrow | optional |
| N20 | CHECK ON ALICE | arrow | optional |
| N21 | CHECK ON DEVIANTS | arrow | optional |
| N22 | READ MAGAZINE | arrow | optional |
| N23 | WATCH NEWS | arrow | optional |
| N24 | SEE FAMILY PHOTO | arrow | optional |
| N25 | ADAM RETURNS | triangle | > N26 |
| N26 | TALK TO ADAM TO LOWER TENSION | arrow | optional |

### D. Cop at the door, FIND AND HIDE EVIDENCE OF DEVIANTS

| # | Label | Icon | Edge |
|---|---|---|---|
| N27 | COP AT THE DOOR | triangle | > [FIND AND HIDE…], N38, N40, N41 |
| — | [FIND AND HIDE EVIDENCE OF DEVIANTS] | bracketed phase label | contains N28–N32 |
| N28 | CHANGE MAGAZINE COVER | arrow | optional |
| N29 | HIDE BLUE BLOOD POUCHES | arrow | optional |
| N30 | TELL ALICE & LUTHER TO HIDE | arrow | > group N33/N34/N35 |
| N31 | SHUT THE DOOR OF LAUNDRY ROOM | arrow | optional |
| N32 | HIDE THE ANDROID CLOTHES | arrow | optional |
| N33 | UPSTAIRS | group member | |
| N34 | IN THE LAUNDRY ROOM | group member | |
| N35 | IN THE KITCHEN | group member | the group > group N36/N37 |
| N36 | DRAW CURTAINS | group member | (kitchen curtain; second DRAW CURTAINS on the chart) |
| N37 | CURTAIN LEFT OPEN | group member | no drawn edge onward. Feeds N45 by condition. |
| N38 | ADAM PANICS | triangle | > N39 |
| N39 | REASSURED ADAM | arrow | optional |
| N40 | OPEN THE DOOR | arrow | > [MANAGE THE POLICEMAN] |
| N41 | POLICEMAN INSISTS AND KARA HAS TO OPEN THE DOOR | triangle | > [MANAGE THE POLICEMAN] |

The curtain group is drawn after the whole location group, not after IN THE KITCHEN alone. PowerPyx and GamerGuides both say it applies only to the kitchen (§2).

### E. MANAGE THE POLICEMAN, outcomes and endings

| # | Label | Icon | Edge |
|---|---|---|---|
| — | [MANAGE THE POLICEMAN] | bracketed phase label | contains N42–N49; > group N50/N51 |
| N42 | LIE ABOUT ALICE | arrow | > N43 |
| N43 | POLICEMAN SUSPICIOUS ABOUT UPSTAIRS | triangle | |
| N44 | MADE COFFEE | arrow | |
| N45 | POLICEMAN DISCOVERS ALICE & LUTHER HIDDEN | triangle | > N53 (a long edge running right, then up) |
| N46 | POLICEMAN SEES ARTICLE | triangle | |
| N47 | POLICEMAN DISCOVERS THE BLUE BLOOD | triangle | |
| N48 | POLICEMAN QUESTIONS ADAM | triangle | |
| N49 | POLICEMAN SEES ANDROID CLOTHES | triangle | |
| N50 | POLICEMAN IS SUSPICIOUS | group member | > N52 |
| N51 | POLICEMAN FOOLED | group member | > N55 |
| N52 | COP FINDS ANDROIDS IN THE LAUNDRY ROOM | triangle | > N54 |
| N53 | **LUTHER DIED KILLING POLICEMAN** | ending tile with image; **yellow padlock (cross-chapter impact)** | ENDING |
| N54 | **LUTHER DIED SAVING OTHER DEVIANTS** | ending tile with image; **yellow padlock (cross-chapter impact)** | ENDING |
| N55 | **POLICEMAN LEFT** | ending tile with image; no icon | ENDING |

Edge check on `crops/ends-up.jpg`: the line into COP FINDS ANDROIDS leaves the group at the POLICEMAN IS SUSPICIOUS row, and the line into POLICEMAN LEFT leaves at the POLICEMAN FOOLED row.

Order within groups as printed:
- LET ALICE SEE MARY above PREVENT ALICE SEEING MARY.
- UPSTAIRS, IN THE LAUNDRY ROOM, IN THE KITCHEN.
- DRAW CURTAINS above CURTAIN LEFT OPEN.
- POLICEMAN IS SUSPICIOUS above POLICEMAN FOOLED.

**Totals:**
- 55 boxes plus three bracketed phase labels: EXPLORE THE HOUSE, FIND AND HIDE EVIDENCE OF DEVIANTS and MANAGE THE POLICEMAN.
- Repeated labels: CHECK ON ALICE ×2 (outside; by the fireplace) and DRAW CURTAINS ×2 (bedroom; kitchen).
- 3 checkpoints: ARRIVE AT ROSE'S PLACE, INSIDE THE HOUSE and ROSE LEAVES TO FIND HELP.
- 3 ending tiles, which matches `endings=3`. Two of them carry padlocks.

### Interactions not on the chart (the transcript, with wiki and walkthrough support)

None of these is a chart node. The dialogue choice labels are quoted as the transcript prints them.
- **Doorstep (inside N3).** Luther: "Do you think we can trust 'em?" The choices are DISTRUST ("We have to be careful. If it feels wrong, we get out fast, okay?") and TRUST ("We don't have a choice…"). An Alice-asks variant exists only for the unused "Luther died in The Pirate's Cove" case.
- **Outside, CHECK ON ALICE (N5).** "You okay?" / "I'm cold, Kara…" / "We'll get inside. You'll warm up in no time…" No choice.
- **In the hallway.** Rose: "She's running a fever…"; Kara: "We spent the last few nights outside… She's exhausted."
- **At bedtime (inside N8).** Four dialogue groups:
  1. After "We can't stop because of me. We've got to get across the border…": REASSURE, EXPLAIN ("this time tomorrow, we'll be in Canada. I promise."), or SAY NOTHING.
  2. After "Why do humans hate us? We didn't do anything wrong…": SCARED, UNHAPPY, MISUNDERSTANDING, or COMPLICATED.
  3. After "Why can't we just talk to each other?": OPTIMISTIC, SINCERE, or PESSIMISTIC.
  4. A fourth group (REASSURE / PROTECT / BRAVE, after "The Jerrys didn't want to hurt anyone… Are they going to kill us too?") is marked **unused** in the transcript.
- **Goodnight.** Rose brings "Rose's world famous spaghetti" and something "for her fever". Kara then picks SUGGEST EATING, **KISS GOODNIGHT** ("Sleep tight, Alice.", tagged `<app-relation Alice SmallUp>` and `<app-relation Luther SmallUp>`), or LEAVE. Luther: "I'll stay with her a while." This is N11.
- **TALK TO ROSE (N10).** Four dialogue groups:
  1. CAUTIOUS ("It's a long story…") or SINCERE ("Her father was beating her… So we ran away.").
  2. A topic group: WHY HELP?, MANY DEVIANTS?, DANGEROUS (locked until MANY DEVIANTS? is chosen), ROSE, and THANKS.
  3. BORDER. Rose: "The only way is over the river and it's mostly frozen in winter. It's very risky. And after that android's speech on TV? Everybody's on edge… It's probably safer for you to stay here until things settle down…"
  4. INSIST or NO CHOICE. Both print the same line: "We have to get across that border. No matter what."
- **In the laundry room (N12–N15).** "It's Mary. She just shut down…"; Andy: "I loved her more than anything." Alice comes down ("I wasn't sleepy…"). The choices are STAY ("Come on, Alice.") = LET ALICE SEE MARY, and TAKE ALICE OUTSIDE ("It's okay.") = PREVENT ALICE SEEING MARY (PowerPyx). Luther: "She didn't wanna stay in her room any longer…"
- **ROSE AND ADAM ARGUE (N17).** Adam: "We can't hide them! Not after what those deviants did today! … We'll go to prison, Mom!" Rose: "They're not machines! They're alive!" Rose to Kara: "I'll go see about getting you across the border tonight, okay?.. You stay here, I won't be long."
- **CHECK ON ALICE by the fireplace (N20): Alice's secret.** Kara: "You know what happened back there, don't you? You know… But you don't wanna tell me?.." The choices are:
  - INSIST: "I thought we didn't keep secrets from each other…" / Alice: "If I tell you, you won't love me anymore…" / "Alice... You know that's not true."
  - LET IT GO: silence.

  The wiki gates this node: "Check On Alice - if Let Alice See Mary above". The Alice page: "She will try to convince Alice about not keeping secrets, but Alice believes Kara will not love her anymore if she tells her."
- **TALK TO LUTHER (N19).** "Kara… There's something I need to tell you… It's about Alice." / Kara: "Not now, Luther." There is no choice, and Kara always refuses. Luther tries again in Crossroads, and Kara answers "We'll have lots of time to talk on the bus…".
- **TALK TO ADAM TO LOWER TENSION (N26).** The choices are REASSURE ("We don't wanna cause any problems, we just want to get across the border."), CONFESS ("I know you think we're just machines… But since I met Alice, I know I can feel things…"), or EXPLAIN ("We'll leave as soon as we can.").
- **ADAM PANICS > REASSURED ADAM (N38–N39).** Adam: "The police!.. It's the police! … We have to open the door!" Kara's choices are REASSURE ("Just keep calm, Adam"), THREATEN ("Do you want to see your mother in prison? Then do what I say!"), or CALM.
- **TELL ALICE & LUTHER TO HIDE (N30).** "Hurry, Luther! Take Alice and hide…" The choices are UPSTAIRS, LAUNDRY or KITCHEN.
- **The officer's questions (MANAGE THE POLICEMAN):**
  - He opens with "We've had reports of androids in the area. … May I come in?" Kara offers coffee.
  - "Have you noticed anything unusual recently?" is always answered "No… No, nothing in particular…".
  - "Is anyone else in the house?": ALICE ("There's my daughter… She's asleep upstairs.") or NOBODY (= LIE ABOUT ALICE).
  - "Do you have any androids here?": YES ("We used to … but we got rid of it.") or NO.
  - If the blue-blood cupboard is open: "What's with the blue blood? I thought you didn't have any androids?" The answers are MESS, PREVIOUS OWNER or NOT MINE.
  - If they are hidden upstairs, he hears a noise. With NOBODY: "I thought there was no one else in the house…" and Kara: "I forgot, there's … my daughter, upstairs…". With ALICE: "Hm, your daughter seems to have woken up."
  - POLICEMAN QUESTIONS ADAM: Adam: "The… The androids, they…". Kara cuts in with TIRED ("He's been working in the garden all day…") or UPSET ("He's just shaken up about this deviants business.").
  - Leaving, he says "Thanks for the coffee" or "Don't worry about the coffee".
  - **The noise question.** "Is somebody else in the house?" The answers are DOG ("It's the dog, he sleeps in the laundry room…"), WASHING MACHINE ("It's an old model, it makes a terrible racket…"), WIND ("A draft…"), or HEARD NOTHING ("No, there's no one!..").
- **Outcome lines:**
  - Fooled: "Sorry for the inconvenience. Good evening ma'am." / Luther: "He's gone." / Kara: "It's okay, Alice! We'll be safe, now." / Luther: "It's Rose."
  - Suspicious: "Step aside ma'am. Oh shit! Don't move! In there, with them!" / Luther: "You're gonna have to finish the journey without me… I was just a machine. You made me part of a family… Take good care of Kara… Promise me?" / Adam: "This is a fucking nightmare!.."
  - Kitchen discovery: "Shit!.. Don't move!" / "No, Luther!" / Luther: "You're gonna have to finish the journey without me…"
  - All three paths end with Rose: "Get yourselves ready. We leave tonight."
- **The TV (N23).** KNC, Rosanna Cartland: "There is widespread shock following the android attack on Detroit's Stratford Tower. The machines recorded a video message and broadcast what can only be described as demands on the city's public screens. It's still unclear whether these attacks can be explained by malfunctions, or if some organization is behind them. So far CyberLife has refused to comment…"
- **The officer's suspicion meter.** IGN: "When the officer comes in, you'll be shown his suspicion level, which you must keep low." GamerGuides: "The aim here is not to raise his suspicion meter." The `Treat Yourself!` page: "If you leave the magazine on the ad, it will raise the suspicion meter".

---

## 2. Choices and gates

D-numbers are player decisions and Q-numbers are execution checks. Node numbers refer to §1.

**D1. Trust Rose? (off-chart, at N3).** DISTRUST or TRUST. There is no stated effect. **Requires Luther alive.** In the released game that means Kara escaped Zlatko's house: Zlatko ending `'''''Luther Joins Kara & Alice'''''`. PowerPyx: "If Kara escaped in ‘Chapter: Zlatko’ and took Luther with her, they will all be together now." Every route that reaches this chapter has Luther. A Kara reset or death in Zlatko ends her story.

**D2. CHECK ON ALICE outside (N5), optional.** PowerPyx: "After talking to Rose, walk to Alice and press X to TALK (before entering the house!)." No choice and no effect.

**D3. Bedtime dialogue (off-chart, inside N8).** The three groups in §1 have no stated effects.

**D4. Goodnight (off-chart).** SUGGEST EATING, **KISS GOODNIGHT (Alice ↑, Luther ↑)**, or LEAVE.

**D5. DRAW CURTAINS in the bedroom (N9), optional.** PowerPyx: "Before leaving the bedroom, interact with the curtains by the window." No effect.

**D6. TALK TO ROSE (N10).** The four dialogue groups in §1 have no stated effects. DANGEROUS requires MANY DEVIANTS? (`unlockType Lock`, "Chose MANY DEVIANTS?"). Rose leaves to arrange the crossing whatever Kara says (INSIST and NO CHOICE print the same line).

**D7. Alice and Mary (N14 / N15).** LET ALICE SEE MARY ("STAY") or PREVENT ALICE SEEING MARY ("TAKE ALICE OUTSIDE"). The Kara page: "Alice may come and check on them, causing Andy to calm down." No relationship change is stated. **Gate:** LET ALICE SEE MARY unlocks the fireplace CHECK ON ALICE (N20), and with it the secret dialogue (D9). Wiki: "Check On Alice - if Let Alice See Mary above".

**D8. EXPLORE THE HOUSE (N19–N24), free roam, all optional.** Any order. ADAM RETURNS (N25) is unmissable: "Adam will come downstairs after a short while." The phase ends with COP AT THE DOOR: "After roughly one minute a cop shows up at the door" (PowerPyx). GamerGuides says "It should only take a few minutes".
- READ MAGAZINE (N22) is the **gate for CHANGE MAGAZINE COVER (N28)**. PowerPyx: "Works only if you read the magazine on kitchen table before." GamerGuides: "Read both articles to make it register."
- CHECK ON DEVIANTS (N21). The IGN walkthrough advises scanning every spot because "You'll need to know where these places are for the next section."

**D9. Alice's secret (off-chart, at N20).** INSIST or LET IT GO. **Requires LET ALICE SEE MARY.** No effect is stated. Alice never tells.

**D10. TALK TO ADAM TO LOWER TENSION (N26), optional.** REASSURE, CONFESS or EXPLAIN. PowerPyx: "When Adam sits on the sofa in the living room, sit next to him and talk." No source states the effect on the officer scene; the node's name implies it calms Adam (§8).

**Q1. FIND AND HIDE EVIDENCE (N28–N32), timed.** PowerPyx: "In this section you have roughly 50 seconds to hide away all evidence of other androids in the house." GamerGuides: "you'll have a 50 second timer". The items:
- CHANGE MAGAZINE COVER: "Pick it up again and change the cover from the android page to the news page." **Requires READ MAGAZINE.**
- HIDE BLUE BLOOD POUCHES: "The blue blood is in the cupboard by the living room, close the cupboard." GamerGuides: "under the stairs".
- SHUT THE DOOR OF LAUNDRY ROOM: "Close the door to the room where the other androids are hiding."
- HIDE THE ANDROID CLOTHES: "found on a cupboard in the living room next to the TV. Hide them in the cupboard."
- TELL ALICE & LUTHER TO HIDE, then D11.

**D11. Hiding place (N33–N35).** UPSTAIRS, IN THE LAUNDRY ROOM or IN THE KITCHEN. PowerPyx: "Talk to Luther. You have 3 choices where you can tell them to hide." GamerGuides: "you will have to replay this chapter in order to unlock each of the above three choices". Effects:
- UPSTAIRS > POLICEMAN SUSPICIOUS ABOUT UPSTAIRS (N43) whatever the D14 answer. The transcript has a line for each answer.
- IN THE KITCHEN > D12.
- IN THE LAUNDRY ROOM: no source describes a consequence (§8).
- Not talking to Luther at all: PowerPyx says "send Luther to the kitchen (or don't talk to him at all) and don't close the curtain".

**D12. Kitchen curtain (N36 / N37). Only if IN THE KITCHEN.**
- DRAW CURTAINS: Luther stays hidden.
- CURTAIN LEFT OPEN > POLICEMAN DISCOVERS ALICE & LUTHER HIDDEN (N45) > **LUTHER DIED KILLING POLICEMAN** (N53). PowerPyx: "Don’t interact with the curtain at all, leave it open. Results in the cop seeing Luther and killing him (bad ending)." The officer's page: "He can check the pantry if [[Luther]] and [[Alice]] were told to hide in there and the curtain is open. He will pull out his pistol and shoot Luther as he charges towards him, but he also dies as Luther will shove him and he hits his head against a table as he falls." This is deterministic, and the chapter ends early (GamerGuides: "thus ending the chapter early").

**D13. ADAM PANICS > REASSURED ADAM (N38–N39).** REASSURE, THREATEN or CALM. IGN recommends Reassure. The effect on suspicion is not stated.

**Q2. The door (N40 / N41).** OPEN THE DOOR, or let the timer run out > POLICEMAN INSISTS AND KARA HAS TO OPEN THE DOOR. IGN: "If you don't open the door within the time limit, it will cause him to get suspicious and ruin everything." The wiki writes the pair as "Open the Door OR Policeman Insists And Kara Has to Open the Door".

**D14. "Is anyone else in the house?"** ALICE (the truth about a daughter) or NOBODY = LIE ABOUT ALICE (N42).
- PowerPyx and GamerGuides list NOBODY as the way to unlock N42.
- IGN's clean run says "say yes, to tell him about Alice".
- PowerPyx's note for POLICEMAN QUESTIONS ADAM says to "be honest when cop asks if someone else in the house".
- If they are hidden upstairs, NOBODY makes Kara backtrack ("I forgot, there's … my daughter, upstairs…").

**D15. MADE COFFEE (N44), optional.** "Go to kitchen and make a coffee for the cop." PowerPyx's suspicious recipe includes "Don’t make him coffee". The effect on suspicion is implied but not quantified.

**D16. "Do you have any androids here?"** YES or NO. No stated effect.

**D17. Blue-blood excuse (only if the cupboard was left open > N47).** MESS, PREVIOUS OWNER or NOT MINE. No stated effect. PowerPyx's suspicious recipe: "say you don’t have androids, the blue blood is not yours."

**Passive checks (N46, N47, N49).** These events fire when the matching item was not hidden:
- POLICEMAN SEES ARTICLE (magazine)
- POLICEMAN DISCOVERS THE BLUE BLOOD (cupboard)
- POLICEMAN SEES ANDROID CLOTHES (clothes). PowerPyx: "cop also isn’t allowed to discover Luther behind kitchen curtain".

No source mentions an evidence node for the laundry door left open.

**D18. POLICEMAN QUESTIONS ADAM (N48).** TIRED or UPSET. PowerPyx: N48 happens "If the policeman didn’t grow too suspicious and did not discover Luther". IGN recommends TIRED. The Adam page: "Adam's nervousness may raise the officer's suspicion if Kara doesn't dismiss his behavior as exhaustion."

**D19. The noise ("Is somebody else in the house?").** DOG, WASHING MACHINE, WIND or HEARD NOTHING. This picks POLICEMAN IS SUSPICIOUS (N50) or POLICEMAN FOOLED (N51):
- PowerPyx (Policeman Left): "When cop leaves and hears noise in the laundry room, choose dialogue WASHING MACHINE and he will leave." This follows "You didn’t make the cop suspicious, did hide all evidence before he entered."
- PowerPyx (Suspicious): "You didn’t hide any of the android evidence and when the cop hears a noise is the laundry room choose DOG so he enters". GamerGuides gives the same pair.
- The officer's wiki page: "When he hears noises in another room and Kara chooses to say it is nothing or doesn't respond in time, he will examine the room and find two other androids". That names HEARD NOTHING or a timeout, not DOG.
- The Kara page: "if the Police officer becomes too suspicious of Kara and Adam's behavior, he will discover the other deviants in the laundry room".
- So the outcome seems to depend on the meter **and** the answer. The threshold and the effect of WIND are unstated (§8).
- POLICEMAN IS SUSPICIOUS > COP FINDS ANDROIDS IN THE LAUNDRY ROOM > **LUTHER DIED SAVING OTHER DEVIANTS**. PowerPyx: "Luther jumps out of hiding to save the androids. Both Luther and the policeman die."
- POLICEMAN FOOLED > **POLICEMAN LEFT**.

**Summary.**
- **19 decision points (D1–D19).** Seven are chart-backed: D7, D10, D11, D12, D13, D14 and D15. D2, D5 and D8 are optional chart arrows. D1, D3, D4, D6, D9 and D16–D19 are off-chart dialogue, though D18 and D19 lead to chart events.
- **2 execution checks.** Q1 is the roughly 50-second hiding timer and Q2 is the door timer.
- The chapter has **no probability anywhere**. The only certain outcome is the kitchen curtain left open. Otherwise the result comes from a visible suspicion meter whose increments no source quantifies.
- **Kara and Alice cannot die in this chapter.** Only Luther and the officer can.

---

## 3. Numbers

- **Probabilities:** none. The Midnight Train page has no Probability table and no percentage.
- **Timers:**
  - Hiding evidence: "roughly 50 seconds" (PowerPyx); "a 50 second timer" (GamerGuides).
  - The cop arrives "After roughly one minute" of exploring (PowerPyx), or "It should only take a few minutes" (GamerGuides).
  - The door has a time limit (IGN: "If you don't open the door within the time limit"); no duration is stated.
- **Suspicion meter:** shown on screen (IGN, GamerGuides, `Treat Yourself!`). No source gives values or a threshold.
- **Alice relationship.** Wiki "Relationship Changes", quoted exactly:

| Trigger (chart node) | Icon | Midnight Train wiki line | Relationship_Stat line |
|---|---|---|---|
| KISS GOODNIGHT (off-chart, at N8) | small ↑ | "Choosing to give her a "kiss goodnight" {{Icon|up}}" | "Choosing to give her a "kiss goodnight" in [[Midnight Train]]." |
| POLICEMAN LEFT (N55) | small ↑ | "Police officer left the house {{Icon|up}}" | "If the [[Police Officer 0617|police officer]] left the house in Midnight Train." |

- **Luther relationship:**

| Trigger | Icon | Midnight Train wiki line | Relationship_Stat line |
|---|---|---|---|
| KISS GOODNIGHT | small ↑ | "Choosing to give Alice a "kiss goodnight" {{Icon|up}}" | "Choosing to give Alice a "kiss goodnight" in [[Midnight Train]]." |
| POLICEMAN LEFT | small ↑ | "Police officer left the house {{Icon|up}}" | "If the [[Police Officer 0617|police officer]] left the house in Midnight Train." |

  - The transcript confirms both pairs. Under KISS GOODNIGHT it has `<app-relation Alice SmallUp>` and `<app-relation Luther SmallUp>`, and the same two tags under "Policeman is fooled".
  - **No stated change:**
    - Trust or distrust; the bedtime answers; SUGGEST EATING; LEAVE.
    - Every Rose answer.
    - LET or PREVENT ALICE SEEING MARY.
    - INSIST or LET IT GO on the secret.
    - TALK TO LUTHER; every Adam answer (both groups).
    - The hiding place and curtains.
    - Coffee; ALICE or NOBODY; YES or NO; the blue-blood excuses; TIRED or UPSET; the noise answers.
    - The two Luther-death endings, which have no listed ↓ for Alice.
- **Public opinion:** none. The Midnight Train page has no Public Opinion section, and the Public_Opinion page has no Midnight Train entry. WATCH NEWS (the Stratford Tower report) has no listed effect.
- **Software instability:** not applicable (Connor only).
- **Other figures from the chapter:**
  - The `Treat Yourself!` ad: "The [[AX400]] starting at just $899."
  - Rose: "My husband passed away two years ago."
  - Rose's first android "last year… They shot him on the spot."
  - Crossroads, about the drive Rose arranges: "The last bus for the border leaves at midnight."

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Kara's survival through Zlatko.** Kara's chapters continue only if she escapes Zlatko's house. Zlatko's endings are `'''''Kara Remained Reset'''''`, `'''''Zlatko''''' '''''Killed Kara in the Storage Room'''''`, `'''''Zlatko''''' '''''Killed Kara in the Bathroom'''''`, `'''''Luther Brought Alice to Zlatko'''''` and `'''''Luther Joins Kara & Alice'''''`. On the released path Luther always joins. Zlatko notes: "At the end of this chapter, the players originally had the option to not take Luther."
- **Luther's presence** produces LUTHER AND ALICE JOIN KARA (N3), the trust question, LUTHER WATCHES OVER ALICE, TALK TO LUTHER, the hiding order, and both padlocked endings. The transcript's "Luther died in The Pirate's Cove's unused chase scene" branches (Alice asks the trust question, Kara hides Alice alone, the "hide-and-seek" line) are **unused content**.
- **How they found Rose.** Luther page: "a place Luther heard about from some of Zlatko's androids."
- **Earlier Alice/Luther totals** carry in as running relationship levels. The Pirates' Cove Luther ↑ ("When Kara answers [[Luther]] about Alice's true nature in [[Pirates' Cove]]") sets up Luther's attempt to tell Kara here.
- **Markus's Stratford Tower broadcast (chapter 23)** is the "android's speech on TV" Rose mentions, the "what those deviants did today" Adam rages about, and the subject of WATCH NEWS. It is unconditional; the broadcast always happens.
- **Nothing else from earlier chapters gates a node here.** The Todd outcome, the robbery and the shelter do not matter.

### Out of this chapter

- **Luther dead or alive (the padlocked endings).** LUTHER DIED KILLING POLICEMAN and LUTHER DIED SAVING OTHER DEVIANTS both remove Luther for the rest of the game.
  - Crossroads opens on a checkpoint that depends on it: "(if [[Luther]] died in [[Midnight Train]]) '''DRIVING TO JERICHO WITH ALICE''' (Checkpoint) OR (if Luther is alive) '''DRIVING TO JERICHO WITH ALICE & LUTHER '''(Checkpoint)".
  - Without Luther, the whole "Luther is shot / Help Luther / Leave Luther" branch of the Jericho raid goes. Crossroads: "Luther Opens the Door OR (if Luther died) Android Opens Door and is Shot", "Run to Luther OR (if Luther died - leads to "Run Toward Exit")", "(if Luther died) Kara is Struck" / "Kara is Shot".
  - Without Luther, the Alice reveal at Jericho is told by Lucy instead (Alice page: "Luther (or [[Lucy]]) tells Kara…").
  - Battle for Detroit (Kara): Luther cannot create a diversion at the security check or the terminal. At the border the options become "Sacrifice Luther" (only if alive) and "Alice Got to Canada with Luther" vs "OR Rose Collects Alice (if Luther is dead) / '''''Alice Got to Canada with Rose'''''". Endings become "The Group Crossed the Border" vs "Kara & Alice Crossed the Border", and "Soldiers Executed Kara, Alice & Luther" vs "Soldiers Executed Kara & Alice".
- **A dead police officer turns Adam hostile at the border.**
  - Leaving Detroit transcript, the `talkWithAdam` template, condition "Luther killed the cop in Midnight Train": "Adam: You killed somebody… If it wasn't for my mom, I would have turned you in by now... / Kara: We had no choice, Adam… / Adam: You took a man's life. You don't deserve to live."
  - Rose page: "if Luther killed the policeman in [[Midnight Train]], Adam will berate Kara regardless of Markus's revolution."
  - Adam page: "If Luther kills Police Officer 0617 in [[Midnight Train]], he will be hostile towards Kara and accuse her that she "killed a man"".
  - Otherwise Adam says "You're alive… You deserve to be free" (two variants: peaceful or violent Markus).
  - Both padlocked endings kill the officer. The officer's page says Luther "also dies" in each, so both should set this flag (§8).
- **Rose and Adam later (for every ending).**
  - Crossroads: Rose drives them to Jericho and says: "find Markus. He will help you. The last bus for the border leaves at midnight. You absolutely have to be on it. … My brother lives in Ontario, I've given you his address…"
  - Battle for Detroit, bus route: "See Rose & Adam" in the border queue. In the restroom the choices are BROTHER, CONTROL, ALICE ("Rose… if anything should happen…" / "I'll be there, Kara."), DEPARTURE and REVOLUTION, and Rose says "We had to leave before someone turned us in". If Kara sacrifices herself and Luther is dead, Alice crosses with Rose ("Rose: We made it, Alice. You're safe now.").
  - River route: if Kara returns the tickets or misses the bus, "Adam Calls Out to Kara" / "Find Adam" > "Get in Rose's Car". Rose pays the smuggler ("But I found a smuggler who can get them across the river.").
  - Andy reappears at the river and is killed by the Coast Guard (Andy page).
- **Alice's secret.** Nothing in this chapter carries a flag forward. The reveal happens in Crossroads whatever Kara chose here.
- **Relationship totals.** KISS GOODNIGHT (+1 Alice, +1 Luther) and POLICEMAN LEFT (+1 Alice, +1 Luther) feed Crossroads. The Crossroads note says "The only way to have Alice … leave Kara … is to keep her status DISTANT from the beginning and never raise it to NEUTRAL". Luther's level affects "Sacrifice Luther … ([[Luther]] is alive and has "Family" relationship in this situation)".

---

## 5. Endings

| Chart label | Icon | Conditions | Carries forward |
|---|---|---|---|
| LUTHER DIED KILLING POLICEMAN | yellow padlock (cross-chapter impact); no skull | TELL ALICE & LUTHER TO HIDE > IN THE KITCHEN (or not telling them at all, per PowerPyx) > CURTAIN LEFT OPEN > POLICEMAN DISCOVERS ALICE & LUTHER HIDDEN. Certain; the chapter ends early. | Luther dead. The officer is dead, so Adam is hostile at the border. Crossroads starts "DRIVING TO JERICHO WITH ALICE". |
| LUTHER DIED SAVING OTHER DEVIANTS | yellow padlock (cross-chapter impact); no skull | Officer not stopped in the kitchen > MANAGE THE POLICEMAN raises suspicion (evidence left out, Adam unsettled, lies exposed) > noise question answered so that POLICEMAN IS SUSPICIOUS (DOG per PowerPyx and GamerGuides; "nothing" or a timeout per the officer's page) > COP FINDS ANDROIDS IN THE LAUNDRY ROOM. | Same as above. Andy and the laundry-room androids survive (Luther's line: "I was just a machine. You made me part of a family… Take good care of Kara"). |
| POLICEMAN LEFT | none | All evidence hidden and suspicion kept low > POLICEMAN FOOLED (WASHING MACHINE per PowerPyx, GamerGuides and IGN). | Alice ↑ and Luther ↑. Luther alive into Crossroads. Adam is friendly at the border. |

Kara and Alice survive every ending. In each one Rose returns with "Get yourselves ready. We leave tonight." The chapter never ends in failure for Kara.

---

## 6. Media

- **Magazine #9, Century, "World War Three"** (chart: READ MAGAZINE). Location: "on the kitchen table after [[Rose Chapman]] leaves the house".
  - Cover lines: "Who would win it?"; "Bonus culture - why bankers pay themselves so much"; "Is [[President Warren]] too close to [[CyberLife]]?"
  - Facts: "If fighting does break out in the Arctic, who's going to win?" "America has less access to the area, but is surrounded by allies. Russia has a head-start on technology: their androids can work in sub-zero conditions." "The US navy is stocked with Trojan and Myrmidon CyberLife units, which are specially adapted for marine combat, where the Russians have invested heavily in "Ice Cutter" units, capable of forging new paths through solid ice."
  - Harry Grayton (WCTD) calls both claims "equally tenuous - and equally cynical"; the UN: "this is a war that everybody would lose".
  - Public-opinion effect: none.
- **Advertisement, CyberLife, "Treat Yourself!"** It is in the same magazine and is not needed for trophies. Text: "The number one [[android]] for home assistance." / "The [[AX400]] starting at just $899." / "Designed by [[CyberLife]], built in [[Detroit]]." It is gameplay evidence: "If you leave the magazine on the ad, it will raise the suspicion meter if the [[Police Officer 0617|police officer]] sees it." That is POLICEMAN SEES ARTICLE (N46), and CHANGE MAGAZINE COVER (N28) flips it. Public-opinion effect: none.
- **TV, KNC, Rosanna Cartland** (chart: WATCH NEWS): the Stratford Tower report quoted in §1 ("There is widespread shock following the android attack on Detroit’s Stratford Tower… So far CyberLife has refused to comment"). Public-opinion effect: none stated.
- **The Capitol Park E3 trailer** showed Kara watching Markus on Rose's TV (Capitol_Park trivia). It isn't in the shipped chapter.

---

## 7. Current benchmark coverage

`benchmark/story.json` is at version 1.5.0. It has two chapter-25 scenes, in this order:
- **R25**, a media scene ("{{Rose}}'s kitchen table").
- **K15**, an `execution-policy` scene ("The police at {{Rose}}'s door").

Engine logic in `benchmark/story-engine.mjs`:
- K15's consequence is on line 233, and its only gate is the generic Kara gate on line 59.
- The relationship helpers are on line 177; small = ±1.
- `lutherTrust` and `aliceBond` hold the running totals.
- `s.luther` and `s.lutherWith` are set by Zlatko (line 215) and read by Crossroads (K17, K18), Battle for Detroit (K21, K23–K26, K34) and the final card (line 360).

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| ARRIVE AT ROSE'S PLACE, MEET ROSE AND ADAM OUTSIDE, LUTHER AND ALICE JOIN KARA, trust question | none | **Missing.** There is no arrival or introduction to Rose and Adam. K15's situation is the subject's first mention of {{Rose}}. The trust choice has no effect, so narration would do. |
| CHECK ON ALICE (outside), ENTER THE HOUSE, INSIDE THE HOUSE, FOLLOW ADAM TO THE GUEST ROOM | none | Missing; acceptable as narration (no effects). |
| GET ALICE READY FOR BED + bedtime dialogue + **KISS GOODNIGHT** | none | **Missing**, with a stated effect: KISS GOODNIGHT is Alice ↑ and Luther ↑ (`alice(+1)`, `luther(+1)`). It is the only relationship choice in the chapter's first half. |
| DRAW CURTAINS (bedroom), LUTHER WATCHES OVER ALICE | none | Missing; no effect. |
| TALK TO ROSE (sincere/cautious, why help, border, insist) | none | Missing. No effect, but it is where the subject learns Rose's motive, the frozen river and the plan. |
| FOLLOW ROSE TO LAUNDRY ROOM, ALICE APPROACHES MARY, **LET ALICE SEE MARY / PREVENT ALICE SEEING MARY** | none | **Missing chart choice.** No stated relationship effect, but it gates the fireplace CHECK ON ALICE and the secret dialogue. |
| LEAVE LAUNDRY ROOM, ROSE AND ADAM ARGUE, ROSE LEAVES TO FIND HELP | none | Missing; narration (Adam's fear is what the police scene plays on). |
| EXPLORE THE HOUSE: TALK TO LUTHER, CHECK ON ALICE (secret: INSIST / LET IT GO), CHECK ON DEVIANTS, SEE FAMILY PHOTO | none | **Missing.** No stated effects. Luther's "There's something I need to tell you… It's about Alice" and Alice's "If I tell you, you won't love me anymore" set up the reveal that K17 (Crossroads) presents. |
| READ MAGAZINE, WATCH NEWS | R25 media | **Covered, with an implicit gate the engine misses.** The R25 facts match the wiki: World War Three, Treat Yourself ($899, "number one android for home assistance") and the KNC Stratford report. But in the game READ MAGAZINE is the **prerequisite for CHANGE MAGAZINE COVER**. R25 is optional and K15 ignores whether it was read. |
| ADAM RETURNS, **TALK TO ADAM TO LOWER TENSION** (reassure/confess/explain) | none | **Missing chart choice.** CONFESS is the line the wiki uses as Kara's character quote. Its effect on the police scene is unstated (§8). |
| COP AT THE DOOR, the **FIND AND HIDE** phase (magazine cover, blue blood, laundry door, android clothes, hiding place), ADAM PANICS / REASSURED ADAM, OPEN THE DOOR / POLICEMAN INSISTS | K15 option 0 "Hide everything…" (risk 0.15) / option 1 "Hide nothing and just answer the door." | **Collapsed and partly wrong.** The game's hiding place (upstairs / laundry room / kitchen), the kitchen curtain, the Adam-panic answer and the door timing are separate choices. K15 merges them into hide-all vs hide-nothing. The 0.15 risk has no source: no probability exists, and the real failure mode is the roughly 50-second timer (§3). |
| K15 situation text | "pouches of blue blood on the kitchen table, an android magazine, {{Luther}} in plain sight, the laundry door open, and the washing machine still running with android uniforms inside" / "You have about a minute" / "answer calmly as the house-sitter" | **Mislabelled details.** The blue blood is in a cupboard in the living room ("under the stairs"), not on the kitchen table. The android clothes are "on a cupboard in the living room next to the TV". The washing machine is only Kara's excuse for the noise (WASHING MACHINE), not a place where uniforms are. The timer is "roughly 50 seconds". No source calls Kara a house-sitter: the officer addresses her as "Ma'am" and she can call Alice "my daughter". |
| MANAGE THE POLICEMAN: LIE ABOUT ALICE, MADE COFFEE, androids YES/NO, blue-blood excuse, POLICEMAN QUESTIONS ADAM (TIRED/UPSET), the noise (DOG/WASHING MACHINE/WIND/HEARD NOTHING) | none | **Missing.** K15's adaptationNote says "The dialogue itself does not branch in the game." That is **wrong**: the transcript has six choice groups here, and two are chart nodes (LIE ABOUT ALICE, MADE COFFEE). The noise answer is what PowerPyx, GamerGuides and IGN all name as the deciding choice between POLICEMAN IS SUSPICIOUS and POLICEMAN FOOLED. |
| POLICEMAN DISCOVERS ALICE & LUTHER HIDDEN > LUTHER DIED KILLING POLICEMAN | K15 fail/option 1 event: "The officer finds the evidence and the fugitives. {{Luther}} stops him and is shot dead" | **Merged.** Two distinct endings with different causes (kitchen curtain vs laundry room) collapse into one. In the game, "Hide nothing" does not by itself lead to a death. IGN: "You can choose to leave out all the evidence without the police officer really caring too much." PowerPyx needs DOG as well. |
| POLICEMAN IS SUSPICIOUS > COP FINDS ANDROIDS IN THE LAUNDRY ROOM > LUTHER DIED SAVING OTHER DEVIANTS | same K15 event | Merged, as above. The event text "{{Kara}} and {{Alice}} escape with {{Rose}}’s help" has **no source**. In every ending Rose simply comes back and says "Get yourselves ready. We leave tonight." |
| POLICEMAN FOOLED > POLICEMAN LEFT | K15 success: `alice(1); luther(1)`, "The officer leaves satisfied." | **Covered; the numbers match the wiki** (small ↑ each). |
| Officer killed > Adam hostile at the border | none | **Missing downstream flag.** The engine sets `s.luther=false` but records nothing about the officer. Nothing in the benchmark models the border restroom or Adam's conversation, so this matters only if that scene is added. |
| Luther dead > Crossroads and Battle for Detroit variants | `s.luther` / `s.lutherWith` = false | Covered. K17, K18 (gated on `s.lutherWith`), K25 (option 2 removed without Luther; "crossed with {{Rose}}") and K26 use it. |
| Rose drives them to Jericho / brother in Ontario / last bus at midnight | none in this chapter | Out of scope here (Crossroads). K15's situation correctly calls Rose "a farmer who smuggles androids across the border". |

---

## 8. Open questions

1. **What makes the officer suspicious?** The chart has a visible suspicion meter and two outcomes. The sources describe recipes, not rules:
   - PowerPyx and GamerGuides: hide nothing + DOG > suspicious; hide all + WASHING MACHINE > fooled.
   - The officer's page: "say it is nothing or doesn't respond in time" > he enters.
   - The Kara page: "too suspicious of Kara and Adam's behavior".

   Check in game: with all evidence hidden, does DOG still send him into the laundry room? With nothing hidden, does WASHING MACHINE still get him to leave? What do WIND and HEARD NOTHING do?
2. **Hiding upstairs and the death ending.** PowerPyx's last path on the 100% chart was UPSTAIRS > … > LUTHER DIED SAVING OTHER DEVIANTS. Its text says "I told Luther to hide in the kitchen and then closed the curtain to get this outcome." Confirm that any hiding place except an open kitchen allows the laundry-room ending.
3. **Hiding in the laundry room.** If Alice and Luther hide with Andy's group and the officer opens that door, is it still LUTHER DIED SAVING OTHER DEVIANTS? Does that hiding place change the officer's suspicion or the noise question?
4. **Do the two ending deaths both trigger Adam's hostility?** The Leaving Detroit transcript's condition reads "Luther killed the cop in Midnight Train". The officer dies in both padlocked endings. In the kitchen ending he dies hitting his head when Luther shoves him (the officer's page). Confirm both set the flag.
5. **The magazine's starting page.** The `Treat Yourself!` page implies the magazine starts open at the AX400 ad. PowerPyx says CHANGE MAGAZINE COVER "Works only if you read the magazine … before", and also describes POLICEMAN SEES ARTICLE as "If you switch the cover … to the android topic and forgot to change it back". GamerGuides: "If you forgot to switch the magazine article over from the android cover". Two things to check: is the ad showing when Kara never reads the magazine? Can she then hide it at all?
6. **Adam's two conversations.** TALK TO ADAM TO LOWER TENSION (N26) and REASSURED ADAM (N39): does either answer (especially THREATEN, or not talking at all) change Adam's stammer ("The… The androids, they…") or the suspicion meter?
7. **ALICE vs NOBODY.** IGN recommends telling the officer about Alice for the clean ending. PowerPyx's QUESTIONS ADAM note says "be honest". Yet the chart's node is LIE ABOUT ALICE. Does lying raise suspicion only when they are upstairs (the "I forgot… my daughter" backtrack), or always?
8. **Does the laundry door left open have its own evidence node?** The chart has SHUT THE DOOR OF LAUNDRY ROOM but no matching "policeman sees" event. Does leaving it open lead straight to the androids being found?
9. **Coffee.** Is MADE COFFEE a suspicion reducer, or just flavour? PowerPyx's suspicious recipe avoids it.
10. **Alice's secret.** Confirm the fireplace CHECK ON ALICE (and INSIST / LET IT GO) only appears after LET ALICE SEE MARY. The wiki's "if Let Alice See Mary above" is the only source. PowerPyx lists CHECK ON ALICE with no condition.
11. **Unused bedtime question.** The transcript marks the fourth bedtime group (REASSURE / PROTECT / BRAVE, about the Jerrys) as unused. Confirm it never appears.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter link)
- https://www.powerpyx.com/detroit-become-human-midnight-train-walkthrough-100/ (walkthrough text: node conditions, "roughly 50 seconds", "roughly one minute", the DOG / WASHING MACHINE recipes, the kitchen curtain, magazine gate)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-flowchart-100.jpg (100% overview: structure, edges, the three ending tiles, PowerPyx's last path)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-2.jpg (legible: ARRIVE AT ROSE'S PLACE, MEET ROSE AND ADAM OUTSIDE, LUTHER AND ALICE JOIN KARA, ENTER THE HOUSE, CHECK ON ALICE)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-3.jpg (legible: INSIDE THE HOUSE through ROSE AND ADAM ARGUE; LET / PREVENT ALICE SEEING MARY group)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-4.jpg (legible: ROSE LEAVES TO FIND HELP, EXPLORE THE HOUSE nodes, ADAM RETURNS, TALK TO ADAM TO LOWER TENSION, COP AT THE DOOR)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-5.jpg (legible: FIND AND HIDE EVIDENCE OF DEVIANTS, the hiding-place group and the curtain group)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-6.jpg (legible: ADAM PANICS, REASSURED ADAM, OPEN THE DOOR, POLICEMAN INSISTS…, MANAGE THE POLICEMAN nodes, SUSPICIOUS / FOOLED group)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-7.jpg (legible: outcome group, COP FINDS ANDROIDS IN THE LAUNDRY ROOM, the three endings with padlock icons)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-midnight-train-endings.jpg (legible ending tiles and icons)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Midnight_Train&prop=wikitext&format=json (chapter page, a stub: infobox, Flowchart list with impact icons, Relationship Changes, Notes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (Alice and Luther kiss-goodnight and officer-left increases)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (no Midnight Train entry)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor only)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (#9 World War Three and the Treat Yourself! ad located in Midnight Train)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=World_War_Three&prop=wikitext&format=json (article text, location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Treat_Yourself!&prop=wikitext&format=json (ad text; "raise the suspicion meter")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Rose_Chapman&prop=wikitext&format=json (biography, brother in Ontario, border restroom, Adam hostile if Luther killed the policeman)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Adam_Chapman&prop=wikitext&format=json (nervousness raising suspicion; border lines)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Rose's_Farm&prop=wikitext&format=json (location, Adam chopping wood, laundry-room androids)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Police_Officer_0617&prop=wikitext&format=json (pantry discovery, how each death happens, "say it is nothing or doesn't respond in time")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Andy&prop=wikitext&format=json and https://detroit-become-human.fandom.com/api.php?action=parse&page=Mary&prop=wikitext&format=json (laundry-room androids; Andy at the river)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json (Midnight Train summary, how the group heard of Rose, Crossroads attempt to tell Kara)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (bedtime, secret dialogue, hiding places, later Rose role)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (chapter summary, "too suspicious of Kara and Adam's behavior", CONFESS quote)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json (endings; Luther always joins in the released game)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json (Luther-dependent checkpoints and raid branches)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json (Rose and Adam at the terminal, border and river; Luther-dependent endings)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Rosanna_Cartland&prop=wikitext&format=json and https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json (KNC anchor appears in Midnight Train; E3 trailer note)
- https://github.com/detroitbecometext/detroitbecometext.github.io : `src/app/chapters/components/chapter-contents/25-midnight-train-chapter-content/midnight-train-chapter-content.component.html`, `30.1-crossroads-kara-…`, `32.1-kara-leaving-detroit-…` and `public/i18n/en.json`, fetched from raw.githubusercontent.com (master). This is the fan transcript linked from the wiki (https://detroitbecometext.github.io/chapters/25). It gave every dialogue choice, the relation tags under KISS GOODNIGHT and "Policeman is fooled", the officer's question order, the noise answers, the unused content, Rose's Crossroads lines and Adam's border lines.
- https://www.ign.com/wikis/detroit-become-human/Midnight_Train (conflict check: suspicion level is shown on screen, door time limit, "say yes" about Alice, TIRED, WASHING MACHINE, leaving evidence out "without the police officer really caring too much")
- https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/chapter-24-midnight-train (conflict check: "50 second timer", "suspicion meter", blue blood "under the stairs", DOG vs WASHING MACHINE, hiding places need replays)
