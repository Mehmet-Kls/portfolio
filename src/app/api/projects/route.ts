import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const includeAll = req.nextUrl.searchParams.get("all") === "1";
  const rows = includeAll
    ? await db.select().from(projects).orderBy(projects.orderIndex, desc(projects.createdAt))
    : await db.select().from(projects).where(eq(projects.status, "published")).orderBy(projects.orderIndex, desc(projects.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const body = await req.json();
  const [created] = await db
    .insert(projects)
    .values({
      title: body.title,
      description: body.description,
      tags: body.tags ?? [],
      imageUrl: body.imageUrl ?? "",
      projectUrl: body.projectUrl ?? "",
      githubUrl: body.githubUrl ?? "",
      featured: body.featured ?? false,
      orderIndex: body.orderIndex ?? 0,
      status: body.status ?? "published",
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
