import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const rows = await db.select().from(skills).orderBy(skills.orderIndex);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const body = await req.json();
  const [created] = await db
    .insert(skills)
    .values({
      name: body.name,
      category: body.category ?? "general",
      icon: body.icon ?? "",
      level: body.level ?? 80,
      orderIndex: body.orderIndex ?? 0,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
