"use client";

import { useRouter } from "next/navigation";

export default function MarkSetupCompleteButton() {

    const router = useRouter();

    return (
        <div>
            <button
                onClick={async () => {
                    await fetch("/api/setup", { method: "POST" });
                    router.refresh();
                }}
                className="px-3.5 py-2 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 font-semibold"
            >
                Mark setup completed (API)
            </button>

            <span> &rarr; this button <strong>calls out a cookie.set()</strong> flag and is also wired with <strong>useRouter().refresh()</strong> to <strong>demonstrate auto refresh</strong> from client side after an api call.</span>
        </div>
    );
}