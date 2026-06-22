import { NextResponse } from "next/server";

import { getBlogImage } from "@/lib/blog-images";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BlogImageRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: BlogImageRouteProps) {
  const { id } = await params;
  const image = await getBlogImage(id);

  if (!image) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  return new Response(image.stream, {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
