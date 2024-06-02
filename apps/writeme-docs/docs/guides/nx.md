---
sidebar_position: 5
---

# Befriending Nx

:::info
nx is a monorepo management tool, useful for giving our project structure, CI/CD tasks, generating code, and running tests and live servers locally.
:::

:::warning
Only run nx commands from the terminal if you are in the root of the project. That is the "WriteMe" folder and not any of it's sub directories.
:::

## Generating new components

:::warning
Only run nx commands from the terminal if you are in the root of the project. That is the "WriteMe" folder and not any of it's sub directories.
:::

### Terminal (recommended)

- to generate a new react/next component using nx you can run:

```shell
nx g @nx/next:component <ComponentName> --project=wmc

#eg.
# nx g @nx/next:component NavBar --project=wmc
```

- select the **css** styling option
- select the **derived** path



- now inside the `wmc` folder you should see your new component.


- `<Component>.spec.tsx` - is the test file for that component
- `<Component>.tsx` - is the component itself

There is one file **missing** the `<Component>.stories.tsx` file for storybook. Refer to this [guide](/docs/guides/storybook#storybook-stories).

## Nx Console (plugin)

:::warning
Nx console (vs code plugin) should not be used for generation as it's a bit buggy when specifying a project.
:::

:::note
running tests locally should ensure that you don't fail the CI tests on Github
:::



The most important **tasks** for local dev are:

`writeme`:

- dev (will start our next app on port 3000)
- test (will run all jest tests)
- lint (will run linter)

`wmc`:

- storybook (will start the story book server on a random port)
- test (will run all jest tests)
- lint (will run linter)

`writeme-docs`:

- serve (will start the documentation server on port 3001)

`writeme-e2e`:

- e2e (will run all end-to-end tests on next app)

### using Nx (cli)

```shell
nx run <project-name>:<task-name>
#eg.
#nx run writeme-docs:serve
# if nx is not installed globally the following would also work
# pnpm exec nx writeme-docs:serve
```
