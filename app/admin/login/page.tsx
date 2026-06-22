import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to manage Medical Law Hub blog publishing."
};

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const [{ next }, authenticated] = await Promise.all([searchParams, isAdminAuthenticated()]);
  const nextPath = sanitizeNextPath(next);

  if (authenticated) {
    redirect(nextPath);
  }

  return <AdminLoginForm nextPath={nextPath} />;
}

function sanitizeNextPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin/blog";
  }

  return value;
}
