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
