"use client";

import useSWR from "swr";

// Simple fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AdminUsersSWR() {
    const { data, error, isLoading } = useSWR("/api/admin-users", fetcher);

    if (isLoading) {
        return <p>Loading admin users...</p>;
    }

    if (error) {
        return <p>Failed to load users</p>;
    }

    return (
        <div
            style={{
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#020617",
                border: "1px solid #ecc411",
                borderRadius: "8px",
            }}
        >
            <h2 style={{ color: "#38bdf8", marginBottom: "8px" }}>Admin Users (via SWR)</h2>

            <ul>
                {data.map((user) => (
                    <li key={user._id} className="mb-2 p-2 bg-[#0f172a] border-rounded">
                        {user.userId} — <strong>{user.name}</strong> — {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}
