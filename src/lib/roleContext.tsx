'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ResumeData } from '@/data/resume'
import { resumeTHK } from '@/data/resumeTHK'
import { resumeLBSA } from '@/data/resumeLBSA'

export type Role = 'thk' | 'lbsa'

interface RoleContextValue {
  role: Role
  resumeData: ResumeData
  switcherHref: (currentPath: string) => string
}

const RoleContext = createContext<RoleContextValue>({
  role: 'thk',
  resumeData: resumeTHK,
  switcherHref: (path) => path,
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('thk')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const r = params.get('role')
    setRole(r === 'lbsa' ? 'lbsa' : 'thk')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role)
  }, [role])

  const resumeData = role === 'lbsa' ? resumeLBSA : resumeTHK

  const switcherHref = useCallback((currentPath: string): string => {
    const targetRole = role === 'thk' ? 'lbsa' : 'thk'
    if (targetRole === 'thk') return currentPath
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
