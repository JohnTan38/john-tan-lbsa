'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAdjacentPages, getPageIndex, PAGES } from '@/lib/navigation'
import { useDirection } from '@/lib/directionContext'
import styles from './PrevNextBar.module.css'

export default function PrevNextBar() {
  const pathname = usePathname()
  const { setDirection } = useDirection()
  const { prev, next } = getAdjacentPages(pathname)
  const currentIndex = getPageIndex(pathname)

  return (
    <div className={styles.bar} role="navigation" aria-label="Page navigation">
      {prev ? (
        <Link
          href={prev.path}
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => setDirection(-1)}
          aria-label={`Previous: ${prev.label}`}
        >
          ← {prev.label}
        </Link>
      ) : (
        <div className={`${styles.navBtn} ${styles.hidden}`} />
      )}

      <div className={styles.center}>
        <div className={styles.dots} aria-hidden="true">
          {PAGES.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>
        <span className={styles.label}>
          {currentIndex + 1} of {PAGES.length}
        </span>
      </div>

      {next ? (
        <Link
          href={next.path}
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => setDirection(1)}
          aria-label={`Next: ${next.label}`}
        >
          {next.label} →
        </Link>
      ) : (
        <div className={`${styles.navBtn} ${styles.hidden}`} />
      )}
    </div>
  )
}
