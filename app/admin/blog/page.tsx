import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminBlogDashboard } from "@/app/admin/blog/AdminBlogDashboard";
import { getAdminLoginPath, isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog-store";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog Admin",
  description: "Create Medical Law Hub Markdown blog posts.",
  path: "/admin/blog",
  noIndex: true
});

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect(getAdminLoginPath("/admin/blog"));
  }

  try {
    const posts = await getAllPosts();

    return <AdminBlogDashboard initialPosts={posts} />;
  } catch (error) {
    console.error("Failed to load admin blog posts.", error);

    return (
      <AdminBlogDashboard
        initialPosts={[]}
        initialError="Could not connect to MongoDB, so existing posts could not be loaded. Atlas is rejecting the TLS handshake before authentication; check MongoDB Atlas Network Access and add this environment's public IP address, or allow your deployment provider's outbound IPs."
      />
    );
  }
}
