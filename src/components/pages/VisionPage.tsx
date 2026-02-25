import { resume } from '@/data/resume'
import styles from './VisionPage.module.css'

export default function VisionPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Center Manager: Resident-Centric Innovation</div>
      <h2 className={styles.heading}>A Vision for Community Excellence</h2>
      <div className={styles.cards}>
        {resume.vision.sections.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTitle}>{s.title}</div>
            <div className={styles.cardBody}>{s.body}</div>
          </div>
        ))}
      </div>
      <div className={styles.closing}>
        <div className={styles.closingTitle}>{resume.vision.closing.title}</div>
        <p className={styles.closingBody}>{resume.vision.closing.body}</p>
      </div>
    </div>
  )
}
