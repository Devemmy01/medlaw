import { redirect } from "next/navigation";

import { getAdminLoginPath, isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  redirect(authenticated ? "/admin/blog" : getAdminLoginPath("/admin/blog"));
}
