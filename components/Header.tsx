'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
  ]

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-surface-900/95 backdrop-blur-sm border-b border-surface-600 sticky top-0 z-50">
      <nav className="container-max">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          {/* Terminal Prompt Branding */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-mono text-lg font-bold">
              <span className="text-neon-500">chase</span>
              <span className="text-surface-400">@</span>
              <span className="text-cyber-400">dovey</span>
              <span className="text-surface-400">:~$</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-neon-500'
                    : 'text-gray-400 hover:text-neon-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-neon-500 hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neon-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-surface-600">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-neon-500'
                      : 'text-gray-400 hover:text-neon-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
