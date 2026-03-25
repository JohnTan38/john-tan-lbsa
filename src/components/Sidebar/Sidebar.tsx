'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { getSearchPages, searchSections } from '@/lib/navigation'
import { useSearch } from '@/lib/searchContext'
import { useRole } from '@/lib/roleContext'
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
  const { role, resumeData, switcherHref } = useRole()

  const pages = useMemo(() => getSearchPages(resumeData), [resumeData])
  const visiblePages = useMemo(() => searchSections(query, pages), [query, pages])

  const isTHK = role === 'thk'
  const pdfHref = isTHK
    ? '/assets/John_Tan_Resume_THK.pdf'
    : '/assets/John_Tan_Resume_LBSA.pdf'
  const pdfFilename = isTHK
    ? 'John_Tan_Resume_THK.pdf'
    : 'John_Tan_Resume_LBSA.pdf'
  const switchLabel = isTHK
    ? 'Switch: LBSA Programme Executive →'
    : 'Switch: THK Programme Executive →'
  const roleLabel = isTHK ? 'THK' : 'LBSA'

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      role="navigation"
      aria-label="Resume navigation"
    >
      <div className={styles.header}>
        <div className={styles.monogram}>JT</div>
        <div className={styles.name}>{resumeData.name}</div>
        <div className={styles.subtitle}>
          {isTHK ? 'Programme Executive · THKMC' : 'Programme Executive · LBSA'}
        </div>
        <div className={styles.roleBadge}>
          <span className={styles.roleDot}>●</span> {roleLabel}
        </div>
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
          href={pdfHref}
          download={pdfFilename}
          className={styles.downloadBtn}
        >
          ⬇ Download PDF
        </a>
        <a
          href={switcherHref(pathname)}
          className={styles.switcherLink}
        >
          {switchLabel}
        </a>
      </div>
    </aside>
  )
}
