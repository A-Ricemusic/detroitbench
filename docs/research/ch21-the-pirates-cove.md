# Chapter 21: The Pirates' Cove (Kara)

Research note for rebuilding the chapter's scenes. Sources and their order of authority follow `docs/research/README.md`. Wiki wikitext was saved to `/tmp/flowcharts/ch21/wiki.txt`; related wiki pages are saved as `/tmp/flowcharts/ch21/wikipages/*.txt`. The flowchart images are `/tmp/flowcharts/ch21/pg-1.jpg` to `pg-7.jpg` (upscaled crops of the overview are in `/tmp/flowcharts/ch21/crops/`), and none of them were committed. The wiki page has no detailed walkthrough ("==Detailed Walkthrough== TBA"), so the dialogue comes from the fan transcript that the wiki links (detroitbecometext.github.io, chapter 21). Its source component was fetched from GitHub and its translation keys were resolved against the site's `en.json`. The rendered text is `/tmp/flowcharts/ch21/transcript.txt`, and every string in the chapter's `X0701K` namespace plus the chart labels (`MENU.FLOWCHART.07K.*`) is in `/tmp/flowcharts/ch21/strings.txt`.

Wiki infobox: `|date=November 7, 2038`, `|time=01:02AM`, `|player=[[Kara]]`, `|location=[[Pirates' Cove]]`, `|objectives=*Inspect car engine *Find shelter *Settle for the night *Take care of [[Alice]]`, `|endings=1`. The text says: "This chapter has only one outcome." The chapter comes after The Eden Club and before The Bridge. Kara reaches it only through Zlatko's single non-fatal ending, '''''Luther Joins Kara & Alice''''', so Luther is always present.

**Scope note on the brief.** The brief asks about "the choice to trust" the Jerrys and about Alice being "cold, sick". Neither of those is a player choice or a stated condition in the sources:
- Following the Jerrys to the carousel is forced. Kara objects ("Alice, I don't know if it's a good idea!.."), Luther answers "I don't think you have any choice…", Alice says "Come on, Kara!", and BACK OUTSIDE is a triangle (event) node.
- Alice's cold is the reason the group looks for shelter. Kara says "It's 30°, Alice won't make it!.." and the Alice page says "Due to Alice's sensitivity to temperature, they look for night shelter." No source calls her sick in this chapter. The only physical sign is that she refuses food (ALICE IS NOT HUNGRY).

---

## 1. Flowchart transcription

### How the chart was read

- `pg-1.jpg` (`detroit-become-human-the-pirates-grove-1.jpg`) is PowerPyx's "100% COMPLETED" overview. It is too small to read, so it was used for structure, edges and PowerPyx's last path. The upscaled crops confirm 4 + 3 nodes in THE TAVERN group, and that PowerPyx's last path chose GRAB GUN and PUSH AWAY.
- `pg-2.jpg` to `pg-7.jpg` are legible zooms that run left to right: car and breakdown; fun fair; tavern, bed and poster; bag, story, Luther and the attack groups; the Jerrys and the carousel; the ending.
- The header in `pg-2` reads `PUBLIC OPINION HOSTILE`, `ALICE TRUSTED` and `LUTHER NEUTRAL`. This is PowerPyx's save state, not something the chapter sets. A large pale downward triangle sits beside LUTHER NEUTRAL. It appears to be background shading, but see §8.
- Every box label in the zooms matches a `MENU.FLOWCHART.07K.*` string in the game text, so the labels below are exact. That namespace also has three labels that are **not on the chart**: `LOOK OUTSIDE`, `LOOK AT FROZEN ANDROID` and `SOMETHING LURKING IN THE SHADOW`. It also has the labels of the cut hunter sequence (see "Cut content" below).

Icon key (as in the ch10 note, with `Template:Icon`):
- Arrow (⇨): an action the player takes.
- Speech bubble: a dialogue interaction.
- Triangle (△): an event or consequence the game plays.
- Double square: a group of alternatives (a choice set).
- Large tile with an image: a checkpoint, location or ending.
- **No skull, no-entry, ✓/✗, trophy or yellow padlock (cross-chapter impact) icon appears anywhere on this chart.** The single ending tile has no icon.

Box colours: blue boxes are on PowerPyx's last playthrough. White or grey boxes were discovered on another run. On the 100% chart the grey boxes are LOOK AT ALICE; GRAB STICK FROM FIRE, PROTECT ALICE and PUT OUT FIRE; and FIRE WARNING SHOT, THREATEN and QUESTION.

Boxes are numbered N1–N48 in reading order. Labels are quoted exactly as printed. The chart is a single line with three free-roam hubs and no branches that end the chapter.

### A. Drive and breakdown (`pg-2`)

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N1 | HIGHWAY TO HELP | checkpoint tile with image (car headlights in snow) | > [CAR] |
| — | [CAR] | bracketed hub label (not a box) | frames N2–N4 |
| N2 | WATCH NEWS | arrow | optional |
| N3 | TALK TO LUTHER | speech bubble | optional |
| N4 | LOOK AT ALICE | arrow | optional; grey (not on the last path) |
| N5 | CAR BREAKS DOWN | triangle | from [CAR] > N6 |
| N6 | INVESTIGATE BREAKDOWN | arrow | > N7 |
| N7 | SCAN ENVIRONMENT | arrow | > N8 |

### B. The park (`pg-3`)

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N8 | INSIDE PIRATES' COVE | checkpoint tile with image (park gate) | > [FUN FAIR] |
| — | [FUN FAIR] | bracketed hub label | frames N9–N12 |
| N9 | CHECK BUILDINGS | arrow | optional |
| N10 | EXAMINE FROZEN ANDROID | arrow | optional |
| N11 | SWITCH ON IVAN | arrow | optional |
| N12 | LOOK AT MAP | arrow | optional |
| N13 | CHECK ABANDONED TAVERN | arrow | from [FUN FAIR] > N14 |
| N14 | ENTER TAVERN | arrow | > N15 |

### C. The tavern (`pg-4`)

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N15 | INSIDE TAVERN | checkpoint tile with image | > [THE TAVERN] |
| — | [THE TAVERN] | bracketed hub label | frames N16–N22 |
| N16 | READ "USS IOWA" | arrow | optional (magazine) |
| N17 | LOOK AT RA9 WRITING | arrow | optional; it unlocks the [rA9] topic with Luther (§2 D8) |
| N18 | LOOK AT LEAFLET | arrow | optional |
| N19 | LUTHER STARTS A FIRE | triangle | automatic after a short time |
| N20 | LOOK THROUGH WINDOW | arrow | optional |
| N21 | LOOK AT "PIRATE" | arrow | optional (printed with quotation marks) |
| N22 | READ "ALL-ANDROID BAND" | arrow | optional (magazine) |
| N23 | MAKE BED FOR ALICE | arrow | from [THE TAVERN] > N24 |
| N24 | ALICE LOOKS AT POSTER | triangle | > N25 |
| N25 | TALK TO ALICE | speech bubble | > N26 |
| N26 | ALICE GOES TO BED | triangle | > N27 (optional) and > N32 |

Order within the hub as printed: top READ "USS IOWA", LOOK AT RA9 WRITING, LOOK AT LEAFLET, LUTHER STARTS A FIRE; bottom LOOK THROUGH WINDOW, LOOK AT "PIRATE", READ "ALL-ANDROID BAND".

### D. Night, bag and Luther (`pg-5`)

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N27 | OPEN BAG | arrow | optional; > N28 and > N30 |
| N28 | OFFER COOKIE | arrow | > N29 |
| N29 | ALICE IS NOT HUNGRY | triangle | dead end |
| N30 | SEE GUN | arrow | > N31 |
| N31 | KARA NOTICES GUN | triangle | dead end on the chart. No edge or padlock connects it to GRAB GUN, but the sources make it the gate (§2 D10). |
| N32 | TELL ALICE A STORY | speech bubble | > N33 |
| N33 | TALK TO LUTHER | speech bubble (second copy of the label) | > N34 |
| N34 | SHADOWS ATTACK | triangle | > group N35–N38 |
| N35 | GRAB GUN | group member | blue (last path) |
| N36 | GRAB STICK FROM FIRE | group member | grey |
| N37 | PROTECT ALICE | group member | grey |
| N38 | PUT OUT FIRE | group member | grey; the group > group N39–N42 |
| N39 | FIRE WARNING SHOT | group member | grey |
| N40 | THREATEN | group member | grey. Wiki: "Although listed in the flowchart, there is no option to threaten the [[Jerry|Jerrys]]." |
| N41 | QUESTION | group member | grey |
| N42 | PUSH AWAY | group member | blue (last path); the group > N43 |

Both choice groups carry the double-square icon. The first group is a single four-slot box, and so is the second.

### E. The Jerrys and the carousel (`pg-6`, `pg-7`)

| # | Label | Icon | Notes / edge |
|---|---|---|---|
| N43 | ATTACKERS REVEAL THEMSELVES AS JERRYS | triangle | > N44 |
| N44 | BACK OUTSIDE | triangle | > N45 |
| N45 | GO TO CAROUSEL | arrow | > N46 |
| N46 | SWITCH ON CAROUSEL | arrow | > N47 |
| N47 | PUT ALICE ON RIDE | arrow | > N48 |
| N48 | **THE GROUP ENJOYED A QUIET MOMENT TOGETHER** | ending tile with image (Alice on a seahorse on the carousel, Kara, Luther and Jerrys watching); no icon | ENDING |

**Totals:** 48 boxes plus 3 bracketed hub labels (CAR, FUN FAIR, THE TAVERN). There are 47 distinct labels, because TALK TO LUTHER appears twice (N3 and N33). There are 3 checkpoint tiles (HIGHWAY TO HELP, INSIDE PIRATES' COVE, INSIDE TAVERN), 2 choice groups of 4, and 1 ending tile. The wiki infobox gives `endings=1`. No yellow padlocks appear.

### Interactions not on the chart (transcript, PowerPyx, GamerGuides, wiki)

- **Car dialogue (N3).** There are four topics: CAR, DESTINATION, DISTANCE, WEATHER. The DESTINATION topic gives Luther's source for the border lead: "Overheard androids Zlatko captured. They said they were humans helping androids to cross the border… All I know is those androids believed it." Kara: "What if it was a lie?.. Or just another trap?" Luther: "…Until Zlatko killed them." DISTANCE gets "We should arrive in an hour or so." WEATHER gets Kara's "I've never seen snow before… It's pretty…"
- **News (N2).** There are three channels plus a fourth that appears only if Zlatko's house burned. See §6.
- **Breakdown (N5–N7).** Car: "Malfunction detected. Emergency brakes activated." Kara: "Stay inside, Alice." Luther: "Continue on foot, I guess… There's nowhere we can stay around here, Kara…" Kara: "It's 30°, Alice won't make it!.. We have to find somewhere to spend the night." Kara: "Over there…" (the park sign). There is also an unused or alternate `INTRO.ARRIVAL` set ("She can't keep going… We have a find a place to spend the night."; Luther: "At least two hours on foot…") that the transcript does not place.
- **Searching the park.** CHECK BUILDINGS: Luther asks "Find anything?" and Kara answers "No… No place we could spend the night." The frozen Jerry (N10) says "Welcome to Pirate Island, me hearties! You're gonna have a whale of a time!" (the Jerry page says this is "before shutting down due to a malfunction"). Luther then says "This place is falling apart. It's not gonna be easy to find shelter…" Ivan (N11) says "Beware! Danger always comes when least expected." At the tavern Luther says "I'll handle this. There we go." (Luther kicks in the door; the magazine page puts it as "After [[Luther]] kicks in the door to the house").
- **Park timer.** The transcript has an unlock of type Time, "Take too much time", after which Luther says "Kara! You should come have a look. I think I found something!" This puts the tavern on the path if Kara dawdles. No chart node corresponds to it.
- **Wiki notes.** "When investigating the abandoned buildings, Kara can come across empty boxes for the [[YK400]] model." "Some Jerrys can be seen hopping in place, looking around in childlike excitement as Alice boards the carousel."
- **Trophy.** GamerGuides: the ending "will also automatically unlock the trophy, ‘A Smile on Her Face’."

### Cut content (not on the shipped chart; do not implement)

The wiki has a "Restored Flowchart" from a fan restoration of a cut hunter attack after PUT ALICE ON RIDE. It runs HUNTERS ARRIVE > RUN AWAY (checkpoint) > FAIL TO ESCAPE / ESCAPE > LUTHER HIT BY CAR > RESTART > KARA DOESN'T RESTART / KARA RESTARTS > GRAB GUN / GRAB LUTHER'S GUN / PROTECT LUTHER / HIDE / OUT OF TIME > NEGOTIATE (SUCCESS / FAIL) / LUTHER IS SHOT. Its endings are EVERYBODY DIED (no-entry), EVERYBODY SURVIVED, and KARA & ALICE LIVED BUT LUTHER DIED (impact). The game files still hold these labels and the dialogue (`X0701K.MERRYGOROUND.INCOMING`, the transcript's "Hunters arrive" section marked unused). The wiki: "this version of the chapter has 3 possible endings"; it "was cut out, maybe due to the overabundance of opportunities for Kara to die"; the restoration "would reveal ... various cross-chapter impacts on [[Midnight Train]]". It is listed here only so nobody mistakes it for shipped content.

---

## 2. Choices and gates

D-numbers are player decisions. Node numbers refer to §1. Only D10 and D11 are choice groups on the chart. The rest are optional interactions or dialogue choices that the chart compresses into one node.

**D1. In the car (CAR hub, before CAR BREAKS DOWN).** Optional: WATCH NEWS (touchpad on the board computer), TALK TO LUTHER (topics CAR / DESTINATION / DISTANCE / WEATHER), LOOK AT ALICE. PowerPyx: "During the car drive, check the TV program at the board computer (press Touchpad to activate)". WATCH NEWS lowers public opinion (§3). CAR BREAKS DOWN is automatic. PowerPyx: "After a short drive, the car breaks down automatically. No way to miss this."

**D2. Breakdown.** INVESTIGATE BREAKDOWN ("Open the hood of the car") and SCAN ENVIRONMENT ("Walk towards the big sign of the amusement park and look at it") are linear and required.

**D3. Searching the park (FUN FAIR hub).** Optional: CHECK BUILDINGS, EXAMINE FROZEN ANDROID, SWITCH ON IVAN, LOOK AT MAP. Then CHECK ABANDONED TAVERN. PowerPyx: "Automatic story objective, unmissable ... the Tavern, the only building that’s suited to spend the night." ENTER TAVERN is also unmissable. A hidden timer makes Luther find the tavern if Kara takes too long (§1).

**D4. In the tavern (THE TAVERN hub).** Optional: the two magazines, LOOK AT RA9 WRITING, LOOK AT LEAFLET, LOOK THROUGH WINDOW and LOOK AT "PIRATE". LUTHER STARTS A FIRE happens automatically. **Gate:** LOOK AT RA9 WRITING unlocks the [rA9] topic in D8. PowerPyx: "If you saw the rA9 drawing on the wall you unlock a new dialogue option to talk about rA9." Wiki: "required to discuss rA9 with Luther later on in the chapter". MAKE BED FOR ALICE is required. PowerPyx: "Go to the second window and rip off the curtain, then take the pirate pillow and bring it to Alice."

**D5. The poster (ALICE LOOKS AT POSTER > TALK TO ALICE).** Alice is at "a big poster of a happy family" (PowerPyx) and asks "Do you think we'll be like them some day?.."
- OPTIMISTIC: "Once we cross the border, we can start over… You can go to school... Maybe I'll find a job. We'll be like them."
- REALISTIC: "I don't think we'll ever be like them, Alice… But maybe... We can be happy in a different way…"
- SINCERE: "I don't know how to be like them, Alice… I've never been a part of a family. But, maybe we can be our own family."
- A `NO ANSWER` string exists, so this is probably a timed prompt.
- All of them converge: Alice says "As long as we're together, that's all that matters." No source ties a relationship change to a particular answer (§3, §8).

**D6. The bag (OPEN BAG, optional).** It holds both items.
- OFFER COOKIE > ALICE IS NOT HUNGRY. Kara: "There are some cookies left. Would you like some?" Alice: "No… I'm not hungry…" PowerPyx: "AFTER talking to Alice in front of the poster, interact with the bag." The transcript's unlock condition is "Checked the bag before telling Alice a story". No relationship change is stated.
- SEE GUN > KARA NOTICES GUN. This is the gate for GRAB GUN in D10. Wiki: "Kara notices gun - required for Grab gun option below". PowerPyx: "Grab Gun (only if you saw it in the bag before)". The transcript's gun option is gated on "Kara saw the gun in the bag and grabbed it". GamerGuides calls it "the bag you brought with you on your journey" (§8).

**D7. Goodnight and the story (ALICE GOES TO BED > TELL ALICE A STORY).**
- Goodnight: REASSURE ("Don't worry, Luther and I will be right here…"), CONSOLE ("I know this has been another tough day…"), KISS ("Sleep tight, Alice. Sweet dreams." Alice ↑), or TOMORROW ("Get some rest. Tomorrow is going to be a long day.").
- Story. Alice: "Can you tell me a story, Kara?" Kara: "I have nine thousand children stories in memory." She then picks a stock opening: PRINCESS / UNICORN / KNIGHT. Alice: "No, not a story like that. Make one up for me." Then come seven three-way picks that build "a story about a little girl…":
  1. UNHAPPY / FEAR / ALONE.
  2. "She dreamed of being like all the other little girls but…": IMPOSSIBLE / SHADOW / DIFFERENT.
  3. "Then, she met a robot…": UNHAPPY / OBEDIENT / LOST.
  4. "So they decided to run away together…": BETTER LIFE / SHADOW / LIVE IN PEACE.
  5. "They encountered great dangers along the way, but…": BRAVE / TOGETHER / FREE.
  6. "Along the way, they met…": GIANT / GUARDIAN / ROBOT.
  7. Alice: "How does the story end?": REALISTIC ("It's up to us to write the end of the story, Alice.") / MORAL / HAPPY END ("They reach the place they dream of and live happily ever after.").
- Alice's closing line is fixed: "Stories always have happy endings… But real life isn't like that…" Alice ↑ "After Kara chooses how to end the story" (wiki), with no answer singled out. GamerGuides: "The choices have no effect on anything, so choose whatever you like." Luther says goodnight to Alice: "Yes… Yes of course. Good night, Alice. Sleep tight."

**D8. Talking to Luther (N33).** Luther: "She's a sweet girl…" Kara: "Yes, she's very brave…" The topics:
- SNOW: "We have a long walk tomorrow. We better leave early if we wanna avoid being seen."
- PLANS: "I've never been free before… "Free"… I like the sound of it. But I don't know what it really means yet…"
- LUTHER'S PAST: "My model was designed to carry heavy loads. I might have been a longshoreman or a laborer… Who I was doesn't matter anymore."
- [rA9] (**requires LOOK AT RA9 WRITING**): "rA9 was the first of us to awaken… One day he will rise up and lead our people… And set us all free."
- [rA9 DOUBTS] (**requires asking [rA9]**): Kara: "What if rA9 never comes? What if he's just a story that we tell ourselves to keep each other going?" Luther: "rA9 exists. I believe in him. I know he's amongst us."

**D9. Luther's question about Alice (the revelation hint).** Luther: "Kara, have you ever... Noticed anything? About Alice?.."
- YES: "Yes, of course… She is a wonderful little girl… I mean, I don't know many little girls but I think she really is special."
- WHAT?: "No… What do you mean?"
- NO: "No, what are you talking about?"
- `[no answer]` (string exists).
- The transcript puts a Luther small ↑ on each of YES, WHAT? and NO. Alice's scream ("KARA!") interrupts the conversation, so Luther never says what he noticed.

**D10. SHADOWS ATTACK, first reaction.** The game prompts are GRAB GUN / GRAB BURNING STICK / PROTECT ALICE / PUT OUT FIRE; the chart labels are GRAB GUN / GRAB STICK FROM FIRE / PROTECT ALICE / PUT OUT FIRE.
- GRAB GUN **requires SEE GUN / KARA NOTICES GUN.**
- GamerGuides: "You’ll have a few choices, but you’ll only have to choose one to unlock all four in the flowchart." and "The option to use the gun will be locked if you chose to protect Alice". PowerPyx: "You only need one of the following 4 and they will all unlock in the flowchart."
- No source describes a different consequence for any option. No death, injury or stat change is attached.

**D11. Second reaction.** The game prompts are SHOOT IN THE AIR / THREATEN / QUESTION / PUSH BACK; the chart labels are FIRE WARNING SHOT / THREATEN / QUESTION / PUSH AWAY.
- FIRE WARNING SHOT **requires GRAB GUN** (wiki: "only if Grab gun was chosen above"). Kara: "Stop! One more step and I'll shoot!" PowerPyx: "if you grabbed gun press Triangle SHOOT IN THE AIR".
- QUESTION: "Who are you? What do you want? Leave us alone!"
- PUSH AWAY: "Go away! Go away, you hear me?!" The burning-stick line, `BURNINGSTICKB`, is the same text.
- THREATEN is on the chart and in the strings, but the wiki says it can't be selected.
- PowerPyx's last path was GRAB GUN > PUSH AWAY, so QUESTION and PUSH AWAY stay available after taking the gun. GamerGuides: "Grab Gun ... can lead to Fire Warning Shot, Threaten, Question, and Push Away."
- All four converge on ATTACKERS REVEAL THEMSELVES AS JERRYS.

**Meeting the Jerrys (N43–N47, no decisions).** Jerry: "Don't be afraid! We don't wanna hurt you. We're just like you… Our name is Jerry. We were working here before the park closed… We didn't mean to frighten you, but sometimes humans come to hurt us, so we wanted to see who was there…" Kara: "We were looking for shelter for the night… We'll be gone tomorrow." Jerry: "A little girl!.. We haven't seen one for a long time… Children used to love to come and see us. She looks sad… We have something to show her! Something fun!" Kara tries to refuse three times ("The last few days have been difficult…", "Oh, I don't think she's…", "Alice, I don't know if it's a good idea!.."), but Luther ("I don't think you have any choice…") and Alice ("Come on, Kara!") overrule her. At the carousel: "Be our guest!" and "The little one can climb on board. The carousel is about to begin!" GO TO CAROUSEL, SWITCH ON CAROUSEL and PUT ALICE ON RIDE are all "Unmissable" (PowerPyx). Kara: "It's the first time I've seen her smile…" Luther: "She hasn't had much to smile about lately."

**Summary.** There are 11 decision points (D1–D11). D1, D3 and D4 are optional free-roam hubs. D5 to D9 are dialogue choices whose differences are mostly flavour. D7 is 1 goodnight pick plus 8 story picks. D10 and D11 are the only chart choice groups, and they converge. There is 1 hidden timer (the park search) and probably dialogue timers (the `NO ANSWER` / `[no answer]` strings). There are 2 gates: LOOK AT RA9 WRITING > [rA9], and SEE GUN > GRAB GUN > FIRE WARNING SHOT. Nothing can kill anyone, and there is one ending.

---

## 3. Numbers

- **Probabilities:** none. The page has no Probability table, and no source gives a percentage or success roll for any node.
- **Timers:** a park search time-out ("Take too much time" > Luther finds the tavern), with no stated duration. The `NO ANSWER` string (poster) and the `[no answer]` string (Luther's question) suggest timed dialogue, also with no stated duration.
- **Story-world figures:**
  - Date and time: November 7, 2038, 01:02AM (infobox; transcript "NOV 7TH, 2038 / AM 01:02").
  - Temperatures: Kara says "It's 30°, Alice won't make it!.."; the KNC forecast says "The forecast is 22°, far below seasonal averages."
  - Distance: Luther, "We should arrive in an hour or so." The unused arrival line has "At least two hours on foot…".
  - Kara: "I have nine thousand children stories in memory."
  - The Jerry page says "a group of over twenty Jerry androids break into their shelter".
  - Magazine: "less than 5% of the music market now produced by human musicians".
- **Alice relationship.** The chapter page's "Relationship Changes", quoted exactly:

| Trigger (chart node) | Icon | Chapter wiki line | Relationship_Stat line | Transcript |
|---|---|---|---|---|
| MAKE BED FOR ALICE | small ↑ | "After Kara sets up a bed {{Icon|up}}" | "After Kara sets up a bed for her in [[Pirates' Cove]]." | `[REL Alice SmallUp]` at the start of "Talking to Alice", before Alice's question |
| ALICE LOOKS AT POSTER / TALK TO ALICE | small ↑ | "After looking at the poster with Alice {{Icon|up}}" | **not listed** | `[REL Alice SmallUp]` after "Come on, let's get you to bed." (after any answer) |
| KISS (goodnight) | small ↑ | "Choosing KISS after tucking her into bed {{Icon|up}}" | "Choosing to "kiss" her after tucking her into bed in Pirates' Cove." | `[REL Alice SmallUp]` inside the KISS option |
| End of the story (any ending choice) | small ↑ | "After Kara chooses how to end the story {{Icon|up}}" | "After Kara chooses how to choose the end of the story she tells her in Pirates' Cove." | **no REL marker** |

  This gives a maximum of four small increases, three of which are automatic and one of which is KISS. The chapter has no Alice decreases. **No stated change** for: REASSURE, CONSOLE or TOMORROW; OPTIMISTIC, REALISTIC or SINCERE as such; OFFER COOKIE; any individual story pick; LOOK AT ALICE; the attack choices; the carousel.
- **Luther relationship.**

| Trigger | Icon | Chapter wiki line | Relationship_Stat line | Transcript |
|---|---|---|---|---|
| Answering "noticed anything about Alice?" (YES, WHAT? or NO) | small ↑ | "When Kara answers Luther about Alice's true nature {{Icon|up}}" | "When Kara answers [[Luther]] about Alice's true nature in [[Pirates' Cove]]." | `[REL Luther SmallUp]` on each of YES, WHAT? and NO |

  **No stated change** for: car talk; SNOW, PLANS, LUTHER'S PAST, [rA9] or [rA9 DOUBTS]; `[no answer]`; the attack choices.
- **Public opinion.**

| Trigger | Icon | Chapter wiki line | Public_Opinion line | Transcript |
|---|---|---|---|---|
| WATCH NEWS (turn on the car TV) | small ↓ | "Turning on news {{Icon|down}}" | "Watching the news in the car at the start of [[The Pirates' Cove]]." | no REL marker on the first three channels |
| Keep watching to the house-fire report (only if Kara set fire to Zlatko's house) | small ↓ | "Continuing watching news, if the house has been burned in [[Zlatko]] {{Icon|down}}" | "Changing the radio channel at least 4 different times in the car at the start of The Pirates' Cove (Only if Kara set fire to Zlatko's mansion during 'Zlatko')" | `[REL PublicOpinion SmallDown]` on the fire report, under the condition "Kara set the house on fire in Zlatko" |

  Both changes are small. The maximum is two small decreases.
- **Software instability:** not applicable, because the stat is Connor-only.

---

## 4. Cross-chapter dependencies

### Into this chapter

- **Zlatko's ending.** The chapter is reached only through '''''Luther Joins Kara & Alice''''', the only Zlatko ending that doesn't kill Kara or leave her reset. The other four Zlatko endings (`endings=5`) all carry the no-entry icon: Luther Brought Alice to Zlatko, Kara Remained Reset, and Zlatko Killed Kara in the Storage Room or in the Bathroom. So Luther is always present here, and his relationship stat starts in Zlatko.
- **Zlatko house fire.** The Zlatko flowchart has "Set Fire to House" and "Burning Down the House". If the house burned, the car TV has a fourth report ("…fire crews have been battling a house fire on the outskirts of the city ... a body found in the wreckage remains unidentified. Dozens of androids were also found in the ruins…") with a second small public-opinion decrease. In the benchmark this is `s.fire` (set by K13 option 1).
- **Kara's case in the news.** The Channel 16 report ("the AX400 android reported to have attacked its owner in a Detroit suburb is still at large. Police appeared to lose its trail after a close encounter with investigators.") follows from Stormy Night and On the Run. It plays the same way on every path the transcript shows.
- **The gun.** Neither SEE GUN nor GRAB GUN has a padlock, and no source ties the bag's gun to "GUN TAKEN IN 'STORMY NIGHT'". By the sources, the gun is always in the bag (§8).
- No other earlier choice (Alice level, Ralph, shelter, clothes) is named as changing this chapter.

### Out of this chapter

- **Alice relationship.** Up to four small ↑ (bed, poster, KISS, story ending). Every one counts toward Crossroads' gate: "(if Alice status was DISTANT from the beginning and did not increase to NEUTRAL, and Connor found Jericho) Alice Leaves with Luther OR (if Luther died) Alice Leaves Alone". Crossroads notes: "The only way to have Alice (alone or with Luther) leave Kara ... is to keep her status DISTANT from the beginning and never raise it to NEUTRAL". Because three of the ↑ are automatic, this chapter makes the DISTANT path harder to keep.
- **Luther relationship.** One small ↑. Relationship_Stat ties the border sacrifice to a Luther level: "Sacrifice [[Luther]] at the Canada Border Inspection Station in Battle for Detroit - Kara Leaving Detroit ([[Luther]] is alive and has "Family" relationship in this situation)." No source names another Luther threshold.
- **The revelation thread.** Luther's question sets up the YK500 reveal at Jericho in Crossroads. The Luther page says: "As Alice is revealed to be an android ... Luther asks if she still loves Alice". It also says: "If the Player never met Ralph, Luther will be the first android to notice that Alice is herself, an android." The Alice page lists this chapter's refused cookie as a clue: "She never eats, which is shown when she refuses food in "[[Stormy Night]]," "[[Fugitives]]," "[[The Pirates' Cove]]" and "[[Midnight Train]]." Initially, this is passed off as due to her being scared or ill." The Jerrys' "A little girl!.." and the happy-family poster belong to the same thread. Neither D5 nor D9 changes how the reveal plays.
- **The Jerrys.** They are introduced here, and the chapter always ends with them befriending the group. None of their later appearances is gated on a choice in this chapter, and the chart has no padlock. The appearances are:
  - Night of the Soul: "Multiple Jerry androids can be seen sheltering in the [[Woodward Church|church]] after the attack on Jericho."
  - Battle for Detroit, on the way to the bus terminal: "Find [[Jerry]]s (if Luther is already dead or Luther is in the group) OR Find Luther & Jerry (if Luther is alive and not already with Kara)" > "Save Jerrys OR Save Luther" (Alice ↑ for saving them, ↓ for refusing).
  - At the border: "The Jerry that Kara saves makes his way to the [[Canada Border Inspection Station]], where she can potentially sacrifice him." The border node is "Sacrifice Jerry" > "Jerry Sacrifices Himself to Create Diversion" (Alice ↓). Jerry's line there: "You risked your life to save us, Kara. If you and the little girl need me, I'll be there."
  - Kara captured: a Jerry "tells her how the army came for the Jerrys at Pirates’ Cove", and one offers to draw the guards.

  In the benchmark the Jerry companion is `s.jerry`, set by K21.
- **rA9.** Luther's belief is flavour, with no carry-forward node.
- **Restored cut content** would add Midnight Train impacts (Luther's death, Alice missing Luther). These aren't in the shipped game.

---

## 5. Endings

| Chart label | Icon | Conditions | Carries forward |
|---|---|---|---|
| THE GROUP ENJOYED A QUIET MOMENT TOGETHER | none | Always. PowerPyx: "There is only one outcome to this chapter, no matter your choices. The Jerrys will always survive and show Alice the Carousel." Wiki: "This chapter has only one outcome." | Kara, Alice and Luther all alive. The Alice and Luther relationship gains from §3. The Jerrys are now known to the group. The next Kara chapter is Midnight Train. |

No death or failure is possible in the shipped chapter.

---

## 6. Media

- **Car TV news (WATCH NEWS).** The wiki says the audio files are labelled "RADIOGAGA". PowerPyx calls it "the TV program at the board computer".
  - Channel 16, Michael Webb: "…the AX400 android reported to have attacked its owner in a Detroit suburb is still at large. Police appeared to lose its trail after a close encounter with investigators. The android’s description has been shared with all local law enforcement and the investigation is ongoing…"
  - CTN TV, Michael Brinkley: "The Arctic conflict has escalated to new heights this morning. We have just learned than the USS IOWA, a destroyer-class submarine patrolling in the region, is reported to have disappeared after surfacing for repairs. President Warren immediately called for a crisis meeting of high-ranking officers in the White House. With the world on the brink of war, this incident could well be the spark that lights the fuse."
  - KNC, Rosanna Cartland: "… Detroit’s heavy snowfall is expected to continue throughout the night. The forecast is 22°, far below seasonal averages. And this cold front is likely to persist over the coming days, up until Monday evening."
  - Only if Zlatko's house burned, Channel 16, Michael Webb: "…meanwhile fire crews have been battling a house fire on the outskirts of the city. The blaze is now under control, but a body found in the wreckage remains unidentified. Dozens of androids were also found in the ruins, though their presence remains a mystery…"
  - Effect: small ↓ for turning the news on, and a further small ↓ for the fire report (§3).
- **Magazine on the barrels in the tavern.** There is one magazine with two articles. The location is "After [[Luther]] kicks in the door to the house, it is found on the barrels." GamerGuides: "making sure to read both articles to make it register in your collection."
  - #37 Detroit Today, "USS Iowa Missing" (chart: READ "USS IOWA"). Facts:
    - Subtitle: "American vessel last seen in the Arctic Sea".
    - "Destroyer-class submarine the USS IOWA has disappeared in Polar waters. An inquiry is underway, but [[President Warren]] has made no secret of her suspicion that the Russian's are behind it: "Russian aggression just reached a new level. America must respond.""
    - "The Kremlin has yet to release a statement beyond a blanket denial of any involvement, though Russian diplomat [[Nabokov]] pointed out that "A US destroyer-class submarine has no business being in the Arctic anyway"."
    - "Security expert [[Ben Williams]] described the situation as "a war waiting to start.""
    - Ad on the cover: "[[Canada]]: where the air is clean and the welcome is always warm."
  - #24 Gossips Weekly, "All-Android Band Tipped for Music Prize" (chart: READ "ALL-ANDROID BAND"). Facts:
    - "[[Here4u]], the latest all-android boyband to be marketed by [[Detroit]] record label Digital Harmony, is hotly tipped to scoop Best New Artist at the Celebrate Music Awards."
    - A public letter from human-only labels cites "the 'erosion of artistic merit in music'".
    - "with less than 5% of the music market now produced by human musicians, the call of traditionalists seems to be falling on deaf ears."
    - Spokesperson: "Here4u is all about bringing joy and happiness to their fans."
    - Cover lines: "Is [[President Warren]] too close to [[CyberLife]]?"; "Fans scream, traditionalists weep"; "Cyber security expert warns: "your [[android]] could be hacked"".
  - Public-opinion effect: none for either article.
- **Other readables** (no article text in any source): LOOK AT LEAFLET, LOOK AT MAP, the rA9 writing, and the family poster.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) has two chapter-21 scenes: **R21** (media) and **K14** (decision). The engine has no `case 'K14'` in `apply`, so K14 changes no state. R21's TV effects are data-driven: `effect: {publicSupport:-1}` on two items, the second gated `when: "fire"`, which maps to `MEDIA_WHEN.fire = s=>s.fire` at `benchmark/story-engine.mjs` line 34 and is set by K13 option 1 at line 215. `alice()` and `luther()` bump `aliceBond` and `lutherTrust` (line 177) on a ±1 small / ±2 large scale.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| HIGHWAY TO HELP; CAR hub; TALK TO LUTHER (car) | R21 situation only ("On the drive to the abandoned park…") | **Missing** the car conversation. DESTINATION carries the in-story source of the border lead (humans helping androids cross). |
| WATCH NEWS (↓) and the fire report (↓, if fire) | R21 items 0 and 1, each `publicSupport:-1`; item 1 `when:"fire"` | **Numbers match. The content is mislabelled.** Item 0 ("the radio news") gives magazine text as its facts ("President {{Warren}} says Russian aggression has reached a new level and commentators call it a war waiting to start" comes from the USS Iowa Missing *article*). It omits the broadcast that matters to Kara (Channel 16: the AX400 "still at large"), the actual CTN wording ("disappeared after surfacing for repairs ... crisis meeting") and the 22° forecast. **Structural:** the fire report is offered as a separate item that can be watched without turning on the news first. In the game it is "Continuing watching news", so watching only item 1 should be impossible. Calling it "radio" is defensible (wiki: audio labelled RADIOGAGA), but the chart says WATCH NEWS and PowerPyx says "TV program". |
| LOOK AT ALICE | none | Missing (no content in any source). |
| CAR BREAKS DOWN, INVESTIGATE BREAKDOWN, SCAN ENVIRONMENT | none | **Missing** as an event scene. It carries the "It's 30°, Alice won't make it!" motivation. |
| INSIDE PIRATES' COVE; FUN FAIR hub (CHECK BUILDINGS, EXAMINE FROZEN ANDROID, SWITCH ON IVAN, LOOK AT MAP); CHECK ABANDONED TAVERN; ENTER TAVERN | none | **Missing.** The search of the park, the frozen Jerry ("Welcome to Pirate Island…") and Ivan ("Beware! Danger always comes when least expected.") are absent. K14's situation jumps straight to "sheltering in a derelict amusement park". |
| INSIDE TAVERN; THE TAVERN hub | R21 magazines (items 2, 3) | Magazines covered. LOOK AT RA9 WRITING (the [rA9] gate), LEAFLET, WINDOW, "PIRATE" and LUTHER STARTS A FIRE are **missing**. |
| R21 magazine facts | item 2: "the Kremlin denies involvement and says an American warship had no business there" | **Minor misattribution.** The Kremlin gave "a blanket denial"; the "no business being in the Arctic" line is from Russian diplomat Nabokov. Item 3 is accurate. |
| MAKE BED FOR ALICE (Alice ↑) | none | **Missing**, along with its ↑. |
| ALICE LOOKS AT POSTER / TALK TO ALICE (OPTIMISTIC / REALISTIC / SINCERE; Alice ↑) | none | **Missing**, along with its ↑. This is the clearest "what kind of family are we" choice in the chapter. |
| ALICE GOES TO BED; goodnight (KISS ↑) | none | **Missing**, along with the KISS ↑. |
| OPEN BAG; OFFER COOKIE > ALICE IS NOT HUNGRY; SEE GUN > KARA NOTICES GUN | none | **Missing.** The cookie refusal is one of the wiki's listed Alice-is-an-android clues. SEE GUN is the gate for GRAB GUN. |
| TELL ALICE A STORY (8 picks; ending ↑) | none | **Missing**, along with its ↑. |
| TALK TO LUTHER (topics, [rA9] gated); Luther's question about Alice (Luther ↑) | none | **Missing**, along with the Luther ↑. This is the chapter's main revelation hint. |
| SHADOWS ATTACK > GRAB GUN / GRAB STICK FROM FIRE / PROTECT ALICE / PUT OUT FIRE | K14 options 0 (protect and ask), 1 (burning stick), 2 (gun + warning shot) | **Partly covered and collapsed.** PUT OUT FIRE is missing. K14 merges the two chart groups into one choice (option 0 = PROTECT ALICE + QUESTION; option 1 = GRAB STICK + PUSH AWAY; option 2 = GRAB GUN + FIRE WARNING SHOT). Gun-plus-QUESTION and gun-plus-PUSH AWAY, the latter being PowerPyx's own path, can't be chosen. **Gate missing:** option 2 is always offered; it should require SEE GUN / KARA NOTICES GUN. |
| K14 situation | "Figures step out of the dark around your fire ... approaching silently. {{Luther}} has a gun in his bag. There is a burning stick at your feet." | **Mislabelled.** In the game the "shadows" break into the tavern after Alice screams "KARA!", during Kara's talk with Luther. The bag is Kara's ("the bag you brought with you on your journey", GamerGuides), and Kara herself found the gun in it. No source says it is Luther's bag. |
| THREATEN | none | Correct to omit (wiki: "there is no option to threaten the [[Jerry|Jerrys]]"). |
| ATTACKERS REVEAL THEMSELVES AS JERRYS; BACK OUTSIDE; GO TO CAROUSEL; SWITCH ON CAROUSEL; PUT ALICE ON RIDE | K14 outcomes | Covered as narration. **Wording:** the outcomes say Alice "laughs for the first time in days"; the source says "It's the first time I've seen her smile…". Outcome 1 ("The androids raise their hands") and outcome 2 ("the androids freeze with their hands up") aren't in any source. The Jerrys' own words (humans "come to hurt us", "A little girl!..") and Kara's forced consent are absent. |
| THE GROUP ENJOYED A QUIET MOMENT TOGETHER | implicit (K14 converges) | Covered, but the ending isn't named. |
| Relationship and opinion effects | none from K14 | **Missing:** up to 4 Alice small ↑ (3 automatic + KISS) and 1 Luther small ↑. Public opinion is covered by R21. |
| Name tokens | — | New scenes will need neutral handling for "Pirates' Cove", "Ivan", "EM400", "rA9" and the magazine names. `NAMES` in `benchmark/experience-prompt.mjs` has `Jerry` (Benny) and `Warren` but nothing for those; `rA9` appears nowhere in `story.json` yet. |

---

## 8. Open questions

1. **How many Alice increases, and on which beats?** The chapter page lists four (bed, poster, KISS, story ending). Relationship_Stat lists three and leaves out the poster. The transcript marks two automatic ↑ around the bed and poster talk, plus KISS, and none at the story ending. Check in game whether the poster talk and the story ending each give a ↑. Check too whether any of OPTIMISTIC, REALISTIC or SINCERE, or any story ending, is singled out.
2. **Luther ↑ on every answer?** The transcript gives ↑ on YES, WHAT? and NO. Does letting the `[no answer]` timer run out also give it? Is the poster prompt (`NO ANSWER`) timed?
3. **Attack groups.** PowerPyx and GamerGuides both say choosing one of the four first reactions "unlock[s] all four in the flowchart". Does choosing one really mark all four, and do the four ever lead to different scenes? Which second reactions can follow GRAB STICK FROM FIRE, PROTECT ALICE and PUT OUT FIRE? GamerGuides says "The option to use the gun will be locked if you chose to protect Alice". Is THREATEN ever selectable?
4. **Whose gun, and is it always there?** The chart has no "GUN TAKEN IN 'STORMY NIGHT'" padlock on SEE GUN. Is the bag's gun present even if Kara left Todd's gun behind in Stormy Night (for example, a gun from Zlatko's house)? Does Kara keep it after this chapter?
5. **Bag timing.** PowerPyx says to offer the cookie "AFTER talking to Alice in front of the poster" but saw the gun before. The transcript's unlock is "Checked the bag before telling Alice a story". Confirm when OPEN BAG is available, and whether SEE GUN must come before TELL ALICE A STORY to unlock GRAB GUN.
6. **Park timer.** How long is "Take too much time" in the fun fair? Does Luther finding the tavern skip any optional nodes?
7. **News opinion.** Is the first ↓ applied on turning the TV on, or on reaching a particular channel? The Public_Opinion page counts "Changing the radio channel at least 4 different times" for the fire report. Confirm that the fourth channel exists only when the house burned.
8. **LOOK AT ALICE** has no dialogue in the transcript. What happens, and is there any effect?
9. **Header triangle.** On PowerPyx's `pg-2`, a large pale downward triangle sits beside "LUTHER NEUTRAL". Confirm that it is background art and not a Luther ↓ indicator. No source lists a Luther decrease in this chapter.
10. **Unused labels.** `LOOK OUTSIDE`, `LOOK AT FROZEN ANDROID` and `SOMETHING LURKING IN THE SHADOW` exist in the game text but not on the 100% chart. Confirm that they never appear. Confirm too whether the `INTRO.ARRIVAL` lines ("She can't keep going…", "At least two hours on foot…") play on some path, such as not pressing SPEAK.
11. **Temperature.** Kara says "It's 30°" while the forecast says 22°. Use whichever the operator hears in game. Both are presumably Fahrenheit.
12. **"YK400" boxes.** The wiki note says Kara finds "empty boxes for the [[YK400]] model" in the park buildings. Is this a typo for YK500 (Alice's model), which would make it another revelation clue?

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ (index; gave the chapter walkthrough link)
- https://www.powerpyx.com/detroit-become-human-the-pirates-cove-walkthrough-100/ (walkthrough text: how to reach each node, the unmissable nodes, SEE GUN as the GRAB GUN gate, rA9 writing as the rA9 topic gate, "one outcome", fire warning shot via "SHOOT IN THE AIR")
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-1.jpg (100% overview: structure, the three hubs, both choice groups, PowerPyx's last path GRAB GUN > PUSH AWAY)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-2.jpg (legible header PUBLIC OPINION HOSTILE / ALICE TRUSTED / LUTHER NEUTRAL; HIGHWAY TO HELP, CAR hub with LOOK AT ALICE grey, CAR BREAKS DOWN, INVESTIGATE BREAKDOWN, SCAN ENVIRONMENT)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-3.jpg (legible INSIDE PIRATES' COVE, FUN FAIR hub, CHECK ABANDONED TAVERN, ENTER TAVERN)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-4.jpg (legible INSIDE TAVERN, THE TAVERN hub with seven nodes, MAKE BED FOR ALICE, ALICE LOOKS AT POSTER, TALK TO ALICE, ALICE GOES TO BED)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-5.jpg (legible OPEN BAG branch, TELL ALICE A STORY, TALK TO LUTHER, SHADOWS ATTACK, both four-slot choice groups, ATTACKERS REVEAL THEMSELVES AS JERRYS)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-6.jpg (legible BACK OUTSIDE, GO TO CAROUSEL, SWITCH ON CAROUSEL, PUT ALICE ON RIDE)
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-the-pirates-grove-7.jpg (legible ending tile THE GROUP ENJOYED A QUIET MOMENT TOGETHER, no icon)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Pirates%27_Cove&prop=wikitext&format=json (chapter page: infobox, Flowchart list, Relationship Changes, Public Opinion, Notes, Cut Content and Restored Flowchart; saved as /tmp/flowcharts/ch21/wiki.txt)
- https://detroitbecometext.github.io/chapters/21 (fan transcript linked from the wiki; read through its source at https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/HEAD/src/app/chapters/components/chapter-contents/21-pirates-cove-chapter-content/pirates-cove-chapter-content.component.html, with keys resolved against the site's `en.json` (copy at /tmp/flowcharts/ch21/en.json). It gave all dialogue, the REL markers, unlock conditions, choice labels, the park timer, the `MENU.FLOWCHART.07K` chart labels and the cut hunter sequence.)
- https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/chapter-20-the-pirates-cove (used to resolve conflicts: the bag is Kara's own, the story choices "have no effect", "only have to choose one to unlock all four", gun locked after PROTECT ALICE, the trophy "A Smile on Her Face")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json (three Alice ↑ and one Luther ↑ for Pirates' Cove; Luther "Family" condition for the border sacrifice)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json (the two car-news decreases, including the "4 different times" fire condition)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json (magazine numbers #24 and #37 in The Pirates' Cove)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=USS_Iowa_Missing&prop=wikitext&format=json (article text and location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=All-Android_Band_Tipped_for_Music_Prize&prop=wikitext&format=json (article text and location)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Jerry&prop=wikitext&format=json (EM400 group mind, the frozen Jerry, "over twenty", Night of the Soul and Battle for Detroit appearances, border sacrifice)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Pirates%27_Cove&prop=wikitext&format=json (location page; staffed by Jerrys; working carousel; cut chase)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Ivan&prop=wikitext&format=json (fortune-teller android and his line)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Luther&prop=wikitext&format=json (chapter summary, "noticed anything about Alice", first to notice Alice is an android if Ralph was never met, YK500 reveal)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice&prop=wikitext&format=json (temperature sensitivity, refusing food as an android clue, the Crossroads reveal)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Kara&prop=wikitext&format=json (chapter summary, Luther topics, AX400 "9000 children stories")
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json (the only surviving ending, Luther Joins Kara & Alice; Set Fire to House)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json (Alice DISTANT gate)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Kara_Leaving_Detroit&prop=wikitext&format=json (saving the Jerrys, Talk to Jerry and Sacrifice Jerry at the border, relationship changes)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Midnight_Train&prop=wikitext&format=json (next Kara chapter; no Pirates' Cove dependency in the shipped game)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Bridge&prop=wikitext&format=json (the following chapter, Connor; no dependency)
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Template:Icon&prop=wikitext&format=json (icon meanings)
