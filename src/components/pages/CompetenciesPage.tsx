import { resume } from '@/data/resume'
import styles from './CompetenciesPage.module.css'

export default function CompetenciesPage() {
  const { leadership, technical, socialService } = resume.competencies
  return (
    <div className={styles.page}>
      <div className={styles.section}>Core Competencies</div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Leadership & Management</div>
          <ul className={styles.items}>
            {leadership.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Technical & Analytical</div>
          <ul className={styles.items}>
            {technical.map((item, i) => (
              <li key={i} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Social Service Domain</div>
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
