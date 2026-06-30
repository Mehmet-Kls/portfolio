"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Giriş başarısız.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-6">
      <div className="w-full max-w-sm border border-[var(--line)] bg-[var(--bg-surface)] p-8">
        <p className="mono mb-1 text-xs text-[var(--accent-volt)]">{"// admin erişimi"}</p>
        <h1 className="mb-6 font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)]">
          Giriş Yap
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="kullanıcı adı"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
          />
          <input
            required
            type="password"
            placeholder="şifre"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mono w-full border border-[var(--line)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-volt)] outline-none"
          />
          {error && <p className="mono text-xs text-[var(--accent-spark)]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[var(--accent-volt)] py-3 mono text-sm text-[var(--accent-volt)] transition-colors hover:bg-[var(--accent-volt)] hover:text-[var(--bg-base)] disabled:opacity-50"
          >
            {loading ? "giriş yapılıyor..." : "→ giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
