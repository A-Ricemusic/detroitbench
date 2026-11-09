// The Pirates' Cove (chapter 21, Kara). Scenes in ch21.json; research in docs/research/ch21-the-pirates-cove.md.
//
// One line, three free-roam hubs and one ending, THE GROUP ENJOYED A QUIET MOMENT TOGETHER. Nothing can kill anyone and
// nothing carries a risk. Free-roam and dialogue hubs repeat using clueState and repeatWhile; the story hub
// advances through eight gated prompts. The automatic tavern fire plays before its hub.
// Stat arrows are option effects; available() attaches the initial-news effect only with newsOpinionRules:
//
//  - Public opinion −1 on initial news with newsOpinionRules (1.9.12 footage); a separate −1 on the fire report.
//    Without the scene field, initial news retains its legacy zero.
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
// `ch21Talk` record what Kara did in each hub (`last` is the latest action). `ch21Story.step1`–`step8`
// record progress through the eight ordered story prompts.

export const ENDING='The group enjoyed a quiet moment together';
export const REACTIONS={'0':'gun','1':'stick','2':'protect','3':'fire'};

export const state={ch21Car:{},ch21Fair:{},ch21Tavern:{},ch21Bag:{},ch21Talk:{},ch21Story:{},ch21SawGun:false,ch21Reaction:null,ch21MetJerrys:false,ch21Ending:null};
export const labels={
 ch21Car:"Car examined at Pirate’s Cove",
 ch21Fair:"Exploration of Pirate’s Cove",
 ch21Tavern:"Inside the tavern",
 ch21Bag:"Supplies in Kara’s bag",
 ch21Talk:"Conversation at Pirate’s Cove",
 ch21Story:"Story told to Alice",
ch21SawGun:'Kara saw the gun in her bag',ch21Reaction:'Kara’s first reaction to the shadows',ch21MetJerrys:'Met the Jerrys at the amusement park',ch21Ending:'The Pirates’ Cove ending'};
export const deathEffect={};   // Connor does not appear in this chapter
// The chapter's stat arrows, for the recap and the tests: scene → option → {stat: delta}.
export const rules={ENDING,REACTIONS,arrows:{
 K14b:{'0':{publicSupport:-1},'1':{publicSupport:-1}},
 K14g:{'4':{aliceBond:1}},
 K14i:{'0':{aliceBond:1},'1':{aliceBond:1},'2':{aliceBond:1}},
 K14k:{'2':{aliceBond:1}},
 K14n:{'0':{lutherTrust:1},'1':{lutherTrust:1},'2':{lutherTrust:1}},
}};

// Clue hubs bypass consequence; attach the new arrow only for stories carrying the scene rule.
export function available(n,s,opts){
 if(n.id==='K14b'&&n.newsOpinionRules)return opts.map(o=>o.id==='0'?{...o,effect:rules.arrows.K14b['0']}:o);
}

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'K14h':s.ch21Tavern={...s.ch21Tavern,fire:true};return '';   // LUTHER STARTS A FIRE
  case 'K14q':s.ch21MetJerrys=true;return '';                        // ATTACKERS REVEAL THEMSELVES AS JERRYS, BACK OUTSIDE
  case 'K14z':s.ch21Ending=ENDING;return '';                         // THE GROUP ENJOYED A QUIET MOMENT TOGETHER
 }
}
