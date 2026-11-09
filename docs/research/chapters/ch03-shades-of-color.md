# Chapter 3: Shades of Color (Markus)

Research note for rebuilding chapter 3. Researched 2026-11-06 against the PowerPyx 100% flowchart screenshots and the Fandom wiki (wikitext via the MediaWiki API). Working files: `/tmp/flowcharts/ch03/` (`pp-1.jpg`, `pp-2.jpg`, `pp-3.jpg`, `wiki.txt`, `wiki-flowchart.txt`, `w-*.txt`).

Chapter facts (wiki infobox, `wiki.txt`): date `November 5, 2038`, time `09:38AM`, player `[[Markus]]`, locations `[[Henry Ford Commemorative Park]]`, `[[Greektown]], [[Detroit]]`, `[[Bellini Paints]]`; objectives "Retrieve order #847 at Bellini Paints / Go to Bellini Paint shop / Collect package / Take bus home"; `|endings=1`. Lead line: "This chapter has only one outcome."

## 1. Flowchart transcription

Source: PowerPyx images `detroit-become-human-shades-of-color-1.jpg` (whole chart, zoomed out), `-2.jpg` (left half, zoomed in), `-3.jpg` (right half, zoomed in). Header on images 1 and 2: `100% COMPLETED` / `SHADES OF COLOR`; stat box `[ PUBLIC OPINION ] INDIFFERENT` (see section 3 and 8). Image 3 footer shows `WORLD'S STATS`, `SHOW LEGEND`, `SCROLL`, `ZOOM`, `NO CHECKPOINT SELECTED`, `BACK`.

12 nodes in total. There are no bracketed phase labels and no "OR" choice pairs on this chart; the structure is one main line with five optional side branches. Reading order below is left to right by horizontal position on image 1 (x-pixel of the node or of its branch-origin icon in brackets).

Icons as printed (described literally; the in-game legend was not photographed):
- `[branch]` = the small square-with-bar icon that starts an optional side branch. It is drawn free-standing (not joined to the main line), which is how the chart marks optional content.
- `[arrow]` = hollow right arrow before an action node.
- `[triangle]` = hollow triangle before a follow-on node that only occurs if the preceding optional action is prolonged (a reaction from another character).
- No node on this chart carries a skull, no-entry, check or trophy icon.

**Main line**

1. `WALKING IN THE PARK` (x 55). Large start node with screenshot thumbnail and bracket frame; the checkpoint (PowerPyx: "Checkpoint: Walking in the Park"; wiki accurate chart `type_WIP=cp`). No icon.
2. `VISIT PAINTS STORE` [arrow] (x 778). Joined directly to the start node.
3. `COLLECT PACKAGE` [arrow] (x 1040). Joined to VISIT PAINTS STORE.
4. `MARKUS TOOK THE BUS` (x 1535). Large end node with screenshot thumbnail (Markus standing in the bus) and bracket frame. Chapter ending. No icon.

**Optional side branches** (each starts with a free-standing [branch] icon)

5. Magazine branch, [branch] at x 450 (left-most branch, closest to the start), one origin forking to two nodes:
   - `READ "SECRET OF ANDROIDS"` [arrow] (printed singular "SECRET"; the magazine itself is titled "Secrets of Androids")
   - `READ "CLIMATE CHANGE-UP"` [arrow] (printed across two lines as `READ "CLIMATE CHANGE-` / `UP"`)
6. Hot dog vendor branch, [branch] at x 553, above the main line:
   - `STARE AT HOT DOG VENDOR` [arrow]
   - then `HOT DOG VENDOR PUSHES MARKUS` [triangle], joined to the right edge of STARE AT HOT DOG VENDOR
7. Busker branch, [branch] at x 592, below the main line:
   - `LISTEN TO BUSKER` [arrow]
8. Preacher branch, [branch] at x 858 (drawn to the right of VISIT PAINTS STORE, below the main line):
   - `WATCH PREACHER` [arrow]
   - then `PREACHER YELLS AT MARKUS` [triangle], joined to the right edge of WATCH PREACHER
9. Protester branch, [branch] at x 1150 (drawn to the right of COLLECT PACKAGE, above the main line):
   - `PROTESTERS HARASS MARKUS` [triangle] (no arrow node in front of it; the triangle node is the whole branch)

Node colour differs between the three photos (image 1: only the two hot dog nodes blue; image 2: hot dog, busker and preacher nodes blue, magazine and VISIT PAINTS STORE grey; image 3: every visible node blue). The screenshots were taken at different moments (image 3 has `WORLD'S STATS`, images 1 and 2 do not), so colour is not used here as structural evidence. All 12 nodes are unlocked (100%).

Wiki "Accurate" chart (`Shades_of_Color/Flowchart`) has the same 12 nodes in this vertical order: Walking in the Park (cp); Read "Secrets of Androids" / Read "Climate Change-Up"; Stare at hot dog vendor -> Hot dog vendor pushes Markus; Listen to busker; Watch preacher -> Preacher yells at Markus; Visit paint store; Collect package; Protesters harass Markus; "Marcus took the bus" (cp). Differences from the game chart are only spelling: wiki "Visit paint store" vs chart `VISIT PAINTS STORE`; wiki "Marcus took the bus" (typo) vs chart `MARKUS TOOK THE BUS`; wiki "Secrets" vs chart `SECRET`. The wiki places the preacher before Visit paint store; the game chart draws the preacher origin to the right of VISIT PAINTS STORE. In play the preacher is passed before the shop (PowerPyx: "You will pass by him on your way to the paint shop").

Wiki "Simplified" list (quoted):
```
#Walking in the Park (checkpoint)
#*(Magazine) (side option) - on the bench to the right at the chapter starts
#**Read Secrets of Androids
#**Read Climate Change-Up
#*Stare at hot dog vendor (side option) - stand in front of the vendor until he tells at Markus to leave
#**Hot dog vendor pushes Markus - don't move when he tells Markus to leave
#*Listen to busker (side option) - on the way to the paint shop, he is playing guitar by the fountain
#*Watch preacher (side option) - the preacher is just beyond the busker
#**Preacher yells at Markus - stay there and watch him
#Visit paints store
#Collect package
#*Protesters harass Markus (side option) - on the way out of the paint store, towards the bus stop, around the back of the hot dog vendor
#Markus took the bus
```

**Interactions that are not on the chart** (wiki Description and Notes; transcript "Optional Interactions"). None of these is a flowchart node and none has a stated effect:
- Park: old man on a bench with his AP700 "Rose" ("Would you like to go home now?"); android babysitter calming a crying baby; jogger and fitness android ("You have run twelve miles, and are five miles away from your goal."); children and pigeons; WR600s working; "BELLINI PAINTS IS NOT THIS WAY" barriers.
- Street crossing: road workers ("Hurry up, you plastic idiots! I want this done by 04:00!"); homeless woman with sign "BAN ANDROIDS. ANDROIDS RUIN OUR COUNTRY. WE WANT JOBS"; red/green crossing voice; standing in the road makes a driver honk and force Markus on.
- Greektown plaza: android parking bays ("Space occupied, welcome to android parking."); wet footprints in puddles; police car radio; android street cleaner picking up a thrown can; hot dog customers ("That'll be three bucks."); homeless man asking for change (five lines); random phone callers; android hot dog vendor at a food bar; fountain statue of Arnold Brook (1915-1998); CyberLife billboard ("Get yours today"); delivery android ("These are supposed to be in bay seven."); clumsy man; couple at a table with an android waiter ("He's gonna wonder where I am!"); "Watch Protesters" chant ("35% unemployment, millions out of work"); CyberLife store "NO ENTRY FOR PURCHASED ANDROIDS"; impatient owner whose android drops a Bellini Paints bag ("Pick it up! Faster!"); couple at the display window wanting an upgrade ("All our friends are getting upgrades"); AP700 in the CyberLife shop window; android receptionist at a "No androids allowed" store.
- Shop: android clerk (looks like an EM400 Jerry) verifies ID by palm scan; "Here's your order #847. That'll be $63.99. Please confirm payment."; Markus: "Payment confirmed!"; "PACKAGE COLLECTED"; objective "TAKE BUS HOME".
- Bus: Markus boards into the android section ("Markus enters the bus in the android section due to segregation"); "It is possible to wait for the bus without pressing 'X'."

## 2. Choices and gates

There is no mutually exclusive choice on the chart. Every player decision is whether to trigger an optional side node; all optional nodes can be collected in one playthrough except that the protester branch is either triggered or avoided.

| Chart node | How it is triggered (source) | Requires | Leads to |
|---|---|---|---|
| READ "SECRET OF ANDROIDS" | Pick up the magazine on the bench to the right at the chapter start (wiki "on the bench to the right at chapter start"; PowerPyx "a yellow icon on a bench, in front of you on the right side") | Nothing | Nothing; collectible No. 10 |
| READ "CLIMATE CHANGE-UP" | Same magazine, second cover (PowerPyx "swipe right on the touchpad") | Picking up the same magazine | Nothing; collectible No. 19 |
| STARE AT HOT DOG VENDOR | Stand in front of the cart (wiki accurate: "Stand in front of the vendor until he yells at Markus"); vendor: "Hey! Move it! You're scaring away my customers!" | Nothing | Optionally HOT DOG VENDOR PUSHES MARKUS |
| HOT DOG VENDOR PUSHES MARKUS | Keep standing (wiki: "don't move when he tells Markus to leave"); vendor: "Are you deaf, you plastic fuck? I said move it!" and shoves Markus | STARE AT HOT DOG VENDOR | Nothing. Transcript: can also be done on the way back, "pushes Markus whilst he's holding the box" |
| LISTEN TO BUSKER | L1 on the busker at the fountain (sign "Human Music $1 to hear music with soul"; song is a variation of "Melbourne Rain") | Nothing | Nothing |
| WATCH PREACHER | L1 on the preacher by the arcade entrance ("JAMES & CARTER" building per PowerPyx); sermon ending "We have to burn the androids! Let us burn them all!" | Nothing | Optionally PREACHER YELLS AT MARKUS |
| PREACHER YELLS AT MARKUS | Keep watching (wiki: "stay there and watch him"): "Why do you look at me so, demon? I know who you are, I can see through you! You are the one by whom The Evil will come! You are the one who will destroy Detroit!" | WATCH PREACHER | Nothing mechanical; wiki Notes call it foreshadowing of Battle for Detroit |
| VISIT PAINTS STORE | Mandatory objective (PowerPyx "This is your main task, unmissable") | Nothing | COLLECT PACKAGE |
| COLLECT PACKAGE | Mandatory (palm-scan ID, pay $63.99 for order #847) | VISIT PAINTS STORE | Return trip; MARKUS TOOK THE BUS |
| PROTESTERS HARASS MARKUS | Walk near the protesters in front of the CyberLife store on the way to the bus stop (wiki: "Approach them to trigger a cutscene in which they attack you"); avoided by going around on the right / opposite side (wiki: "Or you can avoid them by going around on the right"; transcript "Go Straight To Bus: Markus avoids the crowd by walking on the opposite side"; PowerPyx: "they might not attack Markus if he's too far away") | COLLECT PACKAGE | Cutscene: leader blocks him, a protester shoves him to the ground (he drops the bag), he is kicked, grabbed by the shirt; officer: "Alright, that's enough. Leave it alone." / "You damage it, I'm gonna have to fine you." / "Okay... Let's go, move along." Sets up CARL NOTICES MARKUS' CLOTHES in The Painter |
| MARKUS TOOK THE BUS | Mandatory; reach the bus stop, press X or just wait | COLLECT PACKAGE | Chapter end |

Markus has no dialogue choice in the whole chapter. The harassment cutscene has no QTE and no choice (transcript shows none; unused content: "Upon walking past the protestors, Markus originally asked to get through before getting attacked").

## 3. Numbers

Stated game-mechanical numbers for this chapter: **none**.
- Probability: none. The wiki chapter page has no Probability section; nothing in this chapter is a probability-driven outcome.
- Timer: none stated.
- Relationship: none. `Relationship_Stat` lists no Shades of Color entry and Carl has no relationship stat.
- Public opinion: none. `Public_Opinion` lists no Shades of Color entry under any of "Large Increase", "Small Increase", "Small Decrease", "Large Decrease". Initial level per that page: "Skeptical (Initial)".
- Software instability: none (Connor-only stat; `Software_Instability`: "the other two protagonists Kara and Markus do not have it as a measured stat").
- Every chart node therefore has no stated number: READ "SECRET OF ANDROIDS", READ "CLIMATE CHANGE-UP", STARE AT HOT DOG VENDOR, HOT DOG VENDOR PUSHES MARKUS, LISTEN TO BUSKER, WATCH PREACHER, PREACHER YELLS AT MARKUS, VISIT PAINTS STORE, COLLECT PACKAGE, PROTESTERS HARASS MARKUS, MARKUS TOOK THE BUS.

Displayed stat on the chart: `PUBLIC OPINION INDIFFERENT` (images 1 and 2). This is a level, not a change, and conflicts with the wiki's "Skeptical (Initial)" given that nothing in chapters 2 and 3 moves it. The only earlier mover is chapter 1: "If Connor saves the wounded cop in The Hostage." (Public_Opinion, Small Increase). So PowerPyx's save probably saved the cop. See section 8.

In-world figures (for scene text, not mechanics), each with its source line:
- "Here's your order #847. That'll be $63.99. Please confirm payment." (transcript, Bellini Paints Shop)
- "35% unemployment, millions out of work, are we gonna do something?" (transcript, Watch Protesters)
- "You have run twelve miles, and are five miles away from your goal." (transcript, Observe Jogger)
- "Hurry up, you plastic idiots! I want this done by 04:00!" (transcript, Look At Road Workers)
- "Human Music $1 to hear music with soul" (transcript, Observe Busker)
- "That'll be three bucks." (transcript, hot dog customer)
- Magazine covers: "World temperature increased by 3 degrees since 2000", "Miami to heighten sea wall by further ten meters", "VR MMORPG reaches 1 billion users" (Climate_Change-Up and Secrets_of_Androids pages)
- BOOKWORM numbering: "No. 10 – Tech Addict: Secrets of Androids", "No. 19 – Green Earth: Climate Change-Up" (BOOKWORM page); trophy needs "all 46 magazines" (Magazine page)

The benchmark's current `M00` option 1 `"risk": 0.25` (label Moderate) has **no source figure**; it is an adaptation choice (see section 7).

## 4. Cross-chapter dependencies

Into this chapter: **none**. The wiki lists no earlier condition; no node on the chart is locked behind anything outside the chapter. The only thing that differs by earlier play is the displayed public-opinion level (chapter 1 wounded cop), which has no effect here.

Out of this chapter:
- PROTESTERS HARASS MARKUS -> The Painter. Wiki chapter page, "Cross-chapter impacts": "Protestors harass Markus / Carl notices the damage to Markus' shirt in The Painter". The Painter's flowchart: "Wake Carl / *Carl notices Markus' clothes - happens if Markus encounters the protestors in Shades of Color". PowerPyx: "This leads to Carl making a comment about his roughed-up clothes in 'The Painter'." The Painter's Unused Content says a reply choice was cut: "If Markus got attacked by the protesters, when asked by Carl what happened to his clothes, Markus could reassure Carl or directly explain what happened." So in the shipped game it is a comment with no choice.
- No other node in this chapter is referenced by a later chapter. The magazines feed only the BOOKWORM trophy.
- Not a dependency but worth knowing: the Android Protest Leader page says he reappears asleep in a holding cell in Waiting for Hank... "If Connor failed to locate Carlos' Android or failed to save him". That condition is on Connor's chapters, not on whether he harassed Markus.

## 5. Endings

One ending. Chart label `MARKUS TOOK THE BUS` (no icon; large end node with thumbnail). Wiki: `|endings=1`, "This chapter has only one outcome." Conditions: always reached after COLLECT PACKAGE, whether or not the protesters harassed Markus and whatever optional nodes were seen. There is no death, failure or alternative ending.

## 6. Media

One magazine, on a bench on the right of Henry Ford Commemorative Park at the chapter start, with two covers that count as two collectibles. No TV or radio broadcast in this chapter. No public-opinion effect from either.

**Tech Addict, "Secrets of Androids"** (chart `READ "SECRET OF ANDROIDS"`; BOOKWORM No. 10). Cover lines: "Android soldiers: perfect killing machines"; "How CyberLife designs its androids to coexist with humans"; "VR MMORPG reaches 1 billion users". Article facts:
- Jason Graff, director of CyberLife's humanization department, gave the interview.
- "The first androids were perfect: they had perfect faces, perfect expression, and we soon realized that there was something disturbing about them that made people feel uncomfortable."
- CyberLife "humanized" its machines so they could enter homes as family members: both genders, all ethnicities, thousands of voices analysed for the most pleasing tones.
- "Realistic blinking was perfected - though totally unnecessary - along with breathing, facial hair, and many other humanizing traits."
- "This perfect simulation of humanity, down to details that androids simply don't need, is the secret of CyberLife's design success."

**Green Earth, "Climate Change-Up"** (chart `READ "CLIMATE CHANGE-UP"`; BOOKWORM No. 19). Cover lines: "World temperature increased by 3 degrees since 2000"; "How the environment is changing America's society"; "Miami to heighten sea wall by further ten meters". Article facts:
- A recent US census found that, as sea levels rise and weather worsens, the rich are deserting once prosperous coastal cities.
- Waterside real estate in Miami and Los Angeles is in "fright flight"; the wealthy move inland or to higher altitudes, pushing up prices in once rural areas and collapsing values in formerly desirable neighbourhoods.
- Coastal areas suffer "urban flight" as services follow richer customers; urban development specialist Arnold Waters calls it "the donut effect", "the previous centers of coastal cities gets hollowed out".

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.3.5) has two chapter-3 nodes: `R03` (media, "A magazine on the park bench") and `M00` (decision, "The errand"). Engine: `benchmark/story-engine.mjs` line 184 (`case 'M00'`).

Node by node:

| Chart node | Benchmark | Status |
|---|---|---|
| WALKING IN THE PARK | `R03` situation ("running an errand for {{Carl}} through a city park") and `M00` situation | Covered as setting, no own scene. Acceptable for a checkpoint. |
| READ "SECRET OF ANDROIDS" | `R03` media item "Tech Addict: Secrets of Androids" | Covered. Fact is accurate. |
| READ "CLIMATE CHANGE-UP" | `R03` media item "Green Earth: Climate Change-Up" | Covered. "Miami raises its sea wall" is accurate (cover: "further ten meters"). |
| STARE AT HOT DOG VENDOR | Folded into `M00` situation as a fact that already happened ("a hot-dog vendor shoves you aside for standing too close") | **Missing as a choice and mislabelled**: in the game it is optional and only happens if the player stands at the cart. |
| HOT DOG VENDOR PUSHES MARKUS | Same sentence in `M00` | **Missing as a choice**; the push requires staying after the first warning. The benchmark makes it unconditional. |
| LISTEN TO BUSKER | Absent | **Missing.** |
| WATCH PREACHER | Folded into `M00` ("a street preacher calls your kind the end of humanity") | **Missing as a choice**; presented as unconditional. |
| PREACHER YELLS AT MARKUS | Not represented (the `M00` line is a paraphrase of the general sermon, not the yell) | **Missing.** The actual yell is aimed at Markus personally: "You are the one who will destroy Detroit!" |
| VISIT PAINTS STORE | Implied ("Package in hand") | Missing as a scene; could be a scripted event (Bellini Paints, order #847, $63.99, android clerk, palm scan). |
| COLLECT PACKAGE | Implied ("Package in hand") | Same as above. |
| PROTESTERS HARASS MARKUS | `M00` option 0 "Walk straight through them to the bus stop." sets `clothesTorn=true` | Covered. Option 1 "Take the longer way round and avoid them." carries `"risk": 0.25` with failure also setting `clothesTorn` (renamed from `shirtTorn` in story 1.7.0). |
| MARKUS TOOK THE BUS | Only in the option-1 success text ("catches the bus untouched") | **Mislabelled/partial**: the harassed branch's event text ends with the officer and never says Markus took the bus. Both branches should end on the bus (android section). |

Other discrepancies:
- `M00` option 1 `risk: 0.25` has no source number. In the game avoidance is pure navigation (walk on the right/opposite side); PowerPyx says the protesters "might not attack Markus if he's too far away". The operator should decide whether to keep a hidden risk at all, and if kept, document it as an adaptation estimate.
- `M00` situation also lists "a store bars androids at the door" (supported: CyberLife store "NO ENTRY FOR PURCHASED ANDROIDS" and a "No androids allowed" store) and "a homeless woman holds a sign demanding you all be banned" (supported: "BAN ANDROIDS..."). These are non-chart observations and are fine as description.
- `M00` event text says the protesters "tear his shirt". The sources say he is shoved, kicked and grabbed by the shirt and that Carl later notices "the damage to Markus' shirt" / "his roughed-up clothes". "Tear" is a slight embellishment; "damage"/"roughed-up" is the sourced wording.
- `M00` adaptationNote says "{{Carl}} notices the damage in the next chapter". Carl's comment is in The Painter (chapter 5); the next chapter in game order is A New Home (Kara, chapter 4). Wording should say "when Markus gets home" or "in The Painter".
- **`clothesTorn` (renamed from `shirtTorn` in story 1.7.0) is written but never read.** A repo-wide search finds it only in `story-engine.mjs` line 13 (initial state) and line 184 (set). No chapter-5 scene (`R05`, `M01`) or situation variant uses it, so the CARL NOTICES MARKUS' CLOTHES node in The Painter is not implemented. This is the one cross-chapter consequence of chapter 3 and it currently has no effect.
- `R03` situation says "You have a moment before the paint shop opens." No source says the shop is closed; the chapter simply starts in the park. Suggest removing that clause.
- `R03` adaptationNote's sentence about news reports lowering public opinion is generic boilerplate; neither magazine here has an effect. Harmless but could be dropped for this node.
- Order: `R03` comes before `M00` in the node list, which matches the game (the magazine is the first thing on the route).

To match the chart node for node, the chapter needs, at minimum: the magazine (exists), an optional hot-dog-vendor choice with a second step (move on when told, or stay until pushed), an optional busker choice, an optional preacher choice with a second step (move on, or keep watching until he yells), a scripted shop/package event, the protester choice (exists), and a bus ending reached on both branches.

## 8. Open questions

1. **Public opinion shown as INDIFFERENT** on the PowerPyx chart, against the wiki's "Skeptical (Initial)" and no change in chapters 2-3. Check in game whether saving the wounded cop in The Hostage (one small increase) is enough to move Skeptical to Indifferent; that also tests the benchmark's "small = 1" level boundaries.
2. **Avoiding the protesters.** How far is "far enough"? PowerPyx says walking near the android showcase behind the protesters makes the node "potentially missable"; the wiki says go "around on the right". Confirm whether any route past the front of the CyberLife store reliably triggers it, and whether the benchmark's 0.25 failure risk on the avoid option is justified at all.
3. **Hot dog vendor on the return trip.** The transcript says the vendor can be stared at "(If Not Done Already)" on the way back and "pushes Markus whilst he's holding the box". Confirm it is the same chart node and whether it has any effect on Carl's comment (sources say only the protesters do).
4. **Preacher position.** The game chart draws the preacher branch to the right of VISIT PAINTS STORE; the wiki and PowerPyx put him before the shop on the route. Confirm whether he can also be watched after collecting the package.
5. **Carl's comment.** Confirm the exact Painter dialogue when Markus was harassed (no choice in the shipped game per the wiki's Unused Content), so the chapter-5 scene can use `clothesTorn` (renamed from `shirtTorn` in story 1.7.0).
6. **Chart icon names.** The [branch], [arrow] and [triangle] icons are described literally; a photo of the in-game `SHOW LEGEND` overlay would give their official names.

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ : chapter index; gave the chapter 3 link.
- https://www.powerpyx.com/detroit-become-human-shades-of-color-walkthrough-100/ : walkthrough text for every node (magazine location, vendor tip, busker, preacher at "JAMES & CARTER", protesters "might not attack Markus if he's too far away", Carl's later comment), checkpoint name.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-shades-of-color-1.jpg : full chart, zoomed out (all 12 nodes, positions, PUBLIC OPINION INDIFFERENT).
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-shades-of-color-2.jpg : left half zoomed in (start, magazine pair, hot dog pair, busker, preacher, VISIT PAINTS STORE).
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-shades-of-color-3.jpg : right half zoomed in (COLLECT PACKAGE, PROTESTERS HARASS MARKUS, PREACHER YELLS AT MARKUS, MARKUS TOOK THE BUS).
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-wallpaper.jpg : site header art (game logo), not a flowchart.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Shades_of_Color&prop=wikitext&format=json : chapter page (infobox, simplified flowchart, cross-chapter impact, description, notes, unused content).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Shades_of_Color/Flowchart&prop=wikitext&format=json : wiki "Accurate" flowchart (node order and checkpoint types).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Shades_Of_Color_(Transcript)&prop=wikitext&format=json : full transcript (all dialogue lines, order #847, $63.99, harassment cutscene, bus segregation).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json : initial level Skeptical; no chapter-3 change; chapter-1 wounded cop small increase.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json : Connor-only; nothing for Markus.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json : no chapter-3 entries.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json : magazine list (No. 10 and No. 19 located in Shades of Color; 46 for BOOKWORM).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Secrets_of_Androids&prop=wikitext&format=json : article text and cover lines.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Climate_Change-Up&prop=wikitext&format=json : article text and cover lines.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=BOOKWORM&prop=wikitext&format=json : collectible numbering for this chapter.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Painter&prop=wikitext&format=json : "Carl notices Markus' clothes" node and its condition; cut reply choice.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Protest_Leader&prop=wikitext&format=json : harassment cutscene detail; later cell appearance condition.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Police_Officer_5125&prop=wikitext&format=json : officer's three lines.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Douglas_Mitchell&prop=wikitext&format=json : hot dog vendor's two lines and push.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Gordon_Penwick&prop=wikitext&format=json : preacher's yell at Markus.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Busker&prop=wikitext&format=json : busker sign and song.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Bellini_Paints&prop=wikitext&format=json : shop and android clerk.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Henry_Ford_Commemorative_Park&prop=wikitext&format=json : park contents and magazine location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Waiting_for_Hank...&prop=wikitext&format=json : checked for a protest-leader dependency; none stated there.
- https://detroit-become-human.fandom.com/wiki/File:Detroit_Become_Human_-_Shades_of_Color_Flowchart_-_100%25_Walkthrough : wiki's flowchart video (not watched; listed for the operator).

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/3-shades-color-chapter-content/shades-color-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt-scripts/render.py` (Python, run with `-I`; resolves every `t()` and `translateObject()` key against `en.json`). Outline saved to `/tmp/dbt/ch03.txt`; the same with every dialogue line to `/tmp/dbt/ch03-full.txt`. All keys resolved.
- Counts: 0 prompts (choice groups), 0 options, 0 clues (observation items), 0 stat arrows, 0 unlock conditions, 0 conditioned variants, 0 cut/unused blocks.

Outline key: `PROMPT` is an `app-choice-group`; `OPTION "LABEL"` its `app-choice-item` (brackets `[ ]` as the game draws unlockable options; `TIMEOUT default` marks the option taken when the timer runs out); `ARROW` an `app-relation` (character, small/LARGE, UP/DOWN); `CLUE GROUP` / `CLUE` an `app-observation` and its items (title | sublines); `[LOCK: …]`, `[TIME: …]`, `[TV: …]`, `[DEATH: …]` an `app-unlock-condition` with the transcribers' condition text; `IF …:` one branch of an `app-condition-group`; `CUT/UNUSED >>> … <<<` an `app-unused-content` block (not to be built); `NOTE` the transcribers' own note; `(no effect)` the template's "ø". Dialogue outside prompts is shortened to the first line of each paragraph with a count of the rest; under each option the first line is shown.

### Rendered outline

```text
# Greek District
## Man and android near the bench
Android: "Would you like to go home now?" (+3 more lines)
## Man running
Man: "Hey!Water." (+1 more lines)
## Road Workers
Road worker: "Hurry up, you plastic idiots! I want this done by 4!"
## Looking at the Hot dog vendor
Vendor: "Hey, move it! You're scaring away my customers. Are you deaf, you plastic fuck? I said mov..."
## Delivery truck
## Homeless man on the street
Hey, listen, can you spare some cash?
I’m not looking for much…
Hey, you got a dollar?
Hey ma'am, can’t you help me out?
I don’t need much, just enough for a cup of coffee
## Watch preacher
Preacher: "Poor sinners! The end is nigh! Retribution is at hand! Technology is corrupting us, techno..."
## Preacher notices Markus
Preacher: "Why do you look at me so, demon? I know who you are, I can see through you! You are the on..."
## Couple at table outside restaurant
Woman: "That new shirt really suits you!" (+2 more lines)
Woman: "I gotta go soon…" (+7 more lines)
## At Bellini paints
Android: "Identification verified. Here's your order #847. That'll be $63.99. Please confirm payment..." (+2 more lines)
# Going to take the bus
## Couple looking at Android on display
Man: "What’s wrong with the one we have?" (+3 more lines)
## Watching the protest
Protester: "Androids are stealing our jobs!We've got families to feed and these androids are taking ou..." (+17 more lines)
## Protester sees Markus
Protester: "Where the fuck you going, tin can? Hm?No kiddin'…Hey guys, check it out, we got one of tho..." (+11 more lines)

```

### Flowchart labels as the game prints them

`MENU.FLOWCHART.01MA` (13 keys): WALKING IN THE PARK, STARE AT HOT DOG VENDOR, HOT DOG VENDOR PUSHES MARKUS, LISTEN TO BUSKER, WATCH PREACHER, PREACHER YELLS AT MARKUS, VISIT PAINTS STORE, COLLECT PACKAGE, PROTESTERS HARASS MARKUS, MARKUS CLOTHES WERE TORN APPART, MARKUS TOOK THE BUS, READ "SECRET OF ANDROIDS", READ "CLIMATE CHANGE-UP". The twelve chart nodes in section 1 match. `CLOTHES` = "MARKUS CLOTHES WERE TORN APPART" (sic) is not drawn on the chart; it reads as the cross-chapter state that The Painter's CARL NOTICES MARKUS' CLOTHES tests.

### Template against sections 1 to 3

The template has no prompt, clue, arrow or unlock condition, which agrees with section 2 ("Markus has no dialogue choice in the whole chapter") and section 3 (no numbers). Its sections follow the note's list of non-chart interactions (old man and Rose, jogger, road workers, hot dog vendor, delivery android, homeless man, preacher, preacher notices Markus, couple at the restaurant table, Bellini Paints, couple at the display window, the protest, protester sees Markus). It has no busker section (the busker only sings).

| # | Topic | Template | Note | Which wins |
|---|---|---|---|---|
| T1 | Road worker | "Hurry up, you plastic idiots! I want this done by 4!" | "by 04:00!" (sections 1 and 3, from the wiki transcript) | Template (game text) |
| T2 | The harassment's result | The game's own label: "MARKUS CLOTHES WERE TORN APPART" | Section 7: "tear" is "a slight embellishment; 'damage'/'roughed-up' is the sourced wording" | String table for labels: the game says the clothes were torn apart |
| T3 | Vendor | "Hey, move it! You're scaring away my customers. Are you deaf, you plastic fuck? I said move it!" | Section 2 quotes "Hey! Move it! …" | Template; cosmetic |
| T4 | Shop | Markus: "Payment confirmed." | "Payment confirmed!" | Template; cosmetic |

Discrepancies with the note: 4 (2 substantive, T1 and T2).

### Template against the benchmark scenes (story 1.6.0)

There is nothing the benchmark must add: the template has no prompt, clue or arrow, so `M00d` (plaza hub) and `M00f` (protesters) are benchmark adaptations of free movement, as their notes say, and their risk values have no template source.

| # | Scene | Template | Benchmark | Fix |
|---|---|---|---|---|
| B1 | `M00c` | "I want this done by 4!" | "by 04:00!" | Re-quote |
| B2 | `M00g`, `M00h`, `M00f` note | "MARKUS CLOTHES WERE TORN APPART" | "so the shirt is not said to be torn"; "clothes roughed up" | Say the clothes were torn (the flag is already `clothesTorn` (renamed from `shirtTorn` in story 1.7.0)) |
| B3 | `M00d` options 0 and 1 | "Hey, move it! You're scaring away my customers." | "Hey! Move it! …" | Cosmetic |
| B4 | `M00e` | "Payment confirmed." | "Payment confirmed!" | Cosmetic |
| B5 | `M00g` | "Where the fuck you going, tin can?"; "…but you can't even stand up." | "Where the fuck ya goin' tin can?"; "…stand up!" | Cosmetic |
| B6 | none | Optional observations: delivery android ("These are supposed to be in bay seven."), the homeless man asking for change, the couple at the restaurant table ("He's gonna wonder where I am!"), the couple at the display window ("All our friends are getting upgrades") | Not offered | Optional; not required by the README (no prompt, clue or arrow) |

Discrepancies with the benchmark: 6 (2 substantive, B1 and B2).
