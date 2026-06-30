import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const rows = await db.select().from(profile).limit(1);
  if (rows.length === 0) {
    const [created] = await db.insert(profile).values({}).returning();
    return NextResponse.json(created);
  }
  return NextResponse.json(rows[0]);
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const body = await req.json();
  const rows = await db.select().from(profile).limit(1);

  if (rows.length === 0) {
    const [created] = await db.insert(profile).values(body).returning();
    return NextResponse.json(created);
  }

  const [updated] = await db
    .update(profile)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(profile.id, rows[0].id))
    .returning();

  return NextResponse.json(updated);
}
