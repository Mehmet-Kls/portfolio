import { db } from "@/db";
import { profile, projects, skills, posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import CircuitBackground from "@/components/CircuitBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function Home() {
  const [profileRows, projectRows, skillRows, postRows] = await Promise.all([
    db.select().from(profile).limit(1),
    db.select().from(projects).where(eq(projects.status, "published")).orderBy(projects.orderIndex),
    db.select().from(skills).orderBy(skills.orderIndex),
    db.select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt)),
  ]);

  const profileData = profileRows[0] || {
    name: "Mehmet Kls",
    title: "Elektrik Teknisyeni / Yazılım Geliştirici",
    tagline: "",
    bio: "",
  };

  return (
    <>
      <CircuitBackground />
      <Navbar />
      <main>
        <Hero profile={profileData} />
        <About profile={profileData} />
        <Skills skills={skillRows.map((s) => ({ ...s, tags: undefined, category: s.category || "general", icon: s.icon || "", level: s.level ?? 80 }))} />
        <Projects
          projects={projectRows.map((p) => ({
            ...p,
            tags: (p.tags as string[]) || [],
            imageUrl: p.imageUrl || "",
            projectUrl: p.projectUrl || "",
            githubUrl: p.githubUrl || "",
            featured: p.featured || false,
          }))}
        />
        <Blog posts={postRows.map((p) => ({ ...p, publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null }))} />
        <Contact profile={profileData} />
      </main>
      <Footer />
    </>
  );
}
