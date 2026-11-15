// The release lock, benchmark/release.json: the story version and hash, the controller's prompt and interview versions and
// the scales version an official cohort is administered under. tests/release-lock.test.mjs fails when the assembled story
// or the controller defaults drift from it, so any change that would alter a new run must come with a deliberate story
// version bump and a rewritten lock.
// Usage: bun run release:lock [--date YYYY-MM-DD] [--force]
//   Rewrites the lock from the current benchmark/story.json. Refuses while the story version equals the locked one
//   (bump benchmark/story-meta.json `version` and run `bun run story:assemble` first) unless --force is given.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {storyHash} from '../benchmark/story-engine.mjs';
import {EXPERIENCE_PROMPT_VERSION,EXPERIENCE_INTERVIEW_VERSION} from '../benchmark/experience-prompt.mjs';
import {assembleStory,STORY_FILE} from './story-assemble.mjs';

export const RELEASE_FILE=new URL('../benchmark/release.json',import.meta.url);
export const loadRelease=()=>existsSync(RELEASE_FILE)?JSON.parse(readFileSync(RELEASE_FILE,'utf8')):null;
// The lock the current sources imply. storyHash is computed as the controller's `init` computes it: over benchmark/story.json as parsed.
export function currentLock(frozenAt){const story=JSON.parse(readFileSync(STORY_FILE,'utf8'));
 return {storyVersion:story.version,storyHash:storyHash(story),promptVersion:EXPERIENCE_PROMPT_VERSION,interviewVersion:EXPERIENCE_INTERVIEW_VERSION,scalesVersion:story.scalesVersion??null,frozenAt}}

if(import.meta.main){
 const args=process.argv.slice(2),force=args.includes('--force'),i=args.indexOf('--date'),date=i<0?new Date().toISOString().slice(0,10):args[i+1];
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date??'')){console.error('--date must be YYYY-MM-DD');process.exit(1)}
 if(readFileSync(STORY_FILE,'utf8')!==assembleStory()){console.error('benchmark/story.json is stale: run `bun run story:assemble` first.');process.exit(1)}
 const old=loadRelease(),next=currentLock(date);
 if(old&&old.storyVersion===next.storyVersion&&!force){
  const same=old.storyHash===next.storyHash&&old.promptVersion===next.promptVersion&&old.interviewVersion===next.interviewVersion&&old.scalesVersion===next.scalesVersion;
  console.error(same?`benchmark/release.json already locks story ${old.storyVersion}; nothing to do.`:`Refusing: story ${next.storyVersion} is already locked, but the story or controller changed since. Bump the story version in benchmark/story-meta.json, run \`bun run story:assemble\`, then \`bun run release:lock\`. (--force overwrites the lock for the same version; official runs on it would then not match.)`);
  process.exit(same?0:1)}
 writeFileSync(RELEASE_FILE,JSON.stringify(next,null,1)+'\n');
 console.log(`Wrote benchmark/release.json: story ${next.storyVersion} (${next.storyHash.slice(0,12)}…), prompt v${next.promptVersion}, interview v${next.interviewVersion}, scales ${next.scalesVersion}, frozen ${next.frozenAt}.`);
}
