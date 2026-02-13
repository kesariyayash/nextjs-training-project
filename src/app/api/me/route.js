import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
export async function GET() {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user: { id: user._id.toString(), name: user.name, email: user.email, } }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ user: "null" }, { status: 500 });
    }
}