"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Genel Bakış", icon: "📊" },
  { href: "/admin/projects", label: "Projeler", icon: "🗂" },
  { href: "/admin/skills", label: "Yetenekler", icon: "⚙" },
  { href: "/admin/posts", label: "Blog Yazıları", icon: "📝" },
  { href: "/admin/messages", label: "Mesajlar", icon: "✉" },
  { href: "/admin/profile", label: "Profil", icon: "👤" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-[var(--line)] bg-[var(--bg-surface)]">
      <div className="border-b border-[var(--line)] px-5 py-5">
        <p className="mono text-xs text-[var(--accent-volt)]">@mehmet-kls</p>
        <p className="mono text-[10px] text-[var(--text-tertiary)]">admin panel</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 mono text-sm transition-colors ${
                active
                  ? "bg-[var(--accent-volt)]/10 text-[var(--accent-volt)] border-l-2 border-[var(--accent-volt)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] border-l-2 border-transparent"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--line)] p-3">
        <Link
          href="/"
          target="_blank"
          className="block px-3 py-2 mono text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
        >
          → siteyi görüntüle
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-left mono text-xs text-[var(--accent-spark)] hover:opacity-80"
        >
          ⏻ çıkış yap
        </button>
      </div>
    </aside>
  );
}
