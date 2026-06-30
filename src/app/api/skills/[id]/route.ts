import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(skills)
    .set({
      ...(body.name !== undefined && { name: body.name }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.icon !== undefined && { icon: body.icon }),
      ...(body.level !== undefined && { level: body.level }),
      ...(body.orderIndex !== undefined && { orderIndex: body.orderIndex }),
    })
    .where(eq(skills.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Yetenek bulunamadı." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await db.delete(skills).where(eq(skills.id, Number(id)));
  return NextResponse.json({ success: true });
}
