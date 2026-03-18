'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resume } from '@/data/resume'
import { resumeLBSA } from '@/data/resumeLBSA'

export type Role = 'lbsa' | 'automation'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'lbsa',
  resumeData: resumeLBSA,
  switcherHref: (path) => path,
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('lbsa')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'automation' ? 'automation' : 'lbsa')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'automation' ? resume : resumeLBSA

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'lbsa' ? 'automation' : 'lbsa'
    if (targetRole === 'lbsa') return currentPath
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
