import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function AbnAmroPage() {
  return <ExperiencePage entry={resume.experience[2]} index={3} total={3} />
}
