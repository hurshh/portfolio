# Portfolio Website Specification

## 1. Project Overview

Build a modern, modular portfolio website based on a customized Figma template. The website will showcase selected projects, publish blog posts, describe professional experience, and provide a clear way to make contact.

The Figma design is the visual source of truth. The implementation should reproduce its layout and visual language while using reusable components instead of page-specific duplication.

## 2. Goals

- Present projects through polished, detailed case studies.
- Publish and update blog posts without changing page components.
- Keep content separate from presentation.
- Make sections and UI components reusable and easy to rearrange.
- Support desktop, tablet, and mobile layouts.
- Provide strong accessibility, SEO, and performance.
- Make it possible to adopt a CMS later without rebuilding the UI.

## 3. Recommended Technology

| Area | Choice | Purpose |
| --- | --- | --- |
| Framework | Next.js App Router with TypeScript | Routing, rendering, metadata, and application structure |
| Styling | Tailwind CSS | Responsive implementation of Figma styles |
| Initial content source | Local MDX | Version-controlled projects and blog posts |
| Future CMS | Sanity, if needed | Visual editing, drafts, and multiple editors |
| Hosting | Vercel | Deployment and preview environments |
| Design handoff | Official Figma MCP integration | Structured access to Figma designs and assets |

### Content strategy

Use MDX for the initial release if there is only one editor. All content access should pass through a small data layer so that MDX can later be replaced by Sanity without changing page components.

## 4. Primary Pages

### Home (`/`)

The homepage should be assembled from modular sections. Expected sections include:

- Header and navigation
- Hero introduction
- Featured projects
- Short biography or capabilities summary
- Selected experience, services, or skills
- Latest blog posts
- Contact call to action
- Footer

The exact order and presence of sections will follow the selected Figma template.

### Projects index (`/projects`)

- Display all published projects.
- Highlight featured projects where appropriate.
- Support optional filtering by discipline, technology, or tag.
- Generate cards from project content rather than hard-coded markup.

### Project detail (`/projects/[slug]`)

Each project should support:

- Title, summary, role, date, and project type
- Cover image and image gallery
- Problem or context
- Responsibilities and process
- Solution and implementation
- Results or measurable impact
- Technologies and tags
- External project and repository links, when available
- Previous and next project navigation
- Reusable rich-content blocks

### Blog index (`/blog`)

- Display published articles in reverse chronological order.
- Support tags or categories if enough articles exist to justify them.
- Show title, summary, publication date, cover image, and estimated reading time.

### Blog detail (`/blog/[slug]`)

- Render MDX content using a defined component set.
- Support headings, links, images, lists, quotes, tables, and code blocks.
- Generate a table of contents when useful.
- Show publication date, updated date, tags, and reading time.
- Provide related-post navigation.

### About (`/about`)

- Professional biography
- Skills or capabilities
- Experience timeline
- Optional resume link
- Personal image or supporting media

### Contact (`/contact`)

- Email and relevant social links
- Optional contact form with validation and spam protection
- Clear response expectations

## 5. Content Models

### Project

```yaml
title: Portfolio Redesign
slug: portfolio-redesign
summary: A modular portfolio built from a Figma design.
publishedAt: 2026-07-16
featured: true
status: published
role: Designer and developer
tags:
  - Next.js
  - Design Systems
coverImage: /images/projects/portfolio/cover.webp
projectUrl: https://example.com
repositoryUrl: https://github.com/example/project
```

### Blog post

```yaml
title: Building a Modular Portfolio
slug: building-a-modular-portfolio
summary: Lessons from translating a Figma system into reusable code.
publishedAt: 2026-07-16
updatedAt: 2026-07-16
status: published
tags:
  - Design
  - Development
coverImage: /images/blog/modular-portfolio.webp
```

Draft content must not appear in production lists, feeds, sitemaps, or direct routes.

## 6. Proposed Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── projects/
│   ├── blog/
│   └── ui/
├── content/
│   ├── projects/
│   └── blog/
├── lib/
│   ├── content.ts
│   ├── metadata.ts
│   └── utils.ts
└── styles/
```

## 7. Component Architecture

### UI primitives

Create small components representing the design system:

- `Container`
- `Button`
- `Heading`
- `Text`
- `Tag`
- `Icon`
- `ResponsiveImage`
- `Divider`

### Content components

- `ProjectCard`
- `ProjectGrid`
- `PostCard`
- `PostList`
- `RichText`
- `CodeBlock`
- `TableOfContents`

### Page sections

- `Hero`
- `FeaturedProjects`
- `AboutSummary`
- `ExperienceTimeline`
- `SkillsGrid`
- `LatestPosts`
- `ContactCallout`

Page sections may compose UI primitives and content components. They should not contain duplicated project or blog data.

## 8. Design Implementation Rules

- Treat Figma variables and styles as design tokens.
- Define shared tokens for color, typography, spacing, radii, shadows, and motion.
- Do not copy arbitrary values into every component when a token can represent them.
- Preserve the visual hierarchy of the template while replacing generic template content and branding.
- Implement responsive behavior intentionally; do not assume the desktop frame should simply shrink.
- Export images at appropriate resolutions and prefer modern formats such as WebP or AVIF.
- Use SVG for suitable icons and simple vector artwork.
- Record any intentional differences between Figma and production behavior.

## 9. Functional Requirements

- Project and blog routes are generated from content slugs.
- Featured and latest content sections update automatically.
- Invalid or unpublished slugs return a proper not-found page.
- Every content page has unique metadata and a canonical URL.
- Generate `sitemap.xml` and `robots.txt`.
- Provide Open Graph and social-sharing images.
- Provide an RSS feed for blog posts.
- Navigation works with keyboard and touch input.
- External links are clearly distinguishable and safe.
- Motion respects the user's reduced-motion preference.

## 10. Quality Requirements

### Accessibility

- Use semantic HTML and a logical heading hierarchy.
- Provide visible keyboard focus states.
- Add meaningful alternative text to content images.
- Ensure controls have accessible names.
- Maintain sufficient color contrast.
- Test navigation without a mouse.

### Performance

- Optimize and appropriately size images.
- Load fonts efficiently and avoid layout shift.
- Keep client-side JavaScript limited to interactive components.
- Prefer server-rendered content for projects and posts.
- Target strong Core Web Vitals on mobile and desktop.

### SEO

- Supply title, description, canonical URL, and social metadata per page.
- Use structured data where appropriate for the person, articles, and creative work.
- Include only published content in discovery files.
- Use readable, stable URLs.

## 11. Implementation Phases

### Phase 1: Select and prepare the design

1. Choose a Figma portfolio template with desktop and mobile layouts.
2. Confirm its license permits the intended use.
3. Replace template branding and sample content.
4. Identify typography, colors, spacing, components, and responsive behavior.
5. Add missing project-detail and article layouts if necessary.

### Phase 2: Establish the application

1. Create the Next.js TypeScript application.
2. Configure Tailwind CSS, linting, formatting, fonts, and path aliases.
3. Establish global design tokens and the root layout.
4. Configure metadata defaults, analytics placeholders, and image behavior.

### Phase 3: Build the design system

1. Implement UI primitives.
2. Implement navigation and footer.
3. Create reusable page sections.
4. Verify primitives and sections at required breakpoints.

### Phase 4: Add dynamic projects

1. Define the project schema and example content.
2. Build the project content loader.
3. Implement project listing and detail routes.
4. Add featured projects and project navigation.

### Phase 5: Add the blog

1. Define the article schema and MDX component map.
2. Implement blog listing and detail routes.
3. Add reading time, tags, related posts, syntax highlighting, and RSS.

### Phase 6: Complete and verify

1. Implement remaining pages and contact behavior.
2. Compare implementation with Figma at each breakpoint.
3. Test accessibility, SEO, invalid routes, and draft exclusion.
4. Measure and improve performance.
5. Deploy previews and then the production site.

## 12. Definition of Done

The first release is complete when:

- All approved Figma pages are implemented responsively.
- Shared visual patterns use reusable components.
- Projects and posts can be added through content files without editing page components.
- Draft content remains private.
- Metadata, sitemap, robots file, social previews, and RSS work correctly.
- Keyboard navigation and reduced-motion behavior have been tested.
- The production build passes linting, type checks, and automated tests.
- Major pages have been visually checked against Figma on mobile and desktop.
- The site is deployed successfully with a custom-domain-ready configuration.

## 13. Resources

- [Figma Community guide](https://help.figma.com/hc/en-us/articles/360038510693-Guide-to-the-Figma-Community)
- [Figma portfolio examples](https://www.figma.com/resource-library/portfolio-website-examples/)
- [Figma MCP server guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Sanity with Next.js](https://www.sanity.io/docs/nextjs)

## 14. Initial Decisions

- Start with Next.js, TypeScript, Tailwind CSS, and local MDX.
- Use Vercel as the default deployment target.
- Keep the content layer replaceable so Sanity can be introduced later.
- Use the selected and customized Figma file as the visual source of truth.
- Prioritize projects and the blog before optional secondary features.

