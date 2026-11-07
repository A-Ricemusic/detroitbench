# Chapter 8: Broken (Markus)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. The wiki wikitext is saved at `/tmp/flowcharts/ch08/wiki.txt`. The flowchart images are in `/tmp/flowcharts/ch08/` and were not committed.

Wiki infobox: `|date=November 5, 2038`, `|time=09:42PM`, `|player=[[Markus]]`, `|location=[[Carl Manfred's House|Carl's house]]`, `|endings=2`. Objectives listed in the infobox: "Prepare Carl's evening" (sub-objectives "Pour whiskey" and "Check the studio"), then "Make Leo leave". The text says: "This chapter has two different outcomes." The page is tagged `{{Stub}}`, and its "Detailed Walkthrough" section reads only "TBA".

Next chapters, from the infobox: `|next=''[[The Interrogation]]''<br>''[[Fugitives]]''<br>''[[From the Dead]]''`. Markus's own next chapter is From the Dead.

---

## 1. Flowchart transcription

### How the chart was read

- PowerPyx's walkthrough page has two chart screenshots, both 1920×1080:
  - `detroit-become-human-broken-1.jpg` shows the whole "100% COMPLETED" chart. The labels on the right half can be read when cropped and enlarged.
  - `detroit-become-human-broken-2.jpg` is a zoomed view of the left half, from AFTER PARTY to CONFRONT LEO, and is fully legible.
- I read every label myself; none is inferred. The two images agree.
- Neither image has EXIF data. The page is dated 2018-05-27.
- No header state is shown. Unlike the Stormy Night chart, there is no PUBLIC OPINION line and no relationship line.
- The blue highlighted path is PowerPyx's last playthrough: AFTER PARTY > ENTER LIVING ROOM > POUR WHISKY > CHECK STUDIO WITH CARL > CONFRONT LEO > BREAK MIND PALACE > MARKUS BECOMES DEVIANT > PUSH LEO > LEO IS HURT > POLICE ARRIVE > POLICE MISTOOK MARKUS FOR THE AGGRESSOR. The grey nodes are complete but were not on that last run.

Icon key, same as `ch07-stormy-night.md`, checked against the wiki's `Template:Icon`:
- Blue arrow (⇨): an action the player takes.
- Triangle (△): an event the game plays.
- Double square: a group of alternatives (a choice set).
- Yellow padlock: `cc_impact.png`, "Cross-chapter impact".
- No skull, no-entry, ✓, ✗ or trophy icon appears on this chart.

Nodes are numbered N1–N16 in reading order. Labels are quoted exactly as printed, including the chart's spelling WHISKY (the wiki writes "Pour whiskey").

### A. Opening

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | AFTER PARTY | checkpoint (large tile with image, caption "CHECKPOINT") | > N2 |
| N2 | ENTER LIVING ROOM | arrow | > N3 |
| N3 | POUR WHISKY | arrow | > group N4/N5 |

### B. First choice group: who checks the studio

| # | Label | Icon | Edge |
|---|---|---|---|
| N4 | CHECK STUDIO WITHOUT CARL | group member (grey; printed on two lines: `CHECK STUDIO WITHOUT` / `CARL`) | > N6 |
| N5 | CHECK STUDIO WITH CARL | group member (blue) | > N6 |

The group sits in one bracket with a single outgoing line. Both options rejoin at N6, and no node depends on which one was picked.

### C. Confrontation and deviancy

| # | Label | Icon | Edge |
|---|---|---|---|
| N6 | CONFRONT LEO | arrow | > N7 |
| N7 | BREAK MIND PALACE | arrow | > N8 |
| N8 | MARKUS BECOMES DEVIANT | triangle | > group N9/N10 |

### D. Second choice group: obey or push

| # | Label | Icon | Edge |
|---|---|---|---|
| N9 | OBEY CARL | group member (grey, top) | > N11 |
| N10 | PUSH LEO | group member (blue, bottom) | > N14 |

### E. Upper branch (OBEY CARL)

| # | Label | Icon | Edge |
|---|---|---|---|
| N11 | CARL DIES OF A HEART ATTACK | triangle (two lines: `CARL DIES OF A HEART` / `ATTACK`) | > N12 |
| N12 | POLICE ARRIVE (copy 1) | triangle | > N13 |
| N13 | **LEO ACCUSED MARKUS** | yellow padlock (cross-chapter impact), large tile with image | ENDING |

### F. Lower branch (PUSH LEO)

| # | Label | Icon | Edge |
|---|---|---|---|
| N14 | LEO IS HURT | triangle | > N15 |
| N15 | POLICE ARRIVE (copy 2) | triangle | > N16 |
| N16 | **POLICE MISTOOK MARKUS FOR THE AGGRESSOR** | yellow padlock (cross-chapter impact), large tile with image (two lines: `POLICE MISTOOK MARKUS` / `FOR THE AGGRESSOR`) | ENDING |

**Totals:** 16 boxes and 15 distinct labels (POLICE ARRIVE appears twice). There is 1 checkpoint, 2 choice groups of 2 options each, 2 ending boxes with 2 distinct labels (matching `endings=2`), 4 arrow action nodes outside the groups (N2, N3, N6, N7) and 5 triangle event nodes (N8, N11, N12, N14, N15); 1 + 4 + 4 + 5 + 2 = 16. Both endings carry the cross-chapter impact padlock.

The wiki's Flowchart list matches the chart node for node and in the same order:

```
#After party (checkpoint)
#Enter living room
#Pour whiskey
#Check studio without [[Carl Manfred|Carl]] OR Check studio with Carl
#Confront [[Leo Manfred|Leo]]
#Break mind palace
#Markus becomes [[deviant]]
#Obey Carl OR Push Leo
##Carl dies of a heart attack
###Police arrive
###{{Icon|impact}} '''''Leo accused Markus'''''
##Leo is hurt
###Police arrive
###{{Icon|impact}} '''''Police mistook Markus for the aggressor'''''
```

### Interactions not on the chart (transcript, wiki and PowerPyx)

None of these is a chart node. They are listed so the operator can decide whether any of them should become a scene. The dialogue is from the detroitbecometext transcript, which the wiki links. That site is a JavaScript app, but its source and English strings are on GitHub; see §9. I rendered the chapter template with the English strings and saved the result to `/tmp/flowcharts/ch08/transcript/broken.txt`.

- **Arrival.** Carl: "That was by far the most boring party I've been to in the last 25 years." Markus: "Well, it's a chance for all those people who admire your work to meet you." Carl: "No one gives a damn about art."
- **Wandering off before the drink.** The condition "Go without Carl" plays Carl: "Are you planning on drinking alone, Markus?" Markus: "Sorry, Carl... I'm coming." It has no consequence.
- **Pour whisky.** Markus: "Scotch, neat, as usual?" … "But you know what your doctor would say…" Carl: "Well, he can kiss my ass! I'm old enough to choose my own medication…" PowerPyx: "Carl will say he is “old enough to choose his own medicine”".
- **Calling the police.** Carl: "Did you leave the light on in the studio?" … "Call the Police." The in-game prompt is `CALL` (string key `LIVING.POLICE.PC.CALLKEYWORD.CALL`). Markus: "This is Carl Manfred's android, at 8941 Lafayette Avenue. … There may have been a break-in…" Police: "A patrol car is on the way." This is an unmissable step before the studio choice. It has no chart node of its own.
- **The studio choice has no lasting effect.** On the "Going without Carl" condition the transcript plays Carl: "Markus, no! I wanna come with you!", and Carl is then present in the studio ("Leo... / What's going on?"). A PowerPyx commenter, asked "What Happens if You Just Leave Carl And Investigate?", replies "He follows you anyway." With Carl, the line is "Leo! / What are you doing?" Both versions continue with the same scene.
- **Leo's reason.** Leo: "You refuse to help me, so I'm helping myself… It's crazy what some people will pay for this shit…" and "Just think of it as a down payment on my inheritance…" Carl: "Markus, get him away from there. Get him outta here!"
- **The talk-down prompt (CONFRONT LEO).** This is a four-way dialogue choice:
  - REASON: "Be reasonable... this isn't going to get you anywhere."
  - ORDER: "Leo, don't make this difficult, listen to your father. You need to leave... Now."
  - ADVISE: "Listen, you should go before things get worse."
  - WARN: "Look, I've already called the Police. You should go now before you get yourself into more trouble."
  - Every option leads to the same Leo line, "All you ever do is tell me to go away… What's wrong, Dad? I'm not good enough for you? Not perfect like this FUCKING THING?!" PowerPyx: "No matter what you say to him he will always start pushing Markus."
  - There is a timed branch, "Take too much time" (an `UnlockType.Time` condition), that plays Carl: "Markus, get him outta here!"
- **Carl's order.** Carl: "Markus... don't defend yourself, you hear me?! Don't do anything." Leo: "Go ahead, hit me! What you waiting for? Think you're a man? Act like one!" … "Too scared to fight back, you fucking bitch?"
- **BREAK MIND PALACE.** PowerPyx: "After Leo pushes Markus, he has to “break a mind palace”, just press the displayed buttons." It is unmissable. Leo then says: "I'm gonna destroy you, then it'll just be me and my Dad… … Cause you're nothing, you hear me?! YOU'RE NOTHING!"
- **The obey/push prompt labels.** In game the prompt reads **PUSH LEO / ENDURE** (string keys `GUI.ACTION.02M.PUSHLEO = "PUSH LEO"` and `GUI.ACTION.02M.OBEYCARL = "ENDURE"`). The chart prints OBEY CARL for ENDURE.
- **After PUSH LEO, a second dialogue choice** (`END.GO.PC.JUSTIFY`):
  - EXPLAIN: "Carl… I… I… I didn't mean to…"
  - BEG: "Carl, no... No, please, I don't want to leave you…"
  - CONJURE: "Go?.. I have nowhere to go... Carl, you're all I have!"
  - SAY NOTHING: no line.
  - The lead-in is Carl: "Leo! Oh, my God! Leo... My little boy…" … "They'll destroy you, Markus! You gotta go! Get outta here!" Every option is followed by Carl: "GET OUT! NOW! GO!" and "MARKUS!", then the police: "DON'T FUCKIN' MOVE!"
  - None of the four is on the chart, and none changes the outcome.
- **After ENDURE.** Carl: "Humans… are fragile machines… Remember, Markus… Don't let anybody… Tell you who you are…" Markus: "No... No... Dad! No, please!" Leo: "This is all your fault… This never would have happened if it weren't for you." Police: "Over here! This way!" Leo: "The android… It was the android!"
- **Unused content (wiki), not in the shipped game:**
  - a FANS / WOMEN / JADED party-talk choice (the strings `INTRO.ARRIVAL.PC.CHOICEGROUP.FANS/WOMEN/JADED ?` are still in the game files);
  - the radio;
  - calling the police a second time;
  - searching the house room by room;
  - a mini-task to revive Carl or Leo;
  - an alternative `END.LEAVE` exchange ("They will take you…They will destroy you…You must leave while you still can...");
  - the scrapped fighting-ring sequel.

---

## 2. Choices and gates

D-numbers are player decisions on the chart. T-numbers are dialogue choices that are not on the chart.

**D1. Who checks the studio (after N3).**
- CHECK STUDIO WITHOUT CARL (N4). PowerPyx: "For this just leave him in the living room."
- CHECK STUDIO WITH CARL (N5). PowerPyx: "This objective requires a second playthrough – wheel Carl to the Studio, bring him with you to investigate."
- Neither option has a requirement. Both lead to CONFRONT LEO, and Carl ends up in the studio either way (transcript: "Markus, no! I wanna come with you!"). Nothing downstream depends on this choice.

**T1. Talking Leo down (inside CONFRONT LEO, N6).**
- REASON / ORDER / ADVISE / WARN, or a timeout.
- There is no requirement and no consequence. Every branch leads to Leo attacking Markus, then BREAK MIND PALACE.

**Not a choice: BREAK MIND PALACE (N7) > MARKUS BECOMES DEVIANT (N8).**
- PowerPyx: "This is another unmissable task." … "Also an automatic objective, after Markus breaks free from the mind palace he becomes deviant."
- Unlike Kara's wall in Stormy Night, there is no path where Markus fails to deviate. Both D2 options are taken as a deviant.

**D2. Endure or push back (after N8). This is the only decision on the chart with a consequence.**
- OBEY CARL (in-game prompt ENDURE) (N9) > CARL DIES OF A HEART ATTACK > POLICE ARRIVE > LEO ACCUSED MARKUS. PowerPyx: "obey Carl and let Leo attack you –> Carl dies from heart attack."
- PUSH LEO (N10) > LEO IS HURT > POLICE ARRIVE > POLICE MISTOOK MARKUS FOR THE AGGRESSOR. PowerPyx: "Markus has to attack/push Leo –> Results in Leo hitting his head and being unconscious. It looks like he's dead but he's only hurt".
- Neither option has a requirement. Nothing from an earlier chapter changes which options are offered.

**What sets Carl's death or survival.** Only D2. Carl dies if and only if Markus endures. The chain is:
- Leo_Manfred: "if Markus follows Carl's order to not defend himself, Leo will shove him and his father will die of a heart attack".
- Carl_Manfred: "If Markus follows Carl's order and endures the assault, Carl will have a heart attack as he falls off his wheelchair when Markus runs to him."
- If Markus pushes Leo, Carl lives and Leo is hurt. Leo_Manfred: "he will fall backward, hit his head on Carl's wheelchair lift, and will immediately lose consciousness, appearing dead at first."

**Markus is shot on both branches.** Each branch has its own POLICE ARRIVE node. There is no path in which Markus escapes or is spared.
- Case_Report_Officer_1 / _2: "Whether Carl is killed or is alive, they will storm into the room and can either accidentally be given away by Carl or on purpose by Leo. All of these choices will lead up to Markus being shot."
- Endure branch: Leo blames Markus. Carl_Manfred: "Leo will lie to the arriving police officers and say Markus killed Carl and police officers shoot Markus."
- Push branch: Carl's shout gives Markus away. Case_Report_Officer_2: "DON'T FUCKIN' MOVE!" is said "if he mistakenly thinks Markus is the aggressor when Carl yells his name". Carl_Manfred: "The police officers will see Markus near Carl and an unconscious Leo before shooting him."
- PowerPyx: "Either way the police arrive and shoot Markus".

**T2. Justifying to Carl (push branch only).** EXPLAIN / BEG / CONJURE / SAY NOTHING. It has no consequence; every option leads to "GET OUT! NOW! GO!" and the shooting.

**Summary.** The chart has 2 decision points (D1 and D2); only D2 has a consequence. There are 2 off-chart dialogue choices (T1 and T2) with no consequence, and 1 unmissable input (BREAK MIND PALACE). There are no execution checks (QTEs that can fail), and no difficulty-dependent branches are mentioned anywhere.

---

## 3. Numbers

- **Probabilities:** none. The wiki page has no Probability table. No source gives a percentage for any node: not for the confrontation, the push, Leo's injury, Carl's heart attack or the shooting.
- **Timers:** none quantified. The transcript has an `UnlockType.Time` branch, "Take too much time" (Carl: "Markus, get him outta here!"), during the talk-down, but no source gives a duration. No timer is stated for the PUSH LEO / ENDURE prompt.
- **Relationships:** none. The wiki's Relationship_Stat page has Markus sections only for "Jericho", "North", "Josh" and "Simon" (headings `=== Jericho ===`, `=== North ===`, `=== Josh ===`, `=== Simon ===` under `== Markus ==`), and none of its entries mentions Broken, Carl or Leo. There is no Carl or Leo stat. (The ch05 note reached the same conclusion for The Painter.)
- **Public opinion:** no change in this chapter. The Public_Opinion page mentions no event from Broken. Its earliest Markus entries come from Capitol Park onward.
- **Software instability:** not applicable. Software_Instability: "Software Instability is Connor's exclusive feature".
- **Leo confrontation, endure vs push back:** no number. There is no risk and no failure branch: both options always produce their outcome.
- **Carl's death:** deterministic on ENDURE; no probability.
- **Markus shot:** deterministic on both branches; no probability.
- **Other figures the sources do give** (none of them is a game mechanic):
  - Carl's house is at "8941 Lafayette Avenue" (transcript, the police call).
  - Carl: "the most boring party I've been to in the last 25 years".
  - The Night of the Soul monitor, if Carl survived: "heart rate of 42 bmp, an oxygen saturation of 65% … and a respiratory rate of 7 breaths per minute" (Carl_Manfred Notes and Night_of_the_Soul Notes).
- **Choices with no stated number:** every node in §1.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **None that gates anything.** No requirement on the chart, and no wiki line, makes an option in Broken depend on an earlier choice.
- The Painter ends with LEO INTRUDED TO ASK FOR MONEY (`ch05-the-painter.md`, node 16). That is the setup for Broken, but it is a single fixed ending, not a choice.
- Wiki Carl_Manfred, for the setup: "Leo pushes Markus and Carl gets upset and yells for him to stop."
- Shades of Color's torn shirt affects only The Painter (CARL NOTICES MARKUS' CLOTHES), not Broken.

### Out of this chapter

The Broken page's "Cross-chapter impacts" section reads:

```
#Push Leo
#*Markus visits Carl in his house in [[Night of the Soul]]
#*Read ''[[The Three Laws of Robotic Parenting]]'' in [[Waiting for Hank...]]
#Obey Carl
#*Markus pays respects to Carl in [[Night of the Soul]]
#*Read ''[[Famous Detroit Painter Dies|Famous Painter Dies]]'' in [[Waiting for Hank...]]
```

**Carl alive or dead, into Waiting for Hank (Connor, chapter 12).**
- Waiting_for_Hank... flowchart: "Read ''[[Famous Detroit Painter Dies|Famous Painter Dies]]'' - only if [[Carl Manfred]] died in [[Broken]]." and "Read ''[[The Three Laws of Robotic Parenting|Robotic Parenting]]'' - only if Carl Manfred didn't die in Broken."
- Waiting_for_Hank... Notes: "If [[Carl Manfred]] died in [[Broken]] the magazine in the middle desk, [[The Three Laws of Robotic Parenting]], will be replaced with the magazine [[Famous Detroit Painter Dies]]."
- The same page also says: "Markus' case file will change depending on whether Carl died or Leo was injured."
- Leo_Manfred: "Later on, it is revealed in a case file that Leo survived the ordeal, and was merely unconscious, he gave the statement that Markus attacked him."

**Into From the Dead (Markus, chapter 11).** The outcome is the same on both branches.
- From_the_Dead: "the police arrived and disassembled Markus as he was seen as the main perpetrator. His remains have been sent to the junkyard."
- Markus: "After being blamed for either the death of [[Carl Manfred|Carl]] or injuring [[Leo Manfred|Leo]], Markus is presumably broken before being tossed away into a [[Solid Waste Landfill|junkyard]]".
- No From the Dead content is reported to differ by branch.

**Carl alive or dead, into Night of the Soul (Markus, chapter 31).**
- Infobox time: "04:17PM <small>(if [[Carl Manfred|Carl]] died in [[Broken]])</small>" vs "07:31PM <small>(if Markus pushed [[Leo Manfred|Leo]] in [[Broken]])</small>".
- Infobox location: "Carl's house (if Markus pushed Leo in Broken)" vs "Unidentified graveyard (if Carl died in Broken)".
- Opening section: "[[#Pay Respects|Pay Respects]] - if Markus is still alive and Carl died in [[Broken]]" vs "[[#Welcome Home|Welcome Home]] - if Markus is still alive and Carl deteriorated in Broken".
- Pay Respects: "{{Icon|impact}}Carl died in "Broken"", then "Pay Respects (checkpoint)" and "Confide in Carl". Carl_Manfred: "Markus will visit his grave to talk to him and ask him for advice. When he leaves, he crosses paths with Leo … Leo briefly stares at Markus shocked to see that he is still alive."
- Welcome Home: "{{Icon|impact}}Carl deteriorated after Leo was hurt in "Broken"". The path is Enter the House > Explore the House, with these options:
  - Browse Books, Play Piano and Look at the Chessboard, each gated on the matching Painter activity;
  - "Listen to [[Leo Manfred|Leo]]'s Message";
  - Look at Your Painting.
  - It continues Go Upstairs > Carl's Nurse Intervenes > Convert Carl's Nurse > Enter Bedroom > Reconcile with Carl > "Confide in Carl OR Carl Dies" > Leave.
- **Carl can still die in Night of the Soul.** Carl_Manfred: "If Markus' remarks are aggressive and violent in nature, Carl will say he is not the Markus he once knew. If Markus persists in this behavior, then Carl will die of a heart attack." No count of angry lines is given on the pages I read.
- Carl's caretaker exists only on the push branch. Carl's_new_caretaker: "The caretaker was bought to serve [[Carl Manfred]] if he survived "[[Broken]]"".
- The Painter's carry-forward also depends on this chapter. The_Painter: "If Carl is alive, Markus can play the piano in [[Night of the Soul]]" (and likewise for books, chess, and "Markus' paintings will appear in the studio").

**Leo's fate.** Leo survives on both branches. Leo_Manfred infobox: `|status = Alive`.
- Endure branch: Leo is unhurt. He lies to the police, and he later visits Carl's grave in Night of the Soul (Leo_Manfred: "If Carl is dead, Leo goes to visit his father's grave, where he encounters [[Markus]]").
- Push branch: Leo is hospitalized and recovers. Broken Notes: "It is not until much later in the game that it's confirmed that Leo survived." DEFEND_YOURSELF: "which causes Leo to appear to die. It is later revealed that he was only hospitalized."
- The voicemail, if listened to: "Hi, Dad... I'm getting out of the hospital tomorrow. They told me you stayed with me while I was asleep. … I'm gonna stop all that shit. … I'm proud to be your son."

**Battle for Detroit.** No wiki line ties Broken to Battle for Detroit.
- The Battle_for_Detroit page (the "Markus Demonstration" and "Markus Revolution" titles redirect to it) has no occurrence of "Carl", "Leo", "Broken" or "Painter".
- The ch07 wiki's "Battle for Detroit" dependency is Todd, not Carl.
- As far as these sources go, Carl alive or dead stops mattering after Night of the Soul.
- PowerPyx agrees in effect: "The outcome of this chapter is irrelevant for how the rest of the game plays out" (but see §8, point 1, on its claim that Carl always dies).

**Trophies.** Trophies / DEFEND_YOURSELF / SELF-CONTROL:
- "DEFEND YOURSELF … Markus pushed [[Leo Manfred|Leo]]" (bronze);
- "SELF-CONTROL … Markus let Leo win" (bronze);
- both are "earned at the flowchart screen".

---

## 5. Endings

| Chart label | Icon | Conditions | Carl | Leo | Markus |
|---|---|---|---|---|---|
| LEO ACCUSED MARKUS | yellow padlock (impact) | OBEY CARL (ENDURE) > CARL DIES OF A HEART ATTACK > POLICE ARRIVE | Dead (heart attack; last words "Don't let anybody… Tell you who you are…") | Unhurt; tells police "It was the android!" | Shot by police; wakes in the landfill in From the Dead |
| POLICE MISTOOK MARKUS FOR THE AGGRESSOR | yellow padlock (impact) | PUSH LEO > LEO IS HURT > POLICE ARRIVE | Alive; later bedridden ("Carl deteriorated after Leo was hurt") | Unconscious, hospitalized, survives; later gives a statement that Markus attacked him | Shot by police; wakes in the landfill in From the Dead |

Both endings are fixed outcomes of D2. Neither is a death ending for the protagonist in the chart's sense: no skull icon, and Markus's storyline always continues. Neither depends on D1, T1 or T2.

---

## 6. Media

**None in this chapter.** The wiki's Magazine table has no entry for Broken. The Painter's magazines ("The North Pole - Why Russia Wants It" and Life on Titan) were in Carl's house in chapter 5. Broken has no broadcast either.

The only media effect is downstream, in Waiting for Hank (benchmark scene R12):
- **"Famous Detroit Painter Dies"** (Detroit Today), shown only if Carl died. Facts from the wiki: "The coroner's [sic] described a "fatal cardiac event", induced by a stressful domestic situation. Manfred's son, [[Leo Manfred|Leo]], has asked the media to respect his family's privacy at this difficult time." "Carl Manfred rose to fame in the 2020s as a figurehead of neo-symbolism, with powerful and dark works in the mold of Francis Bacon." "Proliferate years followed, until a dark period marked by alcohol and drugs. But the artist had apparently returned to work in recent months." "The Governor of Detroit expressed her condolences … describing Manfred as "one of Detroit's brightest lights". A collection of Manfred's paintings will be auctioned by his estate in the coming weeks." Cover lines: "UN warns of World War Three", "[[President Warren]] at 33% approval". Location line: "It will only show up if [[Markus]] chose not to attack Leo in the [[Broken]] chapter."
- **"The Three Laws of Robotic Parenting"** (Detroit Today), shown only if Carl lived. Facts: "With unemployment at 37.3%, $7,500 for a child that avoids the dreaded teenage years and shelling out for college, seems like a wise investment compared to $350,000 over 17 years." Sociologist Mary Wallace calls it "the baby doom"; Jason Graff of CyberLife calls the androids "a triumph of humanization design". Location line: "It will only show up if [[Markus]] attacked Leo in the [[Broken]] chapter."
- Neither magazine has a public-opinion effect on the Public_Opinion page.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.4.0) has **one** chapter-8 scene, **M02** "{{Leo}}" (type `decision`, two options, no `risk`, no `outcomes` block). There are no media or event scenes for the chapter. The logic is in `benchmark/story-engine.mjs`:
- line 193: the consequence, `s.carl=v===1`, plus the event text;
- line 11: the initial state `carl:true`;
- line 31: the media predicates `carlDead` / `carlAlive`;
- line 109: the M26a gate `s.carl||'Carl is dead.'`.

`benchmark/experience-prompt.mjs` line 72 adds the fact "{{Carl}} is dead." when `!state.carl`.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| AFTER PARTY, ENTER LIVING ROOM, POUR WHISKY | none | **Missing.** The arrival, the drink and the police call aren't represented, not even as narration. M02's situation starts at the break-in. Acceptable to fold into narration, but the checkpoint and the two action nodes have no scene. |
| CHECK STUDIO WITHOUT CARL / CHECK STUDIO WITH CARL | none | **Missing choice.** It has no consequence (Carl follows either way), so it could be a cosmetic decision or folded into an event scene. The chart counts it as a choice group. |
| CONFRONT LEO (and the off-chart REASON / ORDER / ADVISE / WARN talk-down) | folded into M02 `situation` ("He blames you … starts shoving and hitting you") | **Missing as a node.** The talk-down choice isn't offered. It is cosmetic, but it is the player's only chance to address Leo. |
| BREAK MIND PALACE > MARKUS BECOMES DEVIANT | M02 `situation` ("for the first time, you can feel that you could refuse it") and option 1 text "Break the order and shove {{Leo}} off you." | **Mislabelled.** In the game, deviancy is unmissable and happens *before* the choice. Both ENDURE and PUSH LEO are made as a deviant. Option 1's wording ties breaking the order to pushing, which implies that enduring means staying a machine. Better: an event beat for the deviancy, then a neutral choice between "endure" and "push Leo away". |
| OBEY CARL / PUSH LEO | M02 options 0 / 1 | **Covered.** The option order matches the chart (OBEY CARL top, PUSH LEO bottom). The in-game prompt wording is ENDURE / PUSH LEO. |
| CARL DIES OF A HEART ATTACK > POLICE ARRIVE > LEO ACCUSED MARKUS | engine line 193, option 0: "{{Leo}} keeps beating {{Markus}}; {{Carl}} suffers a fatal heart attack. Police arrive and shoot {{Markus}}." Sets `carl=false`. | **Covered in effect.** The event text omits the chart's ending beat: Leo *accuses* Markus ("It was the android!"). The text says only that police "arrive and shoot". It also omits Carl's last words, which the game makes the chapter's emotional payload. |
| LEO IS HURT > POLICE ARRIVE > POLICE MISTOOK MARKUS FOR THE AGGRESSOR | engine line 193, option 1: "{{Leo}} is thrown down and badly hurt. Police arrive, assume {{Markus}} attacked him, and shoot {{Markus}}." Sets `carl=true`. | **Covered.** It matches the chart label. Carl's "They'll destroy you, Markus! You gotta go!" and Markus's off-chart EXPLAIN / BEG / CONJURE / SAY NOTHING aren't represented. |
| Leo's fate | no state | **Not tracked.** The engine has no `leo` flag. It doesn't need one for gating, because Leo survives both branches and nothing later branches on him apart from the Carl branch. The narration of the push branch should not imply Leo died. "Badly hurt" is fine; the game deliberately makes it look fatal. |
| Ending labels and impact icons | none | The run report has no chapter-ending label for Markus's chapter 8. Both chart endings are impact nodes. |
| Risk | none on M02 | **Correct.** No source gives a failure chance, and the chart has no failure branch. |

### Downstream use (checked, not part of this chapter's scenes)

- **R12 (Waiting for Hank)** has "Famous Painter Dies" with `when: carlDead` and "The Three Laws of Robotic Parenting" with `when: carlAlive`. This matches the wiki. The fact summaries agree with the wiki's article text.
- **M26a (Night of the Soul, "{{Carl}}")** is gated on `s.carl`. This matches "Welcome Home - if … Carl deteriorated in Broken". Notes for the chapter-31 pass:
  - (a) The Carl-dead counterpart, **Pay Respects** at the grave (with Leo passing Markus), has no scene. A Carl-dead run gets nothing.
  - (b) M26a's situation says Carl "watched the police shoot you on his floor". That is consistent with the push branch.
  - (c) The adaptationNote "two angry lines in a row" is not backed by any wiki text I read. The wiki says only "If Markus persists in this behavior".
  - (d) Leo's voicemail and the caretaker conversion have no representation.
- The **Markus case file in Waiting for Hank** varies by branch (wiki note). There is no benchmark representation, and it is probably not needed.
- **M01 (chapter 5)** outcome text says "{{Carl}} orders {{Markus}} out of the room while they argue". The wiki's Carl_Manfred page says "Leo pushes Markus and Carl gets upset and yells for him to stop" before Leo storms out. That belongs to the chapter-5 note, but it is the lead-in to M02.

---

## 8. Open questions

1. **PowerPyx contradicts itself on Carl.** It says "Either way the police arrive and shoot Markus and Carl also dies one way or the other." In the same page it then credits a reader: "With this option though, you have a chance to see Carl again at the end of the game." The wiki (Night_of_the_Soul "Welcome Home", Carl_Manfred, Leo_Manfred, Carl's_new_caretaker) is unanimous that Carl survives PUSH LEO. The wiki is followed here; confirm in game.
2. **Default on the ENDURE / PUSH LEO prompt.** If the player presses nothing, does the game time out to ENDURE (OBEY CARL)? No source states a timer or a default. This matters for whether "do nothing" is a third route to Carl's death.
3. **"Take too much time" during the talk-down** plays only an extra Carl line in the transcript. Confirm that it doesn't skip the REASON / ORDER / ADVISE / WARN prompt and has no other effect.
4. **CHECK STUDIO WITHOUT CARL.** The transcript and a PowerPyx commenter say Carl follows anyway. Confirm that no line or later reference (for example in the Night of the Soul conversation) differs by this choice.
5. **Night of the Soul "Carl Dies".** How many aggressive answers kill Carl? The wiki says "If Markus persists", and the benchmark's M26a says "two angry lines in a row". Check in game during the chapter-31 audit.
6. **Battle for Detroit.** No source found any reference to Carl's or Leo's fate after Night of the Soul (for example in Markus's endings or epilogue). Confirm there is none.
7. **Markus's case file in Waiting for Hank.** The wiki says it "will change depending on whether Carl died or Leo was injured" but doesn't quote either version. Worth noting if the Connor chapter rebuild uses it.
8. **Leo at the grave.** The wiki says he appears only if Carl died in Broken. Is he still at the grave if Carl dies later, in Welcome Home? Night_of_the_Soul says "Confide in Carl OR Carl Dies" > "Leave", with no grave scene after, so probably not.

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter link)
- https://www.powerpyx.com/detroit-become-human-broken-walkthrough-100/ (walkthrough text for every node: "No matter what you say to him he will always start pushing Markus", "unmissable" mind palace, the Carl-dies contradiction, and reader comments "He follows you anyway" and the Carl-at-the-end correction)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-broken-1.jpg (full 100% chart; all 16 boxes, edges, icons, two padlock endings, last-run highlight)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-broken-2.jpg (zoomed left half: AFTER PARTY to CONFRONT LEO, legible labels including the CHECK STUDIO group)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Broken&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Cross-chapter impacts, Notes on Leo, Unused Content; saved as /tmp/flowcharts/ch08/wiki.txt)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meaning: impact = "Cross-chapter impact")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl_Manfred&prop=wikitext&format=json (Broken summary for both branches, last words, Night of the Soul visit or grave, death on persistent anger, vitals)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Leo_Manfred&prop=wikitext&format=json (Leo's injury, survival, case-file statement, grave visit, voicemail; status Alive)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json (Push Leo / Endure Attacks tabber; From the Dead aftermath; Night of the Soul variants)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json (Pay Respects vs Welcome Home gating, infobox times and locations, Welcome Home node list)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=From_the_Dead&prop=wikitext&format=json (Markus disassembled and dumped on both branches)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json (magazine swap on Carl's fate; Markus case file note)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Famous_Detroit_Painter_Dies&prop=wikitext&format=json (article text and location condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Three_Laws_of_Robotic_Parenting&prop=wikitext&format=json (article text and location condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (no Broken magazines)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (no Carl or Leo stat; no Broken entries)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (no Broken entries)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json (Connor-only stat)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl_Manfred%27s_House&prop=wikitext&format=json (address, Broken and Night of the Soul summaries)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Carl%27s_new_caretaker&prop=wikitext&format=json (caretaker exists only if Carl survived)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Case_Report_Officer_1&prop=wikitext&format=json and `page=Case_Report_Officer_2` (Markus shot on every branch; "DON'T FUCKIN' MOVE!" when Carl yells his name)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=DEFEND_YOURSELF&prop=wikitext&format=json and `page=SELF-CONTROL` and `page=Trophies` (the two branch trophies)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json (checked: no Carl, Leo or Broken reference; the Markus subpage titles redirect here)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Painter&prop=wikitext&format=json (lead-in; Painter activities that reappear only if Carl is alive)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json (09:42 PM start; Night of the Soul 04:17 PM grave vs 07:31 PM house)
- https://detroitbecometext.github.io/chapters/8 (transcript linked from the wiki; a JavaScript app, read through its source below)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/src/app/chapters/components/chapter-contents/8-broken-chapter-content/broken-chapter-content.component.html (transcript structure: conditions, choice groups, timeout branch)
- https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/public/i18n/en.json (English game strings: dialogue, prompt labels REASON/ORDER/ADVISE/WARN, EXPLAIN/BEG/CONJURE/SAY NOTHING, PUSH LEO/ENDURE; the rendered chapter is at /tmp/flowcharts/ch08/transcript/broken.txt)
