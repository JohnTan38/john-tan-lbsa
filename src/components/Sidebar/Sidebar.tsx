'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { PAGES, searchSections, getPageIndex } from '@/lib/navigation'
import NavItem from '@/components/NavItem/NavItem'
import SearchBox from '@/components/SearchBox/SearchBox'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  const visiblePages = useMemo(() => searchSections(query), [query])
  const currentIndex = getPageIndex(pathname)

  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Resume navigation">
      <div className={styles.header}>
        <div className={styles.monogram}>JT</div>
        <div className={styles.name}>John Tan</div>
        <div className={styles.subtitle}>Center Manager · RN</div>
      </div>

      <div className={styles.searchSection}>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      <nav className={styles.nav}>
        {visiblePages.map(page => (
          <NavItem key={page.path} page={page} currentPath={pathname} />
        ))}
        {visiblePages.length === 0 && (
          <div style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            No sections found
          </div>
        )}
      </nav>

      {currentIndex >= 0 && (
        <div className={styles.pageCount}>
          {currentIndex + 1} / {PAGES.length}
        </div>
      )}

      <div className={styles.downloadSection}>
        <a
          href="/assets/John_Tan_Resume_RN.pdf"
          download="John_Tan_Resume_RN.pdf"
          className={styles.downloadBtn}
        >
          ⬇ Download PDF
        </a>
      </div>
    </aside>
  )
}
