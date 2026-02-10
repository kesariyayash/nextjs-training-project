"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteAdminUserRequest(userId) {
    const res = await fetch("/api/admin-users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete admin user");
    }

    return res.json();
}

export default function AdminDeleteUserForm() {
    const [userId, setUserId] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteAdminUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setUserId("");
        }
    });

    function handleSubmit() {
        if (!userId.trim()) {
            alert("User ID is required");
            return;
        }

        if (!confirm(`Are you sure you want to delete user "${userId}"? This action cannot be undone.`)) {
            return;
        }

        mutation.mutate(userId.trim());
    }

    return (
        <div className="mt-3 p-3 border border-red-500 rounded-lg">
            <h4 className="text-red-500 font-semibold">
                Delete User (DELETE)
            </h4>

            <p className="text-xs text-gray-400 mt-1">
                Enter the User ID to delete. This action is permanent and cannot be undone.
            </p>

            <div className="mt-2">
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <button
                className={`mt-2.5 px-3 py-1.5 rounded text-white bg-red-500 cursor-pointer ${mutation.isPending ? "opacity-60" : "opacity-100"}`}
                disabled={mutation.isPending}
                onClick={handleSubmit}
            >
                <strong>{mutation.isPending ? "Deleting..." : "Delete User"}</strong>
            </button>

            {mutation.isError && (
                <p className="text-red-500 mt-2 text-sm">
                    ❌ {mutation.error?.message || "Failed to delete user"}
                </p>
            )}

            {mutation.isSuccess && (
                <p className="text-green-500 mt-2 text-sm">✅ User deleted successfully!</p>
            )}
        </div>
    );

}
