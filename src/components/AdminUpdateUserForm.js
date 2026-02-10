"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateAdminUserRequest(updatedUser) {
    const res = await fetch("/api/admin-users", {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
        throw new Error("Failed to update admin user");
    }

    return res.json();
}

export default function AdminUpdateUserForm() {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateAdminUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setUserId("");
            setName("");
            setRole("");
        }
    });

    function handleSubmit() {
        if (!userId.trim()) {
            alert("Please enter the User ID to update");
            return;
        }
        mutation.mutate({ userId, name, role, });
    }


    return (
        <div
            style={{
                marginTop: "12px",
                padding: "12px",
                border: "1px solid #22c55e",
                borderRadius: "8px",
            }}
        >
            <h4 className="text-[#22c55e] font-semibold">
                Update User (PUT - Full)
            </h4>

            <p className="text-xs text-gray-400 mt-1 mb-5">
                Fill all the fields you want to update, Empty fields are not allowed, Changes the whole object.
            </p>

            <div style={{ marginTop: "8px" }}>
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div style={{ marginTop: "8px" }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div style={{ marginTop: "8px" }}>
                <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <button
                className={`mt-4 px-3 py-1.5 rounded text-white bg-[#22c55e] hover:text-[#22c55e] hover:bg-white cursor-pointer ${mutation.isPending ? "opacity-60" : "opacity-100"}`}
                disabled={mutation.isPending}
                onClick={handleSubmit}
            >
                <strong>{mutation.isPending ? "Updating..." : "Update User"}</strong>
            </button>

            {mutation.isError && (
                <p style={{ color: "red", marginTop: "5px" }}> Error : {mutation.error?.message || "Failed To Update User"}</p>
            )}

            {mutation.isSuccess && (
                <p className="text-green-500 mt-2 text-sm">
                    ✅ User object updated successfully!
                </p>
            )}
        </div>
    );
}