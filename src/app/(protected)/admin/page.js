import { Suspense } from "react";
import { getAllAdminUsers } from "@/lib/admin";
import AdminUsersClient from "../../../components/AdminUsersClient";
import AdminUsersSWR from "@/components/AdminUsersSWR";
import AdminUsersRQ from "@/components/AdminUsersRQ";
import Link from "next/link";
import UserListSkeleton from "@/components/UserListSkeletonLoader";

export async function generateMetadata() {
    return {
        title: "Admin",
    };
}

export default function AdminPage() {

    const usersPromise = getAllAdminUsers();

    return (
        <div className="p-10 bg-[#020617] height-screen text-[#e5e7eb]">
            <h1 className="flex items-center justify-between text-4xl text-[#ecc411] font-semibold">
                Admin Page
            </h1>

            <p className="text-base mt-2 text-white opacity-50 font-normal">(client side fetching and updating of data using different methods and HTTP methods implementation)</p>

            <p className="mt-2.5 opacity-70">
                Demonstrating Client Component displaying data using React’s <code>use()</code> hook
            </p>

            {/* 🔹 Client Component consuming server-started async data */}
            <Suspense fallback={<UserListSkeleton />}>
                <AdminUsersClient usersPromise={usersPromise} />
            </Suspense>

            <p className="mt-5 opacity-70">
                Demonstrating Client Component displaying data using community library SWR (stale while revalidating)
            </p>

            <AdminUsersSWR />

            <p className="mt-5 opacity-70">
                Demonstrating Client Component displaying data using community library React Query
            </p>

            <AdminUsersRQ />

            <div className="mt-5 text-lg">
                <Link className="text-white font-semibold hover:underline" href="/">Home Page </Link>
                <p className="text-sm text-white opacity-70">takes you back to the index page</p>
            </div>

        </div>

    );
}
