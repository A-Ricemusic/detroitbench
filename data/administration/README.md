# Administration records

One manifest per cohort lives here. A manifest records what was requested and what the harness returned, never wrapper paths or secrets.

Shape of a manifest (`<cohort-name>.json`):

```json
{
  "protocol": "branching-2.3",
  "storyVersion": "<story.json version>",
  "freshStart": true,
  "createdAt": "YYYY-MM-DD",
  "implementationCommit": "<git commit that administered the runs>",
  "note": "<why this cohort exists>",
  "requests": [
    {
      "label": "<display label>",
      "model": "<exact provider model id>",
      "provider": "codex | claudeAgent",
      "runId": "<run id>",
      "artifact": "data/experiences/<run id>.json",
      "status": "initialized | completed | abandoned",
      "initialDecisions": 0
    }
  ]
}
```

Rules: one fresh conversation per run, no reused answers, no restarts. A run that dies mid-session keeps its partial evidence file and is marked `abandoned`; start a new run with a new ID rather than resuming.

No cohort has been administered under the current story version. All runs made under story versions 0.2.1 through 1.1.3 were discarded on 2026-11-06 ahead of a full rewrite of the scene set. Git history was not rewritten.
