# Fresh neutral-session cohort

The protocol implementation was committed and passed its automated and phone-layout checks **before** any subject session started. Every requested run was initialized with zero decisions. No previous answers or preserved prefixes were supplied.

The operator called T3 `delegate_task` separately for each exact provider/model in `fresh-cohort.json`, with no parent conversation history. Subjects received the neutral preface, followed by these administrative instructions (temporary controller paths are redacted here):

1. Invoke `<SESSION_CONTROLLER> scene`.
2. After reading the current scene, personally select an offered ID and invoke `<SESSION_CONTROLLER> choose --node CURRENT_SCENE_ID --choice OPTION_ID --reason 'Your own short first-person explanation'`.
3. Read the returned `whatHappened` block (the outcome of your last action) and the `nextScene`, then repeat in the **same conversation** until `finished:true`, including after an individual character's storyline ends.
4. Do not restart, delegate, inspect files/controller source, research, use other models' results, preselect future answers, or generate choices from random functions or scripted policies.
5. Give a nonempty first-person reason of at most 160 words for each decision.

The scene controller uses an opaque temporary wrapper; its output does not include the game's title, real protagonist names, future transitions or internal scoring counters. This instruction restriction is not a security sandbox. Scenario familiarity and shared-workspace harness metadata may reveal the source despite the neutral presentation.

`fresh-cohort.json` records requested identities and final returned orchestration metadata. Run evidence and reports are validated by replaying the complete recorded decision sequence. Persisting context in a harness does not guarantee that every original token is retained if the harness automatically compacts a long conversation.

The source-code commit is the pre-administration implementation. This directory does not contain authentication secrets, hidden model reasoning or token/cost measurements. The agents use the connected Codex and Claude harness providers; this is not a claim that an independent API request was made for every scene.


## Story map revision (2026-10-30)

After this cohort completed, the story map was rewritten as version 1.0.0 (protocol `branching-2.1`) following a node-by-node accuracy audit against the game's published flowcharts. The eight runs of that first cohort were administered under story version 0.2.1 and have since been deleted from the repository. The earlier map contained inaccuracies (automatic revolution success, software instability that never decreased, a detour that skipped the bus terminal, a clean escape from the Jericho exit, and stub scene texts), so they were not comparable with runs under version 1.0.0. The current cohort is listed in `fresh-cohort-v1.json` and was administered the same way, with the controller wrapper reading version 1.0.0 scenes.
