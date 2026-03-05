import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d0d0d',
            color: '#ccc',
            fontFamily: 'monospace',
            fontSize: 32,
          }}
        >
          Post not found
        </div>
      ),
      size
    )
  }

  const tags = post.tags.join('  |  ')
  const date = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d0d0d',
          padding: '40px',
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#161616',
            borderRadius: '12px',
            border: '1px solid #333',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 20px',
              backgroundColor: '#1a1a1a',
              borderBottom: '1px solid #333',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#fbbf24',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#666',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              cdovey.dev
            </div>
          </div>

          {/* Terminal body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '36px 44px',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/* Top section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Command prompt */}
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  color: '#888',
                  marginBottom: '12px',
                }}
              >
                $ cat post.md
              </div>

              {/* Post title */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '42px',
                  fontWeight: 700,
                  color: '#4ade80',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {post.title}
              </div>

              {/* Author and date */}
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: '18px',
                  color: '#999',
                  marginBottom: '24px',
                }}
              >
                {post.author} &middot; {date}
              </div>

              {/* Tags */}
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  color: '#22d3ee',
                }}
              >
                {tags}
              </div>
            </div>

            {/* Bottom section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              {/* Cursor prompt */}
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  color: '#888',
                }}
              >
                $&nbsp;
                <div
                  style={{
                    width: '10px',
                    height: '20px',
                    backgroundColor: '#4ade80',
                  }}
                />
              </div>

              {/* URL */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  color: '#4ade80',
                }}
              >
                https://cdovey.dev
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
