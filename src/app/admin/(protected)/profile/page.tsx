"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  email: "",
  githubUrl: "",
  discordUrl: "",
  instagramUrl: "",
  cvFileUrl: "",
};

export default function ProfileAdminPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) =>
        setForm({
          name: data.name || "",
          title: data.title || "",
          tagline: data.tagline || "",
          bio: data.bio || "",
          email: data.email || "",
          githubUrl: data.githubUrl || "",
          discordUrl: data.discordUrl || "",
          instagramUrl: data.instagramUrl || "",
          cvFileUrl: data.cvFileUrl || "",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleCvUpload(file: File) {
    setUploadingCv(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) setForm((f) => ({ ...f, cvFileUrl: data.url }));
    } finally {
      setUploadingCv(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="mono text-sm text-[var(--text-tertiary)]">yükleniyor...</p>;

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Profil
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// genel site bilgilerini düzenle"}</p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 border border-[var(--line)] bg-[var(--bg-surface)] p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">isim</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
            />
          </div>
          <div>
            <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">unvan</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
            />
          </div>
        </div>

        <div>
          <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">kısa slogan (hero altı)</label>
          <input
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
        </div>

        <div>
          <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">hakkımda metni</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="mono w-full resize-y border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
        </div>

        <div>
          <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">e-posta</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">github</label>
            <input
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
            />
          </div>
          <div>
            <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">discord</label>
            <input
              value={form.discordUrl}
              onChange={(e) => setForm({ ...form, discordUrl: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
            />
          </div>
          <div>
            <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">instagram</label>
            <input
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
            />
          </div>
        </div>

        <div>
          <label className="mono mb-1 block text-xs text-[var(--text-tertiary)]">CV / Özgeçmiş (PDF)</label>
          <div className="flex items-center gap-3">
            <label className="mono cursor-pointer border border-[var(--line)] px-3 py-2 text-xs text-[var(--text-secondary)] hover:border-[var(--accent-volt)]">
              {uploadingCv ? "yükleniyor..." : "📎 dosya seç"}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleCvUpload(e.target.files[0])}
              />
            </label>
            {form.cvFileUrl && (
              <a href={form.cvFileUrl} target="_blank" rel="noopener noreferrer" className="mono text-xs text-[var(--accent-volt)]">
                ✓ mevcut dosyayı görüntüle
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="border border-[var(--accent-volt)] px-5 py-2 mono text-sm text-[var(--accent-volt)] hover:bg-[var(--accent-volt)] hover:text-[var(--bg-base)] disabled:opacity-50"
          >
            {saving ? "kaydediliyor..." : "→ kaydet"}
          </button>
          {saved && <span className="mono text-xs text-[var(--accent-volt)]">✓ kaydedildi</span>}
        </div>
      </form>
    </div>
  );
}
