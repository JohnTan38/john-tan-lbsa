'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface DirectionContextValue {
  direction: 1 | -1
  setDirection: (d: 1 | -1) => void
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: 1,
  setDirection: () => {},
})

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirectionState] = useState<1 | -1>(1)

  const setDirection = useCallback((d: 1 | -1) => {
    setDirectionState(d)
  }, [])

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  return useContext(DirectionContext)
}
