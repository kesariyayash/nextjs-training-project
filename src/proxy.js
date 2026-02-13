import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const PUBLIC_ROUTES = [
    '/welcome',
    '/login',
    '/signup',
    '/api/login',
    '/api/signup'
]

export async function proxy(request) {
    const pathname = request.nextUrl.pathname;
    const method = request.method;

    // ===== LOGGING =====
    // Only log actual page requests, ignore Next.js internal files
    if (!pathname.startsWith('/_next/')) {
        console.log(`[${new Date().toISOString()}] ${method} ${pathname} - Route accessed`);
    }

    // ===== OTHER USES FOR PROXY =====
    // - Authentication: Check if user is logged in before accessing protected routes
    // - Redirects: Send users to different pages based on conditions
    // - Headers: Add CORS or custom headers to responses
    // - A/B Testing: Show different page versions to different users
    // - Geolocation: Route users based on their country
    // - Maintenance Mode: Redirect all traffic to a maintenance page

    // Ignore Next.js internal files
    if (pathname.startsWith('/_next/')) {
        return NextResponse.next();
    }

    // Allow public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Check for jwt token presence in cookies for protected routes
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/welcome', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;

        const db = await getDb()
        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })

        if (!user) {
            return NextResponse.redirect(new URL('/welcome', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(new URL('/welcome', request.url));
    }

}
