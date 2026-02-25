import type { ExperienceEntry } from '@/data/resume'
import styles from './ExperiencePage.module.css'

interface Props {
  entry: ExperienceEntry
  index: number
  total: number
}

export default function ExperiencePage({ entry, index, total }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.section}>
        Professional Experience · {index} of {total}
      </div>
      <h1 className={styles.role}>{entry.role}</h1>
      <div className={styles.company}>{entry.company}</div>
      <div className={styles.period}>{entry.period}</div>
      <div className={styles.divider} />
      <ul className={styles.bullets}>
        {entry.bullets.map((bullet, i) => {
          const colonIdx = bullet.indexOf(':')
          const title = colonIdx > 0 ? bullet.slice(0, colonIdx) : null
          const body = colonIdx > 0 ? bullet.slice(colonIdx + 1).trim() : bullet
          return (
            <li key={i} className={styles.bullet}>
              <span>
                {title && <span className={styles.bulletTitle}>{title}: </span>}
                {body}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
