import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const db = await getDb();

        const body = await request.json();
        const { name, email, password } = body;

        //field validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Password strength validation (at least 8 characters)
        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        // Check if the email is already registered
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            );
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    }
    catch (error) {
        console.error("Database connection error:", error);

        // Duplicate key error - a race condition - if two requests try to register the same email at the same time
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 409 }
            );
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
