# Endings and playthroughs: Opus count (story 1.9.10)

Status: IN PROGRESS. This file is written incrementally; sections marked pending are not yet computed.

Scripts: `/Users/pelicannurse/.t3/detroitbench-tools/opus-endings/` (intermediate results under `out/`).

## Method (so far)

- The scripts import the engine (`benchmark/story-engine.mjs`: `startState`, `blocked`, `available`, `apply`, `nextCursor`, `attitudes`) and the assembled `benchmark/story.json`. `skipBlocked` and `finalize` are not exported, so the scripts copy them verbatim.
- Risk rolls: for each risky option the scripts try one representative roll per interval between the thresholds a consequence compares against: the option's own `risk`, plus `risk/2` (chapter 15 train ladder), `risk*CHASE_LOSS` (chapter 17), `threatenAlarmBelow` (chapter 19) and `onTheRunRisk` (chapter 15). Two representatives count as one outcome when they give the same fail flag, next scene, state and event text.
- State deduplication uses static liveness (`liveness.mjs`). For every state key and choice key the script finds the last story position whose engine logic can read it: a JSON path at a node, any code-shaped mention in a chapter module (anywhere in that chapter), the shared engine's decision code, or the ending card (forever). Keys that can no longer be read are reset or dropped before hashing. Knowledge is reduced to the Connor facts that the chapter 22 (rA9) and chapter 32 (stone, Kamski exit) predicates test. After the apartment in The Hostage, `hostageClues` is reduced to the clues later options require.

## Results

Pending.
