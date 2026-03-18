from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY

output_path = r"C:\Users\admin\superpowers-automation\public\assets\John_Tan_Resume_LBSA.pdf"

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=18*mm,
    rightMargin=18*mm,
    topMargin=14*mm,
    bottomMargin=14*mm,
)

w, h = A4

NAVY = colors.HexColor("#0D47A1")
ACCENT = colors.HexColor("#1976D2")
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
story.append(Paragraph("Programme Executive | Active Ageing Centre | Social Service", TITLE_STYLE))
story.append(Paragraph(
    "vieming@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; 98891383 &nbsp;&nbsp;|&nbsp;&nbsp; linkedin.com/in/john-tan-02763732",
    CONTACT_STYLE))
story.append(Spacer(1, 4))
story.append(divider())

# Professional Summary
story += section_header("Professional Summary")
story.append(Paragraph(
    "Career-transition professional making a deliberate move into social service as Programme Executive "
    "at Lions Befrienders Service Association, leveraging enterprise-grade stakeholder management, "
    "programme coordination, and data analytics experience in direct service of LBSA's seniors. "
    "Currently completing WSQ Diploma in Social Service (Tsao Foundation / Hua Mei Training Academy, SCTP), "
    "with 16-day hands-on fieldwork at an Active Ageing Centre — including direct application of the "
    "Community Screener Tool, needs assessment, member tiering, and care coordination for vulnerable seniors. "
    "Brings Diploma-grounded understanding of the 5 dimensions of wellbeing, volunteer management principles, "
    "and community outreach strategy, combined with 6+ years of cross-sector experience in stakeholder "
    "engagement, programme management, and budget governance. Ready to contribute meaningfully to LBSA's "
    "mission of befriending and empowering Singapore's seniors to age actively and gracefully.",
    BODY_STYLE))

# Key Competencies
story += section_header("Key Competencies")

comp_cell_style = ParagraphStyle("CompCell",
    fontName="Helvetica", fontSize=8.2, textColor=TEXT, leading=11.5)

comp_data = [
    ["Community Outreach & Member Recruitment\n(Community Screener Tool)",
     "Programme Planning, Implementation\n& Evaluation",
     "5 Dimensions of Wellbeing\n(Active Ageing Framework)"],
    ["Stakeholder Engagement &\nPartnership Building",
     "Data Collection, Analysis & Reporting",
     "Ethics, Legislation & Social Policy (WSQ)"],
    ["Volunteer Coordination & Support",
     "Budget Management &\nFinancial Documentation",
     "Eldercare Coordination &\nBefriending Principles"],
    ["Needs Assessment & Senior Member Tiering",
     "Microsoft Office & Digital Programme Tools", ""],
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
            "<b>Community Outreach Execution:</b> Led structured outreach campaigns engaging 50+ external partners and stakeholders across multiple communities - directly applicable to executing LBSA's Community Outreach Plan, engaging community partners, and advocating for seniors' needs to external stakeholders while championing LBSA's mission and values.",
            "<b>Stakeholder Relationship Management:</b> Built and sustained strategic relationships with 30+ corporate and institutional partners, aligning shared objectives to create lasting community impact - mirrors LBSA's requirement to build effective and sustainable partnerships that directly serve the wellbeing and quality of life of seniors.",
            "<b>Programme Coordination & Evaluation:</b> Designed, implemented, and evaluated multi-stakeholder programmes with structured feedback loops and data collection, achieving 30% improvement in community engagement - demonstrating the programme planning, implementation, and evaluation skills central to LBSA's AAC operations across the 5 dimensions of wellbeing.",
        ]
    },
    {
        "role": "Programme Coordinator (Planning & Evaluation)",
        "company": "ST Engineering | 2019 - 2022",
        "bullets": [
            "<b>Programme Planning & Delivery:</b> Coordinated 3 complete end-to-end programme cycles - from needs identification and design through implementation, monitoring, and post-programme evaluation - directly applicable to LBSA's requirement to plan, implement, and evaluate AAC activities ensuring ongoing relevance to seniors across the 5 dimensions of wellbeing.",
            "<b>Data Collection & Reporting:</b> Built structured data collection systems and evaluation frameworks tracking programme KPIs across multiple operational units - maps directly to LBSA's need for regular data collection, programme evaluation, and sharing of senior observation insights with Senior Programme Executive / Befriending Executive.",
            "<b>Budget Documentation & Compliance:</b> Maintained meticulous financial records for programme budgets, ensuring full documentation of all expenditures and strict adherence to allocated budgets - aligns directly with LBSA's financial reporting requirement for proper documentation of finance-related transactions.",
        ]
    },
    {
        "role": "Director / Stakeholder & Relationship Management",
        "company": "ABN AMRO | 2017 - 2019",
        "bullets": [
            "<b>Senior Stakeholder Management:</b> Managed strategic relationships with 200+ clients and institutional counterparties, advocating for their needs and building sustainable long-term partnerships - directly transferable to LBSA's requirement to engage community partners, advocate seniors' needs to external stakeholders, and build relationships that serve vulnerable populations.",
            "<b>Community Engagement & Partnership Analogue:</b> Partnered with diverse cross-functional teams and external organisations to deliver community-centred solutions, applying strong interpersonal skills and empathic communication - the same people-first, collaborative approach John brings to engaging LBSA's seniors, volunteers, and community partners.",
            "<b>Needs Assessment & Member Tiering Analogue:</b> Applied rigorous client assessment frameworks to understand unique client needs, segment profiles by risk and complexity, and tailor service delivery accordingly - directly applicable to using the Community Screener Tool to assess new senior members, tier them by care needs, and ensure appropriate programme placement.",
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
            "Industrial Attachment: 16-day hands-on fieldwork at Active Ageing Centre - applied Community Screener Tool for new member intake, conducted needs assessments, tiered seniors by care complexity, and supported care coordination for vulnerable seniors; direct on-the-ground AAC operational experience",
            "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management",
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
