import type { Metadata } from "next";
import { ArchiveFilter } from "@/components/archive-filter";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "Selected product, frontend, and open-source work." };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="page-shell shell">
      <header className="archive-header">
        <p className="eyebrow">Selected work / {projects.length.toString().padStart(2, "0")}</p>
        <h1>Projects shaped by<br /><em>curiosity and craft.</em></h1>
        <p>A living collection of products, experiments, and open-source work. Project pages are built directly from GitHub READMEs.</p>
      </header>
      <ArchiveFilter kind="projects" items={projects} />
    </section>
  );
}
