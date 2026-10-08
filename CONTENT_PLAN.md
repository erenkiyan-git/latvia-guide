# Latvia Guide Content Plan

## 1. Current Content Gaps
Based on an audit of the current structure:
- **Depth:** Currently only 9 brief guide files exist. Most topics are missing entirely.
- **Frontmatter Schema:** The content config needs to be updated to support the new fields: `reviewIntervalMonths`, `audience`, `relatedGuides`, `tags`, and `keywords`.
- **Content Types:** Missing scenario guides, "common mistakes" series, glossary, fees overview, planning checklists, and changelog.
- **Components:** Need to build new Astro/React components: `QuickAnswer`, `DocumentChecklistTable`, `StepList`, `FAQ` (expandable), `FoundersNote`, `OfficialSourceList`, `RelatedGuides`, `TableOfContents`, and `PrintView` styles.
- **Translation:** Turkish guides are mostly missing, and the framework for fallback needs verification.
- **Trust Badge:** The "verified" badge requires the `lastChecked` date, backed by a `SOURCES.md` audit trail.

## 2. Proposed Full Page List Per Section

### Module 1: Visas, Residence Permits & Documents (Based on PMLP)
*Hub Page:* Visas, Residence Permits & Documents in Latvia
*Core Concepts:*
- Short-stay (Schengen) visa vs long-stay national visa vs residence permit
- Schengen 90/180 rule explained
- Visa-free countries
- Where and how to apply
- Biometrics, fingerprints, photos
*EU/EEA/Swiss Citizens:*
- Right to stay and registration rules
*Third-country Nationals:*
- Student residence permit
- Work residence permit
- Family reunification
- Self-employed / business routes
- Digital nomad visa
- Researcher and other categories
- Permanent residence and long-term EU resident status
*After approval and during stay:*
- Collecting the residence permit card and address declaration
- Changing status, employer, or university
- Leaving Latvia and re-entering
- Foreigner's eID card, e-signature, e-address, latvija.gov.lv
*Supporting Document Guides:*
- Apostille and legalisation
- Sworn translations and certified copies
- Criminal record certificates
- Proof of funds, accommodation, health insurance
- Passport photo requirements
- Fixing a rejection or additional documents request
- Overstay and visa problems
- Scams and fake agents warning
- Country-specific notes (Turkey)
*Extra:* Printable Document Checklists, Glossary of immigration terms, Fees & official charges.

### Module 2: Deepening Other Sections

*Students:*
- Choosing a university
- Application timeline and documents
- Diploma recognition (AIC)
- Student dorms vs private rent
- Student discounts and cards
- Working while studying
- Low-budget living
- Erasmus-specific guide
- First-week tasks for students
- Common student mistakes

*Work:*
- Job market overview
- How to search for a job
- Writing a Latvian-style CV and cover letter
- Interview and workplace culture
- Employment contracts explained
- Probation, working hours, leave, notice
- Employee rights (State Labour Inspectorate)
- Taxes on salary overview
- Social contributions overview (VSAOI)
- Tax booklet and annual return basics
- Minimum wage
- Freelancing and self-employment
- Spouse/family work rights
- Job-scam warnings

*Housing:*
- Where to search and how to view an apartment
- Scam red flags
- Rental contract checklist
- Deposit, cold rent vs utilities
- Heating and winter bills
- Tenant and landlord rights
- Moving in and out checklist
- Internet and utilities setup
- Neighbourhood guides (Riga, major cities)
- Student housing

*Daily Life:*
- SIM/mobile and internet
- Banking
- Money transfers
- Groceries and supermarkets
- Pharmacies
- Post and parcels
- Waste sorting and recycling
- Pets
- Childcare and schools
- Taxes overview
- Winter survival guide
- Culture and etiquette
- Public holidays
- Cost of living guide

*Transport:*
- Riga public transport
- Airport to city
- Intercity trains and buses
- Taxis and ride apps
- Cycling and e-scooters
- Driving: licence exchange
- Registering a car and compulsory insurance
- Winter tyres, parking, fines

*Healthcare:*
- How the system works (NVD)
- Registering with a family doctor
- Insurance basics
- EHIC
- Private clinics
- Pharmacies and prescriptions
- Emergency vs urgent care
- Mental health resources
- Dental
- Vaccinations

*Travel:*
- Day trips and weekend trips from Riga
- Seasonal guides
- Baltic travel tips
- Family-friendly and budget guides

*Basic Latvian:*
- Survival phrases by situation
- Pronunciation hints
- Free learning resources

*Emergency:*
- Quick reference contacts

### Module 3: Extra Content Types
- Scenario guides (e.g. "Can I open a bank account before my permit arrives?")
- "Common mistakes" series per audience
- Glossary page
- Fees & official charges page
- "Before you move" planning pages
- "Last updated" changelog page

## 3. Estimated Pages Per Batch
- **Batch 1:** ~12 pages (Visa hub + core concepts + EU registration + after-arrival)
- **Batch 2:** ~15 pages (Student, work, family routes + checklists)
- **Batch 3:** ~15 pages (Other permit routes, supporting docs, overstay, scams, glossary, fees, Turkey)
- **Batch 4:** ~20 pages (Students and Work sections)
- **Batch 5:** ~15 pages (Housing and Daily Life sections)
- **Batch 6:** ~15 pages (Transport, Healthcare, Travel, Basic Latvian, Emergency)
- **Batch 7:** ~10 pages (Scenario guides, common mistakes, checklists, changelog)
- **Batch 8:** Turkish translations of the above.

## 4. Questions and Risks
- **Risk:** Some processing times or fees may be difficult to pin down strictly on official sites (e.g. variations between embassies). In these cases, we will use "Check the official source" as requested.
- **Risk:** Finding exact minimum monthly funds for all categories (student, family, nomad) on PMLP might be tricky. If not found, they will be left out or marked as unverified.
- **Question:** Should we deploy any of these changes to production as we go, or just keep them all on the `content-expansion` branch until the very end? (I assume keep on branch until Handover).
