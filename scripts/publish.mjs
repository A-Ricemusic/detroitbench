import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {validateRun} from '../benchmark/core.mjs';
try{const file=process.argv[2];if(!file)throw new Error('Usage: bun run bench:publish runs/<file>.json');const run=await validateRun(JSON.parse(await readFile(resolve(file),'utf8')));await mkdir('data/published',{recursive:true});await writeFile(`data/published/${run.id}.json`,JSON.stringify(run,null,2)+'\n');console.log(`Added ${run.kind} run to the shareable dataset. Rebuild/restart the app to include it. This command does not deploy.`);}catch(e){console.error(e.message);process.exitCode=1;}
