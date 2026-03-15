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

NAME    = style('Name',    fontSize=22, textColor=FOREST, spaceAfter=2, fontName='Helvetica-Bold', alignment=TA_CENTER)
TITLE   = style('Title',   fontSize=11, textColor=CORAL,  spaceAfter=4, fontName='Helvetica-Bold', alignment=TA_CENTER)
CONTACT = style('Contact', fontSize=9,  textColor=GRAY,   spaceAfter=8, alignment=TA_CENTER)
SEC     = style('Sec',     fontSize=11, textColor=FOREST, spaceBefore=10, spaceAfter=3, fontName='Helvetica-Bold')
ROLE    = style('Role',    fontSize=10, textColor=BLACK,  spaceAfter=1, fontName='Helvetica-Bold')
CO      = style('Co',      fontSize=9,  textColor=GRAY,   spaceAfter=1)
BODY    = style('Body',    fontSize=8.5, textColor=BLACK, spaceAfter=4, leading=12)
BULL    = style('Bull',    fontSize=8.5, textColor=BLACK, spaceAfter=3, leading=11, leftIndent=10, bulletIndent=2)
NOTE    = style('Note',    fontSize=8,  textColor=GRAY,   spaceAfter=2, fontName='Helvetica-Oblique')

def hr():
    return HRFlowable(width='100%', thickness=0.5, color=FOREST, spaceAfter=4, spaceBefore=4)

story = []

# Header
story += [
    Paragraph("John Tan", NAME),
    Paragraph("Volunteer Management Executive | Digital Community Engagement", TITLE),
    Paragraph("vieming@gmail.com  \u00b7  +65 9889 1383  \u00b7  linkedin.com/in/john-tan-02763732  \u00b7  john-tan-automation-specialist.vercel.app", CONTACT),
    hr(),
]

# Summary
story += [
    Paragraph("PROFESSIONAL SUMMARY", SEC),
    Paragraph(
        "Purpose-driven professional making a deliberate career transition into volunteer management, "
        "bringing 6+ years of enterprise digital transformation experience \u2014 Google Workspace automation, "
        "multi-system integration, end-to-end programme management \u2014 directly to TOUCH\u2019s mandate of cultivating "
        "a centralised digital volunteer management system. Currently completing WSQ Diploma in Social Service "
        "(Tsao Foundation), with a dedicated Volunteer Programme Management module and 16-day fieldwork at an "
        "Active Ageing Centre. Combines rigorous stakeholder management and data analytics expertise (honed across "
        "finance, engineering and technology sectors) with genuine passion for community empowerment \u2014 uniquely "
        "positioned to support TOUCH\u2019s Head of Volunteer Management in advancing Vision 2030.",
        BODY),
]

# Competencies
story += [Paragraph("CORE COMPETENCIES", SEC)]
comps = [
    ("Stakeholder & People", [
        "Stakeholder Engagement & Partnership Building",
        "Volunteer Coordinator Training & Programme Support",
        "Cross-departmental Collaboration & Volunteer Sharing",
        "People Management & Negotiation",
    ]),
    ("Digital & Process", [
        "Digital Volunteer Management Systems Adoption",
        "Process Optimisation & Workflow Design",
        "Data Management, Analysis & Reporting",
        "Project & Event Coordination",
    ]),
    ("Social Service", [
        "Volunteer Risk Assessment & Governance",
        "Survey Analysis & Volunteer Upskilling",
        "Ethics, Social Policy & Legislation (WSQ)",
        "Service Recovery & Crisis Management",
    ]),
]
for cat, items in comps:
    story.append(Paragraph(f"<b>{cat}:</b>  " + "  \u00b7  ".join(items), BODY))

# Experience
story += [Paragraph("PROFESSIONAL EXPERIENCE", SEC)]

exp = [
    (
        "Digital Transformation Lead",
        "Cogent Holdings Pte Ltd",
        "2022 \u2013 Present",
        [
            "Digital System Rollout: Architected and led enterprise-wide adoption of centralised digital workflow systems across multiple departments, reducing manual coordination effort by 30% \u2014 directly applicable to TOUCH\u2019s mandate of cultivating a unified digital volunteer management platform across all service lines.",
            "Volunteer Coordinator Training Analogue: Designed comprehensive training materials and onboarding programmes adopted by 40+ team members, building the facilitation and instructional design skills needed to educate TOUCH Volunteer Coordinators on new systems, corporate vision, and volunteer engagement best practices.",
            "Cross-departmental Collaboration: Led structured cross-functional working groups to align process standards and enable resource sharing \u2014 mirroring TOUCH\u2019s requirement for cross-departmental volunteer sharing, retention, and collaboration to advance organisational goals.",
        ],
    ),
    (
        "Programme Manager (Process & Operations)",
        "ST Engineering",
        "2019 \u2013 2022",
        [
            "Programme Management: Managed 3 complete end-to-end programme cycles \u2014 from discovery and planning through execution, monitoring, and post-implementation review \u2014 demonstrating the project coordination rigour required to plan and execute TOUCH\u2019s volunteer appreciation events, training sessions, and Volunteer Coordinator meetings.",
            "Data Management & Reporting: Built and maintained reporting dashboards tracking KPIs across multiple operational units; directly maps to co-managing TOUCH\u2019s volunteer database, ensuring accurate records, collating engagement data, and submitting analytical reports to leadership.",
            "Process Documentation & Risk Assessment: Conducted systematic process audits and annual risk assessments, producing structured risk registers and remediation plans \u2014 directly applicable to TOUCH\u2019s requirement to conduct volunteer risk assessments annually across various services.",
        ],
    ),
    (
        "Director / Private Wealth Management",
        "ABN AMRO",
        "2017 \u2013 2019",
        [
            "Stakeholder Management & Budget Governance: Managed strategic relationships with 200+ high-net-worth clients and oversaw portfolio operations with strict budget accountability \u2014 satisfying TOUCH\u2019s requirement for 3+ years of experience in project, stakeholder, and budget management.",
            "Partnership & Community Engagement: Built strategic partnerships with external organisations, family offices, and government agencies \u2014 directly transferable to TOUCH\u2019s stakeholder engagement, partnership-building, and volunteer opportunity development mandate.",
            "People Management & Negotiation: Applied strong negotiation and interpersonal skills across cross-functional teams \u2014 the same empathic, collaborative approach John brings to engaging, retaining, and empowering TOUCH\u2019s volunteer ecosystem.",
        ],
    ),
]

for role_title, company, period, bullets in exp:
    story += [
        Paragraph(role_title, ROLE),
        Paragraph(f"{company}  |  {period}", CO),
    ]
    for b in bullets:
        story.append(Paragraph(f"\u2022 {b}", BULL))
    story.append(Spacer(1, 4))

# Education
story += [Paragraph("EDUCATION", SEC)]
edu = [
    (
        "WSQ Diploma in Social Service",
        "Tsao Foundation (Hua Mei Training Academy)",
        "2026 \u2013 Present",
        "Candidate for Graduation; SCTP Career Transition Programme",
        [
            "Key Modules: Volunteer Programme Management; Stakeholder Management; Ethics & Legislation; Social Policy Implementation; Financial Management",
            "Industrial Attachment: 16-day fieldwork with Active Ageing Centre \u2014 care coordination for vulnerable seniors, gaining firsthand understanding of volunteer-service user dynamics",
            "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service \u2014 supports TOUCH\u2019s digital transformation and community engagement roadmap",
        ],
    ),
    (
        "MBA",
        "Nanyang Technological University (NTU)",
        "2001 \u2013 2003",
        "Dean\u2019s Honors List \u2014 strategic management, stakeholder leadership, and organisational behaviour",
        None,
    ),
    (
        "Bachelor of Science in Mathematics",
        "National University of Singapore (NUS)",
        "1994",
        "Public Service Commission Scholarship",
        None,
    ),
]

for deg, inst, yr, note, details in edu:
    story += [
        Paragraph(f"<b>{deg}</b>  |  {inst}  |  {yr}", BODY),
        Paragraph(note, NOTE),
    ]
    if details:
        for d in details:
            story.append(Paragraph(f"\u2022 {d}", BULL))
    story.append(Spacer(1, 3))

# Certifications
story += [Paragraph("CERTIFICATIONS & PROFESSIONAL DEVELOPMENT", SEC)]
for cert in [
    "WSQ Volunteer Programme Management (Module \u2014 In Progress)  \u00b7  Tsao Foundation",
    "Microsoft Certified: Azure AI Engineer Associate  \u00b7  Microsoft",
    "Google Professional Machine Learning Engineer  \u00b7  Google",
]:
    story.append(Paragraph(f"\u2022 {cert}", BULL))

# Vision
story += [
    Paragraph("VISION FOR TOUCH", SEC),
    Paragraph(
        "<b>Centralised Digital Volunteer Ecosystem:</b> Champion adoption of TOUCH\u2019s unified volunteer "
        "management platform \u2014 streamlining recruitment, engagement, and retention across all service lines. "
        "<b>Data-Driven Engagement:</b> Build analytics pipelines from volunteer survey data to drive "
        "upskilling, appreciation, and retention decisions. "
        "<b>Community Partnership Network:</b> Develop structured pipelines with corporate, educational, and "
        "government institutions to expand TOUCH\u2019s volunteer base and advance Vision 2030.",
        BODY),
]

doc.build(story)
print(f"PDF generated: {OUTPUT}")
