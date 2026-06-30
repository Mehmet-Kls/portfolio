"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: string;
};

const emptyForm = { title: "", excerpt: "", content: "", status: "draft" };

export default function PostsAdminPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/posts?all=1")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
      const method = editingId ? "PATCH" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm(emptyForm);
      setEditingId(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  function startEdit(p: Post) {
    setEditingId(p.id);
    setForm({ title: p.title, excerpt: p.excerpt || "", content: p.content, status: p.status });
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu yazıyı silmek istediğine emin misin?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Blog Yazıları
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// blog içeriklerini yönet"}</p>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3 border border-[var(--line)] bg-[var(--bg-surface)] p-5">
        <p className="mono text-xs text-[var(--accent-volt)]">
          {editingId ? `// düzenleniyor: #${editingId}` : "// yeni yazı ekle"}
        </p>
        <input
          required
          placeholder="başlık"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <input
          placeholder="kısa özet"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <textarea
          required
          placeholder="içerik (markdown destekli)"
          rows={8}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="mono w-full resize-y border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="mono border border-[var(--line)] bg-[var(--bg-base)] px-2 py-1.5 text-xs text-[var(--text-primary)]"
        >
          <option value="draft">taslak</option>
          <option value="published">yayında</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="border border-[var(--accent-volt)] px-5 py-2 mono text-sm text-[var(--accent-volt)] hover:bg-[var(--accent-volt)] hover:text-[var(--bg-base)] disabled:opacity-50"
          >
            {saving ? "kaydediliyor..." : editingId ? "→ güncelle" : "→ ekle"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="mono text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              vazgeç
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mono text-sm text-[var(--text-tertiary)]">yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz yazı eklenmedi"}</p>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3"
            >
              <div>
                <p className="text-sm text-[var(--text-primary)]">{p.title}</p>
                <p className="mono text-xs text-[var(--text-tertiary)]">
                  {p.status === "published" ? "yayında" : "taslak"} — /{p.slug}
                </p>
              </div>
              <div className="flex gap-3 mono text-xs">
                <button onClick={() => startEdit(p)} className="text-[var(--accent-volt)] hover:opacity-80">
                  düzenle
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-[var(--accent-spark)] hover:opacity-80">
                  sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
