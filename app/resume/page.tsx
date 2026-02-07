import type { Metadata } from 'next'
import { Download, Briefcase, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Chase Dovey — AI Architect & Cloud Engineer.',
  openGraph: {
    title: 'Resume',
    description: 'Resume of Chase Dovey — AI Architect & Cloud Engineer.',
  },
  alternates: {
    canonical: '/resume/',
  },
}

const experience = [
  {
    title: 'AI Architect',
    company: 'HiddenLayer',
    period: 'Oct 2025 – Present',
    highlights: [
      'Collaborate with organizations to design secure AI applications and agents, ensuring robust architecture',
      'Develop seamless integrations into AI applications, enhancing secure user experiences and functionality',
      'Engineer hardened generative AI workloads to optimize performance and security in production',
    ],
  },
  {
    title: 'Founder',
    company: 'Average Joes Lab',
    period: 'Jul 2025 – Present',
    highlights: [
      'Founded Average Joes Lab to create a community-driven platform for accessible scientific research',
      'Developed a Research Engineering Learning Path, empowering newcomers to become independent scientists',
      'Built an open-source platform facilitating collaborative projects in AI, ML, and various scientific fields',
      'Advocated for open science practices, promoting transparency and community peer review',
    ],
  },
  {
    title: 'Co-Founder',
    company: 'Chasing Cloud Careers',
    period: 'Aug 2023 – Present',
    highlights: [
      'Co-founded Chasing Cloud Careers, focusing on accessible engineering education',
      'Curated free learning resources into structured paths for various engineering roles',
      'Mentored professionals in career transitions, fostering a supportive learning community',
      'Developed self-directed learning approaches that empower individuals to explore technology careers',
    ],
  },
  {
    title: 'Senior Content Developer',
    company: 'Microsoft',
    period: 'Aug 2024 – Oct 2025',
    highlights: [
      'Spearheaded technical enablement for Azure Container Registry (ACR) on Microsoft Docs, integrating AI-driven workflows with cloud architecture expertise',
      'Designed and published scenario-driven content, reaching over 500K developers monthly',
      'Developed an AI-powered authoring pipeline, reducing content creation time from 3 days to under 5 minutes',
    ],
  },
  {
    title: 'Training Architect - Azure',
    company: 'A Cloud Guru | Pluralsight',
    period: 'Jun 2021 – Aug 2024',
    highlights: [
      'Promoted to Training Architect, overseeing course design, video delivery, and cloud lab engineering for Azure certification',
      'Authored 9 certification courses, achieving over 20.8M minutes viewed and a 4.1/5 learner rating',
      'Developed 50+ auto-provisioned labs, enabling 175K+ completions while reducing setup time by 90%',
    ],
  },
  {
    title: 'Associate Training Architect - Azure',
    company: 'A Cloud Guru | Pluralsight',
    period: 'Jul 2020 – Jun 2021',
    highlights: [
      'Designed and developed hands-on labs and foundational courses for Microsoft Azure training',
      'Authored key certification prep materials, including Azure Administrator (AZ-104) courses',
      'Implemented interactive content improvements, significantly increasing learner retention and engagement',
    ],
  },
  {
    title: 'Quality Documentation Analyst',
    company: 'A Cloud Guru | Pluralsight',
    period: 'Dec 2019 – Jul 2020',
    highlights: [
      'Owned the technical QA process for certification-aligned content across Linux, AWS, and cybersecurity domains',
      'Audited over 150 hours of content, resolving ~1,300 tickets and enhancing course ratings from 4.3 to 4.6',
      'Authored and refreshed 400+ exam assets, boosting learner pass rates by 10% for key certifications',
      'Developed a scalable QA workflow in Zendesk, reducing ticket turnaround from 7 days to 2, achieving 99% SLA',
    ],
  },
  {
    title: 'Principal Cloud Architect',
    company: 'CBTS',
    period: 'May 2023 – Jul 2024',
    highlights: [
      'Promoted to Principal Cloud Architect, focusing on AI/LLM-driven architectures and enterprise AI adoption',
      'Designed and implemented cloud-native PoCs using Hugging Face NLP models for various business applications',
      'Conducted hands-on workshops and advised executives on scaling AI workloads across secure, multi-cloud platforms',
      'Delivered 13 enterprise projects, averaging $94K per engagement, enhancing modernization and AI-enabled architecture',
    ],
  },
  {
    title: 'Senior Cloud Architect',
    company: 'CBTS',
    period: 'Sep 2021 – May 2023',
    highlights: [
      'Designed and implemented secure, scalable cloud solutions on Azure and AWS for migrations and modernization',
      'Delivered enterprise-ready architectures focusing on IaC automation, reliability engineering, and performance optimization',
      'Engineered reusable IaC patterns, reducing deployment errors by 40% and provisioning effort significantly',
      'Mentored engineers and created a knowledge base, enhancing global support coverage and response times',
    ],
  },
  {
    title: 'Jr. Systems Administrator',
    company: 'Endurance International Group',
    period: 'Sep 2018 – Jun 2019',
    highlights: [
      'Supported shared, VPS, and dedicated hosting environments for over 600 SMB customers in a 24/7 operations team',
      'Resolved ~105 support tickets monthly with a 96% customer satisfaction rate',
      'Automated repetitive tasks using Bash, reducing average ticket handle time by 18%',
      'Executed zero-downtime migrations for 80+ WordPress sites, ensuring SLA compliance',
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
  { label: 'Cloud', items: 'Azure, AWS, Kubernetes, Docker, Cloud Architecture, Multi-Cloud' },
  { label: 'AI/ML', items: 'LLMs, RAG, AI Agents, Prompt Engineering, Data Science, Hugging Face' },
  { label: 'DevOps', items: 'Terraform, GitHub Actions, CI/CD, Linux, Bash, Monitoring' },
  { label: 'Dev', items: 'Python, TypeScript, Next.js, React, Node.js, Go' },
  { label: 'Research', items: 'Research Methodologies, Technical Writing, Open Science, Community Building' },
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
              Chase Dovey — AI Architect &amp; Cloud Engineer
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
              AI architect and cloud engineer with a track record spanning secure AI application design, enterprise cloud architecture, and technical education at scale. Currently building hardened generative AI workloads at HiddenLayer. Previously designed content reaching 500K+ developers monthly at Microsoft, authored courses with 20.8M+ minutes viewed at A Cloud Guru, and delivered 13 enterprise AI/cloud projects at CBTS. Passionate about open science, accessible education, and community-driven learning.
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
