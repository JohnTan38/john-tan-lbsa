# LBSA Programme Executive Role — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the retired TOUCH role with a new LBSA (Lions Befrienders Service Association) Programme Executive role, switching the app to a LBSA ↔ Automation Specialist dual-role system with Lion Befrienders blue/white corporate theme.

**Architecture:** In-place rename of `resumeTOUCH.ts` → `resumeLBSA.ts`; role type `'touch'` → `'lbsa'` throughout; `[data-role="touch"]` CSS → `[data-role="lbsa"]` with LB blue palette; tests updated; CLAUDE.md created.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, Framer Motion, Jest + ts-jest

---

## Task 1: Create `resumeLBSA.ts` data file

**Files:**
- Create: `src/data/resumeLBSA.ts`

This is a pure data file — no test needed. Write it, verify TypeScript compiles.

**Step 1: Create the file**

```ts
// src/data/resumeLBSA.ts
import type { ResumeData } from './resume'

export const resumeLBSA: ResumeData = {
  name: "John Tan",
  title: "Programme Executive | Active Ageing Centre | Social Service",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-automation-specialist.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Programme Executive | Community Outreach | Eldercare | Active Ageing",
    body: "Career-transition professional making a deliberate move into social service as Programme Executive at Lions Befrienders Service Association, leveraging enterprise-grade stakeholder management, programme coordination, and data analytics experience in direct service of LBSA's seniors. Currently completing WSQ Diploma in Social Service (Tsao Foundation / Hua Mei Training Academy, SCTP), with 16-day hands-on fieldwork at an Active Ageing Centre — including direct application of the Community Screener Tool, needs assessment, member tiering, and care coordination for vulnerable seniors. Brings Diploma-grounded understanding of the 5 dimensions of wellbeing, volunteer management principles, and community outreach strategy, combined with 6+ years of cross-sector experience in stakeholder engagement, programme management, and budget governance. Ready to contribute meaningfully to LBSA's mission of befriending and empowering Singapore's seniors to age actively and gracefully.",
    searchText: "summary programme executive community outreach eldercare active ageing centre aac lbsa lions befrienders 5 dimensions wellbeing community screener tool needs assessment member tiering care coordination volunteer management stakeholder engagement wsq diploma social service tsao foundation hua mei sctp fieldwork befriending seniors",
  },
  competencies: {
    leadership: [
      "Community Outreach & Member Recruitment (Community Screener Tool)",
      "Stakeholder Engagement & Partnership Building",
      "Volunteer Coordination & Support",
      "Needs Assessment & Senior Member Tiering",
    ],
    technical: [
      "Programme Planning, Implementation & Evaluation",
      "Data Collection, Analysis & Reporting",
      "Budget Management & Financial Documentation",
      "Microsoft Office & Digital Programme Tools",
    ],
    socialService: [
      "5 Dimensions of Wellbeing (Active Ageing Framework)",
      "Community Screener Tool & Needs Assessment",
      "Ethics, Legislation & Social Policy (WSQ)",
      "Eldercare Coordination & Befriending Principles",
    ],
    searchText: "competencies community outreach member recruitment community screener tool stakeholder engagement partnership building volunteer coordination needs assessment senior tiering programme planning implementation evaluation data collection analysis reporting budget management financial documentation microsoft office 5 dimensions wellbeing ethics legislation social policy eldercare befriending active ageing",
  },
  experience: [
    {
      id: "cogent",
      role: "Community Engagement & Outreach Lead",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Community Outreach Execution: Led structured outreach campaigns engaging 50+ external partners and stakeholders across multiple communities — directly applicable to executing LBSA's Community Outreach Plan, engaging community partners, and advocating for seniors' needs to external stakeholders while championing LBSA's mission and values.",
        "Stakeholder Relationship Management: Built and sustained strategic relationships with 30+ corporate and institutional partners, aligning shared objectives to create lasting community impact — mirrors LBSA's requirement to build effective and sustainable partnerships that directly serve the wellbeing and quality of life of seniors.",
        "Programme Coordination & Evaluation: Designed, implemented, and evaluated multi-stakeholder programmes with structured feedback loops and data collection, achieving 30% improvement in community engagement — demonstrating the programme planning, implementation, and evaluation skills central to LBSA's AAC operations across the 5 dimensions of wellbeing.",
      ],
      searchText: "community engagement outreach lead cogent holdings outreach campaigns 50 external partners stakeholders community outreach plan advocacy seniors lions befrienders mission strategic relationships 30 corporate institutional partners sustainable partnerships programme coordination evaluation data collection 30% improvement 5 dimensions wellbeing",
    },
    {
      id: "st-engineering",
      role: "Programme Coordinator (Planning & Evaluation)",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "Programme Planning & Delivery: Coordinated 3 complete end-to-end programme cycles — from needs identification and design through implementation, monitoring, and post-programme evaluation — directly applicable to LBSA's requirement to plan, implement, and evaluate AAC activities ensuring ongoing relevance to seniors across the 5 dimensions of wellbeing.",
        "Data Collection & Reporting: Built structured data collection systems and evaluation frameworks tracking programme KPIs across multiple operational units — maps directly to LBSA's need for regular data collection, programme evaluation, and sharing of senior observation insights with Senior Programme Executive / Befriending Executive.",
        "Budget Documentation & Compliance: Maintained meticulous financial records for programme budgets, ensuring full documentation of all expenditures and strict adherence to allocated budgets — aligns directly with LBSA's financial reporting requirement for proper documentation of finance-related transactions.",
      ],
      searchText: "programme coordinator planning evaluation st engineering end-to-end programme cycles needs identification implementation monitoring post-programme evaluation aac activities 5 dimensions wellbeing data collection evaluation frameworks kpis senior observation insights budget documentation financial records expenditures adherence finance reporting",
    },
    {
      id: "abnamro",
      role: "Director / Stakeholder & Relationship Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Senior Stakeholder Management: Managed strategic relationships with 200+ clients and institutional counterparties, advocating for their needs and building sustainable long-term partnerships — directly transferable to LBSA's requirement to engage community partners, advocate seniors' needs to external stakeholders, and build relationships that serve vulnerable populations.",
        "Community Engagement & Partnership Analogue: Partnered with diverse cross-functional teams and external organisations to deliver community-centred solutions, applying strong interpersonal skills and empathic communication — the same people-first, collaborative approach John brings to engaging LBSA's seniors, volunteers, and community partners.",
        "Needs Assessment & Member Tiering Analogue: Applied rigorous client assessment frameworks to understand unique client needs, segment profiles by risk and complexity, and tailor service delivery accordingly — directly applicable to using the Community Screener Tool to assess new senior members, tier them by care needs, and ensure appropriate programme placement.",
      ],
      searchText: "director stakeholder relationship management abn amro 200 clients institutional counterparties advocacy community partners seniors needs external stakeholders vulnerable populations community engagement cross-functional empathic people-first volunteers needs assessment member tiering community screener tool senior members care needs programme placement",
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
          "Key Modules: Volunteer Programme Management; Stakeholder Management; Ethics & Legislation; Social Policy Implementation; Financial Management",
          "Industrial Attachment: 16-day hands-on fieldwork at Active Ageing Centre — applied Community Screener Tool for new member intake, conducted needs assessments, tiered seniors by care complexity, and supported care coordination for vulnerable seniors; direct on-the-ground AAC operational experience",
          "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management — supports LBSA's digital outreach and member engagement strategy",
        ],
      },
      {
        degree: "MBA",
        institution: "Nanyang Technological University (NTU)",
        year: "2001 – 2003",
        note: "Dean's Honors List — strategic management, stakeholder leadership, and organisational behaviour",
      },
      {
        degree: "Bachelor of Science in Mathematics",
        institution: "National University of Singapore (NUS)",
        year: "1994",
        note: "Public Service Commission Scholarship",
      },
    ],
    searchText: "education wsq diploma social service tsao foundation hua mei training academy volunteer programme management stakeholder management ethics legislation social policy financial management 16-day fieldwork active ageing centre community screener tool needs assessment member tiering senior care coordination on-the-ground aac operational experience mba ntu nanyang dean honors list strategic management organisational behaviour bachelor mathematics nus public service commission scholarship sctp career transition",
  },
  certifications: {
    items: [
      "WSQ Diploma in Social Service — In Progress (Tsao Foundation / SCTP)",
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications wsq diploma social service tsao foundation sctp career transition microsoft azure ai engineer google professional machine learning engineer professional development eldercare social service",
  },
  vision: {
    sections: [
      {
        title: "Inclusive & Relevant AAC Programming",
        body: "Design and evaluate a holistic AAC programme calendar grounded in the 5 dimensions of wellbeing — physical, cognitive, social, emotional, and spiritual — using structured data collection, regular senior feedback, and observation reports shared with supervisors to ensure every activity remains deeply relevant and impactful for LBSA's members. The goal: every senior leaves the AAC feeling seen, engaged, and enriched.",
      },
      {
        title: "Community Partnership Network",
        body: "Build and sustain structured relationships with community partners, corporate organisations, educational institutions, and volunteer groups to continuously expand LBSA's outreach reach, recruit new senior members through targeted block-level engagement, and create a vibrant, connected community ecosystem. Every partnership serves one purpose: more seniors reached, better served, and more deeply befriended.",
      },
      {
        title: "Volunteer-Powered Senior Wellbeing",
        body: "Develop a structured volunteer engagement pipeline — proactively identifying, onboarding, supporting, recognising, and retaining volunteers who directly enhance the daily lives of LBSA's seniors. Provide meaningful input during volunteer appraisals and make evidence-based recommendations to Volunteer Management, building a volunteer community as committed to seniors as Lions Befrienders itself.",
      },
    ],
    closing: {
      title: "Technology + Compassion for Lions Befrienders' Seniors",
      body: "John's combination of WSQ Diploma in Social Service (with 16-day AAC fieldwork, Community Screener Tool application, and hands-on needs assessment) and 6+ years of enterprise programme management, stakeholder engagement, and data-driven evaluation experience uniquely equips him to contribute to LBSA's mission from day one. Every programme he plans, every partner relationship he builds, every senior he recruits and befriends — all will reflect both operational rigour and genuine compassion. Because for LBSA's seniors, quality of life depends on both.",
    },
    searchText: "vision inclusive aac programming 5 dimensions wellbeing physical cognitive social emotional spiritual data collection evaluation senior feedback community partnership network corporate educational institutions volunteer groups outreach member recruitment block-level engagement befriending volunteer-powered senior wellbeing volunteer pipeline onboarding recognition retention volunteer management appraisal lbsa lions befrienders technology compassion wsq diploma fieldwork community screener tool needs assessment programme management stakeholder engagement",
  },
  stats: [
    { value: '16', label: 'Days AAC Fieldwork' },
    { value: '3+', label: 'Years Stakeholder Mgmt' },
    { value: '200+', label: 'Partners Managed' },
    { value: '5', label: 'Dimensions of Wellbeing' },
  ],
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors related to `resumeLBSA.ts`

**Step 3: Commit**

```bash
git add src/data/resumeLBSA.ts
git commit -m "feat: add resumeLBSA data file for LBSA Programme Executive role"
```

---

## Task 2: Update `roleContext.tsx` — wire LBSA as default role

**Files:**
- Modify: `src/lib/roleContext.tsx`

**Step 1: Replace the file content**

```ts
// src/lib/roleContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resume } from '@/data/resume'
import { resumeLBSA } from '@/data/resumeLBSA'

export type Role = 'lbsa' | 'automation'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'lbsa',
  resumeData: resumeLBSA,
  switcherHref: (path) => path,
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('lbsa')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'automation' ? 'automation' : 'lbsa')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'automation' ? resume : resumeLBSA

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'lbsa' ? 'automation' : 'lbsa'
    if (targetRole === 'lbsa') return currentPath
    return `${currentPath}?role=${targetRole}`
  }, [role])

  return (
    <RoleContext.Provider value={{ role, resumeData, switcherHref }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

**Step 3: Commit**

```bash
git add src/lib/roleContext.tsx
git commit -m "feat: replace touch role with lbsa in roleContext"
```

---

## Task 3: Update `Sidebar.tsx` — LBSA labels and PDF paths

**Files:**
- Modify: `src/components/Sidebar/Sidebar.tsx`

**Step 1: Replace the file content**

```tsx
// src/components/Sidebar/Sidebar.tsx
'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { getSearchPages, searchSections } from '@/lib/navigation'
import { useSearch } from '@/lib/searchContext'
import { useRole } from '@/lib/roleContext'
import NavItem from '@/components/NavItem/NavItem'
import SearchBox from '@/components/SearchBox/SearchBox'
import styles from './Sidebar.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname()
  const { query, setQuery } = useSearch()
  const { role, resumeData, switcherHref } = useRole()

  const pages = useMemo(() => getSearchPages(resumeData), [resumeData])
  const visiblePages = useMemo(() => searchSections(query, pages), [query, pages])

  const isLBSA = role === 'lbsa'
  const pdfHref = isLBSA
    ? '/assets/John_Tan_Resume_LBSA.pdf'
    : '/assets/John_Tan_Resume_Automation.pdf'
  const pdfFilename = isLBSA
    ? 'John_Tan_Resume_LBSA.pdf'
    : 'John_Tan_Resume_Automation.pdf'
  const switchLabel = isLBSA
    ? 'Switch: Automation Specialist →'
    : 'Switch: Programme Executive →'
  const roleLabel = isLBSA ? 'LBSA' : 'Automation'

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      role="navigation"
      aria-label="Resume navigation"
    >
      <div className={styles.header}>
        <div className={styles.monogram}>JT</div>
        <div className={styles.name}>{resumeData.name}</div>
        <div className={styles.subtitle}>
          {isLBSA ? 'Programme Executive · LBSA' : 'Automation Specialist · NTUC Health'}
        </div>
        <div className={styles.roleBadge}>
          <span className={styles.roleDot}>●</span> {roleLabel}
        </div>
      </div>

      <div className={styles.searchSection}>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      <nav className={styles.nav}>
        {visiblePages.map(page => (
          <NavItem key={page.path} page={page} currentPath={pathname} onNavigate={onClose} />
        ))}
        {visiblePages.length === 0 && (
          <div style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            No sections found
          </div>
        )}
      </nav>

      <div className={styles.downloadSection}>
        <a
          href={pdfHref}
          download={pdfFilename}
          className={styles.downloadBtn}
        >
          ⬇ Download PDF
        </a>
        <a
          href={switcherHref(pathname)}
          className={styles.switcherLink}
        >
          {switchLabel}
        </a>
      </div>
    </aside>
  )
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Sidebar/Sidebar.tsx
git commit -m "feat: update Sidebar for LBSA role — labels, PDF paths, switcher"
```

---

## Task 4: Update `globals.css` — Lion Befrienders blue/white theme

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace the TOUCH theme block at the bottom of the file**

Find this block:
```css
/* TOUCH Volunteer Management theme — forest green + coral */
[data-role="touch"] {
  --navy:       #1e3d2f;
  --navy-dark:  #122a1f;
  --navy-mid:   #2d5a40;
  --gold:       #e07055;
  --gold-light: #f5b8a8;
  --gold-dim:   #b85a44;
  --surface:    #faf8f4;
  --border:     #e5ddd4;
}
```

Replace with:
```css
/* LBSA Programme Executive theme — Lion Befrienders blue/white */
[data-role="lbsa"] {
  --navy:       #1565C0;
  --navy-dark:  #0D47A1;
  --navy-mid:   #1976D2;
  --gold:       #42A5F5;
  --gold-light: #90CAF9;
  --gold-dim:   #1E88E5;
  --surface:    #FFFFFF;
  --border:     #E3F2FD;
}
```

**Step 2: Verify no TypeScript errors (CSS change only, but confirm build is clean)**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add LBSA blue/white theme, remove TOUCH theme"
```

---

## Task 5: Update tests — replace `resumeTOUCH` with `resumeLBSA`

**Files:**
- Modify: `src/__tests__/navigation.test.ts`

**Step 1: Replace the file content**

```ts
import {
  PAGES,
  getPageIndex,
  getAdjacentPages,
  searchSections,
  getSearchPages,
} from '@/lib/navigation'
import { resume } from '@/data/resume'
import { resumeLBSA } from '@/data/resumeLBSA'

describe('PAGES', () => {
  it('has 9 entries', () => {
    expect(PAGES).toHaveLength(9)
  })

  it('first page is /', () => {
    expect(PAGES[0].path).toBe('/')
  })

  it('last page is /vision', () => {
    expect(PAGES[PAGES.length - 1].path).toBe('/vision')
  })
})

describe('getPageIndex', () => {
  it('returns 0 for /', () => {
    expect(getPageIndex('/')).toBe(0)
  })

  it('returns 8 for /vision', () => {
    expect(getPageIndex('/vision')).toBe(8)
  })

  it('returns -1 for unknown path', () => {
    expect(getPageIndex('/unknown')).toBe(-1)
  })
})

describe('getAdjacentPages', () => {
  it('returns null prev for first page', () => {
    expect(getAdjacentPages('/').prev).toBeNull()
  })

  it('returns null next for last page', () => {
    expect(getAdjacentPages('/vision').next).toBeNull()
  })

  it('returns correct prev and next for middle page', () => {
    const adj = getAdjacentPages('/competencies')
    expect(adj.prev?.path).toBe('/summary')
    expect(adj.next?.path).toBe('/experience/cogent')
  })
})

describe('searchSections', () => {
  it('returns all pages for empty query', () => {
    expect(searchSections('')).toHaveLength(9)
  })

  it('finds summary page for "uipath"', () => {
    const results = searchSections('uipath')
    expect(results.some(p => p.path === '/summary')).toBe(true)
  })

  it('finds experience/cogent for "cogent"', () => {
    const results = searchSections('cogent')
    expect(results.some(p => p.path === '/experience/cogent')).toBe(true)
  })

  it('returns empty array for nonsense query', () => {
    expect(searchSections('xyzzy999nonsense')).toHaveLength(0)
  })

  it('is case-insensitive', () => {
    const lower = searchSections('azure')
    const upper = searchSections('AZURE')
    expect(lower).toEqual(upper)
  })
})

describe('getSearchPages', () => {
  it('returns 9 pages for automation resume', () => {
    expect(getSearchPages(resume)).toHaveLength(9)
  })

  it('returns 9 pages for LBSA resume', () => {
    expect(getSearchPages(resumeLBSA)).toHaveLength(9)
  })

  it('automation pages contain uipath in summary searchText', () => {
    const pages = getSearchPages(resume)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('uipath')
  })

  it('LBSA pages contain active ageing in summary searchText', () => {
    const pages = getSearchPages(resumeLBSA)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('active ageing')
  })

  it('LBSA pages contain community screener tool in education searchText', () => {
    const pages = getSearchPages(resumeLBSA)
    const education = pages.find(p => p.path === '/education')!
    expect(education.searchText.toLowerCase()).toContain('community screener tool')
  })

  it('first page is / for both roles', () => {
    expect(getSearchPages(resume)[0].path).toBe('/')
    expect(getSearchPages(resumeLBSA)[0].path).toBe('/')
  })

  it('last page is /vision for both roles', () => {
    const autoPages = getSearchPages(resume)
    const lbsaPages = getSearchPages(resumeLBSA)
    expect(autoPages[autoPages.length - 1].path).toBe('/vision')
    expect(lbsaPages[lbsaPages.length - 1].path).toBe('/vision')
  })
})
```

**Step 2: Run tests — expect all to pass**

```bash
npm test
```

Expected: all tests green

**Step 3: Commit**

```bash
git add src/__tests__/navigation.test.ts
git commit -m "test: update navigation tests for LBSA role, replace resumeTOUCH refs"
```

---

## Task 6: Delete `resumeTOUCH.ts` and remove TOUCH PDF

**Files:**
- Delete: `src/data/resumeTOUCH.ts`
- Delete: `public/assets/John_Tan_Resume_TOUCH.pdf`

**Step 1: Delete the retired files**

```bash
git rm src/data/resumeTOUCH.ts
git rm public/assets/John_Tan_Resume_TOUCH.pdf
```

**Step 2: Verify TypeScript compiles (no dangling imports)**

```bash
npx tsc --noEmit
```

Expected: no errors — confirm nothing still imports `resumeTOUCH`

**Step 3: Run tests**

```bash
npm test
```

Expected: all tests still pass

**Step 4: Commit**

```bash
git commit -m "chore: remove retired TOUCH role files (resumeTOUCH.ts, TOUCH PDF)"
```

---

## Task 7: Generate and add `John_Tan_Resume_LBSA.pdf`

**Files:**
- Create: `public/assets/John_Tan_Resume_LBSA.pdf`

**Step 1: Use the `anthropic-skills:pdf` skill to generate the PDF**

Invoke `anthropic-skills:pdf` skill with this content spec:

The PDF should be a clean, ATS-optimised, 1-2 page resume:

```
John Tan
Programme Executive | Active Ageing Centre | Social Service
vieming@gmail.com | 98891383 | linkedin.com/in/john-tan-02763732

PROFESSIONAL SUMMARY
[resumeLBSA.summary.body — full text]

KEY COMPETENCIES
Community Outreach & Member Recruitment (Community Screener Tool) | Stakeholder Engagement & Partnership Building
Volunteer Coordination & Support | Needs Assessment & Senior Member Tiering
Programme Planning, Implementation & Evaluation | Data Collection, Analysis & Reporting
Budget Management & Financial Documentation | Microsoft Office & Digital Programme Tools
5 Dimensions of Wellbeing (Active Ageing Framework) | Ethics, Legislation & Social Policy (WSQ)
Eldercare Coordination & Befriending Principles

WORK EXPERIENCE

Community Engagement & Outreach Lead — Cogent Holdings Pte Ltd (2022 – Present)
[3 bullets from resumeLBSA.experience[0]]

Programme Coordinator (Planning & Evaluation) — ST Engineering (2019 – 2022)
[3 bullets from resumeLBSA.experience[1]]

Director / Stakeholder & Relationship Management — ABN AMRO (2017 – 2019)
[3 bullets from resumeLBSA.experience[2]]

EDUCATION

WSQ Diploma in Social Service — Tsao Foundation (Hua Mei Training Academy) | 2026 – Present
Candidate for Graduation; SCTP Career Transition Programme
• Key Modules: Volunteer Programme Management; Stakeholder Management; Ethics & Legislation; Social Policy Implementation; Financial Management
• Industrial Attachment: 16-day hands-on fieldwork at Active Ageing Centre — applied Community Screener Tool for new member intake, conducted needs assessments, tiered seniors by care complexity, supported care coordination for vulnerable seniors; direct on-the-ground AAC operational experience
• Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management

MBA — Nanyang Technological University (NTU) | 2001 – 2003
Dean's Honors List — strategic management, stakeholder leadership, and organisational behaviour

Bachelor of Science in Mathematics — National University of Singapore (NUS) | 1994
Public Service Commission Scholarship

CERTIFICATIONS
• WSQ Diploma in Social Service — In Progress (Tsao Foundation / SCTP)
• Microsoft Certified: Azure AI Engineer Associate
• Google Professional Machine Learning Engineer
```

Save output to: `public/assets/John_Tan_Resume_LBSA.pdf`

**Step 2: Verify the file exists and is non-zero**

```bash
ls -la public/assets/John_Tan_Resume_LBSA.pdf
```

Expected: file present, size > 0

**Step 3: Commit**

```bash
git add public/assets/John_Tan_Resume_LBSA.pdf
git commit -m "feat: add LBSA Programme Executive PDF resume"
```

---

## Task 8: Create `CLAUDE.md`

**Files:**
- Create: `CLAUDE.md`

**Step 1: Create the file**

```markdown
# CLAUDE.md — John Tan Resume App

## Project Purpose

Interactive Next.js resume web app for John Tan, supporting two tailored role variants:
- **LBSA** (default): Programme Executive at Lions Befrienders Service Association — Active Ageing Centre
- **Automation**: Automation Specialist / RPA Engineer (NTUC Health target)

## Architecture

### Dual-Role System
Role is determined by the `?role=` URL query param:
- No param / `?role=lbsa` → LBSA Programme Executive (default)
- `?role=automation` → Automation Specialist

`src/lib/roleContext.tsx` reads the param on mount, sets `data-role` on `<html>`, and provides `resumeData` + `switcherHref` to all components via React context.

### Data Files
- `src/data/resume.ts` — Automation Specialist resume data (NTUC Health target)
- `src/data/resumeLBSA.ts` — LBSA Programme Executive resume data (Lions Befrienders target)

### Theming
CSS variables in `src/app/globals.css`:
- Default (`:root`) — navy/gold theme (Automation)
- `[data-role="lbsa"]` — Lion Befrienders blue/white theme

### Pages
9 pages via Next.js App Router:
`/` · `/summary` · `/competencies` · `/experience/cogent` · `/experience/st-engineering` · `/experience/abnamro` · `/education` · `/certifications` · `/vision`

All pages read from `useRole().resumeData` — no page-level role logic.

### PDF Downloads
Static PDFs in `public/assets/`:
- `John_Tan_Resume_Automation.pdf` — served when `role === 'automation'`
- `John_Tan_Resume_LBSA.pdf` — served when `role === 'lbsa'` (default)

The sidebar Download button serves the correct PDF per role.
The `/download/resume` API route serves only the Automation PDF (direct API download).

## LBSA Role Context

Target: **Programme Executive, Active Ageing Centre — Lions Befrienders Service Association (LBSA)**

Key JD requirements addressed in resumeLBSA.ts:
- Community Outreach Plan execution
- Community Screener Tool (member intake & tiering)
- 5 Dimensions of Wellbeing programme relevance
- Volunteer coordination & support
- Stakeholder & partner relationship management
- Programme planning, implementation, evaluation
- Budget documentation & financial reporting

Key differentiators emphasised:
- WSQ Diploma in Social Service (Tsao Foundation, SCTP) — currently enrolled
- 16-day AAC fieldwork — hands-on Community Screener Tool, needs assessment, senior tiering
- Diploma in Social Service: Volunteer Programme Management module

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm test         # run Jest tests
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

## Tests

- `src/__tests__/navigation.test.ts` — tests for PAGES, getPageIndex, getAdjacentPages, searchSections, getSearchPages (covers both resume + resumeLBSA)
- `src/__tests__/resume-download-route.test.ts` — tests the /download/resume API route

## Retired
- `resumeTOUCH.ts` (TOUCH Volunteer Management role) — removed in March 2026
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md documenting dual-role architecture and LBSA context"
```

---

## Task 9: Final verification

**Step 1: TypeScript clean**

```bash
npx tsc --noEmit
```

Expected: 0 errors

**Step 2: ESLint clean**

```bash
npm run lint
```

Expected: 0 errors, 0 warnings

**Step 3: All tests pass**

```bash
npm test
```

Expected: all tests green

**Step 4: Build succeeds**

```bash
npm run build
```

Expected: build completes with no errors

**Step 5: Confirm no remaining `touch` role references in source**

```bash
grep -r "resumeTOUCH\|role.*touch\|touch.*role\|data-role.*touch" src/ --include="*.ts" --include="*.tsx"
```

Expected: 0 results

**Step 6: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: final cleanup after LBSA role migration"
```

---

## Success Criteria

1. `?role=lbsa` (or no param) renders LBSA content with LB blue/white theme
2. `?role=automation` renders Automation content with navy/gold theme
3. Sidebar switcher toggles correctly between the two roles
4. Download PDF button serves `John_Tan_Resume_LBSA.pdf` for LBSA, `John_Tan_Resume_Automation.pdf` for Automation
5. All 9 Jest tests pass
6. TypeScript compiles clean (`npx tsc --noEmit`)
7. ESLint passes (`npm run lint`)
8. Production build succeeds (`npm run build`)
9. No remaining references to `resumeTOUCH` or `touch` role in source
10. `CLAUDE.md` documents the architecture
