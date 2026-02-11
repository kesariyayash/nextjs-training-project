"use client";

import { useQuery } from "@tanstack/react-query";
import AdminAddUserForm from "./AdminAddUserForm";
import AdminUpdateUserForm from "./AdminUpdateUserForm";
import AdminPatchUserForm from "./AdminPatchUserForm";
import AdminDeleteUserForm from "./AdminDeleteUserForm";
import UserListSkeleton from "./UserListSkeletonLoader";

async function fetchAdminUsers() {
    const res = await fetch("/api/admin-users");

    if (!res.ok) {
        throw new Error("Failed to fetch admin users");
    }

    return res.json();
}


export default function AdminUsersRQ() {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: fetchAdminUsers,
    });

    if (isLoading) {
        return <UserListSkeleton />;
    }

    if (error) {
        return <p>Error loading users</p>;
    }

    return (
        <div className="mt-4 p-4 bg-black-400 border-2 border-yellow-500 rounded-md">
            <h2 style={{ color: "#38bdf8", marginBottom: "10px" }}>Admin Users displayed using useQuery (React Query)</h2>

            <ul className="">
                {data.map((user) => (
                    <li key={user._id} className="mb-2 p-2 bg-[#0f172a] border-rounded">
                        {user.userId} — <strong>{user.name}</strong> — {user.role}
                    </li>
                ))}
            </ul>

            <h2 className="text-[#38bdf8] mt-5">Adding Admin Users using another client component to implement useMutation (React Query) via <b>POST</b> HTTP method</h2>

            <AdminAddUserForm />

            <h2 style={{ color: "#38bdf8", marginTop: "20px" }}>Updating Admin User Object using another client component via implementing useMutation (React Query) via <b>PUT</b> HTTP method</h2>


            <AdminUpdateUserForm />

            <h2 style={{ color: "#38bdf8", marginTop: "20px" }}>
                Updating Admin Users Details using another client component via implementing useMutation (React Query) via <b>PATCH</b> HTTP method (Partial Update)
            </h2>

            <AdminPatchUserForm />

            <h2 style={{ color: "#38bdf8", marginTop: "20px" }}>
                Deleting Admin Users using another client component via implementing useMutation (React Query) via <b>DELETE</b> HTTP method
            </h2>
            <AdminDeleteUserForm />
        </div>
    );
}
