'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function CogentPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[0]} index={1} total={resumeData.experience.length} />
}
