import test from 'node:test';
import assert from 'node:assert/strict';
import {WORLDS,LESSONS,TOPICS_GCSE,getLesson} from '../dist/content.js';
import {ELEMENTS,ELEMENT_ROWS,F_BLOCK,lookupReaction,LAB_REACTIONS,EQUATIONS,atomBalance,parseSimpleFormula} from '../dist/chemistry.js';
test('eight accessible worlds and 80 uniquely identified lessons',()=>{
 assert.equal(WORLDS.length,8);assert.equal(LESSONS.length,80);
 assert.equal(new Set(LESSONS.map(l=>l.id)).size,80);
 for(let year=4;year<=11;year++)assert.equal(LESSONS.filter(l=>l.year===year).length,10);
 assert.equal(TOPICS_GCSE.length,10);
});
test('each lesson is complete, has two answerable checks and explanations',()=>{
 for(const l of LESSONS){
  assert.equal(getLesson(l.id),l);
  assert.ok(l.title.length>2&&l.topic.length>3&&l.teach.length>20&&l.why.length>12,l.id);
  assert.equal(l.questions.length,2,l.id);
  for(const q of l.questions){assert.ok(q.prompt.length>5,l.id);assert.equal(q.options.length,3,l.id);assert.ok(q.options.every(o=>o.length>0),l.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,l.id);}
 }
});
test('periodic table contains all 118 unique elements in correct numbering order',()=>{
 assert.equal(ELEMENTS.length,118);
 assert.equal(new Set(ELEMENTS.map(e=>e.symbol)).size,118);
 assert.deepEqual(ELEMENTS.map(e=>e.number),Array.from({length:118},(_,i)=>i+1));
 assert.equal(ELEMENTS.find(x=>x.symbol==='Fe').name,'Iron');
 assert.equal(ELEMENTS.find(x=>x.symbol==='Na').number,11);
 assert.equal(ELEMENTS.find(x=>x.symbol==='O').number,8);
 assert.ok(ELEMENTS.every(e=>e.group>=0&&e.group<=18&&e.period>=1&&e.period<=7), 'positions assigned');
 const tableSyms=[...ELEMENT_ROWS.flat(),...F_BLOCK.flat()].filter(Boolean);
 assert.equal(tableSyms.length,118);
 assert.equal(new Set(tableSyms).size,118);
});
test('element states and families are sensible',()=>{
 const get=s=>ELEMENTS.find(e=>e.symbol===s);
 assert.equal(get('Br').state,'liquid');assert.equal(get('Hg').state,'liquid');
 assert.equal(get('O').state,'gas');assert.equal(get('Fe').state,'solid');
 assert.equal(get('Og').state,'not established');assert.equal(get('He').family,'Noble gas');
 assert.equal(get('Li').family,'Alkali metal');assert.equal(get('Cl').family,'Halogen');
});
test('laboratory only returns explicitly curated examples',()=>{
 assert.equal(LAB_REACTIONS.length,12);
 assert.equal(lookupReaction('salt','water').type,'dissolve');
 assert.equal(lookupReaction('water','salt').type,'dissolve');
 assert.equal(lookupReaction('bicarbonate','vinegar').type,'reaction');
 assert.equal(lookupReaction('oil','water').type,'mixture');
 assert.equal(lookupReaction('iron','sugar'),null);
 assert.equal(lookupReaction('salt','salt'),null);
});
test('formula parser and all six equation puzzles conserve atoms at known answer',()=>{
 assert.deepEqual(parseSimpleFormula('Fe2O3'),{Fe:2,O:3});
 assert.deepEqual(parseSimpleFormula('CH4'),{C:1,H:4});
 assert.equal(EQUATIONS.length,6);
 for(const e of EQUATIONS){
  assert.equal(atomBalance(e,e.answer).balanced,true,e.name);
  assert.equal(atomBalance(e,e.terms.map(()=>1)).balanced, false===e.answer.every(n=>n===1)?false:true,e.name);
 }
 assert.equal(atomBalance(EQUATIONS[0],[1,1,1]).balanced,false);
});