import type { Metadata } from 'next'
import { Download, Briefcase, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Chase Dovey — Cloud Architect & AI Engineer.',
  openGraph: {
    title: 'Resume',
    description: 'Resume of Chase Dovey — Cloud Architect & AI Engineer.',
  },
  alternates: {
    canonical: '/resume/',
  },
}

const experience = [
  {
    title: 'Cloud Architect & AI Engineer',
    company: 'Odovey Consulting',
    period: '2022 – Present',
    highlights: [
      'Design and implement multi-cloud architectures on Azure and AWS',
      'Build AI-powered solutions including RAG systems and AI agents',
      'Lead cloud migration and modernization initiatives',
      'Develop infrastructure as code with Terraform and Bicep',
    ],
  },
  {
    title: 'Senior Cloud Engineer',
    company: 'Previous Company',
    period: '2019 – 2022',
    highlights: [
      'Managed enterprise cloud infrastructure across Azure and AWS',
      'Implemented CI/CD pipelines with GitHub Actions and Azure DevOps',
      'Automated infrastructure provisioning with Terraform',
      'Mentored junior engineers on cloud best practices',
    ],
  },
  {
    title: 'Systems Administrator',
    company: 'Previous Company',
    period: '2016 – 2019',
    highlights: [
      'Administered Windows and Linux server environments',
      'Led initiatives to automate manual operations with PowerShell and Bash',
      'Managed networking infrastructure and security policies',
      'Supported organization-wide migration to cloud services',
    ],
  },
]

const education = [
  {
    degree: 'Cloud & AI Certifications',
    institution: 'Microsoft, AWS',
    details: 'Azure Solutions Architect Expert, Azure Administrator, AWS Solutions Architect',
  },
]

const skillGroups = [
  { label: 'Cloud', items: 'Azure, AWS, GCP, Kubernetes, Docker' },
  { label: 'AI/ML', items: 'LLMs, RAG, AI Agents, Python, Prompt Engineering' },
  { label: 'DevOps', items: 'Terraform, GitHub Actions, CI/CD, Linux, Monitoring' },
  { label: 'Development', items: 'TypeScript, Next.js, React, Go, Node.js, Bash' },
]

export default function ResumePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding border-b border-surface-700">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="text-surface-500">{'// '}</span>
              <span className="text-neon-500 text-glow-green">resume</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Chase Dovey — Cloud Architect &amp; AI Engineer
            </p>
            <a
              href="/resume/chase-dovey-resume.pdf"
              download
              className="btn-primary"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-4">
            <span className="text-surface-500">{'// '}</span>{'summary'}
          </h2>
          <div className="terminal-card">
            <p className="text-gray-300 leading-relaxed">
              Cloud architect and AI engineer with experience designing scalable infrastructure and building intelligent systems. Specialized in multi-cloud architecture (Azure, AWS), AI/ML solutions, and DevOps automation. Passionate about open source, knowledge sharing, and helping teams ship faster.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-6">
            <span className="text-surface-500">{'// '}</span>{'experience'}
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="terminal-card">
                <div className="flex items-start gap-3 mb-3">
                  <Briefcase className="h-5 w-5 text-neon-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-200">{job.title}</h3>
                    <p className="text-cyber-400 text-sm">{job.company}</p>
                    <p className="text-surface-500 text-sm font-mono">{job.period}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-8">
                  {job.highlights.map((item, i) => (
                    <li key={i} className="text-gray-400 flex items-start gap-2">
                      <span className="text-neon-500 mt-1.5 flex-shrink-0">&#9656;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-6">
            <span className="text-surface-500">{'// '}</span>{'education'}
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="terminal-card">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-neon-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-200">{edu.degree}</h3>
                    <p className="text-cyber-400 text-sm">{edu.institution}</p>
                    <p className="text-gray-400 mt-1">{edu.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-6">
            <span className="text-surface-500">{'// '}</span>{'skills'}
          </h2>
          <div className="terminal-card">
            <div className="space-y-3">
              {skillGroups.map((group) => (
                <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                  <span className="text-neon-400 font-mono font-bold text-sm w-24 flex-shrink-0">
                    {group.label}:
                  </span>
                  <span className="text-gray-400">{group.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
