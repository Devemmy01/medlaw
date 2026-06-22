import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const adminSessionCookie = "mlh_admin_session";

const sessionMaxAge = 60 * 60 * 8;

export type AdminLoginResult =
  | { ok: true; cookieValue: string; maxAge: number }
  | { ok: false; error: string };

export async function createAdminSession(username: string, password: string): Promise<AdminLoginResult> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return {
      ok: false,
      error: "ADMIN_USERNAME and ADMIN_PASSWORD must be configured."
    };
  }

  if (!safeCompare(username, expectedUsername) || !safeCompare(password, expectedPassword)) {
    return {
      ok: false,
      error: "Invalid admin credentials."
    };
  }

  const expiresAt = Date.now() + sessionMaxAge * 1000;
  const payload = `${expectedUsername}.${expiresAt}`;
  const signature = signValue(payload);

  return {
    ok: true,
    cookieValue: `${payload}.${signature}`,
    maxAge: sessionMaxAge
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookie)?.value;

  return verifySession(session);
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  return verifySession(request.cookies.get(adminSessionCookie)?.value);
}

export function getAdminLoginPath(nextPath = "/admin/blog") {
  return `/admin/login?next=${encodeURIComponent(nextPath)}`;
}

function verifySession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const parts = value.split(".");

  if (parts.length < 3) {
    return false;
  }

  const signature = parts.pop();
  const payload = parts.join(".");
  const [, expiresAtValue] = payload.split(".");
  const expiresAt = Number(expiresAtValue);

  if (!signature || !expiresAt || Date.now() > expiresAt) {
    return false;
  }

  return safeCompare(signature, signValue(payload));
}

function signValue(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET or AUTH_SECRET is required.");
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeCompare(first: string, second: string) {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  if (firstBuffer.length !== secondBuffer.length) {
    return false;
  }

  return timingSafeEqual(firstBuffer, secondBuffer);
}
