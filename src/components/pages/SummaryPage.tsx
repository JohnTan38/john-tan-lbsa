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
          <div className={styles.statValue}>20+</div>
          <div className={styles.statLabel}>Years Experience</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>$500M+</div>
          <div className={styles.statLabel}>AUM Managed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>50%</div>
          <div className={styles.statLabel}>Productivity Gains</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>3</div>
          <div className={styles.statLabel}>Career Domains</div>
        </div>
      </div>
    </div>
  )
}
