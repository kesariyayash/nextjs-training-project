"use client";

import { use, useEffect } from "react";

export default function DashboardVisitLogger({ action }) {
    useEffect(() => { action() }, [action]);

    return null;
} 