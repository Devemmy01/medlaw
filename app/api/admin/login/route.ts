import { NextResponse } from "next/server";

import { adminSessionCookie, createAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const result = await createAdminSession(body.username ?? "", body.password ?? "");

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminSessionCookie, result.cookieValue, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: result.maxAge
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 500 }
    );
  }
}
