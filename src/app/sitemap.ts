import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const staticRoutes = ["", "/projects", "/blog", "/resume", "/contact"].map((route) => ({ url: `${base}${route}`, lastModified: new Date() }));
  return [...staticRoutes, ...projects.map((item) => ({ url: `${base}/projects/${item.slug}`, lastModified: new Date(item.updatedAt) })), ...posts.map((item) => ({ url: `${base}/blog/${item.slug}`, lastModified: new Date(item.publishedAt) }))];
}
