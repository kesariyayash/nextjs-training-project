"use client";

import { ClipLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <ClipLoader color="black" size={60} />
        </div>
    );
}
