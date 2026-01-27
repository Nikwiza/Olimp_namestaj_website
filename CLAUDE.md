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

## Structure

```
src/
├── main.jsx, App.jsx     # Entry points
├── index.css             # Global styles
└── assets/images/Gallery # Project photos by room type

context/                  # READ BEFORE BUILDING
├── design-principles.md  # Quick routing guide
├── brand-story.md        # Brand identity, messaging, design system
└── examples.md           # Reference URLs for visual inspiration

.claude/
├── agents/               # Specialized agents
│   ├── frontend-developer.md      # Implementation specialist
│   ├── design-review-agent.md     # Quality gatekeeper
│   └── context-architect.md       # Configuration expert
└── skills/               # Reusable expertise (symlinked)
    ├── web-design-guidelines
    ├── vercel-react-best-practices
    ├── frontend-design
    └── MCP Integration
```

---

## Agent Delegation Rules

**CRITICAL:** The orchestrator (you) MUST NOT implement code directly. You MUST delegate to specialized agents using the Task tool.

### Rule 1: UI Implementation - ALWAYS Delegate to frontend-developer

When the user requests ANY of the following, IMMEDIATELY delegate to the `frontend-developer` agent using the Task tool:
- Build, create, implement, or code UI components, pages, or features
- Add, update, modify, or improve frontend functionality
- Style, layout, or design work (colors, spacing, typography, animations)
- Fix bugs or issues in React components
- Make responsive design changes
- Add images, galleries, or visual elements

**Examples of user messages requiring frontend-developer delegation:**
- "Build the hero section"
- "Add a contact form"
- "Create the gallery"
- "Make the header responsive"
- "Implement the about page"
- "Fix the footer styling"
- "Add animations"
- "Update the color scheme"
- "Improve the navigation"

**DO NOT:**
- Write, Edit, or modify code files directly in the orchestrator
- Use the Write or Edit tools for implementation in the orchestrator thread
- Implement UI features yourself

**DO:**
- Use the Task tool to delegate to `frontend-developer` immediately
- Pass the user's full request to the agent

### Rule 2: Design Review - ALWAYS Run After Implementation

After the `frontend-developer` agent completes work and states "Ready for design review":
- **IMMEDIATELY** use the Task tool to delegate to the `design-review-agent` agent
- **DO NOT** skip this step, even if the work looks good
- The design-review-agent will return a score (1-10) and structured feedback

**Interpreting design-review-agent results:**
- If the agent returns "LOOP COMPLETE" (score >= 9): The work is done. Inform the user of success.
- If the agent returns "SEND TO frontend-developer FOR ITERATION" (score < 9): Use the Task tool to send the full feedback back to `frontend-developer` for iteration

### Rule 3: Iteration Loop - Continue Until Score >= 9

When design-review-agent scores < 9:
1. Use the Task tool to delegate to `frontend-developer` again
2. Pass the FULL structured feedback from design-review-agent to frontend-developer
3. frontend-developer will address the feedback and state "Ready for design review" again
4. Use the Task tool to delegate to `design-review-agent` again
5. Repeat steps 1-4 until score >= 9 OR max iterations (5) reached

**Maximum Iterations:** After 5 complete loops, if score is still < 9, present the current state to the user and ask for guidance.

### Rule 4: Configuration Issues - Delegate to context-architect

When the user reports problems with the agentic workflow itself:
- Agents not being called
- Workflow loops not working
- Skills not being utilized
- CLAUDE.md needs fixing
- Agent configurations need improvement

Use the Task tool to delegate to the `context-architect` agent.

---

## Orchestrator Communication Protocol

**How to interpret agent completion signals:**

### frontend-developer Completion Signals
When frontend-developer completes work, it will state:
- **"Ready for design review"** → Orchestrator MUST use Task tool to delegate to `design-review-agent`

### design-review-agent Completion Signals
When design-review-agent completes review, it will state:
- **"LOOP COMPLETE - Work meets production standards"** → Orchestrator informs user that work is complete
- **"SEND TO frontend-developer FOR ITERATION"** → Orchestrator uses Task tool to delegate back to `frontend-developer` with the full structured feedback

The structured feedback from design-review-agent follows this format:
```
Design Review Score: X/10
[Summary section]
[Score Breakdown table]
[Findings with Blockers, High-Priority, Medium-Priority, Nitpicks]
[Verdict statement]
```

**Orchestrator MUST pass the ENTIRE feedback report to frontend-developer when iterating.**

---

## Context Directory

**Agents MUST read these files before any UI/design work (use absolute paths):**

| File | Absolute Path | Use When |
|------|---------------|----------|
| design-principles.md | `/home/nikwiza/Projects/Olimp_2/olimp-project/context/design-principles.md` | First stop - routes to correct context |
| brand-story.md | `/home/nikwiza/Projects/Olimp_2/olimp-project/context/brand-story.md` | Copy, tone, visual guidelines, trust signals |
| examples.md | `/home/nikwiza/Projects/Olimp_2/olimp-project/context/examples.md` | Reference URLs for Playwright screenshot analysis |

---

## Required Skills

The following skills are available and should be consulted by agents:

| Skill | Path | When to Use |
|-------|------|-------------|
| **web-design-guidelines** | `.claude/skills/web-design-guidelines` | UI review, accessibility audits, design best practices |
| **vercel-react-best-practices** | `.claude/skills/vercel-react-best-practices` | React/Next.js performance optimization |
| **frontend-design** | `.claude/skills/frontend-design` | Creating production-grade interfaces |
| **MCP Integration** | `.claude/skills/MCP Integration` | Configuring Model Context Protocol servers |

**Note:** Skills are automatically available to agents but must be explicitly referenced in agent system prompts for consistent usage.

---

## Agent Workflow: Design-Develop Loop

This project uses an automated iterative workflow between two specialized agents. **The orchestrator MUST follow this process for all UI work:**

### The Loop (Orchestrator's Execution Guide)

```
┌─────────────────────────────────────────────────────────────────┐
│  ORCHESTRATOR: Receive UI request from user                     │
│     └─ Use Task tool → delegate to `frontend-developer`         │
├─────────────────────────────────────────────────────────────────┤
│  1. DEVELOP (frontend-developer agent)                          │
│     ├─ Research: Read context files, screenshot examples        │
│     ├─ Implement: Write component/feature code                  │
│     ├─ Start dev server if not running                          │
│     └─ State: "Ready for design review"                         │
├─────────────────────────────────────────────────────────────────┤
│  ORCHESTRATOR: Receive "Ready for design review" signal         │
│     └─ Use Task tool → delegate to `design-review-agent`        │
├─────────────────────────────────────────────────────────────────┤
│  2. REVIEW (design-review-agent agent)                          │
│     ├─ Read context files (brand-story.md, examples.md)        │
│     ├─ Navigate to live preview (localhost:5173)               │
│     ├─ WAIT 3+ seconds for CSS/JS to fully render              │
│     ├─ Verify CSS is loaded (check for styled elements)        │
│     ├─ Test interactions, responsiveness, accessibility        │
│     ├─ Take screenshots at 3 breakpoints as evidence           │
│     ├─ Assign score (1-10) with structured feedback            │
│     └─ State verdict:                                           │
│        - "LOOP COMPLETE" (score >= 9) OR                        │
│        - "SEND TO frontend-developer FOR ITERATION" (score < 9) │
├─────────────────────────────────────────────────────────────────┤
│  3. ORCHESTRATOR: Route based on verdict                       │
│     ├─ If "LOOP COMPLETE": Inform user, work is done           │
│     └─ If "SEND TO frontend-developer":                         │
│        - Use Task tool → delegate to `frontend-developer`       │
│        - Pass FULL structured feedback                          │
│        - frontend-developer iterates and returns to step 1      │
└─────────────────────────────────────────────────────────────────┘
```

### Orchestrator's Step-by-Step Execution

1. **User requests UI work** → Use Task tool to delegate to `frontend-developer` with the user's full request
2. **frontend-developer completes** → Receive "Ready for design review" signal
3. **Trigger review** → Use Task tool to delegate to `design-review-agent`
4. **design-review-agent completes** → Receive score and verdict
5. **Route based on verdict:**
   - Score >= 9 ("LOOP COMPLETE"): Inform user of completion
   - Score < 9 ("SEND TO frontend-developer FOR ITERATION"): Use Task tool to delegate to `frontend-developer` with full feedback
6. **Repeat steps 2-5** until score >= 9 OR max 5 iterations reached

### Agent Responsibilities

| Agent | Phase | Key Tools | Output Signal |
|-------|-------|-----------|---------------|
| `frontend-developer` | Research | Playwright (screenshots of examples), Read, Glob | N/A |
| `frontend-developer` | Implement | Write, Edit, Bash (dev server) | "Ready for design review" |
| `design-review-agent` | Review | Playwright (navigate, interact, screenshot, resize) | "LOOP COMPLETE" or "SEND TO frontend-developer FOR ITERATION" |

### Exit Criteria

The loop terminates when:
- **Score >= 9/10**: design-review-agent states "LOOP COMPLETE" - design meets world-class standards
- **User interrupt**: User manually stops the process at any point
- **Max iterations**: After 5 complete loops (frontend-developer → design-review-agent → frontend-developer × 5), orchestrator presents best result to user for decision

### Scoring Guide (design-review-agent)

| Score | Meaning | Orchestrator Action |
|-------|---------|---------------------|
| 9-10 | Production ready. Matches reference quality. | Inform user - work complete |
| 7-8 | Good. Minor polish needed. | Send feedback to frontend-developer |
| 5-6 | Acceptable. Notable issues to address. | Send feedback to frontend-developer |
| 3-4 | Needs work. Multiple significant problems. | Send feedback to frontend-developer |
| 1-2 | Major rework required. Unstyled, broken, or missing CSS. | Send feedback to frontend-developer |

---

## Common Failure Modes

**Orchestrator and agents MUST AVOID these mistakes:**

### Failure 1: Orchestrator Implements Code Directly
**Problem:** The orchestrator uses Write, Edit, or similar tools to implement UI features instead of delegating to frontend-developer.
**Fix:** The orchestrator MUST ONLY use the Task tool to delegate to `frontend-developer` for any code implementation.
**Detection:** If you see the orchestrator modifying .jsx, .css, or component files directly, this is wrong.

### Failure 2: Skipping Design Review
**Problem:** After frontend-developer completes work, the orchestrator doesn't trigger design-review-agent.
**Fix:** ALWAYS delegate to `design-review-agent` after frontend-developer states "Ready for design review".
**Detection:** If work is marked complete without a design-review-agent score, this is wrong.

### Failure 3: design-review-agent Passes Unstyled Pages
**Problem:** The design-review-agent scores pages without verifying CSS is fully loaded, allowing unstyled HTML to pass.
**Fix:** design-review-agent MUST wait 3+ seconds after navigation, take screenshots, verify styled elements exist, and auto-fail (score 1-2) if page appears unstyled.
**Detection:** If a page with default browser fonts (Times New Roman, Arial) or no color palette scores above 3, this is wrong.

### Failure 4: Not Waiting for Render
**Problem:** design-review-agent takes screenshots immediately after navigation without waiting for Vite's HMR and TailwindCSS compilation.
**Fix:** MUST wait at least 3-5 seconds or use `mcp__playwright__browser_wait_for` before taking screenshots.
**Detection:** If screenshots show partially loaded pages or missing styles, this is wrong.

### Failure 5: Lenient Scoring
**Problem:** design-review-agent gives high scores (7-9) to mediocre work that doesn't match reference examples.
**Fix:** A score of 9+ means genuinely production-ready and visually polished. Most first drafts should score 4-6. Be rigorous.
**Detection:** If every iteration scores 8+, the agent is too lenient.

### Failure 6: Ignoring Skills
**Problem:** Agents don't consider the available skills (web-design-guidelines, vercel-react-best-practices, frontend-design, MCP Integration).
**Fix:** Agents should be aware of skill principles even though skills are automatically available.
**Detection:** If implementations violate basic accessibility or React best practices, skills weren't consulted.

### Failure 7: Breaking the Feedback Loop
**Problem:** design-review-agent doesn't clearly state "SEND TO frontend-developer FOR ITERATION" or "LOOP COMPLETE", causing the orchestrator to not know what to do next.
**Fix:** design-review-agent MUST end every report with an explicit verdict statement.
**Detection:** If the orchestrator doesn't know whether to iterate or complete, the verdict was unclear.

### Failure 8: frontend-developer Doesn't Research Examples
**Problem:** frontend-developer writes code without first screenshotting reference sites from examples.md.
**Fix:** frontend-developer MUST use Playwright to capture screenshots of reference URLs before implementing.
**Detection:** If implementations don't match the quality/style of reference examples, research was skipped.

---

## Quick Visual Check (For design-review-agent)

The design-review-agent MUST follow this checklist for every review:

1. **Read context files** - ALWAYS start by reading `/home/nikwiza/Projects/Olimp_2/olimp-project/context/brand-story.md` and `/home/nikwiza/Projects/Olimp_2/olimp-project/context/examples.md`
2. **Navigate to page** - Use `mcp__playwright__browser_navigate` to visit `http://localhost:5173`
3. **Set viewport** - Use `mcp__playwright__browser_resize` to 1440x900
4. **WAIT for full render** - Wait at least 3-5 seconds for CSS/JS to load (use `mcp__playwright__browser_wait_for` or manual wait)
5. **Take initial screenshot** - Capture with `mcp__playwright__browser_take_screenshot`
6. **Verify CSS loaded** - Check screenshot for styled elements, colors, proper spacing
7. **Check for auto-fail conditions** - If page appears unstyled, immediately score 1-2 and stop
8. **Test responsiveness** - Resize to 1440px, 768px, 375px and screenshot each
9. **Check interactions** - Click buttons, test hover states, verify animations
10. **Check console** - Run `mcp__playwright__browser_console_messages` for errors
11. **Compare to brand guidelines** - Does it match the warm, spacious, heritage-focused aesthetic?
12. **Assign score** - Be rigorous (9+ only for truly production-ready work)
13. **Write structured feedback** - Follow the exact report format
14. **State verdict** - "LOOP COMPLETE" or "SEND TO frontend-developer FOR ITERATION"

This verification ensures nothing is missed and scoring is consistent.
