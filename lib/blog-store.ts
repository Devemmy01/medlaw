import type { Collection } from "mongodb";

import { getMongoDatabase } from "@/lib/mongodb";

export type BlogAuthor = {
  name: string;
  role?: string;
  bio?: string;
};

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: BlogAuthor;
  image: string;
  imageAlt: string;
  status: BlogPostStatus;
  publishedAt: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
};

// Kept as an alias so callers do not need a data migration in lockstep with this change.
export type BlogPostWithAuthor = BlogPost;

type LegacyBlogAuthor = BlogAuthor & {
  id: string;
  createdAt?: string;
};

type BlogPostDocument = Omit<BlogPost, "author"> & {
  author?: BlogAuthor;
  authorId?: string;
  category?: string;
};

type CreatePostInput = {
  title: string;
  content: string;
  tags?: string[];
  author: string;
  image?: string;
  imageAlt?: string;
  status?: BlogPostStatus;
  publishedAt?: string;
};

type BlogCollections = {
  authors: Collection<LegacyBlogAuthor>;
  posts: Collection<BlogPostDocument>;
};

let indexesReady: Promise<void> | null = null;

export async function getAllPosts() {
  const { authors, posts } = await getBlogCollections();
  const [postDocuments, legacyAuthors] = await Promise.all([
    posts.find({}).sort({ publishedAt: -1 }).toArray(),
    authors.find({}).toArray()
  ]);

  return hydratePosts(postDocuments, legacyAuthors).sort(sortPostsByDate);
}

export async function getPublishedPosts() {
  const { authors, posts } = await getBlogCollections();
  const [postDocuments, legacyAuthors] = await Promise.all([
    posts.find({ status: "published" }).sort({ publishedAt: -1 }).toArray(),
    authors.find({}).toArray()
  ]);

  return hydratePosts(postDocuments, legacyAuthors).sort(sortPostsByDate);
}

export async function getPostBySlug(slug: string) {
  const { authors, posts } = await getBlogCollections();
  const post = await posts.findOne({ slug, status: "published" });

  if (!post) {
    return null;
  }

  const legacyAuthor = post.authorId ? await authors.findOne({ id: post.authorId }) : null;

  return hydratePost(post, legacyAuthor ?? undefined);
}

export async function createPost(input: CreatePostInput) {
  const { posts } = await getBlogCollections();
  const title = input.title.trim();
  const content = input.content.trim();
  const authorName = input.author.trim();
  const image = input.image?.trim() ?? "";

  if (!title) {
    throw new Error("Post title is required.");
  }

  if (!content) {
    throw new Error("Markdown content is required.");
  }

  if (!authorName) {
    throw new Error("Author name is required.");
  }

  if (image && !isValidImageReference(image)) {
    throw new Error("Use a valid uploaded image or image URL.");
  }

  const now = new Date().toISOString();
  const status = input.status === "draft" ? "draft" : "published";
  const author: BlogAuthor = { name: authorName };
  const post: BlogPostDocument = {
    id: createId("post"),
    title,
    slug: await createUniqueSlug(title, posts),
    excerpt: createExcerpt(content) || title,
    content,
    tags: normalizeTags(input.tags),
    author,
    image,
    imageAlt: image ? input.imageAlt?.trim() || title : "",
    status,
    publishedAt: normalizePublishedAt(input.publishedAt, now),
    readTime: estimateReadTime(content),
    createdAt: now,
    updatedAt: now
  };

  await posts.insertOne(post);

  return hydratePost(post);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

async function getBlogCollections(): Promise<BlogCollections> {
  const db = await getMongoDatabase();
  const collections = {
    authors: db.collection<LegacyBlogAuthor>("blog_authors"),
    posts: db.collection<BlogPostDocument>("blog_posts")
  };

  if (!indexesReady) {
    indexesReady = Promise.all([
      collections.posts.createIndex({ id: 1 }, { unique: true }),
      collections.posts.createIndex({ slug: 1 }, { unique: true }),
      collections.posts.createIndex({ status: 1, publishedAt: -1 })
    ]).then(() => undefined);
  }

  await indexesReady;

  return collections;
}

async function createUniqueSlug(value: string, posts: Collection<BlogPostDocument>) {
  const base = slugify(value) || "blog-post";
  let slug = base;
  let suffix = 2;

  while (await posts.findOne({ slug }, { projection: { id: 1 } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function hydratePosts(posts: BlogPostDocument[], legacyAuthors: LegacyBlogAuthor[]) {
  return posts
    .map((post) => {
      const legacyAuthor = post.authorId
        ? legacyAuthors.find((author) => author.id === post.authorId)
        : undefined;

      return hydratePost(post, legacyAuthor);
    })
    .filter((post): post is BlogPost => Boolean(post));
}

function hydratePost(post: BlogPostDocument, legacyAuthor?: LegacyBlogAuthor): BlogPost | null {
  const author = post.author ?? legacyAuthor;

  if (!author?.name) {
    return null;
  }

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags ?? [],
    author: {
      name: author.name,
      role: author.role,
      bio: author.bio
    },
    image: post.image ?? "",
    imageAlt: post.imageAlt ?? "",
    status: post.status,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };
}

function sortPostsByDate(first: BlogPost, second: BlogPost) {
  return new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime();
}

function createExcerpt(markdown: string, maximumLength = 180) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~|\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maximumLength) {
    return plainText;
  }

  const shortened = plainText.slice(0, maximumLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const end = lastSpace > maximumLength * 0.7 ? lastSpace : maximumLength;

  return `${shortened.slice(0, end).trim()}…`;
}

function estimateReadTime(markdown: string) {
  const words = markdown.replace(/[#*_>`[\]()!-]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function normalizeTags(tags?: string[]) {
  return Array.from(
    new Set(
      (tags ?? [])
        .flatMap((tag) => tag.split(","))
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );
}

function normalizePublishedAt(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function isValidImageReference(value: string) {
  return value.startsWith("/api/blog/images/") || /^https?:\/\/\S+\.\S+/i.test(value);
}
