# CLAUDE.md — John Tan Resume App

## Project Purpose

Interactive Next.js resume web app for John Tan, supporting two tailored role variants:
- **LBSA** (default): Programme Executive at Lions Befrienders Service Association — Active Ageing Centre
- **Automation**: Automation Specialist / RPA Engineer (NTUC Health target)

## Architecture

### Dual-Role System
Role is determined by the `?role=` URL query param:
- No param / `?role=thk` → THK Programme Executive (default)
- `?role=lbsa` → LBSA Programme Executive

`src/lib/roleContext.tsx` reads the param on mount, sets `data-role` on `<html>`, and provides `resumeData` + `switcherHref` to all components via React context.

### Data Files
- `src/data/resumeTHK.ts` — THK Programme Executive resume data (Thye Hua Kwan target, default)
- `src/data/resumeLBSA.ts` — LBSA Programme Executive resume data (Lions Befrienders target)
- `src/data/resume.ts` — Automation Specialist resume data (NTUC Health, archived — not surfaced in UI)

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
- `John_Tan_Resume_THK.pdf` — served when `role === 'thk'` (default)
- `John_Tan_Resume_LBSA.pdf` — served when `role === 'lbsa'`

The sidebar Download button serves the correct PDF per role.
The `/download/resume` API route serves only the Automation PDF (direct API download).

To regenerate the LBSA PDF: `python scripts/generate_lbsa_pdf.py`

## LBSA Role Context

Target: **Programme Executive, Active Ageing Centre — Lions Befrienders Service Association (LBSA)**

Key JD requirements addressed in `resumeLBSA.ts`:
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
- Volunteer Programme Management module

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm test         # run Jest tests
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
python scripts/generate_lbsa_pdf.py  # regenerate LBSA PDF
python scripts/generate_thk_pdf.py   # regenerate THK PDF
```

## Tests

- `src/__tests__/navigation.test.ts` — tests for PAGES, getPageIndex, getAdjacentPages, searchSections, getSearchPages (covers both resume + resumeLBSA)
- `src/__tests__/resume-download-route.test.ts` — tests the /download/resume API route

## Retired
- `resumeTOUCH.ts` (TOUCH Volunteer Management role) — removed March 2026; replaced by LBSA
- `resume.ts` role (Automation Specialist) — retired March 2026; THK replaced as default role; data file kept on disk as archive
