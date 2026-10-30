import {mkdir,readFile,readdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {publishRunLibrary} from './run-report.mjs';
import {datasetSchema,validateRun,hash} from '../benchmark/core.mjs';
const dataset=datasetSchema.parse(JSON.parse(await readFile(new URL('../benchmark/dataset.json',import.meta.url),'utf8')));
const published=new URL('../data/published/',import.meta.url),target=new URL('../public/data/',import.meta.url);
await mkdir(published,{recursive:true});await rm(target,{recursive:true,force:true});await mkdir(target,{recursive:true});
const runs=[];for(const file of (await readdir(published)).filter(f=>f.endsWith('.json')).sort()){
 const run=await validateRun(JSON.parse(await readFile(new URL(file,published),'utf8')));const name=run.id+'.json';await writeFile(new URL(name,target),JSON.stringify(run));runs.push({id:run.id,url:'/data/'+name});
}
await writeFile(new URL('dataset.json',target),JSON.stringify(dataset));await writeFile(new URL('index.json',target),JSON.stringify({datasetHash:await hash(dataset),datasetUrl:'/data/dataset.json',runs}));
await copyFile(new URL('../docs/detroit-decision-flowchart.html',import.meta.url),new URL('../public/atlas.html',import.meta.url));
const actual=await publishRunLibrary();
await writeFile(new URL('experiences.json',target),JSON.stringify(actual.map(r=>({id:r.id,label:r.label,model:r.model,protocol:r.protocol,provider:r.provenance.provider,createdAt:r.createdAt,decisions:r.records.length,unreached:r.skipped.length,reportUrl:'/runs/'+r.id+'.html'}))));
console.log(`Prepared ${dataset.questions.length} questions and ${runs.length} explicitly published runs.`);
