---
sidebar_position: 2
---

# Tools Installation

:::note

All mentions of **terminal** indicate a WSL terminal instance.

:::

:::info
There are only three tools that need to be installed manually

The rest are installed using `pnpm i`
:::

## [fnm](https://github.com/Schniz/fnm)

:::info
[fnm](https://github.com/Schniz/fnm) is a **node version manager** and ensures we all use the same node version to avoid any incompatibilities.
:::

### Installation

1. install it by running

    ```shell
    curl -fsSL https://fnm.vercel.app/install | bash
    ```

2. After completion: **close and restart the terminal**

3. Assuming you have cloned the repository, if not refer to the following [guide](/docs/guides/github-setup). **c**hange **d**irectory into the `WriteMe` directory (`cd WriteMe`) and run:

    ```shell
    fnm install
    ```

4. Again you may need to restart the terminal after which run:

    ```shell
    node --version
    ```

    and confirm version is **v20.11.1**

5. (Optional) if you have multiple node version on your machine, you may need to run

```shell
fnm use v20.11.1
```

## [pnpm](https://pnpm.io/)

:::info
pnpm is our **node package manager** and is a drop in replacement for the default **n**ode **p**ackage **m**anager (`npm`).

pnpm is built in rust and implements caching natively resulting in faster installation times than (`npm`).
:::

:::note
Most documentation will use `npm` commands like `npm install react`. Just replace `npm` with `pnpm` for our use case.(`pnpm install react`).

Conversion between `npm` and `pnpm`:

`npm install ...` -> `pnpm install ...`

`npx ....` -> `pnpm dlx ...`
:::

### [Installation](https://pnpm.io/installation)

1. Run the following in a terminal:

    ```shell
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    ```

2. After completion: **close and restart the terminal**
3. Assuming you have cloned the repository, if not refer to the following [guide](/docs/guides/github-setup). **c**hange **d**irectory into the `WriteMe` directory (`cd WriteMe`)

4. **Node dependencies installation**

    :::info
    This command will install all our projects other tools and dependencies (`nx`, `supabase`, `react`,...), a full list can be found in [`package.json`](https://github.com/COS301-SE-2024/WriteMe/blob/main/package.json), into the `node_modules` folder.

    This command should only ever be run in the *root of our project*
    :::

In a terminal run:

```shell
pnpm install # or pnpm i
```

## Docker

:::info
Think of docker "containers" as light-weight virtual machines the hook onto the host's operating system instead of recreating the entire machine.

`supabase-cli` (the local version of supabase) uses docker under the hood to virtualise a supabase server on the local machine, thus development does not affect the production environment
:::

:::warning
docker may be light-weight compared to normal virtual machines, but supabase runs multiple docker containers for all it's different sub-systems. As such running the local supabase server will be **resource intensive**.
:::

### Docker Installation

:::note
docker is installed in windows (or Mac), **not in WSL**, but integrates with WSL (or not 🍎🙃@James).
:::

1. Navigate browser to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Download for Windows (or Mac), **not Linux**
3. Run through installation process
4. Restart Computer

#### Alternatively

1. Run the following in **powershell**, admin may be required

```powershell
winget install -e --id Docker.DockerDesktop
```
