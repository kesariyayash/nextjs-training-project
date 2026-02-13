import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const db = await getDb();
        const body = await request.json();
        const { email, password } = body;

        //field validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find the user by email
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });


        // Set the token in an HTTP-only cookie
        const response = NextResponse.json(
            { user: { id: user._id.toString(), name: user.name, email: user.email, }, },
            { message: "Login successful" },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: "true",
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        );
    }
}