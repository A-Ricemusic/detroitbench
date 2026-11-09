# Video readings, pass 2: chapters 25–32

Research date: 2026-11-08. Scope is the 43 currently open conflicts, including partially settled entries. No benchmark implementation or conflict inventory was edited. Game flowcharts retain precedence. Times below are original YouTube video times.

Downloads use anonymous yt-dlp, `bv*[height<=720]`, and selected time ranges; logs, segments and helper scripts are under `/Users/pelicannurse/.t3/detroitbench-tools/video-pass2/ch25-32/`. New evidence is under `docs/research/video-evidence/chNN/`. Prior-pass readings are identified explicitly and do not count as a new observation. A visible outcome without the required incoming relationship or prior choice does not settle a conditional gate.

### ch25-01

- Question: [which ending] With every piece of evidence hidden, coffee made, ALICE and TIRED answered, if you answer DOG to the laundry-room noise, does the officer open the laundry room (yes/no)? _(PowerPyx/GamerGuides give only recipes (hide nothing + DOG = suspicious; hide all + WASHING MACHINE = fooled); officer wiki page says HEARD NOTHING or a timeout sends him in; no source states the meter values. Benchmark (K15w10 rule: weights DOG 2, WIND 1, WASHING MACHINE 0, HEARD NOTHING 3, threshold 3) says no for DOG, yes for HEARD NOTHING)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch25-02

- Question: [which ending] With no evidence hidden (door opened in time, Luther and Alice upstairs), does WASHING MACHINE still make the officer leave (yes/no)? _(IGN: evidence can be left out 'without the police officer really caring too much'; PowerPyx's suspicious recipe uses DOG. Benchmark: no answer fools him once three or more evidence items are out)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch25-03

- Question: [a number] In one replay with the meter on screen: does skipping the coffee raise it, and does UPSET (instead of TIRED) raise it (yes/no for each)? _(Template prints Adam's stammer 'The… The androids, they…' unconditionally (so his line never changes), and gives no suspicion data. PowerPyx's suspicious recipe includes 'Don't make him coffee'; the Adam wiki page says nervousness raises suspicion unless dismissed as exhaustion. Benchmark: +1 for no coffee, +1 UPSET, +1 NOT MINE; TALK TO ADAM, REASSURE/THREATEN/CALM and YES/NO have no effect)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch25-04

- Question: [which ending] With everything else hidden and the laundry-room door left open, does the officer still leave after WASHING MACHINE (yes/no)? _(Chart has SHUT THE DOOR OF LAUNDRY ROOM but no 'policeman sees' node for it; no source states the consequence. Benchmark counts it +1 suspicion at the noise question)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch25-05

- Question: [a number] Moving deliberately, how many of the hiding actions (cover, blood cupboard, clothes, laundry door, tell Luther, curtain, Adam) can you finish before the officer insists (a number)? _(PowerPyx 'roughly 50 seconds', GamerGuides '50 second timer'; no source gives an action count. Benchmark: six actions, a seventh forces POLICEMAN INSISTS (+1 suspicion))_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch25-06

- Question: [which buttons the model is offered] After TAKE ALICE OUTSIDE (PREVENT ALICE SEEING MARY), can Kara still sit with Alice by the fire and get the INSIST / LET IT GO prompt (yes/no)? _(Only the wiki flowchart list gates it ('Check On Alice - if Let Alice See Mary above'); template marks no gate; PowerPyx lists it unconditionally. Benchmark (K15q) offers it only after STAY)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-01

- Question: [which ending] Take North's Molotov at the pavilion first, then do only peaceful actions until the sirens: is the ending MARKUS LED A VIOLENT RIOT (yes/no)? _(Only PowerPyx commenters (Jd: 75% peaceful meter yet riot; Ravyn Black: 'automatically gets you a riot') say so; the wiki footnote talks only of the 60% meter. Benchmark: TAKE always gives AGGRESSIVE MESSAGE)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-02

- Question: [which buttons the model is offered] Tag one object, then walk to the pavilion: does North still offer the Molotov (yes/no)? _(Wiki Note: 'if enough peaceful actions were chosen prior then North will not offer'; PowerPyx: go there 'first thing… (don't touch other objects yet)'. No count is given. Benchmark withholds it whenever the meter already reads at least 60% peaceful, so one tag withholds it)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-03

- Question: [which ending] If the meter ends about 55% peaceful / 45% violent (no Molotov), which ending plays: PEACEFUL PROTEST, VIOLENT RIOT, or FAILED TO DELIVER? _(Wiki footnote: 'at least 60% on either side' for either message node; FAIL TO SEND needs no action at all (wiki footnote, PowerPyx). Nothing covers a balanced meter after actions. Benchmark counts anything under 60% peaceful as aggressive)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-04

- Question: [a number] With the meter on screen, does FREE ANDROIDS IN SHOP WINDOWS push it toward violent, and does HACK BILLBOARDS (after a peaceful tower speech) push it toward violent (yes/no each)? _(BURN THE PLACE trophy lists 'Free androids' and 'Hijack screen' as violent; wiki Notes say shop windows can stay peaceful and billboards depend on the Stratford speech, and street lights/banner on the current ratio; OVERLOAD ELECTRIC SYSTEM has no source. Benchmark: shop windows, both billboard hacks, lights-off and overload violent; banner and hack lights peaceful)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-07

- Question: [a stat arrow] Destroy the drone first, then deactivate the alarm: does a North ▲ popup appear at the alarm (yes/no)? _(Template's alarm block has arrows only on the Hide / Fail-to-hide variants; wiki 'deactivated the alarm after destroying the drone or hid from it' and Relationship_Stat 'Deactivating the alarm…' say up. Benchmark applies North +1)_ _[Partly settled 2026-11-08 (video CYlgzkbkGlE 19:35): North small up shows when the alarm is deactivated after hiding from the drone; the drone-first order was not observed.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-08

- Question: [a stat arrow] Overturn a bench and then a car: do you get two separate North ▲ popups (yes/no), and does freeing the shop-window androids show a Jericho ▲? _(Template has no section for these objects; wiki 'removes a bench, overturns a car, destroys android parking or breaks the glass to free androids' (one line, North up) and 'breaks the glass to free androids' (Jericho up). Benchmark: North +1 per act, Jericho +1 for shop windows)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch26-10

- Question: [what unlocks] Before deactivating the alarm or destroying the drone, can Markus already break into the site and drive the truck (yes/no)? _(Template's 'Find the truck' opens with 'Looks like the plaza's secure', and commenter CharmedAnt could not take the truck until the drone and alarm were done; but the chart and template both have HAD TO FLEE with 'alarm wasn't deactivated' / 'drone wasn't destroyed' lines. Benchmark allows ramming at any time)_ _[Partly settled 2026-11-08 (video GSfnMGKNLEw 6:26 to 6:47): yes, the truck can be rammed before the alarm is deactivated; whether the drone had been destroyed is not shown.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch27-13

- Question: [wording only] If Markus fled Capitol Park (no officers scene), does Hank say anything about Chris when Connor arrives with him (yes/no)? _(The template has only 'Chris died' / 'Chris was spared' variants; the chart seems to draw GET OUT OF CAR straight to the merge as well. Benchmark: no news, and no CHRIS walk option on start A)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-01

- Question: [which ending] With John not recruited and Simon alive at Neutral, does Simon give his life for Markus after SACRIFICE (yes/no)? _(Template: 'Simon survived in Public Enemy and has a good relationship with Markus' (no level). Simon wiki page 'at least Friend', PowerPyx 'positive (friendly)'; PowerPyx commenters split (one: Neutral is not enough, another: Neutral still sacrificed). Benchmark: Simon must be above Neutral)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-02

- Question: [a stat arrow] After STAND GROUND, choose ATTACK: do you see North ▲, Josh ▼▼ and Simon ▼ popups (yes/no)? _(Wiki lists these three arrows for 'attack after abandon, stand ground or disperse'. Those are exactly the places where the template prints only pointers ('See ATTACK', 'See ATTACK > CHARGE', 'See ATTACK > CONFIRM'), so its silence is weak. Benchmark applies none)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-03

- Question: [a stat arrow] Charge, lose the fight, choose DON'T SHOOT, and John (or Simon) saves Markus: is there a Jericho ▲▲ (and public opinion ▲▲) on top of the loss's Jericho ▼▼ (yes/no)? _(Template's DON'T SHOOT says only 'See SACRIFICE.' (SACRIFICE carries PO and Jericho LargeUp); Relationship_Stat lists the John and Simon sacrifice endings under Jericho large increase. Benchmark applies only the loss's Jericho −2)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-04

- Question: [which buttons the model is offered] After a first STAND GROUND, does choosing ATTACK ask CONFIRM / ABANDON again (yes/no)? _(Template pointers 'See ATTACK' (after STAND GROUND) and 'See ATTACK > CHARGE' (after ABANDON) are ambiguous; 'ATTACK > CHARGE' does not exist. Benchmark goes straight to the fight)_ _[Partly settled 2026-11-08 (video AG4GEcU3ntQ 1:27 to 1:35): a first-prompt ATTACK asks CONFIRM / ABANDON; the case after STAND GROUND was not observed.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-05

- Question: [which buttons the model is offered] After answering UNDERSTANDING to 'I don't wanna talk about it', does the same prompt come back so you can also pick TRUST (yes/no)? _(PowerPyx's recipe 'NORTH'S PAST > UNDERSTANDING > TRUST' implies two answers; the template shows one prompt. Each answer moves North, so a repeat adds arrows. Benchmark: one answer. The level check is read after the answer's arrow, which matches the template's order)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-06

- Question: [a stat arrow] In the charge, is shoving North clear (Push) an optional prompt that appears on every fight and shows North ▲ when pressed (yes/no)? _(Only the wiki ('Choosing to "push" North during the police fight' ▲) and the string GUI action 'Push'; template silent. Benchmark offers PUSH as a choice with North +1)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-07

- Question: [a stat arrow] Converting only the mall androids, the street androids and the first recruit (no conversions during the march): does the Jericho ▲ still pop (yes/no)? _(Wiki only: 'Converting at least around 10 androids during the Freedom March' ▲; the template is silent and no exact count exists. The benchmark counts every conversion in the chapter with an unsourced group size of 2 and triggers at 10. Those non-march conversions alone reach 10)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-08

- Question: [what unlocks] After a peaceful Capitol Park protest (store freed), is the ANDROID RIOT magazine on the roof, and is EASTERN SPACE RACE there too (yes/no each)? _(Android_Riot wiki: any successful store raid; Eastern Space Race wiki: store freed and violence; PowerPyx saw both only after a violent riot; commenter Rin saw the first after a peaceful one. Benchmark follows the wiki pages)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch28-09

- Question: [which buttons the model is offered] After a first STAND GROUND, does choosing DISPERSE lead to the police opening fire with CHARGE / STAY / DISPERSE offered (yes/no)? _(The template gives this DISPERSE only lines, with no 'See DISPERSE' pointer. The wiki tree has only Stand Your Ground > Police Fire Unprovoked and Leave > Police Open Fire. Benchmark routes it to POLICE OPEN FIRE like the first DISPERSE)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch29-01

- Question: [which ending] With Carlos' android dead but Rupert escaped, the Tracis spared, Simon alive and the Stratford deviant escaped, did Fowler's office lead to the evidence room (yes) or straight to decommissioning (no)? _(PowerPyx (pp.txt lines 39/43) counts any deviant body, so Carlos' body alone is sufficient although it opens no route; two PowerPyx readers (Tereza: Simon's memory seen yet 'straight for deactivation') contradict; template and chart are silent on the test)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch29-03

- Question: [which buttons the model is offered] On a save with insufficient evidence, did the chapter open in the frozen Zen Garden with Amanda (yes) or straight in Fowler's office (no)? _(wiki Notes line 159 and a PowerPyx reader ('Connor opens his eyes in the office') say skipped; template and chart (START -> TALK TO AMANDA) show no condition; the reliability log treats wiki prose on gating as a hypothesis)_ _[Partly settled 2026-11-08 (videos wsTum99TgWU 12:01 to 12:04, 9bngTUguKgY 9:50): both open in Fowler's office with no garden first, favouring the wiki; Cheng's video is an edited compilation.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch29-05

- Question: [a number] In the archive fight with Gavin, does missing a single QTE prompt lose the fight (yes), or can you miss one or two and still win (no)? _(wiki: failing the first QTE only wounds Connor; PowerPyx: win by pressing '(most of)' the sequences; no prompt count or odds anywhere; risk 0.25 is a calibration)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch29-06

- Question: [which buttons the model is offered] With the statue map but no Jericho tablet, could you link the map to a reactivated android's memory (e.g. Rupert's) and locate Jericho (yes/no)? _(template has only the tablet link step and PowerPyx names the tablet; the wiki WR400 page (line 40) and readers say a reactivated memory also cross-references; matters only when Rupert's body is present without the diary)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-01

- Question: [a number] As Markus in the raid corridors, did the second bullet hit kill him (yes), or did he survive two hits and die on the third (no)? _(wiki text chart '(if already wounded) Soldier Kills Markus' and template 'Soldiers shoot Markus twice' read as two; PowerPyx ('The third bullet kills him'), GamerGuides and three commenters say three; the same counter drives deviant Connor's takeover deaths)_ _[Partly settled 2026-11-08 (video tLtGyxHLdoY 13:21 to 13:31): in that corridor the second hit killed him; earlier Crossroads hits were not visible.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-02

- Question: [which buttons the model is offered] On your most machine-like Connor playthrough, was BECOME A DEVIANT locked (greyed out) in the captain's cabin? _(template lock 'Have enough software instability' and PowerPyx 'high software instability' give no value; the engine's threshold is a calibration)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-03

- Question: [which ending] As an ousted Markus who went back to Jericho while Connor stayed a machine, did Connor confront Markus in the engine control room (the reach-the-gun QTE)? _(wiki text chart sends him to MARKUS IN THE CORRIDOR and the Connor template's hold variant reads 'Markus is alive - Connor finds Markus', but wiki Notes say a machine Connor dies whenever Markus is 'dead or ousted'; the benchmark sets leader North at the cabin, so M24-gun is never offered to a returning exile)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-04

- Question: [what unlocks] After choosing DON'T KISS in Crossroads, was KISS NORTH still offered in Battle for Detroit? _(DON'T KISS is North large down (template) but no source says whether Lover survives it; Battle for Detroit's kiss, Perkins' offer and North taking the bullet key on Lover; the benchmark keeps northLover)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-05

- Question: [what unlocks] With Alice at Neutral (above Distant but below Warm), did choosing DISTANT in Crossroads make Alice walk away when the raid began? _(template lock 'Alice relation is below WARM and choose DISTANT' vs wiki 'never raise it to NEUTRAL'; commenters report it glitched; the benchmark uses the wiki (aliceMax below Neutral))_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch30-06

- Question: [what unlocks] If Kara chose PROTECT ALICE and left Luther in the corridor, did Luther reappear in Battle for Detroit (FIND LUTHER & JERRY)? _(wiki: 'his death is not confirmed'; ch32 template/wiki key on 'Luther is alive' and 'not already with Kara'; the benchmark sets luther=false)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch31-01

- Question: [which ending] If a machine Connor survived Crossroads by shooting Markus, did Night of the Soul show Connor with Amanda in the snowy Zen Garden (THIN ICE)? _(template lock 'Connor stayed a machine or died in Crossroads' plus a machine-survivor variant (with Battle for Detroit string keys) vs wiki 'Only available if Connor died during Crossroads' and a PowerPyx reader; Thin Ice is one of the chapter's counted endings)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch31-02

- Question: [a stat arrow] When Markus chose DON'T TRUST and shot Connor in the church, did a Jericho small-down arrow appear? _(template has no arrow; wiki Relationship_Stat gives Jericho small down; the option ends in Connor's death, where the reliability log found template arrows wrong twice)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch31-03

- Question: [what unlocks] If Hank resigned in Last Chance, Connor and Connor was then decommissioned there, did Hank still end up dead (HANK COMMITTED SUICIDE on Night of the Soul's chart or Hank absent later)? _(template lock is only 'Hank was hostile ... and resigned'; Hank's House is a Connor scene, so the engine skips it when Connor is gone and Hank stays alive; no source covers the decommissioned case)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch31-04

- Question: [which buttons the model is offered] After Markus was ousted and chose LEAVE FOREVER in Crossroads, did Night of the Soul still open with Markus at Carl's house or grave? _(wiki: Pay Respects/Welcome Home 'if Markus is still alive' (silent on leaving); the engine blocks Markus scenes once markusActive is false)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch31-05

- Question: [which buttons the model is offered] With Markus ousted (alive but gone) and Josh alive, was CHECK ON JOSH offered to deviant Connor in the church? _(PowerPyx 'Only if Markus died in Crossroads' vs wiki 'died during Crossroads after saving Josh'; the Connor template has no Josh section; neither covers the ousting)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch32-01

- Question: [which ending] With public opinion at Sympathetic (one below Supportive), did SING or KISS NORTH make Warren say 'Tell them to stand down'? _(template only 'Public opinion is positive'; wiki chapter and Public Opinion pages say Sympathetic, PowerPyx says 'must be supportive' (pp-markus lines 73-82), one reader says Sympathetic works)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch32-02

- Question: [which ending] When the assault failed with North at Companion (not Lover), did she take shelter in the store with Markus (yes) or get shot (no)? _(template has no condition; PowerPyx 'Lovers or Companion' (line 168) and 'NORTH GETS SHOT: Neutral or lower'; readers at Companion report her shot (lines 280, 446); the benchmark lets Companion through)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch32-03

- Question: [which ending] When Markus failed the barricade QTE with North at Friend or Companion (not Lover), did North throw herself in front of the bullet? _(template heading 'Fail the QTE and have lover status with North' and PowerPyx say Lover; wiki says Friend or above, and a PowerPyx reader (line 338) says she did it 'even though they were just friends')_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch32-04

- Question: [which buttons the model is offered] With Hank at Friend, was LEAVE (give up the shot) offered on the rooftop without first choosing HANK'S SON and then HANK'S SON (INSIST)? _(template lock is only 'Be friend with Hank'; PowerPyx (pp-connor line 196) and the wiki add 'asked twice about Hank's son', and two readers at Friend never saw it; the benchmark reads Friend before the arrival drop and needs nothing else. HANK'S SON itself has no photo lock in the template)_ _[Partly settled 2026-11-08 (video WQYognX6H4o 2:06 to 2:46): LEAVE unlocks right after HANK'S SON and INSIST with a "Friend: path unlocked" popup; the case without the son questions was not seen.]_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

### ch32-05

- Question: [which ending] With Connor still a machine and Markus killed by soldiers or Perkins (not by Connor), and no dirty bomb, did the after-credits scene of Amanda presenting the new RK900 play? _(template lock 'Machine Connor stopped Markus' vs wiki Secret-Endings 'or Markus must die during Battle of Detroit'; the benchmark follows the wiki)_
- Video / timestamps: pending.
- Frames saved: none yet.
- Reading: pending.
- Verdict: **not settled**.

