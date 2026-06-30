import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(posts)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.coverImageUrl !== undefined && { coverImageUrl: body.coverImageUrl }),
      ...(body.status !== undefined && {
        status: body.status,
        publishedAt: body.status === "published" ? new Date() : null,
      }),
      updatedAt: new Date(),
    })
    .where(eq(posts.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await db.delete(posts).where(eq(posts.id, Number(id)));
  return NextResponse.json({ success: true });
}
