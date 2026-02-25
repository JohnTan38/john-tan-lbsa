'use client'

import styles from './SearchBox.module.css'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <input
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
