export type Project = {
  slug: string;
  title: string;
  description: string;
  url: string;
  homepage?: string;
  language: string;
  tags: string[];
  stars: number;
  updatedAt: string;
  featured: boolean;
  readme?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  coverImage?: string;
  body?: string;
};
