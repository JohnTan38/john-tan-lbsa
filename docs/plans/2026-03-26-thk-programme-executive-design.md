# THK Programme Executive — Design Doc
**Date:** 2026-03-26
**Target role:** Programme Executive, Thye Hua Kwan Moral Charities (THKMC)
**Vercel URL:** `john-tan-program-executive.vercel.app`

---

## 1. Architecture

### Role Structure
```
/ (no param)   → THK Programme Executive (default)
/?role=lbsa    → LBSA Programme Executive
```
- `?role=automation` ignored / falls back to THK default
- Retirement pattern: `resume.ts` kept on disk as silent archive (not surfaced in UI)

### Approach
Option B — new `resumeTHK.ts`, retire automation from switcher. Mirrors TOUCH → LBSA retirement pattern exactly.

### Files Changed
| File | Change |
|---|---|
| `src/data/resumeTHK.ts` | **New** — THK resume data |
| `src/lib/roleContext.tsx` | `Role = 'thk' \| 'lbsa'`; THK default; swap `resume` import for `resumeTHK` |
| `src/app/globals.css` | Add `[data-role="thk"]` CSS token block |
| `src/components/Sidebar/Sidebar.tsx` | Update role label, switcher text, PDF path |
| `public/assets/` | Add `John_Tan_Resume_THK.pdf` (Python script) |
| `scripts/generate_thk_pdf.py` | **New** — PDF generation script |
| `resume.ts` | No change — silent archive |
| All 9 page components | No change — already consume `useRole().resumeData` |

### Sidebar Switcher
- THK mode: `"LBSA →"` → `/?role=lbsa`
- LBSA mode: `"THK →"` → `/`

### Vercel
New project: `john-tan-program-executive.vercel.app`. Existing `john-tan-automation-specialist.vercel.app` untouched.

---

## 2. THK Color Palette

THK corporate identity: **dark blue + red**

| Token | THK Value |
|---|---|
| `--navy` | `#1a2557` |
| `--navy-dark` | `#0d1840` |
| `--navy-mid` | `#253680` |
| `--gold` (accent = red) | `#c41e3a` |
| `--gold-light` | `#e05070` |
| `--gold-dim` | `#a01830` |
| `--surface` | `#fafbff` |
| `--border` | `#e8eaf6` |
| `--hero-gradient` | `135deg, #0d1840 0%, #253680 60%, #1a2557 100%` |

---

## 3. Resume Content Strategy

### Core Pivot Narrative
John's programme coordination and stakeholder management experience maps directly to THKMC's dual focus: **outreach to seniors** and **volunteer development**. WSQ Diploma's Volunteer Programme Management module is the anchor credential.

### Title & Tagline
- **Title:** `Programme Executive | Volunteer Development & Community Outreach`
- **Tagline:** `Outreach Programme Execution · Volunteer Development · Stakeholder Engagement · Community Empowerment`

### Summary
Career-transition professional leveraging 6+ years of programme coordination and stakeholder management to serve THKMC's 70,000+ beneficiaries — equipped to execute outreach plans, develop volunteer networks, and ensure performance against MOH/AIC/MSF indicators. WSQ Diploma in Social Service (Tsao Foundation, SCTP) grounds understanding of volunteer management principles and community outreach strategy.

### Competencies
**Leadership:**
1. Outreach Planning, Execution & Follow-up Visits
2. Volunteer Recruitment, Screening & Orientation
3. Stakeholder Engagement & Community Partner Networks
4. Mutual Help Group Facilitation & Senior Empowerment

**Technical:**
1. Programme Planning, Implementation & Evaluation
2. KPI Monitoring & MOH/AIC/MSF Compliance Reporting
3. Budget Documentation & Financial Record-keeping
4. Microsoft Office & Digital Programme Tools

**Social Service:**
1. Volunteer Programme Management (WSQ Diploma module)
2. Community Outreach Strategy & Senior Registration
3. Ethics, Legislation & Social Policy (WSQ)
4. Needs Assessment & Vulnerable Senior Support

### Experience Content Rewrites

**Cogent Holdings (2022–Present) — Community Engagement & Outreach Lead**
1. Outreach campaign execution — led structured outreach engaging 50+ external partners, systematic follow-up cadence directly applicable to THKMC's block-by-block senior registration and outreach plan execution
2. Community partner network building — established relationships with grassroots, corporate organisations and schools to build sustainable volunteer pipeline for programme delivery
3. Volunteer coordination & orientation — designed and delivered volunteer onboarding programmes, achieving 40% improvement in role-readiness; serves as key communication link between programme and volunteers

**ST Engineering (2019–2022) — Programme Coordinator (Planning & Evaluation)**
1. End-to-end programme planning — coordinated 3 complete programme cycles from needs identification through design, implementation, monitoring, and post-programme evaluation
2. KPI reporting & data collection — built structured data collection frameworks tracking performance indicators across multiple units; maps to THKMC's MOH/AIC/MSF reporting requirements
3. Process documentation & compliance — maintained meticulous financial records and full documentation of all expenditures; audit-ready budget management

**ABN AMRO (2016–2019) — Client Relations & Operations**
1. 3+ years budget & stakeholder management — managed $500M+ AUM portfolios and multi-stakeholder relationships; directly meets JD's experience requirement
2. External partnership development — developed and maintained relationships with institutional partners and community bodies across diverse sectors
3. Cross-functional communication — served as key liaison between operations, compliance and client-facing teams; mirrors THKMC's AAC–volunteer communication requirements

### Vision Sections
1. **Integrated Senior Outreach** — Systematic block-by-block senior registration and follow-up visit programme; establish and grow mutual help groups that sustain themselves beyond staff involvement
2. **Volunteer Ecosystem** — Structured recruitment pipeline from grassroots, schools, and corporates; tiered orientation programme ensuring volunteers are matched, supported, and retained long-term
3. **Data-Driven Community Partnership** — KPI-led programme evaluation feeding continuous improvement; community partner network spanning public, private, and educational sectors to amplify THKMC's reach

### Education Highlights
- WSQ Diploma in Social Service — **Volunteer Programme Management** module + Social Policy + Stakeholder Management (Tsao Foundation / Hua Mei, SCTP — enrolled)
- 16-day AAC fieldwork — outreach, needs assessment, senior tiering (LBSA context; transferable to THKMC's AAC model)

---

## 4. Tests to Update
- `src/__tests__/navigation.test.ts` — update role references: `automation` → `thk`, import `resumeTHK`
- `src/__tests__/resume-download-route.test.ts` — verify THK PDF path

## 5. Deployment
1. Push to master
2. Create new Vercel project linked to same repo
3. Set project name / domain: `john-tan-program-executive`
4. Deploy
