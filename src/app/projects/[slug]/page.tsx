import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getProject, getProjects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectDetail({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  return (
    <article className="detail-page shell">
      <Link className="back-link" href="/projects">← All projects</Link>
      <header className="detail-header">
        <p className="eyebrow">{project.language} · Updated {new Date(project.updatedAt).getFullYear()}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="detail-actions">
          <a className="button dark" href={project.url} rel="noreferrer" target="_blank">View on GitHub ↗</a>
          {project.homepage && project.homepage !== "#" && <a className="button" href={project.homepage} rel="noreferrer" target="_blank">Visit live project ↗</a>}
        </div>
      </header>
      <div className="detail-visual"><span>{project.title.slice(0, 1)}</span><i /></div>
      <div className="detail-grid">
        <aside>
          <p className="eyebrow">Project details</p>
          <dl><dt>Primary language</dt><dd>{project.language}</dd><dt>GitHub stars</dt><dd>{project.stars}</dd><dt>Focus</dt><dd>{project.tags.join(", ")}</dd></dl>
        </aside>
        <div className="prose"><ReactMarkdown>{project.readme || `# About ${project.title}\n\n${project.description}\n\nThe full story for this project is being documented.`}</ReactMarkdown></div>
      </div>
    </article>
  );
}
