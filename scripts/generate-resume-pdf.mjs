import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const data = JSON.parse(readFileSync(join(process.cwd(), 'lib', 'resume-data.json'), 'utf-8'))

const certsList = data.certifications.flatMap((g) =>
  g.items.map((item) => `${item} (${g.category})`)
)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10.5pt;
    line-height: 1.4;
    color: #1a1a1a;
    padding: 0.5in 0.6in;
  }
  h1 { font-size: 20pt; margin-bottom: 2pt; }
  .contact { font-size: 9.5pt; color: #444; margin-bottom: 12pt; }
  .contact a { color: #444; text-decoration: none; }
  h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    border-bottom: 1.5pt solid #1a1a1a;
    padding-bottom: 2pt;
    margin-top: 12pt;
    margin-bottom: 6pt;
  }
  .job { margin-bottom: 8pt; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title { font-weight: bold; font-size: 10.5pt; }
  .job-company { font-style: italic; }
  .job-period { font-size: 9.5pt; color: #555; white-space: nowrap; }
  ul { margin: 3pt 0 0 18pt; }
  li { margin-bottom: 1.5pt; }
  .skills-row { margin-bottom: 2pt; }
  .skills-label { font-weight: bold; }
  .certs { columns: 2; column-gap: 20pt; }
  .certs li { font-size: 9.5pt; break-inside: avoid; }
  .volunteer { margin-bottom: 2pt; }
  p.summary { margin-bottom: 4pt; font-size: 10pt; }
</style>
</head>
<body>

<h1>${data.name}</h1>
<div class="contact">
  ${data.location} &nbsp;|&nbsp;
  <a href="mailto:${data.email}">${data.email}</a> &nbsp;|&nbsp;
  <a href="${data.website}">${data.website.replace('https://', '')}</a> &nbsp;|&nbsp;
  <a href="${data.linkedin}">LinkedIn</a> &nbsp;|&nbsp;
  <a href="${data.github}">GitHub</a>
</div>

<h2>Summary</h2>
<p class="summary">${data.summary}</p>

<h2>Experience</h2>
${data.experience
  .map(
    (job) => `
<div class="job">
  <div class="job-header">
    <div><span class="job-title">${job.title}</span> — <span class="job-company">${job.company}</span></div>
    <span class="job-period">${job.period}</span>
  </div>
  <ul>
    ${job.highlights.map((h) => `<li>${h}</li>`).join('\n    ')}
  </ul>
</div>`
  )
  .join('\n')}

<h2>Certifications</h2>
<ul class="certs">
  ${certsList.map((c) => `<li>${c}</li>`).join('\n  ')}
</ul>

<h2>Volunteer</h2>
<div class="volunteer">
  <div class="job-header">
    <div><span class="job-title">${data.volunteer.title}</span> — <span class="job-company">${data.volunteer.organization}</span></div>
    <span class="job-period">${data.volunteer.period}</span>
  </div>
  <p style="margin-top: 2pt;">${data.volunteer.description}</p>
</div>

<h2>Skills</h2>
${data.skillGroups
  .map(
    (g) => `<div class="skills-row"><span class="skills-label">${g.label}:</span> ${g.items}</div>`
  )
  .join('\n')}

</body>
</html>`

// Generate PDF with Playwright
const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
const pdfBuffer = await page.pdf({
  format: 'Letter',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
})
await browser.close()

const outDir = join(process.cwd(), 'public', 'resume')
mkdirSync(outDir, { recursive: true })
const outPath = join(outDir, 'chase-dovey-resume.pdf')
writeFileSync(outPath, pdfBuffer)
console.log(`Resume PDF generated: ${outPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`)
