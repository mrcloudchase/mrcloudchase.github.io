'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

type Props = {
  posts: BlogPostMeta[]
  allTags: string[]
}

export default function BlogPostGrid({ posts, allTags }: Props) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }
      return next
    })
  }

  function clearTags() {
    setSelectedTags(new Set())
  }

  const filteredPosts =
    selectedTags.size === 0
      ? posts
      : posts.filter((post) => post.tags.some((tag) => selectedTags.has(tag)))

  return (
    <>
      {/* Tag Filter Bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={clearTags}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTags.size === 0
                ? 'bg-neon-500 text-surface-900'
                : 'bg-neon-500/10 text-neon-400 hover:bg-neon-500/20 border border-neon-500/20'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTags.has(tag)
                  ? 'bg-neon-500 text-surface-900'
                  : 'bg-neon-500/10 text-neon-400 hover:bg-neon-500/20 border border-neon-500/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-surface-500 mb-4">No posts match the selected tags.</p>
          <button
            onClick={clearTags}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-neon-500 text-surface-900 font-medium text-sm hover:bg-neon-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="terminal-card">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-200 font-mono mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-neon-400 transition-colors">
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center text-sm text-surface-500 mb-4">
                <Calendar className="h-4 w-4 mr-1.5" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="mx-2">&middot;</span>
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{post.readingTime} min read</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-cyber-400 hover:text-cyber-300 font-medium text-sm transition-colors"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
