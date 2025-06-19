import fs from 'fs/promises'
import mapContent from './mapContent.js'
;(async function buildReadme() {
  let readme = await fs.readFile('READMEBASE.md', { encoding: 'utf-8' })
  const tableOfContents = mapContent()

  // Append and normalize spacing
  readme += `\n${tableOfContents}`

  readme = readme.replace(/\n{3,}/g, '\n\n')

  await fs.writeFile('README.md', readme)
})()
