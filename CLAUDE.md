# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Olimp Project is a React-based website for a Serbian carpentry and furniture business founded in 1996. The site emphasizes craftsmanship heritage, quality, and trust built over 28+ years.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build (outputs to dist/)
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- React 19 with Vite 7
- TailwindCSS 4 for styling
- ESLint 9 (flat config) for linting
- PostCSS with Autoprefixer

## Architecture

```
src/
├── main.jsx          # React entry point
├── App.jsx           # Main component
├── index.css         # Global styles
└── assets/images/    # Gallery organized by room type
    ├── Gallery/
    │   ├── Bedrooms/
    │   ├── Kitchens/
    │   ├── LivingRooms/
    │   └── Other/

context/
└── brand-story.md    # Brand guidelines - READ THIS for design decisions

last-site-example/    # Previous website for reference
```

## Brand Guidelines Summary

From `context/brand-story.md` - critical for any UI work:

- **Visual style**: Generous whitespace, high-quality imagery, minimal text, professional animations
- **Typography**: Classic, not trendy
- **Colors**: Warm tones, wood colors, subtle textures
- **Tone**: Confident, warm, direct, authentically Serbian
- **Trust signals**: "Est. 1996" badge, experience counter, real project photos (not stock)
- **Quality focus**: Let the work speak - large images, every word earns its place
