import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function BlogDetail({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const published = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt));
  return (
    <article className="article-page">
      <header className="article-header shell">
        <Link className="back-link" href="/blog">← The archive</Link>
        <div className="tag-row">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h1>{post.title}</h1>
        <p className="article-dek">{post.description}</p>
        <div className="article-byline"><span>Written by Harsh</span><span>{published} · {post.readingTime} min read</span></div>
      </header>
      <div className="article-rule" />
      <div className="prose article-prose"><ReactMarkdown>{post.body || "This article is available on the original publishing platform."}</ReactMarkdown></div>
      {post.url !== "#" && <p className="original-link"><a href={post.url} rel="noreferrer" target="_blank">Read the original article ↗</a></p>}
    </article>
  );
}
