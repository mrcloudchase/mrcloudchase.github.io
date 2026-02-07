import type { Metadata } from 'next'
import { Download, Briefcase, GraduationCap, Heart } from 'lucide-react'
import resumeData from '@/lib/resume-data.json'

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${resumeData.name} — ${resumeData.title}.`,
  openGraph: {
    title: 'Resume',
    description: `Resume of ${resumeData.name} — ${resumeData.title}.`,
  },
  alternates: {
    canonical: '/resume/',
  },
}

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
              {resumeData.name} — {resumeData.title}
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
              {resumeData.summary}
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
            {resumeData.experience.map((job, index) => (
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
                    <li key={i} className="text-gray-400 flex items-center gap-2">
                      <span className="text-neon-500 flex-shrink-0 text-xs">&#9656;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-6">
            <span className="text-surface-500">{'// '}</span>{'certifications'}
          </h2>
          <div className="space-y-6">
            {resumeData.certifications.map((group, index) => (
              <div key={index} className="terminal-card">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-neon-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-200">{group.category}</h3>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="text-gray-400 flex items-center gap-2">
                          <span className="text-neon-500 flex-shrink-0 text-xs">&#9656;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 font-mono mb-6">
            <span className="text-surface-500">{'// '}</span>{'volunteer'}
          </h2>
          <div className="terminal-card">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-neon-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-200">{resumeData.volunteer.title}</h3>
                <p className="text-cyber-400 text-sm">{resumeData.volunteer.organization}</p>
                <p className="text-surface-500 text-sm font-mono">{resumeData.volunteer.period}</p>
                <p className="text-gray-400 mt-2">{resumeData.volunteer.description}</p>
              </div>
            </div>
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
              {resumeData.skillGroups.map((group) => (
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
