import Reveal from "./Reveal";

type Skill = {
  id: number;
  name: string;
  category: string;
  icon: string;
  level: number;
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="yetenekler" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="mono text-sm text-[var(--accent-volt)]">02</span>
            <div className="h-px flex-1 bg-[var(--line)]" />
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
              Yetenekler
            </h2>
          </div>
        </Reveal>

        {skills.length === 0 ? (
          <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz yetenek eklenmedi"}</p>
        ) : (
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {categories.map((cat, ci) => (
              <Reveal key={cat} direction="up" delay={ci * 100}>
                <div>
                  <p className="mono mb-4 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                    {cat}
                  </p>
                  <div className="space-y-4">
                    {skills
                      .filter((s) => s.category === cat)
                      .map((skill, si) => (
                        <div key={skill.id} className="group">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                              {skill.icon && <span>{skill.icon}</span>}
                              {skill.name}
                            </span>
                            <span className="mono text-xs text-[var(--text-tertiary)]">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1 w-full overflow-hidden bg-[var(--bg-elevated)]">
                            <div
                              className="h-full bg-[var(--accent-volt)] transition-all duration-1000 ease-out group-hover:bg-[var(--accent-spark)]"
                              style={{
                                width: `${skill.level}%`,
                                transitionDelay: `${si * 80}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
