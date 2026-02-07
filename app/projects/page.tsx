import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source projects and tools for cloud architecture, AI engineering, and DevOps.',
  openGraph: {
    title: 'Projects',
    description: 'Open source projects and tools for cloud architecture, AI engineering, and DevOps.',
  },
  alternates: {
    canonical: '/projects/',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding border-b border-surface-700">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="text-surface-500">{'// '}</span>
              <span className="text-neon-500 text-glow-green">projects</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Open source tools, labs, and frameworks I&apos;ve built.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
