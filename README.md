# Anita Dajka Wedding - Frontend

A modern, high-performance photography portfolio website built with Next.js and Sanity CMS.
Designed to replace the previous Showit site with a faster, more flexible, and SEO-friendly solution.

## 🚀 Tech Stack

## 📚 Documentation

- [How the Contact System Works](docs/CONTACT_SYSTEM_HU.md) (Kapcsolati űrlap működése)

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **CMS Client:** `next-sanity`
- **Package Manager:** Bun
- **Tooling:** ESLint, Prettier, Husky, Commitlint, Standard Version

## 🛠️ Getting Started

### 1. Prerequisites

- [Bun](https://bun.sh/) installed locally.
- Access to the Sanity project (Project ID in environment variables).

### 2. Installation

```bash
# Install dependencies
bun install
```

### 3. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the required values in `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity Project ID
- `NEXT_PUBLIC_SANITY_DATASET`: `production` or `development`
- `SANITY_API_TOKEN`: Sanity API token with write permissions (for contact form)
- `RESEND_API_KEY`: API key for Resend email service
- `CONTACT_TO_EMAIL`: Email address to receive inquiries

### 4. Running Locally

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📜 Scripts

| Command | Description |
| hum | hum |
| `bun dev` | Start development server |
| `bun run build` | Build the application for production |
| `bun run postbuild` | Generates sitemap.xml and robots.txt (runs automatically after build) |
| `bun run lint` | Run ESLint check |
| `bun run format` | Check formatting with Prettier |
| `bun run format:fix` | Fix formatting issues |
| `bun run release` | Generate changelog, bump version, and tag release |

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and Sanity client configuration.
- `public`: Static assets.

## 🤝 Contributing

This project uses **Conventional Commits** (e.g., `feat: add gallery component`, `fix: mobile padding`).
Husky hooks will prevent committing if linting fails or commit messages are invalid.

## License

This repository is published for portfolio and review purposes only.

The source code is not licensed for reuse, redistribution, modification, or commercial use.

All rights reserved.
