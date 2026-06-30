import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { db } from "@/db";
import { files } from "@/db/schema";
import { requireAuth } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });

  const [created] = await db
    .insert(files)
    .values({
      filename: file.name,
      url: blob.url,
      type: file.type,
      sizeBytes: file.size,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
