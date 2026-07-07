import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import PhotoGallery, { InlinePhoto } from "@/components/PhotoGallery";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        images: [post.frontmatter.coverImage],
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

const mdxComponents = {
  PhotoGallery,
  InlinePhoto,
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex - 1];
  const prevPost = allPosts[currentIndex + 1];

  return (
    <article className="bg-[#fdfbf7]">
      {/* Cover */}
      <div className="relative h-[56vh] min-h-[420px] w-full overflow-hidden bg-stone-900 lg:h-[72vh]">
        <Image
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-3xl px-6 pb-10 lg:px-8 lg:pb-16">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-white/70 hover:text-white"
            >
              ← Back to journal
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              {post.frontmatter.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
              {post.frontmatter.location && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                  <span className="h-1 w-1 rounded-full bg-white" />
                  {post.frontmatter.location}
                </span>
              )}
            </div>

            <h1 className="mt-6 font-serif text-[36px] font-[600] leading-[0.95] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
              {post.frontmatter.title}
            </h1>

            <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-white/80">
              {post.frontmatter.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 text-[13px] text-white/60">
              <time>{format(new Date(post.frontmatter.date), "MMMM d, yyyy")}</time>
              <span className="h-3 w-px bg-white/20" />
              <span>{post.readingTime}</span>
              <span className="h-3 w-px bg-white/20" />
              <span>By Daniel Sanchez</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="prose prose-stone max-w-none prose-p:font-[450] prose-p:text-[17px] prose-headings:font-serif prose-headings:tracking-tight">
          {content}
        </div>

        <div className="mt-16 border-t border-stone-200 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-stone-200">
              <img src="/images/portrait.jpg" alt="Daniel Sanchez" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-medium">Written by Daniel Sanchez</p>
              <p className="text-[13px] text-stone-500">
                I&apos;m all over the place — lore maxing, languages, and keeping my brain active.
              </p>
            </div>
          </div>
        </div>

        {/* Next / Prev */}
        <div className="mt-16 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-2">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-stone-300"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                Previous
              </span>
              <p className="mt-2 line-clamp-2 font-medium leading-snug group-hover:text-orange-600">
                {prevPost.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 text-right transition hover:border-stone-300 sm:text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                Next up
              </span>
              <p className="mt-2 line-clamp-2 font-medium leading-snug group-hover:text-orange-600">
                {nextPost.frontmatter.title}
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
