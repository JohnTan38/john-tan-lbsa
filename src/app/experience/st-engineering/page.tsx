import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function StEngineeringPage() {
  return <ExperiencePage entry={resume.experience[1]} index={2} total={3} />
}
