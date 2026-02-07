import { readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://mrcloudchase.github.io'

const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/about/', priority: '0.8' },
  { path: '/blog/', priority: '0.9' },
  { path: '/projects/', priority: '0.8' },
  { path: '/resume/', priority: '0.7' },
]

const today = new Date().toISOString().split('T')[0]

// Collect blog post slugs
const blogSlugs = []
const postsDir = join(process.cwd(), 'content', 'blog', 'posts')

if (existsSync(postsDir)) {
  const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  for (const file of files) {
    // Strip YYYY-MM-DD- prefix and .md extension to get slug
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
    blogSlugs.push(slug)
  }
} else {
  console.log('No blog posts directory found — generating sitemap with static pages only.')
}

// Build XML
const urls = [
  ...staticPages.map(
    ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  ),
  ...blogSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/blog/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = join(process.cwd(), 'out', 'sitemap.xml')
writeFileSync(outPath, sitemap, 'utf-8')
console.log(`Sitemap written to ${outPath} (${staticPages.length + blogSlugs.length} URLs)`)
