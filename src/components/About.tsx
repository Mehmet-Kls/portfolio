type Profile = {
  bio: string;
};

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="hakkimda" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="mono text-sm text-[var(--accent-volt)]">01</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
            Hakkımda
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="mono text-xs text-[var(--text-tertiary)] leading-relaxed">
            <p className="mb-2 text-[var(--accent-volt)]">{"// kimlik.txt"}</p>
            <p>elektrik teknisyeni</p>
            <p>+ yazılım geliştirici</p>
            <p className="mt-4 text-[var(--accent-volt)]">{"// odak"}</p>
            <p>donanım × yazılım</p>
            <p>gerçek dünya çözümleri</p>
          </div>

          <div className="space-y-5 text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              {profile.bio ||
                "Hem fiziksel hem dijital dünyada çalışan biri. Gündüz elektrik, akşam kod. Kendi projelerini sıfırdan inşa etmeyi seven bir geliştirici."}
            </p>
            <p>
              Discord botları, kişisel web arayüzleri ve yapay zeka destekli araçlar geliştiriyorum.
              Her proje kendi ihtiyacımdan doğuyor — kullanılabilir, gerçek sorunları çözen çözümler.
            </p>
            <p>
              Teknolojiyi hem donanım hem yazılım düzeyinde harmanlayan, gerçek hayatta
              kullanılabilir çözümler üretmeyi hedefliyorum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
