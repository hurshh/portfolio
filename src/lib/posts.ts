import type { Post } from "@/lib/types";

type DevToArticle = {
  slug: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[] | string;
  cover_image: string | null;
  body_markdown?: string;
};

const fallbackPosts: Post[] = [
  {
    slug: "designing-software-that-feels-quiet",
    title: "Designing software that feels quiet",
    description: "Practical notes on visual rhythm, progressive disclosure, and removing accidental complexity.",
    url: "#",
    publishedAt: "2026-06-12T00:00:00Z",
    readingTime: 6,
    tags: ["Design", "Frontend"],
    body: "# Designing software that feels quiet\n\nQuiet software is not empty software. It contains the same power, but reveals that power at the moment it becomes useful.\n\n## Start with rhythm\n\nSpacing creates the first layer of meaning. A consistent rhythm helps people understand which ideas belong together before they read a word.\n\n## Reduce visual negotiation\n\nEvery border, color, and label asks for attention. Keep the signals that help someone make a decision and soften the ones that merely decorate.\n\n## Make the next action obvious\n\nA calm interface can still be decisive. One clear primary action is often more useful than a field of equally loud options.",
  },
  {
    slug: "readmes-as-project-stories",
    title: "Turning READMEs into project stories",
    description: "How to structure repository documentation so it works for contributors and portfolio visitors.",
    url: "#",
    publishedAt: "2026-04-20T00:00:00Z",
    readingTime: 5,
    tags: ["GitHub", "Writing"],
    body: "# Turning READMEs into project stories\n\nA useful README answers two audiences: the developer who wants to run the project and the curious visitor who wants to understand why it exists.\n\n## Lead with intent\n\nExplain the problem, the people it serves, and the core decision behind the solution. Installation can follow.\n\n## Show the shape of the work\n\nArchitecture notes, tradeoffs, and a few carefully chosen images reveal far more than a long feature list.",
  },
  {
    slug: "a-small-system-for-shipping-side-projects",
    title: "A small system for shipping side projects",
    description: "A sustainable loop for moving from an interesting idea to a useful release.",
    url: "#",
    publishedAt: "2026-02-08T00:00:00Z",
    readingTime: 8,
    tags: ["Process", "Career"],
    body: "# A small system for shipping side projects\n\nSide projects benefit from constraints. Define one person, one recurring problem, and one small promise that the first version can keep.\n\n## Cut by outcome\n\nRemove features that do not change whether the promise is fulfilled. This protects the identity of the project while reducing its surface area.",
  },
];

function normalize(article: DevToArticle): Post {
  const tags = Array.isArray(article.tag_list)
    ? article.tag_list
    : article.tag_list.split(",").map((tag) => tag.trim()).filter(Boolean);

  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    url: article.url,
    publishedAt: article.published_at,
    readingTime: article.reading_time_minutes,
    tags,
    coverImage: article.cover_image || undefined,
    body: article.body_markdown,
  };
}

export async function getPosts(): Promise<Post[]> {
  const username = process.env.DEVTO_USERNAME;
  if (!username) return fallbackPosts;

  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=100`,
    );
    if (!response.ok) throw new Error(`DEV.to returned ${response.status}`);
    const posts = ((await response.json()) as DevToArticle[]).map(normalize);
    return posts.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post || post.body || !process.env.DEVTO_USERNAME) return post;

  try {
    const response = await fetch(
      `https://dev.to/api/articles/${encodeURIComponent(process.env.DEVTO_USERNAME)}/${encodeURIComponent(slug)}`,
    );
    if (!response.ok) return post;
    return normalize((await response.json()) as DevToArticle);
  } catch {
    return post;
  }
}
