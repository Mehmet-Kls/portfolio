import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews, messages } from "@/db/schema";
import { sql, gte, eq } from "drizzle-orm";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireAuth();
  if (!auth.authorized) return auth.response;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalViews] = await db.select({ count: sql<number>`count(*)` }).from(pageViews);
  const [todayViews] = await db.select({ count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.createdAt, todayStart));
  const [last7Days] = await db.select({ count: sql<number>`count(*)` }).from(pageViews).where(gte(pageViews.createdAt, sevenDaysAgo));
  const [unreadMessages] = await db.select({ count: sql<number>`count(*)` }).from(messages).where(eq(messages.read, false));

  const topPages = await db
    .select({ path: pageViews.path, count: sql<number>`count(*)` })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(pageViews.path)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  const dailyViews = await db
    .select({
      date: sql<string>`date(${pageViews.createdAt})`,
      count: sql<number>`count(*)`,
    })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(sql`date(${pageViews.createdAt})`)
    .orderBy(sql`date(${pageViews.createdAt})`);

  const deviceBreakdown = await db
    .select({ device: pageViews.device, count: sql<number>`count(*)` })
    .from(pageViews)
    .where(gte(pageViews.createdAt, thirtyDaysAgo))
    .groupBy(pageViews.device);

  return NextResponse.json({
    totalViews: Number(totalViews.count),
    todayViews: Number(todayViews.count),
    last7Days: Number(last7Days.count),
    unreadMessages: Number(unreadMessages.count),
    topPages: topPages.map((p) => ({ path: p.path, count: Number(p.count) })),
    dailyViews: dailyViews.map((d) => ({ date: d.date, count: Number(d.count) })),
    deviceBreakdown: deviceBreakdown.map((d) => ({ device: d.device, count: Number(d.count) })),
  });
}
