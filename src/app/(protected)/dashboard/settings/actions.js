"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { toggleMaintenance } from "./maintenance-state";

const DB_NAME = "admin_db";
const COLLECTION_NAME = "admin_users";

export async function updateAdminUserRole(formData) {
    const userId = formData.get("userId");
    const role = formData.get("role").trim();

    if (!userId || !role) {
        throw new Error("Missing fields");
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role } }
    );

    // Tell Next.js: data changed
    revalidatePath("/dashboard/settings");
}

export async function toggleMaintenanceAction() {
    toggleMaintenance();

    revalidatePath("/dashboard/settings");
}

