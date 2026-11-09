# Gauge calibration · partial evidence pass · 2026-11-09

**Result: no new numeric band width or large-arrow magnitude established.** Fresh footage acquisition was blocked by YouTube's anonymous-access check. This report distinguishes inherited operator measurements, re-inspected repository frames, and uninspected video leads. It is not a completed continuous-playthrough measurement. No benchmark files, tests, CONFLICTS.md or SOURCES.md were edited; no commit was made.

## Acquisition and evidence provenance

Read: `benchmark/scales.mjs` including M1–M4/H1–H10; SOURCES.md §13 and reliability log; all current operator journal files; the attitude/threshold classification in `ending-conflicts-A.md`; corresponding current CONFLICTS entries. Several classified items are now settled in the working copy; this pass does not reopen or close them.

Anonymous `yt-dlp` 2026.10.26 failed on `MiaA8LQ0vOQ`, `Ou2K8Ml25Tc`, `gZQ693-umPU`, and `NRksvei25DI`. The first attempt requested metadata; subsequent attempts requested only short video sections with `-f 'bv*[height<=720]'`. Retrying the first video with `youtube:player_client=android,web_embedded` also failed. Error: **“Sign in to confirm you’re not a bot.”** No cookies, login, or authentication were used. No new video segment was acquired and no new frame was extracted. Logs are in [access-logs](../video-evidence/gauges/access-logs/).

The frames below were opened and visually re-inspected from the existing repository, then copied byte-for-byte to the requested gauge directories. Some inherited PNGs are multi-frame composites, not single frames; their component timestamps come from the earlier reading, not fresh extraction. [manifest.json](../video-evidence/gauges/manifest.json) records original paths and SHA-256 checksums. Unknown history, difficulty and intervening arrows remain unknown.

## Measurement rule

One small arrow is the reference unit, not proof of the game's internal numeric implementation. Counting net small arrows between **adjacent, observed upward crossings** measures the intervening band only when the complete interval is watched, no reload occurs, and all changes are counted. A first or last chapter label alone supplies inequalities. A popup badge can also be an initial display, so badge presence alone does not prove a crossing; badge absence does not prove no crossing. Terminal bands, caps, hidden updates and nonuniform widths must be considered separately.

With large events in an interval, the equation is `band width = net small arrows + sum(signed event magnitudes)`. One unknown width and one unknown large magnitude cannot generally be identified from one interval. Large magnitudes must be indexed by event; Hank's spill and purchase need not agree. All computed bounds below assume accurate small-arrow counts and the stated band model.

## Long-play leads for a resumed pass

These are **search-discovered candidates, not visually verified continuous runs**. Chapter timestamps are uploader description markers. HUD legibility, unedited continuity, difficulty, chapter-end headers and absence of checkpoint reloads still need verification. “Best ending” is not a difficulty setting.

- [CRUMOG, full game / best outcomes, PC, fGkxdQi8ZcA](https://www.youtube.com/watch?v=fGkxdQi8ZcA). Description gives one chronological chapter sequence, useful as a possible common history for all gauges.
- [GamingIsFun, Platinum walkthrough, NRksvei25DI](https://www.youtube.com/watch?v=NRksvei25DI). Description has separate GOOD and BAD playthroughs plus cleanup. Never concatenate these as one run. Its Pirates' Cove marker is inconsistent with neighboring chapters; seek manually there.
- [Full-game longplay, MiaA8LQ0vOQ](https://www.youtube.com/watch?v=MiaA8LQ0vOQ) and [full gameplay, Ou2K8Ml25Tc](https://www.youtube.com/watch?v=Ou2K8Ml25Tc) were additional access probes. No visual claims are made for either.

Reproduction template, using the CRUMOG Partners window (download outside repository; frames only in evidence directory):

```sh
/opt/homebrew/bin/yt-dlp --no-playlist --download-sections '*01:08:27-01:30:05' \
  -f 'bv*[height<=720]' -o '/tmp/gauge-calibration/fGkxdQi8ZcA-partners.%(ext)s' \
  'https://www.youtube.com/watch?v=fGkxdQi8ZcA'
```

Download a full interaction interval where missed popups would invalidate counting; then extract each observed popup onset and settled level reveal with ffmpeg. Preserve source-clock timestamps and segment-relative timestamps separately. An isolated status frame cannot fill a missing interval.

## Hank

**Target videos:** CRUMOG Partners 1:08:27–1:30:05; Interrogation 1:43:19–1:55:32; Waiting for Hank 2:26:04–2:44:28; Bridge 5:11:00–5:16:30. GamingIsFun GOOD equivalents: 0:44:45–0:58:40; 1:09:45–1:19:35; 1:37:50–1:51:24; 3:52:21–3:57:35. The latter interval's next chapter marker is plausible but adjacent Pirates' Cove metadata is inconsistent. **Difficulty:** not inspected. Operator Partners runs are Experienced per scales header.

**Inherited operator sequence** ([journal](../operator-notes/ch06-partners.md)); no video timestamps exist for these operator replays:

| Run / timestamp | Event | Arrow | Level after, flowchart header |
|---|---|---|---|
| A+B / not recorded | Start | — | Tense |
| A+B / not recorded | PERSIST once | small down | Tense |
| A / not recorded | SPILL | large down, magnitude L | Hostile |
| A / not recorded | PATIENT | small up | Hostile |
| A / not recorded | Blue-blood explanation / correct reconstruction combined | one small up total | Tense |
| B / not recorded | BUY ANOTHER DRINK | large up, magnitude D | Neutral |
| B / not recorded | PATIENT | small up | Neutral |
| B / not recorded | Blue-blood explanation / correct reconstruction combined | one small up total | Neutral |
| A+B / not recorded | FOUND DEVIANT | no observed arrow | Tense / Neutral respectively |

**Re-inspected video frame:** [MiKeYROG/Sag903 gZQ693-umPU](https://www.youtube.com/watch?v=gZQ693-umPU&t=1718s), 28:38, wrong report: [small down, no level badge](../video-evidence/gauges/hank/ch06-13-gZQ693-umPU-28-38.png). This belongs to a different recorded route; it must not be appended to operator run B.

**Computation:** normalize Neutral's lower edge to 0, start −1, Tense `[-w,-1]`, Hostile `<=-w-1`. After spill and PATIENT, `-1-L <= -w-1`, so `L >= w`. After blue-blood up, `-L >= -w`, so `L <= w`. Thus **L=w**. Purchase route: `-2+D >=0`; after two small ups, `D<=w-1`. Thus **2<=D<=w−1 and w>=3**. Width 3, spill −3, drink +2 is the **minimal integer fit**, not a unique measurement. Width 4/spill −4/drink +2 or +3 also fits; width 5/spill −5/drink +2 to +4 also fits. Assuming D=2, one more up after run B separates w=3 from w>=4, but D itself needs independent calibration. Existing observed asymmetry is solid: spill magnitude exceeds purchase magnitude under this model.

**Confidence:** high in journal's reported labels/counts; conditional high in inequalities; exact w=3/L=3/D=2 not newly verified. **Remaining:** consecutive Neutral→Warm→Friend crossings; event-specific Save Hank, spare/shoot Tracis magnitudes; test start offset rather than silently fixing it. Bridge level and shooting outcome do not alone identify width.

## Amanda

**Target videos:** CRUMOG Waiting for Hank 2:26:04–2:44:28 and Public Enemy 5:38:01–5:56:28; GamingIsFun GOOD 1:37:50–1:51:24 and 4:18:10–4:30:54. Start from the first garden interaction and preserve all earlier Amanda events. **Difficulty:** not visible in inspected frames.

**Re-inspected source:** [Cheng Teoh -xIyydd0Yrc](https://www.youtube.com/watch?v=-xIyydd0Yrc), alternative Public Enemy dialogue, unknown prior history.

| Timestamp | Event per earlier reading | Frame observation | Resulting Amanda level |
|---|---|---|---|
| 04:27 | DETERMINED | [Amanda single up](../video-evidence/gauges/amanda/ch24-01--xIyydd0Yrc-04-27.png) | Not shown |
| 04:52 | COLD | [Instability single down](../video-evidence/gauges/amanda/ch24-01--xIyydd0Yrc-04-52.png), not Amanda | Not shown |
| 04:53 | COLD continuation | [Single up visible; Amanda name is not legible at this animation instant](../video-evidence/gauges/amanda/ch24-01--xIyydd0Yrc-04-53.png); attribution inherited from prior reading | Not shown |
| 05:19 | TOO FAR | [Amanda single down](../video-evidence/gauges/amanda/ch24-01--xIyydd0Yrc-05-19.png) | Not shown |

**Computation:** none; no level boundary and possible edits between alternatives. This is not a net +1 sequence for calibration. **Confidence:** high in legible Amanda arrow directions, no numeric calibration. **Remaining:** H5 first small decrease from initial Trusted (does Neutral appear?), then next adjacent crossing; initial offset, width and successful-confession large up. ch09-16's successful-probe reaction remains a separate unresolved producer, so do not assume its delta in a counted history. Betrayed is event driven, not another band.

## Alice

**Target videos:** CRUMOG A New Home 0:26:05–0:46:50; Stormy Night 1:30:05–1:38:24; Fugitives 1:55:32–2:14:18; On the Run 2:44:28–2:56:36. GamingIsFun GOOD equivalents: 0:15:22–0:30:06; 0:58:40–1:04:56; 1:19:35–1:27:27; 1:51:24–2:01:16. Follow a single run across all four. **Difficulty:** not visible in re-inspected frames; operator A New Home Experienced per scales header.

**Re-inspected source:** [DanaDuchy D-nrWXiEsVo](https://www.youtube.com/watch?v=D-nrWXiEsVo&t=1213s), Fugitives choices footage; earlier chapters/history not established.

| Source timestamp | Event | Arrow / resulting level | Evidence |
|---|---|---|---|
| 20:13 event, ~20:21 popup per prior reading | Give toy | One small up, no badge | [Inherited two-frame composite](../video-evidence/gauges/alice/ch10-13-D-nrWXiEsVo-20-13.png) |
| 20:39 prompt; ~20:53 first popup | Get in bed | Small up | [Inherited composite](../video-evidence/gauges/alice/ch10-07-D-nrWXiEsVo-20-39.png) |
| ~20:56–20:58 per prior reading | Bed continuation | Fresh small up; Trusted badge | Same composite; separate animation interpretation inherited from prior 4-fps reading |

**Computation:** these frames support one toy small and the earlier report of two bed smalls, not a Trusted band width. No preceding independently confirmed level crossing is captured. Do not treat the two single arrows as a measured “large = 2” event. Earlier operator evidence is: net 0 Distant; net +1 Distant/no key; all eight increases Trusted. With six point levels and uniform width, start 0 and Neutral edge w, Trusted edge 4w: `4w<=8<5w` implies **w=2 conditionally**. It depends on the unverified use of Close and equal-band/anchor assumptions. A five-level ladder with a wider initial Distant band also fits existing observations. No new exact width or large size.

**Confidence:** high for legible toy single-up/Trusted label; bed timing inherited, not freshly watched; six-level width-2 inference conditional. **Remaining:** key at exactly +2 (the +1 negative control is not proof of +2 sufficiency), explicit Close at the proposed +6, adjacent crossings through Warm/Trusted/Family on one continuous history, event-specific large magnitudes. The operator dishes-only run proves key >1 under unit-small assumptions, not by itself key exactly 2.

## Luther

**Target videos:** CRUMOG Pirates' Cove 4:51:59–5:11:00 and Midnight Train 5:56:28–6:15:40. GamingIsFun GOOD Midnight Train 4:30:54–4:50:37; Pirates' Cove requires manual location because its description places it after the Bridge marker. **Difficulty:** uninspected.

| Timestamp | Arrow | Resulting level |
|---|---|---|
| Not acquired | Not measured | Not measured |

No usable Luther gauge popup or paired level reveal was acquired/re-inspected. [Directory note](../video-evidence/gauges/luther/README.md) records absence; no substitute plot/death frame is presented as gauge evidence.

**Computed width / large size:** unknown. **Confidence:** none for H6 width 2 or Wary usage. **Remaining:** start Neutral offset; two small increases and explicit resulting level; adjacent Close→Trusted→Family crossings; Wary presence; event-specific large magnitudes. Do not borrow Alice's width by analogy.

## North

**Target videos:** CRUMOG Time to Decide 3:26:57–3:39:26 and Spare Parts 4:15:13–4:29:28; GamingIsFun GOOD 2:28:55–2:37:28 and 3:07:15–3:21:20. **Difficulty:** not visible in inspected frames.

**Re-inspected source:** [3y5R9Td2TLg](https://www.youtube.com/watch?v=3y5R9Td2TLg&t=1477s), Time to Decide; earlier in-run North history not re-established.

| Timestamp | Event | Arrow | Resulting level |
|---|---|---|---|
| 24:37 | Talk, per previous chapter reading | [Small up](../video-evidence/gauges/north/ch16-03-3y5R9Td2TLg-24-37.png) | Not shown |
| 25:18 | YOU selected | [Prompt frame](../video-evidence/gauges/north/ch16-03-3y5R9Td2TLg-25-18.png) | Not shown |
| 25:24 | YOU response | [Small down](../video-evidence/gauges/north/ch16-03-3y5R9Td2TLg-25-24.png) | Resentful |
| 25:25 | Settled popup | [No arrow at this instant](../video-evidence/gauges/north/ch16-03-3y5R9Td2TLg-25-25.png) | Resentful |

Separate source [6Pt08xsvyhk](https://www.youtube.com/watch?v=6Pt08xsvyhk&t=184s), Freedom March late charge, [03:04 small up](../video-evidence/gauges/north/ch28-02-6Pt08xsvyhk-03-04.png), no badge. This is not a continuation of 3y5R9Td2TLg.

**Computation:** a presumed initial Neutral plus +1 then −1 cannot become Resentful in an ordinary deterministic additive scale with no other updates. Therefore that conjunction of history/counting/constant-unit assumptions is suspect; altering a uniform band width alone cannot explain it. Existing MTD5 local −1 calibration is not a video-measured extra arrow or a measured small=2 event. No exact width or large size is identifiable here.

**Confidence:** high in +/− single-chevron shapes and Resentful label; no confidence in reconstructing an unseen initial numeric state. **Remaining:** continuous chapter opening and every earlier North interaction, independent status reads on both sides of YOU, adjacent Neutral/Friend/Companion crossings; North Lover is event driven. ch26-08's repeated bench/car attribution must be settled before counting that interval; ch28-06 PUSH remains an uncertain producer.

## Simon

**Target videos:** same Time to Decide / Spare Parts windows as North; inspect two complete chapters on the same history. **Difficulty:** not visible; earlier description labels `y50ZjZWX0gU` Experienced, not independently verified here.

| Video / timestamp | Event | Observed arrow / level |
|---|---|---|
| [y50ZjZWX0gU](https://www.youtube.com/watch?v=y50ZjZWX0gU&t=705s) / ~11:50, composite file named 11:45 | Propose raid | [Small up, Neutral](../video-evidence/gauges/simon/ch16-05-y50ZjZWX0gU-11-45.png) |
| [6Pt08xsvyhk](https://www.youtube.com/watch?v=6Pt08xsvyhk&t=181s) / 03:01 | Late charge | [Small down, no badge](../video-evidence/gauges/simon/ch28-02-6Pt08xsvyhk-03-01.png) |

These are different sources/histories. **Computed width / large size:** unknown; one up remaining Neutral is compatible with width 2 and wider bands, and does not establish start offset. **Confidence:** high for observed popup shapes and Neutral label, none for numerical H8. **Remaining:** first up, second up plus status, subsequent Friend→Companion crossing, all earlier Simon changes; Friend rescue gates cannot alone establish width.

## Josh

**Target videos:** CRUMOG Time to Decide 3:26:57–3:39:26 and Spare Parts 4:15:13–4:29:28, or corresponding GamingIsFun GOOD windows above. **Difficulty:** not visible in inspected frame.

| Video / timestamp | Event | Arrow | Resulting level |
|---|---|---|---|
| [6Pt08xsvyhk](https://www.youtube.com/watch?v=6Pt08xsvyhk&t=179s) / 02:59 | Late charge in Freedom March | [Large down, filled glyph](../video-evidence/gauges/josh/ch28-02-6Pt08xsvyhk-02-59.png) | Resentful |

**Computed width / large size:** unknown. A large arrow ending Resentful with unknown starting point cannot prove −2 or any band width. **Confidence:** high for large-down classification and Resentful label, none for numeric H8 or event size. **Remaining:** initial offset; adjacent crossings via small arrows; use the large-charge outcome only after its entering point/bands are independently measured. Never calibrate Josh from North or Simon by shared code assumptions.

## Jericho

**Target videos:** same Time to Decide / Spare Parts windows as North; then CRUMOG Capitol Park 6:15:40–6:40:42 or GamingIsFun GOOD 4:50:37–5:13:33 to inspect large changes. **Difficulty:** not visible; Experienced for y50ZjZWX0gU is inherited description metadata only.

| Video / timestamp | Event | Arrow / level | Evidence |
|---|---|---|---|
| [y50ZjZWX0gU](https://www.youtube.com/watch?v=y50ZjZWX0gU&t=705s) / ~11:47, composite named 11:45 | Propose raid | Small up; no legible Jericho badge in the selected composite (earlier reading reports Neutral in intervening animation) | [Composite](../video-evidence/gauges/jericho/ch16-05-y50ZjZWX0gU-11-45.png) |
| [PowerPyx F0Gyu2X-loM](https://www.youtube.com/watch?v=F0Gyu2X-loM&t=237s) / 03:57 | Free crate androids | Single up; Respected | [Frame](../video-evidence/gauges/jericho/ch19-01-F0Gyu2X-loM-03-57.png) |

**Computed width / large size:** unknown; cannot join different videos to count Neutral→Respected. **Confidence:** high for selected shapes/Respected label, no numeric H7. **Remaining:** explicit Uncertain after first decrease, full Neutral→Respected→Admired→Leader sequence, local widths without assuming uniformity, each large event size. Rejected is event driven. Resolve ch28-07 conversion-count producer before treating that route as a complete count.

## Public opinion

**Target videos:** CRUMOG Stratford Tower 5:16:30–5:38:01 and Capitol Park 6:15:40–6:40:42; GamingIsFun GOOD equivalents 3:57:35–4:18:10 and 4:50:37–5:13:33. These require earlier Hostage/Kara news history on the same run. **Difficulty:** not visible in inspected frame.

| Source / timestamp | Event | Arrow | Resulting level |
|---|---|---|---|
| Operator Shades of Color header / no video timestamp | After saving wounded cop in Hostage | One prior small increase, inherited | Indifferent |
| [Aus7NojGJM8](https://www.youtube.com/watch?v=Aus7NojGJM8&t=178s) / 02:58 | Battle for Detroit opinion/path status | No change arrow in this frame | [Sympathetic](../video-evidence/gauges/public-opinion/ch32-01-Aus7NojGJM8-02-58.png) |

**Computation:** operator reading confirms the first upward boundary is at +1 relative to the initial state if that cop arrow is the sole opinion update. It does **not** identify Indifferent's width or Sympathetic's +3 threshold. Sympathetic success in the separate ending video verifies a level gate, not a number of small units. No large magnitude measured.

**Confidence:** high in inspected Sympathetic label; operator +1→Indifferent inherited; no exact width. **Remaining:** count two consecutive positive crossings without intervening unknown large changes; quantify speech/message events separately; retain all Kara news updates. Classification items ch10-18/ch14-05/ch17-01/ch17-05/ch21-01/ch23-02 change the counted history, not the unit size. Earlier plot findings on these are not calibration measurements.

## Software instability (scope note)

No named numeric bands are visible in game; MACHINE/DEVIANT are meter captions. This pass did not acquire a continuous history ending at the Crossroads lock. Neither the existing lock frame nor community “4”/“8–10” estimates calibrates the same small unit. H10 and event-specific large instability sizes remain unmeasured. Do not infer instability deltas from Hank's arrows.

## Proposed changes to benchmark/scales.mjs

**No numeric change proposed from this pass.** The following are research-status recommendations for the orchestrator, not edits made here.

| Constant / definition | From → to proposed | Evidence / confidence |
|---|---|---|
| `SCALES.hank.width` | 3 → retain 3 provisionally | Operator replays establish w>=3, not w=3 uniquely; no new continuous crossing |
| Hank spill `MEASURED_ARROWS.delta` | −3 → retain −3 provisionally | Spill magnitude equals w under stated start/ladder model; −3 is minimal fit, not independent exact measurement |
| Hank purchase, literal/default large | +2 → retain +2 provisionally | 2<=D<=w−1; exact +2 follows if w=3 |
| `SCALES.amanda.width` | 3 → no change | No paired level crossings; H5 untested |
| `SCALES.alice.width`, Close ladder entry | 2 / Close → no change | Width 2 conditional on six equally spaced levels/anchor; Close still unverified |
| `THRESHOLDS.ALICE_KEY` | 2 → retain 2 provisionally | +1 no-key proves >1; no exact +2 positive control acquired |
| `SCALES.luther.width`, Wary ladder entry | 2 / Wary → no change | No acquired gauge evidence |
| `SCALES.north.width` | 2 → no change | Resentful after observed talk-up/YOU-down warrants a complete-history audit; width alone cannot fix net-zero mismatch |
| `SCALES.simon.width` | 2 → no change | One observed Neutral/up popup, missing next crossing |
| `SCALES.josh.width`, large default | 2 / 2 → no change | Large-down→Resentful is visible; starting point and magnitude unknown |
| `SCALES.jericho.width`, Uncertain entry | 2 / Uncertain → no change | Observed Respected/up; missing complete crossing interval and negative-band evidence |
| `SCALES.publicSupport.width`, `OPINION_SYMPATHETIC` | 2 / +3 → no change | +1→Indifferent does not fix next band; Sympathetic outcome footage has unknown cumulative history |
| All unmeasured `large` defaults | 2 → no change | No event magnitude numerically identified; single large glyph is not proof of two small units |
| M4/H2 confidence wording | “exact/measured/confirmed” → distinguish adopted minimal fit, lower bound and positive-control requirement | Reproducible arithmetic above; documentation proposal only |

**Handoff:** acquisition incomplete due anonymous-access blocking. Exact widths and large sizes per gauge remain as above; no new numerical calibration should be attributed to this pass. Resume with accessible, authorized no-login footage or already-local chapter segments, verify uninterrupted HUD intervals, and keep the first new run focused on Hank's adjacent crossings and Alice's actual ladder.

## Validation of this research artifact

All local report links resolve; 18 inherited frame copies match their originals and manifest SHA-256 values. `bun run check` passed: 862 questions, story 1.9.12, 490 atlas coverage entries. The requested baseline `bun run test` reported failures and multiple 5-second timeouts; it was stopped before completion. Concurrent edits elsewhere in this shared checkout prevent interpreting this as a stable before-change baseline. No failing test was repaired or benchmark file edited in this research pass.
