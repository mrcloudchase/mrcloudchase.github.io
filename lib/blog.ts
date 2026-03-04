import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMermaid from 'rehype-mermaid'
import rehypeStringify from 'rehype-stringify'

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const POSTS_DIRECTORY = path.join(BLOG_CONTENT_DIR, 'posts')

export type TagDefinition = {
  name: string
  description: string
}

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  readingTime: number
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
}

export function getTagDefinitions(): TagDefinition[] {
  const tagsPath = path.join(BLOG_CONTENT_DIR, 'tags.json')
  if (!fs.existsSync(tagsPath)) return []
  const raw = JSON.parse(fs.readFileSync(tagsPath, 'utf8'))
  return raw.tags ?? []
}

function getValidTagNames(): Set<string> {
  return new Set(getTagDefinitions().map((t) => t.name))
}

function validateTags(tags: string[], filename: string, validTags: Set<string>): void {
  for (const tag of tags) {
    if (!validTags.has(tag)) {
      console.warn(
        `[blog] WARNING: Post "${filename}" uses undefined tag "${tag}". ` +
          `Defined tags: ${[...validTags].join(', ')}`
      )
    }
  }
}

function buildTagCatalogHtml(tags: TagDefinition[]): string {
  if (tags.length === 0) return ''
  const items = tags
    .map((t) => `<li><strong>${t.name}</strong> - ${t.description}</li>`)
    .join('\n')
  return `<ul>\n${items}\n</ul>`
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function slugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith('.md'))
    .map(slugFromFilename)
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  const files = fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'))
  const validTags = getValidTagNames()

  const posts = files
    .map((filename) => {
      const filePath = path.join(POSTS_DIRECTORY, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      if (data.draft && process.env.NODE_ENV === 'production') return null

      const tags: string[] = data.tags ?? []
      if (validTags.size > 0) validateTags(tags, filename, validTags)

      const meta: BlogPostMeta = {
        slug: slugFromFilename(filename),
        title: data.title ?? '',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        author: data.author ?? '',
        tags,
        readingTime: calculateReadingTime(content),
      }

      return meta
    })
    .filter((post): post is BlogPostMeta => post !== null)

  posts.sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(POSTS_DIRECTORY)) return null

  const files = fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'))

  const filename = files.find((file) => slugFromFilename(file) === slug)
  if (!filename) return null

  const filePath = path.join(POSTS_DIRECTORY, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  if (data.draft && process.env.NODE_ENV === 'production') return null

  const tags: string[] = data.tags ?? []
  const tagDefs = getTagDefinitions()
  const validTags = new Set(tagDefs.map((t) => t.name))
  if (validTags.size > 0) validateTags(tags, filename, validTags)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['heading-anchor'], ariaLabel: 'Link to this section' },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['heading-anchor-icon'] },
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypeMermaid, {
      strategy: 'inline-svg',
      mermaidConfig: { theme: 'dark' },
    })
    .use(rehypeStringify)
    .process(content)

  let contentHtml = result.toString()
  if (contentHtml.includes('<!-- TAG_CATALOG -->')) {
    contentHtml = contentHtml.replace('<!-- TAG_CATALOG -->', buildTagCatalogHtml(tagDefs))
  }

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    author: data.author ?? '',
    tags,
    readingTime: calculateReadingTime(content),
    contentHtml,
  }
}
