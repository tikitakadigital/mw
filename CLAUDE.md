# Project Overview
Mallorca Wedding — a platform connecting UK couples with verified local wedding planners in Mallorca.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP animations.

---

# Design
Senior UI designer and frontend developer mindset. Premium, modern, editorial interfaces.
Subtle GSAP animations, proper spacing, visual hierarchy. No emoji icons. No generic gradients.
Typography: Cormorant Garamond (display/serif) + Manrope (body).
Color palette: bone canvas, terracotta primary, deep ink text.

---

# Tech Stack
- **Language:** TypeScript
- **Framework:** Next.js (App Router, latest)
- **Backend-as-a-Service:** Supabase (future)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Animations:** GSAP + ScrollTrigger
- **Fonts:** Google Fonts (Cormorant Garamond + Manrope)

---

# File Structure
- `/src/app/` — Next.js App Router pages
- `/src/components/` — Reusable UI components
- `/src/lib/` — Data, types, utilities
- `/public/` — Static assets, images
- `project_specs.md` — Spec document

---

# Development Rules
1. Always read CLAUDE.md and project_specs.md before acting
2. Define before building — update project_specs.md for any new feature
3. Look before creating — check existing files first
4. Test before responding — run build, check for errors
5. Do exactly what is asked. Nothing more, nothing less

---

# Code Rules
- Write simple, readable TypeScript — clarity over cleverness
- One component per file; co-locate page-specific components near the page
- Keep pages thin — delegate to components and lib functions
- No inline business logic in page components
- GSAP animations in dedicated hooks/components, never scattered inline
- All images: next/image with proper alt text, width/height
- SEO: metadata exports on every page, JSON-LD where appropriate
- AI visibility: semantic HTML, structured data, descriptive headings
