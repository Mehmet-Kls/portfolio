"use client";

import { useEffect, useState } from "react";

type Profile = {
  name: string;
  title: string;
  tagline: string;
  githubUrl?: string | null;
};

export default function Hero({ profile }: { profile: Profile }) {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-20">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={`mono mb-6 inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs text-[var(--accent-volt)] transition-opacity duration-700 ${
            booted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-volt)] node-pulse" />
          sistem aktif — voltaj kararlı
        </div>

        <h1
          className={`flicker-in font-[family-name:var(--font-display)] text-5xl font-medium leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-7xl ${
            booted ? "" : "opacity-0"
          }`}
        >
          {profile.name || "Mehmet Kls"}
        </h1>

        <p
          className={`mt-5 max-w-2xl font-[family-name:var(--font-display)] text-xl text-[var(--accent-volt)] text-glow sm:text-2xl transition-all duration-700 delay-300 ${
            booted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {profile.title || "Elektrik Teknisyeni / Yazılım Geliştirici"}
        </p>

        <p
          className={`mt-6 max-w-xl text-base text-[var(--text-secondary)] transition-all duration-700 delay-500 ${
            booted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {profile.tagline ||
            "Gündüz elektrik devresi, akşam kod satırı. Discord botları, web arayüzleri ve yapay zeka destekli araçlar inşa ediyorum."}
        </p>

        <div
          className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
            booted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <a
            href="#projeler"
            className="group relative overflow-hidden border border-[var(--accent-volt)] px-6 py-3 mono text-sm text-[var(--accent-volt)] transition-colors hover:bg-[var(--accent-volt)] hover:text-[var(--bg-base)]"
          >
            → projeleri gör
          </a>
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--line)] px-6 py-3 mono text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              ⌥ github profili
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mono text-xs text-[var(--text-tertiary)] animate-bounce">
        ↓ kaydır
      </div>
    </section>
  );
}
