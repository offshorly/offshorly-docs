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

#### JavaScript

##### _AI_

- [Print in Javascript](https://github.com/offshorly/offshorly-docs/tree/main/content/JavaScript/AI/Print%20in%20Javascript%20(a5279ac8-0c83-47f5-a421-c698713f8233).md)

##### _Web_

- [Authentication in Express](https://github.com/offshorly/offshorly-docs/tree/main/content/JavaScript/Web/Authentication%20in%20Express%20(f62186e0-1d99-4473-b8d3-4b21c6104754).md)

#### Python

##### _AI_

- [How to setup Postgres in Docker](https://github.com/offshorly/offshorly-docs/tree/main/content/Python/AI/How%20to%20setup%20Postgres%20in%20Docker%20(1f6bdb55-2d5f-4e98-9de3-304897dc0a6b).md)

- [Print in Python](https://github.com/offshorly/offshorly-docs/tree/main/content/Python/AI/Print%20in%20Python%20(196fdc1c-9adc-46a4-8534-3c3d829e937b).md)
  