import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  location?: string;
  tags?: string[];
  published?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPathMd = path.join(postsDirectory, `${realSlug}.md`);
  const fullPathMdx = path.join(postsDirectory, `${realSlug}.mdx`);

  let fullPath = fullPathMdx;
  if (!fs.existsSync(fullPathMdx) && fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as PostFrontmatter;

  return {
    slug: realSlug,
    frontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.frontmatter.published !== false)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return posts;
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  return posts.length > 0 ? posts[0] : null;
}
