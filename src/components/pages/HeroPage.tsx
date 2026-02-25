import { resume } from '@/data/resume'
import styles from './HeroPage.module.css'

export default function HeroPage() {
  return (
    <div className={styles.page}>
      <div className={styles.monogram}>JT</div>
      <h1 className={styles.name}>{resume.name}</h1>
      <p className={styles.title}>{resume.title}</p>
      <div className={styles.divider} />
      <div className={styles.contacts}>
        <a
          href={`mailto:${resume.contact.email}`}
          className={styles.contactItem}
        >
          ✉ {resume.contact.email}
        </a>
        <a
          href={`https://${resume.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🔗 LinkedIn
        </a>
        <a
          href={`https://${resume.contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🌐 {resume.contact.website}
        </a>
        <a
          href={`tel:${resume.contact.phone}`}
          className={styles.contactItem}
        >
          📞 {resume.contact.phone}
        </a>
      </div>
      <p className={styles.tagline}>20+ Years · Finance · Tech · Community</p>
    </div>
  )
}
