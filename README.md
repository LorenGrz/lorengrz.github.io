# Loren Portfolio

Personal portfolio built with Next.js and TypeScript.

This project presents a collection of full-stack work built with technologies such as React, TypeScript, Kotlin, and Spring Boot. The goal is to show practical engineering decisions through scalable, maintainable, and user-focused web applications.

## Tech Stack

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## Available Scripts

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Project Notes

- The app uses the Next.js App Router in `src/app`.
- Components should stay server-rendered by default.
- Client components should be used only when interactivity or browser APIs require them.
- Repository-specific agent context lives in `.agents/CONTEXT.md`.
