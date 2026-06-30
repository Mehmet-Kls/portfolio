import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email || !body.body) {
    return NextResponse.json({ error: "İsim, e-posta ve mesaj zorunludur." }, { status: 400 });
  }

  const [created] = await db
    .insert(messages)
    .values({
      name: body.name,
      email: body.email,
      subject: body.subject ?? "",
      body: body.body,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
