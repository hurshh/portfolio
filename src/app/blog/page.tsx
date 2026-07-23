import type { Metadata } from "next";
import { ArchiveFilter } from "@/components/archive-filter";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "Notes about design, development, systems, and creative practice." };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="page-shell shell">
      <header className="archive-header blog-header">
        <p className="eyebrow">Notes & observations</p>
        <h1>Things I&apos;m learning,<br /><em>made useful.</em></h1>
        <p>Essays and field notes about design, development, tools, and finding a more thoughtful way to make things.</p>
      </header>
      <ArchiveFilter kind="posts" items={posts} />
    </section>
  );
}
