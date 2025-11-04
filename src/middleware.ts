import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Note: We should avoid heavy database operations in middleware
// Let's simplify this to just check for cookie presence first

// Paths that require authentication
const protectedPaths = [
	"/postings",
	"/matching",
	"/results",
	"/setup",
	"/profile",
	"/api/users",
	"/api/applications",
	"/api/tags",
	"/api/profile",
];

// Paths that are public (accessible without authentication)
const publicPaths = ["/login", "/register", "/verify", "/api/auth"];

// Special case for exact root path
const isRootPath = (pathname: string) => pathname === "/";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the path is the root path (public)
	if (isRootPath(pathname)) {
		return NextResponse.next();
	}

	// Check if the path is public
	const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

	if (isPublicPath) {
		return NextResponse.next();
	}

	// Check if the path requires authentication
	const isProtectedPath = protectedPaths.some((path) =>
		pathname.startsWith(path)
	);

	if (isProtectedPath) {
		// Check for session cookie
		const sessionToken = request.cookies.get("ranked_match_session")?.value;

		if (!sessionToken) {
			// Redirect to login page for protected pages
			if (!pathname.startsWith("/api")) {
				const loginUrl = new URL("/login", request.url);
				loginUrl.searchParams.set("redirect", pathname);
				return NextResponse.redirect(loginUrl);
			}

			// Return 401 for API routes
			return NextResponse.json(
				{ error: "Authentication required" },
				{ status: 401 }
			);
		}

		// Validate the session token
		// Note: We'll do basic cookie presence check here
		// Full validation will be done in the API routes/components
		// For security, we trust the cookie existence for routing
		// but actual API calls will validate the session properly
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (images, etc.)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
