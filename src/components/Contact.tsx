"use client";

import { useState } from "react";

type Profile = {
  email?: string | null;
  githubUrl?: string | null;
  discordUrl?: string | null;
  instagramUrl?: string | null;
};

export default function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", body: "" });
    } catch {
      setStatus("error");
    }
  }

  const links = [
    profile.githubUrl && { label: "GitHub", url: profile.githubUrl },
    profile.discordUrl && { label: "Discord", url: profile.discordUrl },
    profile.instagramUrl && { label: "Instagram", url: profile.instagramUrl },
  ].filter(Boolean) as { label: string; url: string }[];

  return (
    <section id="iletisim" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="mono text-sm text-[var(--accent-volt)]">05</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
            İletişim
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="isim"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mono border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
              />
              <input
                required
                type="email"
                placeholder="e-posta"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mono border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
              />
            </div>
            <input
              placeholder="konu"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
            />
            <textarea
              required
              placeholder="mesajınız"
              rows={5}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="mono w-full resize-none border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="border border-[var(--accent-volt)] px-6 py-3 mono text-sm text-[var(--accent-volt)] transition-colors hover:bg-[var(--accent-volt)] hover:text-[var(--bg-base)] disabled:opacity-50"
            >
              {status === "sending" ? "gönderiliyor..." : "→ gönder"}
            </button>
            {status === "sent" && (
              <p className="mono text-xs text-[var(--accent-volt)]">✓ mesajınız iletildi.</p>
            )}
            {status === "error" && (
              <p className="mono text-xs text-[var(--accent-spark)]">✕ bir hata oluştu, tekrar deneyin.</p>
            )}
          </form>

          <div className="flex flex-col justify-center space-y-4">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-volt)] transition-colors">
                ✉ {profile.email}
              </a>
            )}
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-volt)] transition-colors"
              >
                → {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
