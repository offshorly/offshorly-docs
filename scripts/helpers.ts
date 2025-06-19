import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

function hasAnyArrayWithValues<T>(arrayOfArrays: T[][]) {
  return arrayOfArrays.some((innerArray) => innerArray.length > 0)
}

function generateVSCodeLink(filePath: string) {
  const absolutePath = path.resolve(filePath)
  return `"vscode://${absolutePath}"`
}

interface GroupedData {
  [category: string]: GroupedData | string[]
}

function groupByCategories(data: string[][]): GroupedData {
  return data.reduce((acc: GroupedData, item: string[]) => {
    const lastElement = item.pop() as string
    let currentLevel = acc

    item.forEach((category) => {
      if (!currentLevel[category]) {
        currentLevel[category] = {}
      }
      currentLevel = currentLevel[category] as GroupedData
    })

    if (!currentLevel['_items']) {
      currentLevel['_items'] = []
    }

    ;(currentLevel['_items'] as string[]).push(lastElement)

    return acc
  }, {})
}

function transformFilename(filename: string): string {
  return filename.split('(')[0].replace('.md', '').trim()
}

function generateGitHubMarkdownList(
  obj: GroupedData,
  pathPrefix: string = '',
  isSubCategory: boolean = false,
): string {
  let markdown = ''

  Object.keys(obj).forEach((key) => {
    if (key === '_items') {
      const items = (obj[key] as string[])
        .map((item) => {
          const itemPath = `${pathPrefix}/${item}`
          return `- [${transformFilename(item)}](${new URL(itemPath).toString()})`
        })
        .join('\n')

      markdown += `\n${items}\n`
    } else {
      markdown += `\n${isSubCategory ? `##### _${key.replaceAll('#', '\\#')}_` : `#### ${key.replaceAll('#', '\\#')}`}\n`
      markdown += generateGitHubMarkdownList(
        obj[key] as GroupedData,
        `${pathPrefix}/${key}`,
        true,
      )
    }
  })

  return markdown.trim()
}

async function installVsCodeExtension(extensions: string[]) {
  try {
    for (const extension of extensions) {
      const { stdout } = await execAsync(
        `code --install-extension ${extension}`,
      )
      console.log(`Successfully installed ${extension}:`, stdout)
    }
  } catch (error) {
    console.error('Error during installation:', error)
  }
}

export {
  generateGitHubMarkdownList,
  generateVSCodeLink,
  groupByCategories,
  hasAnyArrayWithValues,
  installVsCodeExtension,
}
