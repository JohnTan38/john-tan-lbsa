'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function STEngineeringPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[1]} index={2} total={resumeData.experience.length} />
}
