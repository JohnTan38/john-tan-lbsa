# LBSA Programme Executive Role — Design Document

**Date:** 2026-03-18
**Status:** Approved
**Approach:** A — In-place TOUCH → LBSA rename

---

## Goal

Replace the retired TOUCH (Volunteer Management) role with a new **LBSA Programme Executive** role targeting the Lions Befrienders Service Association (LBSA) Programme Executive (Active Ageing Centre) position. The switcher becomes LBSA ↔ Automation Specialist.

---

## Role & JD Context

**Target role:** Programme Executive, Active Ageing Centre — Lions Befrienders Service Association
**Key responsibilities:**
- Community Outreach — execute Community Outreach Plan
- Relationship Management — community partners, seniors, external stakeholders
- Member Recruitment — Community Screener Tool, tiering new members
- Volunteer Management — identify, engage, support volunteers
- Programmes & Activities — data collection, planning, implementation, evaluation against 5 dimensions of wellbeing
- Financial Reporting — budget adherence, documentation

**ATS keywords:** Active Ageing Centre, AAC, community outreach, member recruitment, volunteer management, programme evaluation, 5 dimensions of wellbeing, Community Screener Tool, eldercare, stakeholder engagement, Lions Befrienders, LBSA, social service, WSQ Diploma in Social Service, SCTP, Tsao Foundation, needs assessment, befriending, care coordination, senior wellbeing, programme executive.

---

## Data Layer (`resumeLBSA.ts`)

**Replaces:** `resumeTOUCH.ts`
**Role type value:** `'lbsa'`

### Title
`"Programme Executive | Active Ageing Centre | Social Service"`

### Stats
| Value | Label |
|---|---|
| 16 | Days AAC Fieldwork |
| 3+ | Years Stakeholder Management |
| 200+ | Community Partners Managed |
| 5 | Dimensions of Wellbeing |

### Experience reframes
| Company | Old title (TOUCH) | New title (LBSA) |
|---|---|---|
| Cogent Holdings | Digital Transformation Lead | Community Outreach & Stakeholder Engagement Lead |
| ST Engineering | Programme Manager (Process & Operations) | Programme Coordinator (Planning & Evaluation) |
| ABN AMRO | Director / Private Wealth Management | Director / Stakeholder & Relationship Management |

### Competencies
- **Leadership:** Community Outreach & Engagement, Stakeholder & Partnership Management, Volunteer Coordination & Support, Member Recruitment & Needs Assessment
- **Technical:** Programme Planning & Evaluation, Data Collection & Reporting, Budget Management & Documentation, Microsoft Office & Digital Tools
- **Social Service:** 5 Dimensions of Wellbeing (Active Ageing), Community Screener Tool, Ethics & Social Policy (WSQ), Eldercare Coordination & Befriending

### Education
Same entries as TOUCH — fieldwork bullet upgraded to emphasise:
- 16-day AAC fieldwork
- Community Screener Tool hands-on usage
- Tiering new members
- Needs assessment for vulnerable seniors
- Care coordination

### Vision (3 pillars)
1. **Inclusive AAC Programming** — data-driven programme design across 5 dimensions of wellbeing
2. **Community Partnership Networks** — corporate/institutional/government partnerships to serve seniors
3. **Digital-Enhanced Senior Wellbeing** — technology tools to support outreach, tracking, and engagement

Closing: "Technology + Compassion for Lions Befrienders' seniors"

---

## Theme (`globals.css`)

```css
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

White/light background, light-to-medium blue gradients — Lion Befrienders corporate palette.

---

## Architecture Changes

| File | Change |
|---|---|
| `src/data/resumeTOUCH.ts` | Delete; replace with `src/data/resumeLBSA.ts` |
| `src/lib/roleContext.tsx` | `Role` type `'touch'` → `'lbsa'`; default `'lbsa'`; import updated |
| `src/components/Sidebar/Sidebar.tsx` | `isTOUCH` → `isLBSA`; PDF href/filename; labels updated |
| `src/app/globals.css` | `[data-role="touch"]` → `[data-role="lbsa"]`; colors updated |
| `public/assets/` | Add `John_Tan_Resume_LBSA.pdf`; remove `John_Tan_Resume_TOUCH.pdf` |
| `src/__tests__/` | Update role references `touch` → `lbsa` |
| `CLAUDE.md` | New — documents dual-role architecture, LBSA context, PDF workflow |

**No new routes, pages, or components.**

---

## PDF

- Static file: `public/assets/John_Tan_Resume_LBSA.pdf`
- Generated via script (same pattern as existing TOUCH PDF script)
- ATS-clean formatting, mirrors `resumeLBSA.ts` content
- Sidebar download button serves this file when `role === 'lbsa'`

---

## Testing

- Update `src/__tests__/resume-download-route.test.ts` — any TOUCH role refs → LBSA
- Update `src/__tests__/navigation.test.ts` — verify role switching LBSA ↔ Automation
- ESLint + TypeScript compile must pass clean

---

## Success Criteria

1. `?role=lbsa` (default) renders LBSA content with LB blue theme
2. `?role=automation` renders Automation content with navy/gold theme
3. Switcher in sidebar correctly toggles between the two
4. Download PDF button serves correct PDF per role
5. All existing tests pass; TypeScript and ESLint clean
6. CLAUDE.md documents the architecture
