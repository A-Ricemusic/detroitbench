// Time to Decide (chapter 16, Markus). Scenes in ch16.json; research in docs/research/ch16-time-to-decide.md.
//
// The chart has one ending and no choice pair, risk or death branch. Scenes, in order:
//  - MTD1 (event): the checkpoint INSIDE JERICHO and the introductions.
//  - MTD2, MTD3 (decisions): the template's two arrival prompts (TRAIL / ANDROID / JERICHO / REFUGE / FREE? and
//    LOST / SOMBER / LUCID / DIRECT). Lines only; no arrow.
//  - MTD4 (repeatable hub, clueState `ch16Hold`): the [ EXPLORE JERICHO ] bracket (dying android, Josh, North,
//    damaged android, LET THERE BE LIGHT), the two required forks (TALK TO LUCY, CHECK EMPTY CRATE) and TALK TO
//    SIMON, which needs both and ends the hub. Talking to North cuts in MTD5, then returns to the hub.
//  - MTD5 (decision): North's five topics (TIME HERE? / WOUNDED / JERICHO / YOU / SPARE PARTS), one per talk.
//  - MTD6 (event): the raid proposal and the ending MARKUS HATCHED A PLAN, recorded in `ch16Outcome`.
//
// Arrows (template, each small = 1), all data-driven `effect`s in ch16.json (listed in rules.ARROWS):
//  - MTD4 option 1, TALK TO JOSH: joshTrust +1 ({REL Josh SmallUp}).
//  - MTD4 option 2, TALK TO NORTH: northTrust +1 ({REL North SmallUp}).
//  - MTD5 option 3, YOU: northTrust −1 ({REL North SmallDown}).
//  - MTD6, the Simon scene: northTrust +1 and simonTrust +1 ({REL North SmallUp}, {REL Simon SmallUp}), and from story 1.9.8
//    jerichoTrust +1 (the wiki's "Talking to Simon"; the template does not list it, the game's readout shows it: video frame,
//    y50ZjZWX0gU 11:45). The arrows are scene data, so older snapshots replay with two.
//
// Cross-chapter input: none (nothing earlier changes what the chapter offers).
// Cross-chapter output: the built-in northTrust, simonTrust and joshTrust (first moved here); `ch16Outcome`; and
// `ch16Hold`, what Markus did in the hold (keys dying, josh, north, damaged, light, lucy, crate, simon; `last` is
// the latest), which a later chapter can read. Whether he asked North about her past is choices.MTD5 === rules.YOU.
//
// The hub declares repeatWhile so generic path tests can identify it as repeatable. Older shared
// tests with a hard-coded repeatable-scene list also need MTD4; that shared file is outside this chapter.

export const ENDING='Markus hatched a plan';
export const HUB='MTD4',NORTH='MTD5',YOU='3';

export const state={ch16Hold:{},ch16Outcome:null};
export const labels={ch16Outcome:'Time to Decide ending'};
export const rules={ENDING,HUB,NORTH,YOU,
 ARROWS:[
  {scene:'MTD4',option:'1',key:'joshTrust',delta:1,source:'template {REL Josh SmallUp}; wiki “Talking to him”'},
  {scene:'MTD4',option:'2',key:'northTrust',delta:1,source:'template {REL North SmallUp}; wiki “Talking to her”'},
  {scene:'MTD5',option:'3',key:'northTrust',delta:-1,source:'template {REL North SmallDown}; wiki “Picking “you” while talking to her”'},
  {scene:'MTD6',option:'0',key:'northTrust',delta:1,source:'template {REL North SmallUp}; wiki “Talking to Simon”'},
  {scene:'MTD6',option:'0',key:'simonTrust',delta:1,source:'template {REL Simon SmallUp}; wiki “Talking to him”'},
  {scene:'MTD6',option:'0',key:'jerichoTrust',delta:1,source:'wiki “Talking to Simon”; video frame, y50ZjZWX0gU 11:45 (story 1.9.8)'},
 ]};

export function consequence(n,s){
 if(n.id==='MTD6'){s.ch16Outcome=ENDING;return ''}   // '' = the event's outcome text
}
