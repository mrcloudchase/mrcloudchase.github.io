import { getAllPosts } from '@/lib/blog'
import BlogPostGrid from '@/components/BlogPostGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on cloud architecture, AI engineering, DevOps, and modern development.',
  openGraph: {
    title: 'Blog',
    description: 'Thoughts on cloud architecture, AI engineering, DevOps, and modern development.',
  },
  alternates: {
    canonical: '/blog/',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding border-b border-surface-700">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="text-surface-500">{'// '}</span>
              <span className="text-neon-500 text-glow-green">blog</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Thoughts on cloud architecture, AI engineering, and building things that scale.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="text-center py-16">
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
            <BlogPostGrid posts={posts} allTags={allTags} />
          )}
        </div>
      </section>
    </div>
  )
}
