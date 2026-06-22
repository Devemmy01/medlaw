import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { createPost, getAllPosts } from "@/lib/blog-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  const posts = await getAllPosts();

  return NextResponse.json({ posts });
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

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: getMessage(error) }, { status: 400 });
  }
}

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to save post.";
}

function unauthorized() {
  return NextResponse.json({ error: "Authentication required." }, { status: 401 });
}
