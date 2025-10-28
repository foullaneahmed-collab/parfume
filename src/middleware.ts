import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  // Add caching headers for static assets
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$/)
  ) {
    response.headers.set("Cache-Control", "public, max-age=86400");
  }

  // Cache API routes with shorter duration
  if (pathname.startsWith("/api")) {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes that need custom caching)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
