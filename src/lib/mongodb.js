// MongoDB connection setup with HMR optimization
// Development: Reuses existing connection across hot reloads to prevent multiple connections
// Production: Creates a fresh connection on server start

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let client;
let clientPromise;

// In development, use a global variable so the value
// is preserved across module reloads caused by HMR(Hot Module Reload).
if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, it's best to not use a global variable.
    client = new MongoClient(uri, {
        maxPoolSize: 10,
        minPoolSize: 5,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000
    });
    clientPromise = client.connect();
}


export async function getDb() {
    const client = await clientPromise;
    const db = client.db("admin_db"); // your database name

    // Ensure unique index on users.email
    await db.collection("users").createIndex(
        { email: 1 },
        { unique: true }
    );

    return db;
}

export default clientPromise;