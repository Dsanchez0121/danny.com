import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  location?: string;
  tags?: string[];
  readingTime?: string;
};

export default function AdventureCard({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`overflow-hidden rounded-[24px] border border-stone-200/70 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-1 ${
          featured ? "lg:grid lg:grid-cols-[1.2fr_0.9fr]" : ""
        }`}
      >
        <div className={`relative overflow-hidden bg-stone-100 ${featured ? "aspect-[4/3] lg:aspect-[4/3]" : "aspect-[16/10]"}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.05]"
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          
          {post.location && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-widest text-stone-800 backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-orange-500" />
              {post.location}
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-white/80">
              <time>{format(new Date(post.date), "MMM d, yyyy")}</time>
              {post.readingTime && (
                <>
                  <span className="h-px w-3 bg-white/40" />
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`flex flex-col p-6 ${featured ? "lg:p-9 lg:justify-center" : ""}`}>
          <div className="flex flex-wrap gap-1.5">
            {(post.tags ?? []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`mt-4 font-serif leading-[1.15] tracking-tight text-stone-900 transition group-hover:text-orange-600 ${
              featured ? "text-[28px] lg:text-[34px]" : "text-[22px]"
            }`}
          >
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-stone-600">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-stone-900">
            <span>Read story</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function SmallAdventureCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-4 py-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-stone-500">
          {post.location && <span>{post.location}</span>}
          <span>•</span>
          <time>{format(new Date(post.date), "MMM yyyy")}</time>
        </div>
        <h4 className="mt-1 line-clamp-2 font-medium leading-snug text-stone-900 group-hover:text-orange-600">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}
