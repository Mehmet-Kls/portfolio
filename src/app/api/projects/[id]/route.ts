import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(projects)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.projectUrl !== undefined && { projectUrl: body.projectUrl }),
      ...(body.githubUrl !== undefined && { githubUrl: body.githubUrl }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.orderIndex !== undefined && { orderIndex: body.orderIndex }),
      ...(body.status !== undefined && { status: body.status }),
    })
    .where(eq(projects.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Proje bulunamadı." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await db.delete(projects).where(eq(projects.id, Number(id)));
  return NextResponse.json({ success: true });
}
