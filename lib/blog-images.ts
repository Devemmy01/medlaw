import { Readable } from "stream";
import { GridFSBucket, ObjectId } from "mongodb";

import { getMongoDatabase } from "@/lib/mongodb";

type SaveBlogImageInput = {
  filename: string;
  contentType: string;
  buffer: Buffer;
};

export type BlogImageFile = {
  contentType: string;
  stream: ReadableStream<Uint8Array>;
};

export async function saveBlogImage({ filename, contentType, buffer }: SaveBlogImageInput) {
  const bucket = await getBlogImageBucket();
  const uploadStream = bucket.openUploadStream(filename, {
    metadata: {
      contentType,
      feature: "blog",
      uploadedAt: new Date().toISOString()
    }
  });

  await new Promise<void>((resolve, reject) => {
    uploadStream.once("error", reject);
    uploadStream.once("finish", resolve);
    uploadStream.end(buffer);
  });

  return `/api/blog/images/${uploadStream.id.toString()}`;
}

export async function getBlogImage(id: string): Promise<BlogImageFile | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const objectId = new ObjectId(id);
  const bucket = await getBlogImageBucket();
  const files = await bucket.find({ _id: objectId }).limit(1).toArray();
  const file = files[0];

  if (!file) {
    return null;
  }

  const stream = bucket.openDownloadStream(objectId);

  const metadata = file.metadata as { contentType?: string } | undefined;

  return {
    contentType: metadata?.contentType || "application/octet-stream",
    stream: Readable.toWeb(stream) as ReadableStream<Uint8Array>
  };
}

async function getBlogImageBucket() {
  const db = await getMongoDatabase();

  return new GridFSBucket(db, {
    bucketName: "blog_images"
  });
}
