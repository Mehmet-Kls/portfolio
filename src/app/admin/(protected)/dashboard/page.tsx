"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalViews: number;
  todayViews: number;
  last7Days: number;
  unreadMessages: number;
  topPages: { path: string; count: number }[];
  dailyViews: { date: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
};

function StatCard({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="border border-[var(--line)] bg-[var(--bg-surface)] p-5">
      <p className="mono text-xs text-[var(--text-tertiary)]">{label}</p>
      <p className={`mt-2 font-[family-name:var(--font-display)] text-3xl ${accent ? "text-[var(--accent-volt)]" : "text-[var(--text-primary)]"}`}>
        {value}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const maxDaily = stats?.dailyViews.length ? Math.max(...stats.dailyViews.map((d) => d.count)) : 1;

  return (
    <div>
      <h1 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
        Genel Bakış
      </h1>
      <p className="mono mb-8 text-xs text-[var(--text-tertiary)]">{"// site istatistikleri ve durum"}</p>

      {loading ? (
        <p className="mono text-sm text-[var(--text-tertiary)]">yükleniyor...</p>
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="toplam ziyaret" value={stats.totalViews} accent />
            <StatCard label="bugün" value={stats.todayViews} />
            <StatCard label="son 7 gün" value={stats.last7Days} />
            <StatCard label="okunmamış mesaj" value={stats.unreadMessages} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="border border-[var(--line)] bg-[var(--bg-surface)] p-5">
              <p className="mono mb-4 text-xs text-[var(--text-tertiary)]">son 30 gün — günlük ziyaret</p>
              {stats.dailyViews.length === 0 ? (
                <p className="mono text-xs text-[var(--text-tertiary)]">henüz veri yok</p>
              ) : (
                <div className="flex h-32 items-end gap-1">
                  {stats.dailyViews.map((d) => (
                    <div
                      key={d.date}
                      title={`${d.date}: ${d.count}`}
                      className="flex-1 bg-[var(--accent-volt)] opacity-70 transition-opacity hover:opacity-100"
                      style={{ height: `${Math.max((d.count / maxDaily) * 100, 4)}%` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border border-[var(--line)] bg-[var(--bg-surface)] p-5">
              <p className="mono mb-4 text-xs text-[var(--text-tertiary)]">en çok görüntülenen sayfalar</p>
              <div className="space-y-2">
                {stats.topPages.length === 0 ? (
                  <p className="mono text-xs text-[var(--text-tertiary)]">henüz veri yok</p>
                ) : (
                  stats.topPages.map((p) => (
                    <div key={p.path} className="flex items-center justify-between mono text-xs">
                      <span className="text-[var(--text-secondary)]">{p.path}</span>
                      <span className="text-[var(--accent-volt)]">{p.count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {stats.deviceBreakdown.length > 0 && (
            <div className="mt-6 border border-[var(--line)] bg-[var(--bg-surface)] p-5">
              <p className="mono mb-4 text-xs text-[var(--text-tertiary)]">cihaz dağılımı (son 30 gün)</p>
              <div className="flex gap-6">
                {stats.deviceBreakdown.map((d) => (
                  <div key={d.device} className="mono text-xs">
                    <span className="text-[var(--text-secondary)]">{d.device || "bilinmiyor"}: </span>
                    <span className="text-[var(--accent-volt)]">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="mono text-sm text-[var(--accent-spark)]">veri yüklenemedi</p>
      )}
    </div>
  );
}
