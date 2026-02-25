'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useDirection } from '@/lib/directionContext'
import styles from './PageTransition.module.css'

const variants = {
  enter: (dir: 1 | -1) => ({
    x: dir * 80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: 1 | -1) => ({
    x: dir * -80,
    opacity: 0,
  }),
}

const transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { direction } = useDirection()

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        className={styles.wrapper}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
