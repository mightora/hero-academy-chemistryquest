export const ELEMENT_ROWS = [
  ['H','','','','','','','','','','','','','','','','','He'],
  ['Li','Be','','','','','','','','','','','B','C','N','O','F','Ne'],
  ['Na','Mg','','','','','','','','','','','Al','Si','P','S','Cl','Ar'],
  ['K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr'],
  ['Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe'],
  ['Cs','Ba','La','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn'],
  ['Fr','Ra','Ac','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og']
];
export const F_BLOCK = [
  ['Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu'],
  ['Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr']
];
const ORDER = `H Hydrogen,He Helium,Li Lithium,Be Beryllium,B Boron,C Carbon,N Nitrogen,O Oxygen,F Fluorine,Ne Neon,Na Sodium,Mg Magnesium,Al Aluminium,Si Silicon,P Phosphorus,S Sulfur,Cl Chlorine,Ar Argon,K Potassium,Ca Calcium,Sc Scandium,Ti Titanium,V Vanadium,Cr Chromium,Mn Manganese,Fe Iron,Co Cobalt,Ni Nickel,Cu Copper,Zn Zinc,Ga Gallium,Ge Germanium,As Arsenic,Se Selenium,Br Bromine,Kr Krypton,Rb Rubidium,Sr Strontium,Y Yttrium,Zr Zirconium,Nb Niobium,Mo Molybdenum,Tc Technetium,Ru Ruthenium,Rh Rhodium,Pd Palladium,Ag Silver,Cd Cadmium,In Indium,Sn Tin,Sb Antimony,Te Tellurium,I Iodine,Xe Xenon,Cs Caesium,Ba Barium,La Lanthanum,Ce Cerium,Pr Praseodymium,Nd Neodymium,Pm Promethium,Sm Samarium,Eu Europium,Gd Gadolinium,Tb Terbium,Dy Dysprosium,Ho Holmium,Er Erbium,Tm Thulium,Yb Ytterbium,Lu Lutetium,Hf Hafnium,Ta Tantalum,W Tungsten,Re Rhenium,Os Osmium,Ir Iridium,Pt Platinum,Au Gold,Hg Mercury,Tl Thallium,Pb Lead,Bi Bismuth,Po Polonium,At Astatine,Rn Radon,Fr Francium,Ra Radium,Ac Actinium,Th Thorium,Pa Protactinium,U Uranium,Np Neptunium,Pu Plutonium,Am Americium,Cm Curium,Bk Berkelium,Cf Californium,Es Einsteinium,Fm Fermium,Md Mendelevium,No Nobelium,Lr Lawrencium,Rf Rutherfordium,Db Dubnium,Sg Seaborgium,Bh Bohrium,Hs Hassium,Mt Meitnerium,Ds Darmstadtium,Rg Roentgenium,Cn Copernicium,Nh Nihonium,Fl Flerovium,Mc Moscovium,Lv Livermorium,Ts Tennessine,Og Oganesson`;
const metas=ORDER.split(',').map((s,i)=>{let [symbol,...parts]=s.split(' ');return {number:i+1,symbol,name:parts.join(' ')}});
const METALLOIDS = new Set(['B','Si','Ge','As','Sb','Te']);
const NONMETALS = new Set(['H','C','N','O','P','S','Se']);
const POST_METALS = new Set(['Al','Ga','In','Sn','Tl','Pb','Bi','Po','Nh','Fl','Mc','Lv']);
const GASES = new Set(['H','He','N','O','F','Ne','Cl','Ar','Kr','Xe','Rn']);
const SYNTHETIC_LATE = new Set(['Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og']);
function family(symbol,number,group){
 if(number>=58&&number<=71) return 'Lanthanide';
 if(number>=90&&number<=103) return 'Actinide';
 if(group===18) return 'Noble gas';
 if(group===17) return 'Halogen';
 if(group===1&&symbol!=='H') return 'Alkali metal';
 if(group===2) return 'Alkaline earth metal';
 if(METALLOIDS.has(symbol))return 'Metalloid';
 if(NONMETALS.has(symbol))return 'Non-metal';
 if(POST_METALS.has(symbol))return 'Post-transition metal';
 if(group>=3&&group<=12) return 'Transition metal';
 return 'Metal';
}
export const ELEMENTS=metas.map(e=>{
 let period=0,group=0;
 ELEMENT_ROWS.forEach((row,i)=>{let idx=row.indexOf(e.symbol);if(idx>=0){period=i+1;group=idx+1;}});
 F_BLOCK.forEach((row,i)=>{if(row.includes(e.symbol)){period=i+6;group=0;}});
 return {...e,period,group,family:family(e.symbol,e.number,group),state:SYNTHETIC_LATE.has(e.symbol)?'not established':GASES.has(e.symbol)?'gas':(['Br','Hg'].includes(e.symbol)?'liquid':'solid')};
});
export const ELEMENT_BY_SYMBOL=Object.fromEntries(ELEMENTS.map(e=>[e.symbol,e]));
export const LAB_ITEMS=[
 ['water','Water 💧'],['salt','Salt 🧂'],['sand','Sand 🏖️'],['oil','Cooking oil 🫗'],
 ['sugar','Sugar 🍬'],['colour','Food colouring 🎨'],['vinegar','Vinegar 🧴'],['bicarbonate','Bicarbonate of soda 🥄'],
 ['iron','Iron 🧲'],['oxygen','Oxygen (gas) 🌬️'],['hydrogen','Hydrogen (gas) 🫧'],['carbon','Carbon ⚫'],
 ['magnesium','Magnesium ⚙️'],['chlorine','Chlorine (gas) 🟡'],['sodium','Sodium metal 🟪'],['nitrogen','Nitrogen (gas) 🌫️']
];
// Each pair is a curated virtual example. Conditions are described conceptually, not as instructions.
export const LAB_REACTIONS=[
 ['water','salt','dissolve','The salt disperses through the water. You have a solution, not a new substance.','NaCl(s) → Na⁺(aq) + Cl⁻(aq) (simplified dissolution)'],
 ['water','sugar','dissolve','Sugar dissolves, but sugar molecules remain sugar molecules.','Sugar + water → sugar solution (physical change)'],
 ['water','sand','mixture','The sand does not dissolve; a filter could separate it.','Water + sand → mixture'],
 ['water','oil','mixture','Oil and water do not mix uniformly. You will usually see layers.','Water + oil → two-phase mixture'],
 ['water','colour','dissolve','Colour spreads through the water. Different dyes have different solubilities.','Dye + water → coloured mixture'],
 ['vinegar','bicarbonate','reaction','An acid–carbonate reaction makes carbon dioxide bubbles and other products.','Ethanoic acid + sodium hydrogencarbonate → sodium ethanoate + water + carbon dioxide'],
 ['iron','oxygen','reaction','Iron can form oxides over time. Rusting usually also involves water, so simply placing them together may show no immediate change.','Iron + oxygen (with suitable conditions) → iron oxides'],
 ['hydrogen','oxygen','reaction','Hydrogen can react with oxygen to form water under suitable conditions. This mixture can be explosive: virtual simulation only.','2H₂ + O₂ → 2H₂O'],
 ['carbon','oxygen','reaction','Carbon can form carbon dioxide through complete combustion in oxygen. A reaction needs suitable conditions.','C + O₂ → CO₂'],
 ['magnesium','oxygen','reaction','Magnesium can form magnesium oxide through oxidation; burning magnesium is hazardous to watch directly.','2Mg + O₂ → 2MgO'],
 ['sodium','chlorine','reaction','Sodium and chlorine can react to make sodium chloride. The elements are hazardous; this is not an experiment to try.','2Na + Cl₂ → 2NaCl'],
 ['nitrogen','hydrogen','reaction','Nitrogen and hydrogen can produce ammonia under specialised industrial conditions. Simply mixing them does not make ammonia.','N₂ + 3H₂ ⇌ 2NH₃'],
];
const LAB_INDEX = new Map(LAB_REACTIONS.map(r=>[[r[0],r[1]].sort().join(':'),{left:r[0],right:r[1],type:r[2],detail:r[3],equation:r[4]}]));
export const lookupReaction=(a,b)=>LAB_INDEX.get([a,b].sort().join(':'))||null;
export const EQUATIONS=[
 {name:'Make water',terms:[['H2',1],['O2',1],['H2O',-1]],answer:[2,1,2],hint:'Two H₂ molecules give four H atoms. You need two H₂O molecules.'},
 {name:'Magnesium oxide',terms:[['Mg',1],['O2',1],['MgO',-1]],answer:[2,1,2],hint:'O₂ contains two O atoms, so make two units of MgO.'},
 {name:'Sodium chloride',terms:[['Na',1],['Cl2',1],['NaCl',-1]],answer:[2,1,2],hint:'Cl₂ contains two Cl atoms. Use two Na atoms and two NaCl units.'},
 {name:'Iron(III) oxide',terms:[['Fe',1],['O2',1],['Fe2O3',-1]],answer:[4,3,2],hint:'Two Fe₂O₃ contain four iron atoms and six oxygen atoms.'},
 {name:'Methane combustion',terms:[['CH4',1],['O2',1],['CO2',-1],['H2O',-1]],answer:[1,2,1,2],hint:'One carbon gives one CO₂; four hydrogens give two H₂O.'},
 {name:'Ammonia synthesis',terms:[['N2',1],['H2',1],['NH3',-1]],answer:[1,3,2],hint:'N₂ needs two NH₃ units, which together need six H atoms.'}
];
export function parseSimpleFormula(formula){
 const out={}; let consumed='';
 for(const match of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)){
  consumed+=match[0];out[match[1]]=(out[match[1]]||0)+Number(match[2]||1);
 }
 if(consumed!==formula) throw new Error('Unsupported chemical formula: '+formula);
 return out;
}
export function atomBalance(equation,coefficients){
 const left={},right={};
 if(coefficients.length!==equation.terms.length) throw new Error('Coefficient length mismatch');
 equation.terms.forEach(([formula,side],i)=>{
  if(!Number.isInteger(coefficients[i])||coefficients[i]<1)throw new Error('Coefficients must be positive integers');
  const into=side===1?left:right;
  for(const [symbol,n] of Object.entries(parseSimpleFormula(formula)))into[symbol]=(into[symbol]||0)+n*coefficients[i];
 });
 const symbols=[...new Set([...Object.keys(left),...Object.keys(right)])];
 return {left,right,balanced:symbols.every(s=>left[s]===right[s])};
}