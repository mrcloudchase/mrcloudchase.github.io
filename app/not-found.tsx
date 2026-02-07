import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container-max px-4">
        <div className="terminal-window max-w-lg mx-auto">
          <div className="terminal-window-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="text-surface-400 text-sm font-mono ml-2">error</span>
          </div>
          <div className="p-6 md:p-8 font-mono space-y-3">
            <div>
              <span className="text-neon-500">$</span>{' '}
              <span className="text-gray-300">cd /page</span>
            </div>
            <div className="text-red-400">
              bash: cd: /page: No such file or directory
            </div>
            <div className="text-7xl font-bold text-neon-500 text-glow-green py-4">
              404
            </div>
            <div className="text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </div>
            <div className="pt-4">
              <span className="text-neon-500">$</span>{' '}
              <span className="text-gray-300">ls ~/</span>
            </div>
            <div className="flex flex-col gap-1 pl-4">
              <Link href="/" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                home/
              </Link>
              <Link href="/about" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                about/
              </Link>
              <Link href="/blog" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                blog/
              </Link>
              <Link href="/projects" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                projects/
              </Link>
              <Link href="/resume" className="text-cyber-400 hover:text-cyber-300 transition-colors">
                resume/
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
