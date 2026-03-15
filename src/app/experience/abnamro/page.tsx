'use client'

import ExperiencePage from '@/components/pages/ExperiencePage'
import { useRole } from '@/lib/roleContext'

export default function ABNAMROPage() {
  const { resumeData } = useRole()
  return <ExperiencePage entry={resumeData.experience[2]} index={3} total={resumeData.experience.length} />
}
