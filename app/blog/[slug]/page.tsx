import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { JsonLd } from '@/components/JsonLd'
import BlogContent from '@/components/BlogContent'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}/`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          datePublished: post.date,
          publisher: {
            '@type': 'Person',
            name: 'Chase Dovey',
            url: 'https://cdovey.dev',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://cdovey.dev/blog/${slug}/`,
          },
          keywords: post.tags.join(', '),
        }}
      />

      {/* Hero Section */}
      <section className="section-padding border-b border-surface-700">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-cyber-400 hover:text-cyber-300 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-100 font-mono mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-surface-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <time dateTime={post.date}>
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogContent html={post.contentHtml} />
        </div>
      </section>

      {/* Bottom Section */}
      <section className="section-padding border-t border-surface-700">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="btn-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
