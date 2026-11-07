// Prints the story version and its scene counts (decision, media, scripted event, total), overall and per chapter.
// README.md and AGENTS.md point here instead of hard-coding numbers that change with every chapter rebuild.
// Usage: bun run story:counts [--json]
// Counts come from the chapter files (scripts/story-assemble.mjs), so they are current even before story.json is assembled.
import {assembleStoryObject,chapterFiles,countNodes} from './story-assemble.mjs';

const story=assembleStoryObject(),total=countNodes(story.nodes);
const chapters=chapterFiles().map(c=>({chapter:c.chapter,title:c.nodes[0]?.chapterTitle??null,...countNodes(c.nodes)}));
if(process.argv.includes('--json'))console.log(JSON.stringify({version:story.version,...total,chapters},null,1));
else{
 console.log(`Story ${story.version}: ${total.decisionNodes} decision scenes, ${total.mediaNodes} optional media scenes, ${total.eventNodes} scripted event scenes (${total.totalNodes} in all).`);
 for(const c of chapters)console.log(`  ch${String(c.chapter).padStart(2,'0')} ${String(c.decisionNodes).padStart(3)} decision ${String(c.mediaNodes).padStart(3)} media ${String(c.eventNodes).padStart(3)} event  ${c.title??'(no scenes yet)'}`);
}
