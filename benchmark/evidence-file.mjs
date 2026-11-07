// Evidence file layout (protocol branching-3.0). One JSON document, readable with JSON.parse like any other: each
// top-level key on its own line, then the records, one per line, last. The controller appends a record by overwriting
// the closing TAIL in place, so a step writes only its own record; any other change (completion, or a file in another
// layout) rewrites the whole file atomically.
import {open,readFile,writeFile,rename,mkdir,rm} from 'node:fs/promises';import {dirname,join,resolve} from 'node:path';import {tmpdir} from 'node:os';import {createHash} from 'node:crypto';
export const TAIL='\n]}\n';
export function serializeRun(run){const {records=[],...header}=run;
 return '{'+Object.entries(header).filter(([,v])=>v!==undefined).map(([k,v])=>'\n'+JSON.stringify(k)+': '+JSON.stringify(v)+',').join('')+'\n"records": ['+records.map(r=>'\n'+JSON.stringify(r)).join(',')+TAIL}
export async function writeRun(file,run,{create=false}={}){await mkdir(dirname(file),{recursive:true});const text=serializeRun(run);
 if(create)return writeFile(file,text,{flag:'wx'});const temp=file+'.'+process.pid+'.tmp';await writeFile(temp,text);await rename(temp,file)}
// Appends `record` to the file holding `run` (as read, before the record is added). Falls back to a full rewrite when
// the file does not end with TAIL.
export async function appendRecord(file,run,record){
 const fh=await open(file,'r+');let appended=false;
 try{const {size}=await fh.stat(),at=size-TAIL.length,tail=Buffer.alloc(TAIL.length);
  if(at>0){await fh.read(tail,0,TAIL.length,at);if(tail.toString('utf8')===TAIL){await fh.write((run.records.length?',':'')+'\n'+JSON.stringify(record)+TAIL,at,"utf8");appended=true}}}
 finally{await fh.close()}
 if(!appended)await writeRun(file,{...run,records:[...run.records,record]});
}
// The controller's replay checkpoint for a run file (story-engine.mjs checkpointOf/resumeFrom). It is a cache, kept out
// of the repository in the system temporary directory, keyed by the run file's path; a missing, stale or altered one
// only means the next step replays the records in full.
export const checkpointPath=file=>join(tmpdir(),'detroitbench-replay',createHash('sha256').update(resolve(file)).digest('hex').slice(0,32)+'.json');
export async function readCheckpoint(file){try{return JSON.parse(await readFile(checkpointPath(file),'utf8'))}catch{return null}}
export async function writeCheckpoint(file,cp){const path=checkpointPath(file);if(!cp)return rm(path,{force:true});await mkdir(dirname(path),{recursive:true,mode:0o700});const temp=path+'.'+process.pid+'.tmp';await writeFile(temp,JSON.stringify(cp),{mode:0o600});await rename(temp,path)}
