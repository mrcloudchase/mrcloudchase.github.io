import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { TerminalText } from '@/components/TerminalText'
import { getFeaturedProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const featuredProjects = getFeaturedProjects()
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chase Dovey',
          url: 'https://cdovey.dev',
          jobTitle: 'Cloud Architect & AI Engineer',
          sameAs: [
            'https://github.com/mrcloudchase',
            'https://www.linkedin.com/in/chasedovey',
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Chase Dovey',
          url: 'https://cdovey.dev',
        }}
      />

      {/* Hero Section — Terminal Window */}
      <section className="section-padding">
        <div className="container-max">
          <div className="terminal-window max-w-3xl mx-auto">
            <div className="terminal-window-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="text-surface-400 text-sm font-mono ml-2">terminal</span>
            </div>
            <div className="p-6 md:p-8 font-mono space-y-4">
              <div>
                <span className="text-neon-500">$</span>{' '}
                <span className="text-gray-300">whoami</span>
              </div>
              <div className="text-2xl md:text-4xl font-bold">
                <TerminalText
                  text="Chase Dovey"
                  speed={80}
                  className="text-neon-500 text-glow-green"
                />
              </div>
              <div>
                <span className="text-neon-500">$</span>{' '}
                <span className="text-gray-300">cat intro.txt</span>
              </div>
              <div className="text-gray-400 text-lg">
                <TerminalText
                  text="Cloud architect, AI engineer, and builder of things that scale. I design infrastructure, develop intelligent systems, and write about it along the way."
                  speed={20}
                  delay={1500}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/projects" className="btn-primary">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/blog" className="btn-secondary">
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 font-mono mb-4">
              <span className="text-surface-500">{'// '}</span>{'featured_projects'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Some of the things I&apos;ve been building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.name} className="terminal-card">
                <h3 className="text-xl font-bold text-neon-400 font-mono mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tag-pill">{tech}</span>
                  ))}
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cyber-400 hover:text-cyber-300 font-medium text-sm transition-colors"
                >
                  View on GitHub
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/projects" className="btn-secondary">
              All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-200 font-mono mb-4">
              <span className="text-surface-500">{'// '}</span>{'latest_posts'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Thoughts on cloud, AI, and engineering.
            </p>
          </div>

          {latestPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="terminal-window max-w-md mx-auto">
                <div className="terminal-window-header">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                </div>
                <div className="p-6 font-mono text-gray-400">
                  <p><span className="text-neon-500">$</span> ls posts/</p>
                  <p className="text-surface-500 mt-2">No posts yet. Check back soon.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <article key={post.slug} className="terminal-card">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-200 font-mono mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-neon-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-surface-500">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="mx-2">&middot;</span>
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>{post.readingTime} min</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {latestPosts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/blog" className="btn-secondary">
                All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
