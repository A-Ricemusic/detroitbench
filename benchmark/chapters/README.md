# Per-chapter story files and engine modules

Each chapter of the story lives in its own files so that chapters can be rebuilt in parallel without two people editing the same file. NN is the zero-padded chapter number; chapter 33 is the epilogue.

| File | What it holds | Generated into |
|---|---|---|
| `benchmark/chapters/chNN.json` | The chapter's scenes (nodes), an array in story order. Every node's `chapter` must be NN. | `benchmark/story.json` by `bun run story:assemble` |
| `benchmark/chapters/chNN.mjs` | Optional engine logic for the chapter (the contract below). | Loaded by `benchmark/chapters/index.mjs` |
| `docs/atlas/chapters/chNN.json` | `{"chapter": {...}, "decisions": [...]}`: the atlas chapter entry and its decision families. | `docs/detroit-decisions.json` by `bun run atlas:assemble` |
| `tests/chNN.test.mjs` | The chapter's tests. `bun test ./tests` runs every `*.test.mjs` file in `tests/`. | |

Shared files that chapter work does not edit: `benchmark/story.json` and `docs/detroit-decisions.json` (both generated; tests fail if they differ from the assembly), `benchmark/story-meta.json` and `docs/atlas/meta.json` (top-level keys such as the story version and assumptions, and the atlas version and dates; change them in one place when merging), `benchmark/story-engine.mjs`, `scripts/run-report.mjs` and `tests/story.test.mjs`. Scene counts are printed by `bun run story:counts`, so README.md and AGENTS.md do not need to change either.

After editing a chapter: `bun run story:assemble`, `bun run atlas:assemble`, `bun run atlas:build`, `bun run play:checklist`, `bun run test`, `bun run check`.

## Engine module contract (`chNN.mjs`)

`benchmark/chapters/index.mjs` imports every `chNN.mjs` file at load, in numeric order, and exports `CHAPTER_MODULES` (chapter number to module). The engine and the run report consult them through hooks marked "Chapter hook" in `benchmark/story-engine.mjs` and `scripts/run-report.mjs`. With no module present every hook does nothing, so the engine behaves as before. Every export is optional:

| Export | Shape | Effect |
|---|---|---|
| `state` | `{key: initialValue}` | Added to `initialState()` after the built-in keys (deep-copied per state). Chapter-scoped keys only: a key that is already built in, or declared by another chapter, throws. Prefix keys with something chapter-specific. |
| `gate` | `{sceneId: fn}` or `{sceneId: [fn, ...]}`, `fn(s, helpers)` | Consulted by `blocked()` for the chapter's scenes, after the character and `when` checks and before the built-in gate table. Return `true` (or nothing) to open the scene, a string to block it with that reason, or `false` to block it with a generic reason. With an array, the first non-open result wins. An open result replaces the built-in table entry for that scene. A media scene still needs at least one item that exists on the path. |
| `available` | `(n, s, opts, helpers) => opts \| undefined` | Called for the chapter's decision scenes after the built-in option filters (`requires`, clues, `excludeChosenAt` and the built-in removals). Return a new option list to replace it; return nothing to keep it. |
| `consequence` | `(n, s, opt, choice, fail, helpers) => string \| {event} \| undefined` | Called for the chapter's decision scenes before the built-in `switch` in `apply()`, after the option's data-driven `effect`, `sets` and `fact` have been applied. Return a string, or an object whose `event` is a string, to make that the event and skip the switch; an empty string means "handled, use the option's default outcome text". Return nothing to fall through to the switch. Also called for the chapter's event scenes (after their `facts` and `effect`); a returned string replaces the event's outcome text. Not called for media scenes, repeatable clue hubs (`clueState`) or the Hostage scenes. Mutate `s` directly or through the helpers. |
| `deathEffect` | `{statKey: delta}` | The chapter's entry in `CONNOR_DEATH_EFFECT`: the stat changes applied whenever Connor dies in this chapter (`{}` for none). Without it the default (instability −1, Hank −1, Amanda −1) applies. |
| `mediaWhen` | `{name: s => boolean}` | Media item `when` names for the chapter's media scenes, consulted before the built-in table. |
| `labels` | `{stateKey: 'Label'}` | Human labels for state changes in run reports, merged into the report's label map. Only labelled keys are listed in a report's state changes. |
| `rules` | any object | Constants the chapter's recap or tests want (thresholds, tables). Not read by the engine; reach it as `CHAPTER_MODULES.get(NN).rules` or import it from the module. |

Helpers passed to `consequence`:

- `bump(key, delta, maxKey?)`: add to a numeric state key (and raise `maxKey` if exceeded).
- Stat shortcuts, each taking a delta: `si` (software instability), `po` (public opinion), `hank`, `amanda`, `alice` (also tracks `aliceMax`), `luther`, `jer` and `jericho` (Jericho), `north`, `simon`, `josh`.
- `connorDies(why)`: counts the death, applies this chapter's `deathEffect` (or the default) and returns `why` plus the replacement sentence.
- `markusHit()`: counts a hit on Markus and returns true on the third. `raidDeath()`: Markus dies in the raid; returns the outcome text.
- `learn(fact, who = n.character)`: add a fact to what a character knows, once.
- `c(sceneId)`: the choice made at a scene, or undefined. `v`: `Number(choice)`. `before`: a copy of the state before this choice.
- `meets(requires, s)`, `evidenceRoutes(s)`, `armyAwakened(s)`, and `constants` (`HANK_FRIEND`, `HANK_HOSTILE`, `OPINION_SYMPATHETIC`, `JERICHO_UNPOPULAR`, `DEVIANCY_THRESHOLD`, `ALICE_KEY`).

Helpers passed to `gate` functions: `n`, `c`, `meets`, `evidenceRoutes`, `armyAwakened`, `constants`. Helpers passed to `available`: `c`, `meets`, `without(...optionIds)` (the current list minus those IDs), `evidenceRoutes`, `armyAwakened`, `constants`.

A module must not import `benchmark/story-engine.mjs`: `index.mjs` loads modules with a top-level await that the engine is itself waiting on, so that import would never resolve. Use the helpers instead. Importing `benchmark/experience-prompt.mjs` (for `LEVELS`, say) is fine.

Moving a chapter's logic out of the engine: copy its `case` lines from the switch into `consequence`, its gate-table entries into `gate`, and its `remove(...)` lines into `available`, then delete them from the engine in the same change. Behaviour is unchanged as long as the module reproduces the same state changes in the same order; the evidence replay in `bun run check` and the tests confirm it.

### Example

```js
// benchmark/chapters/ch05.mjs
export const state={ch05PaintingDone:false};
export const labels={ch05PaintingDone:'Markus finished the painting'};
export const deathEffect={};                       // no stat change when Connor dies in this chapter
export const gate={
 M03b:(s,h)=>h.c('M03')==='0'||'Markus did not start painting.',
};
export function available(n,s,opts,h){
 if(n.id==='M03b'&&!s.carl)return h.without(1);    // Carl's line only while he is alive
}
export function consequence(n,s,opt,choice,fail,h){
 if(n.id!=='M03b')return;                          // fall through to the built-in switch
 s.ch05PaintingDone=true;h.po(1);h.learn('Carl liked the painting.');
 return fail?'The brush slips; Carl laughs it off.':'';  // '' = use the option outcome text
}
```

## Tests

Add chapter tests as `tests/chNN.test.mjs`; `bun test ./tests` picks them up automatically. Do not edit `tests/story.test.mjs` (the shared regression suite); if a chapter rebuild changes behaviour one of its tests asserts, raise it with whoever merges the chapters. `tests/chapter-modules.test.mjs` proves the hooks with a throwaway `ch99.mjs` that it writes and deletes; never commit a `ch99.mjs`.
