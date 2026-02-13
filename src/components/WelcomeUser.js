"use client";

import { useAuth } from "@/context/AuthContext";

export default function WelcomeUser() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <h1 className="text-3xl font-bold">
            Welcome {user.name},
        </h1>
    );
}
