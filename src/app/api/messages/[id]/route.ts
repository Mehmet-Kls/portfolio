import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(messages)
    .set({ ...(body.read !== undefined && { read: body.read }) })
    .where(eq(messages.id, Number(id)))
    .returning();

  if (!updated) return NextResponse.json({ error: "Mesaj bulunamadı." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  await db.delete(messages).where(eq(messages.id, Number(id)));
  return NextResponse.json({ success: true });
}
