import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import Link from "next/link";

import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { PageWrapper } from "@/components/PageWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { getPublishedPosts, type BlogPostWithAuthor } from "@/lib/blog-store";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Medical Law Blog",
  description:
    "Read Medical Law Hub articles on patient rights, bioethics, medical negligence, clinical accountability, digital health, AI in medicine and healthcare law reform.",
  path: "/blog",
  image: {
    url: "/images/medlaw-research-desk.png",
    width: 1162,
    height: 1454,
    alt: "Medical law blog and research desk"
  },
  keywords: ["medical law blog", "patient rights articles", "clinical negligence", "bioethics articles"]
});

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let blogPosts: BlogPostWithAuthor[] = [];
  let blogLoadError = false;

  try {
    blogPosts = await getPublishedPosts();
  } catch (error) {
    blogLoadError = true;
    console.error("Failed to load published blog posts.", error);
  }

  const featuredPost = blogPosts[0];
  const archivePosts = blogPosts;

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Blog"
        title="Medico-legal insight for safer, fairer healthcare."
        description="A public education archive for medical law analysis, patient rights explainers, health policy commentary and emerging digital health questions."
        primaryHref="/research-media"
        primaryLabel="Research Library"
        secondaryHref="/contact"
        secondaryLabel="Submit Inquiry"
        mediaSrc="/images/medlaw-research-desk.png"
        mediaAlt="Medical law research desk with books, notes and a stethoscope"
        mediaCaption="Blog analysis / Public education / Legal literacy"
      />

      {featuredPost ? (
        <>
          <section className="section-y bg-paper-50">
            <div className="container-px">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
                <AnimatedReveal className="overflow-hidden border border-navy-200 bg-paper-100">
                  <article className="grid min-w-0 lg:grid-cols-[1fr_0.36fr]">
                    <div className="min-w-0 border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                      <p className="section-label">Featured article</p>
                      <Link href={`/blog/${featuredPost.slug}`} className="group block">
                        <h2 className="safe-heading mt-8 font-display text-[clamp(2.35rem,6vw,4.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-navy-950 group-hover:underline">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      <p className="mt-6 max-w-3xl text-base leading-8 text-navy-700 sm:text-lg">{featuredPost.excerpt}</p>
                      <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy-600">
                        <span className="border border-navy-200 bg-paper-50 px-3 py-2">{featuredPost.readTime}</span>
                        <span className="border border-navy-200 bg-paper-50 px-3 py-2">{formatDate(featuredPost.publishedAt)}</span>
                      </div>
                      <div className="mt-8">
                        <ButtonLink href={`/blog/${featuredPost.slug}`}>Read Article</ButtonLink>
                      </div>
                    </div>

                    <aside className="grid bg-navy-950 text-paper-50">
                      {featuredPost.image ? (
                        <div className="relative min-h-72 overflow-hidden border-b border-navy-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={featuredPost.image} alt={featuredPost.imageAlt} className="h-full min-h-72 w-full object-cover opacity-90" />
                        </div>
                      ) : (
                        <div className="flex min-h-72 items-end border-b border-navy-700 bg-[radial-gradient(circle_at_30%_20%,rgba(246,242,232,0.16),transparent_34%),linear-gradient(135deg,#04182c,#0b2a48)] p-6">
                          <p className="safe-heading font-display text-4xl font-semibold uppercase leading-none text-paper-50">
                            MedLaw
                          </p>
                        </div>
                      )}
                      <div className="p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-200">Article details</p>
                        <div className="mt-8 grid gap-4 text-sm text-navy-100">
                          <MetaLine icon={CalendarDays} label={formatDate(featuredPost.publishedAt)} />
                          <MetaLine icon={UserRound} label={featuredPost.author.name} />
                          <MetaLine icon={Clock3} label={featuredPost.readTime} />
                        </div>
                      </div>
                    </aside>
                  </article>
                </AnimatedReveal>

                <AnimatedReveal delay={0.08} className="border border-navy-200 bg-paper-50 p-6 sm:p-8">
                  <p className="section-label">Latest articles</p>
                  <div className="mt-6">
                    <p className="safe-heading font-display text-3xl font-semibold uppercase leading-none text-navy-950">
                      Latest notes
                    </p>
                    <div className="mt-5 grid gap-4">
                      {blogPosts.slice(0, 5).map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">{formatDate(post.publishedAt)}</p>
                          <p className="safe-heading mt-1 text-sm font-semibold leading-6 text-navy-950 group-hover:underline">
                            {post.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedReveal>
              </div>
            </div>
          </section>

          <section className="section-y surface-grid bg-navy-50">
            <div className="container-px">
              <div className="grid gap-10 border-b border-navy-200 pb-10 lg:grid-cols-[0.68fr_1fr] lg:items-end">
                <SectionHeader
                  eyebrow="Article archive"
                  title="Latest Medical Law Hub blog features."
                  description="Every article below is managed from the admin dashboard and includes its author, excerpt, date and reading time."
                />
                <AnimatedReveal className="border border-navy-200 bg-paper-50 p-6">
                  <p className="text-sm leading-7 text-navy-700">
                    Published posts appear automatically here. Drafts stay hidden until an admin changes their status.
                  </p>
                </AnimatedReveal>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {archivePosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="section-y bg-paper-50">
          <div className="container-px">
            <div className="border border-navy-200 bg-paper-100 p-7 sm:p-10">
              <p className="section-label">{blogLoadError ? "Blog temporarily unavailable" : "No published posts"}</p>
              <h2 className="safe-heading mt-5 font-display text-[clamp(2.7rem,10vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-navy-950">
                {blogLoadError ? "The blog archive could not be loaded right now." : "The blog archive is ready for publishing."}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-navy-700">
                {blogLoadError
                  ? "Please check the production server logs and MongoDB connection settings. The public blog page is still rendering safely while the data source is unavailable."
                  : "Create the first published post from the admin dashboard. Once published, it will appear here with its author and article page."}
              </p>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Have research, commentary or a public education topic to publish?"
        description="Medical Law Hub can receive medico-legal article proposals, policy notes and expert commentary for future blog and research updates."
        primaryHref="/contact"
        primaryLabel="Contact Editorial Desk"
        secondaryHref="/get-involved"
        secondaryLabel="Contribute"
      />
    </PageWrapper>
  );
}

type MetaLineProps = {
  icon: typeof CalendarDays;
  label: string;
};

function MetaLine({ icon: Icon, label }: MetaLineProps) {
  return (
    <p className="flex min-w-0 items-center gap-3">
      <Icon aria-hidden="true" className="size-4 shrink-0 text-navy-300" />
      <span className="min-w-0 break-words">{label}</span>
    </p>
  );
}

function BlogCard({ post, index }: { post: BlogPostWithAuthor; index: number }) {
  return (
    <AnimatedReveal
      delay={index * 0.04}
      className="group flex min-w-0 flex-col overflow-hidden border border-navy-200 bg-paper-50 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
    >
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden border-b border-navy-200">
        {post.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.imageAlt} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          </>
        ) : (
          <div className="flex aspect-[4/3] items-end bg-[radial-gradient(circle_at_20%_20%,rgba(246,242,232,0.18),transparent_34%),linear-gradient(135deg,#04182c,#12385d)] p-5 text-paper-50">
            <p className="safe-heading font-display text-3xl font-semibold uppercase leading-none">
              Medical Law Hub
            </p>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden="true">/</span>
            <span>{post.readTime}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="group/title block">
            <h3 className="safe-heading mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-navy-950 group-hover/title:underline">
              {post.title}
            </h3>
          </Link>
          <p className="mt-4 text-sm leading-7 text-navy-700">{post.excerpt}</p>
        </div>

        <div className="mt-8 flex min-w-0 items-center justify-between gap-5 border-t border-navy-200 pt-5">
          <div className="min-w-0 text-xs font-semibold uppercase tracking-[0.12em] text-navy-500">
            <p className="truncate">{post.author.name}</p>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="focus-ring inline-flex min-h-10 shrink-0 items-center justify-center gap-2 border border-navy-950 bg-navy-950 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-50 transition group-hover:bg-paper-50 group-hover:text-navy-950"
          >
            Read
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </AnimatedReveal>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
