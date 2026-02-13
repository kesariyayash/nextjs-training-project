import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getAuthenticatedUser() {

    try {
        //fetch cookies
        const cookieStore = await cookies();

        //fetch token from cookies
        const token = cookieStore.get('token')?.value;

        // If no token is found, return null (user is not authenticated)
        if (!token) {
            return null;
        }

        // Verify the token and extract the user ID
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;

        // If the token is invalid or does not contain a user ID, return null (user is not authenticated)
        if (!userId) {
            return null;
        }

        // Fetch the user from the database using the extracted user ID
        const db = await getDb();
        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

        // If no user is found, return null (user is not authenticated)
        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Error in getAuthenticatedUser:", error);
        return null;
    }
}