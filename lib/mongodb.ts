import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "medical-law-hub";
const serverSelectionTimeoutMS = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS ?? 45000);
const connectTimeoutMS = Number(process.env.MONGODB_CONNECT_TIMEOUT_MS ?? 10000);
const socketTimeoutMS = Number(process.env.MONGODB_SOCKET_TIMEOUT_MS ?? 45000);

const clientOptions: MongoClientOptions = {
  serverSelectionTimeoutMS: Number.isFinite(serverSelectionTimeoutMS) ? serverSelectionTimeoutMS : 45000,
  connectTimeoutMS: Number.isFinite(connectTimeoutMS) ? connectTimeoutMS : 10000,
  socketTimeoutMS: Number.isFinite(socketTimeoutMS) ? socketTimeoutMS : 45000,
  maxPoolSize: 10
};

let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoDatabase(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is required.");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, clientOptions);
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }

  const client = await clientPromise;

  return client.db(databaseName);
}
