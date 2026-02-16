"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {

    const { setUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        try {
            setLoading(true);
            const res = await fetch("/api/logout", {
                method: "POST",
            });
            if (!res.ok) {
                throw new Error("Logout failed");
            }
            // Clear user context immediately
            if (res.ok) {
                // redirect to welcome page
                router.push("/welcome");
                router.refresh();

                setUser(null);
                setLoading(false);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
        >
            {loading ? "Logging Out ..." : "Logout"}
        </button>
    );
}