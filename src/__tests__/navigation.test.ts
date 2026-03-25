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
