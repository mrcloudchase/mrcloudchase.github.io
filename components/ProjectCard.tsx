import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/projects'

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <div className="terminal-card flex flex-col">
      <h3 className="text-xl font-bold text-neon-400 font-mono mb-2">
        {project.name}
      </h3>
      <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span key={tech} className="tag-pill">{tech}</span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-400 hover:text-neon-400 transition-colors text-sm"
          aria-label={`${project.name} on GitHub`}
        >
          <Github className="h-5 w-5 mr-1.5" />
          Source
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-cyber-400 transition-colors text-sm"
            aria-label={`${project.name} demo`}
          >
            <ExternalLink className="h-5 w-5 mr-1.5" />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}
