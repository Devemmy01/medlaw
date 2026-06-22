import type { Metadata } from "next";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedReveal } from "@/components/AnimatedReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { PageWrapper } from "@/components/PageWrapper";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-store";

export const dynamic = "force-dynamic";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Article"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name]
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined
    }
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPublishedPosts()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <PageWrapper>
      <article className="border-b border-navy-200 bg-paper-50 text-navy-950">
        <div className="container-px py-5">
          <AnimatedReveal className="overflow-hidden border border-navy-200 bg-paper-100">
            <div className={post.image ? "grid lg:grid-cols-[0.58fr_0.42fr]" : "grid"}>
              <div className="min-w-0 border-b border-navy-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-500 hover:text-navy-950">
                  Back to blog
                </Link>
                <h1 className="safe-heading mt-10 font-display text-[clamp(3rem,12vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-navy-700 sm:text-lg">{post.excerpt}</p>
                <div className="mt-8 grid gap-3 border-y border-navy-200 py-5 text-sm text-navy-700 sm:grid-cols-3">
                  <MetaLine icon={CalendarDays} label={formatDate(post.publishedAt)} />
                  <MetaLine icon={UserRound} label={post.author.name} />
                  <MetaLine icon={Clock3} label={post.readTime} />
                </div>
              </div>
              {post.image ? (
                <aside className="bg-navy-950 p-4 sm:p-5">
                  <div className="h-full min-h-96 overflow-hidden border border-navy-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.imageAlt} className="h-full min-h-96 w-full object-cover" />
                  </div>
                </aside>
              ) : null}
            </div>
          </AnimatedReveal>
        </div>
      </article>

      <section className="section-y bg-paper-50">
        <div className="container-px grid gap-10 lg:grid-cols-[0.28fr_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-navy-200 bg-paper-100 p-5">
              <p className="section-label">Author</p>
              <h2 className="mt-4 text-xl font-semibold text-navy-950">{post.author.name}</h2>
              <p className="mt-1 text-sm font-medium text-navy-600">{post.author.role || "Contributor"}</p>
              {post.author.bio ? <p className="mt-4 text-sm leading-7 text-navy-700">{post.author.bio}</p> : null}
            </div>
          </aside>

          <AnimatedReveal className="min-w-0 border border-navy-200 bg-paper-100 p-6 sm:p-8 lg:p-10">
            <MarkdownRenderer content={post.content} />
            {post.tags.length ? (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-navy-200 pt-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="border border-navy-200 bg-paper-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-600">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </AnimatedReveal>
        </div>
      </section>

      {relatedPosts.length ? (
        <section className="section-y border-t border-navy-200 bg-paper-100">
          <div className="container-px">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Keep reading</p>
                <h2 className="safe-heading mt-4 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.045em]">
                  Related articles
                </h2>
              </div>
              <ButtonLink href="/blog" variant="secondary">
                View Blog
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-0 overflow-hidden border border-navy-200 bg-paper-50 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group min-w-0 border-b border-navy-200 p-5 transition hover:bg-paper-100 md:border-r">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.imageAlt} className="aspect-[4/3] w-full object-cover" />
                  ) : null}
                  <h3 className="safe-heading mt-5 text-lg font-semibold leading-6 text-navy-950 group-hover:underline">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
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
      <Icon aria-hidden="true" className="size-4 shrink-0 text-navy-500" />
      <span className="min-w-0 break-words">{label}</span>
    </p>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
