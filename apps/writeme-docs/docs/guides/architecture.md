---
sidebar_positions: 6
---

# Architecture

## Tech Stack

- Mono Repository Management ([nx](https://nx.dev/))![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
- Framework ([nextjs](https://nextjs.org/))  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- Unit / Integration Testing   ([jest](https://jestjs.io/)) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- End-to-End / Integration Testing ([cypress](https://www.cypress.io/)) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
- Linting ([eslint](https://eslint.org/))![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
- Documentation: Inline ([jsdoc](https://jsdoc.app/))
- Documentation: Wiki ([markdown](https://www.markdownguide.org/))
- Documentation: Design and Wireframes ([figma](https://www.figma.com/))![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
- Documentation: Components ([Storybook](https://storybook.js.org/))
- Deployment: AWS ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) & Cloudflare Pages ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
- Misc: Package Manager ([pnpm](https://pnpm.io/))
- Misc: Local Development WSL
- Misc: Local Development Docker ([docker](https://www.docker.com/))![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Misc: Commit Standards ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))

## Project Structure

```shell
.
├── apps
│   ├── writeme #Nextjs app
│   │   ├── app
│   │   │   └── api # additional api routes
│   │   ├── public
│   │   └── specs
│   ├── writeme-docs # documentation website
│   │   ├── docs
│   │   ├── guides
│   │   ├── src
│   │   │   ├── components
│   │   │   ├── css
│   │   │   └── pages
│   │   └── static
│   │       └── img
│   └── writeme-e2e # end-to-end tests for writeme app
│       └── src
├── wmc  # components library
│   └── src
└── wmc-utils # utilities for components library
    └── src
```
