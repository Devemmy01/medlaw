import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";

import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { saveBlogImage } from "@/lib/blog-images";
import { slugify } from "@/lib/blog-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxFileSize = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload an image file." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Use a JPG, PNG, WEBP or GIF image." }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
    }

    const extension = getExtension(file.name, file.type);
    const name = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "blog-image"}${extension}`;
    const bytes = await file.arrayBuffer();
    const url = await saveBlogImage({
      filename: name,
      contentType: file.type,
      buffer: Buffer.from(bytes)
    });

    return NextResponse.json({ url }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to upload image." }, { status: 500 });
  }
}

function getExtension(filename: string, mimeType: string) {
  const extension = path.extname(filename).toLowerCase();

  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(extension)) {
    return extension;
  }

  if (mimeType === "image/png") {
    return ".png";
  }

  if (mimeType === "image/webp") {
    return ".webp";
  }

  if (mimeType === "image/gif") {
    return ".gif";
  }

  return ".jpg";
}
