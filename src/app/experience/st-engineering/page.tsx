import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function StEngineeringPage() {
  const total = resume.experience.length
  return <ExperiencePage entry={resume.experience[1]} index={2} total={total} />
}
