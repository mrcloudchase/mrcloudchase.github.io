export type Project = {
  name: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  featured: boolean
}

const projects: Project[] = [
  {
    name: 'az-104-study-guide',
    description: 'Comprehensive study guide and hands-on labs for the Microsoft Azure AZ-104 Administrator certification exam.',
    techStack: ['Azure', 'Cloud', 'Certification', 'Documentation'],
    githubUrl: 'https://github.com/mrcloudchase/az-104-study-guide',
    featured: true,
  },
  {
    name: 'Azure Networking Lab',
    description: 'Hands-on lab environment for learning Azure networking concepts including VNets, NSGs, load balancers, and VPN gateways.',
    techStack: ['Azure', 'Networking', 'Terraform', 'IaC'],
    githubUrl: 'https://github.com/mrcloudchase/azure-networking-lab',
    featured: true,
  },
  {
    name: 'mrcloudchase.github.io',
    description: 'Personal website and blog built with Next.js 16, static export, and a terminal/hacker aesthetic. The site you are looking at right now.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub Pages'],
    githubUrl: 'https://github.com/mrcloudchase/mrcloudchase.github.io',
    demoUrl: 'https://mrcloudchase.github.io',
    featured: true,
  },
  {
    name: 'AI Agent Framework',
    description: 'A modular framework for building AI agents with tool use, memory, and multi-step reasoning capabilities.',
    techStack: ['Python', 'AI', 'LLMs', 'Agents'],
    githubUrl: 'https://github.com/mrcloudchase/ai-agent-framework',
    featured: false,
  },
  {
    name: 'Cloud Infrastructure Templates',
    description: 'Production-ready infrastructure as code templates for multi-cloud deployments across Azure, AWS, and GCP.',
    techStack: ['Terraform', 'Azure', 'AWS', 'IaC'],
    githubUrl: 'https://github.com/mrcloudchase/cloud-infra-templates',
    featured: false,
  },
  {
    name: 'DevOps Pipeline Toolkit',
    description: 'Collection of reusable CI/CD pipeline components, GitHub Actions workflows, and deployment automation scripts.',
    techStack: ['GitHub Actions', 'CI/CD', 'Docker', 'Bash'],
    githubUrl: 'https://github.com/mrcloudchase/devops-toolkit',
    featured: false,
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
