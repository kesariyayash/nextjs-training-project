import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="bg-[#d9bb9b] min-h-screen flex items-center justify-center p-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-semibold text-[#3a2a17] mb-6">
                    Welcome
                </h1>

                <div className="flex flex-col gap-4">
                    <Link
                        href="/login"
                        className="bg-[#3a2a17] text-white p-3 rounded-md font-semibold hover:bg-[#2a1a0f]"
                    >
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="border border-[#3a2a17] text-[#3a2a17] p-3 rounded-md font-semibold hover:bg-[#f3e5d3]"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
