# Project: Furniture Landing

## Overview

A premium, minimal furniture studio website with a multi-step
furniture inquiry form and approximate price range estimation.

This is a neutral template intended to be reused by different
furniture workshops.

## Product Scope

The application consists of:

- Marketing landing page
- Furniture categories
- Multi-step inquiry form
- Approximate price range estimation
- WhatsApp inquiry submission

## Explicitly Out of Scope

Do NOT implement:

- Backend
- Database
- Authentication
- Admin dashboard
- CRM
- SaaS functionality
- Form builder
- Drag-and-drop editors
- 3D configurators
- CAD functionality
- AI features

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion for React (`motion`)
- Zustand
- React Hook Form
- Zod
- Lucide React

## Architecture

- Use Next.js App Router.
- Prefer Server Components by default.
- Use Client Components only when interactivity is required.
- Keep components small, reusable, and cohesive.
- Separate business logic from UI.
- Keep form state and pricing logic outside presentation components.
- Avoid unnecessary abstractions.
- Avoid premature optimization.
- Do not install dependencies without a clear reason.

## Design Direction

Create a premium furniture studio experience.

Visual characteristics:

- Warm minimalism
- Editorial typography
- Large, high-quality furniture photography
- Warm white and beige backgrounds
- Graphite text
- Muted olive accents
- Generous whitespace
- Elegant layouts
- Subtle borders
- Refined micro-interactions

Avoid:

- Generic SaaS dashboard aesthetics
- Excessive gradients
- Excessive rounded cards
- Generic AI-generated landing page patterns
- Unnecessary decorative elements
- Excessive animation
- Emoji as UI icons

## UX Requirements

- Mobile-first responsive design
- Accessible interactive elements
- Keyboard navigation
- Visible focus states
- Respect prefers-reduced-motion
- Smooth and meaningful transitions
- Clear visual hierarchy
- No unnecessary loading states

## Development Rules

- Use TypeScript strictly.
- Avoid `any`.
- Keep ESLint clean.
- Keep the application buildable after every task.
- Do not silently modify unrelated files.
- Do not add features outside the current task.
- Do not replace working code without a reason.
- Explain architectural decisions when relevant.

## Git Workflow

- Do not commit automatically.
- Do not push automatically.
- Do not amend commits unless explicitly requested.
- Do not reset or delete user changes.

## Completion Requirements

After implementation:

1. Run ESLint.
2. Run production build.
3. Fix errors introduced by the task.
4. Summarize implemented changes.
5. Mention remaining issues.
