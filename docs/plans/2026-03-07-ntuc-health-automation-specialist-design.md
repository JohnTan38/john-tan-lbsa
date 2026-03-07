# Design: NTUC Health Automation Specialist Resume App

**Date:** 2026-03-07
**Target Role:** Automation Specialist, NTUC Health Co-operative Limited
**Deploy URL:** john-tan-automation-specialist.vercel.app

---

## Architecture

- **New project folder:** `C:/Users/admin/superpowers-automation/` (sibling to `superpowers/`)
- **Stack:** Next.js 14 + TypeScript, Framer Motion, CSS Modules
- **Colour scheme:** Navy/gold (identical vars to `superpowers`)
- **Vercel org:** team_cX9wdAqzyd9PZPsjcYQ83I3y
- **Vercel project name:** john-tan-automation-specialist

---

## Source Strategy

Copy the entire `superpowers/` directory into `superpowers-automation/`, then:
1. Replace `src/data/resume.ts` with NTUC Health content
2. Update `src/app/layout.tsx` metadata (title, description)
3. Update Sidebar subtitle ("Automation Specialist · NTUC Health")
4. Update VisionPage section heading
5. Update PDF download filename in Sidebar
6. Update `package.json` name to `john-tan-automation-specialist`
7. Remove old `.vercel/project.json` so Vercel creates a new project

---

## Page-by-Page Content

### Home / Hero
- Name: John Tan
- Title: `Automation Specialist | Healthcare Digital Transformation`
- Tagline: `UiPath · Google Cloud · RPA · Python · C# · JavaScript`
- Contact: same (email, LinkedIn, phone, new website URL)

### Summary
- Tagline: `"Enterprise RPA Architect | UiPath Developer | Healthcare Process Innovation"`
- Body: Emphasises 3+ years RPA/UiPath, Google Workspace/GCP integration,
  multi-language proficiency (Python, C#, VBA, JavaScript, PHP), healthcare
  domain awareness (WSQ Diploma, eldercare), finance system expertise
- Stats: `3+ Yrs RPA` · `50%+ Efficiency` · `5+ Languages` · `3 Enterprise Integrations`

### Competencies
| Column | Items |
|---|---|
| RPA & Automation | UiPath (Design/Dev/Deploy), UiPath Orchestrator, Google Apps Script, Workflow Design, RPA SDLC |
| Programming & Integration | Python, JavaScript, C#, VBA, PHP, SQL, WordPress, GCP, Google Workspace |
| Domain Knowledge | Healthcare Finance, Government Portal Integration, Documentation & Training, Stakeholder Management |

### Experience

**Cogent Holdings Pte Ltd — Generative AI Engineer (2022–Present)**
- Architected Google Workspace automation workflows reducing manual effort by 30%; designed Python/JavaScript scripts integrating data pipelines with GCP
- Built end-to-end process documentation enabling 40% faster team onboarding; applied SDLC practices for iterative automation deployment
- Collaborated with cross-functional stakeholders to gather requirements and translate business needs into automated solutions

**ST Engineering — Software Engineer (2019–2022)**
- Led 3 complete UiPath RPA SDLC projects achieving 50%+ operational efficiency; managed UiPath Orchestrator scheduling, monitoring, and troubleshooting
- Developed C#, Python, and VBA scripts to extend UiPath automation capabilities; debugged and optimised automation workflows for peak performance
- Produced comprehensive process documentation and delivered end-user training on automated workflows; ensured full SDLC compliance

**ABN AMRO — Director / Private Wealth Management (2017–2019)**
- Managed finance system workflows for $500M+ AUM; applied rigorous data accuracy and regulatory compliance standards relevant to healthcare financial operations
- Orchestrated cross-system integrations with government and banking portals; demonstrated capacity for multi-vendor system coordination
- Built relationships with diverse stakeholders; translated complex financial processes into actionable operational procedures

### Education
Same entries. Highlight eldercare/care-coordination attachment aligning with NTUC Health mission.

### Certifications
1. UiPath Advanced Developer Certification *(in progress — highly preferred by NTUC Health)*
2. Microsoft Certified: Azure AI Engineer Associate
3. Google Professional Machine Learning Engineer

### Innovation Vision
**Heading:** "Automation Specialist: Intelligent Healthcare Process Innovation"

**Card 1 — Intelligent Care Coordination Automation**
Leverage AI-enhanced UiPath RPA to automate eldercare case management, appointment scheduling, and billing workflows across NTUC Health's six service lines — freeing care staff to focus on resident wellbeing.

**Card 2 — Unified Healthcare Digital Ecosystem**
Design seamless integrations between NTUC Health's finance systems, government portals (MOH, SingStat), and Google Cloud Platform — enabling real-time data flows and reducing manual portal submissions by 60%+.

**Card 3 — Predictive Workforce Automation**
Apply data analytics and automated reporting to enable proactive resource allocation across nursing home and home care operations — ensuring the right staff reach the right seniors at the right time.

**Closing — "A Technology-Empathy Bridge for NTUC Health"**
John's rare combination of enterprise RPA engineering expertise and current WSQ Diploma in Social Service (eldercare specialisation) uniquely positions him to design automation that is not merely efficient, but human-centred. Every workflow he builds at NTUC Health will carry the dual mandate of operational excellence and compassionate care delivery.

---

## Technical Changes Checklist
- [ ] Copy superpowers/ → superpowers-automation/
- [ ] Replace src/data/resume.ts
- [ ] Update layout.tsx metadata
- [ ] Update Sidebar subtitle and PDF filename
- [ ] Update VisionPage section heading string
- [ ] Update package.json name
- [ ] Remove .vercel/project.json
- [ ] Run `npm install` and verify build
- [ ] Run tests
- [ ] Deploy via Vercel CLI as new project "john-tan-automation-specialist"
- [ ] Verify live URL
