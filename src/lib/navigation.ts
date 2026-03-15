import { resume } from '@/data/resume'
import type { ResumeData } from '@/data/resume'

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
    label: 'Cogent — GenAI Eng',
    icon: '🤖',
    searchText: resume.experience[0].searchText,
  },
  {
    path: '/experience/st-engineering',
    label: 'ST Eng — RPA Spec',
    icon: '⚙️',
    searchText: resume.experience[1].searchText,
  },
  {
    path: '/experience/abnamro',
    label: 'ABN AMRO — Finance',
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

export function getSearchPages(resumeData: ResumeData): PageMeta[] {
  return [
    {
      path: '/',
      label: 'Home',
      icon: '🏠',
      searchText: `${resumeData.name} ${resumeData.title} ${Object.values(resumeData.contact).join(' ')}`,
    },
    {
      path: '/summary',
      label: 'Summary',
      icon: '📝',
      searchText: resumeData.summary.searchText,
    },
    {
      path: '/competencies',
      label: 'Competencies',
      icon: '⭐',
      searchText: resumeData.competencies.searchText,
    },
    {
      path: '/experience/cogent',
      label: 'Cogent',
      icon: '🤝',
      searchText: resumeData.experience[0].searchText,
    },
    {
      path: '/experience/st-engineering',
      label: 'ST Engineering',
      icon: '⚙️',
      searchText: resumeData.experience[1].searchText,
    },
    {
      path: '/experience/abnamro',
      label: 'ABN AMRO',
      icon: '💼',
      searchText: resumeData.experience[2].searchText,
    },
    {
      path: '/education',
      label: 'Education',
      icon: '🎓',
      searchText: resumeData.education.searchText,
    },
    {
      path: '/certifications',
      label: 'Certifications',
      icon: '🏅',
      searchText: resumeData.certifications.searchText,
    },
    {
      path: '/vision',
      label: 'Vision',
      icon: '💡',
      searchText: resumeData.vision.searchText,
    },
  ]
}

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

export function searchSections(query: string, pages: PageMeta[] = PAGES): PageMeta[] {
  if (!query.trim()) return pages
  const q = query.toLowerCase()
  return pages.filter(p => p.searchText.toLowerCase().includes(q))
}
