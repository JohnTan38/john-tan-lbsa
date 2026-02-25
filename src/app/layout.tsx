import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import PrevNextBar from '@/components/PrevNextBar/PrevNextBar'
import PageTransition from '@/components/PageTransition/PageTransition'
import { DirectionProvider } from '@/lib/directionContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'John Tan — Resume',
  description: "Center Manager | Residents' Network | Generative AI & Community Care Professional",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <DirectionProvider>
          <Sidebar />
          <div
            style={{
              marginLeft: 'var(--sidebar-w)',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
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
        </DirectionProvider>
      </body>
    </html>
  )
}
