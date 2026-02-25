import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function CogentPage() {
  const total = resume.experience.length
  return <ExperiencePage entry={resume.experience[0]} index={1} total={total} />
}
