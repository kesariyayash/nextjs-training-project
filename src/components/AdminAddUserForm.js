"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";


async function addAdminUserRequest(newUser) {
    const res = await fetch("/api/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newUser),
    });

    if (!res.ok) {
        throw new Error("Failed to add admin user");
    }

    return res.json();
}

export default function AdminAddUserForm() {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addAdminUserRequest,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setUserId("");
            setName("");
            setRole("");
        },
    });

    function handleSubmit() {
        mutation.mutate({
            userId, name, role,
        });
    }

    return (
        <div
            style={{
                marginTop: "12px",
                padding: "16px",
                backgroundColor: "#020617",
                border: "1px solid #22c55e",
                borderRadius: "8px",
            }}
        >
            <h3 style={{ color: "#22c55e" }}>
                Add Admin User (Form State Test - Wired with useMutation and invalidateQueries)
            </h3>

            <div style={{ marginTop: "10px" }}>
                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div style={{ marginTop: "10px" }}>
                <input
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div style={{ marginTop: "10px" }}>
                <input
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <button style={{
                marginTop: "12px",
                backgroundColor: "#22c55e",
                opacity: mutation.isPending ? 0.6 : 1,
                padding: "7px",
                borderRadius: "5px"
            }} onClick={handleSubmit} disabled={mutation.isPending} >

                <strong> {mutation.isPending ? "Adding User ...." : "Add User"} </strong>
            </button>

            <span style={{ marginLeft: "12px", padding: "2px", color: "green" }}>
                <Link href="/dashboard">
                    Go to Dashboard
                </Link>
            </span>

        </div>
    );
}
