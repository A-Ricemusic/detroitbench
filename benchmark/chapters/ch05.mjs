// Chapter 5, The Painter (Markus). Rebuilt to the game's chart (PowerPyx 100% screenshots) and the game's text
// (detroitbecometext template and en.json); research in docs/research/ch05-the-painter.md.
//
// The chapter moves no stat: its template has no arrow, the wiki lists no relationship, public-opinion or instability
// change, and Markus has no Carl relationship. Scene gates are data-driven (`when` in ch05.json); this module declares
// the chapter's state, the media conditions for the magazine left unread, and records the ending.
//
// Input from chapter 3 (Shades of Color): `clothesTorn` (built-in state, set by M00f) plays CARL NOTICES MARKUS'
// CLOTHES (M01d) and adds the torn shirt to the hall mirror in M01a.
//
// Outputs, set by the options' `sets` in ch05.json, for Night of the Soul (chapter 31, Carl alive).
// These are saved for its future rebuild; the current chapter 31 does not consume them.
//  painterActivity  'chess' | 'book' | 'piano'      FIND SOMETHING TO DO (M01f): gates LOOK AT THE CHESSBOARD,
//                                                  BROWSE BOOKS or PLAY PIANO there (rules.nightOfTheSoul).
//  painterPastime   'win' | 'lose' | 'draw' (M01g), 'plato' | 'shakespeare' | 'keats' (M01k),
//                   'melancholic' | 'hopeful' | 'intimate' | 'enigmatic' (M01l)
//  painterCopy      'painting' | 'desk' | 'statue'  PAINT SOMETHING YOU SEE (M01o)
//  painterTheme     'androids' | 'humanity' | 'identity'  PAINT FROM THE HEART (M01p)
//  painterFeeling   the sub-choice (M01q, M01r, M01s); with painterTheme it names Markus's painting (rules.paintings),
//                   which appears in the studio in Night of the Soul (LOOK AT YOUR PAINTING).
//  painterOutcome   'Leo intruded to ask for money', the chapter's only ending (M01t).
export const state={painterActivity:null,painterPastime:null,painterCopy:null,painterTheme:null,painterFeeling:null,painterOutcome:null};

export const labels={painterActivity:'Pastime with Carl',painterPastime:'Chess result, book or piano piece',painterCopy:'Copied subject',painterTheme:'Painting theme',painterFeeling:'Painting feeling',painterOutcome:'The Painter outcome'};

// Connor does not appear in this chapter; declared so that no default death effect could ever apply here.
export const deathEffect={};

// R05 offers the magazine before Carl wakes (items 0 Century, 1 Titan); R05b offers again whatever was left unread.
const read=(s,item)=>[String(item),'all'].includes(s.choices.R05);
export const mediaWhen={centuryUnread:s=>!read(s,0),titanUnread:s=>!read(s,1)};

// New snapshots explicitly enable waiting; older scene data keeps the three activities.
export function available(n,s,opts){
 if(n.id==='M01f'&&!n.waitRules)return opts.filter(o=>o.id!=='3');
}

export const OUTCOME='Leo intruded to ask for money';
export function consequence(n,s){
 if(n.id!=='M01t')return;
 s.painterOutcome=OUTCOME;return '';
}

export const rules={
 outcome:OUTCOME,
 // Night of the Soul (chapter 31), house branch: the observation each pastime unlocks (wiki, The Painter, cross-chapter impacts).
 nightOfTheSoul:{chess:'LOOK AT THE CHESSBOARD',book:'BROWSE BOOKS',piano:'PLAY PIANO'},
 // What Markus's painting shows, by theme and feeling (wiki transcript). Tokens render the names.
 paintings:{
  androids:{fate:'{{Markus}} on his knees',hope:'his hand, covered in what looks like oil',pain:'{{Markus}} decaying and in agony',sadness:'hands covered in blue blood'},
  humanity:{anger:'{{Markus}} enraged and screaming',comfort:'{{Carl}} with a brave and stoic expression',empathy:'two hands covered in blue blood and two hands covered in red blood',hope:'two hands grasping each other'},
  identity:{androids:'{{Markus}} covered in blue blood',despair:'{{Markus}} with his hand on his face',doubts:'{{Markus}} in ordinary clothes in front of a red wall',prisoner:'{{Markus}} with {{Carl}} behind him'}},
};
