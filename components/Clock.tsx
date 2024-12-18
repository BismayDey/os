'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClockProps {
  theme: 'light' | 'dark'
}

export default function Clock({ theme }: ClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className={`fixed bottom-16 right-4 p-2 text-lg font-bold ${
        theme === 'dark' ? 'text-white bg-gray-800' : 'text-gray-800 bg-white'
      } bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={time.toLocaleTimeString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {time.toLocaleTimeString()}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

