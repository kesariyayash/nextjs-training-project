import Link from "next/link";
import DashboardVisitLogger from "@/components/DashboardVisitLogger";
import { logDashboardVisit } from "./actions";

export async function generateMetadata() {
    return {
        title: "Dashboard",
    };
}

export default function DashboardPage() {
    return (
        <div className="p-7 bg-green-500 h-screen flex flex-col items-center justify-center">
            <h1 className="underline text-4xl font-bold text-black mb-2">Dashboard Page</h1>
            <div>
                <p className="bg-white p-2 rounded-md text-center mt-3 text-lg font-semibold">This page has a dashboard visit logger implemented (client component) with it, this page when visited gets logged into the terminal with date and timestamp,
                    implemented using useEffect(), to trigger a server action.</p>
            </div>

            <DashboardVisitLogger action={logDashboardVisit} />

            <ul className="flex flex-col items-center mt-5">
                <li>
                    <Link className="underline text-black font-semibold hover:underline hover:text-blue-500" href="/">Home Page </Link>
                </li>
                <p className="text-black opacity-70 mt-1">takes you back to the index page.</p>

                <li className="mt-3">
                    <Link className="underline text-black font-semibold hover:underline hover:text-blue-500" href="/admin">Admin Page</Link>
                </li>
                <p className="text-center text-black opacity-70 mt-1">takes you back to the admin page, required for a form state conservation test.</p>
            </ul>

        </div>

    );
}
