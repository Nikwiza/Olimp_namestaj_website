# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React website for Olimp, a Serbian carpentry business (est. 1996). Emphasis on heritage, craftsmanship, and trust.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview build
```

## Stack

React 19 + Vite 7 + TailwindCSS 4

## Context Directory

**Read before any UI/design work:**

| File | Use When |
|------|----------|
| `context/design-principles.md` | First stop - routes you to correct context |
| `context/brand-story.md` | Copy, tone, visual guidelines, trust signals |
| `context/examples.md` | Reference URLs for MCP screenshot analysis |

## Structure

```
src/
├── main.jsx, App.jsx     # Entry points
├── index.css             # Global styles
└── assets/images/Gallery # Project photos by room type

context/                  # READ BEFORE BUILDING
last-site-example/        # Previous site reference
```

## Design Essentials

- Generous whitespace, large imagery, minimal text
- Classic typography, warm wood tones
- "Est. 1996" and "28+ years" as trust anchors
- Let the work speak - photos over words
