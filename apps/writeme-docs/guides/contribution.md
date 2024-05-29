---
sidebar_position: 3
---

# Contribution

:::note
The following guide will take you through the steps of contributing by starting to work on the NavBar component.

If you have not **[setup GitHub](/docs/guides/github-setup)** or **[Installed Tools](/docs/guides/tool-installation)** please do so before hand.
:::

## Opening Issues

:::info
issues should be opened for 3 reasons.

1. There's a bug code that has already been merged into `dev` and you aren't sure how to fix it.
2. You would like to get the teams input on an idea you have.
3. It represents an important task in terms of our deadlines or feature that has already been agreed upon.

:::

### Steps

1. Create a [new issue](https://github.com/COS301-SE-2024/WriteMe/issues)

2. Choose a issue template and fill it in

## Feature Branching Lifecycle

1. You have assigned or have been assigned an Issue.

2. You need to create a "feature" branch off of `dev`, in which you work on your issue.

    - In VS Code:
    ![switch to dev](../assets/contribution/branching1.webp)
    - Now sync remote changes to dev, to our local dev branch

    ![sync remote changes](../assets/contribution/branching2.webp)

    - Since we now have an up-to-date local dev branch, create a feature branch off of it. (Click `dev` and refer to "3." for the first image).

    - When prompted for a branch name, name it something to do with the issue you working on, **prefixed with `feat/`**

3. Now you have a branch to work in, I'll generate a new component using `nx` refer to this [guide](/docs/guides/nx#generating-new-components) for more.

4. Once you would like to "save you progress" or have completed a task. Select appropriate changed files and commit your code.
Commit messages should follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
![commit example](../assets/contribution/commit%20eg.webp)

5. Once commit you can choose to push or publish to Github.

    :::note
    This is very helpful when switching between computers or for pair programming.
    :::

    ![push branch](../assets/contribution/push%20branch.webp)

6. Once you have completed your feature and think your code is ready for production. Push any remaining commits to your branch. And then go find you branch on GitHub, to **open a pull request**.

    - Find and open you branch on GitHub
    ![find branch](../assets/contribution/pr%201.webp)

    - Contribute -> Open Pull Request
    ![open pr](../assets/contribution/pr%202.webp)

    - Give PR a meaningful name & fill in the following template:

    :::note
    Our version of GitHub only allows one reviewer🥲.

    Please use "@" mentions to add other reviewers.

    You can also "#" reference the issue number the pull request is for.
    :::

    ```md
    **Include an informative name explaining why the request is necessary**

    **Check the following**
    - [ ] Not merging to main
    - [ ] Added peer as reviewer
    - [ ] If pull request to dev, devops added as reviewer
    - [ ] Does the pull request require testing?
    - [ ] Have you added tests. If so, list them.

    ```

    ![pr template](../assets/contribution/pr%203.webp)

7. Wait for CI tests to complete and for reviewers, if the tests fail or the are changes requested by reviewers, then make the changes and push the new commits to the same branch. The tests will re-run automatically and the reviewers maybe notified. This process keeps happening until there are no more changes. At which points devops will merge the branch into dev.

8. You are free to tackle the next issue🥳
