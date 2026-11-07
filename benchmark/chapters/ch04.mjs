// Chapter 4, A New Home (Kara). Scenes in ch04.json; research in docs/research/ch04-a-new-home.md.
//
// The only logic here is the end of the talk in Alice's room. The talk has four menus (wiki transcript: FACTUAL /
// FRIENDLY / DIPLOMATIC, then four lines, then "(Same Options But Down To Three)", then "(Same Again But Two And A New
// Option)" with LEAVE ALONE): K01e, K01f, K01g and K01g2. After the last menu Alice leaves and gives Kara the key if she is
// at least Neutral (ALICE_KEY, benchmark/scales.mjs; wiki "if Alice has at least Neutral status").
//
// The menu that ends the talk is the one whose `outcomes` carry `key` and `distant` (K01g2 from story 1.9.2; K01g in older
// story snapshots, which had three menus), so published runs replay as they were played. This replaces the engine's
// built-in `case 'K01g'` (consequence returns a string, so that case no longer runs).
//
// Output: `aliceKey` (built-in): read by K01k / K01x (the box), Stormy Night and Zlatko.
export const rules={MENUS:['K01e','K01f','K01g','K01g2']};

export function consequence(n,s,opt,choice,fail,h){
 if(!rules.MENUS.includes(n.id))return;
 if(!n.outcomes?.key)return '';                              // a menu that does not end the talk: the option's outcome
 s.aliceKey=s.aliceBond>=h.constants.ALICE_KEY;
 return (opt?.outcome??'')+' '+n.outcomes[s.aliceKey?'key':'distant'];
}
