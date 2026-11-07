# Chapter 4: A New Home (Kara)

Research note for DetroitBench. Sources: the game's 100% flowchart as photographed by PowerPyx (five 1920x1080 images), the Fandom wiki chapter page and transcript (MediaWiki API wikitext), and the wiki's stat, magazine and later-chapter pages. Wiki line numbers below refer to the chapter wikitext saved at `/tmp/flowcharts/ch04/wiki.txt`.

Summary: 30 flowchart nodes plus 2 bracketed phase labels, 2 checkpoints, 1 ending (FINISHED CLEANING). There are no mutually exclusive choice pairs on the chart: every branch is an optional activity that is either done or skipped, plus one relationship gate (ALICE GIVES KARA A KEY). The wiki gives no probabilities, timers, public opinion or software instability changes for this chapter; it gives 9 Alice relationship increases and 1 decrease, as direction icons only (no magnitudes).

---

## 1. Flowchart transcription

Chart title: "100% COMPLETED / A NEW HOME". The chart reads left to right in one row (overview `detroit-become-human-a-new-home-1.jpg`). Labels are quoted exactly as printed.

Glyphs on this chart (none of the README's death/failure/success/trophy icons appear anywhere on it):
- `->` arrow: an action node (the default).
- speech bubble: a dialogue node.
- triangle (outline): an event the game triggers as a result of something else (my reading; see Open questions).
- open padlock, on a yellow node: a cross-chapter unlock ("YOU'VE UNLOCKED A DIALOGUE OR ACTION OFTEN BENEFICIAL" in the transcript, and `[[File:Unlock.png]]`).
- grey/white box with a black arrow: shown only on DISTURB TODD. Every other node is blue. My reading is that it was unlocked on an earlier playthrough but not on the photographed one; see Open questions.

### Checkpoint
1. **WELCOME HOME**: large card with image, "LOAD CHECKPOINT". No icon. (image 2)
2. **JOIN TODD**: arrow. (image 2)

### [ CLEAN FIRST FLOOR ] (bracketed phase label, image 3)
Upper branches, all coming off the phase label:
3. **READ "ANDROID POWER!"**: arrow.
4. **READ "CONNECTING THE DOTS"**: arrow.
5. **CHECK BACKYARD**: arrow.
6. **WASH DISHES**: arrow.
7. **TALK WITH ALICE**: speech bubble.

Lower branches, also off the phase label:
8. **DISTURB TODD**: black arrow, grey/white box (the only node drawn this way).
9. **ACTIVATE VACUUM**: arrow.
10. **REWASH CLOTHES**: arrow.
    - 11. **FIND RED ICE**: triangle. Child of REWASH CLOTHES.
      - 12. **ENRAGE TODD**: triangle. Child of FIND RED ICE.

Leaving the bracket (single line, mandatory path):
13. **TAKE OUT TRASH**: arrow.
14. **ASK TO GO UPSTAIRS**: arrow.

### Checkpoint
15. **GO UPSTAIRS**: large card with image, "LOAD CHECKPOINT". No icon. (image 4)

### [ CLEAN SECOND FLOOR ] (bracketed phase label, image 4)
Upper branches:
16. **CLEAN TODD'S ROOM**: arrow.
    - 17. **TIDY PILLS**: arrow. Child of CLEAN TODD'S ROOM.
      - 18. **KARA SEES GUN**: yellow node, open padlock. Child of TIDY PILLS.
19. **CLEAN TOILET**: arrow.
20. **ALICE GOES TO HER ROOM**: triangle.

Lower branches:
21. **CLEAN BATHROOM**: arrow.
22. **READ "ANDROID QB"**: arrow.
23. **READ "PUTTING A PRICE"**: arrow.
24. **CLEAN ALICE'S ROOM**: arrow.
    - 25. **VENTILATE ROOM**: arrow. Child of CLEAN ALICE'S ROOM.
      - 26. **KARA DISCOVERS A WAY DOWN**: yellow node, open padlock (label wraps as "KARA DISCOVERS A WAY / DOWN"). Child of VENTILATE ROOM.

Leaving the bracket (image 5):
27. **TALK WITH ALICE**: speech bubble. (Second node with this label; this one is in Alice's room.)
    - 28. **ALICE GIVES KARA A KEY**: triangle. Upper branch off TALK WITH ALICE.
      - 29. **OPEN ALICE'S BOX**: arrow. Child of ALICE GIVES KARA A KEY. Dead-end leaf: no line runs from it to the ending. Drawn blue, not yellow, with no padlock, even though the wiki calls it a cross-chapter impact.
    - 30. **FINISHED CLEANING**: ending card with image (Todd standing over Alice at the dining table). No icon. Reached by a direct line from TALK WITH ALICE.

Totals: 30 nodes (2 checkpoints, 1 ending, 2 yellow unlock nodes, 4 triangle nodes, 2 speech-bubble nodes, 19 arrow nodes plus DISTURB TODD); 2 phase labels.

The wiki's text flowchart (wiki.txt lines 52-86) lists the same nodes in the same order. Wording differences: "Welcome Home (checkpoint)", "Go Upstairs (checkpoint)", "Clean toilet", "'''''Finished Cleaning'''''" in bold italics (ending). There is one structural difference: the wiki lists "Open Alice's box" as a sibling of "Alice gives Kara a key" (both `##` under Talk with Alice), whereas the chart makes it a child of the key node. The wiki groups the two magazines per floor under "(Magazine)" headers, which are not chart nodes.

---

## 2. Choices and gates

The chart has no exclusive "A OR B" choices. The player's choices are (a) which optional nodes to do and (b) the dialogue picks with Alice, which move the relationship that gates the key.

### Mandatory spine
WELCOME HOME -> JOIN TODD -> CLEAN FIRST FLOOR (trash is the only urgent first-floor task) -> TAKE OUT TRASH -> ASK TO GO UPSTAIRS -> GO UPSTAIRS -> CLEAN SECOND FLOOR (both bedrooms urgent) -> TALK WITH ALICE -> FINISHED CLEANING.
- Transcript: "(Trash is mandatory)"; "Grab Trash Bin= (Mandatory)"; going up early shows the blocked prompt "CLEAN DOWNSTAIRS".
- Transcript, upstairs: "(Cleaning both bedrooms is mandatory)". Urgent tasks are "TIDY TODD'S ROOM" and "TIDY ALICE'S ROOM"; optional tasks are "CLEAN BATHROOM" and "CLEAN RESTROOM". Going downstairs early shows the blocked prompt "CLEAN UPSTAIRS".
- Infobox objectives (wiki.txt lines 14-40): Urgent "Collect trash/Take trash bin/Take the trash out" (Clean kitchen, Clean counter, Clean coffee table), "Report to Todd"; Optional "Collect dishes/Wash dishes", "Activate vacuum cleaner", "Check the backyard/Take down laundry/Rewash laundry"; "Bring Todd a beer"; Urgent "Tidy Todd's room" (Make bed, Clean mess, Ventilate room), "Tidy Alice's room" (Make bed, Ventilate room); "Talk to Alice"; Optional "Clean bathroom" (Arrange bottles, Store dirty clothes, Mop floor), "Clean restroom"; "Ask Todd for new instructions".

### Optional nodes, with requirements and what they lead to
| Node | Requires | Leads to / effect |
|---|---|---|
| READ "ANDROID POWER!" | Magazine on the dining/living room table (wiki: "on the dining room table"; PowerPyx: "kitchen table"). Can also be read after reporting to Todd, before going up. | Collectible only. |
| READ "CONNECTING THE DOTS" | Same magazine as above, second article. | Collectible only. |
| CHECK BACKYARD | Go through kitchen/laundry room door. | Objective "TAKE DOWN LAUNDRY"; enables REWASH CLOTHES and the backyard talk. |
| WASH DISHES | Take the dishes from the table to the sink. Dishwasher is broken ("Missing component #573BV"; Kara orders the part). | Alice relationship up when Alice watches Kara scrub. Then Todd demands a beer: "BRING TODD A BEER" (mandatory after dishes; not a chart node). |
| TALK WITH ALICE (1st floor) | Alice joins Kara in the backyard after "Take Laundry" (PowerPyx: "Take down the clothes and you'll see Alice joining you in the backyard"). | Dialogue menu, two picks ("These are optional twice"): GAME (up), BACKYARD (up), WEATHER (no change), SCHOOL (no change). Whether the indoor TOY talk also lights this node is unclear (Open questions). |
| DISTURB TODD | Stand in front of the TV while Todd watches hockey. Todd: "Outta the way for fuck sake!" Kara: "I'm sorry, Todd. It won't happen again." | No stated effect. Wiki line 114: "In order to get the chapter to 100%, you must block the front of the TV while Todd is watching." Staring at the TV instead gets "GET THE FUCK OUTTA HERE!" (not a separate node). |
| ACTIVATE VACUUM | Vacuum robot left of the TV; can be triggered without touching it. | Alice plays with it; Todd: "Alice! You better stop that right now!" No stated stat effect. |
| REWASH CLOTHES | Laundry taken down in CHECK BACKYARD. | Always leads to FIND RED ICE then ENRAGE TODD: Kara finds Red Ice in the "Blue Splash" detergent, scans it ("Acetone, Lithium, Thirium / Toluene, Hydrochloric acid"), and Todd pins her to the wall: "You shouldn't mess around with my stuff! It makes me nervous!" Alice watches. Carries forward to Zlatko (section 4). |
| FIND RED ICE, ENRAGE TODD | Automatic consequences of REWASH CLOTHES. | Not choices. |
| TIDY PILLS | Bedside nightstand in Todd's room. Kara scans "ANTIDEPRESSANT / Contains Tianeptine / Risk of behavioral disorders". | Putting the pills in the drawer reveals the gun: KARA SEES GUN (unlock). |
| KARA SEES GUN | TIDY PILLS. | Unlock; see section 4. |
| CLEAN TOILET | Restroom across from Todd's room. After Todd's room Todd exits the restroom and shoves Kara ("Watch it!"). | Optional task "CLEAN RESTROOM". |
| ALICE GOES TO HER ROOM | Triggered while making Todd's bed (transcript: "Alice goes to her room. Kara finishes making the bed."). PowerPyx: "After making Todd's bed Alice will go to her room automatically." | Event, not a choice. |
| CLEAN BATHROOM | Optional. Arrange bottles, store dirty clothes, then mop floor (mop only after clothes). | No stated effect. PowerPyx claims it is needed before the Alice talk; see Open questions. |
| READ "ANDROID QB", READ "PUTTING A PRICE" | Magazine on the cupboard by the door in Todd's room. | Collectible only. |
| VENTILATE ROOM (Alice's room) | Open Alice's window. Wiki line 79: "the player must actually raise the controller to perform this in 'experienced' difficulty". Kara "finds a roof edge". | KARA DISCOVERS A WAY DOWN (unlock). |
| ALICE GIVES KARA A KEY | Wiki line 83: "if Alice has at least Neutral status"; line 195: "If Kara's relationship status with Alice is at Distant, Alice will not give Kara the key." Transcript: "(Alice Is Distant) ALICE PATH UNLOCKED [red] Alice coldly runs off" vs "(Alice Is Trusting) ALICE PATH UNLOCKED [blue] Alice rushes toward Kara and gives her a key". | Enables OPEN ALICE'S BOX. |
| OPEN ALICE'S BOX | The key. The box is on the drawer/cupboard by the door of Alice's room (transcript: "a small box on the drawer"; PowerPyx: "on the cupboard next to the door"). Without the key Kara can only shake it. | Contents (transcript): "a clover and some pictures ... a photo of Todd, his wife and his biological daughter ... a drawing of what seems to be the mother, then a drawing of Todd and his wife, and then a drawing of examining Kara, and finally Kara being broken." Carries forward to Battle for Detroit. |

Non-node interactions (on the transcript, not on the chart): look at the bridge or excavator; step on the front lawn; watch the bus; listen to Todd's phone call ("Yeah, yeah I'll bring it tomorrow. Yes, same place"); look at the bills ("rejected applications"); the taxi poster; tidy the bookshelf after Todd knocks the books down looking for Red Ice; scan the dishwasher; look at Alice in several spots; peek over the fence; duck under the tree; make Todd's bed, tidy junk, move the guitar, tidy the shelf, pick up bills (a YK500 ad falls out); open Todd's window (VENTILATED ROOM, no unlock); watch the TV in Todd's room; look at the bathroom mirror; look at the wall drawings; examine the Alice in Wonderland book (relationship up); look at the shelf ("Seems you like reading"); examine (shake) the locked box.

### Dialogue menus
1. Backyard (two picks): GAME, BACKYARD, WEATHER, SCHOOL.
2. Downstairs, anywhere, single option: TOY ("That's a pretty toy! What's it's name?").
3. Alice's room, after TIDIED ALICE'S ROOM:
   - Round 1: FACTUAL / FRIENDLY / DIPLOMATIC.
   - Rounds 2 and 3: pick from NAME KARA / INTERESTS? / SEEM QUIET / MOTHER (each "If not said already"); round 3 adds LEAVE ALONE.
   - Then Alice leaves; the key is given or not.

PowerPyx's recommended key line (quoted): "pick dialogues FRIENDLY, NAME KARA, INTERESTS?, SEEM QUIET. All of these make her like you and she now gives you a key."

---

## 3. Numbers

**Probabilities: none stated.** The wiki and PowerPyx give no success probability for any node in this chapter. There is no QTE fail branch on the chart.

**Timers: none stated.** Related untimed notes: "Looking at the TV for too long will result in Todd telling Kara to leave." (wiki Notes) and "if you take too long Todd will impatiently call out to Kara" (wiki Description). Neither gives a figure.

**Public opinion: none.** The Public_Opinion page lists no A New Home event. Kara's only listed effects are later ("Kara's actions can only decrease public opinion by a small amount with a total of four times.").

**Software instability: none.** The Software_Instability page says: "Software Instability is Connor's exclusive feature ... the other two protagonists Kara and Markus do not have it as a measured stat".

**Alice relationship.** Levels (Relationship_Stat page): "Family / Trusted / Warm / Neutral / Distant (Initial)". The chapter starts at Distant. No magnitudes are published; every A New Home change is listed as a small change (`{{Icon|up}}` / `{{Icon|down}}`), not a large one.

Chapter page, "Relationship Changes / Alice" (wiki.txt lines 137-146), quoted exactly:
- Line 137: "Washing the dishes {{Icon|up}}"
- Line 138: "Offering to play a game with Alice when talking to her in the backyard {{Icon|up}}" (GAME)
- Line 139: "Asking Alice about the garden when talking to her in the backyard {{Icon|up}}" (BACKYARD)
- Line 140: "Complimenting her teddy after cleaning the first floor of the house {{Icon|up}}" (TOY)
- Line 141: "Looking at the Alice in Wonderland book in her room {{Icon|up}}"
- Line 142: "Kara optimistically suspects they used to be friends once before offering to be friends again when talking to Alice in her room {{Icon|up}}" (FRIENDLY)
- Line 143: "Asking Alice to help jog her memory when talking to her in her room {{Icon|up}}" (DIPLOMATIC)
- Line 144: "Approving of the name Alice gave her when talking to Alice in her room {{Icon|up}}" (NAME KARA)
- Line 145: "Asking about Alice's interests when talking to Alice in her room {{Icon|up}}" (INTERESTS?)
- Line 146: "Asking Alice about her possible mother when talking to Alice in her room {{Icon|down}}" (MOTHER)

Relationship_Stat page, Kara / Alice, under "Small Increase {{Icon|up}}":
- "Choosing to wash the dishes in A New Home."
- "Choosing "game" or "backyard" while talking to Alice in the backyard in A New Home."
- "Talking to her downstairs after cleaning the house in A New Home." (the TOY line; "after cleaning the house" differs from the chapter page's "after cleaning the first floor")
- "Choosing to read the Alice in Wonderland book in Alice's room in A New Home."
- "Choosing "friendly" or "diplomatic" when talking to Alice in her room in A New Home."
- "Choosing "name Kara" or "interests?" while talking to Alice in her room in A New Home."

Under "Small Decrease {{Icon|down}}":
- "Choosing "mother?" while talking to Alice in her room in A New Home."

The transcript confirms each with `'''ALICE''' {{Icon|up}}` after GAME, BACKYARD, TOY, the book, FRIENDLY, DIPLOMATIC, NAME KARA and INTERESTS?, after Alice watches Kara wash dishes, and `{{Icon|down}}` after MOTHER. It shows **no change** for WEATHER, SCHOOL, FACTUAL ("Alice ignores Kara."), SEEM QUIET, LEAVE ALONE, looking at the shelf, ACTIVATE VACUUM, DISTURB TODD, or REWASH CLOTHES.

Derived counts (my arithmetic from the lines above, not a wiki figure): the most increases available are 8 (dishes 1, backyard 2, toy 1, book 1, FRIENDLY or DIPLOMATIC 1, NAME KARA 1, INTERESTS? 1); there is 1 possible decrease (MOTHER). Wiki line 112: "You can talk to Alice outside, making it possible to get Kara's and her relationship to "Trusted" in this very chapter." Key threshold: "at least Neutral" (line 83). Wiki line 184 notes a display quirk: "Normally if Kara cleans the dishes and hasn't risen up her relationship with Alice yet, when the relationship status rises up, no additional status tag appears, but sometimes the "Distant" tag will appear."

The book increase only counts with Alice present (wiki Notes): "if you look at the book and Alice isn't around, Kara will just briefly look at the book and stay silent, and the relationship status with Alice will not increase since Alice isn't there."

**Other figures in the chapter** (flavour, not stats): date "November 5, 2038", time "04:53PM" (infobox); "You've been gone for two weeks" (Todd); "MISSING COMPONENT #573BV", "154 sale offers available" (dishwasher); "I only need two minutes" (Kara to Alice); TV "Another 225,000 jobs were lost from the US economy in October ... bringing the unemployment figure up to 37.3%"; "the Department of Defense will acquire 200,000 android combat units"; androids used to train players "since 2035"; magazines "120mph", "under two hours", "five hour flight time", "1,800 mph", "skyrocketed 64%", "China earthquake kills 10,000 people", "over 1500 'plays'", "a target six inches wide"; the BOOKWORM trophy needs "all 46 magazines" (Magazine page).

---

## 4. Cross-chapter dependencies

### Inbound (earlier choices that change this chapter)
None stated. This is Kara's first playable chapter; the chapter page lists no prerequisites from other chapters, and nothing on the chart is conditional on an earlier chapter. The only internal gate is the Alice relationship built in this chapter (key at "at least Neutral").

### Outbound (what this chapter changes later)
Chapter page "Cross-chapter impacts" (wiki.txt lines 88-96), quoted exactly:
1. "Kara Sees Gun / Gun accessible in [[Stormy Night]] and [[Fugitives]]"
2. "Kara Discovers a Way Down / Window accessible in [[Stormy Night]]"
3. "Open Alice's Box / Allows you to persuade Todd if he's alive in [[Battle for Detroit - Kara Leaving Detroit]]"
4. "Kara See's "Alice in Wonderland" / Helps Kara remember Alice in [[Zlatko]]"

Details by item:
- **The gun (KARA SEES GUN).** Wiki line 72: "cross-chapter impact: required to unlock the "Kara Shot Todd" and "Alice Shot Todd" endings in [[Stormy Night]], and the "use gun" path in [[Fugitives]]." Stormy Night flowchart: "Take gun ({{Icon|impact}} gun seen in '[[A New Home]]')" (three places); "Threaten with gun (if Kara took the gun)"; "Kara kills Todd (gun was taken) OR Alice kills Todd (gun was taken) OR Stun Todd". Stormy Night Notes: "If Kara didn't previously find the gun, she will not have the option to enter Todd's room." Stormy Night cross-chapter: "Kara takes the gun / Gun is available in [[Fugitives]] / If Kara and Alice stay in the house in [[Fugitives]], the gun can be used in [[On the Run]]". Fugitives: "Use Gun - if used during [[Stormy Night]]", "Convince OR Threaten With Gun - if used during [[Stormy Night]]", and a "[GUN]" dialogue with Ralph. So the chain is A New Home sees the gun, then Stormy Night takes it, then Fugitives and On the Run use it.
- **The window (KARA DISCOVERS A WAY DOWN).** Wiki line 81: "cross-chapter impact: allows escape via window during [[Stormy Night]]." Stormy Night: "Grab lamp OR Talk to Alice OR Open window ({{Icon|impact}} way out seen in 'A New Home')", then "Fail to escape by window {{Icon|failure}} OR Escape by window {{Icon|success}}". Note that Todd's window (VENTILATED ROOM in Todd's room) has no unlock; only Alice's window does.
- **Alice's box (OPEN ALICE'S BOX).** Wiki line 84: "cross-chapter impact: required to persuade Todd if encountered during [[Battle for Detroit - Kara Leaving Detroit]]." Todd_Williams page: "if you saw his family photo from [[Alice]]'s box and understood the chain of events (his wife took their daughter away when she left and he bought an android to replace her), the additional option is unlocked in the second dialogue choice; he can be reasoned with and call off the guard." Battle for Detroit flowchart: "Meet [[Todd Williams|Todd]] (Todd was not killed in [[Stormy Night]]) / Persuade Todd / Todd Sends Soldiers Away / Alice Says Goodbye to Todd" or "Fail to Persuade Todd / Soldiers Arrive for a Security Check". The leverage is the **family photo** (Todd's real daughter), not only the drawings.
- **Alice in Wonderland book.** Zlatko flowchart: "Recall Alice's Book (If Kara saw the Alice in Wonderland book in her room in [[A New Home]])", during "Explore the House to Recover Memory" after "Kara is Reset". The book is not a chart node in A New Home.
- **Red Ice (REWASH CLOTHES / FIND RED ICE).** Not in the chapter page's impact list, but the Zlatko flowchart has: "Recall [[Todd Williams|Todd's]] [[Red Ice]] Pipe (If Kara washed Todd's clothes in [[A New Home]])".
- **Alice relationship.** Carries into Stormy Night onward. Later Alice-relationship gates in the wiki include Crossroads ("Finding her if [[Kara]] was distant with [[Alice]] after Jericho is attacked", "Staying distant in [[Crossroads]]" large decrease).
- **Dishes, final scene.** Transcript: on going downstairs, "(Cleaned Dishes) The table is clear." vs "(Didn't Clean Dishes) The dishes and magazine are still on the table." This is cosmetic, with no stated later effect.

---

## 5. Endings

One ending. Infobox "|endings = 1"; wiki line 44: "This chapter has only one outcome."

- **FINISHED CLEANING** (chart label; ending card with image; no skull, no-entry, check or trophy icon). Reached from TALK WITH ALICE (room) whether or not Alice gave the key and whether or not the box was opened. Final scene (transcript): Kara goes downstairs; Todd confronts Alice at the table ("You think your dad's a lowlife... SAY IT! YOU HATE ME!"), grabs her, then breaks down ("I'm sorry, honey, I'm sorry... You know I love you"). "Alice looks at Kara, and Kara watches in concern." Wiki Description: "After heading back down she'll observe Todd raging at Alice then apologizing."

Chapter-end state that matters later: gun seen (y/n), Alice's window opened (y/n), box opened (y/n), Alice in Wonderland seen (y/n), Red Ice found (y/n), Alice relationship level.

---

## 6. Media

Four magazines, two per floor. The wiki notes: "This is the only chapter with two magazines to interact with." That is, two physical magazines with two articles each. The Magazine page list numbers: Century "Connecting the Dots" #1; Tech Addict "The Price of Life" #11; All Sports "Android Power!" and "Android QB" (rows before #23 and #24). None has a stated public opinion effect.

**Ground floor, living/dining room table** (chart: READ "ANDROID POWER!", READ "CONNECTING THE DOTS"):
1. *All Sports*, **"ANDROID POWER!"**, subtitle "Should it be outlawed?" Cover lines: "Football Frenzy: the latest transfer speculations"; wiki page adds "Detroit's hockey dominance continues". Facts: android pitcher X67 "threw a pitch that broke the 120mph mark"; androids "introduced as a one-per-team innovation but they've come to dominate team strategy"; Jenny Waterfield (fanzine "Home Run"): fans "becoming disenchanted ... A machine breaking these kinds of records just isn't exciting"; Christopher Lennox (ex-pitcher): "The game can only survive by evolving."
2. *Century*, **"CONNECTING THE DOTS"**, "The transport innovation that's shaking up California." Cover lines: "Politics in focus: are American senators really corrupt?", "China earthquake kills 10,000 people." Facts: the "SubTube" ran "from Manhattan to downtown L.A. in under two hours - less than half the five hour flight time", top speed "1,800 mph", in a "depressurized chamber"; California suburban prices "skyrocketed 64%" (realtor Charlene Lowe blames New Yorkers); protester: "First [[Detroit]] takes our jobs, then New York takes our homes? When's it gonna end?"

**Upstairs, Todd's bedroom, cupboard by the door** (chart: READ "ANDROID QB", READ "PUTTING A PRICE"):
3. *All Sports*, **"ANDROID QB"**, "CyberLife unveils android Quarterback". Cover lines: "Have androids killed baseball? Full feature.", "Slam dunk - basketball star Gary Gibbons interview." Facts: American football has "largely resisted" android players; CyberLife's "technical demo" QB1000 throws "End Zone to End Zone", hits "a target six inches wide", knows "over 1500 'plays'"; revealed at a CyberLife exhibition in Detroit; Roy Kenstone (Anti-Android Fan Group): "they hope to distort our sport the same way they have all the others."
4. *Tech Addict*, **"THE PRICE OF LIFE"**, printed on the chart as "PUTTING A PRICE". "How driverless vehicles make life and death decisions". Cover lines: "The quantum magnet that could scrub carbon from the air", "Space tourism: is Mars your next holiday destination?" Facts: Martin Forlong (CrowneCars): imaging plus public records ("marital status, employment record, life expectancy and whether they have children") assign each victim a "value"; "we put a premium on lives that will save other lives, like doctors and nurses"; Felix Gamble (Anti-Automation League): "irrelevant to the sanctity of human life."

**Todd's bedroom TV** (not a chart node; "Watch TV" in the transcript, also available after the Alice talk). It plays in order:
- Michael Webb, Channel 16: basketball. The Gears play Denver "at the CyberLife Arena in Detroit"; the league is negotiating "allowing one android player per squad"; CyberLife offers "one specialized model to every team"; androids have trained players "since 2035".
- An animated film of a boy finding a dragon.
- Michael Brinkley, CTN TV: "Another 225,000 jobs were lost from the US economy in October, according to the Department of Labor, bringing the unemployment figure up to 37.3%."
- A hockey game.
- Rosanna Cartland, KNC: "President Warren spoke today at the opening of a new CyberLife plant near Milwaukee ... the Department of Defense will acquire 200,000 android combat units as part of her increased military spending."

The living-room TV shows the Detroit Crimson Sharks hockey game (Todd: "TV on.").

Public opinion effect: none. The Public_Opinion page lists no A New Home media.

---

## 7. Current benchmark coverage

`benchmark/story.json` has three chapter-4 scenes, in order K01, R04, K01b. Engine (`benchmark/story-engine.mjs`): `case 'K01': s.gunDiscovered = v===0`; `case 'K01b': s.aliceBox = v===0` (event text "The box holds {{Alice}}'s drawings of {{Todd}} hurting her."); `K23` removes option 0 if `!s.aliceBox`; `K04` requires `s.gunDiscovered`. `aliceBond` starts at 0 (Distant under `LEVELS.alice`) and nothing in chapter 4 changes it.

### Scene by scene
- **K01 "Learning the house"** (exploration, 2 options). This bundles CLEAN FIRST FLOOR, CLEAN SECOND FLOOR, KARA SEES GUN and KARA DISCOVERS A WAY DOWN into one binary choice. Problems:
  - Option 0 sets only `gunDiscovered`. The window is not tracked at all, and K03 (Stormy Night) option 0 "get her out through the window" is not gated on it. The wiki says the window escape needs "way out seen in 'A New Home'".
  - The gun and the window are separate optional nodes in the game. A model cannot take one without the other.
  - The situation says the window "is stuck but could be freed so it opens". In the game Kara simply opens it to ventilate ("VENTILATE ROOM") and sees a roof edge. Mislabelled.
  - The situation says "red-ice paraphernalia on the table". In the game Todd smokes Red Ice on the couch after hunting through the shelves (always), and the stash is found only via REWASH CLOTHES in the "Blue Splash" detergent, which triggers ENRAGE TODD. Mislabelled, and the optional node is missing.
  - The situation says the gun is "in the drawer of his bedside table". This is correct (found when putting the pills away, TIDY PILLS).
  - The situation calls Alice "his nine-year-old daughter". No wiki source in this chapter gives her age; check before keeping it.
- **R04 "Magazines on the table and the bedroom TV"** (media):
  - "All Sports: Android Power" merges two articles: "Android athletes now dominate baseball ..." (ANDROID POWER!) and "a CyberLife android quarterback is being demonstrated for football" (ANDROID QB). ANDROID QB should be its own item (it is its own chart node). The title also lacks the "!".
  - "Century: Connecting the Dots" is fine; "the city's androids took their jobs" paraphrases "First Detroit takes our jobs".
  - "Tech Addict: The Price of Life" is fine (chart label "PUTTING A PRICE").
  - TV item: "Unemployment reached 37.3 percent after another 225,000 jobs were lost in October" is supported. "while the stock market is up 11 percent on android productivity" is **not in the A New Home transcript**, and a wiki search finds no source. "President {{Warren}} opened a new {{CyberLife}} plant and announced the military will buy 200,000 android combat units" is supported. "Coastal flood defences are failing; New Orleans may be underwater by 2055" is **not in the A New Home transcript**, and a wiki search finds no source. The Channel 16 basketball "one android player per squad" segment is missing.
  - The situation says the magazines are on the dining table and in Todd's bedroom. This is correct.
  - The adaptationNote ("Watching certain news reports about android incidents lowers public opinion") does not apply here: there is no PO effect in this chapter, and R04 has no `effect`, so the note is boilerplate.
  - The TV broadcast belongs to the upstairs phase; the magazines are split across the two floors.
- **K01b "{{Alice}}'s locked box"** (decision, 2 options):
  - The box is offered unconditionally. In the game it needs ALICE GIVES KARA A KEY, which needs Alice at "at least Neutral". With no chapter-4 relationship scenes, `aliceBond` stays Distant, so under the game's rule the box should be unavailable on every benchmark path.
  - Location and key are mislabelled. The situation says "a small locked box she keeps under her bed and, nearby, a tiny key". Game: the box is on the drawer/cupboard by the door, and Alice herself hands Kara the key.
  - Content is incomplete. The event says "drawings of {{Todd}} hurting her". Game: a clover; a photo of Todd, his wife and his biological daughter; drawings of the mother, of Todd and his wife, of Kara being examined, and of Kara being broken. The photo is what unlocks persuading Todd (Todd_Williams page). K23 option 0 cites only "what you saw in her drawings".
  - The adaptationNote calls the later option "the 'your story' appeal". The wiki calls the path "Persuade Todd".
  - There is no `outcomes["0"]` text. The event comes from the engine; this is fine but inconsistent with option 1.

### Chart node coverage
| # | Chart node | Benchmark | Status |
|---|---|---|---|
| 1 | WELCOME HOME | K01 situation (arrival implied) | implicit |
| 2 | JOIN TODD | none | missing (trivial) |
| - | CLEAN FIRST FLOOR | K01 "Do the chores" | merged |
| 3 | READ "ANDROID POWER!" | R04 item 1 (merged with QB) | mislabelled/merged |
| 4 | READ "CONNECTING THE DOTS" | R04 item 2 | covered |
| 5 | CHECK BACKYARD | none | missing |
| 6 | WASH DISHES | none | missing (Alice up) |
| 7 | TALK WITH ALICE (backyard) | none | missing (Alice up x2) |
| 8 | DISTURB TODD | none | missing |
| 9 | ACTIVATE VACUUM | none | missing |
| 10 | REWASH CLOTHES | none | missing |
| 11 | FIND RED ICE | K01 situation mentions "red-ice paraphernalia on the table" | mislabelled |
| 12 | ENRAGE TODD | none | missing |
| 13 | TAKE OUT TRASH | none | missing (mandatory) |
| 14 | ASK TO GO UPSTAIRS | none | missing (mandatory) |
| 15 | GO UPSTAIRS | none | missing (checkpoint) |
| - | CLEAN SECOND FLOOR | K01 | merged |
| 16 | CLEAN TODD'S ROOM | K01 | merged |
| 17 | TIDY PILLS | none | missing |
| 18 | KARA SEES GUN | K01 option 0 (`gunDiscovered`) | covered, but bundled with the window |
| 19 | CLEAN TOILET | none | missing |
| 20 | ALICE GOES TO HER ROOM | none | missing (event) |
| 21 | CLEAN BATHROOM | none | missing |
| 22 | READ "ANDROID QB" | R04 item 1 (merged) | merged |
| 23 | READ "PUTTING A PRICE" | R04 item 3 | covered |
| 24 | CLEAN ALICE'S ROOM | K01 | merged |
| 25 | VENTILATE ROOM | K01 option 0 ("free Alice's window") | mislabelled, untracked |
| 26 | KARA DISCOVERS A WAY DOWN | K01 option 0 | not tracked in state; K03 window escape ungated |
| 27 | TALK WITH ALICE (room) | none | missing (Alice up x3 or down x1) |
| 28 | ALICE GIVES KARA A KEY | none | missing gate |
| 29 | OPEN ALICE'S BOX | K01b option 0 | covered, but ungated and mislabelled |
| 30 | FINISHED CLEANING | none | missing ending scene (Todd raging and apologizing) |

Also missing (not chart nodes but carried forward): the Alice in Wonderland book (Zlatko recall; Alice up), and the TOY talk (Alice up). Extra content not in the game: the stock-market and New Orleans TV facts in R04.

---

## 8. Open questions (for the operator to check in game)

1. **Triangle icon meaning.** Press Square (SHOW LEGEND) on the chart and record the legend text for the outline triangle (FIND RED ICE, ENRAGE TODD, ALICE GOES TO HER ROOM, ALICE GIVES KARA A KEY) and for the grey/white DISTURB TODD box. My reading is "triggered event" and "unlocked on another playthrough, not the current one".
2. **Key threshold.** The wiki says "at least Neutral" (line 83) and that Distant gets no key (line 195). The transcript labels the success branch "(Alice Is Trusting)". Confirm whether one increase from Distant (to Neutral) is enough, and how many small increases one level takes. No source gives step sizes.
   - Operator observation 2026-11-06: doing all eight positive things (dishes, GAME, BACKYARD, TOY, the book with Alice present, FRIENDLY or DIPLOMATIC, NAME KARA, INTERESTS?) ends the chapter with Alice at **Trusted** in the flowchart header; Family was not reachable. A dishes-only run is pending for the step size.
3. **SEEM QUIET.** PowerPyx says FRIENDLY, NAME KARA, INTERESTS?, SEEM QUIET "All of these make her like you". The transcript and both wiki lists show no increase for SEEM QUIET. Check the on-screen relationship popup.
4. **Which talk lights the first-floor TALK WITH ALICE node:** the backyard menu (GAME/BACKYARD/WEATHER/SCHOOL), the indoor TOY line, or either? Also, does the TOY increase need the first floor to be finished? The chapter page says "after cleaning the first floor"; Relationship_Stat says "after cleaning the house"; the transcript shows TOY available while carrying the bin, a beer or the laundry basket.
5. **Prerequisites for the room talk.** PowerPyx: "You can only talk to Alice after having cleaned at least Todd's room, the Bathroom and Alice's Room. In Alice's room you must also have read the book ... and the books on her shelf". The transcript marks the bathroom optional and makes only both bedrooms mandatory. Check whether the bathroom, book and shelf are really required.
6. **Is VENTILATE ROOM in Alice's room mandatory?** The infobox lists "Ventilate room" under the urgent "Tidy Alice's room", yet the chart and wiki treat it (and the way-down unlock) as optional. Can the room be finished with the window shut?
7. **ALICE GOES TO HER ROOM.** Is it always triggered (it fires on making Todd's bed, which is mandatory), or can it be missed by cleaning Alice's room first?
8. **OPEN ALICE'S BOX** is not drawn as a yellow cross-chapter node, unlike the gun and the window, although the wiki lists it as a cross-chapter impact. Confirm the in-game styling.
9. **Wiki structure vs chart.** The wiki nests "Open Alice's box" beside the key (`##`); the chart makes it a child of the key. The chart is authoritative.
10. **R04 TV facts.** Confirm that the stock market "up 11 percent" and the "New Orleans underwater by 2055" lines do not appear in this chapter's TVs. They may come from another chapter's broadcast.
11. **Alice's age.** The K01 text says "nine-year-old"; no source consulted states it.
12. **Red Ice recall in Zlatko** depends on "washed Todd's clothes" (REWASH CLOTHES). Confirm whether REWASH CLOTHES alone counts or FIND RED ICE is needed (they always occur together).

---

## 9. Sources

- https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ : index; gave the chapter walkthrough link.
- https://www.powerpyx.com/detroit-become-human-a-new-home-walkthrough/ : walkthrough text: node-by-node instructions, magazine locations, the "[CROSS CHAPTER IMPACT]" tags, the key dialogue line (FRIENDLY, NAME KARA, INTERESTS?, SEEM QUIET), and the claimed prerequisites for the room talk.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-1.jpg : full 100% chart overview; node order and edges.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-2.jpg : WELCOME HOME checkpoint and JOIN TODD.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-3.jpg : CLEAN FIRST FLOOR block, TAKE OUT TRASH, ASK TO GO UPSTAIRS; icons (speech bubble, triangles, grey DISTURB TODD).
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-4.jpg : GO UPSTAIRS checkpoint and the CLEAN SECOND FLOOR block, including the yellow KARA SEES GUN and KARA DISCOVERS A WAY DOWN.
- https://www.powerpyx.com/wp-content/uploads/detroit-become-human-a-new-home-5.jpg : TALK WITH ALICE, ALICE GIVES KARA A KEY, OPEN ALICE'S BOX, FINISHED CLEANING.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=A_New_Home&prop=wikitext&format=json : chapter page: infobox objectives, Flowchart text, cross-chapter impacts, Relationship Changes, Notes (saved as /tmp/flowcharts/ch04/wiki.txt).
- https://detroit-become-human.fandom.com/api.php?action=parse&page=A_New_Home_(Transcript)&prop=wikitext&format=json : full transcript: dialogue options, per-option relationship icons, box contents, TV broadcasts, magazine text, the mandatory/optional markers.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json : Alice levels ("Distant (Initial)") and the A New Home small increase/decrease list.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json : confirms no A New Home public opinion events.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json : confirms the stat is Connor-only.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json : magazine list and locations in A New Home.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Power!&prop=wikitext&format=json : ANDROID POWER! text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Connecting_the_Dots&prop=wikitext&format=json : CONNECTING THE DOTS text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_QB&prop=wikitext&format=json : ANDROID QB text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Price_of_Life&prop=wikitext&format=json : THE PRICE OF LIFE text and location.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Stormy_Night&prop=wikitext&format=json : gun and window dependencies ("gun seen in 'A New Home'", "way out seen in 'A New Home'"), plus the note on Todd's room.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Fugitives&prop=wikitext&format=json : gun use paths downstream.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit_-_Kara_Leaving_Detroit&prop=wikitext&format=json (redirects to Battle_for_Detroit) : Meet Todd / Persuade Todd / Fail to Persuade Todd branch.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Zlatko&prop=wikitext&format=json : memory recall of Alice's book and Todd's Red Ice pipe.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Todd_Williams&prop=wikitext&format=json : the family photo in the box unlocks the persuasion option.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Alice_Williams&prop=wikitext&format=json (redirects to Alice) : behaviour in this chapter, the key, the "Treasures" box contents.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Red_Ice&prop=wikitext&format=json : the drug's composition, matching the scan text.
- https://detroit-become-human.fandom.com/api.php?action=parse&page=Chronology&prop=wikitext&format=json : date and time of the chapter; the 225,000 jobs line.
- https://detroit-become-human.fandom.com/api.php?action=query&list=search : searches for "New Orleans", "225,000", "11%" to check the R04 TV facts (no chapter source for New Orleans or 11%).
- Gamerguides and Gamepressure chapter URLs tried for conflict resolution both returned 404; not used.

## 10. Template cross-check

### Source

- Template: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/src/app/chapters/components/chapter-contents/4-new-home-chapter-content/new-home-chapter-content.component.html
- Strings: https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json
- Rendered with `/tmp/dbt-scripts/render.py` (Python, run with `-I`; resolves every `t()` and `translateObject()` key against `en.json`). Outline saved to `/tmp/dbt/ch04.txt`; the same with every dialogue line to `/tmp/dbt/ch04-full.txt`. All keys resolved.
- Counts: 4 prompts (choice groups), 13 options, 3 clues (observation items), 10 stat arrows, 2 unlock conditions, 1 conditioned variants, 0 cut/unused blocks.

Outline key: `PROMPT` is an `app-choice-group`; `OPTION "LABEL"` its `app-choice-item` (brackets `[ ]` as the game draws unlockable options; `TIMEOUT default` marks the option taken when the timer runs out); `ARROW` an `app-relation` (character, small/LARGE, UP/DOWN); `CLUE GROUP` / `CLUE` an `app-observation` and its items (title | sublines); `[LOCK: …]`, `[TIME: …]`, `[TV: …]`, `[DEATH: …]` an `app-unlock-condition` with the transcribers' condition text; `IF …:` one branch of an `app-condition-group`; `CUT/UNUSED >>> … <<<` an `app-unused-content` block (not to be built); `NOTE` the transcribers' own note; `(no effect)` the template's "ø". Dialogue outside prompts is shortened to the first line of each paragraph with a count of the rest; under each option the first line is shown.

### Rendered outline

```text
# At Todd's house
##  [TIME: Take too much time]
Todd: "You comin'?"
## Coming inside
Todd: "You’ve been gone for two weeks, so the place is a mess… You do the housework, the washing,..." (+2 more lines)
## Todd in the living room
Todd: "TV on."
## Todd on the phone
Todd: "Yeah?Maybe... Depends on what you need…Yeah, yeah I can get that. Yeah, yeah I'll bring it..."
## Doing the dishes
CLUE GROUP: Dishwasher
  CLUE: DISHWASHER NOT WORKING | Missing component #573BV | 154 sale offers available
ARROW: Alice small UP
Todd: "Kara!" (+4 more lines)
## Looking at the TV for too long
Todd: "Whatta ya lookin' at?Get the fuck outta here! GET THE FUCK OUTTA HERE!" (+1 more lines)
## Going in front of the TV
Todd: "Outta the way for fuck sake!" (+1 more lines)
## Activating vacuum
Todd: "Alice! You better stop that right now!Why is she always pushin' me? Always pushin’…"
## Going in the garden - Talking with Alice
PROMPT:
  - OPTION "GAME"
    ARROW: Alice small UP
    Kara: "You look bored. Would you like to play a game?"
  - OPTION "BACKYARD"
    ARROW: Alice small UP
    Kara: "You like playing out here?"
  - OPTION "WEATHER"
    Kara: "It's not very nice out. You might catch cold,I could get you a sweater if you want."
  - OPTION "SCHOOL"
    Kara: "Aren't you going to school today?"
## Rewash clothes - Find Red ice
CLUE GROUP: Red ice
  CLUE: RED ICE | Acetone, Lithium, Thirium | Toluene, Hydrochloric acid
Todd: "You shouldn't mess around with my stuff. It makes me nervous…" (+3 more lines)
## Talk to Alice (next to the window)
PROMPT:
  - OPTION "TOY"
    ARROW: Alice small UP
    Kara: "That's a pretty toy… What's its name?"
## Taking out the trash – enter the house again
Todd: "What the fuck, man?"
## Background dialogues
Todd: "Fucking headache, man. The girl's a fucking headache."
## Going upstairs
Kara: "I’ve made a good start down here. I’ll head upstairs." (+1 more lines)
# In Todd's room
CLUE GROUP: Antidepressants
  CLUE: ANTIDEPRESSANT | Contains Tianeptine | Risk of behavioral disorders
##  [TV: Watch TV]
Michael Webb - Channel 16: "And now to sports. First up, basketball: as the Gears prepare for their critical match wit..." (+2 more lines)
## Running into Todd
Todd: "Watch it."
# In Alice's room
CONDITION GROUP:
  IF Todd's room was cleaned before Alice's room:
    Kara: "I just want to tidy up your room a little. I only need two minutes. Is that okay, Alice?"
## Looking at the book on the floor
ARROW: Alice small UP
Kara: "Alice in Wonderland…of course…"
## Looking at books
Kara: "Seems you like reading…"
## Talking with Alice
PROMPT:
  - OPTION "FACTUAL"
    Kara: "If you give me some personal information, I could take better care of you."
  - OPTION "FRIENDLY"
    ARROW: Alice small UP
    Kara: "I'm sure we used to be friends before I was reset. Maybe we can be friends again."
  - OPTION "DIPLOMATIC"
    ARROW: Alice small UP
    Kara: "I know I used to live here, but they erased my memory… I thought maybe you could help me get my bearings, give..."
PROMPT:
  - OPTION "NAME KARA"
    ARROW: Alice small UP
    Kara: "Your father said you chose my name. Kara, it's nice. How did you choose it?"
  - OPTION "INTERESTS?"
    ARROW: Alice small UP
    Kara: "You should tell me about yourself, what you like to do, where you like to go, your favorite foods… That would..."
  - OPTION "SEEM QUIET"
    Kara: "You're very quiet. I hope I don't scare you."
  - OPTION "MOTHER?"
    ARROW: Alice small DOWN
    Kara: "What about your mother? Will she be home soon?"
  - OPTION "LEAVE ALONE"
    Kara: "Okay. I can see you want some space. I'll leave you alone…"
# Going back downstairs
Todd: "What are you doing?" (+2 more lines)

```

### Flowchart labels as the game prints them

`MENU.FLOWCHART.01KB` (35 keys): WELCOME HOME, JOIN TODD, DISTURB TODD, TAKE OUT TRASH, CHECK BACKYARD, WASH DISHES, TALK WITH ALICE (first floor), CHECK TABLET, ACTIVATE VACUUM, REWASH CLOTHES, FIND RED ICE, ENRAGE TODD, CLEAN FIRST FLOOR, GO UPSTAIRS, TALK WITH ALICE (`TALK01`, `TALK02`), CLEAN BATHROOM, CLEAN TODD'S ROOM, CLEAN TOILET, CLEAN ALICE'S ROOM, VENTILATE ROOM, KARA DISCOVERS A WAY DOWN, TIDY PILLS, KARA SEES GUN, ALICE GOES TO HER ROOM, CLEAN SECOND FLOOR, ALICE GIVES KARA A KEY, OPEN ALICE’S BOX, FINISHED CLEANING, TIDY BOOKS, READ "ANDROID QB", READ "PUTTING A PRICE", ASK TO GO UPSTAIRS, READ "ANDROID POWER!", READ "CONNECTING THE DOTS". Every chart node in section 1 matches. CHECK TABLET and TIDY BOOKS are in the table but not on the chart (the same two appear in the older `01KA` set); treat as cut. The table has two keys for the room talk (`TALK01`, `TALK02`) where the chart draws one node.

### Template against sections 1 to 3

Agreements: all ten arrows match section 3 exactly (Alice small up for WASH DISHES, GAME, BACKYARD, TOY, the book, FRIENDLY, DIPLOMATIC, NAME KARA, INTERESTS?; Alice small down for MOTHER?), and the template confirms no arrow on WEATHER, SCHOOL, FACTUAL, SEEM QUIET, LEAVE ALONE, the vacuum, the TV, the laundry and "Looking at books". The three clues (DISHWASHER NOT WORKING, RED ICE, ANTIDEPRESSANT) match. The condition "Todd's room was cleaned before Alice's room" (Kara's "I only need two minutes" line) matches.

| # | Topic | Template | Note | Which wins |
|---|---|---|---|---|
| T1 | Label of the mother line | "MOTHER?" | "MOTHER" (section 2 menu list and the Relationship mapping) | Template |
| T2 | TOY line | "That's a pretty toy… What's its name?" | "That's a pretty toy! What's it's name?" | Template |
| T3 | Where TOY is offered | Section "Talk to Alice (next to the window)", after the red ice | "Downstairs, anywhere" | Template places it; minor, the wiki allows any time |

Discrepancies with the note: 3 (all labels or wording).

### Template against the benchmark scenes (story 1.6.0)

Every template prompt, clue and arrow is present. Arrows in the engine: `K01a` option 1 (dishes) +1, option 7 (TOY) +1; `K01y1`/`K01y2` GAME and BACKYARD +1; `K01d` option 8 (book, Alice present) +1; `K01e` FRIENDLY and DIPLOMATIC +1; `K01f`/`K01g` NAME KARA and INTERESTS? +1, MOTHER? -1. The engine applies no arrow the template lacks. Clues: `K01a` options 1 and 4, `K01d` option 1 carry the observation text.

| # | Scene | Template | Benchmark | Fix |
|---|---|---|---|---|
| B1 | `K01y1`, `K01y2`, `K01e`, `K01f`, `K01g`, `K01a` option 7 | Button labels GAME, BACKYARD, WEATHER, SCHOOL, FACTUAL, FRIENDLY, DIPLOMATIC, NAME KARA, INTERESTS?, SEEM QUIET, MOTHER?, LEAVE ALONE, TOY | Descriptive texts with the quoted line, no label | Show the label (README) |
| B2 | `K01f` note | SEEM QUIET has no arrow | "PowerPyx counts it as liked, which the operator should check" | Resolved: no change; drop the caveat |
| B3 | `K01y1`/`K01y2` option 2 | "I could get you a sweater if you want." | "I could get a sweater if you want." | Re-quote |
| B4 | `K01a` option 8 | Todd: "Do what you have to do but stop botherin' me." | "…but stop bothering me!" | Cosmetic |
| B5 | `K01` | TIME line: Todd "You comin'?" | "You coming?" | Cosmetic |
| B6 | `K01a` option 7 | "That's a pretty toy… What's its name?" | "That's a pretty toy! What's its name?" | Cosmetic |
| B7 | none | "Looking at the TV for too long" (Todd: "Whatta ya lookin' at? Get the fuck outta here!"; Kara: "I'll get back to work."); "Looking at books" ("Seems you like reading…") | Left out | Optional (no prompt, clue or arrow) |

Discrepancies with the benchmark: 7 (none is a missing prompt, clue or arrow; B1 is the systemic label gap, B2 a stale note).
