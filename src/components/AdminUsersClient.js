"use client";

import { use } from "react";

export default function AdminUsersClient({ usersPromise }) {

    const users = use(usersPromise);

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
            <h2 style={{ color: "#38bdf8" }}>Admin Users (via react use hook)</h2>

            <ul style={{ marginTop: "12px" }}>
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="mb-2 p-2 bg-[#0f172a] border-rounded"
                    >
                        {user.userId} — <strong>{user.name}</strong> — {user.role}
                        <div style={{ fontSize: "12px", opacity: 0.7 }}>
                            {user.email}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}