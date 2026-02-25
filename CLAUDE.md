# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Algodóm con Amor is a handmade baby clothing e-commerce catalogue. It's a JAMstack monorepo with two independent apps:

- **`web/`** — Public Next.js frontend (product catalogue, no cart/checkout)
- **`studio/`** — Sanity Studio CMS for managing products

Each app manages its own dependencies. **Never run commands from the repo root** — always `cd web` or `cd studio` first. There is no `node_modules` at the root.

## Development commands

```bash
# Frontend (Next.js) — http://localhost:3000
cd web && npm run dev

# CMS (Sanity Studio) — http://localhost:3333
cd studio && npm run dev

# Expose web to local network
cd web && npm run dev -- --hostname 0.0.0.0 --port 3000
```

```bash
# Build
cd web && npm run build
cd studio && npm run build

# Lint
cd web && npm run lint
cd studio && npx eslint .

# Deploy Sanity Studio
cd studio && npm run deploy
```

> If `@import "tailwindcss"` fails to resolve (Turbopack issue), use `npm run dev -- --webpack`. The `dev` script in `web/package.json` already includes `--webpack` as the default.

## Architecture

### Data flow

All product content lives in **Sanity Content Lake** (projectId: `wfz6uel0`, dataset: `production`). The Next.js app fetches data at request time using GROQ queries via `@sanity/client`. There is no local database.

- `web/src/lib/sanity.client.ts` — configured Sanity client (reads from `NEXT_PUBLIC_SANITY_*` env vars)
- `web/src/lib/sanity.image.ts` — `urlFor()` helper for building CDN image URLs

### Environment variables (`web/.env.local`)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=wfz6uel0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-24
```

### Routing

All routes are under `web/src/app/` (Next.js App Router):

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero + product grid from Sanity |
| `/productos` | `app/productos/page.tsx` | Placeholder — not yet developed |
| `/producto/[slug]` | `app/producto/[slug]/page.tsx` | Dynamic product detail page |
| `/quienes-somos` | `app/quienes-somos/page.tsx` | Placeholder |
| `/contacto` | `app/contacto/page.tsx` | Placeholder |

`app/layout.tsx` wraps all pages with `<Navbar>` and `<Footer>`.

### Sanity product schema

Defined in `studio/schemaTypes/product.ts`. Key fields: `title` (req), `slug` (req, auto-generated), `gender` (nina/nino/unisex), `category` (jersey/pelele/chaqueta/gorro/patucos/manta/conjunto/otro), `status` (available/made_to_order/sold_out), `price` (optional number — if absent, show "Consultar"), `images` (array, min 1, each with `alt`), `ageRanges`, `materials`, `featured`.

### Styling

Tailwind CSS v4 is imported as `@import "tailwindcss"` (not the v3 directives). Brand colors are CSS variables defined in `web/src/app/globals.css` and consumed inline:

```
--color-cream: #F6EFE7      background
--color-cream-dark: #EDE3D7
--color-pink: #F6C8CF       borders, Instagram CTA
--color-pink-pale: #FEF5F6
--color-blue: #8EC6E8       WhatsApp CTA, hover
--color-blue-pale: #EEF7FC
--color-brown: #6B4A3C      primary text
--color-brown-deep: #2E1A10
```

Use them in JSX as: `bg-[var(--color-cream)] text-[var(--color-brown)]`

If style changes don't appear, restart the dev server.

## Contact details (hardcoded in components)

- WhatsApp: `https://wa.me/34616640570`
- Instagram: `https://instagram.com/algodomconamor`
- Email: `lorenads@hotmail.com`

## Known issues / gotchas

- Sanity Studio can be OOM-killed (exit 137) on low-RAM servers — it's a heavy process
- The `.env` at the repo root contains an old/incorrect project ID (`i9ufw8k3`); the real ID is `wfz6uel0` from `web/.env.local`
- Next.js warns about multiple lockfiles in the workspace — non-critical
