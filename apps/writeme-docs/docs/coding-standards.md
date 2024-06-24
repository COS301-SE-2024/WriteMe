# WriteMe Coding Standards Document
1. [Code Style](#code-style)
2. [Naming Conventions](#naming-conventions)
3. [Comments](#comments)
4. [Error Handling](#error-handling)
5. [Linting & Formatting](#linting--formatting)
6. [File Structure](#file-structure)
7. [Branching](#branching)
8. [Commits & Pull Requests](#commits--pull-requests)

## Introduction

This document outlines the coding conventions and styles that our team follows to ensure our code is uniform, clear, flexible, reliable, and efficient. Adhering to these standards will help maintain consistency across our codebase, making it easier to read, maintain, and collaborate on projects.

## General Conventions
### Code Style
<ol className="srs-bullets">
  <li><strong>Indentation: </strong>We use tabs for indentation with a length of two spaces.</li>
  <li><strong>Line Length: </strong>Limit lines to 80 characters. This improves readability and makes it easier to have multiple files open side by side.</li>
  <li><strong>Semicolons: </strong>Always use semicolons to terminate statements.</li>
  <li><strong>Quotes: </strong>Use single quotes for strings, except to avoid escaping.</li>
  <li><strong>Trailing Commas: </strong>Use trailing commas where valid in multi-line constructs (e.g., arrays, objects).</li>
</ol>

### Naming Conventions
<ol className="srs-bullets">
  <li><strong>Variables: </strong>Use <em>camelCase</em> for variable names.</li>
  <li><strong>Constants: </strong>Use <em>UPPER_CASE</em> for constant values</li>
  <li><strong>Functions: </strong>Use <em>camelCase</em> for function names.</li>
  <li><strong>Classes: </strong>Use <em>PascalCase</em> for class names.</li>
  <li><strong>Files: </strong>Use <em>kebab-case</em> for filenames.</li>
</ol>

### Comments
<ol className="srs-bullets">
  <li><strong>Single Line Comments: </strong>Use ' // ' for single-line comments.</li>
  <li><strong>Multi-line Comments: </strong>Use ' /* ... */ ' for multi-line comments.</li>
  <li><strong>Documentation Comments: </strong>Use ' [//]: #comment ' for comments made in documentation.</li>
</ol>

```javascript

//Comments Example
/**
 * Function to add two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @return {number} The sum of the two numbers.
 */
function add(a, b) {
  return a + b;
}

```

## Error Handling
For error handling, <em>try-catch-finally</em> statements are used to ensure that errors are properly caught and handled, and any necessary cleanup is performed.

```javascript

try {
  // Code that might throw an error
} catch (error) {
  // Handle the error
} finally {
  // Code that will run regardless of an error occurring
}

```

## Linting & Formatting
We use **[Prettier](https://prettier.io/)** for code formatting to enforce a consistent style across our codebase. The configuration for Prettier is as follows:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true
}

```

Prettier is integrated into each of our IDEs and configured to save on format, making it easier to maintain consistency automatically.

## File Structure
The repository follows a structured and logical file organization to make navigation intuitive and to segregate different types of files effectively. Below is the standard file structure for our projects:

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

## Branching Strategy
Our branching strategy is designed to ensure a smooth workflow and maintain the stability of the main codebase.

### Branching
**Main Branch:**  The *main* branch contains the stable, production-ready code.
**Development Branch:** The *dev* branch is the primary branch for ongoing development.
**Feature Branches:** Developers should create feature branches from dev for new features, bug fixes, or any significant work. The naming convention for feature branches is *feat/feature-name*.

### Process
<ol className="srs-bullets">
  <li><strong>Branch Off: </strong>Always branch off <em>dev</em> for new work.</li>
  <li><strong>Commits: </strong>Commit changes regularly to your feature branch. Small, frequent commits make it easier to track changes and roll back if needed.</li>
  <li><strong>Pull Requests: </strong>Once the feature is complete, create a pull request (PR) from your feature branch to <em>dev</em>.
  At least one reviewer is required to review and approve the PR before it can be merged.</li>
  <li><strong>Merge: </strong>After approval, merge the feature branch into <em>dev</em>. Resolve any conflicts that arise during merging.</li>
</ol>

## Commits & Pull Requests
* **Commit Messages:** Write clear, concise commit messages that describe the changes made. Use the following format:
feat(*type*): *detailed message*
  * **Type:** Indicates the type of change (e.g. fix, docs, style, refactor, test, chore, component, page).
**Example:**
  ```java
  feat(fix): fixed an error in the SignUp component that allowed duplicate email registration.
  ```
* **Pull Requests:**
<ol className="srs-bullets">
  <li><strong>Description:</strong> Provide a detailed description of the changes made in the pull request.</li>
  <li><strong>Review:</strong> Ensure that at least one team member reviews and approves the PR.</li>
  <li><strong>Testing:</strong> Make sure all tests pass before merging the PR.</li>
</ol>
