# THK Programme Executive Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Automation Specialist role with THK Programme Executive, making THK the default role alongside LBSA, deployed at `john-tan-program-executive.vercel.app`.

**Architecture:** New `resumeTHK.ts` data file + `[data-role="thk"]` CSS theme. `roleContext.tsx` updated to `'thk' | 'lbsa'` with THK as default. `resume.ts` (automation) kept on disk as silent archive, not surfaced in UI. Mirrors the TOUCH → LBSA retirement pattern.

**Tech Stack:** Next.js 14 App Router, React context, CSS custom properties, TypeScript, Jest, ReportLab (Python PDF), Vercel

---

### Task 1: Update navigation tests to use resumeTHK (TDD — write failing tests first)

**Files:**
- Modify: `src/__tests__/navigation.test.ts`

**Step 1: Replace automation imports and assertions with THK equivalents**

Open `src/__tests__/navigation.test.ts` and replace the entire file content with:

```typescript
import {
  PAGES,
  getPageIndex,
  getAdjacentPages,
  searchSections,
  getSearchPages,
} from '@/lib/navigation'
import { resumeTHK } from '@/data/resumeTHK'
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

  it('finds summary page for "volunteer"', () => {
    const results = searchSections('volunteer')
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
    const lower = searchSections('outreach')
    const upper = searchSections('OUTREACH')
    expect(lower).toEqual(upper)
  })
})

describe('getSearchPages', () => {
  it('returns 9 pages for THK resume', () => {
    expect(getSearchPages(resumeTHK)).toHaveLength(9)
  })

  it('returns 9 pages for LBSA resume', () => {
    expect(getSearchPages(resumeLBSA)).toHaveLength(9)
  })

  it('THK pages contain volunteer in summary searchText', () => {
    const pages = getSearchPages(resumeTHK)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('volunteer')
  })

  it('LBSA pages contain active ageing in summary searchText', () => {
    const pages = getSearchPages(resumeLBSA)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('active ageing')
  })

  it('THK pages contain thkmc in summary searchText', () => {
    const pages = getSearchPages(resumeTHK)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('thkmc')
  })

  it('LBSA pages contain community screener tool in education searchText', () => {
    const pages = getSearchPages(resumeLBSA)
    const education = pages.find(p => p.path === '/education')!
    expect(education.searchText.toLowerCase()).toContain('community screener tool')
  })

  it('first page is / for both roles', () => {
    expect(getSearchPages(resumeTHK)[0].path).toBe('/')
    expect(getSearchPages(resumeLBSA)[0].path).toBe('/')
  })

  it('last page is /vision for both roles', () => {
    const thkPages = getSearchPages(resumeTHK)
    const lbsaPages = getSearchPages(resumeLBSA)
    expect(thkPages[thkPages.length - 1].path).toBe('/vision')
    expect(lbsaPages[lbsaPages.length - 1].path).toBe('/vision')
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
npm test -- --testPathPattern="navigation" --no-coverage
```

Expected: FAIL — `Cannot find module '@/data/resumeTHK'`

**Step 3: Commit the failing tests**

```bash
git add src/__tests__/navigation.test.ts
git commit -m "test: update navigation tests for THK role, replace automation refs"
```

---

### Task 2: Create resumeTHK.ts data file (make Task 1 tests pass)

**Files:**
- Create: `src/data/resumeTHK.ts`

**Step 1: Create the file**

```typescript
import type { ResumeData } from './resume'

export const resumeTHK: ResumeData = {
  name: "John Tan",
  title: "Programme Executive | Volunteer Development & Community Outreach",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-program-executive.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Outreach Programme Execution · Volunteer Development · Stakeholder Engagement · Community Empowerment",
    body: "Career-transition professional leveraging 6+ years of programme coordination and stakeholder management to serve THKMC's 70,000+ beneficiaries — equipped to execute outreach plans, develop volunteer networks, and ensure performance against MOH/AIC/MSF indicators. Currently completing WSQ Diploma in Social Service (Tsao Foundation / Hua Mei Training Academy, SCTP), with 16-day hands-on fieldwork at an Active Ageing Centre — including direct application of community outreach tools, needs assessment, and care coordination for vulnerable seniors. Brings Diploma-grounded understanding of Volunteer Programme Management principles, stakeholder engagement strategy, and community outreach execution, combined with 6+ years of cross-sector experience in programme management, partner relationship building, and budget governance. Ready to contribute meaningfully to THKMC's mission of serving Singapore's communities across Disability, Early Intervention, Family, Seniors, and Therapy services.",
    searchText: "summary programme executive volunteer development community outreach thkmc thye hua kwan moral charities 70000 beneficiaries outreach plan volunteer recruitment screening orientation stakeholder engagement community partner networks kpi reporting moh aic msf indicators wsq diploma social service tsao foundation hua mei sctp fieldwork programme management stakeholder engagement budget governance",
  },
  competencies: {
    leadership: [
      "Outreach Planning, Execution & Follow-up Visits",
      "Volunteer Recruitment, Screening & Orientation",
      "Stakeholder Engagement & Community Partner Networks",
      "Mutual Help Group Facilitation & Senior Empowerment",
    ],
    technical: [
      "Programme Planning, Implementation & Evaluation",
      "KPI Monitoring & MOH/AIC/MSF Compliance Reporting",
      "Budget Documentation & Financial Record-keeping",
      "Microsoft Office & Digital Programme Tools",
    ],
    socialService: [
      "Volunteer Programme Management (WSQ Diploma module)",
      "Community Outreach Strategy & Senior Registration",
      "Ethics, Legislation & Social Policy (WSQ)",
      "Needs Assessment & Vulnerable Senior Support",
    ],
    searchText: "competencies outreach planning execution follow-up visits volunteer recruitment screening orientation stakeholder engagement community partner networks mutual help group facilitation senior empowerment programme planning implementation evaluation kpi monitoring moh aic msf compliance reporting budget documentation financial record-keeping microsoft office digital programme tools volunteer programme management community outreach strategy senior registration ethics legislation social policy needs assessment vulnerable senior support",
  },
  experience: [
    {
      id: "cogent",
      role: "Community Engagement & Outreach Lead",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Outreach Plan Execution: Led structured outreach campaigns engaging 50+ external partners and stakeholders across multiple communities — directly applicable to developing and implementing THKMC's outreach plans, conducting follow-up visits to seniors in identified HDB blocks, and registering seniors within service boundaries.",
        "Volunteer Network & Partner Development: Established networks with grassroots organisations, corporate bodies, and educational institutions to build a sustainable volunteer pipeline — mirrors THKMC's requirement to recruit, interview, screen, and orient volunteers, and to serve as the key communication link between the AAC and its volunteers.",
        "Programme Coordination & Evaluation: Designed, implemented, and evaluated multi-stakeholder programmes with structured data collection and feedback loops, achieving 30% improvement in community engagement — demonstrating programme planning, performance monitoring, and evaluation skills aligned with THKMC's MOH/AIC/MSF reporting requirements.",
      ],
      searchText: "community engagement outreach lead cogent holdings outreach plan execution 50 external partners stakeholders hdb blocks senior registration follow-up visits volunteer network partner development grassroots corporate educational institutions volunteer pipeline recruitment screening orientation communication link aac volunteers programme coordination evaluation data collection 30% improvement kpi monitoring moh aic msf reporting",
    },
    {
      id: "st-engineering",
      role: "Programme Coordinator (Planning & Evaluation)",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "End-to-End Programme Planning: Coordinated 3 complete programme cycles — from needs identification and design through implementation, monitoring, and post-programme evaluation — directly applicable to developing and implementing THKMC's annual calendar of social and health activities ensuring performance indicators are met.",
        "KPI Reporting & Compliance Documentation: Built structured data collection systems and evaluation frameworks tracking programme KPIs across multiple operational units — maps directly to THKMC's reporting requirements against operating guidelines issued by MOH, AIC, and MSF through their reporting systems.",
        "Budget Documentation & Financial Compliance: Maintained meticulous financial records ensuring full documentation of all expenditures and strict adherence to allocated budgets — aligns with THKMC's requirement for accurate budget documentation and financial record-keeping.",
      ],
      searchText: "programme coordinator planning evaluation st engineering end-to-end programme cycles needs identification implementation monitoring post-programme evaluation annual calendar social health activities performance indicators kpi reporting compliance documentation moh aic msf operating guidelines budget documentation financial compliance expenditures adherence",
    },
    {
      id: "abnamro",
      role: "Director / Stakeholder & Relationship Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Stakeholder & Budget Management: Managed strategic relationships with 200+ clients and institutional counterparties alongside multi-million dollar budget oversight — directly meets THKMC's requirement for 3+ years of stakeholder and budget management experience.",
        "External Partnership Development: Built and maintained partnerships with diverse external organisations, community bodies, and institutional partners — transferable to THKMC's requirement to establish networks with grassroots, social services, corporate organisations, and schools to engage volunteers.",
        "Cross-Functional Communication: Served as the key communication link between operations, compliance, and client-facing teams — mirrors THKMC's requirement for the Programme Executive to serve as the key communication link between the AAC and its volunteers and community partners.",
      ],
      searchText: "director stakeholder relationship management abn amro 200 clients institutional counterparties budget management external partnership development community bodies grassroots social services corporate organisations schools volunteers cross-functional communication key communication link aac volunteers community partners",
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
          "Industrial Attachment: 16-day hands-on fieldwork at Active Ageing Centre — applied community outreach tools, conducted needs assessments, tiered seniors by care complexity, and supported care coordination for vulnerable seniors; direct on-the-ground AAC operational experience transferable to THKMC's service model",
          "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management — supports THKMC's digital volunteer system adoption goals",
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
    searchText: "education wsq diploma social service tsao foundation hua mei training academy volunteer programme management stakeholder management ethics legislation social policy financial management 16-day fieldwork active ageing centre needs assessment senior care coordination aac operational experience thkmc digital volunteer system mba ntu nanyang dean honors list strategic management organisational behaviour bachelor mathematics nus public service commission scholarship sctp career transition",
  },
  certifications: {
    items: [
      "WSQ Diploma in Social Service — In Progress (Tsao Foundation / SCTP)",
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications wsq diploma social service tsao foundation sctp career transition microsoft azure ai engineer google professional machine learning engineer professional development social service volunteer management",
  },
  vision: {
    sections: [
      {
        title: "Integrated Senior Outreach & Mutual Help",
        body: "Execute systematic block-by-block senior registration and outreach plans — conducting structured follow-up visits to vulnerable and socially isolated seniors, maintaining accurate service boundary records, and establishing mutual help groups that empower seniors to support one another. The goal: every senior within THKMC's service boundary is known, registered, and connected to the right level of care and community.",
      },
      {
        title: "Volunteer Ecosystem & Long-Term Retention",
        body: "Build a structured volunteer recruitment pipeline spanning grassroots organisations, corporate partners, educational institutions, and community bodies — providing thorough orientation to volunteers' assigned roles and THKMC's mission, serving as their primary communication link, and creating recognition frameworks that ensure long-term retention. Because sustained volunteer engagement is what transforms a programme into a community.",
      },
      {
        title: "Data-Driven Programme Excellence",
        body: "Implement rigorous KPI monitoring frameworks aligned with MOH, AIC, and MSF operating guidelines — ensuring every programme meets performance indicators, financial records are audit-ready, and evaluation insights continuously improve activity design across THKMC's 5 service lines. Technology and data in service of compassion: measurable outcomes for every beneficiary served.",
      },
    ],
    closing: {
      title: "Programme Management + Compassion for THKMC's Communities",
      body: "John's combination of WSQ Diploma in Social Service (with Volunteer Programme Management module, 16-day AAC fieldwork, and hands-on community outreach experience) and 6+ years of enterprise programme management, stakeholder engagement, and budget governance uniquely equips him to serve THKMC's mission from day one. Every outreach plan he executes, every volunteer he recruits and supports, every partner relationship he builds — all will reflect both operational rigour and genuine compassion. Because for THKMC's 70,000+ beneficiaries, quality of life depends on both.",
    },
    searchText: "vision integrated senior outreach mutual help block-by-block registration follow-up visits vulnerable socially isolated seniors service boundary mutual help groups volunteer ecosystem long-term retention grassroots corporate educational institutions volunteer pipeline recruitment orientation thkmc mission recognition frameworks data-driven programme excellence kpi monitoring moh aic msf operating guidelines performance indicators financial records evaluation 5 service lines disability early intervention family seniors therapy technology compassion wsq diploma volunteer programme management fieldwork programme management stakeholder engagement budget governance",
  },
  stats: [
    { value: '70K+', label: 'Beneficiaries Served' },
    { value: '3+', label: 'Years Stakeholder Mgmt' },
    { value: '50+', label: 'Partners Engaged' },
    { value: '70+', label: 'Programmes Across THK' },
  ],
}
```

**Step 2: Run tests — verify Task 1 tests now pass**

```bash
npm test -- --testPathPattern="navigation" --no-coverage
```

Expected: All navigation tests PASS.

**Step 3: Commit**

```bash
git add src/data/resumeTHK.ts
git commit -m "feat: add resumeTHK data file for THK Programme Executive role"
```

---

### Task 3: Add THK CSS theme to globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add THK theme block after the LBSA theme block (after line 71)**

Append this block immediately after the closing `}` of `[data-role="lbsa"]`:

```css
/* THK Programme Executive theme — Thye Hua Kwan dark blue/red */
[data-role="thk"] {
  --navy:       #1a2557;
  --navy-dark:  #0d1840;
  --navy-mid:   #253680;
  --gold:       #c41e3a;
  --gold-light: #e05070;
  --gold-dim:   #a01830;
  --surface:    #fafbff;
  --border:     #e8eaf6;
  --hero-gradient: linear-gradient(135deg, #0d1840 0%, #253680 60%, #1a2557 100%);
}
```

**Step 2: Verify TypeScript still compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add THK dark blue/red CSS theme tokens"
```

---

### Task 4: Update roleContext.tsx — swap automation for THK

**Files:**
- Modify: `src/lib/roleContext.tsx`

**Step 1: Replace the entire file content with:**

```typescript
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resumeTHK } from '@/data/resumeTHK'
import { resumeLBSA } from '@/data/resumeLBSA'

export type Role = 'thk' | 'lbsa'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'thk',
  resumeData: resumeTHK,
  switcherHref: (path) => path,
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('thk')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'lbsa' ? 'lbsa' : 'thk')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'lbsa' ? resumeLBSA : resumeTHK

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'thk' ? 'lbsa' : 'thk'
    if (targetRole === 'thk') return currentPath
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

Expected: No errors.

**Step 3: Commit**

```bash
git add src/lib/roleContext.tsx
git commit -m "feat: update roleContext — retire automation, add thk as default role"
```

---

### Task 5: Update Sidebar.tsx — THK labels, switcher, PDF path

**Files:**
- Modify: `src/components/Sidebar/Sidebar.tsx`

**Step 1: Replace the role-dependent variables block (lines 25–35) with:**

```typescript
  const isTHK = role === 'thk'
  const pdfHref = isTHK
    ? '/assets/John_Tan_Resume_THK.pdf'
    : '/assets/John_Tan_Resume_LBSA.pdf'
  const pdfFilename = isTHK
    ? 'John_Tan_Resume_THK.pdf'
    : 'John_Tan_Resume_LBSA.pdf'
  const switchLabel = isTHK
    ? 'Switch: LBSA Programme Executive →'
    : 'Switch: THK Programme Executive →'
  const roleLabel = isTHK ? 'THK' : 'LBSA'
```

**Step 2: Replace the subtitle line (line 47) with:**

```tsx
          {isTHK ? 'Programme Executive · THKMC' : 'Programme Executive · LBSA'}
```

**Step 3: Replace the `roleDot` line (line 50) with:**

```tsx
          <span className={styles.roleDot}>●</span> {roleLabel}
```

(this line is unchanged — confirm it still reads `{roleLabel}`)

**Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 5: Commit**

```bash
git add src/components/Sidebar/Sidebar.tsx
git commit -m "feat: update Sidebar for THK — labels, PDF paths, switcher text"
```

---

### Task 6: Update resumeDownload.ts — point API route to THK PDF

**Files:**
- Modify: `src/lib/resumeDownload.ts`

**Step 1: Replace file content with:**

```typescript
export const RESUME_PDF_FILENAME = 'John_Tan_Resume_THK.pdf'
export const RESUME_PDF_PUBLIC_PATH = `/assets/${RESUME_PDF_FILENAME}`
export const RESUME_PDF_DOWNLOAD_PATH = '/download/resume'
```

**Step 2: Run the download route test to verify it still passes structure-wise**

```bash
npm test -- --testPathPattern="resume-download-route" --no-coverage
```

Note: This test will FAIL until the THK PDF exists in `public/assets/`. That's expected — the PDF is generated in Task 7. If the test runner errors on missing file, that's fine; proceed to Task 7.

**Step 3: Commit**

```bash
git add src/lib/resumeDownload.ts
git commit -m "feat: update resumeDownload to reference THK PDF"
```

---

### Task 7: Create generate_thk_pdf.py and generate the PDF

**Files:**
- Create: `scripts/generate_thk_pdf.py`

**Step 1: Create the script**

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

output_path = r"C:\Users\admin\superpowers-automation\public\assets\John_Tan_Resume_THK.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=18*mm,
    rightMargin=18*mm,
    topMargin=14*mm,
    bottomMargin=14*mm,
)

w, h = A4

NAVY = colors.HexColor("#1a2557")
ACCENT = colors.HexColor("#c41e3a")
TEXT = colors.HexColor("#1a1a1a")
MUTED = colors.HexColor("#555555")

def style(name, **kw):
    return ParagraphStyle(name, **kw)

NAME_STYLE = style("Name",
    fontName="Helvetica-Bold", fontSize=22, textColor=NAVY,
    spaceAfter=2, leading=26)

TITLE_STYLE = style("Title_",
    fontName="Helvetica", fontSize=11, textColor=ACCENT,
    spaceAfter=2, leading=14)

CONTACT_STYLE = style("Contact",
    fontName="Helvetica", fontSize=9, textColor=MUTED,
    spaceAfter=0, leading=13)

SECTION_HEADER = style("SectionHeader",
    fontName="Helvetica-Bold", fontSize=10, textColor=NAVY,
    spaceBefore=10, spaceAfter=3, leading=13)

BODY_STYLE = style("Body_",
    fontName="Helvetica", fontSize=9, textColor=TEXT,
    spaceAfter=4, leading=13, alignment=TA_JUSTIFY)

BULLET_STYLE = style("Bullet_",
    fontName="Helvetica", fontSize=8.5, textColor=TEXT,
    spaceAfter=3, leading=12.5, leftIndent=12,
    bulletIndent=2, alignment=TA_JUSTIFY)

JOB_TITLE_STYLE = style("JobTitle",
    fontName="Helvetica-Bold", fontSize=9.5, textColor=TEXT,
    spaceAfter=1, leading=13)

JOB_COMPANY_STYLE = style("JobCompany",
    fontName="Helvetica-Oblique", fontSize=9, textColor=MUTED,
    spaceAfter=4, leading=13)

EDU_DEG_STYLE = style("EduDeg",
    fontName="Helvetica-Bold", fontSize=9.5, textColor=TEXT,
    spaceAfter=1, leading=13)

EDU_INST_STYLE = style("EduInst",
    fontName="Helvetica-Oblique", fontSize=9, textColor=MUTED,
    spaceAfter=3, leading=13)

COMPETENCY_STYLE = style("Comp",
    fontName="Helvetica", fontSize=8.5, textColor=TEXT,
    spaceAfter=2, leading=12, alignment=TA_JUSTIFY)

def divider():
    return HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceAfter=4, spaceBefore=2)

def section_header(text):
    return [
        Spacer(1, 2),
        Paragraph(text.upper(), SECTION_HEADER),
        divider(),
    ]

story = []

# Header
story.append(Paragraph("JOHN TAN", NAME_STYLE))
story.append(Paragraph("Programme Executive | Volunteer Development & Community Outreach", TITLE_STYLE))
story.append(Paragraph(
    "vieming@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; 98891383 &nbsp;&nbsp;|&nbsp;&nbsp; linkedin.com/in/john-tan-02763732",
    CONTACT_STYLE))
story.append(Spacer(1, 4))
story.append(divider())

# Professional Summary
story += section_header("Professional Summary")
story.append(Paragraph(
    "Career-transition professional leveraging 6+ years of programme coordination and stakeholder management "
    "to serve THKMC's 70,000+ beneficiaries — equipped to execute outreach plans, develop volunteer networks, "
    "and ensure performance against MOH/AIC/MSF indicators. Currently completing WSQ Diploma in Social Service "
    "(Tsao Foundation / Hua Mei Training Academy, SCTP), with 16-day hands-on fieldwork at an Active Ageing "
    "Centre — including direct application of community outreach tools, needs assessment, and care coordination "
    "for vulnerable seniors. Brings Diploma-grounded understanding of Volunteer Programme Management principles, "
    "stakeholder engagement strategy, and community outreach execution, combined with 6+ years of cross-sector "
    "experience in programme management, partner relationship building, and budget governance. Ready to contribute "
    "meaningfully to THKMC's mission of serving Singapore's communities across Disability, Early Intervention, "
    "Family, Seniors, and Therapy services.",
    BODY_STYLE))

# Key Competencies
story += section_header("Key Competencies")

comp_cell_style = ParagraphStyle("CompCell",
    fontName="Helvetica", fontSize=8.2, textColor=TEXT, leading=11.5)

comp_data = [
    ["Outreach Planning, Execution\n& Follow-up Visits",
     "Programme Planning,\nImplementation & Evaluation",
     "Volunteer Programme Management\n(WSQ Diploma module)"],
    ["Volunteer Recruitment,\nScreening & Orientation",
     "KPI Monitoring & MOH/AIC/MSF\nCompliance Reporting",
     "Community Outreach Strategy\n& Senior Registration"],
    ["Stakeholder Engagement &\nCommunity Partner Networks",
     "Budget Documentation &\nFinancial Record-keeping",
     "Ethics, Legislation &\nSocial Policy (WSQ)"],
    ["Mutual Help Group Facilitation\n& Senior Empowerment",
     "Microsoft Office &\nDigital Programme Tools",
     "Needs Assessment &\nVulnerable Senior Support"],
]

comp_rows = []
for row in comp_data:
    comp_rows.append([Paragraph(cell, comp_cell_style) for cell in row])

col_w = (w - 36*mm) / 3
comp_table = Table(comp_rows, colWidths=[col_w, col_w, col_w])
comp_table.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("TOPPADDING", (0,0), (-1,-1), 2),
    ("BOTTOMPADDING", (0,0), (-1,-1), 2),
    ("LEFTPADDING", (0,0), (-1,-1), 2),
    ("RIGHTPADDING", (0,0), (-1,-1), 6),
]))
story.append(comp_table)

# Work Experience
story += section_header("Work Experience")

experiences = [
    {
        "role": "Community Engagement & Outreach Lead",
        "company": "Cogent Holdings Pte Ltd | 2022 - Present",
        "bullets": [
            "<b>Outreach Plan Execution:</b> Led structured outreach campaigns engaging 50+ external partners and stakeholders across multiple communities - directly applicable to developing and implementing THKMC's outreach plans, conducting follow-up visits to seniors in identified HDB blocks, and registering seniors within service boundaries.",
            "<b>Volunteer Network & Partner Development:</b> Established networks with grassroots organisations, corporate bodies, and educational institutions to build a sustainable volunteer pipeline - mirrors THKMC's requirement to recruit, interview, screen, and orient volunteers, and to serve as the key communication link between the AAC and its volunteers.",
            "<b>Programme Coordination & Evaluation:</b> Designed, implemented, and evaluated multi-stakeholder programmes with structured data collection and feedback loops, achieving 30% improvement in community engagement - demonstrating programme planning, performance monitoring, and evaluation skills aligned with THKMC's MOH/AIC/MSF reporting requirements.",
        ]
    },
    {
        "role": "Programme Coordinator (Planning & Evaluation)",
        "company": "ST Engineering | 2019 - 2022",
        "bullets": [
            "<b>End-to-End Programme Planning:</b> Coordinated 3 complete programme cycles - from needs identification and design through implementation, monitoring, and post-programme evaluation - directly applicable to developing and implementing THKMC's annual calendar of social and health activities ensuring performance indicators are met.",
            "<b>KPI Reporting & Compliance Documentation:</b> Built structured data collection systems and evaluation frameworks tracking programme KPIs across multiple operational units - maps directly to THKMC's reporting requirements against operating guidelines issued by MOH, AIC, and MSF through their reporting systems.",
            "<b>Budget Documentation & Financial Compliance:</b> Maintained meticulous financial records ensuring full documentation of all expenditures and strict adherence to allocated budgets - aligns with THKMC's requirement for accurate budget documentation and financial record-keeping.",
        ]
    },
    {
        "role": "Director / Stakeholder & Relationship Management",
        "company": "ABN AMRO | 2017 - 2019",
        "bullets": [
            "<b>Stakeholder & Budget Management:</b> Managed strategic relationships with 200+ clients and institutional counterparties alongside multi-million dollar budget oversight - directly meets THKMC's requirement for 3+ years of stakeholder and budget management experience.",
            "<b>External Partnership Development:</b> Built and maintained partnerships with diverse external organisations, community bodies, and institutional partners - transferable to THKMC's requirement to establish networks with grassroots, social services, corporate organisations, and schools to engage volunteers.",
            "<b>Cross-Functional Communication:</b> Served as the key communication link between operations, compliance, and client-facing teams - mirrors THKMC's requirement for the Programme Executive to serve as the key communication link between the AAC and its volunteers and community partners.",
        ]
    },
]

for exp in experiences:
    story.append(Paragraph(exp["role"], JOB_TITLE_STYLE))
    story.append(Paragraph(exp["company"], JOB_COMPANY_STYLE))
    for b in exp["bullets"]:
        story.append(Paragraph("&#8226; &nbsp;" + b, BULLET_STYLE))
    story.append(Spacer(1, 3))

# Education
story += section_header("Education")

edu_entries = [
    {
        "degree": "WSQ Diploma in Social Service",
        "inst": "Tsao Foundation (Hua Mei Training Academy) | 2026 - Present",
        "note": "Candidate for Graduation; SCTP Career Transition Programme",
        "details": [
            "Key Modules: Volunteer Programme Management; Stakeholder Management; Ethics & Legislation; Social Policy Implementation; Financial Management",
            "Industrial Attachment: 16-day hands-on fieldwork at Active Ageing Centre - applied community outreach tools, conducted needs assessments, tiered seniors by care complexity, and supported care coordination for vulnerable seniors; direct on-the-ground AAC operational experience transferable to THKMC's service model",
            "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management - supports THKMC's digital volunteer system adoption goals",
        ]
    },
    {
        "degree": "MBA",
        "inst": "Nanyang Technological University (NTU) | 2001 - 2003",
        "note": "Dean's Honors List - strategic management, stakeholder leadership, and organisational behaviour",
        "details": []
    },
    {
        "degree": "Bachelor of Science in Mathematics",
        "inst": "National University of Singapore (NUS) | 1994",
        "note": "Public Service Commission Scholarship",
        "details": []
    },
]

for e in edu_entries:
    story.append(Paragraph(e["degree"], EDU_DEG_STYLE))
    story.append(Paragraph(e["inst"], EDU_INST_STYLE))
    if e.get("note"):
        story.append(Paragraph(e["note"], COMPETENCY_STYLE))
    for d in e.get("details", []):
        story.append(Paragraph("&#8226; &nbsp;" + d, BULLET_STYLE))
    story.append(Spacer(1, 3))

# Certifications
story += section_header("Certifications")
certs = [
    "WSQ Diploma in Social Service - In Progress (Tsao Foundation / SCTP)",
    "Microsoft Certified: Azure AI Engineer Associate",
    "Google Professional Machine Learning Engineer",
]
for c in certs:
    story.append(Paragraph("&#8226; &nbsp;" + c, BULLET_STYLE))

doc.build(story)
print("PDF generated:", output_path)
```

**Step 2: Run the script to generate the PDF**

```bash
python scripts/generate_thk_pdf.py
```

Expected output: `PDF generated: C:\Users\admin\superpowers-automation\public\assets\John_Tan_Resume_THK.pdf`

**Step 3: Verify the PDF was created**

```bash
ls public/assets/
```

Expected: `John_Tan_Resume_THK.pdf` present alongside `John_Tan_Resume_LBSA.pdf` and `John_Tan_Resume_Automation.pdf`.

**Step 4: Commit**

```bash
git add scripts/generate_thk_pdf.py public/assets/John_Tan_Resume_THK.pdf
git commit -m "feat: add THK PDF resume and generation script"
```

---

### Task 8: Full test suite + build verification

**Step 1: Run all tests**

```bash
npm test -- --no-coverage
```

Expected: All tests PASS, including:
- `navigation.test.ts` — all 15 tests green
- `resume-download-route.test.ts` — passes (THK PDF exists now)

If any test fails, read the error carefully and fix before proceeding.

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 4: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve any build/test issues after THK role integration"
```

(Only run this step if there were fixes. Skip if everything was clean.)

---

### Task 9: Update CLAUDE.md — reflect new architecture

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update the Data Files section**

Replace:
```
- `src/data/resume.ts` — Automation Specialist resume data (NTUC Health target)
- `src/data/resumeLBSA.ts` — LBSA Programme Executive resume data (Lions Befrienders target)
```

With:
```
- `src/data/resumeTHK.ts` — THK Programme Executive resume data (Thye Hua Kwan target, default)
- `src/data/resumeLBSA.ts` — LBSA Programme Executive resume data (Lions Befrienders target)
- `src/data/resume.ts` — Automation Specialist resume data (NTUC Health, archived — not surfaced in UI)
```

**Step 2: Update the Dual-Role System section**

Replace:
```
- No param / `?role=lbsa` → LBSA Programme Executive (default)
- `?role=automation` → Automation Specialist
```

With:
```
- No param / `?role=thk` → THK Programme Executive (default)
- `?role=lbsa` → LBSA Programme Executive
```

**Step 3: Update the PDF Downloads section**

Replace:
```
- `John_Tan_Resume_Automation.pdf` — served when `role === 'automation'`
- `John_Tan_Resume_LBSA.pdf` — served when `role === 'lbsa'` (default)
```

With:
```
- `John_Tan_Resume_THK.pdf` — served when `role === 'thk'` (default)
- `John_Tan_Resume_LBSA.pdf` — served when `role === 'lbsa'`
```

**Step 4: Update the Commands section — add THK PDF script**

Replace:
```
python scripts/generate_lbsa_pdf.py  # regenerate LBSA PDF
```

With:
```
python scripts/generate_lbsa_pdf.py  # regenerate LBSA PDF
python scripts/generate_thk_pdf.py   # regenerate THK PDF
```

**Step 5: Update the Retired section**

Add after existing retired entry:
```
- `resume.ts` (Automation Specialist role) — archived March 2026; replaced by THK as default role
```

**Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md — THK as default role, archive automation"
```

---

### Task 10: Deploy to new Vercel project

**Step 1: Push all commits to remote**

```bash
git push origin master
```

**Step 2: Create new Vercel project**

Use the `vercel:deploy` skill or run via Vercel MCP. The new project should be named `john-tan-program-executive` pointing to the same GitHub repo, deploying from `master`.

If using Vercel MCP tool `deploy_to_vercel`, the project name is `john-tan-program-executive`.

If using CLI:
```bash
vercel --name john-tan-program-executive
```

When prompted:
- Set up and deploy: Yes
- Which scope: your personal account
- Link to existing project: No
- Project name: `john-tan-program-executive`
- Directory: `./` (root)
- Override settings: No

**Step 3: Verify deployment**

Visit `https://john-tan-program-executive.vercel.app` — should open in THK dark blue/red theme.
Visit `https://john-tan-program-executive.vercel.app/?role=lbsa` — should switch to LBSA blue/amber theme.

**Step 4: Final commit (if any Vercel config files were created)**

```bash
git add .vercel/ vercel.json 2>/dev/null; git status
git commit -m "chore: add Vercel project config for john-tan-program-executive"
```

Only run if Vercel created new config files.
