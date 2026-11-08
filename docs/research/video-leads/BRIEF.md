# Video-lead brief

Find YouTube videos that can settle specific open conflicts in `docs/research/CONFLICTS.md` by showing the moment on screen.

## What settles a conflict

- **An arrow question** ("did a Hank up arrow appear when …"): a recording of that exact moment where the relationship popup is visible, or the chapter's completed flowchart header (it prints the gauge levels) at the end of a path that includes the action.
- **A button question** ("was REFUSE/ACCEPT offered before …"): a recording that reaches that prompt.
- **A number question** (stress percentage, timer, count): a recording where the number is on screen.
- **An ending or gate question**: a recording that reaches the branch under the stated condition.

The in-game flowchart always wins; a video that contradicts the chart is noise. A video is only a lead if it is likely to show the exact branch or moment named in the question.

## How to search

Use web search with the chapter name plus the branch (for example "Detroit Become Human Capitol Park Get Spotted By Drone", "Interrogation give up after pressure stress", "Freedom March stand ground attack Josh arrow"), and read each video's description and chapter markers (visible on the watch page) to confirm it reaches the branch. Prefer videos with chapter markers naming endings, videos that end on the completed flowchart, and channels that do one video per branch. Each lead must name the video id, its title and channel, the timestamp or marker that covers the question, and the conflict ids it may settle. Do not watch or download videos; the operator's agents will read frames from the leads you provide.

## Output

Write `docs/research/video-leads/<your-range>.md`: for each conflict id in your chapter range (read the question and its "why" from CONFLICTS.md), 0 to 3 leads with: `https://youtu.be/<id>`, title, channel, upload year if shown, the marker or timestamp, why it should show the moment. Finish with a list of the conflicts you found no lead for.
