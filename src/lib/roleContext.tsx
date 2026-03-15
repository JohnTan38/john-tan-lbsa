'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resume } from '@/data/resume'
import { resumeTOUCH } from '@/data/resumeTOUCH'

export type Role = 'touch' | 'automation'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'touch',
  resumeData: resumeTOUCH,
  switcherHref: () => '/',
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('touch')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'automation' ? 'automation' : 'touch')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'automation' ? resume : resumeTOUCH

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'touch' ? 'automation' : 'touch'
    if (targetRole === 'touch') return currentPath
    return `${currentPath}?role=${targetRole}`
  }, [role])

  return (
    <RoleContext.Provider value={{ role, resumeData, switcherHref }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
