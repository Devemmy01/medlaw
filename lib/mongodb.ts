import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "medical-law-hub";

let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoDatabase(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is required.");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const client = await clientPromise;

  return client.db(databaseName);
}
