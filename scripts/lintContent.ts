import markdownlint from 'markdownlint'

async function lintContent(paths: string[]) {
  const options: markdownlint.Options = {
    files: paths,
    config: {
      MD013: {
        line_length: 250,
      },
      MD024: {
        siblings_only: true,
      },
      MD032: false, // Disable "blanks-around-lists"
      MD022: false, // Disable "blanks-around-headings"
    },
  }

  const result = await markdownlint.promises.markdownlint(options)
  return result
}

export default lintContent
