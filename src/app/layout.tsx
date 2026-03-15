import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'
import { DirectionProvider } from '@/lib/directionContext'
import { SearchProvider } from '@/lib/searchContext'
import { RoleProvider } from '@/lib/roleContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'John Tan — Resume',
  description: 'John Tan | Volunteer Management Executive | Digital Transformation | Community Engagement | Singapore',
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
            <RoleProvider>
              <AppShell>{children}</AppShell>
            </RoleProvider>
          </SearchProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
