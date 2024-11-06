import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import env from "@/env";

// This function can be marked `async` if using `await` inside
export default async function authMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secureCookie: true,
  });

  console.log("authMiddleware", request.url, token);

  if (token) {
    return NextResponse.next();
  } else {
    const urlObj = new URL(request.url);
    console.log("urlObj.pathname", urlObj.pathname);
    if (urlObj.pathname === "/" || urlObj.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(env.auth.url);
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
