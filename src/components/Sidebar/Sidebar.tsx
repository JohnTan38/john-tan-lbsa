'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { searchSections } from '@/lib/navigation'
import { useSearch } from '@/lib/searchContext'
import NavItem from '@/components/NavItem/NavItem'
import SearchBox from '@/components/SearchBox/SearchBox'
import styles from './Sidebar.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname()
  const { query, setQuery } = useSearch()

  const visiblePages = useMemo(() => searchSections(query), [query])

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      role="navigation"
      aria-label="Resume navigation"
    >
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
          <NavItem key={page.path} page={page} currentPath={pathname} onNavigate={onClose} />
        ))}
        {visiblePages.length === 0 && (
          <div style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            No sections found
          </div>
        )}
      </nav>

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
