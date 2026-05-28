# Mallorca Wedding — Project Specs

## What the app does
A marketplace connecting UK couples planning destination weddings in Mallorca with verified local wedding planners. Inspired by agenturfinder.com — an SEO-led content platform with a conversion funnel (Smart Matcher) and a planner directory.

## Who uses it
- **Couples:** UK-based (primarily) couples planning Mallorca weddings, seeking planners, budget info, venue cost guides
- **Planners:** Mallorca-based wedding planners seeking pre-qualified leads

## Tech Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4
- GSAP + ScrollTrigger for animations
- Static data (JSON/TS) for v1 — Supabase in production
- Deployed on Vercel

## Pages & User Flows

### Public (couple-facing)
- `/` — Homepage: hero, matcher entry, stats, venue cost cards, planner types, featured planners, FAQ
- `/matcher` — Smart Matcher funnel: 8 steps → results → optional 6-step refinement
- `/planners` — Filterable planner directory
- `/planner/[id]` — Individual planner profile with enquiry modal
- `/venue/[id]` — Venue cost guide (SEO-led, with breakdown, FAQ, JSON-LD)
- `/find-a-planner` — SEO landing for "wedding planner mallorca"
- `/blog` — Blog index
- `/blog/[slug]` — Blog article
- `/real-weddings` — Real wedding case studies
- `/real-weddings/[slug]` — Individual real wedding
- `/about` — About/mission page
- `/standards` — Editorial standards & methodology (EEAT)

### Planner-facing
- `/for-pros` — Supply-side landing with pricing tiers and intake form

## Data Models
- `Planner` — id, name, firm, location, style, types, guests, budget, price, rating, reviews, languages, bio, photos, services, preferredVenues
- `Venue` — id, name, region, capacity, pricing, costSnapshot, breakdown, pros, alternatives, plannerIds
- `BlogPost` — slug, title, excerpt, category, img, date, readTime
- `RealWedding` — slug, couple, venue, guests, total, breakdown, suppliers, photos, quote

## Third-party Services
- Google Fonts (Cormorant Garamond, Manrope)
- GSAP (animations)
- Supabase (future — auth, DB, enquiry storage)
- Vercel (deployment)

## What "done" looks like
- All pages render correctly with no TypeScript errors
- GSAP animations on hero, section entries, cards
- SEO metadata on every page
- JSON-LD on venue pages and homepage
- `npm run build` passes cleanly
