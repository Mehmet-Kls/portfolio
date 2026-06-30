import { NextResponse } from "next/server";
import { getSession } from "./auth";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return { authorized: false as const, response: NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 }) };
  }
  return { authorized: true as const, session };
}
