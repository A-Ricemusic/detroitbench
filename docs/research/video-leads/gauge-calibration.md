# Gauge calibration · continuous-video measurement pass · 2026-11-09

**Result: new continuous-run arrow counts establish model-implied local bands: Hank Warm 4; Alice Neutral 1, Warm 3, Trusted 4; Luther Close 1; public-opinion Skeptical 2.** They do not establish one uniform width for every band. Josh’s first Friend boundary is +5 from its initial state; Jericho’s first Respected boundary is +3. North remains Neutral after +2, Simon after +1. Large-event magnitudes mostly remain coupled to unknown widths, offsets or overshoot. Exact conditional results and confidence are below. No scales, benchmark, tests, CONFLICTS.md or SOURCES.md were edited; no subagents or commits were made.

## Acquisition and evidence provenance

The anonymous YouTube verification **succeeded** on CRUMOG `fGkxdQi8ZcA`. No login, cookies or alternate authenticated client was used; the refusal/two-minute retry contingency was not needed. All fresh measurements below use this **one source run**, not a mixture of uploaders or GOOD/BAD routes. The earlier access failures and inherited frame manifest remain historical evidence, not this pass’s acquisition result.

Downloaded 21 complete chapter windows (the named leads plus intervening Connor chapters, The Hostage, Jericho and Zlatko), one download at a time, using `yt-dlp --download-sections -f "bv*[height<=720]"`. Format 398 is 1280×720 AV1, 60 fps. Partners and Interrogation initially transferred slowly; bounded HTTP requests made later sections fast without changing their content or resolution. Raw MP4s remain outside the repository under `/tmp/gauge-calibration/`.

[Resumed manifest](../video-evidence/gauges/resumed-manifest.json) records source metadata, requested windows, actual durations, video hashes, frame counts and selected-frame hashes. [Observation JSON](../video-evidence/gauges/continuous-run-observations.json) records the same fresh sequence rows as the tables below. [OCR scan transcripts](../video-evidence/gauges/continuous-run-scans/) cover every chapter window; OCR located candidate popups, and the selected glyphs and labels were visually inspected. Retained evidence is cropped HUD frames plus selected full/status frames. The original 1-fps working frames remain in `/tmp/gauge-calibration/<chapter>/`.

**Difficulty:** not shown. The source opening visibly selects [Start a new story](../video-evidence/gauges/hank/fGkxdQi8ZcA-00-00-20-new-story.png) on an existing profile; it does not show a difficulty selector. PC/controller button labels do not establish Experienced. **Reloads:** no checkpoint reload was observed in the sampled chapter windows. Chapter-end flowcharts/loading and normal camera cuts occur. This is uploaded footage, so “none observed” is not proof of an unedited recording or independently authenticated save history.

**Timing:** source-clock times are approximate within one second; segment-relative times are independent and given in each row. A 1-fps frame numbered `n` is indexed at relative `n−1` seconds. Fragmented section outputs can include a fraction of a second of leading material. Supplemental 4-fps checks covered A New Home relative 08:00–08:40 (yard choices), Fugitives 18:23–18:36 (two successive bed popups), and Midnight Train 18:37–18:43 (Luther’s small-up/Trusted reveal). No missing arrow was imputed from the benchmark implementation.

## Measurement rule

One small arrow is the reference unit, **not an extracted internal game number**. Count net small arrows between adjacent, observed crossings on the same history, retaining every intervening chapter that can change the gauge. Initial chapter-status badges and path-unlocked badges are status reads, not additional arrows. Badge absence alone is not a non-crossing measurement; independent later status reads are used where needed.

For crossings made by a small arrow, the model lands exactly on the band edge. Two successive upward crossings therefore give the intervening band width as the net small count; two successive downward crossings work likewise. A reversal below a level and a later recrossing restart the measurement interval. All results assume constant unit-small updates, additive bands, no hidden updates/reload, and the recorded history. Nonuniform local results may require nonuniform bands **or** revisiting those assumptions; they are not permission to invent hidden deltas.

With large events, keep each event a separate signed unknown. The simple equation `width = net small + sum(signed large magnitudes)` requires known edge landings. A large arrow can overshoot a boundary: in general also retain the difference in entering/leaving overshoot, or use inequalities. A filled glyph is not proof of ±2, or even an independently calibrated lower bound of 2. Terminal bands/caps cannot identify magnitude from an unchanged top-level label.

## Long-play leads for a resumed pass

- **Acquired and inspected:** [CRUMOG, full game / best outcomes, PC, fGkxdQi8ZcA](https://www.youtube.com/watch?v=fGkxdQi8ZcA). All fresh rows below belong to its chronological New Story run.
- **Not acquired in this resumed pass:** [GamingIsFun, Platinum walkthrough, NRksvei25DI](https://www.youtube.com/watch?v=NRksvei25DI). Its GOOD, BAD and cleanup routes must remain separate; the Pirates’ Cove marker still requires manual checking.
- Additional earlier probes [MiaA8LQ0vOQ](https://www.youtube.com/watch?v=MiaA8LQ0vOQ) and [Ou2K8Ml25Tc](https://www.youtube.com/watch?v=Ou2K8Ml25Tc) were not needed. No fresh visual claims are made for them.

Working reproduction command (substitute the manifest’s chapter window and output name):

```sh
/opt/homebrew/bin/yt-dlp --no-playlist \
  --download-sections '*02:26:04-02:44:28' -f 'bv*[height<=720]' \
  --downloader-args 'ffmpeg_i:-request_size 10485760 -initial_request_size 1048576 -multiple_requests 1' \
  --downloader-args 'ffmpeg_o:-movflags +frag_keyframe+empty_moov' \
  -o '/tmp/gauge-calibration/fGkxdQi8ZcA-waiting.mp4' \
  'https://www.youtube.com/watch?v=fGkxdQi8ZcA'
/opt/homebrew/bin/ffmpeg -threads 2 \
  -i /tmp/gauge-calibration/fGkxdQi8ZcA-waiting.mp4 \
  -vf 'fps=1,crop=500:260:780:0' -q:v 2 '/tmp/gauge-calibration/waiting/%05d.jpg'
```

The crop coordinates apply to this 1280×720 source. Full frames were separately extracted for flowchart headers and scene context. The manifest lists all 21 windows, rather than treating the four nonadjacent Hank leads as a complete history.

## Hank

**Source/windows:** CRUMOG Partners 1:08:27–1:30:05; Interrogation 1:43:19–1:55:32; Waiting for Hank 2:26:04–2:44:28; On the Run 2:44:28–2:56:36; The Nest 3:10:18–3:26:57; Russian Roulette 4:02:36–4:15:13; Eden Club 4:29:28–4:51:59; Bridge 5:11:00–5:16:30. The Public Enemy rows are a later top-band observation, outside the measured interval. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 01:12:26 | partners / 03:59 | Buy him another drink (after UNDERSTANDING, REASON; no earlier Hank arrow) | large up | Neutral | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-12-26-partners.jpg) |
| 01:13:20 | partners / 04:53 | Car: DIPLOMATIC (instructions to accompany him) | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-13-20-partners.jpg) |
| 01:25:52 | partners / 17:25 | Correct report / blue-blood explanation completed | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-25-52-partners.jpg) |
| 01:29:47 | partners / 21:20 | Partners end header | none | Neutral | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-29-47-partners-header.png) |
| 01:44:01 | interrogation / 00:42 | Chapter opening status display (no arrow) | none | Neutral | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-44-01-interrogation.jpg) |
| 01:50:22 | interrogation / 07:03 | Confession obtained; observation-room reaction | small up | Warm | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-50-22-interrogation.jpg) |
| 01:54:17 | interrogation / 10:58 | Intervene repeatedly; Hank stops Gavin | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-01-54-17-interrogation.jpg) |
| 02:29:42 | waiting / 03:38 | Station opening status | none | Warm | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-29-42-waiting.jpg) |
| 02:41:10 | waiting / 15:06 | Desk topic #1 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-41-10-waiting.jpg) |
| 02:41:33 | waiting / 15:29 | Desk topic #2 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-41-33-waiting.jpg) |
| 02:43:41 | waiting / 17:37 | Hank is mad / case discussion | small down | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-43-41-waiting.jpg) |
| 02:52:02 | onrun / 07:34 | Chapter opening status | none | Warm | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-52-02-onrun.jpg) |
| 02:52:30 | onrun / 08:02 | Connor leaves to pursue Kara | small down | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-02-52-30-onrun.jpg) |
| 03:10:30 | nest / 00:12 | Food-stand opening status | none | Warm | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-10-30-nest.jpg) |
| 03:12:18 | nest / 02:00 | Food-stand dialogue #1 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-12-18-nest.jpg) |
| 03:13:16 | nest / 02:58 | Food-stand dialogue #2 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-13-16-nest.jpg) |
| 03:13:35 | nest / 03:17 | Food-stand dialogue #3; before Rupert chase | small up | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-13-35-nest.jpg) |
| 03:15:52 | nest / 05:34 | After food-stand conversation / Connor close-up | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-15-52-nest.jpg) |
| 03:26:14 | nest / 15:56 | Save Hank instead of chasing Rupert | large up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-03-26-14-nest.jpg) |
| 04:05:45 | roulette / 03:09 | Chapter opening status | none | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-04-05-45-roulette.jpg) |
| 04:30:04 | eden / 00:36 | Opening status | none | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-04-30-04-eden.jpg) |
| 04:51:28 | eden / 22:00 | Spare the Tracis | large up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-04-51-28-eden.jpg) |
| 05:11:03 | bridge / 00:03 | Chapter opening status | none | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-11-03-bridge.jpg) |
| 05:14:45 | bridge / 03:45 | Bridge dialogue #1 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-14-45-bridge.jpg) |
| 05:15:11 | bridge / 04:11 | Bridge dialogue #2 | small up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-15-11-bridge.jpg) |
| 05:16:04 | bridge / 05:04 | Closing path gate / status display | none | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-16-04-bridge.jpg) |
| 05:42:09 | publicenemy / 04:08 | Opening investigation status | none | Friend | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-42-09-publicenemy.jpg) |
| 05:55:50 | publicenemy / 17:49 | Later kitchen outcome (outside Partners–Bridge calibration interval) | large up | not shown | [frame](../video-evidence/gauges/hank/fGkxdQi8ZcA-05-55-50-publicenemy.jpg) |

**Measured Warm band = 4 small units.** The upward Warm crossing is 1:50:22; Friend is reached at 3:13:35 on a small up **at the food stand, before Save Hank**. Between these crossings the complete count is `+1 (Interrogation intervention) +1 +1 −1 (desk/case) −1 (On the Run) +1 +1 +1 (food stand) = +4`. The Nest independently opens on Warm. No large arrow occurs in this interval. Save Hank, spare Tracis and the later Public Enemy large up all occur after Friend, so their magnitudes cannot be read from the terminal label.

**Drink / spill and start-offset calculation:** Partners uses UNDERSTANDING and REASON, no prior Hank down. Its large drink up, car small up and report small up end on Neutral (header), followed by the confession small up entering Warm. If Neutral’s lower edge is 0, uniform width is 4 and initial Hank is `S`, the small-edge landing gives `S + D + 3 = 4`, hence `D = 1−S`. The earlier [operator A/B journal](../operator-notes/ch06-partners.md) then gives spill magnitude `L = S+5`. PERSIST staying Tense restricts `S` to −3, −2 or −1:

| Assumed initial S | Bought drink +D | Spilled drink −L |
|---|---|---|
| −1 (current adopted offset) | +2 | −4 |
| −2 | +3 | −3 |
| −3 | +4 | −2 |

These are conditional fits, not three newly observed routes. Thus **Warm 4 is measured under the unit model; a universal Hank width 4 is an extrapolation; drink +2 / spill −4 follows only if the current −1 start and uniform bands are retained**. The old minimal width-3 fit is incompatible with the fresh Warm interval. The source does not independently measure Tense width or starting offset. With start free, even spill-versus-purchase asymmetry is not established by the older A/B observations alone.

**Confidence:** high in glyphs, labels and net +4; moderate in extrapolating 4 to every Hank band; conditional only for drink/spill magnitudes. Remaining: directly test the initial offset and Tense/Neutral bands; measure large events before hitting Friend/cap.

## Amanda

**Source/windows:** Waiting for Hank, Russian Roulette (its opening garden must not be skipped), and Public Enemy, all CRUMOG. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 02:27:16 | waiting / 01:12 | First garden status | none | Trusted | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-02-27-16-waiting.jpg) |
| 02:27:39 | waiting / 01:35 | Successful confession reaction | large up | not shown | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-02-27-39-waiting.jpg) |
| 02:28:46 | waiting / 02:42 | Garden dialogue answer | small up | not shown | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-02-28-46-waiting.jpg) |
| 04:03:21 | roulette / 00:45 | Opening garden status | none | Trusted | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-04-03-21-roulette.jpg) |
| 04:03:44 | roulette / 01:08 | Garden dialogue response | small down | not shown | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-04-03-44-roulette.jpg) |
| 05:39:14 | publicenemy / 01:13 | Opening garden status | none | Trusted | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-05-39-14-publicenemy.jpg) |
| 05:40:46 | publicenemy / 02:45 | Garden response | small down | not shown | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-05-40-46-publicenemy.jpg) |
| 05:56:13 | publicenemy / 18:12 | Public Enemy end header | none | Trusted | [frame](../video-evidence/gauges/amanda/fGkxdQi8ZcA-05-56-13-trusted-header.png) |

**Computed width / event magnitude:** unidentified. The visible changes are `+A` for the confession reaction, `+1`, `−1`, `−1`, with Trusted status reads throughout. The initial positive reaction precedes the first decrease, so this does **not** test H5’s first decrease directly from initial Trusted. Top-band room/cap, starting offset and `A` remain coupled. Under the current uncapped bottom-Trusted anchor only the trivial `A≥1` follows from the final Trusted read; neither width 3 nor large = 2 is measured.

**Confidence:** high in the inspected arrows/Trusted labels; none for an exact numeric width or confession magnitude. Remaining: a fresh initial-state decrease and the next adjacent nonterminal crossing; Betrayed remains event-driven.

## Alice

**Source/windows:** A New Home 0:26:05–0:46:50; Stormy Night 1:30:05–1:38:24; Fugitives 1:55:32–2:14:18; On the Run 2:44:28–2:56:36. Stormy Night has no observed Alice gauge arrow. Other protagonists’ intervening chapters do not add an Alice popup in this source. The table stops after On the Run; later Family/capped observations are not used to calibrate Alice. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 00:30:58 | newhome / 04:53 | A New Home: small increase #1 | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-30-58-newhome.jpg) |
| 00:34:37 | newhome / 08:32 | A New Home: small increase #2 | small up | Neutral | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-34-37-newhome.jpg) |
| 00:41:50 | newhome / 15:45 | Alice’s room: book interaction | small up | Warm | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-41-50-newhome.jpg) |
| 00:43:00 | newhome / 16:55 | FRIENDLY | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-43-00-newhome.jpg) |
| 00:43:10 | newhome / 17:05 | Room conversation follow-up #1 | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-43-10-newhome.jpg) |
| 00:43:19 | newhome / 17:14 | Room conversation follow-up #2 | small up | Trusted | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-43-19-newhome.jpg) |
| 00:43:36 | newhome / 17:31 | Key / path-unlocked status | none | Trusted | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-00-43-36-newhome.jpg) |
| 01:56:19 | fugitives / 00:47 | Opening status | none | Trusted | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-01-56-19-fugitives.jpg) |
| 01:59:58 | fugitives / 04:26 | Steal clothes | small down | Warm | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-01-59-58-fugitives.jpg) |
| 02:06:51 | fugitives / 11:19 | Robbery argument | small down | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-06-51-fugitives.jpg) |
| 02:07:03 | fugitives / 11:31 | Apologetic response | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-07-03-fugitives.jpg) |
| 02:12:14 | fugitives / 16:42 | Bedtime reassurance / promise | small up | Trusted | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-12-14-fugitives.jpg) |
| 02:13:18 | fugitives / 17:46 | Toy / bedtime interaction | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-13-18-fugitives.jpg) |
| 02:13:58 | fugitives / 18:26 | Get in bed: first popup | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-13-58-fugitives.jpg) |
| 02:14:01 | fugitives / 18:29 | Bed continuation: second popup | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-14-01-fugitives.jpg) |
| 02:44:42 | onrun / 00:14 | Opening status | none | Trusted | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-44-42-onrun.jpg) |
| 02:45:50 | onrun / 01:22 | Early Kara/Alice interaction | small up | Family | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-45-50-onrun.jpg) |
| 02:50:42 | onrun / 06:14 | Kara/Alice interaction before Connor pursuit | small up | not shown | [frame](../video-evidence/gauges/alice/fGkxdQi8ZcA-02-50-42-onrun.jpg) |

**Model-implied local widths:** Neutral **1**, Warm **3**, Trusted **4**.

- Initial-to-Neutral: the second observed small increase shows Neutral at 0:34:37. The yard window was re-extracted at 4 fps; only one positive popup occurs there. This is a +2 boundary relative to the initial state, not a measured Distant width.
- Neutral→Warm: 0:34:37 to 0:41:50 contains one further visible small up (book interaction), so the local Neutral band is 1 under the complete-visible-update model. The full chapter scan finds no additional Alice popup in the intervening chores. The source’s positive yard answer, not every possible yard option, is counted.
- Warm→Trusted: 0:41:50 to 0:43:19 contains three small ups in the room conversation: **3**. No large arrow intervenes.
- Trusted→Family: use the **latest recrossing** into Trusted at 2:12:14, after the theft/argument decreases, not the earlier New Home crossing. Then toy/bedtime `+1`, first bed popup `+1`, fresh second bed popup `+1`, and On the Run’s early interaction `+1` show Family at 2:45:50: **4**. [First](../video-evidence/gauges/alice/fGkxdQi8ZcA-fugitives-bed-first-4fps.jpg) and [second](../video-evidence/gauges/alice/fGkxdQi8ZcA-fugitives-bed-second-4fps.jpg) 4-fps frames show two separate arrow animation onsets, with fade/name-only frames between. On the Run independently opens on Trusted before its Family-crossing up.

**Ladder:** Fugitives opens on Trusted; its first small down reveals **Warm**, with no earlier Alice change in that chapter. A positive-width Close band between these levels cannot be crossed in one unit under the stated model. The fresh observed positive order is **Distant (initial inherited level), Neutral, Warm, Trusted, Family**, not evidence for Close. Six observed New Home increases already reach Trusted; the earlier operator’s all-eight→Trusted reading is consistent with Trusted spanning a later three further points and does not force a sixth level.

With initial value 0, the fresh count model’s positive boundaries are Neutral 2, Warm 3, Trusted 6, Family 10. These are **nonuniform**, not a justification for setting the one `width` constant to 1, 3 or 4 globally. If a later replay insists on uniform bands, hidden updates or event-dependent small magnitudes must be investigated instead; do not add them just to fit this video.

**Key:** the key/path badge is shown on Trusted after further increases. Neutral at +2 supports the level boundary; this is not an exactly-+2 key-positive control. The earlier +1/no-key operator result remains only a lower bound on the key gate.

**Confidence:** high in the displayed labels and room-conversation count; moderate in the whole-history Neutral 1 and Trusted 4 model inference (full scans and 4-fps checks, uploaded-run continuity). No independently measured large Alice event. Remaining: replay the three local bands and an exactly-+2 key trial; check whether the game uses unequal bands or unequal hidden values behind visually small arrows.

## Luther

**Source/windows:** Zlatko (initial history checked; no Luther gauge arrow found), Pirates’ Cove 4:51:59–5:11:00, Midnight Train 5:56:28–6:15:40. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 04:52:13 | pirates / 00:14 | Opening status | none | Neutral | [frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-04-52-13-pirates.jpg) |
| 05:07:20 | pirates / 15:21 | Late Pirates’ Cove conversation | small up | not shown | [frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-05-07-20-pirates.jpg) |
| 05:56:52 | midnight / 00:24 | Opening status | none | Neutral | [frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-05-56-52-midnight.jpg) |
| 06:01:31 | midnight / 05:03 | Reassure / family conversation | small up | Close | [frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-06-01-31-midnight.jpg) |
| 06:15:08 | midnight / 18:40 | Successful policeman visit | small up | Trusted | [frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-06-15-08-midnight.jpg) |

**Measured local Close band = 1 small unit.** Pirates’ Cove has one small up and ends Neutral (the retained Pirates header also shows Luther Neutral). Midnight Train opens Neutral, then its first Luther small up shows Close at 6:01:31. No intervening Luther popup precedes the policeman-success small up revealing Trusted at approximately 6:15:07.5–08. The [4-fps small-up/Trusted frame](../video-evidence/gauges/luther/fGkxdQi8ZcA-06-15-07.5-small-up-trusted.jpg) resolves the arrow that is between the integer-second name/badge frames.

The first positive boundary is +2 relative to Luther’s initial state, while Close→Trusted is one further unit. Uniform width 2 with the current bottom-Neutral start fails this sequence. Do not replace all Luther bands with width 1: the initial-to-Close offset is a separate observation. Wary and Trusted→Family were not measured; no large Luther magnitude was identified.

**Confidence:** high in local labels and the 4-fps small arrow; moderate in the one-unit band interpretation versus a scripted point-setting/unequal-small model. Remaining: initial offset, next Trusted→Family crossing and Wary usage.

## North

**Source/windows:** Jericho (no North gauge popup found), Time to Decide, Spare Parts, Stratford Tower and Capitol Park, same CRUMOG history. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 03:31:45 | timetodecide / 04:48 | Talk to North | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-03-31-45-timetodecide.jpg) |
| 03:38:57 | timetodecide / 12:00 | Propose raid | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-03-38-57-timetodecide.jpg) |
| 03:39:23 | timetodecide / 12:26 | Time to Decide end header | none | Neutral | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-03-39-23-header.png) |
| 04:19:24 | spareparts / 04:11 | Free warehouse androids | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-04-19-24-spareparts.jpg) |
| 04:22:34 | spareparts / 07:21 | Free crate androids | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-04-22-34-spareparts.jpg) |
| 04:23:04 | spareparts / 07:51 | Accept John | small down | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-04-23-04-spareparts.jpg) |
| 04:23:58 | spareparts / 08:45 | Choose to steal the truck/key | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-04-23-58-spareparts.jpg) |
| 04:27:51 | spareparts / 12:38 | Return with truckload of supplies | large up | Friend | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-04-27-51-spareparts.jpg) [filled](../video-evidence/gauges/north/fGkxdQi8ZcA-04-27-50-spareparts-filled.jpg) |
| 05:17:29 | stratford / 00:59 | Opening status | none | Friend | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-05-17-29-stratford.jpg) |
| 05:30:47 | stratford / 14:17 | RUSE | small down | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-05-30-47-stratford.jpg) |
| 05:32:18 | stratford / 15:48 | Spare fleeing operator | small down | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-05-32-18-stratford.jpg) |
| 05:33:14 | stratford / 16:44 | Ready / begin broadcast | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-05-33-14-stratford.jpg) |
| 05:36:07 | stratford / 19:37 | Leave Simon alive on roof | small down | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-05-36-07-stratford.jpg) |
| 06:17:07 | capitol / 01:27 | Opening status | none | Friend | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-17-07-capitol.jpg) |
| 06:21:11 | capitol / 05:31 | Park setup interaction #1 | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-21-11-capitol.jpg) |
| 06:23:06 | capitol / 07:26 | Park setup interaction #2 | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-23-06-capitol.jpg) |
| 06:31:23 | capitol / 15:43 | Liberate the store androids | large up | Companion | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-31-23-capitol.jpg) |
| 06:33:29 | capitol / 17:49 | Successful protest action | small up | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-33-29-capitol.jpg) |
| 06:35:45 | capitol / 20:05 | Pacifist protest interaction | small down | not shown | [frame](../video-evidence/gauges/north/fGkxdQi8ZcA-06-35-45-capitol.jpg) |

**Computed constraint:** two small increases in Time to Decide still end **Neutral** in the independent flowchart header. This falsifies H8’s exact “start at bottom Neutral, width 2, two ups→Friend” prediction. If initial North is anywhere within a uniform Neutral band and all smalls are units, **width ≥3**. It is not an exact width measurement.

The observed Friend and Companion reveals occur on separate large events (truck supplies and store liberation). Their magnitudes, crossing overshoot and the width remain coupled; no exact width or large magnitude is identified. The earlier different-upload talk-up/YOU-down→Resentful sequence is not appended to this positive route, and the benchmark’s local YOU calibration is not an observed extra arrow.

**Confidence:** high in two-up/Neutral and filled large glyphs; conditional high in the ≥3 bound; no exact width/magnitude. Remaining: adjacent crossings made by small arrows; Lover is event-driven.

## Simon

**Source/windows:** Jericho (no Simon gauge popup), Time to Decide, Spare Parts and Stratford Tower, same history. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 03:39:02 | timetodecide / 12:05 | Propose raid | small up | not shown | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-03-39-02-timetodecide.jpg) |
| 03:39:23 | timetodecide / 12:26 | Time to Decide end header | none | Neutral | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-03-39-23-header.png) |
| 04:19:31 | spareparts / 04:18 | Free warehouse androids | small up | not shown | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-19-31-spareparts.jpg) |
| 04:22:41 | spareparts / 07:28 | Free crate androids | small up | not shown | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-22-41-spareparts.jpg) |
| 04:23:11 | spareparts / 07:58 | Accept John | small down | not shown | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-23-11-spareparts.jpg) |
| 04:24:03 | spareparts / 08:50 | Choose to steal the truck/key | small up | not shown | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-24-03-spareparts.jpg) |
| 04:27:56 | spareparts / 12:43 | Return with truckload of supplies | large up | Friend | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-27-56-spareparts.jpg) [filled](../video-evidence/gauges/simon/fGkxdQi8ZcA-04-27-55-spareparts-filled.jpg) |
| 05:17:34 | stratford / 01:04 | Opening status | none | Friend | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-05-17-34-stratford.jpg) |
| 05:36:13 | stratford / 19:43 | Leave Simon alive on roof | large up | Companion | [frame](../video-evidence/gauges/simon/fGkxdQi8ZcA-05-36-13-stratford.jpg) |

**Computed constraint:** +1 in Time to Decide still reads Neutral in the header, so a uniform Neutral band has **width ≥2** if Simon starts within it. This does not confirm exactly 2. Friend appears on the truck-supplies large event; Companion on the leave-Simon-alive large event. Two unknown event magnitudes and unknown crossing overshoot prevent a band measurement; never borrow North’s or Josh’s width.

**Confidence:** high in observed arrows/labels; no exact numeric width or large magnitude. Remaining: consecutive small-arrow crossings and a starting-offset read.

## Josh

**Source/windows:** Jericho (no Josh gauge popup), Time to Decide, Spare Parts and Stratford Tower. Capitol Park has no Josh popup in this source. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 03:30:46 | timetodecide / 03:49 | Talk to Josh | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-03-30-46-timetodecide.jpg) |
| 03:39:23 | timetodecide / 12:26 | Time to Decide end header | none | Neutral | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-03-39-23-header.png) |
| 04:19:29 | spareparts / 04:16 | Free warehouse androids | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-04-19-29-spareparts.jpg) |
| 04:22:39 | spareparts / 07:26 | Free crate androids | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-04-22-39-spareparts.jpg) |
| 04:23:09 | spareparts / 07:56 | Accept John | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-04-23-09-spareparts.jpg) |
| 04:24:01 | spareparts / 08:48 | Choose to steal the truck/key | small down | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-04-24-01-spareparts.jpg) |
| 04:27:53 | spareparts / 12:40 | Return with truckload of supplies | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-04-27-53-spareparts.jpg) |
| 05:17:31 | stratford / 01:01 | Opening status | none | Neutral | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-05-17-31-stratford.jpg) |
| 05:30:49 | stratford / 14:19 | RUSE | small up | Friend | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-05-30-49-stratford.jpg) |
| 05:32:20 | stratford / 15:50 | Spare fleeing operator | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-05-32-20-stratford.jpg) |
| 05:36:09 | stratford / 19:39 | Leave Simon alive on roof | small up | not shown | [frame](../video-evidence/gauges/josh/fGkxdQi8ZcA-05-36-09-stratford.jpg) |

**Measured first upward boundary: +5 small units from the initial state.** Time to Decide talk +1; warehouse androids +1; crate androids +1; accept John +1; truck/key plan −1; return supplies +1 = net **+4**, and Stratford Tower opens **Neutral**. The next small up (RUSE) shows **Friend**, at +5. This directly falsifies H8’s two-up prediction for Josh. If the starting point is at the bottom of a uniform Neutral band, width is 5; with starting offset free, only **width ≥5** is identified. Friend→Companion is not observed, so do not call this a measured uniform width 5.

No large Josh event occurs in this source’s counted interval. The earlier different-video large-down→Resentful cannot supply a magnitude here.

**Confidence:** high in the +4 Neutral / next-up Friend sequence; conditional high in ≥5; exact uniform 5 remains an initial-offset hypothesis.

## Jericho

**Source/windows:** Jericho (no gauge popup), Time to Decide, Spare Parts, Stratford Tower and Capitol Park. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 03:39:00 | timetodecide / 12:03 | Propose raid | small up | not shown | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-03-39-00-timetodecide.jpg) |
| 03:39:23 | timetodecide / 12:26 | Time to Decide end header | none | Neutral | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-03-39-23-header.png) |
| 04:19:26 | spareparts / 04:13 | Free warehouse androids | small up | not shown | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-04-19-26-spareparts.jpg) |
| 04:22:36 | spareparts / 07:23 | Free crate androids | small up | Respected | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-04-22-36-spareparts.jpg) |
| 04:23:06 | spareparts / 07:53 | Accept John | small up | not shown | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-04-23-06-spareparts.jpg) |
| 04:27:48 | spareparts / 12:35 | Return with truckload of supplies | large up | Admired | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-04-27-48-spareparts.jpg) |
| 05:16:36 | stratford / 00:06 | Opening status | none | Admired | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-05-16-36-stratford.jpg) |
| 05:31:13 | stratford / 14:43 | Successful RUSE | small up | not shown | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-05-31-13-stratford.jpg) |
| 05:33:12 | stratford / 16:42 | Ready / begin broadcast | small up | Leader | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-05-33-12-stratford.jpg) |
| 05:35:08 | stratford / 18:38 | SWAT arrives | small down | Admired | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-05-35-08-stratford.jpg) |
| 06:17:03 | capitol / 01:23 | Opening status | none | Admired | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-06-17-03-capitol.jpg) |
| 06:31:26 | capitol / 15:46 | Liberate the store androids | large up | Leader | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-06-31-26-capitol.jpg) |
| 06:33:26 | capitol / 17:46 | Successful protest action | small up | not shown | [frame](../video-evidence/gauges/jericho/fGkxdQi8ZcA-06-33-26-capitol.jpg) |

**Measured first positive boundary: +3 small units from the initial state.** Propose raid +1; free warehouse androids +1; free crate androids +1 shows Respected. A uniform Neutral band therefore has **width ≥3** (exactly 3 only if the initial value is its bottom). H7’s current width-2/bottom-Neutral fit fails this history. No negative-side evidence establishes Uncertain or Unpopular width; Rejected is event-driven.

**Truck magnitude constraint under the additional uniform-band assumption:** set the small-arrow Respected entry to 0. Accept John adds 1; let the truck-supplies large up be `T`. The following successful RUSE and READY add 1 each, with READY entering Leader on a **small**, not large, arrow. Respected→Leader spans two bands, hence `2w = 1 + T + 1 + 1`, or **`T = 2w−3`**. Combined with `w≥3`, this gives **T≥3**, and the minimal uniform fit is **w=3, T=3**. It is not uniquely measured: w=4/T=5 and larger fits remain possible if the initial offset changes. If Respected and Admired widths differ, only their sum is constrained: `w_Respected + w_Admired = T+3`. Store liberation’s later large up into terminal Leader remains uncalibrated.

**Confidence:** high in the +3 boundary and glyph classification; moderate/conditional in the uniform-band truck lower bound; no exact universal width or truck magnitude. The default +2 truck event is inconsistent with the combined *uniform* fit, not independently refuted under arbitrary nonuniform bands.

## Public opinion

**Source/windows:** Hostage; the full early Kara/Connor windows above (including the easily missed DPD TV decrease in Waiting for Hank); Pirates’ Cove; Stratford Tower; Capitol Park. All on CRUMOG. No further public popup was found in the intervening acquired chapters. Difficulty unknown; no reload observed.

| Source clock | Chapter / segment-relative time | Event | Arrow | Level shown | Evidence |
|---|---|---|---|---|---|
| 00:12:13 | hostage / 12:13 | Save the wounded cop | small up | Indifferent | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-00-12-13-hostage.jpg) |
| 02:38:08 | waiting / 12:04 | DPD TV news / Kara report | small down | Skeptical | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-02-38-08-waiting.jpg) |
| 02:49:25 | onrun / 04:57 | Kara crime news at motel | small down | not shown | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-02-49-25-onrun.jpg) |
| 03:39:23 | timetodecide / 12:26 | Time to Decide end header | none | Skeptical | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-03-39-23-skeptical-header.png) |
| 04:53:14 | pirates / 01:15 | Car radio news | small down | not shown | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-04-53-14-pirates.jpg) |
| 05:10:45 | pirates / 18:46 | Pirates’ Cove end header | none | Hostile | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-05-10-45-hostile-header.png) |
| 05:37:02 | stratford / 20:32 | Tower news reaction #1 (casualty line) | large up | Skeptical | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-05-37-02-stratford.jpg) |
| 05:37:19 | stratford / 20:49 | Tower news reaction #2 (tone line) | large up | Indifferent | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-05-37-19-stratford.jpg) [filled](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-05-37-18-stratford-filled.jpg) |
| 06:40:00 | capitol / 24:20 | Peaceful protest news outcome | large up | Supportive | [frame](../video-evidence/gauges/public-opinion/fGkxdQi8ZcA-06-40-00-capitol.jpg) |

**Measured local Skeptical band = 2 small units.** Cop rescue shows Indifferent after +1. Waiting for Hank’s TV report gives a small down and **Skeptical** (first downward crossing). On the Run gives one more small down; Time to Decide’s header still reads Skeptical. Pirates’ Cove’s car radio gives the next small down, and its end header reads **Hostile** (second downward crossing). Between the two downward crossings: `−1 −1 = −2`; the Skeptical band is two units under the stated model. Omitting the DPD TV event would incorrectly imply a one-unit band.

Relative to the initial value 0, the observed Skeptical band is [−1,0], Indifferent begins at +1, and the car-radio outcome is −2/Hostile. The first tower-news large increase `P1` ends Skeptical, so **1≤P1≤2**. The next large increase `P2` ends Indifferent; without Indifferent’s width its exact magnitude is not identified. If the unmeasured Indifferent width is also assumed 2, only `3≤P1+P2≤4` follows, not unique +2/+2. The peaceful Capitol Park large up shows Supportive and can overshoot intermediate bands. Neither Sympathetic’s exact +3 boundary nor the final large magnitude is measured.

**Confidence:** high in the two-unit Skeptical interval and +1 initial boundary; conditional high in the first-news bound; no independent exact large magnitude or Sympathetic threshold. Remaining: Indifferent→Sympathetic small-arrow interval and event-specific media magnitudes.

## Software instability (scope note)

No numeric-band calibration is claimed. The acquired Connor windows include instability popups, but no continuous, complete history to a Crossroads lock was acquired or counted for this gauge. MACHINE/DEVIANT captions are not numeric level names. H10 remains untested; no instability delta is inferred from Hank’s measured interval.

## Proposed changes to benchmark/scales.mjs

These are proposals for the orchestrator; **no implementation was changed**. A local measured band does not license applying that number to every band, especially where the same source gives unequal intervals. Any adopted model/story changes require the project’s version/replay policy.

| Constant / definition | From → to proposed | Evidence | Confidence |
|---|---|---|---|
| `SCALES.hank.width` | 3 → 4 for Warm; global 4 conditional on uniform bands | Pure-small Warm→Friend interval, net +4 | High local; moderate global |
| Hank `startValue` | −1 → remain unverified; −1/−2/−3 all fit the combined observations with uniform width 4 | Drink/spill fit table | Exact offset unidentified |
| Hank spill `MEASURED_ARROWS.delta` | −3 → do not relabel as independently measured; −4 **if** width 4 and start −1 retained | Operator A plus fresh Warm band, offset-dependent | Conditional only |
| Hank bought drink / default large | +2 → retain provisionally if start −1; +3 or +4 with other fitted starts | `D=1−S`; Friend/capped later large events uncalibrated | Conditional only |
| `SCALES.amanda.width`, confession large | 3 / 2 → no numeric change | Only Trusted observations; first decrease not from initial state | Exact values unmeasured |
| `SCALES.alice.width` | 2 uniform → no single replacement; local Neutral 1, Warm 3, Trusted 4 under unit-small model | Adjacent crossings and two-bed-popup check | High Warm; moderate full-history model |
| Alice ladder / positive boundaries | Close entry → omit between Warm/Trusted in the counted model; Neutral/Warm/Trusted/Family 2/4/8/10 → 2/3/6/10 if initial 0 and all visible updates are complete | Trusted→Warm on one down; fresh six-up Trusted and later Family crossing | High labels; conditional boundary model |
| `THRESHOLDS.ALICE_KEY` | 2 → retain as provisional, not “confirmed exactly 2” | +2 Neutral, but key read occurs later on Trusted; +1 negative control inherited | Exact gate still unmeasured |
| `SCALES.luther.width`, Wary | 2 uniform → no single replacement; Close 1; initial→Close +2; Wary unverified | Same-chapter Close→Trusted, one small up | High local count; moderate band interpretation |
| `SCALES.north.width` | 2 → at least 3 under uniform/start-in-Neutral model; exact unresolved | Two ups, end-header Neutral | High observation; conditional bound |
| `SCALES.simon.width` | 2 → no numeric change; only ≥2 supported | One up, end-header Neutral; large crossing overshoot unknown | Exact 2 unmeasured |
| `SCALES.josh.width` | 2 → at least 5 under uniform/start-in-Neutral model; 5 only with bottom start | +4 Neutral, next small up Friend | High observation; conditional bound |
| `SCALES.jericho.width`, Uncertain | 2 → at least 3 under uniform model; minimum fit 3; Uncertain unverified | First Respected at +3 | High boundary; conditional width |
| Jericho truck-supplies literal large | +2 → `2w−3` under uniform bands; minimum +3 with w≥3 | Respected small entry→Leader small entry includes +3 smalls and one unknown large | Moderate, uniform-model conditional |
| `SCALES.publicSupport.width` | 2 → retain 2 with new support for **Skeptical only** | Two adjacent downward crossings, net −2 | High local |
| `OPINION_SYMPATHETIC`, public large defaults | +3 / +2 → no exact change | Indifferent +1 boundary known; first tower large only [1,2]; later large crossings underdetermined | Exact threshold/magnitudes unmeasured |
| All unmeasured large defaults | 2 → retain explicitly as defaults, not measured magnitudes | Filled glyphs, terminal levels and overshoot cannot uniquely calibrate them | High methodological confidence |

**Handoff:** the requested footage pass is acquired and counted. The new evidence materially changes the research status of H1/H4/H6/H7/H8 and adds a local test of H9. The strongest direct counts are local intervals, not one global scale per character. Prior inherited frame copies and their old manifest were left intact; unrelated-upload observations are not merged into this run.

## Validation of this research artifact

The requested baseline commands were launched before research-artifact changes. `bun run check` reported valid story 1.9.13, 862 questions and 490 atlas coverage entries. The test baseline reported failures/timeouts in the concurrently edited checkout and was stopped without a clean completion; it is **not** a healthy baseline claim. No failing code or tests were repaired. Research verification passed for 120 sequence rows, 21 acquired segments, 21,060 working 1-fps frames and all 128 retained evidence-frame hashes and local note links. The pure-small interval sums above were recomputed from the observation JSON. No story/atlas/site regeneration was needed because none was edited.
