# TOUCH Volunteer Management Executive Resume App — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the existing Next.js 14 resume app to serve dual roles: TOUCH Volunteer Management Executive (default, forest-green/coral theme) and Automation Specialist (existing navy/gold, `?role=automation`).

**Architecture:** A `RoleProvider` in `AppShell.tsx` reads `window.location.search` on mount to detect `?role=automation`, defaults to `touch`. It sets `data-role` on `<html>` for CSS-driven theming and exposes `{ role, resumeData }` via context. All page components switch from direct `resume` imports to `useRole()`. Navigation search becomes role-aware via a `getSearchPages(resumeData)` helper.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, CSS Modules, Framer Motion, Python (reportlab for PDF), Vercel

---

## Task 1: Create `src/data/resumeTOUCH.ts`

**Files:**
- Create: `src/data/resumeTOUCH.ts`

This is the single source of truth for all TOUCH content. No tests needed (pure data).

**Step 1: Create the file with full TOUCH resume data**

```typescript
import type { ResumeData } from './resume'

export const resumeTOUCH: ResumeData = {
  name: "John Tan",
  title: "Volunteer Management Executive | Digital Community Engagement",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-automation-specialist.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Community Engagement Strategist | Volunteer Management | Digital Transformation",
    body: "Purpose-driven professional making a deliberate career transition into volunteer management, bringing 6+ years of enterprise digital transformation experience — Google Workspace automation, multi-system integration, end-to-end programme management — directly to TOUCH's mandate of cultivating a centralised digital volunteer management system. Currently completing WSQ Diploma in Social Service (Tsao Foundation), with a dedicated Volunteer Programme Management module and 16-day fieldwork at an Active Ageing Centre. Combines rigorous stakeholder management and data analytics expertise (honed across finance, engineering and technology sectors) with genuine passion for community empowerment — uniquely positioned to support TOUCH's Head of Volunteer Management in advancing Vision 2030.",
    searchText: "summary community engagement strategist volunteer management digital transformation stakeholder engagement partnership building centralised digital system wsq diploma social service tsao foundation volunteer programme management active ageing vision 2030 data analytics empowerment",
  },
  competencies: {
    leadership: [
      "Stakeholder Engagement & Partnership Building",
      "Volunteer Coordinator Training & Programme Support",
      "Cross-departmental Collaboration & Volunteer Sharing",
      "People Management & Negotiation",
    ],
    technical: [
      "Digital Volunteer Management Systems Adoption",
      "Process Optimisation & Workflow Design",
      "Data Management, Analysis & Reporting",
      "Project & Event Coordination",
    ],
    socialService: [
      "Volunteer Risk Assessment & Governance",
      "Survey Analysis & Volunteer Upskilling",
      "Ethics, Social Policy & Legislation (WSQ)",
      "Service Recovery & Crisis Management",
    ],
    searchText: "competencies stakeholder engagement partnership volunteer coordinator training cross-departmental collaboration people management negotiation digital volunteer management process optimisation data management reporting project event coordination risk assessment survey upskilling ethics social policy service recovery crisis management",
  },
  experience: [
    {
      id: "cogent",
      role: "Digital Transformation Lead",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Digital System Rollout: Architected and led enterprise-wide adoption of centralised digital workflow systems across multiple departments, reducing manual coordination effort by 30% — directly applicable to TOUCH's mandate of cultivating a unified digital volunteer management platform across all service lines.",
        "Volunteer Coordinator Training Analogue: Designed comprehensive training materials and onboarding programmes adopted by 40+ team members across departments, building the facilitation and instructional design skills needed to educate TOUCH Volunteer Coordinators on new systems, corporate vision, and volunteer engagement best practices.",
        "Cross-departmental Collaboration: Led structured cross-functional working groups to align process standards and enable resource sharing across business units — mirroring TOUCH's requirement for cross-departmental volunteer sharing, retention, and collaboration to advance organisational goals.",
      ],
      searchText: "digital transformation lead cogent holdings centralised digital system workflow 30% training materials onboarding 40 team members facilitation instructional design volunteer coordinator cross-departmental collaboration resource sharing process standards",
    },
    {
      id: "st-engineering",
      role: "Programme Manager (Process & Operations)",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "Programme Management: Managed 3 complete end-to-end programme cycles — from discovery and planning through execution, monitoring, and post-implementation review — demonstrating the project coordination rigour required to plan and execute TOUCH's volunteer appreciation events, training sessions, and service-specific Volunteer Coordinator meetings.",
        "Data Management & Reporting: Built and maintained reporting dashboards tracking KPIs across multiple operational units; directly maps to co-managing TOUCH's volunteer database, ensuring accurate records, collating engagement data, and submitting analytical reports to leadership.",
        "Process Documentation & Risk Assessment: Conducted systematic process audits and annual risk assessments across enterprise workflows, producing structured risk registers and remediation plans — directly applicable to TOUCH's requirement to conduct volunteer risk assessments annually across various services.",
      ],
      searchText: "programme manager process operations st engineering programme management end-to-end planning execution monitoring post-implementation volunteer appreciation events training sessions data management reporting kpis volunteer database accurate records analytical reports process documentation risk assessment annual risk registers",
    },
    {
      id: "abnamro",
      role: "Director / Private Wealth Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Stakeholder Management & Budget Governance: Managed strategic relationships with 200+ high-net-worth clients and oversaw portfolio operations with strict budget accountability across multiple programmes — satisfying TOUCH's requirement for at least 3 years of experience in project, stakeholder, and budget management.",
        "Partnership & Community Engagement: Built strategic partnerships with external organisations, family offices, and government agencies to create meaningful outcomes — directly transferable to TOUCH's stakeholder engagement, partnership-building, and volunteer opportunity development mandate for community benefit.",
        "People Management & Negotiation: Partnered with diverse cross-functional internal teams and external counterparties, applying strong negotiation and interpersonal skills to deliver client-centred solutions — the same empathic, collaborative approach John brings to engaging, retaining, and empowering TOUCH's volunteer ecosystem.",
      ],
      searchText: "director private wealth management abn amro stakeholder management budget governance 200 clients portfolio operations project stakeholder budget management partnership community engagement external organisations government agencies volunteer opportunity negotiation people management cross-functional empathic empowering",
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
          "Industrial Attachment: 16-day fieldwork with Active Ageing Centre — care coordination for vulnerable seniors, gaining firsthand understanding of volunteer-service user dynamics and community needs",
          "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service — directly supports TOUCH's digital transformation and community engagement roadmap",
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
    searchText: "education wsq diploma social service tsao foundation hua mei volunteer programme management stakeholder management ethics legislation social policy financial management active ageing fieldwork mba ntu nanyang dean honors list strategic management organisational behaviour bachelor mathematics nus public service commission scholarship",
  },
  certifications: {
    items: [
      "WSQ Volunteer Programme Management (Module — In Progress)",
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications wsq volunteer programme management microsoft azure ai engineer google professional machine learning engineer professional development",
  },
  vision: {
    sections: [
      {
        title: "Centralised Digital Volunteer Ecosystem",
        body: "Champion the adoption and continuous improvement of TOUCH's unified digital volunteer management platform: streamlining recruitment, engagement, and retention workflows across all service lines, enabling real-time volunteer availability tracking and communication, and eliminating duplicate manual coordination effort so Volunteer Coordinators can focus on meaningful community connections.",
      },
      {
        title: "Data-Driven Volunteer Engagement & Retention",
        body: "Build analytics pipelines from volunteer survey data to proactively identify upskilling opportunities, recognition moments, and retention risks — enabling evidence-based decisions on volunteer appreciation programme design, training content, and cross-departmental volunteer sharing initiatives that keep TOUCH's volunteer community thriving.",
      },
      {
        title: "Community Partnership Network",
        body: "Develop structured partnership pipelines with corporate organisations, educational institutions, and government agencies to continuously expand TOUCH's volunteer base — creating meaningful, sustained volunteer opportunities that empower communities, strengthen TOUCH's external network, and advance Vision 2030's mission of enabling seniors to age actively and gracefully.",
      },
    ],
    closing: {
      title: "A Technology-Empathy Bridge for TOUCH's Volunteer Community",
      body: "John's rare combination — 6+ years of enterprise digital transformation expertise and WSQ Diploma in Social Service (including the Volunteer Programme Management module and Active Ageing Centre fieldwork) — uniquely equips him to bridge TOUCH's two most pressing needs: modernising volunteer systems and deepening human connections. Every initiative he leads will be designed not just for operational efficiency, but for lasting community impact and empowerment.",
    },
    searchText: "vision centralised digital volunteer ecosystem platform recruitment engagement retention volunteer coordinator community connections data-driven survey analytics upskilling appreciation retention risk cross-departmental community partnership network corporate educational government volunteer base vision 2030 active ageing technology empathy digital transformation social service",
  },
}
```

**Step 2: Commit**

```bash
git add src/data/resumeTOUCH.ts
git commit -m "feat: add TOUCH Volunteer Management Executive resume data"
```

---

## Task 2: Extend `ResumeData` interface + add stats to automation resume

**Files:**
- Modify: `src/data/resume.ts`

The `SummaryPage` shows hardcoded stats. We need role-specific stats in the data.

**Step 1: Add `stats` field to `ResumeData` interface and automation resume**

In `src/data/resume.ts`, add to the `ResumeData` interface (after `vision`):
```typescript
  stats: { value: string; label: string }[]
```

Then add `stats` to the `resume` export object (after `vision`):
```typescript
  stats: [
    { value: '3+', label: 'Years RPA Experience' },
    { value: '50%+', label: 'Efficiency Gains' },
    { value: '5+', label: 'Languages Mastered' },
    { value: '3', label: 'Enterprise Integrations' },
  ],
```

**Step 2: Add `stats` to `resumeTOUCH.ts`** (in `src/data/resumeTOUCH.ts`, at the end before closing `}`):
```typescript
  stats: [
    { value: '6+', label: 'Years Digital Transformation' },
    { value: '3+', label: 'Years Stakeholder Management' },
    { value: '200+', label: 'Stakeholders Managed' },
    { value: '16', label: 'Days Community Fieldwork' },
  ],
```

**Step 3: Commit**

```bash
git add src/data/resume.ts src/data/resumeTOUCH.ts
git commit -m "feat: add stats field to ResumeData interface"
```

---

## Task 3: Refactor `src/lib/navigation.ts` for role-aware search

**Files:**
- Modify: `src/lib/navigation.ts`

The sidebar uses `searchSections(query)` which currently has hardcoded searchText from the automation resume. We need role-aware search.

**Step 1: Write failing test first** in `src/lib/__tests__/navigation-role.test.ts`:
```typescript
import { getSearchPages, searchSections } from '@/lib/navigation'
import { resume } from '@/data/resume'
import { resumeTOUCH } from '@/data/resumeTOUCH'

describe('getSearchPages', () => {
  it('returns 9 pages', () => {
    expect(getSearchPages(resume)).toHaveLength(9)
    expect(getSearchPages(resumeTOUCH)).toHaveLength(9)
  })

  it('automation pages include uipath in summary searchText', () => {
    const pages = getSearchPages(resume)
    const summaryPage = pages.find(p => p.path === '/summary')!
    expect(summaryPage.searchText.toLowerCase()).toContain('uipath')
  })

  it('TOUCH pages include volunteer in summary searchText', () => {
    const pages = getSearchPages(resumeTOUCH)
    const summaryPage = pages.find(p => p.path === '/summary')!
    expect(summaryPage.searchText.toLowerCase()).toContain('volunteer')
  })
})

describe('searchSections with pages param', () => {
  it('searches TOUCH pages for volunteer', () => {
    const pages = getSearchPages(resumeTOUCH)
    const results = searchSections('volunteer', pages)
    expect(results.length).toBeGreaterThan(0)
  })

  it('backward compat: searchSections with no pages uses automation PAGES', () => {
    const results = searchSections('uipath')
    expect(results.some(p => p.path === '/summary')).toBe(true)
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern="navigation-role" --no-coverage
```
Expected: FAIL — `getSearchPages` is not exported

**Step 3: Add `getSearchPages` to `src/lib/navigation.ts`**

Add this function after the `PAGES` constant (keep PAGES unchanged for backward compat):

```typescript
export function getSearchPages(resumeData: ResumeData): PageMeta[] {
  return [
    {
      path: '/',
      label: 'Home',
      icon: '🏠',
      searchText: `${resumeData.name} ${resumeData.title} ${Object.values(resumeData.contact).join(' ')}`,
    },
    {
      path: '/summary',
      label: 'Summary',
      icon: '📝',
      searchText: resumeData.summary.searchText,
    },
    {
      path: '/competencies',
      label: 'Competencies',
      icon: '⭐',
      searchText: resumeData.competencies.searchText,
    },
    {
      path: '/experience/cogent',
      label: 'Cogent',
      icon: '🤝',
      searchText: resumeData.experience[0].searchText,
    },
    {
      path: '/experience/st-engineering',
      label: 'ST Engineering',
      icon: '⚙️',
      searchText: resumeData.experience[1].searchText,
    },
    {
      path: '/experience/abnamro',
      label: 'ABN AMRO',
      icon: '💼',
      searchText: resumeData.experience[2].searchText,
    },
    {
      path: '/education',
      label: 'Education',
      icon: '🎓',
      searchText: resumeData.education.searchText,
    },
    {
      path: '/certifications',
      label: 'Certifications',
      icon: '🏅',
      searchText: resumeData.certifications.searchText,
    },
    {
      path: '/vision',
      label: 'Vision',
      icon: '💡',
      searchText: resumeData.vision.searchText,
    },
  ]
}
```

Also update `searchSections` to accept an optional pages param:
```typescript
export function searchSections(query: string, pages: PageMeta[] = PAGES): PageMeta[] {
  if (!query.trim()) return pages
  const q = query.toLowerCase()
  return pages.filter(p => p.searchText.toLowerCase().includes(q))
}
```

Add the `ResumeData` import at top:
```typescript
import type { ResumeData } from '@/data/resume'
```

**Step 4: Run tests to verify they pass**

```bash
npm test -- --no-coverage
```
Expected: All PASS

**Step 5: Commit**

```bash
git add src/lib/navigation.ts src/lib/__tests__/navigation-role.test.ts
git commit -m "feat: add getSearchPages for role-aware navigation search"
```

---

## Task 4: Create `src/lib/roleContext.tsx`

**Files:**
- Create: `src/lib/roleContext.tsx`

**Step 1: Create the role context**

```typescript
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resume } from '@/data/resume'
import { resumeTOUCH } from '@/data/resumeTOUCH'

export type Role = 'touch' | 'automation'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'touch',
  resumeData: resumeTOUCH,
  switcherHref: () => '/',
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('touch')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'automation' ? 'automation' : 'touch')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'automation' ? resume : resumeTOUCH

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'touch' ? 'automation' : 'touch'
    if (targetRole === 'touch') return currentPath
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

**Step 2: Commit**

```bash
git add src/lib/roleContext.tsx
git commit -m "feat: add RoleProvider context for dual-role resume"
```

---

## Task 5: Extend `src/app/globals.css` with TOUCH theme

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add TOUCH theme overrides**

Append to `globals.css` after the existing `:root` block:

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

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add TOUCH forest-green/coral CSS theme tokens"
```

---

## Task 6: Update `src/app/layout.tsx` — metadata + RoleProvider

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout to include RoleProvider and update metadata**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'
import { DirectionProvider } from '@/lib/directionContext'
import { SearchProvider } from '@/lib/searchContext'
import { RoleProvider } from '@/lib/roleContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'John Tan — Resume',
  description: 'John Tan | Volunteer Management Executive | Digital Transformation | Community Engagement | Singapore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <DirectionProvider>
          <SearchProvider>
            <RoleProvider>
              <AppShell>{children}</AppShell>
            </RoleProvider>
          </SearchProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wrap app with RoleProvider, update metadata"
```

---

## Task 7: Update `src/components/AppShell/AppShell.tsx` — role-aware hamburger

**Files:**
- Modify: `src/components/AppShell/AppShell.tsx`

The hamburger button hardcodes `var(--navy)` and `var(--gold)` — these already use CSS variables so they'll automatically pick up the TOUCH theme. No functional change needed here. Just verify it compiles.

**Step 1: Verify AppShell uses CSS variables (not hardcoded colors)**

The hamburger already uses `background: 'var(--navy)'` and `color: 'var(--gold)'` — these automatically inherit the `[data-role="touch"]` overrides. No code change needed.

**Step 2: Commit note**

No commit needed for this task — CSS variables handle the theme automatically.

---

## Task 8: Update `src/components/Sidebar/Sidebar.tsx` — role badge + switcher + PDF

**Files:**
- Modify: `src/components/Sidebar/Sidebar.tsx`
- Modify: `src/components/Sidebar/Sidebar.module.css`

**Step 1: Update Sidebar.tsx**

```typescript
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

  const isTOUCH = role === 'touch'
  const pdfHref = isTOUCH
    ? '/assets/John_Tan_Resume_TOUCH.pdf'
    : '/assets/John_Tan_Resume_Automation.pdf'
  const pdfFilename = isTOUCH
    ? 'John_Tan_Resume_TOUCH.pdf'
    : 'John_Tan_Resume_Automation.pdf'
  const switchLabel = isTOUCH
    ? 'Switch: Automation Specialist →'
    : 'Switch: Volunteer Mgmt Exec →'
  const roleLabel = isTOUCH ? 'TOUCH' : 'NTUC Health'

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
          {isTOUCH ? 'Volunteer Management · TOUCH' : 'Automation Specialist · NTUC Health'}
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

**Step 2: Add `.roleBadge`, `.roleDot`, `.switcherLink` to `Sidebar.module.css`**

Open `src/components/Sidebar/Sidebar.module.css` and add these rules at the end:

```css
.roleBadge {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-light);
  opacity: 0.9;
}

.roleDot {
  color: var(--gold);
}

.switcherLink {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: color 0.2s;
}

.switcherLink:hover {
  color: rgba(255, 255, 255, 0.75);
}
```

**Step 3: Commit**

```bash
git add src/components/Sidebar/Sidebar.tsx src/components/Sidebar/Sidebar.module.css
git commit -m "feat: add role badge, switcher link, and role-specific PDF download to sidebar"
```

---

## Task 9: Update `src/components/pages/HeroPage.tsx`

**Files:**
- Modify: `src/components/pages/HeroPage.tsx`

**Step 1: Make HeroPage consume roleContext**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import styles from './HeroPage.module.css'

export default function HeroPage() {
  const { resumeData, role } = useRole()
  const tagline = role === 'touch'
    ? 'Stakeholder Engagement · Volunteer Coordination · Digital Systems · Community Empowerment'
    : 'UiPath · Google Cloud · RPA · 50%+ Efficiency Gains'

  return (
    <div className={styles.page}>
      <div className={styles.monogram}>JT</div>
      <h1 className={styles.name}>{resumeData.name}</h1>
      <p className={styles.title}>{resumeData.title}</p>
      <div className={styles.divider} />
      <div className={styles.contacts}>
        <a href={`mailto:${resumeData.contact.email}`} className={styles.contactItem}>
          ✉ {resumeData.contact.email}
        </a>
        <a
          href={`https://${resumeData.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🔗 LinkedIn
        </a>
        <a
          href={`https://${resumeData.contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🌐 {resumeData.contact.website}
        </a>
        <a href={`tel:${resumeData.contact.phone}`} className={styles.contactItem}>
          📞 {resumeData.contact.phone}
        </a>
      </div>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/HeroPage.tsx
git commit -m "feat: make HeroPage role-aware"
```

---

## Task 10: Update `src/components/pages/SummaryPage.tsx`

**Files:**
- Modify: `src/components/pages/SummaryPage.tsx`

**Step 1: Replace hardcoded stats with role-aware stats from resumeData**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import { useSearch } from '@/lib/searchContext'
import { highlightText } from '@/lib/highlight'
import styles from './SummaryPage.module.css'

export default function SummaryPage() {
  const { query } = useSearch()
  const { resumeData } = useRole()

  return (
    <div className={styles.page}>
      <div className={styles.section}>Professional Summary</div>
      <blockquote className={styles.tagline}>
        {highlightText(resumeData.summary.tagline, query)}
      </blockquote>
      <p className={styles.body}>{highlightText(resumeData.summary.body, query)}</p>
      <div className={styles.stats}>
        {resumeData.stats.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/SummaryPage.tsx
git commit -m "feat: make SummaryPage role-aware with dynamic stats"
```

---

## Task 11: Update `src/components/pages/CompetenciesPage.tsx`

**Files:**
- Modify: `src/components/pages/CompetenciesPage.tsx`

**Step 1: Add 'use client', use roleContext, dynamic card titles**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import styles from './CompetenciesPage.module.css'

export default function CompetenciesPage() {
  const { resumeData, role } = useRole()
  const { leadership, technical, socialService } = resumeData.competencies

  const titles = role === 'touch'
    ? ['Stakeholder & People', 'Digital & Process', 'Social Service']
    : ['RPA & Automation', 'Programming & Integration', 'Domain Knowledge']

  return (
    <div className={styles.page}>
      <div className={styles.section}>Core Competencies</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[0]}</div>
          <ul className={styles.items}>
            {leadership.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[1]}</div>
          <ul className={styles.items}>
            {technical.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[2]}</div>
          <ul className={styles.items}>
            {socialService.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/CompetenciesPage.tsx
git commit -m "feat: make CompetenciesPage role-aware with dynamic category titles"
```

---

## Task 12: Update experience route pages

**Files:**
- Modify: `src/app/experience/cogent/page.tsx`
- Modify: `src/app/experience/st-engineering/page.tsx`
- Modify: `src/app/experience/abnamro/page.tsx`

**Step 1: Update `src/app/experience/cogent/page.tsx`**

```typescript
'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function CogentPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[0]} index={1} total={resumeData.experience.length} />
}
```

**Step 2: Update `src/app/experience/st-engineering/page.tsx`**

```typescript
'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function STEngineeringPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[1]} index={2} total={resumeData.experience.length} />
}
```

**Step 3: Update `src/app/experience/abnamro/page.tsx`**

```typescript
'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function ABNAMROPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[2]} index={3} total={resumeData.experience.length} />
}
```

**Step 4: Commit**

```bash
git add src/app/experience/cogent/page.tsx src/app/experience/st-engineering/page.tsx src/app/experience/abnamro/page.tsx
git commit -m "feat: make experience route pages role-aware"
```

---

## Task 13: Update `src/components/pages/EducationPage.tsx`

**Files:**
- Modify: `src/components/pages/EducationPage.tsx`

**Step 1: Add 'use client', consume roleContext**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import styles from './EducationPage.module.css'

export default function EducationPage() {
  const { resumeData } = useRole()
  return (
    <div className={styles.page}>
      <div className={styles.section}>Educational Excellence & Professional Pivot</div>
      <div className={styles.timeline}>
        {resumeData.education.entries.map((entry, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.year}>{entry.year}</div>
            <div className={styles.degree}>{entry.degree}</div>
            <div className={styles.institution}>{entry.institution}</div>
            {entry.note && <div className={styles.note}>{entry.note}</div>}
            {entry.details && (
              <ul className={styles.details}>
                {entry.details.map((d, j) => (
                  <li key={j} className={styles.detail}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/EducationPage.tsx
git commit -m "feat: make EducationPage role-aware"
```

---

## Task 14: Update `src/components/pages/CertificationsPage.tsx`

**Files:**
- Modify: `src/components/pages/CertificationsPage.tsx`

**Step 1: Add 'use client', consume roleContext, expand CERT_META for TOUCH certs**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import styles from './CertificationsPage.module.css'

const CERT_META: Record<string, { icon: string; issuer: string }> = {
  'UiPath Advanced Developer Certification (In Progress)': { icon: '🤖', issuer: 'UiPath' },
  'Microsoft Certified: Azure AI Engineer Associate': { icon: '☁️', issuer: 'Microsoft' },
  'Google Professional Machine Learning Engineer': { icon: '🔬', issuer: 'Google' },
  'WSQ Volunteer Programme Management (Module — In Progress)': { icon: '🤝', issuer: 'Tsao Foundation' },
}

export default function CertificationsPage() {
  const { resumeData } = useRole()
  return (
    <div className={styles.page}>
      <div className={styles.section}>Certifications & Professional Development</div>
      <div className={styles.grid}>
        {resumeData.certifications.items.map((cert, i) => {
          const meta = CERT_META[cert] ?? { icon: '🏅', issuer: 'Professional' }
          return (
            <div key={i} className={styles.card}>
              <div className={styles.badge}>{meta.icon}</div>
              <div>
                <div className={styles.certName}>{cert}</div>
                <div className={styles.issuer}>{meta.issuer}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/CertificationsPage.tsx
git commit -m "feat: make CertificationsPage role-aware"
```

---

## Task 15: Update `src/components/pages/VisionPage.tsx`

**Files:**
- Modify: `src/components/pages/VisionPage.tsx`

**Step 1: Add 'use client', consume roleContext, dynamic headings**

```typescript
'use client'

import { useRole } from '@/lib/roleContext'
import styles from './VisionPage.module.css'

export default function VisionPage() {
  const { resumeData, role } = useRole()
  const heading = role === 'touch'
    ? 'A Vision for TOUCH Community Empowerment'
    : 'A Vision for NTUC Health Digital Transformation'
  const section = role === 'touch'
    ? 'Volunteer Management Executive: Community & Digital Innovation'
    : 'Automation Specialist: Intelligent Healthcare Process Innovation'

  return (
    <div className={styles.page}>
      <div className={styles.section}>{section}</div>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.cards}>
        {resumeData.vision.sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTitle}>{s.title}</div>
            <div className={styles.cardBody}>{s.body}</div>
          </div>
        ))}
      </div>
      <div className={styles.closing}>
        <div className={styles.closingTitle}>{resumeData.vision.closing.title}</div>
        <p className={styles.closingBody}>{resumeData.vision.closing.body}</p>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/pages/VisionPage.tsx
git commit -m "feat: make VisionPage role-aware with dynamic headings"
```

---

## Task 16: Generate TOUCH PDF

**Files:**
- Create: `generate_touch_pdf.py`
- Create: `public/assets/John_Tan_Resume_TOUCH.pdf`

**Step 1: Install reportlab if not present**

```bash
pip install reportlab
```

**Step 2: Create `generate_touch_pdf.py`**

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER

OUTPUT = "public/assets/John_Tan_Resume_TOUCH.pdf"
W, H = A4

FOREST = colors.HexColor("#1e3d2f")
CORAL  = colors.HexColor("#e07055")
GRAY   = colors.HexColor("#64748b")
BLACK  = colors.HexColor("#1a1a1a")

doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
    leftMargin=18*mm, rightMargin=18*mm,
    topMargin=14*mm, bottomMargin=14*mm)

styles = getSampleStyleSheet()

def style(name, parent='Normal', **kw):
    s = ParagraphStyle(name, parent=styles[parent], **kw)
    return s

NAME  = style('Name',  fontSize=22, textColor=FOREST, spaceAfter=2, fontName='Helvetica-Bold', alignment=TA_CENTER)
TITLE = style('Title', fontSize=11, textColor=CORAL,  spaceAfter=4, fontName='Helvetica-Bold', alignment=TA_CENTER)
CONTACT = style('Contact', fontSize=9, textColor=GRAY, spaceAfter=8, alignment=TA_CENTER)
SEC   = style('Sec',   fontSize=11, textColor=FOREST, spaceBefore=10, spaceAfter=3, fontName='Helvetica-Bold')
ROLE  = style('Role',  fontSize=10, textColor=BLACK, spaceAfter=1, fontName='Helvetica-Bold')
CO    = style('Co',    fontSize=9,  textColor=GRAY,  spaceAfter=1)
BODY  = style('Body',  fontSize=8.5, textColor=BLACK, spaceAfter=4, leading=12)
BULL  = style('Bull',  fontSize=8.5, textColor=BLACK, spaceAfter=3, leading=11, leftIndent=10, bulletIndent=2)
NOTE  = style('Note',  fontSize=8,  textColor=GRAY,  spaceAfter=2, fontName='Helvetica-Oblique')

def hr(): return HRFlowable(width='100%', thickness=0.5, color=FOREST, spaceAfter=4, spaceBefore=4)

story = []

story += [
    Paragraph("John Tan", NAME),
    Paragraph("Volunteer Management Executive | Digital Community Engagement", TITLE),
    Paragraph("vieming@gmail.com  ·  +65 9889 1383  ·  linkedin.com/in/john-tan-02763732", CONTACT),
    hr(),
]

# Summary
story += [
    Paragraph("PROFESSIONAL SUMMARY", SEC),
    Paragraph(
        "Purpose-driven professional making a deliberate career transition into volunteer management, "
        "bringing 6+ years of enterprise digital transformation experience — Google Workspace automation, "
        "multi-system integration, programme management — directly to TOUCH's mandate of cultivating a "
        "centralised digital volunteer management system. Currently completing WSQ Diploma in Social Service "
        "(Tsao Foundation), with Volunteer Programme Management module and 16-day fieldwork at Active Ageing Centre. "
        "Combines rigorous stakeholder management and data analytics expertise with genuine passion for community empowerment.",
        BODY),
]

# Competencies
story += [Paragraph("CORE COMPETENCIES", SEC)]
comps = [
    ("Stakeholder & People", ["Stakeholder Engagement & Partnership Building",
        "Volunteer Coordinator Training & Programme Support",
        "Cross-departmental Collaboration & Volunteer Sharing",
        "People Management & Negotiation"]),
    ("Digital & Process", ["Digital Volunteer Management Systems Adoption",
        "Process Optimisation & Workflow Design",
        "Data Management, Analysis & Reporting",
        "Project & Event Coordination"]),
    ("Social Service", ["Volunteer Risk Assessment & Governance",
        "Survey Analysis & Volunteer Upskilling",
        "Ethics, Social Policy & Legislation (WSQ)",
        "Service Recovery & Crisis Management"]),
]
for cat, items in comps:
    story.append(Paragraph(f"<b>{cat}:</b> " + "  ·  ".join(items), BODY))

# Experience
story += [Paragraph("PROFESSIONAL EXPERIENCE", SEC)]

exp = [
    ("Digital Transformation Lead", "Cogent Holdings Pte Ltd", "2022 – Present", [
        "Digital System Rollout: Led enterprise-wide adoption of centralised digital workflow systems, reducing manual coordination effort by 30% — directly applicable to TOUCH's unified digital volunteer management platform mandate.",
        "Volunteer Coordinator Training Analogue: Designed comprehensive training materials adopted by 40+ team members, building facilitation skills for educating TOUCH Volunteer Coordinators on new systems and best practices.",
        "Cross-departmental Collaboration: Led cross-functional working groups to align process standards and enable resource sharing — mirroring TOUCH's cross-departmental volunteer sharing and retention requirements.",
    ]),
    ("Programme Manager (Process & Operations)", "ST Engineering", "2019 – 2022", [
        "Programme Management: Managed 3 end-to-end programme cycles from discovery through post-implementation review — demonstrating rigour required to plan and execute TOUCH's volunteer appreciation events and training sessions.",
        "Data Management & Reporting: Built reporting dashboards tracking KPIs across operational units — maps directly to co-managing TOUCH's volunteer database and submitting analytical reports to leadership.",
        "Process Documentation & Risk Assessment: Conducted systematic process audits and annual risk assessments, producing risk registers — directly applicable to TOUCH's annual volunteer risk assessment requirement.",
    ]),
    ("Director / Private Wealth Management", "ABN AMRO", "2017 – 2019", [
        "Stakeholder Management & Budget Governance: Managed relationships with 200+ clients with strict budget accountability — satisfies TOUCH's requirement for 3+ years of project, stakeholder, and budget management experience.",
        "Partnership & Community Engagement: Built strategic partnerships with external organisations and government agencies — transferable to TOUCH's stakeholder engagement and volunteer opportunity development mandate.",
        "People Management & Negotiation: Applied strong negotiation and interpersonal skills across cross-functional teams — the same empathic, collaborative approach for engaging and empowering TOUCH's volunteer ecosystem.",
    ]),
]

for role_title, company, period, bullets in exp:
    story += [
        Paragraph(role_title, ROLE),
        Paragraph(f"{company}  |  {period}", CO),
    ]
    for b in bullets:
        story.append(Paragraph(f"• {b}", BULL))
    story.append(Spacer(1, 4))

# Education
story += [Paragraph("EDUCATION", SEC)]
edu = [
    ("WSQ Diploma in Social Service", "Tsao Foundation (Hua Mei Training Academy)", "2026 – Present",
     "Candidate for Graduation; SCTP Career Transition Programme",
     ["Key Modules: Volunteer Programme Management; Stakeholder Management; Ethics & Legislation; Social Policy Implementation; Financial Management",
      "Industrial Attachment: 16-day fieldwork with Active Ageing Centre — care coordination for vulnerable seniors",
      "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management"]),
    ("MBA", "Nanyang Technological University (NTU)", "2001 – 2003",
     "Dean's Honors List — strategic management, stakeholder leadership, organisational behaviour", None),
    ("Bachelor of Science in Mathematics", "National University of Singapore (NUS)", "1994",
     "Public Service Commission Scholarship", None),
]
for deg, inst, yr, note, details in edu:
    story += [
        Paragraph(f"<b>{deg}</b>  |  {inst}  |  {yr}", BODY),
        Paragraph(note, NOTE),
    ]
    if details:
        for d in details:
            story.append(Paragraph(f"• {d}", BULL))

# Certifications
story += [Paragraph("CERTIFICATIONS & PROFESSIONAL DEVELOPMENT", SEC)]
for cert in [
    "WSQ Volunteer Programme Management (Module — In Progress)  ·  Tsao Foundation",
    "Microsoft Certified: Azure AI Engineer Associate  ·  Microsoft",
    "Google Professional Machine Learning Engineer  ·  Google",
]:
    story.append(Paragraph(f"• {cert}", BULL))

# Vision
story += [
    Paragraph("VISION FOR TOUCH", SEC),
    Paragraph(
        "Champion TOUCH's centralised digital volunteer ecosystem; build data-driven volunteer engagement and "
        "retention analytics; develop community partnership networks with corporate, educational, and government "
        "institutions to advance Vision 2030. Combining digital transformation expertise with WSQ social service "
        "education to bridge operational excellence with lasting community impact.",
        BODY),
]

doc.build(story)
print(f"PDF generated: {OUTPUT}")
```

**Step 3: Run the script**

```bash
python generate_touch_pdf.py
```

Expected: `PDF generated: public/assets/John_Tan_Resume_TOUCH.pdf`

**Step 4: Verify PDF exists and is non-empty**

```bash
ls -la public/assets/
```

Expected: Both PDFs present, `John_Tan_Resume_TOUCH.pdf` > 10KB

**Step 5: Commit**

```bash
git add generate_touch_pdf.py public/assets/John_Tan_Resume_TOUCH.pdf
git commit -m "feat: add TOUCH resume PDF and generation script"
```

---

## Task 17: Update existing tests for refactored navigation

**Files:**
- Modify: `src/__tests__/navigation.test.ts`

The `searchSections` signature changed (optional second param). Existing tests pass no pages and use the default `PAGES` — they should still pass unchanged. Run to confirm.

**Step 1: Run all tests**

```bash
npm test -- --no-coverage
```

Expected: All PASS. If `searchSections` tests fail, verify the default param `pages = PAGES` is in place.

**Step 2: Commit if any fixes needed**

```bash
git add src/__tests__/navigation.test.ts
git commit -m "fix: update navigation tests for optional pages param"
```

---

## Task 18: Build verification

**Files:** None changed

**Step 1: Run Next.js build**

```bash
npm run build
```

Expected output ends with:
```
✓ Compiled successfully
Route (app) ...
```

If TypeScript errors appear, fix them before proceeding. Common issues:
- Missing `stats` field in `ResumeData` interface — ensure it's added in Task 2
- `getSearchPages` not exported — ensure export keyword is present in navigation.ts
- Client components missing `'use client'` — add to top of file

**Step 2: Fix any errors, commit fixes**

```bash
git add -A
git commit -m "fix: resolve TypeScript build errors"
```

---

## Task 19: Deploy to Vercel

**Step 1: Invoke the vercel:deploy skill**

Use the `vercel:deploy` skill to deploy. The project is already linked (`.vercel/` directory exists).

Expected: Deployment succeeds, URL printed. Verify at `https://john-tan-automation-specialist.vercel.app/`

**Step 2: Smoke-test the live deployment**

- Open `https://john-tan-automation-specialist.vercel.app/` — should show forest-green theme, TOUCH content
- Open `https://john-tan-automation-specialist.vercel.app/?role=automation` — should show navy/gold theme, automation content
- Click "Switch: Automation Specialist →" in sidebar — should navigate correctly
- Click "⬇ Download PDF" — should download correct PDF for active role
- Test search: type "volunteer" — should find TOUCH-relevant pages; type "uipath" in automation mode — should find automation pages

**Step 3: Commit deployment verification note**

```bash
git commit --allow-empty -m "chore: verified dual-role deployment on Vercel"
```

---

## Summary of all commits

1. `feat: add TOUCH Volunteer Management Executive resume data`
2. `feat: add stats field to ResumeData interface`
3. `feat: add getSearchPages for role-aware navigation search`
4. `feat: add RoleProvider context for dual-role resume`
5. `feat: add TOUCH forest-green/coral CSS theme tokens`
6. `feat: wrap app with RoleProvider, update metadata`
7. `feat: add role badge, switcher link, and role-specific PDF download to sidebar`
8. `feat: make HeroPage role-aware`
9. `feat: make SummaryPage role-aware with dynamic stats`
10. `feat: make CompetenciesPage role-aware with dynamic category titles`
11. `feat: make experience route pages role-aware`
12. `feat: make EducationPage role-aware`
13. `feat: make CertificationsPage role-aware`
14. `feat: make VisionPage role-aware with dynamic headings`
15. `feat: add TOUCH resume PDF and generation script`
16. `fix: update navigation tests for optional pages param` (if needed)
17. `fix: resolve TypeScript build errors` (if needed)
