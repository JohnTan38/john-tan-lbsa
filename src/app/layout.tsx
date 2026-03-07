import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'
import { DirectionProvider } from '@/lib/directionContext'
import { SearchProvider } from '@/lib/searchContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'John Tan — Automation Specialist',
  description: 'Automation Specialist | UiPath RPA Developer | Healthcare Digital Transformation | NTUC Health',
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
          <SearchProvider>
            <AppShell>{children}</AppShell>
          </SearchProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
