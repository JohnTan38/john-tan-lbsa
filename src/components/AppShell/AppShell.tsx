'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import PrevNextBar from '@/components/PrevNextBar/PrevNextBar'
import PageTransition from '@/components/PageTransition/PageTransition'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}
      <div
        style={{
          marginLeft: 'var(--sidebar-w)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          style={{
            display: 'none',
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 101,
            background: 'var(--navy)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 10px',
            cursor: 'pointer',
            fontSize: 18,
            color: 'var(--gold)',
          }}
          className="hamburger"
        >
          ☰
        </button>
        <main
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
            background: 'var(--white)',
          }}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <PrevNextBar />
      </div>
    </>
  )
}
