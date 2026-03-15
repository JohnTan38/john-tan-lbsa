'use client'

import { useRole } from '@/lib/roleContext'
import { useSearch } from '@/lib/searchContext'
import { highlightText } from '@/lib/highlight'
import styles from './SummaryPage.module.css'

export default function SummaryPage() {
  const { query } = useSearch()
  const { resumeData } = useRole()

  return (
    <div className={styles.page}>
      <div className={styles.section}>Professional Summary</div>
      <blockquote className={styles.tagline}>
        {highlightText(resumeData.summary.tagline, query)}
      </blockquote>
      <p className={styles.body}>{highlightText(resumeData.summary.body, query)}</p>
      <div className={styles.stats}>
        {resumeData.stats.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
