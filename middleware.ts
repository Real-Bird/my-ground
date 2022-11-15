import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authorization = req.cookies.get("myGroundSession");
  if (
    !authorization &&
    !req.nextUrl.pathname.includes("/contact") &&
    (req.nextUrl.pathname.includes("/upload") ||
      req.nextUrl.pathname.includes("/revised"))
  ) {
    if (req.nextUrl.pathname.includes("/portfolio")) {
      return NextResponse.redirect(new URL("/portfolio", req.url));
    }
    if (req.nextUrl.pathname.includes("/blog")) {
      return NextResponse.redirect(new URL("/blog", req.url));
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
