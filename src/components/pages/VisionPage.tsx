'use client'

import { useRole } from '@/lib/roleContext'
import styles from './VisionPage.module.css'

export default function VisionPage() {
  const { resumeData } = useRole()
  const heading = resumeData.vision.heading
  const section = resumeData.vision.sectionLabel

  return (
    <div className={styles.page}>
      <div className={styles.section}>{section}</div>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.cards}>
        {resumeData.vision.sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTitle}>{s.title}</div>
            <div className={styles.cardBody}>{s.body}</div>
          </div>
        ))}
      </div>
      <div className={styles.closing}>
        <div className={styles.closingTitle}>{resumeData.vision.closing.title}</div>
        <p className={styles.closingBody}>{resumeData.vision.closing.body}</p>
      </div>
    </div>
  )
}
