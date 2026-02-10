"use client";

import { useLinkStatus } from "next/link";
import Loader from '@/components/loader';

export default function NavLink({ children, className }) {
    const { pending } = useLinkStatus();

    return (
        <span
            className={className}
        >
            {pending ? <Loader /> : children}
        </span>
    );
}
