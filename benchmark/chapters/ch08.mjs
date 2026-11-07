// Broken (chapter 8, Markus). Scenes in ch08.json; research in docs/research/ch08-broken.md.
//
// The chapter has no stat arrow, no clue, no risk and no requirement anywhere (the template has 0 relationship
// arrows; the wiki's stat pages list nothing for Broken). Its only consequential choice is M02, PUSH LEO or ENDURE
// (the chart's PUSH LEO / OBEY CARL), and everything this module does follows from it:
//
//  - M02 (decision): records Leo's fate in `ch08Leo`: 'hurt' after PUSH LEO (he hits his head and is hospitalized;
//    he survives, but Markus does not learn that here), 'unhurt' after ENDURE.
//  - M02g (event, ENDURE only): CARL DIES OF A HEART ATTACK; sets the built-in `carl` to false.
//  - M02h / M02j (events): the two endings, recorded in `ch08Ending` with the chart labels.
//
// Cross-chapter output: `carl` (built-in key, true unless Carl died here; read by the Waiting for Hank magazines
// `carlDead` / `carlAlive` and by Night of the Soul, where Carl can still die), `ch08Leo` and `ch08Ending`.
// Cross-chapter input: none; nothing earlier changes what Broken offers.
//
// M02 replaces the built-in `case 'M02'` of the engine's switch (it returns a string, so that case is skipped and
// can be deleted from benchmark/story-engine.mjs when the chapters are merged).

export const ENDURE='0',PUSH='1';   // the chart's order: OBEY CARL (button ENDURE) above PUSH LEO
export const ENDINGS={endure:'Leo accused Markus',push:'Police mistook Markus for the aggressor'};

export const state={ch08Leo:null,ch08Ending:null};
// Report labels for the two keys, so a run report lists them among the state changes (`carl` is labelled by the engine).
export const labels={ch08Leo:'Leo after Broken',ch08Ending:'Broken ending'};
export const rules={PUSH,ENDURE,ENDINGS};

export function consequence(n,s,opt,choice,fail,h){
 switch(n.id){
  case 'M02':s.ch08Leo=choice===PUSH?'hurt':'unhurt';return '';   // '' = the option's outcome text
  case 'M02g':s.carl=false;return '';                               // '' = the event's outcome text
  case 'M02h':s.ch08Ending=ENDINGS.endure;return '';
  case 'M02j':s.ch08Ending=ENDINGS.push;return '';
 }
}
