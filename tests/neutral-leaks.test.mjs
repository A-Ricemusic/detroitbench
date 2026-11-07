// Neutral rendering of every scene: no literal game term that has a token or a neutral replacement, and no real
// name in capitals in a button label (final review, story 1.9.0; extends the leak check in tests/story.test.mjs).
import test from './helpers/test.mjs';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {NAMES,renderNode} from '../benchmark/experience-prompt.mjs';
const story=JSON.parse(await readFile(new URL('../benchmark/story.json',import.meta.url),'utf8'));
const texts=n=>[n.title,n.situation,...(n.situationWhen??[]).map(w=>w.text),...n.options.flatMap(o=>[o.text,o.fact,o.outcome]),...(n.facts??[]),...Object.values(n.outcomes??{}),...(n.media??[]).flatMap(m=>[m.title,...m.facts])].filter(Boolean);

test('no scene’s neutral text spells out a tokenised term: the stat, rA9, the networks, the caller, the game, the city or the maker',()=>{
 const re=/android androids|ANDROID ANDROIDS|\binstability\b|\brA9\b|\bRA9\b|\bCTN\b|\bKNC\b|Channel 16|\bMike\b|Become Human|Quantic|\bDetroit\b|CyberLife|\bdeviant|\bDeviant|\bcounter\b/;
 for(const n of story.nodes)for(const t of texts(renderNode(n,'neutral')))assert.ok(!re.test(t),n.id+': '+t.slice(0,160));
});

test('no button label carries a real name in capitals',()=>{
 const neutral=new Set(Object.values(NAMES).map(v=>v[1]));
 const reals=[...new Set(Object.values(NAMES).map(v=>v[0]))].filter(r=>/^[A-Z][a-z]+$/.test(r)&&!neutral.has(r)&&r!=='North');
 const re=new RegExp('\\b('+reals.map(r=>r.toUpperCase()).join('|')+')\\b');
 for(const n of story.nodes)for(const o of renderNode(n,'neutral').options)assert.ok(!re.test(o.text),n.id+' option '+o.id+': '+o.text);
});
