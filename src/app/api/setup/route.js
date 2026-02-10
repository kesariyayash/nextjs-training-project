import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.set("setup_completed", "true");

    return NextResponse.json({ ok: true });
}
