import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className="project-card">
      <Link className={`project-visual visual-${(index % 3) + 1}`} href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>
        <span className="visual-index">0{index + 1}</span>
        <span className="visual-mark">{project.title.slice(0, 1)}</span>
        <span className="visual-orbit" />
      </Link>
      <div className="project-card-copy">
        <div>
          <p className="meta">{project.language} · {project.stars} stars</p>
          <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.description}</p>
        </div>
        <Link className="circle-link" href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
          <ArrowUpRight />
        </Link>
      </div>
      <div className="tag-row" aria-label="Project tags">
        {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </article>
  );
}
