'use client'

import { useRef } from 'react'
import styles from './SearchBox.module.css'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBox({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={styles.input}
        type="search"
        placeholder="Search sections..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search resume sections"
      />
    </div>
  )
}
