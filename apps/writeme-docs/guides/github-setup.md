---
sidebar_position: 1
---

# GitHub Setup

> This tutorial will assume you are working within WSL.
> Any reference to terminal is just a wsl instance

## With VS Code

- Click the Profile Icon in the bottom left.

- Login to your GitHub account

- Open a new window inside WSL

- Open the source control tab on the left

- Clone repo from Github

## Installing Github-Cli

- copy & paste
- after installing, you may have to open a new terminal

```shell
sudo mkdir -p -m 755 /etc/apt/keyrings && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
```

## Create a Github Token

- navigate to <https://github.com/settings/tokens>
- click on **generate new token (classic)**

![generate new token -> Generate new token (classic)](../assets/github%20generate%20token.jpg)

- add name, expiry date (till at least after mini project)
- select the following permissions

![select minimum permissions](../assets/token%20minimum%20permissions.png)

- click generate, but **don't close the page**

## Login to Github Account

- inside a terminal:

```shell
gh auth login
```

- Select "Github.com" when prompted
- Select either SSH or HTTPS
- Once Prompted with the options "Login with web browser" or "Paste Authentication token"
  - **Choose Paste Authentication Token**
  - Paste the token from previous step
