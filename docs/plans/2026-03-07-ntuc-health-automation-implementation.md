# NTUC Health Automation Specialist Resume — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a standalone Next.js resume app at `C:/Users/admin/superpowers-automation/` tailored for the NTUC Health Automation Specialist role, then deploy to `john-tan-automation-specialist.vercel.app`.

**Architecture:** Copy the existing `superpowers/` project to `superpowers-automation/`, update all content in `src/data/resume.ts`, make targeted edits to component strings (sidebar subtitle, vision heading, certifications meta, competencies card titles), remove `.vercel/project.json` so Vercel creates a fresh project, then deploy via CLI.

**Tech Stack:** Next.js 14, TypeScript, Framer Motion, CSS Modules, Vercel CLI

---

## Task 1: Copy project to new directory

**Files:**
- Create: `C:/Users/admin/superpowers-automation/` (copy of superpowers/)

**Step 1: Copy the entire project**

```bash
cp -r /c/Users/admin/superpowers /c/Users/admin/superpowers-automation
```

**Step 2: Remove Vercel project link (forces new project on deploy)**

```bash
rm /c/Users/admin/superpowers-automation/.vercel/project.json
```

**Step 3: Update package.json name**

Edit `C:/Users/admin/superpowers-automation/package.json` — change:
```json
"name": "john-tan-resume"
```
to:
```json
"name": "john-tan-automation-specialist"
```

**Step 4: Install dependencies**

```bash
cd /c/Users/admin/superpowers-automation && npm install
```

Expected: clean install, no errors.

**Step 5: Verify build compiles**

```bash
cd /c/Users/admin/superpowers-automation && npm run build
```

Expected: Build completes successfully.

---

## Task 2: Replace resume data (core content)

**Files:**
- Modify: `C:/Users/admin/superpowers-automation/src/data/resume.ts`

Replace the entire file content with:

```typescript
export interface ContactInfo {
  email: string
  linkedin: string
  website: string
  phone: string
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
  searchText: string
}

export interface EducationEntry {
  degree: string
  institution: string
  year: string
  note?: string
  details?: string[]
}

export interface ResumeData {
  name: string
  title: string
  contact: ContactInfo
  summary: { tagline: string; body: string; searchText: string }
  competencies: {
    leadership: string[]
    technical: string[]
    socialService: string[]
    searchText: string
  }
  experience: ExperienceEntry[]
  education: { entries: EducationEntry[]; searchText: string }
  certifications: { items: string[]; searchText: string }
  vision: {
    sections: { title: string; body: string }[]
    closing: { title: string; body: string }
    searchText: string
  }
}

export const resume: ResumeData = {
  name: "John Tan",
  title: "Automation Specialist | Healthcare Digital Transformation",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-automation-specialist.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Enterprise RPA Architect | UiPath Developer | Healthcare Process Innovation",
    body: "Results-driven Automation Specialist with 3+ years of hands-on RPA experience designing, developing, and deploying end-to-end UiPath solutions that achieve 50%+ operational efficiency gains. Proficient in Google Apps Script, Python, JavaScript, C#, VBA, and PHP, with proven integration experience across Google Workspace, Google Cloud Platform, and enterprise finance systems. Currently deepening healthcare domain expertise through a WSQ Diploma in Social Service (Tsao Foundation), specialising in eldercare coordination — directly aligned with NTUC Health's mission of enabling healthy and fulfilling years for Singapore's seniors. Combines engineering rigour with stakeholder empathy to deliver automation that is not merely efficient, but human-centred.",
    searchText: "summary enterprise rpa architect uipath developer healthcare process innovation automation specialist 50% efficiency google workspace gcp python javascript c# vba php eldercare social service tsao foundation",
  },
  competencies: {
    leadership: [
      "UiPath RPA: Design, Development & Deployment",
      "UiPath Orchestrator: Scheduling, Monitoring & Troubleshooting",
      "Google Apps Script & Google Cloud Platform",
      "End-to-End Workflow Design & RPA SDLC",
    ],
    technical: [
      "Programming: Python · JavaScript · C# · VBA · PHP",
      "Database & Integration: SQL, Google Workspace, WordPress",
      "Systems Integration: Finance, Government & Vendor Portals",
      "Generative AI & LLM-Enhanced Automation",
    ],
    socialService: [
      "Healthcare Finance & Regulatory Compliance",
      "Government Portal Integration (MOH, SingStat)",
      "Process Documentation & End-User Training",
      "Stakeholder Management & Requirements Gathering",
    ],
    searchText: "competencies uipath rpa orchestrator google apps script gcp python javascript c# vba php sql wordpress systems integration finance government portal documentation training stakeholder management healthcare",
  },
  experience: [
    {
      id: "cogent",
      role: "Generative AI Engineer",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Process Automation: Architected Google Workspace automation workflows integrating Google Apps Script with GCP data pipelines, reducing manual effort by 30% — demonstrating the multi-system integration skills central to NTUC Health's finance and portal automation needs.",
        "Multi-Language Scripting: Developed Python and JavaScript automation scripts for business process optimisation, extending beyond no-code tools to deliver bespoke automation solutions for complex, cross-functional workflows.",
        "Documentation & Training: Produced comprehensive user guides and process documentation that improved team onboarding by 40%; directly applicable to NTUC Health's requirement for technical support and training on automated processes.",
      ],
      searchText: "generative ai engineer cogent holdings google workspace gcp python javascript automation workflows 30% user guides onboarding documentation training",
    },
    {
      id: "st-engineering",
      role: "Software Engineer (RPA Specialist)",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "UiPath RPA Leadership: Led 3 complete end-to-end UiPath SDLC projects — from process discovery and design through development, testing, and deployment — achieving 50%+ operational efficiency gains across enterprise operations.",
        "Orchestrator Management: Administered UiPath Orchestrator for scheduling, monitoring, and troubleshooting of production automation workflows; ensured maximum uptime and rapid incident resolution for business-critical processes.",
        "Scripting & Debugging: Developed C#, Python, and VBA scripts to extend UiPath automation capabilities; debugged and optimised complex workflows to ensure optimal performance and 85%+ accuracy in automated outputs.",
      ],
      searchText: "software engineer rpa specialist st engineering uipath sdlc 50% efficiency orchestrator scheduling monitoring troubleshooting c# python vba debugging 85% accuracy",
    },
    {
      id: "abnamro",
      role: "Director / Private Wealth Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Finance System Expertise: Managed $500M+ AUM through complex finance system workflows; applied rigorous data accuracy and regulatory compliance standards directly transferable to NTUC Health's finance and government reporting processes.",
        "Government & Vendor Portal Integration: Orchestrated cross-system data flows integrating banking, regulatory, and government reporting portals — demonstrating the multi-portal integration experience required for NTUC Health's automation landscape.",
        "Stakeholder Collaboration: Partnered with diverse cross-functional teams to analyse business processes, define requirements, and deliver compliant operational solutions — the same collaborative approach John will bring to NTUC Health's care coordination teams.",
      ],
      searchText: "director private wealth management abn amro 500m aum finance system regulatory compliance government portal integration cross-system data flow stakeholder collaboration requirements",
    },
  ],
  education: {
    entries: [
      {
        degree: "WSQ Diploma in Social Service",
        institution: "Tsao Foundation (Hua Mei Training Academy)",
        year: "2026 – Present",
        note: "Candidate for Graduation; SCTP Career Transition Programme",
        details: [
          "Modules: Ethics & Legislation; Financial Management; Stakeholder Management; Social Policy Implementation; Volunteer Programme Management",
          "Industrial Attachment: 16-day fieldwork with Active Ageing Centre — care coordination for vulnerable seniors, directly relevant to NTUC Health's eldercare services",
          "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management — aligns with NTUC Health's digital transformation roadmap",
        ],
      },
      {
        degree: "MBA",
        institution: "Nanyang Technological University (NTU)",
        year: "2001 – 2003",
        note: "Dean's Honors List — risk management and financial modelling",
      },
      {
        degree: "Bachelor of Science in Mathematics",
        institution: "National University of Singapore (NUS)",
        year: "1994",
        note: "Public Service Commission Scholarship",
      },
    ],
    searchText: "education wsq diploma social service tsao foundation hua mei eldercare active ageing mba ntu nanyang dean honors list bachelor mathematics nus public service commission scholarship financial management stakeholder",
  },
  certifications: {
    items: [
      "UiPath Advanced Developer Certification (In Progress)",
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications uipath advanced developer microsoft azure ai engineer associate google professional machine learning engineer rpa",
  },
  vision: {
    sections: [
      {
        title: "Intelligent Care Coordination Automation",
        body: "Leverage AI-enhanced UiPath RPA to automate eldercare case management, appointment scheduling, and billing workflows across NTUC Health's six service lines — Senior Day Care, Home Care, Nursing Home, Active Ageing, Rehabilitation, and Family Medicine — freeing care staff to focus entirely on resident wellbeing.",
      },
      {
        title: "Unified Healthcare Digital Ecosystem",
        body: "Design seamless integrations between NTUC Health's finance systems, government portals (MOH, SingStat, CPF Board), and Google Cloud Platform — enabling real-time data flows, automated compliance reporting, and elimination of duplicate manual portal submissions.",
      },
      {
        title: "Predictive Workforce Automation",
        body: "Apply data analytics pipelines and automated reporting dashboards to enable proactive resource allocation across nursing home and home care operations — ensuring the right caregivers reach the right seniors at the right time, powered by data not instinct.",
      },
    ],
    closing: {
      title: "A Technology-Empathy Bridge for NTUC Health",
      body: "John's rare combination of enterprise RPA engineering expertise (UiPath SDLC, Orchestrator, multi-language scripting) and current WSQ Diploma in Social Service (eldercare specialisation at Tsao Foundation) uniquely positions him to build automation that carries a dual mandate: operational excellence and compassionate care delivery. Every workflow he designs at NTUC Health will be engineered not just to save time — but to create more time for the human connections that define quality eldercare.",
    },
    searchText: "vision innovation intelligent care coordination automation uipath eldercare senior day care nursing home active ageing unified healthcare digital ecosystem government portals moh singstat cpf google cloud predictive workforce automation technology empathy ntuc health",
  },
}
```

**Step 1: Write the file** (replace entire content as above)

**Step 2: Verify TypeScript compiles**

```bash
cd /c/Users/admin/superpowers-automation && npm run build 2>&1 | tail -20
```

Expected: Build succeeds, no TypeScript errors.

---

## Task 3: Update component strings

**Files:**
- Modify: `C:/Users/admin/superpowers-automation/src/components/Sidebar/Sidebar.tsx`
- Modify: `C:/Users/admin/superpowers-automation/src/components/pages/VisionPage.tsx`
- Modify: `C:/Users/admin/superpowers-automation/src/components/pages/CompetenciesPage.tsx`
- Modify: `C:/Users/admin/superpowers-automation/src/components/pages/CertificationsPage.tsx`
- Modify: `C:/Users/admin/superpowers-automation/src/app/layout.tsx`

**Step 1: Update Sidebar — subtitle and PDF filename**

In `Sidebar.tsx`, change:
```tsx
<div className={styles.subtitle}>Center Manager · RN</div>
```
to:
```tsx
<div className={styles.subtitle}>Automation Specialist · NTUC Health</div>
```

And change the download link:
```tsx
href="/assets/John_Tan_Resume_RN.pdf"
download="John_Tan_Resume_RN.pdf"
```
to:
```tsx
href="/assets/John_Tan_Resume_Automation.pdf"
download="John_Tan_Resume_Automation.pdf"
```

**Step 2: Update VisionPage — section heading**

In `VisionPage.tsx`, change:
```tsx
<div className={styles.section}>Center Manager: Resident-Centric Innovation</div>
<h2 className={styles.heading}>A Vision for Community Excellence</h2>
```
to:
```tsx
<div className={styles.section}>Automation Specialist: Intelligent Healthcare Process Innovation</div>
<h2 className={styles.heading}>A Vision for NTUC Health Digital Transformation</h2>
```

**Step 3: Update CompetenciesPage — card titles**

In `CompetenciesPage.tsx`, change:
```tsx
<div className={styles.cardTitle}>Leadership & Management</div>
```
to:
```tsx
<div className={styles.cardTitle}>RPA & Automation</div>
```

Change:
```tsx
<div className={styles.cardTitle}>Technical & Analytical</div>
```
to:
```tsx
<div className={styles.cardTitle}>Programming & Integration</div>
```

Change:
```tsx
<div className={styles.cardTitle}>Social Service Domain</div>
```
to:
```tsx
<div className={styles.cardTitle}>Domain Knowledge</div>
```

**Step 4: Update CertificationsPage — add UiPath cert meta**

In `CertificationsPage.tsx`, update the CERT_META:
```tsx
const CERT_META: Record<string, { icon: string; issuer: string }> = {
  'UiPath Advanced Developer Certification (In Progress)': { icon: '🤖', issuer: 'UiPath' },
  'Microsoft Certified: Azure AI Engineer Associate': { icon: '☁️', issuer: 'Microsoft' },
  'Google Professional Machine Learning Engineer': { icon: '🔬', issuer: 'Google' },
}
```

**Step 5: Update layout.tsx metadata**

In `layout.tsx`, change:
```tsx
export const metadata: Metadata = {
  title: 'John Tan — Resume',
  description: "Center Manager | Residents' Network | Generative AI & Community Care Professional",
}
```
to:
```tsx
export const metadata: Metadata = {
  title: 'John Tan — Automation Specialist',
  description: 'Automation Specialist | UiPath RPA Developer | Healthcare Digital Transformation | NTUC Health',
}
```

**Step 6: Update HeroPage tagline**

In `HeroPage.tsx`, change:
```tsx
<p className={styles.tagline}>20+ Years · Finance · Tech · Community</p>
```
to:
```tsx
<p className={styles.tagline}>UiPath · Google Cloud · RPA · 50%+ Efficiency Gains</p>
```

**Step 7: Update SummaryPage stats**

In `SummaryPage.tsx`, update the stats section:
```tsx
<div className={styles.stats}>
  <div className={styles.stat}>
    <div className={styles.statValue}>3+</div>
    <div className={styles.statLabel}>Years RPA Experience</div>
  </div>
  <div className={styles.stat}>
    <div className={styles.statValue}>50%+</div>
    <div className={styles.statLabel}>Efficiency Gains</div>
  </div>
  <div className={styles.stat}>
    <div className={styles.statValue}>5+</div>
    <div className={styles.statLabel}>Languages Mastered</div>
  </div>
  <div className={styles.stat}>
    <div className={styles.statValue}>3</div>
    <div className={styles.statLabel}>Enterprise Integrations</div>
  </div>
</div>
```

**Step 8: Verify build**

```bash
cd /c/Users/admin/superpowers-automation && npm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors.

---

## Task 4: Update navigation search text for new role

**Files:**
- Modify: `C:/Users/admin/superpowers-automation/src/lib/navigation.ts`

**Step 1: Update Home page searchText**

Change the Home entry:
```typescript
{
  path: '/',
  label: 'Home',
  icon: '🏠',
  searchText: `${resume.name} ${resume.title} ${Object.values(resume.contact).join(' ')}`,
},
```
This is already dynamic — no change needed. The title will now reflect the new resume.title automatically.

**Step 2: Update Experience labels in PAGES**

The Cogent entry:
```typescript
{
  path: '/experience/cogent',
  label: 'Cogent Holdings',
  icon: '💼',
  searchText: resume.experience[0].searchText,
},
```
Change label to match the role better:
```typescript
{
  path: '/experience/cogent',
  label: 'Cogent — GenAI Eng',
  icon: '🤖',
  searchText: resume.experience[0].searchText,
},
{
  path: '/experience/st-engineering',
  label: 'ST Eng — RPA Spec',
  icon: '⚙️',
  searchText: resume.experience[1].searchText,
},
{
  path: '/experience/abnamro',
  label: 'ABN AMRO — Finance',
  icon: '💼',
  searchText: resume.experience[2].searchText,
},
```

**Step 3: Verify build**

```bash
cd /c/Users/admin/superpowers-automation && npm run build 2>&1 | tail -10
```

---

## Task 5: Run tests

**Files:**
- Read: `C:/Users/admin/superpowers-automation/src/__tests__/`

**Step 1: Run all tests**

```bash
cd /c/Users/admin/superpowers-automation && npm test -- --passWithNoTests 2>&1
```

Expected: All tests pass. The navigation tests check PAGES length (9), first page `/`, last page `/vision` — all still true.

**Step 2: If any tests fail**, read the test file and fix the assertion. The most likely failure is if PAGES array length changed — it should remain 9 (Home, Summary, Competencies, Cogent, ST Eng, ABN AMRO, Education, Certifications, Vision).

---

## Task 6: Copy existing PDF asset (placeholder)

**Files:**
- Copy: `C:/Users/admin/superpowers/public/assets/John_Tan_Resume_RN.pdf`
  → `C:/Users/admin/superpowers-automation/public/assets/John_Tan_Resume_Automation.pdf`

**Step 1: Copy PDF as placeholder**

```bash
cp "/c/Users/admin/superpowers/public/assets/John_Tan_Resume_RN.pdf" \
   "/c/Users/admin/superpowers-automation/public/assets/John_Tan_Resume_Automation.pdf"
```

Note: The downloaded PDF at `C:/Users/admin/Downloads/John_Tan_Resume_SGO.pdf` is the actual resume — optionally copy that instead:
```bash
cp "/c/Users/admin/Downloads/John_Tan_Resume_SGO.pdf" \
   "/c/Users/admin/superpowers-automation/public/assets/John_Tan_Resume_Automation.pdf"
```

---

## Task 7: Final build verification and dev preview

**Step 1: Full production build**

```bash
cd /c/Users/admin/superpowers-automation && npm run build
```

Expected: `✓ Compiled successfully` with no errors or warnings.

**Step 2: Start dev server to visually verify**

```bash
cd /c/Users/admin/superpowers-automation && npm run dev -- --port 3001
```

Visit `http://localhost:3001` and check:
- [ ] Hero page shows "Automation Specialist | Healthcare Digital Transformation"
- [ ] Sidebar shows "Automation Specialist · NTUC Health"
- [ ] Summary stats show RPA metrics
- [ ] Competencies show "RPA & Automation", "Programming & Integration", "Domain Knowledge"
- [ ] ST Engineering shows UiPath/RPA bullets
- [ ] Vision shows 3 NTUC Health cards
- [ ] Vision closing shows "Technology-Empathy Bridge"
- [ ] Certifications show UiPath cert

---

## Task 8: Deploy to Vercel

**Step 1: Install Vercel CLI if not present**

```bash
npx vercel --version 2>/dev/null || npm i -g vercel
```

**Step 2: Deploy as new project**

```bash
cd /c/Users/admin/superpowers-automation && npx vercel --prod
```

When prompted:
- Set up and deploy: **Y**
- Which scope: select `team_cX9wdAqzyd9PZPsjcYQ83I3y` (same org as superpowers)
- Link to existing project: **N** (we removed project.json)
- Project name: **john-tan-automation-specialist**
- Directory: **./` (current)**
- Override settings: **N**

**Step 3: Verify live URL**

```bash
npx vercel ls --scope team_cX9wdAqzyd9PZPsjcYQ83I3y 2>/dev/null | grep automation
```

Visit `https://john-tan-automation-specialist.vercel.app` and confirm all pages load.

**Step 4: Commit the new project**

```bash
cd /c/Users/admin/superpowers-automation
git init
git add .
git commit -m "feat: NTUC Health Automation Specialist resume app"
```

---

## Task 9: (Optional) Init git worktree for superpowers-automation

If the user wants version control for the new project, push to a new GitHub repo:

```bash
cd /c/Users/admin/superpowers-automation
gh repo create john-tan-automation-specialist --private --source=. --push
```

Then connect to Vercel via Git for auto-deploys on push.
