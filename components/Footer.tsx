import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white">
                <span className="font-serif text-[20px]">D.</span>
              </div>
              <span className="font-serif text-[22px] font-medium tracking-tight">
                Danny.com
              </span>
            </div>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600">
              Random thoughts and adventures by Daniel Sanchez. Lore maxing, languages, and keeping my brain active.
            </p>
            <div className="mt-6 flex gap-3 text-[13px] text-stone-500">
              <span>© {new Date().getFullYear()} Daniel Sanchez</span>
              <span>•</span>
              <span>Built with Next.js & MDX</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold uppercase tracking-widest text-[11px] text-stone-400">
                Explore
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/blog" className="text-stone-700 hover:text-orange-600">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-stone-700 hover:text-orange-600">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-widest text-[11px] text-stone-400">
                Connect
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="mailto:danielsanchezdiaz17@gmail.com" className="text-stone-700 hover:text-orange-600">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone-100 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400">
            No cookies • No tracking • Just thoughts
          </p>
          <p className="text-[12px] text-stone-400">
            Currently in{" "}
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-stone-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Palo Alto
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
