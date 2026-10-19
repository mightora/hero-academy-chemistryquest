# Curriculum coverage and implementation plan

**Jurisdiction:** England (Department for Education). **Scope:** Chemistry-related science and working scientifically, Year 4 through Year 11. The national curriculum is organised by stages for KS3 and KS4; year-level splits beyond KS2 are locally chosen. This document is an engineering content map, not a representation of official school sequencing.

**Status key:** ✅ appears in the playable prototype; ◐ introduced as a short question but needs fuller teaching/practical coverage; ☐ planned content missing. The current game contains 80 micro-lessons, 160 authored question prompts (seven finales replaced by interactive tasks), six atom-balance puzzles, 12 virtual pairs and a 118-element explorer. Mere appearance does **not** establish curriculum mastery.

## KS2

| School year | Statutory chemistry-related requirements / cross-curricular science | Prototype coverage | Next investment |
|---|---|---|---|
| 4 | Identify solids/liquids/gases; heating and cooling / state changes; melting/freezing temperatures; evaporation/condensation in water cycle; temperature affects evaporation; measure/record observations | ✅ 10 micro-lessons, particle model | Temperature measurement, water-cycle explorer and repeated observations |
| 5 | Material properties: hardness, solubility, transparency, conductivity, magnetism; solutions; recovery of dissolved solids; filtration, sieving, evaporation; suitability of materials; reversible/irreversible changes incl burning and acid/bicarbonate | ✅ 10 micro-lessons, some virtual mixtures | Filtering/sieving simulations, experimental predictions, systematic evidence and safety |
| 6 | No separate statutory Year 6 chemistry content. Working scientifically across Years 5–6: variables, fair tests, accurate measures, graphs, evidence, conclusions, repeat readings | ✅ 10 reinforcement / scientific enquiry micro-lessons | Multi-step investigation planner and data-analysis mission |

## KS3 (suggested Years 7–9)

| National curriculum strand | Example curriculum requirements | Prototype | More work |
|---|---|---|---|
| Particulate nature of matter | Solids/liquids/gases, pressure, particle model, change of state | ✅ | Particle density/gas pressure models |
| Atoms, elements and compounds | Atomic model, formulae, conservation of mass | ✅ | Nuclide models and mastery checks |
| Pure and impure substances | Mixtures, diffusion, filtration, evaporation, distillation, chromatography and purity | ◐ | Fractional distillation, quantitative chromatograms |
| Chemical reactions | Atom rearrangement; formulae and equations; combustion, decomposition, oxidation, displacement; acids, alkalis, pH, indicators, neutralisation, metal + acid; catalysts | ◐ | Thermal decomposition, metal + acid gas tests, more process-based simulations |
| Energetics | Qualitative endothermic and exothermic; phase-change energy | ✅ | Calorimetry model and measuring changes |
| Periodic table | Mendeleev, groups and periods, metals/non-metals, trends, oxides | ◐ | Historical classification, trends and oxide acidity |
| Materials | Reactivity series, carbon extraction, ceramics, polymers, composites | ◐ | Extraction and materials engineering puzzles |
| Earth and atmosphere | Earth composition and structure, rock cycle, finite resources, recycling, atmosphere composition, CO2 and climate impact | ◐ | Mine-to-product life cycle and atmospheric model |
| Working scientifically | Controlled experiments; planning, variables, hazards, measures, graphs, errors | ◐ | Rich interactive experiment and data-analysis engine |

Some matter topics overlap physics in the KS3 national curriculum; ChemistryQuest can cross-link without claiming to cover the full physics programme.

## KS4 / GCSE (suggested Years 10–11)

The prototype's Years 10 and 11 contain 20 first-exposure missions. Complete GCSE specification coverage is **not yet implemented**. All ten AQA Chemistry 8462 domains below are targets; separate/combined, foundation/higher and required practical designations must be tracked on each lesson in a future data schema.

| AQA 8462 domain | Prototype | Key features still required for fuller coverage |
|---|---|---|
| 4.1 Atomic structure and periodic table | ✅ | Atomic models and discovery/history; isotopes, electron structure, trends and groups |
| 4.2 Bonding, structure, properties of matter | ◐ | Ionic lattice, covalent structures, metallic bonding, nanoparticles and carbon allotropes |
| 4.3 Quantitative chemistry | ◐ | Relative formula mass, moles, limiting reactants, yield, atom economy, volumes, concentration calculations |
| 4.4 Chemical changes | ◐ | Extraction, full reactivity series, metals/acids, salt production, strong/weak acids, electrolysis products, half equations |
| 4.5 Energy changes | ◐ | Reaction profiles, bond energy calculations, chemical cells and fuel cells |
| 4.6 Rate and extent of chemical change | ◐ | Collision-theory simulations, measurement of reaction rate, reversible changes, equilibrium shifts and industrial conditions |
| 4.7 Organic chemistry | ◐ | Crude oil and fractionating column, alkanes/alkenes, cracking, alcohols, carboxylic acids, esters, polymers and natural polymers where in specification |
| 4.8 Chemical analysis | ◐ | Purity, formulation, Rf, gas/ion identification, instrumental methods and correct interpretation |
| 4.9 Chemistry of atmosphere | ◐ | Evolution of atmosphere, greenhouse gases, carbon footprint, pollutants, effects and evidence |
| 4.10 Using resources | ◐ | Potable water, sewage, waste water, life-cycle assessments, corrosion, alloys, ceramics, composites, industrial processes and fertilisers |

### Required practicals (AQA GCSE Chemistry 8462)

8 experiences should have **virtual practice companions** while explicitly stating that they **do not replace school practical work**:

1. Making a pure dry soluble salt.
2. Neutralisation titration (Separate Chemistry).
3. Electrolysis of aqueous solutions.
4. Temperature change in reactions.
5. Effect of concentration on rate of reaction.
6. Paper chromatography / Rf.
7. Identifying ions in unknown salts (Separate Chemistry).
8. Analysis and purification of water samples.

These practicals involve equipment, chemicals and safety judgements. ChemistryQuest should teach concepts, planning, observations and data interpretation using a **controlled virtual model**, not step-by-step unsupervised real-world instructions.

## Learning design for a mature release

- Age selection defaults to the relevant world but never permanently locks other years. Learners have differing prior knowledge.
- Every concept should have a **picture-led introduction, interactive demonstration, 3–5 varied low-stakes checks, a meaningful final mission, spaced retrieval** and an optional word/explanation glossary.
- Early years: simple images, short sentences, voice on demand; KS3: vocabulary, particle diagrams, comparison tests; GCSE: full notation, mathematical working and evaluation.
- A positive, visual outcome follows mastery: waterwheel runs, bridge rises, town lights up. Do not award high-stakes 'mastery' from one correct response.
- Save content `curriculumCode`, `specification`, `tier`, `objective`, `misconception`, `prerequisites`, `workingScientifically`, `virtualPracticalId` and `lastTeacherReviewed` as the bank grows.
- Evaluate with teachers and young learners, including those needing additional reading support. Maintain UK English, optional en-GB voice and never make audio compulsory.
- Ensure unusual, dangerous or uncontrolled combinations are never modelled as 'safe to try'. Avoid falsely implying that mixing two elements automatically forms a compound.

## Authoritative links

- https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study
- https://www.gov.uk/government/publications/gcse-single-science
- https://www.gov.uk/government/publications/gcse-combined-science
- https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/subject-content
- https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/practical-assessment

## Discovery workshop additions (v0.2)

The Molecule maker checks atom counts only and does **not** model bonding, molecule geometry, electron shells or a general chemical synthesis predictor. Atom workshop checks neutral protons/electrons; the symbolic picture is not a literal planetary model. Separation station offers five curated cases (filtration, crystallisation, chromatography, fractional distillation, magnetism). Rate explorer compares a **toy relative index**, not a kinetic law. Chromatography and mass-to-moles use numerically validated examples and common GCSE approximations. Each discovery has optional stars and local per-hero records. This does not mean all lessons, equations or practical assessments are complete.