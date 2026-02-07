# AGENTS.md

This file provides guidance to AI coding agents when working with this repository.

## Repository Overview

Chase Dovey's personal website and blog, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4. It deploys to GitHub Pages via GitHub Actions. Blog content lives in a separate repository (`mrcloudchase-blog`) and is fetched at build time. The site uses a terminal/hacker aesthetic with dark backgrounds, neon green primary color, and monospace headings.

## Tech Stack

- **Framework:** Next.js 16 with App Router (`output: 'export'` — fully static)
- **Language:** TypeScript 5.9 (strict mode)
- **Runtime:** Node.js 22 LTS
- **Styling:** Tailwind CSS 4 with PostCSS
- **Icons:** Lucide React
- **Markdown:** unified + remark + rehype pipeline with GFM and Mermaid support (dark theme)
- **Package Manager:** npm
- **Deployment:** GitHub Pages (static export to `out/`)

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (auto-fetches blog content first) |
| `npm run build` | Build static site to `out/` and generate sitemap |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler (no emit) |
| `npm run fetch-content` | Clone/pull blog content from mrcloudchase-blog repo |

Always run `npm run type-check` and `npm run lint` before considering work complete.

## Project Structure

```
app/                    Next.js App Router pages
├── layout.tsx          Root layout (Header + Footer, dark body)
├── page.tsx            Home page (terminal hero, featured projects, latest posts)
├── about/              About (bio, skills, timeline)
├── blog/               Blog listing + [slug] dynamic routes
├── projects/           Project portfolio grid
├── resume/             Resume with PDF download
├── not-found.tsx       Terminal-themed 404 page
└── globals.css         Dark neon theme + Tailwind config
components/             Reusable React components
├── Header.tsx          Terminal-prompt nav with mobile menu
├── Footer.tsx          Dark footer with social links
├── BlogPostGrid.tsx    Blog listing with client-side tag filtering
├── ProjectCard.tsx     Project card component
├── TerminalText.tsx    Typing animation (client component)
└── JsonLd.tsx          Structured data
lib/
├── blog.ts             Blog post fetching and Markdown processing
└── projects.ts         Project data (typed array)
content/blog/           Blog content (fetched at build, gitignored)
scripts/
├── fetch-content.sh    Clones mrcloudchase-blog repo into content/blog
└── generate-sitemap.mjs Post-build sitemap generator
public/                 Static assets (images, resume PDF, robots.txt, llms.txt)
```

## Architecture Decisions

**Static Export:** The entire site is pre-rendered at build time. There are no API routes or server-side rendering. Do not introduce server-only features.

**Blog Content:** Blog posts live in the `mrcloudchase-blog` repository and are cloned into `content/blog/` at build time. Posts use `YYYY-MM-DD-slug.md` filenames with YAML frontmatter (title, date, excerpt, author, tags, draft). Do not commit blog content to this repo.

**Markdown Pipeline:** Posts are processed through unified → remark-parse → remark-gfm → remark-rehype → rehype-raw → rehype-mermaid (dark theme) → rehype-stringify. Mermaid diagrams require Playwright (Chromium) at build time for SVG rendering.

**Static Params:** Dynamic blog routes use `generateStaticParams()` to pre-render all post pages. Any new dynamic routes must also use this pattern.

**Dark Theme:** The site uses a terminal/hacker aesthetic. All UI uses dark backgrounds (`surface-700` through `surface-900`), neon green (`neon-500`) as primary, cyan (`cyber-500`) as secondary, and purple (`purple-500`) as accent. Headings use JetBrains Mono font.

## Conventions

### Components

- **Server components** by default. Only add `'use client'` when the component needs browser APIs, hooks, or event handlers.
- Component files use **PascalCase** (`Header.tsx`, `BlogPostGrid.tsx`).
- Utility files use **camelCase** (`blog.ts`, `projects.ts`).
- Types and interfaces use **PascalCase** (`BlogPostMeta`, `BlogPost`, `Project`).

### Styling

- Use **Tailwind utility classes** directly. Avoid custom CSS unless defining reusable component-layer classes.
- Custom component classes (`btn-primary`, `btn-secondary`, `terminal-card`, `terminal-window`, `tag-pill`, `prose-blog`) are defined in `globals.css` using Tailwind's `@layer components`.
- Three custom color palettes: `neon` (green), `cyber` (cyan), `surface` (dark grays), plus `purple` accent, each with shades 50–900.
- Mobile-first responsive design using `md:` and `lg:` breakpoints.

### Pages

- Export a `metadata` object (or `generateMetadata` function for dynamic pages) for SEO.
- Use semantic HTML5 elements (`<section>`, `<main>`, `<article>`).
- Use Next.js `Link` component for all internal navigation.
- Section headings use the `// name` comment-style format in monospace.

### Path Alias

`@/*` maps to the project root. Use `@/components/Header` instead of relative paths.

## CI/CD Pipeline

GitHub Actions (`.github/workflows/deploy-to-github-pages.yml`) runs on push to `main` and on `repository_dispatch` (blog content updates):

1. Checkout code
2. Clone blog content from mrcloudchase-blog
3. Setup Node.js 22
4. `npm ci`
5. Install Playwright Chromium (for Mermaid)
6. `npm run type-check`
7. `npm run lint`
8. `npm run build`
9. Deploy `out/` to GitHub Pages

## Things to Avoid

- Do not add API routes or server-side rendering — the site is statically exported.
- Do not commit anything in `content/blog/` — it is gitignored and fetched at build time.
- Do not use light theme colors — maintain the dark terminal aesthetic.
- Do not disable strict TypeScript mode.
- Do not use fonts other than JetBrains Mono (headings/code) and Inter (body).
