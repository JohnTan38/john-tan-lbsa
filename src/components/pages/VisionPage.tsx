'use client'

import { useRole } from '@/lib/roleContext'
import styles from './VisionPage.module.css'

export default function VisionPage() {
  const { resumeData, role } = useRole()
  const heading = role === 'lbsa'
    ? 'A Vision for TOUCH Community Empowerment'
    : 'A Vision for NTUC Health Digital Transformation'
  const section = role === 'lbsa'
    ? 'Volunteer Management Executive: Community & Digital Innovation'
    : 'Automation Specialist: Intelligent Healthcare Process Innovation'

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
