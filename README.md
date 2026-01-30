# Altamira Tech Labs — Website Starter (Next.js + Sanity + i18n)

This repo is a **scalable starter** for:
- Landing page + blog (SEO ready)
- **Next.js App Router** + TypeScript + Tailwind
- **Sanity Studio** (content management)
- **Multilanguage routing**: `en`, `es`, `pt`, `fr`, `de`

## Monorepo structure
- `apps/web` — Next.js website (landing + blog)
- `apps/studio` — Sanity Studio (CMS)

## Requirements
- Node.js 18+ (recommended 20+)
- npm 9+ (or pnpm/yarn — repo is npm-workspaces ready)

## Quick start (local)
1) Install deps (root):
```bash
npm install
```

2) Setup Sanity project (one-time)
- Create a project in Sanity (web UI or CLI)
- Copy Project ID + Dataset name

3) Configure env
- Copy `.env.local.example` to `.env.local` inside `apps/web` and fill values.
- Copy `.env.example` to `.env` inside `apps/studio` and fill values.

4) Run dev
```bash
npm run dev
```

This will start:
- Web: http://localhost:3000
- Studio: http://localhost:3333

## Deploy
### Web
Deploy `apps/web` to Vercel (recommended).

### Studio
Deploy `apps/studio` to Sanity hosting (`sanity deploy`) or any static hosting.

## Notes
- i18n is implemented with a **[locale] route segment + middleware redirect**.
- Blog pages fetch content from Sanity using GROQ.
- You can extend schema types in `apps/studio/schemaTypes/*`.

---
If you want, I can also add:
- sitemap generation per locale
- RSS feed
- schema.org JSON-LD for Article/Organization
- case studies templates + service landing pages


## Contact form (Resend)
- Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in `apps/web/.env.local`
- The API route is `apps/web/src/app/api/contact/route.ts`
- Includes a simple rate limit + honeypot


## Branding
- Brand colors (from provided assets):
  - Navy: `#003050`
  - Orange: `#D06010`
  - Offwhite: `#F4F6F8`
- Assets in `apps/web/public/brand/`
