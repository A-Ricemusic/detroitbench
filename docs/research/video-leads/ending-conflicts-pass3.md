# Ending conflicts — pass three: unresolved-test inventory and footage hunt

Research date: 2026-11-09. Research only; no subagents, no commit, and no writes to benchmark/, tests/, CONFLICTS.md or SOURCES.md. The working tree already contained unrelated changes.

## Outcome and acquisition limit

This pass collected **60 still-partial/unresolved conflict IDs**, including the eight presentation/attitude items that the focused chapter reports mostly excluded, plus the **separate Capitol Park timer question**. It ran 60 item-specific YouTube searches and 35 broader searches across German, French, Spanish, Russian, Japanese and Polish chapter names, alternate endings, Twitch archive mirrors, trophy guides and speedrun leads. Steam and Reddit searches supplied additional embedded-video leads. The machine-readable complete decisive-test list is `decisive-tests.json` in the external directory.

**No new gameplay question was settled. No fresh video segment was obtained, and no frames were extracted or added under docs/research/video-evidence/.** Anonymous media requests failed with YouTube’s “Sign in to confirm you’re not a bot” response. The download scripts waited 61 seconds between each first refusal and its single retry, then tried different videos. Fifteen distinct videos were attempted twice, including a normal anonymous Android VR client on the final three; that also failed. No login, cookies, token service or authentication was used. Search results remained accessible. A refused download is an access result, never evidence about gameplay; uninspected titles, descriptions and community recollections do not settle the requested tests.

The footage-acquisition and frame-reading part of the request therefore remains incomplete because anonymous media access was refused. This report preserves the complete test inventory and useful new leads so that access failure is not disguised as a negative gameplay finding. The newly reported verdicts retain the prior evidence state; confidence in the **unresolved predicate** is deliberately separated from high confidence in previously filmed subsidiary observations.

## Reconciliation of the six reports

Sources: [A](ending-conflicts-A.md), [B](ending-conflicts-B.md), [ch04–15](ending-conflicts-ch04-15.md), [ch17–23](ending-conflicts-ch17-23.md), [ch25–27](ending-conflicts-ch25-27.md), [ch28–32](ending-conflicts-ch28-32.md). Each ID is listed once, using the more focused follow-up when available. ch10-18 and ch17-05 remain separate IDs even though they share a theft/news experiment. ch17-07 contains **two independent tests**, not a single interchangeable memory test. The original control details are preserved rather than reduced to generic chapter/ending searches.

Four IDs are excluded from the still-open count because the supplied reports already settle their requested observation: **ch04-10** (bedrooms-only Alice conversation), **ch21-01** (initial car-news opinion decrease), **ch26-07** (alarm North-up after destroying the drone), and **ch29-06** (map-to-reactivated-memory route exists). These are inherited results, not pass-three discoveries. **ch30-03 remains included**: its code discrepancy was already resolved, but the specified returning-exile/machine-Connor in-game control is still partial. ch29-03 uses B’s extended partial card rather than the less precise “remaining items” table. All nine items from B’s remaining-prompt table are accounted for, with ch29-03 counted once.

## Methods, logs and new source routes

All logs/scripts/manifests live under `/Users/pelicannurse/.t3/detroitbench-tools/ending-conflicts/pass3/`. `inventory.json` preserves the ID sections from the six reports; `remaining-items.json` adds the eight table-only questions; `decisive-tests.json` contains every remaining ID and operational test. For those table-only questions, the decisive test is an explicitly constructed operationalization of B’s question, not a verbatim quotation from a nonexistent per-item section.

`hunt.py` and `hunt2.py` log 35 broad discovery queries. `item_search.py` logs one query for every remaining ID, with three results per query. `item-search-results.json` preserves the aggregate; results unrelated to Detroit were rejected, including stray audiobook/voice-generator results. “New to these six reports” means the video ID is absent from the six supplied Markdown reports; it does not claim absence from all earlier work or prove the channel recorded a new controlled experiment. Auto-localized YouTube titles can describe an English recording; language must be confirmed in the actual video before calling it independent localized gameplay.

Promising category routes, all **uninspected footage**:

- Polish Stach W Grach alternate endings: [Freedom March](https://www.youtube.com/watch?v=wchW6deoVDM), [The Nest](https://www.youtube.com/watch?v=WVS7wE7ccn4), [Spare Parts](https://www.youtube.com/watch?v=XdQVbeYqH5U), [Crossroads](https://www.youtube.com/watch?v=iKF7_bLt6ss), [short alternate Crossroads](https://www.youtube.com/watch?v=EN1ocKcfDBI), [Night of the Soul](https://www.youtube.com/watch?v=xAGc4vaCjFA). These are useful branch leads, not continuous-history controls merely because the titles say alternate endings.
- Russian [all Zlatko endings](https://www.youtube.com/watch?v=igxk5n5JS9A) and Japanese OmegaGamesWiki [revolution endings/100% chart](https://www.youtube.com/watch?v=LvFR3hBDJYo). Both were refused on download.
- Twitch-mirror strategy: [RTGame Stream Archive part 1](https://www.youtube.com/watch?v=W_61_JFMF8Q), [part 2](https://www.youtube.com/watch?v=V409KCZlrzs), and [Weest bad-endings archive](https://www.youtube.com/watch?v=gXHb5eHSPag). The attempted RTGame part-2 segment failed; no save history is claimed from these titles.
- Trophy strategy: [PS5Trophies all Connor deaths](https://www.youtube.com/watch?v=igcFjjZuuog), French [Aveux/confession trophy](https://www.youtube.com/watch?v=jOJKKHnw7Dw), and Japanese [magazines 43/44](https://www.youtube.com/watch?v=FqKVTwYP2Lk). All attempted segments were refused. A trophy’s necessary ending still does not guarantee the disputed exact route.
- Speedrun strategy: [Sitron platinum run](https://www.youtube.com/watch?v=XPWRjsRgOOg), [Danzel Survivors run](https://www.youtube.com/watch?v=xsknOWPxBoM), and [Moon 100% playthrough](https://www.youtube.com/watch?v=BAaVwOtDZQA). No verified “all 100% flowcharts” speedrun category was established; platinum, Survivors and a 100% title are explicitly different discovery leads. The Sitron attempted segment failed.
- Steam’s [Dunn all-outcomes guide](https://steamcommunity.com/sharedfiles/filedetails/?id=2935499852) explicitly links its [video playlist](https://www.youtube.com/playlist?list=PLIbWFosvUouEGlM4-t1GfOxpZi_deMjrO) and says its guide covers Experienced. That declaration does not establish the difficulty of unrelated videos. Steam’s [Midnight Train video page](https://steamcommunity.com/sharedfiles/filedetails/?id=2650116694) exposes a chapter-video iframe (XQsuGCH6Jqw); the HTML was saved, but no gameplay was read.
- Reddit [timestamped North-scenarios reply](https://www.reddit.com/r/DetroitBecomeHuman/comments/16np8ig/comment/k1l2osm/) links [2k3Vk7tJcY8 at 27:25](https://youtu.be/2k3Vk7tJcY8?t=1645) as a Companion heart-donation scene. The attempted 27:10–29:00 download was refused. **Heart donation during revolution is distinct from the demonstration’s bullet interception**, so even a verified Companion heart donation would not by itself settle ch32-03.
- Reddit’s [RK900 experiment thread](https://www.reddit.com/r/DetroitBecomeHuman/comments/jcrjic/) includes a commenter’s claimed matrix: Perkins and final timeout yielded RK900, sacrifice and failed barricade did not, with North/Lover history discussed as a possible confound. Another participant reports a conflicting failed Perkins attempt. This improves the next experimental design for ch32-05; no attached continuous clip was recovered and no Boolean rule is adopted from the recollection. The lower-level claim remains unverified.

## Download acquisition ledger

Every command uses `--download-sections`, `-f "bv*[height<=720]"`, and `/opt/homebrew/bin/ffmpeg`. Times below are requested **original-source** ranges, not timestamps of observed events. Ranges for broad compilations/VODs were scouting windows, not independently verified branch locators. Each `*-command.json` preserves the exact argv, and the two `*-download-N.log` files preserve the refusals and wall-clock timestamps. There are no successful media artifacts or selected-frame hashes to report.

| Attempt | Source | Requested source range | Result |
|---|---|---|---|
| bookworm-jp-alt | [video](https://www.youtube.com/watch?v=FqKVTwYP2Lk) | `*00:00:00-00:02:53` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| capitol-pl | [video](https://www.youtube.com/watch?v=6f1j5N5uh50) | `*00:14:00-00:25:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| cross-pl-alt | [video](https://www.youtube.com/watch?v=EN1ocKcfDBI) | `*00:00:00-00:09:13` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| march-de-alt | [video](https://www.youtube.com/watch?v=0SQcL5Z2LL0) | `*00:10:00-00:17:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| march-pl | [video](https://www.youtube.com/watch?v=wchW6deoVDM) | `*00:00:00-00:20:19` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| midnight-fr-alt | [video](https://www.youtube.com/watch?v=VQw8dliaKnQ) | `*00:12:00-00:20:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| nest-pl-alt | [video](https://www.youtube.com/watch?v=WVS7wE7ccn4) | `*00:00:00-00:11:04` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| reddit-north | [video](https://www.youtube.com/watch?v=2k3Vk7tJcY8) | `*00:27:10-00:29:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| revolution-jp | [video](https://www.youtube.com/watch?v=LvFR3hBDJYo) | `*00:20:00-00:30:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| roof-es | [video](https://www.youtube.com/watch?v=3KHfjB5Mbu4) | `*00:00:00-00:02:43` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| speed-alt | [video](https://www.youtube.com/watch?v=XPWRjsRgOOg) | `*01:00:00-01:06:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| trophy | [video](https://www.youtube.com/watch?v=igcFjjZuuog) | `*00:02:00-00:06:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| trophy-fr | [video](https://www.youtube.com/watch?v=jOJKKHnw7Dw) | `*00:02:00-00:06:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| vod-alt | [video](https://www.youtube.com/watch?v=V409KCZlrzs) | `*03:00:00-03:08:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |
| zlatko-ru | [video](https://www.youtube.com/watch?v=igxk5n5JS9A) | `*00:15:00-00:25:00` | attempt 1: bot-check refusal; attempt 2: bot-check refusal |

## Per-item findings

## ch06-03 — Does 10/10 stop the investigation timer?

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show REVIEW EVIDENCE 10/10 before the first warning, do not report to Hank, and remain in live exploration beyond the ordinary first warning and five-minute extension windows. A warning after 10/10 settles continued timing positively; absence needs a timed control, with no pause/menu time counted.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: not settled, low confidence in either answer. Benchmark implication: no change to the `C05` investigation timeout predicate/budget. The action-count conversion remains a calibration. A negative search is not evidence that 10/10 freezes time.

**Pass-three hunt.** Query: `Detroit Become Human Partner alle Beweise Hank warten 10/10`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch06-03-search.jsonl` / `ch06-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch09-01 — Confession before four PRESSURE inputs

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Starting from a visible stress percentage, show PRESSURE IT, every subsequent PRESSURE menu/input and the onset of confession. An early confession disproves the fixed four-input rule; fully confirming that rule requires coverage of relevant starting-stress/retry paths or executable logic.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled, medium confidence in four inputs on the observed paths, not universal proof. Benchmark implication: no change to `C06p1–4`, `C06rp1–4` or `RULES.pushes = 4`; no early-confession stress gate is justified.

**Pass-three hunt.** Query: `Detroit Become Human interrogatoire pression aveux stress`. [Detroit  Become Human Chapitre 8 (L'interrogatoire)](https://www.youtube.com/watch?v=DLa9pNofxio) (new to these six reports); [Detroit Become Human - L'interrogatoire / #05 / PS4](https://www.youtube.com/watch?v=Gy1uKjCC4uw) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch09-01-search.jsonl` / `ch09-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch09-14 — Failed pressure, one INTERVENE, then GIVE UP

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Continuously show a failed pressure attempt and no confession, the first officer menu selecting INTERVENE, the next menu selecting GIVE UP, and the shootings/final chart. A successful confession or a completed memory probe is a different prerequisite.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled, low confidence in the disputed ending. Benchmark implication: no change. Keep current `C07b` GIVE UP behavior: `ch09Stressed && !ch09Confession` shoots Connor and the android. Candidate, only if a qualified video shows Connor surviving: make the shooting predicate also require `ch09Intervened === 0`. The existing one-intervention self-shooting clip is insufficient to apply that candidate.

**Pass-three hunt.** Query: `Detroit Become Human Verhör eingreifen aufgeben gescheitert`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch09-14-search.jsonl` / `ch09-14-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch09-16

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show a successful memory probe, DO NOTHING at the self-destruction, Connor surviving, then the next Zen Garden conversation continuously with Amanda’s complete arrow popup. Record both the probe and survival; another interrogation ending is not a control.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; amandaTrust only; no Amanda-level ending gate demonstrated.

**Pass-three hunt.** Query: `Detroit Become Human interrogatoire sonde mémoire Amanda félicite`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch09-16-search.jsonl` / `ch09-16-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch10-18 — Diversion-only theft and Zlatko's robbery news

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Continuously retain a successful USE ALICE diversion theft, with no drawn gun, through On the Run to Zlatko; turn on the upstairs TV and observe report, public-opinion popup and (on a reset path) memory response. Record uniform/disguise and highway history independently. A chapter-select compilation cannot establish the inherited flag.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled, low confidence in diversion eligibility. Benchmark implication: no change to the inspected success flag. Candidate if the controlled path produces no news: successful `stealDiscreetly` → stop setting `ch10RobberyNews`; retain the robbery method/money and gun-route producers. Do not change `CONVINCE` or caught-with-gun behavior from this test; they are separate unknowns. See duplicate ch17-05 when consolidating findings.

**Pass-three hunt.** Query: `Detroit Become Human fugitivas distraer Alice robar noticias Zlatko`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch10-18-search.jsonl` / `ch10-18-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch10-24 — Generator pliers before inspecting the fence

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** From first arrival, go directly to the parking-lot generator, with neither street nor parking-lot squat-fence inspection, and attempt pickup. Show preceding navigation and whether a TAKE action succeeds.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: not settled, low confidence in the exact interaction order; existing availability is better supported than adding a gate. Benchmark implication: no change to `ch10.mjs` `pliers` availability (`!s.ch10Cutters`). If a controlled refusal is observed, add the fence-inspected prerequisite only to generator pickup. Do not infer it from the store's separate gate.

**Pass-three hunt.** Query: `Detroit Become Human Беглянки кусачки генератор забор`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch10-24-search.jsonl` / `ch10-24-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch10-34

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** From the bus arrival, record a continuous direct route to an actual shelter ending without meeting the trash-collector android. An attempted avoidance followed by a forced encounter also needs the complete route. Settling inside the car must be shown, not just inspecting it.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Trash-collector encounter order; no demonstrated ending gate.

**Pass-three hunt.** Query: `Detroit Become Human fugitives sans android poubelle voiture`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch10-34-search.jsonl` / `ch10-34-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch11-05

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show both the replacement eye and audio processor fitted before the crawling android grabs Markus and offers the kill/refuse interaction. Record the two installations and encounter without splicing; an encounter before either installation is insufficient.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Mercy encounter availability; no demonstrated player-outcome gate.

**Pass-three hunt.** Query: `Detroit Become Human Из мертвых глаз аудио убить андроид`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch11-05-search.jsonl` / `ch11-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch13-01 — Voluntary LEAVE THE SQUAT

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** On an identified current Experienced build, with Ralph keeping quiet, deliberately attempt the exit before Hank's departure order; show whether Connor can leave and the resulting chart. A text key is insufficient, and failure to see a chart node alone cannot exclude an off-chart interaction.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled. High confidence the named node is absent from the completed reference chart; low confidence about every current-build manual interaction. Benchmark implication: no unconditional removal of `C09q` option 6 on absence alone, since the benchmark also includes off-chart prompts. Its purported chart-node justification should be corrected: visible old padlock/text key → explicitly unverified surviving interaction. A qualified current-build refusal would justify removing option 6 and allowing non-discovery only through the search deadline/Hank.

**Pass-three hunt.** Query: `Detroit Become Human В бегах Коннор покинуть сквот`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch13-01-search.jsonl` / `ch13-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch13-29

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** On the motel route, approach and attempt the TV before drawing Alice’s bath, cutting hair or removing the LED. Show whether interaction succeeds, and the unchanged hair/LED. Performing the normal makeover before watching TV cannot establish that it is mandatory.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Motel bath/hair/LED sequence; no demonstrated different outcome solely from TV availability.

**Pass-three hunt.** Query: `Detroit Become Human Flucht Motel Fernsehen ohne Haare schneiden`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch13-29-search.jsonl` / `ch13-29-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch13-36 — Fugitives-only gun threat and Ralph's betrayal

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Threaten Ralph with the gun in Fugitives, stay in the squat, retain the save, never threaten him at breakfast, finish the kind/corpse conversation, then observe whether he conceals Kara or immediately informs Connor. State continuity across chapters is essential.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: not settled, low confidence in either predicate. Benchmark implication: no change to the `C09a`/`C09q` route using `ch13RalphThreatened`. Candidate if the prior-only threat causes betrayal: table threat only → table threat OR the earlier Fugitives threat flag. Do not add that OR from the wiki's broad prose alone; it removes the concealment path and changes later Ralph availability.

**Pass-three hunt.** Query: `Detroit Become Human Ральф угрожать пистолет завтрак`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch13-36-search.jsonl` / `ch13-36-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch14-05 — Magazine after KARA & ALICE VANISHED

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Continuously show the On the Run ending obtained by idling Connor before the fence, then read the Ferndale bench cover in Jericho. Continue the same save to Zlatko and inspect the TV separately if public-opinion consequences are to be inferred.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled, low confidence in this specific ending's cover. Benchmark implication: no change to ch14's `pursued = s.chase === true`. A confirmed Fortune Teller result would require a narrower magazine producer/gate, but not automatically a Zlatko news change: the current ch17 report/magazine already uses the freeway outcome separately. Do not merge those flags from cover text alone.

**Pass-three hunt.** Query: `Detroit Become Human Jericho magazine Fortune Teller vanished`. [DETROIT: BECOME HUMAN TRUE ending + all magazines locations (+32 trophies)](https://www.youtube.com/watch?v=Ijv7iPeovh8) (previously named lead) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch14-05-search.jsonl` / `ch14-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch15-12 — No choice at the ledge

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show the entire SAVE HANK/CHASE DEVIANT menu expiring without a selected input, Connor's response, Rupert's fate and preferably the final chart. A continuous later evidence-room inspection can verify the body flag; chart-consistent death is enough to establish the immediate ending.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: partially settled, medium confidence timeout defaults to pursuit/suicide; no recoverable qualifying capture yet. Benchmark implication: no change to `C10` option 2 → `nestRupert='suicide'`, `nestRupertBody=true`, with the existing hesitation flag/penalties. Do not switch to escaped/body=false on the basis of the word timeout. The numeric penalty remains unmeasured by this pass.

**Pass-three hunt.** Query: `Detroit Become Human Gniazdo Hank limit czasu`. [Being Peaceful Didn't Matter / Detroit: Become Human - Part 6](https://www.youtube.com/watch?v=28ri0qmcxyE) (new to these six reports); [This Detroit Become Human Ending Should Have Gone SO Much Worse!](https://www.youtube.com/watch?v=kiN5fSUScUo) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch15-12-search.jsonl` / `ch15-12-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch15-14 — Cage-only discovery

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** From apartment entry, never reconstruct the stool and never examine the sink LED, reconstruct the cage only, then attempt the chair/look-up interaction. Show whether FIND RUPERT starts. If blocked, add stool and LED one at a time to identify the actual prerequisite.

**Inherited evidence and limits.** [ending-conflicts-ch04-15.md](ending-conflicts-ch04-15.md): Verdict: not settled, low confidence in the cage-only predicate. LED dispensability has supporting guide evidence, not a new measured isolation. Benchmark implication: no change to `C10o1`'s cage-reconstruction eligibility for finding Rupert. Candidate if cage-only is blocked and stool then unlocks discovery: cage only → cage AND stool reconstruction. Add an LED requirement only if a separate controlled test proves it.

**Pass-three hunt.** Query: `Detroit Become Human Гнездо клетка табурет светодиод`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch15-14-search.jsonl` / `ch15-14-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch15-18

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Record RUPERT NOT FOUND at The Nest, propagate that save without chapter skipping to Crossroads, and attempt Connor’s Rupert-spotting interaction in Jericho. GOT AWAY is a different earlier ending.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; ch30Rupert exploration clue only; no demonstrated outcome consequence.

**Pass-three hunt.** Query: `Detroit Become Human Rupert Jericho never found`. [Detroit: Become Human - What Happens When Jericho Isn't Attacked? // All Options](https://www.youtube.com/watch?v=CiSr7md9I1I) (new to these six reports); [Detroit Become Human - “What Happens If” No One Survives & Jericho Is Not Found - Kamski’s Ending](https://www.youtube.com/watch?v=xk-X4a-TSio) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch15-18-search.jsonl` / `ch15-18-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-01 — Two eligible Zlatko TV stories

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** On one propagated save, establish an armed store robbery in Kara’s uniform and the subsequent freeway chase. While not leaving the TV, play a complete news cycle, including after the first story ends; count both broadcasts and their opinion popups. Re-activating the TV must be distinguished from two losses on one activation.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; low confidence in exclusivity or multiplicity. No change to `ch17.mjs inputs.report` (freeway precedence, one report). Do not add a second loss from separate template blocks alone.

**Pass-three hunt.** Query: `Detroit Become Human Златко новости ограбление шоссе`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-01-search.jsonl` / `ch17-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-02 — Fire, pursuit and death

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Set fire on screen, then follow a continuous route to a lethal upstairs bathroom/storage-room QTE and fail it. Record the resulting shot/death and chart, or show the supposedly lethal input safely completing because of fire. Failing only downstairs inputs tests a different question: the game can already be safe once Kara reaches the stairs.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: partially settled; high confidence that fire does not skip all house pursuit; post-fire death unproven. Implied routing correction: K13/K13a SET FIRE currently sets `ch17Route='stairs'` immediately; replace that direct transition with the observed post-fire escape interactions before stairs. Do not assign a new death probability from the existing success examples. Exact routing should follow the additional footage reading, rather than assuming every non-fire hide choice survives the fire.

**Pass-three hunt.** Query: `Detroit Become Human Zlatko incendie Kara meurt salle de bain`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-02-search.jsonl` / `ch17-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-03 — Corridor directly to stairs

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Leave the bedroom into the corridor, bypass the bathroom, and reach the stairs. Keep the controls visible to distinguish free walking from a labelled action/QTE and show the consequence of a failed attempt. This must be a no-fire case if the claim is that the bypass is generally available.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: partially settled; high confidence in the chart edge, low confidence in the exact bypass control. The new footage supplies labelled transitions and pursuit QTEs, but does not isolate a successful no-bathroom bypass. Keep the chart bypass. Do not present 0.30 as extracted game data or conclude from a failed RUSH that the chart’s direct-stairs edge is absent. No change to K13c from this pass.

**Pass-three hunt.** Query: `Detroit Become Human Zlatko escaleras baño escapar`. [Detroit: Become Human. #7.🏆Trofeo: ESCAPA DE LA MANSIÓN.🏆](https://www.youtube.com/watch?v=uMI0rXusbQQ) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-03-search.jsonl` / `ch17-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-04 — Robbery-only broadcast as a recovery memory

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Establish robbery plus no police chase, propagate that save to Zlatko, let Kara be reset, and turn on the TV before recovery is complete. Record an actual memory flash/progress, preferably the selected SEE NEWS FLASH OF ESCAPE chart node. Merely hearing the robbery story after recovery is insufficient.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; low confidence in necessity of freeway, medium confidence that robbery content is compatible with the memory. No change to `house()` TV memory eligibility through `inputs.report`. Current code already permits robbery-only news; the stricter freeway-only alternative is not demonstrated.

**Pass-three hunt.** Query: `Detroit Become Human Златко память телевизор ограбление`. [Detroit: Become Human. Идеальное прохождение. Глава 13. Златко.](https://www.youtube.com/watch?v=8iPtSNGR1yE) (new to these six reports); [ВСЕ КОНЦОВКИ ЗЛАТКО / Detroit: Become Human / Кэра](https://www.youtube.com/watch?v=igxk5n5JS9A) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-04-search.jsonl` / `ch17-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-05 — Discreet theft and the robbery report

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show USE ALICE AS A DIVERSION → STEAL DISCREETLY without drawing the gun, then carry that history to Zlatko and watch the TV. Prefer no chase, so a chase story cannot mask theft eligibility. If reset, record whether any story also contributes a memory.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; low confidence. No change to chapter 10’s `ch10RobberyNews` producer or chapter 17’s report selector. Keep gun robbery → eligible; do not broaden to discreet theft from the shared word “robbery.”

**Pass-three hunt.** Query: `Detroit Become Human Zlatko vol discret nouvelles télévision`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-05-search.jsonl` / `ch17-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-06 — rA9 memory without asking Ralph

**Verdict: not settled; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Stay overnight in the squat without inspecting/asking about Ralph’s carving, propagate that save, then reset Kara and inspect the storage-room symbols while recovery is incomplete. Distinguish RECALL RA9 SYMBOLS from the ordinary post-recovery RA9 search node.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; medium confidence retaining the narrower gate, low confidence answering the experimental question. No change to `inputs.carving` / `ch10RalphCarving`. Do not replace inspection with lodging merely because a generic guide omits the extra action.

**Pass-three hunt.** Query: `Detroit Become Human Златко память rA9 Ральф`. [Detroit Become Human Zlatko / Kara Reset / Free Monsters / Search House Alice Walkthrough Part 13](https://www.youtube.com/watch?v=ON3t7BCOtII) (new to these six reports); [Detroit: Become Human Kara & Alice go to ZLATKO's house. "Part 1"](https://www.youtube.com/watch?v=QO6OCE2mfas) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-06-search.jsonl` / `ch17-06-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch17-07 — Alice’s book and Todd’s pipe without earlier interactions

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Two independently controlled tests: skip Alice’s book in A New Home, then inspect the Zlatko book while reset; skip REWASH CLOTHES / Red Ice discovery, then inspect the storage-room pipe while reset. Show the earlier omissions, the propagated save, memory response and chart. A shared flashback from Stormy Night is not itself evidence that the laundry prerequisite is unnecessary.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: partially settled at source level for the book prerequisite (medium-high); not settled for pipe; overall partially settled, no new controlled footage. No change to `inputs.book = !!upstairs.book` or `inputs.pipe = !!downstairs.rewash`. No numerical memory-weight change is justified.

**Pass-three hunt.** Query: `Detroit Become Human Zlatko mémoire livre pipe`. [How to Escape Kara from being Reset - Detroit Become Human](https://www.youtube.com/watch?v=eX12Hpk9_yc) (new to these six reports); [Detroit: Become Human - Markus Detonates a Dirty Bomb - Nuclear Ending](https://www.youtube.com/watch?v=wy9uEK54cmc) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch17-07-search.jsonl` / `ch17-07-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch19-02 — Control-room alarm and a clean fence escape with John

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Recruit John, trigger the control-room alarm, then reach/cross the fence promptly with no dog intervention on John. Show him surviving or the selected route excluding DOGS MAUL JOHN. Failing before the fence is not this experiment: the existing benchmark deliberately preserves John on that separate rescue route.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: partially settled; medium confidence in mandatory dogs after reaching the fence with John, no counterexample found. No change to `M05n`’s `control alarm && reached fence && !ch19MarkusRescued` gate. Preserve John on the separate pre-fence rescue exception; the registry’s “always dies on alarm” summary is stale.

**Pass-three hunt.** Query: `Detroit Become Human Części zamienne John alarm psy`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch19-02-search.jsonl` / `ch19-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch19-03 — Quiet LEAVE and delayed fence damage

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** ACCEPT John → LEAVE the key, with no alarm. Once player control returns, wait through the full escape window rather than moving to the fence. Record damage/rescue or automatic safe completion and the chart. A prompt successful crossing does not distinguish an absent failure branch from an untriggered timeout.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; low confidence. No change to M05m’s quiet risk; retain the explicit calibration label. Do not infer 0% or 8% from an ordinary successful departure.

**Pass-three hunt.** Query: `Detroit Become Human Ersatzteile John verlassen Zaun warten`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch19-03-search.jsonl` / `ch19-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch23-01 — Guard-only Simon wound, no SWAT

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Lock the server door; ASSAULT and shoot the phone guard, leaving Simon wounded; shoot the fleeing operator; show no SWAT after the speech, Simon walking up to the roof, then LEAVE/KILL and his chart ending. Continuous guard → speech → roof footage with no SWAT can establish the result even if the earlier door lock is offscreen; do not splice the guard and rooftop variants of a compilation.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: partially settled at source level; medium-high confidence in the candidate correction, exact controlled footage not found. Candidate for the orchestrator: in M12’s no-alarm branch, `stratfordSimonFate='escaped'` unconditionally → `'escaped'` only when healthy, otherwise a distinct wounded/walked-to-roof fate. M14’s `stratfordSimonFate==='carried'` gate → also admit that wounded arrival. Route to LEAVE/KILL, not `THE GROUP ESCAPED`; preserve M13 as a SWAT-only rescue. M10b already sets `simonWounded` on `phoneShot`, so do not add a duplicate wound or alarm there. No unconditional application recommended from the new clips alone; the source-based candidate is stronger, not newly filmed.

**Pass-three hunt.** Query: `Detroit Become Human Башня Стрэтфорд Саймон ранен охранник`. [МОСТ. БАШНЯ СТРЭТФОРД. ВНЕ ЗАКОНА. ПРОХОЖДЕНИЕ ИГРЫ #9 Detroit: Become Human ЛУЧШАЯ РАЗВЯЗКА](https://www.youtube.com/watch?v=yDWDTq0uAB0) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch23-01-search.jsonl` / `ch23-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch23-02 — CALM opening, DETERMINED ending, zero deaths

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Incapacitate both guards, spare the fleeing operator, choose CALM opening and DETERMINED final words. Record the complete MEDIA REACTS sequence: the no-casualty increase and the separate tone popup. One increase alone cannot distinguish casualty credit from a positive tone effect.

**Inherited evidence and limits.** [ending-conflicts-ch17-23.md](ending-conflicts-ch17-23.md): Verdict: not settled; low confidence in choosing between the opening and ending predicates. No change to ending-based `stratfordNewsTone` or its tone-line ±2. Do not use a speech-only comparison without the aftermath to infer an opinion delta.

**Pass-three hunt.** Query: `Detroit Become Human tour Stratford calme déterminé discours médias`. [Calm vs Determined Speech - DETROIT BECOME HUMAN](https://www.youtube.com/watch?v=77Del_W3Dps) (previously named lead) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch23-02-search.jsonl` / `ch23-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-01 — all evidence hidden, coffee, ALICE/TIRED, then DOG

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** A continuous police passage showing every hidden item and Luther/Alice's location; timely opening; coffee actually made; ALICE, TIRED, then DOG; the officer's scanned suspicion immediately before the noise and whether he leaves or opens the laundry room. A safe DOG result with NOBODY is useful evidence of conditionality, but not the literal requested setup.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; high confidence DOG is not an unconditional failure, medium confidence the requested clean route is safe. The literal ALICE/TIRED test is not yet independently established by a matched recording. Benchmark: no change to the safe clean-DOG result; the combined suspicion model needs the separate correction described below. `noise.DOG=2` and `threshold=3` are not measured game data.

**Pass-three hunt.** Query: `Detroit Become Human train de minuit chien fatiguée Alice`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-01-search.jsonl` / `ch25-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-02 — evidence exposed, upstairs hiding, WASHING MACHINE

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Intentionally expose magazine advertisement, blood cupboard and clothes; leave the laundry door as specified; send Luther/Alice upstairs; open promptly; make coffee and answer TIRED; choose WASHING MACHINE. Show each discovery, scanned suspicion and the resulting officer exit/search. Distinguish not hiding *evidence* from failing to hide Luther/Alice, which can cause the other death ending before the noise question.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; medium confidence that exposed evidence can still be recovered from. No controlled numeric replacement is available. Benchmark: no immediate code change. Candidate K15w10 change is `three exposed items make every answer fatal → outcome depends on measured suspicion after coffee and responses`; do not implement an unconditional WASHING MACHINE success override or import Steam's 70% as extracted data.

**Pass-three hunt.** Query: `Detroit Become Human Ночной поезд стиральная машина улики`. [Detroit: Become Human - НИЧЕГО ПРИМЕЧАТЕЛЬНОГО](https://www.youtube.com/watch?v=fxk8XNBR8ps) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-02-search.jsonl` / `ch25-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-03 — coffee omission and UPSET

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Two same-checkpoint comparisons, with suspicion scans bracketing only the changed event: (a) make coffee versus leave it unmade through its deadline; (b) TIRED versus UPSET with identical evidence, prior answers and coffee. Include both the immediate value and any deferred update after the line/animation. A successful UPSET ending alone cannot prove UPSET adds zero.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; medium for coffee helping, low for the UPSET increment. Neither requested isolated meter comparison is measured. Benchmark: no change to `noCoffee +1` / `upset +1` pending measurement; explicitly keep both amounts provisional. Distinguish a coffee bonus from an omission penalty until the baseline/deadline is measured.

**Pass-three hunt.** Query: `Detroit Become Human Mitternachtszug Kaffee aufgebracht Verdacht`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-03-search.jsonl` / `ch25-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-04 — only the laundry door left open

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Hide all other evidence and Luther/Alice safely, leave this door visibly open throughout the police visit, choose WASHING MACHINE, show suspicion and exit/search. A companion closed-door replay isolates whether the door changes the meter, merely presents an opportunity to search, or has no independent effect.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: not settled; low confidence in any independent door weight. Benchmark: no change to `rules.suspicion.sources.laundryDoor` / its calibrated +1; retain its explicit assumption label. No evidence supports turning an open door into automatic discovery.

**Pass-three hunt.** Query: `Detroit Become Human tren medianoche puerta lavandería abierta`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-04-search.jsonl` / `ch25-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-05 — hiding window and number of actions

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Continuous efficient hiding routes with the countdown visible: magazine cover (requires it to have been read), blood cupboard, clothes, laundry door, Luther's hiding instruction, kitchen curtain when applicable, and Adam. Record actual order, animation times, remaining game-clock seconds and whether the officer insists. To prove a maximum, one successful route is insufficient: compare feasible routes and distinguish kitchen-only curtain work from an upstairs route.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; high confidence in a timed hiding window, low confidence in a universal action maximum. Benchmark: no change to `HIDE_BUDGET` (currently 7, forcing the door at the boundary) until calibrated route timing is chosen. Describe the six-before-forced-opening behavior as an adaptation, never an extracted maximum.

**Pass-three hunt.** Query: `Detroit Become Human Nocny pociąg ukryj dowody czas`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-05-search.jsonl` / `ch25-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch25-06 — fire conversation after TAKE ALICE OUTSIDE

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Choose TAKE ALICE OUTSIDE at Mary's body; after Rose leaves, physically approach Alice/fireplace and attempt the sit/talk interaction. Record INSIST/LET IT GO if offered, or a clear unobstructed scan/attempt showing its absence before the police interrupt. A player simply walking elsewhere does not establish a locked conversation.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: not settled; low confidence in the gate. Benchmark: no change to the K15q STAY prerequisite. Do not remove it solely because the transcript leaves the condition unstated. No new measured Alice relationship delta is implied by this question.

**Pass-three hunt.** Query: `Detroit Become Human train de minuit Alice dehors cheminée`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch25-06-search.jsonl` / `ch25-06-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch26-01 — Molotov first, peaceful actions afterward

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** From a fresh Make a Statement checkpoint: go directly to the pavilion, TAKE; perform only peaceful actions afterward; show the final meter, the current-run PACIFIST/AGGRESSIVE MESSAGE node, closing news and ending tile. TAKE at the pavilion also automatically burns the pavilion; the test means no *additional* violent acts, not that TAKE is visually non-destructive. A second controlled test should accept the bottle after overturning a car but never deliberately throw it: this distinguishes a bottle flag from the pavilion's automatic fire.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; medium-high confidence in the riot-ending hypothesis, low in its exact predicate. No matched TAKE-plus-peaceful footage establishes the universal rule. Benchmark: no change to the riot result provisionally. However, do not claim `message()`'s TAKE→AGGRESSIVE MESSAGE conflation is independently verified: the community retest specifically distinguishes the message node from the ending. Candidate future change: `capitolMessage` and `capitolEnding` must be calculated separately if that mixed pair is filmed.

**Pass-three hunt.** Query: `Detroit Become Human Capitol Park Molotow friedlich Ende`. [Detroit  Become Human Playthrough Part #25 / Capitol Park](https://www.youtube.com/watch?v=c5ioO6lERNs) (previously named lead) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch26-01-search.jsonl` / `ch26-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch26-02 — one tag before the pavilion

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Start a fresh protest; complete exactly one object tag (show both any initial symbol-selection step and the finished tag); show the stabilized meter; go directly to the untouched pavilion and record REFUSE/TAKE or automatic flag planting. Repeat at successive counts to determine the boundary, keeping object types and elapsed time explicit.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; high confidence that the benchmark's meter representation is inaccurate, low confidence in a replacement offer threshold. The exact yes/no one-tag test remains open. Benchmark implication: CP09 `readsPeaceful()`/`due()` currently withholds after any purely peaceful first counted action; replace that derivation only with a measured meter/offer model. Do not replace it with a guessed two-tag/three-tag cutoff or promote GameFAQs' route list to a controlled experiment. No defensible drop-in gate value yet.

**Pass-three hunt.** Query: `Detroit Become Human Capitol Park symbole pavillon molotov`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch26-02-search.jsonl` / `ch26-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch26-03 — acted-on 55% peaceful / 45% violent

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Establish a no-Molotov protest with a *stable final* 55% peaceful/45% violent HUD (or another value strictly between 40 and 60); stop interacting; record through the timeout, current-run message node and final ending. Include both a one-direction low-strength route and a deliberately mixed route: the same displayed value may have different action history. Also test 50/50 after actions separately from untouched 50/50.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: not settled; low confidence in any of the three proposed answers. Benchmark: no change to the final fallback pending evidence; label `<60% peaceful → aggressive` as adaptation. The meter-representation discrepancy above is supported, but it does not choose a final ending for this case. In particular, the observed early 55% peaceful HUD is not a successful or failed *final* 55% test.

**Pass-three hunt.** Query: `Detroit Become Human Capitol Park 55 pacifiste 45 violent`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch26-03-search.jsonl` / `ch26-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch26-04 — windows and speech-conditioned billboards

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** In a continuously propagated save, show the peaceful Stratford broadcast (or its unambiguous Capitol Park prologue acknowledgment), then isolate the billboard hack between stable HUD reads. Repeat after an aggressive broadcast. Isolate a single shop-window liberation similarly. For lights/banner/overload, test both incoming meter majorities rather than importing a fixed valence from a trophy checklist.

**Partial evidence (citation corrected 2026-11-09).** Correction 2026-11-09: qSR8t-LJuZs shows DEPLOY BANNER, with the billboard group still padlocked at 09:52; withdraw its earlier filmed-billboard attribution. Shop-window violent direction remains supported; speech-dependent billboard behavior remains a written hypothesis, without an isolated filmed delta. See `docs/research/video-leads/ending-conflicts-pass4-ch17-27.md#ch26-04` and `docs/research/video-evidence/ch26/ch26-04-qSR8t-LJuZs-09-52.png`.

**Pass-three hunt.** Query: `Detroit Become Human Capitol Park panneaux discours pacifique`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch26-04-search.jsonl` / `ch26-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch26-08 — bench, car and window relationship arrows

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** From a clean protest, overturn one bench, wait until its North popup finishes, then overturn a car while refusing/delaying the separate Molotov response; show whether a second North popup occurs **before** REFUSE/TAKE. Separately liberate the shop-window androids with the entire Jericho/North popup sequence visible. Repeat car-first/bench-second to distinguish per-object, first-violent-action and once-per-category effects.

**Inherited evidence and limits.** [ending-conflicts-ch25-27.md](ending-conflicts-ch25-27.md): Verdict: partially settled; high confidence in the already filmed bench North-up and shop-window Jericho-up; low/medium in a separate car bonus. Benchmark: no change to the provisional per-object arrows. Do not replace them with a first-violent-only rule based solely on the Reddit claim, and do not promote its numeric scaling to measured game values.

**Pass-three hunt.** Query: `Detroit Become Human Capitol Park banc voiture North relation`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch26-08-search.jsonl` / `ch26-08-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch27-13

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Record Capitol Park’s flee/no-officers ending and continue the same save to Connor and Hank arriving together at Kamski’s home. Retain all arrival dialogue and any Chris option; killed/spared officer histories do not answer the no-officers case.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Chris dialogue presence only; no demonstrated outcome gate.

**Pass-three hunt.** Query: `Detroit Become Human Spotkanie z Kamskim Chris Capitol ucieczka`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch27-13-search.jsonl` / `ch27-13-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-01 — Simon at Neutral rescues Markus

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** John absent; Simon alive; show Simon's **current** Neutral band after every plaza relation change, then SACRIFICE and the full rescue/execution. A failed-charge test must additionally show the late-attack decrease. Record Jericho's band too, so a purported additional Jericho prerequisite can be tested rather than assumed. A chapter-start Neutral label is insufficient.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in retaining Friend as the working rule; Neutral itself not settled. Change: no change to `inputs.simonGood`/`rescue`: keep `simon && simonTrust >= SIMON_FRIEND`, John first. Do not lower the gate to Neutral or add a Jericho conjunct.

**Pass-three hunt.** Query: `Detroit Become Human Марш свободы Саймон нейтрально жертва`. [Detroit: Become Human 100% ➤ Last Chance, Connor ➤ All Endings](https://www.youtube.com/watch?v=v3qWxt8Y7rs) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-01-search.jsonl` / `ch28-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-02 — late ATTACK relationship arrows

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Select first STAND GROUND, then ATTACK; retain every menu and the North/Josh/Simon popups through commitment to the charge. Separate the initial stand's North/Simon decreases from the late attack's changes. A different route into CHARGE is corroboration, not the exact requested test.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; high confidence in the filmed M19a late-CHARGE arrows, medium in extending them to after-first-STAND ATTACK. Change: supported for the filmed final-menu charge: M19a CHARGE no relationship deltas → North +1, Josh −2, Simon −1 once. Extension to M18g/M18h stays a corroborated candidate. Do not apply these again on initial M18f CONFIRM.

**Pass-three hunt.** Query: `Detroit Become Human Freiheitsmarsch standhalten angreifen North Simon`. [All Freedom March Endings and Death Scenes (STAY/LEAVE/CHARGE) - DETROIT BECOME HUMAN](https://www.youtube.com/watch?v=xPD_oe6BryM) (previously named lead) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-02-search.jsonl` / `ch28-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-04 — late ATTACK asks CONFIRM / ABANDON?

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** First STAND GROUND → second-menu ATTACK, then show either CONFIRM/ABANDON or uninterrupted charge. Preserve a separate initial-ATTACK control.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in the present immediate-charge rule. Change: no change to M18g ATTACK → `charge(s)`; do not add another confirmation merely from the template pointer.

**Pass-three hunt.** Query: `Detroit Become Human Marsz wolności pozostań atakuj`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-04-search.jsonl` / `ch28-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-06 — PUSH North, optionality and arrow

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show the PUSH opportunity, deliberately press it, and retain the resulting North small-up popup; repeat across alternate fight routes and misses that change choreography. To establish “every fight”, distinguish fights lost before the intervention point from fights reaching that point.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in existence/effect, low in universality. Change: no change to M19b's PUSH/+1 representation; keep its placement as an adaptation, not a proven universal step.

**Pass-three hunt.** Query: `Detroit Become Human marche liberté pousser North`. [DETROIT BECOME HUMAN - Trophy - Demonstration (Freedom March) Confrontation / Stand Your Ground](https://www.youtube.com/watch?v=jRMhQsCmJU0) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-06-search.jsonl` / `ch28-06-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-07 — Jericho conversion bonus counts pre-march androids?

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show all pre-march conversions and the first AX400/worker recruitment, then decline every optional street-side conversion through the plaza. Record the complete Jericho-popup timeline. Compare a second run adding march conversions one at a time; do not equate the large crowd HUD with Markus's manually converted count.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: not settled; low confidence in any replacement count. Change: no change to `convert()` or `rules.convertThreshold`; retain the explicit calibration. Candidate all-chapter tally → march-only tally remains unmeasured; do not silently substitute it.

**Pass-three hunt.** Query: `Detroit Become Human 自由への行進 変異体 ジェリコ`. [Detroit Become Human(デトロイトビカムヒューマン) #29 第27話「自由への行進」& 第28話「最後の切り札」それは命か、それともモノか。](https://www.youtube.com/watch?v=UxcHzaqqhCI) (new to these six reports); [【PS4 PRO】DETROIT BECOME HUMAN - #28C 自由への行進・EDサイモンが自分を犠牲にしマーカスを救った（100%コンプリート率攻略）](https://www.youtube.com/watch?v=M5VkBOqLpkg) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-07-search.jsonl` / `ch28-07-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-08

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Record a peaceful Capitol Park protest with the store freed, propagate that save to the Freedom March roof, then inspect both covers/articles of the magazine. Show whether ANDROID RIOT and EASTERN SPACE RACE are available separately.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Roof magazine availability only; no demonstrated outcome gate.

**Pass-three hunt.** Query: `Detroit Become Human 自由への行進 雑誌 平和`. [自由への行進【Detroit: Become Human】＃２４](https://www.youtube.com/watch?v=pryfduR737g) (new to these six reports); [【DETROIT】－BECOME　HUMAN－　【自由への行進】](https://www.youtube.com/watch?v=yAnoetONuQ0) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-08-search.jsonl` / `ch28-08-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch28-09 — STAND GROUND → DISPERSE gives another menu?

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Select first STAND GROUND; select DISPERSE on the next ATTACK/STAND GROUND/DISPERSE menu; retain all frames to the ending chart. A path that stands twice and then runs, or disperses at the initial menu, does not answer this.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium-high confidence in the text-supported correction candidate, not yet a matched-footage closure. Change: reject a blanket M18g option-2 `openFire` → `fled(s)` patch: it would break the newly observed after-ABANDON branch. If first-STAND → DISPERSE is ultimately shown to flee, track the second warning's origin (`stand` versus `abandon`) and alter only the stand-origin branch, with flight arrows once. Preserve initial DISPERSE and after-ABANDON DISPERSE → M18h. The exact stand-origin observation is still required.

**Pass-three hunt.** Query: `Detroit Become Human marche liberté rester disperser`. [Detroit : Le sacrifice que personne n'ose faire... (27/32 Detroit Become Human)](https://www.youtube.com/watch?v=cJnpa2RzVqI) (new to these six reports); [Detroit: Become Human - Ep11 (FINAL) - Live together, die together…](https://www.youtube.com/watch?v=9yDpsqeVMWs) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch28-09-search.jsonl` / `ch28-09-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch29-01 — Carlos' body alone permits archive entry

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Carlos dead, Rupert escaped, Tracis spared, Simon alive, kitchen deviant escaped, no Kamski key; document the history and continue from Fowler's office into archive play or decommissioning. Also distinguish Carlos's trusted confession/statue clue from a body with no usable Jericho chain.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: not settled; low confidence. Change: no change to `sufficientEvidence()`; do not replace any qualifying body with `evidenceRoutes()` solubility on logical inference alone.

**Pass-three hunt.** Query: `Detroit Become Human Последний шанс Коннор только Карлос улики`. [Detroit: Become Human — Последний шанс Коннора (Часть 29)](https://www.youtube.com/watch?v=EaHNt3-K_Iw) (new to these six reports); [Прохождение Detroit: Become Human / Detroit: Стать человеком - Часть 4:Напарники](https://www.youtube.com/watch?v=C1U_kdvgcZU) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch29-01-search.jsonl` / `ch29-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch29-03

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Record prior chapter end through Last Chance start without edits, with known insufficient evidence.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict/confidence. partially; medium-high.

**Pass-three hunt.** Query: `Detroit Become Human Letzte Chance Connor keine Beweise Amanda`. [Detroit: Become Human - Walkthrough Chapter 29 - Last Chance, Connor // All Endings](https://www.youtube.com/watch?v=9bngTUguKgY) (new to these six reports); [Detroit: Become Human / Chapter 29: Last Chance, Connor / All Outcomes](https://www.youtube.com/watch?v=EL_ig_jz-n4) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch29-03-search.jsonl` / `ch29-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch29-05 — Gavin tolerates one or two QTE misses

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Experienced difficulty, visibly fail exactly the first prompt, succeed on every remaining prompt, show the result; repeat with two specified failures. Record input failure feedback. A red PlayStation Circle glyph is not by itself a failed input.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in tolerance as a source-supported hypothesis, low in the exact budget. Change: no change to C20g's whole-fight `risk: 0.25`; label it calibrated, not a sourced 25% statistic. Do not replace it with an all-or-nothing one-prompt rule.

**Pass-three hunt.** Query: `Detroit Become Human Ostatnia szansa Connor Gavin QTE porażka`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch29-05-search.jsonl` / `ch29-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch30-01 — second versus third wound

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Start before the fresh raid with zero recorded injuries; show each distinct VITAL SYSTEM DAMAGED/wound event, route choice and death without a splice. Repeat for the deviant-Connor takeover. Count failure events separately from bullets fired in an animation or a final execution shot.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium-high confidence in the two-failure-event model, not a globally measured bullet count. Change: no change to `rules.woundsToDie=2`/`hitMarkus`/`hitConnor`; do not globally change 2 → 3 from guide prose.

**Pass-three hunt.** Query: `Detroit Become Human Rozdroża Markus ranny śmierć`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch30-01-search.jsonl` / `ch30-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch30-03 — returning exile versus machine Connor in the hold

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show ousting, SAVE YOUR PEOPLE, Connor remaining a machine, surviving his pursuit, then the returning Markus's hold encounter/reach-the-gun QTE. A replacement Connor appearing outside the ship does not establish that the pursuer survived to the hold.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: settled for current code; partially for the in-game predicate, medium confidence. Change: no change; preserve already-implemented returning-exile access. Do not apply the old cabin-leader patch twice. Game-level closure still needs the specified recording.

**Pass-three hunt.** Query: `Detroit Become Human Croisée chemins Markus exclu Connor machine`. [Detroit : Become Human - Croisée des chemins-Markus](https://www.youtube.com/watch?v=zoLumpaEvKc) (new to these six reports); [[LET'S PLAY] [DETROIT BH] EP11 -La croisée des chemins-](https://www.youtube.com/watch?v=Xk8HzCvRqBE) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch30-03-search.jsonl` / `ch30-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch30-04 — DON'T KISS ends Lover status?

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Establish Lover, select DON'T KISS, show the band immediately afterwards, continue on the same save through Night of the Soul to ch32's KISS NORTH menu. Record any intervening relationship changes and whether final KISS is available.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in persistence. Change: no change to M21b DON'T KISS: retain `northLover` and the large decrease; do not add `northLover=false` without the control.

**Pass-three hunt.** Query: `Detroit Become Human Crossroads North dont kiss final kiss`. [Detroit: Become Human - Crossroads (Part 30)](https://www.youtube.com/watch?v=cA_AefLdTZ8) (new to these six reports); [Detroit : Become Human - EVIL PATH - Chapter 29 - CROSSROADS](https://www.youtube.com/watch?v=94jpbFpI3Qg) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch30-04-search.jsonl` / `ch30-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch30-05 — Neutral Alice plus DISTANT

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show Alice Neutral before DISTANT, with prior history known to have reached Neutral, then show the post-choice band and whether she leaves as the raid begins. Compare Warm and Distant controls; resolve whether the check precedes or follows the choice's delta.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; high confidence in the source conflict, low-medium in the runtime boundary. Change: no unconditional runtime correction. Source-priority candidate K17 `v===1 && aliceMax<ALICE_KEY` → `v===1 && current Alice band below Warm`, with check timing explicitly specified. Do not present that candidate as observed or substitute an invented numeric cutoff.

**Pass-three hunt.** Query: `Detroit Become Human Перепутье Алиса нейтрально отстраненно`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch30-05-search.jsonl` / `ch30-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch30-06 — abandoned Luther returns later

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Select PROTECT ALICE at Luther's initial corridor wound; escape with Kara/Alice and continue to the later captive encounter without skipping chapters. Show FIND LUTHER & JERRY versus Jerry alone; alternatively record an explicit confirmed later death. Distinguish this from HELP LUTHER → hide him safely.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: not settled; low-medium confidence. Change: no change to K18 PROTECT ALICE `luther=false`/left fate. Narration should distinguish presumed loss from a witnessed death; do not resurrect him from the hidden-Luther example.

**Pass-three hunt.** Query: `Detroit Become Human Croisée chemins protéger Alice abandonner Luther`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch30-06-search.jsonl` / `ch30-06-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch31-01 — surviving machine Connor gets THIN ICE

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Connor survives the gun contest and shoots Markus; show chapter transition, the entire Night of the Soul sequence and title/flowchart, then any later garden scene. Distinguish replacement dialogue about the previous Connor from a survivor briefing.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium-high confidence in retaining replacement-only Thin Ice. Change: no change to CN01 `connorDied && !deviant`; do not widen it solely because the template files the X1303C variant there.

**Pass-three hunt.** Query: `Detroit Become Human Noc duszy Connor maszyna przeżył`. [Detroit: Become Human - Noc duszy (inne zakończenia)](https://www.youtube.com/watch?v=xAGc4vaCjFA) (new to these six reports); [Detroit: Become Human - Burzowa noc  (inne zakończenia)](https://www.youtube.com/watch?v=_D17cFcVNh4) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch31-01-search.jsonl` / `ch31-01-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch31-03 — Hank dies after resignation and Connor decommissioning

**Verdict: partially; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show Hank resigning, Connor subsequently decommissioned in Last Chance, then Hank's fate on the same history. Test the continued Markus/Kara branch separately from the all-three-gone Kamski ending; do not infer the general rule from a distinct terminal vignette.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; low confidence in the general gate. Change: no change to automatic Hank fate; candidate `hankResigned && Connor absent` → later suicide remains unverified and must not be made unconditional.

**Pass-three hunt.** Query: `Detroit Become Human Nacht Seele Hank kündigt Connor deaktiviert`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch31-03-search.jsonl` / `ch31-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch31-05

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Establish that Markus was ousted and remains alive but is gone, with Josh alive and Connor deviant. In the church, attempt free exploration and interaction with Josh and retain the actual CHECK ON JOSH prompt or a clear unavailable interaction. A North conversation menu alone is insufficient.

**Inherited evidence and limits.** [ending-conflicts-B.md](ending-conflicts-B.md): Verdict. Not settled; Deviant Connor CHECK ON JOSH availability; no demonstrated ending gate.

**Pass-three hunt.** Query: `Detroit Become Human Noche alma Connor Josh Markus expulsado`. [Detroit Become Human - Markus expulsado de Jericho - Markus Expulsado - Español Latino - 1080p](https://www.youtube.com/watch?v=3onvpEsUmd4) (new to these six reports); [Detroit Become Human - Markus Expulsado - Salvarse o Salvar a los tuyos - Español Latino - 1080p](https://www.youtube.com/watch?v=BThSGCmEzhM) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch31-05-search.jsonl` / `ch31-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch32-02 — non-Lover Companion North reaches store

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Show non-Lover Companion before the failed assault **and after its North-down popup**, then record retreat to store or North's shooting. Keep health, North survival and relationship changes visible. Starting at the bottom of Companion and falling to Friend is not a Companion-at-gate test.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence in the working rule. Change: no change to MR10 `northCompanion()`; do not replace Companion-or-Lover with Lover-only, or widen to Friend, from these clips.

**Pass-three hunt.** Query: `Detroit Become Human 運命の分かれ道 ノース 仲間 店`. [【PS4 PRO】DETROIT BECOME HUMAN - 運命の分かれ道・マーカス/革命 全ED＆100％フローチャート](https://www.youtube.com/watch?v=LvFR3hBDJYo) (new to these six reports); [Detroit Become Human(デトロイトビカムヒューマン) #09 第17話「ロシアンルーレット」& 第18話「命をつなぐもの」それは命か、それともモノか。](https://www.youtube.com/watch?v=z5YSWYgaVRI) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch32-02-search.jsonl` / `ch32-02-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch32-03 — non-Lover Friend/Companion North takes the bullet

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Use a non-romanced Companion save, show band before the barricade QTE, fail the decisive input and show sacrifice/death. Repeat at Friend. A Lover positive control is necessary but cannot establish either lower band.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium confidence for the Companion counterclaim, low for Friend; Lover control high confidence. Change: no change to MD14 `northLover`; candidate `northLover || non-Lover Companion` requires the controlled clip. Do not implement Friend-or-above as settled.

**Pass-three hunt.** Query: `Detroit Become Human bataille Detroit North amie bouclier sacrifice`. The item-specific three-result search produced no relevant video lead. Unrelated results were rejected. Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch32-03-search.jsonl` / `ch32-03-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch32-04 — rooftop LEAVE needs son / insist

**Verdict: partially; medium confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Same sufficiently high Friend save, omit both son questions while preserving the band, inspect LEAVE locked/unlocked; then ask HANK'S SON and INSIST and compare. Record Friend both before and after the arrival decrease. Separate a newly unlocked Friend path from current numeric band.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: partially; medium-high confidence in the positive sequence, unresolved necessity. Change: no unconditional patch. Candidate C24 option 0 `friendBeforeDrop` → `friendBeforeDrop && ch32cl.insisted` only after the matched negative control.

**Pass-three hunt.** Query: `Detroit Become Human batalla Detroit Hank hijo insistir abandonar`. [DETROIT BECOME HUMAN What happens if HANK convinces CONNOR not to kill NORTH on the roof](https://www.youtube.com/watch?v=3KHfjB5Mbu4) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch32-04-search.jsonl` / `ch32-04-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## ch32-05 — RK900 when soldiers / Perkins kill Markus

**Verdict: not settled; low confidence in the unresolved predicate.** No new visual evidence in pass three; the prior partial findings below are carried forward, not newly verified.

**Decisive test.** Machine Connor alive, Markus killed by soldiers or Perkins rather than Connor, no dirty bomb; show all endgame/credits through the epilogue or main menu. Hold North's leadership/survival outcome fixed. Test soldiers and Perkins separately if the predicates differ.

**Inherited evidence and limits.** [ending-conflicts-ch28-32.md](ending-conflicts-ch28-32.md): Verdict: not settled; low confidence. Change: no change to the RK900 epilogue gate; do not narrow or broaden from an unmatched machine ending.

**Pass-three hunt.** Query: `Detroit Become Human RK900 Perkins deal soldiers machine Connor ending`. [Detroit: Become Human - Gavin Kills Connor](https://www.youtube.com/watch?v=oQmcxWnw3Tg) (new to these six reports) Results are discovery metadata, not a reading of the gameplay. Exact results and stderr are in `ch32-05-search.jsonl` / `ch32-05-search.log` in the external pass-three directory. The acquisition ledger below distinguishes attempted downloads from leads that were only found.

**Exact benchmark change implied by pass three: no change.** The decisive observation remains missing. This does not withdraw a prior supported correction or certify the current implementation as a measured game rule.


## Capitol Park timer — separate question, no conflict ID

**Verdict: partially; low confidence in exact duration/pause/reset rules.** The previously filmed idle timeout establishes that the protest can end without actions; it does not measure a universal duration, maximum action count, or 100%-meter shortcut.

**Decisive observations.** Two clocks need different experiments. CP05: show the ten-minute store countdown at start and at expiry, including whether scans, reconstruction, dialogue, movement and QTEs pause it. CP09: from the exact first controllable frame after the speech, record an unedited idle timeout; repeat with deliberately spaced actions, with R2/scans and animations separately timed, and with different CP05 completion speeds. To test action-count termination, perform the same number of actions at substantially different paces. To test a 100%-meter shortcut, reach 100% early then stand still; do not infer a shortcut from sirens coinciding with a late 100% action.

**Pass-three evidence.** The Polish Capitol Park and platinum/100%-titled recordings are fresh search routes, but all attempted media access was refused. No new clock measurement was made. See `capitol-pl-download-*.log`, `speed-alt-download-*.log`, `speed100.jsonl` and `speed.jsonl`.

**Exact change: no new change.** Retain the sourced CP05 ten-minute distinction. Do not relabel `spreadTime=12`, `spreadWait=4`, or per-action costs as measured seconds/minutes or an extracted maximum of twelve actions.

## Closing implied-changes table

“None newly justified” describes this pass’s evidentiary contribution. It does not approve or reverse concurrent orchestrator edits. Exact current-tree code diagnosis is intentionally avoided because the shared working tree changed before this pass and may change during it.

| Item | Per-item verdict / confidence in unresolved predicate | Change newly implied by pass three |
|---|---|---|
| ch06-03 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch09-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch09-14 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch09-16 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch10-18 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch10-24 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch10-34 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch11-05 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch13-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch13-29 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch13-36 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch14-05 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch15-12 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch15-14 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch15-18 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch17-01 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch17-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch17-03 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch17-04 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch17-05 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch17-06 | not settled / medium | No new change; retain the prior evidence/candidate distinction. |
| ch17-07 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch19-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch19-03 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch23-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch23-02 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch25-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch25-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch25-03 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch25-04 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch25-05 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch25-06 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch26-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch26-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch26-03 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch26-04 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch26-08 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch27-13 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch28-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch28-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch28-04 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch28-06 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch28-07 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch28-08 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch28-09 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch29-01 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch29-03 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch29-05 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch30-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch30-03 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch30-04 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch30-05 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch30-06 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch31-01 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch31-03 | partially / low | No new change; retain the prior evidence/candidate distinction. |
| ch31-05 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| ch32-02 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch32-03 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch32-04 | partially / medium | No new change; retain the prior evidence/candidate distinction. |
| ch32-05 | not settled / low | No new change; retain the prior evidence/candidate distinction. |
| Capitol Park timer | partially / low | No new change; duration, pausing, reset and shortcut controls remain missing. |

Previously supported corrections/candidates must be kept separate from this pass’s acquisition failure:

| Inherited finding | Orchestrator implication already recorded in the supplied reports |
|---|---|
| ch25 safe blood + coffee + UPSET + DOG; safe HEARD NOTHING control | Prior footage contradicts an unconditional fatal/noise-unit rule. Any repair must admit those filmed histories, subject to the prior difficulty caveat; no measured replacement weights or universal safe answer were recovered here. |
| ch26 displayed 55/45 and 65/35 | Do not describe the benchmark’s first-action 100% normalized action share as the extracted game meter. No exact replacement update function or Molotov threshold is supplied by pass three. |
| ch26 billboards | Citation corrected 2026-11-09: qSR shows DEPLOY BANNER; no filmed contradiction of universal billboard valence follows from that clip. Speech-conditioned behavior remains a written hypothesis. |
| ch28 late final-menu CHARGE | Prior filmed branch supports North small up, Josh large down, Simon small down once. Do not silently extend that control to every STAND-origin menu or double-apply initial confirmation. |
| ch28 DISPERSE | Preserve the observed after-ABANDON path. Any future first-STAND correction must distinguish menu origin; no blanket patch is supported. |
| ch29 map-to-memory route, already settled | Retain the prior supported correction to allow eligible repaired/scannable memory routes, not tablet only; pass three did not measure every body’s repair requirements. |
| ch30-03 returning exile | Code discrepancy was already fixed in the supplied report’s inspected tree; do not reapply the stale cabin-leader patch. Full game continuity remains unfilmed. |
| ch30-05 Alice / ch32-04 rooftop | Current-band-below-Warm and Friend-plus-insist remain candidates awaiting the exact matched controls; no unconditional patch. |

## Verification and limits

`bun run check` passed at the start of this research (862 generated questions, story 1.9.12, 490 atlas coverage entries). Baseline `bun run test` was started, then explicitly terminated after approximately five minutes under concurrent shared-machine test load; the log had reached chapter 27 without a final summary. This is **not a passing-suite claim**. The report/manifest coverage checks passed (60 unique IDs, 30 logged bot-check refusals, every retry interval over 61 seconds, zero new media). No story/atlas assembly or build was run because this task changes research documentation only and explicitly forbids implementation edits. No fetched film was viewed, no frame is claimed as newly inspected, and no empty evidence file was created to stand in for missing media. Source HTML, search metadata, scripts and access refusals remain outside the repository in the requested pass-three directory.
