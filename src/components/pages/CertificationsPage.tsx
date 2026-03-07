import { resume } from '@/data/resume'
import styles from './CertificationsPage.module.css'

const CERT_META: Record<string, { icon: string; issuer: string }> = {
  'UiPath Advanced Developer Certification (In Progress)': { icon: '🤖', issuer: 'UiPath' },
  'Microsoft Certified: Azure AI Engineer Associate': { icon: '☁️', issuer: 'Microsoft' },
  'Google Professional Machine Learning Engineer': { icon: '🔬', issuer: 'Google' },
}

export default function CertificationsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>Certifications & Professional Development</div>
      <div className={styles.grid}>
        {resume.certifications.items.map((cert, i) => {
          const meta = CERT_META[cert] ?? { icon: '🏅', issuer: 'Professional' }
          return (
            <div key={i} className={styles.card}>
              <div className={styles.badge}>{meta.icon}</div>
              <div>
                <div className={styles.certName}>{cert}</div>
                <div className={styles.issuer}>{meta.issuer}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
