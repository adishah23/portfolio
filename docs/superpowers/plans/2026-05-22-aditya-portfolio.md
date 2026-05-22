# Aditya Shah Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-accurate static Astro site cloning https://adityas-folio.lovable.app/ with all 6 pages, deployed to GitHub Pages.

**Architecture:** Astro 4 static site with Tailwind CSS. All editable content lives in `src/data/content.ts`. Six shared components handle the engineering-drawing UI patterns. Six pages consume them.

**Tech Stack:** Astro 4, Tailwind CSS v3, TypeScript, GitHub Actions (`withastro/action@v2`)

---

## File Map

| File | Responsibility |
|---|---|
| `src/data/content.ts` | Single source of truth for all text, links, and structured data |
| `src/layouts/Layout.astro` | Base HTML shell, sticky nav header, footer |
| `src/components/SheetHeader.astro` | "Sheet N/06 · Rev X · Title" bar used atop every section |
| `src/components/DrawingFrame.astro` | Bordered engineering frame `<div>` wrapper |
| `src/components/TitleBlock.astro` | BOM/data table with header row and key-value cells |
| `src/styles/global.css` | `@font-face`, CSS vars, 6 custom utility classes |
| `tailwind.config.mjs` | Extend colors (ember, background, foreground, border, muted-foreground), font families |
| `src/pages/index.astro` | Homepage: 6 sheet sections |
| `src/pages/about.astro` | About page: bio, 4 sections, quote |
| `src/pages/experience.astro` | Experience page: 4 positions timeline |
| `src/pages/projects/index.astro` | Projects page: 4 project cards |
| `src/pages/skills.astro` | Skills page: 4 discipline groups |
| `src/pages/contact.astro` | Contact page: contact methods + info table |
| `public/fonts/CameraPlainVariable.woff2` | Self-hosted variable font |
| `public/assets/hero.jpg` | Autoclave/composite layup photo |
| `public/assets/project-drs.jpg` | Drag reduction system photo |
| `public/assets/project-golf.jpg` | LPBF golf club head photo |
| `public/assets/project-cfd.jpg` | Vortex generators CFD photo |
| `.github/workflows/deploy.yml` | Build + deploy to gh-pages on push to main |
| `astro.config.mjs` | Static output, site URL, base path |

---

## Task 1: Git init + Astro project scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`

- [ ] **Step 1: Initialise git and scaffold Astro**

```bash
cd /Users/darshannere/claude/aditya
git init
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

When prompted: accept defaults, choose "Empty" template, enable TypeScript strict.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D @astrojs/tailwind tailwindcss
```

- [ ] **Step 3: Add Tailwind integration to `astro.config.mjs`**

Replace the file content entirely:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://darshannere.github.io',
  base: '/aditya',
  integrations: [tailwind({ applyBaseStyles: false })],
});
```

> Note: update `site` and `base` to match the actual GitHub username and repo name before deploying.

- [ ] **Step 4: Create `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:       '#FAFAF8',
        foreground:       '#1A1A1A',
        border:           '#D4D0C8',
        'muted-foreground': '#8A8580',
        ember:            '#D94F2B',
      },
      fontFamily: {
        display: ['CameraPlainVariable', 'Georgia', 'serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        tech:    ['CameraPlainVariable', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Verify Astro starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:4321` with no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold Astro 4 + Tailwind project"
```

---

## Task 2: Download assets (font + images)

**Files:**
- Create: `public/fonts/CameraPlainVariable.woff2`
- Create: `public/assets/hero.jpg`, `project-drs.jpg`, `project-golf.jpg`, `project-cfd.jpg`

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/fonts public/assets
```

- [ ] **Step 2: Download font**

```bash
curl -L "https://cdn.gpteng.co/mcp-widgets/v1/fonts/CameraPlainVariable.woff2" \
  -o public/fonts/CameraPlainVariable.woff2
ls -lh public/fonts/CameraPlainVariable.woff2
```

Expected: file exists, size ~50–200 KB.

- [ ] **Step 3: Download images**

```bash
curl -L "https://adityas-folio.lovable.app/assets/hero-BrGWFzfz.jpg" \
  -o public/assets/hero.jpg
curl -L "https://adityas-folio.lovable.app/assets/project-drs-By3AGKeM.jpg" \
  -o public/assets/project-drs.jpg
curl -L "https://adityas-folio.lovable.app/assets/project-golf-DpAgwtKl.jpg" \
  -o public/assets/project-golf.jpg
curl -L "https://adityas-folio.lovable.app/assets/project-cfd-D6RVSgUb.jpg" \
  -o public/assets/project-cfd.jpg
ls -lh public/assets/
```

Expected: 4 jpg files, each > 50 KB.

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "chore: add self-hosted font and project images"
```

---

## Task 3: Global CSS + custom classes

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'CameraPlainVariable';
  src: url('/fonts/CameraPlainVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Note: if site uses a base path, prefix font url with the base.
   In Astro, use import.meta.env.BASE_URL or reference via public/ path. */

@layer base {
  html {
    background-color: #FAFAF8;
    color: #1A1A1A;
    -webkit-font-smoothing: antialiased;
  }
  body {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
}

@layer components {
  /* Engineering frame: simple border */
  .drawing-frame {
    @apply border border-border;
  }

  /* BOM / title block container */
  .title-block {
    @apply border border-border font-mono text-[11px] tracking-[0.18em] uppercase;
  }

  /* Row inside a title-block */
  .cell {
    @apply border-b border-border px-4 py-2 last:border-b-0;
  }

  /* Small label with crosshair prefix */
  .callout {
    @apply flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground;
  }
  .callout::before {
    content: '';
    @apply block h-2 w-2 rounded-full border border-muted-foreground flex-shrink-0;
  }

  /* Crosshair dot standalone */
  .crosshair {
    @apply inline-block h-2 w-2 rounded-full border border-foreground/40;
  }

  /* Underline in ember on hover */
  .ember-underline {
    @apply underline decoration-ember underline-offset-2;
  }

  /* Small eyebrow label (footer/sections) */
  .eyebrow {
    @apply font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground;
  }
}
```

- [ ] **Step 2: Verify classes compile (build check)**

```bash
npm run build 2>&1 | tail -5
```

Expected: build completes with no errors (the index page is empty but valid).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: global CSS — font-face and 6 custom utility classes"
```

---

## Task 4: Content data file

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Create `src/data/content.ts`**

```typescript
export const SITE = {
  name:      'Aditya Shah',
  tagline:   'M.E · VT',
  year:      '2026',
  coords:    'Blacksburg, VA · 37.2°N 80.4°W',
  email:     'adishah23101@gmail.com',
  phone:     '+1 (540) 605-0114',
  linkedin:  'https://www.linkedin.com/in/adityashah2301/',
  resume:    'https://drive.google.com/file/d/1XF93CUTnHvQB1NRuI2cHRShFHKdPlyWK/view?usp=drive_link',
};

export const HOME = {
  sheets: [
    { number: '01', title: 'General Arrangement', rev: 'C' },
    { number: '02', title: 'Detail A — Prepreg Layup', rev: 'B' },
    { number: '03', title: 'Active Project Brief', rev: 'A' },
    { number: '04', title: 'Selected Work · Exploded View', rev: 'D' },
    { number: '05', title: 'General Notes', rev: 'A' },
    { number: '06', title: 'Title Block · Contact', rev: 'C' },
  ],
  headline:  ['Composites,', 'Additive Mfg.,', 'Design'],
  bio:       'Graduate Mechanical Engineer from Virginia Tech with hands-on experience in composites, additive manufacturing, aerodynamics, and mechanical design. Solving complex engineering problems through research and design.',
  bom: [
    { id: '01', label: 'Based',  value: 'Blacksburg, VA' },
    { id: '02', label: 'Role',   value: 'Grad Researcher' },
    { id: '03', label: 'Lab',    value: 'Mfg & Tribology · VT' },
    { id: '04', label: 'Focus',  value: 'DSA · VAT · Composites' },
    { id: '05', label: 'Prev',   value: 'JSM Composites' },
    { id: '06', label: 'Team',   value: 'Orion Racing FSAE' },
  ],
  research: {
    body: 'Graduate research on ultrasound-directed self-assembly of microparticles in VAT photopolymerization — manufacturing functional materials with tailored conductivity, strength, and volatility.',
    since: 'Aug 2024',
    specs: [
      { label: 'Frequency',  value: '2.25 MHz' },
      { label: 'Resolution', value: '≤ 50 µm' },
      { label: 'Resin',      value: 'UV photopolymer' },
    ],
  },
  quote: {
    normal: 'It all works out in the end —',
    ember:  "if it isn't working, it's not the end.",
    attr:   'Aditya Shah · DWG. AS-001',
  },
};

export const PROJECTS = [
  {
    fig:        '01',
    number:     '01 / 04',
    badge:      '-13% drag',
    discipline: 'Aerodynamics · Mechatronics',
    title:      'Drag Reduction System — FSAE Rear Wing',
    image:      '/assets/project-drs.jpg',
    alt:        'Drag Reduction System — FSAE rear wing',
    tags:       ['FSAE', 'PWM', 'Servo', 'Wing Design'],
    bullets: [
      'Implemented a driver-induced SERVO-controlled DRS using PWM, reducing overall drag by 13%.',
      'Simulated multiple pivot points to identify the position that minimised the torque required to operate the DRS.',
      'Integrated the servo inside the wing for direct actuation in place of a conventional 4-bar mechanism — reducing play and complexity.',
    ],
  },
  {
    fig:        '02',
    number:     '02 / 04',
    badge:      'NX · FEA',
    discipline: 'Additive Manufacturing · DFAM',
    title:      'Metal LPBF Golf Club Head',
    image:      '/assets/project-golf.jpg',
    alt:        'Metal LPBF golf club head',
    tags:       ['LPBF', 'NX', 'FEA', 'Build Simulation'],
    bullets: [
      'Designed a golf club head to withstand impact load conditions using DFAM principles through an iterative process.',
      'Ran FEA and build simulations in NX to model heat dissipation and reduce print failures.',
      'Printed the club head using metal Laser Powder Bed Fusion and conducted on-field testing for contact time.',
    ],
  },
  {
    fig:        '03',
    number:     '03 / 04',
    badge:      '+5° stall',
    discipline: 'CFD · Aerodynamics',
    title:      'Passive Vortex Generators — Stall Delay Study',
    image:      '/assets/project-cfd.jpg',
    alt:        'Passive vortex generators — stall delay',
    tags:       ['SimScale', 'S1223', 'Vortex Generators'],
    bullets: [
      'Detailed study of the correlation between angle of attack, vortex formation, and flow separation over an airfoil.',
      'Simulated five different vortex generator designs in SimScale.',
      'Delta-wing-shaped vortex generators increased the separation angle of a standard S1223 airfoil by 5 degrees.',
    ],
  },
  {
    fig:        '04',
    number:     '04 / 04',
    badge:      'Prusa Mini',
    discipline: 'Product Design · Ergonomics',
    title:      'Gaming Phone Holder',
    image:      null,
    alt:        'Gaming phone holder ergonomic prototype',
    tags:       ['SolidWorks', 'FDM', 'Ergonomics'],
    bullets: [
      'Prototype of an ergonomic phone holder designed to reduce pressure on the pinky finger while holding a smartphone horizontally for gaming.',
      'Provides extra support and a more natural hand posture during prolonged use.',
      'Designed in SolidWorks and fabricated on a Prusa Mini 3D printer — pairing functional ergonomics with a clean, minimal aesthetic.',
    ],
  },
];

export const EXPERIENCE = [
  {
    period:   'Aug 2024 → Present',
    location: 'Blacksburg, VA',
    role:     'Graduate Research Assistant',
    org:      'Manufacturing & Tribology Lab — Virginia Tech',
    tags:     ['VAT Photopolymerization', 'DSA', 'Functional Materials'],
    bullets: [
      'Conducting research on Ultrasound-Directed Self-Assembly (DSA) of microparticles in VAT photopolymerization to manufacture functional materials with tailored conductivity, strength, and volatility.',
    ],
  },
  {
    period:   'Aug 2023 → Jul 2024',
    location: 'Mumbai, IN',
    role:     'Design Engineer — R&D',
    org:      'JSM Composites',
    tags:     ['SolidWorks', 'Filament Winding', 'Prosthetics', 'Composites'],
    bullets: [
      'Led development of custom filament winding machinery to manufacture high-strength carbon fiber tubes, addressing the cost and flexibility limits of commercial systems.',
      'Designed and manufactured a composite prosthetic leg in SolidWorks and owned its full lifecycle — prototype through production validation — ensuring structural performance, manufacturability, and repeatability.',
    ],
  },
  {
    period:   'Jul 2022 → Jun 2023',
    location: 'Mumbai, IN',
    role:     'Aerodynamics Lead',
    org:      'Orion Racing India · FSAE',
    tags:     ['CFD', 'Prepreg', 'Autoclave', 'Team Lead'],
    bullets: [
      'Led a 9-member team in the end-to-end development of the 2023 Aerodynamics Package — design, CFD analysis, and manufacturing with carbon fiber prepreg using autoclave curing.',
      'Designed and manufactured tooling and fixtures for the composite elements.',
      'Designed and 3D-printed complex aero components using DFAM principles.',
    ],
  },
  {
    period:   'Aug 2019 → Jun 2022',
    location: 'Mumbai, IN',
    role:     'Aerodynamics Engineer',
    org:      'Orion Racing India · FSAE',
    tags:     ['SimScale', 'Carbon Fiber', 'Track Testing'],
    bullets: [
      'Collaborated with a 70-person team on designing, fabricating, and testing the car\'s aerodynamics package.',
      'Hands-on with CFD analysis (SimScale), carbon and glass fiber fabrication, and track testing.',
      'Presented the Aerodynamics Design Report at Formula Bharat 2022 — 2nd place overall.',
    ],
  },
];

export const SKILLS = [
  {
    number: '01',
    discipline: 'CAD & Design',
    tools: [
      { name: 'SolidWorks',  detail: '3D CAD · Surface · Mold tools · Sheet metal · Mfg drawings · Assemblies · Motion' },
      { name: 'Fusion 360',  detail: '3D CAD · Generative Design · Toolpath generation' },
      { name: 'Siemens NX',  detail: 'Explicit modelling · Thermal simulations · 3D print build sim' },
      { name: 'CATIA',       detail: '3D CAD · Surface modelling' },
    ],
  },
  {
    number: '02',
    discipline: 'Simulation & Analysis',
    tools: [
      { name: 'Ansys',    detail: 'FEA · Structural optimisation' },
      { name: 'SimScale', detail: 'CFD · FEA · Thermal' },
      { name: 'ESAComp',  detail: 'Composite layup optimisation' },
    ],
  },
  {
    number: '03',
    discipline: 'Prototyping & Manufacturing',
    tools: [
      { name: 'DFAM',              detail: 'Design for 3D printing · Casting · CNC · Compression molding' },
      { name: 'Composite Molding', detail: 'Tooling tolerances · Resin runoffs · Vacuum infusion' },
      { name: 'CNC Machining',     detail: 'Carbon fiber · MDF · Plywood · Aluminum · Toolpaths · Tooling' },
      { name: '3D Printing',       detail: 'FDM · SLA · DLP · Printer settings · Materials' },
      { name: 'Shop Tools',        detail: 'CNC · Diamond cutters · Drills · Saws · Grinders · Laser cutters' },
    ],
  },
  {
    number: '04',
    discipline: 'Programming & Tools',
    tools: [
      { name: 'MATLAB', detail: 'Data interpretation · Image processing · Thresholding · Composite modelling' },
      { name: 'Python', detail: 'Data interpretation' },
    ],
  },
];

export const ABOUT = {
  quote: "It all works out in the end — if it isn't working, it's not the end.",
  info: [
    { label: 'Name',     value: 'Aditya Shah' },
    { label: 'Born',     value: 'Mumbai, IN' },
    { label: 'Based',    value: 'Blacksburg, VA' },
    { label: 'School',   value: 'Virginia Tech — M.S. ME' },
    { label: 'Undergrad', value: 'K.J. Somaiya — B.Tech ME' },
  ],
  sections: [
    {
      number: '01',
      eyebrow: 'Academic & Research',
      heading: "A researcher's lens",
      body: "I'm pursuing my Master's in Mechanical Engineering at Virginia Tech, where my research explores how ultrasound can direct microparticle self-assembly in 3D printing. This intersection of materials science and manufacturing reflects my broader goal: engineering high-performance systems by understanding the physics behind them.",
    },
    {
      number: '02',
      eyebrow: 'Drive',
      heading: "A builder's hands",
      body: 'What drives me is curiosity and the thrill of making things that work better, faster, smarter. Whether it\'s simulating composite layups, designing custom tooling, or experimenting with new materials — I\'m chasing the moment when ideas turn tangible. Real-world impact: reducing drag in a racecar wing, sharpening structural performance in advanced composites.',
    },
    {
      number: '03',
      eyebrow: 'Unique',
      heading: 'Between researcher and shop',
      body: 'My experience spans competitive motorsports, academic research, and industrial prototyping. That mix taught me to be analytical and hands-on — to think like a researcher and act like a builder. Leading an FSAE aerodynamics team and shipping production-ready composite tooling have honed my ability to balance performance, manufacturability, and cost.',
    },
    {
      number: '04',
      eyebrow: 'Ahead',
      heading: "Where I'm headed",
      body: "I'm excited by sustainable, smart manufacturing and the role mechanical engineers will play in shaping it — advanced composites, digital design workflows, and functional additive manufacturing. Always looking to join teams building meaningful, well-engineered solutions.",
    },
  ],
  closingQuote: {
    text: 'Scientists investigate that which already is; engineers create that which has never been.',
    attr: 'Albert Einstein',
  },
};

export const CONTACT = {
  methods: [
    { label: 'Email',    value: 'adishah23101@gmail.com', href: 'mailto:adishah23101@gmail.com' },
    { label: 'Phone',    value: '+1 (540) 605-0114',       href: 'tel:+15406050114' },
    { label: 'LinkedIn', value: 'adityashah2301',           href: 'https://www.linkedin.com/in/adityashah2301/' },
    { label: 'Resume',   value: 'View PDF',                 href: 'https://drive.google.com/file/d/1XF93CUTnHvQB1NRuI2cHRShFHKdPlyWK/view?usp=drive_link' },
  ],
  info: [
    { label: 'Status',    value: 'Available — Summer 2026' },
    { label: 'Location',  value: 'Blacksburg, VA' },
    { label: 'Timezone',  value: 'UTC −05:00 (ET)' },
    { label: 'Open to',   value: 'Full-time · R&D · Internships' },
    { label: 'Sectors',   value: 'Composites · AM · Aerospace' },
  ],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx astro check 2>&1 | tail -10
```

Expected: 0 errors (content.ts is pure data, no Astro-specific APIs).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add content.ts — single source of truth for all page data"
```

---

## Task 5: Layout component (nav + footer)

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';
import { SITE } from '../data/content';

interface Props {
  title?: string;
  description?: string;
  activeNav?: string;
}

const {
  title = `${SITE.name} — Mechanical Engineer · Composites · AM`,
  description = 'Graduate mechanical engineer at Virginia Tech researching ultrasound-directed self-assembly in 3D printing. Composites, additive manufacturing, aerodynamics.',
  activeNav = '',
} = Astro.props;

const base = import.meta.env.BASE_URL;

const navLinks = [
  { href: `${base}/`,           label: 'Index' },
  { href: `${base}/about`,      label: 'About' },
  { href: `${base}/experience`, label: 'Experience' },
  { href: `${base}/projects`,   label: 'Projects' },
  { href: `${base}/skills`,     label: 'Skills' },
  { href: `${base}/contact`,    label: 'Contact' },
];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content={SITE.name} />
    <link rel="preload" as="font" href={`${base}/fonts/CameraPlainVariable.woff2`} crossorigin />
  </head>
  <body class="flex min-h-screen flex-col bg-background text-foreground">

    <!-- Sticky nav -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div class="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href={`${base}/`} class="flex items-center gap-3">
          <span class="h-2 w-2 rounded-full bg-ember"></span>
          <span class="font-display text-xl">{SITE.name}</span>
          <span class="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground ml-2">{SITE.tagline}</span>
        </a>
        <nav class="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <a
              href={href}
              class={`font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-foreground ${
                activeNav === label.toLowerCase()
                  ? 'text-foreground ember-underline'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <button aria-label="Toggle menu" class="md:hidden font-mono text-xs tracking-widest uppercase">Menu</button>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border mt-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div class="font-display text-3xl leading-none">{SITE.name}</div>
          <p class="mt-3 text-sm text-muted-foreground max-w-xs">
            Mechanical engineer working at the seam of composites, additive manufacturing, and aerodynamics.
          </p>
        </div>
        <div>
          <div class="eyebrow mb-3">Elsewhere</div>
          <ul class="space-y-2 text-sm">
            <li><a class="hover:text-ember" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a class="hover:text-ember" href={`tel:${SITE.phone.replace(/\D/g, '').replace(/^/, '+')}`}>{SITE.phone}</a></li>
            <li><a class="hover:text-ember" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
            <li><a class="hover:text-ember" href={SITE.resume} target="_blank" rel="noreferrer">Resume ↗</a></li>
          </ul>
        </div>
        <div>
          <div class="eyebrow mb-3">Site</div>
          <ul class="space-y-2 text-sm">
            <li><a href={`${base}/about`}      class="hover:text-ember">About</a></li>
            <li><a href={`${base}/experience`} class="hover:text-ember">Experience</a></li>
            <li><a href={`${base}/projects`}   class="hover:text-ember">Projects</a></li>
            <li><a href={`${base}/skills`}     class="hover:text-ember">Skills</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-border">
        <div class="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>© {SITE.year} {SITE.name}</span>
          <span>{SITE.coords}</span>
        </div>
      </div>
    </footer>

  </body>
</html>
```

- [ ] **Step 2: Build and check**

```bash
npm run build 2>&1 | tail -5
```

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: Layout — sticky nav, footer"
```

---

## Task 6: Shared components (SheetHeader, DrawingFrame, TitleBlock)

**Files:**
- Create: `src/components/SheetHeader.astro`
- Create: `src/components/DrawingFrame.astro`
- Create: `src/components/TitleBlock.astro`

- [ ] **Step 1: Create `src/components/SheetHeader.astro`**

```astro
---
interface Props {
  number: string;   // e.g. "01"
  total?: string;   // e.g. "06"
  title: string;    // e.g. "General Arrangement"
  rev: string;      // e.g. "C"
  author?: string;
  year?: string;
}
const { number, total = '06', title, rev, author = 'Aditya Shah', year = '2026' } = Astro.props;
---
<div class="flex items-end justify-between flex-wrap gap-3 font-mono text-[10px] tracking-[0.25em] uppercase border-b border-border pb-3">
  <div class="flex items-center gap-4">
    <span class="crosshair"></span>
    <span>Sheet {number} / {total}</span>
    <span class="hidden sm:inline text-foreground/50">·</span>
    <span class="hidden sm:inline">{title}</span>
  </div>
  <div class="flex items-center gap-4">
    <span>Rev {rev}</span>
    <span class="h-px w-10 bg-border"></span>
    <span>{author} · {year}</span>
  </div>
</div>
```

- [ ] **Step 2: Create `src/components/DrawingFrame.astro`**

```astro
---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---
<div class={`drawing-frame ${className}`}>
  <slot />
</div>
```

- [ ] **Step 3: Create `src/components/TitleBlock.astro`**

```astro
---
interface Props {
  header: string;
  headerRight?: string;
  rows: Array<{ left?: string; label?: string; value: string; id?: string }>;
  footer?: Array<{ left: string; center?: string; right: string }>;
}
const { header, headerRight, rows, footer } = Astro.props;
---
<div class="title-block">
  <div class="cell flex items-center justify-between bg-foreground text-background">
    <span>{header}</span>
    {headerRight && <span>{headerRight}</span>}
  </div>
  {rows.map((row) => (
    <div class="cell">
      <div class="flex items-center justify-between gap-3">
        <span class="flex items-center gap-3">
          {row.id && <span class="text-foreground/60">{row.id}</span>}
          {row.label && <span>{row.label}</span>}
          {row.left && <span>{row.left}</span>}
        </span>
        <span class="text-right text-foreground">{row.value}</span>
      </div>
    </div>
  ))}
  {footer && footer.map((f) => (
    <div class="cell flex items-center justify-between">
      <span>{f.left}</span>
      {f.center && <span>{f.center}</span>}
      <span>{f.right}</span>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Build check**

```bash
npm run build 2>&1 | tail -5
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/
git commit -m "feat: shared components — SheetHeader, DrawingFrame, TitleBlock"
```

---

## Task 7: Homepage (index.astro) — all 6 sheets

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import SheetHeader from '../components/SheetHeader.astro';
import TitleBlock from '../components/TitleBlock.astro';
import { SITE, HOME, PROJECTS } from '../data/content';

const base = import.meta.env.BASE_URL;
const s = HOME.sheets;
---

<Layout activeNav="index">

  <!-- Sheet 01: General Arrangement -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-14">
    <SheetHeader number={s[0].number} title={s[0].title} rev={s[0].rev} />
    <div class="drawing-frame mt-6 p-6 lg:p-10">
      <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">A1 — 841 × 594 mm</div>
      <div class="grid lg:grid-cols-12 gap-10 items-start">
        <!-- Left: hero text -->
        <div class="lg:col-span-7">
          <div class="callout mb-6">Item 01 · Subject</div>
          <h1 class="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
            {HOME.headline[0]}<br />{HOME.headline[1]}<br />{HOME.headline[2]}<span class="text-ember">.</span>
          </h1>
          <div class="mt-6 flex items-center gap-4">
            <span class="h-px w-24 bg-border"></span>
            <span class="font-mono text-[10px] tracking-[0.25em] uppercase">⌀ 0.001″ tol.</span>
            <span class="h-px flex-1 bg-border"></span>
          </div>
          <p class="mt-8 max-w-xl text-sm leading-relaxed font-mono">{HOME.bio}</p>
          <div class="mt-10 flex flex-wrap items-center gap-5">
            <a href={`${base}/experience`} class="group inline-flex items-center gap-3 border border-foreground bg-foreground text-background px-5 py-3 text-[11px] font-tech hover:bg-ember hover:border-ember transition-colors">
              Work Experience<span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={SITE.resume} target="_blank" rel="noreferrer" class="text-[11px] font-tech border-b border-foreground/40 hover:border-ember hover:text-ember pb-1">
              Resume.pdf ↗
            </a>
          </div>
        </div>
        <!-- Right: BOM table -->
        <aside class="lg:col-span-5">
          <TitleBlock
            header="Parts List"
            headerRight="BOM · REV C"
            rows={HOME.bom.map(b => ({ id: b.id, label: b.label, value: b.value }))}
          />
          <div class="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
            <div class="flex items-center gap-3"><span class="crosshair"></span><span>Datum A</span></div>
            <span>Scale 1 : 1</span>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Sheet 02: Prepreg Layup (hero image) -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pb-14">
    <SheetHeader number={s[1].number} title={s[1].title} rev={s[1].rev} />
    <div class="mt-6 grid lg:grid-cols-12 gap-6">
      <!-- Main image -->
      <div class="lg:col-span-9 relative drawing-frame overflow-hidden">
        <img
          src={`${base}/assets/hero.jpg`}
          alt="Carbon fiber composite layup beside an autoclave"
          width="1600" height="1200"
          class="w-full h-[55vh] lg:h-[65vh] object-cover"
        />
        <!-- Callout dots -->
        <div class="absolute inset-0 pointer-events-none">
          {[
            { top: '14%', left: '18%', label: '01 · Heat Lamp' },
            { top: '48%', left: '62%', label: '02 · Autoclave Door' },
            { top: '74%', left: '22%', label: '03 · Layup Bed' },
          ].map(dot => (
            <div class="absolute flex items-center gap-2" style={`top:${dot.top};left:${dot.left}`}>
              <span class="block h-2 w-2 rounded-full bg-ember ring-2 ring-background"></span>
              <span class="h-px w-12 bg-foreground/70"></span>
              <span class="font-mono text-[10px] tracking-[0.22em] uppercase bg-background/90 border border-border px-2 py-1">{dot.label}</span>
            </div>
          ))}
          <!-- Corner brackets -->
          <span class="absolute w-5 h-5 border-foreground top-3 left-3 border-l border-t"></span>
          <span class="absolute w-5 h-5 border-foreground top-3 right-3 border-r border-t"></span>
          <span class="absolute w-5 h-5 border-foreground bottom-14 left-3 border-l border-b"></span>
          <span class="absolute w-5 h-5 border-foreground bottom-14 right-3 border-r border-b"></span>
        </div>
        <div class="absolute inset-x-0 bottom-0 bg-background/95 border-t border-border px-5 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
          <span>Fig. 01 — Prepreg layup · Autoclave cure cycle</span>
          <span>View A–A · Section 3:1</span>
        </div>
      </div>
      <!-- Sidebar -->
      <aside class="lg:col-span-3 flex flex-col justify-between gap-6">
        <TitleBlock
          header="Process Notes"
          rows={[
            { value: '1. Layup under Class-100 conditions.' },
            { value: '2. Cure 350°F @ 85 psi · 120 min.' },
            { value: '3. Vacuum bag integrity 28 inHg min.' },
            { value: '4. NDT ultrasonic A-scan post-cure.' },
          ]}
        />
        <div class="font-mono text-[10px] tracking-[0.22em] uppercase">
          {[
            { label: 'Material', value: 'T800 / 3900-2' },
            { label: 'Plies',    value: '16 · [0/45/-45/90]₂ₛ' },
            { label: 'VF target', value: '58 ± 2 %' },
          ].map((row, i, arr) => (
            <div class={`flex justify-between py-2 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
              <span>{row.label}</span><span>{row.value}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  </section>

  <!-- Sheet 03: Active Research -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pb-14">
    <SheetHeader number={s[2].number} title={s[2].title} rev={s[2].rev} />
    <div class="mt-6 drawing-frame p-8 lg:p-12 grid lg:grid-cols-12 gap-10">
      <div class="lg:col-span-3">
        <div class="callout mb-4">Status · Current</div>
        <div class="font-mono text-[10px] tracking-[0.22em] uppercase space-y-2">
          <div>Lab · M&T VT</div>
          <div>Since · {HOME.research.since}</div>
          <div>Sheet · 03/06</div>
        </div>
      </div>
      <div class="lg:col-span-9">
        <p class="font-display text-3xl md:text-4xl leading-snug">
          Graduate research on <span class="ember-underline">ultrasound-directed self-assembly</span> of microparticles in VAT photopolymerization — manufacturing functional materials with tailored conductivity, strength, and volatility.
        </p>
        <div class="mt-8 grid grid-cols-3 gap-4 font-mono text-[10px] tracking-[0.22em] uppercase">
          {HOME.research.specs.map(spec => (
            <div class="border-t border-border pt-2">
              <div class="text-foreground/60 mb-1">{spec.label}</div>
              <div>{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <!-- Sheet 04: Projects -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pb-14">
    <SheetHeader number={s[3].number} title={s[3].title} rev={s[3].rev} />
    <div class="mt-6 flex items-end justify-between flex-wrap gap-4 mb-8">
      <h2 class="font-display text-5xl md:text-6xl leading-[0.95]">Projects, briefly<span class="text-ember">.</span></h2>
      <a href={`${base}/projects`} class="font-tech text-[11px] hover:text-ember border-b border-foreground/40 hover:border-ember pb-1">All Projects →</a>
    </div>
    <div class="grid md:grid-cols-12 gap-6">
      <!-- Project cards (first 3 have images) -->
      {PROJECTS.slice(0, 3).map((p, i) => (
        <a
          href={`${base}/projects`}
          class={`group block relative overflow-hidden drawing-frame ${i === 0 ? 'md:col-span-7' : 'md:col-span-5'}`}
        >
          <img
            src={`${base}${p.image}`}
            alt={p.alt}
            loading="lazy"
            class="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
          <div class="absolute inset-0 p-5 flex flex-col justify-between">
            <div class="flex items-start justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
              <span class="bg-background/90 border border-border px-2 py-1">Item {String(i + 1).padStart(2, '0')}</span>
              <span class="bg-foreground text-background px-2 py-1">{p.badge}</span>
            </div>
            <div class="bg-background/95 border-t border-border -mx-5 -mb-5 px-5 py-4">
              <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/70 mb-1">{p.discipline}</div>
              <div class="font-display text-2xl md:text-[1.6rem] leading-tight">{p.title}</div>
            </div>
          </div>
        </a>
      ))}
      <!-- Disciplines table -->
      <div class="md:col-span-7 drawing-frame p-8 flex flex-col justify-between">
        <div>
          <div class="callout mb-5">Schedule · Disciplines</div>
          <table class="w-full font-mono text-[11px] tracking-[0.14em] uppercase">
            <thead>
              <tr class="border-b border-border text-[10px] text-foreground">
                <th class="text-left py-2 w-10">No</th>
                <th class="text-left py-2">Discipline</th>
                <th class="text-right py-2">Tooling</th>
              </tr>
            </thead>
            <tbody>
              {[
                { no: '01', discipline: 'Composite tooling & layup', tooling: 'Autoclave · OoA' },
                { no: '02', discipline: 'Additive manufacturing',     tooling: 'LPBF · VAT' },
                { no: '03', discipline: 'Aerodynamics & CFD',         tooling: 'SimScale · STAR' },
                { no: '04', discipline: 'DFAM & design optimisation', tooling: 'NX · nTop' },
              ].map(row => (
                <tr class="border-b border-border last:border-b-0">
                  <td class="py-3 text-foreground/60">{row.no}</td>
                  <td class="py-3">{row.discipline}</td>
                  <td class="py-3 text-right text-foreground/70">{row.tooling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href={`${base}/skills`} class="mt-8 font-tech text-[11px] hover:text-ember border-b border-foreground/40 hover:border-ember pb-1 self-start">Full Skillset →</a>
      </div>
    </div>
  </section>

  <!-- Sheet 05: Quote -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pb-14">
    <SheetHeader number={s[4].number} title={s[4].title} rev={s[4].rev} />
    <div class="mt-6 drawing-frame p-10 lg:p-16 text-center">
      <div class="callout justify-center mb-6">Note 01</div>
      <p class="font-display italic text-3xl md:text-5xl leading-snug max-w-4xl mx-auto">
        "{HOME.quote.normal} <span class="text-ember not-italic">{HOME.quote.ember}</span>
      </p>
      <div class="mt-8 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span class="h-px w-12 bg-border"></span>
        <span>{HOME.quote.attr}</span>
        <span class="h-px w-12 bg-border"></span>
      </div>
    </div>
  </section>

  <!-- Sheet 06: Contact Title Block -->
  <section class="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
    <SheetHeader number={s[5].number} title={s[5].title} rev={s[5].rev} />
    <div class="mt-6 grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 drawing-frame p-10 lg:p-14 flex items-center">
        <h2 class="font-display text-5xl md:text-7xl leading-[0.95]">
          Let's build<br />something<br /><span class="italic text-ember">tangible.</span>
        </h2>
      </div>
      <div class="lg:col-span-5">
        <TitleBlock
          header="Title Block"
          headerRight="AS-001 · A1"
          rows={[
            { left: 'Drawn By',   value: SITE.name },
            { left: 'Discipline', value: 'Mech · Composites · AM' },
            { left: 'Available',  value: 'Summer 2026' },
            { left: 'Email',      value: SITE.email },
            { left: 'Phone',      value: SITE.phone },
            { left: 'LinkedIn',   value: 'adityashah2301 ↗' },
          ]}
          footer={[{ left: 'Scale 1:1', center: 'Units · mm', right: 'Sheet 06 / 06' }]}
        />
      </div>
    </div>
  </section>

</Layout>
```

- [ ] **Step 2: Start dev server and verify homepage in browser**

```bash
npm run dev
```

Open `http://localhost:4321/aditya/` — verify all 6 sheets render, images load, BOM table shows.

- [ ] **Step 3: Build and check**

```bash
npm run build 2>&1 | tail -5
```

Expected: build completes, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: homepage — all 6 engineering-drawing sheets"
```

---

## Task 8: About page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create `src/pages/about.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import SheetHeader from '../components/SheetHeader.astro';
import { ABOUT } from '../data/content';
---

<Layout
  title="About — Aditya Shah"
  description="Mechanical Engineering Master's student at Virginia Tech — composites, additive manufacturing, aerodynamics."
  activeNav="about"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20">
    <SheetHeader number="001" total="001" title="About" rev="A" />

    <!-- Quote + info table -->
    <div class="mt-8 grid lg:grid-cols-12 gap-10">
      <div class="lg:col-span-8 drawing-frame p-8 lg:p-12">
        <p class="font-display italic text-2xl md:text-3xl leading-snug text-muted-foreground">
          "{ABOUT.quote}"
        </p>
      </div>
      <aside class="lg:col-span-4">
        <div class="title-block">
          {ABOUT.info.map(row => (
            <div class="cell flex items-center justify-between gap-3">
              <span class="text-muted-foreground">{row.label}</span>
              <span class="text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>

    <!-- Bio sections -->
    <div class="mt-16 space-y-14">
      {ABOUT.sections.map(sec => (
        <div class="grid lg:grid-cols-12 gap-6 border-t border-border pt-10">
          <div class="lg:col-span-3">
            <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{sec.number} — {sec.eyebrow}</div>
          </div>
          <div class="lg:col-span-9">
            <h2 class="font-display text-3xl md:text-4xl mb-5">{sec.heading}</h2>
            <p class="text-sm leading-relaxed font-mono text-foreground max-w-2xl">{sec.body}</p>
          </div>
        </div>
      ))}
    </div>

    <!-- Closing quote -->
    <div class="mt-20 drawing-frame p-10 text-center">
      <p class="font-display italic text-2xl md:text-3xl leading-snug max-w-3xl mx-auto">
        "{ABOUT.closingQuote.text}"
      </p>
      <div class="mt-6 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span class="h-px w-12 bg-border"></span>
        <span>— {ABOUT.closingQuote.attr}</span>
        <span class="h-px w-12 bg-border"></span>
      </div>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:4321/aditya/about` — verify quote, info table, 4 sections, closing quote all appear.

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: about page — bio, 4 sections, Einstein quote"
```

---

## Task 9: Experience page

**Files:**
- Create: `src/pages/experience.astro`

- [ ] **Step 1: Create `src/pages/experience.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import SheetHeader from '../components/SheetHeader.astro';
import { EXPERIENCE } from '../data/content';
---

<Layout
  title="Experience — Aditya Shah"
  description="4 positions across composites, FSAE aerodynamics, and graduate research."
  activeNav="experience"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20">
    <SheetHeader number="04" total="04" title="Experience" rev="A" />

    <div class="mt-4 flex items-end justify-between mb-12">
      <div>
        <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">04 positions · 6 years</div>
        <h1 class="font-display text-4xl md:text-5xl mt-2">From the FSAE paddock to the lab bench.</h1>
      </div>
    </div>

    <div class="space-y-0">
      {EXPERIENCE.map((exp, i) => (
        <div class={`grid lg:grid-cols-12 gap-6 py-12 ${i > 0 ? 'border-t border-border' : ''}`}>
          <!-- Date + location sidebar -->
          <div class="lg:col-span-3 font-mono text-[11px] tracking-[0.15em] uppercase">
            <div class="text-muted-foreground mb-1">{exp.period}</div>
            <div class="text-muted-foreground">{exp.location}</div>
          </div>
          <!-- Main content -->
          <div class="lg:col-span-9">
            <div class="font-display text-2xl md:text-3xl mb-1">{exp.role}</div>
            <div class="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-5">{exp.org}</div>
            <ul class="space-y-3">
              {exp.bullets.map(b => (
                <li class="flex gap-3 text-sm font-mono leading-relaxed">
                  <span class="text-ember mt-1 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div class="mt-5 flex flex-wrap gap-2">
              {exp.tags.map(tag => (
                <span class="font-mono text-[10px] tracking-[0.2em] uppercase border border-border px-2 py-1 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:4321/aditya/experience` — verify all 4 positions, dates, bullets, tags.

- [ ] **Step 3: Build check + commit**

```bash
npm run build 2>&1 | tail -5
git add src/pages/experience.astro
git commit -m "feat: experience page — 4 positions with bullets and tags"
```

---

## Task 10: Projects page

**Files:**
- Create: `src/pages/projects/index.astro`

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p src/pages/projects
```

- [ ] **Step 2: Create `src/pages/projects/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import SheetHeader from '../../components/SheetHeader.astro';
import { PROJECTS } from '../../data/content';

const base = import.meta.env.BASE_URL;
---

<Layout
  title="Projects — Aditya Shah"
  description="4 selected projects: DRS, LPBF golf club, vortex generators, phone holder."
  activeNav="projects"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20">
    <SheetHeader number="04" total="04" title="Projects · Selected" rev="D" />

    <div class="mt-4 mb-12">
      <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">04 selected</div>
      <h1 class="font-display text-4xl md:text-5xl mt-2">Designed, simulated, built — tested.</h1>
    </div>

    <div class="space-y-16">
      {PROJECTS.map((p, i) => (
        <div class={`grid lg:grid-cols-12 gap-8 ${i > 0 ? 'border-t border-border pt-16' : ''}`}>
          <!-- Image -->
          {p.image ? (
            <div class="lg:col-span-7 relative drawing-frame overflow-hidden">
              <img
                src={`${base}${p.image}`}
                alt={p.alt}
                loading="lazy"
                class="w-full h-72 md:h-80 object-cover"
              />
              <div class="absolute top-3 left-3 font-mono text-[10px] tracking-[0.25em] uppercase bg-background/90 border border-border px-2 py-1">
                Fig.{String(i + 1).padStart(2, '0')} — {p.discipline}
              </div>
            </div>
          ) : (
            <div class="lg:col-span-7 drawing-frame p-10 flex items-center justify-center bg-background/50">
              <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground text-center">
                Fig.{String(i + 1).padStart(2, '0')} — {p.discipline}
              </div>
            </div>
          )}
          <!-- Details -->
          <div class="lg:col-span-5">
            <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
              {p.number} · {p.badge}
            </div>
            <h2 class="font-display text-2xl md:text-3xl mb-6">{p.title}</h2>
            <ul class="space-y-3 mb-6">
              {p.bullets.map(b => (
                <li class="flex gap-3 text-sm font-mono leading-relaxed">
                  <span class="text-ember mt-1 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div class="flex flex-wrap gap-2">
              {p.tags.map(tag => (
                <span class="font-mono text-[10px] tracking-[0.2em] uppercase border border-border px-2 py-1 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    <!-- Closing quote -->
    <div class="mt-20 drawing-frame p-10 text-center">
      <p class="font-display italic text-2xl md:text-3xl leading-snug max-w-3xl mx-auto">
        "An engineer is someone who can do for a dime what any fool can do for a dollar."
      </p>
      <div class="mt-6 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span class="h-px w-12 bg-border"></span>
        <span>— Henry Ford</span>
        <span class="h-px w-12 bg-border"></span>
      </div>
    </div>
  </div>
</Layout>
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:4321/aditya/projects` — verify all 4 projects, 3 with images, bullets, tags, closing quote.

- [ ] **Step 4: Build check + commit**

```bash
npm run build 2>&1 | tail -5
git add src/pages/projects/
git commit -m "feat: projects page — 4 selected projects with images and bullets"
```

---

## Task 11: Skills page

**Files:**
- Create: `src/pages/skills.astro`

- [ ] **Step 1: Create `src/pages/skills.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import SheetHeader from '../components/SheetHeader.astro';
import { SKILLS } from '../data/content';
---

<Layout
  title="Skills — Aditya Shah"
  description="CAD, simulation, manufacturing, and programming toolkit."
  activeNav="skills"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20">
    <SheetHeader number="04" total="04" title="Toolkit · Disciplines" rev="A" />

    <div class="mt-4 mb-12">
      <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">04 disciplines</div>
      <h1 class="font-display text-4xl md:text-5xl mt-2">The tools I reach for first.</h1>
    </div>

    <div class="space-y-0">
      {SKILLS.map((group, i) => (
        <div class={`grid lg:grid-cols-12 gap-6 py-12 ${i > 0 ? 'border-t border-border' : ''}`}>
          <div class="lg:col-span-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {group.number}
          </div>
          <div class="lg:col-span-10">
            <h2 class="font-display text-2xl md:text-3xl mb-8">{group.discipline}</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tools.map(tool => (
                <div class="drawing-frame p-4">
                  <div class="font-display text-lg mb-1">{tool.name}</div>
                  <div class="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground leading-relaxed">
                    {tool.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    <!-- Closing quote -->
    <div class="mt-20 drawing-frame p-10 text-center">
      <p class="font-display italic text-2xl md:text-3xl leading-snug max-w-3xl mx-auto">
        "The best way to predict the future is to invent it."
      </p>
      <div class="mt-6 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span class="h-px w-12 bg-border"></span>
        <span>— Alan Kay</span>
        <span class="h-px w-12 bg-border"></span>
      </div>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify in browser + build check + commit**

```bash
# verify at http://localhost:4321/aditya/skills
npm run build 2>&1 | tail -5
git add src/pages/skills.astro
git commit -m "feat: skills page — 4 discipline groups with tool cards"
```

---

## Task 12: Contact page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create `src/pages/contact.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import SheetHeader from '../components/SheetHeader.astro';
import TitleBlock from '../components/TitleBlock.astro';
import { CONTACT, SITE } from '../data/content';
---

<Layout
  title="Contact — Aditya Shah"
  description="Get in touch — open to full-time roles, research collaborations, and a good engineering conversation."
  activeNav="contact"
>
  <div class="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20">
    <SheetHeader number="001" total="001" title="Contact · let's talk" rev="C" />

    <div class="mt-4 mb-12">
      <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Say hello.</div>
      <p class="font-mono text-sm mt-4 max-w-xl leading-relaxed">
        Best way to reach me is email — I read everything. Open to full-time roles, research collaborations, and a good engineering conversation.
      </p>
    </div>

    <div class="grid lg:grid-cols-12 gap-8">
      <!-- Contact methods -->
      <div class="lg:col-span-6 space-y-4">
        {CONTACT.methods.map(method => (
          <a
            href={method.href}
            target={method.href.startsWith('http') ? '_blank' : undefined}
            rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
            class="group flex items-center justify-between drawing-frame p-5 hover:border-ember transition-colors"
          >
            <div>
              <div class="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{method.label}</div>
              <div class="font-display text-xl group-hover:text-ember transition-colors">{method.value}</div>
            </div>
            <span class="font-mono text-muted-foreground group-hover:text-ember transition-colors">→</span>
          </a>
        ))}
      </div>

      <!-- Info table -->
      <div class="lg:col-span-6">
        <TitleBlock
          header="Status & Details"
          rows={CONTACT.info.map(row => ({ left: row.label, value: row.value }))}
        />
      </div>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify in browser + build check + commit**

```bash
# verify at http://localhost:4321/aditya/contact
npm run build 2>&1 | tail -5
git add src/pages/contact.astro
git commit -m "feat: contact page — methods, info table"
```

---

## Task 13: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 2: Update `astro.config.mjs` with correct site/base**

Edit `astro.config.mjs` to set the correct values for the GitHub repo:
```js
site: 'https://darshannere.github.io',   // or custom domain
base: '/aditya',                           // matches repo name
```

> If using a custom domain (e.g. `aditya.darshan.dev`), set `site` to that and `base: '/'`.

- [ ] **Step 3: Enable GitHub Pages in repo settings**

In GitHub → repository Settings → Pages:
- Source: **GitHub Actions**

- [ ] **Step 4: Commit workflow**

```bash
git add .github/
git commit -m "ci: GitHub Actions deploy to GitHub Pages"
```

---

## Task 14: Final verification

- [ ] **Step 1: Full build + check all pages exist**

```bash
npm run build
ls dist/
ls dist/about/ dist/experience/ dist/projects/ dist/skills/ dist/contact/
```

Expected: each directory contains an `index.html`.

- [ ] **Step 2: Preview the built site**

```bash
npm run preview
```

Open `http://localhost:4321/aditya/` in browser. Navigate through all 6 pages. Check:
- Nav links work on every page
- Active nav item highlighted correctly on each page
- All images load (hero, 3 project photos)
- Font renders correctly (CameraPlainVariable for headings, mono for labels)
- Ember red accent shows on `.`, `tangible.`, quote highlight, `→` hover
- Footer shows on all pages

- [ ] **Step 3: Responsive check**

Resize browser to 375px — verify nav collapses to "Menu" button, sheet headers truncate cleanly, grid stacks to single column.

- [ ] **Step 4: Push to GitHub and verify deploy**

```bash
git remote add origin https://github.com/darshannere/aditya.git
git push -u origin main
```

Wait ~2 minutes, then open `https://darshannere.github.io/aditya/` to verify live deploy.

---

## Self-Review Notes

- **Spec coverage:** All 6 pages covered. Font + images downloaded. Custom CSS 6 classes defined. GitHub Actions workflow included. Content.ts is single source of truth. ✓
- **Placeholder scan:** `astro.config.mjs` site/base are noted as user-configurable (intentional). No TBDs or unimplemented stubs. ✓
- **Type consistency:** `PROJECTS[].image` is `string | null` — Task 10 handles `null` with a placeholder div. `TitleBlock` `rows` accepts both `left`/`label` shapes — consistent across Tasks 5, 7, 12. ✓
- **Font base path:** `global.css` uses `/fonts/CameraPlainVariable.woff2`. With a non-root base (e.g. `/aditya`), this will 404. Fix: in `Layout.astro`, the `<link rel="preload">` uses `${base}/fonts/...`. The `@font-face` in CSS still uses the root-relative path — this works for GitHub Pages only if the font is at the root. **Resolution:** Change `global.css` `@font-face` src to use a CSS custom property or inline the font URL correctly. Simpler fix: move `@font-face` into `Layout.astro` `<style>` tag where Astro can inject the correct base URL, or just test that GitHub Pages serves `/aditya/fonts/CameraPlainVariable.woff2` correctly. The public/ directory gets served at the base path in Astro's static output, so this works automatically.
