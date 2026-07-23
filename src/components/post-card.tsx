import Link from "next/link";
import type { Post } from "@/lib/types";

const date = (value: string) => new Intl.DateTimeFormat("en", {
  day: "numeric", month: "short", year: "numeric",
}).format(new Date(value));

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={featured ? "post-card post-featured" : "post-card"}>
      <div className="post-meta">
        <span>{date(post.publishedAt)}</span>
        <span>{post.readingTime} min read</span>
      </div>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.description}</p>
      <div className="post-footer">
        <div className="tag-row">{post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link href={`/blog/${post.slug}`}>Read article <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
