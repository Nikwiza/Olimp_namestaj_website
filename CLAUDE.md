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

## Agent Workflow: Design-Develop Loop

This project uses an automated iterative workflow between two specialized agents. **Follow this process for all UI work:**

### The Loop

```
┌─────────────────────────────────────────────────────────────────┐
│  1. DEVELOP (frontend-developer agent)                         │
│     ├─ Research: Read context files, analyze examples          │
│     ├─ Implement: Write component/feature code                 │
│     └─ Start dev server if not running                         │
├─────────────────────────────────────────────────────────────────┤
│  2. REVIEW (design-review agent)                                │
│     ├─ Navigate to live preview (localhost:5173)               │
│     ├─ Test interactions, responsiveness, accessibility        │
│     ├─ Take screenshots as evidence                            │
│     └─ Assign score (1-10) with detailed feedback              │
├─────────────────────────────────────────────────────────────────┤
│  3. ITERATE or EXIT                                             │
│     ├─ Score < 9: Pass feedback to frontend-developer → LOOP   │
│     └─ Score ≥ 9: Complete ✓                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Visual Check

IMMEDIATELY after implementing any front-end change:
1. **Identify what changed**
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` 
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### How to Trigger

Simply request UI work. The orchestrator will:
1. Launch `frontend-developer` for initial implementation
2. Launch `design-review` to score the result
3. Loop until score ≥ 9 or user interrupts

### Agent Responsibilities

| Agent | Phase | Key Tools |
|-------|-------|-----------|
| `frontend-developer` | Research | Playwright (screenshots of examples), Read, Glob, WebFetch |
| `frontend-developer` | Implement | Write, Edit, Bash (dev server) |
| `design-review` | Review | Playwright (navigate, interact, screenshot, resize) |

### Exit Criteria

The loop terminates when:
- **Score ≥ 9/10**: Design meets world-class standards
- **User interrupt**: Manual override at any point
- **Max iterations**: After 5 loops, present best result for user decision

### Scoring Guide (design-review)

| Score | Meaning |
|-------|---------|
| 9-10 | Production ready. Matches reference quality. |
| 7-8 | Good. Minor polish needed. |
| 5-6 | Acceptable. Notable issues to address. |
| 3-4 | Needs work. Multiple significant problems. |
| 1-2 | Major rework required. |
