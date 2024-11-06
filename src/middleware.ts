import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import env from "@/env";

export default auth(function middleware(req: NextRequest & { auth: any }) {
  if (!req.auth) {
    const urlObj = new URL(req.url);
    if (urlObj.pathname === "/" || urlObj.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(env.siteUrl);
  }
});

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
