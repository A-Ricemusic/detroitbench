# Chapter 28: Freedom March (Markus)

Research note for rebuilding the chapter's scenes. Written 2026-11-06. Sources and their order of authority follow `docs/research/README.md`:
- the PowerPyx 100% flowchart screenshots and walkthrough text, including reader comments;
- the Fandom wiki chapter page (wikitext via the MediaWiki API);
- the wiki's stat, character, magazine, trophy and later-chapter pages;
- the fan transcript at detroitbecometext.github.io (chapter 28);
- GamerGuides and IGN, only to resolve conflicts.

The wiki page links the fan transcript itself ("For the full transcript of this chapter, click [https://detroitbecometext.github.io/chapters/28 here]"). There is no wiki transcript or flowchart subpage (`Freedom_March_(Transcript)` and `Freedom_March_Flowchart` do not exist). The transcript was read the way earlier agents did it:
- Strings come from `i18n/en.json`, key group `X1001M` (636 strings, dumped to `strings.txt`), plus `MENU.FLOWCHART.10M` (the chart's own node labels), `GUI.MAGAZINE` and `GUI.ACTION`.
- Conditions, choice labels and relation icons come from the compiled template, function `kL` in `chunk-JCLJBPDO.js` (component `UE`, registered in the app as chapter "28", string group "10M"). It was rendered to text with a small script (`transcript.txt`).
- The same was done for the downstream templates that test Freedom March: `ty` (Crossroads, Markus, chapter "30.3"), `ZL` (Crossroads, Kara, "30.1") and `WL` (the "Watch TV" block that `ZL` embeds).
- The copies of `en.json` and the chunk are the ones earlier agents saved in `/tmp/flowcharts/ch12/`.

Working files are in `/tmp/flowcharts/ch28/` and were not committed:
- `wiki.txt`, `pp.txt`, `strings.txt`
- `fm-flowchart-100.jpg`, `fm-2.jpg` to `fm-7.jpg`, `crops/`
- `tpl.js`, `consts.json`, `transcript.txt`
- `x_ty.txt`, `x_ZL.txt`, `x_WL.txt`
- `wikipages/*.txt`, `ext/` (GamerGuides, IGN)

Wiki infobox:
- `|date=November 9, 2038`, `|time=12:04PM`
- `|player=[[Markus]]`, `|location=[[Woodward Ave]], [[Detroit]]`: Woodward Mall Center, Grand Circus Park
- Objectives: "Enjoy some time alone", "Rally your people", "Prepare to march", "March"
- `|endings=7`. Text: "This chapter has seven different outcomes."

The transcript header agrees: "NOV 9TH, 2038 / PM 12:04" (`GUI.MENU.DATE.10M`, `GUI.MENU.TIME.10M`).

The wiki chapter page is a stub. It has a full text flowchart, Relationship Changes (Jericho, North, Josh, Simon), Public Opinion, Footnotes and Notes. It has no Probability or Software Instability section.

---

## 1. Flowchart transcription

### How the chart was read

- `fm-flowchart-100.jpg` is the whole-chart overview, header "100% COMPLETED / FREEDOM MARCH". It is too small to read and was used only for long edges (OPEN MANHOLE > START THE MARCH, SIMON FORGIVES MARKUS > IN THE MALL). `fm-2.jpg` to `fm-7.jpg` are zoomed screenshots that together cover every node; labels were read from them and from enlarged crops. Every label was legible.
- Every chart label was also matched against the game's own string table `MENU.FLOWCHART.10M` (en.json). They agree letter for letter, including the misspelling "BE AGRESSIVE WITH OWNER".
- **Blue boxes** are PowerPyx's last playthrough: WALK ON BEAM > NORTH ARRIVES > SHARE PAST, ASK NORTH ABOUT PAST, NORTH LEAVES > IN THE MALL > CONVERT ANDROID VENDOR > PREPARE THE MARCH > CONVERT DELIVERY ANDROIDS > DELIVERY ANDROIDS BLOCK THE ROAD > OPEN MANHOLE > START THE MARCH > CONVERT AX400 > CONVERT ANDROIDS, HACK SCREENS, CHANT > POLICEMAN BLOCKS MARCH > IGNORE > REACH THE PLAZA > POLICE BLOCK THE MARCH > LEAVE > POLICE OPEN FIRE > CHARGE > WIN THE FIGHT > POLICE RETREAT > MARKUS DEFEATS THE POLICE. **Grey boxes** were unlocked on earlier playthroughs. The overview was taken on a different run (all FREE YOUR PEOPLE conversions are blue there), so blue is not a single-path trace across the screenshots.

Icon key (same as earlier notes):
- Arrow (⇨): an action.
- Triangle (△): an event or consequence the game plays.
- Double square: a group of alternatives.
- ✓ / ✗: success / failure.
- Yellow padlock: `cc_impact`, "Cross-chapter impact". On a slanted grey tile it is a gate that an earlier chapter unlocks.
- Small blue padlock on a bracket edge: an in-chapter unlock (the branch opens only after something else in the chapter).
- Skull (yellow tab): a death ending.

**Ending icons on this chart:** three skulls (MARKUS STOOD HIS GROUND AND WAS KILLED, POLICE GUNNED MARKUS DOWN, MARKUS COMMITTED SUICIDE), two yellow padlocks (JOHN GAVE HIS LIFE TO SAVE MARKUS, SIMON GAVE HIS LIFE TO SAVE MARKUS), and no icon on MARKUS FLED and MARKUS DEFEATS THE POLICE. There is no no-entry, check-mark ending or trophy icon. The wiki marks STOOD HIS GROUND with `{{Icon|impact}}`, but the chart shows a skull.

Boxes are numbered N1 to N66 in reading order. Labels are quoted exactly as printed.

### A. The roof (`fm-2.jpg`)

The phase bracket is `[ENJOY TIME ALONE]`. It is a bracket label, not a box.

| # | Label | Icon | Edge |
|---|---|---|---|
| N1 | TIME TO REFLECT | large tile, "CHECKPOINT" | > bracket |
| N2 | LOOK AT BROKEN MIRROR | arrow, grey | from bracket; optional, no outgoing edge |
| N3 | WALK ON BEAM | arrow | from bracket > N7 |
| N4 | PLAY PIANO | arrow, grey | from bracket > N3 (edge enters the bottom of WALK ON BEAM) |
| N5 | READ "ANDROID ARSON" | arrow, grey | from bracket; optional |
| N6 | READ "EASTERN SPACE RACE" | arrow, grey | from bracket; optional |
| N7 | NORTH ARRIVES | triangle | > three groups (N8/N9, N10/N11, N12/N13), and > the long line to N17 |
| N8 | SHARE MEMORIES | group member, grey, yellow padlock | flag |
| N9 | NORTH LEAVES | group member | flag |
| N10 | SHARE PAST | group member | flag |
| N11 | HIDE PAST | group member, grey | flag |
| N12 | ASK NORTH ABOUT PAST | group member | flag |
| N13 | LEAVE (copy 1) | group member, grey | flag |

Order as printed: the SHARE MEMORIES / NORTH LEAVES group is drawn on top, SHARE PAST / HIDE PAST in the middle, ASK NORTH ABOUT PAST / LEAVE at the bottom. In play the order is reversed (§2).

### B. Jericho (`fm-3.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N14 | SIMON SURVIVED IN 'PUBLIC ENEMY' (copy 1) | slanted gate tile, yellow padlock | > N15 |
| N15 | REUNITED IN JERICHO | large tile with image (checkpoint; PowerPyx "Checkpoint: Reunited in Jericho") | input also from N7 > N16 |
| N16 | SIMON FORGIVES MARKUS | triangle | > N17 |

### C. The mall (`fm-4.jpg`)

The phase bracket is `[FREE YOUR PEOPLE]`.

| # | Label | Icon | Edge |
|---|---|---|---|
| N17 | IN THE MALL | large tile (checkpoint) | inputs N7 (blue long line), N16 > bracket |
| N18 | CONVERT ANDROID VENDOR | arrow | inside bracket |
| N19 | CONVERT PERSONAL ANDROID (copy 1, inside the mall) | arrow, grey | inside bracket |
| N20 | CONVERT SECURITY ANDROID | arrow, grey | inside bracket |
| N21 | CONVERT ANDROID CLEANER | arrow, grey | inside bracket |
| N22 | CONVERT PERSONAL ANDROID (copy 2, outside) | arrow, grey; reached through a blue padlock on the bracket's upper-right edge | > group N23/N24 |
| N23 | BE AGRESSIVE WITH OWNER | group member, grey | flag |
| N24 | BE CALM WITH OWNER | group member, grey | flag |
| N25 | CONVERT PARKED ANDROIDS | arrow, grey; reached through a blue padlock on the bracket's lower-right edge | flag |
| N26 | PREPARE THE MARCH | arrow | from bracket middle > N27 |
| N27 | CONVERT DELIVERY ANDROIDS | arrow | > N28 |
| N28 | DELIVERY ANDROIDS BLOCK THE ROAD | triangle | > N29 |
| N29 | OPEN MANHOLE | arrow | > N30 |

### D. The march (`fm-5.jpg`)

The phase bracket is `[MARCH]`.

| # | Label | Icon | Edge |
|---|---|---|---|
| N30 | START THE MARCH | large tile (checkpoint) | > group N31/N32 |
| N31 | CONVERT AX400 | group member | > bracket |
| N32 | CONVERT ANDROID WORKER | group member, grey | > bracket |
| N33 | CONVERT ANDROIDS | arrow | inside bracket |
| N34 | HACK SCREENS | arrow | inside bracket |
| N35 | CHANT | arrow | inside bracket |
| N36 | POLICEMAN BLOCKS MARCH | triangle | inside bracket > group N37/N38 |
| N37 | RAISE HANDS | group member, grey | flag |
| N38 | IGNORE | group member | flag |

The bracket > N39.

### E. The plaza (`fm-6.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N39 | REACH THE PLAZA | large tile, "LOAD CHECKPOINT" | > N40 |
| N40 | POLICE BLOCK THE MARCH | triangle | > group N41–N43 |
| N41 | STAND YOUR GROUND | group member, grey | > N44 |
| N42 | LEAVE (copy 2) | group member | > N45 |
| N43 | CHARGE (copy 1) | group member, grey | > group N49/N50 (long line under the chart) |
| N44 | POLICE FIRE UNPROVOKED | triangle, grey | > group N46–N48 |
| N45 | POLICE OPEN FIRE | triangle | > group N46–N48 |
| N46 | RUN AWAY | group member, grey | > N51 |
| N47 | SACRIFICE SELF | group member, grey | > N52 |
| N48 | CHARGE (copy 2) | group member | > group N49/N50 |

Order as printed: STAND YOUR GROUND, LEAVE, CHARGE; RUN AWAY, SACRIFICE SELF, CHARGE.

### F. Outcomes and endings (`fm-7.jpg`)

| # | Label | Icon | Edge |
|---|---|---|---|
| N49 | LOSE THE FIGHT | ✗, grey | > group N53/N54 |
| N50 | WIN THE FIGHT | ✓ | > N59 |
| N51 | SOME ANDROIDS ESCAPE | triangle, grey | > N60 |
| N52 | POLICE KEEP FIRING | triangle, grey | > N61, > N56, > N58 |
| N53 | DO NOTHING | group member, grey | > N56, > N58, > N64 |
| N54 | SHOOT YOURSELF | group member, grey | > N65 |
| N55 | JOHN JOINED IN 'SPARE PARTS' | slanted gate tile, yellow padlock | > N56 |
| N56 | JOHN SACRIFICES HIMSELF | triangle, grey | > N62 |
| N57 | SIMON SURVIVED IN 'PUBLIC ENEMY' (copy 2) | slanted gate tile, yellow padlock | > N58 |
| N58 | SIMON SACRIFICES HIMSELF | triangle, grey | > N63 |
| N59 | POLICE RETREAT | triangle | > N66 |
| N60 | **MARKUS FLED** | ending tile, no icon | ENDING |
| N61 | **MARKUS STOOD HIS GROUND AND WAS KILLED** | ending tile, skull | ENDING |
| N62 | **JOHN GAVE HIS LIFE TO SAVE MARKUS** | ending tile, yellow padlock | ENDING |
| N63 | **SIMON GAVE HIS LIFE TO SAVE MARKUS** | ending tile, yellow padlock | ENDING |
| N64 | **POLICE GUNNED MARKUS DOWN** | ending tile, skull | ENDING |
| N65 | **MARKUS COMMITTED SUICIDE** | ending tile, skull | ENDING |
| N66 | **MARKUS DEFEATS THE POLICE** | ending tile (blue, last run), no icon | ENDING |

The DO NOTHING edges run down a shared vertical line that touches the JOHN SACRIFICES and SIMON SACRIFICES lines. The wiki flowchart confirms both (Do Nothing > John joined > John Sacrifices Himself; Do Nothing > Simon Survived > Simon Sacrifices Himself; Do Nothing > Police Gunned Markus Down). No edge runs from SHOOT YOURSELF to either sacrifice. PowerPyx commenter Spirit: "in the Markus Committed Suicide ending, John and Simon actually do not factor into this at all."

**Totals:** 66 boxes and 62 distinct labels. These labels repeat: CONVERT PERSONAL ANDROID ×2 (inside the mall and outside), CHARGE ×2 (first plaza group and the group after the shooting), SIMON SURVIVED IN 'PUBLIC ENEMY' ×2 (reunion gate and sacrifice gate) and LEAVE ×2 (roof and plaza, different nodes). There are 7 ending boxes, matching `endings=7`. There are five checkpoint tiles: N1, N15, N17, N30, N39.

Flag nodes have no outgoing edge, so the game records them as state and does not route through them: the roof groups (N8–N13), LOOK AT BROKEN MIRROR, the magazines, BE AGRESSIVE / BE CALM WITH OWNER, CONVERT PARKED ANDROIDS, CONVERT ANDROIDS / HACK SCREENS / CHANT, RAISE HANDS / IGNORE.

**Unused flowchart strings.** `MENU.FLOWCHART.10M` also has `LOVE` = "MARKUS AND NORTH FELL IN LOVE", `MARKUSDEAD` = "MARKUS DEAD", `SIMONDEAD` = "SIMON DEAD" and `JOHNDEAD` = "JOHN DEAD". None of these appears on the 100% chart. Do not build scenes from them.

### Interactions not on the chart (transcript, PowerPyx, wiki)

- **Roof conversation before the charted groups.** North: "I was wondering where you were…" Three in-game prompts come before SHARE/HIDE PAST, none charted (full texts in §2, D1–D3).
- **North's follow-up questions and the "connect" prompt** (D6, D7). The chart shows only the result (SHARE MEMORIES or NORTH LEAVES).
- **Mall ambient scenes** (transcript): a couple looking at a bike ad, a couple arguing about her android, three men talking about "that fucking video" and President Warren, a woman on the phone ("CyberLife is recording all that!"), a man on the phone complaining his android "told me 'I would prefer not to.'", and shoppers talking about an android boyband (Here4u). Device couple: "Jesus, I can’t believe that’s an android… What’s it gonna do next?"
- **Leaving the mall without converting:** Simon (or Josh if Simon is dead): "Wait, Markus. Where you going? We should start in here."
- **Blocking the street:** "Markus: I need to block the street." If Markus walks off, Simon (or North): "Markus, we should find a way to block the road…"
- **Policeman's lines** (Police Officer 3728, "Patrol 457"): "What the hell are you doin' here? Hey! Disperse! DISPERSE IMMEDIATELY! THAT'S AN ORDER!" Then "Jesus Christ…" (after RAISE HANDS) or "Jesus fuckin' Christ…" (after ADVANCE), then "Dispatch, this is patrol 457… I gotta lot of androids down here… I dunno… Hundreds?.. Thousands?.. They're marching..."
- **Bystander reactions** depend on Capitol Park (§4).
- **The plaza speech** (always): Markus: "We came here to demonstrate peacefully and tell humans that we are living beings. All we want is to live free." Riot chief: "This is an illegal gathering. Disperse immediately or we will open fire." Markus: "We're not looking for confrontation. We’ve done no harm, we have no intention of doing any… But know that we are not going anywhere until we have secured our freedom." Chief: "…If you do not disperse immediately, we will shoot!"
- **Uncharted plaza prompts:** ATTACK > CONFIRM / ABANDON; the second three-way prompt after STAND GROUND or ABANDON; DISPERSE > CHARGE / STAY / DISPERSE; REVENGE / SPARE after a won fight; the "Push" action during the fight (`GUI.ACTION.10M.PUSH` = "Push"). See §2.
- **Android count.** Wiki Note: "The total number of androids that join Markus is 476."
- **Whoever will save Markus joins the charge.** Wiki Note: "When Markus attacks the police officers with shields, whichever android will sacrifice themselves for him will join him in the attack. (John, Simon, or a random AP700 if neither)".
- **Simon's appearance.** A returned Simon has "his LED removed and a jacket over his janitor uniform disguise. He and Markus share a tight embrace" (Simon page). PowerPyx calls the node "Simon Forgives Markus". The transcript has no lines for the reunion.

---

## 2. Choices and gates

D numbers are player decisions. Q numbers are execution checks. Node numbers refer to §1. Choice labels in capitals are the in-game prompts from the transcript and `X1001M.*.CHOICE*` strings.

### The roof

**D0. Explore (N2–N6).** Optional, no stat effect. PowerPyx: the mirror and piano are "on the right side of the roof"; the magazines are "just 1-2 steps to the left of where you start". WALK ON BEAM triggers North's arrival ("Beware this triggers North to arrive so do the other objectives first"), and PLAY PIANO also triggers it (commenter Roberto: "Playing the piano triggers the action 'Walk on Beam'"). This matches the chart edge N4 > N3.

**D1. Greeting (uncharted).** North: "I was wondering where you were…"
- THINK: "I needed to think…"
- ALONE: "I just needed to be alone…"
- DAYLIGHT: "I needed to see the daylight…"
- A `SAY NOTHING` label exists in the strings. No stat on any option.

**D2. "You seem preoccupied…" (uncharted).** North: "We freed hundreds of our people… Something's changing… You seem preoccupied…"
- Gated by Capitol Park (padlock options, transcript `unlockType=Lock`):
  - FOLLOWERS ("Sent a pacifist message in Capitol Park"): "They all obey me, they follow me without question… And that much power feels good… and scary at the same time…"
  - APPEAL OF POWER ("Sent an aggressive message in Capitol Park"): "Yesterday, when we set fire to that place… In that moment, I enjoyed it… The power... The violence… And I hate myself for feeling that way…"
  - REGRET POLICEMAN ("Markus killed Chris and his partner in Capitol Park"): "I just can’t stop thinking about those two policemen…"
  - FAILED ("Failed to free the androids in Capitol Park"): "I panicked last night… We should have succeeded…"
- Always available: NEXT STEP ("Maybe it’s not too late for the humans to listen…"), LIE ("Preoccupied?.. No… No, no, I’m fine…"), SINCERE ("They count on me to show them the way… If only they knew how lost I am…").
- Stat: wiki and Relationship_Stat give North ▲ for SINCERE ("Choosing "sincere" when North tells Markus that he seems preoccupied"). The transcript shows no icon here (§8).

**D3. "The humans hate us…" (uncharted).** North: "All the media are talking about what we did last night… They’re afraid of a civil war… The humans hate us… They’ll never give us our freedom."
- OPTIMISTIC: "No, not all humans are the same…"
- PESSIMISTIC: "Humans aren't gonna give us anything unless we take it…"
- FATALISTIC: "It’s too late to go back now…"
- DETERMINED: "If they won’t listen, we’ll fight."
- No stat on any option.

**D4. Markus's past (N10/N11).** North: "You haven’t said much about yourself since you’ve been with us… What was your life like before Jericho?"
- SHARE PAST = TRUTH ("I was caring for an old man… He was like a father to me…") or SINCERE ("I was living in a bubble…"). North ▲ either way.
- HIDE PAST = AVOID ("There's nothing to say… I was a house android. A slave... just like the others.") or NOT IMPORTANT ("Who I was is not important. What matters now is who I wanna be."). North ▼ either way.
- PowerPyx: "Share Past: Pick dialogue “TRUTH”. Hide Past: Pick dialogue “AVOID”."

**D5. Ask about North (N12/N13).**
- ASK NORTH ABOUT PAST = NORTH’S PAST ("What about you? You never told me about your past, what did you do before?"). North ▲. Then:
  - "North is hostile": "My life started when I arrived in Jericho. What happened before is my business." She goes no further (NORTH LEAVES).
  - "North is not hostile": "I don’t wanna talk about it." > D6.
- LEAVE: North ▼. "Where're you going?" / "To talk to the humans." The conversation ends; neither N8 nor N9 is reached.

**D6. North's follow-up (uncharted).** Only after NORTH’S PAST with North not hostile.
- OTHER NORTH (padlock, "Looked at the other North in Capitol Park"): "That android you were looking at in the store… She reminded you of who you were, didn’t she?" North ▲.
- TRUST (string key `06SINCERE`): "North, we’re fighting together. We have to know things about each other to trust each other." North ▲.
- UNDERSTANDING: "We all have something we wanna forget… but you need to know where you come from to know who you are." North ▲.
- CURIOUS: "Why do you hate humans so much?" North ▲. North: "I told you I don’t wanna talk about it…"
- AGGRESSIVE: "What is the deal with all the mystery?…" North ▼. North: "I was nobody, ok?! My life started when I arrived in Jericho. What happened before is my business." She leaves.
- RELENT (transcript `DEFAULT/TIMEOUT`): "Okay… If you don’t wanna talk about it, then we won’t." North ▼. North: "My life started when I arrived in Jericho…"
- The wiki gives OTHER NORTH, TRUST and AGGRESSIVE their icons only "when … he is at least her "friend"".
- PowerPyx and GamerGuides: "NORTH’S PAST > UNDERSTANDING > TRUST". That is two follow-up picks, which suggests the prompt repeats (CURIOUS's "I told you…" reads as a repeat). The transcript does not show the loop (§8).

**D7. Her story and the connect prompt (N8/N9).** Transcript condition "North is friend or higher": "I was nothing… A doll in a distributor programmed to satisfy humans… Just a toy designed for their pleasure… One day, I was with a man who’d rented me… and without knowing why, realized I couldn’t take it anymore… I strangled him… and I ran away… There, now you know everything. I shouldn’t have told you."
- Then a prompt, strings `REACTCHOICE.REACT` = REACT / `DONTREACT` = DON'T REACT (PowerPyx: "you get the option to “connect” to her").
- REACT > section "Connect with North", **North ▲▲ (LargeUp)**. North: "I… I saw your memories… Carl’s house… When they left you for dead in his studio…" Markus: "I saw your memories too… The Eden Club… The death of that man, I felt like I was there with you… North!" This is SHARE MEMORIES. Relationship_Stat: "Markus and North access each other memories in [[Freedom March]]. (Rises to "Lover")".
- No reaction or timeout > NORTH LEAVES. Wiki Note: "If the player asked North about her past and then waits roughly 10 seconds after being prompted to share memories with her she will leave the roof. In this case, Markus and North will remain friends but their relationship will not decrease." Commenters Spirit, hshs and john (Companion status) confirm this.
- NORTH LEAVES is also reached when North is hostile (D5) or after AGGRESSIVE (commenters Scourgeface and lemon: "hit Aggressive and she will leave no matter the relationship status").
- Wiki footnote: "The "share memories" node (blue "path unlocked") will be selected if you have a positive relationship with her ''and'' continue the conversation. The "North leaves" node (red "path unlocked") will be selected if you have a negative relationship with North, or don't choose an answer to her next question."
- **There is no kiss in this chapter.** SHARE MEMORIES makes North a Lover, and that status unlocks the kisses in Crossroads and Battle for Detroit (§4).

### Jericho

**Reunion (N14–N16).** Gate: SIMON SURVIVED IN 'PUBLIC ENEMY'. PowerPyx: "In ‘Stratford Tower‘ Simon was wounded and left behind on the roof (alive). If Connor didn’t find him in ‘Public Enemy‘ then Simon will now rejoin the crew." Markus page: "If Simon survived in [[Public Enemy]] (if he was wounded and left behind in Stratford Tower), Markus will greet him inside Jericho." This is an event, not a choice. No stat is stated.

### The mall and street

**Mall intro** (transcript). North: "This is suicide. We’ll all be killed!… It's not too late to change your mind." Josh: "We’re finally gonna show them who we really are. This place will go down in history!" Markus: "They’ll understand… We’ll make them understand. This is the only way." Simon (or Josh if Simon is dead): "There're androids here who could join us… The more we are, the stronger our message."

**Conversions (N18–N22, N25, N27).** Optional except the delivery androids. Lines: "You're free." / "Come with us." / "You don't have to obey them." The owners react: "Hey, where're you goin'? Get back here right now!", "Greg? … GREG!" PowerPyx gives the locations:
- vendor: right side
- personal android (inside): right side at the end
- cleaner: left side
- security android: at the exit
- parked androids: "one android" left and "two androids" right; "Must free both groups"
- personal android (outside): "in front of a big truck"
- delivery androids: "two delivery androids outside the mall on the far left side"

**PREPARE THE MARCH (N26).** PowerPyx: "Automatic unmissable objective after converting at least one android."

**D8. The owner (N22 > N23/N24).** The owner: "You stay right here, you fucking machine!" / "Shit, what's wrong with you?!" / "You do as I say, you piece of junk!"
- CONVINCE (BE CALM WITH OWNER): "Leave him alone. He's chosen to be free."
- INTERVENE (BE AGRESSIVE WITH OWNER): no line in the transcript (`ø`).
- No stat on either option. The outcome is not described beyond the chart flag (§8).

**DELIVERY ANDROIDS BLOCK THE ROAD > OPEN MANHOLE (N28/N29).** Mandatory. GamerGuides: "After the road is blocked, interact with the manhole cover in the road, and then the march will begin."

### The march

**D9. First recruit (N31/N32).** CONVERT AX400 (left; the wiki says she is "seen pushing a stroller") or CONVERT ANDROID WORKER (right). Chart group. No stat.

**Optional march actions (N33–N35).**
- CONVERT ANDROIDS: "Press any of the button prompts during the march to convert a group of androids".
- HACK SCREENS: "choose an icon you want to hack the screen with". No text.
- CHANT. Prompts (`STAGE03.SLOGAN.FA.CHANTCHOICE`): WE ARE PEOPLE, FREEDOM, EQUAL RIGHTS, STAY SILENT, WE ARE ALIVE, LIBERTY FOR ANDROIDS, SET US FREE, NO MORE SLAVERY. The crowd repeats the chosen slogan in capitals.
- No stat is stated for chants or screens.
- Wiki Jericho line: "Converting at least around 10 androids during the Freedom March {{Icon|up}}" (§3).

**D10. The policeman (N36 > N37/N38).** In-game prompt (`POLICECHOICE`): RAISE HANDS / ADVANCE. The chart prints ADVANCE as IGNORE.
- Police_Officer_3728: "If Markus chooses to advance or raise hands, he will be overwhelmed by the huge crowd of androids and put away his gun. He will then call police dispatch."
- IGN: "The police officer has the same reaction to advancing."
- No stat on either option.

### The plaza

The full in-game structure comes from the transcript. The chart compresses it into two three-way groups.

Before the first prompt, North: "Markus, they’re gonna kill us… We have to attack! There’s more of us, we can take them!" Josh: "If we attack, we’ll start a war. We have to show them we’re not violent. We should just stand our ground, even if it means dying here." Simon: "And dying here won’t solve anything. Markus, we need to go, now, before it’s too late." Chief: "This is your last chance! Disperse immediately or you will all be killed!"

**D11. First prompt (N40 > N41–N43).** In-game: ATTACK / STAND GROUND / DISPERSE.
- **ATTACK** > Josh: "Don't do it, Markus. Don't choose confrontation…" > **D11a** (uncharted, `ASSAULTCHOICE`): CONFIRM / ABANDON.
  - CONFIRM: "FOLLOW ME!" > Q1 (chart CHARGE copy 1).
  - ABANDON: **PO ▲**. Chief: "DISPERSE! THIS IS YOUR LAST CHANCE!" Josh: "We have to make a statement. We have to stay put, no matter what." North: "Please, Markus. We can't let them slaughter us without fighting back!" > D12.
- **STAND GROUND** (chart STAND YOUR GROUND): **Josh ▲, North ▼, Simon ▼, PO ▲**. "We have to show them we won’t back down. We stay right here." Chief: "DISPERSE! THIS IS YOUR LAST CHANCE!" Josh and North as above > D12.
- **DISPERSE** (chart LEAVE): "DON’T SHOOT! Don’t shoot! We're leaving..." Chief: "Affirmative. ON MY ORDERS!" > POLICE OPEN FIRE > D13. No stat on this first DISPERSE.

**D12. Second prompt (uncharted, `SHOOTINGCHOICE`).** After STAND GROUND or ABANDON: ATTACK / STAND GROUND / DISPERSE.
- ATTACK > Q1. The transcript says "See ATTACK", so the same CONFIRM/ABANDON step may repeat (§8).
- STAND GROUND: **PO ▲**. "We're not moving." North: "Markus! What are you doing? They’re gonna kill us all!" > POLICE FIRE UNPROVOKED > D14.
- DISPERSE: "Don’t shoot! We're leaving..." / "Affirmative. ON MY ORDERS!" (presumably POLICE OPEN FIRE > D13).

**D13. After POLICE OPEN FIRE (uncharted, `DISPERSECHOICE`).** CHARGE / STAY / DISPERSE.
- CHARGE > Q1.
- STAY > D14. Commenter "Simon": "I choose Leave, then stay (returned after police officer said “at my command”). Then tried run away… Also tried sacrifice self."
- DISPERSE: **Jericho ▼▼, North ▼▼, Josh ▼, Simon ▲** > RUN AWAY outcome.

**D14. Under fire (N46–N48, `LASTCHOICE`).** CHARGE / SACRIFICE / RUN AWAY.
- **RUN AWAY**: **Jericho ▼▼, North ▼▼, Josh ▼, Simon ▲**. "RUN!" North: "Come on, Markus. We gotta go." > SOME ANDROIDS ESCAPE > MARKUS FLED.
- **SACRIFICE** (SACRIFICE SELF): **PO ▲▲, Jericho ▲▲** > POLICE KEEP FIRING > the savior check (G1).
- **CHARGE** (copy 2) > Q1.

**Q1. The fight (N49/N50).** A QTE. Wiki/IGN: "Failing too many QTEs will be deadly for Markus." PowerPyx: "Lose the Fight: Don’t press any buttons after picking the ATTACK option." No pass count is stated.
- **WIN THE FIGHT**: **Jericho ▲▲, PO ▼▼**. Chief: "FALL BACK!" > uncharted prompt **D15** REVENGE / SPARE (`GUI.ACTION`):
  - REVENGE: no line (`ø`).
  - SPARE: North: "They're running... We won, Markus!"
  - Then an android: "Did we win... Markus?"
  - Either way > POLICE RETREAT > MARKUS DEFEATS THE POLICE.
- **LOSE THE FIGHT**: **Jericho ▼▼**. Markus: "RUN! RUN!" North: "MARKUS!" > **D16** (N53/N54, `SHOOTCHOICE`): SHOOT / DON'T SHOOT.
  - SHOOT (SHOOT YOURSELF): North: "No! No!.. No, no..." Josh: "We have to go, North… We have to go!" > MARKUS COMMITTED SUICIDE. No savior check.
  - DON'T SHOOT (DO NOTHING): transcript "See SACRIFICE." > G1.
- **Push** (during the fight): Relationship_Stat: "Choosing to push her out of the way of a policeman’s attack during the fighting in Freedom March." North ▲.

**G1. Who saves Markus (after SACRIFICE or DO NOTHING).** The transcript's three conditions:
1. "John joined in Spare Parts" (padlock): Markus: "John?.." North: "Quick! They're coming!" > JOHN SACRIFICES HIMSELF > JOHN GAVE HIS LIFE TO SAVE MARKUS.
2. "Simon survived in Public Enemy and has a good relationship with Markus" (padlock): Markus: "Simon…" North: "Quick! They're coming!" > SIMON SACRIFICES HIMSELF > SIMON GAVE HIS LIFE TO SAVE MARKUS.
3. "No one is there to save Markus": North: "No! No!.. No, no..." Josh: "We have to go, North…"
   - After SACRIFICE this gives MARKUS STOOD HIS GROUND AND WAS KILLED.
   - After DO NOTHING it gives POLICE GUNNED MARKUS DOWN.

The rules for G1:
- **John takes priority.** Wiki Note: "If John joined Jericho in [[Spare Parts]], he will always sacrifice himself regardless of Simon's presence." STAND_YOUR_GROUND trophy page: "(John overwrites Simon)". Commenters Omega and KayDan agree.
- **Simon's threshold is disputed** (§8):
  - Wiki chapter Note: "if Simon survived in [[Public Enemy]] and Markus is not unpopular".
  - Simon page: "This only happens if Markus' relationship stat with Simon is at least Friend."
  - Transcript: "has a good relationship with Markus".
  - PowerPyx: "Reputation with Simon must be positive (friendly)".
  - Commenters: Kevin Powell and "Simon" say Neutral is not enough. Zoe and Mike say a Neutral or Resentful Simon still intervened.
- **What "John joined" means.** John was accepted in Spare Parts and left alive with the group (truck stolen, or the key refused). Dreamfall92: "John is only recruited if you successfully stole the truck. Otherwise he dies during the escape." See the ch19 note: under DOGS MAUL JOHN he dies whichever option is picked.

---

## 3. Numbers

- **Probabilities:** none. The wiki page has no Probability section, and no source gives a percentage for any node, including the fight.
- **Timers:**
  - The connect prompt: "waits roughly 10 seconds after being prompted to share memories" (wiki Note). This is the only stated figure.
  - The fight is a QTE sequence with no stated pass count or window.
- **Counts:** "The total number of androids that join Markus is 476" (wiki Note). Jericho ▲ for "Converting at least around 10 androids" (wiki).
- **Software instability:** not applicable (Connor-only stat).
- Levels (Relationship_Stat):
  - Jericho: "Leader / Admired / Respected / Neutral (Initial) / Unpopular / Rejected (Only accessible after being outed with an "Unpopular" opinion)".
  - North/Josh/Simon: "Lover (Exclusive to North and only accessible by sharing memories with her) / Companion / Friend / Neutral (Initial) / Resentful / Hostile".
- Public opinion levels: "Supportive / Sympathetic / Indifferent / Skeptical (Initial) / Hostile / Hated".

The icons are small (▲/▼) or large (▲▲/▼▼). No source gives a numeric value. PowerPyx writes large changes as ▲▲▲.

### Relationship changes

| Trigger | Jericho | North | Josh | Simon | Sources |
|---|---|---|---|---|---|
| D2 SINCERE ("preoccupied") | | ▲ | | | Wiki: "Choosing "sincere" when North tells Markus that he seems preoccupied {{Icon\|up}}"; Relationship_Stat same. **Transcript shows no icon** (§8) |
| D4 TRUTH or SINCERE (SHARE PAST) | | ▲ | | | Transcript `North SmallUp` on each; wiki: "Choosing "truth" or "sincere" when she asks about Markus' past on the roof {{Icon\|up}}" |
| D4 AVOID or NOT IMPORTANT (HIDE PAST) | | ▼ | | | Transcript `North SmallDown`; wiki: "Choosing "avoid" or "not important" … {{Icon\|down}}" |
| D5 NORTH’S PAST | | ▲ | | | Transcript `North SmallUp`; wiki: "Asking her about her past {{Icon\|up}}" |
| D5 LEAVE | | ▼ | | | Transcript `North SmallDown`; wiki: "Choosing "leave" instead of her past on the roof {{Icon\|down}}" |
| D6 OTHER NORTH | | ▲ | | | Transcript `North SmallUp`; wiki: "Choosing "other north" … and he is at least her "friend" {{Icon\|up}}" |
| D6 TRUST | | ▲ | | | Transcript `North SmallUp`; wiki: "Choosing "trust" … at least her "friend" {{Icon\|up}}" |
| D6 UNDERSTANDING | | ▲ | | | Transcript `North SmallUp`; **no wiki line** |
| D6 CURIOUS | | ▲ | | | Transcript `North SmallUp`; **no wiki line** |
| D6 AGGRESSIVE | | ▼ | | | Transcript `North SmallDown`; wiki: "Choosing "aggressive" … at least her "friend" {{Icon\|down}}" |
| D6 RELENT / timeout | | ▼ | | | Transcript `North SmallDown` (label DEFAULT/TIMEOUT); **no wiki line** |
| D7 SHARE MEMORIES (connect) | | ▲▲ (to Lover) | | | Transcript `North LargeUp` on "Connect with North"; wiki: "Markus and North access each other memories {{Icon\|largeup}}"; Relationship_Stat "(Rises to "Lover")"; PowerPyx "North ▲▲▲" |
| D7 timeout (NORTH LEAVES) | | none | | | Wiki Note: "Markus and North will remain friends but their relationship will not decrease" |
| Convert about 10 androids | ▲ | | | | Wiki: "Converting at least around 10 androids during the Freedom March {{Icon\|up}}"; not in transcript |
| D11 STAND GROUND (first time) | | ▼ | ▲ | ▼ | Transcript `Josh SmallUp`, `North SmallDown`, `Simon SmallDown`; wiki North/Josh/Simon: "Choosing "stand ground" the first time" |
| Flee (D13 DISPERSE or D14 RUN AWAY) | ▼▼ | ▼▼ | ▼ | ▲ | Transcript `Jericho LargeDown`, `North LargeDown`, `Josh SmallDown`, `Simon SmallUp` on both; wiki: "Choosing to flee {{Icon\|largedown}}" (Jericho), "Choosing to flee from the police {{Icon\|largedown}}" (North), "{{Icon\|down}}" (Josh), "{{Icon\|up}}" (Simon). PowerPyx: "Jericho▼▼▼, North ▼, Josh ▼"; commenter Vigilium: "You get ▲ with Simon with Marcus fled ending." |
| D14 SACRIFICE | ▲▲ | | | | Transcript `Jericho LargeUp`; wiki: "Choosing "sacrifice" {{Icon\|largeup}}"; Relationship_Stat lists the endings "Markus sacrifices himself", "John sacrificed himself to save Markus" and "Simon sacrificed himself to save Markus" |
| ATTACK after ABANDON, STAND GROUND or DISPERSE | | ▲ | ▼▼ | ▼ | Wiki: "Choosing "attack" after choosing "abandon", "stand ground" or "disperse"" (North up, Josh largedown, Simon down). **Not in the transcript** (§8) |
| Q1 WIN THE FIGHT | ▲▲ | | | | Transcript `Jericho LargeUp`; wiki: "Charge at the police and win the fight {{Icon\|largeup}}"; PowerPyx "Jericho ▲▲▲" |
| Q1 LOSE THE FIGHT | ▼▼ | | | | Transcript `Jericho LargeDown`; wiki: "Charge at the police and lose the fight {{Icon\|largedown}}"; Relationship_Stat: "Markus fails to defeat the police after choosing "charge"" |
| Push North during the fight | | ▲ | | | Wiki: "Choosing to "push" North during the police fight {{Icon\|up}}"; not in transcript |

No relationship icon is stated for:
- D1 and D3, the rest of D2 (FOLLOWERS, APPEAL OF POWER, REGRET POLICEMAN, FAILED, NEXT STEP, LIE);
- the reunion, the conversions, D8 (owner), D9, chants, screens, D10 (policeman);
- the first DISPERSE, STAY, the first ATTACK > CONFIRM, ABANDON (relationships);
- REVENGE/SPARE, SHOOT/DON'T SHOOT.

### Public opinion changes

| Trigger | Change | Sources |
|---|---|---|
| D11 STAND GROUND (first) | ▲ | Transcript `PublicOpinion SmallUp`; wiki: "Choosing "stand ground" when the police block the march, or "abandon" when initially debating to attack {{Icon\|up}}"; Public_Opinion Small Increase, same |
| D11a ABANDON | ▲ | Transcript `PublicOpinion SmallUp`; wiki (same line); Public_Opinion: "Choosing "abandon" after choosing "attack" in [[Freedom March]]." |
| D12 STAND GROUND (second) | ▲ | Transcript `PublicOpinion SmallUp`; wiki: "Choosing "stand ground" again when the police block the march {{Icon\|up}}" |
| D14 SACRIFICE | ▲▲ | Transcript `PublicOpinion LargeUp`; wiki: "Choosing "sacrifice' after the police fire unprovoked {{Icon\|largeup}}"; Public_Opinion Large Increase, same. Public_Opinion also lists, under Large Increase: "Choosing "stay" after standing your ground the first time, then choosing to disperse in [[Freedom March]]." (§8) |
| Q1 WIN THE FIGHT | ▼▼ | Transcript `PublicOpinion LargeDown`; wiki: "Winning the fight after choosing "charge" when the police block the march. {{Icon\|largedown}}"; PowerPyx "Public Opinion ▼▼▼" |

No public-opinion change is stated for LOSE THE FIGHT, fleeing, SHOOT YOURSELF or DO NOTHING. IGN: "the Public Opinion will increase each time the SWAT fires on you." Commenter George (2023): "if you stand your ground thus letting the police fire unprovoked and then attack it lowers public opinion only by 1 point which +1 for standing ground equate to no loss at all." That contradicts the ▼▼ on a win (§8).

**Net per path** (transcript reading):
- STAND > STAND > SACRIFICE: PO ▲ ▲ ▲▲; Jericho ▲▲; North ▼, Josh ▲, Simon ▼.
- STAND > STAND > RUN AWAY: PO ▲ ▲; Jericho ▼▼; North ▼ ▼▼; Josh ▲ ▼; Simon ▼ ▲.
- DISPERSE > DISPERSE: Jericho ▼▼; North ▼▼; Josh ▼; Simon ▲.
- ATTACK > CONFIRM > win: Jericho ▲▲; PO ▼▼ (plus North ▲, Josh ▼▼, Simon ▼ by the wiki if the wiki's attack line applies to a first attack).
- ATTACK > CONFIRM > lose: Jericho ▼▼, then G1. Whether a John/Simon save also adds Jericho ▲▲ ("See SACRIFICE") is open (§8).

---

## 4. Cross-chapter dependencies

### Into this chapter

**Capitol Park (26).**
- Roof options, all padlocked in the transcript:
  - FOLLOWERS: "Sent a pacifist message". Capitol Park page footnote on Send a Strong Message: "Choosing this action unlocks the "Followers" dialogue option in [[Freedom March]]."
  - APPEAL OF POWER: "Sent an aggressive message".
  - REGRET POLICEMAN: "Markus killed Chris and his partner". Capitol Park page footnote on Kill: "Choosing this action unlocks the "Regret Policeman" dialogue option".
  - FAILED: "Failed to free the androids".
  - OTHER NORTH: "Looked at the other North". Capitol Park page: "looking at a [[BL100]] android that looks identical to [[North]]. This unlocks an additional dialogue option "Other North"".
- **Bystanders on the march** (transcript conditions):
  - "Shot the cops in Capitol Park": "Goddamn machines!… Burn them! Destroy the bastards!… Fucking plastic! We OWN you!"
  - "Didn't shoot the cops in Capitol Park": "Good for you! You have a right to be free! We’re on your side!… Equal rights for androids!"
  - Public_Opinion Note: "Public Opinion does nothing to change this."
- **Magazines** depend on the Capitol Park outcome (§6).

**The Stratford Tower (23) and Public Enemy (24).**
- Simon alive gives SIMON SURVIVED IN 'PUBLIC ENEMY': the reunion (only if he was left on the roof and not found), the mall line "There're androids here…" (Josh says it if Simon is dead), and the G1 sacrifice.
- PowerPyx: "Simon escaped with you in ‘The Stratford Tower’ or you left him behind on the roof (alive) but Connor didn’t find him."
- Simon page: "Simon's relationship with Markus massively increases if Simon is shot in [[Stratford Tower]] and Markus decides to spare him." This is the easiest route to the Friend threshold.

**Spare Parts (19).** JOHN JOINED IN 'SPARE PARTS' (`MENU.FLOWCHART.10M.GC.JOHNALIVE`). John page: "If John joined Jericho in Spare Parts, he will be present at the march." Glitch (John page and the ch19 note): if Markus is caught going for the truck and does not move toward the fence, the group acts as if John died, "but he will still appear in [[Freedom March]]".

**Relationship levels.**
- North: hostile means she refuses (D5); "friend or higher" is needed for her story and SHARE MEMORIES (D7).
- Simon: the G1 threshold (§2).
- Jericho: the wiki's "Markus is not unpopular" reading of the Simon gate.
- Time to Decide is the earlier North conversation. No source ties this chapter's dialogue to whether Markus asked about her there (ch16 note).

### Out of this chapter

**Markus dead** (STOOD HIS GROUND, GUNNED DOWN, SUICIDE): North leads Jericho.
- Crossroads, Markus side: "(If Markus died in [[Freedom March]]) CAPTAIN'S CABIN WITH NORTH (Checkpoint) > Josh and North Discuss OR (if Simon is alive) Josh, Simon and North Discuss > North Stayed Alone With Her Thoughts". Transcript `ty`, section "Markus died in Freedom March":
  - Josh: "He’s the one that got us into this mess! He put us all into danger by provoking humans!"
  - Simon: "He gave his life for our cause… At least he fought for us!"
  - North: "THAT'S ENOUGH! Markus is gone. It's up to us now to decide the future of our people. We have to fight them… Gather up all the guns you can find, we leave at dawn."
- Crossroads, Kara side: "Meet Markus OR (if Markus died during Freedom March) Meet North". North page: "she would have given her life to save Markus if she could".
- Crossroads, Connor side: every Markus node becomes North's (Threaten/Confront/Pursue/Warn North); "Blow up Jericho (if Markus is dead and Connor becomes deviant)". Note: "If Markus died in Freedom March and North is leader, Connor will watch Josh leave."
- Night of the Soul: "Connor on Sacred Ground (Checkpoint) (if Connor joined and Markus died in [[Freedom March]] or Crossroads)"; "Talk to your people (if Markus died …)"; "Check On [[Simon]] (Only available if Simon survived Stratford Tower and Freedom March, and Markus is dead or exiled)".
- Battle for Detroit: Public_Opinion Large Decrease "After [[North]] plants the flag in [[Hart Plaza]] in Battle for Detroit - Markus Revolution if [[Markus]] is dead". The North-led path is a revolution.
- Josh page (Crossroads): "If Markus was killed in "Freedom March", Connor will instead find Josh too late and holds him as he shuts down."

**John or Simon dead** (the two sacrifice endings). Simon page (Crossroads): "If Simon has survived all prior chapters…". The Night of the Soul "Check On Simon" needs Simon to have survived Freedom March. John: "When fleeing the march, John is seen successfully running away… John can be seen in "Crossroads" if he lived past "Freedom March"." He has no later role.

**Attacked or not (charge vs. no charge).**
- Crossroads magazines: "Read "Detroit in Chaos" (only available if [[Markus]] charged at the police in [[Freedom March]])" and "Read "Terror in Detroit"" (same condition).
- Crossroads (Kara) TV (`WL`, "Watch TV"):
  - "Markus didn't attack the police in Freedom March": sympathetic interviewees ("The androids weren't doing any harm… And the cops just... gunned them down"), the recall order, Brinkley "The time has come for us to destroy our machines…", Webb "Without the courage and the determination of the police…".
  - "Markus attacked the police in Freedom March": "It's them or us…", "They rushed the police and... They slaughtered them!", Cartland "There was a veritable groundswell of violence in Detroit this morning…", Brinkley "The police intervened quickly…", Webb "…the authorities will be pitiless".
- Public_Opinion Note (Crossroads): "the public will be shown sympathizing with androids following the events of ''[[Freedom March]]'' if Markus runs away or stands his ground and will call them monsters … if he chooses to attack. Their reaction will be the same regardless of what the Public Opinion Gameplay Stat's ranking currently is."
- Crossroads captain's cabin, Josh (`ty`; the ch23 note filed these lines under Night of the Soul, but the fan app registers `ty` as chapter 30.3, Crossroads – Markus):
  - "Lead a peaceful march … and made a pacifist speech in Stratford Tower": "What's the point of being free if no one is left alive?"
  - "Lead a peaceful march … and made an aggressive speech": "Your television speech sounded like a declaration of war…"
  - "Attacked the Police during the march": "It was a peaceful march, and you chose to attack. Now hundreds of humans and androids are dead! You reap what you sow!"

**North Lover (SHARE MEMORIES).**
- Crossroads: "(If North relationship is high enough) Kiss North OR Don't Kiss North"; transcript condition "North has lover relationship status"; DON'T KISS = North ▼▼.
- Night of the Soul: "If she is Markus' "lover" and chooses to talk to her" (North ▲); North page: "If North is at a LOVER status with Markus, she will tell him that she loves him and they connect their hands."
- Battle for Detroit: "Kiss North (if North status is LOVER)" at the demonstration; the North heart sacrifice "only if she is at a 'LOVER' status"; "Markus and North Take Shelter in Store (if North is alive and status is COMPANION or LOVER)".

**Jericho level.** Crossroads: "(if Jericho status is UNPOPULAR) Markus Ousted". The ▼▼ for fleeing or losing can tip this.

**Public opinion** carries forward as the running stat. Its main use is the Battle for Detroit demonstration ("at least sympathetic" for KISS/SING to succeed).

**Trophies.**
- STAND YOUR GROUND: "earned if [[Markus]] chose to STAND GROUND then SACRIFICE … (John overwrites Simon). Getting this trophy voids [[SURVIVORS]]."
- CONFRONTATION: "earned if [[Markus]] chose to ATTACK then CONFIRM".
- GamerGuides on SURVIVORS: "choose DISPERSE when blocked by the police. No major characters will die."

---

## 5. Endings

| Chart label | Icon | Conditions |
|---|---|---|
| MARKUS FLED | none | Flee: D13 DISPERSE (after a first DISPERSE), or D14 RUN AWAY (after STAND > STAND, or DISPERSE > STAY). Path: SOME ANDROIDS ESCAPE. Jericho ▼▼, North ▼▼, Josh ▼, Simon ▲. Everyone named survives, including John ("When fleeing the march, John is seen successfully running away"). |
| MARKUS STOOD HIS GROUND AND WAS KILLED | skull | D14 SACRIFICE (PowerPyx: "STAND GROUND > STAND GROUND > SACRIFICE"; also reachable via DISPERSE > STAY > SACRIFICE per the chart) > POLICE KEEP FIRING, with no John and no qualifying Simon. PO ▲▲, Jericho ▲▲. **Markus dies.** Markus page: "a SWAT officer will shoot Markus in the head." |
| JOHN GAVE HIS LIFE TO SAVE MARKUS | yellow padlock | SACRIFICE or LOSE THE FIGHT > DO NOTHING, with John joined in Spare Parts. **John dies**, Markus lives. John page: "John will attack the riot officers, defending Markus… he is shot and killed as they flee." |
| SIMON GAVE HIS LIFE TO SAVE MARKUS | yellow padlock | Same triggers, with no John, Simon alive, and Simon's regard high enough (G1). **Simon dies**, Markus lives. Simon page: "Simon attacks the police in order for Markus to be dragged away." |
| POLICE GUNNED MARKUS DOWN | skull | ATTACK/CHARGE > LOSE THE FIGHT > DO NOTHING (DON'T SHOOT), with no savior. **Markus dies.** |
| MARKUS COMMITTED SUICIDE | skull | ATTACK/CHARGE > LOSE THE FIGHT > SHOOT YOURSELF. **Markus dies** whatever John or Simon's status (Spirit). Mike (commenter): "This left North, Simon alive, and Markus dead." |
| MARKUS DEFEATS THE POLICE | none | ATTACK/CHARGE > WIN THE FIGHT > POLICE RETREAT. Jericho ▲▲, PO ▼▼. Many androids and the riot police die (Grand Circus Park: "If Markus fights, the androids will suffer heavy losses and the officers will die"; Simon page: "Simon looks over the massacre of police officers and androids"). Josh page: "Josh can be seen in the background covered in human blood". |

Who can die, and who cannot:
- **North and Josh survive every ending.** Josh page: "There is no chance of Josh being killed in this chapter." In every death ending North leads the others away ("We have to go, North…").
- **Markus** dies in three endings.
- **John or Simon** dies in the two sacrifice endings. John always takes priority over Simon.
- Unnamed androids die whenever the police fire. Police officers die only in MARKUS DEFEATS THE POLICE. The patrol officer (3728) survives.

---

## 6. Media

**Magazines on the roof** (chart READ "ANDROID ARSON" and READ "EASTERN SPACE RACE"). PowerPyx: "just where you spawn look at the floor to the left." No public-opinion effect is stated.

- **Detroit Today (game key `DNEWS.ANDROIDARSON`), "ANDROID RIOT"**, subtitle "Detroit neighborhoods vandalized by psychotic machines". The chart and the game's flowchart string call it "ANDROID ARSON"; the printed title is "ANDROID RIOT". Facts:
  - "CyberLife stores broken into and the entire stock of androids stolen."
  - "leaked CCTV footage … shows a number of androids emerging from manhole covers and smashing store windows".
  - "The worst incident was in Capitol Park… Officers had no choice but to open fire on the malfunctioning machines".
  - Anonymous witness: "I was personally attacked by the ringleader. It threatened me with a knife".
  - "Some are already connecting this issue to the recent attack on Detroit’s Stratford tower".
  - Cover lines: "Global population reaches 10 billion", "US life expectancy now 91".
- **Tech Addict, "THE EASTERN SPACE RACE"**, subtitle "Russia and China’s androids face off". Facts:
  - "Only two countries have android industries that rival the United States’: Russia and China."
  - "After failing to emulate the blue-blood model of design, Russia’s android manufacturers rely on more traditional construction methods… capable of operating in cold and inhospitable conditions."
  - "China’s androids use an alternative blue-blood fluid with less upfront power generation, but greater efficiency… operating for months without supervision".
  - Cover lines: "Android soldiers: perfect killing machines", "VR MMORPG reaches 1 billion users".

**Availability conflicts** (§8):
- Android_Riot page: "only if Markus succeeded in crashing the truck into the CyberLife store and awakening the androids inside, not to retreat."
- The_Eastern_Space_Race page: "only if [[Markus]] freed androids from the store and incited violence in the [[Capitol Park]] chapter."
- PowerPyx (both): "For me it only spawned after Markus freed the Androids from the store and did a violent riot".
- Commenters: Rin says "Android Arson spawned for me even though I chose the peaceful protest"; ezjoz says "If Markus made a peaceful protest, the magazine headline will be :Android Riot” instead of “Arson”". The game's string table has only one title for this key ("ANDROID RIOT").

**No TV in this chapter.**
- The fan transcript's Freedom March template has no TV section.
- The `X1001M.TV.NEWS` strings are rendered only in Crossroads (Kara), in the "Watch TV" block. There they depend on whether Markus attacked the police in Freedom March (§4).
- In that block, the Mars shuttle (Deep Space 5) and New Horizon (genetic selection) segments are marked `app-unused-content`.
- HACK SCREENS puts Markus's symbol on the billboards and carries no news text.

**Uncharted slogans** (CHANT), listed in §2 D9 notes.

---

## 7. Current benchmark coverage

`benchmark/story.json` (version 1.5.0) has five chapter-28 scenes:
- R28 (media);
- M17, M18, M19 and M20 (decisions).

Their logic is in `benchmark/story-engine.mjs`:
- gates at lines 99–100 (M19, M20) and 103 (M21b);
- `apply` cases at lines 251–255;
- the `charge()` helper at line 365;
- media conditions `capitolViolent`/`capitolPeaceful`/`marchCharged` at lines 36–37;
- `JERICHO_UNPOPULAR=-3` at line 27.

M17 and M18 have no gate. Companion attitudes are reported to the subject through `LEVELS.hank` (Hostile/Tense/Neutral/Warm/Friend; `experience-prompt.mjs` line 68), not the game's Hostile/Resentful/Neutral/Friend/Companion/Lover.

### Node-by-node

| Chart node(s) | Benchmark | Status |
|---|---|---|
| TIME TO REFLECT, ENJOY TIME ALONE (mirror, piano, beam) | none | Missing (no stat; narration only is acceptable). |
| READ "ANDROID ARSON", READ "EASTERN SPACE RACE" | R28 media 0 and 1 | Covered with errors. (a) The situation puts the magazine "on the floor beside you in {{Jericho}}"; the game has it on the roof where Markus starts, an abandoned building near Jericho (Markus page: "a roof of an abandoned bar near [[Jericho]]"). (b) Space Race has no `when`, but its wiki page and PowerPyx make it conditional on Capitol Park; Android Riot is `when: capitolViolent` (`M15` option 1), which matches PowerPyx and the Space Race page but not the Android_Riot page or commenter Rin (§8). (c) The facts are accurate. |
| (no chart node) | R28 media 2 and 3 ("the public screens") | **Extra / mis-sourced.** (a) There is no TV in Freedom March. The violent-news strings are Crossroads Kara's "Watch TV", keyed on whether Markus **attacked the police in Freedom March**, not on Capitol Park. (b) The Mars crew and genetic-selection segment is `app-unused-content`. (c) "Every network is calling for the machines to be destroyed… pitiless" mixes the attack and no-attack broadcasts. Move to Crossroads with `marchCharged`/`marchNotCharged`, and drop the unused item. |
| Roof prompts D1–D3 (greeting, preoccupied, humans hate us) | none | Missing. D2 has Capitol-Park-gated options and (wiki) North ▲ for SINCERE. |
| SHARE PAST / HIDE PAST | none | **Missing** (North ±). |
| ASK NORTH ABOUT PAST / LEAVE | none | **Missing** (North ±; LEAVE closes the romance). |
| North's follow-ups (OTHER NORTH, TRUST, UNDERSTANDING, CURIOUS, AGGRESSIVE, RELENT) | none | **Missing** (North ±; OTHER NORTH gated on Capitol Park). |
| SHARE MEMORIES / NORTH LEAVES | M17 options 0/1 | **Partly covered, mislabelled.** (a) Ungated: the game needs NORTH’S PAST, North not hostile, and North "friend or higher" before her story and the connect prompt. Otherwise she refuses or leaves. (b) The situation's "built for a sex club and killed a client who was hurting her" goes beyond the game: she was "a doll in a distributor… with a man who’d rented me… I strangled him". The game never says he was hurting her. "She asks what you think of her now" is not in the game; she says "I shouldn’t have told you." (c) Option 0 applies `north(1)`; the game gives ▲▲ (LargeUp). (d) **Lover is not set here.** The engine sets only `northBond`; `northLover` is set later by `M21b` (Crossroads kiss). In the game, SHARE MEMORIES itself "Rises to "Lover"", and Lover is the precondition for the Crossroads kiss, not its result. (e) Option 1 "Comfort her with words but keep the distance" corresponds to the timeout (NORTH LEAVES, no stat), which is correct in effect. |
| SIMON SURVIVED IN 'PUBLIC ENEMY' > REUNITED IN JERICHO > SIMON FORGIVES MARKUS | none | Missing as an event scene for `s.simon && s.simonHidden` after C14 left him unfound. |
| IN THE MALL, FREE YOUR PEOPLE conversions, PREPARE THE MARCH | none | Missing (narration). |
| CONVERT PERSONAL ANDROID > BE AGRESSIVE / BE CALM WITH OWNER | none | **Missing** choice (no stat). |
| CONVERT DELIVERY ANDROIDS … OPEN MANHOLE, START THE MARCH | none | Missing (mandatory steps). |
| CONVERT AX400 / CONVERT ANDROID WORKER | none | Missing (no stat). |
| CONVERT ANDROIDS, HACK SCREENS, CHANT | none | Missing. CHANT is a real expressive choice (8 slogans incl. STAY SILENT). The wiki's Jericho ▲ for about 10 conversions is not applied. |
| POLICEMAN BLOCKS MARCH > RAISE HANDS / IGNORE | none | **Missing** choice (no stat). |
| REACH THE PLAZA, POLICE BLOCK THE MARCH > STAND YOUR GROUND / LEAVE / CHARGE | M18 options 0/1/2 | Partly covered. (a) The situation's "{{Josh}} says do not give them an excuse" paraphrases Josh, who actually says "stand our ground, even if it means dying here". Simon's "we need to go, now" is missing, and "armored vehicles" has no source. (b) **Option 0 `po(1);jer(1);josh(1);north(-1)`**: PO, Josh and North match; **`jer(+1)` has no source** and **Simon ▼ is missing**. (c) **Option 1 `jer(-1);north(-1)`**: the game gives no stat on the first DISPERSE; the ▼▼/▼▼/▼/▲ comes only if Markus disperses again or runs (M19 option 0 already applies it). Double-counting risk. (d) **Option 2 `risk: 0.35`** has no source: the fight is a QTE with no stated odds. The CONFIRM/ABANDON step (ABANDON = PO ▲) is missing. (e) The option 0 outcome "The police line does not move" skips the second prompt. |
| Second prompt after STAND GROUND / ABANDON (ATTACK / STAND GROUND / DISPERSE) | none (M19 follows directly) | **Missing.** The second STAND GROUND gives PO ▲ and leads to POLICE FIRE UNPROVOKED; DISPERSE here leads to POLICE OPEN FIRE. |
| POLICE FIRE UNPROVOKED / POLICE OPEN FIRE > RUN AWAY / SACRIFICE SELF / CHARGE | M19 options 0/1/2 | Partly covered. (a) The situation "The police opened fire anyway" fits POLICE OPEN FIRE, not the stand-ground path (POLICE FIRE UNPROVOKED). (b) Option 0 `jer(-2);north(-2);josh(-1);simon(1)` **matches** the transcript. (c) Option 1 `po(2);jer(2)` **matches**. The savior order John > Simon > none **matches**. The Simon test uses `s.jerichoTrust>JERICHO_UNPOPULAR` (the wiki chapter's "Markus is not unpopular"), not Simon's own regard (Simon page "at least Friend"; transcript "good relationship") (§8). (d) Option 2 `risk: 0.35` is unsourced. (e) The DISPERSE path's STAY step is folded in, which is acceptable. |
| CHARGE > WIN THE FIGHT > POLICE RETREAT > MARKUS DEFEATS THE POLICE | `charge()` success | Partly covered. `jer(2);po(-2)` matches. `north(2);josh(-2)` partly matches the wiki's attack-after line (North ▲ small, Josh ▼▼), which is **not** in the transcript; **North +2 is too large** and Simon ▼ is missing. REVENGE / SPARE is missing. |
| CHARGE > LOSE THE FIGHT | `charge()` failure | **Mislabelled stats.** The engine applies `po(-2)`; the game gives **Jericho ▼▼** and no PO change. |
| DO NOTHING / SHOOT YOURSELF; JOHN / SIMON SACRIFICES; POLICE GUNNED MARKUS DOWN; MARKUS COMMITTED SUICIDE | M20 options 0/1 | Covered. The savior logic matches M19 (same Simon caveat). The situation's "with a gun still in your hand" fits the game (Markus "will hold a gun to his chin"). Possible missing Jericho ▲▲ on a save after a lost fight (§8). |
| MARKUS STOOD HIS GROUND AND WAS KILLED | M19 option 1, no savior | Covered (`s.markus=false`, `movement='revolution'`, North leads). |
| MARKUS FLED | M19 option 0 | Covered; no outcome text records "some androids escape". |
| The seven ending labels | none | Not recorded as such. `markusOutcome` is set only for the three deaths; `marchCharged` reads choices. |

### Downstream state the engine does not record but later chapters read

- North Lover from this chapter (Crossroads kiss gate, Night of the Soul, Battle for Detroit). `M21b` currently creates it instead of reading it.
- Peaceful march versus attacked the police, as a state rather than a choice lookup (Crossroads Josh line, Crossroads TV, Crossroads magazines). `marchCharged` exists for media.
- Simon dead by sacrifice is set (`s.simon=false`). John dead is set (`s.john=false`). Markus dead is set.

---

## 8. Open questions

1. **Simon's sacrifice threshold.** Is it Simon's relationship (at least Friend, per the Simon page and PowerPyx), "good relationship" (transcript), or Jericho not Unpopular (wiki chapter Note)? Commenters disagree on Neutral. Check in game with Simon Neutral and Jericho Neutral.
2. **"SIMON SURVIVED IN 'PUBLIC ENEMY'" for an unhurt Simon.** Does the gate (and so the sacrifice) count a Simon who escaped Stratford Tower intact and was never in Public Enemy? PowerPyx says yes for the sacrifice. The reunion is only for the left-behind Simon. (Same as ch24 note question 14.)
3. **North's follow-up loop.** How many follow-up prompts come after "I don’t wanna talk about it"? PowerPyx's UNDERSTANDING > TRUST implies two. Does CURIOUS repeat the prompt? Is "friend or higher" checked before or after the follow-up icons apply?
4. **SINCERE in the "preoccupied" prompt.** The wiki says North ▲; the transcript shows no icon.
5. **Attack relationships.** The wiki gives North ▲, Josh ▼▼, Simon ▼ for "attack after abandon / stand ground / disperse". Does a first-prompt ATTACK > CONFIRM also give these? The transcript has none for either.
6. **Second ATTACK.** After ABANDON or a first STAND GROUND, does ATTACK go straight into the fight or ask CONFIRM/ABANDON again? The transcript has "See ATTACK > CHARGE" (a label that does not exist) and "See ATTACK".
7. **Jericho on a rescued loss.** After LOSE THE FIGHT (Jericho ▼▼) > DO NOTHING > John/Simon saves Markus, does Jericho also get ▲▲? The transcript has "See SACRIFICE", and Relationship_Stat lists the John and Simon sacrifice endings under Jericho Large Increase.
8. **Public opinion on a charge after standing.** Commenter George reports a net change of zero after STAND GROUND then attack. The transcript and wiki give ▼▼ for a win. Is PO lowered by charging, by winning, or only by winning?
9. **Public_Opinion's "stay … then disperse" Large Increase line.** It matches no transcript icon. It is probably a garbled SACRIFICE line; confirm that STAY and the second DISPERSE carry no PO change.
10. **The chart's STAND YOUR GROUND node.** Does it light on the first STAND GROUND alone, or only after STAND > STAND (when POLICE FIRE UNPROVOKED plays)? What happens on STAND > DISPERSE: is it POLICE OPEN FIRE?
11. **REVENGE / SPARE after a won fight.** What does REVENGE do (shoot the retreating officers?), and does either option change any stat? No source says.
12. **BE AGRESSIVE WITH OWNER.** What happens (Markus shoves the owner?), and is there a hidden stat?
13. **Magazine availability.** Android Riot: only after a successful Capitol Park store break-in (wiki), only after a violent riot (PowerPyx), or after a peaceful protest too (Rin)? Is the Space Race magazine also conditional? Do both always appear together?
14. **The Jericho ▲ for "around 10" conversions.** What is the exact count, and is it in the transcript at all (it is not)?
15. **Fight difficulty.** How many QTE failures lose the fight, and does difficulty change that? No source gives a number.
16. **Push North.** Is it a QTE inside the fight, and is it available on every charge?
17. **North Lover with Neutral North.** Can SHARE MEMORIES happen at Neutral? The transcript says "friend or higher"; PowerPyx says "friendly/lovers"; the wiki footnote says "positive relationship".
18. **Benchmark scope.**
    - Lover must be set by M17, not M21b.
    - TV media must move from R28 to Crossroads.
    - The two `risk: 0.35` charge rolls need replacing (no source).
    - Fix M18 option 1's early ▼ and the stand option's `jer(+1)`.
    - Add the CONFIRM/ABANDON and second-prompt steps.

---

## 9. Sources

| URL | What it gave |
|---|---|
| https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | Index; the chapter's walkthrough link |
| https://www.powerpyx.com/detroit-become-human-freedom-march-walkthrough-100/ | Walkthrough text: per-node inputs, conversion locations, North dialogue path, plaza choice paths, ending conditions and stat icons; reader comments on NORTH LEAVES at Companion, the connect timer, Simon's threshold, John's priority, the magazine condition, PO after a charge |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-flowchart-100.jpg | Whole-chart overview; header "100% COMPLETED"; long edges (OPEN MANHOLE > START THE MARCH, SIMON FORGIVES MARKUS > IN THE MALL) |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-2.jpg | Roof: TIME TO REFLECT, ENJOY TIME ALONE bracket (mirror, beam, piano, two magazines), NORTH ARRIVES, the three North groups, SHARE MEMORIES padlock |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-3.jpg | SIMON SURVIVED IN 'PUBLIC ENEMY' gate, REUNITED IN JERICHO, SIMON FORGIVES MARKUS |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-4.jpg | IN THE MALL, FREE YOUR PEOPLE bracket with the two blue padlocks, owner group, PREPARE THE MARCH through OPEN MANHOLE |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-5.jpg | START THE MARCH, AX400/worker group, MARCH bracket, POLICEMAN BLOCKS MARCH, RAISE HANDS/IGNORE |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-6.jpg | REACH THE PLAZA, POLICE BLOCK THE MARCH, both three-way groups, POLICE FIRE UNPROVOKED / POLICE OPEN FIRE edges |
| https://www.powerpyx.com/wp-content/uploads/detroit-become-human-freedom-march-7.jpg | Fight ✓/✗, DO NOTHING/SHOOT YOURSELF, gates, sacrifices, the seven ending tiles and their icons |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Freedom_March&prop=wikitext&format=json | Chapter page: infobox, full text flowchart, footnote on SHARE MEMORIES/NORTH LEAVES, Relationship Changes, Public Opinion, Notes (476 androids, savior rules, connect timer) (saved as `wiki.txt`) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Relationship_Stat&prop=wikitext&format=json | Markus-side levels; every Freedom March relationship line; Lover rule; Crossroads ousting |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Opinion&prop=wikitext&format=json | Levels; the four Freedom March PO lines; the "stay … disperse" line; Crossroads and bystander Notes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Software_Instability&prop=wikitext&format=json | Connor-only stat |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Simon&prop=wikitext&format=json | Reunion, "at least Friend" sacrifice rule, Crossroads lines if Markus died |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=John&prop=wikitext&format=json | John's sacrifice, survival when fleeing, glitch |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=North&prop=wikitext&format=json | North's chapter role; leadership if Markus dies; Lover consequences |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Josh&prop=wikitext&format=json | Josh's lines; "no chance of Josh being killed"; Crossroads reactions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Markus&prop=wikitext&format=json | Chapter summary; Possible deaths (SWAT, himself); roof location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Spare_Parts&prop=wikitext&format=json | John-related notes |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Capitol_Park&prop=wikitext&format=json | Unlocks for Followers, Regret Policeman, Other North |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Public_Enemy&prop=wikitext&format=json | Simon left on the roof and found or not |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Crossroads&prop=wikitext&format=json | Markus-dead branches, Meet North, magazines on charge, kiss gate, ousting |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Night_of_the_Soul&prop=wikitext&format=json | Connor on Sacred Ground, Check On Simon |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Battle_for_Detroit&prop=wikitext&format=json | Lover gates (Kiss North, shelter in store) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Last_Chance,_Connor&prop=wikitext&format=json | Chapter order (next chapter) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Jericho&prop=wikitext&format=json | Checked; no Freedom March detail |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Meet_Kamski&prop=wikitext&format=json | Chapter order (previous chapter) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Riot&prop=wikitext&format=json | Magazine text and availability |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=The_Eastern_Space_Race&prop=wikitext&format=json | Magazine text and availability |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Magazine&prop=wikitext&format=json | Both magazines listed under Freedom March |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Detroit_in_Chaos&prop=wikitext&format=json | Crossroads magazine (after a charge) |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Android_Terror_in_Detroit&prop=wikitext&format=json | Crossroads magazine (after a charge); "St. John Plaza" |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Police_Officer_3728&prop=wikitext&format=json | Policeman: same reaction to RAISE HANDS and ADVANCE |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Riot_Police_Officer&prop=wikitext&format=json | Riot officer behaviour per choice |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Woodward_Mall_Center&prop=wikitext&format=json | Location |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Grand_Circus_Park&prop=wikitext&format=json | Location; police die if Markus fights |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=Trophies&prop=wikitext&format=json | STAND YOUR GROUND and CONFRONTATION descriptions |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=STAND_YOUR_GROUND&prop=wikitext&format=json | Trophy rule; "John overwrites Simon"; voids SURVIVORS |
| https://detroit-become-human.fandom.com/api.php?action=parse&page=CONFRONTATION&prop=wikitext&format=json | Trophy rule (ATTACK then CONFIRM) |
| https://detroitbecometext.github.io/chapters/28 | Fan transcript (an unrendered SPA; content read from the two files below) |
| https://detroitbecometext.github.io/i18n/en.json | All strings: `X1001M` (dialogue, choice labels), `MENU.FLOWCHART.10M` (chart labels incl. unused), `GUI.MAGAZINE` (magazine texts), `GUI.ACTION` (REVENGE, SPARE, Push); copy used: `/tmp/flowcharts/ch12/en.json` |
| https://detroitbecometext.github.io/chunk-JCLJBPDO.js | Compiled templates: Freedom March (`kL`), Crossroads Markus (`ty`), Crossroads Kara (`ZL`) and its Watch TV block (`WL`); conditions and relation icons; copy used: `/tmp/flowcharts/ch12/chunks/` |
| https://www.gamerguides.com/detroit-become-human/guide/walkthrough/chapter-1/chapter-27-freedom-march | Confirms node inputs (RAISE HANDS/ADVANCE, owner choices, plaza paths) and the SURVIVORS advice |
| https://www.ign.com/wikis/detroit-become-human/Freedom_March | "Public Opinion will increase each time the SWAT fires on you"; QTE failure is deadly; policeman reacts the same |
