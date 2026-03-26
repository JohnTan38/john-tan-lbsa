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
    heading: string
    sectionLabel: string
    sections: { title: string; body: string }[]
    closing: { title: string; body: string }
    searchText: string
  }
  stats: { value: string; label: string }[]
}
export const resume: ResumeData = {
  name: "John Tan",
  title: "Automation Specialist | Healthcare Digital Transformation",
  contact: {
    email: "vieming@gmail.com",
    linkedin: "linkedin.com/in/john-tan-02763732",
    website: "john-tan-automation-specialist.vercel.app",
    phone: "98891383",
  },
  summary: {
    tagline: "Enterprise RPA Architect | UiPath Developer | Healthcare Process Innovation",
    body: "Results-driven Automation Specialist with 3+ years of hands-on RPA experience designing, developing, and deploying end-to-end UiPath solutions that achieve 50%+ operational efficiency gains. Proficient in Google Apps Script, Python, JavaScript, C#, VBA, and PHP, with proven integration experience across Google Workspace, Google Cloud Platform, and enterprise finance systems. Currently deepening healthcare domain expertise through a WSQ Diploma in Social Service (Tsao Foundation), specialising in eldercare coordination — directly aligned with NTUC Health’s mission of enabling healthy and fulfilling years for Singapore’s seniors. Combines engineering rigour with stakeholder empathy to deliver automation that is not merely efficient, but human-centred.",
    searchText: "summary enterprise rpa architect uipath developer healthcare process innovation automation specialist 50% efficiency google workspace gcp python javascript c# vba php eldercare social service tsao foundation",
  },
  competencies: {
    leadership: [
      "UiPath RPA: Design, Development & Deployment",
      "UiPath Orchestrator: Scheduling, Monitoring & Troubleshooting",
      "Google Apps Script & Google Cloud Platform",
      "End-to-End Workflow Design & RPA SDLC",
    ],
    technical: [
      "Programming: Python · JavaScript · C# · VBA · PHP",
      "Database & Integration: SQL, Google Workspace, WordPress",
      "Systems Integration: Finance, Government & Vendor Portals",
      "Generative AI & LLM-Enhanced Automation",
    ],
    socialService: [
      "Healthcare Finance & Regulatory Compliance",
      "Government Portal Integration (MOH, SingStat)",
      "Process Documentation & End-User Training",
      "Stakeholder Management & Requirements Gathering",
    ],
    searchText: "competencies uipath rpa orchestrator google apps script gcp python javascript c# vba php sql wordpress systems integration finance government portal documentation training stakeholder management healthcare",
  },
  experience: [
    {
      id: "cogent",
      role: "Generative AI Engineer",
      company: "Cogent Holdings Pte Ltd",
      period: "2022 – Present",
      bullets: [
        "Process Automation: Architected Google Workspace automation workflows integrating Google Apps Script with GCP data pipelines, reducing manual effort by 30% — demonstrating the multi-system integration skills central to NTUC Health’s finance and portal automation needs.",
        "Multi-Language Scripting: Developed Python and JavaScript automation scripts for business process optimisation, extending beyond no-code tools to deliver bespoke automation solutions for complex, cross-functional workflows.",
        "Documentation & Training: Produced comprehensive user guides and process documentation that improved team onboarding by 40%; directly applicable to NTUC Health’s requirement for technical support and training on automated processes.",
      ],
      searchText: "generative ai engineer cogent holdings google workspace gcp python javascript automation workflows 30% user guides onboarding documentation training",
    },
    {
      id: "st-engineering",
      role: "Software Engineer (RPA Specialist)",
      company: "ST Engineering",
      period: "2019 – 2022",
      bullets: [
        "UiPath RPA Leadership: Led 3 complete end-to-end UiPath SDLC projects — from process discovery and design through development, testing, and deployment — achieving 50%+ operational efficiency gains across enterprise operations.",
        "Orchestrator Management: Administered UiPath Orchestrator for scheduling, monitoring, and troubleshooting of production automation workflows; ensured maximum uptime and rapid incident resolution for business-critical processes.",
        "Scripting & Debugging: Developed C#, Python, and VBA scripts to extend UiPath automation capabilities; debugged and optimised complex workflows to ensure optimal performance and 85%+ accuracy in automated outputs.",
      ],
      searchText: "software engineer rpa specialist st engineering uipath sdlc 50% efficiency orchestrator scheduling monitoring troubleshooting c# python vba debugging 85% accuracy",
    },
    {
      id: "abnamro",
      role: "Director / Private Wealth Management",
      company: "ABN AMRO",
      period: "2017 – 2019",
      bullets: [
        "Finance System Expertise: Managed $500M+ AUM through complex finance system workflows; applied rigorous data accuracy and regulatory compliance standards directly transferable to NTUC Health’s finance and government reporting processes.",
        "Government & Vendor Portal Integration: Orchestrated cross-system data flows integrating banking, regulatory, and government reporting portals — demonstrating the multi-portal integration experience required for NTUC Health’s automation landscape.",
        "Stakeholder Collaboration: Partnered with diverse cross-functional teams to analyse business processes, define requirements, and deliver compliant operational solutions — the same collaborative approach John will bring to NTUC Health’s care coordination teams.",
      ],
      searchText: "director private wealth management abn amro 500m aum finance system regulatory compliance government portal integration cross-system data flow stakeholder collaboration requirements",
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
          "Modules: Ethics & Legislation; Financial Management; Stakeholder Management; Social Policy Implementation; Volunteer Programme Management",
          "Industrial Attachment: 16-day fieldwork with Active Ageing Centre — care coordination for vulnerable seniors, directly relevant to NTUC Health’s eldercare services",
          "Specialisation: AI-driven outreach modalities and Decision Support System logic for social service management — aligns with NTUC Health’s digital transformation roadmap",
        ],
      },
      {
        degree: "MBA",
        institution: "Nanyang Technological University (NTU)",
        year: "2001 – 2003",
        note: "Dean’s Honors List — risk management and financial modelling",
      },
      {
        degree: "Bachelor of Science in Mathematics",
        institution: "National University of Singapore (NUS)",
        year: "1994",
        note: "Public Service Commission Scholarship",
      },
    ],
    searchText: "education wsq diploma social service tsao foundation hua mei eldercare active ageing mba ntu nanyang dean honors list bachelor mathematics nus public service commission scholarship financial management stakeholder",
  },
  certifications: {
    items: [
      "UiPath Advanced Developer Certification (In Progress)",
      "Microsoft Certified: Azure AI Engineer Associate",
      "Google Professional Machine Learning Engineer",
    ],
    searchText: "certifications uipath advanced developer microsoft azure ai engineer associate google professional machine learning engineer rpa",
  },
  vision: {
    heading: "A Vision for NTUC Health Digital Transformation",
    sectionLabel: "Automation Specialist: Intelligent Healthcare Process Innovation",
    sections: [
      {
        title: "Intelligent Care Coordination Automation",
        body: "Leverage AI-enhanced UiPath RPA to automate eldercare case management, appointment scheduling, and billing workflows across NTUC Health’s six service lines — Senior Day Care, Home Care, Nursing Home, Active Ageing, Rehabilitation, and Family Medicine — freeing care staff to focus entirely on resident wellbeing.",
      },
      {
        title: "Unified Healthcare Digital Ecosystem",
        body: "Design seamless integrations between NTUC Health’s finance systems, government portals (MOH, SingStat, CPF Board), and Google Cloud Platform — enabling real-time data flows, automated compliance reporting, and elimination of duplicate manual portal submissions.",
      },
      {
        title: "Predictive Workforce Automation",
        body: "Apply data analytics pipelines and automated reporting dashboards to enable proactive resource allocation across nursing home and home care operations — ensuring the right caregivers reach the right seniors at the right time, powered by data not instinct.",
      },
    ],
    closing: {
      title: "A Technology-Empathy Bridge for NTUC Health",
      body: "John’s rare combination of enterprise RPA engineering expertise (UiPath SDLC, Orchestrator, multi-language scripting) and current WSQ Diploma in Social Service (eldercare specialisation at Tsao Foundation) uniquely positions him to build automation that carries a dual mandate: operational excellence and compassionate care delivery. Every workflow he designs at NTUC Health will be engineered not just to save time — but to create more time for the human connections that define quality eldercare.",
    },
    searchText: "vision innovation intelligent care coordination automation uipath eldercare senior day care nursing home active ageing unified healthcare digital ecosystem government portals moh singstat cpf google cloud predictive workforce automation technology empathy ntuc health",
  },
  stats: [
    { value: '3+', label: 'Years RPA Experience' },
    { value: '50%+', label: 'Efficiency Gains' },
    { value: '5+', label: 'Languages Mastered' },
    { value: '3', label: 'Enterprise Integrations' },
  ],
}
