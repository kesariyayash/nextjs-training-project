"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function patchAdminUserRequest(updatedUser) {
    const res = await fetch("/api/admin-users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
        throw new Error("Failed to patch admin user");
    }

    return res.json();
}

export default function AdminPatchUserForm() {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [validationError, setValidationError] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: patchAdminUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            setValidationError("");
            setUserId("");
            setName("");
            setRole("");
        }
    });

    function handleSubmit() {
        setValidationError("");

        if (!userId.trim()) {
            setValidationError("Please enter the User ID to update");
            return;
        }

        // PATCH: Build update object with only non-empty fields
        const updates = { userId };

        if (name.trim()) updates.name = name;
        if (role.trim()) updates.role = role;

        // Check if at least one additional field has a value
        if (Object.keys(updates).length === 1) {
            setValidationError("At least one field (name or role) must be filled");
            return;
        }

        mutation.mutate(updates);
    }

    return (
        <div className="mt-3 p-3 border border-[#22c55e] rounded-lg">
            <h4 className="text-[#22c55e] font-semibold">
                Update User (PATCH - Partial)
            </h4>

            <p className="text-xs text-gray-400 mt-1 mb-5">
                Fill only the fields you want to update, Empty fields will be ignored.
            </p>

            <div className="mt-2">
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div className="mt-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="p-1.5 bg-slate-700 text-white border border-slate-600 rounded"
                />
            </div>

            <div className="mt-2">
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
                <strong>{mutation.isPending ? "Updating..." : "Patch User"}</strong>
            </button>

            {validationError && (
                <p className="text-red-500 mt-2 text-sm">
                    ⚠️ {validationError}
                </p>
            )}

            {mutation.isError && (
                <p className="text-red-500 mt-2 text-sm">
                    ❌ {mutation.error?.message || "Failed to patch user"}
                </p>
            )}

            {mutation.isSuccess && (
                <p className="text-green-500 mt-2 text-sm">
                    ✅ User patched successfully!
                </p>
            )}
        </div>
    );
}