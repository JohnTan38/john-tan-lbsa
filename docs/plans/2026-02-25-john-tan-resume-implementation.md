# John Tan Interactive Resume — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js 14 App Router interactive resume site for John Tan with sidebar navigation, direction-aware slide+fade transitions, full-text search, and a PDF download button.

**Architecture:** App Router layout renders a fixed 260px Sidebar alongside a `<main>` content area. Each of 9 resume sections is its own route. Framer Motion `AnimatePresence` wraps route changes with direction-aware (prev=left, next=right) slide+fade. Resume content lives in `src/data/resume.ts`. Navigation order + search live in `src/lib/navigation.ts` (unit tested).

**Tech Stack:** Next.js 14, TypeScript, CSS Modules, Framer Motion 11, Inter via `next/font/google`

---

## Pre-flight Check

Working directory: `C:\Users\admin\superpowers\` (already has `public/assets/John_Tan_Resume_RN.pdf`)

After scaffolding, final structure will be:
```
src/
  app/
    layout.tsx
    globals.css
    page.tsx                        (Hero /)
    summary/page.tsx
    competencies/page.tsx
    experience/cogent/page.tsx
    experience/st-engineering/page.tsx
    experience/abnamro/page.tsx
    education/page.tsx
    certifications/page.tsx
    vision/page.tsx
  components/
    Sidebar/Sidebar.tsx + .module.css
    NavItem/NavItem.tsx + .module.css
    PrevNextBar/PrevNextBar.tsx + .module.css
    SearchBox/SearchBox.tsx + .module.css
    PageTransition/PageTransition.tsx + .module.css
    pages/
      HeroPage.tsx + .module.css
      SummaryPage.tsx + .module.css
      CompetenciesPage.tsx + .module.css
      ExperiencePage.tsx + .module.css
      EducationPage.tsx + .module.css
      CertificationsPage.tsx + .module.css
      VisionPage.tsx + .module.css
  data/resume.ts
  lib/navigation.ts
  __tests__/navigation.test.ts
public/
  assets/John_Tan_Resume_RN.pdf   (already present)
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/` tree

**Step 1: Scaffold in existing directory**

```bash
cd /c/Users/admin/superpowers
npx create-next-app@latest . --typescript --eslint --no-tailwind --app --src-dir --import-alias "@/*" --no-git --yes
```

Expected output: `✓ Creating a new Next.js app ... Success!`

If prompted about existing files, answer `y` to overwrite only conflicting files. The existing `public/assets/` and `public/data/` folders will be preserved.

**Step 2: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should show the default Next.js page.

**Step 3: Stop dev server** (`Ctrl+C`)

**Step 4: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `added X packages`

**Step 5: Install Jest + Testing Library for unit tests**

```bash
npm install -D jest @types/jest ts-jest
```

**Step 6: Create jest.config.js**

```js
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
})
```

**Step 7: Add test script to package.json**

In `package.json`, in the `"scripts"` block add:
```json
"test": "jest"
```

**Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 app with Framer Motion"
```

---

## Task 2: Clean Up Default Boilerplate

**Files:**
- Modify: `src/app/globals.css` (replace entirely)
- Modify: `src/app/page.tsx` (replace entirely — temporary placeholder)
- Delete: `src/app/favicon.ico` if generated, keep it; delete contents of `public/` Next.js defaults (e.g., `public/next.svg`, `public/vercel.svg`)

**Step 1: Remove default SVGs**

```bash
rm -f /c/Users/admin/superpowers/public/next.svg /c/Users/admin/superpowers/public/vercel.svg 2>/dev/null || true
```

**Step 2: Replace globals.css with design tokens**

```css
/* src/app/globals.css */
:root {
  --navy:       #1a2e4a;
  --navy-dark:  #0f1e36;
  --navy-mid:   #243d5c;
  --gold:       #c9a84c;
  --gold-light: #e8c97a;
  --gold-dim:   #a8863c;
  --white:      #ffffff;
  --text:       #1a1a1a;
  --text-muted: #64748b;
  --text-light: #94a3b8;
  --surface:    #f8fafc;
  --border:     #e2e8f0;
  --sidebar-w:  260px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

mark {
  background: var(--gold-light);
  color: var(--navy-dark);
  border-radius: 2px;
  padding: 0 2px;
}
```

**Step 3: Replace page.tsx with placeholder**

```tsx
// src/app/page.tsx
export default function HomePage() {
  return <div>Hero — coming soon</div>
}
```

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: clean boilerplate, add design tokens"
```

---

## Task 3: Resume Data File

**Files:**
- Create: `src/data/resume.ts`

**Step 1: Create the data file**

```ts
// src/data/resume.ts

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
  title: "Center Manager | Residents' Network",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-presentation.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Community Operations Leader | Generative AI & Finance Executive | Social Service Practitioner (In-Training)",
    body: "Versatile and people-oriented professional with 20+ years of experience across Private Wealth Management and Software Engineering, currently specializing in community care through the WSQ Diploma in Social Service (Tsao Foundation). Expert in financial administration, stakeholder diplomacy, and operational optimization. Proven ability to manage complex accounts (formerly $500M+ AUM) and automate administrative workflows to achieve 30%−50% productivity gains. Committed to the People's Association mission of building social capital and fostering community cohesiveness through proactive outreach and efficient center management.",
    searchText: "summary community operations leader generative ai finance executive social service private wealth management software engineering tsao foundation stakeholder diplomacy productivity",
  },
  competencies: {
    leadership: [
      "Volunteer Management: Motivation & Recruitment",
      "Strategic Planning: Resource & Budget Allocation",
      "Community Engagement",
      "Soft Skills: Outgoing team player, People-oriented, Problem solver",
    ],
    technical: [
      "AI & RPA: Workflow Automation & LLMs",
      "Data Analytics: Predictive Needs Analysis",
      "Software Development Life Cycle",
      "Stakeholder Management",
    ],
    socialService: [
      "Eldercare Knowledge: AAC Model",
      "Administration and Finance",
      "Interest Group Development, Marketing Activities / Events",
      "Volunteer Management",
    ],
    searchText: "competencies leadership volunteer management strategic planning community engagement ai rpa workflow automation data analytics software development eldercare aac model interest group",
  },
  experience: [
    {
      id: "cogent",
      role: "Generative AI Engineer",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Operational Excellence: Architected and deployed workflow automations that achieved a 30% productivity increase, demonstrating a capacity to modernize and streamline RN center enquiries and IT systems.",
        "Technical Communication: Developed user guides that improved team onboarding by 40%, translatable to training grassroots volunteers and residents.",
      ],
      searchText: "generative ai engineer cogent holdings workflow automation 30% productivity user guides onboarding volunteers",
    },
    {
      id: "st-engineering",
      role: "Software Engineer",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "Digital Transformation: Led three complete RPA SDLC projects achieving 50%+ operational efficiency gains; expertise relevant for streamlining care coordination and referrals across government agencies.",
        "Process Improvement: Led RPA projects achieving 50%+ efficiency gains; expertise applicable to digitizing RN administrative records and improving center ops tempo.",
        "Analytical Precision: Engineered models with 85% accuracy; demonstrates the meticulous attention to detail required for maintaining RN accounts and performance reports.",
      ],
      searchText: "software engineer st engineering rpa sdlc 50% efficiency digital transformation analytical precision 85% accuracy",
    },
    {
      id: "abnamro",
      role: "Director / Private Wealth Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Financial Stewardship: Managed $500M+ AUM with a 95% client satisfaction score; ensures world-class accuracy and ethics in handling RN center funds and financial records.",
        "Regulatory Compliance: Orchestrated cross-asset allocation strategies in full compliance with banking investment guidelines; ensures the highest standards of governance and ethical behavior throughout the organization.",
        "Stakeholder Diplomacy: Built relationships with diverse high-net-worth individuals; translatable to engaging residents from all walks of life and all types of housing estates.",
      ],
      searchText: "director private wealth management abn amro 500m aum 95% client satisfaction regulatory compliance cross-asset allocation stakeholder diplomacy",
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
          "Modules: Ethics, Values & Legislation; Workplace Safety & Health; People Management; Volunteer Programme Management; Stakeholder Management; Social Policy Implementation; Financial Management",
          "Industrial Attachment: 16-day fieldwork with Active Ageing Centre — care coordination for vulnerable seniors",
          "Specialization: AI-driven outreach modalities and Decision Support System logic for social service management",
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
    searchText: "education wsq diploma social service tsao foundation hua mei mba ntu nanyang dean honors list bachelor mathematics nus national university singapore public service commission scholarship",
  },
  certifications: {
    items: [
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications microsoft azure ai engineer associate google professional machine learning engineer",
  },
  vision: {
    sections: [
      {
        title: "Interest Group Expansion",
        body: "Leverage data analytics to identify emerging resident interests (e.g., tech-literacy for seniors, AI-art workshops) to attract new customers to the RN center.",
      },
      {
        title: "Seamless Administration",
        body: "Implement simple digital tools for course fee collection and event tracking to allow more time for face-to-face resident engagement.",
      },
    ],
    closing: {
      title: "A Multi-Disciplinary Catalyst for Social Mixing",
      body: "The People's Association requires RN Center Managers who are not only administratively competent but also outgoing team players capable of fostering meaningful connections. John's background in finance guarantees the integrity of RN accounts, while his current social service studies provide the necessary empathy and sector-specific knowledge to champion social cohesion. By integrating this \"heart and technology\" approach, John is uniquely prepared to transform the RN center into a vibrant, efficient, and inclusive community hub.",
    },
    searchText: "vision innovation interest group expansion data analytics tech literacy seniors ai art seamless administration digital tools social mixing people's association community hub heart technology",
  },
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/data/resume.ts && git commit -m "feat: add resume data file"
```

---

## Task 4: Navigation Utilities + Tests

**Files:**
- Create: `src/lib/navigation.ts`
- Create: `src/__tests__/navigation.test.ts`

**Step 1: Write the failing tests first**

```ts
// src/__tests__/navigation.test.ts
import {
  PAGES,
  getPageIndex,
  getAdjacentPages,
  searchSections,
} from '@/lib/navigation'

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

  it('finds summary page for "community operations"', () => {
    const results = searchSections('community operations')
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
```

**Step 2: Run tests — expect failure**

```bash
npm test
```

Expected: FAIL — `Cannot find module '@/lib/navigation'`

**Step 3: Implement navigation.ts**

```ts
// src/lib/navigation.ts
import { resume } from '@/data/resume'

export interface PageMeta {
  path: string
  label: string
  icon: string
  searchText: string
}

export const PAGES: PageMeta[] = [
  {
    path: '/',
    label: 'Home',
    icon: '🏠',
    searchText: `${resume.name} ${resume.title} ${Object.values(resume.contact).join(' ')}`,
  },
  {
    path: '/summary',
    label: 'Summary',
    icon: '📝',
    searchText: resume.summary.searchText,
  },
  {
    path: '/competencies',
    label: 'Competencies',
    icon: '⭐',
    searchText: resume.competencies.searchText,
  },
  {
    path: '/experience/cogent',
    label: 'Cogent Holdings',
    icon: '💼',
    searchText: resume.experience[0].searchText,
  },
  {
    path: '/experience/st-engineering',
    label: 'ST Engineering',
    icon: '💼',
    searchText: resume.experience[1].searchText,
  },
  {
    path: '/experience/abnamro',
    label: 'ABN AMRO',
    icon: '💼',
    searchText: resume.experience[2].searchText,
  },
  {
    path: '/education',
    label: 'Education',
    icon: '🎓',
    searchText: resume.education.searchText,
  },
  {
    path: '/certifications',
    label: 'Certifications',
    icon: '🏅',
    searchText: resume.certifications.searchText,
  },
  {
    path: '/vision',
    label: 'Innovation Vision',
    icon: '💡',
    searchText: resume.vision.searchText,
  },
]

export function getPageIndex(path: string): number {
  return PAGES.findIndex(p => p.path === path)
}

export function getAdjacentPages(path: string): {
  prev: PageMeta | null
  next: PageMeta | null
} {
  const idx = getPageIndex(path)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? PAGES[idx - 1] : null,
    next: idx < PAGES.length - 1 ? PAGES[idx + 1] : null,
  }
}

export function searchSections(query: string): PageMeta[] {
  if (!query.trim()) return PAGES
  const q = query.toLowerCase()
  return PAGES.filter(p => p.searchText.toLowerCase().includes(q))
}
```

**Step 4: Run tests — expect pass**

```bash
npm test
```

Expected: `PASS src/__tests__/navigation.test.ts` — all 11 tests passing.

**Step 5: Commit**

```bash
git add src/lib/navigation.ts src/__tests__/navigation.test.ts && git commit -m "feat: navigation utilities with tests"
```

---

## Task 5: Direction Context for Transitions

**Files:**
- Create: `src/lib/directionContext.tsx`

This context stores the navigation direction (1 = next/forward, -1 = prev/backward) so `PageTransition` can animate correctly.

**Step 1: Create the context**

```tsx
// src/lib/directionContext.tsx
'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface DirectionContextValue {
  direction: 1 | -1
  setDirection: (d: 1 | -1) => void
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: 1,
  setDirection: () => {},
})

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirectionState] = useState<1 | -1>(1)

  const setDirection = useCallback((d: 1 | -1) => {
    setDirectionState(d)
  }, [])

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  return useContext(DirectionContext)
}
```

**Step 2: Commit**

```bash
git add src/lib/directionContext.tsx && git commit -m "feat: direction context for page transitions"
```

---

## Task 6: PageTransition Component

**Files:**
- Create: `src/components/PageTransition/PageTransition.tsx`
- Create: `src/components/PageTransition/PageTransition.module.css`

**Step 1: Create the CSS**

```css
/* src/components/PageTransition/PageTransition.module.css */
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

**Step 2: Create the component**

```tsx
// src/components/PageTransition/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useDirection } from '@/lib/directionContext'
import styles from './PageTransition.module.css'

const variants = {
  enter: (dir: 1 | -1) => ({
    x: dir * 80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: 1 | -1) => ({
    x: dir * -80,
    opacity: 0,
  }),
}

const transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as number[],
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { direction } = useDirection()

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        className={styles.wrapper}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/PageTransition/ && git commit -m "feat: PageTransition with direction-aware AnimatePresence"
```

---

## Task 7: SearchBox Component

**Files:**
- Create: `src/components/SearchBox/SearchBox.tsx`
- Create: `src/components/SearchBox/SearchBox.module.css`

**Step 1: Create CSS**

```css
/* src/components/SearchBox/SearchBox.module.css */
.wrapper {
  padding: 0 16px;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px 12px 8px 34px;
  color: #fff;
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23c9a84c' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 10px center;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input:focus {
  border-color: var(--gold);
  background-color: rgba(255, 255, 255, 0.12);
}
```

**Step 2: Create component**

```tsx
// src/components/SearchBox/SearchBox.tsx
'use client'

import { useRef } from 'react'
import styles from './SearchBox.module.css'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBox({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={styles.input}
        type="search"
        placeholder="Search sections..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search resume sections"
      />
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/SearchBox/ && git commit -m "feat: SearchBox component"
```

---

## Task 8: NavItem Component

**Files:**
- Create: `src/components/NavItem/NavItem.tsx`
- Create: `src/components/NavItem/NavItem.module.css`

**Step 1: Create CSS**

```css
/* src/components/NavItem/NavItem.module.css */
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-left: 3px solid transparent;
  border-radius: 0 8px 8px 0;
  margin: 2px 8px 2px 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  text-decoration: none;
  line-height: 1.4;
}

.item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border-left-color: rgba(201, 168, 76, 0.5);
}

.active {
  color: var(--gold) !important;
  background: rgba(201, 168, 76, 0.12) !important;
  border-left-color: var(--gold) !important;
  font-weight: 600;
}

.icon {
  font-size: 15px;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Step 2: Create component**

```tsx
// src/components/NavItem/NavItem.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDirection } from '@/lib/directionContext'
import { getPageIndex } from '@/lib/navigation'
import type { PageMeta } from '@/lib/navigation'
import styles from './NavItem.module.css'

interface Props {
  page: PageMeta
  currentPath: string
}

export default function NavItem({ page, currentPath }: Props) {
  const { setDirection } = useDirection()
  const isActive = currentPath === page.path

  function handleClick() {
    const currentIdx = getPageIndex(currentPath)
    const targetIdx = getPageIndex(page.path)
    setDirection(targetIdx >= currentIdx ? 1 : -1)
  }

  return (
    <Link
      href={page.path}
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.icon}>{page.icon}</span>
      <span className={styles.label}>{page.label}</span>
    </Link>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/NavItem/ && git commit -m "feat: NavItem with direction-aware click"
```

---

## Task 9: Sidebar Component

**Files:**
- Create: `src/components/Sidebar/Sidebar.tsx`
- Create: `src/components/Sidebar/Sidebar.module.css`

**Step 1: Create CSS**

```css
/* src/components/Sidebar/Sidebar.module.css */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  background: var(--navy);
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }

.header {
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.monogram {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: var(--navy-dark);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.name {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 10px 16px;
}

.searchSection {
  padding: 8px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin: 4px 0;
}

.downloadSection {
  padding: 16px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.downloadBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  border: 1.5px solid var(--gold);
  border-radius: 8px;
  color: var(--gold);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  letter-spacing: 0.3px;
}

.downloadBtn:hover {
  background: var(--gold);
  color: var(--navy-dark);
}

.pageCount {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  padding: 0 16px 12px;
  letter-spacing: 0.5px;
}

@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
```

**Step 2: Create component**

```tsx
// src/components/Sidebar/Sidebar.tsx
'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { PAGES, searchSections, getPageIndex } from '@/lib/navigation'
import NavItem from '@/components/NavItem/NavItem'
import SearchBox from '@/components/SearchBox/SearchBox'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  const visiblePages = useMemo(() => searchSections(query), [query])
  const currentIndex = getPageIndex(pathname)

  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Resume navigation">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.monogram}>JT</div>
        <div className={styles.name}>John Tan</div>
        <div className={styles.subtitle}>Center Manager · RN</div>
      </div>

      {/* Search */}
      <div className={styles.searchSection}>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {visiblePages.map(page => (
          <NavItem key={page.path} page={page} currentPath={pathname} />
        ))}
        {visiblePages.length === 0 && (
          <div style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            No sections found
          </div>
        )}
      </nav>

      {/* Page count indicator */}
      {currentIndex >= 0 && (
        <div className={styles.pageCount}>
          {currentIndex + 1} / {PAGES.length}
        </div>
      )}

      {/* Download */}
      <div className={styles.downloadSection}>
        <a
          href="/assets/John_Tan_Resume_RN.pdf"
          download="John_Tan_Resume_RN.pdf"
          className={styles.downloadBtn}
        >
          ⬇ Download PDF
        </a>
      </div>
    </aside>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Sidebar/ && git commit -m "feat: Sidebar with search and download"
```

---

## Task 10: PrevNextBar Component

**Files:**
- Create: `src/components/PrevNextBar/PrevNextBar.tsx`
- Create: `src/components/PrevNextBar/PrevNextBar.module.css`

**Step 1: Create CSS**

```css
/* src/components/PrevNextBar/PrevNextBar.module.css */
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 32px;
  background: var(--white);
  border-top: 1px solid var(--border);
  flex-shrink: 0;
  min-height: 56px;
}

.navBtn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  min-width: 110px;
}

.navBtn:hover {
  border-color: var(--gold);
  color: var(--navy);
  background: rgba(201, 168, 76, 0.08);
}

.navBtn:disabled,
.navBtn.hidden {
  visibility: hidden;
  pointer-events: none;
}

.prevBtn {
  justify-content: flex-start;
}

.nextBtn {
  justify-content: flex-end;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: background 0.2s, transform 0.2s;
}

.dotActive {
  background: var(--gold);
  transform: scale(1.3);
}

.label {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
```

**Step 2: Create component**

```tsx
// src/components/PrevNextBar/PrevNextBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAdjacentPages, getPageIndex, PAGES } from '@/lib/navigation'
import { useDirection } from '@/lib/directionContext'
import styles from './PrevNextBar.module.css'

export default function PrevNextBar() {
  const pathname = usePathname()
  const { setDirection } = useDirection()
  const { prev, next } = getAdjacentPages(pathname)
  const currentIndex = getPageIndex(pathname)

  return (
    <div className={styles.bar} role="navigation" aria-label="Page navigation">
      {/* Prev */}
      {prev ? (
        <Link
          href={prev.path}
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => setDirection(-1)}
          aria-label={`Previous: ${prev.label}`}
        >
          ← {prev.label}
        </Link>
      ) : (
        <div className={`${styles.navBtn} ${styles.hidden}`} />
      )}

      {/* Dots */}
      <div className={styles.center}>
        <div className={styles.dots} aria-hidden="true">
          {PAGES.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>
        <span className={styles.label}>
          {currentIndex + 1} of {PAGES.length}
        </span>
      </div>

      {/* Next */}
      {next ? (
        <Link
          href={next.path}
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => setDirection(1)}
          aria-label={`Next: ${next.label}`}
        >
          {next.label} →
        </Link>
      ) : (
        <div className={`${styles.navBtn} ${styles.hidden}`} />
      )}
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/PrevNextBar/ && git commit -m "feat: PrevNextBar with dot indicators"
```

---

## Task 11: Root Layout

**Files:**
- Modify: `src/app/layout.tsx` (replace entirely)

**Step 1: Replace layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import PrevNextBar from '@/components/PrevNextBar/PrevNextBar'
import PageTransition from '@/components/PageTransition/PageTransition'
import { DirectionProvider } from '@/lib/directionContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'John Tan — Resume',
  description: 'Center Manager | Residents\' Network | Generative AI & Community Care Professional',
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
          <Sidebar />
          <div
            style={{
              marginLeft: 'var(--sidebar-w)',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <main
              style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--white)',
              }}
            >
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <PrevNextBar />
          </div>
        </DirectionProvider>
      </body>
    </html>
  )
}
```

**Step 2: Start dev server and verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should see:
- Navy sidebar on left with "JT" monogram, nav links, search box, download button
- White content area on right showing "Hero — coming soon"
- PrevNextBar at bottom showing "1 of 9" with dots

**Step 3: Commit**

```bash
git add src/app/layout.tsx && git commit -m "feat: root layout with Sidebar, PrevNextBar, PageTransition"
```

---

## Task 12: Hero Page (`/`)

**Files:**
- Create: `src/components/pages/HeroPage.tsx`
- Create: `src/components/pages/HeroPage.module.css`
- Modify: `src/app/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/HeroPage.module.css */
.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 64px;
  background: linear-gradient(135deg, var(--navy) 0%, #243d5c 60%, #1a2e4a 100%);
  color: #fff;
  overflow: auto;
}

.monogram {
  font-size: 80px;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -4px;
  margin-bottom: 24px;
  text-shadow: 0 4px 24px rgba(201,168,76,0.3);
}

.name {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -1.5px;
}

.title {
  font-size: 18px;
  color: var(--gold);
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
}

.divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), transparent);
  margin-bottom: 40px;
  border-radius: 2px;
}

.contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.contactItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  padding: 8px 14px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  transition: all 0.2s;
  background: rgba(255,255,255,0.05);
}

.contactItem:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: rgba(201,168,76,0.1);
}

.tagline {
  margin-top: 48px;
  font-size: 13px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 2px;
  text-transform: uppercase;
}
```

**Step 2: Create HeroPage component**

```tsx
// src/components/pages/HeroPage.tsx
import { resume } from '@/data/resume'
import styles from './HeroPage.module.css'

export default function HeroPage() {
  return (
    <div className={styles.page}>
      <div className={styles.monogram}>JT</div>
      <h1 className={styles.name}>{resume.name}</h1>
      <p className={styles.title}>{resume.title}</p>
      <div className={styles.divider} />
      <div className={styles.contacts}>
        <a
          href={`mailto:${resume.contact.email}`}
          className={styles.contactItem}
        >
          ✉ {resume.contact.email}
        </a>
        <a
          href={`https://${resume.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🔗 LinkedIn
        </a>
        <a
          href={`https://${resume.contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🌐 {resume.contact.website}
        </a>
        <span className={styles.contactItem}>
          📍 {resume.contact.phone}
        </span>
      </div>
      <p className={styles.tagline}>20+ Years · Finance · Tech · Community</p>
    </div>
  )
}
```

**Step 3: Update page.tsx**

```tsx
// src/app/page.tsx
import HeroPage from '@/components/pages/HeroPage'
export default function HomePage() {
  return <HeroPage />
}
```

**Step 4: Verify in browser** — `http://localhost:3000` should show the dark navy hero with gold "JT" monogram, name, title, contact buttons.

**Step 5: Commit**

```bash
git add src/components/pages/HeroPage.tsx src/components/pages/HeroPage.module.css src/app/page.tsx
git commit -m "feat: Hero page"
```

---

## Task 13: Summary Page (`/summary`)

**Files:**
- Create: `src/components/pages/SummaryPage.tsx`
- Create: `src/components/pages/SummaryPage.module.css`
- Create: `src/app/summary/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/SummaryPage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}

.tagline {
  font-size: 22px;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.4;
  margin-bottom: 32px;
  padding-left: 20px;
  border-left: 4px solid var(--gold);
  max-width: 680px;
}

.body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text);
  max-width: 680px;
}

.stats {
  display: flex;
  gap: 40px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.statValue {
  font-size: 36px;
  font-weight: 800;
  color: var(--navy);
  line-height: 1;
}

.statLabel {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

**Step 2: Create SummaryPage component**

```tsx
// src/components/pages/SummaryPage.tsx
import { resume } from '@/data/resume'
import styles from './SummaryPage.module.css'

export default function SummaryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Professional Summary</div>
      <blockquote className={styles.tagline}>
        {resume.summary.tagline}
      </blockquote>
      <p className={styles.body}>{resume.summary.body}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>20+</div>
          <div className={styles.statLabel}>Years Experience</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>$500M+</div>
          <div className={styles.statLabel}>AUM Managed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>50%</div>
          <div className={styles.statLabel}>Productivity Gains</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>3</div>
          <div className={styles.statLabel}>Career Domains</div>
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Create route file**

```tsx
// src/app/summary/page.tsx
import SummaryPage from '@/components/pages/SummaryPage'
export default function Summary() { return <SummaryPage /> }
```

**Step 4: Verify** — click "Summary" in sidebar, verify slide-in transition from right.

**Step 5: Commit**

```bash
git add src/components/pages/SummaryPage.tsx src/components/pages/SummaryPage.module.css src/app/summary/page.tsx
git commit -m "feat: Summary page"
```

---

## Task 14: Competencies Page (`/competencies`)

**Files:**
- Create: `src/components/pages/CompetenciesPage.tsx`
- Create: `src/components/pages/CompetenciesPage.module.css`
- Create: `src/app/competencies/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/CompetenciesPage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 48px 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 32px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 960px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  border-top: 3px solid var(--gold);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.cardTitle {
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  font-size: 13.5px;
  color: var(--text);
  line-height: 1.5;
  padding-left: 14px;
  position: relative;
}

.item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
}

@media (max-width: 1200px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
```

**Step 2: Create component**

```tsx
// src/components/pages/CompetenciesPage.tsx
import { resume } from '@/data/resume'
import styles from './CompetenciesPage.module.css'

export default function CompetenciesPage() {
  const { leadership, technical, socialService } = resume.competencies
  return (
    <div className={styles.page}>
      <div className={styles.section}>Core Competencies</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Leadership & Management</div>
          <ul className={styles.items}>
            {leadership.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Technical & Analytical</div>
          <ul className={styles.items}>
            {technical.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Social Service Domain</div>
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

**Step 3: Create route**

```tsx
// src/app/competencies/page.tsx
import CompetenciesPage from '@/components/pages/CompetenciesPage'
export default function Competencies() { return <CompetenciesPage /> }
```

**Step 4: Commit**

```bash
git add src/components/pages/CompetenciesPage.tsx src/components/pages/CompetenciesPage.module.css src/app/competencies/page.tsx
git commit -m "feat: Competencies page"
```

---

## Task 15: Shared ExperiencePage + Three Experience Routes

**Files:**
- Create: `src/components/pages/ExperiencePage.tsx`
- Create: `src/components/pages/ExperiencePage.module.css`
- Create: `src/app/experience/cogent/page.tsx`
- Create: `src/app/experience/st-engineering/page.tsx`
- Create: `src/app/experience/abnamro/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/ExperiencePage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 48px 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.role {
  font-size: 32px;
  font-weight: 800;
  color: var(--navy);
  line-height: 1.2;
  margin-bottom: 4px;
}

.company {
  font-size: 20px;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 4px;
}

.period {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 40px;
  letter-spacing: 0.3px;
}

.divider {
  width: 50px;
  height: 2px;
  background: var(--gold);
  margin-bottom: 32px;
  border-radius: 1px;
}

.bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 720px;
}

.bullet {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
  background: var(--surface);
  border-radius: 10px;
  border: 1px solid var(--border);
  border-left: 3px solid var(--gold);
  transition: transform 0.2s, box-shadow 0.2s;
  line-height: 1.7;
  font-size: 15px;
  color: var(--text);
}

.bullet:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.bulletTitle {
  font-weight: 700;
  color: var(--navy);
}
```

**Step 2: Create shared ExperiencePage component**

```tsx
// src/components/pages/ExperiencePage.tsx
import type { ExperienceEntry } from '@/data/resume'
import styles from './ExperiencePage.module.css'

interface Props {
  entry: ExperienceEntry
  index: number
  total: number
}

export default function ExperiencePage({ entry, index, total }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.section}>
        Professional Experience · {index} of {total}
      </div>
      <h1 className={styles.role}>{entry.role}</h1>
      <div className={styles.company}>{entry.company}</div>
      <div className={styles.period}>{entry.period}</div>
      <div className={styles.divider} />
      <ul className={styles.bullets}>
        {entry.bullets.map((bullet, i) => {
          const colonIdx = bullet.indexOf(':')
          const title = colonIdx > 0 ? bullet.slice(0, colonIdx) : null
          const body = colonIdx > 0 ? bullet.slice(colonIdx + 1).trim() : bullet
          return (
            <li key={i} className={styles.bullet}>
              <span>
                {title && <span className={styles.bulletTitle}>{title}: </span>}
                {body}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

**Step 3: Create three route pages**

```tsx
// src/app/experience/cogent/page.tsx
import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'
export default function CogentPage() {
  return <ExperiencePage entry={resume.experience[0]} index={1} total={3} />
}
```

```tsx
// src/app/experience/st-engineering/page.tsx
import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'
export default function StEngineeringPage() {
  return <ExperiencePage entry={resume.experience[1]} index={2} total={3} />
}
```

```tsx
// src/app/experience/abnamro/page.tsx
import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'
export default function AbnAmroPage() {
  return <ExperiencePage entry={resume.experience[2]} index={3} total={3} />
}
```

**Step 4: Verify** — navigate to each experience page, verify bullet formatting, hover effects, transitions.

**Step 5: Commit**

```bash
git add src/components/pages/ExperiencePage.tsx src/components/pages/ExperiencePage.module.css \
  src/app/experience/ && \
git commit -m "feat: ExperiencePage component + 3 experience routes"
```

---

## Task 16: Education Page (`/education`)

**Files:**
- Create: `src/components/pages/EducationPage.tsx`
- Create: `src/components/pages/EducationPage.module.css`
- Create: `src/app/education/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/EducationPage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 48px 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 40px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 680px;
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.2));
}

.entry {
  position: relative;
}

.entry::before {
  content: '';
  position: absolute;
  left: -27px;
  top: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gold);
  border: 2px solid var(--white);
  box-shadow: 0 0 0 2px var(--gold);
}

.year {
  font-size: 12px;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.degree {
  font-size: 20px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 2px;
}

.institution {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.note {
  font-size: 13px;
  color: var(--text);
  font-style: italic;
  padding: 8px 12px;
  background: rgba(201,168,76,0.08);
  border-radius: 6px;
  border-left: 3px solid var(--gold);
  margin-bottom: 8px;
}

.details {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}

.detail {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  padding-left: 12px;
  position: relative;
}

.detail::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--gold);
}
```

**Step 2: Create component**

```tsx
// src/components/pages/EducationPage.tsx
import { resume } from '@/data/resume'
import styles from './EducationPage.module.css'

export default function EducationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Educational Excellence & Professional Pivot</div>
      <div className={styles.timeline}>
        {resume.education.entries.map((entry, i) => (
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

**Step 3: Create route**

```tsx
// src/app/education/page.tsx
import EducationPage from '@/components/pages/EducationPage'
export default function Education() { return <EducationPage /> }
```

**Step 4: Commit**

```bash
git add src/components/pages/EducationPage.tsx src/components/pages/EducationPage.module.css src/app/education/page.tsx
git commit -m "feat: Education page with timeline"
```

---

## Task 17: Certifications Page (`/certifications`)

**Files:**
- Create: `src/components/pages/CertificationsPage.tsx`
- Create: `src/components/pages/CertificationsPage.module.css`
- Create: `src/app/certifications/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/CertificationsPage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 48px 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 40px;
}

.grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  border-top: 4px solid var(--gold);
  min-width: 280px;
  max-width: 400px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}

.badge {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  background: linear-gradient(135deg, var(--navy), var(--navy-mid));
  flex-shrink: 0;
}

.certName {
  font-size: 15px;
  font-weight: 600;
  color: var(--navy);
  line-height: 1.4;
}

.issuer {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}
```

**Step 2: Create component**

```tsx
// src/components/pages/CertificationsPage.tsx
import { resume } from '@/data/resume'
import styles from './CertificationsPage.module.css'

const CERT_META: Record<string, { icon: string; issuer: string }> = {
  'Microsoft Certified: Azure AI Engineer Associate': { icon: '☁️', issuer: 'Microsoft' },
  'Google Professional Machine Learning Engineer': { icon: '🤖', issuer: 'Google' },
}

export default function CertificationsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Certifications & Professional Development</div>
      <div className={styles.grid}>
        {resume.certifications.items.map((cert, i) => {
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

**Step 3: Create route**

```tsx
// src/app/certifications/page.tsx
import CertificationsPage from '@/components/pages/CertificationsPage'
export default function Certifications() { return <CertificationsPage /> }
```

**Step 4: Commit**

```bash
git add src/components/pages/CertificationsPage.tsx src/components/pages/CertificationsPage.module.css src/app/certifications/page.tsx
git commit -m "feat: Certifications page"
```

---

## Task 18: Vision Page (`/vision`)

**Files:**
- Create: `src/components/pages/VisionPage.tsx`
- Create: `src/components/pages/VisionPage.module.css`
- Create: `src/app/vision/page.tsx`

**Step 1: Create CSS**

```css
/* src/components/pages/VisionPage.module.css */
.page {
  height: 100%;
  overflow-y: auto;
  padding: 48px 64px;
  background: var(--white);
}

.section {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.heading {
  font-size: 30px;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 40px;
  line-height: 1.3;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
  max-width: 800px;
}

.card {
  padding: 28px;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--gold);
}

.cardTitle {
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 12px;
}

.cardBody {
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
}

.closing {
  max-width: 720px;
  padding: 32px 40px;
  background: linear-gradient(135deg, var(--navy) 0%, #243d5c 100%);
  border-radius: 16px;
  color: #fff;
}

.closingTitle {
  font-size: 16px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 16px;
}

.closingBody {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
}
```

**Step 2: Create component**

```tsx
// src/components/pages/VisionPage.tsx
import { resume } from '@/data/resume'
import styles from './VisionPage.module.css'

export default function VisionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Center Manager: Resident-Centric Innovation</div>
      <h2 className={styles.heading}>A Vision for Community Excellence</h2>
      <div className={styles.cards}>
        {resume.vision.sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTitle}>{s.title}</div>
            <div className={styles.cardBody}>{s.body}</div>
          </div>
        ))}
      </div>
      <div className={styles.closing}>
        <div className={styles.closingTitle}>{resume.vision.closing.title}</div>
        <p className={styles.closingBody}>{resume.vision.closing.body}</p>
      </div>
    </div>
  )
}
```

**Step 3: Create route**

```tsx
// src/app/vision/page.tsx
import VisionPage from '@/components/pages/VisionPage'
export default function Vision() { return <VisionPage /> }
```

**Step 4: Commit**

```bash
git add src/components/pages/VisionPage.tsx src/components/pages/VisionPage.module.css src/app/vision/page.tsx
git commit -m "feat: Vision page"
```

---

## Task 19: Final Verification & Polish

**Step 1: Run all tests**

```bash
npm test
```

Expected: All 11 navigation tests pass.

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Start dev server and do full walkthrough**

```bash
npm run dev
```

Verify each of the following manually:

- [ ] Sidebar visible with correct nav items
- [ ] Clicking a nav item navigates with slide-in from correct direction
- [ ] "Next →" navigates to the next page (slides from right)
- [ ] "← Prev" navigates to the previous page (slides from left)
- [ ] Dot indicators update correctly at each page
- [ ] Search box: type "azure" → sidebar shows only "Certifications" nav item
- [ ] Search box: clear → all nav items return
- [ ] "⬇ Download PDF" button triggers PDF download
- [ ] Hero page renders with dark navy background and gold JT monogram
- [ ] Summary page renders stats row
- [ ] Competencies shows 3-column card grid
- [ ] Cogent Holdings experience page shows 2 bullets with bold titles
- [ ] Education timeline renders 3 entries with gold dots
- [ ] Certifications shows cloud/robot icons on cards
- [ ] Vision page shows 2 cards + navy closing section

**Step 4: Build check**

```bash
npm run build
```

Expected: No errors. If there are client/server boundary errors, add `'use client'` to the affected component.

**Step 5: Final commit**

```bash
git add -A && git commit -m "feat: complete John Tan interactive resume webapp"
```

---

## Common Issues & Fixes

**"You're importing a component that needs useState ... use client"**
→ Add `'use client'` to the top of the component file that uses hooks.

**AnimatePresence not animating exit**
→ Ensure `mode="wait"` is set on `AnimatePresence` and each page has a unique `key={pathname}`.

**PDF download doesn't work**
→ Verify `public/assets/John_Tan_Resume_RN.pdf` exists. Next.js serves `public/` at the root, so the href should be `/assets/John_Tan_Resume_RN.pdf`.

**`--sidebar-w` CSS variable not applying**
→ Ensure `:root` variables are in `globals.css` which is imported in `layout.tsx`.

**Framer Motion types error**
→ Run `npm install framer-motion@latest` to ensure version 11+.
