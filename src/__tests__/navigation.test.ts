import {
  PAGES,
  getPageIndex,
  getAdjacentPages,
  searchSections,
  getSearchPages,
} from '@/lib/navigation'
import { resume } from '@/data/resume'
import { resumeTOUCH } from '@/data/resumeTOUCH'

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

  it('finds summary page for "uipath"', () => {
    const results = searchSections('uipath')
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
    const lower = searchSections('azure')
    const upper = searchSections('AZURE')
    expect(lower).toEqual(upper)
  })
})

describe('getSearchPages', () => {
  it('returns 9 pages for automation resume', () => {
    expect(getSearchPages(resume)).toHaveLength(9)
  })

  it('returns 9 pages for TOUCH resume', () => {
    expect(getSearchPages(resumeTOUCH)).toHaveLength(9)
  })

  it('automation pages contain uipath in summary searchText', () => {
    const pages = getSearchPages(resume)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('uipath')
  })

  it('TOUCH pages contain volunteer in summary searchText', () => {
    const pages = getSearchPages(resumeTOUCH)
    const summary = pages.find(p => p.path === '/summary')!
    expect(summary.searchText.toLowerCase()).toContain('volunteer')
  })

  it('first page is / for both roles', () => {
    expect(getSearchPages(resume)[0].path).toBe('/')
    expect(getSearchPages(resumeTOUCH)[0].path).toBe('/')
  })

  it('last page is /vision for both roles', () => {
    const autoPages = getSearchPages(resume)
    const touchPages = getSearchPages(resumeTOUCH)
    expect(autoPages[autoPages.length - 1].path).toBe('/vision')
    expect(touchPages[touchPages.length - 1].path).toBe('/vision')
  })
})
