import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function AbnAmroPage() {
  const total = resume.experience.length
  return <ExperiencePage entry={resume.experience[2]} index={3} total={total} />
}
