import test from './helpers/test.mjs';
import assert from 'node:assert/strict';
import {displayModelId} from '../scripts/model-registry.mjs';

test('displayModelId normalizes only lowercase p between digits',()=>{
 for(const [id,expected] of [['glm-5p3-flash','glm-5.3-flash'],['v1p2p3','v1.2.3'],['gpt-6.1-terra','gpt-6.1-terra'],['claude-haiku-5-5','claude-haiku-5-5'],['apple-5-preview','apple-5-preview'],['5P3-5pp3-p3-5p','5P3-5pp3-p3-5p']])assert.equal(displayModelId(id),expected);
});
