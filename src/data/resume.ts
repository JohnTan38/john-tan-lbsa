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