"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hakkimda", label: "hakkımda" },
  { id: "projeler", label: "projeler" },
  { id: "yetenekler", label: "yetenekler" },
  { id: "blog", label: "blog" },
  { id: "iletisim", label: "iletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-[var(--bg-base)]/80 border-b border-[var(--line)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="mono text-sm tracking-tight text-[var(--text-primary)]">
          <span className="text-[var(--accent-volt)]">@</span>mehmet-kls
          <span className="text-[var(--text-tertiary)]"> / ~</span>
        </a>
        <ul className="hidden gap-8 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="mono text-xs uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-volt)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mono text-xs text-[var(--text-secondary)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-volt)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-volt)]" />
          </span>
          online
        </div>
      </nav>
    </header>
  );
}
