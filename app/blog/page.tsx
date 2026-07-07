import { getAllPosts } from "@/lib/posts";
import AdventureCard from "@/components/AdventureCard";

export const metadata = {
  title: "Journal",
  description: "Random thoughts and adventures by Daniel Sanchez.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const byYear = posts.reduce((acc, post) => {
    const year = new Date(post.frontmatter.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="bg-[#fdfbf7]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[48px] font-medium leading-[0.95] tracking-[-0.03em]">
            Journal
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-stone-600">
            {posts.length === 0
              ? "No posts yet — your thoughts and adventures will live here."
              : `${posts.length} ${posts.length === 1 ? "post" : "posts"}${years.length > 0 ? ` from ${years[years.length - 1]}—${years[0]}` : ""}. Random thoughts, lore maxing, and whatever I feel like writing about.`}
          </p>
        </div>

        {posts.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-b border-stone-200 pb-8">
            {["All", "Lore", "Languages", "Adventures", "Thoughts"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] font-medium uppercase tracking-wide text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {years.map((year) => (
          <div key={year} className="mt-16">
            <div className="sticky top-[68px] z-10 -mx-6 flex items-center gap-4 bg-[#fdfbf7]/80 px-6 py-3 backdrop-blur-md lg:mx-0 lg:px-0">
              <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                {year}
              </h2>
              <div className="h-px flex-1 bg-stone-200" />
              <span className="font-mono text-[11px] text-stone-400">
                {byYear[year].length} {byYear[year].length === 1 ? "post" : "posts"}
              </span>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {byYear[year].map((post) => (
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
          </div>
        ))}

        {posts.length === 0 && (
          <div className="mt-16 rounded-[24px] border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="font-serif text-[18px]">Start writing</p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-stone-500">
              Create <code className="rounded bg-stone-100 px-1.5 py-0.5">content/posts/my-first-post.mdx</code> and add your cover image to{" "}
              <code className="rounded bg-stone-100 px-1.5 py-0.5">public/images/</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
