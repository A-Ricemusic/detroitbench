// Chapter 14, Jericho (Markus). Research: docs/research/ch14-jericho.md; contract: benchmark/chapters/README.md.
//
// The chapter is linear: its template has no prompt, no clue and no stat arrow, and the wiki gives no probability,
// relationship, public-opinion or instability change. Its 29 chart nodes are narrated event scenes (MJ14a, b, d, f,
// g, i, k, m, n, o), the bench magazine (R14) and five two-way decisions for the chart's optional side branches
// (MJ14c ask the android, MJ14e/h/j the three android bodies, MJ14l the bridge). Each side branch is a dead end
// that rejoins the main line, so either option leads to the same next scene. Nothing here changes a stat.
//
// Cross-chapter inputs:
//  - `chase` (On the Run, chapter 13): whether Connor pursued Kara and Alice. Picks the magazine cover: Android on the
//    Run! when pursued, CyberLife's 'Fortune Teller' Computer otherwise (wiki, Jericho flowchart). Read defensively: a
//    missing or non-true value counts as not pursued. If the chapter 13 rebuild moves the pursuit to its own key,
//    change `pursued` below.
//  - `carl` (Broken, chapter 8): which version of the passers-by's conversation about Carl plays (template condition
//    group "Carl died in Broken" / "Carl is alive"); MJ14c's situationWhen and the fact learned below.
// Cross-chapter outputs:
//  - `ch14Ending`: 'Met People of Jericho' (the chart's one ending) once MJ14o has played; null before.
//  - `ch14BodiesSeen`: how many of the trail's three dead androids Markus looked at (0 to 3). Nothing reads it yet.

export const ENDING='Met People of Jericho';
// The option that looks at a body, per scene (chart: SEE ANDROID BODY ×3).
const BODIES={MJ14e:'0',MJ14h:'0',MJ14j:'0'};
// Template, "Two people talking on the street", both variants.
const CARL_DEAD='At a bus stop you overheard two people talking about {{Carl}}: the man had read somewhere that his android killed him, and the woman told him not to believe everything he reads.';
const CARL_ALIVE='At a bus stop you overheard two people talking about {{Carl}}: the woman hoped he makes it, the man had read somewhere that his android attacked him, and she told him not to believe everything he reads.';

const pursued=s=>s.chase===true;

export const state={ch14Ending:null,ch14BodiesSeen:0};
export const labels={ch14Ending:'Jericho chapter ending',ch14BodiesSeen:'Android bodies Markus looked at on the trail'};
export const rules={ending:ENDING,bodies:BODIES,pursued,carlLines:{dead:CARL_DEAD,alive:CARL_ALIVE}};
export const mediaWhen={ch14Pursued:s=>pursued(s),ch14NotPursued:s=>!pursued(s)};

export function consequence(n,s,opt,choice,fail,h){
 if(n.id==='MJ14c'){h.learn(s.carl?CARL_ALIVE:CARL_DEAD);return}
 if(BODIES[n.id]!==undefined){if(BODIES[n.id]===choice)h.bump('ch14BodiesSeen',1);return}
 if(n.id==='MJ14o'){s.ch14Ending=ENDING;return}
}
