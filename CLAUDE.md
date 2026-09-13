# Portfolio Build Instructions

## Mission

Build a polished, responsive React PWA portfolio for a **Computer Scientist & Application Engineer specializing in AI/ML**. The portfolio must make this clear in the first minute: this person can design, build, and ship intelligent software systems—not merely individual models or generic webpages.

The experience should feel like a restrained, high-end project archive: confident typography, deliberate motion, clear technical evidence, and four substantial case studies. It must remain fast, usable, and understandable without animation, JavaScript enhancements, or a 3D layer.

## Working principles

- Start with the content structure, responsive layout, routing, and accessible interaction patterns. Add visual polish only after these are stable.
- Build the smallest reusable component set that supports the approved pages. Do not create a component library for hypothetical future needs.
- Prefer CSS, semantic HTML, and native browser behavior over complex libraries.
- Treat motion and 3D as progressive enhancement. The portfolio must be complete if they are disabled, unsupported, or removed.
- Do not invent credentials, employment history, project metrics, links, technologies, testimonials, or client names. Use clearly labelled placeholders where content is unavailable.
- Avoid gimmicks: no auto-playing audio, scrolling hijack, cursor trails, forced loading screens, excessive glass effects, or animation that delays content access.
- Keep dependencies deliberate. Explain any new dependency in the pull request or commit message.

## Delivery order

1. Establish the React application, routing, PWA manifest, global tokens, base typography, and page shell.
2. Implement all required routes and real content structure with responsive layouts.
3. Build the shared UI components and interaction states.
4. Add case-study detail pages and validate content accuracy.
5. Add focused transitions and micro-interactions behind reduced-motion support.
6. Optionally add a lightweight Three.js / React Three Fiber visual layer only after the core experience passes QA. It must be lazy-loaded, decorative by default, and removable without breaking layout or navigation.
7. Run the QA checklist before declaring work complete.

## Required routes

- `/` — Landing and portfolio entry point
- `/about` — Profile, working approach, education/credentials where supplied
- `/projects` — Four-project index
- `/projects/:slug` — Individual case study
- `/experience` — Experience, capabilities, and technical stack
- `/contact` — Contact pathways and resume link when supplied
- `/offline` — Useful fallback when no network is available
- `*` — Clear, accessible not-found page

Use meaningful document titles and descriptions for every route. Preserve a visible navigation method on every page; do not conceal essential navigation behind an introductory interaction.

## Implementation standards

- Use semantic landmarks (`header`, `nav`, `main`, `footer`) and a logical heading hierarchy.
- All controls must be keyboard usable, visibly focused, and labelled for assistive technology.
- Respect `prefers-reduced-motion`; do not make motion required for comprehension.
- Use responsive images with meaningful `alt` text. Decorative images must have empty alt text.
- Use real buttons for actions and real links for navigation. Do not simulate either with generic elements.
- Use local design tokens for colour, spacing, typography, radii, shadows, and motion.
- Keep source content structured in data objects or Markdown so case-study cards and pages cannot drift out of sync.
- Keep secrets out of the repository. Use environment variables only for values that genuinely vary by environment; document required public variables in `.env.example`.
- Configure the PWA service worker conservatively: cache the application shell and selected static assets, but do not serve stale portfolio content indefinitely.

## Before completion

Complete every applicable item in `QA_CHECKLIST.md`. At minimum, test the listed viewport widths, keyboard navigation, reduced-motion behavior, production build, and an offline reload. Fix root causes rather than masking layout problems at one breakpoint.

