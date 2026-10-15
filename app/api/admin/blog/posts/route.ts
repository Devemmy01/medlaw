import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { createPost, getAllPosts, updatePost } from "@/lib/blog-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const posts = await getAllPosts();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to load admin blog posts.", error);

    return NextResponse.json(
      { error: "Unable to connect to the blog database. Please check MongoDB Atlas Network Access/IP allowlist and deployment outbound IPs." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as {
      title?: string;
      content?: string;
      tags?: string[];
      author?: string;
      image?: string;
      imageAlt?: string;
      status?: "draft" | "published";
      publishedAt?: string;
    };

    const post = await createPost({
      title: body.title ?? "",
      content: body.content ?? "",
      tags: body.tags,
      author: body.author ?? "",
      image: body.image,
      imageAlt: body.imageAlt,
      status: body.status,
      publishedAt: body.publishedAt
    });

    revalidateBlog();

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: getMessage(error) }, { status: isDatabaseConnectionError(error) ? 503 : 400 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      title?: string;
      content?: string;
      tags?: string[];
      author?: string;
      image?: string;
      imageAlt?: string;
      status?: "draft" | "published";
      publishedAt?: string;
    };

    const post = await updatePost({
      id: body.id ?? "",
      title: body.title ?? "",
      content: body.content ?? "",
      tags: body.tags,
      author: body.author ?? "",
      image: body.image,
      imageAlt: body.imageAlt,
      status: body.status,
      publishedAt: body.publishedAt
    });

    revalidateBlog();

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: getMessage(error) }, { status: isDatabaseConnectionError(error) ? 503 : 400 });
  }
}

function revalidateBlog() {
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to save post.";
}

function isDatabaseConnectionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.name === "MongoServerSelectionError" || error.message.toLowerCase().includes("server selection");
}

function unauthorized() {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}
