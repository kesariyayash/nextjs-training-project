"use client";

export default function AboutError({ error, reset }) {
    return (
        <div className="p-10 text-white bg-black h-screen" style={{ padding: "40px", color: "red" }}>
            <h2 className="text-lg">Something went wrong</h2>

            <p className="text-sm">{error.message}</p>

            <button
                onClick={() => reset()}
                className="mt-3 px-4 py-1 cursor-pointer bg-red-500 hover:bg-slate-400 hover:text-black rounded-md text-white font-semibold"
            >
                Try again
            </button>
        </div>
    );
}
