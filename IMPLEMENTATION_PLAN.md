# Portfolio Implementation Plan

## Product direction

Create a minimal, premium, light-themed developer portfolio with expressive editorial typography and restrained motion. The site should feel personal and creative without relying on loud colors or a corporate visual language.

The portfolio has two living content systems:

1. **Projects from GitHub** — repository metadata powers cards and a repository README powers each detail page.
2. **Articles from a blog provider** — DEV.to is the first provider, with the data layer kept replaceable so Hashnode or local MDX can be added later.

## Information architecture

| Route | Purpose | Data source |
| --- | --- | --- |
| `/` | Hero, selected work, latest writing, contact prompt | GitHub + blog provider |
| `/projects` | Searchable and filterable project archive | GitHub |
| `/projects/[slug]` | README-led project story and repository link | GitHub |
| `/blog` | Searchable and filterable article archive | DEV.to initially |
| `/blog/[slug]` | Distraction-free, Medium-style reading view | DEV.to initially |
| `/about` | Bio, capabilities, and working style | Local content |
| `/contact` | Email and social calls to action | Environment/config |

## Design system

- Warm off-white canvas, near-black typography, stone borders, and one muted lime accent.
- Large high-contrast display serif for the hero; neutral sans serif for interfaces; monospace for metadata.
- Spacious layouts, thin borders, generous type scale, and subtle card lifts.
- Project cards use imagery or abstract monochrome treatments, not unrelated colors.
- Motion is brief and optional, and respects `prefers-reduced-motion`.

## Technical architecture

- Next.js App Router, TypeScript, React, and Tailwind CSS.
- Server-rendered content fetching with cache revalidation.
- `src/lib/projects.ts` normalizes GitHub data into a stable `Project` model.
- `src/lib/posts.ts` normalizes provider data into a stable `Post` model.
- Client-side archive controls handle fast search and tag filtering.
- Fallback sample content keeps the UI complete before account names are configured.

## Delivery phases

### Phase 1 — Foundation (started)

- Scaffold the app, routes, global tokens, header, and footer.
- Implement the visual direction and responsive homepage.
- Add local fallback projects and articles.

### Phase 2 — Dynamic content (started)

- Add the GitHub repository and README adapter.
- Add the DEV.to article adapter.
- Add search, filters, tags, and dynamic detail routes.

### Phase 3 — Personalization

- Connect `GITHUB_USERNAME` and `DEVTO_USERNAME`.
- Replace placeholder biography, contact details, and social links.
- Add curated project overrides for ordering, cover art, and hidden repositories.
- Translate the selected Figma direction into final spacing and responsive details.

### Phase 4 — Quality and launch

- Add real Open Graph artwork and a custom favicon.
- Validate accessibility, metadata, empty/error states, and keyboard behavior.
- Run Lighthouse and responsive visual checks.
- Deploy to Vercel and connect a domain.

## Configuration

Copy `.env.example` to `.env.local` and provide:

```bash
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=optional-token-for-higher-api-limits
DEVTO_USERNAME=your-devto-username
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
```

## Definition of the first usable release

- All five primary sections exist and work on mobile and desktop.
- Projects and posts are populated without editing page components.
- Search and tag filtering work in both archives.
- Each project and article has a readable detail route.
- Missing external configuration falls back gracefully.
- Type checking and a production build pass on Node 20.9 or newer.

