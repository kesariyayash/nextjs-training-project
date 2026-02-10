"use client";

import { useLinkStatus } from "next/link";

export default function NavLink({ children, className }) {
    const { pending } = useLinkStatus();

    return (
        <span
            className={className}
        >
            {pending ? "Loading..." : children}
        </span>
    );
}
