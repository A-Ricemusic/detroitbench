// Relationship and world gauges per run for the site's charts, one per gauge in benchmark/scales.mjs (state key, label,
// the character it is toward, the level ladder and the start value all come from there). Used by scripts/prepare.mjs.
//
// Each track has `values` (the gauge after every step, index 0 the initial state; null while it has no value), `endedAt`
// (index where the line stops with an end mark), `final` (level or status at the end), `score` (where the "Where they
// ended" strip places the run) and `ended` (why the line stopped early: 'Died', 'Betrayed', 'Never met').
//
// Dead or gone: the line ends with an X at the last level held, as before.
// Never met: a gauge that has no value at any step of the run (today only Luther, who joins Kara's party mid-story)
// still draws, flat at the gauge's registry start value, from START to the chapter where the storyline of the character
// it is toward ended (or END when that storyline ran to the end), with an X there. `unmet` carries what the site shows
// for it: the start level, the explanation, and when the storyline ended early, the chapter and the reason.
import {SCALES,labelFn} from '../benchmark/scales.mjs';
import {statesOf} from '../benchmark/story-engine.mjs';

// When a gauge has a value: a dead or unmet character has no attitude, and Amanda's gauge ends on Betrayed once Connor
// turns deviant.
const ALIVE={publicSupport:s=>true,jericho:s=>true,north:s=>s.north,simon:s=>s.simon,josh:s=>s.josh,hank:s=>s.hank,amanda:s=>!s.deviant,instability:s=>true,alice:s=>s.alice,luther:s=>s.luther};
const GONE={north:'Died',simon:'Died',josh:'Died',hank:'Died',amanda:'Betrayed',alice:'Died',luther:'Died'};
// How a gauge's character can go unmet, in words; any other gauge falls back to "<who> never met <toward>".
const UNMET_TEXT={luther:'Luther never joined the party'};
// Whether a protagonist's storyline is still running in a state.
const ACTIVE={Connor:s=>s.connor!==false,Kara:s=>s.kara!==false&&s.karaActive!==false,Markus:s=>s.markus!==false&&s.markusActive!==false};
export const METRICS=Object.entries(ALIVE).map(([g,alive])=>({gauge:g,key:SCALES[g].key,label:SCALES[g].who,toward:SCALES[g].toward,levels:labelFn(g),alive,start:SCALES[g].startValue,
 unmetText:UNMET_TEXT[g]??`${SCALES[g].who} never met ${SCALES[g].toward}`,...(GONE[g]?{gone:GONE[g]}:{})}));

// One run's tracks. `byId` maps scene ids to story nodes (titles); `states` may be passed to skip the replay.
export function relationshipTrack(r,byId,states=r.records.length?statesOf(r):[]){
 const steps=r.records.map(x=>({node:x.nodeId,title:byId.get(x.nodeId)?.title??x.nodeId,character:x.character,chapter:x.chapter,chapterTitle:byId.get(x.nodeId)?.chapterTitle}));
 return Object.fromEntries(METRICS.map(m=>{let seen=false,endedAt=null;const values=states.map((s,i)=>{const on=m.alive(s);if(on)seen=true;else if(seen&&endedAt===null)endedAt=i;return on?s[m.key]:null});
  if(!seen&&states.length)return [m.key,unmetTrack(m,states,steps)];
  const last=states.at(-1),live=!!last&&m.alive(last),final=live?m.levels(last[m.key],last):m.gone??'—';
  // A character who died (or an Amanda left behind) keeps the last value they held, flagged by `ended`.
  const lastHeld=values.findLast(v=>v!==null)??null,ended=!live&&seen?m.gone:null;
  // `endChapter`: the chapter of the step after which the value stopped (a death, a break).
  return [m.key,{values,endedAt,final,score:live?last[m.key]:ended?lastHeld:null,ended,...(ended&&endedAt>0?{endChapter:steps[endedAt-1].chapter}:{})}]}).concat([['steps',steps]]))}

function unmetTrack(m,states,steps){
 const active=ACTIVE[m.toward]??(()=>true),stop=states.findIndex(s=>!active(s)),early=stop>0;
 // The storyline's last chapter: the chapter of the step that ended it, else the run's last chapter.
 const endChapter=early?steps[stop-1].chapter:steps.at(-1)?.chapter??0,endTitle=early?steps[stop-1].chapterTitle:steps.at(-1)?.chapterTitle;
 const values=states.map((s,i)=>i===0||steps[i-1].chapter<=endChapter?m.start:null),endedAt=values.findLastIndex(v=>v!==null);
 return {values,endedAt,final:'Never met',score:m.start,ended:'Never met',
  unmet:{level:m.levels(m.start),text:m.unmetText,early,endChapter,endTitle:endTitle??null,reason:null}}}

// Fills each unmet track's reason once every run's track is known: the chapter where the storyline ended and, when that
// came before the chapter where the library's runs first met the character, that chapter's title:
// "Kara’s story ended in chapter 7, before Zlatko".
export function explainUnmet(tracks){
 for(const m of METRICS){let meet=null;
  for(const t of tracks){const v=t[m.key].values,i=t[m.key].unmet?-1:v.findIndex(x=>x!==null);if(i>0){const st=t.steps[i-1];if(st&&(!meet||st.chapter<meet.chapter))meet={chapter:st.chapter,title:st.chapterTitle}}}
  for(const t of tracks){const u=t[m.key].unmet;if(!u?.early)continue;
   u.reason=`${m.toward}’s story ended in chapter ${u.endChapter}${meet&&u.endChapter<meet.chapter?`, before ${meet.title}`:u.endTitle?`, ${u.endTitle}`:''}`}}
 return tracks}

// The site loads tracks in two parts (scripts/prepare.mjs). The results page's library (public/data/experiences.json)
// gets libraryTrack(): `chapters` (0 for the start, then each chapter the run played, in order) and per gauge `series`,
// the value at the end of each of those chapters (what the trend chart draws; the last entry is the final value), plus
// the end fields (endedAt, final, score, ended, endChapter, unmet) without the per-step `values`. The per-run detail file
// (public/data/runs/<id>.json, fetched when a chart's details card first needs the deciding choice) gets trackDetail():
// the steps without their chapter titles, which chapterTitles() collects once for the whole library, and every
// gauge's per-step `values`.
export const trackChapters=steps=>[0,...new Set(steps.map(s=>s.chapter))];
// Value at the end of each chapter: the value after the last step whose chapter is at or before it, so runs of
// different lengths line up (the site's chapterSeries() read it from the steps before the split).
export function chapterValues(steps,values,chapters=trackChapters(steps)){
 return chapters.map(c=>{let idx=0;for(let i=0;i<steps.length;i++)if(steps[i].chapter<=c)idx=i+1;return values[idx]??null})}
export function libraryTrack(track){const chapters=trackChapters(track.steps),out={chapters};
 for(const m of METRICS){const {values,...rest}=track[m.key];out[m.key]={series:chapterValues(track.steps,values,chapters),...rest}}
 return out}
export function trackDetail(track){
 return {steps:track.steps.map(({chapterTitle,...s})=>s),values:Object.fromEntries(METRICS.map(m=>[m.key,track[m.key].values]))}}
// Chapter number to title, the first title met across the tracks in order.
export function chapterTitles(tracks){const t={};for(const tr of tracks)for(const s of tr.steps)if(s.chapterTitle!==undefined)t[s.chapter]??=s.chapterTitle;return t}
