// The Pirates' Cove (chapter 21, Kara). Scenes in ch21.json; research in docs/research/ch21-the-pirates-cove.md.
//
// One line, three free-roam hubs and one ending, THE GROUP ENJOYED A QUIET MOMENT TOGETHER. Nothing can kill anyone and
// nothing carries a risk. Each hub (the car, the fun fair, the tavern, plus the bag and the talk with Luther) is a chain of
// identical decision scenes sharing one hub state (`clueState`): each copy offers what has not been done yet, and the
// copies after the exit option are skipped by their `when`. Every stat arrow is data-driven in ch21.json (`effect`), so
// it shows in the checklist and the atlas:
//
//  - Public opinion −1: the fourth car-TV report, the house fire, offered only if Kara set Zlatko's house on fire (K14b,
//    option 1; the template's only arrow in the chapter). The wiki's extra −1 for turning the news on is not built: the
//    template has no arrow there and wins for arrows (research note §10.3).
//  - Alice +1: making the bed (K14g, option 4); after any answer to the poster question (K14i); KISS (K14k, option 2).
//    The wiki's +1 after the story ending is not built (no template arrow, §10.3). Maximum +3, no decrease.
//  - Luther +1: any answer to "have you ever noticed anything about Alice?" (K14n).
//
// Gates (data-driven `requires`): the fire report needs the news on and the built-in `fire`; the [rA9] topic needs the rA9
// writing seen (`ch21Tavern.ra9`); rA9 DOUBTS needs rA9 asked (`ch21Talk.ra9`); GRAB GUN needs SEE GUN (`ch21SawGun`);
// SHOOT IN THE AIR needs GRAB GUN (`ch21Reaction` 'gun'). THREATEN is on the chart but not selectable in the game.
//
// Cross-chapter input: the built-in `fire` (set by the Zlatko chapter when Kara burned the house), read as is. Luther's
// presence (`luther`, `lutherWith`) is not read: the game reaches this chapter only through LUTHER JOINS KARA & ALICE, and
// the built-in character gate already skips it when Kara's route has ended.
// Cross-chapter output: `aliceBond`/`aliceMax`, `lutherTrust` and `publicSupport` (built-in); `ch21SawGun` (Kara saw the gun
// in her bag), `ch21Reaction` (her first reaction to the shadows: 'gun', 'stick', 'protect' or 'fire'), `ch21MetJerrys`
// (the group has met the Jerrys; the built-in `jerry`, the Jerry who travels with Kara in Battle for Detroit, is left
// alone) and `ch21Ending` (the chart's ending label). The hub states `ch21Car`, `ch21Fair`, `ch21Tavern`, `ch21Bag` and
// `ch21Talk` record what Kara did in each hub (`last` is the latest action).

export const ENDING='The group enjoyed a quiet moment together';
export const REACTIONS={'0':'gun','1':'stick','2':'protect','3':'fire'};

export const state={ch21Car:{},ch21Fair:{},ch21Tavern:{},ch21Bag:{},ch21Talk:{},ch21SawGun:false,ch21Reaction:null,ch21MetJerrys:false,ch21Ending:null};
export const labels={ch21SawGun:'Kara saw the gun in her bag',ch21Reaction:'Kara’s first reaction to the shadows',ch21MetJerrys:'Met the Jerrys at the amusement park',ch21Ending:'The Pirates’ Cove ending'};
export const deathEffect={};   // Connor does not appear in this chapter
// The chapter's stat arrows, for the recap and the tests: scene → option → {stat: delta}.
export const rules={ENDING,REACTIONS,arrows:{
 K14b:{'1':{publicSupport:-1}},
 K14g:{'4':{aliceBond:1}},
 K14i:{'0':{aliceBond:1},'1':{aliceBond:1},'2':{aliceBond:1}},
 K14k:{'2':{aliceBond:1}},
 K14n:{'0':{lutherTrust:1},'1':{lutherTrust:1},'2':{lutherTrust:1}},
}};

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'K14h':s.ch21Tavern={...s.ch21Tavern,fire:true};return '';   // LUTHER STARTS A FIRE
  case 'K14q':s.ch21MetJerrys=true;return '';                        // ATTACKERS REVEAL THEMSELVES AS JERRYS, BACK OUTSIDE
  case 'K14z':s.ch21Ending=ENDING;return '';                         // THE GROUP ENJOYED A QUIET MOMENT TOGETHER
 }
}
