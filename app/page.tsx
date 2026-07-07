import Link from "next/link";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import AdventureCard from "@/components/AdventureCard";

export default function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = posts.slice(1, 4);

  return (
    <div className="bg-[#fdfbf7]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="py-16 sm:py-24 lg:py-28">
            <div className="max-w-3xl">
              <h1 className="font-serif text-[44px] font-[550] leading-[0.95] tracking-[-0.03em] text-stone-900 sm:text-[64px] lg:text-[76px]">
                Random thoughts
                <br />
                <span className="font-[400] italic text-stone-500">and adventures.</span>
              </h1>

              <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-stone-600">
                I&apos;m Daniel Sanchez. I&apos;m all over the place — lore maxing,
                learning languages, and keeping my brain active. This is where I dump
                whatever I&apos;m thinking about, wherever I am.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-[14px] font-medium text-white transition hover:bg-orange-600"
                >
                  Read the journal
                  <span>→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-3.5 text-[14px] font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
                >
                  About me
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative pattern - no external image */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[45%] lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#fdfbf7] z-10" />
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] bg-[size:24px_24px]" />
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Featured
            </h2>
            <Link
              href="/blog"
              className="text-[13px] font-medium text-stone-600 hover:text-stone-900"
            >
              View all →
            </Link>
          </div>
          <AdventureCard
            post={{
              slug: featured.slug,
              title: featured.frontmatter.title,
              date: featured.frontmatter.date,
              excerpt: featured.frontmatter.excerpt,
              coverImage: featured.frontmatter.coverImage,
              location: featured.frontmatter.location,
              tags: featured.frontmatter.tags,
              readingTime: featured.readingTime,
            }}
            featured
          />
        </section>
      )}

      {/* Recent grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[32px] tracking-tight">Recent notes</h2>
            <p className="mt-1 text-[14px] text-stone-500">
              Thoughts, adventures, and whatever else I&apos;m lore maxing on.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <AdventureCard
              key={post.slug}
              post={{
                slug: post.slug,
                title: post.frontmatter.title,
                date: post.frontmatter.date,
                excerpt: post.frontmatter.excerpt,
                coverImage: post.frontmatter.coverImage,
                location: post.frontmatter.location,
                tags: post.frontmatter.tags,
                readingTime: post.readingTime,
              }}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="font-serif text-[18px] text-stone-900">No posts yet.</p>
            <p className="mt-2 text-[14px] text-stone-500">
              Create your first post in <code className="rounded bg-stone-100 px-1.5 py-0.5">content/posts/hello.mdx</code>
            </p>
            <p className="mt-1 text-[13px] text-stone-400">
              Copy the template from <code>hello.mdx</code> — add your cover image to <code>public/images/</code>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

