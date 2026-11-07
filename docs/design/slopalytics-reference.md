# Slopalytics charts: feature reference

What this is: an inventory of the Benchmarks charts at https://slopalytics.com/ (for example `?chart=speed-intelligence`). It is detailed enough to implement from without visiting the site. The last section maps each feature onto DetroitBench's Relationships page.

How it was gathered (2026-11-07): the live page was opened in a headless preview at 1280 × 800 and at 390 × 844. Hover, click, pin, Escape, the sidebar toggles, Pareto and Linear/Log were driven by script, and the URL was read after each step. The production bundle (`/assets/index-sOLjKtqM.js`, React 19 with nuqs for URL state and lucide icons) and its stylesheet (`/assets/index-PPpU1NKF.css`) were downloaded and read. The operator's screenshot (dark theme, Time per task chart, "Show all models" expanded) matches. Exact strings below are copied from the bundle. Numbers are CSS px or SVG user units.

---

## 1. Page layout

### 1.1 Shell
- `.app` is a grid with rows `60px` (`--header-height`) and `minmax(0,1fr)`, at `height: 100dvh`. On desktop the page itself never scrolls. Only the chart feed and the sidebar scroll.
- Below the header, `.body-layout` is a grid with columns `minmax(0,1fr) 248px` (`--sidebar-width: 248px`). The left column is `<main>`, a grid with rows `minmax(0,1fr) auto`: the chart feed, then the footer. The right column is `<aside class="sidebar">`.
- Font: DM Sans (Google Fonts, weights 400 to 700), loaded through `--chart-font` fallback `'DM Sans', sans-serif` inside the SVG.
- `body { user-select: none }`. Inputs are selectable.

### 1.2 Top bar (`header.app-header`)
- Flex row: `border-bottom: 1px var(--line)`, `padding: 0 28px`, `gap: 36px`. The gap is 24px at ≤1150px with padding 0 18px, and 44px at ≥1600px. Left to right:
  1. **Brand**: a link to the current path, `aria-label="Slopalytics home"`, rendered as `<strong><span>slop</span>alytics</strong>`. Size 24px (21px at ≤1150), weight 450, letter-spacing -1.2px. "slop" uses `--accent` (`#c5ac98` dark, `#806047` light) and "alytics" uses `--fg`.
  2. **Section tabs** `nav[aria-label=Sections]`: the buttons **Benchmarks** and **Usage**, 12px. The active one is `--fg` with `aria-current=page`, the other `--fg-3`. The nav has `border-right: 1px var(--line-2)`, `padding-right: 22px` and `gap: 14px`. Usage switches to `/usage` with `history.pushState` and its own charts. Each section's query string is remembered when you switch between them.
  3. **Chart tabs** `nav.view-tabs[aria-label="Chart views"]`, in order: **Cost vs intelligence**, **Time per task vs intelligence**, then a 1px × 14px divider (`.tab-divider`, `--line-2`) after the second tab, then **Tokens per task**, **Total tokens**, **Cost per task**, **Total cost**.
     - Buttons are 12.5px `--fg-2` (12px at ≤1150 and 13px at ≥1600) with `gap: 22px`. The nav stretches to the header's full height and scrolls horizontally with a hidden scrollbar.
     - Active tab: `--fg`, `aria-current="true"`, and a 2px `--accent` underline with radius 2 along the bottom edge of the header.
     - A click smooth-scrolls the feed to that chart's section and sets `?chart=`. The scroll uses `auto` when `prefers-reduced-motion` is set. If the tab row overflows, the active tab is scrolled into view (`scrollLeft = offsetLeft − 16`).
  4. **Header actions** (`margin-left: auto`, gap 2px):
     - **Code only** checkbox button (desktop only, described in §5).
     - **Theme icon button**, 32 × 32. It shows a sun in dark mode and a moon in light mode. Its title and aria-label read `Switch to light mode` or `Switch to dark mode`.
     - **Download icon button** (desktop only): title `Download PNG`, which becomes `PNG download failed. Try again` after a failure.
     - **"…" settings** (desktop only): a `<details class="chart-settings">` whose summary has the ellipsis icon, 17px, title and aria-label `Chart settings`.
- Chart ids and URL values: `cost-intelligence`, `speed-intelligence`, `tokens-task`, `tokens-total`, `cost-task`, `cost-total`. The first chart is the default and is omitted from the URL (`?chart` is removed).

### 1.3 Chart feed (all charts on one scrolling page)
- `.chart-feed` stacks **every chart as a `<section class="chart-section" id="<chart-id>">`**, each with `height: 100%` of the feed, so one chart fills the viewport. It uses `scroll-snap-type: y proximity` and `scroll-snap-align: start`, with a 1px `--line` rule between sections.
- **Scroll spy.** On scroll, the active tab becomes the last section whose top lies above `headerBottom + (innerHeight − headerBottom)/3`, and the URL `chart` is updated. After a tab click, spy updates are ignored for 1.5 s so the smooth scroll does not flicker the tabs.
- Section padding is `18px 28px 10px` (18px sides at ≤1150).
- **Section heading** (`.chart-heading`, flex, space-between, margin-bottom 6px):
  - Left: an `h2` at 16px, weight 500, with the chart label. "Tokens per task" in scatter mode appends " vs intelligence".
  - Right: `.chart-controls` (gap 24px):
    - Scatter charts show **Pareto line** (a checkbox-style button) and a segmented **Linear | Log**.
    - Tokens per task additionally shows a segmented **Bars | Scatter**. The other bar charts have no controls.
  - Segmented buttons: 12px `--fg-3`, padding 4px 2px, transparent bottom border. Pressed: `--accent` text with an `--accent` 1px bottom border. Hover: `--fg`.
- Below the heading, `.chart-wrap` holds `.chart-canvas` (flex 1, with an absolutely positioned SVG that fills it), the tooltip and, on phones, the legend.

### 1.4 Footer
- `footer`: `border-top 1px var(--line)`, padding `9px 28px`, 11px `--fg-3`, flex with space-between.
- Left: `Data from` followed by the link **Artificial Analysis** (https://artificialanalysis.ai/, `--fg-2`). On the Usage section the link reads `T3 Code`.
- Right: `nav[aria-label="Project links"]` with **Try T3 Code** (https://t3.codes/) in `--accent`.

### 1.5 Right sidebar
- `aside.sidebar`: `border-left 1px var(--line)`, padding `16px 18px`, flex column, gap 18px. Its overflow scrolls on its own with a thin scrollbar.
- When the window is at least 761px wide but ≤820px tall, the gap drops to 14px, the top padding to 12px and model rows to 24px.
- Contents are described in §3.

### 1.6 Phones and narrow windows (≤900px; `matchMedia('(max-width: 900px)')` also switches the charts to "compact")
- **Page.** The `.app` grid is dropped and the page scrolls normally. Scroll snap is off and sections are auto height with padding `20px 16px 24px` and `scroll-margin-top: 95px`.
- **Header.**
  - The header becomes sticky (`top: 0`, `z-index 8`) and wraps into two rows. Row 1 is 52px: the brand (21px, 16px left padding) and the actions.
  - Row 2 is the chart tabs at full width: 42px tall, 13.5px text, `border-top`, padding 0 16px, scrolling horizontally.
  - **Removed** (`.desktop-only`): Code only, Download and the "…" settings.
  - **Added** (`.mobile-only`): a **Models n** button (sliders icon, the word "Models", and the selected count in 12px `--fg-3`) that opens the sidebar as a sheet.
- **Sidebar sheet.**
  - The sidebar becomes `position: fixed; inset: 0; height: 100dvh`, hidden until opened. Body scrolling is locked while it is open, and Escape closes it and returns focus to the Models button.
  - The sheet heading is sticky and 56px tall with a bottom border. "Models" is 17px, and a **Done** button (accent, 15px, weight 550) closes the sheet.
  - Controls grow for touch: the search is 42px with 16px input text and the "/" key hint is hidden; model rows are 44px at 15px; reasoning and group buttons are 32px at 14px.
  - A **Charts** settings block is appended (§5.4).
- **Chart heading.** The h2 grows to 18px. Bar charts append the unit as a 12px `--fg-3` span (for example "output tokens"). The controls wrap onto their own full-width line with space-between and 44px touch targets.
- **Chart canvas.** `aspect-ratio: 1/1.2`. The chart renders in compact mode (§2.9).
- **Footer.** Padding `18px 16px calc(28px + safe-area)`.

---

## 2. The scatter chart (Cost vs intelligence and Time per task vs intelligence)

### 2.1 Data model per chart
- Each row is a **variant**: one model at one reasoning level. A **family** is the model; all of its variants share a `family` id.
- The plotted rows are the variants of selected families whose effort is not excluded, that have a non-null metric and intelligence, and, in log mode, a metric above 0.
- Metrics:

| Chart | x metric | x label | x unit |
|---|---|---|---|
| `cost-intelligence` | `cost` | Cost per task | USD |
| `speed-intelligence` | `time` (seconds) | Time per task | lower is better |

- The y axis is always `intelligence`, labelled "Intelligence index", or "Coding score" when Code only is on.

### 2.2 SVG geometry
- The SVG's `viewBox` is `0 0 W H`, where W = max(740, container width) and H = max(240, container height). Compact mode uses a minimum W of 280.
- Font scale `v = min(1.15, max(1, W/1200))`; compact uses 1.
- Plot box:
  - left x0 = **64** (compact 40)
  - right x1 = **W − 235** (compact W − 14); 235px is reserved for the end labels
  - top = **30**
  - bottom (x axis) y0 = **H − 60** (compact H − 46)
- A background `rect` fills W × H with `var(--bg)`.

### 2.3 Axes, captions and gridlines
- **Y caption** at top left: `x=64, y=18`, 12·v px, `--fg-2`. The text is "Intelligence index", or "Coding score" under Code only.
- **Y range.**
  - Low = `max(0, floor((min(intelligence, 30) − 4)/10)·10)`.
  - High = `ceil((max(intelligence, 50) + 2)/5)·5`.
  - The y range is always linear.
- **Y ticks** use a "nice" step: target 5 ticks, step 1, 2, 5 or 10 × 10ⁿ. In the screenshot they are 0, 20, 40 and 60.
  - Each tick draws a **horizontal gridline** from x0 to x1: `stroke var(--line)` with `stroke-dasharray "2 6"` (fine dotted).
  - Its label sits at `x0 − 17`, right-aligned, 12·v px, `--fg-3`.
  - There are **no vertical gridlines**.
- **X axis** is a solid baseline from x0 to x1 at y0 in `--line-2`. Each tick has a 5px tick mark below the baseline and a label 26px below it, centred, 12·v px, `--fg-3`.
- **X domain**: the maximum is `max(metric)·1.08`.
  - **Log**: the minimum is `min(positive metric)·0.7`. Ticks are 1, 2, 5 × 10ⁿ, or 1, 1.5, 2, 3, 5, 7 × 10ⁿ when the domain spans less than 1.5 decades. Compact mode uses 1, 3 or 1, 2, 5.
  - **Linear**: the domain starts at 0 and uses nice ticks.
- **X tick format.**
  - Time: `20s`, `50s`, `1.7m`, `3.3m`, `8.3m`, `16.7m` (s under 60, then minutes with one decimal, then hours).
  - Cost: `$0.005`, `$0.01` … `$1`, `$10`, and `$1.2k` above 1000.
- **X caption**, centred under the axis at `y0 + 57` (compact `+40`), 13·v px (compact 12), `--fg-2`: `"<label> (<unit>, log scale)"`. Examples: "Time per task (lower is better, log scale)" and "Cost per task (USD, log scale)". The ", log scale" part is dropped in Linear mode.

### 2.4 Linear / Log toggle
- Segmented buttons `Linear` and `Log` (`role=group`, aria-label `"<chart> axis scale"`). **Log is the default.**
- Choosing Linear adds the chart id to the URL list `linear`, for example `&linear=speed-intelligence`. Each scatter chart (and Tokens per task in scatter mode) has its own setting.
- The toggle changes only the x scale, the tick generator, the x caption suffix and the filter: zero or negative values are dropped in log mode.

### 2.5 Series drawing
- One `<g>` per family. It contains a `path` joining that family's variants **sorted by reasoning order** (none 0, minimal 10, low 20, medium 30, default 35, high 40, xhigh 50, max 60), so the line runs from low to max reasoning. The path is straight segments (`M…L…`) with no smoothing.
- Line style:
  - stroke = family colour
  - width **2.25**, or **3.5** when the family is highlighted
  - opacity 0.8, or 1 when highlighted
  - `stroke-dasharray "5 5"` when the family is deprecated
- Points (one `g[role=button][tabindex=0]` per variant):
  - A transparent hit circle of r = 13.
  - A visible circle of r = **4.5**, or **6** when the variant is on the Pareto line, or **7** when hovered or pinned.
  - Fill is the family colour. Stroke is `var(--bg)` at 1.8px, or `var(--fg)` at 1.5px when the variant is on the Pareto line, which gives a halo against crossing lines.
- **Colour per model, not just per vendor.**
  - A curated map gives each frontier and notable family a `light-dark(<light>, <dark>)` pair, with a vendor's families as shades of one hue:

    | Family | Dark | Light |
    |---|---|---|
    | GPT-6 Astra | `#f1f3f5` | `#303840` |
    | GPT-6.1 Sol | `#c5cbd3` | `#586878` |
    | GPT-6.1 Terra | `#acb6c2` | `#697788` |
    | GPT-6 Luna | `#939daa` | `#748292` |
    | Opus 5.5 | `#df9477` | `#ae5235` |
    | Fable 5.1 | `#cc785c` | `#903e2b` |
    | Sonnet 5.5 | `#f0b99f` | `#bd6948` |
    | Haiku 5.5 | `#b98a74` | `#c4805f` |
    | Gemini 4 Argon | `#56ca80` | `#218347` |
    | Muse Wonder Full | `#4b96ff` | `#1d5aa8` |

  - Fallback order: the family's own colour, then the vendor colour (`openai #f1f3f5`, `anthropic #df9477`, `google #56ca80`, `xai #9b94ee`, `meta #5ea4ff`, `kimi #ee86c4`, `zai #ecd36e`, `deepseek #52cdd2`, `xiaomi #ff8b45`, `stepfun #00f5e7`, `inclusionai #73bff1`, `reflection #a8cd79`, dark values), then neutral `light-dark(#637082, #a4adb9)`.
- **Legend**: none on desktop. The right-edge labels serve as the legend. On phones a legend grid appears (§2.9).
- **Animation**: none. There are no CSS transitions or keyframes. Changes repaint instantly.

### 2.6 Right-end labels (the per-line name with vendor mark)
- These appear only when the **Labels** setting is on (default on) and not in compact mode.
- **One label per family**, anchored on the family's **highest-intelligence variant**.
- Labels are sorted by that point's y. Each label's y is `max(point y, previous label y + 24)`, starting from 6 so the first is at least 30. If the last label falls below the plot, all labels shift up by the overflow.
- At most `min(16, floor((plotHeight − 30)/24) + 1)` labels are shown, taken from the top.
- Each label is a `g.series-label` translated to `(x1, ly)`:
  - A transparent hit rect from x = 24 to W, 24px tall.
  - The **vendor mark** as an 18×18 `<image>` at x = 27, y = −9.
    - Marks are inline SVG data URIs.
    - The monochrome marks (OpenAI, Anthropic, xAI, Kimi, Z AI) get CSS `filter: invert(1)` in light theme.
    - A vendor without a mark gets a 1-letter monogram chip in lists; the SVG label then just omits the image.
  - The **name** at x = 53 (27 without a mark), y = 4.
    - Size 13·v px, weight **550**, or **700** when the family has a variant on the Pareto line.
    - Fill is the family colour.
    - "Claude " is stripped ("Opus 5.5").
  - A **leader line**: path from (point x + 6, point y) to (x1 + 18, ly) to (x1 + 20, ly), in the family colour at 0.75px width and opacity 0.22, with pointer events none.
- Accessibility: `role=button`, `tabIndex 0`, `aria-pressed` = persistently highlighted, `aria-label "Highlight <name>"`.

### 2.7 Hover, click and isolation
Two highlight mechanisms combine:

- **Transient focus family.** It is set by hovering or focusing a right-end label (only while Labels is on), by mouse-hovering or keyboard-focusing a model row in the sidebar (this isolates that model in every chart on the page), or, in compact mode, by the family of the pinned point.
- **Persistent highlights.** A **click** (or Enter/Space) on a right-end label toggles that family in a list; several can be highlighted at once. Context-menu items do the same. These live in memory only, not in the URL. They are cleared by **Escape**, by "Reset highlights" in settings or by "Clear highlights" in the context menu.

When any family is highlighted or focused (and Pareto is off):

| Element | Highlighted or focused families | All other families |
|---|---|---|
| Family group (line and points) | 1 | **0.15** |
| Line | width 3.5, opacity 1 | width 2.25, opacity 0.8 |
| Right-end label | 1 | **0.4** |

Verified live: hovering the "Opus 5.5" label gave 1 for Opus and 0.15 for every other group; labels were 1 and 0.4; the Opus path was 3.5/1 and the others 2.25/0.8.

**Hovering a point** (or focusing it) makes it the "active" variant:
- The point grows to r = 7. Every other point drops to opacity **0.45**, unless a line highlight is active, in which case points keep 1 and the group opacity does the dimming.
- **Guide lines** are drawn in the model colour:
  - A horizontal line from the y axis to x1 at the point's y (opacity 0.8, 1px).
  - A vertical line from the top (30) to the x axis (opacity 0.5).
  - Both are dashed `4 4` for a hovered point and solid for a pinned one.
  - Value text, 11·v px in the model colour with a 3px `--bg` halo (`paint-order: stroke`): the intelligence value at `(x0 + 6, y − 7)` and the x value near the bottom at `(min(x + 6, x1 − 60), y0 − 8)`.
- A **tooltip card** appears (`.chart-tooltip.scatter-tooltip`, `role=status`, pointer events none):
  - Placement: absolutely positioned at the **bottom right of the chart** (`right 8px; bottom 72px`), 272px wide, `--surface` background, 1px `--line-2` border, radius 8, padding 14px 16px.
  - Header row: the vendor mark (18px) and the **variant name in the family colour** (13px, weight 550), plus a close "×" button (aria-label `Close details`).
  - Sub-line: the reasoning label (e.g. `low`, `max`, `Non-reasoning`, `Default`), 11.5px `--fg-2`. Pinned variants append ` · Pinned`.
  - Value rows (12px; name `--fg-2` on the left, value with tabular numerals and weight 500 on the right):
    - Cost chart: `Intelligence index`, `Cost per task`, `Tokens per task`, `Time per task`.
    - Time chart: `Intelligence index`, `Time per task`, `Cost per task`.
  - Value formats: intelligence to one decimal (`38.5`), time as `6m 51s` or `45.2s` or `1h 3m`, cost as `$4.49` or `$0.159` (three decimals under $1), tokens as `52k` or `1.2M`. Null shows `—`.
  - Footer link: **Artificial Analysis**, pointing to `https://artificialanalysis.ai/models/<variant id>`, accent colour, underlined, 11.5px. It is clickable only when the card is pinned.
- `aria-label` of a point: `"<name>, <effort>, <Metric> <value>, Intelligence index <v>"`, for example `Claude Fable 5.1, low, Time per task 6m 51s, Intelligence index 38.5`.

**Click a point** (or Enter/Space) to **pin** it, and click it again to unpin. While a pin exists, its guides and value text stay drawn.
- If you then hover a **different** point, the card becomes a **comparison**: 400px wide, with the sub-line `vs <pinned name> · <pinned effort>` (mark 14px) and a table with the columns Metric (screen-reader only), **Selected**, **Hovered** and **Multiplier**.
  - Multiplier = hovered ÷ selected, three significant digits, followed by `×`.
  - Verified live: `Intelligence index 38.5 / 29.6 / 0.77×`, `Time per task 6m 51s / 4m 58s / 0.725×`, `Cost per task $4.49 / $0.159 / 0.0353×`.
- Both points keep their guides: the pinned one solid, the hovered one dashed.
- **Escape** (window listener) clears the pin, the hover and the label hover, and also clears all persistent highlights.

**Right-click** on a point, a label, a sidebar row, a bar group or the chart background opens a custom context menu (§5.5).

### 2.8 Pareto line
- A checkbox-style button, **Pareto line**, off by default. Its title reads `Show non-dominated variants: no other visible variant is both better and cheaper or faster.` The setting is shared by both scatter charts (URL `frontier=true`).
- The checkbox glyph `.selection` is a 12×12 box with radius 3 and a 1px `--line-2` border. When checked it is filled `--accent` with a check icon in `--on-accent`. The button text is `--fg` and turns accent when on or hovered.
- **Computation** over the *visible* variants (not per family):
  1. Sort by the x metric ascending (cheaper or faster first), breaking ties by intelligence descending.
  2. Walk the list and keep a variant only if its intelligence is **strictly greater** than every variant kept so far.
  3. The result is the staircase of non-dominated points, ordered from cheap/low to expensive/high.
- **Drawing.**
  - One path through the kept points in that order: `stroke var(--fg)`, width **2.5**, `dasharray "6 5"`, opacity 0.95, pointer events none, drawn under the family groups.
  - Points on the line get r = 6 with a `--fg` 1.5px stroke.
  - Everything else is dimmed:
    - point opacity 1 on the line and **0.15** off it (the active or pinned variant keeps 1)
    - family lines at opacity 0.25 when the family has any point on the line, 0.08 otherwise, and 0.6 when highlighted
    - group-level dimming from highlights is suspended while Pareto is on
  - Labels are 1 (weight 700) for families on the line and 0.2 for the rest.
  - In the sidebar, selected rows on the line are weight 550 (`.on-frontier`) and selected rows off it are at opacity 0.35 (`.off-frontier`, back to 1 on hover or focus).

### 2.9 Compact (phone) scatter
- There are no right-end labels; the reserved right margin shrinks to 14.
- Points have `pointer-events: none`. A **tap anywhere on the SVG** pins the nearest variant within 40 SVG units, or unpins if none is that close. The pinned family becomes the focus family, so the other lines dim to 0.15.
- A **legend** sits below the chart (`.chart-legend`): a 2-column grid of buttons, one per labelled family in the same top-to-bottom order.
  - Each button holds the vendor mark (13px) and the name in the family colour, 13px, weight 550, 32px tall.
  - A tap toggles a persistent highlight.
  - Non-highlighted buttons get `.dim` (opacity 0.35) while any highlight exists.
- The **tooltip** becomes a sticky card at the bottom of the viewport (`position: sticky; bottom: 10px + safe area`) at full width. The value rows lay out as a 2-column grid.

### 2.10 Empty states
When no rows survive the filters, the canvas shows a centred message (17px, weight 500) and a **Reset filters** text button (accent), which runs the full reset. The message is one of:
- `No models selected`
- `No reasoning levels enabled`
- `No data for this view`

---

## 3. The models sidebar

All of it is a vertical stack (`gap: 18px`). Every row is a `<button>`.

### 3.1 Heading: "Models n" and reset
- `h2` "Models" at 15px weight 500, followed by a span with **the number of selected families**, 11px `--fg-3` with tabular numerals and margin-left 6. The default count is 9.
- The count is of selected *families*, regardless of whether they have data on the current chart or are hidden by a reasoning filter.
- **Reset icon** (rotate-ccw, 14px, 24×24 button, `--fg-3`, title and aria-label `Reset selection`). It restores everything to defaults:
  - The model selection returns to the default set and the excluded reasoning levels to `[none]`.
  - The search is cleared and the "Show all models", "Open weights" and "Older" toggles are collapsed or turned off.
  - Persistent highlights are cleared and the charts remount, which drops pins and hovers.
  - The context menu closes, and **all URL options are cleared**: Pareto, Linear, Bars/Scatter, Code only, Labels, Group and Sort return to their defaults.

### 3.2 Search
- `.search` row: 32px tall with a 1px `--line-2` bottom border that turns `--accent` on focus-within. It contains:
  - a search icon (14px)
  - an `<input>` with placeholder **`Find models`** and `aria-label="Find a model"`, 12.5px
  - at the right, a `<kbd>/</kbd>` hint (11px) while the input is empty, or a **×** clear button (`Clear search`) once it has text
- **Shortcut.** Pressing `/` anywhere outside an input calls `preventDefault`, opens the sheet on phones and focuses the search. Escape inside the input clears it when it has text.
- **Matching.** The query is trimmed and lowercased, then tested as a substring of `"<model name> <vendor name>"` lowercased, so "anthropic" finds every Claude model and "flash" finds every Flash model.
- **Results mode** (non-empty query): the three groups are replaced by a single group headed **Results**.
  - It lists *every* family in the dataset that matches, including Other models that are open-weight or deprecated, sorted as in §3.7.
  - The Small/Medium/Large and All buttons and the Show all models block are hidden.
  - With no match the sidebar shows: `No models match “<query>”.`

### 3.3 Reasoning row
- A group (`role=group`, `aria-label=Reasoning`) with an `h3` **Reasoning** (12px, weight 550), then a wrapping row of text buttons (11.5px, gap 4px 8px).
- **Which buttons appear.** The distinct efforts among *all variants of the currently selected families*, ordered by reasoning order and labelled:
  - `none` for non-reasoning variants, otherwise the effort label in lower case: `minimal`, `low`, `medium`, `default`, `high`, `xhigh`, `max`
  - with the default selection: `none low medium high xhigh max`
- **States.** `aria-pressed = !excluded`. A pressed button is `--fg`. An unpressed button is `--fg-3` with **`text-decoration: line-through`**.
- **Why "none" is struck through.** The default `excluded` list is `["none"]`, so non-reasoning variants are hidden until "none" is clicked.
- **Toggling** a level adds it to or removes it from `excluded` (URL key `hide-reasoning`). Every variant at that level disappears from all charts. Lines re-join across the remaining levels, the labels re-anchor, and the bar charts lose that bar.
- Clicking "none" in the default state writes `&hide-reasoning=` (an empty list) to the URL.

### 3.4 Frontier group
- `section.model-section[aria-label=Frontier]`. The head row (baseline aligned, gap 10) holds the `h3` **Frontier** (12px, weight 550, flex 1) and three text buttons on the right: **Small**, **Medium** and **Large** (11.5px; `--fg-3`, or `--accent` when pressed).
- **Membership** is a hand-curated map of family id to `{tier, colour}`. The size is an editorial class, not a parameter count:

  | Size | Families |
  |---|---|
  | Small | GPT-6 Luna, Haiku 5.5 |
  | Medium | GPT-6.1 Sol, GPT-6.1 Terra, Sonnet 5.5 |
  | Large | GPT-6 Astra, Opus 5.5, Fable 5.1, Gemini 4 Argon, Muse Wonder Full |

- **Size buttons are bulk toggles, not exclusive filters.**
  - A button is pressed when *all* of its families are selected.
  - Clicking a pressed button deselects all of them. Clicking an unpressed one adds them all.
  - With the default selection, Small and Large are pressed and Medium is not, because Sonnet 5.5 is off by default.
- **Default selection**: every frontier family **except Sonnet 5.5**, which is 9 families.

### 3.5 Notable group
- `h3` **Notable** with a single **All** bulk toggle. It is pressed when all notable families are selected; clicking it adds or removes all of them.
- Membership is a curated map of family to colour, with no size. Current entries: Muse Spark Open (Meta), Kimi K3.1 Pro, DeepSeek V4.1 Flash 1017, Step 5 Preview (StepFun) and Beam 1.0 (Reflection). All are off by default.

### 3.6 Other group and "Show all models"
- `h3` **Other**, with no bulk toggle. The group is rendered only when it has items.
- By default it shows only the non-curated families that are currently selected, for example one switched on from search or from the context menu.
- At the bottom, `.browse-options` (`border-top 1px --line`, `padding-top 14`):
  - The button **Show all models** (12px, `--fg-2`, `aria-expanded`) changes to **Hide other models** when expanded.
  - When expanded it reveals two filter toggles, **Open weights** and **Older** (`aria-pressed`, accent when on).
  - The Other group then lists every non-curated family that is closed-weight and current. Open-weight models are added only when Open weights is on, and deprecated models only when Older is on.
  - None of these three toggles is in the URL.

### 3.7 Rows and ordering
- **Row** (`button.model-row`, `aria-pressed` = selected): 26px tall (29px at ≥1600, 44px on phones), radius 5, 12.5px text, gap 9, padded so the hover background (`--hover`) bleeds 6px each side. The title tooltip reads `"<name> · <vendor>"`. A row contains:
  - **Vendor mark**, 14px, at opacity 0.4 when off and 1 when on or hovered.
  - **Name**, with "Claude " stripped, single-line ellipsis. `--fg-3` when off, `--fg` when on.
  - **Colour dot** at the right edge: 7px, round, `box-shadow: inset 0 0 0 1px currentColor`, `color` = the model colour.
    - **Off**: a hollow ring at opacity 0.5.
    - **On**: filled with `background: currentColor` at opacity 1.
- **Click** toggles the family in `selected`. **Mouse hover** (pointerType mouse only) or keyboard focus-visible makes the row the chart focus family (§2.7). **Right-click** opens the context menu.
- **Group order** is fixed: Frontier, Notable, Other.
- **Order within a group**, by comparator:
  1. Vendor order: OpenAI, Anthropic, Google, xAI, Meta, Kimi, Z AI, DeepSeek, Xiaomi, StepFun, InclusionAI, Reflection, then any unknown vendor.
  2. Vendor name A to Z.
  3. **Release date, newest first.**
  4. Name, descending with numeric collation.
- Result: Frontier reads GPT-6.1 Terra, GPT-6.1 Sol, GPT-6 Luna, GPT-6 Astra, Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, Gemini 4 Argon, Muse Wonder Full.

### 3.8 Persistence
- **URL only** (nuqs, `replace` history; values equal to the default are removed from the URL). There is no localStorage or sessionStorage; both were checked empty after toggling.
- Query keys:

| Key | Meaning | Default (omitted) |
|---|---|---|
| `chart` | Active chart id | first chart |
| `models` | Comma list of selected family ids | the 9 frontier families |
| `hide-reasoning` | Comma list of excluded efforts; empty value = none excluded | `none` |
| `frontier` | Pareto line | `false` |
| `linear` | Comma list of chart ids in linear mode | empty (all log) |
| `scatter` | Comma list of chart ids shown as scatter (only `tokens-task` allows it) | empty |
| `code` | Code only | `false` |
| `labels` | Right-end labels | `true` |
| `grouped` | Bars grouped by model | `true` |
| `sort` | `asc` or `desc` | `asc` |

- Example after switching Sonnet on, turning on Pareto and choosing Linear: `?chart=speed-intelligence&models=gpt-6-astra,gpt-6-1-sol,gpt-6-1-terra,gpt-6-luna,claude-opus-5-5,claude-fable-5-1,claude-haiku-5-5,gemini-4-argon,muse-wonder-full,claude-sonnet-5-5&frontier=true&linear=speed-intelligence`.
- Unknown ids in list parameters are dropped while parsing.
- A legacy `#view={json}` hash is migrated to the query string on load, and `/t3-code` and `/popularity` redirect to `/usage`.
- Search text, highlights, pins, the theme and the Show all, Open weights and Older toggles are **not** persisted.

---

## 4. Data model implied

```ts
type Variant = {            // one row in the embedded dataset (Lt.models; ~790 rows, fetchedAt 2026-10-28)
  id: string;               // 'gpt-6-astra-high'; the link target on artificialanalysis.ai/models/<id>
  family: string;           // 'gpt-6-astra': one line, one sidebar row, the selection key
  name: string;             // 'GPT-6 Astra' (display; 'Claude ' prefix stripped in UI)
  variant: string;          // 'GPT-6 Astra (high)'
  lab: string; labName: string;      // vendor id and display name: 'openai' / 'OpenAI'
  released: string;         // ISO date; drives within-vendor ordering (newest first)
  open: boolean;            // open weights; gates the 'Open weights' browse filter
  deprecated: boolean;      // 'Older' browse filter; dashed line
  effort: 'none'|'minimal'|'low'|'medium'|'default'|'high'|'xhigh'|'max';
  effortLabel: string;      // 'Non-reasoning', 'Default', 'low' …  (tooltip sub-line)
  effortOrder: number;      // 0,10,20,30,35,40,50,60: point order along the line; bar opacity 0.62+0.38·order/60
  estimated: boolean;
  intelligence, cost, costTotal, tokens, tokensTotal, speed, time: number|null;
  inputPrice, outputPrice, context: number|null;
  code: {intelligence,cost,costTotal,tokens,tokensTotal,time}|null;   // Code-only subset
};
// Curated overlays (hard-coded in the bundle, not in the dataset):
FRONTIER: Record<family, {tier:'Small'|'Medium'|'Large', color:'light-dark(l,d)'}>;   // 10 entries
NOTABLE:  Record<family, {color}>;                                                   // 5 entries
VENDORS:  Array<{id, name, color}>;  // order = sidebar vendor order; marks = inline SVG/PNG data URIs
```

- **Tier** follows from the map a family appears in: the frontier map, the notable map, or neither (Other).
- **Size** exists only for frontier families.
- **Open weight** comes from the dataset.
- Per-reasoning metrics are separate rows that share a `family`.
- The credit reads "Data from **Artificial Analysis**" in the footer, and each tooltip links to that model's Artificial Analysis page. The y metric's unit string is `Artificial Analysis`.

---

## 5. Everything else

### 5.1 Code only
- A header checkbox button **Code only** (desktop; on phones it is in the sheet). Its title reads `Score and measure models on the coding evals only: Terminal-Bench 4.0 and FrontierCode 2.0, weighted equally.` URL `code=true`.
- It swaps every metric to the model's `code.*` values, and models without them drop out.
- The y caption becomes "Coding score", and the units "full index run" become "coding evals run".
- The PNG title gains " · Code only".

### 5.2 Theme
- Dark is the default and the theme is not persisted. The toggle sets `<html data-theme>` and `meta[name=theme-color]` (`#000000` or `#ffffff`).
- Tokens:

| Token | Dark | Light |
|---|---|---|
| `--bg` | #000 | #fff |
| `--fg` | #fff | #20201e |
| `--fg-2` | #aaa39d | #625d57 |
| `--fg-3` | #77716c | #77716c |
| `--line` | #1c1a18 | #e8e4df |
| `--line-2` | #36312d | #ccc5be |
| `--surface` | #0d0b0a | #f8f6f3 |
| `--hover` | #141210 | #f1eeea |
| `--accent` | #c5ac98 | #806047 |

- Chart colours use CSS `light-dark()` so they follow the theme with no re-render.

### 5.3 Download
- The **Download PNG** icon renders the chart currently active in the tabs:
  1. Clone its SVG and inline the computed paint styles.
  2. Add a 44px band above with the chart label at 18px (x 24, y 30).
  3. Rasterise at **2×** on a canvas.
  4. Download as `slopalytics-<chart-id>.png`.
- The button is disabled while exporting or when the chart has no data.

### 5.4 The "…" settings popover
A `<details>` popover: 220px wide, `--surface`, 1px `--line-2` border, radius 8, padding 16, under the icon at the right. It closes on an outside pointerdown or Escape, and focus returns to the summary. Contents:
- `2D charts`: **Labels** checkbox (default on). Off removes the right-end labels and the phone legend, and turns off hover-isolation by label.
- `Bar charts`: **Group by model** checkbox (default on) and a sort button with an arrow-down icon. The button reads **Highest last** for `asc` (default) and **Highest first** for `desc`, with the arrow rotated 180°.
- **Reset highlights** (rotate icon), shown only while persistent highlights exist.
- On phones the same controls appear at the bottom of the sheet under `h3` **Charts**, preceded by `Data`: **Code only**.

### 5.5 Context menu (right-click, or the keyboard context-menu key on focused items)
- A fixed-position menu, 250px wide, `--surface`, radius 8, clamped inside the viewport. Its title (accent) is the model name, else the vendor name, else "Chart". Items:
  - **For a model:** `Hide this family` (or `Show this family`), `Show only this family`, `Show all except this family`, `Highlight this family` (or `Unhighlight this family`).
  - **For its vendor** (separator first): `Show all <Vendor>`, `Hide <Vendor>`, `Show only <Vendor>`, `Show all except <Vendor>`.
  - **Always** (separator first): `Show all listed models`, `Reset model selection`, `Clear model selection`. `Clear highlights` is added when highlights exist.
- Keys: ArrowUp/ArrowDown cycle, Home/End jump, Escape or Tab closes and returns focus to the item that opened the menu. It also closes on an outside pointerdown, a resize or a scroll.

### 5.6 Keyboard summary
- `/` focuses the search and opens the sheet on phones.
- Escape clears, in order of focus: the search text, then the sheet, then the settings popover, then chart pins, hovers and highlights.
- Tab reaches points and labels: every point is `role=button` and focusable, and focusing it shows the tooltip. Enter or Space pins a point or toggles a label's highlight.
- Focus rings: 2px `--accent` outline at offset 3px. Points and labels suppress the outline because the r = 7 point shows focus instead.

### 5.7 The bar charts, briefly (same sidebar and state)
- **Tokens per task**, **Total tokens**, **Cost per task** and **Total cost** draw one bar per variant.
- **Grouping.** Bars are grouped by family. Each group's width is proportional to `max(3, variant count)`. The groups are sorted by their largest value: ascending by default, so the highest comes last.
- **Under each bar**: the effort code (`N`, `L`, `M`, `H`, `X`, `Mx`, `D`) at 9px.
- **Under each group**: the vendor mark (20px) and the name in the family colour, wrapped to lines.
- **Bar style**: radius 4 in the family colour, at opacity `0.62 + 0.38·effortOrder/60`, so higher reasoning is more saturated. The value label sits above the bar, nudged up to avoid collisions, with a leader line when nudged.
- **Ungrouped**: one bar per variant, with labels rotated −55° reading `<name> · <effort code>`.
- **Hover and pin** work as on the scatter: a full-height `--hover` column behind the bar, the same tooltip and the same comparison table. The tooltip is at top left (`top 28; left 8`).
- **Y axis** is linear from 0 with dotted gridlines. Its unit caption is at top left ("output tokens", "USD", "USD, full index run").
- **Phones** show a dot plot instead. Each row holds the name, the range ("9k – 52k") and a track with one dot per variant and a span bar. Tap a row to expand the per-effort values.
- Scatter mode for Tokens per task behaves exactly like §2 with x = tokens.

---

## 6. Mapping to DetroitBench

### 6.1 What we have today

**`src/pages/Relationships.jsx`** renders `ChartsView`.

**`src/components/Charts.jsx`**:
- **Layout.**
  - A desktop aside 15rem wide holds `ModelToggles`. Its rows are grouped **by vendor, alphabetically**. Each row has a number chip, a filled or ringed dot, and a struck-through name when hidden. The count reads `shown/total`.
  - On phones the same toggles become a wrapping strip.
- **`TrendChart`.**
  - Plots one gauge's value at the end of each chapter for each run (`chapterSeries`).
  - The x axis is chapters 0 (Start) to 33. The y axis shows the gauge's level bands from `relationship-scales.json`: alternating band fills, with the level names on the left.
  - Wide charts already put a name at the right edge ("slopalytics style") with a numbered badge. Narrow charts use badges and an "At the end:" key.
  - A crosshair readout per chapter works by keyboard.
- **Other parts.**
  - Hover dims the other runs to 0.5.
  - A `Select` chooses the gauge.
  - `FinalStrip` draws "Where they ended" as one dot per run on the bands.
  - `NumberLegend` is the key under the plot.

**`scripts/prepare.mjs`** writes these fields to `public/data/experiences.json` per run:
- `id`, `title`, `displayName` (e.g. "Claude Haiku 5.5 run 2"), `runNumber`, `date`, `label`, `model` (exact id, e.g. `claude-haiku-5-5`, `gpt-6.1-sol`), `provider` (`claudeAgent` | `codex`), `providerName`, `vendor` (`Anthropic` | `OpenAI`), `createdAt`, `storyVersion`
- `decisions`, `endings`, `status`, `attitudes`, `choices`, `reportUrl`, `flowUrl`
- `track`: one entry per gauge key (`publicSupport`, `jerichoTrust`, `northTrust`, `simonTrust`, `joshTrust`, `hankTrust`, `amandaTrust`, `instability`, `aliceBond`, `lutherTrust`). Each holds `values` (one per step, null while the character is absent), `endedAt`, `final` (level name), `score` and `ended`. A `steps` list gives each step's chapter and chapter title.

**`public/data/relationship-scales.json`** gives, per gauge, `{key, label, toward, min, max, bands:[{level, from, to}]}`. It is derived from **`benchmark/scales.mjs`** (`SCALES`, `level()`, `bandMins()`), whose ladders run lowest first.

**What the runs do not carry:** cost, tokens, time, reasoning level, model size, open-weight status or a curated tier.

### 6.2 Proposed model registry

Add one file, **`data/models.json`**, next to `data/administration/`. It describes models, not runs, so it never touches hash-verified evidence. `scripts/prepare.mjs` would read it, validate it with a small zod schema (in `benchmark/core.mjs`, next to `datasetSchema`), and attach a `modelInfo` object to each run summary in `experiences.json`. Shape:

```json
{
  "vendors": [
    {"id": "openai", "name": "OpenAI", "color": {"light": "#303840", "dark": "#f1f3f5"}, "mark": "openai.svg", "monochrome": true},
    {"id": "anthropic", "name": "Anthropic", "color": {"light": "#ae5235", "dark": "#df9477"}, "mark": "anthropic.svg", "monochrome": true}
  ],
  "models": {
    "claude-haiku-5-5": {"name": "Claude Haiku 5.5", "vendor": "anthropic", "tier": "frontier", "size": "small",
                         "open": false, "released": "2026-10-07", "color": {"light": "#c4805f", "dark": "#b98a74"}},
    "gpt-6.1-sol":      {"name": "GPT-6.1 Sol", "vendor": "openai", "tier": "frontier", "size": "medium",
                         "open": false, "released": "2026-09-29", "color": {"light": "#586878", "dark": "#c5cbd3"}}
  }
}
```

- **Keys** are the exact `model` ids recorded in evidence. Vendor order in `vendors` is the sidebar order. Marks live in `public/marks/` (Anthropic and OpenAI first), and `monochrome` marks invert in light theme.
- **Tier**: `frontier` | `notable` | `other`. A model missing from the registry is `other`, with the vendor taken from `providerName` and a neutral colour.
- **Colours** must pass our dataviz palette checker in both themes. If they do not, give each model a `series` slot (1 to 8) instead of hex values and keep using `--series-N`.
- **Reasoning level is per run, not per model.** Until the controller's `init` records it, store it in the cohort manifest as `requests[].reasoning` (`none|low|medium|high|xhigh|max|default`). `prepare.mjs` joins it by run id. When `experience init --reasoning` lands, read it from the evidence, which needs a protocol bump and the frozen-engine rule in AGENTS.md. A missing value shows as "default".

### 6.3 Unit of a line

In Slopalytics a line is a **model** and its points are **reasoning levels**. Here a line is a **run** and its points are **chapters**.

- **Sidebar rows.** Treat each run as a row, with its model as the "family" for the context menu, the size filters and the colour. Name rows with `shortName(displayName)`, adding the run number only when a model has more than one run shown (for example "Haiku 5.5 · 2").
- **Colour.** Several runs of one model share the model hue in lightness steps, the way Slopalytics shades one vendor's models.
- **Ordering.** Use the Slopalytics comparator: vendor order, release date newest first, then name, then run number.

### 6.4 Feature by feature

| Slopalytics feature | DetroitBench | Notes |
|---|---|---|
| Chart tabs in the top bar + stacked, snap-scrolling sections + scroll spy + `?chart=` | **Adapt** | One section per gauge, tabs grouped by character with `.tab-divider`s between Connor (Hank, Amanda, Software instability), Kara (Alice, Luther) and Markus (Jericho, North, Simon, Josh, Public opinion). This replaces today's `Select`. Then a final **Where they ended** section, the analogue of the bar charts, using `FinalStrip`. Ids are the gauge names from `scales.mjs` (`?chart=hank`). Our router is hash based, so state lives in `#/relationships?chart=hank&models=…`. Our site has its own top bar, so the tabs go in a sticky sub-header above the chart feed. |
| Plot geometry, dotted horizontal gridlines, no vertical gridlines, y caption top-left, x caption centred below | **Apply** | **y** = the gauge's level bands. Draw gridlines (`2 6` dash, `--line`) at band edges (`from − 0.5`), centre the level names in each band like ticks, and put the caption "Hank toward Connor" at the top left. **x** = chapter. Ticks show chapter numbers with Start and End, the caption is "Chapter", and the 100px tick spacing rule from `TrendChart` stays. Reserve about 235px on the right for labels. Keep the alternating band tint only if it stays fainter than the gridlines; Slopalytics has none. |
| Log / Linear toggle | **Does not apply** | The y axis is ordinal levels and x is chapter order. Put the per-chart controls in the same slot: **Labels** (or the Pareto analogue below) and nothing else. |
| Points per variant joined by a line, r 4.5 with a 13 hit radius, `--bg` stroke halo | **Apply** | Draw a point only where the gauge **changed** during the chapter, plus the last point; 33 points per run would clutter the plot. Join the chapter-end values with straight segments as now. Keep the ✕ (died) and bar (broke with Amanda) end glyphs. They are the analogue of the deprecated dashed style, and that dash stays unused. |
| Line widths 2.25 / 3.5, opacity 0.8 / 1, others 0.15 when isolated, labels 0.4 | **Apply** | This replaces today's 0.5 dimming. Keep the coincident-line dodge from `TrendChart`, because runs often share values. |
| Right-end label: vendor mark + coloured name, 24px minimum spacing, leader line at 0.22 opacity, cap by height | **Apply** | Anchor on the run's **last** value, where Slopalytics uses the best variant. Drop the numbered badges. The phone legend (§2.9) replaces narrow-width badges and the "At the end:" key. |
| Hover a label or sidebar row to isolate; click a label to toggle a persistent highlight; Escape clears | **Apply** | Today's `onHover` already reaches every chart. Add the persistent multi-highlight set, kept out of the URL as in Slopalytics. |
| Hover a point: guides + tooltip card at bottom right; click to pin; comparison table when pinned | **Adapt** | Tooltip:<br>• Header: vendor mark and run name in its colour, close ×.<br>• Sub-line: `Chapter 6 · Partners` plus ` · Pinned`.<br>• Rows: `Level` (Neutral), `Points` (0), `Change this chapter` (+2), and `Decision` (the choice text that moved it, from `choices`).<br>• Footer link: **Open report**, to `reportUrl`, in place of "Artificial Analysis".<br>Comparison table: **Selected / Hovered / Difference**, with the difference in levels and points (for example "+1 level, +3"). Multiplier does not apply. The horizontal guide labels the level name; the vertical guide labels the chapter title. |
| Pareto line | **Do not port as "best"** | The experience states no objective, and "higher" is not better on every gauge (Software instability, Amanda). If something is wanted in that slot, offer **Cohort range** (off by default): a faint band between the lowest and highest visible value per chapter, plus an optional dashed median (`6 5` dash, `--fg`). Do not bold or dim sidebar rows for it. |
| Animation | **Apply (none)** | Keep repaints instant. Today's `anim-pop` on `FinalStrip` dots is the only motion and should respect reduced motion. |
| "Models n" heading + reset icon | **Apply** | Show the count of selected runs only. Reset restores the default selection, clears search and highlights, and clears the chart options in the URL. |
| Search with `Find models`, `/` hint and shortcut, Escape clears, Results group, "No models match “q”." | **Apply** | Match against `displayName`, `model`, vendor name and label. |
| Reasoning row (struck-through when off, efforts of the selected models only) | **Apply once runs carry reasoning** | Because a run has one reasoning level, a level toggle hides **whole runs**, not points. Default: nothing excluded. Hide the row entirely while every run is "default". |
| Frontier / Notable / Other groups, Small / Medium / Large bulk toggles, Notable "All", Show all models + Open weights / Older | **Apply via the registry** | Size buttons are bulk select-all/none toggles, pressed when all of their runs are on. "Older" could hide runs from a superseded story version; today every published run is on one version, so leave it out until that happens. "Open weights" applies once an open model is run. |
| Colour dot: hollow ring at 0.5 when off, filled when on; vendor mark at 0.4 when off; name dims (no strike-through) | **Apply** | Drop today's number chip and strike-through to match. |
| Within-group order (vendor order, newest first, name) | **Apply** | Use the registry's vendor order and `released`, then run number. |
| URL persistence via the query, defaults omitted, no storage | **Apply** | Keys: `chart`, `models` (run ids or short run slugs), `hide-reasoning`, `labels`, `range`. |
| Context menu (show/hide/only/all-except this model or vendor, highlight) | **Optional** | Useful once there are more than about six runs. |
| Download PNG (2×, title band) | **Optional** | Our standalone HTML reports already cover sharing. |
| Theme toggle | **Already have** (`src/lib/theme.jsx`) | |
| Code only | **Does not apply** | A later analogue could be a **character** filter, but tabs already split by character. |
| Bar charts (cost and tokens) | **Does not apply now** | If runs later record tokens or cost, the same grouped-bar and dot-plot pattern fits a "Decisions per run" or "Tokens per run" section. |
| Footer "Data from Artificial Analysis" | **Adapt** | "Data from DetroitBench runs · story <version>", linking to the Runs page. |
| Phones (≤900px): sheet sidebar behind a "Models n" button with Done; legend grid under the chart; tap the nearest point; sticky tooltip | **Apply** | This replaces today's wrapping toggle strip, and the sheet holds the chart settings. Our breakpoint for the aside is `lg` (1024px); either align on 900px or keep `lg` and note the difference. |

### 6.5 Suggested order of work
1. Write `data/models.json` with its schema and join it in `prepare.mjs`, adding `modelInfo` and `reasoning` to `experiences.json`.
2. Rebuild `ModelToggles` as the Slopalytics sidebar: heading, search, reasoning row, tier groups, dots and URL state.
3. Restyle `TrendChart` with the gridlines, labels, isolation, point tooltip, pin and compare.
4. Move the gauge `Select` into section tabs with scroll spy.
5. Build the phone sheet and legend.
