import ExperiencePage from '@/components/pages/ExperiencePage'
import { resume } from '@/data/resume'

export default function CogentPage() {
  return <ExperiencePage entry={resume.experience[0]} index={1} total={3} />
}
