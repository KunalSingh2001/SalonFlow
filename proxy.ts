import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Checks whether a JWT token string has a valid structure and is not expired.
 * A standard JWT is split into 3 parts: Header.Payload.Signature
 * The payload is base64url encoded and contains the expiration timestamp ("exp").
 */
function isTokenValid(token: string): boolean {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return false;

        // Decode payload from base64url
        const payloadBase64 = parts[1];
        const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
        const payload = JSON.parse(payloadJson);

        // Verify if token has an "exp" field and compare it against current time (in seconds)
        if (typeof payload.exp !== "number") return false;

        const nowInSeconds = Math.floor(Date.now() / 1000);
        return payload.exp > nowInSeconds;
    } catch {
        return false;
    }
}

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const isValid = token ? isTokenValid(token) : false;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isDashboardRoute = pathname.startsWith("/dashboard");

    // Case 1: User is already logged in with a valid token
    // If they attempt to visit /login or /register, redirect them to /dashboard
    if (isAuthRoute && isValid) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Case 2: User is NOT logged in or their token has expired
    // If they attempt to visit /dashboard, redirect them to /login
    if (isDashboardRoute && !isValid) {
        const response = NextResponse.redirect(new URL("/login", request.url));

        // If a dead/expired token cookie exists, clean it up
        if (token && !isValid) {
            response.cookies.delete("token");
        }

        return response;
    }

    // For all other requests, proceed normally
    return NextResponse.next();
}

/**
 * Matcher configuration tells Next.js exactly which paths this proxy should run on.
 * We exclude static assets, images, and public files to ensure top performance.
 */
export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
