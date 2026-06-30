import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const includeAll = req.nextUrl.searchParams.get("all") === "1";
  const rows = includeAll
    ? await db.select().from(posts).orderBy(desc(posts.createdAt))
    : await db.select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const body = await req.json();
  const slug = (body.slug || body.title)
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const [created] = await db
    .insert(posts)
    .values({
      slug,
      title: body.title,
      excerpt: body.excerpt ?? "",
      content: body.content,
      coverImageUrl: body.coverImageUrl ?? "",
      status: body.status ?? "draft",
      publishedAt: body.status === "published" ? new Date() : null,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
