'use client'

import { useRole } from '@/lib/roleContext'
import styles from './HeroPage.module.css'

export default function HeroPage() {
  const { resumeData } = useRole()
  const tagline = resumeData.summary.tagline

  return (
    <div className={styles.page}>
      <div className={styles.monogram}>JT</div>
      <h1 className={styles.name}>{resumeData.name}</h1>
      <p className={styles.title}>{resumeData.title}</p>
      <div className={styles.divider} />
      <div className={styles.contacts}>
        <a href={`mailto:${resumeData.contact.email}`} className={styles.contactItem}>
          ✉ {resumeData.contact.email}
        </a>
        <a
          href={`https://${resumeData.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🔗 LinkedIn
        </a>
        <a
          href={`https://${resumeData.contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          🌐 {resumeData.contact.website}
        </a>
        <a href={`tel:${resumeData.contact.phone}`} className={styles.contactItem}>
          📞 {resumeData.contact.phone}
        </a>
      </div>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  )
}
