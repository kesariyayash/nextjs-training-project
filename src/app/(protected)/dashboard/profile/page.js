import { cookies } from "next/headers";
import { use } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const cookieHouse = cookies();
    const cookieStore = use(cookieHouse);

    const username = cookieStore.get("setup_username")?.value;
    const email = cookieStore.get("setup_email")?.value;

    return (
        <div className="p-10 bg-[#12df12] min-h-screen text-black">
            <h1 className="underline text-3xl font-semibold">Profile Page</h1>

            <p className="text-lg mt-5">
                Welcome <strong>{username || "Guest"}</strong>,
            </p>

            <p className="text-lg">Your set email id is: <strong>{email || "Not set"}</strong></p>

            <br />

            <span><Link className="underline text-black font-semibold hover:underline hover:text-blue-500 mr-5" href="/dashboard/setup">Setup Page</Link></span>
            <span><Link className="underline text-black font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link></span>
        </div>
    );
}
