# Hero Academy ChemistryQuest: The Elemental Adventure

**Status: expanded playable browser game (v0.2).** Not yet hosted, teacher-approved, certified accessible, or a complete GCSE teaching course. The code is independent of all other Hero Academy games and does not change them.

ChemistryQuest is an original, illustrated science adventure using Hero Academy's shared cream, teal, muted-green, orange and yellow palette, Pip the robot companion, and superhero illustration style. The original shield SVG is copied from `mightora/hero-academy-reading/dist/icon.svg` with brand-owner context; no third-party artwork is bundled.

## Play

Download/extract this repository and run a static file server:

```sh
cd chemistryquest
python3 -m http.server 8000 --directory dist
# visit http://localhost:8000
```

Node 22 or later runs the zero-dependency tests:

```sh
npm test
npm run check
```

The deployed web files are **all** in `dist/`. GitHub Pages: in repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The app uses ES modules and must be served over HTTP(S), not opened directly using `file://`. No backend, build, cookies, network APIs, trackers, adverts, fonts, API keys, or third-party scripts. The only outgoing link points to the Hero Academy homepage.

## What works now

- **8 selectable worlds** covering Years 4–11 (suggested progression) with **80 missions**, each with an explanation, practice and a final challenge, help, immediate feedback and permanent local completion. Seven challenge finales use hands-on tasks (temperature, virtual mixing, element identification, atom balancing or Rf calculation) rather than ordinary multiple-choice questions.
- **118-element periodic table**, real atomic numbers, familiar element families and room-temperature state guidance; search and mobile horizontal table scrolling.
- **12 curated virtual combinations** modelling dissolution, mixtures and chemical changes. Unknown pairs are **not** guessed. Examples explain when reaction conditions matter. Never attempt dangerous real combinations. No experimental recipes are supplied.
- **Particle Playground** for water using a simple temperature slider and a visually simplified model.
- **6 balance-the-equation puzzles** with atom conservation checks, hints, and example equations.
- **Six discovery workshop simulations:** molecule composition, neutral atoms, choosing separation methods, collision-theory rate comparisons, paper chromatography Rf and GCSE mass-to-moles calculations. These are controlled teaching models, not exact chemistry engines.
- **Stars** for first quest completion, first successful prediction per modelled reaction, and first balanced equation; no failure penalties, timers, adverts, streaks or purchase prompts.
- Up to 12 local hero profiles, localStorage saves, JSON backup export/import, a parent/teacher curriculum index, optional browser speech (en-GB preference), reduced-motion settings and a mobile-friendly layout.

## What is deliberately NOT claimed

- Year 7–9 and GCSE science content is defined by key stage / qualification, not centrally allocated to particular year groups. The game assigns its own progression.
- **Year 6 has no separate statutory materials/chemistry unit**; the Year 6 world revisits materials plus working scientifically from upper KS2.
- The GCSE map is **an introductory coverage scaffold**, not comprehensive objective-level coverage. Two questions per mission are inadequate for mastery, higher-tier calculations or examination preparation.
- The AQA GCSE Chemistry 8462 topics are used as a reference, but Combined Science, Separate Science, AQA/Edexcel/OCR, Foundation/Higher and specification changes require teacher validation and topic-by-topic content expansion.
- The virtual lab is conceptual and is **not** a scientific reaction predictor or a substitute for supervised school practicals. Different conditions and safety considerations can change outcomes.
- Voice uses browser speech synthesis (not the planned shared Hero Academy voice API); it only plays on request and voice quality depends on the device.
- Local saves are not synchronised to ChoreQuest and do not represent real-life chore points. Integration requires an authenticated, verified ChoreQuest protocol and security review.
- This repository uses GitHub Pages Actions for a static production deployment. Custom DNS and ChoreQuest integration are separate and have not been configured by this code.

## Suggested repository and hosting

- Repository: `mightora/hero-academy-chemistryquest`.
- Suggested URL: `chemistryquest.heroacademy.app`.
- Hosting: GitHub Pages from `/dist` using the included optional workflow (copy to new repository first). The workflow uses public static assets and checks before deploy.
- The Hero Academy homepage can add ChemistryQuest when the new game is live; no home page files are modified here.

## Release checkpoints

1. Have a qualified UK science teacher review learning claims, GCSE syllabus coverage, the element-family labels, equations and age bands. Add objectives and misconceptions to every mission.
2. Expand 80 micro-lessons into full guided units with multiple changing question sets, teaching diagrams, retrieval practice and end-of-unit assessments. The roadmap in `CURRICULUM.md` prioritises missing objectives.
3. Add safe simulations of chromatography, distillation, reaction rates, titration, flame tests, electrolysis and calorimetry, carefully separating virtual instruction from supervised real-lab practice.
4. Perform formal WCAG checks, live tests on iPhone/Android/iPad, dyslexia-friendly reading review, voice validation and child-safety review.
5. Integrate with ChoreQuest only once its secure, supported game linking mechanism is verified; keep chemistry game rewards separate from money/pocket-money balances.
6. Set up dedicated GitHub repo, deployment, domain, security checks and site policies; verify production with automated HTTP and browser checks.

## Curriculum references

- [DfE statutory national curriculum in England: science programmes of study](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study)
- [DfE GCSE chemistry and separate science subject content](https://www.gov.uk/government/publications/gcse-single-science)
- [DfE GCSE combined science subject content](https://www.gov.uk/government/publications/gcse-combined-science)
- [AQA GCSE Chemistry 8462 detailed subject content](https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/subject-content)
- [AQA GCSE Chemistry 8462 required practical activities](https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/practical-assessment)

This work follows the Hero Academy brand guide in `mightora/hero-academy-reading/BRAND.md`. No independent open-source licence is selected.