'use client'

import { useState, useEffect } from 'react'

type Props = {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function TerminalText({ text, speed = 50, delay = 0, className = '' }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="text-neon-500 animate-pulse">█</span>
      )}
    </span>
  )
}
