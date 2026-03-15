'use client'

import { useRole } from '@/lib/roleContext'
import styles from './CompetenciesPage.module.css'

export default function CompetenciesPage() {
  const { resumeData, role } = useRole()
  const { leadership, technical, socialService } = resumeData.competencies

  const titles = role === 'touch'
    ? ['Stakeholder & People', 'Digital & Process', 'Social Service']
    : ['RPA & Automation', 'Programming & Integration', 'Domain Knowledge']

  return (
    <div className={styles.page}>
      <div className={styles.section}>Core Competencies</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[0]}</div>
          <ul className={styles.items}>
            {leadership.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[1]}</div>
          <ul className={styles.items}>
            {technical.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>{titles[2]}</div>
          <ul className={styles.items}>
            {socialService.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
