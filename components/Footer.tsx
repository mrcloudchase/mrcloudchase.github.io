import Link from 'next/link'
import { Mail, Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-surface-600">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-mono text-lg font-bold">
                <span className="text-neon-500">chase</span>
                <span className="text-surface-400">@</span>
                <span className="text-cyber-400">dovey</span>
                <span className="text-surface-400">:~$</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Cloud architect, AI engineer, and builder of things that scale.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mrcloudchase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/yourlinkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:chase@dovey.dev"
                className="text-gray-400 hover:text-neon-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 font-mono">{'// quick_links'}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-neon-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-neon-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-gray-400 hover:text-neon-400 transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 font-mono">{'// connect'}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <a href="mailto:chase@dovey.dev" className="hover:text-neon-400 transition-colors">
                  chase@dovey.dev
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/mrcloudchase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-400 transition-colors"
                >
                  mrcloudchase
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Chase Dovey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
