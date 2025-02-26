import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const publicApiRoutes = ["/api/limited-products", "/api/products/all-products"];

  for (let route of publicApiRoutes) {
    if (req.nextUrl.pathname.startsWith(route)) {
      return NextResponse.next();
    }
  }

  const isTenantRoute = createRouteMatcher(["/profile(.*)"]);
  const isTenantAdminRoute = createRouteMatcher(["/dashboard(.*)"]);
  const isPublic = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/about(.*)",
    "/contact(.*)",
    "/shop(.*)",
    "/",
  ]);

  if (!isPublic(req)) {
    // Fix: Check if the request matches public routes
    const authResult = await auth();

    if (!authResult.userId) {
      // User is not logged in, redirect to sign-in page
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (isTenantAdminRoute(req) && authResult.sessionClaims?.metadata?.role !== "admin") {
      // User is logged in but is not an admin, redirect to home page
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }

    if (isTenantRoute(req)) {
      // Protect tenant routes (ensures user is logged in)
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
