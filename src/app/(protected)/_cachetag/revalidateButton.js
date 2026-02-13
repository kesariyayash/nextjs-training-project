"use client";

export default function RevalidateButton() {
    const callRevalidateAPI = () => {
        fetch("http://localhost:3000/api/revalidate-time", {
            method: "POST",
        });
    }

    return <button
        onClick={callRevalidateAPI}
        className="mt-6 px-3 py-1.5 cursor-pointer bg-white text-black border border-black rounded-lg hover:opacity-70">
        Revalidate tag via API
    </button>;
}