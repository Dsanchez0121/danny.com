"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-[#fdfbf7]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white transition group-hover:bg-orange-600">
              <span className="font-serif text-[20px] leading-none tracking-tight">
                D.
              </span>
            </div>
            <span className="font-serif text-[22px] font-medium tracking-tight">
              Danny.com
            </span>
            <span className="hidden sm:inline-block h-4 w-px bg-stone-300" />
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Daniel Sanchez
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[14px] font-medium tracking-wide transition ${
                    active
                      ? "text-stone-900"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-orange-600" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/blog"
              className="rounded-full bg-stone-900 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-orange-600"
            >
              Explore Stories
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-stone-200"
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div
                className={`h-0.5 w-4 bg-stone-900 transition ${open ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <div
                className={`h-0.5 w-4 bg-stone-900 transition ${open ? "opacity-0" : ""}`}
              />
              <div
                className={`h-0.5 w-4 bg-stone-900 transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-stone-200 py-6">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-stone-700 hover:bg-stone-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
