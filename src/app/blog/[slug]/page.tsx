import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import CircuitBackground from "@/components/CircuitBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <>
      <CircuitBackground />
      <Navbar />
      <main className="px-6 pt-32 pb-20">
        <article className="mx-auto max-w-3xl">
          <Link href="/#blog" className="mono mb-8 inline-block text-xs text-[var(--accent-volt)] hover:underline">
            ← tüm yazılar
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--text-primary)]">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="mono mt-3 text-xs text-[var(--text-tertiary)]">
              {new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
          <div className="mt-10 whitespace-pre-wrap text-base leading-relaxed text-[var(--text-secondary)]">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
