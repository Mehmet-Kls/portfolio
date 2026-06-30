type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="mono text-sm text-[var(--accent-volt)]">04</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--text-primary)]">
            Blog
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="mono text-sm text-[var(--text-tertiary)]">{"// henüz yazı yayınlanmadı"}</p>
        ) : (
          <div className="divide-y divide-[var(--line)]">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors first:pt-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-volt)] transition-colors">
                    {post.title}
                  </h3>
                  <span className="mono shrink-0 text-xs text-[var(--text-tertiary)]">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                {post.excerpt && (
                  <p className="text-sm text-[var(--text-secondary)] max-w-2xl">{post.excerpt}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
