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

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Medical Law Hub blog articles on patient rights, bioethics, medical negligence, digital health, AI in medicine and healthcare law reform."
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getPublishedPosts();
  const featuredPost = blogPosts[0];
  const archivePosts = blogPosts.slice(1);

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
      />

      {featuredPost ? (
        <>
          <section className="section-y bg-paper-50">
            <div className="container-px">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.38fr]">
                <AnimatedReveal className="overflow-hidden border border-navy-200 bg-paper-100">
                  <article className="grid min-w-0 lg:grid-cols-[0.56fr_0.44fr]">
                    <div className="min-w-0 border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                      <p className="section-label">Featured article</p>
                      <h2 className="safe-heading mt-8 font-display text-[clamp(2.7rem,10vw,5.4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-navy-950">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-6 max-w-3xl text-base leading-8 text-navy-700 sm:text-lg">{featuredPost.excerpt}</p>
                      <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy-600">
                        <span className="border border-navy-200 bg-paper-50 px-3 py-2">{featuredPost.readTime}</span>
                      </div>
                      <div className="mt-8">
                        <ButtonLink href={`/blog/${featuredPost.slug}`}>Read Article</ButtonLink>
                      </div>
                    </div>

                    <aside className="grid min-h-96 bg-navy-950 text-paper-50">
                      {featuredPost.image ? (
                        <div className="relative min-h-72 overflow-hidden border-b border-navy-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={featuredPost.image} alt={featuredPost.imageAlt} className="h-full min-h-72 w-full object-cover opacity-90" />
                        </div>
                      ) : null}
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
                      {blogPosts.slice(1, 6).map((post) => (
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
                  description="Every article below is managed from the admin dashboard and includes its author and Markdown body."
                />
                <AnimatedReveal className="border border-navy-200 bg-paper-50 p-6">
                  <p className="text-sm leading-7 text-navy-700">
                    Published posts appear automatically here. Drafts stay hidden until an admin changes their status.
                  </p>
                </AnimatedReveal>
              </div>

              <div className="mt-10 grid gap-0 overflow-hidden border border-navy-200 bg-paper-50 sm:grid-cols-2 xl:grid-cols-3">
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
              <p className="section-label">No published posts</p>
              <h2 className="safe-heading mt-5 font-display text-[clamp(2.7rem,10vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-navy-950">
                The blog archive is ready for publishing.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-navy-700">
                Create the first published post from the admin dashboard. Once published, it will appear here with its author and article page.
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
      className="group flex min-h-[32rem] min-w-0 flex-col justify-between border-b border-navy-200 transition hover:bg-paper-100 sm:border-r"
    >
      {post.image ? (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden border-b border-navy-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.imageAlt} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-500">
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="safe-heading mt-8 font-display text-[clamp(2rem,8vw,3.25rem)] font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-navy-950">
            {post.title}
          </h3>
          <p className="mt-5 text-sm leading-7 text-navy-700">{post.excerpt}</p>
        </div>

        <div className="mt-10 flex min-w-0 items-end justify-between gap-5 border-t border-navy-200 pt-5">
          <div className="min-w-0 text-xs font-semibold uppercase tracking-[0.12em] text-navy-500">
            <p className="truncate">{post.author.name}</p>
            <p className="mt-1">{post.readTime}</p>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="focus-ring inline-flex size-11 shrink-0 items-center justify-center border border-navy-950 bg-navy-950 text-paper-50 transition group-hover:bg-paper-50 group-hover:text-navy-950"
          >
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </AnimatedReveal>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
