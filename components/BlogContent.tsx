'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function BlogContent({ html }: { html: string }) {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleAnchorClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    const anchor = (e.currentTarget as HTMLAnchorElement)
    const url = `${window.location.origin}${window.location.pathname}${anchor.getAttribute('href')}`

    navigator.clipboard.writeText(url).then(() => {
      anchor.classList.add('copied')
      setTimeout(() => anchor.classList.remove('copied'), 1500)
    })
  }, [])

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const anchors = container.querySelectorAll<HTMLAnchorElement>('.heading-anchor')
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick))

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick))
    }
  }, [html, handleAnchorClick])

  return (
    <div
      ref={contentRef}
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
