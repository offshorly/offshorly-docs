# Offshorly Docs

---

## Description

This serves as an repository for sharing notes between Offshorly developers.

## Development

This project has helper functions for linting markdown files which is necessary to make the content consistent across different files.

### Prerequisites

- It is recommended to use **VSCode** as the code editor of choice as there are extensions that are needed to lint markdown errors. Download VSCode [here](https://code.visualstudio.com/download)

- It is recommended to use **PNPM**. download PNPM [here](https://pnpm.io/installation)

To start the development app, follow these commands:

1. Use proper Node version
    It is recommended to use nvm to quickly change node versions. This command will use the indicated Node version in the `.nvmrc` file.

        nvm use

2. Install dependencies:

        pnpm i

3. Start development app:

        pnpm dev

this should start the dev app and rebuild the app for changes

You can also start the development app with readme rewrites enabled by using the command:

        pnpm dev:overwrite

With this, you can start writing content that will be validated on save.

Note: **DO NOT COMMIT THE README FILE**. The readme file will be overwritten once your PR is accepted to the main branch.

---

### Table of Contents

- [placeholder](https://github.com/jasonoffshorlydev/offshorly-docs/tree/main/content/placeholder.md)
  