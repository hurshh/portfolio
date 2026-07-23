# Harsh — Portfolio

A modular, editorial developer portfolio built with Next.js, TypeScript, React, and Tailwind CSS. Projects can be populated from GitHub and articles from DEV.to, while local fallback content keeps the site usable before accounts are connected.

## Run locally

This project requires Node 20.9 or newer. Node 22 is already available in the current nvm installation.

```bash
nvm use 22
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect your content

Edit `.env.local`:

```bash
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=optional-token-for-higher-api-limits
DEVTO_USERNAME=your-devto-username
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
```

- GitHub repositories are fetched, normalized, and shown on the Projects pages.
- Each project page fetches that repository's README.
- DEV.to articles populate the Blog pages and retain a link to the original article.
- Without usernames, curated demo entries are shown from the fallback data files.

## Important files

- `PORTFOLIO_SPEC.md` — full product specification
- `IMPLEMENTATION_PLAN.md` — phased implementation plan and decisions
- `src/lib/projects.ts` — GitHub adapter and project fallback content
- `src/lib/posts.ts` — DEV.to adapter and article fallback content
- `src/app/globals.css` — visual tokens and responsive design system

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Next personalization pass

1. Add real usernames and contact details to `.env.local`.
2. Replace placeholder biography and social URLs.
3. Add project cover images or curated GitHub repository overrides.
4. Apply the final Figma template's exact typography, spacing, and imagery.
5. Deploy to Vercel and set `NEXT_PUBLIC_SITE_URL` to the production domain.
