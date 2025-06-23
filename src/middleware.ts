import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  // console.log("Middleware invoked for:", req.nextUrl.pathname);

  const { pathname } = new URL(req.url);

  const cookieStore = cookies();

  const token = (await cookieStore).get("admin-token")?.value;
  // console.log("Access token:", token);

  // 🛡️ non-admin can't route to /dashboard
  if (
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-product") ||
    pathname.startsWith("/admin-order")
  ) {
    if (!token) {
      console.log("No token found, redirecting...");
      return NextResponse.redirect(new URL("/dash-access", req.url));
    }
  }

  // 🛡️ admin with token can't route to /dash-access
  if (pathname.startsWith("/dash-access")) {
    if (token) {
      console.log("Token found, redirecting to dashboard...");
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
  }

  return NextResponse.next();
}
