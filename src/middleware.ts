import { auth } from "@/auth";
import { NextRequest } from "next/server";

export default auth(function middleware(req: NextRequest) {
  // console.log("req", req);
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
