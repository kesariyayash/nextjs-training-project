import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "admin_db";
const COLLECTION_NAME = "admin_users";

export async function getAllAdminUsers() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const users = await db
        .collection(COLLECTION_NAME)
        .find({})
        .toArray();

    return users.map((user) => ({
        ...user,
        _id: user._id.toString(),
    }));
}

export async function getAdminUserById(id) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    return db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(id),
    });
}

export async function addAdminUser(user) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection(COLLECTION_NAME).insertOne(user);

    return {
        _id: result.insertedId,
        ...user,
    };
}

export async function replaceAdminUser(user) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const { name, role } = user;

    const userId = user.userId.trim();

    // First find the document to get its _id
    const existingUser = await db.collection(COLLECTION_NAME).findOne({ userId });

    if (!existingUser) {
        throw new Error("User not found with that User ID");
    }

    const result = await db.collection(COLLECTION_NAME).replaceOne(
        { _id: existingUser._id },
        { userId, name, role }
    );

    if (result.matchedCount === 0) {
        throw new Error("User not found with that User ID");
    }

    return {
        _id: existingUser._id,
        userId,
        name,
        role,
    };
}

export async function updateAdminUser(userId, updates) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection(COLLECTION_NAME).updateOne(
        { userId }, // Search by userId
        { $set: updates }
    );

    if (result.matchedCount === 0) {
        throw new Error("User not found with that User ID");
    }

    return { userId, ...updates };
}

export async function deleteAdminUser(userId) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection(COLLECTION_NAME).deleteOne(
        { userId }
    );

    if (result.deletedCount === 0) {
        throw new Error("User not found");
    }

    return { success: true, message: "User deleted successfully" };
}