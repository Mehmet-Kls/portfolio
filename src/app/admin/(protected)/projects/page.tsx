"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
};

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  imageUrl: "",
  projectUrl: "",
  githubUrl: "",
  featured: false,
  status: "published",
};

export default function ProjectsAdminPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/projects?all=1")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) setForm((f) => ({ ...f, imageUrl: data.url }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PATCH" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setForm(emptyForm);
      setEditingId(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      tags: (p.tags || []).join(", "),
      imageUrl: p.imageUrl || "",
      projectUrl: p.projectUrl || "",
      githubUrl: p.githubUrl || "",
      featured: p.featured || false,
      status: p.status || "published",
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu projeyi silmek istediğine emin misin?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Projeler
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// portfolyo projelerini yönet"}</p>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3 border border-[var(--line)] bg-[var(--bg-surface)] p-5">
        <p className="mono text-xs text-[var(--accent-volt)]">
          {editingId ? `// düzenleniyor: #${editingId}` : "// yeni proje ekle"}
        </p>
        <input
          required
          placeholder="başlık"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <textarea
          required
          placeholder="açıklama"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mono w-full resize-none border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <input
          placeholder="etiketler (virgülle ayır: Python, Discord.js)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="proje URL (canlı demo)"
            value={form.projectUrl}
            onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
          <input
            placeholder="github URL"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="mono cursor-pointer border border-[var(--line)] px-3 py-2 text-xs text-[var(--text-secondary)] hover:border-[var(--accent-volt)]">
            {uploading ? "yükleniyor..." : "📎 görsel yükle"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
          </label>
          {form.imageUrl && <span className="mono text-xs text-[var(--accent-volt)]">✓ görsel yüklendi</span>}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 mono text-xs text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            öne çıkan
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="mono border border-[var(--line)] bg-[var(--bg-base)] px-2 py-1.5 text-xs text-[var(--text-primary)]"
          >
            <option value="published">yayında</option>
            <option value="draft">taslak</option>
          </select>
        </div>

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
        <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz proje eklenmedi"}</p>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3"
            >
              <div>
                <p className="text-sm text-[var(--text-primary)]">
                  {p.title}{" "}
                  {p.status === "draft" && <span className="mono text-[10px] text-[var(--text-tertiary)]">(taslak)</span>}
                  {p.featured && <span className="mono text-[10px] text-[var(--accent-spark)]"> ★</span>}
                </p>
                <p className="mono text-xs text-[var(--text-tertiary)]">{(p.tags || []).join(", ")}</p>
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
