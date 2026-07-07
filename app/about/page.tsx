import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About Daniel Sanchez — random thoughts and adventures.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#fdfbf7]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] uppercase tracking-widest text-stone-500">
              Currently in Palo Alto • Works on whatever I feel like
            </div>

            <h1 className="mt-8 font-serif text-[48px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-[56px]">
              Random thoughts
              <br />
              <span className="italic text-stone-400">and adventures.</span>
            </h1>

            <div className="prose prose-stone mt-10 max-w-none">
              <p className="text-[18px] leading-relaxed text-stone-700">
                I&apos;m Daniel Sanchez. I&apos;m all over the place — and that&apos;s kind of the point.
              </p>
              <p>
                This site is where I keep the things that stick in my head. Sometimes it&apos;s an adventure,
                sometimes it&apos;s a rabbit hole I fell into at 2am, sometimes it&apos;s just a thought I needed
                to write down so it stops looping.
              </p>
              <p>
                No content calendar, no niche, no algorithm. Just whatever I&apos;m lore maxing on that week.
              </p>

              <h2 className="font-serif text-2xl">What I care about</h2>
              <ul>
                <li>
                  <strong>1. Lore maxing</strong> — going deep on a topic until I understand the whole system,
                  not just the surface. Games, histories, cultures, weird Wikipedia spirals.
                </li>
                <li>
                  <strong>2. Languages</strong> — learning how people think by learning how they speak.
                  Still a work in progress, always.
                </li>
                <li>
                  <strong>3. Keeping my brain active</strong> — if I&apos;m not learning something, I get restless.
                  Writing here is how I keep track of what actually stuck.
                </li>
              </ul>

              <h2 className="font-serif text-2xl">Colophon</h2>
              <p>
                Built with Next.js 16, Tailwind v4, and MDX. Type set in Geist and Instrument Serif.
                Photos are mine. No cookies, no trackers, no popups.
              </p>
            </div>

            <div className="mt-10 flex gap-3">
              <Link
                href="/blog"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
              >
                Read the journal
              </Link>
              <a
                href="mailto:danielsanchezdiaz17@gmail.com"
                className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium hover:border-stone-900"
              >
                Say hi
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[24px] bg-stone-100">
              <Image
                src="/images/portrait.jpg"
                alt="Daniel Sanchez"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>

            <div className="rounded-[20px] border border-stone-200 bg-white p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-stone-400">
                At a glance
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Based</dt>
                  <dd className="font-medium">Palo Alto</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Works on</dt>
                  <dd className="font-medium">Whatever I feel like</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Learning</dt>
                  <dd className="font-medium">How to lore max</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Next trip</dt>
                  <dd className="font-medium">Shanghai</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[20px] bg-stone-900 p-6 text-white">
              <h3 className="font-serif text-[20px]">Say hi</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-300">
                I&apos;m always down to talk about lore, languages, or whatever weird thing you&apos;re currently obsessed with.
              </p>
              <a
                href="mailto:danielsanchezdiaz17@gmail.com"
                className="mt-4 inline-flex text-sm font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                danielsanchezdiaz17@gmail.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
