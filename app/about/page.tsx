import type { Metadata } from 'next'
import { Cloud, Brain, Terminal, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'AI and cloud engineer. Builder of things that scale. Learn more about Chase Dovey.',
  openGraph: {
    title: 'About',
    description: 'AI and cloud engineer. Builder of things that scale. Learn more about Chase Dovey.',
  },
  alternates: {
    canonical: '/about/',
  },
}

const skillCategories = [
  {
    name: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['Azure', 'AWS', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions'],
  },
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    skills: ['LLMs', 'RAG', 'AI Agents', 'Python', 'Prompt Engineering', 'Fine-Tuning'],
  },
  {
    name: 'Development',
    icon: Terminal,
    skills: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Go', 'Bash'],
  },
  {
    name: 'DevOps & Platform',
    icon: Server,
    skills: ['CI/CD', 'IaC', 'Monitoring', 'Linux', 'Networking', 'Security'],
  },
]

const timeline = [
  {
    period: 'Present',
    title: 'AI & Cloud Engineer',
    description: 'Designing scalable cloud infrastructure and building intelligent systems. Specializing in multi-cloud architecture, AI agent development, and DevOps automation.',
  },
  {
    period: 'Previous',
    title: 'Cloud Engineer',
    description: 'Built and managed cloud infrastructure at scale. Led cloud migration projects and implemented infrastructure as code across Azure and AWS.',
  },
  {
    period: 'Earlier',
    title: 'Systems Administrator',
    description: 'Managed enterprise IT infrastructure, automated operations, and built the foundation for moving to cloud-first architecture.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding border-b border-surface-700">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="text-surface-500">{'// '}</span>
              <span className="text-neon-500 text-glow-green">about</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="terminal-window">
              <div className="terminal-window-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-surface-400 text-sm font-mono ml-2">about.txt</span>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I&apos;m Chase Dovey, an AI and cloud engineer based in Houston, Texas. I build intelligent systems, design scalable infrastructure, and help teams ship faster.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My work sits at the intersection of cloud infrastructure and artificial intelligence. I believe in building systems that are not just powerful, but maintainable, observable, and well-documented.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  When I&apos;m not architecting cloud solutions, I&apos;m contributing to open source, writing about what I learn, and exploring the latest in AI engineering. I&apos;m passionate about sharing knowledge and helping others grow in their careers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 font-mono mb-12 text-center">
            <span className="text-surface-500">{'// '}</span>{'skills'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.name} className="terminal-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-neon-500/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-neon-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 font-mono">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="tag-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 font-mono mb-12 text-center">
            <span className="text-surface-500">{'// '}</span>{'timeline'}
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {timeline.map((entry, index) => (
              <div key={index} className="terminal-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-neon-500"></div>
                  <div>
                    <span className="text-sm text-neon-400 font-mono">{entry.period}</span>
                    <h3 className="text-xl font-bold text-gray-200 mt-1">{entry.title}</h3>
                    <p className="text-gray-400 mt-2">{entry.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
