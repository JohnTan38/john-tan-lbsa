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

  const isTOUCH = role === 'touch'
  const pdfHref = isTOUCH
    ? '/assets/John_Tan_Resume_TOUCH.pdf'
    : '/assets/John_Tan_Resume_Automation.pdf'
  const pdfFilename = isTOUCH
    ? 'John_Tan_Resume_TOUCH.pdf'
    : 'John_Tan_Resume_Automation.pdf'
  const switchLabel = isTOUCH
    ? 'Switch: Automation Specialist →'
    : 'Switch: Volunteer Mgmt Exec →'
  const roleLabel = isTOUCH ? 'TOUCH' : 'NTUC Health'

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
          {isTOUCH ? 'Volunteer Management · TOUCH' : 'Automation Specialist · NTUC Health'}
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
