// The model registry (data/models.json, shape in data/administration/README.md) and each run's reasoning level from the
// cohort manifests in data/administration/. Shared by scripts/run-report.mjs (report names) and scripts/prepare.mjs
// (the site's run summaries), so a run is called the same thing everywhere.
import {readFile,readdir} from 'node:fs/promises';
import {z} from 'zod';
// Provider IDs stay exact in storage; normalize encoded decimals only for display.
export const displayModelId=id=>String(id??'').replace(/(?<=\d)p(?=\d)/g,'.');
export const EFFORTS=['none','low','medium','high','xhigh','max','ultra'];
const HUES=['blue','orange','aqua','yellow','magenta','green','violet','red'],HEX=z.string().regex(/^#[0-9a-f]{6}$/i);
const schema=z.object({vendors:z.array(z.object({id:z.string(),name:z.string()})),models:z.record(z.string(),z.object({name:z.string(),short:z.string().optional(),vendor:z.string(),tier:z.enum(['frontier','notable','other']),size:z.enum(['small','medium','large']).optional(),open:z.boolean().default(false),hue:z.enum(HUES).optional(),color:z.object({light:HEX,dark:HEX}).optional(),released:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional()}))}).passthrough();
export async function loadRegistry(){return schema.parse(JSON.parse(await readFile(new URL('../data/models.json',import.meta.url),'utf8')))}
// Reasoning level by run id. A manifest's runId can name the evidence file rather than the run's own id, so the
// artifact's id is read too. An unknown level stops the build with the run named.
export async function loadReasoning(){const out=new Map,dir=new URL('../data/administration/',import.meta.url);
 for(const f of (await readdir(dir)).filter(f=>f.endsWith('.json'))){const m=JSON.parse(await readFile(new URL(f,dir),'utf8'));
  for(const q of m.requests??[])if(q.runId&&q.reasoning){if(!EFFORTS.includes(q.reasoning))throw new Error(`data/administration/${f}: run ${q.runId}${q.label?` (${q.label})`:''} has unknown reasoning level "${q.reasoning}"; expected one of ${EFFORTS.join(', ')}`);
   out.set(q.runId,q.reasoning);if(q.artifact){const ev=await readFile(new URL('../'+q.artifact,import.meta.url),'utf8').catch(()=>null),id=ev?.slice(0,400).match(/"id"\s*:\s*"([^"]+)"/)?.[1];if(id)out.set(id,q.reasoning)}}}
 return out}
export async function loadModelContext(){return {registry:await loadRegistry(),reasoning:await loadReasoning()}}
// A model missing from the registry is named from its id: "gpt-6.1-terra" → "GPT-6.1 Terra", "claude-opus-5-5" →
// "Claude Opus 5.5".
export function fallbackName(model){const m=displayModelId(model??'model'),g=m.match(/^gpt-([\d.]+)-(.+)$/i);if(g)return `GPT-${g[1]} ${g[2].split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}`;
 const c=m.match(/^claude-([a-z]+)-(\d+)-(\d+)$/i);if(c)return `Claude ${c[1][0].toUpperCase()+c[1].slice(1)} ${c[2]}.${c[3]}`;return m}
export const runNumberOf=run=>Number(String(run.label??'').match(/\brun (\d+)\b/i)?.[1])||null;
// One display name per run: the registry name plus the reasoning level ("GPT-6.1 Sol · low"), or, for a run without
// one, plus its run number ("Claude Haiku 5.5 · run 2"). `n` is the run's number among its model's runs.
export function displayBase(run,{registry,reasoning},n=1){const name=registry.models[run.model]?.name??fallbackName(run.model),level=reasoning.get(run.id)??'none';
 return level!=='none'?`${name} · ${level}`:`${name} · run ${runNumberOf(run)??n}`}
export function modelInfo(run,{registry}){const m=registry.models[run.model];if(!m){const name=fallbackName(run.model);return {id:run.model,name,short:name.replace(/^Claude /,''),vendor:null,vendorName:null,vendorOrder:99,tier:'other',size:null,open:false,hue:null,color:null,released:null,registered:false}}
 const vi=registry.vendors.findIndex(v=>v.id===m.vendor);return {id:run.model,name:m.name,short:m.short??m.name.replace(/^Claude /,''),vendor:m.vendor,vendorName:registry.vendors[vi]?.name??m.vendor,vendorOrder:vi<0?99:vi,tier:m.tier,size:m.size??null,open:m.open,hue:m.hue??null,color:m.color??null,released:m.released??null,registered:true}}
