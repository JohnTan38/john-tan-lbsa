'use client'

import { resume } from '@/data/resume'
import { useSearch } from '@/lib/searchContext'
import { highlightText } from '@/lib/highlight'
import styles from './SummaryPage.module.css'

export default function SummaryPage() {
  const { query } = useSearch()

  return (
    <div className={styles.page}>
      <div className={styles.section}>Professional Summary</div>
      <blockquote className={styles.tagline}>
        {highlightText(resume.summary.tagline, query)}
      </blockquote>
      <p className={styles.body}>{highlightText(resume.summary.body, query)}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>3+</div>
          <div className={styles.statLabel}>Years RPA Experience</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>50%+</div>
          <div className={styles.statLabel}>Efficiency Gains</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>5+</div>
          <div className={styles.statLabel}>Languages Mastered</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>3</div>
          <div className={styles.statLabel}>Enterprise Integrations</div>
        </div>
      </div>
    </div>
  )
}
