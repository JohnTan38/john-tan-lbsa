'use client'

import { useRole } from '@/lib/roleContext'
import styles from './EducationPage.module.css'

export default function EducationPage() {
  const { resumeData } = useRole()
  return (
    <div className={styles.page}>
      <div className={styles.section}>Educational Excellence & Professional Pivot</div>
      <div className={styles.timeline}>
        {resumeData.education.entries.map((entry, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.year}>{entry.year}</div>
            <div className={styles.degree}>{entry.degree}</div>
            <div className={styles.institution}>{entry.institution}</div>
            {entry.note && <div className={styles.note}>{entry.note}</div>}
            {entry.details && (
              <ul className={styles.details}>
                {entry.details.map((d, j) => (
                  <li key={j} className={styles.detail}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
