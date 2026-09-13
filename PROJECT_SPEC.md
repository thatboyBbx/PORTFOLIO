# AI/ML Application Engineer Portfolio — Project Specification

## 1. Product objective

Create a personal portfolio that presents its owner as a **Computer Scientist & Application Engineer specializing in Artificial Intelligence and Machine Learning**.

The portfolio must communicate three things quickly:

1. The owner understands computer science and software systems.
2. The owner can build intelligent applications end to end.
3. The owner can substantiate that claim with well-documented projects.

This is not a generic frontend-developer showcase. React and visual craft support the story; the product focus is intelligent applications, sound engineering decisions, and demonstrable outcomes.

## 2. Audience and primary tasks

| Audience | What they need to establish |
| --- | --- |
| Hiring manager or recruiter | Role fit, quality of work, relevant experience, and how to contact the owner |
| Technical interviewer | System design thinking, ML/application choices, trade-offs, code or live demos |
| Collaborator or client | What the owner can deliver and whether their working style fits |

Primary user tasks:

- Understand the positioning within 30–60 seconds.
- Browse four projects and open a meaningful case study.
- See the owner’s technical capabilities and experience without reading a skills dump.
- Reach the owner or open a supplied resume, source repository, or live demo.

## 3. Information architecture

```text
Landing (/)
├── Positioning and concise introduction
├── Featured case studies
├── Capability snapshot
└── Contact call to action

About (/about)
├── Profile and engineering approach
└── Education / credentials (only supplied facts)

Projects (/projects)
└── Four case-study cards → /projects/:slug

Experience (/experience)
├── Selected experience
├── Capabilities and technical stack
└── Engineering / ML working principles

Contact (/contact)
├── Direct contact methods
├── Resume and professional links
└── Contact form only if a functioning delivery path exists
```

Every case study uses the same clear structure:

1. One-line outcome and the owner’s role
2. Context / problem
3. Constraints and requirements
4. Approach and system design
5. Key technical decisions and trade-offs
6. Implementation and technology choices
7. Outcome, evaluation, or current status
8. Links to live demo, source, or documentation when supplied

Avoid claims such as performance improvements, user counts, accuracy, or deployment scale unless they can be verified.

## 4. Content requirements

There are exactly four featured projects at launch. Before publishing, replace the following planning categories with the owner’s real work and approved evidence:

| Project slot | Story it should prove |
| --- | --- |
| Intelligent application | A user-facing product combining application engineering with AI/ML |
| Data / ML system | Data preparation, modelling/evaluation, and reproducible engineering |
| Systems project | Architecture, APIs, data, reliability, or scalable software design |
| Applied problem-solving project | Clear problem framing, delivery, and pragmatic technical decisions |

Each project card must show: title, short problem statement, role, primary technologies, status, and one visual or intentional visual fallback. Detail pages must describe the work rather than merely list tools.

Use a single content source for project data. Mark placeholders plainly, for example: `[Project outcome to be confirmed]`.

## 5. Core user flows

### Recruiter flow

Landing → understand positioning → scan featured projects → open one case study → view experience / resume → contact.

### Technical reviewer flow

Projects → select relevant case study → inspect architecture and decisions → follow source/demo link → contact.

### Mobile flow

Landing → use persistent navigation → browse project cards one at a time → read a case study without horizontal scrolling → contact through a tap-friendly action.

## 6. Technology and architecture

Use a modern React application with TypeScript and a lightweight client-side router. Use a production-ready build tool such as Vite. The site is a PWA with a web app manifest, icons, offline fallback route, and careful asset caching.

Recommended baseline:

- React + TypeScript + Vite
- CSS Modules or a small, token-first CSS approach (choose one and stay consistent)
- React Router (or equivalent) for client-side routes
- Static content/data files for case studies
- PWA plugin/service worker with an offline fallback
- Accessible icon set only if necessary; otherwise use text labels

Optional, only after baseline completion:

- Three.js / React Three Fiber for one subtle decorative scene or interaction layer

The 3D layer must be lazy-loaded, excluded for reduced-motion users, avoid blocking first paint, and have a static CSS/image fallback. Do not use 3D for navigation, body copy, project content, or any required action.

## 7. PWA behavior

- Provide a valid manifest with intentional name, short name, theme colour, background colour, and icons.
- Make the app shell available after a successful initial visit.
- Provide `/offline` with useful navigation and an explanation that live/external content may be unavailable.
- Test installability where the host/browser supports it.
- Do not claim offline support for external demos, contact forms, analytics, or remote assets that are not cached.

## 8. Non-goals

- No CMS, user accounts, dashboard, blog, or complex backend at launch.
- No contact form until it has a secure, tested submission and error-handling path. A mailto link and professional profile links are sufficient.
- No elaborate 3D scene, shader work, or visual experiment that compromises content, battery life, or accessibility.
- No exaggerated animations or hidden "easter egg" interactions that make the portfolio harder to use.

## 9. Definition of done

The portfolio is done when all routes work, the four real case studies are complete, content is factually reviewed, the experience is usable from 320px to large desktop screens, PWA/offline behavior is verified, and the applicable QA checklist items pass.

