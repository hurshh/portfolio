"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SearchIcon } from "@/components/icons";
import type { Post, Project } from "@/lib/types";

type Props =
  | { kind: "projects"; items: Project[] }
  | { kind: "posts"; items: Post[] };

export function ArchiveFilter(props: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(props.items.flatMap((item) => item.tags))).sort()],
    [props.items],
  );
  const items = props.items.filter((item) => {
    const searchable = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (tag === "All" || item.tags.includes(tag));
  });

  return (
    <>
      <div className="archive-controls">
        <label className="search-field">
          <SearchIcon />
          <span className="sr-only">Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${props.kind}`} />
        </label>
        <div className="filter-list" aria-label="Filter by tag">
          {tags.slice(0, 8).map((item) => (
            <button className={tag === item ? "active" : ""} key={item} onClick={() => setTag(item)} type="button">{item}</button>
          ))}
        </div>
      </div>
      {items.length ? (
        <div className={props.kind === "projects" ? "project-grid" : "post-grid"}>
          {props.kind === "projects"
            ? (items as Project[]).map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)
            : (items as Post[]).map((post) => <PostCard post={post} key={post.slug} />)}
        </div>
      ) : <p className="empty-state">No matches yet. Try another search or tag.</p>}
    </>
  );
}
