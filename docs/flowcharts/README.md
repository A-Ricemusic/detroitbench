# Chapter flowcharts

This folder stores the game's own completed chapter flowcharts (the in-game Chapters screen) as photographed by PowerPyx on each chapter's walkthrough page. They are the rank 1 source for the benchmark (see [the source priority](../research/README.md#sources-in-order-of-authority)): they decide structure, node names, node order, checkpoints, unlock conditions and endings, event for event. They carry no numeric values: no probabilities, no stat sizes and no thresholds. Stat arrows, prompt labels and clue text come from the rank 2 source (the detroitbecometext templates and string table).

Attribution: every image is PowerPyx's (powerpyx.com) photograph of the game's screen, with PowerPyx's watermark; several were sent to PowerPyx by readers, credited in the chapter READMEs. They are kept here for research only. The files are the original bytes downloaded from `https://www.powerpyx.com/wp-content/uploads/` on 7 November 2026, with no resizing or re-encoding; every download matched the earlier copies under `/tmp/flowcharts/`, and no URL was dead.

## Layout

- `chNN/README.md`: the chapter title, the walkthrough page, completeness, the header gauges as printed, and one row per image with its file name, source URL and what it shows.
- `chNN/NN-<slug>-<k>.jpg`: the whole-chart image first (`-1`), then the zoomed sections in the order the walkthrough page shows them, which is left to right except where a chapter README says otherwise.
- Chapters with one chart per character or per branch add the chart to the name: `30-crossroads-kara-1.jpg`, `31-night-of-the-soul-connor-1.jpg`, `32-battle-for-detroit-markus-revolution-1.jpg`. Chapter 32 has six charts (Kara Captured, Kara Leaving Detroit, Markus Demonstration, Markus Revolution, Connor's Last Mission, Connor at the CyberLife Tower).

Reading the charts: a zoom that shows a percentage below 100% or a red padlock with `[...]` was photographed from a save in which some nodes were not yet revealed; use the whole-chart image or another zoom for those nodes. Yellow tags are cross-chapter unlock conditions; a skull marks a death ending; the no-entry icon is the game's "not required for completion" marker (record it as printed). Node labels keep the game's spelling, including its errors (`ZLAKTO`, `STATFORD TOWER`, `AGRESSIVE`).

## Chapters

239 images in total.

| Ch | Title | Character | Charts | Images | Completeness |
|---|---|---|---|---|---|
| [01](ch01/README.md) | The Hostage | Connor | 1 | 3 | Complete |
| [02](ch02/README.md) | The Opening | Kara | 0 | 0 | No chart |
| [03](ch03/README.md) | Shades of Color | Markus | 1 | 3 | Complete |
| [04](ch04/README.md) | A New Home | Kara | 1 | 5 | Complete |
| [05](ch05/README.md) | The Painter | Markus | 1 | 4 | Complete |
| [06](ch06/README.md) | Partners | Connor | 1 | 4 | Complete |
| [07](ch07/README.md) | Stormy Night | Kara | 1 | 5 | Complete (one zoom from an incomplete save) |
| [08](ch08/README.md) | Broken | Markus | 1 | 2 | Complete |
| [09](ch09/README.md) | The Interrogation | Connor | 1 | 5 | Complete |
| [10](ch10/README.md) | Fugitives | Kara | 1 | 8 | Complete (three zooms from incomplete saves) |
| [11](ch11/README.md) | From the Dead | Markus | 1 | 4 | Complete |
| [12](ch12/README.md) | Waiting for Hank... | Connor | 1 | 4 | Complete |
| [13](ch13/README.md) | On the Run | Kara and Connor | 1 | 22 | Complete: stitched 100% chart from the Steam guide (13-on-the-run-alt-steam-1.png) plus throwawaydeviant9's 100% zooms; PowerPyx's photos are from incomplete saves |
| [14](ch14/README.md) | Jericho | Markus | 1 | 5 | Complete |
| [15](ch15/README.md) | The Nest | Connor | 1 | 6 | Complete |
| [16](ch16/README.md) | Time to Decide | Markus | 1 | 1 | Complete |
| [17](ch17/README.md) | Zlatko | Kara | 1 | 7 | Complete |
| [18](ch18/README.md) | Russian Roulette | Connor | 1 | 6 | Complete |
| [19](ch19/README.md) | Spare Parts | Markus | 1 | 7 | Complete (first zoom 96%) |
| [20](ch20/README.md) | The Eden Club | Connor | 1 | 6 | Complete |
| [21](ch21/README.md) | The Pirates' Cove | Kara | 1 | 7 | Complete |
| [22](ch22/README.md) | The Bridge | Connor | 1 | 4 | Complete |
| [23](ch23/README.md) | The Stratford Tower | Markus | 1 | 10 | Complete |
| [24](ch24/README.md) | Public Enemy | Connor | 1 | 8 | Complete |
| [25](ch25/README.md) | Midnight Train | Kara | 1 | 8 | Complete |
| [26](ch26/README.md) | Capitol Park | Markus | 1 | 6 | Complete (first zoom 94%) |
| [27](ch27/README.md) | Meet Kamski | Connor | 1 | 6 | Complete |
| [28](ch28/README.md) | Freedom March | Markus | 1 | 7 | Complete |
| [29](ch29/README.md) | Last Chance, Connor | Connor | 1 | 16 | Complete: throwawaydeviant9's 100% zooms and a Chinese 100% panorama; the node PowerPyx's 98% zoom lacked is UNABLE TO LINK MAP TO OTHER EVIDENCE, visible in PowerPyx's own images 7 and 8 |
| [30](ch30/README.md) | Crossroads | Kara, Markus and Connor | 3 | 48 | Complete: all three charts at 100% (Connor from PowerPyx; Kara and Markus from throwawaydeviant9's post-patch albums, confirmed node for node against a Chinese 100% panorama) |
| [31](ch31/README.md) | Night of the Soul | Markus and Connor | 2 | 7 | Complete (both charts) |
| [32](ch32/README.md) | Battle for Detroit | Kara, Markus and Connor | 6 | 63 | Complete: all six charts at 100%; the two Kara charts from throwawaydeviant9's post-patch albums. PowerPyx's locked node in Kara Captured is ALICE FREED BY MARKUS; its 99% in Kara Leaving Detroit is a node patch 1.06 removed (cut content, not built) |

## Verifying a chapter against the benchmark

1. Open `chNN/README.md` and the whole-chart image, then each zoom in order.
2. Transcribe the chart's nodes in reading order: checkpoints, hubs and their entries, choice groups and their options, events, unlock tags and endings. `docs/research/chNN-<slug>.md` section 1 should already hold this transcription; check it against the images first.
3. Compare node for node with the chapter's atlas entries in `docs/atlas/chapters/chNN.json` (`decisions`) and with the scenes in `benchmark/chapters/chNN.json` (each scene's `title`, `options` and `outcomes`, and the `adaptationNote` that cites the chart). Every checkpoint, choice, clue and ending on the chart should appear, in the chart's order, with its gating (unlock tags become gates or cross-chapter flags in `benchmark/chapters/chNN.mjs`).
4. Record any difference in the research note and fix it in the chapter sources, then regenerate the story and the atlas as AGENTS.md describes. Never edit `benchmark/story.json` or `docs/detroit-decisions.json` by hand.

Numbers do not come from these images. Use the templates for stat arrows and the wiki or PowerPyx text for published probabilities, timers and the Hostage and Interrogation tables.

## Complete charts beyond PowerPyx

Where PowerPyx's photos came from unfinished saves, each chapter folder also holds the 100% charts from throwawaydeviant9's 2018 post-patch Imgur albums (also mirrored in the Steam guide "Detroit: Become Human | 100% Chapter Flowcharts", id 2162781882) and, where found, the stitched panoramas of a Chinese Steam guide (id 3361490965). The chapter READMEs list them under "Additional sources" and carry a "Node check" table comparing every flowchart string in the game's string table with the images. Chapter 2, The Opening, has no flowchart in the game.
