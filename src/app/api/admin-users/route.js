import { NextResponse } from "next/server";
import { addAdminUser, getAllAdminUsers, replaceAdminUser, updateAdminUser, deleteAdminUser } from "@/lib/admin";

export async function GET() {
    try {
        const users = await getAllAdminUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.name || !body.role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newUser = await addAdminUser({
            userId: body.userId?.trim(),
            name: body.name?.trim(),
            role: body.role?.trim()
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to add user" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();

        const { userId, name, role } = body;

        if (!userId || !name || !role) {
            return NextResponse.json(
                { error: "Missing required fields: userId, name, role" },
                { status: 400 }
            );
        }

        const updatedUser = await replaceAdminUser({
            userId: userId.trim(),
            name: name.trim(),
            role: role.trim()
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("PUT error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();

        const { userId, ...updates } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                { status: 400 }
            );
        }

        // Removing empty fields - only update fields with values
        const cleanUpdates = {};
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null && value !== "") {
                cleanUpdates[key] = typeof value === "string" ? value.trim() : value;
            }
        }

        if (Object.keys(cleanUpdates).length === 0) {
            return NextResponse.json(
                { error: "No fields to update" },
                { status: 400 }
            )
        }

        const updatedUser = await updateAdminUser(userId.trim(), cleanUpdates);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const result = await deleteAdminUser(userId.trim());

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete user" },
            { status: 500 }
        );
    }
}

