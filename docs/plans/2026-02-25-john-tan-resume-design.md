# John Tan Interactive Resume — Design Document
**Date:** 2026-02-25
**Stack:** Next.js 14 (App Router), React, TypeScript, CSS Modules, Framer Motion

---

## Overview

An interactive single-page-app-style resume website for John Tan (Center Manager | Residents' Network). Replaces the static PDF with a navigable, searchable, animated web experience while preserving the PDF as a downloadable asset.

---

## Architecture

### Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** CSS Modules (no Tailwind — precision control)
- **Animations:** Framer Motion (`AnimatePresence` for page transitions)
- **Fonts:** Inter via `next/font/google`
- **Data:** `src/data/resume.ts` — typed TypeScript object with all resume content

### Route Map (9 pages)
```
/                         → Hero
/summary                  → Professional Summary
/competencies             → Core Competencies
/experience/cogent        → Generative AI Engineer @ Cogent Holdings
/experience/st-engineering → Software Engineer @ ST Engineering
/experience/abnamro       → Director / PWM @ ABN AMRO
/education                → Education
/certifications           → Certifications
/vision                   → Center Manager: Innovation Vision
```

### Directory Structure
```
src/
  app/
    layout.tsx              # Root layout: Sidebar + main + AnimatePresence wrapper
    globals.css             # CSS custom properties (color tokens, reset)
    page.tsx                # /  → Hero
    summary/page.tsx
    competencies/page.tsx
    experience/
      cogent/page.tsx
      st-engineering/page.tsx
      abnamro/page.tsx
    education/page.tsx
    certifications/page.tsx
    vision/page.tsx
  components/
    Sidebar/
      Sidebar.tsx + Sidebar.module.css
    NavItem/
      NavItem.tsx + NavItem.module.css
    PrevNextBar/
      PrevNextBar.tsx + PrevNextBar.module.css
    SearchBox/
      SearchBox.tsx + SearchBox.module.css
    PageTransition/
      PageTransition.tsx      # AnimatePresence wrapper + direction logic
    pages/
      HeroPage.tsx + HeroPage.module.css
      SummaryPage.tsx + SummaryPage.module.css
      CompetenciesPage.tsx + CompetenciesPage.module.css
      ExperiencePage.tsx + ExperiencePage.module.css
      EducationPage.tsx + EducationPage.module.css
      CertificationsPage.tsx + CertificationsPage.module.css
      VisionPage.tsx + VisionPage.module.css
  data/
    resume.ts               # All resume content, typed
  hooks/
    useNavigationDirection.ts  # Tracks prev/next direction for transitions
  lib/
    navigation.ts           # Ordered route list, prev/next helpers, search util
public/
  assets/
    John_Tan_Resume_RN.pdf  # Source PDF for download button
```

---

## Data Model

```typescript
// src/data/resume.ts
export const resume = {
  name: "John Tan",
  title: "Center Manager | Residents' Network",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-presentation.vercel.app",
    phone: "98891383",
  },
  summary: { tagline: "...", body: "..." },
  competencies: {
    leadership: [...],
    technical: [...],
    socialService: [...],
  },
  experience: [
    { id: "cogent", role: "...", company: "...", period: "...", bullets: [...] },
    { id: "st-engineering", ... },
    { id: "abnamro", ... },
  ],
  education: [...],
  certifications: [...],
  vision: { sections: [...] },
}
```

Each section also has a `searchText: string` field (concatenated prose) for full-text search.

---

## Layout

```
┌──────────────┬─────────────────────────────────────┐
│  SIDEBAR     │  CONTENT AREA                       │
│  260px fixed │  flex-1, overflow-y: auto           │
│              │                                     │
│  [JT] monogram  │  ┌────────────────────────────┐ │
│  John Tan    │  │  <AnimatePresence> page       │ │
│  ─────────── │  └────────────────────────────┘ │
│  🏠 Home     │                                     │
│  📝 Summary  │  ◀ Prev   [4 / 9]    Next ▶        │
│  ⭐ Competencies │                               │
│  💼 Cogent   └─────────────────────────────────────┘
│  💼 ST Eng
│  💼 ABN AMRO
│  🎓 Education
│  🏅 Certifications
│  💡 Vision
│  ───────────
│  🔍 Search
│  ───────────
│  ⬇ Download PDF
└──────────────
```

---

## Visual Design

### Color Tokens
```css
--navy:       #1a2e4a   /* sidebar bg, headings */
--navy-dark:  #0f1e36   /* sidebar hover, active bg */
--gold:       #c9a84c   /* accents, active nav border, highlights */
--gold-light: #e8c97a   /* gold hover states */
--white:      #ffffff   /* content area bg */
--text:       #1a1a1a   /* body text */
--text-muted: #64748b   /* secondary text */
--surface:    #f8fafc   /* card backgrounds */
```

### Typography
- Font: `Inter` (Google Fonts, variable weight)
- Headings: 700 weight, navy or white
- Body: 400 weight, --text
- Gold used for section labels, active states, key stats

### Page Components
| Page | Key Visual Concept |
|---|---|
| Hero | Full-height, large gold "JT" monogram, animated contact icon row |
| Summary | Gold tagline in quote style, readable prose column |
| Competencies | Animated 3-column card grid with stagger entry |
| Experience | Gold company name, role header, bullet list with hover highlight |
| Education | Vertical timeline with degree badges |
| Certifications | Card grid with Azure/Google badge icons |
| Vision | Two-column layout, closing "catalyst" statement in gold italic |

---

## Transitions

Direction-aware slide + fade using Framer Motion:

```ts
const variants = {
  enter: (dir: 1 | -1) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: 1 | -1) => ({ x: dir * -80, opacity: 0 }),
}
const transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
```

- `dir = 1` (Next): enter from right, exit to left
- `dir = -1` (Prev): enter from left, exit to right
- Direction stored in React context, set by PrevNextBar and sidebar nav clicks

---

## Search

- Search box in sidebar, filters nav items to sections containing query text
- Within rendered page, query terms wrapped in `<mark>` with gold background
- No external library — simple string `.includes()` on `searchText` fields
- Empty query restores all nav items

---

## Download PDF

- Button at bottom of sidebar
- `<a href="/assets/John_Tan_Resume_RN.pdf" download>` — no JS needed
- Styled: gold border, navy text, gold hover fill

---

## Responsive

- Desktop (≥1024px): sidebar visible, content area takes remaining width
- Tablet/Mobile (<1024px): sidebar collapses to a hamburger menu overlay; PrevNextBar remains visible
