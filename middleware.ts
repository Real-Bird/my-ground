import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    !req.cookies.get("myGroundSession") &&
    !req.nextUrl.pathname.includes("/contact")
  ) {
    if (
      req.nextUrl.pathname.includes("/upload") ||
      req.nextUrl.pathname.includes("/revised")
    ) {
      if (req.nextUrl.pathname.includes("/portfolio")) {
        return NextResponse.redirect(new URL("/portfolio", req.url));
      }
      if (req.nextUrl.pathname.includes("/blog")) {
        return NextResponse.redirect(new URL("/blog", req.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/api/:path*",
    "/portfolio/:path*",
    "/blog/:path*",
    "/contact",
  ],
};
