import test from 'node:test';
import assert from 'node:assert/strict';
import {MOLECULES,ATOM_TARGETS,SEPARATIONS,ACTIVITIES,calculateRf,expectedMoles,modelCollisionIndex,defaultDiscoveryState,checkDiscovery} from '../dist/discoveries.js';
test('six working discovery types with unique identifiers',()=>{
 assert.equal(ACTIVITIES.length,6);
 assert.equal(new Set(ACTIVITIES.map(x=>x.id)).size,6);
});
test('molecule composition model accepts exact atom counts',()=>{
 for(const m of MOLECULES){const state={...defaultDiscoveryState(),discovery:'molecule',molecule:m.id,atomCounts:{H:0,O:0,C:0,N:0,...m.atoms}};assert.equal(checkDiscovery(state).ok,true,m.id);state.atomCounts.H++;assert.equal(checkDiscovery(state).ok,false,m.id);}
});
test('atom model checks neutral atoms',()=>{
 for(const atom of ATOM_TARGETS){const st={...defaultDiscoveryState(),discovery:'atom',atomTarget:atom.symbol,protons:atom.protons,electrons:atom.protons};assert.ok(checkDiscovery(st).ok,atom.symbol);st.electrons++;assert.equal(checkDiscovery(st).ok,false);}
});
test('separation methods are contextual',()=>{
 for(const item of SEPARATIONS){const st={...defaultDiscoveryState(),discovery:'separation',separation:item.id,method:item.method};assert.ok(checkDiscovery(st).ok,item.id);st.method='something else';assert.equal(checkDiscovery(st).ok,false);}
});
test('rate index is monotonic within simplified parameter changes',()=>{
 assert.equal(modelCollisionIndex(defaultDiscoveryState()),1);
 const st={...defaultDiscoveryState(),discovery:'rate',temperature:60};assert.ok(modelCollisionIndex(st)>1);
 assert.equal(checkDiscovery(st).ok,true);
});
test('Rf is a proper spot/solvent-front ratio, rejects impossible values',()=>{
 assert.equal(calculateRf(12,24),0.5);assert.equal(calculateRf(12,0),null);assert.equal(calculateRf(30,24),null);
 const st={...defaultDiscoveryState(),discovery:'chromatography'};assert.ok(checkDiscovery(st).ok);
 st.rfGuess='0.7';assert.equal(checkDiscovery(st).ok,false);
});
test('moles maths checks numeric results and blank inputs',()=>{
 assert.equal(expectedMoles(36,18),2);assert.equal(expectedMoles(-1,18),null);
 const st={...defaultDiscoveryState(),discovery:'moles'};assert.ok(checkDiscovery(st).ok);
 st.molesGuess='';assert.equal(checkDiscovery(st).ok,false);
});