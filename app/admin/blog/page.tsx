import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminBlogDashboard } from "@/app/admin/blog/AdminBlogDashboard";
import { getAdminLoginPath, isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog-store";

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Create Medical Law Hub Markdown blog posts."
};

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect(getAdminLoginPath("/admin/blog"));
  }

  const posts = await getAllPosts();

  return <AdminBlogDashboard initialPosts={posts} />;
}
