'use client'

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"

export default function Notepad() {
  const [text, setText] = useState('')

  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type your notes here..."
      className="w-full h-full resize-none"
    />
  )
}

