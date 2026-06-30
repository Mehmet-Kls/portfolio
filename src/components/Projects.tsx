type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projeler" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="mono text-sm text-[var(--accent-volt)]">03</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
            Projeler
          </h2>
        </div>

        {projects.length === 0 ? (
          <p className="mono text-sm text-[var(--text-tertiary)]">{"// yakında — yeni projeler ekleniyor"}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.id}
                className="group relative flex flex-col border border-[var(--line)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-volt-dim)] hover:-translate-y-1"
              >
                {p.featured && (
                  <span className="mono absolute right-4 top-4 text-[10px] uppercase tracking-wider text-[var(--accent-spark)]">
                    öne çıkan
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-volt)] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {p.description}
                </p>
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="mono border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {(p.projectUrl || p.githubUrl) && (
                  <div className="mt-5 flex gap-4 mono text-xs">
                    {p.projectUrl && (
                      <a
                        href={p.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-volt)] hover:text-glow"
                      >
                        → görüntüle
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        ⌥ kaynak kod
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
