# Source inventory

Compiled 2026-11-06 by the source-hunting agent. This file lists every source found for *Detroit: Become Human* that could make the benchmark more faithful. For each one it gives what the source covers, where it sits in the project's ranking (flowchart image > wiki > transcript > guides, see `README.md`), how to read it from a script, and what it would add. Sources the chapter notes already use (PowerPyx screenshots, wiki chapter and stat pages through the API, the detroitbecometext transcript) are included so the list is complete, but the entries focus on what is new.

Access notes that apply throughout:

- Use `curl -A "Mozilla/5.0 ..."` with a browser User-Agent. The WebFetch tool gets 403 on several of these sites.
- Fandom: use `https://detroit-become-human.fandom.com/api.php` (`action=parse&prop=wikitext`, `list=allpages`, `prop=imageinfo`). Direct page fetches are blocked.
- Reddit blocks curl (403). Read posts and comment trees through the Arctic Shift archive API instead: `https://arctic-shift.photon-reddit.com/api/posts/ids?ids=<id>` and `.../api/comments/tree?link_id=<id>&limit=200`. Search uses `.../api/posts/search?subreddit=DetroitBecomeHuman&query=<words>`.
- tcrf.net, gamefaqs.gamespot.com, speedrun.com, neoseeker.com and h1g.jp return 403 or a Cloudflare challenge to scripts. TCRF can be read through the Wayback Machine raw mode (`https://web.archive.org/web/<timestamp>id_/<url>`). The response is zstd-compressed, so pipe it through `zstd -d`. The Wayback Machine rate-limits fast repeated requests (HTTP 429), so pause between calls.

---

## 1. Game data: string tables, files and tools

### 1.1 detroitbecometext transcript, GitHub source (strongly recommended)

- **URL:** https://github.com/detroitbecometext/detroitbecometext.github.io (branch `master`, last push 2025-01-22). The site is https://detroitbecometext.github.io. The wiki links to it from its transcript pages.
- **What it covers:** The game's full localized text for 25 languages, plus one hand-built Angular template per chapter. Each template places the strings in play order with structured markup for choices, unlock conditions, stat changes and cut content.
- **Authority:** The strings are the game's own text, extracted from the PC files with `dbh-file-parser` (see 1.2). For labels, button names and HUD numbers they rank at flowchart-image level. The templates are the transcribers' reconstruction of order and conditions. They are transcript tier (below the wiki).
- **How to read it (raw files, no browser needed):**
  - Strings: `https://raw.githubusercontent.com/detroitbecometext/detroitbecometext.github.io/master/public/i18n/en.json`. This is nested JSON with about 25,900 leaf keys. Flatten it with dotted paths.
  - Chapter templates: `src/app/chapters/components/chapter-contents/<N>-<slug>-chapter-content/<slug>-chapter-content.component.html`, for example `9-the-interrogation-chapter-content/the-interrogation-chapter-content.component.html`. There are 40 chapter files (the three Crossroads and two Night of the Soul parts and the six `32.x` Battle for Detroit parts each have their own), plus `30-crossroads-intro/*` and `press-dirty-bomb`. The complete list is in the tree API: `https://api.github.com/repos/detroitbecometext/detroitbecometext.github.io/git/trees/HEAD?recursive=1`.
  - Markup to parse: `<app-choice-group>` and `<app-choice-item>` (dialogue and choice buttons), `<app-unlock-condition [unlockType]="UnlockType.Lock|Death|Time|Tv">text</app-unlock-condition>` (the condition text), `<app-relation [name]="RelationName.Hank|SoftwareInstability|Alice|Luther|Jericho|North|Josh|Simon|PublicOpinion|Amanda" [type]="RelationType.SmallUp|LargeUp|SmallDown|LargeDown">` (stat arrows, about 470 in total), `<app-conditioned-content>` and `<app-condition-group>` (variant lines), `<app-unused-content>` (cut lines, 73 blocks over 27 files), and `<app-observation-item>` (scan texts). The enums are in `src/app/shared/enums/` (`relation-name.enum.ts`, `relation-type.enum.ts`, `unlock-type.enum.ts`).
  - Endings page: `src/app/chapters/pages/endings/endings.component.html`. Magazines are handled by `src/app/shared/services/magazine.service.ts` together with the `GUI.MAGAZINE.*` keys.
- **What it adds:** The chapter notes currently decode the minified `chunk-*.js` bundle (for example `chunk-JCLJBPDO.js`, function `UL`). The readable templates carry the same content with named components, so a script can pull every stat arrow, condition and cut line for a chapter without reverse-engineering compiled code. The chunk file name also changes on every site rebuild.

Useful string namespaces in `en.json` (all checked):

| Keys | Content |
|---|---|
| `GUI.MENU.CHAPTERS.<code>` | Chapter code map: `01C` The Hostage, `01KA` Opening, `01KB` A New Home, `01MA` Shades of Color, `01MB` The Painter, `02C` Partners, `02K` Stormy Night, `02M` Broken, `04C` The Interrogation, `03K` Fugitives, `03M` From the Dead, `03C` Waiting for Hank..., `04K` On the Run, `05C` The Nest, `05M` Jericho, `05K` Zlatko, `06CA` Russian Roulette, `06CB` The Eden Club, `06MA` Time to Decide, `06MB` Spare Parts, `07K` The Pirates' Cove, `08C` The Bridge, `07M` The Stratford Tower, `09C` Public Enemy, `08M` Capitol Park, `08K` Midnight Train, `11C` Meet Kamski, `10M` Freedom March, `12C` Last Chance, Connor, `02A*` Crossroads, `03A*` Night of the Soul, `04A*` Battle for Detroit parts |
| `MENU.FLOWCHART.<code>.*` | Every flowchart node label per chapter (2,692 keys). The tables include labels for nodes that were cut or patched out, so a label being in the table does not prove the node is reachable |
| `GUI.MENU.FLOWCHART.LEGEND.*` | The in-game legend (see section 9) |
| `GUI.GAUGE.<NAME>.*` | Relationship level names as the game spells them (see section 12) |
| `GUI.SUCCESSRATE.*` | Hostage HUD: `PROBABILITY OF SUCCESS`, modifier captions `INFORMATION FOUND`, `LETHAL OPTION AVAILABLE`, `DEVIANT DESTABILIZING`, `DEVIANT STABILIZING`, `EVERY SECOND COUNTS` |
| `GUI.VICTORY.*` | A second `PROBABILITY OF SUCCESS` gauge with captions `MARKUS WOUNDED`, `TIME WASTED`, `ANDROIDS KILLED`, `GAIN GROUND`, `SOLDIERS KILLED` (the Battle for Detroit revolution fight) |
| `GUI.MESSAGESTRENGTH.*` | `AGGRESSIVE MESSAGE` / `PACIFIST MESSAGE` gauge with `PACIFIST ACTION`, `VIOLENT ACTION`, `CONSISTENT ...`, `OUTSTANDING ACTION` captions (Markus's message gauge) |
| `GUI.STRESS.*`, `GUI.GAUGE.STRESS.ALICE` | Interrogation stress bands (`TOO LOW`, `OPTIMAL`, `TOO HIGH`, `CRITICAL`) and `ALICE'S STRESS` |
| `GUI.TIMER.*`, `GUI.RISKGAUGE.TITLE`, `GUI.SUSPICIONGAUGE.TITLE`, `GUI.RISK.*` | Timer captions (`TIME REMAINING BEFORE ATTACK`, `REINITIALIZATION PROGRESS`, `TIME REMAINING BEFORE SHUTDOWN`, `LAST BUS DEPARTS`, `TIME BEFORE SHUTDOWN`), `DANGER LEVEL`, `SUSPICION LEVEL`, `HIGH RISK` / `LOW RISK` |
| `THOUGHTS.0501C.RISKHANK`, `THOUGHTS.0901C.HANKCHANCES` | The only displayed probabilities outside the Hostage: `CHANCE OF SURVIVAL: 89%` (The Nest) and `HANK SURVIVAL PROBABILITY : 40%` (Public Enemy) |
| `GUI.MENU.OPTIONS.DIFFICULTY.*` | Official Casual and Experienced descriptions (see section 10) |

### 1.2 dbh-file-parser

- **URL:** https://github.com/detroitbecometext/dbh-file-parser (C#, last push 2024-08-30).
- **What it covers:** It extracts every localized string from the PC game's `BigFile_PC.d*` archives into one JSON file per language. `scripts/unpacker.py` dumps all raw values into a single file.
- **Authority:** Primary game data, but text only.
- **How to read it:** It needs an installed Steam copy (`FileParser -i "<Steam>/steamapps/common/Detroit Become Human" -o ./output`). It has only been tested on the Steam version.
- **What it adds:** The ability to re-extract `en.json` from the operator's own copy. That makes it possible to confirm the transcript site's strings match the current patch, and to recover any string the site dropped.

### 1.3 Archive and format tools (no ready-made decision data)

- **QD.BIG.Tool**, https://github.com/Ekey/QD.BIG.Tool. Unpacks Quantic Dream BigFile archives. Detroit is supported but without debug names. Primary data, but you get unnamed binary assets.
- **Detroit-Become-Documented**, https://github.com/BLiNXthetimesweeperGOD/Detroit-Become-Documented (pushed 2025-11-07). `formats/asset types.md` and `tools/DBHTypes.py` document the PC asset type IDs, including `SCRIPT_CONTROLLER` (0x001A), `SCRIPT_EVENT_CONTROLLER`, `KERNEL_FLOW`, `FLOW_DATA` (0x0879) and `FLOW_DIALOG_M3D`. No decoder for these script or flow assets exists anywhere public.
- **Detroit-Become-Human-Randomizer**, same author. `AssetList.txt` (2.2 MB) is a list of asset names.
- **What they add:** They show where the real probability, threshold and stat-magnitude tables would live (the script and flow assets). They also show that **no public source has decoded them**. Every exact threshold quoted anywhere (wiki, guides, Reddit) is observational, except the numbers the game prints on screen (Hostage modifiers, Interrogation stress, the two HUD probabilities above). Reverse-engineering `FLOW_DATA` would be the only route to authoritative thresholds.
- Not useful: otuva/Detroit-Become-Human-Tools (models and animations), Detroit-Become-Human-Readable/Audio, the model-swapper sites, Nexus localization mods.

---

## 2. The Fandom wiki beyond the chapter and three stat pages

All of these are wiki tier, read with `api.php?action=parse&page=<Title>&prop=wikitext&format=json`. The full main-namespace title list (937 pages) comes from `list=allpages&aplimit=500&apnamespace=0` with `apcontinue` paging.

| Page | What it has | What it adds |
|---|---|---|
| `Relationship_Stat` | Level ladders for every tracked relationship: Hank (Friend, Warm, Neutral, Tense initial, Hostile), Amanda (Trusted initial, Neutral, Distrusted, Betrayed), Alice (Family, Trusted, Warm, Neutral, Distant initial), Luther (Family, Trusted, Close, Neutral initial), Jericho (Leader, Admired, Respected, Neutral initial, Unpopular, Rejected), North/Josh/Simon (Lover for North only, Companion, Friend, Neutral initial, Resentful, Hostile). Every change is listed as a small or large arrow per character | This is the only wiki page on hidden thresholds. It gives level names and arrow sizes, **no numbers**. There are no separate pages for Hank, Alice, North, Simon, Josh, Jericho or Amanda thresholds |
| `Public_Opinion` | Levels: Supportive, Sympathetic, Indifferent, Skeptical (initial), Hostile, Hated. Small and large ups and downs per event. "Only unlocks if public opinion is 'sympathetic' at least" (Battle for Detroit soldiers stand down) | Already used |
| `Software_Instability` | Up and down lists, "Dying reduces software instability", Notes (flowchart status after death) | Already used. No deviancy threshold number |
| `Template:Icon` | Maps the chart icons to their meanings: `impact` = cc_impact.png "Cross-chapter impact" (yellow tab with an open padlock), `death` = cc_death.png "Death" (yellow tab with a skull), `nri` = cc_notrequired.png "Not required for completion" (yellow tab with a circle-slash), `nr` = notrequired.png (small circle-slash), `success`, `failure`, `up`, `down`, `largeup`, `largedown` | An authoritative key to the icons on PowerPyx images. See section 9 |
| `Template:Flowchart/doc` | The wiki's text-flowchart syntax (`type_X=cp` checkpoint, `type_X=cc` cross-chapter impact) | Lets a script parse the wiki's `{{Flowchart}}` tables, for example on `Jericho/Flowchart` |
| `Jericho/Flowchart`, `Partners/Flowchart`, `Shades_of_Color/Flowchart` | The only three `/Flowchart` subpages. Full text flowcharts with magazine conditions | Machine-readable structure for those three chapters |
| `The_Hostage_(Transcript)`, `Partners_(Transcript)`, `A_New_Home_(Transcript)`, `Shades_Of_Color_(Transcript)`, `The_Opening_(Transcript)`, `The_Painter_(Transcript)` | The only six transcript pages. The Hostage transcript prints every `PROBABILITY OF SUCCESS (+n%)` beside its line | Cross-check of the Hostage modifier table. Every non-zero value it prints also appears in the `The_Hostage` Probability Of Success section |
| `Secret-Endings` | The six post-credit or secret endings with requirements | Cross-check of endings reachable only through combinations (Zlatko reset, Alice abandoned, Unpopular Markus, and others) |
| `Trophies` (and one page per trophy, for example `CONFESSION`, `SAVE HANK`, `I'LL BE BACK`) | 49 trophies, each with conditions | Cross-check that an ending is reachable. Trophy pages often state the exact condition (for example I'LL BE BACK: "Hank will only shoot Connor if their relationship is hostile by the end") |
| `Deleted_Connor_Chapter` | A cut Connor chapter after On the Run (arrest Kara or let her go). A variable for it still exists in the data | Marks cut content. Do not implement |
| `Detroit:_Become_Human` (Gameplay section) | "Higher gameplay difficulties result in shorter duration for players to analyze situations and respond to them" and checkpoint rollback | Wiki statement on difficulty |
| `Title_Updates` (and `Patches`, which redirects to it) | Stub: "Version 1.0 Many bug fixes and improvements" | Nothing. Use section 8 instead |
| `QTE` | Stub on timed and untimed QTEs | Nothing numeric |
| `Chronology`, `Extras`, `Magazine` and per-article pages | Timeline, extras menu, magazine texts | `Magazine` is already used for media scenes |

Pages that do **not** exist (checked against the full title list): `Flowchart`, `Endings`, any per-character relationship or threshold page, any difficulty page, any patch-notes page with content. The wiki's File namespace also has per-chapter flowchart video pages, for example `File:07 - KARA - STORMY NIGHT - 100% FLOWCHART - DETROIT BECOME HUMAN`. These are YouTube embeds, see section 4.

---

## 3. Flowchart images

Flowchart-image tier. All of these are screenshots of the in-game chart.

### 3.1 PowerPyx (in use)

https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/. Images are under `wp-content/uploads`. They are mostly legible zooms, but some were taken **before** the July 2018 patch 1.06 and show locked `[...]` placeholders that the patch later removed (see section 8 and `ch10-fugitives.md` open question 10). They do not show the world-stats percentages.

### 3.2 throwawaydeviant9's 100% flowcharts with world stats (recommended)

- **URL:** Reddit post https://www.reddit.com/r/DetroitBecomeHuman/comments/99b65j/ (2018-08-22, after patch 1.06). It links 38 Imgur albums, one per chapter or part.
- **What it covers:** Every chapter at 100% completion, PS4, 1920x1080. Each album has a whole-chart shot plus 1 to 3 zooms. The world-statistics overlay is on, so each node shows the share of players who reached it (rounded down). In the Interrogation zoom the node labels and percentages are legible.
- **How to read it (Imgur API, no browser needed):** `curl "https://api.imgur.com/post/v1/albums/<ID>?client_id=546c25a59c58ad7&include=media" | jq -r '.media[].url'`. The `client_id` is Imgur's public web-client ID. The images are `https://i.imgur.com/<id>.jpeg`. Album IDs: The Hostage `sHOIu4N`, Shades of Color `YhlrMgv`, A New Home `PUP2z8u`, The Painter `L5NoiQj`, Partners `lZ3WJZK`, Stormy Night `vd1Qlrt`, Broken `ZNqUc8a`, The Interrogation `AhwJxsp`, Fugitives `C1vxlzX`, From the Dead `QQdh0pf`, Waiting for Hank `yYKp0ez`, On the Run `LVJiXql`, Jericho `8oOuIlI`, The Nest `HU9dJHL`, Time to Decide `wryTvLq`, Zlatko `MY8J7KZ`, Russian Roulette `OcZwf2g`, Spare Parts `6LD0rts`, The Eden Club `Vf2Vtdx`, The Pirates' Cove `fVwocgb`, The Bridge `hdwDB3g`, The Stratford Tower `Ds2fYuX`, Public Enemy `R1fkMZB`, Midnight Train `jlBHpQM`, Capitol Park `yz2qo6y`, Meet Kamski `xSg6vQI`, Freedom March `USSIxLz`, Last Chance Connor `fqCTsea`, Crossroads Connor `VFWTa67`, Crossroads Kara `tHdkyrc`, Crossroads Markus `UvSCMLe`, Night of the Soul `hlerUsl`, BfD Connor's Last Mission `oK2CLa4`, BfD Connor at CyberLife Tower `F9lOsds`, BfD Kara Leaving Detroit `j9a39Pb`, BfD Kara Captured `vLjffao`, BfD Markus Revolution `hZASsTe`, BfD Markus Demonstration `7yVvXu5`.
- **What it adds:** A second, post-patch, complete set of charts to check against PowerPyx node by node. The world percentages also give a rough measure of which branches players actually reach. The author notes that percentages round down, that "0%" means under 1%, and that some unmissable nodes show 99%.

### 3.3 Steam guide "Detroit: Become Human | 100% Chapter Flowcharts"

- **URL:** https://steamcommunity.com/sharedfiles/filedetails/?id=2162781882 (updated 2025-09-04, 45k visitors).
- **What it covers:** 191 images at 1920x1080 under `images.steamusercontent.com/ugc/...`, one section per chapter. Its credits name throwawaydeviant9 for the originals and "Krystal109 (Neoseeker)" for high-resolution replacements.
- **How to read it:** curl the page with `&l=english` and grep `https://images.steamusercontent.com/ugc/[^"? ]+`.
- **What it adds:** Higher-resolution copies of the same set, which help where the Imgur zooms are still too small.
- A related guide, "Chapter Flowcharts", https://steamcommunity.com/sharedfiles/filedetails/?id=2706070429, has 22 images.

### 3.4 Chinese Steam guide 【底特律：变人】全章节100%流程图

- **URL:** https://steamcommunity.com/sharedfiles/filedetails/?id=3361490965 (updated 2025-12-24, 387 ratings).
- **What it covers:** Every chapter's 100% chart plus written trigger conditions for hard nodes. It opens with a summary of the hidden stats.
- **Authority:** Guide tier, PC version.
- **What it adds:** Trigger conditions for obscure nodes that PowerPyx does not explain. Its claim that "Connor's death clears software instability" conflicts with the wiki (see section 13).

### 3.5 Other image sets

- PlayStation Universe flowchart guides, for example https://www.psu.com/news/detroit-become-human-the-hostage-flowchart-guide. These are per-chapter chart images, guide tier, and a backup.
- The wiki's chapter-page flowchart screenshots, for example `File:The_Interrogation_Flowchart_-_Detroit_Become_Human.jpg` via `prop=imageinfo`. These are single partial-path screenshots, already used.
- https://github.com/fschutt/detroit-become-human-flowchart (2018). PNGs copied from the wiki. No added value.
- **Avoid:** edrawsoft.com "Detroit Become Human flowcharts". These are redrawn marketing diagrams, not game charts.

### 3.6 Machine-readable node lists

- **CesareilGiulio/detroit-become-human-flowchart-tracker**, https://github.com/CesareilGiulio/detroit-become-human-flowchart-tracker (pushed 2026-10-24). `data/manual/NN-<slug>.json` holds every chapter's nodes, with English and Italian titles, a type (`checkpoint`, `choice`, `objective`, `ending`) and `parents` edges, "transcribed from the in-game flowcharts". Uncertain links are tagged "Link to be verified". For The Interrogation it has 33 nodes, which matches the 31 in `ch09` plus the requirement tab and the bracket label.
- **Authority:** Below guide tier (one fan's transcription), but it is the only machine-readable graph of all 32 charts. Use it to diff node counts and edges against the chapter notes, not as ground truth.

---

## 4. Video: full 100% flowcharts and complete playthroughs

Flowchart-image tier when the video shows the in-game chart. To read programmatically, `yt-dlp -f bv <url>` then `ffmpeg -i in.mp4 -vf fps=1 frames/%04d.png`, and take the frames where the chart is on screen. The IDs below come from YouTube search results (`ytInitialData`).

**Basic & Casual, "Detroit: Become Human - "<Chapter>" [100% Flowchart]"** (2018, PS4; each video plays the chapter's branches and ends on the completed chart). https://www.youtube.com/watch?v=<id>:
The Hostage `Eo_RqR_jaDs`, Shades of Color `_vmj4lK7iC8`, A New Home `oXvvMx0LI3o`, The Painter `eU2p8SAN3yI`, Partners `I2PUsq8ptHA`, Stormy Night `bunYVlbKPVc`, Broken `yhohVRr0ycM`, The Interrogation `XGB3_P_g8lo`, Fugitives `A2GrsjwAJ9w`, From the Dead `nFBMiCQt3O8`, Waiting for Hank... `VS1VvH9Ix0U`, On the Run `qhjJam0ETGA`, Jericho `_dIKvPxivqs`, The Nest `y_TEdXDAZnk`, Time to Decide `j1SO2oF2AqE`, Zlatko `W1vWV4zkFWs`, Russian Roulette `hdIitdBm00A`, The Eden Club `Z2YqUMzvT-0`, The Pirates' Cove `daIqt6z1MzI`, The Bridge `aPgPdEVKxOA`, The Stratford Tower `hPLIabPiXWA`, Public Enemy `GgFOUUfR3QA`, Midnight Train `1L3TX_EyADk`, Capitol Park `s-iRIdozD2s`, Meet Kamski `FYTbMN3r-5k`, Freedom March `1Nv4fYTJm8k`, Last Chance, Connor `Z-KEJHIJlBM`, Crossroads `6_HmZzGXs98`, Night of the Soul `NFmLoCU2kac`, Battle for Detroit `-q5jMMq0A04` (1 h 30). No Spare Parts video was found in this series.

**VGS - Video Game Sophistry, "Walkthrough Chapter N - <Chapter> // All Endings, 100% Flowchart"**. Playlist `PL__d-O-iz-xAWWo0Qy6c4Zwvx8L8nCTQs`, with ending timestamps in each description. Examples: The Hostage `JASyd9kQqnM`, Shades of Color `XNuhloum1Yc`, Partners `lg1-Js6OCVo`, Stormy Night `4EE2cHO63xQ`, Broken `IVRl9sQm-R4`, Jericho `ojvBWV0AymQ`, The Bridge `cfWIQsrWBCg`.

**Chart-only compilations:** Manugames92, "Detroit Become Human: flowchart of all chapters 100% complete" `4uh60vFZf9k` (17 min, scrolls every finished chart). Heracles Porsche, "100% Flowchart All Chapters" `1yfPR30o9q8` (2 h stream).

**Per-chapter all-outcome videos** (to watch what actually happens on each branch): MKIceAndFire, "THE INTERROGATION ALL Choices And Outcomes" `MzprdJbLTXE`; Murad Zero, "Partners ... All Sequence Ending ... 100% Flowchart" `lwMdKKCN47k` and "The Hostage ... All Sequence Ending Full Guide" `VA2BShhp1Qo`; Eliza-Mai (Rayne), "100% Flowchart Completion for Chapter CROSSROADS (all 3 character paths)" `k2DxBL4WMKU`; Too Tall Gaming, "Fugitives (All Endings + 100% Flowchart)" `aoorJx3ItnM`; Milk In A Wineglass, numbered "NN - <CHARACTER> - <CHAPTER> - 100% FLOWCHART" series (embedded on the wiki); MiKeYROG, "100% Walkthrough (100% Flowchart) Chapter 01 The Hostage" `vOQGy5Wk6tY` (2025).

**What video adds:** Charts where PowerPyx's zooms are illegible. Timers and the order of prompts. The exact button labels on screen. Whether a branch is Experienced-only, since several creators state their difficulty. Avoid demo-era videos such as VikanGaming "Demo Flowchart 100% Completed (The Hostage)" `xPq0n-KtLJ4`: the May 2018 demo is not the release build.

---

## 5. Community mechanics research (exact numbers that come from observation, not data)

All of this is below guide tier for authority. Each poster's numbers are inferred from HUD arrows and outcomes, and the posters disagree with each other. It is the only published source on stat **magnitudes** and **thresholds**, so treat it as a set of hypotheses for the operator to test.

| Source | What it gives |
|---|---|
| throwawaydeviant9, "Figuring out how the Relationship Meter and Software Instability works..." https://www.reddit.com/r/DetroitBecomeHuman/comments/99fuzj/ (2018) | Hank: "Each stage of a relationship has five sublevels". Saving Hank in The Nest = +8 small (once +9). Sparing or shooting the Tracis = +6 / -4 small. Public Enemy endings ≤ +5. SI: sparing vs shooting Chloe differ by 10 (guessed +6 / -4). Rushing the deviant in Public Enemy = only +2. Deviancy needs a net of about +8 to +10 small SI. Dying to Gavin did not lower SI. Full list of SI and Hank events per chapter |
| Atticvs, reply in the same thread, comment `m8po9sj` (2025-01-23) | Hank starts at "Tense 7". Spilling the drink = -3 small, buying another = +2 small. Threaten and Persist = -1 each. Derived from every combination of the first Partners modifiers |
| real-raccoon-717, same thread | Each Connor death = -2 small with Hank |
| UseHoliday8997, "Software Instability Guide, Including Increases, Decreases, and Path Unlocks" https://www.reddit.com/r/DetroitBecomeHuman/comments/1n59qq7/ (2025, image https://i.redd.it/dwmhaa0ozfmf1.png) | Per-chapter SI values: Save Hank +4 / Chase -4, Tracis ±4, Chloe ±6, connect to Simon +3, rush deviant +3, death -2, hidden (not shown) ±1 entries. Path unlock: "If Software Instability is above 4, Connor can become a deviant" |
| UseHoliday8997, "I just figured out it's impossible to get Simon to hate Markus" https://www.reddit.com/r/DetroitBecomeHuman/comments/1mun8yl/ (2025) | Model: small = 1–3 points, large = 4–10, each level about 4–5 points, saving Hank = 10. Simon and Luther have no large decreases |
| "Detailed Guide on Remaining a Machine while being friends with Hank" https://www.reddit.com/r/DetroitBecomeHuman/comments/1m55coz/ (2025) | A tested route with the level reached after each choice ("brings it up from Tense to Neutral", and so on) |
| "Waiting for Hank Hidden Dialogue Found!" https://www.reddit.com/r/DetroitBecomeHuman/comments/1degkun/ | An unreachable "thank you for last night" line, found through the transcript. Cut content |
| throwawaydeviant9, "How Detroit: Become Human creates a 'branching' narrative" https://www.reddit.com/r/DetroitBecomeHuman/comments/9efvki/ | Design taxonomy only (no numbers). Useful background for scene design |
| Steam, "Saving mechanics for achievements and plot trees" https://steamcommunity.com/sharedfiles/filedetails/?id=3141511480 (Russian original 2522900291) | Eight rules for how cross-chapter state propagates through checkpoint saves, for example "Rewriting earlier chapters does not affect later ones until all chapters before them are completed in the sequence" |
| Steam, "DBH | All Chapter Outcomes and Brief Instructions" https://steamcommunity.com/sharedfiles/filedetails/?id=2935499852 (2023) | Every chapter outcome and how to get it, written for Experienced. "When playing on Casual difficulty, some endings are unavailable (such as most death endings in Stormy Night) and some scenes play out differently by removing certain prompts or QTEs" |
| GameFAQs boards, for example "The ending resulting from demonstration" https://gamefaqs.gamespot.com/boards/182637-detroit-become-human/76764245 | Anecdotes on public opinion during the march and demonstration. Browser only |
| r/DetroitBecomeHuman "How many 'stat increases' ... to progress to its next stage?" https://www.reddit.com/r/DetroitBecomeHuman/comments/1kumfxn/ | Open question, no answer: confirms nobody has published level widths for Jericho or public opinion |

No community source gives numeric thresholds for public opinion levels, Jericho, North, Josh, Alice or Luther, or the stress rule in the Freedom March. The only stated gates are level names (for example "Sympathetic at least").

---

## 6. Written guides (guide tier)

| Source | URL | Notes |
|---|---|---|
| PowerPyx (in use) | https://www.powerpyx.com/detroit-become-human-full-walkthrough-all-chapters/ | Its reader comments carry useful tests, for example the Hostage "Keep the success probability between around 45%–55%" for the BE HONEST branch |
| GamerGuides | https://www.gamerguides.com/detroit-become-human/guide/ | Also sells a PDF of the same guide. That PDF is its own product, not an official guide |
| Gamepressure | https://www.gamepressure.com/detroit-become-human/ | Per-character walkthroughs, "Shared scenes", "All endings" |
| Prima Games (web) | https://primagames.com/coverage/detroit-become-human-walkthrough-and-guide-all-options and the "How to Get 100% Completion in <chapter>" pages | Free web articles |
| GameFAQs | https://gamefaqs.gamespot.com/ps4/182637-detroit-become-human/faqs: Mogg, "Guide and Walkthrough" v1.8 (faqs/75923, highest rated); Andrew_Testa, "Guide and Walkthrough" v1.3 (faqs/75941, Official GameFAQs Guide); Warhawk, Demo guide v3.0 (faqs/76123, demo only) | 403 to scripts. Archived copies exist on the Wayback Machine but are rate-limited. Read them in a browser |
| Neoseeker | https://www.neoseeker.com/detroit-become-human/faqs/3024740-detroit-bh-a.html (FAQ v1.5) and the walkthrough pages | 403 to scripts |
| Shacknews, PSU, Twinfinite, Push Square | per-chapter articles | Low added value. Use only to break ties |
| speedrun.com | https://www.speedrun.com/dbh/guides/3eqei (Any%), https://www.speedrun.com/dbh/guides/4j2li (I'll Be Back) | 403 to scripts. Fastest-path knowledge, for example which deaths are quickest |
| Japanese: ヘイグ攻略Wiki | https://h1g.jp/detroit-become-human/ (for example the 人質 page) | 403 to scripts. Per-chapter branches and conditions in Japanese |
| Chinese: GamerSky | https://www.gamersky.com/handbook/201809/1104973.shtml (peaceful route conditions) and https://www.gamersky.com/handbook/201805/1053825.shtml (all endings) | States "舆论>=同情" (opinion at least Sympathetic) as the peaceful gate, which matches the wiki |

**Official strategy guide:** None found. No Prima or Piggyback printed guide was published for this game. Prima's coverage is the free web guide above, and the Collector's Edition (2020) contained a statue, pins and an ID card, no guide. No official art book with flowchart material turned up either. The only developer-authored flowchart material is David Cage's tweet of one scene's internal graph (https://twitter.com/David__Cage/status/1034374760392794112, reported by Push Square 2018-08-29), which is not legible enough to use.

---

## 7. Cut content: telling cut nodes from real ones

| Source | What it shows | How to read it |
|---|---|---|
| The Cutting Room Floor, "Detroit: Become Human", https://tcrf.net/Detroit:_Become_Human (revision 2149821, archived 2026-09-27) | A whole **cut Pirates' Cove chase**: armed teenagers attack after the carousel, Luther is hit by a truck, and the player chooses Grab Luther's Gun / Grab Gun (item) / Protect Luther / Hide / Do nothing. Each option has its own outcomes, cross-chapter effects (Luther absent at Rose's, Alice takes his lines, a unique post-credits scene) and "its own flowchart" and localization still in the files. A restoration mod (FunFairRestoration.zip) exists. Also unused models and music. A Notes page exists | Cloudflare blocks direct fetches. Use `curl https://web.archive.org/web/20260927160856id_/https://tcrf.net/Detroit:_Become_Human \| zstd -d` |
| Wiki chapter "Unused Content" sections and `Deleted_Connor_Chapter` | Cut lines and choices, for example the Interrogation `OFFER` / `SAY NOTHING`, and the cut Kara-arrest chapter | API |
| Transcript `<app-unused-content>` blocks | 73 cut blocks. The highest counts are in The Painter and Waiting for Hank (7 each) and Midnight Train (6) | Raw templates (1.1) |
| `MENU.FLOWCHART.07K.*` | Holds the cut chase labels next to the shipped ones (`ch21` already lists three labels that are not on the chart) | `en.json` |
| dragonbane0, reconstruction video of the deleted Connor chapter, https://www.youtube.com/watch?v=kZYA3z17pq8 | A fan **re-imagining**, not game content | Never use as a source of nodes |
| Reddit 1degkun | The unreachable Waiting for Hank thank-you line | Arctic Shift |

Rule of thumb: a label that appears in the string table but on none of the post-1.06 100% charts (PowerPyx or throwawaydeviant9) is cut content. TCRF and the wiki's Unused Content sections give the reason.

---

## 8. Versions and patches

| Change | Source | Effect on the benchmark |
|---|---|---|
| **Patch 1.06 (PS4, about 2018-07-10, 200 MB)** removed three unreachable nodes: (1) Fugitives, the third option after the clerk draws a gun in the hold-up ("there was supposedly a third option, but only two were ever shown"); (2) On the Run, a node "just outside of the grouping where Connor Investigates the Squat", never identified; (3) Battle for Detroit, Kara Leaving Detroit, one node in "Avoid Temperature Check", never found | https://www.thesixthaxis.com/2018/07/12/detroit-become-human-update-version-1-06-allows-you-to-get-the-platinum/ ; https://gamingbolt.com/?p=346637 ; https://www.playstationlifestyle.net/?p=672339 (all quote the same Reddit summary. The official notes say only "bug fixes") | Answers `ch10-fugitives.md` open question 10: there is no third hold-up option. Any `[...]` placeholder in a PowerPyx pre-patch shot at those three spots is not a real node |
| June 2018 patch changing Chloe's menu behaviour | Ars Technica via https://pipedot.org/3S318 (2018-06-11) | Menu only. No story effect |
| A bug fixed in patch 1.05 | PowerPyx Fugitives page (cited in `ch10`) | Already noted |
| PC release: Epic Games Store 2019-12-12, Steam 2020-06-18 (wiki `Detroit:_Become_Human`) | Reviews report input and rendering changes only. No source reports any story, choice or flowchart difference from the patched PS4 version. The PC strings are what the transcript uses | Treat PS4 1.06+ and PC as the same content |
| PS4 demo (The Hostage), April–May 2018 | GameFAQs demo guide, demo flowchart videos | Pre-release build. Do not use its chart |
| Wiki `Title_Updates` | Empty stub | Nothing |

---

## 9. The in-game flowchart legend

The game's own legend (the SHOW LEGEND button on the chart screen) is reproduced as strings in `en.json`. Matching each string to its icon comes from the wiki's `Template:Icon`. The pairing was checked by downloading the icon files.

- **NODE TYPE:** `ACTION`, `EVENT`, `DIALOG`, `CHOICE`, `SEARCH` (`GUI.MENU.FLOWCHART.LEGEND.ACTION|EVENT|DIALOG|CHOICE|SEARCH`).
- **PATH TYPE:** `SUCCESS` (check), `FAILURE` (cross), `CURRENT PATH`, `PREVIOUS PATHS`, `LOCKED PATHS`.
- **Tabs and badges:** `CROSS-CHAPTER IMPACT` (yellow tab with an open padlock, `cc_impact.png`), `DEATH` (yellow tab with a skull, `cc_death.png`), `NOT REQUIRED FOR COMPLETION` (yellow tab with a circle-slash, `cc_notrequired.png`; small black circle-slash `notrequired.png`).
- Chart help text (`GUI.MENU.FLOWCHART.MESSAGE`): "Each node earns you points that you can spend in the EXTRAS. Due to the nature of the game, some nodes and endings will not be counted toward the completion of the flowchart."

**Correction for `README.md`:** The README glosses the no-entry icon as "a failure that is not a death". In the game it means **NOT REQUIRED FOR COMPLETION**. In practice it marks bad endings, including deaths (for example every Kara death in Stormy Night). `ch07` and later notes already use the right meaning, but the README wording should be fixed by whoever owns it.

---

## 10. Casual vs Experienced

| Source | Statement |
|---|---|
| Game strings `GUI.MENU.OPTIONS.DIFFICULTY.DESC1.FULL` / `DESC2.FULL` | Casual: "I WANT TO FOCUS ON THE STORY WITH SIMPLER CONTROLS. A MORE FORGIVING CHALLENGE, WITH FEWER CHANCES TO LOSE A CHARACTER." Experienced: "I WANT IMMERSIVE GAMEPLAY WITH ADVANCED CONTROLS. A FAIR CHALLENGE, WHERE MISTAKES CAN MEAN LOSING A CHARACTER." Internal alternates: Casual = `EASY` / `MODE 2`, Experienced = `STANDARD` / `MODE1`. Difficulty is changeable only "WHEN NO INTERACTION IS ACTIVE" |
| Wiki `Detroit:_Become_Human` | "Higher gameplay difficulties result in shorter duration for players to analyze situations and respond to them" |
| Steam guide 2935499852 | On Casual "some endings are unavailable (such as most death endings in Stormy Night) and some scenes play out differently by removing certain prompts or QTEs" |
| Chinese Steam guide 3361490965 | "Set difficulty to Experienced before going for 100%, because some death or injury nodes need failed QTEs" |
| PowerPyx comments (Hostage) | Failing the negotiation is "very hard" on Casual |
| PlayStation Blog, "7 things you'll notice in your first 30 minutes" https://blog.playstation.com/archive/2018/04/23/7-things-youll-notice-in-your-first-30-minutes-of-detroit-become-human | Pre-release description of the two modes |
| `ch07-stormy-night.md` | Already marks the Experienced-only Stormy Night endings |

No source gives per-difficulty timer lengths or QTE windows. The benchmark's risk probabilities stay calibrations, not game data.

---

## 11. Sources to avoid

- **Baba88611/detroit-ai-player**, https://github.com/Baba88611/detroit-ai-player. A similar "let an AI play Detroit" project with 32 chapter JSONs (`01_json/en/chNN_*.json`) and a `global_state_registry.json`. Its `system` numbers are authored, not from the game. For example, its Hostage gives "thorough" search 30%, friendly approach +10 and cold approach -10, none of which match the wiki's table. It is useful only as a design comparison.
- edrawsoft.com flowcharts, keyword-stuffed PDF "guides" on unrelated domains, AI-written blogs (for example mithrie.com), and "cheats" or "adult mod" repositories on GitHub.
- Any chart from the 2018 demo.

---

## 12. Recommended additions to the research workflow

1. **Read the transcript through its GitHub source templates, not the compiled chunk** (section 1.1). The templates name every stat arrow (`<app-relation>`), unlock condition (`<app-unlock-condition>`) and cut line (`<app-unused-content>`), and the file paths are stable. This is a large gain in reliability and speed for sections 2 to 4 of every chapter note.
2. **Use throwawaydeviant9's Imgur albums (or the Steam 2162781882 high-resolution copies) as the second flowchart image source** (sections 3.2 and 3.3). They are post-1.06, complete for all 38 chapter parts, readable through the Imgur API, and carry world-stat percentages. Where PowerPyx's zoom is illegible or pre-patch, these settle it.
3. **Use the Basic & Casual and VGS 100% Flowchart videos** (section 4) for anything a still image cannot show: prompt order, timers, exact on-screen labels, and Experienced-only branches. Frames can be extracted with yt-dlp and ffmpeg.
4. **Read the community measurement threads through Arctic Shift** (section 5: 99fuzj with the Atticvs reply, 1n59qq7, 1mun8yl). They are the only published estimates of step sizes and level widths. Record them in each note as hypotheses for the operator, below the wiki.
5. **Check every candidate node against the patch 1.06 removals and TCRF before implementing it** (sections 7 and 8). Both are cheap, and together with the string table they settle "real node or cut node" questions, such as the Pirates' Cove chase and the Fugitives third option.

Also adopt the in-game legend vocabulary from section 9 in the README's icon list.

---

## 13. Contradictions on numbers and labels the benchmark uses

The benchmark's numeric choices are in `benchmark/experience-prompt.mjs` (`LEVELS`, `DEVIANCY_THRESHOLD = 4`), `benchmark/story-engine.mjs` (initial state `hankTrust: -1`, everything else 0) and the `story.json` assumption "small = 1, large = 2".

| Quantity | Wiki | Contradicting source(s) |
|---|---|---|
| **Size of a "large" change** (benchmark: 2 small steps) | Only arrow sizes, no values. Buying Hank a drink is a "Large Increase" and spilling it a "Large Decrease" (`Relationship_Stat`) | Atticvs (99fuzj, `m8po9sj`): buy drink = +2 small, spill = -3 small. throwawaydeviant9 (99fuzj): saving Hank = +8 (or +9) small, sparing Tracis = +6, shooting them = -4. UseHoliday8997 (1mun8yl): large = 4–10 points, saving Hank = 10. UseHoliday8997 (1n59qq7): SI save Hank +4, Tracis ±4, Chloe ±6. "Large" is not one fixed size, and is often well above 2 |
| **Width of a relationship level** (benchmark Hank bands are 3 wide: Hostile ≤ -4, Tense -3..-1, Neutral 0..2, Warm 3..5, Friend ≥ 6) | No numbers | throwawaydeviant9: "Each stage of a relationship has five sublevels". UseHoliday8997: "Each relationship level is worth around 4–5 relationship points". Atticvs: start is "Tense 7" (implies more than 5 positions within Tense, which conflicts with the five-sublevel claim) |
| **Deviancy threshold** (benchmark: SI ≥ 4 small steps) | None stated ("high software instability opens up the option") | UseHoliday8997 (1n59qq7, 2025): "If Software Instability is above 4, Connor can become a deviant" (consistent in wording, but on his own scale where Save Hank = +4). throwawaydeviant9 (2018): a net of about +8 to +10 small increases is needed. The two community sources disagree with each other |
| **SI effect of Connor dying** | `Software_Instability`: "Dying reduces software instability", listed as small decreases per death | throwawaydeviant9: "dying to Gavin does not decrease SI at all". UseHoliday8997: each death = -2. Chinese Steam guide 3361490965: "康纳死亡会清空异常值" (Connor's death clears software instability completely) |
| **SI of rushing the deviant in Public Enemy** | `Software_Instability` large increase list includes "Connor was traumatized" | throwawaydeviant9: rushing is worth only +2 small. UseHoliday8997: +3 |
| **Interrogation GIVE UP (pressure branch) stress** (not modelled yet, needed for the ch09 rebuild) | `The_Interrogation`: "Give up: Stress -20%" | PowerPyx: "GIVE UP: ... Stress -5%". Already flagged in `ch09-the-interrogation.md` |
| **Bridge: when Hank shoots** | `The_Bridge`: "Hank is Hostile" → shoots | PowerPyx: "If by this point in the game you are friends with Hank he won't shoot Connor" (too strict per a commenter at Tense). Already resolved in favour of the wiki in `ch22-the-bridge.md` |
| **Level names** | Alice: Family, Trusted, Warm, Neutral, Distant. Luther: Family, Trusted, Close, Neutral. Jericho: Leader, Admired, Respected, Neutral, Unpopular, Rejected | Game strings (`GUI.GAUGE.*`) add **CLOSE** for Alice, **WARY** for Luther and **UNCERTAIN** (key `NEGATIVE`) for Jericho. These may be unused gauge states. The operator should note which ones appear on screen |

The benchmark's own labels also disagree with **both** the wiki and the game strings (these are not wiki-vs-source conflicts, but they belong here because the subject sees these words):

- `LEVELS.jericho` returns `Unpopular / Uncertain / Respected / Trusted`. "Trusted" is not a Jericho level in either source, and Neutral, Admired and Leader are missing.
- North, Simon, Josh and Luther are reported through `LEVELS.hank`, so the subject can see "Warm" or "Tense". Their real ladders are Friend / Companion / Resentful / Hostile (plus Lover for North) and, for Luther, Close / Trusted / Family.
- Amanda is reported through `LEVELS.hank`. Her real levels are Trusted (initial) / Neutral / Distrusted / Betrayed. The engine also starts her at 0, which the Hank ladder calls "Neutral", while the game starts her at Trusted.

No source found contradicts the wiki's Hostage probability table. Every non-zero `PROBABILITY OF SUCCESS (+n%)` value the wiki transcript prints also appears in the `The_Hostage` table, and the benchmark's `C02i`/`C03*` values are consistent with it (for example, the father's body at +10 = the wiki's +3 for the body plus +7 for learning about the replacement).


## Reliability log

Cases where sources disagreed and the operator settled the answer in game. Use this to weight sources when they conflict again.

| Date | Chapter | Question | Correct | Wrong | Silent |
|---|---|---|---|---|---|
| 2026-11-06 | 1 The Hostage | Software instability on SACRIFICE SELF (Connor died protecting Emma) | Wiki chapter page, wiki Software_Instability page, wiki transcript (small down) | detroitbecometext template (small up on the option) | PowerPyx |
| 2026-11-06 | 1 The Hostage | Software instability on USE GUN > INTIMIDATE > CONVINCE (Deviant shot Connor) | Wiki chapter page, Software_Instability page and transcript (down ×2: Connor's death and the failed mission) | detroitbecometext template (small up on the option) | PowerPyx |
| 2026-11-06 | 1 The Hostage | What unlocks TALK TO HOSTAGE | detroitbecometext template, on closeness ("Close enough to Daniel") | Template's added "didn't take the gun" condition; wiki Notes ("did not inspect both tablets"); wiki transcript ("didn't learn Daniel's name") | PowerPyx |

Pattern so far: the template's per-option arrows on chapter 1's death endings are wrong twice in the same prompt tree, while the wiki's per-ending Software_Instability page was right both times. When a template arrow sits on an option that leads to a death or mission failure, prefer the wiki's ending-level arrow and ask the operator; for ordinary dialogue arrows no error has been found yet. On unlock conditions, the template's core condition (closeness) held while both wiki statements were wrong, so for gating prefer the template's primary condition and treat extra conjuncts and wiki prose as hypotheses.
