import type { Project } from "@/lib/types";

type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const fallbackProjects: Project[] = [
  {
    slug: "signal-ui",
    title: "Signal UI",
    description: "A focused component system for building calm, accessible product interfaces.",
    url: "https://github.com/",
    homepage: "#",
    language: "TypeScript",
    tags: ["Next.js", "Design systems", "Accessibility"],
    stars: 128,
    updatedAt: "2026-06-18T00:00:00Z",
    featured: true,
    readme: "# Signal UI\n\nSignal UI explores how a small, strongly-typed component system can produce expressive product interfaces without sacrificing consistency.\n\n## The idea\n\nThe project focuses on useful defaults, accessible interactions, and a token system that stays understandable as a product grows.\n\n## What I worked on\n\n- Component API design\n- Accessible keyboard interactions\n- Responsive documentation\n- Visual regression workflows",
  },
  {
    slug: "atlas-notes",
    title: "Atlas Notes",
    description: "A local-first knowledge workspace that keeps research fast, connected, and private.",
    url: "https://github.com/",
    language: "Rust",
    tags: ["Local first", "Search", "Open source"],
    stars: 84,
    updatedAt: "2026-05-04T00:00:00Z",
    featured: true,
    readme: "# Atlas Notes\n\nA small experiment in local-first writing and retrieval. Atlas treats every note as a durable text file while adding instant search and lightweight connections.\n\n## Principles\n\n- Your files remain yours\n- Search should feel immediate\n- Organization should emerge naturally",
  },
  {
    slug: "studio-index",
    title: "Studio Index",
    description: "A cinematic portfolio starter with editorial layouts and content-first project stories.",
    url: "https://github.com/",
    language: "TypeScript",
    tags: ["Portfolio", "Motion", "Editorial"],
    stars: 46,
    updatedAt: "2026-03-22T00:00:00Z",
    featured: false,
    readme: "# Studio Index\n\nA modular portfolio concept built around strong typography, restrained motion, and project narratives that are easy to maintain.",
  },
];

const headers = (): HeadersInit => ({
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
});

function normalize(repo: GitHubRepo, index: number): Project {
  return {
    slug: repo.name,
    title: repo.name
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: repo.description ?? "An open-source project from my GitHub profile.",
    url: repo.html_url,
    homepage: repo.homepage || undefined,
    language: repo.language ?? "Other",
    tags: repo.topics?.length ? repo.topics.slice(0, 4) : [repo.language ?? "Open source"],
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    featured: index < 4,
  };
}

export async function getProjects(): Promise<Project[]> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return fallbackProjects;

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      { headers: headers() },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const repos = (await response.json()) as GitHubRepo[];
    const projects = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map(normalize);
    return projects.length ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project || project.readme || !process.env.GITHUB_USERNAME) return project;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(process.env.GITHUB_USERNAME)}/${encodeURIComponent(slug)}/readme`,
      {
        headers: { ...headers(), Accept: "application/vnd.github.raw+json" },
      },
    );
    if (!response.ok) return project;
    return { ...project, readme: await response.text() };
  } catch {
    return project;
  }
}
