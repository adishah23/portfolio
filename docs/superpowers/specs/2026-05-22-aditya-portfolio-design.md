# Aditya Shah Portfolio — Static Rebuild Design Spec

**Date:** 2026-05-22
**Source:** https://adityas-folio.lovable.app/
**Owner:** Aditya Shah (adishah23101@gmail.com)

---

## Goal

Clone Aditya Shah's portfolio site as a maintainable Astro static site deployed to GitHub Pages. Visual and content fidelity to the original. Content editable by changing one file.

---

## Framework & Tooling

| Concern | Choice | Reason |
|---|---|---|
| Framework | Astro 4.x | Static, zero JS by default, component model, fast builds |
| Styling | Tailwind CSS v3 | Responsive utilities; only ~5 custom classes needed on top |
| Deployment | GitHub Pages | Free, custom domain ready, matches user choice |
| CI | GitHub Actions | `withastro/action` handles build + deploy |
| Node | 20.x | LTS, compatible with Astro 4 |

---

## Color System

Custom CSS properties defined in `global.css`, mapped to Tailwind via `tailwind.config.mjs`:

```
--color-background:      #FAFAF8   (off-white)
--color-foreground:      #1A1A1A   (near-black)
--color-border:          #D4D0C8   (warm gray)
--color-muted:           #8A8580   (muted text)
--color-ember:           #D94F2B   (orange-red accent)
```

Tailwind keys: `background`, `foreground`, `border`, `muted-foreground`, `ember`.

---

## Typography

**Primary font:** `CameraPlainVariable` — variable font (weight 100–900) loaded from CDN:
`https://cdn.gpteng.co/mcp-widgets/v1/fonts/CameraPlainVariable.woff2`

Self-hosted in `public/fonts/` for reliability (downloaded during setup).

Tailwind font families:
- `font-display` → CameraPlainVariable (headings, large text)
- `font-mono` → system monospace stack (labels, metadata, tables)
- `font-tech` → CameraPlainVariable at small size + wide tracking (buttons, links)

---

## Custom CSS Classes (6 total)

Defined in `src/styles/global.css`:

```
.drawing-frame   border border-border (the engineering frame box)
.title-block     border border-border, child .cell divides rows with border-b
.cell            border-b border-border px-4 py-2 font-mono text-[11px] tracking-wide uppercase
.callout         font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground flex items-center gap-2 (before::crosshair dot)
.crosshair       inline-block 8px circle border border-foreground/40 (the ⊕ marker)
.ember-underline text decoration in ember color on hover/default
```

---

## File Structure

```
/
├── public/
│   ├── fonts/
│   │   └── CameraPlainVariable.woff2
│   └── assets/
│       ├── hero.jpg                  (autoclave/composite layup photo)
│       ├── project-drs.jpg           (drag reduction system)
│       ├── project-golf.jpg          (LPBF golf club head)
│       └── project-cfd.jpg           (vortex generators CFD)
├── src/
│   ├── data/
│   │   └── content.ts                (ALL editable text — single source of truth)
│   ├── layouts/
│   │   └── Layout.astro              (head, nav header, footer, slot)
│   ├── components/
│   │   ├── SheetHeader.astro         (sheet N/06 · Rev X · title bar)
│   │   ├── DrawingFrame.astro        (bordered frame wrapper)
│   │   └── TitleBlock.astro          (BOM/data table component)
│   ├── pages/
│   │   ├── index.astro               (6-sheet homepage)
│   │   ├── about.astro
│   │   ├── experience.astro
│   │   ├── projects/
│   │   │   └── index.astro
│   │   ├── skills.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css                (font-face, custom classes, CSS vars)
├── .github/
│   └── workflows/
│       └── deploy.yml                (GitHub Actions: build + deploy to gh-pages)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Pages & Sections

### `index.astro` — 6 Sheets

| Sheet | Title | Content |
|---|---|---|
| 01/06 | General Arrangement · Rev C | Hero heading, BOM table (location/role/lab/focus), CTA buttons |
| 02/06 | Detail A — Prepreg Layup · Rev B | Hero image with annotated callout dots, process notes sidebar |
| 03/06 | Active Project Brief · Rev A | Current research paragraph, 3 spec cells (frequency/resolution/resin) |
| 04/06 | Selected Work · Exploded View · Rev D | 3 project image cards + disciplines table |
| 05/06 | General Notes · Rev A | Pull quote with ember accent |
| 06/06 | Title Block · Contact · Rev C | "Let's build something tangible." + contact title block |

### `about.astro`
Bio, background, photo (if any), education timeline.

### `experience.astro`
Work history (JSM Composites, Orion Racing FSAE, VT lab). Each entry: company, role, dates, bullet points. Engineering drawing style section headers.

### `projects/index.astro`
All 3 projects with full detail: DRS FSAE wing, LPBF golf club, CFD vortex generators. Each card expands to show tools, outcomes, images.

### `skills.astro`
Discipline table: Composite tooling, Additive manufacturing, Aerodynamics/CFD, DFAM/design optimization. Software tools list.

### `contact.astro`
Contact form or mailto link, title block with all contact details.

---

## Content File (`src/data/content.ts`)

Single TypeScript object exported as `CONTENT`. Aditya edits this file only. Structure:

```ts
export const CONTENT = {
  name: "Aditya Shah",
  tagline: "M.E · VT",
  headline: ["Composites,", "Additive Mfg.,", "Design."],
  bio: "Graduate Mechanical Engineer...",
  bom: [
    { label: "Based", value: "Blacksburg, VA" },
    { label: "Role", value: "Grad Researcher" },
    // ...
  ],
  email: "adishah23101@gmail.com",
  phone: "+1 (540) 605-0114",
  linkedin: "https://www.linkedin.com/in/adityashah2301/",
  resume: "https://drive.google.com/...",
  quote: {
    text: "It all works out in the end —",
    ember: "if it isn't working, it's not the end.",
  },
  research: { ... },
  projects: [ ... ],
  experience: [ ... ],
  skills: { ... },
}
```

---

## GitHub Pages Deployment

`astro.config.mjs`:
```js
export default defineConfig({
  output: 'static',
  site: 'https://<username>.github.io',
  base: '/<repo>',   // or '/' if custom domain
})
```

`.github/workflows/deploy.yml`: triggers on push to `main`, uses `withastro/action@v2`, deploys to `gh-pages` branch.

---

## Images

Download from the live Lovable site during setup:
- `/assets/hero-BrGWFzfz.jpg` → `public/assets/hero.jpg`
- `/assets/project-drs-By3AGKeM.jpg` → `public/assets/project-drs.jpg`
- `/assets/project-golf-DpAgwtKl.jpg` → `public/assets/project-golf.jpg`
- `/assets/project-cfd-D6RVSgUb.jpg` → `public/assets/project-cfd.jpg`

---

## Inner Pages — Content to Scrape

Before implementation, scrape the remaining pages to capture their exact content:
- `/about`, `/experience`, `/projects`, `/skills`, `/contact`

This happens at the start of the implementation plan.

---

## Out of Scope

- The "Edit with Lovable" badge (removed)
- Analytics script (`~flock.js`) — removed
- Any server-side functionality (contact form uses `mailto:` link)
- Dark mode (original is light-only)
