# AGENTS.md

This file provides guidance to AI coding agents when working with this repository.

## Repository Overview

Chase Dovey's personal website and blog, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4. It deploys to GitHub Pages via GitHub Actions. Blog content lives in a separate repository (`mrcloudchase-blog`) and is fetched at build time. The site uses a terminal/hacker aesthetic with dark backgrounds, neon green primary color, and monospace headings. The custom domain is `cdovey.dev`.

## Tech Stack

- **Framework:** Next.js 16 with App Router (`output: 'export'` — fully static)
- **Language:** TypeScript 5.9 (strict mode)
- **Runtime:** Node.js 22 LTS
- **Styling:** Tailwind CSS 4 with PostCSS
- **Icons:** Lucide React
- **Markdown:** unified + remark + rehype pipeline with GFM and Mermaid support (dark theme)
- **PDF Generation:** Playwright (Chromium) for resume PDF and Mermaid SVG rendering
- **Package Manager:** npm
- **Deployment:** GitHub Pages (static export to `out/`)

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (auto-fetches blog content first) |
| `npm run build` | Generate resume PDF, build static site to `out/`, and generate sitemap |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler (no emit) |
| `npm run fetch-content` | Clone/pull blog content from mrcloudchase-blog repo |
| `npm run generate-resume` | Generate ATS-optimized resume PDF from `lib/resume-data.json` |

Always run `npm run type-check` and `npm run lint` before considering work complete.

## Project Structure

```
app/                    Next.js App Router pages
├── layout.tsx          Root layout (Header + Footer, dark body)
├── page.tsx            Home page (terminal hero, featured projects, latest posts)
├── about/              About (bio, skills, timeline)
├── blog/               Blog listing + [slug] dynamic routes
├── projects/           Project portfolio grid (fetched from GitHub API at build time)
├── resume/             Resume with dynamically generated PDF download
├── not-found.tsx       Terminal-themed 404 page
└── globals.css         Dark neon theme + Tailwind config
components/             Reusable React components
├── Header.tsx          Terminal-prompt nav with mobile menu
├── Footer.tsx          Dark footer with social links
├── BlogPostGrid.tsx    Blog listing with client-side tag filtering
├── ProjectCard.tsx     Project card with stars, tech stack, links
├── TerminalText.tsx    Typing animation (client component)
└── JsonLd.tsx          Structured data
lib/
├── blog.ts             Blog post fetching and Markdown processing
├── projects.ts         Dynamic project fetching from GitHub API (with overrides)
└── resume-data.json    Single source of truth for resume (web page + PDF)
content/blog/           Blog content (fetched at build, gitignored)
scripts/
├── fetch-content.sh    Clones mrcloudchase-blog repo into content/blog
├── generate-resume-pdf.mjs  Generates ATS-optimized PDF from resume-data.json
└── generate-sitemap.mjs     Post-build sitemap generator
public/                 Static assets (images, resume PDF, robots.txt, llms.txt)
```

## Architecture Decisions

**Static Export:** The entire site is pre-rendered at build time. There are no API routes or server-side rendering. Do not introduce server-only features.

**Blog Content:** Blog posts live in the `mrcloudchase-blog` repository and are cloned into `content/blog/` at build time. Posts use `YYYY-MM-DD-slug.md` filenames with YAML frontmatter (title, date, excerpt, author, tags, draft). Do not commit blog content to this repo.

**Tag System:** Valid tags are defined in `content/blog/tags.json` (from the blog repo). `lib/blog.ts` validates post tags at build time and warns on undefined tags. The `<!-- TAG_CATALOG -->` marker in markdown posts is replaced at render time with a generated list of all tag definitions.

**Markdown Pipeline:** Posts are processed through unified → remark-parse → remark-gfm → remark-rehype → rehype-raw → rehype-mermaid (dark theme) → rehype-stringify. Mermaid diagrams require Playwright (Chromium) at build time for SVG rendering.

**Static Params:** Dynamic blog routes use `generateStaticParams()` to pre-render all post pages. Any new dynamic routes must also use this pattern.

**Dark Theme:** The site uses a terminal/hacker aesthetic. All UI uses dark backgrounds (`surface-700` through `surface-900`), neon green (`neon-500`) as primary, cyan (`cyber-500`) as secondary, and purple (`purple-500`) as accent. Headings use JetBrains Mono font.

**Dynamic Projects:** Projects are fetched from the GitHub API (`users/mrcloudchase/repos`) at build time. An `overrides` map in `lib/projects.ts` controls featured status, custom descriptions, demo URLs, and hidden repos. Forks are hidden by default unless overridden.

**Resume PDF:** The downloadable resume PDF is generated at build time from `lib/resume-data.json` using Playwright. The same JSON file drives the web resume page. Update the JSON to change both. The PDF uses ATS/HRIS-optimized formatting (Arial font, standard headings, no table layouts, US Letter size). Experience entries in the JSON must be ordered by start date, most recent first. When a company went through acquisitions, list all names separated by pipes (e.g., `"Linux Academy | A Cloud Guru | Pluralsight"`).

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

### JSX Comment Text

- ESLint `react/jsx-no-comment-textnodes` triggers when `//` followed by text appears as direct children of JSX elements.
- The terminal-style `// section_name` headings must wrap text in JSX expressions: `{'// '}` and `{'section_name'}`.

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
5. Install Playwright Chromium (for Mermaid and resume PDF)
6. `npm run type-check`
7. `npm run lint`
8. `npm run build` (generates resume PDF → builds site → generates sitemap)
9. Deploy `out/` to GitHub Pages

## Things to Avoid

- Do not add API routes or server-side rendering — the site is statically exported.
- Do not commit anything in `content/blog/` — it is gitignored and fetched at build time.
- Do not use light theme colors — maintain the dark terminal aesthetic.
- Do not disable strict TypeScript mode.
- Do not use fonts other than JetBrains Mono (headings/code) and Inter (body).
- Do not hardcode resume data in the page — always use `lib/resume-data.json`.
- Do not hardcode project data — projects are fetched from GitHub API; use the `overrides` map in `lib/projects.ts` for customization.
