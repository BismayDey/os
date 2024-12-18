'use client'

import { useState } from 'react'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface CalendarProps {
  theme: 'light' | 'dark'
}

export default function Calendar({ theme }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-xl font-bold mb-4">Calendar</h2>
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate}
        className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}
      />
    </div>
  )
}

