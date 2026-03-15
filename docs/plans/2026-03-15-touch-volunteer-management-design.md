# Design: TOUCH Volunteer Management Executive Resume App

**Date:** 2026-03-15
**Status:** Approved
**Target role:** Volunteer Management Executive — TOUCH Community Services

---

## Overview

Extend the existing `john-tan-automation-specialist.vercel.app` Next.js 14 app to support a dual-role resume. The TOUCH (Volunteer Management Executive) version becomes the default (`/`); the existing Automation Specialist version is accessible via `?role=automation`. A role badge + switcher link in the sidebar allows toggling between modes.

---

## Architecture

### Role switching
- URL param: `/?role=touch` (default) and `/?role=automation`
- `AppShell.tsx` reads `useSearchParams()`, wraps a `RoleProvider` context
- `RoleProvider` exposes `{ role, resumeData }` to all child components
- A small `RoleThemeApplier` client component sets `data-role` on `<html>` for CSS-driven theming
- All page components consume `useRole()` hook instead of importing `resume` directly
- Sidebar shows role badge and a "Switch role →" link

### New/modified files
| File | Action |
|---|---|
| `src/data/resumeTOUCH.ts` | New — TOUCH resume content |
| `src/lib/roleContext.tsx` | New — RoleProvider + useRole hook |
| `src/app/globals.css` | Extend — TOUCH color token overrides via `[data-role="touch"]` |
| `src/app/layout.tsx` | Extend — wrap with RoleProvider + RoleThemeApplier |
| `src/components/Sidebar/Sidebar.tsx` | Extend — role badge + switcher link |
| `src/components/pages/HeroPage.tsx` | Update — consume roleContext |
| `src/components/pages/SummaryPage.tsx` | Update — consume roleContext |
| `src/components/pages/CompetenciesPage.tsx` | Update — consume roleContext |
| `src/components/pages/ExperiencePage.tsx` | Update — consume roleContext |
| `src/components/pages/EducationPage.tsx` | Update — consume roleContext |
| `src/components/pages/CertificationsPage.tsx` | Update — consume roleContext |
| `src/components/pages/VisionPage.tsx` | Update — consume roleContext |
| `public/assets/John_Tan_Resume_TOUCH.pdf` | New — TOUCH-tailored PDF |

---

## Color Palette

### TOUCH theme (`[data-role="touch"]`)
| Token | Value | Purpose |
|---|---|---|
| `--navy` | `#1e3d2f` | Sidebar, monogram background |
| `--navy-dark` | `#122a1f` | Sidebar header gradient dark |
| `--navy-mid` | `#2d5a40` | Nav hover states |
| `--gold` | `#e07055` | Accent — active nav, buttons, highlights |
| `--gold-light` | `#f0967e` | Search highlight marks |
| `--gold-dim` | `#b85a44` | Pressed/visited states |
| `--surface` | `#faf8f4` | Page background (warm cream) |
| `--border` | `#e5ddd4` | Card/divider borders |

### Automation theme (unchanged)
Existing navy `#1a2e4a` + gold `#c9a84c`.

---

## TOUCH Resume Content

### Identity
- **Title:** `Volunteer Management Executive | Digital Community Engagement`
- **Sidebar subtitle:** `Volunteer Management · TOUCH`
- **Hero tagline:** `Stakeholder Engagement · Volunteer Coordination · Digital Systems · Community Empowerment`

### Summary
**Tagline:** `Community Engagement Strategist | Volunteer Management | Digital Transformation`

**Body:** Purpose-driven professional making a deliberate career transition into volunteer management, bringing 6+ years of enterprise digital transformation experience — UiPath RPA, Google Workspace automation, multi-system integration — directly to TOUCH's mandate of cultivating a centralised digital volunteer management system. Currently completing WSQ Diploma in Social Service (Tsao Foundation), with a dedicated Volunteer Programme Management module and 16-day fieldwork at an Active Ageing Centre. Combines rigorous stakeholder management and data analytics skills (honed across finance, engineering and technology sectors) with genuine passion for community empowerment — uniquely positioned to support TOUCH's Head of Volunteer Management in advancing Vision 2030.

### Competencies
**Stakeholder & People:**
- Stakeholder Engagement & Partnership Building
- Volunteer Coordinator Training & Programme Support
- Cross-departmental Collaboration & Volunteer Sharing
- People Management & Negotiation

**Digital & Process:**
- Digital Volunteer Management Systems Adoption
- Process Optimisation & Workflow Design
- Data Management, Analysis & Reporting
- Project & Event Coordination

**Social Service:**
- Volunteer Risk Assessment & Governance
- Survey Analysis & Volunteer Upskilling
- Ethics, Social Policy & Legislation (WSQ)
- Service Recovery & Crisis Management

### Experience — Cogent Holdings (Generative AI Engineer, 2022–Present)
1. **Digital System Rollout:** Architected and led enterprise-wide adoption of Google Workspace digital workflows across multiple departments, reducing manual coordination effort by 30% — directly applicable to TOUCH's mandate of cultivating a centralised digital volunteer management platform across all service lines.
2. **Volunteer Coordinator Training Analogue:** Designed comprehensive training materials and onboarding programmes adopted by 40+ team members, building the facilitation and instructional design skills needed to educate TOUCH Volunteer Coordinators on new systems, corporate vision, and best practices.
3. **Cross-departmental Collaboration:** Led structured cross-functional working groups to align process standards and enable resource sharing across business units — mirroring TOUCH's requirement for cross-departmental volunteer sharing, retention, and collaboration.

### Experience — ST Engineering (Software Engineer / RPA Specialist, 2019–2022)
1. **Programme Management:** Managed 3 complete end-to-end programme cycles — from discovery and planning through execution, monitoring and review — demonstrating the project coordination rigour required to plan and execute TOUCH's volunteer appreciation events, training sessions, and service-specific Volunteer Coordinator meetings.
2. **Data Management & Reporting:** Built and maintained automated reporting dashboards tracking performance KPIs across multiple operational units; directly maps to co-managing TOUCH's volunteer database, collating engagement data, and submitting analytical reports to leadership.
3. **Process Documentation & Risk Assessment:** Conducted systematic process audits and annual risk assessments across enterprise workflows, producing structured risk registers — directly applicable to TOUCH's requirement to conduct volunteer risk assessments annually with various services.

### Experience — ABN AMRO (Director / Private Wealth Management, 2017–2019)
1. **Stakeholder Management & Budget Governance:** Managed strategic relationships with 200+ high-net-worth clients and oversaw portfolio operations with strict budget accountability — satisfying TOUCH's requirement for 3+ years of experience in project, stakeholder, and budget management.
2. **Partnership & Community Engagement:** Built strategic partnerships with external organisations, family offices, and government agencies to create meaningful client outcomes — directly transferable to TOUCH's stakeholder engagement, partnership-building, and volunteer opportunity development mandate.
3. **People Management & Negotiation:** Partnered with diverse cross-functional internal teams and external counterparties, applying strong negotiation and interpersonal skills to deliver compliant, client-centred solutions — the same collaborative and empathic approach John brings to engaging and empowering TOUCH's volunteer ecosystem.

### Vision sections
1. **Centralised Digital Volunteer Ecosystem** — Champion the adoption of TOUCH's unified volunteer management platform: streamlining recruitment, engagement, and retention workflows across all service lines, enabling real-time volunteer availability tracking, and eliminating duplicate manual coordination.
2. **Data-Driven Volunteer Engagement & Retention** — Build analytics pipelines from volunteer survey data to proactively identify upskilling opportunities, recognition moments, and retention risks — enabling evidence-based decisions on volunteer appreciation and training programme design.
3. **Community Partnership Network** — Develop structured partnership pipelines with corporate, educational, and government institutions to expand TOUCH's volunteer base and create meaningful, sustained volunteer opportunities that benefit communities and advance Vision 2030.

**Closing:** John's rare combination — enterprise digital transformation expertise and WSQ Diploma in Social Service (including Volunteer Programme Management) — uniquely equips him to bridge TOUCH's two most pressing needs: modernising volunteer systems and deepening human connections. Every initiative he leads will be designed not just for operational efficiency, but for lasting community impact.

### Education highlights
- WSQ modules to call out: **Volunteer Programme Management**, Stakeholder Management, Social Policy Implementation, Ethics & Legislation, Financial Management
- IAP: Active Ageing Centre fieldwork — care coordination for vulnerable seniors, understanding volunteer-service user dynamics firsthand

### PDF
- New file: `public/assets/John_Tan_Resume_TOUCH.pdf`
- Generated via `write_resume.py` (update script with TOUCH content) or python-docx
- Download link in sidebar switches based on active role

---

## Role Switcher UX

- Sidebar shows pill badge: `● TOUCH` (coral) or `● NTUC Health` (gold)
- Below badge: small link `Switch to Automation Specialist →` (or vice versa)
- Link preserves current page path, just swaps `?role=` param
- Default (no param) = TOUCH

---

## Testing Checklist
- [ ] `/?role=touch` loads TOUCH content + forest/coral theme
- [ ] `/?role=automation` loads automation content + navy/gold theme
- [ ] `/` (no param) defaults to TOUCH
- [ ] Role switcher link correctly flips `?role` param while preserving page path
- [ ] Search works correctly per role (searches role-specific resume data)
- [ ] PDF download serves correct PDF per active role
- [ ] All 7 page routes render correct content for both roles
- [ ] Mobile sidebar toggle works in both roles
- [ ] Prev/Next navigation works in both roles
- [ ] Build passes (`next build`) with no TypeScript errors
- [ ] Deploy to Vercel succeeds

---

## Success Criteria
- Hiring manager at TOUCH opens `john-tan-automation-specialist.vercel.app` and sees forest-green Volunteer Management Executive resume by default
- All TOUCH JD keywords appear naturally in the content (stakeholder management, volunteer coordination, digital system adoption, cross-departmental, risk assessment, data management, upskilling, partnership-building, Vision 2030)
- ATS-friendly PDF available for download
- Automation Specialist version fully intact at `?role=automation`
