'use client'

import Link from 'next/link'
import { useDirection } from '@/lib/directionContext'
import { getPageIndex } from '@/lib/navigation'
import type { PageMeta } from '@/lib/navigation'
import styles from './NavItem.module.css'

interface Props {
  page: PageMeta
  currentPath: string
  onNavigate?: () => void
}

export default function NavItem({ page, currentPath, onNavigate }: Props) {
  const { setDirection } = useDirection()
  const isActive = currentPath === page.path

  function handleClick() {
    const currentIdx = getPageIndex(currentPath)
    const targetIdx = getPageIndex(page.path)
    setDirection(targetIdx >= currentIdx ? 1 : -1)
    onNavigate?.()
  }

  return (
    <Link
      href={page.path}
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.icon}>{page.icon}</span>
      <span className={styles.label}>{page.label}</span>
    </Link>
  )
}
