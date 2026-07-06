<!-- BEGIN:nextjs-agent-rules -->

For detailed guidance on any topic, refer to the modular documentation in the '/docs' directory. It is incredibly important that you ALWAYS read the relevant individual instructions files in '/docs' BEFORE generating any code or making implementation changes.

# Agent Instructions for linkshortenurlproject

This repository is a Next.js App Router project using TypeScript, Tailwind CSS, and Clerk authentication. Follow these instructions whenever you modify code or add features.

## Project Overview
- This app is a lightweight Next.js application with authentication and a simple public landing experience.
- The primary app entry points are under the app/ directory.
- Authentication is handled through Clerk and should remain consistent with the current setup.

## Core Expectations
- Prefer the App Router patterns used in this repository over legacy Pages Router conventions.
- Use TypeScript and keep components, props, and data flow explicit.
- Keep UI changes small, readable, and consistent with the existing Tailwind-based styling.
- Preserve the current Clerk integration unless a task explicitly requires changing it.

## File Conventions
- Place route pages in app/ with the App Router folder structure.
- Keep route-specific UI in page.tsx files or local components within the same route folder.
- Use server components by default; only introduce client components when interactivity truly requires it.
- Keep shared layout and global configuration in app/layout.tsx and app/globals.css.
- Place project-specific guidance in docs/ and keep it separate from runtime code.

## Styling and UI
- Use Tailwind utility classes for layout, spacing, colors, and responsiveness.
- Favor simple, polished UI over overly complex abstractions.
- Preserve the current visual tone unless the task explicitly asks for a redesign.

## Authentication
- Clerk should remain the source of truth for sign-in, sign-up, and user session handling.
- Use the Clerk SDK patterns already present in the app.
- Do not expose secret keys in client code or commit secrets to the repository.
- Keep sign-in and sign-up routes available and functioning when modifying auth-related files.

## Data and Environment
- Respect environment variables and avoid introducing hard-coded secrets.
- Prefer existing config patterns over adding new infrastructure unless required by the task.
- Keep .env.local values local and uncommitted unless the user explicitly requests otherwise.

## Workflow Expectations
- Before making changes, inspect the relevant files and understand the current structure.
- Prefer minimal, targeted edits over large rewrites.
- Verify changes with the relevant build or test command when possible.
- If a task changes behavior, explain the impact clearly and keep the implementation consistent with the repository.

## Documentation Rules
- Keep instructions, conventions, and implementation notes in the docs/ directory when they are project-specific.
- If a new standard or workflow becomes important for future agents, add or update a markdown file in docs/ rather than leaving the guidance only in chat history.

## Important Notes
- This project uses Next.js 16 and may have breaking changes compared with older Next.js examples.
- Follow the current installed package APIs and avoid assuming older documentation patterns.
- If a dependency API differs from examples you know, verify the installed package behavior before implementing.
<!-- END:nextjs-agent-rules -->
