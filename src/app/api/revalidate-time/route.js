import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
    revalidateTag("time-data");

    return NextResponse.json({
        revalidated: true,
        at: new Date().toISOString(),
    });
}
