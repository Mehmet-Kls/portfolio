"use client";

import { useEffect, useState } from "react";

type Skill = {
  id: number;
  name: string;
  category: string;
  icon: string;
  level: number;
  orderIndex: number;
};

const emptyForm = { name: "", category: "language", icon: "", level: 80 };

export default function SkillsAdminPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/skills")
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
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
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

  function startEdit(s: Skill) {
    setEditingId(s.id);
    setForm({ name: s.name, category: s.category, icon: s.icon, level: s.level });
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu yeteneği silmek istediğine emin misin?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Yetenekler
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// becerileri ve teknolojileri yönet"}</p>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3 border border-[var(--line)] bg-[var(--bg-surface)] p-5">
        <p className="mono text-xs text-[var(--accent-volt)]">
          {editingId ? `// düzenleniyor: #${editingId}` : "// yeni yetenek ekle"}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="isim (örn: Python)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
          <input
            placeholder="emoji/ikon (örn: 🐍)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-volt)]"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mono border border-[var(--line)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)]"
          >
            <option value="language">dil</option>
            <option value="tool">araç</option>
            <option value="platform">platform</option>
            <option value="general">genel</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={form.level}
              onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="mono w-10 text-xs text-[var(--text-secondary)]">{form.level}%</span>
          </div>
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
        <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz yetenek eklenmedi"}</p>
      ) : (
        <div className="space-y-2">
          {items.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between border border-[var(--line)] bg-[var(--bg-surface)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span>{s.icon}</span>
                <div>
                  <p className="text-sm text-[var(--text-primary)]">{s.name}</p>
                  <p className="mono text-xs text-[var(--text-tertiary)]">{s.category} — {s.level}%</p>
                </div>
              </div>
              <div className="flex gap-3 mono text-xs">
                <button onClick={() => startEdit(s)} className="text-[var(--accent-volt)] hover:opacity-80">
                  düzenle
                </button>
                <button onClick={() => handleDelete(s.id)} className="text-[var(--accent-spark)] hover:opacity-80">
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
