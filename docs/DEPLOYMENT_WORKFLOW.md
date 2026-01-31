# Deployment & Release Workflow

## Overview

This project uses **Vercel** for hosting and CI/CD. The workflow is designed to be fully automated, ensuring every change is tested before going live.

---

## 1. Environments

| Environment    | Branch            | URL pattern                     | Purpose                                                                          |
| :------------- | :---------------- | :------------------------------ | :------------------------------------------------------------------------------- |
| **Preview**    | `feat/*`, `fix/*` | `project-git-branch.vercel.app` | Testing individual features immediately. Created automatically for every Pus/PR. |
| **Staging**    | `staging`         | `staging.anitadajkawedding.com` | Final integration test before live. (Optional step)                              |
| **Production** | `main`            | `anitadajkawedding.com`         | The live site. Deployment happens automatically on merge.                        |

---

## 2. Development Lifecycle

### Step 1: Feature Branch

Always start from `main` and create a new branch:

```bash
git checkout -b feat/image-gallery
# ... make changes ...
```

### Step 2: Commit & Push

Use **Conventional Commits** (enforced by husky):

```bash
git commit -m "feat: add masonry layout for gallery"
git push origin feat/image-gallery
```

### Step 3: Pull Request & Preview

Open a Pull Request (PR) on GitHub.

- **Vercel Bot** will comment with a "Preview URL".
- Check this URL to verify your changes online.
- Send this URL to Anita/Reviewers for feedback.

### Step 4: Release & Merge

When the feature is approved:

1.  **Release** (Optional, for versioning):
    ```bash
    bun run release
    git push --follow-tags origin HEAD
    ```
2.  **Merge** the PR into `main`.
3.  Vercel automatically deploys the new version to Production.

---

## 3. Tooling

- **Linting/Formatting**: Runs automatically on commit (`husky` + `lint-staged`).
- **Versioning**: `standard-version` handles semantic versioning and CHANGELOG.md.
- **CI**: Vercel runs build checks before deployment.
