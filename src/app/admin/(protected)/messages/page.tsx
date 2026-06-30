"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesAdminPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function toggleRead(id: number, read: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu mesajı silmek istediğine emin misin?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Mesajlar
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// iletişim formundan gelen mesajlar"}</p>

      {loading ? (
        <p className="mono text-sm text-[var(--text-tertiary)]">yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz mesaj yok"}</p>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div
              key={m.id}
              className={`border bg-[var(--bg-surface)] p-4 ${
                m.read ? "border-[var(--line)]" : "border-[var(--accent-volt)]"
              }`}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--text-primary)]">
                    {m.name} <span className="mono text-xs text-[var(--text-tertiary)]">— {m.email}</span>
                  </p>
                  {m.subject && <p className="mono text-xs text-[var(--accent-volt)]">{m.subject}</p>}
                </div>
                <p className="mono text-xs text-[var(--text-tertiary)]">
                  {new Date(m.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
              <p className="mb-3 text-sm text-[var(--text-secondary)]">{m.body}</p>
              <div className="flex gap-3 mono text-xs">
                <button onClick={() => toggleRead(m.id, m.read)} className="text-[var(--accent-volt)] hover:opacity-80">
                  {m.read ? "okunmadı yap" : "okundu yap"}
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-[var(--accent-spark)] hover:opacity-80">
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
