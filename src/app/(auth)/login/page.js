"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Update context immediately
            setUser(data.user);

            // Redirect
            router.push("/");
            router.refresh();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="bg-[#d9bb9b] min-h-screen flex items-center justify-center p-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl text-center text-[#3a2a17] font-semibold mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a17] focus:border-transparent"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a17] focus:border-transparent"
                    />

                    <button
                        className="bg-[#3a2a17] p-3 rounded-md shadow-lg font-semibold text-white mt-2 hover:bg-[#2a1a0f] disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                </form>

                <div className="flex flex-row justify-evenly">
                    <div className="text-center mt-5">
                        <Link className="underline text-[#3a2a17] text-md font-semibold hover:underline hover:opacity-70" href="/welcome">Welcome</Link>
                    </div>

                    <div className="text-center mt-5">
                        <Link className="underline text-[#3a2a17] text-md font-semibold hover:underline hover:opacity-70" href="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}