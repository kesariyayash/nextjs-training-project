"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveUserDetails(prevState, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const intent = formData.get("intent");

    if (!username || !email) {
        return {
            success: false,
            message: "Username and email are required",
        };
    }

    const cookieStore = await cookies();

    cookieStore.set("setup_username", username,);
    // { maxAge: 60 * 60 * 24 * 3, }

    cookieStore.set("setup_email", email,);
    // { maxAge: 60 * 60 * 24 * 3, }

    if (intent === "redirect") {
        redirect("/dashboard/profile");
    }

    return {
        success: true,
        message: "User details saved successfully",
    };
}
