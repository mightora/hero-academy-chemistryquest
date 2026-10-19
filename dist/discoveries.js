// Curated virtual investigations. These are teaching models, not instructions for real practical work.
export const MOLECULES = Object.freeze([
  {id:'water',name:'Water',formula:'H₂O',atoms:{H:2,O:1},note:'Two hydrogen atoms and one oxygen atom form a water molecule.'},
  {id:'carbon-dioxide',name:'Carbon dioxide',formula:'CO₂',atoms:{C:1,O:2},note:'One carbon atom and two oxygen atoms form carbon dioxide.'},
  {id:'ammonia',name:'Ammonia',formula:'NH₃',atoms:{N:1,H:3},note:'Ammonia contains one nitrogen atom and three hydrogen atoms.'},
  {id:'methane',name:'Methane',formula:'CH₄',atoms:{C:1,H:4},note:'Methane contains one carbon atom and four hydrogen atoms.'},
  {id:'oxygen',name:'Oxygen gas',formula:'O₂',atoms:{O:2},note:'Oxygen in air is usually made of pairs of oxygen atoms.'},
  {id:'nitrogen',name:'Nitrogen gas',formula:'N₂',atoms:{N:2},note:'Nitrogen in air is usually made of pairs of nitrogen atoms.'}
]);
export const ATOM_TARGETS = Object.freeze([
  {symbol:'H',name:'Hydrogen',protons:1}, {symbol:'He',name:'Helium',protons:2},
  {symbol:'Li',name:'Lithium',protons:3}, {symbol:'C',name:'Carbon',protons:6},
  {symbol:'N',name:'Nitrogen',protons:7}, {symbol:'O',name:'Oxygen',protons:8},
  {symbol:'Na',name:'Sodium',protons:11}, {symbol:'Mg',name:'Magnesium',protons:12},
  {symbol:'Cl',name:'Chlorine',protons:17}, {symbol:'Fe',name:'Iron',protons:26}
]);
export const SEPARATIONS = Object.freeze([
  {id:'sand',mixture:'Sand and water',method:'filtration',why:'Sand particles are trapped by a suitable filter. Dissolved substances generally pass through it.'},
  {id:'salt',mixture:'Salt dissolved in water',method:'crystallisation',why:'Evaporation and crystallisation can recover dissolved salt. Ordinary filtration cannot.'},
  {id:'ink',mixture:'Several dyes in an ink',method:'chromatography',why:'Chromatography separates soluble components because they travel at different rates in the mobile phase.'},
  {id:'alcohol',mixture:'Two miscible liquids with different boiling points',method:'distillation',why:'Fractional distillation can separate miscible liquids with different boiling points.'},
  {id:'iron',mixture:'Iron filings mixed with sand',method:'magnet',why:'A suitable magnet attracts iron, leaving the non-magnetic sand behind.'}
]);
export const SEPARATION_METHODS = Object.freeze([
  ['filtration','Filter'],['crystallisation','Crystallise'],['chromatography','Chromatography'],['distillation','Fractional distillation'],['magnet','Magnet']
]);
export const FORMULA_MASS = Object.freeze([
  {id:'H2O',name:'Water (H₂O)',mr:18}, {id:'CO2',name:'Carbon dioxide (CO₂)',mr:44},
  {id:'NaCl',name:'Sodium chloride (NaCl)',mr:58.5}, {id:'MgO',name:'Magnesium oxide (MgO)',mr:40},
  {id:'CH4',name:'Methane (CH₄)',mr:16}, {id:'CaCO3',name:'Calcium carbonate (CaCO₃)',mr:100}
]);
export const ACTIVITIES = Object.freeze([
  {id:'molecule',label:'Molecule maker',icon:'🧩',level:'KS3',hint:'Build from atom counters.'},
  {id:'atom',label:'Atom workshop',icon:'⚛️',level:'KS3 / GCSE',hint:'Discover the atomic number.'},
  {id:'separation',label:'Separation station',icon:'🧪',level:'KS2 / KS3',hint:'Choose a separation method.'},
  {id:'rate',label:'Reaction race',icon:'🌡️',level:'GCSE',hint:'Explore collision theory.'},
  {id:'chromatography',label:'Chromatography',icon:'🎨',level:'GCSE',hint:'Measure a solvent-front ratio.'},
  {id:'moles',label:'Mass & moles',icon:'⚖️',level:'GCSE',hint:'Calculate amount of substance.'}
]);
const knownAtomSymbols=['H','O','C','N'];
export function defaultDiscoveryState(){return {
  discovery:'molecule',molecule:'water',atomCounts:{H:0,O:0,C:0,N:0},
  atomTarget:'C',protons:6,electrons:6,neutrons:6,
  separation:'sand',method:'filtration',temperature:20,concentration:1,surfaceArea:1,
  spotDistance:12,solventDistance:24,rfGuess:'0.50',compound:'H2O',mass:36,molesGuess:2,
  discoveryFeedback:null
};}
export function modelCollisionIndex({temperature,concentration,surfaceArea}){
  // Relative educational index ONLY. It is not a chemical kinetics law or a measured rate.
  return Number(((1+Math.max(0,temperature-20)/40)*concentration*surfaceArea).toFixed(2));
}
export function calculateRf(spotDistance,solventDistance){
 if(!Number.isFinite(spotDistance)||!Number.isFinite(solventDistance)||solventDistance<=0||spotDistance<0||spotDistance>solventDistance)return null;
 return Number((spotDistance/solventDistance).toFixed(3));
}
export function expectedMoles(mass,mr){
 if(!Number.isFinite(mass)||!Number.isFinite(mr)||mass<0||mr<=0)return null;
 return mass/mr;
}
export function checkDiscovery(state){
 switch(state.discovery){
  case 'molecule':{
   const target=MOLECULES.find(x=>x.id===state.molecule);
   const ok=!!target&&knownAtomSymbols.every(x=>Number(state.atomCounts[x])===Number(target.atoms[x]||0));
   return {ok,key:`molecule:${target?.id}`,message:ok?`⭐ Correct! ${target.note} The model shows composition, not the arrangement of chemical bonds.`:'Count how many of each atom are in the formula. The small numbers are subscripts.'};
  }
  case 'atom':{
   const target=ATOM_TARGETS.find(x=>x.symbol===state.atomTarget);
   const ok=!!target&&state.protons===target.protons&&state.electrons===target.protons;
   return {ok,key:`atom:${target?.symbol}`,message:ok?`⭐ A neutral ${target.name} atom! Proton number determines the element. Neutrons affect its isotope.`:'Use the atomic number to set the protons. In a neutral atom, electrons equal protons.'};
  }
  case 'separation':{
   const target=SEPARATIONS.find(x=>x.id===state.separation);
   const ok=!!target&&target.method===state.method;
   return {ok,key:`separation:${target?.id}`,message:ok?`⭐ Great choice! ${target.why}`:'Not quite. Think about whether the mixture dissolves and whether its parts are magnetic or have different boiling points.'};
  }
  case 'rate':{
   const score=modelCollisionIndex(state);
   const ok=score>1.5;
   return {ok,key:'rate:increased',message:ok?`⭐ Predicted collision index ${score}. Higher temperature, concentration or exposed surface may increase collision frequency and reaction rate. Exact effects depend on the reaction.`:'Increase one factor and compare with the baseline index of 1. This is a simplified teaching model, not a measured reaction rate.'};
  }
  case 'chromatography':{
   const rf=calculateRf(Number(state.spotDistance),Number(state.solventDistance));
   const guess=Number(state.rfGuess);
   const ok=rf!==null&&state.rfGuess!==''&&Number.isFinite(guess)&&Math.abs(guess-rf)<0.011;
   return {ok,key:'chromatography:rf',message:ok?`⭐ Correct! Rf = ${state.spotDistance} ÷ ${state.solventDistance} = ${rf}. Rf has no units.`:rf===null?'The spot must not travel further than the solvent front.':'Rf = distance travelled by the spot ÷ distance travelled by the solvent front. Give the result to two decimal places.'};
  }
  case 'moles':{
   const target=FORMULA_MASS.find(x=>x.id===state.compound);
   const expected=target?expectedMoles(Number(state.mass),target.mr):null;
   const guess=Number(state.molesGuess);
   const ok=expected!==null&&Number.isFinite(guess)&&state.molesGuess!==''&&Math.abs(guess-expected)<0.011;
   return {ok,key:`moles:${target?.id}`,message:ok?`⭐ Correct! ${state.mass} g ÷ ${target.mr} g/mol = ${Number(expected.toFixed(3))} mol.`:'Number of moles = mass in grams ÷ relative formula mass (with g/mol as the molar-mass unit).'};
  }
  default:return {ok:false,key:'',message:'Choose an investigation.'};
 }
}
export function renderDiscovery(state, escape, button, solved=[]){
 const e=escape;
 const options=(items,value)=>items.map(([id,name])=>`<option value="${e(id)}" ${id===value?'selected':''}>${e(name)}</option>`).join('');
 const nav=`<div class="discovery-tabs" role="group" aria-label="Choose an investigation">${ACTIVITIES.map(a=>`<button class="discovery-chip ${state.discovery===a.id?'selected':''}" data-action="discovery:${a.id}" aria-pressed="${state.discovery===a.id}">${a.icon} ${e(a.label)}</button>`).join('')}</div>`;
 let body='';
 if(state.discovery==='molecule'){
  const target=MOLECULES.find(x=>x.id===state.molecule)||MOLECULES[0];
  const balls=knownAtomSymbols.flatMap(s=>Array.from({length:Math.max(0,Math.min(8,Number(state.atomCounts[s])||0))},()=>`<span class="atom-ball atom-${s}">${s}</span>`)).join('');
  body=`<h2>🧩 Build ${e(target.name)}</h2><p>Build a molecule using the right number of atom tiles. <strong>Formula: ${e(target.formula)}</strong></p><label class="field" for="molecule-pick">Choose a molecule</label><select id="molecule-pick">${options(MOLECULES.map(x=>[x.id,`${x.name} — ${x.formula}`]),state.molecule)}</select><div class="atom-bank">${knownAtomSymbols.map(s=>`<div class="atom-adjust"><span class="atom-ball atom-${s}">${s}</span><button data-action="atom-minus:${s}" aria-label="Remove ${s} atom">−</button><strong>${state.atomCounts[s]||0}</strong><button data-action="atom-plus:${s}" aria-label="Add ${s} atom">+</button></div>`).join('')}</div><div class="molecule-stage" aria-label="Your selected atoms">${balls||'<span class="small">Add some atoms to build your model.</span>'}</div><p class="small">Real molecules have specific bonds and three-dimensional structures. This simplified model checks atom counts only.</p>`;
 }
 if(state.discovery==='atom'){
  const target=ATOM_TARGETS.find(x=>x.symbol===state.atomTarget)||ATOM_TARGETS[0];
  body=`<h2>⚛️ Make a neutral atom</h2><p>Protons define which element an atom is. Electrons balance the positive proton charge in a neutral atom.</p><label class="field" for="atom-target">Element</label><select id="atom-target">${options(ATOM_TARGETS.map(x=>[x.symbol,`${x.name} (${x.symbol}) · atomic number ${x.protons}`]),state.atomTarget)}</select><div class="atom-diagram"><div class="nucleus">${state.protons} p⁺<br>${state.neutrons} n</div><span class="electron-label">${state.electrons} e⁻</span></div><div class="discovery-fields"><label>Protons<input id="protons" type="number" min="1" max="30" step="1" value="${state.protons}"></label><label>Neutrons<input id="neutrons" type="number" min="0" max="40" step="1" value="${state.neutrons}"></label><label>Electrons<input id="electrons" type="number" min="0" max="30" step="1" value="${state.electrons}"></label></div><p class="small">Target: ${e(target.name)}. The picture is symbolic; electrons do not travel on drawn planetary tracks.</p>`;
 }
 if(state.discovery==='separation'){
  const scenario=SEPARATIONS.find(x=>x.id===state.separation)||SEPARATIONS[0];
  body=`<h2>🧪 Rescue the mixture</h2><p>Choose a method to separate the materials. Some mixtures are physical combinations; they do not make a new substance.</p><label class="field" for="separation-pick">Mixture</label><select id="separation-pick">${options(SEPARATIONS.map(x=>[x.id,x.mixture]),state.separation)}</select><div class="separation-visual" aria-hidden="true">🫙 ➜ ❓ ➜ ✨</div><label class="field" for="separation-method">Choose a method</label><select id="separation-method">${options(SEPARATION_METHODS,state.method)}</select><p class="small">Only virtual decisions are modelled here. Real laboratory equipment and substances need appropriate supervision.</p>`;
 }
 if(state.discovery==='rate'){
  const idx=modelCollisionIndex(state);
  const controls=[['temperature','Temperature',20,80,10,'°C'],['concentration','Concentration factor',1,4,1,'×'],['surfaceArea','Exposed surface factor',1,4,1,'×']];
  body=`<h2>🌡️ Reaction race</h2><p>Change factors to investigate collision theory. Start at a model index of 1 and try to increase it.</p><div class="rate-meter"><strong>${idx.toFixed(2)}×</strong><span>Relative collision index · illustrative only</span><div class="rate-bar"><div style="width:${Math.min(100,idx*8)}%"></div></div></div>${controls.map(([id,name,min,max,step,suffix])=>`<label class="field" for="${id}">${name}: <output>${state[id]}${suffix}</output></label><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${state[id]}">`).join('')}<p class="small">Not a simulation of an actual chemical. A faster predicted collision rate is not an exact measured reaction speed.</p>`;
 }
 if(state.discovery==='chromatography'){
  const rf=calculateRf(Number(state.spotDistance),Number(state.solventDistance));
  body=`<h2>🎨 Chromatography explorer</h2><p>A coloured spot travels up a paper strip. Estimate its <strong>Rf</strong> using the spot and solvent-front distances.</p><div class="chromatography-paper" role="img" aria-label="Paper diagram: spot travelled ${state.spotDistance} mm, solvent front ${state.solventDistance} mm"><div class="chromatography-line" style="bottom:${Math.min(90,Math.max(12,state.solventDistance*2))}%">Solvent front</div><div class="chromatography-spot" style="bottom:${Math.min(85,Math.max(9,state.spotDistance*2))}%">●</div><div class="chromatography-base">Start line</div></div><div class="discovery-fields"><label>Spot distance (mm)<input id="spot-distance" type="number" min="0" max="45" step="1" value="${state.spotDistance}"></label><label>Solvent front (mm)<input id="solvent-distance" type="number" min="1" max="45" step="1" value="${state.solventDistance}"></label><label>Your Rf (2 d.p.)<input id="rf-guess" inputmode="decimal" type="number" min="0" max="1" step="0.01" value="${e(state.rfGuess)}"></label></div><p class="small">Rf = distance travelled by spot / distance travelled by solvent front; valid only when the solvent travelled a positive distance and the spot has not passed the front.</p>${rf===null?'<p role="status">Check the two distances.</p>':''}`;
 }
 if(state.discovery==='moles'){
  const target=FORMULA_MASS.find(x=>x.id===state.compound)||FORMULA_MASS[0];
  body=`<h2>⚖️ Mass to moles</h2><p>At GCSE, you can calculate amount of substance: <strong>moles = mass (g) ÷ molar mass (g/mol)</strong>.</p><label class="field" for="compound-pick">Compound</label><select id="compound-pick">${options(FORMULA_MASS.map(x=>[x.id,x.name]),state.compound)}</select><div class="rate-meter"><strong>${target.mr} g/mol</strong><span>Approximate molar mass for ${e(target.name)}</span></div><div class="discovery-fields"><label>Mass (g)<input id="moles-mass" inputmode="decimal" type="number" min="0" max="1000" step="0.5" value="${state.mass}"></label><label>Your answer (mol)<input id="moles-guess" inputmode="decimal" type="number" min="0" max="1000" step="0.01" value="${state.molesGuess}"></label></div><p class="small">Values use rounded GCSE relative atomic masses and are for calculations, not real-life preparation.</p>`;
 }
 const feedback=state.discoveryFeedback?`<div class="feedback ${state.discoveryFeedback.ok?'':'warn'}" role="status">${e(state.discoveryFeedback.message)}</div>`:'';
 return `<div class="eyebrow">Hero Academy · Virtual science</div><h1>🔬 Discovery Workshop</h1><p class="subtitle">Experiment without hazards. Build models, test ideas, use evidence, earn stars. All practicals are virtual.</p>${nav}<div class="lesson-shell"><div class="lesson-card discovery-workspace">${body}<div class="btn-row">${button('✅ Check my discovery','check-discovery','primary')}${button('↺ Reset activity','reset-discovery','secondary')}</div>${feedback}</div><aside class="lesson-card"> <div class="discovery-side-art" aria-hidden="true">🤖 ⚗️ ⭐</div><h2>Science journal</h2><p>Try, measure, compare and improve. Mistakes do not cost stars.</p><p><strong>${solved.length}</strong> discoveries recorded.</p><p class="small">Look for <strong>why</strong> something happens, not only the answer. Some results depend on conditions we haven't modelled.</p><div class="callout warn">Never recreate dangerous mixtures or reactions outside this virtual game.</div></aside></div>`;
}