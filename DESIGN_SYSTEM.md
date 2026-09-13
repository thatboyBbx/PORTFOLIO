# Design System and Interaction Direction

## Design intent

Create a calm, editorial, case-file-oriented interface. It should feel technically capable and considered—not loud, futuristic for its own sake, or template-like. The work and reasoning are the visual centre of gravity.

Use asymmetry, generous whitespace, compact metadata, and strong type hierarchy to create interest. Use colour and motion sparingly to direct attention.

## Foundations

### Colour

Define semantic tokens, not one-off colour values. The initial system should include:

- `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`
- `--color-border`, `--color-accent`, `--color-accent-contrast`
- `--color-success`, `--color-warning`, `--color-error`
- focus-ring and hover/active tokens

Start with a neutral base and one controlled accent colour. All text/background combinations must meet WCAG AA contrast (4.5:1 for normal text; 3:1 for large text and UI boundaries where applicable). Dark mode is optional; if included, design and test it as a complete theme rather than an inversion.

### Typography

- Use one readable display face and one highly legible body face at most; a single family is often better.
- Establish tokens for display, `h1`–`h4`, body, small metadata, and labels.
- Use `clamp()` for fluid display sizing with safe mobile minimums.
- Keep body copy comfortably readable: appropriate line height, line length, and contrast.
- Technical metadata may use a mono face sparingly; never use it for long paragraphs.

### Spacing and layout

- Use a consistent spacing scale (for example 4, 8, 12, 16, 24, 32, 48, 64, 96).
- Constrain reading columns while allowing full-bleed or wider project imagery intentionally.
- Use CSS Grid for macro layouts and Flexbox for component alignment.
- Make layout changes deliberately at content-driven breakpoints; do not target a single device model.

## Components and states

Build only these reusable primitives unless a demonstrated need emerges:

- Site header/navigation and footer
- Text link and button (primary, secondary, quiet)
- Project card and metadata/tag list
- Section heading / eyebrow
- Case-study hero and content sections
- Callout for decisions, outcomes, or status
- Image/media frame with loading and fallback behavior
- Empty, offline, and not-found states

Every interactive component must have default, hover, focus-visible, active, disabled (when relevant), and loading/error states. Touch targets should be at least 44 × 44 CSS pixels where practical. Never rely on colour alone to convey meaning.

## Interaction and motion

- Motion should clarify hierarchy, state change, or spatial continuity—not decorate every element.
- Use short, subtle transitions for hover, focus, reveal, and route changes.
- Do not animate large layout shifts, continuously animate non-essential elements, or require a hover to reveal core information.
- Implement `prefers-reduced-motion: reduce` by removing or substantially simplifying non-essential movement.
- Ensure the content order and keyboard focus remain logical during transitions.

## Responsive behavior

Mobile is a first-class layout, not a compressed desktop layout.

- Navigation must remain discoverable and keyboard accessible at all widths.
- Project grids may become a single column; do not force tiny multi-column cards.
- Preserve readable type and predictable vertical rhythm.
- Avoid fixed heights for text content and avoid horizontal page scrolling.
- Treat 320, 375, 390, 412, 768, 1024, and 1280px+ as required QA viewports.

## Media and 3D

- Use project visuals that clarify the work: interface screenshots, diagrams, code/system details, or intentionally designed abstracts.
- Provide captions when a visual requires interpretation.
- Reserve space to prevent image-driven layout shift; use optimized modern formats and responsive sizes.
- If a 3D layer is added, it is a non-essential ambient enhancement with a static fallback. It must not reduce text contrast, capture scroll unexpectedly, or compete with project content.

