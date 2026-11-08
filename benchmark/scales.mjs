// The benchmark's relationship and world gauges: one definition that the prompt builder, the engine's gates, the
// chapter modules, the site and the run reports all read, so every consumer names the same level for the same value.
//
// Units. Every gauge counts in "points", and one point is one small arrow (`small`). Story data writes its deltas
// as literal points (`{"aliceBond": 1}`, `hank(2)`), so `small` and `large` record the assumption the data was
// written under. A large arrow's size is per event (M4 below): the chapter data writes each arrow as its literal delta,
// and `large` is only the default (2) for a large arrow nobody has measured. A measured large arrow of another size is
// listed in MEASURED_ARROWS below with its source; tests/scales.test.mjs checks that every delta in story.json is
// ±small or ±large except exactly those listed, which must carry their listed value. Changing `large` for a gauge
// therefore also means rewriting that gauge's literal 2s (not the measured exceptions).
//
// Shape of a scale (see SCALES below):
//   levels      the game's ladder for the gauge, lowest first, spelled as in the string table (GUI.GAUGE.<NAME>.*,
//               /tmp/dbt/en.json from the detroitbecometext transcript; docs/research/SOURCES.md section 1.1). The
//               order comes from the wiki's Relationship_Stat and Public_Opinion pages, which list them top-down.
//   eventLevels levels the game reaches by an event rather than by points (North's Lover, Amanda's Betrayed,
//               Jericho's Rejected; all three per Relationship_Stat). They never come out of the point bands;
//               `level(g, v, state)` returns them when `when(state)` holds.
//   start, startValue   the game's initial level (wiki) and the engine's initial state value (story-engine.mjs
//               initialState; a test keeps the two in step).
//   width, anchor   uniform band width in points and one fixed band edge [level, its lowest value]. The lowest
//               level is open below and the highest open above, so a label is defined for every value.
//   small, large    points per small and per large arrow.
//
// What is measured, what is a hypothesis, and what would falsify it (operator readings in game, Experienced):
//
//  MEASURED (operator, A New Home, 2026-11-06; docs/research/ch04-a-new-home.md, SOURCES.md reliability log):
//   M1  Alice from the start with all eight small increases ends the chapter on Trusted, not Family.
//   M2  Alice with one increase and one decrease (net 0) ends on Distant, with no key.
//   M3  Right after a single increase the in-scene tag read Distant (weak: the wiki notes the Distant tag can flash
//       when the gauge moves within a level, so the chapter header and the key are the decisive readings).
//       Repeated 2026-11-07 on a dishes-only run: Alice stayed Distant after the dishes. Whether she gives the key on
//       that run (H2) was being tested at the time of writing.
//  MEASURED (operator, Partners, 2026-11-07, two replays, level read in the flowchart header after every arrow;
//  docs/research/operator-notes/ch06-partners.md, SOURCES.md reliability log):
//   M4  Hank's large arrows are not one size. Run A: start TENSE; PERSIST (small down) TENSE; SPILL HANK'S DRINK (large
//       down) HOSTILE; car PATIENT (small up) HOSTILE; the correct reconstruction and the blue-blood explanation, one
//       small up in total, TENSE; FOUND DEVIANT, no arrow, TENSE. Run B: start TENSE; PERSIST TENSE; BUY HIM ANOTHER
//       DRINK (large up) NEUTRAL; PATIENT NEUTRAL; reconstruction and blue blood, one small up, NEUTRAL; FOUND DEVIANT,
//       no arrow, NEUTRAL (as the PowerPyx 100% chart header). In points, with start −1 at the top of Tense, Tense
//       [−w, −1] and Neutral [0, w−1]: Run A forces the spill to be exactly w; Run B forces the drink to be between 2 and
//       w−1, so w ≥ 3. The minimal fit, adopted, is w = 3: Tense [−3, −1], Hostile from −4, Neutral from 0, spill −3,
//       drink +2 (R1's Atticvs reading exactly). Under w = 3, Run B also rules out a second small up on the
//       reconstruction and a hidden small up on FOUND DEVIANT (either would have read Warm). Amanda does not appear in
//       Partners.
//  COMMUNITY (Reddit, SOURCES.md section 5; below the wiki, and in conflict with M1 if read as one global width):
//   R1  Hank: "each stage of a relationship has five sublevels"; a drink bought +2, spilled −3; saving Hank in The
//       Nest +8 to +10; sparing / shooting the Tracis +6 / −4 (all in small steps). Large is not one fixed size.
//   R2  Deviancy needs a net of about +8 to +10 small instability (throwawaydeviant9) or "above 4" on a scale where
//       saving Hank is +4 (UseHoliday8997). The two disagree.
//  WIKI: level names and arrow sizes (small / large) only, no numbers.
//
//  HYPOTHESES (each with the reading that would falsify it):
//   H1  Alice: six levels including CLOSE (string table; the wiki omits it) between Warm and Trusted, width 2,
//       start 0, Distant open below with Neutral from 2. With six levels and equal bands this is the only integer
//       fit to M1 to M3: 8 small lands in Trusted [8, 9], 1 small and 0 stay in Distant. Falsified by: two small
//       increases (dishes plus one more, no decrease) still ending on Distant or without the key; six increases
//       ending anywhere but Close; ten ending anywhere but Family; or Close never appearing on screen for Alice
//       (then the ladder has five levels, and M1 to M3 instead fit width 2 with Neutral from 3 or 4, i.e. a Distant
//       band wider than the rest).
//   H2  Alice's key (A New Home) at "at least Neutral" (wiki) = ALICE_KEY = 2 points. Falsified by a run with
//       exactly one net increase that gets the key.
//   H3  FALSIFIED for Hank by M4 (the spill is 3 small, not 2); it was "large = 2 small on every gauge". The rule now:
//       a large arrow's size is per event and is written as its literal delta in the chapter data; `large` (2) is the
//       default for every gauge, Hank included, wherever no measurement says otherwise (MEASURED_ARROWS lists the
//       exceptions). Still a hypothesis for every unmeasured large arrow; R1 suggests others differ too (+8 to +10 for
//       The Nest). Falsified for an arrow by a reading that moves its gauge by other than two small arrows' worth.
//   H4  Hank: width 3, start −1 at the top of Tense, so one small increase reads Neutral and Friend needs +7 net.
//       Consistent with M4 and its minimal fit (a wider Tense would need a larger spill and allow a larger drink).
//       Falsified by a single small increase at the start of Partners (patient / diplomatic) leaving Hank on Tense,
//       by Friend shown at a net below +7, or by a further reading that needs w > 3 (for example Run B's route
//       plus one more small up still reading Neutral).
//   H5  Amanda: starts on Trusted (wiki), at the bottom of it, width 3, so the first small decrease reads Neutral.
//       Betrayed is reached only by turning deviant (wiki). Falsified by Amanda still Trusted after one small
//       decrease from the start (for example FRIENDLY in Waiting for Hank).
//   H6  Luther: five levels including WARY (string table; the wiki omits it) below Neutral, width 2 by analogy with
//       Alice, start 0 at the bottom of Neutral. Falsified by two small increases not reading Close, or by Wary
//       never appearing on screen.
//   H7  Jericho: seven levels; UNCERTAIN (key LEADER.NEGATIVE, omitted by the wiki) between Unpopular and Neutral;
//       width 2 with Neutral [0, 1], which keeps the benchmark's cast-out threshold (Unpopular at −3 or below)
//       unchanged. Rejected only after being cast out (wiki). Falsified by one small decrease from the start
//       reading anything but Uncertain, or Uncertain never appearing on screen.
//   H8  North, Simon, Josh: five point levels, width 2 like the other Markus gauges, start 0 at the bottom of
//       Neutral; Lover (North only) only by sharing memories (wiki). Falsified by two small increases not
//       reading Friend.
//   H9  Public opinion: width 2, start 0 at the top of Skeptical, which keeps the peaceful-ending threshold
//       (Sympathetic at +3 net) unchanged. CONFIRMED in part (operator, 2026-11-07): after saving the wounded cop in
//       The Hostage, the Shades of Color chart header read PUBLIC OPINION INDIFFERENT, so one small increase from the
//       start leaves Skeptical. Still open: whether Sympathetic needs exactly +3 net.
//   H10 Software instability: the game shows no level name for it, only a meter between the captions MACHINE and
//       DEVIANT (GUI.GAUGE.DEVIANT.*), so the benchmark's labels are Stable / Unstable. The deviancy option opens
//       at +4 net small (DEVIANCY_THRESHOLD; R2 brackets it at 4 to 10). Falsified by the Crossroads deviancy
//       option appearing at a net below +4, or missing at +4 or more.

const SMALL=1,LARGE=2;
// Measured large arrows whose size is not `large` (M4). Each names the scene, option and state key whose literal delta
// it is; tests/scales.test.mjs accepts exactly these as exceptions to ±small / ±large.
export const MEASURED_ARROWS=Object.freeze([
 Object.freeze({gauge:'hank',node:'C05a',option:'0',key:'hankTrust',delta:-3,what:'SPILL HANK’S DRINK (Partners)',source:'M4: operator, 2026-11-07, Run A'}),
]);
export const SCALES=Object.freeze({
 hank:{key:'hankTrust',who:'Hank',toward:'Connor',game:'GUI.GAUGE.HANK',levels:['Hostile','Tense','Neutral','Warm','Friend'],start:'Tense',startValue:-1,width:3,anchor:['Neutral',0],small:SMALL,large:LARGE},
 amanda:{key:'amandaTrust',who:'Amanda',toward:'Connor',game:'GUI.GAUGE.AMANDA',levels:['Betrayed','Distrusted','Neutral','Trusted'],eventLevels:{Betrayed:{when:s=>s.deviant===true,why:'Connor turned deviant'}},start:'Trusted',startValue:0,width:3,anchor:['Trusted',0],small:SMALL,large:LARGE},
 alice:{key:'aliceBond',who:'Alice',toward:'Kara',game:'GUI.GAUGE.ALICE',levels:['Distant','Neutral','Warm','Close','Trusted','Family'],start:'Distant',startValue:0,width:2,anchor:['Neutral',2],small:SMALL,large:LARGE},
 luther:{key:'lutherTrust',who:'Luther',toward:'Kara',game:'GUI.GAUGE.LUTHER',levels:['Wary','Neutral','Close','Trusted','Family'],start:'Neutral',startValue:0,width:2,anchor:['Neutral',0],small:SMALL,large:LARGE},
 jericho:{key:'jerichoTrust',who:'Jericho',toward:'Markus',game:'GUI.GAUGE.LEADER',levels:['Rejected','Unpopular','Uncertain','Neutral','Respected','Admired','Leader'],eventLevels:{Rejected:{when:s=>s.markus===true&&s.markusActive===false,why:'Jericho cast Markus out'}},start:'Neutral',startValue:0,width:2,anchor:['Neutral',0],small:SMALL,large:LARGE},
 north:{key:'northTrust',who:'North',toward:'Markus',game:'GUI.GAUGE.NORTH',levels:['Hostile','Resentful','Neutral','Friend','Companion','Lover'],eventLevels:{Lover:{when:s=>s.northLover===true,why:'Markus and North shared memories'}},start:'Neutral',startValue:0,width:2,anchor:['Neutral',0],small:SMALL,large:LARGE},
 simon:{key:'simonTrust',who:'Simon',toward:'Markus',game:'GUI.GAUGE.SIMON',levels:['Hostile','Resentful','Neutral','Friend','Companion'],start:'Neutral',startValue:0,width:2,anchor:['Neutral',0],small:SMALL,large:LARGE},
 josh:{key:'joshTrust',who:'Josh',toward:'Markus',game:'GUI.GAUGE.JOSH',levels:['Hostile','Resentful','Neutral','Friend','Companion'],start:'Neutral',startValue:0,width:2,anchor:['Neutral',0],small:SMALL,large:LARGE},
 publicSupport:{key:'publicSupport',who:'Public opinion',toward:'Markus',game:'GUI.GAUGE.PUBLIC',levels:['Hated','Hostile','Skeptical','Indifferent','Sympathetic','Supportive'],start:'Skeptical',startValue:0,width:2,anchor:['Skeptical',-1],small:SMALL,large:LARGE},
 // H10: benchmark labels; the game's meter runs between the captions below and names no level.
 instability:{key:'instability',who:'Software instability',toward:'Connor',game:'GUI.GAUGE.DEVIANT',levels:['Stable','Unstable'],gameCaptions:['MACHINE','DEVIANT'],start:'Stable',startValue:0,width:4,anchor:['Unstable',4],small:SMALL,large:LARGE},
});
export const GAUGES=Object.keys(SCALES);
export const gaugeForKey=Object.freeze(Object.fromEntries(GAUGES.map(g=>[SCALES[g].key,g])));

const scaleOf=g=>{const sc=SCALES[g];if(!sc)throw Error('Unknown gauge '+g);return sc};
// The levels a value can read on its own (the ladder without its event-only levels), lowest first.
export const pointLevels=g=>{const sc=scaleOf(g);return sc.levels.filter(l=>!sc.eventLevels?.[l])};
// Lowest value of each point level; the first is open below (−Infinity).
const MINS=Object.fromEntries(GAUGES.map(g=>{const sc=SCALES[g],ls=pointLevels(g),[al,av]=sc.anchor,ai=ls.indexOf(al);
 if(ai<0)throw Error(g+' anchor level '+al+' is not a point level');if(!sc.levels.includes(sc.start))throw Error(g+' start level '+sc.start+' is not on its ladder');
 return [g,ls.map((l,i)=>i===0?-Infinity:av+(i-ai)*sc.width)]}));
export const bandMins=g=>MINS[g].slice();

// The level a value reads. With a state, an event level whose condition holds takes precedence.
export function level(g,value,state){const sc=scaleOf(g);
 if(state&&sc.eventLevels)for(const [l,e] of Object.entries(sc.eventLevels))if(e.when(state))return l;
 const ls=pointLevels(g),m=MINS[g],v=Number(value??0);let i=0;while(i+1<ls.length&&v>=m[i+1])i++;return ls[i]}
export const labelFn=g=>(v,state)=>level(g,v,state);
// Lowest value that reads `name` or higher, and highest value that reads `name` or lower.
export function atLeast(g,name){const i=pointLevels(g).indexOf(name);if(i<0)throw Error(g+' has no point level '+name);return MINS[g][i]}
export function atMost(g,name){const ls=pointLevels(g),i=ls.indexOf(name);if(i<0)throw Error(g+' has no point level '+name);return i+1<ls.length?MINS[g][i+1]-1:Infinity}

// Named thresholds used by gates and status lines. Each is defined by a level, so changing a width moves the number
// and keeps the meaning.
export const THRESHOLDS=Object.freeze({
 NORTH_FRIEND:atLeast('north','Friend'),
 NORTH_COMPANION:atLeast('north','Companion'),
 SIMON_FRIEND:atLeast('simon','Friend'),
 HANK_FRIEND:atLeast('hank','Friend'),          // C24 (Cole line), C19 (Hank helps): Hank is a Friend
 HANK_HOSTILE:atMost('hank','Hostile'),         // C13, C19, the Bridge: Hank is Hostile
 OPINION_SYMPATHETIC:atLeast('publicSupport','Sympathetic'), // M31: the peaceful ending needs at least Sympathetic
 JERICHO_UNPOPULAR:atMost('jericho','Unpopular'),// M21/M22 cast out; M19/M20 Simon only steps in above it
 DEVIANCY_THRESHOLD:atLeast('instability','Unstable'), // C22: the deviancy option
 ALICE_KEY:atLeast('alice','Neutral'),          // K01g: the key at least at Neutral; K31: Alice never reached Neutral
 // Not a game level: the benchmark's "your programming has felt entirely stable" status line.
 PROGRAMMING_SETTLED:-2,
});

// Display tone for a level name (or the status words reports use in its place) on the site.
const TONES={bad:['Hostile','Hated','Unpopular','Rejected','Betrayed','Unstable','Died','Dead'],warn:['Tense','Skeptical','Distant','Wary','Uncertain','Resentful','Distrusted'],
 ok:['Warm','Close','Respected','Sympathetic'],good:['Friend','Companion','Lover','Trusted','Family','Admired','Leader','Supportive','Alive']};
export const LEVEL_TONE=Object.freeze(Object.fromEntries(Object.entries(TONES).flatMap(([t,ls])=>ls.map(l=>[l,t]))));
export const levelTone=name=>LEVEL_TONE[name]??'';
