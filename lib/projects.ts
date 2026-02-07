export type Project = {
  name: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  featured: boolean
  stars: number
}

// Override specific repos: set featured, custom description, demo URL, or hide them
const overrides: Record<string, Partial<Project> & { hidden?: boolean }> = {
  'mrcloudchase.github.io': {
    description: 'Personal website and blog built with Next.js 16, static export, and a terminal/hacker aesthetic.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub Pages'],
    demoUrl: 'https://cdovey.dev',
    featured: true,
  },
  'claude-code.nvim': {
    description: 'A Neovim plugin for integrating with Claude Code CLI.',
    featured: true,
  },
  'digital-perceptron': {
    description: 'A modern take on the Frank Rosenblatt perceptron experiment from 1958.',
    featured: true,
  },
  'perceptron': {
    description: 'A modern attempt at the original Perceptron experiment conducted by Frank Rosenblatt in 1957/1958.',
    featured: true,
  },
  'litellm-app': {
    description: 'Production-ready LiteLLM deployment with PII guardrails for infrastructure deployment.',
    featured: true,
  },
  'exo-mac-cluster-bootstrap': {
    description: 'Scripts for bootstrapping a Mac mini cluster using Exo Labs clustering software.',
    featured: true,
  },
  // Hide forks, empty repos, and test projects
  'azure-aks-docs': { hidden: true },
  'azure-compute-docs': { hidden: true },
  'azure-management-docs': { hidden: true },
  'content-az700-Microsoft-Azure-Network-Engineer-Associate': { hidden: true },
  'content-container-actions-app': { hidden: true },
  'content-javascript-actions-app': { hidden: true },
  'DeepSeek-R1': { hidden: true },
  'DeepSeek-V2': { hidden: true },
  'deepseek-v3': { hidden: true },
  'distribution': { hidden: true },
  'Janus': { hidden: true },
  'litellm': { hidden: true },
  'memvid': { hidden: true },
  'openclaw': { hidden: true },
  'opencode': { hidden: true },
  'weaviate': { hidden: true },
  'mrcloudchase-blog': { hidden: true },
  'API-APP-01': { hidden: true },
  'API-APP-02': { hidden: true },
  'API-APP-03': { hidden: true },
  'ARM': { hidden: true },
  'arm-templates': { hidden: true },
  'loginportal': { hidden: true },
  'myExpressApp': { hidden: true },
  'simplenodeapp': { hidden: true },
  'websitedemo': { hidden: true },
  'portfolio': { hidden: true },
  'web_scraper_bemma': { hidden: true },
  'finbert-app': { hidden: true },
}

// Map GitHub language to a readable tech stack entry
function languageToTech(lang: string | null): string[] {
  if (!lang) return []
  const map: Record<string, string> = {
    'TypeScript': 'TypeScript',
    'JavaScript': 'JavaScript',
    'Python': 'Python',
    'Shell': 'Bash',
    'Bash': 'Bash',
    'PowerShell': 'PowerShell',
    'HCL': 'Terraform',
    'Bicep': 'Bicep',
    'Dockerfile': 'Docker',
    'Java': 'Java',
    'Lua': 'Lua',
    'HTML': 'HTML',
    'CSS': 'CSS',
    'Go': 'Go',
    'Jupyter Notebook': 'Python',
  }
  return map[lang] ? [map[lang]] : [lang]
}

type GitHubRepo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  fork: boolean
  language: string | null
  topics: string[]
}

// Fetched at build time and cached in module scope
let cachedProjects: Project[] | null = null

function buildProjectsFromRepos(repos: GitHubRepo[]): Project[] {
  return repos
    .filter((repo) => {
      const override = overrides[repo.name]
      if (override?.hidden) return false
      if (repo.fork && !override) return false
      return true
    })
    .map((repo) => {
      const override = overrides[repo.name] ?? {}
      const techStack = override.techStack ??
        [...languageToTech(repo.language), ...(repo.topics ?? []).slice(0, 3)]
          .filter((v, i, a) => a.indexOf(v) === i) // dedupe

      return {
        name: repo.name,
        description: override.description ?? repo.description ?? '',
        techStack: techStack.length > 0 ? techStack : ['Code'],
        githubUrl: repo.html_url,
        demoUrl: override.demoUrl ?? repo.homepage ?? undefined,
        featured: override.featured ?? false,
        stars: repo.stargazers_count,
      }
    })
    .sort((a, b) => {
      // Featured first, then by stars, then alphabetical
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      if (a.stars !== b.stars) return b.stars - a.stars
      return a.name.localeCompare(b.name)
    })
}

async function fetchFromGitHub(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []
  let page = 1

  for (;;) {
    const url = `https://api.github.com/users/mrcloudchase/repos?per_page=100&page=${page}&sort=updated`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github+json' },
      next: { revalidate: false },
    })

    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status} — falling back to empty project list`)
      return []
    }

    const data = await res.json() as GitHubRepo[]
    repos.push(...data)
    if (data.length < 100) break
    page++
  }

  return repos
}

export async function getAllProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects

  const repos = await fetchFromGitHub()
  cachedProjects = buildProjectsFromRepos(repos)
  return cachedProjects
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects()
  return all.filter((p) => p.featured)
}
