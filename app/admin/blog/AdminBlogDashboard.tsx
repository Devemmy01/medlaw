"use client";

import { ImageUp, Link2, Loader2, LogOut, Save } from "lucide-react";
import { type ChangeEvent, type FormEvent, useDeferredValue, useMemo, useState } from "react";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { RichTextEditor } from "@/components/RichTextEditor";
import type { BlogPostWithAuthor } from "@/lib/blog-store";

type AdminBlogDashboardProps = {
  initialPosts: BlogPostWithAuthor[];
};

type PostForm = {
  title: string;
  content: string;
  tags: string;
  author: string;
  image: string;
  imageAlt: string;
  status: "published" | "draft";
  publishedAt: string;
};

const initialPostForm: PostForm = {
  title: "",
  content:
    "## Start with a clear legal question\n\nWrite the article here. Use the toolbar to add links, lists, quotes and section headings.\n\n- Explain the issue\n- Show the legal or policy implication\n- Close with a practical takeaway",
  tags: "",
  author: "",
  image: "",
  imageAlt: "",
  status: "published",
  publishedAt: ""
};

export function AdminBlogDashboard({ initialPosts }: AdminBlogDashboardProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [postForm, setPostForm] = useState<PostForm>(initialPostForm);
  const [postSaving, setPostSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const previewContent = useDeferredValue(postForm.content);

  const publishedPosts = useMemo(() => posts.filter((post) => post.status === "published").length, [posts]);

  async function handlePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = String(formData.get("content") ?? postForm.content);
    setPostSaving(true);
    setNotice("");
    setError("");

    try {
      const response = await fetch("/api/admin/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...postForm,
          content,
          tags: postForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        })
      });
      const result = (await response.json()) as { post?: BlogPostWithAuthor; error?: string };

      if (!response.ok || !result.post) {
        throw new Error(result.error ?? "Unable to save post.");
      }

      setPosts((items) => [result.post as BlogPostWithAuthor, ...items]);
      setPostForm(initialPostForm);
      setNotice(`Post saved at /blog/${result.post.slug}. The excerpt and slug were generated automatically.`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save post.");
    } finally {
      setPostSaving(false);
    }
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageUploading(true);
    setNotice("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Unable to upload image.");
      }

      setPostForm((form) => ({
        ...form,
        image: result.url as string,
        imageAlt: form.imageAlt || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
      }));
      setNotice("Image uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload image.");
    } finally {
      setImageUploading(false);
      event.target.value = "";
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return (
    <main className="min-h-screen bg-paper-100 text-navy-950">
      <section className="border-b border-navy-200 bg-paper-50 py-6">
        <div className="container-px">
          <div className="grid gap-6 border border-navy-200 bg-paper-100 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-label">Admin dashboard</p>
              <h1 className="safe-heading mt-4 font-display text-[clamp(3rem,12vw,6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
                Blog publishing desk
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-navy-700 sm:text-base">
                Add the author directly to each post. Slugs and excerpts are generated when you save, and images are optional.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 border border-navy-200 bg-paper-50 text-center">
                <Metric value={String(posts.length)} label="total posts" />
                <Metric value={String(publishedPosts)} label="published" />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 border border-navy-300 bg-paper-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy-950 transition hover:border-navy-950 hover:bg-navy-50"
              >
                <LogOut aria-hidden="true" className="size-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px grid gap-8">
          <form onSubmit={handlePostSubmit} className="border border-navy-200 bg-paper-50">
            <div className="grid border-b border-navy-200 xl:grid-cols-[1fr_0.38fr]">
              <div className="min-w-0 p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <Save aria-hidden="true" className="size-5" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Create blog post</h2>
                </div>

                <div className="mt-6 grid gap-5">
                  <div className="grid gap-5 lg:grid-cols-2">
                    <Field label="Title" value={postForm.title} onChange={(value) => setPostForm((form) => ({ ...form, title: value }))} required />
                    <Field label="Author name" value={postForm.author} onChange={(value) => setPostForm((form) => ({ ...form, author: value }))} required />
                  </div>
                  <div className="grid gap-5 lg:grid-cols-3">
                    <Field label="Tags" value={postForm.tags} onChange={(value) => setPostForm((form) => ({ ...form, tags: value }))} placeholder="Consent, AI, privacy" />
                    <label className="grid gap-2 text-sm font-semibold text-navy-900">
                      Status
                      <select
                        value={postForm.status}
                        onChange={(event) => setPostForm((form) => ({ ...form, status: event.target.value as PostForm["status"] }))}
                        className="form-input"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </label>
                    <Field label="Publish date" type="date" value={postForm.publishedAt} onChange={(value) => setPostForm((form) => ({ ...form, publishedAt: value }))} />
                  </div>
                  <RichTextEditor label="Article body" value={postForm.content} onChange={(value) => setPostForm((form) => ({ ...form, content: value }))} />
                  <p className="text-xs leading-6 text-navy-600">The excerpt is generated from this body, and the URL slug is generated from the title.</p>
                </div>
              </div>

              <aside className="border-t border-navy-200 bg-paper-100 p-5 sm:p-6 lg:p-8 xl:border-l xl:border-t-0">
                <div className="flex items-center gap-3">
                  <ImageUp aria-hidden="true" className="size-5" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">Post image (optional)</h2>
                </div>
                <label className="mt-6 flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-navy-300 bg-paper-50 p-5 text-center text-sm text-navy-700 transition hover:border-navy-950">
                  {imageUploading ? <Loader2 aria-hidden="true" className="size-6 animate-spin" /> : <ImageUp aria-hidden="true" className="size-6" />}
                  <span>{imageUploading ? "Uploading image..." : "Upload JPG, PNG, WEBP or GIF"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageUpload} className="sr-only" />
                </label>
                <div className="mt-5 grid gap-4">
                  <Field label="Image URL" value={postForm.image} onChange={(value) => setPostForm((form) => ({ ...form, image: value }))} placeholder="Optional image URL" icon={Link2} />
                  <Field label="Image alt text" value={postForm.imageAlt} onChange={(value) => setPostForm((form) => ({ ...form, imageAlt: value }))} placeholder="Optional; title is used by default" />
                </div>
                {postForm.image ? (
                  <div className="mt-5 overflow-hidden border border-navy-200 bg-paper-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={postForm.image} alt={postForm.imageAlt || "Blog post preview"} className="aspect-[4/3] w-full object-cover" />
                  </div>
                ) : null}
              </aside>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-h-6 text-sm font-medium">
                {error ? <p className="text-red-700">{error}</p> : null}
                {notice ? <p className="text-navy-700">{notice}</p> : null}
              </div>
              <button type="submit" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-navy-950 bg-navy-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper-50 transition hover:bg-paper-50 hover:text-navy-950 disabled:cursor-not-allowed disabled:opacity-60" disabled={postSaving || imageUploading}>
                {postSaving ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}
                Save post
              </button>
            </div>
          </form>

          <section className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
            <div className="border border-navy-200 bg-paper-50 p-5 sm:p-6">
              <p className="section-label">Article preview</p>
              <div className="mt-6 border border-navy-200 bg-paper-100 p-5 sm:p-6">
                <MarkdownRenderer content={previewContent} />
              </div>
            </div>

            <div className="border border-navy-200 bg-paper-50 p-5 sm:p-6">
              <p className="section-label">Post inventory</p>
              <div className="mt-6 grid gap-4">
                {posts.length ? (
                  posts.slice(0, 8).map((post) => (
                    <article key={post.id} className="grid gap-4 border border-navy-200 bg-paper-100 p-4 sm:grid-cols-[5.5rem_1fr]">
                      {post.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.image} alt={post.imageAlt} className="aspect-square w-full object-cover" />
                      ) : (
                        <div className="flex aspect-square w-full items-center justify-center border border-navy-200 bg-paper-50 text-navy-400">
                          <ImageUp aria-hidden="true" className="size-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">{post.status}</p>
                        <h3 className="safe-heading mt-1 text-base font-semibold text-navy-950">{post.title}</h3>
                        <p className="mt-2 text-xs text-navy-600">{post.author.name}</p>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-navy-700">No posts yet. Published posts will appear on the public blog.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-28 border-r border-navy-200 p-4 last:border-r-0">
      <p className="font-display text-4xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-500">{label}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  icon: Icon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  icon?: typeof Link2;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-navy-900">
      {label}
      <span className="relative">
        {Icon ? <Icon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy-500" /> : null}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={["form-input", Icon ? "pl-10" : ""].join(" ")}
        />
      </span>
    </label>
  );
}
