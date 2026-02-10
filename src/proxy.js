import { NextResponse } from 'next/server'

export function proxy(request) {
    const pathname = request.nextUrl.pathname
    const method = request.method

    // ===== LOGGING =====
    // Only log actual page requests, ignore Next.js internal files
    if (!pathname.startsWith('/_next/')) {
        console.log(`[${new Date().toISOString()}] ${method} ${pathname} - Route accessed`)
    }

    // ===== OTHER USES FOR PROXY =====
    // - Authentication: Check if user is logged in before accessing protected routes
    // - Redirects: Send users to different pages based on conditions
    // - Headers: Add CORS or custom headers to responses
    // - A/B Testing: Show different page versions to different users
    // - Geolocation: Route users based on their country
    // - Maintenance Mode: Redirect all traffic to a maintenance page

    return NextResponse.next()
}
