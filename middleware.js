import { cookies } from "next/headers";
import * as jose from "jose";
import { NextResponse } from "next/server";

// Define routes and their access levels for each role
const routeAccessMap = {
  admin: ["/admin"],
  seo: [
    "/admin/blog",
    "/admin/add-page",
    "/admin/update-page",
    "/admin/comments",
    "/admin/blogmeta",
    "/admin/author",
  ],
  user: [],
};

export default async function middleware(req) {
  try {
    const tokenCookie = cookies().get("User");

    // Verify if token cookie exists
    if (!tokenCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Decode JWT token
    const decodedToken = await jose.jwtVerify(
      tokenCookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );
    const { role } = decodedToken.payload;

    // Get routes allowed for the user's role
    const allowedRoutes = routeAccessMap[role];

    // Check if the requested route is allowed for the user's role
    const isAllowedRoute = allowedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    // Allow access if the route is allowed for the user's role
    if (isAllowedRoute) {
      return NextResponse.next();
    }

    // Redirect users to access-denied page if they don't have access
    return NextResponse.redirect(new URL("/not-found", req.url));
  } catch (error) {
    console.error(
      "Error while checking authentication in middleware:",
      error.message,
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  // Define the path pattern where this middleware should be applied
  matcher: "/admin/:path*",
};
